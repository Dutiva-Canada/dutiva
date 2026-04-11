import "jsr:@supabase/functions-js/edge-runtime.d.ts";

// ── Config ───────────────────────────────────────────────────────────────────
const HF_ROUTER  = "https://router.huggingface.co/v1/chat/completions";
const HF_MODEL   = "meta-llama/Llama-3.3-70B-Instruct:cheapest";
const TAVILY_URL = "https://api.tavily.com/search";
const BRAVE_URL   = "https://api.search.brave.com/res/v1/web/search";

const CORS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ── System prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT =
  "You are Dutiva's AI Advisor \u2014 a Canadian HR and employment law compliance specialist. " +
  "You cover all provinces and territories, including the Canada Labour Code for federally regulated workplaces. " +
  "Your guidance is clear, structured, and practical for HR professionals and small business owners. " +
  "Always cite the relevant legislation (e.g. Ontario ESA, BC Employment Standards Act, Canada Labour Code). " +
  "When live web search results are included in your context, use them to ground your answer in current law \u2014 " +
  "note the source so the user can verify. " +
  "If a matter requires a qualified employment lawyer, say so explicitly. " +
  "Never fabricate statute numbers or case citations.";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Msg    { role: string; content?: string; text?: string; }
interface Source { snippet: string; url: string; title?: string; }

// ── Helpers ───────────────────────────────────────────────────────────────────
function needsWebSearch(messages: Msg[]): boolean {
  const last = messages.at(-1);
  const txt  = (last?.content ?? last?.text ?? "").toLowerCase();
  return /current|recent|latest|update|2024|2025|2026|change|new law|amended|bill|regulation|just passed/.test(txt);
}

function msgText(m: Msg): string {
  return m.text ?? m.content ?? "";
}

async function searchTavily(query: string, apiKey: string): Promise<Source[]> {
  const res = await fetch(TAVILY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key:      apiKey,
      query:        `${query} Canada employment law`,
      search_depth: "basic",
      max_results:  4,
      include_domains: [
        "ontario.ca", "canada.ca", "laws.justice.gc.ca",
        "canlii.org", "gov.bc.ca", "alberta.ca", "novascotia.ca",
      ],
    }),
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results ?? []).map((r: { content: string; url: string; title?: string }) => ({
    snippet: r.content?.slice(0, 400),
    url:     r.url,
    title:   r.title ?? "",
  }));
}

async function searchDDG(query: string): Promise<Source[]> {
  const q   = encodeURIComponent(`${query} Canada employment law`);
  const res = await fetch(
    `${DDG_URL}?q=${q}&format=json&no_redirect=1&no_html=1&skip_disambig=1`,
    { headers: { "User-Agent": "Dutiva-Advisor/1.0" } },
  );
  if (!res.ok) return [];
  const data = await res.json();
  const out: Source[] = [];
  if (data.AbstractText) {
    out.push({ snippet: data.AbstractText, url: data.AbstractURL ?? "", title: data.Heading ?? "" });
  }
  for (const t of (data.RelatedTopics ?? []).slice(0, 4)) {
    if (t.Text && t.FirstURL) out.push({ snippet: t.Text, url: t.FirstURL, title: (() => { try { return new URL(t.FirstURL).hostname.replace("www.", ""); } catch { return ""; } })() });
    if (t.Topics) {
      for (const sub of t.Topics.slice(0, 2)) {
        if (sub.Text && sub.FirstURL) out.push({ snippet: sub.Text, url: sub.FirstURL, title: (() => { try { return new URL(sub.FirstURL).hostname.replace("www.", ""); } catch { return ""; } })() });
      }
    }
  }
  return out.slice(0, 4);
}


async function searchBrave(query: string, apiKey: string): Promise<Source[]> {
  const q   = encodeURIComponent(`${query} Canada employment law`);
  const res = await fetch(`${BRAVE_URL}?q=${q}&count=4&freshness=pm`, {
    headers: {
      "Accept":               "application/json",
      "Accept-Encoding":      "gzip",
      "X-Subscription-Token": apiKey,
    },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return ((data.web?.results) ?? []).slice(0, 4).map((r: { description: string; url: string; title: string }) => ({
    snippet: r.description?.slice(0, 400) ?? "",
    url:     r.url,
    title:   r.title ?? "",
  }));
}

async function webSearch(query: string): Promise<Source[]> {
  const tavilyKey = Deno.env.get("TAVILY_API_KEY");
  try {
    if (tavilyKey) return await searchTavily(query, tavilyKey);
    const braveKey = Deno.env.get("BRAVE_SEARCH_API_KEY");
    if (braveKey) return await searchBrave(query, braveKey);
    return await searchDDG(query);
  } catch (e) {
    console.warn("Web search failed:", e);
    return [];
  }
}

// ── Main handler ──────────────────────────────────────────────────────────────
Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const hfKey = Deno.env.get("HF_API_KEY");
  const hfKey = Deno.env.get("HF_API_KEY") ?? Deno.env.get("HUGGINGFACE_API_KEY");
    return new Response(JSON.stringify({ error: "AI service not configured." }), {
      status: 503, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  let body: { messages?: Msg[]; province?: string; lawUpdates?: string[] };
  try { body = await req.json(); }
  catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }

  const { messages = [], province } = body;

  // ── Web search (only when question implies need for current info) ─────────
  let sources: Source[] = [];
  let searchContext = "";

  if (needsWebSearch(messages)) {
    const lastText = msgText(messages.at(-1) ?? {}).slice(0, 250);
    sources = await webSearch(lastText);
    if (sources.length > 0) {
      searchContext =
        "\n\n---\nLIVE WEB SEARCH RESULTS (use to answer with current law):\n" +
        sources
          .map((s, i) =>
            `[${i + 1}]${s.title ? " " + s.title : ""}\n${s.snippet}\nSource: ${s.url}`,
          )
          .join("\n\n") +
        "\n---";
    }
  }

  // ── Build messages for HF ─────────────────────────────────────────────────
  const systemContent = [
    SYSTEM_PROMPT,
    province ? `\nThe user's province/territory context is: ${province}.` : "",
    searchContext,
  ].join("");

  const hfMessages = [
    { role: "system", content: systemContent },
    ...messages.map((m) => ({
      role:    m.role === "user" ? "user" : "assistant",
      content: msgText(m),
    })),
  ];

  // ── Call HF router ────────────────────────────────────────────────────────
  try {
    const hfRes = await fetch(HF_ROUTER, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${hfKey}`,
        "Content-Type":  "application/json",
      },
      body: JSON.stringify({
        model:       HF_MODEL,
        messages:    hfMessages,
        max_tokens:  900,
        temperature: 0.35,
        stream:      false,
      }),
    });

    if (!hfRes.ok) {
      const errText = await hfRes.text();
      console.error("HF API error:", errText);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 502, headers: { ...CORS, "Content-Type": "application/json" },
      });
    }

    const data     = await hfRes.json();
    const response = data.choices?.[0]?.message?.content ?? "No response from AI.";

    return new Response(JSON.stringify({ response, sources }), {
      headers: { ...CORS, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("HF fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to reach AI service." }), {
      status: 502, headers: { ...CORS, "Content-Type": "application/json" },
    });
  }
});
