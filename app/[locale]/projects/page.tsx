import { projects } from "@/data/projects";
import ProjectsListingContent from "./ProjectsListingContent";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("projects.title"),
    description: t("projects.description"),
    alternates: { canonical: "/projects", languages: { en: "/projects", fr: "/fr/projects" } },
    openGraph: { title: t("projects.title"), description: t("projects.description"), url: locale === "fr" ? "https://djoufson.com/fr/projects" : "https://djoufson.com/projects", type: "website" },
    twitter: { title: t("projects.title"), description: t("projects.description") },
  };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const allTechnologies = Array.from(
    new Set(projects.flatMap((p) => p.technologies))
  ).sort();

  return (
    <ProjectsListingContent
      projects={projects}
      allTechnologies={allTechnologies}
    />
  );
}
