import { Check, Sparkles } from "lucide-react";

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

      <button
        className={[
          "mt-8 w-full px-4 py-3 text-sm",
          featured ? "gold-button" : "ghost-button",
        ].join(" ")}
      >
        {cta}
      </button>
    </div>
  );
}

export default function PricingPage() {
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
            Built to feel premium and credible from the first impression. Simple enough for early
            adoption, structured enough to support a more serious SaaS story.
          </p>
        </div>

        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          <PriceCard
            title="Starter"
            price="Free"
            desc="For early exploration, validation, and lightweight document generation."
            features={[
              "Core template access",
              "Basic workspace experience",
              "Early-stage evaluation flow",
            ]}
            cta="Start free"
          />

          <PriceCard
            title="Growth"
            price="$39"
            suffix="/mo"
            featured
            desc="For SMBs and growing teams that need a cleaner compliance workflow."
            features={[
              "Expanded template access",
              "Premium dashboard + advisor experience",
              "Better fit for real customer conversions",
            ]}
            cta="Choose Growth"
          />

          <PriceCard
            title="Advanced"
            price="Custom"
            desc="For mature teams that want more flexibility and tailored rollout options."
            features={[
              "Custom implementation path",
              "More operational flexibility",
              "Room for future expansion",
            ]}
            cta="Talk to sales"
          />
        </div>
      </Section>
    </div>
  );
}
