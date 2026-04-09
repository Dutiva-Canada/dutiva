import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

async function verifyStripeSignature(payload: string, sigHeader: string, secret: string): Promise<boolean> {
  const parts = sigHeader.split(",");
  const ts = parts.find((p) => p.startsWith("t="))?.slice(2);
  const v1 = parts.find((p) => p.startsWith("v1="))?.slice(3);
  if (!ts || !v1) return false;

  // Import key for constant-time HMAC verification
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );

  // Decode the submitted hex signature into bytes
  const signedPayload = `${ts}.${payload}`;
  if (v1.length % 2 !== 0) return false;
  const v1Bytes = new Uint8Array(v1.length / 2);
  for (let i = 0; i < v1Bytes.length; i++) {
    v1Bytes[i] = parseInt(v1.slice(i * 2, i * 2 + 2), 16);
  }

  // crypto.subtle.verify performs a constant-time comparison:
  // it checks whether v1Bytes is a valid HMAC-SHA256 of signedPayload
  return crypto.subtle.verify("HMAC", key, v1Bytes, new TextEncoder().encode(signedPayload));
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  if (!webhookSecret) {
    return new Response(JSON.stringify({ error: "Webhook not configured." }), { status: 503 });
  }

  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  const valid = await verifyStripeSignature(body, sig, webhookSecret);
  if (!valid) {
    return new Response(JSON.stringify({ error: "Invalid signature." }), { status: 400 });
  }

  const event = JSON.parse(body);
  const supabase = createClient(supabaseUrl, supabaseKey);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.metadata?.user_id;
    const plan = session.metadata?.plan ?? "growth";
    if (userId) {
      await supabase
        .from("profiles")
        .update({ plan, subscription_status: "active" })
        .eq("id", userId);
    }
  }

  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object;
    const customerId = sub.customer;
    const status = sub.status;
    if (customerId) {
      await supabase
        .from("profiles")
        .update({ subscription_status: status })
        .eq("stripe_customer_id", customerId);
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;
    const customerId = sub.customer;
    if (customerId) {
      await supabase
        .from("profiles")
        .update({ plan: "free", subscription_status: "canceled" })
        .eq("stripe_customer_id", customerId);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
