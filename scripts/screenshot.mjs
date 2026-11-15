import puppeteer from 'puppeteer-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:5174';
const OUT = process.env.OUT_DIR ?? path.join(process.env.TEMP ?? '.', 'dha-shots');

const routes = [
  ['welcome', '/'],
  ['lifecode', '/onboarding/lifecode'],
  ['getstarted', '/onboarding/get-started'],
  ['role', '/join-role'],
  ['about', '/about'],
  ['register', '/register'],
  ['register-contact', '/register/contact'],
  ['register-verify', '/register/verify'],
  ['register-details', '/register/details'],
  ['register-health', '/register/health'],
  ['register-complete', '/register/complete'],
  ['login', '/login'],
  ['dashboard', '/dashboard'],
];

// Mobile-first sweep: small phone -> standard -> large -> tablet P/L -> laptop -> desktop -> large desktop
const viewports = [
  [320, 780],
  [360, 800],
  [375, 812],
  [390, 844],
  [430, 932],
  [768, 1024],
  [820, 1180],
  [1024, 768],
  [1280, 800],
  [1440, 900],
  [1920, 1080],
];

const full = process.argv.includes('--full');

await mkdir(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--font-render-hinting=none'],
});

const errors = [];
const page = await browser.newPage();
page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`[console] ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`[pageerror] ${err.message}`));

for (const [name, route] of routes) {
  for (const [width, height] of viewports) {
    await page.setViewport({ width, height, deviceScaleFactor: 1 });
    // domcontentloaded + a bounded font wait: remote font requests can hang,
    // which makes networkidle2 time out on the first navigation.
    await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });

    // Guard: never screenshot a page that is not the DHA app (stray Chrome
    // instances and restored tabs otherwise yield New Tab captures).
    const title = await page.title();
    if (!title.includes('DHA')) {
      errors.push(`[nav ${width}px ${route}] unexpected title: "${title}"`);
      await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await new Promise((r) => setTimeout(r, 800));
      const retry = await page.title();
      if (!retry.includes('DHA')) {
        errors.push(`[nav ${width}px ${route}] retry still failed: "${retry}"`);
        continue;
      }
    }

    // Allow fonts + remote imagery to settle (bounded — remote requests may hang)
    await Promise.race([
      page.evaluate(() => document.fonts.ready),
      new Promise((r) => setTimeout(r, 3000)),
    ]);
    await new Promise((r) => setTimeout(r, 600));

    // Horizontal overflow check (a hard requirement of the brief)
    const overflow = await page.evaluate(() => {
      const doc = document.documentElement;
      const offenders = [];
      if (doc.scrollWidth > doc.clientWidth + 1) {
        for (const el of document.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          if (r.right > doc.clientWidth + 1 || r.left < -1) {
            offenders.push(
              `${el.tagName.toLowerCase()}.${(el.className || '').toString().slice(0, 60)}`,
            );
          }
        }
      }
      return {
        scrollWidth: doc.scrollWidth,
        clientWidth: doc.clientWidth,
        offenders: offenders.slice(0, 5),
      };
    });
    if (overflow.offenders.length) {
      errors.push(
        `[overflow ${width}px ${route}] ${overflow.scrollWidth}>${overflow.clientWidth} :: ${overflow.offenders.join(' | ')}`,
      );
    }

    const file = path.join(OUT, `${name}-${width}.png`);
    await page.screenshot({ path: file, fullPage: full });
  }
}

await browser.close();

console.log(`Screenshots written to ${OUT}`);
if (errors.length) {
  console.log('\nISSUES:');
  for (const e of [...new Set(errors)]) console.log(' - ' + e);
} else {
  console.log('\nNo console errors or horizontal overflow detected.');
}
