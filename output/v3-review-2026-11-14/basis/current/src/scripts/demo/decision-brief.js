import {currentRating,score} from './model.js?v=20261114.6';

// Synthetic proposal for the leadership demonstration, not an approval record.
const proposal={owner:'Head of Payments Operations',forum:'Payments Risk Committee',targetDate:'2026-11-19'};

export function decisionBrief(s) {
  const risk=s.risks.unauthorized, response=risk.riskResponse;
  const required=!!risk.residualConfirmed&&score(currentRating(s,risk.id))>9;
  if(!required) {
    const status=risk.residualConfirmed?'No above-tolerance decision required':'Decision request not yet established';
    return {required:false,pending:false,status,label:status,title:'',question:'',owner:'',forum:'',targetDate:'',reviewDate:''};
  }
  const pending=!!s.submitted, status=pending?'Decision pending':'Draft decision request';
  const strategy=response.created?response.strategy:'mitigate';
  const requests={
    mitigate:{title:'Decide whether urgent-wire processing may continue',question:'May urgent-wire processing continue under the current arrangements while targeted testing and independent verification are completed?'},
    accept:{title:'Consider time-bound acceptance of the exposure',question:'Should the current unauthorized-wire exposure be accepted on a time-bound basis, subject to the requested acceptance review date?'},
    avoid:{title:'Decide on the proposed change or stop',question:'Should the proposed change or stop to urgent-wire activity proceed to remove the unauthorized-wire exposure?'},
    transfer:{title:'Review the transfer proposal and remaining exposure',question:'Should the proposed risk-transfer arrangement proceed, and what disposition is required for the unauthorized-wire exposure that remains?'}
  };
  return {required,pending,status,label:status,...(requests[strategy]||requests.mitigate),...proposal,reviewDate:strategy==='accept'?response.reviewDate:''};
}
