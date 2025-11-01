# RCSA Demo – Local Static Package

## Mission
Deliver a polished, fully offline recreation of the RCSA Copilot experience that mirrors the banking stakeholder demo without relying on Power Pages. Everything in this repository serves the static track: design tokens, UX guidance, mock data, and governance artifacts that keep agents aligned.

## Quick Start
1. **Prerequisite:** Python 3.10+ available on your path.
2. From the repo root, start the static preview server:

   ```bash
   python -m http.server 8000 --bind 127.0.0.1
   ```

   _PowerShell users can run `tools/local-preview.ps1`; macOS/Linux can use `tools/local-preview.sh`._

3. Navigate to `http://127.0.0.1:8000/src/pages/home/` for the home page shell, or switch to the other page folders under `src/pages/`.
4. Stop the server with `Ctrl+C` when finished.

## Page Shell Integration
- Start new pages from [`src/layouts/base.html`](src/layouts/base.html); copy the scaffold and replace the sample cards with your feature markup.
- Keep `rcsa-styles.css` first in the `<head>` via the shared partial and leave `<body class="rcsa-shell ...">` intact so the responsive grid, skip link, and landmarks remain wired.
- Slot primary content inside `<main id="page-content" class="rcsa-shell__main">` and use the optional `<aside class="rcsa-shell__aside">` for progress summaries or supporting insights, removing it entirely if unused.
- Navigation is auto-managed by [`assets/js/shell.js`](assets/js/shell.js); ensure each page includes `<div data-partial-src="../../partials/global-scripts.html"></div>` (or equivalent path) so the toggle and focus logic load.
- Demonstrate design-token usage by applying classes backed by `rcsa-styles.css` or the overrides in [`src/styles/overrides.css`](src/styles/overrides.css) instead of inline styles.

### Run & Verify Checklist
- Record the exact preview command and URL in your worklog or PR.
- Before handing off, confirm page markup imports [`design-system/rcsa-styles.css`](design-system/rcsa-styles.css) and any needed tokens under [`design-system/tokens/`](design-system/tokens/).
- Use mock data from [`assets/data/`](assets/data) instead of hard-coded values; update `docs/data-contracts/` if schemas change.
- Perform a quick accessibility sanity pass (keyboard focus, heading structure, reduced-motion behaviour).

## Repository Layout
- `assets/` – Static media and JSON content used across pages.
- `design-system/` – Canonical CSS, tokens, and component guidance; start with [`design-system/DESIGN_SYSTEM_INDEX.md`](design-system/DESIGN_SYSTEM_INDEX.md) and [`rcsa-styles.css`](design-system/rcsa-styles.css).
- `docs/` - Governance, UX, AI prompt guides, and (labelled) legacy references; key files include:
  - [`docs/operations/delivery-plan.md`](docs/operations/delivery-plan.md) - Workstreams, cadence, and notes.
  - [`docs/operations/definition-of-done.md`](docs/operations/definition-of-done.md) - Acceptance checklist for static contributions.
  - [`docs/ai/ai-agent-guide.md`](docs/ai/ai-agent-guide.md) - Prompt template and environment bundle for numbered agents.
  - [`docs/ux/cx-director-audit.md`](docs/ux/cx-director-audit.md) - Experience pillars that replace portal-native cues.
  - [`docs/legacy/README.md`](docs/legacy/README.md) - Catalog of archived Power Pages materials kept for historical context only.
- `src/` – Page shells, partials, and client-side scripts adopted for the offline build.
- `tools/` – Helper scripts for local previewing and future automation.

## Design System & Experience Standards
- Use the tokens and utilities defined in [`design-system/rcsa-styles.css`](design-system/rcsa-styles.css) and the supporting documentation in [`design-system/tokens/README.md`](design-system/tokens/README.md) before introducing overrides.
- Align copy, spacing, and motion with the CX director guidance in [`docs/ux/cx-director-audit.md`](docs/ux/cx-director-audit.md) and supporting UX docs.
- For wizard flows, refer to [`docs/ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md`](docs/ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md) and the data contract notes in `docs/data-contracts/`.

## Governance & Handoffs
- The canonical governance set lives in:
  - [`docs/operations/delivery-plan.md`](docs/operations/delivery-plan.md)
  - [`docs/operations/risk-log.md`](docs/operations/risk-log.md)
  - [`docs/operations/decision-register.md`](docs/operations/decision-register.md)
- All substantive documentation changes should be reflected in these artifacts and summarised in the Definition of Done checklist.
- Coordinate preview command updates with Agent A02 and UX acceptance with Agent A01 to keep this README accurate.

## Need Help?
- Start with the prompt scaffolding in [`docs/ai/ai-agent-guide.md`](docs/ai/ai-agent-guide.md).
- Legacy Power Pages materials are being catalogued under `docs/legacy/` for reference-only context; flag gaps in the delivery plan notes if you need additional archives.
