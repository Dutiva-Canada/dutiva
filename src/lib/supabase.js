import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY;

const DEFAULT_AUTH_REDIRECT_PATH = "/app";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);

export function sanitizeAppPath(pathname) {
  if (typeof pathname !== "string") {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }

  const trimmed = pathname.trim();
  if (!trimmed.startsWith("/") || trimmed.startsWith("//")) {
    return DEFAULT_AUTH_REDIRECT_PATH;
  }

  return trimmed;
}

export function buildMagicLinkRedirectUrl(nextPath = DEFAULT_AUTH_REDIRECT_PATH) {
  if (typeof window === "undefined" || !window.location?.origin) {
    return undefined;
  }

  const safeNextPath = sanitizeAppPath(nextPath);
  return `${window.location.origin}/auth?next=${encodeURIComponent(safeNextPath)}`;
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
