import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  credentials: string;
  title: string;
  licenseNumber: string;
  statusBadge: string;
  statusType: 'verified' | 'pending' | 'restricted';
  branchText: string;
  branchBadge: string;
  category: 'dentist' | 'nursing' | 'admin';
  isPending: boolean;
  isDualBranch: boolean;
  branches: ('hq' | 'garki')[];
  scopeSummary: string;
  scopeHighlight: string;
  scopeAlert?: boolean;
}

export function StaffProfessionalManagementScreen() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<'overview' | 'branches' | 'staff' | 'changes' | 'support'>('staff');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'dentist' | 'nursing' | 'admin' | 'pending'>('all');
  const [selectedBranch, setSelectedBranch] = useState<'all' | 'hq' | 'garki'>('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [exportNotice, setExportNotice] = useState(false);

  const staffList: StaffMember[] = [
    {
      id: 'staff-1',
      name: 'Dr. Amina Bello',
      initials: 'AB',
      credentials: 'DDS, FWACS',
      title: 'Medical Director & Chief Dental Surgeon',
      licenseNumber: 'MDCN #DEN-78421',
      statusBadge: 'DHA Verified Active',
      statusType: 'verified',
      branchText: 'Wuse 2 HQ (Primary)',
      branchBadge: 'Full Clinical & Facility Admin',
      category: 'dentist',
      isPending: false,
      isDualBranch: false,
      branches: ['hq'],
      scopeSummary: 'Full Scope: Surgical Restorative, Diagnostics, Odontogram Sign-off, e-Prescribing',
      scopeHighlight: 'Medical Director with full practice clearance',
    },
    {
      id: 'staff-2',
      name: 'Dr. Daniel James',
      initials: 'DJ',
      credentials: 'DDS',
      title: 'Lead Restorative Clinician',
      licenseNumber: 'MDCN #DEN-94812',
      statusBadge: 'Invite Pending (18 Oct)',
      statusType: 'pending',
      branchText: 'Dual: Wuse 2 HQ & Garki',
      branchBadge: 'Senior Restorative Odontologist',
      category: 'dentist',
      isPending: true,
      isDualBranch: true,
      branches: ['hq', 'garki'],
      scopeSummary: 'Awaiting Clinician Registration & DHA Credential Handshake',
      scopeHighlight: 'Invitation dispatched; credentialing pending',
      scopeAlert: true,
    },
    {
      id: 'staff-3',
      name: 'Dr. Tunde Fashola',
      initials: 'TF',
      credentials: 'BDS',
      title: 'Associate General Dentist & Garki Lead',
      licenseNumber: 'MDCN #DEN-65412',
      statusBadge: 'DHA Verified Active',
      statusType: 'verified',
      branchText: 'Garki Branch (Lead Clinician)',
      branchBadge: 'General Dentistry',
      category: 'dentist',
      isPending: false,
      isDualBranch: true,
      branches: ['garki', 'hq'],
      scopeSummary: 'Rostered on Saturday Rotation at Wuse 2 HQ',
      scopeHighlight: 'Assigned as primary lead for Garki satellite operations',
    },
    {
      id: 'staff-4',
      name: 'Nurse Zainab Tariq',
      initials: 'ZT',
      credentials: 'RN',
      title: 'Head Chairside Nurse & IPC Lead',
      licenseNumber: 'NMCN #RN-9428',
      statusBadge: 'Active • IPC Certified',
      statusType: 'verified',
      branchText: 'Wuse 2 HQ',
      branchBadge: 'Sterilization & Chairside Lead',
      category: 'nursing',
      isPending: false,
      isDualBranch: false,
      branches: ['hq'],
      scopeSummary: 'DHA IPC Protocol Compliance Officer #DHA-IPC-2024',
      scopeHighlight: 'Supervises CSSD and chairside disinfection procedures',
    },
    {
      id: 'staff-5',
      name: 'Fatima Noor',
      initials: 'FN',
      credentials: 'RDH',
      title: 'Registered Dental Hygienist',
      licenseNumber: 'PSV Tracking #DHA-PSV-5510',
      statusBadge: 'PSV in Review',
      statusType: 'pending',
      branchText: 'Wuse 2 HQ',
      branchBadge: 'Prophylaxis & Periodontal Hygiene',
      category: 'nursing',
      isPending: true,
      isDualBranch: false,
      branches: ['hq'],
      scopeSummary: 'Primary Source Degree verification under evaluation at DHA Board',
      scopeHighlight: 'Degree verification docket in transit',
    },
    {
      id: 'staff-6',
      name: 'Chidera Eze',
      initials: 'CE',
      credentials: 'B.Sc',
      title: 'Practice & Operations Manager / Reception',
      licenseNumber: 'Staff ID #GF-ADM-04',
      statusBadge: 'Active (Non-Clinical)',
      statusType: 'restricted',
      branchText: 'Wuse 2 HQ',
      branchBadge: 'Clinical Scope Restricted',
      category: 'admin',
      isPending: false,
      isDualBranch: false,
      branches: ['hq'],
      scopeSummary: 'Prohibited from charting odontograms, prescriptions, or treatment plans',
      scopeHighlight: 'Strictly administration, billing, and patient check-in only',
      scopeAlert: true,
    },
  ];

  const handleNavClick = (tab: 'overview' | 'branches' | 'staff' | 'changes' | 'support') => {
    setActiveNav(tab);
    if (tab === 'overview') navigate('/clinic-onboarding/admin-dashboard');
    if (tab === 'branches') navigate('/clinic-onboarding/branch-approval');
    if (tab === 'staff') navigate('/clinic-onboarding/staff-management');
    if (tab === 'changes') navigate('/clinic-onboarding/profile-management');
    if (tab === 'support') navigate('/clinic-onboarding/support');
  };

  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      // Category filter
      if (selectedCategory === 'dentist' && staff.category !== 'dentist') return false;
      if (selectedCategory === 'nursing' && staff.category !== 'nursing') return false;
      if (selectedCategory === 'admin' && staff.category !== 'admin') return false;
      if (selectedCategory === 'pending' && !staff.isPending) return false;

      // Branch filter
      if (selectedBranch === 'hq' && !staff.branches.includes('hq')) return false;
      if (selectedBranch === 'garki' && !staff.branches.includes('garki')) return false;

      // Text search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const match =
          staff.name.toLowerCase().includes(query) ||
          staff.licenseNumber.toLowerCase().includes(query) ||
          staff.title.toLowerCase().includes(query) ||
          staff.credentials.toLowerCase().includes(query) ||
          staff.branchText.toLowerCase().includes(query);
        if (!match) return false;
      }

      return true;
    });
  }, [selectedCategory, selectedBranch, searchQuery]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedBranch('all');
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/dashboard')}
              className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Go back"
            >
              <Icon name="arrow_back_ios_new" className="text-xl" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#006194]">
              <Icon name="local_hospital" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-tight">Staff &amp; Professional Management</span>
              <span className="text-xs uppercase tracking-wider text-[#006a61] font-semibold">DHA Portal</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-onboarding/support')}
              aria-label="Notifications"
              className="w-10 h-10 rounded-full flex items-center justify-center text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Icon name="notifications" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-28">
        <div className="space-y-6">
          {/* DHA Statutory Verification & Role Isolation Banner */}
          <div className="relative overflow-hidden bg-sky-50 border border-sky-200 rounded-xl p-4 sm:p-5 shadow-sm">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-9 h-9 rounded-lg bg-[#006194] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Icon name="verified_user" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm sm:text-base font-bold text-slate-900">DHA &amp; MDCN Statutory Guardrail</span>
                  <span className="bg-teal-700 text-white font-semibold text-[11px] px-2.5 py-0.5 rounded-full">
                    Enforced
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
                  Facility administrators cannot grant clinical verification status. Verification operates strictly via independent Primary Source Verification (DHA / MDCN / NMCN). Non-clinical personnel remain systematically barred from patient records, clinical charts, and diagnostic odontograms.
                </p>
              </div>
            </div>
          </div>

          {/* Practice Summary Metric Strip (4-col metric bento) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Total Roster</span>
                <Icon name="groups" className="text-[#006194] text-[20px]" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-slate-900">6</span>
                <span className="text-xs text-slate-500">staff</span>
              </div>
              <span className="text-[11px] text-[#006a61] font-medium mt-1">Greenfield Clinic Ltd</span>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">DHA Verified</span>
                <Icon name="verified" className="text-[#006a61] text-[20px]" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#006a61]">4</span>
                <span className="text-xs text-slate-500">licensed</span>
              </div>
              <span className="text-[11px] text-[#006a61] font-medium mt-1">Active practice rights</span>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">In Onboarding</span>
                <Icon name="pending_actions" className="text-amber-600 text-[20px]" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-amber-600">2</span>
                <span className="text-xs text-slate-500">pending</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium mt-1">1 review • 1 invite</span>
            </div>

            <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/70 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Dual-Branch</span>
                <Icon name="share_location" className="text-[#006194] text-[20px]" />
              </div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-bold text-[#006194]">2</span>
                <span className="text-xs text-slate-500">clinicians</span>
              </div>
              <span className="text-[11px] text-[#006194] font-medium mt-1">HQ &amp; Garki sync</span>
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="bg-white rounded-xl p-4 sm:p-5 shadow-sm border border-slate-200/70 space-y-4">
            {/* Search Input */}
            <div className="relative flex items-center">
              <Icon name="search" className="absolute left-3.5 text-slate-400 text-[20px] pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff by name, license #, or role..."
                className="w-full bg-[#f2f3ff] text-slate-900 text-sm pl-11 pr-10 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#006194] placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600"
                >
                  <Icon name="cancel" className="text-[18px]" />
                </button>
              )}
            </div>

            {/* Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All Staff (6)' },
                { id: 'dentist', label: 'Dentists (3)' },
                { id: 'nursing', label: 'Hygienists & Nurses (2)' },
                { id: 'admin', label: 'Admin (1)' },
                { id: 'pending', label: 'Pending Invites (1)' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id as typeof selectedCategory)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === tab.id
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Branch Filters */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider shrink-0 mr-1">Branch:</span>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                {[
                  { id: 'all', label: 'All Branches' },
                  { id: 'hq', label: 'Wuse 2 HQ' },
                  { id: 'garki', label: 'Garki Branch' },
                ].map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setSelectedBranch(b.id as typeof selectedBranch)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedBranch === b.id
                        ? 'bg-[#006a61] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {b.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Staff Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredStaff.map((staff) => (
              <div
                key={staff.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 space-y-4 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="relative shrink-0">
                        <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center font-bold text-base ${
                          staff.statusType === 'verified'
                            ? 'bg-sky-100 text-[#006194]'
                            : staff.statusType === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {staff.initials}
                        </div>
                        <span
                          className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                            staff.statusType === 'verified'
                              ? 'bg-teal-600'
                              : staff.statusType === 'pending'
                              ? 'bg-amber-500'
                              : 'bg-slate-500'
                          }`}
                        />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-base font-bold text-slate-900 truncate">{staff.name}</span>
                          <span className="text-xs font-semibold text-[#006194]">{staff.credentials}</span>
                        </div>
                        <span className="text-xs text-slate-600 mt-0.5">{staff.title}</span>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[11px] font-mono text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {staff.licenseNumber}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="shrink-0 flex flex-col items-end">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        staff.statusType === 'verified'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : staff.statusType === 'pending'
                          ? 'bg-amber-50 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Icon
                          name={staff.statusType === 'verified' ? 'verified' : staff.statusType === 'pending' ? 'pending' : 'lock'}
                          className="text-[14px]"
                        />
                        {staff.statusBadge}
                      </span>
                    </div>
                  </div>

                  {/* Metadata Zone */}
                  <div className="bg-[#f2f3ff] rounded-lg p-3 mt-3 space-y-2 border border-sky-100/60 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span className="flex items-center gap-1 text-slate-800 font-medium">
                        <Icon name="apartment" className="text-[15px] text-[#006194]" />
                        {staff.branchText}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                        staff.category === 'admin'
                          ? 'bg-red-100 text-red-800 font-semibold'
                          : 'bg-slate-200/80 text-slate-700'
                      }`}>
                        {staff.branchBadge}
                      </span>
                    </div>
                    <div className={`flex items-center gap-1.5 ${
                      staff.scopeAlert ? 'text-amber-800 font-medium' : 'text-slate-600'
                    }`}>
                      <Icon
                        name={staff.scopeAlert ? 'warning' : 'clinical_notes'}
                        className={`text-[15px] shrink-0 ${staff.scopeAlert ? 'text-amber-600' : 'text-teal-700'}`}
                      />
                      <span className="truncate">{staff.scopeSummary}</span>
                    </div>
                  </div>
                </div>

                {/* Action Row */}
                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  {staff.isPending ? (
                    <>
                      <button
                        onClick={() => alert(`Resent invitation email to ${staff.name}`)}
                        className="px-3 py-1.5 rounded-lg bg-[#006194] text-white hover:bg-[#004b73] text-xs font-semibold flex items-center gap-1"
                      >
                        <Icon name="send" className="text-[14px]" />
                        Resend Invite
                      </button>
                    </>
                  ) : null}
                  <button
                    onClick={() => setSelectedStaff(staff)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold flex items-center gap-1"
                  >
                    <Icon name="visibility" className="text-[15px]" />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredStaff.length === 0 && (
            <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-sm text-center border border-slate-200/70">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <Icon name="person_search" className="text-2xl" />
              </div>
              <h3 className="text-base font-bold text-slate-900">No staff members match your criteria</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm">
                Try searching by license number, first name, last name, or change your branch and category filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-4 px-4 py-2 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73]"
              >
                Reset All Filters
              </button>
            </div>
          )}

          {/* Primary Actions Footer Bar */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/clinic-onboarding/professional-invitation')}
              className="flex-1 h-12 rounded-xl bg-[#006194] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#004b73] active:scale-[0.99] transition-all"
            >
              <Icon name="person_add" className="text-[20px]" />
              <span>+ Invite New Professional (15.15)</span>
            </button>
            <button
              onClick={() => {
                setExportNotice(true);
                setTimeout(() => setExportNotice(false), 2000);
              }}
              className="h-12 px-6 rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-slate-50 transition-all"
            >
              <Icon name="file_download" className="text-[18px] text-slate-500" />
              <span>Export Staff Roster (PDF/CSV)</span>
            </button>
          </div>

          {exportNotice && (
            <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-2">
              <Icon name="check_circle" className="text-[18px]" />
              Staff roster exported to CSV / PDF successfully.
            </div>
          )}
        </div>
      </main>

      {/* Staff Detail Modal */}
      {selectedStaff && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-100 text-[#006194] flex items-center justify-center font-bold text-lg">
                  {selectedStaff.initials}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedStaff.name}</h3>
                  <p className="text-xs text-slate-500">{selectedStaff.title}</p>
                </div>
              </div>
              <button onClick={() => setSelectedStaff(null)} className="text-slate-400 hover:text-slate-600">
                <Icon name="close" className="text-2xl" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">License &amp; Registration</span>
                <p className="font-mono text-slate-800 font-bold">{selectedStaff.licenseNumber}</p>
                <p className="text-slate-600">{selectedStaff.credentials}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Assigned Location</span>
                <p className="text-slate-800 font-semibold">{selectedStaff.branchText}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg space-y-1">
                <span className="text-slate-500 font-semibold uppercase text-[10px]">Clinical Practice Scope</span>
                <p className="text-slate-700 leading-relaxed">{selectedStaff.scopeSummary}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedStaff(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Navigating to role assignment editor for ${selectedStaff.name}`);
                  setSelectedStaff(null);
                }}
                className="px-4 py-2 rounded-lg bg-[#006194] text-white hover:bg-[#004b73] text-xs font-semibold"
              >
                Edit Role &amp; Scope
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Shared Bottom Navigation Bar */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-lg mx-auto flex justify-around items-center h-18 px-2 py-2">
          <button
            onClick={() => handleNavClick('overview')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'overview' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[11px]">Overview</span>
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'branches' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="domain_verification" className="text-[22px]" />
            <span className="text-[11px]">Branches</span>
          </button>
          <button
            onClick={() => handleNavClick('staff')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'staff' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="badge" className="text-[22px]" />
            <span className="text-[11px]">Staff</span>
          </button>
          <button
            onClick={() => handleNavClick('changes')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'changes' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="published_with_changes" className="text-[22px]" />
            <span className="text-[11px]">Changes</span>
          </button>
          <button
            onClick={() => handleNavClick('support')}
            className={`flex flex-col items-center justify-center gap-1 min-w-[56px] py-1 transition-colors ${
              activeNav === 'support' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="support_agent" className="text-[22px]" />
            <span className="text-[11px]">Support</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
