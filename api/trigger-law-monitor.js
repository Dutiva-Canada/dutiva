/**
 * Vercel Serverless Function — /api/trigger-law-monitor
 *
 * Called by Vercel Cron (see vercel.json) once per day at 07:00 UTC.
 * Invokes the Supabase Edge Function `monitor-law-changes` using the
 * service-role key so it runs with full DB access.
 *
 * Required env vars (set in Vercel project settings):
 *   SUPABASE_URL                — e.g. https://xyz.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY   — service role secret
 *   CRON_SECRET                 — shared secret to prevent unauthorized calls
 */

export const runtime = "edge";

export default async function handler(req) {
  // Verify the request comes from Vercel Cron or an authorized caller
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceKey) {
    return new Response(
      JSON.stringify({ error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  try {
    const res = await fetch(
      `${supabaseUrl}/functions/v1/monitor-law-changes`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${serviceKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    const body = await res.json();
    return new Response(JSON.stringify(body), {
      status: res.ok ? 200 : 502,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
