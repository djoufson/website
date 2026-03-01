import { getAllPosts } from "@/lib/blog";
import BlogListingContent from "./BlogListingContent";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("blog.title"),
    description: t("blog.description"),
    alternates: { canonical: "/blog", languages: { en: "/blog", fr: "/fr/blog" } },
    openGraph: { title: t("blog.title"), description: t("blog.description"), url: locale === "fr" ? "https://djoufson.com/fr/blog" : "https://djoufson.com/blog", type: "website" },
    twitter: { title: t("blog.title"), description: t("blog.description") },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const posts = await getAllPosts();

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags ?? []))
  ).sort();

  return <BlogListingContent posts={posts} allTags={allTags} />;
}
