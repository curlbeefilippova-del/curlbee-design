"use client";

import { type Dispatch, type SetStateAction, useEffect } from "react";

export function useLanguageQuerySync<Language extends "RU" | "EN">(
  language: Language,
  setLanguage: Dispatch<SetStateAction<Language>>,
) {
  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang")?.toLowerCase() === "en"
      ? "EN"
      : "RU";

    setLanguage((currentLanguage) => (
      currentLanguage === requestedLanguage ? currentLanguage : requestedLanguage as Language
    ));
  }, [setLanguage]);

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);
}
