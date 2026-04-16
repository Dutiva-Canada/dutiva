import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { Helmet } from 'react-helmet-async';
import { trackEvent } from "../lib/analytics";

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</section>;
}

function RingsSection() {
  const { t } = useLang();

  const rings = [
    {
      title: t("Ring 1 · Documents", "Anneau 1 · Documents"),
      desc: t(
        "Generate compliant HR documents across Canadian jurisdictions.",
        "Générez des documents RH conformes selon les juridictions canadiennes."
      ),
    },
    {
      title: t("Ring 2 · Workplace Wellness", "Anneau 2 · Bien-être au travail"),
      desc: t(
        "Support employees with structured, compliant wellness practices.",
        "Soutenez les employés avec des pratiques de bien-être conformes."
      ),
    },
    {
      title: t("Ring 3 · Communications", "Anneau 3 · Communications"),
      desc: t(
        "Handle sensitive workplace situations with clarity and consistency.",
        "Gérez les situations sensibles avec clarté et cohérence."
      ),
    },
    {
      title: t("Ring 4 · Compensation", "Anneau 4 · Rémunération"),
      desc: t(
        "Make informed decisions on pay, severance, and equity.",
        "Prenez des décisions éclairées sur la rémunération et l'équité."
      ),
    },
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="max-w-2xl mb-10">
        <h2 className="text-2xl md:text-4xl text-zinc-50 font-semibold">
          {t(
            "Everything you need to stay compliant — in one system.",
            "Tout ce qu'il vous faut pour rester conforme — dans un seul système."
          )}
        </h2>
        <p className="text-zinc-400 mt-3 text-sm md:text-base">
          {t(
            "Most tools stop at documents. Dutiva helps Canadian employers manage the full HR compliance lifecycle.",
            "La plupart des outils s'arrêtent aux documents. Dutiva aide les employeurs canadiens à gérer l'ensemble du cycle de conformité RH."
          )}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {rings.map((ring) => (
          <div key={ring.title} className="premium-card p-6 relative overflow-hidden">
            <h3 className="text-lg text-zinc-100 font-semibold">{ring.title}</h3>
            <p className="text-sm text-zinc-400 mt-2">{ring.desc}</p>
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
      title: t("Document generation", "Génération de documents"),
      copy: t(
        "Create offer letters, policies, and HR documents in minutes with guided inputs.",
        "Créez des lettres d'offre, des politiques et des documents RH en quelques minutes avec des champs guidés."
      ),
      points: [
        t("Guided form fields", "Champs guidés"),
        t("Jurisdiction-aware output", "Sortie adaptée à la juridiction"),
        t("English and French", "Anglais et français"),
      ],
    },
    {
      title: t("Compliance advisor", "Conseiller conformité"),
      copy: t(
        "Ask HR compliance questions and get answers grounded in Canadian legislation.",
        "Posez des questions de conformité RH et obtenez des réponses fondées sur la législation canadienne."
      ),
      points: [
        t("Legislation-backed guidance", "Conseils fondés sur la législation"),
        t("Fast answers", "Réponses rapides"),
        t("Built for SMB employers", "Conçu pour les PME"),
      ],
    },
    {
      title: t("Workspace settings", "Paramètres d'espace de travail"),
      copy: t(
        "Set your company, province, language, and defaults once, then use that context everywhere in the app.",
        "Définissez votre entreprise, votre province, votre langue et vos paramètres une fois, puis utilisez ce contexte partout dans l'application."
      ),
      points: [
        t("Province-aware defaults", "Paramètres selon la province"),
        t("Theme and language", "Thème et langue"),
        t("Reusable company context", "Contexte d'entreprise réutilisable"),
      ],
    },
  ];

  return (
    <Section className="py-14 md:py-16">
      <div className="max-w-2xl mb-10">
        <h2 className="text-2xl md:text-4xl text-zinc-50 font-semibold">
          {t("See how Dutiva works in practice.", "Voyez comment Dutiva fonctionne en pratique.")}
        </h2>
        <p className="text-zinc-400 mt-3 text-sm md:text-base">
          {t(
            "Your visitors need proof, not just promises. Show them how the product helps them move faster and stay protected.",
            "Vos visiteurs ont besoin de preuves, pas seulement de promesses. Montrez-leur comment le produit les aide à aller plus vite et à rester protégés."
          )}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {proofs.map((proof) => (
          <div key={proof.title} className="premium-card p-6">
            <div className="rounded-2xl border border-white/6 bg-white/[0.03] p-4 mb-5">
              <div className="text-xs uppercase tracking-[0.18em] text-amber-400 mb-2">
                {t("Preview", "Aperçu")}
              </div>
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
            <p className="text-sm text-zinc-400 mt-2">{proof.copy}</p>
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

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Dutiva — HR Compliance Software for Canadian Small Businesses</title>
        <meta
          name="description"
          content="HR compliance software for Canadian small businesses. Generate compliant HR documents, get legislation-backed guidance, and manage employee issues without hiring an HR team."
        />
        <link rel="canonical" href="https://dutiva.ca/" />
        <meta property="og:title" content="Dutiva — HR Compliance Software for Canadian Small Businesses" />
        <meta property="og:description" content="Generate compliant HR documents, get legislation-backed guidance, and manage employee issues across Canada." />
        <meta property="og:url" content="https://dutiva.ca/" />
      </Helmet>

      <Section className="py-12 md:py-20">
        <div className="max-w-3xl space-y-6">
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Built for Canadian small businesses", "Conçu pour les petites entreprises canadiennes")}
          </div>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl text-zinc-50">
            {t(
              "Run HR compliance in Canada — without hiring an HR team.",
              "Gérez la conformité RH au Canada — sans embaucher une équipe RH."
            )}
          </h1>

          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            {t(
              "Generate compliant HR documents, manage employee issues, and get legislation-backed guidance across Ontario, Quebec, and federally regulated workplaces.",
              "Générez des documents RH conformes, gérez les situations employé et obtenez des conseils fondés sur la législation pour l'Ontario, le Québec et les milieux fédéraux."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/app/generator"
              className="gold-button px-5 py-3 text-sm text-center"
              onClick={() => trackEvent("generate_document_click", { location: "landing_hero" })}
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
              {t("Built for Canadian employers", "Conçu pour les employeurs canadiens")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("Ontario, Quebec and federal ready", "Prêt pour l'Ontario, le Québec et le fédéral")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("English and French workflows", "Flux de travail en anglais et en français")}
            </div>
          </div>
        </div>
      </Section>

      <Section className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            t("Generate compliant documents in minutes", "Générez des documents conformes en quelques minutes"),
            t("Get legislation-backed answers fast", "Obtenez rapidement des réponses fondées sur la loi"),
            t("Reduce risk before it becomes a problem", "Réduisez le risque avant qu'il ne devienne un problème"),
          ].map((text) => (
            <div key={text} className="premium-card p-5 text-sm text-zinc-300">
              {text}
            </div>
          ))}
        </div>
      </Section>

      <RingsSection />
      <ProductProofSection />

      <Section className="py-14">
        <div className="premium-card p-8 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl text-zinc-50">
            {t("Start protecting your business today.", "Commencez à protéger votre entreprise dès aujourd'hui.")}
          </h2>
          <p className="text-sm text-zinc-400">
            {t(
              "Start free with no credit card and generate your first compliant document in under 5 minutes.",
              "Commencez gratuitement sans carte de crédit et générez votre premier document conforme en moins de 5 minutes."
            )}
          </p>
          <Link
            to="/app"
            className="gold-button px-6 py-3 text-sm inline-block"
            onClick={() => trackEvent("open_app_click", { location: "landing_bottom_cta" })}
          >
            {t("Start free — no credit card", "Commencer gratuitement — sans carte")}
          </Link>
        </div>
      </Section>
    </div>
  );
}
