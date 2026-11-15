import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ViewMode = 'staff' | 'public';

interface LoungeQueueItem {
  id: string;
  queueNo: string;
  originalName: string;
  maskedName: string;
  statusBadge: string;
  statusBadgeColor: string;
  waitDuration: string;
  timeContext: string;
  provider: string;
  suite: string;
  providerStatus: string;
  isUrgent?: boolean;
  vitals?: string;
  action1Label?: string;
  action2Label?: string;
}

const QUEUE_DATA: LoungeQueueItem[] = [
  {
    id: 'q-04',
    queueNo: 'Q-04',
    originalName: 'Ibrahim Waziri (42y)',
    maskedName: 'I. W. (Adult)',
    statusBadge: 'Calling to Chair',
    statusBadgeColor: 'bg-[#cce5ff] text-[#001d31]',
    waitDuration: 'Wait: 12 min',
    timeContext: 'Appt: 10:00 AM • In-Lounge: 09:48 AM',
    provider: 'Dr. Sarah Bello',
    suite: 'Suite 02 • Orthodontics Chair',
    providerStatus: 'Ready',
    action1Label: 'Call to Suite 02',
    action2Label: 'Send Chime',
  },
  {
    id: 'q-05',
    queueNo: 'Q-05',
    originalName: 'Fatima Garba (Emergency)',
    maskedName: 'F. G. (Emergency)',
    statusBadge: 'Emergency Triage',
    statusBadgeColor: 'bg-[#ffdad6] text-[#93000a]',
    waitDuration: 'Wait: 14 min',
    timeContext: 'Walk-in Arrival: 09:12 AM • Acute Pulpitis',
    provider: 'Dr. Daniel Okoro',
    suite: 'Suite 01 • Emergency Operatory',
    providerStatus: 'Priority 1',
    isUrgent: true,
    action1Label: 'Escort to Op 01',
    action2Label: 'Update Wait',
  },
  {
    id: 'q-06',
    queueNo: 'Q-06',
    originalName: 'Emeka Nwosu (31y)',
    maskedName: 'E. N. (Adult)',
    statusBadge: 'Seated in Lounge',
    statusBadgeColor: 'bg-[#eaedff] text-[#006194]',
    waitDuration: 'Wait: 8 min',
    timeContext: 'Appt: 10:15 AM (Walk-in Consultation)',
    provider: 'Dr. Michael James',
    suite: 'Suite 03 • Hygiene & Scaling',
    providerStatus: 'Prep in 5m',
    action1Label: 'Call In',
    action2Label: 'Delay Notice',
  },
  {
    id: 'q-07',
    queueNo: 'Q-07',
    originalName: 'Yusuf Abubakar (58y)',
    maskedName: 'Y. A. (Adult)',
    statusBadge: 'Pre-op Vitals Taken',
    statusBadgeColor: 'bg-[#86f2e4] text-[#006f66]',
    waitDuration: 'Wait: 4 min',
    timeContext: 'Appt: 11:30 AM (Early Arrival 10:48 AM)',
    provider: 'Dr. Michael James',
    suite: 'Suite 03 (Scheduled)',
    providerStatus: 'Vitals Logged',
    vitals: 'BP: 122/80 • SpO2: 98% • Intake Complete',
    action1Label: 'Ready for Call (Queued)',
  },
];

export const WaitingRoomQueueScreen: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('staff');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in border border-white/10">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#007bb9] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="dentistry" className="text-[22px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-1 cursor-pointer hover:text-[#006194] transition-colors"
              >
                <span className="text-sm font-bold text-[#131b2e] truncate">Wuse 2 Main Branch</span>
                <Icon name="expand_more" className="text-[#707881] text-[18px]" />
              </div>
              <span className="text-xs text-[#006a61] font-semibold">Lounge &amp; Queue Control</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Opening notifications')}
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24">
        {/* Sub-header & Branch Context Strip */}
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Wuse 2 Branch • Live Lounge
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#3f4850] bg-[#e2e7ff] px-2.5 py-1 rounded-md font-semibold">
              <Icon name="schedule" className="text-[14px] text-[#006194]" />
              <span>10:00 AM WAT</span>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight mt-1">
            Waiting Room Queue
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4850]">Live patient lounge flow &amp; chairside dispatch</p>
        </div>

        {/* Mode Toggle (Staff Control vs Privacy Lobby) */}
        <div className="mb-4 bg-[#eaedff] p-1 rounded-2xl flex items-center shadow-inner max-w-md">
          <button
            type="button"
            onClick={() => setViewMode('staff')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'staff'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="badge" className="text-[18px]" />
            <span>Staff Mode</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('public')}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all ${
              viewMode === 'public'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="tv" className="text-[18px]" />
            <span>Lobby Display</span>
          </button>
        </div>

        {/* Lounge Capacity & Operational Metrics Bar */}
        <div className="mb-4 bg-[#f2f3ff] rounded-2xl border border-[#dae2fd]/70 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#dae2fd]/40">
            <div className="flex items-center gap-2">
              <Icon name="airline_seat_recline_normal" className="text-[#006194] text-[20px]" />
              <span className="text-xs sm:text-sm font-bold text-[#131b2e]">Lounge &amp; Chair Telemetry</span>
            </div>
            <span className="text-xs font-bold text-[#006a61] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
              Auto-synced
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* Metric 1 */}
            <div className="bg-white p-3 rounded-xl shadow-xs border border-[#dae2fd]/40 flex flex-col justify-between">
              <span className="text-xs text-[#707881] font-semibold">Seated in Lounge</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">5</span>
                <span className="text-xs text-[#3f4850]">patients</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full" style={{ width: '62%' }} />
              </div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-3 rounded-xl shadow-xs border border-[#dae2fd]/40 flex flex-col justify-between">
              <span className="text-xs text-[#707881] font-semibold">Operatories Active</span>
              <div className="flex items-baseline gap-1.5 mt-1">
                <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">
                  3 <span className="text-xs font-normal text-[#707881]">/ 4</span>
                </span>
                <span className="text-xs text-[#006a61] font-bold">75% Load</span>
              </div>
              <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-[#006a61] h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-white p-3 rounded-xl shadow-xs border border-[#dae2fd]/40 flex flex-col justify-between">
              <span className="text-xs text-[#707881] font-semibold">Average Wait</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">13</span>
                <span className="text-xs text-[#3f4850]">mins</span>
              </div>
              <span className="text-[11px] text-[#006a61] font-bold flex items-center gap-0.5 mt-1">
                <Icon name="check_circle" className="text-[13px]" /> Target &lt; 20m
              </span>
            </div>

            {/* Metric 4 */}
            <div className="bg-white p-3 rounded-xl shadow-xs border border-[#dae2fd]/40 flex flex-col justify-between">
              <span className="text-xs text-[#707881] font-semibold">Longest Wait</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">16</span>
                <span className="text-xs text-[#3f4850]">mins</span>
              </div>
              <span className="text-[11px] text-[#006194] font-semibold flex items-center gap-0.5 mt-1">
                <Icon name="timer" className="text-[13px]" /> Ibrahim (#Q-04)
              </span>
            </div>
          </div>
        </div>

        {/* Priority Alert / Triage Indicator Notice */}
        <div className="mb-4 bg-[#ffdad6] border border-[#ffdad6] text-[#93000a] p-3.5 rounded-2xl flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 animate-bounce">
              <Icon name="medical_services" className="text-[18px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-bold leading-tight">1 Active Triage Alert</span>
              <span className="text-xs text-[#93000a]/90">Walk-in emergency routed to Operatory 01</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/walk-in-queue')}
            className="flex items-center gap-1 text-xs font-bold hover:underline"
          >
            <span>View</span>
            <Icon name="chevron_right" className="text-[18px]" />
          </button>
        </div>

        {/* Queue Flow Section Header */}
        <div className="flex items-center justify-between pt-1 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              Live Queue
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#004b73] text-xs font-bold">
              4 in Dispatch
            </span>
          </div>
          <button
            type="button"
            onClick={() => showToast('Audio chime sounded in Waiting Lounge B')}
            className="flex items-center gap-1.5 text-[#006194] hover:text-[#007bb9] text-xs sm:text-sm font-bold active:opacity-75"
          >
            <Icon name="volume_up" className="text-[18px]" />
            <span>Chime All</span>
          </button>
        </div>

        {/* Queue Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
          {QUEUE_DATA.map((item) => {
            const displayName = viewMode === 'staff' ? item.originalName : item.maskedName;

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-[#dae2fd]/60 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                {/* Top Meta Banner */}
                <div
                  className={`px-4 py-2.5 flex items-center justify-between ${
                    item.isUrgent ? 'bg-[#ffdad6]/50' : 'bg-[#e2e7ff]/50'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-lg font-bold font-mono text-sm shadow-xs ${
                        item.isUrgent ? 'bg-[#ba1a1a] text-white' : 'bg-[#006194] text-white'
                      }`}
                    >
                      {item.queueNo}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          item.isUrgent ? 'bg-[#ba1a1a] animate-pulse' : 'bg-[#006194] animate-ping'
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-wider ${
                          item.isUrgent ? 'text-[#93000a]' : 'text-[#006194]'
                        }`}
                      >
                        {item.statusBadge}
                      </span>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-bold text-[#707881]">{item.waitDuration}</span>
                </div>

                {/* Core Details */}
                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-bold text-[#131b2e]">{displayName}</h3>
                      <p className="text-xs text-[#3f4850] mt-0.5 flex items-center gap-1">
                        <Icon name="event_available" className="text-[14px] text-[#006194]" />
                        <span>{item.timeContext}</span>
                      </p>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        item.isUrgent
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : 'bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      <Icon name={item.isUrgent ? 'vital_signs' : 'person'} className="text-[22px]" />
                    </div>
                  </div>

                  {/* Provider Info */}
                  <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name="dentistry" className="text-[#006a61] text-[20px] shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">{item.provider}</p>
                        <p className="text-[11px] text-[#3f4850] truncate">{item.suite}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 bg-[#89f5e7] text-[#00201d] text-xs font-bold rounded-md shrink-0">
                      {item.providerStatus}
                    </span>
                  </div>

                  {item.vitals && (
                    <div className="px-3 py-2 bg-[#f2f3ff] rounded-xl text-xs font-mono text-[#006a61] font-semibold">
                      {item.vitals}
                    </div>
                  )}

                  {/* Action CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#f2f3ff]">
                    {item.action1Label && (
                      <button
                        type="button"
                        onClick={() => showToast(`Action triggered: ${item.action1Label}`)}
                        className={`h-11 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs transition-all ${
                          item.isUrgent
                            ? 'bg-[#006a61] hover:bg-[#005049]'
                            : 'bg-[#006194] hover:bg-[#007bb9]'
                        }`}
                      >
                        <Icon name="meeting_room" className="text-[18px]" />
                        <span>{item.action1Label}</span>
                      </button>
                    )}
                    {item.action2Label && (
                      <button
                        type="button"
                        onClick={() => showToast(`Chime paged for ${item.queueNo}`)}
                        className="h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Icon name="notification_important" className="text-[18px] text-[#006194]" />
                        <span>{item.action2Label}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Privacy Mode Demonstration Banner */}
        <div className="mb-4 bg-[#eaedff] border border-[#dae2fd] rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#004b73] flex items-center justify-center shrink-0">
            <Icon name="shield" className="text-[22px]" />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">Public Display Privacy Safe</h4>
              <span className="text-[11px] bg-white px-2.5 py-0.5 rounded-full text-[#006a61] font-bold">
                HIPAA / NDPR Compliant
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              When switched to Public TV Mode, all lounge screens mask names as{' '}
              <strong className="text-[#131b2e]">I. W. (#Q-04)</strong> and{' '}
              <strong className="text-[#131b2e]">F. G. (#Q-05)</strong> to safeguard confidentiality while announcing audio chimes.
            </p>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/walk-in-registration')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Icon name="person_add" className="text-[20px]" />
            <span>+ Fast-Track Walk-in to Queue</span>
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#dae2fd]/60">
        <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/clinic-operations/dashboard')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[10px]">Overview</span>
          </button>
          <button
            onClick={() => navigate('/clinic-operations/calendar')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="calendar_today" className="text-[22px]" />
            <span className="text-[10px]">Schedule</span>
          </button>
          <button
            onClick={() => navigate('/clinic-operations/waiting-queue')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#006194] font-semibold transition-colors"
          >
            <Icon name="group" className="text-[22px]" />
            <span className="text-[10px]">Patients</span>
          </button>
          <button
            onClick={() => showToast('Navigating to Clinical')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="stethoscope" className="text-[22px]" />
            <span className="text-[10px]">Clinical</span>
          </button>
          <button
            onClick={() => showToast('Navigating to More Options')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="more_horiz" className="text-[22px]" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
