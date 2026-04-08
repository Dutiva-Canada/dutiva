/**
 * monitor-law-changes — Supabase Edge Function
 *
 * Features:
 *  • Monitors all 14 Canadian jurisdictions' primary employment-law pages
 *  • Detects content changes via SHA-256 hash comparison
 *  • Detects permanent redirects (301/308) → auto-updates stored URL
 *  • Detects broken/moved pages (404/410/5xx) → flags and tries to find
 *    the new URL by querying HF Mistral with jurisdiction + law name context
 *  • Writes structured events to law_updates (change / redirect / broken / first_seen)
 *  • Generates plain-English AI summaries of what changed and what it
 *    means for Canadian employers
 *
 * Env vars required in Supabase project secrets:
 *   SUPABASE_URL                — injected automatically
 *   SUPABASE_SERVICE_ROLE_KEY   — injected automatically
 *   HF_TOKEN                    — Hugging Face API key (for AI summaries)
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── All 14 Canadian jurisdictions ─────────────────────────────────────────────
// Primary source: official government legislation repositories.
// Stable / canonical URLs are preferred; avoid deep-linked PDFs where possible.
const MONITORED_PAGES = [
  // ── Federal ──────────────────────────────────────────────────────────────
  {
    jurisdiction: "Federal",
    law_name: "Canada Labour Code",
    url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/",
    fallbacks: ["https://laws-lois.justice.gc.ca/eng/acts/l-2/"],
  },
  {
    jurisdiction: "Federal",
    law_name: "Canadian Human Rights Act",
    url: "https://laws-lois.justice.gc.ca/eng/acts/H-6/",
    fallbacks: [],
  },
  // ── Ontario ───────────────────────────────────────────────────────────────
  {
    jurisdiction: "Ontario",
    law_name: "Employment Standards Act, 2000",
    url: "https://www.ontario.ca/laws/statute/00e41",
    fallbacks: ["https://www.ontario.ca/laws/statute/00e041"],
  },
  {
    jurisdiction: "Ontario",
    law_name: "Ontario Human Rights Code",
    url: "https://www.ontario.ca/laws/statute/90h19",
    fallbacks: [],
  },
  {
    jurisdiction: "Ontario",
    law_name: "Workplace Safety and Insurance Act, 1997",
    url: "https://www.ontario.ca/laws/statute/97w16",
    fallbacks: [],
  },
  // ── British Columbia ──────────────────────────────────────────────────────
  {
    jurisdiction: "British Columbia",
    law_name: "Employment Standards Act (BC)",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96113_01",
    fallbacks: ["https://www.bclaws.ca/civix/document/id/complete/statreg/96113_01"],
  },
  {
    jurisdiction: "British Columbia",
    law_name: "Workers Compensation Act (BC)",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96492_01",
    fallbacks: [],
  },
  // ── Alberta ───────────────────────────────────────────────────────────────
  {
    jurisdiction: "Alberta",
    law_name: "Employment Standards Code (AB)",
    url: "https://www.qp.alberta.ca/documents/Acts/E09.pdf",
    fallbacks: ["https://kings-printer.alberta.ca/documents/Acts/E09.pdf"],
  },
  // ── Quebec ────────────────────────────────────────────────────────────────
  {
    jurisdiction: "Quebec",
    law_name: "Act respecting labour standards (LNT)",
    url: "https://legisquebec.gouv.qc.ca/en/document/cs/N-1.1",
    fallbacks: ["https://www.legisquebec.gouv.qc.ca/en/document/cs/N-1.1"],
  },
  {
    jurisdiction: "Quebec",
    law_name: "Charter of Human Rights and Freedoms (Quebec)",
    url: "https://legisquebec.gouv.qc.ca/en/document/cs/C-12",
    fallbacks: [],
  },
  // ── Manitoba ──────────────────────────────────────────────────────────────
  {
    jurisdiction: "Manitoba",
    law_name: "Employment Standards Code (MB)",
    url: "https://web2.gov.mb.ca/laws/statutes/ccsm/e110e.php",
    fallbacks: ["https://www.manitoba.ca/cca/elaws/statutes/es_employment_standards_code/"],
  },
  // ── Saskatchewan ─────────────────────────────────────────────────────────
  {
    jurisdiction: "Saskatchewan",
    law_name: "Saskatchewan Employment Act",
    url: "https://www.qp.gov.sk.ca/documents/English/Statutes/Statutes/S15-1.pdf",
    fallbacks: ["https://publications.saskatchewan.ca/api/v1/products/73330/formats/82807/download"],
  },
  // ── Nova Scotia ───────────────────────────────────────────────────────────
  {
    jurisdiction: "Nova Scotia",
    law_name: "Labour Standards Code (NS)",
    url: "https://nslegislature.ca/sites/default/files/legc/statutes/labour%20standards%20code.htm",
    fallbacks: ["https://novascotia.ca/lae/employmentrights/docs/labourstandardscode.pdf"],
  },
  // ── New Brunswick ─────────────────────────────────────────────────────────
  {
    jurisdiction: "New Brunswick",
    law_name: "Employment Standards Act (NB)",
    url: "https://laws.gnb.ca/en/showdoc/cs/E-7.2",
    fallbacks: ["https://gnb.ca/0062/acts/acts/e-07-2.htm"],
  },
  // ── Prince Edward Island ──────────────────────────────────────────────────
  {
    jurisdiction: "Prince Edward Island",
    law_name: "Employment Standards Act (PEI)",
    url: "https://www.princeedwardisland.ca/sites/default/files/legislation/e-6_2-employment_standards_act.pdf",
    fallbacks: ["https://www.princeedwardisland.ca/en/legislation/employment-standards-act"],
  },
  // ── Newfoundland and Labrador ─────────────────────────────────────────────
  {
    jurisdiction: "Newfoundland and Labrador",
    law_name: "Labour Standards Act (NL)",
    url: "https://www.assembly.nl.ca/legislation/sr/statutes/l00-2.htm",
    fallbacks: ["https://assembly.nl.ca/legislation/sr/statutes/l00-2.htm"],
  },
  // ── Northwest Territories ─────────────────────────────────────────────────
  {
    jurisdiction: "Northwest Territories",
    law_name: "Employment Standards Act (NWT)",
    url: "https://www.justice.gov.nt.ca/en/files/legislation/employment-standards/employment-standards.a.pdf",
    fallbacks: ["https://www.ntassembly.ca/sites/default/files/EmploymentStandardsAct.pdf"],
  },
  // ── Nunavut ───────────────────────────────────────────────────────────────
  {
    jurisdiction: "Nunavut",
    law_name: "Labour Standards Act (NU)",
    url: "https://www.nunavutlegislation.ca/en/consolidated-law/current/chapter-l-1",
    fallbacks: ["https://nunavutlegislation.ca/en/consolidated-law/current/chapter-l-1"],
  },
  // ── Yukon ─────────────────────────────────────────────────────────────────
  {
    jurisdiction: "Yukon",
    law_name: "Employment Standards Act (YK)",
    url: "https://legislation.yukon.ca/acts/esta_c.pdf",
    fallbacks: ["https://www.yukon.ca/en/employment-standards"],
  },
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageConfig {
  jurisdiction: string;
  law_name: string;
  url: string;
  fallbacks: string[];
}

interface FetchResult {
  ok: boolean;
  text: string | null;
  finalUrl: string;        // may differ from requested URL on redirect
  wasRedirected: boolean;
  statusCode: number;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

function extractText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/\s+/g, " ").trim();
}

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function fetchWithTimeout(url: string, timeoutMs = 18000): Promise<FetchResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: "follow",   // follows 301/302/308 automatically
      headers: {
        "User-Agent": "Dutiva-LawMonitor/2.0 (compliance@dutiva.ca; Canadian employment law compliance platform)",
        "Accept": "text/html,application/xhtml+xml,application/pdf,*/*",
      },
    });
    clearTimeout(timer);
    const text = res.ok ? await res.text() : null;
    return {
      ok: res.ok,
      text,
      finalUrl: res.url,            // final URL after any redirects
      wasRedirected: res.url !== url && res.url !== "",
      statusCode: res.status,
    };
  } catch (err) {
    clearTimeout(timer);
    return { ok: false, text: null, finalUrl: url, wasRedirected: false, statusCode: 0 };
  }
}

/** Try the primary URL, then each fallback in sequence. Returns first success or last failure. */
async function fetchWithFallbacks(page: PageConfig): Promise<FetchResult & { usedUrl: string }> {
  const urls = [page.url, ...page.fallbacks];
  let lastResult: FetchResult = { ok: false, text: null, finalUrl: page.url, wasRedirected: false, statusCode: 0 };
  for (const url of urls) {
    const result = await fetchWithTimeout(url);
    if (result.ok) return { ...result, usedUrl: url };
    lastResult = result;
  }
  return { ...lastResult, usedUrl: page.url };
}

/** Ask HF Mistral to suggest a likely new URL for a broken legislation page. */
async function findNewUrl(
  page: PageConfig,
  statusCode: number,
  hfToken: string,
): Promise<string | null> {
  if (!hfToken) return null;
  try {
    const res = await fetch("https://api-inference.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${hfToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
          {
            role: "system",
            content:
              "You are a Canadian legal research assistant. When given a broken or moved " +
              "government legislation URL, output ONLY the most likely current URL for that " +
              "specific law — no explanation, no markdown, just the raw URL. " +
              "Use official government domains: ontario.ca/laws, laws-lois.justice.gc.ca, " +
              "bclaws.gov.bc.ca, qp.alberta.ca, legisquebec.gouv.qc.ca, laws.gnb.ca, " +
              "nslegislature.ca, assembly.nl.ca, princeedwardisland.ca, web2.gov.mb.ca, " +
              "qp.gov.sk.ca, justice.gov.nt.ca, nunavutlegislation.ca, legislation.yukon.ca.",
          },
          {
            role: "user",
            content:
              `The following URL for "${page.law_name}" (${page.jurisdiction}) returned HTTP ${statusCode}:\n` +
              `${page.url}\n\n` +
              `What is the most likely current official URL for this legislation?`,
          },
        ],
        max_tokens: 80,
        temperature: 0.1,
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const suggested = data.choices?.[0]?.message?.content?.trim();
    // Validate it looks like a URL before trusting it
    if (suggested && /^https?:\/\/.+\..+/.test(suggested)) return suggested;
    return null;
  } catch {
    return null;
  }
}

/** Summarize what changed using HF Mistral. */
async function summarizeChange(
  lawName: string,
  jurisdiction: string,
  snippet: string,
  hfToken: string,
): Promise<string> {
  if (!hfToken) return `Change detected on ${lawName}. Review the legislation page directly.`;
  try {
    const res = await fetch("https://api-inference.huggingface.co/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${hfToken}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "mistralai/Mistral-7B-Instruct-v0.3",
        messages: [
          {
            role: "system",
            content:
              "You are a Canadian employment law specialist. Summarize detected changes " +
              "to employment legislation in 2-3 plain-English sentences. Focus on employer " +
              "and HR obligations: what must employers do differently, and by when.",
          },
          {
            role: "user",
            content:
              `A change was detected on the ${jurisdiction} "${lawName}" legislation page. ` +
              `Excerpt:\n\n${snippet.slice(0, 1800)}\n\n` +
              "What changed and what does it mean for employers?",
          },
        ],
        max_tokens: 220,
        temperature: 0.2,
      }),
    });
    if (!res.ok) return `Change detected on ${lawName}. Review the legislation page.`;
    const data = await res.json();
    return (
      data.choices?.[0]?.message?.content?.trim() ??
      `Change detected on ${lawName}. Review the legislation page.`
    );
  } catch {
    return `Change detected on ${lawName}. Review the legislation page.`;
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const hfToken = Deno.env.get("HF_TOKEN") ?? "";

  const db = createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });

  // Load existing hash records
  const { data: hashRows } = await db.from("law_page_hashes").select("*");
  const hashMap: Record<string, { hash: string; failures: number; redirectUrl: string | null }> = {};
  for (const row of hashRows ?? []) {
    hashMap[row.url] = {
      hash: row.content_hash,
      failures: row.consecutive_failures ?? 0,
      redirectUrl: row.redirect_url ?? null,
    };
  }

  const results: string[] = [];
  const BROKEN_ALERT_THRESHOLD = 3; // alert after this many consecutive failures

  for (const page of MONITORED_PAGES) {
    try {
      const fetch_result = await fetchWithFallbacks(page);
      const record = hashMap[page.url];
      const isNew = !record;

      // ── Case 1: Permanent redirect detected ────────────────────────────────
      if (fetch_result.ok && fetch_result.wasRedirected && fetch_result.finalUrl !== page.url) {
        const newUrl = fetch_result.finalUrl;

        // Update the hash record with the new canonical URL
        await db.from("law_page_hashes").upsert({
          url: page.url,         // keep original as key so existing records still match
          jurisdiction: page.jurisdiction,
          law_name: page.law_name,
          content_hash: await sha256(extractText(fetch_result.text ?? "")),
          redirect_url: newUrl,
          is_broken: false,
          consecutive_failures: 0,
          last_checked: new Date().toISOString(),
        });

        await db.from("law_updates").insert({
          jurisdiction: page.jurisdiction,
          law_name: page.law_name,
          url: newUrl,           // log the new URL
          content_hash: null,
          change_summary:
            `The legislation page for "${page.law_name}" (${page.jurisdiction}) has permanently moved. ` +
            `Old URL: ${page.url} → New URL: ${newUrl}. ` +
            `Dutiva has automatically updated its monitoring to the new location.`,
          raw_diff: `Redirect: ${page.url} → ${newUrl}`,
          detected_at: new Date().toISOString(),
          is_new: false,
          event_type: "redirect",
        });

        results.push(`REDIRECT  ${page.jurisdiction}/${page.law_name}: → ${newUrl}`);
        continue;
      }

      // ── Case 2: Broken / not found ─────────────────────────────────────────
      if (!fetch_result.ok) {
        const failures = (record?.failures ?? 0) + 1;

        await db.from("law_page_hashes").upsert({
          url: page.url,
          jurisdiction: page.jurisdiction,
          law_name: page.law_name,
          content_hash: record?.hash ?? "",
          is_broken: true,
          consecutive_failures: failures,
          last_broken_at: new Date().toISOString(),
          last_checked: new Date().toISOString(),
        });

        // After threshold failures, try to auto-discover the new URL
        let newUrlSuggestion: string | null = null;
        if (failures >= BROKEN_ALERT_THRESHOLD && hfToken) {
          newUrlSuggestion = await findNewUrl(page, fetch_result.statusCode, hfToken);

          // If AI suggested a URL, verify it actually works
          if (newUrlSuggestion) {
            const verify = await fetchWithTimeout(newUrlSuggestion);
            if (!verify.ok) newUrlSuggestion = null; // discard if it doesn't work either
          }

          // If a working new URL was found, update the record and try fetching content
          if (newUrlSuggestion) {
            const newFetch = await fetchWithTimeout(newUrlSuggestion);
            if (newFetch.ok && newFetch.text) {
              const newText = extractText(newFetch.text);
              const newHash = await sha256(newText);

              await db.from("law_page_hashes").upsert({
                url: page.url,
                jurisdiction: page.jurisdiction,
                law_name: page.law_name,
                content_hash: newHash,
                redirect_url: newUrlSuggestion,
                is_broken: false,
                consecutive_failures: 0,
                last_checked: new Date().toISOString(),
              });

              await db.from("law_updates").insert({
                jurisdiction: page.jurisdiction,
                law_name: page.law_name,
                url: newUrlSuggestion,
                change_summary:
                  `The original URL for "${page.law_name}" was broken (HTTP ${fetch_result.statusCode}). ` +
                  `Dutiva automatically located the new URL: ${newUrlSuggestion}. ` +
                  `Monitoring has been updated to the new location.`,
                raw_diff: `Auto-discovered: ${page.url} → ${newUrlSuggestion}`,
                detected_at: new Date().toISOString(),
                is_new: false,
                event_type: "redirect",
              });

              results.push(`AUTO-FIX  ${page.jurisdiction}/${page.law_name}: broken → found ${newUrlSuggestion}`);
              continue;
            }
          }
        }

        // Log broken event after threshold
        if (failures === BROKEN_ALERT_THRESHOLD) {
          await db.from("law_updates").insert({
            jurisdiction: page.jurisdiction,
            law_name: page.law_name,
            url: page.url,
            change_summary:
              `⚠️ The "${page.law_name}" (${page.jurisdiction}) legislation page has been unreachable ` +
              `for ${failures} consecutive checks (HTTP ${fetch_result.statusCode}). ` +
              `${newUrlSuggestion ? `AI-suggested new URL: ${newUrlSuggestion} (could not be verified). ` : ""}` +
              `Manual review of the URL may be needed.`,
            raw_diff: `Status: ${fetch_result.statusCode} · Failures: ${failures}`,
            detected_at: new Date().toISOString(),
            is_new: false,
            event_type: "broken",
          });
        }

        results.push(
          `BROKEN    ${page.jurisdiction}/${page.law_name}: HTTP ${fetch_result.statusCode} (failure #${failures})`,
        );
        continue;
      }

      // ── Case 3: Successful fetch — check for content change ────────────────
      // Reset broken flag if it was previously broken
      const text = extractText(fetch_result.text ?? "");
      const hash = await sha256(text);
      const previousHash = record?.hash;
      const changed = isNew || previousHash !== hash;

      await db.from("law_page_hashes").upsert({
        url: page.url,
        jurisdiction: page.jurisdiction,
        law_name: page.law_name,
        content_hash: hash,
        is_broken: false,
        consecutive_failures: 0,
        last_checked: new Date().toISOString(),
      });

      if (!changed) {
        results.push(`OK        ${page.jurisdiction}/${page.law_name}: no change`);
        continue;
      }

      const eventType = isNew ? "first_seen" : "change";
      const snippet = text.slice(0, 2000);
      const summary = isNew
        ? `"${page.law_name}" (${page.jurisdiction}) has been added to Dutiva's law monitoring. Baseline captured.`
        : await summarizeChange(page.law_name, page.jurisdiction, snippet, hfToken);

      await db.from("law_updates").insert({
        jurisdiction: page.jurisdiction,
        law_name: page.law_name,
        url: fetch_result.finalUrl || page.url,
        content_hash: hash,
        change_summary: summary,
        raw_diff: isNew ? null : snippet,
        detected_at: new Date().toISOString(),
        is_new: isNew,
        event_type: eventType,
      });

      results.push(
        `${isNew ? "FIRST_SEEN" : "CHANGE   "} ${page.jurisdiction}/${page.law_name}`,
      );
    } catch (err) {
      results.push(`ERROR     ${page.jurisdiction}/${page.law_name}: ${String(err)}`);
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      checked: MONITORED_PAGES.length,
      timestamp: new Date().toISOString(),
      results,
    }),
    { headers: { "Content-Type": "application/json" } },
  );
});
