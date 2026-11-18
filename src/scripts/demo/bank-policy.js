// Bank-owned assessment rules. Reading a policy or editing its draft never applies it.
const copy=value=>structuredClone(value);
const LIKELIHOOD=['Rare','Unlikely','Possible','Likely','Almost certain'];
const IMPACT=['Minor','Moderate','Significant','Major','Severe'];
const LIKELIHOOD_GUIDE=[
 'An unusual event with little relevant experience. Explain the basis for this judgment.',
 'Could happen, but is not expected in normal conditions. Consider relevant events and exposure.',
 'Could happen under plausible conditions. Consider changes, events and control limitations.',
 'Expected in some operating conditions. Explain the frequency or exposure that supports the judgment.',
 'Expected in most relevant conditions. Explain the evidence and the period being assessed.'
];
const IMPACT_GUIDE=[
 'A small, contained effect with routine recovery.',
 'A noticeable effect that can be managed within the normal team response.',
 'A significant customer or business effect that needs management attention.',
 'A material customer or business effect that needs a coordinated response.',
 'A severe customer or business effect that could threaten important services or obligations.'
];
export function defaultPolicy(){return {id:'likelihood-impact-5-v1',version:1,name:'Five-point assessment',policyId:'payments-rcsa',policyVersion:1,policyName:'Payments RCSA policy',policyReference:'Example bank policy · RCSA-PAY-01',tolerance:9,likelihood:copy(LIKELIHOOD),impact:copy(IMPACT),likelihoodDefinitions:copy(LIKELIHOOD_GUIDE),impactDefinitions:copy(IMPACT_GUIDE),requireEvidence:true,requireIndependentReview:true,reviewerName:'Jordan Lee',reviewerRole:'Independent reviewer'};}
export function policyFor(value){
 const raw=value?.evidenceContext?.ratingMethod||value?.ratingMethod||((value?.id||value?.tolerance!==undefined)?value:null)||{},fallback=defaultPolicy();
 const policy={...fallback,...copy(raw)};
 for(const key of ['likelihood','impact','likelihoodDefinitions','impactDefinitions'])if(!Array.isArray(policy[key])||policy[key].length!==5)policy[key]=fallback[key];
 policy.requireEvidence=raw.requireEvidence===undefined?true:raw.requireEvidence===true;
 policy.requireIndependentReview=true;
 return policy;
}
export const thresholdFor=value=>Number(policyFor(value).tolerance);
export const evidenceRequired=value=>policyFor(value).requireEvidence;
export const independentReviewRequired=()=>true;
export const reviewerFor=value=>policyFor(value).reviewerName;
export const policySummary=value=>{const p=policyFor(value);return `${p.policyName} · version ${p.policyVersion}. A score above ${p.tolerance} needs a response. ${p.requireIndependentReview?'Independent review is required.':'The owner confirms the assessment; independent review is optional.'}`;};
const editable=s=>s.role==='admin'&&!s.submitted;
const signature=value=>JSON.stringify(value);
const fieldNames=['policyName','policyReference','tolerance','requireEvidence','reviewerName'];
function setup(s){s.bankSetup??={};return s.bankSetup;}
export function beginPolicyDraft(s){
 if(!editable(s))return {ok:false,message:s.submitted?'Start a new assessment draft before changing the bank setup.':'Only the bank setup administrator can edit these rules.'};
 const view=setup(s);view.draft=copy(policyFor(s));view.base=signature(policyFor(s));view.reviewed=false;view.errors=[];return {ok:true};
}
export function mutateBankSetupField(s,key,value){
 if(!key.startsWith('bankSetup.'))return false;
 if(!editable(s)||!s.bankSetup?.draft)return true;
 const field=key.slice('bankSetup.'.length),d=s.bankSetup.draft;
 if(fieldNames.includes(field))d[field]=['requireEvidence','requireIndependentReview'].includes(field)?value===true||value==='true':field==='tolerance'?value:String(value);
 else {
  const match=/^(likelihood|impact|likelihoodDefinitions|impactDefinitions)\.(\d)$/.exec(field);
  if(!match||Number(match[2])>4)return true;
  d[match[1]][Number(match[2])]=String(value);
 }
 s.bankSetup.reviewed=false;s.bankSetup.errors=[];return true;
}
export function validatePolicyDraft(d,{ownerName='Alex Morgan'}={}){
 const errors=[];
 if(!d)return [{field:'policyName',message:'Choose Edit bank setup before making changes.'}];
 for(const [key,label,max]of [['policyName','policy name',100],['policyReference','policy reference',160],['reviewerName','reviewer name',100]]){
  const text=String(d[key]||'').trim();if(!text)errors.push({field:key,message:`Enter the ${label}.`});else if(text.length>max)errors.push({field:key,message:`Keep the ${label} to ${max} characters or fewer.`});
 }
 if([ownerName,'Alex Morgan'].some(owner=>String(d.reviewerName||'').trim().toLowerCase()===String(owner).trim().toLowerCase()))errors.push({field:'reviewerName',message:'Choose a reviewer who is different from the assessment owner.'});
 if(!Number.isInteger(Number(d.tolerance))||Number(d.tolerance)<1||Number(d.tolerance)>24)errors.push({field:'tolerance',message:'Choose a response threshold from 1 to 24.'});
 if(typeof d.requireEvidence!=='boolean')errors.push({field:'requireEvidence',message:'Choose Yes or No for linked evidence.'});
 if(d.requireIndependentReview!==true)errors.push({field:'requireIndependentReview',message:'Independent review remains required for this workflow.'});
 for(const key of ['likelihood','impact','likelihoodDefinitions','impactDefinitions']){
  if(!Array.isArray(d[key])||d[key].length!==5){errors.push({field:key,message:'Keep all five levels in the rating scale.'});continue;}
  d[key].forEach((text,index)=>{if(!String(text||'').trim())errors.push({field:`${key}.${index}`,message:`Complete the ${key.startsWith('likelihood')?'likelihood':'impact'} ${key.endsWith('Definitions')?'definition':'label'} for level ${index+1}.`});else if(String(text).length>(key.endsWith('Definitions')?400:45))errors.push({field:`${key}.${index}`,message:`Shorten the ${key.startsWith('likelihood')?'likelihood':'impact'} ${key.endsWith('Definitions')?'definition':'label'} for level ${index+1}.`});});
 }
 return errors;
}
export function policyChanges(s){
 const p=policyFor(s),d=s.bankSetup?.draft;if(!d)return [];
 const rows=[];
 const add=(key,label,before,after)=>{if(signature(before)!==signature(after))rows.push({key,label,before:String(before),after:String(after)});};
 add('policyName','Policy name',p.policyName,String(d.policyName||'').trim());add('policyReference','Policy reference',p.policyReference,String(d.policyReference||'').trim());
 add('tolerance','A response is required above',p.tolerance,Number(d.tolerance));
 add('requireEvidence','Linked evidence required',p.requireEvidence?'Yes':'No',d.requireEvidence?'Yes':'No');
 add('reviewerName','Independent reviewer',p.reviewerName,String(d.reviewerName||'').trim());
 for(const key of ['likelihood','impact','likelihoodDefinitions','impactDefinitions'])if(signature(p[key])!==signature(d[key]))rows.push({key,label:`${key.startsWith('likelihood')?'Likelihood':'Impact'} ${key.endsWith('Definitions')?'definitions':'labels'}`,before:'Current five levels',after:'Revised five levels'});
 return rows;
}
export function reviewPolicyDraft(s,options={}){
 const view=setup(s);if(!editable(s))return {ok:false,message:s.submitted?'Start a new assessment draft before changing the bank setup.':'Only the bank setup administrator can edit these rules.'};
 const errors=validatePolicyDraft(view.draft,{ownerName:s.assessmentScope?.owner,...options});view.errors=errors;if(errors.length)return {ok:false,errors,message:'Check the bank setup fields before continuing.'};
 if(view.base!==signature(policyFor(s)))return {ok:false,message:'The bank setup changed while you were editing. Cancel and reopen it before continuing.'};
 view.reviewed=true;view.reviewedDraft=signature(view.draft);return {ok:true,changes:policyChanges(s)};
}
export function applyPolicyDraft(s,options={}){
 const view=setup(s);if(!editable(s))return {ok:false,message:s.submitted?'Start a new assessment draft before changing the bank setup.':'Only the bank setup administrator can save these rules.'};
 const errors=validatePolicyDraft(view.draft,{ownerName:s.assessmentScope?.owner,...options});if(errors.length){view.errors=errors;view.reviewed=false;return {ok:false,errors,message:'Complete the bank setup before saving.'};}
 if(!view.reviewed||view.reviewedDraft!==signature(view.draft)||view.base!==signature(policyFor(s)))return {ok:false,message:'Review the latest changes before saving the bank setup.'};
 const changes=policyChanges(s),old=policyFor(s);if(!changes.length){delete s.bankSetup;return {ok:true,changed:false,message:'The bank setup is unchanged.'};}
 const next=copy(view.draft);for(const key of ['policyName','policyReference','reviewerName'])next[key]=next[key].trim();for(const key of ['likelihood','impact','likelihoodDefinitions','impactDefinitions'])next[key]=next[key].map(v=>v.trim());
 next.id='likelihood-impact-5-v1';next.version=1;next.requireIndependentReview=true;next.tolerance=Number(next.tolerance);next.policyVersion=Number(old.policyVersion||1)+1;
 next.approvedBy='Morgan Chen';next.approvedAt=s.asOf||'2026-11-14';
 s.evidenceContext??={};s.evidenceContext.ratingMethod=next;
 const keys=changes.map(change=>change.key),ratingsChanged=keys.some(key=>['likelihood','impact','likelihoodDefinitions','impactDefinitions'].includes(key));
 for(const risk of Object.values(s.risks||{})){
  if(risk.removed)continue;
  if(ratingsChanged)risk.inherentConfirmed=false;
  if(ratingsChanged||keys.includes('tolerance')){risk.residualConfirmed=false;if(risk.riskResponse?.created)risk.riskResponse.needsReview=true;}
  if(keys.includes('requireEvidence')&&next.requireEvidence){risk.controlsConfirmed=false;risk.residualConfirmed=false;if(risk.riskResponse?.created)risk.riskResponse.needsReview=true;}
 }
 for(const proposal of Object.values(s.proposals||{}))if(!['dismissed','applied'].includes(proposal.status))proposal.status='stale';
 s.reportConfirmed='';s.history??=[];s.history.push({actor:'Morgan Chen',text:`Saved bank setup version ${next.policyVersion}.`,detail:changes.map(change=>`${change.label}: ${change.before} → ${change.after}`).join('; '),date:next.approvedAt});
 s.bankPolicyHistory??=[];s.bankPolicyHistory.push({previous:copy(old),current:copy(next),changes:copy(changes),actor:'Morgan Chen',date:next.approvedAt});delete s.bankSetup;
 return {ok:true,changed:true,message:`Bank setup version ${next.policyVersion} saved. Earlier submitted assessments are unchanged.`};
}
