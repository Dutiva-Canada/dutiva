import { useState } from "react";
import { Link } from "react-router-dom";

export default function GeneratorPage() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Generator
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Document builder
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-400">
          This page has been temporarily restored to a safe version so the app can deploy cleanly.
        </p>
      </div>

      <section className="premium-card p-6">
        <label className="mb-2 block text-sm font-medium text-zinc-300">
          Draft content
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your draft..."
          className="min-h-[280px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-[16px] text-zinc-100 outline-none"
        />

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            Save draft
          </button>

          <Link
            to="/app/templates"
            className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
          >
            Back to templates
          </Link>
        </div>
      </section>
    </div>
  );
}
