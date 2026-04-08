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
} from "lucide-react";
import { useLang } from "../context/LanguageContext.jsx";

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
        <div className="mt-auto pt-8">
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
        </div>
      </div>
    </aside>
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
        <div className="flex items-center gap-3">
          <Link to="/app/advisor" className="ghost-button px-4 py-2 text-sm">
            {t("Advisor", "Conseiller")}
          </Link>
          <Link to="/app/settings" className="ghost-button px-4 py-2 text-sm">
            {t("Settings", "Paramètres")}
          </Link>
          <Link to={pageMeta.ctaTo} className="gold-button inline-flex items-center gap-2 px-4 py-2 text-sm">
            <Plus className="h-4 w-4" />
            {pageMeta.ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AppLayout() {
  return (
    <div className="app-shell min-h-screen text-zinc-100">
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar />
          <main className="flex-1 px-4 py-6 md:px-6 xl:px-8">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
