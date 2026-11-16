import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function FollowUpDetailsScreen() {
  const navigate = useNavigate();

  const [interimNotes, setInterimNotes] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showDeferModal, setShowDeferModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveNotes = () => {
    showToast('Clinical interim observation notes saved to follow-up dossier.');
  };

  const handleDeferConfirm = () => {
    setShowDeferModal(false);
    showToast('Follow-up interval extended by 7 calendar days under Dr. James authorization.');
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    showToast('Follow-up cancelled. Clinical justification archived to DHA registry.');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Follow Up Details"
      badgeCode="13.21"
      badgeLabel="Diagnostic Mandate"
      currentStep="13.21"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Defer Modal */}
      {showDeferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="update" className="text-[#006194] text-2xl" />
              <h3 className="font-bold text-base text-slate-900">Extend Follow-up Interval</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              DHA By-Law 2026 requires clinical rationale for deferring tooth #16 post-op vitality review. Select new target interval:
            </p>
            <select className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
              <option>Extend by 7 Days (Target: 09 Nov 2026)</option>
              <option>Extend by 14 Days (Target: 16 Nov 2026)</option>
              <option>Defer to 6-Month Recare (Clinical Stability Confirmed)</option>
            </select>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeferModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeferConfirm}
                className="flex-1 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004b73] shadow-sm"
              >
                Confirm Extension
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="cancel" className="text-2xl" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Cancel Follow-up Mandate?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cancelling an active clinical follow-up requires medical justification to prevent unmonitored pulpal complications.
              </p>
            </div>
            <textarea
              placeholder="State mandatory clinical justification for cancellation..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:border-red-500 outline-none"
              rows={2}
            />
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={handleCancelConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Status & Urgency Ribbon */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse shrink-0"></span>
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wider truncate">
              Protocol Track • 14-Day Post-Op Restorative Check
            </span>
          </div>
          <span className="bg-white text-amber-800 font-mono text-xs px-2.5 py-1 rounded-full border border-amber-200 font-bold shrink-0">
            Pending Scheduling
          </span>
        </div>

        {/* Patient & Clinician Hero Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006194] to-[#004b73] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                AO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-slate-900 truncate">Amara Okafor</h2>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">34y Female</span>
                </div>
                <p className="font-mono text-xs text-slate-500 mt-0.5">DHA-2026-00451 • LifeCode: NG-990-281-LAG</p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">REF NUMBER</span>
              <span className="font-mono text-xs font-bold text-[#006194]">#FOL-2026-0391</span>
            </div>
          </div>

          <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#006194] flex items-center justify-center shrink-0">
                <Icon name="stethoscope" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Responsible Clinician</span>
                <span className="font-bold text-slate-900 truncate block">Dr. Daniel James, DDS</span>
              </div>
            </div>
            <span className="font-mono text-[11px] text-slate-500 bg-white px-2 py-1 rounded border border-slate-200">
              #DEN-48912
            </span>
          </div>
        </div>

        {/* Clinical Mandate & Target Timeline */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="assignment_turned_in" className="text-[#006194] text-lg" />
              <h3 className="font-bold text-base text-slate-900">Clinical Follow-up Mandate</h3>
            </div>
            <span className="bg-[#cce5ff] text-[#001d31] font-bold text-xs px-2.5 py-0.5 rounded-full uppercase">
              Tooth #16
            </span>
          </div>

          {/* Timers Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff]">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Interval Window</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-extrabold text-slate-900">14</span>
                <span className="text-slate-500">days post-op</span>
              </div>
              <span className="text-[#006a61] text-[11px] font-semibold block mt-1">Standard Biomimetic Care</span>
            </div>

            <div className="bg-amber-50/60 rounded-xl p-3 border border-amber-200">
              <span className="text-[10px] text-amber-800 font-bold uppercase block">Target Due Date</span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="text-xl font-extrabold text-amber-900">02 Nov</span>
                <span className="text-amber-700">2026</span>
              </div>
              <span className="text-amber-800 text-[11px] font-bold block mt-1">6 days remaining</span>
            </div>
          </div>

          {/* Reason & Objectives */}
          <div className="space-y-3 text-xs">
            <div>
              <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block mb-1">
                Reason for Follow-up
              </span>
              <p className="text-slate-800 leading-relaxed">
                Post-Operative Restorative Verification &amp; Pulp Vitality Response Test for Tooth #16 (MO composite placed on 18 Oct 2026).
              </p>
            </div>

            <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] space-y-2">
              <span className="font-bold text-[#006194] uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Icon name="crisis_alert" className="text-sm" />
                <span>Key Clinical Objectives</span>
              </span>
              <ul className="space-y-1.5 text-slate-700">
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                  <span><strong>Verify Pulpal Quiescence:</strong> Confirm absence of lingering cold hyper-responsiveness.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                  <span><strong>Occlusal Verification:</strong> Assess micro-wear, premature contact, and marginal crest seal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                  <span><strong>Phase 2 Transition:</strong> Deliver preventative topical fluoride varnish onto Tooth #15.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Linked Encounter & Evidence */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="dataset" className="text-[#006194] text-lg" />
              <h3 className="font-bold text-base text-slate-900">Linked Encounter &amp; Evidence</h3>
            </div>
            <span className="font-mono text-xs font-bold text-[#006194]">#ENC-2026-1048</span>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-900 block">Direct Biomimetic Resin Composite</span>
              <span className="text-slate-500 text-[11px]">18 Oct 2026 • Tooth #16 (MO) • ICDAS 3/4</span>
            </div>
            <span className="text-[11px] font-bold text-[#006a61] bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
              Pulp Buffer: 2.1mm
            </span>
          </div>

          {/* Media Thumbnails */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <Icon name="photo_camera" className="text-[#006194] text-xl" />
              <div>
                <span className="font-bold text-slate-900 block text-[11px]">Post-Op Macro</span>
                <span className="text-[10px] text-slate-500">18 Oct • High-res</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
              <Icon name="radiology" className="text-[#006a61] text-xl" />
              <div>
                <span className="font-bold text-slate-900 block text-[11px]">Bite-Wing X-Ray</span>
                <span className="text-[10px] text-slate-500">2.1mm Margin Clear</span>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Communication & Preferences */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="notifications_active" className="text-[#006a61] text-lg" />
              <h3 className="font-bold text-base text-slate-900">Communication &amp; Reminders Status</h3>
            </div>
            <span className="bg-teal-50 text-[#006a61] border border-teal-200 px-2.5 py-0.5 rounded-full text-[11px] font-bold">
              Synced §4
            </span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700">
                <Icon name="cell_tower" className="text-base text-slate-500" />
                <span>Automated Dispatch (Push + SMS)</span>
              </div>
              <span className="font-mono text-xs font-semibold text-slate-900">26 Oct &amp; 01 Nov</span>
            </div>

            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-2">
              <Icon name="wb_sunny" className="text-[#006194] text-base shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">Patient Preference</span>
                <p className="text-slate-800 mt-0.5">Prefers morning appointments between 08:30 – 11:00 AM (Sec 13.12 intake note).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Clinician Interim Notes */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="edit_note" className="text-[#006194] text-lg" />
              <h3 className="font-bold text-base text-slate-900">Clinical Interim Notes &amp; Observations</h3>
            </div>
            <span className="text-slate-400">Internal Only</span>
          </div>
          <p className="text-slate-500">Log any intermediate telemedicine check-in, phone triage, or provisional findings.</p>
          <textarea
            value={interimNotes}
            onChange={(e) => setInterimNotes(e.target.value)}
            placeholder="e.g. Telephone check-in conducted on 22 Oct: patient reports zero lingering cold discomfort, normal mastication resumed..."
            rows={3}
            className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#006194] outline-none"
          />
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400">Verified by: Dr. Daniel James</span>
            <button
              type="button"
              onClick={handleSaveNotes}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#006194] font-bold text-xs"
            >
              Save Draft
            </button>
          </div>
        </div>

        {/* Governance Safeguard */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3 text-xs">
          <Icon name="verified_user" className="text-[#006194] text-lg mt-0.5 shrink-0" />
          <div className="text-slate-600 leading-relaxed">
            <strong className="text-slate-900 font-bold">Clinical Governance Safeguard:</strong> Clinical follow-ups constitute formal diagnostic mandates and are legally separate from lifestyle reminders. Re-scheduling or resolution requires direct practitioner confirmation under DHA Regulatory By-Law 2026.
          </div>
        </div>

        {/* Action Hub */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/scheduling')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Icon name="calendar_today" className="text-lg" />
            <span>Schedule Follow-up Appointment (13.15)</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Follow-up findings recorded: Tooth #16 pulpal quiescence confirmed. Status updated.')}
            className="w-full h-11 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs border border-slate-300 shadow-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="fact_check" className="text-[#006a61] text-base" />
            <span>Record Follow-up Findings &amp; Complete</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowDeferModal(true)}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="update" className="text-base text-slate-500" />
              <span>Defer / Extend Interval</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="h-11 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-red-200"
            >
              <Icon name="cancel" className="text-base" />
              <span>Cancel Follow-up</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/follow-up-management')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Follow-up Queue
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/history')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>View Treatment Plan History (13.22)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
