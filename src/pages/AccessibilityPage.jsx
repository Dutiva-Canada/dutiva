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

export default function AccessibilityPage() {
  useEffect(() => {
    const title = "Accessibility Statement | Dutiva Canada";
    const desc = "Dutiva Canada's accessibility statement. Our commitment to WCAG 2.1 Level AA, AODA compliance, and inclusive design for all users.";
    const url = "https://dutiva.ca/accessibility";
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
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>Accessibility Statement</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div style={{ backgroundColor: CARD, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: TEXT_MID }}>
          Dutiva Canada Inc. is committed to ensuring that its platform is accessible to people of all abilities. We are actively working toward conformance with the <strong style={{ color: TEXT }}>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.
        </div>

        <PolicySection title="1. Our Commitment">
          <p>Accessibility is not an afterthought at Dutiva Canada — it is a core design principle. We believe that HR compliance tools should be usable by all Canadian business owners and employees, including those with disabilities.</p>
          <p>Our platform is designed to work across modern assistive technologies including screen readers, keyboard navigation, and high-contrast display modes.</p>
        </PolicySection>

        <PolicySection title="2. Conformance Status">
          <p>Dutiva Canada is currently in <strong style={{ color: TEXT }}>partial conformance</strong> with WCAG 2.1 Level AA. This means some parts of the platform do not yet fully meet all accessibility standards.</p>
          <p>We are actively conducting accessibility audits and implementing improvements on a rolling basis. Our target is full WCAG 2.1 Level AA conformance across all core user flows.</p>
        </PolicySection>

        <PolicySection title="3. Accessibility Features">
          <p>Current accessibility features include:</p>
          <ul>
            <PolicyLi>Keyboard navigability for all primary actions (navigation, form submission, document generation)</PolicyLi>
            <PolicyLi>Sufficient color contrast ratios across primary text and interactive elements (minimum 4.5:1 for normal text)</PolicyLi>
            <PolicyLi>Focus indicators on interactive elements</PolicyLi>
            <PolicyLi>Descriptive page titles and document headings</PolicyLi>
            <PolicyLi>ARIA labels on icon-only buttons and navigation elements</PolicyLi>
            <PolicyLi>Responsive design that supports text resizing up to 200% without loss of functionality</PolicyLi>
            <PolicyLi>Full bilingual (English/French) support throughout the platform</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="4. Known Limitations">
          <p>We are aware of the following areas where accessibility improvements are in progress:</p>
          <ul>
            <PolicyLi>Some dynamically generated document content may not be fully announced by all screen readers</PolicyLi>
            <PolicyLi>The AI Advisor chat interface is undergoing review for screen reader compatibility of streaming responses</PolicyLi>
            <PolicyLi>Some data tables in the ESA calculator may lack full ARIA table role annotations in certain browser/AT combinations</PolicyLi>
          </ul>
          <p>We are prioritizing these improvements and expect updates within future releases.</p>
        </PolicySection>

        <PolicySection title="5. Technical Specifications">
          <p>The Dutiva Canada platform relies on the following technologies for accessibility support:</p>
          <ul>
            <PolicyLi>HTML5 semantic markup</PolicyLi>
            <PolicyLi>WAI-ARIA 1.1 roles, states, and properties</PolicyLi>
            <PolicyLi>CSS for visual presentation (no content conveyed through CSS alone)</PolicyLi>
            <PolicyLi>JavaScript (React) for dynamic interactions, with keyboard and focus management</PolicyLi>
          </ul>
          <p>The platform is tested with modern assistive technologies including NVDA and VoiceOver, and tested across Chrome, Firefox, Safari, and Edge.</p>
        </PolicySection>

        <PolicySection title="6. Feedback and Contact">
          <p>We welcome feedback on the accessibility of our platform. If you experience any barriers or have suggestions for improvement, please contact us:</p>
          <p style={{ marginTop: 8 }}>
            <strong style={{ color: TEXT }}>Email:</strong> <a href="mailto:hello@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>hello@dutiva.ca</a> (subject: "Accessibility Feedback")<br />
            <strong style={{ color: TEXT }}>Response time:</strong> We aim to respond to accessibility feedback within 5 business days.
          </p>
          <p>If you require information in an alternative format, please contact us and we will work with you to provide it in a manner that meets your needs.</p>
        </PolicySection>

        <PolicySection title="7. Regulatory Context">
          <p>Dutiva Canada is committed to meeting applicable Canadian accessibility standards, including obligations under the <em>Accessible Canada Act</em> (S.C. 2019, c. 10) and provincial accessibility legislation where applicable, including the <em>Accessibility for Ontarians with Disabilities Act</em> (AODA).</p>
          <p>As our user base and operations grow, we will publish formal accessibility plans and progress reports as required under applicable legislation.</p>
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
