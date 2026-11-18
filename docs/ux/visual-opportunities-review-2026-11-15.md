# Standard product visuals: revised UX/CX review

**Date:** November 15, 2026  
**Status:** Implemented and verified locally. See [the implementation record](standard-visuals-implementation-2026-11-15.md) for the delivered components, evidence and limits.  
**Review team:** assessment/standard charts; reports and operational records; visual system/accessibility.

## Corrected scope

This review covers the app's **permanent visual components**: heatmaps, standard rating/history displays, reports and tables, icons, badges, navigation, relationship diagrams, loading/empty/error/completion states, and recurring record-status displays.

A fixed component may update when its underlying records change. Its anatomy, rendering rules, labels and interactions are designed in advance. This review excludes bespoke graphics explaining an AI suggestion, AI-specific evidence timelines, AI proposal-field visualizations and generated pictures. The earlier mixed-scope recommendations are [archived as superseded](visual-opportunities-ai-presentation-superseded-2026-11-15.md), not retained as the active backlog.

## Prioritized findings

| Order | Standard product area | Recommended improvement | Effort |
| --- | --- | --- | --- |
| 1 | Shared visual language | Consistent risk colors, work-status badges, icons and navigation states | Small–medium |
| 2 | Dashboard heatmap | Group overlapping risks, standardize square cells, improve axes/legend/selection | Medium |
| 3 | Reports and registers | One polished screen/download/print template, refined table and rating/status cells | Medium |
| 4 | Assessment comparison/history | One standard rating comparison; clearer history series, drafts and missing values | Medium |
| 5 | Control relationships | Refine the existing map with readable labels, full-width expansion and usable nodes | Medium |
| 6 | Action/decision/integration records | Reusable, record-driven status/progress components | Medium |
| 7 | Standard screen states | Consistent empty, loading, error and completion layouts | Small–medium |

The first implementation batch should address **risk/status/icon consistency and the heatmap defect**, then report/table consistency. These changes affect the everyday product without requiring more charts.

## 1. Shared risk, status and icon system

### Current issues

- Moderate risk is amber in the dashboard and compact matrix, but `.risk-label.moderate` uses the same forest color as Low in `demo.css`. A rating can therefore appear to change meaning between a map and a badge.
- Record states are rendered with different combinations of text, classes and formatting across assessment, operations, reports and GRC.
- `ui.js::icon()` has a coherent lightweight style but only nine glyphs. Unknown names silently fall back to a document. Add a control explicitly uses a document glyph; pending sync also uses the source/document glyph.
- A success check is used for an empty dashboard filter, even though no matching results is not the same thing as completed work.

### Recommended standard

Define shared **ink, fill and border tokens for each risk band**, then use them in the heatmap, matrix, risk badges, comparisons and reports. Keep the work-status vocabulary separate: Draft, Waiting, Evidence submitted, Returned, Closed, Approved, Expired, Failed. Every badge combines a semantic icon with plain text; no color-only state.

Extend the existing icon family with approved Add, Clock/pending, Sync, Warning, Error, Download, Print and Empty-list glyphs. Preserve consistent stroke weight, sizing and optical alignment. Validate icon names so a missing glyph does not become a misleading document. Do not add an icon to every navigation label: use icons where they explain an action or state. Keep the current-page underline distinct from actual completion checks; visiting a step must not mark it complete. Preserve the existing mobile Step X of Y selector.

**Files/data:** [ui.js](../../src/scripts/demo/ui.js), [visuals.js](../../src/scripts/demo/visuals.js), [demo.css](../../src/styles/demo.css), [risk-matrix.css](../../src/styles/risk-matrix.css), [grc-view.js](../../src/scripts/demo/grc-view.js), status labels in operations/reports, and shared tokens in upgrade.css.

## 2. Refine the dashboard heatmap

### Current issues

Payment details and Delayed execution occupy the same confirmed L2/I3 position and visibly overlap. `portfolioHeatmap()` offsets their centers by 18 SVG units while marker diameter is 30. Its 64×56 cells are rectangular, while the compact assessment matrix already uses square cells. Small axis labels and separate geometry rules reduce consistency.

### Recommended standard

Use one **2 risks** count marker at a shared position, with the named risks available in the adjacent selectable list. Selection highlights the associated cell and offers the existing Inspect risk destination. Standardize square geometry, axis direction, band legend and selection styling with the compact matrix. Maintain a complete textual equivalent and keep unassessed risks outside plotted positions with an explicit label.

This is refinement of the existing permanent heatmap, not another portfolio chart. Interactive markers need keyboard access and adequate hit areas; a phone layout should preserve readable labels rather than shrink the entire chart.

**Files/data:** `portfolioHeatmap()`, `riskEntries()`, `currentRating()`, `validRating()`, `ui.js::matrix()`. [Visible collision](../../output/spacing-polish-2026-11-15/dashboard-before.png).

## 3. One report/register visual template

### Current issues

The screen report is coherent, but its downloadable HTML uses a separate embedded `reportCss` with a different font stack, canvas, radii and document treatment. Tables use raw status text and separate risk/work tables, making cross-record scanning harder. The current three/four-risk dataset already fits the table well.

### Recommended standard

Create a fixed document masthead for **assessment, version, review status and as-of date**, and share report type scale, spacing, risk/status styles and source-heading rules across screen, download and print. Keep the self-contained export architecture. Add repeating print table headers and deliberate page breaks so headings and related records stay together.

Refine existing tables with consistent row spacing, tabular score alignment, compact labeled risk/status cells and a stable trailing View action. Where useful, expose actual linked action/decision status in an expandable risk row; do not widen every table beyond its readable layout. Full owners, evidence, conditions and history remain in record detail. Keep the complete register instead of adding a donut or dashboard chart simply to make the report more visual.

**Files/data:** `reports.js::reportContext()`, `reportBody()`, `workRecords()`, `buildReportHtml()`/`reportCss`; selected assessment and `operationalProjection()` joined by riskId. Preserve frozen editions and separate operational as-of context. [Current report](../../output/spacing-polish-2026-11-15/report-after.png), [reviewed report](../../output/experience-upgrade-2026-11-15/report-final.jpg).

## 4. Standard rating comparison and history

### Current issues

The owner review uses long wrapping labels beside three score-length bars. The score/rating display differs across review, rating forms, report detail and `trajectory()`. The existing history chart principally distinguishes series by color; the line to an unconfirmed current point remains solid. Filtering missing points before drawing a polyline can connect across a missing observation.

### Recommended standard

Use one recurring **Before controls / Previous after-controls / Current after-controls** comparison with band, score, likelihood/impact and explicit Confirmed/Draft labels. A compact common scale or band-position markers can support the values. Do not describe score differences as a percentage reduction in risk. New risks display No previous assessment with no invented marker.

Retain the existing history disclosure and exact-values table. Add direct series labels and distinct line/marker styles; use a dashed connection to an unconfirmed current period, and break lines across explicitly missing observations. Missing history remains missing. This is standard assessment-record visualization, separate from an AI proposal editor.

**Files/data:** `assessment-context.js::ownerReviewReport()`, `assessmentHistory()`, `historySeries()`; `visuals.js::trajectory()`; `ui.js::ratingBadge()`; actual source periods, rating-method and confirmation flags. [Current review](../../output/spacing-polish-2026-11-15/review-after.png).

## 5. Refine the existing control relationship map

### Current issues

The existing risk → mapped control → information source diagram is displayed within a half-width work area. A 740–970-unit SVG can become tiny there. `svgLines()` silently limits names to three lines. Diagram nodes are not currently equivalent to the working control-inspector links elsewhere.

### Recommended standard

Offer a full-width expanded relationship view within the standard Controls workspace. Keep full names readable, with distinct risk/control/information-source node types and explicit Current/Proposed labels. Control nodes should open their existing inspector; source nodes should open the source drawer. Preserve a vertical list/diagram equivalent on phones.

Use one clear meaning per connector: a mapped relationship, a proposed relationship or a possible shared record. Do not make the same dashed line mean both proposed and uncertain without labels. Possible shared source, Owner confirmed shared source and Dismissed are distinct recorded states. Connector appearance must not imply effectiveness.

Keep the detailed diagram in its disclosure so it does not compete with the main work area. This refines an existing recurring diagram; it does not introduce a second relationship graph.

**Files/data:** `controls.js::network()`, `svgLines()`, `mobileNetwork()`, mapped-control definitions/statuses, the shared-pair guard and dependency disposition. [Existing expanded map](../../output/visual-opportunities-2026-11-15/existing-control-relationships.png).

## 6. Permanent record progress and delivery displays

Action pages can use a fixed **Plan recorded → Evidence submitted → Assurance review → Closed** status strip, with an explicit Returned branch and next responsible role. Use only recorded events. Task arrays have owners/dates but no reliable completed-task fields, so they do not support a percent-complete ring.

Management request pages can use the same component family with their own Draft/Awaiting decision/Approved/Expired states and clearly labeled due/review dates. A management decision remains separate from action closure and risk rating.

Integrations should have a compact permanent connection summary: connection state, assessment version, delivery state and last acknowledgement. Separate assessment delivery from later operational updates in labeled rows, with blockers/history on expansion. Keep the slim status link elsewhere in the app. This is a fixed status component driven by product records, not an AI-authored timeline.

**Files/data:** operations.js status/events/receivedEvidence/closure/outcome, `decisionStatus()`, `demoAsOf()`, `grc-sync.js::automaticSyncStatus()`, pending mode, `exchangeState()`, `lastAck`, `operationalAck`. [Current GRC display](../../output/experience-upgrade-2026-11-15/grc-recovered.jpg).

## 7. Empty, loading, error and completion states

### Current issues

The initial shell is a wordmark plus a loading sentence. A load failure uses the same generic shell, gives local-server instructions and prints the raw exception. No-action and empty-table messages have different anatomy. These are visible standard product states, not AI output.

### Recommended standard

Use a reusable anatomy: **modest line icon or small functional illustration, short title, one explanatory sentence, one relevant action**. Distinguish no records, no filter matches, first assessment, pending evidence, successful completion and failure. Keep technical diagnostics under Details. Use inline errors for local failures and full-workspace errors only when the workspace cannot load.

A restrained application-shell skeleton can preserve layout during initial loading. Completion states should retain record/version context and offer a useful next destination. Use the same static icon/illustration family; decorative photography or large scene illustrations would not help the work.

**Files/data:** src/index.html loading shell; app.js startup/error branch; dashboard.js empty filter; operations.js missing record; report empty rows; grc-view.js exceptions; interactions.js alerts. Loading must not steal keyboard focus; announcements should use appropriate status/alert semantics. Respect reduced motion.

## Acceptance criteria for a later implementation

- Existing business records determine every plotted value, status and completion marker.
- Risk colors agree across charts, badges and exports; workflow colors have separate definitions.
- No overlapping markers, silently truncated essential names or hover-only facts.
- Icons use one family and approved semantic mappings; text remains visible.
- Charts/diagrams have text/list equivalents, visible focus and usable targets.
- Phone layouts reflow or use readable alternatives; they do not shrink dense diagrams into tiny labels.
- Screen, HTML export and print retain the same report identity and frozen/version semantics.
- No extra chart appears unless it answers a recurring product question better than the existing table/list.

## Review evidence and limits

Three specialist agents re-reviewed the current source and rendered captures with the corrected scope. Root verified the icon helper, heatmap geometry, risk color rules, startup error branch, report stylesheet and graph label truncation. Captures were taken during the immediately preceding local polish/review sessions; this rerun did not reset a demo or record decisions in the app.

This is a visual/product opportunity review, not a fresh end-to-end, physical-device or assistive-technology test. Priorities are relative implementation order, not claims of critical production incidents. Effort estimates are relative, not promised dates. No application code or external publication changed during this review.
