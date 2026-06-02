export type AssertionTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "PLATFORM_OPERATIONS"
  | "PROCUREMENT_TRUST"
  | "REVENUE_SYSTEMS"
  | "REGULATED_INFRASTRUCTURE";

export type DriftAction = "CLOSE" | "REFRESH" | "RESTATE" | "ESCALATE";

export type DriftSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface TrustAssertionDriftMonitorItem {
  id: string;
  lane: string;
  track: AssertionTrack;
  action: DriftAction;
  assertionFamily: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  publicAssertion: string;
  evidenceReality: string;
  driftHeadline: string;
  driftSignal: string;
  missingProof: string;
  evidenceArtifacts: string[];
  remediationMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  assertionConfidenceScore: number;
  evidenceFreshnessDays: number;
  ownerContinuityScore: number;
  contradictionCount: number;
  publicExposureScore: number;
  driftExposureMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface DriftAssessment {
  severity: DriftSeverity;
  ok: boolean;
  message: string;
}

export interface TrustAssertionDriftMonitorReportItem extends TrustAssertionDriftMonitorItem {
  assertionConfidenceAssessment: DriftAssessment;
  evidenceFreshnessAssessment: DriftAssessment;
  ownerContinuityAssessment: DriftAssessment;
  contradictionAssessment: DriftAssessment;
  exposureAssessment: DriftAssessment;
  compositeDriftRiskScore: number;
}

export interface TrustAssertionDriftMonitorSummary {
  assertionsTracked: number;
  highDriftAssertions: number;
  staleAssertions: number;
  contradictionHotspots: number;
  averageAssertionConfidence: number;
  driftExposureMillions: number;
  leadingMessage: string;
}

export interface TrustAssertionDriftMonitorExport {
  generatedAt: string;
  summary: TrustAssertionDriftMonitorSummary;
  items: TrustAssertionDriftMonitorReportItem[];
}

export interface TrustAssertionDriftMonitorPayload {
  report: TrustAssertionDriftMonitorExport;
  assertionRegister: ReturnType<typeof import("./services/verticalBriefService.js").assertionRegister>;
  driftMatrix: ReturnType<typeof import("./services/verticalBriefService.js").driftMatrix>;
  remediationPosture: ReturnType<typeof import("./services/verticalBriefService.js").remediationPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: TrustAssertionDriftMonitorItem[];
}
