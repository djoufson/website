"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowLeft, Calendar, Layers, Palette, Wrench } from "lucide-react";
import { Link } from "@/i18n/routing";
import { Artwork } from "@/types/Artwork";
import ProtectedImage from "@/components/art/ProtectedImage";

interface ArtworkDetailContentProps {
  artwork: Artwork;
  categoryLabel: string;
}

export default function ArtworkDetailContent({
  artwork,
  categoryLabel,
}: ArtworkDetailContentProps) {
  const t = useTranslations("Art");
  const reduceMotion = useReducedMotion();

  const rise = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay },
        };

  const facts: { icon: typeof Calendar; label: string; value: string }[] = [
    { icon: Calendar, label: t("detail.year"), value: String(artwork.year) },
    { icon: Layers, label: t("detail.category"), value: categoryLabel },
  ];
  if (artwork.medium)
    facts.push({ icon: Palette, label: t("detail.medium"), value: artwork.medium });

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/art"
          className="mb-10 inline-flex items-center gap-2 text-sm text-[var(--art-muted)] transition-colors hover:text-[var(--art-fg)]"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("detail.backToGallery")}
        </Link>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          {/* Artwork */}
          <motion.div {...rise()} className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-xl bg-white/5 shadow-2xl shadow-black/40">
              <ProtectedImage
                src={artwork.imageUrl}
                alt={artwork.title}
                width={artwork.width}
                height={artwork.height}
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </div>
          </motion.div>

          {/* Details */}
          <div>
            <motion.h1
              {...rise(0.05)}
              className="text-3xl font-semibold tracking-tight text-[var(--art-fg)] sm:text-4xl"
            >
              {artwork.title}
            </motion.h1>

            <motion.div {...rise(0.1)} className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
              {facts.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.label} className="flex items-start gap-2.5">
                    <Icon className="mt-0.5 h-4 w-4 text-[var(--art-accent)]" />
                    <div>
                      <div className="text-[11px] uppercase tracking-wide text-[var(--art-muted)]">
                        {f.label}
                      </div>
                      <div className="text-sm text-[var(--art-fg)]">{f.value}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {artwork.toolsUsed.length > 0 && (
              <motion.div {...rise(0.15)} className="mt-8">
                <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-wide text-[var(--art-muted)]">
                  <Wrench className="h-3.5 w-3.5" />
                  {t("detail.tools")}
                </div>
                <div className="flex flex-wrap gap-2">
                  {artwork.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs text-[var(--art-fg)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.p
              {...rise(0.2)}
              className="mt-8 text-base leading-relaxed text-[var(--art-muted)]"
            >
              {artwork.description}
            </motion.p>

            {artwork.inspiration && (
              <motion.div {...rise(0.25)} className="mt-8">
                <h2 className="mb-2 text-sm font-medium text-[var(--art-fg)]">
                  {t("detail.inspiration")}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--art-muted)]">
                  {artwork.inspiration}
                </p>
              </motion.div>
            )}

            {artwork.process && (
              <motion.div {...rise(0.3)} className="mt-6">
                <h2 className="mb-2 text-sm font-medium text-[var(--art-fg)]">
                  {t("detail.process")}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--art-muted)]">{artwork.process}</p>
              </motion.div>
            )}

            {artwork.commissionable && (
              <motion.div
                {...rise(0.35)}
                className="mt-10 rounded-lg border border-[var(--art-accent)]/40 bg-[var(--art-accent)]/5 p-5"
              >
                <p className="text-sm text-[var(--art-fg)]">{t("detail.commissionPrompt")}</p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex text-sm font-medium text-[var(--art-accent)] hover:underline"
                >
                  {t("detail.commissionCta")} →
                </Link>
              </motion.div>
            )}

            <p className="mt-10 border-t border-white/10 pt-6 text-xs leading-relaxed text-[var(--art-muted)]">
              {t("detail.copyright")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
