"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { portfolioCases, type CaseLanguage } from "../../case-data";
import CaseLightbox from "../../case-lightbox";
import CaseMotion from "../../case-motion";
import LanguageSync from "../../language-sync";
import ThemeToggle from "../../theme-toggle";
import { typographicCopy, typographicText } from "../../typography";
import { SITE_URL } from "../../seo";

type PortfolioProject = (typeof portfolioCases)[keyof typeof portfolioCases];

const projectCoverImages: Record<string, string> = {
  even: "/projects/even-cover.webp",
  crafted: "/projects/crafted.webp",
  velum: "/projects/velum.webp",
  "minimalist-skincare": "/projects/minimalist-care.webp",
  ayu: "/projects/ayu.webp",
  "the-chops": "/projects/the-chops.webp",
};

export default function ProjectClient({ project }: { project: PortfolioProject }) {
  const [language, setLanguage] = useState<CaseLanguage>("RU");

  useEffect(() => {
    setLanguage(new URLSearchParams(window.location.search).get("lang") === "en" ? "EN" : "RU");
  }, []);

  const chooseLanguage = (nextLanguage: CaseLanguage) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setLanguage(nextLanguage);
    const url = new URL(window.location.href);
    url.searchParams.set("lang", nextLanguage.toLowerCase());
    window.history.replaceState(null, "", url);
  };

  const langQuery = language.toLowerCase();
  const isStackedTitle = "stackTitle" in project && project.stackTitle;
  const isLongTitle = project.title.length > 6;
  const screenCount = project.slides.length;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.summary[language],
    url: `${SITE_URL}/projects/${project.slug}${language === "EN" ? "?lang=en" : ""}`,
    image: `${SITE_URL}${projectCoverImages[project.slug]}`,
    inLanguage: language === "EN" ? "en" : "ru",
    creator: {
      "@type": "Person",
      "@id": `${SITE_URL}/#yulia-filippova`,
      name: "Юлия Филиппова",
    },
  };
  const labels = typographicCopy(language === "RU"
    ? {
        back: "Все проекты",
        open: "Открыть крупно",
        close: "К кейсу",
        replay: "Повторить",
        end: "К другим проектам",
        aria: "Навигация по кейсу",
      }
    : {
        back: "All projects",
        open: "View full size",
        close: "Back to case",
        replay: "Replay",
        end: "Explore other projects",
        aria: "Case navigation",
      }, language);
  const screensLabel = language === "RU" ? `${screenCount} экранов` : `${screenCount} screens`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <main
        className="case-page"
        data-case={project.slug}
        style={{
          "--case-accent": project.accent,
          "--case-title-fluid": isStackedTitle ? "8vw" : isLongTitle ? "11vw" : "14vw",
          "--case-title-max": isStackedTitle ? "132px" : isLongTitle ? "176px" : "224px",
        } as CSSProperties}
      >
        <LanguageSync language={language} />
        <header className="case-site-header">
          <a className="case-brand" href={`/?lang=${langQuery}#work`} aria-label="Curlbee Design">
            <img src="/curlbee-logo.svg" alt="Curlbee" />
          </a>
          <nav aria-label={labels.aria}>
            <a className="case-back" href={`/?lang=${langQuery}#work`}>
              <span className="case-back-visual">
                <span className="case-back-arrow" aria-hidden="true" />
                <span className="case-back-full">{labels.back}</span>
                <span className="case-back-short">{language === "RU" ? "Назад" : "Back"}</span>
              </span>
            </a>
            <ThemeToggle language={language} />
            <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
              <a href={`/projects/${project.slug}?lang=ru`} onClick={chooseLanguage("RU")} aria-current={language === "RU" ? "true" : undefined}>RU</a>
              <span className="language-divider" aria-hidden="true">/</span>
              <a href={`/projects/${project.slug}?lang=en`} onClick={chooseLanguage("EN")} aria-current={language === "EN" ? "true" : undefined}>EN</a>
            </div>
          </nav>
        </header>

        <section className="case-lead" data-number={project.number} aria-labelledby="case-title">
          <p>{project.number} / {typographicText(project.kind[language], language)} / {project.year}</p>
          <div className="case-lead-title">
            {project.slug === "the-chops" ? (
              <h1 id="case-title" className="case-chops-heading">
                <span className="case-chops-line">
                  <span>THE</span>
                  <img className="case-chops-logo" src="/the-chops-logo.png" alt="" aria-hidden="true" />
                </span>
                <span>CHOPS</span>
              </h1>
            ) : (
              <h1 id="case-title" className={isStackedTitle ? "is-stacked" : undefined}>
                {isStackedTitle
                  ? project.title.split(" ").map((word) => <span key={word} style={{ display: "block" }}>{word}</span>)
                  : project.title}
              </h1>
            )}
          </div>
          <div className="case-lead-copy">
            <p>{typographicText(project.summary[language], language)}</p>
            {screenCount > 0 && (
              <a href="#case-gallery"><span className="case-screen-arrow" aria-hidden="true"><span className="ui-arrow ui-arrow-down" /></span>{screensLabel}</a>
            )}
          </div>
        </section>

        {screenCount > 0 && (
          <section className="case-gallery" id="case-gallery" aria-label={`${project.title} — ${screensLabel}`}>
            {project.slides.map((slide, index) => (
              <figure className="case-frame" key={"image" in slide ? slide.image : slide.motionFrames[0]}>
                {"motionFrames" in slide ? (
                  <>
                    <CaseMotion frames={slide.motionFrames} label={slide.alt[language]} replayLabel={labels.replay} />
                    <figcaption>
                      <span>{String(index + 1).padStart(2, "0")} / {String(project.slides.length).padStart(2, "0")}</span>
                      <span>{language === "RU" ? "Анимация · 8,6 сек" : "Animation · 8.6 sec"}</span>
                    </figcaption>
                  </>
                ) : (
                  <CaseLightbox
                    image={slide.image}
                    alt={slide.alt[language]}
                    openLabel={labels.open}
                    closeLabel={labels.close}
                    indexLabel={`${String(index + 1).padStart(2, "0")} / ${String(project.slides.length).padStart(2, "0")}`}
                    eager={index === 0}
                  />
                )}
              </figure>
            ))}
          </section>
        )}

        <section className="case-end">
          <div className="case-end-blobs" aria-hidden="true">
            <span className="case-end-blob case-end-blob-plum" />
            <span className="case-end-blob case-end-blob-mint" />
            <span className="case-end-blob case-end-blob-honey" />
          </div>
          <p>{project.title} / {project.year}</p>
          <a href={`/?lang=${langQuery}#work`}>
          {labels.end}
          <svg className="case-end-drawn-arrow" viewBox="0 0 76 64" aria-hidden="true">
            <path d="M7 54C18 51 26 47 35 40C46 32 55 22 64 9" />
            <path d="M45 8C52 7 59 8 66 10" />
            <path d="M65 9C65 16 62 23 58 29" />
          </svg>
          <span className="ui-arrow ui-arrow-up-right" aria-hidden="true" />
        </a>
        </section>
      </main>
    </>
  );
}
