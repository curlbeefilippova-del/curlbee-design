import type { Metadata } from "next";
import AyuCardsClient from "./ayu-cards-client";
import { createPageMetadata } from "../../seo";

export const metadata: Metadata = createPageMetadata({
  title: "AYU — карточки товара",
  description: "Серия карточек AYU о тихом технологичном компаньоне, который чувствует присутствие и отвечает светом.",
  path: "/cards/ayu",
  language: "RU",
  image: "/cards/ayu/01.webp",
  imageAlt: "AYU — product cards by Curlbee Design",
});

export default function AyuCardsPage() {
  return <AyuCardsClient initialLanguage="RU" />;
}
