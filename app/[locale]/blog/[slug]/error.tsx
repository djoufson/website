"use client";

import { useEffect } from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BlogPostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("Error");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container py-16">
      <div className="max-w-md mx-auto text-center space-y-6">
        <h2 className="text-2xl font-semibold">{t("blogLoadFailed")}</h2>
        <p className="text-muted-foreground leading-relaxed">
          {t("blogLoadFailedMessage")}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium"
          >
            {t("tryAgain")}
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border hover:bg-muted transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToBlog")}
          </Link>
        </div>
      </div>
    </div>
  );
}
