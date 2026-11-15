# Demo implementation design

The owner's product feedback is implemented in the [product refinement specification](FEEDBACK_REFRESH.md). Its dashboard, control mapping and response references supersede those initial surface treatments. The active styles are `demo.css` plus `dashboard.css`, `controls.css` and `product-refresh.css`; all UI and charts remain native.

The owner authorized the full build on November 14, 2026. Implement the recommended evidence-first direction C, using the earlier sets for workflow/content reference. New full-screen references extend C to work, rating, review, report and narrow layouts under `concepts/build-reference/`. The source control-discovery concept is `concepts/2026-11-14/control-discovery-directions/c-evidence-comparison.png`.

## Shared system

- Native static HTML/CSS/JavaScript, local JSON, no runtime dependencies or external fonts.
- Background #f5f7f8; white sheets/top navigation; ink #15221e; muted #64706a; forest #124d3b; selected evidence #e4efd7; amber for Elevated; terracotta for High.
- Georgia display and source excerpts; Segoe UI/system sans for controls, body, navigation, data and labels. Display 44px desktop/32px narrow; body 16px; UI 14px; labels 13px. Native source quotes 30px desktop, 23px narrow.
- Thin top navigation, no permanent sidebar. Centered max-width 1320px; desktop gutters 48px; narrow gutters 20px. Sheets have 1px soft borders and 6px radii; open layouts and ruled rows provide hierarchy.
- Shared primitives: primary/quiet/text buttons, evidence links, risk labels, source dialog/drawer, numeric matrix, two-column reading surfaces, editable rationale controls, status trail. Controls have hover/focus/disabled states. No decorative imagery is needed; charts and text are native.
- Main navigation: My work, Assessments, Reports. Assessment stages: What changed, Inherent risk, Controls, Residual risk & response, Review. All exact content and scores come from the scenario fixture.
- Responsive: stage strip scrolls independently, forms/sources stack, tables remain locally scrollable, evidence dialog becomes a full-width sheet. Presenter controls are separate from banking work.

## Core copy and constraints

Preserve C's control-discovery title “Do these controls share a source?”, both source excerpts, provisional connection, source access and human confirm/qualify/dismiss actions. Confirmation records a relationship only. The complete flow and all content fields are governed by `../operations/workflow-demo-plan.md` and `assets/data/workflow-demo.json`.

Intentional adaptations from image concepts: replace inaccurate generated dashboard column labels with Current risk and Assessment; remove decorative side stripes, invented source claims and repeated metadata; use a consistent forest action color and one native component family; give score charts truthful numeric marks. Typed drafts, clear state feedback, human attestations, progress, responsive navigation and presenter controls are necessary working-demo additions. Do not copy image-generation wording that conflicts with source scope or human authority.

Each stage gets a concise title, one main action, a short explanation and inspectable evidence. Details and rating definitions open on demand rather than permanently competing with the task. The final report preserves elevated current risk, open testing and pending management disposition.

## Plain-language and navigation rules — November 14, 2026

Use task headings and short action labels. Prefer Risk before controls / Risk after controls in navigation; retain formal terms in definitions and reports. Show Draft or Confirmed beside assessment ratings. Source titles open their excerpts; nested source inspection must return to the edited draft with values and focus intact. Use complete labelled selectors on mobile rather than clipped menus. Submission blockers link to their owning risk and screen. Optional industry context follows the immediate assessment task. Preserve source text and the distinction between planned controls, supported operation, review completion and management approval.

See [the review](plain-language-navigation-review.md) for accepted screenshots and the checked journey.
