# Inline AI insights

Implemented locally in revision `20261115.15` following the owner's feedback that a complete AI-authored analysis page felt unrealistic.

## Experience

The before-controls and after-controls assessment screens contain a standard **AI insights** component with two concise findings. Each offers **Why & sources**, opening a reusable evidence drawer. **Related research** uses the same drawer pattern. Reading a source and returning preserves the insight and the underlying assessment form.

The separate **View full analysis** link and duplicate AI rating card are removed from these screens. The heatmap and current rating remain visible beside the assessment; history remains a standard recorded-data component. Old analysis/research URLs return to an assessment step. Existing entry actions elsewhere in the app open the compact drawer rather than navigating to the former report-like page.

Before-controls findings concern process changes, possible events and customer impact. After-controls findings concern available test evidence and remaining questions. Source dates and population/scope are shown as recorded facts. No new numerical risk estimates, rates or unsupported metrics were introduced. Public research is labeled as industry context, with dated excerpts available on demand.

**Review suggested update** retains the existing preview, edit and explicit apply flow. **Check my explanation** retains its bounded claim check. Neither viewing an insight nor opening a drawer changes ratings, controls, follow-up work, history or source links. Unsupported scopes show a clear manual-review message. Changed bank rating definitions can retain factual insights while disabling prepared numeric proposals.

Submitted assessments use their preserved risk and source context. If the authored scenario no longer matches that context, the component falls back to reviewing the recorded evidence. Opening a drawer for another risk does not silently change the active editor's selected risk. New service evidence is offered only in its relevant risk context, and using suggested wording requires an explicit user action.

## Verification

All 24 `tools/verify-*.mjs` checks pass. The new `verify-inline-insights.mjs` covers all three prepared risks and both assessment lenses, source/research links, preserved submitted context, unsupported scopes, and absence of domain changes when viewing. [Check output](../../output/inline-insights-2026-11-15/checks.txt).

In-app Browser verification covered:

1. Reloading the existing analysis URL returns to the assessment with the user's draft preserved.
2. Two inline findings appear, without a full-analysis link or duplicate rating card.
3. Why & sources opens a drawer without changing the route; source inspection and Back to insight preserve the current view.
4. Related research opens three dated public references in the drawer, without generating a bespoke research page.
5. Desktop inspection at 1183 × 917 and phone inspection at 390 × 844. Phone client width and document scroll width both measured 375px. The temporary viewport override was reset.

Saved browser captures were opened with `view_image`: [desktop assessment](../../output/inline-insights-2026-11-15/assessment.png), [evidence drawer](../../output/inline-insights-2026-11-15/drawer.png), [phone assessment](../../output/inline-insights-2026-11-15/mobile.png).

The existing visual system is retained: forest controls, pale-green AI surface, serif page title, system UI text, native labeled fields, source links and the shared risk palette. The intentional changes are the compact insight list, secondary drawer, removal of the narrative-page journey and relocation of suggested-update access. Spacing, text hierarchy, source affordances, visible heatmap and phone reflow were inspected. No new illustrations, bespoke AI graphics or live AI/search claims were added. The demo still uses prepared suggestions and synthetic bank records.
