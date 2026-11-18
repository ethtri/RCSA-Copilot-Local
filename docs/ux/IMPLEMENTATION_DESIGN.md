# Demo implementation design

The November 15 experience upgrade uses the [current design system](DEMO_EXPERIENCE_DESIGN.md), extracted from the coordinated [assessment](concepts/2026-11-15/assessment-reference.png), [controls](concepts/2026-11-15/controls-reference.png) and [report](concepts/2026-11-15/report-reference.png) references. These supersede the earlier surface treatments. All UI and charts remain native HTML, CSS and ES modules.

The implementation preserves the earlier evidence-first identity and domain boundaries while making AI proposals visible, work records editable and the default path compact. The [experience plan](../operations/demo-experience-upgrade-plan.md) governs scope; the [verification record](../operations/demo-experience-upgrade-verification.md) distinguishes implemented and checked behavior from remaining work. The earlier [product refinement](FEEDBACK_REFRESH.md) and `concepts/2026-11-14/` material remain historical references.

## Shared system

- Native static HTML/CSS/JavaScript, local JSON, no runtime dependencies or external fonts.
- Background `#f5f7f8`; white sheets and navigation; ink `#15221e`; muted `#53645b`; forest `#064d36`; pale green AI surface `#eef4ec`; amber for Elevated; terracotta for High. Ratings also have text labels.
- Georgia page titles; Segoe UI/system sans for work, controls, source excerpts, navigation, tables and labels. Functional titles 32px desktop/28px narrow; body 14–16px; secondary metadata 12–13px. Rationale fields show at least five lines.
- A 68px desktop header and compact context/stage strip. Centered max-width 1480px, desktop gutters 32px and narrow gutters 20px. White work panels have thin neutral borders and 6–8px radii. The assessment uses a risk rail, owner draft and AI rail; evidence opens at the right.
- Shared primitives: primary/quiet/text buttons, source links/drawer, risk labels, matrix, proposal preview, persistent field errors, long editor, action footer and saved/recorded/sync states. Touch controls are normally at least 44px tall. Focus, hover, disabled and invalid states are explicit.
- Main navigation: Dashboard, Assessments, Reports. Stages: Changes, Risk before controls, Controls, Risk after controls, Review. AI-prepared changes and risk discovery are the default entry; control suggestions are visible without an optional AI disclosure. Exact facts and scores come from synthetic records, never generated image copy.
- Responsive: the header wraps before the former 640px collision; labeled step and risk selectors replace crowded strips on narrow screens; work items become a labeled list; retained tables have named keyboard-scroll regions. Long editors and the source drawer adapt to the available width. Motion is short and respects reduced motion.
- `src/styles/upgrade.css` consolidates the current component rules and loads after the active feature styles listed in `src/index.html`. It retains the static framework and external-font-free runtime.

## Core copy and constraints

Preserve C's control-discovery title “Do these controls share a source?”, both source excerpts, provisional connection, source access and human confirm/qualify/dismiss actions. Confirmation records a relationship only. The complete flow and all content fields are governed by `../operations/workflow-demo-plan.md` and `assets/data/workflow-demo.json`.

Intentional adaptations from image concepts: replace inaccurate generated dashboard column labels with Current risk and Assessment; remove decorative side stripes, invented source claims and repeated metadata; use a consistent forest action color and one native component family; give score charts truthful numeric marks. Typed drafts, clear state feedback, human attestations, progress, responsive navigation and presenter controls are necessary working-demo additions. Do not copy image-generation wording that conflicts with source scope or human authority.

Each stage gets a concise title, a clear next action and inspectable evidence. Detailed analysis, rating definitions, source excerpts and history open on demand. AI suggestions remain distinct from the editable draft and the last confirmed position. The all-risk report uses the selected assessment version with separately identified action/decision versions; approved requests, action closure and review completion never automatically lower a rating.

## Plain-language and navigation rules — November 14, 2026

Use task headings and short action labels. Prefer Risk before controls / Risk after controls in navigation; retain formal terms in definitions and reports. Show Draft or Confirmed beside assessment ratings. Source titles open their excerpts; nested source inspection must return to the edited draft with values and focus intact. Use complete labelled selectors on mobile rather than clipped menus. Submission blockers link to their owning risk and screen. Optional industry context follows the immediate assessment task. Preserve source text and the distinction between planned controls, supported operation, review completion and management approval.

See [the review](plain-language-navigation-review.md) for accepted screenshots and the checked journey.
