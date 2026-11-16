import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function ReviewSubmitScreeningScreen() {
  const [simState, setSimState] = useState<'valid' | 'offline' | 'incomplete'>('valid');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedHash, setSubmittedHash] = useState<string | null>(null);

  const handleSubmit = () => {
    if (simState === 'incomplete') return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedHash('DHA-REG-9F82A4-2025');
    }, 1200);
  };

  return (
    <ScreeningShell
      pageTitle="Review & Submit Official Record"
      badgeCode="8.7"
      badgeLabel="Final Commit"
      currentStep={5}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Subtitle Context Banner */}
        <div className="flex items-center justify-between text-xs text-on-surface-variant px-1">
          <div className="flex items-center gap-1.5">
            <Icon name="verified_user" className="text-primary text-[18px]" />
            <span>Final statutory verification before committing official screening record</span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-surface-container font-mono text-[11px] font-bold">
            Step 5 of 5
          </span>
        </div>

        {/* Patient Identity Anchor Card */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary font-extrabold flex items-center justify-center text-base shrink-0">
              ZT
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                  Zayd Tariq Al-Mansoori
                </h2>
                <Icon name="verified" className="text-secondary text-[16px]" />
              </div>
              <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                DHA-P-49102 · Age 9y (Male) · Grade 4B
              </div>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold shrink-0">
            Active Record
          </span>
        </section>

        {/* Validation Checklist Status Card */}
        <section className={`p-5 rounded-3xl transition border ${
          simState === 'valid'
            ? 'bg-secondary-container/20 border-secondary/40'
            : simState === 'offline'
            ? 'bg-amber-50 border-amber-300'
            : 'bg-error-container/30 border-error/30'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Icon
                name={simState === 'valid' ? 'check_circle' : simState === 'offline' ? 'wifi_off' : 'cancel'}
                className={`text-[20px] ${
                  simState === 'valid' ? 'text-secondary' : simState === 'offline' ? 'text-amber-800' : 'text-error'
                }`}
              />
              <span className="font-title-sm text-sm font-bold text-on-surface">
                {simState === 'valid'
                  ? 'Ready for Submission (All criteria satisfied)'
                  : simState === 'offline'
                  ? 'Offline Mode (Local Encrypted Cache)'
                  : 'Validation Incomplete (Missing Consent)'}
              </span>
            </div>

            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-container-lowest">
              {simState === 'valid' ? '4/4 Valid' : simState === 'offline' ? 'Queued' : '3/4 Incomplete'}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <Icon name="check" className="text-secondary text-[16px]" />
              <span>Patient Confirmed</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <Icon
                name={simState === 'incomplete' ? 'close' : 'check'}
                className={simState === 'incomplete' ? 'text-error text-[16px]' : 'text-secondary text-[16px]'}
              />
              <span>Consent Logged</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <Icon name="check" className="text-secondary text-[16px]" />
              <span>Findings Recorded</span>
            </div>
            <div className="flex items-center gap-1.5 text-on-surface font-medium">
              <Icon name="check" className="text-secondary text-[16px]" />
              <span>Outcome Assigned</span>
            </div>
          </div>
        </section>

        {/* Audit Simulator */}
        <div className="p-3 bg-surface-container rounded-2xl flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-on-surface-variant font-semibold flex items-center gap-1">
            <Icon name="bug_report" className="text-[14px]" />
            <span>Screening Lifecycle Simulator:</span>
          </span>
          <div className="flex gap-1.5">
            <button
              type="button"
              onClick={() => setSimState('valid')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                simState === 'valid' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'
              }`}
            >
              Ready
            </button>
            <button
              type="button"
              onClick={() => setSimState('offline')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                simState === 'offline' ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest text-on-surface'
              }`}
            >
              Offline Gateway
            </button>
            <button
              type="button"
              onClick={() => setSimState('incomplete')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                simState === 'incomplete' ? 'bg-error text-on-error' : 'bg-surface-container-lowest text-on-surface'
              }`}
            >
              Incomplete
            </button>
          </div>
        </div>

        {/* 5 Summary Review Sections */}
        <div className="space-y-4 text-xs">
          {/* Section 1: Context */}
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <Icon name="school" className="text-primary text-[18px]" />
                <span>1. Programme & Station Context</span>
              </div>
              <NavLink to="/screening/dashboard" className="text-primary font-bold hover:underline">
                Edit
              </NavLink>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-on-surface-variant">
              <div>Programme: <strong className="text-on-surface">Al Wasl Model Girls School – Grade 4 Outreach</strong></div>
              <div>Station: <strong className="text-on-surface">Room 12, School Clinic</strong></div>
              <div>Licensed Screener: <strong className="text-on-surface">Dr. Sarah Al-Mansoor (#SC-8921)</strong></div>
              <div>Timestamp: <strong className="text-on-surface">16 Feb 2025, 10:45 AM GST</strong></div>
            </div>
          </div>

          {/* Section 2: Complaints */}
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <Icon name="personal_injury" className="text-primary text-[18px]" />
                <span>2. Patient-Reported Complaints</span>
              </div>
              <NavLink to="/screening/start" className="text-primary font-bold hover:underline">
                Edit
              </NavLink>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-error-container/40 text-on-error-container font-semibold">
                Toothache (Moderate, 2–3 weeks)
              </span>
              <span className="px-3 py-1 rounded-xl bg-surface-container text-on-surface-variant font-medium">
                Gum bleeding on brushing
              </span>
              <span className="px-3 py-1 rounded-xl bg-surface-container text-on-surface-variant font-medium">
                Discomfort eating crunchy foods
              </span>
            </div>
          </div>

          {/* Section 3: Screener Observations */}
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <Icon name="dentistry" className="text-primary text-[18px]" />
                <span>3. Screener Observations</span>
              </div>
              <NavLink to="/screening/assessment" className="text-primary font-bold hover:underline">
                Edit
              </NavLink>
            </div>
            <div className="p-3 bg-surface-container-low rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container font-mono font-bold flex flex-col items-center justify-center text-xs">
                <span>#54</span>
              </div>
              <div>
                <span className="font-bold text-on-surface block">Primary Upper Right 1st Molar</span>
                <span className="text-error font-medium">Suspected cavitation / visible decay (ICDAS 3/4)</span>
              </div>
            </div>
            <p className="text-on-surface-variant italic p-2 bg-surface-container-low rounded-xl">
              “Advised student on gentle circular brushing and interdental routine. Suspected primary molar deep lesion; requested prompt guardian follow-up.”
            </p>
          </div>

          {/* Section 4: Outcome & Action Plan */}
          <div className="p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
            <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
              <div className="flex items-center gap-2 font-bold text-sm text-on-surface">
                <Icon name="assignment_turned_in" className="text-primary text-[18px]" />
                <span>4. Outcome & Action Plan</span>
              </div>
              <NavLink to="/screening/outcome" className="text-primary font-bold hover:underline">
                Edit
              </NavLink>
            </div>
            <div className="flex items-center justify-between p-3 bg-surface-container-low rounded-2xl">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold">
                Dental Assessment Recommended
              </span>
              <span className="font-semibold text-on-surface">Target: Within 14 days</span>
            </div>
            <p className="text-on-surface font-medium pt-1">
              Referral Action: Consult with Paediatric Dentist for diagnostic radiographs and operative care plan.
            </p>
          </div>
        </div>

        {/* Submission Result Success */}
        {submittedHash && (
          <div className="p-5 rounded-3xl bg-secondary-container text-on-secondary-container border border-secondary shadow-md space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon name="check_circle" className="text-secondary text-[24px]" />
              <strong className="font-bold text-sm">Screening Officially Registered & Sealed</strong>
            </div>
            <p>
              Cryptographic ledger digest generated: <span className="font-mono font-bold">{submittedHash}</span>.
              Direct electronic referral queued for guardian Sarah Al-Mansoor via Referral gateway.
            </p>
          </div>
        )}

        {/* Submit & Action Controls */}
        <div className="p-4 sm:p-5 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <NavLink
            to="/screening/outcome"
            className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition text-center"
          >
            Back to Outcome
          </NavLink>

          <button
            type="button"
            disabled={simState === 'incomplete' || isSubmitting}
            onClick={handleSubmit}
            className={`px-8 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-md ${
              simState === 'incomplete'
                ? 'bg-surface-container text-on-surface-variant cursor-not-allowed'
                : 'bg-primary text-on-primary hover:bg-primary/90 active:scale-98'
            }`}
          >
            <Icon name={isSubmitting ? 'sync' : 'lock'} className={`text-[18px] ${isSubmitting ? 'animate-spin' : ''}`} />
            <span>
              {isSubmitting
                ? 'Committing to DHA Nabidh...'
                : simState === 'offline'
                ? 'Save Encrypted Offline Record'
                : 'Submit Official Screening'}
            </span>
          </button>
        </div>
      </div>
    </ScreeningShell>
  );
}

export default ReviewSubmitScreeningScreen;

