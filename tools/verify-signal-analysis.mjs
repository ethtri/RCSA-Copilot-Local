import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {signalSources,signalTrend,signalFindings} from '../src/scripts/demo/signal-analysis.js';
import {createInitial,assessmentContentKey} from '../src/scripts/demo/model.js';
const json=async name=>JSON.parse(await readFile(new URL('../assets/data/'+name,import.meta.url),'utf8'));
const [workflow,intelligence,signals]=await Promise.all(['workflow-demo.json','risk-intelligence.json','assessment-signals.json'].map(json));
const data={...workflow,intelligence,signals,sources:[...workflow.sources,...intelligence.sources,...signals.sources.filter(source=>!source.availability)]},s=createInitial(data);
const before=assessmentContentKey(s),dataBefore=JSON.stringify(data);
assert.equal(signalSources(data).length,4);
const trends=signalTrend(s.risks.unauthorized,data.sources);
assert.equal(trends.previousCount,8);assert.equal(trends.currentCount,12);
assert(Math.abs(trends.eventChange-50)<1e-9);assert(Math.abs(trends.volumeChange-5)<1e-9);assert(Math.abs(trends.rateChange-42.85714285714286)<1e-9);
for(const source of signals.sources.filter(source=>source.metrics.periods)){
 for(const period of source.metrics.periods){
  assert.equal(period.events.reduce((total,event)=>total+event.directPaymentLoss,0),0,'Recovered or intercepted principal is not a payment loss');
  assert(period.events.every(event=>event.date.startsWith(period.period)));
 }
}
assert(signals.sources.find(source=>source.id==='signals-details').metrics.periods[1].events.some(event=>event.id==='PD-019'&&event.amount===84000&&event.date==='2026-09-23'&&event.customerDelayBusinessDays===2));
assert(signals.sources.find(source=>source.id==='signals-unauthorized').metrics.periods[2].events.some(event=>event.id==='WT-014'&&event.date==='2026-10-20'));
assert(signals.sources.find(source=>source.id==='signals-cutoff').metrics.periods[2].events.some(event=>event.id==='QT-011'&&event.serviceCredit===180&&event.date==='2026-10-09'));
for(const id of ['unauthorized','details','cutoff'])for(const stage of ['inherent','residual']){
 const risk=s.risks[id],rows=signalFindings(data,risk,stage,data.sources,s);
 assert.equal(rows.length,2,`${id}/${stage}`);
 for(const row of rows){assert(row.recommendation&&row.why&&row.limit&&row.action.label);assert(row.sourceIds.every(id=>data.sources.some(source=>source.id===id)));}
 assert.deepEqual(signalFindings(data,{...risk,scenarioId:'owner-defined'},stage,data.sources),[]);
 assert.deepEqual(signalFindings(data,{...risk,extensions:[{}]},stage,data.sources),[]);
 assert.deepEqual(signalFindings(data,risk,stage,data.sources.filter(source=>source.id!=='signals-'+id)),[]);
 const changed=structuredClone(data.sources);changed.find(source=>source.id==='signals-'+id).metrics.periods[0].payments=0;
 assert.deepEqual(signalFindings(data,risk,stage,changed),[]);
}
const baseline=signalFindings(data,s.risks.unauthorized,'residual',data.sources,s);
assert(!baseline[0].title.includes('of 5'));
const received=[...data.sources,...signals.sources.filter(source=>source.availability)],updated=signalFindings(data,s.risks.unauthorized,'residual',received,s);
assert(updated[0].title.includes('2 of 5'));assert(updated[0].sourceIds.includes('signals-urgent-test'));assert(updated[0].recommendation.includes('Review residual likelihood 3'));
assert(updated[0].limit.includes('does not prove'));
const invalidTest=structuredClone(received);delete invalidTest.find(source=>source.id==='signals-urgent-test').metrics.recordedApproval;assert.deepEqual(signalFindings(data,s.risks.unauthorized,'residual',invalidTest,s),[]);
const copied=structuredClone(received),saved=signalFindings(data,s.risks.unauthorized,'residual',copied,s);
const changedLive=structuredClone(data);changedLive.signals.sources.find(source=>source.id==='signals-urgent-test').metrics.missingVerificationTrace=0;
assert.deepEqual(signalFindings(changedLive,s.risks.unauthorized,'residual',copied,s),saved,'Live incoming fixtures do not rewrite preserved source records');
const invalid=structuredClone(data.sources);invalid.find(source=>source.id==='signals-details').metrics.periods[1].events=invalid.find(source=>source.id==='signals-details').metrics.periods[1].events.filter(event=>event.id!=='PD-019');
assert.deepEqual(signalFindings(data,s.risks.details,'inherent',invalid),[],'Missing historical impact evidence must not be rendered as $0 or zero days');
const declining=structuredClone(data.sources);const m=declining.find(source=>source.id==='signals-unauthorized').metrics;m.periods[2].events=m.periods[2].events.slice(0,4);m.periods[2].payments=9000;
const decline=signalFindings(data,s.risks.unauthorized,'inherent',declining);assert(decline[0].title.includes('eased'));assert(decline[0].text.includes('lower'));assert(!decline[0].text.includes('rose -'));
assert.equal(assessmentContentKey(s),before);assert.equal(JSON.stringify(data),dataBefore);
console.log('PASS: coherent three-month registers, computed volume-adjusted trends, separated losses/recoveries/credits, six useful recommendation contexts, gated early test, invalid/missing evidence, frozen records and read-only approval boundary.');
