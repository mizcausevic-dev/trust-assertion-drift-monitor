import { describe, expect, it } from "vitest";
import {
  renderAssertionRegister,
  renderDocs,
  renderDriftMatrix,
  renderDriftMonitorOverview,
  renderRemediationPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderDriftMonitorOverview()).toContain("Trust Assertion Drift Monitor");
  });

  it("renders the assertion register route", () => {
    expect(renderAssertionRegister()).toContain("/assertion-register");
  });

  it("renders the drift matrix route", () => {
    expect(renderDriftMatrix()).toContain("/drift-matrix");
  });

  it("renders the remediation posture route", () => {
    expect(renderRemediationPosture()).toContain("Remediation posture");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic trust-assertion data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
