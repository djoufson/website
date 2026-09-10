"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Artwork } from "@/types/Artwork";
import { coverImage } from "@/lib/art";
import ProtectedImage from "./ProtectedImage";

interface ArtworkGridProps {
  artworks: Artwork[];
}

/**
 * Uniform, full-width grid of posts. Fixed-size cells with the image contained
 * (never cropped) and lots of surrounding whitespace - no borders, no rounded
 * corners, nothing that competes with the artwork itself.
 */
export default function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const t = useTranslations("Art");

  return (
    <div className="grid grid-cols-2 gap-x-8 gap-y-14 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-20 lg:grid-cols-4">
      {artworks.map((artwork, i) => {
        const cover = coverImage(artwork);
        return (
          <Link
            key={artwork.id}
            href={`/art/${artwork.slug}`}
            aria-label={artwork.title}
            className="group flex flex-col outline-none"
          >
            <div className="relative aspect-square w-full">
              <ProtectedImage
                src={cover.src}
                alt={cover.alt ?? artwork.title}
                fill
                priority={i < 4}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-foreground group-hover:underline">{artwork.title}</p>
              {artwork.images.length > 1 && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {t("imagesLabel", { count: artwork.images.length })}
                </p>
              )}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
