import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene} from '../src/scripts/demo/model.js';
import {assessmentView} from '../src/scripts/demo/assessment.js';
import {dashboardView} from '../src/scripts/demo/dashboard.js';
const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
for(const [role,label] of [['assurance','Control assurance'],['management','Management decision owner'],['admin','Bank administrator']]){
 const s=seedScene(data,'submitted');s.role=role;
 const html=assessmentView(data,s,'review');
 assert(html.includes(label));assert(html.includes('View assessment report'));
 assert(!html.includes('data-action="complete-review"'));assert(!html.includes('id="reviewer-attest"'));
}
const fresh=createInitial(data);
const freshHtml=assessmentView(data,fresh,'controls');
assert(!freshHtml.includes('class="stage-completion"'),'Merely visiting controls does not complete a stage.');
const submitted=seedScene(data,'submitted');
assert.equal((assessmentView(data,submitted,'review').match(/class="stage-completion"/g)||[]).length,5,'Five owner steps are complete before the independent decision.');
fresh.dashboardFilter='review';
const empty=dashboardView(data,fresh);
assert(empty.includes('No matching work items'));assert(empty.includes('data-icon="empty"'));assert(empty.includes('Show all work'));
console.log('PASS: truthful role labels/read-only assessment destinations, confirmation-driven stage markers and neutral actionable empty filters.');
