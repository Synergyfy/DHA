import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { Icon } from '../../design/Primitives';
import { PaginationDots } from '../../design/PaginationDots';
import { OnboardingShell } from '../../design/OnboardingShell';

const MASCOT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUHI95OHncchMfI_rz9oYnUI7PYSY_wfcyZm6hqZGJ7J7cylc58lakww7gDcPhYsOhe8XLEM41F21kn8aO54EOf-7Bxi74cCXTnD_TaCi4EJRBDtxFSZhsQ19UlRlZK3cDoC1kYI0tTpKgIz-oRrbu8LWeAm-rZ1QY2cwp06G5Rpj_uaAORQbITqZk-ZHGj_FPPAizwceFnBga4so5kbk8YBmaKPZzfFDV9FsdMrj';

/**
 * Screen 2 — Onboarding / Smart Patient Lifecode.
 * Route: `/onboarding/lifecode`
 *
 * Explains the patient Lifecode before account creation. Per the product
 * blueprint (§4.1) the Lifecode is an identifier used to locate a patient —
 * never a password or access token — so the copy states that explicitly.
 */
export function LifecodeScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingShell
      header={
        <header className="flex w-full items-center justify-between">
          <div className="flex items-center gap-space-xs rounded-full bg-surface-container px-2.5 py-1">
            <Icon name="verified" filled className="text-[15px] text-primary" />
            <span className="font-label-sm text-label-sm uppercase tracking-tight text-primary">
              DHA Health
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-surface-container-low px-2.5 py-1 font-label-sm text-label-sm font-medium text-on-surface-variant">
              Step 2 of 3
            </span>
            <button
              type="button"
              onClick={() => navigate('/onboarding/get-started')}
              className="rounded-lg px-1.5 py-1 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-primary"
            >
              Skip
            </button>
          </div>
        </header>
      }
    >
      <div className="flex flex-1 flex-col justify-start gap-space-lg md:grid md:grid-cols-2 md:items-center md:gap-space-xl lg:gap-space-2xl">
        {/* Mascot visual */}
        <div className="my-auto flex flex-col items-center justify-center py-3">
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72 lg:h-80 lg:w-80 xl:h-[22rem] xl:w-[22rem]">
            <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-secondary-container/40 via-primary-fixed/30 to-surface-container blur-2xl" />
            <div className="relative flex h-56 w-56 items-center justify-center overflow-hidden rounded-full bg-surface-container-lowest p-3 shadow-md sm:h-64 sm:w-64 lg:h-72 lg:w-72 xl:h-80 xl:w-80">
              <img
                src={MASCOT_IMAGE}
                alt="Friendly dental mascot presenting a digital dental ID card"
                className="h-full w-full select-none object-contain"
              />
            </div>
            <div className="absolute -bottom-1 right-4 flex animate-bounce items-center gap-1.5 rounded-full bg-surface-container-lowest px-3 py-1.5 shadow-md [animation-duration:3s]">
              <Icon name="qr_code_scanner" filled className="text-[16px] text-secondary" />
              <span className="font-label-sm text-label-sm font-semibold text-secondary">
                Instant Sync
              </span>
            </div>
          </div>

          <PaginationDots total={3} activeIndex={1} className="mt-5" />
        </div>

        {/* Copy + actions */}
        <div className="mx-auto flex w-full max-w-[26rem] flex-col md:max-w-none lg:max-w-[28rem]">
        <div className="my-auto flex flex-col items-center py-2 text-center">
          <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile tracking-tight text-on-surface md:font-headline-lg md:text-headline-lg lg:text-display-lg">
            Smart Patient Lifecode
          </h1>
          <p className="max-w-[310px] font-body-md text-body-md leading-snug text-on-surface-variant lg:max-w-sm">
            One universal digital ID with instant QR scan for clinic visits, check-ups, and emergency
            records.
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-secondary-container/30 px-3 py-1 text-on-secondary-container">
            <Icon name="health_and_safety" filled className="text-[14px]" />
            <span className="font-label-sm text-label-sm font-semibold tracking-wide">
              Your ID, not a key &bull; Used only to find your record
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex w-full flex-col gap-3 pt-2">
          <Button
            size="lg"
            onClick={() => navigate('/onboarding/get-started')}
            icon={<Icon name="arrow_forward" className="text-[20px]" />}
          >
            Continue
          </Button>

          <div className="flex items-center justify-between px-1 pt-1">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 rounded-lg py-1 font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
            >
              <Icon name="arrow_back" className="text-[16px]" />
              <span>Back</span>
            </button>
            <div className="font-body-sm text-body-sm text-on-surface-variant">
              Already registered?{' '}
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="ml-0.5 font-title-sm text-title-sm text-primary hover:underline"
              >
                Log in
              </button>
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/about')}
              className="flex items-center gap-1 rounded-full px-2.5 py-1 font-label-sm text-label-sm text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-primary"
            >
              <Icon name="info" className="text-[15px] text-primary" />
              <span>Learn about DHA</span>
            </button>
          </div>
        </div>
        </div>
      </div>
    </OnboardingShell>
  );
}
