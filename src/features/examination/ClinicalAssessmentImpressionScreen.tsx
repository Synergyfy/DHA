import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function ClinicalAssessmentImpressionScreen() {
  const navigate = useNavigate();
  const [impressionNotes, setImpressionNotes] = useState<string>(
    '34-year-old male presents with cold sensitivity and intermittent dull ache localized to the upper right quadrant (VAS 5/10). Clinical examination and bitewing radiograph confirm cavitated dentinal caries on Tooth #16 (OM surfaces, ICDAS 3/4) with reversible pulpal involvement. Vitality testing elicited immediate cold sensation resolving within 2 seconds. Periodontal status reveals localized plaque-induced gingivitis in Q1 and Q4, without deep pocketing. TMJ and occlusal relations are Class I and physiological. Patient has documented penicillin allergy (moderate-to-severe rash) and mild asthma; restorative care planned under local anesthesia without penicillin-class therapeutics.'
  );
  const [isRecordSealed, setIsRecordSealed] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSealRecord = () => {
    setIsRecordSealed(true);
    showToast('Examination Record Successfully Sealed and Certified under DHA Rule SEC10-REG09');
  };

  return (
    <ExaminationShell
      pageTitle="Clinical Assessment & Impression"
      badgeCode="10.12"
      badgeLabel="Module 8 of 8"
      currentStep="Module 8: Diagnostic Formulation & Clinical Impression"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Top Context Subheader */}
        <section className="bg-surface-container-low rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-primary uppercase tracking-wider">Module 8 of 8 • DHA Section 10</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full font-bold">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              <span>Diagnostic Synthesis Engine</span>
            </span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-sm sm:text-base text-on-surface">Comprehensive Clinical Diagnostic Impression</span>
            <span className="text-outline">Attending: Dr. Daniel James</span>
          </div>
        </section>

        {/* Diagnostic Readiness Complete Banner */}
        <div className="bg-gradient-to-r from-secondary-container/80 via-surface-container to-primary/10 rounded-2xl p-5 border border-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-secondary text-on-secondary flex items-center justify-center font-bold text-xl shrink-0 shadow-md">
              <Icon name="verified_user" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-bold text-on-surface">All 7 Modules Aggregated & Verified</h2>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary text-[10px] font-mono font-bold">
                  100% READY
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                History, Soft Tissue, Periodontal, Occlusion, Odontogram & Imaging integrated for diagnostic formulation
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {isRecordSealed ? (
              <span className="px-3.5 py-2 rounded-xl bg-secondary text-on-secondary text-xs font-bold flex items-center gap-1.5 shadow">
                <Icon name="lock" className="text-sm" />
                <span>Record Sealed</span>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleSealRecord}
                className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <Icon name="lock" className="text-sm" />
                <span>Seal Record</span>
              </button>
            )}
          </div>
        </div>

        {/* Section A: Provisional Diagnoses */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border-l-4 border-l-amber-500 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                A
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Provisional Dental Diagnoses</h3>
                <p className="text-[11px] text-on-surface-variant">Primary active oral pathologies with ICD-10 diagnostic codes</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[11px] font-mono font-bold">
              2 ACTIVE FINDINGS
            </span>
          </div>

          <div className="space-y-3">
            {/* Dx 1 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-red-500 text-white font-mono text-[11px] font-bold">
                    ICD-10 K04.00
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-on-surface">
                    Tooth #16: Reversible Pulpitis secondary to Cavitated Dentinal Caries
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                  Confidence: 94% (High)
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Active dentinal lesion involving the occlusal-mesial aspect (ICDAS code 3/4). Coronal radiolucency verified on bitewing BW-R-2025-0216. Vital cold stimulation produces instant sharp response without lingering ache.
              </p>
              <div className="flex items-center gap-2 text-[10px] text-outline font-mono pt-1">
                <span>EVIDENCE: Module 1 (History), Module 6 (Odontogram #16), Module 7 (BW-R)</span>
              </div>
            </div>

            {/* Dx 2 */}
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-white font-mono text-[11px] font-bold">
                    ICD-10 K05.10
                  </span>
                  <span className="font-bold text-xs sm:text-sm text-on-surface">
                    Quadrants 1 & 4: Localized Plaque-Induced Chronic Gingivitis
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
                  Confidence: 91% (High)
                </span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Marginal erythema and localized bleeding on probing (BOP) at interproximal sites in Q1 and Q4. No clinical attachment loss or radiographic crestal bone resorption (pocket depths ≤3mm).
              </p>
              <div className="flex items-center gap-2 text-[10px] text-outline font-mono pt-1">
                <span>EVIDENCE: Module 3 (Intraoral Mucosa), Module 4 (Perio Probing 6-point)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section B: Differential Diagnoses (Ruled Out) */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border-l-4 border-l-outline border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-surface-container text-outline flex items-center justify-center font-bold">
                B
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Differential Diagnoses & Exclusions</h3>
                <p className="text-[11px] text-on-surface-variant">Conditions systematically evaluated and ruled out by clinical criteria</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-surface-container text-[11px] font-mono text-outline font-bold">
              RULED OUT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">Irreversible Pulpitis (#16)</span>
                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 text-[10px] font-bold">
                  Excluded
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                No lingering pain (&gt;10s), no spontaneous nocturnal ache, periapical PA-16 shows normal PDL without apical periodontitis.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-on-surface">Cracked Tooth Syndrome</span>
                <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 text-[10px] font-bold">
                  Excluded
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Tooth Slob probe bite test negative on individual cusps. Fiberoptic transillumination reveals no structural fractures.
              </p>
            </div>
          </div>
        </section>

        {/* Section C: Confirmed Systemic Diagnoses & Allergies */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border-l-4 border-l-blue-600 border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Systemic Considerations & Alerts</h3>
                <p className="text-[11px] text-on-surface-variant">Cross-referenced from Module 1 health profile</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 text-[11px] font-mono font-bold">
              ALLERGY ALERT
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-red-700 dark:text-red-300 font-bold">
                <Icon name="warning" className="text-base" />
                <span>Penicillin Allergy (Severe)</span>
              </div>
              <p className="text-[11px] text-red-800 dark:text-red-200">
                History of anaphylactoid generalized urticaria. All beta-lactams and amoxicillin contraindicated. Use Clindamycin or Azithromycin if indicated.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/30 space-y-1">
              <div className="flex items-center gap-1.5 text-blue-700 dark:text-blue-300 font-bold">
                <Icon name="medical_services" className="text-base" />
                <span>Mild Intermittent Asthma (J45.20)</span>
              </div>
              <p className="text-[11px] text-blue-800 dark:text-blue-200">
                Patient carries Albuterol inhaler. Last exacerbation &gt;1 year ago. Morning appointments recommended; avoid aspirin and NSAIDs.
              </p>
            </div>
          </div>
        </section>

        {/* Section D: Clinician Impression Narrative */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <Icon name="clinical_notes" className="text-primary text-xl" />
              <h3 className="text-sm font-bold text-on-surface">Clinician Comprehensive Impression Narrative</h3>
            </div>
            <span className="text-[11px] font-mono text-outline">Dr. Daniel James (#DEN-48912)</span>
          </div>
          <textarea
            value={impressionNotes}
            onChange={(e) => setImpressionNotes(e.target.value)}
            disabled={isRecordSealed}
            rows={5}
            className={`w-full p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs text-on-surface focus:outline-none focus:border-primary resize-none leading-relaxed ${
              isRecordSealed ? 'opacity-80 cursor-not-allowed bg-surface-container' : ''
            }`}
          />
          <div className="flex justify-between items-center text-[11px] text-on-surface-variant">
            <span>DHA Legal Clinical Record Standards compliant</span>
            <span className="font-mono">{impressionNotes.length} characters</span>
          </div>
        </section>

        {/* Section E: Recommended Clinical Pathway & Plan */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 border-l-4 border-l-secondary border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                E
              </div>
              <div>
                <h3 className="text-sm font-bold text-on-surface">Recommended Care Pathways & Next Steps</h3>
                <p className="text-[11px] text-on-surface-variant">Prioritized treatment plan proposals for patient consent</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container text-[11px] font-mono font-bold">
              3 PHASES
            </span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-red-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                  P1
                </span>
                <div>
                  <span className="text-xs font-bold text-on-surface">Tooth #16 Direct Resin Composite Restoration (OM)</span>
                  <p className="text-[11px] text-on-surface-variant">Caries excavation, pulp protection liner, aesthetic composite</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-red-600 font-mono">Within 2 Weeks</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-amber-500 text-white font-mono text-xs font-bold flex items-center justify-center">
                  P2
                </span>
                <div>
                  <span className="text-xs font-bold text-on-surface">Full-Mouth Ultrasonic Prophylaxis & OHI</span>
                  <p className="text-[11px] text-on-surface-variant">Plaque debridement and targeted interdental hygiene training</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-600 font-mono">Same Visit / Next Appt</span>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-secondary text-on-secondary font-mono text-xs font-bold flex items-center justify-center">
                  P3
                </span>
                <div>
                  <span className="text-xs font-bold text-on-surface">6-Month Recall & Radiographic Review</span>
                  <p className="text-[11px] text-on-surface-variant">Clinical examination, bitewing review, periodontal re-evaluation</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-secondary font-mono">August 2025</span>
            </div>
          </div>
        </section>

        {/* Global Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/investigations')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors w-full sm:w-auto justify-center"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Module 7: Investigations</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => showToast('Exporting DHA Clinical Examination PDF Summary...')}
              className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors flex-1 sm:flex-initial justify-center"
            >
              <Icon name="download" className="text-sm text-primary" />
              <span>Export Summary</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/examination/attachments')}
              className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs font-bold flex items-center gap-2 shadow-md transition-all flex-1 sm:flex-initial justify-center"
            >
              <span>View Dossier Attachments</span>
              <Icon name="attach_file" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ClinicalAssessmentImpressionScreen;

