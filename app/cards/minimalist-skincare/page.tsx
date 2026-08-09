import type { Metadata } from "next";
import MinimalistCardsClient, { type MinimalistCardsLanguage } from "./minimalist-cards-client";

type MinimalistCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "MINIMALIST SKINCARE — карточки товара · Curlbee Design",
  description: "Серия карточек MINIMALIST SKINCARE: чистая кожа, вода и точная визуальная система.",
};

export default async function MinimalistCardsPage({ searchParams }: MinimalistCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: MinimalistCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <MinimalistCardsClient initialLanguage={initialLanguage} />;
}
