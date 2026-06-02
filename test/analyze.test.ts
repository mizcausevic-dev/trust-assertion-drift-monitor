import { describe, expect, it } from "vitest";
import { analyze, toExport } from "../src/analyze.js";
import { sampleTrustAssertionDriftMonitor } from "../src/data/sampleVerticalBrief.js";
import type { TrustAssertionDriftMonitorItem } from "../src/types.js";

describe("analyze", () => {
  it("preserves the item count", () => {
    const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.items.length).toBe(sampleTrustAssertionDriftMonitor.length);
  });

  it("counts high-drift assertions", () => {
    const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.highDriftAssertions).toBeGreaterThan(0);
  });

  it("counts contradiction hotspots", () => {
    const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.contradictionHotspots).toBeGreaterThan(0);
  });

  it("sums drift exposure", () => {
    const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.driftExposureMillions).toBe(147);
  });

  it("calculates a leading board message", () => {
    const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.leadingMessage.length).toBeGreaterThan(20);
  });

  it("handles an empty estate", () => {
    const report = analyze([], { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.assertionsTracked).toBe(0);
    expect(report.summary.averageAssertionConfidence).toBe(0);
    expect(report.summary.leadingMessage).toContain("aligned");
  });

  it("hits low and medium drift branches explicitly", () => {
    const fixtures: TrustAssertionDriftMonitorItem[] = [
      {
        id: "low-branch",
        lane: "Healthy assertion",
        track: "PROCUREMENT_TRUST",
        action: "CLOSE",
        assertionFamily: "Healthy assertion",
        boardQuestion: "Can this assertion stay cleanly aligned?",
        owner: "Trust owner",
        audience: "Board growth committee",
        currentPosture: "Stable.",
        publicAssertion: "Controls are ready.",
        evidenceReality: "Evidence is aligned.",
        driftHeadline: "Evidence is aligned.",
        driftSignal: "No visible issue.",
        missingProof: "None",
        evidenceArtifacts: ["trust packet"],
        remediationMoves: ["keep assertion current"],
        relatedSurfaces: ["procurement.kineticgain.com"],
        companyTags: ["Google"],
        assertionConfidenceScore: 86,
        evidenceFreshnessDays: 9,
        ownerContinuityScore: 82,
        contradictionCount: 0,
        publicExposureScore: 40,
        driftExposureMillions: 5,
        headline: "Healthy assertion.",
        narrative: "Low branch test.",
        nextMove: "Keep the assertion current."
      },
      {
        id: "watch-branch",
        lane: "Watch assertion",
        track: "IDENTITY",
        action: "REFRESH",
        assertionFamily: "Watch assertion",
        boardQuestion: "Where does the assertion start aging?",
        owner: "Security owner",
        audience: "Audit committee",
        currentPosture: "Watch state.",
        publicAssertion: "Controls are consistent.",
        evidenceReality: "Evidence is aging.",
        driftHeadline: "Evidence is aging.",
        driftSignal: "One visible contradiction.",
        missingProof: "Recent control export",
        evidenceArtifacts: ["control export"],
        remediationMoves: ["refresh assertion"],
        relatedSurfaces: ["certs.kineticgain.com"],
        companyTags: ["Okta"],
        assertionConfidenceScore: 72,
        evidenceFreshnessDays: 24,
        ownerContinuityScore: 69,
        contradictionCount: 1,
        publicExposureScore: 55,
        driftExposureMillions: 7,
        headline: "Watch the assertion.",
        narrative: "Medium branch test.",
        nextMove: "Refresh the assertion."
      }
    ];

    const report = analyze(fixtures, { now: "2026-06-02T00:00:00Z" });
    expect(report.items[0].assertionConfidenceAssessment.severity).toBe("LOW");
    expect(report.items[0].evidenceFreshnessAssessment.severity).toBe("LOW");
    expect(report.items[1].assertionConfidenceAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].evidenceFreshnessAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].ownerContinuityAssessment.severity).toBe("MEDIUM");
    expect(report.items[1].contradictionAssessment.severity).toBe("MEDIUM");
    expect(report.summary.leadingMessage).toContain("aligned");
  });

  it("exports through toExport", () => {
    const report = toExport(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });
    expect(report.summary.assertionsTracked).toBe(sampleTrustAssertionDriftMonitor.length);
  });
});
