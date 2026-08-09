import type { Metadata } from "next";
import VelumCardsClient, { type CardsLanguage } from "./velum-cards-client";
import { createPageMetadata, seoLanguage } from "../../seo";

type VelumCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: VelumCardsPageProps): Promise<Metadata> {
  const query = await searchParams;
  const language = seoLanguage(query?.lang);

  return createPageMetadata({
    title: `VÉLUM — ${language === "EN" ? "product cards" : "карточки товара"}`,
    description: language === "EN"
      ? "A warm, tactile product-card world for premium hair oil, shaped by amber light and editorial rhythm."
      : "Серия карточек VÉLUM: тёплый тактильный мир премиального масла для волос.",
    path: "/cards/velum",
    language,
    image: "/cards/velum/01.png",
    imageAlt: "VÉLUM — product cards by Curlbee Design",
  });
}

export default async function VelumCardsPage({ searchParams }: VelumCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: CardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <VelumCardsClient initialLanguage={initialLanguage} />;
}
