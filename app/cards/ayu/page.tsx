import type { Metadata } from "next";
import AyuCardsClient, { type AyuCardsLanguage } from "./ayu-cards-client";

type AyuCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "AYU — карточки товара · Curlbee Design",
  description: "Серия карточек AYU о тихом технологичном компаньоне, который чувствует присутствие и остаётся рядом.",
};

export default async function AyuCardsPage({ searchParams }: AyuCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: AyuCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <AyuCardsClient initialLanguage={initialLanguage} />;
}
