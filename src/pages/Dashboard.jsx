import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  Bell,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  FileText,
  Globe,
  MapPin,
  MessageSquare,
  PenLine,
  ShieldCheck,
  Sparkles,
  UserX,
  Wand2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase";
import { getStoredSettings } from "../utils/workspaceSettings";
import { useLang } from "../context/LanguageContext.jsx";

// ── ESA notice period lookup (statutory minimums by province) ──────────────
const ESA_NOTICE = {
  Ontario: [
    { years: "Under 1 year", notice: "1 week" },
    { years: "1–3 years", notice: "2 weeks" },
    { years: "3–4 years", notice: "3 weeks" },
    { years: "4–5 years", notice: "4 weeks" },
    { years: "5–6 years", notice: "5 weeks" },
    { years: "6–7 years", notice: "6 weeks" },
    { years: "7–8 years", notice: "7 weeks" },
    { years: "8+ years", notice: "8 weeks" },
  ],
  Quebec: [
    { years: "Under 3 months", notice: "None" },
    { years: "3 months–1 year", notice: "1 week" },
    { years: "1–5 years", notice: "2 weeks" },
    { years: "5–10 years", notice: "4 weeks" },
    { years: "10+ years", notice: "8 weeks" },
  ],
  Federal: [
    { years: "Under 3 months", notice: "None" },
    { years: "3 months–1 year", notice: "2 weeks" },
    { years: "1+ years", notice: "2 weeks + 1 week/year of service (max)" },
  ],
  "Remote (Federal)": [
    { years: "Under 3 months", notice: "None" },
    { years: "3 months–1 year", notice: "2 weeks" },
    { years: "1+ years", notice: "2 weeks + 1 week/year of service (max)" },
  ],
};

// ── Quick-launch document templates ───────────────────────────────────────
const QUICK_TEMPLATES = [
  {
    label: "Offer Letter",
    desc: "New hire",
    icon: FileText,
    to: "/app/generator?template=Offer%20Letter",
  },
  {
    label: "Termination Notice",
    desc: "ESA-compliant",
    icon: UserX,
    to: "/app/generator?template=Termination%20Letter",
  },
  {
    label: "PIP",
    desc: "Performance plan",
    icon: PenLine,
    to: "/app/generator?template=Performance%20Improvement%20Plan",
  },
  {
    label: "Employment Agreement",
    desc: "Full contract",
    icon: BookOpen,
    to: "/app/generator?template=Employment%20Agreement",
  },
];

// ── Helper: document type badge colour ────────────────────────────────────
function docBadgeClass(title = "") {
  const t = title.toLowerCase();
  if (t.includes("termination") || t.includes("dismissal")) return "text-red-300 border-red-400/15 bg-red-400/8";
  if (t.includes("offer") || t.includes("onboarding")) return "text-emerald-300 border-emerald-400/15 bg-emerald-400/8";
  if (t.includes("pip") || t.includes("performance") || t.includes("warning")) return "text-yellow-300 border-yellow-400/15 bg-yellow-400/8";
  return "text-zinc-300 border-white/8 bg-white/[0.03]";
}

function formatRelative(value) {
  if (!value) return "Recently";
  try {
    const diff = Date.now() - new Date(value).getTime();
    const mins = Math.floor(diff / 60000);
    const hrs = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 2) return "Just now";
    if (mins < 60) return `${mins}m ago`;
    if (hrs < 24) return `${hrs}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;
    return new Date(value).toLocaleDateString("en-CA", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

function greeting(lang = "en") {
  const h = new Date().getHours();
  if (lang === "fr") {
    if (h < 12) return "Bonjour";
    if (h < 17) return "Bon après-midi";
    return "Bonsoir";
  }
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

// ── Sub-components ────────────────────────────────────────────────────────

function StatCard({ title, value, sub, icon, tone = "default", to }) {
  const toneClass =
    tone === "gold" ? "text-amber-300" :
    tone === "warning" ? "text-yellow-300" :
    tone === "green" ? "text-emerald-300" :
    "text-zinc-100";

  const content = (
    <div className="premium-card-soft p-5 transition hover:border-white/12">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{title}</div>
        <div className="text-zinc-500">{icon}</div>
      </div>
      <div className={`metric-value mt-4 text-3xl font-semibold tracking-tight ${toneClass}`}>{value}</div>
      <div className="mt-1 text-sm text-zinc-400">{sub}</div>
    </div>
  );

  return to ? <Link to={to} className="block">{content}</Link> : content;
}

function SectionCard({ title, subtitle, action, children }) {
  return (
    <section className="premium-card p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-zinc-100">{title}</h2>
          {subtitle && <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      {children}
    </section>
  );
}

function DocRow({ title, meta, province, to }) {
  return (
    <Link to={to}>
      <div className="flex items-center justify-between gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3.5 transition hover:border-white/10 hover:bg-white/[0.03]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-amber-400/8 text-amber-300">
            <FileText className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-zinc-100">{title}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{meta}</div>
          </div>
        </div>
        {province && (
          <div className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${docBadgeClass(title)}`}>
            {province}
          </div>
        )}
      </div>
    </Link>
  );
}

function QuickLaunchCard(props) {
  const { label, desc, to } = props;
  const Icon = props.icon;
  return (
    <Link to={to}>
      <div className="flex flex-col gap-2 rounded-[20px] border border-white/6 bg-white/[0.02] p-4 transition hover:border-amber-400/20 hover:bg-white/[0.03]">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-amber-400/8 text-amber-300">
          <Icon className="h-4 w-4" />
        </div>
        <div className="text-sm font-semibold text-zinc-100">{label}</div>
        <div className="text-xs text-zinc-500">{desc}</div>
      </div>
    </Link>
  );
}

function OnboardingCard({ companyName, province }) {
  const steps = [
    { done: !!companyName && companyName !== "Your workspace", label: "Company name set", sub: companyName || "Add in Settings" },
    { done: !!province, label: "Primary province set", sub: province || "Add in Settings" },
    { done: false, label: "First document generated", sub: "Try an Offer Letter or Termination Notice" },
  ];
  const completed = steps.filter((s) => s.done).length;

  return (
    <section className="premium-card p-6">
      <div className="mb-1 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
          <Sparkles className="h-4 w-4" />
        </div>
        <h2 className="text-base font-semibold text-zinc-100">Get started</h2>
        <span className="ml-auto rounded-full bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
          {completed}/3
        </span>
      </div>
      <p className="mb-5 text-sm text-zinc-500">Complete these steps to get the most out of Dutiva.</p>
      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.label}
            className={`flex items-start gap-3 rounded-2xl border px-4 py-3.5 ${
              step.done
                ? "border-emerald-400/15 bg-emerald-400/6"
                : "border-white/6 bg-white/[0.02]"
            }`}
          >
            {step.done ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            ) : (
              <div className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-white/20" />
            )}
            <div>
              <div className={`text-sm font-medium ${step.done ? "text-zinc-300" : "text-zinc-100"}`}>
                {step.label}
              </div>
              <div className="mt-0.5 text-xs text-zinc-500">{step.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <Link
        to="/app/generator?template=Offer%20Letter"
        className="gold-button mt-5 block w-full px-4 py-3 text-center text-sm"
      >
        Generate your first document
      </Link>
    </section>
  );
}

function ESACard({ province }) {
  const rows = ESA_NOTICE[province] || ESA_NOTICE["Ontario"];
  const displayProvince = ESA_NOTICE[province] ? province : "Ontario";

  return (
    <section className="premium-card p-6">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <h2 className="text-base font-semibold text-zinc-100">ESA notice periods</h2>
        </div>
        <Link
          to="/app/advisor"
          className="flex items-center gap-1 text-xs text-zinc-400 transition hover:text-zinc-200"
        >
          Full calculator
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
      <p className="mb-4 text-xs text-zinc-500">{displayProvince} · Statutory minimums only</p>

      <div className="space-y-1.5">
        {rows.map((row) => (
          <div
            key={row.years}
            className="flex items-center justify-between rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5"
          >
            <span className="text-xs text-zinc-400">{row.years}</span>
            <span className="text-xs font-semibold text-amber-300">{row.notice}</span>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5 text-xs text-zinc-500">
        Statutory notice only. Common law and severance pay may apply.{" "}
        <Link to="/app/advisor" className="text-amber-300 transition hover:text-amber-200">
          Ask the Advisor →
        </Link>
      </div>
    </section>
  );
}

function ComplianceByProvinceCard({ documents, defaultProvince }) {
  // Build province activity map from real documents
  const provinceActivity = {};
  documents.forEach((doc) => {
    const p = doc.province || doc.jurisdiction || defaultProvince || "Ontario";
    if (!provinceActivity[p]) {
      provinceActivity[p] = { count: 0, latest: null };
    }
    provinceActivity[p].count += 1;
    if (!provinceActivity[p].latest || doc.created_at > provinceActivity[p].latest) {
      provinceActivity[p].latest = doc.created_at;
    }
  });

  // Always include the default province
  const defaultP = defaultProvince || "Ontario";
  if (!provinceActivity[defaultP]) {
    provinceActivity[defaultP] = { count: 0, latest: null };
  }

  const entries = Object.entries(provinceActivity).sort(
    ([, a], [, b]) => (b.count || 0) - (a.count || 0)
  );

  return (
    <section className="premium-card p-6">
      <div className="mb-1 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
          <MapPin className="h-4 w-4" />
        </div>
        <h2 className="text-base font-semibold text-zinc-100">Province activity</h2>
      </div>
      <p className="mb-4 text-sm text-zinc-500">Jurisdictions with document activity</p>

      <div className="space-y-2">
        {entries.map(([province, data]) => (
          <div
            key={province}
            className="flex items-center justify-between gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3.5"
          >
            <div>
              <div className="text-sm font-medium text-zinc-100">{province}</div>
              <div className="mt-0.5 text-xs text-zinc-500">
                {data.count > 0
                  ? `${data.count} document${data.count > 1 ? "s" : ""} · Last ${formatRelative(data.latest)}`
                  : "No documents yet"}
              </div>
            </div>
            <div
              className={`shrink-0 rounded-full border px-2.5 py-1 text-xs font-medium ${
                data.count > 0
                  ? "border-emerald-400/15 bg-emerald-400/8 text-emerald-300"
                  : "border-white/8 bg-white/[0.03] text-zinc-400"
              }`}
            >
              {data.count > 0 ? "Active" : "Not started"}
            </div>
          </div>
        ))}
      </div>

      <Link
        to="/app/generator"
        className="ghost-button mt-4 block w-full px-4 py-3 text-center text-sm"
      >
        Generate for another province
      </Link>
    </section>
  );
}

function LawUpdatesCard({ updates }) {
  if (!updates || updates.length === 0) {
    return (
      <section className="premium-card p-6">
        <div className="mb-3 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <Globe className="h-4 w-4" />
          </div>
          <h2 className="text-base font-semibold text-zinc-100">Law monitoring</h2>
        </div>
        <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-zinc-500">
          All monitored legislation pages are up to date. Checks run daily.
        </div>
      </section>
    );
  }

  return (
    <section className="premium-card p-6">
      <div className="mb-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
            <Bell className="h-4 w-4" />
          </div>
          <h2 className="text-base font-semibold text-zinc-100">Law updates</h2>
        </div>
        <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold text-amber-300">
          {updates.length} new
        </span>
      </div>
      <p className="mb-4 text-xs text-zinc-500">
        Detected changes in Canadian employment legislation · last 30 days
      </p>
      <div className="space-y-2">
        {updates.slice(0, 5).map((u) => (
          <div key={u.id}
            className="rounded-2xl border border-amber-400/12 bg-amber-400/5 px-4 py-3.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-semibold text-amber-300">{u.jurisdiction}</span>
                  {u.is_new && (
                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-300">
                      First detected
                    </span>
                  )}
                </div>
                <div className="mt-0.5 text-sm font-medium text-zinc-100">{u.law_name}</div>
                {u.change_summary && (
                  <p className="mt-1.5 text-xs leading-5 text-zinc-400 line-clamp-3">
                    {u.change_summary}
                  </p>
                )}
              </div>
              {u.url && (
                <a href={u.url} target="_blank" rel="noopener noreferrer"
                  className="mt-0.5 shrink-0 text-zinc-500 transition hover:text-amber-300">
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            <div className="mt-2 text-[10px] text-zinc-600">{formatRelative(u.detected_at)}</div>
          </div>
        ))}
      </div>
      <Link to="/app/advisor"
        className="ghost-button mt-4 block w-full px-4 py-3 text-center text-sm">
        Discuss changes with Advisor →
      </Link>
    </section>
  );
}

// ── Main Dashboard ─────────────────────────────────────────────────────────
export default function Dashboard() {
  const { user } = useAuth();
  const { t, lang } = useLang();
  const savedSettings = getStoredSettings();
  const companyName = savedSettings.companyName || null;
  const province = savedSettings.province || null;

  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);
  const [pendingSignatures, setPendingSignatures] = useState(0);
  const [lawUpdates, setLawUpdates] = useState([]);

  useEffect(() => {
    async function load() {
      if (!user || !supabase) { setLoadingDocs(false); return; }
      try {
        const { data: docs } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });
        setDocuments(docs || []);

        const { data: sigs } = await supabase
          .from("signatures")
          .select("status")
          .eq("user_id", user.id);
        setPendingSignatures((sigs || []).filter((s) => s.status === "pending").length);

        // Law updates — fetch most recent 10 from last 30 days
        const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
        const { data: updates } = await supabase
          .from("law_updates")
          .select("id, jurisdiction, law_name, change_summary, detected_at, url, is_new")
          .gte("detected_at", since)
          .order("detected_at", { ascending: false })
          .limit(10);
        setLawUpdates(updates || []);
      } catch (e) {
        console.error("Dashboard load error:", e);
      } finally {
        setLoadingDocs(false);
      }
    }
    load();
  }, [user]);

  const documentCount = documents.length;
  const hasDocuments = documentCount > 0;
  const recentDocs = documents.slice(0, 5);

  // Unique provinces from actual documents
  const activeProvinces = [...new Set(
    documents.map((d) => d.province || d.jurisdiction || province || "Ontario").filter(Boolean)
  )].length;

  const today = new Date().toLocaleDateString("en-CA", {
    weekday: "long", month: "long", day: "numeric",
  });

  return (
    <div className="space-y-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 text-sm text-zinc-500">{today}</div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {greeting(lang)}{companyName ? `, ${companyName}` : "."}
          </h1>
          <p className="mt-2 text-base text-zinc-400">
            {hasDocuments
              ? `${documentCount} ${t("document", "document")}${documentCount > 1 ? "s" : ""} ${t("in your workspace.", "dans votre espace de travail.")} ${pendingSignatures > 0 ? `${pendingSignatures} ${t("pending signature", "signature en attente")}${pendingSignatures > 1 ? "s" : ""}.` : t("All signatures up to date.", "Toutes les signatures sont à jour.")}`
              : t("Your HR compliance workspace is ready. Generate your first document below.", "Votre espace de conformité RH est prêt. Générez votre premier document ci-dessous.")}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/app/advisor" className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm">
            <MessageSquare className="h-4 w-4" />
            {t("Ask advisor", "Consulter le conseiller")}
          </Link>
          <Link to="/app/generator" className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
            <Wand2 className="h-4 w-4" />
            {t("Generate document", "Générer un document")}
          </Link>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title={t("Documents", "Documents")}
          value={loadingDocs ? "—" : String(documentCount)}
          sub={hasDocuments ? `${t("Last", "Dernier")} : ${formatRelative(documents[0]?.created_at)}` : t("None yet — start below", "Aucun encore — commencez ci-dessous")}
          tone={hasDocuments ? "gold" : "default"}
          icon={<FileText className="h-4 w-4" />}
          to="/app/generator"
        />
        <StatCard
          title={t("Provinces active", "Provinces actives")}
          value={loadingDocs ? "—" : String(Math.max(activeProvinces, province ? 1 : 0))}
          sub={province ? `${t("Primary", "Principale")} : ${province}` : t("Set province in Settings", "Définir la province dans Paramètres")}
          tone={province ? "green" : "default"}
          icon={<MapPin className="h-4 w-4" />}
          to="/app/settings"
        />
        <StatCard
          title={t("Pending signatures", "Signatures en attente")}
          value={loadingDocs ? "—" : String(pendingSignatures)}
          sub={pendingSignatures > 0 ? t("Awaiting review", "En attente de révision") : t("All signed or none pending", "Tout signé ou aucun en attente")}
          tone={pendingSignatures > 0 ? "warning" : "default"}
          icon={<AlertTriangle className="h-4 w-4" />}
          to="/app/generator"
        />
        <StatCard
          title={t("Law updates", "Mises à jour législatives")}
          value={loadingDocs ? "—" : String(lawUpdates.length)}
          sub={lawUpdates.length > 0 ? t("Recent legislation changes detected", "Changements législatifs récents détectés") : t("No changes detected in 30 days", "Aucun changement détecté en 30 jours")}
          tone={lawUpdates.length > 0 ? "warning" : "green"}
          icon={<Bell className="h-4 w-4" />}
        />
      </div>

      {/* ── Quick launch ── */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-zinc-400">
            {t("Quick document launch", "Lancement rapide de documents")}
          </h2>
          <Link
            to="/app/templates"
            className="flex items-center gap-1 text-xs text-zinc-400 transition hover:text-zinc-200"
          >
            {t("All 16 templates", "16 modèles")}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {QUICK_TEMPLATES.map((tpl) => (
            <QuickLaunchCard key={tpl.label} {...tpl} />
          ))}
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">

        {/* Left column */}
        <div className="space-y-6">

          {/* Recent documents */}
          <SectionCard
            title="Recent documents"
            subtitle={hasDocuments ? `${documentCount} document${documentCount > 1 ? "s" : ""} in your workspace` : "No documents yet"}
            action={
              <Link
                to="/app/generator"
                className="flex items-center gap-1.5 text-sm text-amber-300 transition hover:text-amber-200"
              >
                New document
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          >
            {loadingDocs ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-[60px] animate-pulse rounded-2xl border border-white/6 bg-white/[0.02]" />
                ))}
              </div>
            ) : hasDocuments ? (
              <div className="space-y-2">
                {recentDocs.map((doc) => (
                  <DocRow
                    key={doc.id}
                    title={doc.title || "Untitled document"}
                    meta={formatRelative(doc.created_at)}
                    province={doc.province || doc.jurisdiction || province || "Ontario"}
                    to="/app/generator"
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[20px] border border-white/6 bg-white/[0.02] px-5 py-8 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/8 text-amber-300">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="text-sm font-medium text-zinc-100">No documents yet</div>
                <div className="mt-1 text-sm text-zinc-500">
                  Generate your first document — it takes under 5 minutes.
                </div>
                <Link
                  to="/app/generator?template=Offer%20Letter"
                  className="gold-button mt-4 inline-flex items-center gap-2 px-4 py-2.5 text-sm"
                >
                  Start with an Offer Letter
                </Link>
              </div>
            )}
          </SectionCard>

          {/* What to do next */}
          <SectionCard
            title="Suggested next steps"
            subtitle="Based on your workspace activity"
          >
            <div className="space-y-2">
              {pendingSignatures > 0 && (
                <Link to="/app/generator">
                  <div className="flex items-center gap-3 rounded-2xl border border-yellow-400/15 bg-yellow-400/6 px-4 py-4 transition hover:border-yellow-400/25">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-yellow-300" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-100">
                        {pendingSignatures} document{pendingSignatures > 1 ? "s" : ""} pending signature
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-400">Review and collect signatures</div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                  </div>
                </Link>
              )}

              {lawUpdates.length > 0 && (
                <Link to="/app/advisor">
                  <div className="flex items-center gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/6 px-4 py-4 transition hover:border-amber-400/25">
                    <Bell className="h-4 w-4 shrink-0 text-amber-300" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-100">
                        {lawUpdates.length} legislation change{lawUpdates.length > 1 ? "s" : ""} detected
                      </div>
                      <div className="mt-0.5 text-xs text-zinc-400">
                        {lawUpdates[0]?.jurisdiction} · {lawUpdates[0]?.law_name} — ask the Advisor what it means for you
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                  </div>
                </Link>
              )}

              {!province && (
                <Link to="/app/settings">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition hover:border-amber-400/20">
                    <MapPin className="h-4 w-4 shrink-0 text-amber-300" />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-zinc-100">Set your primary province</div>
                      <div className="mt-0.5 text-xs text-zinc-400">Required for accurate ESA calculations</div>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                  </div>
                </Link>
              )}

              <Link to="/app/generator?template=Termination%20Letter">
                <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition hover:border-amber-400/20">
                  <UserX className="h-4 w-4 shrink-0 text-amber-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-100">Generate a termination notice</div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      ESA-compliant for {province || "your province"} — notice periods auto-calculated
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                </div>
              </Link>

              <Link to="/app/advisor">
                <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition hover:border-amber-400/20">
                  <MessageSquare className="h-4 w-4 shrink-0 text-amber-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-100">Ask the Advisor a compliance question</div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      Legislation-cited answers for {province || "any province"}
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                </div>
              </Link>

              <Link to="/app/templates">
                <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition hover:border-amber-400/20">
                  <BookOpen className="h-4 w-4 shrink-0 text-amber-300" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-zinc-100">Browse all 16 templates</div>
                    <div className="mt-0.5 text-xs text-zinc-400">
                      Offer letters, PIPs, NDAs, policies, and more — all bilingual
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                </div>
              </Link>
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">

          {/* Onboarding card (only if no documents yet) */}
          {!hasDocuments && (
            <OnboardingCard companyName={companyName} province={province} />
          )}

          {/* Law updates */}
          <LawUpdatesCard updates={lawUpdates} />

          {/* Province activity */}
          <ComplianceByProvinceCard
            documents={documents}
            defaultProvince={province || "Ontario"}
          />

          {/* ESA quick reference */}
          <ESACard province={province || "Ontario"} />

          {/* Advisor promo (only if has documents, replace onboarding) */}
          {hasDocuments && (
            <section className="premium-card p-6">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">Have a compliance question?</div>
                  <p className="mt-1.5 text-sm leading-6 text-zinc-400">
                    The Advisor cites the exact ESA section, province, and effective date — not
                    generic HR advice.
                  </p>
                </div>
              </div>
              <Link
                to="/app/advisor"
                className="gold-button mt-5 block w-full px-4 py-3 text-center text-sm"
              >
                Open Advisor
              </Link>
            </section>
          )}
        </div>
      {/* AI transparency footer */}
      <div className="mt-8 border-t border-white/6 pt-4 text-center">
        <Link to="/ai-technology" className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors">
          AI &amp; Technology Transparency Policy
        </Link>
      </div>
      </div>
    </div>
  );
}
