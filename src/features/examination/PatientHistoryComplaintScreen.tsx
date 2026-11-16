import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function PatientHistoryComplaintScreen() {
  const navigate = useNavigate();
  const [showAddConditionModal, setShowAddConditionModal] = useState(false);
  const [newCondition, setNewCondition] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddCondition = () => {
    if (!newCondition.trim()) return;
    setShowAddConditionModal(false);
    setToastMessage(`Added condition: ${newCondition}`);
    setNewCondition('');
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <ExaminationShell
      pageTitle="Patient History & Presenting Complaint"
      badgeCode="10.5"
      badgeLabel="Module 1 of 8"
      currentStep="Module 1: Intake & Medical Screening"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Workflow Progress Micro-Bar */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Module 1 of 8 • DHA Section 10</span>
            <span className="font-bold text-secondary">12% PROGRESS</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden flex">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: '12.5%' }} />
          </div>
        </section>

        {/* Legal Audit Trail Clinical Banner */}
        <div className="bg-surface-container-low rounded-xl p-3 flex items-start gap-2.5 text-xs text-on-surface-variant border border-outline-variant/30">
          <Icon name="verified_user" className="text-primary text-base shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            Patient-Reported information is strictly distinguished from clinician-verified medical history for legal audit trails in conformity with DHA Clinical Regulation Directive 2024.
          </p>
        </div>

        {/* Focus Quadrant Anchor */}
        <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm border border-outline-variant/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center shrink-0">
              <Icon name="dentistry" className="text-base" />
            </div>
            <div>
              <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Chief Focus Quadrant</p>
              <p className="text-xs sm:text-sm font-bold text-primary">UR Maxillary (Teeth 14-18)</p>
            </div>
          </div>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full font-mono text-xs font-bold">
            Q1 • Active
          </span>
        </div>

        {/* Section A: Presenting Complaint */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-4 rounded-full bg-primary" />
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Section A: Presenting Complaint</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-surface-container text-on-surface-variant px-2.5 py-0.5 rounded-full">
              Dual Intake
            </span>
          </div>

          {/* Chief Symptom */}
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Chief Symptom Description</span>
            <div className="flex items-center gap-2">
              <Icon name="emergency" className="text-primary text-xl shrink-0" />
              <p className="text-sm sm:text-base font-bold text-on-surface">
                Toothache & cold sensitivity in upper right molar area
              </p>
            </div>
          </div>

          {/* Metrics: Duration & Pain VAS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col justify-between">
              <span className="text-on-surface-variant font-medium">Duration & Onset</span>
              <span className="text-base font-bold text-on-surface mt-1">2-3 weeks</span>
              <span className="text-outline text-[11px]">Gradual onset • No recent trauma</span>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-on-surface-variant font-medium">Pain VAS Score</span>
                <span className="bg-primary text-on-primary font-mono text-xs px-2 py-0.5 rounded font-bold">
                  5 / 10
                </span>
              </div>
              <div className="w-full bg-surface-container rounded-full h-2 mt-2 overflow-hidden flex">
                <div className="bg-primary h-full w-[50%] rounded-full" />
              </div>
              <span className="text-on-surface-variant text-[11px] mt-1">Moderate • Provoked by thermal</span>
            </div>
          </div>

          {/* Aggravating Stimuli */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline block mb-1.5">
              Known Aggravating Stimuli
            </span>
            <div className="flex items-center gap-2 flex-wrap text-xs">
              <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Icon name="ac_unit" className="text-sm text-primary" />
                <span>Iced Beverages</span>
              </span>
              <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Icon name="cookie" className="text-sm text-primary" />
                <span>Sweet & Sugary Foods</span>
              </span>
              <span className="bg-surface-container text-on-surface px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Icon name="lunch_dining" className="text-sm text-primary" />
                <span>Crunchy Snacks</span>
              </span>
            </div>
          </div>

          {/* Patient's Own Words */}
          <div className="bg-surface-container-low/70 rounded-xl p-3.5 text-xs space-y-1 border border-outline-variant/10">
            <div className="flex items-center gap-1.5 text-on-surface-variant">
              <Icon name="record_voice_over" className="text-sm" />
              <span className="font-bold uppercase tracking-wider text-[10px]">Patient-Reported • Verbatim Voice</span>
            </div>
            <p className="text-on-surface italic pl-3 border-l-2 border-primary text-xs sm:text-sm">
              "Sharp twinge when drinking cold water, dull ache after eating crunchy snacks."
            </p>
          </div>

          {/* Clinician Annotation */}
          <div className="bg-secondary-container/20 rounded-xl p-3.5 text-xs space-y-1 border border-secondary-container/40">
            <div className="flex items-center justify-between text-secondary">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                <Icon name="medical_services" className="text-sm" />
                <span>Clinician Intake Annotation</span>
              </div>
              <span className="font-semibold text-[11px]">Dr. D. James</span>
            </div>
            <p className="text-on-surface leading-relaxed pl-1">
              Localized to maxillary right quadrant. No spontaneous nocturnal throbbing reported. Cold stimulus sensitivity resolves within 3-5 seconds of stimulus removal, indicative of reversible pulpitis.
            </p>
          </div>
        </section>

        {/* Section B: Medical History */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-4 rounded-full bg-secondary" />
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Section B: Medical History & Systemic Conditions</h3>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full">
              Verified
            </span>
          </div>

          {/* Urgent Medical Alert */}
          <div className="bg-error-container text-on-error-container rounded-2xl p-4 flex items-start gap-3 text-xs">
            <Icon name="warning" className="text-error text-xl shrink-0 mt-0.5" />
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-on-error-container">Critical Clinical Alert</h4>
                <span className="bg-error text-on-error text-[10px] font-mono px-1.5 py-0.2 rounded font-bold uppercase">
                  Flagged
                </span>
              </div>
              <p className="mt-1 font-bold text-xs sm:text-sm">
                Penicillin Allergy (Documented Anaphylactoid Rash) • Mild Asthma (Albuterol PRN)
              </p>
              <p className="mt-1 text-on-error-container/80 leading-relaxed">
                Strict contraindication: Avoid all beta-lactam antibiotics. Patient carries rescue inhaler.
              </p>
            </div>
          </div>

          {/* Medications */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline block mb-2">
              Current Systemic Medications
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-3">
                <div className="flex items-center gap-2.5">
                  <Icon name="medication" className="text-primary text-lg" />
                  <div>
                    <p className="font-bold text-on-surface">Albuterol Inhaler (PRN)</p>
                    <p className="text-on-surface-variant text-[11px]">90 mcg aerosol • As needed for wheezing</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold bg-surface-container px-2 py-0.5 rounded text-primary">
                  Active
                </span>
              </div>

              <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-3">
                <div className="flex items-center gap-2.5">
                  <Icon name="pill" className="text-primary text-lg" />
                  <div>
                    <p className="font-bold text-on-surface">Multivitamin Daily</p>
                    <p className="text-on-surface-variant text-[11px]">Oral over-the-counter • Dietary supplement</p>
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold bg-surface-container px-2 py-0.5 rounded text-on-surface-variant">
                  Daily
                </span>
              </div>
            </div>
          </div>

          {/* Verification Timestamp */}
          <div className="pt-2 flex items-center justify-between bg-surface-container-low rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold text-[10px]">
                NZ
              </div>
              <div>
                <p className="font-semibold text-on-surface">Nurse Zainab • RN-9428</p>
                <p className="font-mono text-[10px] text-on-surface-variant">16 Feb 2025, 09:15 AM (Pre-op triage)</p>
              </div>
            </div>
            <Icon name="check_circle" className="text-secondary text-lg" />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddConditionModal(true)}
              className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1.5"
            >
              <Icon name="add_circle" className="text-sm" />
              <span>Update Medical History / Add Condition</span>
            </button>
          </div>
        </section>

        {/* Section C: Dental History */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-outline-variant/20">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-4 rounded-full bg-tertiary" />
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Section C: Dental History & Prior Interventions</h3>
            </div>
            <span className="text-[10px] font-bold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Icon name="cloud_sync" className="text-xs" />
              <span>Nigeria Health Information Exchange Synced</span>
            </span>
          </div>

          {/* Last Recorded Visit */}
          <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-3.5 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant block">
                Last Recorded Dental Visit
              </span>
              <p className="font-bold text-sm text-on-surface mt-0.5">14 Oct 2024 (4 months ago)</p>
              <p className="text-on-surface-variant text-[11px]">Routine checkup & prophylaxis • DHA Demo Clinic</p>
            </div>
            <Icon name="event_available" className="text-secondary text-2xl" />
          </div>

          {/* Documented Procedures */}
          <div className="space-y-2 text-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline block">
              Documented Dental Procedures
            </span>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-mono font-bold text-on-surface">
                  #21
                </div>
                <div>
                  <p className="font-bold text-on-surface">Composite Restoration</p>
                  <p className="text-on-surface-variant text-[11px]">Mesial surface • Year 2022</p>
                </div>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold text-[10px]">
                Intact
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center font-mono font-bold text-on-surface">
                  ALL
                </div>
                <div>
                  <p className="font-bold text-on-surface">Comprehensive Orthodontic Alignment</p>
                  <p className="text-on-surface-variant text-[11px]">Fixed labial appliances • Year 2014</p>
                </div>
              </div>
              <span className="bg-surface-container text-on-surface px-2 py-0.5 rounded font-bold text-[10px]">
                Retained
              </span>
            </div>
          </div>

          {/* Fluoride Profile */}
          <div className="flex items-center justify-between bg-surface-container-low rounded-xl p-3 text-xs">
            <div className="flex items-center gap-2.5">
              <Icon name="water_drop" className="text-primary text-lg" />
              <div>
                <p className="font-bold text-on-surface">Fluoride Exposure Profile</p>
                <p className="text-on-surface-variant text-[11px]">Optimal community fluoridated water supply</p>
              </div>
            </div>
            <Icon name="verified" className="text-secondary text-base" />
          </div>
        </section>

        {/* Action CTAs */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={() => navigate('/examination/extraoral')}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <span>Proceed to Extraoral Exam (Section 2)</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="w-full h-10 bg-surface-container-low hover:bg-surface-container text-on-surface rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Icon name="save" className="text-sm" />
            <span>Save & Return to Workspace</span>
          </button>
        </div>
      </div>

      {/* Add Condition Modal */}
      {showAddConditionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-surface-container-lowest rounded-3xl max-w-md w-full shadow-2xl p-5 border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Add Medical Condition</h3>
              <button
                type="button"
                onClick={() => setShowAddConditionModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center"
              >
                <Icon name="close" className="text-base" />
              </button>
            </div>
            <div>
              <label className="text-xs font-semibold text-on-surface-variant block mb-1">Condition Description</label>
              <input
                type="text"
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="e.g. Hypertension, Diabetes Type 2..."
                className="w-full px-3 py-2 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddConditionModal(false)}
                className="px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:bg-surface-container"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddCondition}
                className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold shadow"
              >
                Save Condition
              </button>
            </div>
          </div>
        </div>
      )}
    </ExaminationShell>
  );
}
export default PatientHistoryComplaintScreen;

