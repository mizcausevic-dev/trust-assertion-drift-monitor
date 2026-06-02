import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("trust-assertion-drift-monitor app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Trust Assertion Drift Monitor");
  });

  it("serves the assertion register route", async () => {
    const response = await request(app).get("/assertion-register");
    expect(response.status).toBe(200);
  });

  it("serves the drift matrix route", async () => {
    const response = await request(app).get("/drift-matrix");
    expect(response.status).toBe(200);
  });

  it("serves the remediation posture route", async () => {
    const response = await request(app).get("/remediation-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.assertionsTracked).toBeGreaterThan(0);
  });

  it("serves the assertion register API", async () => {
    const response = await request(app).get("/api/assertion-register");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the drift matrix API", async () => {
    const response = await request(app).get("/api/drift-matrix");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
