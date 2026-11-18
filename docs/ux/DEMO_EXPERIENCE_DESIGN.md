# RCSA demo experience design system

References selected by the implementation lead on November 15, 2026: [assessment-reference.png](concepts/2026-11-15/assessment-reference.png), [controls-reference.png](concepts/2026-11-15/controls-reference.png) and [report-reference.png](concepts/2026-11-15/report-reference.png). Each reference was opened at native resolution before implementation. They govern the compact green visual family; actual assessment facts, source titles and rating lenses govern content.

## Screen structure

- A white, approximately 68px app header with RCSA, three primary destinations, workspace disclosure and the current role.
- A compact assessment context row, then five steps. Normal desktop task content starts near 230px from the top, rather than behind a long introductory area.
- One white assessment workspace. Its left rail selects a risk; its central area contains the owner draft; a pale green rail contains a reviewable AI proposal. A source drawer opens at the right without navigating away from the draft.
- Large editorial introductory cards are replaced by functional headers and work surfaces. The single serif page title keeps the existing identity. Operational copy and controls use the UI sans serif.
- On narrow screens, the risk rail and step controls become labeled, stacked selectors. Evidence and long editors fill the available width. The work queue becomes a readable item list with the full register retained.

## Tokens

| Token | Value | Purpose |
| --- | --- | --- |
| Canvas | `#f5f7f8` | Cool pale gray application background |
| Surface | `#ffffff` | Forms, tables, editors and source drawer |
| Primary text | `#15221e` | Work content and headings |
| Secondary text | `#53645b` | Dates, states and supporting content |
| Forest | `#064d36` | Selected navigation, primary actions and links |
| Forest hover | `#043c2a` | Action hover |
| AI surface | `#eef4ec` | Suggested changes, kept distinct from the owner draft |
| Border | `#d9e2dc` | Panel, table and field boundaries |
| Error | `#9a382b` | Inline errors, invalid fields |
| Error surface | `#fff3f0` | Persistent validation summary |
| Radius | `6px`, `8px` | Controls; work panels and editors |
| Spacing | `4, 8, 12, 16, 20, 24, 32px` | Shared component rhythm |
| Control height | `44px` | Normal interactive controls |
| Panel motion | `160ms` | Local appearance and changed-field feedback |
| Drawer motion | `200ms` | Enter/exit from the right |

## Typography

Segoe UI / system sans serif for navigation, labels, controls, work records and normal content. Georgia / Times New Roman for the page title and selected finding headings, matching the reference and existing product identity.

- Main title: 32px / 1.2, regular serif. Reduce to 28px on narrow screens.
- Work section: 20–24px / 1.3; task labels and risk names use sans serif.
- Body and normal controls: 14–16px / 1.5–1.7.
- Supporting metadata: 12–13px / 1.5. Avoid the former 9–10px operational text.
- Field labels: 13–14px, medium weight. Long inputs show enough content to review; rationale editors show at least five lines.

## Components and states

**Assessment rail:** one risk selector; an explicit state such as Changed evidence, Needs assessment or Confirmed. New risks have no invented prior position.

**AI proposal:** source-linked finding, suggested fields, uncertainty, Apply / Edit / Keep current. Confirmed data, AI suggestion and the editable owner draft remain distinguishable. Applying a proposal never confirms a rating.

**Control options:** visible by default with existing, improve and new options. Current and proposed controls are counted separately. Complete mapping tables, design details and methodology are secondary disclosures.

**Field:** persistent label, visible focus, linked help, and field-specific validation. Invalid fields use `aria-invalid="true"` plus a persistent `.field-error`; `.form-errors` summarizes errors inside the active modal/editor. Success toasts never serve as the sole validation surface.

**Source drawer:** one scroll region, descriptive heading, close control, source title/date/scope/excerpt. Returning to the editor preserves values, cursor and scroll. A source excerpt is evidence rather than a replacement business record.

**Long editor:** wider than a definition dialog; stable header/actions; one scroll region; footer does not cover the final input. The exact draft/record consequence appears beside the action.

**Work queue:** readable rows on desktop, labeled stacked items on narrow screens. Retained scroll regions are named and keyboard-focusable. Statuses are conveyed in text as well as color.

**Motion:** short panel and drawer transitions; brief feedback on an applied change. Controls remain usable immediately. Reduced motion removes movement without removing state information. No fabricated AI thinking delay.

## Content rules

Use plain action labels: Review change, Use suggested rationale, Keep current, Send question, Return for changes, Reason for your decision and Confirm summary. Keep material limits visible; place methodology under Why, Sources, Details and History. Formal RCSA terms may appear in definitions and report metadata. Source quotes remain faithful.

The generated reference contains illustrative source names and a before/after rating comparison that do not represent the fixture's actual evidence. Implementation preserves the repository's real synthetic source titles, numbers and separate before-controls/after-controls lenses. These are intentional content corrections, not visual reinterpretations.

## Verification

Compare the reference and fresh browser captures at the same state and dimensions using `view_image`. Inspect header density, first work position, typography, risk rail, proposal anatomy, field sizing, source drawer and action footer. Record measured CSS width, since browser zoom can differ from requested viewport settings. Check 390, 640, 768, 1024 and 1440px widths, normal laptop height, enlarged text and 200% zoom. Functional checks cover focus preservation, modal errors, native fields, evidence return and all primary/alternate actions.

## Spacing follow-up, November 15

Refresh and discovery cards use 24px padding/gutters, 12px from heading to explanation, and at least 20px before actions. Actions align at the bottom of adjacent cards; cards stack with full-width actions on phones. Proposal comparisons use three labeled values (stacked on phones), and selectable fields have 44px targets. The [rendered UX/CX review](../../output/spacing-polish-2026-11-15/review.md) records the fixes, measured widths and before/after evidence.

## Permanent visual components

The [standard product visual implementation](standard-visuals-implementation-2026-11-15.md) extends this system with canonical risk-band ink/fill/border tokens, separate work-status tones, approved icons, native grouped heatmap selection, recorded-rating comparisons, readable relationship maps and shared report/progress/screen-state components. `ui.js::BADGE_CSS` is shared unchanged by the app and standalone report template. The scope excludes bespoke AI-output graphics.
