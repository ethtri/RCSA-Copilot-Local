# Independent premium-product and buyer-experience review

Reviewed November 14, 2026. **Verdict: close with targeted fixes.**

The product has a credible banking foundation and a distinctive, calm visual language. I would use it for an expert-led conversation today, but give it one focused product-polish pass before relying on it as a flagship conversion experience. Its strongest capabilities are present; too much of their value is expressed as additional reading and form completion. This is an expert assessment of perceived buyer value, not measured conversion performance.

The recommendation is to sharpen the existing experience, not build live AI, add mandatory screens, invent portfolio counts or fabricate savings. Static sample data is appropriate for this purpose.

## What already differentiates

- The shared-dependency screen is the best sales moment: two actual excerpts, highlighted common information and an explicit human judgment. The buyer can understand the insight quickly and inspect its basis. Preserve this design pattern.
- Full inherent/control/residual assessment, qualified conclusions and separate review/remediation/acceptance states give the product domain credibility.
- Immutable submissions, exact human wording and source-backed new-evidence comparison are a strong trust story.
- Forest green, cool paper backgrounds, restrained semantic colour and serif/sans contrast feel serious and more distinctive than a generic GRC dashboard.
- The dashboard now has a clear flagship launch. The small, honestly scoped register is preferable to fabricated bank-wide metrics.

## Ranked findings

### 1. High: make the AI's completed work the visual centre of the story

**Evidence:** [02 change brief](../../../assets/screenshots/premium-buyer-review/02-change-brief.png), [03 event](../../../assets/screenshots/premium-buyer-review/03-event-investigation.png), [04 claims](../../../assets/screenshots/premium-buyer-review/04-claim-analysis.png), [20 risk analysis](../../../assets/screenshots/premium-buyer-review/20-risk-analysis-workspace.png). Routes `/assessment/changes`, `/assessment/research`, `/assessment/analysis`.

At 1440×900, the investigation entry on What changed starts around y=965. The buyer first sees a conventional change brief. Opening the investigation produces another large generic heading followed by substantial prose. The substantive analysis is good, but the first screenful does not make the analytical work immediately legible.

There are also two competing mental models: **Explore risk analysis → Overview / Signals / Sources** and **Show the full event / Examine the assessment → The full event / The assessment / Research / Response options / New evidence**. They share evidence and repeat conclusions, but do not explain their relationship or provide a consistent path between them. This feels like accumulated features rather than one product intelligence layer.

**Why a buyer cares:** they should quickly see work their teams otherwise perform manually and want that capability, without a presenter explaining how several analysis areas fit together.

**Fix — Medium:** use one contextual analysis entry and a consistent detail shell. Lead with the actual finding, such as **“Both checks reference the amended contact record.”** Pair it with a compact source/evidence visual: **4 related records · 1 proposed event · 1 link to validate**. Make a source-linked chronology or evidence chain visible, with rigorous narrative behind expansion. Keep the distinction between inherent and residual lenses explicit. Place this finding in the first screenful of the change briefing. The existing shared-dependency screen is the best model for how quickly an insight can be understood.

### 2. High: reduce form and scroll gravity after the AI has prepared the answer

**Evidence:** [08 controls](../../../assets/screenshots/premium-buyer-review/08-control-mapping.png), [12 response editor](../../../assets/screenshots/premium-buyer-review/12-response-editor.png), [21 immediately after using draft](../../../assets/screenshots/premium-buyer-review/21-after-draft-use.png), [11 draft dialog](../../../assets/screenshots/premium-buyer-review/11-response-draft-dialog.png). Routes `/assessment/controls` and `/assessment/response`, first-line draft.

The control page is about 2,410px tall; the filled response page is about 2,763px at the tested desktop viewport. The response duplicates the rationale and measure between editor and AI assistant, repeats ownership/date fields for legitimate but visually undifferentiated purposes, and puts its commit action far down the page. After using the AI draft, the viewport can land mid-editor around the protective-measure field, with the response heading/context offscreen. The draft modal requires internal scrolling to reach its Use action at this viewport.

**Why a buyer cares:** the product promises less gathering and preparation work; showing a long wall of fields immediately after AI use weakens the sense of relief and completion.

**Fix — Medium:** default to a compact prepared response review: **Approach / Protection / Validation**, each displaying its owner, date and status as readable values. Let the owner expand a specific section to edit, while retaining every existing field and authority boundary. Use a stable save/confirm area and a sticky modal footer. After Use, show a short “Draft added—review these sections” state in a predictable position. Apply similar progressive disclosure to control evidence; keep the owner conclusion and confirmation together.

### 3. High: give second line a visibly distinct prepared review workspace

**Evidence:** [14 second-line dashboard](../../../assets/screenshots/premium-buyer-review/14-second-dashboard.png), [15 review](../../../assets/screenshots/premium-buyer-review/15-second-review.png), [17 independent conclusion](../../../assets/screenshots/premium-buyer-review/17-review-conclusion.png). `/work` and `/assessment/review`, submitted/response-received second-line scenes.

The second-line dashboard largely repeats the first-line heatmap and the same “September test predates…” briefing. The review screen starts with a conclusion and a question editor; the deeper investigation and the relevant review cue sit below the main panel. The important independent-assessment choice exists later, but the role's distinctive analytical value is not immediately visible.

**Why a buyer cares:** operational-risk leaders need to recognise their own job: prioritise the material concern, understand what the owner has concluded, examine contradictory evidence, and challenge efficiently. A relabelled dashboard does not establish that the product understands that role.

**Fix — Medium:** use the existing single assessment to show a focused review brief in the first screenful: **Owner conclusion / Evidence to inspect / Point to resolve / Prepared challenge**. A compact before/after strip should appear when a reply or new evidence arrives. Keep the editable challenge and independent view beside the evidence. The second-line dashboard should lead with this submission's unresolved judgment and next review action, using its real sample scope rather than invented enterprise totals.

### 4. Medium: remove visible construction seams and inconsistent craftsmanship

**Evidence:** [05 research](../../../assets/screenshots/premium-buyer-review/05-research-pack.png), [06 options](../../../assets/screenshots/premium-buyer-review/06-options.png), [08 controls](../../../assets/screenshots/premium-buyer-review/08-control-mapping.png), [15 review](../../../assets/screenshots/premium-buyer-review/15-second-review.png).

Research and option links expose internal keys such as `ri-details-issue`, `ri-cutoff-nearmiss` and `customer-confirmation-test`. The research introduction says “authored service clarification” and “No live institutional or industry search was performed.” The owner control conclusion loses the surrounding card's internal gutter and sits flush against its edge. Review attribution and action spacing are noticeably tighter than the rest of the system. The report mixes a raw ISO protection date with formatted dates elsewhere.

**Why a buyer cares:** these details make an otherwise refined screen feel assembled for a demonstration. They are especially conspicuous when selling meticulousness and traceability.

**Fix — Small:** resolve every source ID to its human title, put construction/sample disclosures in Presentation controls, and show an honest product-facing research scope such as **“Records reviewed: assessment evidence, issue records and control tests; public references are curated.”** Preserve uncertainty and source limits. Align the conclusion with the card's existing gutter, normalise spacing/date presentation, and check modal action placement. Do not imply live connections that are absent.

### 5. Medium: make the executive finish a decision brief, with detail beneath it

**Evidence:** [18 leadership report](../../../assets/screenshots/premium-buyer-review/18-leadership-report.png), `/reports`, completed second-line scene.

The report correctly separates elevated risk, completed review, open testing and a pending management decision. However, it is about 2,816px tall. The management question and accountable forum appear below the first viewport, after a trajectory and a second bar comparison of the same risk positions. The narrative is then repeated near the bottom.

**Why a buyer cares:** the commercial close should demonstrate a bank leader receiving an immediately usable account of what needs their attention. The decision currently comes after the chart tour.

**Fix — Medium:** put **Decision needed / Current exposure / Proposed protection / Owner and target date / Remaining evidence** at the top, with the pending state unmistakable. Retain one compact prior/current visual. Move the expanded rationale, source index, additional comparison and narrative confirmation into supporting detail. No real export or new approval functionality is necessary to create a board-quality finish.

### 6. Medium: turn new evidence into a precise, believable change moment

**Evidence:** [13 owner handoff](../../../assets/screenshots/premium-buyer-review/13-owner-handoff.png), [15 review](../../../assets/screenshots/premium-buyer-review/15-second-review.png), [16 comparison](../../../assets/screenshots/premium-buyer-review/16-new-evidence.png). Submitted `/assessment/review` and investigation New evidence.

A banking user sees **“Request the service-owner clarification”** with a **“Receive service clarification”** button, which reads like a scene trigger inside the product. The comparison preserves the baseline well, but shows two paragraphs without highlighting the actual added facts. “Where it matters” lists downstream areas without directly locating the affected assertion.

**Why a buyer cares:** this should be the memorable proof that the product maintains a connected assessment as evidence changes. The current mechanism is valuable; its payoff is understated.

**Fix — Small to Medium:** let presentation controls trigger the arrival, then display a product notification **“Service owner replied—review what changed.”** Highlight the two new facts: the shared record is confirmed and the separate directory excludes urgent payments. Mark exact changed phrases and link affected control/rationale passages. Preserve the explicit owner revision and old-version baseline; do not silently apply anything.

## Top three priorities before the next buyer rehearsal

1. Put the signature AI finding above the fold and make the two analysis destinations feel like one coherent product layer.
2. Compress Controls and Response into prepared review sections with optional editing/detail and stable primary actions.
3. Make second-line review feel purpose-built, with the owner conclusion, counter-evidence, proposed challenge and reply/new-evidence differences together.

Then finish the small copy/gutter/date/source-label fixes and move the leadership decision to the top of reporting. These changes can reuse the current components and data.

## Recommended buyer walkthrough

1. **0:00–0:45, first-line dashboard:** launch the wire-transfer refresh; frame the changed process and the work already assembled.
2. **0:45–2:15, connected event and dependency:** show the chronology, provisional join, shared contact source and exact excerpts. State the evidence gap in one sentence; open one source to prove traceability.
3. **2:15–3:45, human assessment and response:** confirm the owner's qualified control/residual conclusion and inspect the prepared protection/validation plan. Avoid typing through every field.
4. **3:45–5:30, second line:** open its review brief, inspect the strongest counter-evidence and edit one specific challenge.
5. **5:30–7:15, new evidence and owner revision:** show the service-owner reply, the exact added facts and source-backed version difference; make one deliberate owner edit and preserve the prior version.
6. **7:15–8:30, independent conclusion and executive brief:** second line records its own judgment; finish with the outstanding management question, current risk and open actions.

Treat these as suggested narration allocations, not a measured rehearsal. Keep Research and the outage comparison as optional responses to buyer questions. The buyer should remember the linked insight, easier challenge, and defensible decision record rather than the number of features visited.

## Capture record and evidence limits

Fresh isolated installed Chrome at 1440×900; mobile spot check at 390×844. All browser contexts closed. No user tab/session or application file was changed. Screenshots were saved and visually inspected in this audit run. Prepared scenes were used for later workflow states; this was not a repeat of every end-to-end validation/attestation test. No page errors were observed. Screenshot heights and counts are in `assets/screenshots/premium-buyer-review/manifest.json`; geometry spot checks are in `geometry.json`.

| Step | Surface / state | Accepted screenshot | Audit note |
| --- | --- | --- | --- |
| 1 | First-line Dashboard, start | [01](../../../assets/screenshots/premium-buyer-review/01-first-dashboard.png) | Clear launch and coherent visual language; signature payoff could lead more directly. |
| 2 | What changed | [02](../../../assets/screenshots/premium-buyer-review/02-change-brief.png) | Good comparison; investigation entry below first viewport. |
| 3 | Full event investigation | [03](../../../assets/screenshots/premium-buyer-review/03-event-investigation.png) | Genuine connected work, expressed mostly through long reading. |
| 4 | Claim analysis | [04](../../../assets/screenshots/premium-buyer-review/04-claim-analysis.png) | Strong supporting/counter-evidence; source lineage is prose. |
| 5 | Research | [05](../../../assets/screenshots/premium-buyer-review/05-research-pack.png) | Raw IDs and construction copy break product immersion. |
| 6 | Response options | [06](../../../assets/screenshots/premium-buyer-review/06-options.png) | Useful bounded comparison; improve source labels and next-step continuity. |
| 7 | Inherent assessment | [07](../../../assets/screenshots/premium-buyer-review/07-inherent.png) | Clear before-controls discipline; AI is optional detail. |
| 8 | Controls | [08](../../../assets/screenshots/premium-buyer-review/08-control-mapping.png) | Useful relationship visual; long page and gutter seam. |
| 9 | Shared dependency | [09](../../../assets/screenshots/premium-buyer-review/09-shared-dependency.png) | Best current conversion moment: evidence and judgment together. |
| 10 | Residual assessment | [10](../../../assets/screenshots/premium-buyer-review/10-residual.png) | Honest trajectory; response entry below main assessment. |
| 11 | Response AI draft modal | [11](../../../assets/screenshots/premium-buyer-review/11-response-draft-dialog.png) | Draft is specific; commit action needs internal scrolling. |
| 12 | Filled response | [12](../../../assets/screenshots/premium-buyer-review/12-response-editor.png) | Correct distinction between protection/testing, excessive form gravity. |
| 13 | Submitted owner handoff | [13](../../../assets/screenshots/premium-buyer-review/13-owner-handoff.png) | Strong recorded handoff; stacked appended analysis/update panels. |
| 14 | Second-line Dashboard | [14](../../../assets/screenshots/premium-buyer-review/14-second-dashboard.png) | Review queue works; hero repeats first-line briefing. |
| 15 | Submitted second-line review | [15](../../../assets/screenshots/premium-buyer-review/15-second-review.png) | Independent question editing exists; deep analysis is below the panel. |
| 16 | New evidence, second line | [16](../../../assets/screenshots/premium-buyer-review/16-new-evidence.png) | Preserved baseline; needs explicit changed-fact emphasis. |
| 17 | Independent review conclusion | [17](../../../assets/screenshots/premium-buyer-review/17-review-conclusion.png) | Both judgments explicit and human-owned. |
| 18 | Leadership report, reviewed | [18](../../../assets/screenshots/premium-buyer-review/18-leadership-report.png) | Decision credibility strong; decision is too far down. |
| 19 | Mobile Dashboard | [19](../../../assets/screenshots/premium-buyer-review/19-mobile-dashboard.png) | Clear launch, narrow layout coherent; tables rely on horizontal discovery. |
| 20 | Per-risk analysis | [20](../../../assets/screenshots/premium-buyer-review/20-risk-analysis-workspace.png) | A second analysis vocabulary and navigation model competes with investigation. |
| 21 | Immediately after Use draft | [21](../../../assets/screenshots/premium-buyer-review/21-after-draft-use.png) | View lands mid-editor; orient user after prepared work is added. |

Accessibility spot risks: tertiary source/test labels can be around 10px, which is hard to read in a screen-shared buyer meeting; controls and tables need deliberate keyboard/mobile review after any compression; stable modal actions should remain reachable at zoom. These observations are not a WCAG audit. The review does not establish real integration readiness, model quality, production security, customer adoption or conversion lift. Sample-only implementation was treated as an intentional constraint throughout.
