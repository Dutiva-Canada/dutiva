// ApprovalPanel — per-document workflow controls.
// Shown in the GeneratorPage preview pane when a saved document is active.
// Lets the user transition workflow state, reassign the reviewer, and read
// the audit trail.

import { useCallback, useEffect, useState } from "react";
import {
  STATE_LABELS,
  STATE_DESCRIPTIONS,
  assignReviewer,
  canTransition,
  getWorkflowHistory,
  nextStates,
  transitionDocument,
} from "../../lib/workflow";

function Badge({ state }) {
  const color = {
    draft: "bg-slate-500/15 text-slate-300 border-slate-500/40",
    review: "bg-amber-500/15 text-amber-300 border-amber-500/40",
    approved: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40",
    sent: "bg-sky-500/15 text-sky-300 border-sky-500/40",
    signed: "bg-emerald-500/25 text-emerald-200 border-emerald-500/50",
    declined: "bg-red-500/15 text-red-300 border-red-500/40",
    archived: "bg-slate-500/15 text-slate-400 border-slate-500/40",
  }[state] || "bg-slate-500/15 text-slate-300 border-slate-500/40";
  return (
    <span className={`rounded-full border px-2 py-0.5 text-xs ${color}`}>
      {STATE_LABELS[state] || state}
    </span>
  );
}

export default function ApprovalPanel({ user, document, approvalRequired, onDocumentChanged }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [history, setHistory] = useState([]);

  const loadHistory = useCallback(async () => {
    if (!user || !document?.id) return;
    const events = await getWorkflowHistory(document.id, user.id);
    setHistory(events);
  }, [user, document?.id]);

  useEffect(() => { loadHistory(); }, [loadHistory]);
  useEffect(() => { setReviewer(document?.workflow_assigned_to || ""); }, [document?.workflow_assigned_to]);

  if (!document?.id) {
    return (
      <div className="rounded-2xl border p-4 text-sm" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text-2)" }}>
        Save this document to enable the approval workflow.
      </div>
    );
  }

  const currentState = document.workflow_state || "draft";
  const allowed = nextStates(currentState);

  // If approval is NOT required, filter 'review' out of the flow — user should
  // go straight from draft to sent.
  const visibleNextStates = allowed.filter((s) => {
    if (!approvalRequired && s === "review") return false;
    return true;
  });

  const onTransition = async (to) => {
    if (!canTransition(currentState, to)) {
      setError(`Can't move from ${currentState} to ${to}.`);
      return;
    }
    setBusy(true);
    setError("");
    const { data, error: tErr } = await transitionDocument({
      documentId: document.id,
      userId: user.id,
      fromState: currentState,
      toState: to,
      actorEmail: user.email || null,
      note: note || null,
    });
    setBusy(false);
    if (tErr) { setError(tErr.message); return; }
    setNote("");
    await loadHistory();
    if (onDocumentChanged && data) onDocumentChanged(data);
  };

  const onAssign = async () => {
    setBusy(true);
    setError("");
    const { data, error: aErr } = await assignReviewer(document.id, user.id, reviewer.trim());
    setBusy(false);
    if (aErr) { setError(aErr.message); return; }
    if (onDocumentChanged && data) onDocumentChanged(data);
  };

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
      <div className="mb-3 flex items-center gap-3">
        <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Approval workflow</div>
        <Badge state={currentState} />
      </div>
      <div className="mb-4 text-sm" style={{ color: "var(--text-2)" }}>
        {STATE_DESCRIPTIONS[currentState]}
      </div>

      {!approvalRequired && currentState === "draft" && (
        <div className="mb-4 rounded-xl border border-sky-500/30 bg-sky-500/10 p-3 text-xs" style={{ color: "var(--text-2)" }}>
          Approval is off for this employer profile. This document will go directly from draft to sent.
        </div>
      )}

      {error && (
        <div className="mb-3 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>
      )}

      {visibleNextStates.length > 0 && (
        <div className="mb-4 space-y-2">
          <div className="text-xs font-medium" style={{ color: "var(--text-2)" }}>Move to:</div>
          <div className="flex flex-wrap gap-2">
            {visibleNextStates.map((s) => (
              <button key={s} disabled={busy} onClick={() => onTransition(s)} className="rounded-xl border px-3 py-1.5 text-sm disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                {STATE_LABELS[s]}
              </button>
            ))}
          </div>
          <textarea
            placeholder="Optional note for the audit log (e.g. \"Reviewed by VP of People, needs 2 more weeks on probation\")"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            className="mt-2 w-full rounded-xl border px-3 py-2 text-sm"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
          />
        </div>
      )}

      {approvalRequired && (
        <div className="mb-4 grid gap-2 md:grid-cols-[1fr_auto]">
          <input
            type="email"
            value={reviewer}
            onChange={(e) => setReviewer(e.target.value)}
            placeholder="reviewer@company.com"
            className="w-full rounded-xl border px-3 py-2 text-sm"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
          />
          <button onClick={onAssign} disabled={busy} className="rounded-xl border px-3 py-2 text-sm disabled:opacity-50" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            Assign reviewer
          </button>
        </div>
      )}

      {history.length > 0 && (
        <div>
          <div className="mb-2 text-xs font-medium" style={{ color: "var(--text-2)" }}>History</div>
          <ul className="space-y-1 text-xs" style={{ color: "var(--text-2)" }}>
            {history.slice(0, 8).map((ev) => (
              <li key={ev.id}>
                <span className="font-mono">{new Date(ev.created_at).toLocaleString()}</span>
                {" · "}
                {ev.from_state ? `${STATE_LABELS[ev.from_state]} → ` : ""}
                <span style={{ color: "var(--text)" }}>{STATE_LABELS[ev.to_state]}</span>
                {ev.actor_email ? ` · ${ev.actor_email}` : ""}
                {ev.note ? ` · "${ev.note}"` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
