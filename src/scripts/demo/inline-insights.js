import {relatedResearch} from './research-context.js?v=20261116.3';
import {preparedScopeMatches} from './scope-model.js?v=20261116.3';
import {policyFor,defaultPolicy} from './bank-policy.js?v=20261116.3';
import {signalTrend,signalFindings} from './signal-analysis.js?v=20261116.3';
import {evidenceUpdateView} from './evidence-update.js?v=20261116.3';
import {decisionInsights} from './decision-insights.js?v=20261116.3';
import {esc,button,sourceLink,aiLabel,ratingBadge} from './ui.js?v=20261116.3';
import {assessmentProjection,sourceRecords} from './model.js?v=20261116.3';
import {ratingProposal} from './upgrade-model.js?v=20261116.3';

export function insightContext(data,s,kind='inherent'){
 const stage=kind==='inherent'?'inherent':'residual',projection=s.submitted?assessmentProjection(s,'current',data):null,risk=projection?.risks?.[s.selectedRisk]||s.risks[s.selectedRisk];
 const records=projection?.sources||sourceRecords(data,s),analysis=data.intelligence?.cases?.[risk.scenarioId||risk.id],lens=analysis?.[stage];
 const trend=signalFindings(data,risk,stage,records,projection?{...s,customControls:projection.customControls||[],controlAssistance:projection.controlAssistance}:s);
 const method=policyFor(s),base=defaultPolicy(),customMethod=['likelihood','impact','likelihoodDefinitions','impactDefinitions'].some(key=>JSON.stringify(method[key])!==JSON.stringify(base[key]));
 const prepared=(trend.length?trend:decisionInsights(data,risk,stage,records)).map(f=>customMethod?{...f,recommendation:f.recommendation?.replace(/(?:Review|Retain|Keep|review) (?:residual )?likelihood [1-5](?: \([^)]*\))?(?:, compared with the prior [1-5])?/g,'Review likelihood against your bank’s current criteria')}:f);
 const ids=[...new Set([...(lens?.changedSourceIds||risk.sources||[]),...prepared.flatMap(f=>f.sourceIds)])];
 const preserved=!projection||ids.every(id=>{const saved=records.find(r=>r.id===id),live=data.sources?.find(r=>r.id===id);return saved&&live&&saved.excerpt===live.excerpt&&saved.scope===live.scope&&saved.date===live.date&&JSON.stringify(saved.metrics)===JSON.stringify(live.metrics);});
 const supported=preparedScopeMatches(s)&&prepared.length>0&&preserved;
 const findings=supported?prepared:[{title:'Review the evidence for this assessment',text:'No prepared insight covers this scope and source version. Use the linked records and enter your own judgment.',why:'Changes to the risk or its evidence need a fresh assessment. Earlier suggestions have not been applied.',limit:'No rating, control or work record has been changed.',sourceIds:risk.sources||[]}];
 return {stage,risk,records,findings,projection,supported};
}
export function inlineInsights(data,s,kind){
 const c=insightContext(data,s,kind),p=ratingProposal(data,s,c.risk.id,c.stage);
 const review=p?.supported?button('Review suggested assessment','upgrade-review-proposal',`class="button" data-proposal="${esc(p.id)}"`):'';
 const action=f=>f.action?.kind==='controls'?button(f.action.label||'Compare control options','navigate','class="text-link" data-route="assessment/controls"'):f.action?.kind==='evidence'?button(f.action.label||'Request evidence','request-evidence',`class="text-link" data-risk="${esc(c.risk.id)}" data-source="${esc(f.sourceIds?.[0]||'')}"`):'';
 return `<section class="inline-insights" aria-label="AI insights"><div class="inline-insights-head"><h3>${aiLabel()}</h3><span>For your review</span></div><ul>${c.findings.map((f,i)=>`<li><div><strong>${esc(f.title)}</strong><p>${esc(f.text)}</p>${f.recommendation?`<p class="insight-recommendation"><span>Suggested next step</span> ${esc(f.recommendation)}</p>`:''}${action(f)}</div>${button('Why & sources','insight-details',`class="text-link" data-stage="${c.stage}" data-insight="${i}" aria-label="Why and sources: ${esc(f.title)}"`)}</li>`).join('')}</ul>${c.supported&&p?.supported?`<div class="insight-assessment-proposal"><div><span class="label">Suggested assessment</span>${ratingBadge(p.proposed)}<p>${Number(c.risk[c.stage]?.likelihood)===Number(p.proposed.likelihood)&&Number(c.risk[c.stage]?.impact)===Number(p.proposed.impact)?'Keep the score; review the updated explanation.':'Review the suggested score and explanation.'}</p></div>${review}</div>`:''}<div class="inline-insights-actions">${button('Related research','insight-details',`class="text-link" data-stage="${c.stage}" data-pane="research"`)}${button('Check my explanation','upgrade-check-rating',`class="text-link" data-kind="${c.stage}"`)}</div><p class="inline-insights-boundary">Only you can apply changes. Findings are based on the available records.</p></section>${evidenceUpdateView(data,s,c.risk,c.stage,c.projection)}`;
}
function trendEvidenceTable(risk,records){
 const trend=signalTrend(risk,records);if(!trend)return '';
 return `<h3>How the trend was calculated</h3><div class="insight-table-scroll"><table class="insight-trend-table"><thead><tr><th scope="col">Month</th><th scope="col">Payments</th><th scope="col">Events</th><th scope="col">Per 1,000 payments</th></tr></thead><tbody>${trend.metrics.periods.map(period=>`<tr><th scope="row">${esc(period.label)}</th><td>${period.payments.toLocaleString('en-US')}</td><td>${period.events.length}</td><td>${(period.events.length/period.payments*1000).toFixed(2)}</td></tr>`).join('')}</tbody></table></div><p class="small muted">${esc(trend.metrics.eventDefinition||'Consistent event definitions are used across the three complete months.')} Counts are divided by completed payments to allow for volume. This indicator does not measure the probability of a loss.</p>`;
}
export function insightDrawer(data,s,{stage='inherent',index=0,pane='finding'}={}){
 const c=insightContext(data,s,stage),f=c.findings[Number(index)]||c.findings[0];
 const sourceButton=source=>button('Read source','source',`class="source-link" data-source="${esc(source.id)}" ${c.projection?`data-version="${c.projection.version}"`:''}`);
 if(pane==='research'){
  const sources=relatedResearch({...data,sources:c.records},c.risk);
  return `<div class="insight-detail"><span class="label">Related research</span><h2 id="dialog-title">Industry context</h2><p>Public research can help frame a question. It does not establish this bank’s risk level or control effectiveness.</p>${sources.map(source=>`<article><h3>${esc(source.title)}</h3><p class="small muted">${esc(source.date)} · ${esc(source.reference)}</p><p>${esc(source.relevance)}</p><p class="small muted">${esc(source.scope)}</p>${sourceButton(source)}</article>`).join('')||'<p>No external research is linked to this example.</p>'}<p class="small muted">These references are prepared for this demo. No live search has been run.</p></div>`;
 }
 const ids=f.sourceIds||[],sources=ids.map(id=>c.records.find(source=>source.id===id)).filter(Boolean);
 return `<div class="insight-detail"><span class="label">AI insight · ${esc(c.risk.name)} · ${c.stage==='inherent'?'Before controls':'After controls'}</span><h2 id="dialog-title">${esc(f.title)}</h2><p>${esc(f.text)}</p><h3>Why it matters</h3><p>${esc(f.why||'Review the source scope and explain how it affects your judgment.')}</p>${trendEvidenceTable(c.risk,c.records)}${f.recommendation?`<h3>Suggested next step</h3><p>${esc(f.recommendation)}</p>`:''}<h3>Supporting records</h3>${sources.map(source=>`<article><h4>${esc(source.title)}</h4><p class="small muted">${esc(source.date)}</p><p>${esc(source.scope)}</p>${sourceButton(source)}</article>`).join('')||'<p>No supporting record is available for this version.</p>'}<h3>What this does not tell us</h3><p class="insight-limit">${esc(f.limit||'A recorded event or sample does not establish how often a problem occurs.')}</p><p class="small muted">This suggestion changes no ratings, controls or work records.</p>${s.newEvidenceReceived&&c.risk.id==='unauthorized'&&c.supported?`<details><summary>New evidence received</summary><p>SO-19 arrived after the submitted assessment. Review it before making any changes.</p>${sourceLink('Read the service clarification','service-clarification')}${s.role==='first'&&s.submitted&&!s.evidenceApplied?button('Use suggested wording in a new draft','evidence-revise','class="button"'):''}</details>`:''}</div>`;
}
