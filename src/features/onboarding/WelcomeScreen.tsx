import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { LogoBadge } from '../../design/LogoBadge';
import { Icon } from '../../design/Primitives';
import { PaginationDots } from '../../design/PaginationDots';
import { OnboardingShell } from '../../design/OnboardingShell';

const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuASeumvxKMQR5GBBjUdyADTrm-8Qw7FVa7ZUWb4-HOjaIb7A3tV2tJELCppj3mBUE2x2nc_l_Dn62NRnjwa2qrF2GUgnt3q-2vWWLqFcrorXRp5iC9ofbR7z5ojUZs6J3ujCpZqKcFufnitTmzfUnk6NO1xRfKGpU9Dtw35H4bUE7GnQT66EwgBavk5Srj9t9jASKDdsh_B6hsrAR8nAg44RJVeLYx3J4KEBuTIx5-r';

/**
 * Screen 1 — Welcome / Lifelong Dental Care.
 * Route: `/`
 *
 * First impression + value proposition. Entry point to the onboarding
 * carousel (3 slides), the role-selection screen, About DHA and login.
 */
export function WelcomeScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingShell
      header={
        <div className="flex w-full items-center justify-between">
          <LogoBadge variant="pill" />
          <button
            type="button"
            onClick={() => navigate('/onboarding/get-started')}
            className="rounded-full px-3 py-1 font-title-sm text-body-sm text-outline transition-colors hover:text-on-surface active:bg-surface-container-high"
          >
            Skip
          </button>
        </div>
      }
    >
      <div className="flex flex-1 flex-col justify-between gap-space-lg md:grid md:grid-cols-2 md:items-center md:gap-space-xl lg:gap-space-2xl">
        {/* Visual hero */}
        <div className="relative my-4 aspect-[4/3.5] w-full overflow-hidden rounded-2xl bg-surface-container-low shadow-sm md:my-0 md:aspect-[4/3.6] lg:aspect-[4/4.2] lg:max-h-[64vh] xl:aspect-[4/4.4]">
          <img
            src={HERO_IMAGE}
            alt="A smiling patient receiving a gentle consultation from a dentist in a modern dental clinic"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-30" />
          <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-surface/90 px-2.5 py-1 shadow-sm backdrop-blur-md">
            <Icon name="verified" filled className="text-[14px] text-secondary" />
            <span className="font-label-sm text-label-sm text-secondary">Verified Care</span>
          </div>
        </div>

        {/* Copy + actions */}
        <div className="mx-auto flex w-full max-w-[26rem] flex-col md:max-w-none lg:max-w-[28rem]">
          <div className="my-2 flex w-full flex-col items-center text-center">
            <PaginationDots total={3} activeIndex={0} className="mb-3" />
            <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-surface md:font-headline-lg md:text-headline-lg lg:text-display-lg">
              Lifelong Dental Care
            </h1>
            <p className="max-w-[320px] px-1 font-body-md text-body-md leading-relaxed text-on-surface-variant">
              Your unified oral health record connecting verified dentists, screenings, and family
              care in one place.
            </p>
          </div>

          <div className="mt-4 flex w-full flex-col gap-3 pb-2">
            <Button
              size="lg"
              onClick={() => navigate('/onboarding/lifecode')}
              icon={<Icon name="arrow_forward" className="text-[18px]" />}
            >
              Get Started
            </Button>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate('/join-role')}
                className="flex items-center gap-1 rounded-lg px-3 py-1 font-title-sm text-body-sm text-tertiary transition-colors hover:text-tertiary-container"
              >
                <span>Join as a Healthcare Provider or Screener</span>
                <Icon name="arrow_right_alt" className="text-[15px]" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => navigate('/about')}
                className="flex items-center gap-1.5 rounded-lg px-3 py-1 font-title-sm text-body-sm text-outline transition-colors hover:text-on-surface"
              >
                <Icon name="info" className="text-[16px] text-tertiary" />
                <span>Learn about DHA</span>
              </button>
            </div>

            <div className="text-center">
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/login')}
                  className="ml-1 font-title-sm text-body-sm text-primary hover:underline"
                >
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </OnboardingShell>
  );
}
