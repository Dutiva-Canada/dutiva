import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calculator,
  CheckCircle2,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  FileText,
  FolderOpen,
  Plus,
  RotateCcw,
  Save,
  ShieldCheck,
  Sparkles,
  Trash2,
  Wand2,
  X,
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { loadFromStorage, removeFromStorage, saveToStorage } from "../utils/storage";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";
import { getStoredSettings } from "../utils/workspaceSettings";
import { formatDocBody } from "../utils/documentTemplates";

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

// ── ESA notice data ───────────────────────────────────────────────────────────
const ESA_NOTICE = {
  Ontario: [[0,1,0],[1,3,2],[3,4,3],[4,5,4],[5,6,5],[6,7,6],[7,8,7],[8,Infinity,8]],
  "British Columbia": [[0,0.25,0],[0.25,1,1],[1,3,2],[3,4,3],[4,5,4],[5,6,5],[6,7,6],[7,8,7],[8,Infinity,8]],
  Alberta: [[0,0.25,0],[0.25,2,1],[2,4,2],[4,6,4],[6,8,5],[8,10,6],[10,Infinity,8]],
  Quebec: [[0,0.25,0],[0.25,1,1],[1,5,2],[5,10,4],[10,Infinity,8]],
  Manitoba: [[0,0.08,0],[0.08,1,1],[1,3,2],[3,5,4],[5,10,6],[10,Infinity,8]],
  Saskatchewan: [[0,0.25,0],[0.25,3,2],[3,5,4],[5,10,6],[10,Infinity,8]],
  "Nova Scotia": [[0,0.25,0],[0.25,2,1],[2,5,2],[5,10,4],[10,Infinity,8]],
  "New Brunswick": [[0,0.5,0],[0.5,5,2],[5,Infinity,4]],
  Federal: [[0,0.25,0],[0.25,Infinity,2]],
  "Newfoundland and Labrador": [[0,0.17,0],[0.17,2,1],[2,5,2],[5,15,3],[15,Infinity,4]],
  "Prince Edward Island": [[0,0.17,0],[0.17,6,2],[6,Infinity,4]],
  "Northwest Territories": [[0,0.17,0],[0.17,1,1],[1,3,2],[3,5,3],[5,10,4],[10,Infinity,6]],
  Nunavut: [[0,0.17,0],[0.17,1,1],[1,3,2],[3,5,3],[5,10,4],[10,Infinity,6]],
  Yukon: [[0,0.17,0],[0.17,1,1],[1,3,2],[3,5,3],[5,10,4],[10,Infinity,8]],
};

function getNoticeWeeks(province, years) {
  const table = ESA_NOTICE[province] || ESA_NOTICE["Ontario"];
  for (const [min, max, weeks] of table) {
    if (years >= min && years < max) return weeks;
  }
  return table[table.length - 1][2];
}

const STORAGE_KEY = "dutiva.generatorDraft.v1";

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

function normalizeForm(value, fallbackForm) {
  return {
    ...fallbackForm,
    ...(value && typeof value === "object" ? value : {}),
  };
}

function getTemplateFromValue(value) {
  return templateOptions.includes(value) ? value : "Offer Letter";
}

function getStoredDraft(defaults) {
  const draft = loadFromStorage(STORAGE_KEY, null);
  if (!draft || typeof draft !== "object") {
    return null;
  }

  return {
    template: getTemplateFromValue(draft.template),
    form: normalizeForm(draft.form, defaults),
  };
}

function openPrintPreview(template, content) {
  if (typeof window === "undefined") return false;

  const date = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${template}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    html { font-size: 14px; }
    body {
      margin: 0;
      padding: 48px 56px;
      font-family: "Segoe UI", "Helvetica Neue", Arial, sans-serif;
      font-size: 1rem;
      line-height: 1.8;
      color: #1a1a1a;
      background: #ffffff;
    }
    header {
      border-bottom: 2px solid #111;
      padding-bottom: 16px;
      margin-bottom: 28px;
    }
    header h1 {
      margin: 0 0 6px;
      font-size: 1.55rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      color: #111;
    }
    header .meta {
      font-size: 0.8rem;
      color: #666;
    }
    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      font-family: inherit;
      font-size: 0.95rem;
      line-height: 1.85;
      color: #1a1a1a;
    }
    footer {
      margin-top: 48px;
      border-top: 1px solid #ddd;
      padding-top: 12px;
      font-size: 0.75rem;
      color: #888;
    }
    @page {
      margin: 20mm 18mm;
      size: letter;
    }
    @media print {
      body { padding: 0; }
      header, pre { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${template}</h1>
    <div class="meta">Generated by Dutiva &nbsp;·&nbsp; ${date} &nbsp;·&nbsp; dutiva.ca</div>
  </header>
  <pre>${escaped}</pre>
  <footer>Generated by Dutiva HR Compliance Software &nbsp;·&nbsp; dutiva.ca</footer>
</body>
</html>`;

  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "width=960,height=800");
  if (!win) {
    URL.revokeObjectURL(url);
    return false;
  }
  win.addEventListener("load", () => {
    win.focus();
    win.print();
  });
  // Revoke after 2 minutes to allow repeated printing
  setTimeout(() => URL.revokeObjectURL(url), 120_000);
  return true;
}

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

function StatusToast({ text, tone = "success" }) {
  if (!text) return null;

  const toneClass =
    tone === "warning"
      ? "border-yellow-400/15 bg-yellow-400/8 text-yellow-200"
      : "border-emerald-400/15 bg-emerald-400/8 text-emerald-300";

  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClass}`}>
      {text}
    </div>
  );
}

function ESignModal({
  activeDocumentId,
  onClose,
  onExport,
  onSaveDraft,
  onSaveFirst,
  onSignatureCreated,
  open,
  savingDraft,
  template,
  user,
}) {
  const [signerName, setSignerName] = useState("");
  const [signerEmail, setSignerEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [signLink, setSignLink] = useState("");
  const [sendError, setSendError] = useState("");
  // Employer counter-signature
  const [employerName, setEmployerName] = useState("");
  const [employerEmail, setEmployerEmail] = useState("");
  const [sendingEmployer, setSendingEmployer] = useState(false);
  const [employerLink, setEmployerLink] = useState("");
  const [employerError, setEmployerError] = useState("");
  const [createdDocumentId, setCreatedDocumentId] = useState(null);

  const resetModalState = useCallback(() => {
    setSignerName("");
    setSignerEmail("");
    setSending(false);
    setSignLink("");
    setSendError("");
    setEmployerName("");
    setEmployerEmail("");
    setSendingEmployer(false);
    setEmployerLink("");
    setEmployerError("");
    setCreatedDocumentId(null);
  }, []);

  const handleClose = useCallback(() => {
    resetModalState();
    onClose();
  }, [onClose, resetModalState]);

  const handleCopy = useCallback(async () => {
    if (!signLink || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(signLink);
    } catch (error) {
      console.error("Failed to copy sign link:", error);
    }
  }, [signLink]);

  const handleCopyEmployer = useCallback(async () => {
    if (!employerLink || !navigator?.clipboard?.writeText) return;
    try {
      await navigator.clipboard.writeText(employerLink);
    } catch (error) {
      console.error("Failed to copy employer sign link:", error);
    }
  }, [employerLink]);

  const handleSend = useCallback(async () => {
    const normalizedName = signerName.trim();
    const normalizedEmail = signerEmail.trim();

    if (!normalizedName || !normalizedEmail || sending) {
      return;
    }

    if (!user || !supabase) {
      setSendError("Sign in is required before you can send a document for signature.");
      return;
    }

    setSending(true);
    setSendError("");

    try {
      let documentId = activeDocumentId;

      if (!documentId) {
        documentId = await onSaveFirst();
        if (!documentId) {
          throw new Error("Failed to save document before sending for signature.");
        }
      }

      const { data, error } = await supabase
        .from("signatures")
        .insert({
          user_id: user.id,
          document_id: documentId,
          signer_name: normalizedName,
          signer_email: normalizedEmail,
        })
        .select("token, status")
        .single();

      if (error) {
        throw error;
      }

      const nextLink = new URL(`/sign/${data.token}`, window.location.origin).toString();
      setSignLink(nextLink);
      setCreatedDocumentId(documentId);
      onSignatureCreated(documentId, data.status || "pending");
    } catch (error) {
      console.error("Failed to create signing link:", error);
      setSendError("Failed to create signing link. Please try again.");
    } finally {
      setSending(false);
    }
  }, [
    activeDocumentId,
    onSaveFirst,
    onSignatureCreated,
    signerEmail,
    signerName,
    sending,
    user,
  ]);

  const handleSendEmployer = useCallback(async () => {
    const normalizedName = employerName.trim();
    const normalizedEmail = employerEmail.trim();
    if (!normalizedName || !normalizedEmail || sendingEmployer) return;
    if (!user || !supabase) {
      setEmployerError("Sign in is required to create a signing link.");
      return;
    }
    const documentId = createdDocumentId || activeDocumentId;
    if (!documentId) {
      setEmployerError("Please create the employee signing link first.");
      return;
    }
    setSendingEmployer(true);
    setEmployerError("");
    try {
      const { data, error } = await supabase
        .from("signatures")
        .insert({
          user_id: user.id,
          document_id: documentId,
          signer_name: normalizedName,
          signer_email: normalizedEmail,
          signer_role: "employer",
        })
        .select("token")
        .single();
      if (error) throw error;
      const link = new URL(`/sign/${data.token}`, window.location.origin).toString();
      setEmployerLink(link);
    } catch (error) {
      console.error("Failed to create employer signing link:", error);
      setEmployerError("Failed to create employer signing link. Please try again.");
    } finally {
      setSendingEmployer(false);
    }
  }, [activeDocumentId, createdDocumentId, employerEmail, employerName, sendingEmployer, user]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="premium-card w-full max-w-lg p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="text-lg font-semibold text-zinc-100">Send for signature</div>
            <div className="mt-1 text-sm text-zinc-400">
              {signLink
                ? "Share this link with the signer."
                : `Save, export, or generate an e-signature link for ${template}.`}
            </div>
          </div>

          <button type="button" onClick={handleClose} className="ghost-button px-3 py-2 text-sm">
            <X className="h-4 w-4" />
          </button>
        </div>

        {signLink ? (
          <div className="space-y-4">
            <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-3 text-sm text-emerald-300">
              Employee signing link created successfully.
            </div>
            <div className="flex gap-2">
              <input readOnly value={signLink}
                className="flex-1 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              <button type="button" onClick={handleCopy}
                className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm">
                <Copy className="h-4 w-4" />Copy link
              </button>
            </div>

            {/* Employer counter-signature section */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4 space-y-3">
              <div className="text-sm font-medium text-zinc-200">Also need the employer to sign?</div>
              <p className="text-xs text-zinc-500">
                Generate a separate signing link for the employer representative. Both signatures will be
                attached to the same document for full execution.
              </p>
              {employerLink ? (
                <div className="space-y-2">
                  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-3 py-2 text-xs text-emerald-300">
                    Employer signing link created.
                  </div>
                  <div className="flex gap-2">
                    <input readOnly value={employerLink}
                      className="flex-1 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-zinc-100 outline-none" />
                    <button type="button" onClick={handleCopyEmployer}
                      className="ghost-button inline-flex items-center gap-2 px-3 py-2 text-xs">
                      <Copy className="h-3.5 w-3.5" />Copy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <input type="text" value={employerName} onChange={(e) => setEmployerName(e.target.value)}
                    placeholder="Employer name (e.g. David Park)"
                    className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500" />
                  <input type="email" value={employerEmail} onChange={(e) => setEmployerEmail(e.target.value)}
                    placeholder="Employer email"
                    className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-500" />
                  {employerError && (
                    <div className="rounded-xl border border-red-400/15 bg-red-400/8 px-3 py-2 text-xs text-red-300">{employerError}</div>
                  )}
                  <button type="button" onClick={handleSendEmployer}
                    disabled={!employerName.trim() || !employerEmail.trim() || sendingEmployer}
                    className="ghost-button flex w-full items-center justify-between px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40">
                    <span>{sendingEmployer ? "Creating..." : "Generate employer signing link"}</span>
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <button type="button" onClick={handleClose} className="gold-button w-full px-4 py-3 text-sm">
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
                onChange={(event) => setSignerName(event.target.value)}
                placeholder="e.g. Sarah Chen"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Signer email</label>
              <input
                type="email"
                value={signerEmail}
                onChange={(event) => setSignerEmail(event.target.value)}
                placeholder="e.g. sarah@example.com"
                className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
              />
            </div>

            {sendError ? (
              <div className="rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">
                {sendError}
              </div>
            ) : null}

            <div className="space-y-3">
              <button
                type="button"
                onClick={handleSend}
                disabled={!signerName.trim() || !signerEmail.trim() || sending}
                className="gold-button flex w-full items-center justify-between px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{sending ? "Sending..." : "Send for e-signature"}</span>
                <ExternalLink className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onSaveDraft}
                disabled={savingDraft || sending}
                className="ghost-button flex w-full items-center justify-between px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>{savingDraft ? "Saving draft..." : "Save draft"}</span>
                <Save className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={onExport}
                className="ghost-button flex w-full items-center justify-between px-4 py-3 text-sm"
              >
                <span>Print / save as PDF</span>
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── ESA Calculator component ──────────────────────────────────────────────────
function ESACalculator({ defaultProvince }) {
  const settings = getStoredSettings();
  const [province, setProvince] = useState(defaultProvince || settings.province || "Ontario");
  const [years, setYears] = useState("");
  const [annualSalary, setAnnualSalary] = useState("");
  const [largePay, setLargePay] = useState(false);
  const [result, setResult] = useState(null);

  const calculate = () => {
    const y = parseFloat(years);
    const s = parseFloat(String(annualSalary).replace(/[,$]/g, ""));
    if (!y || y < 0 || !s || s <= 0) return;
    const weeklyWage = s / 52;
    const noticeWeeks = getNoticeWeeks(province, y);
    const payInLieu = noticeWeeks * weeklyWage;
    let severanceWeeks = 0;
    let severanceNote = "";
    if (province === "Ontario") {
      if (y >= 5 && largePay) {
        severanceWeeks = Math.min(Math.floor(y), 26);
        severanceNote = "ESA, 2000, s. 64\u201365 \u00b7 Max 26 weeks";
      } else if (y >= 5) {
        severanceNote = "May apply if payroll \u2265 $2.5M \u2014 confirm above";
      }
    } else if (province === "Federal") {
      if (y >= 1) severanceNote = "Canada Labour Code, s. 235 \u2014 contact legal counsel";
    }
    const severancePay = severanceWeeks * weeklyWage;
    const actMap = {
      Ontario: "ESA, 2000, s. 57", "British Columbia": "Employment Standards Act, s. 63",
      Alberta: "Employment Standards Code, s. 56", Quebec: "Act Respecting Labour Standards, s. 82",
      Manitoba: "Employment Standards Code, s. 61", Saskatchewan: "Saskatchewan Employment Act, s. 2-60",
      "Nova Scotia": "Labour Standards Code, s. 72", "New Brunswick": "Employment Standards Act, s. 30",
      Federal: "Canada Labour Code, s. 230",
    };
    setResult({ noticeWeeks, payInLieu, weeklyWage, severanceWeeks, severancePay, severanceNote, actRef: actMap[province] || "applicable ESA" });
  };

  const fmt = (n) => n.toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 });

  return (
    <section className="premium-card p-6">
      <div className="mb-1 flex items-center gap-2">
        <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
          <Calculator className="h-4 w-4" />
        </div>
        <h2 className="text-base font-semibold text-zinc-100">ESA Notice Calculator</h2>
      </div>
      <p className="mb-4 text-xs text-zinc-500">Statutory minimums only. Common-law notice may be higher.</p>
      <div className="space-y-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300">Province</label>
          <select value={province} onChange={(e) => { setProvince(e.target.value); setResult(null); }}
            className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 outline-none">
            {CANADIAN_JURISDICTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">Years of service</label>
            <input type="number" min="0" step="0.5" placeholder="e.g. 3.5" value={years}
              onChange={(e) => { setYears(e.target.value); setResult(null); }}
              className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 outline-none" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-300">Annual salary ($)</label>
            <input type="number" min="0" step="1000" placeholder="e.g. 65000" value={annualSalary}
              onChange={(e) => { setAnnualSalary(e.target.value); setResult(null); }}
              className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-sm text-zinc-100 outline-none" />
          </div>
        </div>
        {province === "Ontario" && (
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/6 bg-white/[0.02] px-3 py-2.5">
            <input type="checkbox" checked={largePay} onChange={(e) => { setLargePay(e.target.checked); setResult(null); }} className="h-4 w-4 accent-amber-400" />
            <span className="text-xs text-zinc-300">Employer payroll \u2265 $2.5M (enables severance)</span>
          </label>
        )}
        <button type="button" onClick={calculate} className="gold-button w-full px-4 py-2.5 text-sm">
          Calculate entitlements
        </button>
      </div>
      {result && (
        <div className="mt-4 space-y-2">
          <div className="rounded-xl border border-amber-400/15 bg-amber-400/6 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Statutory notice</div>
            <div className="mt-1 text-xl font-bold text-amber-300">{result.noticeWeeks} week{result.noticeWeeks !== 1 ? "s" : ""}</div>
            <div className="mt-0.5 text-xs text-zinc-400">Pay in lieu: {fmt(result.payInLieu)} \u00b7 Weekly wage: {fmt(result.weeklyWage)}</div>
          </div>
          {(result.severanceWeeks > 0 || result.severanceNote) && (
            <div className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Severance pay</div>
              {result.severanceWeeks > 0 ? (
                <>
                  <div className="mt-1 text-xl font-bold text-zinc-100">{result.severanceWeeks} weeks \u00b7 {fmt(result.severancePay)}</div>
                  <div className="mt-0.5 text-xs text-zinc-500">{result.severanceNote}</div>
                </>
              ) : (
                <div className="mt-1 text-sm text-zinc-400">{result.severanceNote}</div>
              )}
            </div>
          )}
          <div className="rounded-xl border border-emerald-400/12 bg-emerald-400/6 px-4 py-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Total minimum exposure</div>
            <div className="mt-1 text-xl font-bold text-emerald-300">{fmt(result.payInLieu + result.severancePay)}</div>
            <div className="mt-0.5 text-xs text-zinc-500">{result.actRef} \u00b7 statutory only</div>
          </div>
          <p className="pt-1 text-xs text-zinc-500">Common-law reasonable notice often exceeds statutory minimums. Consult legal counsel before terminating.</p>
        </div>
      )}
    </section>
  );
}

function ActionLink({ to, title, desc }) {
  return (
    <Link to={to}
      className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]">
      <div>
        <div className="text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-zinc-500" />
    </Link>
  );
}

// formatDocBody is imported from ../utils/documentTemplates

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
    const line = lines.find((item) => item.startsWith(`${label}:`));
    return line ? line.replace(`${label}:`, "").trim() : "";
  };

  const notesIndex = lines.findIndex((item) => item.trim() === "Notes:");
  let notes = defaultForm.notes;
  if (notesIndex >= 0) {
    const tail = lines.slice(notesIndex + 1).join("\n");
    notes = tail.split("\n\n---\n\n")[0]?.trim() || defaultForm.notes;
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

  const savedSettings = useMemo(() => getStoredSettings(), []);
  const enrichedDefaults = useMemo(
    () => ({
      ...defaultForm,
      companyName: savedSettings.companyName || defaultForm.companyName,
      jurisdiction: savedSettings.province || defaultForm.jurisdiction,
    }),
    [savedSettings],
  );
  const savedDraft = useMemo(() => getStoredDraft(enrichedDefaults), [enrichedDefaults]);

  const [template, setTemplate] = useState(() => savedDraft?.template || "Offer Letter");
  const [form, setForm] = useState(() => savedDraft?.form || enrichedDefaults);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusTone, setStatusTone] = useState("success");
  const [showESignModal, setShowESignModal] = useState(false);
  const [savingFromModal, setSavingFromModal] = useState(false);
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

  const loadDocuments = useCallback(
    async ({ showLoader = true } = {}) => {
      if (showLoader) {
        setLoadingDocuments(true);
      }

      if (!user || !supabase) {
        setDocuments([]);
        setSignatureMap({});
        setLoadingDocuments(false);
        return;
      }

      try {
        const { data: docs, error: docsError } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (docsError) {
          throw docsError;
        }

        setDocuments(docs || []);

        const { data: signatures, error: signaturesError } = await supabase
          .from("signatures")
          .select("document_id, status")
          .eq("user_id", user.id);

        if (signaturesError) {
          throw signaturesError;
        }

        const nextSignatureMap = {};
        (signatures || []).forEach((signature) => {
          if (!nextSignatureMap[signature.document_id] || signature.status === "pending") {
            nextSignatureMap[signature.document_id] = signature.status;
          }
        });
        setSignatureMap(nextSignatureMap);
      } catch (error) {
        console.error("Failed to load documents:", error);
        setDocuments([]);
        setSignatureMap({});
      } finally {
        setLoadingDocuments(false);
      }
    },
    [user],
  );

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const preview = useMemo(() => formatDocBody(template, form), [template, form]);

  const showStatus = useCallback((message, tone = "success", duration = 2500) => {
    setStatusTone(tone);
    setStatusMessage(message);
    window.setTimeout(() => setStatusMessage(""), duration);
  }, []);

  const handleGenerate = useCallback(() => {
    showStatus(`Preview updated for ${template}.`);
  }, [showStatus, template]);

  const handleSave = useCallback(async () => {
    try {
      saveToStorage(STORAGE_KEY, { template, form });

      if (!user || !supabase) {
        showStatus("Saved locally only. Sign in to sync documents.");
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

        if (error) {
          throw error;
        }

        showStatus(`${template} updated successfully.`);
        await loadDocuments({ showLoader: false });
        return activeDocumentId;
      }

      const { data, error } = await supabase
        .from("documents")
        .insert(payload)
        .select()
        .single();

      if (error) {
        throw error;
      }

      setActiveDocumentId(data.id);
      showStatus(`${template} saved successfully.`);
      await loadDocuments({ showLoader: false });
      return data.id;
    } catch (error) {
      console.error("Save failed:", error);
      showStatus("Could not save document.", "warning", 3000);
      return null;
    }
  }, [activeDocumentId, form, loadDocuments, preview, showStatus, template, user]);

  const resetState = useCallback(() => {
    removeFromStorage(STORAGE_KEY);
    setActiveDocumentId(null);
    setTemplate(getTemplateFromValue(searchParams.get("template")));
    setForm(normalizeForm(null, enrichedDefaults));
  }, [enrichedDefaults, searchParams]);

  const handleReset = useCallback(() => {
    resetState();
    showStatus("Draft cleared and reset.");
  }, [resetState, showStatus]);

  const handleLoadDocument = useCallback(
    (doc) => {
      const parsed = parseDocBody(doc.content, doc.title || "Offer Letter");
      setActiveDocumentId(doc.id);
      setTemplate(parsed.template);
      setForm(normalizeForm(parsed.form, enrichedDefaults));
      showStatus(`Loaded "${doc.title || "Untitled document"}".`, "success", 2000);
    },
    [enrichedDefaults, showStatus],
  );

  const handleDeleteDocument = useCallback(async () => {
    if (!user || !supabase || !activeDocumentId) {
      return;
    }

    try {
      const { error } = await supabase
        .from("documents")
        .delete()
        .eq("id", activeDocumentId)
        .eq("user_id", user.id);

      if (error) {
        throw error;
      }

      await loadDocuments({ showLoader: false });
      resetState();
      showStatus("Document deleted.");
    } catch (error) {
      console.error("Delete failed:", error);
      showStatus("Could not delete document.", "warning", 3000);
    }
  }, [activeDocumentId, loadDocuments, resetState, showStatus, user]);

  const handleNewDocument = useCallback(() => {
    resetState();
    showStatus("Started a new document.", "success", 2000);
  }, [resetState, showStatus]);

  const handleExport = useCallback(() => {
    const didOpen = openPrintPreview(template, preview);
    showStatus(
      didOpen
        ? "Print window opened. Use your browser's save-as-PDF option to export."
        : "Could not open the print window. Check whether pop-ups are blocked.",
      didOpen ? "success" : "warning",
      3500,
    );
  }, [preview, showStatus, template]);

  const handleSaveFromModal = useCallback(async () => {
    setSavingFromModal(true);

    try {
      const documentId = await handleSave();
      if (documentId || !user || !supabase) {
        setShowESignModal(false);
      }
    } finally {
      setSavingFromModal(false);
    }
  }, [handleSave, user]);

  const handleSignatureCreated = useCallback((documentId, status = "pending") => {
    if (!documentId) {
      return;
    }

    setSignatureMap((current) => ({
      ...current,
      [documentId]: status,
    }));
  }, []);

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
              type="button"
              onClick={() => setShowESignModal(true)}
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Send for signature
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <StatusToast text={statusMessage} tone={statusTone} />

        {/* \u2500\u2500 Entitlement calculator \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */}
        <div>
          <div className="text-base font-semibold text-zinc-100">Entitlement calculator</div>
          <p className="mt-0.5 text-sm text-zinc-500">Calculate ESA notice entitlements before generating your document</p>
        </div>
        <ESACalculator defaultProvince={form.jurisdiction} />
        <SectionCard title="Next steps">
          <div className="space-y-3">
            <ActionLink to="/app/advisor" title="Ask the AI advisor" desc="Get province-aware guidance before generating your document" />
            <ActionLink to="/app/generator?template=Termination%20Letter" title="Generate termination letter" desc="Pre-filled with ESA notice calculations" />
            <ActionLink to="/app/settings" title="Verify province defaults" desc="Ensure jurisdiction context is correct" />
          </div>
        </SectionCard>

        <div className="h-px bg-white/5" />

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
                    onChange={(event) => setTemplate(event.target.value)}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  >
                    {templateOptions.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Jurisdiction</label>
                  <select
                    value={form.jurisdiction}
                    onChange={(event) => setForm({ ...form, jurisdiction: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  >
                    {CANADIAN_JURISDICTIONS.map((jurisdiction) => (
                      <option key={jurisdiction} value={jurisdiction}>
                        {jurisdiction}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Company</label>
                  <input
                    value={form.companyName}
                    onChange={(event) => setForm({ ...form, companyName: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Employee</label>
                  <input
                    value={form.employeeName}
                    onChange={(event) => setForm({ ...form, employeeName: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Job title</label>
                  <input
                    value={form.jobTitle}
                    onChange={(event) => setForm({ ...form, jobTitle: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Compensation</label>
                  <input
                    value={form.salary}
                    onChange={(event) => setForm({ ...form, salary: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Start date</label>
                  <input
                    value={form.startDate}
                    onChange={(event) => setForm({ ...form, startDate: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Manager</label>
                  <input
                    value={form.manager}
                    onChange={(event) => setForm({ ...form, manager: event.target.value })}
                    className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Notes</label>
                <textarea
                  value={form.notes}
                  onChange={(event) => setForm({ ...form, notes: event.target.value })}
                  className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </div>

              {template === "Independent Contractor Agreement" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Contract rate</label>
                    <input
                      value={form.contractRate}
                      onChange={(event) => setForm({ ...form, contractRate: event.target.value })}
                      className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Scope of work</label>
                    <textarea
                      value={form.scopeOfWork}
                      onChange={(event) => setForm({ ...form, scopeOfWork: event.target.value })}
                      className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                </>
              ) : null}

              {template === "Performance Improvement Plan (PIP)" ? (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Performance goals</label>
                    <textarea
                      value={form.performanceGoals}
                      onChange={(event) => setForm({ ...form, performanceGoals: event.target.value })}
                      className="min-h-[140px] w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Review date</label>
                    <input
                      value={form.reviewDate}
                      onChange={(event) => setForm({ ...form, reviewDate: event.target.value })}
                      className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                    />
                  </div>
                </>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleGenerate}
                  className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
                >
                  <Wand2 className="h-4 w-4" />
                  Generate preview
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <Save className="h-4 w-4" />
                  {activeDocumentId ? "Update document" : "Save document"}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  Reset draft
                </button>

                <button
                  type="button"
                  onClick={handleNewDocument}
                  className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
                >
                  <Plus className="h-4 w-4" />
                  New document
                </button>

                {activeDocumentId ? (
                  <button
                    type="button"
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
                        type="button"
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
                            {signatureMap[doc.id] ? (
                              <div
                                className={`mt-1 inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
                                  signatureMap[doc.id] === "signed"
                                    ? "border-emerald-400/20 bg-emerald-400/8 text-emerald-300"
                                    : "border-amber-400/20 bg-amber-400/8 text-amber-300"
                                }`}
                              >
                                {signatureMap[doc.id] === "signed" ? "Signed" : "Awaiting signature"}
                              </div>
                            ) : null}
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
        activeDocumentId={activeDocumentId}
        onClose={() => setShowESignModal(false)}
        onExport={handleExport}
        onSaveDraft={handleSaveFromModal}
        onSaveFirst={handleSave}
        onSignatureCreated={handleSignatureCreated}
        open={showESignModal}
        savingDraft={savingFromModal}
        template={template}
        user={user}
      />
    </>
  );
}
