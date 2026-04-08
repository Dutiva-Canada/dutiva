import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronRight,
  FileText,
  Search,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Link } from "react-router-dom";

const templateCategories = [
  { id: "all", label: "All templates" },
  { id: "hiring", label: "Hiring" },
  { id: "policy", label: "Policy" },
  { id: "termination", label: "Termination" },
  { id: "discipline", label: "Discipline" },
  { id: "quebec", label: "Quebec" },
];

const templateData = [
  {
    id: 1,
    title: "Employment Agreement",
    category: "hiring",
    jurisdiction: "Canada-ready",
    description: "Create a structured employment agreement with clear compensation, role, and terms.",
  },
  {
    id: 2,
    title: "Offer Letter",
    category: "hiring",
    jurisdiction: "Province-specific",
    description: "Generate a clean, export-ready offer letter aligned with the employee's province.",
  },
  {
    id: 3,
    title: "Termination Letter",
    category: "termination",
    jurisdiction: "Province-specific",
    description: "Generate an ESA-compliant termination letter with statutory notice, severance calculations, and final pay entitlements.",
  },
  {
    id: 4,
    title: "Employee Handbook",
    category: "policy",
    jurisdiction: "Canada-ready",
    description: "Generate a complete employee handbook covering conduct, hours, leave, health & safety, and discipline — adapted to your province.",
  },
  {
    id: 5,
    title: "Confidentiality Agreement",
    category: "policy",
    jurisdiction: "Canada-ready",
    description: "Protect confidential information with a polished standalone agreement.",
  },
  {
    id: 6,
    title: "Written Warning",
    category: "discipline",
    jurisdiction: "Province-specific",
    description: "Issue a formal written warning with incident description, corrective action required, and a clear escalation path.",
  },
  {
    id: 7,
    title: "Independent Contractor Agreement",
    category: "hiring",
    jurisdiction: "Canada-ready",
    description: "Define scope, rate, and deliverables for an independent contractor engagement.",
  },
  {
    id: 8,
    title: "Non-Compete Agreement",
    category: "hiring",
    jurisdiction: "Province-specific",
    description: "Establish post-employment non-compete and non-solicitation terms within provincial limits.",
  },
  {
    id: 9,
    title: "Offer Letter (French/Quebec)",
    category: "hiring",
    jurisdiction: "Quebec",
    description: "Generate a bilingual offer letter aligned with Quebec's Charter of the French Language.",
  },
  {
    id: 10,
    title: "Remote Work Policy",
    category: "policy",
    jurisdiction: "Canada-ready",
    description: "Outline expectations, equipment, and eligibility criteria for remote and hybrid work arrangements.",
  },
  {
    id: 11,
    title: "Vacation & Leave Policy",
    category: "policy",
    jurisdiction: "Province-specific",
    description: "Document statutory minimum leave entitlements by province with company-specific enhancements.",
  },
  {
    id: 12,
    title: "Code of Conduct",
    category: "policy",
    jurisdiction: "Canada-ready",
    description: "Set clear workplace behaviour standards, reporting expectations, and consequences.",
  },
  {
    id: 13,
    title: "Anti-Harassment Policy",
    category: "policy",
    jurisdiction: "Canada-ready",
    description: "Create a compliant anti-harassment and discrimination policy covering all protected grounds.",
  },
  {
    id: 14,
    title: "Resignation Acceptance Letter",
    category: "termination",
    jurisdiction: "Canada-ready",
    description: "Formally acknowledge and accept an employee's resignation with offboarding next steps.",
  },
  {
    id: 15,
    title: "Layoff / WARN Notice",
    category: "termination",
    jurisdiction: "Province-specific",
    description: "Issue a compliant mass layoff or individual notice aligned with provincial ESA requirements.",
  },
  {
    id: 16,
    title: "Performance Improvement Plan (PIP)",
    category: "discipline",
    jurisdiction: "Province-specific",
    description: "Document performance gaps, measurable goals, timelines, and consequences in a structured PIP.",
  },
];

function SectionCard({ title, children, action }) {
  return (
    <section className="premium-card p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function FilterPill({ active, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "rounded-full px-4 py-2 text-sm font-medium transition",
        active
          ? "border border-amber-400/25 bg-amber-400/10 text-amber-300"
          : "border border-white/8 bg-white/[0.02] text-zinc-300 hover:bg-white/[0.04]",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function TemplateCard({ template, selected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(template)}
      className={[
        "group w-full rounded-[24px] border p-5 text-left transition",
        selected
          ? "border-amber-400/25 bg-amber-400/[0.06]"
          : "border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
            <FileText className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <div className="text-base font-semibold text-zinc-100">{template.title}</div>
            <div className="mt-2 text-sm leading-6 text-zinc-400">{template.description}</div>
          </div>
        </div>

        <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-zinc-500 transition group-hover:text-zinc-300" />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">
          {template.jurisdiction}
        </span>
        <span className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium capitalize text-amber-300">
          {template.category}
        </span>
      </div>
    </button>
  );
}

export default function Templates() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [selected, setSelected] = useState(templateData[0] ?? null);
  const categorySectionRef = useRef(null);

  const filteredTemplates = useMemo(() => {
    return templateData.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        q.length === 0 ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  useEffect(() => {
    if (filteredTemplates.length === 0) {
      setSelected(null);
      return;
    }

    setSelected((current) =>
      current && filteredTemplates.some((item) => item.id === current.id)
        ? current
        : filteredTemplates[0],
    );
  }, [filteredTemplates]);

  const generatorLink = selected
    ? `/app/generator?template=${encodeURIComponent(selected.title)}`
    : "/app/generator";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Templates
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Generate documents
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            16 bilingual templates covering every Canadian province. Select a template, fill in your details, and export a compliant document in minutes.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => categorySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="ghost-button px-4 py-3 text-sm"
          >
            Browse categories
          </button>
          <Link to={generatorLink} className="gold-button px-5 py-3 text-sm">
            New generation
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="premium-card-soft p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Templates
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            16
          </div>
          <div className="mt-1 text-sm text-zinc-400">Bilingual document templates</div>
        </div>

        <div className="premium-card-soft p-5">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Coverage
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            14
          </div>
          <div className="mt-1 text-sm text-zinc-400">Canadian jurisdictions supported</div>
        </div>

        <div className="premium-card-soft p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Workflow
            </div>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-amber-300">
            Guided
          </div>
          <div className="mt-1 text-sm text-zinc-400">AI-assisted form filling</div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionCard
            title="Browse template library"
            action={
              <div className="rounded-full border border-amber-400/10 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                Core product
              </div>
            }
          >
            <div className="relative mb-4">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-amber-400/20"
              />
            </div>

            <div ref={categorySectionRef} className="mb-5 flex flex-wrap gap-2">
              {templateCategories.map((item) => (
                <FilterPill
                  key={item.id}
                  label={item.label}
                  active={category === item.id}
                  onClick={() => setCategory(item.id)}
                />
              ))}
            </div>

            <div className="space-y-3">
              {filteredTemplates.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] px-5 py-8 text-center text-sm text-zinc-400">
                  No templates match that search yet. Clear the filters to browse the full library.
                </div>
              ) : (
                filteredTemplates.map((template) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    selected={selected?.id === template.id}
                    onSelect={setSelected}
                  />
                ))
              )}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Selected template">
            <div className="rounded-[24px] border border-white/6 bg-white/[0.02] p-5">
              {selected ? (
                <>
                  <div className="flex items-start gap-4">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                      <FileText className="h-5 w-5" />
                    </div>

                    <div>
                      <div className="text-lg font-semibold text-zinc-100">{selected.title}</div>
                      <div className="mt-2 text-sm leading-6 text-zinc-400">{selected.description}</div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                      <ShieldCheck className="h-5 w-5 text-emerald-300" />
                      <div>
                        <div className="text-sm font-medium text-zinc-100">Province-specific compliance</div>
                        <div className="text-sm text-zinc-400">
                          Every template cites the applicable Employment Standards Act for your jurisdiction.
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                      <Wand2 className="h-5 w-5 text-amber-300" />
                      <div>
                        <div className="text-sm font-medium text-zinc-100">AI-assisted form filling</div>
                        <div className="text-sm text-zinc-400">
                          Answer a few questions about the employee and situation — the document fills itself.
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3">
                    <Link
                      to={generatorLink}
                      className="gold-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm"
                    >
                      Generate document
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/app/generator"
                      className="ghost-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm"
                    >
                      Open blank builder
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </>
              ) : (
                <div className="rounded-[24px] border border-dashed border-white/10 bg-white/[0.02] px-5 py-8 text-center text-sm text-zinc-400">
                  Select a template or clear the filters to continue into the generator.
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Compliance reference">
            <div className="space-y-3 text-sm">
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="font-medium text-zinc-100">14 jurisdictions covered</div>
                <div className="mt-1 text-zinc-400">ON · QC · BC · AB · MB · SK · NS · NB · NL · PEI · NT · NU · YT · Federal</div>
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="font-medium text-zinc-100">English and French</div>
                <div className="mt-1 text-zinc-400">All 16 templates available in both official languages. Quebec templates reference the Charte de la langue française.</div>
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="font-medium text-zinc-100">Not legal advice</div>
                <div className="mt-1 text-zinc-400">Dutiva provides general HR compliance guidance and document templates. For specific legal situations, consult a qualified employment lawyer in your province.</div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
