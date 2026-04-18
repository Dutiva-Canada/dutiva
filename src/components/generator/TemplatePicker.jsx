import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MOST_USED_TEMPLATES,
  QUICK_ACTION_TEMPLATES,
  CATEGORY_ORDER,
  getTemplatesForCategory,
  TEMPLATE_META,
} from "../../lib/generatorSchema.js";

export default function TemplatePicker() {
  const [activeCategory, setActiveCategory] = useState("All Templates");
  const [query, setQuery] = useState("");

  const templates = getTemplatesForCategory(activeCategory, query);

  const renderCard = (template) => {
    const meta = TEMPLATE_META[template] || {};
    const isMostUsed = MOST_USED_TEMPLATES.includes(template);

    return (
      <Link
        key={template}
        to={`/app/generator?template=${encodeURIComponent(template)}`}
        className="premium-card p-4 hover:border-amber-400/30 transition"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-semibold text-zinc-100">
              {template}
            </div>
            {meta.hint && (
              <div className="text-xs text-zinc-400 mt-1">{meta.hint}</div>
            )}
          </div>

          {isMostUsed && (
            <div className="text-[10px] px-2 py-1 rounded-full bg-amber-400/10 text-amber-300">
              Most used
            </div>
          )}
        </div>
      </Link>
    );
  };

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-3">
          Most commonly used
        </h2>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MOST_USED_TEMPLATES.map(renderCard)}
        </div>
      </section>

      <section>
        <h3 className="text-sm uppercase tracking-wide text-zinc-400 mb-2">
          Quick actions
        </h3>
        <div className="grid gap-2 md:grid-cols-3">
          {QUICK_ACTION_TEMPLATES.map(renderCard)}
        </div>
      </section>

      <input
        type="text"
        placeholder="Search templates..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-sm text-zinc-100"
      />

      <div className="flex gap-2 flex-wrap">
        {CATEGORY_ORDER.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs ${
              activeCategory === cat
                ? "bg-amber-400/20 text-amber-300"
                : "bg-white/5 text-zinc-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {templates.map(renderCard)}
      </div>
    </div>
  );
}
