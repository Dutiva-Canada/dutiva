// Dutiva — Offer approval state machine
//
// Stages (mirrors the CHECK constraint in supabase/migrations/202604150001):
//   draft → in_review → approved → sent → signed
//                    ↘ rejected (back to draft)
//                    ↘ cancelled (terminal)
//
// All transitions validated client-side; server-side RLS keeps tampering out.
// History is the full audit trail: every transition inserts a new row rather
// than mutating a single state, so we keep provenance and can answer "who
// approved this, and when?"

import { supabase, isSupabaseConfigured } from "../supabase.js";

export const STAGES = [
  "draft",
  "in_review",
  "approved",
  "sent",
  "signed",
  "rejected",
  "cancelled",
];

export const STAGE_LABELS = {
  draft: "Draft",
  in_review: "In review",
  approved: "Approved",
  sent: "Sent to candidate",
  signed: "Signed",
  rejected: "Rejected — back to draft",
  cancelled: "Cancelled",
};

export const STAGE_TONE = {
  draft: "neutral",
  in_review: "info",
  approved: "success",
  sent: "info",
  signed: "success",
  rejected: "warning",
  cancelled: "neutral",
};

const TRANSITIONS = {
  draft: new Set(["in_review", "cancelled"]),
  in_review: new Set(["approved", "rejected", "cancelled"]),
  approved: new Set(["sent", "cancelled", "draft"]),
  sent: new Set(["signed", "cancelled"]),
  signed: new Set([]),
  rejected: new Set(["draft", "cancelled"]),
  cancelled: new Set([]),
};

export function canTransition(from, to) {
  if (!TRANSITIONS[from]) return false;
  return TRANSITIONS[from].has(to);
}

export function nextAllowedStages(current) {
  if (!TRANSITIONS[current]) return [];
  return Array.from(TRANSITIONS[current]);
}

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Approval workflow is not available.",
    );
  }
}

/**
 * Return the most recent workflow row for a document, or null if none exists.
 */
export async function getCurrentWorkflow(documentId) {
  requireSupabase();
  if (!documentId) return null;
  const { data, error } = await supabase
    .from("offer_workflow_states")
    .select("*")
    .eq("document_id", documentId)
    .order("created_at", { ascending: false })
    .limit(1);
  if (error) throw error;
  return data?.[0] || null;
}

/**
 * Return the full stage history for a document, oldest first.
 */
export async function getWorkflowHistory(documentId) {
  requireSupabase();
  if (!documentId) return [];
  const { data, error } = await supabase
    .from("offer_workflow_states")
    .select("*")
    .eq("document_id", documentId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data || [];
}

/**
 * Initialize a document as draft. Safe to call multiple times (skips if an
 * entry already exists).
 */
export async function initializeWorkflow({
  documentId,
  ownerId,
  employerProfileId = null,
  note = null,
}) {
  requireSupabase();
  if (!documentId || !ownerId) {
    throw new Error("documentId and ownerId are required");
  }
  const existing = await getCurrentWorkflow(documentId);
  if (existing) return existing;
  const { data, error } = await supabase
    .from("offer_workflow_states")
    .insert({
      document_id: documentId,
      owner_id: ownerId,
      employer_profile_id: employerProfileId,
      stage: "draft",
      note,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Transition a document to a new stage. Validates the transition is legal
 * before writing. Returns the new workflow row.
 */
export async function transition({
  documentId,
  ownerId,
  toStage,
  assignedToEmail = null,
  note = null,
  employerProfileId = null,
}) {
  requireSupabase();
  const current = await getCurrentWorkflow(documentId);
  const fromStage = current?.stage || "draft";
  if (!canTransition(fromStage, toStage)) {
    throw new Error(
      `Cannot transition from "${fromStage}" to "${toStage}".`,
    );
  }
  const { data, error } = await supabase
    .from("offer_workflow_states")
    .insert({
      document_id: documentId,
      owner_id: ownerId,
      employer_profile_id: employerProfileId || current?.employer_profile_id || null,
      stage: toStage,
      assigned_to_email: assignedToEmail,
      note,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
}

/**
 * Convenience: given an employer profile, decide whether a newly saved
 * document should land in 'draft' (approval required) or skip the workflow
 * entirely (approval_required = false). Returns the initial stage or null
 * if no workflow is needed.
 */
export function initialStageForProfile(profile) {
  if (!profile) return null;
  return profile.approval_required ? "draft" : null;
}
