import {esc,button,sourceLink} from './ui.js?v=20261116.3';
import {record,invalidateRisk} from './model.js?v=20261116.3';

export const incomingTest=data=>(data.signals?.sources||[]).find(source=>source.id==='signals-urgent-test');
export function evidenceUpdateView(data,s,risk,stage,projection=null){
 if(risk.id!=='unauthorized'||risk.scenarioId==='owner-defined'||risk.extensions?.length||stage!=='residual'||!incomingTest(data))return '';
 const included=projection?!!projection.signalTestReceived:!!s.signalTestReceived;
 if(included)return `<div class="evidence-update evidence-update--received"><div><strong>New test included in the analysis</strong><p>The AI has reviewed the new sample. Your rating stays as recorded until you apply a change.</p></div>${sourceLink('Read new test','signals-urgent-test').replace('data-action="source"',`data-action="source" ${projection?`data-version="${Number(projection.version)}"`:''}`)}</div>`;
 return `<div class="evidence-update"><div><strong>New urgent-payment test available</strong><p>A November 12 review covers five completed urgent payments. Review it before adding it to this assessment.</p></div>${button('Review new test results','signal-review-test','class="button"')}</div>`;
}
export function incomingTestDialog(data,s){
 const source=incomingTest(data);if(!source)return '<h2 id="dialog-title">Test result unavailable</h2>';
 return `<div class="insight-detail"><span class="label">Incoming evidence · not yet added</span><h2 id="dialog-title">${esc(source.title)}</h2><p class="small muted">${esc(source.reference)} · ${esc(source.date)}</p><h3>What was reviewed</h3><p>${esc(source.scope)}</p><blockquote>${esc(source.excerpt)}</blockquote><h3>What happens next</h3><p>Adding this record updates the AI analysis and flags the control and risk conclusions for your review. It keeps your scores and wording. It does not close the issue or mark a proposed control as working.</p><footer class="premium-modal-footer">${s.role!=='first'?'<p>The assessment owner can add this record.</p>':s.submitted?button('Start a new draft','owner-revision','class="button"'):button('Add test to assessment','signal-add-test','class="button primary"')}</footer></div>`;
}
export function receiveSignalTest(s,data){
 const source=incomingTest(data),risk=s.risks?.unauthorized;
 if(s.role!=='first'||s.submitted||s.signalTestReceived||!source||!risk||risk.removed||risk.scenarioId==='owner-defined'||risk.extensions?.length)return false;
 s.signalTestReceived=true;
 s.evidenceContext??={sources:[]};s.evidenceContext.sources??=[];
 if(!s.evidenceContext.sources.some(item=>item.id===source.id))s.evidenceContext.sources.push(structuredClone(source));
 if(!risk.sources.includes(source.id))risk.sources.push(source.id);
 invalidateRisk(s,risk.id,{controls:true});
 record(s,data.owner||'Alex Morgan','Added urgent-payment review to the assessment.','AI analysis refreshed. Scores and wording retained; control and residual conclusions need review.');
 return true;
}
