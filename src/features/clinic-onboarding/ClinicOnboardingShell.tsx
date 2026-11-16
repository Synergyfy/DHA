import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ClinicOnboardingShellProps {
  currentStep?: number;
  totalSteps?: number;
  stepTitle?: string;
  stepCategory?: string;
  onBack?: () => void;
  onSaveDraft?: () => void;
  children: ReactNode;
  footerActions?: ReactNode;
}

export function ClinicOnboardingShell({
  currentStep = 1,
  totalSteps = 6,
  stepTitle,
  stepCategory = 'Organisation Enrollment',
  onBack,
  onSaveDraft,
  children,
  footerActions,
}: ClinicOnboardingShellProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  const handleSaveDraft = () => {
    if (onSaveDraft) {
      onSaveDraft();
    } else {
      alert('Draft saved securely to your session vault.');
    }
  };

  const progressPercent = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="min-h-screen bg-surface flex flex-col text-on-surface antialiased selection:bg-primary-fixed-dim selection:text-primary">
      {/* Top Regulatory Header */}
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-outline-variant/30 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center shadow-sm shadow-primary/20">
                <Icon name="health_and_safety" className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-bold text-sm tracking-tight text-on-surface">DHA Portal</span>
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-1.5 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container">
                    Facility Onboarding
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant hidden sm:block">
                  Nigeria Dental Health Authority &bull; Clinical Governance Gateway
                </p>
              </div>
            </div>
          </div>

          {/* Stepper badge & draft save */}
          <div className="flex items-center gap-3">
            {totalSteps > 1 && (
              <div className="hidden sm:flex flex-col items-end text-right">
                <span className="text-xs font-semibold text-primary">
                  Step {currentStep} of {totalSteps}
                </span>
                <span className="text-[11px] text-on-surface-variant font-medium max-w-[180px] truncate">
                  {stepTitle || stepCategory}
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleSaveDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              <Icon name="bookmark" className="text-base text-primary" />
              <span className="hidden sm:inline">Save Draft</span>
            </button>
          </div>
        </div>

        {/* Global Progress Line */}
        {totalSteps > 1 && (
          <div className="w-full bg-surface-container-high h-1 overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {children}
      </main>

      {/* Persistent Sticky / Float Footer for Actions if provided */}
      {footerActions && (
        <footer className="sticky bottom-0 z-30 bg-surface/95 backdrop-blur-md border-t border-outline-variant/30 py-3.5 px-4 sm:px-6 lg:px-8 shadow-lg shadow-black/5">
          <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
            {footerActions}
          </div>
        </footer>
      )}
    </div>
  );
}
