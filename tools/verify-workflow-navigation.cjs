const assert = require('node:assert/strict');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');

async function checkNavigation(page, width) {
  const base = process.env.RCSA_PREVIEW_URL || 'http://127.0.0.1:8000/src/';
  const presenter = base + '?presenter=1';
  const action = name => page.locator(`[data-action="${name}"]:visible`).first();
  const field = name => page.locator(`[data-field="${name}"]`);
  const role = page.locator('#demo-role');
  const stage = async key => {
    if (width < 600) await page.getByLabel('Assessment step', { exact: true }).selectOption(key);
    else await page.locator(`.stages a[href="#/assessment/${key}"]`).click();
    await page.waitForURL('**#/assessment/' + key);
    await page.locator(`.stages [aria-current="step"][href="#/assessment/${key}"]`).waitFor({state:'attached'});
  };
  const heading = async name => page.getByRole('heading', { name, exact: true, level: 1 }).waitFor();
  const presentation = async () => {
    const panel = page.locator('.presentation-tools');
    if (await panel.getAttribute('open') === null) await panel.locator('summary').click();
  };
  await page.setViewportSize({width, height:900});
  await page.goto(presenter + '#/assessment/residual');
  if (width < 600) await page.locator('select[data-risk-select]').selectOption('details');
  else await page.locator('.risk-option[data-risk="details"]').click();
  const reason = 'The October sample supports keeping this rating.';
  await field('risk.residual.likelihoodRationale').fill(reason);
  await page.getByRole('button', {name:'Go to scope', exact:true}).click();
  await heading('Scope & changes');
  await action('confirm-scope').click();
  await heading('Assess risk after controls.');
  assert.equal(await field('risk.residual.likelihoodRationale').inputValue(),reason);
  await action('confirm-residual').click();
  await page.getByRole('button',{name:'Preview assessment report'}).click();
  await page.locator('.app-header a[aria-current="page"][href="#/reports"]').waitFor();
  await page.goBack();
  await page.getByRole('button',{name:'Preview assessment report'}).waitFor();
  for(const key of ['changes','inherent','controls','residual','response','review']) {
    await stage(key);
    await page.locator('main h1').waitFor();
  }
  await stage('residual');
  const selectRisk=async id=>{
    if(width<600)await page.locator('select[data-risk-select]').selectOption(id);
    else await page.locator(`.risk-option[data-risk="${id}"]`).click();
  };
  await selectRisk('details');
  await stage('inherent');
  await selectRisk('cutoff');
  await page.goBack();
  await heading('Assess risk after controls.');
  assert.equal(await page.locator('.risk-option.selected').getAttribute('data-risk'),'details');
  await page.goForward();
  await heading('Assess risk before controls.');
  assert.equal(await page.locator('.risk-option.selected').getAttribute('data-risk'),'cutoff');
  await page.getByRole('link',{name:'Bank setup',exact:true}).click();
  await page.getByRole('link',{name:'Dashboard',exact:true}).click();
  await heading('Your risk overview');
  await page.getByRole('link',{name:'Assessments',exact:true}).click();
  await heading('Assess risk before controls.');
  await page.getByRole('link',{name:'RCSA home',exact:true}).click();
  await page.locator('a[href="#/work"]').first().click();
  await heading('Your risk overview');
  await presentation();
  await page.getByLabel('Jump to demo scene').selectOption('submitted');
  await presentation();
  await role.selectOption('first');
  await stage('controls');
  await presentation();
  await role.selectOption('second');
  await heading('Review the assessment');
  await action('jump-decision').click();
  assert.equal(await page.locator(':focus').getAttribute('id'),'decision-heading');
  for(const key of ['changes','inherent','controls','residual','response','review']) await stage(key);
  assert.equal(await action('confirm-residual').count(),0);
  await action('complete-review').click();
  assert(await field('assessmentView').evaluate(el=>el===document.activeElement));
  await field('assessmentView').selectOption('agree');
  await field('reviewerRationale').fill('');
  await action('complete-review').click();
  assert(await field('reviewerRationale').evaluate(el=>el===document.activeElement));
  await field('reviewerRationale').fill('The explanation reflects the limits of the available test.');
  await action('complete-review').click();
  assert.equal(await page.locator(':focus').getAttribute('id'),'reviewer-attest');
  assert.equal(await page.locator(':focus').getAttribute('aria-describedby'),'reviewer-attest-error');
  await page.keyboard.press('Space');
  await page.keyboard.press('Tab');
  assert(await action('complete-review').evaluate(el=>el===document.activeElement));
  await page.keyboard.press('Enter');
  await heading('Review complete');
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
}

(async()=>{
  const browser=await chromium.launch({headless:true,channel:'chrome'});
  try {
    for(const width of [1395,390]) {
      const page=await browser.newPage();
      const errors=[];
      page.on('pageerror',e=>errors.push(e.message));
      try {
        await checkNavigation(page,width);
        assert.deepEqual(errors,[]);
      } finally {await page.close();}
    }
    console.log('PASS: prerequisite return, draft preservation, desktop and mobile stages, main navigation, history and reviewer handoff.');
  } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
