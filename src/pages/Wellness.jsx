import { useState } from "react";
import {
  Activity,
  AlertCircle,
  BookOpen,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  FileText,
  Heart,
  Info,
  Printer,
  RotateCcw,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext.jsx";

// ─── SectionCard (matches existing app pattern) ───────────────────────────────
function SectionCard({ title, children, action }) {
  return (
    <section className="premium-card p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {action && <div>{action}</div>}
      </div>
      {children}
    </section>
  );
}

// ─── ComingSoon placeholder ────────────────────────────────────────────────────
function ComingSoon({ pillar, description }) {
  return (
    <div className="premium-card p-10 text-center">
      <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.04]">
        <Activity className="h-6 w-6 text-zinc-500" />
      </div>
      <h3 className="text-base font-semibold text-zinc-100">{pillar}</h3>
      <p className="mt-2 text-sm text-zinc-400">{description}</p>
      <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1.5 text-xs font-medium text-amber-300">
        On the roadmap
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLAR A — MENTAL HEALTH & EAP READINESS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Mental Health Support Checklist ─────────────────────────────────────────
const MH_CHECKLIST_ITEMS = [
  {
    id: "mh1",
    text: "Employer has a written mental health policy",
    note: "A written policy signals organizational commitment and sets expectations for all staff. Reference: National Standard of Canada for Psychological Health and Safety (CSA Z1003-13).",
  },
  {
    id: "mh2",
    text: "EAP program is in place and communicated to all staff",
    note: "Employees can only access EAP if they know it exists. Annual all-staff communication is best practice. Include access instructions in the employee handbook.",
  },
  {
    id: "mh3",
    text: "Managers trained in mental health first aid",
    note: "Mental Health First Aid Canada training equips managers to recognize signs of distress and respond appropriately. Recommended: 2-day MHFA Standard course.",
  },
  {
    id: "mh4",
    text: "Return-to-work plan process documented",
    note: "A documented RTW process reduces inconsistency, supports the duty to accommodate, and protects against human rights complaints during reintegration.",
  },
  {
    id: "mh5",
    text: "Accommodation process for mental health conditions exists",
    note: "Mental health disability is a protected ground under all Canadian human rights codes. A clear accommodation process is a legal requirement, not optional.",
  },
  {
    id: "mh6",
    text: "Confidentiality protocols are documented",
    note: "Employees are significantly more likely to use EAP and disclose needs when they trust their information is kept private. Protocols must be communicated clearly.",
  },
  {
    id: "mh7",
    text: "Regular check-ins / pulse surveys scheduled",
    note: "Ongoing monitoring enables early identification of psychological health risks before they escalate. Surveys should be anonymous, at minimum quarterly.",
  },
  {
    id: "mh8",
    text: "Mental health days tracked separately from sick days (where required)",
    note: "Some jurisdictions and organizational policies distinguish mental health leave from general sick leave for reporting, policy, and WSIB/WCB purposes.",
  },
];

function MentalHealthChecklist() {
  const [checked, setChecked] = useState({});

  const checkedCount = MH_CHECKLIST_ITEMS.filter((i) => checked[i.id]).length;
  const pct = Math.round((checkedCount / MH_CHECKLIST_ITEMS.length) * 100);

  return (
    <SectionCard
      title="Mental Health Support Checklist"
      action={
        <button
          onClick={() => setChecked({})}
          className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Review your organization's mental health readiness. Check each item your workplace has in
        place. Each item includes a note explaining why it matters.
      </p>

      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>
          {checkedCount} of {MH_CHECKLIST_ITEMS.length} items in place
        </span>
        {checkedCount === MH_CHECKLIST_ITEMS.length && (
          <span className="flex items-center gap-1 text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            Fully complete
          </span>
        )}
      </div>
      <div className="mb-1.5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-1.5 rounded-full bg-amber-400 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mb-5 text-right text-xs text-zinc-500">{pct}% complete</div>

      {/* Items */}
      <div className="space-y-2">
        {MH_CHECKLIST_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))}
            className={[
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
              checked[item.id]
                ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                : "border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]",
            ].join(" ")}
          >
            <div
              className={[
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition",
                checked[item.id]
                  ? "border-emerald-400/40 bg-emerald-400/20 text-emerald-400"
                  : "border-white/20 bg-white/[0.03]",
              ].join(" ")}
            >
              {checked[item.id] && <Check className="h-3 w-3" />}
            </div>
            <div className="min-w-0 flex-1">
              <span
                className={`text-sm ${checked[item.id] ? "text-zinc-500 line-through" : "text-zinc-300"}`}
              >
                {item.text}
              </span>
              <div className="mt-1.5 flex items-start gap-1.5 text-xs text-zinc-500">
                <Info className="mt-0.5 h-3 w-3 shrink-0 text-amber-300/40" />
                {item.note}
              </div>
            </div>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── EAP Referral Guide ────────────────────────────────────────────────────────
const EAP_SECTIONS = [
  {
    id: "what",
    title: "What is an EAP and what does it cover",
    content: [
      "An Employee and Family Assistance Program (EAP) is a confidential, employer-sponsored service providing short-term counselling, mental health support, and referrals.",
      "Typical EAP services: short-term counselling (6–12 sessions/year), mental health assessments, 24/7 crisis lines, financial and legal consultation, and eldercare/childcare referrals.",
      "EAP providers in Canada include: Morneau Shepell (LifeWorks), Ceridian Lifeworks, Homewood Health, MHM Services, and many regional providers.",
      "Services are available to the employee and typically their immediate household members at no cost. The employer pays for access, not per-use.",
      "The employer does not receive any information about individual employee usage — only aggregate, anonymized utilization statistics.",
    ],
  },
  {
    id: "how",
    title: "How to refer an employee (step-by-step, all jurisdictions)",
    content: [
      "Step 1 — Identify the concern: Notice signs of distress, performance decline, or the employee discloses a mental health struggle.",
      "Step 2 — Private conversation: Use the Manager Conversation Guide to open the discussion without diagnosing or pressuring.",
      "Step 3 — Provide EAP contact info: Share the EAP access number or portal URL directly. Confirm the service is available at no cost.",
      "Step 4 — Confirm confidentiality: Reassure the employee that you will receive no information about what they discuss with an EAP counsellor.",
      "Step 5 — Document the referral: Record the date, that a referral was offered, and the employee's response. Do NOT record the reason or any suspected diagnosis.",
      "Step 6 — Follow up: Check in on general well-being in 1–2 weeks. Do not ask whether they contacted the EAP.",
      "Ontario note: Managers aware of employee distress have a duty-of-care responsibility to refer to available resources. Documented referrals are relevant in WSIB mental stress claims.",
      "Quebec note: Under ARLS ss. 81.19, employers must take reasonable steps to prevent psychological harassment. EAP referral is part of that obligation.",
      "Federal note: Under Canada Labour Code Part II, federally regulated employers must have psychological health and safety policies and programs.",
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality obligations",
    content: [
      "The employer cannot request, receive, or be informed of what an employee discusses with an EAP counsellor. EAP providers operate independently under strict confidentiality.",
      "Aggregate (anonymized, non-identifiable) utilization statistics may be reported to the employer — no individual-level data.",
      "If an employee voluntarily discloses to their manager what they discussed in EAP, the manager must still treat that information with strict confidentiality.",
      "Exception: confidentiality may be broken only when there is an imminent risk of harm to the employee or others — in which case the EAP provider follows its own duty-to-warn protocols.",
      "Employer obligations: Keep mental health disclosures in a separate confidential file, not the general personnel file. Limit access to HR and relevant managers only.",
    ],
  },
  {
    id: "cost",
    title: "Cost coverage rules by jurisdiction",
    content: [
      "Ontario: No statutory obligation to provide an EAP, but WSIB and occupational health obligations incentivize it. Cost is a fully deductible business expense.",
      "Quebec: No statutory EAP obligation, but employers with 10+ employees have obligations under the Act respecting labour standards to prevent psychological harassment. Fully deductible.",
      "Federal: Federally regulated employers (banks, telecoms, transport) have obligations under CLC Part II to protect psychological health. EAP is strongly recommended and may be required.",
      "Typical cost: $1.50–$5.00 per employee per month (PEPM). Coverage typically includes the employee and all household members.",
      "Group benefits: Many comprehensive group plans include EAP through the benefits carrier (Sun Life, Manulife, Canada Life, Desjardins).",
    ],
  },
  {
    id: "free",
    title: "Free EAP options for small employers",
    content: [
      "Wellness Together Canada: Free federal government program offering mental health resources, online CBT tools, and phone counselling (wellnesstogether.ca).",
      "Provincial crisis lines: All provinces operate free 24/7 crisis lines (Ontario: 1-866-531-2600; Quebec: 1-866-APPELLE; national: 1-833-456-4566 / 988).",
      "Kids Help Phone: Free 24/7 counselling for employees who are parents or caregivers (kidshelpphone.ca).",
      "Chamber of Commerce group plans: Some regional chambers offer small-employer group benefit plans with EAP access at reduced rates.",
      "Mental Health Commission of Canada: Free toolkits, training, and the National Standard for Psychological Health and Safety (mentalhealthcommission.ca) at no cost.",
      "BounceBack (CMHA): Free structured self-help program with telephone coaching, available in most provinces through CMHA.",
    ],
  },
];

function EAPReferralGuide() {
  const [open, setOpen] = useState(null);

  return (
    <SectionCard title="EAP Referral Guide">
      <p className="mb-4 text-sm text-zinc-400">
        Reference guide covering EAP fundamentals, referral procedures, confidentiality rules, and
        free options for small employers. Expand each section for details.
      </p>
      <div className="space-y-2">
        {EAP_SECTIONS.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === s.id ? null : s.id)}
              className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div className="text-sm font-medium text-zinc-100">{s.title}</div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open === s.id ? "rotate-180" : ""}`}
              />
            </button>
            {open === s.id && (
              <div className="border-t border-white/6 px-4 pb-4 pt-3">
                <ul className="space-y-2">
                  {s.content.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Return-to-Work After Mental Health Leave card ─────────────────────────────
function ReturnToWorkMentalHealthCard() {
  return (
    <SectionCard
      title="Return-to-Work Plan (Mental Health)"
      action={
        <Link
          to="/app/generator?template=Return-to-Work%20Plan%20(Mental%20Health)"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Structured return-to-work plan for employees returning from mental health leave. Documents
        modified duties, schedule, support resources, check-in cadence, and review dates — aligned
        with the duty to accommodate.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Employee info and medical restrictions",
          "Modified duties and schedule",
          "Support resources and EAP referral",
          "Manager check-in cadence",
          "Gradual return timeline",
          "Review date and exit criteria",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Manager Conversation Guide ────────────────────────────────────────────────
const MANAGER_CONVO_STEPS = [
  {
    id: "open",
    title: "Opening the conversation",
    content: [
      "Choose a private, quiet setting — never in an open office or over email.",
      "Sample opening: 'I've noticed you haven't seemed like yourself lately. I just wanted to check in and see how you're doing.'",
      "Do NOT say: 'You seem depressed,' 'Is this a mental health thing?' or 'Your performance has been impacted — are you okay?'",
      "Lead with care, not performance concerns. The first conversation should be about the person, not the job.",
      "If the employee discloses a mental health condition: thank them for sharing, confirm you take it seriously, and reassure them of confidentiality.",
    ],
  },
  {
    id: "listen",
    title: "Active listening techniques",
    content: [
      "Use open-ended questions: 'How are you feeling about work lately?' not 'Are you okay?'",
      "Reflect back what you heard: 'It sounds like you've been under a lot of pressure — is that right?'",
      "Do not rush to solutions. Silence is okay. Let the employee lead.",
      "Avoid minimizing: 'Everyone feels that way sometimes' or 'Just try to push through it' can increase distress.",
      "Watch for language suggesting crisis (hopelessness, inability to cope). If you hear it, ask directly: 'Are you having thoughts of harming yourself?' and connect to crisis resources immediately.",
      "Federal note: CLC Part II requires managers at federally regulated employers to complete psychological health and safety training.",
    ],
  },
  {
    id: "resources",
    title: "Connecting to EAP / resources",
    content: [
      "Always offer EAP: 'We have an Employee Assistance Program — it's completely confidential and at no cost to you or your family.'",
      "Provide the access number and/or link directly. Don't just say 'there's an EAP' — give them the information in the moment.",
      "If the employee appears in crisis: call 988 (Canada Suicide Crisis Helpline) together, or 911 if there is immediate risk of harm.",
      "Quebec: Inform the employee of their right to take leave under the ARLS for psychological harassment or mental health grounds.",
      "Refer to HR or occupational health for formal support and accommodation assessment when appropriate.",
    ],
  },
  {
    id: "documentation",
    title: "Documentation best practices",
    content: [
      "Record: date of conversation and that you offered EAP resources. Do NOT record the employee's disclosures or any suspected diagnosis.",
      "Keep mental health disclosures in a separate confidential HR accommodation file — not the general personnel file.",
      "Ontario WSIB: If the employee later files a WSIB mental stress claim, documented proactive support may be relevant. Keep records factual and objective.",
      "Do NOT discuss the conversation with team members, clients, or other managers without a legitimate need to know.",
      "If formal accommodation is being considered, initiate the Accommodation Request process and consult HR.",
    ],
  },
  {
    id: "followup",
    title: "Follow-up cadence",
    content: [
      "Follow up in 1–2 weeks with a brief informal check-in: 'Just wanted to see how you're doing.' Do not ask whether they used the EAP.",
      "If the employee is off work: maintain periodic contact with their consent (e.g., monthly) — silence can worsen isolation. Confirm frequency is acceptable.",
      "Ontario / Federal: Regular contact during medical leave, with consent, supports RTW planning and is considered best practice.",
      "Quebec: Under the ARLS, the employer must take reasonable steps to re-integrate the employee following harassment — documented check-ins help demonstrate this.",
      "At all follow-ups: focus on well-being and support, not performance. Performance discussions resume after stabilization.",
    ],
  },
];

function ManagerConversationGuide() {
  const [open, setOpen] = useState(null);

  return (
    <SectionCard title="Manager Conversation Guide">
      <p className="mb-4 text-sm text-zinc-400">
        Step-by-step guide for opening mental health conversations, active listening, connecting to
        resources, and follow-up. Jurisdiction notes included.
      </p>
      <div className="space-y-2">
        {MANAGER_CONVO_STEPS.map((step, idx) => (
          <div key={step.id} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === step.id ? null : step.id)}
              className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-400/20 bg-amber-400/10 text-xs font-semibold text-amber-300">
                {idx + 1}
              </div>
              <div className="flex-1 text-sm font-medium text-zinc-100">{step.title}</div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open === step.id ? "rotate-180" : ""}`}
              />
            </button>
            {open === step.id && (
              <div className="border-t border-white/6 px-4 pb-4 pt-3">
                <ul className="space-y-2">
                  {step.content.map((line, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLAR B — ACCOMMODATION FRAMEWORKS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Duty to Accommodate decision tree ────────────────────────────────────────

const DTA_STEPS = [
  {
    id: "disclosure",
    question:
      "Has the employee disclosed a need related to a protected ground under human rights legislation?",
    hint: "Protected grounds include: disability, family status, religion/creed, pregnancy, Indigenous identity, age, and others.",
    options: [
      { label: "Yes — employee has disclosed a need", value: "yes", next: "ground" },
      { label: "No disclosure has been made", value: "no", result: "no-trigger" },
    ],
  },
  {
    id: "ground",
    question: "Which protected ground applies?",
    options: [
      { label: "Disability (physical or mental)", value: "disability", next: "documentation" },
      { label: "Family status", value: "family-status", next: "documentation" },
      { label: "Religion or creed", value: "religion", next: "documentation" },
      { label: "Pregnancy or parental status", value: "pregnancy", next: "documentation" },
      { label: "Other protected ground", value: "other", next: "documentation" },
    ],
  },
  {
    id: "documentation",
    question: "Has supporting documentation been requested and received?",
    hint:
      "For disability: request a functional limitations report from the treating healthcare provider — not a diagnosis. For religion: a written statement may suffice. Do not request excessive personal detail.",
    options: [
      { label: "Yes — adequate documentation received", value: "yes", next: "type" },
      { label: "Requested but not yet received", value: "pending", result: "request-docs" },
      { label: "Employee refuses to cooperate", value: "refused", result: "refused-docs" },
    ],
  },
  {
    id: "type",
    question: "What type of accommodation is required?",
    options: [
      { label: "Modified duties or role adjustment", value: "duties", next: "feasibility" },
      { label: "Schedule or hours modification", value: "schedule", next: "feasibility" },
      { label: "Remote or hybrid work", value: "remote", next: "feasibility" },
      { label: "Physical workspace modification", value: "workspace", next: "feasibility" },
      { label: "Leave of absence", value: "leave", next: "feasibility" },
      { label: "Other accommodation", value: "other", next: "feasibility" },
    ],
  },
  {
    id: "feasibility",
    question: "Is the requested accommodation technically feasible for this role and workplace?",
    options: [
      { label: "Yes — can be implemented", value: "yes", next: "hardship" },
      { label: "No — specific request is not technically feasible", value: "no", result: "not-feasible" },
    ],
  },
  {
    id: "hardship",
    question: "Would granting this accommodation cause undue hardship?",
    hint:
      "Undue hardship considers: health and safety risk, cost relative to employer size, and operational impact. The bar is high — mere inconvenience or preference does not qualify.",
    options: [
      { label: "No — hardship threshold not met", value: "no", result: "proceed" },
      { label: "Yes — significant hardship would result", value: "yes", result: "hardship" },
    ],
  },
];

const DTA_RESULTS = {
  "no-trigger": {
    tone: "neutral",
    title: "No accommodation obligation triggered at this time",
    body: "No accommodation obligation is triggered. Document that no disclosure was made. If circumstances change or the employee later discloses a need, revisit this workflow.",
    action: null,
  },
  "request-docs": {
    tone: "warning",
    title: "Request supporting documentation",
    body: "Provide a written request specifying what documentation is needed. For disability, request a functional limitations report (not a diagnosis). Do not request excessive personal or medical detail. Set a reasonable deadline and follow up in writing.",
    action: "Use the Accommodation Request Form template to formally document the request.",
  },
  "refused-docs": {
    tone: "warning",
    title: "Employee refusing to cooperate — document carefully",
    body: "If an employee refuses to participate in the accommodation process, the employer's duty to accommodate may be reduced. Document every request and refusal in writing. Do not impose adverse employment action without first consulting legal counsel.",
    action: null,
  },
  "not-feasible": {
    tone: "warning",
    title: "Requested accommodation not feasible — explore all alternatives",
    body: "Document specifically why the requested accommodation is not technically feasible. The duty to accommodate requires exploring all reasonable alternatives before concluding accommodation is impossible. Invite the employee to propose alternatives. Consult legal counsel if no alternative can be found.",
    action: null,
  },
  proceed: {
    tone: "success",
    title: "Proceed with accommodation",
    body: "The accommodation obligation is triggered and no undue hardship exists. Complete an Accommodation Plan with the employee, obtain signatures from both parties, include a review date, and file a copy in the employee's accommodation record.",
    action: "Generate an Accommodation Plan to document the agreed arrangement.",
  },
  hardship: {
    tone: "error",
    title: "Potential undue hardship — consult legal counsel before proceeding",
    body: "Document specific, objective evidence of hardship (cost analysis, safety assessment, operational impact). You must still accommodate to the point of undue hardship — explore all alternatives first. Do not impose adverse employment action without legal consultation. Tribunals apply a very high threshold.",
    action: "Complete the Undue Hardship Assessment worksheet below before taking any further steps.",
  },
};

const DTA_TONE = {
  neutral:  { border: "border-white/10",         bg: "bg-white/[0.03]",       title: "text-zinc-100"   },
  warning:  { border: "border-amber-400/25",      bg: "bg-amber-400/[0.06]",   title: "text-amber-200"  },
  success:  { border: "border-emerald-400/25",    bg: "bg-emerald-400/[0.06]", title: "text-emerald-200"},
  error:    { border: "border-red-400/25",        bg: "bg-red-400/[0.06]",     title: "text-red-200"    },
};

function DutyToAccommodateWorkflow() {
  const [history, setHistory] = useState([]);
  const [currentStepId, setCurrentStepId] = useState("disclosure");
  const [result, setResult] = useState(null);

  const currentStep = DTA_STEPS.find((s) => s.id === currentStepId);

  function handleOption(option) {
    const newHistory = [
      ...history,
      { stepId: currentStepId, value: option.value, label: option.label },
    ];
    setHistory(newHistory);
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setCurrentStepId(option.next);
    }
  }

  function reset() {
    setHistory([]);
    setCurrentStepId("disclosure");
    setResult(null);
  }

  function handlePrint() {
    const resultData = result ? DTA_RESULTS[result] : null;
    const lines = [
      "DUTY TO ACCOMMODATE WORKFLOW — DECISION LOG",
      `Date: ${new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      "STEPS COMPLETED:",
      ...history.map((h, i) => {
        const step = DTA_STEPS.find((s) => s.id === h.stepId);
        return `  ${i + 1}. ${step?.question}\n     Answer: ${h.label}`;
      }),
      "",
      resultData ? `OUTCOME: ${resultData.title}` : "",
      resultData ? `\n${resultData.body}` : "",
      resultData?.action ? `\nNext step: ${resultData.action}` : "",
    ].join("\n");
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(
        `<pre style="font-family:monospace;white-space:pre-wrap;max-width:800px;margin:2rem auto;font-size:14px;">${lines}</pre>`
      );
      w.print();
    }
  }

  const resultData = result ? DTA_RESULTS[result] : null;

  return (
    <SectionCard
      title="Duty to Accommodate Workflow"
      action={
        (result !== null || history.length > 0) && (
          <button
            onClick={reset}
            className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Restart
          </button>
        )
      }
    >
      <p className="mb-5 text-sm text-zinc-400">
        Step-by-step decision tree for Ontario, Quebec, Federal, and Remote (Federal) employees.
        Follow each step to determine your obligations under applicable human rights legislation.
        Produces a printable decision log.
      </p>

      {/* Completed steps breadcrumb */}
      {history.length > 0 && (
        <div className="mb-5 space-y-2">
          {history.map((h, i) => {
            const step = DTA_STEPS.find((s) => s.id === h.stepId);
            return (
              <div
                key={i}
                className="flex flex-wrap items-start gap-2 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-xs text-zinc-400"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
                <span className="font-medium text-zinc-300">{step?.question}</span>
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-zinc-600" />
                <span>{h.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Current step */}
      {!result && currentStep && (
        <div className="rounded-[24px] border border-white/8 bg-white/[0.02] p-5">
          <div className="mb-1 text-xs font-medium text-amber-300">
            Step {history.length + 1} of {DTA_STEPS.length}
          </div>
          <h3 className="mb-2 text-sm font-semibold text-zinc-100">{currentStep.question}</h3>
          {currentStep.hint && (
            <div className="mb-4 flex items-start gap-2 rounded-xl border border-white/6 bg-white/[0.02] p-3 text-xs text-zinc-400">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/70" />
              {currentStep.hint}
            </div>
          )}
          <div className="space-y-2">
            {currentStep.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleOption(opt)}
                className="w-full rounded-2xl border border-white/8 bg-white/[0.02] p-4 text-left text-sm text-zinc-300 transition hover:border-amber-400/20 hover:bg-amber-400/[0.04] hover:text-zinc-100"
              >
                <div className="flex items-center justify-between gap-3">
                  <span>{opt.label}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-zinc-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result */}
      {resultData && (
        <div
          className={`rounded-[24px] border p-5 ${DTA_TONE[resultData.tone].border} ${DTA_TONE[resultData.tone].bg}`}
        >
          <h3 className={`mb-2 text-sm font-semibold ${DTA_TONE[resultData.tone].title}`}>
            {resultData.title}
          </h3>
          <p className="mb-4 text-sm text-zinc-400">{resultData.body}</p>
          {resultData.action && (
            <div className="mb-4 flex items-start gap-2 text-xs text-zinc-400">
              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
              <span>{resultData.action}</span>
            </div>
          )}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handlePrint}
              className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
            >
              <Printer className="h-3.5 w-3.5" />
              Print decision log
            </button>
            <button
              onClick={reset}
              className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Start over
            </button>
          </div>
        </div>
      )}

      {/* Legislation reference */}
      <div className="mt-5 rounded-2xl border border-white/6 bg-white/[0.02] p-4">
        <div className="mb-2 text-xs font-medium text-zinc-300">Legislation reference</div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {[
            { j: "Ontario", act: "Human Rights Code, RSO 1990, c H.19" },
            { j: "Quebec", act: "Charter of Human Rights and Freedoms, CQLR c C-12" },
            { j: "Federal / Remote", act: "Canadian Human Rights Act, RSC 1985, c H-6" },
          ].map(({ j, act }) => (
            <div key={j} className="text-xs">
              <span className="font-medium text-zinc-300">{j}:</span>{" "}
              <span className="text-zinc-400">{act}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Accommodation Request Form card ──────────────────────────────────────────
function AccommodationRequestFormCard() {
  return (
    <SectionCard
      title="Accommodation Request Form"
      action={
        <Link
          to="/app/generator?template=Accommodation%20Request%20Form"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Employer-fillable form for initiating and documenting an accommodation request. Captures
        the employee's disclosed need, requested accommodation, documentation received, interim
        measures, and employer response.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Employee information and role",
          "Protected ground disclosed",
          "Accommodation requested",
          "Documentation received",
          "Interim measures",
          "Dual sign-off fields",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Accommodation Plan Template card ─────────────────────────────────────────
function AccommodationPlanCard() {
  return (
    <SectionCard
      title="Accommodation Plan Template"
      action={
        <Link
          to="/app/generator?template=Accommodation%20Plan%20Template"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Formal plan documenting the agreed accommodation measures between employer and employee.
        Includes responsibilities, review dates, escalation provisions, and dual sign-off.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Accommodation measures agreed",
          "Start date and review date",
          "Employer responsibilities",
          "Employee responsibilities",
          "Escalation provisions",
          "Dual sign-off fields",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Functional Limitations Guide ─────────────────────────────────────────────
const FUNCTIONAL_LIMITATIONS_DATA = [
  {
    name: "Ontario",
    act: "Human Rights Code, RSO 1990, c H.19",
    notes: [
      "Request only the employee's functional limitations and restrictions — never the diagnosis.",
      "Documentation should identify: what the employee cannot do, what they can do with modifications, and expected duration.",
      "Ontario Human Rights Commission Policy: 'The employee's functional abilities are relevant, not their diagnosis.'",
      "Employer may request periodic updates for indefinite or recurring conditions.",
      "Independent Medical Examinations (IMEs) are permitted in limited circumstances and must be justified.",
    ],
  },
  {
    name: "Quebec",
    act: "Charter of Human Rights and Freedoms, CQLR c C-12",
    notes: [
      "Employer may require medical evidence of functional limitations but cannot compel disclosure of diagnosis.",
      "Commission des droits de la personne guidelines require assessment of what tasks the employee can and cannot perform.",
      "The ARLS (Act Respecting Labour Standards) does not address accommodation directly — obligations flow from the Charter.",
      "Independent Medical Examinations may be requested in long-term disability contexts with justification.",
      "Note: Quebec's Charter protects a broader range of social conditions than other jurisdictions.",
    ],
  },
  {
    name: "Federal",
    act: "Canadian Human Rights Act, RSC 1985, c H-6",
    notes: [
      "Federally regulated employers must accommodate to the point of undue hardship under the CHRA.",
      "Functional limitations assessment must focus on the ability to perform essential job functions.",
      "The Canadian Human Rights Commission's Duty to Accommodate Guide is the primary policy reference.",
      "For remote employees: the employer's principal place of business jurisdiction typically applies for federal purposes.",
      "Employer cannot require disclosure of diagnosis; medical information must be kept strictly confidential.",
    ],
  },
];

function FunctionalLimitationsGuide() {
  const [open, setOpen] = useState(null);

  return (
    <SectionCard title="Functional Limitations Guide">
      <p className="mb-4 text-sm text-zinc-400">
        Jurisdiction-by-jurisdiction reference on what documentation employers may lawfully request
        when assessing functional limitations. Expand each jurisdiction for details.
      </p>
      <div className="space-y-2">
        {FUNCTIONAL_LIMITATIONS_DATA.map((j) => (
          <div key={j.name} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === j.name ? null : j.name)}
              className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div>
                <div className="text-sm font-medium text-zinc-100">{j.name}</div>
                <div className="mt-0.5 text-xs text-zinc-500">{j.act}</div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${open === j.name ? "rotate-180" : ""}`}
              />
            </button>
            {open === j.name && (
              <div className="border-t border-white/6 px-4 pb-4 pt-3">
                <ul className="space-y-2">
                  {j.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Undue Hardship Assessment ─────────────────────────────────────────────────
const HARDSHIP_FIELDS = [
  {
    id: "financialCost",
    label: "1. Financial cost of accommodation",
    hint: "Estimate the direct cost (equipment, modifications, replacement staff, lost productivity) relative to organizational size and resources.",
  },
  {
    id: "externalFunding",
    label: "2. Availability of external funding or subsidies",
    hint: "Identify any government grants, workplace accessibility funds, insurance coverage, or disability programs that could offset the cost.",
  },
  {
    id: "healthSafetyEmployee",
    label: "3. Health and safety risk to the employee",
    hint: "Document any genuine, identifiable, and quantifiable risk the accommodation would create for the employee performing modified duties.",
  },
  {
    id: "healthSafetyOthers",
    label: "4. Health and safety risk to coworkers or the public",
    hint: "Identify specific risks to third parties. General discomfort, inconvenience, or preference does not qualify as a health and safety risk.",
  },
  {
    id: "operationalImpact",
    label: "5. Operational impact and business disruption",
    hint: "Describe the specific effect on service delivery, team workflow, and legal or contractual obligations to customers.",
  },
  {
    id: "alternatives",
    label: "6. Alternatives considered and rejected",
    hint: "List all alternative accommodations considered. For each one rejected, explain specifically why it was not workable.",
  },
  {
    id: "conclusion",
    label: "7. Conclusion",
    hint: "Based on the above, state whether undue hardship exists and cite the specific, objective evidence supporting that conclusion. Consult legal counsel before finalizing.",
  },
];

function UndueHardshipAssessment() {
  const [fields, setFields] = useState(
    Object.fromEntries(HARDSHIP_FIELDS.map((f) => [f.id, ""]))
  );
  const [employer, setEmployer] = useState("");
  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");

  function handlePrint() {
    const lines = [
      "UNDUE HARDSHIP ASSESSMENT WORKSHEET",
      `Employer:  ${employer || "[Employer name]"}`,
      `Employee:  ${employee || "[Employee name]"}`,
      `Date:      ${date || "[Date]"}`,
      "",
      ...HARDSHIP_FIELDS.map(
        (f) => `${f.label}\n${fields[f.id] || "[Not completed]"}\n`
      ),
      "─────────────────────────────────────────────────────────────",
      "PREPARED BY: ________________________  Date: __________________",
      "REVIEWED BY: ________________________  Date: __________________",
      "",
      "NOTE: This worksheet should be reviewed by legal counsel before",
      "being used to decline or limit an accommodation.",
    ].join("\n");
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(
        `<pre style="font-family:monospace;white-space:pre-wrap;max-width:800px;margin:2rem auto;font-size:14px;">${lines}</pre>`
      );
      w.print();
    }
  }

  return (
    <SectionCard
      title="Undue Hardship Assessment"
      action={
        <button
          onClick={handlePrint}
          className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
        >
          <Printer className="h-3.5 w-3.5" />
          Print worksheet
        </button>
      }
    >
      <p className="mb-5 text-sm text-zinc-400">
        Structured worksheet for documenting undue hardship analysis. Complete each section and
        retain in the employee's accommodation file. Consult legal counsel before relying on
        undue hardship to decline or limit accommodation.
      </p>

      {/* Header fields */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300">Employer</label>
          <input
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
            placeholder="Company name"
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] py-3 pl-4 pr-4 text-[16px] text-zinc-100 placeholder:text-zinc-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300">Employee</label>
          <input
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
            placeholder="Employee name"
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] py-3 pl-4 pr-4 text-[16px] text-zinc-100 placeholder:text-zinc-600"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-medium text-zinc-300">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] py-3 pl-4 pr-4 text-[16px] text-zinc-100"
          />
        </div>
      </div>

      {/* Assessment fields */}
      <div className="space-y-5">
        {HARDSHIP_FIELDS.map((f) => (
          <div key={f.id}>
            <label className="mb-1.5 block text-sm font-medium text-zinc-200">{f.label}</label>
            <div className="mb-2 flex items-start gap-1.5 text-xs text-zinc-500">
              <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/50" />
              {f.hint}
            </div>
            <textarea
              value={fields[f.id]}
              onChange={(e) => setFields({ ...fields, [f.id]: e.target.value })}
              rows={3}
              placeholder="Document your analysis here..."
              className="w-full resize-y rounded-2xl border border-white/8 bg-white/[0.03] py-3 pl-4 pr-4 text-[16px] text-zinc-100 placeholder:text-zinc-600"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2 rounded-2xl border border-amber-400/12 bg-amber-400/[0.04] p-4 text-xs text-zinc-400">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300" />
        This worksheet is not legal advice. Have legal counsel review the completed assessment
        before relying on undue hardship to limit or decline accommodation.
      </div>
    </SectionCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLAR C — PSYCHOLOGICAL SAFETY & PREVENTION
// ═══════════════════════════════════════════════════════════════════════════════

// ─── CSA Z1003-13 Psychological Safety Self-Assessment ────────────────────────
const PSA_QUESTIONS = [
  { id: "q1",  domain: "Leadership commitment",                    text: "Senior leadership visibly supports psychological health and safety initiatives." },
  { id: "q2",  domain: "Civility & respect",                       text: "Employees treat each other with respect and civility at all levels of the organization." },
  { id: "q3",  domain: "Psychological protection",                  text: "Employees feel safe expressing concerns or disagreements without fear of reprisal." },
  { id: "q4",  domain: "Growth & development",                     text: "Employees have access to learning and development opportunities that support their career growth." },
  { id: "q5",  domain: "Recognition & reward",                     text: "Employees' contributions are acknowledged and recognized in meaningful ways." },
  { id: "q6",  domain: "Involvement & influence",                  text: "Employees have meaningful input into decisions that affect their work." },
  { id: "q7",  domain: "Workload management",                      text: "Workloads are reasonable and employees have the resources to meet their job demands." },
  { id: "q8",  domain: "Engagement",                               text: "Employees feel connected to and engaged with the organization's purpose and goals." },
  { id: "q9",  domain: "Balance",                                   text: "Employees are supported in maintaining a healthy balance between work and personal life." },
  { id: "q10", domain: "Protection from violence",                  text: "The organization proactively prevents workplace bullying, harassment, and violence." },
  { id: "q11", domain: "Clear leadership & expectations",          text: "Employees have clear information about their roles, responsibilities, and performance expectations." },
  { id: "q12", domain: "Psychological competencies of managers",   text: "Managers demonstrate empathy, active listening, and psychological safety in their teams." },
  { id: "q13", domain: "Organizational culture",                   text: "The workplace culture values mental health and discourages stigma around seeking help." },
  { id: "q14", domain: "Protection from chronic stress",           text: "The organization monitors and addresses sources of chronic workplace stress." },
  { id: "q15", domain: "Conflict resolution",                      text: "There are fair and accessible processes for resolving interpersonal conflicts and grievances." },
];

const PSA_LABELS = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const PSA_BANDS = [
  {
    min: 15, max: 25,
    label: "Critical risk",
    color: "text-red-300",
    bg: "bg-red-400/[0.06]",
    border: "border-red-400/25",
    bar: "bg-red-400",
    recs: [
      "Conduct an immediate workplace psychological health and safety risk assessment.",
      "Engage a qualified occupational mental health consultant or EAP provider.",
      "Senior leadership must make a visible, documented commitment to change — starting now.",
      "Review and update your workplace harassment policy and reporting procedures immediately.",
      "Establish a psychological health and safety committee with employee representation.",
    ],
  },
  {
    min: 26, max: 45,
    label: "Needs attention",
    color: "text-amber-300",
    bg: "bg-amber-400/[0.06]",
    border: "border-amber-400/25",
    bar: "bg-amber-400",
    recs: [
      "Identify the two lowest-scoring domains and build a 90-day action plan for each.",
      "Implement regular manager training on psychological health and safety topics.",
      "Establish or review your EAP referral process and ensure all staff know how to access it.",
      "Conduct a pulse survey to identify specific stressors and gather employee input.",
      "Review workloads and resourcing against actual operational demands.",
    ],
  },
  {
    min: 46, max: 60,
    label: "Moderate — developing",
    color: "text-blue-300",
    bg: "bg-blue-400/[0.06]",
    border: "border-blue-400/25",
    bar: "bg-blue-400",
    recs: [
      "Develop a formal Psychological Health and Safety policy aligned with CSA Z1003-13.",
      "Recognize and reinforce practices that are working — share wins with the team.",
      "Focus on domains scoring below 3 (Sometimes) to bring them to at least Often.",
      "Consider voluntary third-party assessment against the National Standard of Canada.",
      "Engage employees in co-designing improvements — involvement increases buy-in.",
    ],
  },
  {
    min: 61, max: 75,
    label: "Strong",
    color: "text-emerald-300",
    bg: "bg-emerald-400/[0.06]",
    border: "border-emerald-400/25",
    bar: "bg-emerald-400",
    recs: [
      "Formalize your practices by documenting them in a Psychological Health and Safety policy.",
      "Consider pursuing third-party certification against the National Standard (CSA Z1003-13).",
      "Share your practices across the organization and mentor peer teams or organizations.",
      "Continue annual assessments to monitor for regression and identify new risk areas.",
      "Celebrate your workplace's commitment to psychological health — it is a differentiator.",
    ],
  },
];

function PsychSafetyAssessment() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const allAnswered = PSA_QUESTIONS.every((q) => answers[q.id] !== undefined);
  const score = Object.values(answers).reduce((sum, v) => sum + v, 0);
  const band = PSA_BANDS.find((b) => score >= b.min && score <= b.max);
  const maxScore = PSA_QUESTIONS.length * 5;
  const pct = (score / maxScore) * 100;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  function handlePrint() {
    if (!band) return;
    const lines = [
      "CSA Z1003-13 PSYCHOLOGICAL SAFETY SELF-ASSESSMENT",
      `Date: ${new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })}`,
      "",
      "RESPONSES:",
      ...PSA_QUESTIONS.map((q) => {
        const val = answers[q.id];
        return `  [${q.domain}]\n  ${q.text}\n  Answer: ${val !== undefined ? PSA_LABELS[val - 1] : "Not answered"} (${val}/5)`;
      }),
      "",
      `TOTAL SCORE: ${score} / ${maxScore}`,
      `RESULT: ${band.label}`,
      "",
      "RECOMMENDATIONS:",
      ...band.recs.map((r, i) => `  ${i + 1}. ${r}`),
    ].join("\n");
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(
        `<pre style="font-family:monospace;white-space:pre-wrap;max-width:800px;margin:2rem auto;font-size:14px;">${lines}</pre>`
      );
      w.print();
    }
  }

  return (
    <SectionCard
      title="CSA Z1003-13 Psychological Safety Assessment"
      action={
        submitted ? (
          <button
            onClick={reset}
            className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Retake
          </button>
        ) : null
      }
    >
      <p className="mb-5 text-sm text-zinc-400">
        15-question self-assessment based on the National Standard of Canada for Psychological
        Health and Safety (CSA Z1003-13 / BNQ 9700-803). Rate each statement 1–5. Score out of 75.
      </p>

      {!submitted ? (
        <>
          <div className="space-y-4">
            {PSA_QUESTIONS.map((q) => (
              <div key={q.id} className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
                <div className="mb-1 text-xs font-medium text-amber-300/70">{q.domain}</div>
                <div className="mb-3 text-sm text-zinc-200">{q.text}</div>
                <div className="flex flex-wrap gap-2">
                  {PSA_LABELS.map((label, i) => (
                    <button
                      key={i}
                      onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i + 1 }))}
                      className={[
                        "rounded-xl border px-3 py-1.5 text-xs font-medium transition",
                        answers[q.id] === i + 1
                          ? "border-amber-400/30 bg-amber-400/15 text-amber-200"
                          : "border-white/8 bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:text-zinc-300",
                      ].join(" ")}
                    >
                      {i + 1} — {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between">
            <div className="text-xs text-zinc-500">
              {Object.keys(answers).length} of {PSA_QUESTIONS.length} answered
            </div>
            <button
              onClick={() => setSubmitted(true)}
              disabled={!allAnswered}
              className={[
                "gold-button px-5 py-2.5 text-sm font-medium transition",
                !allAnswered ? "cursor-not-allowed opacity-40" : "",
              ].join(" ")}
            >
              View results
            </button>
          </div>
        </>
      ) : (
        band && (
          <div className="space-y-5">
            {/* Score summary */}
            <div className={`rounded-[24px] border p-5 ${band.border} ${band.bg}`}>
              <div className="mb-1 flex items-center justify-between">
                <div className={`text-sm font-semibold ${band.color}`}>{band.label}</div>
                <div className={`text-lg font-bold ${band.color}`}>
                  {score} / {maxScore}
                </div>
              </div>
              <div className="my-3 h-2 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className={`h-2 rounded-full transition-all ${band.bar}`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mb-1 mt-3 text-xs font-medium text-zinc-300">Recommendations</div>
              <ul className="space-y-1.5">
                {band.recs.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                    <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={handlePrint}
                  className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  Print results
                </button>
                <button
                  onClick={reset}
                  className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Retake
                </button>
              </div>
            </div>

            {/* Question breakdown */}
            <div>
              <div className="mb-2 text-xs font-medium text-zinc-300">Question breakdown</div>
              <div className="space-y-2">
                {PSA_QUESTIONS.map((q) => {
                  const val = answers[q.id] || 0;
                  return (
                    <div
                      key={q.id}
                      className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-2.5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-xs text-zinc-400">{q.text}</div>
                        <div className="text-xs text-zinc-600">{q.domain}</div>
                      </div>
                      <div
                        className={`shrink-0 text-xs font-semibold ${val >= 4 ? "text-emerald-400" : val >= 3 ? "text-amber-300" : "text-red-400"}`}
                      >
                        {val}/5 — {PSA_LABELS[val - 1]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )
      )}
    </SectionCard>
  );
}

// ─── Respectful Workplace Policy card ─────────────────────────────────────────
function RespectfulWorkplacePolicyCard() {
  return (
    <SectionCard
      title="Respectful Workplace Policy"
      action={
        <Link
          to="/app/generator?template=Respectful%20Workplace%20Policy"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Comprehensive respectful workplace policy aligned with provincial human rights and
        occupational health legislation. Covers prohibited conduct, reporting procedures,
        investigation process, and non-retaliation obligations.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Purpose and scope",
          "Prohibited conduct definitions",
          "Reporting procedures",
          "Investigation process",
          "Confidentiality provisions",
          "Consequences and non-retaliation",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Bystander Intervention Guide ─────────────────────────────────────────────
const FIVE_DS = [
  {
    name: "Direct",
    desc: "Address the behaviour in the moment.",
    examples: [
      "Calmly interrupt: 'That comment isn't okay here — let's keep it respectful.'",
      "Name what you saw: 'That sounded like a personal attack. I think we should move forward differently.'",
      "Only use Direct if it is safe to do so and the situation is not escalating.",
    ],
  },
  {
    name: "Distract",
    desc: "Disrupt the situation without direct confrontation.",
    examples: [
      "Change the subject: 'Hey, can I grab you for a second? I need your input on something.'",
      "Create a natural interruption: ask an unrelated question, invite the target to step away.",
      "Useful when direct intervention may escalate the situation or put the target at further risk.",
    ],
  },
  {
    name: "Delegate",
    desc: "Involve someone with more authority or a better position to intervene.",
    examples: [
      "Report to a manager, HR, or union representative who can act on the situation.",
      "Ask a colleague to intervene if they are better placed to do so.",
      "Appropriate when the behaviour is serious, ongoing, or involves a significant power imbalance.",
    ],
  },
  {
    name: "Delay",
    desc: "Check in with the target after the moment has passed.",
    examples: [
      "'I saw what happened earlier — are you okay? I want you to know that wasn't acceptable and I'm here to help.'",
      "Offer to accompany them to HR or a manager to report the incident.",
      "Delay is always appropriate, even if you couldn't act in the moment — it shows solidarity.",
    ],
  },
  {
    name: "Document",
    desc: "Record what happened to support a future report or investigation.",
    examples: [
      "Write down: date, time, location, what was said/done, who was present, and any witnesses.",
      "Do not share your notes publicly — provide them only to HR or the person filing a complaint.",
      "If you are the target: preserve all written communications (emails, messages) in a secure personal location.",
    ],
  },
];

const BYSTANDER_REPORTING = [
  {
    id: "br-ontario",
    label: "Ontario",
    notes: [
      "Under OHSA ss. 32.0.1–32.0.8, employers must have a written workplace harassment policy and program.",
      "An employer who becomes aware of workplace harassment must conduct a workplace harassment investigation.",
      "Employees have the right to report harassment and are protected from retaliation under the OHSA.",
      "Filing a complaint in good faith is protected — retaliation constitutes a separate violation.",
    ],
  },
  {
    id: "br-quebec",
    label: "Quebec",
    notes: [
      "Under ARLS ss. 81.18–81.20, psychological harassment is prohibited in Quebec workplaces.",
      "Employees may file a complaint with the CNESST within 2 years of the last incident.",
      "The employer has an obligation to take reasonable means to end harassment and prevent recurrence.",
      "The employer must investigate within 90 days of receiving a complaint.",
    ],
  },
  {
    id: "br-federal",
    label: "Federal",
    notes: [
      "Under CLC Part II and the Work Place Harassment and Violence Prevention Regulations (SOR/2020-130), a Notice of Occurrence process is required.",
      "Federally regulated employers must have a workplace harassment and violence prevention policy.",
      "Employees may file a complaint with the Canadian Human Rights Commission or the Labour Program.",
      "Resolution options include: negotiated resolution, conciliation, or investigation.",
    ],
  },
];

function BystanderInterventionGuide() {
  const [open, setOpen] = useState(null);

  return (
    <SectionCard title="Bystander Intervention Guide">
      <p className="mb-4 text-sm text-zinc-400">
        The 5 D's bystander framework adapted for workplace settings. Includes scenario examples,
        documentation guidance, and jurisdiction-specific reporting obligations.
      </p>

      {/* 5 D's */}
      <div className="mb-5 space-y-2">
        {FIVE_DS.map((d, idx) => (
          <div key={idx} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === `d${idx}` ? null : `d${idx}`)}
              className="flex w-full items-center gap-3 p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-amber-400/20 bg-amber-400/10 text-sm font-bold text-amber-300">
                D
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-zinc-100">{d.name}</div>
                <div className="text-xs text-zinc-500">{d.desc}</div>
              </div>
              <ChevronDown
                className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform ${open === `d${idx}` ? "rotate-180" : ""}`}
              />
            </button>
            {open === `d${idx}` && (
              <div className="border-t border-white/6 px-4 pb-4 pt-3">
                <ul className="space-y-2">
                  {d.examples.map((ex, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reporting obligations */}
      <div className="mb-2 text-xs font-medium text-zinc-300">Reporting obligations by jurisdiction</div>
      <div className="space-y-2">
        {BYSTANDER_REPORTING.map((j) => (
          <div key={j.id} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === j.id ? null : j.id)}
              className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div className="text-sm font-medium text-zinc-100">{j.label}</div>
              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${open === j.id ? "rotate-180" : ""}`}
              />
            </button>
            {open === j.id && (
              <div className="border-t border-white/6 px-4 pb-4 pt-3">
                <ul className="space-y-2">
                  {j.notes.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-zinc-400">
                      <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/60" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Wellness Action Plan card ──────────────────────────────────────────────────
function WellnessActionPlanCard() {
  return (
    <SectionCard
      title="Wellness Action Plan"
      action={
        <Link
          to="/app/generator?template=Wellness%20Action%20Plan"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Individual employee wellness action plan co-developed with the manager. Documents current
        state, goals, action steps, support resources, and review schedule — voluntary and
        confidential.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Current state assessment",
          "Physical wellness goals",
          "Mental wellness goals",
          "Work-life balance goals",
          "Action steps and resources",
          "Review schedule and sign-off",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLAR D — LEAVE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Leave of Absence Checklist ────────────────────────────────────────────────
const LEAVE_CHECKLISTS = {
  medical: {
    label: "Medical / Disability",
    items: [
      { id: "med1",  text: "Confirm employee's disclosure and understand nature of leave (do not request diagnosis)" },
      { id: "med2",  text: "Request functional limitations documentation from treating healthcare provider" },
      { id: "med3",  text: "Notify payroll of leave start date and expected duration" },
      { id: "med4",  text: "Determine minimum leave entitlement under applicable provincial ESA" },
      { id: "med5",  text: "Review employment agreement for top-up, STD/LTD, or salary continuance provisions" },
      { id: "med6",  text: "Advise employee on EI sickness benefit eligibility (up to 15 weeks, federal)" },
      { id: "med7",  text: "Issue Record of Employment (ROE) promptly if employee will apply for EI" },
      { id: "med8",  text: "Confirm benefit continuation obligations during leave (varies by province)" },
      { id: "med9",  text: "Schedule periodic check-ins (with employee consent, for extended leave)" },
      { id: "med10", text: "Plan return-to-work process including potential accommodation assessment" },
      { id: "med11", text: "Document all leave correspondence and decisions in writing" },
    ],
  },
  parental: {
    label: "Parental / Maternity",
    items: [
      { id: "par1",  text: "Confirm qualifying event (birth, adoption, or foster placement) and expected leave start" },
      { id: "par2",  text: "Review applicable provincial leave entitlements (see Parental Leave Guide below)" },
      { id: "par3",  text: "Confirm employee's intended leave duration and return-to-work date" },
      { id: "par4",  text: "Issue Record of Employment within 5 calendar days of the last day worked" },
      { id: "par5",  text: "Advise on EI parental benefit options: standard (35 wks at 55%) or extended (61 wks at 33%)" },
      { id: "par6",  text: "Note: Quebec employees use QPIP, not federal EI — advise accordingly" },
      { id: "par7",  text: "Review employment agreement for top-up or enhanced parental leave provisions" },
      { id: "par8",  text: "Confirm benefit continuation obligations during leave" },
      { id: "par9",  text: "Notify payroll, benefits carrier, and HR systems of leave dates" },
      { id: "par10", text: "Advise employee of notice obligation for return to work (Ontario: 4 weeks)" },
      { id: "par11", text: "Plan role coverage and confirm job protection obligations with team" },
      { id: "par12", text: "Confirm return date and assess accommodation needs prior to return" },
    ],
  },
  bereavement: {
    label: "Bereavement",
    items: [
      { id: "ber1", text: "Confirm relationship to deceased to determine applicable leave entitlement" },
      { id: "ber2", text: "Apply minimum provincial bereavement entitlements (varies: 1–5 days by province)" },
      { id: "ber3", text: "Ontario: 2 days unpaid bereavement leave per ESA s. 49.1; review policy for enhancements" },
      { id: "ber4", text: "Federal: 5 days (3 paid after 3 months of service) under the Canada Labour Code" },
      { id: "ber5", text: "Review employment agreement or company policy for enhanced bereavement provisions" },
      { id: "ber6", text: "Notify payroll of leave dates and applicable pay treatment" },
      { id: "ber7", text: "Communicate absence to team and clients (with employee consent; protect privacy)" },
      { id: "ber8", text: "Consider Employee Assistance Program (EAP) referral if appropriate" },
      { id: "ber9", text: "Document the leave in writing and retain in employee file" },
    ],
  },
  personal: {
    label: "Personal / Family",
    items: [
      { id: "per1", text: "Identify nature of leave: personal illness, family illness, family emergency, or other" },
      { id: "per2", text: "Apply provincial family responsibility or personal leave entitlements" },
      { id: "per3", text: "Ontario: 3 days unpaid family responsibility leave per year (ESA)" },
      { id: "per4", text: "Federal: 10 days personal leave per year (3 paid after 3 months) under CLC" },
      { id: "per5", text: "Review employment agreement for enhanced personal or sick day provisions" },
      { id: "per6", text: "Determine if recurring absence may trigger family status accommodation obligations" },
      { id: "per7", text: "Notify payroll of absence and applicable pay treatment" },
      { id: "per8", text: "Document the leave and confirm it falls within statutory entitlements" },
      { id: "per9", text: "Ensure employee is not penalized for exercising statutory leave rights" },
    ],
  },
};

function LeaveOfAbsenceChecklist() {
  const [leaveType, setLeaveType] = useState("medical");
  const [checked, setChecked] = useState({});

  const list = LEAVE_CHECKLISTS[leaveType];
  const checkedCount = list.items.filter((i) => checked[i.id]).length;

  function toggleItem(id) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function handleTypeChange(key) {
    setLeaveType(key);
    setChecked({});
  }

  return (
    <SectionCard
      title="Leave of Absence Checklist"
      action={
        <button
          onClick={() => setChecked({})}
          className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </button>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Interactive checklist that branches by leave type. Select the type of leave to see the
        applicable steps for that leave category.
      </p>

      {/* Leave type pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        {Object.entries(LEAVE_CHECKLISTS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleTypeChange(key)}
            className={[
              "rounded-full px-4 py-2 text-sm font-medium transition",
              leaveType === key
                ? "border border-amber-400/25 bg-amber-400/10 text-amber-300"
                : "border border-white/8 bg-white/[0.02] text-zinc-300 hover:bg-white/[0.04]",
            ].join(" ")}
          >
            {val.label}
          </button>
        ))}
      </div>

      {/* Progress */}
      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
        <span>
          {checkedCount} of {list.items.length} steps completed
        </span>
        {checkedCount === list.items.length && (
          <span className="flex items-center gap-1 text-emerald-400">
            <Check className="h-3.5 w-3.5" />
            All steps complete
          </span>
        )}
      </div>
      <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-1.5 rounded-full bg-amber-400 transition-all duration-300"
          style={{ width: `${(checkedCount / list.items.length) * 100}%` }}
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-2">
        {list.items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(item.id)}
            className={[
              "flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition",
              checked[item.id]
                ? "border-emerald-400/20 bg-emerald-400/[0.04]"
                : "border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]",
            ].join(" ")}
          >
            <div
              className={[
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition",
                checked[item.id]
                  ? "border-emerald-400/40 bg-emerald-400/20 text-emerald-400"
                  : "border-white/20 bg-white/[0.03]",
              ].join(" ")}
            >
              {checked[item.id] && <Check className="h-3 w-3" />}
            </div>
            <span
              className={`text-sm ${checked[item.id] ? "text-zinc-500 line-through" : "text-zinc-300"}`}
            >
              {item.text}
            </span>
          </button>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Leave Request Form card ────────────────────────────────────────────────────
function LeaveRequestFormCard() {
  return (
    <SectionCard
      title="Leave Request Form"
      action={
        <Link
          to="/app/generator?template=Leave%20Request%20Form"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Employee leave of absence request form covering all leave types. Includes statutory
        entitlement references, documentation requirements, and pay / benefit acknowledgements.
      </p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Leave type and reason",
          "Requested start and end dates",
          "Documentation requirements",
          "Pay treatment during leave",
          "Benefit continuation note",
          "Manager and HR sign-off",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Parental Leave Guide by Province ─────────────────────────────────────────
const PARENTAL_LEAVE_DATA = [
  {
    name: "Ontario",
    act: "Employment Standards Act, 2000 (ESA), ss. 46–52",
    rows: [
      { label: "Pregnancy / Maternity leave", value: "17 weeks (eligible after 13 weeks of employment)" },
      { label: "Parental leave", value: "61 weeks (birth parent who took pregnancy leave) or 63 weeks (all others)" },
      { label: "Adoption leave", value: "63 weeks parental leave for adoptive parents" },
      { label: "EI / Income replacement", value: "Federal EI: standard (35 wks at 55%) or extended (61 wks at 33%). ROE required within 5 days." },
    ],
    notes:
      "Both parents may take parental leave concurrently. Job-protected. Employer cannot reduce benefits during leave. Employee must give 4 weeks notice of return-to-work date.",
  },
  {
    name: "Quebec",
    act: "Act Respecting Labour Standards (ARLS), ss. 81.1–81.17.1",
    rows: [
      { label: "Maternity leave", value: "18 weeks under QPIP (Régime québécois d'assurance parentale)" },
      { label: "Parental leave", value: "Up to 52 weeks under QPIP for shared parental leave (both parents)" },
      { label: "Adoption leave", value: "Up to 52 weeks QPIP leave for adoptive parents" },
      { label: "EI / Income replacement", value: "Quebec uses QPIP — NOT federal EI. Higher replacement (up to 75%). No 2-week waiting period." },
    ],
    notes:
      "QPIP covers self-employed workers. Paternity leave: 5 weeks exclusively for fathers/second parent. Both parents have access to shared parental leave weeks. Job protection under ARLS ss. 81.15.",
  },
  {
    name: "Federal",
    act: "Canada Labour Code (CLC), ss. 206.1–206.8",
    rows: [
      { label: "Maternity leave", value: "17 weeks (eligible after 6 months of continuous employment)" },
      { label: "Parental leave", value: "Standard: 35 weeks at 55% EI; Extended: 61 weeks at 33% EI. Combined max 63 weeks." },
      { label: "Adoption leave", value: "63 weeks parental leave for adoptive parents" },
      { label: "EI / Income replacement", value: "Federal EI applies. 2-week waiting period (waived for maternity/parental). ROE within 5 days." },
    ],
    notes:
      "Federal employees have the right to return to the same or a comparable position. Benefits must continue during leave. Employer may voluntarily top-up to 100% of pay if policy provides.",
  },
  {
    name: "Remote (Federal)",
    act: "Canada Labour Code (CLC) — same as Federal",
    rows: [
      { label: "Maternity leave", value: "17 weeks (same as Federal CLC)" },
      { label: "Parental leave", value: "Standard or extended options — same as Federal" },
      { label: "Adoption leave", value: "63 weeks parental leave" },
      { label: "EI / Income replacement", value: "Federal EI applies. Province of residence may differ — confirm tax residency." },
    ],
    notes:
      "Remote employees whose employer is federally regulated follow the CLC regardless of province of residence. Confirm whether the employer is a federally regulated employer (banks, telecoms, interprovincial transport, etc.) before applying CLC rules.",
  },
];

function ParentalLeaveGuide() {
  const [open, setOpen] = useState(null);

  return (
    <SectionCard title="Parental Leave Guide by Province">
      <p className="mb-4 text-sm text-zinc-400">
        Reference guide covering maternity, parental, and adoptive leave entitlements by
        jurisdiction. Expand each province for full details.
      </p>
      <div className="space-y-2">
        {PARENTAL_LEAVE_DATA.map((p) => (
          <div key={p.name} className="overflow-hidden rounded-2xl border border-white/8">
            <button
              onClick={() => setOpen(open === p.name ? null : p.name)}
              className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/[0.02]"
            >
              <div>
                <div className="text-sm font-medium text-zinc-100">{p.name}</div>
                <div className="mt-0.5 text-xs text-zinc-500">{p.act}</div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-zinc-500 transition-transform ${open === p.name ? "rotate-180" : ""}`}
              />
            </button>
            {open === p.name && (
              <div className="border-t border-white/6 p-4">
                <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {p.rows.map(({ label, value }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-white/6 bg-white/[0.02] p-3"
                    >
                      <div className="mb-1 text-xs font-medium text-zinc-300">{label}</div>
                      <div className="text-xs text-zinc-400">{value}</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 rounded-xl border border-amber-400/10 bg-amber-400/[0.04] p-3 text-xs text-zinc-400">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-300/70" />
                  {p.notes}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Sick Day Policy card ───────────────────────────────────────────────────────
function SickDayPolicyCard() {
  return (
    <SectionCard
      title="Sick Day Policy Template"
      action={
        <Link
          to="/app/generator?template=Sick%20Day%20Policy"
          className="gold-button inline-flex items-center gap-1.5 px-4 py-2 text-xs"
        >
          <FileText className="h-3.5 w-3.5" />
          Generate
        </Link>
      }
    >
      <p className="mb-4 text-sm text-zinc-400">
        Company sick day and medical leave policy covering statutory minimums, documentation
        requirements, absence reporting, and attendance management framework.
      </p>
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {[
          "Statutory minimum entitlements",
          "Documentation requirements",
          "Absence reporting process",
          "Pay during sick leave",
          "Attendance management",
          "Return-to-work process",
        ].map((item) => (
          <div key={item} className="flex items-center gap-2 text-xs text-zinc-400">
            <Check className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
            {item}
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-white/6 bg-white/[0.02] p-3">
        <div className="mb-2 text-xs font-medium text-zinc-300">
          Statutory sick leave minimums (key provinces)
        </div>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {[
            { j: "Ontario", min: "3 days unpaid / year (ESA)" },
            { j: "Quebec", min: "2 days paid + 24 hrs (ARLS)" },
            { j: "Federal", min: "10 days (3 paid after 3 months, CLC)" },
            { j: "BC", min: "5 days paid / year (ESA BC)" },
          ].map(({ j, min }) => (
            <div key={j} className="text-xs">
              <span className="font-medium text-zinc-300">{j}:</span>{" "}
              <span className="text-zinc-400">{min}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLAR WRAPPERS
// ═══════════════════════════════════════════════════════════════════════════════

function PillarA() {
  return (
    <div className="space-y-6">
      <MentalHealthChecklist />
      <EAPReferralGuide />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ReturnToWorkMentalHealthCard />
        <ManagerConversationGuide />
      </div>
    </div>
  );
}

function PillarB() {
  return (
    <div className="space-y-6">
      <DutyToAccommodateWorkflow />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <AccommodationRequestFormCard />
        <AccommodationPlanCard />
      </div>
      <FunctionalLimitationsGuide />
      <UndueHardshipAssessment />
    </div>
  );
}

function PillarC() {
  return (
    <div className="space-y-6">
      <PsychSafetyAssessment />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <RespectfulWorkplacePolicyCard />
        <WellnessActionPlanCard />
      </div>
      <BystanderInterventionGuide />
    </div>
  );
}

function PillarD() {
  return (
    <div className="space-y-6">
      <LeaveOfAbsenceChecklist />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <LeaveRequestFormCard />
        <SickDayPolicyCard />
      </div>
      <ParentalLeaveGuide />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE
// ═══════════════════════════════════════════════════════════════════════════════

const PILLARS = [
  {
    id: "pillar-a",
    label: "Pillar A",
    subtitle: "Mental Health & EAP",
  },
  {
    id: "pillar-b",
    label: "Pillar B",
    subtitle: "Accommodation Frameworks",
  },
  {
    id: "pillar-c",
    label: "Pillar C",
    subtitle: "Psychological Safety",
  },
  {
    id: "pillar-d",
    label: "Pillar D",
    subtitle: "Leave Management",
  },
];

export default function WellnessPage() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState("pillar-b");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="premium-card p-6">
        <div className="flex items-start gap-4">
          <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-amber-400/15 bg-amber-400/10 text-amber-300">
            <Heart className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-semibold text-zinc-100">
              {t("Workplace Wellness", "Bien-être au travail")}
            </h1>
            <p className="mt-1 text-sm text-zinc-400">
              {t(
                "Accommodation frameworks, leave management, and workplace wellness tools — built on Canadian human rights legislation.",
                "Cadres d'adaptation, gestion des congés et outils de bien-être — fondés sur la législation canadienne des droits de la personne."
              )}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Ontario", "Quebec", "Federal", "Remote (Federal)"].map((j) => (
                <span
                  key={j}
                  className="rounded-full border border-amber-400/12 bg-amber-400/6 px-2.5 py-1 text-xs text-amber-300"
                >
                  {j}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pillar tabs */}
      <div className="flex flex-wrap gap-2">
        {PILLARS.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={[
              "rounded-2xl border px-5 py-3 text-left transition",
              activeTab === p.id
                ? "border-amber-400/25 bg-amber-400/10"
                : "border-white/6 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.03]",
            ].join(" ")}
          >
            <div
              className={`text-sm font-semibold ${activeTab === p.id ? "text-amber-200" : "text-zinc-300"}`}
            >
              {p.label}
            </div>
            <div className="mt-0.5 text-xs text-zinc-500">{p.subtitle}</div>
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "pillar-a" && <PillarA />}
      {activeTab === "pillar-b" && <PillarB />}
      {activeTab === "pillar-c" && <PillarC />}
      {activeTab === "pillar-d" && <PillarD />}
    </div>
  );
}
