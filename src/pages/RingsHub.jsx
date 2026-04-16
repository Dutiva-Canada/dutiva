import { Link } from "react-router-dom";
import {
  DollarSign,
  FileText,
  Heart,
  Megaphone,
  Wand2,
  Lock,
  Sparkles,
} from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { getStoredSettings } from "../utils/workspaceSettings";

const RINGS = [
  {
    num: "1",
    to: "/app/generator",
    icon: Wand2,
    color: "text-amber-300",
    border: "border-amber-400/20",
    bg: "bg-amber-400/[0.06]",
    required: "free",
    title: { en: "Documents", fr: "Documents" },
    desc: {
      en: "Generate compliant HR documents, templates, and signatures.",
      fr: "Générez des documents RH conformes, des modèles et des signatures.",
    },
    tools: { en: "Generator · Templates · Saved docs", fr: "Générateur · Modèles · Documents" },
  },
  {
    num: "2",
    to: "/app/wellness",
    icon: Heart,
    color: "text-emerald-300",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/[0.06]",
    required: "growth",
    title: { en: "Workplace Wellness", fr: "Bien-être au travail" },
    desc: {
      en: "Accommodation workflows, leave tools, and employee support workflows.",
      fr: "Processus d'accommodement, outils de congés et flux de soutien aux employés.",
    },
    tools: { en: "Accommodation · Leave · Support", fr: "Accommodement · Congés · Soutien" },
  },
  {
    num: "3",
    to: "/app/communications",
    icon: Megaphone,
    color: "text-sky-300",
    border: "border-sky-400/20",
    bg: "bg-sky-400/[0.06]",
    required: "growth",
    title: { en: "Communications", fr: "Communications" },
    desc: {
      en: "Handle scripts, memos, sensitive messages, and internal policy communication.",
      fr: "Gérez les scripts, mémos, messages sensibles et communications internes.",
    },
    tools: { en: "Scripts · Memos · Crisis comms", fr: "Scripts · Mémos · Communication" },
  },
  {
    num: "4",
    to: "/app/compensation",
    icon: DollarSign,
    color: "text-violet-300",
    border: "border-violet-400/20",
    bg: "bg-violet-400/[0.06]",
    required: "pro",
    title: { en: "Compensation", fr: "Rémunération" },
    desc: {
      en: "Run severance, pay equity, salary banding, and compensation decisions with confidence.",
      fr: "Gérez indemnités, équité salariale, bandes salariales et décisions de rémunération avec confiance.",
    },
    tools: { en: "Severance · Pay equity · Salary bands", fr: "Indemnité · Équité · Bandes salariales" },
  },
];

const hierarchy = ["free", "growth", "pro"];

function hasPlanAccess(currentPlan, requiredPlan) {
  return hierarchy.indexOf(currentPlan) >= hierarchy.indexOf(requiredPlan);
}

export default function RingsHub() {
  const { t } = useLang();
  const { plan } = usePlan();
  const settings = getStoredSettings();
  const companyName = settings.companyName || t("Your workspace", "Votre espace de travail");
  const province = settings.province || "Ontario";

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 pb-8 space-y-6">
      <section className="premium-card p-6 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-300/80" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                {t("Compliance system", "Système de conformité")}
              </span>
            </div>
            <h1 className="text-3xl font-semibold text-zinc-100 md:text-4xl">
              {t("The 4 Rings of Dutiva", "Les 4 anneaux de Dutiva")}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">
              {t(
                "Start with documents, then expand into wellness, communications, and compensation as your business grows.",
                "Commencez par les documents, puis développez le bien-être, les communications et la rémunération à mesure que votre entreprise grandit.",
              )}
            </p>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-300">
            <div className="font-medium text-zinc-100">{companyName}</div>
            <div className="mt-1 text-zinc-400">{province} · {t("Plan", "Plan")} {plan}</div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {RINGS.map((ring) => {
          const Icon = ring.icon;
          const unlocked = hasPlanAccess(plan, ring.required);
          const destination = unlocked ? ring.to : "/pricing";

          return (
            <Link
              key={ring.num}
              to={destination}
              className={[
                "group rounded-3xl border p-6 transition-all",
                "hover:bg-white/[0.04] active:scale-[0.99]",
                ring.border,
                ring.bg,
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center gap-1 pt-0.5">
                    <div className={["rounded-2xl border p-3", ring.border].join(" ")}>
                      <Icon className={["h-5 w-5", ring.color].join(" ")} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      {t(`Ring ${ring.num}`, `Anneau ${ring.num}`)}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                      {t(ring.title.en, ring.title.fr)}
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {t(ring.desc.en, ring.desc.fr)}
                    </p>
                    <div className={["mt-3 text-xs font-medium", ring.color, "opacity-85"].join(" ")}>
                      {t(ring.tools.en, ring.tools.fr)}
                    </div>
                  </div>
                </div>

                <div className="shrink-0">
                  {unlocked ? (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                      {t("Active", "Actif")}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                      <Lock className="h-3 w-3" />
                      {t(`Requires ${ring.required}`, `Nécessite ${ring.required}`)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {plan === "free" && (
        <section className="premium-card p-6 md:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold text-zinc-100">
                {t("Unlock the full compliance system", "Débloquez le système de conformité complet")}
              </div>
              <p className="mt-1 text-sm text-zinc-400">
                {t(
                  "Upgrade to Growth to access Wellness and Communications, or choose Pro for Compensation and financial tools.",
                  "Passez à Growth pour accéder au Bien-être et aux Communications, ou choisissez Pro pour la Rémunération et les outils financiers.",
                )}
              </p>
            </div>
            <Link to="/pricing" className="gold-button inline-flex items-center justify-center px-5 py-3 text-sm">
              {t("View pricing", "Voir les tarifs")}
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
