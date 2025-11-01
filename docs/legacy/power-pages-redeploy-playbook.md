# > _Legacy context:_ Former Power Pages redeploy checklist preserved for historical reference only. Static rebuild teams should use local tooling noted in `docs/operations/delivery-plan.md`.

# RCSA Copilot Demo – Redeploy Playbook

This playbook captures the repeatable steps (and lessons learned) for rebuilding the RCSA Copilot Power Pages demo whenever the 90-day trial environment expires.

**Critical guardrails before you start**
- Always treat the *new* site as the source of truth for Website GUIDs. Copy content into those records—never overwrite them with a full legacy export.
- Avoid `pac powerpages upload --forceUploadAll` against a fresh site; it re-introduces all historical GUIDs and creates duplicate pages, templates, and navigation.
- If you must automate uploads, trim the package to only the assets you intend to overwrite and confirm the `.portalconfig` manifest points to the new site ID first.

---

## 1. Prep Workstation
- **Install Power Platform CLI**  
  Download `https://aka.ms/PowerAppsCLI` and install. Add the tools folder to `PATH` for each shell session, e.g.  
  ```powershell
  $env:PATH = "C:\Users\<user>\.nuget\packages\microsoft.powerapps.cli\<version>\tools;" + $env:PATH
  ```
  Verify with `pac auth list`.
- **Git / Repo**  
  Clone `https://github.com/ethtri/RCSA-Copilot-Demo-Rebuild-V2` and pull the latest changes. Use feature branches + PRs when possible.
- **Reference Assets**  
  Key source files live under `powerpages/rcsa-copilot-demo---rcsa-demo/` and design guidance under `docs/legacy/` (`power-pages-portal-rebuild-plan.md`, `rcsa-2lod-requirements.md`, `HEADER_OPTIMIZATION_SUMMARY.md`).

---

## 2. Create the New Site
1. In the target environment (`https://org601a79e1.crm.dynamics.com`), create a new Power Pages site.
2. Record the **Site ID / Website GUID** and the public URL in `docs/legacy/power-pages-portal-rebuild-plan.md`.
3. Configure basic settings: enable local language, themes, and header/footer templates as required.
4. Create empty pages for:
   - `Home` (`/` – optional for demo)
   - `scrDashboard_1LoD`
   - `wizAssessment`
5. Upload shared assets without importing the entire legacy site:
   - CSS (`design-system/rcsa-styles.css`)
   - Images/icons used by the demo
   - Header web template (if not already customized)
   - Optional: use Studio upload or `pac powerpages webfile upload` for individual files, but stop short of a blanket site upload.
6. Run `pac powerpages download --path tmp_download/<site-name> --environment https://org601a79e1.crm.dynamics.com --modelVersion 2` to capture the empty scaffold. This gives you the new GUIDs to reference while keeping the actual live pages untouched.

---

## 3. Content Migration Workflow
Use parallel agents where possible (Project Manager + Page Specialists).

### Prompting Best Practices
- Always restate the latest site GUID, download path, and relevant page names. Agents rely on explicit inputs.
- Include **Objective**, **Inputs**, **Tasks**, **Deliverables**, **Guardrails**, and **Escalation triggers** for every prompt.
- Call out _forbidden_ actions (e.g., “Do not run pac powerpages upload”).
- Specify the exact document sections to update (line anchors when known) and the format (bullet list, table row, checklist).
- Remind agents to cite the files or commands they touched so we can audit quickly.

### Agent Prompt Library (copy/paste ready)
Replace placeholders (`<site-guid>`, `<site-name>`, etc.) before dispatching.

- **Agent A – CLI Setup & Download**  
  **Objective:** Capture the brand-new site scaffold and surface the authoritative GUIDs for downstream work.  
  **Inputs:**  
  - Environment URL: `https://org601a79e1.crm.dynamics.com`  
  - Studio site GUID: `<site-guid>` (copy from make.powerpages link)  
  - Download target: `tmp_download/<site-name>`  
  **Tasks:**  
  1. Ensure PAC CLI is available (`& "<pac-path>\pac.exe" help`). If not on PATH, prepend `C:\Users\etrifari\.nuget\packages\microsoft.powerapps.cli\1.50.1\tools`.  
  2. `pac auth list`; if the RCSA profile is missing, run `pac auth create --name RCSA-Prod --environment https://org601a79e1.crm.dynamics.com`.  
  3. `pac auth select --name RCSA-Prod`.  
  4. Download the empty scaffold:  
     ```powershell
     pac powerpages download --environment https://org601a79e1.crm.dynamics.com `
       --webSiteId <site-guid> `
       --modelVersion 2 `
       --path tmp_download/<site-name>
     ```  
  5. Inspect the downloaded folders and list every page GUID (include duplicates).  
  **Deliverables:**  
  - Update `docs/legacy/power-pages-portal-rebuild-plan.md` → “Page GUIDs (<site-name> snapshot – <date>)” with:  
    * Website GUID  
    * Page GUID pairs (new vs legacy)  
    * Noted parent-child anomalies (e.g., dashboard still parented to legacy home)  
  - Call out the download path and CLI commands executed.  
  **Guardrails:** No uploads, publishes, or manifest edits. Do not delete legacy GUID references yet—just flag them.  
  **Escalate if:** Download fails, auth profile missing and cannot be created, or you spot unexpected extra websites in the tenant.

- **Agent B – Baseline & GUID Analyst**  
  **Objective:** Decide which legacy assets feed the rebuild and map them to the new GUID folders.  
  **Inputs:**  
  - Fresh download folder from Agent A (`tmp_download/<site-name>`)  
  - Stable baseline: `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup`  
  **Tasks:**  
  1. Compare dashboard, wizAssessment, header, navigation, and CSS assets between the fresh download and the baseline.  
  2. For each component, name the source file we will transplant and the new GUID folder that will receive it.  
  3. Highlight any duplicates or missing assets that need manual cleanup (e.g., orphaned header templates).  
  **Deliverables:**  
  - Append to `docs/legacy/power-pages-portal-rebuild-plan.md` under “Baseline Snapshot Decision” and the relevant **Workstream Notes** sections:  
    * Recommended source files (with paths)  
    * Risks/cleanup items (e.g., “scrDashboard_1LoD still references legacy home; re-parent before upload”).  
  - Optional: add a two-column table (Component → Action) if it clarifies handoffs.  
  **Guardrails:** No CLI uploads/downloads, no edits to the active bundle. Read/compare only.  
  **Escalate if:** Baseline assets are missing or conflict with the new scaffold, or if GUID folders don’t align with expectations.

- **Agent C – Dashboard Specialist**  
  **Objective:** Stage the dashboard HTML/CSS for the new GUID while preserving links and styling.  
  **Inputs:**  
  - Source: `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/scrdashboard_1lod/`  
  - Target: `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/<new-dashboard-guid>/` (as identified in Agent B notes)  
  **Tasks:**  
  1. Copy the baseline HTML (`scrDashboard_1LoD.webpage.copy.html`) and CSS (`scrDashboard_1LoD.webpage.custom_css.css`) into the new GUID folder.  
  2. Verify internal links point to `/wizassessment`; note any that need adjustment.  
  3. Confirm the design-system reference (`~/design-system/rcsa-styles.css?v=20251030`) remains intact.  
  4. Do **not** touch JavaScript unless instructed.  
  **Deliverables:**  
  - Bullet list of touched files (full paths).  
  - Update `docs/legacy/power-pages-portal-rebuild-plan.md` → “Workstream Notes – Dashboard” with:  
    * Summary of actions  
    * Validation checklist (Studio preview steps)  
    * Any open issues (e.g., parent GUID needing rebind)  
  **Guardrails:** No PAC uploads, no Studio publishes, no deletion of duplicate records.  
  **Escalate if:** References to legacy GUIDs remain or design-system assets appear missing.

- **Agent D – wizAssessment Specialist**  
  **Objective:** Restore the wizard page with all residual-risk guidance and tab interactions for the new GUID.  
  **Inputs:**  
  - Source: `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-pages/wizassessment/`  
  - Target: `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/<new-wizassessment-guid>/`  
  **Tasks:**  
  1. Copy baseline HTML/CSS to the new GUID folder.  
  2. Verify Bootstrap/CDN references and Liquid placeholders remain unchanged.  
  3. Note any snippet or script dependencies that must be present in the environment.  
  **Deliverables:**  
  - File list + summaries.  
  - Update `docs/legacy/power-pages-portal-rebuild-plan.md` → “Workstream Notes – wizAssessment” with environment assumptions and a validation checklist (e.g., tabs, CTA).  
  **Guardrails:** No CLI uploads/publishes; do not delete archived copies.  
  **Escalate if:** Tabs or guidance blocks reference missing assets or if duplicate page folders cause confusion.

- **Agent E – Header & Navigation Specialist**  
  **Objective:** Align header template and navigation sets with the branded baseline for the new template GUIDs.  
  **Inputs:**  
  - Source: `powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup/web-templates/header/` and `/weblink-sets/default/`  
  - Target: `powerpages/rcsa-copilot-demo---rcsa-demo/web-templates/header_<new-guid>/` and matching weblink set folder.  
  **Tasks:**  
  1. Update the active header template with design-system references and CTA links (`/wizassessment`).  
  2. Sync default and mobile navigation entries to include Home, Dashboard, wizAssessment, and support pages.  
  3. Document any duplicate header/weblink records without deleting them.  
  **Deliverables:**  
  - Touched file paths.  
  - `docs/legacy/power-pages-portal-rebuild-plan.md` → “Workstream Notes – Header & Navigation” entry with findings, validation checklist, and flagged duplicates.  
  **Guardrails:** No PAC uploads or direct portal edits; staging only.  
  **Escalate if:** Header template GUIDs don’t match `website.yml` or nav bindings still reference legacy pages.

- **Agent F – Validation Lead**  
  **Objective:** Confirm staged assets render correctly in Studio before any upload/publish.  
  **Inputs:**  
  - Checklists from Workstream Notes  
  - Studio URL + new site GUID  
  **Tasks:**  
  1. In Studio, run **Sync**.  
  2. Preview `/scrdashboard_1lod`, `/wizassessment`, and the homepage/header (desktop + mobile).  
  3. Verify design-system CSS loads, CTAs route correctly, nav highlights the active page, and no 404s.  
  4. Capture screenshots or note pass/fail results.  
  **Deliverables:**  
  - Update each Workstream Notes section with validation outcomes.  
  - Flag any blockers before green-lighting PAC uploads.  
  **Guardrails:** No publishing unless explicitly approved after review.  
  **Escalate if:** Any checklist item fails or unexpected duplicates appear in Studio.

- **Agent G – Legacy Snapshot Analyst**  
  **Objective:** Harvest the stable content from Git commit `90057cd` (“Add residual risk guidance and update rebuild plan”) and translate it into actionable guidance/content for the new site GUID.  
  **Inputs:**  
  - Commit hash: `90057cd8e1e5b6c435120764df1855f5f0aa9e10`  
  - Repository paths modified in that commit (docs + wizAssessment HTML)  
  - Current new site GUID + download path from Agent A  
  **Tasks:**  
  1. Inspect the commit: `git show 90057cd --stat` and `git show 90057cd:<path>` for each touched file.  
  2. Extract the wizard HTML/CSS, residual-risk guidance, and rebuild-plan notes into a working summary (no direct overwrites yet).  
  3. Compare the commit’s content with the latest baseline (`powerpages/rcsa-copilot-demo---rcsa-demo-preEnhancedBackup`) and note deltas.  
  4. Identify any site-metadata references (old GUIDs, URLs) that must change for the new site; document replacement values.  
  5. Produce a copy-ready snippet pack (e.g., store under `docs/restoration-snapshots/90057cd/`) or articulate copy/paste instructions for Agents C/D/E.  
  **Deliverables:**  
  - Update `docs/legacy/power-pages-portal-rebuild-plan.md` → add a subsection under “Baseline Snapshot Decision” or a new “Legacy Snapshot 90057cd” entry with:  
    * Summary of extracted assets  
    * Mapping of old references → new GUIDs/URLs  
    * Recommended integration steps for dashboard/wizAssessment/header  
  - Optional: create reference files (`docs/restoration-snapshots/90057cd/<filename>.html`) if snippets are lengthy.  
  **Guardrails:** Do not overwrite current working files or run uploads. Read-only analysis, documentation, and optional copies under a new folder.  
  **Escalate if:** Commit assets diverge heavily from baseline, or there’s uncertainty on how to adapt them to the new GUID structure.

1. **Project Manager Agent**
   - Keeps `docs/legacy/power-pages-portal-rebuild-plan.md` updated with site details, page GUIDs, and decisions.
   - Confirms every workstream is editing the *new* GUID records, not the archived ones from previous trials.
   - Assigns tasks to coding agents and verifies results in Studio preview.

2. **Coding Agent – Dashboard**
   - Copy HTML/CSS from `scrDashboard_1LoD` legacy files and paste into the new page content (either through Studio or by editing `powerpages/rcsa-copilot-demo---rcsa-demo/web-pages/scrdashboard_1lod/<new-guid files>`).
   - Update links (`Start Assessment`, etc.) to point at `/wizassessment` or relevant anchors.
   - Confirm styling through `rcsa-styles.css` and adjust classes where needed.

3. **Coding Agent – wizAssessment**
   - Import the complete workflow markup from `wizAssessment.en-US.webpage.copy.html`.
   - Insert guidance note(s) for off-grid residual risk scores and ensure timeline tabs work.
   - Modularize sections if time allows (hero, risk evaluation, automation insights, submission).
   - Double-check that the target file matches the new page GUID; do not overwrite the archive copy.

4. **Coding Agent – Header / Navigation (optional)**
   - Ensure the header web template mirrors the legacy design.
   - Update web link sets to include `/scrdashboard_1lod` and `/wizassessment`.
   - Confirm the header template ID referenced in `website.yml` is the new site’s GUID.

5. **Apply Design Standards**
   - Align with `rcsa-2lod-requirements.md` and `HEADER_OPTIMIZATION_SUMMARY.md` for CX/UX.
   - Keep data static/dummy unless expressly updated.

---

## 4. Validation & Publish
- Preview each page in Power Pages Studio after migration.
- Use `https://<site>/_services/about` → **Clear cache** (or restart from make.powerpages.com) to flush stale configuration.
- Test navigation and ensure the public URLs resolve without 404s (`/scrdashboard_1lod`, `/wizassessment`, optionally `/`).
- Capture screenshots and note any deltas in the rebuild plan.
- When satisfied, publish the site and copy the public URL for demo readiness.

---

## 5. Version Control & Handoff
- Run `pac powerpages download --path <export-folder> --environment https://org601a79e1.crm.dynamics.com --modelVersion 2 --webSiteId <guid>` to capture the live site back into the repo structure. Download after any Studio edits so the repo matches reality.
- Before committing, inspect `.portalconfig/*manifest.yml`. If it contains legacy GUIDs, strip those sections or rewrite them so future uploads target the new site. Remove archived pages/templates you do not plan to redeploy.
- Commit changes with clear messages (e.g., `Port wizAssessment to V5 site`). Avoid committing temporary directories (`local-demo`, `migration-output`, etc.).
- Update `docs/legacy/power-pages-portal-rebuild-plan.md` and this playbook with any new lessons learned.
- Share credentials or tokens separately; never commit secrets.

---

## 6. Future Optimizations
- Convert repeating UI elements into reusable web templates or snippets.
- Externalize static content (risk scores, AI insights) into snippets for faster editing.
- Establish automation scripts for CLI upload/download to speed up redeployments.
- Consider a dedicated Power Platform environment (non-trial) to reduce the frequency of rebuilds.

---

## 7. Common Pitfalls & Recoveries
- **Duplicate pages after upload:** Caused by uploading an old manifest. Remedy by starting a new site or purging duplicate records, then re-upload only targeted assets.
- **Broken navigation or 404s:** Check `weblink-sets/` to ensure links reference the active GUIDs and that site markers (`sitemarker.yml`) point to the new pages.
- **Missing design system assets:** Confirm `~/design-system/rcsa-styles.css` is uploaded and versioned, and the header template references that path.
- **CLI errors referencing deprecated flags:** Use `--environment` instead of `--url`; upgrade PAC if necessary.

With this checklist, rebuilding the demo should take hours instead of a full day. Use the plan as the single source of truth and keep it updated after every iteration.
