"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import CardsWorldHeader from "../cards-world-header";
import { useCardSwap } from "../use-card-swap";
import { useCardsLightbox } from "../use-cards-lightbox";
import CardsLightboxZoom from "../cards-lightbox-zoom";
import { useLanguageQuerySync } from "../use-language-query";
import { typographicCopy, typographicText } from "../../typography";

export type MinimalistCardsLanguage = "RU" | "EN";

const minimalistCards = [
  { number: "01", image: "/cards/minimalist-skincare/01.webp", title: { RU: "Чистая кожа", EN: "Clear skin" } },
  { number: "02", image: "/cards/minimalist-skincare/02.webp", title: { RU: "Проблема", EN: "The concern" } },
  { number: "03", image: "/cards/minimalist-skincare/03.webp", title: { RU: "Решение", EN: "The result" } },
  { number: "04", image: "/cards/minimalist-skincare/04.webp", title: { RU: "Текстура и состав", EN: "Texture and formula" } },
  { number: "05", image: "/cards/minimalist-skincare/05.webp", title: { RU: "Активные компоненты", EN: "Active ingredients" } },
  { number: "06", image: "/cards/minimalist-skincare/06.webp", title: { RU: "Главный актив", EN: "Hero active" } },
  { number: "07", image: "/cards/minimalist-skincare/07.webp", title: { RU: "Почему этот продукт", EN: "Why this product" } },
  { number: "08", image: "/cards/minimalist-skincare/08.webp", title: { RU: "Этап очищения", EN: "Cleansing step" } },
  { number: "09", image: "/cards/minimalist-skincare/09.webp", title: { RU: "LIFESTYLE", EN: "LIFESTYLE" } },
] as const;

const copy = {
  RU: {
    skip: "Перейти к серии",
    back: "К главе карточек",
    navigation: "Навигация по миру MINIMALIST SKINCARE",
    kicker: "Карточки товара · серия 05",
    titleTop: "MINIMALIST",
    titleBottom: "SKINCARE",
    statement: "Чистота без лишнего",
    text: "Девять карточек раскрывают пенку для умывания через состояние кожи, активные компоненты, текстуру и ежедневный ритуал очищения.",
    controls: "Серия · девять экранов",
    open: "Открыть крупно",
    close: "Закрыть",
    previous: "Предыдущая карточка",
    next: "Следующая карточка",
    list: "Карточки MINIMALIST SKINCARE",
  },
  EN: {
    skip: "Skip to the series",
    back: "Back to product cards",
    navigation: "MINIMALIST SKINCARE world navigation",
    kicker: "Product cards · series 05",
    titleTop: "MINIMALIST",
    titleBottom: "SKINCARE",
    statement: "Clarity without excess",
    text: "Nine cards reveal the cleansing foam through skin states, active ingredients, texture and the everyday cleansing ritual.",
    controls: "Series · nine screens",
    open: "Open full size",
    close: "Close",
    previous: "Previous card",
    next: "Next card",
    list: "MINIMALIST SKINCARE cards",
  },
} as const;

export default function MinimalistCardsClient({ initialLanguage }: { initialLanguage: MinimalistCardsLanguage }) {
  const [language, setLanguage] = useState<MinimalistCardsLanguage>(initialLanguage);
  useLanguageQuerySync(language, setLanguage);
  const {
    activeIndex: activeCard,
    previousIndex: previousCardIndex,
    selectIndex: selectCard,
    selectRelative: selectRelativeCard,
  } = useCardSwap(minimalistCards.length);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const {
    dialogRef: lightboxRef,
    closeButtonRef: lightboxCloseRef,
  } = useCardsLightbox(isLightboxOpen, setIsLightboxOpen, selectRelativeCard);
  const t = typographicCopy(copy[language], language);
  const card = minimalistCards[activeCard];
  const previousCard = previousCardIndex === null ? null : minimalistCards[previousCardIndex];
  useEffect(() => {
    const next = minimalistCards[(activeCard + 1) % minimalistCards.length];
    const nextCard = new window.Image();
    nextCard.src = next.image;
  }, [activeCard]);

  return (
    <main className={`minimalist-world${activeCard === 8 ? " is-lifestyle" : ""}`}>
      <a className="skip-link" href="#minimalist-series">{t.skip}</a>
      <CardsWorldHeader
        backLabel={t.back}
        className="minimalist-header"
        language={language}
        navigationLabel={t.navigation}
        setLanguage={setLanguage}
        slug="minimalist-skincare"
      />

      <section className="minimalist-deck" id="minimalist-series" aria-labelledby="minimalist-title">
        <div className="minimalist-copy">
          <p>{t.kicker}</p>
          <h1 id="minimalist-title"><span>{t.titleTop}</span><em>{t.titleBottom}</em></h1>
          <strong>{t.statement}</strong>
          <span>{t.text}</span>
        </div>

        <div className="minimalist-stage">
          <button
            className="minimalist-active"
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`${t.open}: ${card.title[language]}`}
          >
            {previousCard && (
              <img
                className="card-swap-old"
                src={previousCard.image}
                alt=""
                aria-hidden="true"
                width="1800"
                height="2400"
              />
            )}
            <img
              className="card-swap-current"
              key={card.image}
              src={card.image}
              alt={`MINIMALIST SKINCARE — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
              fetchPriority={activeCard === 0 ? "high" : "auto"}
            />
            <span>{t.open} <i className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></span>
          </button>
        </div>

        <div className="minimalist-controls">
          <p>{t.controls}</p>
          <div
            className="minimalist-index"
            role="group"
            aria-label={t.list}
            style={{ "--minimalist-active-row": activeCard } as CSSProperties}
          >
            <i className="minimalist-water-lens" aria-hidden="true" />
            {minimalistCards.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={index === activeCard ? "is-active" : ""}
                aria-pressed={index === activeCard}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") selectCard(index);
                }}
                onFocus={() => selectCard(index)}
                onClick={() => selectCard(index)}
              >
                <span>{item.number}</span>
                <strong>{typographicText(item.title[language], language)}</strong>
              </button>
            ))}
          </div>
        </div>
      </section>

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="minimalist-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`MINIMALIST SKINCARE — ${card.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button ref={lightboxCloseRef} className="minimalist-lightbox-close" type="button" onClick={() => setIsLightboxOpen(false)}>
            <span>{t.close}</span><i aria-hidden="true">×</i>
          </button>
          <button className="minimalist-lightbox-step minimalist-lightbox-previous" type="button" onClick={() => selectRelativeCard(-1)} aria-label={t.previous}><span className="ui-arrow ui-arrow-left" aria-hidden="true" /></button>
          <CardsLightboxZoom key={card.image} src={card.image} alt={`MINIMALIST SKINCARE — ${card.title[language]}`} language={language} />
          <button className="minimalist-lightbox-step minimalist-lightbox-next" type="button" onClick={() => selectRelativeCard(1)} aria-label={t.next}><span className="ui-arrow ui-arrow-right" aria-hidden="true" /></button>
          <div className="minimalist-lightbox-caption">
            <span>{card.number} / 09</span>
            <strong>{typographicText(card.title[language], language)}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
