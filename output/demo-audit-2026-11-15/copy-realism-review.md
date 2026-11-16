# Copy and product realism review

Reviewed November 15, 2026 against commit `29540e6`. This is an independent source review of the active ES-module app, not a visual audit. Parent reviewer owns screenshots and browser testing. The copy table was checked against active routing: first-line review uses `ownerReviewReport` in `assessment-context.js`, so unreachable older first-line review text was excluded. No application files were changed.

## Judgment

The fixture language already contains several strong plain-English explanations. The problem is less individual sentence quality than an accumulation of instructional text, cautions, duplicate summaries and specialist nouns. The app explains the assessment repeatedly rather than consistently presenting a compact, editable record with a clear next action.

The most serious realism problem is a forced review story: a reviewer must ask a question and receive a reply before completing a review, even when the submitted assessment is already adequate. Two further promises stop at summaries: “Open action” opens the response plan, and the management decision brief cannot be routed or decided. These can be deliberate demo boundaries, but the visible labels should match the supported work.

## Keep these strengths

- Risk descriptions use concrete customer harm. “Someone posing as a customer could direct a payment to an unauthorized recipient” is clear without watering down the risk (`assets/data/workflow-demo.json:12`).
- The distinction between a proposal, implementation and proof of effectiveness is strong. Proposed controls remain explicitly unimplemented; plans do not automatically lower ratings (`controls.js:31`, `response-view.js:23–24`).
- Testing scope is bounded. A September standard-wire sample does not establish October urgent-route effectiveness; duplicate records are not automatically counted as multiple incidents (`assessment.js:34–37`, `research.js:11–12`).
- Human use of an AI draft is explicit, source links are available, owner edits are retained, and submitted versions are preserved. These are credible enterprise behaviors.
- Reply checks say “Mentioned in draft,” rather than claiming to have judged answer quality (`assessment.js:103`). Keep that honesty.

## Priority findings

### CR-01 — Allow a satisfactory submission to pass review without an invented question (P1)

`src/scripts/demo/assessment.js:96` offers the reviewer a question and “Send challenge.” The conclusion form is reached after a reply. `src/scripts/demo/model.js:89–90` explicitly rejects completion unless `challengeStatus === 'responded'`.

Source-level reproduction with a submitted scene, `assessmentView='agree'` and a substantive review rationale returned `false` from `completeReview`. This is a confirmed behavior constraint, not a screenshot inference.

Offer three reviewer decisions: **Agree and complete review**, **Ask a question**, **Return for changes**. Request a reason for agreement or return. The prepared question can remain a useful AI suggestion rather than a required plot point. This single change would make the demo feel much more like software a bank could use.

### CR-02 — Make the report summary editable before confirmation (P1)

`src/scripts/demo/reports.js:26` builds the narrative from a fixed template. `reports.js:31` labels it an “AI-assisted draft” and asks “Confirm report narrative.” There is no narrative editor. `app.js:194` merely stores the confirmer and a signature of the underlying state.

A source-level rendering check confirmed that the report has a confirmation action and no textarea or editable narrative. A responsible reviewer can accept or leave the fixed prose, but cannot improve it.

Use **Edit summary**, **Restore suggested summary**, and **Confirm summary**. Tie the confirmation to both edited text and record version. Show when an underlying change needs a fresh review. This demonstrates useful AI assistance and realistic human ownership.

### CR-03 — Match action labels to the available execution workflow (P1 if pitched as full lifecycle; P2 for an assessment-only demo)

`dashboard.js:21–23` adds open action rows with **Open action**, but their destination is the risk-response workspace. `response-view.js:23–24` provides plan and evidence-requirement editing; the testing action remains hard-coded **Open**, with no execution record, completion evidence upload or closure decision.

For the present assessment-only scope, label the link **View action plan** and show “Execution tracked in GRC” only if that is the intended contract. For a fuller product demonstration, add a small action detail with status, accountable owner, due date, evidence submitted, and closure review. The operator and independent verifier should remain distinguishable.

### CR-04 — Management decision ownership is presented as a fact but is only a fixture (P2)

`decision-brief.js:4` hard-codes the decision owner, committee and date. `reports.js:17` shows these as decision facts. A dashboard **View decision brief** action opens the report; no routing or decision record exists.

The pending status is honest and should remain. Make the boundary equally clear: **Decision needed**, named proposed decision owner, target date, and **Prepare decision request** or **View request**. If decisions are in scope, demonstrate submission, approver response and conditions rather than an unexplained permanent pending card. Do not make an AI recommendation appear to be a management decision.

### CR-05 — Replace repeated methodological paragraphs with a small decision record (P2)

The same urgent-route scope gap and “planned work does not change risk” message recur in `dashboard.js:66`, `assessment.js:37,60`, `premium.js:7,13`, `response-view.js:24`, `reports.js:31–33`, `risk-intelligence.js:79,118`, and control-plan footers. Each is defensible alone; together they make the product sound like a narrated training deck.

Use a stable compact pattern: **Finding** (one sentence), **Why it matters** (one sentence only if necessary), **Status**, **Next action**, and **Why? / 2 sources**. Put test population, dates, counter-evidence, competing explanations and methodology into a right-hand details panel. Preserve a visible short warning when the limitation changes the decision: e.g. “Urgent payments have not been tested.” Do not hide a material limitation solely in hover text.

### CR-06 — General form errors do not help the user recover (P2)

`app.js:160` returns one long notification for every failed response save: “Complete the response rationale and owner, protective measure with owner/date, and validation evidence; acceptance requests need a decision review date.” `app.js:27` removes toasts after 3.5 seconds. The user is not directed to the missing field; the message includes requirements irrelevant to the currently selected response type.

Use persistent inline messages attached to the missing inputs, such as **Choose an owner**, **Enter a due date**, **Explain why this response is suitable**. Focus the first invalid field and keep the overall message to **Complete the highlighted fields**. Test missing and invalid dates, not just the happy path.

### CR-07 — Display draft saving explicitly (P2)

`app.js:26` stores the state in sessionStorage and silently ignores failures. Typed fields can change confirmation status, but there is no clear persistent **Draft saved in this demo tab** or **Changes not saved** state. A polished enterprise record should make save, confirmation and submission distinct.

In this local demo, a quiet saved indicator is enough. If storage is blocked, retain the working state but say it will be lost on reload. Do not imply a server save or cross-user delivery. This is a small realistic interaction with high trust value.

### CR-08 — The breadth of analysis is hidden behind overlapping abstract labels (P2)

`analysis-workspace.js:7` defines up to eight tabs, including **Signals**, **Assessment check**, **Response options**, and **Research**. “Signals” is less specific than the actual events and open issues; “assessment check” does not explain what is checked. The content largely consists of long reading panels.

Use concrete navigation: **Summary**, **Timeline**, **Events and issues**, **Sources**, **Check conclusions**, **Compare actions**, **Related research**, **New evidence**. Reduce the default view to a few findings and tasks; retain the full reading material one level down. Tab count alone is not the defect—the cognitive burden comes from vague labels plus similar content presentations.

## Copy changes

These are proposed rewrites, not applied changes. Paths below are relative to `src/scripts/demo/`. Preserve standard RCSA terms in definitions and export metadata; put the everyday label first in the working UI.

| Current visible text | Proposed text | Source |
|---|---|---|
| Likelihood rationale | Why you chose this likelihood | `assessment.js:51` |
| Impact rationale | Why you chose this impact | `assessment.js:51` |
| Owner’s caveat | What is still uncertain | `assessment.js:56` |
| Confirm shared dependency | Confirm they use the same source | `assessment.js:70` |
| Add a caveat | Add a limit or question | `assessment.js:70` |
| Your caveat | What is different or still unknown? | `assessment.js:71` |
| Save finding with caveat | Save with this note | `assessment.js:71` |
| Current residual | Current risk after controls | `assessment-context.js:27`; owner review rating rows |
| Confirmed assessment | Risks above the threshold | `assessment-context.js:27`; heading above the count of confirmed above-tolerance risks |
| Send challenge | Send question | `assessment.js:96` |
| Suggested response coverage | Points to address | `assessment.js:103` |
| Topic cues for this question. The reviewer decides sufficiency. | Check that your reply addresses these points. | `assessment.js:103` |
| Update the reply and re-attest; the reviewer determines sufficiency. | Update your reply and confirm it again. The reviewer will check it. | `assessment.js:103` |
| Required closure evidence | Evidence needed to close the action | `assessment.js:103` |
| Is the response sufficient for this review? | Does the reply answer your question? | `assessment.js:108` |
| Independent view of the assessment | Do you agree with the assessment? | `assessment.js:108` |
| Reviewer rationale | Reason for your decision | `assessment.js:108` |
| Above tolerance | Above the bank’s risk threshold | `response-view.js:18` |
| Response rationale | Why this response is suitable | `response-view.js:21` |
| Operational measure | Change to make | `response-view.js:23` |
| Protective measure | What will change | `response-view.js:23` |
| Protection owner | Who will make the change? | `response-view.js:23` |
| Validation | Testing | `response-view.js:24` |
| Return to residual assessment | Back to risk after controls | `response-view.js:25` |
| Request acceptance | Ask management to accept the risk | `responses.js:2` |
| Escalate the current exposure for a separate decision. | Management must decide whether to accept the risk. | `responses.js:2` |
| Share the exposure | Transfer part of the risk | `responses.js:2` |
| Arrange risk transfer and assess what remains. | Use insurance or another agreed arrangement, then assess the remaining risk. | `responses.js:2`; describe actual available options in details |
| Coverage rationale | How this control addresses the risk | `controls.js:32` |
| Qualified source relationship | Shared source: limits recorded | `controls.js:48` |
| Edit mapping | Edit risk link | `controls.js:32,49`; define “mapping” in details |
| Operating evidence | Evidence the control works | `control-assistance-view.js:84` |
| Signals | Events and issues | `analysis-workspace.js:7` |
| Assessment check | Check conclusions | `analysis-workspace.js:7` |
| Confirm report narrative | Confirm summary | `reports.js:31` |
| Narrative confirmed by | Summary confirmed by | `reports.js:31` |
| Current confirmed residual | Latest confirmed risk after controls | `reports.js:31` |

Some field labels become slightly longer. They are still faster to understand because they specify the decision rather than relying on a specialist noun. Do not apply replacements mechanically to regulatory source titles or quoted records.

## Content hierarchy to implement

1. **Always visible:** record name, state, accountable person, current result, material gap, main next action, whether a displayed result is a proposal or confirmed decision.
2. **Click/focus disclosure:** why AI suggested it, source excerpts, methodology, test scope, unknowns, disagreements, detailed model limits, rating definitions and decision history.
3. **Hover supplement only:** short term definitions and secondary hints. Every hint must also open on focus/click; no essential facts or actions should depend on hover.

Use consistent **Why?**, **View sources**, **Details**, and **History** entry points. An eye icon alone can be mistaken for show/hide; an info icon or eye button needs an accessible name and a label/tooltip describing what opens. Choose one details pattern and apply it across ratings, controls, responses and reports.

## Demo scope versus product defect

Synthetic records, fixed dates, simulated replies, no live AI backend, and no real GRC connection are intentional and disclosed. They are not by themselves UX defects. A believable demo can still use deterministic fixtures. The problem appears when a visible action promises work the UI cannot perform, a reviewer has no legitimate alternative path, or a displayed “draft” cannot be edited. Fix those boundaries before adding more narrative, sources or assurance text.

## Suggested acceptance checks

- A reviewer can agree without sending a question, ask a question, and return for changes. Each path has a visible resulting record.
- A user can edit the report summary, confirm it, and see the confirmation expire after a relevant record change.
- Every work-queue action opens the object named by its label.
- Invalid response fields receive persistent, specific inline errors.
- A user can explain the finding and choose the next action from the default screen without opening methodological details.
- Sources, limitations and rating definitions remain available by keyboard and touch.
- The demo disclosure accurately describes persistence, simulated AI and external updates without repeating a disclaimer in every card.
