import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ArrivalItem {
  id: string;
  name: string;
  time: string;
  procedure: string;
  statusLabel: string;
  statusColor: string;
  actionLabel?: string;
  isCompleted?: boolean;
}

const EXPECTED_ARRIVALS: ArrivalItem[] = [
  {
    id: 'arr-1',
    name: 'Chinedu Eze',
    time: '10:45 AM',
    procedure: 'Root Canal Consult',
    statusLabel: 'Arriving Soon',
    statusColor: 'text-[#006194]',
    actionLabel: 'Check-in Now',
  },
  {
    id: 'arr-2',
    name: 'Aisha Mohammed',
    time: '13:30 PM',
    procedure: 'Pediatric Sealants',
    statusLabel: 'Scheduled (In 1h 45m)',
    statusColor: 'text-[#707881]',
  },
  {
    id: 'arr-3',
    name: 'Kalu Nnamdi',
    time: '09:30 AM',
    procedure: 'Scaling & Polishing',
    statusLabel: 'Completed & Discharged',
    statusColor: 'text-[#006a61]',
    isCompleted: true,
  },
];

export const ReceptionCheckInWorkspaceScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchCode, setSearchCode] = useState('NG-ABJ-112-909');
  const [isLoungeAssigning, setIsLoungeAssigning] = useState(false);
  const [isLoungeAssigned, setIsLoungeAssigned] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleAssignLounge = () => {
    setIsLoungeAssigning(true);
    setTimeout(() => {
      setIsLoungeAssigning(false);
      setIsLoungeAssigned(true);
      showToast('Yusuf Abubakar assigned to Waiting Lounge B • Audio Chime Sent');
    }, 900);
  };

  const handleScanTrigger = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      showToast('QR Code Verified! Patient Dossier Loaded.');
    }, 1200);
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
              <span className="text-xs text-[#006a61] font-semibold">Reception Check-in Desk</span>
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
              GI
            </div>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24">
        {/* Context / Subtitle Header */}
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse" />
              Live Intake Hub
            </span>
            <span className="text-xs text-[#3f4850] flex items-center gap-1">
              <Icon name="pin_drop" className="text-[15px] text-[#006194]" />
              Wuse 2 Branch
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight mt-1">
            Reception &amp; Check-in Desk
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4850]">
            Front-desk patient arrival and digital verification workspace
          </p>
        </div>

        {/* Real-Time Metrics Ribbon */}
        <div className="mb-4 bg-[#f2f3ff] rounded-2xl border border-[#dae2fd]/70 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Icon name="timelapse" className="text-[#006194] text-[18px]" />
              <span className="text-xs sm:text-sm font-bold text-[#131b2e]">Today&apos;s Flow Meter</span>
            </div>
            <span className="text-xs font-bold text-[#006a61] bg-white px-2.5 py-0.5 rounded-full shadow-xs">
              92% on-time pace
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
            <div className="bg-white rounded-xl py-2.5 px-2 shadow-xs border border-[#dae2fd]/40">
              <span className="block text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">28</span>
              <span className="text-[11px] font-semibold text-[#707881] mt-0.5 block">Scheduled</span>
            </div>
            <div className="bg-white rounded-xl py-2.5 px-2 shadow-xs border border-[#dae2fd]/40">
              <span className="block text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">14</span>
              <span className="text-[11px] font-semibold text-[#707881] mt-0.5 block">Checked In</span>
            </div>
            <div className="bg-white rounded-xl py-2.5 px-2 shadow-xs border border-[#dae2fd]/40">
              <span className="block text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006a61]">4</span>
              <span className="text-[11px] font-semibold text-[#707881] mt-0.5 block">In Lounge</span>
            </div>
            <div className="bg-white rounded-xl py-2.5 px-2 shadow-xs border border-[#dae2fd]/40">
              <span className="block text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#287ab3]">3</span>
              <span className="text-[11px] font-semibold text-[#707881] mt-0.5 block">Operatory</span>
            </div>
          </div>
        </div>

        {/* Quick Scan & Intake Trigger Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            disabled={isScanning}
            onClick={handleScanTrigger}
            className="flex items-center justify-center gap-2 h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.98] text-white rounded-xl font-bold text-sm shadow-sm transition-all"
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Scanning Lens Active...</span>
              </>
            ) : (
              <>
                <Icon name="qr_code_scanner" className="text-[20px]" />
                <span>Scan Patient QR</span>
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/walk-in-registration')}
            className="flex items-center justify-center gap-2 h-12 bg-[#e2e7ff] hover:bg-[#cce5ff] active:scale-[0.98] text-[#006194] rounded-xl font-bold text-sm shadow-xs transition-all"
          >
            <Icon name="confirmation_number" className="text-[20px]" />
            <span>+ Walk-in Ticket</span>
          </button>
        </div>

        {/* Search & Verify Encounter Bar */}
        <div className="mb-4">
          <div className="relative flex items-center">
            <Icon
              name="search"
              className="absolute left-3.5 text-[#707881] text-[20px] pointer-events-none"
            />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Scan or type LifeCode / #APT-2026-9812..."
              className="w-full h-12 pl-11 pr-24 rounded-xl bg-white border border-[#bfc7d2]/60 text-sm font-semibold text-[#131b2e] placeholder:text-[#707881] shadow-xs focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
            <button
              type="button"
              onClick={() => showToast(`Encounter ${searchCode} verified!`)}
              className="absolute right-2 px-3 py-1.5 rounded-lg bg-[#e2e7ff] text-[#006194] text-xs font-bold hover:bg-[#cce5ff] transition-colors"
            >
              Verify
            </button>
          </div>
        </div>

        {/* Two-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          {/* Column 1: Featured Patient Arrival - Immediate Intake Card */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
            <div>
              {/* Top banner ribbon */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#f2f3ff]">
                <div className="flex items-center gap-2">
                  <span className="flex h-2.5 w-2.5 rounded-full bg-[#006a61] animate-ping" />
                  <span className="text-xs font-bold font-mono text-[#006a61] uppercase tracking-wider">
                    Active Arrival Encounter
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-md bg-[#86f2e4] text-[#006f66] font-mono text-xs font-bold">
                  APT-2026-9812
                </span>
              </div>

              {/* Patient Bio Block */}
              <div className="flex items-start gap-3.5">
                <div className="w-14 h-14 rounded-xl bg-[#cce5ff] text-[#004b73] flex items-center justify-center font-bold text-lg shrink-0 shadow-xs ring-2 ring-[#f2f3ff]">
                  YA
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                      Yusuf Abubakar
                    </h2>
                    <Icon name="verified" className="text-[#006a61] text-[18px]" />
                  </div>
                  <p className="text-xs text-[#3f4850]">
                    38y Male • LifeCode{' '}
                    <span className="font-mono text-[#006194] font-bold">NG-ABJ-112-909</span>
                  </p>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#3f4850] flex-wrap">
                    <Icon name="schedule" className="text-[15px] text-[#006194]" />
                    <span className="font-bold text-[#131b2e]">11:30 AM</span>
                    <span className="text-[#bfc7d2]">•</span>
                    <span>Suite 03</span>
                    <span className="text-[#bfc7d2]">•</span>
                    <span className="text-[#006a61] font-semibold">Dr. Michael James</span>
                  </div>
                </div>
              </div>

              {/* Procedure Tag */}
              <div className="my-3.5 p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#001d31] flex items-center justify-center">
                    <Icon name="dentistry" className="text-[18px]" />
                  </span>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] block leading-tight">
                      Crown Preparation
                    </span>
                    <span className="text-[11px] text-[#707881]">Upper Right First Molar (#16)</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#dae2fd] text-[#006194] text-[11px] font-bold">
                  Operatory Ready
                </span>
              </div>

              {/* Verification Step Progress */}
              <div className="space-y-2.5 my-3 pt-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#707881] font-bold block">
                  Arrival Verification Stepper
                </span>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#89f5e7]/25 border border-[#89f5e7]/50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#006a61] flex items-center justify-center text-white shrink-0">
                      <Icon name="check" className="text-[14px]" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs sm:text-sm font-bold text-[#131b2e] block truncate">
                        1. Confirm Identity &amp; Photo ID
                      </span>
                      <span className="text-[11px] text-[#005049]">Digital National ID Match Verified</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006a61] shrink-0">Confirmed</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#89f5e7]/25 border border-[#89f5e7]/50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#006a61] flex items-center justify-center text-white shrink-0">
                      <Icon name="check" className="text-[14px]" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs sm:text-sm font-bold text-[#131b2e] block truncate">
                        2. Insurance &amp; Co-Pay Verification
                      </span>
                      <span className="text-[11px] text-[#005049]">NHIA Direct • 20% Co-Pay Cleared</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006a61] shrink-0">Cleared</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#89f5e7]/25 border border-[#89f5e7]/50">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-[#006a61] flex items-center justify-center text-white shrink-0">
                      <Icon name="check" className="text-[14px]" />
                    </div>
                    <div className="truncate">
                      <span className="text-xs sm:text-sm font-bold text-[#131b2e] block truncate">
                        3. Health Questionnaire &amp; Consent
                      </span>
                      <span className="text-[11px] text-[#005049]">Signed on iPad at 10:45 AM (No Allergies)</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#006a61] shrink-0">Complete</span>
                </div>
              </div>
            </div>

            {/* Action Button: Mark Arrived */}
            <button
              type="button"
              disabled={isLoungeAssigning}
              onClick={handleAssignLounge}
              className={`w-full mt-3 py-3.5 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                isLoungeAssigned
                  ? 'bg-[#006194] text-white'
                  : 'bg-[#006a61] hover:bg-[#005049] text-white'
              }`}
            >
              {isLoungeAssigning ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Routing to Waiting Lounge B...</span>
                </>
              ) : isLoungeAssigned ? (
                <>
                  <Icon name="check_circle" className="text-[20px]" />
                  <span>Patient Assigned • Chime Triggered</span>
                </>
              ) : (
                <>
                  <Icon name="airline_seat_recline_normal" className="text-[20px]" />
                  <span>Mark Arrived &amp; Assign to Waiting Lounge</span>
                </>
              )}
            </button>
          </div>

          {/* Column 2: Expected Arrivals & Front-Desk Handover Log */}
          <div className="flex flex-col gap-4">
            {/* Today's Expected Arrivals List */}
            <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-5 shadow-sm flex flex-col gap-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#f2f3ff]">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Queue &amp; Expected Arrivals
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#006194] text-xs font-bold">
                    3 items
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-operations/calendar')}
                  className="text-xs font-bold text-[#006194] flex items-center gap-0.5 hover:underline"
                >
                  <span>Full Schedule</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </button>
              </div>

              <div className="space-y-2.5">
                {EXPECTED_ARRIVALS.map((arr) => (
                  <div
                    key={arr.id}
                    className={`rounded-xl p-3 border flex items-center justify-between gap-3 ${
                      arr.isCompleted
                        ? 'bg-[#f2f3ff] border-[#dae2fd]/50 opacity-80'
                        : 'bg-white border-[#dae2fd]/60 shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center font-bold text-xs shrink-0">
                        {arr.name
                          .split(' ')
                          .map((w) => w[0])
                          .join('')}
                      </div>
                      <div className="min-w-0">
                        <span
                          className={`text-xs sm:text-sm font-bold text-[#131b2e] truncate block ${
                            arr.isCompleted ? 'line-through opacity-70' : ''
                          }`}
                        >
                          {arr.name}
                        </span>
                        <p className="text-xs text-[#3f4850] truncate">
                          {arr.time} • {arr.procedure}
                        </p>
                        <span className={`text-[11px] font-semibold ${arr.statusColor}`}>
                          {arr.statusLabel}
                        </span>
                      </div>
                    </div>

                    {arr.actionLabel ? (
                      <button
                        type="button"
                        onClick={() => showToast(`Checked in: ${arr.name}`)}
                        className="px-3 py-1.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold shrink-0 shadow-xs transition-all"
                      >
                        {arr.actionLabel}
                      </button>
                    ) : (
                      <span className="px-2 py-1 rounded-lg bg-[#f2f3ff] text-[#707881] text-xs font-mono shrink-0">
                        {arr.isCompleted ? 'Receipt Issued' : 'Standby'}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reception Front-Desk Handover Notes */}
            <div className="bg-[#f2f3ff] rounded-2xl border border-[#dae2fd]/70 p-4 sm:p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#001d31] flex items-center justify-center">
                    <Icon name="assignment" className="text-[18px]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#131b2e] leading-tight">
                      Front-Desk Handover Log
                    </h4>
                    <span className="text-[11px] text-[#707881]">Shift: Morning (08:00 - 14:00)</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-white text-[#006a61] text-xs font-bold shadow-xs">
                  Live Sync
                </span>
              </div>

              <div className="bg-white rounded-xl p-3.5 shadow-xs border border-[#dae2fd]/40">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-6 h-6 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center text-[10px] font-bold">
                    GI
                  </div>
                  <span className="text-xs font-bold text-[#131b2e]">Grace Ibrahim</span>
                  <span className="text-[10px] text-[#006a61] bg-[#89f5e7]/40 px-2 py-0.2 rounded font-bold">
                    On-Duty
                  </span>
                  <span className="text-[10px] text-[#707881] ml-auto">10:20 AM</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed italic">
                  &ldquo;Dr. Okoro running 4 mins ahead. Suite 03 CBCT scanner calibration completed at 10:15 AM.&rdquo;
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => showToast('Opening handover log editor')}
                  className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <Icon name="edit_note" className="text-[18px]" />
                  <span>Add Operational Handover Note</span>
                </button>
                <span className="text-[11px] text-[#707881]">Updated 12m ago</span>
              </div>
            </div>
          </div>
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
            onClick={() => navigate('/clinic-operations/reception-desk')}
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
