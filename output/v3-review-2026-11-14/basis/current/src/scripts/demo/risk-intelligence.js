import {esc,icon,button,sourceLink} from './ui.js?v=20261114.6';

const MODES = [['overview','Overview'],['signals','Signals'],['sources','Sources']];
const KIND_LABELS = {'change':'Process change','near-miss':'Near miss','event':'Operational event','issue':'Open issue','test':'Control test','review':'Service review'};
const safeStage = stage => stage === 'inherent' ? 'inherent' : 'residual';
const returnLabel = (s,stage) => ({controls:'control mapping',response:'risk response',review:'assessment review'}[s.analysisReturn]||`${stage} risk`);
const unique = values => [...new Set(values)];
const selectedId = (s, fallback='unauthorized') => typeof s === 'string' ? s : s?.selectedRisk || fallback;
const sourceFor = (data,id) => data.sources?.find(source => source.id === id);
const caseSourceIds = analysis => unique(analysis?.sourceIds || []);
const sourceRefs = (data,ids,compact=false) => `<div class="ri-source-refs ${compact?'ri-source-refs-compact':''}">${unique(ids || []).map(id=>{
  const source=sourceFor(data,id);
  return source ? sourceLink(source.title,id) : '';
}).join('')}</div>`;

/** Fictional, authored scenario context. These functions never change a judgment. */
export function caseFor(data,riskOrState='unauthorized') {
  return data.intelligence?.cases?.[selectedId(riskOrState)] || null;
}

/** A plain-data entry point for cards elsewhere in the assessment workflow. */
export function intelligenceSummary(data,s,stage='inherent') {
  const analysis=caseFor(data,s), lens=analysis?.[safeStage(stage)];
  if(!lens)return null;
  return {title:lens.title,summary:lens.takeaway,signalCount:analysis.signals.length,
    openIssueCount:analysis.signals.filter(signal=>signal.kind==='issue'&&signal.status.startsWith('Open')).length,
    sourceCount:caseSourceIds(analysis).length};
}

/** Suggested review questions. Return plain data so each host flow can present it naturally. */
export function analysisPrompts(data,s,context='response') {
  const analysis=caseFor(data,s);
  if(!analysis)return [];
  if(context==='review'&&s.newEvidenceReceived)return [{title:'Account for the service clarification',question:'How does the assessment account for SO-19 confirming the shared record while limiting the separate directory to standard payments? What current urgent-route protection can be evidenced?',sourceIds:['service-clarification','test','incident']}];
  if(context==='inherent'||context==='residual') {
    const lens=analysis[context];
    return [{title:context==='inherent'?'Revisit the exposure':'Review current protection',question:lens.question,sourceIds:lens.followupSourceIds.slice()}];
  }
  return (analysis.prompts[context]||analysis.prompts.response||[]).map(prompt=>({...prompt,sourceIds:prompt.sourceIds.slice()}));
}

/** One entry into the reading workspace, replacing overlapping analysis and basis actions. */
export function intelligenceEntry(data,s,stage='inherent') {
  stage=safeStage(stage);
  const summary=intelligenceSummary(data,s,stage);
  if(!summary)return '';
  return `<aside class="ri-entry" aria-label="AI risk analysis"><span class="ri-entry-label"><span class="ri-entry-mark" aria-hidden="true">AI</span> Risk analysis</span><h3>${esc(summary.title)}</h3><p>${esc(summary.summary)}</p><div class="ri-entry-footer">${button(`Explore risk analysis ${icon('arrow',15)}`,'open-intelligence',`class="text-link" data-stage="${stage}"`)}<span>${summary.signalCount} signals · ${summary.openIssueCount} open issue${summary.openIssueCount===1?'':'s'}</span></div></aside>`;
}

/** A focused question in the flow that needs it; each suggestion opens the same workspace. */
export function contextualPrompt(data,s,context='response') {
  const prompt=analysisPrompts(data,s,context)[0];
  if(!prompt)return '';
  const stage=context==='inherent'?'inherent':'residual';
  return `<aside class="ri-context-prompt" aria-label="AI review cue"><span class="ri-entry-label"><span class="ri-entry-mark" aria-hidden="true">AI</span> Review cue</span><h3>${esc(prompt.title)}</h3><p>${esc(prompt.question)}</p>${sourceRefs(data,prompt.sourceIds,true)}${button(`Explore related signals ${icon('arrow',14)}`,'open-intelligence',`class="text-link" data-stage="${stage}" data-return="${esc(context)}" data-risk="${esc(selectedId(s))}" data-source="${esc(prompt.sourceIds[0]||'')}"`)}</aside>`;
}

function riskSwitch(data,s) {
  return `<nav class="ri-risk-switch" aria-label="Risk analysis selection"><span>Explore risk</span>${data.risks.map(risk=>button(esc(risk.name),'risk',`class="ri-risk-choice ${risk.id===s.selectedRisk?'selected':''}" data-risk="${esc(risk.id)}" aria-pressed="${risk.id===s.selectedRisk}"`)).join('')}</nav>`;
}

function signalLinks(analysis,ids) {
  const linked=(ids||[]).map(id=>analysis.signals.find(signal=>signal.id===id)).filter(Boolean);
  return linked.length?`<div class="ri-linked-signals"><span>Connected signals</span>${linked.map(signal=>button(`${esc(signal.title)} ${icon('arrow',13)}`,'intelligence-signal',`data-signal="${esc(signal.id)}"`)).join('')}</div>`:'';
}

function contextForSource(data,s,analysis,stage) {
  const id=s.intelligenceSource;
  if(!id||!caseSourceIds(analysis).includes(id))return '';
  const source=sourceFor(data,id);
  if(!source)return '';
  const connected=analysis.signals.filter(signal=>signal.sourceIds.includes(id));
  const primary=connected.find(signal=>signal.sourceIds[0]===id)||connected[0];
  return `<aside class="ri-source-context" aria-label="Selected source context"><div><span class="label">Opened from source</span><strong>${esc(source.title)}</strong><p>${primary?esc(primary.relevance[stage]):esc(analysis[stage].takeaway)}</p></div>${sourceLink('Read original excerpt',source.id)}</aside>`;
}

function evidenceBoundary(data,analysis,stage) {
  const lens=analysis[stage];
  return `<aside class="ri-boundary"><span class="label">${stage==='inherent'?'Assessment lens':'Evidence boundary'}</span><h2>${stage==='inherent'?'Exposure comes before control credit.':'Read the result with its scope.'}</h2><p>${stage==='inherent'?'Use events and process changes to understand how harm could occur. Keep control effectiveness and planned improvements in the residual assessment.':'A clean sample, an intercepted event and a closed recovery each answer a different question. A proposed action cannot establish current protection.'}</p><div class="ri-boundary-rule"></div><h3>What is still unknown</h3><ul>${lens.unknowns.map(text=>`<li>${esc(text)}</li>`).join('')}</ul><span class="ri-boundary-caption">Keep these uncertainties visible in your rationale.</span></aside>`;
}

function overview(data,s,analysis,stage) {
  const lens=analysis[stage];
  const representative=analysis.signals.filter(signal=>['near-miss','event','issue'].includes(signal.kind));
  return `<div class="ri-reading-layout"><div class="ri-reading-main"><section class="ri-reading-section"><span class="ri-section-number">01 <span>Why this matters now</span></span><h2>Connect the change to the risk.</h2><p class="ri-large-copy">${esc(lens.changed)}</p>${sourceRefs(data,lens.changedSourceIds)}<div class="ri-reasoning"><div><span class="ri-proof-label">Observed in the records</span><p>${esc(lens.observation)}</p>${sourceRefs(data,lens.observationSourceIds,true)}</div><div><span class="ri-proof-label ri-inference">Suggested interpretation</span><p>${esc(lens.interpretation)}</p></div></div></section><section class="ri-reading-section"><span class="ri-section-number">02 <span>${stage==='inherent'?'Consider the exposure':'Consider the current coverage'}</span></span><h2>${stage==='inherent'?'Two dimensions for your judgment.':'What the evidence can support.'}</h2><div class="ri-considerations">${lens.considerations.map(item=>`<article><h3>${esc(item.label)}</h3><p>${esc(item.text)}</p>${sourceRefs(data,item.sourceIds,true)}</article>`).join('')}</div></section><section class="ri-reading-section ri-related-section"><div class="ri-section-header"><div><span class="ri-section-number">03 <span>Relevant records</span></span><h2>Events and issues belong in the same picture.</h2></div>${button(`All ${analysis.signals.length} signals ${icon('arrow',16)}`,'intelligence-tab','class="text-link" data-tab="signals"')}</div><div class="ri-signal-digest">${representative.map(signal=>`<article><span class="ri-signal-dot ${esc(signal.kind)}" aria-hidden="true"></span><div><div class="ri-record-meta"><span>${esc(KIND_LABELS[signal.kind])}</span><span>${esc(signal.date)}</span></div><h3>${esc(signal.title)}</h3><p>${esc(signal.relevance[stage])}</p><span class="ri-record-status">${esc(signal.status)}</span></div></article>`).join('')}</div></section></div>${evidenceBoundary(data,analysis,stage)}</div>${nextQuestion(data,analysis,stage)}`;
}

function nextQuestion(data,analysis,stage) {
  const lens=analysis[stage];
  return `<section class="ri-next-question"><div><span class="label">A useful question for your assessment</span><h2>${esc(lens.question)}</h2></div><div><span class="ri-proof-label">Suggested follow-up</span><p>${esc(lens.followup)}</p>${sourceRefs(data,lens.followupSourceIds,true)}</div></section>`;
}

function signalArticle(data,s,analysis,signal,stage,index) {
  const focused=signal.sourceIds.includes(s.intelligenceSource)||s.intelligenceSignal===signal.id;
  return `<article class="ri-signal-record ${focused?'ri-record-focused':''}" id="${esc(signal.id)}" tabindex="-1"><div class="ri-signal-rail"><span class="ri-signal-index">${String(index+1).padStart(2,'0')}</span><span class="ri-signal-kind ${esc(signal.kind)}">${esc(KIND_LABELS[signal.kind])}</span><time>${esc(signal.date)}</time><span class="ri-record-status">${esc(signal.status)}</span></div><div class="ri-signal-body"><h2>${esc(signal.title)}</h2><div class="ri-signal-reading"><div><span class="ri-proof-label">Observation</span><p>${esc(signal.observation)}</p></div><div><span class="ri-proof-label ri-inference">${stage==='inherent'?'Relevance before controls':'Relevance to current protection'}</span><p>${esc(signal.relevance[stage])}</p></div></div><p class="ri-coverage-limit"><strong>Coverage limit</strong> ${esc(signal.limit)}</p>${sourceRefs(data,signal.sourceIds,true)}${signalLinks(analysis,signal.relatedSignalIds)}</div></article>`;
}

function signals(data,s,analysis,stage) {
  return `<section class="ri-signals-view" aria-label="Connected risk signals"><div class="ri-view-intro"><h2>A connected reading of the records.</h2><p>Read each observation alongside its relevance and limits. Related records may describe the same event; they are not additional occurrences.</p></div>${analysis.signals.map((signal,index)=>signalArticle(data,s,analysis,signal,stage,index)).join('')}</section>${nextQuestion(data,analysis,stage)}`;
}

function sources(data,s,analysis,stage) {
  const list=caseSourceIds(analysis).map(id=>sourceFor(data,id)).filter(Boolean);
  return `<section class="ri-sources-view" aria-label="Source evidence"><div class="ri-view-intro"><h2>The original evidence, with its boundaries.</h2><p>Inspect the dates, scope and excerpts behind each observation. Open a source or follow its connection to the analysis.</p></div><div class="ri-source-register">${list.map((source,index)=>{
    const connections=analysis.signals.filter(signal=>signal.sourceIds.includes(source.id));
    return `<article class="ri-source-record ${s.intelligenceSource===source.id?'ri-record-focused':''}" id="ri-source-${esc(source.id)}"><header><span class="ri-source-index">${String(index+1).padStart(2,'0')}</span><div><span class="ri-record-meta">${esc(source.reference)}</span><h3>${esc(source.title)}</h3><time>${esc(source.date)}</time></div>${sourceLink('Open source',source.id)}</header><div class="ri-source-reading"><div><span class="ri-proof-label">Scope</span><p>${esc(source.scope)}</p>${connections.length?`<div class="ri-source-connections"><span class="ri-proof-label">Used in this analysis</span>${connections.map(signal=>button(`${esc(signal.title)} ${icon('arrow',13)}`,'intelligence-signal',`class="ri-context-link" data-signal="${esc(signal.id)}"`)).join('')}</div>`:''}</div><blockquote>${esc(source.excerpt)}</blockquote></div></article>`;
  }).join('')}</div><p class="ri-source-scope-note">Evidence supports its stated population and period. Historical recovery, a planned change and current operation are separate conclusions for the assessor.</p></section>`;
}

/** The full assessment analysis workspace. `stage` is the originating assessment lens. */
export function intelligenceView(data,s,stage='inherent') {
  stage=safeStage(stage);
  const analysis=caseFor(data,s), risk=s.risks?.[s.selectedRisk]||data.risks.find(risk=>risk.id===s.selectedRisk);
  if(!analysis||!risk)return `<section class="ri-workspace"><header class="page-heading"><h1>Analysis is not available for this risk.</h1></header>${button('Return to assessment','intelligence-return',`class="button" data-stage="${stage}"`)}</section>`;
  const lens=analysis[stage], mode=MODES.some(([id])=>id===s.intelligenceTab)?s.intelligenceTab:'overview';
  const summary=intelligenceSummary(data,s,stage);
  const destination=returnLabel(s,stage);
  return `<div class="ri-workspace"><div class="ri-topline">${button(`${icon('back',15)} Back to ${esc(destination)}`,'intelligence-return',`class="text-link" data-stage="${stage}"`)}<span>AI-assisted analysis <span aria-hidden="true">·</span> Payments Operations</span></div>${riskSwitch(data,s)}<header class="ri-heading"><div><span class="label">${esc(analysis.eyebrow)}</span><h1>${esc(lens.title)}</h1><p>${esc(lens.takeaway)}</p></div><aside class="ri-lens"><span class="ri-lens-mark" aria-hidden="true">AI</span><span class="label">${stage==='inherent'?'Inherent risk':'Residual risk'}</span><strong>${stage==='inherent'?'Before considering controls':'Current, evidenced protection'}</strong><span>Prepared for ${esc(data.intelligence.asOf)}</span></aside></header><div class="ri-toolbar"><nav class="ri-mode-switch" aria-label="Analysis views">${MODES.map(([id,label])=>button(`${label}${id==='signals'?` <span>${summary.signalCount}</span>`:id==='sources'?` <span>${summary.sourceCount}</span>`:''}`,'intelligence-tab',`class="ri-mode ${mode===id?'selected':''}" data-tab="${id}" aria-pressed="${mode===id}"`)).join('')}</nav><span class="ri-case-status"><i aria-hidden="true"></i>${summary.openIssueCount} open issue${summary.openIssueCount===1?'':'s'} to consider</span></div>${contextForSource(data,s,analysis,stage)}<div class="ri-mode-content" id="ri-analysis-content">${mode==='signals'?signals(data,s,analysis,stage):mode==='sources'?sources(data,s,analysis,stage):overview(data,s,analysis,stage)}</div><footer class="ri-analysis-footer"><p>Prepared analysis · Read the source scope alongside each conclusion.</p><span>Ratings and control judgments remain with the assessor.</span></footer><div class="ri-return-row">${button(`Return to ${esc(destination)} ${icon('arrow',16)}`,'intelligence-return',`class="button primary" data-stage="${stage}"`)}<span>Your judgment stays with you.</span></div></div>`;
}

/** A small, source-linked reading for controls, response planning or review. */
export function relatedSignals(data,s,stage='residual',{compact=false}={}) {
  const analysis=caseFor(data,s);
  if(!analysis)return '';
  stage=safeStage(stage);
  const list=analysis.signals.filter(signal=>['near-miss','issue'].includes(signal.kind));
  return `<div class="ri-related-signals ${compact?'compact':''}"><span class="label">Signals to consider</span>${list.map(signal=>`<article><span class="ri-record-meta">${esc(KIND_LABELS[signal.kind])} · ${esc(signal.status)}</span><h3>${esc(signal.title)}</h3><p>${esc(signal.relevance[stage])}</p>${button(`Review analysis ${icon('arrow',14)}`,'open-intelligence',`class="text-link" data-stage="${stage}" data-source="${esc(signal.sourceIds[0])}"`)}</article>`).join('')}</div>`;
}

export function riskAnalysisBody(data,s,stage='inherent',mode='overview'){
 const analysis=caseFor(data,s);if(!analysis)return '<p>No analysis is available for this risk.</p>';
 return contextForSource(data,s,analysis,stage)+(mode==='signals'?signals(data,s,analysis,stage):mode==='sources'?sources(data,s,analysis,stage):overview(data,s,analysis,stage));
}
