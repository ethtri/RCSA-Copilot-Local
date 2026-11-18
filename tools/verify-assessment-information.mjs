import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,assessmentContentKey} from '../src/scripts/demo/model.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';

const load=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,context]=await Promise.all(['workflow-demo.json','risk-intelligence.json','assessment-context.json'].map(load));
const data={...workflow,intelligence,context,sources:[...workflow.sources,...intelligence.sources,...context.sources]};
const state=createInitial(data),before=assessmentContentKey(state);
for(const id of Object.keys(state.risks))for(const stage of ['inherent','residual']){
 state.selectedRisk=id;
 const html=assessmentView(data,state,stage);
 assert(html.indexOf('risk-record-details')<html.indexOf('class="rating-form"'));
 assert(html.indexOf('class="rating-form"')<html.indexOf('class="inline-insights"'));
 assert(html.includes('data-icon="insight"'));
 assert(html.includes('aria-label="Risk heatmap"'));
}
const scope=assessmentView(data,state,'changes');
assert(scope.includes('Scope &amp; changes'));
assert(scope.includes('aria-label="Assessment scope"'));
assert(scope.includes('whether any risks are missing'));
assert(!scope.includes('data-action="upgrade-review-proposal"'));
assert(scope.includes('data-action="confirm-scope"'));
assert.equal(assessmentContentKey(state),before);
console.log('PASS: risk details precede scoring; consistent AI icon and insights below assessment; scope-first purpose without a premature residual-rating proposal; views preserve decisions.');
