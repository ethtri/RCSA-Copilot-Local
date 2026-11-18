import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,currentRating,sendAssessment,seedScene} from '../src/scripts/demo/model.js';
import {saveMapping,removeMapping} from '../src/scripts/demo/mappings.js';
import {ensureAssistance,assistanceCase,recommendationSet,coverageAnalysis,preparePlan,recordAssistanceDecision,checkControlClaim,controlSetSignature} from '../src/scripts/demo/control-assistance.js';

const read=async path=>JSON.parse(await readFile(new URL('../'+path,import.meta.url),'utf8'));
const [workflow,intelligence,research,context,assistance]=await Promise.all(['assets/data/workflow-demo.json','assets/data/risk-intelligence.json','assets/data/research-demo.json','assets/data/assessment-context.json','assets/data/control-assistance.json'].map(read));
const data={...workflow,intelligence,context,assistance,sources:[...workflow.sources,...intelligence.sources,...research.sources,...context.sources]};
const originalData=structuredClone(data),sourceIds=new Set(data.sources.map(x=>x.id));
for(const riskId of ['unauthorized','details','cutoff']){
  const s=createInitial(data);s.selectedRisk=riskId;
  const before=structuredClone(s),suggestions=recommendationSet(data,s),pack=assistanceCase(data,riskId);
  assert.deepEqual(s,before,'Reading recommendations must not create decisions or alter workflow');
  assert.deepEqual(suggestions.map(c=>c.kind),['existing','enhance','new']);
  for(const c of suggestions){
    assert(c.gap&&c.addresses&&c.limits&&c.conclusion);
    assert(c.sourceIds.every(id=>sourceIds.has(id)),'Recommendation sources must resolve');
    assert(c.plan.implementationTasks.length&&c.plan.validationTasks.length,'A useful plan distinguishes implementation from validation');
    assert(c.plan.validationTasks.every(t=>t.evidence.trim()));
    if(c.kind!=='existing')for(const key of ['name','owner','purpose','design','frequency','population','informationSource','exceptions','evidenceRetained','validation'])assert(c.designDraft[key]?.trim(),key+' is required in an operational design');
  }
  assert(pack.unsuitable.reason&&pack.unsuitable.sourceIds.every(id=>sourceIds.has(id)));
  const candidate=suggestions.find(c=>c.kind==='new'),rating=structuredClone(currentRating(s,riskId));
  const initial=coverageAnalysis(data,s);
  assert(initial.findings.some(f=>f.id==='design-gap'));
  assert(initial.findings.some(f=>f.id==='operating-scope'));
  const initialSignature=controlSetSignature(data,s);
  assert(saveMapping(data,s,{rationale:candidate.addresses,applicability:'covers',control:{...candidate.designDraft,basis:candidate.sourceIds[0],assistance:{riskId,candidateId:candidate.id,kind:candidate.kind}}}));
  const custom=s.customControls.at(-1),analysis=coverageAnalysis(data,s);
  assert(analysis.supported);
  assert.deepEqual(analysis.designCandidateIds,[candidate.id]);
  assert(!analysis.findings.some(f=>f.id==='design-gap'),'A mapped proposed design changes the design question');
  assert(analysis.findings.some(f=>f.id==='implementation-open'),'A proposal does not prove implementation');
  assert(analysis.findings.some(f=>f.id==='operating-scope'),'Adding a design cannot close the operating evidence gap');
  assert.deepEqual(currentRating(s,riskId),rating,'Assistance preserves last-confirmed risk');
  assert.notEqual(controlSetSignature(data,s),initialSignature);
  assert(recordAssistanceDecision(s,{riskId,candidateId:candidate.id,kind:candidate.kind,disposition:'used',rationale:'The owner selected this proposed mechanism for the documented gap.',controlId:custom.id}));
  const plan=preparePlan(data,s),stateBeforePlanning=structuredClone(s);
  assert.equal(plan.candidateId,candidate.id);
  assert.equal(plan.controlId,custom.id);
  assert.equal(plan.protection,custom.design);
  assert.equal(plan.controlSetSignature,controlSetSignature(data,s));
  assert.equal(plan.needsReview,false);
  assert.deepEqual(s,stateBeforePlanning,'Preparing a plan does not silently overwrite owner work');
  const a=ensureAssistance(s);a.plans[riskId]={...plan,protection:'Owner-edited protection',implementationTasks:[{title:'Owner-edited task',owner:'Owner',due:'2026-11-27'}]};
  const storedPlan=structuredClone(a.plans[riskId]);preparePlan(data,s,riskId,candidate.id);
  assert.deepEqual(a.plans[riskId],storedPlan,'Regeneration is a preview, not an overwrite');
  const changedSignature=controlSetSignature(data,s);custom.design+=' Owner adds an explicit release record.';
  assert.notEqual(controlSetSignature(data,s),changedSignature,'Edited operational wording makes older plan basis stale');
  assert.equal(preparePlan(data,s).protection,custom.design,'The plan uses edited design text rather than restoring the fixture');
  custom.owner='Urgent Payments Lead';
  const editedOwnerPlan=preparePlan(data,s);
  assert.equal(editedOwnerPlan.owner,'Urgent Payments Lead');
  assert(editedOwnerPlan.implementationTasks.every(t=>t.owner==='Urgent Payments Lead'),'Design ownership carries into implementation work');
  assert(editedOwnerPlan.validationTasks.every(t=>t.owner==='Payments Control Assurance'),'Validation accountability stays distinct');
  assert(removeMapping(s,custom.id));
  assert.equal(coverageAnalysis(data,s).designCandidateIds.length,0,'Removed proposals no longer count as design coverage');
  assert(coverageAnalysis(data,s).findings.some(f=>f.id==='design-gap'));
  assert.notEqual(preparePlan(data,s).candidateId,candidate.id,'An old used decision does not keep a removed design selected');
  assert.equal(preparePlan(data,s,riskId,'missing-candidate'),null);
  assert.equal(checkControlClaim(data,s,pack.qualifiedConclusion).status,'supported');
  assert.equal(checkControlClaim(data,s,pack.overbroadClaim).status,'overbroad');
  assert.equal(checkControlClaim(data,s,'The proposed conclusion needs bespoke legal and process analysis.').status,'unknown','Arbitrary text is not presented as semantically evaluated');
  assert.equal(recommendationSet(data,s,riskId,'unsupported-objective').length,0);
}

const s=createInitial(data),baseRating=structuredClone(currentRating(s,'unauthorized'));
assert.equal(ensureAssistance(s),s.controlAssistance);
const existing=recommendationSet(data,s)[0];
assert.equal(existing.existingControlId,'customer-confirmation');
assert.match(existing.limits,/does not verify/);
assert.match(existing.limits,/The available test does not cover urgent requests/);
assert(recordAssistanceDecision(s,{riskId:'unauthorized',candidateId:existing.id,kind:'existing',disposition:'dismissed',rationale:'Does not establish independent urgent identity verification.'}));
assert.equal(recommendationSet(data,s)[0].disposition,'dismissed');
assert.deepEqual(currentRating(s,'unauthorized'),baseRating);
assert.equal(checkControlClaim(data,s,'Both checks are independent.').status,'overbroad');
assert.notEqual(checkControlClaim(data,s,'Both checks are not proven independent.').status,'overbroad','Negation is not a positive claim');
assert.notEqual(checkControlClaim(data,s,'Independence is not established; that does not prove that the controls are dependent.').status,'overbroad');

const beforeInvalid=structuredClone(s);
assert.equal(recordAssistanceDecision(s,{riskId:'unauthorized',candidateId:'wire-new',kind:'new',disposition:'dismissed',rationale:''}),false);
assert.equal(recordAssistanceDecision(s,{riskId:'unknown',candidateId:'x',kind:'new',disposition:'used',rationale:'Invalid'}),false);
assert.equal(recordAssistanceDecision(s,{riskId:'unauthorized',candidateId:'wire-new',kind:'new',disposition:'used',rationale:'Not mapped',controlId:'missing'}),false);
assert.deepEqual(s,beforeInvalid,'Rejected decisions are atomic');
assert(saveMapping(data,s,{rationale:'Owner evaluates this separately.',control:{name:'Bespoke control',owner:'Owner',purpose:'Custom objective',design:'Custom process-specific design.'}}));
const customAnalysis=coverageAnalysis(data,s);
assert.equal(customAnalysis.supported,false,'Unknown mapping combinations expose their prepared-analysis boundary');
assert(customAnalysis.findings.some(f=>f.id==='unsupported-mappings'));
s.risks.unauthorized.controls=[];
const empty=coverageAnalysis(data,s);
assert.match(empty.findings.find(f=>f.id==='no-mappings').detail,/does not establish that no controls exist/);

const cutoff=createInitial(data);cutoff.selectedRisk='cutoff';
assert.equal(coverageAnalysis(data,cutoff).noAdditionalControlRequired,true,'Evidence collection can be the next step without prescribing another design');
for(const blocked of [Object.assign(createInitial(data),{role:'second'}),seedScene(data,'submitted')]){
  const original=structuredClone(blocked);
  assert.equal(recordAssistanceDecision(blocked,{riskId:'unauthorized',candidateId:'wire-new',kind:'new',disposition:'dismissed',rationale:'Unauthorized mutation'}),false);
  assert.deepEqual(blocked,original,'Second line/submitted records remain read-only');
}
const noFixture={...data,assistance:undefined};
assert.equal(recommendationSet(noFixture,createInitial(data)).length,0);
assert.equal(coverageAnalysis(noFixture,createInitial(data)).supported,false);
assert.equal(preparePlan(noFixture,createInitial(data)),null);
assert.deepEqual(data,originalData,'All fixture and library definitions remain immutable');
console.log('PASS: three risk-specific recommendation sets, operational design drafts, mapping-dependent gaps, no operating credit, edited-design planning, stale-basis signatures, non-overwriting previews, durable owner decisions, bounded claim checks and role/version authority.');
