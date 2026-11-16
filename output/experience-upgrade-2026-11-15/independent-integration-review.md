# Independent integration review

**Reviewer:** copy/realism contributor  
**Date:** November 15, 2026  
**Scope:** root-owned `app.js` / `interactions.js`, another contributor’s model/proposal boundaries, and their integration with frozen reports and linked records. Review performed against the current integration working tree, after the source fixes described below. Final commit identity and consolidated browser acceptance belong in [the main verification record](../../docs/operations/demo-experience-upgrade-verification.md).

This was a source and model review. Root owned the browser. The reviewer authored the operations/report/GRC modules, so this note does not claim an independent author review of those modules; their behavior is covered by focused checks and root’s separate browser acceptance.

## Material findings and disposition

| Finding | Evidence before correction | Correction reviewed | Result |
| --- | --- | --- | --- |
| Default reviewed report opened live evidence | The default report projection used a frozen submission, but `sourceDialog` treated undefined/current version as live source records | Root now resolves report source drawers through `assessmentProjection` for both current and numbered selections | Source inspection confirms the drawer follows the same selected projection. Frozen source/report regressions pass |
| Prepared question could target a different risk from the reply | With selected risk `details`, the former handler forced an unauthorized-transfer question about urgent requests/WI-07; `sendChallenge` linked it to `details`, and reply assistance read details-test | Root now calls `analysisPrompts(runtimeData(), state, 'review')` for the selected risk and shows an honest unavailable state when there is no prepared question. SO-19 special handling is restricted to its primary risk | Forced primary-risk fallback removed from both preview and use handlers; bounded/ambiguous reply checks pass |
| Scope-only candidate edits retained unrelated prepared analysis | Discovery’s prepared-case check compared cause/event/harm but ignored an edited process scope | Model contributor now includes scope in that applicability decision and disables prepared retry ratings/designs for an unrelated edited scope | New scope-only regression passes in `verify-experience-model.mjs` |
| Obsolete report-confirmation action bypassed new contract | Unused `confirm-report` handler could still record the old-style confirmation without the new report edition/role contract | Root removed the obsolete handler; the visible report uses `report-confirm` and the new confirmation function | Source inspection confirms the obsolete action branch is absent |
| Generic evidence receipt left guidance current | Receiving a requested synthetic pack added a source but left that risk’s proposal/plan state unchanged | Operations now marks matching proposals stale and linked plan/plan draft for review, preserving ratings and submitted snapshots. The model contributor is recording receipt identity/version/source data in proposal input signatures | Operations regression passes; receipt-signature follow-through and the consolidated 16-script run subsequently passed; see the final verification ledger |

No further blocking issue was identified in the reviewed integration scope after these corrections. This statement is limited to that scope and is not a claim that all responsive, keyboard, motion, print or browser acceptance checks are complete.

## Verification performed

The reviewer ran these focused checks successfully during the final integration review:

```text
node tools/verify-experience-model.mjs
node tools/verify-report-refinement.mjs
node tools/verify-operations.mjs
node tools/verify-automatic-grc-sync.mjs
node tools/verify-buyer-readiness.mjs
```

The checks cover frozen evidence/control/method/review context, conversation versions, direct/returned review, partial and stale proposals, full added-risk follow-through, four response contracts, bounded replies, immutable report editions, actual escaped HTML output, operational authority, exact dates, received-evidence follow-up, mapping recovery and separate idempotent operational delivery.

Source inspection also confirmed that structured operational/report/GRC errors are passed to the shared validator with the correct main/dialog root and exact field keys. Read-only operational views show recorded values rather than another role’s unsaved input.

## Separate browser observations reported by root

- Four-risk direct independent agreement without a mandatory question.
- All-risk report with No previous assessment for the added risk; summary edited, saved and confirmed.
- Actual self-contained downloads inspected: [four-risk version-2 report](downloaded-four-risk-report.html).
- Action planned → started → synthetic test evidence → assurance closure at record version 4, with current rating unchanged.
- Management draft → submitted → conditional approval at request version 3 → Expired after advancing the explicit demo date to November 29; ratings unchanged.

Root is recording final screenshots, viewport dimensions, complete test results, visual comparisons and rehearsal evidence in the main verification record.

## Documentation handoff

README, the current runbook, schema contract, GRC adapter contract and local backlog now describe implemented November 15 behavior. They distinguish local implementation from final QA and from remote GitHub status. The runbook uses direct review as the flagship path and treats questions, added risks, assurance closure, management approval/expiry and GRC recovery as real alternate branches.

The synthetic boundaries remain explicit: prepared AI, local roles, synthetic evidence receipts and GRC delivery, tab-local persistence, real HTML output and browser printing, with no live model, production authentication, external messages or live bank connector.
