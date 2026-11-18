import {thresholdFor,policyFor,reviewerFor} from './bank-policy.js?v=20261116.3';
import {currentRating,score} from './model.js?v=20261116.3';
import {ensureOperations,decisionStatus} from './operations.js?v=20261116.3';

// Synthetic proposal for the leadership demonstration, not an approval record.
const proposal={owner:'Head of Payments Operations',forum:'Payments Risk Committee',targetDate:'2026-11-19'};

export function decisionBrief(s,riskId='unauthorized') {
  const risk=s.risks[riskId]||Object.values(s.risks)[0], response=risk.riskResponse;
  const required=!!risk.residualConfirmed&&(score(currentRating(s,risk.id))>thresholdFor(s)||response.created&&response.strategy==='accept');
  if(!required) {
    const status=risk.residualConfirmed?'No management decision required by the threshold':'Assess the risk before preparing a decision request';
    return {required:false,pending:false,status,label:status,title:'',question:'',owner:'',forum:'',targetDate:'',reviewDate:''};
  }
  const request=ensureOperations(s).decisions[risk.id],localStatus=request?decisionStatus(s,request):'draft',pending=localStatus==='submitted',status=({draft:'Draft decision request',submitted:'Decision pending',returned:'Returned for changes',approved:'Approved with conditions',declined:'Request declined',expired:'Approval expired'})[localStatus]||'Draft decision request';
  const strategy=response.created?response.strategy:'mitigate';
  const requests={
    mitigate:{title:'Decide whether urgent-wire processing may continue',question:'Can urgent payments continue while verification is improved and tested?'},
    accept:{title:'Decide whether to accept this risk temporarily',question:'Should management accept the current unauthorized-wire risk until the requested review date?'},
    avoid:{title:'Decide whether to change or stop the activity',question:'Should management approve changing or stopping urgent-wire processing?'},
    transfer:{title:'Review the risk-transfer proposal and remaining risk',question:'Should the proposed risk-transfer arrangement proceed, and what decision is needed for the unauthorized-wire exposure that remains?'}
  };
  const wording=risk.id==='unauthorized'?(requests[strategy]||requests.mitigate):{title:strategy==='accept'?`Decide whether to accept ${risk.name.toLowerCase()}`:`Decide whether activity may continue: ${risk.name}`,question:request?.question||`May the activity continue while the response to ${risk.name.toLowerCase()} is completed?`};
  return {required,pending,status,label:status,...wording,...proposal,...(request?{owner:request.owner,forum:request.forum,targetDate:request.targetDate,conditions:request.conditions,id:request.id,recordVersion:request.version}:{}),reviewDate:request?.reviewDate||(strategy==='accept'?response.reviewDate:'')};
}
