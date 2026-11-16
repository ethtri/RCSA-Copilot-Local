# Client demo improvements and verification

Implemented locally on November 15, 2026. Serving revision: `20261115.13`. Source, fixtures and tools fingerprint: `6a1821ba9ac4a4264708610dcaa9aeceeaf027a831cfccf8a34c70bdad8d836d`. [Exact revision manifest](../../output/client-demo-upgrade-2026-11-15/revision.json). This implements the owner's selected priorities following the banking-leader roleplay: useful AI insights, explicit approval, a working bank setup, a simple presentation path, and plain English. Sync demonstrations and enterprise rollups are outside this change.

## Delivered changes

| Before | After |
| --- | --- |
| The opening draft already matched the AI's 12, although the last confirmed rating was 8. | A fresh assessment carries forward 8. The optional suggestion is 12. Applying explanations alone preserves both scores; applying scores changes only the draft. Confirmation remains separate. Existing saved drafts are preserved. |
| The proposal opened with editing controls before its explanation. | The finding, its significance, sources and suggested next step come first. Prior confirmed, current draft and suggested ratings stay distinct. Field selection, editing and limitations are available in details. |
| Viewing a possible new risk added its unused evidence to the assessment. | Viewing is read-only for assessment records. Suggestion sources are transient and labeled as not linked. Adding or extending the risk explicitly retains its sources. |
| Rendering a confirmed high risk could prepare a management request. | The owner explicitly records a response before a draft management request can be prepared. The screen explains that consequence. A draft request grants no approval. |
| The evidence headline asserted urgent payments had not been tested; its evidence button opened a procedure. | The headline says the available test does not cover urgent payments. The button opens WT-25 directly. |
| Bank policy fit was primarily a narrative claim. | Bank setup edits a policy name/reference, response threshold, five rating labels and definitions, linked-evidence requirement and named independent reviewer. Edit, Review changes and Save are distinct actions. |
| Threshold 9 and the reviewer name were repeated in behavior and summaries. | Policy helpers drive response requirements, score definitions, review identity, owner review, dashboard follow-up and report summaries. Submitted versions preserve the applicable setup. |
| Prepared ratings could appear applicable after rating definitions changed. | Changed definitions disable prepared numeric suggestions. Source-linked findings remain readable, and the owner enters a judgment under the changed definitions. |
| Review and summary confirmation shared ambiguous status language. | Reports separately identify Assessment reviewed and Summary needs confirmation / Summary confirmed. Viewers who cannot confirm are told which role can. |
| Normal GRC status occupied the main assessment/report chrome. | Connection configuration is secondary. The main presentation stays on evidence, decisions and work. Existing simulated integration behavior remains available in Connections. |
| Copy exposed terms such as attestation, raw defer/extend values, and malformed partial replacements in synthetic records. | Plain confirmations, readable outcomes and corrected authored source text. Facts, IDs, dates, numbers, research citations and scope remain unchanged. |
| The phone preview stacked three ratings behind the action footer. | The three values stay together above the approval controls. Longer evidence and editing remain in the modal's scroll region. |

The setup retains a five-level likelihood × impact method and the established Low / Moderate / Elevated / High bands. It is a working configuration example, not a claim that arbitrary methodologies, production permissions or connectors are implemented. Independent review remains required. The bank administrator can change the named reviewer, who must differ from the assessment owner.

## Approval and history rules

- Opening an AI insight, research view, rating suggestion, risk candidate, control design, implementation plan, response draft or reply draft does not change assessment or work records.
- Apply selected changes affects only selected draft fields. Applying does not confirm the rating.
- A suggested control remains Proposed. A plan, management approval or action closure does not automatically lower current risk.
- Filling a response draft preserves existing text. Replacing it requires a separate explicit choice. Recording the response is another action and identifies the work/request it creates.
- Editing or reviewing a bank setup leaves active rules unchanged. Saving requires the administrator perspective and an unsubmitted assessment. Changing relevant rules reopens the affected confirmations without changing scores or last-confirmed values.
- Submitted assessments preserve sources, control definitions and rating/setup context. Later setup changes cannot rewrite historical reports. The content signature includes versioned policy context while supporting earlier saved-session signatures.
- Corrected fixture wording applies to newly loaded records. Earlier submitted versions retain their original excerpts. The final report artifact was regenerated from fresh records after the source-language corrections.

## Verification

All **23 `tools/verify-*.mjs` checks pass**, and all **34 source ES modules parse**. [Exact check output](../../output/client-demo-upgrade-2026-11-15/checks.txt). New focused checks are:

- `verify-ai-consent.mjs`: view versus apply boundaries, selected fields, role guards, proposed controls, no invented prior rating, retained user wording, and explicit creation of a draft management request.
- `verify-bank-policy.mjs`: validation, permission checks, review-before-save, stale edits, reviewer independence and frozen prior versions.
- `verify-bank-setup-integration.mjs`: threshold effects across forms and reports, configured reviewer on the recorded review, historical policy preservation, changed definitions and evidence requirements.

An independent agent ran the suite and syntax checks; the implementation lead reran all 23 checks after the final fixture and copy corrections. Copy assertions were updated for intentional labels; behavioral assertions were retained. Tests for the fresh carried-forward score now expect 8, while the above-threshold response test explicitly sets a draft of 12.

### Browser verification

Used the in-app Browser through CUA, with isolated synthetic rehearsal tabs. No Playwright CLI fallback, model service, external GRC or paid test service was used.

1. Opened the test from Changes and verified its population/date.
2. Opened the proposal: confirmed 8, draft 8, suggested 12. Approved explanations only; the form retained 8. Separately approved the score; only the draft became 12.
3. Confirmed scope, before-controls judgment and control conclusion. Recorded a qualified shared-source judgment without changing ratings.
4. Reviewed and used a response draft, then separately recorded the response and its draft management request. Confirmed risk, submitted, switched to the independent reviewer and recorded a reasoned agreement.
5. Inspected the report, confirmed its summary and downloaded the actual standalone HTML.
6. In a separate tab, changed threshold 9 to 15 and reviewer Jordan Lee to Avery Shah. Active facts remained unchanged until Save; the saved setup survived reload and appeared in the assessment context.
7. Inspected laptop layouts and the reference-size 1488 × 1058 view. Phone checks at 390 × 844 covered Changes, the proposal and Bank setup. Bank setup also had no document overflow at 640, 768 and 1024; [measurements](../../output/client-demo-upgrade-2026-11-15/responsive.json) record client width equaling scroll width. The phone proposal showed all three ratings before its approval controls.
8. Regenerated the final report from a fresh, coherent completed-review presentation scene after fixture corrections, and inspected its saved HTML for the corrected wording and preserved versions. [Actual report](../../output/client-demo-upgrade-2026-11-15/downloaded-report.html).

The full manual owner-to-reviewer journey and the final report-scene regeneration are separate checks; this is not a measured nine-minute rehearsal. The completed live report's phone layout was not separately established in this run. No full accessibility or production-security certification is asserted.

Test tabs were closed, the viewport override was reset, and a fresh assessment was left as the deliverable. Existing user tabs and drafts were preserved. The pre-existing local preview remains running.

## Visual verification and intentional differences

The existing [assessment reference](../ux/concepts/2026-11-15/assessment-reference.png), [controls reference](../ux/concepts/2026-11-15/controls-reference.png) and [design system](../ux/DEMO_EXPERIENCE_DESIGN.md) govern the visual family. This was a functional extension within that system; no new illustration or concept image was required. The references and final saved browser captures were inspected using `view_image` in the same final QA pass.

| Comparison point | Verified result and intentional changes |
| --- | --- |
| Palette and surfaces | Existing cool canvas, white work surfaces, forest controls and pale-green AI surface retained. |
| Typography | Serif page/finding headings and system UI text retained. A shorter modal title makes the evidence and comparison easier to read on a laptop. |
| Navigation and hierarchy | Existing Dashboard / Assessments / Reports and five assessment stages retained. Bank setup is secondary navigation; connection status is removed from the main story by owner direction. |
| Source treatment and icons | Existing source-button icons and evidence drawer retained. A risk-candidate source is explicitly distinguished from linked assessment evidence. No bespoke AI graphics added. |
| Forms, spacing and actions | Existing labeled fields, full-size buttons and structured white panels reused. Proposal details follow the finding; the approval boundary remains beside the action. |
| Responsive comparison | Three compact columns keep all ratings visible on phones. Other long content scrolls naturally. Bank setup facts become a single readable column. |
| Copy differences | Evidence wording, approval text, summary statuses, administrator label and policy context intentionally differ from the old illustrative concept. No new claims of live AI, a live connector or enterprise rollups. |

The rendered implementation was verified against the existing references in the scoped surfaces. No remaining material mismatch was found in those checks. The before/after/suggested facts and current evidence take precedence over inaccurate illustrative copy in a concept image.

Final captures: [Changes](../../output/client-demo-upgrade-2026-11-15/01-changes.png), [AI insight](../../output/client-demo-upgrade-2026-11-15/03-ai-insight.png), [rating retained after explanation-only approval](../../output/client-demo-upgrade-2026-11-15/04-selected-explanations.png), [Bank setup](../../output/client-demo-upgrade-2026-11-15/10-bank-setup.png), [phone insight](../../output/client-demo-upgrade-2026-11-15/14-ai-insight-mobile.png), [report](../../output/client-demo-upgrade-2026-11-15/08-reviewed-report.png).

The demo continues to use synthetic records and prepared AI output. It does not provide live arbitrary-document analysis, SSO, server persistence or production bank connections. The implemented setup demonstrates specific editable rules; it does not replace a bank's full policy-administration program.


## Annotation follow up

Serving revision `20261115.14` implements the two client comments. Normal pages no longer render Presentation controls, even if the saved session has that panel open. Rehearsal tools require an explicit `?presenter=1` URL; the normal page offers no presenter link. This is an opt-in presentation mode, not an authentication boundary.

Both before-controls and after-controls assessments show the heatmap outside the collapsed rating details. Definitions and sources remain collapsible. The existing matrix renderer, live field update target, palette and accessible description remain unchanged.

All 23 checks passed after the changes. Browser inspection at 1183 × 917 verified no presenter section in normal mode and a visible heatmap with no collapsed-details ancestor. The presenter link retained the tools. The user's existing draft survived reload. Temporary test tab closed and viewport reset.
