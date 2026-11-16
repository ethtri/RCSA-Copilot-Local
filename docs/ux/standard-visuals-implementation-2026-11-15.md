# Standard product visuals: implementation and verification

**Date:** November 15, 2026  
**Status:** Implemented and verified locally.  
**Serving revision:** `20261115.11`  
**Source/tools fingerprint:** `9800f11c6b31f0b388e6b08db7cf09d8a1b3904ef782d2389810ba92880e74d0`

This delivers the [corrected permanent-visual review](visual-opportunities-review-2026-11-15.md). It extends fixed product components within the existing design system. No bespoke AI-suggestion graphics, generated illustrations, model calls or new AI behavior were added. The existing local synthetic-data boundaries and record/version rules remain in force.

The exact hashes are in [revision.json](../../output/standard-visuals-2026-11-15/revision.json). These are working-tree changes, not a commit or published release. Earlier review/verification fingerprints describe their own revisions.

## Delivered coverage

| Reviewed area | Implementation | Verification |
| --- | --- | --- |
| Risk palette | `ui.js` defines canonical risk-band ink/fill/border values. `BADGE_CSS` is installed once by the app and embedded unchanged in standalone reports. Moderate is amber in badges and charts; workflow statuses have separate tokens. | Boundary/contrast checks, screen badges, heatmap and report/export inspection |
| Icons/statuses | Approved SVG icon family, neutral help fallback, explicit display-status aliases, `statusBadge()`. Correct Add/Sync/Download/Print/empty glyphs; confirmed stage checks derive from central requirements, never visits. | Product-visual checks and root integration test; keyboard/role browser checks |
| Heatmap | Square geometry, readable axes, native grouped-position chooser, canonical active risks and unambiguous R4 singleton labels. An unassessed risk is not plotted. | Collision tests with three members, unassessed cases, native Enter → chooser → correct risk destination with modal closed |
| Reports/tables | One `REPORT_CSS` template and canonical badge CSS for screen, standalone HTML and print. Document metadata, rating/status cells, captions, spacing, repeating print headers and source headings are consistent. | Report/record regressions; actual HTML download opened in browser; screen section headings measured 22px Segoe UI, matching the shared template |
| Rating/history | Reusable before-controls/prior/current record comparison, L/I and confirmation labels; history has direct labels, distinct marker/line styles, dashed draft segments and gaps for missing ratings. | Assessment-visual regressions and current draft-history/review captures; no percentage risk-reduction claim |
| Control relationships | Full-width expandable native map, complete labels, working control/source buttons and phone reflow. Submitted view uses frozen controls, custom definitions, source scope and explicit source version. | Long-name/no-mapping/frozen-fixture regressions; actual control inspection/source drawer; focus lands on the selected inspector summary |
| Progress/delivery | Fixed action/management progress with recorded dates and next role; separate GRC connection, assessment acknowledgement and operational acknowledgement rows. | Browser evidence submit → return → resubmit → assurance closure; management submit → approve; tests cover expiry, inactive records and separate delivery failures |
| Standard states | Shared `emptyState()`/`loadingState()`, neutral empty filters with recovery, accessible headings/announcements, technical errors under Details, role-correct read-only assessment destination. | Actual empty-filter recovery and deliberate fixture-503 startup failure; helper escaping/semantics tests; no raw exception in ordinary error prose |

Primary files are `ui.js`, `visuals.js`, `assessment-context.js`, `controls.js`, `reports.js`, `operations.js`, `grc-view.js`, root `app.js`/`dashboard.js`/`assessment.js`, and the new `product-visuals.css`, `record-visuals.css`, `report-visuals.css`. The repository retains native ES modules and static HTML/CSS; no new runtime dependency or hosted service is required.

## Automated checks

All **20** `tools/verify-*.mjs` scripts passed, along with ES-module syntax checks for every application module. [Full output](../../output/standard-visuals-2026-11-15/checks.txt) is retained.

Four focused checks were added:

- `verify-product-visuals.mjs`: exact risk bands, icon fallback, known status aliases, escaping, heading/announcement semantics, reduced motion and badge contrast.
- `verify-assessment-visuals.mjs`: coincident/unassessed heatmap risks, square coordinates, history gaps/drafts, complete control labels, canonical active-risk counts and frozen submitted definitions/sources.
- `verify-record-visuals.mjs`: actual progress dates/roles, return/resubmit behavior, expiry/inactive work, independent acknowledgements, report style parity, self-contained immutable editions and archived-link guards.
- `verify-standard-integration.mjs`: role labels/read-only destinations, confirmation-based stage markers and neutral actionable empty filters.

An old buyer-readiness assertion expected the former combined GRC sentence. It now verifies the exact assessment acknowledgement/version/request/bank version and a separately acknowledged operational update, preserving the original frozen submission and acknowledgement. This strengthens the delivery distinction rather than dropping the guard.

Calculated text-to-fill contrast is 6.86:1 Low, 5.77:1 Moderate, 4.81:1 Elevated and 4.90:1 High. Work-status pairs range from 6.50:1 to 8.24:1. This validates the shared badge token pairs, not every color combination or formal accessibility conformance.

## Browser evidence

Root used a separate in-app browser tab with synthetic records, leaving the user's original draft intact.

- [Dashboard/heatmap](../../output/standard-visuals-2026-11-15/dashboard.png) and [group chooser](../../output/standard-visuals-2026-11-15/heatmap-chooser.png).
- [Control map](../../output/standard-visuals-2026-11-15/control-map.png), [phone map](../../output/standard-visuals-2026-11-15/control-map-mobile.png), [history](../../output/standard-visuals-2026-11-15/history.png) and [record comparison](../../output/standard-visuals-2026-11-15/review-comparison.png).
- [Shared report](../../output/standard-visuals-2026-11-15/report.png), [phone report](../../output/standard-visuals-2026-11-15/report-mobile.png), and [actual downloaded standalone report](../../output/standard-visuals-2026-11-15/downloaded-report.html).
- [Closed action](../../output/standard-visuals-2026-11-15/action-closed.png), [phone action](../../output/standard-visuals-2026-11-15/action-mobile.png), [GRC rows](../../output/standard-visuals-2026-11-15/integrations.png) and [phone GRC](../../output/standard-visuals-2026-11-15/integrations-mobile.png).
- [Neutral empty filter](../../output/standard-visuals-2026-11-15/empty-filter.png) and [actual startup error](../../output/standard-visuals-2026-11-15/error.png).

Observed interactions include keyboard Enter opening the grouped heatmap chooser; selection navigating to the correct risk and closing the chooser; native control nodes opening the correct inspector with focus; source buttons opening the proper drawer; empty-filter Show all work restoring the queue; and recorded action/decision events advancing only their own statuses. Assurance closure left the assessment's Elevated 12 unchanged. The final active preview logged no application console errors.

The real report download identified assessment version 1 with action v5 and decision v3. It was copied from Downloads and opened as a standalone document. Shared CSS is embedded, with no external stylesheet dependency; print table headers use `table-header-group`.

Controls document client/scroll widths matched at CSS widths 390 (375/375), 640 (625/625), 768 (753/753), 1024 (1009/1009) and 1440 (1425/1425). [Intermediate measurements](../../output/standard-visuals-2026-11-15/responsive.json) are retained. Report, action and GRC also measured 375/375 at CSS width 390. Dense chart markers are 30px targets with no overlapping hit extensions; the accompanying named risk list provides larger targets for the same destinations. The phone heatmap's adjacent marker centers were about 41px apart.

Before/after screenshots can show different seeded workflow states: the final preview is reviewed v1 with completed action/approved request, while the initial dashboard was a fresh draft. Those data changes came from QA interactions, not from visual components recalculating or lowering risk.

## Visual comparison and independent review

The accepted [Controls](concepts/2026-11-15/controls-reference.png) and [report](concepts/2026-11-15/report-reference.png) references and new renders were opened through `view_image`. The existing assessment reference remains part of the design-system baseline. The requested component changes are intentional refinements, not a pixel-identical copy of illustrative concept data.

| Comparison point | Result / intentional adaptation |
| --- | --- |
| Palette | Forest app actions and pale surfaces retained; semantic risk bands now match across maps, labels and exports |
| Typography | Existing serif page titles retained; operational content stays Segoe UI/system sans. Report section headings are explicitly 22px sans on screen and export |
| Spacing/surfaces | Existing modest radii, thin boundaries and readable spacing retained; progress and diagrams use fixed shared anatomy |
| Icons | The existing lightweight SVG family extended with explicit semantic glyphs; document icons no longer stand for unrelated Add/Sync states |
| Layout | Control relationships expand below the two-column work area, preserving readable names instead of scaling a large SVG into a narrow column |
| Record copy/data | Actual source titles, scores, roles, dates and version boundaries prevail over illustrative concept values; no fabricated attachments or operating credit |
| Responsive behavior | Standard components reflow to vertical lists; tables use contained scrolling and charts retain text equivalents |

The shared visual language was verified against the accepted references; the new permanent-component behavior was verified against the corrected review. This is not a claim of pixel identity to fictional concept data or blanket agency/WCAG certification.

Three contributors implemented bounded areas and reviewed other scopes. Their cross-scope findings were resolved: archived risk-detail links no longer open newer active work; submitted control maps no longer use later fixture/custom definitions; assurance/management/admin perspectives are labeled correctly and do not see enabled reviewer-decision forms. Browser QA also corrected the floating GRC header overlap and inspector-focus issue.

## Verification limits and cleanup

The native OS print dialog, physical touch devices, screen-reader behavior, actual 200% browser zoom and OS-level reduced-motion emulation were not manually completed. Print/source rules, announcements, focus, narrow reflow, token contrast and reduced-motion CSS were checked as described. No artificial task-completion percentage was added because the task arrays do not record reliable completion events.

The startup failure was exercised with an owned local server returning HTTP 503 for one fixture. Its exact process identity was checked, the server stopped, port 8001 confirmed closed and the disposable helper removed. Temporary export/failure/history browser tabs were closed and the viewport override reset. The port-8000 user-facing preview is intentionally retained, showing the updated dashboard; the user's earlier tab/draft was preserved. No paid environment, production data, external message or deployment was created.
