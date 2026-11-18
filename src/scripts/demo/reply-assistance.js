import {formatDate} from './ui.js?v=20261118.8';
import {assessmentProjection,sourceRecords,score,band} from './model.js?v=20261118.8';
const normalize=v=>String(v||'').toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
const unique=items=>[...new Set(items)];
export function replyIntents(question){
 const q=normalize(question),intents=[];
 if(/\b(owner|owns|responsible|accountable|ownership)\b|\bwho\b.{0,35}\bin charge\b/.test(q))intents.push('owner');
 if(/\b(when|due|deadline|date|timing)\b/.test(q))intents.push('due');
 if(/\b(test|tests|tested|testing|sample|samples|population|scope|cover|covers|covered)\b/.test(q)||/standard route|urgent requests?|urgent payments?/.test(q))intents.push('scope');
 if(/\b(independent|independence|verification|source|sources|shared)\b/.test(q))intents.push('source');
 if(/\b(rating|score|likelihood|impact|rationale|rated|residual|conclusion)\b/.test(q))intents.push('rating');
 if(/\b(missing|gap|gaps|unknown|outstanding|evidence|closure|complete|completion)\b/.test(q))intents.push('evidence');
 return intents;
}
function replyContext(data,s){
 const p=s.submitted?assessmentProjection(s,s.versionNumber,data):assessmentProjection(s,'current',data),risks=Object.values(p?.risks||s.risks||{}),q=normalize(s.question);
 const named=risks.filter(r=>q.includes(normalize(r.name))||r.id==='duplicate-release'&&/duplicate|retry|retries/.test(q)||r.id==='details'&&/incorrect payment|payment details/.test(q)||r.id==='cutoff'&&/delayed execution|cutoff|outage/.test(q)||r.id==='unauthorized'&&/unauthorized|impersonation/.test(q));
 if(named.length>1&&!s.replyRiskId)return {ambiguous:true,risks:named};
 const pinned=['open','responded'].includes(s.challengeStatus),targetId=pinned?(s.questionRiskId||s.selectedRisk):(s.selectedRisk||s.questionRiskId);
 const risk=(s.replyRiskId?risks.find(r=>r.id===s.replyRiskId):null)||named[0]||risks.find(r=>r.id===targetId),sources=p?.sources?.length?p.sources:sourceRecords(data,s);
 if(!risk)return {ambiguous:true,risks};
 const operational=p?.operations?.actions?.[risk.id],hasResponseAction=!!risk.riskResponse?.created&&risk.riskResponse.strategy!=='accept';
 const action=operational&&!operational.superseded?{...operational,evidence:operational.requiredEvidence||operational.evidence||''}:hasResponseAction?(risk.id==='unauthorized'?(p?.action||s.action):risk.responseAction):null;
 return {risk,action,sources,controls:p?.controls||s.evidenceContext?.controls||data.controls||[],version:p?.version||s.versionNumber||0};
}
export function replyActionFacts(data,s){const context=replyContext(data,s),action=context.action;return {riskId:context.risk?.id||null,actionRecorded:!!action,actionEvidence:action?.evidence||'',actionStatus:action?.status||'recorded',actionOwner:action?.owner||'',actionDue:action?.due||''};}
export function replySuggestion(data,s){
 const context=replyContext(data,s),intents=replyIntents([s.question,s.reviewReturn?.rationale].filter(Boolean).join(' '));
 if(/\bapprov\w*|\bauthori[sz]\w*|\bsign(?:ed)? off\b/i.test(s.question||''))return {kind:'unsupported',text:'These assessment records do not show who approved the activity. Check the linked decision record, or request the original approval. Owning an action does not give someone authority to approve it.',sourceIds:[],intents:[],unsupported:true};
 if(context.ambiguous)return {kind:'clarify',text:`Which risk should this question address: ${context.risks.map(r=>r.name).join(', ')}? Select the risk so the reply uses the correct records.`,sourceIds:[],intents:[],needsClarification:true,candidates:context.risks.map(r=>({id:r.id,name:r.name}))};
 const {risk:r,action:a,sources,version}=context,sourceIds=unique(r.sources||[]),answers=[],cues=[];
 if(!a&&(intents.includes('owner')||intents.includes('due')))return {kind:'missing-action',actionRecorded:false,text:`No follow-up action is recorded for ${r.name.toLowerCase()}${version?' in assessment version '+version:''}. An action owner, due date and completion evidence have not been assigned. If further work is needed, record a response and linked action first.`,sourceIds,intents,cues:[],riskId:r.id,submissionVersion:version};
 const add=(id,text,label,match)=>{answers.push(text);cues.push({id,label,match});};
 if(intents.includes('owner'))add('owner',a?.owner?`${a.owner} owns the recorded action${a.title?`: ${a.title}`:'.'}`:'No action owner is recorded. Assign an accountable owner before claiming the action has one.','Recorded action owner',a?.owner||'');
 if(intents.includes('due'))add('due',a?.due?`The recorded due date is ${formatDate(a.due)}.`:'No action due date is recorded. Agree a date with the accountable owner.','Recorded due date',a?.due||'');
 if(intents.includes('scope')){
  const tests=sourceIds.map(id=>sources.find(x=>x.id===id)).filter(x=>x&&(['test','details-test','queue-review','signals-urgent-test','retry-test'].includes(x.id)||x.recordType==='control-test'));
  const scope=tests.length?tests.map(x=>`${x.title}: ${x.scope||'scope not recorded'}${x.date?' ('+x.date+')':''}.`).join(' '):'The linked records do not state which payments were tested or when. Request the scope, dates, sample selection and results.';
  add('scope',scope+(r.id==='unauthorized'?' The standard-route sample cannot establish operation on urgent requests. '+(sourceIds.includes('signals-urgent-test')?'The later urgent-payment review is a separate limited sample; its missing verification traces and the independent-source question remain to be resolved.':'The linked standard test predates the urgent exception route.'):'')+' Test conclusions apply only to the recorded scope.','Testing population and period','test');
 }
 if(intents.includes('source')){
  const controls=(r.controls||[]).map(id=>(context.controls||[]).find(x=>x.id===id)).filter(Boolean);
  const same=r.id==='unauthorized'&&['callback','approval'].every(id=>r.controls.includes(id));
  add('source',same?'The callback and approval procedures both reference the customer-contact record. A separate operator does not establish a separate information source. Evidence of independent urgent-request verification is still needed.':controls.length?`Review the verification information used by ${controls.map(x=>x.name).join(' and ')}. The recorded designs alone do not establish source independence; retain the source and version used for each check.`:'No verification source is linked to this risk. Request the control design and the information used before judging independence.','Verification source and its limits','source');
 }
 if(intents.includes('rating')){const value=score(r.residual);add('rating',value===null?'The risk has no recorded residual rating. The owner must assess likelihood and impact.':`The submitted risk-after-controls rating is ${band(value)} (${value}). ${r.residual.likelihoodRationale||''} ${r.residual.impactRationale||''}`,'Rating and reason',value===null?'':String(value));}
 if(intents.includes('evidence'))add('evidence',a?.evidence?`Evidence needed for the action: ${a.evidence}`:'No completion evidence has been specified. Record what would demonstrate implementation and whether the control works.','Evidence needed to finish','evidence');
 if(!answers.length)return {kind:'unsupported',text:`The available records for ${r.name.toLowerCase()} do not provide an answer to this question. Clarify the fact or evidence needed and request it from the record owner. Check the source before adding facts to your reply.`,sourceIds,intents:[],unsupported:true};
 return {kind:intents.length===1?intents[0]:'combined',text:answers.join('\n\n'),sourceIds,intents,cues,riskId:r.id,submissionVersion:version,actionRecorded:!!a,actionStatus:a?.status||'recorded'};
}
export function replyCoverage(data,s){const suggestion=replySuggestion(data,s),text=normalize(s.response);return (suggestion?.cues||[]).map(c=>({label:c.label,done:!!c.match&&text.includes(normalize(c.match))}));}
