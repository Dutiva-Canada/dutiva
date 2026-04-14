import { useEffect } from "react";
import { Link } from "react-router-dom";

const GOLD = "var(--gold, #c49a45)";
const GOLD_BORDER = "rgba(196,154,69,0.30)";
const BG = "var(--bg, #111111)";
const TEXT = "var(--text, #f0ece4)";
const TEXT_MID = "var(--text-2, #a09880)";
const TEXT_SOFT = "var(--text-3, #6b6660)";
const BORDER = "var(--border, rgba(255,255,255,0.08))";
const CARD = "var(--bg-elevated, #191919)";
const AMBER_DIM = "rgba(196,154,69,0.08)";
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

export default function DisclaimerPage() {
  useEffect(() => {
    const title = "Legal Disclaimer | Dutiva Canada";
    const desc = "Important legal disclaimer for Dutiva Canada. AI responses are not legal advice. No solicitor-client relationship is formed. Consult a qualified lawyer for your situation.";
    const url = "https://dutiva.ca/disclaimer";
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
    <div style={{ fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", lineHeight: 1.7 }}>
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>Legal Disclaimer</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED}</p>
        </div>

        {/* Amber callout */}
        <div style={{ backgroundColor: AMBER_DIM, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "24px 28px", marginBottom: 48 }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: GOLD, marginBottom: 10 }}>⚠ Important Notice</div>
          <p style={{ fontSize: 15, color: TEXT, lineHeight: 1.75, fontWeight: 400 }}>
            Dutiva Canada is a software platform — not a law firm. Nothing on this website or within the Dutiva Canada platform constitutes legal advice, and no solicitor-client relationship is created by your use of the Service. For employment law matters with significant legal or financial consequences, always consult a qualified employment lawyer.
          </p>
        </div>

        <PolicySection title="1. No Legal Advice">
          <p>The content, templates, calculators, AI-generated responses, and all other materials provided through the Dutiva Canada platform are intended for general informational and educational purposes only. They do not constitute legal advice, legal opinions, or legal guidance tailored to your specific circumstances.</p>
          <p>Canadian employment law is complex, varies by jurisdiction, and changes frequently. While we make every effort to ensure our content is accurate and current, the information provided may not reflect the most recent legislative amendments or apply to your specific employment situation.</p>
        </PolicySection>

        <PolicySection title="2. No Solicitor-Client Relationship">
          <p>Using the Dutiva Canada platform, including the AI Advisor feature, does not create a solicitor-client relationship, attorney-client relationship, or any other professional advisory relationship between you and Dutiva Canada Inc. or any of its employees, contractors, or affiliates.</p>
          <p>No confidentiality obligations arising from a professional legal relationship attach to communications made through the platform.</p>
        </PolicySection>

        <PolicySection title="3. AI-Generated Content Warning">
          <p>The Dutiva AI Advisor uses a large language model (an artificial intelligence system) to generate responses. You acknowledge that:</p>
          <ul>
            <PolicyLi>AI-generated responses may contain factual errors, legal inaccuracies, or outdated information — a phenomenon known as "hallucination"</PolicyLi>
            <PolicyLi>The AI model does not have access to real-time legislative databases or case law services and may not reflect recent changes in Canadian employment law</PolicyLi>
            <PolicyLi>AI responses are generated probabilistically and are not reviewed by a licensed legal professional before delivery</PolicyLi>
            <PolicyLi>You should independently verify any statutory references, deadlines, or legal standards cited by the AI before relying on them</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="4. General Guidance Only">
          <p>HR document templates provided through the Service are designed as general-purpose starting points calibrated to applicable provincial and federal employment standards. They are not a substitute for:</p>
          <ul>
            <PolicyLi>Legal review of your specific employment contracts or workplace policies</PolicyLi>
            <PolicyLi>Advice from a certified HR professional or employment lawyer in your jurisdiction</PolicyLi>
            <PolicyLi>Compliance review by a qualified professional in regulated industries (e.g., federally regulated sectors, healthcare, education)</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="5. Limitation of Liability">
          <p style={{ textTransform: "uppercase", fontSize: 13, color: TEXT_MID, letterSpacing: "0.01em" }}>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE CANADIAN LAW, DUTIVA CANADA INC. SHALL NOT BE LIABLE FOR ANY LOSS, DAMAGE, CLAIM, OR EXPENSE — INCLUDING DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES — ARISING FROM OR IN CONNECTION WITH YOUR RELIANCE ON ANY CONTENT, TEMPLATES, CALCULATIONS, OR AI-GENERATED RESPONSES PROVIDED THROUGH THE PLATFORM.</p>
          <p>This limitation applies regardless of whether such liability is asserted on the basis of contract, tort, negligence, strict liability, or any other legal theory, and even if Dutiva Canada has been advised of the possibility of such damages.</p>
        </PolicySection>

        <PolicySection title="6. External Links">
          <p>The platform may contain links to external websites, government resources, or third-party services. Dutiva Canada does not endorse, control, or take responsibility for the content, accuracy, or privacy practices of any linked external site.</p>
        </PolicySection>

        <PolicySection title="7. Seek Professional Advice">
          <p>We strongly encourage you to seek advice from a qualified professional in the following situations:</p>
          <ul>
            <PolicyLi>Employee terminations, constructive dismissal, or layoffs — particularly where significant notice pay or severance is at issue</PolicyLi>
            <PolicyLi>Human rights complaints, accommodation requests, or workplace harassment investigations</PolicyLi>
            <PolicyLi>Pay equity reviews or obligations under the <em>Pay Equity Act</em></PolicyLi>
            <PolicyLi>Collective agreement interpretation or labour relations matters</PolicyLi>
            <PolicyLi>Any situation involving potential litigation, regulatory enforcement, or employment tribunal proceedings</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="8. Questions">
          <p>For questions about this disclaimer, contact us at <a href="mailto:legal@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>legal@dutiva.ca</a>.</p>
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
