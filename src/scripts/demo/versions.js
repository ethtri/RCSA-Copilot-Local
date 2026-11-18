import {assistanceRecord} from './control-assistance-view.js?v=20261116.3';
import {esc} from './ui.js?v=20261116.3';
import {score,band} from './model.js?v=20261116.3';
import {mappingApplicability} from './mappings.js?v=20261116.3';

function submittedMappings(data,version,risk){
 const library=[...data.controls,...(version.customControls||[])];
 const labels={unassessed:'Not assessed',covers:'Design expected to address this risk',limited:'Limited coverage for this risk',none:'No current coverage for this risk'};
 return `<details class="version-mappings"><summary>Submitted control mappings (${risk.controls.length})</summary>${risk.controls.length?risk.controls.map(id=>{
  const control=library.find(c=>c.id===id),judgment=mappingApplicability(data,version,risk.id,id).conclusion;
  const refs=[...new Set([control?.source,control?.test].filter(Boolean))].map(sourceId=>data.sources.find(source=>source.id===sourceId)).filter(Boolean);
  return `<article class="version-control"><h4>${esc(control?.name||id)}</h4><p class="small muted">${esc(control?.owner||'')} ${control?.status==='Proposed'?'· Proposed, not implemented':''}</p><p><strong>Coverage judgment:</strong> ${esc(judgment==='prepared'?(control?.designConclusion||'Recorded assessment retained'):labels[judgment])}</p><p><strong>Mapping rationale:</strong> ${esc(risk.mappingRationale?.[id]||control?.purpose||'No rationale recorded.')}</p><p><strong>Operating evidence:</strong> ${esc(control?.evidence||'No operating evidence recorded.')}</p>${refs.length?`<details class="version-evidence"><summary>Evidence references (${refs.length})</summary>${refs.map(source=>`<section><h5>${esc(source.title)}</h5><p class="small muted">${esc(source.reference)} · ${esc(source.date)}</p><p><strong>Scope:</strong> ${esc(source.scope)}</p><blockquote>${esc(source.excerpt)}</blockquote></section>`).join('')}</details>`:'<p class="small muted">No source evidence supplied.</p>'}</article>`;
 }).join(''):`<p>${risk.noControlsConfirmed?'Owner confirmed no mapped controls.':'No controls mapped in this version.'}</p>`}</details>`;
}

export function versionDialog(data,state,number){
 const version=state.snapshots?.find(snapshot=>snapshot.version===Number(number));if(!version)return '';
 data={...data,sources:version.sources||[],controls:version.controls||[]};
 return `<h2 id="dialog-title">Assessment version ${version.version}</h2><p class="muted">Confirmed by ${esc(data.owner)} · ${esc(version.date)}</p>${Object.values(version.risks).map(risk=>`<section class="version-risk"><h3>${esc(risk.name)}</h3><p>Inherent: ${band(score(risk.inherent))} (${score(risk.inherent)}) · Residual: ${band(score(risk.residual))} (${score(risk.residual)})</p><p>${esc(risk.residual.likelihoodRationale)}</p><p>${esc(risk.residual.impactRationale)}</p><p><strong>Owner control conclusion:</strong> ${esc(risk.controlConclusion?.text||'Not separately recorded in this earlier version.')}</p>${submittedMappings(data,version,risk)}</section>`).join('')}${(state.reviewConclusions||[]).filter(review=>review.version===version.version).map(review=>`<h3>Second-line review · ${esc(review.status)}</h3><p>Independent assessment view: ${esc(review.assessmentView||'Recorded in the earlier review rationale')}</p><p>${esc(review.rationale||'Review was in progress when the owner revision started.')}</p>`).join('')}<h3>Protective measure</h3><p>${esc(version.risks.unauthorized.riskResponse.protection||'Not separately recorded in this earlier version.')} · ${esc(version.risks.unauthorized.riskResponse.protectionStatus||'Proposed')}</p>${assistanceRecord(data,version,{readOnly:true})}<h3>Recorded handoff</h3><p>${esc(version.handoff)}</p><h3>Action and closure evidence</h3><p>${esc(version.action.title)} · ${esc(version.action.owner)} · ${esc(version.action.due)}</p><p>${esc(version.action.evidence)}</p>${version.version>1?`<h3>Response</h3><p>${esc(version.response)}</p>`:''}`;
}
