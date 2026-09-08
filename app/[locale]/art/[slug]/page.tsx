import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { CATEGORY_LABEL_KEY, getAllArtworks, getArtworkBySlug } from "@/lib/art";
import ArtworkDetailContent from "./ArtworkDetailContent";

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
  const imageUrl = `https://djoufson.com${artwork.imageUrl}`;
  const url =
    locale === "fr" ? `https://djoufson.com/fr/art/${slug}` : `https://djoufson.com/art/${slug}`;
  const title = `${artwork.title} — ${t("detail.metaSuffix")}`;

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
      images: [
        {
          url: imageUrl,
          width: artwork.width,
          height: artwork.height,
          alt: artwork.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: artwork.description,
      images: [imageUrl],
    },
  };
}

export default async function ArtworkDetailPage({
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

  // VisualArtwork structured data for rich results.
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "VisualArtwork",
    name: artwork.title,
    creator: {
      "@type": "Person",
      name: "Djoufson Che Bene",
      url: "https://djoufson.com",
    },
    image: `https://djoufson.com${artwork.imageUrl}`,
    dateCreated: String(artwork.year),
    description: artwork.description,
    artMedium: artwork.medium,
    artform: categoryLabel,
    copyrightHolder: {
      "@type": "Person",
      name: "Djoufson Che Bene",
    },
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
      <ArtworkDetailContent artwork={artwork} categoryLabel={categoryLabel} />
    </>
  );
}
