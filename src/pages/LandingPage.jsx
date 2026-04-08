import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, MessageSquare, FileText, ShieldCheck, Sparkles } from "lucide-react";

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

function FeatureCard({ icon, title, desc, to }) {
  const content = (
    <div className="premium-card-soft p-6 transition hover:translate-y-[-2px]">
      <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
        {icon}
      </div>
      <div className="text-lg font-semibold text-zinc-100">{title}</div>
      <div className="mt-2 text-sm leading-6 text-zinc-400">{desc}</div>
    </div>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}

export default function LandingPage() {
  return (
    <div className="marketing-shell min-h-screen">
      {/* ── HERO ── */}
      <Section className="grid gap-10 py-14 md:py-20 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
        <div className="space-y-6">
          <Pill>Built for Canadian employers who don't have an HR team</Pill>

          <div className="space-y-4">
            <h1 className="metric-value max-w-4xl text-5xl font-semibold tracking-tight text-zinc-50 md:text-7xl">
              HR compliance your employment lawyer would approve — at a fraction of the cost.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              Generate bilingual, province-specific HR documents, get legislation-cited guidance,
              and manage your compliance workflow — without hiring an HR department.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Generate a document
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              to="/app"
              className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm"
            >
              Explore the app
            </Link>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-6 pt-1">
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">16</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">Templates</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">14</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">Jurisdictions</div>
            </div>
            <div className="text-center">
              <div className="font-serif text-2xl text-amber-400">EN/FR</div>
              <div className="text-xs uppercase tracking-widest text-zinc-500">Bilingual</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
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

          <div className="grid gap-3 pt-1 text-sm text-zinc-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Generate province-specific documents in under 5 minutes
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              ESA notice periods and severance calculated automatically
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-300" />
              Every document available in English and French
            </div>
          </div>
        </div>

        {/* Advisor preview widget */}
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
                Live
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-[28px] border border-white/6 bg-white/[0.03] p-5">
                <div className="mb-4 text-lg font-semibold text-zinc-100">
                  Ask a compliance question
                </div>

                <div className="mb-3 ml-auto max-w-[88%] rounded-[20px] bg-[linear-gradient(180deg,#f0bb59_0%,#d6a84f_100%)] px-4 py-3 text-sm text-black">
                  What's the minimum notice for termination in Ontario?
                </div>

                <div className="mb-3 max-w-[92%] rounded-[20px] border border-white/6 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100">
                  For most Ontario employees, statutory notice depends on length of service under the
                  ESA. For 3 years of service, the minimum is 3 weeks' notice or pay in lieu.
                </div>

                <div className="rounded-[18px] border border-white/8 bg-[#0E1218] px-4 py-3 text-sm text-zinc-500">
                  Ask a question or attach a document...
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
                    <div className="mt-1 text-sm text-zinc-400">Apr 5 - Ontario</div>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── FEATURES ── */}
      <Section className="py-6 md:py-10">
        <div className="mb-8 max-w-3xl">
          <Pill>What makes Dutiva work</Pill>
          <h2 className="metric-value mt-4 text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Everything you need to stay compliant.
          </h2>
          <p className="mt-3 text-base leading-7 text-zinc-400">
            Templates, calculations, guidance, and e-signatures — built around Canadian employment
            law, not adapted from generic software.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <FeatureCard
            to="/app/generator?template=Employment%20Agreement"
            icon={<FileText className="h-5 w-5" />}
            title="16 bilingual templates"
            desc="Offer letters, terminations, PIPs, NDAs — filled in minutes from a guided conversation, not a blank page."
          />
          <FeatureCard
            to="/app/settings"
            icon={<ShieldCheck className="h-5 w-5" />}
            title="14 jurisdictions covered"
            desc="All 10 provinces, 3 territories, and federal. Every Employment Standards Act — current legislation, not outdated references."
          />
          <FeatureCard
            to="/app/generator?template=Offer%20Letter"
            icon={<Sparkles className="h-5 w-5" />}
            title="AI-guided generation"
            desc="Answer a few questions about the situation — Dutiva fills every field and flags what to double-check before you sign."
          />
          <FeatureCard
            to="/app/advisor"
            icon={<MessageSquare className="h-5 w-5" />}
            title="Legislation-cited advisor"
            desc="Ask a compliance question in plain English. Get an answer with the exact ESA section, province, and effective date."
          />
        </div>
      </Section>

      {/* ── FOUNDER CREDIBILITY ── */}
      <Section className="py-8 md:py-12">
        <div className="rounded-[28px] border border-white/6 bg-white/[0.02] p-8 md:p-10">
          <div className="mx-auto max-w-2xl text-center">
            <Pill>Why Dutiva exists</Pill>
            <h3 className="metric-value mt-4 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              Built by someone who has actually done this work.
            </h3>
            <p className="mt-3 text-base leading-7 text-zinc-400">
              Dutiva was built by a Canadian HR and payroll professional with hands-on experience at
              federal agencies and growing organizations — someone who has processed payroll,
              filed ROEs, drafted termination letters, and navigated provincial employment standards.
              Not a team that Googled it.
            </p>
            <p className="mt-3 text-sm text-zinc-500">
              Built in Ottawa, Canada · PIPEDA-compliant
            </p>
          </div>
        </div>
      </Section>

      {/* ── BOTTOM CTA ── */}
      <Section className="py-12 md:py-16">
        <div className="premium-card overflow-hidden rounded-[32px] p-8 md:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <Pill>Start free</Pill>
              <h3 className="metric-value mt-4 text-3xl font-semibold tracking-tight text-zinc-50 md:text-4xl">
                Generate your first compliant document in under 5 minutes.
              </h3>
              <p className="mt-3 max-w-2xl text-base leading-7 text-zinc-400">
                No credit card. No setup. Pick a template, answer a few questions, and get a
                province-specific document ready to review and sign.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/app/generator?template=Offer%20Letter"
                className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
              >
                Generate a document
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/pricing" className="ghost-button inline-flex items-center gap-2 px-5 py-3 text-sm">
                See pricing
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
