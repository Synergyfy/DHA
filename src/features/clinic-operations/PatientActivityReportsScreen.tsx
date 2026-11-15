import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const PatientActivityReportsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCohort, setSelectedCohort] = useState<string>('all');
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    setIsExporting(true);
    showToast('Generating signed demographic audit package (PDF)...');
    setTimeout(() => {
      setIsExporting(false);
      showToast('Demographic Census PDF generated and ready for download');
    }, 2000);
  };

  const handleCampaign = () => {
    showToast('Recare batch pipeline loaded: 624 overdue patients targeted.');
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Demographic Census</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.38</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Patient Activity Reports
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name={isExporting ? 'refresh' : 'picture_as_pdf'} className={`text-[16px] ${isExporting ? 'animate-spin' : ''}`} />
              <span>Export Census</span>
            </button>
            <button
              onClick={handleCampaign}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006194] text-xs font-semibold text-white hover:bg-[#007bb9] transition-colors"
            >
              <Icon name="campaign" className="text-[16px]" />
              <span>Launch Outreach</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Facility Context Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">Active Network Telemetry</span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-extrabold text-[#131b2e]">
              BrightSmile Dental Group
            </h2>
            <p className="text-xs text-[#3f4850] flex items-center gap-1.5 mt-1 font-medium">
              <Icon name="location_on" className="text-[16px] text-[#006194]" />
              <span>Wuse 2 HQ & Network Facilities · Abuja, Nigeria</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#eaedff] rounded-xl px-3.5 py-2 flex flex-col items-start md:items-end">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">Reporting Timeframe</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#006194] flex items-center gap-1 mt-0.5">
                <Icon name="calendar_today" className="text-[14px]" />
                <span>Q4 2026 (01 - 22 Oct)</span>
              </span>
            </div>
            <div className="bg-[#ffffff]/80 backdrop-blur-sm rounded-xl px-3.5 py-2 flex items-center gap-2 border border-[#dae2fd]/40">
              <Icon name="verified" className="text-[18px] text-[#006a61]" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#131b2e]">Verified Census</span>
                <span className="text-[10px] text-[#707881]">Live sync: 14m ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Metric Overview Cards (2x2 Grid, scales to 4 on desktop) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Active Base */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Active Base</span>
              <div className="w-8 h-8 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                <Icon name="group" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">8,420</div>
              <div className="inline-flex items-center gap-1 mt-1.5 bg-[#86f2e4]/40 text-[#00201d] px-2 py-0.5 rounded-full text-xs font-bold">
                <Icon name="trending_up" className="text-[14px]" />
                <span>+142 this month</span>
              </div>
            </div>
          </div>

          {/* Encounters MTD */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Encounters MTD</span>
              <div className="w-8 h-8 rounded-lg bg-[#e2e7ff] flex items-center justify-center text-[#006195]">
                <Icon name="stethoscope" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">1,480</div>
              <p className="text-xs text-[#3f4850] mt-1.5 font-medium">Completed visits across all chairs</p>
            </div>
          </div>

          {/* Returning Retention */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Retention Rate</span>
              <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/50 flex items-center justify-center text-[#006a61]">
                <Icon name="cached" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#006a61]">74.2%</div>
              <div className="flex items-center gap-1 mt-1.5 text-[#00201d] text-xs font-bold">
                <Icon name="check_circle" className="text-[14px] text-[#006a61]" />
                <span>High recare pacing</span>
              </div>
            </div>
          </div>

          {/* Intake Conversion */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">New Conversion</span>
              <div className="w-8 h-8 rounded-lg bg-[#cde5ff] flex items-center justify-center text-[#006195]">
                <Icon name="conversion_path" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#006194]">92.4%</div>
              <p className="text-xs text-[#3f4850] mt-1.5 font-medium">To active subscribed care plan</p>
            </div>
          </div>
        </section>

        {/* Section: Intake Velocity Trend & Demographic Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Intake Velocity Trend Chart (5 cols) */}
          <section className="lg:col-span-5 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Icon name="show_chart" className="text-[20px] text-[#006194]" />
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                      Intake Velocity Trend
                    </h3>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">New intake registration pacing (Oct 2026)</p>
                </div>
                <span className="bg-[#e2e7ff] text-[#131b2e] px-2.5 py-1 rounded-lg text-xs font-bold">
                  142 Registered
                </span>
              </div>

              {/* Custom Bar Component */}
              <div className="w-full bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex flex-col gap-4 border border-[#dae2fd]/30">
                <div className="flex items-end justify-between h-36 pt-4 px-2">
                  {/* W1 */}
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-xs font-bold text-[#131b2e]">38</span>
                    <div className="w-8 md:w-10 bg-[#007bb9] rounded-t-lg transition-all" style={{ height: '68%' }}></div>
                    <span className="text-xs font-semibold text-[#3f4850]">W1</span>
                  </div>
                  {/* W2 */}
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-xs font-bold text-[#131b2e]">44</span>
                    <div className="w-8 md:w-10 bg-[#007bb9] rounded-t-lg transition-all" style={{ height: '78%' }}></div>
                    <span className="text-xs font-semibold text-[#3f4850]">W2</span>
                  </div>
                  {/* W3 */}
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-xs font-bold text-[#006194]">48</span>
                    <div className="w-8 md:w-10 bg-[#006194] rounded-t-lg shadow-md transition-all" style={{ height: '86%' }}></div>
                    <span className="text-xs font-extrabold text-[#006194]">W3</span>
                  </div>
                  {/* W4 Projection */}
                  <div className="flex flex-col items-center gap-2 flex-1 group">
                    <span className="text-xs font-medium text-[#707881]">12*</span>
                    <div className="w-8 md:w-10 bg-[#dae2fd] rounded-t-lg border-2 border-dashed border-[#707881]/40 transition-all" style={{ height: '24%' }}></div>
                    <span className="text-xs font-medium text-[#707881]">W4 (Est)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#3f4850] pt-2 bg-[#eaedff]/70 rounded-xl px-3.5 py-2">
                  <span className="flex items-center gap-2 font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194] inline-block"></span>
                    <span>Weekly Peak: W3 (48 pts)</span>
                  </span>
                  <span className="font-bold text-[#006a61]">+9.1% MoM</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 text-xs text-[#707881] flex items-center justify-between">
              <span>Projection run rate</span>
              <span className="font-bold text-[#131b2e]">190 pts full month</span>
            </div>
          </section>

          {/* Demographic Breakdown: Age Cohorts & Gender Split (7 cols) */}
          <section className="lg:col-span-7 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="pie_chart" className="text-[20px] text-[#006195]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Demographic Distribution
                  </h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setSelectedCohort('all')}
                    className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                      selectedCohort === 'all' ? 'bg-[#86f2e4] text-[#00201d]' : 'bg-[#f2f3ff] text-[#3f4850]'
                    }`}
                  >
                    All Cohorts
                  </button>
                </div>
              </div>

              {/* Progress Bar Stack */}
              <div className="flex flex-col space-y-1.5 mb-4">
                <div className="h-3.5 w-full rounded-full overflow-hidden flex bg-[#eaedff] gap-0.5">
                  <div className="bg-[#287ab3] h-full" style={{ width: '26%' }} title="Pediatric 26%"></div>
                  <div className="bg-[#006194] h-full" style={{ width: '42%' }} title="Young Adults 42%"></div>
                  <div className="bg-[#006a61] h-full" style={{ width: '24%' }} title="Mature Adults 24%"></div>
                  <div className="bg-[#bfc7d2] h-full" style={{ width: '8%' }} title="Senior Care 8%"></div>
                </div>
                <div className="flex justify-between text-[11px] font-semibold text-[#707881] px-1">
                  <span>0y</span>
                  <span className="text-[#006194]">Young Adult Plurality (42%)</span>
                  <span>100y</span>
                </div>
              </div>

              {/* Cohort Card List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {/* Young Adults */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#006194] shrink-0"></span>
                      <span className="text-xs font-bold text-[#131b2e]">Young Adults (18–35y)</span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#006194]">42%</span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1.5 leading-relaxed">
                    Clear aligners, aesthetic composite veneers & micro-abrasion whitening.
                  </p>
                </div>

                {/* Pediatric */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#287ab3] shrink-0"></span>
                      <span className="text-xs font-bold text-[#131b2e]">Pediatric Care (0–17y)</span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#287ab3]">26%</span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1.5 leading-relaxed">
                    Pit & fissure sealants, interceptive ortho, fluoridation & space maintainers.
                  </p>
                </div>

                {/* Mature Adults */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] shrink-0"></span>
                      <span className="text-xs font-bold text-[#131b2e]">Mature Adults (36–60y)</span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#006a61]">24%</span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1.5 leading-relaxed">
                    Zirconia crowns, implant rehabilitation & subgingival periodontal scaling.
                  </p>
                </div>

                {/* Seniors */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#bfc7d2] shrink-0"></span>
                      <span className="text-xs font-bold text-[#131b2e]">Senior Care (60+y)</span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#707881]">8%</span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1.5 leading-relaxed">
                    Removable complete prosthodontics, relines & dry-mouth therapy.
                  </p>
                </div>
              </div>

              {/* Gender Split Meter */}
              <div className="bg-[#eaedff] rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#131b2e]">Gender Demographics</span>
                  <span className="text-[#3f4850]">Census Baseline</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name="female" className="text-[18px] text-[#006195]" />
                    <span className="font-bold text-[#131b2e]">54%</span>
                    <span className="text-[#3f4850]">Female</span>
                  </div>
                  <div className="h-2.5 flex-1 bg-[#dae2fd] rounded-full overflow-hidden flex gap-0.5">
                    <div className="bg-[#006195] h-full" style={{ width: '54%' }}></div>
                    <div className="bg-[#007bb9] h-full" style={{ width: '46%' }}></div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs">
                    <Icon name="male" className="text-[18px] text-[#006194]" />
                    <span className="font-bold text-[#131b2e]">46%</span>
                    <span className="text-[#3f4850]">Male</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Section: Geographic Distribution & Primary Care Motivators */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Geographic Distribution (6 cols) */}
          <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="near_me" className="text-[20px] text-[#006a61]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Residential Catchment Zones
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/40 px-2.5 py-1 rounded-lg">
                  Abuja Metropole
                </span>
              </div>

              {/* Catchment Map Banner Placeholder */}
              <div className="w-full h-32 bg-gradient-to-r from-[#006194]/20 via-[#86f2e4]/30 to-[#cce5ff]/50 rounded-xl relative overflow-hidden flex items-end p-3.5 mb-4 border border-[#dae2fd]">
                <div className="bg-[#ffffff]/90 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm">
                  <Icon name="pin_drop" className="text-[18px] text-[#ba1a1a]" />
                  <span className="text-xs font-bold text-[#131b2e]">Wuse 2 HQ Epicenter (Zone 1)</span>
                </div>
              </div>

              {/* Zone Analytics */}
              <div className="space-y-3.5">
                {/* Zone 1 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#131b2e]">Wuse 2 / Maitama Central</span>
                      <span className="text-[10px] font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">Primary</span>
                    </div>
                    <span className="font-bold text-[#131b2e]">48%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="bg-[#006194] h-full rounded-full" style={{ width: '48%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#3f4850]">Walk-in consultations & surrounding diplomatic residents</span>
                </div>

                {/* Zone 2 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#131b2e]">Garki / Central Area</span>
                      <span className="text-[10px] font-bold text-[#006a61] bg-[#86f2e4]/40 px-2 py-0.5 rounded">Commercial Core</span>
                    </div>
                    <span className="font-bold text-[#131b2e]">32%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="bg-[#006a61] h-full rounded-full" style={{ width: '32%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#3f4850]">Corporate desk workers & civil service HMO cohorts</span>
                </div>

                {/* Zone 3 */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#131b2e]">Asokoro / Airport Road Corridor</span>
                      <span className="text-[10px] font-medium text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded">Emerging Suburb</span>
                    </div>
                    <span className="font-bold text-[#131b2e]">20%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="bg-[#287ab3] h-full rounded-full" style={{ width: '20%' }}></div>
                  </div>
                  <span className="text-[11px] text-[#3f4850]">Family dental subscriptions & weekend booked blocks</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Catchment coverage</span>
              <span className="font-bold text-[#006194]">18.4 km radius</span>
            </div>
          </section>

          {/* Primary Care Motivators (6 cols) */}
          <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Icon name="clinical_notes" className="text-[20px] text-[#006194]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Primary Care Motivators
                  </h3>
                </div>
                <span className="text-xs text-[#3f4850] bg-[#f2f3ff] px-2.5 py-1 rounded-lg">
                  Chief Complaints
                </span>
              </div>

              {/* Grid 2x2 */}
              <div className="grid grid-cols-2 gap-3.5 mb-4">
                <div className="p-3.5 bg-[#f2f3ff] rounded-xl flex flex-col justify-between border border-[#dae2fd]/30">
                  <div className="flex items-center justify-between">
                    <Icon name="clean_hands" className="text-[20px] text-[#006a61]" />
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-extrabold text-[#006a61]">38%</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-[#131b2e]">Routine Recare</div>
                    <div className="text-[11px] text-[#3f4850] mt-0.5">Scale & polish checkups</div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#f2f3ff] rounded-xl flex flex-col justify-between border border-[#dae2fd]/30">
                  <div className="flex items-center justify-between">
                    <Icon name="notification_important" className="text-[20px] text-[#ba1a1a]" />
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-extrabold text-[#ba1a1a]">28%</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-[#131b2e]">Acute Pain</div>
                    <div className="text-[11px] text-[#3f4850] mt-0.5">Pulpitis & emergencies</div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#f2f3ff] rounded-xl flex flex-col justify-between border border-[#dae2fd]/30">
                  <div className="flex items-center justify-between">
                    <Icon name="auto_fix_high" className="text-[20px] text-[#006194]" />
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-extrabold text-[#006194]">22%</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-[#131b2e]">Aesthetic Alignment</div>
                    <div className="text-[11px] text-[#3f4850] mt-0.5">Smile design & ortho</div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#f2f3ff] rounded-xl flex flex-col justify-between border border-[#dae2fd]/30">
                  <div className="flex items-center justify-between">
                    <Icon name="assignment_turned_in" className="text-[20px] text-[#006195]" />
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-extrabold text-[#006195]">12%</span>
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-[#131b2e]">Specialist Review</div>
                    <div className="text-[11px] text-[#3f4850] mt-0.5">Second opinions & biopsy</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleCampaign}
                className="flex-1 h-11 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <Icon name="campaign" className="text-[18px]" />
                <span>Launch Recare Outreach</span>
              </button>
              <button
                onClick={handleExport}
                className="flex-1 h-11 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Icon name="picture_as_pdf" className="text-[18px]" />
                <span>Export Census PDF</span>
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
