import { Link } from "@/i18n/routing";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function FeaturedProjectsSection() {
  const t = await getTranslations('FeaturedProjects');
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="section py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">{t('heading')}</h2>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            {t('viewAll')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {featured.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                {project.imageUrl ? (
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                    {project.title}
                  </h3>
                  <Badge
                    variant={project.status === "active" ? "default" : "secondary"}
                    className="text-[10px] px-1.5 py-0"
                  >
                    {project.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
