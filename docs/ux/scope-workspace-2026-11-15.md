# Scope workspace

Implemented November 15, 2026. App graph `20261115.18`.

## Working page

Scope now has three parts: an editable coverage record, an AI review brief, and a working risk inventory. The duplicated narrative panels and premature control-testing summary were removed from this step.

The record includes process, assigned owner, assessment period, payment channels, systems/information, included activities and exclusions. Secondary coverage fields are behind **Coverage details**. **Edit scope** opens an explicit Save/Cancel form; typing, Cancel and Escape do not change the assessment. Uncommitted scope modal fields are not persisted as saved assessment content.

The AI brief derives review priorities from the existing monthly registers for active included risks only. It shows event counts, comparable periods, payment volume and a short reason to revisit each risk. **Why & sources** opens the existing evidence drawer with the calculation table. The October 5 process change is shown only when its source records are available. This page does not propose or apply scores.

The risk inventory supports **Review risk**, explicit exclusion with a reason, and restoration. Exclusion preserves the record, action/decision history and earlier submitted versions. At least one risk must remain. Restoring a risk retains its scores and wording and requires fresh confirmations. Included/excluded counts and AI brief rows respond to the current inventory.

The duplicate-release suggestion explains how recovery records differ from the existing risks. It uses the existing editable risk proposal and add/extend/defer/dismiss workflow. Adding from Scope keeps the user on this page to confirm the updated list; confirmation then opens the assessment with the new risk still unrated.

## Approval and preservation

Saving coverage changes clears scope confirmation and the affected risk/control confirmations while retaining scores and owner text. Owner-only reassignment does not rewrite judgments, change the signed-in actor or grant permissions. Add, extend, exclude, restore and removal decisions clear scope confirmation. Unsaved scope edits block submission readiness.

Prepared trend, rating, control and missing-risk advice is not reused when process, channels, systems, boundaries or period change beyond the sample evidence. The page asks the user to check evidence coverage. Returning to the original coverage does not automatically reconfirm earlier judgments.

Scope is part of content signatures, report signatures, submitted snapshots and projections. Reports and page context use the preserved process, period and assigned owner. Old submissions without preserved scope show an explicit unavailable state and are not reconstructed from live settings. The default record preserves older content-key compatibility; explicit changes enter the signature. Submitted source views use preserved records and versioned links.

## Verification

All 32 `tools/verify-*.mjs` scripts and syntax checks across demo modules pass. An independent RCSA reviewer checked approval, scope-sensitive assistance, inventory changes, signed-in actor versus assigned owner, frozen/legacy contexts and missing sources. The new scope verifier covers those boundaries. The existing added-risk lifecycle test now explicitly reconfirms scope before submission.

Browser checks used an isolated temporary tab and covered:

- Desktop at 1183 x 917, visible scope record, AI priorities and inventory.
- Scope edit cancellation with Escape, then explicit change from Q4 2026 to Q1 2027. Header/footer updated and old-scope AI suggestions were withheld. Coverage was then restored through the editor.
- Excluding a risk with a reason, seeing two included/one excluded and two AI priority rows, then restoring it to three.
- Opening the source-backed trend drawer from Scope.
- Adding the suggested duplicate-release risk by explicit choice, remaining on Scope with four included risks, then confirming scope and opening the new unrated assessment.
- Phone at 390 x 844. Document/client widths both 375px; editor width 354.7px; no horizontal overflow. Native captures verified the record, AI brief and editor.

The temporary tab was closed and viewport reset. The original user tab was refreshed with its existing confirmation, three-risk inventory and draft preserved. Its restored default document/client widths were both 522px.

## Visual fidelity ledger

Compared the established assessment reference and current browser captures using view_image. These are intentional content/layout changes approved by the user, within the existing design system.

| Area | Result |
| --- | --- |
| Typography | Existing serif page title; system UI section headings, labels and forms |
| Palette | White records, forest actions and pale-green AI surface retained |
| Structure | Coverage record, AI priorities and inventory have distinct jobs |
| Density | Systems/boundaries, evidence, exclusion history and suggestion reasoning remain in details/drawers |
| Icons | Shared AI sparkle and information/source icons retained |
| Controls | Labeled native inputs, Save/Cancel, 44px actions and explicit confirmation |
| Responsive | Single-column phone record, brief, inventory and editor; measured no overflow |

Evidence: [desktop](../../output/scope-workspace-2026-11-15/scope.png), [phone record](../../output/scope-workspace-2026-11-15/mobile.png), [phone brief](../../output/scope-workspace-2026-11-15/brief-mobile.png), [phone editor](../../output/scope-workspace-2026-11-15/editor-mobile.png), [checks](../../output/scope-workspace-2026-11-15/checks.txt).

The demo continues to use fictional bank records and prepared AI suggestions. No live model, external research or sync was introduced.
