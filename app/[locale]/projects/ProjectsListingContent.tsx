"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Project, ProjectCategory } from "@/types/Project";
import Projects from "@/components/Projects";
import LottieAnimation from "@/components/LottieAnimation";

interface ProjectsListingContentProps {
  projects: Project[];
  allTechnologies: string[];
}

export default function ProjectsListingContent({
  projects,
  allTechnologies,
}: ProjectsListingContentProps) {
  const t = useTranslations("Projects");
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

  const categories: { label: string; value: ProjectCategory | "all" }[] = [
    { label: t('all'), value: "all" },
    { label: t('openSource'), value: "open-source" },
    { label: t('personal'), value: "personal" },
    { label: t('academic'), value: "academic" },
  ];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch =
      selectedCategory === "all" || project.category === selectedCategory;
    const techMatch =
      selectedTechs.length === 0 ||
      selectedTechs.some((tech) => project.technologies.includes(tech));
    return categoryMatch && techMatch;
  });

  const toggleTech = (tech: string) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-4">{t('heading')}</h1>
          <p className="text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </div>
        <LottieAnimation animationPath="/animations/coding-animation-hands.json" />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedCategory === cat.value
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {allTechnologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {allTechnologies.map((tech) => (
            <button
              key={tech}
              onClick={() => toggleTech(tech)}
              className={`px-2.5 py-1 text-xs rounded-md transition-colors border ${
                selectedTechs.includes(tech)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:bg-muted/80"
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      )}

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {t('noMatch')}
          </p>
        </div>
      ) : (
        <Projects projects={filteredProjects} />
      )}
    </div>
  );
}
