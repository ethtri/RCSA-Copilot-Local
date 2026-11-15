# Automatic GRC sync: verification

Completed November 14, 2026. [Accepted behavior and design specification](../../docs/operations/automatic-grc-sync-plan.md).

## Result

The connection is assumed configured. Completing independent review queues the immutable reviewed snapshot automatically. Assessment and report show quiet sync status, then the acknowledged version. Drafts and returned assessments stay local. The manual transfer console and primary navigation entry are removed. Legacy `/handoff` links redirect to assessment review and preserve the working state.

Settings > Integrations holds policy, record identity, history, implementation checklist and exceptions. Failed acknowledgment retains the request for retry. Changed source records require owner comparison and a current source-version token. Incompatible methods or missing control IDs pause updates. Bank-owned fields, action status and immutable submissions are preserved. Management approval and action closure remain separate.

## Functional checks

All twelve scripts pass: `verify-automatic-grc-sync.mjs`, `verify-buyer-readiness.mjs`, `verify-demo.mjs`, `verify-copy-authenticity.mjs`, `verify-control-assistance.mjs`, `verify-control-assistance-workflow.mjs`, `verify-product-refinements.mjs`, `verify-owner-revision.mjs`, `verify-risk-intelligence.mjs`, `verify-risk-matrix.mjs`, `verify-ux-navigation.mjs` and `verify-persona-fixes.mjs`.

The new tests cover draft/returned-review guards, review-completion trigger, worker versus interactive owner permissions, queued versus acknowledged data, idempotency, stable retry ID, no retry loop on render, owner-only source comparison, stale comparison rejection, revision invalidation, last-sync preservation, bank metadata/action-status preservation and method/mapping pauses. Legacy adapter helpers retain low-level regression coverage; their UI assertion now checks secondary settings. JavaScript syntax checks and `git diff --check` pass. Module, fixture and stylesheet revision is consistently `20261114.24`.

## Browser checks

Used CUA and the in-app browser with isolated testing tabs, without external services.

1. A draft report shows GRC connected / sync after review and exactly three primary links: Dashboard, Assessments, Reports.
2. From the Response received scene, checked the actual reviewer confirmation and recorded the conclusion. Observed Syncing to GRC followed by Synced to GRC / Version 2 without a separate transfer action.
3. Opened Reports and sync details. Review completed, testing action open and management decision pending remain independent of sync success.
4. In an owned testing tab, selected Connection interruption before recording review. Attention status explained that the assessment was saved. Retry succeeded without repeating review.
5. Reset only that testing tab and repeated with GRC record changes. The reviewer could inspect both versions but had no resolution button. Switched perspective to the owner, compared source versus reviewed values and kept the reviewed assessment. Sync resumed automatically.
6. Checked the conflict comparison and report at 390 × 844. Document width was 375px, with no horizontal overflow. Comparison cells stack with explicit source/reviewed labels. Reset the temporary viewport override.
7. Reloaded the user's existing `/handoff` tab. It canonicalized to `/assessment/review`, retaining the draft, confirmed scope and existing decision history. Tests did not replace the user's work.

Desktop reference and final report were checked at the browser's default 1280 × 720. Evidence consists of browser JPEG screenshots. The viewport tool affected the fault-testing tab; mobile report evidence was captured in that same tab after conflict recovery, with dimensions verified from the rendered document.

## Visual fidelity

This small existing-system change uses the existing app design, without a new generated concept. [Before reference](report-reference.jpg) was captured before implementation. The reference and [latest desktop render](report-synced-desktop.jpg) were both inspected with `view_image` during final QA.

| Comparison | Accepted change / reference | Verified result |
| --- | --- | --- |
| Navigation | Remove GRC Handoff | Three task destinations; old link redirects |
| Copy | Remove manual handoff paragraph | Only the specified passive status added; manual transfer actions removed |
| Hierarchy | Assessment stays primary | Small 12px status; serif report heading and primary CTA retained |
| Typography | Existing display and UI families | Serif title and sans-serif labels/buttons retained; settings uses the same families |
| Palette/icons | Cool-gray background, white sheets, green controls | Existing tokens and line icons reused; restrained amber for exceptions |
| Containers/spacing | Preserve report structure | No prominent transfer panel; settings uses one sheet with factual rows |
| Mobile | Readable status and comparison | Verified 390 × 844, labeled stacked comparison, no horizontal scrolling |
| Interaction | Existing review triggers sync | Local pending-to-acknowledged state and both recovery paths verified |

Above-the-fold copy diff: removed GRC handoff from the header and Review GRC handoff / Preserve external IDs and inspect the exact reviewed update from the report. Added the specified status states only. Draft-to-reviewed report text and owner/reviewer perspective differences are intentional state changes. The final result was faithfully verified against the existing design and accepted changes; no material visual mismatch remained.

The connection header was corrected to show Needs attention during exceptions rather than Connected. Current conflict screenshots reflect this fix; the initial failure capture predates the small header-label correction.

## Evidence and limits

- [Draft report](report-draft-desktop.jpg)
- [Reviewed report, desktop](report-synced-desktop.jpg)
- [Reviewed report, mobile](report-synced-mobile.jpg)
- [Secondary settings](integration-settings-desktop.jpg)
- [Connection failure](sync-failure-desktop.jpg)
- [Source conflict, desktop](source-conflict-desktop.jpg)
- [Source conflict, mobile](source-conflict-mobile.jpg)

Sync remains simulated locally. The 650ms acknowledgment illustrates asynchronous delivery; there is no durable worker, live connector or production authentication. Source identity and supported mappings remain bounded to the sample records. The checklist uses the existing Blob-download mechanism; this pass verified its rendered placement, not a separate download event.

The one-off editing script was removed. Screenshots are retained as review evidence. No paid or hosted test resources were created. The existing local preview server remains available; the user's tab is preserved.
