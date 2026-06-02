import express from "express";
import { assertionRegister, driftMatrix, payload, remediationPosture, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderAssertionRegister,
  renderDocs,
  renderDriftMatrix,
  renderDriftMonitorOverview,
  renderRemediationPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderDriftMonitorOverview()));
  app.get("/assertion-register", (_req, res) => res.type("html").send(renderAssertionRegister()));
  app.get("/drift-matrix", (_req, res) => res.type("html").send(renderDriftMatrix()));
  app.get("/remediation-posture", (_req, res) => res.type("html").send(renderRemediationPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/assertion-register", (_req, res) => res.json(assertionRegister()));
  app.get("/api/drift-matrix", (_req, res) => res.json(driftMatrix()));
  app.get("/api/remediation-posture", (_req, res) => res.json(remediationPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`trust-assertion-drift-monitor listening on http://127.0.0.1:${port}`);
  });
}
