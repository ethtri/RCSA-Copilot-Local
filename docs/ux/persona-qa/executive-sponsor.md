# Executive sponsor persona QA

Reviewed November 14, 2026, independently as a simulated Chief Risk Officer preparing an executive risk committee demonstration. Commercially curious about AI, skeptical of unsupported claims.

**Verdict: Ready with fixes.** The desktop demo earns attention: it connects a process change to evidence applicability, a shared information dependency, a higher residual assessment and a concrete testing response. Its strongest AI moments help someone notice and answer a risk question. The executive report needs clearer scope and a concrete pending decision before it can stand on its own in a committee pack. No P1 credibility blocker was observed within the intended scripted-demo scope.

## Scores

| Dimension | Score / 5 | Reason |
|---|---:|---|
| Clarity | 4 | The sequence from change to response is understandable; the report leaves the single-risk scope and management ask implicit. |
| Credibility / rigor | 4 | Evidence scope, human confirmation, unchanged current risk and open testing are consistently visible. The ownership footer is inconsistent with the review record. |
| AI value | 4 | Comparing two procedure excerpts and detecting missing response coverage are useful work assistance. The final report narrative adds little beyond the existing headline. This score concerns the demonstrated workflow, not model capability. |
| Visuals | 4 | Calm forest/white palette, strong serif headings, native heatmap and relationship diagram give the desktop product a coherent identity. Narrow report overflow reduces polish. |
| Leadership-demo readiness | 3 | An 8–10 minute narrated story is plausible after the focused fixes below; a report circulated without its presenter would still prompt avoidable scope and decision questions. |

## What the executive can understand

- **Exposure and change:** The initial dashboard explicitly presents last confirmed positions: unauthorized wire 8 and two supporting risks at 6. Clicking the unauthorized-wire heatmap legend opened its residual assessment, with prior 8 and current assessment 12. After review, the dashboard showed the confirmed 12. The distinction is useful and does not silently treat a draft as confirmed.
- **Why it changed:** The AI briefing's basis showed the September 15 test and October 5 procedure change. I opened the standard-wire test: 25 standard-wire samples, no exceptions in that population, urgent route outside scope. This supported the visible limitation rather than implying a failed test or proven urgent-route protection.
- **Control dependency:** Controls showed two mapped controls converging on a possible customer-contact source. I opened the discovery and both procedure dialogs, compared their excerpts, and confirmed the relationship. The UI clearly said that recording the relationship does not change ratings.
- **Required response:** Residual risk showed Elevated 12 above tolerance. I reviewed the AI response draft, deliberately used it, and explicitly created the response. It included a testing action, owner, November 28 due date and closure evidence. Planned activity did not reduce the current rating.
- **Review:** Using the prepared submitted scene, I sent the suggested second-line challenge, switched to the owner, compared the weak reminder with the complete response, re-attested, then recorded a second-line conclusion. The assistant identified missing coverage; the reviewer still determined sufficiency. Completed review, open testing and pending management disposition stayed separate.
- **Leadership account:** The report provides prior/current movement, change bullets, management response and a source index. I traced its procedure-change claim back to the procedure dialog and confirmed the narrative. Its current two-sentence narrative is accurate but insufficient as the whole executive ask.

## Findings

### 1. P2 — The leadership report does not identify the risk being summarized

**Route / reproduction:** Complete review (or load the Review completed scene), then open Reports (`#/reports`). Compare it with Dashboard (`#/work`), which explicitly contains three risks. The report is titled “Wire transfers. A clear account.” Its single risk position is 16 / 8 / 12, but the report does not label that position “Unauthorized wire transfer” or state that it focuses on one of the three risks. It does not present the other two risk positions.

**Executive implication:** A committee member receiving this report independently could read 12 as the overall wire-transfer process assessment, rather than the unauthorized-wire risk. The distinction should not depend on remembering the preceding demo.

**Smallest fix:** Name the risk next to the risk position and in the opening narrative. Add a short scope line such as “Focus: unauthorized wire transfer; 1 of 3 risks in this assessment,” with a link to the complete register. A new portfolio report is unnecessary.

**Evidence:** [Report at 1440](../../../assets/screenshots/persona-qa/executive/15-report-1440.png), [completed dashboard with three risk positions](../../../assets/screenshots/persona-qa/executive/11-dashboard-complete-1600.png). Observed in the rendered UI and report text; no code inference.

### 2. P2 — “Management decision pending” is a status without an executive ask

**Route / reproduction:** In the completed report, inspect the status strip and Management response. The report gives the testing action, Payments Operations, November 28 and closure evidence. Management disposition says only “Decision pending.” It does not state what decision is requested, who should decide it, or when. The completed dashboard has a separate disposition row assigned to “Payments leadership,” but its date is a dash and its link leads to the risk response.

**Executive implication:** I understand what Operations must test, but cannot tell what this committee is expected to approve, decline or escalate while testing remains open. The presenter must supply the most important decision context orally. This is a presentation gap, not a request to implement real acceptance authority.

**Smallest fix:** Add a compact pending-decision block to the report with the requested disposition, responsible role/forum and target decision date. If these are intentionally undetermined, say that plainly and identify who must formulate the request. Keep testing closure and risk acceptance separate as they are today.

**Evidence:** [Completed report](../../../assets/screenshots/persona-qa/executive/15-report-1440.png), [dashboard disposition row](../../../assets/screenshots/persona-qa/executive/11-dashboard-complete-1600.png). Observed omission; proposed wording is a recommendation, not an established fixture fact.

### 3. P2 — The footer changes assessment ownership to the person viewing it

**Route / reproduction:** On `#/reports` in Second line perspective, the review record says Owner Alex Morgan / Reviewer Jordan Lee, while the footer says “Assessment ownership: Jordan Lee.” Switching the presentation perspective to First line changes the footer to Alex Morgan while the review record remains unchanged. The same Jordan footer appeared in second-line review and dashboard.

**Executive implication:** It blurs ownership and independent review precisely where the demo otherwise makes those responsibilities credible. A sponsor could reasonably ask whether review transferred accountability.

**Smallest fix:** Keep the assessment-owner footer tied to the assessment owner. If the footer intends to show the current perspective, label it “Viewing as” and show the actual owner separately.

**Evidence:** [Second-line report with conflicting owner labels](../../../assets/screenshots/persona-qa/executive/15-report-1440.png), [second-line review footer](../../../assets/screenshots/persona-qa/executive/09-second-line-review.png). Also verified by reading the rendered footer before and after changing perspective; no source-code inference.

### 4. P2 — The report's risk position overflows a narrow screen

**Route / reproduction:** Set the viewport to 390 × 844 and open `#/reports` after review. The document scroll width was 544 px against a 390 px viewport. The risk-position card and its “Current assessment / Elevated 12” extend beyond the visible right edge. Dashboard at the same width had document width 390 px and retained its chart, although its tables use local horizontal scrolling.

**Executive implication:** A sponsor opening the report on a phone initially sees the prior position while the current position is clipped. This is an awkward follow-up to an otherwise polished desktop demonstration.

**Smallest fix:** Make the report grid/card shrink to the viewport and stack or locally scroll the comparison table. Keep the prior/current labels visible without document-level horizontal scrolling.

**Evidence:** [390 px viewport showing clipping](../../../assets/screenshots/persona-qa/executive/14-report-narrow-viewport.png), [full narrow report showing extended width](../../../assets/screenshots/persona-qa/executive/13-report-narrow-390.png), [narrow dashboard comparison](../../../assets/screenshots/persona-qa/executive/12-dashboard-narrow-390.png). Browser measurements and screenshots agree; root CSS cause was not inspected.

## Strongest moments and presentation choices

The first desktop impression is credible and visually distinctive. The heatmap and dark AI briefing establish the risk story quickly, without a crowded analytics shell. The controls network makes a potential common dependency understandable in one glance. The side-by-side highlighted procedure language is the best “AI did useful work” moment because the audience can inspect the basis and qualify the interpretation. [Dashboard](../../../assets/screenshots/persona-qa/executive/01-dashboard-1440.png), [controls network](../../../assets/screenshots/persona-qa/executive/05-controls-1600.png), [source comparison](../../../assets/screenshots/persona-qa/executive/06-source-discovery-1600.png).

The second strong moment is improving the weak “staff reminded” response into population, amended-contact, independent-source and closure-evidence coverage. It demonstrates practical assistance while leaving sufficiency with a person. The response creation flow also avoids granting current risk reduction for a future plan. [Response draft](../../../assets/screenshots/persona-qa/executive/07-response-draft-1600.png).

For an 8–10 minute presentation, keep the path tightly focused: dashboard exception; test date/scope; shared-source comparison; residual movement; deliberate response creation; one challenge and improved response; completed report. Use the prepared submitted scene to move between owner work and reviewer work when necessary, and make the role change explicit. Optional library mapping, supporting risks and all six source dialogs are useful question-time depth. Demonstrating every editable control and reading every rationale would dilute the main story.

The report repeats its two-sentence headline under “A narrative you can stand behind.” This final AI moment feels weaker than discovery and response assistance. It could be simplified into a confirmation on the report headline, or enriched with the named risk, reason for movement, open action and specific pending decision. This is a presentation preference, not a correctness finding.

## Review method and limits

- Read `docs/ux/FEEDBACK_REFRESH.md` and `docs/operations/demo-runbook.md` before inspection. Treated this as a local synthetic, scripted frontend demonstration; did not demand a real AI service, backend, authentication, institutional evidence or external integrations.
- Used an isolated headless Chrome context through the repository's installed Playwright module. Desktop checks were at 1440 × 1000 and 1600 × 1000; narrow checks at 390 × 844. The user's IAB/shared browser was not used.
- Actually clicked the heatmap risk drill-down, report score drill-down, control/source discovery, source dialogs, response draft/create, challenge/owner response, review conclusion, report trace and narrative confirmation. The prior-score bar navigated to the residual assessment, which displays both prior and current positions; it did not open a historical source record directly.
- Used a prepared submitted scene for the coherent second-line portion after exploring the first-line controls and response. This was not a timed, uninterrupted rehearsal of every confirmation from initial state. The 8–10 minute judgement is a presentation assessment, not a measured duration.
- Screenshots were opened and visually inspected. Browser page errors collected during the main context were empty. Did not conduct a full accessibility audit, adversarial workflow validation, code review, exhaustive breakpoint matrix or production compliance review.
- Findings above are actual rendered observations or explicit omissions. Recommendations and presentation preferences are identified as such. Did not read other persona reports or coordinate findings before finishing this review. No application/shared-data edits or publishing were performed.
