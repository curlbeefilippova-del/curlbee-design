import type { Metadata } from "next";
import HomeClient, { type Language } from "./home-client";
import { createPageMetadata, seoLanguage, SITE_URL } from "./seo";

type PageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const language = seoLanguage(params?.lang);

  return createPageMetadata({
    title: language === "EN"
      ? "Curlbee Design — Yulia Filippova’s portfolio"
      : "Curlbee Design — портфолио Юлии Филипповой",
    description: language === "EN"
      ? "Independent visual designer working across branding, web design, product cards and character-led visual systems."
      : "Портфолио Юлии Филипповой: брендинг, веб-дизайн, продуктовые карточки и визуальные системы с характером.",
    path: "/",
    language,
    image: "/curlbee-mark.png",
    imageAlt: "Curlbee Design",
  });
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialLanguage: Language = params?.lang?.toLowerCase() === "en" ? "EN" : "RU";

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
      <HomeClient initialLanguage={initialLanguage} />
    </>
  );
}
