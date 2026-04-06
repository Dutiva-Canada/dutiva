import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  MessageSquare,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function Section({ children, className = "" }) {
  return <section className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>{children}</section>;
}

function Pill({ children }) {
  return (
    <div className="rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
      {children}
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="premium-card-soft p-6">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
        {icon}
      </div>
      <div className="text-lg font-semibold text-zinc-100">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{desc}</div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div className="marketing-shell min-h-screen">
      {/* Hero */}
      <Section className="grid gap-10 py-14 md:py-20 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
        <div className="space-y-6">
          <Pill>HR compliance made simple for Canadian businesses</Pill>

          <div className="space-y-4">
            <h1 className="metric-value max-w-4xl text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl">
              Build compliant HR foundations without hiring a full HR team.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              Generate bilingual, Canada-ready HR documents, get operational guidance, and manage
              compliance workflows from one premium workspace.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app"
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Open app preview
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/pricing"
              className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              View pricing
            </Link>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              Province-specific support
            </div>
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              Bilingual-ready workflows
            </div>
            <div className="rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300">
              Built for SMBs and growing teams
            </div>
          </div>

          <div className="grid gap-3 pt-2 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Generate HR documents in minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Reduce setup time with a cleaner workflow
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Strengthen trust with a more structured compliance system
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="premium-card overflow-hidden rounded-[32px] p-0">
          <div className="grid gap-5 bg-[linear-gradient(180deg,rgba(18,22,30,0.98)_0%,rgba(14,17,24,0.98)_100%)] p-6">
            <div className="flex items-center justify-between border-b border-white/6 pb-4">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-semibold text-zinc-100">Dutiva Advisor</div>
                  <div className="text-sm text-zinc-400">Ontario jurisdiction</div>
                </div>
              </div>

              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                Premium preview
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                <div className="mb-4 text-lg font-semibold text-zinc-100">
                  Ask a compliance question
                </div>

                <div className="mb-3 ml-auto max-w-[88%] rounded-[20px] bg-[linear-gradient(180deg,#f0bb59_0%,#d6a84f_100%)] px-4 py-3 text-sm text-black">
                  What’s the minimum notice for termination in Ontario?
                </div>

                <div className="mb-3 max-w-[92%] rounded-[20px] border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100">
                  For most Ontario employees, statutory notice depends on length of service under the
                  ESA. For 3 years of service, the minimum is 3 weeks’ notice or pay in lieu.
                </div>

                <div className="rounded-[18px] border border-white/8 bg-[#0E1218] px-4 py-3 text-sm text-zinc-500">
                  Ask a question or attach a document…
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Quick actions
                  </div>

                  <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">New document</span>
                    <strong className="text-sm text-zinc-100">16 templates</strong>
                  </div>

                  <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">Jurisdiction</span>
                    <strong className="text-sm text-zinc-100">Ontario</strong>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
                    <span className="text-sm text-zinc-300">Workflow</span>
                    <strong className="text-sm text-zinc-100">Bilingual</strong>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                    Recent document
                  </div>

                  <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                    <div className="font-medium text-zinc-100">Employment Offer Letter</div>
                    <div className="mt-1 text-sm text-zinc-400">Apr 5 · Ontario</div>
                  </div>

                  <div className="mt-3 rounded-2xl border border-amber-400/10 bg-amber-400/6 px-4 py-4 text-sm text-zinc-300">
                    General HR guidance only. Not legal advice.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Features */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>What makes Dutiva valuable</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            A more structured system for HR compliance work.
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            This version is designed to feel less like scattered templates and more like an
            operational platform for Canadian businesses.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="Tailored HR documents"
            desc="Generate cleaner, more professional HR documents with stronger workflow structure."
          />
          <FeatureCard
            icon={<ShieldCheck className="h-5 w-5" />}
            title="Canada-first design"
            desc="Built around Canadian business realities instead of feeling retrofitted from generic software."
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="Guided generation"
            desc="Move from static templates toward a more guided drafting and review experience."
          />
          <FeatureCard
            icon={<MessageSquare className="h-5 w-5" />}
            title="Advisor support"
            desc="Get a more premium advisory experience that feels integrated with your document workflow."
          />
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-12 md:py-16">
        <div className="premium-card overflow-hidden rounded-[32px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Pill>Start free</Pill>
              <h3 className="metric-value mt-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                Open the app preview and see the product direction live.
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                The app preview now follows the same premium direction as the new landing page —
                stronger hierarchy, better contrast, and a more credible SaaS feel.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/app" className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
                Open app preview
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm">
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
