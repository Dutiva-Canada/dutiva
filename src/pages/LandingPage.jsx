import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { Helmet } from "react-helmet-async";
import { trackEvent } from "../lib/analytics";

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</section>;
}

function ProblemSection() {
  const { t } = useLang();

  const problems = [
    t("Employment rules change by province.", "Les règles d'emploi changent selon la province."),
    t("Templates online are often outdated or risky.", "Les modèles en ligne sont souvent obsolètes ou risqués."),
    t("One weak clause can lead to expensive disputes.", "Une clause faible peut entraîner des litiges coûteux."),
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Why businesses struggle", "Pourquoi les entreprises ont du mal")}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-50 md:text-4xl">
            {t("HR mistakes are expensive — and easy to make.", "Les erreurs RH coûtent cher — et sont faciles à faire.")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
            {t(
              "Most small businesses do not have dedicated HR or legal teams, but they still carry the full risk of compliance mistakes. Dutiva helps you make better decisions before those mistakes become costly problems.",
              "La plupart des petites entreprises n'ont pas d'équipe RH ou juridique dédiée, mais elles assument tout de même le risque complet des erreurs de conformité. Dutiva vous aide à prendre de meilleures décisions avant que ces erreurs ne deviennent des problèmes coûteux.",
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-1">
          {problems.map((problem) => (
            <div key={problem} className="premium-card p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="text-sm leading-7 text-zinc-300">{problem}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function RingsSection() {
  const { t } = useLang();

  const rings = [
    {
      title: t("Compliant document generation", "Génération de documents conformes"),
      desc: t(
        "Create employment agreements, letters, and policies that align with Canadian employment standards.",
        "Créez des contrats de travail, des lettres et des politiques conformes aux normes d'emploi canadiennes.",
      ),
    },
    {
      title: t("Real-time HR guidance", "Conseils RH en temps réel"),
      desc: t(
        "Ask compliance questions and get legislation-backed answers instantly with your compliance copilot.",
        "Posez des questions de conformité et obtenez instantanément des réponses fondées sur la législation grâce à votre copilote de conformité.",
      ),
    },
    {
      title: t("Employee issue management", "Gestion des situations employé"),
      desc: t(
        "Handle warnings, performance issues, and sensitive workplace situations with more structure and defensibility.",
        "Gérez les avertissements, les problèmes de rendement et les situations sensibles avec plus de structure et de solidité.",
      ),
    },
    {
      title: t("Continuous compliance awareness", "Veille de conformité continue"),
      desc: t(
        "Stay aligned with evolving rules without constantly researching updates yourself.",
        "Restez aligné sur l'évolution des règles sans devoir constamment faire vos propres recherches.",
      ),
    },
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="max-w-3xl mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
          {t("The system", "Le système")}
        </div>
        <h2 className="mt-3 text-2xl md:text-4xl text-zinc-50 font-semibold">
          {t("Everything you need to stay compliant — in one system.", "Tout ce qu'il vous faut pour rester conforme — dans un seul système.")}
        </h2>
        <p className="text-zinc-400 mt-4 text-sm md:text-base leading-7">
          {t(
            "Dutiva is not just a template library. It is a Canadian HR compliance system designed to reduce risk, improve consistency, and help small businesses act with more confidence.",
            "Dutiva n'est pas seulement une bibliothèque de modèles. C'est un système canadien de conformité RH conçu pour réduire le risque, améliorer la cohérence et aider les petites entreprises à agir avec plus de confiance.",
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {rings.map((ring) => (
          <div key={ring.title} className="premium-card p-6 relative overflow-hidden">
            <h3 className="text-lg text-zinc-100 font-semibold">{ring.title}</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-7">{ring.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function ProductProofSection() {
  const { t } = useLang();

  const proofs = [
    {
      title: t("Ask the Advisor", "Consultez le conseiller"),
      copy: t(
        "Ask a question like “Do I need a probation clause in Ontario?” and get a structured answer grounded in Canadian employment law.",
        "Posez une question comme « Ai-je besoin d'une clause de probation en Ontario ? » et obtenez une réponse structurée fondée sur le droit du travail canadien.",
      ),
      points: [
        t("Province-aware guidance", "Conseils adaptés à la province"),
        t("Legislation-backed answers", "Réponses fondées sur la législation"),
        t("Faster path to action", "Chemin plus rapide vers l'action"),
      ],
    },
    {
      title: t("Generate documents", "Générez des documents"),
      copy: t(
        "Fill in guided inputs and generate a working draft faster, with structure that is easier to review and defend.",
        "Remplissez des champs guidés et générez plus rapidement une première version, avec une structure plus facile à réviser et à défendre.",
      ),
      points: [
        t("Guided form fields", "Champs guidés"),
        t("Clean draft output", "Sortie propre et claire"),
        t("Built for small business decisions", "Conçu pour les décisions de PME"),
      ],
    },
    {
      title: t("Stay organized", "Restez organisé"),
      copy: t(
        "Save drafts, reopen documents, and keep your HR work in one place instead of scattered across files and tabs.",
        "Enregistrez vos brouillons, rouvrez vos documents et gardez votre travail RH au même endroit plutôt que dispersé entre fichiers et onglets.",
      ),
      points: [
        t("Saved documents", "Documents enregistrés"),
        t("Repeatable workflows", "Flux de travail réutilisables"),
        t("Built for ongoing use", "Conçu pour une utilisation continue"),
      ],
    },
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="max-w-3xl mb-10">
        <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
          {t("See how it works", "Voyez comment ça fonctionne")}
        </div>
        <h2 className="mt-3 text-2xl md:text-4xl text-zinc-50 font-semibold">
          {t("Move from question to action faster.", "Passez plus rapidement de la question à l'action.")}
        </h2>
        <p className="text-zinc-400 mt-4 text-sm md:text-base leading-7">
          {t(
            "Your visitors do not just need features. They need proof that Dutiva helps them make better, safer HR decisions in the real world.",
            "Vos visiteurs n'ont pas seulement besoin de fonctionnalités. Ils ont besoin de preuves que Dutiva les aide à prendre de meilleures décisions RH, plus sûres et plus concrètes.",
          )}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {proofs.map((proof) => (
          <div key={proof.title} className="premium-card p-6">
            <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 mb-5">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-400 mb-2">{t("Product preview", "Aperçu du produit")}</div>
              <div className="rounded-xl border border-white/6 bg-black/20 p-4">
                <div className="h-2 w-16 rounded-full bg-amber-400/60 mb-3" />
                <div className="space-y-2">
                  <div className="h-2 rounded-full bg-white/12 w-full" />
                  <div className="h-2 rounded-full bg-white/12 w-5/6" />
                  <div className="h-2 rounded-full bg-white/12 w-3/4" />
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  <div className="h-10 rounded-lg bg-white/8" />
                  <div className="h-10 rounded-lg bg-white/8" />
                </div>
              </div>
            </div>

            <h3 className="text-lg text-zinc-100 font-semibold">{proof.title}</h3>
            <p className="text-sm text-zinc-400 mt-3 leading-7">{proof.copy}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              {proof.points.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-amber-400" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

function TrustSection() {
  const { t } = useLang();

  const trustPoints = [
    t("Built for Canadian employment law", "Conçu pour le droit du travail canadien"),
    t("Designed for small and growing businesses", "Conçu pour les petites entreprises et celles en croissance"),
    t("Bilingual English and French workflows", "Flux de travail bilingues en anglais et en français"),
    t("AI-assisted, but structured for real-world review", "Assisté par l'IA, mais structuré pour une révision réelle"),
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Why Dutiva", "Pourquoi Dutiva")}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-50 md:text-4xl">
            {t("Built for Canadian businesses — not generic HR tools.", "Conçu pour les entreprises canadiennes — pas pour des outils RH génériques.")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
            {t(
              "Dutiva is designed to help Canadian small businesses make defensible, better-structured HR decisions. That means clearer workflows, more relevant guidance, and documents built for actual business use.",
              "Dutiva est conçu pour aider les petites entreprises canadiennes à prendre des décisions RH plus solides et mieux structurées. Cela signifie des flux de travail plus clairs, des conseils plus pertinents et des documents pensés pour un usage réel en entreprise.",
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {trustPoints.map((point) => (
            <div key={point} className="premium-card p-5">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div className="text-sm leading-7 text-zinc-300">{point}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function PricingTeaserSection() {
  const { t } = useLang();

  return (
    <Section className="py-14 md:py-16">
      <div className="premium-card p-8 md:p-10">
        <div className="max-w-3xl">
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Pricing", "Tarification")}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-zinc-50 md:text-4xl">
            {t("Start free. Upgrade when you need more.", "Commencez gratuitement. Passez à un forfait supérieur quand vous en avez besoin.")}
          </h2>
          <p className="mt-4 text-sm leading-7 text-zinc-400 md:text-base">
            {t(
              "Use Dutiva for free to generate and manage essential HR documents. Upgrade for unlimited access, advanced workflows, and deeper guidance as your needs grow.",
              "Utilisez Dutiva gratuitement pour générer et gérer les documents RH essentiels. Passez à un forfait supérieur pour un accès illimité, des flux de travail avancés et des conseils plus approfondis à mesure que vos besoins évoluent.",
            )}
          </p>
          <div className="mt-6">
            <Link
              to="/pricing"
              className="gold-button px-5 py-3 text-sm inline-flex"
              onClick={() => trackEvent("pricing_click", { location: "landing_pricing_teaser" })}
            >
              {t("View pricing", "Voir la tarification")}
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Dutiva — Canadian HR Compliance for Small Businesses</title>
        <meta
          name="description"
          content="Canadian HR compliance software for small businesses. Generate compliant documents, get legislation-backed guidance, and manage employee issues in one place."
        />
        <link rel="canonical" href="https://dutiva.ca/" />
        <meta property="og:title" content="Dutiva — Canadian HR Compliance for Small Businesses" />
        <meta property="og:description" content="Generate compliant HR documents, get legislation-backed guidance, and manage employee issues in one place." />
        <meta property="og:url" content="https://dutiva.ca/" />
      </Helmet>

      <Section className="py-12 md:py-20">
        <div className="max-w-4xl space-y-6">
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Built for Canadian small businesses", "Conçu pour les petites entreprises canadiennes")}
          </div>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl text-zinc-50">
            {t("The HR compliance standard for Canadian small businesses", "La norme de conformité RH pour les petites entreprises canadiennes")}
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-3xl leading-8">
            {t(
              "Generate compliant documents, get legislation-backed guidance, and handle employee issues — all in one place.",
              "Générez des documents conformes, obtenez des conseils fondés sur la législation et gérez les situations employé — le tout au même endroit.",
            )}
          </p>

          <p className="text-sm text-zinc-500 max-w-2xl">
            {t(
              "Built for Canadian employment law. Bilingual. Designed for real-world decisions.",
              "Conçu pour le droit du travail canadien. Bilingue. Pensé pour des décisions concrètes.",
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/app/onboarding"
              className="gold-button px-5 py-3 text-sm text-center"
              onClick={() => trackEvent("entered_onboarding", { location: "landing_hero" })}
            >
              {t("Start free", "Commencer gratuitement")}
            </Link>
            <Link
              to="/pricing"
              className="ghost-button px-5 py-3 text-sm text-center"
              onClick={() => trackEvent("pricing_click", { location: "landing_hero" })}
            >
              {t("See how it works", "Voir comment ça fonctionne")}
            </Link>
          </div>

          <div className="grid gap-2 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("Legislation-backed guidance", "Conseils fondés sur la législation")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("Defensible documentation", "Documentation plus défendable")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("Structured workflows for real business decisions", "Flux de travail structurés pour de vraies décisions d'entreprise")}
            </div>
          </div>
        </div>
      </Section>

      <ProblemSection />
      <RingsSection />
      <ProductProofSection />
      <TrustSection />
      <PricingTeaserSection />

      <Section className="py-14">
        <div className="premium-card p-8 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl text-zinc-50">
            {t("Build compliant HR systems — without the complexity.", "Créez des systèmes RH conformes — sans la complexité.")}
          </h2>
          <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-7">
            {t(
              "Stop guessing. Start making more confident, compliant decisions for your business.",
              "Arrêtez de deviner. Commencez à prendre des décisions plus confiantes et plus conformes pour votre entreprise.",
            )}
          </p>
          <Link
            to="/app/onboarding"
            className="gold-button px-6 py-3 text-sm inline-block"
            onClick={() => trackEvent("entered_onboarding", { location: "landing_bottom_cta" })}
          >
            {t("Start free", "Commencer gratuitement")}
          </Link>
        </div>
      </Section>
    </div>
  );
}
