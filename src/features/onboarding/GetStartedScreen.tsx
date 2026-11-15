import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { LogoBadge } from '../../design/LogoBadge';
import { Icon } from '../../design/Primitives';
import { PaginationDots } from '../../design/PaginationDots';
import { OnboardingShell } from '../../design/OnboardingShell';

const MASCOT_CARD_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAnUHI95OHncchMfI_rz9oYnUI7PYSY_wfcyZm6hqZGJ7J7cylc58lakww7gDcPhYsOhe8XLEM41F21kn8aO54EOf-7Bxi74cCXTnD_TaCi4EJRBDtxFSZhsQ19UlRlZK3cDoC1kYI0tTpKgIz-oRrbu8LWeAm-rZ1QY2cwp06G5Rpj_uaAORQbITqZk-ZHGj_FPPAizwceFnBga4so5kbk8YBmaKPZzfFDV9FsdMrj';

/**
 * Screen 3 — Get Started & Join As.
 * Route: `/onboarding/get-started`
 *
 * Terminal onboarding slide: chooses the patient/guardian registration path,
 * login, or the provider/screener role-selection screen.
 */
export function GetStartedScreen() {
  const navigate = useNavigate();

  return (
    <OnboardingShell
      header={
        <div className="flex w-full items-center justify-between py-space-sm">
          <LogoBadge variant="stacked" />
          <span className="rounded-full bg-surface-container px-space-xs py-1 font-label-sm text-label-sm font-semibold text-primary">
            Step 3 of 3
          </span>
        </div>
      }
    >
      <div className="flex flex-1 flex-col justify-start gap-space-lg md:grid md:grid-cols-2 md:items-center md:gap-space-xl lg:gap-space-2xl">
        {/* Visual hero */}
        <div className="relative my-space-xs flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-surface-container-low to-surface-container p-space-sm shadow-sm md:min-h-[22rem] md:p-space-lg lg:max-h-[64vh] lg:min-h-[26rem] xl:min-h-[28rem]">
          <div className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-secondary-fixed/40 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-primary-fixed/50 blur-2xl" />
          <div className="relative flex h-48 w-full items-center justify-center sm:h-56 lg:h-64">
            <img
              src={MASCOT_CARD_IMAGE}
              alt="Dental mascot presenting a digital dental health card on a phone"
              className="h-full max-w-md select-none object-contain drop-shadow-md"
            />
          </div>
          <div className="mt-2 flex items-center gap-1.5 rounded-full bg-surface-container-lowest/90 px-3 py-1 shadow-sm backdrop-blur-sm">
            <Icon name="verified" filled className="text-[15px] text-secondary" />
            <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
              Digital Dental ID Integration
            </span>
          </div>
        </div>

        {/* Content + actions */}
        <div className="mx-auto flex w-full max-w-[26rem] flex-col md:max-w-none lg:max-w-[28rem]">
        {/* Pagination */}
        <PaginationDots total={3} activeIndex={2} variant="dot" className="my-space-sm" />

        {/* Copy */}
        <div className="mb-space-md mt-space-xs px-space-xs text-center">
          <h1 className="font-headline-md font-bold text-headline-md text-on-surface lg:text-headline-lg">
            Family &amp; Unified Care
          </h1>
          <p className="mt-1.5 font-body-md text-body-md leading-snug text-on-surface-variant">
            Manage dental records for your whole family, track kids teeth milestones, and sync
            treatments seamlessly.
          </p>
        </div>

        {/* Primary actions */}
        <div className="flex flex-col gap-space-xs">
          <Button
            size="lg"
            onClick={() => navigate('/register')}
            icon={<Icon name="arrow_forward" className="text-[18px]" />}
          >
            Get Started (Patient / Guardian)
          </Button>
          <Button variant="neutral" size="md" onClick={() => navigate('/login')}>
            I have an account &bull; Log In
          </Button>
        </div>

        {/* Role quick access */}
        <div className="my-space-sm w-full">
          <button
            type="button"
            onClick={() => navigate('/join-role')}
            className="group flex w-full items-center justify-between rounded-xl border border-surface-container bg-surface-container-lowest p-space-sm shadow-sm transition-all duration-200 hover:bg-surface-container-low active:bg-surface-container"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-surface-container text-primary transition-transform group-hover:scale-105">
                <Icon name="badge" className="text-[22px]" />
              </div>
              <div className="flex flex-col text-left">
                <span className="flex items-center gap-1.5 font-title-sm text-title-sm font-semibold text-on-surface">
                  Or join as another role
                  <Icon
                    name="arrow_forward"
                    className="text-[16px] text-primary transition-transform group-hover:translate-x-0.5"
                  />
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Clinicians, School Screeners &amp; Partners
                </span>
              </div>
            </div>
            <div className="flex items-center text-outline transition-colors group-hover:text-primary">
              <Icon name="chevron_right" className="text-[20px]" />
            </div>
          </button>
        </div>

        {/* Learn more */}
        <div className="mt-space-md flex justify-center">
          <button
            type="button"
            onClick={() => navigate('/about')}
            className="inline-flex items-center gap-1.5 rounded-full bg-surface-container px-3 py-1 font-label-sm text-label-sm font-semibold text-primary transition-colors duration-200 hover:bg-surface-container-high"
          >
            <Icon name="info" className="text-[15px]" />
            <span>Learn about DHA</span>
            <Icon name="chevron_right" className="text-[14px]" />
          </button>
        </div>

        {/* Trust signature */}
        <div className="mt-space-lg flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center gap-1.5 text-outline">
            <Icon name="lock" className="text-[14px]" />
            <span className="font-label-sm text-label-sm font-medium tracking-wide">
              Official Dental Health Authority &bull; Privacy Guaranteed
            </span>
          </div>
          <span className="mt-0.5 font-label-sm text-[10px] text-outline/70">
            Records stay private until you choose to share them
          </span>
        </div>
        </div>
      </div>
    </OnboardingShell>
  );
}
