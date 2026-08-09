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
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
