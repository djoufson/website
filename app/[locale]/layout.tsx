import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Footer from "@/components/footer";
import Header from "@/components/header";
import GoogleAnalytics from "@/components/google/GoogleAnalytics";
import GoogleAdSense from "@/components/google/GoogleAdSense";
import BackToTop from "@/components/BackToTop";
import { ThemeProvider } from "@/components/theme-provider";
import StructuredData from "@/components/StructuredData";
import AdvertisingBanner from "@/components/AdvertisingBanner";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL("https://djoufson.com"),
    title: {
      default: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
      template: "%s",
    },
    description: t("home.description"),
    keywords: [
      "Full Stack Developer",
      "Software Engineer",
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      ".NET",
      "C#",
      "Node.js",
      "Web Development",
      "Frontend Development",
      "Backend Development",
      "Cloud Computing",
      "Technical Blog",
      "Portfolio",
      "Djoufson",
      "Che Bene",
    ],
    authors: [{ name: "Djoufson Che Bene" }],
    creator: "Djoufson Che Bene",
    publisher: "Djoufson Che Bene",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      url: "https://djoufson.com",
      siteName: "Djoufson Che Bene - Full Stack Developer",
      title: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
      description: t("home.description"),
      images: [
        {
          url: "/assets/djouf.png",
          width: 1200,
          height: 630,
          alt: "Djoufson Che Bene - Full Stack Developer",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Djoufson Che Bene - Full Stack Developer & Software Engineer",
      description: t("home.description"),
      site: "@djouf_legran",
      creator: "@djouf_legran",
      images: ["/assets/djouf.png"],
    },
    verification: {
      // google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    category: "technology",
    alternates: {
      canonical: "/",
      languages: {
        en: "/",
        fr: "/fr",
      },
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "fr")) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <GoogleAdSense />
        <StructuredData locale={locale} />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            <AdvertisingBanner />
            <main>{children}</main>
            <Footer />
            <BackToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
