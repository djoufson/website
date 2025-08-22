# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Development server with Turbopack
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Linting
yarn lint

# Type checking
yarn type-check
```

## Project Architecture

This is a **Next.js 15** personal website built with the App Router pattern. The architecture follows modern React patterns with TypeScript and Tailwind CSS.

### Key Directories

- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with SEO metadata, theme provider, and global components
  - `page.tsx` - Homepage with hero section and experience components
  - `blog/[slug]/` - Dynamic blog post pages
  - `widgets/` - Page-specific components (HeroSection, ExperienceSection, etc.)

- `components/` - Reusable UI components
  - `ui/` - Shadcn/ui components (button, badge, dialog)
  - `google/` - Analytics and AdSense components
  - Theme toggle, navbar, footer, project cards

- `content/blogs/` - Markdown blog posts with frontmatter
- `lib/blog.ts` - Blog system utilities for parsing markdown and metadata
- `data/` - Static data files (projects.ts)
- `types/` - TypeScript type definitions

### Component System

Uses **Shadcn/ui** components with the "new-york" style variant. Components are configured in `components.json` with path aliases:
- `@/components` for components
- `@/lib` for utilities
- `@/` for root directory access

### Blog System

The blog system (`lib/blog.ts`) processes markdown files from `content/blogs/`:
- Uses `gray-matter` for frontmatter parsing
- `remark` and `rehype` for markdown processing with syntax highlighting
- Automatic read time calculation
- Supports tags, excerpts, banners, and custom metadata

### Styling

- **Tailwind CSS v4** for styling
- Theme support via `next-themes` with system/dark/light modes
- Lottie animations for interactive elements
- CSS variables for theming defined in `app/globals.css`

### SEO & Analytics

Comprehensive SEO setup in `app/layout.tsx`:
- OpenGraph and Twitter card metadata
- Structured data component
- Google Analytics and AdSense integration
- Sitemap and robots.txt generation

## Docker Configuration

Includes Docker setup with:
- `Dockerfile` for containerization
- `docker-compose.yaml` and `docker-compose.prod.yaml` for development and production
- Next.js `output: 'standalone'` configuration for optimized Docker builds

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`):
- Runs on Node.js 23 with Yarn
- Type checking with `yarn type-check`
- Production build verification
- Triggers on develop branch pushes and PRs to develop/main