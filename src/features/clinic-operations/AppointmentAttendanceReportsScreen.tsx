import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const AppointmentAttendanceReportsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState('wuse2');
  const [timeWindow, setTimeWindow] = useState('October 2026 (MTD: 1 - 22 Oct)');
  const [benchmarkFilter, setBenchmarkFilter] = useState<'all' | 'wuse2' | 'garki' | 'maitama'>('wuse2');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    setIsExporting(true);
    showToast('Compiling Full Attendance Audit (XLS / PDF)...');
    setTimeout(() => {
      setIsExporting(false);
      showToast('Attendance Audit Packet downloaded successfully');
    }, 2000);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Clinical Intelligence</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.37</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Appointment & Attendance Reports
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name={isExporting ? 'refresh' : 'download'} className={`text-[16px] ${isExporting ? 'animate-spin' : ''}`} />
              <span>Export Audit</span>
            </button>
            <button
              onClick={() => showToast('Reminders configuration drawer opened')}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#3f4850] hover:bg-[#e2e7ff] transition-colors"
              title="Configure Reminders"
            >
              <Icon name="tune" className="text-[20px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Branch & Time Frame Selector Strip */}
        <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center justify-between sm:justify-start gap-3">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="location_on" className="text-[18px]" />
              </span>
              <div className="flex flex-col">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-[#131b2e]">
                  {selectedBranch === 'wuse2' ? 'Wuse 2 Main Branch' : selectedBranch === 'maitama' ? 'Maitama Specialist' : 'Garki Satellite'}
                </span>
                <span className="text-[11px] text-[#707881]">HQ Hub #001 · Abuja Central</span>
              </div>
            </div>
            <span className="bg-[#86f2e4] text-[#00201d] text-xs font-bold px-2.5 py-0.5 rounded-full">
              Primary
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Date Window */}
            <div className="flex items-center gap-2 bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#dae2fd]/30">
              <Icon name="calendar_month" className="text-[#707881] text-[18px]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-semibold text-[#3f4850] uppercase tracking-wider">Audit Window</span>
                <span className="text-xs font-bold text-[#131b2e]">{timeWindow}</span>
              </div>
              <button
                onClick={() => {
                  const next = timeWindow.includes('October') ? 'September 2026 (Full Month)' : 'October 2026 (MTD: 1 - 22 Oct)';
                  setTimeWindow(next);
                  showToast(`Switched audit window to: ${next}`);
                }}
                className="w-7 h-7 rounded-lg bg-[#dae2fd]/50 hover:bg-[#dae2fd] text-[#131b2e] flex items-center justify-center transition-colors ml-1"
                title="Change Window"
              >
                <Icon name="tune" className="text-[16px]" />
              </button>
            </div>

            {/* Compare Button */}
            <button
              onClick={() => {
                navigate('/clinic-operations/branch-comparison-reports');
              }}
              className="bg-[#eaedff] hover:bg-[#e2e7ff] text-[#006194] text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <span>Compare Branches</span>
              <Icon name="swap_horiz" className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* Benchmark Quick Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[#3f4850] font-medium shrink-0">Benchmark Filter:</span>
          <button
            onClick={() => { setBenchmarkFilter('wuse2'); setSelectedBranch('wuse2'); }}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-semibold ${
              benchmarkFilter === 'wuse2'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3f4850]'
            }`}
          >
            Wuse 2 (Active)
          </button>
          <button
            onClick={() => { setBenchmarkFilter('garki'); setSelectedBranch('garki'); }}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-semibold ${
              benchmarkFilter === 'garki'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3f4850]'
            }`}
          >
            + Garki (+2.1%)
          </button>
          <button
            onClick={() => { setBenchmarkFilter('maitama'); setSelectedBranch('maitama'); }}
            className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors font-semibold ${
              benchmarkFilter === 'maitama'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-[#eaedff] hover:bg-[#e2e7ff] text-[#3f4850]'
            }`}
          >
            + Maitama (-1.4%)
          </button>
        </div>

        {/* Attendance Target Performance Banner */}
        <section className="bg-gradient-to-r from-[#86f2e4]/30 via-[#86f2e4]/15 to-[#faf8ff] border border-[#86f2e4]/50 rounded-2xl p-5 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-[#86f2e4] flex items-center justify-center shrink-0 text-[#00201d]">
                <Icon name="verified" className="text-[26px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">Attendance KPI Met</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
                  <span className="text-xs text-[#006a61] font-medium">Optimal Cadence</span>
                </div>
                <div className="flex items-baseline gap-2.5 mt-1">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-extrabold text-[#131b2e]">91.2%</span>
                  <span className="text-xs text-[#3f4850]">Benchmark Target: &gt;88.0%</span>
                </div>
              </div>
            </div>
            <div className="sm:text-right">
              <span className="inline-block text-xs font-bold text-[#006a61] bg-[#ffffff] px-3 py-1.5 rounded-lg shadow-sm border border-[#86f2e4]/40">
                +3.2% vs target
              </span>
              <p className="text-[11px] text-[#707881] mt-1">Rolling 30-day cumulative rate</p>
            </div>
          </div>
        </section>

        {/* Key Metrics 2x2 Bento Grid (scales to 4 cols on desktop) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Booked */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Encounters</span>
              <span className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="event_available" className="text-[18px]" />
              </span>
            </div>
            <div>
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">624</div>
              <p className="text-xs text-[#3f4850] mt-1">Booked visits in window</p>
            </div>
          </div>

          {/* Card 2: Completed / Honored */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Honored Care</span>
              <span className="w-8 h-8 rounded-lg bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center">
                <Icon name="how_to_reg" className="text-[18px]" />
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">542</span>
                <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/30 px-1.5 py-0.5 rounded">86.9%</span>
              </div>
              <p className="text-xs text-[#3f4850] mt-1">Completed seated encounters</p>
            </div>
          </div>

          {/* Card 3: Rescheduled */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">Rescheduled</span>
              <span className="w-8 h-8 rounded-lg bg-[#cde5ff] text-[#006195] flex items-center justify-center">
                <Icon name="update" className="text-[18px]" />
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">48</span>
                <span className="text-xs font-semibold text-[#3f4850]">7.7%</span>
              </div>
              <p className="text-xs text-[#3f4850] mt-1">32 same-day · 16 &gt;24h</p>
            </div>
          </div>

          {/* Card 4: No-Shows */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850] mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider">No-Shows</span>
              <span className="w-8 h-8 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                <Icon name="person_off" className="text-[18px]" />
              </span>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#ba1a1a]">34</span>
                <span className="text-xs font-bold text-[#ba1a1a] bg-[#ffdad6] px-1.5 py-0.5 rounded">5.4%</span>
              </div>
              <p className="text-xs text-[#006a61] mt-1 flex items-center gap-0.5 font-medium">
                <Icon name="trending_down" className="text-[14px]" />
                <span>1.8% vs last month</span>
              </p>
            </div>
          </div>
        </section>

        {/* Section: Hourly Arrival Punctuality Curve & Booking Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visualization 1: Hourly Arrival Punctuality Curve (7 cols) */}
          <section className="lg:col-span-7 bg-[#ffffff] p-5 md:p-6 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                      Hourly Arrival Punctuality
                    </h2>
                    <Icon name="schedule" className="text-[#707881] text-[18px]" />
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">Arrival distribution vs on-time arrival rate</p>
                </div>
                <div className="bg-[#e2e7ff] px-3 py-1.5 rounded-xl text-right">
                  <span className="text-[10px] uppercase font-semibold text-[#3f4850] block">Avg Waiting Time</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-[#006194]">12.4 min</span>
                </div>
              </div>

              {/* Chart SVG */}
              <div className="relative w-full pt-4">
                <svg className="w-full h-36 md:h-44 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 130">
                  <defs>
                    <linearGradient id="curveGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#006194" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#006194" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="waitingBarGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#86f2e4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#86f2e4" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  {/* Subtle Grid Guide Lines */}
                  <line stroke="#eaedff" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="320" y1="20" y2="20" />
                  <line stroke="#eaedff" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="320" y1="60" y2="60" />
                  <line stroke="#eaedff" strokeWidth="1" x1="0" x2="320" y1="100" y2="100" />
                  {/* Volume Columns behind curve */}
                  <rect fill="#eaedff" height="35" rx="3" width="16" x="24" y="65" />
                  <rect fill="url(#waitingBarGradient)" height="75" rx="3" width="18" x="64" y="25" />
                  <rect fill="url(#waitingBarGradient)" height="68" rx="3" width="18" x="106" y="32" />
                  <rect fill="#eaedff" height="30" rx="3" width="16" x="150" y="70" />
                  <rect fill="url(#waitingBarGradient)" height="62" rx="3" width="18" x="192" y="38" />
                  <rect fill="url(#waitingBarGradient)" height="56" rx="3" width="18" x="234" y="44" />
                  <rect fill="#eaedff" height="22" rx="3" width="16" x="276" y="78" />
                  {/* Area Fill under On-Time Rate */}
                  <path d="M 24 60 Q 64 12, 106 18 T 150 55 T 192 24 T 234 32 T 284 72 L 284 100 L 24 100 Z" fill="url(#curveGradient)" />
                  {/* Primary Line for On-Time Rate */}
                  <path d="M 24 60 Q 64 12, 106 18 T 150 55 T 192 24 T 234 32 T 284 72" fill="none" stroke="#006194" strokeLinecap="round" strokeWidth="2.5" />
                  {/* Peak Point 1 (Morning 94%) */}
                  <circle cx="73" cy="14" fill="#006194" r="4.5" />
                  <circle cx="73" cy="14" fill="#ffffff" r="2" />
                  {/* Peak Point 2 (Afternoon 88%) */}
                  <circle cx="201" cy="24" fill="#006194" r="4.5" />
                  <circle cx="201" cy="24" fill="#ffffff" r="2" />
                  {/* X Axis Labels */}
                  <text fill="#707881" fontFamily="Inter" fontSize="9" textAnchor="middle" x="32" y="116">08:00</text>
                  <text fill="#006194" fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x="73" y="116">10:00</text>
                  <text fill="#707881" fontFamily="Inter" fontSize="9" textAnchor="middle" x="115" y="116">12:00</text>
                  <text fill="#707881" fontFamily="Inter" fontSize="9" textAnchor="middle" x="158" y="116">13:30</text>
                  <text fill="#006194" fontFamily="Inter" fontSize="9" fontWeight="600" textAnchor="middle" x="201" y="116">15:00</text>
                  <text fill="#707881" fontFamily="Inter" fontSize="9" textAnchor="middle" x="243" y="116">16:30</text>
                  <text fill="#707881" fontFamily="Inter" fontSize="9" textAnchor="middle" x="284" y="116">18:00</text>
                </svg>
              </div>
            </div>

            {/* Peak Band Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#dae2fd]/30 mt-3">
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#3f4850] block">Morning Peak Band</span>
                  <span className="text-xs font-bold text-[#131b2e]">09:00 - 11:30 AM</span>
                </div>
                <span className="text-xs font-bold text-[#006194] bg-[#ffffff] px-2.5 py-1 rounded-lg shadow-sm border border-[#cce5ff]">
                  94% On-time
                </span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase text-[#3f4850] block">Afternoon Peak Band</span>
                  <span className="text-xs font-bold text-[#131b2e]">14:00 - 16:30 PM</span>
                </div>
                <span className="text-xs font-bold text-[#006a61] bg-[#ffffff] px-2.5 py-1 rounded-lg shadow-sm border border-[#86f2e4]/50">
                  88% On-time
                </span>
              </div>
            </div>
          </section>

          {/* Visualization 2: Booking Channel Distribution (5 cols) */}
          <section className="lg:col-span-5 bg-[#ffffff] p-5 md:p-6 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                  Booking Channel Flow
                </h2>
                <span className="text-xs font-semibold text-[#3f4850] bg-[#f2f3ff] px-2.5 py-1 rounded-lg">
                  624 Sources
                </span>
              </div>

              {/* Segmented Proportion Bar */}
              <div className="w-full h-3.5 rounded-full bg-[#eaedff] overflow-hidden flex gap-0.5 mb-4">
                <div className="bg-[#006194] h-full" style={{ width: '58%' }} title="DHA App: 58%"></div>
                <div className="bg-[#287ab3] h-full" style={{ width: '26%' }} title="Desk / Phone: 26%"></div>
                <div className="bg-[#006a61] h-full" style={{ width: '12%' }} title="Walk-in Triage: 12%"></div>
                <div className="bg-[#bfc7d2] h-full" style={{ width: '4%' }} title="Inter-Branch: 4%"></div>
              </div>

              {/* Channel Breakdowns */}
              <div className="divide-y divide-[#dae2fd]/30">
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#006194] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Patient DHA Discovery App</span>
                      <span className="text-[11px] text-[#3f4850]">Direct mobile self-booking</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">58%</span>
                    <span className="text-[11px] text-[#707881] block">362 visits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#287ab3] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Reception Phone / Front Desk</span>
                      <span className="text-[11px] text-[#3f4850]">Inbound concierge & callbacks</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">26%</span>
                    <span className="text-[11px] text-[#707881] block">162 visits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#006a61] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Walk-in Emergency Triage</span>
                      <span className="text-[11px] text-[#3f4850]">Immediate acute relief routing</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">12%</span>
                    <span className="text-[11px] text-[#707881] block">75 visits</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#bfc7d2] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Inter-Branch Referral</span>
                      <span className="text-[11px] text-[#3f4850]">Specialist consult from Garki/Maitama</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">4%</span>
                    <span className="text-[11px] text-[#707881] block">25 visits</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Digital Conversion Share</span>
              <span className="font-bold text-[#006194]">84% Automated</span>
            </div>
          </section>
        </div>

        {/* Section: Operatory Utilization Breakdown & Mitigation Diagnostics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Visualization 3: Operatory Utilization Breakdown (7 cols) */}
          <section className="lg:col-span-7 bg-[#ffffff] p-5 md:p-6 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Operatory Chair Utilization
                  </h2>
                  <p className="text-xs text-[#3f4850] mt-0.5">Chair occupancy load & clinical lead</p>
                </div>
                <span className="bg-[#eaedff] text-[#006194] text-xs font-bold px-2.5 py-1 rounded-lg">
                  4 Active Suites
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {/* Suite 01 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between gap-3 border border-[#dae2fd]/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] font-bold text-xs flex items-center justify-center">
                        01
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#131b2e] block">Suite 01 · Restorative</span>
                        <span className="text-[11px] text-[#3f4850]">Dr. Okoro (Lead Prostho)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#006194]">92% Load</span>
                      <span className="text-[10px] text-[#707881] block">184h sched</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#dae2fd]/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#006194] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>

                {/* Suite 02 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between gap-3 border border-[#dae2fd]/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#89f5e7] text-[#00201d] font-bold text-xs flex items-center justify-center">
                        02
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#131b2e] block">Suite 02 · Orthodontics</span>
                        <span className="text-[11px] text-[#3f4850]">Dr. Bello (Aligners)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#006a61]">88% Load</span>
                      <span className="text-[10px] text-[#707881] block">146h sched</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#dae2fd]/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#006a61] h-full rounded-full" style={{ width: '88%' }}></div>
                  </div>
                </div>

                {/* Suite 03 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between gap-3 border border-[#dae2fd]/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#cde5ff] text-[#006195] font-bold text-xs flex items-center justify-center">
                        03
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#131b2e] block">Suite 03 · Oral Surgery</span>
                        <span className="text-[11px] text-[#3f4850]">Dr. James (Maxillofacial)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#131b2e]">74% Load</span>
                      <span className="text-[10px] text-[#707881] block">112h sched</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#dae2fd]/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#287ab3] h-full rounded-full" style={{ width: '74%' }}></div>
                  </div>
                </div>

                {/* Suite 04 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between gap-3 border border-[#dae2fd]/30">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#dae2fd] text-[#131b2e] font-bold text-xs flex items-center justify-center">
                        04
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[#131b2e] block">Suite 04 · Hygiene & IPC</span>
                        <span className="text-[11px] text-[#3f4850]">Nurse Tariq (Therapist)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-extrabold text-[#006a61]">86% Load</span>
                      <span className="text-[10px] text-[#707881] block">138h sched</span>
                    </div>
                  </div>
                  <div className="w-full bg-[#dae2fd]/50 h-2 rounded-full overflow-hidden">
                    <div className="bg-[#006a61] h-full rounded-full" style={{ width: '86%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Average Turnaround between appointments</span>
              <span className="font-bold text-[#006a61]">8.4 min</span>
            </div>
          </section>

          {/* Clinical Quality & Attendance Mitigation Card (5 cols) */}
          <section className="lg:col-span-5 bg-[#ffffff] p-5 md:p-6 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-8 h-8 rounded-lg bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center">
                  <Icon name="psychology_alt" className="text-[20px]" />
                </span>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                  No-Show Mitigation Diagnostics
                </h2>
              </div>

              <div className="space-y-3">
                {/* Insight Card 1 */}
                <div className="bg-[#86f2e4]/20 p-3.5 rounded-xl border border-[#86f2e4]/40 flex items-start gap-3">
                  <Icon name="mark_chat_read" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Automated Dual Reminder Protocol</span>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      WhatsApp + SMS 24-hour cadence reduced unexcused patient absences by <strong className="text-[#006a61] font-bold">28%</strong> over current reporting cycle.
                    </p>
                  </div>
                </div>

                {/* Insight Card 2 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#dae2fd]/30 flex items-start gap-3">
                  <Icon name="business_center" className="text-[#707881] text-[20px] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#131b2e] block">Primary Cancellation Factor</span>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      Midday corporate meeting conflicts in the Central Business District accounted for 14 of 34 missed encounters (41.1%).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleExport}
                className="flex-1 h-11 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Icon name="download" className="text-[18px]" />
                <span>Export Audit (XLS / PDF)</span>
              </button>
              <button
                onClick={() => showToast('Reminder Cadence Configuration opened')}
                className="flex-1 h-11 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="tune" className="text-[18px]" />
                <span>Configure Rules</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
