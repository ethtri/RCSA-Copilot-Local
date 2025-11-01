# CX/UX Director Audit – Offline RCSA Copilot Demo
**Date:** 2025-11-01  
**Author:** Agent A01 – CX/UX Director

## Scope & Inputs Reviewed
- `docs/operations/delivery-plan.md` (v2025-10-31) – milestone & workstream guardrails.
- `docs/operations/risk-log.md`, `docs/operations/decision-register.md` – governance baselines.
- `design-system/rcsa-styles.css` (1,081 lines) – primary styling surface; no companion tokens committed.
- `docs/ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md`, `docs/legacy/power-pages-css-consistency-best-practices.md`, `docs/legacy/power-pages-holistic-css-solution.md`, `bootstrap-manifest.md`, `BUSINESS_CONTEXT_GUIDE.md`.
- Mock payloads under `assets/data/*.json` – dashboard KPIs, ROI module content, wizard flow metadata.
- Legacy comparison references: `C:\Projects\RCSA_Demp_V6\design-system\tokens`, `C:\Projects\RCSA_Demp_V6\powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/...`, `C:\Projects\RCSA_Demp_V6\powerpages/.../home/...`, `C:\Projects\RCSA_Demp_V6\live_dashboard.html` (used for layout/motion expectations).

## Governance Alignment Assessment
- Delivery plan captures high-level UX intent but WS-03/WS-04 lack explicit checkpoints for design-system compliance, accessibility validation, and legacy parity sign-off. Introduce UX acceptance criteria and reference this audit to close the gap.
- Risk log R-02 (design-system drift) is accurate but mitigation does not yet enforce artifact-level checks (no token audit, no linting instructions). Extend mitigation to require static repo import verification plus CSS diff reviews before coding starts.
- Decision register reiterates design-system usage but no decision documents how static build replaces portal-native interactions (e.g., hero motion, wizard transitions). Introduce a follow-up decision once experience pillars are ratified.

## Asset Inventory & Gap Analysis
**Design System**
- `design-system/rcsa-styles.css` retains full legacy utility stack (grid, cards, wizard fixes) and is ready for reuse.
- Update: `design-system/tokens/typography.json` now mirrors the legacy typography token set with usage guidance in `design-system/tokens/README.md`; future tokens should follow the same import pattern (P0 complete).
- Gap: Wizard analysis doc references CSS variables (`--captech-border`, `--captech-success`) absent in current stylesheet. Require either token addition or documentation update before implementation begins (P0 for clarification).

**UX Documentation**
- `docs/ux/bootstrap-manifest.md` still points to `src/pages/**` workbenches that do not exist locally. Need updated site map for static delivery (P1).
- `ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md` offers pane standards but assumes dynamic Power Pages interactions; convert critical guidance into static-ready component specs (P1).
- Missing consolidated visual QA checklist in this repo; legacy `C:\Projects\RCSA_Demp_V6\HEADER_OPTIMIZATION_SUMMARY.md` captures expected header spacing and hover states—should be summarized for WS-03 (P2).

**Mock Data**
- `assets/data/dashboard-metrics.mock.json` and `wizard-insights.mock.json` align with V6 narrative, but there is no documented mapping between these payloads and planned UI modules. Create data contract snippets within layout specs (P1).
- ROI calculator payload (`assets/data/roi-calculator.mock.json`) exists yet delivery plan lacks workstream coverage—flag dependency for home page storytelling (P1).

**Legacy Pull Required**
- High-fidelity wizard pane markup remains only in `C:\Projects\RCSA_Demp_V6\powerpages/.../wizAssessment.en-US.webpage.copy.html`. Need curated snippets to guide shell build without reintroducing portal baggage (P0).
- Animated hero gradients and CTA motion are defined in `C:\Projects\RCSA_Demp_V6\refresh.css` and `live-dashboard.html`. Extract animation timing tokens to inform static CSS transitions (P1).

## Experience Pillars for Static Delivery
### Visual Language
- Preserve CapTech amber/charcoal palette, rounded card geometry, and frosted glass callouts from `design-system/rcsa-styles.css`; no net-new colors until token parity is restored.
- Reinstate layered depth using existing shadow tokens (`--fcb-shadow-md`, `--fcb-shadow-lg`) and gradient separators highlighted in legacy risk cards for premium finish.
- Mandate responsive typography scaling built on imported tokens (base, lg, 2xl) to avoid viewport jumps in static hosting.

### Motion & Interaction
- Replace portal-native page fades with CSS transition utilities: 200–300ms ease-in-out for card hover, 400ms slide for wizard step changes (mirrors legacy `refresh.css` feel without JS frameworks).
- Use `prefers-reduced-motion` media queries to disable step animations, aligning with accessibility expectations.
- Implement keyboard-focus-visible outlines consistent with `rcsa-styles.css` accent color to retain enterprise polish.

### Content Tone & Narrative
- Keep first-line messaging anchored to AI enablement metrics (95% accuracy, 82% time savings) surfaced in wizard analysis doc; ensure callouts reference current mock data values.
- Maintain concise, directive microcopy (“Schedule Session”, “View Assessment”) matching CTA language in `dashboard-metrics.mock.json`.
- Bundle executive narrative with quantifiable ROI (leveraging `roi-calculator.mock.json`) to reinforce banking credibility at first glance.

## Accessibility & Responsiveness Guardrails
- Enforce 4.5:1 contrast for body text and 3:1 for large headers; validate once tokens imported.
- Ensure tab order mirrors logical reading patterns per wizard steps; static build must replicate existing ARIA labelling from Power Pages exports.
- Provide mobile-first breakpoints: 1200px container max width from stylesheet, but add 768px and 480px adjustments to avoid hero truncation.
- Document requirement for screen-reader friendly summaries atop charts, using data summaries extracted from `dashboard-metrics.mock.json`.

## Downstream Workstream Guidance
- **WS-02 Architecture & Tooling:** Scaffold `public/` with shared `partials/header.html` and `partials/footer.html`; load `design-system/rcsa-styles.css` + future `/design-system/tokens.css` via single entry to prevent drift. Add JSON data loader script per page with local caching disabled (static fetch).
- **WS-03 Design System Integration:** Before implementing, restore token file, document required imports in `README` and add lint checklist ensuring no ad-hoc color definitions. Produce component reference for wizard cards (structure, spacing) in `docs/ux/`.
- **WS-04 Home Page Rebuild:** Align hero layout to legacy CTA stack (reference `C:\Projects\RCSA_Demp_V6\powerpages/.../Home.en-US.webpage.copy.html`); map KPI tiles to `dashboard-metrics.mock.json` summary metrics; integrate ROI snippet referencing `assets/data/roi-calculator.mock.json`.
- **WS-06 Wizard Experience:** Translate pane standards into static stepper; require breadcrumb + progress indicator matching V6 markup; reuse AI insight copy from mock data with tone edits for static callouts.
- **WS-07 QA & Accessibility:** Build manual checklist referencing this audit plus `docs/legacy/power-pages-css-consistency-best-practices.md`; schedule axe-core manual run during M4 with results stored in `docs/ux/qa-report.md`.

## Stakeholder Summary (Shareable)
- Experience pillars defined for visual, motion, and tone-await PM confirmation so WS-02/03 can execute without Power Pages dependencies.
- Immediate blockers: missing design tokens (`design-system/tokens/`), undocumented mock data mapping, and lack of curated legacy snippets for wizard/home shells.
- Need PM approval to log new decision covering static interaction model and to assign owners for WS-03/WS-04 UX checkpoints this week.
- Definition of Done / QA checklist available in `docs/operations/definition-of-done.md`; downstream teams must reference before opening PRs.
