import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllArtworks, getUsedCategories } from "@/lib/art";
import ArtGalleryContent from "./ArtGalleryContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const url = locale === "fr" ? "https://djoufson.com/fr/art" : "https://djoufson.com/art";

  return {
    title: t("art.title"),
    description: t("art.description"),
    alternates: {
      canonical: "/art",
      languages: { en: "/art", fr: "/fr/art" },
    },
    openGraph: {
      title: t("art.title"),
      description: t("art.description"),
      url,
      type: "website",
      images: [
        {
          url: "/assets/art/wizzy.webp",
          width: 2200,
          height: 2200,
          alt: t("art.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("art.title"),
      description: t("art.description"),
      images: ["/assets/art/wizzy.webp"],
    },
  };
}

export default async function ArtGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ArtGalleryContent artworks={getAllArtworks()} categories={getUsedCategories()} />;
}
