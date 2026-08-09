"use client";

import { useEffect } from "react";

export default function LanguageSync({ language }: { language: "RU" | "EN" }) {
  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  return null;
}
