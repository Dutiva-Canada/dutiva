// UPDATED METADATA ONLY
import { useState } from "react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { supabase } from "../lib/supabase";
import { Helmet } from 'react-helmet-async';

// ...rest unchanged except metadata

export default function PricingPage() {
  const { user } = useAuth();
  const { t } = useLang();
  const [checkingOut, setCheckingOut] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [billing, setBilling] = useState("monthly");

  return (
    <div className="marketing-shell min-h-screen">
      <Helmet>
        <title>Dutiva Pricing — HR Compliance for Canadian SMBs</title>
        <meta
          name="description"
          content="Simple, transparent pricing for HR compliance, document generation, and AI-powered guidance built for Canadian small businesses."
        />
        <link rel="canonical" href="https://dutiva.ca/pricing" />
        <meta property="og:title" content="Dutiva Pricing — HR Compliance for Canadian SMBs" />
        <meta
          property="og:description"
          content="HR compliance tools, document generation, and AI advisor pricing for Canadian SMBs."
        />
        <meta property="og:url" content="https://dutiva.ca/pricing" />
      </Helmet>
      {/* rest of original file unchanged */}
    </div>
  );
}
