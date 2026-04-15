// Dutiva — Scenario presets
//
// Each scenario is a curated intake flow for a specific hiring situation.
// Selecting a scenario:
//   1. Pre-fills `defaultAnswers` into the wizard answer map
//   2. Restricts the wizard's question flow to `questionFlow`
//   3. Optionally sets a `suggestedTemplate`
//
// A scenario does not hard-code legal content — all content still flows
// through src/lib/generator/ templates and guardrails. The scenario's job is
// to shape the intake experience so the right defaults and questions surface
// automatically.

export const SCENARIOS = [
  {
    id: "first_quebec_hire",
    name: "First Quebec hire",
    summary: "French-first bilingual offer, CNESST and VRSP coverage, Bill 96 compliant.",
    icon: "⚜️",
    tags: ["Bill 96", "Bilingual", "CNESST"],
    whyThis:
      "Quebec fines reach $3,000–$30,000 per day for non-French employment documents. This flow routes to g09 (French-primary) and surfaces VRSP + OHS fields at 5+ employees.",
    suggestedTemplate: "Offer Letter",
    defaultAnswers: {
      jurisdiction: "Quebec",
      employmentType: "full-time, permanent",
      language: "BOTH",
      singleDocumentMode: true,
      includeNonCompete: false,
    },
    questionFlow: [
      "companyName",
      "employeeName",
      "jobTitle",
      "manager",
      "managerTitle",
      "startDate",
      "employmentType",
      "workMode",
      "workLocation",
      "salary",
      "payFrequency",
      "hasVariableComp",
      "variableCompDescription",
      "probationLength",
      "includeNonSolicit",
      "includeIPAssignment",
      "employeeCount",
      "hrContactName",
      "hrContactEmail",
      "offerExpiryDate",
    ],
  },
  {
    id: "ontario_remote_knowledge",
    name: "Ontario remote knowledge worker",
    summary: "Right-to-disconnect, equipment and expense terms, no non-compete for non-execs.",
    icon: "🧠",
    tags: ["Right-to-disconnect", "Remote", "Bill 27"],
    whyThis:
      "Ontario bans non-competes for non-executives (Working for Workers Act). This flow hides the non-compete question, and at 25+ employees the engine injects the right-to-disconnect clause automatically.",
    suggestedTemplate: "Offer Letter",
    defaultAnswers: {
      jurisdiction: "Ontario",
      employmentType: "full-time, permanent",
      workMode: "remote",
      language: "EN",
      singleDocumentMode: true,
      includeNonCompete: false,
      includeNonSolicit: true,
      includeIPAssignment: true,
    },
    questionFlow: [
      "companyName",
      "employeeName",
      "jobTitle",
      "manager",
      "managerTitle",
      "startDate",
      "workLocation",
      "salary",
      "payFrequency",
      "hasVariableComp",
      "variableCompDescription",
      "probationLength",
      "employeeCount",
      "hrContactName",
      "hrContactEmail",
      "offerExpiryDate",
    ],
  },
  {
    id: "bc_hybrid",
    name: "BC hybrid role",
    summary: "Hybrid schedule with split location terms and pay-transparency ready.",
    icon: "⛰️",
    tags: ["Pay transparency", "Hybrid"],
    whyThis:
      "BC requires pay transparency in public postings since Nov 2023. This flow captures the salary range mindset from the start and locks in the hybrid work terms that prevent constructive-dismissal claims on location changes.",
    suggestedTemplate: "Offer Letter",
    defaultAnswers: {
      jurisdiction: "British Columbia",
      employmentType: "full-time, permanent",
      workMode: "hybrid",
      language: "EN",
      singleDocumentMode: true,
    },
    questionFlow: [
      "companyName",
      "employeeName",
      "jobTitle",
      "manager",
      "managerTitle",
      "startDate",
      "workLocation",
      "salary",
      "payFrequency",
      "hasVariableComp",
      "variableCompDescription",
      "probationLength",
      "includeNonSolicit",
      "includeIPAssignment",
      "employeeCount",
      "hrContactName",
      "hrContactEmail",
      "offerExpiryDate",
    ],
  },
  {
    id: "alberta_sales",
    name: "Alberta sales role (commission)",
    summary: "Post-Matthews commission language, scoped non-solicit, territory-clear.",
    icon: "🛢️",
    tags: ["Commission", "Non-solicit"],
    whyThis:
      "Sales comp is the highest-litigation area outside terminations. The variable comp question forces a fair/identifiable process description that survives Matthews v. Ocean Nutrition scrutiny.",
    suggestedTemplate: "Offer Letter",
    defaultAnswers: {
      jurisdiction: "Alberta",
      employmentType: "full-time, permanent",
      hasVariableComp: true,
      workMode: "hybrid",
      language: "EN",
      singleDocumentMode: true,
      includeNonSolicit: true,
      includeIPAssignment: true,
    },
    questionFlow: [
      "companyName",
      "employeeName",
      "jobTitle",
      "manager",
      "managerTitle",
      "startDate",
      "workLocation",
      "salary",
      "payFrequency",
      "variableCompDescription",
      "probationLength",
      "includeNonCompete",
      "employeeCount",
      "hrContactName",
      "hrContactEmail",
      "offerExpiryDate",
    ],
  },
  {
    id: "cross_province_transfer",
    name: "Cross-province transfer",
    summary: "Multi-jurisdiction tax notice, constructive-dismissal protection on location change.",
    icon: "🔀",
    tags: ["Multi-province", "Tax", "Constructive dismissal"],
    whyThis:
      "Moving an employee between provinces changes the governing ESA, tax withholdings, and sometimes the enforceability of existing restrictive covenants. This flow forces the jurisdiction question first so every clause recalculates.",
    suggestedTemplate: "Offer Letter",
    defaultAnswers: {
      employmentType: "full-time, permanent",
      singleDocumentMode: true,
    },
    questionFlow: [
      "jurisdiction",
      "companyName",
      "employeeName",
      "jobTitle",
      "manager",
      "managerTitle",
      "startDate",
      "workMode",
      "workLocation",
      "salary",
      "payFrequency",
      "hasVariableComp",
      "variableCompDescription",
      "probationLength",
      "includeNonSolicit",
      "includeIPAssignment",
      "employeeCount",
      "language",
      "hrContactName",
      "hrContactEmail",
      "offerExpiryDate",
    ],
  },
];

export const CUSTOM_SCENARIO = {
  id: "custom",
  name: "Custom intake (all questions)",
  summary: "Run the full branching intake. All fields available, nothing pre-set.",
  icon: "⚙️",
  tags: ["Power user"],
  whyThis: "Use when none of the scenarios fit, or when you want to override a scenario's defaults.",
  suggestedTemplate: "Offer Letter",
  defaultAnswers: {},
  questionFlow: null, // null = show all visible questions
};

export function getScenario(id) {
  if (id === "custom") return CUSTOM_SCENARIO;
  return SCENARIOS.find((s) => s.id === id) || null;
}
