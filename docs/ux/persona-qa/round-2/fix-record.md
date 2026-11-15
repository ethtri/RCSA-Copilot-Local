# Fix record for the eight persona findings

The owner authorized all eight repairs, preserving the existing simple visual system, followed by an independent repeat review. Two implementation agents handled mapping applicability and report refinement; neither participated as a bank-leader reviewer. The three original persona reviewers assess the frozen revised app in separate Chrome sessions.

| Finding | Implemented change | Verification |
| --- | --- | --- |
| QA-01 | Risk-specific mapping applicability is distinct from library evidence. New/replaced/remapped relationships default to unassessed. A compact owner coverage choice can record an explicit judgment in the same dialog. Confirmation is blocked while any new relationship remains unassessed. Test population/date stay visible; proposals retain no current operating credit. | Mapping model/render assertions and rendered add/edit/default/gate/limited-coverage paths. |
| QA-02 | Draft a response changes only the reply. Existing human closure evidence, including an empty field, is retained. Required-evidence validation still blocks an incomplete revision. | Browser assertions compare exact custom text through repeated drafts and the empty-field negative path. |
| QA-03 | A return decision stores its exact reviewer rationale in history and exposes it beside the question in the owner's response view, with the returned version. Later responses/conclusions cannot replace the historical rationale. | Model and full browser return → revision → final conclusion → history replay. |
| QA-04 | Suggested response coverage explicitly describes topic cues; positive rows say Mentioned in draft. Draft a response replaces the completeness claim. Reviewer sufficiency remains a human decision. | Custom-question browser replay and render checks. |
| QA-05 | Assessment owner is always the named assessment owner, across perspectives. Reviewer identity remains distinct. | Second-line footer assertion and report review record. |
| QA-06 | The report names Unauthorized wire transfer, states 1 of 3 risks, links to the full register, and explicitly selects that risk on chart/assessment drill-through. | Render checks with a supporting risk previously selected; independent browser drill-through. |
| QA-07 | A compact management-decision brief gives a strategy-specific question, owner, forum and target date. Draft/submitted/within-tolerance states are separate. Dashboard and review use the same decision helper. | Tests for all response strategies, no false pending state, and dates independent of action/acceptance review dates. |
| QA-08 | Report grids/cards shrink to the viewport, labels wrap and the comparison table scrolls locally. Reports is now in the responsive regression matrix. | Browser checks at 1600×1000, 834×1000 and 390×844; prior/current headline positions remain visible. |

The decision brief is prepared synthetic scenario content: Head of Payments Operations; Payments Risk Committee; target November 19, 2026. The testing action remains due November 28. It is a request for disposition, not approval, and does not change current risk or close actions.

## Automated and rendered checks

All passed before the repeat review began:

- `node tools/verify-demo.mjs`
- `node tools/verify-product-refinements.mjs`
- `node tools/verify-persona-fixes.mjs`
- `node tools/verify-mapping-applicability.mjs`
- `node tools/verify-report-refinement.mjs`
- `node tools/verify-browser.cjs` with the installed Playwright module and Chrome.

The in-app browser was used first for the revised report and narrow rendering. Chrome automation saved local screenshot artifacts and repeated the full owner/challenge/return/revision/conclusion flow. Latest evidence includes [report](../../../../assets/screenshots/demo-report-desktop.png), [returned clarification](../../../../assets/screenshots/qa-fixes-owner-return.png) and [narrow report](../../../../assets/screenshots/qa-fixes-report-mobile.png), all opened for visual inspection. Exact typography, forest/white palette, stage order and native controls remain consistent with the existing design. No new model, backend or external service is used.

These implementation checks do not stand in for the independent persona verdicts; those are recorded separately in the round-2 reports and summary.

## Focused correction during repeat review

The executive reviewer initially found QA-07 only partially fixed: Reports used draft/submitted states correctly, but the residual card, review strip and handoff still described an unsent acceptance request as pending. A shared `acceptanceStatus` function now supplies those three surfaces. The browser regression now exercises actual owner confirmation and attested submission of an acceptance request, checking draft language before sending and pending language afterward. Tests also ensure that dates stay distinct and no acceptance is granted. The within-tolerance/no-response instruction was made optional rather than calling a response required.

The original observation is retained in the executive report. Each independent persona was asked for a focused fresh-context check of this final wording revision, in addition to its original round-2 findings disposition.
