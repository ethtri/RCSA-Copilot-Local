# RCSA demo presentation runbook

**Current experience:** November 15 client demo update, implemented locally (`20261116.3`). See [implementation and verification](client-demo-upgrade-2026-11-15.md).  
**Acceptance status:** local implementation and scoped verification are complete; see [the verification ledger](demo-experience-upgrade-verification.md). Historical runbooks and screenshots do not certify this revision.

## Start and preserve the workspace

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open `http://127.0.0.1:8000/src/`. Presentation controls are absent from normal client pages. For rehearsal controls, open `http://127.0.0.1:8000/src/?presenter=1` in the same tab to retain its draft; remove `?presenter=1` for the client presentation. No package installation, API key or backend is required. Use a separate testing tab for rehearsals. Do not reset a working user tab. Stop a task-owned server with Ctrl+C after testing.

The app uses synthetic bank records and prepared AI output. The **Demo workspace** disclosure states the boundaries. **Presentation controls** is separate from banking work and contains role perspectives, prepared scenes, the demo as-of date, sync fault examples and confirmed reset.

## Flagship owner-to-reviewer story

1. On **Dashboard**, open **Refresh wire-transfer RCSA**. **Scope & changes** establishes the process, owner, period and included risks. The AI review brief compares dated event counts with payment volume and explains why each existing risk deserves attention. Open **Why & sources** to inspect the records. No scope or rating changes on viewing.
2. Review the possible missing retry/recovery risk if useful. Add, extend, defer or dismiss it explicitly; otherwise keep the existing risk list. Confirm scope and continue.
3. In **Risk before controls**, inspect **Risk details**, likelihood, impact and their reasons. The AI insights sit below the assessment. **Review suggested assessment** compares the previous cycle, current draft and suggestion using the bank’s rating labels. Apply selected fields or keep your assessment; confirmation remains separate.
4. In **Controls**, compare the improvement options and inspect the owner’s conclusion. Review a proposed design, edit it if needed and explicitly add it. The proposal provides no current protection. Review the shared-source finding separately; it records a relationship judgment without deciding effectiveness.
5. If useful, prepare implementation and validation tasks from the chosen design. The response workspace labels an unconfirmed rating as a draft and provides **Back to control review**. Finish control review before confirming the risk rating.
6. In **Risk after controls**, inspect the source scope and current evidence limits. A recognized proposed improvement keeps the evidence-backed rating advice available without reducing current risk. Review a new test only if demonstrating evidence intake; its limited sample must not imply full urgent-route coverage. Record the required response and confirm the rating.
7. In **Review**, inspect all included risks. Supporting risks start with carried-forward assessments: use their review links to examine the existing judgments and new evidence, then explicitly confirm or open them for changes. The confirmation keeps the displayed scores and text. Resolve remaining requirements, check the owner confirmation and **Send for review**.
8. For rehearsal, use **Presentation controls** with `?presenter=1` to stage the **Independent reviewer**. Remove the query for the client view. The reviewer sees the exact version and all included risks. **View complete submitted assessment** opens that version’s report. Agree or return with a reason; asking a question is optional.
9. If showing a question, use the owner’s reply assistance to distinguish standard testing, urgent-route evidence, the rating conclusion and the completion evidence still needed. Preview before applying. The owner sees a persistent waiting status after replying. The reviewer must explicitly decide whether the reply answers the question; a real newly sent reply has no preselected answer.
10. Open **Reports**. The summary explains the largest confirmed rating change, owner rationale, next action and outstanding management decision. Review/edit and confirm the summary if desired; inspect the complete risk register, work and sources. Assessment review, action closure and risk acceptance remain separate. GRC configuration is optional background; sync and enterprise rollups are outside the main presentation.

The target guided story is about 8–10 minutes, with deeper branches optional. Record the actual rehearsal duration in the verification ledger; do not present this target as a measured result.

## Show AI insights without leaving the assessment

On Risk before controls or Risk after controls, use the two short AI insights below the rating work. Open Why & sources to inspect the explanation and dated records in a drawer. Open a record and use Back to insight; the assessment stays in place. Related research opens public references in the same format. Use Review suggested update only when ready to inspect and approve proposed draft changes. The heatmap and history show recorded values, not AI predictions.

## Show bank fit in one minute

Use a separate rehearsal tab before submitting an assessment. Open **Bank setup** from the footer or assessment context. The owner sees the active policy, threshold, evidence requirement and independent reviewer, with definitions in details.

1. In Presentation controls, choose **Bank administrator**. Choose **Edit bank setup**.
2. Change the response threshold from 9 to 15 and optionally the reviewer name. The active setup stays unchanged while you type.
3. Choose **Review changes**, inspect current versus proposed values, then **Save bank setup**. Only this final action applies the new setup.
4. Return to the owner perspective and assessment. Show the changed threshold in the context and response requirements. A saved policy change reopens affected confirmations; it never changes the numeric rating by itself.
5. Submitted versions retain their setup. Start a new assessment draft before changing the rules for an already submitted assessment.

The demo keeps five likelihood and impact levels. Labels and definitions are editable. Changing their meaning makes prepared numeric suggestions unavailable; source-linked findings remain useful, and the owner enters their own judgment. Independent review stays required. Do not describe this as an arbitrary methodology builder or production access-control system.

## Show risk discovery without inventing history

1. Review the AI suggestion for **Duplicate wire release during recovery**. The records concern retries after uncertain release, not unauthorized instructions or wrong payment details.
2. Choose **Add draft risk**, or demonstrate **Extend existing risk**, **Defer with follow-up**, or **Dismiss suggestion** with a reason. Deferral needs a named owner and valid date. Extending a risk does not create a duplicate record.
3. A new risk has no prior rating, history or confirmed assessment. Review its before-controls proposal; choose likelihood, impact and explanations, then confirm.
4. Review controls. Use a relevant proposed retry gate if desired, or explicitly conclude that no controls are mapped and confirm that state. An ordinary-release test does not prove the retry path works.
5. Assess risk after controls and record a response when required. Confirm and submit the complete assessment, then complete independent review. The report and output include the fourth risk and show **No previous assessment**.
6. If the owner changes the candidate’s material cause, event, harm or process scope, prepared wire-retry ratings/designs are unavailable. The app supports owner entry rather than applying unrelated prepared content.

## Apply control improvements and plans

In Controls, compare an existing control, an enhancement and a new design. Review why a familiar control may not solve the specific cause. Edit the proposed objective, operating method, information source, exceptions and retained evidence. Record expected coverage without calling it implemented protection.

Use **Review evidence and gaps** under **AI findings** to inspect remaining evidence needs. An evidence request creates a linked local work item with provider, scope and target date; it sends no message. A prepared receipt can be recorded later, but receipt alone does not establish effectiveness.

After adding a proposed improvement, open **Review proposed improvement** and choose **Prepare implementation plan**. Review separate implementation and testing tasks, owners, dates and evidence. Add it to the response draft, then record the response separately. Mapping, source or conclusion changes mark linked plans for review. An old plan remains inspectable; stale work cannot silently count as the current reviewed plan.

The supporting payment-details and delayed-execution risks have different prepared controls. The added retry risk also has a relevant proposed gate. An unrelated owner-defined scope must not receive the unauthorized-transfer or cutoff template.

## Review alternatives and replies

- **Direct return:** the reviewer chooses Return for changes with a reason. The owner sees the exact reason and starts a new owner revision. Earlier submitted content and its review remain available. Changed assessments require fresh confirmation and submission.
- **Question:** expand Ask the owner a question, edit the prepared question if relevant and send it. Switch to the owner and draft a reply. Ordinary ownership/due-date/scope/source/evidence wording uses the linked records. Multiple possible risks require a risk selection; unknown facts remain unknown.
- **Draft handling:** preview before replace or append; Undo restores the previous reply. Merely opening the suggestion leaves owner text intact. Mention cues do not judge whether a reply is sufficient.
- **Conversation versus assessment:** an unchanged reply appends a conversation event about the same assessment version. If the assessment itself needs changing, use an owner revision and renewed submission.
- **Return a reply:** the reviewer can ask for more information and record why. This retains the original question, earlier reply and clarification in history.

## Response strategies

Choose each approach intentionally. Strengthen controls creates change/testing work. Acceptance includes the reason, conditions, monitoring, decision owner and review/expiry date. Change or stop activity covers the customer/process transition. Transfer covers the arrangement, counterparty evidence and retained exposure.

Using a draft preserves owner text unless explicit replacement is chosen. Switching approach shows what will be retained in history and replaced as active work. A request for acceptance is never an approval. The review/expiry date is distinct from the date management is asked to decide and from an action’s due date.

## Action execution and assurance closure

Open the actual action from Dashboard or Work records. The record shows accountable owner, person doing the work, due date, progress, tasks, evidence required, evidence received and history.

1. In **Assessment owner**, start work and save a progress update.
2. Select a prepared synthetic implementation/test record and submit it for closure review. There is no real upload or automated evidence validation.
3. Switch to **Control assurance**. Record a reason and either return the evidence or close the action. The executor and assessment reviewer cannot close it themselves.
4. If returned, switch back to the owner, provide the missing prepared evidence and resubmit; assurance then makes the next closure decision.
5. Inspect the resulting status/version in Dashboard and Reports. Closure does not rewrite the submitted assessment or reduce its rating.

The flagship ending can retain an open testing action. Use closure as a separate optional branch.

## Management decisions and expiry

Open the management request from Dashboard or Work records. The owner can edit the decision owner, forum, target date, reason, conditions and expiry/review date, then submit it locally. A request to continue activity is distinct from temporary acceptance.

Switch to **Management decision owner** to approve with conditions, return for changes or decline. Each event records the named actor and a reason. The assessment owner cannot approve their own request. A returned request can be revised and submitted again.

To demonstrate expiry, use **Demo as-of date** in Presentation controls and move beyond the approved review/expiry date. The request shows Expired. This changes no rating, does not close testing and does not rewrite an earlier confirmed report edition. Restore the intended demo date before the next rehearsal.

## Report editions and real output

Use **Current assessment** or a numbered submitted version. The risk register, ratings, review conclusion and source excerpts come from that projection. Operational records identify their included versions and as-of date separately.

Edit, restore or confirm the summary. Changing actual summary text or included record versions requires new confirmation. Confirmed editions preserve their content and remain inspectable/downloadable after later changes.

**Download HTML report** creates a real standalone artifact with embedded source excerpts and print styles. Open it offline to inspect the selected version. **Print** opens the generated report with its details available. If the print window is blocked, use the downloaded HTML and the browser’s Print command. No native PDF export is claimed.

## GRC readiness and recovery

Readiness issues appear before submission and in **Settings → Integrations**. They name each missing risk/control identifier, the Bank administrator and the required next step. The assessment can still be submitted and reviewed; sync pauses until configuration is ready.

- **Mappings:** switch to **Bank administrator**, open the named record and assign a unique bank identifier. Saving configuration preserves the assessment and resumes the eligible reviewed update once all checks pass.
- **Transport:** before completing review, set Next GRC update to Connection interruption. The update fails without changing the reference record. Retry retains its request ID and avoids duplicates.
- **Source conflict:** set Next GRC update to GRC record changes. Compare both versions in Settings. Only the assessment owner can keep the reviewed assessment against the current source-version token. A second source change requires another comparison.
- **Methods:** the prepared mismatch scenario needs an agreed five-point configuration. No automatic score conversion is offered. An unknown method/version still needs an explicit mapping contract.
- **Later work:** action/decision events use separate operational update IDs and versions. They do not modify the original reviewed payload or the bank-owned action status.

All updates are simulated locally. The configured worker runs while the page is open; no external GRC system is contacted.

## Presenter scenes and persistence

Scene shortcuts replace the current tab’s local draft with a coherent prepared state. They are presentation tools, not normal banking transitions. Reset asks for confirmation. Reload restores a supported saved tab session. An unsupported saved session offers its preserved data for download; storage failure warns that reload will lose changes.

The New evidence received shortcut starts from a submitted state and explicitly receives SO-19. Compare it with the received-against version. Source receipt alone leaves submitted ratings/text unchanged; the owner must start a revision to incorporate new wording.

## Verification

Focused model/transition checks include:

```powershell
node tools/verify-experience-model.mjs
node tools/verify-operations.mjs
node tools/verify-report-refinement.mjs
node tools/verify-automatic-grc-sync.mjs
node tools/verify-buyer-readiness.mjs
```

Run the remaining applicable control-assistance, mapping, owner-revision, risk-intelligence, copy and navigation checks during integrated regression. Inspect old browser-script assumptions before reuse; some historical scripts encode the former labels or mandatory challenge flow.

Browser acceptance must cover actual source drawers and editors, persistent errors/focus, supported reload/recovery, all review paths, action return/closure, decision return/decline/expiry, added-risk mapping, real downloads, responsive widths, zoom, keyboard/touch, normal/reduced motion and visual-reference comparison. Save fresh evidence under `output/experience-upgrade-2026-11-15/` and record results against the final revision in the verification ledger.


November 15 follow-up: the first step is now **Scope & changes**, which confirms process coverage and missing risks before scoring. **Risk details** and **Inspect [control]** disclose fuller records. AI insights sit below assessment fields, share a standard icon, and use specific source-backed observations for all three risks. See [implementation and verification](../ux/assessment-information-2026-11-15.md).


AI analysis follow-up: three-month sample event/volume trends now drive explicit recommendations and editable assessment proposals. In Controls, expand **Bank context** to compare options against workflow and staffing. In Risk after controls, use **Review new test results** to demonstrate refreshed analysis with user-approved evidence and selected-field changes. All 31 verification scripts pass. See [implementation and verification](../ux/ai-analysis-upgrade-2026-11-15.md).


Scope follow-up: **Scope & changes** now includes editable assessment coverage, source-backed AI review priorities and a working included/excluded risk list. Adding a suggested risk stays on Scope until the user confirms the updated inventory. Coverage changes preserve scores but require fresh confirmations; submitted scope is preserved. All 32 verification scripts pass. See [implementation and verification](../ux/scope-workspace-2026-11-15.md).

## Streamlined Controls page

The default page has three main sections: mapped controls, AI findings and your assessment. Use **Add a control** beside the mapped list; each control’s **Manage** menu contains **Edit risk link**, **Replace** and **Remove**. Removal still requires confirmation and retains the shared control definition. Pending risk coverage is identified beside the relevant control.

One AI finding and recommended improvement are visible. **Compare alternatives** contains other designs and bank context. **Review evidence and gaps** contains the detailed findings, source links, evidence requests, suggested conclusion and relationship map. Implementation prerequisites and testing requirements are in the recommendation review. A chosen design can prepare a plan; any existing draft/linked plan remains inspectable in its collapsed section. No AI action confirms controls or gives planned work current protection.
