import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import CommissionRequestForm from "./CommissionRequestForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const url =
    locale === "fr"
      ? "https://djoufson.com/fr/art/request"
      : "https://djoufson.com/art/request";

  return {
    title: t("commissionRequest.title"),
    description: t("commissionRequest.description"),
    alternates: {
      canonical: "/art/request",
      languages: { en: "/art/request", fr: "/fr/art/request" },
    },
    openGraph: {
      title: t("commissionRequest.title"),
      description: t("commissionRequest.description"),
      url,
      type: "website",
    },
    twitter: {
      title: t("commissionRequest.title"),
      description: t("commissionRequest.description"),
    },
    // A request form has no lasting content to index; keep it out of search.
    robots: { index: false, follow: true },
  };
}

export default async function CommissionRequestPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("CommissionRequest");

  return (
    <div className="w-full px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/art/commissions"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          {t("backToCommissions")}
        </Link>

        <header className="mt-8 mb-10">
          <h1 className="text-3xl font-semibold tracking-tight">{t("heading")}</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">{t("description")}</p>
        </header>

        <CommissionRequestForm />
      </div>
    </div>
  );
}
