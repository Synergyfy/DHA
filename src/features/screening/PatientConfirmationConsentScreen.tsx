import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function PatientConfirmationConsentScreen() {
  const [photoConsent, setPhotoConsent] = useState(true);
  const [simulatorState, setSimulatorState] = useState<'valid' | 'pending' | 'declined'>('valid');

  return (
    <ScreeningShell
      pageTitle="Patient Confirmation & Consent"
      badgeCode="8.3"
      badgeLabel="Step 2 of 5"
      currentStep={2}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Progress Stepper Ribbon */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Step 2 of 5: Consent & Verification</span>
            </span>
            <span className="text-on-surface-variant font-mono">DHA Statutory Compliance</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full w-2/5" />
          </div>

          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center gap-3 text-xs">
            <Icon name="verified_user" className="text-secondary text-[20px] shrink-0" />
            <p className="text-on-surface-variant leading-relaxed">
              <strong className="text-on-surface font-semibold">Mandatory Legal Requirement:</strong> Physical oral inspection cannot commence without verified guardian consent.
            </p>
          </div>
        </section>

        {/* Patient Identity Card */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-surface-container-high ring-2 ring-primary/20">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBglZZMQ_An0n9f9K2SPaHl8d2XE7EoDbdn1Xq_LzTnGCqxGykSRmBvUFflkSck2YPK6LA_0DzcotpXOuy6UQQO0tOlrCap3UeL7yv0SQGNmB6L_dpDSLG9pWcKWgl_N9vvl1f41_68qhcY1v5yCQjYE_48btr1ZF01qzOuzb3ME21FIrx--FLkLuy6jBomQQLSicA-AQEXj7xWXKijYbL72ZMXv4R8bZUsy8piTYdt"
                    alt="Zayd Tariq Al-Mansoori"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-secondary text-on-secondary rounded-full flex items-center justify-center text-[10px] ring-2 ring-surface-container-lowest">
                  <Icon name="check" className="text-[12px]" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                    Zayd Tariq Al-Mansoori
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                    Identity Confirmed
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-on-surface-variant font-mono">
                  <div>DHA ID: <strong className="text-on-surface font-sans">DHA-P-49102</strong></div>
                  <div>Lifecode: <strong className="text-primary font-sans">DHA-LC-8841-A</strong></div>
                  <div>Age: <strong className="text-on-surface font-sans">9Y (14 Aug 2015)</strong></div>
                  <div>Sex: <strong className="text-on-surface font-sans">Male</strong></div>
                </div>
              </div>
            </div>

            <NavLink
              to="/screening/identification"
              className="text-xs font-semibold text-primary hover:underline self-start sm:self-auto"
            >
              Switch Student
            </NavLink>
          </div>

          {/* Linked Guardian Box */}
          <div className="p-3.5 bg-surface-container-low rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <Icon name="supervisor_account" className="text-[18px]" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                  Linked Legal Guardian
                </span>
                <span className="font-bold text-on-surface">Sarah Al-Mansoor (Mother)</span>
              </div>
            </div>

            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary text-[11px] font-bold hidden sm:inline-flex items-center gap-1">
              <Icon name="verified" className="text-[13px]" />
              <span>UAE PASS Verified</span>
            </span>
          </div>
        </section>

        {/* Previous Screening Reference */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-title-sm text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="history_edu" className="text-primary text-[18px]" />
              <span>Previous Screening Reference</span>
            </h4>
            <span className="text-[11px] text-on-surface-variant font-mono">12 Jan 2024 (Grade 3)</span>
          </div>

          <div className="p-4 bg-surface-container-low rounded-2xl space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-on-surface">Outcome: No Further Action Indicated</span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-secondary font-bold text-[10px]">
                Resolved
              </span>
            </div>
            <p className="text-on-surface-variant italic">
              “Mild plaque visible on lower anterior incisors. Good oral hygiene score. Brushing demonstration provided.”
            </p>
          </div>
        </section>

        {/* Consent Management Section */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-title-sm text-sm sm:text-base font-bold text-on-surface flex items-center gap-2">
              <Icon name="assignment_turned_in" className="text-primary text-[20px]" />
              <span>Consent Verification Matrix</span>
            </h4>

            {simulatorState === 'valid' && (
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center gap-1">
                <Icon name="verified" className="text-[14px]" />
                <span>All Consents Valid</span>
              </span>
            )}
            {simulatorState === 'pending' && (
              <span className="px-3 py-1 rounded-full bg-surface-container text-primary text-xs font-bold flex items-center gap-1">
                <Icon name="hourglass_empty" className="text-[14px]" />
                <span>Verification Pending</span>
              </span>
            )}
            {simulatorState === 'declined' && (
              <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container text-xs font-bold flex items-center gap-1">
                <Icon name="cancel" className="text-[14px]" />
                <span>Consent Declined</span>
              </span>
            )}
          </div>

          {/* 1. Mandatory Oral Screening */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              simulatorState === 'declined' ? 'bg-error text-on-error' : 'bg-secondary text-on-secondary'
            }`}>
              <Icon name={simulatorState === 'declined' ? 'close' : 'check'} className="text-[16px]" />
            </div>
            <div className="flex-1 min-w-0 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-on-surface font-bold text-sm">1. Oral Health Screening</strong>
                <span className={`font-bold ${simulatorState === 'declined' ? 'text-error' : 'text-secondary'}`}>
                  {simulatorState === 'declined' ? 'Declined' : 'Obtained'}
                </span>
              </div>
              <p className="text-on-surface-variant">
                School Pre-Session Digital Consent verified via KHDA Parent Portal.
              </p>
            </div>
          </div>

          {/* 2. Mandatory DHA Record Maintenance */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
              simulatorState === 'declined' ? 'bg-error text-on-error' : 'bg-secondary text-on-secondary'
            }`}>
              <Icon name={simulatorState === 'declined' ? 'close' : 'check'} className="text-[16px]" />
            </div>
            <div className="flex-1 min-w-0 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <strong className="text-on-surface font-bold text-sm">2. Maintenance of DHA Record</strong>
                <span className={`font-bold ${simulatorState === 'declined' ? 'text-error' : 'text-secondary'}`}>
                  {simulatorState === 'declined' ? 'Declined' : 'Obtained'}
                </span>
              </div>
              <p className="text-on-surface-variant">
                Statutory clinical record inclusion in the national Nabidh Digital Health network.
              </p>
            </div>
          </div>

          {/* 3. Optional Clinical Photographs */}
          <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between gap-3">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <strong className="text-on-surface font-bold text-sm">3. Clinical Photographs</strong>
                <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-mono text-[10px]">
                  Optional
                </span>
              </div>
              <p className="text-on-surface-variant">
                Allows non-diagnostic clinical photos of teeth and gums to accompany specialist consultation references.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setPhotoConsent(!photoConsent)}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors shrink-0 ${
                photoConsent ? 'bg-primary' : 'bg-surface-container-high'
              }`}
            >
              <div className={`w-6 h-6 rounded-full bg-white shadow-sm transition-transform ${
                photoConsent ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Simulation Testing Tool */}
          <div className="p-3 bg-surface-container rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-on-surface-variant font-semibold flex items-center gap-1">
              <Icon name="tune" className="text-[14px]" />
              <span>Audit Simulator:</span>
            </span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => setSimulatorState('valid')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  simulatorState === 'valid' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'
                }`}
              >
                All Valid
              </button>
              <button
                type="button"
                onClick={() => setSimulatorState('pending')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  simulatorState === 'pending' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'
                }`}
              >
                Pending
              </button>
              <button
                type="button"
                onClick={() => setSimulatorState('declined')}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                  simulatorState === 'declined' ? 'bg-error text-on-error' : 'bg-surface-container-lowest text-on-surface'
                }`}
              >
                Declined
              </button>
            </div>
          </div>

          {simulatorState === 'declined' && (
            <div className="p-4 rounded-2xl bg-error-container text-on-error-container text-xs flex items-start gap-2">
              <Icon name="gpp_bad" className="text-error text-[20px] shrink-0 mt-0.5" />
              <div>
                <strong className="text-error block font-bold">Inspection Blocked by Law</strong>
                <p>
                  Screening cannot commence without legal guardian consent. Log deferral in school administration ledger.
                </p>
              </div>
            </div>
          )}

          {/* Navigation Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <NavLink
              to="/screening/identification"
              className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
            >
              Cancel / Back
            </NavLink>

            <NavLink
              to={simulatorState === 'declined' ? '#' : '/screening/start'}
              className={`px-6 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                simulatorState === 'declined'
                  ? 'bg-surface-container text-on-surface-variant cursor-not-allowed opacity-50'
                  : 'bg-primary text-on-primary hover:bg-primary/90 shadow-xs'
              }`}
            >
              <span>Proceed to Assessment</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </ScreeningShell>
  );
}

export default PatientConfirmationConsentScreen;

