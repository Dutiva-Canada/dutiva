import { useState } from "react";
import { Link } from "react-router-dom";

const MOST_USED = [
  "Offer Letter",
  "Employment Agreement",
  "Termination Letter",
  "Independent Contractor Agreement",
];

const QUICK_ACTIONS = [
  "Performance Improvement Plan (PIP)",
  "Written Warning",
  "Confidentiality Agreement",
];

const TEMPLATE_CATEGORIES = {
  Hiring: [
    "Offer Letter",
    "Employment Agreement",
    "Independent Contractor Agreement",
  ],
  Discipline: [
    "Performance Improvement Plan (PIP)",
    "Written Warning",
  ],
  Termination: ["Termination Letter"],
  Policy: [
    "Confidentiality Agreement",
    "Anti-Harassment Policy",
    "Code of Conduct",
    "Vacation & Leave Policy",
    "Remote Work Policy",
    "Sick Days & Medical Leave Policy",
  ],
};

const ALL_TEMPLATES = Object.values(TEMPLATE_CATEGORIES).flat();

const CATEGORY_ORDER = [
  "All Templates",
  "Hiring",
  "Policy",
  "Discipline",
  "Termination",
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState("All Templates");
  const [query, setQuery] = useState("");

  const getTemplates = () => {
    let templates =
      activeCategory === "All Templates"
        ? ALL_TEMPLATES
        : TEMPLATE_CATEGORIES[activeCategory] || [];

    if (query) {
      templates = templates.filter((t) =>
        t.toLowerCase().includes(query.toLowerCase())
      );
    }

    return templates;
  };

  const renderCard = (template) => {
    const isMostUsed = MOST_USED.includes(template);

    return (
      <Link
        key={template}
        to={`/app/generator?template=${encodeURIComponent(template)}`}
        className="premium-card p-4 hover:border-amber-400/30 transition"
      >
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold text-zinc-100">
            {template}
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
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold text-zinc-50">
          Templates
        </h1>
        <p className="text-zinc-400 mt-2 text-sm">
          Generate compliant HR documents in minutes.
        </p>
      </div>

      {/* MOST USED */}
      <section>
        <h2 className="text-lg font-semibold text-zinc-100 mb-3">
          Most commonly used
        </h2>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {MOST_USED.map(renderCard)}
        </div>
      </section>

      {/* QUICK ACTIONS */}
      <section>
        <h3 className="text-sm uppercase tracking-wide text-zinc-400 mb-2">
          Quick actions
        </h3>

        <div className="grid gap-2 md:grid-cols-3">
          {QUICK_ACTIONS.map(renderCard)}
        </div>
      </section>

      {/* SEARCH */}
      <div>
        <input
          type="text"
          placeholder="Search templates..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-white/10 text-sm text-zinc-100"
        />
      </div>

      {/* CATEGORY TABS */}
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

      {/* TEMPLATE GRID */}
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {getTemplates().map(renderCard)}
      </div>

      {/* POLICIES SECTION */}
      <section>
        <h3 className="text-lg font-semibold text-zinc-100 mt-6 mb-3">
          Policies
        </h3>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {TEMPLATE_CATEGORIES.Policy.map(renderCard)}
        </div>
      </section>
    </div>
  );
}
