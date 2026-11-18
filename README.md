# RCSA workflow demo

An interactive banking risk and control assessment demo. AI prepares changes, suggests risks, explains ratings, improves control designs and drafts follow-up work. People inspect sources, edit the result and make every assessment, review, closure and management decision.

The [inline insight update](docs/ux/inline-insights-implementation-2026-11-15.md) keeps concise AI findings, sources and research beside the assessment, using drawers instead of a separate narrative analysis page.

The [client demo update](docs/operations/client-demo-upgrade-2026-11-15.md) adds evidence-first AI previews, explicit approval boundaries and working bank setup. A fresh draft starts from the last confirmed rating; opening a suggestion changes no assessment records.

The app uses local synthetic records and prepared AI output. It needs no model credentials, database, build step or paid infrastructure.

## Run locally

From the repository root:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Open **http://127.0.0.1:8000/src/**. Python 3 is the runtime prerequisite. Stop the server with Ctrl+C. The root URL opens the product home page. For a direct dashboard link, use **http://127.0.0.1:8000/src/#/work**.

## Current experience

- An AI-prepared quarterly refresh with editable, field-level rating and rationale proposals. The last confirmed result stays separate from the owner’s draft.
- Risk discovery with Add, Extend, Defer and Dismiss. The prepared retry/recovery risk can complete assessment, review, reporting and GRC mapping without an invented prior rating.
- Visible control recommendations, editable enhancements and new designs, risk-specific mapping judgments, evidence gaps and implementation/testing plans.
- Four distinct response approaches: strengthen controls, request risk acceptance, change or stop activity, or transfer part of the risk. Applying a draft preserves owner work unless replacement is explicit.
- Independent review with direct agreement, direct return or an optional question. Reply assistance reads the linked record and handles ordinary wording, multiple topics, ambiguous risks and missing information.
- Real local action records with progress, received evidence and separate assurance closure. Management requests have owner submission, management decisions, conditions and expiry.
- An editable all-risk report, immutable confirmed editions, a real self-contained HTML download and a printable output with frozen source excerpts.
- Secondary GRC connection settings describe configurable delivery. Optional presenter scenarios retain simulated mapping and delivery diagnostics.
- Plain task language, inspectable evidence, source drawers, larger editors, persistent validation, saved-state feedback and reduced-motion support.

Enter the demo from the home page. On **Dashboard**, choose **Start assessment refresh**. Follow the [current runbook](docs/operations/demo-runbook.md). Rehearsal-only **Presentation controls**, enabled with `?presenter=1`, contains role perspectives, prepared scenes, an explicit demo as-of date, sync fault examples and confirmed reset.

Current ratings, proposed protection, completed work, completed assessment review and accepted risk remain separate. None automatically lowers the risk rating. There are no real approvals, messages, uploads, live research, live AI calls or external GRC requests.

## Implementation and verification

The app uses native HTML, CSS and ES modules served from `src/index.html`. State uses this tab’s optional sessionStorage. Schema 3 migrates supported older sessions while retaining their drafts and historical submissions. Unknown sessions offer a preserved-data download; storage failure is visible.

Primary modules are in `src/scripts/demo/`. Fixtures are in `assets/data/`. The active design update is in `src/styles/upgrade.css`, documented in [the design contract](docs/ux/DEMO_EXPERIENCE_DESIGN.md). Data boundaries are in the [workflow contract](docs/data-contracts/workflow-demo.md) and [GRC adapter contract](docs/data-contracts/grc-reference-exchange.md).

Run the focused checks with Node 18+:

```powershell
node tools/verify-experience-model.mjs
node tools/verify-operations.mjs
node tools/verify-report-refinement.mjs
node tools/verify-automatic-grc-sync.mjs
```

Existing control-assistance, owner-revision, mapping, risk-intelligence, copy and navigation checks remain part of regression coverage. Browser verification must inspect the actual rendered app; model checks alone do not establish layout, focus or accessibility quality.

The November 15 features are implemented locally. **Local integration and verification are complete.** See the [DX-01–19 verification ledger](docs/operations/demo-experience-upgrade-verification.md) for evidence and explicit platform-check limits. The [implementation plan](docs/operations/demo-experience-upgrade-plan.md) and [local backlog](docs/operations/implementation-backlog.md) describe scope. Historical QA documents certify their own revisions; no remote GitHub issue closure or published release is implied by these local changes.

The [standard product visual implementation](docs/ux/standard-visuals-implementation-2026-11-15.md) records the subsequent heatmap, icon/status, report, comparison/history, relationship-map, progress and screen-state improvements, with 20 passing verification scripts and browser evidence.


November 15 follow-up: the first step is now **Scope & changes**, which confirms process coverage and missing risks before scoring. **Risk details** and **Inspect [control]** disclose fuller records. AI insights sit below assessment fields, share a standard icon, and use specific source-backed observations for all three risks. See [implementation and verification](docs/ux/assessment-information-2026-11-15.md).


AI analysis follow-up: three-month sample event/volume trends now drive explicit recommendations and editable assessment proposals. In Controls, expand **Bank context** to compare options against workflow and staffing. In Risk after controls, use **Review new test results** to demonstrate refreshed analysis with user-approved evidence and selected-field changes. All 31 verification scripts pass. See [implementation and verification](docs/ux/ai-analysis-upgrade-2026-11-15.md).


Scope follow-up: **Scope & changes** now includes editable assessment coverage, source-backed AI review priorities and a working included/excluded risk list. Adding a suggested risk stays on Scope until the user confirms the updated inventory. Coverage changes preserve scores but require fresh confirmations; submitted scope is preserved. All 32 verification scripts pass. See [implementation and verification](docs/ux/scope-workspace-2026-11-15.md).

## Latest banking-leader review

The November 15 follow-up (`20261115.20`) was reviewed through the owner/reviewer journey, with supporting-risk, new-risk, configuration, report and phone branches. Fixes strengthen source-backed AI, require explicit review of carried-forward assessments, clarify full-version reviewer decisions, improve summaries and hide rehearsal role switches from normal pages. See the [walkthrough and final verification](docs/ux/bank-leader-followup-2026-11-15.md). All 35 verification scripts pass. The user's existing draft is preserved.
