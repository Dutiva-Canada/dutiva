const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export function isAnalyticsEnabled() {
  return Boolean(GA_MEASUREMENT_ID);
}

export function getAnalyticsMeasurementId() {
  return GA_MEASUREMENT_ID;
}

export function ensureDataLayer() {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

export function initializeAnalytics() {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return;
  ensureDataLayer();
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, {
    send_page_view: false,
    anonymize_ip: true,
  });
}

export function trackPageView(path) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", "page_view", {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  });
}

export function trackEvent(eventName, params = {}) {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || !window.gtag) return;
  window.gtag("event", eventName, params);
}
