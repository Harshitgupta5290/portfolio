"use client";
import { createContext, useContext, useEffect, useState } from "react";

const SUPPORTED = ["en", "hi", "es", "fr", "de", "pt", "zh", "ja", "ar", "ru", "ko", "it"];
const RTL_LOCALES = ["ar"];

function detectLocale() {
  if (typeof window === "undefined") return "en";
  try {
    const stored = localStorage.getItem("portfolio-locale");
    if (stored && SUPPORTED.includes(stored)) return stored;
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return SUPPORTED.includes(nav) ? nav : "en";
  } catch {
    return "en";
  }
}

const LocaleContext = createContext({
  locale: "en",
  dir: "ltr",
  setLocale: () => {},
  t: (key) => key,
});

export function LocaleProvider({ children }) {
  const [locale, setLocaleState] = useState("en");
  const [messages, setMessages] = useState({});

  // Detect stored / browser locale on mount
  useEffect(() => {
    setLocaleState(detectLocale());
  }, []);

  // Load JSON + apply dir + lang whenever locale changes
  useEffect(() => {
    const dir = RTL_LOCALES.includes(locale) ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", locale);
    try { localStorage.setItem("portfolio-locale", locale); } catch {}

    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    fetch(`${base}/locales/${locale}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setMessages)
      .catch(() =>
        fetch(`${base}/locales/en.json`)
          .then((r) => r.json())
          .then(setMessages)
          .catch(() => {})
      );
  }, [locale]);

  const setLocale = (l) => {
    if (SUPPORTED.includes(l)) setLocaleState(l);
  };

  // Dot-notation accessor: t("nav.about")
  const t = (key) => {
    const parts = key.split(".");
    let node = messages;
    for (const p of parts) {
      if (node == null || typeof node !== "object") return key;
      node = node[p];
    }
    return typeof node === "string" ? node : key;
  };

  return (
    <LocaleContext.Provider
      value={{ locale, dir: RTL_LOCALES.includes(locale) ? "rtl" : "ltr", setLocale, t }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export const useLocale = () => useContext(LocaleContext);
export { SUPPORTED as SUPPORTED_LOCALES };
