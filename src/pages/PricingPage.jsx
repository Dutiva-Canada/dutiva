import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { Helmet } from 'react-helmet-async';
import { trackEvent } from "../lib/analytics";

export default function PricingPage() {
  const { user } = useAuth();
  const { t } = useLang();

  const plans = [
    { name: "Starter", price: "$0", features: ["5 docs/month", "Basic templates"] },
    { name: "Growth", price: "$29/mo", highlight: true, features: ["Unlimited docs", "All templates"] },
    { name: "Pro", price: "$79/mo", features: ["Advanced tools", "Priority support"] },
  ];

  const handleCheckout = async (plan) => {
    trackEvent("pricing_select", { plan });

    if (!user) {
      window.location.href = "/auth";
      return;
    }

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      body: JSON.stringify({ plan }),
    });

    const { url } = await res.json();
    window.location.href = url;
  };

  return (
    <div className="marketing-shell min-h-screen px-4 py-12">
      <Helmet>
        <title>Dutiva Pricing</title>
      </Helmet>

      <div className="text-center mb-10">
        <h1 className="text-4xl text-zinc-50 font-semibold">Pricing</h1>
        <p className="text-zinc-400 mt-2">Simple, transparent pricing</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div key={plan.name} className={`premium-card p-6 ${plan.highlight ? "border-amber-400" : ""}`}>
            <h3 className="text-lg text-zinc-100 font-semibold">{plan.name}</h3>
            <div className="text-2xl text-amber-400 mt-2">{plan.price}</div>

            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {plan.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>

            <button
              onClick={() => handleCheckout(plan.name)}
              className="gold-button w-full mt-6 py-3 text-sm"
            >
              Get started
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/app"
          className="ghost-button px-5 py-3 text-sm"
          onClick={() => trackEvent("open_app_click", { location: "pricing" })}
        >
          Explore app
        </Link>
      </div>
    </div>
  );
}
