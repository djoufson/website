"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Link } from "@/i18n/routing";
import { Artwork } from "@/types/Artwork";
import ProtectedImage from "./ProtectedImage";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
  priority?: boolean;
  sizes?: string;
}

/**
 * A single masonry tile linking to the artwork detail page. Fades/rises in
 * when scrolled into view (respecting reduced-motion) and gently zooms the
 * image on hover.
 */
export default function ArtworkCard({
  artwork,
  index = 0,
  priority = false,
  sizes,
}: ArtworkCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, delay: reduceMotion ? 0 : (index % 6) * 0.05 }}
      className="mb-4 break-inside-avoid"
    >
      <Link
        href={`/art/${artwork.slug}`}
        className="group relative block overflow-hidden rounded-lg bg-white/5 outline-none ring-[var(--art-accent)] focus-visible:ring-2"
        aria-label={`${artwork.title} — ${artwork.year}`}
      >
        <div className="overflow-hidden">
          <div className="transition-transform duration-500 ease-out group-hover:scale-[1.04]">
            <ProtectedImage
              src={artwork.imageUrl}
              alt={artwork.title}
              width={artwork.width}
              height={artwork.height}
              priority={priority}
              sizes={sizes}
            />
          </div>
        </div>

        {/* Caption reveal on hover / focus */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <p className="text-sm font-medium text-white">{artwork.title}</p>
          <p className="text-xs text-white/70">{artwork.year}</p>
        </div>
      </Link>
    </motion.div>
  );
}
