import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { Helmet } from 'react-helmet-async';

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-6xl px-4 ${className}`}>{children}</section>;
}

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Dutiva — HR Compliance for Canadian SMBs</title>
        <meta
          name="description"
          content="Generate compliant HR documents, get legislation-backed guidance, and manage compliance without hiring an HR team. Built for Canadian SMBs."
        />
      </Helmet>

      {/* HERO */}
      <Section className="py-12 md:py-20">
        <div className="max-w-2xl space-y-6">
          <div className="text-xs uppercase tracking-[0.18em] text-amber-400">
            {t("Built for Canadian employers", "Conçu pour les employeurs canadiens")}
          </div>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl text-zinc-50">
            {t(
              "HR compliance — without hiring an HR team.",
              "La conformité RH — sans embaucher une équipe RH."
            )}
          </h1>

          <p className="text-base md:text-lg text-zinc-400">
            {t(
              "Generate bilingual HR documents, get legislation-backed answers, and stay compliant across Canadian jurisdictions.",
              "Générez des documents RH bilingues, obtenez des réponses fondées sur la législation et restez conforme dans les juridictions canadiennes."
            )}
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/app/generator" className="gold-button px-5 py-3 text-sm">
              {t("Generate a document", "Générer un document")}
            </Link>
            <Link to="/pricing" className="ghost-button px-5 py-3 text-sm">
              {t("View pricing", "Voir les tarifs")}
            </Link>
          </div>

          <div className="grid gap-2 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("20+ templates", "20+ modèles")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("Ontario, Quebec & Federal", "Ontario, Québec et fédéral")}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              {t("English & French", "Anglais et français")}
            </div>
          </div>
        </div>
      </Section>

      {/* VALUE */}
      <Section className="py-10">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            t("Generate documents in minutes", "Générez des documents en minutes"),
            t("Legislation-backed answers", "Réponses basées sur la loi"),
            t("Built for Canadian law", "Conçu pour le droit canadien"),
          ].map((text) => (
            <div key={text} className="premium-card p-5 text-sm text-zinc-300">
              {text}
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-14">
        <div className="premium-card p-8 text-center space-y-4">
          <h2 className="text-2xl md:text-3xl text-zinc-50">
            {t("Start free. No setup.", "Commencez gratuitement. Sans configuration.")}
          </h2>
          <p className="text-sm text-zinc-400">
            {t(
              "Generate your first compliant document in under 5 minutes.",
              "Générez votre premier document conforme en moins de 5 minutes."
            )}
          </p>
          <Link to="/app" className="gold-button px-6 py-3 text-sm inline-block">
            {t("Open the app", "Ouvrir l'application")}
          </Link>
        </div>
      </Section>
    </div>
  );
}
