import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial,seedScene,currentRating,score} from '../src/scripts/demo/model.js';
import {decisionBrief} from '../src/scripts/demo/decision-brief.js';
import {reportsView} from '../src/scripts/demo/reports.js';

const data=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const completed=seedScene(data,'complete');
completed.selectedRisk='details';
const before=structuredClone(completed), html=reportsView(data,completed);
assert(html.includes('Focus: Unauthorized wire transfer'));
assert(html.includes('1 of 3 risks in this assessment'));
assert(html.includes('data-action="open-register"'));
assert(html.includes('Unauthorized wire transfer: current confirmed residual risk remains elevated (12).'));
const bars=[...html.matchAll(/<button class="score-bar"[^>]+>/g)].map(x=>x[0]);
assert.equal(bars.length,3);
for(const bar of bars) {
  assert(bar.includes('data-action="open-risk"'));
  assert(bar.includes('data-risk="unauthorized"'),'Report drill-down must name its risk even after a supporting risk was selected');
}
assert(bars[0].includes('data-stage="inherent"'));
assert(bars[1].includes('data-stage="residual"'));
assert(bars[2].includes('data-stage="residual"'));
assert.deepEqual(completed,before,'Rendering must not change the assessment or selected risk');

const brief=decisionBrief(completed);
assert.equal(brief.pending,true);
assert.equal(brief.owner,'Head of Payments Operations');
assert.equal(brief.forum,'Payments Risk Committee');
assert.equal(brief.targetDate,'2026-11-19');
assert.equal(brief.question,'May urgent-wire processing continue under the current arrangements while targeted testing and independent verification are completed?');
assert.equal(completed.action.due,'2026-11-28');
assert(html.includes('<dt>Target decision date</dt><dd>Nov 19, 2026</dd>'));
assert(html.includes('<dt>Action due date</dt><dd>Nov 28, 2026</dd>'));
assert(html.includes('Review completed'));
assert(html.includes('Testing action open'));
const changedAction=structuredClone(completed);changedAction.action.due='2026-12-04';
assert.equal(decisionBrief(changedAction).targetDate,'2026-11-19','Editing action closure must not move the decision target');
assert(reportsView(data,changedAction).includes('<dt>Action due date</dt><dd>Dec 4, 2026</dd>'));

const draft=seedScene(data,'submitted');draft.submitted=false;draft.reviewed=false;
assert.equal(decisionBrief(draft).status,'Draft decision request');
assert.equal(decisionBrief(draft).pending,false);
assert(!reportsView(data,draft).includes('<span class="report-decision-status">Decision pending</span>'));

const fresh=createInitial(data);
assert.equal(score(currentRating(fresh,'unauthorized')),8);
assert.equal(decisionBrief(fresh).required,false,'An unconfirmed working score must not create a disposition');
assert.equal(decisionBrief(fresh).question,'');
assert(!reportsView(data,fresh).includes('id="report-decision-title"'));
fresh.submitted=true;
assert.equal(decisionBrief(fresh).pending,false,'Submission alone cannot create a pending disposition from unconfirmed risk');

const withinTolerance=seedScene(data,'complete');
withinTolerance.risks.unauthorized.residual={...withinTolerance.risks.unauthorized.residual,likelihood:2,impact:3};
assert.equal(decisionBrief(withinTolerance).required,false);
assert.equal(decisionBrief(withinTolerance).pending,false);
assert.equal(decisionBrief(withinTolerance).targetDate,'');
assert(!reportsView(data,withinTolerance).includes('id="report-decision-title"'));
assert(reportsView(data,withinTolerance).includes('No above-tolerance decision required'));

for(const [strategy,expected] of [['accept','time-bound basis'],['avoid','change or stop'],['transfer','risk-transfer arrangement']]) {
  const state=seedScene(data,'complete');state.risks.unauthorized.riskResponse.strategy=strategy;
  const decision=decisionBrief(state), output=reportsView(data,state);
  assert(decision.question.includes(expected),`${strategy} must request the relevant disposition`);
  assert.equal(decision.pending,true);
  assert.equal(decision.targetDate,'2026-11-19');
  assert(output.includes('Current risk remains unchanged'));
  if(strategy==='accept') {
    assert.equal(decision.reviewDate,'2026-11-28');
    assert(output.includes('<dt>Requested acceptance review date</dt><dd>Nov 28, 2026</dd>'));
    assert(output.includes('Time-bound acceptance pending'));
    assert(!output.includes('<dt>Action due date</dt>'),'Acceptance review and testing closure are separate');
    state.risks.unauthorized.riskResponse.reviewDate='2026-12-04';
    assert.equal(decisionBrief(state).targetDate,'2026-11-19','Acceptance review is distinct from the target decision date');
    assert(reportsView(data,state).includes('<dt>Requested acceptance review date</dt><dd>Dec 4, 2026</dd>'));
    state.submitted=false;state.reviewed=false;
    assert.equal(decisionBrief(state).pending,false);
    assert(reportsView(data,state).includes('Draft decision request'));
  }
}

console.log('PASS: named-risk report scope, explicit drill-down after supporting-risk selection, decision question/role/forum/date, draft/submitted/within-tolerance guards, response strategies, distinct action/acceptance dates, and render immutability.');
