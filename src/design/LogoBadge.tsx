import { Icon } from './Primitives';

type Variant = 'pill' | 'stacked';

interface LogoBadgeProps {
  variant?: Variant;
  className?: string;
}

/**
 * DHA brand mark used in the onboarding headers.
 * `pill` — compact capsule (welcome screen), `stacked` — two-line lockup.
 */
export function LogoBadge({ variant = 'pill', className = '' }: LogoBadgeProps) {
  if (variant === 'stacked') {
    return (
      <div
        className={`flex items-center gap-space-xs rounded-full bg-surface-container px-3 py-1.5 shadow-sm ${className}`}
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-on-primary">
          <Icon name="health_and_safety" filled className="text-[16px]" />
        </span>
        <span className="flex flex-col">
          <span className="font-headline-sm text-label-sm uppercase leading-none tracking-tight text-primary">
            DHA Oral Health
          </span>
          <span className="font-label-sm text-[9px] uppercase leading-none tracking-wider text-on-surface-variant">
            Dental Health App
          </span>
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-space-xs rounded-lg bg-primary/10 p-space-xs ${className}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg text-primary">
        <Icon name="shield_with_heart" filled className="text-[20px]" />
      </span>
      <span className="flex flex-col">
        <span className="font-headline-sm text-body-sm font-bold leading-tight tracking-tight text-on-surface">
          DHA Care
        </span>
        <span className="font-label-sm text-label-sm text-outline">Dental Health App</span>
      </span>
    </div>
  );
}
