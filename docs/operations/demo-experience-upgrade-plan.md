# RCSA demo experience implementation plan

**Prepared:** November 15, 2026  
**Status:** Implemented and verified locally. See [the final verification record](demo-experience-upgrade-verification.md) for evidence, tested revision and platform-check limits.  
**Baseline:** `29540e61e516e799db0a50cf816a00ec427006ee`  
**Review:** [Detailed demo audit](../../output/demo-audit-2026-11-15/review.html)

## Outcome and scope

Make the demo feel like a capable AI-first assessment product. AI should prepare useful work that people can inspect, change and apply. The main screens should use plain English, show the next decision clearly, and keep detailed analysis available on request. The finished experience should feel consistent, readable and dependable throughout.

Implement every recommendation in the November 15 review, including the larger additions: risk discovery, explicit rating proposals, realistic action and management decision records, and a complete editable report with a real downloadable output. Priorities determine implementation order; they do not remove lower-priority recommendations from scope.

Keep the existing native HTML, CSS, ES modules and local synthetic fixtures. AI, replies, evidence intake, permissions and GRC updates remain bounded local simulations. This upgrade does not require live models, credentials, a framework migration, production authentication, a database or paid infrastructure. Use explicit inputs, traceable outputs, human decisions and realistic failure states so the behavior can serve as a credible contract for a later production build.

Preserve the current green visual identity, source traceability, evidence limits, version history, independent review, and separation of current risk from proposed work and management approval. Do not restore v3's unsupported confidence percentages, invented performance claims, automatic risk-reduction formulas or export buttons that only show a success message.

## Relationship to existing plans

This is the execution plan for the November 15 audit. The [workflow plan](workflow-demo-plan.md) remains the domain foundation, amended by the explicit review, record and reporting behaviors below. The [AI expansion plan](ai-capability-expansion-plan.md) remains the detailed capability reference. Its remaining AI-05 through AI-08 work is included here, with the mapping recorded below.

Earlier completed polish and QA records describe their own releases. They do not certify this upgrade. Preserve those records and the audit evidence; add new verification results when work actually passes. The `DX` identifiers below are local work items, not GitHub issue numbers. Creating this plan does not change remote issues or publish a release.

## Delivery sequence

| Stage | Work | Dependency | Exit condition |
| --- | --- | --- | --- |
| 0 | DX-01 Design and complete interaction specification | Audit | Full visual references, final core copy and state map ready for implementation |
| 1 | DX-02 Record model and migration; DX-03 state and version rules | Stage 0 interaction contracts | Existing draft preserved; added risks, linked records and version projections work in the model |
| 2 | DX-04 shared controls and editing surfaces | Stages 0 and 1 | Reliable fields, validation, focus, drawers, editors and saved-state feedback |
| 3 | DX-05 refresh proposals; DX-06 risk discovery; DX-07 rating assistance; DX-08 control assistance | Stages 1 and 2 | Owner can complete an AI-prepared refresh, including an added risk |
| 4 | DX-09 response strategies; DX-10 review reply assistance; DX-11 independent review | Stages 1 through 3 | All response approaches and all reviewer paths behave consistently |
| 5 | DX-12 actions; DX-13 management decisions; DX-14 reports; DX-15 GRC readiness | Stable record contracts; review completion for final integration | Complete linked follow-through and a version-specific all-risk report |
| 6 | DX-16 final copy; DX-17 responsive and accessibility finish; DX-18 motion | Applied throughout; final pass after Stage 5 | Complete experience is readable, responsive and consistent with its visual reference |
| 7 | DX-19 verification and handoff | All preceding work | Review findings closed with evidence, regression checks pass, full rehearsal complete |

Copy, accessibility and responsive checks are part of every increment. Stage 6 is the cross-app finish, not their starting point. Do not postpone model or error-recovery defects until the final polish pass.

## Stage 0 Design and specification

### DX-01 Establish the complete visual and interaction reference

Use the installed `build-web-apps:frontend-app-builder` workflow for the redesign. Its skill file is at `C:/Users/ethtr/.codex/plugins/cache/openai-curated/build-web-apps/2f1a8948/skills/frontend-app-builder/SKILL.md`. Follow its full-screen concept, design-system extraction, implementation and concept-to-browser verification requirements. Retain this repository's static framework.

Prepare coordinated visual references for the owner dashboard, prepared refresh, assessment with AI proposal, controls and plan editing, response choices, reviewer decisions, linked action/decision records, and complete report. Include a source drawer, long editor with errors, a populated and empty proposal state, and representative narrow layouts. Reuse the accepted design system across related states; generate additional detail references where density would make a full-screen concept unreadable.

Show a concrete, complete visual direction for selection before visual implementation. Approval applies to the rendered references and their real copy, not to an abstract description. The user can explicitly opt out of concept generation. No approval is needed merely to finish this plan.

Extract shared typography, colors, spacing, field/control states, table rules, drawer/editor anatomy and motion tokens. Keep functional headings near 28–32px as a starting point, normal work content around 14–16px, and secondary metadata around 12–13px with verified contrast. The accepted visual reference governs final values.

**Deliverables:** screen inventory, annotated concepts, selected reference, copy inventory, state/role map, component inventory and updated implementation-design document.

**Acceptance:** Every required workflow has a designed destination and a clear primary action. Essential work fits a normal laptop viewport without a large introductory section. Core AI value is visible by default; evidence and methodological detail open on request.

## Stage 1 Record and state foundations

### DX-02 Generalize records and migrate existing sessions

Update the contracts before the UI. Separate assessment records, risks, source versions, proposals, mapped controls, actions, decisions, conversations, submissions and review conclusions. Use stable IDs and explicit links. Replace core assumptions that `unauthorized` owns the only action, decision, dependency and review question. Scenario-specific facts can remain in fixtures.

Use a canonical risk selector derived from current state across assessment, analysis, dashboards, reports and GRC. A new risk starts as an unconfirmed draft. Missing previous ratings and history are nullable and render as **No previous assessment**, not zero or an invented Q3 entry. An unsupported analysis case shows **No prepared analysis** and supports owner entry; it must never reuse unrelated cutoff or primary-risk facts.

Add an explicit schema version and migration from the existing version 2 session. Preserve typed drafts, submitted snapshots, reviewer conclusions and custom controls. Retain the original stored data until migration succeeds. Incompatible or corrupt data gets a recoverable choice to preserve the draft or start a fresh demo, without silently deleting it. Reset and every presenter scene must create coherent records in the new schema.

**Primary files:** `model.js`, `responses.js`, `mappings.js`, `assessment-context.js`, `research.js`, `risk-intelligence.js`, `dashboard.js`, `reports.js`, `grc-exchange.js`, fixtures and data contracts.

**Acceptance:** Migration retains an edited existing session and its snapshots. A fourth risk without history can be assessed, submitted, reviewed and reported. Counts, launch/resume actions and risk selectors reconcile. Cross-risk edits do not change unrelated records.

### DX-03 Define transitions, authority and version projections

Centralize allowed transitions and validations rather than relying only on hidden buttons. Model proposal application, owner confirmation, submission, reviewer agreement/question/return, owner revision, action execution/closure and management decision as separate events.

Pin submissions, review conclusions, reports and GRC payloads to the exact assessment version. Freeze the evidence context used by that version: source excerpts and metadata, control definitions, and the rating-method version, not just IDs that later resolve against mutable fixtures. A conversation-only reply appends a reply event; it does not create a new assessment version. A changed assessment requires renewed confirmation and submission. Preserve old submissions and their conclusions when a new revision starts.

Define one projection for the reviewed assessment and its linked records so reporting and GRC cannot combine a historical risk snapshot with a live reviewer rationale. Operational updates append linked action/decision events with their own versions and dates. A report identifies both its assessment version and the operational information it includes; an archived report remains unchanged.

**Acceptance:** Proposed controls, completed work, completed review and accepted risk do not automatically lower confirmed ratings. Relevant edits invalidate affected confirmations, plans and summary confirmation, while preserving the last confirmed result. Read-only perspectives cannot mutate records through handlers or direct model calls.

## Stage 2 Reliable shared interaction

### DX-04 Build shared fields, local updates, drawers and editors

Create reusable primitives within the current ES-module architecture: compact assessment header, field/error summary, button variants, status, proposal comparison, details disclosure, source drawer, long editor and action footer. Consolidate their tokens and active CSS rules as they are touched; do not make stylesheet count a separate rewrite project.

Use persistent, specific validation inside the active editing surface. Link each error to its field, mark invalid fields, focus the first invalid field and retain entered values. A native form/submit handler should drive validation where practical. Success toasts can remain. Modal errors must not be sent only to a toast behind the backdrop.

Update local panels without replacing the complete app where feasible. Otherwise restore focus, selection and relevant scroll to stable control IDs. Reserve page-heading focus and page-top scrolling for route navigation. Preserve the existing editor-to-source-and-back behavior, including unsaved values and cursor position.

Use a source drawer for substantial evidence and a wider editor for full control/task records. Keep short definitions in compact popovers or dialogs. Provide one scroll region and a stable action area that does not cover the final input. Clarify Save draft, Apply proposal and Record decision. Closing an editor must not silently commit a business decision or lose a draft.

Show **Draft saved in this session**, **Not yet recorded**, and **Recorded version N** where relevant, separately from GRC sync. If storage is unavailable, say that reload will lose the draft. Do not imply a server save.

**Acceptance:** Blank control-name, mapping-rationale and plan-owner errors are visible inside the editor and remain until corrected. Filters, risk switches, strategy radios and AI tabs retain keyboard context. Sources return to the same edited field. Reload restores a supported saved draft; storage failure has useful feedback.

## Stage 3 Visible AI work

### DX-05 Make an AI-prepared refresh the main entry

Replace the reading-led entry with a compact prepared change set: evidence change, affected risks, proposed updates, outstanding evidence and next action. Show the last confirmed value, proposed value and owner draft separately. Keep the dated change records and full reasoning in the source drawer.

Give each proposal source IDs/versions, input signature, proposed fields, limitations, disposition and application history. Support field-level Apply, Edit and Keep current; reject or dismiss with an appropriate note. Applying a proposal changes the draft, not its confirmed rating. Regeneration must preserve owner edits unless the owner explicitly chooses replacement.

Connect analysis endings to Review proposed rationale, Request evidence, Compare actions or Return to assessment. Evidence requests become linked local work items with the requested records, owner and target date; no message is sent externally.

**Acceptance:** The ordinary launch path encounters a usable proposal without opening an optional section. A changed source marks related proposals stale. The owner can apply only a rationale, retain a different score, and inspect what was changed.

### DX-06 Add risk discovery with complete follow-through

Implement Add new risk, Extend existing risk, Defer and Dismiss. Show potential overlap and scope so an emerging scenario is not automatically counted as another risk. Preserve the reason and provenance for each disposition.

A created risk includes editable cause, event, harm, process scope, owner, source references and Draft status. It must traverse rating, controls, response when required, submission, review and reporting. Adding it changes submission requirements and counts immediately. Removing an unsubmitted draft cannot delete an earlier submitted record.

Use a coherent synthetic candidate distinct from the three existing risks, such as duplicate wire release during retry/recovery, with matching synthetic evidence and control options. Treat impersonation variants as possible extensions of the existing unauthorized-transfer risk. Preserve institution-specific taxonomy and scope judgments as human decisions.

**Acceptance:** A fourth risk can complete the entire workflow without primary-risk fallbacks or automatic confirmation. Extend does not create a duplicate. Defer records an owner/date. Dismiss survives reload. Missing data stays visibly missing. This completes the relevant AI-05 scope.

### DX-07 Add explicit rating and rationale proposals

Prepare separate likelihood and impact suggestions against the documented rating method and assessment period. Include rationale, sources, uncertainty and an insufficient-evidence outcome. Offer Use suggestion, Adjust and Keep current, with individual field application.

Check the owner's actual conclusion for bounded evidence claims. Distinguish a contradicted statement, an unsupported assertion and missing evidence. Link findings to the relevant excerpt. Do not present keyword matches as proof that a conclusion is correct.

Keep the last confirmed position separate from the unconfirmed draft on forms, heatmaps and reports. New risks have no previous score. Planned controls and task completion do not determine a lower score automatically.

**Acceptance:** An owner can use AI rationale with a different impact and record why. A deliberately unsupported claim produces a specific evidence finding. The before-controls lens excludes control effectiveness. Added risks receive relevant prepared content or an honest unavailable state. This completes AI-06.

### DX-08 Expose and connect the existing control assistance

Show one useful AI finding and existing/enhance/new options in the default Controls view. Keep full mapping tables, source analysis and design detail behind consistent controls. Distinguish counts such as **2 current · 1 proposed**.

Retain editable designs, applicability decisions, reasoned dismissal, set-aware gaps, implementation tasks, testing tasks and plan staleness. Turn each actionable gap into a working next step: compare designs, edit an enhancement, request evidence or prepare a test brief.

Generate plans from the selected and edited design, preserving owners, dates, operating methods and evidence requirements. New or unrelated risks must not receive an unauthorized-transfer template. Keep shared-source discovery as a compact decision within this flow; confirming the relationship does not confirm effectiveness.

**Acceptance:** The main flow exposes recommendations without a collapsed AI section. A design edit appears in the generated plan. A mapping/source change marks the affected plan for review. A proposed control is never counted as implemented protection. Existing AI-01 through AI-04 behavior remains covered by regression checks.

## Stage 4 Responses and independent review

### DX-09 Draft for the selected response approach

Implement four distinct contracts and forms:

| Approach | Draft content and required decisions |
| --- | --- |
| Strengthen controls | Operational change, implementation/testing tasks, owners, dates and evidence |
| Ask management to accept the risk | Exposure, reason, proposed limits, monitoring, decision owner and expiry/review date |
| Change or stop activity | Affected activity, customer/process effects, transition work, owner/date and evidence |
| Transfer part of the risk | Proposed arrangement, retained exposure, dependencies, counterparty evidence and owner/date |

Compare feasible alternatives using the actual risk and chosen design. Allow an alternative to be unsuitable or unsupported. If AI recommends changing approach, show an explicit comparison and switch action. Applying a draft must not silently replace the selected strategy or overwrite an edited response. Before a strategy switch, show which linked plans, actions and decision requests will be retained, superseded or cancelled. Record that disposition without deleting history or leaving contradictory active requests.

**Acceptance:** Each approach generates relevant content for two materially different risks and the added-risk case. Missing fields are specific to that approach. Acceptance remains a request until the authorized decision event. This completes AI-07.

### DX-10 Make reply assistance flexible within its evidence scope

Support bounded intents for action ownership, due dates, test population/scope, verification-source independence, rating rationale and missing evidence. Recognize ordinary paraphrases and simple multi-part questions. Read facts from the linked assessment/risk/action/version; do not answer from a single global prepared response.

Keep preview, replace, append and undo. Preserve typed owner replies and evidence fields. When several actions or risks match a question, ask which record the user means; never silently choose the first match. When information is missing or a question is outside the prepared scope, say what cannot be answered and identify the record/evidence needed. Topic checks remain **Mentioned in draft**, never **Answered correctly** or **Sufficient**.

**Acceptance:** Both ownership wordings from the audit return the same recorded owner and source. Missing owners stay missing. A question about another risk uses that risk's records. Compound, unknown and returned-clarification cases have useful behavior without unrelated suggestions.

### DX-11 Offer legitimate reviewer decisions

Provide Agree and complete review, Ask a question, and Return for changes immediately on a submitted version. Require appropriate reasons and reviewer confirmation. A question is optional, not a required story step. Support unresolved questions, answered questions, direct agreement and assessment-level return as explicit states.

Show an AI-prepared review brief and proposed question as editable assistance. After a reply, separate whether it answers the question from whether the assessment is acceptable. Returned assessment changes create an owner draft linked to the previous submission; preserve the earlier review. A conversation-only answer does not require a fabricated new assessment version.

**Acceptance:** An adequate submission completes review without a question. Direct return identifies the changes needed. A reviewer can return an insufficient reply and later resolve it. Only the current valid reviewed version becomes eligible for sync. Review completion leaves testing and management decisions separate.

## Stage 5 Operational records and final output

### DX-12 Add a minimal action execution record

Open the actual linked action from the queue. Include plan, accountable owner, executor, due date, status, progress, evidence required, evidence submitted, closure review and history. Support planned, in progress, evidence submitted, returned and closed states. Separate implementation tasks from assurance/testing tasks and distinguish required evidence from evidence actually received.

Use synthetic evidence selection or prepared receipt events; do not imply real file ingestion. Closure authority belongs to the configured assurance role, separate from the person submitting evidence. Add a focused assurance perspective in presenter controls if needed, reusing the same record rather than adding a separate dashboard. Keep ordinary assessment work simple.

**Acceptance:** An executor cannot close their own action without the configured review. Closure can be returned with a reason. Dates, queue counts, reports and history agree. Closing an action does not lower risk or rewrite the submitted assessment. The flagship ending can still retain an open testing action.

### DX-13 Add a real local management decision request

Make owner, forum, target date, conditions and review/expiry date editable as appropriate. Support draft, submitted, returned, approved, declined and expired outcomes, with a named actor and event history. Distinguish a request to continue activity from a time-limited risk acceptance request.

Provide a focused simulated management perspective in presenter controls for the decision event; only that authorized perspective can record approval or decline. Do not add a full management dashboard. Default owner/reviewer walkthroughs keep the decision pending unless the presenter intentionally demonstrates this branch.

**Acceptance:** The assessment owner can prepare/submit but cannot approve. A returned request can be revised. Approval records conditions and expiry; expiry is evaluated against the explicit demo as-of date. No decision silently changes ratings, closes testing or retroactively alters an archived report.

### DX-14 Produce an editable all-risk report and real output

Build the report from the version projection: complete risk register, prior/current comparisons, no-prior-data states, material changes, controls and proposals, evidence limits, actions, decisions, review conclusion and source/history links. Keep the executive summary concise and detailed analysis expandable.

Add Edit summary, Restore suggested summary and Confirm summary. Preserve edits through navigation. Confirmation includes the actual summary text, selected assessment version and included operational record versions. Underlying changes mark the latest summary for review; old confirmed report editions remain inspectable.

Provide a real downloadable self-contained HTML report with print styles, plus browser Print. Include the selected version and as-of date in the artifact. Do not add a PDF dependency merely to claim export. Embedded source excerpts and record references must remain useful when the downloaded report is opened offline. Escape editable text and use explicit safe serialization.

**Acceptance:** Output covers all risks including one added during the demo; the downloaded content matches the selected version. Editing/confirming works and meaningful changes require renewed confirmation. A prior report stays unchanged. This completes the reporting/output portion of AI-08.

### DX-15 Make GRC readiness specific and version-safe

Preflight rating methods, risk/control identifiers and required mappings before submission and again before sync. Name each affected record and its owner/next step. Missing mappings pause sync without losing the assessment. Provide a focused local administrator-mapping scenario through presenter controls for demonstrating recovery, without weakening role checks.

Use the same reviewed-version projection as reporting. Include all assessed risks and linked records supported by the adapter contract. A proposed new risk/control with no configured identifier must be mapped or excluded under an explicit reviewed rule, never silently omitted. Update the adapter contract and reference bank fixtures for the selected behavior.

Retain automatic sync after review, immutable source records, source-version comparison, method checks, transport retry and duplicate-update protection. Bind idempotency to the reviewed version and payload. A later action/decision event follows the defined operational-update contract; it must not mutate the original reviewed payload.

**Acceptance:** Draft, returned, stale and incompletely reviewed versions do not sync. The added-risk/proposed-control case produces a named readiness issue and a recoverable path. Retry does not duplicate records. Source conflicts preserve both versions for comparison. A successful sync and exported report reconcile on the same assessment version.

## Stage 6 Language and finish

### DX-16 Apply plain English across all states

Use the [copy review](../../output/demo-audit-2026-11-15/copy-realism-review.md) as the inventory, checked against rendered active paths. Cover headings, labels, actions, empty states, errors, toasts, reports, output, help and presenter controls. Standardize terms such as Send question, Points to address, Reason for your decision and Confirm summary. Keep formal RCSA terms in definitions and relevant report metadata.

Reduce repeated instructions and warnings. Always show the record state, owner, result, material limit and next action. Put analysis, source excerpts, test populations/dates, counter-evidence and methodology behind Why, Sources, Details and History. Use short tooltips for definitions only; each must also work on focus and touch. Essential limits remain visible.

**Acceptance:** Every action label describes its destination and consequence. A new user can identify the result and next action without reading methodological paragraphs. No stale specialist terms remain in active buttons after the chosen replacements, except deliberate formal labels and source quotations. Source quotations preserve their meaning.

### DX-17 Complete layout, responsive and accessibility checks

Apply the compact header and shared component system throughout. Remove repeated risk/navigation controls where one selector suffices. Expand rationale editors, increase operational text, verify text/control contrast and make states understandable without color alone. Keep chart values and accessible descriptions tied to actual records.

Repair the 601–700px header collision and test measured CSS widths 390, 640, 768, 1024 and 1440px. Use 1280×800 and 1440×900 laptop viewports to verify task density: selected risk, editable judgment, useful AI proposal and next action should be readily visible. Check 200 percent browser zoom and enlarged text. For narrow work queues, use compact item lists with full table access; label and provide keyboard access for any retained horizontally scrolling region. Keep targets large enough for touch and sticky controls clear of content.

Verify keyboard navigation, visible focus, modal/drawer focus containment and return, Escape behavior, field error announcements, meaningful reading order, expanded states and status updates. Use an accessibility scan plus targeted screen-reader spot checks; record the environment and any remaining limits without claiming full compliance.

**Acceptance:** No page-level overflow or clipped header controls at the target widths. Forms, long labels, errors, charts, drawers and the report remain usable at zoom. Keyboard users can complete the core and alternate flows. Verify applicable WCAG 2.2 AA criteria, including core text and control contrast; record the scope of checks without implying certification.

### DX-18 Add restrained motion

Implement tokens for local panel transitions, drawer entry/exit, disclosure changes and applied-proposal feedback. Start near 140–180ms for panels and 180–220ms for drawers, then adjust against the accepted visual reference. Briefly highlight changed fields and connect progress feedback to real pending states.

Keep controls immediately usable, preserve scroll and focus, cancel obsolete animations and honor reduced motion. Avoid artificial AI thinking delays and moving entire workspaces on every selection. Empty, unavailable, stale and successful states should feel equally intentional.

**Acceptance:** Motion clarifies where the result went without delaying the action. Reduced-motion users get immediate or minimal transitions and the same information. Rapid navigation does not leave stale panels or hidden focus.

## Stage 7 Verification and delivery

### DX-19 Verify every workflow and close the review with evidence

Extend existing checks where they test the changed behavior. Keep pure model/transition tests separate from browser checks. Do not treat old passing scripts or string-only rendering assertions as evidence that the new experience works.

| Verification area | Required cases |
| --- | --- |
| Sessions and migration | Edited old draft, old submitted snapshots, unknown/corrupt session, storage unavailable, reload, cancel/reset and each presenter scene |
| AI proposals | Partial application, owner edits preserved, dismiss/defer/extend, stale source, frozen submitted evidence context, insufficient evidence, field-level correction and undo |
| Added risk | No prior score/history, empty controls with explicit owner judgment, complete assessment, response if needed, review, report/export and GRC mapping |
| Control plans | Existing/enhance/new choices, edited design retained, wrong-fit control dismissed, source/mapping changes invalidate affected plans, proposed/current counts |
| Responses | All four strategies across different risks, alternate strategy explicit, linked work reconciled on a strategy switch, approach-specific required fields, owner work retained |
| Review | Direct agreement, direct return, question/reply, ambiguous multi-record questions, returned reply, unchanged conversation, changed assessment/re-attestation, stale-version protection |
| Actions and decisions | Submit/return/close evidence, authority checks, multiple linked records, management request/return/approve/decline/expiry, no automatic rating change |
| Report and GRC | All-risk version projection, edited summary, confirmation expiry, immutable old output, downloadable artifact, method mismatch, missing IDs, retry/idempotency and source conflict |
| Interaction | Persistent modal errors, focus after filters/tabs/risk/radios, drawer/editor return, keyboard/touch details, saved state, rapid navigation and reduced motion |
| Visual and content | Accepted-concept comparison, all target widths and zoom, long text, contrast, no unrelated fallback copy, no fabricated metrics, no false success feedback |

Relevant existing checks include `verify-demo.mjs`, control-assistance checks, `verify-owner-revision.mjs`, `verify-buyer-readiness.mjs`, `verify-automatic-grc-sync.mjs`, `verify-risk-intelligence.mjs`, `verify-risk-matrix.mjs` and `verify-copy-authenticity.mjs`. Inspect browser-script expectations before reuse: several encode old labels and workflow assumptions. Use the repository's supported browser path, with measured viewport dimensions. For interactive checks prefer the built-in browser, using the documented fallback only when unavailable.

Compare actual screenshots with the accepted concepts at the same state and dimensions. Open both using `view_image`, identify visible differences and repair them before sign-off. Capture fresh evidence for every original audit finding. Include desktop, intermediate-width, narrow, error, empty, stale and completed states. Keep the final audit and acceptance evidence; remove disposable debug artifacts and stop task-owned servers or helpers.

Rehearse a concise flagship story: prepared refresh, one applied assessment proposal, visible control improvement and plan, explicit response, independent review and a useful all-risk report. Preserve an approximately 8–10 minute guided path by making deeper branches optional to the presentation, while keeping them fully implemented and verified. Measure rehearsal duration rather than claiming time savings.

Have independent reviewers revisit AI capability, copy/realism and interaction/polish against the final revision. They must inspect the actual revision and distinguish implemented behavior from remaining proposals. Close each finding only when its acceptance evidence is linked.

**Acceptance:** Required model and browser checks pass on the final revision, the visual reference comparison passes, and every audit finding has fresh closure evidence. The flagship and alternate branches reconcile with the reported record versions. The rehearsal duration and remaining evidence limits are recorded accurately.

**Delivery artifacts:** updated runbook, schema/adapter contracts, design system notes, README and relevant plan/backlog statuses; verification record with revision, commands/results and screenshots; a review-to-implementation coverage ledger; final limitations. Commit/publish actions follow the applicable task authority and are not implied by this planning request.

## Review coverage ledger

| Audit recommendation | Work items |
| --- | --- |
| AI-prepared refresh and explicit applied changes | DX-02, DX-03, DX-05 |
| Restore useful risk discovery and complete lifecycle | DX-02, DX-06, DX-14, DX-15 |
| Suggested ratings, rationales and owner-claim checks | DX-05, DX-07 |
| Expose control suggestions and editable plans | DX-04, DX-08 |
| Turn analysis into actionable work | DX-05, DX-08, DX-12 |
| Strategy-specific response drafts | DX-09 |
| Natural question paraphrases and useful fallback | DX-10 |
| Direct agreement and return without forced challenge | DX-03, DX-11 |
| Editable all-risk report and real output | DX-03, DX-14 |
| Real action records and clear evidence/closure state | DX-02, DX-12 |
| Editable and routable local decision requests | DX-02, DX-13 |
| Current versus proposed control counts | DX-08 |
| Specific preflight and version-safe GRC recovery | DX-02, DX-03, DX-15 |
| Simple language, fewer repetitions and consistent details | DX-01, DX-16 |
| Material limits visible; analysis on request | DX-05, DX-07, DX-08, DX-16 |
| Persistent validation inside editors | DX-04 |
| Preserve focus, scroll and edits through local changes | DX-04, DX-17 |
| Compact hierarchy and readable operational text | DX-01, DX-17 |
| Consistent source drawer and long editor | DX-01, DX-04 |
| Accurate saved, recorded and sync states | DX-03, DX-04, DX-15 |
| Intermediate header, mobile density and scrollable tables | DX-17 |
| Contrast, keyboard, touch, tooltip and reduced-motion behavior | DX-04, DX-16, DX-17, DX-18 |
| Sleek purposeful transitions | DX-18 |
| Consolidate shared styles and component rules | DX-01, DX-04 |
| Preserve current strengths and avoid v3 false precision | DX-03, DX-07, DX-08, DX-19 |
| Full visual fidelity, realistic alternate paths and rehearsal | DX-19 |

## Implementation coordination

Use one integration lead for the model, migration, shared route/state contracts, fixture ownership and version projection. After Stage 1 stabilizes those contracts, independent contributors can handle the shared UI/copy system, AI capabilities, and operations/reporting within assigned modules. Keep edits to `app.js`, `model.js` and shared fixtures under one owner at a time. Contributors integrate against the agreed contracts and verify cross-feature behavior before marking work complete.

Design/content work can proceed beside record-model work after the interaction contracts are defined. Risk discovery precedes final all-risk reporting. Independent review and version projection precede final sync integration. Motion follows stable interaction, focus and layout behavior. Independent QA follows each meaningful increment and again on the final revision.

## Completion criteria

- [x] All DX-01 through DX-19 implementation contracts are delivered, including additions beyond cosmetic polish. Verification scope and limits are recorded in the linked ledger.
- [x] Every row in the coverage ledger maps to the fingerprinted implementation, automated checks and applicable browser evidence in the final verification record.
- [x] The app supports the flagship path and the alternate review, response, action and decision branches.
- [x] Added-risk records stay coherent across assessment, history, report, download and GRC.
- [x] AI output is visibly useful, editable and traceable, with honest unsupported states.
- [x] Current confirmed risk, planned protection, completed work, independent review and management acceptance remain distinct.
- [x] Final visual comparison, measured responsive checks, scoped keyboard/contrast checks and independent reviews are recorded. Remaining platform-check limits are explicitly described; no blanket accessibility certification is claimed.
- [x] The runbook, contracts and delivered version match the actual app, with no implied live services or fabricated outcome claims.
