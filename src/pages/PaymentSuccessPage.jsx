import { CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

export default function PaymentSuccessPage() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") ?? "growth";
  const planLabel = plan === "advanced" ? "Advanced" : "Growth";

  return (
    <div className="marketing-shell flex min-h-screen items-center justify-center px-4">
      <div className="premium-card w-full max-w-md p-10 text-center">
        <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-[24px] bg-emerald-400/10 text-emerald-300">
          <CheckCircle2 className="h-8 w-8" />
        </div>
        <div className="text-2xl font-semibold tracking-tight text-zinc-50">
          Welcome to {planLabel}
        </div>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Your subscription is now active. Your workspace has been upgraded.
        </p>
        <div className="mt-8 space-y-3">
          <Link to="/app" className="gold-button block w-full px-4 py-3 text-sm text-center">
            Go to dashboard
          </Link>
          <Link to="/app/generator" className="ghost-button block w-full px-4 py-3 text-sm text-center">
            Generate a document
          </Link>
        </div>
      </div>
    </div>
  );
}
