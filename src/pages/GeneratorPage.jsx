// PATCHED: key additions only (aha moment + onboarding + tracking)
// NOTE: inserting minimal safe additions

// 1. IMPORTS ADD
import { setOnboardingProgress } from "../lib/onboarding";
import { trackEvent } from "../lib/analytics";

// 2. INSIDE handleSave (after successful save, before return)
// ADD THIS BLOCK:
// mark onboarding complete + track
try {
  setOnboardingProgress({ firstDocumentGenerated: true });
  trackEvent("generated_document", { template });
} catch {}

// 3. ADD AHA MOMENT UI UNDER PREVIEW (inside Preview SectionCard, before <pre>)

{/* AHA MOMENT */}
<div className="mb-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/8 p-4">
  <div className="text-sm text-emerald-300 font-medium">
    ✅ This document is compliant for your selected province
  </div>
  <div className="text-xs text-zinc-400 mt-1">
    You just reduced legal risk for your business.
  </div>
</div>

// 4. ADD NEXT ACTIONS BELOW PREVIEW

<div className="mt-6 space-y-2">
  <div className="text-sm text-zinc-400">What do you want to do next?</div>
  <div className="grid gap-2">
    <Link to="/app/generator" className="premium-card p-3">
      Generate another document
    </Link>
    <Link to="/app/advisor" className="premium-card p-3">
      Ask a compliance question
    </Link>
    <Link to="/app/rings" className="premium-card p-3">
      Explore all compliance tools
    </Link>
  </div>
</div>
