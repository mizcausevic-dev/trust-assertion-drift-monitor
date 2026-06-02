import { assertionRegister, driftMatrix, payload, remediationPosture, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Trust Assertion Drift Monitor";
const domain = "https://drift.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid { display: grid; gap: 18px; }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip { color: var(--accent); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/assertion-register", "Assertion register"],
    ["/drift-matrix", "Drift matrix"],
    ["/remediation-posture", "Remediation posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderDriftMonitorOverview() {
  const executiveSummary = summary();
  const lanes = assertionRegister().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.assertionFamily)}</h3>
        <p><strong>Owner:</strong> ${escapeHtml(item.owner)}</p>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Assertion:</strong> ${escapeHtml(item.publicAssertion)}</p>
        <p><strong>Confidence:</strong> ${item.assertionConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeDriftRiskScore} · exposure ${item.publicExposureScore} · $${item.driftExposureMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Trust assertion drift</span>
      <h1>Which public trust claims are strongest, which ones are drifting away from live evidence, and where will the next buyer, board, or investor review push back first?</h1>
      <p class="lede">Trust Assertion Drift Monitor turns public-claim confidence, evidence freshness, owner continuity, and contradiction load into one board-readable trust layer instead of scattered proof folders and overconfident narrative language.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Assertions tracked</span><span class="metric-value">${executiveSummary.assertionsTracked}</span><div class="metric-copy">Modeled public trust assertions in the current executive-facing estate.</div></div>
        <div class="metric"><span class="metric-label">High-drift assertions</span><span class="metric-value">${executiveSummary.highDriftAssertions}</span><div class="metric-copy">Assertion families with high confidence, freshness, or owner-continuity pressure.</div></div>
        <div class="metric"><span class="metric-label">Stale assertions</span><span class="metric-value">${executiveSummary.staleAssertions}</span><div class="metric-copy">Assertion families already aging past what the public wording implies.</div></div>
        <div class="metric"><span class="metric-label">Drift exposure</span><span class="metric-value">$${executiveSummary.driftExposureMillions}M</span><div class="metric-copy">Modeled exposure tied to overstated or stale trust language.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Assertion register</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible drift pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready trust surface for comparing public assertion confidence, evidence freshness, contradiction load, and owner continuity."
  );
}

export function renderAssertionRegister() {
  const rows = assertionRegister()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.assertionFamily)}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.publicAssertion)}</td>
        <td>${item.assertionConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Assertion register",
    "/assertion-register",
    `<section class="hero">
      <span class="eyebrow">Assertion register</span>
      <h1>Each public trust claim keeps one owner, one audience, one live assertion, and one corrective move attached.</h1>
      <p class="lede">The assertion register keeps trust language tied to the exact claim that will succeed or stall under external review.</p>
      <div class="nav">${navLinks("/assertion-register")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Assertion family</th><th>Owner</th><th>Audience</th><th>Action</th><th>Public assertion</th><th>Confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Assertion-register view showing who owns each trust claim, who needs it, and how defensible it is."
  );
}

export function renderDriftMatrix() {
  const rows = driftMatrix()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.track)}</td>
        <td>${escapeHtml(item.driftHeadline)}</td>
        <td>${escapeHtml(item.driftSignal)}</td>
        <td>${escapeHtml(item.missingProof)}</td>
        <td>${item.assertionConfidenceScore}</td>
        <td>${item.evidenceFreshnessDays}</td>
        <td>${item.ownerContinuityScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Drift matrix",
    "/drift-matrix",
    `<section class="hero">
      <span class="eyebrow">Drift matrix</span>
      <h1>Overstated language, stale proof, and low-owner continuity stay visible in one trust room instead of hiding in separate folders.</h1>
      <p class="lede">This view keeps drift pressure tied to the specific assertion most likely to fail under buyer, investor, or partner review.</p>
      <div class="nav">${navLinks("/drift-matrix")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Track</th><th>Drift headline</th><th>Drift signal</th><th>Missing proof</th><th>Confidence</th><th>Freshness (days)</th><th>Owner continuity</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Drift-matrix view showing where public trust claims are incomplete, stale, or weakly owned."
  );
}

export function renderRemediationPosture() {
  const rows = remediationPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.contradictionCount}</td>
        <td>${item.compositeDriftRiskScore}</td>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.nextMove)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Remediation posture",
    "/remediation-posture",
    `<section class="hero">
      <span class="eyebrow">Remediation posture</span>
      <h1>The monitor keeps trust cleanup tied to one owner, one contradiction count, and one next move instead of a floating narrative to-do list.</h1>
      <p class="lede">This remediation posture helps leaders see which assertions can close quickly, which require escalation, and which should be restated until the evidence layer catches up.</p>
      <div class="nav">${navLinks("/remediation-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Contradictions</th><th>Trust risk</th><th>Owner</th><th>Next move</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Remediation-posture view for sequencing trust-assertion closure, escalation, and restatement."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this trust monitor is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live trust register.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Trust Assertion Drift Monitor sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Trust Assertion Drift Monitor docs</h1>
      <p class="lede">This surface packages assertion confidence, contradiction load, freshness drift, and remediation sequencing into reproducible routes and JSON outputs for board, investor, buyer, and partner trust reviews.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/assertion-register</code> keeps public claims, owners, and next moves tied to one assertion family.</li>
        <li><code>/drift-matrix</code> compares missing proof, contradiction load, freshness, and owner continuity.</li>
        <li><code>/remediation-posture</code> sequences refresh, restatement, escalation, and closure.</li>
        <li><code>/api/payload</code> exposes the reproducible trust monitor.</li>
      </ul>
    </section>`,
    "Product documentation for Trust Assertion Drift Monitor and its drift-ready routes."
  );
}
