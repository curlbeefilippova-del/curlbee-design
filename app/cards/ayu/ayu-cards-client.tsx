"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";

export type AyuCardsLanguage = "RU" | "EN";

const ayuCards = [
  { number: "01", image: "/cards/ayu/01.webp", title: { RU: "Знакомство", EN: "Meeting" } },
  { number: "02", image: "/cards/ayu/02.webp", title: { RU: "Что такое AYU", EN: "What is AYU" } },
  { number: "03", image: "/cards/ayu/03.webp", title: { RU: "Присутствие в жизни", EN: "Presence in life" } },
  { number: "04", image: "/cards/ayu/04.webp", title: { RU: "Анатомия", EN: "Anatomy" } },
  { number: "05", image: "/cards/ayu/05.webp", title: { RU: "Внутри AYU", EN: "Inside AYU" } },
  { number: "06", image: "/cards/ayu/06.webp", title: { RU: "Логика взаимодействия", EN: "Interaction logic" } },
  { number: "07", image: "/cards/ayu/07.webp", title: { RU: "Система движения", EN: "Movement system" } },
  { number: "08", image: "/cards/ayu/08.webp", title: { RU: "Материалы и оболочка", EN: "Materials and skin" } },
  { number: "09", image: "/cards/ayu/09.webp", title: { RU: "Возвращение к тебе", EN: "Closing" } },
] as const;

const moods = [
  {
    key: "quiet",
    image: "/cards/ayu/mood-quiet.webp",
    label: { RU: "Тихое присутствие", EN: "Quiet presence" },
  },
  {
    key: "plum",
    image: "/cards/ayu/mood-plum.webp",
    label: { RU: "Тёплый отклик", EN: "Warm response" },
  },
  {
    key: "night",
    image: "/cards/ayu/mood-night.webp",
    label: { RU: "Ночное присутствие", EN: "Night presence" },
  },
] as const;

const phases = [
  { label: { RU: "Знакомство", EN: "Meeting" }, cards: [0, 1, 2] },
  { label: { RU: "Устройство", EN: "Form" }, cards: [3, 4, 5] },
  { label: { RU: "Присутствие", EN: "Presence" }, cards: [6, 7, 8] },
] as const;

const copy = {
  RU: {
    skip: "Перейти к серии",
    back: "К главе карточек",
    navigation: "Навигация по миру AYU",
    kicker: "Карточки товара · серия 05",
    statementTop: "Почти из будущего.",
    statementBottom: "Совсем рядом.",
    text: "Девять карточек раскрывают AYU через характер, форму, движение и прикосновение — как технологию, которая умеет быть рядом и не требует внимания.",
    state: "Состояние среды",
    chapters: "Девять состояний контакта",
    open: "Открыть крупно",
    close: "Закрыть",
    previous: "Предыдущая карточка",
    next: "Следующая карточка",
    list: "Карточки AYU",
  },
  EN: {
    skip: "Skip to the series",
    back: "Back to product cards",
    navigation: "AYU world navigation",
    kicker: "Product cards · series 05",
    statementTop: "Almost from the future.",
    statementBottom: "Right beside you.",
    text: "Nine cards reveal AYU through character, form, movement and touch — a technology that knows how to stay close without demanding attention.",
    state: "Ambient state",
    chapters: "Nine states of connection",
    open: "Open full size",
    close: "Close",
    previous: "Previous card",
    next: "Next card",
    list: "AYU cards",
  },
} as const;

export default function AyuCardsClient({ initialLanguage }: { initialLanguage: AyuCardsLanguage }) {
  const [language, setLanguage] = useState<AyuCardsLanguage>(initialLanguage);
  const [activeCard, setActiveCard] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxCloseRef = useRef<HTMLButtonElement>(null);
  const t = copy[language];
  const card = ayuCards[activeCard];
  const moodIndex = Math.min(moods.length - 1, Math.floor(activeCard / 3));
  const mood = moods[moodIndex];
  const langQuery = language.toLowerCase();

  const selectRelativeCard = (direction: number) => {
    setActiveCard((current) => (current + direction + ayuCards.length) % ayuCards.length);
  };

  const respondToPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const stage = stageRef.current;
    if (!stage) return;
    const bounds = stage.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    stage.style.setProperty("--ayu-pointer-x", `${x * 100}%`);
    stage.style.setProperty("--ayu-pointer-y", `${y * 100}%`);
    stage.style.setProperty("--ayu-tilt-x", `${(0.5 - y) * 3.2}deg`);
    stage.style.setProperty("--ayu-tilt-y", `${(x - 0.5) * 3.8}deg`);
  };

  const resetPointerResponse = () => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--ayu-pointer-x", "54%");
    stage.style.setProperty("--ayu-pointer-y", "48%");
    stage.style.setProperty("--ayu-tilt-x", "0deg");
    stage.style.setProperty("--ayu-tilt-y", "0deg");
  };

  useEffect(() => {
    document.documentElement.lang = langQuery;
  }, [langQuery]);

  useEffect(() => {
    const nextCard = new window.Image();
    nextCard.src = ayuCards[(activeCard + 1) % ayuCards.length].image;
    const nextMood = new window.Image();
    nextMood.src = moods[(moodIndex + 1) % moods.length].image;
  }, [activeCard, moodIndex]);

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

    window.addEventListener("keydown", handleLightboxKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKeys);
      previousFocus?.focus();
    };
  }, [isLightboxOpen]);

  return (
    <main className={`ayu-world ayu-world--${mood.key}`}>
      <a className="skip-link" href="#ayu-series">{t.skip}</a>
      <header className="ayu-header">
        <a className="case-brand" href={`/?lang=${langQuery}#cards`} aria-label="Curlbee Design">
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </a>
        <nav aria-label={t.navigation}>
          <a className="case-back" href={`/?lang=${langQuery}#cards`}><span aria-hidden="true">←</span>{t.back}</a>
          <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            {(["RU", "EN"] as const).map((item) => (
              <a
                key={item}
                href={`/cards/ayu?lang=${item.toLowerCase()}`}
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

      <section className="ayu-deck" id="ayu-series" aria-labelledby="ayu-title">
        <div className="ayu-atmosphere" aria-hidden="true">
          <img key={mood.image} src={mood.image} alt="" width="1086" height="1448" />
        </div>

        <div className="ayu-copy">
          <p>{t.kicker}</p>
          <h1 id="ayu-title">AYU</h1>
          <strong><span>{t.statementTop}</span><em>{t.statementBottom}</em></strong>
          <span>{t.text}</span>
          <div className="ayu-mood-readout" aria-live="polite">
            <small>{t.state} · 0{moodIndex + 1}</small>
            <b>{mood.label[language]}</b>
          </div>
        </div>

        <div
          ref={stageRef}
          className="ayu-stage"
          onPointerMove={respondToPointer}
          onPointerLeave={resetPointerResponse}
        >
          <button
            className="ayu-active"
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label={`${t.open}: ${card.title[language]}`}
          >
            <img
              key={card.image}
              src={card.image}
              alt={`AYU — ${card.title[language]}`}
              width="1800"
              height="2400"
              decoding="async"
              fetchPriority={activeCard === 0 ? "high" : "auto"}
            />
            <span>{t.open} <i aria-hidden="true">↗</i></span>
          </button>
        </div>

        <nav
          className="ayu-navigation"
          aria-label={t.list}
          style={{
            "--ayu-active-card": activeCard,
            "--ayu-active-column": activeCard % 3,
            "--ayu-active-row": Math.floor(activeCard / 3),
          } as CSSProperties}
        >
          <div className="ayu-navigation-top">
            <p>{t.chapters}</p>
            <span>{card.number} / 09</span>
          </div>
          <div className="ayu-signal-rail">
            <i className="ayu-navigation-pulse" aria-hidden="true" />
            {ayuCards.map((item, cardIndex) => (
              <button
                type="button"
                key={item.number}
                className={cardIndex === activeCard ? "is-active" : ""}
                aria-pressed={cardIndex === activeCard}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setActiveCard(cardIndex);
                }}
                onFocus={() => setActiveCard(cardIndex)}
                onClick={() => setActiveCard(cardIndex)}
              >
                <small>{item.number}</small>
                <strong>{item.title[language]}</strong>
              </button>
            ))}
          </div>
          <div className="ayu-navigation-phases" aria-hidden="true">
            {phases.map((phase, phaseIndex) => (
              <span key={phase.label.EN}>0{phaseIndex + 1} · {phase.label[language]}</span>
            ))}
          </div>
        </nav>
      </section>

      {isLightboxOpen && (
        <div
          ref={lightboxRef}
          className="ayu-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`AYU — ${card.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsLightboxOpen(false);
          }}
        >
          <div className="ayu-lightbox-atmosphere" aria-hidden="true">
            <img key={mood.image} src={mood.image} alt="" width="1086" height="1448" />
          </div>
          <button ref={lightboxCloseRef} className="ayu-lightbox-close" type="button" onClick={() => setIsLightboxOpen(false)}>
            <span>{t.close}</span><i aria-hidden="true">×</i>
          </button>
          <button className="ayu-lightbox-step ayu-lightbox-previous" type="button" onClick={() => selectRelativeCard(-1)} aria-label={t.previous}>←</button>
          <img key={card.image} src={card.image} alt={`AYU — ${card.title[language]}`} width="1800" height="2400" />
          <button className="ayu-lightbox-step ayu-lightbox-next" type="button" onClick={() => selectRelativeCard(1)} aria-label={t.next}>→</button>
          <div className="ayu-lightbox-caption">
            <span>{card.number} / 09</span>
            <strong>{card.title[language]}</strong>
          </div>
        </div>
      )}
    </main>
  );
}
