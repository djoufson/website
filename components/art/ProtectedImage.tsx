"use client";

import Image from "next/image";
import { shimmerBlurDataURL } from "@/lib/image";

interface ProtectedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Responsive `sizes` hint passed to next/image. */
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Show the "© Djoufson Che" watermark overlay. Defaults to true. */
  watermark?: boolean;
}

/**
 * next/image wrapper for gallery artwork that adds casual-theft deterrence:
 * disabled drag + context menu, a transparent capture layer, and a subtle
 * corner watermark. This only discourages casual saving — see the copyright
 * notice on the detail page.
 */
export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw",
  priority = false,
  className = "",
  watermark = true,
}: ProtectedImageProps) {
  return (
    <div className="relative select-none">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={shimmerBlurDataURL}
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
        onContextMenu={(e) => e.preventDefault()}
        className={`h-auto w-full ${className}`}
      />

      {/* Transparent capture layer: intercepts right-click / long-press / drag
          on top of the image so the browser's "Save image as" is harder to reach. */}
      <div
        aria-hidden
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        className="pointer-events-auto absolute inset-0"
        style={{ background: "transparent" }}
      />

      {watermark && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2.5 text-[10px] font-medium tracking-wide text-white/45 mix-blend-difference sm:text-xs"
        >
          © Djoufson Che
        </span>
      )}
    </div>
  );
}
