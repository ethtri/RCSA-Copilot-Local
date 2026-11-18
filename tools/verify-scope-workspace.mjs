import {handleUpgradeActions} from '../src/scripts/demo/upgrade-view.js';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,assessmentContentKey,sourceRecords,assessmentProjection,requirements} from '../src/scripts/demo/model.js';
import {defaultScope,scopeRecord,preparedScopeMatches,beginScopeEdit,mutateScopeField,saveScope,cancelScopeEdit,confirmScope,excludeScopeRisk,restoreScopeRisk} from '../src/scripts/demo/scope-model.js';
import {scopeWorkspace} from '../src/scripts/demo/scope-workspace.js';
import {signalFindings} from '../src/scripts/demo/signal-analysis.js';
import {ratingProposal,discoverRisks,addDiscoveredRisk,disposeDiscoveredRisk,removeDraftRisk} from '../src/scripts/demo/upgrade-model.js';

const load=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,research,context,signals,assistance]=await Promise.all(['workflow-demo.json','risk-intelligence.json','research-demo.json','assessment-context.json','assessment-signals.json','control-assistance.json'].map(load));
const data={...workflow,intelligence,research,context,signals,assistance,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources,...signals.sources]};
const s=createInitial(data),base=scopeRecord(s),business=assessmentContentKey(s),history=JSON.stringify(s.history),scores=JSON.stringify(Object.values(s.risks).map(r=>[r.inherent,r.residual,r.controlConclusion]));
assert(base);assert(preparedScopeMatches(s));assert(defaultScope(data));
const independent=scopeRecord(s);independent.process='Mutated returned object';assert.equal(scopeRecord(s).process,base.process);
beginScopeEdit(s);assert(s.scopeDraft);mutateScopeField(s,'scopeDraft.process','Edited but not saved');assert.equal(assessmentContentKey(s),business);assert.equal(scopeRecord(s).process,base.process);assert.equal(JSON.stringify(s.history),history);
cancelScopeEdit(s);assert.equal(assessmentContentKey(s),business);assert.equal(scopeRecord(s).process,base.process);
beginScopeEdit(s);mutateScopeField(s,'scopeDraft.process','');assert.equal(saveScope(s,data).ok,false);assert.equal(scopeRecord(s).process,base.process);cancelScopeEdit(s);

// A coverage change is an owner action. It keeps judgments but requires renewed confirmation.
s.scope=true;for(const risk of Object.values(s.risks)){risk.inherentConfirmed=true;risk.controlsConfirmed=true;risk.residualConfirmed=true;}
beginScopeEdit(s);mutateScopeField(s,'scopeDraft.period','Q1 2027');const result=saveScope(s,data);assert(result.ok,result.message);
assert.equal(scopeRecord(s).period,'Q1 2027');assert.equal(s.scope,false);assert(!preparedScopeMatches(s));
assert(Object.values(s.risks).every(r=>!r.inherentConfirmed&&!r.controlsConfirmed&&!r.residualConfirmed));
assert.equal(JSON.stringify(Object.values(s.risks).map(r=>[r.inherent,r.residual,r.controlConclusion])),scores);
assert.equal(signalFindings(data,s.risks.unauthorized,'inherent',sourceRecords(data,s),s).length,0);
assert(!ratingProposal(data,s,'unauthorized','inherent')?.supported);assert.equal(discoverRisks(data,s).length,0);
assert.notEqual(assessmentContentKey(s),business);
confirmScope(s,data);assert(s.scope);

// Owner assignment is metadata, not permission to rewrite ratings or impersonate that owner.
const ownerState=createInitial(data);ownerState.scope=true;const ownerScores=JSON.stringify(ownerState.risks);beginScopeEdit(ownerState);mutateScopeField(ownerState,'scopeDraft.owner','Dana Lee');assert(saveScope(ownerState,data).ok);assert.equal(ownerState.scope,false);assert(preparedScopeMatches(ownerState));assert.equal(JSON.stringify(ownerState.risks),ownerScores);assert.equal(ownerState.role,'first');

const editing=createInitial(data);confirmScope(editing,data);beginScopeEdit(editing);mutateScopeField(editing,'scopeDraft.owner','Unsaved owner');assert.equal(confirmScope(editing,data).ok,false);assert(!requirements(editing).find(row=>row.stage==='changes').done);cancelScopeEdit(editing);assert(requirements(editing).find(row=>row.stage==='changes').done);
const excluded=createInitial(data);excluded.scope=true;const oldExcluded=JSON.stringify(excluded.risks.details.inherent);assert(!excludeScopeRisk(excluded,data,'details','').ok);assert(excludeScopeRisk(excluded,data,'details','Not included in this process review.').ok);assert(excluded.risks.details.removed);assert.equal(excluded.scope,false);assert.equal(JSON.stringify(excluded.risks.details.inherent),oldExcluded);excluded.scope=true;assert(restoreScopeRisk(excluded,data,'details').ok);assert.equal(excluded.scope,false);assert(!excluded.risks.details.removed);assert(!excluded.risks.details.inherentConfirmed);assert.equal(JSON.stringify(excluded.risks.details.inherent),oldExcluded);
const last=createInitial(data);excludeScopeRisk(last,data,'details','Outside scope');excludeScopeRisk(last,data,'cutoff','Outside scope');assert.equal(excludeScopeRisk(last,data,'unauthorized','Outside scope').ok,false);
const readonly=createInitial(data);readonly.role='second';const lockedKey=assessmentContentKey(readonly);beginScopeEdit(readonly);mutateScopeField(readonly,'scopeDraft.process','Unauthorized edit');saveScope(readonly,data);confirmScope(readonly,data);assert.equal(assessmentContentKey(readonly),lockedKey);assert.equal(readonly.scope,false);
const submitted=seedScene(data,'submitted'),saved=scopeRecord(submitted);assert(saved);const submittedKey=assessmentContentKey(submitted);beginScopeEdit(submitted);mutateScopeField(submitted,'scopeDraft.process','Unauthorized submitted edit');saveScope(submitted,data);assert.equal(assessmentContentKey(submitted),submittedKey);
submitted.assessmentScope={...scopeRecord(submitted),owner:'Later live owner',process:'Later live process'};assert.equal(scopeRecord(submitted).owner,saved.owner);assert.equal(scopeRecord(submitted).process,saved.process);assert.equal(assessmentProjection(submitted,'current',data).assessmentScope.process,saved.process);
const legacy=structuredClone(submitted);delete legacy.snapshots[0].assessmentScope;assert.equal(scopeRecord(legacy),null);assert(!preparedScopeMatches(legacy));

// Inventory changes cannot leave a previous scope confirmation looking current.
const inventory=createInitial(data);inventory.scope=true;const candidate=discoverRisks(data,inventory)[0];assert(candidate);assert(addDiscoveredRisk(inventory,data,candidate.id).ok);assert.equal(inventory.scope,false);inventory.scope=true;assert(removeDraftRisk(inventory,candidate.id,'Outside the revised process boundary'));assert.equal(inventory.scope,false);
const extended=createInitial(data);extended.scope=true;assert(disposeDiscoveredRisk(extended,data,'duplicate-release','extend',{reason:'Assess repeated release within the existing payment risk.',riskId:'unauthorized'}).ok);assert.equal(extended.scope,false);
// Scope views are read-only, source-bound and reflect the included inventory.
const renderState=createInitial(data),renderKey=assessmentContentKey(renderState),renderHistory=JSON.stringify(renderState.history),html=scopeWorkspace(data,renderState);assert.equal((html.match(/data-scope-risk=/g)||[]).length,3);assert.equal((html.match(/<h3>Unauthorized wire transfer<\/h3>/g)||[]).length,1);assert.match(html,/data-source="test"[^>]*aria-label="View evidence for Unauthorized wire transfer"/);assert(html.includes('Why it may be missing'));assert.equal(assessmentContentKey(renderState),renderKey);assert.equal(JSON.stringify(renderState.history),renderHistory);
excludeScopeRisk(renderState,data,'details','Outside this review');const fewer=scopeWorkspace(data,renderState);assert(fewer.includes('2 included'));assert.equal((fewer.match(/data-scope-risk=/g)||[]).length,2);assert(!fewer.includes('data-scope-risk="details"'));assert(fewer.includes('Excluded risks (1)'));
const customView=scopeWorkspace(data,s);assert(customView.includes('Check the evidence before reusing earlier recommendations'));assert(!customView.includes('8 to 12'));assert(!customView.includes('Possible missing risk'));
submitted.scope=false;submitted.snapshots[0].scope=true;const frozenHtml=scopeWorkspace(data,submitted);assert(frozenHtml.includes('Scope confirmed'));assert(frozenHtml.includes(saved.owner));assert(!frozenHtml.includes('Later live owner'));
const noSources=seedScene(data,'submitted');noSources.snapshots[0].sources=[];const noSourcesHtml=scopeWorkspace(data,noSources);assert(!noSourcesHtml.includes('Urgent payments now have a separate route.'),'Do not assert a process change without preserved supporting records');
const missing=structuredClone(submitted);missing.snapshots=[];const missingHtml=scopeWorkspace(data,missing);assert(/not preserved|unavailable/.test(missingHtml));assert(!missingHtml.includes('Unauthorized wire transfer'),'A missing submitted projection cannot substitute the live risk inventory');
console.log('PASS: editable scope approval, cancel/validation, scope-sensitive assistance, preserved judgments, assigned owner versus actor, frozen and legacy submissions, and inventory reconfirmation.');

// Adding a suggestion from Scope keeps the user on the inventory for confirmation.
const fromScope=createInitial(data);confirmScope(fromScope,data);const proposed=discoverRisks(data,fromScope)[0];fromScope.upgradeDraft={...proposed};let navigated='',renders=0;
handleUpgradeActions({data,state:fromScope,el:{dataset:{action:'upgrade-add-risk',candidate:proposed.id}},route:'assessment/changes',save(){},closeDialog(){},render(){renders++;},navigate(value){navigated=value;},notify(){}});
assert(fromScope.risks[proposed.id]);assert.equal(fromScope.scope,false);assert.equal(navigated,'');assert.equal(renders,1);assert(scopeWorkspace(data,fromScope).includes('4 included'));
