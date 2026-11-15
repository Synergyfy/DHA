import type { ReactNode } from 'react';
import { ScreenHeader } from './ScreenHeader';
import { LogoBadge } from './LogoBadge';
import { Icon } from './Primitives';
import { StepProgress } from './StepProgress';

interface AuthShellProps {
  title: string;
  /** Step number renders the registration progress track above the content. */
  step?: number;
  stepCaption?: string;
  onBack?: () => void;
  /** Desktop-only brand panel (hidden below lg so mobile stays single column). */
  aside?: ReactNode;
  children: ReactNode;
}

/**
 * Frame for the Section 1 registration/login screens.
 *
 * Mobile: fixed header + one content column capped so form fields never
 * stretch.
 *
 * Desktop (lg+): a real split layout. The left column is a sticky,
 * full-viewport-height brand panel so wide screens never show a short card
 * floating in empty space; the right column is a scrollable form rail
 * (34rem at lg, 36rem at xl) whose header sits in normal flow and whose
 * gutters line up exactly with the header gutters.
 */
export function AuthShell({ title, step, stepCaption, onBack, aside, children }: AuthShellProps) {
  return (
    <div className="min-h-dvh bg-surface pb-safe lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,34rem)] xl:grid-cols-[minmax(0,1fr)_minmax(0,36rem)]">
      {/* Desktop context panel — sticky, exactly one viewport tall */}
      <div className="hidden lg:sticky lg:top-0 lg:block lg:h-dvh lg:self-start lg:overflow-hidden">
        {aside}
      </div>

      {/* Form rail */}
      <div className="flex min-w-0 flex-col lg:min-h-dvh lg:border-l lg:border-outline-variant/40">
        <ScreenHeader title={title} onBack={onBack} trailing={<PortalPill />} position="sticky" />
        <main className="flex w-full flex-1 flex-col gap-space-lg px-gutter pb-space-xl pt-header md:px-gutter-tablet lg:px-gutter-desktop lg:pt-space-xl">
          {step ? <StepProgress step={step} caption={stepCaption} /> : null}
          {children}
        </main>
      </div>
    </div>
  );
}

function PortalPill() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-secondary-container/40 px-space-xs py-1">
      <Icon name="verified" className="text-[16px] text-secondary" />
      <span className="font-label-sm text-label-sm uppercase text-on-secondary-container">Portal</span>
    </span>
  );
}

interface AuthAsidePoint {
  icon: string;
  title: string;
  text: string;
}

interface AuthAsideProps {
  heading: string;
  points: AuthAsidePoint[];
}

/**
 * Desktop context panel: a full-height brand surface (deep primary gradient,
 * decorative light blooms, brand lockup) carrying what this flow does, a
 * sample Lifecode card, and an honest note that this build is a frontend demo
 * (no SMS, email or account is really created).
 *
 * It is only ever rendered inside the lg column of `AuthShell`, so the mobile
 * experience is untouched.
 */
export function AuthAside({ heading, points }: AuthAsideProps) {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-primary via-[#005a86] to-[#013f60] text-on-primary">
      {/* Decorative light blooms */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[26rem] w-[26rem] rounded-full bg-secondary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -right-32 h-[30rem] w-[30rem] rounded-full bg-primary-fixed/25 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_-10%,rgba(255,255,255,0.18),transparent_45%)]"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[38rem] flex-col gap-space-xl overflow-y-auto px-space-xl py-space-xl md:px-space-2xl">
        <LogoBadge variant="stacked" className="self-start" />

        <div className="flex flex-col gap-space-sm">
          <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white lg:text-display-lg">
            {heading}
          </h2>
          <p className="max-w-md font-body-md text-body-md leading-relaxed text-white/75">
            Your oral health history, your Lifecode and your sharing choices — kept together in one
            record you control.
          </p>
        </div>

        <ul className="flex flex-col gap-space-md">
          {points.map((point) => (
            <li key={point.title} className="flex items-start gap-space-sm">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 text-secondary-fixed shadow-sm backdrop-blur-sm">
                <Icon name={point.icon} className="text-[20px]" />
              </span>
              <span className="flex min-w-0 flex-col gap-0.5">
                <span className="font-title-sm text-title-sm font-semibold text-white">
                  {point.title}
                </span>
                <span className="font-body-sm leading-relaxed text-white/70">{point.text}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-col gap-space-sm">
          {/* Sample Lifecode card — brand texture that also states the rule */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-space-md backdrop-blur-sm">
            <div className="flex items-center justify-between gap-space-sm">
              <span className="flex min-w-0 flex-col">
                <span className="font-label-sm uppercase tracking-widest text-secondary-fixed">
                  Oral Lifecode
                </span>
                <span className="truncate font-title-md font-semibold tracking-widest text-white">
                  DHA&nbsp;&middot;&nbsp;4K9C-7T2M
                </span>
              </span>
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-on-surface shadow-sm">
                <Icon name="qr_code_2" className="text-[26px]" />
              </span>
            </div>
            <p className="mt-space-xs font-body-sm leading-relaxed text-white/70">
              An identifier that locates your record — never a password or an access token.
            </p>
          </div>

          <p className="rounded-xl bg-black/25 p-space-sm font-body-sm leading-relaxed text-white/80">
            <Icon name="info" className="mr-1 align-middle text-[16px] text-secondary-fixed" />
            Frontend demo: no real SMS, email or account is created. Nothing you type leaves this
            browser.
          </p>
        </div>
      </div>
    </div>
  );
}
