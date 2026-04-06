import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Download,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
  Save,
  RotateCcw,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { loadFromStorage, saveToStorage, removeFromStorage } from "../utils/storage";

const templateOptions = [
  "Employment Agreement",
  "Offer Letter",
  "Termination Letter",
  "Employee Handbook",
  "Confidentiality Agreement",
  "Written Warning",
];

const STORAGE_KEY = "dutiva.generatorDraft.v1";
const SETTINGS_KEY = "dutiva.settings.v1";

const defaultForm = {
  companyName: "Dutiva Canada",
  jurisdiction: "Ontario",
  employeeName: "Sarah Chen",
  jobTitle: "Marketing Coordinator",
  salary: "$52,000",
  startDate: "2026-05-01",
  manager: "David Park",
  notes: "Three-month probation. Full-time. Bi-weekly pay.",
};

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

function StatusToast({ text }) {
  if (!text) return null;

  return (
    <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-300">
      {text}
    </div>
  );
}

function ExportModal({ open, onClose, template }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="premium-card w-full max-w-lg p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-zinc-100">Export preview</div>
            <div className="mt-1 text-sm text-zinc-400">
              This simulates the export flow for {template}.
            </div>
          </div>

          <button onClick={onClose} className="ghost-button px-3 py-2 text-sm">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3">
          <button className="gold-button flex w-full items-center justify-between px-4 py-3 text-sm">
            <span>Export as PDF</span>
            <Download className="h-4 w-4" />
          </button>

          <button className="ghost-button flex w-full items-center justify-between px-4 py-3 text-sm">
            <span>Save as draft</span>
            <Save className="h-4 w-4" />
          </button>

          <Link
            to="/app/advisor"
            className="ghost-button flex w-full items-center justify-between px-4 py-3 text-sm"
          >
            <span>Send to advisor for review</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-5 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-sm text-zinc-400">
          In the full product, this will connect to real export, e-signature, and document history.
        </div>
      </div>
    </div>
  );
}

export default function GeneratorPage() {
  const [searchParams] = useSearchParams();

  const savedDraft = loadFromStorage(STORAGE_KEY, null);
  const savedSettings = loadFromStorage(SETTINGS_KEY, {});

  const enrichedDefaults = {
    ...defaultForm,
    companyName: savedSettings.companyName || defaultForm.companyName,
    jurisdiction: savedSettings.province || defaultForm.jurisdiction,
  };

  const [template, setTemplate] = useState(savedDraft?.template || "Offer Letter");
  const [form, setForm] = useState(savedDraft?.form || enrichedDefaults);
  const [statusMessage, setStatusMessage] = useState("");
  const [showExportModal, setShowExportModal] = useState(false);

  useEffect(() => {
    const incomingTemplate = searchParams.get("template");
    if (incomingTemplate && templateOptions.includes(incomingTemplate)) {
      setTemplate(incomingTemplate);
    }
  }, [searchParams]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { template, form });
  }, [template, form]);

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

  const handleGenerate = () => {
    setStatusMessage(`Preview updated for ${template}.`);
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleSave = () => {
    saveToStorage(STORAGE_KEY, { template, form });
    setStatusMessage(`${template} draft saved successfully.`);
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleReset = () => {
    removeFromStorage(STORAGE_KEY);
    setTemplate("Offer Letter");
    setForm(enrichedDefaults);
    setStatusMessage("Draft cleared and reset.");
    setTimeout(() => setStatusMessage(""), 2500);
  };

  return (
    <>
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

            <button
              onClick={() => setShowExportModal(true)}
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Export preview
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <StatusToast text={statusMessage} />

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
                <button
                  onClick={handleGenerate}
                  className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  <Wand2 className="h-4 w-4" />
                  Generate preview
                </button>

                <button
                  onClick={handleSave}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <Save className="h-4 w-4" />
                  Save draft
                </button>

                <button
                  onClick={handleReset}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset draft
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
                    <div className="text-sm font-medium text-zinc-100">Persistent draft state</div>
                    <div className="mt-1 text-sm text-zinc-400">
                      Your generator inputs now survive reloads, and default to your workspace settings.
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <ExportModal
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
        template={template}
      />
    </>
  );
}