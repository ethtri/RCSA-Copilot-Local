# Assessment information and useful insights

Implemented locally on November 15, 2026. Source graph: `20261115.16`.

## Decisions

- Keep a first step for scope and risk inventory. Rename it **Scope & changes** and explain its purpose: check the process, boundaries and missing risks before rating. Show the assessment scope immediately. Replace the premature residual-rating proposal with the October 5 process change and linked procedure/near miss.
- Add native expandable **Risk details** on before-controls, after-controls and controls views. Include ID, type, owner, scope, causes, event, harm, mapped controls and evidence. Display owner-entered fields faithfully and preserve submitted versions. Unknown system names remain unknown.
- Add structured control details outside the conclusion fold so they remain available after confirmation. Include objective, type, frequency, population, design, information used, retention, exceptions, operating evidence, test scope/date and mapped risks. Proposed controls receive no tested-effectiveness credit.
- Put AI insights below the assessment fields. Use one shared sparkle icon for insights, control options and missing-risk suggestions; the label always says AI as well.
- Replace generic prompts with twelve source-backed findings: two for each of three risks before and after controls. Before controls focuses on exposure and customer harm. After controls focuses on tested populations, gaps, dependencies and open issues. Every finding has linked sources, interpretation and a specific limitation in its drawer. Figures come from the existing synthetic bank records; no annual trend, peer benchmark or model confidence is invented.

## V3 comparison

The RCSA expert inspected GitHub V3 at commit `47e662e212655baca08332907d4a109f733a7a8d`. Its useful pattern is quantified factors plus an explanation of why they matter. Unsupported confidence and peer claims were not copied. See [V3 reasoning implementation](https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V3/blob/47e662e212655baca08332907d4a109f733a7a8d/legacy-reference/powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/content-pages/wizAssessment.en-US.webpage.copy.html#L7258).

## Verification

All 27 `tools/verify-*.mjs` scripts pass, plus syntax checks across demo modules. New checks cover field ordering, scope purpose, risk/control details, entered fields, frozen submissions, all six insight contexts, changed facts, missing records, changed mappings and read-only behavior. Independent agent review found and corrected singular cause/event/harm field mapping before final verification.

Browser verification covered the original preview with its draft preserved: desktop at 1183 x 917, scope page, expanded risk and control details, all three inherent-risk insight sets, source drawer and Back to insight, phone at 390 x 844 and final default viewport. Phone document/client widths both 375px; restored default widths both 522px. No horizontal overflow. Rating fields remain 4/4 on the original unauthorized-risk draft. Temporary viewport was reset. Full-page phone capture was unavailable; native viewport capture verified the insight spacing instead.

## Visual fidelity ledger

Compared the established assessment reference and current captures using view_image. Intentional deviations follow the user's latest comments; no new concept artwork was needed for this component pass.

| Area | Reference and current result | Action |
| --- | --- | --- |
| Typography | Serif page title, system UI fields, readable line height | Preserved; insight copy 14px with 1.65 line height |
| Layout | Risk rail, assessment center, rating rail | Preserved; moved insights below fields as requested |
| Color | Forest actions, white sheets, pale-green AI area | Preserved shared palette |
| Details | Reference evidence access; requested richer records | Added collapsed structured details and source links |
| Icon | Consistent thin SVG language | Added reusable AI sparkle with text label |
| Spacing | Comfortable field and panel spacing | Added 16px finding rows and 44px source actions |
| Responsive | Readable single column | Verified phone flow and no overflow |

Captures: [assessment](../../output/assessment-information-2026-11-15/assessment.png), [risk details](../../output/assessment-information-2026-11-15/risk-details.png), [control details](../../output/assessment-information-2026-11-15/control-details.png), [scope](../../output/assessment-information-2026-11-15/scope.png), [phone insights](../../output/assessment-information-2026-11-15/mobile-insights.png). [Check results](../../output/assessment-information-2026-11-15/checks.txt).

The demo still uses prepared suggestions and synthetic bank records. Viewing findings does not apply any ratings, control changes, responses or tasks. Bank-specific systems and missing definitions are not invented.
