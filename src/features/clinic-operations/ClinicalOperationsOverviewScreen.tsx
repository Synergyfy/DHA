import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ClinicalMetric {
  id: string;
  secNumber: string;
  title: string;
  count: number;
  statusLabel: string;
  icon: string;
  isAlert?: boolean;
  isPrimary?: boolean;
  isSecondary?: boolean;
  route?: string;
}

const CLINICAL_METRICS: ClinicalMetric[] = [
  {
    id: 'm-1',
    secNumber: 'Sec 8',
    title: 'Screenings',
    count: 8,
    statusLabel: '8 Done',
    icon: 'co_present',
    isSecondary: true,
    route: '/patient-dashboard',
  },
  {
    id: 'm-2',
    secNumber: 'Sec 10',
    title: 'Exams',
    count: 14,
    statusLabel: '14 Completed',
    icon: 'dentistry',
    isSecondary: true,
    route: '/clinical/examination',
  },
  {
    id: 'm-3',
    secNumber: 'Sec 9',
    title: 'Odontograms',
    count: 12,
    statusLabel: '12 Active',
    icon: 'grid_view',
    isPrimary: true,
    route: '/clinical/examination/charting',
  },
  {
    id: 'm-4',
    secNumber: 'Sec 11',
    title: 'Lab/X-Rays',
    count: 5,
    statusLabel: '5 Pending',
    icon: 'radiology',
    isAlert: true,
    route: '/investigations',
  },
  {
    id: 'm-5',
    secNumber: 'Sec 12',
    title: 'Summaries',
    count: 3,
    statusLabel: '3 in Queue',
    icon: 'clinical_notes',
    route: '/clinical/examination/summary-preview',
  },
  {
    id: 'm-6',
    secNumber: 'Sec 13',
    title: 'Tx Plans',
    count: 4,
    statusLabel: '4 Drafts',
    icon: 'rule',
    isPrimary: true,
    route: '/treatment-planning',
  },
  {
    id: 'm-7',
    secNumber: 'Live',
    title: 'In Progress',
    count: 3,
    statusLabel: 'Op 1, 2, 4',
    icon: 'airline_seat_recline_extra',
    isSecondary: true,
  },
  {
    id: 'm-8',
    secNumber: 'Sec 13',
    title: 'Follow-ups',
    count: 18,
    statusLabel: 'Due Week',
    icon: 'event_repeat',
    route: '/clinical/examination/follow-up',
  },
  {
    id: 'm-9',
    secNumber: 'Sec 20',
    title: 'Referrals',
    count: 2,
    statusLabel: '2 Pending',
    icon: 'outgoing_mail',
    route: '/clinic-operations/referrals',
  },
];

export const ClinicalOperationsOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState<'wuse2' | 'all'>('wuse2');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/clinic-operations')}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider truncate">
                  Clinic Hub
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                  Clinical Operations Overview
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('5 urgent lab/X-ray investigations pending')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full space-y-6">
          {/* Header Context & Live Pulse */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
                <span className="text-xs font-semibold text-[#006a61] tracking-wide uppercase">Command Active</span>
              </div>
              <span className="text-xs font-medium text-[#3f4850] bg-[#e2e7ff] px-3 py-1 rounded-full">
                Today, 22 Oct 2026
              </span>
            </div>

            <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">
              Clinical Operations Command • Wuse 2 Branch & Group Feed
            </span>

            <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              Clinical Operations
            </h1>

            <p className="text-sm text-[#3f4850]">
              Practice-wide clinical workflow throughput, approvals & provider queue monitoring across operatory suites.
            </p>
          </div>

          {/* Branch / Scope Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedBranch('wuse2')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 shrink-0 ${
                selectedBranch === 'wuse2'
                  ? 'bg-[#006194] text-white'
                  : 'bg-[#e2e7ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <Icon name="location_on" className="text-[16px]" />
              <span>Wuse 2 Branch</span>
            </button>
            <button
              onClick={() => setSelectedBranch('all')}
              className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-2 shrink-0 ${
                selectedBranch === 'all'
                  ? 'bg-[#006194] text-white'
                  : 'bg-[#e2e7ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <Icon name="hub" className="text-[16px]" />
              <span>All Branches Consolidated</span>
            </button>
          </div>

          {/* Infection Control & Safety Banner */}
          <div className="bg-[#86f2e4]/20 border border-[#86f2e4]/60 rounded-2xl p-4 flex items-start gap-3.5 shadow-sm">
            <div className="w-9 h-9 rounded-xl bg-[#86f2e4] flex items-center justify-center shrink-0 text-[#006f66]">
              <Icon name="verified" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#006f66] uppercase tracking-wider">
                  Safety Compliance Validated
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              </div>
              <p className="font-semibold text-sm md:text-base text-[#131b2e] mt-0.5 font-['Plus_Jakarta_Sans',sans-serif]">
                Class B Autoclave Spore Assay Valid • 100% Traceability
              </p>
              <p className="text-xs text-[#3f4850] mt-0.5">
                Sterilization batch #ST-8820 cleared at 06:45 AM. All chairside cassettes tagged & verified.
              </p>
            </div>
          </div>

          {/* 9 Clinical Metric Cards Grid (3x3 on mobile, 3x3 / 9-col on desktop) */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">
                Key Clinical Throughput
              </span>
              <span className="text-xs font-semibold text-[#006194]">9 Active Tracks</span>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-9 gap-3">
              {CLINICAL_METRICS.map((metric) => (
                <div
                  key={metric.id}
                  onClick={() => metric.route && navigate(metric.route)}
                  className={`bg-white rounded-2xl p-3.5 flex flex-col justify-between shadow-sm border border-[#dae2fd]/70 hover:shadow-md active:scale-95 transition-all min-h-[105px] relative overflow-hidden cursor-pointer ${
                    metric.isAlert ? 'ring-1 ring-[#ba1a1a]/30' : ''
                  }`}
                >
                  {metric.isAlert && (
                    <div className="absolute top-0 right-0 w-8 h-8 bg-[#ffdad6] rounded-bl-full flex items-start justify-end pr-1 pt-1">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-bold ${
                        metric.isAlert
                          ? 'text-[#ba1a1a]'
                          : metric.isPrimary
                          ? 'text-[#006194]'
                          : 'text-[#707881]'
                      }`}
                    >
                      {metric.secNumber}
                    </span>
                    <Icon
                      name={metric.icon}
                      className={`text-[20px] ${
                        metric.isAlert
                          ? 'text-[#ba1a1a]'
                          : metric.isPrimary
                          ? 'text-[#006194]'
                          : 'text-[#006a61]'
                      }`}
                    />
                  </div>

                  <div>
                    <div
                      className={`text-2xl font-bold font-['Plus_Jakarta_Sans',sans-serif] ${
                        metric.isAlert ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                      }`}
                    >
                      {metric.count}
                    </div>
                    <div className="text-xs text-[#3f4850] font-medium truncate">{metric.title}</div>
                  </div>

                  <span
                    className={`text-[10px] font-semibold truncate ${
                      metric.isAlert
                        ? 'text-[#ba1a1a]'
                        : metric.isSecondary
                        ? 'text-[#006a61]'
                        : 'text-[#006194]'
                    }`}
                  >
                    {metric.statusLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Live Chairside Clinical Flow Tracker */}
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">
                  Live Chairside Flow
                </span>
                <span className="px-2.5 py-0.5 bg-[#86f2e4]/40 text-[#006f66] rounded-full text-xs font-bold">
                  3 Suites Engaged
                </span>
              </div>
              <button
                onClick={() => showToast('Chairside streams refreshed with live biometric telemetry')}
                className="text-xs font-semibold text-[#006194] flex items-center gap-1 hover:underline"
              >
                <span>Refresh</span>
                <Icon name="sync" className="text-[16px]" />
              </button>
            </div>

            {/* Operatory Suites Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Suite 01 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#001d31] font-bold text-sm flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
                      01
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                          Suite 01 • Restorative
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                      </div>
                      <p className="text-xs text-[#3f4850]">Lead: Dr. Daniel Okoro</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-1 rounded-full font-semibold">
                    38m in chair
                  </span>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                      <Icon name="person" className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#131b2e] truncate">Amara Okafor</p>
                      <p className="text-xs text-[#3f4850] truncate">Mesio-occlusal Resin #16</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[11px] font-semibold text-[#006194] block">Stage 3 of 4</span>
                    <span className="text-xs font-semibold text-[#131b2e]">Curing & Finishing</span>
                  </div>
                </div>

                {/* Progress micro-bar */}
                <div className="w-full bg-[#e2e7ff] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006194] h-full rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Suite 02 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#cce5ff] text-[#001d31] font-bold text-sm flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
                      02
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                          Suite 02 • Orthodontics
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                      </div>
                      <p className="text-xs text-[#3f4850]">Lead: Dr. Sarah Bello</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-1 rounded-full font-semibold">
                    16m in chair
                  </span>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                      <Icon name="person" className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#131b2e] truncate">Ibrahim Waziri</p>
                      <p className="text-xs text-[#3f4850] truncate">Bracket replacement</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[11px] font-semibold text-[#006194] block">Stage 2 of 3</span>
                    <span className="text-xs font-semibold text-[#131b2e]">Wire Ligation</span>
                  </div>
                </div>

                <div className="w-full bg-[#e2e7ff] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006194] h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
                </div>
              </div>

              {/* Suite 04 */}
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-[#e2e7ff] text-[#3f4850] font-bold text-sm flex items-center justify-center font-['Plus_Jakarta_Sans',sans-serif]">
                      04
                    </span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                          Suite 04 • Hygiene
                        </span>
                        <span className="w-2 h-2 rounded-full bg-[#707881]"></span>
                      </div>
                      <p className="text-xs text-[#3f4850]">Nurse: Zainab Tariq</p>
                    </div>
                  </div>
                  <span className="text-xs text-[#3f4850] bg-[#eaedff] px-2.5 py-1 rounded-full font-semibold">
                    Turnover
                  </span>
                </div>

                <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#707881] shrink-0">
                      <Icon name="person" className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm text-[#131b2e] truncate">Kalu Nnamdi</p>
                      <p className="text-xs text-[#3f4850] truncate">Full Mouth Debridement</p>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="text-[11px] font-semibold text-[#006a61] block">Decontamination</span>
                    <span className="text-xs font-semibold text-[#006a61]">Complete (Turnover)</span>
                  </div>
                </div>

                <div className="w-full bg-[#e2e7ff] rounded-full h-2 overflow-hidden">
                  <div className="bg-[#006a61] h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Operational Focus Quick Links to Core Modules */}
          <div className="flex flex-col space-y-3">
            <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">
              Direct Module Access
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Odontogram (Sec 9) */}
              <div
                onClick={() => navigate('/clinical/examination/charting')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex items-center justify-between hover:bg-[#faf8ff] active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name="view_in_ar" className="text-[24px]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm md:text-base text-[#131b2e] block font-['Plus_Jakarta_Sans',sans-serif]">
                      Open Odontogram (Sec 9)
                    </span>
                    <span className="text-xs text-[#3f4850]">Interactive 32-tooth notation chart</span>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-[#707881] text-[22px] shrink-0" />
              </div>

              {/* Treatment Plans (Sec 13) */}
              <div
                onClick={() => navigate('/treatment-planning')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex items-center justify-between hover:bg-[#faf8ff] active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#86f2e4] flex items-center justify-center text-[#006f66] shrink-0">
                    <Icon name="assignment_turned_in" className="text-[24px]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm md:text-base text-[#131b2e] block font-['Plus_Jakarta_Sans',sans-serif]">
                      Treatment Plans (Sec 13)
                    </span>
                    <span className="text-xs text-[#3f4850]">4 pending supervisor sign-offs</span>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-[#707881] text-[22px] shrink-0" />
              </div>

              {/* Lab Results (Sec 11) */}
              <div
                onClick={() => navigate('/investigations')}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/70 flex items-center justify-between hover:bg-[#faf8ff] active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0">
                    <Icon name="biotech" className="text-[24px]" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm md:text-base text-[#131b2e] block font-['Plus_Jakarta_Sans',sans-serif]">
                      Review Lab Results (Sec 11)
                    </span>
                    <span className="text-xs text-[#ba1a1a] font-medium">5 Urgent CBCT & biopsy awaiting</span>
                  </div>
                </div>
                <Icon name="chevron_right" className="text-[#707881] text-[22px] shrink-0" />
              </div>
            </div>
          </div>

          {/* Clinical Leadership Shift Card */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 flex items-center justify-between flex-wrap gap-3 border border-[#dae2fd]/70 shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#006194] font-bold text-sm">
                DO
              </div>
              <div>
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block">
                  Lead Director On-Duty
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e]">
                  Dr. Daniel Okoro / David Musa
                </span>
              </div>
            </div>
            <span className="text-xs bg-[#dae2fd] px-3 py-1.5 rounded-xl text-[#131b2e] font-semibold">
              Shift 08:00 – 18:00
            </span>
          </div>
        </div>
      </main>
    </div>
  );
};
