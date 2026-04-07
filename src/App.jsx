import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const MarketingLayout = lazy(() => import("./layouts/MarketingLayout.jsx"));
const AppLayout = lazy(() => import("./layouts/AppLayout.jsx"));
const LandingPage = lazy(() => import("./pages/LandingPage.jsx"));
const PricingPage = lazy(() => import("./pages/PricingPage.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const Templates = lazy(() => import("./pages/Templates.jsx"));
const Advisor = lazy(() => import("./pages/Advisor.jsx"));
const SettingsPage = lazy(() => import("./pages/SettingsPage.jsx"));
const GeneratorPage = lazy(() => import("./pages/GeneratorPage.jsx"));
const AuthPage = lazy(() => import("./pages/AuthPage.jsx"));

function RouteLoader() {
  return (
    <div className="app-shell min-h-screen flex items-center justify-center px-4">
      <div className="premium-card w-full max-w-md p-6 text-center">
        <div className="text-lg font-semibold text-zinc-100">Loading workspace...</div>
        <div className="mt-2 text-sm text-zinc-400">
          Preparing the next screen.
        </div>
      </div>
    </div>
  );
}

function withSuspense(element) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={withSuspense(<MarketingLayout />)}>
          <Route path="/" element={withSuspense(<LandingPage />)} />
          <Route path="/pricing" element={withSuspense(<PricingPage />)} />
        </Route>

        <Route path="/auth" element={withSuspense(<AuthPage />)} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={withSuspense(<AppLayout />)}>
            <Route index element={withSuspense(<Dashboard />)} />
            <Route path="templates" element={withSuspense(<Templates />)} />
            <Route path="advisor" element={withSuspense(<Advisor />)} />
            <Route path="settings" element={withSuspense(<SettingsPage />)} />
            <Route path="generator" element={withSuspense(<GeneratorPage />)} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
