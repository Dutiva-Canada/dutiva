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

function setMeta(name, content) {
  let el = document.querySelector(`meta[name="${name}"], meta[property="${name}"]`);
  if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
  el.name ? (el.content = content) : el.setAttribute("content", content);
}
function setOgMeta(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute("property", property); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

export default function TermsPage() {
  useEffect(() => {
    const title = "Terms of Service | Dutiva Canada";
    const desc = "Read Dutiva Canada's Terms of Service. Governing law: Ontario. Covers subscriptions, AI content, intellectual property, and limitation of liability.";
    const url = "https://dutiva.ca/terms";
    document.title = title;
    setMeta("description", desc);
    setOgMeta("og:title", title);
    setOgMeta("og:description", desc);
    setOgMeta("og:url", url);
    setOgMeta("og:type", "website");
    setOgMeta("og:site_name", "Dutiva Canada");
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: BG, color: TEXT, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", lineHeight: 1.7 }}>
      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, backgroundColor: "rgba(17,17,17,0.95)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${BORDER}`, padding: "0 24px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ textDecoration: "none", fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: TEXT }}>
          Duti<span style={{ color: GOLD }}>va</span>
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: GOLD, border: `1px solid ${GOLD_BORDER}`, padding: "1px 5px", borderRadius: 2, marginLeft: 6 }}>Canada</span>
        </Link>
        <Link to="/" style={{ fontSize: 13, color: TEXT_SOFT, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to site
        </Link>
      </nav>

      {/* CONTENT */}
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>Terms of Service</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED} · Effective: {LAST_UPDATED}</p>
        </div>

        <div style={{ backgroundColor: CARD, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: TEXT_MID, lineHeight: 1.7 }}>
          <strong style={{ color: TEXT }}>Please read these terms carefully.</strong> By accessing or using Dutiva Canada's platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree, do not use the platform.
        </div>

        <PolicySection title="1. Acceptance of Terms">
          <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and Dutiva Canada Inc. ("Dutiva Canada," "we," "us," or "our"), a company incorporated under the <em>Canada Business Corporations Act</em>.</p>
          <p>By creating an account, accessing, or using any part of the Dutiva Canada platform (the "Service"), you confirm that you are at least 18 years of age, have the legal capacity to enter into these Terms, and agree to be bound by them in their entirety.</p>
        </PolicySection>

        <PolicySection title="2. Description of Service">
          <p>Dutiva Canada provides a software-as-a-service ("SaaS") platform designed to assist Canadian small and medium-sized businesses with human resources compliance. Our Service includes:</p>
          <ul>
            <PolicyLi>Jurisdiction-aware HR document templates calibrated to Canadian federal and provincial employment standards</PolicyLi>
            <PolicyLi>An Employment Standards Act ("ESA") compliance calculator for notice periods, termination entitlements, and severance obligations</PolicyLi>
            <PolicyLi>AI-powered advisory features that provide general guidance on Canadian employment law matters</PolicyLi>
            <PolicyLi>Bilingual (English and French) document generation and export functionality</PolicyLi>
          </ul>
          <p>The Service is provided on a subscription basis as described in our pricing page. Features available under each tier are subject to change with reasonable notice.</p>
        </PolicySection>

        <PolicySection title="3. Subscription, Fees, and Payment">
          <p>Certain features of the Service require a paid subscription. By subscribing to a paid plan, you authorize Dutiva Canada to charge the applicable fees to your designated payment method.</p>
          <p><strong style={{ color: TEXT }}>Billing:</strong> Subscriptions are billed monthly or annually in advance. All fees are in Canadian dollars (CAD) unless otherwise stated and are exclusive of applicable taxes.</p>
          <p><strong style={{ color: TEXT }}>Refunds:</strong> Monthly subscriptions may be cancelled at any time; you retain access until the end of the current billing period. No prorated refunds are issued for partial months. Annual subscriptions are eligible for a pro-rated refund if cancelled within 14 days of the initial purchase. After 14 days, annual subscriptions are non-refundable except where required by applicable consumer protection law.</p>
          <p><strong style={{ color: TEXT }}>Price Changes:</strong> We reserve the right to modify subscription pricing with at least 30 days' written notice. Continued use of the Service after a price change constitutes acceptance of the new pricing.</p>
        </PolicySection>

        <PolicySection title="4. Acceptable Use">
          <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You must not:</p>
          <ul>
            <PolicyLi>Use the Service to generate documents intended to facilitate unlawful discrimination, harassment, or any conduct prohibited under the <em>Canadian Human Rights Act</em> or applicable provincial human rights legislation</PolicyLi>
            <PolicyLi>Reproduce, distribute, sell, resell, or sublicense the templates, calculators, or any other content generated by the Service for commercial redistribution without our express written consent</PolicyLi>
            <PolicyLi>Attempt to reverse engineer, decompile, or extract the underlying algorithms, models, or data structures of the Service</PolicyLi>
            <PolicyLi>Introduce malicious code, automated bots, scrapers, or any tools designed to overload or interfere with the Service's infrastructure</PolicyLi>
            <PolicyLi>Impersonate any person or entity or misrepresent your affiliation with any person or entity</PolicyLi>
            <PolicyLi>Use the AI advisory feature to obtain or attempt to obtain legal advice for the purpose of circumventing professional legal counsel in high-stakes situations</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="5. Intellectual Property">
          <p>All content, features, and functionality of the Service — including but not limited to the software, text, templates, calculators, logos, and trade names — are owned by Dutiva Canada Inc. and are protected by applicable Canadian and international intellectual property laws.</p>
          <p>Documents you generate using the Service are licensed to you for your internal business use. Dutiva Canada retains all underlying intellectual property rights in the templates and generation logic.</p>
          <p>You retain ownership of any data, documents, or information you upload to the Service. By uploading content, you grant Dutiva Canada a limited, non-exclusive licence to process such content solely as necessary to provide the Service.</p>
        </PolicySection>

        <PolicySection title="6. AI-Generated Content">
          <p>Portions of the Service use artificial intelligence models, including large language models, to generate content and provide guidance. You acknowledge and agree that:</p>
          <ul>
            <PolicyLi>AI-generated content may contain errors, omissions, or outdated information and is provided for general informational purposes only</PolicyLi>
            <PolicyLi>AI-generated content does not constitute legal advice and does not create a solicitor-client relationship between you and Dutiva Canada or any legal professional</PolicyLi>
            <PolicyLi>You are solely responsible for verifying the accuracy, completeness, and applicability of any AI-generated content before acting upon it</PolicyLi>
            <PolicyLi>Dutiva Canada does not warrant that AI-generated content reflects the current state of Canadian employment law in your specific jurisdiction</PolicyLi>
          </ul>
          <p>For matters of legal significance, we strongly recommend consulting a qualified employment lawyer or HR professional.</p>
        </PolicySection>

        <PolicySection title="7. Disclaimers">
          <p style={{ textTransform: "uppercase", fontSize: 13, letterSpacing: "0.01em", color: TEXT_MID }}>THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED. DUTIVA CANADA EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</p>
          <p style={{ textTransform: "uppercase", fontSize: 13, letterSpacing: "0.01em", color: TEXT_MID }}>DUTIVA CANADA DOES NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DO NOT WARRANT THE ACCURACY, COMPLETENESS, OR RELIABILITY OF ANY INFORMATION PROVIDED THROUGH THE SERVICE, INCLUDING AI-GENERATED CONTENT.</p>
        </PolicySection>

        <PolicySection title="8. Limitation of Liability">
          <p style={{ textTransform: "uppercase", fontSize: 13, letterSpacing: "0.01em", color: TEXT_MID }}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DUTIVA CANADA, ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING FROM (I) YOUR USE OR INABILITY TO USE THE SERVICE; (II) RELIANCE ON AI-GENERATED CONTENT; (III) UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA; OR (IV) ANY OTHER MATTER RELATING TO THE SERVICE.</p>
          <p>In no event shall Dutiva Canada's aggregate liability to you for any claims arising out of or relating to these Terms or the Service exceed the greater of (a) the total fees paid by you to Dutiva Canada in the twelve (12) months preceding the claim, or (b) one hundred Canadian dollars (CAD $100).</p>
        </PolicySection>

        <PolicySection title="9. Indemnification">
          <p>You agree to indemnify, defend, and hold harmless Dutiva Canada Inc. and its directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising out of or in connection with: (a) your use of the Service; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) your violation of any third-party rights.</p>
        </PolicySection>

        <PolicySection title="10. Termination">
          <p>You may terminate your account at any time by contacting us at legal@dutiva.ca or through the account settings in the Service.</p>
          <p>Dutiva Canada reserves the right to suspend or terminate your access to the Service immediately, with or without notice, if: (a) you breach these Terms; (b) we are required to do so by law; or (c) your use of the Service poses a risk to the security or integrity of the platform.</p>
          <p>Upon termination, your right to use the Service will immediately cease. Sections 5, 7, 8, 9, 11, and 12 shall survive termination of these Terms.</p>
        </PolicySection>

        <PolicySection title="11. Governing Law and Dispute Resolution">
          <p>These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein, without regard to conflict of law principles.</p>
          <p>Any dispute arising out of or relating to these Terms or the Service shall first be subject to good-faith negotiation. If not resolved within 30 days, disputes shall be submitted to binding arbitration administered by ADR Chambers in Toronto, Ontario, in accordance with its arbitration rules. The language of arbitration shall be English. Either party may seek injunctive or other equitable relief from a court of competent jurisdiction.</p>
          <p>Nothing in this section limits your rights as a consumer under applicable provincial consumer protection legislation.</p>
        </PolicySection>

        <PolicySection title="12. Changes to These Terms">
          <p>We reserve the right to modify these Terms at any time. We will provide at least 14 days' notice of material changes by email or prominent notice within the Service. Your continued use of the Service after the effective date of the revised Terms constitutes your acceptance of the changes.</p>
          <p>If you do not agree to the revised Terms, you must discontinue use of the Service and may request account deletion by contacting legal@dutiva.ca.</p>
        </PolicySection>

        <PolicySection title="13. Contact">
          <p>For questions about these Terms, please contact:</p>
          <p style={{ marginTop: 8 }}>
            <strong style={{ color: TEXT }}>Dutiva Canada Inc.</strong><br />
            Email: <a href="mailto:legal@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>legal@dutiva.ca</a><br />
            Website: <a href="https://dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>dutiva.ca</a>
          </p>
        </PolicySection>
      </main>

      <PolicyFooter />
    </div>
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
    <footer style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 24px", textAlign: "center" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: TEXT_SOFT }}>
          Duti<span style={{ color: GOLD }}>va</span> Canada Inc.
        </div>
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
