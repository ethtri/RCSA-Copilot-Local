# Demo experience upgrade: implementation and verification

**Date:** November 15, 2026  
**Status:** Implemented and verified locally, with the platform-check limits below.  
**Baseline:** `29540e61e516e799db0a50cf816a00ec427006ee`  
**Serving cache version:** `20261115.5`  
**Source/tools SHA-256:** `2510527ea6434b844e00caa8aaa307fac61dbfd235749cf00f6638e34e594ea6`

This is the delivery record for the [implementation plan](demo-experience-upgrade-plan.md). The fingerprint identifies the tested local source and tools; the exact file hashes are in [revision-manifest.json](../../output/experience-upgrade-2026-11-15/revision-manifest.json). No commit, publication or remote issue closure is claimed. The original [audit](../../output/demo-audit-2026-11-15/review.html) remains historical problem evidence.

## Coverage of the implementation plan

All DX work items are implemented. Model checks cover the alternate branches; browser checks exercise the principal integrations. A passing focused check does not imply that every combination was manually exercised in every browser.

| Item | Delivered behavior | Acceptance evidence |
| --- | --- | --- |
| DX-01 | Three coordinated visual references, shared design system, screen/role/component contracts | [Design contract](../ux/DEMO_EXPERIENCE_DESIGN.md), [reference comparison](../ux/experience-fidelity-review-2026-11-15.md), fresh assessment/controls/report captures below |
| DX-02 | Schema 3 migration, recoverable unsupported sessions, canonical active risks, nullable previous ratings | `verify-experience-model`: edited legacy drafts and snapshots preserved; fourth-risk assessment/submission/review; browser reload retained the assessment and custom control |
| DX-03 | Frozen source/control/method context, exact version review/report/GRC projections, separate conversation and operational events | Experience, owner-revision, report, operations and automatic-GRC checks; browser returned version 1 remained accessible after starting a revision; revised four-risk version 2 reviewed and synced |
| DX-04 | Persistent field errors, first-invalid focus, source drawers, long editors, saved-state feedback and local focus restoration | Browser blank control name and plan owner errors stayed in the editor; edited control name and cursor position 1 survived source-and-back; keyboard question-risk switch retained focus and open editor |
| DX-05 | Default-visible prepared refresh, field selection, keep/edit/apply, source signatures and local evidence requests | Experience checks for partial application, stale source/receipt rejection and owner edit preservation; browser applied rationale while keeping likelihood/impact |
| DX-06 | Add, extend, defer and dismiss, provenance, complete fourth-risk path and honest unsupported scopes | Experience checks for all dispositions and scope-only edits; browser added duplicate-release risk, assessed it, recorded response, submitted, reviewed, reported, downloaded and recovered GRC mapping |
| DX-07 | Separate likelihood/impact/rationale proposals, bounded claim checks, confirmed versus draft positions | Experience and control-assistance checks; browser inspected No previous assessment / Not assessed before applying the added-risk proposal; changed control set displayed Needs refresh |
| DX-08 | AI controls visible by default, distinct current/proposed counts, editable designs, selected-design plans, actionable gaps and staleness | Control-assistance, workflow and mapping checks; browser 2 current / 1 proposed, edited control retained through source view, plan generated and recorded as a response draft |
| DX-09 | Four response-specific forms and drafts, explicit replacement, linked work retained in history on approach changes | Experience checks cover 12 risk/approach combinations; operations checks strategy archives; browser acceptance draft relevant to duplicate-release risk and explicit Change response approach? dialog |
| DX-10 | Bounded paraphrases, compound questions, missing facts, ambiguity selection, explicit risk context and pinned replies | Experience/buyer/persona checks; final browser delayed-execution owner+date question returned No follow-up action is recorded, without inventing a title, owner or date; conversation retained assessment version 1 |
| DX-11 | Direct agreement/return, optional questions, unresolved-question guard, visible return reason and owner revision | Experience checks; browser four-risk direct agreement without a question; direct return showed reason and Start owner revision; unresolved question disabled agreement |
| DX-12 | Editable action progress/tasks, required versus received evidence, independent assurance closure/return, history | Operations checks; browser Planned → In progress → Evidence submitted → Closed, action version 4, separate assurance identity and unchanged risk |
| DX-13 | Owner-prepared management requests, management-only decisions, conditions, expiry and history | Operations checks; browser Draft → Awaiting decision → Approved version 3 → Expired after explicit as-of date moved to November 29; rating unchanged |
| DX-14 | All-risk report, source/work/review details, actual editable summary, confirmation invalidation, immutable editions and real standalone HTML | Report checks; browser edited/saved/confirmed summary; actual downloaded version-2 four-risk HTML opened successfully with all details; no future SO-19 excerpt |
| DX-15 | Named risk/control/method readiness, administrator recovery, bounded conflict/retry and exact reviewed payload, separate operational sync | Automatic-GRC/buyer/operations checks; browser named duplicate-release risk missing ID, assigned RISK-PAY-RECOVERY-004, then acknowledged Synced to GRC · Version 2 |
| DX-16 | Plain task language, shorter default screens, analysis and source detail on request, truthful missing/limited states | Copy/persona checks, independent copy/realism review, cross-app browser inspection; singular counts corrected during review |
| DX-17 | Readable fields, touch-sized controls, intermediate header, mobile selectors, local table scrolling and keyboard recovery | Browser measurements/captures below; no page overflow in measured controls, rating, review and report states; keyboard selector and inline-error focus verified |
| DX-18 | Short panel/drawer transitions, retained content, reduced-motion overrides | CSS/source review and ordinary navigation; reduced-motion rules remove animation, transition and smooth scrolling. OS-level reduced-motion behavior was not manually emulated |
| DX-19 | Consolidated regression run, browser rehearsal, fresh evidence, independent reviews, runbook/contracts/status updates | [Final checks](../../output/experience-upgrade-2026-11-15/final-checks.txt), revision manifest, evidence below and independent review records |

## Final automated checks

All application JavaScript parsed using `node --input-type=module --check`. All **16** `tools/verify-*.mjs` scripts passed against the fingerprint above. [Full output](../../output/experience-upgrade-2026-11-15/final-checks.txt) records each command and result.

Checks include migration, immutable sources/control definitions/method/review, direct and returned review, version-preserving conversations, partial/stale proposals, receipt-driven refresh, added-risk lifecycle, missing history, four response contracts, preserved owner edits, ambiguity and unsupported questions, applicability, action/decision authority and expiry, exact calendar dates, report editions, safe HTML, GRC mapping/conflict/retry/idempotency and frozen versus operational payloads. The final fresh QA tab produced no application console errors.

## Browser and visual evidence

- [Prepared refresh](../../output/experience-upgrade-2026-11-15/changes.jpg), [rating workspace](../../output/experience-upgrade-2026-11-15/rating.jpg), [controls](../../output/experience-upgrade-2026-11-15/controls.jpg), [narrow controls](../../output/experience-upgrade-2026-11-15/controls-mobile.jpg).
- [Control validation](../../output/experience-upgrade-2026-11-15/validation.jpg), [plan-owner validation](../../output/experience-upgrade-2026-11-15/plan-validation.jpg), [honest missing-action reply](../../output/experience-upgrade-2026-11-15/missing-action-reply.jpg).
- [Final four-risk report](../../output/experience-upgrade-2026-11-15/report-final.jpg), [GRC recovery](../../output/experience-upgrade-2026-11-15/grc-recovered.jpg), [actual downloaded report](../../output/experience-upgrade-2026-11-15/downloaded-four-risk-report.html).

The downloaded report was found in the browser Downloads folder, copied into the evidence directory and opened as a standalone HTML artifact. It identifies assessment version 2 and operational record versions, includes all four risks and No previous assessment, and excludes SO-19/service-clarification before receipt. Downloads are real; the browser automation download-event wait did not observe them, so completion was established from the actual files and opened output.

The controls layout was measured at CSS widths **390, 640, 768, 1024 and 1440**. Client/scroll widths were respectively 373/373, 623/623, 751/751, 1007/1007 and 1423/1423: no document overflow. Rating and review also measured 373/373 at CSS width 390. At that width, report tables stayed inside named local scroll regions: region width 296, table scroll width 650, document 373/373. A later multi-tab viewport attempt remained at CSS width 1151 for every request; it is retained as a window smoke measurement, not breakpoint evidence. Viewport overrides were reset.

A sampled computed-color contrast check on visible response headings, text, labels, buttons and metadata had minimum **4.74:1**. This is a sample, not a comprehensive contrast or accessibility certification. Arrow-key question-risk changes retained focus on `review-question-risk` and kept its editor open. Inline validation focused the precise missing field. Source-and-back preserved edited text and cursor range. Mobile alternatives expose assessment-step, risk and assistance selectors; tables retain keyboard-accessible named scroll regions.

The UI reviewer opened the assessment, controls and report concepts and actual captures. The [comparison record](../ux/experience-fidelity-review-2026-11-15.md) describes the same visual family and intentional adaptations: real data and version controls, a working summary editor, the actual controls selector, and closed source drawers in default captures. This is not a claim of pixel-identical invented concept data.

## Rehearsal and independent review

The integrated browser work covered the full prepared-refresh story and alternate operational/review branches. A timed assisted revision rehearsal ran **20:31:37–20:33:39 UTC (2 minutes 2 seconds)**: start from submitted version 1, create an owner revision, add/assess duplicate-release risk, explicitly record no current controls, use rating and acceptance proposals, confirm and submit version 2, independently agree, then inspect the complete report. GRC mapping recovery and HTML download followed. This is rapid tool-driven navigation, not a narrated presentation benchmark. The runbook's 8–10 minute guided target remains an unmeasured narration target; no time savings are claimed.

Three contributors reviewed AI/model behavior, copy/realism and interaction/polish. Cross-scope findings were fixed and regression-checked: frozen report source drawers, selected-risk questions, scope-only applicability, unavailable future sources, no-action reply facts, and receipt-driven staleness. The [independent integration note](../../output/experience-upgrade-2026-11-15/independent-integration-review.md) identifies reviewer scope and limits; the visual record separately describes concept comparisons. Authors did not claim independent author review of their own modules.

## Demo boundaries and verification limits

Everything uses local synthetic records. AI is deterministic prepared assistance with bounded source scope; evidence intake selects a synthetic receipt; GRC delivery is a local simulation. No live model, live research, production authentication, bank connection or external message is used. Presenter perspectives enforce local model/handler authority and demonstrate roles; they are not production access control. Persistence is tab-local sessionStorage with visible failure/recovery handling. Current ratings, proposed protection, completed work, review and management decisions remain separate.

HTML output is real, self-contained and printable. The native operating-system print dialog was not completed. Screen-reader testing, physical touch devices, actual 200% browser zoom, blocked-storage browser injection and OS-level reduced-motion emulation were not manually exercised. Narrow reflow, keyboard/focus, sample contrast, synthetic state/model checks and source review provide the evidence recorded above; no blanket WCAG or production-readiness certification is claimed. These are verification limits, not omitted app workflows.

No paid or hosted test resources were created. Disposable QA/artifact tabs were closed and the viewport override reset. The local preview on port 8000 is intentionally retained as the user-facing result; it serves the workspace without a backend. The user-facing tab shows the reviewed four-risk version 2. Stop the preview with Ctrl+C in its server session when no longer needed. Earlier audit artifacts and the three design references are retained.

## Subsequent spacing correction

The owner's follow-up identified cramped refresh/discovery cards that the initial finish review missed. A focused UX/CX pass corrected shared card spacing, action alignment, proposal comparison and checkbox grouping, review descriptions and report line length. See the [November 15 follow-up evidence](../../output/spacing-polish-2026-11-15/review.md) and its new source hashes. The earlier fingerprint above remains the record of the original upgrade, not the later stylesheet revision.

## Banking-leader follow-up — source graph 20261115.20

The later independent walkthrough and fixes are recorded in the [current follow-up ledger](../ux/bank-leader-followup-2026-11-15.md). All 35 current verification scripts pass, with fresh desktop/phone evidence and no application console errors. Earlier 16-script counts and source fingerprints above remain historical. The original user draft, not a staged reviewer scene, is retained in the user-facing tab.
