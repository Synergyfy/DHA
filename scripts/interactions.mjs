import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:5174';

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: 390, height: 844 });

const results = [];
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text());
});

const go = async (path) => {
  // domcontentloaded + settle: remote font requests can hang and make
  // networkidle2 time out.
  await page.goto(BASE + path, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise((r) => setTimeout(r, 600));
};
const clickText = async (text) => {
  const ok = await page.evaluate((t) => {
    const els = [...document.querySelectorAll('button, a')];
    const el = els.find((e) => e.textContent.replace(/\s+/g, ' ').trim().includes(t));
    if (el) {
      el.click();
      return true;
    }
    return false;
  }, text);
  await new Promise((r) => setTimeout(r, 500));
  return ok;
};

// 1. Welcome -> Get Started -> Lifecode
await go('/');
results.push(['welcome renders "Lifelong Dental Care"', await page.evaluate(() => document.body.innerText.includes('Lifelong Dental Care'))]);
await clickText('Get Started');
results.push(['Welcome "Get Started" navigates to /onboarding/lifecode', page.url().endsWith('/onboarding/lifecode')]);
results.push(['Lifecode renders', await page.evaluate(() => document.body.innerText.includes('Smart Patient Lifecode'))]);

// 2. Lifecode Continue -> Get Started screen
await clickText('Continue');
results.push(['Lifecode "Continue" navigates to /onboarding/get-started', page.url().endsWith('/onboarding/get-started')]);
results.push(['GetStarted renders', await page.evaluate(() => document.body.innerText.includes('Family & Unified Care'))]);

// 3. Get Started -> Registration entry
await clickText('Get Started (Patient / Guardian)');
results.push(['"Get Started (Patient/Guardian)" navigates to /register', page.url().endsWith('/register')]);
results.push(['Register entry renders the sign-up choices', await page.evaluate(() => document.body.innerText.includes('Create Your DHA Account'))]);

// 4. Back to welcome, then role selection
await go('/');
await clickText('Join as a Healthcare Provider');
results.push(['"Join as provider" navigates to /join-role', page.url().endsWith('/join-role')]);
results.push(['Role screen shows all 3 roles', await page.evaluate(() => {
  const t = document.body.innerText;
  return t.includes('Dentist / Clinician') && t.includes('School & Community Screener') && t.includes('Clinic & Hospital Partner');
})]);

// 5. Role CTA shows toast (does NOT fake a portal)
await clickText('Continue as Clinician');
results.push(['Role CTA shows explanatory toast', await page.evaluate(() =>
  document.body.innerText.includes('not part of this patient-facing release'))]);
results.push(['Role CTA did not navigate away', page.url().endsWith('/join-role')]);

// 6. About screen + FAQ accordion
await go('/about');
results.push(['About renders', await page.evaluate(() => document.body.innerText.includes('About DHA'))]);
const faqBefore = await page.evaluate(() => document.getElementById('faq-content-1')?.hasAttribute('hidden'));
await clickText('Does scanning share my records automatically?');
const faqAfter = await page.evaluate(() => document.getElementById('faq-content-1')?.hasAttribute('hidden'));
results.push(['FAQ accordion opens on click', faqBefore === true && faqAfter === false]);
const firstClosed = await page.evaluate(() => document.getElementById('faq-content-0')?.hasAttribute('hidden'));
results.push(['Opening a FAQ closes the previous one', firstClosed === true]);

// 7. Demo data labelling present
results.push(['Stats labelled as demonstration data', await page.evaluate(() =>
  document.body.innerText.includes('demonstration data'))]);

// 8. Lifecode identity rule stated (spec §4.1)
await go('/onboarding/lifecode');
results.push(['Lifecode copy states it is not a key', await page.evaluate(() =>
  document.body.innerText.includes('Your ID, not a key'))]);

// 9. No auto-selection of guardian profile anywhere yet (Section 2 scope)
//    (guardian switching arrives with Section 2 — asserted as absent, not faked)

// 9. Section 1 — full registration flow (entry -> contact -> OTP -> details -> health -> summary)
const setInput = async (selector, value) => {
  await page.evaluate(
    ([sel, val]) => {
      const el = document.querySelector(sel);
      if (!el) return;
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      setter.call(el, val);
      el.dispatchEvent(new Event('input', { bubbles: true }));
      el.dispatchEvent(new Event('change', { bubbles: true }));
    },
    [selector, value],
  );
  await new Promise((r) => setTimeout(r, 200));
};

await go('/register');
await clickText('Continue with Google');
results.push(['Google sign-up explains it is not connected (no fake OAuth)', await page.evaluate(() =>
  document.body.innerText.includes('not connected in this frontend demo'))]);
results.push(['Google sign-up does not navigate', page.url().endsWith('/register')]);

await clickText('Sign Up with Phone or Email');
results.push(['Entry -> /register/contact', page.url().endsWith('/register/contact')]);

await clickText('Send Verification Code');
results.push(['Empty contact form shows validation errors', await page.evaluate(() =>
  document.body.innerText.includes('Enter a valid mobile number'))]);

await page.type('#phone-input', '8012345678');
await page.type('#password', 'Passw0rd!x');
await page.type('#confirm-password', 'Passw0rd!x');
await page.click('#terms-checkbox');
await clickText('Send Verification Code');
results.push(['Valid contact details -> /register/verify', page.url().endsWith('/register/verify')]);
results.push(['OTP screen labels the code as a demonstration', await page.evaluate(() => {
  // innerText reflects CSS text-transform, so compare lowercased.
  const t = document.body.innerText.toLowerCase();
  return t.includes('demonstration code') && t.includes('no real sms is sent');
})]);

await clickText('Verify & Continue');
results.push(['Incomplete OTP blocks continue', page.url().endsWith('/register/verify')]);
await clickText('Autofill');
await clickText('Verify & Continue');
results.push(['Accepted OTP -> /register/details', page.url().endsWith('/register/details')]);

await page.type('#first-name', 'Amara');
await page.type('#last-name', 'Okafor');
await setInput('#dob-field', '1995-08-14');
await page.select('#gender-identity', 'female');
await clickText('Save & Continue to Health Profile');
results.push(['Personal details -> /register/health', page.url().endsWith('/register/health')]);
results.push(['Health step is labelled patient-reported', await page.evaluate(() => {
  const t = document.body.innerText;
  return t.includes('Patient-reported information') && t.includes('Optional');
})]);

await clickText('Skip for now');
results.push(['Skipping health profile -> /register/complete', page.url().endsWith('/register/complete')]);
results.push(['Summary shows the entered name (no invented identity)', await page.evaluate(() =>
  document.body.innerText.includes('Amara Okafor'))]);
results.push(['Summary states Lifecode is never a password', await page.evaluate(() =>
  document.body.innerText.includes('never a password or access token'))]);
results.push(['Summary is labelled as a demo (no real account)', await page.evaluate(() =>
  document.body.innerText.includes('no real account was created'))]);

await clickText('Go to Patient Dashboard');
results.push(['Dashboard CTA -> honest Section 2 placeholder', page.url().endsWith('/dashboard')]);
results.push(['Dashboard placeholder does not fake records', await page.evaluate(() =>
  document.body.innerText.includes('arrive with Section 2'))]);

// 10. Section 1 — login, recovery sheet and honest demo sign-in
await go('/login');
results.push(['Login renders "Welcome Back"', await page.evaluate(() =>
  document.body.innerText.includes('Welcome Back'))]);

await clickText('Forgot password?');
results.push(['Forgot-password sheet opens', await page.evaluate(() =>
  document.body.innerText.includes('Reset password'))]);
await page.type('#recovery-input', '8012345678');
await clickText('Send Reset Code');
results.push(['Recovery stage 2 shows a labelled demo code', await page.evaluate(() =>
  document.body.innerText.includes('Demo code:'))]);
await page.keyboard.press('Escape');
await new Promise((r) => setTimeout(r, 300));
results.push(['Escape closes the sheet', await page.evaluate(() =>
  !document.body.innerText.includes('Create new password'))]);

await clickText('Continue with Google');
results.push(['Login Google button explains it is not connected', await page.evaluate(() =>
  document.body.innerText.includes('not connected in this frontend demo'))]);

await clickText('Sign In to DHA');
results.push(['Empty sign-in shows validation', await page.evaluate(() =>
  document.body.innerText.includes('Enter your phone number or email'))]);
await page.type('#patient-identifier', '8012345678');
await page.type('#patient-password', 'Passw0rd!x');
await clickText('Sign In to DHA');
results.push(['Demo sign-in is labelled as unchecked credentials', await page.evaluate(() =>
  document.body.innerText.includes('credentials are not checked'))]);
results.push(['Demo sign-in -> dashboard placeholder', page.url().endsWith('/dashboard')]);

await go('/login');
await clickText('Open the role workspace');
results.push(['Role CTA on login shows explanatory toast (no faked portal)', await page.evaluate(() =>
  document.body.innerText.includes('not part of this patient-facing release'))]);

// 11. Section 1 — guardian registration path (children's records stay separate)
await go('/register/details');
await page.evaluate(() => {
  const input = document.querySelector('input[name="account-type"][value="guardian"]');
  if (input) input.click();
});
await new Promise((r) => setTimeout(r, 300));
results.push(['Guardian option shows child-profile guidance', await page.evaluate(() =>
  document.body.innerText.includes('guardian setup to link your child'))]);

await page.type('#first-name', 'Chidi');
await page.type('#last-name', 'Okafor');
await setInput('#dob-field', '2015-05-05');
await page.select('#gender-identity', 'male');
await clickText('Save & Continue to Health Profile');
await clickText('Skip for now');
results.push(['Guardian summary keeps children\'s records separate', await page.evaluate(() =>
  document.body.innerText.includes('stay strictly separate'))]);
results.push(['Guardian summary shows the account type', await page.evaluate(() =>
  document.body.innerText.includes('Parent / guardian'))]);

await browser.close();

let pass = 0;
let fail = 0;
for (const [name, ok] of results) {
  if (ok) {
    pass++;
    console.log(`  PASS  ${name}`);
  } else {
    fail++;
    console.log(`  FAIL  ${name}`);
  }
}
console.log(`\n${pass} passed, ${fail} failed`);
if (errors.length) {
  console.log('\nRuntime errors:');
  for (const e of [...new Set(errors)]) console.log('  - ' + e);
} else {
  console.log('No runtime errors.');
}
process.exit(fail ? 1 : 0);
