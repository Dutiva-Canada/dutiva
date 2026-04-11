import { createContext, useContext, useEffect, useState } from "react";
import { buildMagicLinkRedirectUrl, isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

const ALLOWED_EMAILS = ['martin.constantineau@dutiva.ca'];

export function AuthProvider({ children }) {
  const authConfigured = isSupabaseConfigured;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  const enforceWhitelist = async (u) => {
    if (!u) return;
    if (!ALLOWED_EMAILS.includes(u.email.toLowerCase())) {
      await supabase.auth.signOut();
      setUser(null);
      setAuthError("Access is currently by invitation only. Contact hello@dutiva.ca to request access.");
    }
  };

  useEffect(() => {
    let mounted = true;

    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) enforceWhitelist(u);
    }).catch(() => {
      if (!mounted) return;
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      setLoading(false);
      if (u) enforceWhitelist(u);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, nextPath) => {
    if (!supabase) throw new Error("Authentication is not configured.");
    if (!ALLOWED_EMAILS.includes(email.trim().toLowerCase())) {
      throw new Error("Access is currently by invitation only. Contact hello@dutiva.ca to request access.");
    }
    const emailRedirectTo = buildMagicLinkRedirectUrl(nextPath);
    const { error } = await supabase.auth.signInWithOtp(
      emailRedirectTo
        ? {
            email,
            options: {
              emailRedirectTo,
            },
          }
        : { email },
    );
    if (error) throw error;
  };

  const signOut = async () => {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  return (
    <AuthContext.Provider value={{ authConfigured, user, loading, authError, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

// This hook intentionally lives beside the provider for a tiny context module.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
