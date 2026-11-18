# Fresh V3 comparison source

Fetched through the connected GitHub API on November 15, 2026 from `ethtri/RCSA-Copilot-Demo-Rebuild-V3`, live-verified `master` commit `47e662e212655baca08332907d4a109f733a7a8d`.

- `wizard.html`: preserved older portal wizard, original blob `8aa82fe29f1ab43095c356938212deeb255e7bab`.
- `dashboard.html`: preserved older first-line dashboard, original blob `a5da581eec6f4385f947d103e6df9a756399a0f1`.
- `home.html`: preserved older home page, original blob `818fef87b68677f9cf63418c37f365774257e675`.
- `rcsa-styles.css`: preserved stylesheet, original blob `745c8ac749ec28ead26a678a819ca440c2936429`.
- `~/rcsa-styles.css`: identical stylesheet copied to resolve the wizard's original relative portal-style href when served locally. No markup or behavior changed.

Serve from the existing repository HTTP server and navigate directly to these files. The original absolute portal links still target `/scrDashboard_1LoD`, `/wizAssessment`, etc.; those are not remapped. Bootstrap CSS, icons and JavaScript load from jsDelivr. This is an archived local replay, not a recreation of the historical hosted Power Pages environment.
