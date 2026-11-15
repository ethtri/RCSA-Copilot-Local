# Executive sponsor persona QA — round 2

Independent retest on November 14, 2026, as the same simulated Chief Risk Officer preparing an executive risk committee demonstration. The original report is preserved. I did not implement the revision or read other round-2 persona reports.

**Current verdict: Ready.** The November 14 follow-up below independently verified the remaining QA-07 wording fix before and after an attested submission. QA-05, QA-06, QA-07 and QA-08 are now verified fixed. No remaining material issue was observed in the focused follow-up.

**Initial round-2 verdict, retained as the historical observation: Ready with fixes.** The revised report is substantially more useful to leadership: it names the risk, makes the three-risk assessment scope explicit, gives a real decision question with an owner/forum/date, and separates that decision from the testing action. Ownership and narrow report layout are fixed. One acceptance-branch wording inconsistency remains outside the report: an unsubmitted draft request is still called “decision pending” on the residual/review screens and in the handoff summary.

## Scorecard

| Dimension | Score / 5 | Reason |
|---|---:|---|
| Clarity | 4 | The report now explains the focus, exposure, open action and executive ask without narration. Draft-acceptance status labels still disagree across screens. |
| Credibility / rigor | 4 | Owner/reviewer separation, evidence limitations, current risk and separate acceptance authority are clear. The remaining lifecycle wording deserves correction. |
| AI value | 4 | Source comparison and response drafting remain useful. The coverage panel now calls its output topic cues and “Mentioned in draft,” avoiding a claim that mentioning a topic establishes sufficiency. |
| Visuals | 4 | The restrained forest/white design, chart hierarchy and relationship evidence remain polished. The report now adapts cleanly to the checked desktop, tablet and phone widths. |
| Leadership-demo readiness | 4 | The central story and report are ready to demonstrate. Correct the acceptance draft wording before exploring that branch with a skeptical committee. |

## Per-ID retest

### QA-05 — Verified fixed: assessment owner and reviewer remain distinct

The second-line report review record identifies **Owner Alex Morgan / Reviewer Jordan Lee**. Its footer now says **Assessment owner: Alex Morgan**. I switched the report to First line and back to Second line, then opened second-line Review: the footer stayed Alex in all of those states. The perspective/avatar still changed appropriately.

Evidence: [completed second-line report](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-1600.png), [second-line review and owner footer](../../../../assets/screenshots/persona-qa/round-2/executive/11-second-line-review-owner.png).

### QA-06 — Verified fixed: named risk, scope and risk-specific drill-downs

Reports now states **Focus: Unauthorized wire transfer** and **1 of 3 risks in this assessment**. The risk-position card also names the risk. The opening and detailed narrative use the risk name.

I clicked **View all 3 risks**; it opened Dashboard with the assessment register available. I then selected **Incorrect payment details**, returned to Reports, and clicked the report's inherent score bar: it opened **Unauthorized wire transfer**, High 16. I repeated the stale-selection check with **Delayed execution → report prior residual bar** and **Incorrect payment details → report current residual bar**. Both opened the unauthorized-wire residual assessment with prior 8/current 12, rather than the previously selected supporting risk. The prior bar remains an assessment drill-down, not a historical-source dialog; that behavior is clear enough for the stated “inspect this risk's assessment” instruction.

Evidence: [named report and scope](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-1600.png), [inherent bar after supporting-risk selection](../../../../assets/screenshots/persona-qa/round-2/executive/03-scorebar-main-risk-after-supporting.png), [current bar after supporting-risk selection](../../../../assets/screenshots/persona-qa/round-2/executive/16-current-scorebar-after-supporting.png), [prior bar after supporting-risk selection](../../../../assets/screenshots/persona-qa/round-2/executive/17-prior-scorebar-after-supporting.png).

### QA-07 — Verified fixed in November 14 follow-up

The original round-2 result was **Partial**. Its observations below are preserved without rewriting them; the dated follow-up at the end records verification that the remaining draft labels are now fixed.

**Verified improvements:** In the completed strengthening-controls scenario, the report asks whether urgent-wire processing may continue under current arrangements while targeted testing and independent verification are completed. It identifies **Head of Payments Operations**, **Payments Risk Committee**, and **target decision date Nov 19, 2026**. The testing action separately shows **Action owner Payments Operations / Action due date Nov 28, 2026 / Open**. The narrative carries the decision context, and the decision block explicitly preserves current risk and open planned measures.

I also tested the acceptance branch through the UI, deliberately entering **Dec 7, 2026** as the acceptance review date. The report preserved that as **Requested acceptance review date**, separate from the **Nov 19 target decision date**; it did not mislabel it as an action due date. Before submission, the report said **Draft decision request**, **Proposed request for submission**, and **acceptance has not been granted**. After completing the required confirmations, attesting and sending for review, it changed to **Decision pending / Time-bound acceptance pending**, kept the review date, and still explicitly withheld approval.

Additional negative states behaved correctly in the report:

- Fresh initial state: **Draft assessment / Response not yet recorded / Decision request not yet established**; current confirmed risk was 8, not the unconfirmed draft 12.
- Synthetic within-tolerance branch: I changed the main residual assessment to L2/I3, confirmed 6, and opened Reports. It showed **No above-tolerance decision required**, with no decision request or pending-decision block.

**Remaining P2 — unsubmitted acceptance is called pending outside Reports:** Create a Request acceptance response at the initial main residual assessment, confirm the residual assessment, and stop before Send for review. On `#/assessment/residual`, the response card says **Request acceptance · Acceptance decision pending**. On `#/assessment/review`, Management disposition correctly says **Draft decision request**, but the same screen's status line says **Acceptance request · decision pending**. The AI-assisted handoff summary also says **Acceptance decision pending**. I observed this both after the normal scope/inherent/control confirmations and in a separate short reproduction before submission. Reports itself correctly calls the same request a draft.

**Executive implication:** This does not falsely grant approval, but it gives two different lifecycle accounts of the same unsent request. The report fix is sound; the assessment screens can still imply that a request is already awaiting a management decision when it remains a submission draft.

**Smallest fix:** Use the same submission-aware decision wording on the residual card, review status strip and generated handoff summary that Reports uses: “Draft acceptance request” before submission and “Acceptance decision pending” once submitted. No new workflow or authority is needed.

Evidence: [completed management decision and separate action](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-1600.png), [unsubmitted acceptance report, with Dec 7 review date](../../../../assets/screenshots/persona-qa/round-2/executive/07-acceptance-unsubmitted.png), [submitted acceptance report](../../../../assets/screenshots/persona-qa/round-2/executive/09-acceptance-submitted.png), [within-tolerance report](../../../../assets/screenshots/persona-qa/round-2/executive/10-report-within-tolerance.png), [unsubmitted residual card](../../../../assets/screenshots/persona-qa/round-2/executive/08-acceptance-card-unsubmitted.png), [unsubmitted review with conflicting labels and handoff](../../../../assets/screenshots/persona-qa/round-2/executive/15-review-draft-acceptance-status.png).

### QA-08 — Verified fixed: report fits checked widths and exposes current position

I rendered the completed report at all requested widths:

| Viewport | Document scroll width | Current position |
|---|---:|---|
| 1600 × 1000 | 1600 px | Elevated 12 visible inside card |
| 834 × 1000 | 834 px | Elevated 12 visible inside card |
| 390 × 844 | 390 px | Elevated 12 visible next to prior 8 inside card |

The old 544 px document overflow at a 390 px viewport is gone. The report cards, decision question, dates, management response, source index and owner record stay within the page. The narrow comparison table has local horizontal scrolling; the prior/current trajectory and labels remain visible without scrolling the document sideways.

Evidence: [1600 report](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-1600.png), [834 report](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-834.png), [390 report](../../../../assets/screenshots/persona-qa/round-2/executive/05-report-complete-390.png). Screenshots were opened and visually inspected in addition to checking browser dimensions.

## Overall leadership usefulness and main-story sanity

The revisions improve the product rather than merely adding caveats. In the completed report I can now answer: which risk, how much it moved, what evidence limits protection, what Operations must do, what the committee must decide, who owns each next step and the two relevant dates. This is a more credible close to an 8–10 minute demonstration.

The main desktop dashboard remains simple and polished. I re-opened the source-discovery scene and callback procedure, then traced the report's procedure-change claim to the revised wire procedure dialog. The procedure supports the urgent-route discussion; it does not establish that the urgent route has been tested. The visible shared-source interpretation remains a human-confirmed relationship rather than automatic rating credit. [Dashboard](../../../../assets/screenshots/persona-qa/round-2/executive/01-dashboard-start-1600.png), [discovery](../../../../assets/screenshots/persona-qa/round-2/executive/13-source-discovery.png), [report source trace](../../../../assets/screenshots/persona-qa/round-2/executive/12-report-source-trace.png).

I re-opened the challenge scene as the owner. The short reminder omitted all four topic cues; **Draft a response** added urgent population, changed-contact records, independent verification and closure evidence. The revised panel says **Topic cues only. Review the full question; the reviewer decides sufficiency**, and labels the cues **Mentioned in draft**. That is a stronger demonstration of useful assistance with appropriate limits than treating topic presence as completeness. [Assisted response and topic cues](../../../../assets/screenshots/persona-qa/round-2/executive/14-ai-response-coverage.png).

No new material regression was observed in these checks. The remaining QA-07 issue is a continuation of lifecycle wording consistency, not a new claim that the demo grants acceptance.

## Preferences and minor copy observations — not blockers

- On a phone, a short horizontal-scroll cue would help explain that the score-comparison table has more content to the right. The current-position summary is already readable, so this is polish rather than a return of QA-08.
- The within-tolerance/no-response report still says “create the required response” under Management response while correctly saying no above-tolerance decision is required. “Review whether a response is needed” would be more precise for this branch. No false pending decision or approval was shown there.
- The report is longer after adding the decision block, but the addition earns its space. For the live demo, show the risk position, management ask and action, then use sources and decision history as optional depth. Avoid reading the repeated narrative aloud twice.

## Method and limits

Used a fresh isolated headless Chrome browser through Playwright at `http://127.0.0.1:8000/src/`; did not use the user's IAB/shared browser. Actual interactions included scope/register links, all three report score bars after supporting-risk selection, role switches, source dialogs, response creation, acceptance date editing, required first-line confirmations, attestation/submission and AI response drafting. Used prepared scenes for completed review and challenge depth. This was a focused independent retest, not a timed uninterrupted rehearsal or an exhaustive workflow/accessibility audit.

All findings are based on rendered UI, actual transitions, screenshots and browser measurements, not implementation claims or code inference. Page errors collected in the main browser page were empty. Synthetic local interactions stayed in owned browser tabs. No app/shared-data edits, publishing, live backend/model requirements or real institutional compliance claims were introduced. The isolated browser is closed after evidence capture.

## Follow-up — November 14, 2026: remaining QA-07 independently verified fixed

This addendum follows the initial round-2 review above. It uses a newly launched isolated headless Chrome browser and fresh local session, not the earlier browser state. I did not assume the implementation claim was correct. The previous observations and screenshots are retained as evidence of the earlier revision.

**Result: QA-07 Verified fixed; headline verdict Ready.** All five scorecard dimensions remain 4/5. The earlier readiness/credibility reasons referring to an outstanding acceptance wording issue are superseded by this follow-up. The remaining phone-table scroll hint and repeated narrative comments are presentation preferences, not blockers.

### Before submission

I followed the normal first-line sequence from a fresh dashboard: scope confirmation, inherent confirmation, control confirmation, shared-source confirmation, then residual response creation. I chose Request acceptance, entered a rationale, deliberately set the acceptance review date to **Dec 7, 2026**, created the response and confirmed residual risk. I stopped before attestation/submission to inspect every previously inconsistent location.

- Residual response card: **Request acceptance · Draft acceptance request**.
- Review status strip: **Draft assessment / Draft acceptance request / Draft decision request**.
- AI-assisted handoff: **Response: Request acceptance. Draft acceptance request. Management disposition is tracked separately.**
- Review disposition: **Draft decision request**.
- Report: **Draft decision request**, proposed request for submission, and explicit **acceptance has not been granted**. The narrative said submission and second-line review remained outstanding.

There was no pending-decision claim in these current, unsubmitted locations.

Evidence: [draft residual card](../../../../assets/screenshots/persona-qa/round-2/executive/18-followup-draft-residual.png), [draft review status and handoff](../../../../assets/screenshots/persona-qa/round-2/executive/19-followup-draft-review.png), [draft report](../../../../assets/screenshots/persona-qa/round-2/executive/20-followup-draft-report.png).

### After attested submission

I returned to Review, checked the owner attestation and clicked Send for review. The review status became **Review in progress / Acceptance decision pending / Decision pending**. The residual card became **Request acceptance · Acceptance decision pending**, with the submitted source record preserved. The report changed to **Decision pending / Time-bound acceptance pending**, and said that second-line review was in progress and the request awaited a separate decision. It continued to state **acceptance has not been granted**, and current confirmed risk remained **Elevated 12**.

The report kept **target decision date Nov 19, 2026** distinct from my **requested acceptance review date Dec 7, 2026**. The owner and forum stayed **Head of Payments Operations / Payments Risk Committee**. No action due date was invented for the acceptance response.

Evidence: [submitted report at 1600](../../../../assets/screenshots/persona-qa/round-2/executive/21-followup-submitted-report-1600.png), [submitted residual card](../../../../assets/screenshots/persona-qa/round-2/executive/23-followup-submitted-residual.png).

### Sanity checks

The submitted acceptance report at **390 × 844** had document scroll width **390 px**. Its current-position label **Elevated 12** remained inside the card (right edge 346 px), and the decision question, dates and explicit withholding of approval remained readable. [Narrow acceptance report](../../../../assets/screenshots/persona-qa/round-2/executive/22-followup-submitted-report-390.png).

I then loaded the completed strengthening-controls scene and re-opened Reports. The main decision brief still named the risk and one-of-three scope; asked whether urgent-wire processing could continue; identified the decision owner/forum; and separated **target decision Nov 19** from **action due Nov 28**. Review completion, open testing and pending disposition remained separate. The report preserved **Owner Alex Morgan / Reviewer Jordan Lee** and the Alex owner footer. [Main decision brief](../../../../assets/screenshots/persona-qa/round-2/executive/24-followup-main-decision-brief.png).

In a separate fresh tab, I confirmed a synthetic main residual position of L2/I3, score 6, with no response. Reports correctly showed **No above-tolerance decision required**. Its response guidance is now **Review whether a response is needed and record any follow-up**, fixing the minor “required response” copy noted earlier. [Within-tolerance copy](../../../../assets/screenshots/persona-qa/round-2/executive/25-followup-within-tolerance-copy.png).

All fresh screenshots were opened and visually inspected. Main-page browser errors were empty. This was a focused acceptance-lifecycle and report sanity retest, not a new exhaustive audit. No remaining material issue was observed. No application edits or publishing were performed, and the fresh isolated browser was closed after evidence capture.
