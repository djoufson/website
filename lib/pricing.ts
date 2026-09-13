/**
 * Commission base pricing, shown in the visitor's likely local currency.
 *
 * V1 keeps this client-only and network-free: the currency is guessed from the
 * browser time zone and can be overridden with a toggle. Prices are indicative
 * "starting from" figures — edit the amounts below freely.
 */
export type Currency = "USD" | "EUR" | "XAF";

export const CURRENCIES: Currency[] = ["USD", "EUR", "XAF"];

/** Short label shown on the region/currency toggle. */
export const CURRENCY_LABEL: Record<Currency, string> = {
  USD: "USD",
  EUR: "EUR",
  XAF: "FCFA",
};

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
 * Best-effort guess of the visitor's currency from the browser time zone — no
 * network call, no IP lookup. Falls back to USD; the toggle always wins.
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
