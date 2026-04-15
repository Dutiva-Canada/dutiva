// Dutiva — Renders a single question based on its type.
// Intentionally minimal: the parent (IntakeWizard) owns layout and nav.

import { QUESTION_TYPES } from "../../lib/generator/schema.js";

export default function QuestionField({ question, value, onChange, error }) {
  const common = {
    id: `q_${question.id}`,
    className:
      "w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-400/40",
    style: { background: "var(--bg-elevated)", borderColor: error ? "#f87171" : "var(--border)", color: "var(--text)" },
  };

  const onText = (e) => onChange(e.target.value);

  let control;
  switch (question.type) {
    case QUESTION_TYPES.TEXTAREA:
      control = (
        <textarea
          {...common}
          rows={4}
          value={value ?? ""}
          onChange={onText}
        />
      );
      break;
    case QUESTION_TYPES.NUMBER:
      control = (
        <input {...common} type="number" inputMode="decimal" value={value ?? ""} onChange={onText} />
      );
      break;
    case QUESTION_TYPES.MONEY:
      control = (
        <input {...common} type="text" placeholder="$0" value={value ?? ""} onChange={onText} />
      );
      break;
    case QUESTION_TYPES.DATE:
      control = (
        <input {...common} type="date" value={value ?? ""} onChange={onText} />
      );
      break;
    case QUESTION_TYPES.EMAIL:
      control = (
        <input {...common} type="email" value={value ?? ""} onChange={onText} />
      );
      break;
    case QUESTION_TYPES.SELECT:
      control = (
        <select {...common} value={value ?? ""} onChange={onText}>
          <option value="" disabled>
            Select…
          </option>
          {(question.options || []).map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      );
      break;
    case QUESTION_TYPES.BOOLEAN:
      control = (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange(true)}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              value === true ? "border-amber-400/60 bg-amber-400/10 text-amber-200" : ""
            }`}
            style={{
              background: value === true ? undefined : "var(--bg-elevated)",
              borderColor: value === true ? undefined : "var(--border)",
              color: value === true ? undefined : "var(--text)",
            }}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => onChange(false)}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              value === false ? "border-amber-400/60 bg-amber-400/10 text-amber-200" : ""
            }`}
            style={{
              background: value === false ? undefined : "var(--bg-elevated)",
              borderColor: value === false ? undefined : "var(--border)",
              color: value === false ? undefined : "var(--text)",
            }}
          >
            No
          </button>
        </div>
      );
      break;
    case QUESTION_TYPES.TEXT:
    default:
      control = (
        <input {...common} type="text" value={value ?? ""} onChange={onText} />
      );
      break;
  }

  return (
    <div className="space-y-2">
      <label htmlFor={common.id} className="block text-sm font-medium" style={{ color: "var(--text)" }}>
        {question.label}
        {question.required ? <span className="ml-1 text-red-400">*</span> : null}
      </label>
      {question.help && (
        <p className="text-xs" style={{ color: "var(--text-2)" }}>
          {question.help}
        </p>
      )}
      {control}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}
