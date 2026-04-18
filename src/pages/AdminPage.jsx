import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { isInternalAdminEmail } from "../lib/admin";
import { supabase } from "../lib/supabase";

export default function AdminPage() {
  const { user } = useAuth();
  const { plan, subscriptionStatus } = usePlan();
  const [targetPlan, setTargetPlan] = useState(plan || "free");
  const [targetStatus, setTargetStatus] = useState(subscriptionStatus || "inactive");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const isAdmin = isInternalAdminEmail(user?.email);

  if (!isAdmin) {
    return (
      <div className="premium-card p-6 text-sm text-zinc-400">
        Access restricted.
      </div>
    );
  }

  const handleSave = async () => {
    if (!user?.id || !supabase) return;
    setSaving(true);
    setMessage("");

    const { error } = await supabase
      .from("profiles")
      .update({ plan: targetPlan, subscription_status: targetStatus })
      .eq("id", user.id);

    if (error) {
      setMessage("Failed to update account settings.");
    } else {
      setMessage("Internal account settings updated.");
    }

    setSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
          Admin
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Internal admin panel
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-400">
          Manage your internal account state and test product behavior safely.
        </p>
      </div>

      <section className="premium-card p-6 space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.16em] text-zinc-500">Current account</div>
          <div className="mt-2 text-sm text-zinc-200">{user?.email || "Unknown user"}</div>
          <div className="mt-1 text-sm text-zinc-400">Plan: {plan} · Subscription: {subscriptionStatus}</div>
        </div>
      </section>

      <section className="premium-card p-6 space-y-4">
        <div className="text-sm font-semibold text-zinc-100">Plan controls</div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs text-zinc-400">Plan</label>
            <select
              value={targetPlan}
              onChange={(e) => setTargetPlan(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100"
            >
              <option value="free">Free</option>
              <option value="growth">Growth</option>
              <option value="pro">Pro</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs text-zinc-400">Subscription status</label>
            <select
              value={targetStatus}
              onChange={(e) => setTargetStatus(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100"
            >
              <option value="inactive">Inactive</option>
              <option value="trialing">Trialing</option>
              <option value="active">Active</option>
              <option value="past_due">Past due</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button onClick={handleSave} disabled={saving} className="gold-button px-4 py-2 text-sm disabled:opacity-40">
            {saving ? "Saving..." : "Save internal settings"}
          </button>

          <button
            onClick={() => {
              setTargetPlan("pro");
              setTargetStatus("active");
            }}
            className="ghost-button px-4 py-2 text-sm"
          >
            Grant myself Pro
          </button>

          <button
            onClick={() => {
              setTargetPlan("free");
              setTargetStatus("inactive");
            }}
            className="ghost-button px-4 py-2 text-sm"
          >
            Reset to Free
          </button>
        </div>

        {message && <div className="text-sm text-amber-300">{message}</div>}
      </section>

      <section className="premium-card p-6 space-y-4">
        <div className="text-sm font-semibold text-zinc-100">Quick internal tools</div>
        <div className="flex flex-wrap gap-3">
          <Link to="/app/generator" className="ghost-button px-4 py-2 text-sm">Open generator</Link>
          <Link to="/app/documents" className="ghost-button px-4 py-2 text-sm">Open documents</Link>
          <Link to="/pricing" className="ghost-button px-4 py-2 text-sm">Open pricing</Link>
          <Link to="/app/advisor" className="ghost-button px-4 py-2 text-sm">Open advisor</Link>
        </div>
      </section>
    </div>
  );
}
