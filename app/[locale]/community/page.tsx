import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import CommunityContent from "./CommunityContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("community.title"),
    description: t("community.description"),
    alternates: { canonical: "/community", languages: { en: "/community", fr: "/fr/community" } },
    keywords: [
      "Community Engagement",
      "Developer Advocacy",
      ".NET Cameroon",
      "Tech Meetups",
      "Speaking Engagements",
      "Technical Workshops",
      "Azure Developer Conference",
      "Software Engineering Community",
      "Douala Tech Community",
      "Cameroon Developers",
      "Community Building",
      "Mentorship",
      "Public Speaking",
      "Tech Events"
    ],
    openGraph: {
      title: t("community.title"),
      description: t("community.description"),
      url: locale === "fr" ? "https://djoufson.com/fr/community" : "https://djoufson.com/community",
      type: "website",
      images: [
        {
          url: "/assets/dotnetcameroon_logo.png",
          width: 1200,
          height: 630,
          alt: ".NET Cameroon Community",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("community.title"),
      description: t("community.description"),
      images: ["/assets/dotnetcameroon_logo.png"],
    },
  };
}

export default async function CommunityPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <CommunityContent />;
}
