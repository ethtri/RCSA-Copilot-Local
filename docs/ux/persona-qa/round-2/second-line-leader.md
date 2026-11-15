# Independent persona QA — second-line bank leader, round 2

Reviewed November 14, 2026 as the same simulated Head of Operational Risk / senior RCSA challenger. The reviewer did not implement these revisions.

**Verdict: Ready** for the stated synthetic, scripted bank-leadership demonstration. QA-03, QA-04 and QA-05 are verified fixed in the rendered UI. No new material regression was observed in this review's exercised paths. The initial report is preserved at `docs/ux/persona-qa/second-line-leader.md`.

| Dimension | Round 1 | Round 2 / 5 | Reason |
| --- | --- | --- | --- |
| Clarity | 4 | 4 | Clarification context is now visible; the named management decision also makes the remaining executive action clearer. |
| Credibility / rigor | 4 | 5 | The exact return rationale survives a later final conclusion; owner attribution and evidence/decision boundaries remain coherent. |
| AI value | 3 | 4 | Useful bounded drafting and topic cues, with custom human closure requirements preserved. |
| Visuals | 4 | 4 | Readable restrained desktop presentation; the clarification callout is clear and appropriately prominent. |
| Leadership-demo readiness | 4 | 5 | The main challenge/return/revision/conclusion/report story now holds under an edited reviewer question. |

## Per-ID verification

| Original ID | Result | Exact observed behavior | Evidence |
| --- | --- | --- | --- |
| QA-03 — return rationale missing from owner view/history | **Verified fixed** | After returning owner response version 2, the owner view at `#/assessment/review` displayed a **Returned for clarification · version 2** callout attributed to **Jordan Lee · reviewer**, containing the exact entered rationale. After version 3, a different final reviewer rationale, completed review and report-narrative confirmation, the original exact return text was still available under **Read recorded text** for its return event in `#/reports` → Decision history. | [Owner callout](../../../../assets/screenshots/persona-qa/round-2/second-line/03-return-rationale-owner.png), [final report/history](../../../../assets/screenshots/persona-qa/round-2/second-line/05-report-retained-history.png), [retained exact return detail](../../../../assets/screenshots/persona-qa/round-2/second-line/06-retained-return-detail.png) |
| QA-04 — AI wording overstates completeness for edited question | **Verified fixed** | With a custom question asking for residual likelihood 3 justification and interim operating limits, the response UI now says **Draft a response**, **Suggested response coverage**, **Topic cues only. Review the full question; the reviewer decides sufficiency.** Positive rows say **Mentioned in draft**, and short-response rows say **Not mentioned**. The scripted draft still addresses its scenario topics rather than independently answering the custom rating question, but the UI no longer claims completeness or sufficiency. | [Edited question, bounded wording and preserved closure field](../../../../assets/screenshots/persona-qa/round-2/second-line/02-bounded-ai-preserved-closure.png) |
| QA-05 — reviewer mislabeled assessment owner | **Verified fixed** | In Second line perspective, the review screen, final report and dashboard retain **Assessment owner: Alex Morgan** while Jordan Lee appears as reviewer. The report review record separately shows **Owner Alex Morgan / Reviewer Jordan Lee**. | [Second-line review](../../../../assets/screenshots/persona-qa/round-2/second-line/01-second-line-owner-stable.png), [final conclusion](../../../../assets/screenshots/persona-qa/round-2/second-line/04-final-human-conclusion.png), [reviewed dashboard](../../../../assets/screenshots/persona-qa/round-2/second-line/07-reviewed-dashboard.png) |

## Reproduction and retained-text checks

Used fresh isolated installed Chrome contexts against `http://127.0.0.1:8000/src/` at 1440 × 1000. Read the runbook and feedback scope before testing. This was direct interaction with the rendered app, not acceptance of the implementation agent's pass claim. Saved screenshots were actually opened with the image viewer. No application source inspection was needed this round. No app code, fixtures, shared browser or external systems were changed; other round-2 persona reports were not read.

The main context started at the dashboard and completed scope, inherent High 16, control confirmation, qualified shared-source discovery, residual Elevated 12, explicit AI-assisted response creation, owner attestation and submission version 1. It then used a custom second-line challenge, submitted a deliberately short response as version 2, returned it for clarification, submitted a human-edited version 3, recorded a different final reviewer rationale, completed review and confirmed the report narrative. Earlier versions were inspected from the report history.

The custom question was:

> Please justify residual likelihood 3 against the untested urgent route. What current evidence and interim operating limits support any control credit, and how will targeted testing verify independent source lineage?

The exact return rationale entered and later found unchanged in the completed report history was:

> R2-RETURN-EXACT: A reminder does not justify residual likelihood 3. Explain the current control credit, interim operating limits, and source-lineage test evidence. Retain the named Payments leadership sign-off closure condition.

The later final rationale deliberately used different text, beginning **R2-FINAL-EXACT: Sufficient for this assessment review.** It was displayed as Jordan Lee's conclusion on reviewed version 3. The report history still showed the original R2-RETURN-EXACT text afterward, demonstrating that the return reason was not replaced by the final conclusion.

The custom closure condition was set during explicit risk-response creation:

> CLOSURE-R2: Provide the full post-change urgent-wire population, independently selected amended-contact samples, exception results, proof of contact-source independence, and named Payments leadership sign-off before any closure decision.

**Draft a response**, **Use a shorter draft**, and **Draft a response** again after the return each preserved that field exactly. The final report displayed it unchanged, and inspecting both version 1 and version 3 showed the same recorded closure condition. This was a human requirement preservation check, not merely a comparison with the fixture's default text.

## Authority and coherence sanity checks

- The evidence dialog still limits the September 15 sample to **25 standard wires; urgent exception route not in scope**, completed before the October 5 change. No urgent-route operating effectiveness was inferred from it.
- Inherent High 16, prior residual Moderate 8 and current confirmed residual Elevated 12 remained separate. Source qualification and proposed protection did not change those numbers automatically.
- Review completion and report confirmation left the mitigation action **Open**, residual risk **Elevated 12**, and the management decision **Decision pending**. The report now identifies the question about continuing urgent-wire processing, **Head of Payments Operations**, **Payments Risk Committee**, and **Nov 19, 2026** target date. The action retains its separate Nov 28 due date.
- The second-line dashboard showed zero unresolved review questions and one open action after completion, while retaining the pending management decision and outstanding urgent-route evidence. See [dashboard](../../../../assets/screenshots/persona-qa/round-2/second-line/07-reviewed-dashboard.png).
- In a second fresh context, creating and mapping the suggested independent verification control did not establish present protection. The UI required an owner coverage assessment before control confirmation and explicitly said the proposed control was not implemented/tested and provided no current protection. I recorded expected design coverage, dismissed the suggested source relationship without claiming independence, and kept residual risk at Elevated 12.
- In that separate context, I explicitly created **Request acceptance**, confirmed residual risk and submitted the assessment. The Second line report showed **Review in progress**, **Acceptance request recorded**, **Decision pending**, **Time-bound acceptance pending**, and **acceptance has not been granted**. It retained Elevated 12 and separated the requested Nov 28 acceptance review date from the Nov 19 management target decision date. There was no automatic acceptance or current-risk reduction. See [acceptance-pending report](../../../../assets/screenshots/persona-qa/round-2/second-line/08-acceptance-pending.png).

## New material regressions

None observed in the exercised paths. This is not a claim of exhaustive application coverage or verification of every other persona's assigned findings.

## Preferences and limits

My earlier preference for a compact inherent/control/residual summary on the reviewer screen remains optional; the stage navigation already exposes that context. It is not an open finding or a condition on the Ready verdict.

The review evaluates the existing scripted demo, not institutional policy adequacy or a production backend/model. Desktop flows were exercised; mobile, assistive technology, export/print, every strategy and every mapping combination were not exhaustively retested. The mitigation path completed the entire review cycle; the acceptance variant was checked through submission and pending report state. Only this persona's new report and evidence assets were written, and the isolated review browser was closed after inspection.

## Follow-up — submission-aware acceptance wording

After the shared status wording revision, a new isolated Chrome context repeated acceptance creation, residual confirmation, owner attestation and submission. **Ready remains the verdict.** No problem was observed in this targeted check.

- **Before submission:** the residual response card said **Request acceptance · Draft acceptance request**. The review strip said **Draft assessment / Draft acceptance request / Draft decision request**; the conclusion showed **Draft decision request**, and the handoff included **Draft acceptance request**. Checking the owner attestation alone did not change the request from draft to pending. See [draft residual](../../../../assets/screenshots/persona-qa/round-2/second-line/09-followup-draft-residual.png) and [draft review/handoff](../../../../assets/screenshots/persona-qa/round-2/second-line/10-followup-draft-review.png).
- **After Send for review:** the submitted handoff and review strip said **Acceptance decision pending**; the management disposition said **Decision pending**. In Second line perspective, the residual card also said **Acceptance decision pending**. See [submitted residual](../../../../assets/screenshots/persona-qa/round-2/second-line/11-followup-submitted-residual.png).
- The Second line report retained **Elevated 12**, **Review in progress**, **Time-bound acceptance pending**, and explicitly **acceptance has not been granted**. The owner remained **Alex Morgan**, separately from reviewer **Jordan Lee**. No approval or automatic risk reduction occurred. See [submitted report](../../../../assets/screenshots/persona-qa/round-2/second-line/12-followup-submitted-report.png).

All four follow-up screenshots were opened for visual inspection. This was a narrow acceptance-status recheck, not a repeat of the entire review cycle or an assessment of other persona findings. The owned browser context was closed after this check.
