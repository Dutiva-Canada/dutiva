// Dutiva — Compliance alerts engine
//
// Reads a stored document's stamp (jurisdiction, template, generated_at,
// jurisdiction_data_version) and reports what's changed since it was
// generated. Powers the "your contract is out of date" UI.
//
// Three signal sources are combined:
//   1. Statutory changes effective after generated_at
//   2. Jurisdiction-data version mismatch (our own internal changes)
//   3. Age-based review prompt (any document >12 months old)
//
// The caller decides what to do with each alert — the engine is pure.

import { STATUTORY_CHANGES, changesAfter } from "./statutoryChanges.js";
import { LAW_DATA_VERSION, LAW_DATA_UPDATED_AT } from "./jurisdiction_data.js";

const SEVERITY_RANK = { critical: 4, high: 3, medium: 2, low: 1 };

/**
 * Evaluate a saved document against the current law registry.
 *
 * @param {object} doc
 * @param {string} doc.jurisdictionCode   e.g. "ON", "QC"
 * @param {string} doc.template           UI template name
 * @param {string} doc.generatedAt        ISO timestamp
 * @param {string} [doc.dataVersion]      jurisdiction_data version at generation
 * @returns {{
 *   isOutdated: boolean,
 *   severity: "critical"|"high"|"medium"|"low"|null,
 *   alerts: Array<{ id, source, severity, title, summary, citation, action, effectiveDate }>,
 *   currentVersion: string,
 *   documentVersion: string,
 *   ageDays: number
 * }}
 */
export function evaluateDocumentCompliance(doc) {
  const out = {
    isOutdated: false,
    severity: null,
    alerts: [],
    currentVersion: LAW_DATA_VERSION,
    documentVersion: doc.dataVersion || "unversioned",
    ageDays: 0,
  };

  if (!doc || !doc.generatedAt) return out;

  const genMs = new Date(doc.generatedAt).getTime();
  if (Number.isNaN(genMs)) return out;
  const nowMs = Date.now();
  out.ageDays = Math.floor((nowMs - genMs) / (1000 * 60 * 60 * 24));

  // 1. Statutory changes effective after the document was generated
  const newChanges = changesAfter(doc.generatedAt).filter((c) => {
    const jMatch = !doc.jurisdictionCode || c.jurisdictions.includes(doc.jurisdictionCode);
    const tMatch = !doc.template || c.templates.includes(doc.template);
    return jMatch && tMatch;
  });
  for (const c of newChanges) {
    out.alerts.push({
      id: c.id,
      source: "statutory_change",
      severity: c.severity,
      title: c.title,
      summary: c.summary,
      citation: c.citation,
      action: c.action,
      effectiveDate: c.effectiveDate,
    });
  }

  // 2. Internal jurisdiction_data version mismatch
  if (doc.dataVersion && doc.dataVersion !== LAW_DATA_VERSION) {
    out.alerts.push({
      id: `data_version_drift:${doc.dataVersion}->${LAW_DATA_VERSION}`,
      source: "data_version",
      severity: "medium",
      title: `Document generated against jurisdiction_data v${doc.dataVersion}; current is v${LAW_DATA_VERSION}`,
      summary:
        "Dutiva has updated its internal statutory reference data since this document was generated. Regenerate to pick up the latest statute citations, wording, and entitlement values.",
      citation: `jurisdiction_data updated ${LAW_DATA_UPDATED_AT}`,
      action: "Click Regenerate with current law.",
      effectiveDate: LAW_DATA_UPDATED_AT,
    });
  }

  // 3. Annual review prompt (>365 days old, no blocking change required)
  if (out.ageDays > 365 && newChanges.length === 0) {
    out.alerts.push({
      id: "annual_review_prompt",
      source: "age",
      severity: "low",
      title: `This document is ${Math.floor(out.ageDays / 30)} months old — annual review recommended`,
      summary:
        "Even without a known legislative change, employment documents benefit from an annual review. Refresh salary, benefits, and statutory references to ensure ongoing enforceability.",
      citation: "Dutiva best practice",
      action: "Open and re-save, or regenerate from the current engine.",
      effectiveDate: null,
    });
  }

  // Headline severity = highest among alerts
  if (out.alerts.length > 0) {
    out.isOutdated = true;
    out.severity = out.alerts
      .map((a) => a.severity)
      .sort((a, b) => (SEVERITY_RANK[b] || 0) - (SEVERITY_RANK[a] || 0))[0];
  }

  return out;
}

/**
 * Produce the stamp to attach to a newly generated document. Call at save
 * time. Shape matches the columns added by the Phase 4 migration.
 */
export function createGenerationStamp({ jurisdictionCode, template }) {
  return {
    jurisdiction_code: jurisdictionCode || null,
    template_key: template || null,
    jurisdiction_data_version: LAW_DATA_VERSION,
    generated_at: new Date().toISOString(),
  };
}

/**
 * Summarize all outdated alerts across a list of documents — powers an
 * account-wide "X contracts need review" badge.
 */
export function summarizeFleet(documents) {
  const out = {
    total: documents.length,
    outdated: 0,
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byDocument: [],
  };
  for (const d of documents) {
    const res = evaluateDocumentCompliance(d);
    if (res.isOutdated) {
      out.outdated += 1;
      if (res.severity) out.bySeverity[res.severity] += 1;
    }
    out.byDocument.push({ id: d.id, ...res });
  }
  return out;
}
