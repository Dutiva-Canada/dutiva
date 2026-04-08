/**
 * Vercel Serverless function: /api/advisor-chat
 *
 * Streams Canadian HR compliance responses via the HF Inference API (SSE).
 * HF_TOKEN never reaches the browser — only this server-side function sees it.
 *
 * Scalability hardening (April 2026):
 *   - Per-IP rate limiting: max 15 requests / minute per IP
 *   - HF 429 retry: single retry with 2 s backoff before surfacing error
 *   - Input validation: max 2 000 chars/message, max 12 messages in history
 *   - Body size guard: reject payloads > 32 KB
 *   - Request ID for log correlation
 */

export const config = { maxDuration: 60 }; // Vercel Serverless: up to 60 s on Hobby

const HF_MODEL = "Qwen/Qwen2.5-7B-Instruct";
const HF_API   = "https://router.huggingface.co/v1/chat/completions";

// ── Rate limiter (in-memory, resets per serverless instance) ─────────────────
// Not a global rate limiter, but still throttles bursts effectively on warm
// instances and is zero-cost (no Redis needed until 5K+ concurrent users).
const RATE_WINDOW_MS   = 60_000; // 1 minute
const RATE_LIMIT       = 15;     // requests per IP per window

const rateLimitMap = new Map(); // ip → { count: number, windowStart: number }

function checkRateLimit(ip) {
  const now   = Date.now();
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

// Prune stale entries periodically (keep map from growing unboundedly)
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
  "Newfoundland and Labrador": "Labour Standards Act (RSNL 1990, c L-2)",
  "Prince Edward Island":      "Employment Standards Act (RSPEI 1988, c E-6.2)",
  "Northwest Territories":     "Employment Standards Act (SNWT 2007, c 13)",
  Nunavut:                     "Labour Standards Act (RSNWT (Nu) 1988, c L-1)",
  Yukon:                       "Employment Standards Act (RSY 2002, c 72)",
};

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

  return `You are a Canadian HR compliance advisor embedded in Dutiva (dutiva.ca). You are knowledgeable, warm, and conversational — not a legal robot.

PRIMARY JURISDICTION: ${province} — cite ${actRef} first. Note material differences in other provinces only when directly relevant.

TONE & CONVERSATION RULES:
- Respond naturally. Never end a reply with redirect phrases like "How can I assist you with HR compliance?" or "Feel free to ask any HR compliance questions." Let the conversation flow on its own.
- When someone mentions mental health, stress, burnout, or personal struggles, respond with genuine warmth and empathy. You may briefly connect it to relevant workplace considerations (duty to accommodate, mental health support obligations) only when it fits naturally — don't force it.
- Match the register of the message. Casual greetings get a warm, brief reply. Deep legal questions get thorough answers. Don't be formal when the person is being human.

ANSWER RULES (for substantive HR/legal questions):
1. Answer directly and concisely (under 220 words).
2. Cite exact legislation sections (e.g. "ESA, 2000, s. 57(1)").
3. Distinguish statutory minimums from common-law obligations.
4. Flag when legal counsel is needed for complex situations.
5. Do NOT add any disclaimer like "This is general guidance, not legal advice" — the UI displays that persistently.${lawContext}`;
}

/** Read the raw body of a Node.js IncomingMessage (with 32 KB size guard). */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    let size = 0;
    const MAX_BYTES = 32_768; // 32 KB

    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > MAX_BYTES) {
        reject(new Error("PAYLOAD_TOO_LARGE"));
        return;
      }
      data += chunk;
    });
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch  { reject(new Error("INVALID_JSON")); }
    });
    req.on("error", reject);
  });
}

/** Single HF fetch attempt. Returns { response, error }. */
async function fetchHF(hfMessages, hfToken, signal) {
  try {
    const response = await fetch(HF_API, {
      method: "POST",
      headers: {
        Authorization:  `Bearer ${hfToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model:       HF_MODEL,
        messages:    hfMessages,
        max_tokens:  380,
        temperature: 0.3,
        stream:      true,
      }),
      signal,
    });
    return { response, error: null };
  } catch (err) {
    return { response: null, error: err };
  }
}

/** Sleep helper for retry backoff. */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default async function handler(req, res) {
  const reqId = Math.random().toString(36).slice(2, 8); // for log correlation

  // ── method guard ─────────────────────────────────────────────────────────────
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // ── rate limit ───────────────────────────────────────────────────────────────
  pruneRateLimitMap();
  const clientIp =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";

  const rl = checkRateLimit(clientIp);
  if (!rl.allowed) {
    res.setHeader("Retry-After", String(rl.retryAfter));
    res.setHeader("X-RateLimit-Limit",     String(RATE_LIMIT));
    res.setHeader("X-RateLimit-Remaining", "0");
    res.status(429).json({
      error: `Too many requests — please wait ${rl.retryAfter} seconds before asking again.`,
    });
    return;
  }
  res.setHeader("X-RateLimit-Limit",     String(RATE_LIMIT));
  res.setHeader("X-RateLimit-Remaining", String(rl.remaining));

  // ── token guard ──────────────────────────────────────────────────────────────
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    res.status(503).json({
      error: "HF_TOKEN not configured — add it in Vercel project settings.",
    });
    return;
  }

  // ── body ─────────────────────────────────────────────────────────────────────
  let body;
  try {
    body = await readBody(req);
  } catch (e) {
    if (e.message === "PAYLOAD_TOO_LARGE") {
      res.status(413).json({ error: "Request too large." });
    } else {
      res.status(400).json({ error: "Invalid JSON body." });
    }
    return;
  }

  let { messages = [], province = "Ontario", lawUpdates = [] } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required." });
    return;
  }

  // Input validation: cap message length and history depth
  const MAX_MSG_CHARS = 2_000;
  messages = messages
    .slice(-12)
    .map((m) => ({
      ...m,
      text: typeof m.text === "string"
        ? m.text.slice(0, MAX_MSG_CHARS)
        : String(m.text).slice(0, MAX_MSG_CHARS),
    }));

  const hfMessages = [
    { role: "system", content: buildSystemPrompt(province, lawUpdates) },
    ...messages.map((m) => ({
      role:    m.role === "assistant" ? "assistant" : "user",
      content: m.text,
    })),
  ];

  // ── call HF with 55 s abort + single 429 retry ───────────────────────────────
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 55_000);

  let hfResponse = null;
  let fetchErr   = null;

  for (let attempt = 0; attempt < 2; attempt++) {
    const { response, error } = await fetchHF(hfMessages, hfToken, controller.signal);

    if (error) {
      fetchErr = error;
      break; // network error — don't retry
    }

    if (response.status === 429 && attempt === 0) {
      // HF rate-limited: wait 2 s and retry once
      console.warn(`[${reqId}] HF 429 on attempt 0 — retrying in 2 s`);
      await sleep(2_000);
      continue;
    }

    hfResponse = response;
    break;
  }

  if (fetchErr) {
    clearTimeout(timeoutId);
    if (fetchErr.name === "AbortError") {
      res.status(504).json({
        error: "The AI took too long to respond. Please try again — it should be faster now that the model is warm.",
      });
    } else {
      res.status(502).json({
        error: "Could not reach the AI service. Please check your connection and try again.",
      });
    }
    return;
  }

  // ── HF-level errors ───────────────────────────────────────────────────────────
  if (!hfResponse.ok) {
    clearTimeout(timeoutId);
    const errBody = await hfResponse.text().catch(() => String(hfResponse.status));
    console.error(`[${reqId}] HF API error ${hfResponse.status}:`, errBody);

    if (hfResponse.status === 429) {
      res.status(429).json({
        error: "The AI service is busy right now. Please wait a few seconds and try again.",
      });
    } else if (hfResponse.status === 503) {
      res.status(503).json({
        error: "The AI model is loading. Please try again in about 20 seconds.",
      });
    } else {
      res.status(502).json({
        error: `AI service returned an error (${hfResponse.status}). Please try again.`,
      });
    }
    return;
  }

  // ── pipe SSE stream from HF straight to client ───────────────────────────────
  res.setHeader("Content-Type",      "text/event-stream");
  res.setHeader("Cache-Control",     "no-store");
  res.setHeader("X-Accel-Buffering", "no");
  res.setHeader("X-Request-Id",      reqId);

  const reader = hfResponse.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } catch (streamErr) {
    console.error(`[${reqId}] Stream error:`, streamErr);
  } finally {
    clearTimeout(timeoutId);
    res.end();
  }
}
