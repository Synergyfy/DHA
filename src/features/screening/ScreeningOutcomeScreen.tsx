import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function ScreeningOutcomeScreen() {
  const [outcome, setOutcome] = useState<'no_action' | 'assessment_recommended' | 'urgent'>(
    'assessment_recommended'
  );
  const [cadence, setCadence] = useState<'routine' | 'timely'>('timely');
  const [directReferral, setDirectReferral] = useState(true);

  return (
    <ScreeningShell
      pageTitle="Outcome & Recommendation"
      badgeCode="8.6"
      badgeLabel="Step 5 of 5"
      currentStep={5}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Stepper Header */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Step 5 of 5: Outcome & Triage Recommendation</span>
            </span>
            <span className="text-secondary font-bold">100% Assessed</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full w-full" />
          </div>

          {/* Patient Context Strip */}
          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-primary font-bold">
                <Icon name="badge" className="text-[18px]" />
              </div>
              <div>
                <span className="font-bold text-on-surface block">Zayd Tariq Al-Mansoori (9y)</span>
                <span className="text-on-surface-variant font-mono">
                  Observed: <strong className="text-error font-medium">Suspected decay #54</strong>, Gum redness
                </span>
              </div>
            </div>

            <span className="text-on-surface-variant font-mono">Grade 4B</span>
          </div>
        </section>

        {/* 3 Outcome Radio Cards */}
        <section className="space-y-4">
          <h3 className="font-title-sm text-sm sm:text-base font-bold text-on-surface">
            Select Screening Triage Disposition
          </h3>

          {/* Option 1: No Action */}
          <button
            type="button"
            onClick={() => setOutcome('no_action')}
            className={`w-full p-5 rounded-3xl border text-left transition space-y-2 ${
              outcome === 'no_action'
                ? 'bg-surface-container-lowest border-primary shadow-sm ring-1 ring-primary'
                : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container/40 text-secondary flex items-center justify-center">
                  <Icon name="verified_user" className="text-[22px]" />
                </div>
                <div>
                  <span className="font-title-sm text-sm font-bold text-on-surface block">
                    No Further Action Indicated
                  </span>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    No obvious clinical concern identified. Routine 6-month preventive recare recommended.
                  </p>
                </div>
              </div>
              <Icon
                name={outcome === 'no_action' ? 'radio_button_checked' : 'radio_button_unchecked'}
                className={`text-[20px] ${outcome === 'no_action' ? 'text-primary' : 'text-outline'}`}
              />
            </div>
          </button>

          {/* Option 2: Dental Assessment Recommended (Active) */}
          <div
            className={`p-5 rounded-3xl border transition space-y-4 ${
              outcome === 'assessment_recommended'
                ? 'bg-surface-container-lowest border-primary shadow-sm ring-1 ring-primary'
                : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <div
              className="flex items-start justify-between cursor-pointer"
              onClick={() => setOutcome('assessment_recommended')}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                  <Icon name="assignment_late" className="text-[22px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-title-sm text-sm font-bold text-on-surface">
                      Dental Assessment Recommended
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      Standard Triage
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Patient should be assessed further by an appropriate dentist for clinical diagnosis and treatment.
                  </p>
                </div>
              </div>
              <Icon
                name={outcome === 'assessment_recommended' ? 'radio_button_checked' : 'radio_button_unchecked'}
                className={`text-[20px] ${outcome === 'assessment_recommended' ? 'text-primary' : 'text-outline'}`}
              />
            </div>

            {/* Expanded Options */}
            {outcome === 'assessment_recommended' && (
              <div className="p-4 bg-surface-container-low rounded-2xl space-y-4 text-xs animate-in fade-in duration-150">
                <div className="space-y-1.5">
                  <label className="font-bold text-on-surface block">
                    Primary Reason for Recommendation
                  </label>
                  <select className="w-full h-10 px-3 bg-surface-container-lowest rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option>Suspected Cavitated Tooth Decay (Primary Molar #54)</option>
                    <option>Severe gingival inflammation</option>
                    <option>Traumatic dental injury</option>
                    <option>Orthodontic evaluation</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-on-surface block">Priority Cadence</label>
                  <div className="grid grid-cols-2 gap-2 bg-surface-container p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCadence('routine')}
                      className={`py-2 rounded-lg text-xs font-semibold transition ${
                        cadence === 'routine' ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      Routine (within 30 days)
                    </button>
                    <button
                      type="button"
                      onClick={() => setCadence('timely')}
                      className={`py-2 rounded-lg text-xs font-semibold transition ${
                        cadence === 'timely' ? 'bg-surface-container-lowest text-primary shadow-xs font-bold' : 'text-on-surface-variant'
                      }`}
                    >
                      Timely (within 14 days)
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-secondary-fixed/20 rounded-xl flex items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <span className="font-bold text-on-surface block">
                      Queue for Direct DHA Clinic Referral
                    </span>
                    <span className="text-[11px] text-on-surface-variant">
                      Sends electronic referral token to guardian via Referral gateway.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={directReferral}
                    onChange={(e) => setDirectReferral(e.target.checked)}
                    className="w-4 h-4 text-primary rounded"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Option 3: Urgent Assessment */}
          <button
            type="button"
            onClick={() => setOutcome('urgent')}
            className={`w-full p-5 rounded-3xl border text-left transition space-y-2 ${
              outcome === 'urgent'
                ? 'bg-error-container/20 border-error shadow-sm ring-1 ring-error'
                : 'bg-surface-container-lowest/60 border-outline-variant/30 hover:border-outline-variant'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-error-container text-error flex items-center justify-center">
                  <Icon name="warning" className="text-[22px]" />
                </div>
                <div>
                  <span className="font-title-sm text-sm font-bold text-error block">
                    Urgent Dental Assessment Recommended
                  </span>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Severe pain, swelling, acute trauma, or infection requiring evaluation within 24–48 hours.
                  </p>
                </div>
              </div>
              <Icon
                name={outcome === 'urgent' ? 'radio_button_checked' : 'radio_button_unchecked'}
                className={`text-[20px] ${outcome === 'urgent' ? 'text-error' : 'text-outline'}`}
              />
            </div>
          </button>
        </section>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <NavLink
            to="/screening/assessment"
            className="px-4 py-2.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
          >
            Back to Assessment
          </NavLink>

          <NavLink
            to="/screening/review"
            className="px-6 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
          >
            <span>Review & Finalize</span>
            <Icon name="arrow_forward" className="text-[16px]" />
          </NavLink>
        </div>
      </div>
    </ScreeningShell>
  );
}

export default ScreeningOutcomeScreen;

