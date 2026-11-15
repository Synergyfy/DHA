import type { HTMLAttributes, ReactNode } from 'react';

interface IconProps {
  name: string;
  filled?: boolean;
  className?: string;
}

/** Material Symbols Outlined glyph, matching the Stitch icon system. */
export function Icon({ name, filled = false, className = '' }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={[`material-symbols-outlined ${filled ? 'is-filled' : ''}`, className]
        .filter(Boolean)
        .join(' ')}
    >
      {name}
    </span>
  );
}

type CardTone = 'default' | 'low' | 'high' | 'container';

const tones: Record<CardTone, string> = {
  default: 'bg-surface-container-lowest shadow-sm',
  low: 'bg-surface-container-low shadow-sm',
  high: 'bg-surface-container-high',
  container: 'bg-surface-container shadow-sm',
};

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: CardTone;
  children: ReactNode;
}

/** Standard DHA surface card. */
export function Card({ tone = 'default', className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={['rounded-xl p-space-md', tones[tone], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}

type BadgeTone = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'error';

const badgeTones: Record<BadgeTone, string> = {
  primary: 'bg-primary-fixed text-on-primary-fixed',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
  neutral: 'bg-surface-container text-on-surface-variant',
  error: 'bg-error-container text-on-error-container',
};

interface BadgeProps {
  tone?: BadgeTone;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** Small pill badge — used for status labels such as Verified / Pending. */
export function Badge({ tone = 'neutral', icon, className = '', children }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-space-xs py-[3px]',
        'font-label-sm text-label-sm font-semibold',
        badgeTones[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon}
      {children}
    </span>
  );
}
