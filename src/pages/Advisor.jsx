import { useCallback, useEffect, useRef, useState } from "react";
import {
  Paperclip,
  Send,
  ShieldCheck,
  Sparkles,
  FileText,
  ChevronRight,
  Wand2,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";

const initialMessages = [
  {
    id: "seed-user",
    role: "user",
    text: "Do I need a probation clause in Ontario?",
    createdAt: "2026-04-07T09:00:00.000Z",
  },
  {
    id: "seed-assistant",
    role: "assistant",
    text: "Yes - it is strongly recommended to define the probation period clearly in the employment agreement, including how termination may be handled during that period. That helps reduce ambiguity and creates a cleaner compliance workflow.",
    createdAt: "2026-04-07T09:01:00.000Z",
  },
];

function createId(prefix) {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function formatMessageTime(value) {
  try {
    return new Date(value).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "Just now";
  }
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

function MessageBubble({ role, text }) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "max-w-[88%] rounded-[22px] px-4 py-4 text-sm leading-6 shadow-sm",
          isUser
            ? "bg-[linear-gradient(180deg,#f0bb59_0%,#d6a84f_100%)] text-black"
            : "border border-white/6 bg-white/[0.03] text-zinc-100",
        ].join(" ")}
      >
        {text}
      </div>
    </div>
  );
}

function SuggestionButton({ children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-zinc-100"
    >
      {children}
    </button>
  );
}

function ActionLink({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]"
    >
      <div>
        <div className="text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{desc}</div>
      </div>
      <ChevronRight className="h-4 w-4 text-zinc-500" />
    </Link>
  );
}

export default function Advisor() {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [province, setProvince] = useState("Ontario");
  const [loading, setLoading] = useState(false);
  const [advisorError, setAdvisorError] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const fileInputRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    async function loadProvince() {
      if (!user || !supabase) return;

      try {
        const { data } = await supabase
          .from("profiles")
          .select("province")
          .eq("id", user.id)
          .maybeSingle();

        if (data?.province) {
          setProvince(data.province);
        }
      } catch {
        // Keep the default province for preview mode.
      }
    }

    loadProvince();
  }, [user]);

  const handleAttachmentChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setAttachments((current) => [
      ...current,
      ...files.map((file) => ({
        id: createId("attachment"),
        name: file.name,
        size: file.size,
      })),
    ]);

    event.target.value = "";
  };

  const removeAttachment = (attachmentId) => {
    setAttachments((current) => current.filter((item) => item.id !== attachmentId));
  };

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const createdAt = new Date().toISOString();
    const attachmentNames = attachments.map((item) => item.name);
    const attachmentSummary =
      attachmentNames.length > 0 ? `\n\nAttachments: ${attachmentNames.join(", ")}` : "";

    const userMessage = {
      id: createId("user"),
      role: "user",
      text: trimmed,
      createdAt,
    };

    const nextMessagesForModel = [
      ...messages.map((message) => ({ role: message.role, text: message.text })),
      {
        role: "user",
        text: `${trimmed}${attachmentSummary}`,
      },
    ];

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setLoading(true);
    setAdvisorError(null);

    try {
      if (!supabase) {
        throw new Error("Advisor service is not configured.");
      }

      const { data, error } = await supabase.functions.invoke("advisor-chat", {
        body: { messages: nextMessagesForModel, province },
      });

      if (error) throw error;

      const reply = data?.reply ?? "I'm unable to respond right now. Please try again.";
      setMessages((prev) => [
        ...prev,
        {
          id: createId("assistant"),
          role: "assistant",
          text: reply,
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      console.error("Advisor error:", error);
      setAdvisorError("Could not reach the advisor. Please check your connection and try again.");
      setMessages((prev) => [
        ...prev,
        {
          id: createId("assistant"),
          role: "assistant",
          text: "I'm unable to respond right now. Please try again in a moment.",
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [attachments, input, loading, messages, province]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Advisor
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Compliance copilot
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            A more premium advisory experience designed to feel like a trusted HR compliance workspace,
            not a generic chatbot.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => historyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            className="ghost-button px-4 py-3 text-sm"
          >
            View guidance history
          </button>
          <Link
            to="/app/generator?template=Employment%20Agreement"
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            <Wand2 className="h-4 w-4" />
            Start from guidance
          </Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="premium-card-soft p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Advisor state
            </div>
            <Sparkles className="h-4 w-4 text-amber-300" />
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-amber-300">
            Ready
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            Tuned for a premium guidance experience
          </div>
        </div>

        <div className="premium-card-soft p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Context
            </div>
            <ShieldCheck className="h-4 w-4 text-emerald-300" />
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            {province}
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            Province-aware positioning for the preview
          </div>
        </div>

        <div className="premium-card-soft p-5">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Workflow
            </div>
            <FileText className="h-4 w-4 text-zinc-300" />
          </div>
          <div className="metric-value mt-3 text-3xl font-semibold tracking-tight text-zinc-100">
            Guided
          </div>
          <div className="mt-1 text-sm text-zinc-400">
            Better aligned with document generation and actions
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <SectionCard
            title="Conversation"
            action={
              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                Guidance + workflow
              </div>
            }
          >
            <div className="scroll-area max-h-[560px] space-y-4 overflow-auto rounded-[24px] border border-white/6 bg-white/[0.02] p-4">
              {messages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <MessageBubble role={message.role} text={message.text} />
                  <div
                    className={`px-2 text-xs text-zinc-500 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatMessageTime(message.createdAt)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="rounded-[22px] border border-white/6 bg-white/[0.03] px-4 py-4 text-sm text-zinc-400">
                    Advisor is thinking...
                  </div>
                </div>
              )}
            </div>

            {advisorError ? (
              <div className="mt-4 rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">
                {advisorError}
              </div>
            ) : null}

            <div className="mt-4 flex flex-wrap gap-2">
              <SuggestionButton onClick={() => setInput("What is the minimum notice requirement in Ontario?")}>
                Ontario notice requirements
              </SuggestionButton>
              <SuggestionButton onClick={() => setInput("Help me review a probation clause.")}>
                Review probation clause
              </SuggestionButton>
              <SuggestionButton onClick={() => setInput("What should be in an offer letter?")}>
                Offer letter guidance
              </SuggestionButton>
            </div>

            <div className="mt-4 rounded-[24px] border border-white/6 bg-white/[0.02] p-3">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleAttachmentChange}
                className="hidden"
              />

              {attachments.length > 0 ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {attachments.map((attachment) => (
                    <button
                      key={attachment.id}
                      type="button"
                      onClick={() => removeAttachment(attachment.id)}
                      className="rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs text-amber-300"
                    >
                      {attachment.name} x
                    </button>
                  ))}
                </div>
              ) : null}

              <div className="flex items-end gap-3">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="ghost-button shrink-0 px-3 py-3"
                >
                  <Paperclip className="h-4 w-4" />
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      sendMessage();
                    }
                  }}
                  placeholder="Ask a Canadian HR compliance question..."
                  className="min-h-[96px] flex-1 resize-none rounded-2xl border border-white/8 bg-[#0E1218] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/20"
                />

                <button
                  type="button"
                  onClick={sendMessage}
                  disabled={loading}
                  className="gold-button shrink-0 px-4 py-3 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Guidance history"
            action={
              <div className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-xs font-medium text-zinc-300">
                {messages.length} messages
              </div>
            }
          >
            <div ref={historyRef} className="space-y-3">
              {messages.slice(-6).map((message) => (
                <div
                  key={`history-${message.id}`}
                  className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-sm font-medium text-zinc-100">
                      {message.role === "user" ? "You" : "Advisor"}
                    </div>
                    <div className="text-xs text-zinc-500">{formatMessageTime(message.createdAt)}</div>
                  </div>
                  <div className="mt-2 text-sm leading-6 text-zinc-400">{message.text}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Why this feels better">
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="text-sm font-medium text-zinc-100">Higher trust tone</div>
                <div className="mt-1 text-sm text-zinc-400">
                  The UI is calmer and more authoritative, which fits a compliance product better.
                </div>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="text-sm font-medium text-zinc-100">Cleaner hierarchy</div>
                <div className="mt-1 text-sm text-zinc-400">
                  Stronger contrast and spacing make the advisory experience easier to read in dark mode.
                </div>
              </div>

              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <div className="text-sm font-medium text-zinc-100">Product alignment</div>
                <div className="mt-1 text-sm text-zinc-400">
                  It now feels like part of the same premium system as the dashboard and templates screens.
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Recommended next actions">
            <div className="space-y-3">
              <ActionLink
                to="/app/generator?template=Employment%20Agreement"
                title="Open document builder"
                desc="Turn guidance into a draft workflow faster"
              />

              <ActionLink
                to="/app/generator?template=Offer%20Letter"
                title="Draft from advisor context"
                desc="Move directly from guidance into a structured document workflow"
              />

              <ActionLink
                to="/app/settings"
                title="Review province defaults"
                desc="Ensure the workspace context matches your compliance workflow"
              />
            </div>
          </SectionCard>

          <SectionCard title="Workflow status">
            <div className="space-y-3">
              <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Advisor handoff enabled</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Guidance can now move directly into the generator flow.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-300" />
                <div>
                  <div className="text-sm font-medium text-zinc-100">Workspace flow improving</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Separate screens now behave more like a connected product system.
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
