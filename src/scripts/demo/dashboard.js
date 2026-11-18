import {scopeRecord,preparedScopeMatches} from './scope-model.js?v=20261116.3';
import {thresholdFor,policyFor,reviewerFor} from './bank-policy.js?v=20261116.3';
import {operationsSummary,demoAsOf} from './operations.js?v=20261116.3';
import {reviewBrief} from './premium.js?v=20261116.3';
import {decisionBrief} from './decision-brief.js?v=20261116.3';
import {score,band,currentRating,riskEntries,assessmentProjection} from './model.js?v=20261116.3';
import {esc,icon,button,badge,ratingBadge,sourceLink,formatDate,statusBadge,emptyState} from './ui.js?v=20261116.3';
import {portfolioHeatmap} from './visuals.js?v=20261116.3';

const FILTERS=[['all','All'],['assessments','Assessments'],['actions','Responses & actions'],['review','Review'],['evidence','Evidence']];
const openRisk=(label,id,stage,options='')=>button(`${esc(label)} ${icon('arrow',16)}`,stage==='action'?'ops-open-action':stage==='decision'?'ops-open-decision':'open-risk',`data-risk="${esc(id)}" data-stage="${esc(stage)}" ${options}`);
const openWork=(item,options='')=>item.candidate?button(`${esc(item.action)} ${icon('arrow',16)}`,'upgrade-review-risk',`data-candidate="${esc(item.candidate)}" ${options}`):item.request?button(`${esc(item.action)} ${icon('arrow',16)}`,'ops-open-evidence',`data-request="${esc(item.request)}" ${options}`):openRisk(item.action,item.risk,item.stage,options);
const workStatus=value=>({'in-progress':'In progress','evidence-submitted':'Evidence submitted',planned:'Planned',returned:'Returned for changes',closed:'Closed',draft:'Draft request',submitted:'Awaiting decision',approved:'Approved',declined:'Declined',expired:'Approval expired'})[value]||value;
const safeDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')?formatDate(value):'Date to confirm';
const confirmed=r=>r.inherentConfirmed&&r.controlsConfirmed&&r.residualConfirmed;

function dashboardItems(data,s) {
  const first=s.role==='first',items=[],ops=operationsSummary(s),scope=scopeRecord(s);
  if(!s.submitted)items.push({id:'refresh',category:'assessments',type:'Assessment',risk:'unauthorized',stage:'changes',title:first?`Refresh ${scope?.process||'the assessment'}`:`${scope?.process||'Assessment'} refresh in preparation`,detail:first?'Review proposed changes and confirm the assessment.':'The owner is preparing the quarterly assessment.',due:preparedScopeMatches(s)?'2026-11-19':'',owner:scope?.owner||'Owner not preserved',status:'Refresh due',action:first?'Review changes':'View assessment'});
  if(s.submitted&&!s.reviewed&&!['open','responded'].includes(s.challengeStatus))items.push({id:'assessment-review',category:'review',type:'Review',risk:'unauthorized',stage:'review',title:s.reviewStatus==='returned'?'Revise the returned assessment':'Review the submitted assessment',detail:s.reviewStatus==='returned'?'Review the requested changes and start an owner revision.':'Check the conclusions and evidence, then record a decision.',due:'',owner:s.reviewStatus==='returned'?data.owner:data.reviewer,status:s.reviewStatus==='returned'?'Changes requested':'Awaiting review',action:first?'View assessment':'Review assessment'});
  if(['open','responded'].includes(s.challengeStatus))items.push({id:'question',category:'review',type:'Question',risk:'unauthorized',stage:'review',title:s.challengeStatus==='open'?'Reply to the review question':'Review the owner’s reply',detail:s.challengeStatus==='open'?'The reviewer is waiting for the owner’s reply.':'Decide whether the reply answers the question.',due:'',owner:s.challengeStatus==='open'?data.owner:data.reviewer,status:s.challengeStatus==='open'?'Reply needed':'Reply received',action:first?(s.challengeStatus==='open'?'Reply':'View reply'):(s.challengeStatus==='responded'?'Review reply':'View question')});
  for(const r of riskEntries(s))if(r.residualConfirmed&&score(r.residual)>thresholdFor(s)&&!r.riskResponse?.created)items.push({id:'response-'+r.id,category:'actions',type:'Response',risk:r.id,stage:'response',title:`Choose a response · ${r.name}`,detail:'The confirmed risk is above the bank’s threshold. Record what happens next.',due:'',owner:r.owner||data.owner,status:'Response needed',action:first?'Create response':'View response need'});
  for(const a of ops.actions.filter(a=>a.active&&a.status!=='closed'))items.push({id:a.id,category:a.evidenceRequest?'evidence':'actions',type:a.evidenceRequest?'Evidence request':'Action',risk:a.riskId,stage:'action',title:a.title,detail:s.risks[a.riskId]?.name||'',due:a.due,owner:a.owner,status:workStatus(a.status),action:a.status==='evidence-submitted'?'Review evidence':'Open action'});
  for(const d of ops.decisions.filter(d=>d.active!==false&&!['approved','declined'].includes(d.status)))items.push({id:d.id,category:'review',type:d.kind==='acceptance'?'Risk acceptance':'Management decision',risk:d.riskId,stage:'decision',title:d.kind==='acceptance'?'Request temporary risk acceptance':'Request permission to continue',detail:d.question,due:d.targetDate,owner:d.owner,status:workStatus(d.status),action:'Open request'});
  for(const request of (ops.evidenceRequests||[]).filter(request=>!s.risks[request.riskId]?.removed))items.push({id:request.id,request:request.id,category:'evidence',type:'Evidence request',risk:request.riskId,stage:'evidence',title:request.title,detail:s.risks[request.riskId]?.name||'',due:request.due,owner:request.owner,status:request.status==='received'?'Evidence received':'Evidence requested',action:'Open request'});
  const discoveryDecisions=[...new Map((s.discoveryDecisions||[]).map(item=>[item.candidateId,item])).values()];
  for(const followUp of discoveryDecisions.filter(item=>item.disposition==='defer'&&!s.risks[item.candidateId]))items.push({id:'follow-up-'+followUp.candidateId,candidate:followUp.candidateId,category:'assessments',type:'Risk follow-up',title:'Review deferred risk suggestion',detail:followUp.reason,due:followUp.due,owner:followUp.owner,status:followUp.due<=demoAsOf(s)?'Follow-up due':'Deferred',action:'Review suggestion'});
  const main=preparedScopeMatches(s)?s.risks.unauthorized:null;
  if(main&&!s.signalTestReceived)items.push({id:'evidence',category:'evidence',type:'Evidence gap',risk:'unauthorized',stage:'controls',title:'Check evidence for urgent payments',detail:'The September test covered standard wires before the procedure changed.',due:'',owner:data.owner,status:main.controlsConfirmed?'Evidence needed':'Scope to review',action:'Review gap'});
  return items;
}

function metric(label,value,filter,description,extra='') {
  return button(`<span class="dash-metric-value ${extra}">${value}</span><span class="dash-metric-copy"><strong>${esc(label)}</strong><small>${esc(description)}</small></span>${icon('arrow',15)}`,'dashboard-filter',`class="dash-metric" data-filter="${filter}" aria-label="${value} ${esc(label)}. ${esc(description)}"`);
}

export function assessmentLaunch(s){
  if(s.role==='second')return {label:s.reviewed?'View reviewed RCSA':!s.submitted?'View assessment':s.challengeStatus==='responded'?'Review owner response':'Review assessment',risk:'unauthorized',stage:s.submitted?'review':'changes'};
  if(s.submitted)return {label:s.reviewStatus==='returned'?'Revise returned assessment':s.challengeStatus==='open'?'Respond to review question':s.reviewed?'View reviewed RCSA':'View submitted RCSA',risk:'unauthorized',stage:'review'};
  if(!s.scope)return {label:'Start assessment refresh',risk:'unauthorized',stage:'changes'};
  for(const risk of riskEntries(s)){
    const next=!risk.inherentConfirmed?'inherent':!risk.controlsConfirmed?'controls':risk.id==='unauthorized'&&['callback','approval'].every(id=>risk.controls.includes(id))&&!s.dependency?'discovery':!risk.residualConfirmed?'residual':null;
    if(next)return {label:'Continue assessment refresh',risk:risk.id,stage:next};
  }
  return {label:'Continue assessment refresh',risk:'unauthorized',stage:'review'};
}

function briefingEvidence(s,view,sources){
  if(!preparedScopeMatches(s))return '<p class="dash-ai-basis">Prepared wire-payment findings may not cover the changed process or period.</p>';
  if(view.signalTestReceived)return '<p class="dash-ai-basis">Review the new sample and its limits before changing a rating.</p>';
  const events=[['test','25 standard wires tested'],['procedure','Urgent route introduced']];
  const dates=new Intl.DateTimeFormat('en-US',{month:'short',day:'2-digit',timeZone:'UTC'});
  const rows=events.map(([id,label])=>{
    const record=sources.find(source=>source.id===id);
    if(!record)return '';
    const timestamp=Date.parse(record.date+' UTC');
    const date=Number.isFinite(timestamp)?dates.format(timestamp):record.date;
    return `<div><dt>${esc(date||'Undated')}</dt><dd>${esc(label)}</dd></div>`;
  }).join('');
  return rows?`<dl class="briefing-dates" aria-label="Evidence timeline">${rows}</dl>`:'';
}

export function dashboardView(data,s) {
  const scope=scopeRecord(s),projection=s.submitted?assessmentProjection(s,'current',data):null,view=projection?{...s,...projection}:s,first=s.role==='first',risks=riskEntries(view),items=dashboardItems(data,s);
  const filter=FILTERS.some(([key])=>key===s.dashboardFilter)?s.dashboardFilter:'all';
  const visible=filter==='all'?items:items.filter(x=>x.category===filter);
  const ops=operationsSummary(s),openActions=ops.openActions;
  const questions=['open','responded'].includes(s.challengeStatus)?1:0;
  const reviewDue=s.submitted&&!s.reviewed?1:0;
  const headline=first?'Your risk overview':'Your review overview';
  const launch=assessmentLaunch(s);
  return `<div class="dashboard-view">
    <header class="dash-heading"><div><h1>${headline}</h1><p><span>Team: <strong>${first?esc(data.team):'Operational Risk'}</strong></span><span>Period: <strong>${esc(scope?.period||'Period not preserved')}</strong></span><span>${esc(scope?.process||'Process not preserved')} · 1 assessment</span></p></div><div class="dash-heading-actions"><span class="dash-date">As of ${formatDate(demoAsOf(s))}</span>${openRisk(launch.label,launch.risk,launch.stage,'class="button primary dash-flagship-cta"')}</div></header>
    <section class="dash-metrics" aria-label="Work overview">
      ${metric('risks in scope',risks.length,'all','Across one assessment')}
      ${first?metric('refresh due',s.submitted?0:1,'assessments','Quarterly assessment',!s.submitted?'attention':''):metric('assessment awaiting review',reviewDue,'review','Submitted by first line',reviewDue?'attention':'')}
      ${metric('open actions',openActions,'actions','Recorded work still open',openActions?'attention':'')}
      ${metric('review questions',questions,'review',questions?'Awaiting resolution':'No unresolved questions')}
    </section>
    <div class="dash-insight-grid">
      <section class="dash-heatmap-panel"><div class="dash-section-head"><div><h2>Risk heatmap</h2><p>Last confirmed positions · ${risks.length} risks</p></div><span class="dash-chart-note">Select a risk to inspect</span></div>${portfolioHeatmap(view)}</section>
      ${first&&items.length===0?`<aside class="dash-ai-panel quiet-brief"><h2>Work queue is clear.</h2><p class="dash-ai-basis">No assessment, review or evidence items are waiting in this queue.</p>${openRisk(launch.label,launch.risk,launch.stage,'class="button dash-ai-primary"')}</aside>`:first?`<aside class="dash-ai-panel" aria-labelledby="dash-ai-title"><div class="dash-ai-top"><span class="dash-ai-label"><span class="dash-ai-symbol" aria-hidden="true">AI</span> AI briefing</span>${button(icon('info',18),'ai-change-brief','class="dash-ai-info" aria-label="Inspect the sources behind the AI briefing"')}</div><h2 id="dash-ai-title">${preparedScopeMatches(s)?view.signalTestReceived?'New urgent-payment test results are available.':'The September test predates the urgent-wire change.':'Review the records for the current scope.'}</h2>${briefingEvidence(s,view,projection?projection.sources:data.sources||[])}<div class="dash-ai-actions">${button(`Review changes ${icon('arrow',18)}`,'open-risk','class="button dash-ai-primary" data-risk="unauthorized" data-stage="changes"')}${button('View sources','ai-change-brief','class="dash-ai-link"')}</div><div class="dash-ai-support"><span class="dash-ai-support-dot" aria-hidden="true"></span><div><strong>${!preparedScopeMatches(s)?'Check which information each control uses.':s.dependency==='confirmed'?'A shared information source is confirmed.':s.dependency==='qualified'?'The owner added a caveat about the shared source.':s.dependency==='dismissed'?'The shared-source suggestion was dismissed.':'Two controls may share an information source.'}</strong><p>${s.dependency==='dismissed'?'The owner’s decision is preserved in the assessment.':'Review whether both checks could miss the same error.'}</p>${preparedScopeMatches(s)?button(`Inspect shared source ${icon('arrow',15)}`,'navigate','class="dash-ai-link" data-route="assessment/discovery"'):''}</div></div></aside>`:reviewBrief(data,s,{compact:true})}
    </div>
    <section class="dash-queue" aria-labelledby="dash-queue-heading"><div class="dash-section-head dash-queue-heading"><div><h2 id="dash-queue-heading">${first?'Needs your attention':'Review priorities'}</h2><p>${first?'Your assessment, response and evidence work.':'Submitted conclusions, review questions and evidence worth inspecting.'}</p></div><div class="dash-filters" role="group" aria-label="Filter work queue">${FILTERS.map(([key,label])=>{const n=key==='all'?items.length:items.filter(x=>x.category===key).length;return button(`${label} <span>${n}</span>`,'dashboard-filter',`class="dash-filter ${filter===key?'active':''}" data-filter="${key}" aria-pressed="${filter===key}"`);}).join('')}</div></div>
      <div class="dash-table-scroll" role="region" aria-label="Work queue" tabindex="0"><table class="dash-work-table"><thead><tr><th>Item</th><th>Type</th><th>Due date</th><th>Owner</th><th>Status</th><th><span class="sr-only">Open work item</span></th></tr></thead><tbody>${visible.map(item=>`<tr><td><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></td><td data-label="Type"><span class="dash-type ${item.category}">${esc(item.type)}</span></td><td class="dash-due" data-label="Due date">${item.due?safeDate(item.due):'—'}</td><td data-label="Owner">${esc(item.owner)}</td><td data-label="Status">${statusBadge(item.status,{label:item.status,className:'dash-work-status'})}</td><td>${openWork(item,'class="dash-row-action"')}</td></tr>`).join('')||`<tr><td colspan="6">${emptyState({title:filter==='all'?'No work needs your attention':'No matching work items',description:filter==='all'?'You can still inspect the assessment and its evidence.':'There are no items in this category. View all work to see other items.',icon:'empty',compact:true,action:filter==='all'?openRisk('Open assessment',launch.risk,launch.stage,'class="button"'):button('Show all work','dashboard-filter','class="button" data-filter="all"')})}</td></tr>`}</tbody></table></div>
    </section>
    <section class="dash-register" aria-labelledby="dash-register-heading"><div class="dash-section-head"><div><h2 id="dash-register-heading">Assessment register</h2><p>${risks.length} risks in ${esc(scope?.process||'this recorded assessment')}.</p></div>${openRisk('Open assessment','unauthorized',s.submitted?'review':'changes','class="text-link"')}</div><div class="dash-table-scroll" role="region" aria-label="Assessment register" tabindex="0"><table class="dash-register-table"><thead><tr><th>Risk</th><th>Last confirmed risk</th><th>Assessment status</th><th>Evidence coverage</th><th><span class="sr-only">Inspect risk</span></th></tr></thead><tbody>${risks.map(r=>{const main=r.id==='unauthorized';let status=main?(s.reviewed?'Reviewed':s.reviewStatus==='returned'?'Returned for changes':s.submitted?'In review':confirmed(r)?'Ready to submit':'Refresh in progress'):(confirmed(r)?'Confirmed':'Needs confirmation');return `<tr><td><strong>${esc(r.name)}</strong><span>${esc(scope?.process||'Process not preserved')}</span></td><td>${ratingBadge(currentRating(view,r.id))}</td><td>${statusBadge(status,{label:status,className:'dash-register-status'})}</td><td>${main&&preparedScopeMatches(s)?`<span class="dash-evidence ${view.signalTestReceived?'supported':'limited'}">${view.signalTestReceived?'New urgent-route sample available':'Urgent-route evidence needed'}</span>${sourceLink(view.signalTestReceived?'Urgent-payment test':'September test scope',view.signalTestReceived?'signals-urgent-test':'test')}`:`<span class="dash-evidence supported">${preparedScopeMatches(s)?r.id==='details'?'October sample available':r.id==='cutoff'?'October review available':'Evidence to review':'Check coverage for current scope'}</span>${sourceLink('View supporting evidence',r.sources[0])}`}</td><td>${openRisk('Inspect risk',r.id,'residual','class="dash-row-action"')}</td></tr>`;}).join('')}</tbody></table></div></section>
  </div>`;
}
