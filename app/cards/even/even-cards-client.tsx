"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useCardSwap } from "../use-card-swap";
import { typographicCopy, typographicText } from "../../typography";

export type EvenCardsLanguage = "RU" | "EN";

const evenCards = [
  { number: "01", image: "/cards/even/01.webp", title: { RU: "EVEN", EN: "EVEN" }, tone: "cream" },
  { number: "02", image: "/cards/even/02.webp", title: { RU: "Свободный крой", EN: "Oversized hoodie" }, tone: "plum" },
  { number: "03", image: "/cards/even/03.webp", title: { RU: "Силуэт", EN: "Silhouette" }, tone: "cream" },
  { number: "04", image: "/cards/even/04.webp", title: { RU: "На каждый день", EN: "For everyday" }, tone: "cream" },
  { number: "05", image: "/cards/even/05.webp", title: { RU: "Plum & Cream", EN: "Plum & Cream" }, tone: "plum" },
  { number: "06", image: "/cards/even/06.webp", title: { RU: "Конструкция", EN: "Construction" }, tone: "cream" },
  { number: "07", image: "/cards/even/07.webp", title: { RU: "Плотный хлопок", EN: "Heavyweight cotton" }, tone: "plum" },
  { number: "08", image: "/cards/even/08.webp", title: { RU: "Комфорт в деталях", EN: "Made to feel right" }, tone: "plum" },
  { number: "09", image: "/cards/even/09.webp", title: { RU: "Размерная сетка", EN: "Size guide" }, tone: "cream" },
  { number: "10", image: "/cards/even/10.webp", title: { RU: "Детали", EN: "Details" }, tone: "plum" },
  { number: "11", image: "/cards/even/11.webp", title: { RU: "Для каждого", EN: "For everyone" }, tone: "cream" },
] as const;

const chapters = [
  { key: "silhouette", start: 0, end: 3, label: { RU: "Силуэт", EN: "Silhouette" } },
  { key: "material", start: 4, end: 7, label: { RU: "Материал", EN: "Material" } },
  { key: "details", start: 8, end: 10, label: { RU: "Детали", EN: "Details" } },
] as const;

const copy = {
  RU: {
    skip: "Перейти к серии",
    back: "К главе карточек",
    navigation: "Навигация по миру EVEN",
    kicker: "Карточки товара · серия 01",
    statementTop: "Одежда для каждого.",
    statementBottom: "Характер — твой.",
    text: "Один гардероб раскрывается через силуэт, материал и детали. Два оттенка, свободная посадка и вещи, которым не нужно делить людей на категории.",
    frames: "Одиннадцать кадров коллекции",
    open: "Открыть крупно",
    close: "Закрыть",
    previous: "Предыдущая карточка",
    next: "Следующая карточка",
    list: "Карточки EVEN",
  },
  EN: {
    skip: "Skip to the series",
    back: "Back to product cards",
    navigation: "EVEN world navigation",
    kicker: "Product cards · series 01",
    statementTop: "Clothing for everyone.",
    statementBottom: "Character is yours.",
    text: "One wardrobe unfolds through silhouette, material and detail. Two tones, an easy fit and pieces that do not need to divide people into categories.",
    frames: "Eleven collection frames",
    open: "Open full size",
    close: "Close",
    previous: "Previous card",
    next: "Next card",
    list: "EVEN cards",
  },
} as const;

function getChapterIndex(cardIndex: number) {
  if (cardIndex < 4) return 0;
  if (cardIndex < 8) return 1;
  return 2;
}

export default function EvenCardsClient({ initialLanguage }: { initialLanguage: EvenCardsLanguage }) {
  const [language, setLanguage] = useState<EvenCardsLanguage>(initialLanguage);
  const {
    activeIndex: activeCard,
    previousIndex: previousCardIndex,
    selectIndex: selectCard,
    selectRelative: selectRelativeCard,
    queueIndex: queueCard,
    cancelQueuedIndex: cancelQueuedCard,
  } = useCardSwap(evenCards.length);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const t = typographicCopy(copy[language], language);
  const card = evenCards[activeCard];
  const previousCard = previousCardIndex === null ? null : evenCards[previousCardIndex];
  const chapterIndex = getChapterIndex(activeCard);
  const chapter = chapters[chapterIndex];
  const langQuery = language.toLowerCase();

  const respondToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    stage.style.setProperty("--even-light-x", `${24 + x * 52}%`);
    stage.style.setProperty("--even-light-y", `${18 + y * 58}%`);
    stage.style.setProperty("--even-tilt-x", `${(0.5 - y) * 2.4}deg`);
    stage.style.setProperty("--even-tilt-y", `${(x - 0.5) * 2.8}deg`);
  };

  const resetPointerResponse = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--even-light-x", "58%");
    stage.style.setProperty("--even-light-y", "42%");
    stage.style.setProperty("--even-tilt-x", "0deg");
    stage.style.setProperty("--even-tilt-y", "0deg");
  };

  useEffect(() => {
    document.documentElement.lang = langQuery;
  }, [langQuery]);

  useEffect(() => {
    const next = new window.Image();
    next.src = evenCards[(activeCard + 1) % evenCards.length].image;
  }, [activeCard]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => lightboxCloseRef.current?.focus());

    const handleKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsLightboxOpen(false);
      if (event.key === "ArrowLeft") selectRelativeCard(-1);
      if (event.key === "ArrowRight") selectRelativeCard(1);
      if (event.key !== "Tab") return;

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
    };

    window.addEventListener("keydown", handleKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeys);
      previousFocus?.focus();
    };
  }, [isLightboxOpen, selectRelativeCard]);

  return (
    <main className={`even-world even-world--${chapter.key}`}>
      <a className="skip-link" href="#even-series">{t.skip}</a>
      <header className="even-header">
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
                href={`/cards/even?lang=${item.toLowerCase()}`}
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

      <section className="even-deck" id="even-series" aria-labelledby="even-title">
        <div className="even-atmosphere" aria-hidden="true">
          <div className="even-atmosphere-cream" />
          <img className="even-atmosphere-light" src="/cards/even/light-cream.webp" alt="" width="1086" height="1448" />
          <img className="even-atmosphere-plum" src="/cards/even/fold-plum.webp" alt="" width="1086" height="1448" />
        </div>

        <div className="even-copy">
          <p>{t.kicker}</p>
          <h1 id="even-title">EVEN</h1>
          <strong><span>{t.statementTop}</span><em>{t.statementBottom}</em></strong>
          <span>{t.text}</span>
        </div>

        <div
          ref={stageRef}
          className="even-stage"
          onPointerMove={respondToPointer}
          onPointerLeave={resetPointerResponse}
        >
          <button
            className="even-active"
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
              alt={`EVEN — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
              fetchPriority={activeCard === 0 ? "high" : "auto"}
            />
            <span>{t.open}<i className="ui-arrow ui-arrow-up-right" aria-hidden="true" /></span>
          </button>
        </div>

        <nav className="even-navigation" aria-label={t.list}>
          <p>{t.frames}</p>
          <div className="even-runway-groups">
            {chapters.map((chapterItem, groupIndex) => (
              <div className={`even-runway-group ${groupIndex === chapterIndex ? "is-current" : ""}`} key={chapterItem.key}>
                <div className="even-runway-heading">
                  <small>0{groupIndex + 1}</small>
                  <strong>{chapterItem.label[language]}</strong>
                </div>
                <div className="even-runway-list">
                  {evenCards.slice(chapterItem.start, chapterItem.end + 1).map((item, localIndex) => {
                    const index = chapterItem.start + localIndex;
                    return (
                      <button
                        key={item.number}
                        type="button"
                        className={index === activeCard ? "is-active" : ""}
                        aria-pressed={index === activeCard}
                        onPointerEnter={(event) => {
                          if (event.pointerType !== "touch") queueCard(index);
                        }}
                        onPointerLeave={cancelQueuedCard}
                        onFocus={() => selectCard(index)}
                        onClick={() => selectCard(index)}
                      >
                        <small>{item.number}</small>
                        <strong>{typographicText(item.title[language], language)}</strong>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </section>

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className={`even-lightbox even-lightbox--${card.tone}`}
          role="dialog"
          aria-modal="true"
          aria-label={`EVEN — ${card.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <div className="even-lightbox-material" aria-hidden="true" />
          <button ref={lightboxCloseRef} className="even-lightbox-close" type="button" onClick={() => setIsLightboxOpen(false)}>
            <span>{t.close}</span><i aria-hidden="true">×</i>
          </button>
          <button className="even-lightbox-step even-lightbox-previous" type="button" onClick={() => selectRelativeCard(-1)} aria-label={t.previous}><span className="ui-arrow ui-arrow-left" aria-hidden="true" /></button>
          <img className="card-swap-single" key={card.image} src={card.image} alt={`EVEN — ${card.title[language]}`} width="1800" height="2400" />
          <button className="even-lightbox-step even-lightbox-next" type="button" onClick={() => selectRelativeCard(1)} aria-label={t.next}><span className="ui-arrow ui-arrow-right" aria-hidden="true" /></button>
          <div className="even-lightbox-caption">
            <span>{card.number} / 11</span>
            <strong>{typographicText(card.title[language], language)}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
