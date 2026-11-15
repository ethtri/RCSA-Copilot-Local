# Bank-leader persona QA — round 2

**Current result: all eight original findings are verified fixed. All three independent persona reviewers rate the revised app Ready for the agreed synthetic, scripted bank-leadership demonstration.** No remaining material issue was observed in their exercised paths. This is a scoped persona assessment, not production certification or research with real bank executives.

## Independent verdicts

| Reviewer | Round 1 | Current verdict | Assigned findings verified |
| --- | --- | --- | --- |
| [Head of Payments Operations](first-line-leader.md) | Ready with fixes | **Ready** | QA-01, QA-02 |
| [Head of Operational Risk](second-line-leader.md) | Ready with fixes | **Ready** | QA-03, QA-04, QA-05 |
| [CRO / executive sponsor](executive-sponsor.md) | Ready with fixes | **Ready** after a focused follow-up | QA-05, QA-06, QA-07, QA-08 |

The reviewers did not implement the fixes, use the user's browser, or read each other's round-2 reports before completing their independent assessments. They operated fresh isolated Chrome sessions, inspected real screenshots and tested the original reproductions. Initial reports and subsequent observations are preserved. Their scorecards and coverage limits remain in the linked reports.

## Closure record

| ID | Verified result |
| --- | --- |
| QA-01 | A new relationship starts unassessed. Scoped library evidence stays separate from risk-specific owner coverage. Explicit assessment is required before control confirmation; replacement/remapping resets it. Proposals receive no operating credit. |
| QA-02 | Longer/shorter reply drafts preserve exact human closure requirements. An empty field remains empty and blocks revision. Human conditions survive into versions, action records and the report. |
| QA-03 | The exact return rationale appears beside the owner's question and remains in the return-history event after a different final reviewer conclusion. |
| QA-04 | AI labels describe topic mentions, not answer completeness or sufficiency. The draft action no longer claims to produce a complete answer. |
| QA-05 | Alex Morgan remains assessment owner across first/second-line perspectives; Jordan Lee remains reviewer. |
| QA-06 | The report names Unauthorized wire transfer, states 1 of 3 risks, links to the register and selects that risk on every chart drill-through, even after a supporting risk was selected. |
| QA-07 | The decision has an explicit question, responsible role/forum and target date. Draft acceptance remains draft until attested submission, then becomes pending without approval. The November 19 target decision date remains distinct from the testing due date and an independently entered acceptance review date. |
| QA-08 | Reports fits 390/834/1600 widths, keeps the current-position summary visible, and scrolls its comparison table locally. |

## Review caught a partial fix

The executive's first round-2 pass found QA-07 only partially resolved: Reports was correct, while three assessment/handoff labels still called an unsent acceptance request pending. A focused correction introduced shared submission-aware acceptance wording. All three reviewers then independently verified the owner acceptance path in fresh browser sessions: draft before submission, pending afterward, unchanged risk, retained dates and no approval. Each kept its Ready verdict or updated to Ready. The executive's original observation and follow-up evidence remain in its report; the initial partial result was not removed.

## Implementation and verification

[Fix record](fix-record.md) documents the changes and checks. All five model/render verification scripts and the expanded browser regression pass. The browser run includes the complete owner → challenge → return → revision → final conclusion flow, exact closure-evidence preservation, mapping applicability gates, report scope/drill-through, acceptance draft/submission, negative attestations and 1600/834/390 layouts.

The design keeps its existing typography, palette, native charts and five stages. New coverage judgment fits in the mapping dialog; return feedback is a compact callout; the executive ask is one report block. No live model, backend, database or institutional data is added.

The [reviewed source manifest](source-fingerprints.json) identifies the runtime snapshot for the final focused rechecks. Application files stayed unchanged during those rechecks. Reports and screenshot evidence are local; this task did not create a deployment, commit or GitHub issue closure.

## Remaining preferences and limits

Reviewers retain optional preferences for a shorter control view, compact review context and a narrow-table scroll cue. First line also noted that the dashboard acceptance row's generic Due date column shows the November 19 management target while the response retains its separately entered acceptance review date; a more explicit date caption could help. No date loss was observed. None was reported as an open material finding or a condition on the Ready verdict. These checks are targeted persona QA; they do not cover every combination, assistive technology, real approval authority or production security.
