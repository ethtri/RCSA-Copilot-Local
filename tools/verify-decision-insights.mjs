import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,assessmentContentKey} from '../src/scripts/demo/model.js';
import {decisionInsights} from '../src/scripts/demo/decision-insights.js';

const read=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence]=await Promise.all(['workflow-demo.json','risk-intelligence.json'].map(read));
const data={...workflow,intelligence,sources:[...workflow.sources,...intelligence.sources]},s=createInitial(data);
const before=assessmentContentKey(s),sourcesBefore=JSON.stringify(data.sources);
for(const riskId of ['unauthorized','details','cutoff'])for(const stage of ['inherent','residual']){
 const risk=s.risks[riskId],rows=decisionInsights(data,risk,stage,data.sources);
 assert.equal(rows.length,2,`${riskId}/${stage}: two decision-relevant findings`);
 for(const row of rows){
  assert(row.why&&row.limit&&row.signal?.value&&row.sourceIds.length);
  assert(row.sourceIds.every(id=>data.sources.some(source=>source.id===id)),'Every claim has available source records');
  assert(!row.title.startsWith('Check ')&&!row.title.startsWith('Consider '),'Findings are observations, not generic advice');
 }
 const withoutSource=data.sources.filter(source=>source.id!==rows[0].sourceIds[0]);
 assert.deepEqual(decisionInsights(data,risk,stage,withoutSource),[],`${riskId}/${stage}: incomplete evidence prevents prepared claims`);
 const ownerDefined={...risk,scenarioId:'owner-defined'};
 assert.deepEqual(decisionInsights(data,ownerDefined,stage,data.sources),[]);
 assert.deepEqual(decisionInsights(data,{...risk,extensions:[{id:'changed-scope'}]},stage,data.sources),[]);
 rows[0].title='Mutated caller copy';
 assert.notEqual(decisionInsights(data,risk,stage,data.sources)[0].title,rows[0].title);
}

// The demo must not reuse quantified findings after the linked numbers change.
for(const [riskId,stage,sourceId,from,to] of [
 ['unauthorized','inherent','ri-wire-activity','Seven requests','Nine requests'],
 ['unauthorized','residual','test','25 standard-wire samples','10 standard-wire samples'],
 ['details','inherent','ri-details-event','$84,000','$42,000'],
 ['details','residual','details-test','25 sampled items','12 sampled items'],
 ['cutoff','inherent','ri-cutoff-nearmiss','seventeen-minute','forty-minute'],
 ['cutoff','residual','ri-cutoff-issue','QI-04 remains open','QI-04 is closed']
]){
 const changed=structuredClone(data.sources),source=changed.find(row=>row.id===sourceId);
 const replace=text=>text.replace(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'gi'),to);
 source.excerpt=replace(source.excerpt);source.scope=replace(source.scope);
 assert.deepEqual(decisionInsights(data,s.risks[riskId],stage,changed),[],`${sourceId}: changed fact suppresses stale finding`);
}

const wire=decisionInsights(data,s.risks.unauthorized,'inherent',data.sources);
assert(wire[0].limit.includes('not a fraud rate'));
assert(wire[1].limit.includes('cannot establish how often'));
const changedMapping={...s.risks.unauthorized,controls:['callback']};
assert(!decisionInsights(data,changedMapping,'residual',data.sources)[1].title.includes('Both checks'));
assert.equal(assessmentContentKey(s),before,'Reading insights changes no assessment data');
assert.equal(JSON.stringify(data.sources),sourcesBefore,'Reading insights changes no evidence');
console.log('PASS: six source-backed decision lenses, quantified facts and limits, missing/changed evidence guards, scope and mapping awareness, immutable results and approval boundary.');
