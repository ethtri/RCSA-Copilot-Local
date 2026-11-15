import {currentRating,score} from './model.js?v=20261114.24';

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
    accept:{title:'Decide whether to accept this risk temporarily',question:'Should management accept the current unauthorized-wire risk until the requested review date?'},
    avoid:{title:'Decide on the proposed change or stop',question:'Should management approve the proposed change or stop to urgent-wire processing?'},
    transfer:{title:'Review the risk-transfer proposal and remaining risk',question:'Should the proposed risk-transfer arrangement proceed, and what decision is needed for the unauthorized-wire exposure that remains?'}
  };
  return {required,pending,status,label:status,...(requests[strategy]||requests.mitigate),...proposal,reviewDate:strategy==='accept'?response.reviewDate:''};
}
