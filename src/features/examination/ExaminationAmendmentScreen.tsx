import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function ExaminationAmendmentScreen() {
  const navigate = useNavigate();
  const [targetSection, setTargetSection] = useState<'impression' | 'chart' | 'periodontal'>('impression');
  const [amendedNarrative, setAmendedNarrative] = useState<string>(
    'Addendum Note: Patient contacted clinic reporting spontaneous nocturnal throbbing 4 hours post-intake. Diagnosis updated to Symptomatic Irreversible Pulpitis (#16). Pathway modified to include Root Canal Therapy (Endodontic treatment) prior to coronal restoration.'
  );
  const [justificationCategory, setJustificationCategory] = useState<string>(
    'New Clinical Symptom / Progression Reported by Patient'
  );
  const [justificationText, setJustificationText] = useState<string>(
    'Patient called emergency desk complaining of acute spontaneous throbbing pain radiating to right auricular area. Pulp sensibility tests scheduled tomorrow confirm pulp non-vitality.'
  );
  const [isAttested, setIsAttested] = useState<boolean>(true);
  const [isSigning, setIsSigning] = useState<boolean>(false);
  const [isSealed, setIsSealed] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSubmitAddendum = () => {
    if (!isAttested) {
      showToast('Please check the clinician attestation checkbox to confirm addendum');
      return;
    }
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setIsSealed(true);
      showToast('Addendum v1.1 Cryptographically Signed & Sealed in NABIDH Registry');
    }, 1200);
  };

  return (
    <ExaminationShell
      pageTitle="Examination Amendment & Addendum"
      badgeCode="10.19"
      badgeLabel="Clinical Addendum"
      currentStep="Post-Submission Addendum Workflow (DHA-HIS-P04)"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* 1. Top Clinical Status Banner & Metadata Header */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-wide">
                <Icon name="verified_user" className="text-sm text-secondary" />
                <span>v1.1 ADDENDUM</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-mono text-xs font-semibold">
                DHA-HIS-P04 COMPLIANT
              </span>
            </div>
            <div className="flex items-center gap-1 text-on-surface-variant font-mono text-xs">
              <Icon name="lock" className="text-sm" />
              <span className="font-bold">SEALED BASELINE</span>
            </div>
          </div>

          <div>
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Post-Submission Amendment</h2>
            <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant flex-wrap">
              <span className="font-mono text-primary font-bold">#EXAM-DHA-2025-0982</span>
              <span>•</span>
              <span>Submitted 16 Feb 2025, 11:22 AM GST</span>
            </div>
          </div>

          {/* Patient & Clinician Pill Strip */}
          <div className="bg-surface-container-low rounded-xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-sm shrink-0">
                CO
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-on-surface truncate block">Chinedu Okafor</span>
                <span className="text-[11px] font-mono text-on-surface-variant">34y M • DHA-10482</span>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold text-on-surface block">Dr. Daniel James</span>
              <span className="text-[11px] font-mono text-secondary font-medium">#DEN-48912 (Attending Clinician)</span>
            </div>
          </div>
        </section>

        {/* 2. Governance Anti-Overwrite Banner */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 text-tertiary flex items-center justify-center shrink-0">
              <Icon name="security_update_good" className="text-xl" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-on-surface">Strict Anti-Overwrite Principle</h3>
                <span className="px-2 py-0.5 rounded bg-surface-container text-primary font-mono text-[10px] font-bold">
                  IMMUTABLE BASE
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Original examination baseline is legally sealed. This workflow appends a cryptographically verified version addendum (v1.1) in adherence to UAE Federal Health Law and Dubai Health Authority directives.
              </p>
            </div>
          </div>
        </section>

        {/* 3. Section Selector Tabs */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-on-surface px-1 block">Target Examination Section</label>
          <div className="bg-surface-container rounded-2xl p-1.5 flex items-center gap-1.5 overflow-x-auto text-xs">
            <button
              type="button"
              onClick={() => setTargetSection('impression')}
              className={`flex-1 min-w-[140px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                targetSection === 'impression'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="stethoscope" className="text-sm" />
              <span>Sec 8: Impression</span>
            </button>
            <button
              type="button"
              onClick={() => setTargetSection('chart')}
              className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                targetSection === 'chart'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="dentistry" className="text-sm" />
              <span>Sec 6: Chart</span>
            </button>
            <button
              type="button"
              onClick={() => setTargetSection('periodontal')}
              className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all ${
                targetSection === 'periodontal'
                  ? 'bg-surface-container-lowest text-primary shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="bloodtype" className="text-sm" />
              <span>Sec 4: Periodontal</span>
            </button>
          </div>
        </div>

        {/* 4. Original vs Amended Comparison Section */}
        <div className="space-y-3">
          {/* Original Value Card (Immutable) */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <Icon name="history_toggle_off" className="text-outline text-base" />
                <span className="text-xs font-bold uppercase tracking-wider text-outline">Original Baseline (Sealed)</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-mono text-[11px] font-semibold">
                <Icon name="lock" className="text-[12px]" />
                <span>Read-Only</span>
              </span>
            </div>

            <div className="bg-surface-container-low rounded-xl p-3.5 space-y-1.5 border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-surface-container-high text-primary font-mono text-xs flex items-center justify-center font-bold">
                  #16
                </span>
                <span className="text-xs sm:text-sm font-bold text-on-surface">Reversible Pulpitis</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Tooth #16 Reversible Pulpitis secondary to Cavitated OM Dentinal Caries. Operative Direct Resin Composite restoration planned under local infiltration.
              </p>
            </div>

            <div className="flex items-center justify-between text-[11px] text-on-surface-variant font-mono pt-1">
              <div className="flex items-center gap-1.5">
                <Icon name="edit_note" className="text-sm" />
                <span>Authored by Dr. Daniel James</span>
              </div>
              <span>16 Feb 2025 • 11:20 AM</span>
            </div>
          </div>

          {/* Comparison Connector Graphic */}
          <div className="flex items-center justify-center -my-1 relative z-10">
            <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container shadow-sm flex items-center justify-center">
              <Icon name="arrow_downward" className="text-base" />
            </div>
          </div>

          {/* Proposed Amended Value Card */}
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
            <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 pb-2.5">
              <div className="flex items-center gap-2">
                <Icon name="add_circle" className="text-primary text-base" />
                <span className="text-xs font-bold uppercase tracking-wider text-primary">Proposed Addendum Value (v1.1)</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-secondary" />
                <span>Active Draft</span>
              </span>
            </div>

            <div className="space-y-3">
              {/* Dental Tooth Micro-Selector Badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="px-3 py-1 rounded-lg bg-primary text-on-primary font-mono text-xs font-bold flex items-center gap-1">
                  <span>Tooth #16</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 text-xs font-bold flex items-center gap-1">
                  <Icon name="warning" className="text-sm" />
                  <span>Updated: Irreversible Pulpitis</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-on-surface block">Amended Narrative & Treatment Pathway</label>
                <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
                  <textarea
                    value={amendedNarrative}
                    onChange={(e) => setAmendedNarrative(e.target.value)}
                    rows={4}
                    maxLength={500}
                    className="w-full bg-transparent text-xs text-on-surface resize-none focus:outline-none leading-relaxed"
                    placeholder="Enter updated diagnostic details..."
                  />
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/20 text-[11px] text-on-surface-variant font-mono">
                    <span className="flex items-center gap-1 text-secondary font-semibold">
                      <Icon name="check_circle" className="text-xs" />
                      <span>Narrative verified against clinical codification</span>
                    </span>
                    <span>{amendedNarrative.length} / 500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Mandatory Amendment Justification Section */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2.5">
            <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xs font-bold">
              !
            </span>
            <h3 className="text-xs sm:text-sm font-bold text-on-surface">Clinical Justification & Audit Trail</h3>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface block">Mandatory Reason Category</label>
            <select
              value={justificationCategory}
              onChange={(e) => setJustificationCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary"
            >
              <option>New Clinical Symptom / Progression Reported by Patient</option>
              <option>Diagnostic Radiographic Re-evaluation</option>
              <option>Clerical Transcription Correction</option>
              <option>Pathology Lab Result Updated</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-on-surface block">Justification Details for Audit Log</label>
            <div className="bg-surface-container-low rounded-xl p-3 border border-outline-variant/30">
              <textarea
                value={justificationText}
                onChange={(e) => setJustificationText(e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full bg-transparent text-xs text-on-surface resize-none focus:outline-none leading-relaxed"
                placeholder="State explicit rationale requiring post-seal record alteration..."
              />
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-outline-variant/20 text-[11px] text-on-surface-variant font-mono">
                <span>DHA Clinical Audit Trail</span>
                <span>{justificationText.length} / 500</span>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Clinician Attestation & Digital Stamp */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between gap-2 border-b border-outline-variant/20 pb-2.5">
            <h3 className="text-xs sm:text-sm font-bold text-on-surface">Practitioner Attestation</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
              DHA ACCREDITED
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-on-primary shrink-0 shadow-sm">
                <Icon name="badge" className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-bold text-on-surface">Dr. Daniel James</span>
                <span className="text-[11px] font-mono text-on-surface-variant">General Dentist • License #DEN-48912</span>
              </div>
            </div>
            <div className="flex items-center text-secondary font-mono text-xs gap-1 font-semibold">
              <Icon name="fingerprint" className="text-base" />
              <span>Dual-Factor Ready</span>
            </div>
          </div>

          {/* Legal Checkbox */}
          <label className="flex items-start gap-3 cursor-pointer select-none group pt-1">
            <input
              type="checkbox"
              checked={isAttested}
              onChange={(e) => setIsAttested(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary accent-primary"
            />
            <span className="text-xs text-on-surface-variant group-hover:text-on-surface leading-relaxed">
              I confirm this clinical addendum reflects accurate clinical findings and maintains medical record integrity under DHA-HIS-P04 regulations.
            </span>
          </label>
        </section>

        {/* 7. Action Trays */}
        <div className="space-y-3 pt-1">
          <button
            type="button"
            disabled={isSigning || isSealed}
            onClick={handleSubmitAddendum}
            className={`w-full h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all ${
              isSealed
                ? 'bg-secondary text-on-secondary'
                : 'bg-primary hover:bg-primary/90 text-on-primary'
            }`}
          >
            {isSigning ? (
              <>
                <Icon name="progress_activity" className="text-base animate-spin" />
                <span>Cryptographically Signing Addendum...</span>
              </>
            ) : isSealed ? (
              <>
                <Icon name="check_circle" className="text-base" />
                <span>Addendum v1.1 Sealed in NABIDH</span>
              </>
            ) : (
              <>
                <Icon name="lock_reset" className="text-base" />
                <span>Submit Clinical Addendum (v1.1)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="w-full h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="close" className="text-base" />
            <span>Cancel & Return to Sealed Record</span>
          </button>
        </div>

        {/* Audit Footer Note */}
        <div className="flex items-center justify-center gap-1.5 text-center text-outline font-mono text-[11px] pt-1 pb-4">
          <Icon name="history_edu" className="text-xs" />
          <span>Post-Submission amendments are irreversible and logged to DHA Health Record Exchange (NABIDH).</span>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ExaminationAmendmentScreen;

