import { TEMPLATE_META } from "../../lib/generatorSchema.js";

function labelize(field) {
  return field
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}

export default function GeneratorForm({ template, formData, onChange }) {
  const meta = TEMPLATE_META[template];

  if (!meta) return null;

  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const renderField = (field) => {
    const isLong = field === "notes" || field === "scopeOfWork" || field === "performanceGoals";

    return (
      <div key={field} className="space-y-1">
        <label className="text-xs text-zinc-400">{labelize(field)}</label>
        {isLong ? (
          <textarea
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            rows={4}
            className="w-full rounded bg-black/30 border border-white/10 p-2 text-sm text-zinc-100"
          />
        ) : (
          <input
            value={formData[field] || ""}
            onChange={(e) => handleChange(field, e.target.value)}
            className="w-full rounded bg-black/30 border border-white/10 p-2 text-sm text-zinc-100"
          />
        )}
      </div>
    );
  };

  return (
    <div className="premium-card p-5 space-y-4">
      <div className="text-sm text-zinc-400">{meta.hint}</div>
      <div className="grid gap-3 md:grid-cols-2">
        {meta.fields.map(renderField)}
      </div>
    </div>
  );
}
