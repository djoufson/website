import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";


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
  debugger;
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
