import { describe, it, expect } from "vitest";
import { extractHeadings } from "@/lib/blog";

describe("extractHeadings", () => {
  it("extracts h2 and h3 headings with ids", () => {
    const html =
      '<h2 id="intro">Introduction</h2><p>text</p><h3 id="sub">Subsection</h3>';
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(2);
    expect(headings[0]).toEqual({ level: 2, id: "intro", text: "Introduction" });
    expect(headings[1]).toEqual({ level: 3, id: "sub", text: "Subsection" });
  });

  it("strips nested HTML tags from heading text", () => {
    const html = '<h2 id="test"><code>code</code> heading</h2>';
    const headings = extractHeadings(html);
    expect(headings[0].text).toBe("code heading");
  });

  it("returns empty array for no headings", () => {
    expect(extractHeadings("<p>no headings</p>")).toEqual([]);
  });

  it("ignores h1 and h4+ headings", () => {
    const html =
      '<h1 id="title">Title</h1><h2 id="section">Section</h2><h4 id="deep">Deep</h4>';
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(1);
    expect(headings[0].id).toBe("section");
  });

  it("handles headings with extra attributes", () => {
    const html = '<h2 id="foo" class="bar" data-x="y">Foo</h2>';
    const headings = extractHeadings(html);
    expect(headings).toHaveLength(1);
    expect(headings[0]).toEqual({ level: 2, id: "foo", text: "Foo" });
  });

  it("handles multiple nested tags in heading", () => {
    const html = '<h2 id="mixed"><strong>Bold</strong> and <em>italic</em></h2>';
    const headings = extractHeadings(html);
    expect(headings[0].text).toBe("Bold and italic");
  });
});
