import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CATEGORY_LABEL_KEY, getAdjacentSlugs, getAllArtworks, getArtworkBySlug } from "@/lib/art";
import ArtworkViewer from "./ArtworkViewer";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAllArtworks().map((a) => ({ locale, slug: a.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) {
    return { title: "Artwork Not Found" };
  }

  const t = await getTranslations({ locale, namespace: "Art" });
  const cover = artwork.images[0];
  const imageUrl = `https://djoufson.com${cover.src}`;
  const url =
    locale === "fr" ? `https://djoufson.com/fr/art/${slug}` : `https://djoufson.com/art/${slug}`;
  const title = `${artwork.title} - ${t("detail.metaSuffix")}`;

  return {
    title,
    description: artwork.description,
    alternates: {
      canonical: `/art/${slug}`,
      languages: { en: `/art/${slug}`, fr: `/fr/art/${slug}` },
    },
    openGraph: {
      title,
      description: artwork.description,
      url,
      type: "article",
      images: [{ url: imageUrl, width: cover.width, height: cover.height, alt: artwork.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: artwork.description,
      images: [imageUrl],
    },
  };
}

export default async function ArtworkPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const artwork = getArtworkBySlug(slug);
  if (!artwork) {
    notFound();
  }

  const t = await getTranslations({ locale, namespace: "Art" });
  const categoryLabel = t(`categories.${CATEGORY_LABEL_KEY[artwork.category]}`);
  const { prev, next } = getAdjacentSlugs(slug);

  // VisualArtwork structured data for rich results (all images included).
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    creator: {
      "@type": "Person",
      name: "Djoufson Che Bene",
      url: "https://djoufson.com",
    },
    image: artwork.images.map((img) => `https://djoufson.com${img.src}`),
    dateCreated: artwork.date,
    description: artwork.description,
    artMedium: artwork.medium,
    artform: categoryLabel,
    copyrightHolder: { "@type": "Person", name: "Djoufson Che Bene" },
    copyrightNotice:
      "All artworks are copyright protected and may not be reproduced, redistributed, or used commercially without permission.",
    url: `https://djoufson.com/art/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ArtworkViewer
        artwork={artwork}
        categoryLabel={categoryLabel}
        prevSlug={prev}
        nextSlug={next}
      />
    </>
  );
}
