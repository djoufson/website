"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { generateTrackingId } from "@/lib/commission";

/**
 * Canonical (English) style values submitted to Formspree, kept separate from
 * the localized labels shown to the visitor - so the artist's inbox reads the
 * same regardless of the visitor's language. These mirror the styles shown on
 * the commissions page, plus an open-ended option.
 */
const STYLE_OPTIONS = [
  { key: "vector", value: "Vector Portrait" },
  { key: "painted", value: "Digital Painting" },
  { key: "character", value: "Character & Fan Art" },
  { key: "other", value: "Something else" },
] as const;

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors";

/** `defaultStyle` preselects a style, e.g. when opened from a specific style card. */
export default function CommissionRequestForm({ defaultStyle = "" }: { defaultStyle?: string }) {
  const t = useTranslations("CommissionRequest");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fileCount, setFileCount] = useState(0);
  // Generated at submit time (not during render) so the server and client agree
  // during hydration and each submission gets a fresh reference.
  const [trackingId, setTrackingId] = useState("");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_COMMISSION_ID ?? "xkjgwrwn";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const id = generateTrackingId();
    setTrackingId(id);
    data.set("Tracking ID", id);

    // Build a searchable email subject: [ART-2026-XXXX] Commission Request: Style - Name
    const style = String(data.get("Style") ?? "");
    const name = String(data.get("Name") ?? "");
    data.set("_subject", `[${id}] Commission Request: ${style} - ${name}`);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
        setFileCount(0);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="space-y-4 py-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-xl font-medium">{t("successTitle")}</h3>
        <p className="mx-auto max-w-md text-muted-foreground">{t("successMessage")}</p>
        {trackingId && (
          <p className="text-sm text-muted-foreground">
            {t("successReference", { id: trackingId })}
          </p>
        )}
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-muted-foreground underline transition-colors hover:text-foreground"
        >
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot - hidden from humans; Formspree drops any submission that fills it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="!absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="style" className="mb-2 block text-sm font-medium">
          {t("fields.style.label")}
        </label>
        <select id="style" name="Style" required defaultValue={defaultStyle} className={inputClass}>
          <option value="" disabled>
            {t("fields.style.placeholder")}
          </option>
          {STYLE_OPTIONS.map((o) => (
            <option key={o.key} value={o.value}>
              {t(`fields.style.options.${o.key}`)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            {t("fields.name.label")}
          </label>
          <input
            type="text"
            id="name"
            name="Name"
            required
            className={inputClass}
            placeholder={t("fields.name.placeholder")}
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            {t("fields.email.label")}
          </label>
          <input
            type="email"
            id="email"
            name="Email"
            required
            className={inputClass}
            placeholder={t("fields.email.placeholder")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className="mb-2 block text-sm font-medium">
          {t("fields.description.label")}
        </label>
        <textarea
          id="description"
          name="Description"
          required
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder={t("fields.description.placeholder")}
        />
      </div>

      {/* Reference images */}
      <div>
        <div className="mb-2 flex items-center gap-2">
          <label htmlFor="references" className="block text-sm font-medium">
            {t("fields.references.label")}
          </label>
          <span className="text-xs text-muted-foreground">{t("optional")}</span>
        </div>
        <label
          htmlFor="references"
          className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed px-4 py-3 text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          <Upload className="h-4 w-4 shrink-0" />
          <span>
            {fileCount > 0
              ? t("fields.references.selected", { count: fileCount })
              : `${t("fields.references.cta")} · ${t("fields.references.hint")}`}
          </span>
        </label>
        <input
          type="file"
          id="references"
          name="Reference Images"
          multiple
          accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => setFileCount(e.currentTarget.files?.length ?? 0)}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="h-4 w-4" />
          <span>{t("errorMessage")}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 rounded-lg bg-foreground px-6 py-3 font-medium text-background transition-colors hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Send className="h-4 w-4" />
        {status === "submitting" ? t("submitting") : t("submit")}
      </button>
    </form>
  );
}
