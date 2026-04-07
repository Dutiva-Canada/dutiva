import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadFromStorage, saveToStorage, removeFromStorage } from "./storage";

describe("loadFromStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("returns the fallback value when key is not present", () => {
    expect(loadFromStorage("missing", "default")).toBe("default");
  });

  it("returns the JSON null value (not the fallback) when JSON null is stored", () => {
    // localStorage.setItem coerces null to the string "null"; JSON.parse("null") === null,
    // so the parsed value is returned rather than the fallback.
    localStorage.setItem("key", "null");
    expect(loadFromStorage("key", "fallback")).toBeNull();
  });

  it("parses and returns a stored object", () => {
    localStorage.setItem("obj", JSON.stringify({ a: 1 }));
    expect(loadFromStorage("obj", null)).toEqual({ a: 1 });
  });

  it("parses and returns a stored string", () => {
    localStorage.setItem("str", JSON.stringify("hello"));
    expect(loadFromStorage("str", null)).toBe("hello");
  });

  it("parses and returns a stored number", () => {
    localStorage.setItem("num", JSON.stringify(42));
    expect(loadFromStorage("num", 0)).toBe(42);
  });

  it("parses and returns a stored boolean false", () => {
    localStorage.setItem("bool", JSON.stringify(false));
    expect(loadFromStorage("bool", true)).toBe(false);
  });

  it("parses and returns a stored array", () => {
    localStorage.setItem("arr", JSON.stringify([1, 2, 3]));
    expect(loadFromStorage("arr", [])).toEqual([1, 2, 3]);
  });

  it("returns the fallback value when the stored value is invalid JSON", () => {
    localStorage.setItem("bad", "not-json{{");
    expect(loadFromStorage("bad", "fallback")).toBe("fallback");
  });

  it("returns the fallback value when localStorage.getItem throws", () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementationOnce(() => {
      throw new Error("storage error");
    });
    expect(loadFromStorage("key", "fallback")).toBe("fallback");
  });
});

describe("saveToStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("saves a string value and it can be retrieved", () => {
    saveToStorage("key", "value");
    expect(localStorage.getItem("key")).toBe(JSON.stringify("value"));
  });

  it("saves an object value and it can be retrieved", () => {
    saveToStorage("obj", { x: 1 });
    expect(JSON.parse(localStorage.getItem("obj"))).toEqual({ x: 1 });
  });

  it("saves a number value", () => {
    saveToStorage("num", 99);
    expect(JSON.parse(localStorage.getItem("num"))).toBe(99);
  });

  it("saves a boolean false value", () => {
    saveToStorage("bool", false);
    expect(JSON.parse(localStorage.getItem("bool"))).toBe(false);
  });

  it("saves an array value", () => {
    saveToStorage("arr", [1, 2]);
    expect(JSON.parse(localStorage.getItem("arr"))).toEqual([1, 2]);
  });

  it("does not throw when localStorage.setItem throws", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementationOnce(() => {
      throw new Error("quota exceeded");
    });
    expect(() => saveToStorage("key", "value")).not.toThrow();
  });
});

describe("removeFromStorage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("removes a previously saved key", () => {
    localStorage.setItem("key", "value");
    removeFromStorage("key");
    expect(localStorage.getItem("key")).toBeNull();
  });

  it("does not throw when the key does not exist", () => {
    expect(() => removeFromStorage("nonexistent")).not.toThrow();
  });

  it("does not throw when localStorage.removeItem throws", () => {
    vi.spyOn(Storage.prototype, "removeItem").mockImplementationOnce(() => {
      throw new Error("storage error");
    });
    expect(() => removeFromStorage("key")).not.toThrow();
  });

  it("only removes the specified key and leaves others intact", () => {
    localStorage.setItem("a", "1");
    localStorage.setItem("b", "2");
    removeFromStorage("a");
    expect(localStorage.getItem("a")).toBeNull();
    expect(localStorage.getItem("b")).toBe("2");
  });
});
