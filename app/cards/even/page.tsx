import type { Metadata } from "next";
import EvenCardsClient from "./even-cards-client";
import { createPageMetadata } from "../../seo";

export const metadata: Metadata = createPageMetadata({
  title: "EVEN — карточки товара",
  description: "Серия карточек EVEN о силуэте, материале и одежде, созданной для каждого.",
  path: "/cards/even",
  language: "RU",
  image: "/cards/even/01.webp",
  imageAlt: "EVEN — product cards by Curlbee Design",
});

export default function EvenCardsPage() {
  return <EvenCardsClient initialLanguage="RU" />;
}
