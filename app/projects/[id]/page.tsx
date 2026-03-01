import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/badge";
import { Metadata } from "next";
import {
  Github,
  ExternalLink,
  Target,
  Users,
  Award,
  Lightbulb,
  Star,
  GitFork,
  Download,
  Handshake,
  Calendar,
  ArrowLeft,
  Paperclip,
} from "lucide-react";

export async function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: `${project.title} - Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Djoufson Che Bene`,
      description: project.description,
      url: `https://djoufson.com/projects/${id}`,
      type: "article",
      images: project.imageUrl
        ? [{ url: project.imageUrl, width: 1200, height: 630, alt: project.title }]
        : undefined,
    },
    twitter: {
      title: `${project.title} - Djoufson Che Bene`,
      description: project.description,
      images: project.imageUrl ? [project.imageUrl] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-4xl py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold">{project.title}</h1>
          <Badge variant={project.status === "active" ? "default" : "secondary"}>
            {project.status}
          </Badge>
        </div>
        <p className="text-muted-foreground leading-relaxed">{project.description}</p>
      </div>

      {/* Image */}
      {project.imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-8">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-8">
        {project.technologies.map((tech) => (
          <Badge key={tech} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>

      {/* Meta info */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {project.role && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>{project.role}</span>
          </div>
        )}
        {project.startDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>
              {project.startDate}
              {project.endDate ? ` - ${project.endDate}` : " - Present"}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-8">
        {/* Impact */}
        {project.impact && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Target className="w-4 h-4" />
              Impact
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {project.impact}
            </p>
          </section>
        )}

        {/* Metrics */}
        {project.metrics && Object.keys(project.metrics).length > 0 && (
          <section>
            <h2 className="font-medium mb-3">Metrics</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.stars !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4" />
                  <span>{project.metrics.stars} stars</span>
                </div>
              )}
              {project.metrics.forks !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <GitFork className="w-4 h-4" />
                  <span>{project.metrics.forks} forks</span>
                </div>
              )}
              {project.metrics.downloads !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Download className="w-4 h-4" />
                  <span>{project.metrics.downloads} downloads</span>
                </div>
              )}
              {project.metrics.contributors !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Handshake className="w-4 h-4" />
                  <span>{project.metrics.contributors} contributors</span>
                </div>
              )}
              {project.metrics.users !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4" />
                  <span>{project.metrics.users} users</span>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Key Features / Highlights */}
        {project.highlights && project.highlights.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Award className="w-4 h-4" />
              Key Features
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              {project.highlights.map((highlight, i) => (
                <li key={i}>{highlight}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Achievements */}
        {project.achievements && project.achievements.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Achievements
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              {project.achievements.map((achievement, i) => (
                <li key={i}>{achievement}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Challenges & Solutions
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              {project.challenges.map((challenge, i) => (
                <li key={i}>{challenge}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Lessons */}
        {project.lessons && project.lessons.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              Key Learnings
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5">
              {project.lessons.map((lesson, i) => (
                <li key={i}>{lesson}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Collaborators */}
        {project.collaborators && project.collaborators.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Collaborators
            </h2>
            <div className="space-y-2">
              {project.collaborators.map((collaborator, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-sm">{collaborator.name}</span>
                  <span className="text-xs text-muted-foreground">
                    ({collaborator.role})
                  </span>
                  {collaborator.githubUrl && (
                    <a
                      href={collaborator.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Downloads */}
        {project.downloads && project.downloads.length > 0 && (
          <section>
            <h2 className="font-medium mb-3 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Downloads
            </h2>
            <div className="space-y-2">
              {project.downloads.map((download, i) => (
                <a
                  key={i}
                  href={download.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-3 rounded-md border hover:bg-muted/50 transition-colors"
                >
                  <Paperclip className="w-4 h-4 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium">{download.name}</div>
                    {download.description && (
                      <div className="text-xs text-muted-foreground">
                        {download.description}
                      </div>
                    )}
                  </div>
                  <Download className="w-4 h-4 text-muted-foreground" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors text-sm"
            >
              <Github className="w-4 h-4" />
              View on GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border hover:bg-muted transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Visit Website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
