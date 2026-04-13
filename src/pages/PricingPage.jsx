import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { supabase } from "../lib/supabase";
import { Helmet } from 'react-helmet-async';

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
  const { t } = useLang();
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
          {t("Most popular", "Le plus populaire")}
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
          {loading ? t("Redirecting...", "Redirection en cours...") : cta}
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

// Annual savings: $39 * 12 = $468 vs $390 = $78 saved per year (~17%).
// TODO(stripe): Wire two Stripe price IDs for Growth — one monthly, one annual.
// price_growth_monthly_cad → $39/mo CAD recurring
// price_growth_annual_cad → $390/yr CAD recurring
// Pass { plan: "growth", billing: "monthly" | "annual" } to the Supabase edge
// function and let it pick the correct Stripe price ID server-side.
export default function PricingPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const [checkingOut, setCheckingOut] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [billing, setBilling] = useState("monthly"); // "monthly" | "annual"

  const growthPrice = billing === "annual" ? "$390" : "$39";
  const growthSuffix = billing === "annual" ? t("/yr CAD", "/an CAD") : t("/mo CAD", "/mois CAD");
  const growthCta =
    billing === "annual"
      ? t("Choose Growth · Annual", "Choisir Croissance · Annuel")
      : t("Choose Growth", "Choisir Croissance");

  const handleCheckout = async (plan) => {
    if (!supabase || !user) {
      window.location.href = "/auth";
      return;
    }
    setCheckingOut(plan);
    setCheckoutError(null);
    try {
      const successUrl = `${window.location.origin}/payment-success?plan=${plan}&billing=${billing}`;
      const cancelUrl = `${window.location.origin}/pricing`;
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: { plan, billing, successUrl, cancelUrl },
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
    window.location.href =
      "mailto:hello@dutiva.ca?subject=Advanced%20Plan%20Inquiry&body=Hi%2C%20I%27m%20interested%20in%20the%20Advanced%20plan%20for%20Dutiva.%20Here%27s%20a%20bit%20about%20my%20team%3A%20";
  };

  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Dutiva Pricing — Simple Plans for Canadian Teams</title>
        <meta
          name="description"
          content="Transparent pricing for employee scheduling software. No hidden fees. Built for Canadian SMBs."
        />
        <link rel="canonical" href="https://dutiva.ca/pricing" />
        <meta property="og:title" content="Dutiva Pricing — Simple Plans for Canadian Teams" />
        <meta
          property="og:description"
          content="Transparent pricing for employee scheduling software. No hidden fees. Built for Canadian SMBs."
        />
        <meta property="og:url" content="https://dutiva.ca/pricing" />
      </Helmet>
      <Section className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <div className="flex justify-center">
            <Pill>{t("Pricing", "Tarification")}</Pill>
          </div>
          <h1 className="metric-value mt-5 text-5xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            {t(
              "Clear pricing with room to grow.",
              "Une tarification claire avec de la place pour grandir."
            )}
          </h1>
          <p className="mt-4 text-lg leading-8 text-zinc-400">
            {t(
              "No contracts, no lock-in. Start free and upgrade when you need more. Cancel anytime.",
              "Sans contrat, sans engagement. Commencez gratuitement et passez à un forfait supérieur quand vous en avez besoin. Annulez à tout moment."
            )}
          </p>
          {/* Billing cycle toggle */}
          <div className="mt-8 flex justify-center">
            <div
              role="tablist"
              aria-label="Billing cycle"
              className="inline-flex items-center gap-1 rounded-full border border-white/6 bg-white/[0.03] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={billing === "monthly"}
                onClick={() => setBilling("monthly")}
                className={[
                  "rounded-full px-4 py-2 text-sm transition",
                  billing === "monthly"
                    ? "bg-amber-400/12 text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    : "text-zinc-400 hover:text-zinc-200",
                ].join(" ")}
              >
                {t("Monthly", "Mensuel")}
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={billing === "annual"}
                onClick={() => setBilling("annual")}
                className={[
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition",
                  billing === "annual"
                    ? "bg-amber-400/12 text-amber-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
                    : "text-zinc-400 hover:text-zinc-200",
                ].join(" ")}
              >
                {t("Annual", "Annuel")}
                <span className="rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-300">
                  {t("Save $78", "Économisez 78 $")}
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 grid gap-6 xl:grid-cols-3">
          <PriceCard
            title={t("Starter", "Démarrage")}
            price={t("Free", "Gratuit")}
            desc={t(
              "Try the product, generate real documents, and explore the full compliance suite.",
              "Essayez le produit, générez de vrais documents et explorez la suite de conformité complète."
            )}
            features={[
              t("3 document generations per month", "3 générations de documents par mois"),
              t("Access to all 20 bilingual template types", "Accès aux 20 types de modèles bilingues"),
              t("AI-assisted form filling", "Remplissage de formulaires assisté par IA"),
              t(
                "Ring 1-4 compliance tools (read access)",
                "Outils de conformité Anneaux 1-4 (accès en lecture)"
              ),
            ]}
            cta={t("Start free", "Commencer gratuitement")}
            to="/app/generator?template=Offer%20Letter"
          />
          <PriceCard
            title={t("Growth", "Croissance")}
            price={growthPrice}
            suffix={growthSuffix}
            featured
            desc={
              billing === "annual"
                ? t(
                    "For SMBs committing for the year — same features, best price.",
                    "Pour les PME qui s’engagent pour l’année — mêmes fonctionnalités, meilleur prix."
                  )
                : t(
                    "For SMBs and growing teams that need compliant HR documents on a regular basis.",
                    "Pour les PME et les équipes en croissance qui ont besoin de documents RH conformes régulièrement."
                  )
            }
            features={[
              t("Unlimited document generation", "Génération de documents illimitée"),
              t("All 20 bilingual HR templates", "Les 20 modèles RH bilingues"),
              t("AI Advisor — ESA, LNT & CLC citations", "Conseiller IA — références LNE, LNT et CCT"),
              t(
                "Ring 2: Wellness — accommodation, mental health & leave tools",
                "Anneau 2 : Bien-être — accommodement, santé mentale et congés"
              ),
              t(
                "Ring 3: Communications — layoff scripts, policy memos & crisis guides",
                "Anneau 3 : Communications — scripts de licenciement, mémos et guides de crise"
              ),
              t(
                "Ring 4: Compensation — severance calculator, pay equity & salary bands",
                "Anneau 4 : Rémunération — indemnité de départ, équité salariale et bandes"
              ),
              t(
                "ESA auto-calculator + e-signatures",
                "Calculateur LNE automatique + signatures électroniques"
              ),
              billing === "annual"
                ? t(
                    "2 months free vs. monthly billing",
                    "2 mois gratuits par rapport à la facturation mensuelle"
                  )
                : t(
                    "Switch to annual anytime and save $78",
                    "Passez à l’annuel à tout moment et économisez 78 $"
                  ),
            ]}
            cta={growthCta}
            onCheckout={() => handleCheckout("growth")}
            loading={checkingOut === "growth"}
          />
          <PriceCard
            title={t("Advanced", "Avancé")}
            price={t("Custom", "Sur mesure")}
            desc={t(
              "For organizations that need multi-user access, dedicated setup, or bespoke advisory.",
              "Pour les organisations nécessitant un accès multi-utilisateur, une configuration dédiée ou des conseils personnalisés."
            )}
            features={[
              t("Everything in Growth", "Tout ce qu’inclut Croissance"),
              t("Multi-user team workspace", "Espace de travail d’équipe multi-utilisateur"),
              t("Priority support and custom templates", "Assistance prioritaire et modèles personnalisés"),
              t(
                "Consultant add-on access (coming soon)",
                "Accès module consultant (bientôt disponible)"
              ),
            ]}
            cta={t("Talk to us", "Nous contacter")}
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
            <div className="text-sm font-semibold text-zinc-100">
              {t("Is this legal advice?", "Est-ce un avis juridique ?")}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {t(
                "No. Dutiva provides general HR compliance guidance and document templates. For specific legal situations, consult an employment lawyer.",
                "Non. Dutiva fournit des conseils généraux en conformité RH et des modèles de documents. Pour des situations juridiques spécifiques, consultez un avocat en droit du travail."
              )}
            </div>
          </div>
          <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-zinc-100">
              {t("Which provinces are covered?", "Quelles provinces sont couvertes ?")}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {t(
                "Ontario, Quebec, federally regulated employers, and remote workers under federal jurisdiction — with current Employment Standards Act, Loi sur les normes du travail, and Canada Labour Code references. Additional provinces rolling out through 2027.",
                "Ontario, Québec, employeurs sous réglementation fédérale et travailleurs à distance sous juridiction fédérale — avec les références actuelles à la LNE, la LNT et le CCT. D’autres provinces s’ajouteront d’ici 2027."
              )}
            </div>
          </div>
          <div className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
            <div className="text-sm font-semibold text-zinc-100">
              {t("Is my data stored in Canada?", "Mes données sont-elles stockées au Canada ?")}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {t(
                "Sensitive employee data is processed in your browser and never stored on our servers. Dutiva is PIPEDA-compliant by design.",
                "Les données sensibles des employés sont traitées dans votre navigateur et ne sont jamais stockées sur nos serveurs. Dutiva est conforme à la LPRPDE par conception."
              )}
            </div>
          </div>
        </div>
        {/* Bottom CTA */}
        <div className="mt-6 rounded-[28px] border border-white/6 bg-white/[0.02] p-8 text-center">
          <div className="text-lg font-semibold text-zinc-100">
            {t("Not sure which plan fits?", "Vous ne savez pas quel forfait choisir ?")}
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            {t(
              "Start free — no credit card required. Generate a real document and see the quality before you decide. You can upgrade, downgrade, or cancel anytime.",
              "Commencez gratuitement — sans carte de crédit. Générez un vrai document et évaluez la qualité avant de décider. Vous pouvez passer à un forfait supérieur ou inférieur, ou annuler à tout moment."
            )}
          </div>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              {t("Start free", "Commencer gratuitement")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="mailto:hello@dutiva.ca"
              className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              {t("Contact us", "Nous contacter")}
            </a>
          </div>
        </div>
      </Section>
    </div>
  );
}
