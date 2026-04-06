import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const templateOptions = [
  "Employment Agreement",
  "Offer Letter",
  "Termination Letter",
  "Employee Handbook",
  "Confidentiality Agreement",
  "Written Warning",
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

function StepPill({ active, done, label, index }) {
  return (
    <div
      className={[
        "flex items-center gap-3 rounded-full px-4 py-2 text-sm font-medium",
        active
          ? "border border-amber-400/20 bg-amber-400/10 text-amber-300"
          : done
          ? "border border-emerald-400/15 bg-emerald-400/8 text-emerald-300"
          : "border border-white/8 bg-white/[0.03] text-zinc-400",
      ].join(" ")}
    >
      <div
        className={[
          "grid h-6 w-6 place-items-center rounded-full text-xs",
          active
            ? "bg-amber-400/15 text-amber-300"
            : done
            ? "bg-emerald-400/15 text-emerald-300"
            : "bg-white/[0.05] text-zinc-500",
        ].join(" ")}
      >
        {done ? <CheckCircle2 className="h-3.5 w-3.5" /> : index}
      </div>
      {label}
    </div>
  );
}

export default function GeneratorPage() {
  const [searchParams] = useSearchParams();
  const [template, setTemplate] = useState("Offer Letter");
  const [form, setForm] = useState({
    companyName: "Dutiva Canada",
    jurisdiction: "Ontario",
    employeeName: "Sarah Chen",
    jobTitle: "Marketing Coordinator",
    salary: "$52,000",
    startDate: "2026-05-01",
    manager: "David Park",
    notes: "Three-month probation. Full-time. Bi-weekly pay.",
  });

  useEffect(() => {
    const incomingTemplate = searchParams.get("template");
    if (incomingTemplate && templateOptions.includes(incomingTemplate)) {
      setTemplate(incomingTemplate);
    }
  }, [searchParams]);

  const preview = useMemo(() => {
    return `
${template}

Employer: ${form.companyName}
Jurisdiction: ${form.jurisdiction}
Employee: ${form.employeeName}
Role: ${form.jobTitle}
Compensation: ${form.salary}
Start date: ${form.startDate}
Manager: ${form.manager}

Notes:
${form.notes}

This is a structured preview only.
In the full product, this becomes the export-ready document output.
    `.trim();
  }, [template, form]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Generator
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Document builder
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            Move from template selection to a real generation workflow with structured inputs and a live preview.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/app/templates"
            className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to templates
          </Link>

          <button className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
            Export preview
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <StepPill index={1} label="Template" active done />
        <StepPill index={2} label="Details" active done />
        <StepPill index={3} label="Preview" active />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionCard
            title="Builder"
            action={
              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                Core workflow
              </div>
            }
          >
            <div className="mb-5 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Template</label>
                <select
                  value={template}
                  onChange={(e) => setTemplate(e.target.value)}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  {templateOptions.map((item) => (
                    <option key={item} value={item} className="bg-[#0E1218]">
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Jurisdiction</label>
                <input
                  value={form.jurisdiction}
                  onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Company</label>
                <input
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Employee</label>
                <input
                  value={form.employeeName}
                  onChange={(e) => setForm({ ...form, employeeName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Job title</label>
                <input
                  value={form.jobTitle}
                  onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Compensation</label>
                <input
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Start date</label>
                <input
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Manager</label>
                <input
                  value={form.manager}
                  onChange={(e) => setForm({ ...form, manager: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Notes</label>
              <textarea
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
                <Wand2 className="h-4 w-4" />
                Generate preview
              </button>
              <button className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm">
                Save draft
              </button>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard title="Preview">
            <div className="rounded-[24px] border border-white/6 bg-[#0E1218] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-base font-semibold text-zinc-100">{template}</div>
                  <div className="text-sm text-zinc-400">Structured output preview</div>
                </div>
              </div>

              <pre className="whitespace-pre-wrap text-sm leading-7 text-zinc-300">
                {preview}
              </pre>
            </div>
          </SectionCard>

          <SectionCard title="Why this is the product core">
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Guided generation</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    This moves Dutiva from a polished shell into the start of a real compliance workflow.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <Sparkles className="mt-0.5 h-5 w-5 text-amber-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Premium product feel</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    A builder plus live preview feels much more credible than static template cards alone.
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}