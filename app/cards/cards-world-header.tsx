"use client";

import type { Dispatch, SetStateAction } from "react";

export type CardsLanguage = "RU" | "EN";

type CardsWorldHeaderProps = {
  backLabel: string;
  className: string;
  language: CardsLanguage;
  navigationLabel: string;
  setLanguage: Dispatch<SetStateAction<CardsLanguage>>;
  slug: string;
};

export default function CardsWorldHeader({
  backLabel,
  className,
  language,
  navigationLabel,
  setLanguage,
  slug,
}: CardsWorldHeaderProps) {
  const langQuery = language.toLowerCase();

  const changeLanguage = (nextLanguage: CardsLanguage) => {
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage.toLowerCase());
    window.history.replaceState(null, "", url);
  };

  return (
    <header className={className}>
      <a className="case-brand" href={`/?lang=${langQuery}#cards`} aria-label="Curlbee Design">
        <img src="/curlbee-logo.svg" alt="Curlbee" />
      </a>
      <nav aria-label={navigationLabel}>
        <a
          className="case-back"
          data-short={language === "RU" ? "Назад" : "Back"}
          href={`/?lang=${langQuery}#cards`}
        >
          <span aria-hidden="true" />
          {backLabel}
        </a>
        <div
          className="case-language"
          role="group"
          aria-label={language === "RU" ? "Выбор языка" : "Language selection"}
        >
          <a
            href={`/cards/${slug}?lang=ru`}
            aria-current={language === "RU" ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              changeLanguage("RU");
            }}
          >
            RU
          </a>
          <span className="language-divider" aria-hidden="true">/</span>
          <a
            href={`/cards/${slug}?lang=en`}
            aria-current={language === "EN" ? "true" : undefined}
            onClick={(event) => {
              event.preventDefault();
              changeLanguage("EN");
            }}
          >
            EN
          </a>
        </div>
      </nav>
    </header>
  );
}
