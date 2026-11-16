import {scopeRecord} from './scope-model.js?v=20261115.20';
// Bounded, authored recommendations for the local assessment. No model call is implied.
const clone=value=>structuredClone(value);
const proposed=control=>control?.proposed===true||String(control?.status||'').toLowerCase()==='proposed';
const library=(data,s)=>[...(data.controls||[]),...(s.customControls||[])];
const normalize=text=>String(text||'').replace(/[“”]/g,'"').replace(/[’]/g,"'").replace(/\s+/g,' ').trim().replace(/[.!?]+$/,'').toLowerCase();

export function ensureAssistance(s){
  s.controlAssistance??={};
  const a=s.controlAssistance;
  if(!Array.isArray(a.decisions))a.decisions=[];
  if(!a.plans||typeof a.plans!=='object')a.plans={};
  if(!a.objectiveByRisk||typeof a.objectiveByRisk!=='object')a.objectiveByRisk={};
  return a;
}

export function assistanceCase(data,riskId){return data.assistance?.cases?.[riskId]||null;}

export function recommendationSet(data,s,riskId=s.selectedRisk,objective='core'){
  const context=assistanceCase(data,riskId);
  if(!context||!s.risks?.[riskId]||!context.objectives.some(item=>item.id===objective))return [];
  const decisions=s.controlAssistance?.decisions||[],controls=library(data,s),risk=s.risks[riskId];
  return context.candidates.map(candidate=>{
    const result=clone(candidate);
    const mapped=risk.controls.map(id=>controls.find(c=>c.id===id)).filter(Boolean);
    const linked=mapped.find(control=>candidate.kind==='existing'?control.id===candidate.existingControlId:knownProposal(context,control)?.id===candidate.id);
    const latest=decisions.filter(d=>d.riskId===riskId&&d.candidateId===candidate.id).at(-1);
    result.objective=objective;
    result.mapped=!!linked;result.controlId=linked?.id||null;
    result.disposition=latest?.disposition||'';
    result.decisionRationale=latest?.rationale||'';
    result.evidenceFocus=objective==='evidence';
    if(objective==='evidence')result.focus='Establish the stated population, period and implementation evidence before relying on this approach.';
    return result;
  });
}

function knownProposal(context,control){
  const a=control?.assistance||{};
  const candidateId=a.candidateId||control?.assistanceCandidateId;
  if(a.riskId&&a.riskId!==context.candidates[0]?.riskId)return null;
  return context.candidates.find(candidate=>candidate.id===candidateId&&candidate.kind!=='existing')||null;
}

// A received review is usable only when this risk links the source supplied by the
// current view. Submitted controls pass preserved sources and risk links here.
function urgentReview(data,risk){
 if(risk?.id!=='unauthorized'||!(risk.sources||[]).includes('signals-urgent-test'))return null;
 const source=(data.sources||[]).find(row=>row.id==='signals-urgent-test'),m=source?.metrics;
 if(m?.schemaVersion!==1||m.riskId!=='unauthorized'||!Number.isInteger(m.sampleSize)||m.sampleSize<1||!Number.isInteger(m.missingVerificationTrace)||m.missingVerificationTrace<0||m.missingVerificationTrace>m.sampleSize||!Number.isInteger(m.recordedApproval)||m.recordedApproval<0||m.recordedApproval>m.sampleSize||typeof m.independentSourceEstablished!=='boolean'||!/^\d{4}-\d{2}-\d{2}$/.test(m.fullTestDue||''))return null;
 const date=new Date(m.fullTestDue+'T12:00:00Z');if(Number.isNaN(date.getTime())||date.toISOString().slice(0,10)!==m.fullTestDue)return null;
 const due=date.toLocaleDateString('en-US',{month:'long',day:'numeric',timeZone:'UTC'});
 return {source,metrics:m,due,detail:`The early urgent-payment review found ${m.missingVerificationTrace} of ${m.sampleSize} files without a retained verification-source trace. ${m.recordedApproval} files had recorded approval. ${m.independentSourceEstablished?'The review records source independence for its sample; broader coverage still needs testing.':'The review did not establish an independent contact source.'} The broader targeted test remains due ${due}; ${m.issueId||'the evidence issue'} remains open.`,evidence:`Resolve the ${m.missingVerificationTrace} missing verification-source traces from UT-12. Record the independently established source, approval and release evidence for the broader targeted test due ${due}. Keep unresolved exceptions and the issue status visible.`};
}

export function controlSetSignature(data,s,riskId=s.selectedRisk){
  const risk=s.risks?.[riskId];if(!risk)return '';
  const controls=library(data,s);
  return JSON.stringify({riskId,assessmentScope:scopeRecord(s),controls:[...(risk.controls||[])].sort().map(id=>{
    const c=controls.find(item=>item.id===id);
    return {id,name:c?.name,owner:c?.owner,design:c?.design,purpose:c?.purpose,status:c?.status||'Existing',operation:c?.operation,evidence:c?.evidence,
      frequency:c?.frequency,population:c?.population,informationSource:c?.informationSource,
      exceptions:c?.exceptions,evidenceRetained:c?.evidenceRetained,validation:c?.validation,
      source:c?.source,test:c?.test,assistance:c?.assistance||c?.assistanceCandidateId||null,
      rationale:risk.mappingRationale?.[id]||'',applicability:risk.mappingApplicability?.[id]?.conclusion||'prepared'};
  }),conclusion:risk.controlConclusion?.text||'',newEvidenceReceived:!!s.newEvidenceReceived,...(urgentReview(data,risk)?{urgentReview:urgentReview(data,risk).source}:{})});
}

function finding(id,title,detail,kind,sourceIds,nextAction){return {id,title,detail,kind,sourceIds:[...sourceIds],nextAction};}

export function coverageAnalysis(data,s,riskId=s.selectedRisk){
  const context=assistanceCase(data,riskId),risk=s.risks?.[riskId];
  if(!context||!risk)return {supported:false,findings:[finding('unsupported','Analysis unavailable for this risk','Inspect the risk records and record a control conclusion. Automated assistance is unavailable for this risk.','boundary',[],'Inspect the risk evidence')],conclusion:'No suggested control conclusion is available for this risk.',designCandidateIds:[],proposedControlIds:[]};
  const review=urgentReview(data,risk),operatingGap=review?review.detail:context.operatingGap;
  const controls=library(data,s),mapped=(risk.controls||[]).map(id=>controls.find(c=>c.id===id)||{id,name:id});
  const designControls=mapped.filter(c=>knownProposal(context,c)),proposedControls=designControls.filter(proposed);
  const designCandidateIds=[...new Set(designControls.map(c=>knownProposal(context,c).id))];
  const unknown=mapped.filter(c=>!context.knownControlIds.includes(c.id)&&!knownProposal(context,c));
  const findings=[];
  if(!mapped.length)findings.push(finding('no-mappings','No controls are mapped in this assessment','No mapped protection is recorded here. This does not establish that no controls exist in the organization; inspect the process and record the owner conclusion.','design',context.sourceIds,'Review candidate controls'));
  if(unknown.length)findings.push(finding('unsupported-mappings','Additional mappings need individual review',`Risk-specific analysis is unavailable for ${unknown.map(c=>c.name).join(', ')}. The findings below cover the known records only; assess these additional designs separately.`,'boundary',[],'Inspect the additional control definitions'));
  if(riskId==='unauthorized'&&['callback','approval'].every(id=>risk.controls.includes(id))){
    findings.push(finding('shared-source','Two checks reference one contact record','The callback and approval descriptions reference the customer-contact record. Separate operators do not establish independent information sources. Validate the relationship and consider it when judging combined protection.','dependency',['callback','approval','incident'],'Inspect source independence'));
  }
  if(riskId==='unauthorized'&&mapped.some(c=>['customer-confirmation','details-check'].includes(c.id))){
    findings.push(finding('limited-detail-coverage','Checking payment details does not verify the sender’s identity','These checks help verify the recipient and amount for the payments they cover. They do not show how staff verify the sender’s identity after contact details change.','limitation',['customer-confirmation-test','details-test','incident'],'Review how the sender’s authority is checked'));
  }
  if(designControls.length){
    const reviewed=designControls.every(c=>risk.mappingApplicability?.[c.id]?.conclusion==='covers');
    findings.push(finding('proposed-design',reviewed?'The owner assessed the proposed design':'The owner needs to review the proposed design',`${designControls.map(c=>c.name).join('; ')} ${reviewed?'has been assessed by the owner as a design that should address this risk':'is mapped, but the owner still needs to assess whether it addresses this risk'}. Review the current design and its coverage before confirming.`,'design-proposal',context.sourceIds,'Review design and coverage'));
    if(proposedControls.length)findings.push(finding('implementation-open','The proposed control is not in place yet',`The proposed ${proposedControls.map(c=>c.name).join('; ')} has no implementation or operating result in the available records. Keep the current caveat in the assessment. Plan how to put the control in place and test it.`,'implementation',context.sourceIds,'Generate an implementation and validation plan'));
    if(designControls.some(c=>!proposed(c)))findings.push(finding('operation-unverified','Marking a control implemented does not prove it works','A status update or revised design is not a test. Review evidence that the control is in place and works for these payments before changing the conclusion.','evidence',context.sourceIds,'Inspect implementation and operating evidence'));
  }else findings.push(finding('design-gap','A design question remains open',context.designGap,'design',context.sourceIds,'Compare an enhancement or new design'));
  findings.push(finding('operating-scope',review?'Early urgent review found missing verification traces':riskId==='unauthorized'?'Urgent payments still need testing':'Testing does not cover this scenario',operatingGap,'evidence',review?[...new Set([...context.sourceIds,review.source.id])]:context.sourceIds,review?'Resolve the missing traces and complete the broader test':'Prepare a targeted test brief'));
  const pending=mapped.filter(c=>risk.mappingApplicability?.[c.id]?.conclusion==='unassessed');
  if(pending.length)findings.push(finding('applicability-pending','New relationships need an owner assessment',`${pending.map(c=>c.name).join('; ')} still needs an owner assessment. Mapping a control does not prove that it addresses this risk.`,'judgment',context.sourceIds,'Assess mapped control coverage'));
  const noExtraNeeded=riskId==='cutoff'&&!designControls.length&&risk.controls.includes('queue');
  if(noExtraNeeded)findings.push(finding('test-first','First establish whether a new design is needed','Keep the monitoring conclusion supported by the records and test a longer outage. Add a backup process or earlier alert only if the owner decides it is needed.','option',['queue-review','ri-cutoff-issue'],'Validate the existing approach'));
  let conclusion=review?`Standard-wire evidence remains limited to its tested population. ${review.detail} Source independence and the missing traces remain unresolved; this early review does not validate a proposed control.`:context.qualifiedConclusion;
  if(mapped.length&&context.baselineControlIds.length&&!context.baselineControlIds.some(id=>risk.controls.includes(id)))conclusion=`The original control relationships are not mapped in the current set. ${operatingGap} Review the mapped controls and record how they address this risk.`;
  if(!mapped.length)conclusion=`No controls are mapped in this assessment. ${context.designGap} ${review?review.detail+' ':''}The owner must assess the controls in place and review the evidence that they work.`;
  if(designControls.length)conclusion+=` ${designControls.map(c=>c.name).join('; ')} is recorded as ${proposedControls.length?'a proposed design':'an owner-recorded design'}. The records do not yet show that the control is in place and works for these payments. The owner must review the revised design.`;
  if(unknown.length)conclusion+=' Additional mapped controls are outside the available analysis and require separate owner review.';
  return {supported:unknown.length===0,findings,conclusion,designCandidateIds,proposedControlIds:proposedControls.map(c=>c.id),noAdditionalControlRequired:noExtraNeeded};
}

export function preparePlan(data,s,riskId=s.selectedRisk,candidateId){
  const context=assistanceCase(data,riskId),risk=s.risks?.[riskId];if(!context||!risk)return null;
  const controls=library(data,s),mapped=risk.controls.map(id=>controls.find(c=>c.id===id)).filter(Boolean);
  const proposals=mapped.map(c=>({control:c,candidate:knownProposal(context,c)})).filter(row=>row.candidate);
  const candidateMapped=candidate=>candidate.kind==='existing'?risk.controls.includes(candidate.existingControlId):proposals.some(row=>row.candidate.id===candidate.id);
  const latestUsed=[...(s.controlAssistance?.decisions||[])].reverse().find(d=>d.riskId===riskId&&d.disposition==='used'&&context.candidates.some(c=>c.id===d.candidateId&&candidateMapped(c)));
  const chosenId=candidateId||latestUsed?.candidateId||proposals.at(-1)?.candidate.id||context.candidates.find(c=>c.kind==='existing')?.id;
  const candidate=context.candidates.find(c=>c.id===chosenId);if(!candidate)return null;
  const result=clone(candidate.plan),usedControl=proposals.find(row=>row.candidate.id===chosenId)?.control;
  // An edited design stays the plan's actual operational measure, not a silently restored fixture.
  if(usedControl?.design)result.protection=usedControl.design;
  if(usedControl?.owner){
    const preparedOwner=candidate.designDraft?.owner;
    result.owner=usedControl.owner;
    result.implementationTasks=result.implementationTasks.map(task=>({...task,owner:task.owner===preparedOwner?usedControl.owner:task.owner}));
  }
  result.riskId=riskId;result.candidateId=chosenId;result.kind=candidate.kind;
  result.sourceIds=[...candidate.sourceIds];result.controlId=usedControl?.id||candidate.existingControlId||null;
  result.controlSetSignature=controlSetSignature(data,s,riskId);result.needsReview=false;
  result.rationale=candidate.summary+' '+candidate.limits;
  result.basis=context.exposure;result.proposed=true;
  const review=urgentReview(data,risk);
  if(review){
    result.sourceIds=[...new Set([...result.sourceIds,review.source.id])];
    result.rationale=candidate.summary+' '+(candidate.kind==='existing'?'Customer confirmation does not establish independent verification of the sender.':candidate.limits)+' '+review.detail;
    result.basis+=' '+review.detail;
    result.evidence=review.evidence+' '+result.evidence;
    result.validationTasks=[{title:'Resolve the missing UT-12 verification-source traces and retain the follow-up evidence.',owner:'Payments Control Assurance',due:review.metrics.fullTestDue,evidence:review.evidence},...result.validationTasks];
  }
  result.dependencies=[candidate.kind==='existing'?'Owner decision on which payments the control covers':'Owner design approval and operational implementation', 'Saved evidence for the payments selected for testing'];
  if(usedControl?.name)result.selectedControlName=usedControl.name;
  if(usedControl)result.designDetails=Object.fromEntries(['frequency','population','informationSource','exceptions','evidenceRetained','validation'].map(key=>[key,usedControl[key]||'Owner to confirm']));
  return result;
}

export function recordAssistanceDecision(s,decision){
  if(s.role!=='first'||s.submitted||!s.risks?.[decision?.riskId]||!String(decision.candidateId||'').trim()||!['existing','enhance','new'].includes(decision.kind)||!['used','dismissed'].includes(decision.disposition)||!String(decision.rationale||'').trim())return false;
  if(decision.disposition==='used'&&decision.controlId&&!s.risks[decision.riskId].controls.includes(decision.controlId))return false;
  const a=ensureAssistance(s),entry={id:'control-decision-'+(a.decisions.length+1),riskId:decision.riskId,candidateId:decision.candidateId,kind:decision.kind,disposition:decision.disposition,rationale:String(decision.rationale).trim(),controlId:decision.controlId||null,objective:decision.objective||'core',sourceIds:Array.isArray(decision.sourceIds)?[...decision.sourceIds]:[],basisSignature:decision.controlSetSignature||null,versionNumber:s.versionNumber||0,actor:'Alex Morgan',date:'Nov 14, 2026'};
  a.decisions.push(entry);s.history??=[];
  s.history.push({actor:entry.actor,date:entry.date,text:`${entry.disposition==='used'?'Used':'Dismissed'} an AI control ${entry.kind==='enhance'?'enhancement':entry.kind==='new'?'design':'recommendation'} for ${s.risks[entry.riskId].name}.`,detail:entry.rationale});
  return true;
}

export function checkControlClaim(data,s,text,riskId=s.selectedRisk){
  const context=assistanceCase(data,riskId),value=normalize(text);
  const boundary='Only selected claims about test scope are checked. The full conclusion has not been evaluated. Review the linked evidence.';
  const result={status:'unknown',title:'Review the evidence coverage',detail:'This wording cannot be checked automatically. Compare it with the linked records: which payments and dates were tested, and which verification sources were used?',sourceIds:context?[...context.sourceIds]:[],suggestedText:context?coverageAnalysis(data,s,riskId).conclusion:'',scope:boundary};
  if(!context||!value)return {...result,title:value?result.title:'Add a conclusion to examine'};
  const knownQualified=[context.qualifiedConclusion,coverageAnalysis(data,s,riskId).conclusion,...context.candidates.map(c=>c.conclusion)].map(normalize);
  if(knownQualified.includes(value))return {...result,status:'supported',title:'Review the payments, dates and sources tested',detail:'This suggested conclusion distinguishes tested payments from checks that still need evidence. Verify it against the linked sources. The full text has not been evaluated, and control effectiveness has not been approved.'};
  // Negation is not a proof of the opposite. Unrecognized qualified wording remains unknown.
  const negated=/\b(?:not|no|never|cannot|can't|unproven|unestablished|unknown|unresolved|unvalidated)\b|\b(?:doesn't|isn't|aren't|hasn't|haven't)\b|\b(?:not yet|not established)\b/.test(value);
  const positivePatterns={
    unauthorized:[/\b(?:both|two)\b.{0,55}\b(?:checks|controls)\b.{0,50}\bindependent(?:ly)?\b/,/\b(?:every|all)\b.{0,30}\burgent\b.{0,60}\b(?:tested|effective|verified|covered)\b/,/\bindependent(?:ly)?\b.{0,35}\b(?:every|all)\b.{0,15}\burgent\b/],
    details:[/\b(?:every|all)\b.{0,25}\bamended\b.{0,70}\b(?:checked|verified|validated)\b/,/\bversion\b.{0,30}\b(?:always|fully|proven)\b/],
    cutoff:[/\bfallback\b.{0,45}\b(?:tested|effective|validated|proven)\b.{0,65}\b(?:every|all|any|prolonged)\b/,/\b(?:every|all|any)\b.{0,30}\boutage\b.{0,40}\b(?:covered|tested|safe|effective)\b/]
  };
  if(!negated&&(value===normalize(context.overbroadClaim)||(positivePatterns[riskId]||[]).some(pattern=>pattern.test(value))))return {...result,status:'overbroad',title:'Check the scope of this claim',detail:riskId==='unauthorized'?'The procedure descriptions reference the customer-contact record, and WT-25 excludes the post-change urgent route. They do not establish independent verification of every urgent request.':riskId==='details'?'The standard-payment test does not show whether staff checked the latest instructions after a change. PI-12 and the stopped payment show that this still needs review.':'The October review and recovery from a seventeen-minute outage do not prove that a backup process can handle longer outages or busier periods.'};
  return result;
}
