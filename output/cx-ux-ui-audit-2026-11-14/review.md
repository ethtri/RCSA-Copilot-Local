# RCSA demo — CX, UX and UI review

Reviewed November 14, 2026, against the running local app at `/src/`. This is an expert inspection, not a customer usability study. Product source files were not changed.

## Overall assessment

The demo is credible, visually coherent and unusually careful about evidence and human accountability. Its best moment is the comparison of two control procedures that may depend on the same contact record. That turns an abstract risk concept into something a buyer can understand immediately.

The experience is stronger as a narrated demonstration than as a first-time, independent workflow. Its main weakness is competition for attention: history, AI analysis, source exploration and decision fields often appear at similar levels of importance. Preserve the design direction and evidence depth; make the required decision and next step more prominent.

Customer experience: the scenario has a clear reason to act and a meaningful leadership outcome. The buyer must still assemble the value story across several screens. A brief introduction connecting changed evidence → owner decision → independent challenge → management decision would help. Keep the synthetic-data and scripted-AI explanation easy to find before a buyer interprets these interactions as live capabilities.

User experience: the main workflow completes successfully, including a review question, renewed owner attestation and reviewer conclusion. Decision neutrality and protection of existing writing need attention.

User interface: the green palette, restrained serif headings, source comparisons and consistent surface treatments establish a strong identity. Oversized contextual panels, small supporting text and dense modal forms reduce working efficiency.

## What to preserve

- The dated procedure change and explicit test limitation explain why a refresh matters (02).
- The side-by-side source comparison is the clearest demonstration of the product's value (08).
- Draft, confirmed, submitted and reviewed records are distinguished. Review completion leaves testing and management decisions open (12–16).
- AI output is connected to sources, with explicit human confirmation for consequential demo transitions (03, 08, 11–15).
- The response's Approach / Protection / Validation cards make an important distinction understandable (11).
- The report leads with a management question, decision owner, forum and target date (16).
- The sampled dialogs support Escape and restore focus to the launching control. The risk matrix has a descriptive accessible name. Mobile has a labelled assessment-step selector (07, 19 and observed keyboard checks).

## Prioritized findings

### 1. Require an explicit sufficiency decision — high priority, trust / UX

**Observed:** On the reviewer conclusion screen, “Is the response sufficient for this review?” already reads “Yes, for this review” before any choice is made (15). The independent assessment view correctly starts with “Choose your assessment view.”

**Impact:** The default introduces an acceptance bias into the very moment intended to demonstrate independent judgment. The reviewer still must provide the other conclusion, rationale and attestation; this is not an observed automatic approval.

**Recommendation:** Give sufficiency an unselected “Choose a conclusion” state. Require an intentional choice for both judgments. Keep the distinction between reply sufficiency and the assessment itself.

**Acceptance check:** A fresh owner reply cannot receive a recorded review conclusion until the reviewer explicitly chooses both judgments. Returning for clarification retains the entered rationale.

### 2. Preview AI reply changes and preserve existing writing — high priority, trust / UX

**Observed:** On the owner's reply screen, clicking “Draft a response” immediately replaced “Staff have been reminded of the callback procedure” with a longer prepared reply. There was no preview or visible undo. The same area offers “Use a shorter draft” (14 and observed interaction). In contrast, the risk-response drafting flow first shows a preview and asks the user to use it (10–11).

**Impact:** A user can lose their wording while exploring assistance. The inconsistency makes the consequences of similarly named AI actions harder to predict.

**Recommendation:** Reuse the preview pattern. Show the proposed text and offer Replace reply, Append to reply and Cancel, followed by Undo after insertion. Preserve the existing reply until the user chooses.

**Acceptance check:** Generating or dismissing a suggestion leaves the existing reply unchanged; insertion can be undone without losing previous wording.

### 3. Put the decision before the full history — high priority, task efficiency / UI

**Observed:** Both inherent and residual assessment place a large history chart and explanation before likelihood, impact and rationale. On the residual opening view, the score comparison and history consume the main column while the rating inputs and required response are below the visible area (04, 09). Mobile puts the risk selector and history ahead of the assessment too (19).

**Impact:** Someone doing the work must scroll past supporting context to reach the task. Buyers can see analytical depth before they see what action it enables.

**Recommendation:** Start with selected risk, current/draft score, required decision fields and next action. Condense history into a short “8 → 12; urgent route lacks testing” summary with expandable detail. Keep evidence available next to the fields.

**Acceptance check:** At a normal laptop size, the initial viewport includes at least the first decision field and the current requirement. On mobile, users can reach the decision without passing a full chart.

### 4. Expose completion across stages and risks — medium priority, orientation / CX

**Observed:** The five-stage header identifies the current stage, but its visible labels do not show which stages are complete or need renewed confirmation. There are three risks, additional discovery/analysis/response screens, and several separate confirmation actions (03–12). Review finally provides the consolidated three-risk picture (12).

**Impact:** A first-time user must remember which confirmations apply to which risk. The relationship between the five steps and optional investigation is harder to infer than the underlying workflow.

**Recommendation:** Add stage completion/attention indicators and a compact per-risk readiness summary. Label exploration as optional where appropriate. Keep Review's direct links to incomplete work. Explain that supporting risks are already confirmed in the prepared scenario.

**Acceptance check:** At any stage a user can identify the selected risk, what remains required, and the next destination without visiting Review solely to discover readiness.

### 5. Review existing controls before optional improvement — medium priority, hierarchy / UX

**Observed:** Controls opens with Add a control and a large Find and improve controls section. Current controls and the owner conclusion follow it. Generating suggestions expands the optional area further, moving the current-control decision lower (05–06). A sticky confirm action is available while that conclusion is farther down the page.

**Impact:** The page encourages expansion before the user has established what current protection supports. The most prominent action and the core confirmation do not belong to the same visible working area.

**Recommendation:** Lead with current controls, evidence gap and owner conclusion. Present suggestions as the next action to address that gap. Keep confirmation near a visible summary of the conclusion it records.

**Acceptance check:** A user can inspect the current control position and conclusion before entering suggestions, and can tell exactly what Confirm controls records.

### 6. Give the proposed-control editor more working room — medium priority, UI / effort

**Observed:** The proposed-control dialog is narrow relative to the desktop canvas and contains explanatory content plus twelve inputs/selects, including long design, information-source, exception and validation fields. Some single-line fields clip long prepared values (07). The sticky action remains available while much of the form is outside view.

**Impact:** Reviewing a substantive control design feels like working through a long form in a small window. Users must remember content while scrolling.

**Recommendation:** Use a wider editor or dedicated workspace, with sections for objective/design, operation/evidence and coverage judgment. Use multiline fields for sentence-length content. Keep a concise source summary and reveal longer source explanations on demand.

**Acceptance check:** The prepared values are readable without horizontal cursor navigation, and users can review the whole control in clearly named sections before adding it.

### 7. Make charts and supporting text readable at small widths — medium priority, UI / accessibility risk

**Observed:** Mobile dashboard and report content reflow without observed document-wide horizontal overflow in the sampled views. However, the history chart scales into a small block and its axis/point labels become visually tiny (19). Read-only DOM measurements in the narrow layout found chart text bounding heights around 5–7 CSS pixels, despite declared 11–12px fonts. Role/context metadata was 11px. The sampled report had document width 416 against inner width 433.

**Impact:** The layout fits, but the information is not equally usable. Small status/source text and low-emphasis secondary styling also warrant contrast verification; a contrast failure was not established here.

**Recommendation:** Replace the small chart with a compact quarter-by-quarter list/table or simplified trend at narrow widths. Set readable rendered label sizes, preserve score/state distinctions in text and audit secondary text contrast.

**Acceptance check:** Quarter, score and draft/confirmed status remain readable without magnification, including at 200% zoom. Verify contrast and target sizing with dedicated accessibility tooling.

### 8. Make the acting role unmistakable — medium priority, orientation / CX

**Observed:** The contextual role changes to Independent reviewer and initials change to JL; the footer continues to say Assessment owner: Alex Morgan (13–15). That footer is factually about the record owner, but it does not clarify who is currently acting. The mobile header hides the initials/period treatment.

**Impact:** During a fast demo, the audience can miss the switch between record ownership and the person making the current judgment.

**Recommendation:** Show a persistent “Viewing as Jordan Lee · Independent reviewer” label and a separate “Assessment owner: Alex Morgan” field. Keep role-changing tools in presenter controls, with clear confirmation of the newly active perspective.

**Acceptance check:** The current actor and record owner are distinguishable at desktop and mobile sizes without opening presenter controls.

### 9. Remove stale instructions after submission — low priority, copy / state polish

**Observed:** After submission, the owner view still includes “Check the draft summary and its evidence limits before confirming” and a collapsed “Before you send” disclosure, alongside “Already submitted” and a preserved version record.

**Impact:** Accurate submitted-state controls are undermined by instructions that still imply editable pre-submission work.

**Recommendation:** Replace these with “Submitted summary · version N” and state-appropriate inspection guidance. Retain an explicit owner-revision entry point.

**Acceptance check:** Submitted/reviewed views contain no instruction to confirm an unavailable draft or perform an initial send.

## Suggested order of work

First address explicit reviewer choices and safe AI insertion. Next improve assessment/control hierarchy and readiness cues. Then refine the control editor, mobile charts, role identification and state-specific copy. These changes should preserve the current visual identity and evidence story.

For the buyer walkthrough, bring the shared-source comparison forward, follow it with the owner decision and independent challenge, and finish at the management decision brief. Keep research, full history and extended control creation available as optional depth.

## Walkthrough and screenshot evidence

Every image below was captured and reopened from disk in this review run. Numbering follows the audit's interaction order; findings refer to these evidence numbers.

| Evidence | Step observed | General health |
| --- | --- | --- |
| 01 | Owner dashboard and refresh entry | Good; clear entry, dense secondary information |
| 02 | Changed procedure, near miss and test limitation | Strong; coherent reason to act |
| 03 | Connected event timeline and provisional match | Useful; several navigation layers |
| 04 | Inherent risk assessment | Needs hierarchy improvement |
| 05 | Current controls and owner conclusion | Needs decision prominence |
| 06 | AI control recommendations | Good options; expands task depth |
| 07 | Proposed-control editor; Escape return | Functional; cramped long form |
| 08 | Shared-source comparison and confirmation | Strongest evidence-to-judgment moment |
| 09 | Residual assessment and response requirement | Clear risk meaning; task sits low |
| 10 | Confirm without response routes to response creation | Good recovery; useful tolerance explanation |
| 11 | AI draft insertion and response review cards | Good explicit creation and separation |
| 12 | Owner review, attestation and submission | Good summary; attestation enforced |
| 13 | Reviewer context and sent challenge | Good handoff; actor could be clearer |
| 14 | Owner reply and AI coverage cues | Useful cues; AI replaces existing reply |
| 15 | Reviewer sufficiency and assessment conclusion | Functional; positive sufficiency default |
| 16 | Completed-review leadership report | Strong management framing |
| 17 | Narrow report | Reflows; long reading before decision detail |
| 18 | Narrow reviewer dashboard | Reflows; heatmap consumes substantial height |
| 19 | Narrow assessment and step selector | Navigation works; chart labels too small |

### 01 — Dashboard
![Owner dashboard](01-dashboard.jpg)

### 02 — Changes
![Changed evidence and scope](02-changes.jpg)

### 03 — Evidence analysis
![Event timeline and provisional connection](03-evidence-analysis.jpg)

### 04 — Inherent assessment
![History above decision fields](04-inherent.jpg)

### 05 — Current controls
![Controls workspace before suggestions](05-controls.jpg)

### 06 — Control suggestions
![Control recommendation options](06-control-suggestions.jpg)

### 07 — Proposed-control dialog
![Long proposed-control editor](07-control-dialog.jpg)

### 08 — Shared source
![Side-by-side procedure evidence](08-shared-source.jpg)

### 09 — Residual assessment
![Risk movement and history](09-residual.jpg)

### 10 — Required response
![Response entry and tolerance](10-response-required.jpg)

### 11 — Response review
![Approach, protection and validation](11-response-review.jpg)

### 12 — Owner review
![All-risk summary and submission](12-owner-review.jpg)

### 13 — Reviewer question
![Independent reviewer question](13-reviewer.jpg)

### 14 — Owner response
![Existing owner response before drafting](14-owner-response.jpg)

### 15 — Reviewer conclusion
![Preselected sufficiency answer](15-review-conclusion.jpg)

### 16 — Leadership report
![Reviewed assessment and management decision](16-leadership-report.jpg)

### 17 — Narrow report
![Report at narrow viewport](17-mobile-report.jpg)

### 18 — Narrow dashboard
![Reviewer dashboard at narrow viewport](18-mobile-dashboard.jpg)

### 19 — Narrow assessment
![Assessment at narrow viewport](19-mobile-assessment.jpg)

## Verification and limits

- Used a separate Chrome audit tab because the in-app browser was unavailable. The existing local server was reused. No live model, email, management approval or production record was involved.
- Completed the main unauthorized-wire workflow through owner submission, reviewer challenge, revised owner response, reviewer conclusion and leadership reporting. Other risks appeared in the register and review summary; their full edit paths were not separately completed.
- Confirm without the required risk response routed to the response screen. Send without owner attestation produced an instruction and did not submit. Submission succeeded after attestation. Reviewer conclusion required an assessment view, rationale and attestation in the completed path.
- Escape closed the proposed-control and rating-definition dialogs and restored focus to the launching control. This is a limited keyboard check, not an exhaustive keyboard or screen-reader audit.
- Narrow-view testing requested 390 × 844 through browser controls; the browser reported 433 × 938 CSS pixels in the captured narrow state. Treat these as observed narrow-layout checks, not exact-device certification. The temporary viewport override was reset afterward.
- Some first screenshot requests timed out; only successfully saved and reopened captures are included. Evidence 02 is a wider overview capture than the other desktop views, so do not compare apparent font scale across those images.
- No full accessibility conformance, measured color-contrast audit, zoom matrix, real touch-device test, backend behavior, production authorization, data persistence/recovery or real-user task timing was established. No performance or security assessment was performed.
- Product code and existing work were left unchanged. Deliverables are this review and the nineteen adjacent JPEGs.
