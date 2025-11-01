# > _Legacy context:_ Archived rebuild plan for retired Power Pages portals. Consult `docs/operations/delivery-plan.md` for the current static relaunch approach.

# ⚠️ Legacy Reference

This runbook applies to discontinued Power Pages deployments. For the current local static rebuild, see `docs/operations/delivery-plan.md`.

# RCSA Demo Relaunch Plan

## Current Direction
- Provision a brand-new Power Pages site in the sandbox environment and scaffold pages to mirror the previous demo (Home, wizAssessment, scrDashboard_1LoD, etc.).
- Keep navigation labels and page hierarchy consistent so existing content blocks and links can be ported over with minimal rewriting.
- Migrate the static HTML/CSS/JS from the repository into the new site page by page, updating navigation targets, variables, and resource links for the new structure.
- Validate each page in Power Pages Studio as it is migrated, then publish once end-to-end flow works without security or binding issues.
- Latest rebuild target: **RCSA Copilot Demo V5 (current trial rebuild)**  
  - Public URL: `_pending publish after validation_`  
  - Editor: `https://make.powerpages.microsoft.com/e/ffbe8b10-3cb8-e700-ac43-948a883dee17/sites/bbeedd7f-6c07-44f4-a64e-43a0384bfcb5`  
  - Website GUID: `bbeedd7f-6c07-44f4-a64e-43a0384bfcb5`

## Lessons Learned from First Attempt
- Trial-to-sandbox migrations can leave behind orphaned root pages and site markers that are difficult to reconcile, even when content uploads succeed.
- Reliance on cached configuration, combined with limited visibility into GUIDs from the Portal Management UI, makes troubleshooting 404 issues time-consuming.
- Uploading the entire site via CLI is fast, but ensuring the runtime host resolves to the imported homepage still requires careful binding, marker, and cache management.
- Having a working “fallback” route (`/rcsa-home`, `/ai-home`) proved the content was intact; the blocker was the host configuration rather than missing assets.
- Given the demo uses static data, rebuilding in a clean site provides more predictable results than continuing to chase environmental inconsistencies.
- The Power Platform CLI (`pac`) is installed via the MSI (`https://aka.ms/PowerAppsCLI`); locate the installed binaries under `C:\Users\<user>\.nuget\packages\microsoft.powerapps.cli\<version>\tools` and prepend that path to `PATH` for each shell session (for example: `$env:PATH = 'C:\Users\etrifari\.nuget\packages\microsoft.powerapps.cli\1.50.1\tools;' + $env:PATH; pac auth list`).

## Immediate Next Steps
- Create and name the new pages in the fresh site so they align with the folders and references in the repository.
- Hand off once the skeleton is ready so the existing code can be copied over and adjusted for the new environment.
- Smoke-test navigation and published output early to catch any new permalink or layout regressions before migrating all content.

## Website Inventory – 2025-10-31 14:05:14
| Website Name | GUID | State | Notes |
| --- | --- | --- | --- |
| RCSA CopIlot Demo - RCSA-Demo | dca4e911-77c0-4122-af5b-c43e5037e7f4 | Not provided (CLI) | Existing CLI snapshot at `tmp_download/site-dca4e911` references this rebuild variant. |
| RCSA-Copilot-Demo-V7 - RCSA-Copilot-Demo-V7 | a73cd7d7-71c2-4e01-a147-de5dcbb80683 | Not provided (CLI) | No matching local export; likely another sandbox iteration. |
| RCSA-COPILOT-DEMO-REBUILD-V3 - RCSA-COPILOT-DEMO-REBUILD-V3 | bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 | Not provided (CLI) | Current V5 scaffold; refreshed today into `tmp_download/site-bbeedd7f`. |
| RCSA-Demo.powerappsportals.com | 0f082cf4-90b6-f011-bbd3-7c1e5216826d | Not provided (CLI) | Legacy portal domain; download attempt logged below failed with `KeyNotFoundException`. |
| RCSA CopIlot Demo | 7344b747-14b5-f011-bbd3-7c1e5216826d | Not provided (CLI) | Classic clone; evaluate whether still needed. |
| RCSA CopIlot Demo - RCSA-Demo | 2a5dcdc9-78cc-482c-bd6d-97fa3f431d4a | Not provided (CLI) | Additional clone detected by CLI; no local export located. |
| RCSA CopIlot Demo - RCSA-Demo | ba6e57b7-0876-4771-b1db-b5608caa5530 | Not provided (CLI) | Additional clone detected by CLI; no local export located. |
| RCSA-Copilot-Demo-V3 - RCSA-Copilot-Demo-V3 | ea44358f-fb1a-49b9-9bfb-4bfea053296e | Not provided (CLI) | Older V3 backup already present at `tmp_download/rcsa-copilot-demo-v3---rcsa-copilot-demo-v3`. |

- Legacy pull (`pac powerpages download --modelVersion 2 --path live_pull_legacy/20251031-140514`) surfaced GUID `0f082cf4-90b6-f011-bbd3-7c1e5216826d` but failed with `System.Collections.Generic.KeyNotFoundException`; CLI log: `C:\Users\etrifari\.nuget\packages\microsoft.powerapps.cli\1.50.1\tools\logs\pac-log.txt` (Session `d00246eb-f8e3-4c6a-8322-542f93be196e`). A retry with `--modelVersion 1` confirmed the site is Enhanced-only and recommended `-mv Enhanced`; no usable export generated, so the partial folder should be treated as incomplete.
- V5 scaffold refresh (`pac powerpages download --modelVersion 2 --path tmp_download/site-bbeedd7f`) completed successfully in ~15s and updated `tmp_download/site-bbeedd7f/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3`.

## Deployment Runbook – MVP Upload
### Scope and prerequisites
- Target site: `bbeedd7f-6c07-44f4-a64e-43a0384bfcb5` (`https://org601a79e1.crm.dynamics.com`), with staged content under `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3`.
- Modified assets to upload: `wizAssessment` page (`adx_webpageid` `be830aca-e085-0884-45ee-4c2eda8d98b9`), `Dashboard` page (`adx_webpageid` `856a4047-b9e4-3027-fca0-c7e606a87438`), and web file `rcsa-styles.css` (`adx_webfileid` `c64ed728-c295-4fc0-ad8e-1650a80b5653`).
- CLI baseline: Microsoft Power Platform CLI 1.50.1 with Enhanced model support; set `PAC_CLI_EXPERIMENTAL_COMMANDS=1` if asset-level upload commands are not yet exposed by default.
- Guardrail: run the following sequence only after confirming no additional files changed; do not add `--forceUploadAll` or point to broader deployment profiles while targeting the MVP delta.

### Upload command sequence (dry run plan)
1. Add the CLI tools directory to `PATH` for the current shell session.
   ```powershell
   $env:PATH = 'C:\Users\etrifari\.nuget\packages\microsoft.powerapps.cli\1.50.1\tools;' + $env:PATH
   ```
2. Select the sandbox environment that hosts the V5 rebuild.
   ```powershell
   pac auth select --environment https://org601a79e1.crm.dynamics.com
   ```
3. Anchor the working directory at the repo root so the relative `--path` values resolve.
   ```powershell
   Set-Location C:\Projects\RCSA_Demp_V6
   ```
4. Upload the localized `wizAssessment` page content only (Enhanced model, en-US locale).
   ```powershell
   pac powerpages webpage upload --path tmp_download\site-bbeedd7f\rcsa-copilot-demo-v5\rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3 --webSiteId bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 --webpageId be830aca-e085-0884-45ee-4c2eda8d98b9 --language en-US --overwrite true --modelVersion Enhanced
   ```
5. Upload the localized `Dashboard` page content with the same scope controls.
   ```powershell
   pac powerpages webpage upload --path tmp_download\site-bbeedd7f\rcsa-copilot-demo-v5\rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3 --webSiteId bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 --webpageId 856a4047-b9e4-3027-fca0-c7e606a87438 --language en-US --overwrite true --modelVersion Enhanced
   ```
6. Push the refreshed design-system CSS while leaving other web files untouched.
   ```powershell
   pac powerpages webfile upload --path tmp_download\site-bbeedd7f\rcsa-copilot-demo-v5\rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3 --webSiteId bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 --webfileId c64ed728-c295-4fc0-ad8e-1650a80b5653 --overwrite true --modelVersion Enhanced
   ```
7. If the targeted commands are unavailable, fall back to a scoped deployment profile containing only the above folders and rerun `pac powerpages upload --path <site-root> --deploymentProfile mvp-two-pages --modelVersion Enhanced`; keep the profile under source control for repeatability.

### Manifest cross-check
- `tmp_download/site-bbeedd7f/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/.portalconfig/org601a79e1.crm.dynamics.com-manifest.yml` and the twin manifest under the `rcsa-copilot-demo-v5` wrapper both reference `RecordId: bbeedd7f-6c07-44f4-a64e-43a0384bfcb5` for the website; no other site GUIDs are present.
- `Select-String -Pattern 'dca4e911|a73cd7d7|0f082cf4|7344b747|2a5dcdc9|ba6e57b7|ea44358f'` against both manifests returned no matches (confirms legacy portals are not referenced).
- `portallanguage.yml` lists only English (`73668a76-778e-4856-a934-411b685eff8a`), so the runbook commands can confidently use `--language en-US` without affecting additional locales.

### Validation checklist (post-upload)
- Studio preview
  - [ ] Open `/home` to confirm the global nav shows the MVP link set with correct highlighting and header lockup rendering.
  - [ ] Preview `/wizassessment` and ensure residual-risk tabs, AI callouts, and modal workflows load without console errors; verify the CTA button still routes to `/scrdashboard_1lod`.
  - [ ] Preview `/scrdashboard_1lod` and check that hero cards, KPI tiles, and chart placeholders render with `rcsa-styles.css` applied (no fallback theming).
- Residual functionality
  - [ ] Step through the wizAssessment wizard panes, including progress indicator clicks and tab toggles, to confirm Bootstrap interactions survived.
  - [ ] Exercise Dashboard filters (e.g., Segment, Severity) and confirm linked scripts run without JS errors.
  - [ ] Validate that the `Start Guided Demo` and `Return to Assessment` buttons jump between the two MVP pages as expected.
- Navigation verification
  - [ ] Desktop nav exposes Home, Dashboard (`/scrdashboard_1lod`), Assessment Workflow (`/wizassessment`), and retains the CTA styling.
  - [ ] Mobile hamburger opens the matched link order; validate the CTA pill and collapsible behavior.
  - [ ] Footer quick links (if surfaced) respect the updated URLs and do not reference legacy GUID-based routes.
- Cache clear steps
  - [ ] In Portal Management: Settings → Portal Actions → Clear Server-Side Cache for `RCSA Copilot Demo V5`.
  - [ ] Hit `https://<mvp-host>/_services/about` and select **Clear cache** to flush client/CDN layers once the upload succeeds.
  - [ ] Notify stakeholders to hard-refresh (`Ctrl+Shift+R`) during validation to bypass browser cache for the new CSS.

### Post-upload repo refresh
- Run an immediate pull to align the local scaffold with server-side GUID timestamps.
  ```powershell
  pac powerpages download --path tmp_download\site-bbeedd7f --webSiteId bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 --overwrite --modelVersion Enhanced
  ```
- Expected file deltas: `web-pages/wizassessment/wizAssessment.webpage.copy.html`, `web-pages/wizassessment/wizAssessment.webpage.custom_css.css`, `web-pages/dashboard/Dashboard.webpage.copy.html`, `web-pages/dashboard/Dashboard.webpage.custom_css.css`, `web-files/rcsa-styles.css`, `web-files/rcsa-styles.css.webfile.yml`, plus checksum updates within `.portalconfig/org601a79e1.crm.dynamics.com-manifest.yml`.
- After verifying the download, stage the refreshed assets and review `git status` for any unintended extras before committing.
- If additional assets appear in the diff, halt and investigate before repeating the upload to avoid polluting the MVP scope.

## Baseline Snapshot Decision (2025-10-30)
- Recommended backup: `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup` for scrDashboard, wizAssessment, header, and navigation assets.
  - 2025-10-31 snapshot archived at `docs/restoration-snapshots/mvp-2025-10-31` capturing these pages with pane markers and residual merge notes ready for MVP reuse.
- Evidence highlights:
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/scrdashboard_1lod/scrDashboard_1LoD.webpage.copy.html` retains the full SPA dashboard markup (Bootstrap + design system) that is missing entirely from `tmp_download/site-dca4e911/rcsa-demo-rebuild-v2---rcsa-demo-rebuild-v2/web-pages`.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/wizassessment/wizAssessment.webpage.copy.html` aligns with the stable wizard HTML/CSS references, whereas `tmp_download/site-dca4e911/.../wizassessment/wizAssessment.en-US.webpage.copy.html` is just a blank section scaffold.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-templates/header/Header.webtemplate.source.html` includes the current RCSA header (fixed nav, Bootstrap 5, `~/rcsa-styles.css?v=20251030`), unlike the legacy template still present in the CLI snapshot.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/weblink-sets/default/Default.en-US.weblinkset.weblink.yml` maintains nine production navigation entries; the preCSS backup drops to a single Home link and the CLI snapshot only has Home + two pages.
- Risks to track:
  - The CLI agent download at `tmp_download/site-dca4e911/rcsa-demo-rebuild-v2---rcsa-demo-rebuild-v2` omits the `scrdashboard_1lod` folder, ships placeholder content for `wizassessment`, and reverts to the out-of-box header template—treat that pull as unreliable for rebuild work.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preCSSBackup` mixes duplicate header templates (`header_0c3e795e` and `header_23513c34`) and a gutted navigation set, so using it as a baseline risks resurrecting deprecated GUIDs and layout regressions.
  - Keep the design-system CSS version string (`~/rcsa-styles.css?v=20251030`) when porting pages; mismatched versions in future downloads could mask stylesheet load issues.
- Source -> target mapping (V5 scaffold vs preEnhanced baseline):
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/scrdashboard_1lod` -> `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-pages/dashboard` (root `856a4047-b9e4-3027-fca0-c7e606a87438`, en-US `f4963a3a-28f9-4314-c57b-730b21c53ea6`); reset the partial URL to `scrdashboard_1lod` and parent to Home `a0c8ed88-747a-462b-8114-b8e1986317a4` so existing links stay valid.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/wizassessment` -> `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-pages/wizassessment` (root `be830aca-e085-0884-45ee-4c2eda8d98b9`, en-US `f71b58a4-7da2-b899-d4db-2e183d1a06db`); ignore `archive_wizassessment` and `wizassessment-v3` folders when rebuilding.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-templates/header` -> `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-templates/header` (template `6f9392a8-0c3e-45f6-8474-d32b6b1e3aa1`); paste the branded source HTML and rebind to the Default weblink set.
  - `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/weblink-sets/default` -> `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/weblink-sets/default` (set `f9bb617b-2bbd-4334-ab7f-f1ed65b50916`); re-add scrHelp, scrMyIssues, frmRiskIntake, and Drawer entries once the new page GUIDs are confirmed.
- Snippet alignment: use the unsuffixed snippets in `tmp_download/site-bbeedd7f/.../content-snippets` (`site-name`, `logo-url`, `logo-alt-text`, `mobile-header`, `header-toggle-navigation`) and retire the duplicated `_9f65ffac`, `_4420290e`, `_26d71298`, `_80739d2d` variants after migration so the fresh scaffold remains the source of truth.
- 90057cd deltas: apply `docs/restoration-snapshots/90057cd/wizAssessment-pane5-residual.html`, `.../wizAssessment-residual-overrides.js`, and `.../wizAssessment-modal-hotfix.css` into `tmp_download/site-bbeedd7f/.../web-pages/wizassessment/wizAssessment.webpage.copy.html`, `...custom_javascript.js`, and `...custom_css.css` respectively; ensure the CTA text still routes users back to `/scrdashboard_1lod`.
- Risks & cleanup for V5 scaffold:
  - `tmp_download/site-bbeedd7f/.../web-files` is missing `rcsa-styles_*.css` and `logicgate-design-system.css`; port those before publishing or the header/wizard styling collapses.
  - The fresh Default weblink set only lists Home, Dashboard, and wizAssessment and keeps the Dashboard slug as `/Dashboard`; update to `/scrdashboard_1lod` or stage a redirect before go-live.
  - Leave `web-pages/archive_scrdashboard_1lod` and `web-pages/archive_wizassessment` in cold storage—do not re-upload them into the new site.

### Legacy Snapshot 90057cd (2025-10-29)
- **Extracted assets:** Residual-risk step markup (`docs/restoration-snapshots/90057cd/wizAssessment-pane5-residual.html`) and the override/char-count logic (`docs/restoration-snapshots/90057cd/wizAssessment-residual-overrides.js`) capture the wizard’s stable guidance from commit `90057cd`. Supplemental modal fixes live in `docs/restoration-snapshots/90057cd/wizAssessment-modal-hotfix.css` to keep the control search usable after migration.
- **Legacy → current reference map:**
  - Website GUID `ba6e57b7-0876-4771-b1db-b5608caa5530` → `bbeedd7f-6c07-44f4-a64e-43a0384bfcb5`
  - Studio editor `.../sites/ba6e57b7-0876-4771-b1db-b5608caa5530` → `https://make.powerpages.microsoft.com/e/ffbe8b10-3cb8-e700-ac43-948a883dee17/sites/bbeedd7f-6c07-44f4-a64e-43a0384bfcb5`
  - Public URL `https://rcsa-copilot-demo-v4.powerappsportals.com/` → `_pending publish for V5_` (record final host once assigned)
  - CLI download path `tmp_download/<legacy-site>` → `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5`
  - Dashboard link casing `/scrDashboard_1LoD` → `/scrdashboard_1lod` (matches the active nav slug in the V5 site marker)
- **Integration notes:**
  - `wizAssessment`: Reapply the pane-5 HTML snippet and override script block before syncing. Restore the design-system reference to `~/rcsa-styles.css?v=20251030` and keep the `/scrdashboard_1lod` navigation fallback in `navigateToDashboard()`.
  - `scrDashboard_1LoD`: Ensure hero CTA continues targeting `/wizassessment` and inherit the same design-system query string; no layout deltas were introduced in `90057cd`.
  - Header/Nav: Confirm header template loads `~/design-system/rcsa-styles.css?v=20251030` and retains the lower-case dashboard slug so breadcrumbs and CTA buttons route correctly.
- **Next action:** Hand these snippets to Agents C/D/E once the new site folders are staged so they can paste into the language-specific files (`content-pages/wizAssessment.en-US.webpage.copy.html`, header template, and dashboard page) without reopening the legacy GUID folders.

## Power Pages CLI Deployment Checklist
- Authenticate once per workstation with `pac auth create --url https://org601a79e1.crm.dynamics.com --name RCSA-Prod` and select the profile before uploading.
- From the repo root, push the site artifacts that live under `powerpages/rcsa-copilot-demo---rcsa-demo/` with  
  `pac powerpages upload --path powerpages/rcsa-copilot-demo---rcsa-demo --webSiteId <guid> --modelVersion 2`  
  (swap `<guid>` for the Website GUID listed above; add flags such as `--language en-US` or `--overwrite` when necessary).
- After the upload finishes, verify the pages in Power Pages Studio, clear cache via `https://<site>/_services/about`, and publish.
- Some trial tenants render a blank screen at `/ _services/about`. If that happens, skip it and use Studio’s **Sync configuration** or a quick publish instead of attempting the unsupported cache clear.
- If you make fixes directly in Studio, pull them back into the repo with  
  `pac powerpages download --path powerpages/rcsa-copilot-demo---rcsa-demo --webSiteId <guid> --modelVersion 2`  
  before committing to keep git in sync with the live site.

## Page GUIDs (dca4e911 snapshot)
- Access Denied (`access-denied`): "`4abb34e9-2ddd-4b5c-bb0e-0891da9a32db`", "`e87b6d61-6bb9-40b2-889a-8bf94c6db446`"
- Dashboard (`Dashboard`): "`7f1d5887-14bf-754f-5e11-3f662ee731d0`", "`d611ffd9-76c2-9e92-223f-1aec685a20cb`"
- Home (`/`): "`153c2d14-580d-4763-950f-f1f9c8ceed0c`", "`b1770279-5c5e-46fa-93da-a6bc362c5f9e`"
- Page Not Found (`page-not-found`): "`b9fcb2f1-5765-4222-bddb-0a96385a54fb`", "`ccf619b0-1613-44cc-8367-7cf1b5fc2943`"
- Profile (`profile`): "`8d4bcc97-15dc-4d02-9813-eae8bb44b439`", "`a52aafbb-f851-4712-a00b-fe71e4ff9348`"
- Search (`search`): "`5d9b6dd8-c0f0-48bf-a195-ef298aef85fc`", "`c7940f8c-0ad5-46b7-9a9d-2ac6fd5c0132`"
- wizAssessment (`wizAssessment`): "`2880388b-8873-8bac-7847-3d1c5beb308f`", "`a70ffe6a-e73d-83df-4f84-93767a68fad5`"

## Page GUIDs (rcsa-copilot-demo-v5 snapshot – 2025-10-31)
- **Website:** `bbeedd7f-6c07-44f4-a64e-43a0384bfcb5` (Risk and Compliance Assessment sandbox).
- **Download:** `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3`.
- **CLI:** `pac.exe help`; `pac auth list`; `pac auth select --name RCSA-Prod`; `pac powerpages download --environment https://org601a79e1.crm.dynamics.com --webSiteId bbeedd7f-6c07-44f4-a64e-43a0384bfcb5 --modelVersion 2 --path tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5`.
- **Page inventory:**

```text
Access Denied (access-denied)        473627cf-7473-4491-b09c-6572a89ae6cf (root) | db1da81b-f880-4817-a3d0-57c4c34ecc2b (en-US)
Dashboard (dashboard)                856a4047-b9e4-3027-fca0-c7e606a87438 (root) | f4963a3a-28f9-4314-c57b-730b21c53ea6 (en-US)
Home (/)                             a0c8ed88-747a-462b-8114-b8e1986317a4 (root) | 81f88a1a-a836-46b8-b138-13b10a9cca80 (en-US)
Page Not Found (page-not-found)      177009da-09bb-4186-aab3-ddcc924af306 (root) | 12b529f9-e655-4938-9798-fa61febfcec4 (en-US)
Profile (profile)                    936d5a1d-c1c9-4ac9-a519-a9bfb311775a (root) | a3319803-550c-49ae-a7d9-a387a3f5b831 (en-US)
Search (search)                      596d0604-8159-43e7-90ea-e6570000b4fb (root) | b40cfe00-7c6a-4ea1-8ff4-bcc64d18c0c6 (en-US)
wizAssessment (wizAssessment)        be830aca-e085-0884-45ee-4c2eda8d98b9 (root) | f71b58a4-7da2-b899-d4db-2e183d1a06db (en-US)
```
- **Parenting notes:** Every page (root and localized records) references Home `a0c8ed88-747a-462b-8114-b8e1986317a4` as parent; Dashboard remains flagged `adx_isroot: true` while still parented to Home.

## Prompting Guidance for New Agents
- Start each agent with the environment URL, site GUID, and target pages (Home `/`, `scrDashboard_1LoD`, `wizAssessment`) so navigation wiring is predictable.
- Reinforce Power Pages constraints: enhanced data model, use uploaded web files for CSS/JS, clear cache via `_services/about`, navigate using partial URLs.
- Provide path references to the legacy assets (`powerpages/rcsa-copilot-demo---rcsa-demo/...`) and note that all data is static dummy content.
- Assign explicit deliverables (e.g., “Port wizAssessment HTML/CSS”, “Recreate scrDashboard cards”) and require Studio previews before handoff.
- Encourage agents to document page IDs or site markers in this file as they work to keep the team aligned.
- Always ensure the header web template includes CDN references and `~/design-system/rcsa-styles.css` (use a versioned query string to bust cache) before running any CLI upload to avoid stripping the design system.

## Experience Architecture Notes
- The `wizAssessment` flow remains a single-page experience to preserve demo fidelity, but break the markup into logical sections (hero overview, risk evaluation, automation insights, submission) using partial templates or Liquid includes to keep maintenance manageable.
- Where practical, reuse components (cards, accordions, callouts) built in the `design-system/rcsa-styles.css` file and align with the standards captured in `docs/rcsa-2lod-requirements.md` and `HEADER_OPTIMIZATION_SUMMARY.md`.
- Maintain cross-page UX consistency: top navigation, breadcrumb cues, and action buttons should follow our CX patterns (primary CTA on the right, contextual links below, etc.).
- Consider future agility by isolating dummy data values inside snippets or data files so content tweaks don’t require page rewrites.

## MVP Page Staging – 20251031-143925
- Created pre-staging backup at `tmp_backup/site-bbeedd7f/20251031-143925` covering `web-pages/dashboard` and `web-pages/wizassessment`.
- `web-pages/dashboard/Dashboard.webpage.copy.html` and `Dashboard.webpage.custom_css.css` restored from `docs/restoration-snapshots/mvp-2025-10-31/`, and `Dashboard.webpage.yml` now holds `adx_partialurl: scrdashboard_1lod` with the Home parent GUID unchanged.
- `web-pages/wizassessment/wizAssessment.webpage.copy.html` and `.custom_css.css` refreshed from the same snapshot; merged modal hotfix CSS, pane 5 residual markup, and residual override JS from `docs/restoration-snapshots/90057cd/` into the HTML script block. Updated override flow to persist `riskTitle`, track `completed` state, reset toggle UI, and reuse the existing save-button state change.
- Normalized stylesheet links in both dashboard and wizard HTML to `~/rcsa-styles.css?v=20251030` (fallback `~/rcsa-styles.css`) and updated every wizard redirect/anchor (including `navigateToDashboard()`) to `/scrdashboard_1lod`.
- Staged `web-files/rcsa-styles.css` from `design-system/rcsa-styles.css` with new metadata in `web-files/rcsa-styles.css.webfile.yml` (`adx_webfileid c64ed728-c295-4fc0-ad8e-1650a80b5653`, `annotationid cdf109ec-7064-4194-a9e8-d81f7251622f`, partial URL `rcsa-styles.css?v=20251030`).
- **Open Questions:**
  - Validate in Studio that residual overrides fire the 50-character validation and char-count helpers after upload; markup came from snapshot but needs runtime confirmation.
  - Confirm no additional Dashboard nav bindings are required once the new web file publishes with the versioned query string.

## Workstream Notes – Header & Navigation
- **File Edits:** `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-templates/header/Header.webtemplate.source.html`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header_0c3e795e/Header_0C3E795E.webtemplate.source.html`, `powerpages/rcsa-copilot-demo---rcsa-demo/weblink-sets/default/Default.en-US.weblinkset.weblink.yml`.
- **Design System Alignment:** Header templates now load `~/design-system/rcsa-styles.css?v=20251030` (fallback `~/rcsa-styles.css?v=20251030`) and nav links are standardized to `/scrdashboard_1lod` and `/wizassessment` for both desktop and mobile states.
- **Navigation Sync:** Default weblink set restored with Home, scrDashboard_1LoD, wizAssessment, scrHelp, scrMyIssues, frmRiskIntake, Drawer, plus archive entries to mirror the branded preEnhanced baseline.
- **Duplicate Records:** Legacy header template `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header_23513c34/Header_23513C34.webtemplate.source.html` and archive weblink entries (`archive_scrDashboard_1LoD`, `archive_wizAssessment`) remain in place for follow-up review—no deletions performed.
- **Fresh scaffold mapping:** Port `Header.webtemplate.source.html` into `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-templates/header/Header.webtemplate.source.html` (new template `6f9392a8-0c3e-45f6-8474-d32b6b1e3aa1`) and bind it to `tmp_download/site-bbeedd7f/.../weblink-sets/default/Default.en-US.weblinkset.weblink.yml` (set `f9bb617b-2bbd-4334-ab7f-f1ed65b50916`) so the branded nav rides the new GUIDs.
- **Snippets to honor:** `content-snippets/site-name`, `logo-url`, `logo-alt-text`, `mobile-header`, and `header-toggle-navigation` in the fresh scaffold already hold the canonical values - retire the suffixed variants once the new pages pick them up.
- **Open risks:** Update the new Default weblink set to include scrHelp, scrMyIssues, frmRiskIntake, and Drawer entries and change the Dashboard link to `/scrdashboard_1lod`; otherwise the header will downscope navigation when published.
- **Validation Checklist (Studio):**
  - [ ] Desktop nav renders branded styling, surfaces Home / 1LoD Dashboard / Assessment Workflow, and highlights the active route.
  - [ ] Mobile toggle reveals the same link order and keeps the `/wizassessment` CTA button intact.
  - [ ] Header logo lockup (“AI” badge + “RCSA Copilot”) stays visible without clipping in the fixed header.
  - [ ] Primary CTA label stays “Start Guided Demo” and routes to `/wizassessment`.

## Workstream Notes – wizAssessment
- **File Edits:** `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.copy.html`, `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/wizassessment/wizAssessment.webpage.custom_css.css` restaged from `...preEnhancedBackup`; skipped the blank scaffold under `tmp_download`.
- **Env & Snippets:** Relies on CDN Bootstrap 5.3.0 and Bootstrap Icons 1.11.0 plus `~/rcsa-styles.css?v=20250218` (fallback to `~/rcsa-styles.css`) and inline emergency button styles that expect the custom CSS fallback file to load.
- **Duplicate Records:** Additional wizAssessment page records persist under `tmp_download/header-check/.../archive_wizassessment` and `tmp_download/latest-live/...` (including `.en-US` variants); treat as historical artifacts only.
- **Fresh scaffold mapping:** Target `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-pages/wizassessment` (root `be830aca-e085-0884-45ee-4c2eda8d98b9`, en-US `f71b58a4-7da2-b899-d4db-2e183d1a06db`) when pasting the preEnhanced HTML/CSS/JS; ignore `archive_wizassessment` and `wizassessment-v3` directories during rebuild.
- **90057cd deltas to apply:** Merge `docs/restoration-snapshots/90057cd/wizAssessment-pane5-residual.html`, `wizAssessment-residual-overrides.js`, and `wizAssessment-modal-hotfix.css` into `wizAssessment.webpage.copy.html`, `wizAssessment.webpage.custom_javascript.js`, and `wizAssessment.webpage.custom_css.css` in the fresh scaffold so residual-risk overrides, modal fixes, and character counts survive.
- **Risks & cleanup:** Align the design-system link to `~/rcsa-styles.css?v=20251030` (upload the matching CSS under the new web-file GUID) and keep `navigateToDashboard()` pointed at `/scrdashboard_1lod`; otherwise the wizard CTA loops to the blank scaffold.
- **Validation Checklist:**
  - [ ] Load wizAssessment in the target site and confirm residual-risk guidance, heat map, and AI panels render with design system styling.
  - [ ] Exercise tab navigation and wizard pane transitions to verify Bootstrap JS interactions and progress indicator wiring.
  - [ ] Confirm Liquid placeholders (if any) and environment asset links resolve after upload (no 404s on `~/rcsa-styles.css` or CDN calls).

## Workstream Notes – Dashboard
- Ported `scrDashboard_1LoD.webpage.copy.html` and `scrDashboard_1LoD.webpage.custom_css.css` from `rcsa-demo-preEnhancedBackup` into `rcsa-demo`, preserving the `/wizassessment` CTA and `~/design-system/rcsa-styles.css?v=20251030` asset reference.
- Once the rebuilt site issues new Dashboard GUIDs, update the **Page GUIDs** table and rebind the Dashboard navigation entry/site marker; flag any duplicate page records for review instead of deleting them.
- **Fresh scaffold mapping:** Use `tmp_download/site-bbeedd7f/rcsa-copilot-demo-v5/rcsa-copilot-demo-rebuild-v3---rcsa-copilot-demo-rebuild-v3/web-pages/dashboard` (root `856a4047-b9e4-3027-fca0-c7e606a87438`, en-US `f4963a3a-28f9-4314-c57b-730b21c53ea6`) as the new host folder; change `adx_partialurl` to `scrdashboard_1lod` and parent to Home `a0c8ed88-747a-462b-8114-b8e1986317a4` to keep legacy links working.
- **Risks & cleanup:** Upload `rcsa-styles_*.css` into the fresh `web-files` collection before validation and update the Default weblink set so the Dashboard entry no longer resolves to `/Dashboard`.
- Files staged locally only—no CLI upload triggered so Studio validation remains pending.

### Studio Preview Validation Checklist
- [ ] Load the Dashboard in Studio preview and confirm cards, hero, and chart widgets render with design-system styling intact.
- [ ] Trigger the **Start Assessment** action to verify it routes to `/wizassessment`.
- [ ] Check that `~/design-system/rcsa-styles.css?v=20251030` and related assets load without 404s or console errors.
- [ ] Exercise KPI filters/tab toggles to confirm scripts execute without runtime errors.
- [ ] Capture the newly generated Dashboard page GUID and record it in this plan once available.
