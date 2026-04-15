// Dutiva — Compliance alerts
//
// Detects when a saved document was generated under an older version of
// jurisdiction_data and surfaces the specific legal changes the user should
// know about.
//
// Flow:
//   1. At save time, GeneratorPage stamps documents.jurisdiction_data_version
//      with the current JURISDICTION_DATA_VERSION.
//   2. When a saved document is loaded for editing, getComplianceAlerts()
//      compares that stamp with the current version.
//   3. If they differ, it returns the changelog entries newer than the stamp
//      filtered to the document's jurisdiction.
//   4. The ComplianceAlertBanner renders those entries with the action
//      recommended by each (review, regenerate, resign).

import { JURISDICTION_DATA_VERSION } from "./generator/jurisdiction_data.js";
import { changesForJurisdiction, changesSince } from "./generator/changelog.js";
import { JURISDICTION_CODE_BY_NAME } from "./generator/index.js";

export { JURISDICTION_DATA_VERSION };

/**
 * Compare a document's saved version stamp to the current version and return
 * the changelog entries the user should be aware of.
 *
 * @param {object} document  A row from public.documents (expects
 *   jurisdiction_data_version and the form metadata needed to derive the
 *   document's jurisdiction)
 * @param {object} [form]    Current form state (optional — used as fallback
 *   to infer jurisdiction when the document row doesn't carry one).
 * @returns {{
 *   stale: boolean,
 *   savedVersion: string|null,
 *   currentVersion: string,
 *   entries: Array<object>,
 * }}
 */
export function getComplianceAlerts(document, form) {
  const savedVersion = document?.jurisdiction_data_version || null;
  const currentVersion = JURISDICTION_DATA_VERSION;
  const stale = !savedVersion || savedVersion < currentVersion;

  if (!stale) {
    return { stale: false, savedVersion, currentVersion, entries: [] };
  }

  const jurisdictionName = document?.jurisdiction || form?.jurisdiction || null;
  const jurisdictionCode = jurisdictionName
    ? JURISDICTION_CODE_BY_NAME[jurisdictionName] || null
    : null;

  const allEntriesSince = changesSince(savedVersion);
  const entries = changesForJurisdiction(allEntriesSince, jurisdictionCode);

  return { stale: true, savedVersion, currentVersion, entries };
}

/**
 * Severity roll-up across a set of entries. Used by the UI to pick colour.
 */
export function highestSeverity(entries) {
  if (!entries || entries.length === 0) return null;
  const order = { info: 0, warn: 1, critical: 2 };
  return entries.reduce((acc, e) => {
    return order[e.severity] > order[acc] ? e.severity : acc;
  }, "info");
}
