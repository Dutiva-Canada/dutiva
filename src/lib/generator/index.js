// Dutiva — Unified template render API
// This is the single entry point the UI uses to generate document content.
// Routes a UI-friendly template name + form to the correct template module,
// loads the right jurisdiction data, runs the template function, and renders
// the result.

import JURISDICTIONS from "./jurisdiction_data.js";
import { renderBody } from "./render.js";

import g01 from "./templates/g01_offer_letter.js";
import g02 from "./templates/g02_employment_agreement.js";
import g03 from "./templates/g03_termination_letter.js";
import g04 from "./templates/g04_employee_handbook.js";
import g05 from "./templates/g05_confidentiality_agreement.js";
import g06 from "./templates/g06_written_warning.js";
import g07 from "./templates/g07_independent_contractor.js";
import g08 from "./templates/g08_restrictive_covenants.js";
import g09 from "./templates/g09_quebec_offer_letter.js";
import g10 from "./templates/g10_remote_work_policy.js";
import g11 from "./templates/g11_vacation_leave_policy.js";
import g12 from "./templates/g12_code_of_conduct.js";
import g13 from "./templates/g13_anti_harassment_policy.js";
import g14 from "./templates/g14_resignation_acceptance.js";
import g15 from "./templates/g15_group_termination.js";
import g16 from "./templates/g16_performance_improvement_plan.js";

// UI jurisdiction name -> engine code
export const JURISDICTION_CODE_BY_NAME = {
  Ontario: "ON",
  Quebec: "QC",
  Québec: "QC",
  "British Columbia": "BC",
  Alberta: "AB",
  Federal: "FED",
  "Remote (Federal)": "FED",
};

// UI template name -> module. Quebec auto-routing for Offer Letter is handled
// in resolveTemplate below (not in this map) so that any Offer Letter for a
// Quebec jurisdiction routes to g09 automatically.
const TEMPLATE_BY_NAME = {
  "Offer Letter": g01,
  "Employment Agreement": g02,
  "Termination Letter": g03,
  "Employee Handbook": g04,
  "Confidentiality Agreement": g05,
  "Written Warning": g06,
  "Independent Contractor Agreement": g07,
  "Non-Compete Agreement": g08,
  "Offer Letter (French/Quebec)": g09,
  "Remote Work Policy": g10,
  "Vacation & Leave Policy": g11,
  "Code of Conduct": g12,
  "Anti-Harassment Policy": g13,
  "Resignation Acceptance Letter": g14,
  "Layoff / WARN Notice": g15,
  "Performance Improvement Plan (PIP)": g16,
};

export const SUPPORTED_TEMPLATE_NAMES = Object.keys(TEMPLATE_BY_NAME);

export const SUPPORTED_JURISDICTIONS = [
  "Ontario",
  "Quebec",
  "British Columbia",
  "Alberta",
  "Federal",
];

// Maps the camelCase form field names used by the GeneratorPage UI to the
// snake_case merge-field names used inside the templates. Fields not listed
// fall back to the empty string (the merge field stays visible in the preview
// so the user knows to fill it in).
function formToMergeValues(form) {
  const [firstName = "", ...rest] = String(form.employeeName || "").trim().split(/\s+/);
  const employeeFirst = firstName;
  const employeeLast = rest.join(" ");
  return {
    // Identity
    employer_legal_name: form.companyName || "",
    employee_name: form.employeeName || "",
    employee_first_name: employeeFirst,
    employee_last_name: employeeLast,
    employee_address_line_1: form.employeeAddress1 || "",
    employee_address_line_2: form.employeeAddress2 || "",
    // Role
    position_title: form.jobTitle || "",
    manager_name: form.manager || "",
    manager_title: form.managerTitle || "Manager",
    start_date: form.startDate || "",
    work_location: form.workLocation || form.jurisdiction || "",
    employment_type: form.employmentType || "full-time, permanent",
    scheduled_hours_per_week: form.scheduledHours || "40",
    regular_hours: form.regularHours || "Monday to Friday, 9:00 a.m. to 5:00 p.m.",
    // Comp
    annual_base_salary: form.salary || "",
    pay_frequency: form.payFrequency || "bi-weekly",
    variable_comp_plan_name: form.variableCompPlanName || "the Company's discretionary bonus plan",
    variable_comp_target: form.variableCompTarget || "discretionary",
    variable_comp_description: form.variableCompDescription || "discretionary performance-based incentives",
    // Benefits / time off
    benefits_plan_name: form.benefitsPlanName || "group",
    benefits_start_date: form.benefitsStartDate || "the first of the month following your start date",
    vacation_weeks: form.vacationWeeks || "2",
    // Probation
    probation_length: form.probationLength || "three (3) months",
    // Termination
    employee_notice_period: form.employeeNoticePeriod || "two (2) weeks",
    employer_without_cause_notice: form.employerWithoutCauseNotice || "the minimum notice required by the applicable employment standards legislation",
    // Contact
    hr_contact_name: form.hrContactName || form.manager || "",
    hr_contact_email: form.hrContactEmail || "",
    offer_expiry_date: form.offerExpiryDate || "",
    // Signer
    signer_name: form.signerName || form.manager || "",
    signer_title: form.signerTitle || form.managerTitle || "",
    // Contractor / warning / PIP / other
    contract_rate: form.contractRate || "",
    scope_of_work: form.scopeOfWork || "",
    performance_goals: form.performanceGoals || "",
    review_date: form.reviewDate || "",
    notes: form.notes || "",
  };
}

function resolveTemplate(templateName, jurisdictionCode) {
  // Auto-route: any "Offer Letter" where jurisdiction is Quebec routes to g09
  if (templateName === "Offer Letter" && jurisdictionCode === "QC") {
    return { fn: g09, resolvedName: "Offer Letter (French/Quebec)" };
  }
  const fn = TEMPLATE_BY_NAME[templateName];
  if (!fn) return { fn: null, resolvedName: templateName };
  return { fn, resolvedName: templateName };
}

/**
 * Render a document body from a UI template name + form.
 *
 * @param {string} templateName  UI template name (e.g. "Offer Letter")
 * @param {object} form          Form state from GeneratorPage
 * @param {object} [options]
 * @param {"EN"|"FR"|"BOTH"} [options.language]  Preferred language. Defaults
 *   to "BOTH" for Quebec (Bill 96), otherwise "EN".
 * @returns {{ supported: boolean, content: string, resolvedTemplate: string,
 *            jurisdictionCode: string, language: string }}
 */
export function renderTemplate(templateName, form, options = {}) {
  const jurisdictionCode =
    JURISDICTION_CODE_BY_NAME[form.jurisdiction] || "ON";
  const j = JURISDICTIONS[jurisdictionCode] || JURISDICTIONS.ON;

  const { fn, resolvedName } = resolveTemplate(templateName, jurisdictionCode);
  if (!fn) {
    return {
      supported: false,
      content: "",
      resolvedTemplate: templateName,
      jurisdictionCode,
      language: "EN",
    };
  }

  const tpl = fn(j);
  const values = formToMergeValues(form);

  // Language default: French-first for Quebec (Bill 96 adhesion contract rule
  // — French version must be presented first or alongside English).
  const language =
    options.language || (jurisdictionCode === "QC" ? "BOTH" : "EN");

  let content;
  if (language === "EN") {
    content = renderBody(tpl.bodyEN, values);
  } else if (language === "FR") {
    content = renderBody(tpl.bodyFR || tpl.bodyEN, values);
  } else {
    // BOTH — French first per Bill 96
    const fr = renderBody(tpl.bodyFR || [], values);
    const en = renderBody(tpl.bodyEN || [], values);
    content = fr
      ? `${fr}\n\n═══════════════════════════════════════════════════════════════\n\n${en}`
      : en;
  }

  const titleLine =
    language === "FR"
      ? tpl.titleFR || tpl.titleEN
      : tpl.titleEN;

  const header = `${titleLine}\n${(form.companyName || "").trim()}${form.companyName ? "\n" : ""}`;

  return {
    supported: true,
    content: `${header}\n${content}`.trim(),
    resolvedTemplate: resolvedName,
    jurisdictionCode,
    language,
  };
}

export { JURISDICTIONS };
