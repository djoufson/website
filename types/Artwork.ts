export type ArtworkCategory =
  | "character-art"
  | "fan-art"
  | "portraits"
  | "illustrations"
  | "personal-projects";

/** A single image within a post. A post may hold several (e.g. sketch → final). */
export interface ArtworkImage {
  /** Public path (max 2200px delivery). */
  src: string;
  /** Intrinsic pixels - required so the viewer/grid reserve space (no layout shift). */
  width: number;
  height: number;
  /** Optional descriptive alt; falls back to the post title. */
  alt?: string;
  /** Optional short label for this version, e.g. "Sketch", "Color pass", "Final". */
  caption?: string;
}

/**
 * A digital art *post*. Modeled like a social post: one entry can carry
 * multiple images (versions of the same piece) plus its own metadata.
 *
 * `commissionable` is kept so a future commission workflow can layer on
 * without a data migration. See docs/djoufson-art-gallery-spec.md.
 */
export interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ArtworkCategory;
  /** ISO date (YYYY-MM-DD) the piece was created/posted. */
  date: string;
  /** One or more images; the first is the cover shown in the grid. */
  images: ArtworkImage[];
  toolsUsed: string[];
  featured: boolean;
  commissionable: boolean;
  medium?: string;
  inspiration?: string;
  process?: string;
}
