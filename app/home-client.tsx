"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";

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
    cardsPortalLabel: "Войти в мир",
    cardsPortalSeries: "01 · VÉLUM",
    cardsPortalAria: "Открыть мир карточек VÉLUM",
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
    cardsPortalLabel: "Enter the world",
    cardsPortalSeries: "01 · VÉLUM",
    cardsPortalAria: "Open the VÉLUM product-card world",
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
  const [isCardsPortalActive, setIsCardsPortalActive] = useState(false);
  const companionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const projectStageRef = useRef<HTMLDivElement>(null);
  const cardsPortalTimerRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointRef = useRef({ x: -80, y: -80, followX: -80, followY: -80, lastX: -80, lastY: -80, angle: 0 });
  const t = copy[language];
  const project = projects[activeProject];

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

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

  useEffect(() => () => {
    if (cardsPortalTimerRef.current !== null) window.clearTimeout(cardsPortalTimerRef.current);
    document.body.style.overflow = "";
  }, []);

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

  const enterCardsWorld = (event: MouseEvent<HTMLAnchorElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (isCardsPortalActive) return;
    const destination = event.currentTarget.href;
    setIsCardsPortalActive(true);
    document.body.style.overflow = "hidden";
    cardsPortalTimerRef.current = window.setTimeout(() => {
      window.location.assign(destination);
    }, 620);
  };

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
        <div className="cards-intro-blobs" aria-hidden="true">
          <span className="cards-intro-blob cards-intro-blob-mint" />
          <span className="cards-intro-blob cards-intro-blob-plum" />
          <span className="cards-intro-blob cards-intro-blob-honey" />
        </div>
        <p className="cards-intro-kicker" data-reveal>{t.cardsIntroKicker}</p>
        <h2 id="cards-intro-title" aria-label={`${t.cardsIntroTitleOne} ${t.cardsIntroTitleTwo}`} data-reveal>
          <span>{t.cardsIntroTitleOne}</span>
          <em>{t.cardsIntroTitleTwo}</em>
        </h2>
        <div className="cards-intro-manifesto" data-reveal>
          <strong><span>{t.cardsIntroStatementOne}</span><span>{t.cardsIntroStatementTwo}</span></strong>
          <p>{t.cardsIntroText}</p>
        </div>
        <a
          className="cards-portal"
          href={`/cards/velum?lang=${language.toLowerCase()}`}
          aria-label={t.cardsPortalAria}
          onClick={enterCardsWorld}
        >
          <span className="cards-portal-ring" aria-hidden="true" />
          <span className="cards-portal-series">{t.cardsPortalSeries}</span>
          <strong>{t.cardsPortalLabel}</strong>
          <i aria-hidden="true">↗</i>
        </a>
        <div className="cards-portal-transition" data-active={isCardsPortalActive ? "true" : "false"} aria-hidden="true" />
      </section>

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
