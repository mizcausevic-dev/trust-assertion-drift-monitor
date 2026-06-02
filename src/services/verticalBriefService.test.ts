import { describe, expect, it } from "vitest";
import { assertionRegister, driftMatrix, payload, remediationPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the trust summary", () => {
    expect(summary().assertionsTracked).toBeGreaterThan(0);
  });

  it("returns the assertion register view", () => {
    expect(assertionRegister().length).toBeGreaterThan(0);
  });

  it("returns the drift matrix view", () => {
    expect(driftMatrix().length).toBeGreaterThan(0);
  });

  it("returns the remediation posture view", () => {
    expect(remediationPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.assertionsTracked).toBeGreaterThan(0);
  });
});
