# Bank-leader persona QA — November 14, 2026

**Historical first pass.** The eight findings below were subsequently fixed and independently rechecked. See the [current round-2 verdicts and closure record](round-2/README.md).

**Overall assessment: Ready with fixes.** Three fresh, independent simulated personas operated the rendered app in isolated Chrome sessions. Each reached this verdict independently. They found **eight distinct P2 material issues**, with no P1 credibility blocker observed in the paths they exercised. A narrated central walkthrough is credible; the issues below should be fixed before an unscripted leadership review or circulating the report independently.

These are agent-based persona assessments, not interviews with real bank executives or compliance certification. [Review protocol](review-protocol.md).

## Independent scorecards

Scores are subjective judgments out of 5; do not treat them as statistically measured user research or average them into a quality metric.

| Simulated persona | Clarity | Rigor | AI value | Visuals | Leadership readiness | Verdict |
| --- | ---: | ---: | ---: | ---: | ---: | --- |
| [Head of Payments Operations](first-line-leader.md) | 4 | 3 | 3 | 4 | 3 | Ready with fixes |
| [Head of Operational Risk](second-line-leader.md) | 4 | 4 | 3 | 4 | 4 | Ready with fixes |
| [CRO / executive sponsor](executive-sponsor.md) | 4 | 4 | 4 | 4 | 3 | Ready with fixes |

Each reviewer received the intended scope and its own role brief without the development conversation or the other reviewers' findings. The primary agent read the completed findings, inspected supporting screenshots and relevant source, and consolidated duplicates. Perspective/ownership was independently found by two reviewers and appears once below. Review actions affected isolated browser-session records only. Fingerprints of all 19 application/style/fixture files were unchanged by the review; [source manifest](source-fingerprints.json).

## Prioritized findings

All entries are **P2**, material issues within this demo's scope. Their order reflects recommended repair priority, not additional reviewer consensus. All were open at the end of this first pass; subsequent fixes and verification are recorded in round 2. This first pass did not implement fixes.

| ID | Finding and business consequence | Smallest recommended change | Evidence / origin |
| --- | --- | --- | --- |
| QA-01 | A newly mapped library control inherits affirmative design/test conclusions without assessing applicability to the new risk. Mapping a detail-accuracy check to unauthorized-wire risk says its design addresses this risk, despite the owner explicitly limiting coverage. | Mark a new relationship as requiring coverage/applicability assessment. Keep library evidence, with its actual test scope, separate from the new risk-specific conclusion. | [First-line finding 1](first-line-leader.md), [rendered mapping](../../../assets/screenshots/persona-qa/first-line/03-new-mapping-evidence-claim.png). |
| QA-02 | **Draft a complete response** replaces independently edited closure evidence along with the reply. Human requirements for approval, implementation and independent testing can be lost. | Draft into the reply only. Offer evidence changes separately with explicit application or comparison. | [First-line finding 2](first-line-leader.md), [before](../../../assets/screenshots/persona-qa/first-line/06-human-closure-before-draft.png), [after](../../../assets/screenshots/persona-qa/first-line/07-closure-overwritten-after-draft.png). |
| QA-03 | A reviewer's return-for-clarification rationale is absent from the owner's work screen and return-history event. After the final rationale is written, the record cannot reconstruct why the earlier version was insufficient. | Retain the exact return rationale in the event and show it with the original question in the owner's response view. | [Second-line finding 1](second-line-leader.md), [owner after return](../../../assets/screenshots/persona-qa/second-line/05-owner-after-return.png), [history](../../../assets/screenshots/persona-qa/second-line/06-return-history.png). |
| QA-04 | The AI checklist says all four topics are **Addressed** even when an edited question's rating justification and interim limits remain unanswered. The UI implies broader assessment than its fixed scenario checks provide. | Use scoped wording such as Suggested response coverage / Mentioned in draft; rename the complete-response action and leave custom-question sufficiency explicitly for human review. | [Second-line finding 2](second-line-leader.md), [custom question and checklist](../../../assets/screenshots/persona-qa/second-line/07-scripted-coverage.png). |
| QA-05 | The second-line footer labels Jordan Lee as the assessment owner, while the review record correctly distinguishes Alex Morgan as owner and Jordan as reviewer. | Keep assessment ownership fixed, or label the changing person Viewing as. | [Second-line finding 3](second-line-leader.md), [executive finding 3](executive-sponsor.md), [conflicting labels](../../../assets/screenshots/persona-qa/executive/15-report-1440.png). |
| QA-06 | The report is titled Wire transfers but presents the unnamed unauthorized-wire risk's 16/8/12 position. A reader could mistake it for the whole process's aggregate rating. | Name the risk and state Focus: 1 of 3 risks, with access to the register. | [Executive finding 1](executive-sponsor.md), [report](../../../assets/screenshots/persona-qa/executive/15-report-1440.png). |
| QA-07 | Management decision pending has no concrete decision question, decision owner/forum or target date. The action is clear; the executive ask depends on narration. | Add a concise decision brief with the requested disposition, accountable role/forum and date, or explicitly identify who must formulate the request. No real approval workflow is needed. | [Executive finding 2](executive-sponsor.md), [report](../../../assets/screenshots/persona-qa/executive/15-report-1440.png), [dashboard task](../../../assets/screenshots/persona-qa/executive/11-dashboard-complete-1600.png). |
| QA-08 | At 390 px, the report's document width is 544 px and its current-risk position is clipped. | Allow the report grid/card to shrink; stack labels or contain table scrolling locally. Add Reports to the responsive regression matrix. | [Executive finding 4](executive-sponsor.md), [narrow viewport](../../../assets/screenshots/persona-qa/executive/14-report-narrow-viewport.png). |

## What the reviews support

All three found the visual direction coherent and suitable for leadership. The strongest AI moments are the source comparison/shared-dependency discovery and converting a vague reminder into test scope and completion-evidence requirements. The main story makes the September standard-route test limitation clear, keeps inherent and residual judgments separate, requires deliberate response creation, and preserves human authority over sufficiency and acceptance. Proposed controls remain unimplemented; planning and review completion do not reduce the current risk or close testing.

The first-line reviewer completed mapping edits, library mapping, manual proposal/replacement, removal/remapping, qualification, response creation, submission and renewed owner attestation. The second-line reviewer additionally returned an insufficient reply, completed a later conclusion, inspected versions and checked acceptance requests through submission. The executive reviewer traced claims to sources and inspected desktop and narrow report layouts. Exact routes, steps, screenshots and limits are in the individual reports.

## Preferences, not defects

- Keep the main demonstration to dashboard exception → source/test scope → dependency → residual movement/response → one challenge/reply → report. Use optional mapping and supporting-risk detail for questions.
- The final AI narrative duplicates the report headline and is weaker than the earlier assistance. Simplifying it or making it more decision-specific would improve the ending.
- Moving control assistance higher and showing compact inherent/control/residual context in review could reduce scrolling.
- Bank-specific probability/loss calibration would matter in a real rollout; it is not a requirement for this synthetic scenario.

## Recommended next pass

Address QA-01 through QA-05 first to protect the evidence, human-control and accountability story. Then make the report self-contained and responsive (QA-06 through QA-08). Re-run the existing regression checks and the exact persona reproductions against the revised build. The existing automated checks passed before this review, but did not cover all the semantics and report paths identified here.

Application code, fixtures and the user's browser were unchanged during this QA. Reports and screenshot evidence are local. No GitHub issues, commits or external publication were created by this pass.
