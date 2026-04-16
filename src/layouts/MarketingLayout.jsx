import { Outlet, Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Globe, Laptop } from 'lucide-react';
import { useLang } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function BrandLockup() {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-amber-400/20" style={{ background: 'var(--bg-elevated)' }}>
        <div className="font-serif text-lg text-amber-400">D</div>
      </div>
      <div className="leading-none min-w-0">
        <div className="truncate font-serif text-xl tracking-tight text-zinc-100">
          Duti<span className="text-amber-400">va</span>
        </div>
      </div>
    </div>
  );
}

function ThemeLangToggles() {
  const { themeDefault, setTheme } = useTheme();
  const { lang, setLanguage } = useLang();

  const cycleTheme = () => {
    if (themeDefault === 'Dark') return setTheme('Light');
    if (themeDefault === 'Light') return setTheme('System');
    return setTheme('Dark');
  };

  const themeIcon = themeDefault === 'Dark'
    ? <Moon className="h-4 w-4" />
    : themeDefault === 'Light'
      ? <Sun className="h-4 w-4" />
      : <Laptop className="h-4 w-4" />;

  const toggleLang = () => setLanguage(lang === 'en' ? 'French' : 'English');

  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={toggleLang}
        className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide"
        aria-label="Toggle language"
      >
        <Globe className="h-3.5 w-3.5" />
        {lang === 'en' ? 'FR' : 'EN'}
      </button>
      <button
        onClick={cycleTheme}
        className="ghost-button inline-flex items-center justify-center px-3 py-2"
        aria-label="Change theme"
      >
        {themeIcon}
      </button>
    </div>
  );
}

function TopNavLink({ to, end = false, children }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => [
        'rounded-xl px-3 py-2 text-sm font-medium transition',
        isActive ? 'bg-white/8 text-zinc-100' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100',
      ].join(' ')}
    >
      {children}
    </NavLink>
  );
}

export default function MarketingLayout() {
  const { t } = useLang();

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{ background: 'var(--topbar-bg)', borderColor: 'var(--border)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-3 min-w-0">
            <Link to="/" className="min-w-0 flex-1">
              <BrandLockup />
            </Link>

            <div className="flex items-center gap-2 shrink-0">
              <ThemeLangToggles />
              <Link to="/app" className="gold-button inline-flex items-center justify-center px-4 py-2 text-sm whitespace-nowrap">
                {t('Open app', "Ouvrir l'app")}
              </Link>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-2 md:gap-3">
            <TopNavLink to="/" end>{t('Home', 'Accueil')}</TopNavLink>
            <TopNavLink to="/beta">{t('Beta', 'Bêta')}</TopNavLink>
            <TopNavLink to="/pricing">{t('Pricing', 'Tarifs')}</TopNavLink>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
