import { useState } from "react";
import {
  Paperclip,
  Send,
  ShieldCheck,
  Sparkles,
  FileText,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const initialMessages = [
  {
    role: "user",
    text: "Do I need a probation clause in Ontario?",
  },
  {
    role: "assistant",
    text: "Yes — it is strongly recommended to define the probation period clearly in the employment agreement, including how termination may be handled during that period. That helps reduce ambiguity and creates a cleaner compliance workflow.",
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
      onClick={onClick}
      className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/[0.05] hover:text-zinc-100"
    >
      {children}
    </button>
  );
}

export default function Advisor() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      {
        role: "assistant",
        text: "This preview response shows how the advisor should feel: calm, authoritative, and operationally useful. In the real version, this should become context-aware based on province, company setup, and template history.",
      },
    ]);
    setInput("");
  };

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
          <button className="ghost-button px-4 py-3 text-sm">View guidance history</button>
          <Link to="/app/generator?template=Employment%20Agreement" className="gold-button px-5 py-3 text-sm">
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
            Ontario
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
          <SectionCard title="Conversation">
            <div className="scroll-area max-h-[560px] space-y-4 overflow-auto rounded-[24px] border border-white/6 bg-white/[0.02] p-4">
              {messages.map((message, index) => (
                <MessageBubble key={index} role={message.role} text={message.text} />
              ))}
            </div>

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
              <div className="flex items-end gap-3">
                <button className="ghost-button shrink-0 px-3 py-3">
                  <Paperclip className="h-4 w-4" />
                </button>

                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a Canadian HR compliance question..."
                  className="min-h-[96px] flex-1 resize-none rounded-2xl border border-white/8 bg-[#0E1218] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/20"
                />

                <button onClick={sendMessage} className="gold-button shrink-0 px-4 py-3">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
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
              <Link
                to="/app/generator?template=Employment%20Agreement"
                className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]"
              >
                <div>
                  <div className="text-sm font-medium text-zinc-100">Open document builder</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Turn guidance into a draft workflow faster
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>

              <Link
                to="/app/generator?template=Offer%20Letter"
                className="flex w-full items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-left transition hover:border-amber-400/20 hover:bg-white/[0.03]"
              >
                <div>
                  <div className="text-sm font-medium text-zinc-100">Draft from advisor context</div>
                  <div className="mt-1 text-sm text-zinc-400">
                    Move directly from guidance into a structured document workflow
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-zinc-500" />
              </Link>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}