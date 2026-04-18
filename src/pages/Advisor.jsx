import { useCallback, useEffect, useRef, useState } from "react";
import {
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
  } catch {
    return "Just now";
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

function AdvisorStatusBar({ province, setProvince, advisorReady, hasLawUpdates, lawUpdatesCount }) {
  return (
    <div className="flex flex-col gap-3 border-b border-white/8 px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">Advisor</div>
        <div className="mt-1 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">Compliance copilot</div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
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
      } catch {
        // ignore
      }
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

    const loadingId = createId("assistant");
    const loadingTs = new Date().toISOString();
    setMessages((prev) => [...prev, { id: loadingId, role: "assistant", text: "", createdAt: loadingTs, streaming: true }]);

    try {
      const { reply, sources } = await callAdvisorAPI(modelHistory, province, lawUpdates);
      setAdvisorReady(true);
      setMessages((prev) => prev.map((m) => (m.id === loadingId ? { ...m, text: reply, sources, streaming: false } : m)));
    } catch (err) {
      console.error("Advisor error:", err);
      const isConfig = err.message?.includes("HUGGINGFACE_API_KEY not configured");
      if (isConfig) setAdvisorReady(false);
      const msg = isConfig
        ? "The AI advisor isn't configured yet — add HUGGINGFACE_API_KEY to your Vercel project environment variables."
        : err.message || "Could not reach the advisor. Please check your connection and try again.";
      setAdvisorError(msg);
      setMessages((prev) => prev.map((m) => (m.id === loadingId ? { ...m, text: "I'm unable to respond right now. Please try again in a moment.", streaming: false } : m)));
    } finally {
      setLoading(false);
    }
  }, [attachments, input, loading, messages, province, lawUpdates]);

  const hasLawUpdates = lawUpdates.length > 0;

  return (
    <div className="space-y-4" style={{ paddingBottom: "120px" }}>
      <section className="premium-card overflow-hidden p-0">
        <AdvisorStatusBar
          province={province}
          setProvince={setProvince}
          advisorReady={advisorReady}
          hasLawUpdates={hasLawUpdates}
          lawUpdatesCount={lawUpdates.length}
        />

        <div
          ref={chatScrollRef}
          className="w-full min-w-0 max-h-[calc(100vh-290px)] space-y-4 overflow-y-auto overflow-x-hidden px-5 py-5 md:px-6"
          style={{ width: "100%", maxWidth: "100%", boxSizing: "border-box" }}
        >
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto max-w-2xl">
                <div className="text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">Ask any Canadian HR compliance question</div>
                <div className="mt-3 text-sm leading-7 text-zinc-400 md:text-base">
                  Province-aware guidance, legislation-backed answers, and a faster path from question to action.
                </div>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
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
              </div>
            </div>
          )}

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
          <strong>Setup required:</strong> Add <code className="rounded bg-black/30 px-1">HUGGINGFACE_API_KEY</code> to your Vercel project environment variables, then redeploy.
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
              placeholder="Ask a question…"
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

        <div className="mt-3 flex flex-wrap gap-2">
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
          <Link to="/app/generator?template=Employment%20Agreement" className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <FileText className="h-4 w-4" />
            Open generator
          </Link>
          <Link to="/app/generator?template=Employment%20Agreement" className="gold-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Wand2 className="h-4 w-4" />
            Start from guidance
          </Link>
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
            <p className="mt-1 text-[10px] text-zinc-600">Powered by Mistral 7B (HF Inference) + Brave Search</p>
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
          placeholder="Ask a question…"
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
