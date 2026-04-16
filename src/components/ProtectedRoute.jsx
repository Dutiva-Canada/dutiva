import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute() {
  const { authConfigured, user, loading } = useAuth();
  const location = useLocation();

  // In development, allow access if auth isn't configured
  if (!authConfigured && import.meta.env.DEV) {
    return <Outlet />;
  }

  // In production, fail closed if auth isn't configured
  if (!authConfigured && import.meta.env.PROD) {
    return (
      <div className="app-shell min-h-screen flex items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-6 text-center">
          <div className="text-lg font-semibold text-zinc-100">Authentication not configured</div>
          <div className="mt-2 text-sm text-zinc-400">
            This workspace is not yet configured for secure access.
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="app-shell min-h-screen flex items-center justify-center px-4">
        <div className="premium-card w-full max-w-md p-6 text-center">
          <div className="text-lg font-semibold text-zinc-100">Loading workspace...</div>
          <div className="mt-2 text-sm text-zinc-400">
            Checking your session and preparing your account.
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
