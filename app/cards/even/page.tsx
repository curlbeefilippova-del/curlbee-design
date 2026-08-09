import type { Metadata } from "next";
import EvenCardsClient, { type EvenCardsLanguage } from "./even-cards-client";

type EvenCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export const metadata: Metadata = {
  title: "EVEN — карточки товара · Curlbee Design",
  description: "Серия карточек EVEN о силуэте, материале и одежде, созданной для каждого.",
};

export default async function EvenCardsPage({ searchParams }: EvenCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: EvenCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <EvenCardsClient initialLanguage={initialLanguage} />;
}
