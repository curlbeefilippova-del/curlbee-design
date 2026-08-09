export type TypographyLanguage = "RU" | "EN";

const RUSSIAN_SHORT_WORDS = /(^|[\s(«„“—-])((?:а|в|во|да|до|за|и|из|к|ко|на|не|но|о|об|от|по|с|со|у))\s+/giu;

export function typographicText(text: string, language: TypographyLanguage) {
  const protectedShortWords = language === "RU"
    ? text.replace(RUSSIAN_SHORT_WORDS, "$1$2\u00a0")
    : text;

  return protectedShortWords.replace(/\s+(\S+)$/u, "\u00a0$1");
}

export function typographicCopy<T>(value: T, language: TypographyLanguage): T {
  if (typeof value === "string") {
    return typographicText(value, language) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => typographicCopy(item, language)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) => [key, typographicCopy(item, language)]),
    ) as T;
  }

  return value;
}
