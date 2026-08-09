import type { MetadataRoute } from "next";
import { localizedUrls, SITE_URL } from "./seo";

const routes = [
  "/",
  "/projects/even",
  "/projects/crafted",
  "/projects/velum",
  "/projects/minimalist-skincare",
  "/projects/ayu",
  "/projects/the-chops",
  "/cards/even",
  "/cards/crafted",
  "/cards/velum",
  "/cards/minimalist-skincare",
  "/cards/ayu",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path, index) => {
    const urls = localizedUrls(path);

    return {
      url: `${SITE_URL}${path === "/" ? "" : path}`,
      changeFrequency: index === 0 ? "weekly" : "monthly",
      priority: index === 0 ? 1 : path.startsWith("/projects/") ? 0.8 : 0.7,
      alternates: {
        languages: {
          "ru-RU": `${SITE_URL}${urls.ru === "/" ? "" : urls.ru}`,
          "en-US": `${SITE_URL}${urls.en === "/" ? "" : urls.en}`,
          "x-default": `${SITE_URL}${urls.default === "/" ? "" : urls.default}`,
        },
      },
    };
  });
}

