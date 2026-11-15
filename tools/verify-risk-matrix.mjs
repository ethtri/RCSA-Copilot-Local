import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {matrix} from '../src/scripts/demo/ui.js';
import {band} from '../src/scripts/demo/model.js';

const ratings=Array.from({length:25},(_,i)=>[i%5+1,Math.floor(i/5)+1]);
let baseline;
for(const [likelihood,impact] of ratings) {
  const html=matrix(likelihood,impact);
  const cells=[...html.matchAll(/<rect\b[^>]*>/g)].map(([tag])=>Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(([,key,value])=>[key,value])));
  assert.equal(cells.length,25);
  assert.deepEqual(cells,baseline??=cells,'A selected score must never change cell geometry or band color');
  assert.equal(new Set(cells.map(c=>`${c.width},${c.height}`)).size,1);
  assert(cells.every(c=>c.width===c.height),'Every cell must be square');
  const columns=[...new Set(cells.map(c=>Number(c.x)))].sort((a,b)=>a-b);
  const rows=[...new Set(cells.map(c=>Number(c.y)))].sort((a,b)=>a-b);
  assert.equal(columns.length,5);assert.equal(rows.length,5);
  assert.equal(new Set(columns.slice(1).map((x,i)=>x-columns[i])).size,1);
  assert.equal(new Set(rows.slice(1).map((y,i)=>y-rows[i])).size,1);
  assert.deepEqual(cells.filter(c=>c['data-impact']==='5').map(c=>Number(c.y)),Array(5).fill(rows[0]));
  assert.deepEqual(cells.filter(c=>c['data-likelihood']==='1').map(c=>Number(c.x)),Array(5).fill(columns[0]));
  for(const cell of cells)assert(cell.class.includes(`rmx-cell--${band(Number(cell['data-likelihood'])*Number(cell['data-impact'])).toLowerCase()}`));
  assert(html.includes(`data-score="${likelihood*impact}"`));
  assert(html.includes(`Selected likelihood ${likelihood} of 5, impact ${impact} of 5; score ${likelihood*impact}, ${band(likelihood*impact)} risk.`));
  assert.equal((html.match(/rmx-tick--likelihood/g)||[]).length,5);
  assert.equal((html.match(/rmx-tick--impact/g)||[]).length,5);
  assert(html.includes('>Likelihood</text>'));
  assert(html.includes('rotate(-90)" dominant-baseline="central">Impact</text>'));
  assert(!html.includes('class="matrix'),'Legacy span/grid styling must not affect this map');
}
assert(!matrix('<img src=x>',3).includes('<img'));
assert(matrix(0,3).includes('No rating selected.'));
assert(!matrix(0,3).includes('class="rmx-selection"'));
assert(matrix('3','4').includes('data-score="12"'));
console.log('Risk matrix: all 25 selections preserve equal square cells, axis direction, semantic bands, marker and accessible summary.');

// Match the repository's optional browser-verification setup without adding a dependency.
if(process.env.PLAYWRIGHT_MODULE) {
  const require=createRequire(import.meta.url);
  const {chromium}=require(process.env.PLAYWRIGHT_MODULE);
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  try {
    const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1});
    const css=(await Promise.all(['demo','dashboard','controls','product-refresh','report-refinement','risk-matrix'].map(name=>readFile(new URL(`../src/styles/${name}.css`,import.meta.url),'utf8')))).join('\n');
    for(const width of [140,160,180,220]) {
      await page.setContent(`<style>${css}body{margin:0;background:#fff}.rmx-fixture{width:${width}px}</style>${ratings.map(([l,p])=>`<div class="rmx-fixture">${matrix(l,p)}</div>`).join('')}`);
      const results=await page.locator('.rmx-svg').evaluateAll(maps=>maps.map(svg=>{
        const bounds=svg.getBoundingClientRect();
        const cells=[...svg.querySelectorAll('.rmx-cell')].map(cell=>{const b=cell.getBoundingClientRect();return {width:b.width,height:b.height,x:b.x,y:b.y};});
        const labels=[...svg.querySelectorAll('text')].map(t=>{const b=t.getBoundingClientRect();return {text:t.textContent,bounds:[b.left-bounds.left,b.top-bounds.top,b.right-bounds.left,b.bottom-bounds.top],inside:b.left>=bounds.left-.1&&b.right<=bounds.right+.1&&b.top>=bounds.top-.1&&b.bottom<=bounds.bottom+.1};});
        const marker=svg.querySelector('.rmx-selection circle').getBoundingClientRect();
        const selected=svg.querySelector('.rmx-selection');
        const score=Number(selected.dataset.score);
        const cell=[...svg.querySelectorAll('.rmx-cell')].find(c=>{
          const b=c.getBoundingClientRect();return Math.abs((b.x+b.width/2)-(marker.x+marker.width/2))<.1&&Math.abs((b.y+b.height/2)-(marker.y+marker.height/2))<.1;
        });
        return {width:bounds.width,cells,labels,markerInCorrectCell:!!cell&&Number(cell.dataset.likelihood)*Number(cell.dataset.impact)===score};
      }));
      assert.equal(results.length,25);
      for(const result of results) {
        assert(Math.abs(result.width-width)<.1);
        for(const cell of result.cells) {
          assert(Math.abs(cell.width-cell.height)<.01,'Rendered cells must remain square');
          assert(Math.abs(cell.height-result.cells[0].height)<.01,'Rendered rows must have equal height');
        }
        assert(result.labels.every(l=>l.inside),`Axes, ticks and scores must stay within the SVG: ${JSON.stringify(result.labels.filter(l=>!l.inside))}`);
        assert(result.markerInCorrectCell,'The selected marker must be centered in its score cell');
      }
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    }
    if(process.env.RCSA_MATRIX_SCREENSHOT) {
      await page.setContent(`<style>${css}body{margin:0;background:#fff;padding:12px;display:flex;flex-wrap:wrap;gap:16px}.rmx-fixture{width:160px;font:11px var(--ui);color:#52675b}.rmx-fixture p{margin:0 0 8px}</style>${[[3,3],[3,4],[5,5],[1,1]].map(([l,p])=>`<div class="rmx-fixture"><p>Likelihood ${l} · Impact ${p}</p>${matrix(l,p)}</div>`).join('')}`);
      await page.screenshot({path:process.env.RCSA_MATRIX_SCREENSHOT,fullPage:true});
    }
    console.log('Isolated Chrome: all 25 selections at 140, 160, 180 and 220px pass rendered square-cell geometry, label bounds, marker placement and 390px overflow checks.');
  } finally {await browser.close();}
}
