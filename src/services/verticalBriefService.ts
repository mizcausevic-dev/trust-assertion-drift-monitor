import { analyze } from "../analyze.js";
import { sampleTrustAssertionDriftMonitor } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleTrustAssertionDriftMonitor, { now: "2026-06-02T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Use procurement and identity as the reference assertions, escalate platform trust first, restate revenue language second, and refresh AI plus regulated proof before the next external review."
  };
}

export function assertionRegister() {
  return sampleTrustAssertionDriftMonitor.map((item) => ({
    lane: item.lane,
    assertionFamily: item.assertionFamily,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    publicAssertion: item.publicAssertion,
    assertionConfidenceScore: item.assertionConfidenceScore,
    nextMove: item.nextMove
  }));
}

export function driftMatrix() {
  return sampleTrustAssertionDriftMonitor.map((item) => ({
    lane: item.lane,
    track: item.track,
    driftHeadline: item.driftHeadline,
    driftSignal: item.driftSignal,
    missingProof: item.missingProof,
    evidenceArtifacts: item.evidenceArtifacts,
    assertionConfidenceScore: item.assertionConfidenceScore,
    evidenceFreshnessDays: item.evidenceFreshnessDays,
    ownerContinuityScore: item.ownerContinuityScore
  }));
}

export function remediationPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    contradictionCount: item.contradictionCount,
    compositeDriftRiskScore: item.compositeDriftRiskScore,
    owner: item.owner,
    nextMove: item.nextMove
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    compositeDriftRiskScore: item.compositeDriftRiskScore,
    driftExposureMillions: item.driftExposureMillions,
    publicExposureScore: item.publicExposureScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic trust-assertion data only - no live buyer, board, customer, or partner evidence packets are included.",
    "Scores are modeled to show how Kinetic Gain can compare public assertion confidence, evidence freshness, owner continuity, contradiction load, and exposure pressure in one board-readable trust surface.",
    "All routes are read-only and demonstrate trust-assertion drift monitoring, not production legal, security, or compliance advice."
  ];
}

export function payload() {
  return {
    report,
    assertionRegister: assertionRegister(),
    driftMatrix: driftMatrix(),
    remediationPosture: remediationPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleTrustAssertionDriftMonitor
  };
}
