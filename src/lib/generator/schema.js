// Dutiva — Declarative intake schema
//
// One question per object. The IntakeWizard renders these in order, honouring
// `visibleIf` for conditional questions. Answers flow back into the same
// GeneratorPage form state used by the preview + guardrails.
//
// Why declarative: keeps legal logic (what to ask, in what order, with what
// help text) separate from React rendering. Makes unit testing and scenario
// composition straightforward.

export const QUESTION_TYPES = {
  TEXT: "text",
  EMAIL: "email",
  MONEY: "money",
  NUMBER: "number",
  DATE: "date",
  SELECT: "select",
  BOOLEAN: "boolean",
  TEXTAREA: "textarea",
};

export const QUESTIONS = [
  // ── Jurisdiction (drives most conditional logic) ─────────────────────────
  {
    id: "jurisdiction",
    group: "basics",
    label: "Which province or jurisdiction governs this role?",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Québec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Federal", label: "Federal (banking / interprovincial transport / telecom)" },
      { value: "Remote (Federal)", label: "Remote (Federal regulation)" },
    ],
    required: true,
    mapsTo: "jurisdiction",
    help: "Determines the Employment Standards Act, statutory probation, vacation, overtime rules, and whether Bill 96 applies.",
  },

  // ── Identity ─────────────────────────────────────────────────────────────
  {
    id: "companyName",
    group: "basics",
    label: "Company legal name",
    type: QUESTION_TYPES.TEXT,
    required: true,
    mapsTo: "companyName",
    help: "Use the exact corporate entity name as registered (e.g., \"Dutiva Canada Inc.\").",
  },
  {
    id: "employeeName",
    group: "basics",
    label: "Employee's full legal name",
    type: QUESTION_TYPES.TEXT,
    required: true,
    mapsTo: "employeeName",
  },
  {
    id: "jobTitle",
    group: "role",
    label: "Position title",
    type: QUESTION_TYPES.TEXT,
    required: true,
    mapsTo: "jobTitle",
    help: "Be specific. Enforceability of non-solicits and non-competes turns on the seniority implied by the title.",
  },
  {
    id: "manager",
    group: "role",
    label: "Reporting manager (name)",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "manager",
  },
  {
    id: "managerTitle",
    group: "role",
    label: "Reporting manager's title",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "managerTitle",
  },
  {
    id: "startDate",
    group: "role",
    label: "Start date",
    type: QUESTION_TYPES.DATE,
    required: true,
    mapsTo: "startDate",
  },
  {
    id: "employmentType",
    group: "role",
    label: "Employment type",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "full-time, permanent", label: "Full-time, permanent" },
      { value: "part-time, permanent", label: "Part-time, permanent" },
      { value: "full-time, fixed-term", label: "Full-time, fixed-term" },
      { value: "part-time, fixed-term", label: "Part-time, fixed-term" },
    ],
    default: "full-time, permanent",
    mapsTo: "employmentType",
  },

  // ── Work mode + location ─────────────────────────────────────────────────
  {
    id: "workMode",
    group: "location",
    label: "Work mode",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "onsite", label: "On-site only" },
      { value: "hybrid", label: "Hybrid" },
      { value: "remote", label: "Fully remote" },
    ],
    default: "onsite",
    mapsTo: "workMode",
    help: "Remote/hybrid requires location, equipment, and expense terms — enforced by a guardrail.",
  },
  {
    id: "workLocation",
    group: "location",
    label: "Primary work location (address or city)",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "workLocation",
    visibleIf: () => true,
  },
  {
    id: "isRemote",
    // Hidden — derived from workMode. Kept for guardrail compatibility.
    group: "location",
    label: "(derived) isRemote",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "isRemote",
    visibleIf: () => false,
    deriveFrom: (answers) =>
      answers.workMode === "remote" || answers.workMode === "hybrid",
  },

  // ── Compensation ─────────────────────────────────────────────────────────
  {
    id: "salary",
    group: "compensation",
    label: "Annual base salary",
    type: QUESTION_TYPES.MONEY,
    required: true,
    mapsTo: "salary",
    help: "Enter as \"$85,000\" or similar. Pay transparency rules apply in BC (Nov 2023) and Ontario (Jan 2026).",
  },
  {
    id: "payFrequency",
    group: "compensation",
    label: "Pay frequency",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "bi-weekly", label: "Bi-weekly" },
      { value: "semi-monthly", label: "Semi-monthly (15th / last)" },
      { value: "monthly", label: "Monthly" },
      { value: "weekly", label: "Weekly" },
    ],
    default: "bi-weekly",
    mapsTo: "payFrequency",
  },
  {
    id: "hasVariableComp",
    group: "compensation",
    label: "Is there variable compensation (bonus, commission, or equity)?",
    type: QUESTION_TYPES.BOOLEAN,
    default: false,
    mapsTo: "hasVariableComp",
  },
  {
    id: "variableCompDescription",
    group: "compensation",
    label: "Describe the variable compensation plan",
    type: QUESTION_TYPES.TEXTAREA,
    mapsTo: "variableCompDescription",
    visibleIf: (a) => a.hasVariableComp === true,
    help: "Post-Matthews (2020 SCC 26): \"actively employed\" language is not enough. Tie awards to a fair, identifiable process.",
  },

  // ── Probation ────────────────────────────────────────────────────────────
  {
    id: "probationLength",
    group: "probation",
    label: "Probation length",
    type: QUESTION_TYPES.TEXT,
    default: "three (3) months",
    mapsTo: "probationLength",
    help: "Avoid \"at any time\" or \"sole discretion\" — struck down in Chan v. NYX Capital (2025).",
  },

  // ── Restrictive covenants ────────────────────────────────────────────────
  {
    id: "includeNonCompete",
    group: "covenants",
    label: "Include a non-compete clause?",
    type: QUESTION_TYPES.BOOLEAN,
    default: false,
    mapsTo: "includeNonCompete",
    help: "Ontario bans non-competes for non-executives (ESA s. 67.2). We will block if the role doesn't look executive.",
  },
  {
    id: "includeNonSolicit",
    group: "covenants",
    label: "Include a non-solicitation clause (clients/employees)?",
    type: QUESTION_TYPES.BOOLEAN,
    default: true,
    mapsTo: "includeNonSolicit",
    help: "Replaces the now-banned Ontario non-compete for non-executives. Must be time- and scope-limited.",
  },
  {
    id: "includeIPAssignment",
    group: "covenants",
    label: "Include IP assignment (work product belongs to the Company)?",
    type: QUESTION_TYPES.BOOLEAN,
    default: true,
    mapsTo: "includeIPAssignment",
  },

  // ── Organization context (drives Ontario right-to-disconnect, Quebec VRSP)
  {
    id: "employeeCount",
    group: "organization",
    label: "How many employees does your organization have (Canada-wide)?",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "1-4", label: "1–4" },
      { value: "5-24", label: "5–24" },
      { value: "25-49", label: "25–49" },
      { value: "50+", label: "50+" },
    ],
    default: "1-4",
    mapsTo: "employeeCount",
    help: "Ontario right-to-disconnect applies at 25+. Quebec VRSP registration required at 5+.",
  },

  // ── Combined-document preference (per-employer in Phase 3) ───────────────
  {
    id: "singleDocumentMode",
    group: "delivery",
    label: "Deliver offer + employment agreement as a single combined document?",
    type: QUESTION_TYPES.BOOLEAN,
    default: true,
    mapsTo: "singleDocumentMode",
    help: "Single-document mode prevents the Adams v. Thinkific two-step trap. In Phase 3 this becomes a per-employer profile setting.",
  },

  // ── Language (Quebec-critical) ───────────────────────────────────────────
  {
    id: "language",
    group: "delivery",
    label: "Language preference",
    type: QUESTION_TYPES.SELECT,
    options: [
      { value: "EN", label: "English" },
      { value: "FR", label: "French" },
      { value: "BOTH", label: "Bilingual (French-first for Quebec)" },
    ],
    mapsTo: "language",
    deriveFrom: (a) => (a.jurisdiction === "Quebec" ? "BOTH" : "EN"),
    help: "Quebec offers must be in French or bilingual with French presented first (Bill 96 / Charter of the French Language, s. 41).",
  },

  // ── Contact + delivery ───────────────────────────────────────────────────
  {
    id: "hrContactName",
    group: "delivery",
    label: "HR / hiring contact name",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "hrContactName",
  },
  {
    id: "hrContactEmail",
    group: "delivery",
    label: "HR / hiring contact email",
    type: QUESTION_TYPES.EMAIL,
    mapsTo: "hrContactEmail",
  },
  {
    id: "offerExpiryDate",
    group: "delivery",
    label: "Offer expires on",
    type: QUESTION_TYPES.DATE,
    mapsTo: "offerExpiryDate",
  },
];

export const QUESTION_GROUPS = [
  { id: "basics", label: "Basics" },
  { id: "role", label: "Role & start date" },
  { id: "location", label: "Work location" },
  { id: "compensation", label: "Compensation" },
  { id: "probation", label: "Probation" },
  { id: "covenants", label: "Restrictive covenants" },
  { id: "organization", label: "Organization" },
  { id: "delivery", label: "Delivery" },
];

/**
 * Resolve the ordered list of questions visible given current answers.
 * Derived-only questions (visibleIf -> false) are filtered; their deriveFrom
 * values are still written into the answer map via applyDerived().
 */
export function getVisibleQuestions(answers, flowIds = null) {
  const source = flowIds
    ? flowIds
        .map((id) => QUESTIONS.find((q) => q.id === id))
        .filter(Boolean)
    : QUESTIONS;
  return source.filter((q) => {
    if (!q.visibleIf) return true;
    try {
      return q.visibleIf(answers) === true;
    } catch {
      return true;
    }
  });
}

/**
 * Apply any `deriveFrom` fields so that derived values flow into answers
 * before guardrails / render use them.
 */
export function applyDerived(answers) {
  const out = { ...answers };
  for (const q of QUESTIONS) {
    if (typeof q.deriveFrom !== "function") continue;
    try {
      out[q.mapsTo || q.id] = q.deriveFrom(out);
    } catch {
      // skip
    }
  }
  return out;
}

/** Flatten answers into the form shape GeneratorPage + renderTemplate expect. */
export function answersToForm(answers) {
  const enriched = applyDerived(answers);
  const form = {};
  for (const q of QUESTIONS) {
    const key = q.mapsTo || q.id;
    if (enriched[key] !== undefined) form[key] = enriched[key];
  }
  // Pass through any fields set directly on answers (e.g., by scenarios) that
  // don't have a question definition yet.
  for (const [k, v] of Object.entries(enriched)) {
    if (!(k in form)) form[k] = v;
  }
  return form;
}
