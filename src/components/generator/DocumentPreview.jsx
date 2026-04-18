import { renderTemplate } from "../../lib/generator/index.js";

function normalizeRenderedContent(result) {
  if (!result) return "Preview unavailable";
  if (typeof result === "string") return result;
  if (typeof result === "object" && typeof result.content === "string") return result.content;
  return "Preview unavailable";
}

export default function DocumentPreview({ template, data }) {
  if (!template) return null;

  let content = "";

  try {
    content = normalizeRenderedContent(renderTemplate(template, data));
  } catch (e) {
    content = "Preview unavailable";
  }

  return (
    <div className="premium-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Live preview
          </div>
          <div className="mt-1 text-sm font-medium text-zinc-100">
            {template}
          </div>
          <div className="mt-1 text-xs text-zinc-500">
            This document updates as you fill the form.
          </div>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          Draft preview
        </div>
      </div>

      <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
        <div className="text-sm font-medium text-emerald-300">
          This document is being prepared based on your selected template and inputs.
        </div>
        <div className="mt-1 text-xs text-zinc-400">
          Review carefully before using it in a real workplace situation.
        </div>
      </div>

      <div className="rounded-3xl border border-white/8 bg-[#0b0b0c] p-0 overflow-hidden">
        <div className="flex items-center justify-between border-b border-white/8 px-5 py-3">
          <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Document view
          </div>
          <div className="text-[10px] text-zinc-600">
            Generated in Dutiva
          </div>
        </div>

        <div className="max-h-[720px] overflow-auto px-6 py-6 md:px-8">
          <div className="mx-auto max-w-[720px] rounded-2xl border border-white/6 bg-white px-6 py-8 text-[13px] leading-7 text-zinc-900 shadow-[0_12px_40px_rgba(0,0,0,0.25)] md:px-10 md:py-10">
            <pre className="whitespace-pre-wrap font-sans text-[13px] leading-7 text-zinc-900">
              {content}
            </pre>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Why this helps
          </div>
          <div className="mt-2 text-sm text-zinc-300">
            Gives you a working draft faster, so you can focus on the decision and final review.
          </div>
        </div>

        <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Reminder
          </div>
          <div className="mt-2 text-sm text-zinc-300">
            Employment documents should always be reviewed for your facts, province, and risk level before final use.
          </div>
        </div>
      </div>
    </div>
  );
}
