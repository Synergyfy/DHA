import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface AuditTrailEvent {
  time: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  isCurrent?: boolean;
}

const AUDIT_EVENTS: AuditTrailEvent[] = [
  {
    time: '08:48 AM',
    title: 'Patient Check-in',
    description: 'Front desk verified by Grace Ibrahim. Reception queue cleared.',
    icon: 'how_to_reg',
    iconColor: 'bg-[#006a61] text-white',
  },
  {
    time: '08:52 AM',
    title: 'Triage & Allergy Review',
    description: 'Medical history intake complete. Penicillin allergy confirmed and marked in EHR.',
    icon: 'health_and_safety',
    iconColor: 'bg-[#ffdad6] text-[#93000a]',
  },
  {
    time: '09:02 AM',
    title: 'Called to Operatory',
    description: 'Patient escorted into Suite 01 by Nurse Tariq.',
    icon: 'door_open',
    iconColor: 'bg-[#cce5ff] text-[#001d31]',
  },
  {
    time: '09:05 AM',
    title: 'Procedure Commenced',
    description: 'Dr. Okoro started local anesthesia and tooth excavation on #16.',
    icon: 'play_arrow',
    iconColor: 'bg-[#006194] text-white',
    isCurrent: true,
  },
];

export const AppointmentDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const showToast = (message: string, icon = 'check_circle') => {
    setToastIcon(icon);
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2600);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Interactive Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-[#eef0ff] px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium animate-fade-in border border-white/10 max-w-[90vw]">
          <Icon name={toastIcon} className="text-[#89f5e7] text-[20px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-xl text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <h1 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
              Patient Intake Details
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-5 pb-20">
        {/* Sub-bar with Encounter Number & Quick Actions */}
        <div className="mb-4 flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-1.5 rounded-full border border-[#dae2fd]/60 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
            <span className="text-xs font-mono text-[#3f4850] font-semibold tracking-wider uppercase">
              Encounter #APT-2026-9812
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Encounter summary link copied to clipboard', 'content_copy')}
              aria-label="Share details"
              className="w-10 h-10 rounded-xl bg-white border border-[#bfc7d2]/60 shadow-xs flex items-center justify-center text-[#006194] hover:bg-[#eaedff] transition-all active:scale-95"
            >
              <Icon name="share" className="text-[20px]" />
            </button>
            <button
              onClick={() => showToast('Opening secondary administrative actions', 'tune')}
              aria-label="More options"
              className="w-10 h-10 rounded-xl bg-white border border-[#bfc7d2]/60 shadow-xs flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-all active:scale-95"
            >
              <Icon name="more_vert" className="text-[20px]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Patient & Encounter Hero Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm relative overflow-hidden">
            {/* Ambient Background Gradient Accent */}
            <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#cce5ff]/30 pointer-events-none blur-3xl" />

            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start gap-4">
                <div className="relative shrink-0">
                  <div className="w-16 h-16 rounded-full bg-[#89f5e7] text-[#00201d] flex items-center justify-center font-bold text-xl shadow-sm ring-4 ring-[#f2f3ff]">
                    AO
                  </div>
                  <div
                    className="absolute -bottom-1 -right-1 bg-[#006a61] text-white rounded-full p-1 shadow-sm"
                    title="Verified Identity"
                  >
                    <Icon name="verified" className="text-[14px] block" />
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                      Amara Okafor
                    </h2>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89f5e7] text-[#005049] text-xs font-bold shadow-xs shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping" />
                      In Operatory 01
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#3f4850] mt-0.5">
                    Female, 34y <span className="mx-1 text-[#bfc7d2]">•</span> Wuse 2 Resident
                  </p>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="font-mono text-xs bg-[#f2f3ff] border border-[#dae2fd]/60 px-2.5 py-0.5 rounded-md text-[#3f4850]">
                      ID: NG-990-281-LAG
                    </span>
                    <span className="font-mono text-xs bg-[#f2f3ff] border border-[#dae2fd]/60 px-2.5 py-0.5 rounded-md text-[#3f4850]">
                      MRN: DHA-2026-00451
                    </span>
                  </div>
                </div>
              </div>

              {/* Allergy Flash Banner */}
              <div className="bg-[#ffdad6]/80 border border-[#ffdad6] text-[#93000a] rounded-xl px-4 py-2.5 flex items-center justify-between shadow-xs">
                <div className="flex items-center gap-2.5">
                  <Icon name="warning" className="text-[20px] text-[#ba1a1a] shrink-0" />
                  <span className="text-sm font-bold">Penicillin Allergy Alert</span>
                </div>
                <span className="font-mono text-[11px] bg-white text-[#ba1a1a] px-2.5 py-0.5 rounded-md font-bold uppercase shadow-xs">
                  Chart Flag
                </span>
              </div>

              {/* Contact & Booking Metadata Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/50">
                <div className="flex flex-col">
                  <span className="text-xs text-[#3f4850]">Phone &amp; Comms</span>
                  <span className="text-sm font-bold text-[#131b2e] mt-0.5 truncate">+234 803 555 0192</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-[#3f4850]">Booking Channel</span>
                  <span className="text-sm font-bold text-[#006194] mt-0.5 truncate flex items-center gap-1.5">
                    <Icon name="smartphone" className="text-[16px]" />
                    DHA Discovery App
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Procedure Highlight Pill */}
          <div className="bg-[#006194] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
            <div className="relative z-10 flex items-start justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="dentistry" className="text-[24px] text-white" />
                </div>
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[#93ccff] font-bold block">
                    Targeted Procedure
                  </span>
                  <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-white leading-tight mt-0.5">
                    Direct Composite Resin
                  </h3>
                  <p className="text-xs sm:text-sm text-white/90 mt-1">
                    Mesio-Occlusal Surface{' '}
                    <span className="font-bold underline decoration-[#89f5e7] underline-offset-2">
                      Tooth #16
                    </span>{' '}
                    (Upper Right Molar)
                  </p>
                </div>
              </div>

              <div className="bg-white/15 px-3.5 py-2 rounded-xl text-center shrink-0">
                <span className="font-mono text-[10px] tracking-wider text-white/80 block font-bold">SESSION</span>
                <span className="text-base font-bold text-white">60m</span>
              </div>
            </div>
          </div>

          {/* Encounter Logistics Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#f2f3ff]">
              <div className="flex items-center gap-2">
                <Icon name="calendar_today" className="text-[#006194] text-[20px]" />
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Encounter Logistics</h3>
              </div>
              <span className="font-mono text-xs bg-[#f2f3ff] text-[#3f4850] px-2.5 py-0.5 rounded-md font-semibold">
                HQ #001
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Date & Time Slot */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#001d31] shrink-0">
                  <Icon name="schedule" className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#3f4850]">Scheduled Timing</p>
                  <p className="text-sm font-semibold text-[#131b2e] truncate">Thursday, 22 Oct 2026</p>
                  <p className="text-xs text-[#006194] font-medium">09:00 – 10:00 AM WAT</p>
                </div>
              </div>

              {/* Location & Suite */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                <div className="w-10 h-10 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0">
                  <Icon name="meeting_room" className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#3f4850]">Facility &amp; Operatory</p>
                  <p className="text-sm font-semibold text-[#131b2e] truncate">Suite 01 (Surgical Restorative)</p>
                  <p className="text-xs text-[#3f4850] truncate">Wuse 2 HQ • Aminu Kano Cres, Abuja</p>
                </div>
              </div>
            </div>

            {/* Care Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#006194] flex items-center gap-1 font-bold">
                    <Icon name="medical_services" className="text-[14px]" />
                    Lead Clinician
                  </span>
                  <p className="text-sm font-bold text-[#131b2e] mt-1 truncate">Dr. Daniel Okoro, DDS</p>
                  <p className="text-xs text-[#3f4850] truncate">Chief Restorative</p>
                </div>
                <span className="font-mono text-xs text-[#707881] mt-2 font-semibold">#DEN-78421</span>
              </div>

              <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-[#006a61] flex items-center gap-1 font-bold">
                    <Icon name="support_agent" className="text-[14px]" />
                    Chairside Nurse
                  </span>
                  <p className="text-sm font-bold text-[#131b2e] mt-1 truncate">Nurse Zainab Tariq, RN</p>
                  <p className="text-xs text-[#3f4850] truncate">IPC Certified</p>
                </div>
                <span className="font-mono text-xs text-[#006a61] mt-2 flex items-center gap-1 font-bold">
                  <Icon name="check_circle" className="text-[14px]" />
                  Ready
                </span>
              </div>
            </div>
          </div>

          {/* Live Operational Audit Trail */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#f2f3ff]">
              <div className="flex items-center gap-2">
                <Icon name="history_toggle_off" className="text-[#006194] text-[20px]" />
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                  Check-in Audit Trail
                </h3>
              </div>
              <span className="font-mono text-xs text-[#006a61] font-bold bg-[#89f5e7]/40 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse" />
                Live Flow
              </span>
            </div>

            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dae2fd]">
              {AUDIT_EVENTS.map((evt, idx) => (
                <div key={idx} className="relative flex items-start gap-3">
                  <span
                    className={`absolute -left-6 top-0.5 w-6 h-6 rounded-full flex items-center justify-center shadow-xs ${
                      evt.iconColor
                    } ${evt.isCurrent ? 'ring-4 ring-[#cce5ff]' : ''}`}
                  >
                    <Icon name={evt.icon} className="text-[13px]" />
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-bold ${
                          evt.isCurrent ? 'text-[#006194]' : 'text-[#131b2e]'
                        }`}
                      >
                        {evt.title}
                      </span>
                      <span
                        className={`font-mono text-xs ${
                          evt.isCurrent ? 'text-[#006194] font-bold' : 'text-[#707881]'
                        }`}
                      >
                        {evt.time}
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">{evt.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing & Payments */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm">
            <div className="flex items-center justify-between pb-2 border-b border-[#f2f3ff]">
              <div className="flex items-center gap-2">
                <Icon name="payments" className="text-[#006194] text-[20px]" />
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Billing &amp; Payments</h3>
              </div>
              <span className="text-xs bg-[#89f5e7] text-[#00201d] px-3 py-0.5 rounded-full font-bold flex items-center gap-1">
                <Icon name="check" className="text-[14px]" />
                Settled
              </span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3.5 mt-3 flex flex-col gap-2.5 border border-[#dae2fd]/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3f4850]">Estimated Procedure Fee</span>
                <span className="font-semibold text-[#131b2e]">₦45,000</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#3f4850]">Insurance Co-Pay (20%)</span>
                <span className="text-base font-bold text-[#006194]">₦9,000</span>
              </div>
              <div className="h-px bg-[#bfc7d2]/40 my-0.5" />
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#3f4850]">Method: POS Card Terminal</span>
                <span className="text-[#006a61] font-bold">#REC-88402</span>
              </div>
            </div>
          </div>

          {/* Administrative Notes (Front-Desk Staff) */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon name="sticky_note_2" className="text-[#3f4850] text-[20px]" />
                <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Front-Desk Notes</h3>
              </div>
              <span className="font-mono text-xs text-[#3f4850] bg-[#f2f3ff] px-2.5 py-0.5 rounded-md font-semibold">
                Internal Staff
              </span>
            </div>
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#dae2fd]/50">
              <p className="text-sm text-[#131b2e] italic leading-relaxed">
                &ldquo;Patient requested morning slot due to work commitment. Allergic to Penicillin; erythromycin substitute noted in chart. Parking validated for P1 bay.&rdquo;
              </p>
            </div>
          </div>

          {/* Clinical Safeguard & Privacy Notice */}
          <div className="bg-[#eaedff]/60 border border-[#dae2fd] rounded-2xl p-4 flex items-start gap-3 shadow-xs">
            <Icon name="lock" className="text-[#006194] text-[24px] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-[#131b2e]">Clinical EHR Privacy Notice</h4>
              <p className="text-xs text-[#3f4850] mt-1 leading-normal">
                Detailed odontogram charts, high-resolution radiographs, and pulp sensitivity test logs are secured in the Clinical Records Module (Section 9 &amp; 10). Front-desk staff maintain view-restricted access.
              </p>
            </div>
          </div>

          {/* Operational Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-2">
            <button
              onClick={() => showToast('Encounter marked Completed! Patient discharged.', 'task_alt')}
              className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Icon name="task_alt" className="text-[20px]" />
              <span>Mark Completed &amp; Discharge Patient</span>
            </button>

            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => showToast('Opening schedule manager for Amara Okafor...', 'calendar_month')}
                className="h-11 bg-white hover:bg-[#eaedff] border border-[#bfc7d2]/60 text-[#131b2e] rounded-xl font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Icon name="event_repeat" className="text-[18px] text-[#006194]" />
                <span>Reschedule</span>
              </button>
              <button
                onClick={() => showToast('Visit Summary Slip generated (PDF ready)', 'receipt_long')}
                className="h-11 bg-white hover:bg-[#eaedff] border border-[#bfc7d2]/60 text-[#131b2e] rounded-xl font-semibold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-1.5 transition-colors active:scale-95"
              >
                <Icon name="print" className="text-[18px] text-[#006a61]" />
                <span>Visit Summary</span>
              </button>
            </div>

            <button
              onClick={() => showToast('Cancellation workflow triggered', 'info')}
              className="w-full h-10 bg-[#ffdad6]/50 hover:bg-[#ffdad6] text-[#ba1a1a] rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors active:scale-98"
            >
              <Icon name="cancel" className="text-[18px] text-[#ba1a1a]" />
              <span>Cancel Appointment</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
