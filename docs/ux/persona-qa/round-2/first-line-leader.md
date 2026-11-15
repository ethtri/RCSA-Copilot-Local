# Independent persona QA — first-line payments leader, round 2

**Verdict: Ready for the agreed local leadership-demo scope.** Both original findings are verified fixed in the rendered app. I can distinguish a library test result from my judgment about a newly mapped risk, and reply drafting now preserves the closure conditions I own. I observed no new material regression in the focused paths below.

**Persona:** Head of Payments Operations at a mid-sized bank, returning independently to the same owner jobs reviewed in round 1.

**Method:** November 14, 2026; fresh isolated headless Chrome context using Playwright's Chrome channel, 1440 × 1100 viewport, at `http://127.0.0.1:8000/src/`. I read the runbook, clicked the rendered workflow and inspected the captured screenshots with the image viewer. I did not implement the fixes, inspect application code, rely on the reported regression-suite result, consult other round-two persona reports, or use the user's browser. The original report is preserved. I changed only my local browser session, this report and my evidence files; all submissions were simulated demo actions. My browser was closed and the temporary QA helper removed.

## Findings disposition

| QA ID | Result | Observed basis |
| --- | --- | --- |
| QA-01 — Library mapping applicability overstatement | **Verified fixed** | The exact original Payment detail check mapping starts unassessed. Its row separates owner coverage from the scoped library result. Control confirmation blocks until the owner makes an explicit coverage choice. Replacement and remapping do not inherit the prior choice. A proposed control receives no current operating credit, including after a positive design expectation. |
| QA-02 — Reply drafting overwrites human closure evidence | **Verified fixed** | The equivalent action is now named **Draft a response**. It preserves both the original custom conditions and a further human edit through repeated longer/shorter drafts. An intentionally empty closure field stays empty and blocks the revision. Restored conditions remain in the recorded linked action after successful response submission. |

## QA-01: exact reproduction and related checks

**Route:** `#/assessment/controls`, Unauthorized wire transfer.

1. Started from a fresh Dashboard, confirmed scope and the main High 16 inherent assessment, then selected **Map a control → Payment detail check**. Entered the original limiting rationale exactly: “Checks beneficiary and amount accuracy; does not establish the identity or authority of an urgent requester.” Left the new **Owner coverage assessment** at its default **Not yet assessed**, then saved.
2. The new row showed **“Risk coverage · owner judgment”** and **“Coverage/applicability requires owner assessment.”** The separate **Library result** retained “Supported by the tested sample,” immediately scoped as **25 standard payment-detail checks · October 30, 2026**. The old automatic claim that the design addresses this newly selected risk was absent.
3. Clicked **Confirm controls and inspect connection**. The app stayed at `#/assessment/controls` and instructed: **“Assess coverage for each newly mapped control before confirming. Use Edit mapping.”** The page also showed a persistent explanation above the table. [Unassessed relationship and confirmation gate](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/02-new-mapping-unassessed-gate.png).
4. Selected **Edit mapping → Limited coverage for this risk → Save mapping**. The row now explicitly said **“Owner assessed limited coverage for this risk.”** Confirming controls then advanced to `#/assessment/discovery`. This demonstrated that an actual owner choice, rather than the mere mapping, satisfies the gate. [Explicit limited coverage](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/03-explicit-limited-coverage.png).
5. Qualified the shared-source interpretation, created a mitigation response with custom closure conditions and confirmed Elevated 12 residual risk. Before submission, returned to Controls and used **Replace → Create a control** on the assessed Payment detail check relationship. Created **Independent urgent-request contact verification**, leaving coverage **Not yet assessed**. The atomic replacement kept three mappings, removed Payment detail check from this risk, and inserted the proposal. It did not inherit the old limited-coverage judgment. Confirmation again stayed blocked.
6. Explicitly chose **Design is expected to address this risk** for the proposal. Its row distinguished **“Owner expects the proposed design to address this risk”** from **“Current operation — Not implemented or tested. No current protection established.”** The graph and control badge also remained **Proposed · not implemented**. [Design expectation without operating credit](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/04-proposed-design-no-operating-credit.png).
7. Returned to Dashboard after those changes. It retained the last confirmed **L3 / I4, Elevated 12**, while the register said **Refresh in progress**. The relationship change did not lower or revert confirmed risk. [Last confirmed position preserved](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/05-last-confirmed-risk-preserved.png).
8. Removed the proposal's mapping, verified its definition remained in the library, and remapped that same proposal. The dialog and saved relationship were again **Not yet assessed**, rather than inheriting its previous positive design expectation. The confirmation gate blocked again. [Remap resets coverage](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/06-remap-resets-coverage.png).
9. Recorded **No current coverage for this risk**, reconfirmed controls and the qualified source relationship, updated the residual rationale, and reviewed the response that the app marked **“Assessment changed; review required.”** Saved the response and reconfirmed Elevated 12 before handoff.

**Assessment:** The fix addresses the original business concern. Library operation and risk-specific applicability are now different statements, and the owner must supply the latter. The conservative reset after relationship changes creates some repeat review, but I could understand and complete the requested work. No additional material finding arose from these checks.

## QA-02: exact reproduction, repeated drafts and empty-field validation

**Route:** `#/assessment/review`, owner view after a local second-line challenge.

1. Created the strengthening-controls response using the reviewed AI draft, then replaced its completion evidence with the same substantive human requirements used in round 1:

   > Provide the post-change urgent-wire population, amended-contact samples, exceptions and results. Confirm actual contact-source use. Approve, implement and independently test the proposed verification design before taking operating credit or reassessing risk.

2. Submitted the owner assessment with attestation, used the contextual reviewer view to create the local question, and returned as owner. **Required closure evidence** contained those conditions. [Custom conditions before drafting](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/07-custom-closure-before-draft.png).
3. Clicked **Draft a response**, the replacement for the old **Draft a complete response**. It changed **Your response** but left the closure field intact. Then edited the closure field directly, adding **“Do not close on a staff reminder alone.”** Clicked **Use a shorter draft**, **Draft a response**, and **Draft a response** again. Every observed snapshot retained the whole custom closure text, including that additional edit. [Conditions survive repeated drafting](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/08-custom-closure-survives-repeated-drafts.png).
4. Emptied **Required closure evidence** deliberately. Clicked longer, shorter, then longer drafting again. The field stayed empty. With a nonempty response and the owner attestation checked, clicked **Confirm revision and respond**. The app remained in the response editor, still showed next version 2 and the existing decision count, and said **“Complete the response and the action closure evidence before sending.”** [Empty field preserved and revision blocked](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/09-empty-closure-blocks-revision.png).
5. Restored the custom requirements, edited the answer to preserve the unconfirmed source and current Elevated 12 exposure, and renewed the attestation. Confirmation successfully submitted version 2. Returned to Dashboard and opened the linked action. Its completion field retained the approval, implementation, independent-testing and staff-reminder conditions. [Recorded action retains owner conditions](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/11-recorded-action-retains-owner-conditions.png).

**Assessment:** This fixes the original loss of owner-authored evidence requirements. The revised **Suggested response coverage** wording is also clearer: **“Topic cues only”** and **“Mentioned in draft”** describe assistance without presenting topic recognition as a sufficiency decision.

## Owner workflow and visual sanity

The main flow remained coherent: Dashboard → changes → inherent risk → control judgment → qualified shared-source interpretation → explicit response → residual confirmation → owner attestation → reviewer question → revised owner response → Dashboard. The response still required deliberate draft use and creation; planned protection did not reduce Elevated 12. Mapping changes caused renewed assessment and response review. The updated dashboard showed **0 refreshes due, 1 open action and 1 unresolved review question** after the owner response. It distinguished the reviewer's next step, the testing action, outstanding evidence and a management decision with a named owner and due date. The reviewer question appropriately remained unresolved because I stopped before the reviewer's conclusion.

The layout remains calm and suitable for an executive explanation. The coverage/evidence split fits the existing table without introducing a second workflow or a dense compliance checklist. The owner-response screen is readable, and its revised AI labels are more proportionate. [Initial dashboard](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/01-initial-dashboard.png); [Returned dashboard](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/10-returned-dashboard.png).

## Updated scorecard

| Dimension | Round 1 | Round 2 / 5 | Reason |
| --- | --- | --- | --- |
| Clarity | 4 | **4** | The stage sequence remains clear; explicit coverage choices and scoped evidence improve the control decision. |
| Credibility and rigor | 3 | **4** | Coverage now belongs to the owner, proposals get no operating credit, renewed confirmation is enforced and confirmed risk is preserved. |
| AI value | 3 | **4** | Useful source-based drafting now preserves closure requirements; topic-cue language leaves sufficiency with the reviewer. |
| Visuals | 4 | **4** | Restrained palette, clear hierarchy, graph and risk trajectory remain polished. Added controls are readable within the current design. |
| Leadership-demo readiness | 3 | **4** | Both original trust issues are resolved in the actual UI, and the owner path still works through a revised response and operational dashboard. |

**Preferences, not findings:** The control view remains long and I would personally place its AI panel closer to the top. That preference does not prevent the reviewed job or change the Ready verdict. I am not requesting additional production capabilities.

**Limits:** This was a focused independent simulated-persona re-review, not an institutional policy audit or a full repeat of all eight findings. I verified QA-01 and QA-02 and the owner workflow described above. I did not re-test every supporting risk, all response approaches, empty mappings, final reviewer conclusion, action closure, mobile layouts or real external systems. Local synthetic data and scripted assistance are intentional scope. No Playwright page errors were observed during the session. No new material regression was observed in these tested paths; that is not a claim that untested paths are defect-free.

## Follow-up — owner acceptance status outside Reports

**Result: the prior Ready verdict remains.** In a separate fresh Chrome context, the revised owner acceptance path correctly distinguished a draft request from a submitted pending decision. The scorecard above is unchanged.

| Relevant check | Result | Observed behavior |
| --- | --- | --- |
| QA-07 follow-up: acceptance wording in residual, review and handoff | **Verified fixed** for the tested owner path | Before submission, residual said **Draft acceptance request**; Review showed **Draft decision request** and the handoff said **Draft acceptance request**. Checking the owner attestation alone did not change those labels. Only **Send for review** changed them to **Acceptance decision pending / Decision pending**, including the submitted handoff and the revisited residual page. |
| Entered acceptance review date and current exposure | **Preserved** | I entered **December 4, 2026** rather than the default review date. After submission, the read-only response retained `2026-12-04`, the named owner and my rationale. Current residual risk remained **L3 / I4, Elevated 12** throughout. The app continued to say approval was a separate management decision; no accepted exposure was implied. |

I reached the response through the ordinary scope/inherent/control/source confirmations, selected **Request acceptance**, entered a request rationale and the distinct review date, created the response, confirmed residual risk and inspected the draft Review/handoff. I then checked attestation, verified the labels were still draft, submitted, and revisited the residual and response screens. This was a short acceptance check; I did not repeat mapping tests or retest the low-risk/no-response Report copy.

Evidence, all visually inspected: [Draft residual](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/12-draft-acceptance-residual.png), [Draft Review and handoff](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/13-draft-acceptance-review-handoff.png), [Submitted pending Review and handoff](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/14-submitted-acceptance-review-handoff.png), [Retained entered date and current risk](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/round-2/first-line/15-submitted-acceptance-date-and-risk.png).

**Date-label observation, not a confirmed regression:** On the returned Dashboard, the acceptance-request queue row displayed **Due date Nov 19, 2026**, while the response's separately labelled **Decision review date** remained December 4. I verified retention of the entered response field, not equivalence of these two date concepts. If they intentionally represent the management deadline and a later review date, naming the queue date's purpose would make that distinction easier for a leader. I have not treated this as date loss or a blocker.

**Environment limit:** The first fresh-context attempt remained at **Preparing your workspace…** before any owner interaction. It did not reproduce in a second fresh context, which loaded normally and completed the check with no captured page, console or network errors. I cannot attribute that first stall to an application-code regression. Both contexts were closed; no application files were changed.
