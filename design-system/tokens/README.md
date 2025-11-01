# Design Token Usage (Typography & Spacing Seeds)
**Last Updated:** 2025-11-01 (Agent A01)

## Overview
The offline static demo should reference shared design tokens before defining any page-level styles. This folder houses the imported legacy typography scale that underpinned the Power Pages MVP so teams can replicate the same visual rhythm without ad-hoc values.

## Current Tokens
- `typography.json` – font family, type scale, and default body line height migrated from `C:\Projects\RCSA_Demp_V6\design-system\tokens`.

## How to Consume
1. **Static HTML:** Include a generated CSS map before custom styles. (See upcoming WS-03 task to produce `design-system/tokens.css` when needed.)
2. **JavaScript Utilities:** Use `fetch('/design-system/tokens/typography.json')` (or import during build) to calculate responsive typography.
3. **Documentation:** Reference token names in UX specs (`docs/ux/…`) instead of hard-coded pixel/rem values.

### CSS Export (`design-system/tokens.css`)
```html
<link rel="stylesheet" href="/design-system/tokens.css" />
<p class="token-body token-text-lg">Typography tokens now flow from the shared CSS export.</p>
```

Token naming mirrors the JSON keys:
- Custom properties follow `--rcsa-typography-{category}-{token}` (e.g., `--rcsa-typography-scale-sm`).
- Utility classes expose `.token-text-{token}` for font sizes, `.token-body` for the shared body stack, and `.token-leading-body` for the line-height preset.

> **Verification (2025-11-03, Agent A05):** `src/partials/head.html` imports `/design-system/tokens.css` via a root-relative path alongside the legacy bundle. The reference resolves in local preview (`tools/local-preview.ps1`) when loading `http://localhost:8000/src/pages/home/`, confirming partials and downstream pages access the stylesheet without runtime fetches.

## Guardrails
- Do not alter token values without CX/UX Director approval; maintain parity with the legacy experience.
- Any additional token categories (color, spacing) must be audited from the V6 repository prior to addition.
- Update this README whenever new token files are introduced or usage patterns change, and cross-link changes inside `docs/operations/delivery-plan.md` notes for WS-03.
