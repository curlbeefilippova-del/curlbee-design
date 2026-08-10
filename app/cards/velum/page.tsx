import type { Metadata } from "next";
import VelumCardsClient from "./velum-cards-client";
import { createPageMetadata } from "../../seo";

export const metadata: Metadata = createPageMetadata({
  title: "VÉLUM — карточки товара",
  description: "Серия карточек VÉLUM: тёплый тактильный мир премиального масла для волос.",
  path: "/cards/velum",
  language: "RU",
  image: "/cards/velum/01.png",
  imageAlt: "VÉLUM — product cards by Curlbee Design",
});

export default function VelumCardsPage() {
  return <VelumCardsClient initialLanguage="RU" />;
}
