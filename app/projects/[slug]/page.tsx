import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { portfolioCases } from "../../case-data";
import { createPageMetadata } from "../../seo";
import ProjectClient from "./project-client";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

function getCase(slug: string) {
  return portfolioCases[slug as keyof typeof portfolioCases];
}

export function generateStaticParams() {
  return Object.keys(portfolioCases).map((slug) => ({ slug }));
}

const projectCoverImages: Record<string, string> = {
  even: "/projects/even-cover.webp",
  crafted: "/projects/crafted.webp",
  velum: "/projects/velum.webp",
  "minimalist-skincare": "/projects/minimalist-care.webp",
  ayu: "/projects/ayu.webp",
  "the-chops": "/projects/the-chops.webp",
};

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) return {};

  return createPageMetadata({
    title: `${project.title} — дизайн-кейс`,
    description: project.summary.RU,
    path: `/projects/${project.slug}`,
    language: "RU",
    image: projectCoverImages[project.slug],
    imageAlt: `${project.title} — Curlbee Design`,
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getCase(slug);
  if (!project) notFound();

  return <ProjectClient project={project} />;
}
