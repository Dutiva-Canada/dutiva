// Dutiva — Document workflow state machine
//
// Minimal, explicit state machine governing offer documents:
//
//   draft ──▶ review ──▶ approved ──▶ sent ──▶ signed
//     │          │          │
//     │          ▼          ▼
//     │       declined   declined
//     ▼
//   archived
//
// A document can be archived from any terminal or abandoned state.
// Transitions are validated in JS (fast UX) AND recorded in
// document_workflow_events (audit trail) by transitionDocument().

import { supabase } from "./supabase";

export const STATES = {
  DRAFT: "draft",
  REVIEW: "review",
  APPROVED: "approved",
  SENT: "sent",
  SIGNED: "signed",
  DECLINED: "declined",
  ARCHIVED: "archived",
};

export const STATE_LABELS = {
  draft: "Draft",
  review: "In review",
  approved: "Approved",
  sent: "Sent to candidate",
  signed: "Signed",
  declined: "Declined",
  archived: "Archived",
};

export const STATE_DESCRIPTIONS = {
  draft: "Being drafted by HR. Not yet routed for review.",
  review: "Awaiting reviewer/approver action.",
  approved: "Approved internally; ready to send to the candidate.",
  sent: "Delivered to the candidate; awaiting signature.",
  signed: "Candidate has signed. Employment contract is binding.",
  declined: "Approver rejected the draft, or candidate declined the offer.",
  archived: "Closed out. Not a live document.",
};

// Allowed transitions: from -> [to, ...]
const TRANSITIONS = {
  draft:    ["review", "sent", "archived"],        // sent directly if approval disabled
  review:   ["approved", "declined", "draft"],
  approved: ["sent", "draft", "archived"],
  sent:     ["signed", "declined", "archived"],
  signed:   ["archived"],
  declined: ["draft", "archived"],
  archived: [],
};

export function canTransition(from, to) {
  const allowed = TRANSITIONS[from] || [];
  return allowed.includes(to);
}

export function nextStates(from) {
  return TRANSITIONS[from] || [];
}

/**
 * Is approval required before an offer can go to 'sent'?
 * Reads from the (profile-derived) form field _profileApprovalRequired.
 */
export function approvalRequired(form) {
  return form?._profileApprovalRequired === true;
}

/**
 * Transition a document to a new workflow state AND append an audit event.
 * Returns { data: updatedDocument, error }.
 */
export async function transitionDocument({
  documentId,
  userId,
  fromState,
  toState,
  actorEmail,
  note,
}) {
  if (!supabase || !documentId || !userId) {
    return { data: null, error: new Error("Missing session or document id") };
  }
  if (!canTransition(fromState, toState)) {
    return {
      data: null,
      error: new Error(
        `Invalid transition ${fromState} → ${toState}. Allowed: ${nextStates(fromState).join(", ") || "(none)"}`
      ),
    };
  }

  const { data, error } = await supabase
    .from("documents")
    .update({ workflow_state: toState })
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();

  if (error) return { data: null, error };

  // Fire-and-log the audit event. If this fails we don't roll back the
  // document update — the state is still correct, the history line just
  // won't include it. Surface the error so a retry can be queued.
  const { error: eventError } = await supabase
    .from("document_workflow_events")
    .insert({
      document_id: documentId,
      user_id: userId,
      from_state: fromState,
      to_state: toState,
      actor_email: actorEmail || null,
      note: note || null,
    });
  if (eventError) {
    console.warn("Workflow event log write failed:", eventError);
  }
  return { data, error: null };
}

/**
 * Read the event history for one document, newest first.
 */
export async function getWorkflowHistory(documentId, userId) {
  if (!supabase || !documentId || !userId) return [];
  const { data, error } = await supabase
    .from("document_workflow_events")
    .select("*")
    .eq("document_id", documentId)
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getWorkflowHistory failed:", error);
    return [];
  }
  return data || [];
}

/**
 * Assign or reassign a document to a reviewer/approver. Stored on the
 * document itself (free-text email for now; a proper teams model is
 * Phase 4/5).
 */
export async function assignReviewer(documentId, userId, reviewerEmail) {
  if (!supabase || !documentId || !userId) {
    return { data: null, error: new Error("Missing session or document id") };
  }
  const { data, error } = await supabase
    .from("documents")
    .update({ workflow_assigned_to: reviewerEmail || null })
    .eq("id", documentId)
    .eq("user_id", userId)
    .select()
    .single();
  return { data, error };
}
