/**
 * LanguageContext — manages English / French / Bilingual UI language.
 *
 * • Reads initial value from workspaceSettings (languageDefault).
 * • Writes the chosen language back to workspaceSettings on every change.
 * • Sets document.documentElement.lang ("en" | "fr").
 * • Exposes t(en, fr) helper — bilingual defaults to French.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getStoredSettings, SETTINGS_STORAGE_KEY } from "../utils/workspaceSettings";
import { saveToStorage } from "../utils/storage";

const LanguageContext = createContext(null);

/** "English" → "en", "French" → "fr", "Bilingual" → "fr" */
function toLangCode(languageDefault) {
  if (languageDefault === "French" || languageDefault === "Bilingual") return "fr";
  return "en";
}

export function LanguageProvider({ children }) {
  // languageDefault: "English" | "French" | "Bilingual"  (stored value)
  const [languageDefault, setLanguageDefaultState] = useState(() => {
    return getStoredSettings().languageDefault || "English";
  });

  const lang = toLangCode(languageDefault); // "en" | "fr"

  // Apply HTML lang attribute immediately
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((value) => {
    setLanguageDefaultState(value);
    const current = getStoredSettings();
    saveToStorage(SETTINGS_STORAGE_KEY, { ...current, languageDefault: value });
  }, []);

  /**
   * t(en, fr) — returns the string for the current language.
   * Usage:  t("Settings", "Paramètres")
   */
  const t = useCallback(
    (en, fr) => (lang === "fr" ? fr : en),
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ languageDefault, lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

/** Returns { languageDefault, lang, setLanguage, t }
 *  lang → "en" | "fr"
 *  t(en, fr) → string
 */
export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
