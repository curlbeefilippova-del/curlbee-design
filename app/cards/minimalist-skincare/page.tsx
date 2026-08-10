import type { Metadata } from "next";
import MinimalistCardsClient from "./minimalist-cards-client";
import { createPageMetadata } from "../../seo";

export const metadata: Metadata = createPageMetadata({
  title: "MINIMALIST SKINCARE — карточки товара",
  description: "Серия карточек MINIMALIST SKINCARE: вода, минеральный свет и точная визуальная система.",
  path: "/cards/minimalist-skincare",
  language: "RU",
  image: "/cards/minimalist-skincare/01.webp",
  imageAlt: "MINIMALIST SKINCARE — product cards by Curlbee Design",
});

export default function MinimalistCardsPage() {
  return <MinimalistCardsClient initialLanguage="RU" />;
}
