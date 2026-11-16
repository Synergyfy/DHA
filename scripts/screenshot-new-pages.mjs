import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

/** Quick visual check of the new public pages + auth-aware landing header. */
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:5174';
const OUT = process.env.OUT_DIR ?? path.join(process.env.TEMP ?? '.', 'dha-shots-new');

await mkdir(OUT, { recursive: true });
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

const shots = [
  ['guide-detail-mobile', '/oral-health-guides/guide-1', 390, 844],
  ['guide-detail-desktop', '/oral-health-guides/guide-6', 1440, 900],
  ['guide-notfound', '/oral-health-guides/nope', 1440, 900],
  ['dentist-profile-mobile', '/find-care/dentist-profile/nnamdi-obi', 390, 844],
  ['dentist-profile-desktop', '/find-care/dentist-profile/amina-bello', 1440, 900],
  ['clinic-profile-desktop', '/find-care/clinic-profile/lagos-smile-centre', 1440, 900],
  ['profile-notfound', '/find-care/dentist-profile/ghost', 1440, 900],
  // Shared public-site header on every public page.
  ['header-about', '/about', 1440, 900],
  ['header-for-professionals', '/for-professionals', 1440, 900],
  ['header-guides-list', '/oral-health-guides', 1440, 900],
  ['header-portal', '/portal', 1440, 900],
  ['header-find-care', '/portal/find-care', 1440, 900],
  ['header-services-dentists', '/professional/services-dentists', 1440, 900],
  ['header-mobile-menu', '/find-care/dentist-profile/nnamdi-obi', 390, 844],
];

for (const [name, route, width, height] of shots) {
  await page.setViewport({ width, height });
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await Promise.race([page.evaluate(() => document.fonts.ready), new Promise((r) => setTimeout(r, 3000))]);
  await new Promise((r) => setTimeout(r, 500));
  if (name === 'header-mobile-menu') {
    await page.evaluate(() =>
      document.querySelector('header button[aria-label="Toggle navigation menu"]')?.click(),
    );
    await new Promise((r) => setTimeout(r, 350));
  }
  const overflow = await page.evaluate(() =>
    document.documentElement.scrollWidth > document.documentElement.clientWidth + 1
      ? `${document.documentElement.scrollWidth}>${document.documentElement.clientWidth}`
      : '',
  );
  if (overflow) errors.push(`[overflow ${route} @${width}] ${overflow}`);
  await page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });
}

// Landing header, signed in, both variants.
await page.evaluate(() =>
  window.localStorage.setItem(
    'dha-demo-session',
    JSON.stringify({ name: 'Amara Okafor', initials: 'AO', role: 'Patient account' }),
  ),
);
for (const [name, width, height] of [
  ['landing-signedin-mobile', 390, 844],
  ['landing-signedin-desktop', 1440, 900],
]) {
  await page.setViewport({ width, height });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await Promise.race([page.evaluate(() => document.fonts.ready), new Promise((r) => setTimeout(r, 3000))]);
  await new Promise((r) => setTimeout(r, 500));
  await page.evaluate(() => document.querySelector('[data-avatar-toggle]')?.click());
  await new Promise((r) => setTimeout(r, 300));
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
}
await page.evaluate(() => window.localStorage.removeItem('dha-demo-session'));

await browser.close();
console.log(`Screenshots written to ${OUT}`);
if (errors.length) {
  console.log('ISSUES:');
  for (const e of [...new Set(errors)]) console.log(' - ' + e);
  process.exit(1);
}
console.log('No errors or overflow.');
