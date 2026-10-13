/* Optional browser check of the deployed layout, served under a project prefix. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require(process.env.LLM_QA_PLAYWRIGHT || 'playwright');
const site = path.resolve(__dirname, '../_site');
const prefix = '/llms-por-dentro/';

(async () => {
  const server = http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    if (!url.pathname.startsWith(prefix)) { res.writeHead(404).end(); return; }
    const relative = decodeURIComponent(url.pathname.slice(prefix.length)) || 'index.html';
    const file = path.resolve(site, relative);
    if (!file.startsWith(site + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      res.writeHead(404).end(); return;
    }
    res.setHeader('Content-Type', file.endsWith('.css') ? 'text/css' : 'text/html; charset=utf-8');
    res.end(fs.readFileSync(file));
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({
      executablePath: process.env.LLM_QA_BROWSER_EXECUTABLE || undefined,
      args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-gpu'], headless: true
    });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const errors = [], failures = [], external = [];
    context.on('page', p => p.on('pageerror', e => errors.push(e.message)));
    context.on('request', req => { if (!req.url().startsWith(origin) && !req.url().startsWith('about:')) external.push(req.url()); });
    context.on('response', res => { if (res.status() >= 400) failures.push(res.url()); });
    const page = await context.newPage();
    await page.goto(origin + prefix);
    await page.getByRole('link', { name: 'Abrir apresentação' }).click();
    await page.waitForFunction(() => !!window.LLMDeck);
    assert.ok(page.url().startsWith(origin + prefix + 'dist/episodio-01.html'));
    const popupPromise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Apresentadora', exact: true }).click();
    const speaker = await popupPromise;
    await speaker.waitForSelector('#speaker-notes');
    await speaker.waitForFunction(() => [...document.querySelectorAll('iframe')].every(f => !!f.contentWindow.LLMDeck));
    assert.equal(await speaker.locator('iframe').count(), 2);
    await page.evaluate(() => window.LLMDeck.goTo(12));
    await speaker.waitForFunction(() => document.getElementById('speaker-notes').textContent.includes('ficha numérica'));
    await speaker.waitForFunction(() => [...document.querySelectorAll('iframe')].some(f => f.contentWindow.LLMDeck?.state().current === 12));
    assert.equal(await page.locator('.slide.active .notes').isVisible(), false);
    await page.reload();
    await page.waitForFunction(() => window.LLMDeck?.state().current === 12);
    await page.screenshot({ path: path.join(site, '../.qa/pages-http.png') });
    assert.deepEqual(errors, []);
    assert.deepEqual(failures, []);
    assert.deepEqual(external, []);
    console.log('PASS: project path, portal, reload, speaker notes and both HTTP previews; no failed or external requests');
    await context.close();
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
})().catch(error => { console.error(error); process.exitCode = 1; });
