# Independent persona QA — second-line bank leader

Reviewed November 14, 2026 as a simulated Head of Operational Risk / senior RCSA challenger.

**Verdict: Ready with fixes.** The principal banking story is credible and demonstrable. No P1 credibility blocker was observed. The main fix is to deliver and retain the reviewer's clarification rationale. Two smaller issues could misrepresent AI coverage and assessment ownership during questions from leadership.

| Dimension | Score / 5 | Assessment |
| --- | --- | --- |
| Clarity | 4 | Stages and open decisions are easy to follow; a returned challenge needs clearer context. |
| Credibility / rigor | 4 | Strong evidence limits and authority boundaries; clarification rationale is missing from the owner workflow and historical record. |
| AI value | 3 | Useful source connection and drafting assistance; its four scripted response checks imply broader coverage than they actually provide. |
| Visuals | 4 | Restrained, readable executive presentation with useful heatmap, source network and risk trajectory. |
| Leadership-demo readiness | 4 | Suitable for a narrated leadership demonstration after the focused fixes below. |

## Scope and method

Read `docs/operations/demo-runbook.md` and `docs/ux/FEEDBACK_REFRESH.md` before testing. Used the real rendered app at `http://127.0.0.1:8000/src/`, in isolated headless installed Chrome contexts at 1440 × 1000. No shared business browser, app code, fixtures or external systems were changed. Screenshots were saved in this persona's evidence directory and actually opened for visual inspection. Code was read only after a UI concern arose, to verify its cause. Other persona reports were not consulted.

The main route covered Dashboard → What changed → Inherent risk → Controls → shared-source discovery → Residual risk → explicit AI-assisted mitigation response → owner attestation and version 1 → custom second-line challenge → deliberately insufficient owner response and version 2 → Return for clarification → revised human response and version 3 → reviewer rationale/attestation/conclusion → Reports and narrative confirmation → prior version inspection → second-line dashboard. A separate isolated context covered creating and mapping a proposed independent verification control, dismissing the source inference, and submitting an acceptance request.

This is a synthetic, scripted leadership demo. No production backend, live model, authentication, institutional policy completeness or real acceptance authority was expected.

## Findings

### 1. P2 — Return-for-clarification rationale does not reach the owner or its history entry

**Route:** `#/assessment/review` (second-line conclusion and first-line response views share this route, selected by role/state); also `#/reports` → Decision history.

**Steps:** Submit an owner-attested assessment; send a second-line challenge; submit the short response “Staff have been reminded of the callback procedure.” Select **Return for clarification**, enter a specific rationale (“A reminder does not establish operating effectiveness. Clarify the basis for residual likelihood 3, the urgent-wire population, and how independent source verification will be demonstrated.”), attest and record. Switch to **View as assessment owner**. Expand Decision history. Later complete a revised response and a final reviewer conclusion, then inspect the report history.

**Observed:** The owner sees the original question and prior response, without the new clarification rationale or a clear returned-response callout. The history says only “Returned the response for clarification.” It has no **Read recorded text** disclosure, whereas the original question and owner responses do. The old rationale remains in the reviewer's editable form until replaced, but is not retained in that return event. The completed report history still omits it. Targeted code inspection confirmed `completeReview()` records the return event without passing `reviewerRationale` as recorded text (`src/scripts/demo/model.js:65`).

**Business implication (inference):** The owner cannot act on the additional reason for rejection from the work screen, and leadership cannot reconstruct why version 2 was insufficient after the reviewer writes the final conclusion. That weakens the demonstration of effective human challenge and its audit trail.

**Smallest fix:** Attach the entered reviewer rationale to the return decision event, show it beside the original question in the owner response view, and retain it in Decision history after subsequent conclusions. No workflow expansion is needed.

**Evidence:** [Owner after return](../../../assets/screenshots/persona-qa/second-line/05-owner-after-return.png), [return history](../../../assets/screenshots/persona-qa/second-line/06-return-history.png), [completed report history](../../../assets/screenshots/persona-qa/second-line/13-final-history.png).

### 2. P2 — AI coverage wording overstates what was checked after the reviewer changes the question

**Route:** `#/assessment/review` → second-line question → first-line response view.

**Steps:** Replace the suggested question with: “Please justify residual likelihood 3 against the untested urgent route. What evidence and interim limits support any control credit, and how will targeted testing verify source independence where the dependency remains unconfirmed?” Send it, then as owner choose **Draft a complete response**.

**Observed:** The generated response proposes future test scope and completion evidence. It does not explain residual likelihood 3 or provide interim limits. Nevertheless, under **Does the response address the question?**, all four rows display **Addressed**. The screen does say the reviewer decides sufficiency, and it makes no risk decision automatically. Targeted inspection confirmed the four checks are fixed keyword checks, independent of the edited question (`src/scripts/demo/model.js:50–56`).

**Business implication (inference):** During a natural leadership challenge, the UI can suggest that the AI has assessed the complete question when it has only detected four scenario topics. The risk is perceived diligence, not automatic acceptance or a changed rating.

**Smallest fix:** Scope the heading to “Suggested response coverage” and the positive status to “Mentioned in draft”; rename **Draft a complete response** to **Draft a response**. Make the four scenario topics' limited scope explicit so custom rating questions remain visibly for human review. This can remain entirely scripted.

**Evidence:** [Custom question, draft and four positive checks](../../../assets/screenshots/persona-qa/second-line/07-scripted-coverage.png).

### 3. P2 — Perspective switch labels the reviewer as assessment owner

**Route:** `#/assessment/review`, `#/reports`, and `#/work` with Second line selected.

**Steps:** Submit as Alex Morgan; choose **View as second-line reviewer**; inspect the page footer. Complete review and open Reports; compare the review-record panel with the footer.

**Observed:** The footer changes to **Assessment ownership: Jordan Lee**. In Reports, the review record correctly says **Owner Alex Morgan / Reviewer Jordan Lee**, producing two conflicting ownership statements on the same page. Targeted inspection confirmed the footer uses the selected role to choose the owner name (`src/scripts/demo/app.js:19`).

**Business implication (inference):** A leadership audience could reasonably read the second line as taking ownership of the first-line assessment. This undercuts an otherwise clear separation of roles, although the actual submitted owner and reviewer record remain correct.

**Smallest fix:** Keep **Assessment owner: Alex Morgan** fixed across perspectives, or label the changing value **Viewing as: Jordan Lee · Second line**.

**Evidence:** [Second-line challenge footer](../../../assets/screenshots/persona-qa/second-line/03-second-line-challenge.png), [report with correct record and conflicting footer](../../../assets/screenshots/persona-qa/second-line/08-final-report.png), [second-line dashboard footer](../../../assets/screenshots/persona-qa/second-line/09-reviewed-dashboard.png).

## What works

- Evidence applicability is unusually clear for a demo. The September 15 test says 25 standard wires, urgent route out of scope, and pre-October 5 change. No clean urgent-route effectiveness conclusion was implied in the tested screens.
- Inherent High 16, prior residual Moderate 8 and current residual Elevated 12 are separate and coherent. Likelihood and impact rationales, definitions, quarterly horizon and tolerance up to 9 are inspectable. The reviewer can inspect rating stages but the submitted inputs are read-only.
- The shared-source discovery shows both procedure excerpts and offers confirmation, qualification or dismissal. My qualification propagated into the handoff, reviewer conclusion panel, report and dashboard without changing the rating. The owner could edit the residual rationale to preserve uncertainty.
- The proposed independent contact control remained visibly **Proposed · not implemented**, with **Not implemented or tested** operation and no present protection. Creating and mapping it left the residual draft at Elevated 12. See [proposed control evidence](../../../assets/screenshots/persona-qa/second-line/10-proposed-control.png).
- AI response assistance required an explicit review, use and save. The owner chose strategy, rationale, ownership, action, date and closure evidence. Editing the residual rationale required renewed response review before residual confirmation; the UI did not silently reuse its applicability.
- A deliberately incomplete response could be submitted with human attestation and then returned by the reviewer. The machine did not decide sufficiency. Owner re-attestation and versions advanced, and version 1 remained inspectable with its earlier recorded handoff and closure evidence.
- Completing second-line review and confirming the report narrative did not reduce current risk, close testing, or accept the exposure. The final report and dashboard showed **Review completed / Testing action open / Management decision pending**, Elevated 12, and a pending management item. See [report](../../../assets/screenshots/persona-qa/second-line/08-final-report.png) and [dashboard](../../../assets/screenshots/persona-qa/second-line/09-reviewed-dashboard.png).
- An explicitly created acceptance request remained **decision pending** after assessment submission. Its report kept Elevated 12 and **Review in progress**, and did not invent approval or implementation of the proposed control. See [submitted acceptance request](../../../assets/screenshots/persona-qa/second-line/12-pending-acceptance-submitted.png).

## Review limits and preferences

This is one simulated senior second-line assessment, not bank policy approval. Desktop rendered behavior was exercised; mobile, screen reader behavior, export/print, every response strategy, every mapping replacement/removal combination, and all supporting-risk edits were not exhaustively tested. The acceptance variant was checked through submission/report, while the mitigation variant completed the full challenge/clarification/conclusion cycle. Browser-session synthetic records were the only data used.

As a preference rather than a defect, a leadership review would be slightly easier if the review screen showed compact inherent/control/residual context together; the existing stage navigation already provides that access. I would keep the restrained visual style and the explicit open-decision status strip.
