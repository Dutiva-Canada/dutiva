import { loadFromStorage } from "./storage";

export const SETTINGS_STORAGE_KEY = "dutiva.settings.v1";

export const defaultSettings = {
  companyName: "Dutiva Canada",
  legalName: "Dutiva Canada Inc.",
  email: "",
  website: "",
  province: "Ontario",
  city: "Ottawa",
  primaryContact: "Martin Constantineau",
  companySize: "1-10",
  languageDefault: "English",
  themeDefault: "Dark",
  complianceMode: "Canadian SMB",
};

export function normalizeSettings(value) {
  return {
    ...defaultSettings,
    ...(value && typeof value === "object" ? value : {}),
  };
}

export function getStoredSettings() {
  return normalizeSettings(loadFromStorage(SETTINGS_STORAGE_KEY, defaultSettings));
}
