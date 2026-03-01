import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { getProjectContent } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { CodeBlockCopy } from "@/components/CodeBlockCopy";
import { shimmerBlurDataURL } from "@/lib/image";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
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
  CheckCircle,
  BookOpen,
} from "lucide-react";

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => projects.map((p) => ({ locale, id: p.id })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  const localizedUrl = locale === "fr"
    ? `https://djoufson.com/fr/projects/${id}`
    : `https://djoufson.com/projects/${id}`;

  return {
    title: `${project.title} - Projects`,
    description: project.description,
    openGraph: {
      title: `${project.title} - Djoufson Che Bene`,
      description: project.description,
      url: localizedUrl,
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
    alternates: {
      canonical: `/projects/${id}`,
      languages: { en: `/projects/${id}`, fr: `/fr/projects/${id}` },
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "Projects" });
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  const markdownContent = project.contentSlug
    ? await getProjectContent(project.contentSlug)
    : null;

  const metricEntries: { icon: typeof Star; value: number; label: string }[] = [];
  if (project.metrics) {
    if (project.metrics.stars !== undefined)
      metricEntries.push({ icon: Star, value: project.metrics.stars, label: "Stars" });
    if (project.metrics.forks !== undefined)
      metricEntries.push({ icon: GitFork, value: project.metrics.forks, label: "Forks" });
    if (project.metrics.downloads !== undefined)
      metricEntries.push({ icon: Download, value: project.metrics.downloads, label: "Downloads" });
    if (project.metrics.contributors !== undefined)
      metricEntries.push({ icon: Handshake, value: project.metrics.contributors, label: "Contributors" });
    if (project.metrics.users !== undefined)
      metricEntries.push({ icon: Users, value: project.metrics.users, label: "Users" });
  }

  return (
    <div className="container max-w-4xl py-16">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('backToProjects')}
      </Link>

      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <h1 className="text-3xl font-semibold">{project.title}</h1>
          <Badge variant={project.status === "active" ? "default" : "secondary"}>
            {project.status}
          </Badge>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge key={tech} variant="secondary">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* Quick facts bar */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 py-4 mb-8 border-y text-sm text-muted-foreground">
        {project.role && (
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{project.role}</span>
          </div>
        )}
        {project.startDate && (
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>
              {project.startDate}
              {project.endDate ? ` - ${project.endDate}` : ` - ${t('present')}`}
            </span>
          </div>
        )}
        {project.category && (
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span className="capitalize">{project.category}</span>
          </div>
        )}
      </div>

      {/* Hero Image */}
      {project.imageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-10">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={shimmerBlurDataURL}
          />
        </div>
      )}

      {/* Overview: Impact + Metrics */}
      {(project.impact || metricEntries.length > 0) && (
        <section className="mb-10">
          {project.impact && (
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-3 flex items-center gap-2">
                <Target className="w-5 h-5" />
                {t('impact')}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {project.impact}
              </p>
            </div>
          )}
          {metricEntries.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {metricEntries.map((metric) => {
                const IconComponent = metric.icon;
                return (
                  <div
                    key={metric.label}
                    className="flex flex-col items-center p-4 rounded-lg border bg-muted/30 text-center"
                  >
                    <IconComponent className="w-5 h-5 mb-2 text-muted-foreground" />
                    <div className="text-2xl font-semibold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Markdown Content */}
      {markdownContent && (
        <section className="mb-10">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: markdownContent }}
          />
          <CodeBlockCopy />
        </section>
      )}

      {/* Key Features */}
      {project.highlights && project.highlights.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Award className="w-5 h-5" />
            {t('keyFeatures')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.highlights.map((highlight, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-lg border bg-muted/20"
              >
                <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4">{t('gallery')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {project.gallery.map((image, i) => (
              <div
                key={i}
                className="relative aspect-video rounded-lg overflow-hidden bg-muted"
              >
                <Image
                  src={image}
                  alt={`${project.title} - Screenshot ${i + 1}`}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL={shimmerBlurDataURL}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Journey: Challenges + Achievements side by side */}
      {((project.challenges && project.challenges.length > 0) ||
        (project.achievements && project.achievements.length > 0)) && (
        <section className="mb-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Challenges */}
            {project.challenges && project.challenges.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5" />
                  {t('challenges')}
                </h2>
                <div className="space-y-3">
                  {project.challenges.map((challenge, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground pt-0.5">{challenge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {project.achievements && project.achievements.length > 0 && (
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  {t('achievements')}
                </h2>
                <div className="space-y-3">
                  {project.achievements.map((achievement, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <CheckCircle className="w-4 h-4 mt-0.5 text-green-500 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Lessons Learned */}
      {project.lessons && project.lessons.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            {t('keyLearnings')}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.lessons.map((lesson, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border-l-4 border-primary/30 bg-muted/20"
              >
                <p className="text-sm text-muted-foreground">{lesson}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Collaborators */}
      {project.collaborators && project.collaborators.length > 0 && (
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Users className="w-5 h-5" />
            {t('collaborators')}
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
        <section className="mb-10">
          <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
            <Download className="w-5 h-5" />
            {t('downloads')}
          </h2>
          <div className="space-y-2">
            {project.downloads.map((download, i) => (
              <a
                key={i}
                href={download.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-muted/50 transition-colors"
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

      {/* Bottom CTA Links */}
      {(project.githubUrl || project.liveUrl) && (
        <div className="flex flex-wrap gap-4 pt-8 border-t">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors text-sm font-medium"
            >
              <Github className="w-4 h-4" />
              {t('viewOnGithub')}
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border hover:bg-muted transition-colors text-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              {t('visitWebsite')}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
