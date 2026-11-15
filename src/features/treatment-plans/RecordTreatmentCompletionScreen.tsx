import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function RecordTreatmentCompletionScreen() {
  const navigate = useNavigate();

  const [attestationChecked, setAttestationChecked] = useState(true);
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCommit = () => {
    if (!attestationChecked) {
      showToast('Statutory legal attestation checkbox must be signed prior to record sealing.');
      return;
    }

    setIsSealing(true);
    setTimeout(() => {
      setIsSealing(false);
      setIsSealed(true);
      showToast('Encounter #1048 legally committed & sealed to NABIDH & DHA Health Registry.');
    }, 1200);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Record Treatment Completion"
      badgeCode="13.18"
      badgeLabel="Statutory Legal Sign-Off"
      currentStep="13.18"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Top Statutory Legal Sign-off Banner */}
        <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#006a61] border border-teal-200">
            <Icon name="verified_user" className="text-sm" />
            <span className="text-xs font-bold uppercase tracking-wider">Statutory Legal Sign-Off</span>
          </div>
          <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
            DHA-SEC-13.18
          </span>
        </div>

        {/* Patient Context Strip */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              AO
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-base text-slate-900">Amara Okafor</h2>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">34y Female</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                LifeCode: <span className="font-mono font-semibold text-slate-700">AE-990-281-DXB</span>
              </p>
            </div>
          </div>

          <div className="text-right self-start sm:self-auto">
            <span className="font-mono text-xs font-bold text-[#006194] block">ENC-2026-1048</span>
            <span className="text-xs text-slate-500">Plan #TP-2026-089</span>
          </div>
        </div>

        {/* 1. Statutory Mandate Warning */}
        <div className="bg-[#e2e7ff] rounded-2xl p-5 shadow-xs border border-blue-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="gavel" className="text-xl" />
            </div>
            <div className="space-y-1">
              <span className="font-bold text-sm text-slate-900 block">UAE Federal Governance Mandate</span>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Only an authorized licensed dentist (<strong className="text-slate-900">#DEN credentialed</strong>) may document and attest to the completion of irreversible surgical and operative treatments. Receptionists and non-clinical staff cannot confirm clinical completion.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Completed Procedure Summary Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#eaedff] overflow-hidden space-y-3">
          <div className="p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="task_alt" className="text-sm" />
                Verified Restorative Procedure
              </span>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded">
                18 Oct 2026 • 42m Chairside
              </span>
            </div>

            <div>
              <h3 className="font-bold text-base text-slate-900">Direct Biomimetic Resin Composite Restoration</h3>
              <p className="text-xs text-[#006194] font-semibold mt-0.5">2-Surface Mesio-Occlusal (MO)</p>
            </div>

            {/* Tooth Callout */}
            <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center font-bold text-base">
                  16
                </div>
                <div>
                  <span className="font-bold text-sm text-slate-900 block">Tooth #16</span>
                  <span className="text-xs text-slate-500">Maxillary Right 1st Molar</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006a61] bg-teal-50 border border-teal-200 px-2.5 py-1 rounded-full">
                <Icon name="check_circle" className="text-sm" />
                Restored
              </span>
            </div>
          </div>

          {/* Practitioner & Staff Footer */}
          <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-[#006194] text-base" />
              <span>Attending Clinician: <strong>Dr. Daniel James</strong> (DDS, #DEN-48912)</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Icon name="support_agent" className="text-[#006a61] text-base" />
              <span>Chairside Nurse: <strong>Nurse Zainab Tariq</strong> (RN-9428)</span>
            </div>
          </div>
        </div>

        {/* 3. Materials Used & Operative Audit Log */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="science" className="text-[#006194] text-lg" />
            <h4 className="font-bold text-sm text-slate-900">Materials &amp; Operative Technical Audit</h4>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Adhesive System</span>
              <p className="text-slate-800 font-medium mt-0.5">
                OptiBond FL 3-step etch-and-rinse on enamel, self-etch dentin primer.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Composite Matrix &amp; Curing Protocol
              </span>
              <p className="text-slate-800 font-medium mt-0.5">
                Kuraray Majesty ES-2 (Dentin shade A2, Enamel shade A1). Incremental layering under 1,200 mW/cm² LED light cure.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Occlusal Adjustment &amp; Finishing
              </span>
              <p className="text-slate-800 font-medium mt-0.5">
                Shimstock 8μm foil verification in centric relation and lateral excursions. Non-working interferences removed. Polished with Sof-Lex discs and diamond paste.
              </p>
            </div>
          </div>
        </div>

        {/* 4. Post-Operative Outcome & Findings */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="health_and_safety" className="text-[#006a61] text-lg" />
            <h4 className="font-bold text-sm text-slate-900">Post-Operative Evaluation</h4>
          </div>
          <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200">
            <p className="text-slate-800 leading-relaxed">
              Complete restoration with anatomical marginal ridge contour and tight contact with #15. Vital pulp preserved with zero pulp exposure. Soft tissues normal, hemostasis achieved.
            </p>
          </div>
        </div>

        {/* 5. Complications & Allergy Protocol */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="report_off" className="text-slate-500 text-lg" />
              <h4 className="font-bold text-sm text-slate-900">Complications &amp; Deviations</h4>
            </div>
            <span className="text-[11px] font-bold text-[#006a61] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full">
              None Recorded
            </span>
          </div>
          <p className="text-slate-600 leading-relaxed p-3 bg-slate-50 rounded-xl border border-slate-200">
            Patient tolerated procedure comfortably. No beta-lactam drugs administered (<strong className="text-slate-900">Penicillin allergy respected</strong>).
          </p>
        </div>

        {/* 6. Next Step Routing & Follow-up */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="next_plan" className="text-[#006194] text-lg" />
            <h4 className="font-bold text-sm text-slate-900">Care Continuum &amp; Recare Routing</h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-3">
              <Icon name="event" className="text-[#006194] text-lg mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Next Planned Step (Phase 2)</span>
                <span className="text-slate-500 block">Preventative Recare &amp; Topical Fluoride on #15</span>
                <span className="text-[11px] font-bold text-[#006194] mt-1 block">Scheduled: 02 Nov 2026</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-3">
              <Icon name="radiology" className="text-[#006a61] text-lg mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-slate-900 block">Recare Vitality Surveillance</span>
                <span className="text-slate-500 block">Recommended 6-month pulp vitality check on #16</span>
                <span className="text-[11px] font-bold text-[#006a61] mt-1 block">Due: April 2027</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Statutory Clinician Attestation & Digital Signature */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="draw" className="text-[#006194] text-lg" />
            <h4 className="font-bold text-sm text-slate-900">Practitioner Legal Attestation</h4>
          </div>

          <label className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer">
            <input
              type="checkbox"
              checked={attestationChecked}
              onChange={(e) => setAttestationChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded accent-[#006194] cursor-pointer shrink-0"
            />
            <span className="text-slate-800 leading-relaxed">
              I, <strong className="font-bold">Dr. Daniel James (#DEN-48912)</strong>, solemnly attest that this clinical restorative procedure has been successfully delivered in accordance with UAE DHA Operative Dentistry Standards.
            </span>
          </label>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px]">
            <span className="text-slate-500">Certificate Hash: NABIDH-COMPL-20261018-DJ982</span>
            <span className="text-[#006a61] font-bold flex items-center gap-1">
              <Icon name="verified" className="text-sm" />
              Verified NABIDH Node
            </span>
          </div>
        </div>

        {/* 8. Interactive Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleCommit}
            disabled={isSealing || isSealed}
            className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              isSealed
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-[#006194] hover:bg-[#004b73] text-white active:scale-[0.99]'
            }`}
          >
            {isSealing ? (
              <>
                <Icon name="progress_activity" className="text-lg animate-spin" />
                <span>Sealing SHA-256 Ledger...</span>
              </>
            ) : isSealed ? (
              <>
                <Icon name="check_circle" className="text-lg" />
                <span>Encounter #1048 Completed &amp; Sealed</span>
              </>
            ) : (
              <>
                <Icon name="lock" className="text-lg" />
                <span>Commit Clinical Completion &amp; Seal Record</span>
              </>
            )}
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Draft saved successfully for clinical supervisor co-sign.')}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="group_add" className="text-base text-slate-500" />
              <span>Save Draft for Co-Sign</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Discard this uncommitted completion draft?')) {
                  showToast('Completion draft discarded.');
                }
              }}
              className="h-11 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-red-200"
            >
              <Icon name="delete_outline" className="text-base" />
              <span>Discard Draft</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/progress-workspace')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Progress Workspace
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/dashboard')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>Return to Treatment Plans Dashboard (13.1)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
