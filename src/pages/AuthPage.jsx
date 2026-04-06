import { useState } from "react";
import { Mail, ShieldCheck, Sparkles } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {
  const { signIn, loading, user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      setSubmitting(true);
      setStatus("");
      await signIn(email.trim());
      setStatus("Magic link sent. Check your email to sign in.");
    } catch (error) {
      setStatus(error.message || "Unable to send magic link.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="marketing-shell min-h-screen px-4 py-10 md:px-6">
      <div className="mx-auto grid min-h-[80vh] max-w-6xl gap-8 xl:grid-cols-[1.05fr_0.95fr] xl:items-center">
        <div className="space-y-6">
          <div className="inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Secure workspace access
          </div>

          <div className="space-y-4">
            <h1 className="metric-value text-5xl font-semibold tracking-tight text-zinc-50 md:text-6xl">
              Sign in to Dutiva
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">
              Access your HR compliance workspace, saved drafts, company profile, and advisor flow with a secure magic link.
            </p>
          </div>

          <div className="grid gap-3 text-sm text-zinc-300">
            <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 text-emerald-300" />
              <div>
                <div className="font-medium text-zinc-100">Protected workspace</div>
                <div className="mt-1 text-zinc-400">Your settings and drafts can now be tied to your own account.</div>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
              <Sparkles className="mt-0.5 h-5 w-5 text-amber-300" />
              <div>
                <div className="font-medium text-zinc-100">Premium workflow</div>
                <div className="mt-1 text-zinc-400">Move from static preview into a real SaaS foundation with user-aware persistence.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="premium-card p-6 md:p-8">
          <div className="mb-6">
            <div className="text-2xl font-semibold text-zinc-100">Welcome back</div>
            <div className="mt-2 text-sm text-zinc-400">
              Enter your email and we’ll send you a secure sign-in link.
            </div>
          </div>

          {user ? (
            <div className="space-y-4">
              <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 px-4 py-4 text-sm text-emerald-300">
                Signed in as {user.email}
              </div>
              <button onClick={signOut} className="ghost-button w-full px-4 py-3 text-sm">
                Sign out
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-zinc-300">Email address</label>
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
                  <Mail className="h-4 w-4 text-zinc-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting || loading}
                className="gold-button w-full px-4 py-3 text-sm disabled:opacity-60"
              >
                {submitting ? "Sending magic link..." : "Send magic link"}
              </button>
            </form>
          )}

          {status ? (
            <div className="mt-4 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4 text-sm text-zinc-300">
              {status}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
