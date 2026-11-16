# Deeper AI analysis and recommendations

Implemented November 15, 2026. App graph `20261115.17`.

## What changed

The assessment now connects three months of sample bank records to an explicit recommendation and an editable assessment proposal. August, September and October use consistent event definitions and payment denominators. Recorded attempts, near misses, principal losses, recoveries and service credits remain distinct.

- Unauthorized-payment attempts: 6, 8, 12 against 9,500, 10,000 and 10,500 completed payments. The September–October attempt count increases 50%, payment volume increases 5%, and attempts per 1,000 payments increase 42.9%. October includes two changed-contact attempts. Requested amounts describe exposure; recorded payment loss remains zero.
- Payment-detail exceptions: 3, 4, 7. The prior $84,000 recall and its two-business-day delay remain consistent with PD-019. October includes three late-amendment exceptions, including PD-027.
- Late settlements: 1, 1, 3. October service credits total $420, including QT-011's $180. The recovered November outage is outside the complete-month October comparison.

Each risk has two findings before and after controls. Findings explain the implication and suggested next step. A visible suggested assessment connects the evidence to the proposed score; matching scores are explicitly described as an explanation update. Why & sources contains the monthly calculation table, interpretation, source scope and limitations. The UI retains the user's requested ordering below the assessment fields.

## Control options that fit the bank

Bank context is a collapsed, editable set of working assumptions: current versus separate verified contact source, manual versus configurable case workflow, and shared versus separate verification staffing. Changing assumptions updates recommendation ordering and reasons; it does not apply controls or modify judgments. An explicit option selection is retained. Control review explains requirements, ownership and testing. A context disclosure stays open during edits.

## New evidence and approval

Risk after controls offers **Review new test results**. UT-12 is an early November 12 review of five completed urgent payments, received November 14. It finds two missing verification-source traces, five recorded approvals and no unauthorized release or loss in the sample. It does not establish independent verification and does not replace the broader November 28 test. WI-07 stays open.

Viewing the record does nothing to the assessment. **Add test to assessment** explicitly links it, refreshes the AI analysis and flags conclusions for review while preserving scores and wording. The updated test is reflected in control coverage and newly prepared plans as well as risk insights. Proposed ratings become stale on evidence change and require refresh before use. The owner can apply individual scores or explanations; supporting records are linked when applying the proposal. Confirmation remains separate.

The receipt uses its own `signalTestReceived` flag, independent of the older SO-19 service clarification. Submitted contexts preserve the receipt flag, sources, source metrics and bank working assumptions. Versioned source links open the preserved evidence. Default-method numerical recommendations are hidden/reworded when the bank changes rating definitions; the unsupported prepared score cannot be applied.

## Verification and design fidelity

All 31 `tools/verify-*.mjs` scripts and syntax checks across demo modules pass. Checks cover source/event arithmetic, six analysis contexts, malformed and missing records, declining trends, selected-field approval, stale suggestions, custom policies, new-test gating, generated control plans and frozen submissions.

Browser verification used an isolated temporary tab, which was closed. Tested trend calculations, both other risks, risk-after-controls proposal review, explicit test receipt, score preservation, refreshing a stale proposal, and applying only the likelihood explanation. The score stayed 8 and impact wording stayed unchanged. In Controls, changing all three working assumptions changed the first recommended option without changing the two mapped controls; coverage acknowledged two missing traces and the outstanding broader test.

Desktop checked at 1183 x 917. Phone checked at 390 x 844; document/client widths both 375px, with insights below rating fields. Original user tab reloaded with its draft preserved, selected unauthorized risk and 4/4 inherent fields; final default widths both 522px. The temporary viewport was reset.

Visual comparison used view_image on the established assessment concept and current browser captures. The forest palette, serif page heading, risk rail, heatmap, native fields, typography and source drawer were retained. Intentional approved changes: richer AI content below fields, explicit recommendation/assessment connection, calculation table in details, bank-fit disclosures and an incoming-evidence review. Cards have readable spacing, 44px actions and no phone overflow. The bank-context disclosure remains collapsed by default; detailed prerequisites and calculations are secondary.

Evidence: [assessment](../../output/ai-analysis-upgrade-2026-11-15/inherent.png), [new evidence](../../output/ai-analysis-upgrade-2026-11-15/new-evidence.png), [trend drawer](../../output/ai-analysis-upgrade-2026-11-15/trend-drawer.png), [bank fit](../../output/ai-analysis-upgrade-2026-11-15/control-fit.png), [phone](../../output/ai-analysis-upgrade-2026-11-15/mobile.png), [checks](../../output/ai-analysis-upgrade-2026-11-15/checks.txt).

## Production boundary

This remains a local demo with fictional bank records and prepared recommendations. It makes no live model, research or external-system call. A production implementation would ingest authorized event/KRI/test registers, calculate indicators, generate typed source-linked proposals under the bank's criteria, and require the same explicit user approvals. No confidence percentages, peer loss benchmarks or automatic risk-reduction arithmetic were added.
