// Relevance is curated background; source contents come from the available record set.
const relevance={
 unauthorized:{'external-bec-2025':'Shows reported losses and complaints from payment-instruction fraud. Compare it with this bank’s own events before considering a rating change.','external-bec-2024':'Provides the same prior-year category for a like-for-like comparison of reported complaints and losses.','external-bec-advisory':'Explains how compromised payment instructions and changed contact details can enable fraud. It supports reviewing the verification route.'},
 details:{'external-bec-advisory':'Describes risks when payment instructions change. It is relevant background for checking which instruction staff should use, rather than evidence of this bank’s error rate.'},
 cutoff:{'external-fedwire-continuity':'Useful background for checking cutoff, recovery and testing arrangements if the bank uses the relevant service. The bank’s own records determine its exposure.','external-fedwire-contingency':'Highlights why a fallback plan needs confirmed access and capacity. It does not establish this bank’s access to a particular contingency service.'}
};
export function relatedResearch(data,risk){
 const id=risk?.scenarioId||risk?.id,known=relevance[id];
 if(!known)return [];
 const catalog=data.context?.sources||[],available=Array.isArray(data.sources)?data.sources:catalog;
 return catalog.filter(source=>source.url&&source.riskIds?.includes(id)&&known[source.id])
  .map(source=>available.find(record=>record.id===source.id))
  .filter(source=>source?.url)
  .map(source=>({...source,relevance:known[source.id]}));
}
