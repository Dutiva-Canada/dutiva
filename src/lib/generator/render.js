// Dutiva — Browser-side template renderer
// Converts a template body array (structured blocks) into a plain-text /
// lightly-formatted string suitable for the GeneratorPage preview and for
// saving to Supabase `documents.content`. Keeps **bold** markdown markers
// so the preview can render them inline.
//
// The DOCX renderer in tools/templates-generator/render.js stays where it is
// for the server-side build pipeline.

function substituteMergeFields(text, values) {
  return text.replace(/\{\{([a-z0-9_]+)\}\}/g, (match, key) => {
    const v = values[key];
    return v === undefined || v === null || v === "" ? match : String(v);
  });
}

function blockToText(block, values) {
  const sub = (s) => substituteMergeFields(s, values);
  switch (block.type) {
    case "date":
      return new Date().toLocaleDateString("en-CA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "address":
      return (block.lines || []).map(sub).join("\n");
    case "re":
      return `Re: ${sub(block.text)}`;
    case "h1":
      return `\n${sub(block.text).toUpperCase()}\n`;
    case "h2":
      return `\n${sub(block.text)}\n`;
    case "h3":
      return `\n${sub(block.text)}\n`;
    case "p":
      return sub(block.text);
    case "bullet":
      return `  • ${sub(block.text)}`;
    case "quote":
      return `> ${sub(block.text)}`;
    case "spacer":
      return "";
    case "signoff":
      return `\n${sub(block.closing || "Sincerely,")}`;
    case "sig":
      return "\n_______________________________\n{{signer_name}}\n{{signer_title}}\n{{employer_legal_name}}";
    default:
      return block.text ? sub(block.text) : "";
  }
}

export function renderBody(bodyArray, values) {
  if (!Array.isArray(bodyArray)) return "";
  return bodyArray
    .filter(Boolean)
    .map((block) => blockToText(block, values))
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Collect all merge fields referenced anywhere in a body (for intake schema)
export function collectMergeFields(bodyArray) {
  const found = new Set();
  const walk = (text) => {
    const re = /\{\{([a-z0-9_]+)\}\}/g;
    let m;
    while ((m = re.exec(text)) !== null) found.add(m[1]);
  };
  (bodyArray || []).forEach((block) => {
    if (!block) return;
    if (block.text) walk(block.text);
    if (block.lines) block.lines.forEach(walk);
  });
  return Array.from(found);
}
