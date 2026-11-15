import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const OperationalReportsDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState('wuse2');
  const [selectedCadence, setSelectedCadence] = useState('Oct 2026');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Executive Intelligence</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.36</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Operational Reports Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Compiling executive brief PDF...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>Executive Brief</span>
            </button>
            <button
              onClick={() => showToast('Weekly automated Monday dispatch scheduled.')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors shadow-sm"
            >
              <Icon name="forward_to_inbox" className="text-[16px]" />
              <span>Schedule Dispatch</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="analytics" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Scope & Cadence Bar */}
        <section className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="location_on" className="text-[20px]" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block">
                  Branch Scope
                </span>
                <select
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    showToast(`Scope switched to ${e.target.options[e.target.selectedIndex].text}`);
                  }}
                  className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] bg-transparent border-none focus:outline-none cursor-pointer p-0 pr-4"
                >
                  <option value="wuse2">Wuse 2 Main Branch (HQ #001)</option>
                  <option value="garki">Garki Clinic Branch</option>
                  <option value="maitama">Maitama VIP Dental Suite</option>
                  <option value="all">All Branches (Consolidated Group)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => {
                  const newCadence = selectedCadence === 'Oct 2026' ? 'Q3 2026' : 'Oct 2026';
                  setSelectedCadence(newCadence);
                  showToast(`Cadence switched to ${newCadence}`);
                }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-bold hover:bg-[#e2e7ff] transition-colors"
              >
                <Icon name="calendar_month" className="text-[16px]" />
                <span>{selectedCadence}</span>
                <Icon name="tune" className="text-[14px]" />
              </button>
            </div>
          </div>

          {/* Live Cadence Window Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-3.5 py-2 rounded-xl bg-[#f2f3ff] text-xs gap-2">
            <div className="flex items-center gap-2 text-[#3f4850]">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>
                Live Window: <strong className="text-[#131b2e]">01 Oct – 22 Oct 2026</strong>
              </span>
            </div>
            <span className="font-bold text-[#006a61]">MTD Cycle (Day 22 of 31)</span>
          </div>
        </section>

        {/* Quick Operational Health Score Widget */}
        <section className="bg-gradient-to-br from-[#006194] via-[#007bb9] to-[#287ab3] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute right-6 top-6 opacity-15 pointer-events-none">
            <Icon name="verified_user" className="text-[80px]" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="shield_spark" className="text-[20px] text-[#86f2e4]" />
                <span className="text-xs font-bold uppercase tracking-wider text-white/90">
                  Clinical &amp; Operational Index
                </span>
              </div>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold backdrop-blur-sm">
                Optimal
              </span>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-4xl md:text-5xl font-bold tracking-tight">
                94.8%
              </span>
              <span className="text-xs md:text-sm text-[#86f2e4] font-bold flex items-center gap-1">
                <Icon name="arrow_upward" className="text-[16px]" />
                +2.4% vs Sep 2026
              </span>
            </div>

            <p className="text-xs md:text-sm text-white/90 max-w-2xl leading-relaxed">
              High composite efficiency: Zero bio-safety deviations, seamless 9.4m patient turnaround, and strict operatory sterilisation adherence.
            </p>

            {/* Sub-metric meters */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="bg-black/20 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                <span className="block text-[11px] text-white/80">Punctuality</span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-white">
                  96.1%
                </span>
              </div>
              <div className="bg-black/20 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                <span className="block text-[11px] text-white/80">Turnaround</span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-white">
                  9.4 min
                </span>
              </div>
              <div className="bg-black/20 rounded-xl p-3 text-center backdrop-blur-sm border border-white/10">
                <span className="block text-[11px] text-white/80">Bio-Safety</span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#86f2e4]">
                  100%
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Intelligence Modules Section Header */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Icon name="view_quilt" className="text-[#006194] text-[20px]" />
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
              Intelligence Modules
            </h2>
          </div>
          <span className="text-xs font-semibold text-[#707881]">6 Domains Active</span>
        </div>

        {/* Responsive Grid of Intelligence Domain Cards (2-Col on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 1. Appointments & Attendance */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="calendar_today" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e2e7ff] text-[#006194]">
                        16.37
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                        Appointments &amp; Attendance
                      </h3>
                    </div>
                    <p className="text-xs text-[#707881]">Queue velocity &amp; compliance</p>
                  </div>
                </div>

                {/* Sparkline SVG */}
                <div aria-hidden="true" className="w-16 h-7 shrink-0 flex items-center justify-end">
                  <svg className="w-16 h-6 overflow-visible" fill="none" viewBox="0 0 80 28">
                    <path
                      d="M2 22 L14 18 L26 21 L38 12 L50 14 L62 6 L78 9"
                      stroke="#006194"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="78" cy="9" fill="#006194" r="3" />
                  </svg>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[#707881] block">Bookings</span>
                  <span className="font-bold text-[#131b2e]">624 MTD</span>
                </div>
                <div>
                  <span className="text-[#707881] block">Attendance</span>
                  <span className="font-bold text-[#006a61]">91.2%</span>
                </div>
                <div>
                  <span className="text-[#707881] block">No-shows</span>
                  <span className="font-bold text-[#ba1a1a]">34 (5.4%)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881] flex items-center gap-1">
                <Icon name="timer" className="text-[15px] text-[#006194]" />
                Avg Turnaround: <strong className="text-[#131b2e]">9.4m</strong>
              </span>
              <button
                onClick={() => showToast('Navigating to Appointments & Attendance (16.37)...')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>View Report</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>

          {/* 2. Patient Flow & Demographics */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006a61] shrink-0">
                    <Icon name="groups" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#86f2e4]/30 text-[#006f66]">
                        16.38
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                        Patient Flow &amp; Demographics
                      </h3>
                    </div>
                    <p className="text-xs text-[#707881]">Growth vectors &amp; intake</p>
                  </div>
                </div>

                {/* Sparkline SVG */}
                <div aria-hidden="true" className="w-16 h-7 shrink-0 flex items-center justify-end">
                  <svg className="w-16 h-6 overflow-visible" fill="none" viewBox="0 0 80 28">
                    <path
                      d="M2 24 L16 20 L28 17 L44 19 L56 10 L68 12 L78 4"
                      stroke="#006a61"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="78" cy="4" fill="#006a61" r="3" />
                  </svg>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[#707881] block">Total Visits</span>
                  <span className="font-bold text-[#131b2e]">1,480</span>
                </div>
                <div>
                  <span className="text-[#707881] block">New Intake</span>
                  <span className="font-bold text-[#006a61]">142 (+18%)</span>
                </div>
                <div>
                  <span className="text-[#707881] block">Pediatric</span>
                  <span className="font-bold text-[#131b2e]">32% (&lt;18)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881] flex items-center gap-1">
                <Icon name="pie_chart" className="text-[15px] text-[#006a61]" />
                Ratio: <strong className="text-[#131b2e]">54% Female</strong>
              </span>
              <button
                onClick={() => showToast('Navigating to Patient Flow & Demographics (16.38)...')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>View Report</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>

          {/* 3. Clinical Operations & Quality */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="medical_services" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e2e7ff] text-[#006194]">
                        16.39
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                        Clinical Ops &amp; Quality
                      </h3>
                    </div>
                    <p className="text-xs text-[#707881]">Procedure outputs &amp; bio-safety</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px] font-bold shrink-0">
                  Clean Audit
                </span>
              </div>

              {/* Procedure breakdown pills */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e]">
                  <strong>312</strong> Restorative
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e]">
                  <strong>84</strong> Endodontic
                </span>
                <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e]">
                  <strong>168</strong> Prophylaxis
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div className="flex items-center gap-2">
                  <Icon name="verified" className="text-[#006a61] text-[16px]" />
                  <div>
                    <span className="text-[#707881] block text-[11px]">Spore Test</span>
                    <span className="font-bold text-[#006a61]">100% Pass</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="health_and_safety" className="text-[#006194] text-[16px]" />
                  <div>
                    <span className="text-[#707881] block text-[11px]">Infections</span>
                    <span className="font-bold text-[#131b2e]">0 Incidents</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881]">Monthly Quality Peer-Review Done</span>
              <button
                onClick={() => showToast('Navigating to Clinical Operations & Quality (16.39)...')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>View Report</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>

          {/* 4. Financial Operations & Billing */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="account_balance_wallet" className="text-[20px]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#e2e7ff] text-[#006194]">
                        16.40
                      </span>
                      <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                        Financial Ops &amp; Billing
                      </h3>
                    </div>
                    <p className="text-xs text-[#707881]">Collections &amp; co-pays</p>
                  </div>
                </div>

                {/* Progress Ring SVG */}
                <div aria-hidden="true" className="relative w-9 h-9 shrink-0 flex items-center justify-center">
                  <svg className="w-9 h-9 -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#dae2fd]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#006194]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="76.8, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute text-[10px] font-bold text-[#006194]">77%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[#707881] block">MTD Collections</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#006194]">
                    ₦18,450,000
                  </span>
                </div>
                <div>
                  <span className="text-[#707881] block">Unpaid Co-pays</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#ba1a1a]">
                    ₦185,000
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881] flex items-center gap-1">
                <Icon name="contactless" className="text-[15px] text-[#006a61]" />
                Cashless: <strong className="text-[#131b2e]">98.4%</strong>
              </span>
              <button
                onClick={() => navigate('/clinic-operations/billing-invoices')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>Billing (16.31)</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>

          {/* 5. Staff Rota & Utilization */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="badge" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                      Staff Rota &amp; Utilization
                    </h3>
                    <p className="text-xs text-[#707881]">Duty shifts &amp; operatory coverage</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold shrink-0">
                  4 OT Alerts
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[#707881] block">Logged Hours</span>
                  <span className="font-bold text-[#131b2e]">1,240 hrs MTD</span>
                </div>
                <div>
                  <span className="text-[#707881] block">Operatory Coverage</span>
                  <span className="font-bold text-[#006a61]">96.2% Rate</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881]">Full roster active in Wuse 2</span>
              <button
                onClick={() => navigate('/clinic-operations/shift-timetable')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>View Rota (16.16)</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>

          {/* 6. Equipment & Bio-Safety Compliance */}
          <article className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="biotech" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#131b2e]">
                      Equipment &amp; Bio-Safety
                    </h3>
                    <p className="text-xs text-[#707881]">Autoclaves, X-ray calibrations</p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61] shrink-0">
                  <Icon name="verified" className="text-[18px]" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 bg-[#f2f3ff] rounded-xl p-3 text-xs">
                <div>
                  <span className="text-[#707881] block">Assets</span>
                  <span className="font-bold text-[#131b2e]">24 Units</span>
                </div>
                <div>
                  <span className="text-[#707881] block">Clearance</span>
                  <span className="font-bold text-[#006a61]">100% OK</span>
                </div>
                <div>
                  <span className="text-[#707881] block">Overdue</span>
                  <span className="font-bold text-[#131b2e]">0 Recalls</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between text-xs">
              <span className="text-[#707881]">Next calibration: Nov 14</span>
              <button
                onClick={() => navigate('/clinic-operations/equipment-register')}
                className="text-[#006194] font-bold flex items-center gap-1 hover:underline"
              >
                <span>Equipment (16.24)</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </article>
        </div>

        {/* Clinical Notice & Validation Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl border border-[#dae2fd] p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-full bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194] mt-0.5">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="min-w-0 space-y-1 text-xs text-[#3f4850]">
            <h4 className="font-bold text-sm text-[#131b2e]">Verified Clinical Registry Sync</h4>
            <p className="leading-relaxed">
              All diagnostic procedures &amp; sterilization batch tests reflect immutable practitioner logs digitally signed by Dr. E. Alabi (Lead Dental Surgeon, Lic #DEN-4402).
            </p>
          </div>
        </div>

        {/* Operational Actions */}
        <section className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Compiling executive brief for Wuse 2 Main Branch...')}
            className="w-full h-13 py-3.5 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
          >
            <Icon name="picture_as_pdf" className="text-[20px]" />
            <span>Generate Consolidated Executive Brief (PDF)</span>
          </button>

          <button
            type="button"
            onClick={() => showToast('Automated Monday 07:00 AM dispatch queued for management team.')}
            className="w-full h-12 rounded-xl bg-[#e2e7ff] hover:bg-[#dae2fd] text-[#006194] font-bold text-xs md:text-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
          >
            <Icon name="forward_to_inbox" className="text-[18px]" />
            <span>Schedule Automated Weekly Dispatch</span>
          </button>
        </section>
      </main>
    </div>
  );
};
