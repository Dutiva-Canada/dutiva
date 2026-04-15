// Dutiva — Employer profiles client module
//
// Supabase-backed CRUD for per-employer defaults. A profile holds the fields
// we want to pre-fill when starting a new offer — legal name, jurisdiction,
// probation length, language posture, combined-document preference, approval
// toggle — so repeat hires are 80% pre-filled and the HR user doesn't re-
// enter the same company data every time.

import { supabase } from "./supabase";

const TABLE = "employer_profiles";

export const EMPTY_PROFILE = {
  legal_name: "",
  display_name: "",
  default_jurisdiction: "Ontario",
  default_benefits_plan_name: "group",
  default_benefits_start: "the first of the month following your start date",
  default_probation_length: "three (3) months",
  default_vacation_weeks: 2,
  default_employee_notice: "two (2) weeks",
  default_employer_notice: "the minimum notice required by the applicable employment standards legislation",
  default_pay_frequency: "bi-weekly",
  default_scheduled_hours: 40,
  default_language: "EN",
  covenant_stance: "non-solicit-only",
  combined_document: true,
  approval_required: false,
  default_approver_email: "",
  hr_contact_name: "",
  hr_contact_email: "",
  signer_name: "",
  signer_title: "",
  employee_count: "5-24",
};

export async function listEmployerProfiles(userId) {
  if (!supabase || !userId) return [];
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("listEmployerProfiles failed:", error);
    return [];
  }
  return data || [];
}

export async function getEmployerProfile(id, userId) {
  if (!supabase || !id || !userId) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .eq("user_id", userId)
    .maybeSingle();
  if (error) {
    console.error("getEmployerProfile failed:", error);
    return null;
  }
  return data;
}

export async function createEmployerProfile(profile, userId) {
  if (!supabase || !userId) return { data: null, error: new Error("No session") };
  const payload = { ...EMPTY_PROFILE, ...profile, user_id: userId };
  const { data, error } = await supabase
    .from(TABLE)
    .insert(payload)
    .select()
    .single();
  return { data, error };
}

export async function updateEmployerProfile(id, patch, userId) {
  if (!supabase || !userId || !id) return { data: null, error: new Error("Missing id/session") };
  // Strip server-managed + identity fields
  const { id: _ignored, user_id: _ignored2, created_at: _ignored3, updated_at: _ignored4, ...safe } = patch;
  const { data, error } = await supabase
    .from(TABLE)
    .update(safe)
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
  return { data, error };
}

export async function deleteEmployerProfile(id, userId) {
  if (!supabase || !userId || !id) return { error: new Error("Missing id/session") };
  const { error } = await supabase
    .from(TABLE)
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
  return { error };
}

/**
 * Apply an employer profile's defaults to a form state object.
 * Only fills in blank fields — never overwrites what the user already set.
 */
export function applyProfileDefaults(form, profile) {
  if (!profile) return form;
  const next = { ...form };
  const set = (key, value) => {
    if (value === undefined || value === null || value === "") return;
    if (next[key] === undefined || next[key] === null || next[key] === "") {
      next[key] = value;
    }
  };
  set("companyName", profile.legal_name);
  set("jurisdiction", profile.default_jurisdiction);
  set("benefitsPlanName", profile.default_benefits_plan_name);
  set("benefitsStartDate", profile.default_benefits_start);
  set("probationLength", profile.default_probation_length);
  set("vacationWeeks", profile.default_vacation_weeks);
  set("employeeNoticePeriod", profile.default_employee_notice);
  set("employerWithoutCauseNotice", profile.default_employer_notice);
  set("payFrequency", profile.default_pay_frequency);
  set("scheduledHours", profile.default_scheduled_hours);
  set("language", profile.default_language);
  set("employeeCount", profile.employee_count);
  set("hrContactName", profile.hr_contact_name);
  set("hrContactEmail", profile.hr_contact_email);
  set("signerName", profile.signer_name);
  set("signerTitle", profile.signer_title);
  // Combined-doc setting → inverse drives the two-step guardrail
  if (profile.combined_document !== undefined && next.splitOfferAndAgreement === undefined) {
    next.splitOfferAndAgreement = !profile.combined_document;
  }
  // Covenant stance → influences includeNonCompete / includeNonSolicit defaults
  if (profile.covenant_stance === "non-solicit-only") {
    if (next.includeNonCompete === undefined) next.includeNonCompete = false;
    if (next.includeNonSolicit === undefined) next.includeNonSolicit = true;
  } else if (profile.covenant_stance === "non-compete-execs") {
    if (next.includeNonSolicit === undefined) next.includeNonSolicit = true;
  } else if (profile.covenant_stance === "none") {
    if (next.includeNonCompete === undefined) next.includeNonCompete = false;
    if (next.includeNonSolicit === undefined) next.includeNonSolicit = false;
  }
  // Approval required → attaches to the document when saved
  if (profile.approval_required !== undefined) {
    next._profileApprovalRequired = profile.approval_required;
  }
  return next;
}
