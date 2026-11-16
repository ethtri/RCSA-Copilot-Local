# Superseded scope

This earlier review mixed standard product visuals with presentation of AI suggestions. It is retained as history and is not the current implementation backlog. See [the corrected review](visual-opportunities-review-2026-11-15.md).

# Useful visual opportunities across the RCSA demo

**Date:** November 15, 2026  
**Scope:** Three specialist reviews of assessment/AI, operational follow-through, and the visual/accessibility system. Root also inspected the running dashboard, Changes and Controls relationship disclosure in a separate disposable tab. This is an opportunity review, not an implementation or formal accessibility audit. Application source was not changed.

## Recommendation

Concentrate the next visual pass on explaining **why evidence matters, exactly what a proposal changes, what protection is proven, and who acts next**. Improve existing charts before adding new chart types. The report's small risk register is already an appropriate visual representation.

Recommended sequence:

1. Resolve the existing heatmap marker collision.
2. Add an evidence date-and-scope strip on Changes.
3. Extend the proposal editor with field-level change comparison.
4. Build a qualitative control coverage matrix with explicitly authored scope metadata.
5. Add action/assurance milestones, then the management approval window.
6. Connect follow-through statuses to risks in review/report views; keep detailed delivery diagrams inside Integrations.

## Prioritized opportunities

### V-01: Heatmap marker collision

**Priority:** Fix first. **Effort:** Small. **Type:** Existing visual defect.

The Payment details and Delayed execution markers occupy the same likelihood/impact cell and visibly overlap. `portfolioHeatmap()` in [visuals.js](../../src/scripts/demo/visuals.js) offsets marker centers by 18 SVG units while the circles are 30 units across. This makes individual risks harder to distinguish.

Use a single count marker, for example **2 risks**, for coincident positions. Selecting it exposes the named risks with their confirmed likelihood/impact and a route to inspect each. Preserve the existing complete text list and keyboard access. Use `riskEntries()` and `currentRating()`; new risks without a confirmed position remain outside the matrix. A larger or repeated chart does not solve the collision.

### V-02: Evidence date-and-scope strip

**Priority:** First wave. **Effort:** Small–medium. **Location:** Changes, inside the prepared-refresh area.

**Question answered:** Why is AI asking me to revisit this assessment?

Show three compact dated records:

| Record date | Record | Visible scope |
| --- | --- | --- |
| September 15 | Standard-wire test WT-25 | 25 standard wires; urgent route excluded |
| October 5 | Revised wire procedure | Urgent exception route introduced |
| October 20 | Intercepted fraud attempt | One urgent request intercepted; no loss |

End with a direct **Urgent-route testing still needed** cue. Selecting a record opens its existing source drawer. This should replace part of the explanation, not add a second large introductory panel. On phones use a vertical list.

**Data:** `sourceRecords(data,s)` and `test`, `procedure`, `incident` in [workflow-demo.json](../../assets/data/workflow-demo.json), rendered by `preparedRefresh()` in [upgrade-view.js](../../src/scripts/demo/upgrade-view.js). The test excerpt explicitly establishes the date/scope mismatch. Dates must be labeled as record dates; the line denotes chronology, not proof that one event caused another. Use only the selected version's available evidence. This is different from the existing intraday research timeline, which links records within one event.

### V-03: Field-level proposal comparison

**Priority:** First wave. **Effort:** Small–medium. **Location:** Review suggested update/rating dialog.

**Question answered:** Exactly what is changing, and what am I keeping?

Extend the recently polished confirmed/draft/AI comparison with rows for **Likelihood**, **Impact**, **Why this likelihood?**, and **Why this impact?**. Label each Changed, Unchanged or Not assessed. For example, the refreshed residual proposal changes likelihood from 2 to 3 while impact stays 4. Five discrete positions can make the dimensions legible; the numerical score stays secondary. Expand the rationale row for actual text differences and linked evidence. Retain individual field-application controls.

**Data:** `proposalDialog()`, `ratingProposal()`, the selected risk's rating fields, proposal fields and actual last-confirmed values. Do not substitute a prior residual value for a before-controls historical value. When the selected lens has no previous rating, display No previous assessment without a starting marker. Identical owner-draft and AI positions should share an explicitly labeled marker rather than overlap.

### V-04: Control evidence matrix

**Priority:** First wave. **Effort:** Medium–large. **Location:** Controls → Coverage & gaps.

**Question answered:** What protection exists, what has been tested, and what remains unproven?

Replace some of the long findings with expandable control rows and plain-language columns: **In place?**, **Owner's coverage judgment**, **Tested scope**, and **Still needed**. Useful states include Proposed, Not implemented, Not assessed, Standard payments only, and Evidence needed. Each cell should reveal the supporting source, owner rationale or next action.

**Data:** `coverageAnalysis()` and mapped controls from [control-assistance.js](../../src/scripts/demo/control-assistance.js), control definitions, `mappingApplicability`, proposed flags and source scope. There is currently no complete normalized per-control/per-route evidence matrix. Add explicit authored scope annotations and an Unknown state before showing coverage states. Do not infer a green check by keyword-matching prose or turn qualitative judgments into percentages. On phones render each control as a labeled vertical group.

The relationship graph already exists in [controls.js](../../src/scripts/demo/controls.js). Refine and selectively surface that existing view for the shared-source finding. Keep Possible shared source before owner judgment and Owner confirmed shared source afterward. Lines mean information use, not effectiveness. Preserve mapping/disposition guards and source access. Do not show a full graph and full coverage matrix together by default.

### V-05: Action and assurance milestones

**Priority:** First wave after the assessment visuals. **Effort:** Medium. **Location:** Action record.

**Question answered:** What has happened, who acts next, and why is this not closed?

Use a concise milestone strip: **Plan recorded → Evidence submitted → Assurance decision → Closed**. Show the actual current state, next responsible role and relevant action. A returned evidence pack has a visible branch and reviewer reason. Selecting a milestone opens its recorded event or evidence; keep editing fields below.

**Data:** `actionView()`, `operationalProjection()`, action status, received evidence, closure, executor/reviewer roles and events in [operations.js](../../src/scripts/demo/operations.js). Show Work started only when that event exists. Implementation/testing task arrays have title, owner and due date but lack reliable task-completion records. A completion percentage or task-completion ring would therefore invent progress. Assurance closure never automatically changes the risk rating.

### V-06: Management approval window

**Priority:** Next. **Effort:** Small–medium. **Location:** Decision request.

**Question answered:** Is this approved, under what conditions, and until when?

Show Decision due, Approved on when recorded, Review/expiry and an explicit As-of marker on a restrained date line. Pair the visual with conditions and limits in a disclosure. Draft requests have no filled approval segment. Expired requests show the elapsed boundary and renewal action. Dates stack on phones.

**Data:** `decisionView()`, `decisionStatus()`, `demoAsOf()`, targetDate, reviewDate, outcome and recorded events in operations.js. Use the explicit demo date, not the machine clock. Do not portray the request as accepted before the management event or imply acceptance lowers the rating.

### V-07: Version-specific review handoff

**Priority:** Next. **Effort:** Medium. **Location:** Independent review workspace.

**Question answered:** Which assessment am I reviewing, what was asked, and what happened afterward?

A short event rail can show **Owner submitted v2 → Question about [risk] → Owner replied → Reviewer agreed/returned**. Show only events that actually exist; direct agreement has a clean two-event path. Select a question to inspect its pinned risk/reply, or a submission to inspect its frozen version. Put earlier versions in History.

**Data:** snapshots, conversations, reviewConclusions and `assessmentProjection()` in [model.js](../../src/scripts/demo/model.js). Retain the owner/reviewer forms as the actual decision controls. Conversation-only replies must not appear to create a new assessment version.

### V-08: Link each reported risk to follow-through

**Priority:** Next. **Effort:** Medium. **Location:** Final review and report.

**Question answered:** What remains open for this risk after assessment review?

Enhance the existing risk register with linked Action and Management decision states, or expose these in each expandable risk row if width is constrained. A compact record could read **Elevated 12 · Evidence submitted · Awaiting decision**. This joins information currently separated between All assessed risks and Work records. Keep detail such as conditions, evidence and history in the record view.

**Data:** `reportContext()` already provides the exact assessment projection and selected operational records. Join by riskId and honor active/superseded records. Keep assessment review, execution, assurance closure and management approval as separate statuses. Missing work should say No action recorded or Not required only when the model establishes which is true. Archived report editions must remain frozen. Another donut or gauge is not needed for the three/four-risk dataset.

### V-09: Response-approach comparison table

**Priority:** Later. **Effort:** Small–medium. **Location:** Compare approaches.

**Question answered:** What would each approach require, and what exposure remains?

Use a compact table with Approach, What must happen, and What the bank still needs to manage. Highlight the current choice without ranking alternatives. Expand a row for the relevant prepared draft, evidence requirement and retained exposure. Selecting another approach must retain the existing explicit strategy-switch confirmation.

**Data:** RESPONSE_OPTIONS, `responseOptionsDialog()`, `responseDraft()` and recorded strategy fields. Transfer terms stay unconfirmed where the records are missing; acceptance remains a request. Avoid speculative scores, cost savings or a Best option badge.

### V-10: Two-track GRC delivery map

**Priority:** Later. **Effort:** Medium. **Location:** Integrations only.

**Question answered:** What reached GRC, and are later work updates separate?

Use two independent rows: **Reviewed assessment v2 → Bank record acknowledged** and **Action/decision records → Operational update acknowledged**. Put pending, failed and blocked states on the applicable track, with an action to inspect the named blocker or exchange history. Retain the existing quiet top status link elsewhere.

**Data:** `exchangeState()`, `readinessIssues()`, pending mode, lastAck, operationalAck and recorded exchange events in the GRC modules. Do not combine operational acknowledgments with the assessment version or imply a live bank connection.

## Shared visual language

Use a consistent state vocabulary across every component:

| Meaning | Visual treatment |
| --- | --- |
| Confirmed | Solid marker plus Confirmed text |
| Owner draft | Hollow marker plus Not yet confirmed |
| AI proposal | Pale green suggestion surface plus AI proposal; no success tick |
| Proposed control | Dashed treatment plus Not implemented |
| Evidence gap | Amber indicator plus the specific limit |
| Blocking error | Red reserved for an actual blocking condition |

Keep the risk-band palette separate from workflow state. A green AI proposal, green action status and green risk category must not mean the same thing. Every visual needs direct labels, a text/list equivalent, keyboard-operable nodes, visible focus and adequate touch areas. Essential facts must not depend on hover. Timelines and comparisons reflow vertically on phones. Short reveal/focus transitions are sufficient; moving arrows or invented intermediate scores would add ambiguity.

## Evidence and review provenance

The assessment reviewer inspected the source/design system and dashboard, Changes, rating, Controls, editor and review captures. The follow-through reviewer inspected response, operations, review, reports and GRC source plus their current captures. The system reviewer inspected shared CSS, visual modules and the latest screenshot sets. Root checked the current live dashboard, Changes and existing control-relationship disclosure and verified the three source dates/scopes in the fixtures.

Relevant captured evidence:

- [Current polished Changes](../../output/spacing-polish-2026-11-15/changes-after.png)
- [Current proposal editor](../../output/spacing-polish-2026-11-15/proposal-after.png)
- [Controls workspace](../../output/spacing-polish-2026-11-15/controls-before.png)
- [Existing control relationship graph, expanded during this review](../../output/visual-opportunities-2026-11-15/existing-control-relationships.png)
- [Dashboard with overlapping coincident markers](../../output/spacing-polish-2026-11-15/dashboard-before.png)
- [Reviewed four-risk report](../../output/experience-upgrade-2026-11-15/report-final.jpg)
- [GRC recovered state](../../output/experience-upgrade-2026-11-15/grc-recovered.jpg)

Effort ratings are relative implementation/design estimates, not delivery-date promises. The temporary browser review tab was closed; the user's existing tab and draft were left intact. No application changes or external publications were made.
