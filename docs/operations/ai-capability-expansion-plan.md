# Broader AI capability expansion plan

**Revised:** November 14, 2026  
**Status:** Phase 1 (AI-01–04) implemented and verified locally. Phases 2–4 remain planned. See the [implementation and QA record](../ux/ai-control-assistance-qa.md).  
**Basis:** [Revised V3 comparison](../../output/v3-review-2026-11-14/review.md) and the owner's request to give the older version's broader AI capabilities greater emphasis.  
**Relationship:** Extends the [workflow demo plan](workflow-demo-plan.md); existing completed functionality and verification retain their status.

## Product outcome

The [November 15 demo experience implementation plan](demo-experience-upgrade-plan.md) provides the integrated execution sequence for the next revision. It includes AI-05 through AI-08 alongside review realism, operational records, language, accessibility and visual polish. The completed AI-01 through AI-04 foundation remains in place; exposing and refining it is part of the new plan.

Make AI an active assessment assistant that discovers risks, recommends and designs controls, analyzes remaining gaps, drafts assessments and develops response plans. Preserve the current app's evidence traceability, owner decisions, independent second-line review and submission history.

The first priority is a connected control-design workflow: **recommend existing controls → propose an enhancement or new design → explain remaining gaps → generate implementation and validation work**. The current mapping forms and single prepared control are useful recording infrastructure, but do not yet demonstrate this breadth of assistance.

The older archived demo offered multiple control recommendations per original risk, gap analysis, scoring suggestions and strategy-specific actions. Most were scripted dictionaries or rules. This plan recovers those useful jobs and upgrades their evidence and follow-through; it does not claim the archive had general-purpose new-control generation.

## Capability coverage

| Capability | Current foundation | Planned assistance and concrete output |
| --- | --- | --- |
| Control recommendation | Relevant library ordering and manual mapping | Assemble risk-specific candidates, explain coverage and limits, compare alternatives and let the owner choose. |
| New-control design and enhancement | Proposed-control editor; one fixed independent-contact draft | Draft a gap-specific control or an amendment to an existing design, including operational details and the evidence needed to test it. |
| Gap and effectiveness analysis | Strong shared-source investigation and scoped evidence | Assess the selected set, draft preliminary design/operation conclusions and propose a remedy or evidence request for each material gap. |
| Risk discovery and scope | Curated external context and fixed risk records | Propose risk statements, compare taxonomy overlap, record add/extend/defer/dismiss decisions and carry a new risk through full assessment. |
| Rating and rationale assistance | Owner rating editor, history and additive rationale suggestion | Propose a supported L/I option and rationale, explain uncertainty, or identify evidence needed before a suggestion is possible. Check the owner's actual claims. |
| Response and action planning | Prepared strengthen-controls draft per risk and manual strategy choices | Compare feasible responses, recommend an approach with reasons and generate different implementation/validation tasks for the chosen approach. |
| Review and synthesis | Owner/second-line workflow, source panels and versions | Prepare role-specific review material and a portable brief from the resulting assessment, control designs and plans. |

Evidence checking strengthens every productive capability. It should not become a substitute for first-pass drafting, recommendations and plan generation.

## Phase 1 Control recommendations through a usable plan

**Priority:** First implementation increment.  
**Scope:** Existing assessment risks and mapping/revision infrastructure. Demonstrate at least two risks with different recommendations.

### Prepare a control approach

Use a contextual action such as **Suggest controls** or **Help design the control approach**. Prepare candidates based on the selected risk, cause, process route, mapped controls, source evidence and owner-selected objective. Keep the results in the current Controls workspace.

Present three kinds of recommendation, clearly distinguished:

1. **Use an existing control:** identify the library record, explain its relevance and inspect its documented population and period.
2. **Improve an existing control:** show current and proposed wording, the gap addressed and the operational change needed. Preserve the existing implemented definition until an explicit revision records the change; a proposal must not rewrite historical control evidence.
3. **Draft a new control:** produce an editable proposed definition when the available designs do not address the gap. The draft should include objective, accountable role, trigger/frequency, population, method, authoritative information source, exceptions/escalation, evidence retained and validation approach.

A recommendation must say what it leaves unresolved. A familiar control should sometimes be rejected or qualified because it covers the wrong route, consequence or information source. Recommendations may also conclude that no additional control is justified.

### Reassess the selected control set

After the owner changes a mapping or design, prepare findings for the resulting set rather than repeat the original briefing. Separate:

- An uncovered cause or population from a documentation gap.
- Proposed design coverage from implemented protection.
- Design adequacy from evidence of operation in a stated period and population.
- Shared inputs and failure points from genuinely complementary protection.
- Supporting evidence, contradictory evidence and a conclusion not established by available evidence.

For each material finding, provide an actionable next step: compare controls, draft an enhancement, request specified evidence or prepare a test brief. Preventive/detective balance and automation are contextual considerations; their presence alone does not prove adequacy, and their absence alone does not prove a defect.

Offer a preliminary control conclusion and an explanation of any proposed wording. Owners can edit or decline it. Checking their conclusion should identify a specific unsupported assertion and relevant excerpts, without turning a missing-field checklist into an AI analysis claim.

### Generate implementation and validation work

From the selected improvement, draft the operational measure, implementation steps, dependencies, proposed owners/dates and validation/closure evidence. Keep implementation and testing as distinct work. Use the current response editor to review and record the plan; expand its contract only where the selected design requires multiple linked tasks.

**Flagship example:** two checks use a recently amended contact record. Compare customer payment confirmation, an amendment to the verification process and a proposed independent verification control. Edit the proposed design, map it and ask what gaps remain. The assistant identifies unresolved urgent-route operating evidence and prepares implementation and targeted testing work. None of these drafts closes testing or lowers current confirmed risk.

### Phase 1 acceptance

- [x] At least two risk-specific candidate sets demonstrate different exposure and control mechanisms.
- [x] Existing-control recommendation, enhancement and new-control drafting are distinct outputs.
- [x] A new design includes operational details, source basis, assumptions and the identified gap; it is more than a renamed generic template.
- [x] The owner can compare, edit, use or dismiss a recommendation and inspect the recorded outcome.
- [x] Changing a mapping updates the relevant findings; a proposed design can address a design gap while an operating-evidence gap remains open.
- [x] A materially unsuitable candidate is explained; the assistant does not always recommend more controls.
- [x] A suggested control conclusion and at least one source-backed claim check are available within the supported demo cases.
- [x] The selected improvement produces editable implementation and validation work linked to its risk/control basis.
- [x] Existing owner/reviewer permissions, revision snapshots and renewed confirmations continue to work.

## Phase 2 Risk discovery with complete assessment follow-through

Build on the existing external-context panel. Prepare a risk statement with cause, event, consequence, relevance, sources and uncertainty. Compare it with the existing risk definitions before proposing a new record.

Support **extend existing scenario**, **add distinct risk**, **defer/observe**, and **dismiss with rationale**. Adding a risk should create an unconfirmed assessment with its own inherent/control/residual/response records, sources and review requirements. Demonstrate one prepared new risk as well as one overlapping threat mechanism that belongs under an existing risk.

Generalize the current flagship-specific model where needed. Requirements, risk selectors, source packs, counts, dashboards, rating suggestions, control recommendations, plans, versions and reports must recognize an added risk. Do not ship an Add button that creates an orphaned register row. Preserve the existing unauthorized-wire leadership story while clearly identifying the new risk's report coverage.

### Phase 2 acceptance

- [ ] Distinguish a new risk from a new cause/scenario of an existing risk.
- [ ] All four dispositions are durable and traceable to sources and owner rationale.
- [ ] A newly added risk reaches assessment, control recommendations, response, attestation, independent review and reporting.
- [ ] Suggestions do not arrive as accepted ratings or implemented controls.
- [ ] Dashboard/register totals, submission requirements and report coverage derive from the selected risk set.

## Phase 3 Assessment recommendations and response alternatives

### Draft the assessment and test its claims

Offer provisional inherent and residual likelihood/impact options with policy definitions, supporting facts, assumptions and contrary evidence. The owner can use, change or reject them. Suggest no rating change when evidence is insufficient; explain what information would help. Retain the current explicit confirmations and last-confirmed rating.

Do not restore the old CEI-to-residual formula. Inherent assistance considers exposure before control credit; residual assistance considers current implemented and evidenced protection. Proposed improvements can support a separately labelled target scenario. Rating suggestions must not be presented as measured probabilities, losses or calibrated confidence.

Extend claim checking to owner-written rating rationales and responses. Distinguish negation, disagreement and insufficient evidence. Preserve prior wording and show proposed changes before use. The reviewer retains its independent assessment and sufficiency decision.

### Compare responses and generate the chosen plan

Prepare at least two feasible approaches for a supported risk, with reasons, operational tradeoffs, remaining exposure and evidence requirements. For example, compare independently verified urgent processing with restricting the exception route. Explain why a superficially attractive alternative may not address identity verification.

Selecting an approach must produce a meaningfully different editable plan. Draft operational measures, implementation tasks, dependencies, accountable owners, proposed dates, validation scope and evidence required for closure. Expand from a single risk to a coherent cross-risk action summary where tasks overlap; keep each task's risk/control links inspectable.

For acceptance, prepare a decision request, conditions and review date for the appropriate management role/forum. Do not treat it as granted acceptance. Do not generate fixed dollar savings or expected risk reduction without a valid, declared basis.

### Phase 3 acceptance

- [ ] Provisional inherent/residual suggestions expose the applicable method, evidence, assumptions and human decision.
- [ ] At least one supported case yields insufficient-evidence guidance rather than an unwarranted numeric recommendation.
- [ ] Claim checking distinguishes an overbroad statement from a properly qualified statement.
- [ ] Two response choices generate materially different protection and action drafts, not the same plan with a different strategy label.
- [ ] A response reflects the selected or edited control approach; a changed design marks affected drafts for review instead of overwriting human edits.
- [ ] Implementation, testing, review completion, current risk and management disposition remain separate.

## Phase 4 Review synthesis and portable output

Reuse the current owner and second-line review. Prepare an assessment summary and focused challenge based on the selected risks, controls, evidence limitations and action plan, including supported new records. Preserve the reviewer's ability to disagree and return the assessment.

Produce a real downloadable brief from a selected preserved version. Include scope, risk statements, ratings/rationales, control designs and status, material gaps, sources, implementation/validation work, owner decisions, reviewer conclusion and pending management decisions. Include enough source context to keep it useful outside the app. Identify a draft export as a draft; do not silently replace a submitted version with current unsaved edits.

### Phase 4 acceptance

- [ ] Review preparation and synthesis reflect changed risk/control/response choices.
- [ ] A downloaded file contains the selected version and the actual resulting plan.
- [ ] Sources, dates, owners, task status and qualifications reconcile with that version.
- [ ] Unsupported or unimplemented options are not represented as accepted protection.

## Data and implementation plan

Keep the current native HTML/CSS/ES-module architecture. Author a bounded set of coherent local recommendation/analysis branches; no live model, external service, paid infrastructure or API setup is part of this plan. A future live-AI implementation is separate scope.

| Work area | Planned changes |
| --- | --- |
| Fixtures/data contract | Add control candidate sets, gap findings, enhanced/new designs, supported risk proposals, rating options and response/task variants with stable IDs, source references, assumptions and supported input conditions. |
| Control modules | Extend `controls.js`, `control-library.js` and `mappings.js` for recommendation selection, editable enhancements/new designs, recommendation provenance and set-aware findings. |
| Analysis and conclusions | Extend the current analysis workspace, risk-intelligence and assessment modules for preliminary conclusions, source-backed claim checks and proposed rating explanations. |
| Response planning | Extend `response-view.js`/`responses.js` so drafts depend on the selected control approach/strategy and preserve reviewed human edits. Store linked implementation and validation tasks where needed. |
| State and authority | Extend `model.js` and app dispatch for recommendation disposition, new-risk records, proposal state and downstream invalidation using existing owner-revision rules. |
| Review/reporting | Include added risks and generated plans in requirements, snapshots, history, dashboards and summaries; add version-specific output. |
| Experience/verification | Use the existing visual system and surfaces. Before visible UI work, follow the applicable frontend skill workflow. Update the runbook, data contract and targeted checks with browser evidence when implementing each phase. |

Scripted branch selection can depend on risk, mapped controls, route, selected objective and response choice. If an unsupported input combination has no prepared analysis, disclose that boundary rather than display unrelated findings. Do not present keyword mention checks as semantic evaluation of arbitrary text.

Record AI proposal identity/basis, relevant risk/control/source/version references and owner incorporation/disposition. Use draft revisions rather than silent overwrites. Proposed enhancements must not retroactively change the historical control design or its evidence. Follow existing confirmation and attestation actions instead of adding approval gates to ordinary exploration.

## Presentation and verification

Retain an 8–10 minute flagship route through the five assessment stages. It must demonstrate useful generation and a consequential choice: request controls, edit a proposed design, inspect remaining gaps, generate a plan and follow it through review. Add risk discovery and rating/response alternatives as available depth; rehearse a separate broader capability tour. Runtime limits on one presentation do not remove capabilities from the roadmap.

When implementing, verify the complete proposal → owner edit/use/dismiss → recorded state → review/report chain. Test at least two risk-specific control cases, mapping removal/replacement, an unsuitable suggestion, unresolved operating evidence, supported and unsupported combinations, a new risk, a response change, submitted-record revision and selected-version export. Test the contrast between a supported qualified claim and an unsupported overbroad claim; avoid tests that merely repeat fixture strings.

Capture rendered results and check keyboard/focus, responsive layouts and source access. Rehearse reset/reload and both owner/reviewer perspectives. Phases 2–4 remain planned until their own acceptance criteria and appropriate checks pass; existing base-demo checks do not certify this expansion.

## Backlog and sequencing

| Work item | Deliverable | Dependency | Status |
| --- | --- | --- | --- |
| AI-01 | Capability fixtures, contracts and recommendation provenance | Current app | Implemented locally |
| AI-02 | Risk-specific existing-control recommendations and candidate comparison | AI-01 | Implemented locally |
| AI-03 | Editable enhancement/new-control drafting and set-aware gap/effectiveness analysis | AI-02 | Implemented locally |
| AI-04 | Linked implementation and validation plan from the selected control approach | AI-03 | Implemented locally |
| AI-05 | Risk discovery dispositions, added-risk lifecycle and downstream generalization | AI-01; AI-02–04 for recommendations/plans on the added risk | Implemented and verified locally |
| AI-06 | Provisional rating assistance and deeper owner-claim checking | AI-03; AI-05 for added-risk coverage | Implemented and verified locally |
| AI-07 | Response alternatives and strategy/design-specific action plans | AI-04; AI-05 for cross-risk coverage | Implemented and verified locally |
| AI-08 | Updated review synthesis, version-specific download and full capability rehearsal | AI-05–07 | Implemented and verified locally |

The [implementation backlog](implementation-backlog.md) tracks these local work items. They are not GitHub issue numbers. Phase 1 completion is supported by the linked QA record; the remaining capabilities are implemented in the November 15 upgrade and covered by its verification ledger. No remote issue updates are claimed.
