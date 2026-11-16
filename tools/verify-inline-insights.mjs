import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,assessmentContentKey} from '../src/scripts/demo/model.js';
import {inlineInsights,insightContext,insightDrawer} from '../src/scripts/demo/inline-insights.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
const json=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,context]=await Promise.all(['workflow-demo.json','risk-intelligence.json','assessment-context.json'].map(json));
const data={...workflow,intelligence,context,sources:[...workflow.sources,...intelligence.sources,...context.sources]};
const s=createInitial(data),before=assessmentContentKey(s),history=JSON.stringify(s.history);
for(const id of ['unauthorized','details','cutoff'])for(const stage of ['inherent','residual']){
 s.selectedRisk=id;const c=insightContext(data,s,stage);assert(c.supported);assert.equal(c.findings.length,2);
 const html=assessmentView(data,s,stage);assert(html.includes('AI insights'));assert(!html.includes('View full analysis'));assert(!html.includes('class="upgrade-rating"'));
 const drawer=insightDrawer(data,s,{stage});assert(drawer.includes('Supporting records'));assert(!drawer.includes('analysis-direct-nav'));
 for(const sourceId of c.findings[0].sourceIds)assert(drawer.includes(`data-source="${sourceId}"`));
}
assert.equal(assessmentContentKey(s),before);assert.equal(JSON.stringify(s.history),history);
s.selectedRisk='unauthorized';assert(!inlineInsights(data,s,'inherent').includes('The available test does not cover urgent requests.'));
assert(inlineInsights(data,s,'residual').includes('The available test does not cover urgent requests.'));
assert(insightDrawer(data,s,{pane:'research'}).includes('FBI IC3'));
const submitted=seedScene(data,'submitted');assert(insightDrawer(data,submitted).includes('data-version="1"'));
const originalName=submitted.snapshots[0].risks.unauthorized.name;submitted.risks.unauthorized.name='Later draft name';assert.equal(insightContext(data,submitted).risk.name,originalName);
const changed=structuredClone(data);changed.sources.find(source=>source.id==='procedure').excerpt='Changed since submission';assert.equal(insightContext(changed,submitted).supported,false);
s.risks.unauthorized.scenarioId='owner-defined';assert.equal(insightContext(data,s).supported,false);assert(!inlineInsights(data,s,'inherent').includes('impersonation harder to spot'));
console.log('PASS: concise inline insights, stage-specific reasoning, linked records and research, frozen source context, unsupported scopes and view-only approval boundaries.');
