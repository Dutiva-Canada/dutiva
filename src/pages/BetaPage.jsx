import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, FileText, Heart, Megaphone, DollarSign, Sparkles, Users, Star } from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { Helmet } from 'react-helmet-async';

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

const RINGS = [
  {
    icon: FileText,
    label: "Ring 1 — Document Generator",
    labelFr: "Anneau 1 — G\u00e9n\u00e9rateur de documents",
    desc: "All 20 bilingual templates, AI-assisted form filling, ESA auto-calculator & e-signatures.",
    descFr: "20 mod\u00e8les bilingues, remplissage assist\u00e9 par IA, calculateur LNE et signatures \u00e9lectroniques.",
  },
  {
    icon: Heart,
    label: "Ring 2 — Workplace Wellness",
    labelFr: "Anneau 2 — Bien-\u00eatre au travail",
    desc: "Accommodation workflows, mental health tools, psychological safety assessments & leave management.",
    descFr: "Processus d\u2019accommodement, outils de sant\u00e9 mentale, \u00e9valuations de s\u00e9curit\u00e9 psychologique et gestion des cong\u00e9s.",
  },
  {
    icon: Megaphone,
    label: "Ring 3 — Communications",
    labelFr: "Anneau 3 — Communications",
    desc: "Layoff scripts, policy memos, crisis communication guides & Town Hall agenda builders.",
    descFr: "Scripts de licenciement, m\u00e9mos de politique, guides de crise et g\u00e9n\u00e9rateurs d\u2019ordre du jour.",
  },
  {
    icon: DollarSign,
    label: "Ring 4 — Compensation",
    labelFr: "Anneau 4 — R\u00e9mun\u00e9ration",
    desc: "Severance calculator, pay equity gap analysis, salary band builder & financial literacy tools.",
    descFr: "Calculateur d\u2019indemnit\u00e9, analyse des \u00e9carts d\u2019\u00e9quit\u00e9 salariale, constructeur de bandes salariales et outils de litt\u00e9ratie financi\u00e8re.",
  },
];

const PERKS = [
  { en: "Locked-in founding rate when paid plans launch", fr: "Tarif fondateur garanti lors du lancement des forfaits payants" },
  { en: "Direct input on product direction \u2014 your feedback shapes what gets built next", fr: "Influence directe sur la direction du produit \u2014 vos retours fa\u00e7onnent ce qui sera d\u00e9velopp\u00e9" },
  { en: "Early access to new features before general release", fr: "Acc\u00e8s anticip\u00e9 aux nouvelles fonctionnalit\u00e9s avant leur lancement g\u00e9n\u00e9ral" },
  { en: "Priority onboarding support from the founder", fr: "Accompagnement prioritaire \u00e0 l\u2019int\u00e9gration par le fondateur" },
  { en: "\"Founding Member\" recognition in the product", fr: "Reconnaissance \u00ab Membre fondateur \u00bb dans le produit" },
];

const WHO = [
  { en: "Small business owners managing HR without a dedicated team", fr: "Propri\u00e9taires de petites entreprises g\u00e9rant les RH sans \u00e9quipe d\u00e9di\u00e9e" },
  { en: "HR generalists at companies with 5\u201350 employees", fr: "G\u00e9n\u00e9ralistes RH dans des entreprises de 5 \u00e0 50 employ\u00e9s" },
  { en: "Operations or admin leads handling employment compliance", fr: "Responsables des op\u00e9rations ou de l\u2019administration g\u00e9rant la conformit\u00e9" },
  { en: "Employers in Ontario, Quebec, or under federal jurisdiction", fr: "Employeurs en Ontario, au Qu\u00e9bec ou sous juridiction f\u00e9d\u00e9rale" },
];

export default function BetaPage() {
  const { t } = useLang();
  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Join the Dutiva Beta — Free for Early Teams</title>
        <meta name="description" content="Get early access to Dutiva, Canada’s bilingual workforce scheduling platform. Limited beta spots available." />
        <link rel="canonical" href="https://dutiva.ca/beta" />
        <meta property="og:title" content="Join the Dutiva Beta — Free for Early Teams" />
        <meta property="og:description" content="Get early access to Dutiva, Canada’s bilingual workforce scheduling platform. Limited beta spots available." />
        <meta property="og:url" content="https://dutiva.ca/beta" />
      </Helmet>

      {/* HERO */}
      <Section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <Pill>{t("Founding Member Beta", "B\u00eata \u2014 Membres fondateurs")}</Pill>
          <h1 className="metric-value mt-6 text-5xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
            {t("Get full access free. Help us build something that actually works.",
               "Acc\u00e8s complet gratuit. Aidez-nous \u00e0 cr\u00e9er quelque chose qui fonctionne vraiment.")}
          </h1>
          <p className="mt-5 text-lg leading-8 text-zinc-400">
            {t("Dutiva is in its founding beta \u2014 all four compliance rings, all 20 bilingual templates, and the AI advisor are fully live. We\u2019re inviting a small group of Canadian employers and HR professionals to use it free and tell us where it falls short.",
               "Dutiva est en b\u00eata fondateur \u2014 les quatre anneaux, les 20 mod\u00e8les et le conseiller IA sont disponibles. Nous invitons un petit groupe d\u2019employeurs canadiens \u00e0 l\u2019utiliser gratuitement et \u00e0 nous dire o\u00f9 il y a des lacunes.")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="gold-button inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              {t("Request founding access", "Demander l\u2019acc\u00e8s fondateur")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/pricing" className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              {t("See what\u2019s included", "Voir ce qui est inclus")}
            </Link>
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            {t("No credit card. No contract. Spots are limited.", "Sans carte de cr\u00e9dit. Sans contrat. Places limit\u00e9es.")}
          </p>
        </div>
      </Section>

      {/* WHAT YOU GET */}
      <Section className="py-8 md:py-12">
        <div className="mb-8 max-w-2xl">
          <Pill>{t("What\u2019s included", "Ce qui est inclus")}</Pill>
          <h2 className="metric-value mt-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
            {t("Full Growth access \u2014 all four rings \u2014 free for beta members.",
               "Acc\u00e8s Croissance complet \u2014 quatre anneaux \u2014 gratuit pour les membres b\u00eata.")}
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            {t("No feature gating. Everything that\u2019s live is yours to use for the duration of the beta.",
               "Aucune restriction. Tout ce qui est disponible est \u00e0 votre disposition pendant toute la dur\u00e9e de la b\u00eata.")}
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {RINGS.map((ring) => {
            const Icon = ring.icon;
            return (
              <div key={ring.label} className="premium-card rounded-[24px] p-5">
                <div className="flex items-start gap-4">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-zinc-100">{t(ring.label, ring.labelFr)}</div>
                    <div className="mt-1 text-sm leading-6 text-zinc-400">{t(ring.desc, ring.descFr)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* WHAT WE ASK + PERKS */}
      <Section className="py-8 md:py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="premium-card rounded-[28px] p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold text-zinc-100">{t("What we ask of you", "Ce que nous vous demandons")}</div>
            </div>
            <div className="space-y-4 text-sm leading-6 text-zinc-400">
              {[
                { en: "Use the product on a real HR situation \u2014 a hire, termination, accommodation, or pay review.", fr: "Utilisez le produit dans une situation RH r\u00e9elle \u2014 une embauche, un licenciement, un accommodement ou une r\u00e9vision salariale." },
                { en: "Share honest feedback \u2014 what worked, what felt off, what you expected but didn\u2019t find.", fr: "Partagez vos retours honn\u00eates \u2014 ce qui a fonctionn\u00e9, ce qui semblait incorrect, ce que vous esp\u00e9riez trouver." },
                { en: "A short check-in once or twice during the beta \u2014 call, form, or a few messages. Your format.", fr: "Une courte mise au point une ou deux fois \u2014 appel, formulaire ou quelques messages. Vous choisissez le format." },
                { en: "Optional: a short testimonial if you find it genuinely useful.", fr: "Facultatif\u00a0: un court t\u00e9moignage si vous trouvez le produit r\u00e9ellement utile." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  <span>{t(item.en, item.fr)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="premium-card-soft rounded-[28px] border border-amber-400/20 p-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <Star className="h-5 w-5" />
              </div>
              <div className="text-lg font-semibold text-zinc-100">{t("Founding Member perks", "Avantages membres fondateurs")}</div>
            </div>
            <div className="space-y-4">
              {PERKS.map((perk, i) => (
                <div key={i} className="flex items-start gap-3 text-sm leading-6">
                  <div className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-amber-400/10 text-amber-300">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-zinc-300">{t(perk.en, perk.fr)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* WHO THIS IS FOR */}
      <Section className="py-8 md:py-12">
        <div className="premium-card rounded-[28px] p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                  <Users className="h-5 w-5" />
                </div>
                <Pill>{t("Who this is for", "Pour qui")}</Pill>
              </div>
              <h3 className="metric-value mt-4 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
                {t("Canadian employers navigating HR compliance without a law degree.",
                   "Employeurs canadiens naviguant la conformit\u00e9 RH sans dipl\u00f4me en droit.")}
              </h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {t("Dutiva is built for founders, office managers, and operations leads doing HR on the side of their real job \u2014 and for HR generalists who need jurisdiction-specific answers fast.",
                   "Dutiva est con\u00e7u pour les fondateurs, directeurs de bureau et responsables des op\u00e9rations qui g\u00e8rent les RH en plus de leur vrai travail.")}
              </p>
            </div>
            <div className="space-y-3">
              {WHO.map((item, i) => (
                <div key={i} className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-zinc-300">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
                  {t(item.en, item.fr)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FOUNDER NOTE */}
      <Section className="py-8 md:py-12">
        <div className="mx-auto max-w-2xl rounded-[28px] border border-white/6 bg-white/[0.02] p-8 text-center">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-amber-400/10 text-amber-300">
            <Sparkles className="h-6 w-6" />
          </div>
          <blockquote className="text-base leading-7 text-zinc-300">
            {t("\u201cI built Dutiva because I saw small Canadian employers making costly HR mistakes \u2014 not from negligence, but because the right tools didn\u2019t exist at an accessible price. The beta is a chance to make sure what I\u2019ve built actually solves real problems. I want to talk to you, understand your situation, and earn your trust.\u201d",
               "\u201cJ\u2019ai cr\u00e9\u00e9 Dutiva parce que j\u2019ai vu de petits employeurs canadiens commettre des erreurs RH co\u00fbteuses \u2014 non par n\u00e9gligence, mais parce que les bons outils n\u2019existaient pas \u00e0 un prix accessible. La b\u00eata est une occasion de s\u2019assurer que ce que j\u2019ai construit r\u00e9sout vraiment les vrais probl\u00e8mes.\u201d")}
          </blockquote>
          <div className="mt-4 text-sm font-semibold text-zinc-100">Martin</div>
          <div className="text-xs text-zinc-500">{t("Founder, Dutiva Canada Inc.", "Fondateur, Dutiva Canada Inc.")}</div>
        </div>
      </Section>

      {/* BOTTOM CTA */}
      <Section className="py-12 md:py-16">
        <div className="premium-card overflow-hidden rounded-[32px] p-8 md:p-12 text-center">
          <Pill>{t("Limited spots", "Places limit\u00e9es")}</Pill>
          <h2 className="metric-value mt-5 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t("Ready to try it on a real situation?", "Pr\u00eat \u00e0 l\u2019essayer dans une situation r\u00e9elle\u00a0?")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-zinc-400">
            {t("Sign up and reach out directly at hello@dutiva.ca to join the founding beta cohort.",
               "Inscrivez-vous et contactez-nous directement \u00e0 hello@dutiva.ca pour rejoindre la coh\u00e8te b\u00eata fondatrice.")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/auth" className="gold-button inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              {t("Get founding access", "Obtenir l\u2019acc\u00e8s fondateur")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="mailto:hello@dutiva.ca?subject=Founding%20Beta%20Request&body=Hi%20Martin%2C%0A%0ACompany%20size%3A%0AProvince%3A%0AMain%20HR%20challenge%3A%0A"
               className="ghost-button inline-flex items-center gap-2 px-6 py-3.5 text-sm">
              {t("Email Martin directly", "\u00c9crire directement \u00e0 Martin")}
            </a>
          </div>
          <p className="mt-5 text-xs text-zinc-500">
            {t("No credit card \u00b7 No contract \u00b7 Cancel anytime", "Sans carte de cr\u00e9dit \u00b7 Sans contrat \u00b7 R\u00e9siliez \u00e0 tout moment")}
          </p>
        </div>
      </Section>

    </div>
  );
}
