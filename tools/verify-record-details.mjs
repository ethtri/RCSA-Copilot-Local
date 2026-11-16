import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,assessmentContentKey} from '../src/scripts/demo/model.js';
import {riskDetails,controlDetails} from '../src/scripts/demo/record-details.js';
import {addDiscoveredRisk,discoverRisks} from '../src/scripts/demo/upgrade-model.js';
import {controlsWorkspace} from '../src/scripts/demo/controls.js';
const json=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,context,assistance]=await Promise.all(['workflow-demo.json','risk-intelligence.json','assessment-context.json','control-assistance.json'].map(json));
const data={...workflow,intelligence,context,controlAssistance:assistance,sources:[...workflow.sources,...intelligence.sources,...context.sources]};
const s=createInitial(data),before=assessmentContentKey(s),history=JSON.stringify(s.history);
for(const risk of Object.values(s.risks)){
 const html=riskDetails(data,s,risk);
 for(const label of ['Risk ID','Possible causes','What could happen','Possible harm','Mapped controls','Systems and data'])assert(html.includes(label));
 assert(html.includes('class="record-details risk-record-details"'));assert(!html.includes('<details class="record-details risk-record-details" open'));
}
for(const control of data.controls){
 const html=controlDetails(data,s,control);
 for(const label of ['Control ID','Control owner','When it runs','How it works','Evidence to retain','Test scope and date','Mapped risks'])assert(html.includes(label));
 assert(html.includes(control.design));
}
assert.equal(assessmentContentKey(s),before);assert.equal(JSON.stringify(s.history),history);
s.risks.unauthorized.scenarioId='owner-defined';assert(!riskDetails(data,s,s.risks.unauthorized).includes('External fraud'));
s.risks.unauthorized.scenarioId='unauthorized';s.risks.unauthorized.extensions=[{name:'New scope'}];assert(!riskDetails(data,s,s.risks.unauthorized).includes('External fraud'));
const custom={id:'proposed-x',name:'Custom check',owner:'Owner',purpose:'Check',design:'Proposed local design',status:'Proposed',test:'test'};s.customControls.push(custom);
const proposed=controlDetails(data,s,custom);assert(proposed.includes('No implementation or test evidence recorded.'));assert(!proposed.includes('25 standard'));
const editedData=structuredClone(data);editedData.controls[0].design='A different control scope';assert(!controlDetails(editedData,s,editedData.controls[0]).includes('Preventive · manual verification'));
const submitted=seedScene(data,'submitted'),stored=controlDetails(data,submitted,data.controls[0]);assert(stored.includes('data-version="1"'));
const missing=structuredClone(submitted);missing.snapshots=[];assert(controlDetails(data,missing,data.controls[0]).includes('were not preserved'));
const changed=structuredClone(data);changed.controls[0].design='Later replacement';changed.sources.find(x=>x.id==='test').scope='Later test scope';
assert(!controlDetails(changed,submitted,changed.controls[0]).includes('Later replacement'));assert(!controlDetails(changed,submitted,changed.controls[0]).includes('Later test scope'));
const html=controlsWorkspace(data,createInitial(data));assert(html.includes('risk-record-details'));assert(html.includes('control-record-details'));
const discovered=createInitial(data),candidate=discoverRisks(data,discovered)[0],entered={...candidate,cause:'An owner-entered cause.',event:'An owner-entered event.',harm:'Owner-entered customer harm.',scope:'Owner-entered process scope.',owner:'Owner-entered risk owner'};
assert(addDiscoveredRisk(discovered,data,candidate.id,entered).ok);
const enteredRisk=discovered.risks[candidate.id],enteredHtml=riskDetails(data,discovered,enteredRisk);
for(const value of ['An owner-entered cause.','An owner-entered event.','Owner-entered customer harm.','Owner-entered process scope.','Owner-entered risk owner'])assert(enteredHtml.includes(value));
const frozen=structuredClone(discovered);frozen.submitted=true;frozen.versionNumber=1;frozen.snapshots=[{version:1,risks:structuredClone(frozen.risks),sources:structuredClone(data.sources),controls:structuredClone(data.controls),ratingMethod:structuredClone(frozen.evidenceContext.ratingMethod)}];
for(const key of ['cause','event','harm','scope','owner'])frozen.risks[candidate.id][key]='Later edit';
const frozenHtml=riskDetails(data,frozen,frozen.risks[candidate.id]);assert(!frozenHtml.includes('Later edit'));
for(const value of ['An owner-entered cause.','An owner-entered event.','Owner-entered customer harm.','Owner-entered process scope.','Owner-entered risk owner'])assert(frozenHtml.includes(value));
console.log('PASS: accessible risk/control details, unknown fields and custom scopes, proposed-control limits, frozen submitted definitions/sources and view-only behavior.');

// The default view must expose the actual selected-risk links before AI options.
const visibleMapped=(data,state)=>{const html=controlsWorkspace(data,state);return html.slice(html.indexOf('<section class="mapped-controls-overview"'),html.indexOf('<details class="record-details risk-record-details"'));};
const overviewState=createInitial(data),overview=visibleMapped(data,overviewState);
assert(overview.includes('Callback verification'));assert(overview.includes('Supervisory approval'));assert(!overview.includes('Customer payment confirmation'));
assert(overview.includes('data-control="callback"'));assert(overview.includes('Current controls'));
overviewState.selectedRisk='details';const detailOverview=visibleMapped(data,overviewState);assert(detailOverview.includes(data.controls.find(c=>c.id==='details-check').name));assert(!detailOverview.includes('Callback verification'));
overviewState.selectedRisk='unauthorized';overviewState.customControls.push(custom);overviewState.risks.unauthorized.controls.push(custom.id);const proposedOverview=visibleMapped(data,overviewState);assert(proposedOverview.includes('Proposed controls'));assert(proposedOverview.includes('These provide no current protection.'));
overviewState.risks.unauthorized.controls=[];assert(visibleMapped(data,overviewState).includes('No controls are mapped'));
const frozenOverview=visibleMapped(changed,submitted);assert(!frozenOverview.includes('Later replacement'));
