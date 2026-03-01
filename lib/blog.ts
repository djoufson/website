import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";

export interface Heading {
  id: string;
  text: string;
  level: number;
}

const postsDirectory = path.join(process.cwd(), "content/blogs");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  banner?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  content: string;
  readTime?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  banner?: string;
  excerpt?: string;
  author?: string;
  tags?: string[];
  readTime?: string;
}

// Get all blog post slugs
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

// Get blog post data by slug
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    // Process markdown to HTML with syntax highlighting
    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight, {
        aliases: {
          cs: 'csharp',
          txt: 'plaintext'
        }
      })
      .use(rehypeStringify)
      .process(content);

    const contentHtml = processedContent.toString();

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.ceil(wordCount / 200);

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString(),
      banner: data.banner || "",
      excerpt: data.excerpt || "",
      author: data.author || "Anonymous",
      tags: data.tags || [],
      content: contentHtml,
      readTime: `${readTime} min read`,
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

// Get all blog posts metadata (for listing page)
export async function getAllPosts(): Promise<BlogPostMeta[]> {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      if (!post) return null;

      // Return only metadata, not full content
      const { content, ...meta } = post;
      return meta;
    })
  );

  return posts
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Get adjacent posts (previous and next) for navigation
export async function getAdjacentPosts(slug: string): Promise<{
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
}> {
  const posts = await getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);

  if (index === -1) return { prev: null, next: null };

  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

// Extract headings from rendered HTML for table of contents
export function extractHeadings(html: string): Heading[] {
  const headings: Heading[] = [];
  const regex = /<h([23])\s+id="([^"]*)"[^>]*>(.*?)<\/h[23]>/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, ""),
    });
  }

  return headings;
}
