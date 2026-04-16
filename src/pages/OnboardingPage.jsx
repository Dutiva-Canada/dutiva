import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext.jsx";

export default function OnboardingPage() {
  const { t } = useLang();

  return (
    <div className="app-shell min-h-screen flex items-center justify-center px-4">
      <div className="premium-card w-full max-w-xl p-8 space-y-6">
        <h1 className="text-2xl text-zinc-100 font-semibold">
          {t("Welcome to Dutiva", "Bienvenue sur Dutiva")}
        </h1>

        <p className="text-sm text-zinc-400">
          {t(
            "Let’s set up your workspace so everything is compliant from the start.",
            "Configurons votre espace pour assurer la conformité dès le départ."
          )}
        </p>

        <div className="space-y-3">
          <Link to="/app/settings" className="gold-button block text-center py-3">
            {t("Set company & province", "Configurer entreprise et province")}
          </Link>

          <Link to="/app/generator" className="ghost-button block text-center py-3">
            {t("Generate your first document", "Générer votre premier document")}
          </Link>
        </div>

        <div className="text-xs text-zinc-500 text-center">
          {t("Takes less than 5 minutes.", "Moins de 5 minutes.")}
        </div>
      </div>
    </div>
  );
}
