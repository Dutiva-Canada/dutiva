import { useState } from "react";
import {
  Megaphone, FileText, AlertTriangle, Copy, Check,
  ChevronDown, ChevronUp, Users, ShieldAlert, BookOpen, ClipboardList, Mic2,
} from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";

// ── Shared helpers ────────────────────────────────────────────────────────────

function SectionCard({ title, subtitle, icon: Icon, children }) {
  return (
    <div className="premium-card p-6">
      <div className="mb-5 flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-base font-semibold text-zinc-100">{title}</h3>
          {subtitle && <p className="mt-0.5 text-sm text-zinc-400">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20"
    />
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none focus:border-amber-400/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={copy} className="ghost-button inline-flex items-center gap-2 px-4 py-2 text-xs">
      {copied ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Copy className="h-3.5 w-3.5" />}
      {copied ? "Copied!" : "Copy script"}
    </button>
  );
}

function ScriptBlock({ text }) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-4 text-sm leading-7 text-zinc-300 whitespace-pre-wrap font-mono">
      {text}
    </div>
  );
}

// ── Tool 1: Layoff Script Builder ─────────────────────────────────────────────

function LayoffScriptBuilder({ t }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [years, setYears] = useState("");
  const [province, setProvince] = useState("ON");
  const pvList = [
    { value: "ON",      label: "Ontario" },
    { value: "QC",      label: "Qu\u00e9bec" },
    { value: "Federal", label: "Federal (Canada Labour Code)" },
  ];
  const n = Math.max(1, Math.min(8, parseInt(years) || 1));
  const script = name
    ? `PRIVATE AND CONFIDENTIAL\n\n${new Date().toLocaleDateString("en-CA")}\n\nDear ${name},\n\nRE: Elimination of Position – ${role || "[Role]"}\n\nThis letter confirms that due to a business restructuring, your position of ${role || "[Role]"} has been eliminated, effective ${lastDay || "[date]"}. This decision is not a reflection of your performance or conduct.\n\nIn accordance with the ${province} Employment Standards Act, you will receive:\n  \u2022 ${n} week(s) working notice or pay in lieu thereof\n  \u2022 Record of Employment issued within 5 business days of your last day\n  \u2022 Benefits continuation through the notice period\n\nPlease return all company property by your last day. Our HR team will contact you to discuss transition details.\n\nWe sincerely thank you for your contributions and wish you every success in your next chapter.\n\nSincerely,\n\n[Manager Name]\n[Title]\n[Company Name]`
    : "";
  return (
    <SectionCard icon={FileText}
      title={t("Layoff Announcement Script", "Script d'annonce de licenciement")}
      subtitle={t("Compliant individual termination letter", "Lettre de licenciement individuelle conforme")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Employee Name", "Nom de l'employ\u00e9")}>
          <Input value={name} onChange={setName} placeholder="Jane Smith" />
        </Field>
        <Field label={t("Role / Position", "Poste")}>
          <Input value={role} onChange={setRole} placeholder="Marketing Coordinator" />
        </Field>
        <Field label={t("Last Day of Work", "Dernier jour de travail")}>
          <Input value={lastDay} onChange={setLastDay} placeholder="2025-06-30" />
        </Field>
        <Field label={t("Years of Service", "Ann\u00e9es de service")}>
          <Input value={years} onChange={setYears} placeholder="3" />
        </Field>
        <Field label={t("Province", "Province")}>
          <Select value={province} onChange={setProvince} options={pvList} />
        </Field>
      </div>
      {script ? (
        <div className="mt-5 space-y-3"><ScriptBlock text={script} /><CopyButton text={script} /></div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter employee details above to generate.", "Entrez les informations ci-dessus pour g\u00e9n\u00e9rer.")}</p>
      )}
    </SectionCard>
  );
}

// ── Tool 2: Restructuring Announcement ────────────────────────────────────────

function RestructuringTool({ t }) {
  const [dept, setDept] = useState("");
  const [change, setChange] = useState("");
  const [effective, setEffective] = useState("");
  const [contact, setContact] = useState("");
  const script = dept
    ? `MEMO: Departmental Restructuring Update\n\nTO: [Department] Team\nFROM: [Senior Leadership]\nDATE: ${new Date().toLocaleDateString("en-CA")}\nRE: Restructuring of the ${dept} Department\n\nWe are writing to inform you of organizational changes within the ${dept} department, effective ${effective || "[date]"}.\n\nWhat is changing:\n${change || "[Describe changes \u2014 reporting lines, team composition, role changes, etc.]"}\n\nWe understand this news may raise questions. Our commitment is to treat all team members with respect and transparency throughout this process.\n\nNext steps:\n  \u2022 Individual meetings will be scheduled within [X] business days\n  \u2022 Affected employees will be notified directly and privately\n  \u2022 HR support is available to all employees during this transition\n\nFor questions, please contact ${contact || "[HR / Manager Name]"}.\n\n[Leadership signature]`
    : "";
  return (
    <SectionCard icon={Users}
      title={t("Restructuring Announcement", "Annonce de restructuration")}
      subtitle={t("Team-wide memo for organizational changes", "M\u00e9mo d'\u00e9quipe pour les changements organisationnels")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Department / Team", "D\u00e9partement / \u00c9quipe")}>
          <Input value={dept} onChange={setDept} placeholder="Sales & Marketing" />
        </Field>
        <Field label={t("Effective Date", "Date d'entr\u00e9e en vigueur")}>
          <Input value={effective} onChange={setEffective} placeholder="2025-07-01" />
        </Field>
        <Field label={t("Changes Being Made", "Changements apport\u00e9s")}>
          <Input value={change} onChange={setChange} placeholder="Reporting lines, team merges, role updates..." />
        </Field>
        <Field label={t("HR / Contact Person", "RH / Personne-ressource")}>
          <Input value={contact} onChange={setContact} placeholder="hr@company.com" />
        </Field>
      </div>
      {script ? (
        <div className="mt-5 space-y-3"><ScriptBlock text={script} /><CopyButton text={script} /></div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter department details to generate memo.", "Entrez les d\u00e9tails du d\u00e9partement pour g\u00e9n\u00e9rer le m\u00e9mo.")}</p>
      )}
    </SectionCard>
  );
}

// ── Tool 3: Employee FAQ Builder ──────────────────────────────────────────────

function FAQBuilder({ t }) {
  const [scenario, setScenario] = useState("layoff");
  const [company, setCompany] = useState("");
  const [hrContact, setHrContact] = useState("");
  const scenarios = [
    { value: "layoff", label: t("Layoff / Position Elimination", "Licenciement / \u00c9limination de poste") },
    { value: "restructuring", label: t("Restructuring", "Restructuration") },
    { value: "policy", label: t("New Policy Introduction", "Introduction d'une nouvelle politique") },
  ];
  const heading = scenario === "layoff" ? "Position Elimination" : scenario === "restructuring" ? "Departmental Restructuring" : "Policy Update";
  const faq = `EMPLOYEE FAQ \u2013 ${heading}\nCompany: ${company || "[Company Name]"} | Date: ${new Date().toLocaleDateString("en-CA")}\n\nQ: Why is this happening?\nA: This decision was made due to business and economic factors. It is not related to individual performance.\n\nQ: When will I know if I am affected?\nA: Affected employees will be notified individually and privately by [date].\n\nQ: What will I receive if my position is eliminated?\nA: You are entitled to notice pay, severance (where applicable), and a Record of Employment in accordance with the applicable provincial Employment Standards Act.\n\nQ: What happens to my benefits?\nA: Benefits continue through the notice period. HR will provide details specific to your situation.\n\nQ: Will I receive a reference letter?\nA: Yes. Please contact your manager or HR to arrange this.\n\nQ: Who can I speak with if I have questions?\nA: Please contact ${hrContact || "[HR Contact / EAP number]"}. An Employee Assistance Program (EAP) is also available to all employees.`;
  return (
    <SectionCard icon={ClipboardList}
      title={t("Employee FAQ Document", "Document FAQ employ\u00e9")}
      subtitle={t("Pre-built Q&A for common employee questions", "Questions-r\u00e9ponses pr\u00e9d\u00e9finies pour les questions courantes")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Scenario", "Sc\u00e9nario")}>
          <Select value={scenario} onChange={setScenario} options={scenarios} />
        </Field>
        <Field label={t("Company Name", "Nom de l'entreprise")}>
          <Input value={company} onChange={setCompany} placeholder="Acme Corp" />
        </Field>
        <Field label={t("HR Contact / EAP Line", "Contact RH / PAE")}>
          <Input value={hrContact} onChange={setHrContact} placeholder="hr@company.com or 1-800-..." />
        </Field>
      </div>
      <div className="mt-5 space-y-3">
        <ScriptBlock text={faq} />
        <CopyButton text={faq} />
      </div>
    </SectionCard>
  );
}

// ── Tool 4: Policy Introduction Memo ─────────────────────────────────────────

function PolicyMemo({ t }) {
  const [policyName, setPolicyName] = useState("");
  const [effective, setEffective] = useState("");
  const [summary, setSummary] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");
  const memo = policyName
    ? `POLICY MEMO\n\nTO: All Employees\nFROM: Human Resources / Management\nDATE: ${new Date().toLocaleDateString("en-CA")}\nRE: Introduction of the ${policyName} Policy\n\nEffective ${effective || "[date]"}, the following policy will be in effect at [Company Name].\n\nPOLICY SUMMARY:\n${summary || "[Describe the key points of the policy in plain language.]"}\n\nWHY WE ARE IMPLEMENTING THIS:\n${reason || "[Explain the business, legal, or safety reason for introducing this policy.]"}\n\nWHAT YOU NEED TO DO:\n  \u2022 Review the full policy document on [HR portal / shared drive]\n  \u2022 Sign and return the acknowledgement form by [deadline]\n  \u2022 Direct any questions to ${contact || "[HR contact]"}\n\nAll employees are expected to comply with this policy as of the effective date.\n\nThank you for your cooperation.\n\n[HR / Management signature]`
    : "";
  return (
    <SectionCard icon={BookOpen}
      title={t("Policy Introduction Memo", "M\u00e9mo d'introduction de politique")}
      subtitle={t("Formal memo announcing a new or updated policy", "M\u00e9mo formel pour une politique nouvelle ou mise \u00e0 jour")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Policy Name", "Nom de la politique")}>
          <Input value={policyName} onChange={setPolicyName} placeholder="Remote Work Policy" />
        </Field>
        <Field label={t("Effective Date", "Date d'entr\u00e9e en vigueur")}>
          <Input value={effective} onChange={setEffective} placeholder="2025-07-01" />
        </Field>
        <Field label={t("Policy Summary", "R\u00e9sum\u00e9 de la politique")}>
          <Input value={summary} onChange={setSummary} placeholder="Employees may work remotely up to 2 days per week..." />
        </Field>
        <Field label={t("Reason / Rationale", "Raison / Justification")}>
          <Input value={reason} onChange={setReason} placeholder="To support work-life balance and productivity..." />
        </Field>
        <Field label={t("HR Contact", "Contact RH")}>
          <Input value={contact} onChange={setContact} placeholder="hr@company.com" />
        </Field>
      </div>
      {memo ? (
        <div className="mt-5 space-y-3"><ScriptBlock text={memo} /><CopyButton text={memo} /></div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter policy details above to generate memo.", "Entrez les d\u00e9tails de la politique pour g\u00e9n\u00e9rer le m\u00e9mo.")}</p>
      )}
    </SectionCard>
  );
}

// ── Tool 5: Crisis Communications Guide ───────────────────────────────────────

const CRISIS_SCENARIOS = [
  {
    icon: AlertTriangle,
    title: "Workplace Accident / Safety Incident",
    titleFr: "Accident de travail / Incident de s\u00e9curit\u00e9",
    steps: [
      "Secure the area and call 911 if medical attention is required.",
      "Notify management and HR immediately.",
      "File a WSIB/WCB report within 3 days for any lost-time injury.",
      "Communicate to the team only what is necessary \u2014 avoid speculation.",
      "Offer EAP resources to all affected employees.",
      "Cooperate fully with any government inspection or investigation.",
    ],
  },
  {
    icon: ShieldAlert,
    title: "Data Breach / Privacy Incident",
    titleFr: "Atteinte aux donn\u00e9es / Incident de confidentialit\u00e9",
    steps: [
      "Contain the breach immediately \u2014 isolate affected systems.",
      "Notify your Privacy Officer and legal counsel within 24 hours.",
      "Assess whether notification to the OPC or provincial regulator is required.",
      "Prepare internal communications \u2014 do not minimize the incident.",
      "If required, notify affected individuals promptly and clearly.",
      "Document all steps taken for regulatory and audit purposes.",
    ],
  },
  {
    icon: Megaphone,
    title: "Media Inquiry / Press Situation",
    titleFr: "Demande des m\u00e9dias / Situation de presse",
    steps: [
      "Direct all media inquiries to your designated spokesperson only.",
      "Do not confirm or deny anything without leadership approval.",
      "Use a holding statement: 'We are aware of the situation and are investigating.'",
      "Keep internal communications factual, calm, and contained.",
      "Monitor social media channels for escalation.",
      "Follow up with a formal statement once all facts are confirmed.",
    ],
  },
];

function CrisisGuide({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <SectionCard icon={ShieldAlert}
      title={t("Crisis Communications Guide", "Guide de communications de crise")}
      subtitle={t("Step-by-step protocols for critical incidents", "Protocoles \u00e9tape par \u00e9tape pour les incidents critiques")}>
      <div className="space-y-3">
        {CRISIS_SCENARIOS.map((s, i) => (
          <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <s.icon className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-zinc-100">{t(s.title, s.titleFr)}</span>
              </div>
              {open === i
                ? <ChevronUp className="h-4 w-4 text-zinc-500" />
                : <ChevronDown className="h-4 w-4 text-zinc-500" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <ol className="space-y-2">
                  {s.steps.map((step, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-300">
                      <span className="text-amber-400 font-bold shrink-0">{j + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ── Tab wrappers ──────────────────────────────────────────────────────────────

// ══ Tool 6: Town Hall Agenda Builder ═══════════════════════════════════════════

const MEETING_TYPES = [
  { value: "all-hands",  label: "All-Hands (Full company)",    labelFr: "Assembl\u00e9e g\u00e9n\u00e9rale (Toute l'entreprise)" },
  { value: "department", label: "Department Town Hall",         labelFr: "Assembl\u00e9e de d\u00e9partement"                    },
  { value: "leadership", label: "Leadership / Exec Offsite",    labelFr: "R\u00e9union de direction / Hors-site"                 },
  { value: "crisis",     label: "Crisis / Emergency All-Hands", labelFr: "Assembl\u00e9e d'urgence / Crise"                     },
];

const DURATIONS = [
  { value: "30",  label: "30 minutes" },
  { value: "45",  label: "45 minutes" },
  { value: "60",  label: "60 minutes (1 hour)" },
  { value: "90",  label: "90 minutes (1.5 hours)" },
  { value: "120", label: "120 minutes (2 hours)" },
];

function TownHallAgendaBuilder({ t }) {
  const [company,     setCompany]     = useState("");
  const [meetingType, setMeetingType] = useState("all-hands");
  const [date,        setDate]        = useState("");
  const [time,        setTime]        = useState("");
  const [facilitator, setFacilitator] = useState("");
  const [duration,    setDuration]    = useState("60");
  const [topics,      setTopics]      = useState("");

  const typeLabel = MEETING_TYPES.find((m) => m.value === meetingType)?.label ?? "Town Hall";
  const mins = parseInt(duration, 10);

  const buildAgenda = () => {
    if (!company) return "";
    const topicLines = topics.split("\n").map((l) => l.trim()).filter(Boolean);
    const openingMins = Math.round(mins * 0.10);
    const closingMins = Math.round(mins * 0.05);
    const qaMins      = Math.round(mins * 0.20);
    const mainMins    = mins - openingMins - closingMins - qaMins;
    const perTopic    = topicLines.length > 0 ? Math.floor(mainMins / topicLines.length) : mainMins;
    const line        = "\u2500".repeat(60);

    let a = `${typeLabel.toUpperCase()} \u2014 ${company}\n`;
    a += `Date: ${date || "[Date]"}   Time: ${time || "[Time]"}   Duration: ${duration} min\n`;
    a += `Facilitator: ${facilitator || "[Facilitator Name]"}\n${line}\n\nAGENDA\n\n`;

    let cur = 0;
    const fmt = (n) => `[+${n} min]`.padEnd(12);
    a += `${fmt(cur)} Welcome & Opening Remarks (${openingMins} min)\n`;
    a += `             \u2022 Meeting objectives and ground rules\n`;
    cur += openingMins;

    topicLines.forEach((topic, i) => {
      a += `\n${fmt(cur)} ${i + 1}. ${topic} (${perTopic} min)\n`;
      cur += perTopic;
    });
    if (topicLines.length === 0) {
      a += `\n${fmt(cur)} [Add agenda topics above] (${mainMins} min)\n`;
      cur += mainMins;
    }

    a += `\n${fmt(cur)} Q&A / Open Floor (${qaMins} min)\n`;
    a += `             \u2022 Encourage questions via chat or raise hand\n`;
    cur += qaMins;

    a += `\n${fmt(cur)} Closing & Next Steps (${closingMins} min)\n`;
    a += `             \u2022 Key decisions / action items recap\n`;
    a += `             \u2022 Recording and notes shared by [date]\n\n${line}\n`;
    a += `Prepared by ${facilitator || "[Facilitator]"} \u00b7 ${company}`;
    return a;
  };

  const agenda = buildAgenda();

  return (
    <SectionCard icon={Mic2}
      title={t("Town Hall Agenda Builder", "G\u00e9n\u00e9rateur d'ordre du jour d'assembl\u00e9e")}
      subtitle={t("Structured agenda with timed segments for any company-wide meeting", "Ordre du jour structur\u00e9 pour toute r\u00e9union d'entreprise")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Company Name", "Nom de l'entreprise")}>
          <Input value={company} onChange={setCompany} placeholder="Acme Corp" />
        </Field>
        <Field label={t("Meeting Type", "Type de r\u00e9union")}>
          <Select value={meetingType} onChange={setMeetingType}
            options={MEETING_TYPES.map((m) => ({ value: m.value, label: t(m.label, m.labelFr) }))} />
        </Field>
        <Field label={t("Date", "Date")}>
          <Input value={date} onChange={setDate} placeholder="2025-09-15" />
        </Field>
        <Field label={t("Start Time", "Heure de d\u00e9but")}>
          <Input value={time} onChange={setTime} placeholder="10:00 AM ET" />
        </Field>
        <Field label={t("Facilitator / Host", "Animateur / H\u00f4te")}>
          <Input value={facilitator} onChange={setFacilitator} placeholder="CEO / VP People" />
        </Field>
        <Field label={t("Meeting Duration", "Dur\u00e9e de la r\u00e9union")}>
          <Select value={duration} onChange={setDuration} options={DURATIONS} />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t("Agenda Topics (one per line)", "Sujets \u00e0 l'ordre du jour (un par ligne)")}>
          <textarea
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            rows={4}
            placeholder={t(
              "Q2 financial results\nProduct roadmap update\nPeople & culture initiatives\nAnnouncements",
              "R\u00e9sultats financiers T2\nMise \u00e0 jour feuille de route\nInitiatives RH\nAnnonces"
            )}
            className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 resize-none"
          />
        </Field>
      </div>
      {agenda ? (
        <div className="mt-5 space-y-3"><ScriptBlock text={agenda} /><CopyButton text={agenda} /></div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter company name above to generate.", "Entrez le nom de l'entreprise ci-dessus pour g\u00e9n\u00e9rer.")}</p>
      )}
    </SectionCard>
  );
}

// ══ Tool 7: Talking Points Builder ════════════════════════════════════════════

function TalkingPointsBuilder({ t }) {
  const [topic,    setTopic]    = useState("");
  const [audience, setAudience] = useState("");
  const [keyMsg,   setKeyMsg]   = useState("");
  const [point1,   setPoint1]   = useState("");
  const [point2,   setPoint2]   = useState("");
  const [point3,   setPoint3]   = useState("");
  const [toughQ,   setToughQ]   = useState("");

  const line = "\u2500".repeat(60);
  const doc  = topic
    ? `LEADERSHIP TALKING POINTS\nTopic: ${topic}\nAudience: ${audience || "All employees"}\nDate: ${new Date().toLocaleDateString("en-CA")}\n${line}\n\nCORE MESSAGE\n\u201c${keyMsg || "[Insert your 1\u20132 sentence key message here]"}\u201d\n\nSUPPORTING POINTS\n\n${point1 ? `1. ${point1}` : "1. [Supporting point]"}\n\n${point2 ? `2. ${point2}` : "2. [Supporting point]"}\n\n${point3 ? `3. ${point3}` : "3. [Supporting point]"}\n\n${line}\n\nANTICIPATED TOUGH QUESTIONS\n\n${
        toughQ
          ? toughQ.split("\n").filter(Boolean).map((q, i) => `Q${i + 1}: ${q}\nA:  [Prepare your answer here]\n`).join("\n")
          : "Q1: [Add anticipated tough question]\nA:  [Prepare your answer here]"
      }\n${line}\n\nKEY DELIVERY REMINDERS\n\u2022 Return to the core message if sidetracked\n\u2022 Acknowledge uncertainty honestly \u2014 don\u2019t over-promise\n\u2022 Thank employees for questions and engagement\n\u2022 Refer legal/HR specifics to the appropriate contact\n\nPresenter: [Name / Title] \u00b7 ${new Date().toLocaleDateString("en-CA")}`
    : "";

  return (
    <SectionCard icon={ClipboardList}
      title={t("Leadership Talking Points Builder", "G\u00e9n\u00e9rateur de points de discussion pour la direction")}
      subtitle={t("Copy-ready talking points for announcements, change management, or difficult messages", "Points de discussion pour annonces, gestion du changement ou messages difficiles")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Announcement Topic", "Sujet de l'annonce")}>
          <Input value={topic} onChange={setTopic} placeholder="Q2 Restructuring Plan" />
        </Field>
        <Field label={t("Audience", "Auditoire")}>
          <Input value={audience} onChange={setAudience} placeholder="All employees / Sales team" />
        </Field>
        <Field label={t("Core Message (1\u20132 sentences)", "Message cl\u00e9 (1\u20132 phrases)")}>
          <Input value={keyMsg} onChange={setKeyMsg} placeholder="We are restructuring to focus on our core strengths..." />
        </Field>
        <Field label={t("Supporting Point 1", "Point d'appui 1")}>
          <Input value={point1} onChange={setPoint1} placeholder="Why this decision was made" />
        </Field>
        <Field label={t("Supporting Point 2", "Point d'appui 2")}>
          <Input value={point2} onChange={setPoint2} placeholder="What changes employees can expect" />
        </Field>
        <Field label={t("Supporting Point 3", "Point d'appui 3")}>
          <Input value={point3} onChange={setPoint3} placeholder="Timeline and next steps" />
        </Field>
      </div>
      <div className="mt-4">
        <Field label={t("Anticipated Tough Questions (one per line)", "Questions difficiles anticip\u00e9es (une par ligne)")}>
          <textarea
            value={toughQ}
            onChange={(e) => setToughQ(e.target.value)}
            rows={3}
            placeholder={t(
              "Will there be layoffs?\nWhy wasn't this communicated earlier?\nHow does this affect my role?",
              "Y aura-t-il des mises \u00e0 pied?\nPourquoi n'a-t-on pas communiqu\u00e9 plus t\u00f4t?\nComment cela affecte-t-il mon r\u00f4le?"
            )}
            className="w-full rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/30 focus:ring-1 focus:ring-amber-400/20 resize-none"
          />
        </Field>
      </div>
      {doc ? (
        <div className="mt-5 space-y-3"><ScriptBlock text={doc} /><CopyButton text={doc} /></div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter the announcement topic above to generate talking points.", "Entrez le sujet de l'annonce pour g\u00e9n\u00e9rer les points de discussion.")}</p>
      )}
    </SectionCard>
  );
}

function WorkforceTab({ t }) {
  return (
    <div className="space-y-6">
      <LayoffScriptBuilder t={t} />
      <RestructuringTool t={t} />
    </div>
  );
}

function PolicyTab({ t }) {
  return (
    <div className="space-y-6">
      <FAQBuilder t={t} />
      <PolicyMemo t={t} />
    </div>
  );
}

function TownHallTab({ t }) {
  return (
    <div className="space-y-6">
      <TownHallAgendaBuilder t={t} />
      <TalkingPointsBuilder t={t} />
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "workforce", icon: Users,       label: "Workforce Transitions", labelFr: "Transitions de main-d\u2019\u0153uvre"      },
  { id: "policy",    icon: BookOpen,    label: "Policy Communications", labelFr: "Communications de politique"               },
  { id: "crisis",    icon: ShieldAlert, label: "Crisis Communications", labelFr: "Communications de crise"                  },
  { id: "town-hall", icon: Mic2,        label: "Town Hall Builder",     labelFr: "G\u00e9n\u00e9rateur d'assembl\u00e9es"    },
];

export default function Communications() {
  const [activeTab, setActiveTab] = useState("workforce");
  const { t } = useLang();
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          {t("Ring 3", "Anneau 3")}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-100">
          {t("Internal Communications", "Communications internes")}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {t(
            "Compliant scripts, memos, and crisis protocols for Canadian employers.",
            "Scripts, m\u00e9mos et protocoles de crise conformes pour les employeurs canadiens."
          )}
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
              activeTab === tab.id ? "bg-amber-400 text-zinc-900" : "ghost-button"
            }`}
          >
            <tab.icon className="h-4 w-4" />
            {t(tab.label, tab.labelFr)}
          </button>
        ))}
      </div>
      {activeTab === "workforce" && <WorkforceTab t={t} />}
      {activeTab === "policy"    && <PolicyTab t={t} />}
      {activeTab === "crisis"    && <CrisisGuide t={t} />}
      {activeTab === "town-hall" && <TownHallTab t={t} />}
    </div>
  );
}
