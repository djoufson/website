"use client";

import { Artwork } from "@/types/Artwork";
import ArtworkCard from "./ArtworkCard";

interface MasonryGalleryProps {
  artworks: Artwork[];
  /** How many of the first cards load eagerly (above the fold). */
  eagerCount?: number;
  /** Override the responsive column classes (e.g. fewer columns for featured). */
  columnsClassName?: string;
  /** Responsive `sizes` hint forwarded to each image. */
  sizes?: string;
}

/**
 * Responsive masonry using CSS multi-columns: 2 columns on mobile, 3 on
 * tablet, up to 5 on large screens. `break-inside-avoid` on each card keeps
 * pieces from splitting across columns, and intrinsic width/height on the
 * images prevents layout shift as they load lazily.
 */
export default function MasonryGallery({
  artworks,
  eagerCount = 4,
  columnsClassName = "columns-2 md:columns-3 lg:columns-4 xl:columns-5",
  sizes = "(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1280px) 25vw, 20vw",
}: MasonryGalleryProps) {
  return (
    <div className={`gap-4 ${columnsClassName}`}>
      {artworks.map((artwork, index) => (
        <ArtworkCard
          key={artwork.id}
          artwork={artwork}
          index={index}
          priority={index < eagerCount}
          sizes={sizes}
        />
      ))}
    </div>
  );
}
