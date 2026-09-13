"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Artwork, ArtworkCategory } from "@/types/Artwork";
import { CATEGORY_LABEL_KEY } from "@/lib/art";
import ArtworkGrid from "@/components/art/ArtworkGrid";
import { Button } from "@/components/ui/button";

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
      <header className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <h1 className="mb-3 text-3xl font-semibold">{t("hero.title")}</h1>
          <p className="leading-relaxed text-muted-foreground">{t("hero.description")}</p>
        </div>
        <Button asChild className="shrink-0">
          <Link href="/art/commissions">
            {t("commission.commissionMe")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
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

      <section className="mt-24 rounded-2xl border border-border bg-muted/40 px-8 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-semibold tracking-tight">{t("commission.bannerTitle")}</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
          {t("commission.bannerBody")}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/art/commissions">
            {t("commission.bannerCta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
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
