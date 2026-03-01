import { describe, it, expect } from "vitest";
import { formatDate, cn } from "@/lib/utils";

describe("formatDate", () => {
  it("formats ISO date string to readable format", () => {
    const result = formatDate("2024-01-15");
    expect(result).toContain("January");
    expect(result).toContain("15");
    expect(result).toContain("2024");
  });

  it("formats another date correctly", () => {
    const result = formatDate("2023-12-25");
    expect(result).toContain("December");
    expect(result).toContain("25");
    expect(result).toContain("2023");
  });
});

describe("cn", () => {
  it("merges class names", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden")).toBe("base");
  });

  it("merges conflicting tailwind classes", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });

  it("handles empty inputs", () => {
    expect(cn()).toBe("");
  });
});
