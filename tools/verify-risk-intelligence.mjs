import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createInitial} from '../src/scripts/demo/model.js';
import {caseFor,intelligenceView,intelligenceSummary,analysisPrompts,intelligenceEntry,contextualPrompt,relatedSignals} from '../src/scripts/demo/risk-intelligence.js';

const base=JSON.parse(await readFile(new URL('../assets/data/workflow-demo.json',import.meta.url),'utf8'));
const intelligence=JSON.parse(await readFile(new URL('../assets/data/risk-intelligence.json',import.meta.url),'utf8'));
const data={...base,intelligence,sources:[...base.sources,...intelligence.sources]};
const sourceIds=new Set(data.sources.map(source=>source.id));
assert.equal(sourceIds.size,data.sources.length,'Source identities must remain globally unique.');
assert.match(intelligence.disclosure,/Fictional/,'The scenario metadata declares synthetic provenance.');

function checkReferences(value,path='fixture') {
  if(!value||typeof value!=='object')return;
  for(const [key,item] of Object.entries(value)) {
    if(/sourceIds$/i.test(key))for(const id of item)assert(sourceIds.has(id),`Unknown ${path}.${key}: ${id}`);
    else checkReferences(item,`${path}.${key}`);
  }
}
checkReferences(intelligence);
for(const source of data.sources) {
  assert(source.title&&source.scope&&source.date&&source.excerpt,`Incomplete source ${source.id}`);
  assert(Number.isFinite(Date.parse(source.date)),`Invalid source date ${source.id}`);
  assert(Date.parse(source.date)<=Date.parse(intelligence.asOf),`Future evidence ${source.id}`);
}
const source=id=>data.sources.find(item=>item.id===id);
assert(Date.parse(source('test').date)<Date.parse(source('procedure').date),'Standard-wire testing must predate the urgent change.');
assert(Date.parse(source('incident').date)<Date.parse(source('ri-wire-issue').date),'Issue update follows the near miss.');
assert(Date.parse(source('ri-details-event').date)<Date.parse(source('details-test').date),'Historical payment recovery precedes the October sample.');
assert(Date.parse(source('ri-cutoff-nearmiss').date)>Date.parse(source('queue-review').date),'The outage event follows the service review.');

let rendered=0;
for(const risk of data.risks) {
  const state=createInitial(data);state.selectedRisk=risk.id;
  const before=JSON.stringify(state), analysis=caseFor(data,state);
  assert(analysis,`No analysis for ${risk.id}`);
  assert.equal(caseFor(data,risk.id),analysis);
  assert(analysis.signals.some(signal=>signal.kind==='near-miss'),'Every case includes a near miss.');
  assert(analysis.signals.some(signal=>signal.kind==='issue'&&signal.status.startsWith('Open')),'Every case has a clearly open issue.');
  assert(analysis.signals.some(signal=>['test','review'].includes(signal.kind)),'Every case includes scoped current/historical assurance.');
  const signalIds=new Set(analysis.signals.map(signal=>signal.id));
  assert.equal(signalIds.size,analysis.signals.length);
  for(const signal of analysis.signals) {
    assert(signal.observation&&signal.limit&&signal.relevance.inherent&&signal.relevance.residual);
    assert(Number.isFinite(Date.parse(signal.date)));
    for(const id of signal.relatedSignalIds)assert(signalIds.has(id),`Unknown signal link ${id}`);
  }
  for(const stage of ['inherent','residual']) {
    const summary=intelligenceSummary(data,state,stage);
    assert(summary.title&&summary.summary);
    assert.equal(summary.openIssueCount,1);
    assert.equal(summary.signalCount,analysis.signals.length);
    assert.equal(summary.sourceCount,analysis.sourceIds.length);
    assert(intelligenceEntry(data,state,stage).includes('data-stage="'+stage+'"'));
    assert(relatedSignals(data,state,stage,{compact:true}).includes('open-intelligence'));
    for(const mode of ['overview','signals','sources']) {
      const viewState={...state,intelligenceTab:mode,intelligenceSource:analysis.sourceIds[0]};
      const html=intelligenceView(data,viewState,stage);
      assert(html.includes('data-action="intelligence-return"'));
      assert(html.includes(`data-stage="${stage}"`));
      assert(html.includes(analysis[stage].title));
      assert(html.includes('Opened from source'));
      assert(!html.includes('undefined'));
      assert(!html.includes(intelligence.disclosure),'Scenario disclosure belongs in Presentation controls.');
      assert(!/fictional|Sample workspace/i.test(html),'Keep scenario metadata out of product copy.');
      for(const id of [...html.matchAll(/data-source="([^"]+)"/g)].map(match=>match[1]))assert(sourceIds.has(id),`Rendered unknown source ${id}`);
      if(mode==='sources')for(const id of analysis.sourceIds)assert(html.includes(`data-source="${id}"`));
      if(mode==='signals')for(const id of signalIds)assert(html.includes(`id="${id}"`));
      rendered++;
    }
  }
  for(const context of ['controls','response','review','inherent','residual']) {
    const prompts=analysisPrompts(data,state,context);
    assert(prompts.length&&prompts[0].question);
    const html=contextualPrompt(data,state,context);
    assert(html.includes('data-return="'+context+'"'));
    assert(html.includes('data-risk="'+risk.id+'"'),'Contextual links preserve the named risk.');
    for(const id of prompts[0].sourceIds)assert(html.includes(`data-source="${id}"`));
  }
  assert.equal(JSON.stringify(state),before,'Analysis must never mutate a human judgment.');
  for(const [origin,label] of [['controls','control mapping'],['response','risk response'],['review','assessment review']]) {
    const html=intelligenceView(data,{...state,analysisReturn:origin},'residual');
    assert(html.includes('Back to '+label));
    assert(html.includes('Return to '+label));
    assert(html.includes('Controls supported by evidence'),'Return destination does not change the residual lens.');
  }
}
assert.equal(intelligenceSummary(data,{selectedRisk:'missing'}),null);
assert.equal(contextualPrompt(data,{selectedRisk:'missing'}),'');
console.log(`PASS: ${rendered} risk/stage/view combinations; unique and complete sources; cross-source links; event chronology; scoped assurance; contextual questions; read-only judgments.`);
