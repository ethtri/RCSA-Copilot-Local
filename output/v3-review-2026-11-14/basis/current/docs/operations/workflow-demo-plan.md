# AI assisted RCSA workflow demo plan

**Finalized:** November 14, 2026  
**Audience:** Banking leaders  
**Status:** Base demo and connected-intelligence iteration implemented locally with scripted sample data. See the iteration verification in the QA report. See the [runbook](demo-runbook.md) and [QA report](../ux/qa-report.md).

Deliver an elegant, credible demonstration of a quarterly wire-transfer RCSA refresh across first and second line. AI prepares information, connects evidence, identifies questions, and assists with writing. Named people own scope, ratings, control conclusions, responses, challenges, and sign-offs.

The core walkthrough lasts approximately 8–10 minutes. All records, AI outputs, interactions, and reporting use synthetic demo data and predetermined states. The existing static HTML/CSS/JavaScript architecture remains sufficient.

This is the current source of truth for the demo experience. It supersedes conflicting 2025 plans, legacy parity requirements, marketing metrics, and visual prescriptions. Existing useful components and tokens should be reused after visual review.

## Assessment coverage

The demo includes a complete inherent assessment, control assessment, and residual assessment for every risk in the sample register. The presenter explores one material risk in depth; supporting risks remain inspectable with complete records.

| Assessment component | Required content | Human responsibility |
| --- | --- | --- |
| Scope and risk identification | Process, assessment period, owner, changes, risk event, causes, consequences, and relevant sources | Confirm scope and risk statements. |
| Inherent risk | Likelihood and impact before considering controls; separate rationales; combined rating; comparison with the prior cycle | Confirm likelihood, impact, rating, and rationale. |
| Control design | Control objective, owner, process coverage, relevant risk, and whether the design addresses the risk | Record the design conclusion and qualifications. |
| Control operation | Test period, population, results, applicability, evidence limitations, and operating-effectiveness conclusion | Distinguish established operation from untested coverage. |
| Combined control coverage | Gaps, overlaps, and shared dependencies across controls | Validate dependencies and determine what protection is supported. |
| Current residual risk | Likelihood and impact after considering existing controls and supported effectiveness; rationale; prior/current comparison; tolerance status | Confirm the current conclusion and any escalation. |
| Response | Actions, accountable owner, due date, interim measures, closure evidence, and any separately labelled target residual risk | Choose and own the response. |
| Review | First-line attestation, second-line challenge, response, revisions, reviewer conclusion, and decision history | Sign or complete the relevant human review. |

The inherent and residual assessments each expose likelihood, impact, rationale, and the rating method. They are distinct stages in the assessment navigation. A chart or prefilled final score alone does not satisfy either assessment.

### Illustrative rating method

Use a transparent five-point likelihood scale and five-point impact scale, with a 5×5 matrix. The fictional bank's method uses likelihood × impact as an illustrative prioritization score. It is not a prescribed regulatory method or a quantitative loss estimate.

| Score | Likelihood | Impact |
| --- | --- | --- |
| 1 | Rare | Minor |
| 2 | Unlikely | Moderate |
| 3 | Possible | Significant |
| 4 | Likely | Major |
| 5 | Almost certain | Severe |

The sample bank uses bands of 1–4 Low, 5–9 Moderate, 10–15 Elevated, and 16–25 High. The detail panel explains the assessment horizon, assumptions, and scale meanings. The current tolerance boundary is Moderate; a higher rating requires a recorded management response and escalation status. A second-line review does not supply risk acceptance authority.

| Main risk example | Likelihood | Impact | Score | Rating |
| --- | --- | --- | --- | --- |
| Prior and current inherent risk | 4 | 4 | 16 | High |
| Prior residual risk | 2 | 4 | 8 | Moderate |
| Current residual risk confirmed by first line | 3 | 4 | 12 | Elevated |

The owner explains the changed residual likelihood using the new exception route, the near miss, and the limits of current evidence. The inherent rating can remain unchanged after explicit review. A shared dependency or evidence gap never automatically changes a score. Current residual risk is a human assessment, not a percentage subtraction from inherent risk.

Planned actions do not reduce the current rating. Any target residual rating is visibly labelled as a future objective dependent on implementation and evidence. Assessment review, remediation closure, and risk acceptance have separate statuses. The walkthrough ends with the assessment reviewed, current residual risk elevated, testing action open, and management disposition tracked separately.

## Scenario and evidence

The fictional bank has introduced an urgent-wire exception route this quarter. A fraud attempt involving recently amended contact details was intercepted. The last successful callback test covered the standard route before this change.

Callback verification and supervisory approval both consult the same customer-contact record. Two people performing checks do not establish that their information sources are independent. AI identifies this possible common dependency from the documented procedures; the owner verifies it before relying on the finding.

Use a small, coherent sample register: unauthorized wires through impersonation as the main risk, plus incorrect payment details and delayed execution as supporting risks. Each has a complete inherent/control/residual record, owners, and relevant evidence. Additional process records populate dashboards without requiring additional walkthroughs.

| Source | Synthetic contents | Narrative purpose |
| --- | --- | --- |
| Prior assessment | Approved prior-cycle ratings, rationale, risk register, and controls | Establish the refresh baseline. |
| Revised wire procedure | New urgent route with effective date and exception steps | Establish what changed. |
| Callback test | Successful standard-route test with dates, population, and exclusions | Demonstrate evidence applicability. |
| Callback control description | Uses the registered customer-contact record | Establish a dependency. |
| Supervisory approval description | Checks instructions and confirmation against that same contact record | Establish the possible common dependency. |
| Near-miss record | Attempt intercepted; contact details had recently changed; facts separated from unconfirmed causes | Add relevant event context without claiming controls failed. |
| Action and review records | Proposed test, challenge, response, scope clarification, and review conclusion | Connect assessment to accountable follow-through. |

Source panels show a title, date or period, scope, relevant excerpt, and source identifier. All apparent source documents are local synthetic fixtures. AI explanations link to those fixtures. No live institutional data, uploads, external feeds, or generated evidence are needed.

## Screens and main walkthrough

The application has three main destinations: **Dashboard**, **Assessments**, and **Reports**. A presenter control switches the displayed first-line and second-line perspective. The assessment uses five simple stages: **What changed → Inherent risk → Controls → Residual risk and response → Review**. The perspectives and review states share one assessment record.

| Moment | Screen and visible experience | Key AI contribution | Human action |
| --- | --- | --- | --- |
| 1 | First-line Dashboard: a clear queue, assessment status, upcoming actions, and wire-transfer refresh briefing | Connect the procedure change and near miss to the relevant assessment | Open the refresh. |
| 2 | What changed: concise briefing, prior/current procedure comparison, and linked evidence | Explain the significance of a semantic process change | Confirm relevance and scope. |
| 3 | Inherent risk: likelihood, impact, their rationales, and an inspectable matrix; prior/current values visible | Assemble relevant facts and identify rationale gaps without choosing ratings | Explicitly confirm the before-controls assessment. |
| 4 | Controls: risk-to-control mapping and separate design/operating evidence; standard versus urgent route clearly distinguished | Identify that the clean test predates and excludes the new route | Record what the evidence establishes and what remains untested. |
| 5 | Controls, main discovery: a compact diagram connects callback and supervisory approval to the same contact record | Surface a possible shared failure point and explain why two checks may offer overlapping protection | Validate the dependency and qualify the combined control assessment. |
| 6 | Residual risk and response: after-controls likelihood/impact, rationale, prior/current comparison, tolerance, and targeted actions | Help articulate the owner's judgment and check whether the proposed response addresses the cause | Confirm current residual risk, actions, closure evidence, and escalation status. |
| 7 | Review: concise handoff with decisions, qualifications, sources, and actions | Draft a summary preserving limitations and uncertainty | Edit, attest, and send for second-line review. |
| 8 | Second-line Dashboard: review queue and portfolio context; the assessment opens with conclusions, evidence, and questions together | Prepare a focused review brief and a question about the shared contact-record dependency | Inspect original sources and send an edited, specific challenge. |
| 9 | Challenge and response on the same record: reviewer asks how testing covers urgent wires after contact changes and how interim verification avoids that dependency | Check whether the proposed response addresses the requested scope and closure evidence | First line revises and confirms; second line judges sufficiency and records its review conclusion. |
| 10 | Role-specific dashboards and leadership report: assessment reviewed, current risk elevated, action still open | Draft a consistent narrative that preserves the qualification | Inspect and confirm the reporting narrative. |

The dependency discovery is part of the main walkthrough. Its diagram is small and explanatory: **Callback verification → Customer-contact record ← Supervisory approval**. It does not require an interactive network explorer.

The challenge is resolved through a better documented response and test plan. Do not fabricate immediate completion of testing during the meeting. The approved action scope, owners, and required evidence can be clarified while the action remains open. First-line revisions have a renewed attestation; second line records its own review outcome without silently rewriting the owner's rating.

## AI interaction contract

The current build scripts six main contributions: change interpretation, evidence applicability, shared dependency discovery, rationale assistance, cause-to-action fit, and focused challenge/resolution. Reporting reuses the recorded decisions and qualifications. The approved expansion below adds deeper analytical preparation.

Every suggestion displays its basis and limits, with options to use, edit, or dismiss it where relevant. Incorporation requires an explicit human action. Include one purposeful edit or dismissal to show that the person is evaluating the suggestion. The activity record distinguishes AI-assisted drafts from the human's final conclusion.

Use labels such as “Suggested,” “Source predates change,” and “Owner confirmation needed.” Arbitrary AI confidence percentages, unsupported peer claims, and assertions that absent evidence proves control failure do not belong in the demo. Required-field checks, dates, arithmetic, and workflow permissions are ordinary validation rather than AI moments.

Second-line review includes direct access to sources and a separate recorded human conclusion. A different AI persona does not establish independent human challenge.

Optional exploration can show comparable internal assessments or a bounded service-outage scenario using prepared content. These do not add steps to the core walkthrough.

## Approved intelligence expansion — November 14, 2026

The owner approved and requested implementation of the independent AI expert's suggestions. AI prepares the investigation before the user arrives: reconcile records, investigate claims, connect sources, examine competing evidence and explain the implications. These capabilities are now implemented as authored sample records and scripted interactions, with no live-system connections.

Use the first three as signature moments in the wire-transfer refresh. The remaining two provide optional depth within the same analysis surface. Retain the five assessment stages and approximately 8–10 minute main story by replacing shallow briefings with stronger moments.

| Priority / moment | First line: prepared work and experience | Second line: prepared work and experience | Scripted data and human boundary |
| --- | --- | --- | --- |
| Main 1: Reconstruct the full event | Open one chronology joining the October 20 fraud case, payment exception, contact amendment and approval record. See matching attributes, duplicate records, disagreements and uncertain links. | Inspect recorded facts, assumptions and uncertain matches before relying on the reconstruction. | Author a handful of synthetic records with different source IDs and predefined matching evidence. Several records of one incident count as one event. Humans validate proposed connections and relevance; matching does not prove causality. |
| Main 2: Examine the assessment's claims | Inspect what supports and challenges a conclusion, what the evidence covers and which assertions remain unresolved. Connect standard-route testing, the later urgent route and shared contact record. | Open a researched review brief with the owner's conclusion, strongest supporting and counter-evidence, shared underlying sources, competing explanations and an editable challenge. | Curate claim-to-source relationships and evidence that could distinguish explanations. Several documents repeating WT-25 are one underlying test, not independent corroboration. Humans decide effectiveness, evidence sufficiency and ratings. |
| Main 3: Explain the impact of new evidence | Read a prepared post-submission service-owner clarification: both checks use the contact record; a separate callback directory applies only to standard payments. Compare affected assertions and suggested wording with the submitted version, then choose whether to revise. | Inspect what changed, why, which parts of the challenge are addressed and what remains unresolved; record a separate human review conclusion. | Add a fixed new source and version-aware comparison. Trace documented relationships and distinguish proposed links. Preserve prior versions and human text. No rating, mapping, sign-off or report changes silently. No testing success or remediation closure is fabricated. |
| Optional 4: Relevance-tested research | Inspect a finished research pack connecting internal events, assurance findings, complaints, service incidents, comparable assessments and selected authoritative public material. See why each item applies, its important differences and excluded material. | Inspect research dates, searched sources, gaps, contradictory material and relevance reasoning. | Use an authored pack. Real public sources require verified primary references; synthetic institutional records remain disclosed in Presentation controls. Not finding something in searched sources does not establish that it does not exist. Humans confirm applicability. |
| Optional 5: Cause-specific response comparison | Compare customer payment confirmation with independent contact verification: exposure addressed, shared inputs, remaining gap and evidence needed. Explore a bounded amended-contact or cutoff/outage scenario. | Examine whether the response addresses the exposure and whether the proposed test and closure evidence could demonstrate its operation. | Use prepared option comparisons and test briefs. Separate observed events from hypothetical assumptions, planned protection from current operation, and assurance testing from actual implementation. Humans select the response and approve scope. No invented probabilities, savings or automatic score reductions. |

### Experience across both lines

Use **one clear finding → Show how we know → rigorous detail on demand**. Reuse contextual analysis for timelines, claim/evidence review, research and comparisons. Keep material qualifications visible, with extended detail behind deliberate actions. Each feature must prepare substantive analysis rather than merely assign more questions to the owner.

First line owns assessment conclusions, mappings, responses and attestation. Second line receives independent review preparation: supporting and challenging evidence, a focused question, revised response, version comparison and its own recorded judgment. A second AI voice does not substitute for independent human review. Drafts enter editors through explicit Use actions; sending and confirming remain separate human actions.

### Flagship dashboard entry

The first-line Dashboard visibly launches the story with **Refresh wire-transfer RCSA** beside the heading, before charts and work tables. It opens What changed and retains the existing draft. Once the refresh is underway, **Continue wire-transfer refresh** opens the next unconfirmed stage. Submitted/reviewed records and open questions use appropriate view/respond labels; the CTA never silently resets or reopens a submission. Second line has a corresponding review/view action for the same assessment.

### Expansion acceptance criteria

- [x] Event reconstruction exposes matching evidence, an uncertain relationship and duplicate-event protection.
- [x] Claim analysis shows supporting evidence, strongest counter-evidence, shared underlying sources and unresolved assertions.
- [x] Second line uses prepared analysis to edit a specific challenge and records its own human conclusion.
- [x] A prepared new-evidence scene shows source-backed differences and preserves the submitted version.
- [x] Both first- and second-line walkthroughs demonstrate the new intelligence and separate human actions.
- [x] Research and response comparisons remain optional, with source scope and hypothetical assumptions clear.
- [x] New outputs use authored sample records without live models, integrations, external messages or backend services.
- [x] The main story remains polished, simple and approximately 8–10 minutes, without extra top-level destinations.

## Independent RCSA-practice refinements

The requested independent expert research is recorded in the [RCSA-practice review](../ux/persona-qa/rcsa-practice-review.md), with verified Basel, OCC and recent FCA references and jurisdiction distinctions. The assessment foundation is sound. The implementation incorporates these refinements alongside the approved AI expansion:

- [x] Make the owner's risk-specific control conclusion visible: design, operation and combined protection in one short editable conclusion with optional detail.
- [x] Separate protection to implement or interim measures from assurance/testing and closure evidence; give each appropriate ownership, dates and status.
- [x] Give second line an explicit independent assessment-level view and rationale, distinct from whether its question was answered.
- [x] Reconcile PI-12 and QI-04 intelligence with the supporting risks through an owner qualification or new-evidence review state, without automatic rating changes.
- [x] Expose process scope, routes, handoffs, dependencies, owner, horizon and change/event refresh triggers in an expandable card.
- [x] Keep a bounded cutoff/outage scenario optional, with assumptions and customer outcomes visible; distinguish service impact tolerances from the RCSA score threshold.

These refinements are implemented within the current screens and scripted sample-data boundary. They do not establish universal regulatory requirements or compliance certification.

## Dashboards and reporting

| Surface | Content and visuals | Meaningful interaction |
| --- | --- | --- |
| First-line dashboard | Owned processes, assessments due, actions, open questions, current risk, and evidence needs | Open the relevant assessment, action, or question. |
| Second-line dashboard | Risk distribution across units, material changes, unresolved challenges and aging, and evidence limitations | Select a concern to see the contributing assessment records. |
| Leadership report | Prior/current risk, inherent and residual comparison, material change narrative, control dependency, management response, action status, and review conclusion | Trace a statement or chart back to its source assessment and evidence. |

Use a small set of readable charts: a risk matrix, prior/current comparison, and action/challenge status. Chart counts and dates reconcile with the sample records. Completion and risk are separate measures. Reports do not imply remediation success from review completion or present synthetic time savings as measured results.

## Experience and presentation

The visual direction is a calm, light workspace with precise typography, generous but purposeful spacing, restrained semantic color, legible charts, and quiet transitions. Show banking rigor through understandable content and traceability.

Keep the primary screen focused on the conclusion, its short rationale, material caveats, owner, and next action. Put evidence excerpts, rating definitions, detailed mappings, and history in persistent side panels. Reserve hover text and information buttons for short definitions; provide keyboard and touch access. Important qualifications remain visible beside the conclusion.

Use plain English alongside formal labels where useful, such as “Risk before controls” with “Inherent risk.” Keep risk statements and explanations concise. A suggested AI insight sits beside the task it supports. The work can continue while its detail panel is closed.

Provide one primary action per stage, back navigation, stable context, clear selected states, focus feedback, and reduced-motion support. The target desktop presentation is 1440×900, with tablet and narrow layouts verified. The presenter can reset the demo or jump to a named scene, with those controls kept separate from the banking workspace.

## Scripted implementation boundary

Use local static fixtures under `assets/data/` and a small client-side scene/state model. Keep record identifiers stable across risks, controls, sources, decisions, challenges, actions, and charts. Add or revise the relevant data contracts before replacing legacy fixtures.

Visible core controls work: navigation, role perspective, forward/back, the prepared rating choices, suggestion use/edit/dismiss, source panels, challenge submission, scripted response, report drill-down, and reset. A small client-side draft field or curated text alternatives is sufficient. No free-form AI interaction is promised.

No model calls, API keys, backend, database, real authentication, integrations, document ingestion, emails, live analytics, or production approval workflow are in scope. Keep the demo self-contained with local assets and a clear “Illustrative demo” label. Reset restores the initial scenario; reload preserves the current tab's limited, resettable session where browser storage is available. A real export is unnecessary; a polished report preview satisfies reporting scope.

## Delivery sequence

| Phase | Deliverable | Completion evidence |
| --- | --- | --- |
| 1. Finalize scope | This plan, decisions, and current governance references | Complete as of November 14, 2026. |
| 2. Establish visual direction | Concepts for the assessment workspace, control evidence/dependency state, and dashboard; shared visual system | Select a coherent concept before UI implementation. |
| 3. Author the scenario | Complete sample risk register, rating method, evidence excerpts, roles, challenge, response, and state transitions | Facts, chronology, scores, and report totals reconcile. |
| 4. Build the walkthrough | Shared shell, role-specific workspaces, five assessment stages, challenge loop, and scripted interactions | Core story can be replayed from start through review. |
| 5. Complete reporting and polish | Both dashboards, leadership report, source traceability, and presenter controls | All views show the same final outcome and qualifications. |
| 6. Verify and package | Browser checks, responsive/accessibility review, screenshots, run instructions, and presentation script | Main story and reset work consistently with local demo assets. |

## Acceptance criteria

- [x] Every sample risk has an inspectable inherent, control, and residual assessment with human-confirmed conclusions.
- [x] Likelihood, impact, rationale, prior/current comparison, and rating method are available for both risk assessments.
- [x] Control design, operation, evidence applicability, and combined coverage are distinguishable.
- [x] The clean standard-route test is never presented as establishing the changed urgent route's effectiveness.
- [x] The shared contact-record dependency is discovered, explained, and validated in the main walkthrough.
- [x] AI suggestions remain provisional until a person acts; an edit or dismissal is demonstrated.
- [x] The owner confirms the rating and response; second line records a specific challenge and separate review conclusion.
- [x] Planned remediation and review completion do not reduce current residual risk or imply risk acceptance.
- [x] Dashboards, report statements, scores, dates, counts, and source references reconcile with the same fixtures.
- [x] Core navigation, choices, sources, challenge/response, role perspectives, report drill-down, back, and reset work.
- [x] Keyboard, focus, contrast, persistent detail access, responsive layout, and reduced motion are verified in-browser.
- [x] The demonstration uses local synthetic content with no live models, institutional data, or service dependencies.

## Practice references

BCBS describes self-assessments covering inherent risk, control effectiveness, residual risk, likelihood and consequences, with sufficient rationale for review. Its guidance also connects self-assessment with events, testing, comparative analysis, and second-line challenge. This grounds the assessment structure; it does not prescribe this demo's scoring bands or endorse its AI concepts. [BCBS operational-risk guidance](https://www.bis.org/committees/bcbs/basel-consolidated-guidelines/module/orr/10), paragraphs 10.44 and 10.49.

FFIEC discusses layered security and periodic control assessment. Identifying a shared source dependency is a proposed demo inference from synthetic procedure descriptions. [FFIEC authentication and access guidance](https://www.ffiec.gov/sites/default/files/media/press-releases/2021/authentication-and-access-to-financial-institution-services-and-systems.pdf).

Source inspection and explicit human judgment also address risks such as confabulation and over-reliance described in the [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf).
