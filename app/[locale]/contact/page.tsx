import { Metadata } from "next";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ContactForm from "./ContactForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: { canonical: "/contact", languages: { en: "/contact", fr: "/fr/contact" } },
    openGraph: { title: t("contact.title"), description: t("contact.description"), url: locale === "fr" ? "https://djoufson.com/fr/contact" : "https://djoufson.com/contact", type: "website" },
    twitter: { title: t("contact.title"), description: t("contact.description") },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const socialLinks = [
    {
      name: "Email",
      href: "mailto:djouflegran@gmail.com",
      icon: Mail,
      value: "djouflegran@gmail.com",
    },
    {
      name: "GitHub",
      href: "https://github.com/djoufson",
      icon: Github,
      value: "github.com/djoufson",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/djoufson",
      icon: Linkedin,
      value: "linkedin.com/in/djoufson",
    },
    {
      name: "Twitter/X",
      href: "https://x.com/djouf_legran",
      icon: Twitter,
      value: "@djouf_legran",
    },
  ];

  return (
    <div className="container py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="text-3xl font-semibold mb-4">{t('heading')}</h1>
        <p className="text-muted-foreground leading-relaxed">
          {t('description')}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2">
          <ContactForm />
        </div>

        <div className="space-y-6">
          <h2 className="text-lg font-medium">{t('otherWays')}</h2>
          <div className="space-y-4">
            {socialLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <IconComponent className="w-4 h-4 flex-shrink-0" />
                  <span>{link.value}</span>
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
