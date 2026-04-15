// ApprovalPanel — shows current workflow stage for a saved document and
// allows valid transitions based on the state machine in approvalWorkflow.js.
//
// Only renders when a document has been saved (has documentId) AND the
// employer profile it was created against requires approval. Otherwise
// GeneratorPage skips this panel.

import { useCallback, useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import {
  STAGE_LABELS,
  STAGE_TONE,
  getCurrentWorkflow,
  getWorkflowHistory,
  initializeWorkflow,
  nextAllowedStages,
  transition,
} from "../../lib/generator/approvalWorkflow.js";

const TONE_STYLES = {
  neutral: "border-white/10 bg-white/5",
  info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
};

export default function ApprovalPanel({ documentId, userId, employerProfileId = null, onStageChange }) {
  const [current, setCurrent] = useState(null);
  const [history, setHistory] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [assignee, setAssignee] = useState("");

  const refresh = useCallback(async () => {
    if (!documentId) {
      setCurrent(null);
      setHistory([]);
      return;
    }
    try {
      let c = await getCurrentWorkflow(documentId);
      if (!c && userId) {
        c = await initializeWorkflow({ documentId, ownerId: userId, employerProfileId });
      }
      setCurrent(c);
      const h = await getWorkflowHistory(documentId);
      setHistory(h);
    } catch (e) {
      setError(e.message || "Failed to load workflow.");
    }
  }, [documentId, userId, employerProfileId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const go = async (toStage) => {
    if (!documentId || !userId) return;
    setBusy(true);
    setError("");
    try {
      const row = await transition({
        documentId,
        ownerId: userId,
        toStage,
        assignedToEmail: assignee || null,
        note: note || null,
        employerProfileId,
      });
      setCurrent(row);
      setNote("");
      setAssignee("");
      onStageChange?.(row.stage);
      refresh();
    } catch (e) {
      setError(e.message || "Transition failed.");
    } finally {
      setBusy(false);
    }
  };

  if (!documentId) {
    return (
      <div className="rounded-2xl border p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-2)" }}>
        Save the document to start the approval workflow.
      </div>
    );
  }

  const stage = current?.stage || "draft";
  const tone = TONE_STYLES[STAGE_TONE[stage]] || TONE_STYLES.neutral;
  const allowed = nextAllowedStages(stage);

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Approval workflow</div>
          <div className="text-xs" style={{ color: "var(--text-2)" }}>Current stage and history for this offer.</div>
        </div>
      </div>

      <div className={`mb-3 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${tone}`}>
        {STAGE_LABELS[stage] || stage}
      </div>

      {error && (
        <div className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 p-2 text-xs text-red-300">
          {error}
        </div>
      )}

      {allowed.length > 0 && (
        <div className="mb-3 space-y-2">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
            placeholder="Assign to email (optional)"
            type="email"
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
          />
          <textarea
            className="w-full rounded-xl border px-3 py-2 text-sm"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
            placeholder="Note (optional — e.g., 'needs VP approval on comp')"
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <div className="flex flex-wrap gap-2">
            {allowed.map((s) => (
              <button
                key={s}
                disabled={busy}
                onClick={() => go(s)}
                className="rounded-lg bg-amber-400/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-amber-400 disabled:opacity-50"
              >
                Move to: {STAGE_LABELS[s] || s}
              </button>
            ))}
          </div>
        </div>
      )}

      {history.length > 0 && (
        <div className="mt-4">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-2)" }}>History</div>
          <ol className="space-y-1.5 text-xs" style={{ color: "var(--text-2)" }}>
            {history.map((h) => (
              <li key={h.id} className="flex items-start gap-2 rounded-lg border px-2 py-1.5" style={{ borderColor: "var(--border)" }}>
                <span className="font-mono" style={{ color: "var(--text)" }}>{new Date(h.created_at).toLocaleString()}</span>
                <span>→ <strong>{STAGE_LABELS[h.stage] || h.stage}</strong>{h.assigned_to_email ? ` (assigned to ${h.assigned_to_email})` : ""}</span>
                {h.note && <span className="italic">— {h.note}</span>}
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
