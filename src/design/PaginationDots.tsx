interface PaginationDotsProps {
  total: number;
  activeIndex: number;
  /** 'bar' renders the elongated Stitch active dot, 'dot' renders equal dots. */
  variant?: 'bar' | 'dot';
  className?: string;
}

/**
 * Onboarding carousel indicator used across the Stitch welcome screens.
 * `variant="bar"` grows the active pill (welcome + lifecode screens),
 * `variant="dot"` keeps equal dots with the last one stretched (get-started).
 */
export function PaginationDots({
  total,
  activeIndex,
  variant = 'bar',
  className = '',
}: PaginationDotsProps) {
  return (
    <div
      className={`flex items-center justify-center gap-1.5 ${className}`}
      role="tablist"
      aria-label="Onboarding progress"
    >
      {Array.from({ length: total }).map((_, i) => {
        const active = i === activeIndex;
        return (
          <span
            key={i}
            role="tab"
            aria-selected={active}
            aria-label={`Step ${i + 1} of ${total}`}
            className={[
              'h-1.5 rounded-full transition-all duration-300',
              active ? (variant === 'bar' ? 'w-6 bg-primary' : 'w-7 bg-primary') : 'w-1.5 bg-outline-variant',
            ].join(' ')}
          />
        );
      })}
    </div>
  );
}
