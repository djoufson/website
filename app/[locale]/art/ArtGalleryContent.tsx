"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Artwork, ArtworkCategory } from "@/types/Artwork";
import { CATEGORY_LABEL_KEY } from "@/lib/art";
import ArtworkGrid from "@/components/art/ArtworkGrid";

interface ArtGalleryContentProps {
  artworks: Artwork[];
  categories: ArtworkCategory[];
}

export default function ArtGalleryContent({ artworks, categories }: ArtGalleryContentProps) {
  const t = useTranslations("Art");
  const [selected, setSelected] = useState<ArtworkCategory | "all">("all");

  const filtered = selected === "all" ? artworks : artworks.filter((a) => a.category === selected);

  return (
    <div className="w-full px-6 py-20 lg:px-12">
      <header className="mb-14 max-w-2xl">
        <h1 className="mb-3 text-3xl font-semibold">{t("hero.title")}</h1>
        <p className="leading-relaxed text-muted-foreground">{t("hero.description")}</p>
      </header>

      <div className="mb-12 flex flex-wrap gap-2">
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
        <p className="py-12 text-center text-muted-foreground">{t("empty")}</p>
      ) : (
        <ArtworkGrid artworks={filtered} />
      )}
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
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-md px-3 py-1.5 text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--custom-blue)] ${
        active
          ? "bg-foreground text-background"
          : "bg-muted text-muted-foreground hover:bg-muted/70"
      }`}
    >
      {label}
    </button>
  );
}
