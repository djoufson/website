import { getAllPosts } from "@/lib/blog";

export async function GET() {
  const posts = await getAllPosts();
  const baseUrl = "https://djoufson.com";

  const items = posts
    .map(
      (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.excerpt ?? ""}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.author ? `<author>${post.author}</author>` : ""}
      ${(post.tags ?? []).map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Djoufson Che Bene - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical blog posts about software development, web technologies, and programming best practices.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml.trim(), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
