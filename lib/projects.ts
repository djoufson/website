import fs from "fs";
import path from "path";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";

const projectsContentDirectory = path.join(process.cwd(), "content/projects");

export async function getProjectContent(slug: string): Promise<string | null> {
  try {
    const fullPath = path.join(projectsContentDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const processedContent = await remark()
      .use(remarkRehype)
      .use(rehypeSlug)
      .use(rehypeHighlight, {
        aliases: {
          cs: "csharp",
          txt: "plaintext",
        },
      })
      .use(rehypeStringify)
      .process(fileContents);

    return processedContent.toString();
  } catch (error) {
    console.error(`Error reading project content for ${slug}:`, error);
    return null;
  }
}
