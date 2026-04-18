import { renderTemplate } from "../../lib/generator/index.js";
import { saveDocument, exportDocumentAsText } from "../../lib/documents.js";
import { useAuth } from "../../context/AuthContext.jsx";

function normalizeRenderedContent(result) {
  if (!result) return "Preview unavailable";
  if (typeof result === "string") return result;
  if (typeof result === "object" && typeof result.content === "string") return result.content;
  return "Preview unavailable";
}

export default function DocumentPreview({ template, data }) {
  const { user } = useAuth();

  if (!template) return null;

  let content = "";

  try {
    content = normalizeRenderedContent(renderTemplate(template, data));
  } catch (e) {
    content = "Preview unavailable";
  }

  const handleSave = async () => {
    try {
      await saveDocument({
        userId: user?.id,
        title: template,
        template,
        content,
        formData: data,
      });
      alert("Document saved successfully");
    } catch (e) {
      alert("Failed to save document");
    }
  };

  const handleExport = () => {
    exportDocumentAsText(template, content);
  };

  return (
    <div className="premium-card p-5 space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
            Live preview
          </div>
          <div className="mt-1 text-sm font-medium text-zinc-100">
            {template}
          </div>
        </div>

        <div className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
          Draft preview
        </div>
      </div>

      <div className="rounded-3xl border border-white/8 bg-[#0b0b0c] overflow-hidden">
        <div className="max-h-[720px] overflow-auto px-6 py-6">
          <div className="mx-auto max-w-[720px] bg-white px-6 py-8 text-[13px] leading-7 text-zinc-900">
            <pre className="whitespace-pre-wrap font-sans">
              {content}
            </pre>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={handleSave} className="gold-button px-4 py-2 text-sm">
          Save document
        </button>

        <button onClick={handleExport} className="ghost-button px-4 py-2 text-sm">
          Export as .txt
        </button>
      </div>
    </div>
  );
}
