import { useState } from "react";
import { TEMPLATE_META } from "../../lib/generatorSchema.js";

export default function GeneratorForm({ template }) {
  const meta = TEMPLATE_META[template];
  const [formData, setFormData] = useState({});

  if (!meta) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderField = (field) => {
    return (
      <div key={field} className="space-y-1">
        <label className="text-xs text-zinc-400">{field}</label>
        <input
          value={formData[field] || ""}
          onChange={(e) => handleChange(field, e.target.value)}
          className="w-full p-2 rounded bg-black/30 border border-white/10 text-sm text-zinc-100"
        />
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
