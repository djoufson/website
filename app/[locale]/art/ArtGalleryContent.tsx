"use client";

import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowDown } from "lucide-react";
import { Artwork, ArtworkCategory } from "@/types/Artwork";
import { CATEGORY_LABEL_KEY } from "@/lib/art";
import MasonryGallery from "@/components/art/MasonryGallery";

interface ArtGalleryContentProps {
  artworks: Artwork[];
  featured: Artwork[];
  categories: ArtworkCategory[];
}

export default function ArtGalleryContent({
  artworks,
  featured,
  categories,
}: ArtGalleryContentProps) {
  const t = useTranslations("Art");
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<ArtworkCategory | "all">("all");

  const filtered = useMemo(
    () => (selected === "all" ? artworks : artworks.filter((a) => a.category === selected)),
    [artworks, selected]
  );

  const fadeIn = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "0px 0px -60px 0px" },
        transition: { duration: 0.6 },
      };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-center overflow-hidden px-6 py-24">
        {/* Ambient gradient wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(60% 60% at 70% 30%, rgba(8,156,216,0.18), transparent 70%), radial-gradient(50% 50% at 20% 80%, rgba(120,40,160,0.16), transparent 70%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-5xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-[var(--art-accent)]"
          >
            {t("hero.eyebrow")}
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight text-[var(--art-fg)] sm:text-6xl"
          >
            {t("hero.title")}
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-[var(--art-muted)] sm:text-lg"
          >
            {t("hero.description")}
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <a
              href="#gallery"
              className="mt-10 inline-flex items-center gap-2 rounded-full border border-[var(--art-accent)] px-6 py-3 text-sm font-medium text-[var(--art-fg)] transition-colors hover:bg-[var(--art-accent)] hover:text-black"
            >
              {t("hero.cta")}
              <ArrowDown className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Featured Works */}
      {featured.length > 0 && (
        <motion.section {...fadeIn} className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-semibold text-[var(--art-fg)]">
            {t("featured.heading")}
          </h2>
          <MasonryGallery
            artworks={featured}
            eagerCount={3}
            columnsClassName="columns-1 sm:columns-2 lg:columns-3"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.section>
      )}

      {/* Full Gallery */}
      <section id="gallery" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16">
        <h2 className="mb-6 text-2xl font-semibold text-[var(--art-fg)]">{t("gallery.heading")}</h2>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label={t("gallery.heading")}>
          <FilterButton
            active={selected === "all"}
            onClick={() => setSelected("all")}
            label={t("filters.all")}
          />
          {categories.map((cat) => (
            <FilterButton
              key={cat}
              active={selected === cat}
              onClick={() => setSelected(cat)}
              label={t(`categories.${CATEGORY_LABEL_KEY[cat]}`)}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="py-12 text-center text-[var(--art-muted)]">{t("empty")}</p>
        ) : (
          <MasonryGallery artworks={filtered} />
        )}
      </section>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--art-accent)] ${
        active
          ? "bg-[var(--art-fg)] text-black"
          : "border border-white/15 text-[var(--art-muted)] hover:border-white/40 hover:text-[var(--art-fg)]"
      }`}
    >
      {label}
    </button>
  );
}
