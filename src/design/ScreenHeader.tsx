import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from './Primitives';

interface ScreenHeaderProps {
  title: string;
  /** Element rendered on the trailing side (e.g. a step pill or avatar). */
  trailing?: ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  /**
   * `fixed` — full-width floating bar for pushed screens (mobile-first).
   * `sticky` — column layout: stays a fixed bar on small screens, then drops
   * into the flow of its own column at lg so it scrolls with the desktop rail
   * instead of spanning the whole viewport.
   */
  position?: 'fixed' | 'sticky';
}

/**
 * App header used by pushed screens (Stitch "Select Your Role" /
 * "About DHA"). 64px tall, safe-area aware.
 */
export function ScreenHeader({
  title,
  trailing,
  showBack = true,
  onBack,
  position = 'fixed',
}: ScreenHeaderProps) {
  const navigate = useNavigate();

  const positionClass =
    position === 'fixed'
      ? 'fixed inset-x-0 top-0'
      : 'fixed inset-x-0 top-0 lg:sticky lg:inset-x-auto lg:top-0';

  return (
    <header
      className={`${positionClass} z-50 pt-safe bg-surface/80 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl`}
    >
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between px-margin md:px-gutter-tablet lg:px-gutter-desktop xl:max-w-[80rem]">
        <div className="flex min-w-0 items-center gap-space-xs">
          {showBack ? (
            <button
              type="button"
              aria-label="Go back"
              onClick={() => (onBack ? onBack() : navigate(-1))}
              className="-ml-space-xs flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full text-on-surface transition-colors hover:bg-surface-container active:scale-95"
            >
              <Icon name="arrow_back" className="text-[24px]" />
            </button>
          ) : null}
          <h1 className="truncate font-headline-sm text-headline-sm text-on-surface">{title}</h1>
        </div>
        {trailing ? <div className="flex shrink-0 items-center">{trailing}</div> : null}
      </div>
    </header>
  );
}
