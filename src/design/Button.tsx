import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'neutral' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'bg-primary text-on-primary shadow-sm active:bg-primary-container hover:bg-primary-container',
  secondary:
    'bg-secondary text-on-secondary shadow-sm active:opacity-90 hover:opacity-90',
  tertiary:
    'bg-tertiary text-on-tertiary shadow-sm active:bg-tertiary-container hover:bg-tertiary-container',
  neutral:
    'bg-surface-container-lowest text-on-surface shadow-sm hover:bg-surface-container-low active:bg-surface-container',
  ghost: 'bg-transparent text-primary hover:bg-surface-container-low active:bg-surface-container',
};

type Size = 'lg' | 'md' | 'sm';

const sizes: Record<Size, string> = {
  lg: 'h-12 text-title-md font-title-md',
  md: 'h-11 text-title-sm font-title-sm',
  sm: 'h-10 text-title-sm font-title-sm',
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

/**
 * DHA primary form/action button.
 * Visuals follow the Stitch reference: 12/16px radius, title typography,
 * subtle shadow, pressed state on the container colour.
 */
export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'right',
  fullWidth = true,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 font-semibold',
        'transition-all duration-150 active:scale-[0.99] disabled:pointer-events-none disabled:opacity-60',
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {icon && iconPosition === 'left' ? icon : null}
      <span>{children}</span>
      {icon && iconPosition === 'right' ? icon : null}
    </button>
  );
}
