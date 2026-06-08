/**
 * Configuration for advertising banners displayed at the top of the site
 */
export interface BannerConfig {
  /** Unique identifier for the banner (used for dismiss tracking) */
  id: string;
  /** Main headline of the banner */
  title: string;
  /** Descriptive text (hidden on mobile) */
  description: string;
  /** Event date or period */
  date?: string;
  /** Physical location of the event */
  location?: string;
  /** URL to link to */
  link: string;
  /** Text for the call-to-action button */
  linkText: string;
  /** Start date for banner visibility */
  startDate: Date;
  /** End date for banner visibility */
  endDate: Date;
  /** Tailwind gradient classes (e.g., 'from-blue-600 to-purple-600') */
  bgGradient?: string;
  /** Emoji or icon to display */
  icon?: string;
}

/**
 * List of all advertising banners
 * Add new banners here to display them on the site
 * Only banners within their startDate and endDate will be shown
 */
export const activeBanners: BannerConfig[] = [
  {
    id: '10000-codeurs',
    title: "10000 Codeurs's 4th Forum in Cameroon",
    description: 'Join us for an inspiring event and meet experts',
    date: 'June 18, 2026',
    // location: 'Serena Hotel, Douala',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLSfpv5gQVvvFjUa77Cg6ydbvKng38PEHNk09aUkMMubTG7H2jw/viewform',
    linkText: 'Register Now',
    startDate: new Date('2025-12-01'),
    endDate: new Date('2026-06-19'),
    bgGradient: 'from-purple-600 via-violet-600 to-indigo-600',
    icon: '🚀'
  }
];

/**
 * Get the current active banner based on date
 * Returns the first banner that matches the current date range
 * Users can dismiss banners, which are stored in localStorage
 */
export function getActiveBanner(): BannerConfig | null {
  const now = new Date();
  const banner = activeBanners.find(
    (b) => now >= b.startDate && now <= b.endDate
  );
  return banner || null;
}
