import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { portfolioCases, type CaseLanguage } from "../../case-data";
import CaseLightbox from "../../case-lightbox";
import CaseMotion from "../../case-motion";
import LanguageSync from "../../language-sync";
import ThemeToggle from "../../theme-toggle";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

function getCase(slug: string) {
  return portfolioCases[slug as keyof typeof portfolioCases];
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Curlbee Design`,
    description: project.summary.RU,
  };
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) notFound();

  const query = await searchParams;
  const language: CaseLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";
  const langQuery = language.toLowerCase();
  const isStackedTitle = "stackTitle" in project && project.stackTitle;
  const isLongTitle = project.title.length > 6;
  const screenCount = project.slides.length;
  const labels = language === "RU"
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
      };
  const screensLabel = language === "RU" ? `${screenCount} экранов` : `${screenCount} screens`;

  return (
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
          <a className="case-back" href={`/?lang=${langQuery}#work`}><span aria-hidden="true">←</span>{labels.back}</a>
          <ThemeToggle language={language} />
          <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            <a href={`/projects/${project.slug}?lang=ru`} aria-current={language === "RU" ? "true" : undefined}>RU</a>
            <a href={`/projects/${project.slug}?lang=en`} aria-current={language === "EN" ? "true" : undefined}>EN</a>
          </div>
        </nav>
      </header>

      <section className="case-lead" data-number={project.number} aria-labelledby="case-title">
        <p>{project.number} / {project.kind[language]} / {project.year}</p>
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
          <p>{project.summary[language]}</p>
          {screenCount > 0 && (
            <a href="#case-gallery"><span aria-hidden="true">↓</span>{screensLabel}</a>
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
        <a href={`/?lang=${langQuery}#work`}>{labels.end}<span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
