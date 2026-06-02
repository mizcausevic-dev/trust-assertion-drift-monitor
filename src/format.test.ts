import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("formats the trust summary", () => {
    const output = formatSummary({
      assertionsTracked: 6,
      highDriftAssertions: 4,
      staleAssertions: 3,
      contradictionHotspots: 3,
      averageAssertionConfidence: 72.8,
      driftExposureMillions: 147,
      leadingMessage: "Trust drift is rising."
    });

    expect(output).toContain("Trust Assertion Drift Monitor");
    expect(output).toContain("High-drift assertions: 4");
    expect(output).toContain("Contradiction hotspots: 3");
    expect(output).toContain("Drift exposure: $147M");
  });
});
