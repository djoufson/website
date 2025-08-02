import Image from "next/image";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPostSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import { CodeBlockCopy } from "@/components/CodeBlockCopy";
import { Metadata } from "next";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container max-w-4xl py-16">
      <div className="mx-auto">
        {post.banner && (
          <div className="relative mb-8 h-64 w-full md:h-96">
            <Image
              src={post.banner}
              alt={post.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            )}
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div
          className="prose prose-neutral dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <CodeBlockCopy />
      </div>
    </article>
  );
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Create absolute URL for the image
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://djoufson.com";
  const bannerUrl = post.banner
    ? post.banner.startsWith("http")
      ? post.banner
      : `${baseUrl}${post.banner}`
    : `${baseUrl}/assets/default-banner.png`;

  return {
    title: post.title,
    description:
      post.excerpt || `Read ${post.title} and discover insights on our blog.`,
    openGraph: {
      title: post.title,
      description:
        post.excerpt || `Read ${post.title} and discover insights on our blog.`,
      type: "article",
      url: `${baseUrl}/blog/${slug}`,
      images: [
        {
          url: bannerUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: "Djoufson | Blog",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description:
        post.excerpt || `Read ${post.title} and discover insights on our blog.`,
      images: [bannerUrl],
    },
    authors: post.author ? [{ name: post.author }] : undefined,
  };
}