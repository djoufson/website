import HomeContent from "./widgets/HomeContent";
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    title: t("home.title"),
    description: t("home.description"),
    alternates: {
      canonical: "/",
      languages: { en: "/", fr: "/fr" },
    },
    openGraph: {
      title: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
      description: t("home.description"),
      url: locale === "fr" ? "https://djoufson.com/fr" : "https://djoufson.com",
      type: "website",
    },
    twitter: {
      title: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
      description: t("home.description"),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <HomeContent />;
}
