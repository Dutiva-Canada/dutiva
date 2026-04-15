// Dutiva — Jurisdiction data changelog
//
// Every meaningful legal update to jurisdiction_data.js should land here at
// the same time, bumping JURISDICTION_DATA_VERSION in that file.
//
// Entries are structured (not markdown) so the client can:
//   1. Detect when a saved document was generated from stale data.
//   2. Show the user exactly WHICH legal changes affect their contract.
//   3. Link to a remediation action (e.g. "re-generate" or "mark reviewed").
//
// Shape:
//   { version: "YYYY-MM-DD",
//     jurisdictions: ["ON","QC","BC","AB","FED","ALL"],
//     categories: ["termination","probation","covenants","language",...],
//     severity: "info" | "warn" | "critical",
//     summary: short English summary,
//     detail: 1-3 sentence explanation,
//     action: { type: "regenerate" | "review" | "resign", label: string }
//   }

export const CHANGELOG = [
  {
    version: "2026-04-15",
    jurisdictions: ["ALL"],
    categories: ["baseline"],
    severity: "info",
    summary: "Initial versioned baseline.",
    detail:
      "First version-stamped release of jurisdiction data. Documents saved from this point forward will be tagged with this version and checked against future updates.",
    action: { type: "review", label: "Acknowledge" },
  },
  // Template entries for future edits — commented out so they don't show up
  // in the UI. Copy one and populate when you bump the version in
  // jurisdiction_data.js.
  //
  // {
  //   version: "2026-05-01",
  //   jurisdictions: ["ON"],
  //   categories: ["pay-transparency"],
  //   severity: "critical",
  //   summary: "Ontario pay-transparency posting obligation expanded.",
  //   detail: "Effective May 2026, employers with 25+ employees must post a pay range on public job ads. Existing offers are not affected but future postings must comply.",
  //   action: { type: "review", label: "Confirm new postings comply" },
  // },
];

/**
 * Return changelog entries strictly newer than the given version.
 * If `fromVersion` is falsy, returns the entire changelog.
 */
export function changesSince(fromVersion) {
  if (!fromVersion) return CHANGELOG.slice().reverse();
  return CHANGELOG
    .filter((e) => e.version > fromVersion)
    .sort((a, b) => (a.version < b.version ? 1 : -1));
}

/**
 * Filter changelog entries to those affecting a specific jurisdiction.
 * "ALL" entries are included for every jurisdiction.
 */
export function changesForJurisdiction(entries, jurisdictionCode) {
  if (!jurisdictionCode) return entries;
  return entries.filter(
    (e) => !e.jurisdictions || e.jurisdictions.includes("ALL") || e.jurisdictions.includes(jurisdictionCode),
  );
}
