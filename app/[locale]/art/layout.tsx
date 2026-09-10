import { setRequestLocale } from "next-intl/server";

/**
 * The gallery follows the site's light/dark theme. The immersive experience
 * lives in the fullscreen post viewer (/art/[slug]), not in a forced palette.
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

  return children;
}
