/* Optional browser checks. Install Playwright separately to run these. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { chromium } = require(process.env.LLM_QA_PLAYWRIGHT || 'playwright');
const root = path.resolve(__dirname, '..');
const output = path.join(root, '.qa');
fs.mkdirSync(output, { recursive: true });

(async () => {
  const browser = await chromium.launch({
    executablePath: process.env.LLM_QA_BROWSER_EXECUTABLE || undefined,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    headless: true
  });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, offline: true });
  const page = await context.newPage();
  const errors = [];
  const requests = [];
  context.on('page', p => p.on('pageerror', error => errors.push(error.message)));
  page.on('pageerror', error => errors.push(error.message));
  context.on('request', request => { if (/^https?:/.test(request.url())) requests.push(request.url()); });
  await page.goto(pathToFileURL(path.join(root, 'dist/episodio-01.html')).href);
  await page.waitForFunction(() => !!window.LLMDeck);
  const state = () => page.evaluate(() => window.LLMDeck.state());
  assert.equal((await state()).current, 0);
  assert.equal(await page.locator('.slide.active .notes').isVisible(), false);
  await page.keyboard.press('ArrowRight');
  assert.equal((await state()).current, 1);
  await page.evaluate(() => window.LLMDeck.goTo(4));
  for (let n = 1; n <= 3; n++) {
    await page.keyboard.press('ArrowRight');
    assert.equal((await state()).current, 4);
    assert.equal((await state()).revealed, n);
  }
  await page.keyboard.press('ArrowRight');
  assert.equal((await state()).current, 5);
  await page.keyboard.press('ArrowLeft');
  assert.equal((await state()).current, 4);
  assert.equal((await state()).revealed, 3);
  await page.keyboard.press('End');
  await page.keyboard.press('ArrowRight');
  assert.equal((await state()).current, 18, 'Normal navigation stops at questions');
  await page.keyboard.press('o');
  assert.equal(await page.locator('#overview').isVisible(), true);
  await page.locator('#overview-list button').nth(19).click();
  assert.equal((await state()).current, 19);
  await page.keyboard.press('End');
  await page.keyboard.press('b');
  assert.equal(await page.locator('#blackout').isVisible(), true);
  await page.keyboard.press('Escape');
  assert.equal(await page.locator('#blackout').isVisible(), false);
  await page.evaluate(() => window.LLMDeck.goTo(13));
  await page.locator('[data-lookup="73"]').click();
  assert.equal(await page.locator('#lookup-id').textContent(), '73');
  assert.equal(await page.locator('#lookup-vector').textContent(), '[−0,20; 0,50; 0,10; 0,60]');
  const popupPromise = page.waitForEvent('popup');
  await page.locator('[data-action="speaker"]').click();
  const speaker = await popupPromise;
  await speaker.waitForSelector('#speaker-notes');
  await speaker.setViewportSize({ width: 1450, height: 1000 });
  assert.ok((await speaker.locator('#speaker-notes').innerText()).includes('Fala sugerida'));
  assert.equal(await page.locator('.slide.active .notes').isVisible(), false);
  await page.evaluate(() => window.LLMDeck.goTo(4));
  await speaker.locator('#speaker-notes').evaluate(node => { node.scrollTop = 200; });
  const scrollBefore = await speaker.locator('#speaker-notes').evaluate(node => node.scrollTop);
  assert.ok(scrollBefore > 0);
  await page.keyboard.press('ArrowRight');
  assert.equal(await speaker.locator('#speaker-notes').evaluate(node => node.scrollTop), scrollBefore);
  await speaker.locator('#timer-toggle').click();
  await speaker.waitForFunction(() => document.getElementById('clock').textContent !== '00:00');
  await speaker.locator('#timer-toggle').click();
  await speaker.locator('#timer-reset').click();
  assert.equal(await speaker.locator('#clock').textContent(), '00:00');
  await speaker.screenshot({ path: path.join(output, 'speaker.png') });
  await speaker.close();
  console.log('PASS: offline navigation, fragments, appendices, lookup, presenter popup and timer');

  const layoutIssues = [];
  for (const width of [1440, 375]) {
    await page.setViewportSize({ width, height: 900 });
    for (let i = 0; i < 22; i++) {
      await page.evaluate(index => window.LLMDeck.goTo(index, true), i);
      const issue = await page.evaluate(() => {
        const slide = document.querySelector('.slide.active');
        const rect = slide.getBoundingClientRect();
        const elements = [...slide.querySelectorAll('h1,h2,h3,p,.token,table,dt,dd')].filter(el => !el.closest('.notes'));
        const outside = elements.filter(el => {
          const b = el.getBoundingClientRect();
          return b.width && (b.right > rect.right + 1 || b.left < rect.left - 1 || (innerWidth > 700 && b.bottom > rect.bottom - 18));
        }).map(el => el.textContent.slice(0, 55));
        return { outside, horizontal: document.documentElement.scrollWidth > innerWidth + 1 };
      });
      if (issue.outside.length || issue.horizontal) layoutIssues.push({ width, slide: i + 1, ...issue });
      if (width === 1440) await page.screenshot({ path: path.join(output, `slide-${String(i + 1).padStart(2, '0')}.png`) });
      if (width === 375 && [0,4,10,13,16].includes(i)) await page.screenshot({ path: path.join(output, `mobile-${i + 1}.png`), fullPage: true });
    }
  }
  console.log('Layout issues:', JSON.stringify(layoutIssues));
  await page.setViewportSize({ width: 1123, height: 794 });
  await page.emulateMedia({ media: 'print' });
  assert.equal(await page.locator('.notes').first().isVisible(), false);
  assert.equal(await page.locator('[data-appendix="true"]').first().isVisible(), false);
  await page.pdf({ path: path.join(output, 'print-check.pdf'), format: 'A4', landscape: true, printBackground: true, preferCSSPageSize: true });
  assert.deepEqual(errors, [], 'No JavaScript errors');
  assert.deepEqual(requests, [], 'Presentation never requests remote resources');
  await context.close();
  await browser.close();
  assert.deepEqual(layoutIssues, [], 'Slides fit both desktop and mobile');
  console.log('PASS: all slides fit, no JavaScript errors or network requests, print hides notes and appendices');
})().catch(error => { console.error(error); process.exitCode = 1; });
