import {reviewBrief} from './premium.js?v=20261114.6';
import {decisionBrief} from './decision-brief.js?v=20261114.6';
import {score,band,currentRating} from './model.js?v=20261114.6';
import {esc,icon,button,badge,sourceLink,formatDate} from './ui.js?v=20261114.6';
import {portfolioHeatmap} from './visuals.js?v=20261114.6';

const FILTERS=[['all','All'],['assessments','Assessments'],['actions','Responses & actions'],['review','Review'],['evidence','Evidence']];
const openRisk=(label,id,stage,options='')=>button(`${esc(label)} ${icon('arrow',16)}`,stage==='decision'?'navigate':'open-risk',`data-risk="${esc(id)}" data-stage="${esc(stage)}" ${stage==='decision'?'data-route="reports"':''} ${options}`);
const safeDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'')?formatDate(value):'Date to confirm';
const confirmed=r=>r.inherentConfirmed&&r.controlsConfirmed&&r.residualConfirmed;

function dashboardItems(data,s) {
  const first=s.role==='first',items=[],decision=decisionBrief(s);
  if(!s.submitted)items.push({id:'refresh',category:'assessments',type:'Assessment',risk:'unauthorized',stage:'changes',title:first?'Refresh the wire-transfer assessment':'Wire-transfer refresh in preparation',detail:first?'Review the changed procedure, evidence and risk conclusions.':'First line is preparing the quarterly assessment.',due:'2026-11-19',owner:data.owner,status:'Refresh due',action:first?'Review changes':'View assessment'});
  if(s.submitted&&!s.reviewed&&s.challengeStatus!=='open'&&s.challengeStatus!=='responded')items.push({id:'assessment-review',category:'review',type:'Review',risk:'unauthorized',stage:'review',title:'Review the submitted assessment',detail:'Inspect the owner’s conclusions, supporting evidence and management response.',due:'',owner:data.reviewer,status:'Awaiting review',action:first?'View handoff':'Review assessment'});
  if(['open','responded'].includes(s.challengeStatus))items.push({id:'question',category:'review',type:'Question',risk:'unauthorized',stage:'review',title:s.challengeStatus==='open'?'Clarify the test scope and shared source':'Consider the owner’s revised response',detail:s.challengeStatus==='open'?'A review question is awaiting the assessment owner’s response.':'The owner has responded. The reviewer decides whether clarification is sufficient.',due:'',owner:s.challengeStatus==='open'?data.owner:data.reviewer,status:s.challengeStatus==='open'?'Response needed':'Response received',action:first?(s.challengeStatus==='open'?'Respond':'View response'):(s.challengeStatus==='responded'?'Review response':'View question')});
  for(const r of Object.values(s.risks)) {
    const response=r.riskResponse;
    if(r.residualConfirmed&&score(r.residual)>9&&!response?.created)items.push({id:'response-'+r.id,category:'actions',type:'Response',risk:r.id,stage:'response',title:`Create a response · ${r.name}`,detail:'The confirmed residual risk is above tolerance. Choose and record the management response.',due:'',owner:data.owner,status:'Response required',action:first?'Create response':'Inspect response need'});
    if(response?.created&&response.strategy!=='accept') {
      const action=r.id==='unauthorized'?s.action:r.responseAction;
      items.push({id:'action-'+r.id,category:'actions',type:'Action',risk:r.id,stage:'response',title:action?.title||`Complete the response · ${r.name}`,detail:r.name,due:action?.due||'',owner:action?.owner||response.owner||data.owner,status:'Open',action:first?'Open action':'Inspect action'});
    }
    if(response?.created&&response.strategy==='accept')items.push({id:'acceptance-'+r.id,category:'review',type:'Acceptance request',risk:r.id,stage:'response',title:`Track the acceptance request · ${r.name}`,detail:'The response records a request. Management disposition remains separate.',due:r.id==='unauthorized'?decision.targetDate:response.reviewDate,owner:r.id==='unauthorized'?(decision.owner||response.owner):response.owner||data.owner,status:r.id==='unauthorized'?decision.status:s.submitted?'Decision pending':'Draft decision request',action:'View request'});
  }
  const main=s.risks.unauthorized;
  if(decision.required&&main.riskResponse?.strategy!=='accept')items.push({id:'management',category:'review',type:'Management decision',risk:'unauthorized',stage:'decision',title:decision.title,detail:decision.question,due:decision.targetDate,owner:decision.owner,status:decision.status,action:'View decision brief'});
  items.push({id:'evidence',category:'evidence',type:'Evidence',risk:'unauthorized',stage:'controls',title:'Check coverage of the urgent-wire route',detail:'The September test covered standard wires before the October procedure change.',due:'',owner:data.owner,status:main.controlsConfirmed?'Targeted evidence needed':'Scope to review',action:'Inspect evidence'});
  return items;
}

function metric(label,value,filter,description,extra='') {
  return button(`<span class="dash-metric-value ${extra}">${value}</span><span class="dash-metric-copy"><strong>${esc(label)}</strong><small>${esc(description)}</small></span>${icon('arrow',15)}`,'dashboard-filter',`class="dash-metric" data-filter="${filter}" aria-label="${value} ${esc(label)}. ${esc(description)}"`);
}

function assessmentLaunch(s){
  if(s.role==='second')return {label:s.reviewed?'View reviewed RCSA':!s.submitted?'View wire-transfer RCSA':s.challengeStatus==='responded'?'Review owner response':'Review wire-transfer RCSA',risk:'unauthorized',stage:s.submitted?'review':'changes'};
  if(s.submitted)return {label:s.challengeStatus==='open'?'Respond to review question':s.reviewed?'View reviewed RCSA':'View submitted RCSA',risk:'unauthorized',stage:'review'};
  if(!s.scope)return {label:'Refresh wire-transfer RCSA',risk:'unauthorized',stage:'changes'};
  for(const risk of Object.values(s.risks)){
    const next=!risk.inherentConfirmed?'inherent':!risk.controlsConfirmed?'controls':risk.id==='unauthorized'&&['callback','approval'].every(id=>risk.controls.includes(id))&&!s.dependency?'discovery':!risk.residualConfirmed?'residual':null;
    if(next)return {label:'Continue wire-transfer refresh',risk:risk.id,stage:next};
  }
  return {label:'Continue wire-transfer refresh',risk:'unauthorized',stage:'review'};
}

export function dashboardView(data,s) {
  const first=s.role==='first',risks=Object.values(s.risks),items=dashboardItems(data,s);
  const filter=FILTERS.some(([key])=>key===s.dashboardFilter)?s.dashboardFilter:'all';
  const visible=filter==='all'?items:items.filter(x=>x.category===filter);
  const openActions=risks.filter(r=>r.riskResponse?.created&&r.riskResponse.strategy!=='accept').length;
  const questions=['open','responded'].includes(s.challengeStatus)?1:0;
  const reviewDue=s.submitted&&!s.reviewed?1:0;
  const headline=first?'Your risk overview.':'Your review overview.';
  const launch=assessmentLaunch(s);
  return `<div class="dashboard-view">
    <header class="dash-heading"><div><h1>${headline}</h1><p><span>Team: <strong>${first?esc(data.team):'Operational Risk'}</strong></span><span>Period: <strong>${esc(data.period)}</strong></span><span>Wire transfers · 1 assessment</span></p></div><div class="dash-heading-actions"><span class="dash-date">As of November 14, 2026</span>${openRisk(launch.label,launch.risk,launch.stage,'class="button primary dash-flagship-cta"')}</div></header>
    <section class="dash-metrics" aria-label="Work overview">
      ${metric('risks in scope',risks.length,'all','Across one wire-transfer assessment')}
      ${first?metric('refresh due',s.submitted?0:1,'assessments','Quarterly assessment',!s.submitted?'attention':''):metric('assessment awaiting review',reviewDue,'review','Submitted by first line',reviewDue?'attention':'')}
      ${metric('open actions',openActions,'actions','Created risk responses',openActions?'attention':'')}
      ${metric('review questions',questions,'review',questions?'Awaiting resolution':'No unresolved questions')}
    </section>
    <div class="dash-insight-grid">
      <section class="dash-heatmap-panel"><div class="dash-section-head"><div><h2>Risk heatmap</h2><p>Last confirmed positions · ${risks.length} risks</p></div><span class="dash-chart-note">Select a risk to inspect</span></div>${portfolioHeatmap(s)}</section>
      ${first?`<aside class="dash-ai-panel" aria-labelledby="dash-ai-title"><div class="dash-ai-top"><span class="dash-ai-label"><span class="dash-ai-symbol" aria-hidden="true">AI</span> AI briefing</span>${button(icon('info',18),'ai-change-brief','class="dash-ai-info" aria-label="Inspect the sources behind the AI briefing"')}</div><h2 id="dash-ai-title">The September test predates the urgent-wire change.</h2><p class="dash-ai-basis">Connected from the procedure and test scope.</p><div class="dash-ai-actions">${button(`Review changes ${icon('arrow',18)}`,'open-risk','class="button dash-ai-primary" data-risk="unauthorized" data-stage="changes"')}${button('View basis','ai-change-brief','class="dash-ai-link"')}</div><div class="dash-ai-support"><span class="dash-ai-support-dot" aria-hidden="true"></span><div><strong>${s.dependency==='confirmed'?'A shared information source is confirmed.':s.dependency==='qualified'?'The shared-source finding has a qualification.':s.dependency==='dismissed'?'The shared-source suggestion was dismissed.':'Two controls may share an information source.'}</strong><p>${s.dependency==='dismissed'?'The owner’s decision is preserved in the assessment.':'Inspect the evidence before judging combined protection.'}</p>${button(`Inspect shared source ${icon('arrow',15)}`,'navigate','class="dash-ai-link" data-route="assessment/discovery"')}</div></div></aside>`:reviewBrief(data,s,{compact:true})}
    </div>
    <section class="dash-queue" aria-labelledby="dash-queue-heading"><div class="dash-section-head dash-queue-heading"><div><h2 id="dash-queue-heading">${first?'Needs your attention':'Review priorities'}</h2><p>${first?'Your assessment, response and evidence work.':'Submitted conclusions, review questions and evidence worth inspecting.'}</p></div><div class="dash-filters" role="group" aria-label="Filter work queue">${FILTERS.map(([key,label])=>{const n=key==='all'?items.length:items.filter(x=>x.category===key).length;return button(`${label} <span>${n}</span>`,'dashboard-filter',`class="dash-filter ${filter===key?'active':''}" data-filter="${key}" aria-pressed="${filter===key}"`);}).join('')}</div></div>
      <div class="dash-table-scroll"><table class="dash-work-table"><thead><tr><th>Item</th><th>Type</th><th>Due date</th><th>Owner</th><th>Status</th><th><span class="sr-only">Open work item</span></th></tr></thead><tbody>${visible.map(item=>`<tr><td><strong>${esc(item.title)}</strong><span>${esc(item.detail)}</span></td><td><span class="dash-type ${item.category}">${esc(item.type)}</span></td><td class="dash-due">${item.due?safeDate(item.due):'—'}</td><td>${esc(item.owner)}</td><td><span class="dash-work-status ${item.status==='Open'?'open':''}"><i aria-hidden="true"></i>${esc(item.status)}</span></td><td>${openRisk(item.action,item.risk,item.stage,'class="dash-row-action"')}</td></tr>`).join('')||`<tr><td colspan="6"><div class="dash-empty">${icon('check',20)}<div><strong>No ${filter==='all'?'work items':FILTERS.find(([key])=>key===filter)[1].toLowerCase()} need attention.</strong><p>Choose another category to inspect the assessment and its evidence.</p></div></div></td></tr>`}</tbody></table></div>
    </section>
    <section class="dash-register" aria-labelledby="dash-register-heading"><div class="dash-section-head"><div><h2 id="dash-register-heading">Assessment register</h2><p>Three risks within the wire-transfer process.</p></div>${openRisk('Open assessment','unauthorized',s.submitted?'review':'changes','class="text-link"')}</div><div class="dash-table-scroll"><table class="dash-register-table"><thead><tr><th>Risk</th><th>Last confirmed risk</th><th>Assessment status</th><th>Evidence applicability</th><th><span class="sr-only">Inspect risk</span></th></tr></thead><tbody>${risks.map(r=>{const main=r.id==='unauthorized';let status=main?(s.reviewed?'Reviewed':s.submitted?'In review':confirmed(r)?'Ready to submit':'Refresh in progress'):(confirmed(r)?'Confirmed':'Needs confirmation');return `<tr><td><strong>${esc(r.name)}</strong><span>Wire transfers</span></td><td>${badge(score(currentRating(s,r.id)))}</td><td><span class="dash-register-status">${icon(status==='Reviewed'||status==='Confirmed'?'check':'info',14)}${status}</span></td><td>${main?`<span class="dash-evidence limited">Urgent route not established</span>${sourceLink('September test scope','test')}`:`<span class="dash-evidence supported">${r.id==='details'?'October sample available':'October review available'}</span>${sourceLink('View supporting evidence',r.sources[0])}`}</td><td>${openRisk('Inspect risk',r.id,'residual','class="dash-row-action"')}</td></tr>`;}).join('')}</tbody></table></div></section>
  </div>`;
}
