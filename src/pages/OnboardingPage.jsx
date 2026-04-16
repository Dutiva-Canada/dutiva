import { Link, useNavigate } from "react-router-dom";
import { useLang } from "../context/LanguageContext.jsx";
import { setOnboardingProgress } from "../lib/onboarding";
import { trackEvent } from "../lib/analytics";

const OPTIONS = [
  {
    key: "hire",
    en: "Hire someone",
    fr: "Embaucher quelqu'un",
    path: "/app/generator?template=Offer%20Letter",
  },
  {
    key: "terminate",
    en: "Let someone go",
    fr: "Mettre fin à un emploi",
    path: "/app/generator?template=Termination%20Letter",
  },
  {
    key: "policy",
    en: "Create a policy",
    fr: "Créer une politique",
    path: "/app/templates",
  },
  {
    key: "question",
    en: "Ask a question",
    fr: "Poser une question",
    path: "/app/advisor",
  },
];

export default function OnboardingPage() {
  const { t } = useLang();
  const navigate = useNavigate();

  const handleSelect = (option) => {
    trackEvent("selected_intent", { intent: option.key, location: "onboarding" });

    if (option.key === "question") {
      setOnboardingProgress({ companyConfigured: false, provinceConfigured: false });
    }

    navigate(option.path);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          {t("Onboarding", "Intégration")}
        </div>
        <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          {t("What do you need right now?", "De quoi avez-vous besoin maintenant ?")}
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-400">
          {t(
            "Choose the situation you want to handle and Dutiva will take you to the right place immediately.",
            "Choisissez la situation à gérer et Dutiva vous dirigera immédiatement au bon endroit.",
          )}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {OPTIONS.map((option) => (
          <button
            key={option.key}
            type="button"
            onClick={() => handleSelect(option)}
            className="premium-card p-6 text-left transition hover:border-amber-400/30 hover:bg-white/[0.04]"
          >
            <div className="text-lg font-semibold text-zinc-100">
              {t(option.en, option.fr)}
            </div>
            <div className="mt-2 text-sm text-zinc-400">
              {option.key === "hire" && t("Start with an offer letter workflow.", "Commencez par un flux de lettre d'offre.")}
              {option.key === "terminate" && t("Go straight to an ESA-aware termination workflow.", "Accédez directement à un flux de cessation conforme à la LNE.")}
              {option.key === "policy" && t("Browse templates and start from a policy document.", "Parcourez les modèles et partez d'une politique.")}
              {option.key === "question" && t("Open the advisor for legislation-backed guidance.", "Ouvrez le conseiller pour des conseils fondés sur la loi.")}
            </div>
          </button>
        ))}
      </div>

      <div className="premium-card p-5 text-sm text-zinc-400">
        {t(
          "You can always change your company and province later in Settings.",
          "Vous pourrez toujours modifier votre entreprise et votre province plus tard dans les paramètres.",
        )}
        <Link to="/app/settings" className="ml-2 text-amber-300 hover:text-amber-200">
          {t("Open settings", "Ouvrir les paramètres")}
        </Link>
      </div>
    </div>
  );
}
