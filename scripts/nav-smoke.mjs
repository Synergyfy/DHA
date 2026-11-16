import puppeteer from 'puppeteer-core';

const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const BASE = process.env.BASE_URL ?? 'http://localhost:5174';

const results = [];
const check = (name, cond, extra = '') =>
  results.push([cond ? 'PASS' : 'FAIL', name, extra]);

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });

const settle = (ms = 500) => new Promise((r) => setTimeout(r, ms));

async function go(route) {
  await page.goto(BASE + route, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await settle(700);
}

async function sidebarText() {
  return page.evaluate(() => {
    const aside = document.querySelector('aside');
    return aside ? aside.innerText : '';
  });
}

async function bodyText() {
  return page.evaluate(() => document.body.innerText);
}

/* ── 1. Professional workspace sidebar (§3.1) ── */
await go('/dentist/dashboard');
let t = await sidebarText();
check('pro: sidebar has My Appointments', t.includes('My Appointments'));
check('pro: sidebar has My Patients', t.includes('My Patients'));
check('pro: sidebar has My Tasks', t.includes('My Tasks'));
check('pro: sidebar has Clinical Workspace', t.includes('Clinical Workspace'));
check('pro: sidebar has Reports', /\bReports\b/.test(t));
check('pro: sidebar has Notifications', t.includes('Notifications'));
check('pro: sidebar has My Profile', t.includes('My Profile'));
check('pro: sidebar has Settings', t.includes('Settings'));
check('pro: NO "Appointments Calendar" item', !t.includes('Appointments Calendar'));
check('pro: NO "Working Schedule" item', !t.includes('Working Schedule'));
check('pro: NO "Leave & Unavailability" item', !t.includes('Leave & Unavailability'));
check('pro: NO "Patient Messages" item', !t.includes('Patient Messages'));
check('pro: NO "Customise Dashboard" item', !t.includes('Customise Dashboard'));
check('pro: NO "Help & Support" item', !t.includes('Help & Support'));

await page.click('aside a[href$="/dentist/calendar"]');
await settle(600);
check('pro: My Appointments opens the calendar view', page.url().endsWith('/dentist/calendar'), page.url());

const hasListToggle = await page.evaluate(() =>
  [...document.querySelectorAll('a,button')].some((el) =>
    (el.innerText || '').toLowerCase().includes('list')
  )
);
check('pro: calendar has a List view switch', hasListToggle);

await go('/dentist/clinical-workspace');
t = await bodyText();
check('launcher: Quick Screening card', t.includes('Quick Screening'));
check('launcher: Detailed Clinical Examination card', t.includes('Detailed Clinical Examination'));
check('launcher: Treatment Planning card', t.includes('Treatment Planning'));

await go('/dentist/settings');
t = await bodyText();
check('settings: Dashboard Customisation link', t.includes('Dashboard Customisation'));
check('settings: Working Schedule link', t.includes('Working Schedule'));
check('settings: Leave & Unavailability link', t.includes('Leave & Unavailability'));

await go('/dentist/patients');
t = await bodyText();
check('pro: My Patients nests patient search', t.includes('Search & Select Patient'));

/* ── 2. Clinic operations sidebar (§10.4) ── */
await go('/clinic-operations/dashboard');
t = await sidebarText();
for (const label of [
  'Overview',
  'Appointments',
  'Patients',
  'Clinical Operations',
  'Staff & Teams',
  'Clinics & Branches',
  'Facilities',
  'Finance',
  'Reports & Analytics',
  'Communication',
  'Settings',
]) {
  check(`ops: sidebar has ${label}`, t.includes(label));
}
check('ops: NO "Appointment Calendar" item', !t.includes('Appointment Calendar'));
check('ops: NO "Reception Check-In" item', !t.includes('Reception Check-In'));
check('ops: NO "Internal Announcements" item', !t.includes('Internal Announcements'));
check('ops: NO "Dashboard Customise" item', !t.includes('Dashboard Customise'));
check('ops: NO "Operational Reports" item', !t.includes('Operational Reports'));

await page.click('aside a[href$="/clinic-operations/calendar"]');
await settle(600);
check('ops: Appointments opens calendar', page.url().endsWith('/clinic-operations/calendar'));

await go('/clinic-operations/operational-reports');
t = await bodyText();
check('ops: reports dashboard nests attendance reports', t.includes('Attendance Reports'));
check('ops: reports dashboard nests financial reports', t.includes('Financial Reports'));

await go('/clinic-operations/financial-dashboard');
t = await bodyText();
check('ops: finance nests billing & invoices', t.includes('Billing & Invoices'));
check('ops: finance nests refunds', t.includes('Refunds & Adjustments'));

await go('/clinic-operations/staff-roster');
t = await bodyText();
check('ops: staff landing nests shift timetable', t.includes('Shift Timetable'));
check('ops: staff landing nests clinic tasks', t.includes('Clinic Tasks'));

/* ── 3. Clinical module sidebars (full cleanup) ── */
await go('/examination/workspace');
t = await sidebarText();
check('exam: sidebar keeps Exam Workspace', t.includes('Exam Workspace'));
check('exam: sidebar keeps Exam History', t.includes('Exam History'));
check('exam: sidebar keeps Templates', t.includes('Templates'));
check('exam: NO Soft Tissue stage', !t.includes('Soft Tissue Exam'));
check('exam: NO Template Library sub-item', !t.includes('Template Library'));

await go('/investigations/dashboard');
t = await sidebarText();
check('inv: sidebar keeps Requests Worklist', t.includes('Requests Worklist'));
check('inv: NO Request Details item', !t.includes('Request Details'));
check('inv: NO X-Ray Viewer item', !t.includes('X-Ray Viewer'));
check('inv: NO Modality Details item', !t.includes('Modality Details'));

await go('/screening/dashboard');
t = await sidebarText();
check('scr: sidebar keeps Screening Desk', t.includes('Screening Desk'));
check('scr: sidebar keeps Patient Intake', t.includes('Patient Intake'));
check('scr: NO Consent stage item', !t.includes('Consent & Verification'));
check('scr: NO Review & Submit item', !t.includes('Review & Submit'));

await go('/treatment-plans/dashboard');
t = await sidebarText();
check('tp: sidebar keeps Treatment Hub', t.includes('Treatment Hub'));
check('tp: NO Appt Details item', !t.includes('Appt Details'));
check('tp: NO New Plan Wizard item', !t.includes('New Plan Wizard'));
check('tp: NO Payment Milestones item', !t.includes('Payment Milestones'));

await go('/summaries/dashboard');
t = await sidebarText();
check('sum: sidebar keeps AI Dashboard', t.includes('AI Dashboard'));
check('sum: NO Template Builder item', !t.includes('Template Builder'));
check('sum: NO Confirmation Pass item', !t.includes('Confirmation Pass'));

await go('/odontogram/overview');
t = await sidebarText();
check('odo: sidebar keeps Odontogram Overview', t.includes('Odontogram Overview'));
check('odo: NO Verification Pass item', !t.includes('Verification Pass'));

await go('/staff-management/dashboard');
t = await sidebarText();
check('staff: sidebar keeps Staff Directory', t.includes('Staff Directory'));
check('staff: NO Invite Staff Member item', !t.includes('Invite Staff Member'));

/* ── 4. Patient sub-navs ── */
await go('/patient-dashboard/reminders');
t = await bodyText();
check('patient: reminders sub-nav has no Reminder Details', !t.includes('Reminder Details'));

await go('/patient-dashboard/sharing/overview');
t = await bodyText();
check('patient: sharing sub-nav has no Referral Details', !t.includes('Referral Details'));

await go('/patient-dashboard/discovery');
t = await bodyText();
check('patient: discovery sub-nav has no Dentist Profile tab', !t.includes('Dentist Profile'));

await browser.close();

let failed = 0;
for (const [status, name, extra] of results) {
  if (status === 'FAIL') failed += 1;
  console.log(`${status}  ${name}${extra ? `  (${extra})` : ''}`);
}
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed === 0 ? 0 : 1);
