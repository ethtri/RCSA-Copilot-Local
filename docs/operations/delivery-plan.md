# RCSA Demo Local Delivery Plan (v2025-10-31)

**Mission:** Recreate the Power Pages RCSA Copilot experience as an offline, static demo served from this repository while preserving the polished UX/CX expected by banking stakeholders.

**Current Context:** Repository scaffolded with design-system assets and mock data. No page markup or run scripts committed yet. Delivery is coordinated entirely through local tooling (`python -m http.server` or equivalent) with no dependency on Power Platform services.

## 1. Guiding Constraints
- Reuse `design-system/rcsa-styles.css` and token definitions on every new UI surface.
- Keep assets organized under `assets/` (media, data) and page implementations under `src/` (to be introduced) or `public/` if a build step is unnecessary.
- Operate offline: all interactions must render using static HTML/JS with mock data stored in `assets/data/**`.
- Maintain accessibility, responsiveness, and content parity with the prior Power Pages demo.
- Document all changes in repo-friendly artifacts (docs/, design-system/) and avoid introducing frameworks that exceed static hosting needs.

## 2. Milestones & Target Cadence
| Milestone | Target Date* | Notes |
| --- | --- | --- |
| M1 – Project Foundations | 2025-11-03 | Repo hygiene confirmed, delivery plan & governance artifacts published (this document, risk log, decision register, prompt guide). |
| M2 – Static Shell & Build Scripts | 2025-11-05 | Create `public/` or `src/` structure, shared header/footer partials, local preview script, Designer QA checklist. |
| M3 – Page Parity (Home, Dashboard, WizAssessment) | 2025-11-12 | Port markup with mock data wiring, ensure design-system compliance, capture screenshots/demo script. |
| M4 – QA & Documentation Lock | 2025-11-15 | Accessibility pass, responsive checks, finalized walkthrough guide and runbook. |

\*Dates assume work begins immediately after this update; adjust as velocity data becomes available.

## 3. Workstream Tracker
| ID | Workstream | Description | Owner | Status | Target | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| WS-01 | Governance & Docs | Maintain delivery plan, risk log, decision register; align README/runbook with current scope. | RCSA Demo PM | In Progress | M1 | Risk & decision artifacts created 2025-10-31; README + DoD published 2025-11-02; doc cadence and archival recs below. |
| WS-02 | Architecture & Tooling | Define static site structure, choose build vs. vanilla HTML, establish local preview command. | Agent A02 (Frontend Shell Lead) | Complete | M2 | `src/` partial architecture and preview scripts delivered 2025-10-31 (`docs/operations/static-architecture-decision.md`); handed off to WS-03/WS-04. |
| WS-03 | Design System Integration | Document how pages must import `design-system/rcsa-styles.css` and tokens; create starter layout. | Agent A01 (CX/UX Director) & Agent A03 (Design Shell) | In Progress | M2 | Needs collaboration with frontend agent.<br>[2025-11-01, Agent A03] Base shell delivered (`src/layouts/base.html`) with responsive grid, nav toggle, and token-backed overrides.<br>[2025-11-01, Agent A03] README + WS-03 notes now describe consumption workflow and verification steps.<br>[2025-11-01, Agent A01] Apply pillars from `docs/ux/cx-director-audit.md`; restore `design-system/tokens/` before build.<br>[2025-11-02, Agent A06] Legacy hero and wizard examples distilled into `docs/ux/pattern-library/home-hero.html` and `docs/ux/pattern-library/wizard-step-card.html` for design-system compliant reuse.<br>[2025-11-03, Agent A05] Added `/design-system/tokens.css` export, updated head partial import, and documented usage snippet for WS-03 consumers. |
| WS-04 | Home Page Rebuild | Recreate hero, ROI modules, CTA flows using mock data. | Agent A07 (Home Page Specialist) | In Progress | M3 | Depends on WS-02/03.<br>[2025-11-01, Agent A01] Align hero/CTA to legacy references noted in `docs/ux/cx-director-audit.md`; map copy to `assets/data/roi-calculator.mock.json`.<br>[2025-11-01, Agent A01] Pull animation timing tokens from `C:\Projects\RCSA_Demp_V6\refresh.css` for static CSS transitions.<br>[2025-11-03, Agent A07] Implemented design-system hero, ROI projections, and CTA modules using mock data bindings; pending CX validation. |
| WS-05 | Dashboard Page Rebuild | Implement dashboard cards and metrics referencing `assets/data/dashboard-metrics.mock.json`. | To Assign | Not Started | M3 | [2025-11-03, Agent A08] Field contract published in `docs/data-contracts/dashboard.md`; align KPI and alert bindings with WS-03 token guidance. |
| WS-06 | Wizard Experience | Build `wizAssessment` flow with progressive disclosure and automation insights. | To Assign | Not Started | M3 | Requires mock insight data wiring (`assets/data/wizard-insights.mock.json`).<br>[2025-11-02, Agent A06] Reference `docs/ux/pattern-library/wizard-step-card.html` for static pane structure, ARIA mapping, and progress indicator styling.<br>[2025-11-03, Agent A08] Field contract available in `docs/data-contracts/wizard.md` (note selection-state gap for exports). |
| WS-07 | QA & Accessibility | Run responsive, accessibility, and browser sanity checks; document results in `docs/ux/qa-report.md`. | To Assign | Not Started | M4 | Blocked until WS-04 – WS-06 complete. |
| WS-08 | Demo Packaging | Update demo script, screenshots, and local run instructions; verify `python -m http.server` path. | RCSA Demo PM | Not Started | M4 | Collect evidence from WS-04 – WS-07. |

## 4. Dependencies & Assumptions
- Mock data files in `assets/data/*.json` remain the single source of truth; agents must update documentation if structure changes.
- Design tokens under `design-system/tokens/` should drive any new color/spacing decisions-no ad-hoc styling.
- Automation-preferred: linting/format scripts should be lightweight (e.g., npm script for formatting) and justified before adoption.
- No external API calls; use fetch against local JSON or inline data modules only.

### WS-02 Notes (2025-10-31)
- Architecture Decision: Adopt a `src/`-rooted static site with shared partials and scripts (`docs/operations/static-architecture-decision.md`).
- Directory Scaffold: `src/pages/{home,dashboard,wiz-assessment}/index.html`, `src/partials/{head,header,footer,global-scripts}.html`, `src/scripts/partial-loader.js`, `src/styles/overrides.css`.
- Preview Workflow: Serve repo root via `python -m http.server 8000`; default entry point `http://localhost:8000/src/pages/home/` with cross-platform wrappers to be used by downstream agents (`tools/local-preview.ps1` / `.sh`).
- Design System Touchpoints: All pages import `../../design-system/rcsa-styles.css` before local overrides; WS-03 to extend `src/partials/head.html` with token guidance.
- Dependencies: WS-04/05/06 build on the scaffolded pages; QA (WS-07) can piggyback on the preview script for accessibility sweeps; README/runbook updates captured under WS-08 once scripts land.

### WS-03 Notes (2025-11-01)
- **Base layout:** `src/layouts/base.html` is the canonical scaffold. Copy it when building new surfaces so the skip link, `rcsa-shell__grid`, and landmark structure remain intact.
- **Shared partials & scripts:** Every page must keep the head/header/footer/global script partials plus the `partial-loader.js` module. The global partial now loads `assets/js/shell.js`, which manages the mobile nav toggle, active-link state, and footer year.
- **Design tokens:** Layout spacing, cards, and badges pull exclusively from `design-system/rcsa-styles.css` tokens via `src/styles/overrides.css`. Avoid inline styles—extend the overrides file instead.
- **Responsive behaviour:** The shell collapses to a single column at <=1024px; set `data-shell-aside="hidden"` or remove the `<aside>` if a page does not need a secondary rail.
- **Verification:** Preview via `python -m http.server 8000` and load `/src/` to confirm header/footer render, skip link focus works from the keyboard, and the nav toggle collapses correctly on tablet widths.
- **Accessibility checklist:** Track focus, landmarks, and responsive nav requirements in `docs/ux/accessibility-shell-checklist.md`; hand off to WS-07 for formal audit.

## 5. Cadence & Reporting
- **Daily Checkpoint:** PM posts progress note (plan updates, blockers, decisions) in `docs/operations/delivery-plan.md` plus risk/decision logs; include any preview command changes.
- **Documentation Cadence:** Review README, Definition of Done, and governance logs every Tuesday and at each milestone exit; log substantive changes in the decision register.
- **Agent Handoffs:** Require filled Definition of Done checklist (kept in sync with `docs/ai/ai-agent-guide.md`) and verification artifacts (screenshots, test logs).
- **Stakeholder Summary:** After each milestone, capture high-level status, key decisions, and outstanding risks in `docs/operations/project_status.md` (to be reintroduced once content exists).

## 6. Immediate Actions (Next Session)
- [x] Keep the `docs/legacy/` index current and annotate README/governance docs whenever additional Power Pages references are archived. *(Completed 2025-11-03 by Agent A09; see `docs/legacy/README.md`.)*
- [x] Produce data-contract mappings for dashboard and wizard payloads under `docs/data-contracts/` so page teams have field-level guidance. *(Completed 2025-11-03 by Agent A08.)*
- [ ] Launch WS-04 implementation (Home hero + ROI modules) using new pattern-library snippets and mock data wiring. *(In progress via Agent A07; awaiting CX tone validation and accessibility sweep.)*
- [ ] Queue WS-05/WS-06 planning prompts that outline data binding, accessibility checks, and screenshot expectations ahead of development.

### WS-01 Notes (2025-11-02)
- Archive Power Pages-heavy guides (`docs/legacy/power-pages-local-deployment-guide.md`, `docs/legacy/power-pages-portal-rebuild-plan.md`, `docs/legacy/power-pages-ai-delegation-guide.md`) into `docs/legacy/` while keeping references in governance docs.

### WS-01 Notes (2025-11-03)
- **Verification:** `rg "Power Pages" docs --glob "!legacy/**"` run post-archive to ensure active governance/docs only reference portal workflows as historical context.
- **Open Question:** Confirm with CX whether additional `legacy-reference/**` snippets require summary artifacts now that portal guides live under `docs/legacy/`.
- Tag documentation updates with the Tuesday + milestone cadence to keep risk R-05 mitigated and surface future preview-command shifts quickly.

Maintain this document as the canonical plan; log revisions in the decision register with timestamp and author.
