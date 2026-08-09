"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeLanguage = "RU" | "EN";

const storageKey = "curlbee-theme";

function readTheme(): Theme {
  const activeTheme = document.documentElement.dataset.theme;
  return activeTheme === "dark" ? "dark" : "light";
}

function applyTheme(theme: Theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  window.localStorage.setItem(storageKey, theme);
}

export default function ThemeToggle({ language }: { language: ThemeLanguage }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTheme(readTheme()));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isDark = theme === "dark";
  const labels = language === "RU"
    ? { day: "День", night: "Ночь", dayShort: "Д", nightShort: "Н", action: isDark ? "Включить дневную тему" : "Включить ночную тему" }
    : { day: "Day", night: "Night", dayShort: "D", nightShort: "N", action: isDark ? "Switch to day theme" : "Switch to night theme" };

  return (
    <button
      className="theme-toggle"
      type="button"
      aria-label={labels.action}
      aria-pressed={isDark}
      title={labels.action}
      onClick={() => {
        const nextTheme: Theme = isDark ? "light" : "dark";
        applyTheme(nextTheme);
        setTheme(nextTheme);
      }}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-label theme-toggle-label-day" data-short={labels.dayShort}>{labels.day}</span>
        <span className="theme-toggle-orbit" />
        <span className="theme-toggle-label theme-toggle-label-night" data-short={labels.nightShort}>{labels.night}</span>
      </span>
    </button>
  );
}
