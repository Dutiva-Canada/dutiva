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

export default function CookiesPage() {
  useEffect(() => {
    const title = "Cookie Policy | Dutiva Canada";
    const desc = "Dutiva Canada's Cookie Policy. We use only strictly necessary cookies and local storage to keep your session and preferences. No third-party ad tracking.";
    const url = "https://dutiva.ca/cookies";
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
      <PolicyNav />
      <main style={{ maxWidth: 760, margin: "0 auto", padding: "64px 24px 96px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: GOLD, marginBottom: 14 }}>Legal</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>Cookie Policy</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div style={{ backgroundColor: CARD, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: TEXT_MID }}>
          Dutiva Canada uses only <strong style={{ color: TEXT }}>strictly necessary cookies and local storage</strong> to keep you signed in and remember your preferences. We do not use third-party advertising cookies or cross-site tracking technologies.
        </div>

        <PolicySection title="1. What Are Cookies">
          <p>Cookies are small text files placed on your device by a website when you visit it. They allow the site to remember information about your visit — such as your preferred language or whether you are logged in — making your next visit easier and the site more useful.</p>
          <p>Dutiva Canada uses browser local storage (a similar mechanism) rather than traditional cookies for most preference storage. Both technologies serve the same purpose: persisting lightweight state between page loads.</p>
        </PolicySection>

        <PolicySection title="2. Types of Cookies We Use">
          <p><strong style={{ color: TEXT }}>Strictly Necessary (Session):</strong> These are required for the platform to function. They maintain your authenticated session after you log in via Supabase. Without these, you would be signed out on every page load.</p>
          <p><strong style={{ color: TEXT }}>Preference Storage (Local Storage):</strong> We store your selected language (English or French) and display theme (light or dark) in your browser's local storage. This data never leaves your device and is not transmitted to our servers.</p>
          <p>We do not use analytics cookies, advertising cookies, or any third-party tracking pixels.</p>
        </PolicySection>

        <PolicySection title="3. Third-Party Cookies">
          <p>Dutiva Canada does not embed third-party advertising scripts, social media buttons, or analytics SDKs that set cookies. Our infrastructure partners (Supabase, Vercel) may set their own operational cookies as part of delivering the Service. These are strictly functional and are governed by each partner's own cookie and privacy policies.</p>
        </PolicySection>

        <PolicySection title="4. Managing Cookies">
          <p>Because we only use strictly necessary cookies, there is no cookie consent banner on our platform — the cookies we set are required for the Service to function and are exempt from consent requirements under applicable Canadian privacy law (PIPEDA).</p>
          <p>You can clear cookies and local storage at any time through your browser settings. Doing so will sign you out and reset your language and theme preferences. Instructions for common browsers:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Chrome:</strong> Settings → Privacy and Security → Clear Browsing Data</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Firefox:</strong> Settings → Privacy &amp; Security → Cookies and Site Data → Clear Data</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Safari:</strong> Preferences → Privacy → Manage Website Data</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Edge:</strong> Settings → Privacy, Search, and Services → Clear Browsing Data</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="5. Data Stored and Retention">
          <p><strong style={{ color: TEXT }}>Session token:</strong> Set by Supabase on login; expires when you log out or your session times out (typically 7 days of inactivity).</p>
          <p><strong style={{ color: TEXT }}>Language preference:</strong> Stored in local storage indefinitely until you clear it or change it manually. Contains only the string "en" or "fr".</p>
          <p><strong style={{ color: TEXT }}>Theme preference:</strong> Stored in local storage indefinitely. Contains only "Light" or "Dark".</p>
          <p>None of the above data is personally identifying on its own and none is shared with third-party advertisers.</p>
        </PolicySection>

        <PolicySection title="6. Contact">
          <p>For questions about our use of cookies or local storage, contact us at <a href="mailto:privacy@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>privacy@dutiva.ca</a>.</p>
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
      <span style={{ color: GOLD, flexShrink: 0, marginTop: 4 }}>›</span>
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
          {[["/terms","Terms"],["/privacy","Privacy"],["/cookies","Cookies"],["/accessibility","Accessibility"],["/ai-tech","AI & Technology"],["/disclaimer","Disclaimer"]].map(([to, label]) => (
            <Link key={to} to={to} style={{ fontSize: 12, color: TEXT_SOFT, textDecoration: "underline", textUnderlineOffset: 3 }}>{label}</Link>
          ))}
        </div>
        <div style={{ fontSize: 12, color: TEXT_SOFT }}>© 2026 Dutiva Canada Inc.</div>
      </div>
    </footer>
  );
}
