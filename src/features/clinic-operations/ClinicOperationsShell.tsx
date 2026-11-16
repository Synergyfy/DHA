import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Icon } from '../../design/Primitives';

interface ClinicOperationsShellProps {
  children: ReactNode;
  pageTitle?: string;
  badgeLabel?: string;
}

type NavItem = { to: string; label: string; icon: string; end?: boolean; match?: string[] };

function isNavActive(item: NavItem, pathname: string): boolean {
  if (item.match) return item.match.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (item.end) return pathname === item.to;
  return pathname === item.to || pathname.startsWith(`${item.to}/`);
}

const PRIMARY_OPS_TABS: NavItem[] = [
  { to: '/clinic-operations/dashboard', label: 'Overview', icon: 'dashboard', end: true },
  {
    to: '/clinic-operations/calendar',
    label: 'Appointments',
    icon: 'calendar_today',
    match: [
      '/clinic-operations/calendar',
      '/clinic-operations/appointment-list',
      '/clinic-operations/appointment-details',
      '/clinic-operations/create-appointment',
      '/clinic-operations/walk-in-queue',
      '/clinic-operations/walk-in-registration',
    ],
  },
  {
    to: '/clinic-operations/patient-directory',
    label: 'Patients',
    icon: 'person_search',
    match: [
      '/clinic-operations/patient-directory',
      '/clinic-operations/reception-desk',
      '/clinic-operations/waiting-queue',
    ],
  },
];

/* Primary sidebar — major destinations only (DHA guide §10.4).
   Calendar / list / details / walk-ins, check-in & queue, report sub-pages,
   invoice/payment pages, announcements and settings sub-pages are nested
   inside their parent destination. */
const ALL_CLINIC_OPS_NAV_ITEMS: NavItem[] = [
  {
    to: '/clinic-operations/dashboard',
    label: 'Overview',
    icon: 'dashboard',
    match: ['/clinic-operations/dashboard', '/clinic-operations/org-overview', '/clinic-operations/customise'],
  },
  {
    to: '/clinic-operations/calendar',
    label: 'Appointments',
    icon: 'calendar_today',
    match: [
      '/clinic-operations/calendar',
      '/clinic-operations/appointment-list',
      '/clinic-operations/appointment-details',
      '/clinic-operations/create-appointment',
      '/clinic-operations/walk-in-queue',
      '/clinic-operations/walk-in-registration',
    ],
  },
  {
    to: '/clinic-operations/patient-directory',
    label: 'Patients',
    icon: 'person_search',
    match: [
      '/clinic-operations/patient-directory',
      '/clinic-operations/reception-desk',
      '/clinic-operations/waiting-queue',
    ],
  },
  {
    to: '/clinic-operations/clinical-overview',
    label: 'Clinical Operations',
    icon: 'dentistry',
    match: [
      '/clinic-operations/clinical-overview',
      '/clinic-operations/workflow-monitoring',
      '/clinic-operations/clinical-activity-details',
      '/clinic-operations/referrals',
    ],
  },
  {
    to: '/clinic-operations/staff-roster',
    label: 'Staff & Teams',
    icon: 'badge',
    match: [
      '/clinic-operations/staff-roster',
      '/clinic-operations/shift-timetable',
      '/clinic-operations/tasks',
      '/staff-management',
    ],
  },
  {
    to: '/clinic-operations/branch-overview',
    label: 'Clinics & Branches',
    icon: 'hub',
    match: [
      '/clinic-operations/branch-overview',
      '/clinic-operations/branch-operational-details',
      '/clinic-operations/branch-management',
      '/clinic-operations/branch-switcher',
    ],
  },
  {
    to: '/clinic-operations/equipment-register',
    label: 'Facilities',
    icon: 'precision_manufacturing',
    match: [
      '/clinic-operations/equipment-register',
      '/clinic-operations/equipment-details',
      '/clinic-operations/equipment-maintenance',
      '/clinic-operations/supplies-overview',
      '/clinic-operations/add-inventory-item',
      '/clinic-operations/inventory-item-details',
    ],
  },
  {
    to: '/clinic-operations/financial-dashboard',
    label: 'Finance',
    icon: 'account_balance_wallet',
    match: [
      '/clinic-operations/financial-dashboard',
      '/clinic-operations/billing-invoices',
      '/clinic-operations/invoice-details',
      '/clinic-operations/payment-recording',
      '/clinic-operations/payment-history',
      '/clinic-operations/refund-adjustments',
    ],
  },
  {
    to: '/clinic-operations/operational-reports',
    label: 'Reports & Analytics',
    icon: 'analytics',
    match: [
      '/clinic-operations/operational-reports',
      '/clinic-operations/appointment-attendance-reports',
      '/clinic-operations/patient-activity-reports',
      '/clinic-operations/clinical-operations-reports',
      '/clinic-operations/financial-reports',
      '/clinic-operations/branch-comparison-reports',
    ],
  },
  {
    to: '/clinic-operations/notifications-centre',
    label: 'Communication',
    icon: 'campaign',
    match: [
      '/clinic-operations/notifications-centre',
      '/clinic-operations/internal-announcements',
      '/clinic-operations/create-announcement',
    ],
  },
  {
    to: '/clinic-operations/clinic-preferences',
    label: 'Settings',
    icon: 'settings',
    match: ['/clinic-operations/clinic-preferences', '/clinic-operations/dashboard-settings'],
  },
];

export function ClinicOperationsShell({
  children,
  pageTitle = 'Clinic Operations',
  badgeLabel = 'BrightSmile Dental OS',
}: ClinicOperationsShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedBranch, setSelectedBranch] = useState<'wuse' | 'all'>('wuse');
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex font-['Inter',sans-serif] antialiased selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* ════════════ Desktop Permanent Left Sidebar (md+) ════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 fixed inset-y-0 left-0 z-30 bg-white border-r border-[#dae2fd] shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-[#dae2fd] flex items-center justify-between shrink-0">
          <NavLink to="/clinic-operations/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Icon name="dentistry" className="text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-[#131b2e] leading-tight">BrightSmile OS</span>
              <span className="text-[10px] text-[#006a61] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
                <span>Clinic Operations</span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Manager Card */}
        <div className="p-3 mx-3 mt-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white">
              DM
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-[#131b2e] truncate">David Madu</div>
              <div className="text-[10px] text-[#707881] font-mono truncate">Clinic Operations Lead</div>
            </div>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Sidebar Navigation">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] px-2.5 py-1">
            Clinic Operations
          </div>
          {ALL_CLINIC_OPS_NAV_ITEMS.map((item) => {
            const isActive = isNavActive(item, location.pathname);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#cce5ff]/60 text-[#006194] font-bold shadow-xs'
                    : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <Icon
                  name={item.icon}
                  className={`text-[18px] shrink-0 ${isActive ? 'text-[#006194]' : 'text-[#707881]'}`}
                />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: Sign Out */}
        <div className="p-3 border-t border-[#dae2fd] space-y-1.5 shrink-0 bg-white">
          <NavLink
            to="/dentist/dashboard"
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-[#3f4850] hover:text-[#006194] hover:bg-[#f2f3ff] flex items-center gap-2 transition-colors"
          >
            <Icon name="medical_services" className="text-[16px] text-[#707881]" />
            <span>Switch to Clinician View</span>
          </NavLink>
          <button
            type="button"
            onClick={() => { useAuthStore.getState().signOut(); navigate('/login'); }}
            className="w-full px-3 py-2 rounded-xl bg-[#ffdad6]/40 hover:bg-[#ffdad6]/70 text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Icon name="logout" className="text-[16px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ════════════ Main Content & Header Area ════════════ */}
      <div className="md:pl-60 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#dae2fd] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
            {/* Left: Mobile Brand & Branch Picker */}
            <div className="flex items-center gap-2.5 min-w-0">
              <NavLink to="/clinic-operations/dashboard" className="md:hidden flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-xs">
                  <Icon name="dentistry" className="text-[18px]" />
                </div>
              </NavLink>

              <div className="relative">
                <button
                  type="button"
                  onClick={() => setBranchDropdownOpen(!branchDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#006194] transition-colors border border-[#dae2fd]"
                >
                  <Icon name="apartment" className="text-[14px]" />
                  <span className="truncate max-w-[130px] sm:max-w-none">
                    {selectedBranch === 'wuse' ? 'Wuse 2 (HQ)' : 'All Branches'}
                  </span>
                  <Icon name="expand_more" className="text-[14px]" />
                </button>

                {/* Desktop dropdown */}
                {branchDropdownOpen && (
                  <div className="hidden md:block absolute left-0 mt-1 w-56 bg-white rounded-xl shadow-lg border border-[#dae2fd] py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBranch('wuse');
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-medium hover:bg-[#f2f3ff] transition-colors flex items-center justify-between ${
                        selectedBranch === 'wuse' ? 'text-[#006194] font-bold bg-[#f2f3ff]' : 'text-[#3f4850]'
                      }`}
                    >
                      <span>Wuse 2 Branch (HQ)</span>
                      {selectedBranch === 'wuse' && <Icon name="check" className="text-[14px]" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedBranch('all');
                        setBranchDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-medium hover:bg-[#f2f3ff] transition-colors flex items-center justify-between ${
                        selectedBranch === 'all' ? 'text-[#006194] font-bold bg-[#f2f3ff]' : 'text-[#3f4850]'
                      }`}
                    >
                      <span>All Branches Consolidated</span>
                      {selectedBranch === 'all' && <Icon name="check" className="text-[14px]" />}
                    </button>
                    <div className="pt-1 mt-1 border-t border-[#dae2fd]">
                      <button
                        type="button"
                        onClick={() => {
                          setBranchDropdownOpen(false);
                          navigate('/clinic-operations/branch-overview');
                        }}
                        className="w-full px-3 py-1.5 text-left text-xs font-bold text-[#006194] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5"
                      >
                        <Icon name="domain" className="text-[14px]" />
                        <span>Manage Branch Facilities</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center Title (Desktop) */}
            <div className="hidden lg:flex items-center gap-2.5">
              <span className="text-sm font-bold text-[#131b2e]">{pageTitle}</span>
              {badgeLabel && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#006194] font-semibold border border-[#dae2fd]">
                  {badgeLabel}
                </span>
              )}
            </div>

            {/* Right Action Icons & Profile */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/clinic-operations/announcements')}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e] flex items-center justify-center relative transition-colors"
                aria-label="Announcements"
              >
                <Icon name="notifications" className="text-[20px]" />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/clinic-operations/customise')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#006194] transition-colors border border-[#dae2fd]"
              >
                <Icon name="tune" className="text-[16px]" />
                <span>Customise</span>
              </button>

              {/* Profile Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 pl-2 border-l border-[#dae2fd] text-left hover:opacity-85 transition-opacity"
                >
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#eaedff]">
                    DM
                  </div>
                  <div className="hidden md:flex flex-col min-w-0 text-left">
                    <span className="text-xs font-bold text-[#131b2e] leading-tight">David Madu</span>
                    <span className="text-[10px] text-[#707881] font-mono">Clinic Manager</span>
                  </div>
                  <Icon name="expand_more" className="text-[16px] text-[#707881] hidden sm:block" />
                </button>

                {/* Desktop Profile Dropdown */}
                {profileDropdownOpen && (
                  <div className="hidden md:block absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-[#dae2fd] py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-[#dae2fd]">
                      <p className="text-xs font-bold text-[#131b2e]">David Madu</p>
                      <p className="text-[11px] text-[#707881]">david.madu@brightsmile.ng</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/clinic-operations/dashboard');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-[#3f4850] hover:bg-[#f2f3ff] flex items-center gap-2"
                    >
                      <Icon name="dashboard" className="text-[16px]" />
                      <span>Operations Dashboard</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/staff-management/dashboard');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-[#3f4850] hover:bg-[#f2f3ff] flex items-center gap-2"
                    >
                      <Icon name="groups" className="text-[16px]" />
                      <span>Staff Management</span>
                    </button>
                    <div className="border-t border-[#dae2fd] my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        useAuthStore.getState().signOut(); navigate('/login');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-[#ba1a1a] font-semibold hover:bg-[#ffdad6]/30 flex items-center gap-2"
                    >
                      <Icon name="logout" className="text-[16px]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ════════════ Mobile Bottom Popup: Branch Selector ════════════ */}
        {branchDropdownOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
              onClick={() => setBranchDropdownOpen(false)}
            />
            <div className="relative w-full bg-white rounded-t-3xl p-5 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#131b2e]">Select Operations Scope</h3>
                <button
                  type="button"
                  onClick={() => setBranchDropdownOpen(false)}
                  className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
                >
                  <Icon name="close" className="text-[16px]" />
                </button>
              </div>
              <div className="space-y-1.5 mb-3">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('wuse');
                    setBranchDropdownOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    selectedBranch === 'wuse'
                      ? 'border-[#006194] bg-[#f2f3ff] text-[#006194]'
                      : 'border-slate-100 text-[#3f4850] hover:bg-slate-50'
                  }`}
                >
                  <span>Wuse 2 Branch (HQ)</span>
                  {selectedBranch === 'wuse' && <Icon name="check_circle" className="text-[18px] text-[#006194]" />}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedBranch('all');
                    setBranchDropdownOpen(false);
                  }}
                  className={`w-full p-3 rounded-2xl text-left text-xs font-semibold flex items-center justify-between border transition-all ${
                    selectedBranch === 'all'
                      ? 'border-[#006194] bg-[#f2f3ff] text-[#006194]'
                      : 'border-slate-100 text-[#3f4850] hover:bg-slate-50'
                  }`}
                >
                  <span>All Branches Consolidated</span>
                  {selectedBranch === 'all' && <Icon name="check_circle" className="text-[18px] text-[#006194]" />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setBranchDropdownOpen(false);
                  navigate('/clinic-operations/branch-overview');
                }}
                className="w-full py-2.5 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Icon name="domain" className="text-[16px]" />
                <span>Manage Branch Facilities</span>
              </button>
            </div>
          </div>
        )}

        {/* ════════════ Mobile Bottom Popup: Profile Sheet ════════════ */}
        {profileDropdownOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
              onClick={() => setProfileDropdownOpen(false)}
            />
            <div className="relative w-full bg-white rounded-t-3xl p-5 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#f2f3ff] mb-4">
                <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  DM
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-[#131b2e]">David Madu</h4>
                  <p className="text-xs text-[#707881]">david.madu@brightsmile.ng</p>
                  <p className="text-[10px] text-[#006a61] font-bold mt-0.5">Clinic Operations Lead</p>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/clinic-operations/dashboard');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] flex items-center gap-2.5"
                >
                  <Icon name="dashboard" className="text-[18px] text-[#006194]" />
                  <span>Operations Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/staff-management/dashboard');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] flex items-center gap-2.5"
                >
                  <Icon name="groups" className="text-[18px] text-[#006a61]" />
                  <span>Staff Management</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/dentist/dashboard');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] flex items-center gap-2.5"
                >
                  <Icon name="medical_services" className="text-[18px] text-[#287ab3]" />
                  <span>Switch to Clinician View</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  useAuthStore.getState().signOut(); navigate('/login');
                }}
                className="w-full py-3 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <Icon name="logout" className="text-[18px]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* ════════════ Mobile Bottom Popup: "More" Bottom Sheet ════════════ */}
        {mobileMoreOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
            {/* Scrim */}
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
              onClick={() => setMobileMoreOpen(false)}
            />
            {/* Sheet */}
            <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 bg-slate-300 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-5 py-3 border-b border-[#dae2fd] flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-[#131b2e]">All Operations Modules</h3>
                  <p className="text-[11px] text-[#707881]">Complete practice management & tools</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMoreOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
                  aria-label="Close"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              {/* Scrollable Grid of All Pages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="grid grid-cols-4 gap-2">
                  {ALL_CLINIC_OPS_NAV_ITEMS.map((item) => {
                    const isActive = isNavActive(item, location.pathname);
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        end={item.end}
                        onClick={() => setMobileMoreOpen(false)}
                        className={`flex flex-col items-center justify-center gap-1.5 p-2 rounded-2xl text-center transition-all ${
                          isActive
                            ? 'bg-[#cce5ff]/60 text-[#006194] font-bold ring-1 ring-[#006194]/30'
                            : 'text-[#3f4850] hover:bg-[#f2f3ff]'
                        }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-2xs ${
                            isActive ? 'bg-[#006194] text-white' : 'bg-[#f2f3ff] text-[#006194]'
                          }`}
                        >
                          <Icon name={item.icon} className="text-[20px]" />
                        </div>
                        <span className="text-[10px] leading-tight font-medium line-clamp-2">
                          {item.label}
                        </span>
                      </NavLink>
                    );
                  })}
                </div>

                {/* Switcher & Sign Out actions */}
                <div className="pt-2 border-t border-[#dae2fd] space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMoreOpen(false);
                      navigate('/dentist/dashboard');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#006194] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="medical_services" className="text-[16px]" />
                    <span>Switch to Clinician View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMoreOpen(false);
                      useAuthStore.getState().signOut(); navigate('/login');
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#ffdad6]/50 hover:bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="logout" className="text-[16px]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
          {children}
        </main>

        {/* ════════════ Mobile Bottom Navigation Bar with "More" ════════════ */}
        <nav
          className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#dae2fd] shadow-[0_-2px_12px_rgba(0,0,0,0.04)] md:hidden"
          aria-label="Mobile Bottom Navigation"
        >
          <div className="h-16 px-2 flex items-center justify-around">
            {PRIMARY_OPS_TABS.map((tab) => {
              const isActive = isNavActive(tab, location.pathname);
              return (
                <button
                  key={tab.to}
                  type="button"
                  onClick={() => navigate(tab.to)}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors ${
                    isActive ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name={tab.icon} className="text-[20px]" />
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}

            {/* "More" button */}
            <button
              type="button"
              onClick={() => setMobileMoreOpen(true)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors ${
                mobileMoreOpen ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="grid_view" className="text-[20px]" />
              <span className="text-[10px] tracking-tight">More</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
