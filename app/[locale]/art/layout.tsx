import { setRequestLocale } from "next-intl/server";

/**
 * Scopes the gallery's immersive, always-dark palette (spec: #0B0B0B / #F5F5F5)
 * regardless of the site's light/dark theme. The `.art-scope` class defines the
 * gallery CSS variables in globals.css.
 */
export default async function ArtLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <div className="art-scope">{children}</div>;
}
