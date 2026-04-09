import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const STRIPE_API_URL = "https://api.stripe.com/v1";

// Allowed origins for Stripe return URLs — prevents open-redirect abuse
const ALLOWED_RETURN_ORIGINS = [
  "https://dutiva.ca",
  "https://dutiva.vercel.app",
  "http://localhost:5173",
  "http://localhost:4173",
];

function isAllowedReturnUrl(raw: string | undefined): boolean {
  if (typeof raw !== "string" || raw.length === 0) return false;
  try {
    const url = new URL(raw);
    if (!["https:", "http:"].includes(url.protocol)) return false;
    // http: only permitted for localhost during local development
    if (url.protocol === "http:" && !["localhost", "127.0.0.1", "[::1]"].includes(url.hostname)) return false;
    const origin = `${url.protocol}//${url.host}`;
    return ALLOWED_RETURN_ORIGINS.includes(origin);
  } catch {
    return false;
  }
}

async function stripePost(path: string, params: Record<string, string>, secretKey: string) {
  const body = new URLSearchParams(params).toString();
  const res = await fetch(`${STRIPE_API_URL}${path}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${secretKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });
  return res.json();
}

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

  const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
  const priceGrowth = Deno.env.get("STRIPE_PRICE_GROWTH");
  const priceAdvanced = Deno.env.get("STRIPE_PRICE_ADVANCED");

  if (!stripeKey || !priceGrowth || !priceAdvanced) {
    return new Response(JSON.stringify({ error: "Payments not configured." }), {
      status: 503,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  // Auth check
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, supabaseKey);

  const token = authHeader.replace("Bearer ", "");
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);
  if (authError || !user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  let body: { plan?: string; successUrl?: string; cancelUrl?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid body." }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const { plan, successUrl, cancelUrl } = body;
  if (!plan || !successUrl || !cancelUrl) {
    return new Response(JSON.stringify({ error: "Missing required fields." }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  if (!isAllowedReturnUrl(successUrl) || !isAllowedReturnUrl(cancelUrl)) {
    return new Response(JSON.stringify({ error: "Invalid return URL." }), {
      status: 400,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  const priceId = plan === "advanced" ? priceAdvanced : priceGrowth;

  // Look up or create Stripe customer
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .maybeSingle();

  let customerId = profile?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripePost("/customers", {
      email: user.email ?? "",
      "metadata[user_id]": user.id,
    }, stripeKey);
    customerId = customer.id;
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripePost("/checkout/sessions", {
    customer: customerId,
    mode: "subscription",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: successUrl,
    cancel_url: cancelUrl,
    "metadata[user_id]": user.id,
    "metadata[plan]": plan,
  }, stripeKey);

  if (!session.url) {
    return new Response(JSON.stringify({ error: "Failed to create checkout session." }), {
      status: 502,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
  });
});
