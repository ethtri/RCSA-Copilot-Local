# Workflow demo data contract

The active application reads `assets/data/workflow-demo.json`, `assets/data/risk-intelligence.json`, `assets/data/research-demo.json` and `assets/data/assessment-context.json`. Older dashboard, wizard and ROI mock files are legacy references, not the running application's source of truth.

The fixture has a version, period, fixed assessment date, named owner/reviewer, risk register, control library, source evidence, action and prepared question/response alternatives. Internal bank records are synthetic; dated public references retain their original source links. Source IDs and control IDs are stable and validated by `node tools/verify-demo.mjs`.

Each risk has an ID, name, event description, inherent likelihood/impact and separate rationales, prior residual rating, current residual likelihood/impact and separate rationales, control IDs and source IDs. The main risk defaults to inherent High 16, prior residual Moderate 8 and refreshed residual Elevated 12. Supporting records default to Moderate 6. The fictional scoring scale and tolerance are inspectable in the UI.

Each control has a purpose, owner, documented design, explicit design conclusion, operating conclusion, evidence summary, source ID and test-source ID. Test scope and date remain separate from the effective date of the new procedure. Source records contain title, reference, date, scope and exact excerpt; selected source phrases are highlighted only for the proposed shared-source interpretation.

Session state contains draft ratings and rationale, confirmation flags for every risk, the dependency decision and qualification, action details, exact review question/response, reviewer rationale, workflow status and immutable submission/revision snapshots. Report confirmation is tied to a fingerprint of the underlying assessment. Perspective changes do not confer authority to change a submitted rating. The application stores this state in optional sessionStorage; reset restores fresh fixtures.

Submission requires confirmed scope, the main inherent/control/residual assessments, every supporting assessment, a considered dependency suggestion and a complete action. Revisions require complete action/closure evidence and owner attestation. Human review can return a response or complete the review. Neither path changes ratings, closes testing or accepts risk. The last confirmed rating appears in dashboards until an edited residual assessment is explicitly confirmed.

UI values are escaped before HTML insertion. There are no network calls beyond local application assets, no real customer records, no authentication service and no model endpoint.

## Product refinement contract

Session schema version 2 adds per-risk mapping rationale, last-confirmed residual rating and risk response (strategy, rationale, owner, review date and created/review-needed flags), plus a proposed-control library. The three risk rows belong to one wire-transfer process/assessment. Dashboard metrics and work queues use that grain.

Relationships support add, edit rationale, atomic replace and removal. Definitions remain in the library. New controls are Proposed with no test evidence. Manual controls have no invented source; the prepared AI proposal cites the near miss as its suggestion basis. Mapping changes invalidate control/residual confirmations and response applicability, preserve the last confirmed current rating, and supersede the shared-source finding when the mapped pair changes. An empty mapping needs owner confirmation.

An above-tolerance risk needs an intentionally created response; prefilled action data alone is insufficient. Strengthen/change/transfer responses require a linked action and closure evidence. Acceptance is a pending request with a review date, never an approval. Risk responses are separate from review-question replies. Mapping changes, response creation and completed review do not change a confirmed rating automatically.

Sample context is inside collapsed Presentation controls. All assistance remains prepared locally. A version-1 session starts fresh under version 2 so its prefilled action cannot silently count as a created response.

## Persona-finding remediation

Each changed mapping records a risk-specific applicability conclusion (unassessed, expected design coverage, limited coverage or no current coverage). Prepared fixture relationships retain their existing conclusions. Free-text rationale and a library result cannot infer a new applicability conclusion. An unassessed new relationship blocks control confirmation. Proposed controls still have no current operating evidence.

A returned review records the exact rationale both as current owner feedback and as immutable history detail. Later reviewer conclusions leave that return event intact. Reply drafting updates only the response text, preserving independently authored closure evidence. Response-topic checks are explicitly mention cues and never a sufficiency decision.

The read-only decisionBrief helper supplies a synthetic strategy-specific decision request, owner/forum and November 19 target, separately from action due dates and acceptance review dates. Draft, submitted/pending and not-required states are distinct. These values are presentation content, not an institutional approval policy or outcome.

## Library revisions and connected analysis

The library includes an unmapped customer payment confirmation control with a recorded standard-route sample, owner and coverage limitation. Adding it requires the same explicit applicability judgment as any new mapping. The library remains browsable after submission and in second line. Only first line can start an owner revision. `revisionOf` identifies the preserved base version, while `reviewConclusions` archives that version's review status, exact reviewer rationale, question, response and any current returned clarification. Existing snapshots and decision history are retained. New submission increments the version after the normal human confirmations.

The intelligence fixture has an as-of date, eight additional source records with unique `ri-` IDs and a case for each risk. Cases contain inherent/residual lenses, four connected signals, source IDs, context-specific questions and an authored response draft. Signals distinguish observation, relevance, status, chronology, evidence limit and related records; a related record is not counted as another occurrence. The app merges the additional source records into its local source register.

Analysis navigation stores its lens, return destination, selected tab and optional source/signal focus. Rendering or exploring analysis does not change risk judgments or workflow decisions. Response drafts and reviewer-question drafts enter editors only after an explicit Use action. Response creation and challenge submission remain separate actions. No AI judgment, automatic issue closure, event-rate calculation or live retrieval is implemented.

## Connected investigation iteration

The research fixture adds three authored event records (contact history, payment exception and supervisor review) and a post-submission service clarification. The supervisor match is explicitly provisional; related records never increment the event count. `eventMatch` records an explicit owner judgment in history. Research/options/claims views are read-only and distinguish observations, assumptions and source limitations.

Each risk can store `controlConclusion.text`. Editing it invalidates control/residual confirmations and applicability of an existing response. Confirming controls records the exact owner text; snapshots retain it. Prepared supporting conclusions acknowledge PI-12/QI-04 without embedding a fixed residual band. Empty owner text remains empty across navigation and cannot be confirmed.

Risk responses store `protection`, `protectionOwner`, `protectionDue`, and `protectionStatus` separately from assurance action/evidence. Non-acceptance response creation requires those protective-measure details. Implementation status is owner-recorded, with no automatic effectiveness conclusion or rating change.

`assessmentView` records the second-line independent assessment view. Both that view and reply sufficiency are evaluated at completion: either Return keeps the question/review open. Agreement requires reviewer rationale and UI attestation. Archived review conclusions retain the independent view.

Receiving SO-19 stores `newEvidenceReceived` and `evidenceBaseVersion`, leaving risks and submitted snapshots unchanged. Explicit owner use stores `evidenceApplied`, creates an owner revision and invalidates affected confirmations. The comparison continues to use the original received-against snapshot after later submissions, displays pending/draft/incorporated states, and shows actual owner-edited wording. A second Use of the same received source cannot reopen another revision. Existing sessions retain earlier records without inventing a separately recorded control conclusion.

## Assessment history and external intelligence

`assessment-context.json` holds three authored prior-cycle records per risk and a curated external comparison as of November 14, 2026. Historical Q1–Q3 values are fixed sample records using the same five-point method. Q4 values and confirmation flags come from current session state. Both inherent and residual series remain visible; current draft markers are hollow and only unconfirmed extensions are dashed. A separately annotated marker records the last confirmed residual position. Scope change is noted at Q4; changes of method or perimeter must be considered before reading a trend.

FBI 2024/2025 BEC figures are verified public reporting data, not synthetic internal measurements. Their reporting periods, definitions, source URLs and limitations remain attached. The FinCEN reference is a dated 2019 advisory. Comparison arithmetic is deterministic. No live feed, bank event rate, probability estimate or rating adjustment is inferred. Internal history remains sample data disclosed in Presentation controls.

The optional history-rationale action previews an addition and requires explicit owner Use; it preserves the existing text and rating choices, invalidates the relevant confirmation and existing response review as appropriate, and is unavailable for submitted records or second-line mutation. Merely reading charts or sources changes no judgments.

The first-line Review surface is the full assessment report across all three risks. Submission remains guarded by the existing readiness and attestation checks. Submitted/reviewed states show the submission record and report/revision routes instead of resubmission. Response labels distinguish missing, review-needed and recorded responses; recording a response leaves linked actions open.
