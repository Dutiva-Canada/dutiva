import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getAnalyticsMeasurementId,
  initializeAnalytics,
  isAnalyticsEnabled,
  trackPageView,
} from "../lib/analytics";

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;

    const id = getAnalyticsMeasurementId();

    if (!document.getElementById("ga-script")) {
      const script = document.createElement("script");
      script.id = "ga-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      document.head.appendChild(script);
    }

    initializeAnalytics();
  }, []);

  useEffect(() => {
    if (!isAnalyticsEnabled()) return;
    trackPageView(location.pathname);
  }, [location]);

  return null;
}
