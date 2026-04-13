import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

const MarketingLayout   = lazy(() => import("./layouts/MarketingLayout.jsx"));
const AppLayout         = lazy(() => import("./layouts/AppLayout.jsx"));
const LandingPage       = lazy(() => import("./pages/LandingPage.jsx"));
const PricingPage       = lazy(() => import("./pages/PricingPage.jsx"));
const Dashboard         = lazy(() => import("./pages/Dashboard.jsx"));
const Templates         = lazy(() => import("./pages/Templates.jsx"));
const Advisor           = lazy(() => import("./pages/Advisor.jsx"));
const SettingsPage      = lazy(() => import("./pages/SettingsPage.jsx"));
const GeneratorPage     = lazy(() => import("./pages/GeneratorPage.jsx"));
const AuthPage          = lazy(() => import("./pages/AuthPage.jsx"));
const ESignPage         = lazy(() => import("./pages/ESignPage.jsx"));
const PaymentSuccessPage = lazy(() => import("./pages/PaymentSuccessPage.jsx"));
const PrivacyPage       = lazy(() => import("./pages/PrivacyPage.jsx"));
const TermsPage         = lazy(() => import("./pages/TermsPage.jsx"));
const DisclaimerPage    = lazy(() => import("./pages/DisclaimerPage.jsx"));
const AccessibilityPage = lazy(() => import("./pages/AccessibilityPage.jsx"));
const AITechPage        = lazy(() => import("./pages/AITechPage.jsx"));
const CookiesPage       = lazy(() => import("./pages/CookiesPage.jsx"));
const BetaPage          = lazy(() => import("./pages/BetaPage.jsx"));
const WellnessPage       = lazy(() => import("./pages/Wellness.jsx"));
const CommunicationsPage = lazy(() => import("./pages/Communications.jsx"));
const CompensationPage   = lazy(() => import("./pages/Compensation.jsx"));
const RingsHub           = lazy(() => import("./pages/RingsHub.jsx"));

function RouteLoader() {
  return (
    <div className="app-shell min-h-screen flex items-center justify-center px-4">
      <div className="premium-card w-full max-w-md p-6 text-center">
        <div className="text-lg font-semibold text-zinc-100">Loading workspace...</div>
        <div className="mt-2 text-sm text-zinc-400">Preparing the next screen.</div>
      </div>
    </div>
  );
}

function withSuspense(element) {
  return <Suspense fallback={<RouteLoader />}>{element}</Suspense>;
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={withSuspense(<MarketingLayout />)}>
              <Route index element={withSuspense(<LandingPage />)} />
              <Route path="/pricing" element={withSuspense(<PricingPage />)} />
              <Route path="/beta" element={withSuspense(<BetaPage />)} />
              <Route path="/payment-success" element={withSuspense(<PaymentSuccessPage />)} />
                            <Route path="/privacy"       element={withSuspense(<PrivacyPage />)} />
                                          <Route path="/terms"         element={withSuspense(<TermsPage />)} />
                                                        <Route path="/disclaimer"    element={withSuspense(<DisclaimerPage />)} />
                                                                      <Route path="/accessibility" element={withSuspense(<AccessibilityPage />)} />
                                                                                    <Route path="/ai-technology" element={withSuspense(<AITechPage />)} />
                                                                                                  <Route path="/cookies"       element={withSuspense(<CookiesPage />)} />
            </Route>

            <Route path="/auth" element={withSuspense(<AuthPage />)} />
            <Route path="/sign/:token" element={withSuspense(<ESignPage />)} />

            <Route element={<ProtectedRoute />}>
              <Route path="/app" element={withSuspense(<AppLayout />)}>
                <Route index element={withSuspense(<Dashboard />)} />
                <Route path="templates" element={withSuspense(<Templates />)} />
                <Route path="advisor" element={withSuspense(<Advisor />)} />
                <Route path="settings" element={withSuspense(<SettingsPage />)} />
                <Route path="generator" element={withSuspense(<GeneratorPage />)} />
                <Route path="wellness"       element={withSuspense(<WellnessPage />)} />
                <Route path="communications" element={withSuspense(<CommunicationsPage />)} />
                <Route path="compensation"   element={withSuspense(<CompensationPage />)} />
                <Route path="rings"         element={withSuspense(<RingsHub />)} />
                <Route path="*" element={<Navigate to="/app" replace />} />
              </Route>
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
}
