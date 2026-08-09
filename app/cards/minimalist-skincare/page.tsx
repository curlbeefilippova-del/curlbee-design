import type { Metadata } from "next";
import MinimalistCardsClient, { type MinimalistCardsLanguage } from "./minimalist-cards-client";
import { createPageMetadata, seoLanguage } from "../../seo";

type MinimalistCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: MinimalistCardsPageProps): Promise<Metadata> {
  const query = await searchParams;
  const language = seoLanguage(query?.lang);

  return createPageMetadata({
    title: `MINIMALIST SKINCARE — ${language === "EN" ? "product cards" : "карточки товара"}`,
    description: language === "EN"
      ? "A clean skincare product-card series built around water, mineral light and a precise visual system."
      : "Серия карточек MINIMALIST SKINCARE: вода, минеральный свет и точная визуальная система.",
    path: "/cards/minimalist-skincare",
    language,
    image: "/cards/minimalist-skincare/01.webp",
    imageAlt: "MINIMALIST SKINCARE — product cards by Curlbee Design",
  });
}

export default async function MinimalistCardsPage({ searchParams }: MinimalistCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: MinimalistCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <MinimalistCardsClient initialLanguage={initialLanguage} />;
}
