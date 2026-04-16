/**
 * LanguageContext — manages English / French / Bilingual UI language.
 *
 * • Reads initial value from workspaceSettings (languageDefault).
 * • Writes the chosen language back to workspaceSettings on every change.
 * • Sets document.documentElement.lang.
 * • Exposes t(en, fr) helper.
 * • In bilingual mode, returns both strings in a compact combined format.
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { getStoredSettings, SETTINGS_STORAGE_KEY } from "../utils/workspaceSettings";
import { saveToStorage } from "../utils/storage";

const LanguageContext = createContext(null);

function toLangCode(languageDefault) {
  if (languageDefault === "French") return "fr";
  if (languageDefault === "Bilingual") return "en-CA";
  return "en";
}

function formatBilingual(en, fr) {
  if (!en && !fr) return "";
  if (!en) return fr;
  if (!fr) return en;
  if (en === fr) return en;
  return `${en} / ${fr}`;
}

export function LanguageProvider({ children }) {
  const [languageDefault, setLanguageDefaultState] = useState(() => {
    return getStoredSettings().languageDefault || "English";
  });

  const lang = toLangCode(languageDefault);
  const isBilingual = languageDefault === "Bilingual";

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLanguage = useCallback((value) => {
    setLanguageDefaultState(value);
    const current = getStoredSettings();
    saveToStorage(SETTINGS_STORAGE_KEY, { ...current, languageDefault: value });
  }, []);

  const t = useCallback(
    (en, fr) => {
      if (languageDefault === "French") return fr ?? en ?? "";
      if (languageDefault === "Bilingual") return formatBilingual(en, fr);
      return en ?? fr ?? "";
    },
    [languageDefault]
  );

  const value = useMemo(
    () => ({ languageDefault, lang, isBilingual, setLanguage, t }),
    [languageDefault, lang, isBilingual, setLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used inside <LanguageProvider>");
  return ctx;
}
