import { createContext, useContext, useEffect, useState } from "react";
import { buildMagicLinkRedirectUrl, isSupabaseConfigured, supabase } from "../lib/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const authConfigured = isSupabaseConfigured;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(() => {
      if (!mounted) return;
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, nextPath) => {
    if (!supabase) throw new Error("Authentication is not configured.");
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
    <AuthContext.Provider value={{ authConfigured, user, loading, signIn, signOut }}>
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
