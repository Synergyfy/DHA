interface StepProgressProps {
  /** 1-based current step. */
  step: number;
  total?: number;
  /** Optional line shown under the bar (e.g. "Account creation & contact verification"). */
  caption?: string;
  align?: 'left' | 'center';
}

/**
 * Registration progress indicator (Stitch "Step X of 5" track).
 * Used by every screen in the Section 1 flow so the patient always knows
 * how much of registration is left.
 */
export function StepProgress({ step, total = 5, caption, align = 'left' }: StepProgressProps) {
  const pct = Math.round((step / total) * 100);

  return (
    <div className="flex flex-col gap-space-2xs">
      <div
        className={[
          'flex items-center justify-between',
          align === 'center' ? 'text-center' : '',
        ].join(' ')}
      >
        <span className="font-label-md text-label-md font-semibold uppercase tracking-wide text-primary">
          Step {step} of {total}
        </span>
        <span className="font-label-sm text-label-sm text-on-surface-variant">{pct}% complete</span>
      </div>
      <div
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Registration step ${step} of ${total}`}
        className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high"
      >
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption ? (
        <p className="font-label-sm text-label-sm text-on-surface-variant">{caption}</p>
      ) : null}
    </div>
  );
}
