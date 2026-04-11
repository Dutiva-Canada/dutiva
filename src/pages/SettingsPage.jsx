import { useEffect, useState } from "react";
import {
  Building2,
  Globe,
  Mail,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  User2,
  Save,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  CreditCard,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { saveToStorage, removeFromStorage } from "../utils/storage";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useTheme } from "../context/ThemeContext.jsx";
import { useLang } from "../context/LanguageContext.jsx";
import { usePlan } from "../context/PlanContext.jsx";
import { supabase } from "../lib/supabase";
import {
  defaultSettings,
  getStoredSettings,
  normalizeSettings,
  SETTINGS_STORAGE_KEY,
} from "../utils/workspaceSettings";

function SectionCard({ id, title, children, action }) {
  return (
    <section id={id} className="premium-card scroll-mt-24 p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
        {action ? <div>{action}</div> : null}
      </div>
      {children}
    </section>
  );
}

function Field({ label, icon, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-medium text-zinc-300">
        <span className="text-zinc-500">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveBanner({ visible, text = "Settings saved successfully.", tone = "success" }) {
  if (!visible) return null;
  const toneClass =
    tone === "warning"
      ? "border-yellow-400/15 bg-yellow-400/8 text-yellow-200"
      : "border-emerald-400/15 bg-emerald-400/8 text-emerald-300";
  return (
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClass}`}>{text}</div>
  );
}

function SummaryItem({ icon, title, desc, tone = "default" }) {
  const iconTone =
    tone === "gold" ? "text-amber-300" : tone === "success" ? "text-emerald-300" : "text-zinc-300";
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
      <div className={`mt-0.5 ${iconTone}`}>{icon}</div>
      <div>
        <div className="text-sm font-medium text-zinc-100">{title}</div>
        <div className="mt-1 text-sm text-zinc-400">{desc}</div>
      </div>
    </div>
  );
}

function toDbPayload(form) {
  return {
    primary_email:   form.email,
    company_name:    form.companyName,
    legal_name:      form.legalName,
    website:         form.website,
    province:        form.province,
    city:            form.city,
    primary_contact: form.primaryContact,
    company_size:    form.companySize,
    language_default: form.languageDefault,
    theme_default:   form.themeDefault,
    compliance_mode: form.complianceMode,
  };
}

function fromDbRow(row) {
  if (!row) return defaultSettings;
  return normalizeSettings({
    companyName:     row.company_name    ?? defaultSettings.companyName,
    legalName:       row.legal_name      ?? defaultSettings.legalName,
    email:           row.primary_email   ?? row.email ?? defaultSettings.email,
    website:         row.website         ?? defaultSettings.website,
    province:        row.province        ?? defaultSettings.province,
    city:            row.city            ?? defaultSettings.city,
    primaryContact:  row.primary_contact ?? defaultSettings.primaryContact,
    companySize:     row.company_size    ?? defaultSettings.companySize,
    languageDefault: row.language_default ?? defaultSettings.languageDefault,
    themeDefault:    row.theme_default   ?? defaultSettings.themeDefault,
    complianceMode:  row.compliance_mode ?? defaultSettings.complianceMode,
  });
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { setTheme } = useTheme();
  const { setLanguage, t } = useLang();
  const { plan, subscriptionStatus, loading: planLoading } = usePlan();
  const [saved, setSaved] = useState(false);
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalError, setPortalError]     = useState(null);
  const [bannerText, setBannerText] = useState("Settings saved successfully.");
  const [bannerTone, setBannerTone] = useState("success");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [form, setForm] = useState(() => getStoredSettings());

  useEffect(() => {
    saveToStorage(SETTINGS_STORAGE_KEY, normalizeSettings(form));
  }, [form]);

  useEffect(() => {
    async function loadProfile() {
      if (!user || !supabase) { setLoadingProfile(false); return; }
      try {
        const { data, error } = await supabase
          .from("profiles").select("*").eq("id", user.id).maybeSingle();
        if (error) throw error;
        if (data) {
          const nextForm = fromDbRow(data);
          setForm(nextForm);
          saveToStorage(SETTINGS_STORAGE_KEY, nextForm);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    }
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      const normalizedForm = normalizeSettings(form);
      saveToStorage(SETTINGS_STORAGE_KEY, normalizedForm);
      if (user && supabase) {
        const { error } = await supabase.from("profiles").upsert({ id: user.id, ...toDbPayload(normalizedForm) });
        if (error) throw error;
      }
      setBannerTone("success");
      setBannerText(t("Settings saved successfully.", "Paramètres enregistrés avec succès."));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Save failed:", error);
      setBannerTone("warning");
      setBannerText(t("Could not save to Supabase yet. Local settings were kept.", "Impossible de sauvegarder sur Supabase. Les paramètres locaux ont été conservés."));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleReset = async () => {
    try {
      removeFromStorage(SETTINGS_STORAGE_KEY);
      setForm(defaultSettings);
      setTheme(defaultSettings.themeDefault);
      setLanguage(defaultSettings.languageDefault);
      if (user && supabase) {
        const { error } = await supabase.from("profiles").upsert({ id: user.id, ...toDbPayload(defaultSettings) });
        if (error) throw error;
      }
      setBannerTone("success");
      setBannerText(t("Settings reset to defaults.", "Paramètres réinitialisés."));
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Reset failed:", error);
      setBannerTone("warning");
      setBannerText(t("Defaults restored locally, but Supabase update failed.", "Valeurs par défaut restaurées localement, mais la mise à jour Supabase a échoué."));
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleManageSubscription = async () => {
    if (!user || !supabase) return;
    setPortalLoading(true);
    setPortalError(null);
    try {
      const returnUrl = `${window.location.origin}/app/settings`;
      const { data, error } = await supabase.functions.invoke("create-portal-session", {
        body: { returnUrl },
      });
      if (error || !data?.url) throw new Error(error?.message ?? "Could not open billing portal.");
      window.location.href = data.url;
    } catch (err) {
      setPortalError(err.message ?? "Failed to open billing portal. Please try again.");
    } finally {
      setPortalLoading(false);
    }
  };

  const planLabel = plan === "growth" ? "Growth" : plan === "advanced" ? "Advanced" : "Free";
  const planActive = subscriptionStatus === "active" || subscriptionStatus === "trialing";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            {t("Settings", "Paramètres")}
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            {t("Company profile", "Profil d'entreprise")}
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            {t(
              "Configure your business profile, workspace preferences, and default compliance context.",
              "Configurez votre profil d'entreprise, vos préférences d'espace de travail et votre contexte de conformité par défaut."
            )}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={handleSave} className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm">
            <Save className="h-4 w-4" />
            {t("Save settings", "Enregistrer")}
          </button>
          <button onClick={handleReset} className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm">
            <RotateCcw className="h-4 w-4" />
            {t("Reset", "Réinitialiser")}
          </button>
        </div>
      </div>

      <SaveBanner visible={saved} text={bannerText} tone={bannerTone} />

      {loadingProfile ? (
        <div className="premium-card p-6">
          <div className="text-sm text-zinc-300">
            {t("Loading your workspace profile...", "Chargement de votre profil...")}
          </div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionCard
            id="business-details"
            title={t("Business details", "Détails de l'entreprise")}
            action={
              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                {t("Core profile", "Profil principal")}
              </div>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t("Company name", "Nom de l'entreprise")} icon={<Building2 className="h-4 w-4" />}>
                <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Legal name", "Dénomination légale")} icon={<Building2 className="h-4 w-4" />}>
                <input value={form.legalName} onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Primary email", "Courriel principal")} icon={<Mail className="h-4 w-4" />}>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Website", "Site web")} icon={<Globe className="h-4 w-4" />}>
                <input value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Province", "Province")} icon={<MapPin className="h-4 w-4" />}>
                <input value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("City", "Ville")} icon={<MapPin className="h-4 w-4" />}>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Primary contact", "Contact principal")} icon={<User2 className="h-4 w-4" />}>
                <input value={form.primaryContact} onChange={(e) => setForm({ ...form, primaryContact: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none" />
              </Field>
              <Field label={t("Company size", "Taille de l'entreprise")} icon={<Building2 className="h-4 w-4" />}>
                <select value={form.companySize} onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none">
                  <option>1-10</option>
                  <option>11-50</option>
                  <option>51-200</option>
                  <option>200+</option>
                </select>
              </Field>
            </div>
          </SectionCard>

          <SectionCard id="workspace-defaults" title={t("Workspace defaults", "Préférences de l'espace de travail")}>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label={t("Default language", "Langue par défaut")} icon={<Globe className="h-4 w-4" />}>
                <select
                  value={form.languageDefault}
                  onChange={(e) => {
                    setForm({ ...form, languageDefault: e.target.value });
                    setLanguage(e.target.value); // instant apply
                  }}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Bilingual</option>
                </select>
              </Field>

              <Field label={t("Default theme", "Thème par défaut")} icon={<SlidersHorizontal className="h-4 w-4" />}>
                <select
                  value={form.themeDefault}
                  onChange={(e) => {
                    setForm({ ...form, themeDefault: e.target.value });
                    setTheme(e.target.value); // instant apply
                  }}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </Field>

              <Field label={t("Compliance mode", "Mode de conformité")} icon={<ShieldCheck className="h-4 w-4" />}>
                <select
                  value={form.complianceMode}
                  onChange={(e) => setForm({ ...form, complianceMode: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option>Canadian SMB</option>
                  <option>Multi-province employer</option>
                  <option>Custom</option>
                </select>
              </Field>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          {/* Subscription */}
          <SectionCard
            title={t("Subscription", "Abonnement")}
            action={planLoading ? null : (
              <div className={["rounded-full border px-3 py-1 text-xs font-medium",
                planActive ? "border-amber-400/15 bg-amber-400/8 text-amber-300" : "border-white/8 bg-white/[0.03] text-zinc-400",
              ].join(" ")}>
                {planActive ? planLabel : t("Free", "Gratuit")}
              </div>
            )}
          >
            {planLoading ? (
              <p className="text-sm text-zinc-500">{t("Loading subscription\u2026", "Chargement de l\u2019abonnement\u2026")}</p>
            ) : planActive ? (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <CreditCard className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <div className="text-sm font-medium text-zinc-100">{t(`${planLabel} plan \u2014 active`, `Plan ${planLabel} \u2014 actif`)}</div>
                    <div className="mt-1 text-sm text-zinc-400">{t("Manage billing, update your payment method, or cancel anytime from the Stripe billing portal.", "G\u00e9rez la facturation, mettez \u00e0 jour votre mode de paiement ou annulez \u00e0 tout moment via le portail Stripe.")}</div>
                  </div>
                </div>
                {portalError && <div className="rounded-2xl border border-red-400/15 bg-red-400/8 px-4 py-3 text-sm text-red-300">{portalError}</div>}
                <button type="button" disabled={portalLoading} onClick={handleManageSubscription}
                  className="ghost-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm disabled:opacity-60 disabled:cursor-not-allowed">
                  <ExternalLink className="h-4 w-4" />
                  {portalLoading ? t("Opening portal\u2026", "Ouverture du portail\u2026") : t("Manage subscription", "G\u00e9rer l\u2019abonnement")}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-start gap-3 rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                  <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                  <div>
                    <div className="text-sm font-medium text-zinc-100">{t("You\u2019re on the Free plan", "Vous \u00eates sur le plan Gratuit")}</div>
                    <div className="mt-1 text-sm text-zinc-400">{t("Upgrade to Growth for unlimited document generation, AI Advisor, and all 4 compliance rings.", "Passez \u00e0 Growth pour la g\u00e9n\u00e9ration illimit\u00e9e, le Conseiller IA et les 4 anneaux de conformit\u00e9.")}</div>
                  </div>
                </div>
                <Link to="/pricing" className="gold-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-sm">
                  {t("Upgrade to Growth \u2014 $39/mo", "Passer \u00e0 Growth \u2014 39\u00a0$/mois")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </SectionCard>
          <SectionCard
            title={t("Workspace summary", "Résumé de l'espace de travail")}
            action={
              <div className="rounded-full border border-emerald-400/12 bg-emerald-400/8 px-3 py-1 text-xs font-medium text-emerald-300">
                {t("Active", "Actif")}
              </div>
            }
          >
            <div className="space-y-3">
              <SummaryItem
                icon={<CheckCircle2 className="h-5 w-5" />}
                tone="success"
                title={t("Business profile configured", "Profil d'entreprise configuré")}
                desc={t(
                  "Your generator, advisor, and dashboard can all use this as shared workspace context.",
                  "Votre générateur, conseiller et tableau de bord utilisent ce contexte partagé."
                )}
              />
              <SummaryItem
                icon={<ShieldCheck className="h-5 w-5" />}
                tone="gold"
                title={t("Supabase-ready profile", "Profil prêt pour Supabase")}
                desc={t(
                  "Settings now save locally and attempt to sync to your authenticated user profile.",
                  "Les paramètres sont sauvegardés localement et synchronisés avec votre profil authentifié."
                )}
              />
              <SummaryItem
                icon={<Sparkles className="h-5 w-5" />}
                tone="gold"
                title={t("Theme & language active", "Thème et langue actifs")}
                desc={t(
                  "Switch theme and language instantly from the dropdowns above — no save required.",
                  "Changez de thème et de langue instantanément via les menus ci-dessus — sans sauvegarde."
                )}
              />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
