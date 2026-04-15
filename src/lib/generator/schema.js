// Dutiva — Declarative question schema for the intake wizard.
//
// Each question knows: what to ask, how to render, which form field to write,
// and (optionally) a visibility predicate based on prior answers. The wizard
// walks an ordered id list, skipping any whose `visibleIf` returns false at
// the moment the question is reached.
//
// To add a question: append to QUESTIONS with a unique id. Map it to a form
// field via `mapsTo` — that field becomes available in render + guardrails.

export const QUESTION_TYPES = {
  TEXT: "text",
  TEXTAREA: "textarea",
  NUMBER: "number",
  MONEY: "money",
  DATE: "date",
  SELECT: "select",
  BOOLEAN: "boolean",
  EMAIL: "email",
};

export const QUESTIONS = [
  // ──────────────────────── JURISDICTION + COMPANY ────────────────────────
  {
    id: "jurisdiction",
    section: "Jurisdiction",
    label: "Which province or regulatory regime governs this role?",
    help: "Drives termination clauses, probation windows, overtime thresholds, and language requirements.",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "jurisdiction",
    required: true,
    options: [
      { value: "Ontario", label: "Ontario" },
      { value: "Quebec", label: "Québec" },
      { value: "British Columbia", label: "British Columbia" },
      { value: "Alberta", label: "Alberta" },
      { value: "Federal", label: "Federal (Canada Labour Code)" },
    ],
  },
  {
    id: "companyName",
    section: "Company",
    label: "Company legal name",
    help: "Use the exact entity name on your incorporation — this is the signing party.",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "companyName",
    required: true,
  },

  // ──────────────────────── EMPLOYEE + ROLE ────────────────────────
  {
    id: "employeeName",
    section: "Candidate",
    label: "Candidate's full legal name",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "employeeName",
    required: true,
  },
  {
    id: "jobTitle",
    section: "Role",
    label: "Position title",
    help: "Be specific — title drives non-compete enforceability and bonus/variable-comp framing.",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "jobTitle",
    required: true,
  },
  {
    id: "manager",
    section: "Role",
    label: "Reporting manager name",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "manager",
  },
  {
    id: "managerTitle",
    section: "Role",
    label: "Reporting manager title",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "managerTitle",
  },
  {
    id: "startDate",
    section: "Role",
    label: "Start date",
    type: QUESTION_TYPES.DATE,
    mapsTo: "startDate",
    required: true,
  },
  {
    id: "employmentType",
    section: "Role",
    label: "Employment type",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "employmentType",
    required: true,
    options: [
      { value: "full-time, permanent", label: "Full-time, permanent" },
      { value: "part-time, permanent", label: "Part-time, permanent" },
      { value: "full-time, fixed-term", label: "Full-time, fixed-term" },
      { value: "part-time, fixed-term", label: "Part-time, fixed-term" },
      { value: "casual", label: "Casual" },
    ],
  },

  // ──────────────────────── WORK LOCATION ────────────────────────
  {
    id: "workMode",
    section: "Work arrangement",
    label: "How will they work?",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "workMode",
    required: true,
    options: [
      { value: "onsite", label: "On-site only" },
      { value: "hybrid", label: "Hybrid" },
      { value: "remote", label: "Fully remote" },
    ],
  },
  {
    id: "workLocation",
    section: "Work arrangement",
    label: "Primary work location (city, or 'remote — [home province]')",
    help: "Missing location is a constructive dismissal trigger on later relocation.",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "workLocation",
    required: true,
  },
  {
    id: "isRemote",
    section: "Work arrangement",
    label: "Does this role involve remote work at all?",
    help: "Derived from workMode. Feeds the remote-terms guardrail.",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "isRemote",
    hidden: true,
    derive: (a) => a.workMode === "remote" || a.workMode === "hybrid",
  },
  {
    id: "remoteEquipmentPolicy",
    section: "Work arrangement",
    label: "Who provides equipment and expense reimbursement?",
    help: "Required for remote/hybrid roles to avoid the remote-terms warning.",
    type: QUESTION_TYPES.TEXTAREA,
    mapsTo: "remoteEquipmentPolicy",
    visibleIf: (a) => a.workMode === "remote" || a.workMode === "hybrid",
  },

  // ──────────────────────── COMPENSATION ────────────────────────
  {
    id: "salary",
    section: "Compensation",
    label: "Annual base salary",
    help: "Include currency symbol (e.g., $95,000).",
    type: QUESTION_TYPES.MONEY,
    mapsTo: "salary",
    required: true,
  },
  {
    id: "payFrequency",
    section: "Compensation",
    label: "Pay frequency",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "payFrequency",
    options: [
      { value: "bi-weekly", label: "Bi-weekly" },
      { value: "semi-monthly", label: "Semi-monthly" },
      { value: "monthly", label: "Monthly" },
      { value: "weekly", label: "Weekly" },
    ],
  },
  {
    id: "hasVariableComp",
    section: "Compensation",
    label: "Is there bonus, commission, or equity?",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "hasVariableComp",
  },
  {
    id: "variableCompDescription",
    section: "Compensation",
    label: "Describe the variable comp plan",
    help: "Matthews v. Ocean Nutrition: don't rely on 'actively employed' alone — describe the fair, identifiable process that governs eligibility during notice.",
    type: QUESTION_TYPES.TEXTAREA,
    mapsTo: "variableCompDescription",
    visibleIf: (a) => a.hasVariableComp === true,
  },

  // ──────────────────────── TIME OFF + PROBATION ────────────────────────
  {
    id: "vacationWeeks",
    section: "Time off",
    label: "Paid vacation (weeks per year)",
    type: QUESTION_TYPES.NUMBER,
    mapsTo: "vacationWeeks",
  },
  {
    id: "probationLength",
    section: "Probation",
    label: "Probation length (e.g., '3 months')",
    help: "Longer than statutory window is flagged. Vague language ('at any time / sole discretion') is flagged.",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "probationLength",
  },

  // ──────────────────────── RESTRICTIVE COVENANTS ────────────────────────
  {
    id: "includeNonCompete",
    section: "Restrictive covenants",
    label: "Include a non-compete clause?",
    help: "Ontario bans non-competes for non-executives (Working for Workers Act). Blocked if the title doesn't qualify.",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "includeNonCompete",
  },
  {
    id: "includeNonSolicit",
    section: "Restrictive covenants",
    label: "Include a non-solicitation clause?",
    help: "Scoped non-solicit is the enforceable alternative to non-compete in Ontario post-Bill 27.",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "includeNonSolicit",
  },
  {
    id: "handlesConfidentialInfo",
    section: "Restrictive covenants",
    label: "Will this role have access to confidential info or IP?",
    help: "Drives inclusion of NDA + IP assignment language.",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "handlesConfidentialInfo",
  },

  // ──────────────────────── EMPLOYER SIZE ────────────────────────
  {
    id: "employeeCount",
    section: "Employer context",
    label: "Approximately how many employees does your company have in total?",
    help: "Triggers Ontario right-to-disconnect (25+), Quebec VRSP (5+ without retirement plan), Ontario statutory severance (50+ with $2.5M+ payroll).",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "employeeCount",
    options: [
      { value: "1-4", label: "1–4" },
      { value: "5-24", label: "5–24" },
      { value: "25-49", label: "25–49" },
      { value: "50+", label: "50+" },
    ],
  },

  // ──────────────────────── ADMIN ────────────────────────
  {
    id: "hrContactName",
    section: "Admin",
    label: "HR / hiring contact name",
    type: QUESTION_TYPES.TEXT,
    mapsTo: "hrContactName",
  },
  {
    id: "hrContactEmail",
    section: "Admin",
    label: "HR / hiring contact email",
    type: QUESTION_TYPES.EMAIL,
    mapsTo: "hrContactEmail",
  },
  {
    id: "offerExpiryDate",
    section: "Admin",
    label: "Offer expires on",
    type: QUESTION_TYPES.DATE,
    mapsTo: "offerExpiryDate",
  },
  {
    id: "splitOfferAndAgreement",
    section: "Admin",
    label: "Send the offer letter first, employment agreement separately?",
    help: "NOT recommended — see Adams v. Thinkific. The single-document pattern is safer. Leave OFF unless you know why.",
    type: QUESTION_TYPES.BOOLEAN,
    mapsTo: "splitOfferAndAgreement",
    defaultValue: false,
  },

  // ──────────────────────── LANGUAGE (QC) ────────────────────────
  {
    id: "language",
    section: "Language",
    label: "Generated document language",
    help: "Quebec requires French-first under Bill 96 unless the employee has signed a language-designation waiver.",
    type: QUESTION_TYPES.SELECT,
    mapsTo: "language",
    options: [
      { value: "BOTH", label: "Both (French first, English courtesy)" },
      { value: "FR", label: "French only" },
      { value: "EN", label: "English only" },
    ],
    visibleIf: (a) => a.jurisdiction === "Quebec",
  },
];

const BY_ID = Object.fromEntries(QUESTIONS.map((q) => [q.id, q]));

export function getQuestion(id) {
  return BY_ID[id];
}

export function resolveVisibleQuestions(orderedIds, answers) {
  return orderedIds
    .map((id) => BY_ID[id])
    .filter((q) => q && !q.hidden)
    .filter((q) => !q.visibleIf || q.visibleIf(answers));
}

export function applyDerivations(answers) {
  const next = { ...answers };
  for (const q of QUESTIONS) {
    if (q.derive) next[q.mapsTo] = q.derive(next);
  }
  return next;
}

export function answersToFormFields(answers) {
  const withDerived = applyDerivations(answers);
  const out = {};
  for (const q of QUESTIONS) {
    if (q.mapsTo && withDerived[q.id] !== undefined) {
      out[q.mapsTo] = withDerived[q.id];
    }
  }
  // Also pass through any mapsTo-keyed fields set by derivations
  for (const q of QUESTIONS) {
    if (q.mapsTo && withDerived[q.mapsTo] !== undefined && out[q.mapsTo] === undefined) {
      out[q.mapsTo] = withDerived[q.mapsTo];
    }
  }
  return out;
}

export function validateAnswer(question, value) {
  if (!question) return null;
  const empty = value === undefined || value === null || value === "";
  if (question.required && empty) return "Required";
  if (empty) return null;
  if (question.type === QUESTION_TYPES.EMAIL && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value))) {
    return "Enter a valid email.";
  }
  if (question.type === QUESTION_TYPES.NUMBER && Number.isNaN(Number(value))) {
    return "Must be a number.";
  }
  return null;
}
