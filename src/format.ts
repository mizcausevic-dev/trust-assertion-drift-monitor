import type { TrustAssertionDriftMonitorSummary } from "./types.js";

export function formatSummary(
  summary: TrustAssertionDriftMonitorSummary,
  title = "Trust Assertion Drift Monitor"
) {
  return [
    title,
    `Assertions tracked: ${summary.assertionsTracked}`,
    `High-drift assertions: ${summary.highDriftAssertions}`,
    `Stale assertions: ${summary.staleAssertions}`,
    `Contradiction hotspots: ${summary.contradictionHotspots}`,
    `Average assertion confidence: ${summary.averageAssertionConfidence}`,
    `Drift exposure: $${summary.driftExposureMillions}M`,
    summary.leadingMessage
  ].join("\n");
}
