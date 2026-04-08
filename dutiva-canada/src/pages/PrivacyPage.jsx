import { useEffect } from "react";
import { Link } from "react-router-dom";

const GOLD = "#c49a45";
const GOLD_BORDER = "rgba(196,154,69,0.30)";
const BG = "#111111";
const TEXT = "#f0ece4";
const TEXT_MID = "#a09880";
const TEXT_SOFT = "#6b6660";
const BORDER = "rgba(255,255,255,0.08)";
const CARD = "#191919";

const LAST_UPDATED = "April 8, 2026";

export default function PrivacyPage() {
  useEffect(() => {
    document.title = "Privacy Policy | Dutiva Canada";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", lineHeight: 1.7 }}>
      <PolicyNav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>Privacy Policy</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED} · Effective: {LAST_UPDATED}</p>
        </div>

        <div style={{ backgroundColor: CARD, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: TEXT_MID }}>
          Dutiva Canada Inc. is committed to protecting your privacy. This Policy explains how we collect, use, disclose, and safeguard your personal information in compliance with the <strong style={{ color: TEXT }}>Personal Information Protection and Electronic Documents Act (PIPEDA)</strong> and, where applicable, <strong style={{ color: TEXT }}>Quebec's Act respecting the protection of personal information in the private sector (Law 25 / Bill 64)</strong>.
        </div>

        <PolicySection title="1. Who We Are">
          <p>Dutiva Canada Inc. ("Dutiva Canada," "we," "us," or "our") is a federally incorporated Canadian company providing HR compliance software to Canadian businesses. We are the "organization" responsible for personal information under PIPEDA.</p>
          <p>Privacy inquiries may be directed to our Privacy Officer at <a href="mailto:privacy@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>privacy@dutiva.ca</a>.</p>
        </PolicySection>

        <PolicySection title="2. Information We Collect">
          <p><strong style={{ color: TEXT }}>Account Information:</strong> Name, email address, province/territory, and business name when you register.</p>
          <p><strong style={{ color: TEXT }}>Usage Data:</strong> Log data, IP addresses, browser type, pages visited, features used, and timestamps, collected automatically via our infrastructure.</p>
          <p><strong style={{ color: TEXT }}>AI Advisor Conversations:</strong> Messages you submit to the AI advisor feature are transmitted to our AI processing infrastructure. See Section 7 for details.</p>
          <p><strong style={{ color: TEXT }}>Payment Data:</strong> Payment transactions are processed by Stripe Inc. We do not store full credit card numbers or banking credentials on our systems.</p>
          <p><strong style={{ color: TEXT }}>Documents You Generate:</strong> HR documents you create using our templates are associated with your account for export and history purposes.</p>
        </PolicySection>

        <PolicySection title="3. How We Use Your Information">
          <ul>
            <PolicyLi>To provide, operate, and improve the Service</PolicyLi>
            <PolicyLi>To authenticate your identity and manage your account</PolicyLi>
            <PolicyLi>To process your subscription and payments</PolicyLi>
            <PolicyLi>To send transactional communications (account confirmations, receipts, service updates)</PolicyLi>
            <PolicyLi>To analyze aggregate usage patterns and improve product features (using anonymized/aggregated data)</PolicyLi>
            <PolicyLi>To comply with legal obligations under applicable Canadian law</PolicyLi>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</p>
        </PolicySection>

        <PolicySection title="4. Disclosure to Third Parties">
          <p>We share your information only with trusted service providers necessary to operate the Service, each subject to contractual privacy and security obligations:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Supabase Inc.</strong> — Database and authentication infrastructure. Data may be hosted in regions including Canada and the United States.</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Hugging Face, Inc.</strong> — AI model inference for the Advisor feature. Messages you send to the Advisor are processed on Hugging Face infrastructure and are governed by Hugging Face's data processing terms. We do not instruct Hugging Face to store or train on your messages.</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Vercel Inc.</strong> — Hosting and serverless function infrastructure.</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Stripe Inc.</strong> — Payment processing. Stripe's use of your payment data is governed by Stripe's Privacy Policy.</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Cloudflare, Inc.</strong> — DNS, DDoS protection, and content delivery.</PolicyLi>
          </ul>
          <p>We may also disclose your information when required by law, court order, or regulatory authority in Canada.</p>
        </PolicySection>

        <PolicySection title="5. International Data Transfers">
          <p>Some of our third-party service providers are located outside Canada, primarily in the United States. When your information is transferred internationally, we take steps to ensure it receives protections comparable to those required under PIPEDA, including through contractual safeguards.</p>
          <p>Quebec residents: Transfers of personal information outside Quebec are subject to a privacy impact assessment as required under Law 25. Our assessments confirm these transfers are necessary for the provision of the Service and subject to adequate contractual protections.</p>
        </PolicySection>

        <PolicySection title="6. Data Retention">
          <p>We retain your personal information for as long as your account is active or as needed to provide the Service. Upon account deletion:</p>
          <ul>
            <PolicyLi>Account data and generated documents are deleted within 30 days, except where retention is required by law</PolicyLi>
            <PolicyLi>Anonymized aggregated usage data may be retained indefinitely for analytics purposes</PolicyLi>
            <PolicyLi>Payment records are retained for 7 years as required by Canadian tax law</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="7. AI Advisor — Special Notice">
          <p>When you use the Dutiva AI Advisor:</p>
          <ul>
            <PolicyLi>Your messages are sent to Hugging Face's inference API in real time. We do not store AI conversation logs on Dutiva Canada servers beyond your current session</PolicyLi>
            <PolicyLi>Do not submit sensitive personal information (SINs, employee medical data, financial details) through the Advisor interface</PolicyLi>
            <PolicyLi>AI responses are generated by a third-party large language model and are not reviewed by Dutiva Canada employees before delivery</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="8. Your Rights Under PIPEDA">
          <p>Under PIPEDA, you have the right to:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Access:</strong> Request access to the personal information we hold about you</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Correction:</strong> Request correction of inaccurate or incomplete information</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Withdrawal of Consent:</strong> Withdraw consent to our use of your personal information (subject to legal and contractual restrictions), which may require account deletion</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Complaint:</strong> Lodge a complaint with the Office of the Privacy Commissioner of Canada at <a href="https://www.priv.gc.ca" target="_blank" rel="noreferrer" style={{ color: GOLD, textDecoration: "none" }}>priv.gc.ca</a></PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="9. Additional Rights — Quebec Residents (Law 25)">
          <p>If you are a resident of Quebec, you have additional rights under the Act respecting the protection of personal information in the private sector:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Right to Portability:</strong> Request that computerized personal information collected from you be communicated to you in a structured, commonly used technological format</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Right to Erasure:</strong> Request deletion of your personal information where it is no longer necessary for the purposes for which it was collected</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Right to Object to Automated Decisions:</strong> Request human review of automated decisions that significantly affect you</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Complaint to the CAI:</strong> Lodge a complaint with the Commission d'accès à l'information du Québec at <a href="https://www.cai.gouv.qc.ca" target="_blank" rel="noreferrer" style={{ color: GOLD, textDecoration: "none" }}>cai.gouv.qc.ca</a></PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="10. Cookies and Tracking">
          <p>We use strictly necessary cookies and local storage to maintain your session and remember your preferences (e.g., language, theme). We do not use third-party advertising cookies or cross-site tracking technologies.</p>
          <p>Our analytics, if used, are privacy-first and do not send personally identifiable data to third-party ad networks.</p>
        </PolicySection>

        <PolicySection title="11. Security">
          <p>We implement industry-standard security measures including TLS encryption in transit, encrypted storage, access controls, and routine security reviews. While we take reasonable precautions, no internet-based system is fully secure.</p>
          <p>In the event of a privacy breach that poses a real risk of significant harm, we will notify affected individuals and the Office of the Privacy Commissioner of Canada as required by PIPEDA.</p>
        </PolicySection>

        <PolicySection title="12. Contact Our Privacy Officer">
          <p>
            <strong style={{ color: TEXT }}>Dutiva Canada Inc. — Privacy Officer</strong><br />
            Email: <a href="mailto:privacy@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>privacy@dutiva.ca</a><br />
            Website: <a href="https://dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>dutiva.ca</a>
          </p>
          <p>We will respond to privacy access requests within 30 days as required by PIPEDA.</p>
        </PolicySection>
      </main>
      <PolicyFooter />
    </div>
  );
}

function PolicyNav() {
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(17,17,17,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Link to="/" style={{ textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: TEXT }}>
        Duti<span style={{ color: GOLD }}>va</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD_BORDER}`, padding: "1px 5px", borderRadius: 2, marginLeft: 6 }}>Canada</span>
      </Link>
      <Link to="/" style={{ fontSize: 13, color: TEXT_SOFT, textDecoration: "none" }}>← Back to site</Link>
    </nav>
  );
}

function PolicySection({ title, children }) {
  return (
    <section style={{ marginBottom: 40, paddingBottom: 40, borderBottom: `1px solid ${BORDER}` }}>
      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 500, color: TEXT, marginBottom: 16 }}>{title}</h2>
      <div style={{ fontSize: 15, color: TEXT_MID, lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 12 }}>
        {children}
      </div>
    </section>
  );
}

function PolicyLi({ children }) {
  return (
    <li style={{ display: "flex", gap: 10, alignItems: "flex-start", listStyle: "none" }}>
      <span style={{ color: GOLD, flexShrink: 0, marginTop: 4 }}>✦</span>
      <span>{children}</span>
    </li>
  );
}

function PolicyFooter() {
  return (
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: TEXT_SOFT }}>Duti<span style={{ color: GOLD }}>va</span> Canada Inc.</div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
          {[["/terms","Terms"],["/privacy","Privacy"],["/accessibility","Accessibility"],["/ai-technology","AI & Technology"],["/disclaimer","Disclaimer"]].map(([to, label]) => (
            <Link key={to} to={to} style={{ fontSize: 12, color: TEXT_SOFT, textDecoration: "underline", textUnderlineOffset: 3 }}>{label}</Link>
          ))}
        </div>
        <div style={{ fontSize: 12, color: TEXT_SOFT }}>© 2026 Dutiva Canada Inc.</div>
      </div>
    </footer>
  );
}
