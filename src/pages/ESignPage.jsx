import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Briefcase, CheckCircle2, FileText, ShieldCheck, UserCheck } from "lucide-react";
import { supabase } from "../lib/supabase";
import SignaturePad from "../components/SignaturePad.jsx";

export default function ESignPage() {
  const { token } = useParams();
  const [sigRecord, setSigRecord] = useState(null);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signatureData, setSignatureData] = useState(null);
  const [signatureType, setSignatureType] = useState("drawn");
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

  const handleSignatureChange = useCallback((dataUrl, type = "drawn") => {
    setSignatureData(dataUrl);
    setSignatureType(type || "drawn");
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!signatureData || !sigRecord || !supabase) return;
    setSubmitting(true);
    try {
      const updatePayload = {
        signature_data: signatureData,
        status: "signed",
        signed_at: new Date().toISOString(),
      };
      // Include signature_type if the column exists (added in migration)
      if (signatureType) updatePayload.signature_type = signatureType;

      const { error } = await supabase
        .from("signatures")
        .update(updatePayload)
        .eq("token", token);

      if (error) throw error;
      setSigned(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit signature. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }, [signatureData, signatureType, sigRecord, token]);

  // ── Derived role flags ──────────────────────────────────────────────────────
  const isEmployer = sigRecord?.signer_role === "employer";
  const roleLabel = isEmployer ? "Employer Signature" : "Employee Signature";
  const roleIcon = isEmployer ? Briefcase : UserCheck;
  const RoleIcon = roleIcon;

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
    const successName = sigRecord?.signer_name;
    const successMsg = isEmployer
      ? successName
        ? `Thank you, ${successName}. The employer signature has been recorded on this document.`
        : "The employer signature has been recorded on this document."
      : successName
        ? `Thank you, ${successName}. Your signature has been recorded.`
        : "Your signature has been recorded successfully.";

    return (
      <div className="app-shell flex min-h-screen items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-8 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-[24px] bg-emerald-400/10 text-emerald-300">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div className="text-lg font-semibold text-zinc-100">
            {isEmployer ? "Employer signature recorded" : "Document signed"}
          </div>
          <div className="mt-2 text-sm text-zinc-400">{successMsg}</div>
          {isEmployer && (
            <div className="mt-4 rounded-2xl border border-amber-400/15 bg-amber-400/8 px-4 py-3 text-sm text-amber-300">
              This document now carries both the employee and employer signature. It is fully executed.
            </div>
          )}
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
        {/* Header */}
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            <ShieldCheck className="h-3.5 w-3.5" />
            {roleLabel}
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-50">
            {isEmployer
              ? sigRecord?.signer_name
                ? `${sigRecord.signer_name}, please sign as employer`
                : "Employer — please sign below"
              : sigRecord?.signer_name
                ? `${sigRecord.signer_name}, please sign below`
                : "Please sign below"}
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            {isEmployer
              ? "As the employer representative, review the document and add your signature to fully execute this agreement."
              : "Review the document and draw or type your signature to confirm your acceptance."}
          </p>
        </div>

        {/* Role badge */}
        {sigRecord && (
          <div className="flex items-center gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-3">
            <div className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-amber-400/10 text-amber-300">
              <RoleIcon className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="text-sm font-medium text-zinc-200">
                {isEmployer ? "Employer / Authorized Representative" : "Employee"}
              </div>
              <div className="text-xs text-zinc-500">{sigRecord.signer_name || "—"}</div>
            </div>
            <div className="ml-auto rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1 text-xs font-medium text-amber-300">
              Signing required
            </div>
          </div>
        )}

        {/* Document preview */}
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

        {/* Signature pad */}
        <section className="premium-card p-6">
          <h2 className="mb-1 text-lg font-semibold text-zinc-100">
            {isEmployer ? "Employer signature" : "Your signature"}
          </h2>
          <p className="mb-4 text-xs text-zinc-500">
            Draw or type — both are legally valid under Canadian provincial Electronic Transactions Acts.
          </p>
          <SignaturePad onSignatureChange={handleSignatureChange} />
          <div className="mt-5">
            <button
              onClick={handleSubmit}
              disabled={!signatureData || submitting}
              className="gold-button w-full px-4 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-40"
            >
              {submitting
                ? "Submitting..."
                : isEmployer
                  ? "Accept & Sign as Employer"
                  : "Accept & Sign"}
            </button>
          </div>
        </section>

        <p className="text-center text-xs text-zinc-500">
          By clicking "Accept & Sign" you agree that your electronic signature is legally binding
          under the applicable provincial or federal Electronic Transactions Act.
        </p>
      </div>
    </div>
  );
}
