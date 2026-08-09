import HomeClient, { type Language } from "./home-client";

type PageProps = {
  searchParams?: Promise<{ lang?: string }>;
};

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialLanguage: Language = params?.lang?.toLowerCase() === "en" ? "EN" : "RU";

  return <HomeClient initialLanguage={initialLanguage} />;
}
