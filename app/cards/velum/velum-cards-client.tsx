"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useCardSwap } from "../use-card-swap";
import { useLanguageQuerySync } from "../use-language-query";
import { typographicCopy, typographicText } from "../../typography";

export type CardsLanguage = "RU" | "EN";

const velumCards = [
  { number: "01", image: "/cards/velum/01.webp", title: { RU: "Главный экран", EN: "Hero card" } },
  { number: "02", image: "/cards/velum/02.webp", title: { RU: "Почему VÉLUM", EN: "Why VÉLUM" } },
  { number: "03", image: "/cards/velum/03.webp", title: { RU: "Формула", EN: "Formula" } },
  { number: "04", image: "/cards/velum/04.webp", title: { RU: "Состав", EN: "Ingredients" } },
  { number: "05", image: "/cards/velum/05.webp", title: { RU: "Способ применения", EN: "How to use" } },
  { number: "06", image: "/cards/velum/06.webp", title: { RU: "Результат", EN: "Result" } },
  { number: "07", image: "/cards/velum/07.webp", title: { RU: "Ценности", EN: "Values" } },
  { number: "08", image: "/cards/velum/08.webp", title: { RU: "Финальный образ", EN: "Final image" } },
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
    previous: "Предыдущая карточка",
    next: "Следующая карточка",
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
    previous: "Previous card",
    next: "Next card",
    list: "VÉLUM cards",
  },
} as const;

export default function VelumCardsClient({ initialLanguage }: { initialLanguage: CardsLanguage }) {
  const [language, setLanguage] = useState<CardsLanguage>(initialLanguage);
  useLanguageQuerySync(setLanguage);
  const {
    activeIndex: activeCard,
    previousIndex: previousCardIndex,
    selectIndex: selectCard,
    selectRelative: selectRelativeCard,
    queueIndex: queueCard,
    cancelQueuedIndex: cancelQueuedCard,
  } = useCardSwap(velumCards.length);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const t = typographicCopy(copy[language], language);
  const card = velumCards[activeCard];
  const previousCard = previousCardIndex === null ? null : velumCards[previousCardIndex];
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
    const handleLightboxKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") selectRelativeCard(-1);
      if (event.key === "ArrowRight") selectRelativeCard(1);
      if (event.key === "Tab") {
        const controls = Array.from(lightboxRef.current?.querySelectorAll<HTMLButtonElement>("button") ?? []);
        const firstControl = controls[0];
        const lastControl = controls.at(-1);
        if (event.shiftKey && document.activeElement === firstControl) {
          event.preventDefault();
          lastControl?.focus();
        } else if (!event.shiftKey && document.activeElement === lastControl) {
          event.preventDefault();
          firstControl?.focus();
        }
      }
    };
    window.addEventListener("keydown", handleLightboxKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKeys);
      previousFocus?.focus();
    };
  }, [isLightboxOpen, selectRelativeCard]);

  return (
    <main className="cards-world-page">
      <header className="cards-world-header">
        <a className="case-brand" href={`/?lang=${langQuery}#cards`} aria-label="Curlbee Design">
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </a>
        <nav aria-label={t.navigation}>
          <a className="case-back" data-short={language === "RU" ? "Назад" : "Back"} href={`/?lang=${langQuery}#cards`}><span aria-hidden="true" />{t.back}</a>
          <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            {(["RU", "EN"] as const).map((item) => (
              <Fragment key={item}>
                {item === "EN" && <span className="language-divider" aria-hidden="true">/</span>}
                <a
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
              </Fragment>
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
            {previousCard && (
              <img className="card-swap-old" src={previousCard.image} alt="" aria-hidden="true" width="1800" height="2400" />
            )}
            <img
              className="card-swap-current"
              key={card.image}
              src={card.image}
              alt={`VÉLUM — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
              fetchPriority={activeCard === 0 ? "high" : "auto"}
            />
            <span>{t.open} <i className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></span>
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
            if (nextIndex !== activeCard) queueCard(nextIndex);
          }}
          onPointerLeave={cancelQueuedCard}
        >
          {velumCards.map((item, index) => (
            <button
              type="button"
              key={item.number}
              className={index === activeCard ? "is-active" : ""}
              aria-pressed={index === activeCard}
              onPointerEnter={(event) => {
                if (event.pointerType !== "touch") queueCard(index);
              }}
              onPointerLeave={cancelQueuedCard}
              onFocus={() => selectCard(index)}
              onClick={() => selectCard(index)}
            >
              <span>{item.number}</span>
              <strong>{typographicText(item.title[language], language)}</strong>
            </button>
          ))}
        </div>
      </section>

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
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
          <button className="cards-lightbox-step cards-lightbox-previous" type="button" onClick={() => selectRelativeCard(-1)} aria-label={t.previous}><span className="ui-arrow ui-arrow-left" aria-hidden="true" /></button>
          <img className="card-swap-single" key={card.image} src={card.image} alt={`VÉLUM — ${card.title[language]}`} width="1800" height="2400" />
          <button className="cards-lightbox-step cards-lightbox-next" type="button" onClick={() => selectRelativeCard(1)} aria-label={t.next}><span className="ui-arrow ui-arrow-right" aria-hidden="true" /></button>
          <div className="cards-lightbox-caption">
            <span>{card.number} / 08</span>
            <strong>{typographicText(card.title[language], language)}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
