/**
 * monitor-law-changes — Supabase Edge Function
 *
 * Fetches Canadian employment-law pages, computes SHA-256 hashes, detects
 * changes vs. stored hashes, logs updates to law_updates.
 * AI summaries via Hugging Face if HF_TOKEN is set.
 *
 * Manual invoke:  POST /functions/v1/monitor-law-changes
 * Scheduled via:  Vercel Cron (see vercel.json) or pg_cron
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ── Pages to monitor ──────────────────────────────────────────────────────────
const MONITORED_PAGES = [
  {
    jurisdiction: "Ontario",
    law_name: "Employment Standards Act, 2000",
    url: "https://www.ontario.ca/laws/statute/00e41",
  },
  {
    jurisdiction: "Ontario",
    law_name: "Ontario Human Rights Code",
    url: "https://www.ontario.ca/laws/statute/90h19",
  },
  {
    jurisdiction: "Federal",
    law_name: "Canada Labour Code",
    url: "https://laws-lois.justice.gc.ca/eng/acts/L-2/",
  },
  {
    jurisdiction: "British Columbia",
    law_name: "Employment Standards Act (BC)",
    url: "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/96113_01",
  },
  {
    jurisdiction: "Alberta",
    law_name: "Employment Standards Code (AB)",
    url: "https://www.qp.alberta.ca/documents/Acts/E09.pdf",
  },
  {
    jurisdiction: "Quebec",
    law_name: "Act respecting labour standards (LNT)",
    url: "https://legisquebec.gouv.qc.ca/en/document/cs/N-1.1",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Strip HTML tags and collapse whitespace to get comparable plain text. */
function extractText(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

/** SHA-256 hash a string, return hex. */
async function sha256(text: string): Promise<string> {
  const encoded = new TextEncoder().encode(text);
  const hashBuf = await crypto.subtle.digest("SHA-256", encoded);
  return Array.from(new Uint8Array(hashBuf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

/** Fetch a page with a timeout. Returns null on failure. */
async function fetchPage(url: string, timeoutMs = 15000): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: { "User-Agent": "Dutiva-LawMonitor/1.0 (compliance@dutiva.ca)" },
    });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    clearTimeout(timer);
    return null;
  }
}

/** Ask HF Mistral to summarize what changed. */
async function summarizeChange(
  lawName: string,
  jurisdiction: string,
  snippet: string,
  hfToken: string,
): Promise<string> {
  try {
    const res = await fetch(
      "https://api-inference.huggingface.co/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/Mistral-7B-Instruct-v0.3",
          messages: [
            {
              role: "system",
              content:
                "You are a Canadian employment law specialist. Summarize detected changes " +
                "to employment legislation in 2-3 plain-English sentences, focusing on " +
                "employer and HR obligations. Be specific and factual.",
            },
            {
              role: "user",
              content:
                `A change was detected on the ${jurisdiction} "${lawName}" legislation page. ` +
                `Here is a content excerpt:\n\n${snippet.slice(0, 1500)}\n\n` +
                "What changed and what does it mean for employers?",
            },
          ],
          max_tokens: 200,
          temperature: 0.2,
        }),
      },
    );
    if (!res.ok) return "Change detected — please review the legislation page directly.";
    const data = await res.json();
    return data.choices?.[0]?.message?.content?.trim() ??
      "Change detected — please review the legislation page directly.";
  } catch {
    return "Change detected — please review the legislation page directly.";
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────

Deno.serve(async (req) => {
  // Allow both scheduled POST and manual GET/POST
  if (req.method !== "POST" && req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const hfToken = Deno.env.get("HF_TOKEN") ?? "";

  const db = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  // Load existing hashes from DB
  const { data: hashRows } = await db.from("law_page_hashes").select("*");
  const hashMap: Record<string, string> = {};
  for (const row of hashRows ?? []) {
    hashMap[row.url] = row.content_hash;
  }

  const results: string[] = [];

  for (const page of MONITORED_PAGES) {
    try {
      const html = await fetchPage(page.url);
      if (!html) {
        results.push(`SKIP ${page.jurisdiction}/${page.law_name}: fetch failed`);
        continue;
      }

      const text = extractText(html);
      const hash = await sha256(text);
      const previousHash = hashMap[page.url];
      const isNew = !previousHash;
      const changed = isNew || previousHash !== hash;

      // Update last_checked regardless
      await db.from("law_page_hashes").upsert({
        url: page.url,
        jurisdiction: page.jurisdiction,
        law_name: page.law_name,
        content_hash: hash,
        last_checked: new Date().toISOString(),
      });

      if (!changed) {
        results.push(`OK   ${page.jurisdiction}/${page.law_name}: no change`);
        continue;
      }

      // Generate AI summary of the change
      const snippet = text.slice(0, 2000);
      const summary = hfToken
        ? await summarizeChange(page.law_name, page.jurisdiction, snippet, hfToken)
        : `Change detected on ${page.law_name}. Review the page for details.`;

      await db.from("law_updates").insert({
        jurisdiction: page.jurisdiction,
        law_name: page.law_name,
        url: page.url,
        content_hash: hash,
        change_summary: summary,
        raw_diff: snippet,
        detected_at: new Date().toISOString(),
        is_new: isNew,
      });

      results.push(
        `CHANGE ${page.jurisdiction}/${page.law_name}: ${isNew ? "first detection" : "content changed"}`,
      );
    } catch (err) {
      results.push(`ERROR ${page.jurisdiction}/${page.law_name}: ${String(err)}`);
    }
  }

  return new Response(
    JSON.stringify({ ok: true, checked: MONITORED_PAGES.length, results }),
    { headers: { "Content-Type": "application/json" } },
  );
});
