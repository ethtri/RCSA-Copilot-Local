# Plain-language and disclosure cleanup

Implemented the two browser comments on November 14, 2026.

## Disclosure layout

The Industry context disclosure mixed the generic disclosure's top padding, outside marker and left margin with a separate card treatment. Its neighboring scope disclosure used a different layout.

Both now belong to one assessment-background group. They use matching padding, aligned custom chevrons, consistent heading and description styles, full-row click targets and an inset keyboard-focus outline. Native details/summary behavior is preserved. Expanded content has a consistent divider and reading inset. On mobile, content uses a single column and smaller padding. Reduced-motion preferences disable the chevron transition.

## Language review and changes

Reviewed the active demo modules and their authored scenario data: dashboard, assessment steps, history, control mappings, control suggestions and plans, research, risk analysis, responses, reviewer decisions, reports, GRC exchange and pilot guide. More than 350 authored copy instances were replaced in the first two passes; subsequent passes rewrote the six risk summaries, related-record interpretations and control recommendations.

Examples:

| Before | After |
| --- | --- |
| A new route changes the opportunity for impersonation. | Urgent requests may make customer impersonation harder to spot. |
| Exposure comes before control credit. | Assess the risk before considering controls. |
| A connected reading of the records. | Events, changes and issues |
| Current, evidenced protection | Controls supported by evidence |
| Rebase on current source | Use latest source version |
| Synchronized to reference | Reference updated |
| Agree with the qualified assessment | Agree with the assessment and its stated limits |

The writing rules applied were: name the person, payment, check or record; say what happened and what remains unknown; use ordinary verbs; replace abstract noun chains with complete sentences; make actions describe their result. Retained needed banking terms such as inherent risk, residual risk, control, likelihood and tolerance, with explanations in the rating guide and workflow. JSON details remain available for technical inspection.

Facts, ratings, sources, dates, IDs, role permissions and workflow guards are retained. Evidence excerpts from external publications and their URLs remain source material; this copy review did not independently re-verify those publications. The simulated nature of the workspace remains disclosed. Existing saved owner text and submitted versions are not silently rewritten.

## Verification

All eleven verification scripts pass: buyer readiness, demo, copy authenticity, control assistance, control-assistance workflow, product refinements, owner revision, risk intelligence, risk matrix, UX navigation and persona fixes. Four existing test files were updated where assertions expected wording that was deliberately replaced. Assertions about missing urgent-request testing, unsupported full-text evaluation and residual-risk context remain explicit. JavaScript syntax checks and `git diff --check` pass.

Browser checks used the existing in-app browser. Confirmed both disclosures open and close, including Enter-key activation; checked collapsed and expanded desktop layouts and expanded scope/industry sections at 390 × 844. The mobile document width was 375px within a 390px viewport, with no horizontal overflow. Desktop capture used the browser's default 1280 × 720 viewport. Temporary viewport overrides were reset.

Found and fixed stale JSON caching during browser verification. Data fetches now carry the same release revision as the module and stylesheet URLs (`20261114.22`). A fresh assessment was checked against the revised description, rationales and risk-summary heading. Saved user work continues to load unchanged.

Screenshots are in [the evidence folder](../../output/plain-language-refresh-2026-11-14/). The changes preserve the existing green palette, serif headings, reading hierarchy and responsive layout. No new visual direction or production integration is introduced.
