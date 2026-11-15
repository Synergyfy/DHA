import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { GoogleGlyph } from '../../design/GoogleGlyph';
import { PasswordField, TextField } from '../../design/Form';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';
import { ForgotPasswordSheet } from './ForgotPasswordSheet';

/**
 * Screen 3 — Patient Login & Sign In.
 * Route: `/login`
 *
 * Frontend-only: credentials are never checked or transmitted. Submitting shows
 * an explicit demo notice before moving on, so a simulated sign-in can never be
 * mistaken for a real authenticated session.
 */
export function LoginScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [sheetOpen, setSheetOpen] = useState(false);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!identifier.trim()) {
      setError('Enter your phone number or email.');
      return;
    }
    if (!password) {
      setError('Enter your password.');
      return;
    }
    setError('');
    showToast('Demo sign-in — credentials are not checked in this build.');
    navigate('/patient-dashboard');
  };

  return (
    <AuthShell
      title="Patient Login"
      onBack={() => navigate('/')}
      aside={
        <AuthAside
          heading="Welcome back to your record"
          points={[
            {
              icon: 'dentistry',
              title: 'Records and summaries',
              text: 'Sign in to see your Lifecode, screening history and clinician-approved summaries.',
            },
            {
              icon: 'notifications',
              title: 'Reminders you configured',
              text: 'Appointment and care reminders appear here once the service is connected.',
            },
            {
              icon: 'lock',
              title: 'Nothing is checked here',
              text: 'This demo never sends or verifies your credentials — it only shows the flow.',
            },
          ]}
        />
      }
    >
      {/* Greeting */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container-low p-space-lg shadow-sm">
        <div className="pointer-events-none absolute -bottom-6 -right-6 h-28 w-28 rounded-full bg-secondary-fixed/20 blur-xl" />
        <div className="relative z-10 flex items-start gap-space-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
            <Icon name="dentistry" filled className="text-[22px]" />
          </span>
          <div>
            <span className="font-label-sm font-semibold uppercase tracking-wider text-secondary">
              Verified patient portal
            </span>
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile font-bold tracking-tight">
              Welcome Back
            </h1>
          </div>
        </div>
        <p className="relative z-10 mt-space-sm font-body-md leading-relaxed text-on-surface-variant">
          Sign in to access your oral health records, Lifecode and screening history.
        </p>
        <div className="relative z-10 mt-space-md flex items-center gap-space-xs pt-space-xs">
          <span className="h-2 w-2 rounded-full bg-secondary" aria-hidden="true" />
          <span className="font-label-sm text-on-secondary-container">
            Frontend demo — no credentials are checked or stored
          </span>
        </div>
      </section>

      {/* Google */}
      <div className="flex flex-col gap-space-md">
        <button
          type="button"
          onClick={() => showToast('Google sign-in is not connected in this frontend demo.')}
          className="flex h-12 w-full items-center justify-center gap-space-sm rounded-xl border border-outline-variant/40 bg-surface-container-lowest font-title-sm font-semibold text-on-surface shadow-sm transition-all hover:bg-surface-container-low active:scale-[0.98]"
        >
          <GoogleGlyph />
          <span>Continue with Google</span>
        </button>
        <div className="relative flex items-center justify-center">
          <span className="h-px w-full bg-surface-container-high" />
          <span className="absolute bg-surface px-space-sm font-label-sm font-medium uppercase tracking-wider text-on-surface-variant">
            or sign in with details
          </span>
        </div>
      </div>

      {/* Credentials */}
      <form onSubmit={submit} noValidate className="flex flex-col gap-space-md">
        <TextField
          id="patient-identifier"
          label="Phone number or email"
          labelAside="Dual identifier"
          icon="badge"
          autoComplete="username"
          placeholder="e.g. 801 234 5678 or patient@example.com"
          value={identifier}
          error={error && !identifier.trim() ? error : undefined}
          onValueChange={(value) => {
            setIdentifier(value);
            if (error) setError('');
          }}
        />
        <div>
          <PasswordField
            id="patient-password"
            label="Password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            error={error && identifier.trim() && !password ? error : undefined}
            onValueChange={(value) => {
              setPassword(value);
              if (error) setError('');
            }}
          />
          <div className="mt-space-2xs flex justify-end">
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="font-label-md font-semibold text-primary hover:text-primary-container"
            >
              Forgot password?
            </button>
          </div>
        </div>

        <Button
          id="sign-in-btn"
          type="submit"
          size="lg"
          icon={<Icon name="arrow_forward" className="text-[20px]" />}
        >
          Sign In to DHA
        </Button>
      </form>

      {/* Biometrics */}
      <div className="relative flex items-center justify-center">
        <span className="h-px w-full bg-surface-container-high" />
        <span className="absolute bg-surface px-space-sm font-label-sm font-medium uppercase tracking-wider text-on-surface-variant">
          or fast express access
        </span>
      </div>
      <button
        type="button"
        onClick={() => showToast('Biometric sign-in is simulated — no device credentials are used.')}
        className="flex items-center justify-between gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all hover:bg-surface-container-low active:scale-[0.98]"
      >
        <span className="flex items-center gap-space-sm">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary-container/50 text-on-secondary-container">
            <Icon name="fingerprint" className="text-[24px]" />
          </span>
          <span className="flex flex-col text-left">
            <span className="font-title-sm font-semibold text-on-surface">
              Sign in with biometrics / Face ID
            </span>
            <span className="font-body-sm text-on-surface-variant">
              Simulated passkey in this demo
            </span>
          </span>
        </span>
        <Icon name="chevron_right" className="shrink-0 text-[20px] text-outline" />
      </button>

      {/* Professional helper — explanatory toast, never a faked portal */}
      <section className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md shadow-sm">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-variant text-primary">
          <Icon name="medical_services" className="text-[18px]" />
        </span>
        <div className="flex min-w-0 flex-col">
          <p className="font-body-sm leading-snug text-on-surface-variant">
            Are you a dental professional or screener?
          </p>
          <button
            type="button"
            onClick={() =>
              showToast('Role-specific portals are not part of this patient-facing release.')
            }
            className="mt-space-2xs inline-flex items-center gap-1 self-start font-label-md font-semibold text-primary hover:underline"
          >
            <span>Open the role workspace</span>
            <Icon name="open_in_new" className="text-[14px]" />
          </button>
        </div>
      </section>

      {/* What you get after sign-in (no pre-auth data is shown) */}
      <section className="flex flex-col gap-space-sm rounded-xl bg-surface-container-lowest p-space-md shadow-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-space-xs">
            <Icon name="insights" filled className="text-[20px] text-secondary" />
            <span className="font-title-sm font-semibold text-on-surface">
              After you sign in
            </span>
          </span>
          <span className="rounded-full bg-secondary-fixed px-space-xs py-0.5 font-label-sm uppercase text-on-secondary-fixed">
            Demo
          </span>
        </div>
        <ul className="grid grid-cols-1 gap-space-xs sm:grid-cols-2 lg:grid-cols-1">
          {[
            { icon: 'qr_code_2', title: 'Your Lifecode', text: 'Display, save or print it' },
            { icon: 'history', title: 'Screening history', text: 'Records from screenings you attended' },
            { icon: 'summarize', title: 'Approved summaries', text: 'Only clinician-approved results' },
            { icon: 'notifications', title: 'Reminders', text: 'The ones you configured' },
          ].map((item) => (
            <li
              key={item.title}
              className="flex items-center gap-space-xs rounded-lg bg-surface-container-low p-space-xs"
            >
              <Icon name={item.icon} className="text-[20px] text-primary" />
              <span className="flex min-w-0 flex-col">
                <span className="truncate font-label-md font-semibold text-on-surface">
                  {item.title}
                </span>
                <span className="truncate font-body-sm text-on-surface-variant">{item.text}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="font-body-sm text-on-surface-variant">
          Detailed clinical access is never granted just because an account exists.
        </p>
      </section>

      {/* Create account */}
      <div className="flex flex-col items-center gap-space-2xs text-center">
        <span className="font-body-md text-on-surface-variant">
          Don&apos;t have a DHA profile yet?
        </span>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="inline-flex items-center gap-space-2xs font-title-sm font-semibold text-primary hover:underline"
        >
          <span>Create an account</span>
          <Icon name="person_add" className="text-[16px]" />
        </button>
      </div>

      <ForgotPasswordSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </AuthShell>
  );
}
