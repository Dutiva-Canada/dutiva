// Renders a single question from the schema. Keeps styling consistent with
// the existing GeneratorPage.
import { QUESTION_TYPES } from "../../lib/generator/schema.js";

const baseInputStyle = {
  background: "var(--bg-elevated)",
  borderColor: "var(--border)",
  color: "var(--text)",
};

function Label({ question }) {
  return (
    <div className="mb-1.5">
      <label className="text-sm font-medium" style={{ color: "var(--text)" }}>
        {question.label}
        {question.required && <span className="ml-1 text-red-400">*</span>}
      </label>
      {question.help && (
        <div className="mt-1 text-xs" style={{ color: "var(--text-2)" }}>
          {question.help}
        </div>
      )}
    </div>
  );
}

export function QuestionField({ question, value, onChange }) {
  const commonProps = {
    value: value ?? "",
    onChange: (e) =>
      onChange(
        question.type === QUESTION_TYPES.BOOLEAN ? e.target.checked : e.target.value,
      ),
    className:
      "w-full rounded-xl border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400/40",
    style: baseInputStyle,
  };

  switch (question.type) {
    case QUESTION_TYPES.SELECT:
      return (
        <div>
          <Label question={question} />
          <select {...commonProps}>
            <option value="">— select —</option>
            {(question.options || []).map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

    case QUESTION_TYPES.BOOLEAN:
      return (
        <div>
          <Label question={question} />
          <label
            className="flex cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm"
            style={baseInputStyle}
          >
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => onChange(e.target.checked)}
              className="h-4 w-4 rounded border-gray-400"
            />
            <span style={{ color: "var(--text)" }}>
              {value === true ? "Yes" : "No"}
            </span>
          </label>
        </div>
      );

    case QUESTION_TYPES.DATE:
      return (
        <div>
          <Label question={question} />
          <input type="date" {...commonProps} />
        </div>
      );

    case QUESTION_TYPES.EMAIL:
      return (
        <div>
          <Label question={question} />
          <input type="email" placeholder="name@example.com" {...commonProps} />
        </div>
      );

    case QUESTION_TYPES.NUMBER:
      return (
        <div>
          <Label question={question} />
          <input type="number" {...commonProps} />
        </div>
      );

    case QUESTION_TYPES.MONEY:
      return (
        <div>
          <Label question={question} />
          <input type="text" inputMode="decimal" placeholder="$85,000" {...commonProps} />
        </div>
      );

    case QUESTION_TYPES.TEXTAREA:
      return (
        <div>
          <Label question={question} />
          <textarea rows={4} {...commonProps} />
        </div>
      );

    case QUESTION_TYPES.TEXT:
    default:
      return (
        <div>
          <Label question={question} />
          <input type="text" {...commonProps} />
        </div>
      );
  }
}

export default QuestionField;
