import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import TemplatePicker from "../components/generator/TemplatePicker.jsx";
import GeneratorForm from "../components/generator/GeneratorForm.jsx";
import DocumentPreview from "../components/generator/DocumentPreview.jsx";

export default function GeneratorPage() {
  const [params] = useSearchParams();
  const template = params.get("template");

  const [formData, setFormData] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Generator
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Document builder
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-400">
          Choose a template to start generating your document.
        </p>
      </div>

      {!template && <TemplatePicker />}

      {template && (
        <div className="grid gap-6 lg:grid-cols-2">
          <GeneratorForm
            template={template}
            formData={formData}
            onChange={handleChange}
          />
          <DocumentPreview template={template} data={formData} />
        </div>
      )}
    </div>
  );
}
