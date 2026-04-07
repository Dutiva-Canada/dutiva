import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  Copy,
  ExternalLink,
  FileText,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
  Save,
  RotateCcw,
  FolderOpen,
  Trash2,
  Plus,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { loadFromStorage, saveToStorage, removeFromStorage } from "../utils/storage";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";

const templateOptions = [
  "Employment Agreement",
  "Offer Letter",
  "Termination Letter",
  "Employee Handbook",
  "Confidentiality Agreement",
  "Written Warning",
  "Independent Contractor Agreement",
  "Non-Compete Agreement",
  "Offer Letter (French/Quebec)",
  "Remote Work Policy",
  "Vacation & Leave Policy",
  "Code of Conduct",
  "Anti-Harassment Policy",
  "Resignation Acceptance Letter",
  "Layoff / WARN Notice",
  "Performance Improvement Plan (PIP)",
];

const CANADIAN_JURISDICTIONS = [
  "Alberta",
  "British Columbia",
  "Federal",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
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
  contractRate: "",
  scopeOfWork: "",
  performanceGoals: "",
  reviewDate: "",
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

function ESignModal({ open, onClose, activeDocumentId, onSaveFirst, user }) {
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [signLink, setSignLink] = useState(null);
  const [sendError, setSendError] = useState(null);

  const handleSend = useCallback(async () => {
    if (!user) return;
    setSending(true);
    setSendError(null);

    try {
      let docId = activeDocumentId;
      if (!docId) {
        docId = await onSaveFirst();
        if (!docId) throw new Error("Failed to save document before sending.");
      }

      const { data, error } = await supabase
        .from("signatures")
        .insert({
          user_id: user.id,
          document_id: docId,
          signer_name: signerName,
          signer_email: signerEmail,
        })
        .select()
        .single();

      if (error) throw error;
      setSignLink(`${window.location.origin}/sign/${data.token}`);
    } catch (err) {
      console.error(err);
      setSendError("Failed to create signing link. Please try again.");
    } finally {
      setSending(false);
    }
  }, [user, activeDocumentId, onSaveFirst, signerName, signerEmail]);

  const handleClose = () => {
    setSignerName("");
    setSignerEmail("");
    setSending(false);
    setSignLink(null);
    setSendError(null);
    onClose();
  };

  const handleCopy = () => {
    if (signLink) navigator.clipboard.writeText(signLink);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="premium-card w-full max-w-lg p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-zinc-100">Send for signature</div>
            <div className="mt-1 text-sm text-zinc-400">
              {signLink ? "Share this link with the signer." : "Enter the signer's details to generate a signing link."}
            </div>
          </div>
          <button onClick={handleClose} className="ghost-button px-3 py-2 text-sm">
            <X className="h-4 w-4" />
          </button>
        </div>

        {signLink ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-300">
              Signing link created successfully.
            </div>
            <div className="flex gap-2">
              <input
                readOnly
                value={signLink}
                className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
              <button
                onClick={handleCopy}
                className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
              >
                <Copy className="h-4 w-4" />
                Copy link
              </button>
            </div>
            <button onClick={handleClose} className="gold-button w-full px-4 py-3 text-sm">
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Signer name</label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                placeholder="e.g. Sarah Chen"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Signer email</label>
              <input
                type="email"
                value={signerEmail}
                onChange={(e) => setSignerEmail(e.target.value)}
                placeholder="e.g. sarah@example.com"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
            </div>

            {sendError && (
              <div className="rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">
                {sendError}
              </div>
            )}

            <div className="space-y-3">
              <button
                onClick={handleSend}
                disabled={!signerName || !signerEmail || sending}
                className="gold-button flex w-full items-center justify-between px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{sending ? "Sending..." : "Send for e-signature"}</span>
                <ExternalLink className="h-4 w-4" />
              </button>
              <button
                onClick={handleClose}
                className="ghost-button flex w-full items-center justify-between px-4 py-3 text-sm"
              >
                <span>Export / save</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDocBody(template, form) {
  const extraLines = [
    form.contractRate?.trim() ? `Contract rate: ${form.contractRate}` : null,
    form.scopeOfWork?.trim() ? `Scope of work: ${form.scopeOfWork}` : null,
    form.performanceGoals?.trim() ? `Performance goals: ${form.performanceGoals}` : null,
    form.reviewDate?.trim() ? `Review date: ${form.reviewDate}` : null,
  ]
    .filter(Boolean)
    .join("\n");

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
${extraLines ? `\n${extraLines}` : ""}
This is a structured preview only.
In the full product, this becomes the export-ready document output.
  `.trim();
}

function parseDocBody(content, fallbackTemplate = "Offer Letter") {
  if (!content || typeof content !== "string") {
    return {
      template: fallbackTemplate,
      form: { ...defaultForm },
    };
  }

  const lines = content.split("\n");
  const template = lines[0]?.trim() || fallbackTemplate;

  const getValue = (label) => {
    const line = lines.find((l) => l.startsWith(`${label}:`));
    return line ? line.replace(`${label}:`, "").trim() : "";
  };

  const notesIndex = lines.findIndex((l) => l.trim() === "Notes:");
  let notes = defaultForm.notes;
  if (notesIndex >= 0) {
    const tail = lines.slice(notesIndex + 1).join("\n");
    notes = tail.split("\n\nThis is a structured preview only.")[0]?.trim() || defaultForm.notes;
  }

  return {
    template: templateOptions.includes(template) ? template : fallbackTemplate,
    form: {
      companyName: getValue("Employer") || defaultForm.companyName,
      jurisdiction: getValue("Jurisdiction") || defaultForm.jurisdiction,
      employeeName: getValue("Employee") || defaultForm.employeeName,
      jobTitle: getValue("Role") || defaultForm.jobTitle,
      salary: getValue("Compensation") || defaultForm.salary,
      startDate: getValue("Start date") || defaultForm.startDate,
      manager: getValue("Manager") || defaultForm.manager,
      notes,
      contractRate: getValue("Contract rate") || "",
      scopeOfWork: getValue("Scope of work") || "",
      performanceGoals: getValue("Performance goals") || "",
      reviewDate: getValue("Review date") || "",
    },
  };
}

export default function GeneratorPage() {
  const { user } = useAuth();
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
  const [showESignModal, setShowESignModal] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(true);
  const [activeDocumentId, setActiveDocumentId] = useState(null);
  const [signatureMap, setSignatureMap] = useState({});

  useEffect(() => {
    const incomingTemplate = searchParams.get("template");
    if (incomingTemplate && templateOptions.includes(incomingTemplate) && !activeDocumentId) {
      setTemplate(incomingTemplate);
    }
  }, [searchParams, activeDocumentId]);

  useEffect(() => {
    saveToStorage(STORAGE_KEY, { template, form });
  }, [template, form]);

  useEffect(() => {
    async function loadDocuments() {
      if (!user) {
        setLoadingDocuments(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setDocuments(data || []);

        const { data: sigs } = await supabase
          .from("signatures")
          .select("document_id, status")
          .eq("user_id", user.id);
        const map = {};
        (sigs || []).forEach((s) => { map[s.document_id] = s.status; });
        setSignatureMap(map);
      } catch (error) {
        console.error("Failed to load documents:", error);
      } finally {
        setLoadingDocuments(false);
      }
    }

    loadDocuments();
  }, [user]);

  const preview = useMemo(() => formatDocBody(template, form), [template, form]);

  const refreshDocuments = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) throw error;
    setDocuments(data || []);
  };

  const handleGenerate = () => {
    setStatusMessage(`Preview updated for ${template}.`);
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleSave = async () => {
    try {
      saveToStorage(STORAGE_KEY, { template, form });

      if (!user) {
        setStatusMessage("Saved locally only. Sign in to sync documents.");
        setTimeout(() => setStatusMessage(""), 2500);
        return null;
      }

      const payload = {
        user_id: user.id,
        title: template,
        content: preview,
      };

      if (activeDocumentId) {
        const { error } = await supabase
          .from("documents")
          .update(payload)
          .eq("id", activeDocumentId)
          .eq("user_id", user.id);

        if (error) throw error;
        setStatusMessage(`${template} updated successfully.`);
        await refreshDocuments();
        setTimeout(() => setStatusMessage(""), 2500);
        return activeDocumentId;
      } else {
        const { data, error } = await supabase
          .from("documents")
          .insert(payload)
          .select()
          .single();

        if (error) throw error;
        setActiveDocumentId(data.id);
        setStatusMessage(`${template} saved successfully.`);
        await refreshDocuments();
        setTimeout(() => setStatusMessage(""), 2500);
        return data.id;
      }
    } catch (error) {
      console.error("Save failed:", error);
      setStatusMessage("Could not save document.");
      setTimeout(() => setStatusMessage(""), 3000);
      return null;
    }
  };

  const resetState = () => {
    removeFromStorage(STORAGE_KEY);
    setActiveDocumentId(null);
    setTemplate(
      searchParams.get("template") && templateOptions.includes(searchParams.get("template"))
        ? searchParams.get("template")
        : "Offer Letter"
    );
    setForm(enrichedDefaults);
  };

  const handleReset = () => {
    resetState();
    setStatusMessage("Draft cleared and reset.");
    setTimeout(() => setStatusMessage(""), 2500);
  };

  const handleLoadDocument = (doc) => {
    const parsed = parseDocBody(doc.content, doc.title || "Offer Letter");
    setActiveDocumentId(doc.id);
    setTemplate(parsed.template);
    setForm(parsed.form);
    setStatusMessage(`Loaded "${doc.title}".`);
    setTimeout(() => setStatusMessage(""), 2000);
  };

  const handleDeleteDocument = async () => {
    if (!user || !activeDocumentId) return;

    try {
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", activeDocumentId)
        .eq("user_id", user.id);

      if (error) throw error;

      await refreshDocuments();
      resetState();
      setStatusMessage("Document deleted.");
      setTimeout(() => setStatusMessage(""), 2500);
    } catch (error) {
      console.error("Delete failed:", error);
      setStatusMessage("Could not delete document.");
      setTimeout(() => setStatusMessage(""), 3000);
    }
  };

  const handleNewDocument = () => {
    resetState();
    setStatusMessage("Started a new document.");
    setTimeout(() => setStatusMessage(""), 2000);
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
              {activeDocumentId ? "Edit document" : "Document builder"}
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
              onClick={() => setShowESignModal(true)}
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Send for signature
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <StatusToast text={statusMessage} />

        <div className="flex flex-wrap gap-3">
          <StepPill index={1} label="Template" done />
          <StepPill index={2} label="Details" done />
          <StepPill index={3} label="Preview" active />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <SectionCard
              title="Builder"
              action={
                <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                  {activeDocumentId ? "Update mode" : "Create mode"}
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
                  <select
                    value={form.jurisdiction}
                    onChange={(e) => setForm({ ...form, jurisdiction: e.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  >
                    {CANADIAN_JURISDICTIONS.map((j) => (
                      <option key={j} value={j} className="bg-[#0E1218]">
                        {j}
                      </option>
                    ))}
                  </select>
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

              {template === "Independent Contractor Agreement" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Contract Rate</label>
                    <input
                      value={form.contractRate}
                      onChange={(e) => setForm({ ...form, contractRate: e.target.value })}
                      className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Scope of Work</label>
                    <textarea
                      value={form.scopeOfWork}
                      onChange={(e) => setForm({ ...form, scopeOfWork: e.target.value })}
                      className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                </>
              )}

              {template === "Performance Improvement Plan (PIP)" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Performance Goals</label>
                    <textarea
                      value={form.performanceGoals}
                      onChange={(e) => setForm({ ...form, performanceGoals: e.target.value })}
                      className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Review Date</label>
                    <input
                      value={form.reviewDate}
                      onChange={(e) => setForm({ ...form, reviewDate: e.target.value })}
                      className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                </>
              )}

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
                  {activeDocumentId ? "Update document" : "Save document"}
                </button>

                <button
                  onClick={handleReset}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset draft
                </button>

                <button
                  onClick={handleNewDocument}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  New document
                </button>

                {activeDocumentId ? (
                  <button
                    onClick={handleDeleteDocument}
                    className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                ) : null}
              </div>
            </SectionCard>

            <SectionCard
              title="Saved documents"
              action={
                <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="h-3.5 w-3.5" />
                    {loadingDocuments ? "Loading..." : `${documents.length} saved`}
                  </div>
                </div>
              }
            >
              <div className="space-y-3">
                {loadingDocuments ? (
                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-sm text-zinc-400">
                    Loading documents...
                  </div>
                ) : documents.length === 0 ? (
                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-sm text-zinc-400">
                    No saved documents yet.
                  </div>
                ) : (
                  documents.map((doc) => {
                    const active = doc.id === activeDocumentId;
                    return (
                      <button
                        key={doc.id}
                        onClick={() => handleLoadDocument(doc)}
                        className={[
                          "w-full rounded-2xl border px-4 py-4 text-left transition",
                          active
                            ? "border-amber-400/25 bg-amber-400/[0.06]"
                            : "border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]",
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <div className="truncate text-sm font-medium text-zinc-100">
                              {doc.title || "Untitled document"}
                            </div>
                            <div className="mt-1 text-sm text-zinc-400">
                              {new Date(doc.created_at).toLocaleString()}
                            </div>
                            {signatureMap[doc.id] && (
                              <div className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
                                signatureMap[doc.id] === "signed"
                                  ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300"
                                  : "border-amber-400/20 bg-amber-400/8 text-amber-300"
                              }`}>
                                {signatureMap[doc.id] === "signed" ? "Signed" : "Awaiting signature"}
                              </div>
                            )}
                          </div>
                          {active ? (
                            <div className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-300">
                              Open
                            </div>
                          ) : null}
                        </div>
                      </button>
                    );
                  })
                )}
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
                    <div className="text-sm text-zinc-400">
                      {activeDocumentId ? "Editing saved document" : "Structured output preview"}
                    </div>
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
                    <div className="text-sm font-medium text-zinc-100">Real editing workflow</div>
                    <div className="mt-1 text-sm text-zinc-400">
                      Saved documents can now be reopened and updated instead of creating duplicates.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <Sparkles className="mt-0.5 h-5 w-5 text-amber-300" />
                  <div>
                    <div className="text-sm font-medium text-zinc-100">Workspace continuity</div>
                    <div className="mt-1 text-sm text-zinc-400">
                      Generator, dashboard, and storage now behave more like a real SaaS document system.
                    </div>
                  </div>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      </div>

      <ESignModal
        open={showESignModal}
        onClose={() => setShowESignModal(false)}
        activeDocumentId={activeDocumentId}
        onSaveFirst={handleSave}
        user={user}
      />
    </>
  );
}