/**
 * ThemeContext — manages dark / light / system theme.
 *
 * • Reads initial value from workspaceSettings (themeDefault).
 * • Writes the chosen theme back to workspaceSettings on every change.
 * • Applies data-theme="dark"|"light" to <html> immediately.
 * • "System" follows the OS prefers-color-scheme media query.
 */
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getStoredSettings, SETTINGS_STORAGE_KEY } from "../utils/workspaceSettings";
import { saveToStorage } from "../utils/storage";

const ThemeContext = createContext(null);

/** Resolve "System" → "Dark" | "Light" based on OS preference. */
function resolveTheme(themeDefault) {
  if (themeDefault === "System") {
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "Light" : "Dark";
  }
  return themeDefault; // "Dark" or "Light"
}

/** Apply the resolved theme to <html data-theme="..."> */
function applyToDOM(resolved) {
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved === "Light" ? "light" : "dark");
  root.style.colorScheme = resolved === "Light" ? "light" : "dark";
}

export function ThemeProvider({ children }) {
  // themeDefault: "Dark" | "Light" | "System"  (stored value)
  const [themeDefault, setThemeDefaultState] = useState(() => {
    return getStoredSettings().themeDefault || "Dark";
  });

  // Apply immediately on mount
  useEffect(() => {
    applyToDOM(resolveTheme(themeDefault));
  }, [themeDefault]);

  // Track system preference changes when "System" is selected
  useEffect(() => {
    if (themeDefault !== "System") return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = () => applyToDOM(resolveTheme("System"));
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [themeDefault]);

  const setTheme = useCallback((value) => {
    setThemeDefaultState(value);
    // Persist into workspaceSettings without wiping other keys
    const current = getStoredSettings();
    saveToStorage(SETTINGS_STORAGE_KEY, { ...current, themeDefault: value });
  }, []);

  const resolved = resolveTheme(themeDefault);

  return (
    <ThemeContext.Provider value={{ themeDefault, setTheme, resolved }}>
      {children}
    </ThemeContext.Provider>
  );
}

/** Returns { themeDefault, setTheme, resolved }
 *  resolved → "Dark" | "Light"
 *  themeDefault → "Dark" | "Light" | "System"
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside <ThemeProvider>");
  return ctx;
}
