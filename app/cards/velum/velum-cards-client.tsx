"use client";

import { useEffect, useRef, useState } from "react";

export type CardsLanguage = "RU" | "EN";

const velumCards = [
  { number: "01", image: "/cards/velum/01.png", title: { RU: "Главный экран", EN: "Hero card" } },
  { number: "02", image: "/cards/velum/02.png", title: { RU: "Почему VÉLUM", EN: "Why VÉLUM" } },
  { number: "03", image: "/cards/velum/03.png", title: { RU: "Формула", EN: "Formula" } },
  { number: "04", image: "/cards/velum/04.png", title: { RU: "Состав", EN: "Ingredients" } },
  { number: "05", image: "/cards/velum/05.png", title: { RU: "Способ применения", EN: "How to use" } },
  { number: "06", image: "/cards/velum/06.png", title: { RU: "Результат", EN: "Result" } },
  { number: "07", image: "/cards/velum/07.png", title: { RU: "Ценности", EN: "Values" } },
  { number: "08", image: "/cards/velum/08.png", title: { RU: "Финальный образ", EN: "Final image" } },
] as const;

const copy = {
  RU: {
    back: "К главе карточек",
    navigation: "Навигация по миру VÉLUM",
    kicker: "Карточки товара · серия 01",
    title: "VÉLUM",
    text: "Восемь карточек раскрывают продукт от\u00a0формулы и\u00a0состава до\u00a0ритуала нанесения и\u00a0финального образа.",
    hint: "Наведи или нажми — карточка выйдет на первый план",
    open: "Открыть крупно",
    close: "Закрыть",
    list: "Карточки VÉLUM",
  },
  EN: {
    back: "Back to product cards",
    navigation: "VÉLUM world navigation",
    kicker: "Product cards · series 01",
    title: "VÉLUM",
    text: "Eight cards reveal the product from formula and ingredients to the application ritual and final image.",
    hint: "Hover or tap — the card will move to the foreground",
    open: "Open full size",
    close: "Close",
    list: "VÉLUM cards",
  },
} as const;

export default function VelumCardsClient({ initialLanguage }: { initialLanguage: CardsLanguage }) {
  const [language, setLanguage] = useState<CardsLanguage>(initialLanguage);
  const [activeCard, setActiveCard] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  const card = velumCards[activeCard];
  const langQuery = language.toLowerCase();

  useEffect(() => {
    document.documentElement.lang = langQuery;
  }, [langQuery]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => lightboxCloseRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      previousFocus?.focus();
    };
  }, [isLightboxOpen]);

  return (
    <main className="cards-world-page">
      <header className="cards-world-header">
        <a className="case-brand" href={`/?lang=${langQuery}#cards`} aria-label="Curlbee Design">
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </a>
        <nav aria-label={t.navigation}>
          <a className="case-back" href={`/?lang=${langQuery}#cards`}><span aria-hidden="true">←</span>{t.back}</a>
          <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            {(["RU", "EN"] as const).map((item) => (
              <a
                key={item}
                href={`/cards/velum?lang=${item.toLowerCase()}`}
                aria-current={language === item ? "true" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  setLanguage(item);
                  const url = new URL(window.location.href);
                  url.searchParams.set("lang", item.toLowerCase());
                  window.history.replaceState(null, "", url);
                }}
              >
                {item}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <section className="cards-chapter cards-project-chapter" aria-labelledby="cards-title">
        <div className="cards-atmosphere" aria-hidden="true">
          <img className="cards-model" src="/cards/velum/model-back.jpeg" alt="" decoding="async" />
        </div>
        <div className="cards-glass-drops" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cards-copy">
          <p>{t.kicker}</p>
          <h1 id="cards-title">{t.title}</h1>
          <span>{t.text}</span>
          <em>{t.hint}</em>
        </div>

        <div className="cards-stage">
          <button
            className="cards-active"
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`${t.open}: ${card.title[language]}`}
          >
            <img
              key={card.image}
              src={card.image}
              alt={`VÉLUM — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
            />
            <span>{t.open} ↗</span>
          </button>
        </div>

        <div
          className="cards-index"
          aria-label={t.list}
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
            let nextIndex = activeCard;
            let nearestDistance = Number.POSITIVE_INFINITY;
            buttons.forEach((button, index) => {
              const bounds = button.getBoundingClientRect();
              const distance = Math.abs(event.clientY - (bounds.top + bounds.height / 2));
              if (distance < nearestDistance) {
                nearestDistance = distance;
                nextIndex = index;
              }
            });
            if (nextIndex !== activeCard) setActiveCard(nextIndex);
          }}
        >
          {velumCards.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={index === activeCard ? "is-active" : ""}
              aria-pressed={index === activeCard}
              onPointerEnter={() => setActiveCard(index)}
              onFocus={() => setActiveCard(index)}
              onClick={() => setActiveCard(index)}
            >
              <span>{item.number}</span>
              <strong>{item.title[language]}</strong>
            </button>
          ))}
        </div>
      </section>

      {isLightboxOpen && (
        <div
          className="cards-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`VÉLUM — ${card.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button ref={lightboxCloseRef} className="cards-lightbox-close" type="button" onClick={() => setIsLightboxOpen(false)}>
            <span>{t.close}</span><i aria-hidden="true">×</i>
          </button>
          <img src={card.image} alt={`VÉLUM — ${card.title[language]}`} width="1800" height="2400" />
          <div className="cards-lightbox-caption">
            <span>{card.number} / 08</span>
            <strong>{card.title[language]}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
