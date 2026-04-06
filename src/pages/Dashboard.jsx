import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  ChevronRight,
  Clock3,
  FileText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { loadFromStorage } from "../utils/storage";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase";

const SETTINGS_STORAGE_KEY = "dutiva.settings.v1";

function StatCard({ title, value, sub, icon, tone = "default", to }) {
  const toneClass =
    tone === "gold"
      ? "text-amber-300"
      : tone === "warning"
      ? "text-yellow-300"
      : "text-zinc-100";

  const content = (
    <div className="premium-card-soft p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          {title}
        </div>
        <div className="text-zinc-500">{icon}</div>
      </div>
      <div className={`metric-value mt-4 text-3xl font-semibold tracking-tight ${toneClass}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-zinc-400">{sub}</div>
    </div>
  );

  return to ? (
    <Link to={to} className="block transition hover:opacity-95">
      {content}
    </Link>
  ) : (
    content
  );
}

function SectionCard({ title, action, children }) {
  return (
    <section className="premium-card p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        </div>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function ActivityRow({ title, meta, badge, to }) {
  const content = (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 transition hover:border-white/10 hover:bg-white/[0.03]">
      <div className="min-w-0">
        <div className="truncate text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{meta}</div>
      </div>
      <div className="shrink-0 rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">
        {badge}
      </div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

function ActionRow({ title, desc, to }) {
  const content = (
    <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]">
      <div>
        <div className="text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

function RegionRow({ region, status, note, to }) {
  const statusMap = {
    compliant: {
      label: "Compliant",
      className: "text-emerald-300 border-emerald-400/15 bg-emerald-400/8",
    },
    review: {
      label: "Needs review",
      className: "text-yellow-300 border-yellow-400/15 bg-yellow-400/8",
    },
  };

  const item = statusMap[status];

  const content = (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
      <div>
        <div className="text-sm font-medium text-zinc-100">{region}</div>
        <div className="mt-1 text-sm text-zinc-400">{note}</div>
      </div>
      <div className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${item.className}`}>
        {item.label}
      </div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

function formatDateTime(value) {
  if (!value) return "Recently";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "Recently";
  }
}

export default function Dashboard() {
  const { user } = useAuth();
  const savedSettings = loadFromStorage(SETTINGS_STORAGE_KEY, {});
  const companyName = savedSettings.companyName || "Your workspace";

  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  useEffect(() => {
    async function loadDocuments() {
      if (!user) {
        setLoadingDocs(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (error) {
        console.error("Failed to load dashboard documents:", error);
      } finally {
        setLoadingDocs(false);
      }
    }

    loadDocuments();
  }, [user]);

  const documentCount = documents.length;
  const latestDocument = documents[0];
  const lastUpdated = latestDocument?.created_at
    ? new Date(latestDocument.created_at).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
    : "—";

  const recentActivity =
    documents.length > 0
      ? documents.slice(0, 3).map((doc) => ({
          id: doc.id,
          title: doc.title || "Untitled document",
          meta: formatDateTime(doc.created_at),
          badge: "Saved",
          to: "/app/generator",
        }))
      : [
          {
            id: "placeholder-1",
            title: "No saved documents yet",
            meta: "Start by creating your first document",
            badge: "New",
            to: "/app/generator",
          },
        ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Dashboard
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {companyName}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            A clearer operational view of compliance, document activity, and what needs attention next.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link to="/app/advisor" className="ghost-button px-4 py-3 text-sm">
            View activity
          </Link>
          <Link to="/app/generator" className="gold-button px-5 py-3 text-sm">
            Generate document
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Compliance"
          value="Compliant"
          sub="Workspace defaults configured"
          tone="gold"
          icon={<ShieldCheck className="h-4 w-4" />}
          to="/app/settings"
        />
        <StatCard
          title="Documents"
          value={loadingDocs ? "…" : String(documentCount)}
          sub={`Active for ${companyName}`}
          icon={<FileText className="h-4 w-4" />}
          to="/app/generator"
        />
        <StatCard
          title="Reviews"
          value={loadingDocs ? "…" : documentCount > 0 ? "1" : "0"}
          sub={documentCount > 0 ? "Advisor-ready workflow" : "No pending reviews"}
          tone="warning"
          icon={<AlertTriangle className="h-4 w-4" />}
          to="/app/advisor"
        />
        <StatCard
          title="Last update"
          value={loadingDocs ? "…" : lastUpdated}
          sub={latestDocument ? "Most recent saved doc" : "No documents yet"}
          icon={<Clock3 className="h-4 w-4" />}
          to="/app/generator"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <SectionCard
            title="Recent activity"
            action={
              <Link to="/app/generator" className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-200">
                Open generator
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            }
          >
            <div className="space-y-3">
              {recentActivity.map((item) => (
                <ActivityRow
                  key={item.id}
                  title={item.title}
                  meta={item.meta}
                  badge={item.badge}
                  to={item.to}
                />
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Next actions">
            <div className="space-y-3">
              <ActionRow
                title="Create or update a document"
                desc={`Continue building documents for ${companyName}.`}
                to="/app/generator"
              />
              <ActionRow
                title="Review guidance in Advisor"
                desc="Turn saved work into a guided compliance workflow."
                to="/app/advisor"
              />
              <ActionRow
                title="Update workspace defaults"
                desc="Keep your company profile and jurisdiction accurate."
                to="/app/settings"
              />
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Compliance by region">
            <div className="space-y-3">
              <RegionRow
                region={savedSettings.province || "Ontario"}
                status="compliant"
                note="Default workspace region"
                to="/app/settings"
              />
              <RegionRow
                region="Federal"
                status="compliant"
                note="Core workflow available"
                to="/app/settings"
              />
              <RegionRow
                region="Custom"
                status={documentCount > 0 ? "review" : "compliant"}
                note={documentCount > 0 ? "Review your saved documents" : "No outstanding issues"}
                to="/app/advisor"
              />
            </div>
          </SectionCard>

          <SectionCard title="Workspace status">
            <div className="rounded-[24px] border border-amber-400/10 bg-amber-400/6 p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-2xl bg-amber-400/12 text-amber-300">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-zinc-100">{companyName} workspace active</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Auth, saved settings, and saved documents are now connected into one product flow.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <Link to="/app/generator" className="gold-button w-full px-4 py-3 text-center text-sm">
                Generate document
              </Link>
              <Link to="/app/advisor" className="ghost-button w-full px-4 py-3 text-center text-sm">
                Ask advisor
              </Link>
            </div>
          </SectionCard>

          <SectionCard title="Health checks">
            <div className="space-y-3">
              <Link to="/app/generator" className="block">
                <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-sm font-medium text-zinc-100">Document storage available</div>
                    <div className="text-sm text-zinc-400">
                      {documentCount > 0 ? `${documentCount} saved document(s)` : "No saved documents yet"}
                    </div>
                  </div>
                </div>
              </Link>
              <Link to="/app/settings" className="block">
                <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <div>
                    <div className="text-sm font-medium text-zinc-100">Workspace profile active</div>
                    <div className="text-sm text-zinc-400">Settings are available for your signed-in account</div>
                  </div>
                </div>
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}