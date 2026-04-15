// Dutiva — Compliance Alert Panel
// Shows statutory changes that affect a loaded document, with severity,
// citation, and a Regenerate action.

import { AlertTriangle, ShieldCheck, Clock, RotateCcw } from "lucide-react";

const SEVERITY_STYLES = {
  critical: {
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    text: "text-red-300",
    label: "Critical",
  },
  high: {
    border: "border-orange-500/50",
    bg: "bg-orange-500/10",
    text: "text-orange-300",
    label: "High",
  },
  medium: {
    border: "border-amber-500/50",
    bg: "bg-amber-500/10",
    text: "text-amber-300",
    label: "Medium",
  },
  low: {
    border: "border-sky-500/40",
    bg: "bg-sky-500/10",
    text: "text-sky-300",
    label: "Low",
  },
};

function iconForSource(source) {
  if (source === "statutory_change") return AlertTriangle;
  if (source === "data_version") return RotateCcw;
  if (source === "age") return Clock;
  return ShieldCheck;
}

export default function ComplianceAlertPanel({
  evaluation,
  onRegenerate,
  className = "",
}) {
  if (!evaluation || !evaluation.isOutdated) {
    return (
      <div
        className={`rounded-2xl border p-4 ${className}`}
        style={{
          background: "var(--bg-elevated)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-400" />
          <div>
            <div className="text-sm font-semibold" style={{ color: "var(--text)" }}>
              Up to date
            </div>
            <div className="text-xs" style={{ color: "var(--text-2)" }}>
              Generated against jurisdiction_data v{evaluation?.currentVersion || "—"}.
            </div>
          </div>
        </div>
      </div>
    );
  }

  const headline = SEVERITY_STYLES[evaluation.severity] || SEVERITY_STYLES.medium;

  return (
    <div className={`rounded-2xl border p-4 space-y-3 ${headline.border} ${headline.bg} ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className={`text-sm font-semibold ${headline.text}`}>
            {evaluation.alerts.length} compliance alert
            {evaluation.alerts.length === 1 ? "" : "s"} · {headline.label}
          </div>
          <div className="text-xs mt-1" style={{ color: "var(--text-2)" }}>
            Document generated {evaluation.ageDays} days ago on
            jurisdiction_data v{evaluation.documentVersion}; current is v
            {evaluation.currentVersion}.
          </div>
        </div>
        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold hover:bg-white/5"
            style={{ borderColor: "var(--border)", color: "var(--text)" }}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Regenerate with current law
          </button>
        )}
      </div>

      <div className="space-y-2">
        {evaluation.alerts.map((a) => {
          const s = SEVERITY_STYLES[a.severity] || SEVERITY_STYLES.medium;
          const Icon = iconForSource(a.source);
          return (
            <div
              key={a.id}
              className={`rounded-xl border p-3 ${s.border}`}
              style={{ background: "var(--bg)", borderColor: "var(--border)" }}
            >
              <div className="flex items-start gap-2">
                <Icon className={`h-4 w-4 mt-0.5 ${s.text}`} />
                <div className="flex-1">
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "var(--text)" }}
                  >
                    {a.title}
                  </div>
                  <div
                    className="text-xs mt-1 leading-5"
                    style={{ color: "var(--text-2)" }}
                  >
                    {a.summary}
                  </div>
                  <div
                    className="text-[11px] mt-2 font-mono"
                    style={{ color: "var(--text-2)" }}
                  >
                    {a.citation}
                    {a.effectiveDate ? ` · effective ${a.effectiveDate}` : ""}
                  </div>
                  {a.action && (
                    <div
                      className="text-xs mt-2 italic"
                      style={{ color: "var(--text)" }}
                    >
                      → {a.action}
                    </div>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${s.text}`}
                  style={{ background: "var(--bg-elevated)" }}
                >
                  {s.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
