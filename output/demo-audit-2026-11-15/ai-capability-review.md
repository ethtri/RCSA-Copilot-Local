# AI capability review against V3

Reviewed November 15, 2026. This is a source review and small in-memory behavior probe, not a browser audit. The primary reviewer owns current-run screenshots and interaction findings. No application files were changed.

## Assessment

The concern is well founded, with an important qualification: the current demo is more coherent and defensible, and its control-design assistance is now substantial. But the primary journey still asks users to read an AI interpretation and then complete conventional assessment forms. The old demo more often offered to do the next piece of work: add a risk, propose a score, recommend a control, or prepare strategy-specific actions. That visible range made the older experience feel more ambitious.

Preserve the current evidence boundaries, editable controls, version history, and separation of risk, actions, review, and management approval. Restore the older pattern of useful AI proposals that users can inspect, change, and apply. Avoid restoring the old unsupported confidence scores, performance claims, and automatic risk-reduction arithmetic.

## Verified comparison baseline

- Current source: `C:/Repos/RCSA_Accelerator`, HEAD `29540e6`, branch `feature/ws-02-workflow-demo`.
- Older GitHub source: [ethtri/RCSA-Copilot-Demo-Rebuild-V3](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3), live `master` verified at `47e662e212655baca08332907d4a109f733a7a8d` during this review.
- The older repository's README describes a V7 scaffold, with the memorable older application preserved under `legacy-reference/powerpages/`. The scaffold and portal placeholders should not be treated as the finished older demo.
- Older wizard file: `legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html`. Line references below refer to that file at the pinned commit.
- Fresh source copies are under `v3-source/` beside this report. They are comparison material. Their old absolute navigation URLs still assume the original portal.

## Capability comparison

| Job | Older experience, verified in source | Current experience, verified in source | Review judgment |
| --- | --- | --- | --- |
| Find risks the assessor missed | Authored emerging-risk cards; Accept adds a risk to selected assessment and saves progress. Modify is explicitly a placeholder. Lines 7112–7190. | Three fixed risks initialized from fixture. No risk-add/edit/disposition workflow in current dispatch. | A meaningful AI-first interaction is missing. This is broader than text polish. |
| Draft ratings and explanations | Proposed likelihood/impact; Accept applies score. Lines 7258–7323. Later residual proposal exists, but uses a simplistic control-index formula. | Prefilled owner ratings and rationales, plus source-linked analysis. No explicit AI score proposal or Use/Edit/Reject choice. `assessment.js:49`, `risk-intelligence.js:131`. | Rigorous assessment remains, but AI's contribution is hard to distinguish from prefilled fixture data. |
| Find useful controls | Risk-specific candidates with Link actions, short reasoning and unsupported match percentages. Lines 7853 onward. | Existing control, enhancement and new-design candidates for each of three risks; editable design details and reasoned dismissals. `control-assistance-view.js:35`, `control-assistance-actions.js:50`. | Current capability is stronger in important ways. It is concealed behind a default-collapsed optional disclosure in `controls.js:53`. |
| Analyze coverage | Reacts to control counts and types; can falsely imply that balanced types mean adequate protection. Lines 8205 onward. | Mapping-dependent findings, source independence, unsupported-control boundaries, explicit proposed/unimplemented status. `control-assistance.js:59`. | Current approach is more realistic and useful. Put its conclusion and next action in the working surface. |
| Plan an improvement | Templates change with chosen Accept/Monitor/Enhance/Transfer response. Lines 11564 onward. | Editable implementation and validation tasks, owners, dates, design carry-through, stale-plan detection. `control-assistance.js:94`, `control-assistance-actions.js:74`. General response AI draft always chooses Strengthen controls. `response-view.js:28`. | Keep current task rigor; fix strategy awareness and make the plan part of the core workflow. |
| Investigate evidence | Broad claims of AI analysis with canned explanations and some random insights. Lines 10242 onward. | Event reconstruction, fact/interpretation separation, human relationship decision, source scope, competing explanations, version-aware new evidence. `research.js:12`, `research.js:13`, `research.js:16`. | A major current strength, but much of it is a reading workspace rather than actionable analysis. |
| Answer a review question | Older source does not establish a comparably complete owner/reviewer loop. | Owner reply preview, replace/append/undo; reviewer return and preserved submissions. Reply drafting supports the exact original question and one narrowly patterned ownership question. `reply-assistance.js:3`, `app.js:185`. | The workflow is materially stronger; the AI feels fragile when a user rephrases a normal question. |
| Create the final output | One text response-summary download exists; later executive/detailed/action export handlers only show success toasts. Lines 11797 and 12781 onward. | Coherent on-screen report and review record, with narrative confirmation. Report focuses on one risk and links elsewhere for all three. No print/download/export action in current dispatch. `reports.js:29`. | An inspectable all-risk report or real output would demonstrate more practical value than another confirmation step. |

## Seven recommendations, in priority order

### 1. Make an AI-prepared refresh the main task

On entry, show a compact proposal: “I found a procedure change and a test that does not cover it. Review the suggested updates.” Include the affected risk, proposed change, evidence gap and next action. Use a before/after comparison with individual Apply/Edit/Keep current controls. Keep the source and reasoning in a side panel.

This makes AI do visible work without granting it approval authority. The demo already has most ingredients: dated changes, source excerpts, owner forms, state transitions and immutable submissions. A credible future implementation would generate a typed change set from selected records, validate references and permissions, then apply only owner-approved fields. It does not require autonomous risk acceptance.

Acceptance example: changing an underlying source updates the proposed rationale and marks affected judgments for review; the current confirmed score remains intact until the owner confirms it.

### 2. Expose the existing control assistance where the decision happens

The strongest AI experience should not require opening “Find control improvements with AI.” Show one useful recommendation directly in Controls: a short explanation, existing/enhance/new options, and Review design. Keep full coverage analysis, competing designs and detailed task plans on demand.

The code already supports editable proposals, applicability judgments, dismissal reasons, implementation/validation tasks and plan staleness. This is primarily a workflow and hierarchy improvement, not a demand for a new AI service. See `controls.js:53` and `control-assistance-view.js:35`.

Acceptance example: a presenter following the primary path encounters a control proposal and can edit its owner or verification method; the generated plan retains those edits.

### 3. Restore risk discovery with a real record behind it

Provide a small “Possible missing risk” proposal linked to evidence, with Add risk, Edit and Dismiss. The created record should have cause/event/harm, scope, owner, sources and a clear Draft status. Run it through the existing assessment stages. Do not just add a polished card disconnected from submission and reporting.

The older Accept handler genuinely added the proposed risk, but its Modify handler was a placeholder. Restore the useful action and finish the record lifecycle. Current `createInitial` and routing assume three fixed risks; broadening that schema is a prerequisite, not just adding a button.

Acceptance example: adding an emerging impersonation risk changes the register and submission requirements; dismissing records a reason; neither action alters existing ratings.

### 4. Make rating assistance explicit and bounded

Show “Suggested rating” separately from the owner's draft and last confirmed rating. Offer Use suggestion and Adjust. Put separate likelihood and impact explanations, evidence limits, and the institution's definitions behind Why this rating.

Do not copy V3's implied precision. Its 87% confidence is authored text; its residual calculation scales inherent score with control-index tiers and reconstructs likelihood/impact. Current human assessment is more defensible. A buildable AI-first version prepares a proposal against the approved method and allows “not enough evidence” rather than inventing certainty.

Acceptance example: a user can accept proposed rationale while choosing a different impact and recording why. The proposal and owner conclusion remain distinguishable in the audit record.

### 5. Draft for the response the user selected

The response editor offers Strengthen controls, Request acceptance, Change or stop activity, and Share exposure. Its AI draft always returns `strategy:'mitigate'`, including when a different option is selected. A direct in-memory probe confirmed selected `accept` produced draft `mitigate`.

Generate a response-specific draft: control implementation/test tasks for strengthening; time limit, decision owner and monitoring for acceptance; process change and customer impact for avoidance; retained exposure and counterparty evidence for transfer. If AI recommends changing strategy, explain that as a separate recommendation rather than silently presenting a generic draft.

Acceptance example: selecting Request acceptance and opening Review AI draft produces an acceptance request, with a review date and approval owner. It does not approve the request or change risk.

### 6. Demonstrate flexible questions within a clear scope

The current reply helper is honest about unavailable suggestions, but it is brittle: “Who owns the testing action?” works while “Who is responsible for the testing action?” does not. The original question must normalize to an exact authored string. This creates a conspicuous gap in an AI-first demo as soon as the customer uses their own words.

For the demo, support several bounded intents and normal paraphrases, visibly grounded in the assessment records. For a future product, use retrieval and structured facts with evidence citations, unsupported-question handling and explicit draft insertion. Keep the current preview/replace/append/undo pattern. Do not imply an unrestricted general assistant unless it is implemented.

Acceptance example: paraphrased ownership and test-scope questions return consistent facts and sources; a request outside available records says what is missing rather than filling in a plausible answer.

### 7. Finish with a useful output and show a real consequence

Make the final report cover the complete assessment, with an executive summary, changed risks, remaining evidence, actions and decisions. Provide a real print/download artifact in the demo if export is offered. Expose evidence and version history from the report.

Avoid replacing this with a toast or a larger AI narrative. V3's later exports only claimed success. The current simulated automatic GRC sync is a better consequence because it tracks review state, failures and conflicts. Pair that with a useful report and show exactly what was saved/synced, including pending actions and approvals.

Acceptance example: the output matches the reviewed version and all assessed risks; later evidence leaves it intact and creates a new revision rather than silently changing the submitted artifact.

## What is working simulation, and what is not implemented

The current app loads five local JSON fixture files and stores tab state in session storage (`app.js:203`). Control recommendations and plans are authored, bounded transformations (`control-assistance.js:1`). Risk intelligence selects an authored case (`risk-intelligence.js:16`). Reply drafting uses string matching (`reply-assistance.js:3`). No live model call, live search, evidence ingestion, authentication, durable multi-user data or real GRC update is demonstrated. The app appropriately discloses this.

That does not prevent an impressive and credible demo. It does mean the review should assess whether the simulated interaction is a convincing contract for a product that could be built. Proposals need concrete inputs, visible outputs, owner approval, revisions, source links, and honest missing-data states. The current control-plan path is the closest existing example of that standard.

## Do not carry forward from V3

- Hard-coded match/confidence percentages as if measured. The control candidates contain authored 95/92/etc. match scores and unsupported fraud-prevention claims.
- Acceptance rate labeled accuracy. `calculateAIAccuracy` hard-codes 19 accepted of 20 suggestions (lines 12547 onward).
- Random claims about appetite, impact reduction and peer performance. `generateRiskControlAIInsights` selects from unsupported text using `Math.random` (lines 10242 onward).
- Automatic score reductions from a control-effectiveness percentage (lines 10766 onward).
- Success messages for exports that create no file (lines 12781 onward).

## Behavior probes performed

Imported current modules in Node with the actual local fixtures and mutated only in-memory state:

| Probe | Result |
| --- | --- |
| Original fixture review question | Reply suggestion available |
| “Who owns the testing action?” | Reply suggestion available |
| “Who is responsible for the testing action?” | No reply suggestion |
| Response strategy set to acceptance, then `responseDraft` called | Returns mitigation strategy |

These are implementation observations, not claims that a production model failed. The primary reviewer should tie their visible effects to screenshots and product-flow findings.
