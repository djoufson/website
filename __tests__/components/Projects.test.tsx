import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Projects from "@/components/Projects";
import { Project } from "@/types/Project";

// Mock @/i18n/routing to provide a simple Link component
vi.mock("@/i18n/routing", () => ({
  Link: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockProjects: Project[] = [
  {
    id: "test-project",
    title: "Test Project",
    description: "A test project description",
    category: "personal",
    technologies: ["React", "TypeScript"],
    status: "active",
  },
  {
    id: "second-project",
    title: "Second Project",
    description: "Another project",
    category: "open-source",
    technologies: ["Go"],
    status: "building",
  },
];

describe("Projects", () => {
  it("renders project titles", () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText("Test Project")).toBeInTheDocument();
    expect(screen.getByText("Second Project")).toBeInTheDocument();
  });

  it("renders technology badges", () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Go")).toBeInTheDocument();
  });

  it("renders project descriptions", () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText("A test project description")).toBeInTheDocument();
  });

  it("renders status badges", () => {
    render(<Projects projects={mockProjects} />);
    expect(screen.getByText("active")).toBeInTheDocument();
    expect(screen.getByText("building")).toBeInTheDocument();
  });

  it("renders links to project detail pages", () => {
    render(<Projects projects={mockProjects} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "/projects/test-project");
    expect(links[1]).toHaveAttribute("href", "/projects/second-project");
  });
});
