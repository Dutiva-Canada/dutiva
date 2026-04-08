/**
 * Vercel Serverless function: /api/advisor-chat
 *
 * Streams Canadian HR compliance responses via the HF Inference API (SSE).
 * HF_TOKEN never reaches the browser — only this server-side function sees it.
 *
 * Why Node.js Serverless (not Edge):
 *   - Edge functions have a 30 s hard wall-clock limit on Vercel Hobby.
 *   - Serverless allows up to 60 s (maxDuration below), giving HF time to warm
 *     up the model and return the first token without a 504.
 */

export const config = { maxDuration: 60 }; // Vercel serverless: up to 60 s on Hobby

// Qwen2.5-7B: extremely popular → usually warm on HF Serverless API,
// fast first-token (~2-4 s when warm), great instruction following.
const HF_MODEL = "Qwen/Qwen2.5-7B-Instruct";
const HF_API   = "https://router.huggingface.co/v1/chat/completions"; // api-inference.huggingface.co deprecated → 410

const PROVINCE_ACTS = {
  Ontario:                   "ESA, 2000 (S.O. 2000, c. 41)",
  "British Columbia":        "Employment Standards Act (RSBC 1996, c. 113)",
  Alberta:                   "Employment Standards Code (RSA 2000, c. E-9)",
  Quebec:                    "Act Respecting Labour Standards (CQLR c N-1.1)",
  Manitoba:                  "Employment Standards Code (CCSM c E110)",
  Saskatchewan:              "Saskatchewan Employment Act (SS 2013, c S-15.1)",
  "Nova Scotia":             "Labour Standards Code (RSNS 1989, c 246)",
  "New Brunswick":           "Employment Standards Act (SNB 1982, c E-7.2)",
  Federal:                   "Canada Labour Code (RSC 1985, c L-2)",
  "Newfoundland and Labrador": "Labour Standards Act (RSNL 1990, c L-2)",
  "Prince Edward Island":    "Employment Standards Act (RSPEI 1988, c E-6.2)",
  "Northwest Territories":   "Employment Standards Act (SNWT 2007, c 13)",
  Nunavut:                   "Labour Standards Act (RSNWT (Nu) 1988, c L-1)",
  Yukon:                     "Employment Standards Act (RSY 2002, c 72)",
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
4. Flag when legal counsel is needed.
5. Close substantive legal answers with: "This is general guidance, not legal advice." — skip this on casual or emotional messages.${lawContext}`;
}

/** Read the raw body of a Node.js IncomingMessage. */
function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => {
      try { resolve(JSON.parse(data)); }
      catch  { reject(new Error("Invalid JSON")); }
    });
    req.on("error", reject);
  });
}

export default async function handler(req, res) {
  // ── method guard ──────────────────────────────────────────────────────────
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // ── token guard ───────────────────────────────────────────────────────────
  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    res.status(503).json({
      error: "HF_TOKEN not configured — add it in Vercel project settings.",
    });
    return;
  }

  // ── body ──────────────────────────────────────────────────────────────────
  let body;
  try {
    body = await readBody(req);
  } catch {
    res.status(400).json({ error: "Invalid JSON body" });
    return;
  }

  const { messages = [], province = "Ontario", lawUpdates = [] } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "messages array is required" });
    return;
  }

  const hfMessages = [
    { role: "system", content: buildSystemPrompt(province, lawUpdates) },
    ...messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: typeof m.text === "string" ? m.text : String(m.text),
    })),
  ];

  // ── call HF with a 55 s timeout (fires before Vercel's 60 s limit) ────────
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), 55_000);

  let hfResponse;
  try {
    hfResponse = await fetch(HF_API, {
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
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
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

  // ── HF-level errors ───────────────────────────────────────────────────────
  if (!hfResponse.ok) {
    clearTimeout(timeoutId);
    const errBody = await hfResponse.text().catch(() => String(hfResponse.status));
    console.error(`HF API error ${hfResponse.status}:`, errBody);

    if (hfResponse.status === 429) {
      res.status(429).json({
        error: "AI service is temporarily busy. Please wait a few seconds and try again.",
      });
    } else {
      res.status(502).json({
        error: `AI service returned an error (${hfResponse.status}). Please try again.`,
      });
    }
    return;
  }

  // ── pipe SSE stream from HF straight to the client ───────────────────────
  res.setHeader("Content-Type",    "text/event-stream");
  res.setHeader("Cache-Control",   "no-store");
  res.setHeader("X-Accel-Buffering", "no");

  const reader = hfResponse.body.getReader();
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  } catch (streamErr) {
    console.error("Stream error:", streamErr);
  } finally {
    clearTimeout(timeoutId);
    res.end();
  }
}
