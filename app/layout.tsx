import type { Metadata } from "next";
import "./globals.css";
import { SITE_NAME, SITE_URL } from "./seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Curlbee Design — портфолио Юлии Филипповой",
    template: "%s · Curlbee Design",
  },
  description: "Портфолио Юлии Филипповой: брендинг, веб-дизайн, продуктовые карточки и визуальные системы с характером.",
  keywords: [
    "Curlbee Design",
    "Юлия Филиппова",
    "Курлби Дизайн",
    "портфолио дизайнера",
    "visual designer",
    "web design",
    "branding",
    "product cards",
  ],
  authors: [{ name: "Юлия Филиппова", url: SITE_URL }],
  creator: "Юлия Филиппова",
  publisher: SITE_NAME,
  category: "design portfolio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/curlbee-logo.svg",
    shortcut: "/curlbee-logo.svg",
    apple: "/curlbee-mark.png",
  },
  openGraph: {
    title: "Curlbee Design — портфолио Юлии Филипповой",
    description: "Design with a pulse — брендинг, веб-дизайн и продуктовые истории.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_RU",
    alternateLocale: ["en_US"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/fonts/manrope-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/literata-cyrillic-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/manrope-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/literata-latin-wght-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var params=new URLSearchParams(location.search);document.documentElement.lang=params.get("lang")==="en"?"en":"ru";var themeKey="curlbee-theme";var savedTheme=localStorage.getItem(themeKey);var theme=savedTheme==="light"||savedTheme==="dark"?savedTheme:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");var motionKey="curlbee-motion";var savedMotion=localStorage.getItem(motionKey);var motion=savedMotion==="on"||savedMotion==="off"?savedMotion:(matchMedia("(prefers-reduced-motion: reduce)").matches?"off":"on");document.documentElement.dataset.theme=theme;document.documentElement.dataset.motion=motion;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.lang="ru";document.documentElement.dataset.theme="light";document.documentElement.dataset.motion="on";}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
