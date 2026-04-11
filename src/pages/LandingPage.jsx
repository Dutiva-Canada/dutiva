import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, FileText, ShieldCheck, Sparkles, Scale, Calendar } from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>{children}</section>;
}

function Pill({ children }) {
  return (
    <div className="inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, desc, to }) {
  const content = (
    <div className="premium-card-soft p-6 transition hover:translate-y-[-2px]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
        {icon}
      </div>
      <div className="text-lg font-semibold text-zinc-100">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{desc}</div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

export default function LandingPage() {
  const { t } = useLang();

  return (
    <div className="marketing-shell min-h-screen">
      {/* ── HERO ── */}
      <Section className="grid gap-10 py-14 md:py-20 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
        <div className="space-y-6">
          <Pill>
            {t(
              "Built for Canadian employers who don't have an HR team",
              "Conçu pour les employeurs canadiens sans équipe RH"
            )}
          </Pill>

          <div className="space-y-4">
            <h1 className="metric-value max-w-4xl text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl">
              {t(
                "HR compliance your employment lawyer would approve — at a fraction of the cost.",
                "Une conformité RH que votre avocat approuverait — à une fraction du coût."
              )}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              {t(
                "Generate bilingual, jurisdiction-specific HR documents, get legislation-cited guidance, and manage your compliance workflow — without hiring an HR department.",
                "Générez des documents RH bilingues et spécifiques à votre juridiction, obtenez des conseils référencés à la législation, et gérez votre conformité — sans embaucher un service RH."
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              {t("Generate a document", "Générer un document")}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/app"
              className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              {t("Explore the app", "Explorer l'application")}
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 pt-1">
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">16</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                {t("Templates", "Modèles")}
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">4</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                {t("Jurisdictions", "Juridictions")}
              </div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">EN/FR</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">
                {t("Bilingual", "Bilingue")}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              {t("Ontario, Quebec & Federal coverage", "Ontario, Québec et couverture fédérale")}
            </div>
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              {t("Bilingual-ready workflows", "Flux de travail bilingues")}
            </div>
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              {t("Built for SMBs and growing teams", "Pour les PME et équipes en croissance")}
            </div>
          </div>

          <div className="grid gap-3 pt-1 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              {t(
                "Generate jurisdiction-specific documents in under 5 minutes",
                "Générez des documents spécifiques à votre juridiction en moins de 5 minutes"
              )}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              {t(
                "ESA and LNT notice periods calculated automatically",
                "Préavis selon la LNE et la LNT calculés automatiquement"
              )}
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              {t(
                "Every document available in English and French",
                "Chaque document disponible en anglais et en français"
              )}
            </div>
          </div>
        </div>

        {/* Advisor preview widget */}
        <div className="premium-card overflow-hidden rounded-[32px] p-0">
          <div className="grid gap-5 bg-[linear-gradient(180deg,rgba(18,22,30,0.98)_0%,rgba(14,17,24,0.98)_100%)] p-6">
            <div className="flex items-center justify-between border-b border-white/6 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-zinc-100">Dutiva Advisor</div>
                  <div className="text-sm text-zinc-400">
                    {t("Quebec jurisdiction", "Juridiction du Québec")}
                  </div>
                </div>
              </div>

              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                {t("Live", "En direct")}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                <div className="mb-4 text-lg font-semibold text-zinc-100">
                  {t("Ask a compliance question", "Posez une question de conformité")}
                </div>

                <div className="mb-3 ml-auto max-w-[88%] rounded-[20px] bg-[linear-gradient(180deg,#f0bb59_0%,#d6a84f_100%)] px-4 py-3 text-sm text-black">
                  {t(
                    "What's the minimum termination notice in Quebec under the LNT?",
                    "Quel est le préavis minimum de cessation d'emploi au Québec en vertu de la LNT?"
                  )}
                </div>

                <div className="mb-3 max-w-[92%] rounded-[20px] border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100">
                  {t(
                    "Under Quebec's Act Respecting Labour Standards (LNT, art. 82), an employee with 3 years of continuous service is entitled to 2 weeks' notice of termination, or pay in lieu.",
                    "En vertu de la Loi sur les normes du travail (LNT, art. 82), un employé cumulant 3 années de service continu a droit à un préavis de 2 semaines, ou à une indemnité équivalente."
                  )}
                </div>

                <div className="rounded-[18px] border border-white/8 bg-[#0E1218] px-4 py-3 text-sm text-zinc-500">
                  {t("Ask a question or attach a document...", "Posez une question ou joignez un document...")}
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {t("Quick actions", "Actions rapides")}
                  </div>

                  <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">{t("New document", "Nouveau document")}</span>
                    <strong className="text-sm text-zinc-100">{t("16 templates", "16 modèles")}</strong>
                  </div>

                  <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">{t("Jurisdiction", "Juridiction")}</span>
                    <strong className="text-sm text-zinc-100">{t("Quebec", "Québec")}</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">{t("Workflow", "Flux de travail")}</span>
                    <strong className="text-sm text-zinc-100">{t("Bilingual", "Bilingue")}</strong>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    {t("Recent document", "Document récent")}
                  </div>

                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                    <div className="font-medium text-zinc-100">
                      {t("Employment Offer Letter", "Lettre d'offre d'emploi")}
                    </div>
                    <div className="mt-1 text-sm text-zinc-400">
                      {t("Apr 5 — Quebec", "5 avril — Québec")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>{t("What makes Dutiva work", "Ce qui fait le succès de Dutiva")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t("Everything you need to stay compliant.", "Tout ce qu'il vous faut pour rester conforme.")}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Templates, interactive compliance workflows, guided assessments, and legislation-cited guidance — built around Canadian employment law, not adapted from generic software.",
              "Modèles, flux de conformité interactifs, évaluations guidées et conseils référencés à la législation — conçus autour du droit du travail canadien, pas adaptés d'un logiciel générique."
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            to="/app/generator?template=Employment%20Agreement"
            icon={<FileText className="h-5 w-5" />}
            title={t("16 bilingual templates", "16 modèles bilingues")}
            desc={t(
              "Offer letters, terminations, PIPs, NDAs — filled in minutes from a guided conversation, not a blank page.",
              "Lettres d'offre, cessations, PIPs, ententes de confidentialité — remplis en quelques minutes, sans page blanche."
            )}
          />
          <FeatureCard
            to="/app/settings"
            icon={<ShieldCheck className="h-5 w-5" />}
            title={t("4 jurisdictions covered", "4 juridictions couvertes")}
            desc={t(
              "Ontario (ESA), Quebec (LNT), Federal (Canada Labour Code), and Remote workers under federal jurisdiction — current legislation, not outdated references.",
              "Ontario (LNE), Québec (LNT), fédéral (Code canadien du travail), et travailleurs à distance sous juridiction fédérale — législation actuelle, pas des références dépassées."
            )}
          />
          <FeatureCard
            to="/app/generator?template=Offer%20Letter"
            icon={<Sparkles className="h-5 w-5" />}
            title={t("AI-guided generation", "Génération assistée par IA")}
            desc={t(
              "Answer a few questions about the situation — Dutiva fills every field and flags what to double-check before you sign.",
              "Répondez à quelques questions — Dutiva remplit chaque champ et signale ce qu'il faut vérifier avant de signer."
            )}
          />
          <FeatureCard
            to="/app/advisor"
            icon={<MessageSquare className="h-5 w-5" />}
            title={t("Legislation-cited advisor", "Conseiller avec citations légales")}
            desc={t(
              "Ask a compliance question in plain English or French. Get an answer with the exact ESA, LNT, or CLC section and effective date.",
              "Posez une question en français ou en anglais. Obtenez une réponse avec l'article exact de la LNE, LNT ou du CCT et sa date d'entrée en vigueur."
            )}
          />
        </div>
      </Section>

      {/* ── WELLNESS ── */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>{t("Workplace Wellness — now available", "Bien-être au travail — maintenant disponible")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t(
              "Beyond documents — interactive compliance workflows.",
              "Au-delà des documents — des flux de conformité interactifs."
            )}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Dutiva now includes guided decision trees, checklists, and assessment tools for workplace wellness compliance — the interactive workflows your team needs alongside the documents.",
              "Dutiva inclut maintenant des arbres de décision guidés, des listes de vérification et des outils d'évaluation pour la conformité en matière de bien-être au travail — les flux interactifs dont votre équipe a besoin en complément des documents."
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Pillar B — Accommodation Frameworks */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Pillar B", "Pilier B")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Accommodation Frameworks", "Cadres d'accommodement")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Guided duty-to-accommodate workflows — from initial request to documented plan — built around human rights obligations across Canadian jurisdictions.",
                "Des flux guidés d'obligation d'accommodement — de la demande initiale au plan documenté — fondés sur les obligations relatives aux droits de la personne dans les juridictions canadiennes."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Duty-to-accommodate decision tree", "Arbre de décision sur l'obligation d'accommodement")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Accommodation request & plan templates", "Modèles de demande et de plan d'accommodement")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Functional limitations guide", "Guide sur les limitations fonctionnelles")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Undue hardship assessment", "Évaluation de la contrainte excessive")}
              </li>
            </ul>
          </div>

          {/* Pillar D — Leave Management */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Pillar D", "Pilier D")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Leave Management", "Gestion des congés")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Jurisdiction-aware leave documentation — checklists, request forms, and policy templates that match the rules for your province or federal scope.",
                "Documentation des congés adaptée à la juridiction — listes de vérification, formulaires de demande et modèles de politique qui correspondent aux règles de votre province ou portée fédérale."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Leave of absence checklist", "Liste de vérification pour le congé d'absence")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Leave request form", "Formulaire de demande de congé")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Parental leave guide (ON / QC / Federal)", "Guide sur le congé parental (ON / QC / Fédéral)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Sick day policy template", "Modèle de politique sur les jours de maladie")}
              </li>
            </ul>
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <span className="text-sm text-zinc-500">{t("Coming soon:", "À venir :")}</span>
          <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
            {t("Pillar A · Mental Health & EAP", "Pilier A · Santé mentale et PAE")}
          </div>
          <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-400">
            {t("Pillar C · Psychological Safety", "Pilier C · Sécurité psychologique")}
          </div>
        </div>
      </Section>

      {/* ── FOUNDER CREDIBILITY ── */}
      <Section className="py-8 md:py-12">
        <div className="rounded-[28px] border border-white/6 bg-white/[0.02] p-8 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <Pill>{t("Why Dutiva exists", "Pourquoi Dutiva existe")}</Pill>
            <h3 className="metric-value mt-4 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              {t(
                "Built by someone who has actually done this work.",
                "Conçu par quelqu'un qui a fait ce travail."
              )}
            </h3>
            <p className="mt-3 text-base leading-7 text-zinc-400">
              {t(
                "Dutiva was built by a Canadian HR and payroll professional with hands-on experience at federal agencies and growing organizations — someone who has processed payroll, filed ROEs, drafted termination letters, and navigated provincial and federal employment standards. Not a team that Googled it.",
                "Dutiva est conçu par un professionnel canadien des RH et de la paie avec de l'expérience dans des organismes fédéraux et des entreprises en croissance — quelqu'un qui a traité la paie, produit des RE, rédigé des lettres de cessation, et navigué les normes du travail provinciales et fédérales. Pas une équipe qui a fait une recherche Google."
              )}
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              {t("Built in Ottawa, Canada · PIPEDA-compliant", "Conçu à Ottawa, Canada · Conforme LPRPDE")}
            </p>
          </div>
        </div>
      </Section>

      {/* ── BOTTOM CTA ── */}
      <Section className="py-12 md:py-16">
        <div className="premium-card overflow-hidden rounded-[32px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Pill>{t("Start free", "Commencez gratuitement")}</Pill>
              <h3 className="metric-value mt-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                {t(
                  "Generate your first compliant document in under 5 minutes.",
                  "Générez votre premier document conforme en moins de 5 minutes."
                )}
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                {t(
                  "No credit card. No setup. Pick a template, answer a few questions, and get a jurisdiction-specific document ready to review and sign.",
                  "Sans carte de crédit. Sans configuration. Choisissez un modèle, répondez à quelques questions, et obtenez un document spécifique à votre juridiction, prêt à signer."
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/app/generator?template=Offer%20Letter"
                className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
              >
                {t("Generate a document", "Générer un document")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm">
                {t("See pricing", "Voir les tarifs")}
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
