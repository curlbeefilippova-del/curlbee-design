import type { Metadata } from "next";
import EvenCardsClient, { type EvenCardsLanguage } from "./even-cards-client";
import { createPageMetadata, seoLanguage } from "../../seo";

type EvenCardsPageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: EvenCardsPageProps): Promise<Metadata> {
  const query = await searchParams;
  const language = seoLanguage(query?.lang);

  return createPageMetadata({
    title: `EVEN — ${language === "EN" ? "product cards" : "карточки товара"}`,
    description: language === "EN"
      ? "An editorial product-card series about silhouette, material and clothing designed for everyone."
      : "Серия карточек EVEN о силуэте, материале и одежде, созданной для каждого.",
    path: "/cards/even",
    language,
    image: "/cards/even/01.webp",
    imageAlt: "EVEN — product cards by Curlbee Design",
  });
}

export default async function EvenCardsPage({ searchParams }: EvenCardsPageProps) {
  const query = await searchParams;
  const initialLanguage: EvenCardsLanguage = query?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <EvenCardsClient initialLanguage={initialLanguage} />;
}
