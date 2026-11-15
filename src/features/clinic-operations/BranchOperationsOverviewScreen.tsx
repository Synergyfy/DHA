import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type WorkspaceFilter = 'all' | 'lounge' | 'sterilization' | 'financials';

export function BranchOperationsOverviewScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<WorkspaceFilter>('all');
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

      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-operations/dashboard')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors sm:hidden"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
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
                  Wuse 2 Branch (HQ #001)
                </span>
                <Icon name="keyboard_arrow_down" className="text-[16px]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => triggerToast('Equipment and roster statuses synchronized')}
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
        {/* Branch Identity Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full bg-[#006194] text-white text-[10px] font-bold">
                  HQ #001
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  DHA Gazetted
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#131b2e] tracking-tight">
                Wuse 2 Main Branch
              </h1>
              <p className="text-xs text-[#3f4850] flex items-center gap-1.5">
                <Icon name="location_on" className="text-[16px] text-[#006194]" />
                <span>Plot 412 Aminu Kano Crescent, Wuse 2, Abuja</span>
              </p>
            </div>

            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
                <span>Open • Active Shift</span>
              </span>
              <span className="font-mono text-xs text-[#707881]">08:30 – 18:00</span>
            </div>
          </div>

          {/* Manager & Regulatory Footprint */}
          <div className="flex items-center justify-between pt-3 border-t border-[#dae2fd]/60 bg-[#f2f3ff] rounded-2xl p-3.5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                DM
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-[#707881] uppercase leading-none">
                  Branch Manager
                </span>
                <span className="text-xs font-bold text-[#131b2e] truncate mt-0.5">David Musa</span>
              </div>
            </div>
            <div className="text-right flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-[#707881] uppercase leading-none">
                License Reference
              </span>
              <span className="font-mono text-xs font-bold text-[#006194] truncate max-w-[160px] mt-0.5">
                #FCT-HEFAMAA-DENT-0842
              </span>
            </div>
          </div>
        </div>

        {/* Operational Metric Bento Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {/* Tile 1: Appointments Gauge */}
          <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[#707881]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Appointments</span>
              <Icon name="calendar_today" className="text-[#006194] text-[18px]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-none">
                  28
                </span>
                <span className="text-xs font-semibold text-[#006a61]">14 Done</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#f2f3ff] flex overflow-hidden mt-2.5">
                <div className="bg-[#006a61] h-full" style={{ width: '50%' }} title="Completed" />
                <div className="bg-[#006194] h-full" style={{ width: '14%' }} title="In Chair" />
                <div className="bg-[#89f5e7] h-full" style={{ width: '18%' }} title="Waiting" />
                <div className="bg-[#dae2fd] h-full" style={{ width: '18%' }} title="Upcoming" />
              </div>
              <div className="flex items-center justify-between font-mono text-[10px] text-[#707881] mt-1.5">
                <span>4 in-chair</span>
                <span>5 waiting</span>
              </div>
            </div>
          </div>

          {/* Tile 2: Walk-Ins */}
          <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[#707881]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Walk-Ins Today</span>
              <Icon name="how_to_reg" className="text-[#006a61] text-[20px]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-none">
                  6
                </span>
                <span className="text-[10px] font-mono font-bold bg-[#eaedff] text-[#006194] px-1.5 py-0.5 rounded">
                  Q-01 to Q-06
                </span>
              </div>
              <p className="text-xs text-[#3f4850] mt-2">Avg triage: 6.2 mins</p>
            </div>
          </div>

          {/* Tile 3: Suites Active */}
          <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[#707881]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Suites Active</span>
              <Icon name="meeting_room" className="text-[#006194] text-[20px]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-none">
                  3 / 4
                </span>
                <span className="text-xs text-[#707881]">Occupied</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#006a61] font-semibold mt-2">
                <Icon name="check_circle" className="text-[15px]" />
                <span>Suite 3 ready</span>
              </div>
            </div>
          </div>

          {/* Tile 4: Duty Roster */}
          <div className="rounded-3xl bg-white p-4 sm:p-5 border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between space-y-3">
            <div className="flex items-center justify-between text-[#707881]">
              <span className="text-[10px] font-bold uppercase tracking-wider">Duty Roster</span>
              <Icon name="badge" className="text-[#006195] text-[20px]" />
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#131b2e] leading-none">
                  10
                </span>
                <span className="text-xs text-[#707881]">On-Shift</span>
              </div>
              <p className="text-xs text-[#3f4850] truncate mt-2">5 Docs • 3 Nurses • 2 Desk</p>
            </div>
          </div>
        </section>

        {/* Workspace Filter Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'all', label: 'All Suites (4)' },
            { id: 'lounge', label: 'Waiting Lounge (5)' },
            { id: 'sterilization', label: 'Sterilization & Alerts' },
            { id: 'financials', label: 'Financials' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setActiveFilter(pill.id as WorkspaceFilter)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeFilter === pill.id
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd]'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* MODULE 1: Operatory Suites Live Layout */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Icon name="airline_seat_flat" className="text-[#006194] text-[20px]" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#131b2e]">
                Operatory Suites Live Layout
              </h2>
            </div>
            <span className="text-xs font-mono font-semibold text-[#006a61]">Real-time sync</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Suite 1 */}
            <div className="rounded-3xl bg-white p-5 border border-[#dae2fd]/80 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-xs font-mono">
                    01
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Suite 1 • Lead Restorative</h3>
                    <p className="text-xs text-[#707881]">Dr. Daniel Okoro</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#006194] text-white text-[10px] font-bold">
                  Occupied
                </span>
              </div>
              <div className="rounded-2xl bg-[#f2f3ff] p-3 flex items-center justify-between border border-[#dae2fd]/60">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">
                    Patient &amp; Treatment
                  </span>
                  <p className="text-xs font-bold text-[#131b2e] truncate mt-0.5">Amara Okafor</p>
                  <p className="text-[11px] text-[#006195] truncate">Composite Resin #16 (Occlusal)</p>
                </div>
                <div className="text-right pl-2 shrink-0">
                  <span className="text-[10px] font-mono text-[#707881] block">Elapsed</span>
                  <span className="text-sm font-bold text-[#006194]">34 mins</span>
                </div>
              </div>
            </div>

            {/* Suite 2 */}
            <div className="rounded-3xl bg-white p-5 border border-[#dae2fd]/80 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-bold text-xs font-mono">
                    02
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Suite 2 • Orthodontics</h3>
                    <p className="text-xs text-[#707881]">Dr. Sarah Bello</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  Occupied
                </span>
              </div>
              <div className="rounded-2xl bg-[#f2f3ff] p-3 flex items-center justify-between border border-[#dae2fd]/60">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">
                    Patient &amp; Treatment
                  </span>
                  <p className="text-xs font-bold text-[#131b2e] truncate mt-0.5">Ibrahim W.</p>
                  <p className="text-[11px] text-[#006a61] truncate">Aligner Fitting &amp; Tracking</p>
                </div>
                <div className="text-right pl-2 shrink-0">
                  <span className="text-[10px] font-mono text-[#707881] block">Elapsed</span>
                  <span className="text-sm font-bold text-[#006a61]">12 mins</span>
                </div>
              </div>
            </div>

            {/* Suite 3 (Available) */}
            <div className="rounded-3xl bg-white p-5 border border-[#86f2e4] shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#131b2e] flex items-center justify-center font-bold text-xs font-mono">
                    03
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Suite 3 • Diagnostics &amp; CBCT</h3>
                    <p className="text-xs text-[#006a61] font-semibold">Sterilized &amp; Ready</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                  Available
                </span>
              </div>
              <div className="rounded-2xl bg-[#f2f3ff] p-3 flex items-center justify-between border border-[#dae2fd]/60">
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon name="sanitizer" className="text-[#006a61] text-[20px] shrink-0" />
                  <div className="min-w-0">
                    <p className="text-xs text-[#131b2e]">Turnover complete at 10:48 AM</p>
                    <p className="text-[11px] text-[#707881] truncate">
                      Next: 11:30 AM (Patient David K.)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Suite 03 staged for patient intake')}
                  className="px-3 py-1 rounded-xl bg-white hover:bg-[#eaedff] text-[#006194] text-xs font-bold border border-[#dae2fd] shadow-sm"
                >
                  Stage
                </button>
              </div>
            </div>

            {/* Suite 4 */}
            <div className="rounded-3xl bg-white p-5 border border-[#dae2fd]/80 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#cde5ff] text-[#001d32] flex items-center justify-center font-bold text-xs font-mono">
                    04
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Suite 4 • Hygiene &amp; Scaling</h3>
                    <p className="text-xs text-[#707881]">Nurse Zainab Tariq</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#006195] text-white text-[10px] font-bold">
                  Occupied
                </span>
              </div>
              <div className="rounded-2xl bg-[#f2f3ff] p-3 flex items-center justify-between border border-[#dae2fd]/60">
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-[#707881] uppercase block">Procedure</span>
                  <p className="text-xs font-bold text-[#131b2e] truncate mt-0.5">
                    Ultrasonic Prophylaxis (Adult)
                  </p>
                </div>
                <div className="text-right pl-2 shrink-0">
                  <span className="text-[10px] font-mono text-[#707881] block">Elapsed</span>
                  <span className="text-sm font-bold text-[#006195]">18 mins</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MODULE 2: Waiting Lounge Monitor & MODULE 3: Equipment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Waiting Lounge Monitor */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="airline_seat_recline_normal" className="text-[#006a61] text-[20px]" />
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Waiting Lounge Monitor
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                5 Checked-in
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col">
                <span className="text-[10px] font-bold text-[#707881] uppercase">
                  Average Wait Time
                </span>
                <span className="text-lg font-bold text-[#131b2e] mt-1">13 mins</span>
              </div>
              <div className="p-3 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex flex-col">
                <span className="text-[10px] font-bold text-[#707881] uppercase">
                  Target Threshold
                </span>
                <span className="text-lg font-bold text-[#006a61] mt-1">&lt; 20 mins</span>
              </div>
            </div>

            {/* Next Up Priority Banner */}
            <div className="rounded-2xl bg-[#cce5ff]/50 border border-[#cce5ff] p-3.5 flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                  Q5
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-[#006194]">
                      NEXT UP
                    </span>
                    <span className="text-xs font-bold text-[#131b2e] truncate">Fatima Garba</span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] truncate">Walk-in Q-05 • Emergency Consult</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => triggerToast('Fatima Garba called to operatory chair')}
                className="px-3.5 py-1.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold shadow-sm"
              >
                Call to Chair
              </button>
            </div>
          </div>

          {/* Equipment & Critical Stock Alerts */}
          <div className="lg:col-span-6 rounded-3xl bg-white p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="inventory" className="text-[#006194] text-[20px]" />
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Equipment &amp; Critical Stock
                </h3>
              </div>
              <span className="text-xs font-bold text-[#ba1a1a]">1 Attention Required</span>
            </div>

            <div className="space-y-3">
              {/* Autoclave Card */}
              <div className="rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 p-3.5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0">
                    <Icon name="medical_services" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-[#131b2e]">Autoclave Unit 01</span>
                      <Icon name="verified" className="text-[#006a61] text-[15px]" />
                    </div>
                    <p className="text-[11px] text-[#707881] truncate">Spore test passed 08:00 AM</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                    Cycle #4 Running
                  </span>
                  <p className="text-[10px] font-mono text-[#707881] mt-0.5">134°C • 18 min left</p>
                </div>
              </div>

              {/* Low Stock Alert */}
              <div className="rounded-2xl bg-[#ffdad6]/60 border border-[#ffdad6] p-3.5 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name="warning" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#93000a] block">
                      Low Stock: Composite Flowable A2
                    </span>
                    <p className="text-[11px] text-[#410002] mt-0.5">
                      Only 3 packs remaining in sterile bay dispensary.
                    </p>
                    <span className="text-[10px] font-bold text-[#ba1a1a] mt-1 block">
                      Reorder threshold was 5 units
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => triggerToast('Emergency restock request sent to central depot')}
                  className="px-3 py-1.5 rounded-xl bg-white text-[#ba1a1a] font-bold text-xs shadow-sm shrink-0 border border-[#ffdad6]"
                >
                  Restock
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MODULE 4: Financial Summary */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="account_balance_wallet" className="text-[#006194] text-[20px]" />
              <div>
                <h3 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Branch Financial Summary
                </h3>
                <span className="text-[11px] text-[#707881]">
                  Authorized Manager View • Wuse 2 Dental Centre
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-1 rounded-full">
              Live Session
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#eaedff] flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border border-[#dae2fd]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Total Received Today
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-[#131b2e] font-mono">
                ₦840,000
              </span>
              <span className="text-xs font-bold text-[#006a61] flex items-center gap-0.5">
                <Icon name="trending_up" className="text-[14px]" />
                <span>+14% vs avg</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase">Cash &amp; POS</span>
                <p className="text-base font-bold text-[#131b2e] font-mono mt-0.5">₦540,000</p>
              </div>
              <span className="text-xs font-mono text-[#707881]">19 transactions</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase">Bank Transfers</span>
                <p className="text-base font-bold text-[#006a61] font-mono mt-0.5">₦300,000</p>
              </div>
              <span className="text-xs font-mono text-[#707881]">7 confirmed</span>
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
            className="flex flex-col items-center gap-1 text-[#707881] hover:text-[#131b2e] transition-colors"
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
            className="flex flex-col items-center gap-1 text-[#006194] font-bold"
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
export default BranchOperationsOverviewScreen;
