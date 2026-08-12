"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import ThemeToggle from "./theme-toggle";
import { typographicCopy, typographicText } from "./typography";

export type Language = "RU" | "EN";

const TELEGRAM_LOGO_PATH = "M22.58 2.08 24 2.93v2.03l-.35 1.9-.19 1.96-.28 1.93-.46 1.84-.4 1.87-.31 1.91-.26 1.93-.29 1.92-.79 1.7-1.9-.04-1.64-.95-1.59-1.09-1.57-1.11-1.6-1.05-1.6-1.1.02-1.62 1.26-1.54 1.54-1.21 1.44-1.45 1.44-1.44 1.44-1.44-.36-1.05-1.63.98-1.6 1.04-1.58 1.11-1.6 1.07-1.58 1.08-1.63.98-1.67.9-2.04-.03-1.81-.54-1.79-.57-.62-1.33 1.67-.93 1.71-.8 1.77-.64 1.72-.78 1.7-.8 1.78-.63 1.68-.85 1.74-.72 1.77-.65 1.69-.82 1.81-.56 1.72-.76Z";

const projects = [
  {
    number: "01",
    slug: "even",
    title: "EVEN",
    kind: { RU: "Айдентика бренда одежды", EN: "Fashion brand identity" },
    image: "/cases/even/01.png",
    color: "#725a72",
    ink: "#f4eee8",
  },
  {
    number: "02",
    slug: "crafted",
    title: "CRAFTED",
    kind: { RU: "Продуктовая история клавиатуры", EN: "Mechanical keyboard story" },
    image: "/cases/crafted/01.png",
    color: "#59604d",
    ink: "#f4eee8",
  },
  {
    number: "03",
    slug: "velum",
    title: "VÉLUM",
    kind: { RU: "Айдентика премиального масла для волос", EN: "Premium hair oil identity" },
    image: "/cases/velum/01.png",
    color: "#9a573d",
    ink: "#fff7ef",
  },
  {
    number: "04",
    slug: "minimalist-skincare",
    title: "MINIMALIST SKINCARE",
    kind: { RU: "Айдентика бренда косметики", EN: "Skincare brand identity" },
    image: "/cases/minimalist-care/01.png",
    color: "#d7ceca",
    ink: "#292526",
  },
  {
    number: "05",
    slug: "ayu",
    title: "AYU",
    kind: { RU: "Визуальная система", EN: "Visual system" },
    image: "/cases/ayu/01.png",
    color: "#d5a345",
    ink: "#292526",
  },
  {
    number: "06",
    slug: "the-chops",
    title: "THE CHOPS",
    kind: { RU: "Юбилейная кампания для бара", EN: "Anniversary bar campaign" },
    image: "/cases/the-chops/01.png",
    color: "#b85c49",
    ink: "#fff7ef",
  },
] as const;

const cardsWorlds = [
  { number: "01", portal: "01", slug: "even", title: "EVEN", color: "#86667a" },
  { number: "02", portal: "02", slug: "crafted", title: "CRAFTED", color: "#59604d" },
  { number: "03", portal: "03", slug: "velum", title: "VÉLUM", color: "#b85c49" },
  { number: "05", portal: "04", slug: "minimalist-skincare", title: "MINIMALIST SKINCARE", color: "#c8e1d1" },
  { number: "04", portal: "05", slug: "ayu", title: "AYU", color: "#d5a345" },
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
    play: "Нажми — пчела полетит",
    motion: "Анимация",
    motionOn: "вкл",
    motionOff: "выкл",
    motionEnable: "Включить анимацию",
    motionDisable: "Отключить анимацию",
    workLabel: "Портфолио · 2026",
    workTitle: "Избранные проекты — у каждого свой характер",
    workTitleMain: ["Избранные", "проекты"],
    workTitleNote: ["У каждого", "свой характер"],
    workHint: ["Наведи — смени сцену,", "нажми — открой кейс"],
    cardsIntroKicker: "Новая глава · карточки товара",
    cardsIntroTitleOne: "Карточки",
    cardsIntroTitleTwo: "товара",
    cardsIntroStatementOne: "Отдельные миры",
    cardsIntroStatementTwo: "внутри одной системы",
    cardsIntroText: "Каждый продукт получает собственную атмосферу, но остаётся частью Curlbee Design.",
    cardsWorldMapAria: "Пять миров карточек товара",
    cardsWorldOpen: "Открыть мир карточек",
    aboutKicker: "Коротко обо мне",
    aboutTitle: "Люблю, когда система понятная, а результат — с неожиданным поворотом",
    aboutLineOne: "Люблю, когда",
    aboutLineOneEm: "система",
    aboutLineTwo: "понятная, а результат —",
    aboutLineThree: "с неожиданным поворотом",
    aboutText: "Работаю с\u00a0айдентикой, digital-дизайном, презентациями и\u00a0карточками товара. Figma и\u00a0AI помогают быстрее проверять идеи, но характер и\u00a0логика каждого проекта остаются авторскими.",
    footerKicker: "Связаться · Россия / онлайн",
    footerTitleOne: "Сделаем то,",
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
    play: "Click — the bee will loop and land",
    motion: "Motion",
    motionOn: "on",
    motionOff: "off",
    motionEnable: "Enable motion",
    motionDisable: "Disable motion",
    workLabel: "Portfolio · 2026",
    workTitle: "Selected projects — each has its own personality",
    workTitleMain: ["Selected", "projects"],
    workTitleNote: ["Each has", "its own personality"],
    workHint: ["Hover to preview,", "click to open the case"],
    cardsIntroKicker: "New chapter · product cards",
    cardsIntroTitleOne: "Product",
    cardsIntroTitleTwo: "cards",
    cardsIntroStatementOne: "Distinct worlds",
    cardsIntroStatementTwo: "within one system",
    cardsIntroText: "Each product has its own atmosphere while remaining part of Curlbee Design.",
    cardsWorldMapAria: "Five product-card worlds",
    cardsWorldOpen: "Open the product-card world",
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
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [isCardsPortalActive, setIsCardsPortalActive] = useState(false);
  const [cardsPortalStyle, setCardsPortalStyle] = useState<CSSProperties>({});
  const companionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const cardsPortalTimerRef = useRef<number | null>(null);
  const beeDemoFrameRef = useRef<number | null>(null);
  const beeAngleFrameRef = useRef<number | null>(null);
  const beeIdleTimerRef = useRef<number | null>(null);
  const pointRef = useRef({
    x: -80,
    y: -80,
    lastX: -80,
    lastY: -80,
    angle: 0,
    targetAngle: 0,
    isDemo: false,
  });
  const t = typographicCopy(copy[language], language);
  const project = projects[activeProject];

  useEffect(() => {
    document.documentElement.lang = language.toLowerCase();
  }, [language]);

  useEffect(() => {
    const syncFrame = window.requestAnimationFrame(() => {
      setMotionEnabled(document.documentElement.dataset.motion !== "off");
    });
    return () => {
      window.cancelAnimationFrame(syncFrame);
      if (beeDemoFrameRef.current !== null) window.cancelAnimationFrame(beeDemoFrameRef.current);
      if (beeAngleFrameRef.current !== null) window.cancelAnimationFrame(beeAngleFrameRef.current);
      if (beeIdleTimerRef.current !== null) window.clearTimeout(beeIdleTimerRef.current);
    };
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const mobileViewport = window.matchMedia("(max-width: 820px), (pointer: coarse)");
    let orientationTimer = 0;

    const lockHeroHeight = () => {
      if (!mobileViewport.matches) {
        hero.style.removeProperty("--hero-mobile-height");
        return;
      }
      hero.style.setProperty("--hero-mobile-height", `${Math.round(window.innerHeight)}px`);
    };

    const handleOrientationChange = () => {
      window.clearTimeout(orientationTimer);
      orientationTimer = window.setTimeout(lockHeroHeight, 280);
    };

    lockHeroHeight();
    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.clearTimeout(orientationTimer);
      window.removeEventListener("orientationchange", handleOrientationChange);
      hero.style.removeProperty("--hero-mobile-height");
    };
  }, []);

  useEffect(() => {
    if (window.location.hash !== "#cards") return;

    const scrollToCards = () => {
      document.getElementById("cards")?.scrollIntoView({ block: "start" });
    };
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(scrollToCards);
    });
    const timers = [120, 480, 1100].map((delay) => window.setTimeout(scrollToCards, delay));
    document.fonts?.ready.then(scrollToCards).catch(() => undefined);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  useEffect(() => {
    const companion = companionRef.current;
    if (!companion || !motionEnabled || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) {
      if (companion) companion.dataset.visible = "false";
      return;
    }

    let lastAngleFrameTime = performance.now();

    const shortestTurn = (from: number, to: number) => ((to - from + 540) % 360) - 180;

    const smoothAngle = (time: number) => {
      const point = pointRef.current;
      const elapsed = Math.min(40, time - lastAngleFrameTime);
      const turn = shortestTurn(point.angle, point.targetAngle);
      const blend = 1 - Math.exp(-elapsed / 52);
      point.angle += turn * blend;
      companion.style.setProperty("--cursor-angle", `${point.angle}deg`);
      lastAngleFrameTime = time;

      if (Math.abs(turn) > 0.12 && !point.isDemo) {
        beeAngleFrameRef.current = window.requestAnimationFrame(smoothAngle);
      } else {
        point.angle = point.targetAngle;
        companion.style.setProperty("--cursor-angle", `${point.angle}deg`);
        beeAngleFrameRef.current = null;
      }
    };

    const startAngleSmoothing = () => {
      if (beeAngleFrameRef.current !== null) return;
      lastAngleFrameTime = performance.now();
      beeAngleFrameRef.current = window.requestAnimationFrame(smoothAngle);
    };

    const move = (event: PointerEvent) => {
      const point = pointRef.current;
      const firstMove = companion.dataset.visible !== "true";
      const dx = event.clientX - point.lastX;
      const dy = event.clientY - point.lastY;
      const distance = Math.hypot(dx, dy);

      point.lastX = event.clientX;
      point.lastY = event.clientY;

      if (!firstMove && distance > 0.5) {
        point.targetAngle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
      }

      if (!point.isDemo) {
        point.x = event.clientX;
        point.y = event.clientY;
        companion.style.setProperty("--cursor-x", `${point.x}px`);
        companion.style.setProperty("--cursor-y", `${point.y}px`);
        companion.dataset.moving = distance > 2 ? "true" : "false";
        companion.dataset.resting = "false";
        companion.dataset.visible = "true";
        companion.dataset.hover = (event.target as Element | null)?.closest("a, button") ? "true" : "false";
        startAngleSmoothing();

        if (beeIdleTimerRef.current !== null) window.clearTimeout(beeIdleTimerRef.current);
        beeIdleTimerRef.current = window.setTimeout(() => {
          companion.dataset.moving = "false";
          beeIdleTimerRef.current = null;
        }, 90);
      }

      const hero = heroRef.current;
      const heroBounds = hero?.getBoundingClientRect();
      if (hero && heroBounds) {
        hero.style.setProperty("--mouse-x", `${((event.clientX - heroBounds.left) / heroBounds.width) * 100}%`);
        hero.style.setProperty("--mouse-y", `${((event.clientY - heroBounds.top) / heroBounds.height) * 100}%`);
      }
    };

    const hide = () => {
      if (!pointRef.current.isDemo) companion.dataset.visible = "false";
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("mouseleave", hide);
      if (beeAngleFrameRef.current !== null) {
        window.cancelAnimationFrame(beeAngleFrameRef.current);
        beeAngleFrameRef.current = null;
      }
      if (beeIdleTimerRef.current !== null) {
        window.clearTimeout(beeIdleTimerRef.current);
        beeIdleTimerRef.current = null;
      }
    };
  }, [motionEnabled]);

  useEffect(() => {
    const resetCardsPortal = () => {
      if (cardsPortalTimerRef.current !== null) {
        window.clearTimeout(cardsPortalTimerRef.current);
        cardsPortalTimerRef.current = null;
      }
      setIsCardsPortalActive(false);
      setCardsPortalStyle({});
      document.body.style.overflow = "";
    };
    window.addEventListener("pageshow", resetCardsPortal);
    window.addEventListener("popstate", resetCardsPortal);
    return () => {
      window.removeEventListener("pageshow", resetCardsPortal);
      window.removeEventListener("popstate", resetCardsPortal);
      if (cardsPortalTimerRef.current !== null) window.clearTimeout(cardsPortalTimerRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    if (!motionEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
  }, [motionEnabled]);

  const enterCardsWorld = (event: MouseEvent<HTMLAnchorElement>) => {
    if (!motionEnabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    event.preventDefault();
    if (isCardsPortalActive) return;
    const destination = event.currentTarget.href;
    const bounds = event.currentTarget.getBoundingClientRect();
    setCardsPortalStyle({
      "--cards-portal-x": `${((bounds.left + bounds.width / 2) / window.innerWidth) * 100}%`,
      "--cards-portal-y": `${((bounds.top + bounds.height / 2) / window.innerHeight) * 100}%`,
      "--cards-portal-color": event.currentTarget.dataset.color ?? "#675276",
    } as CSSProperties);
    setIsCardsPortalActive(true);
    document.body.style.overflow = "hidden";
    cardsPortalTimerRef.current = window.setTimeout(() => {
      window.location.assign(destination);
    }, 620);
  };

  const toggleMotion = () => {
    const next = !motionEnabled;
    if (!next) {
      if (beeDemoFrameRef.current !== null) {
        window.cancelAnimationFrame(beeDemoFrameRef.current);
        beeDemoFrameRef.current = null;
      }
      if (beeAngleFrameRef.current !== null) {
        window.cancelAnimationFrame(beeAngleFrameRef.current);
        beeAngleFrameRef.current = null;
      }
      pointRef.current.isDemo = false;
      if (companionRef.current) {
        companionRef.current.dataset.demo = "false";
        companionRef.current.dataset.visible = "false";
      }
    }
    setMotionEnabled(next);
    document.documentElement.dataset.motion = next ? "on" : "off";
    window.localStorage.setItem("curlbee-motion", next ? "on" : "off");
    window.dispatchEvent(new CustomEvent("curlbee-motion-change", { detail: { enabled: next } }));
  };

  const demonstrateBee = (event: MouseEvent<HTMLButtonElement>) => {
    const companion = companionRef.current;
    const hero = heroRef.current;
    const honey = hero?.querySelector<HTMLElement>(".hero-shape-honey");
    const plum = hero?.querySelector<HTMLElement>(".hero-shape-plum");
    if (!companion || !hero || !honey || !plum || !motionEnabled || window.matchMedia("(pointer: coarse), (prefers-reduced-motion: reduce)").matches) return;

    if (beeDemoFrameRef.current !== null) window.cancelAnimationFrame(beeDemoFrameRef.current);
    if (beeAngleFrameRef.current !== null) {
      window.cancelAnimationFrame(beeAngleFrameRef.current);
      beeAngleFrameRef.current = null;
    }
    if (beeIdleTimerRef.current !== null) {
      window.clearTimeout(beeIdleTimerRef.current);
      beeIdleTimerRef.current = null;
    }

    const point = pointRef.current;
    const buttonBounds = event.currentTarget.getBoundingClientRect();
    const honeyBounds = honey.getBoundingClientRect();
    const plumBounds = plum.getBoundingClientRect();
    const startX = point.x > -40 ? point.x : buttonBounds.left + buttonBounds.width / 2;
    const startY = point.y > -40 ? point.y : buttonBounds.top + buttonBounds.height / 2;
    const honeyX = honeyBounds.left + honeyBounds.width / 2;
    const honeyY = honeyBounds.top + honeyBounds.height / 2;
    const honeyRadiusX = honeyBounds.width / 2 + 34;
    const honeyRadiusY = honeyBounds.height / 2 + 30;
    const orbitLeftX = honeyX - honeyRadiusX;
    const orbitRightX = honeyX + honeyRadiusX;
    const orbitTopY = honeyY - honeyRadiusY;
    const orbitBottomY = honeyY + honeyRadiusY;
    const loopRadiusX = Math.max(58, Math.min(88, plumBounds.width * 0.14));
    const loopRadiusY = loopRadiusX * 0.72;
    const loopX = Math.min(window.innerWidth - loopRadiusX - 36, plumBounds.left + plumBounds.width * 0.28);
    const loopY = Math.max(loopRadiusY + 44, plumBounds.top + plumBounds.height * 0.19);
    const landingX = plumBounds.left + plumBounds.width * 0.24;
    const landingY = plumBounds.top + plumBounds.height * 0.25;
    const kappa = 0.5522848;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", [
      `M ${startX} ${startY}`,
      `C ${startX} ${startY - 90}, ${orbitLeftX - 84} ${honeyY + 42}, ${orbitLeftX} ${honeyY}`,
      `C ${orbitLeftX} ${honeyY - kappa * honeyRadiusY}, ${honeyX - kappa * honeyRadiusX} ${orbitTopY}, ${honeyX} ${orbitTopY}`,
      `C ${honeyX + kappa * honeyRadiusX} ${orbitTopY}, ${orbitRightX} ${honeyY - kappa * honeyRadiusY}, ${orbitRightX} ${honeyY}`,
      `C ${orbitRightX} ${honeyY + kappa * honeyRadiusY}, ${honeyX + kappa * honeyRadiusX} ${orbitBottomY}, ${honeyX} ${orbitBottomY}`,
      `C ${honeyX - kappa * honeyRadiusX} ${orbitBottomY}, ${orbitLeftX} ${honeyY + kappa * honeyRadiusY}, ${orbitLeftX} ${honeyY}`,
      `C ${orbitLeftX + 38} ${honeyY - 76}, ${loopX - loopRadiusX - 42} ${loopY + 28}, ${loopX - loopRadiusX} ${loopY}`,
      `C ${loopX - loopRadiusX} ${loopY - kappa * loopRadiusY}, ${loopX - kappa * loopRadiusX} ${loopY - loopRadiusY}, ${loopX} ${loopY - loopRadiusY}`,
      `C ${loopX + kappa * loopRadiusX} ${loopY - loopRadiusY}, ${loopX + loopRadiusX} ${loopY - kappa * loopRadiusY}, ${loopX + loopRadiusX} ${loopY}`,
      `C ${loopX + loopRadiusX} ${loopY + kappa * loopRadiusY}, ${loopX + kappa * loopRadiusX} ${loopY + loopRadiusY}, ${loopX} ${loopY + loopRadiusY}`,
      `C ${loopX - kappa * loopRadiusX} ${loopY + loopRadiusY}, ${loopX - loopRadiusX} ${loopY + kappa * loopRadiusY}, ${loopX - loopRadiusX} ${loopY}`,
      `C ${loopX - 28} ${loopY + 42}, ${landingX - 54} ${landingY - 38}, ${landingX} ${landingY}`,
    ].join(" "));

    const pathLength = path.getTotalLength();
    const duration = Math.max(3300, Math.min(4200, pathLength * 3.4));
    const startedAt = performance.now();

    point.x = startX;
    point.y = startY;
    point.isDemo = true;
    companion.dataset.demo = "true";
    companion.dataset.resting = "false";
    companion.dataset.hover = "false";
    companion.dataset.moving = "true";
    companion.dataset.visible = "true";

    const animate = (time: number) => {
      const progress = Math.min(1, (time - startedAt) / duration);
      const easedProgress = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const pathPosition = path.getPointAtLength(pathLength * easedProgress);
      const pathAhead = path.getPointAtLength(Math.min(pathLength, pathLength * easedProgress + 2));
      const targetAngle = Math.atan2(pathAhead.y - pathPosition.y, pathAhead.x - pathPosition.x) * (180 / Math.PI) + 90;
      const turn = ((targetAngle - point.angle + 540) % 360) - 180;

      point.x = pathPosition.x;
      point.y = pathPosition.y;
      point.targetAngle = targetAngle;
      point.angle += turn * 0.36;
      companion.style.setProperty("--cursor-x", `${point.x}px`);
      companion.style.setProperty("--cursor-y", `${point.y}px`);
      companion.style.setProperty("--cursor-angle", `${point.angle}deg`);

      if (progress < 1) {
        beeDemoFrameRef.current = window.requestAnimationFrame(animate);
        return;
      }

      point.isDemo = false;
      companion.dataset.demo = "false";
      companion.dataset.moving = "false";
      companion.dataset.resting = "true";
      beeDemoFrameRef.current = null;
    };

    beeDemoFrameRef.current = window.requestAnimationFrame(animate);
  };

  return (
    <main id="top">
      <a className="skip-link" href="#work">{t.navWork}</a>

      <div className="cursor-bee" ref={companionRef} data-visible="false" data-hover="false" aria-hidden="true">
        <img src="/curlbee-cursor-bee.png" alt="" width="256" height="206" decoding="async" />
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
        <div className="header-actions">
          <ThemeToggle language={language} />
          <div className="language-switch" role="group" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            {(["RU", "EN"] as const).map((item) => (
              <Fragment key={item}>
                {item === "EN" && <span className="language-divider" aria-hidden="true">/</span>}
                <a
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
              </Fragment>
            ))}
          </div>
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
            <button className="hero-play" type="button" onClick={demonstrateBee} disabled={!motionEnabled}>
              <span className="hero-play-symbol" aria-hidden="true"><span className="ui-arrow ui-arrow-up-right" /></span>
              {t.play}
            </button>
            <button
              className="motion-toggle"
              type="button"
              role="switch"
              aria-checked={motionEnabled}
              aria-label={motionEnabled ? t.motionDisable : t.motionEnable}
              onClick={toggleMotion}
            >
              <span className="motion-toggle-track" aria-hidden="true"><i /></span>
              <span>{t.motion}</span>
              <strong>{motionEnabled ? t.motionOn : t.motionOff}</strong>
            </button>
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
          <div className="project-list" role="group" aria-label={t.workTitle} data-reveal>
            {projects.map((item, index) => (
              <a
                href={`/projects/${item.slug}?lang=${language.toLowerCase()}`}
                key={item.number}
                className={index === activeProject ? "is-active" : ""}
                aria-current={index === activeProject ? "true" : undefined}
                onPointerEnter={() => setActiveProject(index)}
                onFocus={() => setActiveProject(index)}
              >
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <em>{typographicText(item.kind[language], language)}</em>
              </a>
            ))}
          </div>

          <div className="project-stage" aria-live="polite" data-reveal>
            {projects.map((item, index) => (
              <figure
                key={item.number}
                className={index === activeProject ? "is-active" : ""}
                aria-hidden={index !== activeProject}
              >
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
                <figcaption>
                  <span>{item.number}</span>
                  <a href={`/projects/${item.slug}?lang=${language.toLowerCase()}`}>
                    {language === "RU" ? "Открыть кейс" : "View case"}
                    <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" />
                  </a>
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
        <nav className="cards-world-map" aria-label={t.cardsWorldMapAria}>
          {cardsWorlds.map((world) => (
            <a
              key={world.slug}
              className={`cards-world-link cards-world-link-${world.portal}`}
              href={`/cards/${world.slug}?lang=${language.toLowerCase()}`}
              data-color={world.color}
              aria-label={`${t.cardsWorldOpen}: ${world.title}`}
              onClick={enterCardsWorld}
            >
              <span className="cards-world-link-content">
                <span className="cards-world-link-index">{world.number}</span>
                <strong>{world.title}</strong>
                <span className="cards-world-link-control" aria-hidden="true">
                  <span className="ui-arrow ui-arrow-up-right" />
                </span>
              </span>
            </a>
          ))}
        </nav>
        <div
          className="cards-portal-transition"
          data-active={isCardsPortalActive ? "true" : "false"}
          style={cardsPortalStyle}
          aria-hidden="true"
        />
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
            <div className="tool-signatures" role="list" aria-label={language === "RU" ? "Рабочие инструменты: Figma и AI" : "Creative tools: Figma and AI"}>
              <span className="tool-signature tool-signature-figma" role="listitem">
                <i className="figma-mark" aria-hidden="true"><b /><b /><b /><b /><b /></i>
                FIGMA
              </span>
              <span className="tool-signature tool-signature-ai" role="listitem">
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
            <i className="telegram-cta-arrow" aria-hidden="true">
              <svg className="telegram-cta-arrow-icon" viewBox="0 0 24 24">
                <path d="M4.5 17.75 6.25 19.5 16.75 9v5h2.5V4.75H10v2.5h5Z" />
              </svg>
            </i>
          </a>
        </div>
        <div className="footer-bottom">
          <span>© 2026 CURLBEE DESIGN</span>
          <a className="telegram-icon-link" href="https://t.me/CURLBEEFILIPPOVA" target="_blank" rel="noreferrer" aria-label={t.telegramLabel}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d={TELEGRAM_LOGO_PATH} />
            </svg>
          </a>
          <span>DESIGNED WITH CURIOSITY</span>
        </div>
      </footer>
    </main>
  );
}
