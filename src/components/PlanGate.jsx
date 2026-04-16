import { usePlan } from "../context/PlanContext.jsx";
import { Link } from "react-router-dom";

export default function PlanGate({ required = "free", children }) {
  const { plan } = usePlan();

  const hierarchy = ["free", "growth", "pro"];

  const hasAccess = hierarchy.indexOf(plan) >= hierarchy.indexOf(required);

  if (hasAccess) return children;

  return (
    <div className="premium-card p-6 text-center">
      <h3 className="text-lg text-zinc-100 font-semibold mb-2">
        Upgrade required
      </h3>
      <p className="text-sm text-zinc-400 mb-4">
        This feature is available on higher plans.
      </p>
      <Link to="/pricing" className="gold-button px-4 py-2 text-sm">
        View pricing
      </Link>
    </div>
  );
}
