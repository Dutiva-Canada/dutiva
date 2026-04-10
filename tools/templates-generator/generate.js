// Dutiva — Generator tool orchestrator (jurisdiction-aware build)
// For each of the 5 core jurisdictions × 16 templates × 2 languages × 2 formats
// = up to 320 document files + FIELDS.json.
//
// Template modules export a function(j) → templateObject, where j is the
// full jurisdiction data object from jurisdiction_data.js.
// Templates that are jurisdiction-restricted (e.g. T09 Québec-only) signal
// this via an `onlyJurisdictions` array on the exported function.

"use strict";

const fs   = require("fs");
const path = require("path");
const { renderDocx, renderHtml, collectTemplateFields } = require("./render");
const JURISDICTIONS = require("./jurisdiction_data");

const OUT_ROOT = "/sessions/nifty-loving-faraday/mnt/Dutiva/templates_generator";
const TPL_DIR  = path.join(__dirname, "templates");

// Canonical jurisdiction order in the output folder
const JURISDICTION_CODES = ["ON", "QC", "BC", "AB", "FED"];

const TEMPLATE_FILES = [
  "g01_offer_letter.js",
  "g02_employment_agreement.js",
  "g03_termination_letter.js",
  "g04_employee_handbook.js",
  "g05_confidentiality_agreement.js",
  "g06_written_warning.js",
  "g07_independent_contractor.js",
  "g08_restrictive_covenants.js",
  "g09_quebec_offer_letter.js",
  "g10_remote_work_policy.js",
  "g11_vacation_leave_policy.js",
  "g12_code_of_conduct.js",
  "g13_anti_harassment_policy.js",
  "g14_resignation_acceptance.js",
  "g15_group_termination.js",
  "g16_performance_improvement_plan.js",
];

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function safeFilename(tpl, jCode, lang) {
  return `${tpl.id}_${tpl.slug}_${jCode}_${lang}`;
}

async function run() {
  // Clear and recreate jurisdiction output folders
  for (const jCode of JURISDICTION_CODES) {
    ensureDir(path.join(OUT_ROOT, jCode, "EN"));
    ensureDir(path.join(OUT_ROOT, jCode, "FR"));
  }

  const catalog = [];
  let docCount = 0;

  for (const file of TEMPLATE_FILES) {
    // Each template module exports either a plain object (legacy) or a function.
    // Functions receive the jurisdiction data object.
    const tplModule = require(path.join(TPL_DIR, file));
    const isFunction = typeof tplModule === "function";

    // Determine which jurisdictions this template applies to
    const allowedJurisdictions = isFunction && tplModule.onlyJurisdictions
      ? tplModule.onlyJurisdictions
      : JURISDICTION_CODES;

    // Build a catalog entry for each jurisdiction
    for (const jCode of JURISDICTION_CODES) {
      if (!allowedJurisdictions.includes(jCode)) continue;

      const j   = JURISDICTIONS[jCode];
      const tpl = isFunction ? tplModule(j) : tplModule;

      // Collect merge fields (once per template — they don't change by jurisdiction for catalog purposes)
      const fields = collectTemplateFields(tpl);
      catalog.push({
        id:           tpl.id,
        slug:         tpl.slug,
        jurisdiction: jCode,
        kind:         tpl.kind,
        titleEN:      tpl.titleEN,
        titleFR:      tpl.titleFR,
        merge_fields: fields,
      });

      const jOutEN = path.join(OUT_ROOT, jCode, "EN");
      const jOutFR = path.join(OUT_ROOT, jCode, "FR");

      // ---------- English ----------
      if (tpl.bodyEN) {
        const enBase    = safeFilename(tpl, jCode, "EN");
        const enDocxPath = path.join(jOutEN, `${enBase}.docx`);
        const enHtmlPath = path.join(jOutEN, `${enBase}.html`);
        await renderDocx(tpl, "EN", enDocxPath);
        renderHtml(tpl, "EN", enHtmlPath);
        console.log(`  ✓ ${jCode}/EN/${enBase}.docx + .html`);
        docCount += 2;
      }

      // ---------- French ----------
      if (tpl.bodyFR) {
        const frBase    = safeFilename(tpl, jCode, "FR");
        const frDocxPath = path.join(jOutFR, `${frBase}.docx`);
        const frHtmlPath = path.join(jOutFR, `${frBase}.html`);
        await renderDocx(tpl, "FR", frDocxPath);
        renderHtml(tpl, "FR", frHtmlPath);
        console.log(`  ✓ ${jCode}/FR/${frBase}.docx + .html`);
        docCount += 2;
      }
    }
  }

  // Emit merge-field catalog
  fs.writeFileSync(
    path.join(OUT_ROOT, "FIELDS.json"),
    JSON.stringify(catalog, null, 2),
  );

  // Emit jurisdiction metadata for dashboard consumption
  const jMeta = JURISDICTION_CODES.map(code => ({
    code,
    nameEN: JURISDICTIONS[code].nameEN,
    nameFR: JURISDICTIONS[code].nameFR,
    statuteEN: JURISDICTIONS[code].statuteEN,
    statuteFR: JURISDICTIONS[code].statuteFR,
  }));
  fs.writeFileSync(
    path.join(OUT_ROOT, "JURISDICTIONS.json"),
    JSON.stringify(jMeta, null, 2),
  );

  console.log(`\n  ✓ FIELDS.json + JURISDICTIONS.json`);
  console.log(`\nTotal document files written: ${docCount}`);
  console.log(`Jurisdictions: ${JURISDICTION_CODES.join(", ")}`);
}

run().catch((err) => {
  console.error("Generator failed:", err);
  process.exit(1);
});
