import React from 'react';
import { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("about.title"),
    description: t("about.description"),
    alternates: { canonical: "/about", languages: { en: "/about", fr: "/fr/about" } },
    openGraph: { title: t("about.title"), description: t("about.description"), url: locale === "fr" ? "https://djoufson.com/fr/about" : "https://djoufson.com/about", type: "profile" },
    twitter: { title: t("about.title"), description: t("about.description") },
  };
}

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <div className="container py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h1 className="text-3xl font-semibold mb-6">{t('heading')}</h1>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <p>{t('paragraph1')}</p>
            <p>{t('paragraph2')}</p>
            <p>{t('paragraph3')}</p>
          </div>
        </div>
        <div className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">{t('coreTechnologies')}</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">.NET & C#</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">TypeScript</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">React & Next.js</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                <span className="text-sm">Software Architecture</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Cloud Technologies</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Flutter & Dart</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">{t('focusAreas')}</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li className="text-sm text-muted-foreground">{t('focusWebDev')}</li>
              <li className="text-sm text-muted-foreground">{t('focusMobile')}</li>
              <li className="text-sm text-muted-foreground">{t('focusFrontend')}</li>
              <li className="text-sm text-muted-foreground">{t('focusApi')}</li>
              <li className="text-sm text-muted-foreground">{t('focusCloud')}</li>
              <li className="text-sm text-muted-foreground">{t('focusWriting')}</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4">{t('letsConnect')}</h3>
            <div className="space-y-2">
              <a
                href="mailto:djouflegran@gmail.com"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                djouflegran@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/djoufson"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/djoufson"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
