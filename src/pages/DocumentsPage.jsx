import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { supabase } from "../lib/supabase";

export default function DocumentsPage() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDocuments() {
      if (!supabase || !user?.id) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("documents")
        .select("id, title, template, content, created_at")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        setError("Failed to load documents.");
      } else {
        setDocuments(data || []);
      }

      setLoading(false);
    }

    loadDocuments();
  }, [user]);

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Documents
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          My documents
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-400">
          Review saved drafts and reopen them when needed.
        </p>
      </div>

      {loading && <div className="text-sm text-zinc-400">Loading documents...</div>}
      {error && <div className="text-sm text-red-400">{error}</div>}

      {!loading && !error && documents.length === 0 && (
        <div className="premium-card p-6 text-sm text-zinc-400">
          No documents saved yet. <Link to="/app/generator" className="text-amber-300">Create your first one</Link>.
        </div>
      )}

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div key={doc.id} className="premium-card p-5 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-semibold text-zinc-100">{doc.title}</div>
                <div className="text-xs text-zinc-500 mt-1">
                  {doc.template} · {new Date(doc.created_at).toLocaleString()}
                </div>
              </div>
              <Link
                to={`/app/generator?template=${encodeURIComponent(doc.template)}`}
                className="ghost-button px-3 py-2 text-xs"
              >
                Reopen
              </Link>
            </div>

            <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
              <pre className="whitespace-pre-wrap text-xs text-zinc-300 max-h-48 overflow-auto">
                {doc.content}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
