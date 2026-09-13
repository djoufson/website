"use client";

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle, Upload } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { generateTrackingId } from "@/lib/commission";

/**
 * Canonical (English) option values submitted to Formspree, kept separate from
 * the localized labels shown to the visitor - so the artist's inbox reads the
 * same regardless of the visitor's language.
 */
const TYPE_OPTIONS = [
  { key: "portrait", value: "Portrait" },
  { key: "halfBody", value: "Half Body" },
  { key: "fullBody", value: "Full Body" },
  { key: "custom", value: "Custom Project" },
] as const;

const BUDGET_OPTIONS = [
  { key: "under50", value: "Under $50" },
  { key: "50to100", value: "$50 - $100" },
  { key: "100to250", value: "$100 - $250" },
  { key: "over250", value: "$250+" },
] as const;

const USE_OPTIONS = [
  { key: "personal", value: "Personal" },
  { key: "social", value: "Social Media" },
  { key: "commercial", value: "Commercial" },
  { key: "other", value: "Other" },
] as const;

const inputClass =
  "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors";

export default function CommissionRequestForm() {
  const t = useTranslations("CommissionRequest");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [fileCount, setFileCount] = useState(0);
  // Generated at submit time (not during render) so the server and client agree
  // during hydration and each submission gets a fresh reference.
  const [trackingId, setTrackingId] = useState("");

  const formspreeId =
    process.env.NEXT_PUBLIC_FORMSPREE_COMMISSION_ID ??
    process.env.NEXT_PUBLIC_FORMSPREE_ID ??
    "xnjbyzbg";

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    const id = generateTrackingId();
    setTrackingId(id);
    data.set("Tracking ID", id);

    // Build a searchable email subject: [ART-2026-XXXX] Commission Request: Type - Name
    const type = String(data.get("Commission Type") ?? "");
    const name = String(data.get("Full Name") ?? "");
    data.set("_subject", `[${id}] Commission Request: ${type} - ${name}`);

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
      <div className="space-y-4 py-12 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
        <h3 className="text-xl font-medium">{t("successTitle")}</h3>
        <p className="mx-auto max-w-md text-muted-foreground">{t("successMessage")}</p>
        {trackingId && (
          <p className="text-sm text-muted-foreground">
            {t("successReference", { id: trackingId })}
          </p>
        )}
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setTrackingId(generateTrackingId());
              setStatus("idle");
            }}
            className="text-sm text-muted-foreground underline transition-colors hover:text-foreground"
          >
            {t("sendAnother")}
          </button>
          <Link
            href="/art/commissions"
            className="text-sm text-muted-foreground underline transition-colors hover:text-foreground"
          >
            {t("backToCommissions")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Honeypot - hidden from humans; Formspree drops any submission that fills it. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="!absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      {/* Commission type */}
      <Field htmlFor="commission-type" label={t("fields.type.label")} required requiredText={t("required")}>
        <select
          id="commission-type"
          name="Commission Type"
          required
          defaultValue=""
          className={inputClass}
        >
          <option value="" disabled>
            {t("fields.type.placeholder")}
          </option>
          {TYPE_OPTIONS.map((o) => (
            <option key={o.key} value={o.value}>
              {t(`fields.type.options.${o.key}`)}
            </option>
          ))}
        </select>
      </Field>

      <div className="grid gap-6 md:grid-cols-2">
        <Field htmlFor="full-name" label={t("fields.name.label")} required requiredText={t("required")}>
          <input
            type="text"
            id="full-name"
            name="Full Name"
            required
            className={inputClass}
            placeholder={t("fields.name.placeholder")}
          />
        </Field>
        <Field htmlFor="email" label={t("fields.email.label")} required requiredText={t("required")}>
          <input
            type="email"
            id="email"
            name="Email"
            required
            className={inputClass}
            placeholder={t("fields.email.placeholder")}
          />
        </Field>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Field htmlFor="country" label={t("fields.country.label")} optionalText={t("optional")}>
          <input
            type="text"
            id="country"
            name="Country"
            className={inputClass}
            placeholder={t("fields.country.placeholder")}
          />
        </Field>
        <Field htmlFor="budget" label={t("fields.budget.label")} required requiredText={t("required")}>
          <select id="budget" name="Budget Range" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              {t("fields.budget.placeholder")}
            </option>
            {BUDGET_OPTIONS.map((o) => (
              <option key={o.key} value={o.value}>
                {t(`fields.budget.options.${o.key}`)}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field htmlFor="intended-use" label={t("fields.use.label")} required requiredText={t("required")}>
        <select id="intended-use" name="Intended Use" required defaultValue="" className={inputClass}>
          <option value="" disabled>
            {t("fields.use.placeholder")}
          </option>
          {USE_OPTIONS.map((o) => (
            <option key={o.key} value={o.value}>
              {t(`fields.use.options.${o.key}`)}
            </option>
          ))}
        </select>
      </Field>

      <Field htmlFor="description" label={t("fields.description.label")} required requiredText={t("required")}>
        <textarea
          id="description"
          name="Description"
          required
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder={t("fields.description.placeholder")}
        />
      </Field>

      <Field htmlFor="deadline" label={t("fields.deadline.label")} optionalText={t("optional")}>
        <input type="date" id="deadline" name="Deadline" className={inputClass} />
      </Field>

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
              : t("fields.references.cta")}
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
        <p className="mt-2 text-xs text-muted-foreground">{t("fields.references.hint")}</p>
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

function Field({
  htmlFor,
  label,
  required,
  requiredText,
  optionalText,
  children,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
  requiredText?: string;
  optionalText?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <label htmlFor={htmlFor} className="block text-sm font-medium">
          {label}
        </label>
        {required ? (
          <span className="text-xs text-muted-foreground">{requiredText}</span>
        ) : optionalText ? (
          <span className="text-xs text-muted-foreground">{optionalText}</span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
