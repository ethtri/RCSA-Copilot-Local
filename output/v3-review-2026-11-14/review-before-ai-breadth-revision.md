# RCSA V3 feature carry forward review

Reviewed November 14, 2026. Comparison: the older `ethtri/RCSA-Copilot-Demo-Rebuild-V3` repository and the current local RCSA Accelerator working app, including its uncommitted changes and the assessment-context additions made during this review.

## Recommendation

Carry forward the older demo's ability to invite a decision about something AI has discovered. Keep the current app's stronger evidence analysis, owner judgment, independent review and preserved versions.

The most valuable additions are **a recorded scope decision on an external signal** and **source-backed checking of the owner's actual claims**. A short comparison of control alternatives and a real downloadable assessment brief are useful subsequent improvements. Recreating the old dashboards, confidence badges or seven-step wizard would add little value.

The current build now already has external-intelligence context, prior-cycle history, an explicit AI rationale addition and a complete owner review. Those are no longer missing features. The next improvement should turn those inputs into a more responsive decision-making experience.

This is a product and implementation review, not an instruction to change the app. No application code was changed for this analysis.

## What V3 actually contains

The repository name hides three different generations. Its [README](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/README.md) describes a new V7 rebuild workspace with preserved V6 material.

| Layer | What is present | How to interpret it |
| --- | --- | --- |
| `legacy-reference/powerpages/…` | Rich, self-contained older Home, Dashboard and seven-step Assessment Wizard | The source of most memorable AI demonstrations. Some interactions work; others are stubs, canned content or calculations presented as AI. |
| `src/…` | Modular rebuild, fixture contracts, dashboard components and wizard stepper | Partial implementation. The wizard explicitly reserves interactive content for a later agent and has placeholder summary sections. |
| `portal-snapshots/v7-pages/…` | Exported Power Pages records | Inspected core page copies contain empty layouts. These do not establish deployment of the rich archived wizard. |

The old source was pinned to commit `47e662e212655baca08332907d4a109f733a7a8d`. Current baseline details and file hashes are recorded in `source-baseline.json` beside this report. A copy of the inspected current modules and fixtures is retained under `basis/current/` because concurrent work changed the app during the review.

Three independent reviewers examined old AI implementation, current capability gaps, and product/portfolio value. Their agreement was strongest on scope triage and preserving the current workflow. Their different priorities informed the ordering below; the recommendations are a synthesis, not a vote by feature count.

## Why the older demo can feel more capable

The archived wizard visibly offers to add a risk, suggest controls, explain scores, generate responses and produce an action plan. Those are recognizable tasks with immediate actions. It conveys that the assistant is doing work for the owner.

The current app does more sophisticated work: it joins multiple records into one proposed event, exposes an uncertain match, questions evidence applicability, identifies a shared information source, separates protection from testing and supports an independent reviewer. Some of that value requires entering the analysis workspace and following its detail views.

My interpretation is that the older demo's appeal comes partly from **visible initiative and choice**, rather than superior reasoning. Preserve that feeling by showing a specific finding, its basis, a meaningful choice and the recorded result. More AI labels or metrics will not provide the same benefit.

## Ranked opportunities

### 1. Turn external intelligence into an owner scope decision

**Value: high. First product priority.**

The archived wizard's Add action really adds a proposed risk to the selected assessment and saves progress. Modify is a placeholder; dismissal removes a card without a durable decision record. See the [old suggestion handlers](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L7112).

The current app already presents curated external context in [assessment-context.js](C:/Repos/RCSA_Accelerator/src/scripts/demo/assessment-context.js:16). Its risk inventory is initialized from fixed fixtures in [model.js](C:/Repos/RCSA_Accelerator/src/scripts/demo/model.js:14). The missing capability is deciding what the new information does to scope.

Add one suggestion beside the existing external insight: explain the relevant threat mechanism, compare it with existing risk definitions and expose the supporting records. Offer **extend an existing risk scenario**, **propose a distinct risk**, **keep under observation**, or **dismiss with a reason**. Record who decided, why, and which sources informed the decision.

The old deepfake example illustrates an important distinction: a new impersonation technique may be a cause or scenario of Unauthorized wire transfer, rather than a separate independent risk. Demonstrating that distinction is more useful than automatically increasing the risk count.

For the first slice, extend the existing scenario and record the scope judgment. General new-risk creation is a larger change: requirements, report narrative, management brief and several analysis sections explicitly refer to the flagship `unauthorized` risk. A newly proposed risk would need its own unconfirmed inherent/control/residual/response records and review history. It must not arrive with accepted ratings or presumed protection.

**Acceptance example:** the owner links an emerging impersonation mechanism to the existing unauthorized-transfer risk, edits its relevance, and records the decision. The scope history changes; current confirmed ratings remain intact pending explicit reassessment.

### 2. Check the owner's actual rationale against its evidence

**Value: high. Strongest improvement to interactive AI.**

Current [research.js](C:/Repos/RCSA_Accelerator/src/scripts/demo/research.js:12) already presents supporting and counter-evidence. The new [historyInsight](C:/Repos/RCSA_Accelerator/src/scripts/demo/assessment-context.js:6) compares scores and supplies a prepared addition. Neither evaluates the assertions in the user's free text. The response topic cues in [model.js](C:/Repos/RCSA_Accelerator/src/scripts/demo/model.js:67) use keyword matching and are correctly described as topic cues, not sufficiency judgments.

Add **Check my rationale** at a natural editing point. If an owner writes, “Both checks independently verify every urgent request,” highlight the specific claim and show that the available test covers standard wires before the change and that both procedures reference a shared contact record. Offer a qualified revision, an evidence request, or dismissal with explanation.

The assistant should distinguish **supported**, **contradicted**, and **not established by the available evidence**. It should recognize negation and distinguish “independence is not established” from “the controls are proven dependent.” Missing evidence alone does not prove dependence. Avoid a composite quality score. Using suggested wording should remain an explicit action that invalidates any confirmation needing renewal; it should preserve the owner's original text and the source/version context.

For a static demo, this can be an explicitly authored set of contrasting drafts. It must not imply arbitrary live text analysis. A later live implementation would require evidence retrieval, constrained outputs and evaluations of claim checking; that is a separate build decision.

**Acceptance example:** a materially overbroad statement produces one precise, cited finding. The owner edits it, rechecks it and confirms the revised conclusion. Second line still decides whether the response is sufficient.

### 3. Make a small comparison of plausible control alternatives

**Value: medium. Extend the current library; do not rebuild it.**

The archived wizard renders risk-specific candidate controls and explicit linking actions in its [control suggestion functions](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L7853). Its matching percentages and coverage arithmetic are not worth retaining.

The current [control library](C:/Repos/RCSA_Accelerator/src/scripts/demo/control-library.js:4) already sorts relevant controls, shows evidence limits and supports owner revisions. The prominent AI suggestion opens a proposed independent-contact control. There is no missing basic mapping workflow.

Make the choice clearer with two or three candidates: an existing control, a modification and a proposed control. Compare **what it addresses**, **what it leaves exposed**, **shared dependencies**, and **evidence needed**. The current distinction between customer payment confirmation and independent identity verification is an excellent concrete example.

This is a modest presentation/decision improvement, not a new matching engine. With only a handful of fixture controls, natural-language search and a larger library would offer little benefit today.

### 4. Produce a real version-specific takeaway

**Value: medium. Practical completion of the demo.**

Current [Reports](C:/Repos/RCSA_Accelerator/src/scripts/demo/reports.js:20) and the new owner review provide useful on-screen output. There is no implemented print/download/export action in the inspected demo dispatch. The archived [response summary](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L11797) has an actual text-download implementation, while its later executive/detailed/action export buttons only show success messages.

Generate one portable brief from a preserved submission: version, scope, risk conclusions, qualifications, sources, protective measures, owners, dates, open tests, reviewer conclusion and pending management decisions. A precise evidence request or test brief is also useful. Include source excerpts or usable references so browser-only source links do not become dead ends in the exported artifact.

This is partly ordinary document generation. Its value is that the AI-assisted work survives the meeting and can be inspected, rather than merely producing another impressive button.

### Later opportunities

| Opportunity | Worth doing when | Boundary |
| --- | --- | --- |
| KRI trend leading to reassessment | A second story needs an operational trigger | Add a period, population, numerator/denominator, threshold, source and alert disposition. The old dashboard's approaching-threshold alert was static. Existing history charts are assessment history, not monitoring. The current activity extract explicitly cannot establish a rate. |
| Editable outage scenario | The audience wants deeper resilience exploration | Extend the current prepared outage discussion with editable assumptions and a reviewable test brief. Keep observed facts, hypothetical assumptions and measured results separate. Do not automatically recompute confirmed residual risk. |
| Cross-assessment exception triage | There are multiple complete underlying assessment records | Show how the same evidence limitation or service dependency affects two or three assessments. The current three risks belong to one assessment; they are not a portfolio. Much of the old 2LoD command-center material was requirements. |
| Value calculator | Preparing a buyer conversation or sales collateral | Make time reduction, volumes and costs editable; distinguish saved capacity from realized savings. The old calculator assumes 82% reduction and a fixed annual user cost. Those inputs are not measured product results. Keep it outside the banking workflow. |

Do not put all of these in the main walkthrough. The [current workflow plan](C:/Repos/RCSA_Accelerator/docs/operations/workflow-demo-plan.md:7) calls for a coherent 8–10 minute demonstration and supersedes older parity and marketing requirements.

## Features already retained or improved

| Older idea | Current verdict |
| --- | --- |
| AI-prioritized dashboard work | Retained and improved: current queues and next actions respond to assessment/review state. |
| Explain why the assessment changed | Present: procedure comparison, event reconstruction, applicable evidence and current history-rationale addition. |
| External research/industry context | Present in the latest working files: curated references, relevance, counter-evidence and scope limits. Missing disposition is covered by priority 1. |
| Prior-cycle comparisons | Present: Q1–Q3 sources, current draft/confirmed markers and explanation of movement. No restoration needed. |
| Control discovery and mapping | Present and stronger: applicability judgments, add/edit/replace/remove, proposed-control status and preserved owner revisions. |
| Shared dependency and evidence lineage | Current advantage: two people or two documents do not automatically establish independent protection or testing. |
| Response/action drafting | Present: risk-specific rationale, protection, owners, dates and closure evidence. Do not sell this as a missing V3 feature. |
| Full owner review and attestation | Present in the latest owner review: all risks, conclusions, controls, responses and readiness requirements. |
| Second-line challenge | Current advantage: a separate human review, return/agree decision, evidence access and owner reply. |
| New evidence after submission | Current advantage: source receipt, comparison against the submitted version, explicit owner revision and preserved history. |
| Leadership narrative | Current advantage: confirmed risk, review completion, open testing and management disposition remain separate. Portable export remains an opportunity. |

## What should stay retired

1. **Uncalibrated confidence and accuracy.** The archived `calculateAIAccuracy` function literally divides 19 accepted suggestions by 20 and labels the result accuracy. Acceptance is not a measurement of correctness. [Old implementation](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L12547).
2. **Random insight and unsupported benchmarks.** Old effectiveness insights randomly choose canned claims about appetite compliance, impact reduction and peer outperformance. Those numbers have no supporting calculation or dataset. [Old implementation](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L10242).
3. **Automatic risk reduction from a control index.** The old residual calculator multiplies inherent risk by a CEI tier factor and approximately reconstructs likelihood/impact. The current owner assessment is more defensible. [Old implementation](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L10766).
4. **Coverage percentages implying certainty or independence.** Weighting preventive/detective/automated controls to total 100% does not establish actual coverage or remove shared failure points.
5. **Success without an artifact or action.** The later export handlers only display timed toasts. Modify and the dashboard's generic AI Assistant are explicitly unfinished. [Old export handlers](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L12781).
6. **Feature claims from requirements treated as recovered implementation.** Forecasts, enterprise benchmarking, cross-BU anomaly detection and broad 2LoD automation need their own underlying records and implementation.
7. **The old implementation structure.** The archived monolith has duplicated global function names, emergency styling and custom modal behavior. Carry concepts into the existing modules rather than copying the pages.

## Suggested first increment

Keep Dashboard → Assessments → Reports and the existing five assessment stages.

1. At What changed, use the existing external insight to propose a scope judgment. Let the owner link it to an existing scenario or dismiss it with rationale.
2. In Controls or Residual assessment, let the owner check one substantive claim against the available evidence. Show one precise finding and an editable revision.
3. Continue through the current attestation, independent challenge and preserved report. Show the resulting scope decision and corrected claim in history.

The demonstration should replace weaker narration with these moments rather than append a longer feature tour. Retain the new additive history rationale. General risk creation, broader monitoring and live model integration should be separately scoped.

Success means a viewer can explain **what AI noticed, what evidence it used, what the person decided and what changed in the record**. A useful dismissal is as valuable to the story as accepting a suggestion.

## Browser walkthrough and evidence

The current audit used the in-app browser against the local app and directly served archived HTML. Screenshots below were captured and inspected during this review. The archived pages were not rewritten or repaired to make them appear functional.

1. **Current dashboard — healthy entry.** A concrete briefing and state-aware work link make the next action clear. The confirmed heatmap has labels as well as color. Screenshot 01.
2. **Legacy risk discovery — valuable but incomplete.** Two emerging-risk proposals are visible. Adding the deepfake proposal carries it into the scoring screen; the selected summary later exposes its raw ID. Screenshot 02.
3. **Current evidence reconstruction — strong analytical depth.** Four records are one proposed event, and a missing identifier leaves one connection provisional. Screenshot 03.
4. **Legacy score explanation — mixed.** The modal opens and the two original risk suggestions can be accepted, but its confidence/peer claims are authored copy without exposed evidence. The newly added risk's Why modal says analysis is unavailable. Screenshot 04 shows an original risk's explanation.
5. **Legacy disposition — incomplete.** Modify displays “coming in Phase 3.” It is not an editing workflow. Screenshot 05.
6. **Current proposed control — strong boundary.** The suggestion opens an editable proposed design and expressly states that it is not implemented. The dialog scrolls within a bounded viewport. Screenshot 06.
7. **Legacy dashboard — broad presentation, shallow underlying work.** A useful threshold-alert idea sits beside manually authored task priorities and unsupported performance metrics. Screenshot 07.
8. **Legacy scoring progression — runtime limitation.** In this local replay, selecting displayed scores did not advance into mapping when Map Controls to Risks was clicked. Later legacy stages were therefore inspected in source, not certified end to end. This observation applies to the archived local replay, not a claim about its historical hosted behavior. Screenshot 08.
9. **Current report — coherent on-screen account.** Draft/confirmed exposure and response status stay explicit. No portable output control is present in the inspected report. Screenshot 09.
10. **Current second-line handoff — strong separation.** A prepared submitted scene exposes the owner's conclusion, sources, editable challenge and separate review/action/decision states. This capture did not submit a real challenge. Screenshot 10.
11. **Current history addition — useful and already present.** Prior/current series show method, source access and an explicit rationale suggestion. It is assessment context, not a monitored event stream. Screenshot 11.
12. **Current external-context addition — useful and already present.** Public-reference comparisons explain relevance and limits. No scope-disposition action is offered. Screenshot 12.

### Screenshots

![01 Current dashboard](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/01-current-dashboard.jpg)

![02 Archived risk discovery](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/02-legacy-risk-discovery.jpg)

![03 Current evidence reconstruction](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/03-current-evidence-reconstruction.jpg)

![04 Archived AI reasoning](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/04-legacy-ai-reasoning.jpg)

![05 Archived Modify placeholder](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/05-legacy-risk-disposition.jpg)

![06 Current proposed control](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/06-current-proposed-control.jpg)

![07 Archived dashboard](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/07-legacy-dashboard.jpg)

![08 Archived scoring replay](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/08-legacy-scoring-progression.jpg)

![09 Current report](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/09-current-report.jpg)

![10 Current second-line review](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/10-current-second-line-review.jpg)

![11 Current history addition](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/11-current-history-addition.jpg)

![12 Current external-context addition](C:/Repos/RCSA_Accelerator/output/v3-review-2026-11-14/12-current-external-context.jpg)

## Accessibility and verification limits

The old scoring matrix exposes clickable `div` cells with title text rather than semantic buttons. That is a keyboard/assistive-technology risk to avoid carrying forward. Its reasoning dialog also exposes an unnamed close button. The current captured screens provide labeled form controls, navigation and text alternatives for charts; the proposed-control dialog still needs a keyboard/focus test at smaller sizes.

This was feature evaluation with targeted browser replay and source tracing. It was not a full regression, screen-reader, contrast or mobile accessibility audit. The screenshot set uses the browser's default desktop viewport. Direct serving also leaves the archived Power Pages `~/rcsa-styles.css` URL unresolved; inline and CDN styles rendered the inspected screens, but this is not a reconstruction of the original portal environment. Later legacy workflow stages were source-reviewed because the archived replay did not progress beyond scoring. The current second-line capture used an explicitly prepared synthetic scene, not a complete new owner submission performed in this review.

Both experiences use authored data and scripted assistance; the analysis does not establish live model quality, actual ingestion, measured savings or predictive performance. The late external-context panel was assessed for implementation and interaction; this review did not validate its linked public reports' contents. Any public numeric claim should be checked against its original source before external presentation.

The task-owned legacy preview server was stopped at closeout. The pre-existing current preview was left running. Application files and existing local work were not edited by this review.
