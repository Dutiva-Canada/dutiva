import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle2, FileText, ShieldCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import SignaturePad from "../components/SignaturePad.jsx";

export default function ESignPage() {
  const { token } = useParams();
  const [sigRecord, setSigRecord] = useState(null);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    async function load() {
      if (!supabase) {
        setError("Service not configured.");
        setLoading(false);
        return;
      }

      try {
        const { data: sig, error: sigError } = await supabase
          .from("signatures")
          .select("*")
          .eq("token", token)
          .maybeSingle();

        if (sigError) throw sigError;
        if (!sig) {
          setError("Signing link not found or has expired.");
          setLoading(false);
          return;
        }

        setSigRecord(sig);

        if (sig.status === "signed") {
          setSigned(true);
          setLoading(false);
          return;
        }

        if (sig.document_id) {
          const { data: doc, error: docError } = await supabase
            .from("documents")
            .select("title, content")
            .eq("id", sig.document_id)
            .maybeSingle();

          if (docError) throw docError;
          setDocument(doc);
        }
      } catch (err) {
        setError("Failed to load document. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [token]);

  const handleSubmit = useCallback(async () => {
    if (!signatureData || !sigRecord || !supabase) return;

    setSubmitting(true);
    try {
      const { error } = await supabase
        .from("signatures")
        .update({
          signature_data: signatureData,
          status: "signed",
          signed_at: new Date().toISOString(),
        })
        .eq("token", token);

      if (error) throw error;
      setSigned(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit signature. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [signatureData, sigRecord, token]);

  if (loading) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-8 text-center">
          <div className="text-lg font-semibold text-zinc-100">Loading document...</div>
          <div className="mt-2 text-sm text-zinc-400">Please wait while we prepare your signing request.</div>
        </div>
      </div>
    );
  }

  if (error && !signed) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-8 text-center">
          <div className="text-lg font-semibold text-zinc-100">Unable to load</div>
          <div className="mt-2 text-sm text-zinc-400">{error}</div>
        </div>
      </div>
    );
  }

  if (signed) {
    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[24px] bg-emerald-400/10 text-emerald-300">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="text-lg font-semibold text-zinc-100">Document signed</div>
          <div className="mt-2 text-sm text-zinc-400">
            {sigRecord?.signer_name
              ? `Thank you, ${sigRecord.signer_name}. Your signature has been recorded.`
              : "Your signature has been recorded successfully."}
          </div>
          <div className="mt-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3 text-sm text-zinc-400">
            You may close this window.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-shell min-h-screen px-4 py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            E-Signature
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            {sigRecord?.signer_name
              ? `${sigRecord.signer_name}, please sign below`
              : "Please sign below"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Review the document and draw your signature to confirm.
          </p>
        </div>

        {document && (
          <section className="premium-card p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-amber-400/10 text-amber-300">
                <FileText className="h-5 w-5" />
              </div>
              <div className="text-base font-semibold text-zinc-100">{document.title}</div>
            </div>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-sm leading-7 text-zinc-300">
              {document.content}
            </pre>
          </section>
        )}

        <section className="premium-card p-6">
          <h2 className="mb-4 text-lg font-semibold text-zinc-100">Your signature</h2>
          <SignaturePad onSignatureChange={setSignatureData} />
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              disabled={!signatureData || submitting}
              className="gold-button w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting ? "Submitting..." : "Accept & Sign"}
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-zinc-500">
          By clicking "Accept & Sign" you agree that your electronic signature is legally binding.
        </p>
      </div>
    </div>
  );
}
