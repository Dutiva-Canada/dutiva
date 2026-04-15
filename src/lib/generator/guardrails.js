// Dutiva — Compliance guardrails
// Declarative rules that evaluate a form + jurisdiction and return warnings
// or hard blocks. Each rule explains WHY it fires with a case citation or
// statute reference so the user learns, not just gets blocked.
//
// Levels:
//   "block" — the system should prevent save/send until fixed
//   "warn"  — the system should surface the issue but allow save
//
// To add a rule: push a new object into RULES. Each rule has:
//   id:       stable identifier for UI dismissal / analytics
//   level:    "block" | "warn"
//   category: "termination" | "probation" | "covenants" | "language" | "bonus" | "remote"
//   check(form, j) -> boolean   true = rule fires
//   message(form, j) -> string  shown to the user
//   citation: short authority reference (shown in tooltip)

const RULES = [
  // 1. Ontario non-compete for non-executive employees — void under Bill 27 / Working for Workers Act
  {
    id: "on_noncompete_nonexec",
    level: "block",
    category: "covenants",
    check: (form, j) => {
      if (j.code !== "ON") return false;
      if (!form.includeNonCompete) return false;
      const execRoles = /(c[a-z]+o|chief|president|vice[- ]?president|vp|executive|managing director|general manager)/i;
      return !execRoles.test(form.jobTitle || "");
    },
    message: () =>
      "Ontario bans non-compete clauses for non-executive employees under the Working for Workers Act (ESA s. 67.2). Including one here may void the entire restrictive covenant section. Use a scoped non-solicitation instead.",
    citation: "ESA s. 67.2 (Ontario)",
  },

  // 2. "At any time" or "sole discretion" probation language — Chan v. NYX Capital
  {
    id: "probation_vague_language",
    level: "warn",
    category: "probation",
    check: (form) => {
      const s = String(form.notes || "") + " " + String(form.probationLength || "");
      return /at any time|sole discretion|for any reason/i.test(s);
    },
    message: () =>
      "Probation clauses using \"at any time\", \"sole discretion\", or \"for any reason\" have been struck down (see Chan v. NYX Capital, 2025). Language must respect the statutory minimum notice once statutory probation elapses.",
    citation: "Chan v. NYX Capital (2025)",
  },

  // 3. Probation length exceeds statutory probationary period
  {
    id: "probation_exceeds_statutory",
    level: "warn",
    category: "probation",
    check: (form, j) => {
      const m = String(form.probationLength || "").match(/(\d+)\s*(month|day|week)/i);
      if (!m) return false;
      const n = parseInt(m[1], 10);
      const unit = m[2].toLowerCase();
      const months = unit.startsWith("month") ? n : unit.startsWith("week") ? n / 4 : n / 30;
      return months > (j.probationMonths || 3) + 0.1;
    },
    message: (form, j) =>
      `Probation longer than the statutory period (${j.probationMonths} months in ${j.nameEN}) is allowed but statutory minimum notice applies after the statutory window. Make sure the contract reflects this.`,
    citation: "Applicable ESA / equivalent",
  },

  // 4. Offer letter without termination clause (two-step trap — Adams v. Thinkific)
  {
    id: "no_termination_clause",
    level: "block",
    category: "termination",
    check: (form) =>
      form.template === "Offer Letter" && form.splitOfferAndAgreement === true,
    message: () =>
      "Sending the offer before the employment agreement creates the Adams v. Thinkific two-step trap — the initial offer becomes the binding contract without a valid termination clause. Use the single-document offer.",
    citation: "Adams v. Thinkific Labs (2024 BCSC)",
  },

  // 5. Quebec offer not in French-first mode
  {
    id: "qc_missing_french",
    level: "block",
    category: "language",
    check: (form, j) =>
      j.code === "QC" && form.language === "EN",
    message: () =>
      "Under Bill 96 (Charter of the French Language, s. 41), employment offers in Quebec must be presented in French first (or simultaneously with a French version). English-only offers risk fines of $3,000–$30,000 per day of non-compliance.",
    citation: "Charter of the French Language, s. 41 (Bill 96)",
  },

  // 6. Bonus language uses "actively employed" only — insufficient post-Matthews
  {
    id: "bonus_actively_employed_only",
    level: "warn",
    category: "bonus",
    check: (form) => {
      const s = String(form.notes || "");
      return /actively employed/i.test(s) && !/fair.*identifiable|clear and unambiguous/i.test(s);
    },
    message: () =>
      "\"Actively employed\" language alone is insufficient to deny bonus during the notice period (Matthews v. Ocean Nutrition, 2020 SCC 26). Use language that is clear, unambiguous, and tied to a fair, identifiable process.",
    citation: "Matthews v. Ocean Nutrition (2020 SCC 26)",
  },

  // 7. Remote work without location / equipment / expense terms
  {
    id: "remote_missing_terms",
    level: "warn",
    category: "remote",
    check: (form) =>
      form.isRemote === true &&
      !(form.workLocation && /equipment|expense|reimburs/i.test(String(form.notes || ""))),
    message: () =>
      "Remote or hybrid roles should specify work location, equipment provisioning, expense reimbursement, and multi-province tax implications. Missing terms create ambiguity and constructive-dismissal risk on location changes.",
    citation: "Best practice — Hum Law remote employer checklist",
  },
];

/**
 * Evaluate all guardrails against a form + jurisdiction.
 * @returns {{ blocks: Array, warnings: Array, all: Array }}
 */
export function evaluateGuardrails(form, jurisdiction) {
  const out = { blocks: [], warnings: [], all: [] };
  if (!form || !jurisdiction) return out;
  for (const rule of RULES) {
    try {
      if (!rule.check(form, jurisdiction)) continue;
      const entry = {
        id: rule.id,
        level: rule.level,
        category: rule.category,
        message: rule.message(form, jurisdiction),
        citation: rule.citation,
      };
      out.all.push(entry);
      if (rule.level === "block") out.blocks.push(entry);
      else out.warnings.push(entry);
    } catch {
      // Never let a broken rule break the generator
    }
  }
  return out;
}

export { RULES };
