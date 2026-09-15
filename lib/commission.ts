/**
 * Client-side commission tracking IDs (e.g. `ART-2026-0042`).
 *
 * V1 has no database, so this ID is purely for human email management -
 * it makes each request easy to search and reference in the artist ↔ client
 * email thread, and gives a clean migration path if a real order store is
 * added later (see docs/commission-system-spec.md). It is NOT a guaranteed-unique
 * sequence: with no backend to hand out numbers, we derive a stable-looking
 * 4-digit suffix from the current time so two requests are very unlikely to collide.
 */
export function generateTrackingId(now: Date = new Date()): string {
  const year = now.getFullYear();
  // Seconds-into-day (0–86399) mapped into a 4-digit space keeps the suffix
  // short, monotonic-ish across a day, and collision-resistant enough for email.
  const secondsIntoDay =
    now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const suffix = String(secondsIntoDay % 10000).padStart(4, "0");
  return `ART-${year}-${suffix}`;
}
