import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";

export default async function BlogPostNotFound() {
  const t = await getTranslations("Error");

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">{t("blogNotFound")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("blogNotFoundMessage")}
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          {t("backToBlog")}
        </Link>
      </div>
    </div>
  );
}
