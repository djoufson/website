"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Check, ChevronLeft, ChevronRight, Share2, X } from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import { Artwork } from "@/types/Artwork";
import ProtectedImage from "@/components/art/ProtectedImage";

interface ArtworkViewerProps {
  artwork: Artwork;
  categoryLabel: string;
  prevSlug?: string;
  nextSlug?: string;
}

/**
 * Fullscreen, theme-aware post viewer: the artwork fills the stage on the left,
 * with details on the right. Navigable entirely by keyboard —
 * ← / → step through the images then across posts, Esc returns to the gallery.
 */
export default function ArtworkViewer({
  artwork,
  categoryLabel,
  prevSlug,
  nextSlug,
}: ArtworkViewerProps) {
  const t = useTranslations("Art");
  const locale = useLocale();
  const router = useRouter();
  const closeRef = useRef<HTMLAnchorElement>(null);

  const images = artwork.images;
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const active = images[index];
  const hasPrev = index > 0 || Boolean(prevSlug);
  const hasNext = index < images.length - 1 || Boolean(nextSlug);

  const goPrev = useCallback(() => {
    if (index > 0) setIndex((i) => i - 1);
    else if (prevSlug) router.push(`/art/${prevSlug}`);
  }, [index, prevSlug, router]);

  const goNext = useCallback(() => {
    if (index < images.length - 1) setIndex((i) => i + 1);
    else if (nextSlug) router.push(`/art/${nextSlug}`);
  }, [index, images.length, nextSlug, router]);

  // Keyboard navigation + scroll lock while the viewer is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push("/art");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [goNext, goPrev, router]);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: artwork.title, text: artwork.description, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      /* user dismissed the share sheet — ignore */
    }
  };

  const formattedDate = new Date(artwork.date).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
  });

  return (
    <section
      aria-label={artwork.title}
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-background text-foreground lg:flex-row lg:overflow-hidden"
    >
      {/* Image stage */}
      <div className="relative flex h-[56vh] shrink-0 items-center justify-center bg-muted/30 lg:h-full lg:flex-1">
        <Link
          ref={closeRef}
          href="/art"
          aria-label={t("viewer.close")}
          className="absolute left-3 top-3 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-[var(--custom-blue)]"
        >
          <X className="h-5 w-5" />
        </Link>

        {hasPrev && (
          <button
            onClick={goPrev}
            aria-label={t("viewer.previous")}
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-[var(--custom-blue)]"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {hasNext && (
          <button
            onClick={goNext}
            aria-label={t("viewer.next")}
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/70 text-foreground backdrop-blur-sm transition-colors hover:bg-background focus-visible:ring-2 focus-visible:ring-[var(--custom-blue)]"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        <div className="flex h-full w-full items-center justify-center p-4 lg:p-10">
          <div className="relative h-full w-full">
            <ProtectedImage
              key={active.src}
              src={active.src}
              alt={active.alt ?? `${artwork.title}${active.caption ? ` — ${active.caption}` : ""}`}
              fill
              priority
              watermark
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </div>
        </div>

        {/* Version thumbnails */}
        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-3 flex flex-wrap items-center justify-center gap-2 px-4">
            {images.map((img, i) => (
              <button
                key={img.src}
                onClick={() => setIndex(i)}
                aria-label={img.caption ?? `${t("viewer.image")} ${i + 1}`}
                aria-current={i === index}
                className={`relative h-12 w-12 overflow-hidden rounded-md border-2 bg-background/60 backdrop-blur-sm transition ${
                  i === index
                    ? "border-[var(--custom-blue)]"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <ProtectedImage src={img.src} alt="" fill sizes="48px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info panel */}
      <aside className="w-full border-t border-border p-6 lg:h-full lg:w-[380px] lg:shrink-0 lg:overflow-y-auto lg:border-l lg:border-t-0 xl:w-[440px]">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-semibold tracking-tight">{artwork.title}</h1>
          <button
            onClick={onShare}
            aria-label={t("viewer.share")}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-[var(--custom-blue)]"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
            {copied ? t("viewer.copied") : t("viewer.share")}
          </button>
        </div>

        <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-foreground">
          <time dateTime={artwork.date}>{formattedDate}</time>
          <span aria-hidden>·</span>
          <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-foreground">
            {categoryLabel}
          </span>
          {images.length > 1 && (
            <>
              <span aria-hidden>·</span>
              <span>{t("viewer.imageCount", { current: index + 1, total: images.length })}</span>
            </>
          )}
        </div>

        <p className="mb-6 leading-relaxed text-muted-foreground">{artwork.description}</p>

        <dl className="space-y-4">
          {artwork.medium && <Field label={t("detail.medium")} value={artwork.medium} />}
          {artwork.toolsUsed.length > 0 && (
            <div>
              <dt className="mb-1.5 text-[11px] uppercase tracking-wide text-muted-foreground">
                {t("detail.tools")}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {artwork.toolsUsed.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-border px-2.5 py-0.5 text-xs"
                  >
                    {tool}
                  </span>
                ))}
              </dd>
            </div>
          )}
          {artwork.inspiration && (
            <Field label={t("detail.inspiration")} value={artwork.inspiration} />
          )}
          {artwork.process && <Field label={t("detail.process")} value={artwork.process} />}
        </dl>

        {artwork.commissionable && (
          <div className="mt-6 rounded-lg border border-border bg-muted/40 p-4">
            <p className="text-sm">{t("detail.commissionPrompt")}</p>
            <Link
              href="/contact"
              className="mt-2 inline-flex text-sm font-medium text-[var(--custom-blue)] hover:underline"
            >
              {t("detail.commissionCta")} →
            </Link>
          </div>
        )}

        <p className="mt-8 border-t border-border pt-5 text-xs leading-relaxed text-muted-foreground">
          {t("detail.copyright")}
        </p>

        <Link
          href="/art"
          className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("viewer.backToGallery")}
        </Link>
      </aside>

      {/* Screen-reader announcement of the current image */}
      <div className="sr-only" aria-live="polite">
        {t("viewer.announce", {
          title: artwork.title,
          current: index + 1,
          total: images.length,
        })}
      </div>
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</dt>
      <dd className="text-sm leading-relaxed text-muted-foreground">{value}</dd>
    </div>
  );
}
