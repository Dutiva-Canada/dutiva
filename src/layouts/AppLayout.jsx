import { NavLink, Outlet, Link, useLocation } from "react-router-dom";
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShieldCheck,
  Sparkles,
  ChevronRight,
  Wand2,
  Plus,
  Sun,
  Moon,
  Globe,
} from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";

/** Returns translated nav items — must be called inside a component. */
function useNavItems() {
  const { t } = useLang();
  return [
    { to: "/app",            label: t("Dashboard", "Tableau de bord"), icon: LayoutDashboard, end: true },
    { to: "/app/templates",  label: t("Templates",  "Modèles"),         icon: FileText },
    { to: "/app/generator",  label: t("Generator",  "Générateur"),      icon: Wand2 },
    { to: "/app/advisor",    label: t("Advisor",    "Conseiller"),       icon: MessageSquare },
    { to: "/app/settings",   label: t("Settings",   "Paramètres"),      icon: Settings },
  ];
}

function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 shadow-sm"
        style={{ backgroundColor: "var(--bg-soft)" }}
      >
        <div className="font-serif text-xl text-amber-400">D</div>
      </div>
      <div className="leading-none">
        <div className="font-serif text-[1.65rem] tracking-tight text-zinc-100">
          Duti<span className="text-amber-400">va</span>
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-amber-400">Canada</div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon, label, end = false }) {
  const Icon = icon;
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-150",
          isActive
            ? "border border-amber-400/20 bg-amber-400/10 text-amber-200"
            : "text-zinc-400 hover:bg-white/[0.04] hover:text-zinc-100",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${isActive ? "text-amber-400" : "text-amber-300/60"}`} />
            <span className="text-sm font-medium">{label}</span>
          </div>
          <ChevronRight
            className={`h-4 w-4 transition-opacity ${
              isActive ? "opacity-90" : "opacity-0 group-hover:opacity-40"
            }`}
          />
        </>
      )}
    </NavLink>
  );
}

function Sidebar() {
  const { t } = useLang();
  const navItems = useNavItems();

  return (
    <aside
      className="hidden w-[280px] shrink-0 border-r xl:block"
      style={{ background: "var(--sidebar-bg)", borderColor: "var(--border)" }}
    >
      <div className="flex h-full flex-col px-6 py-6">
        <div className="mb-8">
          <BrandLockup />
        </div>

        {/* Province / compliance context card */}
        <div className="mb-8 glass-panel-soft rounded-[24px] p-4">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/12 text-amber-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-100">
                {t("HR compliance workspace", "Espace de conformité RH")}
              </div>
              <div className="text-xs text-zinc-400">
                {t("14 Canadian jurisdictions", "14 juridictions canadiennes")}
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-400/10 bg-amber-400/6 px-3 py-3 text-sm text-zinc-300">
            {t(
              "Province-specific documents, ESA calculations, and legislation-cited guidance — in one place.",
              "Documents par province, calculs ESA et conseils cités en loi — au même endroit."
            )}
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="mt-auto pt-6">
          <div className="glass-panel rounded-[24px] p-4">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-100">
                  {t("New document", "Nouveau document")}
                </div>
                <div className="text-xs text-zinc-400">
                  {t("16 bilingual templates", "16 modèles bilingues")}
                </div>
              </div>
            </div>
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button block w-full px-4 py-3 text-center text-sm"
            >
              {t("Generate document", "Générer un document")}
            </Link>
          </div>

          {/* Policy links footer — using Link to avoid full page reloads */}
          <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1.5">
            {[
              { to: "/terms",         label: t("Terms", "Conditions") },
              { to: "/privacy",       label: t("Privacy", "Confidentialité") },
              { to: "/cookies",       label: t("Cookies", "Témoins") },
              { to: "/accessibility", label: t("Accessibility", "Accessibilité") },
              { to: "/disclaimer",    label: t("Disclaimer", "Avertissement") },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="text-[11px] text-zinc-500 transition hover:text-zinc-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function ThemeLangToggles() {
  const { resolved, setTheme } = useTheme();
  const { lang, setLanguage, t } = useLang();

  const toggleTheme = () => setTheme(resolved === "Light" ? "Dark" : "Light");
  const toggleLang  = () => setLanguage(lang === "en" ? "French" : "English");

  return (
    <div className="flex items-center gap-1">
      {/* Language toggle */}
      <button
        onClick={toggleLang}
        title={lang === "en" ? "Passer en français" : "Switch to English"}
        className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide"
        style={{ minHeight: "36px" }}
      >
        <Globe className="h-3.5 w-3.5" />
        {lang === "en" ? "FR" : "EN"}
      </button>

      {/* Theme toggle */}
      <button
        onClick={toggleTheme}
        title={resolved === "Light" ? t("Switch to dark mode", "Passer en mode sombre") : t("Switch to light mode", "Passer en mode clair")}
        className="ghost-button inline-flex items-center justify-center px-3 py-2"
        style={{ minHeight: "36px" }}
      >
        {resolved === "Light"
          ? <Moon className="h-4 w-4" />
          : <Sun  className="h-4 w-4" />
        }
      </button>
    </div>
  );
}

function TopBar() {
  const location = useLocation();
  const { t } = useLang();

  const getPageMeta = () => {
    if (location.pathname.startsWith("/app/generator")) return {
      badge: t("Generator", "Générateur"),
      title: t("Document generation workflow", "Flux de génération de documents"),
      ctaLabel: t("Browse templates", "Parcourir les modèles"),
      ctaTo: "/app/templates",
    };
    if (location.pathname.startsWith("/app/advisor")) return {
      badge: t("Advisor", "Conseiller"),
      title: t("Legislation-cited HR guidance", "Conseils RH cités en loi"),
      ctaLabel: t("Generate document", "Générer un document"),
      ctaTo: "/app/generator?template=Offer%20Letter",
    };
    if (location.pathname.startsWith("/app/templates")) return {
      badge: t("Templates", "Modèles"),
      title: t("16 bilingual HR templates", "16 modèles RH bilingues"),
      ctaLabel: t("New document", "Nouveau document"),
      ctaTo: "/app/generator?template=Offer%20Letter",
    };
    if (location.pathname.startsWith("/app/settings")) return {
      badge: t("Settings", "Paramètres"),
      title: t("Workspace & jurisdiction settings", "Paramètres de l'espace de travail"),
      ctaLabel: t("Generate document", "Générer un document"),
      ctaTo: "/app/generator?template=Offer%20Letter",
    };
    return {
      badge: t("Dashboard", "Tableau de bord"),
      title: t("HR compliance workspace", "Espace de conformité RH"),
      ctaLabel: t("Generate document", "Générer un document"),
      ctaTo: "/app/generator?template=Offer%20Letter",
    };
  };

  const pageMeta = getPageMeta();

  return (
    <div
      className="sticky top-0 z-30 border-b backdrop-blur-xl"
      style={{ background: "var(--topbar-bg)", borderColor: "var(--border)" }}
    >
      <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 md:px-6 xl:px-8">
        <div className="flex items-center gap-3 xl:hidden">
          <BrandLockup />
        </div>
        <div className="hidden min-w-0 items-center gap-3 md:flex">
          <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1.5 text-xs font-medium text-amber-300">
            {pageMeta.badge}
          </div>
          <div className="truncate text-sm text-zinc-400">{pageMeta.title}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1">
            <ThemeLangToggles />
            <div className="mx-1 h-5 w-px" style={{ backgroundColor: "var(--border)" }} />
          </div>
          <Link to="/app/advisor" className="ghost-button px-4 py-2 text-sm hidden sm:inline-flex">
            {t("Advisor", "Conseiller")}
          </Link>
          <Link to="/app/settings" className="ghost-button px-4 py-2 text-sm hidden sm:inline-flex">
            {t("Settings", "Paramètres")}
          </Link>
          <Link to={pageMeta.ctaTo} className="gold-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">{pageMeta.ctaLabel}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Mobile bottom navigation bar — visible on screens smaller than xl */
function MobileBottomNav({ navItems }) {
  const location = useLocation();

  return (
    <nav
      className="flex xl:hidden fixed bottom-0 left-0 right-0 z-50"
      style={{
        background: 'rgba(10,12,18,0.97)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        height: '64px',
        alignItems: 'stretch',
      }}
    >
      {navItems.map(item => {
        const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
        return (
          <Link
            key={item.to}
            to={item.to}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '3px',
              color: isActive ? '#fbbf24' : '#71717a',
              textDecoration: 'none',
              fontSize: '10px',
              fontWeight: isActive ? 600 : 400,
              paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            }}
          >
            <item.icon style={{ width: 22, height: 22 }} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export default function AppLayout() {
  const navItems = useNavItems();
  return (
    <div className="app-shell min-h-screen text-zinc-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          {/* pb-16 on mobile/tablet leaves room above the fixed bottom nav bar */}
          <main className="flex-1 px-4 py-6 pb-16 md:px-6 xl:px-8 xl:pb-6">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
      {/* Mobile bottom navigation — hidden on xl+ where sidebar is visible */}
      <MobileBottomNav navItems={navItems} />
    </div>
  );
}
