import { Outlet, Link, NavLink } from 'react-router-dom';

function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-amber-400/20 bg-[#0B0D12]">
        <div className="font-serif text-lg text-amber-400">D</div>
      </div>
      <div className="leading-none">
        <div className="font-serif text-xl tracking-tight text-zinc-100">
          Duti<span className="text-amber-400">va</span>
        </div>
      </div>
    </div>
  );
}

export default function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[#0A0C11] text-zinc-100">
      <header className="sticky top-0 z-30 border-b border-white/6 bg-[#0A0C11]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6">
          <Link to="/">
            <BrandLockup />
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/8 text-zinc-100'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                `rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-white/8 text-zinc-100'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }`
              }
            >
              Pricing
            </NavLink>
            <Link
              to="/app"
              className="gold-button ml-2 px-4 py-2 text-sm"
            >
              Open app
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
