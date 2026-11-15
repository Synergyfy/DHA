import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type BranchFilter = 'all' | 'wuse2' | 'maitama' | 'gwarinpa';

export const StaffManagementReportsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>('all');
  const [period, setPeriod] = useState('Oct 2026 MTD');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Branch data multipliers for dynamic report feel
  const stats = {
    all: {
      totalStaff: 28,
      trend: '+3 vs Q3',
      capacity: '92.8%',
      licensure: '100%',
      invites: 4,
      invitesConv: '75%',
      dentists: 8,
      dentistsPct: '28.6%',
      hygienists: 3,
      hygienistsPct: '10.7%',
      nurses: 6,
      nursesPct: '21.4%',
      admin: 5,
      adminPct: '17.9%',
      finance: 6,
      financePct: '21.4%',
      wuse2Staff: '14 Staff (50%)',
      wuse2Util: '94%',
      maitamaStaff: '8 Staff (29%)',
      maitamaUtil: '88%',
      gwarinpaStaff: '6 Staff (21%)',
      gwarinpaUtil: '90%',
      acceptedInvites: 4,
      awaitingInvites: 3,
      expiredInvites: 1,
      standardRoles: '24 (85.7%)',
      customRoles: '4 (14.3%)',
    },
    wuse2: {
      totalStaff: 14,
      trend: '+2 vs Q3',
      capacity: '94.0%',
      licensure: '100%',
      invites: 2,
      invitesConv: '80%',
      dentists: 4,
      dentistsPct: '28.6%',
      hygienists: 2,
      hygienistsPct: '14.3%',
      nurses: 3,
      nursesPct: '21.4%',
      admin: 3,
      adminPct: '21.4%',
      finance: 2,
      financePct: '14.3%',
      wuse2Staff: '14 Staff (100%)',
      wuse2Util: '94%',
      maitamaStaff: '0 Staff',
      maitamaUtil: '0%',
      gwarinpaStaff: '0 Staff',
      gwarinpaUtil: '0%',
      acceptedInvites: 2,
      awaitingInvites: 1,
      expiredInvites: 1,
      standardRoles: '12 (85.7%)',
      customRoles: '2 (14.3%)',
    },
    maitama: {
      totalStaff: 8,
      trend: '+1 vs Q3',
      capacity: '88.5%',
      licensure: '100%',
      invites: 1,
      invitesConv: '70%',
      dentists: 2,
      dentistsPct: '25.0%',
      hygienists: 1,
      hygienistsPct: '12.5%',
      nurses: 2,
      nursesPct: '25.0%',
      admin: 1,
      adminPct: '12.5%',
      finance: 2,
      financePct: '25.0%',
      wuse2Staff: '0 Staff',
      wuse2Util: '0%',
      maitamaStaff: '8 Staff (100%)',
      maitamaUtil: '88%',
      gwarinpaStaff: '0 Staff',
      gwarinpaUtil: '0%',
      acceptedInvites: 1,
      awaitingInvites: 1,
      expiredInvites: 0,
      standardRoles: '7 (87.5%)',
      customRoles: '1 (12.5%)',
    },
    gwarinpa: {
      totalStaff: 6,
      trend: 'No change',
      capacity: '90.2%',
      licensure: '100%',
      invites: 1,
      invitesConv: '65%',
      dentists: 2,
      dentistsPct: '33.3%',
      hygienists: 0,
      hygienistsPct: '0.0%',
      nurses: 1,
      nursesPct: '16.7%',
      admin: 1,
      adminPct: '16.7%',
      finance: 2,
      financePct: '33.3%',
      wuse2Staff: '0 Staff',
      wuse2Util: '0%',
      maitamaStaff: '0 Staff',
      maitamaUtil: '0%',
      gwarinpaStaff: '6 Staff (100%)',
      gwarinpaUtil: '90%',
      acceptedInvites: 1,
      awaitingInvites: 1,
      expiredInvites: 0,
      standardRoles: '5 (83.3%)',
      customRoles: '1 (16.7%)',
    },
  }[selectedBranch];

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/80 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/staff-management/dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
              title="Back to Dashboard"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider truncate">
                Abuja Clinic Network
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-[#131b2e] font-['Plus_Jakarta_Sans'] truncate">
                  Harmony Dental Group - Staff Reports
                </span>
                <Icon name="expand_more" className="text-[18px] text-[#3f4850]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => showToast('Exporting summary PDF...')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>Export Report</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white text-xs font-semibold">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Header & Context Area */}
        <section className="flex flex-col gap-3 mb-6">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#005049] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              REPORTING ENGINE MTD
            </span>

            {/* Period Dropdown */}
            <div className="relative">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 pr-8 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold transition-colors appearance-none focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
              >
                <option value="Oct 2026 MTD">Oct 2026 MTD</option>
                <option value="Sep 2026">Sep 2026</option>
                <option value="Q3 2026">Q3 2026</option>
                <option value="YTD 2026">YTD 2026</option>
              </select>
              <Icon name="arrow_drop_down" className="absolute right-2 top-1/2 -translate-y-1/2 text-[18px] text-[#707881] pointer-events-none" />
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
              Staff Management Reports
            </h1>
            <p className="text-sm text-[#3f4850] mt-1 leading-relaxed max-w-3xl">
              Workforce distribution, verification compliance, invitation conversion rates, and role utilization analytics.
            </p>
          </div>

          {/* Filter Chips Carousel */}
          <div className="pt-2 flex items-center gap-2 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedBranch('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedBranch === 'all'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
              }`}
            >
              All Branches (3)
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('wuse2')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedBranch === 'wuse2'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
              }`}
            >
              Wuse 2 Main
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('maitama')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedBranch === 'maitama'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
              }`}
            >
              Maitama Specialist
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('gwarinpa')}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 ${
                selectedBranch === 'gwarinpa'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white border border-[#eaedff] text-[#3f4850] hover:bg-[#f2f3ff]'
              }`}
            >
              Gwarinpa Outpost
            </button>
          </div>
        </section>

        {/* Executive Workforce Census: 4 KPI Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Total Personnel */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="group" className="text-[20px]" />
              </span>
              <span className="inline-flex items-center text-[#006a61] text-xs font-semibold">
                <Icon name="trending_up" className="text-[14px] mr-0.5" />
                {stats.trend}
              </span>
            </div>
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-none">
                {stats.totalStaff}
              </span>
              <p className="text-[11px] text-[#707881] mt-1 uppercase tracking-wider font-semibold">Total Personnel</p>
            </div>
          </div>

          {/* Operational Capacity */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="chair" className="text-[20px]" />
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#005049] text-[11px] font-semibold">
                Optimal
              </span>
            </div>
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-none">
                {stats.capacity}
              </span>
              <p className="text-[11px] text-[#707881] mt-1 uppercase tracking-wider font-semibold">On-Duty Cover</p>
            </div>
          </div>

          {/* Licensure Compliance */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                <Icon name="verified" className="text-[20px]" filled={true} />
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#006a61] leading-none">
                  {stats.licensure}
                </span>
                <span className="text-xs text-[#006a61] font-semibold">MDCN</span>
              </div>
              <p className="text-[11px] text-[#707881] mt-1 uppercase tracking-wider font-semibold">Licensure Clear</p>
            </div>
          </div>

          {/* Invites In-Flight */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="outgoing_mail" className="text-[20px]" />
              </span>
              <span className="text-xs text-[#707881] font-medium">{stats.invitesConv} conv.</span>
            </div>
            <div className="mt-4">
              <span className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-none">
                {stats.invites}
              </span>
              <p className="text-[11px] text-[#707881] mt-1 uppercase tracking-wider font-semibold">Pending Invites</p>
            </div>
          </div>
        </section>

        {/* 2-Column Responsive Layout for Modules 2 & 3 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Module 2: Staff Distribution by Cadre & Role */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between gap-5">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Cadre &amp; Role Distribution
                  </h2>
                  <p className="text-xs text-[#707881]">{stats.totalStaff} active clinical &amp; support professionals</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="donut_small" className="text-[20px]" />
                </span>
              </div>

              {/* Visual Stacked Bar */}
              <div className="w-full h-4 bg-[#eaedff] rounded-full overflow-hidden flex mb-4">
                <div className="h-full bg-[#006194]" style={{ width: stats.dentistsPct }} title="Dentists"></div>
                <div className="h-full bg-[#006a61]" style={{ width: stats.hygienistsPct }} title="Hygienists"></div>
                <div className="h-full bg-[#287ab3]" style={{ width: stats.nursesPct }} title="Nurses"></div>
                <div className="h-full bg-[#6bd8cb]" style={{ width: stats.adminPct }} title="Admin"></div>
                <div className="h-full bg-[#bfc7d2]" style={{ width: stats.financePct }} title="Finance & Ops"></div>
              </div>

              {/* Detailed Breakdown Rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
                    <span className="text-[#131b2e] font-medium">Dentists &amp; Specialists</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#131b2e]">{stats.dentists}</span>
                    <span className="text-[#707881] w-12 text-right">{stats.dentistsPct}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                    <span className="text-[#131b2e] font-medium">Dental Hygienists &amp; Therapists</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#131b2e]">{stats.hygienists}</span>
                    <span className="text-[#707881] w-12 text-right">{stats.hygienistsPct}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#287ab3]"></span>
                    <span className="text-[#131b2e] font-medium">Chairside Nurses &amp; IPC</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#131b2e]">{stats.nurses}</span>
                    <span className="text-[#707881] w-12 text-right">{stats.nursesPct}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#6bd8cb]"></span>
                    <span className="text-[#131b2e] font-medium">Front-Desk, Triage &amp; Admin</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#131b2e]">{stats.admin}</span>
                    <span className="text-[#707881] w-12 text-right">{stats.adminPct}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bfc7d2]"></span>
                    <span className="text-[#131b2e] font-medium">Finance, Billing &amp; Operations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#131b2e]">{stats.finance}</span>
                    <span className="text-[#707881] w-12 text-right">{stats.financePct}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Module 3: Branch Deployment & Roster Ratio */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Branch Deployment</h2>
                  <p className="text-xs text-[#707881]">Roster allocation &amp; chair cover ratio</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="hub" className="text-[20px]" />
                </span>
              </div>

              <div className="space-y-3.5">
                {/* Wuse 2 Main */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name="apartment" className="text-[18px] text-[#006194]" />
                      <span className="text-xs font-semibold text-[#131b2e] truncate">Wuse 2 Main Branch</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-xs text-[#006194] font-semibold">
                      {stats.wuse2Staff}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#707881]">
                      <span>Chair Capacity Utilization</span>
                      <span className="text-[#131b2e] font-semibold">{stats.wuse2Util}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                      <div className="h-full bg-[#006194] rounded-full" style={{ width: stats.wuse2Util }}></div>
                    </div>
                  </div>
                </div>

                {/* Maitama Specialist */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name="medical_services" className="text-[18px] text-[#006a61]" />
                      <span className="text-xs font-semibold text-[#131b2e] truncate">Maitama Specialist Clinic</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-xs text-[#006a61] font-semibold">
                      {stats.maitamaStaff}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#707881]">
                      <span>Chair Capacity Utilization</span>
                      <span className="text-[#131b2e] font-semibold">{stats.maitamaUtil}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                      <div className="h-full bg-[#006a61] rounded-full" style={{ width: stats.maitamaUtil }}></div>
                    </div>
                  </div>
                </div>

                {/* Gwarinpa Outpost */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon name="health_and_safety" className="text-[18px] text-[#287ab3]" />
                      <span className="text-xs font-semibold text-[#131b2e] truncate">Gwarinpa Outpost Hub</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-xs text-[#287ab3] font-semibold">
                      {stats.gwarinpaStaff}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-[#707881]">
                      <span>Chair Capacity Utilization</span>
                      <span className="text-[#131b2e] font-semibold">{stats.gwarinpaUtil}</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#eaedff] overflow-hidden">
                      <div className="h-full bg-[#287ab3] rounded-full" style={{ width: stats.gwarinpaUtil }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* 2-Column Responsive Layout for Modules 4 & 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Module 4: Invitation & Onboarding Velocity */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Invitation &amp; Onboarding Velocity
                  </h2>
                  <p className="text-xs text-[#707881]">8 invites dispatched MTD</p>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#005049]">
                  <Icon name="bolt" className="text-[14px]" />
                  <span className="text-xs font-semibold">2.1d avg turnaround</span>
                </div>
              </div>

              {/* Funnel Progress Graph */}
              <div className="grid grid-cols-3 gap-3 text-center mb-4">
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col items-center">
                  <span className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#006a61]">
                    {stats.acceptedInvites}
                  </span>
                  <span className="text-xs text-[#707881] mt-0.5">Accepted (50%)</span>
                  <div className="w-full h-1 bg-[#006a61] rounded-full mt-2"></div>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col items-center">
                  <span className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">
                    {stats.awaitingInvites}
                  </span>
                  <span className="text-xs text-[#707881] mt-0.5">Awaiting (37.5%)</span>
                  <div className="w-full h-1 bg-[#006194] rounded-full mt-2"></div>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col items-center">
                  <span className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#707881]">
                    {stats.expiredInvites}
                  </span>
                  <span className="text-xs text-[#707881] mt-0.5">Expired (12.5%)</span>
                  <div className="w-full h-1 bg-[#bfc7d2] rounded-full mt-2"></div>
                </div>
              </div>

              {/* Turnaround Callout */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#eaedff]">
                <Icon name="speed" className="text-[22px] text-[#006194] shrink-0" />
                <p className="text-xs text-[#3f4850] leading-snug">
                  Clinician onboarding cycle is <strong className="text-[#131b2e]">18% faster</strong> than network
                  benchmark across FCT practices.
                </p>
              </div>
            </div>
          </section>

          {/* Module 5: Administrative Governance & Privileges Index */}
          <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Governance &amp; Privileges
                  </h2>
                  <p className="text-xs text-[#707881]">Role tiers and security protocols</p>
                </div>
                <span className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center text-[#006194]">
                  <Icon name="shield_person" className="text-[20px]" />
                </span>
              </div>

              <div className="space-y-3">
                {/* Standard Roles */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]">
                  <div className="flex items-center gap-2.5">
                    <Icon name="badge" className="text-[20px] text-[#006194]" />
                    <div>
                      <p className="text-xs font-semibold text-[#131b2e]">Standard Predefined Roles</p>
                      <p className="text-[11px] text-[#707881]">{stats.standardRoles} personnel</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-semibold">
                    Standard Tier
                  </span>
                </div>

                {/* Custom Roles */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]">
                  <div className="flex items-center gap-2.5">
                    <Icon name="tune" className="text-[20px] text-[#006a61]" />
                    <div>
                      <p className="text-xs font-semibold text-[#131b2e]">Custom Scoped Privileges</p>
                      <p className="text-[11px] text-[#707881]">{stats.customRoles} personnel</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/40 text-[#005049] text-xs font-semibold">
                    Custom Granular
                  </span>
                </div>

                {/* Temporary Suspension Alert Flag */}
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#ffdad6]/40 text-[#131b2e]">
                  <Icon name="warning" className="text-[20px] text-[#ba1a1a] shrink-0 mt-0.5" filled={true} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#93000a]">1 Active Temporary Suspension</p>
                      <span className="text-[10px] text-[#ba1a1a] font-bold uppercase tracking-wider">Audit</span>
                    </div>
                    <p className="text-[11px] text-[#3f4850] mt-0.5">
                      Review in progress for credential re-validation at Wuse 2 Main.
                    </p>
                  </div>
                </div>

                {/* Clinical Masking Indicator */}
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#86f2e4]/30 text-[#005049]">
                  <Icon name="lock" className="text-[20px] text-[#006a61] shrink-0" filled={true} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[#006a61]">100% Clinical Masking Compliance</p>
                    <p className="text-[11px] text-[#3f4850] truncate">Non-clinical staff barred from raw odontograms.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Export Actions Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <button
            type="button"
            onClick={() => showToast('Generating full workforce PDF report...')}
            className="w-full h-12 rounded-xl bg-[#006194] text-white font-semibold text-sm shadow-sm hover:bg-[#007bb9] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Icon name="picture_as_pdf" className="text-[20px]" />
            <span>Export Full Workforce Report (PDF)</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('Exporting comparative workforce CSV...')}
            className="w-full h-12 rounded-xl bg-white border border-[#eaedff] text-[#006194] font-semibold text-sm hover:bg-[#f2f3ff] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Icon name="table_view" className="text-[20px]" />
            <span>Download Comparative Excel (CSV)</span>
          </button>
        </section>
      </main>

      {/* Floating Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-[#eef0ff] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <Icon name="check_circle" className="text-[#6bd8cb] text-[20px]" filled={true} />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
