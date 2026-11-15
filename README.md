# RCSA workflow demo

An interactive, self-contained demonstration for banking leaders: a quarterly wire-transfer refresh across first and second line. The experience uses synthetic data and scripted AI assistance. People own every assessment, challenge and sign-off.

## Run locally

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open **http://127.0.0.1:8000/src/**. Python 3 is the only runtime prerequisite. No package installation, model credentials or backend is required. The root URL and legacy page entry points redirect to the current workspace. Stop the server with Ctrl+C.

## Explore the experience

- Role-specific operational dashboards with a risk heatmap, prominent AI briefing, filtered work queue, evidence needs, management decisions and assessment register.
- Full inherent, control and residual assessment for three synthetic risks, with separate likelihood, impact and rationale.
- Risk-specific AI control recommendations, editable enhancements/new designs, mapping-dependent gap analysis, bounded evidence checks and generated implementation/validation task plans.
- Always-available control library, owner revisions of submitted assessments, editable coverage rationale, replacement/removal and proposed-control creation. Earlier versions expose their submitted mappings and evidence.
- Connected investigation with event reconstruction, supporting/counter-evidence, curated research, response comparisons and version-aware new evidence.
- Explicit owner control conclusions, separate protective measures/testing and independent second-line assessment judgments.
- Connected AI risk analysis with near misses, operational events, open issues, source limits and distinct inherent/residual lenses; targeted response and reviewer-question drafts.
- Explicit risk responses with a selected approach, rationale, owner and linked action/evidence. Acceptance requests remain pending decisions.
- Shared-control-dependency discovery: compare source excerpts, then confirm, qualify or dismiss the proposed relationship.
- Owner attestation, second-line challenge, revised response, reviewer conclusion and inspectable submission versions.
- Leadership reporting with prior/current comparison, evidence links and human narrative confirmation.
- Presenter perspective, scene shortcuts and confirmed reset. Reload preserves the current tab's session when storage is available.

Start on the first-line **Dashboard**, then choose **Refresh wire-transfer RCSA** beside the heading. **Continue wire-transfer refresh** resumes an assessment already underway. The collapsed **Presentation controls** disclosure contains perspective, scene and reset tools. The complete presentation takes approximately 8–10 minutes; follow the [demo runbook](docs/operations/demo-runbook.md).

The demo deliberately keeps current risk, review completion, open actions and pending management decisions separate. AI suggestions are illustrative; there are no live model calls, institutional records, real approval actions, emails or external services.

## Buyer implementation walkthrough

The GRC connection is already configured. Complete the assessment and independent review: the reviewed version syncs automatically, with a quiet status on the assessment and report. Drafts and returned assessments stay local. There is no separate import, export or transfer approval. All records and updates remain simulated locally.

**Settings → Integrations** holds connection details, sync history and an implementation checklist. Failed updates offer retry; a source conflict shows a comparison for the assessment owner. Incompatible rating methods or missing control IDs pause sync. Presenter controls can set the next GRC update to a connection interruption or source change before completing review. [Automatic-sync plan](docs/operations/automatic-grc-sync-plan.md) and [adapter contract](docs/data-contracts/grc-reference-exchange.md).

## Implementation and verification

The running app is native HTML/CSS/ES modules, served directly from `src/index.html`. Its shared design system is documented in [Implementation design](docs/ux/IMPLEMENTATION_DESIGN.md); older page shells and design-system files remain historical references.

- Scenario fixtures: `assets/data/workflow-demo.json` and `assets/data/risk-intelligence.json`; [data contract](docs/data-contracts/workflow-demo.md).
- UI/state modules: `src/scripts/demo/`; shared styles: `src/styles/demo.css`.
- Control-assistance checks: `node tools/verify-control-assistance.mjs` and `node tools/verify-control-assistance-workflow.mjs`; [browser and visual QA](docs/ux/ai-control-assistance-qa.md).
- Mapping/response checks: `node tools/verify-product-refinements.mjs`.
- Buyer-readiness checks: `node tools/verify-buyer-readiness.mjs`; covers exchange, role/method guards, snapshot/ownership preservation and returned clarification.
- Automatic-sync checks: `node tools/verify-automatic-grc-sync.mjs`; covers the review trigger, draft/return guards, configured worker, source comparison, retry and immutable bank records.
- Workflow checks: `node tools/verify-demo.mjs` (Node 18+).
- Follow-up checks: `node tools/verify-owner-revision.mjs`, `node tools/verify-risk-matrix.mjs`, `node tools/verify-risk-intelligence.mjs`.
- Focused browser checks: `node tools/verify-mapping-experience.cjs` and `node tools/verify-intelligence-experience.cjs`.
- Optional browser regression: `node tools/verify-browser.cjs` with Playwright and Chrome installed; see the runbook for configuration.
- [QA report](docs/ux/qa-report.md): full-flow checks, responsive screenshots and visual comparison ledger.

The [workflow plan](docs/operations/workflow-demo-plan.md) governs scope. The current release includes automatic GRC synchronization, the plain-language refresh, regression scripts and linked browser evidence. See the [latest verification](output/automatic-grc-sync-2026-11-14/verification.md). The [GitHub tracker #1](https://github.com/ethtri/RCSA-Copilot-Local/issues/1) and its implementation issues remain the historical backlog; issue reconciliation is separate from publishing this version.
