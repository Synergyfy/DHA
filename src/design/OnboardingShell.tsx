import type { ReactNode } from 'react';

interface OnboardingShellProps {
  /** Rendered at the very top (logo / step pill row). */
  header: ReactNode;
  children: ReactNode;
}

/**
 * Base frame for the onboarding screens: full-height, safe-area aware,
 * mobile-first single column that expands to a two-column layout on
 * tablet/desktop so the visual and the copy sit side by side instead of
 * stretching a narrow mobile column across a wide screen.
 *
 * Desktop notes:
 * - the content block is vertically centred inside the viewport, so short
 *   slides sit in the middle of the screen rather than pinned to the top;
 * - soft brand blooms sit behind the content (hidden on mobile) so wide
 *   viewports read as a designed surface instead of empty background;
 * - the reading measure is capped so headings and buttons never stretch
 *   across the full width of a 27" display.
 *
 * Mobile padding follows the Stitch gutter (1rem), scaling to the
 * tablet/desktop margins from the token set.
 */
export function OnboardingShell({ header, children }: OnboardingShellProps) {
  return (
    <main className="relative flex min-h-dvh w-full flex-col overflow-hidden bg-surface pb-safe pt-safe">
      {/* Desktop ambience — decorative only, never intercepts pointer events */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute -left-48 top-1/4 h-[34rem] w-[34rem] rounded-full bg-primary-fixed/40 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-secondary-fixed/30 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-surface-container-low/70 to-transparent" />
      </div>

      <div className="relative mx-auto flex w-full max-w-content flex-1 flex-col px-gutter py-space-md md:px-gutter-tablet md:py-margin-tablet lg:px-gutter-desktop lg:py-margin-desktop xl:max-w-[80rem]">
        {header}
        {children}
      </div>
    </main>
  );
}
