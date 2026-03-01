import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { ArrowRight, Calendar, Clock } from "lucide-react";

export default async function LatestPostsSection() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 3);

  if (latest.length === 0) return null;

  return (
    <section className="section py-16">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-semibold">Latest Posts</h2>
          <Link
            href="/blog"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
          >
            Read more
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {latest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-4 rounded-lg border hover:bg-muted/50 transition-colors"
            >
              <h3 className="font-medium mb-1 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              {post.excerpt && (
                <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                  {post.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
