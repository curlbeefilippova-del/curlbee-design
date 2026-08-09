import type { Metadata } from "next";
import CraftedCardsClient, { type CraftedCardsLanguage } from "./crafted-cards-client";

type CraftedCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "CRAFTED — карточки товара · Curlbee Design",
  description: "Серия карточек товара CRAFTED: точная модульная система внутри Curlbee Design.",
};

export default async function CraftedCardsPage({ searchParams }: CraftedCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: CraftedCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <CraftedCardsClient initialLanguage={initialLanguage} />;
}
