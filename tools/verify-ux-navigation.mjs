import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,requirements,seedScene} from '../src/scripts/demo/model.js';
import {assessmentLaunch,dashboardView} from '../src/scripts/demo/dashboard.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
import {analysisWorkspace} from '../src/scripts/demo/analysis-workspace.js';
import {handleControlAssistanceAction} from '../src/scripts/demo/control-assistance-actions.js';

const read=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,research,context,assistance]=await Promise.all(['workflow-demo.json','risk-intelligence.json','research-demo.json','assessment-context.json','control-assistance.json'].map(read));
const data={...workflow,intelligence,research,context,assistance,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources]};
const state=createInitial(data),main=state.risks.unauthorized;
assert.equal(assessmentLaunch(state).stage,'changes');
state.scope=true;assert.equal(assessmentLaunch(state).stage,'inherent');
main.inherentConfirmed=true;assert.equal(assessmentLaunch(state).stage,'controls');
main.controlsConfirmed=true;assert.equal(assessmentLaunch(state).stage,'discovery');
state.dependency='qualified';assert.equal(assessmentLaunch(state).stage,'residual');
main.residualConfirmed=true;main.residual.likelihoodRationale='Standard wires were sampled.';main.residual.impactRationale='A release error could cause a loss.';state.risks.details.controlsConfirmed=false;
assert.deepEqual(assessmentLaunch(state),{label:'Review control evidence',risk:'details',stage:'controls'},'Resume must carry the next risk as well as the stage');
const excluded=structuredClone(state);
excluded.risks.unauthorized.removed=true;
const scopedDashboard=dashboardView(data,excluded);
assert(!scopedDashboard.includes('Inspect shared source'));
assert(!scopedDashboard.includes('The September test predates'));
assert.equal(assessmentLaunch(excluded).risk,'details');
const blocker=requirements(state).find(item=>item.risk==='details'&&item.key!=='carry-forward'&&!item.done);
assert.equal(blocker.stage,'controls');
state.risks.details.mappingApplicability={sample:{conclusion:'unassessed'}};
state.risks.details.controlsConfirmed=true;
assert.equal(requirements(state).find(item=>item.risk==='details'&&item.key!=='carry-forward'&&!item.done).stage,'controls','Unassessed mappings must link to coverage assessment');
const review=assessmentView(data,state,'review');
const detailBlocker=requirements(state).find(item=>item.risk==='details'&&item.key!=='carry-forward'&&!item.done);
assert(review.includes('Review control evidence · '+state.risks[detailBlocker.risk].name),'Owner review exposes the current requirement as an accessible repair action');
assert(review.includes('data-risk="details" data-stage="controls"'));
const carryForward=requirements(state).find(item=>item.risk==='details'&&item.key==='carry-forward');assert(carryForward&&!carryForward.done,'Unreviewed starting judgments remain an explicit owner requirement.');assert.match(review,/<button[^>]*data-action="carry-forward-review"[^>]*data-risk="details"/,'Starting-assessment requirements open the owner review dialog.');
for(const scene of ['submitted','challenge','response','complete']){
 const s=seedScene(data,scene);assert.equal(assessmentLaunch(s).stage,'review');
 s.role='second';assert.equal(assessmentLaunch(s).stage,'review');
}
for(const [origin,stage] of [['response','response'],['discovery','controls'],['review','review']]){
 const s=createInitial(data);s.analysisReturn=origin;s.analysisPane='sources';
 const html=assessmentView(data,s,'analysis');
 assert(html.includes(`<option value="${stage}" selected>`),'Analysis must retain its originating assessment step');
}
const support=createInitial(data);support.selectedRisk='details';support.analysisPane='options';
const supportHtml=analysisWorkspace(data,support);
assert(!supportHtml.includes('data-pane="options"'),'Supporting risks should not expose generic response destinations');
assert(supportHtml.includes('data-pane="overview" aria-pressed="true"'),'Unsupported old panes fall back to a real overview');
assert(!supportHtml.includes('premium-briefing-nav'),'Analysis should have one direct navigation level');
const planning=createInitial(data),generate=(attrs={})=>handleControlAssistanceAction({data,state:planning,el:{dataset:{action:'ca-generate-plan',...attrs}},showDialog:()=>{},closeDialog:()=>{},notify:()=>{},save:()=>{},render:()=>{},navigate:()=>{}});
generate();assert.equal(planning.controlAssistance.planDraft.candidateId,'wire-new','The default plan must match the recommendation shown as selected');
planning.controlAssistance.selectedByRisk.unauthorized='wire-enhance';generate();
assert.equal(planning.controlAssistance.planDraft.candidateId,'wire-enhance','A selected enhancement must produce its own plan');
generate({candidate:'wire-existing',regenerate:'true'});
assert.equal(planning.controlAssistance.planDraft.candidateId,'wire-existing','Explicit regeneration retains the linked candidate');
assert.equal(planning.risks.unauthorized.riskResponse.created,false,'Generating a plan never records a response');
console.log('PASS: assessment resume across risks and roles, actionable blockers, analysis return steps, supporting-risk destinations and selected-control planning.');
