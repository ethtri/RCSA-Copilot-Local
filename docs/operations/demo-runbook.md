# RCSA demo presentation runbook

Start the preview from the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/src/`. Python is the only runtime prerequisite; no package install or API keys are needed. The root URL and earlier Home/Dashboard/Wizard entry points redirect to the current workspace.

## Main walkthrough

1. In the first-line **Dashboard**, choose **Refresh wire-transfer RCSA** beside the heading. Inspect the revised procedure and near miss. Explain why the September test predates the new urgent route. Confirm scope. Returning to Dashboard exposes **Continue wire-transfer refresh**, which resumes the next unconfirmed stage.
2. Review **Risk before controls**. Inspect the likelihood and impact rationales and rating definitions. Confirm the main High 16 assessment. Supporting risks can be selected and inspected independently.
3. Review **Controls**. Inspect design and operating evidence, then confirm the control assessment. Open the shared-source discovery.
4. Read both procedure excerpts. Explain that matching source language suggests a relationship requiring human validation. Confirm, qualify or dismiss it. The decision records the relationship only; ratings remain unchanged.
5. In **Risk after controls**, inspect likelihood 3 and impact 4, Elevated 12. Choose **Create risk response**, review the AI draft, use/edit it and explicitly create the response. Inspect the approach, rationale, owner, linked action, date and closure evidence. Return and confirm the residual assessment. Planned mitigation does not reduce current risk. An acceptance request remains a separate pending decision.
6. In **Review**, inspect the handoff, check the owner attestation and send for review. Switch to the second-line reviewer using the contextual link or footer perspective control.
7. Inspect the conclusion and sources. Edit the suggested question if desired, then send the challenge. Switch to the owner.
8. Enter an owner reply, then choose **Draft a response** to preview a suggestion. Replace or append it explicitly, or cancel to preserve the reply. **Undo draft insertion** restores the previous text. The original test-scope question and the action-ownership question have bounded suggestions; other questions retain the reply editor without unrelated topic cues. Confirm the response and renewed attestation.
9. Switch to second line. Record the review rationale, choose sufficiency or return for clarification, attest and record the conclusion.
10. Open **Reports**. Trace sources, compare prior/current risk and confirm the narrative. Review completion, open testing and pending management disposition stay visibly separate. Inspect earlier submitted versions in **Decision history**.

The core story takes approximately 8–10 minutes with concise narration. Evidence, definitions and supporting risks provide optional depth.

The dashboard's primary action respects the record state: submitted/reviewed assessments open for inspection, and an open owner question offers Respond to review question. Second line has a corresponding Review wire-transfer RCSA / Review owner response action. These actions preserve the record; scene selection and Reset remain separate presentation tools.

The intelligence expansion and practice refinements are now implemented locally. Add these moments to the core replay:

1. From What changed, choose **Show how we know**. Inspect the four records and provisional supervisor-note match; record Keep provisional, Confirm or Dismiss. This records a relationship judgment only.
2. In the same analysis workspace, choose **Review & response → The assessment** for the owner conclusion, supporting/counter-evidence, shared WT-25 lineage and competing explanations. Research and Response options are optional depth; the latter includes a hypothetical longer outage.
3. In Controls, edit the **Control conclusion** and explicitly confirm. Supporting risks carry the PI-12/QI-04 qualification without automatically changing ratings.
4. In Response, review the three Approach / Protection / Validation cards. Expand Edit approach, Edit protection or Edit validation for targeted changes. Distinguish the protective measure, accountable owner, date and implementation status from the action's validation/closure evidence. Record the response, then confirm residual risk.
5. Use **Presentation controls → New evidence received** to introduce the prepared service reply. In banking work, choose **Compare new evidence**. Inspect the old conclusion and proposed wording. Second line can inspect but cannot start an owner revision. Switch to first line and choose **Start revision with this wording** to create an owner draft. Review controls, response and residual assessment before submitting again. The received-against version remains the comparison baseline after incorporation.
6. Second line edits its challenge, receives the owner reply, then records both reply sufficiency and an **Independent view of the assessment**, with rationale and attestation. Return keeps review open; agreement leaves testing and management disposition open.

The presenter shortcut **New evidence received** starts at a coherent submitted scene with the clarification available. It replaces the tab's draft, like the other scene shortcuts. Source references in the research pack are curated; no live search or ingestion occurs. Public reference links are optional online reading.

Suggested narration budget: dashboard/change story 2 minutes; inherent/controls/dependency 2 minutes; response 1 minute; second-line review and new evidence/revision 3 minutes; reporting 1 minute. Research and outage comparisons are optional extensions; actual timing depends on narration.

## Presenter controls

Footer controls are separate from banking work, inside the collapsed **Presentation controls** disclosure. **Perspective** changes the displayed role. **Jump to** loads a coherent prepared scene: start, discovery, submitted assessment, open challenge, received response or completed review. Scene selection replaces current local draft state. **Reset** asks for confirmation and restores the initial scenario; **Keep working** preserves it. Reload preserves the current tab's session where browser storage is available.

To start a clean presentation, choose **Reset → Reset demo**, then leave **Assessment owner** selected. There is no real email, authentication, acceptance decision, AI service, database or production workflow behind the illustrative interactions.

## Verification

Run `node tools/verify-demo.mjs` for fixture integrity and meaningful workflow/authority checks. Optional browser verification uses an installed Playwright module and Chrome:

```powershell
$env:PLAYWRIGHT_MODULE = 'path/to/node_modules/playwright'
node tools/verify-browser.cjs
```

The browser check defaults to the local preview URL above; `RCSA_PREVIEW_URL` can override it. It records final screenshots under `assets/screenshots/`. Runtime use does not depend on Playwright or Node. See `docs/ux/qa-report.md` for the verified behavior and visual comparison record.

## Control mapping exploration

### AI control assistance

In Controls, choose **Suggest controls**. Compare the existing customer-confirmation control, callback enhancement and proposed independent verification design. Review why a familiar control may not address identity independence. Open **Review proposed design**, edit the control's objective/design/operating details, record an expected coverage judgment and choose **Add proposed control**. The original controls and current confirmed rating remain intact.

In **Coverage & gaps**, inspect the remaining implementation and urgent-route evidence needs. **Add draft to conclusion** fills the owner conclusion for review; **Review evidence coverage** provides linked evidence and limited scope checks. It does not validate arbitrary conclusions; unsupported wording requires source review.

Choose **Generate implementation plan**. Inspect the edited design, separate implementation/validation tasks, owners, dates and required evidence. Edit tasks with native fields and add/remove controls, then **Add plan to response draft**. Review the existing response cards and choose **Create risk response** to record it. Generated plans and decision rationale are inspectable in review, reporting and submitted versions.

For a second example, select **Incorrect payment details** and compare the amendment recheck with a proposed instruction-version release gate. **Delayed execution** offers a different fallback/queue approach. Dismiss a recommendation with a reason to demonstrate judgment rather than automatic acceptance.

Mapping/conclusion/new-evidence changes mark linked plans for review. Generate an updated plan, or explicitly use your own reviewed response without that link; the earlier plan stays archived. A stale active linked plan cannot be submitted as current. Response edits survive reopening the plan. The scenarios and claim checks are prepared local content, with no live model call.

In Controls, use **Add a control** for the existing library or **Create a control**. Review the AI suggestion to create an explicitly proposed independent verification control. Edit the coverage rationale, replace a mapping atomically, or remove the relationship. Definitions remain in the library. Changes require renewed control/residual confirmation and review of any existing response; current confirmed risk remains unchanged. An empty mapping requires an explicit owner conclusion.

**Browse control library** works in draft, submitted and reviewed assessments. For a short mapping example, select **Incorrect payment details**, browse the library and choose **Customer payment confirmation**. Inspect its design and standard-route test scope, map it, explain the coverage and choose an explicit owner coverage conclusion. It supplements the operator check; it does not establish independent identity verification for urgent requests.

When first line opens a submitted or reviewed assessment, choose **Map in owner revision**, then **Start owner revision**. The prior submission, snapshots and reviewer conclusion remain available. The control opens preselected in the mapping editor. Changing the mapping requires renewed control/residual confirmations and response review before another owner attestation and submission. Second line can browse evidence but cannot start an owner revision or map controls.

## Connected risk analysis

In inherent or residual assessment, choose **Explore risk analysis**. Each of the three risks has a distinct prepared analysis. **Overview** connects changes and observations to a suggested interpretation; **Signals** shows related events, near misses, issues and tests; **Sources** exposes dates, scope and exact excerpts. An assessment-side evidence link, such as **Queue service review**, opens its connected analysis rather than repeating a generic modal. **Read original excerpt** still opens the precise source record.

The heatmap uses equal square cells. Likelihood increases left to right and impact increases bottom to top, each numbered 1–5. Inherent analysis discusses exposure before controls; residual analysis discusses protection supported by current evidence. A recovered loss, intercepted event or planned action does not automatically lower a rating.

Control mapping, risk responses and review each show a specific AI review cue linked to the same records. Response drafts include risk-specific test populations and closure evidence. Second line can **Review question draft**, then explicitly **Use this question** and edit it before sending. Exploring analysis preserves human text, ratings, confirmations and workflow state. Using a draft fills an editor; creating a response, sending a challenge and recording conclusions remain separate human actions.

These authored AI moments and extra event/issue records are local synthetic data in `assets/data/risk-intelligence.json`. No ingestion, model call or live event feed is implied.

## Review feedback and report decisions

A returned response shows the reviewer's exact clarification beside the original question. The same text remains in Decision history after later conclusions. The response-topic cues identify mentions, not whether the full question is answered; the reviewer judges sufficiency. Drafting a reply preserves existing closure evidence.

New control relationships start with coverage unassessed. Use the mapping dialog's owner coverage choice to record an explicit conclusion, or return with Edit mapping before confirming controls. Library results remain tied to their documented population and period.

The report explicitly focuses on Unauthorized wire transfer (1 of 3 risks). Its register link opens all risks, and its score links return to that named risk. The management decision brief separates the proposed decision, responsible role/forum and November 19 target from the November 28 testing action. No approval is recorded by viewing or confirming the narrative.

## Premium buyer walkthrough

Start with the two dated changes and test limitation. The visible AI finding links to **Show how we know**. Analysis has one direct menu: Overview, Event timeline, Signals, Sources, Assessment check, Response options and Research, plus New evidence when available. Supporting risks show their own overview, signals and sources. Back names the originating assessment screen.

In Controls, the owner conclusion stays visible; expand **Inspect mapped controls** for individual coverage and edit/replace/remove actions. The mapping dialog opens this section after a change. In Response, using an AI draft returns to the top of the three review cards. Edit only the section needed; drafts and expanded sections survive reload. Submitted records expose inspection rather than editing.

Second line has a role-specific dashboard brief and an evidence/challenge workspace. Introduce the service-owner reply through the presenter shortcut, inspect the highlighted new facts, and preserve the explicit owner revision. Reporting begins with the management decision and proposed protection; expand the assessment/source/history detail when asked.

The demo remains scripted. Presentation controls disclose sample content and prepared research/replies. Product-facing records show meaningful titles, dates and source coverage. Independent buyer review and layout measurements are recorded in the QA report.

## History, outside context and final assessment review

In Changes, expand **Industry context** and inspect **AI · outside the bank** for the dated 2024/2025 FBI BEC comparison. Expand its relevance analysis to see why it applies, evidence in the bank's favour and a prepared question. Open either source and follow the original public-report link if desired; the app itself uses curated local records.

In Inherent or Residual risk, the four-quarter chart distinguishes prior assessments, Q4 drafts and confirmed positions. Review the movement explanation and optionally preview a rationale addition. Explicitly adding it preserves existing text and ratings and requires renewed confirmation.

In first-line Review, inspect the complete three-risk report: inherent/prior/current positions, controls and qualifications, response/action detail, management disposition and narrative. The submission panel shows **Send for review** only for an unsubmitted draft, with owner attestation and outstanding requirements. Submitted/reviewed scenes instead show their version/state, a final-report link and an explicit revision path. **Reports** remains the leadership decision brief.

In Residual, missing responses show **Complete risk response**; changed responses show **Complete response review**; current recorded responses show **View recorded response** with open follow-up stated separately. A reviewed scene does not offer a new submit button. Use the start-of-refresh presenter scene to rehearse an initial submission.

## Plain-language and navigation update

The top Assessments link resumes the next relevant risk/stage from Dashboard or Reports. Inside the assessment it retains the current screen. Mobile uses labelled step, analysis-section and AI-assistance selectors. Unfinished items in Review offer direct **Review** links. Source excerpts opened from a control, plan or reviewer-question draft offer Back; Back, Close and Escape restore that draft and its focus.

Run `node tools/verify-ux-navigation.mjs` for resume, requirement routing, analysis context and selected-control planning checks. See [the UX review and screenshots](../ux/plain-language-navigation-review.md) for changes and verification limits.

## Automatic GRC synchronization

1. Start an assessment. Its existing GRC identifiers are available automatically; the status says it will sync after review.
2. Complete the owner and reviewer workflow. Recording the final review starts sync automatically. The status changes from Syncing to GRC to Synced to GRC with the reviewed version. Open Reports: review completion, open actions and management decisions remain separate.
3. Open sync details or the footer Settings link for connection policy, record identity, history and the implementation checklist. The old `/handoff` route redirects to assessment review.
4. To demonstrate a failure, start a fresh walkthrough in a testing tab. Choose Response received in presenter controls, then Next GRC update → Connection interruption. Record the review. Open the attention status and retry the saved update. No reassessment or repeated transfer approval is required; the request ID is retained.
5. To demonstrate a source conflict, start another fresh walkthrough. Choose Response received and Next GRC update → GRC record changes. Record the review, then open the attention status. The reviewer sees that the assessment owner must resolve it. Switch perspective to Assessment owner, compare the latest GRC record with the reviewed assessment and choose Keep reviewed assessment. Sync resumes automatically. Bank ownership, metadata and existing action status are preserved.
6. Incompatible methods and missing control IDs pause updates without converting ratings. These configuration guards are verified by the automatic-sync script; methodology selection is not part of the assessor workflow.
7. A returned review question never publishes an update. A new owner revision preserves the last synced record until the new version completes review. Existing returned-clarification and task-first assessment behavior is retained.

The connection remains a local simulation, not a live bank connector. Run `node tools/verify-automatic-grc-sync.mjs` and the existing regression scripts. Reset clears this tab's synthetic workspace, including sync history; do not reset a user's working tab for testing.
