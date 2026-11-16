import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TabType =
  | 'overview'
  | 'orgInfo'
  | 'clinics'
  | 'docs'
  | 'staff'
  | 'verification'
  | 'changes'
  | 'auditTrail';

export function DHAOrganisationProfileScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
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

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/organisation-management')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                DHA Registry • Profile
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight truncate max-w-[220px] sm:max-w-md">
                DHA Organisation Profile
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/application-decision')}
              className="h-9 px-3.5 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="gavel" className="text-[16px]" />
              <span className="hidden sm:inline">Make Decision</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Executive Facility Header Card */}
        <div className="w-full bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#cce5ff]/40 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 shadow-sm bg-[#f2f3ff] border border-[#dae2fd] flex items-center justify-center text-[#006194]">
                <Icon name="corporate_fare" className="text-[36px]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#86f2e4] text-[#006f66] text-xs font-bold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1">
                    <Icon name="verified" className="text-[13px]" />
                    <span>Tier 1 Baseline</span>
                  </span>
                  <span className="bg-[#eaedff] text-[#3f4850] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    FCT Zonal
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight mt-1 truncate">
                  Greenfield Dental Clinic Ltd
                </h2>
                <p className="text-xs sm:text-sm text-[#006194] font-semibold">
                  Greenfield Dental &amp; Implant Centre
                </p>
                <p className="text-xs text-[#707881] mt-0.5">
                  RC-1489201 • Active Provisional Review • Queue #04
                </p>
              </div>
            </div>

            {/* Chief Medical Director Bar */}
            <div className="bg-[#f2f3ff] rounded-2xl p-3.5 flex items-center justify-between gap-3 border border-[#dae2fd] shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  AB
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#131b2e] truncate">
                      Dr. Amina Bello, BDS, FWACS
                    </span>
                    <Icon name="verified_user" className="text-[#006a61] text-[15px]" />
                  </div>
                  <span className="text-[10px] font-mono text-[#707881] truncate">
                    MDCN Reg #DEN-78421 • CMD
                  </span>
                </div>
              </div>
              <span className="bg-white text-[#006a61] text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#dae2fd] shadow-sm shrink-0">
                Verified
              </span>
            </div>
          </div>
        </div>

        {/* Segmented Administrative Tabs */}
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1.5 p-1 bg-[#eaedff] rounded-2xl w-max border border-[#dae2fd]/70">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'overview'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span>Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('orgInfo')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'orgInfo'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Org Info
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('clinics')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'clinics'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span>Clinics</span>
              <span className="bg-[#dae2fd] text-[#131b2e] text-[10px] px-1.5 py-0.2 rounded-full">
                2
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('docs')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'docs'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span>Docs</span>
              <span className="bg-[#dae2fd] text-[#131b2e] text-[10px] px-1.5 py-0.2 rounded-full">
                5
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('staff')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'staff'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span>Staff</span>
              <span className="bg-[#dae2fd] text-[#131b2e] text-[10px] px-1.5 py-0.2 rounded-full">
                6
              </span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/verification-history')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#3f4850] hover:text-[#131b2e] transition-all flex items-center gap-1"
            >
              <span>Verification</span>
              <Icon name="open_in_new" className="text-[12px]" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/change-requests')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#3f4850] hover:text-[#131b2e] transition-all flex items-center gap-1.5"
            >
              <span>Changes</span>
              <span className="bg-[#ffdad6] text-[#93000a] text-[10px] px-1.5 py-0.2 rounded-full font-bold">
                1
              </span>
            </button>
            <button
              type="button"
              onClick={() => triggerToast('Viewing system audit trail')}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#3f4850] hover:text-[#131b2e] transition-all"
            >
              Audit Trail
            </button>
          </div>
        </div>

        {/* Regulatory Alerts Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Amber Alert */}
          <div
            onClick={() => navigate('/clinic-onboarding/change-requests')}
            className="w-full bg-[#fff8e1] text-[#795548] rounded-2xl p-4 border border-[#ffe082] shadow-sm flex items-start gap-3 cursor-pointer hover:shadow-md transition-all"
          >
            <Icon name="pending_actions" className="text-[#f57f17] text-[22px] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#e65100]">
                  Legal Review In Progress
                </span>
                <span className="font-mono text-[10px] bg-[#fff3e0] text-[#e65100] px-2 py-0.5 rounded font-bold">
                  #CR-2026-092
                </span>
              </div>
              <p className="text-xs text-[#5d4037] mt-1 leading-relaxed">
                1 active Change Request pending review: <em>Public Trading Name Revision</em>.
              </p>
            </div>
          </div>

          {/* Blue Alert */}
          <div
            onClick={() => navigate('/clinic-onboarding/branch-review')}
            className="w-full bg-[#f2f3ff] text-[#131b2e] rounded-2xl p-4 border border-[#cce5ff] shadow-sm flex items-start gap-3 cursor-pointer hover:shadow-md transition-all"
          >
            <Icon name="event_available" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold text-[#006194] block">
                On-Site Inspection Assigned
              </span>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                Inspector Adeleke deployed to Garki Branch for audit on <strong>24 Oct 2026</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Grid: Legal Baseline & Operational Topology */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Legal Baseline & Topology */}
          <div className="lg:col-span-7 space-y-6">
            {/* Legal Entity Baseline */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="assured_workload" className="text-[#006194] text-[22px]" />
                  <h3 className="text-sm font-bold text-[#131b2e]">
                    Legal Entity Baseline
                  </h3>
                </div>
                <span className="text-xs font-bold text-[#006f66] bg-[#86f2e4] px-2.5 py-0.5 rounded-full">
                  Govt Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/60 flex flex-col">
                  <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                    CAC Reg No
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">
                    RC-1489201
                  </span>
                  <span className="text-[11px] text-[#707881]">Inc. 14 Mar 2018</span>
                </div>
                <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/60 flex flex-col">
                  <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                    FIRS Tax ID
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#131b2e] mt-1">
                    21094821-0001
                  </span>
                  <span className="text-[11px] text-[#006a61] font-semibold">
                    Valid Tax Clearance
                  </span>
                </div>
                <div className="col-span-2 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/60 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                      HEFAMAA Facility Permit
                    </span>
                    <span className="text-xs sm:text-sm font-bold text-[#131b2e] mt-0.5">
                      #FCT-HEFAMAA-DENT-0842
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#006194]">Expires Jan 2027</span>
                </div>
              </div>
            </div>

            {/* Operational Topology */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="domain" className="text-[#006194] text-[22px]" />
                  <h3 className="text-sm font-bold text-[#131b2e]">
                    Operational Topology (2 Clinics)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/branch-management')}
                  className="text-xs font-semibold text-[#006194] hover:underline"
                >
                  Manage Branches
                </button>
              </div>

              {/* Node 1: HQ Wuse 2 */}
              <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="domain_verification" className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      HQ #001: Wuse 2 Apex
                    </h4>
                    <span className="bg-[#86f2e4] text-[#006f66] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Active
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">
                    Plot 418 Aminu Kano Crescent, Wuse 2, Abuja
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-[#707881]">
                    <span>4 Surgical Suites</span>
                    <span>•</span>
                    <span>5 Clinicians</span>
                    <span>•</span>
                    <span className="text-[#006a61]">Geotagged</span>
                  </div>
                </div>
              </div>

              {/* Node 2: Garki Satellite */}
              <div className="p-4 rounded-2xl bg-white border border-[#dae2fd] flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0">
                  <Icon name="pending_actions" className="text-[20px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                      Branch #002: Garki Satellite
                    </h4>
                    <span className="bg-[#dae2fd] text-[#006195] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Premises Pending
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850] mt-0.5">
                    Suite 12, Area 11 Commercial Arcade, Garki, Abuja
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-semibold text-[#707881]">
                    <span>2 Operatories</span>
                    <span>•</span>
                    <span>2 Clinicians</span>
                    <span>•</span>
                    <button
                      type="button"
                      onClick={() => navigate('/clinic-onboarding/branch-review')}
                      className="text-[#006194] font-bold hover:underline"
                    >
                      Review Audit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Vector Compliance Scorecard & Actions */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="fact_check" className="text-[#006194] text-[22px]" />
                  <h3 className="text-sm font-bold text-[#131b2e]">
                    Compliance Scorecard
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                  87.5% Aggregated
                </span>
              </div>

              <div className="space-y-3 pt-1">
                {/* 1. CAC */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon name="verified" className="text-[#006a61] text-[18px]" />
                    <span className="text-xs font-semibold text-[#131b2e]">
                      1. CAC Legal Structure
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#006a61]">100% Passed</span>
                </div>

                {/* 2. Clinical Directorship */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon name="verified" className="text-[#006a61] text-[18px]" />
                    <span className="text-xs font-semibold text-[#131b2e]">
                      2. Clinical Directorship
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#006a61]">100% Passed</span>
                </div>

                {/* 3. Radiation Safety */}
                <div className="p-3 rounded-xl bg-white border border-[#ffe082] bg-[#fff8e1]/30 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon name="pending" className="text-[#f57f17] text-[18px]" />
                    <span className="text-xs font-semibold text-[#131b2e]">
                      3. Radiation Safety (NNRA)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#e65100]">Gate 7 Pending</span>
                </div>

                {/* 4. Physical Premises */}
                <div className="p-3 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Icon name="sync" className="text-[#006194] text-[18px]" />
                    <span className="text-xs font-semibold text-[#131b2e]">
                      4. Physical Inspection
                    </span>
                  </div>
                  <span className="text-xs font-bold text-[#006194]">50% (1/2 Passed)</span>
                </div>
              </div>
            </div>

            {/* Action Tray */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/application-decision')}
                className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Icon name="gavel" className="text-[20px]" />
                <span>Execute Statutory Decision (15.33)</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/verification-history')}
                className="w-full h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Icon name="history_edu" className="text-[18px] text-[#006194]" />
                <span>Open Verification History (15.37)</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/branch-review')}
                  className="h-10 bg-white hover:bg-[#eaedff] border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="domain" className="text-[16px]" />
                  <span>Branch Audit</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/organisation-suspension')}
                  className="h-10 bg-[#ffdad6]/40 hover:bg-[#ffdad6] border border-[#ffdad6] text-[#ba1a1a] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Icon name="gavel" className="text-[16px]" />
                  <span>Sanction / Hold</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default DHAOrganisationProfileScreen;
