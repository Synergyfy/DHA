import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const BranchComparisonReportsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'overview' | 'volume' | 'chair' | 'quality'>('overview');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingCsv, setIsExportingCsv] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    showToast('Compiling Multi-Branch Consolidated Audit (PDF)...');
    setTimeout(() => {
      setIsExportingPdf(false);
      showToast('Consolidated Multi-Branch Audit PDF downloaded');
    }, 2000);
  };

  const handleExportCsv = () => {
    setIsExportingCsv(true);
    showToast('Exporting Comparative Metrics CSV...');
    setTimeout(() => {
      setIsExportingCsv(false);
      showToast('Branch_Comparison_Q4_2026.csv downloaded');
    }, 1500);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Multi-Site Benchmarking</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.41</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Branch Comparison Reports
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name={isExportingPdf ? 'refresh' : 'picture_as_pdf'} className={`text-[16px] ${isExportingPdf ? 'animate-spin' : ''}`} />
              <span>Consolidated Audit</span>
            </button>
            <button
              onClick={handleExportCsv}
              disabled={isExportingCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006194] text-xs font-semibold text-white hover:bg-[#007bb9] transition-colors"
            >
              <Icon name={isExportingCsv ? 'refresh' : 'table_view'} className={`text-[16px] ${isExportingCsv ? 'animate-spin' : ''}`} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Scope & Header Metadata Pill */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="account_balance" className="text-[16px]" />
                <span>BrightSmile Network • Abuja Cluster</span>
              </span>
              <span className="bg-[#86f2e4] text-[#00201d] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                Live Audited
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="calendar_month" className="text-[20px] text-[#006194]" />
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-xl font-extrabold text-[#131b2e]">
                Q4 2026 MTD (1 – 22 Oct)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Date scope filter opened')}
              className="bg-[#ffffff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 border border-[#dae2fd]/50 transition-colors shadow-sm"
            >
              <span>Change Timeframe</span>
              <Icon name="tune" className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* Metric Selector Tabs */}
        <div className="bg-[#eaedff] p-1.5 rounded-2xl flex items-center gap-1.5 shadow-sm overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Overview & Yield
          </button>
          <button
            onClick={() => setActiveTab('volume')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all whitespace-nowrap ${
              activeTab === 'volume'
                ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Volume & Census
          </button>
          <button
            onClick={() => setActiveTab('chair')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all whitespace-nowrap ${
              activeTab === 'chair'
                ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Chair Load
          </button>
          <button
            onClick={() => setActiveTab('quality')}
            className={`flex-1 min-w-[100px] py-2.5 px-3 rounded-xl font-bold text-xs text-center transition-all whitespace-nowrap ${
              activeTab === 'quality'
                ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Clinical Quality
          </button>
        </div>

        {/* Cluster Aggregate KPI Bento Strip (2 cols on mobile, 3 on tablet/desktop) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Combined Revenue</span>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#006194]">
                ₦38.25M
              </span>
              <div className="flex items-center gap-1 mt-1 text-[#006a61] text-xs font-bold">
                <Icon name="trending_up" className="text-[16px]" />
                <span>+14.2% vs Q3 MTD</span>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Patient Encounters</span>
            <div className="mt-3">
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">
                1,480
              </span>
              <div className="flex items-center gap-1 mt-1 text-[#3f4850] text-xs font-semibold">
                <Icon name="airline_seat_recline_extra" className="text-[16px] text-[#006194]" />
                <span>85% Aggregate Chair Load</span>
              </div>
            </div>
          </div>

          <div className="bg-[#ffffff] p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between sm:col-span-2 lg:col-span-1">
            <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Top Performing Unit</span>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
                  Maitama Specialist
                </span>
                <span className="text-xs text-[#006a61] block font-semibold mt-0.5">Highest Yield: ₦185k/day</span>
              </div>
              <span className="bg-[#86f2e4] text-[#00201d] px-2.5 py-1 rounded-full text-xs font-extrabold">
                #1 Yield
              </span>
            </div>
          </div>
        </section>

        {/* Revenue Contribution Breakdown Bar */}
        <section className="bg-[#ffffff] p-5 md:p-6 rounded-2xl border border-[#dae2fd]/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                Revenue Contribution Breakdown
              </h3>
              <p className="text-xs text-[#3f4850]">Proportional share across 3 Abuja practice hubs</p>
            </div>
            <span className="text-xs font-bold text-[#006194] bg-[#eaedff] px-2.5 py-1 rounded-lg">
              3 Practices
            </span>
          </div>

          {/* Segmented Bar */}
          <div className="h-4 w-full rounded-full bg-[#dae2fd] overflow-hidden flex gap-0.5 mb-4">
            <div className="bg-[#006194] h-full transition-all" style={{ width: '48%' }} title="Wuse 2: 48%"></div>
            <div className="bg-[#287ab3] h-full transition-all" style={{ width: '30%' }} title="Maitama: 30%"></div>
            <div className="bg-[#006a61] h-full transition-all" style={{ width: '22%' }} title="Garki: 22%"></div>
          </div>

          {/* Legend Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#006194] shrink-0"></span>
                <span className="text-xs font-bold text-[#131b2e]">Wuse 2 Main</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold text-[#006194]">48%</span>
                <span className="text-xs font-bold text-[#131b2e]">₦18.45M</span>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#287ab3] shrink-0"></span>
                <span className="text-xs font-bold text-[#131b2e]">Maitama Specialist</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold text-[#287ab3]">30%</span>
                <span className="text-xs font-bold text-[#131b2e]">₦11.60M</span>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#006a61] shrink-0"></span>
                <span className="text-xs font-bold text-[#131b2e]">Garki Satellite</span>
              </div>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-extrabold text-[#006a61]">22%</span>
                <span className="text-xs font-bold text-[#131b2e]">₦8.20M</span>
              </div>
            </div>
          </div>
        </section>

        {/* Branch Performance Scorecards (3 cards) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e]">
                Branch Performance Scorecards
              </h2>
              <p className="text-xs text-[#3f4850]">Ranked by composite clinical & operational index</p>
            </div>
            <span className="text-xs text-[#707881] bg-[#eaedff] px-2.5 py-1 rounded-lg font-semibold">
              Oct 2026 Audit
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Card 1: Wuse 2 Main Campus */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-base">
                      #1
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">Wuse 2 Main</span>
                        <span className="bg-[#89f5e7] text-[#00201d] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Tier 2 Surgical
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707881]">HQ Node #001 • Aminu Kano Cres.</span>
                    </div>
                  </div>
                  <span className="bg-[#006194] text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                    96.8 OVR
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 bg-[#f2f3ff] rounded-xl px-3 mt-4 border border-[#dae2fd]/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Revenue</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">₦18.45M</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">75.3% realiz.</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Encounters</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">624</span>
                    <span className="text-[10px] text-[#3f4850]">14m wait</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Chair Load</span>
                    <span className="text-xs font-bold text-[#006194] mt-0.5">88%</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">100% Bio-safe</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#dae2fd]/30">
                <span className="flex items-center gap-1 text-[#006a61] font-bold">
                  <Icon name="verified" className="text-[16px]" />
                  <span>100% IPC Compliance</span>
                </span>
                <span className="font-semibold text-[#131b2e]">₦162k / chair day</span>
              </div>
            </div>

            {/* Card 2: Maitama Specialist Outpost */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#cde5ff] flex items-center justify-center text-[#006195] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-base">
                      #2
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">Maitama Specialist</span>
                        <span className="bg-[#94ccff] text-[#001d32] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Ortho & Ped
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707881]">Outpost Node #002 • Gana Street</span>
                    </div>
                  </div>
                  <span className="bg-[#006195] text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                    94.2 OVR
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 bg-[#f2f3ff] rounded-xl px-3 mt-4 border border-[#dae2fd]/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Revenue</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">₦11.60M</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">81.2% realiz.</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Encounters</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">376</span>
                    <span className="text-[10px] text-[#3f4850]">18m wait</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Chair Load</span>
                    <span className="text-xs font-bold text-[#006a61] mt-0.5">92%</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">100% Bio-safe</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#dae2fd]/30">
                <span className="flex items-center gap-1 text-[#006194] font-bold">
                  <Icon name="speed" className="text-[16px]" />
                  <span>Top Revenue Per Chair</span>
                </span>
                <span className="font-semibold text-[#006a61]">₦185k / chair day</span>
              </div>
            </div>

            {/* Card 3: Garki Satellite Clinic */}
            <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between gap-4">
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex gap-3 items-center">
                    <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#3f4850] font-extrabold font-['Plus_Jakarta_Sans',sans-serif] text-base">
                      #3
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">Garki Satellite</span>
                        <span className="bg-[#dae2fd] text-[#131b2e] text-[10px] font-bold px-2 py-0.5 rounded-full">
                          Preventive Hub
                        </span>
                      </div>
                      <span className="text-[11px] text-[#707881]">Satellite Node #003 • Area 11</span>
                    </div>
                  </div>
                  <span className="bg-[#707881] text-white text-xs font-extrabold px-2.5 py-1 rounded-full shadow-sm">
                    89.4 OVR
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 py-3 bg-[#f2f3ff] rounded-xl px-3 mt-4 border border-[#dae2fd]/30">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Revenue</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">₦8.20M</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">82.0% realiz.</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Encounters</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">480</span>
                    <span className="text-[10px] text-[#006a61] font-semibold">9m wait (Fast)</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase">Chair Load</span>
                    <span className="text-xs font-bold text-[#131b2e] mt-0.5">75%</span>
                    <span className="text-[10px] text-[#707881] font-semibold">98.4% Bio-safe</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-3 border-t border-[#dae2fd]/30">
                <span className="flex items-center gap-1 text-[#3f4850] font-medium">
                  <Icon name="schedule" className="text-[16px]" />
                  <span>Shortest Wait in Network</span>
                </span>
                <span className="font-semibold text-[#131b2e]">₦110k / chair day</span>
              </div>
            </div>
          </div>
        </section>

        {/* Operational Resource Balancing Recommendations */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
              <Icon name="psychology_alt" className="text-[20px]" />
            </span>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                Operational Resource Balancing Recommendations
              </h3>
              <p className="text-xs text-[#3f4850]">AI-driven optimization directives based on live branch analytics</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Recommendation Card 1 */}
            <div className="p-4 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="swap_horiz" className="text-[20px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Clinician Load Rebalance</span>
                  <span className="text-[10px] font-bold bg-[#cce5ff] text-[#006194] px-2 py-0.5 rounded-md">
                    Yield +8%
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                  Shift 1 Restorative clinician rotation from Garki (75% chair load) to Maitama due to 92% chair saturation and high specialty demand.
                </p>
                <button
                  onClick={() => showToast('Rebalancing schedule proposed to Clinical Director')}
                  className="mt-3 text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <span>Apply Schedule Directive</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </button>
              </div>
            </div>

            {/* Recommendation Card 2 */}
            <div className="p-4 bg-[#f2f3ff] rounded-xl border border-[#dae2fd]/30 flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="warning" className="text-[20px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Sterilizer Spore Assay Due</span>
                  <span className="text-[10px] font-bold bg-[#ffdad6] text-[#ba1a1a] px-2 py-0.5 rounded-md">
                    Due in 48h
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                  Garki autoclave unit #2 re-certification spore test due on 24 Oct 2026 to preserve 100% bio-safety accreditation status.
                </p>
                <button
                  onClick={() => showToast('Dispatched spore assay reminder alert to Garki Head Nurse')}
                  className="mt-3 text-xs font-bold text-[#ba1a1a] hover:underline flex items-center gap-1"
                >
                  <span>Dispatch Alert</span>
                  <Icon name="arrow_forward" className="text-[14px]" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Statutory Regulatory Seal & Actions */}
        <div className="bg-[#eaedff] p-5 rounded-2xl border border-[#dae2fd]/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0">
              <Icon name="verified_user" className="text-[24px]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                  DHA Multi-Branch Accreditation Seal
                </span>
                <span className="text-[10px] font-bold bg-[#ffffff] text-[#006a61] px-2 py-0.5 rounded shadow-sm border border-[#86f2e4]/50">
                  VALID
                </span>
              </div>
              <span className="text-xs text-[#707881] block mt-0.5">
                Federal Ministry of Health Registry #NG-ABJ-D772 · Certified Tri-Facility Network
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="flex-1 md:flex-initial h-11 px-5 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Icon name={isExportingPdf ? 'refresh' : 'picture_as_pdf'} className={`text-[18px] ${isExportingPdf ? 'animate-spin' : ''}`} />
              <span>Export Audit (PDF)</span>
            </button>
            <button
              onClick={handleExportCsv}
              disabled={isExportingCsv}
              className="flex-1 md:flex-initial h-11 px-5 bg-[#ffffff] hover:bg-[#f2f3ff] active:scale-[0.99] text-[#131b2e] text-xs font-bold rounded-xl flex items-center justify-center gap-2 border border-[#dae2fd] shadow-sm transition-all"
            >
              <Icon name={isExportingCsv ? 'refresh' : 'table_view'} className={`text-[18px] ${isExportingCsv ? 'animate-spin' : ''}`} />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
