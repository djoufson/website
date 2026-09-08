import { artworks } from "@/data/artworks";
import { Artwork, ArtworkCategory } from "@/types/Artwork";

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

export function getAllArtworks(): Artwork[] {
  return artworks;
}

export function getFeaturedArtworks(): Artwork[] {
  return artworks.filter((a) => a.featured);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return artworks.find((a) => a.slug === slug);
}

/** Categories that actually have at least one piece, in display order. */
export function getUsedCategories(): ArtworkCategory[] {
  const used = new Set(artworks.map((a) => a.category));
  return ARTWORK_CATEGORIES.filter((c) => used.has(c));
}
