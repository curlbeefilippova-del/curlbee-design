import type { Metadata } from "next";
import CraftedCardsClient from "./crafted-cards-client";
import { createPageMetadata } from "../../seo";

export const metadata: Metadata = createPageMetadata({
  title: "CRAFTED — карточки товара",
  description: "Серия карточек товара CRAFTED: точная модульная система для механической клавиатуры.",
  path: "/cards/crafted",
  language: "RU",
  image: "/cards/crafted/01.webp",
  imageAlt: "CRAFTED — product cards by Curlbee Design",
});

export default function CraftedCardsPage() {
  return <CraftedCardsClient initialLanguage="RU" />;
}
