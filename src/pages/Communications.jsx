import { useState } from "react";
import {
  Megaphone, FileText, AlertTriangle, Copy, Check,
  ChevronDown, ChevronUp, Users, ShieldAlert, BookOpen, ClipboardList,
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
    { value: "ON", label: "Ontario" },
    { value: "BC", label: "British Columbia" },
    { value: "AB", label: "Alberta" },
    { value: "QC", label: "Québec" },
    { value: "MB", label: "Manitoba" },
    { value: "SK", label: "Saskatchewan" },
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

// ── Main page ─────────────────────────────────────────────────────────────────

const TABS = [
  { id: "workforce", icon: Users,       label: "Workforce Transitions", labelFr: "Transitions de main-d\u2019\u0153uvre" },
  { id: "policy",    icon: BookOpen,    label: "Policy Communications", labelFr: "Communications de politique"          },
  { id: "crisis",    icon: ShieldAlert, label: "Crisis Communications", labelFr: "Communications de crise"             },
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
    </div>
  );
}
