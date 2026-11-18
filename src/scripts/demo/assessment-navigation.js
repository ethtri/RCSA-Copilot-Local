import {requirements} from './model.js?v=20261118.8';

const order=['changes','inherent','controls','discovery','residual','response'];
const steps={
  changes:['Go to scope','Confirm which risks are included.'],
  inherent:['Review risk before controls','Confirm the rating before controls for this risk.'],
  controls:['Complete control review','Confirm what the controls cover.'],
  discovery:['Review the shared source','Check whether both controls rely on the same information.'],
  residual:['Review risk rating','Confirm the remaining risk and explain the rating.']
};

export function earlierStep(s,stage='residual',id=s.selectedRisk,checks=requirements(s)){
  const earlier=order.slice(0,order.indexOf(stage));
  const row=checks.find(item=>!item.done&&earlier.includes(item.stage)&&(item.stage==='changes'||item.risk===id));
  if(!row)return null;
  if(row.key==='independence')return {stage:'changes',route:'settings/bank',label:'Assign an independent reviewer',reason:'Choose a reviewer who is independent of the owner.'};
  const [label,reason]=steps[row.stage];
  return {stage:row.stage,route:'assessment/'+row.stage,label,reason};
}
