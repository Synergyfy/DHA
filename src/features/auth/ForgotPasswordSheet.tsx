import { useEffect, useId, useState } from 'react';
import { Button } from '../../design/Button';
import { PasswordField, TextField } from '../../design/Form';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';

const DEMO_CODE = '482913';

type Stage = 'request' | 'code' | 'done';

interface ForgotPasswordSheetProps {
  open: boolean;
  onClose: () => void;
}

/**
 * Bottom-sheet password recovery (Stitch "Forgot Password" flow).
 * Three stages: request a code, enter the code + new password, confirmation.
 * The code is displayed and labelled as a demonstration — no message is sent.
 */
export function ForgotPasswordSheet({ open, onClose }: ForgotPasswordSheetProps) {
  const { showToast } = useToast();
  const [stage, setStage] = useState<Stage>('request');
  const [contact, setContact] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    setStage('request');
    setContact('');
    setCode('');
    setNewPassword('');
    setError('');
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const sendCode = () => {
    if (!contact.trim()) {
      setError('Enter your registered phone number or email.');
      return;
    }
    setError('');
    setStage('code');
    showToast('Demo build — no recovery code was actually sent.');
  };

  const reset = () => {
    if (code !== DEMO_CODE) {
      setError('That code does not match the demonstration code shown above.');
      return;
    }
    if (newPassword.length < 8) {
      setError('Use at least 8 characters for the new password.');
      return;
    }
    setError('');
    setStage('done');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-inverse-surface/40 p-0 backdrop-blur-sm sm:items-center sm:p-space-lg"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[85dvh] w-full max-w-md overflow-y-auto rounded-t-2xl bg-surface-container-lowest p-space-lg shadow-xl sm:max-h-[88dvh] sm:rounded-2xl sm:shadow-2xl"
      >
        <div className="mx-auto mb-space-md h-1.5 w-12 rounded-full bg-surface-container-highest sm:hidden" />

        {stage === 'request' ? (
          <div className="flex flex-col gap-space-md">
            <SheetHeader
              id={titleId}
              icon="lock_reset"
              tone="bg-primary-fixed text-on-primary-fixed"
              title="Reset password"
              subtitle="Secure DHA patient recovery"
              onClose={onClose}
            />
            <p className="font-body-md leading-relaxed text-on-surface-variant">
              Enter your registered phone number or email address. We&apos;ll send a one-time code
              so you can set a new password.
            </p>
            <TextField
              id="recovery-input"
              label="Registered contact"
              icon="contact_mail"
              placeholder="+234 801 234 5678 or patient@example.com"
              value={contact}
              error={error}
              onValueChange={(value) => {
                setContact(value);
                if (error) setError('');
              }}
            />
            <p className="flex items-center gap-2 rounded-lg bg-surface-container p-space-sm font-label-sm text-on-surface-variant">
              <Icon name="verified" filled className="text-[18px] text-secondary" />
              Codes expire after 10 minutes to protect your record.
            </p>
            <Button size="lg" onClick={sendCode} icon={<Icon name="send" className="text-[20px]" />}>
              Send Reset Code
            </Button>
          </div>
        ) : null}

        {stage === 'code' ? (
          <div className="flex flex-col gap-space-md">
            <SheetHeader
              id={titleId}
              icon="key"
              tone="bg-secondary-fixed text-on-secondary-fixed"
              title="Create new password"
              subtitle="Code sent to your verified contact"
              onClose={onClose}
            />

            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg bg-secondary-container/40 p-space-sm text-on-secondary-container">
              <span className="flex items-center gap-2 font-label-md">
                <Icon name="science" className="text-[18px]" />
                Demo code: <strong className="tracking-widest">{DEMO_CODE}</strong>
              </span>
              <button
                type="button"
                className="font-label-sm font-semibold underline"
                onClick={() => setCode(DEMO_CODE)}
              >
                Auto-fill
              </button>
            </div>

            <TextField
              id="reset-code"
              label="6-digit code"
              inputMode="numeric"
              maxLength={6}
              placeholder="••••••"
              value={code}
              onValueChange={(value) => {
                setCode(value.replace(/\D/g, ''));
                if (error) setError('');
              }}
            />

            <PasswordField
              label="New password"
              placeholder="At least 8 characters"
              value={newPassword}
              onValueChange={(value) => {
                setNewPassword(value);
                if (error) setError('');
              }}
            />

            {error ? (
              <p role="alert" className="font-body-sm text-body-sm text-error">
                {error}
              </p>
            ) : null}

            <Button size="lg" onClick={reset} icon={<Icon name="check_circle" className="text-[20px]" />}>
              Reset Password
            </Button>
          </div>
        ) : null}

        {stage === 'done' ? (
          <div className="flex flex-col items-center gap-space-sm py-space-md text-center">
            <span
              id={titleId}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-md"
            >
              <Icon name="task_alt" className="text-[32px]" />
            </span>
            <h3 className="font-headline-sm font-bold text-on-surface">Password updated</h3>
            <p className="font-body-md text-on-surface-variant">
              In this demo your password was not changed anywhere — no account exists behind this
              screen.
            </p>
            <Button size="lg" onClick={onClose} className="mt-2">
              Back to Sign In
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SheetHeader({
  id,
  icon,
  tone,
  title,
  subtitle,
  onClose,
}: {
  id: string;
  icon: string;
  tone: string;
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-space-sm">
      <div className="flex items-center gap-space-xs">
        <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}>
          <Icon name={icon} className="text-[20px]" />
        </span>
        <div>
          <h3 id={id} className="font-headline-sm font-bold text-on-surface">
            {title}
          </h3>
          <p className="font-body-sm text-on-surface-variant">{subtitle}</p>
        </div>
      </div>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface"
      >
        <Icon name="close" className="text-[18px]" />
      </button>
    </div>
  );
}
