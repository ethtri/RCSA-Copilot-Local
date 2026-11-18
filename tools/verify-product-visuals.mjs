import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {BADGE_CSS,ICON_NAMES,RISK_BANDS,STATUS_TONES,icon,badge,ratingBadge,statusBadge,emptyState,loadingState,button} from '../src/scripts/demo/ui.js';

const luminance=hex=>hex.slice(1).match(/../g).map(part=>parseInt(part,16)/255).map(value=>value<=.04045?value/12.92:((value+.055)/1.055)**2.4).reduce((sum,value,index)=>sum+value*[.2126,.7152,.0722][index],0);
const contrast=(a,b)=>(Math.max(luminance(a),luminance(b))+.05)/(Math.min(luminance(a),luminance(b))+.05);

for(const [key,definition] of Object.entries(RISK_BANDS)){
  assert(contrast(definition.ink,definition.fill)>=4.5,`${key} risk text must contrast with its own fill`);
  for(const role of ['ink','fill','border'])assert(BADGE_CSS.includes(`--risk-${key}-${role}:${definition[role]};`));
  for(const value of [definition.min,definition.max]){
    assert(badge(value).includes(`risk-label ${key}`));
    assert(badge(value).includes(definition.label));
    assert(badge(value).includes(`>${value}</span>`));
  }
  assert(BADGE_CSS.includes(`.rmx-chart .rmx-cell--${key}{fill:var(--risk-${key}-fill)}`),'Matrices and badges must consume the same band tokens');
}
assert.notEqual(RISK_BANDS.low.ink,RISK_BANDS.moderate.ink,'Low and Moderate must not collapse to the same green text');
for(const invalid of [null,undefined,0,26,NaN,'<img src=x>'])assert.equal(badge(invalid),'<span class="no-rating">Not assessed</span>');
assert(ratingBadge({likelihood:null,impact:null}).includes('Not assessed'));
for(const tone of Object.values(STATUS_TONES))assert(contrast(tone.ink,tone.fill)>=4.5,'Status text must contrast with its fill');

for(const name of ICON_NAMES){
  const svg=icon(name);
  assert(svg.includes(`data-icon="${name}"`));
  assert(svg.includes('stroke-width="1.6"'));
  assert(svg.includes('aria-hidden="true" focusable="false"'));
  assert(!svg.includes('data-icon-fallback'));
}
const missingIcon=icon('nonexistent-record-type');
assert(missingIcon.includes('data-icon="help"'));
assert(missingIcon.includes('data-icon-fallback="true"'));
assert(!missingIcon.includes('data-icon="source"'),'An unknown glyph must not silently claim to be a document');
assert(icon('download','" onload="alert(1)').includes('width="18"'));

for(const [status,tone,glyph] of [['draft','neutral','draft'],['confirmed','success','check'],['planned','neutral','clock'],['in-progress','progress','sync'],['evidence-submitted','progress','source'],['returned','warning','return'],['closed','success','check'],['approved','success','check'],['declined','danger','blocked'],['expired','warning','clock'],['syncing','progress','sync'],['failed','danger','error'],['superseded','neutral','history'],['received','progress','source']]){
  const markup=statusBadge(status);
  assert(markup.includes(`pv-status--${tone}`),status);
  assert(markup.includes(`data-icon="${glyph}"`),status);
  assert(!markup.includes('data-icon-fallback'),status);
}
for(const label of ['Refresh due','Response needed','Changes requested','Awaiting review','Needs confirmation','Evidence needed','Scope to review','Evidence received','Evidence requested','Follow-up due','Deferred','Ready to submit','Refresh in progress','Reply needed','Reply received','Draft request','Acceptance approved','Acceptance expired'])assert(!statusBadge(label).includes('data-icon="help"'),`Known dashboard state ${label} needs an approved glyph`);
assert(statusBadge('unrecognized status').includes('pv-status--neutral'));
assert(statusBadge('unrecognized status').includes('data-icon="help"'));

const unsafe='<img src=x onerror="alert(1)">';
const status=statusBadge('pending',{label:unsafe,title:unsafe,className:unsafe});
assert(!status.includes('<img'));
assert(status.includes('&lt;img'));
const state=emptyState({title:unsafe,description:unsafe,details:unsafe,heading:'<script>',tone:'error',action:button('Try again','retry')});
assert(!state.includes('<img'));
assert(!state.includes('<script>'));
assert(state.includes('<h2>'));
assert(state.includes('role="alert"'));
assert(state.includes('data-icon="error"'),'Error states default to an error glyph');
assert(emptyState({tone:'success'}).includes('data-icon="check"'),'Completed states default to a check glyph');
assert(state.includes('<summary>Details</summary><pre>&lt;img'));
assert(state.includes('data-action="retry"'),'Trusted rendered actions remain usable');
const loading=loadingState({heading:'h1',description:unsafe});
assert(loading.includes('<h1>Preparing your workspace</h1>'));
assert(loading.includes('role="status" aria-live="polite" aria-busy="true"'));
assert(loading.includes('class="product-state-skeleton" aria-hidden="true"'));
assert(!loading.includes('<img'));

const stateCss=await readFile(new URL('../src/styles/product-visuals.css',import.meta.url),'utf8');
assert(stateCss.includes('@media(prefers-reduced-motion:reduce)'));
assert(BADGE_CSS.includes('@media(prefers-reduced-motion:reduce)'));
assert(stateCss.includes('white-space:pre-wrap;overflow-wrap:anywhere'),'Technical details must wrap without widening a phone screen');
console.log('PASS: shared risk/status tokens, readable contrast, band boundaries, approved icons and safe fallback, truthful workflow aliases, escaped state content, heading/announcement contracts and reduced-motion support.');
