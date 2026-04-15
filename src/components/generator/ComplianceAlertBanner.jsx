// ComplianceAlertBanner — surfaces changelog entries newer than the version
// that stamped the currently-loaded document.

import { getComplianceAlerts, highestSeverity } from "../../lib/complianceAlerts";

const SEVERITY_STYLE = {
  info: { border: "border-sky-500/40", bg: "bg-sky-500/10", fg: "text-sky-300", label: "Info" },
  warn: { border: "border-amber-500/40", bg: "bg-amber-500/10", fg: "text-amber-300", label: "Attention" },
  critical: { border: "border-red-500/40", bg: "bg-red-500/10", fg: "text-red-300", label: "Critical" },
};

export default function ComplianceAlertBanner({ document, form }) {
  if (!document?.id) return null;
  const { stale, savedVersion, currentVersion, entries } = getComplianceAlerts(document, form);
  if (!stale) return null;
  const sev = highestSeverity(entries) || "info";
  const styles = SEVERITY_STYLE[sev];

  return (
    <div className={`rounded-2xl border ${styles.border} ${styles.bg} p-4`}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <div className={`text-sm font-semibold ${styles.fg}`}>Compliance alert · {styles.label}</div>
          <div className="text-xs" style={{ color: "var(--text-2)" }}>
            Saved under jurisdiction data v{savedVersion || "(pre-versioning)"} · current is v{currentVersion}
          </div>
        </div>
      </div>
      {entries.length === 0 ? (
        <div className="text-sm" style={{ color: "var(--text-2)" }}>
          This document predates the current versioning baseline. No specific changelog entries apply — review manually and resave to stamp the current version.
        </div>
      ) : (
        <ul className="space-y-2">
          {entries.map((e) => (
            <li key={e.version + e.summary} className="rounded-xl border border-white/10 p-3">
              <div className="text-xs font-mono" style={{ color: "var(--text-2)" }}>v{e.version}</div>
              <div className="mt-1 text-sm font-medium" style={{ color: "var(--text)" }}>{e.summary}</div>
              <div className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>{e.detail}</div>
              {e.action && (
                <div className="mt-2 text-xs" style={{ color: "var(--text-2)" }}>
                  Recommended action: <span style={{ color: "var(--text)" }}>{e.action.label}</span>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
