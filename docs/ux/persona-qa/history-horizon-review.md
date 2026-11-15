# Independent RCSA challenge: history, external intelligence and final review

Reviewed November 14, 2026. Scope: current static sample-data experience, both lines. Recommendations are product judgments grounded in the primary sources below, not a universal regulatory method or compliance certification. No application files or user browser sessions were changed by this review.

## Expert verdict

The user is right: history and external context would materially strengthen the assessment story. Their value is explaining why a judgment changed or remained appropriate, not supplying more scores or automatically increasing a rating. The final assessment review should be a decision-ready assessment report with unmistakable workflow state and submission action.

Basel ORR 10.44 connects self-assessment with internal/external events, control assurance, metrics and scenarios. Comparative analysis can test whether self-assessments fit observed outcomes. ORR 10.56 includes relevant external developments and tolerance concerns in reporting. This supports combining these inputs; it does not prescribe quarterly ratings, this demo's scale or an automatic AI conclusion. [Basel operational-risk principles, ORR 10.44 and 10.56](https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/orr/10).

## 1. Show history with an explanation, not just a line

Smallest useful implementation: one four-quarter chart on inherent/residual assessment and the final review. Show both series with clearly labelled scores, plus a separate visual treatment for the current unconfirmed draft. Keep actual last-confirmed risk authoritative until owner confirmation. Place the procedure-change/event/test dates beside the series, not on an invented transaction-rate axis.

An illustrative main-risk history can use Q1–Q3 2026 inherent 16 / residual 8, then Q4 owner draft 16 / 12. These are authored fictional assessment records, not bank measurements. The Q3 residual must reconcile to the existing prior value. The current point should read from the actual user state, so editing a rating updates the draft without rewriting past records. Mark Q4's scope expansion to the urgent route; a larger scope is a comparability caveat.

AI should prepare three short answers:

- **Why inherent risk is unchanged:** the prior assessment already recognised material impersonation exposure; the new route warrants review, not an automatic new score.
- **Why residual risk changed:** likelihood 2→3 reflects the owner’s consideration of the new route, evidence scope and source dependency; planned verification/testing has not established current protection.
- **What could change the conclusion:** a defined post-change population, verified independent sources, actual control results and owner reassessment. No mechanical point reduction follows from a clean sample.

For supporting risks, show an unchanged history only with the PI-12/QI-04 qualification visible. A flat score does not mean no change occurred. Avoid fixed narrative bands when the user can edit ratings. Expose separate likelihood and impact in detail; product scores are ordinal prioritisation, not probabilities or proportional loss estimates.

## 2. Add external intelligence with tested relevance

Use a compact **Outside the bank / Why it may matter here / What our records show / What remains unknown** card in What changed, with optional source detail. The first-line owner uses it to assess applicability; second line uses it to challenge whether the owner considered the relevant external pattern. Both should see the reporting period and source date/age.

Verified comparable FBI IC3 figures:

| Reporting year | BEC complaints | Reported BEC losses |
| --- | ---: | ---: |
| 2024 | 21,442 | $2,770,151,146 |
| 2025 | 24,768 | $3,046,598,558 |

The calculated year-on-year changes are **15.5% complaints** and **about 10.0% reported losses**. They describe reported BEC complaints, not this bank's incident rate or a measure of all fraud prevalence. Use BEC-to-BEC comparison; the report's overall cybercrime growth is a different measure. IC3 notes classifications and losses are point-in-time and may change, and duplicate complaints may exist. The older series is not uniformly increasing. [FBI 2024 report, printed pp. 9–10 and 18–19](https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf), [FBI 2025 report, printed pp. 7–8 and Appendix C p. 62](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf).

FinCEN's July 16, 2019 advisory is a useful longstanding pattern reference: review authentication, authorisation and transaction-change practices, and consider multiple communication means or other authorised people when checking suspicious emailed instructions. It is not a newly issued 2026 threat alert. [FinCEN FIN-2019-A005, p. 8](https://www.fincen.gov/system/files/advisory/2019-07-16/Updated%20BEC%20Advisory%20FINAL%20508.pdf).

Suggested prepared analysis: **“Reported BEC increased in 2025. The pattern is relevant to changed payment instructions; our near miss also involved amended contact details. The external totals do not establish our attempted-fraud rate. Review whether urgent requests use a verification source independent of the changed record.”**

Optional depth: FBI's 2025 report discusses generative text and voice impersonation. Use this as a scenario question about authentication robustness, without claiming that the sample near miss used AI. A familiar-sounding voice should not be presented as evidence that the contact source is independent. [FBI 2025 report, AI section pp. 39–40](https://www.ic3.gov/AnnualReport/Reports/2025_IC3Report.pdf).

Real public reference metrics should remain separate from fictional institutional history. Record a fixed as-of review date and render sourced content locally; no live monitoring or industry search is implied. Do not invent peer-bank consensus, emerging-trend percentages, customer cohorts or bank-specific probabilities.

## 3. Make the final review a complete assessment report

The current first-line review is principally a handoff and readiness checklist. A compact final report should cover all three risks, not only the main wire-fraud conclusion:

- Scope, routes, owner, period, method and current version/status.
- Inherent/current residual scores, prior comparison and material changes.
- Recorded control conclusions, coverage limitations and shared dependencies.
- Relevant events and externally sourced context, with fact versus interpretation clear.
- Response decision, protective measure, validation evidence, owners and dates.
- First-line attestation, exact second-line conclusion, open actions and unresolved management decisions.
- Source/history access and a direct link to the final reporting view.

Use one strong chart plus a concise three-risk register; put extended excerpts and rationale behind detail controls. Preserve the short executive view in Reports. The assessment-review report is for completeness and owner attestation, while the leadership report leads with decisions.

Make the top or persistent action state-aware. A ready owner draft has **Submit assessment** and attestation. An incomplete draft explains **Finish required items**, with direct navigation to the specific incomplete risk/stage. Submitted and reviewed records show their recorded state plus **View final report**; owner changes require an explicit revision. A reviewed record should not present a second submit button that resubmits silently.

## 4. Clarify risk-response state without implying remediation closure

The screenshot already says the response was recorded. In that state, **View risk response** is defensible; the confusing part is the simultaneous **Response required** label. Distinguish:

- Missing decision: **Response required / Complete risk response**.
- Existing response affected by edits: **Response needs review / Complete response review**.
- Created and current response: **Response recorded / View recorded response**; linked action can remain open.

“Complete risk response” must mean completing the response decision, not declaring that remediation succeeded. Submitted legacy/missing responses should need an owner revision rather than editing the preserved record. Keep risk acceptance, action closure, assessment submission and second-line review separate.

## Recommended sequence

1. Fix the review/submission and response-state clarity immediately.
2. Add the four-quarter historical view, current-state linkage and prepared change explanation.
3. Surface one verified external BEC comparison and one relevant authentication insight in What changed; expose limits in detail.
4. Carry the same concise history, external relevance and qualifications into second-line and final review.
5. Verify edited/unchanged ratings, prior snapshots, live user draft versus historical sample data, reporting periods, all response states and narrow layouts.

This can be a few prepared fixtures, native charts and scripted interactions. The flagship story need not gain a new top-level destination, live research service or mandatory research step.

## Implementation QA — November 14, 2026

**Verdict: suitable for the scripted buyer demonstration; no remaining RCSA-domain blocker in this iteration.** This is a focused independent review of historical context, external intelligence and owner-report state, rather than production certification or a replacement for the implementation owner's full regression checks.

Read-only checks used the implementation and a separate, fresh Chrome session. Historical Q1–Q3 snapshots stayed fixed when a Q4 likelihood was edited. The chart separates inherent from residual risk, identifies the urgent-route scope change, distinguishes the unconfirmed Q4 draft from the last confirmed residual rating, and labels ordinal scores rather than loss forecasts. Final source inspection confirms historical segments are solid and only unconfirmed current segments are dashed; inherent and residual labels occupy opposite sides of their points.

The external brief uses the verified 2024/2025 BEC comparison above, with separate complaint/loss measures, a fixed review date, original public-source access and the 2019 date on the FinCEN pattern reference. It does not infer bank likelihood or a 2026 trend. It pairs the external pattern with the favourable internal interception and an explicit verification question. The institutional records remain fictional sample evidence; public FBI totals are separately sourced facts.

The owner review covers all three risks and exposes inherent/prior/current residual scores, conclusions, controls, source records and response/action details. An incomplete draft has a disabled Send for review action with outstanding requirements. The prepared reviewed record exposes its version and final-report link without a second submit action. Source inspection also confirms the final report now names the separate management-disposition question, owner, forum and target date; review completion does not grant that decision.

Browser checks confirmed Complete risk response for a missing response and View recorded response for a recorded response in the preserved reviewed record. Recorded response and open remediation remain separate. The owned browser session reported no page errors and was closed after inspection. The implementation owner separately verified revision flows, complete-state regression and responsive layout.

No additional destination, live AI service, external data connection or automated rating change is needed for these improvements to demonstrate value.
