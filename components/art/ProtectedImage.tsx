"use client";

import Image from "next/image";
import { shimmerBlurDataURL } from "@/lib/image";

interface ProtectedImageProps {
  src: string;
  alt: string;
  /** Intrinsic size (grid). Omit when using `fill`. */
  width?: number;
  height?: number;
  /** Fill the (relatively-positioned) parent and letterbox with object-contain. */
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Render the subtle "© Djoufson Che" watermark. Parent must be `relative`. */
  watermark?: boolean;
}

/**
 * next/image wrapper for artwork with light casual-theft deterrence: disabled
 * drag + context menu and an optional corner watermark. Deterrence only - the
 * copyright notice on the post carries the real terms.
 */
export default function ProtectedImage({
  src,
  alt,
  width,
  height,
  fill = false,
  sizes,
  priority = false,
  className = "",
  watermark = false,
}: ProtectedImageProps) {
  const shared = {
    src,
    sizes,
    priority,
    placeholder: "blur" as const,
    blurDataURL: shimmerBlurDataURL,
    draggable: false,
    onDragStart: (e: React.DragEvent) => e.preventDefault(),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  };

  return (
    <>
      {fill ? (
        <Image {...shared} alt={alt} fill className={`select-none object-contain ${className}`} />
      ) : (
        <Image
          {...shared}
          alt={alt}
          width={width}
          height={height}
          className={`h-auto w-full select-none ${className}`}
        />
      )}
      {watermark && (
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-2 right-2.5 text-[10px] font-medium tracking-wide text-white/50 mix-blend-difference sm:text-xs"
        >
          © Djoufson Che
        </span>
      )}
    </>
  );
}
