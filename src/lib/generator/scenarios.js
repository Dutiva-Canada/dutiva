// Dutiva — Scenario presets for the intake wizard.
//
// Each scenario is a pre-built flow tuned for a common hiring pattern. It
// provides:
//   - A pre-set set of answers (that the user can still override during the wizard)
//   - The ordered question list the wizard will run through
//   - A suggested template name (mapped to the generator's UI template names)
//   - A set of "implied" triggers (behaviours that fire without a question being asked)
//
// To add a scenario: copy one of the entries in SCENARIOS and adjust. Keep
// the MVP set small (5) until the 4+1 pattern is validated in real use.

// Common question tails used across most scenarios.
const CORE_ROLE_QUESTIONS = [
  "companyName",
  "employeeName",
  "jobTitle",
  "manager",
  "managerTitle",
  "startDate",
  "employmentType",
];

const CORE_COMP_QUESTIONS = [
  "salary",
  "payFrequency",
  "hasVariableComp",
  "variableCompDescription",
  "vacationWeeks",
  "probationLength",
];

const CORE_COVENANT_QUESTIONS = [
  "handlesConfidentialInfo",
  "includeNonSolicit",
];

const CORE_ADMIN_QUESTIONS = [
  "employeeCount",
  "hrContactName",
  "hrContactEmail",
  "offerExpiryDate",
  "splitOfferAndAgreement",
];

export const SCENARIOS = [
  // ──────────────────────── SCENARIO 1 — FIRST QUEBEC HIRE ────────────────────────
  {
    id: "first_quebec_hire",
    name: "First Quebec hire",
    shortName: "Quebec hire",
    emoji: "⚜️",
    description:
      "French-first bilingual offer with Bill 96 compliance, CNESST / VRSP context, and Civil Code governing law. Use this if your company has never issued a Quebec offer before.",
    tags: ["Bill 96", "French-first", "Civil law"],
    defaultAnswers: {
      jurisdiction: "Quebec",
      employmentType: "full-time, permanent",
      language: "BOTH",
      splitOfferAndAgreement: false,
    },
    suggestedTemplate: "Offer Letter",
    questionFlow: [
      // jurisdiction pre-set; no re-ask
      ...CORE_ROLE_QUESTIONS,
      "workMode",
      "workLocation",
      "remoteEquipmentPolicy",
      ...CORE_COMP_QUESTIONS,
      ...CORE_COVENANT_QUESTIONS,
      "includeNonCompete",
      ...CORE_ADMIN_QUESTIONS,
      "language",
    ],
  },

  // ──────────────────────── SCENARIO 2 — ONTARIO REMOTE KNOWLEDGE WORKER ────────────────────────
  {
    id: "ontario_remote_knowledge",
    name: "Ontario remote knowledge worker",
    shortName: "Ontario remote",
    emoji: "💻",
    description:
      "Fully remote Ontario role with right-to-disconnect context, equipment and expense terms, scoped non-solicit — and no non-compete (banned for non-execs under Bill 27).",
    tags: ["Remote", "Right-to-disconnect", "Bill 27"],
    defaultAnswers: {
      jurisdiction: "Ontario",
      employmentType: "full-time, permanent",
      workMode: "remote",
      includeNonCompete: false,
      includeNonSolicit: true,
      handlesConfidentialInfo: true,
    },
    suggestedTemplate: "Offer Letter",
    questionFlow: [
      ...CORE_ROLE_QUESTIONS,
      "workLocation",
      "remoteEquipmentPolicy",
      ...CORE_COMP_QUESTIONS,
      "handlesConfidentialInfo",
      "includeNonSolicit",
      ...CORE_ADMIN_QUESTIONS,
    ],
  },

  // ──────────────────────── SCENARIO 3 — BC HYBRID ────────────────────────
  {
    id: "bc_hybrid",
    name: "BC hybrid role",
    shortName: "BC hybrid",
    emoji: "🌲",
    description:
      "Hybrid British Columbia role with pay-transparency framing (BC Pay Transparency Act, Nov 2023) and split on-site / remote location terms.",
    tags: ["Pay transparency", "Hybrid"],
    defaultAnswers: {
      jurisdiction: "British Columbia",
      employmentType: "full-time, permanent",
      workMode: "hybrid",
    },
    suggestedTemplate: "Offer Letter",
    questionFlow: [
      ...CORE_ROLE_QUESTIONS,
      "workLocation",
      "remoteEquipmentPolicy",
      ...CORE_COMP_QUESTIONS,
      ...CORE_COVENANT_QUESTIONS,
      "includeNonCompete",
      ...CORE_ADMIN_QUESTIONS,
    ],
  },

  // ──────────────────────── SCENARIO 4 — ALBERTA SALES W/ COMMISSION ────────────────────────
  {
    id: "alberta_sales",
    name: "Alberta sales role with commission",
    shortName: "Alberta sales",
    emoji: "🤝",
    description:
      "Sales role with a commission plan — includes Post-Matthews bonus/commission language so the commission survives the notice period, plus scoped non-solicit.",
    tags: ["Commission", "Post-Matthews", "Non-solicit"],
    defaultAnswers: {
      jurisdiction: "Alberta",
      employmentType: "full-time, permanent",
      workMode: "onsite",
      hasVariableComp: true,
      includeNonSolicit: true,
      handlesConfidentialInfo: true,
    },
    suggestedTemplate: "Offer Letter",
    questionFlow: [
      ...CORE_ROLE_QUESTIONS,
      "workLocation",
      "salary",
      "payFrequency",
      "variableCompDescription",
      "vacationWeeks",
      "probationLength",
      "handlesConfidentialInfo",
      "includeNonSolicit",
      "includeNonCompete",
      ...CORE_ADMIN_QUESTIONS,
    ],
  },

  // ──────────────────────── SCENARIO 5 — CROSS-PROVINCE TRANSFER ────────────────────────
  {
    id: "cross_province_transfer",
    name: "Cross-province transfer",
    shortName: "Transfer",
    emoji: "🧭",
    description:
      "Existing employee moving between provinces. Captures the new governing province, multi-jurisdiction tax implications, and constructive-dismissal protection for the location change.",
    tags: ["Transfer", "Multi-province", "Constructive dismissal"],
    defaultAnswers: {
      employmentType: "full-time, permanent",
    },
    suggestedTemplate: "Offer Letter",
    questionFlow: [
      "jurisdiction",
      ...CORE_ROLE_QUESTIONS,
      "workMode",
      "workLocation",
      "remoteEquipmentPolicy",
      ...CORE_COMP_QUESTIONS,
      ...CORE_COVENANT_QUESTIONS,
      "includeNonCompete",
      ...CORE_ADMIN_QUESTIONS,
    ],
  },
];

// Built-in "custom" scenario — runs every question. Used when the user picks
// "Start from scratch" in the gallery.
export const CUSTOM_SCENARIO = {
  id: "custom",
  name: "Start from scratch",
  shortName: "Custom",
  emoji: "✏️",
  description:
    "Full branching intake with every question. Best when none of the presets quite fit.",
  tags: ["Custom"],
  defaultAnswers: {},
  suggestedTemplate: "Offer Letter",
  questionFlow: [
    "jurisdiction",
    ...CORE_ROLE_QUESTIONS,
    "workMode",
    "workLocation",
    "remoteEquipmentPolicy",
    ...CORE_COMP_QUESTIONS,
    "handlesConfidentialInfo",
    "includeNonSolicit",
    "includeNonCompete",
    ...CORE_ADMIN_QUESTIONS,
    "language",
  ],
};

export function getScenario(id) {
  if (id === CUSTOM_SCENARIO.id) return CUSTOM_SCENARIO;
  return SCENARIOS.find((s) => s.id === id) || null;
}

export const ALL_SCENARIOS = [...SCENARIOS, CUSTOM_SCENARIO];
