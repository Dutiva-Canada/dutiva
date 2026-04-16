import { Outlet, Link, NavLink } from 'react-router-dom';
import { Sun, Moon, Globe, Laptop } from 'lucide-react';
import { useLang } from '../context/LanguageContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';

function BrandLockup() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-9 w-9 place-items-center rounded-xl border border-amber-400/20" style={{ background: 'var(--bg-elevated)' }}>
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
    <div className="flex items-center gap-1">
      <button
        onClick={toggleLang}
        className="ghost-button inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide"
      >
        <Globe className="h-3.5 w-3.5" />
        {lang === 'en' ? 'FR' : 'EN'}
      </button>
      <button
        onClick={cycleTheme}
        className="ghost-button inline-flex items-center justify-center px-3 py-2"
      >
        {themeIcon}
      </button>
    </div>
  );
}

export default function MarketingLayout() {
  const { t } = useLang();

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-xl"
        style={{ background: 'var(--topbar-bg)', borderColor: 'var(--border)' }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-6">
          <Link to="/">
            <BrandLockup />
          </Link>

          <nav className="flex items-center gap-2">
            <NavLink to="/" end className="rounded-xl px-4 py-2 text-sm font-medium">
              {t('Home', 'Accueil')}
            </NavLink>
            <NavLink to="/beta" className="rounded-xl px-4 py-2 text-sm font-medium">
              {t('Beta', 'Bêta')}
            </NavLink>
            <NavLink to="/pricing" className="rounded-xl px-4 py-2 text-sm font-medium">
              {t('Pricing', 'Tarifs')}
            </NavLink>
            <ThemeLangToggles />
            <Link to="/app" className="gold-button ml-1 px-4 py-2 text-sm">
              {t('Open app', "Ouvrir l'app")}
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
