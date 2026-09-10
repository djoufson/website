import { artworks } from "@/data/artworks";
import { Artwork, ArtworkCategory, ArtworkImage } from "@/types/Artwork";

export const ARTWORK_CATEGORIES: ArtworkCategory[] = [
  "character-art",
  "fan-art",
  "portraits",
  "illustrations",
  "personal-projects",
];

/** Maps a category to its camelCase i18n key under the `Art.categories` namespace. */
export const CATEGORY_LABEL_KEY: Record<ArtworkCategory, string> = {
  "character-art": "characterArt",
  "fan-art": "fanArt",
  portraits: "portraits",
  illustrations: "illustrations",
  "personal-projects": "personalProjects",
};

/** Posts newest-first, so the gallery reads like a feed. */
export function getAllArtworks(): Artwork[] {
  return [...artworks].sort((a, b) => b.date.localeCompare(a.date));
}

export function getFeaturedArtworks(): Artwork[] {
  return getAllArtworks().filter((a) => a.featured);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

/** The cover image shown in the grid (first image of the post). */
export function coverImage(artwork: Artwork): ArtworkImage {
  return artwork.images[0];
}

/** Categories that actually have at least one piece, in display order. */
export function getUsedCategories(): ArtworkCategory[] {
  const used = new Set(artworks.map((a) => a.category));
  return ARTWORK_CATEGORIES.filter((c) => used.has(c));
}

/**
 * Previous/next post slugs in feed order, for keyboard browsing in the viewer.
 * Returns undefined at the ends (no wraparound).
 */
export function getAdjacentSlugs(slug: string): {
  prev?: string;
  next?: string;
} {
  const ordered = getAllArtworks();
  const i = ordered.findIndex((a) => a.slug === slug);
  if (i === -1) return {};
  return {
    prev: i > 0 ? ordered[i - 1].slug : undefined,
    next: i < ordered.length - 1 ? ordered[i + 1].slug : undefined,
  };
}
