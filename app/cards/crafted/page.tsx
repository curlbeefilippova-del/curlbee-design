import type { Metadata } from "next";
import CraftedCardsClient, { type CraftedCardsLanguage } from "./crafted-cards-client";
import { createPageMetadata, seoLanguage } from "../../seo";

type CraftedCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: CraftedCardsPageProps): Promise<Metadata> {
  const query = await searchParams;
  const language = seoLanguage(query?.lang);

  return createPageMetadata({
    title: `CRAFTED — ${language === "EN" ? "product cards" : "карточки товара"}`,
    description: language === "EN"
      ? "A precise modular product-card system for a mechanical keyboard designed for creative work."
      : "Серия карточек товара CRAFTED: точная модульная система для механической клавиатуры.",
    path: "/cards/crafted",
    language,
    image: "/cards/crafted/01.webp",
    imageAlt: "CRAFTED — product cards by Curlbee Design",
  });
}

export default async function CraftedCardsPage({ searchParams }: CraftedCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: CraftedCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <CraftedCardsClient initialLanguage={initialLanguage} />;
}
