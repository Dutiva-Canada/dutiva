import { useState } from "react";
import {
  DollarSign, TrendingUp, Scale, BookOpen, Calculator,
  Copy, Check, ChevronDown, ChevronUp,
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

function Input({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
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
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function ResultRow({ label, value, highlight }) {
  return (
    <div className={`flex items-center justify-between rounded-xl px-4 py-3 ${highlight ? "bg-amber-400/10 border border-amber-400/20" : "bg-white/[0.03] border border-white/6"}`}>
      <span className="text-sm text-zinc-300">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-amber-300" : "text-zinc-100"}`}>{value}</span>
    </div>
  );
}

// ── Tool 1: Severance & Notice Calculator ─────────────────────────────────────

function SeveranceCalculator({ t }) {
  const [years, setYears] = useState("");
  const [salary, setSalary] = useState("");
  const [province, setProvince] = useState("ON");
  const pvList = [
    { value: "ON",      label: "Ontario" },
    { value: "QC",      label: "Qu\u00e9bec" },
    { value: "Federal", label: "Federal (Canada Labour Code)" },
  ];
  const y = parseFloat(years) || 0;
  const s = parseFloat(salary) || 0;
  const weeklyPay = s / 52;
  const esaNotice = Math.min(y, 8);
  const esaSeverance = province === "ON" && s > 0 ? Math.min(y, 26) : esaNotice;
  const commonLaw = Math.round(y * 1.2 + 0.5);
  const esaNoticeAmt = weeklyPay * esaNotice;
  const commonLawAmt = weeklyPay * commonLaw;
  const fmt = (n) => n > 0 ? `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—";
  const fmtW = (n) => n > 0 ? `${n} week${n !== 1 ? "s" : ""}` : "—";
  return (
    <SectionCard icon={Calculator}
      title={t("Severance & Notice Calculator", "Calculateur d'indemnit\u00e9 de licenciement")}
      subtitle={t("ESA minimums + common law estimates by province", "Minimums ESA + estimations de droit commun par province")}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={t("Years of Service", "Ann\u00e9es de service")}>
          <Input value={years} onChange={setYears} placeholder="5" type="number" />
        </Field>
        <Field label={t("Annual Salary ($)", "Salaire annuel ($)")}>
          <Input value={salary} onChange={setSalary} placeholder="65000" type="number" />
        </Field>
        <Field label={t("Province", "Province")}>
          <Select value={province} onChange={setProvince} options={pvList} />
        </Field>
      </div>
      {y > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">{t("Results", "R\u00e9sultats")}</p>
          <ResultRow label={t("ESA Minimum Notice", "Pr\u00e9avis minimum ESA")} value={fmtW(esaNotice)} />
          <ResultRow label={t("ESA Notice Value", "Valeur du pr\u00e9avis ESA")} value={fmt(esaNoticeAmt)} />
          <ResultRow label={t("Common Law Estimate (weeks)", "Estimation droit commun (semaines)")} value={fmtW(commonLaw)} />
          <ResultRow label={t("Common Law Estimate ($)", "Estimation droit commun ($)")} value={fmt(commonLawAmt)} highlight />
          <p className="mt-3 text-xs text-zinc-500">{t("Common law estimate uses 1.2 weeks/year. Actual entitlement depends on age, role, availability of similar work, and case law. Always consult legal counsel.", "L\u2019estimation du droit commun utilise 1,2 semaine/ann\u00e9e. Consultez un conseiller juridique pour toute d\u00e9cision.")}</p>
        </div>
      )}
      {!y && <p className="mt-4 text-sm text-zinc-500">{t("Enter years of service to calculate.", "Entrez les ann\u00e9es de service pour calculer.")}</p>}
    </SectionCard>
  );
}

// ── Tool 2: Pay Equity Checker ────────────────────────────────────────────────

function PayEquityChecker({ t }) {
  const [rows, setRows] = useState([
    { role: "", gender: "mixed", salary: "" },
    { role: "", gender: "mixed", salary: "" },
  ]);
  const update = (i, field, val) => setRows(r => r.map((row, idx) => idx === i ? { ...row, [field]: val } : row));
  const addRow = () => setRows(r => [...r, { role: "", gender: "mixed", salary: "" }]);
  const genderOpts = [
    { value: "mixed",  label: t("Mixed / N/A", "Mixte / S/O") },
    { value: "female", label: t("Female-dominated", "Dominance f\u00e9minine") },
    { value: "male",   label: t("Male-dominated",   "Dominance masculine") },
  ];
  const filled = rows.filter(r => r.role && parseFloat(r.salary) > 0);
  const femaleRows = filled.filter(r => r.gender === "female");
  const maleRows   = filled.filter(r => r.gender === "male");
  const avg = (arr) => arr.length ? arr.reduce((s, r) => s + parseFloat(r.salary), 0) / arr.length : null;
  const fAvg = avg(femaleRows);
  const mAvg = avg(maleRows);
  const gap = fAvg && mAvg ? ((mAvg - fAvg) / mAvg * 100).toFixed(1) : null;
  const fmt = (n) => n != null ? `$${Math.round(n).toLocaleString("en-CA")}` : "—";
  return (
    <SectionCard icon={Scale}
      title={t("Pay Equity Checker", "V\u00e9rificateur d'\u00e9quit\u00e9 salariale")}
      subtitle={t("Compare compensation across roles — Ontario Pay Equity Act compliant", "Comparer la r\u00e9mun\u00e9ration \u2014 conforme \u00e0 la Loi sur l'\u00e9quit\u00e9 salariale de l'Ontario")}>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="grid gap-3 sm:grid-cols-3">
            <Field label={i === 0 ? t("Role / Job Class", "Poste / Classe d'emploi") : ""}>
              <Input value={row.role} onChange={(v) => update(i, "role", v)} placeholder="e.g. Admin Assistant" />
            </Field>
            <Field label={i === 0 ? t("Gender Composition", "Composition par genre") : ""}>
              <Select value={row.gender} onChange={(v) => update(i, "gender", v)} options={genderOpts} />
            </Field>
            <Field label={i === 0 ? t("Annual Salary ($)", "Salaire annuel ($)") : ""}>
              <Input value={row.salary} onChange={(v) => update(i, "salary", v)} placeholder="55000" type="number" />
            </Field>
          </div>
        ))}
        <button onClick={addRow} className="ghost-button px-4 py-2 text-xs">{t("+ Add role", "+ Ajouter un poste")}</button>
      </div>
      {gap !== null && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">{t("Pay Equity Summary", "R\u00e9sum\u00e9 d'\u00e9quit\u00e9 salariale")}</p>
          <ResultRow label={t("Avg. salary — female-dominated roles", "Salaire moy. \u2014 postes \u00e0 dominance f\u00e9minine")} value={fmt(fAvg)} />
          <ResultRow label={t("Avg. salary — male-dominated roles", "Salaire moy. \u2014 postes \u00e0 dominance masculine")} value={fmt(mAvg)} />
          <ResultRow label={t("Pay gap", "\u00c9cart salarial")} value={`${gap}%`} highlight={parseFloat(gap) > 5} />
          {parseFloat(gap) > 5 && <p className="mt-2 text-xs text-amber-400">{t("A gap above 5% may warrant a pay equity review under applicable legislation.", "Un \u00e9cart sup\u00e9rieur \u00e0 5\u00a0% peut n\u00e9cessiter une r\u00e9vision conform\u00e9ment \u00e0 la l\u00e9gislation applicable.")}</p>}
        </div>
      )}
    </SectionCard>
  );
}

// ── Tool 3: Salary Band Builder ───────────────────────────────────────────────

function SalaryBandBuilder({ t }) {
  const [role, setRole] = useState("");
  const [market, setMarket] = useState("");
  const [spread, setSpread] = useState("20");
  const m = parseFloat(market) || 0;
  const s = parseFloat(spread) || 20;
  const min = m * (1 - s / 200);
  const mid = m;
  const max = m * (1 + s / 200);
  const fmt = (n) => n > 0 ? `$${Math.round(n).toLocaleString("en-CA")}` : "—";
  const summary = role && m > 0
    ? `SALARY BAND — ${role}\n\nMarket Midpoint (P50): ${fmt(m)}\nBand Spread: \u00b1${s / 2}% (${s}% total)\n\nMinimum: ${fmt(min)}\nMidpoint: ${fmt(mid)}\nMaximum: ${fmt(max)}\n\nPlacement guidance:\n  \u2022 Min \u2013 Midpoint: New to role, building skills\n  \u2022 Midpoint: Fully competent, meeting expectations\n  \u2022 Midpoint \u2013 Max: Expert-level, consistently exceeds expectations\n\nReview annually against market data (Mercer, Hay, Radford, or Statistics Canada surveys).`
    : "";
  return (
    <SectionCard icon={TrendingUp}
      title={t("Salary Band Builder", "Constructeur de fourchettes salariales")}
      subtitle={t("Design pay bands from a market midpoint", "Concevoir des fourchettes salariales \u00e0 partir d'un point m\u00e9dian de march\u00e9")}>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label={t("Role / Job Title", "Poste / Titre d'emploi")}>
          <Input value={role} onChange={setRole} placeholder="Senior Developer" />
        </Field>
        <Field label={t("Market Midpoint ($)", "Point m\u00e9dian du march\u00e9 ($)")}>
          <Input value={market} onChange={setMarket} placeholder="95000" type="number" />
        </Field>
        <Field label={t("Band Spread (%)", "\u00c9tendue de la fourchette (%)")}>
          <Input value={spread} onChange={setSpread} placeholder="20" type="number" />
        </Field>
      </div>
      {m > 0 && (
        <div className="mt-5 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-3">{t("Pay Band", "Fourchette salariale")}</p>
          <ResultRow label={t("Minimum", "Minimum")} value={fmt(min)} />
          <ResultRow label={t("Midpoint (market rate)", "Point m\u00e9dian (taux du march\u00e9)")} value={fmt(mid)} highlight />
          <ResultRow label={t("Maximum", "Maximum")} value={fmt(max)} />
        </div>
      )}
      {summary && <div className="mt-4 flex justify-end"><CopyButton text={summary} /></div>}
      {!m && <p className="mt-4 text-sm text-zinc-500">{t("Enter a market midpoint to build the salary band.", "Entrez un point m\u00e9dian de march\u00e9 pour construire la fourchette.")}</p>}
    </SectionCard>
  );
}

// ── Tool 4: Total Compensation Statement ─────────────────────────────────────

function TotalCompStatement({ t }) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [baseSalary, setBaseSalary] = useState("");
  const [bonus, setBonus] = useState("");
  const [benefits, setBenefits] = useState("");
  const [rrsp, setRrsp] = useState("");
  const [other, setOther] = useState("");
  const base = parseFloat(baseSalary) || 0;
  const bon  = parseFloat(bonus) || 0;
  const ben  = parseFloat(benefits) || 0;
  const ret  = parseFloat(rrsp) || 0;
  const oth  = parseFloat(other) || 0;
  const total = base + bon + ben + ret + oth;
  const fmt = (n) => `$${Math.round(n).toLocaleString("en-CA")}`;
  const statement = name && base > 0
    ? `TOTAL COMPENSATION STATEMENT\n\n${t("Prepared for", "Pr\u00e9par\u00e9 pour")}: ${name}\n${t("Role", "Poste")}: ${role || "[Role]"}\n${t("Date", "Date")}: ${new Date().toLocaleDateString("en-CA")}\n\n${"─".repeat(42)}\nCOMPONENT                    ANNUAL VALUE\n${"─".repeat(42)}\nBase Salary                  ${fmt(base)}\nVariable / Bonus             ${fmt(bon)}\nBenefits Package             ${fmt(ben)}\nRRSP / Pension Matching      ${fmt(ret)}\nOther (equity, allowances)   ${fmt(oth)}\n${"─".repeat(42)}\nTOTAL COMPENSATION           ${fmt(total)}\n${"─".repeat(42)}\n\nThis statement is provided for informational purposes and reflects the estimated annual value of your full compensation package.`
    : "";
  return (
    <SectionCard icon={DollarSign}
      title={t("Total Compensation Statement", "\u00c9tat de r\u00e9mun\u00e9ration globale")}
      subtitle={t("Show employees the full value of their package", "Montrer aux employ\u00e9s la valeur totale de leur package")}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={t("Employee Name", "Nom de l'employ\u00e9")}>
          <Input value={name} onChange={setName} placeholder="Jane Smith" />
        </Field>
        <Field label={t("Role", "Poste")}>
          <Input value={role} onChange={setRole} placeholder="Product Manager" />
        </Field>
        <Field label={t("Base Salary ($)", "Salaire de base ($)")}>
          <Input value={baseSalary} onChange={setBaseSalary} placeholder="90000" type="number" />
        </Field>
        <Field label={t("Bonus / Variable Pay ($)", "Bonus / R\u00e9mun\u00e9ration variable ($)")}>
          <Input value={bonus} onChange={setBonus} placeholder="10000" type="number" />
        </Field>
        <Field label={t("Benefits Value ($)", "Valeur des avantages ($)")}>
          <Input value={benefits} onChange={setBenefits} placeholder="8000" type="number" />
        </Field>
        <Field label={t("RRSP / Pension Match ($)", "Cotisation REER / Retraite ($)")}>
          <Input value={rrsp} onChange={setRrsp} placeholder="4500" type="number" />
        </Field>
        <Field label={t("Other (equity, allowances, etc.)", "Autre (\u00e9quit\u00e9, allocations, etc.)")}>
          <Input value={other} onChange={setOther} placeholder="2000" type="number" />
        </Field>
      </div>
      {statement ? (
        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-white/8 bg-black/20 p-4 text-sm leading-7 text-zinc-300 whitespace-pre font-mono overflow-x-auto">
            {statement}
          </div>
          <CopyButton text={statement} />
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">{t("Enter name and base salary to generate statement.", "Entrez le nom et le salaire de base pour g\u00e9n\u00e9rer l'\u00e9tat.")}</p>
      )}
    </SectionCard>
  );
}

// ── Tool 5: Financial Literacy Reference ──────────────────────────────────────

const FIN_TOPICS = [
  {
    icon: Calculator,
    title: "Understanding Your Pay Stub",
    titleFr: "Comprendre votre talon de paie",
    items: [
      "Gross pay: your total earnings before deductions.",
      "CPP (Canada Pension Plan): mandatory contribution — 5.95% of insurable earnings up to the annual maximum.",
      "EI (Employment Insurance): mandatory deduction — 1.66% of insurable earnings (employee rate).",
      "Federal & provincial income tax: withheld based on your TD1 form elections.",
      "Net pay: what you actually receive after all statutory and voluntary deductions.",
    ],
  },
  {
    icon: TrendingUp,
    title: "RRSP vs. TFSA — Which to Use?",
    titleFr: "REER vs. CELI \u2014 lequel choisir?",
    items: [
      "RRSP: contributions are tax-deductible. Best when your current tax rate is higher than expected in retirement.",
      "TFSA: contributions are not deductible, but all growth and withdrawals are tax-free.",
      "Rule of thumb: RRSP if you earn above ~$50K; TFSA first if you earn less or expect higher future income.",
      "Employer RRSP matching is effectively free money — always contribute at least enough to get the full match.",
      "2024 RRSP contribution limit: 18% of prior year earned income, up to $31,560.",
    ],
  },
  {
    icon: DollarSign,
    title: "Employee Benefits — Key Terms",
    titleFr: "Avantages sociaux \u2014 termes cl\u00e9s",
    items: [
      "Premium: the monthly cost of your benefits plan (often split employer/employee).",
      "Deductible: the amount you pay out-of-pocket before insurance begins to cover costs.",
      "Co-pay / co-insurance: the percentage you pay after the deductible is met.",
      "Annual maximum: the cap on benefits paid per category per plan year.",
      "EAP (Employee Assistance Program): confidential counselling, legal, and financial support — typically 100% covered.",
    ],
  },
];

function FinancialLiteracy({ t }) {
  const [open, setOpen] = useState(null);
  return (
    <SectionCard icon={BookOpen}
      title={t("Financial Literacy Reference", "R\u00e9f\u00e9rence de litt\u00e9ratie financi\u00e8re")}
      subtitle={t("Plain-language explainers for employees on pay, benefits, and savings", "Explications simples sur la paie, les avantages et l'\u00e9pargne")}>
      <div className="space-y-3">
        {FIN_TOPICS.map((topic, i) => (
          <div key={i} className="rounded-xl border border-white/8 overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <topic.icon className="h-4 w-4 text-amber-400 shrink-0" />
                <span className="text-sm font-medium text-zinc-100">{t(topic.title, topic.titleFr)}</span>
              </div>
              {open === i ? <ChevronUp className="h-4 w-4 text-zinc-500" /> : <ChevronDown className="h-4 w-4 text-zinc-500" />}
            </button>
            {open === i && (
              <div className="px-5 pb-5">
                <ul className="space-y-2">
                  {topic.items.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-zinc-300">
                      <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                      <span>{item}</span>
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

// ── Tab wrappers + main page ──────────────────────────────────────────────────

function CalculatorsTab({ t }) {
  return (
    <div className="space-y-6">
      <SeveranceCalculator t={t} />
      <SalaryBandBuilder t={t} />
    </div>
  );
}

function EquityTab({ t }) {
  return (
    <div className="space-y-6">
      <PayEquityChecker t={t} />
      <TotalCompStatement t={t} />
    </div>
  );
}

const TABS = [
  { id: "calculators", icon: Calculator,  label: "Calculators",             labelFr: "Calculateurs"                  },
  { id: "equity",      icon: Scale,        label: "Pay Equity & Statements",  labelFr: "Équité salariale et états"    },
  { id: "literacy",    icon: BookOpen,     label: "Financial Literacy",       labelFr: "Littératie financière"         },
];

export default function Compensation() {
  const [activeTab, setActiveTab] = useState("calculators");
  const { t } = useLang();
  return (
    <div className="space-y-6 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-amber-400">
          {t("Ring 4", "Anneau 4")}
        </p>
        <h1 className="mt-1 text-2xl font-bold text-zinc-100">
          {t("Compensation & Financial Literacy", "R\u00e9mun\u00e9ration et litt\u00e9ratie financi\u00e8re")}
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {t(
            "Severance calculators, pay equity tools, salary bands, and financial literacy resources for Canadian workplaces.",
            "Calculateurs d\u2019indemnit\u00e9s, outils d\u2019\u00e9quit\u00e9 salariale, fourchettes et ressources de litt\u00e9ratie financi\u00e8re pour les milieux de travail canadiens."
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
      {activeTab === "calculators" && <CalculatorsTab t={t} />}
      {activeTab === "equity"      && <EquityTab t={t} />}
      {activeTab === "literacy"    && <FinancialLiteracy t={t} />}
    </div>
  );
}
