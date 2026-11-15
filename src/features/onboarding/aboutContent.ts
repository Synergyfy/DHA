/**
 * Content data for the About DHA screen.
 *
 * Kept out of the component so copy can be reviewed/replaced without
 * touching UI logic. Figures marked `demonstration: true` are illustrative
 * sample values for this frontend-only build — they are rendered with an
 * explicit "demonstration data" label and must not be presented as live
 * platform statistics.
 */

export interface AboutStat {
  value: string;
  label: string;
  tone: 'primary' | 'secondary';
  demonstration: boolean;
}

export interface AboutPillar {
  icon: string;
  iconClass: string;
  title: string;
  description: string;
  badge: string;
  badgeClass: string;
}

export interface AboutStep {
  title: string;
  description: string;
}

export interface AboutFaq {
  question: string;
  answer: string;
}

export const aboutStats: AboutStat[] = [
  { value: '480+', label: 'Accredited Clinics', tone: 'primary', demonstration: true },
  { value: '32,000+', label: 'Screened Youth', tone: 'secondary', demonstration: true },
  { value: '100%', label: 'Data Secured', tone: 'primary', demonstration: false },
];

export const aboutPillars: AboutPillar[] = [
  {
    icon: 'qr_code_2',
    iconClass: 'bg-surface-container-high text-primary',
    title: 'Universal Oral Lifecode',
    description:
      'A permanent digital oral identity. X-rays, diagnostics and restored-tooth history follow you across every registered dental provider — shared only when you authorise it.',
    badge: 'Live',
    badgeClass: 'bg-secondary-container text-on-secondary-container',
  },
  {
    icon: 'sync_alt',
    iconClass: 'bg-surface-container-high text-secondary',
    title: 'Connected Care Ecosystem',
    description:
      'Coordinated records between school dental screening units, specialised paediatric clinics and hospitals — with the source and date of every entry visible.',
    badge: 'Real-Time',
    badgeClass: 'bg-surface-container-high text-on-surface-variant',
  },
  {
    icon: 'diversity_1',
    iconClass: 'bg-surface-container-high text-primary',
    title: 'Family & Child Oversight',
    description:
      'Guardians manage linked child profiles, monitor primary-teeth development and keep every child’s records and activities separate.',
    badge: 'Guardians',
    badgeClass: 'bg-primary-fixed text-on-primary-fixed',
  },
  {
    icon: 'lock',
    iconClass: 'bg-surface-container-high text-secondary',
    title: 'Protected Health Privacy',
    description:
      'Records are append-only: corrections are added with author, reason and date, and nothing is ever silently overwritten. Explicit authorisation is required before any clinic sees your records.',
    badge: 'Compliant',
    badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
  },
];

export const aboutSteps: AboutStep[] = [
  {
    title: 'Link Your Phone or Email',
    description:
      'Create your account and confirm your contact details. If a possible existing record is found, you review it before anything is linked — records are never merged automatically.',
  },
  {
    title: 'Receive Your Lifecode',
    description:
      'Your unique patient ID is issued when your identity is created. It identifies you at a clinic — it is never a password or an access key to your records.',
  },
  {
    title: 'Check In Anywhere',
    description:
      'Show your Lifecode at reception for fast identity confirmation. Opening your records or booking an appointment always requires separate, explicit authorisation.',
  },
];

export const aboutFaqs: AboutFaq[] = [
  {
    question: 'Is DHA free to use?',
    answer:
      'Creating your profile and holding your dental Lifecode is free for patients. This build is a frontend demonstration with sample data — no payments or live services are connected.',
  },
  {
    question: 'Does scanning share my records automatically?',
    answer:
      'No. Your Lifecode identifies you; it is not a password or an access token. Scanning only requests access — nothing is shown to a clinic until you give explicit authorisation, which you can withdraw at any time.',
  },
  {
    question: 'Can dentists edit past clinical diagnoses?',
    answer:
      'No. Clinical records are never silently overwritten. Corrections are appended as separate amendments that keep the original entry, its author, the reason and the date.',
  },
  {
    question: 'Is a screening the same as a diagnosis?',
    answer:
      'No. A quick screening records basic findings for follow-up — it is not a detailed clinical examination or a final diagnosis. Only clinician-approved summaries appear in your patient view.',
  },
];
