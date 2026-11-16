# Workflow demo data contract

**Current session schema:** 3  
**Implementation:** native local ES modules and synthetic JSON fixtures  
**QA status:** implemented locally; final integrated acceptance is tracked in [the verification record](../operations/demo-experience-upgrade-verification.md).

## Fixtures and source identity

The active app reads `workflow-demo.json`, `risk-intelligence.json`, `research-demo.json`, `assessment-context.json` and `control-assistance.json` from `assets/data/`. Earlier dashboard/wizard/ROI files are historical references. The runtime view derives its risk selector from active session records rather than assuming the original three-risk fixture is exhaustive.

Each source has a stable ID, title, record reference, date, scope and excerpt; an explicit source version is retained where available. Internal bank records and prepared receipt events are synthetic. Public references keep their own dated URLs and limitations. Local source inspection does not fetch new research. The authored service clarification SO-19 is unavailable until its explicit receipt event.

An added risk can contribute sources through `additionalSources`. The retry/recovery candidate has three matching records: an uncertain-release event, retry procedure and recovery test scope. An ordinary-release sample does not establish that retry controls work.

## Session and migration

`createInitial` creates `version: 3` / `schemaVersion: 3`. The app uses the existing sessionStorage key `rcsa-workflow-demo-v1`; the key name is not the schema version. Session data includes active risks, proposals, mapping judgments, responses, submitted snapshots, review conclusions, conversations, operational records and report workspace state.

`migrateSession` supports schema 2 and schema 3. It clones the input before migration, retains typed drafts and historical snapshots, and adds missing current fields. A historical snapshot that lacks its source/control/method context remains explicitly incomplete; current fixtures are not used to invent historical evidence. Unsupported or unreadable sessions produce a recoverable error. The app preserves the raw data for download before using a fresh local workspace. If storage is unavailable, the app says that reload will lose in-memory changes.

`asOf` is an explicit demo date, initially `2026-11-14`. Presenter controls can change it after exact calendar validation. Expiry uses this date, never the machine’s clock. Changing it does not alter a rating.

## Risk and control records

Risks have stable IDs, name, description, optional cause/event/harm/scope/owner fields, source IDs, mapped control IDs, inherent and residual likelihood/impact with separate rationales, confirmation flags and a risk response. A prior rating and the last confirmed residual rating are nullable. Missing values render as Not assessed or No previous assessment; they are not converted to zero or a fabricated prior cycle.

`riskEntries` selects active records, excluding a risk marked removed in the current draft. A newly discovered risk starts unconfirmed with blank ratings, no prior rating, no mapped controls and no recorded response. Removing a draft risk does not remove it from an earlier immutable submission.

The illustrative rating method uses 1–5 likelihood × 1–5 impact: Low 1–4, Moderate 5–9, Elevated 10–15 and High 16–25; the bank threshold is Moderate, up to 9. The method has a stable ID and version. The original unauthorized-transfer fixture has inherent 16, prior residual 8 and an unconfirmed refreshed residual 12. Supporting fixture risks start with prepared confirmed positions of 6.

Control definitions remain separate from risk-to-control relationships. A mapping records rationale and an explicit owner applicability judgment: unassessed, expected design coverage, limited coverage or no current coverage. New unassessed mappings block confirmation. Replacing a mapping is atomic; removing a mapping retains the library definition. An empty mapping requires an explicit owner conclusion and confirmation that no controls are mapped.

New control designs remain Proposed and unimplemented. Current/proposed counts distinguish them. A design judgment is not an operating-effectiveness conclusion. Evidence scope and dates remain tied to the source that actually supports them.

## AI proposals and discovery

Rating proposals carry source IDs, an input signature, proposed fields, evidence limits, status, applied fields and disposition history. The owner can apply selected fields, edit them or keep the current assessment with a note. Application changes only the draft and invalidates relevant confirmations. Changed inputs make a proposal stale; it must be refreshed before use. An unsupported or owner-defined case shows its unavailable state instead of borrowing another risk’s explanation.

Discovery records Add, Extend, Defer or Dismiss with provenance. Defer requires a follow-up owner and valid date. Extend records the scope change on the existing risk and invalidates affected assessments rather than adding a duplicate risk. The prepared control/rating content is used only within its authored scope.

Control assistance uses relevant existing/enhancement/new candidates, editable design details, reasoned dismissal, set-aware evidence gaps and separate implementation/testing tasks. Mapping, conclusion or evidence changes mark the linked plan for review. The plan uses the selected edited design and cannot silently establish current protection.

## Responses and linked work

Each risk response records its approach, rationale, owner, created/review-needed state and approach-specific content:

| Approach | Required contract |
| --- | --- |
| Strengthen controls | Change to make, implementation/testing work, owners, dates and completion evidence |
| Ask management to accept risk | Reason, conditions/limits, monitoring, decision owner and expiry/review date |
| Change or stop activity | Affected activity, customer/process impact, transition work and linked evidence |
| Transfer part of the risk | Arrangement, retained exposure, dependencies/counterparty evidence and follow-up work |

A recorded response is distinct from prefilled draft fields. Above-threshold risks require a recorded response. An explicitly selected acceptance approach creates a request; only management can approve it. Using an AI response draft does not silently switch the selected approach or overwrite owner work. A strategy switch retains earlier responses and operational records in history and removes contradictory active work.

## Submission, review and frozen projections

Submission requires confirmed scope, valid inherent/control/residual assessments for every active risk, considered shared-source judgment where relevant, recorded required responses and up-to-date linked plans. UI owner attestation precedes the `sendAssessment` transition.

Each submission increments `versionNumber` and freezes risks, action plans, custom control definitions, assistance plans, operational context, source excerpts/metadata and rating-method version. `assessmentProjection(state, version, data)` returns a clone of the selected assessment and its pinned review conclusion. `reviewedProjection` returns a projection only after that version has a completed independent review. Reporting and GRC share these projections.

Independent review supports direct agreement, direct return for changes or an optional question. An unanswered question prevents agreement. A conversation-only reply appends a conversation event without incrementing the assessment version or rewriting the submitted snapshot. If assessment content changed, an owner revision and renewed confirmations/submission are required. Returned reviews and their exact reasons remain in history.

Reply suggestions use the linked risk/action/version, recognize bounded ordinary and compound intents, and require a risk selection when ambiguous. Missing facts stay missing. Preview/replace/append/undo preserve owner text until an explicit insertion. Topic cues mean Mentioned in draft; they are not an answer-quality or sufficiency judgment.

Neither review completion nor a conversation reply changes ratings, closes work or approves risk acceptance.

## Operational records

`operations.actions[riskId]` stores actual execution records: stable ID, assessment link, independent version, plan, accountable owner, executor, due date, status, progress, required evidence, received evidence, closure conclusion and events. States are planned, in progress, evidence submitted, returned and closed. Implementation and testing tasks stay separate. Prepared evidence selection records a local synthetic receipt; it is not an upload or automated evidence validation.

Only the owner/executor perspective updates open work or submits evidence. Only Control assurance can close or return submitted evidence, with a reason. The executor/evidence submitter cannot close their own work. Read-only perspectives see recorded values rather than another role’s unsaved operational edits.

`operations.decisions[riskId]` stores owner-prepared requests with owner, forum, target date, reason, conditions, expiry/review date, status and history. States include draft, submitted, returned, approved, declined and expired. Only the Management perspective records approval/decline/return. Expiry is derived from the explicit demo as-of date. A request to continue activity remains distinct from time-limited risk acceptance.

Evidence requests have their own stable IDs, risk/source link, provider, target date, scope, receipt and events. Receiving a prepared pack adds a bounded source record for owner assessment; receipt does not confirm effectiveness or change a rating. No message is sent externally.

Operational updates append their own versions without altering the original submitted assessment. The [GRC contract](grc-reference-exchange.md) defines separate operational delivery and preserved bank-owned fields.

## Reports and output

`reportWorkspace` stores the selected assessment version, edited summaries and confirmed report editions. The report covers every active risk in that version, including no-prior-data states, current/proposed controls, evidence limits, review conclusions and explicit linked work-record versions as of the displayed date.

Confirmation binds actual summary text, assessment projection and included operational record versions. A meaningful change requires fresh confirmation. A confirmed edition retains a clone of those records and its generated HTML; subsequent edits cannot rewrite it.

Download creates a real self-contained HTML document with escaped editable text, embedded source excerpts and print styles. Print opens that generated report with details available; blocked popups have an honest download alternative. No native PDF-export dependency or external document service is implied.

## Local authority and safety boundaries

The five presenter perspectives are assessment owner, independent reviewer, control assurance, management decision owner and GRC administrator. Transitions enforce their local authority separately from visibility. This is a demonstrable contract for a future authenticated product, not production authentication.

All HTML text is escaped. No live model, real customer record, bank connector, external message, real file ingestion or production service is involved. Planned protection, work completion, review and management approval do not automatically reduce a confirmed rating.
