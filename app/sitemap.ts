import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/blog";
import { projects } from "@/data/projects";

const locales = ["en", "fr"] as const;

function getUrl(pathname: string, locale: string) {
  const baseUrl = "https://djoufson.com";
  return locale === "en"
    ? `${baseUrl}${pathname}`
    : `${baseUrl}/${locale}${pathname}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://djoufson.com";
  const blogSlugs = getAllPostSlugs();

  // Static pages (both locales)
  const staticPaths = [
    { path: "", priority: 1, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/projects", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/community", priority: 0.7, changeFrequency: "monthly" as const },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" as const },
  ];

  const staticPages = staticPaths.flatMap(({ path, priority, changeFrequency }) =>
    locales.map((locale) => ({
      url: getUrl(path, locale),
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, getUrl(path, l)])
        ),
      },
    }))
  );

  // Blog post pages (English only — blog content is English-only)
  const blogPages = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Project detail pages (both locales — UI labels are translated)
  const projectPages = locales.flatMap((locale) =>
    projects.map((project) => ({
      url: getUrl(`/projects/${project.id}`, locale),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, getUrl(`/projects/${project.id}`, l)])
        ),
      },
    }))
  );

  return [...staticPages, ...blogPages, ...projectPages];
}
