"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { useCardSwap } from "../use-card-swap";
import { useLanguageQuerySync } from "../use-language-query";
import { typographicCopy, typographicText } from "../../typography";

export type CraftedCardsLanguage = "RU" | "EN";

const craftedCards = [
  { number: "01", image: "/cards/crafted/01.webp", title: { RU: "Знакомство", EN: "Introduction" } },
  { number: "02", image: "/cards/crafted/02.webp", title: { RU: "Внутреннее устройство", EN: "Inside out" } },
  { number: "03", image: "/cards/crafted/03.webp", title: { RU: "Материалы", EN: "Materials" } },
  { number: "04", image: "/cards/crafted/04.webp", title: { RU: "Цветовая система", EN: "Color system" } },
  { number: "05", image: "/cards/crafted/05.webp", title: { RU: "Размеры", EN: "Dimensions" } },
  { number: "06", image: "/cards/crafted/06.webp", title: { RU: "Рабочий контекст", EN: "Workspace" } },
  { number: "07", image: "/cards/crafted/07.webp", title: { RU: "Детали", EN: "Details" } },
  { number: "08", image: "/cards/crafted/08.webp", title: { RU: "Финальные детали", EN: "Final details" } },
] as const;

const copy = {
  RU: {
    skip: "Перейти к серии",
    back: "К главе карточек",
    navigation: "Навигация по миру CRAFTED",
    kicker: "Карточки товара · серия 02",
    title: "CRAFTED",
    statement: "Создана для фокуса",
    text: "Восемь карточек показывают клавиатуру как точную систему — от материалов и цветовых вариаций до размеров, рабочего контекста и деталей.",
    controls: "Восемь экранов · выбери клавишу",
    open: "Открыть крупно",
    close: "Закрыть",
    previous: "Предыдущая карточка",
    next: "Следующая карточка",
    list: "Карточки CRAFTED",
    layout: "компоновка",
    width: "ширина",
    angle: "угол",
  },
  EN: {
    skip: "Skip to the series",
    back: "Back to product cards",
    navigation: "CRAFTED world navigation",
    kicker: "Product cards · series 02",
    title: "CRAFTED",
    statement: "Designed for focus",
    text: "Eight cards present the keyboard as a precise system — from materials and colour variations to dimensions, workspace and refined details.",
    controls: "Eight screens · choose a key",
    open: "Open full size",
    close: "Close",
    previous: "Previous card",
    next: "Next card",
    list: "CRAFTED cards",
    layout: "layout",
    width: "width",
    angle: "angle",
  },
} as const;

export default function CraftedCardsClient({ initialLanguage }: { initialLanguage: CraftedCardsLanguage }) {
  const [language, setLanguage] = useState<CraftedCardsLanguage>(initialLanguage);
  useLanguageQuerySync(setLanguage);
  const {
    activeIndex: activeCard,
    previousIndex: previousCardIndex,
    selectIndex: selectCard,
    selectRelative: selectRelativeCard,
    queueIndex: queueCard,
    cancelQueuedIndex: cancelQueuedCard,
  } = useCardSwap(craftedCards.length);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const t = typographicCopy(copy[language], language);
  const card = craftedCards[activeCard];
  const previousCard = previousCardIndex === null ? null : craftedCards[previousCardIndex];
  const langQuery = language.toLowerCase();

  useEffect(() => {
    document.documentElement.lang = langQuery;
  }, [langQuery]);

  useEffect(() => {
    const nextImage = new window.Image();
    nextImage.src = craftedCards[(activeCard + 1) % craftedCards.length].image;
  }, [activeCard]);

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
    <main className="crafted-world">
      <a className="skip-link" href="#crafted-series">{t.skip}</a>
      <header className="crafted-header">
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
                href={`/cards/crafted?lang=${item.toLowerCase()}`}
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

      <section className="crafted-deck" id="crafted-series" aria-labelledby="crafted-title">
        <div className="crafted-copy">
          <p>{t.kicker}</p>
          <h1 id="crafted-title">{t.title}</h1>
          <strong>{t.statement}</strong>
          <span>{t.text}</span>
          <dl className="crafted-specs" aria-label={language === "RU" ? "Характеристики клавиатуры" : "Keyboard specifications"}>
            <div><dt>{t.layout}</dt><dd>75%</dd></div>
            <div><dt>{t.width}</dt><dd>322 mm</dd></div>
            <div><dt>{t.angle}</dt><dd>7°</dd></div>
          </dl>
        </div>

        <div className="crafted-stage">
          <div className="crafted-stage-plate" aria-hidden="true" />
          <button
            className="crafted-active"
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
              alt={`CRAFTED — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
              fetchPriority={activeCard === 0 ? "high" : "auto"}
            />
            <span>{t.open} <i className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></span>
          </button>
        </div>

        <div className="crafted-control-panel">
          <p>{t.controls}</p>
          <div className="crafted-key-grid" role="group" aria-label={t.list}>
            {craftedCards.map((item, index) => (
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
        </div>
      </section>

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="crafted-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`CRAFTED — ${card.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <button ref={lightboxCloseRef} className="crafted-lightbox-close" type="button" onClick={() => setIsLightboxOpen(false)}>
            <span>{t.close}</span><i aria-hidden="true">×</i>
          </button>
          <button className="crafted-lightbox-step crafted-lightbox-previous" type="button" onClick={() => selectRelativeCard(-1)} aria-label={t.previous}><span className="ui-arrow ui-arrow-left" aria-hidden="true" /></button>
          <img className="card-swap-single" key={card.image} src={card.image} alt={`CRAFTED — ${card.title[language]}`} width="1800" height="2400" />
          <button className="crafted-lightbox-step crafted-lightbox-next" type="button" onClick={() => selectRelativeCard(1)} aria-label={t.next}><span className="ui-arrow ui-arrow-right" aria-hidden="true" /></button>
          <div className="crafted-lightbox-caption">
            <span>{card.number} / 08</span>
            <strong>{typographicText(card.title[language], language)}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
