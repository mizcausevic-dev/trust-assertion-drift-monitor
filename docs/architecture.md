# Architecture

Trust Assertion Drift Monitor is a static-friendly TypeScript executive-intelligence surface for comparing public trust language against live evidence freshness, contradiction load, owner continuity, and board-visible exposure.

## Routes

- `/`
- `/assertion-register`
- `/drift-matrix`
- `/remediation-posture`
- `/verification`
- `/docs`

## Flow

1. `src/data/sampleVerticalBrief.ts` defines synthetic trust assertions with confidence, freshness, contradiction, and exposure signals.
2. `src/analyze.ts` converts those signals into board-readable drift assessments and a composite trust-risk score.
3. `src/services/verticalBriefService.ts` shapes the assertion register, drift matrix, remediation posture, and JSON payload routes.
4. `src/services/render.ts` turns those outputs into the static HTML views used in the published surface.

## Output contract

The surface publishes:

- board-readable HTML routes for overview, assertion register, drift matrix, remediation posture, verification, and docs
- JSON routes for summary, assertion register, drift matrix, remediation posture, verification, and full payload export
- generated screenshots and fixtures for README packaging and safe product proof
