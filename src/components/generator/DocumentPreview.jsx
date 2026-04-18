import { renderTemplate } from "../../lib/generator/index.js";

export default function DocumentPreview({ template, data }) {
  if (!template) return null;

  let content = "";

  try {
    content = renderTemplate(template, data);
  } catch (e) {
    content = "Preview unavailable";
  }

  return (
    <div className="premium-card p-5 space-y-3">
      <div className="text-xs text-emerald-300">
        Live preview
      </div>

      <div className="text-sm text-zinc-400">
        {template}
      </div>

      <div className="text-xs text-zinc-500">
        This document updates as you fill the form.
      </div>

      <pre className="text-xs bg-black/30 p-4 rounded overflow-auto whitespace-pre-wrap leading-relaxed">
        {content}
      </pre>
    </div>
  );
}
