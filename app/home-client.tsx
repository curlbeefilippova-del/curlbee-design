"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

export type Language = "RU" | "EN";

const projects = [
  {
    number: "01",
    slug: "even",
    ready: true,
    title: "EVEN",
    kind: { RU: "Айдентика бренда одежды", EN: "Fashion brand identity" },
    image: "/cases/even/01.png",
    color: "#725a72",
    ink: "#f4eee8",
  },
  {
    number: "02",
    slug: "crafted",
    ready: true,
    title: "CRAFTED",
    kind: { RU: "Продуктовая история клавиатуры", EN: "Mechanical keyboard story" },
    image: "/cases/crafted/01.png",
    color: "#59604d",
    ink: "#f4eee8",
  },
  {
    number: "03",
    slug: "velum",
    ready: true,
    title: "VÉLUM",
    kind: { RU: "Айдентика премиального масла для волос", EN: "Premium hair oil identity" },
    image: "/cases/velum/01.png",
    color: "#9a573d",
    ink: "#fff7ef",
  },
  {
    number: "04",
    slug: "minimalist-skincare",
    ready: true,
    title: "MINIMALIST SKINCARE",
    kind: { RU: "Айдентика бренда косметики", EN: "Skincare brand identity" },
    image: "/cases/minimalist-care/01.png",
    color: "#d7ceca",
    ink: "#292526",
  },
  {
    number: "05",
    slug: "ayu",
    ready: true,
    title: "AYU",
    kind: { RU: "AI-компаньон и визуальная система", EN: "AI companion and visual system" },
    image: "/cases/ayu/01.png",
    color: "#d5a345",
    ink: "#292526",
  },
  {
    number: "06",
    slug: "the-chops",
    ready: true,
    title: "THE CHOPS",
    kind: { RU: "Юбилейная кампания для бара", EN: "Anniversary bar campaign" },
    image: "/cases/the-chops/01.png",
    color: "#b85c49",
    ink: "#fff7ef",
  },
] as const;

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
    navWork: "Проекты",
    navCards: "Карточки",
    navContact: "Написать",
    eyebrow: "Юлия Филиппова · visual designer",
    heroOne: "Дизайн,",
    heroTwo: "которому хочется",
    heroThree: "ответить",
    intro: "Собираю бренды, продукты и\u00a0презентации — с\u00a0ясной логикой, живой типографикой и\u00a0характером.",
    status: "Открыта к избранным проектам",
    play: "Проведи курсором — пчела полетит",
    workLabel: "Портфолио · 2026",
    workTitle: "Избранные проекты — у каждого свой характер",
    workTitleMain: ["Избранные", "проекты"],
    workTitleNote: ["У каждого", "свой характер"],
    workHint: ["Наведи или нажми,", "чтобы сменить сцену"],
    caseLabel: "Кейс в портфолио",
    cardsIntroKicker: "Новая глава · карточки товара",
    cardsIntroTitleOne: "Карточки",
    cardsIntroTitleTwo: "товара",
    cardsIntroStatementOne: "Отдельные миры",
    cardsIntroStatementTwo: "внутри одной системы",
    cardsIntroText: "Каждый продукт получает собственную атмосферу, но остаётся частью Curlbee Design.",
    cardsWorldKicker: "Серия 01 · VÉLUM",
    cardsKicker: "Карточки товара · 01",
    cardsTitle: "VÉLUM",
    cardsText: "Восемь карточек раскрывают продукт от\u00a0формулы и\u00a0состава до\u00a0ритуала нанесения и\u00a0финального образа.",
    cardsHint: "Наведи или нажми — карточка выйдет на первый план",
    cardsOpen: "Открыть крупно",
    cardsClose: "Закрыть",
    aboutKicker: "Коротко обо мне",
    aboutTitle: "Люблю, когда система понятная, а результат — с неожиданным поворотом",
    aboutLineOne: "Люблю, когда",
    aboutLineOneEm: "система",
    aboutLineTwo: "понятная, а результат —",
    aboutLineThree: "с неожиданным поворотом",
    aboutText: "Работаю с\u00a0айдентикой, digital-дизайном, презентациями и\u00a0карточками товара. Figma и\u00a0AI помогают быстрее проверять идеи, но характер и\u00a0логика каждого проекта остаются авторскими.",
    footerKicker: "Связаться · Россия / онлайн",
    footerTitleOne: "Сделаем что-то,",
    footerTitleTwo: "что не пролистают?",
    mailLabel: "Написать на почту",
    telegramLabel: "Написать в Telegram",
  },
  EN: {
    navWork: "Projects",
    navCards: "Product cards",
    navContact: "Contact",
    eyebrow: "Yulia Filippova · visual designer",
    heroOne: "Design",
    heroTwo: "that feels worth",
    heroThree: "answering",
    intro: "I build brands, products and presentations with clear logic, living typography and a distinct point of view.",
    status: "Available for selected projects",
    play: "Move your cursor — the bee will fly",
    workLabel: "Portfolio · 2026",
    workTitle: "Selected projects — each has its own personality",
    workTitleMain: ["Selected", "projects"],
    workTitleNote: ["Each has", "its own personality"],
    workHint: ["Hover or tap", "to change the scene"],
    caseLabel: "Portfolio case",
    cardsIntroKicker: "New chapter · product cards",
    cardsIntroTitleOne: "Product",
    cardsIntroTitleTwo: "cards",
    cardsIntroStatementOne: "Distinct worlds",
    cardsIntroStatementTwo: "within one system",
    cardsIntroText: "Each product has its own atmosphere while remaining part of Curlbee Design.",
    cardsWorldKicker: "Series 01 · VÉLUM",
    cardsKicker: "Product cards · 01",
    cardsTitle: "VÉLUM",
    cardsText: "Eight cards reveal the product from formula and ingredients to the application ritual and final image.",
    cardsHint: "Hover or tap — the card will move to the foreground",
    cardsOpen: "Open full size",
    cardsClose: "Close",
    aboutKicker: "A little about me",
    aboutTitle: "I like a system that makes sense — and a result with an unexpected turn",
    aboutLineOne: "I like a",
    aboutLineOneEm: "system",
    aboutLineTwo: "that makes sense —",
    aboutLineThree: "and a result with an unexpected turn",
    aboutText: "I work across identity, digital design, presentations and e-commerce product cards. Figma and AI help me test ideas faster, while the character and logic of every project remain distinctly authored.",
    footerKicker: "Contact · Russia / online",
    footerTitleOne: "Let’s make something",
    footerTitleTwo: "people won’t scroll past",
    mailLabel: "Send an email",
    telegramLabel: "Message me on Telegram",
  },
} as const;

export default function HomeClient({ initialLanguage }: { initialLanguage: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const [activeProject, setActiveProject] = useState(0);
  const [activeVelumCard, setActiveVelumCard] = useState(0);
  const [isVelumLightboxOpen, setIsVelumLightboxOpen] = useState(false);
  const companionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const projectStageRef = useRef<HTMLDivElement>(null);
  const cardsBridgeRef = useRef<HTMLElement>(null);
  const cardsLightboxCloseRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef({ x: -80, y: -80, followX: -80, followY: -80, lastX: -80, lastY: -80, angle: 0 });
  const t = copy[language];
  const project = projects[activeProject];
  const velumCard = velumCards[activeVelumCard];

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  useEffect(() => {
    if (!isVelumLightboxOpen) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => cardsLightboxCloseRef.current?.focus());
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVelumLightboxOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
      previousFocus?.focus();
    };
  }, [isVelumLightboxOpen]);

  useEffect(() => {
    const companion = companionRef.current;
    if (!companion || window.matchMedia("(pointer: coarse)").matches) return;

    const paint = () => {
      const point = pointRef.current;
      const dx = point.x - point.followX;
      const dy = point.y - point.followY;
      point.followX += dx * 0.18;
      point.followY += dy * 0.18;

      const velocityX = point.followX - point.lastX;
      const velocityY = point.followY - point.lastY;
      if (Math.hypot(velocityX, velocityY) > 0.08) {
        point.angle = Math.atan2(velocityY, velocityX) * (180 / Math.PI) + 90;
      }

      companion.style.setProperty("--cursor-x", `${point.followX}px`);
      companion.style.setProperty("--cursor-y", `${point.followY}px`);
      companion.style.setProperty("--cursor-angle", `${point.angle}deg`);
      companion.style.setProperty("--bee-speed", `${Math.min(1, Math.hypot(dx, dy) / 110)}`);
      companion.dataset.moving = Math.hypot(dx, dy) > 2 ? "true" : "false";
      point.lastX = point.followX;
      point.lastY = point.followY;

      if (Math.hypot(dx, dy) > 0.35) frameRef.current = requestAnimationFrame(paint);
      else frameRef.current = null;
    };

    const move = (event: PointerEvent) => {
      const firstMove = companion.dataset.visible !== "true";
      pointRef.current.x = event.clientX;
      pointRef.current.y = event.clientY;
      if (firstMove) {
        pointRef.current.followX = event.clientX - 24;
        pointRef.current.followY = event.clientY + 14;
        pointRef.current.lastX = pointRef.current.followX;
        pointRef.current.lastY = pointRef.current.followY;
      }
      companion.dataset.visible = "true";
      companion.dataset.hover = (event.target as Element | null)?.closest("a, button") ? "true" : "false";

      const hero = heroRef.current;
      if (hero) {
        const rect = hero.getBoundingClientRect();
        hero.style.setProperty("--mouse-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
        hero.style.setProperty("--mouse-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
      }

      if (frameRef.current === null) frameRef.current = requestAnimationFrame(paint);
    };

    const hide = () => { companion.dataset.visible = "false"; };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  useEffect(() => {
    const bridge = cardsBridgeRef.current;
    const path = bridge?.querySelector<SVGPathElement>(".cards-world-membrane-path");
    if (!bridge || !path) return;

    const pathFrom = path.dataset.pathFrom;
    const pathTo = path.dataset.pathTo;
    if (!pathFrom || !pathTo) return;

    const animated = window.matchMedia("(min-width: 821px) and (prefers-reduced-motion: no-preference)");
    if (!animated.matches) {
      path.setAttribute("d", pathTo);
      return;
    }

    const worldLabel = bridge.querySelector<HTMLElement>(".cards-world-label");
    const numberPattern = /-?\d*\.?\d+/g;
    const fromValues = pathFrom.match(numberPattern)?.map(Number) ?? [];
    const toValues = pathTo.match(numberPattern)?.map(Number) ?? [];
    let currentProgress = 0;
    let targetProgress = 0;
    let frame: number | null = null;

    const clamp = (value: number) => Math.min(1, Math.max(0, value));
    const easeOut = (value: number) => 1 - Math.pow(1 - value, 3);

    const paint = () => {
      currentProgress += (targetProgress - currentProgress) * 0.16;
      if (Math.abs(targetProgress - currentProgress) < 0.001) currentProgress = targetProgress;

      let valueIndex = 0;
      const interpolatedPath = pathTo.replace(numberPattern, () => {
        const from = fromValues[valueIndex] ?? toValues[valueIndex] ?? 0;
        const to = toValues[valueIndex] ?? from;
        valueIndex += 1;
        return (from + (to - from) * currentProgress).toFixed(2);
      });
      path.setAttribute("d", interpolatedPath);

      const labelProgress = easeOut(clamp((currentProgress - 0.18) / 0.7));
      worldLabel?.style.setProperty("transform", `translateY(${(22 * (1 - labelProgress)).toFixed(3)}px)`);
      worldLabel?.style.setProperty("opacity", (0.18 + labelProgress * 0.82).toFixed(3));

      if (currentProgress !== targetProgress) frame = window.requestAnimationFrame(paint);
      else frame = null;
    };

    const measure = () => {
      const start = window.innerHeight * 0.88;
      const end = window.innerHeight * 0.28;
      targetProgress = clamp((start - bridge.getBoundingClientRect().top) / (start - end));
      if (frame === null) frame = window.requestAnimationFrame(paint);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });

    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, [language]);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      elements.forEach((element) => { element.dataset.visible = "true"; });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).dataset.visible = "true";
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8%" });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main id="top">
      <a className="skip-link" href="#work">{t.navWork}</a>

      <div className="cursor-bee" ref={companionRef} data-visible="false" data-hover="false" aria-hidden="true">
        <img src="/curlbee-cursor-bee.png" alt="" width="256" height="256" />
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Curlbee Design — наверх">
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </a>
        <nav aria-label={language === "RU" ? "Основная навигация" : "Main navigation"}>
          <a href="#work">{t.navWork}</a>
          <a href="#cards">{t.navCards}</a>
          <a href="#contact">{t.navContact}</a>
        </nav>
        <div className="language-switch" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
          {(["RU", "EN"] as const).map((item) => (
            <a
              key={item}
              href={`?lang=${item.toLowerCase()}`}
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
      </header>

      <section className="hero" ref={heroRef} aria-labelledby="hero-title">
        <div className="hero-aurora" aria-hidden="true" />
        <div className="hero-shape hero-shape-plum" aria-hidden="true" />
        <div className="hero-shape hero-shape-honey" aria-hidden="true" />
        <div className="hero-shape hero-shape-mint" aria-hidden="true" />

        <p className="hero-eyebrow">{t.eyebrow}</p>
        <h1 id="hero-title">
          <span>{t.heroOne}</span>
          <span>{t.heroTwo}</span>
          <em>{t.heroThree}</em>
        </h1>
        <div className="hero-foot">
          <p>{t.intro}</p>
          <div className="hero-actions">
            <div className="hero-play"><span aria-hidden="true">↗</span>{t.play}</div>
            <div className="availability"><i aria-hidden="true" />{t.status}</div>
          </div>
        </div>
      </section>

      <section className="work" id="work" aria-labelledby="work-title">
        <div className="work-heading" data-reveal>
          <p>{t.workLabel}</p>
          <h2 id="work-title" aria-label={t.workTitle}>
            <span className="work-title-top">{t.workTitleMain[0]}</span>
            <span className="work-title-bottom">
              <span>{t.workTitleMain[1]}</span>
              <span className="work-title-note" aria-hidden="true">
                {t.workTitleNote.map((line) => <span key={line}>{line}</span>)}
              </span>
            </span>
          </h2>
          <span>
            {t.workHint.map((line) => <span key={line}>{line}</span>)}
          </span>
        </div>

        <div
          className="project-explorer"
          style={{ "--project-color": project.color, "--project-ink": project.ink } as CSSProperties}
        >
          <div className="project-list" aria-label={t.workTitle} data-reveal>
            {projects.map((item, index) => (
              <button
                type="button"
                key={item.number}
                className={index === activeProject ? "is-active" : ""}
                aria-pressed={index === activeProject}
                onPointerEnter={() => setActiveProject(index)}
                onFocus={() => setActiveProject(index)}
                onClick={() => {
                  setActiveProject(index);
                  if (window.matchMedia("(max-width: 820px)").matches) {
                    window.requestAnimationFrame(() => projectStageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }));
                  }
                }}
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <em>{item.kind[language]}</em>
              </button>
            ))}
          </div>

          <div className="project-stage" ref={projectStageRef} aria-live="polite" data-reveal>
            {projects.map((item, index) => (
              <figure
                key={item.number}
                className={index === activeProject ? "is-active" : ""}
                aria-hidden={index !== activeProject}
              >
                {item.ready ? (
                  <a
                    className="project-case-link"
                    href={`/projects/${item.slug}?lang=${language.toLowerCase()}`}
                    aria-label={language === "RU" ? `Открыть кейс ${item.title}` : `Open ${item.title} case`}
                  >
                    <img
                      src={item.image}
                      alt={index === activeProject ? `${item.title} — ${item.kind[language]}` : ""}
                      width="1600"
                      height="1000"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </a>
                ) : (
                  <img src={item.image} alt={index === activeProject ? `${item.title} — ${item.kind[language]}` : ""} width="1600" height="1000" loading="lazy" decoding="async" />
                )}
                <figcaption>
                  <span>{item.number}</span>
                  {item.ready ? (
                    <a href={`/projects/${item.slug}?lang=${language.toLowerCase()}`}>
                      {language === "RU" ? "Открыть кейс ↗" : "View case ↗"}
                    </a>
                  ) : (
                    <span>{t.caseLabel}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="cards-intro" id="cards" aria-labelledby="cards-intro-title">
        <p className="cards-intro-kicker" data-reveal>{t.cardsIntroKicker}</p>
        <h2 id="cards-intro-title" aria-label={`${t.cardsIntroTitleOne} ${t.cardsIntroTitleTwo}`} data-reveal>
          <span>{t.cardsIntroTitleOne}</span>
          <em>{t.cardsIntroTitleTwo}</em>
        </h2>
        <div className="cards-intro-manifesto" data-reveal>
          <strong><span>{t.cardsIntroStatementOne}</span><span>{t.cardsIntroStatementTwo}</span></strong>
          <p>{t.cardsIntroText}</p>
        </div>
      </section>

      <section ref={cardsBridgeRef} className="cards-world-bridge" aria-label={t.cardsWorldKicker}>
        <svg className="cards-world-membrane" viewBox="0 0 1440 480" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="cards-world-field" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7d6989" />
              <stop offset="0.48" stopColor="#675276" />
              <stop offset="1" stopColor="#12110d" />
            </linearGradient>
          </defs>
          <path
            className="cards-world-membrane-path"
            d="M0 126 C248 82 494 178 730 118 C964 62 1182 112 1440 72 L1440 480 L0 480 Z"
            data-path-from="M0 364 C246 336 486 388 724 358 C960 330 1186 338 1440 366 L1440 480 L0 480 Z"
            data-path-to="M0 126 C248 82 494 178 730 118 C964 62 1182 112 1440 72 L1440 480 L0 480 Z"
            fill="url(#cards-world-field)"
          />
        </svg>
        <p className="cards-world-label">{t.cardsWorldKicker}</p>
      </section>

      <section className="cards-chapter" id="velum-cards" aria-labelledby="cards-title">
        <div className="cards-atmosphere" aria-hidden="true">
          <img className="cards-model" src="/cards/velum/model-back.jpeg" alt="" loading="lazy" decoding="async" />
        </div>
        <div className="cards-glass-drops" aria-hidden="true"><i /><i /><i /><i /></div>
        <div className="cards-copy" data-reveal>
          <p>{t.cardsKicker}</p>
          <h2 id="cards-title">{t.cardsTitle}</h2>
          <span>{t.cardsText}</span>
          <em>{t.cardsHint}</em>
        </div>

        <div className="cards-stage" data-reveal>
          <button
            className="cards-active"
            type="button"
            onClick={() => setIsVelumLightboxOpen(true)}
            aria-label={`${t.cardsOpen}: ${velumCard.title[language]}`}
          >
            <img
              key={velumCard.image}
              src={velumCard.image}
              alt={`VÉLUM — ${velumCard.title[language]}`}
              width="1800"
              height="2400"
              loading="lazy"
              decoding="async"
            />
            <span>{t.cardsOpen} ↗</span>
          </button>
        </div>

        <div
          className="cards-index"
          aria-label={language === "RU" ? "Карточки VÉLUM" : "VÉLUM cards"}
          data-reveal
          onPointerMove={(event) => {
            if (event.pointerType === "touch") return;
            const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
            let nextIndex = activeVelumCard;
            let nearestDistance = Number.POSITIVE_INFINITY;
            buttons.forEach((button, index) => {
              const bounds = button.getBoundingClientRect();
              const distance = Math.abs(event.clientY - (bounds.top + bounds.height / 2));
              if (distance < nearestDistance) {
                nearestDistance = distance;
                nextIndex = index;
              }
            });
            if (nextIndex !== activeVelumCard) setActiveVelumCard(nextIndex);
          }}
        >
          {velumCards.map((card, index) => (
            <button
              type="button"
              key={card.number}
              className={index === activeVelumCard ? "is-active" : ""}
              aria-pressed={index === activeVelumCard}
              onPointerEnter={() => setActiveVelumCard(index)}
              onFocus={() => setActiveVelumCard(index)}
              onClick={() => setActiveVelumCard(index)}
            >
              <span>{card.number}</span>
              <strong>{card.title[language]}</strong>
            </button>
          ))}
        </div>
      </section>

      {isVelumLightboxOpen && (
        <div
          className="cards-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`VÉLUM — ${velumCard.title[language]}`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsVelumLightboxOpen(false);
          }}
        >
          <button ref={cardsLightboxCloseRef} className="cards-lightbox-close" type="button" onClick={() => setIsVelumLightboxOpen(false)}>
            <span>{t.cardsClose}</span><i aria-hidden="true">×</i>
          </button>
          <img src={velumCard.image} alt={`VÉLUM — ${velumCard.title[language]}`} width="1800" height="2400" />
          <div className="cards-lightbox-caption">
            <span>{velumCard.number} / 08</span>
            <strong>{velumCard.title[language]}</strong>
          </div>
        </div>
      )}

      <section className="about" aria-labelledby="about-title">
        <p data-reveal>{t.aboutKicker}</p>
        <h2 id="about-title" aria-label={t.aboutTitle} data-reveal>
          <span className="about-line about-line-one">{t.aboutLineOne} <em>{t.aboutLineOneEm}</em></span>
          <span className="about-line about-line-two">{t.aboutLineTwo}</span>
          <span className="about-line about-line-three"><em>{t.aboutLineThree}</em></span>
        </h2>
        <div className="about-note" data-reveal>
          <span>CURIOUS<br />BY DESIGN</span>
          <div className="about-details">
            <p>{t.aboutText}</p>
            <div className="tool-signatures" aria-label={language === "RU" ? "Рабочие инструменты: Figma и AI" : "Creative tools: Figma and AI"}>
              <span className="tool-signature tool-signature-figma">
                <i className="figma-mark" aria-hidden="true"><b /><b /><b /><b /><b /></i>
                FIGMA
              </span>
              <span className="tool-signature tool-signature-ai">
                <i className="ai-spark" aria-hidden="true" />
                AI WORKFLOW
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact">
        <div className="footer-glow" aria-hidden="true" />
        <div className="footer-top">
          <p>{t.footerKicker}</p>
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </div>
        <h2>
          <span>{t.footerTitleOne}</span>
          <em>{t.footerTitleTwo}</em>
        </h2>
        <div className="contact-actions">
          <a className="contact-link mail-cta" href="mailto:curlbeefilippova@gmail.com">
            <span>{t.mailLabel}</span>
            <strong>curlbeefilippova@gmail.com</strong>
          </a>
          <a className="contact-link telegram-cta" href="https://t.me/CURLBEEFILIPPOVA" target="_blank" rel="noreferrer">
            <span>{t.telegramLabel}</span>
            <strong>@CURLBEEFILIPPOVA</strong>
            <i className="telegram-cta-arrow" aria-hidden="true">↗</i>
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CURLBEE DESIGN</span>
          <a className="telegram-icon-link" href="https://t.me/CURLBEEFILIPPOVA" target="_blank" rel="noreferrer" aria-label={t.telegramLabel}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M21.6 3.15 18.7 20.3c-.22 1.21-.8 1.51-1.62.94l-4.42-3.26-2.13 2.05c-.24.24-.44.44-.9.44l.32-4.5 8.18-7.39c.36-.31-.08-.49-.55-.18L7.47 14.77l-4.35-1.36c-1.19-.37-1.21-1.19.25-1.76L20.4 5.09c.99-.36 1.86.24 1.2 3.06Z" />
            </svg>
          </a>
          <span>DESIGNED WITH CURIOSITY</span>
        </div>
      </footer>
    </main>
  );
}
