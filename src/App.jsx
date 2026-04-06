import { BrowserRouter, Routes, Route } from "react-router-dom";

import MarketingLayout from "./layouts/MarketingLayout.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Templates from "./pages/Templates.jsx";
import Advisor from "./pages/Advisor.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import GeneratorPage from "./pages/GeneratorPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Route>

        <Route path="/app" element={<AppLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="templates" element={<Templates />} />
          <Route path="advisor" element={<Advisor />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="generator" element={<GeneratorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}