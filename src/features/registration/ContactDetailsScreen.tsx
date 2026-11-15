import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { PasswordField, SegmentedControl, TextField } from '../../design/Form';
import { Icon } from '../../design/Primitives';
import { useRegistrationDraft, type ContactMethod } from '../../store/registrationDraft';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9]{7,11}$/;

interface Errors {
  phone?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms?: string;
}

/** 0–4 password score used by the strength gauge (Stitch behaviour). */
function passwordScore(value: string): number {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

function StrengthGauge({ value }: { value: string }) {
  const score = value.length === 0 ? 0 : Math.max(passwordScore(value), value.length >= 8 ? 2 : 1);

  const states = [
    { label: 'Enter a password', text: 'Use a mix of letters, numbers and symbols', tone: 'text-outline', bar: 'bg-surface-container-high' },
    { label: 'Weak', text: 'Add digits, capitals or symbols', tone: 'text-error', bar: 'bg-error' },
    { label: 'Fair', text: 'Add a symbol to make it stronger', tone: 'text-tertiary', bar: 'bg-tertiary' },
    { label: 'Good', text: 'Suitable for this demo account', tone: 'text-primary', bar: 'bg-primary' },
    { label: 'Strong', text: 'Good passphrase strength', tone: 'text-secondary', bar: 'bg-secondary' },
  ];
  const state = value.length === 0 ? states[0] : states[Math.min(score, 4)];
  const filled = value.length === 0 ? 0 : Math.min(Math.max(score, 1), 3);

  return (
    <div className="flex flex-col gap-1 pt-1">
      <div className="flex items-center justify-between">
        <span className="font-label-sm text-label-sm text-on-surface-variant">Strength</span>
        <span className={`font-label-sm font-semibold ${state.tone}`}>{state.label}</span>
      </div>
      <div className="grid h-1.5 grid-cols-3 gap-1.5" aria-hidden="true">
        {[0, 1, 2].map((index) => (
          <span
            key={index}
            className={`h-full rounded-full transition-colors ${index < filled ? state.bar : 'bg-surface-container-high'}`}
          />
        ))}
      </div>
      <p className="font-body-sm text-body-sm text-on-surface-variant">{state.text}</p>
    </div>
  );
}

/**
 * Step 1 of 5 — contact details and password.
 * Route: `/register/contact`
 *
 * Either a phone number or an email can be used to receive the verification
 * code (both are optional in the sense that only one is required). Nothing is
 * sent anywhere in this frontend build.
 */
export function ContactDetailsScreen() {
  const navigate = useNavigate();
  const method = useRegistrationDraft((s) => s.method);
  const phone = useRegistrationDraft((s) => s.phone);
  const email = useRegistrationDraft((s) => s.email);
  const setContact = useRegistrationDraft((s) => s.setContact);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const changeMethod = (next: ContactMethod) => {
    setContact({ method: next });
    setErrors({});
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    const next: Errors = {};

    if (method === 'phone') {
      if (!PHONE_RE.test(phone.replace(/\s/g, ''))) next.phone = 'Enter a valid mobile number (7–11 digits).';
    } else if (!EMAIL_RE.test(email.trim())) {
      next.email = 'Enter a valid email address.';
    }

    if (password.length < 8) next.password = 'Use at least 8 characters.';
    if (confirm !== password) next.confirm = 'Passwords do not match.';
    if (!agreed) next.terms = 'Please agree to the terms to continue.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setContact({ method, phone: phone.trim(), email: email.trim(), passwordSet: true });
    navigate('/register/verify');
  };

  const phoneValid = PHONE_RE.test(phone.replace(/\s/g, ''));
  const emailValid = EMAIL_RE.test(email.trim());

  return (
    <AuthShell
      title="Create Your Account"
      step={1}
      stepCaption="Account creation & contact verification"
      onBack={() => navigate('/register')}
      aside={
        <AuthAside
          heading="One contact detail is enough"
          points={[
            {
              icon: method === 'phone' ? 'call' : 'mail',
              title: 'Choose phone or email',
              text: 'Only one is required — the other stays optional and can be added later.',
            },
            {
              icon: 'sms',
              title: 'A code confirms it is you',
              text: 'The verification code proves you control that contact before an account exists.',
            },
            {
              icon: 'password',
              title: 'Your password stays local',
              text: 'This demo never transmits or stores what you type.',
            },
          ]}
        />
      }
    >
      {/* Intro */}
      <div className="flex flex-col gap-space-2xs">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-surface">
          Enter Your Contact Details
        </h1>
        <p className="font-body-md text-body-md text-on-surface-variant">
          Enter either your mobile number or your email address to receive a verification code.
          Both are not required.
        </p>
      </div>

      <form onSubmit={submit} noValidate className="flex flex-col gap-space-lg">
        {/* Verification route */}
        <section className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-space-2xs font-title-sm text-title-sm text-on-surface">
              <Icon name="contact_mail" filled className="text-[18px] text-primary" />
              Primary verification route
            </span>
            <span className="rounded-full bg-surface-container px-space-xs py-0.5 font-label-sm font-medium text-primary">
              Choose 1
            </span>
          </div>

          <SegmentedControl
            ariaLabel="Primary verification route"
            value={method}
            onValueChange={changeMethod}
            options={[
              { value: 'phone', label: 'Mobile Phone', icon: 'call' },
              { value: 'email', label: 'Email Address', icon: 'mail' },
            ]}
          />

          {method === 'phone' ? (
            <TextField
              id="phone-input"
              label="Mobile phone number"
              labelAside="Fastest for SMS"
              inputMode="tel"
              autoComplete="tel"
              placeholder="801 234 5678"
              value={phone}
              error={errors.phone}
              onValueChange={(value) => {
                setContact({ phone: value });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
              trailing={
                phoneValid ? (
                  <Icon name="check_circle" filled className="text-[20px] text-secondary" />
                ) : null
              }
              className="tracking-wide"
            />
          ) : (
            <TextField
              id="email-input"
              label="Email address"
              labelAside="Good for receipts"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="patient@example.com"
              value={email}
              error={errors.email}
              onValueChange={(value) => {
                setContact({ email: value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              trailing={
                emailValid ? (
                  <Icon name="check_circle" filled className="text-[20px] text-secondary" />
                ) : null
              }
            />
          )}

          {/* Country chip shown with the Nigerian number field (display only) */}
          {method === 'phone' ? (
            <p className="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
              <span aria-hidden="true">🇳🇬</span>
              Sending to Nigeria (+234) — enter your number without the leading zero or +234.
            </p>
          ) : null}

          <div className="flex items-start gap-space-xs rounded-lg bg-surface-container-low p-space-xs">
            <Icon name="info" className="mt-0.5 flex-shrink-0 text-[18px] text-primary" />
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Your selected contact will receive a 6-digit code to confirm you control it. In this
              demo the code is shown on the next screen — no real SMS or email is sent.
            </p>
          </div>
        </section>

        {/* Password */}
        <section className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-space-2xs font-title-sm text-title-sm text-on-surface">
              <Icon name="shield_person" filled className="text-[18px] text-primary" />
              Security credentials
            </span>
            <span className="font-label-sm font-medium text-outline">8+ chars required</span>
          </div>

          <div className="flex flex-col gap-space-sm">
            <PasswordField
              id="password"
              label="Create password"
              placeholder="At least 8 characters"
              autoComplete="new-password"
              value={password}
              error={errors.password}
              onValueChange={(value) => {
                setPassword(value);
                if (errors.password) setErrors({ ...errors, password: undefined });
              }}
            />
            <StrengthGauge value={password} />
          </div>

          <PasswordField
            id="confirm-password"
            label="Confirm password"
            placeholder="Repeat the password"
            autoComplete="new-password"
            value={confirm}
            error={errors.confirm}
            hint={confirm.length > 0 && confirm === password ? 'Passwords match' : undefined}
            onValueChange={(value) => {
              setConfirm(value);
              if (errors.confirm) setErrors({ ...errors, confirm: undefined });
            }}
          />
        </section>

        {/* Consent */}
        <section className="rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
          <label className="flex cursor-pointer items-start gap-space-sm">
            <input
              id="terms-checkbox"
              type="checkbox"
              className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-primary"
              checked={agreed}
              onChange={(event) => {
                setAgreed(event.target.checked);
                if (errors.terms) setErrors({ ...errors, terms: undefined });
              }}
            />
            <span className="font-body-sm leading-relaxed text-on-surface-variant">
              I agree to the{' '}
              <span className="font-semibold text-primary">DHA Terms of Service</span> and{' '}
              <span className="font-semibold text-primary">Privacy Policy</span>, and I understand
              this account is linked to my Lifecode oral health record.
            </span>
          </label>
          {errors.terms ? (
            <p role="alert" className="mt-space-2xs pl-7 font-body-sm text-body-sm text-error">
              {errors.terms}
            </p>
          ) : null}
        </section>

        {/* Actions */}
        <div className="flex flex-col gap-space-md">
          <Button
            id="send-code-btn"
            type="submit"
            size="lg"
            icon={<Icon name="arrow_forward" className="text-[20px]" />}
          >
            Send Verification Code
          </Button>

          <div className="flex flex-col items-center gap-space-2xs text-center">
            <p className="font-body-md text-body-md text-on-surface-variant">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="font-semibold text-primary hover:underline"
              >
                Log in
              </button>
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container-low px-space-sm py-1 text-on-surface-variant">
              <Icon name="verified_user" filled className="text-[15px] text-secondary" />
              <span className="font-label-sm font-medium">
                Frontend demo — details stay in this browser
              </span>
            </span>
          </div>
        </div>
      </form>
    </AuthShell>
  );
}
