# Static Architecture Decision (WS-02)

**Decision Date:** 2025-10-31  
**Related Items:** WS-02 (Architecture & Tooling), R-01, D-2025-10-31-03

## Summary
- Serve the demo directly from source files under `src/`, using lightweight HTML with reusable partials and shared scripts—no build step required.
- Keep mock data and media in `assets/` (existing), referencing them via relative paths from page directories.
- Provide cross-platform preview scripts that wrap `python -m http.server` to ensure a repeatable, offline run workflow.

## Source Structure
```
src/
  index.html
  pages/
    home/index.html
    dashboard/index.html
    wiz-assessment/index.html
  partials/
    head.html
    header.html
    footer.html
    global-scripts.html
  scripts/
    partial-loader.js
    data/
  styles/
    overrides.css
tools/
  local-preview.ps1
  local-preview.sh
```

### Notes
- Pages load shared markup by calling `scripts/partial-loader.js`, which swaps elements tagged with `data-partial` for the HTML located in `src/partials/`.
- All pages import `../../design-system/rcsa-styles.css` first, then layer any minor overrides from `src/styles/overrides.css`.
- Mock JSON contracts remain in `assets/data/`; consuming pages fetch from those URLs relative to the repo root (e.g., `/assets/data/dashboard-metrics.mock.json`).
- The preview scripts serve the repository root so that `src/` and `assets/` are available together; the default start page is `http://localhost:8000/src/pages/home/`.

## Downstream Dependencies
- **WS-03 (Design System Integration):** Needs to extend `src/partials/head.html` with token-driven classes and document required component imports.
- **WS-04, WS-05, WS-06 (Page Builds):** Implement markup inside the respective `src/pages/*/index.html`, reusing the shared partials and loader script.
- **WS-07 (QA & Accessibility):** Can attach tooling hooks (e.g., manual axe runs) to the preview scripts or augment `src/scripts/` without altering site structure.
- **WS-08 (Demo Packaging):** README/runbook should reference the preview scripts and page URLs delivered by this architecture.

## Open Questions
1. Confirm whether `wiz-assessment` needs subroutes for each step or can remain a single page with dynamic panels.
2. Determine if we should add a lightweight build step later (e.g., Eleventy) for templating once core pages stabilize—defer until after M2.
3. Evaluate need for an accessibility lint pass that can run locally without node-based tooling.
