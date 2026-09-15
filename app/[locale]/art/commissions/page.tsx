import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CommissionsContent from "./CommissionsContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const url =
    locale === "fr"
      ? "https://djoufson.com/fr/art/commissions"
      : "https://djoufson.com/art/commissions";

  return {
    title: t("commissions.title"),
    description: t("commissions.description"),
    alternates: {
      canonical: "/art/commissions",
      languages: { en: "/art/commissions", fr: "/fr/art/commissions" },
    },
    openGraph: {
      title: t("commissions.title"),
      description: t("commissions.description"),
      url,
      type: "website",
      images: [
        {
          url: "/assets/art/wizzy.webp",
          width: 2200,
          height: 2200,
          alt: t("commissions.title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("commissions.title"),
      description: t("commissions.description"),
      images: ["/assets/art/wizzy.webp"],
    },
  };
}

export default async function CommissionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CommissionsContent />;
}
