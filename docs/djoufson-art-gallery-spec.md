# Djoufson.com – Digital Art Gallery Feature Specification

## Overview

This document specifies a new **Digital Art Experience** for djoufson.com.

The goal is not to add a simple gallery, but to create a premium, immersive experience that complements the existing software engineering portfolio while showcasing Djoufson's identity as both:

- Software Engineer
- Community Builder
- Digital Artist

The art experience should feel intentional, high-end, and curated.

---

# Business Goals

## Primary Goals

1. Showcase digital artwork professionally.
2. Strengthen personal branding.
3. Differentiate the portfolio from typical developer websites.
4. Increase visitor engagement.
5. Create a foundation for future commission requests.

## Secondary Goals

1. Demonstrate creativity alongside technical expertise.
2. Improve storytelling around the creator.
3. Create memorable experiences for recruiters, clients, and peers.

---

# Content Strategy

## Update Website Messaging

Current positioning heavily emphasizes software engineering.

Update copy across the website to consistently present:

> Software Engineer, Community Builder, and Digital Artist.

### Hero Section

Possible positioning:

- Fullstack .NET Engineer
- Community Builder
- Digital Artist

or

- Building software.
- Growing communities.
- Creating digital art.

### About Section

Add a dedicated paragraph:

> Beyond software engineering, I create digital artwork. Drawing allows me to explore creativity, storytelling, composition, and visual expression. It complements my technical work and gives me another medium through which I build and communicate ideas.

---

# New Route

Create:

/art

Alternative aliases:

/gallery
/artwork

Primary canonical route:

/art

---

# Experience Goals

The gallery must feel different from the main website.

Main site:
- Clean
- Minimalist
- Professional

Art section:
- Immersive
- Elegant
- Visual-first

The transition should feel intentional.

---

# Information Architecture

## Gallery Landing Page

Sections:

### Hero

Large statement:

"Digital Art & Illustration"

Short description:

"A collection of digital artwork, illustrations, character designs, and creative explorations."

CTA:

"Explore Gallery"

---

### Featured Works

Show:
- 4 to 8 curated pieces

Large thumbnails.

---

### Full Gallery

Filter options:

- All
- Character Art
- Fan Art
- Portraits
- Illustrations
- Personal Projects

---

# Gallery Layout

Use masonry layout.

Requirements:

- Responsive
- Smooth image loading
- No layout shifts
- Lazy loaded

Desktop:
- 4 to 6 columns

Tablet:
- 3 columns

Mobile:
- 2 columns

---

# Artwork Detail Page

Route:

/art/[slug]

Example:

/art/straw-hat-captain

## Layout

Large artwork display.

Metadata:

- Title
- Year
- Category
- Tools Used
- Description

Optional:

- Inspiration
- Creation Process

---

# Visual Design

## Theme

Use dark mode by default inside gallery.

Suggested palette:

Background:
#0B0B0B

Text:
#F5F5F5

Muted:
#A0A0A0

Accent:
Existing website accent color

---

## Animations

Use Framer Motion.

Examples:

- Fade-in
- Parallax scrolling
- Smooth zoom transitions
- Hover enlargement

Avoid:
- Excessive motion
- Flashy effects

Artwork must remain the focus.

---

# Image Pipeline

## Storage

**V1 (implemented):** images are committed under `public/assets/art/` as
self-owned placeholders/artwork. This keeps the feature fully self-contained and
matches how the rest of the site references imagery (`public/assets/...`).

**Future:** migrate masters to Azure Blob Storage or Cloudflare R2 and swap each
`Artwork.imageUrl` for a remote URL, registering a remote loader/`remotePatterns`
in `next.config.ts`. No other code changes are required - the data model already
isolates the image source behind `imageUrl`.

Originals (PSD / Clip Studio / Procreate masters) are never committed or exposed.

---

## Formats

Master files:

PSD
Clip Studio
Procreate exports

Never expose originals publicly.

---

## Delivery Formats

Use:

WebP
AVIF

Fallback:

JPEG

---

## Generated Sizes

Generate:

- Thumbnail: 400px
- Card: 1200px
- Detail View: 2200px

Keep originals offline.

---

## Next.js Requirements

Use:

next/image

Requirements:

- Lazy loading
- Responsive sizes
- Blur placeholders
- Automatic optimization

---

# Copyright Protection

Important:

No website can fully prevent image theft.

The objective is deterrence.

## Measures

### 1. Reduced Resolution

Never expose original files.

Serve maximum:

2200px

---

### 2. Watermark

Subtle watermark:

© Djoufson Che

Position:
- Bottom right
- Low opacity

Must not ruin artwork.

---

### 3. Disable Casual Saving

Implement:

- Disable drag events
- Disable image context menu

Note:

This only discourages casual theft.

---

### 4. Metadata

Embed:

Author: Djoufson Che
Website: https://djoufson.com

Inside exported images.

---

### 5. Copyright Notice

Display on artwork page:

"All artworks are copyright protected and may not be reproduced, redistributed, or used commercially without permission."

---

# Performance Requirements

## Lighthouse Targets

Performance: 90+
Accessibility: 95+
SEO: 95+
Best Practices: 95+

---

## Loading Strategy

Initial page:

Load only visible images.

Use:

- Lazy loading
- Infinite scroll or pagination

Avoid loading entire gallery at once.

---

# SEO

## Structured Data

Implement:

VisualArtwork schema.

Fields:

- name
- creator
- image
- dateCreated
- description

---

## Metadata

Each artwork page must have:

- unique title
- unique description
- OpenGraph image

---

# Accessibility

Requirements:

- Keyboard navigation
- Focus states
- Alt text for all images
- Reduced motion support

---

# Future Commission System

Not required for V1.

Design data model with future support.

Artwork model (implemented - each artwork is a *post* that may hold several
images, e.g. sketch → final versions of the same piece):

```ts
interface ArtworkImage {
  src: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string; // "Sketch", "Color pass", "Final", …
}

interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  date: string; // ISO YYYY-MM-DD
  images: ArtworkImage[]; // first image is the grid cover
  toolsUsed: string[];
  featured: boolean;
  commissionable: boolean; // reserved for the future commission workflow
  medium?: string;
  inspiration?: string;
  process?: string;
}
```

Post detail is a fullscreen, theme-aware viewer (`/art/[slug]`): the artwork
fills the stage with a details panel alongside it, navigable entirely by
keyboard (← / → across images then posts, Esc to close) and shareable by URL.

Future features:

- Request commission button
- Pricing page
- Contact form
- Booking workflow

---

# Suggested Tech Stack

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion

Content:
- Typed data file (`data/artworks.ts` + `types/Artwork.ts`) - matches the
  existing `data/projects.ts` pattern used across the site. (MDX / Content
  Collections were considered but rejected to stay consistent with the codebase.)

Storage:
- `public/assets/art/` for V1 (Azure Blob Storage or Cloudflare R2 in future)

Optimization:
- next/image (blur placeholders, responsive `sizes`, lazy loading)

i18n:
- next-intl (`/art` and `/fr/art`), matching the rest of the site

Animations:
- Framer Motion (already a project dependency)

Analytics:
- Existing Google Analytics setup (reused; Plausible/Umami not adopted)

---

# Definition of Done

The feature is complete when:

- Dedicated /art experience exists.
- Main website reflects digital artist identity.
- Gallery is responsive.
- Artwork detail pages exist.
- Image optimization is implemented.
- Copyright deterrence measures are implemented.
- Accessibility requirements pass.
- SEO metadata exists.
- Architecture supports future commissions.
