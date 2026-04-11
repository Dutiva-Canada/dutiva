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
    subtitle: "Mental Health Support",
  },
  {
    id: "pillar-b",
    label: "Pillar B",
    subtitle: "Accommodation Frameworks",
  },
  {
    id: "pillar-c",
    label: "Pillar C",
    subtitle: "Workplace Ergonomics",
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
      {activeTab === "pillar-a" && (
        <ComingSoon
          pillar="Pillar A — Mental Health Support"
          description="Tools for psychological health and safety: mental health accommodation frameworks, WSIB claims guidance, and manager resources for supporting employees in distress."
        />
      )}
      {activeTab === "pillar-b" && <PillarB />}
      {activeTab === "pillar-c" && (
        <ComingSoon
          pillar="Pillar C — Workplace Ergonomics"
          description="Ergonomics assessment tools, workstation accommodation frameworks, and musculoskeletal injury prevention resources aligned with provincial health and safety legislation."
        />
      )}
      {activeTab === "pillar-d" && <PillarD />}
    </div>
  );
}
