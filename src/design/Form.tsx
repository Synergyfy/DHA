import { useId, useState, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from 'react';
import { Icon } from './Primitives';

const inputBase =
  'h-12 lg:h-[52px] w-full rounded-xl bg-surface-container-lowest px-4 font-body-md text-sm lg:text-[15px] text-on-surface ' +
  'shadow-xs outline-none transition-all placeholder:text-outline-variant border border-outline-variant/30 focus:border-primary/50 focus:bg-surface-container-low/60 focus:ring-2 focus:ring-primary/20';

interface FieldProps {
  label?: ReactNode;
  /** Right-aligned helper shown next to the label (e.g. "Optional"). */
  labelAside?: ReactNode;
  hint?: string;
  error?: string;
  requiredMark?: boolean;
  children: ReactNode;
}

/** Label + control + hint/error wrapper shared by every registration field. */
export function Field({ label, labelAside, hint, error, requiredMark, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-space-2xs">
      {label ? (
        <div className="flex items-center justify-between gap-2">
          <label className="font-title-sm text-title-sm text-on-surface">
            {label}
            {requiredMark ? <span className="text-error"> *</span> : null}
          </label>
          {labelAside ? (
            <span className="font-label-sm text-label-sm text-outline">{labelAside}</span>
          ) : null}
        </div>
      ) : null}
      {children}
      {error ? (
        <p role="alert" className="font-body-sm text-body-sm text-error">
          {error}
        </p>
      ) : hint ? (
        <p className="font-body-sm text-body-sm text-on-surface-variant">{hint}</p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label?: ReactNode;
  labelAside?: ReactNode;
  hint?: string;
  error?: string;
  icon?: string;
  /** Element pinned to the right of the field (e.g. a validity tick). */
  trailing?: ReactNode;
  onValueChange: (value: string) => void;
}

/** Standard outlined text input with optional leading icon. */
export function TextField({
  label,
  labelAside,
  hint,
  error,
  icon,
  trailing,
  onValueChange,
  className = '',
  ...rest
}: TextFieldProps) {
  return (
    <Field label={label} labelAside={labelAside} hint={hint} error={error} requiredMark={rest.required}>
      <div className="relative">
        {icon ? (
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant">
            <Icon name={icon} className="text-[20px]" />
          </span>
        ) : null}
        <input
          className={[
            inputBase,
            icon ? 'pl-11' : '',
            trailing ? 'pr-11' : '',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          onChange={(event) => onValueChange(event.target.value)}
          {...rest}
        />
        {trailing ? (
          <span className="pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center">
            {trailing}
          </span>
        ) : null}
      </div>
    </Field>
  );
}

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange' | 'value'> {
  label?: ReactNode;
  labelAside?: ReactNode;
  hint?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value: string;
  onValueChange: (value: string) => void;
}

/** Native select styled to the Stitch field pattern (chevron pinned right). */
export function SelectField({
  label,
  labelAside,
  hint,
  error,
  placeholder,
  options,
  value,
  onValueChange,
  className = '',
  ...rest
}: SelectFieldProps) {
  return (
    <Field label={label} labelAside={labelAside} hint={hint} error={error} requiredMark={rest.required}>
      <div className="relative">
        <select
          className={[inputBase, 'cursor-pointer appearance-none pr-10', className]
            .filter(Boolean)
            .join(' ')}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-outline">
          <Icon name="expand_more" className="text-[20px]" />
        </span>
      </div>
    </Field>
  );
}

interface PasswordFieldProps {
  id?: string;
  label?: ReactNode;
  labelAside?: ReactNode;
  hint?: string;
  error?: string;
  placeholder?: string;
  autoComplete?: string;
  value: string;
  onValueChange: (value: string) => void;
}

/** Password input with the visibility toggle from the Stitch forms. */
export function PasswordField({
  id,
  label,
  labelAside,
  hint,
  error,
  placeholder = '••••••••••••',
  autoComplete = 'new-password',
  value,
  onValueChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <Field label={label} labelAside={labelAside} hint={hint} error={error}>
      <div className="relative">
        <input
          id={inputId}
          type={visible ? 'text' : 'password'}
          className={[inputBase, 'pl-3.5 pr-12'].join(' ')}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          aria-pressed={visible}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-on-surface-variant transition-colors hover:text-primary"
        >
          <Icon name={visible ? 'visibility_off' : 'visibility'} className="text-[20px]" />
        </button>
      </div>
    </Field>
  );
}

interface SegmentedOption<T extends string> {
  value: T;
  label: string;
  icon: string;
}

interface SegmentedControlProps<T extends string> {
  ariaLabel: string;
  options: SegmentedOption<T>[];
  value: T;
  onValueChange: (value: T) => void;
}

/** Pill segmented switch (Stitch "Primary Verification Route" tabs). */
export function SegmentedControl<T extends string>({
  ariaLabel,
  options,
  value,
  onValueChange,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="flex items-center gap-1 rounded-xl bg-surface-container-low p-1"
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onValueChange(option.value)}
            className={[
              'flex flex-1 items-center justify-center gap-1 rounded-lg px-2 py-2',
              'font-label-md text-label-md font-semibold transition-all',
              selected
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface',
            ].join(' ')}
          >
            <Icon name={option.icon} className="text-[16px]" />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
