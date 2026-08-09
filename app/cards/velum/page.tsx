import type { Metadata } from "next";
import VelumCardsClient, { type CardsLanguage } from "./velum-cards-client";

type VelumCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "VÉLUM — карточки товара · Curlbee Design",
  description: "Серия карточек товара VÉLUM: отдельный визуальный мир внутри системы Curlbee Design.",
};

export default async function VelumCardsPage({ searchParams }: VelumCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: CardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <VelumCardsClient initialLanguage={initialLanguage} />;
}
