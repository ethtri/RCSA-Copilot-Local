# Independent persona QA — first-line payments leader

**Verdict: Ready with fixes.** The demo gives me a credible account of why my wire-transfer assessment needs attention and how to own the resulting decisions. I would show the central story to bank leadership after fixing the two P2 issues below. Neither issue changed the residual rating in my observed session, but both weaken trust in the relationship between evidence, AI assistance and an owner's judgment.

**Persona:** Head of Payments Operations at a mid-sized bank, responsible for operational exposure, control coverage, accountable actions and an explainable quarterly RCSA.

**Review date and environment:** November 14, 2026. Local app at `http://127.0.0.1:8000/src/`; isolated, headless Chrome context through Playwright, 1440 × 1100 viewport. I read the demo runbook and feedback-refresh scope, then inspected rendered screens and interacted with the app. Screenshots listed below were opened and visually inspected. I did not consult other persona reports, change application code or shared fixtures, or communicate externally. All workflow submissions were local demo interactions.

## Scores

| Dimension | Score / 5 | Reason |
| --- | --- | --- |
| Clarity | 4 | Changes, evidence limitations, prior/current risk and tolerance are easy to follow. The stages and calls to action make the owner journey discoverable. |
| Credibility and rigor | 3 | The main scenario carefully separates sample scope, proposed protection, current risk and management disposition. A newly mapped library control nevertheless receives affirmative assessment language without a risk-specific applicability decision. |
| AI value | 3 | Source comparison, targeted response drafting and response-coverage prompts help me work. The response drafting action can overwrite a human-authored evidence requirement. |
| Visuals | 4 | Restrained forest/white palette, readable editorial hierarchy, native relationship diagram and prior/current trajectory feel suitable for an executive demo. The control view is long, with the AI panel relatively far down beside the main content. |
| Leadership-demo readiness | 3 | The scenario is coherent and useful, and the local prototype supports the essential owner flow. The two concrete trust issues should be corrected before an unscripted executive walkthrough. |

## What I actually did

1. From Dashboard (`#/work`), identified the refresh due date, stale test and urgent-route evidence work. Opened **Review changes** and inspected the revised procedure, intercepted near miss and September test scope.
2. On **Inherent risk** (`#/assessment/inherent`), inspected the High 16 assessment, rating method and AI analysis. Also selected **Incorrect payment details** to check a supporting risk independently, then returned to the main risk and confirmed inherent risk.
3. On **Controls** (`#/assessment/controls`), edited the callback coverage rationale. Mapped **Payment detail check** with an explicit limitation that it checks accuracy rather than requester identity or authority. Used **Replace → Create a control** to atomically replace that relationship with my proposed independent urgent-request verification control. Removed that mapping, confirmed the control definition remained in the library, and remapped it. The proposal remained visibly unimplemented and untested.
4. Inspected callback operation and the two source excerpts. Used **Add qualification** rather than unqualified confirmation: actual source use needed urgent-route walkthrough evidence. The app recorded the qualification and said ratings were unchanged.
5. On **Residual risk & response** (`#/assessment/residual`), edited the likelihood rationale to preserve uncertainty and deny current credit for the proposal. Attempting confirmation without a response routed me to the required response. Inspected **Request acceptance** as an alternate response approach; its copy clearly kept approval separate. Then deliberately used the AI strengthening-controls draft, set named ownership, strengthened closure conditions, created the response and confirmed Elevated 12.
6. Submitted with the owner attestation. Used the contextual second-line view solely to create the local review question, then returned as owner, compared the brief and complete response drafts, restored my explicit evidence conditions, and confirmed a revised response with renewed attestation.
7. Returned to Dashboard. It showed 0 refreshes due, 1 open action, 1 unresolved review question, Elevated 12, the reviewer's response-received task and a separate pending management decision. Opened the action to verify its owner, date and completion evidence. Inspected the supporting payment-detail test and Reports (`#/reports`), which preserved the qualified finding, version 2 in review, the open action and pending disposition.

The meaningful alternatives were qualification rather than confirmation, an acceptance-request inspection before selecting mitigation, and creating/replacing/removing/remapping a proposed control rather than following only the prepared two-control path.

## Prioritized findings

### 1. P2 — A new library mapping inherits affirmative risk-specific assessment language

**Route:** `#/assessment/controls`, Unauthorized wire transfer.

**Steps:** Select **Map a control → Payment detail check**. Enter coverage rationale: “Checks beneficiary and amount accuracy; does not establish the identity or authority of an urgent requester.” Save the mapping.

**Observed:** The new row immediately stated **“Design — The documented design addresses this risk”** and **“Operation — Supported by the tested sample.”** There was no separate applicability decision for this newly mapped risk. Later inspection of **Incorrect payment details → Inspect Payment detail check → Test scope** showed 25 **standard payment-detail checks**, comparing beneficiary and amount with an already verified instruction, with results limited to the documented population and period. My rationale was retained, and the app did warn generally that a mapping does not establish effectiveness. Risk ratings did not automatically change.

**Business implication (inference):** As the accountable executive, I could read the row as an established assessment of unauthorized-wire protection, although the source establishes detail-check operation in a narrower population. It blurs the useful distinction the rest of the demo makes between having a library control and establishing its coverage for this exposure.

**Smallest recommendation:** On a new relationship, show **“Coverage/applicability requires owner assessment”** and label inherited test results with their actual population and period. Keep the positive library evidence available, but do not phrase it as an established conclusion for the newly selected risk until the owner assesses applicability.

**Evidence:** [New mapping and its assessment claims](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/03-new-mapping-evidence-claim.png); [Actual payment-detail test scope](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/09-payment-detail-test-scope.png).

### 2. P2 — Drafting the response silently replaces separately edited closure evidence

**Route:** `#/assessment/review`, owner view with an open reviewer question.

**Steps:** Create the risk response with explicit completion requirements, including confirming actual contact-source use and approving, implementing and independently testing the proposed verification design. Return as owner to answer the reviewer. Confirm those requirements appear in **Required closure evidence**, then select **Draft a complete response**. I repeated this with freshly entered requirements to verify the behavior.

**Observed:** The action replaced both **Your response** and **Required closure evidence**. The latter became: “Provide the test population, exceptions, results and evidence of the independent verification source.” It removed my explicit source-confirmation, approval, implementation and independent-testing conditions. There was no before/after comparison or separate choice to apply the evidence change. Both fields remained editable, and I restored them before confirming my revision. The linked action later displayed the restored requirements.

**Business implication (inference):** A leader asking for help answering a question can unintentionally weaken an already authored closure standard. Because closure evidence is on the right side of the screen, attention may remain on the newly drafted answer and the green coverage prompts.

**Smallest recommendation:** Draft into **Your response** only. Preserve existing human-edited closure evidence. If a new closure requirement is suggested, show it separately with an explicit apply choice or a visible comparison.

**Evidence:** [Human-authored conditions before drafting](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/06-human-closure-before-draft.png); [Conditions replaced after drafting](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/07-closure-overwritten-after-draft.png).

## What works well

- **An actionable starting point.** The dashboard answers what needs attention, who owns it and what evidence is missing. Its count and risk-position changes matched the owner work I performed.
- **A credible evidence story.** The September standard-wire test is explicitly older than the urgent-route change. The near miss is presented without claiming that all controls failed. Source dialogs show scope and date close to the content.
- **Human-owned relationship judgment.** Side-by-side excerpts make the proposed shared source understandable; qualification is a first-class route. My qualification carried through the handoff, dashboard and report.
- **Explicit response and exposure.** The app required response creation, separated acceptance requests from decisions, and kept Elevated 12 after planning additional protection. The created control stayed visibly proposed with no operating evidence.
- **Review and management remain separate.** The renewed attestation, versioned submission, response-received status, open testing and pending management decision were visible. The return dashboard made the next owner's work clear.
- **Polished information design.** The initial dashboard, risk trajectory, source comparison and control graph support an executive explanation without relying on a presenter to decode the layout. See the [initial dashboard](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/01-initial-dashboard.png), [recorded response with unchanged residual risk](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/04-residual-response-recorded.png), and [returned dashboard](C:/Repos/RCSA_Accelerator/assets/screenshots/persona-qa/first-line/08-returned-dashboard.png).

## Limits and preferences

This is an independent simulated-persona review, not validation by a real bank executive or an institutional policy audit. The dataset, AI suggestions and review actions are intentionally local and scripted. I did not treat the absence of live AI, authentication, backend workflow or actual acceptance authority as a defect. I did not test all rating combinations, empty mappings, every response strategy, mobile layouts, action closure or final second-line conclusion. I ended after the owner response was with the reviewer, so the outstanding review question shown on the final dashboard was expected. No Playwright page errors were observed in the explored session.

The rating-method dialog supplies labels, score bands, quarterly horizon and tolerance, but no probability or financial-impact calibration. For a real rollout I would want bank-specific anchors. That is a calibration preference and realism limit here, not an additional demo blocker. Likewise, moving the control AI panel higher would improve first-screen visibility, but it is a visual preference rather than a substantive finding.
