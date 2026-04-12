/**
 * Vercel Serverless function: /api/advisor-chat
 *
 * Flow:
 *   1. If the latest user message seems to need current info, call Brave Search API
 *      (top 3 results become grounding context for the LLM).
 *   2. Call Hugging Face Inference API (Mistral-7B-Instruct-v0.3) with a
 *      Mistral-formatted [INST] prompt.
 *   3. Return { response: string, sources: Array<{title, url}> }.
 *
 * Environment variables required (set in Vercel project settings):
 *   HUGGINGFACE_API_KEY  — free token from huggingface.co/settings/tokens
 *   BRAVE_SEARCH_API_KEY — free from brave.com/search/api (2,000 queries/month)
 *
 * Scalability hardening:
 *   - Per-IP rate limiting: max 15 requests / minute (in-memory, per warm instance)
 *   - HF 429 retry: single retry with 2 s backoff
 *   - Input validation: max 2,000 chars/message, max 12 messages in history
 *   - Body size guard: reject payloads > 32 KB
 *   - 55 s abort timeout on HF call
 *   - Brave Search times out after 5 s (never blocks the main response)
 */

export const config = { maxDuration: 60 };

const HF_MODEL    = "HuggingFaceH4/zephyr-7b-beta";
const HF_MODEL_URL =
  `https://api-inference.huggingface.co/models/${HF_MODEL}/v1/chat/completions`;

// ── Rate limiter (in-memory, resets per serverless instance) ─────────────────
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 15;
const rateLimitMap = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  if (entry.count >= RATE_LIMIT) {
    const retryAfter = Math.ceil((RATE_WINDOW_MS - (now - entry.windowStart)) / 1000);
    return { allowed: false, remaining: 0, retryAfter };
  }
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

let lastPrune = Date.now();
function pruneRateLimitMap() {
  const now = Date.now();
  if (now - lastPrune < 120_000) return;
  lastPrune = now;
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now - entry.windowStart > RATE_WINDOW_MS * 2) rateLimitMap.delete(ip);
  }
}

// ── Province → statute map ────────────────────────────────────────────────────
const PROVINCE_ACTS = {
  Ontario:                     "ESA, 2000 (S.O. 2000, c. 41)",
  "British Columbia":          "Employment Standards Act (RSBC 1996, c. 113)",
  Alberta:                     "Employment Standards Code (RSA 2000, c. E-9)",
  Quebec:                      "Act Respecting Labour Standards (CQLR c N-1.1)",
  Manitoba:                    "Employment Standards Code (CCSM c E110)",
  Saskatchewan:                "Saskatchewan Employment Act (SS 2013, c S-15.1)",
  "Nova Scotia":               "Labour Standards Code (RSNS 1989, c 246)",
  "New Brunswick":             "Employment Standards Act (SNB 1982, c E-7.2)",
  Federal:                     "Canada Labour Code (RSC 1985, c L-2)",
  "Remote (Federal)":          "Canada Labour Code (RSC 1985, c L-2)",
  "Newfoundland and Labrador": "Labour Standards Act (RSNL 1990, c L-2)",
  "Prince Edward Island":      "Employment Standards Act (RSPEI 1988, c E-6.2)",
  "Northwest Territories":     "Employment Standards Act (SNWT 2007, c 13)",
  Nunavut:                     "Labour Standards Act (RSNWT (Nu) 1988, c L-1)",
  Yukon:                       "Employment Standards Act (RSY 2002, c 72)",
};

// ── Web search heuristic ──────────────────────────────────────────────────────
const NEEDS_SEARCH_RE =
  /\b(current|recent|latest|new|update|change|2024|2025|2026|minimum wage|minimum salary|today|now|this year|last year|bill|regulation|amendment|ontario reg|federal reg|effective date|in force)\b/i;

function needsWebSearch(text) {
  return NEEDS_SEARCH_RE.test(text);
}

// ── Brave Search ──────────────────────────────────────────────────────────────
async function braveSearch(query, apiKey) {
  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=3`;
    const resp = await fetch(url, {
      headers: {
        "X-Subscription-Token": apiKey,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(5_000),
    });
    if (!resp.ok) return { snippets: [], sources: [] };
    const data = await resp.json();
    const results = data.web?.results || [];
    return {
      snippets: results.map((r) => `${r.title}: ${r.description || r.snippet || ""}`),
      sources:  results.map((r) => ({ title: r.title, url: r.url })),
    };
  } catch {
    // Brave Search is best-effort — never block the main response
    return { snippets: [], sources: [] };
  }
}

// ── Prompt builders ───────────────────────────────────────────────────────────
function buildSystemPrompt(province, lawUpdates = []) {
  const actRef = PROVINCE_ACTS[province] || PROVINCE_ACTS["Ontario"];
  const lawContext =
    lawUpdates.length > 0
      ? `\n\nRECENT LEGISLATIVE CHANGES:\n${lawUpdates
          .map(
            (u) =>
              `• [${u.jurisdiction}] ${u.law_name}: ${
                u.change_summary || u.change_description || "Update detected"
              } (${new Date(u.detected_at).toLocaleDateString("en-CA")})`
          )
          .join("\n")}`
      : "";

  return `You are Dutiva's AI compliance advisor, specialized in Canadian employment law for Ontario, Quebec, and Federal jurisdictions (including remote workers under Federal standards).

You help HR professionals and business owners with:
- Employment Standards Act (Ontario), Act Respecting Labour Standards (Quebec), Canada Labour Code (Federal)
- Termination, notice periods, severance, and ESA entitlements
- Accommodation duties, leave management, and workplace wellness compliance
- Document guidance (offer letters, policies, termination letters)

PRIMARY JURISDICTION: ${province} — cite ${actRef} first. Note differences in other provinces only when directly relevant.

TONE & RULES:
- Be conversational, warm, and direct. Answer in under 220 words.
- Cite exact legislation sections (e.g. "ESA, 2000, s. 57(1)").
- Distinguish statutory minimums from common-law obligations.
- Flag when legal counsel is needed for complex situations.
- Do NOT add disclaimers like "This is general guidance, not legal advice" — the UI shows that persistently.
- If web search results are provided, use them to give current, accurate information.
- Always recommend consulting an employment lawyer for complex situations.${lawContext}`;
}

/**
 * Build an OpenAI-compatible messages array from conversation history.
 * System prompt is the first message; web search context is appended
 * to the last user turn.
 */
function buildChatMessages(systemPrompt, messages, webSearchContext) {
  const chatMessages = [{ role: "system", content: systemPrompt }];

  for (let i = 0; i < messages.length; i++) {
    const m = messages[i];
    const isLast = i === messages.length - 1;

    if (m.role === "user") {
      let content = m.text;
      if (isLast && webSearchContext) {
        content += `\n\nWEB SEARCH RESULTS (use these for current information):\n${webSearchContext}`;
      }
      chatMessages.push({ role: "user", content });
    } else if (m.role === "assistant") {
      chatMessages.push({ role: "assistant", content: m.text });
    }
  }

  return chatMessages;
}

// ── Body reader (32 KB guard) ─────────────────────────────────────────────────
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    let size = 0;
    const MAX_BYTES = 32_768;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BYTES) { reject(new Error("PAYLOAD_TOO_LARGE")); return; }
      data += chunk;
    });
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch  { reject(new Error("INVALID_JSON")); }
    });
    req.on("error", reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── Handler ───────────────────────────────────────────────────────────────────
export default async function handler(req, res) {
  const reqId = Math.random().toString(36).slice(2, 8);

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Rate limit
  pruneRateLimitMap();
  const clientIp =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rl = checkRateLimit(clientIp);
  if (!rl.allowed) {
    res.setHeader("Retry-After",           String(rl.retryAfter));
    res.setHeader("X-RateLimit-Limit",     String(RATE_LIMIT));
    res.setHeader("X-RateLimit-Remaining", "0");
    res.status(429).json({
      error: `Too many requests — please wait ${rl.retryAfter} seconds before asking again.`,
    });
    return;
  }
  res.setHeader("X-RateLimit-Limit",     String(RATE_LIMIT));
  res.setHeader("X-RateLimit-Remaining", String(rl.remaining));

  // Token guard
  const hfToken = process.env.HUGGINGFACE_API_KEY;
  if (!hfToken) {
    res.status(503).json({
      error: "HUGGINGFACE_API_KEY not configured — add it in Vercel project settings.",
    });
    return;
  }

  // Body
  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    res.status(e.message === "PAYLOAD_TOO_LARGE" ? 413 : 400).json({
      error: e.message === "PAYLOAD_TOO_LARGE" ? "Request too large." : "Invalid JSON body.",
    });
    return;
  }

  let { messages = [], province = "Ontario", lawUpdates = [] } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  // Validate & cap input
  const MAX_MSG_CHARS = 2_000;
  messages = messages.slice(-12).map((m) => ({
    ...m,
    text: typeof m.text === "string"
      ? m.text.slice(0, MAX_MSG_CHARS)
      : String(m.text ?? "").slice(0, MAX_MSG_CHARS),
  }));

  // Web search (best-effort, non-blocking on failure)
  const lastUserMsg = [...messages].reverse().find((m) => m.role === "user");
  let searchSources = [];
  let webSearchContext = "";

  const braveKey = process.env.BRAVE_SEARCH_API_KEY;
  if (braveKey && lastUserMsg && needsWebSearch(lastUserMsg.text)) {
    const query = `Canadian employment law ${province} ${lastUserMsg.text}`;
    const { snippets, sources } = await braveSearch(query, braveKey);
    if (snippets.length > 0) {
      webSearchContext = snippets.join("\n\n");
      searchSources   = sources;
    }
  }

  // Build prompt
  const systemPrompt  = buildSystemPrompt(province, lawUpdates);
  const chatMessages  = buildChatMessages(systemPrompt, messages, webSearchContext);

  // Call HF Inference API with retry on 429
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 55_000);

  let hfResponse = null;
  let fetchErr   = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const resp = await fetch(HF_MODEL_URL, {
        method: "POST",
        headers: {
          Authorization:  `Bearer ${hfToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model:       HF_MODEL,
          messages:    chatMessages,
          max_tokens:  1024,
          temperature: 0.3,
          stream:      false,
        }),
        signal: controller.signal,
      });

      if (resp.status === 429 && attempt === 0) {
        console.warn(`[${reqId}] HF 429 on attempt 0 — retrying in 2 s`);
        await sleep(2_000);
        continue;
      }

      hfResponse = resp;
      break;
    } catch (err) {
      fetchErr = err;
      break;
    }
  }

  clearTimeout(timeoutId);

  if (fetchErr) {
    const isTimeout = fetchErr.name === "AbortError";
    res.status(isTimeout ? 504 : 502).json({
      error: isTimeout
        ? "The AI took too long to respond. Please try again — it should be faster now that the model is warm."
        : "Could not reach the AI service. Please check your connection and try again.",
    });
    return;
  }

  if (!hfResponse.ok) {
    const errBody = await hfResponse.text().catch(() => String(hfResponse.status));
    console.error(`[${reqId}] HF API error ${hfResponse.status}:`, errBody);

    const statusMap = {
      429: "The AI service is busy right now. Please wait a few seconds and try again.",
      503: "The AI model is loading. Please try again in about 20 seconds.",
    };
    res.status(hfResponse.status === 429 || hfResponse.status === 503 ? hfResponse.status : 502).json({
      error: statusMap[hfResponse.status] || "The AI advisor is temporarily unavailable. Please try again in a moment.",
    });
    return;
  }

  let data;
  try {
    data = await hfResponse.json();
  } catch {
    res.status(502).json({ error: "Invalid response from AI service." });
    return;
  }

  // Chat completions returns: { choices: [{ message: { content: "..." } }] }
  const generated = data?.choices?.[0]?.message?.content;
  if (!generated) {
    res.status(502).json({ error: "No response from AI service." });
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.setHeader("X-Request-Id", reqId);
  res.status(200).json({
    response: generated.trim(),
    sources:  searchSources,
  });
}
