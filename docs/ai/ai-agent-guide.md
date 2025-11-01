# AI Agent Operations Guide – Local Static Demo Track

## Purpose
Equip numbered agents with consistent prompts, handoff expectations, and completion criteria while delivering the offline RCSA demo in `C:\Projects\RCSA-DEMO-LOCAL-V1`. Use this guide with `docs/operations/delivery-plan.md`, `docs/operations/risk-log.md`, and `docs/operations/decision-register.md` to keep governance aligned.

## Environment Bundle
- **Workspace (editable):** `C:\Projects\RCSA-DEMO-LOCAL-V1`
- **Serving pattern:** Static assets only; preview via `python -m http.server` (repo root) or equivalent lightweight server.
- **Design system:** `design-system/rcsa-styles.css`, `design-system/tokens/**`
- **Mock data:** `assets/data/*.json` (canonical source for dashboard, ROI, wizard content)
- **Reference docs:** `docs/operations/delivery-plan.md`, `docs/ux/**`, `docs/data-contracts/**`

Legacy Power Pages environments and CLI workflows are out of scope for this effort.

## Copy-Paste Prompt Template
```markdown
**Role**: <e.g., "WS-04 Home Page Specialist">
**Objective**: <Tie to delivery plan workstream and acceptance criteria>
**Environment Bundle**:
- Workspace: `C:\Projects\RCSA-DEMO-LOCAL-V1`
- Design system: `design-system/rcsa-styles.css`, `design-system/tokens/`
- Mock data: `assets/data/<relevant-file>.json`
- Docs: `docs/operations/delivery-plan.md`, <other artifacts>
**Deliverables**: <Repo-relative paths to create/update>
**Verification**:
- [ ] Imports `design-system/rcsa-styles.css` (and tokens if needed)
- [ ] Uses approved mock data contract(s)
- [ ] Local preview via `python -m http.server` (document URL)
- [ ] Accessibility/responsiveness spot-check complete
- [ ] Governance docs + [`docs/operations/agent-activity-log.md`](../operations/agent-activity-log.md) updated with progress, findings, and open questions
**Open Questions / Escalations**: <List blockers or decisions required>
```

## Required Inputs & Outputs per Handoff
- **Inputs:** Prompt template above, workstream ID (WS-0X), links to required design tokens or data contracts, acceptance criteria from delivery plan.
- **Work Products:** Changes confined to approved directories (`docs/`, `design-system/`, `assets/`, `src/` or `public/`, `tools/`). Include screenshots or notes demonstrating local preview/testing.
- **Outputs:** Completed Definition of Done checklist (below), updated governance artifacts (delivery plan notes, risk/decision log entries, activity log entry), and verification evidence (screenshots, commands, test logs).

## Definition of Done Alignment
- Imports `design-system/rcsa-styles.css` and leverages tokens for colors/spacing; no bespoke CSS unless documented.
- Reads mock data from `assets/data/` or records new schema in `docs/data-contracts/`.
- Demonstrates successful local render (record command and relative URL).
- Performs basic accessibility check (keyboard focus, contrast cues) and flags gaps.
- Updates documentation/runbooks when changing structure, data, or workflows.

## Version Control Rules
- Branch naming: `feature/<workstream>-<short-task>` (e.g., `feature/ws-05-dashboard-cards`).
- Commit messages: Prefix with workstream ID (`WS-05: Wire dashboard metrics`).
- Pull Requests: Include DoD checklist, verification evidence, and mention reviewer listed in delivery plan.
- Keep `main` stable; resolve conflicts locally. Exclude machine-specific files.

## Escalation Triggers
- Need for tooling beyond static HTML/CSS/JS stack.
- Proposed mock data changes that affect UX copy or layout.
- Accessibility/design-system conflicts that require new tokens or patterns.
- Documentation or plan gaps that block downstream work.

## Handoff Checklist
1. Update relevant workstream row in `docs/operations/delivery-plan.md` (status, notes, reviewer).
2. Summarize file changes and impacted data sources (e.g., `src/pages/home/index.html`, `assets/data/roi-calculator.mock.json`).
3. Capture verification evidence (screenshot references, server command/output, test results).
4. Log newly discovered risks or decisions in `risk-log.md` or `decision-register.md`.
5. Notify dependent workstream owners that prerequisites are cleared.

## Communication & Cadence
- **Daily async status:** Quick note covering progress, blockers, next steps tied to workstream IDs.
- **Milestone syncs:** Occur at milestones listed in delivery plan; confirm DoD artifacts and review risk posture.
- **Stakeholder updates:** RCSA Demo PM consolidates progress highlights, risks, and decisions after major changes.

## References
- `docs/operations/delivery-plan.md` – Milestones, tracker, immediate actions.
- `docs/operations/risk-log.md` – Active risks, owners, mitigations.
- `docs/operations/decision-register.md` – Historical decisions guiding implementation.
- `design-system/` – Styles, tokens, component patterns.
- `docs/ux/` – UX guidance, QA checklists (expand as screens are rebuilt).

Maintain this guide alongside governance artifacts; record substantive updates in the decision register.
