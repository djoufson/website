/**
 * Commission base pricing, shown in the visitor's likely local currency.
 *
 * The currency is resolved on the client: an instant guess from the browser
 * time zone, then refined by an IP → country lookup (the visitor's browser makes
 * the call, so it works regardless of where the server is hosted). Prices are
 * indicative "starting from" figures — edit the amounts below freely.
 */
export type Currency = "USD" | "EUR" | "XAF";

/** Base "starting from" price per style, per currency. */
export const STYLE_PRICES: Record<string, Record<Currency, number>> = {
  vector: { USD: 20, EUR: 18, XAF: 10000 },
  painted: { USD: 35, EUR: 30, XAF: 15000 },
  character: { USD: 60, EUR: 52, XAF: 25000 },
};

export function formatPrice(amount: number, currency: Currency): string {
  // French grouping (space separators) reads naturally for FCFA amounts.
  const grouped = amount.toLocaleString(currency === "XAF" ? "fr-FR" : "en-US");
  switch (currency) {
    case "USD":
      return `$${grouped}`;
    case "EUR":
      return `€${grouped}`;
    case "XAF":
      return `${grouped} FCFA`;
  }
}

/** CFA-franc-zone countries (Central & West Africa) — displayed as FCFA. */
const CFA_COUNTRIES = new Set([
  "CM", "CF", "TD", "CG", "GA", "GQ", // XAF (Central)
  "BJ", "BF", "CI", "GW", "ML", "NE", "SN", "TG", // XOF (West)
]);

/** Eurozone countries — displayed in EUR. */
const EURO_COUNTRIES = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE",
  "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
]);

/** Map an ISO-3166 alpha-2 country code to one of the supported currencies. */
export function currencyForCountry(code: string): Currency {
  const cc = code.toUpperCase();
  if (CFA_COUNTRIES.has(cc)) return "XAF";
  if (EURO_COUNTRIES.has(cc)) return "EUR";
  return "USD";
}

/** CFA-franc-zone (Central & West Africa) IANA time zones — displayed as FCFA. */
const CFA_TIMEZONES = new Set([
  "Africa/Douala",
  "Africa/Bangui",
  "Africa/Ndjamena",
  "Africa/Brazzaville",
  "Africa/Libreville",
  "Africa/Malabo",
  "Africa/Porto-Novo",
  "Africa/Ouagadougou",
  "Africa/Abidjan",
  "Africa/Bissau",
  "Africa/Bamako",
  "Africa/Niamey",
  "Africa/Dakar",
  "Africa/Lome",
]);

/**
 * Instant, network-free guess of the visitor's currency from the browser time
 * zone. Used as the first paint before the IP lookup resolves. Falls back to USD.
 */
export function detectCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    if (CFA_TIMEZONES.has(tz)) return "XAF";
    if (tz.startsWith("Europe/")) return "EUR";
  } catch {
    // Intl unavailable — fall through to USD.
  }
  return "USD";
}

/**
 * Resolve the visitor's currency from their IP via GeoJS — a free, key-less,
 * HTTPS, CORS-enabled endpoint. The call is made from the browser, so it reads
 * the visitor's IP (not the server's). Returns null on any failure so the
 * caller can keep the time-zone guess.
 */
export async function fetchCurrencyByIp(signal?: AbortSignal): Promise<Currency | null> {
  try {
    const res = await fetch("https://get.geojs.io/v1/ip/country.json", { signal });
    if (!res.ok) return null;
    const data = await res.json();
    const code = String(data?.country ?? "");
    return code ? currencyForCountry(code) : null;
  } catch {
    return null;
  }
}
