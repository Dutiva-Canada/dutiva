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

const navItems = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/app/templates", label: "Templates", icon: FileText },
  { to: "/app/generator", label: "Generator", icon: Wand2 },
  { to: "/app/advisor", label: "Advisor", icon: MessageSquare },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-11 w-11 place-items-center rounded-2xl border border-amber-400/20 bg-[#0B0D12] shadow-sm">
        <div className="font-serif text-xl text-amber-400">D</div>
      </div>
      <div className="leading-none">
        <div className="font-serif text-[1.65rem] tracking-tight text-zinc-100">
          Duti<span className="text-amber-400">va</span>
        </div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-amber-400">
          Canada
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ to, icon: Icon, label, end = false }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group flex items-center justify-between rounded-2xl px-4 py-3 transition-all duration-150",
          isActive
            ? "bg-amber-400 text-black shadow-[0_10px_24px_rgba(214,168,79,0.18)]"
            : "text-zinc-200 hover:bg-white/5 hover:text-white",
        ].join(" ")
      }
    >
      {({ isActive }) => (
        <>
          <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${isActive ? "text-black" : "text-amber-300"}`} />
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
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-white/6 bg-[#0A0C11] xl:block">
      <div className="flex h-full flex-col px-6 py-6">
        <div className="mb-8">
          <BrandLockup />
        </div>

        <div className="mb-8 rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(25,30,40,0.98)_0%,rgba(20,24,33,0.98)_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03),0_10px_40px_rgba(0,0,0,0.35)]">
          <div className="mb-3 flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/12 text-amber-300">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-zinc-100">Compliance workspace</div>
              <div className="text-xs text-zinc-400">Canada-ready operations</div>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-400/10 bg-amber-400/6 px-3 py-3 text-sm text-zinc-300">
            Centralize documents, guidance, and next actions in one premium workspace.
          </div>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <div className="rounded-[24px] border border-white/6 bg-[linear-gradient(180deg,rgba(18,22,30,0.98)_0%,rgba(14,17,24,0.98)_100%)] p-4 shadow-[0_16px_40px_rgba(0,0,0,0.32)]">
            <div className="mb-3 flex items-center gap-2">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-100">Start faster</div>
                <div className="text-xs text-zinc-400">Jump into document generation</div>
              </div>
            </div>
            <Link
              to="/app/generator?template=Offer%20Letter"
              className="gold-button block w-full px-4 py-3 text-center text-sm"
            >
              Generate document
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

function TopBar() {
  const location = useLocation();

  const getPageMeta = () => {
    if (location.pathname.startsWith("/app/generator")) {
      return {
        badge: "Generator flow",
        title: "Document workflow active",
        ctaLabel: "Open templates",
        ctaTo: "/app/templates",
      };
    }

    if (location.pathname.startsWith("/app/advisor")) {
      return {
        badge: "Advisor",
        title: "Guidance workspace",
        ctaLabel: "Start from guidance",
        ctaTo: "/app/generator?template=Employment%20Agreement",
      };
    }

    if (location.pathname.startsWith("/app/templates")) {
      return {
        badge: "Templates",
        title: "Template library",
        ctaLabel: "New generation",
        ctaTo: "/app/generator?template=Offer%20Letter",
      };
    }

    if (location.pathname.startsWith("/app/settings")) {
      return {
        badge: "Settings",
        title: "Workspace configuration",
        ctaLabel: "Open generator",
        ctaTo: "/app/generator?template=Offer%20Letter",
      };
    }

    return {
      badge: "Premium app preview",
      title: "Operational workspace",
      ctaLabel: "Generate document",
      ctaTo: "/app/generator?template=Offer%20Letter",
    };
  };

  const pageMeta = getPageMeta();

  return (
    <div className="sticky top-0 z-30 border-b border-white/6 bg-[#0A0C11]/80 backdrop-blur-xl">
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
          <button className="ghost-button px-4 py-2 text-sm">EN / FR</button>
          <button className="ghost-button px-4 py-2 text-sm">Dark</button>
          <Link
            to={pageMeta.ctaTo}
            className="gold-button inline-flex items-center gap-2 px-4 py-2 text-sm"
          >
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