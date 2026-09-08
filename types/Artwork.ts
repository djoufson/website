export type ArtworkCategory =
  | "character-art"
  | "fan-art"
  | "portraits"
  | "illustrations"
  | "personal-projects";

/**
 * Digital artwork shown in the /art gallery.
 *
 * The model intentionally carries `commissionable` so a future commission
 * workflow (request button, pricing, booking) can be layered on without a
 * data migration. See docs/djoufson-art-gallery-spec.md.
 */
export interface Artwork {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: ArtworkCategory;
  year: number;
  toolsUsed: string[];
  /** Public path to the delivered image (max 2200px, watermarked overlay applied at render). */
  imageUrl: string;
  /** Intrinsic pixel dimensions — required so masonry reserves space and avoids layout shift. */
  width: number;
  height: number;
  featured: boolean;
  commissionable: boolean;
  /** Optional narrative shown on the detail page. */
  inspiration?: string;
  process?: string;
  medium?: string;
}
