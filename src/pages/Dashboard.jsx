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

function StatCard({ title, value, sub, icon, tone = "default" }) {
  const toneClass =
    tone === "gold"
      ? "text-amber-300"
      : tone === "warning"
      ? "text-yellow-300"
      : "text-zinc-100";

  return (
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

function ActivityRow({ title, meta, badge }) {
  return (
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
}

function ActionRow({ title, desc }) {
  return (
    <button className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]">
      <div>
        <div className="text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
    </button>
  );
}

function RegionRow({ region, status, note }) {
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

  return (
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
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Dashboard
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Overview
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            A clearer operational view of compliance, document activity, and what needs attention next.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="ghost-button px-4 py-3 text-sm">View activity</button>
          <button className="gold-button px-5 py-3 text-sm">Generate document</button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Compliance"
          value="Compliant"
          sub="All regions aligned"
          tone="gold"
          icon={<ShieldCheck className="h-4 w-4" />}
        />
        <StatCard
          title="Documents"
          value="12"
          sub="Active across workspace"
          icon={<FileText className="h-4 w-4" />}
        />
        <StatCard
          title="Reviews"
          value="2"
          sub="Require attention"
          tone="warning"
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <StatCard
          title="Last update"
          value="2h"
          sub="Since latest change"
          icon={<Clock3 className="h-4 w-4" />}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        {/* Left column */}
        <div className="space-y-6">
          <SectionCard
            title="Recent activity"
            action={
              <button className="flex items-center gap-2 text-sm text-zinc-400 transition hover:text-zinc-200">
                View all
                <ArrowUpRight className="h-4 w-4" />
              </button>
            }
          >
            <div className="space-y-3">
              <ActivityRow
                title="Offer letter signed"
                meta="Ontario · 2 hours ago"
                badge="Completed"
              />
              <ActivityRow
                title="Remote work policy updated"
                meta="Federal · Yesterday"
                badge="Updated"
              />
              <ActivityRow
                title="New employee added"
                meta="Québec · 2 days ago"
                badge="Synced"
              />
            </div>
          </SectionCard>

          <SectionCard title="Next actions">
            <div className="space-y-3">
              <ActionRow
                title="Review probation clause"
                desc="Confirm your standard language for Ontario offer templates."
              />
              <ActionRow
                title="Update employee handbook"
                desc="A recent policy edit should be reflected in the handbook master."
              />
              <ActionRow
                title="Verify Québec compliance"
                desc="One template still needs a province-specific review pass."
              />
            </div>
          </SectionCard>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          <SectionCard title="Compliance by region">
            <div className="space-y-3">
              <RegionRow
                region="Ontario"
                status="compliant"
                note="Latest review passed"
              />
              <RegionRow
                region="Québec"
                status="review"
                note="One template flagged for revision"
              />
              <RegionRow
                region="Federal"
                status="compliant"
                note="No outstanding issues"
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
                  <div className="text-sm font-semibold text-zinc-100">Premium preview state</div>
                  <p className="mt-2 text-sm leading-6 text-zinc-300">
                    Your dashboard now reflects a cleaner SaaS hierarchy: stronger metrics, clearer actions,
                    and more visible trust signals.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-3">
              <button className="gold-button w-full px-4 py-3 text-sm">Generate document</button>
              <button className="ghost-button w-full px-4 py-3 text-sm">Ask advisor</button>
            </div>
          </SectionCard>

          <SectionCard title="Health checks">
            <div className="space-y-3">
              <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Core documents available</div>
                  <div className="text-sm text-zinc-400">Template workspace is active and ready</div>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Advisor accessible</div>
                  <div className="text-sm text-zinc-400">Guidance panel is configured for preview</div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
