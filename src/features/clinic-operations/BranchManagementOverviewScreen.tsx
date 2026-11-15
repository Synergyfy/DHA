import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type StatusFilter = 'all' | 'active' | 'audit';

interface BranchFacility {
  id: string;
  name: string;
  nodeCode: string;
  status: 'active' | 'audit';
  statusLabel: string;
  statusBadgeClass: string;
  statusDotClass: string;
  accreditationBadge: string;
  address: string;
  branchManager: string;
  directorOrLeadTitle: string;
  directorOrLeadName: string;
  suitesTotal: number;
  suitesDetail: string;
  cliniciansCount: number;
  cliniciansDetail: string;
  apptsTotal: number;
  apptsCompleted: number;
  apptsLive?: number;
  apptsPending?: number;
  progressPercent: number;
  progressBreakdownText: string;
  hasOpsButton?: boolean;
}

const BRANCHES: BranchFacility[] = [
  {
    id: 'b-001',
    name: 'Wuse 2 Main Branch',
    nodeCode: 'HQ Facility • Node #001',
    status: 'active',
    statusLabel: 'Full Operations',
    statusBadgeClass: 'bg-[#86f2e4]/50 text-[#006f66]',
    statusDotClass: 'bg-[#006a61]',
    accreditationBadge: 'DHA Gazetted • Tier 2 Surgical Facility',
    address: '14 Aminu Kano Crescent, Wuse 2, Abuja',
    branchManager: 'David Musa',
    directorOrLeadTitle: 'Medical Director',
    directorOrLeadName: 'Dr. Daniel Okoro',
    suitesTotal: 4,
    suitesDetail: '3 Active / 1 Ready',
    cliniciansCount: 5,
    cliniciansDetail: 'Rostered Today',
    apptsTotal: 28,
    apptsCompleted: 18,
    apptsLive: 6,
    apptsPending: 4,
    progressPercent: 64,
    progressBreakdownText: '18 Completed • 6 Live • 4 Pending',
    hasOpsButton: true,
  },
  {
    id: 'b-002',
    name: 'Garki Satellite Branch',
    nodeCode: 'Satellite Node #002',
    status: 'audit',
    statusLabel: 'Audit Pending',
    statusBadgeClass: 'bg-[#e2e7ff] text-[#3f4850]',
    statusDotClass: 'bg-[#707881]',
    accreditationBadge: 'Provisional Clearance • Insp. 24 Oct',
    address: 'Plot 108 Mohammadu Buhari Way, Garki 2, Abuja',
    branchManager: 'Grace Alabi',
    directorOrLeadTitle: 'Lead Clinician',
    directorOrLeadName: 'Dr. Tunde Fashola',
    suitesTotal: 2,
    suitesDetail: 'Restricted Surgical',
    cliniciansCount: 3,
    cliniciansDetail: 'On Duty',
    apptsTotal: 22,
    apptsCompleted: 14,
    apptsPending: 8,
    progressPercent: 63,
    progressBreakdownText: '14 Completed • 8 Remaining',
  },
  {
    id: 'b-003',
    name: 'Maitama Specialist Outpost',
    nodeCode: 'Specialty Node #003',
    status: 'active',
    statusLabel: 'Full Operations',
    statusBadgeClass: 'bg-[#86f2e4]/50 text-[#006f66]',
    statusDotClass: 'bg-[#006a61]',
    accreditationBadge: 'DHA Gazetted • Orthodontic & Pediatric Hub',
    address: '22 IBB Way Plaza, Maitama, Abuja',
    branchManager: 'K. Danladi',
    directorOrLeadTitle: 'Lead Specialist',
    directorOrLeadName: 'Dr. Sarah Bello',
    suitesTotal: 2,
    suitesDetail: 'Dual Digital Sensor',
    cliniciansCount: 2,
    cliniciansDetail: 'Rostered Full Day',
    apptsTotal: 14,
    apptsCompleted: 11,
    apptsPending: 3,
    progressPercent: 78,
    progressBreakdownText: '11 Done • 3 Scheduled',
  },
];

export const BranchManagementOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<StatusFilter>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredBranches = BRANCHES.filter((b) => {
    const matchesFilter = filterTab === 'all' || b.status === filterTab;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.branchManager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.directorOrLeadName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
                  Branch Management Overview
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('All 3 facilities reporting live synchronization')}
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
          {/* Header Block */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006194]">
              <Icon name="domain_verification" className="text-[18px]" />
              <span className="text-xs font-semibold tracking-wider uppercase">
                BrightSmile Practice Group • Corporate Oversight
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              Branch Management Overview
            </h1>
            <p className="text-sm text-[#3f4850]">
              Operational health, regulatory accreditation & capacity across all registered facility nodes.
            </p>
          </div>

          {/* Practice Group Summary Bento Strip */}
          <div className="bg-[#f2f3ff] rounded-2xl p-5 shadow-sm border border-[#dae2fd]/70 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#707881]">
                Network Metrics (Abuja Municipal)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-[#86f2e4] text-[#006f66] px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
                <span>Live Synced</span>
              </span>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dae2fd]/60 flex flex-col">
                <div className="flex items-center justify-between text-[#707881]">
                  <span className="text-xs font-semibold">Facilities</span>
                  <Icon name="apartment" className="text-[20px] text-[#006194]" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-[#131b2e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  3 Active
                </span>
                <span className="text-xs text-[#3f4850]">Abuja Municipal Hub</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dae2fd]/60 flex flex-col">
                <div className="flex items-center justify-between text-[#707881]">
                  <span className="text-xs font-semibold">Operatories</span>
                  <Icon name="dentistry" className="text-[20px] text-[#006194]" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-[#131b2e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  8 Suites
                </span>
                <span className="text-xs text-[#3f4850]">100% Calibrated</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dae2fd]/60 flex flex-col">
                <div className="flex items-center justify-between text-[#707881]">
                  <span className="text-xs font-semibold">Rostered Staff</span>
                  <Icon name="badge" className="text-[20px] text-[#006194]" />
                </div>
                <span className="text-xl md:text-2xl font-bold text-[#131b2e] mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                  16 Clinicians
                </span>
                <span className="text-xs text-[#3f4850]">Attending Shift</span>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dae2fd]/60 flex flex-col">
                <div className="flex items-center justify-between text-[#707881]">
                  <span className="text-xs font-semibold">Network Throughput</span>
                  <Icon name="trending_up" className="text-[20px] text-[#006a61]" />
                </div>
                <div className="flex items-baseline gap-1.5 mt-1">
                  <span className="text-xl md:text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                    64
                  </span>
                  <span className="text-xs text-[#3f4850]">Appts</span>
                </div>
                <div className="flex items-center gap-1 text-[#006a61] mt-0.5">
                  <Icon name="bolt" className="text-[14px]" />
                  <span className="text-xs font-semibold">91% Efficiency</span>
                </div>
              </div>
            </div>

            {/* Efficiency Visual Meter */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-[#dae2fd]/60 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="font-semibold text-[#131b2e]">Group-Wide On-Time Punctuality</span>
                <span className="text-[#006194] font-bold">91.4% Target</span>
              </div>
              <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden flex">
                <div
                  className="bg-[#006194] h-full rounded-full transition-all duration-500"
                  style={{ width: '91.4%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-[#707881]">
                <span>08:00 AM Baseline</span>
                <span>Target: &gt;88%</span>
              </div>
            </div>
          </div>

          {/* Branch Visual Hero Strip (3 Clinical Facilities) */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#707881]">
              Geographic Footprint
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-[#dae2fd]/70 shadow-sm">
                <img
                  className="w-full h-28 rounded-xl object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=300&auto=format&fit=crop&q=80"
                  alt="Wuse 2 HQ"
                />
                <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Wuse 2 HQ
                </span>
                <span className="text-xs text-[#707881]">Tier 2 Surgical Facility • 4 Suites</span>
              </div>

              <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-[#dae2fd]/70 shadow-sm">
                <img
                  className="w-full h-28 rounded-xl object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=300&auto=format&fit=crop&q=80"
                  alt="Garki Satellite"
                />
                <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Garki Satellite
                </span>
                <span className="text-xs text-[#707881]">Diagnostics & Scaling • 2 Suites</span>
              </div>

              <div className="flex flex-col gap-1.5 bg-white p-3 rounded-2xl border border-[#dae2fd]/70 shadow-sm">
                <img
                  className="w-full h-28 rounded-xl object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=300&auto=format&fit=crop&q=80"
                  alt="Maitama Outpost"
                />
                <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Maitama Outpost
                </span>
                <span className="text-xs text-[#707881]">Orthodontic & Pediatric Hub • 2 Suites</span>
              </div>
            </div>
          </div>

          {/* Search & Filter Area */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search branch name, license, address..."
                className="w-full h-12 pl-10 pr-4 bg-white rounded-xl text-sm text-[#131b2e] placeholder:text-[#707881] shadow-sm border border-[#bfc7d2] focus:outline-none focus:border-[#006194]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707881] hover:text-[#131b2e]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex p-1 bg-[#eaedff] rounded-xl gap-1 shrink-0">
              <button
                onClick={() => setFilterTab('all')}
                className={`py-2 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  filterTab === 'all' ? 'bg-white text-[#006194] shadow-sm' : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                All (3)
              </button>
              <button
                onClick={() => setFilterTab('active')}
                className={`py-2 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  filterTab === 'active' ? 'bg-white text-[#006194] shadow-sm' : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Active (2)
              </button>
              <button
                onClick={() => setFilterTab('audit')}
                className={`py-2 px-4 rounded-lg text-xs md:text-sm font-semibold transition-all ${
                  filterTab === 'audit' ? 'bg-white text-[#006194] shadow-sm' : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Under Audit (1)
              </button>
            </div>
          </div>

          {/* Facility Cards List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {filteredBranches.map((branch) => (
              <div
                key={branch.id}
                className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="p-5 flex flex-col gap-3">
                  {/* Status & Badge Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <Icon name="verified" className="text-[#006194] text-[20px]" />
                        <h2 className="font-bold text-base md:text-lg text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                          {branch.name}
                        </h2>
                      </div>
                      <span className="text-xs text-[#707881]">{branch.nodeCode}</span>
                    </div>

                    <span
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${branch.statusBadgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${branch.statusDotClass}`}></span>
                      <span>{branch.statusLabel}</span>
                    </span>
                  </div>

                  {/* Accreditation Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#f2f3ff] text-[#3f4850] text-xs font-medium w-fit">
                    <Icon name="health_and_safety" className="text-[16px] text-[#006a61]" />
                    <span>{branch.accreditationBadge}</span>
                  </div>

                  {/* Address */}
                  <div className="flex items-center gap-1.5 text-xs text-[#3f4850]">
                    <Icon name="location_on" className="text-[16px] text-[#707881] shrink-0" />
                    <span className="truncate">{branch.address}</span>
                  </div>

                  {/* Clinical Operatory Details Section */}
                  <div className="py-2.5 px-3 bg-[#f2f3ff] rounded-xl flex flex-col gap-2 mt-1">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex flex-col bg-white p-2 rounded-lg border border-[#dae2fd]/60">
                        <span className="text-[#707881]">Branch Manager</span>
                        <span className="font-semibold text-[#131b2e] truncate">{branch.branchManager}</span>
                      </div>
                      <div className="flex flex-col bg-white p-2 rounded-lg border border-[#dae2fd]/60">
                        <span className="text-[#707881]">{branch.directorOrLeadTitle}</span>
                        <span className="font-semibold text-[#131b2e] truncate">{branch.directorOrLeadName}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#dae2fd]/60">
                        <Icon name="chair" className="text-[18px] text-[#006194]" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[#131b2e]">{branch.suitesTotal} Suites</span>
                          <span className="text-[#707881] truncate">{branch.suitesDetail}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#dae2fd]/60">
                        <Icon name="groups" className="text-[18px] text-[#006194]" />
                        <div className="flex flex-col min-w-0">
                          <span className="font-semibold text-[#131b2e]">{branch.cliniciansCount} Clinicians</span>
                          <span className="text-[#707881] truncate">{branch.cliniciansDetail}</span>
                        </div>
                      </div>
                    </div>

                    {/* Appointment Pipeline Indicator */}
                    <div className="p-2.5 bg-white rounded-lg border border-[#dae2fd]/60 flex flex-col gap-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-[#131b2e]">Today: {branch.apptsTotal} Appts</span>
                        <span className="text-[#006a61]">{branch.apptsCompleted} Done</span>
                      </div>
                      <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden flex">
                        <div
                          className="bg-[#006a61] h-full rounded-full transition-all duration-500"
                          style={{ width: `${branch.progressPercent}%` }}
                        ></div>
                      </div>
                      <span className="text-[11px] text-[#707881]">{branch.progressBreakdownText}</span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="p-4 bg-white border-t border-[#dae2fd]/60 flex items-center gap-2">
                  {branch.hasOpsButton && (
                    <button
                      onClick={() => navigate('/clinic-operations/branch-overview')}
                      className="flex-1 py-2 px-3 bg-[#006194] text-white rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#004b73] active:scale-95 transition-all"
                    >
                      <Icon name="open_in_new" className="text-[16px]" />
                      <span>Branch Ops</span>
                    </button>
                  )}
                  <button
                    onClick={() => showToast(`Opening facility configuration details for ${branch.name}.`)}
                    className="flex-1 py-2 px-3 bg-[#eaedff] text-[#131b2e] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] active:scale-95 transition-all border border-[#dae2fd]"
                  >
                    <Icon name="settings" className="text-[16px]" />
                    <span>Manage Details</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Corporate Governance Notice */}
          <div className="bg-[#eaedff] rounded-2xl p-4 md:p-5 flex gap-3.5 items-start border border-[#dae2fd] shadow-sm">
            <Icon name="policy" className="text-[#006194] text-[24px] shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1">
              <span className="font-semibold text-sm md:text-base text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                Statutory Facility Integrity
              </span>
              <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
                Facility licensing and cadastral zoning modifications are managed under Section 15. Operational managers administer daily clinic logistics and chairside rotations only.
              </p>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="pt-2">
            <button
              onClick={() => showToast('Redirecting to Section 15.12 Branch Accreditation Registration wizard...')}
              className="w-full h-12 rounded-xl bg-[#006194] text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#004b73] active:scale-[0.99] transition-all"
            >
              <Icon name="add_business" className="text-[20px]" />
              <span>Register New Branch (Section 15.12)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
