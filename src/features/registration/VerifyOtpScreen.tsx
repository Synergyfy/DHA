import { useEffect, useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';
import { useRegistrationDraft } from '../../store/registrationDraft';
import { maskEmail, maskPhone } from './registrationData';

/** The code shown on screen — this build never sends a real SMS or email. */
const DEMO_CODE = '123456';
const OTP_LENGTH = 6;

const FALLBACK_OPTIONS: Record<'phone' | 'email', { icon: string; title: string; text: string; tone: string }[]> = {
  phone: [
    {
      icon: 'sms',
      title: 'Resend SMS code',
      text: 'Send the code to your number again',
      tone: 'bg-primary/10 text-primary',
    },
    {
      icon: 'call',
      title: 'Call me with a voice code',
      text: 'Hear the code read out instead',
      tone: 'bg-secondary-container/50 text-secondary',
    },
    {
      icon: 'chat',
      title: 'Send via WhatsApp',
      text: 'Receive the code in a chat message',
      tone: 'bg-secondary-container text-on-secondary-container',
    },
  ],
  email: [
    {
      icon: 'forward_to_inbox',
      title: 'Open mail app',
      text: 'Switch to Gmail, Outlook or Apple Mail',
      tone: 'bg-primary/10 text-primary',
    },
    {
      icon: 'mark_email_unread',
      title: 'Resend verification email',
      text: 'Send a fresh code to your inbox',
      tone: 'bg-secondary-container/40 text-secondary',
    },
    {
      icon: 'auto_awesome',
      title: 'Send a sign-in link instead',
      text: 'Skip the code with a one-tap link',
      tone: 'bg-tertiary-fixed text-tertiary',
    },
  ],
};

/**
 * Step 2 of 5 — contact verification (phone or email OTP).
 * Route: `/register/verify`
 *
 * The six-digit code is displayed on screen and labelled as a demonstration,
 * because this frontend build has no SMS/email channel behind it.
 */
export function VerifyOtpScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const method = useRegistrationDraft((s) => s.method);
  const phone = useRegistrationDraft((s) => s.phone);
  const email = useRegistrationDraft((s) => s.email);
  const setFlags = useRegistrationDraft((s) => s.setFlags);

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [error, setError] = useState('');
  const [seconds, setSeconds] = useState(method === 'phone' ? 162 : 588);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((value) => (value > 0 ? value - 1 : 0));
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const masked = method === 'phone' ? maskPhone(phone) : maskEmail(email);
  const joined = digits.join('');
  const complete = joined.length === OTP_LENGTH;
  const expired = seconds === 0;
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secs = String(seconds % 60).padStart(2, '0');

  const setDigit = (index: number, value: string) => {
    const char = value.replace(/\D/g, '').slice(-1);
    const next = [...digits];
    next[index] = char;
    setDigits(next);
    if (error) setError('');
    if (char && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (event.key === 'ArrowLeft' && index > 0) inputs.current[index - 1]?.focus();
    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
  };

  const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = Array(OTP_LENGTH).fill('');
    pasted.split('').forEach((char, index) => {
      next[index] = char;
    });
    setDigits(next);
    setError('');
    inputs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const autofill = () => {
    setDigits(DEMO_CODE.split(''));
    setError('');
    inputs.current[OTP_LENGTH - 1]?.focus();
  };

  const verify = () => {
    if (!complete) {
      setError('Enter all 6 digits of the code.');
      return;
    }
    if (joined !== DEMO_CODE) {
      setError('That code does not match the demonstration code shown above.');
      return;
    }
    setFlags({ contactVerified: true });
    navigate('/register/details');
  };

  const demoNotice = (text: string) => showToast(`Demo build — ${text} Nothing was actually sent.`);

  return (
    <AuthShell
      title="Verify Contact"
      step={2}
      stepCaption={method === 'phone' ? 'SMS verification' : 'Email verification'}
      onBack={() => navigate('/register/contact')}
      aside={
        <AuthAside
          heading="Verifying keeps your record unique"
          points={[
            {
              icon: 'person_check',
              title: 'Confirms you control the contact',
              text: 'The code proves the number or email is yours before an account is created.',
            },
            {
              icon: 'content_copy',
              title: 'Duplicates are never merged silently',
              text: 'If a possible existing profile is found you are asked to confirm — records are never combined automatically.',
            },
            {
              icon: 'timer',
              title: 'Codes expire quickly',
              text: 'Short-lived codes limit how long a leaked code could be used.',
            },
          ]}
        />
      }
    >
      {/* Method badge */}
      <div className="flex flex-wrap items-center gap-space-xs">
        <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container/30 px-2.5 py-1 font-label-sm font-semibold text-on-secondary-container">
          <Icon name={method === 'phone' ? 'sms' : 'mark_email_read'} filled className="text-[13px]" />
          {method === 'phone' ? 'SMS VERIFICATION' : 'EMAIL VERIFICATION'}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-container px-2 py-1 font-label-sm text-on-surface-variant">
          <Icon name="science" className="text-[13px]" />
          DEMO BUILD
        </span>
      </div>

      {/* Headline */}
      <div className="flex flex-col gap-space-2xs">
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight text-on-surface">
          {method === 'phone' ? 'Verify Phone Number' : 'Verify Email Address'}
        </h1>
        <p className="font-body-md leading-relaxed text-on-surface-variant">
          Enter the 6-digit code for{' '}
          <span className="whitespace-nowrap font-semibold text-on-surface">{masked}</span>. This
          demo shows the code below — no real {method === 'phone' ? 'SMS' : 'email'} is sent.
        </p>
        <button
          type="button"
          onClick={() => navigate('/register/contact')}
          className="mt-1 inline-flex items-center gap-1 self-start font-title-sm text-primary hover:underline"
        >
          <Icon name="edit" className="text-[16px]" />
          Wrong {method === 'phone' ? 'number' : 'email'}? Edit contact details
        </button>
      </div>

      {/* Demonstration code */}
      <div className="flex flex-wrap items-center justify-between gap-space-sm rounded-xl bg-secondary-container/40 p-space-sm">
        <div className="flex items-center gap-space-sm">
          <Icon name="key" filled className="text-[20px] text-on-secondary-container" />
          <div className="flex flex-col">
            <span className="font-label-sm font-semibold uppercase tracking-wide text-on-secondary-container">
              Demonstration code
            </span>
            <span className="font-title-sm text-title-sm font-bold tracking-widest text-on-surface">
              {DEMO_CODE}
            </span>
          </div>
        </div>
        <Button size="sm" variant="neutral" onClick={autofill} className="!w-auto">
          Autofill
        </Button>
      </div>

      {/* OTP entry */}
      <section className="flex flex-col gap-space-md rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-label-sm font-semibold uppercase tracking-wider text-on-surface-variant">
            {OTP_LENGTH}-digit code
          </span>
          <span className="flex items-center gap-1.5 font-label-sm text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary" aria-hidden="true" />
            {complete ? 'Ready to verify' : 'Waiting for input'}
          </span>
        </div>

        <div className="grid grid-cols-6 gap-2">
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                inputs.current[index] = element;
              }}
              id={`otp-digit-${index}`}
              aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
              inputMode="numeric"
              autoComplete={index === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={digit}
              onChange={(event) => setDigit(index, event.target.value)}
              onKeyDown={(event) => onKeyDown(index, event)}
              onPaste={onPaste}
              className={[
                'h-14 w-full min-w-0 rounded-lg bg-surface-container-low text-center',
                'font-headline-md text-headline-md font-bold text-on-surface shadow-inner',
                'outline-none transition-colors focus:bg-surface-container-lowest focus:text-primary',
              ].join(' ')}
            />
          ))}
        </div>

        {error ? (
          <p role="alert" className="font-body-sm text-body-sm text-error">
            {error}
          </p>
        ) : null}

        <div className="flex items-center justify-between gap-space-xs pt-space-2xs">
          <span
            className={`flex items-center gap-1.5 font-label-md text-on-surface-variant ${expired ? 'text-error' : ''}`}
          >
            <Icon name="timer" className="text-[18px] text-primary" />
            {expired ? (
              <span className="font-semibold">Code expired</span>
            ) : (
              <>
                Code expires in{' '}
                <strong className="font-semibold text-on-surface">
                  {minutes}:{secs}
                </strong>
              </>
            )}
          </span>
          <button
            type="button"
            onClick={autofill}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary-fixed px-3 py-1.5 font-label-sm font-semibold text-on-primary-fixed-variant active:scale-95"
          >
            <Icon name="content_paste" className="text-[16px]" />
            Paste code
          </button>
        </div>
      </section>

      {/* Fallback options */}
      <section className="flex flex-col gap-space-2xs rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <h2 className="font-title-sm text-title-sm font-semibold text-on-surface">
          Didn&apos;t receive the code?
        </h2>
        {FALLBACK_OPTIONS[method].map((option) => (
          <button
            key={option.title}
            type="button"
            onClick={() =>
              demoNotice(
                method === 'phone'
                  ? 'no SMS, voice call or WhatsApp message is sent by this demo.'
                  : 'no email is sent by this demo.',
              )
            }
            className="flex items-center justify-between gap-space-sm rounded-lg bg-surface-container-low p-space-sm text-left transition-colors hover:bg-surface-container"
          >
            <span className="flex min-w-0 items-center gap-space-sm">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${option.tone}`}
              >
                <Icon name={option.icon} className="text-[20px]" />
              </span>
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-title-sm text-title-sm text-on-surface">
                  {option.title}
                </span>
                <span className="truncate font-body-sm text-body-sm text-on-surface-variant">
                  {option.text}
                </span>
              </span>
            </span>
            <Icon name="chevron_right" className="shrink-0 text-outline" />
          </button>
        ))}
      </section>

      {/* Duplicate-safety note (spec: possible matches are never auto-merged) */}
      <section className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md shadow-sm">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
          <Icon name="fingerprint" className="text-[22px]" />
        </span>
        <div className="flex flex-col gap-1">
          <span className="flex items-center gap-1.5 font-title-sm font-semibold text-on-surface">
            Duplicate check, never a silent merge
            <Icon name="verified" filled className="text-[16px] text-secondary" />
          </span>
          <p className="font-body-sm leading-relaxed text-on-surface-variant">
            Verifying your contact lets the system look for a possible existing profile. A possible
            match is never merged automatically — you confirm it through a safe recovery process
            first.
          </p>
        </div>
      </section>

      {/* Email-only troubleshooting */}
      {method === 'email' ? (
        <section className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container/50 text-secondary">
            <Icon name="info" className="text-[18px]" />
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-title-sm font-semibold text-on-surface">Check spam or promotions</h3>
            <p className="font-body-sm leading-relaxed text-on-surface-variant">
              If nothing arrives, look in your spam, junk or promotions folder, or add{' '}
              <span className="font-semibold text-on-surface">no-reply@dha-health.ng</span> to your
              safe senders.
            </p>
          </div>
        </section>
      ) : null}

      {/* Actions */}
      <div className="flex flex-col items-center gap-space-2xs">
        <Button
          id="verify-continue-btn"
          size="lg"
          disabled={!complete}
          onClick={verify}
          icon={<Icon name="arrow_forward" className="text-[18px]" />}
        >
          Verify &amp; Continue
        </Button>
        <span className="flex items-center gap-1.5 text-outline">
          <Icon name="shield" className="text-[14px]" />
          <span className="font-label-sm">
            Demo verification session · code shown on screen only
          </span>
        </span>
      </div>
    </AuthShell>
  );
}
