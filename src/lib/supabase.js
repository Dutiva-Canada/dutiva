import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;
const configuredSiteUrl = import.meta.env.VITE_SITE_URL;
const configuredAuthRedirectUrl = import.meta.env.VITE_AUTH_REDIRECT_URL;

const DEFAULT_AUTH_REDIRECT_PATH = "/app";
const SAFE_APP_ORIGIN = "https://dutiva.local";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

function containsControlCharacters(value) {
  return Array.from(value).some((char) => {
    const code = char.charCodeAt(0);
    return code < 32 || code === 127;
  });
}

function buildCanonicalOrigin(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  try {
    const url = new URL(value.trim());
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    url.pathname = "";
    url.search = "";
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

function buildCanonicalUrl(value) {
  if (typeof value !== "string" || value.trim().length === 0) {
    return null;
  }

  try {
    const url = new URL(value.trim());
    if (!["http:", "https:"].includes(url.protocol)) {
      return null;
    }

    url.hash = "";
    return url;
  } catch {
    return null;
  }
}

export function sanitizeAppPath(pathname) {
  if (typeof pathname !== "string") {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }

  const trimmed = pathname.trim();
  if (
    trimmed.length === 0 ||
    trimmed.includes("\\") ||
    trimmed.startsWith("//") ||
    containsControlCharacters(trimmed)
  ) {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }

  try {
    const candidate = new URL(trimmed, SAFE_APP_ORIGIN);
    if (candidate.origin !== SAFE_APP_ORIGIN || !candidate.pathname.startsWith("/")) {
      return DEFAULT_AUTH_REDIRECT_PATH;
    }

    return `${candidate.pathname}${candidate.search}${candidate.hash}` || DEFAULT_AUTH_REDIRECT_PATH;
  } catch {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }
}

function getPreferredAppOrigin() {
  const explicitOrigin = buildCanonicalOrigin(configuredSiteUrl);
  if (explicitOrigin) {
    return explicitOrigin;
  }

  if (typeof window === "undefined" || !window.location?.origin) {
    return null;
  }

  return buildCanonicalOrigin(window.location.origin);
}

export function buildMagicLinkRedirectUrl(nextPath = DEFAULT_AUTH_REDIRECT_PATH) {
  const safeNextPath = sanitizeAppPath(nextPath);
  const explicitRedirect = buildCanonicalUrl(configuredAuthRedirectUrl);

  if (explicitRedirect) {
    explicitRedirect.searchParams.set("next", safeNextPath);
    return explicitRedirect.toString();
  }

  const appOrigin = getPreferredAppOrigin();
  if (!appOrigin) {
    return undefined;
  }

  const redirectUrl = new URL("/auth", appOrigin);
  redirectUrl.searchParams.set("next", safeNextPath);
  return redirectUrl.toString();
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      },
    })
  : null;
