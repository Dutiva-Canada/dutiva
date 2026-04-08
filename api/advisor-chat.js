/**
 * Vercel serverless function: /api/advisor-chat
 * Proxies AI advisor requests to HF Inference API using a private HF_TOKEN.
 * The token never reaches the browser — only this function sees it.
 */

export const runtime = "edge";

const HF_MODEL = "mistralai/Mistral-7B-Instruct-v0.3";
const HF_API = "https://api-inference.huggingface.co/v1/chat/completions";

const PROVINCE_ACTS = {
  Ontario: "ESA, 2000 (S.O. 2000, c. 41)",
  "British Columbia": "Employment Standards Act (RSBC 1996, c. 113)",
  Alberta: "Employment Standards Code (RSA 2000, c. E-9)",
  Quebec: "Act Respecting Labour Standards (CQLR c N-1.1)",
  Manitoba: "Employment Standards Code (CCSM c E110)",
  Saskatchewan: "Saskatchewan Employment Act (SS 2013, c S-15.1)",
  "Nova Scotia": "Labour Standards Code (RSNS 1989, c 246)",
  "New Brunswick": "Employment Standards Act (SNB 1982, c E-7.2)",
  Federal: "Canada Labour Code (RSC 1985, c L-2)",
  "Newfoundland and Labrador": "Labour Standards Act (RSNL 1990, c L-2)",
  "Prince Edward Island": "Employment Standards Act (RSPEI 1988, c E-6.2)",
  "Northwest Territories": "Employment Standards Act (SNWT 2007, c 13)",
  Nunavut: "Labour Standards Act (RSNWT (Nu) 1988, c L-1)",
  Yukon: "Employment Standards Act (RSY 2002, c 72)",
};

function buildSystemPrompt(province, lawUpdates = []) {
  const actRef = PROVINCE_ACTS[province] || PROVINCE_ACTS["Ontario"];
  const lawContext =
    lawUpdates.length > 0
      ? `\n\nRECENT LEGISLATIVE CHANGES (incorporate into your answers where relevant):\n${lawUpdates
          .map(
            (u) =>
              `• [${u.jurisdiction}] ${u.law_name}: ${
                u.change_summary || u.change_description || "Update detected"
              } (detected ${new Date(u.detected_at).toLocaleDateString("en-CA")})`
          )
          .join("\n")}`
      : "";

  return `You are a Canadian HR compliance advisor embedded in Dutiva (dutiva.ca), a platform for employers to generate legally sound employment documents.

PRIMARY JURISDICTION: ${province} — cite ${actRef} and related regulations first. Note material differences in other provinces when relevant.

INSTRUCTIONS:
1. Answer the question directly and concisely (under 280 words).
2. Cite exact legislation sections (e.g. "ESA, 2000, s. 57(1)"; "Canada Labour Code, s. 230").
3. Distinguish between statutory minimums and common-law obligations.
4. Flag when the user should involve legal counsel.
5. End every response with a brief disclaimer: "This is general guidance, not legal advice."${lawContext}`;
}

export default async function handler(req) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const hfToken = process.env.HF_TOKEN;
  if (!hfToken) {
    return new Response(
      JSON.stringify({ error: "HF_TOKEN not configured — add it in Vercel project settings." }),
      { status: 503, headers: { "Content-Type": "application/json" } }
    );
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { messages = [], province = "Ontario", lawUpdates = [] } = body;

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages array is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Build the HF request
  const hfMessages = [
    { role: "system", content: buildSystemPrompt(province, lawUpdates) },
    ...messages.slice(-12).map((m) => ({
      role: m.role === "assistant" ? "assistant" : "user",
      content: typeof m.text === "string" ? m.text : String(m.text),
    })),
  ];

  const hfResponse = await fetch(HF_API, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${hfToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages: hfMessages,
      max_tokens: 512,
      temperature: 0.3,
      stream: false,
    }),
  });

  if (!hfResponse.ok) {
    const errBody = await hfResponse.text().catch(() => hfResponse.status.toString());
    console.error(`HF API error ${hfResponse.status}:`, errBody);

    // Surface rate-limit clearly
    if (hfResponse.status === 429) {
      return new Response(
        JSON.stringify({ error: "AI service is temporarily busy. Please try again in a few seconds." }),
        { status: 429, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ error: `AI service error (${hfResponse.status}). Please try again.` }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const data = await hfResponse.json();
  const reply =
    data.choices?.[0]?.message?.content?.trim() ??
    "I was unable to generate a response. Please try again.";

  return new Response(JSON.stringify({ reply }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
