import type { Metadata } from "next";

export const SITE_URL = "https://curlbeedesign.com";
export const SITE_NAME = "Curlbee Design";

export type SeoLanguage = "RU" | "EN";

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  language: SeoLanguage;
  image?: string;
  imageAlt?: string;
};

export function seoLanguage(lang?: string): SeoLanguage {
  return lang?.toLowerCase() === "en" ? "EN" : "RU";
}

export function localizedUrls(path: string) {
  const canonicalPath = path === "/" ? "/" : path;

  return {
    ru: canonicalPath,
    en: `${canonicalPath}?lang=en`,
    default: canonicalPath,
  };
}

export function createPageMetadata({
  title,
  description,
  path,
  language,
  image,
  imageAlt,
}: PageMetadataInput): Metadata {
  const urls = localizedUrls(path);
  const canonical = language === "EN" ? urls.en : urls.ru;
  const resolvedTitle = title.includes(SITE_NAME) ? title : `${title} · ${SITE_NAME}`;
  const openGraphImages = image
    ? [{ url: image, alt: imageAlt ?? title }]
    : undefined;

  return {
    title: { absolute: resolvedTitle },
    description,
    alternates: {
      canonical,
      languages: {
        "ru-RU": urls.ru,
        "en-US": urls.en,
        "x-default": urls.default,
      },
    },
    openGraph: {
      title: resolvedTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: language === "EN" ? "en_US" : "ru_RU",
      alternateLocale: language === "EN" ? ["ru_RU"] : ["en_US"],
      type: "website",
      images: openGraphImages,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: resolvedTitle,
      description,
      images: image ? [image] : undefined,
    },
  };
}
