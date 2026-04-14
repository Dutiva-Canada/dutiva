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

export default function AITechPage() {
  useEffect(() => {
    const title = "AI & Technology Policy | Dutiva Canada";
    const desc = "Learn how Dutiva's AI advisor works. Powered by Qwen 2.5 via HuggingFace. Full transparency on our tech stack, data flow, and AI limitations.";
    const url = "https://dutiva.ca/ai-technology";
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
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 500, lineHeight: 1.15, marginBottom: 16 }}>AI & Technology Policy</h1>
          <p style={{ fontSize: 14, color: TEXT_SOFT }}>Last updated: {LAST_UPDATED}</p>
        </div>

        <div style={{ backgroundColor: CARD, border: `1px solid ${GOLD_BORDER}`, borderRadius: 12, padding: "20px 24px", marginBottom: 48, fontSize: 14, color: TEXT_MID }}>
          This policy explains how Dutiva Canada uses artificial intelligence and third-party technology in the provision of its Service — what model we use, how your data flows, and what the AI can and cannot do. <strong style={{ color: TEXT }}>Transparency is foundational to our product.</strong>
        </div>

        <PolicySection title="1. AI Model Disclosure">
          <p>The Dutiva AI Advisor feature is powered by <strong style={{ color: TEXT }}>Qwen/Qwen2.5-7B-Instruct</strong>, an open-weight large language model developed by Alibaba Cloud's Qwen team and accessed via the <strong style={{ color: TEXT }}>Hugging Face Inference API</strong> (router.huggingface.co).</p>
          <p>We selected this model based on its strong instruction-following capabilities, multilingual support (English and French), and availability through a compliant API endpoint. We may update the underlying model over time; material changes will be reflected in this policy.</p>
        </PolicySection>

        <PolicySection title="2. How AI Responses Are Generated">
          <p>When you submit a question to the Dutiva AI Advisor:</p>
          <ul>
            <PolicyLi>Your message, your selected province/territory, and a system-level instruction (establishing the Advisor's role as a Canadian HR compliance assistant) are sent to the Hugging Face Inference API</PolicyLi>
            <PolicyLi>The model generates a response token by token, which is streamed back to your browser in real time</PolicyLi>
            <PolicyLi>Dutiva Canada acts as a pass-through — we do not modify or curate the model's response before it reaches you, though we apply formatting and strip repetitive disclaimers for readability</PolicyLi>
            <PolicyLi>The system prompt instructs the model to focus on Canadian employment law, acknowledge jurisdiction-specific nuances, and recommend professional consultation for complex matters</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="3. Data Handling — AI Conversations">
          <p><strong style={{ color: TEXT }}>What is sent to Hugging Face:</strong> Your message text, the system prompt, and limited conversation history (for context in multi-turn conversations).</p>
          <p><strong style={{ color: TEXT }}>What is NOT sent:</strong> Your name, email address, payment information, or account identifiers are not included in AI API calls.</p>
          <p><strong style={{ color: TEXT }}>Storage:</strong> Dutiva Canada does not persistently store AI conversation logs on its own servers. Conversations exist in-session in your browser and are not retained after your session ends.</p>
          <p><strong style={{ color: TEXT }}>Training:</strong> We do not instruct Hugging Face to use your messages to train AI models. Hugging Face's own data practices are governed by their <a href="https://huggingface.co/privacy" target="_blank" rel="noreferrer" style={{ color: GOLD, textDecoration: "none" }}>Privacy Policy</a>.</p>
        </PolicySection>

        <PolicySection title="4. AI Limitations — What the Advisor Cannot Do">
          <p>It is critical that you understand the limitations of the Dutiva AI Advisor:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Not legal advice:</strong> The Advisor provides general guidance on Canadian employment law concepts. It does not constitute legal advice and does not create a solicitor-client or advisor-client relationship</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>May hallucinate:</strong> Large language models can generate plausible-sounding but factually incorrect information, including incorrect citation of statutes, regulations, or case law. Always verify legislative references independently</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Knowledge cutoff:</strong> The model's training data has a cutoff date. Recent legislative amendments or regulatory changes may not be reflected in the Advisor's responses</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Not a substitute for counsel:</strong> For terminations, wrongful dismissal risks, accommodation obligations, pay equity matters, or any situation with significant legal or financial exposure, consult a qualified employment lawyer</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>No real-time data:</strong> The Advisor does not access real-time legislative databases, case law services, or government websites</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="5. Human Review Requirement">
          <p>All AI-generated content — including Advisor responses, auto-filled form suggestions, and document drafts — should be reviewed by a qualified human before being relied upon for employment decisions.</p>
          <p>Dutiva Canada is not responsible for employment decisions made solely in reliance on AI-generated content without independent verification or professional review.</p>
        </PolicySection>

        <PolicySection title="6. Third-Party Technology Stack">
          <p>The following third-party technologies underpin the Dutiva Canada platform:</p>
          <ul>
            <PolicyLi><strong style={{ color: TEXT }}>Supabase</strong> — PostgreSQL database, authentication, and real-time infrastructure</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Vercel</strong> — Serverless hosting, edge network, and CI/CD deployment</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Hugging Face</strong> — AI model inference API</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Stripe</strong> — Payment processing and subscription management</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>Cloudflare</strong> — DNS, DDoS mitigation, and content delivery</PolicyLi>
            <PolicyLi><strong style={{ color: TEXT }}>React / Vite</strong> — Frontend framework and build tooling (open source)</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="7. Prohibited Uses of AI Features">
          <p>You must not use the Dutiva AI Advisor to:</p>
          <ul>
            <PolicyLi>Generate content designed to facilitate unlawful discrimination against protected groups under Canadian human rights legislation</PolicyLi>
            <PolicyLi>Attempt to extract training data, probe model weights, or conduct adversarial testing without our consent</PolicyLi>
            <PolicyLi>Generate mass-produced legal documents for redistribution outside your organization</PolicyLi>
            <PolicyLi>Bypass or circumvent rate limits, prompt filters, or other technical controls</PolicyLi>
          </ul>
        </PolicySection>

        <PolicySection title="8. Legislative and Regulatory Monitoring">
          <p>Dutiva Canada monitors Canadian federal and provincial employment legislation for material changes that affect our templates and calculator logic. When significant legislative changes occur, we update our content and notify users through in-app notices and email.</p>
          <p>AI-generated advisory content is not automatically updated when legislation changes. The AI model's knowledge reflects its training data and may lag behind current law.</p>
        </PolicySection>

        <PolicySection title="9. Questions">
          <p>For questions about our use of AI or technology, contact us at <a href="mailto:hello@dutiva.ca" style={{ color: GOLD, textDecoration: "none" }}>hello@dutiva.ca</a>.</p>
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
