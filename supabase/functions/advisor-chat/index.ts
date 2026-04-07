import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

const SYSTEM_PROMPT =
  "You are a Canadian HR compliance advisor specializing in employment law across all Canadian provinces and territories. " +
  "You provide clear, authoritative, and practical guidance to HR professionals and small business owners. " +
  "Always note the relevant province or territory when giving advice. " +
  "Be concise but thorough. " +
  "If a question involves complex legal matters, recommend consulting a qualified employment lawyer. " +
  "Do not provide legal advice that substitutes for professional legal counsel.";

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const openaiKey = Deno.env.get("OPENAI_API_KEY");
  if (!openaiKey) {
    return new Response(JSON.stringify({ error: "AI service not configured." }), {
      status: 503,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  let body: { messages?: { role: string; content: string }[]; province?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const { messages = [], province } = body;

  const systemContent = province
    ? `${SYSTEM_PROMPT} The user's current province context is: ${province}.`
    : SYSTEM_PROMPT;

  const openaiMessages = [
    { role: "system", content: systemContent },
    ...messages.map((m) => ({ role: m.role === "user" ? "user" : "assistant", content: m.text ?? m.content ?? "" })),
  ];

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${openaiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: openaiMessages,
        max_tokens: 800,
        temperature: 0.4,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI error:", errText);
      return new Response(JSON.stringify({ error: "AI service error. Please try again." }), {
        status: 502,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content ?? "No response from AI.";

    return new Response(JSON.stringify({ reply }), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(JSON.stringify({ error: "Failed to reach AI service." }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
});
