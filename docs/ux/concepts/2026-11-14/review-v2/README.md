# RCSA complete visual review set

**Status: Reference only. Not an accepted visual implementation specification.**

On November 14, 2026, the owner judged these concepts directionally acceptable but below the expected standard of modern UX/CX and visual polish. Use them to understand the flow, content, and human decision boundaries. Their layout, typography, components, palette, and information density are not locked for implementation.

This set covers the assessment stages, second-line review, challenge response, leadership reporting, and representative responsive layouts. Application implementation has not started. Earlier concept images are preserved as history.

## Walkthrough order

| Screen | Concept | Scene |
| --- | --- | --- |
| First-line My work | [Dashboard](first-line-dashboard.png) | Initial refresh; prior approved wire risk Moderate 8; three Moderate processes. |
| What changed | [Change briefing](what-changed.png) | Owner considers the procedure change, near miss, and test scope. |
| Inherent risk | [Inherent assessment](assessment-workspace.png) | Owner confirms likelihood 4 and impact 4, High 16. |
| Control evidence | [Control assessment](control-evidence.png) | Standard-route testing does not establish operation of the urgent route. |
| Shared dependency | [Dependency discovery](shared-dependency.png) | Two checks share a contact record; owner validates the interpretation. |
| Residual risk and response | [Residual assessment](residual-response.png) | Owner confirms likelihood 3 and impact 4, Elevated 12, and plans targeted testing. |
| Review and handoff | [Owner attestation](first-line-handoff.png) | Version 1 submitted with qualifications and an open action. |
| Second-line My work | [Reviewer dashboard](second-line-dashboard.png) | One assessment awaiting review, two reviewed, no challenge yet. |
| Second-line review | [Review workspace](second-line-review.png) | Reviewer inspects the first-line conclusion and prepares a question. |
| Challenge response | [Response and revision](challenge-response.png) | Owner supplies a substantive response and renews attestation for version 2. |
| Review conclusion | [Reviewer sign-off](review-conclusion.png) | Reviewer judges the revised response and explicitly completes review while testing remains open. |
| Leadership reporting | [Report](leadership-report.png) | Assessment reviewed; current risk Elevated; testing open; management decision pending. |
| Narrow assessment | [Mobile assessment](assessment-mobile.png) | Single-column form and accessible rating-guide access. |
| Tablet review | [Tablet evidence panel](review-tablet.png) | Persistent, dismissible evidence panel at tablet scale. |

## Shared content and interaction specification

- The three primary destinations are My work, Assessments, and Reports. Dashboards select My work and have no assessment stepper. Reports selects Reports.
- Assessment views select Assessments and use the same five underlined stage tabs: What changed, Inherent risk, Controls, Residual risk & response, Review.
- First-line context is Payments Operations · First line. Second-line context is Operational Risk · Second line. Wire transfers is the assessment title; Q4 2026 refresh · Payments Operations is its subtitle.
- Owner Alex Morgan confirms the assessment and revisions; reviewer Jordan Lee sends challenges and records the separate review conclusion.
- White content surfaces, cool pale-grey navigation, ink text, restrained teal actions, and semantic amber remain the shared direction. Use consistent control typography and a single icon family when the design system is extracted.
- The five-point likelihood labels are Rare, Unlikely, Possible, Likely, Almost certain. Impact labels are Minor, Moderate, Significant, Major, Severe. Matrices use numeric axes and accessible rating definitions.
- Illustrative score bands are Low 1–4, Moderate 5–9, Elevated 10–15, High 16–25. A neutral matrix with a selected-cell marker avoids ambiguous decorative heat shading.
- Evidence limits remain visible. AI suggestions require a human decision. Planned actions never enter the current residual assessment or imply completed mitigation.
- On narrow screens, the risk form stacks, the sidebar collapses, and rating definitions move to an accessible persistent sheet. Tablet evidence panels remain dismissible and retain context.

## Fixed synthetic chronology

| Record | Date |
| --- | --- |
| Standard-route control test | September 15, 2026 |
| Revised urgent-route procedure and control descriptions | October 5, 2026 |
| Intercepted fraud near miss | October 20, 2026 |
| Assessment and review demonstration | November 14, 2026 |
| Refresh due date | November 19, 2026 |
| Targeted testing action due | November 28, 2026 |

Supporting process records are Payment details and Cutoff management, each Moderate 6. The initial dashboard uses the last approved wire score of Moderate 8. Submitted and reviewed scenes use the owner's refreshed Elevated 12. These are different snapshots of one story.

## Review status

The visual design work remains open under issue #2. Develop a stronger design for a representative assessment/control-discovery state before expanding it across the application. The next review must demonstrate modern product craft, clearer task hierarchy, thoughtful progressive disclosure, refined typography, and purposeful AI assistance. The existing concepts establish workflow and content references, not accepted composition or styling. The shared content specification preserves chronology, statuses, and role boundaries.

Minor raster differences in icon geometry, tab widths, and context-bar wording remain between independently generated screens. The extracted design system must use one shared shell and the exact labels above; these variations are not separate design directions.
