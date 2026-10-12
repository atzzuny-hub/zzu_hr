import puppeteer from 'puppeteer-core';
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [,, html, prefix] = process.argv;
const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--disable-gpu', '--no-first-run', '--hide-scrollbars'] });
const page = await browser.newPage();
for (const [scale, suffix] of [[1, ''], [2, '@2x']]) {
  await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: scale });
  await page.goto('file://' + process.cwd() + '/' + html, { waitUntil: 'load' });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: `${prefix}${suffix}.png`, clip: { x: 0, y: 0, width: 1200, height: 630 } });
  console.log('wrote', `${prefix}${suffix}.png`);
}
await browser.close();
