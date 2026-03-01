import { getAllPosts } from "@/lib/blog";
import BlogListingContent from "./BlogListingContent";

export default async function BlogPage() {
  const posts = await getAllPosts();

  const allTags = Array.from(
    new Set(posts.flatMap((post) => post.tags ?? []))
  ).sort();

  return <BlogListingContent posts={posts} allTags={allTags} />;
}

export const metadata = {
  title: "Blog",
  alternates: { canonical: "/blog" },
  description: "Technical blog posts about software development, web technologies, .NET, React, TypeScript, and programming best practices. Learn from real-world experiences and tutorials.",
  keywords: [
    "Technical Blog",
    "Software Development", 
    "Programming Tutorials",
    "Web Development",
    "React",
    "Next.js",
    ".NET",
    "C#",
    "TypeScript",
    "JavaScript",
    "Entity Framework",
    "Best Practices"
  ],
  openGraph: {
    title: "Technical Blog",
    description: "Technical blog posts about software development, web technologies, and programming best practices.",
    url: "https://djoufson.com/blog",
    type: "website",
  },
  twitter: {
    title: "Technical Blog",
    description: "Technical blog posts about software development, web technologies, and programming best practices.",
  },
};
