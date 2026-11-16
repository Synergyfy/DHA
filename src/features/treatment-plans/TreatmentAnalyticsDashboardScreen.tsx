import { useState } from 'react';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function TreatmentAnalyticsDashboardScreen() {
  // State
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedBranch, setSelectedBranch] = useState('Harmony Wuse 2');
  const [selectedClinician, setSelectedClinician] = useState('All Dentists (2)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const masterKPIs = [
    {
      id: 'kpi-1',
      title: 'Active Treatment Plans',
      icon: 'clinical_notes',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#cce5ff]/50',
      value: '28',
      trend: '+12% vs last month',
      trendPositive: true,
    },
    {
      id: 'kpi-2',
      title: 'Dentist Approval Pending',
      icon: 'rate_review',
      iconColor: 'text-[#006195]',
      iconBg: 'bg-[#cce5ff]/40',
      value: '4',
      sub: 'Avg: 22.4h sign-off',
    },
    {
      id: 'kpi-3',
      title: 'Awaiting Patient Decision',
      icon: 'how_to_reg',
      iconColor: 'text-[#006a61]',
      iconBg: 'bg-[#86f2e4]/30',
      value: '7',
      sub: '88% Acceptance Rate',
      subColor: 'text-[#006a61] font-semibold',
    },
    {
      id: 'kpi-4',
      title: 'Scheduled Treatments',
      icon: 'event',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#cce5ff]/50',
      value: '19',
      sub: 'Booked within 14d',
    },
    {
      id: 'kpi-5',
      title: 'In-Progress Plans',
      icon: 'dentistry',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#f2f3ff]',
      value: '14',
      sub: 'Multi-visit protocols',
    },
    {
      id: 'kpi-6',
      title: 'Completed Treatments',
      icon: 'check_circle',
      iconColor: 'text-[#006a61]',
      iconBg: 'bg-[#86f2e4]/30',
      value: '42',
      sub: 'Achieved this month',
      subColor: 'text-[#006a61] font-semibold',
    },
    {
      id: 'kpi-7',
      title: 'Deferred / Declined',
      icon: 'cancel',
      iconColor: 'text-[#ba1a1a]',
      iconBg: 'bg-[#ffdad6]/50',
      value: '5',
      sub: 'Logged in Sec 13.24',
    },
    {
      id: 'kpi-8',
      title: 'Overdue Follow-ups',
      icon: 'notification_important',
      iconColor: 'text-[#ba1a1a]',
      iconBg: 'bg-[#ffdad6]/50',
      value: '3',
      sub: 'Outreach initiated',
      subColor: 'text-[#ba1a1a] font-semibold',
    },
  ];

  const departmentalData = [
    {
      id: 'dept-1',
      title: 'Operative Biomimetic',
      subtitle: '14 Plans · 22 Procedures',
      badge: '92% Complete',
      badgeColor: 'bg-[#86f2e4]/30 text-[#006f66]',
      quoted: 'NGN 28,400',
      copay: 'NGN 5,680',
    },
    {
      id: 'dept-2',
      title: 'Preventive & Recare',
      subtitle: '18 Plans · 36 Procedures',
      badge: '96% Complete',
      badgeColor: 'bg-[#86f2e4]/30 text-[#006f66]',
      quoted: 'NGN 16,200',
      copay: 'NGN 3,240',
    },
    {
      id: 'dept-3',
      title: 'Endodontics',
      subtitle: '6 Plans · 8 Procedures',
      badge: '78% Complete',
      badgeColor: 'bg-[#cce5ff]/50 text-[#006194]',
      quoted: 'NGN 19,200',
      copay: 'NGN 3,840',
    },
    {
      id: 'dept-4',
      title: 'Periodontics & Surgery',
      subtitle: '5 Plans · 9 Procedures',
      badge: '84% Complete',
      badgeColor: 'bg-[#cce5ff]/50 text-[#006194]',
      quoted: 'NGN 20,400',
      copay: 'NGN 2,040',
    },
  ];

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Analytics Dashboard"
      badgeCode="13.30"
      badgeLabel="Executive Quality & Throughput"
      currentStep="Step 30 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Role-Based Governance Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] shrink-0 mt-0.5 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">
                Governance & Security • Nigeria Health Information Exchange Audited
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              <span className="text-xs text-[#707881]">Real-time Clinical Throughput</span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              <strong className="text-[#131b2e]">Executive Quality Analytics:</strong> Real-time clinical throughput and financial reconciliation for Harmony Dental Clinic (All Branches). Patient identity identifiers remain encrypted under role-based access control.
            </p>
          </div>
        </div>

        {/* Filter & Segmentation Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
              <Icon name="tune" className="text-[#006194] text-[18px]" />
              Operational Filters
            </span>
            <span className="text-xs font-semibold text-[#006194] bg-[#cce5ff]/40 px-2.5 py-0.5 rounded-full">
              Live Sync (Updated 4m ago)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Timeframe Selectors */}
            <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setSelectedTimeframe('30d')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedTimeframe === '30d'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
                }`}
              >
                Last 30 Days (Oct 2026)
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('q3-q4')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                  selectedTimeframe === 'q3-q4'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
                }`}
              >
                Q3-Q4 2026
              </button>
              <button
                type="button"
                onClick={() => setSelectedTimeframe('custom')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedTimeframe === 'custom'
                    ? 'bg-[#006194] text-white shadow-xs'
                    : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
                }`}
              >
                <Icon name="calendar_month" className="text-[14px]" />
                <span>Custom Range</span>
              </button>
            </div>

            {/* Dropdowns */}
            <div className="md:col-span-6 grid grid-cols-2 gap-2">
              <div className="bg-[#f2f3ff] rounded-xl p-2.5 border border-[#eaedff]">
                <span className="text-[10px] text-[#707881] block mb-0.5">Facility Branch</span>
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="w-full text-xs font-bold text-[#131b2e] bg-transparent focus:outline-none"
                >
                  <option>Harmony Wuse 2</option>
                  <option>Harmony Victoria Island</option>
                  <option>All Branches Combined</option>
                </select>
              </div>

              <div className="bg-[#f2f3ff] rounded-xl p-2.5 border border-[#eaedff]">
                <span className="text-[10px] text-[#707881] block mb-0.5">Assigned Clinician</span>
                <select
                  value={selectedClinician}
                  onChange={(e) => setSelectedClinician(e.target.value)}
                  className="w-full text-xs font-bold text-[#131b2e] bg-transparent focus:outline-none"
                >
                  <option>All Dentists (2)</option>
                  <option>Dr. Daniel James (DDS)</option>
                  <option>Dr. Zainab Musa (BDS)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Master KPI Metric Grid (8 Vital Indicators) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#131b2e]">Master Clinical Indicators</h2>
            <span className="text-xs text-[#006a61] font-semibold">Updated 4m ago</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {masterKPIs.map((kpi) => (
              <div
                key={kpi.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] flex flex-col justify-between space-y-2 hover:border-[#bfc7d2] transition-colors"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-[#707881] font-medium leading-tight">
                    {kpi.title}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${kpi.iconBg} flex items-center justify-center shrink-0 ${kpi.iconColor}`}
                  >
                    <Icon name={kpi.icon} className="text-[16px]" />
                  </div>
                </div>

                <div>
                  <div className="text-2xl font-bold text-[#131b2e]">{kpi.value}</div>
                  {kpi.trend && (
                    <div className="flex items-center gap-1 mt-0.5 text-xs text-[#006a61] font-bold">
                      <Icon name="trending_up" className="text-[14px]" />
                      <span>{kpi.trend}</span>
                    </div>
                  )}
                  {kpi.sub && (
                    <span className={`text-xs block mt-0.5 ${kpi.subColor || 'text-[#707881]'}`}>
                      {kpi.sub}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Financial Distinction Matrix */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff]/50 flex items-center justify-center text-[#006194]">
                <Icon name="account_balance_wallet" className="text-[20px]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#131b2e]">Financial Matrix</h2>
                <p className="text-xs text-[#707881]">Safeguarded Clinical vs Copay Balance</p>
              </div>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 bg-[#86f2e4]/30 text-[#006f66] rounded-full border border-[#86f2e4]/50">
              NGN Active Ledger
            </span>
          </div>

          {/* Main Value Highlight */}
          <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-[#707881] block">Total Estimated Treatment Value</span>
              <span className="text-2xl font-bold text-[#131b2e]">NGN 84,200</span>
            </div>
            <div className="sm:text-right">
              <span className="text-xs font-bold text-[#006a61] block">81.2% Approved</span>
              <span className="text-xs text-[#3f4850]">NGN 68,400 Quoted</span>
            </div>
          </div>

          {/* Segmented Breakdown Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-[#707881]">
              <span>Settlement Proportions</span>
              <span className="font-semibold text-[#131b2e]">70.4% Ins. Cleared</span>
            </div>
            <div className="h-3.5 w-full bg-[#eaedff] rounded-full overflow-hidden flex">
              <div
                className="h-full bg-[#006194]"
                style={{ width: '57.2%' }}
                title="Insurance Disbursed: NGN 48,200"
              ></div>
              <div
                className="h-full bg-[#006a61]"
                style={{ width: '17.6%' }}
                title="Patient Copays: NGN 14,800"
              ></div>
              <div
                className="h-full bg-[#ffdad6]"
                style={{ width: '6.4%' }}
                title="Outstanding: NGN 5,400"
              ></div>
              <div
                className="h-full bg-[#dae2fd] flex-1"
                title="Unapproved Quotient: NGN 15,800"
              ></div>
            </div>
          </div>

          {/* Metric Rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1 text-xs">
            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
                <span className="text-[#131b2e] font-semibold">Insurance Disbursed</span>
              </div>
              <div className="text-base font-bold text-[#131b2e]">NGN 48,200</div>
              <span className="text-[11px] text-[#707881] block">70.4% settled</span>
            </div>

            <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                <span className="text-[#131b2e] font-semibold">Patient Copays Collected</span>
              </div>
              <div className="text-base font-bold text-[#006a61]">NGN 14,800</div>
              <span className="text-[11px] text-[#707881] block">Direct POS/Online</span>
            </div>

            <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                <span className="text-[#93000a] font-semibold">Outstanding Balances Due</span>
              </div>
              <div className="text-base font-bold text-[#ba1a1a]">NGN 5,400</div>
              <span className="text-[11px] text-[#93000a] block">3 claims pending review</span>
            </div>
          </div>
        </div>

        {/* Visual Analytics & Charts Section (Responsive 2 Columns on Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Chart 1: Plan Ingestion vs Accepted (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-bold text-[#131b2e]">
                  Monthly Plan Ingestion vs Patient Accepted
                </h3>
                <span className="text-xs text-[#707881]">
                  Steady 26% acceptance surge into Q4
                </span>
              </div>
              <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-1 rounded-full border border-[#86f2e4]/50">
                88% Avg Oct
              </span>
            </div>

            {/* CSS Vertical Bar Chart */}
            <div className="h-44 pt-6 flex items-end justify-around gap-6 border-b border-[#eaedff] pb-4">
              {/* Aug */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end max-w-[50px]">
                <div
                  className="w-full bg-[#e2e7ff] rounded-t-lg relative flex flex-col justify-end overflow-hidden"
                  style={{ height: '52%' }}
                >
                  <div className="w-full bg-[#006194] rounded-t-lg" style={{ height: '72%' }}></div>
                </div>
                <span className="text-xs text-[#707881] font-semibold">Aug (32)</span>
              </div>

              {/* Sep */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end max-w-[50px]">
                <div
                  className="w-full bg-[#e2e7ff] rounded-t-lg relative flex flex-col justify-end overflow-hidden"
                  style={{ height: '74%' }}
                >
                  <div className="w-full bg-[#006194] rounded-t-lg" style={{ height: '80%' }}></div>
                </div>
                <span className="text-xs text-[#707881] font-semibold">Sep (45)</span>
              </div>

              {/* Oct */}
              <div className="flex-1 flex flex-col items-center gap-2 h-full justify-end max-w-[50px]">
                <div
                  className="w-full bg-[#e2e7ff] rounded-t-lg relative flex flex-col justify-end overflow-hidden"
                  style={{ height: '100%' }}
                >
                  <div className="w-full bg-[#006194] rounded-t-lg" style={{ height: '88%' }}></div>
                </div>
                <span className="text-xs text-[#006194] font-bold">Oct (61)</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-6 pt-1 text-xs text-[#707881]">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#e2e7ff]"></span>
                <span>Plans Proposed</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-xs bg-[#006194]"></span>
                <span>Patient Accepted</span>
              </div>
            </div>
          </div>

          {/* Chart 2: Category Breakdown & Follow-up Donut (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Category Mix */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#131b2e]">Procedures by Category</h3>
                <span className="text-xs text-[#707881]">Clinical Mix</span>
              </div>

              <div className="space-y-2.5 pt-1 text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#131b2e] font-semibold">Operative / Restorative</span>
                    <span className="text-[#006194] font-bold">42%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006194] rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#131b2e] font-semibold">Preventive & Hygiene</span>
                    <span className="text-[#006a61] font-bold">28%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="h-full bg-[#006a61] rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#131b2e] font-semibold">Endodontics</span>
                    <span className="text-[#007bb9] font-bold">16%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="h-full bg-[#007bb9] rounded-full" style={{ width: '16%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-[#131b2e] font-semibold">Periodontics & Surgery</span>
                    <span className="text-[#707881] font-bold">14%</span>
                  </div>
                  <div className="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
                    <div className="h-full bg-[#707881] rounded-full" style={{ width: '14%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow-up Compliance Donut */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#131b2e]">Follow-up Resolution Compliance</h3>
                <span className="text-xs font-bold text-[#006a61]">95% Satisfied</span>
              </div>

              <div className="flex items-center gap-5 py-1">
                <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                  <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#eaedff]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.8"
                    ></path>
                    <path
                      className="text-[#006a61]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="85, 100"
                      strokeLinecap="round"
                      strokeWidth="3.8"
                    ></path>
                  </svg>
                  <span className="absolute text-sm font-bold text-[#131b2e]">85%</span>
                </div>

                <div className="flex-1 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#131b2e]">
                      <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                      On Schedule
                    </span>
                    <span className="font-bold text-[#131b2e]">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#707881]">
                      <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
                      Rescheduled
                    </span>
                    <span className="font-bold text-[#131b2e]">10%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-[#ba1a1a]">
                      <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                      Overdue
                    </span>
                    <span className="font-bold text-[#ba1a1a]">5%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Departmental Performance Breakdown Table */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#131b2e]">
                Departmental Clinical Performance
              </h2>
              <p className="text-xs text-[#707881]">Throughput by clinical discipline</p>
            </div>
            <span className="text-xs text-[#006194] font-semibold flex items-center gap-1">
              <Icon name="swap_vert" className="text-[16px]" />
              Sorted by Plan Volume
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {departmentalData.map((dept) => (
              <div
                key={dept.id}
                className="bg-[#f2f3ff] rounded-2xl p-4 space-y-3 border border-[#eaedff]"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e]">{dept.title}</h4>
                    <span className="text-xs text-[#707881]">{dept.subtitle}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${dept.badgeColor}`}>
                    {dept.badge}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 bg-white p-3 rounded-xl border border-[#eaedff] text-xs">
                  <div>
                    <span className="text-[10px] text-[#707881] block">Quoted Value</span>
                    <span className="font-bold text-[#131b2e]">{dept.quoted}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#707881] block">Collected Copay</span>
                    <span className="font-bold text-[#006a61]">{dept.copay}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export & Compliance Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Quality & Analytics Audit PDF dispatched to browser download.')}
            className="h-12 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Icon name="picture_as_pdf" className="text-[20px]" />
            Export Quality & Analytics Audit (PDF)
          </button>
          <button
            type="button"
            onClick={() => showToast('Nigeria Health Information Exchange clinical compliance XML bundle certified and uploaded.')}
            className="h-12 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
          >
            <Icon name="security_update_good" className="text-[20px]" />
            Nigeria Health Information Exchange Clinical Activity Compliance Report
          </button>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
