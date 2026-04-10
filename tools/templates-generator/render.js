// Dutiva — Generator-tool render engine.
// Takes a lean template module with a single ordered `body` array and produces
// BOTH a clean .docx and an .html version of the same document.
// No cover pages, no guidance pages, no Schedule A, no citations appendix —
// just the document, with {{snake_case}} merge fields highlighted so the
// dashboard generator can substitute them at render time.

const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, LevelFormat,
  PageBreak, TabStopType, TabStopPosition, Header, Footer, PageNumber,
} = require("docx");

// ---------------------------------------------------------------------------
// Typography: deliberately neutral. These documents will be rebranded by each
// employer when they use the generator, so no Dutiva colours, no flourishes.
// ---------------------------------------------------------------------------
const FONT = "Calibri";
const BLACK = "000000";
const GRAY = "555555";
const MF_COLOR = "1F6FEB"; // merge-field highlight colour

// ---------------------------------------------------------------------------
// Inline parser: handles **bold** and {{merge_field}} markers.
// ---------------------------------------------------------------------------
function splitInline(text) {
  // splits on either **..** or {{...}}, keeps delimiters
  return text.split(/(\*\*[^*]+\*\*|\{\{[a-z0-9_]+\}\})/g).filter(Boolean);
}

function renderInlineRuns(text, opts = {}) {
  const parts = splitInline(text);
  const runs = [];
  for (const p of parts) {
    if (p.startsWith("**") && p.endsWith("**")) {
      runs.push(new TextRun({
        text: p.slice(2, -2),
        bold: true,
        font: FONT,
        size: opts.size || 22,
        color: opts.color || BLACK,
      }));
    } else if (p.startsWith("{{") && p.endsWith("}}")) {
      runs.push(new TextRun({
        text: p,
        italics: true,
        font: FONT,
        size: opts.size || 22,
        color: MF_COLOR,
      }));
    } else {
      runs.push(new TextRun({
        text: p,
        font: FONT,
        size: opts.size || 22,
        color: opts.color || BLACK,
      }));
    }
  }
  return runs;
}

// Collect merge fields from a string — used by the generator to emit FIELDS.json
function collectMergeFields(text) {
  const out = [];
  const re = /\{\{([a-z0-9_]+)\}\}/g;
  let m;
  while ((m = re.exec(text)) !== null) out.push(m[1]);
  return out;
}

// ---------------------------------------------------------------------------
// DOCX rendering — one function per block type.
// ---------------------------------------------------------------------------
function blockToDocx(block) {
  switch (block.type) {
    case "h1":
      return [new Paragraph({
        children: [new TextRun({
          text: block.text, bold: true, font: FONT, size: 36, color: BLACK,
        })],
        spacing: { before: 200, after: 240, line: 320 },
        alignment: block.align === "center" ? AlignmentType.CENTER : AlignmentType.LEFT,
      })];

    case "h2":
      return [new Paragraph({
        children: [new TextRun({
          text: block.text, bold: true, font: FONT, size: 26, color: BLACK,
        })],
        spacing: { before: 320, after: 140, line: 300 },
      })];

    case "h3":
      return [new Paragraph({
        children: [new TextRun({
          text: block.text, bold: true, font: FONT, size: 22, color: BLACK,
        })],
        spacing: { before: 200, after: 80, line: 280 },
      })];

    case "date":
      return [new Paragraph({
        children: renderInlineRuns("{{document_date}}"),
        spacing: { before: 80, after: 240, line: 280 },
        alignment: AlignmentType.LEFT,
      })];

    case "address":
      // Address block — one paragraph per line, tight spacing
      return block.lines.map(line => new Paragraph({
        children: renderInlineRuns(line),
        spacing: { before: 0, after: 20, line: 260 },
      }));

    case "re":
      return [new Paragraph({
        children: [new TextRun({ text: "Re: ", bold: true, font: FONT, size: 22 }),
                   ...renderInlineRuns(block.text)],
        spacing: { before: 240, after: 200, line: 280 },
      })];

    case "p":
      return [new Paragraph({
        children: renderInlineRuns(block.text),
        spacing: { before: 100, after: 100, line: 300 },
        alignment:
          block.align === "right" ? AlignmentType.RIGHT :
          block.align === "center" ? AlignmentType.CENTER :
          block.align === "justify" ? AlignmentType.JUSTIFIED :
          AlignmentType.LEFT,
      })];

    case "bullet":
      return [new Paragraph({
        numbering: { reference: "gbullets", level: 0 },
        children: renderInlineRuns(block.text),
        spacing: { before: 40, after: 40, line: 280 },
      })];

    case "numbered":
      return [new Paragraph({
        numbering: { reference: "gnumbered", level: 0 },
        children: renderInlineRuns(block.text),
        spacing: { before: 60, after: 60, line: 280 },
      })];

    case "quote":
      return [new Paragraph({
        children: renderInlineRuns(block.text),
        spacing: { before: 120, after: 120, line: 280 },
        indent: { left: 400, right: 400 },
        border: {
          left: { style: BorderStyle.SINGLE, size: 12, color: GRAY, space: 12 },
        },
      })];

    case "spacer":
      return [new Paragraph({
        children: [new TextRun({ text: " ", font: FONT, size: 22 })],
        spacing: { before: 80, after: 80 },
      })];

    case "signoff":
      return [
        new Paragraph({
          children: [new TextRun({ text: block.closing || "Sincerely,", font: FONT, size: 22 })],
          spacing: { before: 240, after: 360, line: 280 },
        }),
        new Paragraph({
          children: renderInlineRuns("{{employer_signer_name}}"),
          spacing: { before: 0, after: 20, line: 260 },
        }),
        new Paragraph({
          children: renderInlineRuns("{{employer_signer_title}}"),
          spacing: { before: 0, after: 20, line: 260 },
        }),
        new Paragraph({
          children: renderInlineRuns("{{employer_legal_name}}"),
          spacing: { before: 0, after: 240, line: 260 },
        }),
      ];

    case "sig": {
      const labelE = block.leftLabel || "EMPLOYER";
      const labelW = block.rightLabel || "EMPLOYEE";
      const cell = (label, nameKey, titleKey) => new TableCell({
        width: { size: 4680, type: WidthType.DXA },
        borders: {
          top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
          right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
        },
        margins: { top: 200, bottom: 200, left: 100, right: 100 },
        children: [
          new Paragraph({
            children: [new TextRun({ text: "______________________________________", font: FONT, size: 22 })],
            spacing: { before: 400, after: 60 },
          }),
          new Paragraph({
            children: renderInlineRuns(`Signature — {{${nameKey}}}`),
            spacing: { before: 0, after: 40 },
          }),
          new Paragraph({
            children: renderInlineRuns(`{{${titleKey}}}`),
            spacing: { before: 0, after: 60 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: "Date: ", font: FONT, size: 22 }),
              ...renderInlineRuns(`{{${block.dateKey || (nameKey.startsWith("employer") ? "employer_signature_date" : "employee_signature_date")}}}`),
            ],
            spacing: { before: 40, after: 80 },
          }),
          new Paragraph({
            children: [new TextRun({ text: label, bold: true, font: FONT, size: 20, color: GRAY })],
            spacing: { before: 0, after: 0 },
          }),
        ],
      });
      return [new Table({
        width: { size: 9360, type: WidthType.DXA },
        columnWidths: [4680, 4680],
        rows: [new TableRow({ children: [
          cell(labelE, block.leftName || "employer_signer_name", block.leftTitle || "employer_signer_title"),
          cell(labelW, block.rightName || "employee_name", block.rightTitle || "employee_position"),
        ]})],
      })];
    }

    case "pagebreak":
      return [new Paragraph({ children: [new PageBreak()] })];

    default:
      return [];
  }
}

// ---------------------------------------------------------------------------
// HTML rendering — escape, then apply inline replacements. Consecutive bullet
// blocks collapse into one <ul>.
// ---------------------------------------------------------------------------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
function renderInlineHtml(text) {
  return escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\{\{([a-z0-9_]+)\}\}/g, '<span class="mf">{{$1}}</span>');
}

function blockToHtml(block) {
  switch (block.type) {
    case "h1":
      return `<h1${block.align === "center" ? ' class="center"' : ""}>${renderInlineHtml(block.text)}</h1>`;
    case "h2":
      return `<h2>${renderInlineHtml(block.text)}</h2>`;
    case "h3":
      return `<h3>${renderInlineHtml(block.text)}</h3>`;
    case "date":
      return `<p class="date">${renderInlineHtml("{{document_date}}")}</p>`;
    case "address":
      return `<address>${block.lines.map(l => renderInlineHtml(l)).join("<br>")}</address>`;
    case "re":
      return `<p class="re"><strong>Re:</strong> ${renderInlineHtml(block.text)}</p>`;
    case "p": {
      const cls = block.align ? ` class="${block.align}"` : "";
      return `<p${cls}>${renderInlineHtml(block.text)}</p>`;
    }
    case "bullet":
      return `<li>${renderInlineHtml(block.text)}</li>`;
    case "numbered":
      return `<li class="num">${renderInlineHtml(block.text)}</li>`;
    case "quote":
      return `<blockquote>${renderInlineHtml(block.text)}</blockquote>`;
    case "spacer":
      return `<div class="spacer">&nbsp;</div>`;
    case "signoff":
      return [
        `<p class="signoff-closing">${escapeHtml(block.closing || "Sincerely,")}</p>`,
        `<p class="signoff-name">${renderInlineHtml("{{employer_signer_name}}")}</p>`,
        `<p class="signoff-line">${renderInlineHtml("{{employer_signer_title}}")}</p>`,
        `<p class="signoff-line">${renderInlineHtml("{{employer_legal_name}}")}</p>`,
      ].join("");
    case "sig": {
      const labelE = block.leftLabel || "EMPLOYER";
      const labelW = block.rightLabel || "EMPLOYEE";
      const leftName = block.leftName || "employer_signer_name";
      const leftTitle = block.leftTitle || "employer_signer_title";
      const rightName = block.rightName || "employee_name";
      const rightTitle = block.rightTitle || "employee_position";
      const leftDate = block.leftDate || "employer_signature_date";
      const rightDate = block.rightDate || "employee_signature_date";
      const cell = (lbl, nk, tk, dk) => `
        <td>
          <div class="sig-line">______________________________________</div>
          <div class="sig-under">Signature — <span class="mf">{{${nk}}}</span></div>
          <div class="sig-under"><span class="mf">{{${tk}}}</span></div>
          <div class="sig-under">Date: <span class="mf">{{${dk}}}</span></div>
          <div class="sig-label">${escapeHtml(lbl)}</div>
        </td>`;
      return `<table class="sig"><tr>${cell(labelE, leftName, leftTitle, leftDate)}${cell(labelW, rightName, rightTitle, rightDate)}</tr></table>`;
    }
    case "pagebreak":
      return `<div class="pagebreak"></div>`;
    default:
      return "";
  }
}

function bodyToHtml(body) {
  // Group consecutive `bullet` into <ul>, consecutive `numbered` into <ol>
  const out = [];
  let listType = null;
  let listBuf = [];
  function flush() {
    if (!listType) return;
    if (listType === "ul") out.push(`<ul>${listBuf.join("")}</ul>`);
    else out.push(`<ol>${listBuf.join("")}</ol>`);
    listType = null;
    listBuf = [];
  }
  for (const b of body) {
    if (b.type === "bullet") {
      if (listType !== "ul") flush();
      listType = "ul";
      listBuf.push(blockToHtml(b));
    } else if (b.type === "numbered") {
      if (listType !== "ol") flush();
      listType = "ol";
      listBuf.push(blockToHtml(b));
    } else {
      flush();
      out.push(blockToHtml(b));
    }
  }
  flush();
  return out.join("\n");
}

// ---------------------------------------------------------------------------
// Full HTML wrapper — lean, print-friendly CSS.
// ---------------------------------------------------------------------------
function wrapHtml(tpl, lang, bodyHtml) {
  const title = lang === "FR" ? tpl.titleFR : tpl.titleEN;
  const escTitle = escapeHtml(title);
  const langAttr = lang === "FR" ? "fr-CA" : "en-CA";
  return `<!doctype html>
<html lang="${langAttr}">
<head>
<meta charset="utf-8">
<title>${escTitle}</title>
<meta name="generator" content="Dutiva">
<meta name="template-id" content="${tpl.id}">
<meta name="template-kind" content="${tpl.kind}">
<style>
  @page { size: letter; margin: 1in; }
  body { font-family: Calibri, "Segoe UI", Arial, sans-serif; color: #000; max-width: 8.5in; margin: 0 auto; padding: 1in; line-height: 1.5; font-size: 11pt; background: #fff; }
  h1 { font-size: 20pt; font-weight: 700; margin: 0 0 16pt; }
  h1.center { text-align: center; }
  h2 { font-size: 13pt; font-weight: 700; margin: 18pt 0 8pt; }
  h3 { font-size: 11.5pt; font-weight: 700; margin: 14pt 0 6pt; }
  p { margin: 6pt 0; text-align: left; }
  p.right { text-align: right; }
  p.center { text-align: center; }
  p.justify { text-align: justify; }
  p.date { margin: 0 0 18pt; }
  p.re { margin: 16pt 0 14pt; }
  address { font-style: normal; display: block; margin: 0 0 14pt; line-height: 1.35; }
  ul, ol { margin: 6pt 0 10pt 24pt; padding: 0; }
  li { margin: 3pt 0; }
  blockquote { margin: 10pt 0; padding: 4pt 12pt; border-left: 3px solid #888; color: #222; }
  .spacer { height: 8pt; }
  .mf { color: #1f6feb; font-style: italic; font-weight: 500; background: #eef4ff; padding: 0 2pt; border-radius: 2px; }
  .signoff-closing { margin-top: 18pt; }
  .signoff-name { margin-top: 36pt; margin-bottom: 0; }
  .signoff-line { margin: 0; }
  table.sig { width: 100%; border-collapse: collapse; margin-top: 24pt; }
  table.sig td { width: 50%; padding: 20pt 12pt 6pt; vertical-align: top; }
  .sig-line { margin-top: 30pt; }
  .sig-under { margin: 2pt 0; font-size: 10pt; color: #333; }
  .sig-label { margin-top: 10pt; font-size: 9.5pt; font-weight: 700; color: #555; letter-spacing: 0.5px; }
  .pagebreak { page-break-after: always; height: 0; }
  @media print {
    body { max-width: none; margin: 0; padding: 0; }
    .mf { background: none; }
  }
</style>
</head>
<body>
${bodyHtml}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Shared docx page setup / numbering
// ---------------------------------------------------------------------------
const pageProps = {
  page: {
    size: { width: 12240, height: 15840 }, // letter
    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 },
  },
};

const numbering = {
  config: [
    { reference: "gbullets", levels: [{
      level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 640, hanging: 320 } } },
    }]},
    { reference: "gnumbered", levels: [{
      level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 640, hanging: 320 } } },
    }]},
  ],
};

const baseStyles = {
  default: { document: { run: { font: FONT, size: 22 } } },
};

// Footer shows document id and page number — minimal, no Dutiva branding.
function buildFooter(tpl, lang) {
  const pageLbl = lang === "FR" ? "Page " : "Page ";
  const ofLbl  = lang === "FR" ? " de "   : " of ";
  return new Footer({
    children: [new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [
        new TextRun({ text: `${tpl.id} · `, font: FONT, size: 16, color: GRAY }),
        new TextRun({ text: pageLbl, font: FONT, size: 16, color: GRAY }),
        new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 16, color: GRAY }),
        new TextRun({ text: ofLbl, font: FONT, size: 16, color: GRAY }),
        new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 16, color: GRAY }),
      ],
    })],
  });
}

// ---------------------------------------------------------------------------
// Legal Notes appendix — appended to .docx only; never rendered in HTML.
// Each note: { heading: "...", body: "..." }
// ---------------------------------------------------------------------------
function buildLegalNotesDocx(notes, lang) {
  const NOTE_COLOR = "666666";
  const NOTE_SIZE = 18;   // 9pt (half-points)
  const HEAD_SIZE = 20;   // 10pt

  const isEN = lang !== "FR";
  const sectionTitle = isEN
    ? "LEGAL NOTES — FOR COUNSEL REVIEW ONLY"
    : "NOTES JURIDIQUES — RÉSERVÉES AUX CONSEILLERS JURIDIQUES";
  const disclaimer = isEN
    ? "This section is intended for employer and legal counsel use only. It does not form part of the employee-facing document. Delete this page before providing this document to the employee or any third party."
    : "La présente section est destinée à l'employeur et à ses conseillers juridiques uniquement. Elle ne fait pas partie du document remis à la personne salariée. Supprimez cette page avant de transmettre ce document à la personne salariée ou à tout tiers.";

  const paras = [];

  // Page break
  paras.push(new Paragraph({ children: [new PageBreak()] }));

  // Section title
  paras.push(new Paragraph({
    children: [new TextRun({
      text: sectionTitle,
      font: FONT, size: HEAD_SIZE + 2, bold: true,
      color: NOTE_COLOR, allCaps: true,
    })],
    spacing: { before: 0, after: 160 },
  }));

  // Horizontal rule via border
  paras.push(new Paragraph({
    children: [],
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" } },
    spacing: { before: 0, after: 160 },
  }));

  // Disclaimer
  paras.push(new Paragraph({
    children: [new TextRun({ text: disclaimer, font: FONT, size: NOTE_SIZE, italics: true, color: NOTE_COLOR })],
    spacing: { after: 240 },
  }));

  // Individual notes
  for (const note of notes) {
    if (note.heading) {
      paras.push(new Paragraph({
        children: [new TextRun({ text: note.heading, font: FONT, size: HEAD_SIZE, bold: true, color: "444444" })],
        spacing: { before: 200, after: 60 },
      }));
    }
    if (note.body) {
      // Support **bold** markers in note bodies
      paras.push(new Paragraph({
        children: renderInlineRuns(note.body, { size: NOTE_SIZE, color: NOTE_COLOR }),
        spacing: { after: 120 },
      }));
    }
  }

  return paras;
}

// ---------------------------------------------------------------------------
// Top-level render functions
// ---------------------------------------------------------------------------
async function renderDocx(tpl, lang, outPath) {
  const body = lang === "FR" ? tpl.bodyFR : tpl.bodyEN;
  const children = [];
  for (const block of body) {
    children.push(...blockToDocx(block));
  }

  // Append legal notes appendix (docx only — never in HTML)
  const notes = lang === "FR" ? tpl.legalNotesFR : tpl.legalNotesEN;
  if (notes && notes.length > 0) {
    children.push(...buildLegalNotesDocx(notes, lang));
  }

  const title = lang === "FR" ? tpl.titleFR : tpl.titleEN;
  const doc = new Document({
    creator: "Dutiva",
    title,
    description: `Dutiva generator template — ${tpl.id} (${lang})`,
    styles: baseStyles,
    numbering,
    sections: [{
      properties: pageProps,
      footers: { default: buildFooter(tpl, lang) },
      children,
    }],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(outPath, buf);
  return { path: outPath, bytes: buf.length };
}

function renderHtml(tpl, lang, outPath) {
  // legalNotesEN/FR are deliberately excluded — HTML is the employee-facing preview.
  const body = lang === "FR" ? tpl.bodyFR : tpl.bodyEN;
  const html = wrapHtml(tpl, lang, bodyToHtml(body));
  fs.writeFileSync(outPath, html, "utf8");
  return { path: outPath, bytes: Buffer.byteLength(html, "utf8") };
}

// Collect every {{merge_field}} used by a template, per language.
function collectTemplateFields(tpl) {
  const seen = new Set();
  function scanBlocks(blocks) {
    for (const b of blocks) {
      if (b.text) collectMergeFields(b.text).forEach(f => seen.add(f));
      if (b.lines) b.lines.forEach(l => collectMergeFields(l).forEach(f => seen.add(f)));
      if (b.type === "date") seen.add("document_date");
      if (b.type === "signoff") { seen.add("employer_signer_name"); seen.add("employer_signer_title"); seen.add("employer_legal_name"); }
      if (b.type === "sig") {
        seen.add(b.leftName || "employer_signer_name");
        seen.add(b.leftTitle || "employer_signer_title");
        seen.add(b.leftDate || "employer_signature_date");
        seen.add(b.rightName || "employee_name");
        seen.add(b.rightTitle || "employee_position");
        seen.add(b.rightDate || "employee_signature_date");
      }
    }
  }
  if (tpl.bodyEN) scanBlocks(tpl.bodyEN);
  if (tpl.bodyFR) scanBlocks(tpl.bodyFR);
  return Array.from(seen).sort();
}

module.exports = {
  renderDocx,
  renderHtml,
  collectTemplateFields,
};
