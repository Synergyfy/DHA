import type { HealthAnswers } from '../../store/registrationDraft';

/** Select options for the general health profile (patient-reported only). */
export const CONDITION_OPTIONS = [
  { value: 'none', label: 'None reported' },
  { value: 'hypertension', label: 'Hypertension' },
  { value: 'diabetes', label: 'Diabetes (Type I/II)' },
  { value: 'asthma', label: 'Asthma' },
  { value: 'sickle-cell', label: 'Sickle cell disease' },
  { value: 'heart', label: 'Heart condition' },
  { value: 'bleeding', label: 'Bleeding disorder' },
  { value: 'other', label: 'Other condition' },
];

export const ALLERGY_OPTIONS = [
  { value: 'none', label: 'None known' },
  { value: 'penicillin', label: 'Penicillin' },
  { value: 'latex', label: 'Latex' },
  { value: 'anesthetics', label: 'Local anesthetics' },
  { value: 'nsaids', label: 'Aspirin / NSAIDs' },
  { value: 'sulfa', label: 'Sulfa drugs' },
  { value: 'other', label: 'Other allergy' },
];

export const MEDICATION_OPTIONS = [
  { value: 'none', label: 'No current regular medications' },
  { value: 'blood-pressure', label: 'Blood pressure / cardiovascular' },
  { value: 'antidiabetic', label: 'Diabetes medication' },
  { value: 'anticoagulants', label: 'Blood thinners / anticoagulants' },
  { value: 'vitamins', label: 'Vitamins / supplements' },
  { value: 'immunosuppressants', label: 'Immunosuppressants or steroids' },
  { value: 'other', label: 'Other regular prescription' },
];

export const BRUSHING_OPTIONS = [
  { value: 'twice', label: 'Twice daily' },
  { value: 'once', label: 'Once daily' },
  { value: 'thrice', label: '3+ times daily' },
  { value: 'irregular', label: 'Irregularly / less than once daily' },
];

export const FLOSSING_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: '2–3 times per week' },
  { value: 'rarely', label: 'Rarely / as needed' },
  { value: 'never', label: 'Never' },
];

export const TOBACCO_OPTIONS = [
  { value: 'never', label: 'No / never' },
  { value: 'former', label: 'Former user' },
  { value: 'occasional', label: 'Occasional (vaping or cigarettes)' },
  { value: 'regular', label: 'Regular / daily' },
];

export const BLOOD_GROUP_OPTIONS = [
  { value: 'O+', label: 'O+ (positive)' },
  { value: 'O-', label: 'O− (negative)' },
  { value: 'A+', label: 'A+ (positive)' },
  { value: 'A-', label: 'A− (negative)' },
  { value: 'B+', label: 'B+ (positive)' },
  { value: 'B-', label: 'B− (negative)' },
  { value: 'AB+', label: 'AB+ (positive)' },
  { value: 'AB-', label: 'AB− (negative)' },
  { value: 'unknown', label: 'Unknown' },
];

export const GENDER_OPTIONS = [
  { value: 'female', label: 'Female' },
  { value: 'male', label: 'Male' },
  { value: 'other', label: 'Other / prefer not to say' },
];

const labelFor = (options: { value: string; label: string }[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? '';

/** Short label for a health answer, or an honest "not answered" fallback. */
export function healthLabel(
  key: keyof HealthAnswers,
  value: string,
): string {
  switch (key) {
    case 'condition':
      return value ? labelFor(CONDITION_OPTIONS, value) : 'Not answered';
    case 'allergy':
      return value ? labelFor(ALLERGY_OPTIONS, value) : 'Not answered';
    case 'medication':
      return value ? labelFor(MEDICATION_OPTIONS, value) : 'Not answered';
    case 'brushing':
      return value ? labelFor(BRUSHING_OPTIONS, value) : 'Not answered';
    case 'flossing':
      return value ? labelFor(FLOSSING_OPTIONS, value) : 'Not answered';
    case 'tobacco':
      return value ? labelFor(TOBACCO_OPTIONS, value) : 'Not answered';
    case 'bloodGroup':
      return value || 'Not answered';
    default:
      return value || 'Not answered';
  }
}

/** How many of the three hygiene questions have been answered. */
export function habitsAnswered(health: HealthAnswers): number {
  return [health.brushing, health.flossing, health.tobacco].filter(Boolean).length;
}

/** Masks a Nigerian number for display: 8012345678 -> +234 801 ••• 5678. */
export function maskPhone(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.length < 7) return phone ? `+234 ${phone}` : 'your mobile number';
  const start = digits.slice(0, 3);
  const end = digits.slice(-4);
  return `+234 ${start} ••• ${end}`;
}

/** Masks an email for display: amara.okafor@example.com -> amara.o***@example.com. */
export function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at < 1) return email || 'your email address';
  const local = email.slice(0, at);
  const domain = email.slice(at);
  const head = local.slice(0, Math.min(6, local.length));
  return `${head}***${domain}`;
}

/** Formats a yyyy-mm-dd date input value as dd Mmm yyyy, or a fallback. */
export function formatDob(iso: string, fallback = 'Not provided'): string {
  if (!iso) return fallback;
  const date = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

/** Whole years since a yyyy-mm-dd date, or null when unknown. */
export function ageFrom(iso: string): number | null {
  if (!iso) return null;
  const birth = new Date(`${iso}T00:00:00`);
  if (Number.isNaN(birth.getTime())) return null;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) age -= 1;
  return age >= 0 ? age : null;
}

/**
 * Deterministic demonstration Lifecode derived from the name + date of birth
 * the patient entered, so each draft shows its own stable code. This is a
 * frontend stand-in only — a real identifier is issued by the DHA service.
 */
export function demoLifecode(seedParts: string[]): string {
  const seed = seedParts.join('|').toLowerCase();
  let hash = 7;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 10000;
  }
  const block = String(hash).padStart(4, '0');
  return `DHA-${block}-ORL`;
}
