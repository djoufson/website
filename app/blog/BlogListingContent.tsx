"use client"

import { useState } from "react";
import { BlogPostMeta } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import LottieAnimation from "@/components/LottieAnimation";

interface BlogListingContentProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export default function BlogListingContent({ posts, allTags }: BlogListingContentProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = selectedTag
    ? posts.filter((post) => post.tags?.includes(selectedTag))
    : posts;

  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-4">Blog</h1>
          <p className="text-muted-foreground leading-relaxed">
            Here you can read my thoughts on technology, software engineering,
            and other topics I&apos;m passionate about.
          </p>
        </div>
        <LottieAnimation animationPath="/animations/writing-animation.json" />
      </div>

      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
              selectedTag === null
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                selectedTag === tag
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {selectedTag ? `No posts found for "${selectedTag}".` : "No blog posts found."}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
