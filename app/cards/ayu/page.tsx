import type { Metadata } from "next";
import AyuCardsClient, { type AyuCardsLanguage } from "./ayu-cards-client";
import { createPageMetadata, seoLanguage } from "../../seo";

type AyuCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: AyuCardsPageProps): Promise<Metadata> {
  const query = await searchParams;
  const language = seoLanguage(query?.lang);

  return createPageMetadata({
    title: `AYU — ${language === "EN" ? "product cards" : "карточки товара"}`,
    description: language === "EN"
      ? "A product-card series for a quiet technological companion that senses presence and responds with light."
      : "Серия карточек AYU о тихом технологичном компаньоне, который чувствует присутствие и отвечает светом.",
    path: "/cards/ayu",
    language,
    image: "/cards/ayu/01.webp",
    imageAlt: "AYU — product cards by Curlbee Design",
  });
}

export default async function AyuCardsPage({ searchParams }: AyuCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: AyuCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <AyuCardsClient initialLanguage={initialLanguage} />;
}
