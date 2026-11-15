# Copy authenticity implementation

Implemented the follow-up copy review on November 14, 2026. The broader layout recommendations from the original UX audit remain separate work.

- Replaced presentation narration in history sources, response setup, option comparison, research and reviewer framing with operational wording. Historical sample provenance remains available in the workspace disclosure.
- Added a persistent Demo workspace disclosure with synthetic-data, simulated-AI and session-storage information, verified visually at a narrow viewport.
- Research includes the service-owner clarification only after receipt. Submitted summaries use submitted-state guidance.
- Review history and dashboard question entries no longer assume the original question topic.
- Blank initial reply; removed the fixed poor reply and misleading shorter-draft action from the editor.
- Reply preview offers replace, append and cancel. Undo restores the prior reply; subsequent manual editing clears undo. Draft insertion remains owner-only and limited to an open question.
- Original scope question uses the existing bounded suggestion. The specific action-ownership question reads owner, title and due date from the current action. Other questions have no automatic suggestion or unrelated coverage checklist. These remain simulated features, not general semantic generation.
- The evidence checker now promises limited scope checks and manual evidence review. Unknown wording is explicitly unsupported; it is not labelled validated. Source and control-effectiveness limitations remain visible.

Nine verification scripts passed: copy-authenticity, demo, control-assistance, control-assistance-workflow, product-refinements, owner-revision, risk-intelligence, ux-navigation and persona-fixes. Re-ran copy-authenticity, demo and ux-navigation after final changes.

Browser verification: submitted scene → ownership question → owner reply; current owner populated; blank initial reply; question-specific coverage; cancel preserves a manually entered note; append preserves that note; undo restores it; replace inserts only the suggestion. Captured ownership-reply.jpg. Narrow header and open disclosure visually inspected in mobile-disclosure.jpg; viewport override reset afterward. All browser changes were isolated synthetic session state.

No deployment, external communication, live model integration or production data change was performed. Existing unrelated workspace changes were preserved.
