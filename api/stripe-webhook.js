import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const customerEmail = session.customer_email;

    await supabase
      .from("profiles")
      .update({
        plan: "growth",
        subscription_status: "active",
      })
      .eq("email", customerEmail);
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object;

    await supabase
      .from("profiles")
      .update({
        subscription_status: "inactive",
        plan: "free",
      })
      .eq("stripe_customer_id", subscription.customer);
  }

  res.status(200).json({ received: true });
}
