# RCSA Demo Local Decision Register (v2025-10-31)

| ID | Date | Decision | Context | Owner | Follow-Up |
| --- | --- | --- | --- | --- | --- |
| D-2025-10-31-01 | 2025-10-31 | Use static/offline rebuild as single delivery track; deprecate prior Power Pages environment references. | Aligns with stakeholder directive to avoid live services and simplifies governance. | RCSA Demo PM | Update all operational docs and prompts; archive legacy environment notes. |
| D-2025-10-31-02 | 2025-10-31 | Maintain governance artifacts in `docs/operations/` (`delivery-plan.md`, `risk-log.md`, `decision-register.md`). | Provides single source of truth for planning and status. | RCSA Demo PM | Review and refresh each milestone. |
| D-2025-10-31-03 | 2025-10-31 | Require design-system styles (`design-system/rcsa-styles.css`, tokens) on every page implementation. | Ensures UX consistency vs. legacy demo. | RCSA Demo PM & Frontend Lead (TBD) | Bake into Definition of Done and automated checks. |
| D-2025-10-31-04 | 2025-10-31 | Adopt `src/`-based static architecture with shared partials and python preview scripts. | Enables modular pages and offline previews without introducing a build tool. | Tech Lead (TBD) | Implement scaffold per WS-02 and revisit templating needs at M2 checkpoint. |
| D-2025-11-01-01 | 2025-11-01 | Adopt experience pillars in `docs/ux/cx-director-audit.md` as baseline for static UX (visual, motion, tone). | Replaces portal-native interaction cues with static-ready guidance while preserving award-winning feel. | RCSA Demo PM & CX/UX Director | Brief WS-02/03 owners; update Definition of Done and QA checklist with pillar checkpoints. |
| D-2025-11-02-01 | 2025-11-02 | Establish Tuesday + milestone documentation cadence and elevate refreshed README/DoD as canonical onboarding source. | Reduces risk R-05 by ensuring run instructions and acceptance criteria stay aligned with static preview workflow. | Agent 04 (Governance) | Review cadence effectiveness at M2; adjust if preview tooling changes. |

Log new decisions with incremental IDs (`D-YYYY-MM-DD-##`), and reference related risks, tasks, or documentation updates.
