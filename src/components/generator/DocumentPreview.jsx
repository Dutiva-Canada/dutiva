import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { renderTemplate } from "../../lib/generator/index.js";
import { saveDocument, exportDocumentAsText } from "../../lib/documents.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { usePlan } from "../../context/PlanContext.jsx";
import { supabase } from "../../lib/supabase.js";

const FREE_DOCUMENT_LIMIT = 5;

function normalizeRenderedContent(result) {
  if (!result) return "Preview unavailable";
  if (typeof result === "string") return result;
  if (typeof result === "object" && typeof result.content === "string") return result.content;
  return "Preview unavailable";
}

export default function DocumentPreview({ template, data }) {
  const { user } = useAuth();
  const { plan } = usePlan();
  const [documentCount, setDocumentCount] = useState(0);

  useEffect(() => {
    async function loadCount() {
      if (!supabase || !user?.id) return;
      const { count } = await supabase
        .from("documents")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id);
      setDocumentCount(count || 0);
    }

    loadCount();
  }, [user]);

  if (!template) return null;

  let content = "";

  try {
    content = normalizeRenderedContent(renderTemplate(template, data));
  } catch (e) {
    content = "Preview unavailable";
  }

  const atLimit = plan === "free" && documentCount >= FREE_DOCUMENT_LIMIT;
  const approachingLimit = plan === "free" && documentCount >= 2;

  const handleSave = async () => {
    if (atLimit) return;

    try {
      await saveDocument({
        userId: user?.id,
        title: template,
        template,
        content,
        formData: data,
      });
      alert("Document saved successfully");
      setDocumentCount((prev) => prev + 1);
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

      {plan === "free" && (
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/8 p-4">
          <div className="text-sm font-medium text-amber-300">
            Free plan usage: {documentCount}/{FREE_DOCUMENT_LIMIT} saved documents
          </div>
          <div className="mt-1 text-xs text-zinc-400">
            {atLimit
              ? "You’ve reached your free document limit. Upgrade to continue saving new drafts."
              : approachingLimit
                ? "You’re approaching your free limit. Most teams upgrade after 2–3 documents."
                : "You can save up to 5 documents on the free plan."}
          </div>
        </div>
      )}

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
        {atLimit ? (
          <Link to="/pricing" className="gold-button px-4 py-2 text-sm">
            Upgrade to save more
          </Link>
        ) : (
          <button onClick={handleSave} className="gold-button px-4 py-2 text-sm">
            Save document
          </button>
        )}

        <button onClick={handleExport} className="ghost-button px-4 py-2 text-sm">
          Export as .txt
        </button>
      </div>
    </div>
  );
}
