import { projects } from "@/data/projects";
import ProjectsListingContent from "./ProjectsListingContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  alternates: { canonical: "/projects" },
  description:
    "Explore my portfolio of software projects including open-source contributions, personal applications, and academic research. Built with React, Next.js, .NET, TypeScript, and modern web technologies.",
  keywords: [
    "Portfolio",
    "Software Projects",
    "Open Source",
    "Web Applications",
    "React Projects",
    "Next.js Applications",
    ".NET Applications",
    "TypeScript Projects",
    "Full Stack Projects",
    "Academic Research",
    "Personal Projects",
  ],
  openGraph: {
    title: "Projects",
    description:
      "Explore my portfolio of software projects including open-source contributions, personal applications, and academic research.",
    url: "https://djoufson.com/projects",
    type: "website",
  },
  twitter: {
    title: "Projects",
    description:
      "Explore my portfolio of software projects including open-source contributions, personal applications, and academic research.",
  },
};

export default function ProjectsPage() {
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
