# RCSA demo presentation runbook

Start the preview from the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/src/`. Python is the only runtime prerequisite; no package install or API keys are needed. The root URL and earlier Home/Dashboard/Wizard entry points redirect to the current workspace.

## Main walkthrough

1. In the first-line **Dashboard**, choose **Refresh wire-transfer RCSA** beside the heading. Inspect the revised procedure and near miss. Explain why the September test predates the new urgent route. Confirm scope. Returning to Dashboard exposes **Continue wire-transfer refresh**, which resumes the next unconfirmed stage.
2. Review **Inherent risk**. Inspect the likelihood and impact rationales and rating definitions. Confirm the main High 16 assessment. Supporting risks can be selected and inspected independently.
3. Review **Controls**. Inspect design and operating evidence, then confirm the control assessment. Open the shared-source discovery.
4. Read both procedure excerpts. Explain that matching source language suggests a relationship requiring human validation. Confirm, qualify or dismiss it. The decision records the relationship only; ratings remain unchanged.
5. In **Residual risk & response**, inspect likelihood 3 and impact 4, Elevated 12. Choose **Create risk response**, review the AI draft, use/edit it and explicitly create the response. Inspect the approach, rationale, owner, linked action, date and closure evidence. Return and confirm the residual assessment. Planned mitigation does not reduce current risk. An acceptance request remains a separate pending decision.
6. In **Review**, inspect the handoff, check the owner attestation and send for review. Switch to the second-line reviewer using the contextual link or footer perspective control.
7. Inspect the conclusion and sources. Edit the suggested question if desired, then send the challenge. Switch to the owner.
8. Compare the brief response with **Draft a response**. The assistance identifies missing coverage but does not determine sufficiency. Confirm the revised response and renewed attestation.
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

To start a clean presentation, choose **Reset → Reset demo**, then leave **First line** selected. There is no real email, authentication, acceptance decision, AI service, database or production workflow behind the illustrative interactions.

## Verification

Run `node tools/verify-demo.mjs` for fixture integrity and meaningful workflow/authority checks. Optional browser verification uses an installed Playwright module and Chrome:

```powershell
$env:PLAYWRIGHT_MODULE = 'path/to/node_modules/playwright'
node tools/verify-browser.cjs
```

The browser check defaults to the local preview URL above; `RCSA_PREVIEW_URL` can override it. It records final screenshots under `assets/screenshots/`. Runtime use does not depend on Playwright or Node. See `docs/ux/qa-report.md` for the verified behavior and visual comparison record.

## Control mapping exploration

In Controls, use **Map a control** for the existing library or **Create a control**. Review the AI suggestion to create an explicitly proposed independent verification control. Edit the coverage rationale, replace a mapping atomically, or remove the relationship. Definitions remain in the library. Changes require renewed control/residual confirmation and review of any existing response; current confirmed risk remains unchanged. An empty mapping requires an explicit owner conclusion.

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

Lead with the concrete AI finding in the first screenful of What changed. **Show how we know** opens the single Analysis workspace: Briefing (overview/research), Evidence (event/signals/sources), and Review & response (claims/options/received updates). Risk selection and the original assessment context stay available. Control/response review is explicitly cross-assessment rather than labelled as inherent-risk analysis.

In Controls, the owner conclusion stays visible; expand **Inspect mapped controls** for individual coverage and edit/replace/remove actions. The mapping dialog opens this section after a change. In Response, using an AI draft returns to the top of the three review cards. Edit only the section needed; drafts and expanded sections survive reload. Submitted records expose inspection rather than editing.

Second line has a role-specific dashboard brief and an evidence/challenge workspace. Introduce the service-owner reply through the presenter shortcut, inspect the highlighted new facts, and preserve the explicit owner revision. Reporting begins with the management decision and proposed protection; expand the assessment/source/history detail when asked.

The demo remains scripted. Presentation controls disclose sample content and prepared research/replies. Product-facing records show meaningful titles, dates and source coverage. Independent buyer review and layout measurements are recorded in the QA report.
