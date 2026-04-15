// Dutiva — Statutory & case-law change registry
//
// Declarative record of Canadian employment-law changes that affect generated
// documents. Each entry describes WHEN it took effect, WHICH jurisdictions
// and templates it impacts, WHY it matters, and WHAT to do about it.
//
// Maintenance:
//   - When a new court decision, statute amendment, or regulation takes
//     effect, append an entry here and bump LAW_DATA_VERSION in
//     jurisdiction_data.js.
//   - Entries are immutable once shipped — add a new entry instead of editing
//     historical ones, so documents generated under the old regime retain
//     their audit trail.
//   - Severity: "critical" = likely voids clauses; "high" = new obligation;
//     "medium" = enforceability risk; "low" = best-practice update.

export const STATUTORY_CHANGES = [
  // ──────────────────────────────────────────────────────────────────────
  // TERMINATION CLAUSE CASE LAW
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "waksdale_2020",
    effectiveDate: "2020-06-17",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "termination",
    severity: "critical",
    title: "Waksdale v. Swegon — any ESA-offside language voids the entire termination clause",
    summary:
      "The Ontario Court of Appeal held that if any part of a termination provision (including a 'for cause' clause the employer doesn't rely on) violates the ESA, the entire provision is void. Most pre-2020 contracts are now likely unenforceable on termination.",
    citation: "Waksdale v. Swegon North America Inc., 2020 ONCA 391",
    action: "Regenerate using a Waksdale-compliant termination clause (the Phase 1 engine does this automatically for Ontario).",
  },
  {
    id: "adams_thinkific_2024",
    effectiveDate: "2024-03-15",
    jurisdictions: ["BC", "ON"],
    templates: ["Offer Letter"],
    category: "termination",
    severity: "critical",
    title: "Adams v. Thinkific — two-step offer locks employer into the initial document",
    summary:
      "BC Supreme Court held that when an employer emails an offer without termination language and sends the employment agreement hours later, the first email is the binding contract. The later agreement lacks fresh consideration. Use a single comprehensive offer.",
    citation: "Adams v. Thinkific Labs Inc., 2024 BCSC",
    action: "Use the single-document mode in Employer Profile settings (Phase 3 feature).",
  },
  {
    id: "dufault_2024",
    effectiveDate: "2024-02-16",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "termination",
    severity: "high",
    title: "Dufault v. Ignace — 'at any time' termination language held invalid",
    summary:
      "Ontario Superior Court invalidated a termination clause using 'at any time' language because it contradicts the ESA's prohibition on terminating during statutory leave. Note: Baker and Chan reached similar conclusions; Li and Jones went the other way. Court of Appeal has not yet resolved the split.",
    citation: "Dufault v. The Corporation of the Township of Ignace, 2024 ONSC 1029",
    action: "Avoid 'at any time' and 'sole discretion' language in termination and probation clauses.",
  },
  {
    id: "de_castro_arista_2025",
    effectiveDate: "2025-01-20",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "termination",
    severity: "high",
    title: "De Castro v. Arista Homes — Court of Appeal reinforces strict ESA scrutiny",
    summary:
      "Ontario Court of Appeal continued the Waksdale trajectory, striking a termination clause that purported to allow termination without reasonable notice in circumstances the ESA protects.",
    citation: "De Castro v. Arista Homes, 2025 ONCA",
    action: "Regenerate contracts that reference 'just cause' without carving out ESA 'wilful misconduct'.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // PROBATION CASE LAW
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "chan_nyx_2025",
    effectiveDate: "2025-02-04",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "probation",
    severity: "high",
    title: "Chan v. NYX Capital — vague probation language voids termination rights during probation",
    summary:
      "Employee terminated one day before end of 3-month probation was awarded ~$45,000 because the probationary clause was tied to an unenforceable termination provision using 'at any time and for any reason' language.",
    citation: "Chan v. NYX Capital, 2025",
    action: "Use clear, ESA-aligned probationary language that does not reference unlimited employer discretion.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // BONUS & COMPENSATION CASE LAW
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "matthews_ocean_nutrition_2020",
    effectiveDate: "2020-10-09",
    jurisdictions: ["ON", "QC", "BC", "AB", "FED"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "bonus",
    severity: "critical",
    title: "Matthews v. Ocean Nutrition — 'actively employed' clauses insufficient to deny bonus on notice",
    summary:
      "Supreme Court of Canada held that 'actively employed' language alone is not enough to deny bonus compensation during the common-law notice period. Language must clearly address bonus entitlement through the notice window. Ocean Nutrition paid $1.1M in LTIP.",
    citation: "Matthews v. Ocean Nutrition Canada Ltd., 2020 SCC 26",
    action: "Update variable compensation language to use 'fair, identifiable process' wording per Singer v. Nordstrong.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // ONTARIO STATUTORY
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "on_bill27_noncompete_ban",
    effectiveDate: "2021-10-25",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement", "Non-Compete Agreement"],
    category: "covenants",
    severity: "critical",
    title: "Ontario Working for Workers Act — non-competes void for non-executives",
    summary:
      "Bill 27 amended the ESA to void non-compete agreements for all Ontario employees except executives. Including a non-compete for a non-executive may, under Waksdale, void the entire restrictive covenant section.",
    citation: "Employment Standards Act s. 67.2 (Ontario, Bill 27)",
    action: "Replace with scoped non-solicitation + confidentiality. The Phase 1 guardrails block this automatically.",
  },
  {
    id: "on_right_to_disconnect",
    effectiveDate: "2022-06-02",
    jurisdictions: ["ON"],
    templates: ["Offer Letter", "Employment Agreement", "Remote Work Policy"],
    category: "remote",
    severity: "medium",
    title: "Ontario Right to Disconnect — mandatory policy for 25+ employees",
    summary:
      "Ontario employers with 25 or more employees on Jan 1 of any year must establish a written Right to Disconnect policy describing employee rights to disengage from work communications after hours.",
    citation: "Employment Standards Act Part VII.0.1 (Ontario)",
    action: "The Phase 1 offer template auto-includes the policy reference when jurisdiction is Ontario.",
  },
  {
    id: "on_pay_transparency_2026",
    effectiveDate: "2026-01-01",
    jurisdictions: ["ON"],
    templates: ["Offer Letter"],
    category: "pay_transparency",
    severity: "high",
    title: "Ontario pay transparency — salary ranges required in public job postings",
    summary:
      "Ontario's Working for Workers Four Act requires publicly advertised job postings to include expected compensation or a salary range. Does not apply to internal-only postings but does cross-apply to recruitment communications.",
    citation: "Working for Workers Four Act, 2024 (Ontario)",
    action: "Add structured salary-range field to offer preparation and recruitment workflows.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // QUEBEC STATUTORY
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "qc_bill96_phase1",
    effectiveDate: "2022-06-01",
    jurisdictions: ["QC"],
    templates: [
      "Offer Letter",
      "Employment Agreement",
      "Offer Letter (French/Quebec)",
      "Remote Work Policy",
      "Code of Conduct",
      "Anti-Harassment Policy",
      "Employee Handbook",
    ],
    category: "language",
    severity: "critical",
    title: "Quebec Bill 96 — all employment documents must be available in French",
    summary:
      "Amended Charter of the French Language s. 41. Employment offers, contracts, and workplace policies must be available in French. For adhesion contracts (non-negotiable standard-form agreements), the French version must be presented first.",
    citation: "Charter of the French Language, CQLR c C-11 s. 41 (S.Q. 2022, c. 14)",
    action: "The Phase 1 engine auto-routes Quebec Offer Letters to g09 with French-first rendering.",
  },
  {
    id: "qc_bill96_final",
    effectiveDate: "2025-06-01",
    jurisdictions: ["QC"],
    templates: [
      "Offer Letter",
      "Employment Agreement",
      "Offer Letter (French/Quebec)",
    ],
    category: "language",
    severity: "high",
    title: "Quebec Bill 96 — final provisions in force, OQLF enforcement expanded",
    summary:
      "Final Bill 96 provisions took effect including expanded OQLF enforcement powers (premises inspections, injunctions, exclusion from public contracts). Per-day fines of $3,000–$30,000 for corporations, with directors presumed liable unless due diligence shown.",
    citation: "S.Q. 2022, c. 14, in-force dates",
    action: "Review all Quebec-facing employment documents and confirm French-first compliance. Include language designation form for employees consenting to English.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // BC STATUTORY
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "bc_pay_transparency_2023",
    effectiveDate: "2023-11-01",
    jurisdictions: ["BC"],
    templates: ["Offer Letter"],
    category: "pay_transparency",
    severity: "high",
    title: "BC Pay Transparency Act — salary ranges required in public job postings",
    summary:
      "BC requires publicly advertised job postings to include the expected pay or pay range. Annual pay transparency reports also required for employers above size thresholds.",
    citation: "Pay Transparency Act, SBC 2023, c. 18",
    action: "Include salary range in job postings. Offer documents may reference the posted range.",
  },

  // ──────────────────────────────────────────────────────────────────────
  // BENEFITS CONTINUATION (cross-jurisdiction)
  // ──────────────────────────────────────────────────────────────────────
  {
    id: "benefits_continuation_notice",
    effectiveDate: "2020-06-17", // ties to Waksdale jurisprudence
    jurisdictions: ["ON", "BC", "AB"],
    templates: ["Offer Letter", "Employment Agreement"],
    category: "termination",
    severity: "high",
    title: "Benefits continuation required during statutory notice — or termination clause voids",
    summary:
      "Courts have found that termination clauses silent on benefits continuation through the statutory notice period can be struck down for ESA non-compliance. The Phase 1 engine includes benefits continuation language in Section 11.",
    citation: "Waksdale line of cases (ON); analogous provincial ESA interpretation",
    action: "No action if using the Phase 1 engine. Audit any templates imported from pre-Phase-1 documents.",
  },
];

// For any (jurisdiction, template) pair, return the changes that apply.
export function changesForContext({ jurisdictionCode, template } = {}) {
  return STATUTORY_CHANGES.filter((c) => {
    const jMatch = !jurisdictionCode || c.jurisdictions.includes(jurisdictionCode);
    const tMatch = !template || c.templates.includes(template);
    return jMatch && tMatch;
  });
}

// Find changes that became effective AFTER a given date (for detecting
// documents generated before a change took effect).
export function changesAfter(dateISO) {
  const cutoff = new Date(dateISO).getTime();
  if (Number.isNaN(cutoff)) return [];
  return STATUTORY_CHANGES.filter((c) => new Date(c.effectiveDate).getTime() > cutoff);
}
