import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { customerId } = JSON.parse(req.body);

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: process.env.VITE_SITE_URL + "/app/settings",
  });

  res.status(200).json({ url: session.url });
}
