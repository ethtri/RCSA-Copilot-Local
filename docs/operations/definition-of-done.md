# Static Demo Definition of Done
**Version:** 2025-11-02  
**Maintainer:** Agent 04 (Governance) in partnership with Agent A01 (Experience) and Agent A02 (Preview & Shell)

## Current experience acceptance as of November 14 2026

The [finalized workflow demo plan](workflow-demo-plan.md) and its acceptance criteria govern the new experience. Historical home/ROI parity, fixed visual effects, and earlier wizard prescriptions below apply only where consistent with that plan. Useful shared styles and components should be reused and verified.

- [x] Every sample risk includes human-confirmed inherent likelihood/impact/rationale, control design and operating evidence, and current residual likelihood/impact/rationale.
- [x] Evidence applicability and the shared contact-record dependency are explained in the main walkthrough and validated by the owner.
- [x] First-line attestation, second-line challenge, first-line revision, and the reviewer's conclusion are inspectable on the same record.
- [x] AI suggestions have sources and limits; a human use/edit/dismiss interaction is demonstrated.
- [x] Current residual risk, action status, review completion, and risk acceptance stay distinct throughout dashboards and reports.
- [x] All core interactions and presenter reset work with local synthetic fixtures; no live model or service is required.
- [x] Scores, counts, source dates, state changes, and report narratives reconcile.
- [x] The selected visual concept is verified in-browser, including keyboard/touch access to details, contrast, reduced motion, and responsive layouts.

Verification evidence: [QA report](../ux/qa-report.md). The current shared system in `src/styles/demo.css` supersedes historical mandatory CSS imports; see decision D-2026-11-14-05. This is a presentation demo, not a production system or accessibility certification.

Verification evidence: [QA report](../ux/qa-report.md). The current shared system in `src/styles/demo.css` supersedes historical mandatory CSS imports; see decision D-2026-11-14-05. This is a presentation demo, not a production system or accessibility certification.

## Historical acceptance reference

## Global Static Acceptance
- [ ] Page or component imports [`design-system/rcsa-styles.css`](../../design-system/rcsa-styles.css) via the shared head partial and only extends styles using documented tokens from [`design-system/tokens/`](../../design-system/tokens/README.md).
- [ ] Copy, spacing, and motion respect the CX pillars in [`docs/ux/cx-director-audit.md`](../ux/cx-director-audit.md); any deviations note rationale in the PR or handoff.
- [ ] Responsive behaviour verified at 1200px, 768px, and 480px widths without horizontal scroll or clipped content.
- [ ] Accessibility spot-check covers keyboard focus order, semantic headings, colour contrast, and `prefers-reduced-motion` fallbacks; issues logged for WS-07 follow-up if unresolved.
- [ ] Data-driven UI reads from [`assets/data/`](../../assets/data) (or newly added contract files documented in `docs/data-contracts/`) rather than inline literals.
- [ ] Local preview command (`python -m http.server` or `tools/local-preview.*`) executed; record command + URL in verification notes.
- [ ] Progress, findings, verification, and open questions recorded in [`docs/operations/agent-activity-log.md`](agent-activity-log.md) and cross-referenced in the applicable governance artifacts.

## Workstream Add-ons
### WS-03 â€“ Design System Integration
- [ ] Shared partials expose required imports/tokens and document updates in [`design-system/DESIGN_SYSTEM_INDEX.md`](../../design-system/DESIGN_SYSTEM_INDEX.md).
- [ ] Changes to component usage or utilities are echoed in `docs/ux/` references and, if legacy context is needed, linked through `docs/legacy/`.

### WS-04 â€“ Home Page Rebuild
- [ ] Hero, ROI, and CTA modules align with the content map in [`docs/ux/cx-director-audit.md`](../ux/cx-director-audit.md) and pull metrics from `assets/data/roi-calculator.mock.json`.
- [ ] Motion values honour the reduced-motion guardrails while matching approved timing tables in `design-system/tokens/motion.json` (or documented successor).

### WS-06 â€“ Wizard Experience
- [ ] Stepper flow follows the interaction design in [`docs/ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md`](../ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md).
- [ ] Insight cards bind to `assets/data/wizard-insights.mock.json` (or documented successor) with accessible summaries for screen readers.
- [ ] Keyboard navigation supports forward/back actions without trapping focus in hidden panels.

### WS-07 â€“ QA & Accessibility
- [ ] Manual axe-core (CLI or browser) or equivalent accessibility scan executed; findings logged in `docs/ux/qa-report.md`.
- [ ] Responsive screenshots (desktop/tablet/mobile) stored in `assets/screenshots/` with filenames that match the page under test.

## Governance Handoff
- [ ] Update `docs/operations/delivery-plan.md` workstream notes and cadence if scope or responsibilities shift.
- [ ] Revisit `docs/operations/risk-log.md` for any new exposures; close R-02/R-04 items when mitigation evidence is committed.
- [ ] Log documentation or workflow changes in `docs/operations/decision-register.md`.
- [ ] Surface Power Pages legacy references through labelled entries in `docs/legacy/` (context-only) so static instructions remain primary.
