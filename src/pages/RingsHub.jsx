import { Link } from "react-router-dom";
import {
  DollarSign,
  FileText,
  Heart,
  Megaphone,
  Wand2,
} from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";

const RINGS = [
  {
    num: "1",
    to:  "/app/generator",
    icon: Wand2,
    color: "text-amber-300",
    border: "border-amber-400/20",
    bg: "bg-amber-400/[0.06]",
    title: { en: "Document Generator", fr: "G\u00e9n\u00e9rateur de documents" },
    desc: {
      en: "Offer letters, NDAs, PIPs, termination letters, and more \u2014 bilingual and ESA-compliant.",
      fr: "Lettres d\u2019offre, ANDs, PAP, lettres de licenciement et plus \u2014 bilingues et conformes \u00e0 la LNT.",
    },
    tools: { en: "Offer Letter \u00b7 NDA \u00b7 PIP \u00b7 Termination", fr: "Lettre d\u2019offre \u00b7 AND \u00b7 PAP \u00b7 Licenciement" },
  },
  {
    num: "2",
    to:  "/app/wellness",
    icon: Heart,
    color: "text-emerald-300",
    border: "border-emerald-400/20",
    bg: "bg-emerald-400/[0.06]",
    title: { en: "Workplace Wellness", fr: "Bien-\u00eatre au travail" },
    desc: {
      en: "Accommodation workflows, mental health tools, and duty-to-accommodate checklists.",
      fr: "Flux d\u2019adaptation, outils de sant\u00e9 mentale et listes de v\u00e9rification d\u2019obligation d\u2019accommodement.",
    },
    tools: { en: "Accommodation \u00b7 Mental Health \u00b7 Leave", fr: "Accommodement \u00b7 Sant\u00e9 mentale \u00b7 Cong\u00e9" },
  },
  {
    num: "3",
    to:  "/app/communications",
    icon: Megaphone,
    color: "text-sky-300",
    border: "border-sky-400/20",
    bg: "bg-sky-400/[0.06]",
    title: { en: "Communications", fr: "Communications" },
    desc: {
      en: "Layoff scripts, policy memos, crisis guides, and Town Hall agenda builders.",
      fr: "Scripts de licenciement, m\u00e9mos de politique, guides de crise et g\u00e9n\u00e9rateurs d\u2019ordre du jour.",
    },
    tools: { en: "Layoff Script \u00b7 Policy Memo \u00b7 Town Hall", fr: "Script \u00b7 M\u00e9mo \u00b7 Assembl\u00e9e" },
  },
  {
    num: "4",
    to:  "/app/compensation",
    icon: DollarSign,
    color: "text-violet-300",
    border: "border-violet-400/20",
    bg: "bg-violet-400/[0.06]",
    title: { en: "Compensation", fr: "R\u00e9mun\u00e9ration" },
    desc: {
      en: "Severance calculator, pay equity checker, salary band builder, and financial literacy tools.",
      fr: "Calculateur d\u2019indemnit\u00e9, v\u00e9rificateur d\u2019\u00e9quit\u00e9 salariale, constructeur de grilles et outils de litt\u00e9ratie financi\u00e8re.",
    },
    tools: { en: "Severance \u00b7 Pay Equity \u00b7 Salary Bands", fr: "Indemnit\u00e9 \u00b7 \u00c9quit\u00e9 \u00b7 Grilles salariales" },
  },
];

export default function RingsHub() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-lg px-4 py-6 pb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-1 flex items-center gap-2">
          <FileText className="h-4 w-4 text-amber-300/70" />
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
            {t("Compliance Rings", "Anneaux de conformit\u00e9")}
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-zinc-100">
          {t("All Rings", "Tous les anneaux")}
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          {t(
            "Ontario, Qu\u00e9bec & Federal \u2014 pick a ring to get started.",
            "Ontario, Qu\u00e9bec et f\u00e9d\u00e9ral \u2014 choisissez un anneau pour commencer.",
          )}
        </p>
      </div>

      {/* Ring cards */}
      <div className="grid gap-3">
        {RINGS.map((ring) => {
          const Icon = ring.icon;
          return (
            <Link
              key={ring.num}
              to={ring.to}
              className={[
                "group flex items-start gap-4 rounded-2xl border p-4 transition-all",
                "hover:bg-white/[0.04] active:scale-[0.98]",
                ring.border,
                ring.bg,
              ].join(" ")}
            >
              {/* Icon + ring number */}
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <div className={["rounded-xl border p-2.5", ring.border].join(" ")}>
                  <Icon className={["h-5 w-5", ring.color].join(" ")} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                  {t(`Ring ${ring.num}`, `Anneau ${ring.num}`)}
                </span>
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[15px] font-semibold text-zinc-100 group-hover:text-white">
                    {t(ring.title.en, ring.title.fr)}
                  </span>
                  <span className="shrink-0 text-zinc-600 transition group-hover:translate-x-0.5 group-hover:text-zinc-400">
                    &rsaquo;
                  </span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-400">
                  {t(ring.desc.en, ring.desc.fr)}
                </p>
                <div className={["mt-2.5 text-[11px] font-medium", ring.color, "opacity-80"].join(" ")}>
                  {t(ring.tools.en, ring.tools.fr)}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
