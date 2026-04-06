import { useEffect, useState } from "react";
import { FileText, Save, FolderOpen } from "lucide-react";
import { supabase } from "../lib/supabase";
import { useAuth } from "../context/AuthContext.jsx";

export default function GeneratorPage() {
  const { user } = useAuth();

  const [content, setContent] = useState("");
  const [title, setTitle] = useState("New Document");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("");

  // 🔹 Load documents
  useEffect(() => {
    async function loadDocs() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setDocuments(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDocs();
  }, [user]);

  // 🔹 Save document
  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase.from("documents").insert({
        user_id: user.id,
        title,
        content,
      });

      if (error) throw error;

      setStatus("Saved successfully");
      setTimeout(() => setStatus(""), 2000);

      // reload
      const { data } = await supabase
        .from("documents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setDocuments(data || []);
    } catch (err) {
      console.error(err);
      setStatus("Save failed");
    }
  };

  // 🔹 Load existing doc
  const loadDoc = (doc) => {
    setTitle(doc.title);
    setContent(doc.content);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-semibold text-zinc-50">Document Generator</h1>
        <p className="text-zinc-400 mt-2">
          Create and save HR compliance documents tied to your account.
        </p>
      </div>

      {/* Editor */}
      <div className="premium-card p-6 space-y-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-lg bg-transparent text-zinc-100 outline-none border-b border-white/10 pb-2"
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your document..."
          className="w-full min-h-[300px] bg-transparent text-zinc-300 outline-none"
        />

        <div className="flex gap-3">
          <button onClick={handleSave} className="gold-button px-4 py-2 flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save
          </button>

          {status && (
            <div className="text-sm text-emerald-300 flex items-center">
              {status}
            </div>
          )}
        </div>
      </div>

      {/* Saved docs */}
      <div className="premium-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <FolderOpen className="w-5 h-5 text-zinc-400" />
          <h2 className="text-lg text-zinc-100">Saved documents</h2>
        </div>

        {loading ? (
          <div className="text-zinc-400 text-sm">Loading...</div>
        ) : documents.length === 0 ? (
          <div className="text-zinc-500 text-sm">No documents yet</div>
        ) : (
          <div className="space-y-2">
            {documents.map((doc) => (
              <div
                key={doc.id}
                onClick={() => loadDoc(doc)}
                className="cursor-pointer rounded-xl border border-white/5 px-4 py-3 hover:bg-white/5"
              >
                <div className="text-zinc-100 text-sm font-medium">{doc.title}</div>
                <div className="text-zinc-500 text-xs">
                  {new Date(doc.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}