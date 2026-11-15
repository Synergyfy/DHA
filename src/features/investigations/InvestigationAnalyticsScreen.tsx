import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

export function InvestigationAnalyticsScreen() {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState<string>('central');
  const [dateRange, setDateRange] = useState<string>('30d');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportPdf = () => {
    showToast('Compiling executive analytics briefing into confidential PDF...');
    setTimeout(() => {
      showToast('Executive Analytics Briefing (PDF) downloaded.');
    }, 1200);
  };

  return (
    <InvestigationShell
      pageTitle="Investigation Analytics & Executive KPIs"
      badgeCode="11.30"
      badgeLabel="Clinical Operations Intelligence"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="ANALYTICS-2025"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Facility & Filter Controller Bar */}
        <section className="bg-surface-container-low rounded-2xl p-4 sm:p-5 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="domain" className="text-xl" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono uppercase tracking-wider text-outline block">Facility Hub:</span>
              <select
                value={selectedFacility}
                onChange={(e) => {
                  setSelectedFacility(e.target.value);
                  showToast('Analytics refreshed for selected diagnostic facility.');
                }}
                className="bg-transparent font-bold text-sm text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="central">DHA Central Dental (All Radiology & Lab Suites)</option>
                <option value="barsha">Al Barsha Branch Diagnostic Suite</option>
                <option value="jumeirah">Jumeirah Specialized Imaging Center</option>
              </select>
            </div>
          </div>

          {/* Date Range Picker & Refresh */}
          <div className="flex items-center gap-2">
            <select
              value={dateRange}
              onChange={(e) => {
                setDateRange(e.target.value);
                showToast('Timeframe updated: recalculating SLA & volumes...');
              }}
              className="bg-surface-container-lowest text-xs font-semibold text-on-surface px-3 py-2 rounded-xl border border-outline-variant/30 shadow-xs focus:outline-none"
            >
              <option value="7d">Last 7 Days (STAT Overview)</option>
              <option value="30d">Last 30 Days (16 Jan – 16 Feb 2025)</option>
              <option value="90d">Quarter 1 (Full 90-Day Trend)</option>
            </select>

            <button
              type="button"
              onClick={() => showToast('Analytics data live-synchronized with DHA central data lake.')}
              className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center text-primary border border-outline-variant/30 shadow-xs hover:bg-surface-container transition-colors"
              title="Refresh Analytics"
            >
              <Icon name="sync" className="text-base" />
            </button>

            <button
              type="button"
              onClick={handleExportPdf}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="download" className="text-sm" />
              <span className="hidden sm:inline">Export PDF</span>
            </button>
          </div>
        </section>

        {/* Executive Performance Summary (2x2 Compact Bento Grid) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Diagnostic Volume */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline">Diag. Volume</span>
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="radiology" className="text-base" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">248</span>
                <span className="text-xs text-secondary flex items-center font-bold">
                  <Icon name="arrow_upward" className="text-xs" />
                  14%
                </span>
              </div>
              <span className="text-xs text-on-surface-variant mt-1 block">vs prior 30d window</span>
            </div>
          </div>

          {/* KPI 2: SLA Turnaround */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline">Median SLA</span>
              <div className="w-8 h-8 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <Icon name="timelapse" className="text-base" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                  1.4<span className="text-sm font-normal text-on-surface-variant ml-1">hrs</span>
                </span>
                <span className="text-xs text-secondary font-bold">94.2% On-Time</span>
              </div>
              <span className="text-xs text-on-surface-variant mt-1 block">Benchmark: &lt; 4.0 hrs</span>
            </div>
          </div>

          {/* KPI 3: Sign-Off Review Rate */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline">Review Rate</span>
              <div className="w-8 h-8 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                <Icon name="verified" className="text-base" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">98.1%</span>
                <span className="text-xs text-secondary font-bold">Rapid</span>
              </div>
              <span className="text-xs text-on-surface-variant mt-1 block">Avg sign-off: 2.2 hrs</span>
            </div>
          </div>

          {/* KPI 4: Diagnostic Revenue */}
          <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-outline">Diag. Revenue</span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Icon name="payments" className="text-base" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-on-surface tracking-tight">AED 34,250</div>
              <span className="text-xs text-secondary font-bold mt-1 block">+8.6% yield / scan</span>
            </div>
          </div>
        </section>

        {/* Section 1 & Section 2 Grid: Modality Volume & SLA Speed */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Section 1: Modality Distribution Chart (6 Cols) */}
          <section className="lg:col-span-6 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary"></div>
                <h3 className="text-base font-bold text-on-surface">Volume by Modality</h3>
              </div>
              <span className="text-xs font-mono font-bold text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded-full">
                248 Total Studies
              </span>
            </div>

            {/* Segmented Visual Bar */}
            <div className="w-full h-3 rounded-full bg-surface-container-high overflow-hidden flex shadow-inner">
              <div className="h-full bg-primary" style={{ width: '45%' }} title="Bitewing/PA 45%"></div>
              <div className="h-full bg-primary-container" style={{ width: '19%' }} title="Panoramic OPG 19%"></div>
              <div className="h-full bg-secondary" style={{ width: '14%' }} title="CBCT 3D 14%"></div>
              <div className="h-full bg-tertiary" style={{ width: '13%' }} title="Blood Panels 13%"></div>
              <div className="h-full bg-outline" style={{ width: '9%' }} title="Clinical Photo 9%"></div>
            </div>

            {/* Detailed Modality Breakdown List */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded bg-primary shrink-0"></span>
                  <span className="font-semibold text-on-surface truncate">Dental Radiography (Bitewing/PA)</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-on-surface">112</span>
                  <span className="text-outline w-9 text-right font-medium">45%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded bg-primary-container shrink-0"></span>
                  <span className="font-semibold text-on-surface truncate">Panoramic OPG</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-on-surface">48</span>
                  <span className="text-outline w-9 text-right font-medium">19%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded bg-secondary shrink-0"></span>
                  <span className="font-semibold text-on-surface truncate">Advanced CBCT 3D Scan</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-on-surface">34</span>
                  <span className="text-outline w-9 text-right font-medium">14%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded bg-tertiary shrink-0"></span>
                  <span className="font-semibold text-on-surface truncate">Laboratory Blood Panels</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-on-surface">32</span>
                  <span className="text-outline w-9 text-right font-medium">13%</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded-xl">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2.5 h-2.5 rounded bg-outline shrink-0"></span>
                  <span className="font-semibold text-on-surface truncate">Clinical Photography Series</span>
                </div>
                <div className="flex items-center gap-2 font-mono shrink-0">
                  <span className="font-bold text-on-surface">22</span>
                  <span className="text-outline w-9 text-right font-medium">9%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: SLA Compliance & Speed (6 Cols) */}
          <section className="lg:col-span-6 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-secondary"></div>
                <h3 className="text-base font-bold text-on-surface">SLA Compliance & Speed</h3>
              </div>
              <span className="text-xs font-bold text-secondary bg-secondary-container/40 px-2.5 py-1 rounded-full">
                94.2% On-Time
              </span>
            </div>

            {/* Radial Overview Card */}
            <div className="bg-surface-container-low p-4 rounded-xl flex items-center justify-between gap-4 border border-outline-variant/20">
              <div className="space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline block">
                  Overall Target Compliance
                </span>
                <p className="text-2xl font-bold text-on-surface tracking-tight">94.2%</p>
                <p className="text-[11px] text-on-surface-variant">
                  234 of 248 diagnostic reports verified within designated statutory window
                </p>
              </div>

              {/* Radial Progress Gauge Graphic */}
              <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 72 72">
                  <circle
                    className="text-surface-container-high"
                    cx="36"
                    cy="36"
                    fill="transparent"
                    r="30"
                    stroke="currentColor"
                    strokeWidth="7"
                  ></circle>
                  <circle
                    className="text-secondary"
                    cx="36"
                    cy="36"
                    fill="transparent"
                    r="30"
                    stroke="currentColor"
                    strokeDasharray="188.4"
                    strokeDashoffset="10.9"
                    strokeLinecap="round"
                    strokeWidth="7"
                  ></circle>
                </svg>
                <Icon name="speed" className="text-xl text-secondary absolute" />
              </div>
            </div>

            {/* Tier Breakdown Bars */}
            <div className="space-y-2.5 text-xs">
              {/* Emergency */}
              <div className="p-3 bg-surface-container-low/70 rounded-xl space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon name="emergency" className="text-base text-rose-600" />
                    <span className="font-bold text-on-surface">Emergency / STAT (&lt; 15 mins)</span>
                  </div>
                  <span className="font-bold text-secondary">100% Target</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '100%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant">
                  <span>Actual Median: <strong className="text-on-surface">9.2 mins</strong></span>
                  <span>18 Urgent Cases</span>
                </div>
              </div>

              {/* Urgent */}
              <div className="p-3 bg-surface-container-low/70 rounded-xl space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon name="priority_high" className="text-base text-primary" />
                    <span className="font-bold text-on-surface">Urgent Triage (&lt; 4.0 hrs)</span>
                  </div>
                  <span className="font-bold text-secondary">93.8% Target</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '93.8%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant">
                  <span>Actual Median: <strong className="text-on-surface">1.8 hrs</strong></span>
                  <span>65 Triage Cases</span>
                </div>
              </div>

              {/* Routine */}
              <div className="p-3 bg-surface-container-low/70 rounded-xl space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Icon name="schedule" className="text-base text-tertiary" />
                    <span className="font-bold text-on-surface">Routine Orders (&lt; 24 hrs)</span>
                  </div>
                  <span className="font-bold text-secondary">96.5% Target</span>
                </div>
                <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '96.5%' }}></div>
                </div>
                <div className="flex justify-between text-[11px] text-on-surface-variant">
                  <span>Actual Median: <strong className="text-on-surface">11.2 hrs</strong></span>
                  <span>165 Routine Cases</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Section 3 & Section 4: Pathologies & Workload Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Section 3: Diagnostic Pathologies (7 Cols) */}
          <section className="lg:col-span-7 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-tertiary"></div>
                <h3 className="text-base font-bold text-on-surface">Top Diagnostic Pathologies Established</h3>
              </div>
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                ICD-10 Validated
              </span>
            </div>

            <p className="text-xs text-on-surface-variant">
              Diagnostic outcomes confirmed post-investigation clinical review and interpretation commit.
            </p>

            <div className="space-y-2.5 text-xs">
              {/* Finding 1 */}
              <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                      K02.62
                    </span>
                    <span className="font-bold text-on-surface">Caries of Dentin (Pit & Fissure)</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface text-sm">38%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>

              {/* Finding 2 */}
              <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">
                      K01.1
                    </span>
                    <span className="font-bold text-on-surface">Impacted Wisdom Teeth (Mandibular 3rd Molar)</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface text-sm">24%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-primary-container h-full rounded-full" style={{ width: '24%' }}></div>
                </div>
              </div>

              {/* Finding 3 */}
              <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded font-bold">
                      K05.3
                    </span>
                    <span className="font-bold text-on-surface">Chronic Periodontitis Bone Deficit</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface text-sm">18%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>

              {/* Finding 4 */}
              <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-tertiary-container/30 text-tertiary px-2 py-0.5 rounded font-bold">
                      K04.0
                    </span>
                    <span className="font-bold text-on-surface">Pulpitis (Reversible & Irreversible)</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface text-sm">14%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '14%' }}></div>
                </div>
              </div>

              {/* Finding 5 */}
              <div className="p-3 rounded-xl bg-surface-container-low space-y-1.5 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] bg-surface-container-highest text-outline px-2 py-0.5 rounded font-bold">
                      OTHER
                    </span>
                    <span className="font-bold text-on-surface">Maxillary Sinus Mucosal Thickening</span>
                  </div>
                  <span className="font-mono font-bold text-on-surface text-sm">6%</span>
                </div>
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div className="bg-outline h-full rounded-full" style={{ width: '6%' }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Provider & Partner Operational Workload (5 Cols) */}
          <section className="lg:col-span-5 bg-surface-container-lowest p-5 sm:p-6 rounded-2xl border border-outline-variant/40 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-primary-container"></div>
                <h3 className="text-base font-bold text-on-surface">Workload Distribution</h3>
              </div>
              <span className="text-xs font-semibold text-primary">Live Operational</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Operator 1 */}
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0">
                    ZT
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">Nurse Zainab Tariq</p>
                    <p className="text-[11px] text-on-surface-variant truncate">In-House Acquisition Suite</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-primary text-base">112</span>
                  <span className="text-[10px] text-outline block">scans</span>
                </div>
              </div>

              {/* Partner 2 */}
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center shrink-0">
                    <Icon name="domain" className="text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">Al Zahra Imaging Center</p>
                    <p className="text-[11px] text-on-surface-variant truncate">External Partner • CBCT 3D</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-secondary text-base">34</span>
                  <span className="text-[10px] text-outline block">referrals</span>
                </div>
              </div>

              {/* Partner 3 */}
              <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-tertiary-container/40 text-tertiary font-bold flex items-center justify-center shrink-0">
                    <Icon name="biotech" className="text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-on-surface truncate">Al Barsha Reference Lab</p>
                    <p className="text-[11px] text-on-surface-variant truncate">Diagnostics • Blood/Microbiology</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono font-bold text-tertiary text-base">32</span>
                  <span className="text-[10px] text-outline block">panels</span>
                </div>
              </div>
            </div>

            {/* Role Access Safeguard Notice */}
            <div className="bg-surface-container-high/60 rounded-xl p-3.5 flex items-start gap-3 text-on-surface-variant border border-outline-variant/20 text-xs">
              <Icon name="shield_lock" className="text-xl text-primary shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="font-bold text-on-surface text-[11px] uppercase tracking-wide">
                  Role-Based Safeguard Active
                </p>
                <p className="text-[11px] leading-relaxed">
                  Confidential Analytics: Financial data restricted to Clinic Directors and Operations Management. Individual
                  patient identifiers are anonymized in compliance with DHA health data governance.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Navigation Strip */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="dashboard" className="text-primary text-base" />
            <span className="font-semibold text-on-surface">Section 11 Investigations Suite:</span>
            <span className="text-on-surface-variant">All 30 diagnostic workflows and modules operational.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/billing')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="payments" className="text-sm" />
              <span>Billing & Claims (11.29)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/dashboard')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="dashboard" className="text-sm" />
              <span>Investigations Hub (11.1)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

