import type {
  DriftAssessment,
  DriftSeverity,
  TrustAssertionDriftMonitorExport,
  TrustAssertionDriftMonitorItem,
  TrustAssertionDriftMonitorReportItem
} from "./types.js";

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): DriftAssessment {
  let severity: DriftSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): DriftAssessment {
  let severity: DriftSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: TrustAssertionDriftMonitorItem[],
  options: { now?: string } = {}
): TrustAssertionDriftMonitorExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: TrustAssertionDriftMonitorReportItem[] = items.map((item) => {
    const assertionConfidenceAssessment = assessStrength(
      item.assertionConfidenceScore,
      84,
      70,
      "Assertion confidence is high enough to survive external review.",
      "Assertion confidence exists, but the language should narrow before reuse.",
      "Assertion confidence is weaker than the public claim implies."
    );

    const evidenceFreshnessAssessment = assessDelay(
      item.evidenceFreshnessDays,
      14,
      35,
      "Evidence is fresh enough to support the public assertion.",
      "Evidence is aging and should be refreshed before the next review cycle.",
      "Evidence is stale enough that the public assertion should not stand unchanged."
    );

    const ownerContinuityAssessment = assessStrength(
      item.ownerContinuityScore,
      80,
      65,
      "Owner continuity is strong enough to close drift quickly.",
      "Owner continuity exists, but follow-through still depends on cross-functional coordination.",
      "Owner continuity is too weak to keep the trust claim stable."
    );

    const contradictionAssessment = assessDelay(
      item.contradictionCount,
      0,
      1,
      "No material contradiction is visible between assertion and evidence.",
      "A contradiction is forming and should be closed before the next review cycle.",
      "Contradiction load is already visible enough to weaken the assertion."
    );

    const exposureAssessment = assessStrength(
      100 - item.publicExposureScore,
      52,
      32,
      "External exposure is manageable relative to the current drift level.",
      "External exposure is rising faster than evidence confidence.",
      "External exposure is too high for the current assertion drift."
    );

    const compositeDriftRiskScore =
      Math.round(
        ((100 - item.assertionConfidenceScore +
          item.evidenceFreshnessDays +
          100 - item.ownerContinuityScore +
          item.contradictionCount * 20 +
          item.publicExposureScore) /
          5) *
          10
      ) / 10;

    return {
      ...item,
      assertionConfidenceAssessment,
      evidenceFreshnessAssessment,
      ownerContinuityAssessment,
      contradictionAssessment,
      exposureAssessment,
      compositeDriftRiskScore
    };
  });

  const highDriftAssertions = reportItems.filter(
    (item) =>
      item.assertionConfidenceAssessment.severity === "HIGH" ||
      item.evidenceFreshnessAssessment.severity === "HIGH" ||
      item.ownerContinuityAssessment.severity === "HIGH"
  ).length;

  const staleAssertions = reportItems.filter(
    (item) => item.evidenceFreshnessAssessment.severity !== "LOW" || item.action === "REFRESH"
  ).length;

  const contradictionHotspots = reportItems.filter(
    (item) => item.contradictionAssessment.severity !== "LOW" || item.action === "ESCALATE"
  ).length;

  const averageAssertionConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.assertionConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const driftExposureMillions = reportItems.reduce((sum, item) => sum + item.driftExposureMillions, 0);

  const leadingMessage =
    highDriftAssertions === 0
      ? "Assertion language is aligned closely enough with live evidence to support the current buyer, board, and investor narrative."
      : highDriftAssertions <= 2
        ? "A few public assertions need fresher proof and tighter ownership before the next external review cycle."
        : "Trust drift is now cross-functional and should be closed as one board-visible remediation workstream.";

  return {
    generatedAt,
    summary: {
      assertionsTracked: reportItems.length,
      highDriftAssertions,
      staleAssertions,
      contradictionHotspots,
      averageAssertionConfidence,
      driftExposureMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: TrustAssertionDriftMonitorItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
