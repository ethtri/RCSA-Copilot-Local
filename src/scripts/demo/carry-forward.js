import {assessmentProjection,record,score,sourceRecords,validRating} from './model.js?v=20261115.20';
import {signalFindings} from './signal-analysis.js?v=20261115.20';
import {esc,button,ratingBadge,sourceLink} from './ui.js?v=20261115.20';

export function carryForwardNeedsReview(s,risk){
 return !s.submitted&&!risk?.removed&&['details','cutoff'].includes(risk?.id)&&!!risk.preparedBaseline&&!risk.preparedBaseline.reviewed&&!['inherent','controls','residual'].every(stage=>risk.preparedBaseline.reviewedStages?.includes(stage));
}
const complete=risk=>risk&&risk.inherentConfirmed&&risk.controlsConfirmed&&risk.residualConfirmed&&validRating(risk.inherent)&&validRating(risk.residual)&&['likelihoodRationale','impactRationale'].every(key=>String(risk.inherent[key]||'').trim()&&String(risk.residual[key]||'').trim())&&!!risk.controlConclusion?.text?.trim();
function reviewContext(data,s,id){
 const projection=s.submitted?assessmentProjection(s,'current',data):null,risk=projection?.risks?.[id]||s.risks?.[id],records=projection?.sources||sourceRecords(data,s);
 const findings=risk?signalFindings(data,risk,'inherent',records,s):[];
 const ids=[...new Set([...(risk?.sources||[]),...findings.flatMap(finding=>finding.sourceIds||[])])];
 return {risk,records,findings,ids,projection};
}
export function carryForwardDialog(data,s,id){
 const c=reviewContext(data,s,id),risk=c.risk;
 if(!risk)return '<h2 id="dialog-title">Assessment unavailable</h2><p>Return to the risk list and choose an included risk.</p>';
 const ready=complete(risk),canConfirm=s.role==='first'&&!s.submitted&&carryForwardNeedsReview(s,risk)&&ready;
 const source=(label,sourceId)=>c.projection?sourceLink(label,sourceId).replace('data-action="source"',`data-action="source" data-version="${Number(c.projection.version)}"`):sourceLink(label,sourceId);
 return `<div class="carry-forward-review"><span class="label">Starting assessment · owner review needed</span><h2 id="dialog-title">Review ${esc(risk.name)}</h2><p>Check the existing assessment against the new evidence. You can keep these judgments or open the risk to change them.</p><div class="carry-forward-ratings"><div><span class="label">Before controls</span>${ratingBadge(risk.inherent)}</div><div><span class="label">After controls</span>${ratingBadge(risk.residual)}</div></div><h3>Existing reasons</h3><dl class="carry-forward-reasons">${[['Likelihood before controls',risk.inherent?.likelihoodRationale],['Impact before controls',risk.inherent?.impactRationale],['Control conclusion',risk.controlConclusion?.text],['Likelihood after controls',risk.residual?.likelihoodRationale],['Impact after controls',risk.residual?.impactRationale]].map(([label,value])=>`<div><dt>${label}</dt><dd>${esc(value||'Not recorded')}</dd></div>`).join('')}</dl>${c.findings.length?`<h3>New evidence to consider</h3><ul class="carry-forward-findings">${c.findings.map(finding=>`<li><strong>${esc(finding.title)}</strong><p>${esc(finding.text)}</p></li>`).join('')}</ul>`:'<p class="small muted">No prepared trend analysis covers this scope. Use the linked records and your own assessment.</p>'}<details class="carry-forward-sources"><summary>Supporting records</summary><div class="button-group">${c.ids.map(sourceId=>{const item=c.records.find(source=>source.id===sourceId);return item?source(item.title,sourceId):'';}).join('')}</div></details>${!ready?'<p class="carry-forward-notice">This assessment has changed. Confirm the risk and control judgments in their own steps before completing the review.</p>':''}<p class="small muted">Confirming keeps the scores and wording shown above. It links the supporting records and records your review. It does not apply an AI rating suggestion.</p><footer class="premium-modal-footer"><div class="button-group">${button('Open risk assessment','open-risk',`class="button" data-risk="${esc(id)}" data-stage="inherent"`)}${button('Confirm carried-forward assessment','carry-forward-confirm',`class="button primary" data-risk="${esc(id)}" ${canConfirm?'':'disabled'}`)}</div></footer></div>`;
}
export function confirmCarryForward(data,s,id){
 const risk=s.risks?.[id];
 if(s.role!=='first'||s.submitted||!carryForwardNeedsReview(s,risk))return {ok:false,message:'Only the assessment owner can review a starting assessment in a draft.'};
 if(!complete(risk))return {ok:false,message:'Confirm the changed risk and control judgments before completing this review.'};
 const c=reviewContext(data,s,id),missing=(risk.sources||[]).some(sourceId=>!c.records.some(source=>source.id===sourceId));
 if(missing)return {ok:false,message:'Review the missing supporting records before confirming this assessment.'};
 s.evidenceContext??={sources:[]};s.evidenceContext.sources??=[];
 for(const sourceId of c.ids){const source=c.records.find(item=>item.id===sourceId);if(!source)continue;const index=s.evidenceContext.sources.findIndex(item=>item.id===sourceId);if(index<0)s.evidenceContext.sources.push(structuredClone(source));else s.evidenceContext.sources[index]=structuredClone(source);}
 risk.sources=[...new Set([...(risk.sources||[]),...c.ids])];risk.preparedBaseline.reviewed=true;risk.preparedBaseline.reviewedBy=data.owner||'Alex Morgan';risk.preparedBaseline.reviewedAt=s.asOf||'2026-11-14';s.reportConfirmed='';
 record(s,data.owner||'Alex Morgan',`Reviewed and kept the carried-forward assessment for ${risk.name}.`,`Before controls ${score(risk.inherent)}; after controls ${score(risk.residual)}. Scores and wording retained; supporting records linked.`);
 return {ok:true,message:'Your review is recorded. The existing scores and wording are kept.'};
}
