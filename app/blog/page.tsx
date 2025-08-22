import { getAllPosts } from "@/lib/blog";
import { BlogCard } from "@/components/blog-card";
import LottieAnimation from "@/components/LottieAnimation";

export default async function BlogPage() {
  const posts = await getAllPosts();

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

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">No blog posts found.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

export const metadata = {
  title: "Blog",
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
