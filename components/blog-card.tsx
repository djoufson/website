import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { Calendar, User } from "lucide-react";

interface BlogCardProps {
  post: BlogPostMeta;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-lg border transition-shadow duration-300">
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col md:flex-row overflow-hidden rounded-lg"
      >
        <div className="relative h-48 md:h-auto w-full md:w-[300px] flex-shrink-0 overflow-hidden">
          {post.banner ? (
            <Image
              src={post.banner}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
              <span>No Image</span>
            </div>
          )}
        </div>

        <div className="p-6 flex flex-col w-full">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h2>

          {post.excerpt && (
            <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
              {post.excerpt}
            </p>
          )}

          <div className="flex items-center justify-between text-sm text-muted-foreground mt-auto pt-4 border-t border-dashed w-full">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}
