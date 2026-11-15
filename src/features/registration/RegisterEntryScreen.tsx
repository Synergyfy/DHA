import { useNavigate } from 'react-router-dom';
import { AuthAside, AuthShell } from '../../design/AuthShell';
import { Button } from '../../design/Button';
import { GoogleGlyph } from '../../design/GoogleGlyph';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';

/**
 * Screen 2 — Patient Registration entry.
 * Route: `/register`
 *
 * Chooses the sign-up route (Google, which is not connected in this frontend
 * demo, or phone/email) and states the privacy rules before any data is asked
 * for (Journey 1 step 2: explain what the account is for).
 */
export function RegisterEntryScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <AuthShell
      title="Create Your Account"
      onBack={() => navigate('/onboarding/get-started')}
      aside={
        <AuthAside
          heading="Your lifelong oral health record starts here"
          points={[
            {
              icon: 'badge',
              title: 'A unique Lifecode',
              text: 'A patient identifier you can show or print — never a password or access token.',
            },
            {
              icon: 'lock',
              title: 'Private by default',
              text: 'Records stay private until you choose to share them with a provider.',
            },
            {
              icon: 'health_and_safety',
              title: 'Verified summaries only',
              text: 'You see clinician-approved summaries — screening results are never a diagnosis.',
            },
          ]}
        />
      }
    >
      {/* Hero */}
      <div className="flex flex-col items-center gap-space-xs text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container text-primary">
          <Icon name="health_and_safety" className="text-[28px]" />
        </span>
        <h1 className="font-headline-md text-headline-md font-bold text-on-surface">
          Create Your DHA Account
        </h1>
        <p className="max-w-xs font-body-md text-body-md text-on-surface-variant">
          Start your oral health journey with a unique Lifecode and a profile you control.
        </p>
      </div>

      {/* Sign-up routes */}
      <div className="flex flex-col gap-space-sm">
        <button
          type="button"
          onClick={() => showToast('Google sign-up is not connected in this frontend demo.')}
          className="flex h-12 w-full items-center justify-center gap-2.5 rounded-xl border border-outline-variant bg-surface-container-lowest font-title-sm text-title-sm text-on-surface shadow-sm transition-all hover:bg-surface-container-low active:scale-[0.99]"
        >
          <GoogleGlyph />
          <span className="font-medium">Continue with Google</span>
        </button>

        <div className="flex items-center gap-space-sm">
          <span className="h-px flex-1 bg-outline-variant" />
          <span className="font-label-sm font-semibold uppercase tracking-wider text-outline">
            or
          </span>
          <span className="h-px flex-1 bg-outline-variant" />
        </div>

        <Button
          size="lg"
          onClick={() => navigate('/register/contact')}
          icon={<Icon name="mark_email_read" className="text-[20px]" />}
        >
          Sign Up with Phone or Email
        </Button>
      </div>

      {/* Privacy statement (replaces Stitch's unsupported HIPAA claim) */}
      <div className="flex items-start gap-space-sm rounded-xl border border-outline-variant/40 bg-surface-container-low p-space-md">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
          <Icon name="verified_user" className="text-[18px]" />
        </span>
        <div className="flex flex-col">
          <p className="font-title-sm text-title-sm font-semibold text-on-surface">
            Private until you share it
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Your records stay private until you choose to share them. Your Lifecode identifies you —
            it is never a password or access token.
          </p>
        </div>
      </div>

      {/* Log in */}
      <div className="flex flex-col items-center gap-space-2xs">
        <p className="font-body-md text-body-md text-on-surface-variant">
          Already have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="font-title-sm font-semibold text-primary hover:underline"
          >
            Log in
          </button>
        </p>
        <p className="px-space-md text-center font-body-sm leading-relaxed text-outline">
          By signing up you agree to the{' '}
          <button
            type="button"
            onClick={() => showToast('The Terms of Service page is not part of this demo build.')}
            className="text-primary hover:underline"
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            type="button"
            onClick={() => showToast('The Privacy Policy page is not part of this demo build.')}
            className="text-primary hover:underline"
          >
            Privacy Policy
          </button>
          .
        </p>
      </div>

      {/* Honest demo notice (mobile equivalent of the desktop aside note) */}
      <p className="rounded-xl bg-surface-container-low p-space-sm font-body-sm text-body-sm text-on-surface-variant lg:hidden">
        <Icon name="info" className="mr-1 align-middle text-[16px] text-primary" />
        Frontend demo: no real SMS, email or account is created. Nothing you type leaves this
        browser.
      </p>
    </AuthShell>
  );
}
