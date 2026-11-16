import puppeteer from 'puppeteer-core';

/**
 * Landing page link audit (Route `/`).
 *
 * Verifies that every clickable control on the landing page — header nav,
 * hamburger menu (phone + desktop-below-`xl`), section CTAs, provider cards,
 * filter chips and footer links — navigates to a real route (or scrolls to a
 * real in-page anchor), on both the mobile and desktop variants.
 *
 *   node scripts/landing-links.mjs            (expects `vite --port 5174`)
 *   BASE_URL=http://localhost:5173 node scripts/landing-links.mjs
 */
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:5174';

const results = [];
const check = (name, cond, extra = '') =>
  results.push([cond ? 'PASS' : 'FAIL', name, extra]);

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

const settle = (ms = 550) => new Promise((r) => setTimeout(r, ms));

async function openLanding(width, height) {
  await page.setViewport({ width, height });
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded', timeout: 30000 });
  // Material Symbols glyphs must be loaded before measuring layout, otherwise
  // ligature text renders literally and reports a false horizontal overflow.
  await Promise.race([
    page.evaluate(() => document.fonts.ready),
    new Promise((r) => setTimeout(r, 4000)),
  ]);
  await settle(500);
}

function currentPath() {
  const url = new URL(page.url());
  return url.pathname + url.search;
}

/** Clicks the first *visible* element whose text contains `text`. */
async function clickVisible(text) {
  const found = await page.evaluate((t) => {
    const els = [...document.querySelectorAll('a, button')];
    const el = els.find(
      (e) =>
        e.getClientRects().length > 0 &&
        e.textContent.replace(/\s+/g, ' ').trim().includes(t),
    );
    if (!el) return false;
    el.click();
    return true;
  }, text);
  await settle(650);
  return found;
}

const menuOpen = () =>
  page.evaluate(() => {
    const menu = document.querySelector('[data-landing-menu]');
    const toggle = document.querySelector('[data-menu-toggle]');
    return {
      display: menu ? menu.style.display : null,
      expanded: toggle ? toggle.getAttribute('aria-expanded') : null,
      toggleVisible: toggle ? toggle.getClientRects().length > 0 : false,
    };
  });

async function openMenu() {
  const before = await menuOpen();
  if (before.display === 'flex') return true;
  const clicked = await page.evaluate(() => {
    const toggle = document.querySelector('[data-menu-toggle]');
    if (!toggle) return false;
    toggle.click();
    return true;
  });
  await settle(350);
  return clicked;
}

/* ── Structural audit: nothing may be left pointing at a bare `#` ── */
for (const [variant, width, height] of [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
]) {
  await openLanding(width, height);
  const bare = await page.evaluate(() =>
    [...document.querySelectorAll('a')]
      .filter((a) => {
        const href = a.getAttribute('href') ?? '';
        const hasPath = a.hasAttribute('data-path');
        const inPage = href.startsWith('#') && href.length > 1;
        return !hasPath && !inPage;
      })
      .map((a) => a.textContent.replace(/\s+/g, ' ').trim().slice(0, 40)),
  );
  check(`${variant}: every anchor has a route or in-page target`, bare.length === 0, bare.join(' | '));

  const deadButtons = await page.evaluate(() =>
    [...document.querySelectorAll('button')]
      .filter(
        (b) =>
          !b.hasAttribute('data-path') &&
          !b.hasAttribute('data-menu-toggle') &&
          !b.hasAttribute('data-avatar-toggle') &&
          !b.hasAttribute('data-sign-out'),
      )
      .map((b) => b.textContent.replace(/\s+/g, ' ').trim().slice(0, 40)),
  );
  check(`${variant}: every button is wired`, deadButtons.length === 0, deadButtons.join(' | '));

  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return doc.scrollWidth > doc.clientWidth + 1
      ? `${doc.scrollWidth}>${doc.clientWidth}`
      : '';
  });
  check(`${variant}: no horizontal overflow`, overflow === '', overflow);
}

/* ── Mobile (phone layout): hamburger + links ── */
await openLanding(390, 844);

let state = await menuOpen();
check('mobile: hamburger is visible', state.toggleVisible);
check('mobile: menu starts closed', state.display === 'none' && state.expanded === 'false');

await openMenu();
state = await menuOpen();
check('mobile: hamburger opens the menu', state.display === 'flex' && state.expanded === 'true');

check(
  'mobile: menu "About DHA" -> /about',
  (await clickVisible('About DHA')) && currentPath() === '/about',
  currentPath(),
);

await openLanding(390, 844);
await openMenu();
await clickVisible('Log In');
check('mobile: menu "Log In" -> /login', currentPath() === '/login', currentPath());

await openLanding(390, 844);
check(
  'mobile: hero "Get Started" -> /onboarding/get-started',
  (await clickVisible('Get Started')) && currentPath() === '/onboarding/get-started',
  currentPath(),
);

await openLanding(390, 844);
await clickVisible('Explore DHA');
const scrolled = await page.evaluate(() => window.scrollY > 120);
check('mobile: "Explore DHA" scrolls to the in-page section', scrolled && currentPath() === '/', currentPath());

await openLanding(390, 844);
await clickVisible('All Services');
check('mobile: filter chip "All Services" -> public directory', currentPath() === '/portal/find-care', currentPath());

await openLanding(390, 844);
await clickVisible('Create Your Patient Account');
check('mobile: "Create Your Patient Account" -> /register', currentPath() === '/register', currentPath());

await openLanding(390, 844);
await clickVisible('View Centre');
check(
  'mobile: "View Centre" -> public clinic profile',
  currentPath() === '/find-care/clinic-profile/lagos-smile-centre',
  currentPath(),
);

await openLanding(390, 844);
await clickVisible('Read Guide');
check(
  'mobile: first "Read Guide" -> full guide page',
  currentPath() === '/oral-health-guides/guide-1',
  currentPath(),
);

await openLanding(390, 844);
await openMenu();
await clickVisible('Professional Access');
check(
  'mobile: community "Professional Access" -> services for dentists',
  currentPath() === '/professional/services-dentists',
  currentPath(),
);

await openLanding(390, 844);
await openMenu();
await clickVisible('Clinic Access');
check(
  'mobile: community "Clinic Access" -> services for clinics',
  currentPath() === '/professional/services-clinics',
  currentPath(),
);

await openLanding(390, 844);
await clickVisible('Find a Dentist');
check('mobile: footer "Find a Dentist" -> public directory', currentPath() === '/portal/find-care', currentPath());

await openLanding(390, 844);
await clickVisible('Clinic Registration');
check('mobile: footer "Clinic Registration" -> clinic onboarding', currentPath() === '/clinic-onboarding/entry', currentPath());

/* ── Desktop (>= 1280px): inline nav ── */
await openLanding(1440, 900);
state = await menuOpen();
check('desktop: inline nav is used (hamburger hidden)', !state.toggleVisible);

await openLanding(1440, 900);
check(
  'desktop: nav "About DHA" -> /about',
  (await clickVisible('About DHA')) && currentPath() === '/about',
  currentPath(),
);

await openLanding(1440, 900);
await clickVisible('Log In');
check('desktop: header "Log In" -> /login', currentPath() === '/login', currentPath());

await openLanding(1440, 900);
await clickVisible('Get Started');
check('desktop: hero "Get Started" -> /onboarding/get-started', currentPath() === '/onboarding/get-started', currentPath());

await openLanding(1440, 900);
await clickVisible('Explore DHA');
const desktopScrolled = await page.evaluate(() => window.scrollY > 120);
check('desktop: "Explore DHA" scrolls to #how-it-works', desktopScrolled && currentPath() === '/', currentPath());

await openLanding(1440, 900);
await clickVisible('Browse Clinics');
check('desktop: "Browse Clinics" -> public directory', currentPath() === '/portal/find-care', currentPath());

await openLanding(1440, 900);
await clickVisible('Patient Portal');
check('desktop: footer "Patient Portal" -> public portal', currentPath() === '/portal', currentPath());

await openLanding(1440, 900);
await clickVisible('Data Governance');
check('desktop: footer privacy link -> /portal/privacy', currentPath() === '/portal/privacy', currentPath());

/* ── Tablet (desktop layout, below `xl`): hamburger supplies the nav ── */
await openLanding(1024, 768);
state = await menuOpen();
check('tablet: hamburger replaces the inline nav', state.toggleVisible);
await openMenu();
check('tablet: hamburger opens the menu', (await menuOpen()).display === 'flex');
await clickVisible('Oral Health Guides');
check('tablet: menu "Oral Health Guides" -> /oral-health-guides', currentPath() === '/oral-health-guides', currentPath());

/* ── Full sweep: every anchor on both variants must land on a real page ── */
for (const [variant, width, height] of [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
]) {
  await openLanding(width, height);
  const anchors = await page.evaluate(() =>
    [...document.querySelectorAll('.landing-page a')].map((a, i) => {
      const href = a.getAttribute('href') ?? '';
      return {
        i,
        text: a.textContent.replace(/\s+/g, ' ').trim().slice(0, 42),
        route: a.getAttribute('data-path') ?? '',
        inPage: href.startsWith('#') && href.length > 1,
      };
    }),
  );

  const failures = [];
  for (const a of anchors) {
    await openLanding(width, height);
    await page.evaluate((i) => {
      document.querySelectorAll('.landing-page a')[i]?.click();
    }, a.i);
    await settle(450);

    const url = new URL(page.url());
    const notFound = await page.evaluate(() =>
      document.body.innerText.includes('Page not found'),
    );

    if (a.inPage) {
      const scrolled = await page.evaluate(() => window.scrollY > 120);
      if (!scrolled || url.pathname !== '/' || url.hash !== '') {
        failures.push(`"${a.text}" did not scroll to ${a.route}`);
      }
      continue;
    }

    const landedHome = url.pathname === '/' && a.route === 'home';
    if (url.hash || notFound || (url.pathname === '/' && !landedHome)) {
      failures.push(`"${a.text}" [${a.route}] -> ${url.pathname}${url.hash}${notFound ? ' (404)' : ''}`);
    }
  }
  check(
    `${variant}: all ${anchors.length} links reach a real route (no bare # / no 404)`,
    failures.length === 0,
    failures.join(' | '),
  );
}

/* ── Auth-aware header: avatar only when signed in ── */
async function headerAuthState() {
  return page.evaluate(() => {
    const signedOut = document.querySelector('[data-auth-signed-out]');
    const signedIn = document.querySelector('[data-auth-signed-in]');
    const avatarToggle = document.querySelector('[data-avatar-toggle]');
    const menu = document.querySelector('[data-avatar-menu]');
    const visible = (el) => !!el && el.getClientRects().length > 0 && getComputedStyle(el).display !== 'none';
    return {
      signedOutVisible: visible(signedOut),
      avatarVisible: visible(signedIn),
      avatarToggleVisible: visible(avatarToggle),
      avatarMenuDisplay: menu ? menu.style.display : null,
      // The static avatar must not sit beside Get Started while signed out.
      avatarBesideGetStarted:
        !!document.querySelector('[data-auth-signed-in]') &&
        visible(document.querySelector('[data-auth-signed-out]')) &&
        visible(document.querySelector('[data-auth-signed-in]')),
    };
  });
}

async function clearSession() {
  await page.evaluate(() => window.localStorage.removeItem('dha-demo-session'));
}

async function seedSession() {
  await page.evaluate(() =>
    window.localStorage.setItem(
      'dha-demo-session',
      JSON.stringify({ name: 'Amara Okafor', initials: 'AO', role: 'Patient account' }),
    ),
  );
}

for (const [variant, width, height] of [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
]) {
  await clearSession();
  await openLanding(width, height);
  let auth = await headerAuthState();
  check(`${variant}: signed out shows Get Started + Log In (no avatar)`, auth.signedOutVisible && !auth.avatarVisible);
  check(`${variant}: avatar never sits beside Get Started`, !auth.avatarBesideGetStarted);

  await seedSession();
  await openLanding(width, height);
  auth = await headerAuthState();
  check(`${variant}: signed in swaps to the avatar`, auth.avatarVisible && !auth.signedOutVisible);

  await page.evaluate(() => document.querySelector('[data-avatar-toggle]')?.click());
  await settle(300);
  auth = await headerAuthState();
  check(`${variant}: avatar opens its account menu`, auth.avatarMenuDisplay === 'flex', String(auth.avatarMenuDisplay));

  await page.evaluate(() => document.querySelector('[data-sign-out]')?.click());
  await settle(400);
  auth = await headerAuthState();
  check(
    `${variant}: sign out restores Get Started + Log In`,
    auth.signedOutVisible && !auth.avatarVisible,
  );
}

/* ── Landing destination fixes (public profiles, guides, community, CTA) ── */
await clearSession();
await openLanding(1440, 900);
await clickVisible('View Profile');
check(
  'desktop: "View Profile" -> public dentist profile',
  currentPath() === '/find-care/dentist-profile/nnamdi-obi',
  currentPath(),
);

await openLanding(1440, 900);
await clickVisible('Read Guide');
check(
  'desktop: first "Read Guide" -> full guide page',
  currentPath() === '/oral-health-guides/guide-1',
  currentPath(),
);

await openLanding(1440, 900);
await clickVisible('Professional Access');
check(
  'desktop: community "Professional Access" -> services for dentists',
  currentPath() === '/professional/services-dentists',
  currentPath(),
);

await openLanding(1440, 900);
await clickVisible('Clinic Access');
check(
  'desktop: community "Clinic Access" -> services for clinics',
  currentPath() === '/professional/services-clinics',
  currentPath(),
);

await openLanding(1440, 900);
await clickVisible('Organisation Access');
check(
  'desktop: community "Organisation Access" -> services for schools',
  currentPath() === '/professional/services-schools',
  currentPath(),
);

await openLanding(1440, 900);
await page.evaluate(() => document.querySelector('[data-path="explore-portal"]')?.click());
await settle(500);
check('desktop: final "Explore DHA" -> /portal', currentPath() === '/portal', currentPath());

await openLanding(1440, 900);
await page.evaluate(() => {
  const links = [...document.querySelectorAll('[data-path="get-started"]')];
  links[links.length - 1]?.click();
});
await settle(500);
check(
  'desktop: final "Get Started" -> /onboarding/get-started',
  currentPath() === '/onboarding/get-started',
  currentPath(),
);

/* ── End-to-end: a real sign-in flips the landing header to the avatar ── */
await clearSession();
await page.goto(BASE + '/login', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(800);
const clickedDemo = await page.evaluate(() => {
  const btn = [...document.querySelectorAll('button')].find((b) => b.textContent.includes('Patient Portal'));
  if (!btn) return false;
  btn.click();
  return true;
});
await settle(700);
const afterLogin = new URL(page.url()).pathname;
check(
  'login: demo patient sign-in -> /patient-dashboard',
  clickedDemo && afterLogin === '/patient-dashboard',
  afterLogin,
);

await openLanding(1440, 900);
const postLoginAuth = await headerAuthState();
check(
  'desktop: after a real login the landing shows the avatar (no Get Started / Log In)',
  postLoginAuth.avatarVisible && !postLoginAuth.signedOutVisible,
);

await page.evaluate(() => document.querySelector('[data-sign-out]')?.click());
await settle(400);
const afterSignOut = await headerAuthState();
check(
  'desktop: signing out from the avatar restores Get Started + Log In',
  afterSignOut.signedOutVisible && !afterSignOut.avatarVisible,
);

/* ── "Find Dental Care Near You" opens the public directory, never the dashboard ── */
for (const [variant, width, height] of [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
]) {
  await clearSession();
  await openLanding(width, height);
  const clicked = await clickVisible('Find Dental Care Near You');
  check(
    `${variant}: "Find Dental Care Near You" -> public directory (not the dashboard)`,
    clicked && currentPath() === '/portal/find-care',
    currentPath(),
  );
}

/* ── Header consistency: the four public tabs never change ── */
const PUBLIC_TABS = ['Home', 'About DHA', 'For Professionals', 'Oral Health Guides'];

/** Returns the tab labels found in the page's primary (first) header. */
async function primaryHeaderTabs() {
  return page.evaluate((labels) => {
    const header = document.querySelector('header');
    if (!header) return [];
    const texts = [...header.querySelectorAll('button, a')].map((el) =>
      el.textContent.replace(/\s+/g, ' ').trim(),
    );
    return labels.filter((label) => texts.includes(label));
  }, PUBLIC_TABS);
}

for (const route of [
  '/find-care/dentist-profile/nnamdi-obi',
  '/find-care/clinic-profile/lagos-smile-centre',
  '/professional/services-dentists',
  '/portal',
  '/portal/find-care',
  '/oral-health-guides/guide-1',
  '/about',
  '/for-professionals',
]) {
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await settle(700);
  const tabs = await primaryHeaderTabs();
  check(
    `header: ${route} keeps the four public tabs`,
    tabs.length === PUBLIC_TABS.length,
    tabs.join(' | '),
  );
}

// The tabs are real navigation, not decoration: from a suite page a tab
// must move to the matching public page.
await page.setViewport({ width: 1440, height: 900 });
await page.goto(BASE + '/portal', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(700);
check(
  'header: tab "About DHA" on /portal -> /about',
  (await clickVisible('About DHA')) && currentPath() === '/about',
  currentPath(),
);

await page.goto(BASE + '/professional/services-dentists', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(700);
check(
  'header: tab "Oral Health Guides" on /professional/services-dentists -> /oral-health-guides',
  (await clickVisible('Oral Health Guides')) && currentPath() === '/oral-health-guides',
  currentPath(),
);

// Mobile: the same four tabs are reachable through the header's own menu.
await page.setViewport({ width: 390, height: 844 });
await page.goto(BASE + '/find-care/dentist-profile/nnamdi-obi', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(700);
const mobileHeader = await page.evaluate(() => {
  const toggle = document.querySelector('header button[aria-label="Toggle navigation menu"]');
  if (!toggle) return { found: false, tabs: [] };
  toggle.click();
  return { found: true, tabs: [] };
});
await settle(400);
const mobileTabs = await page.evaluate((labels) => {
  const header = document.querySelector('header');
  if (!header) return [];
  const texts = [...header.querySelectorAll('button, a')].map((el) =>
    el.textContent.replace(/\s+/g, ' ').trim(),
  );
  return labels.filter((label) => texts.includes(label));
}, PUBLIC_TABS);
check(
  'mobile header: hamburger menu carries the four public tabs',
  mobileHeader.found && mobileTabs.length === PUBLIC_TABS.length,
  mobileTabs.join(' | '),
);

/* ── Public feature links and oral-health guide detail pages ── */
await openLanding(1440, 900);
await clickVisible('Explore Odontogram');
check(
  'landing: "Explore Odontogram" opens public feature information',
  currentPath() === '/portal/better-way',
  currentPath(),
);

await openLanding(390, 844);
await clickVisible('Care Timelines');
check(
  'landing: "Care Timelines" opens public journey information',
  currentPath() === '/portal/journey',
  currentPath(),
);

for (const guideId of ['guide-1', 'guide-2', 'guide-3', 'guide-4', 'guide-5', 'guide-6']) {
  await page.goto(BASE + '/oral-health-guides', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await settle(500);
  const clicked = await page.evaluate((id) => {
    const link = document.querySelector(`a[href="/oral-health-guides/${id}"]`);
    if (!link) return false;
    link.click();
    return true;
  }, guideId);
  await settle(600);
  const detail = await page.evaluate(() => ({
    path: window.location.pathname,
    title: document.querySelector('main h1')?.textContent?.trim() ?? '',
  }));
  check(
    `guides: "${guideId}" opens its public article`,
    clicked && detail.path === `/oral-health-guides/${guideId}` && !!detail.title && !detail.title.includes('not found'),
    `${detail.path} — ${detail.title}`,
  );
}

await page.goto(BASE + '/for-professionals', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(500);
const professionalTabs = await page.evaluate(() => {
  const tabs = [...document.querySelectorAll('section.sticky button')].map((button) =>
    button.textContent.replace(/\s+/g, ' ').trim(),
  );
  return {
    tabs,
    hasTrustInfo: document.body.innerText.includes('MDCN Verification & Trust'),
  };
});
check(
  'professionals: MDCN trust details are information below the three main tabs',
  professionalTabs.tabs.length === 3 && !professionalTabs.tabs.some((tab) => tab.includes('MDCN')) && professionalTabs.hasTrustInfo,
  professionalTabs.tabs.join(' | '),
);
await clickVisible('Join Clinician Workspace');
check(
  'professionals: clinician workspace CTA opens clinician onboarding',
  currentPath() === '/onboarding/clinician',
  currentPath(),
);

await page.goto(BASE + '/for-professionals', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(500);
await clickVisible('Clinic & Hospital Operations');
await clickVisible('Start Clinic Onboarding');
check(
  'professionals: clinic onboarding CTA opens the clinic onboarding process',
  currentPath() === '/clinic-onboarding/entry',
  currentPath(),
);

await page.goto(BASE + '/for-professionals', { waitUntil: 'domcontentloaded', timeout: 30000 });
await settle(500);
await clickVisible('School & Outreach Screening');
await clickVisible('Join Screener Portal');
check(
  'professionals: screener CTA opens clinician onboarding',
  currentPath() === '/onboarding/clinician',
  currentPath(),
);

await browser.close();

let failed = 0;
for (const [status, name, extra] of results) {
  if (status === 'FAIL') failed += 1;
  console.log(`${status}  ${name}${extra ? `  (${extra})` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed`);
if (errors.length) {
  console.log('\nRuntime errors:');
  for (const e of [...new Set(errors)]) console.log('  - ' + e);
  failed += 1;
} else {
  console.log('No runtime errors.');
}
process.exit(failed === 0 ? 0 : 1);
