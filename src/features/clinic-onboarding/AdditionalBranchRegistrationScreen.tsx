import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function AdditionalBranchRegistrationScreen() {
  const navigate = useNavigate();
  const [strategy, setStrategy] = useState<'register_now' | 'defer_single'>('register_now');

  const handlePrimaryAction = () => {
    if (strategy === 'register_now') {
      navigate('/clinic-onboarding/branch-details');
    } else {
      navigate('/clinic-onboarding/professional-invitation');
    }
  };

  const handleSkip = () => {
    navigate('/clinic-onboarding/professional-invitation');
  };

  return (
    <ClinicOnboardingShell
      currentStep={12}
      totalSteps={18}
      stepTitle="Additional Clinic Branches"
      stepCategory="Facility Hierarchy"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Gateway Title */}
        <div className="text-left">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-2">
            <span>DHA SEC 15.12</span> &bull; <span>Multi-Site Practice Hierarchy</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-on-surface tracking-tight">
            Does your organisation operate additional clinic locations?
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            You have registered <strong className="text-on-surface">Greenfield Dental Clinic — Wuse 2 Main Branch</strong> as your Primary Practice Site. You can register satellite branches, specialty dental suites, or mobile dental units now or anytime post-verification.
          </p>
        </div>

        {/* Current Registered Facility Summary Card */}
        <section className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
          <div className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-primary-fixed text-primary">
                  HQ CODE #001
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                  <Icon name="verified" className="text-xs" /> Verified Primary
                </span>
              </div>
              <h3 className="font-heading font-bold text-base text-on-surface">
                Greenfield Dental Clinic — Wuse 2 Main Branch
              </h3>
              <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                <Icon name="location_on" className="text-sm text-primary" />
                14 Aminu Kano Crescent, Wuse 2, Abuja
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-on-surface bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/30">
              <Icon name="dentistry" className="text-primary text-base" />
              <span className="font-semibold">4 Certified Operatory Suites</span>
            </div>
          </div>
        </section>

        {/* Visual Banner Accent */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-primary to-primary-container p-6 text-white shadow-md">
          <div className="max-w-md space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/20">
              Multi-Clinic Unified Portal
            </span>
            <h3 className="text-lg font-heading font-bold">Synchronised Clinical Governance &amp; Staff Rosters</h3>
            <p className="text-xs text-white/90 leading-relaxed">
              Link satellite operatory clinics under one corporate health ID with shared patient records, unified billing, and centralized referral routing.
            </p>
          </div>
        </div>

        {/* Decision Cards (Option A & Option B) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A */}
          <div
            onClick={() => setStrategy('register_now')}
            className={`cursor-pointer rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              strategy === 'register_now'
                ? 'border-primary bg-surface-container-lowest shadow-md ring-4 ring-primary/10'
                : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Recommended
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    strategy === 'register_now' ? 'border-primary bg-primary text-white' : 'border-outline-variant'
                  }`}
                >
                  {strategy === 'register_now' && <Icon name="check" className="text-sm font-bold" />}
                </div>
              </div>
              <h3 className="font-heading font-bold text-base text-on-surface">
                Register Additional Branch Now
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Add secondary physical practice locations (Garki, Maitama, Jabi clinics), assign branch leads, configure operatory suites, and schedule municipal inspections.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-outline-variant/30 flex items-center gap-1.5 text-xs text-primary font-semibold">
              <Icon name="add_business" className="text-base" />
              <span>Multi-site health licensing enabled</span>
            </div>
          </div>

          {/* Option B */}
          <div
            onClick={() => setStrategy('defer_single')}
            className={`cursor-pointer rounded-2xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between ${
              strategy === 'defer_single'
                ? 'border-primary bg-surface-container-lowest shadow-md ring-4 ring-primary/10'
                : 'border-outline-variant/40 bg-surface-container-low hover:border-outline-variant'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] uppercase font-bold tracking-wider text-on-surface-variant bg-surface-container px-2 py-0.5 rounded">
                  Solo Practice Site
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    strategy === 'defer_single' ? 'border-primary bg-primary text-white' : 'border-outline-variant'
                  }`}
                >
                  {strategy === 'defer_single' && <Icon name="check" className="text-sm font-bold" />}
                </div>
              </div>
              <h3 className="font-heading font-bold text-base text-on-surface">
                Do This Later / Single Location
              </h3>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                Proceed straight to professional &amp; clinical staff invitations. You can register new satellite branches anytime from your Clinic Onboarding Management portal.
              </p>
            </div>
            <div className="pt-4 mt-3 border-t border-outline-variant/30 flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <Icon name="arrow_forward" className="text-base" />
              <span>Immediate practitioner credentialing</span>
            </div>
          </div>
        </div>

        {/* Regulatory Rule Advisory */}
        <div className="p-4 rounded-xl bg-error-container/40 border border-error/20 flex items-start gap-3">
          <Icon name="verified_user" className="text-error text-xl shrink-0 mt-0.5" />
          <div className="text-xs text-on-surface-variant leading-relaxed">
            <strong className="text-error font-semibold block mb-0.5">Important DHA Branch Inspection Rule:</strong>
            Parent organisation verification establishes corporate legitimacy, but each physical branch requires individual municipal health inspection and branch operating approval before receiving patient bookings.
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/document-review')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back to Document Review
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSkip}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-surface-container text-primary text-xs sm:text-sm font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center gap-1.5"
            >
              <Icon name="group_add" className="text-base" />
              <span>Skip to Staff Invitations (15.15)</span>
            </button>

            <button
              type="button"
              onClick={handlePrimaryAction}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span>
                {strategy === 'register_now'
                  ? 'Continue to Branch Registration (15.13)'
                  : 'Confirm Solo Branch & Continue (15.15)'}
              </span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
