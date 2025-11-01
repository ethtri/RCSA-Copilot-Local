# Shell Accessibility Checklist (WS-03)

## Focus & Navigation
- **Skip link**: Ensure `<a class="rcsa-shell__skip-link">` is the first interactive element and moves focus to `#page-content`.
- **Tab order**: Confirm keyboard tabbing follows the sequence skip link -> nav toggle/links -> main content -> aside -> footer.
- **Mobile nav toggle**: Verify the `data-shell-nav-toggle` button updates `aria-expanded`, traps focus inside the menu, and responds to the Escape key to close.
- **Focus management**: When the nav opens, the first link should receive focus; keep `<main id="page-content" tabindex="-1">` so the skip link has a deterministic target.

## Landmarks & Semantics
- **ARIA landmarks**: Maintain `<header role="banner">`, `<main role="main">`, `<aside aria-label="Supporting content">`, and `<footer role="contentinfo">` from the base layout.
- **Breadcrumbs**: Keep the ordered list inside `nav[aria-label="Breadcrumb"]` so screen readers announce the path correctly.
- **Wizard panes**: Follow `docs/ux/ASSESSMENT_WIZARD_UX_STANDARDIZATION_ANALYSIS.md` for pane structure (`role="article"`, labelled headers, descriptive badges).

## Visual & Contrast
- **Token usage**: Use design system tokens (for example `var(--fcb-gray-700)`) for text and backgrounds to preserve tested contrast ratios.
- **Focus styles**: Preserve the visible focus ring on `.rcsa-site-header__link` and `.rcsa-shell__skip-link`; extend `src/styles/overrides.css` if new controls are added.
- **Reduced motion**: Honour the `prefers-reduced-motion` rules in `src/styles/overrides.css`; provide fallbacks before introducing additional animation.

## Assistive Technology Validation
- **Keyboard**: Test navigation and skip link behaviour in at least one modern browser (Edge or Chrome) using only keyboard input.
- **Screen readers**: Spot-check with Narrator or VoiceOver to confirm breadcrumb annunciation and landmark discovery once content is populated.
- **Responsive**: Validate the collapsed navigation (<=1024px) with keyboard and screen reader to ensure menu items remain reachable.

## Verification Log
- [2025-11-01, Agent A03] Confirmed skip link targets `#page-content`, nav toggle updates `aria-expanded`, and footer year renders via `assets/js/shell.js` during local preview (run `python -m http.server 8000`, visit `http://127.0.0.1:8000/src/`). Keyboard tab order reviewed in generated markup; nav closes on Escape per script inspection.
