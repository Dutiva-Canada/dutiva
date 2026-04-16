import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { plan } = JSON.parse(req.body);

  const priceMap = {
    Growth: process.env.STRIPE_PRICE_GROWTH,
    Pro: process.env.STRIPE_PRICE_PRO,
  };

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceMap[plan], quantity: 1 }],
    success_url: `${process.env.VITE_SITE_URL}/payment-success`,
    cancel_url: `${process.env.VITE_SITE_URL}/pricing`,
  });

  res.status(200).json({ url: session.url });
}
