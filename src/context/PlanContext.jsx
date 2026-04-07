import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext.jsx";
import { supabase } from "../lib/supabase";

const PlanContext = createContext({ plan: "free", subscriptionStatus: "inactive", loading: true });

export function PlanProvider({ children }) {
  const { user } = useAuth();
  const [plan, setPlan] = useState("free");
  const [subscriptionStatus, setSubscriptionStatus] = useState("inactive");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlan() {
      if (!user || !supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data } = await supabase
          .from("profiles")
          .select("plan, subscription_status")
          .eq("id", user.id)
          .maybeSingle();
        if (data) {
          setPlan(data.plan ?? "free");
          setSubscriptionStatus(data.subscription_status ?? "inactive");
        }
      } catch {
        // keep defaults
      } finally {
        setLoading(false);
      }
    }
    loadPlan();
  }, [user]);

  return (
    <PlanContext.Provider value={{ plan, subscriptionStatus, loading }}>
      {children}
    </PlanContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePlan() {
  return useContext(PlanContext);
}
