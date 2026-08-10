import type { Metadata } from "next";
import HomeClient from "./home-client";
import { createPageMetadata, SITE_URL } from "./seo";

export const metadata: Metadata = createPageMetadata({
  title: "Curlbee Design — портфолио Юлии Филипповой",
  description: "Портфолио Юлии Филипповой: брендинг, веб-дизайн, продуктовые карточки и визуальные системы с характером.",
  path: "/",
  language: "RU",
  image: "/curlbee-mark.png",
  imageAlt: "Curlbee Design",
});

export default function Home() {

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: "Curlbee Design",
        alternateName: ["Curlbee", "Курлби Дизайн"],
        inLanguage: ["ru", "en"],
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#yulia-filippova`,
        name: "Юлия Филиппова",
        alternateName: ["Yulia Filippova", "Curlbee Design"],
        url: SITE_URL,
        image: `${SITE_URL}/curlbee-mark.png`,
        jobTitle: "Visual Designer",
        email: "mailto:curlbeefilippova@gmail.com",
        sameAs: ["https://t.me/CURLBEEFILIPPOVA"],
        knowsAbout: ["Branding", "Web design", "Product cards", "Figma", "AI-assisted design"],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <HomeClient initialLanguage="RU" />
    </>
  );
}
