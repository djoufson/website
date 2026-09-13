"use client";

import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import ProtectedImage from "@/components/art/ProtectedImage";

/**
 * Three primary styles, each illustrated with reference pieces pulled from the
 * gallery so visitors can see what a commission in that direction looks like.
 */
const STYLE_GROUPS = [
  {
    key: "vector",
    images: [
      { src: "/assets/art/kambeul.webp", alt: "Kambeul" },
      { src: "/assets/art/wizzy.webp", alt: "Wizzy" },
      { src: "/assets/art/djouf.webp", alt: "Djouf" },
    ],
  },
  {
    key: "painted",
    images: [
      { src: "/assets/art/berka.webp", alt: "Berka" },
      { src: "/assets/art/warren.webp", alt: "Warren in Red" },
      { src: "/assets/art/panther.webp", alt: "Panther" },
    ],
  },
  {
    key: "character",
    images: [
      { src: "/assets/art/hatik-red.webp", alt: "Hatik" },
      { src: "/assets/art/irvin.webp", alt: "Kyrie" },
      { src: "/assets/art/tiger.webp", alt: "Tiger" },
    ],
  },
] as const;

const PROCESS_STEPS = ["submit", "discuss", "approve", "deposit", "creation", "delivery"] as const;

export default function CommissionsContent() {
  const t = useTranslations("Commissions");

  return (
    <div className="w-full px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <section className="mb-24 grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-semibold">{t("hero.title")}</h1>
            <p className="leading-relaxed text-muted-foreground">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/art/request">
                  {t("hero.cta")}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/art">{t("hero.secondary")}</Link>
              </Button>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl md:ml-auto">
            <ProtectedImage
              src="/assets/art/wizzy.webp"
              alt={t("hero.title")}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 400px"
              className="!object-cover"
            />
          </div>
        </section>

        {/* Styles & pricing */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("types.heading")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{t("types.subheading")}</p>

          <div className="mt-12 space-y-16">
            {STYLE_GROUPS.map((group) => (
              <div key={group.key}>
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {group.images.map((img) => (
                    <div
                      key={img.src}
                      className="relative aspect-square overflow-hidden rounded-lg"
                    >
                      <ProtectedImage
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 30vw, 220px"
                        className="!object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium">{t(`types.items.${group.key}.name`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("types.startingFrom")}{" "}
                    <span className="font-semibold text-foreground">
                      {t(`types.items.${group.key}.price`)}
                    </span>
                  </p>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  {t(`types.items.${group.key}.description`)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">{t("types.note")}</p>
        </section>

        {/* Process — vertical timeline */}
        <section className="mb-24">
          <h2 className="mb-10 text-2xl font-semibold tracking-tight">{t("process.heading")}</h2>

          <ol>
            {PROCESS_STEPS.map((key, i) => (
              <li key={key} className="relative flex gap-5 pb-8 last:pb-0">
                {i < PROCESS_STEPS.length - 1 && (
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-[19px] top-11 w-px bg-border"
                  />
                )}
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-[var(--custom-blue)]">
                  {i + 1}
                </span>
                <div className="pt-2">
                  <h3 className="font-medium leading-none">{t(`process.steps.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`process.steps.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Payment policy */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("payment.heading")}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{t("payment.deposit")}</p>
            <p>{t("payment.methods")}</p>
            <p className="font-medium text-foreground">{t("payment.note")}</p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="border-t border-border pt-16 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">{t("finalCta.heading")}</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("finalCta.body")}
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/art/request">
              {t("finalCta.button")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
}
