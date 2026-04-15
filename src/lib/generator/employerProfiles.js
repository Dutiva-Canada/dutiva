// Dutiva — Employer profile persistence
//
// Thin CRUD wrapper around the employer_profiles Supabase table. All reads
// and writes are scoped to the authenticated user's owner_id via RLS.
//
// Profile semantics (Phase 3 decisions):
//   - combined_offer_default is the per-employer setting for the single-document
//     approach (report feature #3, Adams v. Thinkific). Defaults TRUE.
//   - approval_required flips the workflow from direct-save to draft→review→send.
//   - default_language=BOTH auto-bundles French + English for Quebec hires.
//   - covenant_stance: 'none' disables restrictive covenant clauses entirely;
//     'standard' uses the g08 baseline; 'strict' enables the full suite
//     (non-solicit + confidentiality + IP) but *not* Ontario non-competes,
//     which the Phase 1 guardrail blocks for non-execs regardless of stance.

import { supabase, isSupabaseConfigured } from "../supabase.js";

function requireSupabase() {
  if (!isSupabaseConfigured || !supabase) {
    throw new Error(
      "Supabase is not configured. Employer profiles are not available.",
    );
  }
}

export async function listEmployerProfiles(ownerId) {
  requireSupabase();
  if (!ownerId) return [];
  const { data, error } = await supabase
    .from("employer_profiles")
    .select("*")
    .eq("owner_id", ownerId)
    .order("legal_name", { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function getEmployerProfile(id) {
  requireSupabase();
  const { data, error } = await supabase
    .from("employer_profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}

export async function createEmployerProfile(ownerId, profile) {
  requireSupabase();
  if (!ownerId) throw new Error("ownerId is required");
  if (!profile?.legal_name) throw new Error("legal_name is required");
  const payload = {
    owner_id: ownerId,
    legal_name: profile.legal_name,
    trade_name: profile.trade_name || null,
    default_jurisdiction: profile.default_jurisdiction || "Ontario",
    default_language: profile.default_language || "EN",
    combined_offer_default: profile.combined_offer_default ?? true,
    default_probation_length: profile.default_probation_length || "three (3) months",
    default_vacation_weeks: profile.default_vacation_weeks ?? 2,
    default_benefits_plan_name: profile.default_benefits_plan_name || null,
    default_pay_frequency: profile.default_pay_frequency || "bi-weekly",
    covenant_stance: profile.covenant_stance || "standard",
    employee_count_tier: profile.employee_count_tier || "1-4",
    approval_required: profile.approval_required ?? false,
    approval_notes: profile.approval_notes || null,
    default_hr_contact_name: profile.default_hr_contact_name || null,
    default_hr_contact_email: profile.default_hr_contact_email || null,
  };
  const { data, error } = await supabase
    .from("employer_profiles")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateEmployerProfile(id, updates) {
  requireSupabase();
  const { data, error } = await supabase
    .from("employer_profiles")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEmployerProfile(id) {
  requireSupabase();
  const { error } = await supabase
    .from("employer_profiles")
    .delete()
    .eq("id", id);
  if (error) throw error;
  return true;
}

/**
 * Project an employer profile record into the default values the intake
 * wizard / GeneratorPage form expects. Null/missing fields are omitted so
 * explicit user answers in the wizard always win.
 */
export function profileToFormDefaults(profile) {
  if (!profile) return {};
  const out = {
    companyName: profile.legal_name,
    jurisdiction: profile.default_jurisdiction,
    probationLength: profile.default_probation_length,
    payFrequency: profile.default_pay_frequency,
    combinedOffer: profile.combined_offer_default,
    employeeCount: profile.employee_count_tier,
  };
  if (profile.default_vacation_weeks != null) {
    out.vacationWeeks = String(profile.default_vacation_weeks);
  }
  if (profile.default_benefits_plan_name) {
    out.benefitsPlanName = profile.default_benefits_plan_name;
  }
  if (profile.default_hr_contact_name) {
    out.hrContactName = profile.default_hr_contact_name;
  }
  if (profile.default_hr_contact_email) {
    out.hrContactEmail = profile.default_hr_contact_email;
  }
  // Covenants
  if (profile.covenant_stance === "none") {
    out.includeNonCompete = false;
    out.includeNonSolicit = false;
  } else if (profile.covenant_stance === "strict") {
    out.includeNonSolicit = true;
    out.ipAssignment = true;
  }
  // Language
  if (profile.default_language === "BOTH") {
    out.language = "BOTH";
  } else if (profile.default_language === "FR") {
    out.language = "FR";
  }
  return out;
}

/**
 * Lightweight validation used by the profile UI before saving.
 */
export function validateProfile(profile) {
  const errors = {};
  if (!profile.legal_name || profile.legal_name.trim().length < 2) {
    errors.legal_name = "Legal name is required.";
  }
  if (
    profile.default_hr_contact_email &&
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.default_hr_contact_email)
  ) {
    errors.default_hr_contact_email = "Email format is invalid.";
  }
  if (
    profile.default_vacation_weeks != null &&
    (Number.isNaN(Number(profile.default_vacation_weeks)) ||
      Number(profile.default_vacation_weeks) < 0 ||
      Number(profile.default_vacation_weeks) > 52)
  ) {
    errors.default_vacation_weeks = "Vacation weeks must be between 0 and 52.";
  }
  return { valid: Object.keys(errors).length === 0, errors };
}
