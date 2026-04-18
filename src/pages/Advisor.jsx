import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Download,
  FilePlus2,
  FileText,
  Paperclip,
  RotateCcw,
  Save,
  Send,
  ShieldCheck,
  Wand2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { getStoredSettings } from "../utils/workspaceSettings";
import { renderTemplate } from "../lib/generator/index.js";
import { exportDocumentAsText, saveDocument } from "../lib/documents.js";

const ADVISOR_STORAGE_KEY = "dutiva-advisor-session-v1";
const MAX_PERSISTED_MESSAGES = 30;

function createInitialMessages() {
  const now = Date.now();
  return [
    {
      id: "seed-user",
      role: "user",
      text: "I need a termination letter for an Ontario employee without cause.",
      createdAt: new Date(now - 120_000).toISOString(),
    },
    {
      id: "seed-assistant",
      role: "assistant",
      text: "I can help with that. I’ll prepare a termination letter draft and flag the main notice and workflow points to review before sending it.",
      createdAt: new Date(now - 60_000).toISOString(),
    },
  ];
}

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatMessageTime(value) {
  try {
    return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "Just now";
  }
}

function loadPersistedAdvisorState() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ADVISOR_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return parsed;
  } catch {
    return null;
  }
}

function persistAdvisorState(state) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ADVISOR_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore storage failures
  }
}

function clearPersistedAdvisorState() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ADVISOR_STORAGE_KEY);
  } catch {
    // ignore storage failures
  }
}

async function callAdvisorAPI(messagesForModel, province, lawUpdates = []) {
  const response = await fetch("/api/advisor-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messagesForModel, province, lawUpdates }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || `Advisor API error (${response.status})`);
  }

  return {
    reply: data.response || "Unable to generate a response.",
    sources: Array.isArray(data.sources) ? data.sources : [],
  };
}

const DISCLAIMER_RE = /[\n\s]*(?:note[:\s]+)?this is (?:general guidance[,.]?\s*(?:and\s+)?not legal advice|meant? for informational purposes[^.]*)\s*\.?\s*(?:consult[^.]*\.)?/gi;

const WORKFLOW_SUGGESTIONS = [
  {
    label: "Ontario termination",
    prompt: "Generate an Ontario termination letter for an employee without cause and outline the notice items I should review.",
  },
  {
    label: "Employment agreement",
    prompt: "Create a compliant employment agreement for a new full-time Ontario hire.",
  },
  {
    label: "Offer letter",
    prompt: "Draft an offer letter for a Canadian small business hiring a full-time employee in Ontario.",
  },
  {
    label: "Independent contractor",
    prompt: "Prepare an independent contractor agreement for a Canadian consultant engagement.",
  },
  {
    label: "PIP",
    prompt: "Build a performance improvement plan for an employee who is missing deadlines and quality expectations.",
  },
];

function MarkdownText({ text }) {
  const cleaned = text.replace(DISCLAIMER_RE, "").trim();

  function parseInline(str) {
    const parts = [];
    const re = /\*\*(.+?)\*\*|\*(.+?)\*/g;
    let last = 0;
    let m;
    while ((m = re.exec(str)) !== null) {
      if (m.index > last) parts.push(str.slice(last, m.index));
      if (m[1]) parts.push(<strong key={m.index} className="font-semibold text-zinc-50">{m[1]}</strong>);
      else parts.push(<em key={m.index} className="italic text-zinc-300">{m[2]}</em>);
      last = re.lastIndex;
    }
    if (last < str.length) parts.push(str.slice(last));
    return parts;
  }

  const blocks = cleaned.split(/\n\n+/).filter(Boolean);

  function renderBlock(block, i) {
    const lines = block.split("\n");
    const isList = lines.length > 0 && lines.every((l) => /^[-*\u2022\u00b7]\s/.test(l.trimStart()));
    if (isList) {
      return (
        <ul key={i} className={`space-y-1.5 ${i > 0 ? "mt-2" : ""}`}>
          {lines.map((line, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
              <span>{parseInline(line.replace(/^[-*\u2022\u00b7]\s/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {lines.map((line, j) => (
          <span key={j}>
            {parseInline(line)}
            {j < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
    );
  }

  return <div className="leading-7">{blocks.map(renderBlock)}</div>;
}

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "min-w-0 max-w-[85%] overflow-hidden break-words rounded-[22px] px-4 py-4 text-sm shadow-sm",
          isUser
            ? "bg-[linear-gradient(180deg,var(--gold-strong)_0%,var(--gold)_100%)] text-black font-medium leading-7"
            : "border border-white/6 bg-white/[0.03] text-zinc-200",
        ].join(" ")}
        style={{ wordBreak: "break-word", overflowWrap: "anywhere" }}
      >
        {isUser ? (
          text.split("\n").map((line, i, arr) => (
            <span key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </span>
          ))
        ) : (
          <MarkdownText text={text} />
        )}
      </div>
    </div>
  );
}

function SuggestionButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 whitespace-nowrap rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-zinc-100"
    >
      {children}
    </button>
  );
}

function AdvisorStatusBar({ province, setProvince, advisorReady, hasLawUpdates, lawUpdatesCount, onReset }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/8 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Advisor</div>
        <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">Compliance copilot</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onReset}
          className="ghost-button inline-flex items-center gap-2 px-3 py-2 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          New conversation
        </button>

        <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
          <span className="mr-2 text-zinc-500">Province</span>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className="bg-transparent text-zinc-100 outline-none"
          >
            <option value="Federal">Federal</option>
            <option value="Ontario">Ontario</option>
            <option value="Quebec">Quebec</option>
            <option value="Remote (Federal)">Remote (Federal)</option>
          </select>
        </div>

        <div className={`rounded-full border px-3 py-1.5 text-xs ${advisorReady === false ? "border-red-400/20 bg-red-400/8 text-red-300" : "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"}`}>
          AI {advisorReady === false ? "Config required" : "Live"}
        </div>

        <div className={`rounded-full border px-3 py-1.5 text-xs ${hasLawUpdates ? "border-amber-400/20 bg-amber-400/10 text-amber-300" : "border-white/8 bg-white/[0.03] text-zinc-400"}`}>
          Law updates {hasLawUpdates ? `${lawUpdatesCount} new` : "Monitoring"}
        </div>
      </div>
    </div>
  );
}

function inferTemplateFromPrompt(prompt) {
  const text = String(prompt || "").toLowerCase();
  if (text.includes("termination")) return "Termination Letter";
  if (text.includes("offer letter") || (text.includes("offer") && text.includes("hire"))) return "Offer Letter";
  if (text.includes("employment agreement") || (text.includes("employment") && text.includes("agreement"))) return "Employment Agreement";
  if (text.includes("contractor")) return "Independent Contractor Agreement";
  if (text.includes("performance improvement") || text.includes("pip")) return "Performance Improvement Plan (PIP)";
  return null;
}

function buildFormDataFromPrompt(prompt, province) {
  const text = String(prompt || "");
  const lower = text.toLowerCase();
  const companyName = "Dutiva Canada";
  const common = {
    jurisdiction: province,
    companyName,
    employeeName: "Jordan Smith",
    jobTitle: "Operations Coordinator",
    manager: "Martin",
    managerTitle: "Founder & CEO",
    workLocation: province,
    startDate: "2026-05-01",
    employmentType: "full-time, permanent",
    salary: "$62,000",
    payFrequency: "bi-weekly",
    vacationWeeks: "2",
    probationLength: "three (3) months",
    employeeNoticePeriod: "two (2) weeks",
    employerWithoutCauseNotice: "the minimum notice required by the applicable employment standards legislation",
    hrContactName: "Martin",
    hrContactEmail: "hello@dutiva.ca",
    signerName: "Martin",
    signerTitle: "Founder & CEO",
    contractRate: "$85/hour",
    scopeOfWork: "Project-based consulting services as outlined in a mutually agreed statement of work.",
    performanceGoals: "Improve deadline consistency, reduce rework, and meet expected quality standards over the review period.",
    reviewDate: "2026-06-30",
    notes: "Prepared from the Advisor workspace.",
  };

  if (lower.includes("without cause")) {
    common.notes = "Prepared for a without-cause termination workflow review.";
  }
  if (lower.includes("contractor")) {
    common.jobTitle = "Independent Consultant";
    common.scopeOfWork = "Provide strategic consulting and project execution support on an independent contractor basis.";
  }
  if (lower.includes("offer")) {
    common.jobTitle = "Client Success Manager";
    common.salary = "$68,000";
  }
  if (lower.includes("performance") || lower.includes("pip")) {
    common.jobTitle = "Account Manager";
    common.performanceGoals = "Meet response-time standards, improve documentation quality, and consistently achieve weekly deliverables.";
  }

  return common;
}

function createDraftFromPrompt(prompt, province) {
  const template = inferTemplateFromPrompt(prompt);
  if (!template) return null;
  const formData = buildFormDataFromPrompt(prompt, province);
  const rendered = renderTemplate(template, formData);
  if (!rendered?.content) return null;

  const checklist = [];
  if (template === "Termination Letter") {
    checklist.push("Confirm service length and termination date.");
    checklist.push("Review statutory notice, severance, and any contractual notice terms.");
    checklist.push("Coordinate final pay, benefits continuation, and return-of-property steps.");
  } else if (template === "Employment Agreement") {
    checklist.push("Review probation, compensation, and termination language before issuing.");
    checklist.push("Ensure the agreement is signed before the employee starts work.");
  } else if (template === "Offer Letter") {
    checklist.push("Confirm position title, compensation, and start date details.");
    checklist.push("Make sure the candidate signs before the offer expiry date.");
  } else if (template === "Independent Contractor Agreement") {
    checklist.push("Check scope, rate, and payment timing.");
    checklist.push("Confirm the relationship is appropriately structured for contractor status.");
  } else if (template === "Performance Improvement Plan (PIP)") {
    checklist.push("Define measurable goals and a review timeline.");
    checklist.push("Keep records of coaching, feedback, and follow-up meetings.");
  }

  return {
    template,
    title: template,
    content: rendered.content,
    formData,
    checklist,
    generatedAt: new Date().toISOString(),
  };
}

function fallbackAdvisorReply(prompt, province, draft) {
  if (draft?.template === "Termination Letter") {
    return `I prepared a **${province} termination letter** draft in the panel beside the chat. Before sending it, confirm the employee’s service length, the termination date, and whether any contractual terms require more than minimum statutory notice.`;
  }
  if (draft?.template === "Employment Agreement") {
    return `I generated an **employment agreement draft** for ${province}. Review compensation, probation, and termination language before sending it for signature.`;
  }
  if (draft?.template === "Offer Letter") {
    return `I generated an **offer letter draft** for ${province}. You can review it, export it, or send it into the generator for further edits.`;
  }
  if (draft?.template === "Independent Contractor Agreement") {
    return `I prepared an **independent contractor agreement** draft. Review the scope, payment terms, and contractor classification points before issuing it.`;
  }
  if (draft?.template === "Performance Improvement Plan (PIP)") {
    return `I generated a **performance improvement plan** draft. Review the goals, timelines, and manager follow-up checkpoints before using it.`;
  }

  return `I can help with that. Ask me about hiring, contracts, policies, discipline, or termination workflows for ${province}.`;
}

function DocumentDraftPanel({ draft, onSave, onExport, saveState, province }) {
  if (!draft) {
    return (
      <div className="premium-card p-5">
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Generated document</div>
        <div className="mt-3 text-lg font-semibold text-zinc-50">No draft yet</div>
        <p className="mt-2 text-sm leading-7 text-zinc-400">
          Ask the advisor for a termination letter, employment agreement, offer letter, contractor agreement, or PIP. When a supported workflow is detected, a live draft will appear here.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {WORKFLOW_SUGGESTIONS.slice(0, 3).map((item) => (
            <div key={item.label} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-xs text-zinc-300">
              {item.label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="premium-card overflow-hidden p-0">
      <div className="border-b border-white/8 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Generated document</div>
            <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-50">{draft.title}</div>
            <div className="mt-1 text-xs text-zinc-500">{province} workflow · Generated {formatMessageTime(draft.generatedAt)}</div>
          </div>
          <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
            Draft ready
          </div>
        </div>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <button onClick={onSave} className="gold-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Save className="h-4 w-4" />
            {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved" : saveState === "error" ? "Save failed" : "Save document"}
          </button>
          <button onClick={onExport} className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Download className="h-4 w-4" />
            Export as .txt
          </button>
          <Link to={`/app/generator?template=${encodeURIComponent(draft.template)}`} className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Wand2 className="h-4 w-4" />
            Open in generator
          </Link>
        </div>

        {draft.checklist?.length > 0 && (
          <div className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4">
            <div className="text-sm font-medium text-amber-300">Review checklist</div>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {draft.checklist.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-2">
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="overflow-hidden rounded-3xl border border-white/8 bg-[#0b0b0c]">
          <div className="max-h-[720px] overflow-auto px-6 py-6">
            <div className="mx-auto max-w-[720px] bg-white px-6 py-8 text-[13px] leading-7 text-zinc-900">
              <pre className="whitespace-pre-wrap font-sans">{draft.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Advisor() {
  const persisted = loadPersistedAdvisorState();
  const { user } = useAuth();
  const { t } = useLang();
  const settings = getStoredSettings();
  const initialProvince = persisted?.province || settings.province || "Ontario";
  const [messages, setMessages] = useState(() => persisted?.messages?.length ? persisted.messages : createInitialMessages());
  const [input, setInput] = useState("");
  const [province, setProvince] = useState(initialProvince);
  const [loading, setLoading] = useState(false);
  const [advisorError, setAdvisorError] = useState(null);
  const [advisorReady, setAdvisorReady] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [lawUpdates, setLawUpdates] = useState([]);
  const [rateLimitWarning, setRateLimitWarning] = useState(null);
  const [draft, setDraft] = useState(() => persisted?.draft || createDraftFromPrompt("termination letter ontario without cause", initialProvince));
  const [saveState, setSaveState] = useState("idle");
  const fileInputRef = useRef(null);
  const chatScrollRef = useRef(null);
  const prevMsgCountRef = useRef(0);
  const msgTimestampsRef = useRef([]);

  useEffect(() => {
    async function load() {
      if (!user || !supabase) return;
      try {
        const { data: profile } = await supabase.from("profiles").select("province").eq("id", user.id).maybeSingle();
        if (profile?.province) setProvince(profile.province);
        const { data: updates } = await supabase.from("law_updates").select("*").order("detected_at", { ascending: false }).limit(10);
        if (updates) setLawUpdates(updates);
      } catch {
        // ignore
      }
    }
    load();
  }, [user]);

  useEffect(() => {
    persistAdvisorState({
      province,
      draft,
      messages: messages.slice(-MAX_PERSISTED_MESSAGES).map((message) => ({
        id: message.id,
        role: message.role,
        text: message.text,
        createdAt: message.createdAt,
        sources: message.sources || [],
      })),
    });
  }, [draft, messages, province]);

  useEffect(() => {
    if (messages.length > prevMsgCountRef.current) {
      prevMsgCountRef.current = messages.length;
      requestAnimationFrame(() => {
        const el = chatScrollRef.current;
        if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
      });
    }
  }, [messages]);

  const handleAttachmentChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setAttachments((cur) => [...cur, ...files.map((f) => ({ id: createId("att"), name: f.name }))]);
    e.target.value = "";
  };

  const handleResetConversation = useCallback(() => {
    const nextProvince = province || "Ontario";
    setMessages(createInitialMessages());
    setInput("");
    setAttachments([]);
    setAdvisorError(null);
    setRateLimitWarning(null);
    setSaveState("idle");
    setDraft(createDraftFromPrompt("termination letter ontario without cause", nextProvince));
    clearPersistedAdvisorState();
  }, [province]);

  const handleSaveDraft = useCallback(async () => {
    if (!draft || !user?.id) {
      setSaveState("error");
      return;
    }
    setSaveState("saving");
    try {
      await saveDocument({
        userId: user.id,
        title: draft.title,
        template: draft.template,
        content: draft.content,
        formData: draft.formData,
      });
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 1800);
    } catch {
      setSaveState("error");
      window.setTimeout(() => setSaveState("idle"), 2200);
    }
  }, [draft, user]);

  const handleExportDraft = useCallback(() => {
    if (!draft) return;
    exportDocumentAsText(draft.title, draft.content);
  }, [draft]);

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const now = Date.now();
    const windowMs = 60_000;
    const maxMsgs = 10;
    msgTimestampsRef.current = msgTimestampsRef.current.filter((t) => now - t < windowMs);
    if (msgTimestampsRef.current.length >= maxMsgs) {
      const oldest = msgTimestampsRef.current[0];
      const secsLeft = Math.ceil((windowMs - (now - oldest)) / 1000);
      setRateLimitWarning(`You've sent ${maxMsgs} messages in the last minute. Please wait ${secsLeft}s before sending again.`);
      return;
    }
    msgTimestampsRef.current.push(now);
    setRateLimitWarning(null);

    const nextDraft = createDraftFromPrompt(trimmed, province);
    if (nextDraft) {
      setDraft(nextDraft);
      setSaveState("idle");
    }

    const attachmentSummary = attachments.length > 0 ? `\n\nAttachments: ${attachments.map((a) => a.name).join(", ")}` : "";
    const userMsg = { id: createId("user"), role: "user", text: trimmed, createdAt: new Date().toISOString() };
    const modelHistory = [
      ...messages.map((m) => ({ role: m.role, text: m.text })),
      { role: "user", text: `${trimmed}${attachmentSummary}` },
    ];

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setAttachments([]);
    setLoading(true);
    setAdvisorError(null);

    const loadingId = createId("assistant");
    const loadingTs = new Date().toISOString();
    setMessages((prev) => [...prev, { id: loadingId, role: "assistant", text: "", createdAt: loadingTs, streaming: true }]);

    try {
      const { reply, sources } = await callAdvisorAPI(modelHistory, province, lawUpdates);
      setAdvisorReady(true);
      setMessages((prev) => prev.map((m) => (m.id === loadingId ? { ...m, text: reply, sources, streaming: false } : m)));
    } catch (err) {
      console.error("Advisor error:", err);
      const isConfig = err.message?.includes("not configured");
      if (isConfig) setAdvisorReady(false);
      const msg = isConfig
        ? "The AI advisor isn't configured yet — add GROQ_API_KEY or HUGGINGFACE_API_KEY to your Vercel project environment variables."
        : err.message || "Could not reach the advisor. Please check your connection and try again.";
      setAdvisorError(msg);
      const fallback = fallbackAdvisorReply(trimmed, province, nextDraft);
      setMessages((prev) => prev.map((m) => (m.id === loadingId ? { ...m, text: fallback, streaming: false } : m)));
    } finally {
      setLoading(false);
    }
  }, [attachments, input, loading, messages, province, lawUpdates]);

  const hasLawUpdates = lawUpdates.length > 0;
  const starterSuggestions = useMemo(() => WORKFLOW_SUGGESTIONS, []);

  return (
    <div className="space-y-4" style={{ paddingBottom: "120px" }}>
      <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_430px]">
        <section className="premium-card overflow-hidden p-0 min-w-0">
          <AdvisorStatusBar
            province={province}
            setProvince={setProvince}
            advisorReady={advisorReady}
            hasLawUpdates={hasLawUpdates}
            lawUpdatesCount={lawUpdates.length}
            onReset={handleResetConversation}
          />

          <div
            ref={chatScrollRef}
            className="w-full min-w-0 max-h-[calc(100vh-290px)] space-y-4 overflow-y-auto overflow-x-hidden px-5 py-5 md:px-6"
            style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
          >
            <div className="rounded-[22px] border border-white/6 bg-white/[0.03] p-4 md:p-5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-2xl border border-amber-400/15 bg-amber-400/8 p-2.5 text-amber-300">
                  <FilePlus2 className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-100">Start with a real workflow</div>
                  <div className="mt-1 text-sm leading-7 text-zinc-400">
                    Ask a question, generate a draft, then export or save it from the panel beside the conversation. Your current session stays in place if you refresh.
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {starterSuggestions.map((item) => (
                      <SuggestionButton key={item.label} onClick={() => setInput(item.prompt)}>
                        {item.label}
                      </SuggestionButton>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1.5 min-w-0 w-full">
                <MessageBubble role={msg.role} text={msg.text} />
                {msg.role === "assistant" && msg.sources?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 px-1">
                    {msg.sources.map((s, i) => (
                      <a
                        key={i}
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 rounded-full border border-white/8 bg-white/[0.04] px-2.5 py-1 text-[10px] text-zinc-400 transition hover:text-zinc-200 hover:border-white/15"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-400/60 shrink-0" />
                        {s.title.length > 40 ? `${s.title.slice(0, 40)}…` : s.title}
                      </a>
                    ))}
                  </div>
                )}
                <div className={`px-2 text-xs text-zinc-500 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.text === "" && (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4 text-sm text-zinc-500">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>&middot;</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>&middot;</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>&middot;</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>

        <div className="space-y-4 xl:sticky xl:top-6 xl:self-start">
          <DocumentDraftPanel
            draft={draft}
            onSave={handleSaveDraft}
            onExport={handleExportDraft}
            saveState={saveState}
            province={province}
          />

          <div className="premium-card p-4">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Workflow shortcuts</div>
            <div className="mt-3 grid gap-2">
              <Link to="/app/generator?template=Termination%20Letter" className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-sm">
                <FileText className="h-4 w-4" />
                Open termination letter generator
              </Link>
              <Link to="/app/documents" className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-sm">
                <Save className="h-4 w-4" />
                View saved documents
              </Link>
            </div>
          </div>
        </div>
      </div>

      {advisorError && (
        <div className="rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">
          {advisorError}
        </div>
      )}
      {rateLimitWarning && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/8 px-4 py-3 text-sm text-amber-300">
          {rateLimitWarning}
        </div>
      )}
      {advisorReady === false && (
        <div className="rounded-2xl border border-yellow-400/15 bg-yellow-400/6 px-4 py-3 text-sm text-yellow-200">
          <strong>Setup required:</strong> Add <code className="rounded bg-black/30 px-1">GROQ_API_KEY</code> or <code className="rounded bg-black/30 px-1">HUGGINGFACE_API_KEY</code> to your Vercel project environment variables, then redeploy.
        </div>
      )}

      <div className="hidden xl:block">
        <div className="rounded-[24px] border border-white/8 bg-white/[0.03] p-3 shadow-sm">
          <input ref={fileInputRef} type="file" multiple onChange={handleAttachmentChange} className="hidden" />
          {attachments.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachments.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setAttachments((c) => c.filter((x) => x.id !== a.id))}
                  className="inline-flex items-center gap-1 rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs text-amber-300"
                >
                  {a.name} <X className="h-3 w-3" />
                </button>
              ))}
            </div>
          )}
          <div className="flex items-end gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="ghost-button shrink-0 px-3 py-2.5 text-zinc-400 hover:text-zinc-200"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask a question or request a document…"
              autoComplete="off"
              className="text-[16px] flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/30 focus:bg-white/[0.06] transition-all"
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="gold-button shrink-0 px-4 py-3 disabled:opacity-40 transition-opacity"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-start gap-2 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
          <div className="min-w-0">
            <p className="text-[11px] leading-5 text-zinc-500">
              {t(
                "AI-generated responses can contain errors. Always verify important HR and legal decisions with a qualified professional before acting.",
                "Les réponses générées par IA peuvent contenir des erreurs. Vérifiez toujours les décisions RH et juridiques importantes avec un professionnel qualifié avant d'agir."
              )}
            </p>
            <p className="mt-1 text-[10px] text-zinc-600">Advisor + document preview workflow</p>
          </div>
        </div>
      </div>

      <MobileChatInputBar value={input} onChange={setInput} onSend={sendMessage} />
    </div>
  );
}

export function MobileChatInputBar({ value, onChange, onSend }) {
  return (
    <div
      className="xl:hidden fixed left-0 right-0 z-50"
      style={{
        bottom: "64px",
        background: "rgba(10,12,18,1)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 -32px 32px rgba(10,12,18,1)",
        padding: "10px 16px",
        paddingBottom: "calc(10px + env(safe-area-inset-bottom, 0px))",
      }}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && value.trim()) onSend();
          }}
          placeholder="Ask a question or request a document…"
          autoComplete="off"
          className="text-[16px]"
          style={{
            flex: 1,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "10px 16px",
            color: "white",
            outline: "none",
          }}
        />
        <button
          onClick={() => {
            if (value.trim()) onSend();
          }}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#f59e0b",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Send style={{ width: 18, height: 18, color: "#000" }} />
        </button>
      </div>
    </div>
  );
}
