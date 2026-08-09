import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import LanguageSync from "../../language-sync";

type CardsWorldPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ lang?: string }>;
};

const cardWorlds = {
  even: { number: "01", title: "EVEN", image: "/cases/even/01.png", color: "#86667a" },
  crafted: { number: "02", title: "CRAFTED", image: "/cases/crafted/01.png", color: "#59604d" },
  "minimalist-skincare": { number: "04", title: "MINIMALIST SKINCARE", image: "/cases/minimalist-care/01.png", color: "#9ab9a5" },
  ayu: { number: "05", title: "AYU", image: "/cases/ayu/01.png", color: "#d5a345" },
} as const;

function getCardWorld(slug: string) {
  return cardWorlds[slug as keyof typeof cardWorlds];
}

export async function generateMetadata({ params }: CardsWorldPageProps): Promise<Metadata> {
  const { slug } = await params;
  const world = getCardWorld(slug);
  if (!world) return {};

  return {
    title: `${world.title} — карточки товара · Curlbee Design`,
    description: `Мир карточек товара ${world.title} в системе Curlbee Design.`,
  };
}

export default async function CardsWorldPage({ params, searchParams }: CardsWorldPageProps) {
  const { slug } = await params;
  const world = getCardWorld(slug);
  if (!world) notFound();

  const query = await searchParams;
  const language = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";
  const langQuery = language.toLowerCase();
  const labels = language === "RU"
    ? {
        back: "К пяти мирам",
        aria: `Навигация по миру ${world.title}`,
        kicker: `Карточки товара · мир ${world.number}`,
        status: "Мир карточек собирается",
        text: "Портал уже на своём месте. Полная серия появится здесь после утверждения карточек проекта.",
      }
    : {
        back: "Back to five worlds",
        aria: `${world.title} world navigation`,
        kicker: `Product cards · world ${world.number}`,
        status: "This card world is taking shape",
        text: "The portal is already in place. The complete series will appear here once the project cards are approved.",
      };

  return (
    <main className="cards-world-placeholder" style={{ "--world-accent": world.color } as CSSProperties}>
      <LanguageSync language={language} />
      <header className="cards-placeholder-header">
        <a className="case-brand" href={`/?lang=${langQuery}#cards`} aria-label="Curlbee Design">
          <img src="/curlbee-logo.svg" alt="Curlbee" />
        </a>
        <nav aria-label={labels.aria}>
          <a className="case-back" href={`/?lang=${langQuery}#cards`}><span aria-hidden="true">←</span>{labels.back}</a>
          <div className="case-language" aria-label={language === "RU" ? "Выбор языка" : "Language selection"}>
            <a href={`/cards/${slug}?lang=ru`} aria-current={language === "RU" ? "true" : undefined}>RU</a>
            <a href={`/cards/${slug}?lang=en`} aria-current={language === "EN" ? "true" : undefined}>EN</a>
          </div>
        </nav>
      </header>

      <section className="cards-placeholder-stage" aria-labelledby="cards-placeholder-title">
        <div className="cards-placeholder-copy">
          <p>{labels.kicker}</p>
          <h1 id="cards-placeholder-title">{world.title}</h1>
          <strong>{labels.status}</strong>
          <span>{labels.text}</span>
        </div>
        <figure>
          <img src={world.image} alt={`${world.title} — Curlbee Design`} width="1600" height="1000" />
        </figure>
        <i className="cards-placeholder-blob" aria-hidden="true">{world.number}</i>
      </section>
    </main>
  );
}
