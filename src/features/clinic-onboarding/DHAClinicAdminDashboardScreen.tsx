import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ApplicationItem {
  id: string;
  ref: string;
  facilityName: string;
  typeAndLocation: string;
  status: 'under_review' | 'info_needed' | 'audit_scheduled' | 'decision_ready';
  statusLabel: string;
  stageText?: string;
  stageProgress?: number;
  flags: { label: string; icon: string; isError?: boolean }[];
  reviewer: string;
  subDate: string;
  recommendation?: string;
  primaryActionLabel: string;
  primaryActionRoute: string;
}

export function DHAClinicAdminDashboardScreen() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<'overview' | 'branches' | 'staff' | 'changes' | 'support'>('overview');
  const [activeFilter, setActiveFilter] = useState<'all' | 'under_review' | 'info_needed' | 'ready_audit' | 'decision_ready'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [batchNotice, setBatchNotice] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const applications: ApplicationItem[] = [
    {
      id: 'app-1',
      ref: 'DHA-APP-2026-8819',
      facilityName: 'Greenfield Dental Clinic Ltd',
      typeAndLocation: 'Dental Clinic Ltd • Plot 1044 Wuse 2, Abuja',
      status: 'under_review',
      statusLabel: 'Under Review',
      stageText: 'Stage 3 of 5: Statutory Compliance',
      stageProgress: 60,
      flags: [
        { label: 'NNRA Permit Pending', icon: 'warning', isError: true },
        { label: 'Garki Satellite Branch Included', icon: 'account_tree' },
      ],
      reviewer: 'Insp. Ibrahim Musa',
      subDate: '18 Oct 2026',
      primaryActionLabel: 'Review Workspace',
      primaryActionRoute: '/clinic-onboarding/review-workspace',
    },
    {
      id: 'app-2',
      ref: 'DHA-APP-2026-8804',
      facilityName: 'Apex Oral & Maxillofacial Hospital',
      typeAndLocation: 'Dental Hospital • 14 Gana St, Maitama, Abuja',
      status: 'info_needed',
      statusLabel: 'Info Needed',
      flags: [
        { label: 'OT Sterilization Validation Overdue', icon: 'schedule', isError: true },
        { label: 'General Anaesthesia Tier', icon: 'medical_services' },
      ],
      reviewer: 'Desk Review Queue',
      subDate: '17 Oct 2026 (Day 4 of 7 SLA)',
      primaryActionLabel: 'View Details',
      primaryActionRoute: '/clinic-onboarding/request-information',
    },
    {
      id: 'app-3',
      ref: 'DHA-APP-2026-8790',
      facilityName: 'SmileCare Community Practice',
      typeAndLocation: 'Dental Practice • 3rd Ave, Gwarinpa, Abuja',
      status: 'audit_scheduled',
      statusLabel: 'Audit Scheduled',
      flags: [
        { label: 'Field Inspection Booked for 22 Oct 2026, 10:00 AM', icon: 'verified' },
      ],
      reviewer: 'Desk Audit Cleared by Insp. Okafor',
      subDate: '16 Oct 2026',
      primaryActionLabel: 'View Schedule',
      primaryActionRoute: '/clinic-onboarding/branch-approval',
    },
    {
      id: 'app-4',
      ref: 'DHA-APP-2026-8765',
      facilityName: 'Lumina Dental Imaging & Diagnostics',
      typeAndLocation: 'Diagnostic Centre • Central Business District, Abuja',
      status: 'decision_ready',
      statusLabel: 'Decision Ready',
      flags: [
        { label: 'CBCT Radiation Shield Approved', icon: 'shield_with_heart' },
      ],
      reviewer: 'Inspectorate Board',
      subDate: '15 Oct 2026',
      recommendation: 'Grant DHA License',
      primaryActionLabel: 'Review Decision',
      primaryActionRoute: '/clinic-onboarding/review-workspace',
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

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (activeFilter === 'under_review' && app.status !== 'under_review') return false;
      if (activeFilter === 'info_needed' && app.status !== 'info_needed') return false;
      if (activeFilter === 'ready_audit' && app.status !== 'audit_scheduled') return false;
      if (activeFilter === 'decision_ready' && app.status !== 'decision_ready') return false;

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          app.facilityName.toLowerCase().includes(q) ||
          app.ref.toLowerCase().includes(q) ||
          app.typeAndLocation.toLowerCase().includes(q) ||
          app.reviewer.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [activeFilter, searchQuery]);

  const ADMIN_SIDE_NAV = [
    { to: '/clinic-onboarding/admin-dashboard', label: 'Applications Queue', icon: 'dashboard', end: true },
    // Review Workspace is a dependent page — it opens from an application card in the queue.
    { to: '/clinic-onboarding/branch-approval', label: 'Branch Inspections', icon: 'domain_verification' },
    { to: '/clinic-onboarding/staff-management', label: 'Staff Credentials', icon: 'badge' },
    { to: '/clinic-onboarding/profile-management', label: 'Profile & Changes', icon: 'published_with_changes' },
    { to: '/clinic-onboarding/history', label: 'Verification History', icon: 'history' },
    { to: '/clinic-onboarding/support', label: 'Support & Disputes', icon: 'support_agent' },
  ];

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex font-sans antialiased">
      {/* ════════════ Desktop Permanent Left Sidebar (md+) ════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200 shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            <Icon name="local_hospital" className="text-[20px]" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-900 truncate">DHA Registry</span>
            <span className="text-[10px] text-[#006a61] font-semibold uppercase tracking-wider">Licensing Division</span>
          </div>
        </div>

        {/* Inspector Card */}
        <div className="p-3 mx-3 mt-3 rounded-xl bg-slate-50 border border-slate-200 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-white">
              IM
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-slate-900 truncate">Insp. Ibrahim Musa</div>
              <div className="text-[10px] text-slate-500 font-mono truncate">Credentials Reviewer #04</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1">
            Admin Navigation
          </div>
          {ADMIN_SIDE_NAV.map((item) => {
            const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-[#cce5ff]/60 text-[#006194] font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon name={item.icon} className={`text-[18px] shrink-0 ${isActive ? 'text-[#006194]' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-200 shrink-0 bg-white">
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="logout" className="text-[16px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ════════════ Main Wrapper ════════════ */}
      <div className="md:pl-60 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/clinic-onboarding/dashboard')}
                className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Go back"
              >
                <Icon name="arrow_back_ios_new" className="text-xl" />
              </button>
              <div className="md:hidden w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-[#006194]">
                <Icon name="local_hospital" className="text-[22px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">DHA Clinic Application Admin</span>
                <span className="text-xs uppercase tracking-wider text-[#006a61] font-semibold">Official Portal</span>
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

              {/* Profile Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-sm hover:opacity-90"
                  aria-label="User profile"
                >
                  IM
                </button>

                {/* Desktop Dropdown */}
                {profileDropdownOpen && (
                  <div className="hidden md:block absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-slate-200">
                      <p className="text-xs font-bold text-slate-900">Insp. Ibrahim Musa</p>
                      <p className="text-[11px] text-slate-500">ibrahim.musa@dha.gov.ng</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/clinic-onboarding/review-workspace');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Icon name="fact_check" className="text-[16px] text-[#006194]" />
                      <span>Review Workspace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/clinic-onboarding/support');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Icon name="support_agent" className="text-[16px] text-teal-600" />
                      <span>Support Desk</span>
                    </button>
                    <div className="border-t border-slate-200 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-rose-700 font-semibold hover:bg-rose-50 flex items-center gap-2"
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

        {/* ════════════ Mobile Bottom Popup: Profile Sheet ════════════ */}
        {profileDropdownOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
              onClick={() => setProfileDropdownOpen(false)}
            />
            <div className="relative w-full bg-white rounded-t-3xl p-5 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 mb-4">
                <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                  IM
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900">Insp. Ibrahim Musa</h4>
                  <p className="text-xs text-slate-500">ibrahim.musa@dha.gov.ng</p>
                  <p className="text-[10px] text-[#006a61] font-bold mt-0.5">Credentials Reviewer #04 • Official</p>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/clinic-onboarding/review-workspace');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <Icon name="fact_check" className="text-[18px] text-[#006194]" />
                  <span>Review Workspace Queue</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/clinic-onboarding/support');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                >
                  <Icon name="support_agent" className="text-[18px] text-teal-600" />
                  <span>Support &amp; Disputes Desk</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full py-3 rounded-2xl bg-rose-50 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
              >
                <Icon name="logout" className="text-[18px]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        <div className="space-y-6">
          {/* Officer Credential Banner & Authority Bar */}
          <section className="bg-white rounded-xl p-5 shadow-sm border border-slate-200/70 relative overflow-hidden">
            <div className="flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap relative z-10">
              <div className="space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-teal-800 text-xs uppercase tracking-wider font-semibold">
                    <Icon name="verified_user" className="text-[14px] text-[#006a61]" />
                    Official Registry
                  </span>
                  <span className="text-xs text-slate-500 font-medium">FCT Zonal Headquarters</span>
                </div>
                <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight leading-snug">
                  Registry &amp; Licensing Division
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 flex items-center gap-1.5 pt-0.5">
                  <Icon name="badge" className="text-[#006194] text-[16px]" />
                  <span className="font-semibold text-slate-900">Insp. Ibrahim Musa</span>
                  <span className="text-slate-300">•</span>
                  <span>Credentials Reviewer #04</span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-1 shrink-0">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-sky-100 shadow-sm flex items-center justify-center text-[#006194] overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      alt="Insp. Ibrahim Musa"
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256"
                    />
                  </div>
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-teal-600 rounded-full ring-2 ring-white" />
                </div>
                <span className="text-[11px] text-teal-700 font-semibold uppercase">Active Duty</span>
              </div>
            </div>

            {/* Micro Authority Status Bar */}
            <div className="mt-4 pt-3 flex items-center justify-between text-xs text-slate-600 bg-[#f2f3ff] rounded-lg px-4 py-2 border border-sky-100/60">
              <div className="flex items-center gap-1.5">
                <Icon name="domain" className="text-[#006a61] text-[16px]" />
                <span className="font-semibold text-slate-900">Licensing Cycle 2026/Q4</span>
              </div>
              <div className="font-mono text-[#006194] font-semibold">
                <span>FCT-ZONE-01</span>
              </div>
            </div>
          </section>

          {/* KPI Metrics Cards (6-item grid) */}
          <section className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-1.5">
                <Icon name="query_stats" className="text-[#006194] text-[18px]" />
                <span className="text-sm font-bold text-slate-900">Credentialing Metrics</span>
              </div>
              <span className="text-xs text-[#006a61] font-semibold">Updated 4m ago</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {/* Total Applications */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Total Dossiers</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center text-[#006194]">
                    <Icon name="folder_special" className="text-[16px]" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">142</span>
                  <span className="text-[11px] text-teal-700 font-semibold flex items-center">
                    <Icon name="trending_up" className="text-[12px]" /> +12%
                  </span>
                </div>
              </div>

              {/* In Registry Triage (Urgent) */}
              <div className="bg-red-50/70 rounded-xl p-3.5 shadow-sm border border-red-200 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-900 font-semibold">Registry Triage</span>
                  <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-red-950">18</span>
                  <span className="px-1.5 py-0.5 rounded bg-red-600 text-white text-[10px] uppercase font-bold">
                    Urgent
                  </span>
                </div>
              </div>

              {/* Under Desk Review */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Under Review</span>
                  <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center text-[#006194]">
                    <Icon name="rate_review" className="text-[16px]" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#006194]">24</span>
                  <span className="text-[11px] text-slate-500">Desk Queue</span>
                </div>
              </div>

              {/* Info Requested */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Info Requested</span>
                  <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-700">
                    <Icon name="contact_support" className="text-[16px]" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">09</span>
                  <span className="text-[11px] text-amber-700 font-semibold">3 Reminded</span>
                </div>
              </div>

              {/* Verified Clinics */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Verified Clinics</span>
                  <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700">
                    <Icon name="verified" className="text-[16px]" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-[#006a61]">86</span>
                  <span className="text-[11px] text-[#006a61] font-semibold">Licensed</span>
                </div>
              </div>

              {/* Rejections */}
              <div className="bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/70 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">Rejected / Void</span>
                  <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                    <Icon name="gavel" className="text-[16px]" />
                  </div>
                </div>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-slate-900">05</span>
                  <span className="text-[11px] text-slate-400">Audited</span>
                </div>
              </div>
            </div>
          </section>

          {/* Search & Deep Filters */}
          <section className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/70 space-y-3">
            <div className="relative w-full">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search facility, CAC RC#, Med Director, zone..."
                className="w-full h-11 pl-11 pr-10 rounded-lg bg-[#f2f3ff] text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] placeholder:text-slate-400 transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <Icon name="cancel" className="text-[18px]" />
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'All', count: 142 },
                { id: 'under_review', label: 'Under Review', count: 24 },
                { id: 'info_needed', label: 'Info Needed', count: 9 },
                { id: 'ready_audit', label: 'Ready for Audit', count: 12 },
                { id: 'decision_ready', label: 'Pending Decision', count: 6 },
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setActiveFilter(pill.id as typeof activeFilter)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    activeFilter === pill.id
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    activeFilter === pill.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>
          </section>

          {/* Applications Registry Queue */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <Icon name="assignment_turned_in" className="text-[#006194] text-[20px]" />
                <h2 className="text-base font-bold text-slate-900">Priority Application Queue</h2>
              </div>
              <span className="text-xs text-slate-500 font-medium">Sorted by: Urgency</span>
            </div>

            <div className="space-y-4">
              {filteredApplications.map((app) => (
                <article
                  key={app.id}
                  className="bg-white rounded-xl shadow-sm border border-slate-200/70 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
                >
                  <div className="p-5 space-y-3">
                    <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
                      <div className="min-w-0">
                        <span className="font-mono text-xs text-[#006194] font-semibold tracking-wide">
                          {app.ref}
                        </span>
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-0.5 truncate">
                          {app.facilityName}
                        </h3>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5 truncate">
                          <Icon name="location_on" className="text-[14px] text-slate-400" />
                          <span>{app.typeAndLocation}</span>
                        </p>
                      </div>

                      <div className="shrink-0">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                          app.status === 'under_review'
                            ? 'bg-sky-100 text-[#006194]'
                            : app.status === 'info_needed'
                            ? 'bg-red-100 text-red-800'
                            : app.status === 'audit_scheduled'
                            ? 'bg-teal-100 text-teal-800'
                            : 'bg-teal-700 text-white'
                        }`}>
                          <Icon
                            name={
                              app.status === 'under_review'
                                ? 'sync'
                                : app.status === 'info_needed'
                                ? 'notification_important'
                                : app.status === 'audit_scheduled'
                                ? 'event_available'
                                : 'fact_check'
                            }
                            className="text-[14px]"
                          />
                          {app.statusLabel}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar (if available) */}
                    {app.stageProgress !== undefined && (
                      <div className="bg-[#f2f3ff] rounded-lg p-3 space-y-1.5 border border-sky-100/60">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#006194]">{app.stageText}</span>
                          <span className="font-mono font-bold text-slate-900">{app.stageProgress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#006194] rounded-full transition-all duration-500"
                            style={{ width: `${app.stageProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Flags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {app.flags.map((flag, idx) => (
                        <span
                          key={idx}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                            flag.isError
                              ? 'bg-red-50 text-red-800 border border-red-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          <Icon name={flag.icon} className="text-[13px]" />
                          <span>{flag.label}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Lower Muted Footer Zone */}
                  <div className="bg-[#faf8ff] px-5 py-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-2 text-xs text-slate-500 min-w-0 truncate">
                      <Icon name="person_check" className="text-[16px] text-teal-700" />
                      <span className="truncate">
                        Reviewer: <strong className="text-slate-800">{app.reviewer}</strong> • {app.subDate}
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(app.primaryActionRoute)}
                      className={`h-9 px-4 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors shrink-0 ${
                        app.status === 'decision_ready'
                          ? 'bg-[#006a61] hover:bg-teal-800 text-white'
                          : 'bg-[#006194] hover:bg-[#004b73] text-white'
                      }`}
                    >
                      <span>{app.primaryActionLabel}</span>
                      <Icon name="chevron_right" className="text-[16px]" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Interactive Batch Operations Tray */}
          <section className="bg-sky-50 rounded-xl p-5 border border-sky-200 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Icon name="dynamic_feed" className="text-[22px]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 leading-tight">Batch Dossier Operations</h3>
                <p className="text-xs text-slate-600">4 applications selected for zonal review</p>
              </div>
            </div>
            <button
              onClick={() => {
                setBatchNotice(true);
                setTimeout(() => setBatchNotice(false), 2500);
              }}
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-[#006194] font-semibold text-xs shadow-xs hover:bg-slate-50 transition-colors shrink-0"
            >
              Open Batch
            </button>
          </section>

          {batchNotice && (
            <div className="p-3 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg text-xs font-semibold flex items-center gap-2">
              <Icon name="check_circle" className="text-[18px]" />
              Zonal batch review dossier initialized (4 clinics queued).
            </div>
          )}

          {/* Secondary Internal Navigation Strip */}
          <footer className="pt-2">
            <div className="bg-white rounded-xl p-2 shadow-sm border border-slate-200/70 grid grid-cols-5 gap-1 text-center">
              <button
                onClick={() => navigate('/clinic-onboarding/admin-dashboard')}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg bg-sky-100 text-[#006194] text-xs font-bold"
              >
                <Icon name="space_dashboard" className="text-[20px]" />
                <span className="mt-0.5 truncate w-full">Dashboard</span>
              </button>
              <button
                onClick={() => navigate('/clinic-onboarding/review-workspace')}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
              >
                <Icon name="folder_shared" className="text-[20px]" />
                <span className="mt-0.5 truncate w-full">Dossiers</span>
              </button>
              <button
                onClick={() => navigate('/clinic-onboarding/branch-approval')}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
              >
                <Icon name="apartment" className="text-[20px]" />
                <span className="mt-0.5 truncate w-full">Branches</span>
              </button>
              <button
                onClick={() => navigate('/clinic-onboarding/document-verification')}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
              >
                <Icon name="assignment" className="text-[20px]" />
                <span className="mt-0.5 truncate w-full">Documents</span>
              </button>
              <button
                onClick={() => navigate('/clinic-onboarding/profile-management')}
                className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 text-xs font-medium"
              >
                <Icon name="bar_chart_4_bars" className="text-[20px]" />
                <span className="mt-0.5 truncate w-full">Reports</span>
              </button>
            </div>
            <div className="text-center mt-3 text-slate-500 text-[11px] flex items-center justify-center gap-1 opacity-80">
              <Icon name="gavel" className="text-[13px] text-[#006a61]" />
              <span>DHA Registry Regulation No. 14 • FCT Dental Health Act 2026</span>
            </div>
          </footer>
        </div>
      </main>

      {/* ════════════ Mobile Bottom Popup: "More" Bottom Sheet ════════════ */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
            onClick={() => setMobileMoreOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 bg-slate-300 rounded-full" />
            </div>

            <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Registry Admin Modules</h3>
                <p className="text-[11px] text-slate-500">Regulatory inspection & enforcement</p>
              </div>
              <button
                type="button"
                onClick={() => setMobileMoreOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {[
                { to: '/clinic-onboarding/admin-dashboard', label: 'Applications Queue', icon: 'dashboard', desc: 'Active dossier queue' },
                { to: '/clinic-onboarding/review-workspace', label: 'Review Workspace', icon: 'fact_check', desc: 'Statutory compliance validation' },
                { to: '/clinic-onboarding/branch-approval', label: 'Branch Inspections', icon: 'domain_verification', desc: 'Physical site clearance' },
                { to: '/clinic-onboarding/staff-management', label: 'Staff Credentials', icon: 'badge', desc: 'Practitioner qualifications audit' },
                { to: '/clinic-onboarding/profile-management', label: 'Profile & Changes', icon: 'published_with_changes', desc: 'Entity modifications review' },
                { to: '/clinic-onboarding/history', label: 'Verification History', icon: 'history', desc: 'Registry decisions & logs' },
                { to: '/clinic-onboarding/support', label: 'Support & Disputes', icon: 'support_agent', desc: 'Escalations & clarifications' },
              ].map((item) => (
                <button
                  key={item.to}
                  type="button"
                  onClick={() => {
                    setMobileMoreOpen(false);
                    navigate(item.to);
                  }}
                  className="w-full flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-[20px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-slate-900 block truncate">{item.label}</span>
                    <span className="text-[11px] text-slate-500 block truncate">{item.desc}</span>
                  </div>
                  <Icon name="chevron_right" className="text-slate-400 text-[18px] shrink-0" />
                </button>
              ))}

              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMoreOpen(false);
                    navigate('/login');
                  }}
                  className="w-full py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Icon name="logout" className="text-[16px]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Bottom Navigation Bar for Mobile only */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-lg mx-auto flex justify-around items-center h-16 px-2">
          <button
            onClick={() => handleNavClick('overview')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors ${
              activeNav === 'overview' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="dashboard" className="text-[20px]" />
            <span className="text-[10px]">Overview</span>
          </button>
          <button
            onClick={() => handleNavClick('branches')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors ${
              activeNav === 'branches' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="domain_verification" className="text-[20px]" />
            <span className="text-[10px]">Branches</span>
          </button>
          <button
            onClick={() => handleNavClick('staff')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors ${
              activeNav === 'staff' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="badge" className="text-[20px]" />
            <span className="text-[10px]">Staff</span>
          </button>
          <button
            onClick={() => handleNavClick('changes')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors ${
              activeNav === 'changes' ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="published_with_changes" className="text-[20px]" />
            <span className="text-[10px]">Changes</span>
          </button>
          <button
            onClick={() => setMobileMoreOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] py-1 transition-colors ${
              mobileMoreOpen ? 'text-[#006194] font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="grid_view" className="text-[20px]" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
      </div>
    </div>
  );
}
