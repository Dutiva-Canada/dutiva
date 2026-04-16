import { Navigate } from "react-router-dom";
import { isOnboardingComplete } from "../lib/onboarding";

export default function RequireOnboarding({ children }) {
  if (!isOnboardingComplete()) {
    return <Navigate to="/app/onboarding" replace />;
  }

  return children;
}
