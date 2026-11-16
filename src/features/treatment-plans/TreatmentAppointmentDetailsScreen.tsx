import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function TreatmentAppointmentDetailsScreen() {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCancelConfirm = () => {
    setShowCancelModal(false);
    showToast('Appointment #APT-2026-8819 cancelled. Patient and clinician notified.');
  };

  const handleRescheduleConfirm = () => {
    setShowRescheduleModal(false);
    showToast('Rescheduling request initiated. Redirecting to calendar scheduler...');
    setTimeout(() => navigate('/treatment-plans/scheduling'), 1200);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Appointment Details"
      badgeCode="13.16"
      badgeLabel="Encounter Dossier"
      currentStep="13.16"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <Icon name="warning" className="text-2xl" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Cancel Appointment #APT-2026-8819?</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Cancelling will release Operatory 02 and notify Dr. Daniel James. Tooth #16 requires prompt restoration to prevent pulpal involvement.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                onClick={handleCancelConfirm}
                className="flex-1 py-2.5 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-[#006194] flex items-center justify-center mx-auto">
              <Icon name="event_repeat" className="text-2xl" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Reschedule Treatment Slot</h3>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                You will be taken back to the interactive scheduling calendar to choose a new chairside slot for Amara Okafor.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleRescheduleConfirm}
                className="flex-1 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004b73] shadow-sm"
              >
                Open Scheduler
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Status Banner & Reference Header */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-2">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#006a61] border border-teal-200">
              <Icon name="check_circle" className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">Confirmed • Booked Chairside</span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-500">#APT-2026-8819</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
            <Icon name="link" className="text-[#006194] text-sm" />
            <span>Linked to Care Plan: <strong className="text-slate-900 font-mono">#TP-2026-089</strong></span>
            <span>•</span>
            <span className="text-emerald-700 font-semibold">Pre-Auth Cleared</span>
          </div>
        </div>

        {/* Key Encounter Summary Bento Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
              <Icon name="calendar_today" className="text-2xl text-[#006194]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006194] block">Scheduled Encounter</span>
              <h2 className="text-lg font-bold text-slate-900 mt-0.5">Sunday, 18 Oct 2026</h2>
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-1 flex-wrap">
                <span className="font-semibold text-slate-900">10:00 AM – 10:45 AM</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold text-[11px]">
                  45 Mins Duration
                </span>
              </div>
            </div>
          </div>

          {/* Tooth Callout */}
          <div className="bg-[#faf8ff] rounded-xl p-3.5 flex items-center justify-between gap-3 border border-[#eaedff]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-[#006194] text-white flex items-center justify-center font-bold text-base shrink-0">
                16
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 text-sm block truncate">Tooth #16 (Maxillary Right 1st Molar)</span>
                <span className="text-xs text-[#006a61] font-semibold block truncate">
                  Direct Biomimetic Resin Composite (2-Surface MO)
                </span>
              </div>
            </div>
            <Icon name="dentistry" className="text-[#006a61] text-2xl shrink-0" />
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-xs text-slate-600 pt-1 border-t border-slate-100">
            <Icon name="location_on" className="text-[#006194] text-base shrink-0" />
            <span>DHA Primary Dental Clinic, Lekki • <strong className="text-slate-900">Operatory 02 (Restorative Suite)</strong></span>
          </div>
        </div>

        {/* Patient Identity & Medical Flags */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">
                AO
              </div>
              <div>
                <span className="font-bold text-slate-900 text-sm block">Amara Okafor</span>
                <span className="text-xs text-slate-500">34y Female • DHA-2026-00451</span>
              </div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              Patient Record #8491
            </span>
          </div>

          {/* Allergy Banner */}
          <div className="bg-red-50 border border-red-200 text-red-900 rounded-xl p-3 flex items-start gap-2.5 text-xs">
            <Icon name="warning" className="text-red-600 text-lg shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-red-950 block">Critical Medical Alert</span>
              <p className="mt-0.5 leading-relaxed">
                Severe Penicillin Allergy documented (Beta-lactam antibiotics strictly contraindicated). Operatory tray verified.
              </p>
            </div>
          </div>

          {/* Consent Status Strip */}
          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Icon name="draw" className="text-[#006194] text-base" />
              <span>Digital Procedural Consent:</span>
            </div>
            <span className="bg-teal-50 text-[#006a61] border border-teal-200 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
              <Icon name="check" className="text-xs" />
              <span>Signed &amp; Authenticated</span>
            </span>
          </div>
        </div>

        {/* Assigned Clinical Team */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between pb-1">
            <span className="font-bold text-sm text-slate-900">Assigned Care Team</span>
            <span className="text-xs text-[#006a61] uppercase tracking-wider font-bold">Verified DHA Care</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold">
                  DJ
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Dr. Daniel James, DDS</span>
                  <span className="text-slate-500 text-[11px]">Attending Dentist • Lic: #DEN-48912</span>
                </div>
              </div>
              <Icon name="verified" className="text-[#006a61] text-lg" />
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#006a61] text-white flex items-center justify-center font-bold">
                  ZT
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">Nurse Zainab Tariq</span>
                  <span className="text-slate-500 text-[11px]">Chairside Dental Nurse • RN-9428</span>
                </div>
              </div>
              <Icon name="medical_services" className="text-[#006a61] text-lg" />
            </div>
          </div>
        </div>

        {/* Financial Breakdown Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-bold text-sm text-slate-900">Financial &amp; Tariff Summary</span>
            <span className="text-xs bg-[#cce5ff] text-[#001d31] font-bold px-2.5 py-0.5 rounded-full">
              NHIA Validated
            </span>
          </div>

          <div className="space-y-2 pt-1 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Standard Statutory Tariff (CDT D2392)</span>
              <span>NGN 850.00</span>
            </div>
            <div className="flex items-center justify-between text-[#006a61] font-semibold">
              <span className="flex items-center gap-1">
                <Icon name="verified_user" className="text-sm" />
                Insurance Pre-Approval Coverage (80%)
              </span>
              <span>- NGN 680.00</span>
            </div>
            <div className="h-px bg-slate-100 my-1" />
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 text-sm block">Patient Copay Due</span>
                <span className="text-slate-400 text-[11px]">Collect at reception check-in</span>
              </div>
              <span className="text-xl font-extrabold text-[#006194]">NGN 170.00</span>
            </div>
          </div>
        </div>

        {/* Pre-Appointment Directives */}
        <div className="bg-[#faf8ff] rounded-2xl p-4 border border-[#eaedff] space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#006194] font-bold">
              <Icon name="info" className="text-base" />
              <span>Pre-Appointment Directives</span>
            </div>
            <span className="text-slate-500 text-[11px]">SMS Dispatched</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Amara Okafor instructed to arrive 10 minutes early for digital consent verification and vital signs pre-check. Fast from caffeinated beverages 2 hours prior to local anaesthesia administration.
          </p>
        </div>

        {/* Role-Based Action Tray */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/progress-workspace')}
            className="w-full h-12 bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Icon name="monitor_heart" className="text-lg" />
            <span>Open Clinical Treatment Workspace (13.17)</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setShowRescheduleModal(true)}
              className="h-11 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="event_repeat" className="text-base text-slate-500" />
              <span>Reschedule</span>
            </button>
            <button
              type="button"
              onClick={() => setShowCancelModal(true)}
              className="h-11 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-red-200"
            >
              <Icon name="cancel" className="text-base" />
              <span>Cancel Visit</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center pt-1 leading-normal">
            Receptionists may adjust appointment schedule slots. Clinical procedure scope &amp; tooth charting are locked to Dr. Daniel James (#DEN-48912).
          </p>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
