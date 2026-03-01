"use client"

import { useState, FormEvent } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const t = useTranslations("ContactForm");

  const formspreeId = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? 'xnjbyzbg';

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-12 space-y-4">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
        <h3 className="text-xl font-medium">{t('successTitle')}</h3>
        <p className="text-muted-foreground">
          {t('successMessage')}
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
        >
          {t('sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            placeholder={t('namePlaceholder')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
            placeholder={t('emailPlaceholder')}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-2">
          {t('subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          required
          className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
          placeholder={t('subjectPlaceholder')}
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          className="w-full px-4 py-2.5 rounded-lg border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
          placeholder={t('messagePlaceholder')}
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-500">
          <AlertCircle className="w-4 h-4" />
          <span>{t('errorMessage')}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-foreground text-background hover:bg-foreground/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" />
        {status === "submitting" ? t('sending') : t('send')}
      </button>
    </form>
  );
}
