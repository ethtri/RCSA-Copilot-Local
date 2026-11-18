# Independent banking-leader walkthrough

Reviewed November 15, 2026, as a detail-oriented Head of Operational Risk watching a banking RCSA demonstration. Browser observations used temporary local tabs and synthetic records. The user's existing tab and draft were not touched. Both review tabs were closed and the temporary viewport override was reset afterward.

## Coverage

Walked scope and AI-discovered risk review; all three existing inherent-risk workspaces; control recommendations, proposed control design and implementation/test planning; shared-source review; residual assessment; response and management-request boundaries; owner submission; independent reviewer question; owner reply; reviewer conclusion; reports; bank setup and connections. Also added the duplicate-release risk in a separate fresh tab and inspected the responsive experience at 390 × 844.

The full owner/reviewer cycle was completed for the unauthorized-wire scenario. The other two risks' information, insights, existing assessments and report inclusion were inspected; their preconfirmed fixture assessments were retained. This distinction matters for demo claims about who actually assessed the risks during the walkthrough.

## Findings delivered for repair

| Priority | Observed friction | Required behavior |
| --- | --- | --- |
| High | The inherent proposal said there was no previous assessment, while Q3 records contained inherent16. Suggested numeric dropdowns omitted the bank's rating labels. | Show the source-backed previous cycle and the bank's plain-English criteria. Never invent a previous rating for a new or bespoke risk. |
| High | Adding the recommended proposed callback improvement removed the otherwise useful residual-rating suggestion. | Retain evidence-backed advice when the only additions are recognized, unimplemented proposals. Give planned work no current-protection credit. Changed current controls still require owner judgment. |
| High | Adding an implementation plan opened the response workspace before control and residual confirmation. The carried-forward8 appeared confidently within threshold. | Label the rating as an unconfirmed draft and provide a direct return to the unfinished control review. Preparing a response must not imply completion or a risk decision. |
| High | Normal product controls let the current owner switch into the independent reviewer and back. | Restrict role staging to opt-in presenter tools. Normal product language should show the assigned reviewer and current status. |
| High | The AI suggested asking how the residual conclusion distinguished tested standard wires from urgent requests, but its suggested answer addressed only action evidence. | Recognize testing scope, residual judgment and missing evidence in the same question; draft an answer covering all three using the submitted version. |
| Medium | Review said three risks had been assessed after this walkthrough actively confirmed only the first; the other two came preconfirmed from the fixture. | Make carried-forward versus newly confirmed status explicit. Avoid implying every current-cycle decision occurred during the demo. |
| Medium | Reviewer's main page emphasized one risk before the decision applied to the whole three-risk version. | Clearly identify the version and full review scope, with access to every submitted risk. |
| Medium | Reply sufficiency defaulted to Yes. After sending the owner reply, persistent waiting/reply status was hard to find. | Require an explicit reviewer judgment and show a version-linked reply transcript/status. |
| Medium | After a control and plan were added, some AI next steps still invited the owner to compare the improvement as if no work existed. | Acknowledge the recorded proposal and focus the next step on implementation and targeted testing. |
| Medium | Main insight prose used normalized-rate percentages such as42.9% and185.7%, although the small counts were more useful. | Lead with event counts and payment volume; keep calculations and limitations in Why & sources. |
| Medium | Generic fraud research appeared for payment-detail and delayed-execution risks. | Filter related research for relevance, or explain its limited connection. Do not imply a live search. |
| Medium | The report summary initially described counts without the main risk movement, reason or next accountable step. | Explain the confirmed8→12 change, owner rationale, next action and outstanding management decision. |
| Medium | Connections displayed a missing GRC identifier as a prominent readiness failure after assessment review was complete. | Keep configurable integration mapping separate from RCSA completion; the demo need not perform syncing. |
| Low | Reports exposed ISO dates in several visible passages. | Use readable dates consistently. |

An added duplicate-release risk initially showed no prepared AI insight, despite the source-backed rating proposal being available. This was reproduced in the browser on the old cached module graph. The current source now passes independent regression checks for useful insights and suggested assessments in both stages; parent final verification should use its new cache revision.

## What worked well

The control-design review has plausible operational fields, distinct implementation and validation tasks, retained evidence and explicit owner application. The shared-source review makes a substantive banking point without treating two operators as proof of independence. Source drawers and visible heatmaps support the assessment without replacing judgment. Sending an assessment and completing independent review left the action and management decision open, which is the right boundary. The report includes all three risks and preserves the submitted version. The mobile layout was readable without horizontal overflow.

## Verification added

`node tools/verify-bank-leader-regressions.mjs` passes against the latest application source. It checks historical comparisons and labeled ratings; recognized proposed controls retaining3×4 advice without changing owner scores; stale input signatures after a control-design edit; unsupported implementation/removal cases; complete AI answers to its own reviewer question; unconfirmed response wording; the meaningful report narrative; and source-backed insights for the added duplicate-release risk with a bespoke-risk fallback.

A follow-up migration regression also passes: an older submitted session without signal records is migrated, the owner starts a revision and explicitly accepts only the new analysis explanation, then reconfirms and submits version2. The linked signal source is retained in the new snapshot, while version1 and its evidence remain byte-for-byte unchanged. An invalid multi-field application is checked first and leaves both judgments and evidence unchanged.

These model/render checks verify the parent agent's current fixes. Screenshots below show the observed walkthrough before the parent's final cache refresh and should not be used as evidence that every visible repair has already been rechecked in the browser.

## Browser evidence

- [Inherent-risk workspace](01-inherent.png)
- [Owner review](02-review.png)
- [Draft report](03-report.png)
- [Reviewed report, with open work retained](04-reviewed-report.png)
- [Added risk before cache refresh](05-added-risk.png)
- [Mobile assessment](06-phone.png)

No external systems were contacted or updated. The local synthetic owner/reviewer actions were confined to disposable review tabs.
