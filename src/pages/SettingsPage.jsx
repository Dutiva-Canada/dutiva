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
} from "lucide-react";
import { saveToStorage, removeFromStorage } from "../utils/storage";
import { useAuth } from "../context/AuthContext.jsx";
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
    <div className={`rounded-2xl border px-4 py-3 text-sm ${toneClass}`}>
      {text}
    </div>
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
    primary_email: form.email,
    company_name: form.companyName,
    legal_name: form.legalName,
    website: form.website,
    province: form.province,
    city: form.city,
    primary_contact: form.primaryContact,
    company_size: form.companySize,
    language_default: form.languageDefault,
    theme_default: form.themeDefault,
    compliance_mode: form.complianceMode,
  };
}

function fromDbRow(row) {
  if (!row) return defaultSettings;

  return normalizeSettings({
    companyName: row.company_name ?? defaultSettings.companyName,
    legalName: row.legal_name ?? defaultSettings.legalName,
    email: row.primary_email ?? row.email ?? defaultSettings.email,
    website: row.website ?? defaultSettings.website,
    province: row.province ?? defaultSettings.province,
    city: row.city ?? defaultSettings.city,
    primaryContact: row.primary_contact ?? defaultSettings.primaryContact,
    companySize: row.company_size ?? defaultSettings.companySize,
    languageDefault: row.language_default ?? defaultSettings.languageDefault,
    themeDefault: row.theme_default ?? defaultSettings.themeDefault,
    complianceMode: row.compliance_mode ?? defaultSettings.complianceMode,
  });
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [bannerText, setBannerText] = useState("Settings saved successfully.");
  const [bannerTone, setBannerTone] = useState("success");
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [form, setForm] = useState(() => getStoredSettings());

  useEffect(() => {
    saveToStorage(SETTINGS_STORAGE_KEY, normalizeSettings(form));
  }, [form]);

  useEffect(() => {
    async function loadProfile() {
      if (!user || !supabase) {
        setLoadingProfile(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

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
        const payload = {
          id: user.id,
          ...toDbPayload(normalizedForm),
        };

        const { error } = await supabase.from("profiles").upsert(payload);
        if (error) throw error;
      }

      setBannerTone("success");
      setBannerText("Settings saved successfully.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Save failed:", error);
      setBannerTone("warning");
      setBannerText("Could not save to Supabase yet. Local settings were kept.");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleReset = async () => {
    try {
      removeFromStorage(SETTINGS_STORAGE_KEY);
      setForm(defaultSettings);

      if (user && supabase) {
        const payload = {
          id: user.id,
          ...toDbPayload(defaultSettings),
        };

        const { error } = await supabase.from("profiles").upsert(payload);
        if (error) throw error;
      }

      setBannerTone("success");
      setBannerText("Settings reset to defaults.");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (error) {
      console.error("Reset failed:", error);
      setBannerTone("warning");
      setBannerText("Defaults restored locally, but Supabase update failed.");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-3 inline-flex rounded-full border border-amber-400/15 bg-amber-400/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300">
            Settings
          </div>
          <h1 className="metric-value text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
            Company profile
          </h1>
          <p className="mt-3 max-w-2xl text-base text-zinc-400">
            Configure your business profile, workspace preferences, and default compliance context.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleSave}
            className="gold-button inline-flex items-center gap-2 px-5 py-3 text-sm"
          >
            <Save className="h-4 w-4" />
            Save settings
          </button>

          <button
            onClick={handleReset}
            className="ghost-button inline-flex items-center gap-2 px-4 py-3 text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </button>
        </div>
      </div>

      <SaveBanner
        visible={saved}
        text={bannerText}
        tone={bannerTone}
      />

      {loadingProfile ? (
        <div className="premium-card p-6">
          <div className="text-sm text-zinc-300">Loading your workspace profile...</div>
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-6">
          <SectionCard
            id="business-details"
            title="Business details"
            action={
              <div className="rounded-full border border-amber-400/12 bg-amber-400/6 px-3 py-1 text-xs font-medium text-amber-300">
                Core profile
              </div>
            }
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Company name" icon={<Building2 className="h-4 w-4" />}>
                <input
                  value={form.companyName}
                  onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Legal name" icon={<Building2 className="h-4 w-4" />}>
                <input
                  value={form.legalName}
                  onChange={(e) => setForm({ ...form, legalName: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Primary email" icon={<Mail className="h-4 w-4" />}>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Website" icon={<Globe className="h-4 w-4" />}>
                <input
                  value={form.website}
                  onChange={(e) => setForm({ ...form, website: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Province" icon={<MapPin className="h-4 w-4" />}>
                <input
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="City" icon={<MapPin className="h-4 w-4" />}>
                <input
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Primary contact" icon={<User2 className="h-4 w-4" />}>
                <input
                  value={form.primaryContact}
                  onChange={(e) => setForm({ ...form, primaryContact: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                />
              </Field>

              <Field label="Company size" icon={<Building2 className="h-4 w-4" />}>
                <select
                  value={form.companySize}
                  onChange={(e) => setForm({ ...form, companySize: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option className="bg-[#0E1218]">1-10</option>
                  <option className="bg-[#0E1218]">11-50</option>
                  <option className="bg-[#0E1218]">51-200</option>
                  <option className="bg-[#0E1218]">200+</option>
                </select>
              </Field>
            </div>
          </SectionCard>

          <SectionCard id="workspace-defaults" title="Workspace defaults">
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Default language" icon={<Globe className="h-4 w-4" />}>
                <select
                  value={form.languageDefault}
                  onChange={(e) => setForm({ ...form, languageDefault: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option className="bg-[#0E1218]">English</option>
                  <option className="bg-[#0E1218]">French</option>
                  <option className="bg-[#0E1218]">Bilingual</option>
                </select>
              </Field>

              <Field label="Default theme" icon={<SlidersHorizontal className="h-4 w-4" />}>
                <select
                  value={form.themeDefault}
                  onChange={(e) => setForm({ ...form, themeDefault: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option className="bg-[#0E1218]">Dark</option>
                  <option className="bg-[#0E1218]">Light</option>
                  <option className="bg-[#0E1218]">System</option>
                </select>
              </Field>

              <Field label="Compliance mode" icon={<ShieldCheck className="h-4 w-4" />}>
                <select
                  value={form.complianceMode}
                  onChange={(e) => setForm({ ...form, complianceMode: e.target.value })}
                  className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none"
                >
                  <option className="bg-[#0E1218]">Canadian SMB</option>
                  <option className="bg-[#0E1218]">Multi-province employer</option>
                  <option className="bg-[#0E1218]">Custom</option>
                </select>
              </Field>
            </div>
          </SectionCard>
        </div>

        <div className="space-y-6">
          <SectionCard
            title="Workspace summary"
            action={
              <div className="rounded-full border border-emerald-400/12 bg-emerald-400/8 px-3 py-1 text-xs font-medium text-emerald-300">
                Active
              </div>
            }
          >
            <div className="space-y-3">
              <SummaryItem
                icon={<CheckCircle2 className="h-5 w-5" />}
                tone="success"
                title="Business profile configured"
                desc="Your generator, advisor, and dashboard can all use this as shared workspace context."
              />
              <SummaryItem
                icon={<ShieldCheck className="h-5 w-5" />}
                tone="gold"
                title="Supabase-ready profile"
                desc="Settings now save locally and attempt to sync to your authenticated user profile."
              />
              <SummaryItem
                icon={<Sparkles className="h-5 w-5" />}
                tone="gold"
                title="Premium workspace direction"
                desc="This now behaves more like a real SaaS settings screen instead of a static demo page."
              />
            </div>
          </SectionCard>

          <SectionCard title="Why this matters">
            <div className="space-y-3 text-sm text-zinc-300">
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                Your profile can now be tied to the authenticated user instead of only the browser.
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                This creates the foundation for true multi-device persistence later.
              </div>
              <div className="rounded-2xl border border-white/6 bg-white/[0.02] px-4 py-4">
                It also prepares the dashboard and generator to read real workspace data from Supabase.
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
