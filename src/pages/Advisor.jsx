import { useCallback, useEffect, useRef, useState } from "react";
import {
  Calculator,
  ChevronRight,
  FileText,
  Paperclip,
  Send,
  ShieldCheck,
  Sparkles,
  Wand2,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { getStoredSettings } from "../utils/workspaceSettings";

// ─── ESA data ─────────────────────────────────────────────────────────────────
const ESA_NOTICE = {
  Ontario: [[0, 1, 0], [1, 3, 2], [3, 4, 3], [4, 5, 4], [5, 6, 5], [6, 7, 6], [7, 8, 7], [8, Infinity, 8]],
  "British Columbia": [[0, 0.25, 0], [0.25, 1, 1], [1, 3, 2], [3, 4, 3], [4, 5, 4], [5, 6, 5], [6, 7, 6], [7, 8, 7], [8, Infinity, 8]],
  Alberta: [[0, 0.25, 0], [0.25, 2, 1], [2, 4, 2], [4, 6, 4], [6, 8, 5], [8, 10, 6], [10, Infinity, 8]],
  Quebec: [[0, 0.25, 0], [0.25, 1, 1], [1, 5, 2], [5, 10, 4], [10, Infinity, 8]],
  Manitoba: [[0, 0.08, 0], [0.08, 1, 1], [1, 3, 2], [3, 5, 4], [5, 10, 6], [10, Infinity, 8]],
  Saskatchewan: [[0, 0.25, 0], [0.25, 3, 2], [3, 5, 4], [5, 10, 6], [10, Infinity, 8]],
  "Nova Scotia": [[0, 0.25, 0], [0.25, 2, 1], [2, 5, 2], [5, 10, 4], [10, Infinity, 8]],
  "New Brunswick": [[0, 0.5, 0], [0.5, 5, 2], [5, Infinity, 4]],
  Federal: [[0, 0.25, 0], [0.25, Infinity, 2]],
  "Newfoundland and Labrador": [[0, 0.17, 0], [0.17, 2, 1], [2, 5, 2], [5, 15, 3], [15, Infinity, 4]],
  "Prince Edward Island": [[0, 0.17, 0], [0.17, 6, 2], [6, Infinity, 4]],
  "Northwest Territories": [[0, 0.17, 0], [0.17, 1, 1], [1, 3, 2], [3, 5, 3], [5, 10, 4], [10, Infinity, 6]],
  Nunavut: [[0, 0.17, 0], [0.17, 1, 1], [1, 3, 2], [3, 5, 3], [5, 10, 4], [10, Infinity, 6]],
  Yukon: [[0, 0.17, 0], [0.17, 1, 1], [1, 3, 2], [3, 5, 3], [5, 10, 4], [10, Infinity, 8]],
};

function getNoticeWeeks(province, years) {
  const table = ESA_NOTICE[province] || ESA_NOTICE["Ontario"];
  for (const [min, max, weeks] of table) {
    if (years >= min && years < max) return weeks;
  }
  return table[table.length - 1][2];
}

const CANADIAN_JURISDICTIONS = [
  "Ontario", "British Columbia", "Alberta", "Quebec", "Manitoba",
  "Saskatchewan", "Nova Scotia", "New Brunswick", "Federal",
  "Newfoundland and Labrador", "Prince Edward Island",
  "Northwest Territories", "Nunavut", "Yukon",
];

function createInitialMessages() {
  const now = Date.now();
  return [
    {
      id: "seed-user",
      role: "user",
      text: "Do I need a probation clause in Ontario?",
      createdAt: new Date(now - 120_000).toISOString(),
    },
    {
      id: "seed-assistant",
      role: "assistant",
      text: "Yes — it is strongly recommended. In Ontario, the Employment Standards Act, 2000, s. 57 exempts employers from the statutory notice requirement for employees with less than 3 months of service. Without a clearly written probation clause, you lose that protection and may face common-law reasonable notice claims from day one.\n\nBest practice: state the probation period (typically 3 months), explain the termination standard during probation, and include it in a signed employment agreement before the start date.",
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
  } catch { return "Just now"; }
}

async function callAdvisorAPI(messagesForModel, province, lawUpdates = [], onToken) {
  const response = await fetch("/api/advisor-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages: messagesForModel, province, lawUpdates }),
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || `Advisor API error (${response.status})`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let fullText = "";
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      const payload = line.slice(6).trim();
      if (payload === "[DONE]") continue;
      try {
        const parsed = JSON.parse(payload);
        const token = parsed.choices?.[0]?.delta?.content ?? "";
        if (token) {
          fullText += token;
          onToken?.(fullText);
        }
      } catch { /* ignore malformed SSE lines */ }
    }
  }

  return fullText.trim() || "Unable to generate a response.";
}

// ─── ESA Calculator component ────────────────────────────────────────────────
function ESACalculator() {
  const settings = getStoredSettings();
  const [province, setProvince] = useState(settings.province || "Ontario");
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
        severanceNote = `ESA, 2000, s. 64–65 · Max 26 weeks`;
      } else if (y >= 5) {
        severanceNote = "May apply if payroll ≥ $2.5M — confirm above";
      }
    } else if (province === "Federal") {
      if (y >= 1) {
        severanceWeeks = Math.min(Math.floor(y) * 2, 0);
        severanceNote = "Canada Labour Code, s. 235 — contact legal counsel";
      }
    }

    const severancePay = severanceWeeks * weeklyWage;

    const actMap = {
      Ontario: "ESA, 2000, s. 57",
      "British Columbia": "Employment Standards Act, s. 63",
      Alberta: "Employment Standards Code, s. 56",
      Quebec: "Act Respecting Labour Standards, s. 82",
      Manitoba: "Employment Standards Code, s. 61",
      Saskatchewan: "Saskatchewan Employment Act, s. 2-60",
      "Nova Scotia": "Labour Standards Code, s. 72",
      "New Brunswick": "Employment Standards Act, s. 30",
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
            {CANADIAN_JURISDICTIONS.map((j) => (<option key={j} value={j}>{j}</option>))}
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
            <span className="text-xs text-zinc-300">Employer payroll ≥ $2.5M (enables severance)</span>
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
            <div className="mt-0.5 text-xs text-zinc-400">Pay in lieu: {fmt(result.payInLieu)} · Weekly wage: {fmt(result.weeklyWage)}</div>
          </div>
          {(result.severanceWeeks > 0 || result.severanceNote) && (
            <div className="rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Severance pay</div>
              {result.severanceWeeks > 0 ? (
                <>
                  <div className="mt-1 text-xl font-bold text-zinc-100">{result.severanceWeeks} weeks · {fmt(result.severancePay)}</div>
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
            <div className="mt-0.5 text-xs text-zinc-500">{result.actRef} · statutory only</div>
          </div>
          <p className="text-xs text-zinc-500 pt-1">Common-law reasonable notice often exceeds statutory minimums. Consult legal counsel before terminating.</p>
        </div>
      )}
    </section>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────
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

function MessageBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={[
        "max-w-[88%] rounded-[22px] px-4 py-4 text-sm shadow-sm",
        isUser
          ? "bg-[linear-gradient(180deg,var(--gold-strong)_0%,var(--gold)_100%)] text-black font-medium leading-7"
          : "border border-white/6 bg-white/[0.03] text-zinc-200",
      ].join(" ")}>
        {isUser ? (
          text.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))
        ) : (
          <MarkdownText text={text} />
        )}
      </div>
    </div>
  );
}

const DISCLAIMER_RE = /[\n\s]*(?:note[:\s]+)?this is (?:general guidance[,.]?\s*(?:and\s+)?not legal advice|meant? for informational purposes[^.]*)\s*\.?\s*(?:consult[^.]*\.)?/gi;

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
      else       parts.push(<em     key={m.index} className="italic text-zinc-300">{m[2]}</em>);
      last = re.lastIndex;
    }
    if (last < str.length) parts.push(str.slice(last));
    return parts;
  }

  const blocks = cleaned.split(/\n\n+/).filter(Boolean);

  function renderBlock(block, i) {
    const lines = block.split("\n");
    const isList = lines.length > 0 && lines.every((l) => /^[-*•]\s/.test(l.trimStart()));
    if (isList) {
      return (
        <ul key={i} className={`space-y-1.5 ${i > 0 ? "mt-2" : ""}`}>
          {lines.map((line, j) => (
            <li key={j} className="flex items-start gap-2.5">
              <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/50" />
              <span>{parseInline(line.replace(/^[-*•]\s/, ""))}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p key={i} className={i > 0 ? "mt-2" : ""}>
        {lines.map((line, j) => (
          <span key={j}>{parseInline(line)}{j < lines.length - 1 && <br />}</span>
        ))}
      </p>
    );
  }

  return <div className="leading-7">{blocks.map(renderBlock)}</div>;
}

function SuggestionButton({ children, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className="shrink-0 whitespace-nowrap rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-zinc-100">
      {children}
    </button>
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

// ─── Main Advisor page ────────────────────────────────────────────────────────
export default function Advisor() {
  const { user } = useAuth();
  const { t } = useLang();
  const settings = getStoredSettings();
  const [messages, setMessages] = useState(createInitialMessages);
  const [input, setInput] = useState("");
  const [province, setProvince] = useState(settings.province || "Ontario");
  const [loading, setLoading] = useState(false);
  const [advisorError, setAdvisorError] = useState(null);
  const [advisorReady, setAdvisorReady] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [lawUpdates, setLawUpdates] = useState([]);
  const [rateLimitWarning, setRateLimitWarning] = useState(null);
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
      } catch { /* ignore */ }
    }
    load();
  }, [user]);

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

    const streamId = createId("assistant");
    const streamTs = new Date().toISOString();
    setMessages((prev) => [...prev, { id: streamId, role: "assistant", text: "", createdAt: streamTs, streaming: true }]);

    try {
      const reply = await callAdvisorAPI(modelHistory, province, lawUpdates, (partial) => {
        setMessages((prev) => prev.map((m) => (m.id === streamId ? { ...m, text: partial } : m)));
      });
      setAdvisorReady(true);
      setMessages((prev) => prev.map((m) => m.id === streamId ? { ...m, text: reply, streaming: false } : m));
    } catch (err) {
      console.error("Advisor error:", err);
      const isConfig = err.message?.includes("HF_TOKEN not configured");
      if (isConfig) setAdvisorReady(false);
      const msg = isConfig
        ? "The AI advisor isn't configured yet — add HF_TOKEN to your Vercel project environment variables."
        : err.message || "Could not reach the advisor. Please check your connection and try again.";
      setAdvisorError(msg);
      setMessages((prev) => prev.map((m) => m.id === streamId ? { ...m, text: "I'm unable to respond right now. Please try again in a moment.", streaming: false } : m));
    } finally {
      setLoading(false);
    }
  }, [attachments, input, loading, messages, province, lawUpdates, setRateLimitWarning]);

  const hasLawUpdates = lawUpdates.length > 0;

  return (
    <div className="space-y-8 pb-[140px] xl:pb-0">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Advisor
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Compliance copilot
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            Ask any Canadian HR compliance question. Province-aware and always current with the latest legislative changes.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/app/generator?template=Employment%20Agreement" className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm">
            Open generator
          </Link>
          <Link to="/app/generator?template=Employment%20Agreement" className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
            <Wand2 className="h-4 w-4" />
            Start from guidance
          </Link>
        </div>
      </div>

      {/* Status cards — horizontal scroll on mobile, 3-col grid on md+ */}
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-3 md:overflow-visible md:pb-0">
        <div className="premium-card-soft shrink-0 min-w-[200px] p-4 md:min-w-0 md:p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">AI engine</div>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <div className={`metric-value mt-2 text-2xl font-semibold tracking-tight md:mt-3 md:text-3xl ${advisorReady === false ? "text-red-400" : advisorReady ? "text-amber-300" : "text-zinc-400"}`}>
            {advisorReady === false ? "Error" : advisorReady ? "Qwen 2.5" : "Ready"}
          </div>
          <div className="mt-1 text-xs text-zinc-400 md:text-sm">
            {advisorReady === false ? "Check HF_TOKEN in Vercel env vars" : advisorReady ? "HF Inference API — live" : "AI advisor ready"}
          </div>
        </div>

        <div className="premium-card-soft shrink-0 min-w-[200px] p-4 md:min-w-0 md:p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Jurisdiction</div>
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>
          <div className="metric-value mt-2 text-2xl font-semibold tracking-tight text-zinc-100 md:mt-3 md:text-3xl">{province}</div>
          <div className="mt-1 text-xs text-zinc-400 md:text-sm">14 Canadian jurisdictions supported</div>
        </div>

        <div className="premium-card-soft shrink-0 min-w-[200px] p-4 md:min-w-0 md:p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Law updates</div>
            <FileText className="h-4 w-4 text-zinc-300" />
          </div>
          <div className={`metric-value mt-2 text-2xl font-semibold tracking-tight md:mt-3 md:text-3xl ${hasLawUpdates ? "text-emerald-300" : "text-zinc-400"}`}>
            {hasLawUpdates ? `${lawUpdates.length} new` : "Monitoring"}
          </div>
          <div className="mt-1 text-xs text-zinc-400 md:text-sm">
            {hasLawUpdates ? "Recent legislative changes detected" : "Government websites watched daily"}
          </div>
        </div>
      </div>

      {/* Law updates banner */}
      {hasLawUpdates && (
        <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/6 px-5 py-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
            <div>
              <div className="text-sm font-semibold text-emerald-200">Legislative changes detected — advisor context updated</div>
              <div className="mt-1 text-xs text-emerald-300/70">
                {lawUpdates.slice(0, 2).map((u) => u.change_description).join(" · ")}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        {/* Left: Chat */}
        <SectionCard title="Conversation"
          action={<div className={`rounded-full border px-3 py-1 text-xs font-medium ${advisorReady === false ? "border-red-400/20 bg-red-400/8 text-red-300" : "border-amber-400/12 bg-amber-400/6 text-amber-300"}`}>
            {advisorReady === false ? "Config required" : `${province} · Live`}
          </div>}>

          <div ref={chatScrollRef} className="scroll-area max-h-[560px] space-y-4 overflow-auto rounded-[24px] border border-white/6 bg-white/[0.02] p-4">
            {messages.map((msg) => (
              <div key={msg.id} className="space-y-1.5">
                <MessageBubble role={msg.role} text={msg.text} />
                <div className={`px-2 text-xs text-zinc-500 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                  {formatMessageTime(msg.createdAt)}
                </div>
              </div>
            ))}
            {loading && messages[messages.length - 1]?.text === "" && (
              <div className="flex justify-start">
                <div className="rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4 text-sm text-zinc-500">
                  <span className="inline-flex gap-1">
                    <span className="animate-bounce" style={{ animationDelay: "0ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "150ms" }}>·</span>
                    <span className="animate-bounce" style={{ animationDelay: "300ms" }}>·</span>
                  </span>
                </div>
              </div>
            )}
          </div>

          {advisorError && (
            <div className="mt-4 rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">
              {advisorError}
            </div>
          )}

          {rateLimitWarning && (
            <div className="mt-4 rounded-2xl border border-amber-400/20 bg-amber-400/8 px-4 py-3 text-sm text-amber-300">
              {rateLimitWarning}
            </div>
          )}

          {advisorReady === false && (
            <div className="mt-4 rounded-2xl border border-yellow-400/15 bg-yellow-400/6 px-4 py-3 text-sm text-yellow-200">
              <strong>Setup required:</strong> Add <code className="bg-black/30 px-1 rounded">HF_TOKEN</code> to your Vercel project environment variables, then redeploy.
            </div>
          )}

          {/* Suggestion chips — horizontally scrollable on mobile to avoid overflow */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <SuggestionButton onClick={() => setInput(`What is the minimum notice period for a 4-year employee in ${province}?`)}>
              {province} notice · 4yr
            </SuggestionButton>
            <SuggestionButton onClick={() => setInput(`What are the probation clause requirements in ${province}?`)}>
              Probation clause
            </SuggestionButton>
            <SuggestionButton onClick={() => setInput("When is severance pay required vs. notice pay?")}>
              Severance vs. notice
            </SuggestionButton>
            <SuggestionButton onClick={() => setInput(`What should an employment offer letter include to be compliant in ${province}?`)}>
              Offer letter checklist
            </SuggestionButton>
          </div>

          {/* Input + disclosure — hidden on mobile (uses fixed bar below); shown xl+ */}
          <div className="hidden xl:block">
            <div className="mt-4 rounded-[24px] border border-white/8 bg-white/[0.03] p-3 shadow-sm">
              <input ref={fileInputRef} type="file" multiple onChange={handleAttachmentChange} className="hidden" />
              {attachments.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((a) => (
                    <button key={a.id} type="button" onClick={() => setAttachments((c) => c.filter((x) => x.id !== a.id))}
                      className="inline-flex items-center gap-1 rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs text-amber-300">
                      {a.name} <X className="h-3 w-3" />
                    </button>
                  ))}
                </div>
              )}
              <div className="flex items-end gap-2">
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="ghost-button shrink-0 px-3 py-2.5 text-zinc-400 hover:text-zinc-200">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
                  placeholder="Ask a question…"
                  className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/30 focus:bg-white/[0.06] transition-all"
                />
                <button type="button" onClick={sendMessage} disabled={loading || !trimmedInput(input)}
                  className="gold-button shrink-0 px-4 py-3 disabled:opacity-40 transition-opacity">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* AI disclosure */}
            <div className="mt-3 flex items-start gap-2 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
              <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zinc-500" />
              <p className="text-[11px] leading-5 text-zinc-500">
                {t(
                  "AI-generated responses can contain errors. Always verify important HR and legal decisions with a qualified professional before acting.",
                  "Les réponses générées par IA peuvent contenir des erreurs. Vérifiez toujours les décisions RH et juridiques importantes avec un professionnel qualifié avant d'agir."
                )}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Right: Calculator + history + actions */}
        <div className="space-y-6">
          <ESACalculator />

          <SectionCard title="Next steps">
            <div className="space-y-3">
              <ActionLink to="/app/generator?template=Employment%20Agreement" title="Open document builder" desc="Turn guidance into a draft in one click" />
              <ActionLink to="/app/generator?template=Termination%20Letter" title="Generate termination letter" desc="Pre-filled with ESA notice calculations" />
              <ActionLink to="/app/settings" title="Verify province defaults" desc="Ensure jurisdiction context is correct" />
            </div>
          </SectionCard>

          <SectionCard title="Guidance history"
            action={<div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">{messages.length} messages</div>}>
            <div className="space-y-3">
              {messages.slice(-5).map((msg) => (
                <div key={`h-${msg.id}`} className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-zinc-100">{msg.role === "user" ? "You" : "Advisor"}</div>
                    <div className="text-xs text-zinc-500">{formatMessageTime(msg.createdAt)}</div>
                  </div>
                  <div className="mt-2 line-clamp-3 text-sm leading-6 text-zinc-400">{msg.text}</div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Mobile fixed chat input — sits above the 64px bottom nav */}
      <MobileChatInputBar
        input={input}
        setInput={setInput}
        loading={loading}
        sendMessage={sendMessage}
      />
    </div>
  );
}

function trimmedInput(val) {
  return val.trim();
}

// Exported so Advisor can render this outside its scroll context on mobile
export function MobileChatInputBar({ input, setInput, loading, sendMessage }) {
  return (
    <div
      className="xl:hidden fixed left-0 right-0 z-40 border-t border-white/10 bg-[rgba(10,12,18,0.95)] px-3 py-3 backdrop-blur-md"
      style={{ bottom: "calc(64px + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); sendMessage(); } }}
          placeholder="Ask a question…"
          className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/30 focus:bg-white/[0.08] transition-all"
        />
        <button
          type="button"
          onClick={sendMessage}
          disabled={loading || !trimmedInput(input)}
          className="gold-button shrink-0 px-4 py-3 disabled:opacity-40 transition-opacity"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
