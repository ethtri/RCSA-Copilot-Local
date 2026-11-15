# Control assistance contract

Phase 1 uses `assets/data/control-assistance.json`, loaded as `data.assistance` alongside workflow, intelligence, research and context fixtures. No model or service dependency is introduced.

## Recommendations

Each current risk has a case containing exposure, design/operation gaps, baseline/known control IDs, source references, prepared claim examples, an unsuitable candidate and three recommendation kinds: `existing`, `enhance` and `new`. Candidate IDs are stable and scoped to a risk. Existing/enhancement candidates identify the relevant library record; proposed definitions include objective, owner, design, frequency, population, authoritative information source, exceptions, evidence retained and validation approach.

Candidate plans contain protection, action title/owner/due/evidence and separate implementation/validation task arrays. Implementation tasks contain `title`, `owner` and `due`; validation tasks also require `evidence`. Dates use ISO calendar dates within the synthetic presentation horizon. Prepared source IDs resolve to the existing source register.

## Owner state and provenance

`state.controlAssistance` stores decisions, active plans, archived plans, per-risk presentation state and draft editors. Decisions retain actor, risk, candidate/kind, source IDs, owner rationale, used/dismissed disposition, mapped control ID and the basis/version context. Exploration does not change ratings or establish effectiveness.

New and enhanced control definitions are stored in `customControls` as Proposed. Their `assistance` metadata identifies candidate, risk, kind, objective and source IDs. Enhancements use `enhancementOf` and retain the original library definition/mapping. An owner can revise the proposed definition without changing its ID or earlier submission snapshots. Existing-control use records or updates the risk relationship and its owner applicability judgment.

Drafts are kept per candidate and bound to the actual mapped definition when present. Read-only inspection loads recorded owner wording rather than a fixture template. Using a proposal invalidates relevant control/residual confirmations and existing response review using the ordinary mapping rules.

## Plan lifecycle

`controlSetSignature` covers mapped definitions, applicability, coverage rationale, owner control conclusion and the receipt-of-new-evidence context. An active plan is marked `needsReview` when its basis changes. Stale plans cannot be applied, and active stale plans block submission. Regeneration creates a preview; it does not silently overwrite an owner-edited plan. Response field edits synchronize into the saved plan and same-risk editable draft while preserving tasks.

Using a plan fills a proposed strengthen-controls response and linked action. It does not create/submit the risk response, implement a control or lower confirmed risk. The owner reviews and records the response through the existing action. Explicit detachment archives the prior plan and tasks, removes the current link and retains the response for owner review. All decision/plan/archive records are copied into immutable submission snapshots and exposed in review/report/version detail.

## Analysis boundaries

Coverage analysis is recomputed for known mapped designs. Removing a design removes its proposed coverage. Unrecognized mappings disclose the unsupported scope, rather than claiming exhaustive analysis. Proposed designs never receive operating credit. No mappings recorded is not proof that no organizational controls exist.

Claim checks support authored scope/independence examples and narrowly defined overclaims, with negation treated conservatively. Unrecognized wording returns unknown and source-review guidance. The app does not present keyword checks as general semantic analysis or reviewer sufficiency.

Verification: `node tools/verify-control-assistance.mjs` and `node tools/verify-control-assistance-workflow.mjs`, plus the [browser/visual record](../ux/ai-control-assistance-qa.md).
