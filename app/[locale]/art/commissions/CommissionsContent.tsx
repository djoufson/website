"use client";

import { useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProtectedImage from "@/components/art/ProtectedImage";
import CommissionRequestForm from "@/components/art/CommissionRequestForm";
import LottieAnimation from "@/components/LottieAnimation";
import {
  CURRENCIES,
  CURRENCY_LABEL,
  STYLE_PRICES,
  formatPrice,
  detectCurrency,
  type Currency,
} from "@/lib/pricing";

/** No-op store: currency never changes after the first client read. */
const subscribe = () => () => {};
const getServerCurrency = (): Currency => "USD";

/**
 * Three primary styles, each represented by a single hand-picked piece from
 * the gallery so visitors can see the direction at a glance.
 */
const STYLE_GROUPS = [
  { key: "vector", src: "/assets/art/irvin.webp", alt: "Kambeul", value: "Vector Portrait" },
  { key: "painted", src: "/assets/art/yvan.webp", alt: "Berka", value: "Digital Painting" },
  { key: "character", src: "/assets/art/hatik-red.webp", alt: "Hatik", value: "Character & Fan Art" },
] as const;

const PROCESS_STEPS = ["submit", "discuss", "approve", "deposit", "creation", "delivery"] as const;

export default function CommissionsContent() {
  const t = useTranslations("Commissions");
  const tReq = useTranslations("CommissionRequest");
  const [open, setOpen] = useState(false);
  const [style, setStyle] = useState("");

  // Auto-detect the currency after hydration; the toggle override always wins.
  const detected = useSyncExternalStore(subscribe, detectCurrency, getServerCurrency);
  const [override, setOverride] = useState<Currency | null>(null);
  const currency = override ?? detected;

  function requestStyle(styleValue = "") {
    setStyle(styleValue);
    setOpen(true);
  }

  return (
    <div className="w-full px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <section className="mb-24 grid items-center gap-12 md:grid-cols-2">
          <div>
            <h1 className="mb-4 text-3xl font-semibold">{t("hero.title")}</h1>
            <p className="leading-relaxed text-muted-foreground">{t("hero.subtitle")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button onClick={() => requestStyle()}>
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button asChild variant="ghost">
                <Link href="/art">{t("hero.secondary")}</Link>
              </Button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-sm md:ml-auto">
            <LottieAnimation animationPath="/animations/pen-draw.json" />
          </div>
        </section>

        {/* Styles & pricing */}
        <section className="mb-24">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{t("types.heading")}</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                {t("types.subheading")}
              </p>
            </div>
            <div
              role="group"
              aria-label={t("types.currencyLabel")}
              className="inline-flex shrink-0 rounded-md border border-border p-0.5"
            >
              {CURRENCIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setOverride(c)}
                  aria-pressed={currency === c}
                  className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                    currency === c
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {CURRENCY_LABEL[c]}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-3">
            {STYLE_GROUPS.map((group) => (
              <div key={group.key}>
                <div className="relative aspect-square w-full">
                  <ProtectedImage
                    src={group.src}
                    alt={group.alt}
                    fill
                    sizes="(max-width: 640px) 90vw, 30vw"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
                  <h3 className="font-medium">{t(`types.items.${group.key}.name`)}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("types.startingFrom")}{" "}
                    <span className="font-semibold text-foreground">
                      {formatPrice(STYLE_PRICES[group.key][currency], currency)}
                    </span>
                  </p>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {t(`types.items.${group.key}.description`)}
                </p>
                <button
                  onClick={() => requestStyle(group.value)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--custom-blue)] transition-colors hover:opacity-80"
                >
                  {t("types.requestCta")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-muted-foreground">{t("types.note")}</p>
        </section>

        {/* Process - vertical timeline */}
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
          <Button size="lg" className="mt-8" onClick={() => requestStyle()}>
            {t("finalCta.button")}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </section>
      </div>

      {/* Request form modal - keeps the whole interaction on one focused page. */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{tReq("heading")}</DialogTitle>
            <DialogDescription>{tReq("description")}</DialogDescription>
          </DialogHeader>
          <CommissionRequestForm defaultStyle={style} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
