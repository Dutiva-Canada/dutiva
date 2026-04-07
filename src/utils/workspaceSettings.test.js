import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  defaultSettings,
  SETTINGS_STORAGE_KEY,
  normalizeSettings,
  getStoredSettings,
} from "./workspaceSettings";

describe("defaultSettings", () => {
  it("has all required keys", () => {
    const requiredKeys = [
      "companyName",
      "legalName",
      "email",
      "website",
      "province",
      "city",
      "primaryContact",
      "companySize",
      "languageDefault",
      "themeDefault",
      "complianceMode",
    ];
    requiredKeys.forEach((key) => {
      expect(defaultSettings).toHaveProperty(key);
    });
  });

  it("has non-empty string values for all keys", () => {
    Object.values(defaultSettings).forEach((val) => {
      expect(typeof val).toBe("string");
      expect(val.length).toBeGreaterThan(0);
    });
  });
});

describe("SETTINGS_STORAGE_KEY", () => {
  it("is a non-empty string", () => {
    expect(typeof SETTINGS_STORAGE_KEY).toBe("string");
    expect(SETTINGS_STORAGE_KEY.length).toBeGreaterThan(0);
  });
});

describe("normalizeSettings", () => {
  it("returns all defaults when called with null", () => {
    expect(normalizeSettings(null)).toEqual(defaultSettings);
  });

  it("returns all defaults when called with undefined", () => {
    expect(normalizeSettings(undefined)).toEqual(defaultSettings);
  });

  it("returns all defaults when called with a non-object primitive", () => {
    expect(normalizeSettings("string")).toEqual(defaultSettings);
    expect(normalizeSettings(42)).toEqual(defaultSettings);
    expect(normalizeSettings(true)).toEqual(defaultSettings);
  });

  it("merges a partial object over the defaults", () => {
    const partial = { companyName: "ACME Corp", city: "Vancouver" };
    const result = normalizeSettings(partial);
    expect(result.companyName).toBe("ACME Corp");
    expect(result.city).toBe("Vancouver");
    // other keys keep defaults
    expect(result.email).toBe(defaultSettings.email);
    expect(result.province).toBe(defaultSettings.province);
  });

  it("merges a complete object, overriding all defaults", () => {
    const full = {
      companyName: "X",
      legalName: "X Inc.",
      email: "x@x.com",
      website: "x.com",
      province: "Quebec",
      city: "Montreal",
      primaryContact: "Jane",
      companySize: "50-100",
      languageDefault: "French",
      themeDefault: "Light",
      complianceMode: "Quebec SMB",
    };
    expect(normalizeSettings(full)).toEqual(full);
  });

  it("includes extra keys from the provided object", () => {
    const result = normalizeSettings({ extra: "value" });
    expect(result.extra).toBe("value");
    expect(result.companyName).toBe(defaultSettings.companyName);
  });

  it("does not mutate the defaults object", () => {
    const original = { ...defaultSettings };
    normalizeSettings({ companyName: "Changed" });
    expect(defaultSettings).toEqual(original);
  });
});

describe("getStoredSettings", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns defaults when nothing is stored", () => {
    expect(getStoredSettings()).toEqual(defaultSettings);
  });

  it("returns normalized stored settings when valid data is present", () => {
    const stored = { companyName: "Stored Co", city: "Calgary" };
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(stored));
    const result = getStoredSettings();
    expect(result.companyName).toBe("Stored Co");
    expect(result.city).toBe("Calgary");
    expect(result.email).toBe(defaultSettings.email);
  });

  it("returns defaults when storage contains invalid JSON", () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, "{{invalid");
    expect(getStoredSettings()).toEqual(defaultSettings);
  });

  it("returns defaults when storage contains a non-object value", () => {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify("a string"));
    expect(getStoredSettings()).toEqual(defaultSettings);
  });

  it("does not throw when localStorage.getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
      throw new Error("security error");
    });
    expect(() => getStoredSettings()).not.toThrow();
    expect(getStoredSettings()).toEqual(defaultSettings);
  });
});
