"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  Clock,
  RefreshCw,
  ShieldCheck,
  FileText,
  MessagesSquare,
  BadgeCheck,
  Wallet,
  Palette,
  PackageCheck,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

const TYPE_KEYS = ["portrait", "halfBody", "fullBody", "custom"] as const;

const PROCESS_STEPS = [
  { key: "submit", Icon: FileText },
  { key: "discuss", Icon: MessagesSquare },
  { key: "approve", Icon: BadgeCheck },
  { key: "deposit", Icon: Wallet },
  { key: "creation", Icon: Palette },
  { key: "delivery", Icon: PackageCheck },
] as const;

const DETAIL_KEYS = [
  { key: "delivery", Icon: Clock },
  { key: "revisions", Icon: RefreshCw },
  { key: "payment", Icon: ShieldCheck },
] as const;

const FAQ_KEYS = ["time", "revisions", "beforePayment", "commercial", "methods"] as const;

export default function CommissionsContent() {
  const t = useTranslations("Commissions");

  return (
    <div className="w-full px-6 py-20 lg:px-12">
      <div className="mx-auto max-w-5xl">
        {/* Hero */}
        <section className="mb-24 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t("hero.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/art/request">
                {t("hero.cta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/art">{t("hero.secondary")}</Link>
            </Button>
          </div>
        </section>

        {/* Commission types */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("types.heading")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {t("types.subheading")}
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TYPE_KEYS.map((key) => (
              <div
                key={key}
                className="flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-foreground/30"
              >
                <h3 className="text-lg font-medium">{t(`types.items.${key}.name`)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {key === "custom" ? "" : t("types.startingFrom")}{" "}
                  <span className="text-base font-semibold text-foreground">
                    {t(`types.items.${key}.price`)}
                  </span>
                </p>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`types.items.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Process timeline */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("process.heading")}</h2>

          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROCESS_STEPS.map(({ key, Icon }, i) => (
              <li key={key} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 font-medium">{t(`process.steps.${key}.title`)}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`process.steps.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* What to expect */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("details.heading")}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {DETAIL_KEYS.map(({ key, Icon }) => (
              <div key={key} className="rounded-xl border border-border bg-card p-6">
                <Icon className="h-5 w-5 text-[var(--custom-blue)]" />
                <h3 className="mt-4 font-medium">{t(`details.${key}.title`)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {t(`details.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Payment policy */}
        <section className="mb-24 rounded-2xl border border-border bg-muted/40 p-8 sm:p-10">
          <h2 className="text-2xl font-semibold tracking-tight">{t("payment.heading")}</h2>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>{t("payment.deposit")}</p>
            <p>{t("payment.methods")}</p>
            <p className="font-medium text-foreground">{t("payment.note")}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-24">
          <h2 className="text-2xl font-semibold tracking-tight">{t("faq.heading")}</h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {FAQ_KEYS.map((key) => (
              <details key={key} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium outline-none focus-visible:text-[var(--custom-blue)]">
                  {t(`faq.items.${key}.question`)}
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`faq.items.${key}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl bg-foreground px-8 py-14 text-center text-background sm:px-12">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {t("finalCta.heading")}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-background/70">
            {t("finalCta.body")}
          </p>
          <Button asChild size="lg" variant="secondary" className="mt-8">
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
