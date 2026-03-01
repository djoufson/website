"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/routing";
import { Globe } from "lucide-react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("LanguageSwitcher");

  const nextLocale = locale === "en" ? "fr" : "en";

  function switchLocale() {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 px-2 py-1.5 text-sm rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
      title={t(nextLocale)}
      aria-label={`Switch to ${t(nextLocale)}`}
    >
      <Globe className="w-4 h-4" />
      <span className="uppercase text-xs font-medium">{nextLocale}</span>
    </button>
  );
}
