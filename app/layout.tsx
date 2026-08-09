import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Curlbee Design — портфолио",
  description: "Портфолио независимого дизайнера: бренды, продукты, презентации и визуальные системы с характером.",
  icons: {
    icon: "/curlbee-logo.svg",
    shortcut: "/curlbee-logo.svg",
    apple: "/curlbee-mark.png",
  },
  openGraph: {
    title: "Curlbee Design",
    description: "Design with a pulse — бренды, продукты и презентации.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var params=new URLSearchParams(location.search);document.documentElement.lang=params.get("lang")==="en"?"en":"ru";var key="curlbee-theme";var saved=localStorage.getItem(key);var theme=saved==="light"||saved==="dark"?saved:(matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;}catch(e){document.documentElement.lang="ru";document.documentElement.dataset.theme="light";}})();`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
