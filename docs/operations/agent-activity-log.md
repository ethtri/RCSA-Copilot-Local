# Agent Activity Log – Static Demo Track

> Add new entries at the top of the relevant date. Each entry should capture the workstream focus, key changes, verification notes, and follow-up items so the PM team can self-serve progress without scraping chat transcripts.

## 2026-11-14

### Codex — Visual concept review outcome

- **Owner feedback:** Concepts are directionally acceptable but lack the expected modern UX/CX polish; use them as reference only.
- **Disposition:** Both concept indexes now explicitly mark the images as reference-only. No visual implementation specification is accepted. Issue #2 remains open; improve a representative assessment/control-discovery screen before extending the design across the application.

### Codex — Expanded visual concepts for issue 2

- **Scope:** Continued the owner-selected light/teal direction before implementation, refining the four original concepts and creating ten missing assessment, review, reporting, and responsive states.
- **Key changes:** Added the fourteen-screen `docs/ux/concepts/2026-11-14/review-v2/` set, source prompts, fixed synthetic chronology, scene/status definitions, and a shared content specification. Preserved the original concepts as history.
- **Verification:** Inspected generated screens and made targeted corrections to test applicability, residual-risk wording, shared control names, reviewer authority, dates, dashboard snapshots, and matrix vocabulary. All fourteen image links resolve and `git diff --check` passes. Minor raster-level shell variations are recorded for consistent design-system extraction.
- **Follow-up:** Owner review of the expanded screens, then issue 3 design-system extraction. No application implementation or browser-fidelity claim is made for these concept images.

### Codex — GitHub implementation backlog

- **Scope:** Created the owner-requested GitHub backlog for the finalized demo, including polished visuals and final fidelity review.
- **Key changes:** Published tracker #1 with the complete agreed plan and fourteen implementation issues (#2–#15), each with scope, acceptance criteria, prerequisites, and verification. Added `implementation-backlog.md` and linked the backlog from README and the delivery plan.
- **Verification:** Read back all fifteen issues and confirmed exact titles/bodies, open state, and the intended `ethtri` author. GitHub lists all fourteen implementation issues as children of tracker #1. Nine added local documentation links resolve, the backlog lists each implementation issue once, and `git diff --check` passes.
- **Follow-up:** Begin full-screen visual concepts (#2) and coherent scenario content (#4); select the visual direction before UI implementation.

### Codex — Workflow demo planning

- **Scope:** Finalized the banking-leader demo after owner alignment and independent AI-use-case research.
- **Key changes:** Added `workflow-demo-plan.md`; linked it from README and delivery plan; updated decisions, risks, and acceptance criteria. Recorded complete inherent/control/residual assessment and the shared-dependency discovery in the main walkthrough.
- **Verification:** Read back the plan and governance references; six added local Markdown links resolve, all three example scores/bands reconcile, and `git diff --check` passes. Independent planning review found no material contradictions or omissions. Planning changes only; UI implementation remains pending.
- **Follow-up:** Establish visual concepts, author consistent scenario fixtures, then implement the scripted workflow and verify the rendered experience.

## 2025-11-03

### Agent A09 - Documentation Archivist (WS-01)
- **Scope:** Archived remaining Power Pages runbooks and CSS guides, refreshed governance references, and logged verification/open questions for the static track.
- **Key Changes:** `docs/legacy/**` (new Power Pages archives + README index updates), `docs/operations/delivery-plan.md`, `README.md`, `docs/ux/cx-director-audit.md`, `docs/ux/bootstrap-manifest.md`, `docs/operations/agent-activity-log.md`.
- **Verification:** `rg "Power Pages" docs --glob "!legacy/**"` confirmed active docs only cite portal workflows as historical context; spot-checked relocated files via `Get-Content docs/legacy/README.md` to ensure blurbs render.
- **Follow-Up:** Coordinate with CX (Agent A01) on summarising any remaining `legacy-reference/**` snippets that static teams rely on; monitor future governance edits for unintended portal workflow reintroductions.

### Agent A08 - Data Contracts Steward (WS-05/WS-06)
- **Scope:** Authored field-level dashboard and wizard contracts so delivery teams can bind mock data without schema drift.
- **Key Changes:** `docs/data-contracts/dashboard.md`, `docs/data-contracts/wizard.md`, `docs/operations/delivery-plan.md`.
- **Verification:** `Get-Content -Raw 'assets/data/dashboard-metrics.mock.json' | ConvertFrom-Json` and the matching wizard command executed in PowerShell to validate payload shape; cross-checked KPI and risk semantics against `C:\Projects\RCSA_Demp_V6\frontend-examples\dashboard\dashboard.html`.
- **Follow-Up:** Align severity/status badge tokens with WS-03 owners and establish schema linting to enforce cross-file ID relationships.

### Agent A07 - Home Page Specialist (WS-04)
- **Scope:** Replaced the home shell placeholder with the hero narrative, ROI projections, and executive CTA experiences powered by mock data.
- **Key Changes:** `src/pages/home/index.html`, `src/scripts/home.js`, `src/scripts/data/home-data.js`, `src/styles/overrides.css`, `docs/operations/delivery-plan.md`.
- **Verification:** `python -m http.server 8000 --bind 127.0.0.1` (via `Start-Process`/`Invoke-WebRequest`) responded `200` for `/src/pages/home/`; manual keyboard focus order + reduced-motion check on hero, contrast spot-check on KPI badges.
- **Follow-Up:** Partner with CX for copy tone validation and schedule formal accessibility review under WS-07 once dashboard/wizard content lands.

### Agent A05 - Token Styles Compiler (WS-03)
- **Scope:** Generated offline-friendly typography token stylesheet and wired it into the shared head partial.
- **Key Changes:** `design-system/tokens.css`, `src/partials/head.html`, token usage example in `src/pages/home/index.html`, documentation updates in `design-system/tokens/README.md` and `docs/operations/delivery-plan.md`.
- **Verification:** `tools/local-preview.ps1 -Port 8021` served `/design-system/tokens.css` and `/src/pages/home/` with HTTP 200 responses.
- **Follow-Up:** Encourage downstream pages to replace hard-coded typography values with `.token-text-*` utilities.

## 2025-11-02

### Agent 04 – Governance Steward (WS-01)
- **Scope:** Refreshed README, Definition of Done, and governance cadence to match the static architecture.
- **Key Changes:** `README.md`, `docs/operations/definition-of-done.md`, `docs/operations/delivery-plan.md`, `docs/operations/decision-register.md`, `docs/operations/risk-log.md`, `docs/legacy/README.md`.
- **Verification:** `python -m http.server 8000 --bind 127.0.0.1` launched via automation and returned HTTP 200 at `/`.
- **Follow-Up:** Relocate remaining Power Pages documents into `docs/legacy/` and keep AI agent guide aligned with updated handoff expectations. _Status 2025-11-03:_ Completed by Agent A09 (see entry above).

### Agent A06 – Pattern Library Curator (WS-03/WS-06)
- **Scope:** Extracted legacy markup into static-ready snippets for Home and Wizard experiences.
- **Key Changes:** `docs/ux/pattern-library/home-hero.html`, `docs/ux/pattern-library/wizard-step-card.html`, delivery-plan and risk-log references.
- **Verification:** Static HTML validated for token usage and ARIA semantics; no runtime commands required.
- **Follow-Up:** Integrate snippets into `src/pages/home/` and `src/pages/wiz-assessment/` during WS-04/WS-06 implementation and run accessibility sweep post-integration.

### Agent A03 – Design System Shell Engineer (WS-03)
- **Scope:** Delivered reusable page shell, responsive overrides, and accessibility checklist.
- **Key Changes:** `src/layouts/base.html`, `src/pages/**/index.html`, `src/styles/overrides.css`, `assets/js/shell.js`, partial updates, `docs/ux/accessibility-shell-checklist.md`, README/delivery-plan notes.
- **Verification:** `python -m http.server 8000` with manual review at `http://127.0.0.1:8000/src/`; accessibility checklist logged.
- **Follow-Up:** Populate page placeholders per WS-04/05/06 and execute broader accessibility review once content lands.

## 2025-11-01

### Agent A02 – Frontend Shell Lead (WS-02)
- **Scope:** Established partial-based architecture, scaffolded page directories, and added preview tooling.
- **Key Changes:** `docs/operations/static-architecture-decision.md`, `src/pages/**`, `src/partials/**`, `src/scripts/partial-loader.js`, `src/styles/overrides.css` (initial), `tools/local-preview.ps1`, `tools/local-preview.sh`.
- **Verification:** `tools/local-preview.ps1 -Port 8765` served `/src/pages/home/` with HTTP 200 response.
- **Follow-Up:** Hand off to WS-03/04 and ensure future updates honour the documented structure.

### Agent A01 – CX/UX Director (WS-03/WS-04/WS-06/WS-07)
- **Scope:** Completed experience audit, defined pillars, imported typography tokens, and published DoD/QA expectations.
- **Key Changes:** `docs/ux/cx-director-audit.md`, `design-system/tokens/typography.json`, `design-system/tokens/README.md`, `docs/operations/delivery-plan.md`, `docs/operations/risk-log.md`, `docs/operations/decision-register.md`, `docs/operations/definition-of-done.md`.
- **Verification:** Manual review of imported tokens and governance artifacts; no runtime commands required.
- **Follow-Up:** Support WS-03 token bundling (now complete via A05) and ensure DoD remains aligned with evolving experience guidance.

## 2026-11-14 — Full workflow implementation

Implemented the evidence-first static demo: both work perspectives; complete inherent/control/residual assessment; source dialogs and provisional dependency interpretation; owner attestation; reviewer challenge and owner revision; reviewer conclusion; immutable versions; leadership reporting and presenter controls. Extended visual references before implementation and documented the active design system and fixture contract.

Independent UX review prompted fixes for supporting-risk confirmations, required revision closure evidence, immutable version/history access, dismissed/qualified dependency propagation, report-confirmation invalidation and elevated supporting-risk response plans. All were addressed before handoff.

Verification: `python -m http.server 8000 --bind 127.0.0.1`, `http://127.0.0.1:8000/src/`; `node tools/verify-demo.mjs` and `node tools/verify-browser.cjs` pass. The in-app browser verified the human-owned story; Chrome regression saved final desktop/tablet/mobile evidence. Mobile overflow was reproduced and fixed at its grid/table containment source. [QA report](../ux/qa-report.md) and [presentation runbook](demo-runbook.md) contain the evidence. No live services or production resources were provisioned. Implementation remains local; no push, deployment or GitHub issue closure is claimed.

## 2026-11-14 — Product refinement from owner feedback

Replaced the opening work screen with a complete operational dashboard, corrected the one-assessment/three-risk grain, and added a colored risk map, prominent source-grounded AI briefing, filtered work queue and risk register. Built native control/source networks, library/proposed mappings, rationale editing, atomic replacement/removal and a responsive stacked mobile view. Added explicit response creation and response/action separation with pending acceptance requests. Removed sample/demo wording from the banking workspace; presentation context is collapsed separately.

Expert agents contributed dashboard and control UX/modules and independent checks. Review caught and resolved last-confirmed-rating preservation, atomic proposal creation, unrelated manual-control evidence and strategy-specific response wording. Three model/browser scripts cover the new behavior. Revised concept prompts/references, rendered evidence, data contract and runbook are retained locally. No services or real AI were added.

## 2026-11-14 — Eight persona findings remediated and independently rechecked

Separated new mapping applicability from scoped library results; preserved human closure evidence during reply drafting; retained exact returned-review rationale; bounded AI topic wording; fixed assessment ownership labels; named report scope and explicit drill-through; added a concrete decision brief; fixed narrow report containment. The executive repeat review found a residual draft/pending acceptance inconsistency, which was corrected through shared status wording and independently rechecked.

All five model/render scripts and the expanded browser regression pass, including Reports at 1600/834/390 and actual acceptance attestation/submission. The three original bank-leader persona agents did not implement fixes and separately reviewed fresh Chrome sessions. Their current verdicts are Ready for the scripted leadership demo; eight original findings are verified fixed. Runtime fingerprints for 21 files were unchanged during final focused rechecks. [Round-2 closure record](../ux/persona-qa/round-2/README.md). No external services, deployment, commit or issue closure was added.

## 2026-11-14 — Broader AI capability review and roadmap revision

Revisited the archived V3 control suggestions, gap/effectiveness analysis, rating assistance and response/action generation against the current working modules. An independent reviewer challenged the initial treatment of control assistance as a modest presentation change. Revised the [comparison](../../output/v3-review-2026-11-14/review.md) to distinguish manual outcome recording from AI recommendation/design and to make connected control assistance the first phase.

Created the [AI capability expansion plan](ai-capability-expansion-plan.md) with phased deliverables, acceptance criteria and local AI-01–08 work items; aligned the workflow plan, backlog and decision D-2026-11-14-10. The original review, browser screenshots and baseline are retained, with supplemental source evidence for the revision. This work changes planning documents only. New capability items remain planned; no application implementation, live services, remote issue updates or new runtime verification are claimed.

## 2026-11-14 — Control assistance phase 1 implemented

Implemented risk-specific existing/enhanced/new-control recommendations, editable operational design fields, durable owner use/dismiss decisions, mapping-dependent gap/effectiveness findings, bounded claim checks and implementation/validation task generation. Plans use the selected edited design, retain native task editors and carry through response creation, review, reports and immutable submission versions. Active stale plans require review or explicit archival detachment; owner response edits and proposed-design drafts survive reopening and reload.

Two implementation agents owned the engine/fixtures/tests and view/CSS. Independent source review identified and rechecked fixes for plan edit synchronization, stale-plan submission and inspection of actual mapped design wording. Ten model/render checks passed. In-app browser replay covered complete owner/second-line challenge/response/review, edited plan evidence, a second risk's design/dismissal/reload, keyboard focus, native-size design comparison and 390-pixel layout/dialog checks. [Verification and screenshots](../ux/ai-control-assistance-qa.md), [data contract](../data-contracts/control-assistance.md).

AI-01–04 are implemented locally; AI-05–08 remain planned. The existing local preview was reused. No live model, paid test resource, deployment, commit or remote issue mutation was introduced.

## 2026-11-14 — Plain-language and navigation review implemented

Reviewed the running app and used independent copy/navigation agents. Replaced abstract task headings, shortened instructions and errors, simplified assessment and AI navigation on mobile, added state-aware assessment resume and direct submission-blocker links, and made evidence inspection return to edited drafts with values/scroll/focus intact. Current-controls disclosures persist per risk. Plans follow the selected recommendation. Draft ratings are explicit; Reports removes a repeated summary and an empty decision column. Source excerpts and governance boundaries remain intact.

Eleven Node verification scripts and module syntax checks passed; relevant report/demo/navigation checks were rerun after the final report change. Desktop and 390-pixel browser checks covered selectors, navigation, direct excerpts, nested Back/Escape, task focus, selected planning, owner review and independent reviewer drafts. No test-tab console warnings/errors were recorded. The original session was preserved/refreshed; the temporary audit tab was closed and viewport reset. [Review, before/after evidence and limits](../ux/plain-language-navigation-review.md). No live AI service, paid resource, deployment, commit or remote update was introduced.

## 2026-11-15 — Publish the current demo to GitHub

Owner requested that the current version be committed and fully updated on GitHub. Release scope includes the complete active app, synthetic fixtures, verification tools, documentation, design references and linked browser-review evidence. Added repository ignore rules for local caches, credentials and one-off editing helpers. Refreshed README and delivery status to reflect the current automatic-sync experience.

All twelve current Node verification scripts pass, including automatic review-triggered sync, retry/conflict recovery, role/version guards and the existing assessment regressions. Latest browser and visual verification remains linked in output/automatic-grc-sync-2026-11-14/verification.md. The GitHub commit and pull-request history records publication; historical backlog issue reconciliation and hosting deployment remain separate.
