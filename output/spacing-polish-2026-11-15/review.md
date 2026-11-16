# UX/CX spacing and finish review

**Date:** November 15, 2026. **Result:** fixes implemented and browser-checked. Stylesheet revision `20261115.8`.

The owner's marked refresh card had zero space between its heading and paragraph, and zero space between the paragraph and actions. This was a shared component spacing omission after the global typography reset, not a lack of outer card padding. The original upgrade review missed this rendered state; its earlier sign-off should not be read as certifying every component's finish.

The pass inspected the prepared refresh, rating form, Controls, control editor, owner review, report and dashboard in the running app. It also opened the rating-proposal and explanation-check dialogs. Existing green identity and interaction patterns guide the corrections; the supplied controls reference provides the desired enterprise quality bar rather than permission to invent its illustrative data.

| Before | After |
| --- | --- |
| Refresh/discovery headings touched their paragraphs; actions immediately followed prose | Shared 12px heading/body gap and minimum 20px body/action gap, using the documented spacing scale |
| Adjacent cards used independent height and action positions; card bottom margins accumulated with the next section | Stretched columns, equal card heights, bottom-aligned actions, consistent 24px card padding/gutter and no duplicate bottom margin |
| Long card headings/prose wrapped without deliberate line treatment | Balanced heading wraps and pretty body wraps, with a 65ch prose cap |
| Phone buttons could wrap at unrelated widths | Full-width stacked actions and 20px card padding below 600px |
| Empty refresh output lacked the normal content wrapper | Empty state shares the same card anatomy |
| Prior, draft and AI ratings were stacked as three undifferentiated paragraphs | Labeled three-column comparison, separated from the form; a single column on phones |
| Proposal checkboxes were a crowded native inline row | Two-column labeled selection group, green selected state and 44px hit areas; one column on phones; native keyboard behavior retained |
| Explanation-check findings inherited inconsistent label/heading/paragraph spacing | Scoped result groups with 20px separation, 8px label/body gaps, normalized heading margins and 12px before source links |
| Owner review descriptions sat directly against risk titles and headline values | Explicit 8px description gaps |
| Report narrative spanned the full wide panel | 75ch reading width |
| Existing design context was only in the UX docs | Captured that established context in `.agents/context/PRODUCT.md` and `DESIGN.md` for consistent future reviews; existing design document remains the source of truth |

## Verification

The actual cards measured **12px** between heading and body, and **20px minimum** between body and actions. Both desktop card actions aligned. At width 1024, the primary card has additional breathing room to align with the taller secondary card; this is deliberate.

Measured CSS widths: **390, 768, 1024, 1183 and 1440**. Document scroll width equaled client width at each checked size. The first rapid 768px resize observation still returned 1440 and was discarded; a separate settled observation measured 768/753/753 (viewport/client/scroll). The phone proposal dialog measured 338px client/scroll width with four 44px checkbox targets. Viewport override was reset afterward.

Space toggled the focused native checkbox from checked to unchecked. Escape closed the proposal and returned focus to Review suggested update. No assessment proposal was applied during this review. The final app view logged no application console errors.

All 16 existing verification scripts passed: [full results](checks.txt). The changed JavaScript module parses as an ES module. This is a focused visual/interaction pass, not a formal accessibility certification or a claim of testing every state on physical devices.

## Rendered evidence

- [Before cards](changes-before.png) and [after cards](changes-after.png).
- [Phone cards](changes-mobile.png) and [tablet cards](changes-tablet.png).
- [Desktop proposal](proposal-after.png) and [phone proposal](proposal-mobile.png).
- [Explanation check](evidence-check-after.png).
- [Review before](review-before.png) and [after](review-after.png).
- [Report before](report-before.png) and [after](report-after.png).
- Controls, rating form, editor and dashboard baseline captures in this directory record the other inspected surfaces.

Screenshot outputs can lag immediate viewport/navigation changes. Captures were inspected, and misleading intermediate card/proposal frames were replaced with settled captures. The final source hash list is in [revision.json](revision.json). The user's existing demo tab remains on Changes, without resetting or recording business decisions.
