import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase";

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>{children}</section>;
}

function Pill({ children }) {
  return (
    <div className="rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
      {children}
    </div>
  );
}

function PriceCard({
  title,
  price,
  suffix,
  desc,
  features,
  featured = false,
  cta,
  to,
  onCheckout,
  loading = false,
}) {
  return (
    <div
      className={[
        "relative rounded-[28px] p-6",
        featured ? "premium-card-soft border-amber-400/20" : "premium-card",
      ].join(" ")}
    >
      {featured ? (
        <div className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1 text-xs font-medium text-amber-300">
          <Sparkles className="h-3.5 w-3.5" />
          Most popular
        </div>
      ) : null}

      <div className="text-lg font-semibold text-zinc-100">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{desc}</div>

      <div className="mt-6 flex items-end gap-2">
        <div className="metric-value text-5xl font-semibold tracking-tight text-zinc-50">
          {price}
        </div>
        {suffix ? <div className="pb-2 text-sm text-zinc-400">{suffix}</div> : null}
      </div>

      <div className="mt-6 space-y-3">
        {features.map((feature) => (
          <div key={feature} className="flex items-start gap-3 text-sm text-zinc-300">
            <div className="mt-0.5 grid h-5 w-5 place-items-center rounded-full bg-amber-400/10 text-amber-300">
              <Check className="h-3.5 w-3.5" />
            </div>
            <span>{feature}</span>
          </div>
        ))}
      </div>

      {onCheckout ? (
        <button
          type="button"
          disabled={loading}
          onClick={onCheckout}
          className={[
            "mt-8 inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed",
            featured ? "gold-button" : "ghost-button",
          ].join(" ")}
        >
          {loading ? "Redirecting..." : cta}
          {!loading && <ArrowRight className="h-4 w-4" />}
        </button>
      ) : (
        <Link
          to={to}
          className={[
            "mt-8 inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm",
            featured ? "gold-button" : "ghost-button",
          ].join(" ")}
        >
          {cta}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}

export default function PricingPage() {
  const { user } = useAuth();
  const [checkingOut, setCheckingOut] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);

  const handleCheckout = async (plan) => {
    if (!supabase || !user) {
      window.location.href = "/auth";
      return;
    }

    setCheckingOut(plan);
    setCheckoutError(null);

    try {
      const successUrl = `${window.location.origin}/payment-success?plan=${plan}`;
      const cancelUrl = `${window.location.origin}/pricing`;

      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { plan, successUrl, cancelUrl },
      });

      if (error || !data?.url) throw new Error(error?.message ?? "Could not start checkout.");

      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err.message ?? "Checkout failed. Please try again.");
    } finally {
      setCheckingOut(null);
    }
  };

  const handleContactSales = () => {
    window.location.href = "mailto:hello@dutiva.ca?subject=Advanced%20Plan%20Inquiry&body=Hi%2C%20I%27m%20interested%20in%20the%20Advanced%20plan%20for%20Dutiva.%20Here%27s%20a%20bit%20about%20my%20team%3A%20";
  };

  return (
    <div className="marketing-shell min-h-screen">
      <Section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Pill>Pricing</Pill>
          </div>

          <h1 className="metric-value mt-5 text-5xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            Clear pricing with room to grow.
          </h1>

          <p className="mt-4 text-lg leading-8 text-zinc-400">
            No contracts, no lock-in. Start free and upgrade when you need more.
            Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          <PriceCard
            title="Starter"
            price="Free"
            desc="Try the product, generate real documents, and validate Dutiva for your team."
            features={[
              "3 document generations per month",
              "Access to all 16 template types",
              "AI-assisted form filling",
            ]}
            cta="Start free"
            to="/app/generator?template=Offer%20Letter"
          />

          <PriceCard
            title="Growth"
            price="$39"
            suffix="/mo CAD"
            featured
            desc="For SMBs and growing teams that need compliant HR documents on a regular basis."
            features={[
              "Unlimited document generation",
              "AI Advisor with legislation citations",
              "ESA auto-calculator + e-signatures",
            ]}
            cta="Choose Growth"
            onCheckout={() => handleCheckout("growth")}
            loading={checkingOut === "growth"}
          />

          <PriceCard
            title="Advanced"
            price="Custom"
            desc="For organizations that need multi-user access, dedicated setup, or custom templates."
            features={[
              "Everything in Growth",
              "Multi-user team workspace",
              "Priority support and custom templates",
            ]}
            cta="Talk to us"
            onCheckout={handleContactSales}
            loading={false}
          />
        </div>

        {checkoutError && (
          <div className="mt-6 rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-center text-sm text-red-300">
            {checkoutError}
          </div>
        )}

        {/* FAQ / reassurance row */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-zinc-100">Is this legal advice?</div>
            <div className="mt-2 text-sm text-zinc-400">
              No. Dutiva provides general HR compliance guidance and document templates. For
              specific legal situations, consult an employment lawyer.
            </div>
          </div>
          <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-zinc-100">Which provinces are covered?</div>
            <div className="mt-2 text-sm text-zinc-400">
              All 10 provinces, 3 territories, and federal — 14 jurisdictions total, each with
              current Employment Standards Act references.
            </div>
          </div>
          <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-zinc-100">Is my data stored in Canada?</div>
            <div className="mt-2 text-sm text-zinc-400">
              Sensitive employee data is processed in your browser and never stored on our
              servers. Dutiva is PIPEDA-compliant by design.
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 rounded-[28px] border border-white/6 bg-white/[0.02] p-8 text-center">
          <div className="text-lg font-semibold text-zinc-100">
            Not sure which plan fits?
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            Start free — no credit card required. Generate a real document and see the quality
            before you decide. You can upgrade, downgrade, or cancel anytime.
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Start free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:hello@dutiva.ca"
              className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Contact us
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
