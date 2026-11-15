import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function ClinicOperationsDashboardScreen() {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<'wuse' | 'all'>('wuse');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px] text-[#00a392]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Top App Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#006194] text-white shadow-sm shrink-0">
              <Icon name="dentistry" className="text-[22px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#131b2e] truncate">
                  BrightSmile Dental OS
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#eaedff] text-[#006194] text-[10px] font-bold uppercase tracking-wider">
                  DHA
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-0.5 text-xs text-[#3f4850] hover:text-[#131b2e] transition-colors text-left"
              >
                <span className="font-medium truncate max-w-[140px] sm:max-w-xs">
                  {selectedBranch === 'wuse' ? 'Wuse 2 Branch (HQ)' : 'All Branches (Consolidated)'}
                </span>
                <Icon name="keyboard_arrow_down" className="text-[16px]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => triggerToast('No pending urgent notifications')}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Top Greeting & Branch Toggle Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#006194] text-xs font-semibold">
                <Icon name="calendar_today" className="text-[15px]" />
                <span>Thursday, 22 Oct 2026</span>
              </span>
              <span className="text-xs text-[#707881] hidden sm:inline">•</span>
              <span className="text-xs font-medium text-[#006a61] hidden sm:inline">Shift: 08:30 – 18:00</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight">
              Good morning, David
            </h1>
            <p className="text-xs text-[#3f4850] flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#6bd8cb]" />
              <span>Clinic Manager • Wuse 2 Dental Centre (HQ #001)</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Branch Quick Toggle Pill */}
            <div className="flex items-center p-1 rounded-2xl bg-[#eaedff] border border-[#dae2fd]">
              <button
                type="button"
                onClick={() => setSelectedBranch('wuse')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBranch === 'wuse'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Wuse 2 Main
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedBranch('all');
                  navigate('/clinic-operations/org-overview');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  selectedBranch === 'all'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                All Branches
              </button>
            </div>

            <button
              type="button"
              aria-label="Customize dashboard"
              onClick={() => navigate('/clinic-operations/customise')}
              className="w-10 h-10 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#3f4850] hover:text-[#006194] hover:bg-[#eaedff] transition-colors shadow-sm shrink-0"
              title="Dashboard Customisation"
            >
              <Icon name="tune" className="text-[20px]" />
            </button>
          </div>
        </div>

        {/* Operational Quick Actions Slider */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar">
          <button
            type="button"
            onClick={() => triggerToast('Quick Walk-in Registration opened')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
          >
            <Icon name="person_add" className="text-[18px]" />
            <span>+ Walk-in Intake</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/calendar')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#006194] text-xs font-bold shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
          >
            <Icon name="calendar_today" className="text-[18px]" />
            <span>+ Book Appt</span>
          </button>
          <button
            type="button"
            onClick={() => triggerToast('Patient QR/LifeCode Scanner initialized')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#131b2e] text-xs font-bold shadow-sm whitespace-nowrap active:scale-[0.98] transition-all"
          >
            <Icon name="qr_code_scanner" className="text-[18px]" />
            <span>Scanner</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/branch-overview')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#3f4850] text-xs font-bold shadow-sm whitespace-nowrap"
          >
            <Icon name="hub" className="text-[18px] text-[#006a61]" />
            <span>Branch Ops (16.4)</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/customise')}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#707881] text-xs font-medium shadow-sm whitespace-nowrap"
          >
            <Icon name="tune" className="text-[18px]" />
            <span>Customize</span>
          </button>
        </div>

        {/* Financial Manager Strip */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="payments" className="text-[24px]" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Daily Collections (Shift Total)
              </span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-xl sm:text-2xl font-black text-[#131b2e] font-mono">
                  ₦840,000
                </span>
                <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/30 px-2 py-0.5 rounded-full">
                  100% Rec'd
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 sm:border-l sm:border-[#dae2fd] sm:pl-6 w-full sm:w-auto justify-between sm:justify-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Cash &amp; POS
              </span>
              <span className="text-sm font-bold text-[#131b2e] font-mono">₦540,000</span>
              <span className="text-[10px] text-[#707881]">19 transactions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Bank Transfers
              </span>
              <span className="text-sm font-bold text-[#006a61] font-mono">₦300,000</span>
              <span className="text-[10px] text-[#707881]">7 confirmed</span>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                Unpaid Co-Pay
              </span>
              <span className="text-sm font-bold text-[#ba1a1a] font-mono">₦185,000</span>
              <span className="text-[10px] text-[#ba1a1a]">4 claims</span>
            </div>
          </div>
        </div>

        {/* Summary KPI Cards (4 Grid) */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Card 1: Today's Appointments */}
          <div
            onClick={() => navigate('/clinic-operations/calendar')}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#006194] transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Appts Today
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="event_available" className="text-[16px]" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                28
              </span>
              <span className="text-xs text-[#707881] ml-1">scheduled</span>
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                18 done
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold">
                6 live
              </span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold">
                1 no-show
              </span>
            </div>
          </div>

          {/* Card 2: Checked In / Live Flow */}
          <div
            onClick={() => triggerToast('Viewing active triage queue')}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#006194] transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Checked In
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#eaedff] text-[#006194] flex items-center justify-center">
                <Icon name="how_to_reg" className="text-[16px]" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                14
              </span>
              <span className="text-xs text-[#006a61] font-semibold ml-1">Live flow</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-[#3f4850]">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006194]" />
                <span>3 in chair</span>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                <span>4 waiting</span>
              </span>
            </div>
          </div>

          {/* Card 3: Active Clinicians */}
          <div
            onClick={() => triggerToast('Clinical duty roster active: 5 clinicians')}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#006194] transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Rostered Staff
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                <Icon name="badge" className="text-[16px]" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                5
              </span>
              <span className="text-xs text-[#707881] ml-1">On-Duty</span>
            </div>
            <div className="flex -space-x-1.5 overflow-hidden py-0.5">
              <div className="w-6 h-6 rounded-full bg-[#006194] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                DO
              </div>
              <div className="w-6 h-6 rounded-full bg-[#006a61] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                SB
              </div>
              <div className="w-6 h-6 rounded-full bg-[#006195] text-white flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                MJ
              </div>
              <div className="w-6 h-6 rounded-full bg-[#eaedff] text-[#131b2e] flex items-center justify-center text-[10px] font-bold ring-2 ring-white">
                +2
              </div>
            </div>
          </div>

          {/* Card 4: Action Tasks */}
          <div
            onClick={() => triggerToast('7 critical action tasks pending')}
            className="p-4 sm:p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between cursor-pointer hover:border-[#ba1a1a] transition-all"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Action Tasks
              </span>
              <div className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <Icon name="priority_high" className="text-[16px]" />
              </div>
            </div>
            <div className="my-2">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#ba1a1a] tracking-tight">
                7
              </span>
              <span className="text-xs text-[#ba1a1a] font-bold ml-1">Urgent</span>
            </div>
            <span className="text-xs text-[#3f4850] truncate">3 X-rays • 2 Plans • 2 Recalls</span>
          </div>
        </section>

        {/* Responsive Two-Column: Schedule Stream & Waiting Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Today's Live Schedule Stream */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Icon name="calendar_view_day" className="text-[#006194] text-[20px]" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                  Live Schedule Stream
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate('/clinic-operations/calendar')}
                className="text-xs font-semibold text-[#006194] hover:underline flex items-center gap-1"
              >
                <span>Full Calendar (16.6)</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Stream Item 1: Active In Chair */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#006a61]" />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e]">09:30 AM</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping" />
                      <span>In Chair • Active</span>
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#707881]">Chair 01</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">Amara Okafor</h3>
                    <p className="text-xs text-[#3f4850]">
                      DHA-2026-00451 • Composite Restoration #16
                    </p>
                  </div>
                  <Icon name="dentistry" className="text-[#006194] text-[20px]" />
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs text-[#707881]">
                  <span>Attending: Dr. Daniel Okoro</span>
                  <span className="text-[#006a61] font-bold">25m remaining</span>
                </div>
              </div>

              {/* Stream Item 2: Waiting */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#006194]" />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e]">10:15 AM</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold">
                      Checked In • Waiting 12m
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#707881]">Chair 02</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">Ibrahim Waziri</h3>
                    <p className="text-xs text-[#3f4850]">DHA-2026-0812 • Orthodontic Check</p>
                  </div>
                  <Icon name="medical_services" className="text-[#006195] text-[20px]" />
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs text-[#707881]">
                  <span>Attending: Dr. Sarah Bello</span>
                  <button
                    type="button"
                    onClick={() => triggerToast('Calling Ibrahim Waziri to Chair 02')}
                    className="px-2.5 py-1 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-[11px] font-bold shadow-sm"
                  >
                    Call to Operatory
                  </button>
                </div>
              </div>

              {/* Stream Item 3: Confirmed / Arriving */}
              <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-2 relative overflow-hidden">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#707881]" />
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e]">10:45 AM</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3f4850] text-[10px] font-medium">
                      Confirmed • Arriving
                    </span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#707881]">Chair 03</span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">Chinedu Eze</h3>
                    <p className="text-xs text-[#3f4850]">DHA-2026-1190 • Root Canal Consult</p>
                  </div>
                  <Icon name="biotech" className="text-[#707881] text-[20px]" />
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs text-[#707881]">
                  <span>Attending: Dr. Michael James</span>
                  <span className="text-[#006194] font-semibold">Pre-op tray ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Live Waiting Queue & Operatories Status */}
          <div className="lg:col-span-5 space-y-5">
            {/* Live Waiting Queue (4) */}
            <div className="p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse" />
                  <h3 className="text-sm font-bold text-[#131b2e]">Live Waiting Lounge (4)</h3>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Waiting queue dispatch desk active')}
                  className="text-xs font-bold text-[#006194] hover:underline"
                >
                  Manage Queue
                </button>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-[#cce5ff] text-[#001d31] font-mono font-bold text-xs">
                      Q-04
                    </span>
                    <div>
                      <p className="text-xs font-bold text-[#131b2e]">Ibrahim Waziri</p>
                      <p className="text-[11px] text-[#707881]">Orthodontics • Dr. Bello</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#707881] text-[10px] font-bold">
                    12m wait
                  </span>
                </div>

                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded-lg bg-[#86f2e4] text-[#006f66] font-mono font-bold text-xs">
                      Q-05
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-[#131b2e]">Fatima Garba</p>
                        <span className="text-[9px] bg-[#89f5e7] text-[#00201d] px-1.5 py-0.2 rounded font-bold">
                          Walk-in
                        </span>
                      </div>
                      <p className="text-[11px] text-[#707881]">General Triage • Dr. Okoro</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-white text-[#006a61] text-[10px] font-bold">
                    6m wait
                  </span>
                </div>
              </div>
            </div>

            {/* Operatories & Chairs Status (Grid 2x2) */}
            <div className="p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Operatories Status (4 Suites)
                </span>
                <span className="text-xs font-bold text-[#006a61]">3 / 4 In Service</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Suite 01</span>
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                  </div>
                  <span className="text-[10px] text-[#707881] mt-0.5">Restorative Unit</span>
                  <div className="mt-2 p-1.5 rounded-xl bg-white border border-[#dae2fd]">
                    <span className="text-[10px] font-bold text-[#ba1a1a] block">Occupied</span>
                    <span className="text-xs font-medium text-[#131b2e] truncate block">Dr. Okoro</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Suite 02</span>
                    <span className="w-2 h-2 rounded-full bg-[#ba1a1a]" />
                  </div>
                  <span className="text-[10px] text-[#707881] mt-0.5">Pediatric Suite</span>
                  <div className="mt-2 p-1.5 rounded-xl bg-white border border-[#dae2fd]">
                    <span className="text-[10px] font-bold text-[#ba1a1a] block">Occupied</span>
                    <span className="text-xs font-medium text-[#131b2e] truncate block">Dr. Bello</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#86f2e4]/20 border border-[#86f2e4] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Suite 03</span>
                    <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                  </div>
                  <span className="text-[10px] text-[#707881] mt-0.5">Surgical / CBCT</span>
                  <div className="mt-2 p-1.5 rounded-xl bg-white border border-[#86f2e4]">
                    <span className="text-[10px] font-bold text-[#006a61] block">Available</span>
                    <span className="text-xs font-medium text-[#006f66] truncate block">Sterilized Ready</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">Suite 04</span>
                    <span className="w-2 h-2 rounded-full bg-[#707881]" />
                  </div>
                  <span className="text-[10px] text-[#707881] mt-0.5">Hygiene Suite</span>
                  <div className="mt-2 p-1.5 rounded-xl bg-white border border-[#dae2fd]">
                    <span className="text-[10px] font-bold text-[#707881] block">Maintenance</span>
                    <span className="text-xs font-medium text-[#707881] truncate block">Sched 14:00</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section D: Operations Log & Management Hub Links */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Operations Log */}
          <div className="lg:col-span-8 p-5 sm:p-6 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="history" className="text-[#006194] text-[20px]" />
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Real-Time Operations Log
                </h3>
              </div>
              <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
                <span>Live Sync</span>
              </span>
            </div>

            <div className="space-y-3 divide-y divide-[#dae2fd]/60">
              <div className="flex items-start gap-3 pt-1">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="how_to_reg" className="text-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#131b2e]">Fatima Garba Registered</p>
                    <span className="text-[10px] font-mono text-[#707881]">09:12 AM</span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">
                    Walk-in triage intake assigned by Grace Ibrahim (Reception Desk)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3">
                <div className="w-9 h-9 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="sanitizer" className="text-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#131b2e]">Autoclave Cycle Validated</p>
                    <span className="text-[10px] font-mono text-[#707881]">08:45 AM</span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">
                    Suite 03 surgical cassette sterilization logged compliant (Batch #02, 134°C)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="assignment_turned_in" className="text-[18px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-[#131b2e]">Morning Clinical Handover</p>
                    <span className="text-[10px] font-mono text-[#707881]">08:30 AM</span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">
                    Dr. Daniel Okoro signed off daily prep and rostered 5 clinicians on shift
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Hub Navigation Cards */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block px-1">
              Management Navigation Hub
            </span>

            <div
              onClick={() => navigate('/clinic-operations/org-overview')}
              className="p-4 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm flex items-center gap-3 cursor-pointer hover:border-[#006194] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
                <Icon name="corporate_fare" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Org-Wide Overview (16.3)</h4>
                <p className="text-[11px] text-[#707881]">All 3 operating locations in Abuja</p>
              </div>
              <Icon name="arrow_forward" className="text-[#006194] text-[18px]" />
            </div>

            <div
              onClick={() => navigate('/clinic-operations/branch-overview')}
              className="p-4 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm flex items-center gap-3 cursor-pointer hover:border-[#006a61] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0">
                <Icon name="hub" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Branch Operations (16.4)</h4>
                <p className="text-[11px] text-[#707881]">Live operatory suites &amp; lounge monitor</p>
              </div>
              <Icon name="arrow_forward" className="text-[#006a61] text-[18px]" />
            </div>

            <div
              onClick={() => navigate('/clinic-operations/calendar')}
              className="p-4 rounded-2xl bg-white border border-[#dae2fd]/80 shadow-sm flex items-center gap-3 cursor-pointer hover:border-[#006195] transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0">
                <Icon name="calendar_month" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-bold text-[#131b2e]">Appointment Calendar (16.6)</h4>
                <p className="text-[11px] text-[#707881]">Chairside timeline &amp; patient previews</p>
              </div>
              <Icon name="arrow_forward" className="text-[#006195] text-[18px]" />
            </div>
          </div>
        </div>
      </main>

      {/* RegOps Bottom Navigation Dock */}
      <footer className="fixed bottom-0 w-full z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-t border-[#dae2fd] shadow-lg">
        <div className="max-w-md sm:max-w-xl mx-auto h-16 px-4 flex items-center justify-around text-xs">
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/dashboard')}
            className="flex flex-col items-center gap-1 text-[#006194] font-bold"
          >
            <Icon name="dashboard" className="text-[20px]" />
            <span className="text-[10px]">Overview</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/calendar')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="calendar_today" className="text-[20px]" />
            <span className="text-[10px]">Schedule</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/branch-overview')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="hub" className="text-[20px]" />
            <span className="text-[10px]">Branch Ops</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/org-overview')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="corporate_fare" className="text-[20px]" />
            <span className="text-[10px]">Org-Wide</span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/customise')}
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="tune" className="text-[20px]" />
            <span className="text-[10px]">Customize</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
export default ClinicOperationsDashboardScreen;
