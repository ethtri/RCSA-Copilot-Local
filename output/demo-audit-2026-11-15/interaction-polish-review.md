# Interaction and premium-polish review

Reviewed November 15, 2026, against working-tree HEAD `29540e6`. This is an audit; no application files were changed.

Evidence: active HTML, CSS, view modules and handlers, plus fresh screenshots captured by the lead reviewer and opened by this reviewer: `screenshots/01-dashboard.jpg`, `02-changes.jpg`, `03-inherent.jpg`, `04-ai-analysis.jpg`, `06-controls-collapsed.jpg`, `07-ai-controls.jpg`, `08-control-validation.jpg`, `18-dashboard-actual-640.jpg` and `19-review-mobile-390.jpg`. This reviewer did not control the browser. The lead reviewer owns interaction reproduction and narrow-screen captures.

## Judgment

The app already has a coherent, restrained visual system. Forest green, pale surfaces, fine borders and consistent evidence links make it credible. The premium gap is more about task design and interaction finish than about selecting a new palette. Large editorial headings, repeated instructional copy and several navigation layers give assessment and analysis screens a presentation-like rhythm. The actual editable work can be small and far down the page.

Make the task faster and easier to see before adding effects. Then use short, purposeful transitions to connect the task, the AI finding, its evidence and the resulting change.

## What to keep

- The shared visual language and understated color palette. There is no need to replace it with a generic blue dashboard or decorative gradients.
- Human confirmation is distinct from AI drafts, proposed controls, current risk and pending decisions. Preserve these distinctions when shortening copy.
- Native `dialog.showModal()` provides an appropriate modal foundation. Sources inspected from an editor preserve the actual parent editor nodes, scroll and focus when returning (`src/scripts/demo/app.js:65–79`). This is a strong pattern.
- Skip link, labeled controls, visible focus styles and a reduced-motion guard already exist (`src/index.html:28`; `src/styles/demo.css:3–4,14`).
- The mobile assessment, analysis and AI-view selectors use proper labeled native selects with 44px minimum height (`src/styles/ux-polish.css:27–35`).
- Evidence uses text labels and not color alone. The risk matrix has a full accessible description (`src/scripts/demo/ui.js:21–33`).
- Source links, implementation plans and review history provide useful depth without requiring every source to be read during the main flow.

## Findings

### P1 — Validation should remain inside the editor

**Source evidence:** `src/scripts/demo/app.js:27,166,160,179–194`; `src/scripts/demo/control-assistance-actions.js:139–155`; `src/index.html:32–33`.

Missing mapping fields, missing plan fields and incomplete risk responses produce a generic toast that clears after 3.5 seconds. There is no field error, error summary, `aria-invalid` or focus movement to the field that needs attention. The markup includes some `required` attributes, but the primary actions are button handlers rather than form submissions, so native constraint validation is not invoked.

More seriously, the toast is outside the native modal. While a modal is open, outside content is inert and below the modal's top layer. The message may be visually obscured and cannot be relied on as the accessible error message for that modal.

**Browser confirmation from the lead reviewer:** Cleared Control name in Review proposed design and chose Add proposed control. No inline error appeared; the `aria-invalid` count was zero; focus remained on Add proposed control; the empty name field was above the visible scroll position. The toast was blurred/obscured behind the modal backdrop. This is visible in `08-control-validation.jpg`. No screen-reader behavior was tested.

**Recommendation:** Put a persistent error summary above the modal's action area, mark the relevant field, link the error to the field and focus the first invalid field. Keep the toast for successful completion. Prefer a real form and submission handler where practical.

**Acceptance:** Blank one required control field and choose Add. The editor stays open; the exact missing field and repair are visible and announced; keyboard focus reaches that field; values remain intact.

### P1 — Preserve focus and context when changing a selection

**Source evidence:** `src/scripts/demo/app.js:31–38,88–90,113,156,173`; `src/scripts/demo/control-assistance-actions.js:103–108`; `src/scripts/demo/response-view.js:21`.

`render()` replaces all of `#app`. Dashboard filters, risk switches, AI recommendation selections and AI-view tabs invoke it without restoring focus to their replacement control. Response strategy and select changes also rebuild the app. Removing the focused node interrupts keyboard use. Analysis-section changes instead call `render(true)`, which focuses the page heading and scrolls to the top on each selection; this is useful for route changes but heavy for a secondary section switch.

**Browser confirmation from the lead reviewer:** Activating Suggest controls left `document.activeElement` as `BODY` after the full rerender. This is a reproduced keyboard-focus defect; other listed controls share the code pattern but were not all individually reproduced.

**Recommendation:** Preserve selection-control focus for local updates. Render the changed panel only, or store and restore a stable control identifier and selection. Reserve heading focus and page-top scrolling for actual route changes. Announce result counts or panel updates briefly.

**Acceptance:** Tab to a work filter, activate it, then press Tab. Focus continues from that filter. Arrow through response radio options without dropping out of the radio group. Open an analysis section without losing the section controls or unexpectedly moving to the top of the page.

### P1 — Rebalance the page around the work

**Screenshot evidence:** `03-inherent.jpg`, `04-ai-analysis.jpg`; supporting code `src/scripts/demo/assessment.js:25–29`, `src/scripts/demo/analysis-workspace.js:15`, `src/styles/demo.css:3–7`, `src/styles/premium.css:1,7`.

The assessment has a global header, sync line, process context, five-step navigation, large title and introductory text before its form. AI analysis adds a back row, risk selection, another large headline, a lens explanation and section navigation. Roughly half the first desktop viewport is spent reaching the content. The analysis repeats the same instruction in the stage label, lens and right-side guidance panel.

The rationale fields in the inherent-risk screen are much shorter than the surrounding display blocks. A long rationale is already clipped behind an internal scrollbar in the captured first screen.

**Recommendation:** Use a compact persistent assessment header showing process, period, risk, status and step. Keep functional titles around 28–32px. Put assessment editing and the AI finding side by side, with source evidence opening in a drawer. Use 5–7 visible lines or an auto-expanding rationale field; move general methodology into an explicitly labeled help disclosure.

**Acceptance:** At a normal laptop height, users can see the selected risk, rating controls, the complete short rationale, the AI finding and the next action without a long first scroll.

### P1 — Bring the core AI assistance into the visible controls task

**Screenshot evidence:** `06-controls-collapsed.jpg`, `07-ai-controls.jpg`; source `src/scripts/demo/controls.js:45–54`.

The current-controls section opens by default and occupies a long page. Its conclusion, several disclosures and library button come before a collapsed Find control improvements with AI section. Even after opening that section, users must activate Suggest controls before seeing the recommendations. Meanwhile, the prominent top action is manual Add a control and the sticky continuation action allows the user to proceed without discovering the assistant.

The opened assistance is materially richer than its initial presentation: it compares an existing control, an enhancement and a new independent-verification design, then offers gaps and an implementation plan. This is exactly the capability that should be evident in an AI-first demo.

**Recommendation:** Show a compact AI findings/recommendations area beside or directly above the owner conclusion by default. Lead with one useful result, for example 1 evidence gap · 3 control options, with Review options as the primary contextual action. Put methodological explanation and complete mapping detail in disclosures. Progressive disclosure should hide supporting analysis rather than the central product value.

### P1 — Raise small operational text and selected contrast pairs

**Screenshot evidence:** `01-dashboard.jpg`; source `src/styles/dashboard.css:2–3,7–8`.

The dashboard puts 30–50px display text above tables and metadata that often use 9–12px type. Counts, record details, dates and supporting labels are harder to scan than the card headlines. CSS defines several small text pairs with limited contrast: `#7c8b82` on white is approximately 3.58:1, `#748178` on white 4.07:1, and `#6f7f74` on white 4.23:1. These calculations are targeted source checks, not a complete rendered contrast or accessibility audit.

**Recommendation:** Use 14px for normal operational content and at least 12–13px for secondary metadata, with the same readable default text color family. Keep muted text visibly secondary without washing it out. Recover room by shortening copy and reducing heading size instead of shrinking the content users must read.

### P2 — Analysis should end in an action or a clear return

**Screenshot evidence:** `04-ai-analysis.jpg`; source `src/scripts/demo/risk-intelligence.js` and `src/scripts/demo/analysis-workspace.js:15`.

The analysis is careful and useful, but its ending is a large green question and suggested follow-up. That feels like a report conclusion. The user has left the assessment editor to read the analysis and then has to find the back control near the top to continue working.

**Recommendation:** End the panel with a concise suggested change and a clear action, for example Review proposed rationale, Add an evidence request, or Return to rating. Preview the exact change and require explicit application. Keep the full analysis behind Show analysis / Sources rather than turning every insight into a reading page.

### P2 — Use a consistent detail surface and action position

**Source evidence:** `src/styles/demo.css:9`; `src/styles/premium.css:1`; `src/styles/control-assistance.css:1,4`; `src/scripts/demo/app.js:56–62`.

Source inspection, rating definitions, control mapping, proposed control design and multi-task implementation plans all reuse the same 620px dialog. Some have a sticky footer, some do not, and the sticky offsets depend on desktop/mobile padding. Open-dialog content replacements do not consistently set focus. These different task sizes need distinct but related layouts.

**Recommendation:** Keep short explanations in a compact dialog. Put source reading in a side drawer so the assessment remains visible. Use a wide editor for a complete proposed control or task plan, with a stable header, visible save state and an action footer. Preserve the current strong editor-to-source-and-back behavior.

**Acceptance:** Long plan editing needs only one vertical scroll region; the action never covers the final field; closing and returning restores the exact editing position; keyboard focus always has a meaningful destination.

### P2 — Repair the intermediate-width header and improve narrow-screen density

**Source evidence:** `src/styles/demo.css:12–13`; `src/styles/product-refresh.css:2,14`; `src/styles/ux-polish.css:45–50`; `src/styles/dashboard.css:7–8`; `src/scripts/demo/dashboard.js:69,71`.

The header only starts wrapping below 600px. Widths around 601–700px retain the logo, three primary navigation links, workspace disclosure, quarter and avatar in one row. The lead reviewer reproduced overflow at a measured CSS `innerWidth` of 640px: the document client width was 623px after the scrollbar and the document scroll width was 630px. The quarter wraps, the avatar is partially clipped and a page-level horizontal scrollbar is visible in `18-dashboard-actual-640.jpg`.

At a measured CSS width of 390px, the client width and scroll width were both 373px, so there was no page-level horizontal overflow. The labeled step selector works and content reflows. However, the global header, workspace disclosure, sync status, assessment context and step selector consume roughly the first 300px before the review content begins (`19-review-mobile-390.jpg`). This is a density problem rather than a reflow failure.

Capture note: `17-dashboard-640.jpg` was taken after a tool request for a 640px viewport, but existing browser zoom made the measured CSS width 711px. Use `18-dashboard-actual-640.jpg` for the confirmed 640px finding. Viewport claims here use the lead reviewer's measured CSS dimensions rather than screenshot pixel width or requested tool dimensions.

Below 900px the work/register tables intentionally retain widths of 820px and 790px. They scroll, but their wrappers are not named/focusable scroll regions, unlike the GRC comparison. The narrow-screen experience should make off-screen columns and keyboard scrolling discoverable.

**Recommendation:** Test 390, 640, 768, 1024 and 1440px, plus browser zoom. Collapse or wrap the header before its contents collide. For mobile work queues, prefer a concise item list with type, due date and state; keep a full table view available. If retaining horizontal tables, label the region and make its scroll behavior usable from the keyboard.

### P2 — Add motion that explains state changes

**Source evidence:** `src/styles/demo.css:5,9,14`; `src/styles/ux-polish.css:15–16,23`; app render and hashchange handlers.

Existing motion covers hover/press feedback, a disclosure chevron and toast entrance. Screens and AI panels appear through immediate markup replacement. There is no connecting motion between the insight, evidence and applied result.

**Recommendation:** Add short transitions, roughly 140–200ms, for panel replacement and drawer/dialog entry; use a quiet background highlight for the field changed by an accepted draft. Keep navigation and inputs immediately operable. Use actual pending/progress states only when an operation is pending; a local scripted demo does not need artificial thinking delays. Preserve reduced-motion behavior and avoid shifting entire dashboards around.

### P2 — Make save and recording state explicit in one place

**Source evidence:** `src/scripts/demo/app.js:26,39–53`; `src/scripts/demo/response-view.js:18–26`; `src/scripts/demo/control-assistance-view.js:56–88`.

Keystrokes are saved into session storage while the product also has explicit actions such as Create risk response, Save response changes and Add plan to response draft. These have different meanings, but users receive mostly transient feedback and explanatory paragraphs. Session-storage failure is silently ignored.

**Recommendation:** Show a quiet persistent state near the record header: Draft saved in this session, Draft not recorded, or Recorded version 2. Keep this language separate from GRC sync state. If draft persistence is unavailable, say so once next to the draft status instead of silently implying durability. This is a local demo improvement; it does not require implementing a production backend.

### P3 — Consolidate component rules before a broad polish pass

**Source evidence:** `src/index.html:10–24` loads 15 style sheets; `src/styles/premium.css` repeatedly overrides analysis/review/response rules; `src/styles/ux-polish.css` changes earlier breakpoints and controls.

The layered styles work, but repeated overrides make it easier for spacing, font sizes, modal actions and breakpoints to diverge. This is an implementation-maintenance risk rather than a user-facing defect by itself.

**Recommendation:** Define a small set of shared primitives: assessment header, panel, inline finding, disclosure, field, status, source drawer, editor modal and action bar. Consolidate their tokens and responsive rules while making the prioritized UX changes. Avoid a separate rewrite just to reduce file count.

## Suggested order

1. Fix persistent validation, focus and local update behavior.
2. Restructure assessment/analysis hierarchy and increase operational text readability.
3. Standardize source inspection and long editors; prove the end-to-end keyboard flow.
4. Verify the 640px header, narrow work queue and enlarged-text layouts.
5. Add restrained motion and consistent saved/recorded state.

## Evidence limits

The code-backed findings are based on active loaded modules, not legacy shells. Nine new screenshots were inspected for visual conclusions. The lead reviewer reproduced modal-error visibility, focus loss after Suggest controls and intermediate-width header overflow at a measured CSS width of 640px. At measured CSS width 390px, the inspected review screen had no page-level horizontal overflow. Keyboard access to horizontally scrolling dashboard tables was identified for targeted follow-up, not claimed tested. There was no screen-reader session, comprehensive contrast sweep or claim of full accessibility compliance.
