# RCSA Demo Local Decision Register (v2025-10-31)

| ID | Date | Decision | Context | Owner | Follow-Up |
| --- | --- | --- | --- | --- | --- |
| D-2025-10-31-01 | 2025-10-31 | Use static/offline rebuild as single delivery track; deprecate prior Power Pages environment references. | Aligns with stakeholder directive to avoid live services and simplifies governance. | RCSA Demo PM | Update all operational docs and prompts; archive legacy environment notes. |
| D-2025-10-31-02 | 2025-10-31 | Maintain governance artifacts in `docs/operations/` (`delivery-plan.md`, `risk-log.md`, `decision-register.md`). | Provides single source of truth for planning and status. | RCSA Demo PM | Review and refresh each milestone. |
| D-2025-10-31-03 | 2025-10-31 | Require design-system styles (`design-system/rcsa-styles.css`, tokens) on every page implementation. | Ensures UX consistency vs. legacy demo. | RCSA Demo PM & Frontend Lead (TBD) | Bake into Definition of Done and automated checks. |
| D-2025-10-31-04 | 2025-10-31 | Adopt `src/`-based static architecture with shared partials and python preview scripts. | Enables modular pages and offline previews without introducing a build tool. | Tech Lead (TBD) | Implement scaffold per WS-02 and revisit templating needs at M2 checkpoint. |
| D-2025-11-01-01 | 2025-11-01 | Adopt experience pillars in `docs/ux/cx-director-audit.md` as baseline for static UX (visual, motion, tone). | Replaces portal-native interaction cues with static-ready guidance while preserving award-winning feel. | RCSA Demo PM & CX/UX Director | Brief WS-02/03 owners; update Definition of Done and QA checklist with pillar checkpoints. |
| D-2025-11-02-01 | 2025-11-02 | Establish Tuesday + milestone documentation cadence and elevate refreshed README/DoD as canonical onboarding source. | Reduces risk R-05 by ensuring run instructions and acceptance criteria stay aligned with static preview workflow. | Agent 04 (Governance) | Review cadence effectiveness at M2; adjust if preview tooling changes. |

## Decisions finalized November 14 2026

| ID | Date | Decision | Context | Owner | Follow-Up |
| --- | --- | --- | --- | --- | --- |
| D-2026-11-14-01 | 2026-11-14 | Use a quarterly wire-transfer refresh for banking leaders, with scripted synthetic data and the existing static architecture. | Owner requested a polished demonstration with minimal functionality. | Ethan, scope owner | Implement the [current workflow plan](workflow-demo-plan.md); no live service setup. |
| D-2026-11-14-02 | 2026-11-14 | Include complete inherent, control, and residual assessment for all sample risks, with explicit human confirmation. | Preserve the full RCSA discipline while simplifying presentation. | Ethan, scope owner | Expose likelihood, impact, rationale, evidence, methodology, and prior/current comparison. |
| D-2026-11-14-03 | 2026-11-14 | Make the shared contact-record dependency a main-story AI discovery alongside evidence applicability and focused challenge/response. | Owner selected the discovery for the main walkthrough. | Ethan, scope owner | AI identifies a possible dependency; humans validate and own its effect on assessment. |
| D-2026-11-14-04 | 2026-11-14 | Keep current residual risk, planned mitigation, review completion, and risk acceptance distinct. | A realistic demo must preserve qualifications and human authority through reporting. | Codex, applying agreed scope | Verify the final report keeps elevated current risk and open testing visible. |

Log new decisions with incremental IDs (`D-YYYY-MM-DD-##`), and reference related risks, tasks, or documentation updates.

## Implementation decisions, November 14 2026

Product refinement D-2026-11-14-07: owner feedback expands the operational dashboard, makes AI assistance explicit, adds editable control mappings and intentionally created risk responses, and moves presentation/sample context out of the work area. One process/assessment contains three risk records. Proposed controls receive no operating credit; mapping changes retain the last confirmed rating; acceptance requests remain pending. [Design specification](../ux/FEEDBACK_REFRESH.md), [verification](../ux/qa-report.md).

| ID | Decision | Context and evidence |
| --- | --- | --- |
| D-2026-11-14-05 | Implement evidence-first direction C through a new shared `src/styles/demo.css` system and modular native ES modules. | The owner authorized the full build after concept exploration and our C recommendation. This is an implementation choice, not a claim of explicit C selection. New full-screen references extend the concept. This supersedes the 2025 mandatory legacy CSS import. [Design record](../ux/IMPLEMENTATION_DESIGN.md). |
| D-2026-11-14-06 | Keep immutable owner submission/revision snapshots, exact challenge/response history and report confirmations tied to current content. | Expert review identified credibility gaps when drafts changed. Workflow guards and browser tests cover human attestations, supporting assessments, response actions and review transitions. [QA record](../ux/qa-report.md). |

## Intelligence expansion, November 14 2026

| ID | Decision | Context and follow-up |
| --- | --- | --- |
| D-2026-11-14-08 | Add three main AI moments (event reconstruction, claim/evidence challenge, new-evidence impact comparison) and two optional deep dives (scoped research and cause-specific response comparisons) to the plan for both lines. | Owner approved planning after independent AI-expert challenge. All interactions remain scripted with human decisions and local sample data. These additions are planned. [Specification](workflow-demo-plan.md#approved-intelligence-expansion--november-14-2026). |
| D-2026-11-14-09 | Explicitly launch the wire-transfer RCSA refresh from the dashboard, with state-aware continue/view/respond wording. | The previous Review changes label did not clearly name the flagship task. Preserve drafts, submissions and review history. |

## Broader AI capability planning November 14 2026

| ID | Decision | Context and follow-up |
| --- | --- | --- |
| D-2026-11-14-10 | Revise the carry-forward review and roadmap to prioritize connected AI control recommendation/design, gap/effectiveness assistance and generated implementation/validation work, followed by risk discovery, rating/response assistance and portable synthesis. | Owner requested greater emphasis on the older demo's broader AI capabilities. Manual mapping and response choices do not establish AI recommendation/generation parity. The [expansion plan](ai-capability-expansion-plan.md) defines planned AI-01–08 work and acceptance criteria. This records a planning revision, not feature implementation or approval to add live services. Existing human authority, evidence and version handling remain the foundation. |
| D-2026-11-14-11 | Implement phase 1 (AI-01–04) as a connected control-assistance workflow within the existing Controls and response surfaces. | Owner authorized implementation after the revised plan. Three risk-specific candidate sets, editable proposals, set-aware gaps, bounded claim checks and implementation/validation tasks now carry through owner/reviewer workflow and preserved versions. Ten model/render checks, an end-to-end in-app browser replay, mobile/native-size visual checks and independent source re-review passed. [QA record](../ux/ai-control-assistance-qa.md). Later phases remain planned; no model calls, external services, deployment or remote issue updates were added. |
