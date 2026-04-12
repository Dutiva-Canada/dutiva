import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, FileText, ShieldCheck, Sparkles, Scale, Calendar, Megaphone, Users, ShieldAlert, DollarSign, TrendingUp, BookOpen } from "lucide-react";
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
              <div className="font-serif text-2xl text-amber-400">20</div>
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
                    <strong className="text-sm text-zinc-100">{t("20 templates", "20 modèles")}</strong>
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
          <Pill>{t("Document Generator - Ring 1 fully live", "G\u00e9n\u00e9rateur de documents - Anneau 1 enti\u00e8rement disponible")}</Pill>
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
            title={t("20 bilingual templates", "20 modèles bilingues")}
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
          <Pill>{t("Workplace Wellness — Ring 2 fully live", "Bien-être au travail — Anneau 2 entièrement disponible")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t(
              "Beyond documents — four pillars of wellness compliance.",
              "Au-delà des documents — quatre piliers de conformité en bien-être."
            )}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Ring 2 brings guided decision trees, scored assessments, interactive checklists, and manager scripts across all four wellness pillars — fully live and jurisdiction-aware for Canadian employers.",
              "L'anneau 2 offre des arbres de décision guidés, des évaluations notées, des listes de vérification interactives et des scripts de gestion sur les quatre piliers du bien-être — entièrement disponibles et adaptés aux juridictions canadiennes."
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Pillar A — Mental Health & EAP */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Pillar A", "Pilier A")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Mental Health & EAP", "Santé mentale et PAE")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Interactive mental health checklists, EAP referral guides, and manager conversation scripts — grounded in CSA Z1003 and federal Bill C-65.",
                "Listes de vérification interactives en santé mentale, guides d'orientation PAE et scripts pour gestionnaires — ancrés dans la norme CSA Z1003 et le projet de loi fédéral C-65."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("8-point mental health compliance checklist", "Liste de conformité en santé mentale en 8 points")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("EAP referral guide (5 categories)", "Guide d'orientation PAE (5 catégories)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Manager conversation scripts", "Scripts de conversation pour gestionnaires")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Return-to-work planning guide", "Guide de planification du retour au travail")}
              </li>
            </ul>
          </div>

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

          {/* Pillar C — Psychological Safety */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Pillar C", "Pilier C")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Psychological Safety", "Sécurité psychologique")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Scored workplace climate assessments, bystander intervention guides, and respectful workplace tools — aligned with Bill C-65 and provincial harassment obligations.",
                "Évaluations notées du climat de travail, guides d'intervention pour témoins et outils de milieu de travail respectueux — conformes au projet de loi C-65 et aux obligations provinciales sur le harcèlement."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("15-question CSA Z1003 climate assessment", "Évaluation climatique CSA Z1003 (15 questions)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Bystander intervention guide (5 D's)", "Guide d'intervention pour témoins (les 5 D)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Respectful workplace policy template", "Modèle de politique sur le milieu respectueux")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Jurisdiction reporting obligations", "Obligations de signalement par juridiction")}
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

        {/* CTA into Wellness */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/app/wellness"
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            {t("Explore Ring 2 Wellness", "Explorer l'anneau 2 Bien-être")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-zinc-500">
            {t("16 interactive tools across 4 pillars", "16 outils interactifs sur 4 piliers")}
          </span>
        </div>
      </Section>

      {/* ══ COMMUNICATIONS ══ */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>{t("Internal Communications — Ring 3 fully live", "Communications internes — Anneau 3 entièrement disponible")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t(
              "Scripts, memos, and crisis guides — built for the hardest HR conversations.",
              "Scripts, mémos et guides de crise — conçus pour les conversations RH les plus difficiles."
            )}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Ring 3 delivers bilingual, jurisdiction-aware communication tools for layoffs, restructuring, policy rollouts, and workplace crises — so every message is legally grounded and professionally delivered.",
              "L'anneau 3 offre des outils de communication bilingues et adaptés à la juridiction pour les mises à pied, restructurations, déploiements de politiques et crises — chaque message est ancré légalement et livré professionnellement."
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Layoff Script Builder */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 1", "Outil 1")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Layoff Script Builder", "Générateur de scripts de mise à pied")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Generate compliant termination letters tailored to Ontario, Qu\u00e9bec, and Federal jurisdiction with ESA notice weeks automatically calculated.",
                "G\u00e9n\u00e9rez des lettres de licenciement conformes adapt\u00e9es \u00e0 l\u2019Ontario, au Qu\u00e9bec et au f\u00e9d\u00e9ral, avec les semaines de pr\u00e9avis ESA calcul\u00e9es automatiquement.",
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Province selector (Ontario, Qu\u00e9bec, Federal)", "S\u00e9lecteur de province (Ontario, Qu\u00e9bec, F\u00e9d\u00e9ral)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("ESA notice weeks auto-calculated", "Semaines de préavis ESA calculées automatiquement")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Formal termination letter output", "Sortie de lettre de licenciement formelle")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Restructuring memo generator", "Générateur de mémo de restructuration")}
              </li>
            </ul>
          </div>

          {/* Policy & FAQ */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 2", "Outil 2")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Policy Memos & FAQ Builder", "Mémos de politique et générateur de FAQ")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Scenario-based FAQ documents and formal policy memos with rationale — for layoffs, restructuring, and policy rollouts.",
                "Documents FAQ basés sur des scénarios et mémos de politique formels avec justification — pour les mises à pied, restructurations et déploiements de politiques."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Layoff / restructuring / policy FAQ scenarios", "Scénarios FAQ : mise à pied / restructuration / politique")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Policy memo with rationale field", "Mémo de politique avec champ de justification")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Effective date & contact tracking", "Suivi de la date d'entrée en vigueur et du contact")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("One-click copy output", "Sortie copie en un clic")}
              </li>
            </ul>
          </div>

          {/* Crisis Guide */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 3", "Outil 3")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Crisis Communication Guide", "Guide de communication de crise")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Pre-built crisis playbooks for workplace accidents (WSIB), data breaches (OPC), and media inquiries — with step-by-step scripts and Q&A frameworks.",
                "Guides de crise prédéfinis pour les accidents au travail (WSIB), les violations de données (CPVP) et les demandes médias — avec scripts et cadres Q&R étape par étape."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Workplace accident & WSIB reporting guide", "Guide de signalement d'accident et WSIB")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Data breach & OPC notification script", "Script de notification de violation de données et CPVP")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Media inquiry response framework", "Cadre de réponse aux demandes médias")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Expandable Q&A playbook per scenario", "Guide Q&R extensible par scénario")}
              </li>
            </ul>
          </div>

          {/* Town Hall & All-Hands Builder */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 4", "Outil 4")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Town Hall & All-Hands Builder", "Générateur d'assemblées générales")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Structured town hall agendas with auto-timed segments and leadership talking points — for all-hands, department, leadership, and crisis meetings.",
                "Ordres du jour structurés avec segments auto-minutés et points de discussion pour la direction — pour les assemblées générales, de département, de direction et de crise."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("4 meeting types (all-hands, dept, leadership, crisis)", "4 types de réunion (assemblée générale, département, direction, crise)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Agenda with opening, topics, Q&A, and closing auto-timed", "Ordre du jour avec ouverture, sujets, Q&R et clôture auto-minutés")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Leadership talking points with core message + 3 supports", "Points de discussion avec message clé + 3 appuis")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Tough Q&A anticipation framework", "Cadre d'anticipation des questions difficiles")}
              </li>
            </ul>
          </div>
        </div>

        {/* CTA into Communications */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/app/communications"
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            {t("Explore Ring 3 Communications", "Explorer l'anneau 3 Communications")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-zinc-500">
            {t("5 tools across 3 communication categories", "5 outils sur 3 catégories de communication")}
          </span>
        </div>
      </Section>

      {/* ══ COMPENSATION ══ */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>{t("Compensation & Financial Literacy — Ring 4 fully live", "Rémunération et littératie financière — Anneau 4 entièrement disponible")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t(
              "Severance math, pay equity, and salary bands — no spreadsheet required.",
              "Calcul des indemnités, équité salariale et bandes salariales — sans feuille de calcul."
            )}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Ring 4 puts ESA severance calculators, pay equity gap analysis, salary band builders, and financial literacy references in one place — jurisdiction-aware and bilingual for Canadian HR teams.",
              "L'anneau 4 regroupe les calculateurs d'indemnités ESA, l'analyse des écarts d'équité salariale, les outils de bandes salariales et les références de littératie financière — adaptés à la juridiction et bilingues pour les équipes RH canadiennes."
            )}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Severance Calculator */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <DollarSign className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 1", "Outil 1")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Severance Calculator", "Calculateur d'indemnités de départ")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "ESA statutory notice plus common-law estimates \u2014 province-aware for Ontario, Qu\u00e9bec, and Federal (Canada Labour Code).",
                "Pr\u00e9avis l\u00e9gal ESA plus estimations de common law \u2014 adapt\u00e9 \u00e0 l\u2019Ontario, au Qu\u00e9bec et au f\u00e9d\u00e9ral (Code canadien du travail).",
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("ESA notice weeks by province & tenure", "Semaines de préavis ESA par province et ancienneté")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Common-law estimate (1.2 weeks/year)", "Estimation de common law (1,2 semaine/année)")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Pay in lieu + severance dollar amounts", "Indemnités en lieu de préavis + montants en dollars")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Statutory citation per jurisdiction", "Citation légale par juridiction")}
              </li>
            </ul>
          </div>

          {/* Pay Equity Checker */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 2", "Outil 2")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Pay Equity Checker", "Vérificateur d'équité salariale")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Compare compensation by gender across roles — flags gaps above 5% and generates a copy-ready equity summary.",
                "Comparez la rémunération par genre selon les rôles — signale les écarts supérieurs à 5% et génère un résumé d'équité prêt à copier."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Dynamic role-by-role comp table", "Tableau de rémunération dynamique par rôle")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Gender pay gap flagged at >5%", "Écart salarial signalé à >5%")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Average female vs male salary breakdown", "Ventilation salaire moyen femmes vs hommes")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Copy-ready equity analysis output", "Sortie d'analyse d'équité prête à copier")}
              </li>
            </ul>
          </div>

          {/* Salary Band Builder */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 3", "Outil 3")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Salary Band Builder", "Générateur de bandes salariales")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Enter a market midpoint and spread — get min/mid/max bands with P50 positioning guidance and a copy-ready summary.",
                "Entrez un point médian de marché et un écart — obtenez des bandes min/milieu/max avec des conseils de positionnement P50 et un résumé prêt à copier."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Market midpoint + spread % inputs", "Entrées de point médian de marché + % d'écart")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Min / midpoint / max calculation", "Calcul minimum / point médian / maximum")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("P50 positioning placement guide", "Guide de positionnement P50")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Copy-ready formatted band summary", "Résumé de bande formaté prêt à copier")}
              </li>
            </ul>
          </div>

          {/* Financial Literacy */}
          <div className="premium-card-soft p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <BookOpen className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
                  {t("Tool 4", "Outil 4")}
                </div>
                <div className="text-lg font-semibold text-zinc-100">
                  {t("Financial Literacy Reference", "Référence de littératie financière")}
                </div>
              </div>
            </div>
            <p className="mb-4 text-sm leading-6 text-zinc-400">
              {t(
                "Plain-language guides on pay stubs, RRSP vs TFSA, and benefits terms — so employees understand what they're earning.",
                "Guides en langage simple sur les talons de paie, REER vs CELI et les conditions d'avantages sociaux — pour que les employés comprennent ce qu'ils gagnent."
              )}
            </p>
            <ul className="grid gap-2">
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Pay stub line-by-line explainer", "Explication ligne par ligne du talon de paie")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("RRSP vs TFSA comparison guide", "Guide comparatif REER vs CELI")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("Benefits terms glossary", "Glossaire des termes d'avantages sociaux")}
              </li>
              <li className="flex items-center gap-2 text-sm text-zinc-400">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-amber-300" />
                {t("3 interactive accordion topics", "3 sujets en accordéon interactifs")}
              </li>
            </ul>
          </div>
        </div>

        {/* CTA into Compensation */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link
            to="/app/compensation"
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            {t("Explore Ring 4 Compensation", "Explorer l'anneau 4 Rémunération")}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-sm text-zinc-500">
            {t("5 tools across 3 compensation categories", "5 outils sur 3 catégories de rémunération")}
          </span>
        </div>
      </Section>


      {/* ── ABOUT ── */}
      <Section className="py-8 md:py-14" id="about">
        <div className="mb-10 max-w-3xl">
          <Pill>{t("About Dutiva", "À propos de Dutiva")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t("Built with purpose. Rooted in law.", "Conçu avec intention. Ancré dans la loi.")}
          </h2>
        </div>

        {/* Mission + Vision row */}
        <div className="grid gap-4 md:grid-cols-2 mb-4">
          <div className="premium-card-soft p-8">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              {t("Our Mission", "Notre mission")}
            </div>
            <p className="text-lg font-medium leading-8 text-zinc-100">
              {t(
                "Make Canadian employment law accessible to every employer — regardless of size, budget, or HR headcount.",
                "Rendre le droit du travail canadien accessible à tous les employeurs — peu importe la taille, le budget ou l'effectif RH."
              )}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {t(
                "Too many Canadian SMBs operate without access to the compliance tools that large organizations take for granted. Dutiva closes that gap — not with generic advice, but with tools built on the actual legislation.",
                "Trop de PME canadiennes n'ont pas accès aux outils de conformité que les grandes organisations tiennent pour acquis. Dutiva comble cet écart — non pas avec des conseils généraux, mais avec des outils fondés sur la législation réelle."
              )}
            </p>
          </div>

          <div className="premium-card-soft p-8">
            <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
              {t("Our Vision", "Notre vision")}
            </div>
            <p className="text-lg font-medium leading-8 text-zinc-100">
              {t(
                "A Canada where no employer is caught off-guard by compliance — and no employee falls through the cracks.",
                "Un Canada où aucun employeur n'est pris au dépourvu en matière de conformité — et aucun employé ne passe entre les mailles du filet."
              )}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              {t(
                "Compliance failures hurt both sides. Our long-term goal is a platform where staying compliant is the path of least resistance — proactive, guided, and plain-language by default.",
                "Les manquements à la conformité nuisent aux deux parties. Notre objectif à long terme est une plateforme où rester conforme est la voie de la moindre résistance — proactive, guidée et en langage clair par défaut."
              )}
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="premium-card-soft p-8 mb-4">
          <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {t("Product Philosophy", "Philosophie du produit")}
          </div>
          <p className="text-base leading-7 text-zinc-300 max-w-3xl">
            {t(
              "Dutiva is not a form builder. It's a compliance layer built around what Canadian employment law actually requires — ESA, LNT, Canada Labour Code, CSA Z1003, Bill C-65 — not around what's popular in US HR software. Every tool, every template, and every guided workflow traces back to a specific act, article, and jurisdiction. We build the tool; you own the decision.",
              "Dutiva n'est pas un générateur de formulaires. C'est une couche de conformité construite autour de ce que le droit du travail canadien exige réellement — LNE, LNT, Code canadien du travail, CSA Z1003, projet de loi C-65 — et non ce qui est populaire dans les logiciels RH américains. Chaque outil, chaque modèle et chaque flux guidé est lié à un acte, un article et une juridiction spécifiques. Nous construisons l'outil; vous prenez la décision."
            )}
          </p>
        </div>

        {/* Core Values */}
        <div>
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {t("Core Values", "Valeurs fondamentales")}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                num: "01",
                title: t("Legislation first", "La législation d'abord"),
                desc: t(
                  "Every tool cites the exact act, article, and jurisdiction — no approximations.",
                  "Chaque outil cite l'acte, l'article et la juridiction exacts — sans approximations."
                ),
              },
              {
                num: "02",
                title: t("Built for Canadians", "Conçu pour les Canadiens"),
                desc: t(
                  "ESA, LNT, and CLC by default — not adapted from American software.",
                  "LNE, LNT et CCT par défaut — pas adapté d'un logiciel américain."
                ),
              },
              {
                num: "03",
                title: t("Proactive over reactive", "Proactif plutôt que réactif"),
                desc: t(
                  "Prevent compliance failures before they become HR crises or legal disputes.",
                  "Prévenir les manquements avant qu'ils deviennent des crises RH ou des litiges."
                ),
              },
              {
                num: "04",
                title: t("Transparency", "Transparence"),
                desc: t(
                  "Plain language, no legalese, and citations you can verify independently.",
                  "Langage clair, sans jargon juridique, et des citations que vous pouvez vérifier."
                ),
              },
              {
                num: "05",
                title: t("Accessibility", "Accessibilité"),
                desc: t(
                  "SMBs deserve the same quality of HR guidance as enterprises — at a fraction of the cost.",
                  "Les PME méritent la même qualité de conseils RH que les grandes entreprises — à une fraction du coût."
                ),
              },
            ].map((v) => (
              <div key={v.num} className="rounded-[20px] border border-white/6 bg-white/[0.02] p-5">
                <div className="mb-2 font-serif text-2xl text-amber-400">{v.num}</div>
                <div className="mb-1 text-sm font-semibold text-zinc-100">{v.title}</div>
                <div className="text-xs leading-5 text-zinc-400">{v.desc}</div>
              </div>
            ))}
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

      {/* 🔮 COMING SOON 🔮 */}
      <Section className="py-8 md:py-12">
        <div className="mb-8 max-w-3xl">
          <Pill>{t("What's coming", "Ce qui s'en vient")}</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t("Built to grow with your practice.", "Conçu pour évoluer avec votre pratique.")}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t(
              "Dutiva is expanding beyond documents and compliance tools — into personalized advisory, custom document workflows, and integrated PR services.",
              "Dutiva s'étend au-delà des documents et des outils de conformité — vers des services-conseils personnalisés, des flux documentaires sur mesure et des services RP intégrés."
            )}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {/* Consultant Add-On */}
          <div className="premium-card rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Users className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/8 px-3 py-1 text-xs font-semibold text-amber-300">
                {t("Coming soon", "Bientôt disponible")}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">
              {t("Consultant Add-On", "Forfait consultant")}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">
              {t(
                "Situation-specific HR advice when you're ready to share your policies and internal processes. Includes job-shadowing sessions for HR training — compliance guidance that knows your organization, not just the law.",
                "Conseils RH adaptés à votre situation lorsque vous partagez vos politiques et processus internes. Inclut des séances d'observation pour la formation RH — des conseils de conformité qui connaissent votre organisation."
              )}
            </p>
          </div>

          {/* Custom Template Wording */}
          <div className="premium-card rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <FileText className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-amber-400/20 bg-amber-400/8 px-3 py-1 text-xs font-semibold text-amber-300">
                {t("Coming soon", "Bientôt disponible")}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">
              {t("Custom Wording Integration", "Intégration de formulations personnalisées")}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">
              {t(
                "Upload your own wording from a Word doc or PDF — Dutiva reads it, finds where it fits in the generated template, and polishes the language so the final document feels seamlessly yours.",
                "Téléversez vos formulations depuis un document Word ou un PDF — Dutiva les lit, identifie où elles s'intègrent dans le modèle et peaufine le langage pour un résultat parfaitement personnalisé."
              )}
            </p>
          </div>

          {/* HR + PR Package */}
          <div className="premium-card rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-400">
                {t("On the horizon", "À l'horizon")}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">
              {t("HR + PR Package", "Forfait RH + RP")}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">
              {t(
                "A combined offering pairing HR compliance with public relations and communications services — for organizations that need employment law precision and professional stakeholder messaging under one roof.",
                "Une offre combinée qui associe la conformité RH aux relations publiques — pour les organisations qui ont besoin à la fois de la précision juridique et d'une communication professionnelle auprès de leurs parties prenantes."
              )}
            </p>
          </div>

          {/* PR-Only Package */}
          <div className="premium-card rounded-[28px] p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-zinc-400">
                {t("On the horizon", "À l'horizon")}
              </span>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-zinc-100">
              {t("PR-Only Package", "Forfait RP seul")}
            </h3>
            <p className="text-sm leading-6 text-zinc-400">
              {t(
                "Public relations and communications services as a standalone offering — press releases, stakeholder messaging, crisis communications, and media strategy, independent of the HR compliance suite.",
                "Services de relations publiques et de communications en offre autonome — communiqués de presse, messages aux parties prenantes, communications de crise et stratégie médias, indépendamment de la suite RH."
              )}
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

      {/* LEGAL FOOTER */}
      <Section className="py-8 border-t border-white/6">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs text-zinc-500">
            {t(
              "\u00a9 2026 Dutiva Canada. Built in Ottawa \u00b7 PIPEDA-compliant",
              "\u00a9 2026 Dutiva Canada. Con\u00e7u \u00e0 Ottawa \u00b7 Conforme LPRPDE"
            )}
          </p>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-500">
            <Link to="/privacy" className="hover:text-zinc-300 transition-colors">
              {t("Privacy Policy", "Politique de confidentialit\u00e9")}
            </Link>
            <Link to="/terms" className="hover:text-zinc-300 transition-colors">
              {t("Terms of Service", "Conditions d\u2019utilisation")}
            </Link>
            <Link to="/cookies" className="hover:text-zinc-300 transition-colors">
              {t("Cookie Policy", "Politique sur les t\u00e9moins")}
            </Link>
            <Link to="/ai-technology" className="hover:text-zinc-300 transition-colors">
              {t("AI & Tech Transparency", "Transparence IA & tech")}
            </Link>
            <Link to="/accessibility" className="hover:text-zinc-300 transition-colors">
              {t("Accessibility", "Accessibilit\u00e9")}
            </Link>
            <Link to="/disclaimer" className="hover:text-zinc-300 transition-colors">
              {t("Disclaimer", "Avertissement")}
            </Link>
          </nav>
        </div>
      </Section>
      </Section>
    </div>
  );
}
