import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function ClinicOnboardingDashboardScreen() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<'dashboard' | 'profile' | 'structure' | 'branches' | 'staff'>('dashboard');
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const milestones = [
    { id: 1, title: 'Entity Account Setup', desc: 'Secure portal credentials verified', status: 'completed', route: '/clinic-onboarding/clinic-account-registration' },
    { id: 2, title: 'Corporate Legal Identity', desc: 'CAC RC-1489201 & Tax Identification', status: 'completed', route: '/clinic-onboarding/organisation-information' },
    { id: 3, title: 'Authorised Representative & CMD', desc: 'Dr. Amina Bello (#DEN-78421)', status: 'completed', route: '/clinic-onboarding/organisation-representative' },
    { id: 4, title: 'Statutory Registration & HEFAMAA', desc: 'FCT-HEFAMAA-DENT-0842 Active', status: 'completed', route: '/clinic-onboarding/organisation-registration-details' },
    { id: 5, title: 'Primary Location (Wuse 2 HQ)', desc: 'Plot 104 Aminu Kano Cresc, 4 Operatories', status: 'completed', route: '/clinic-onboarding/primary-location' },
    { id: 6, title: 'Operating Hours & Emergency Scope', desc: 'Mon-Sat standard + 24/7 on-call triage', status: 'completed', route: '/clinic-onboarding/operating-hours' },
    { id: 7, title: 'Clinical Services & Equipment', desc: 'Class B Autoclave, 20kVA Solar Backup', status: 'completed', route: '/clinic-onboarding/profile-services' },
    { id: 8, title: 'Additional Branches (Garki Satellite)', desc: 'Suite B4, Area 11 Plaza, 2 Operatories', status: 'completed', route: '/clinic-onboarding/branch-management' },
    { id: 9, title: 'Workforce Roster & Delegations', desc: '6 Clinicians & Administrative officers', status: 'completed', route: '/clinic-onboarding/staff-roles' },
    { id: 10, title: 'Verification Dossier & NNRA Survey', desc: 'Clarification query pending on Operatory 04', status: 'action_required', route: '/clinic-onboarding/more-information' },
    { id: 11, title: 'Final Statutory Review & Licence', desc: 'Under Desk Review by Officer #04', status: 'in_review', route: '/clinic-onboarding/application-status' },
  ];

  const recentActivities = [
    {
      icon: 'warning',
      color: 'text-amber-600 bg-amber-50',
      title: 'Clarification Query #DHA-REQ-4402 Issued',
      desc: 'Review Officer #04 requested scatter dose attestation for Operatory 04.',
      time: '2 hours ago',
      action: () => navigate('/clinic-onboarding/more-information'),
      actionLabel: 'Respond',
    },
    {
      icon: 'check_circle',
      color: 'text-emerald-600 bg-emerald-50',
      title: 'Dossier Formally Submitted to DHA Central Registry',
      desc: 'Docket #DHA-APP-2026-8819 entered triage queue position #2.',
      time: 'Yesterday, 15:42',
    },
    {
      icon: 'verified',
      color: 'text-teal-600 bg-teal-50',
      title: 'CAC Corporate Certificate Desk Validated',
      desc: 'Corporate Affairs Commission standing confirmed for RC-1489201.',
      time: '2 days ago',
    },
    {
      icon: 'groups',
      color: 'text-blue-600 bg-blue-50',
      title: 'Garki Branch Lead Appointed',
      desc: 'Dr. Tunde Fashola accepted invite and took custody of Branch #002.',
      time: '3 days ago',
    },
  ];

  const ONBOARDING_SIDE_NAV = [
    { to: '/clinic-onboarding/dashboard', label: 'Onboarding Dashboard', icon: 'dashboard', end: true },
    { to: '/clinic-onboarding/profile-management', label: 'Organisation Profile', icon: 'business' },
    { to: '/clinic-onboarding/organisation-structure', label: 'Practice Structure', icon: 'account_tree' },
    { to: '/clinic-onboarding/branch-management', label: 'Branch Directory', icon: 'storefront' },
    { to: '/clinic-onboarding/staff-roles', label: 'Staff Roles & Roster', icon: 'group' },
    { to: '/clinic-onboarding/operating-hours', label: 'Operating Hours', icon: 'schedule' },
    { to: '/clinic-onboarding/more-information', label: 'Statutory Verification', icon: 'verified_user' },
    { to: '/clinic-onboarding/application-status', label: 'Application Status', icon: 'assignment' },
    { to: '/clinic-onboarding/support', label: 'Help & Support', icon: 'help_outline' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex font-sans antialiased">
      {/* ════════════ Desktop Left Sidebar (md+) ════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 fixed inset-y-0 left-0 z-30 bg-white border-r border-slate-200 shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
            GD
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-slate-900 truncate">Greenfield Dental</span>
            <span className="text-[10px] text-teal-700 font-semibold uppercase tracking-wider">RC-1489201</span>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 py-1">
            Enrollment Flow
          </div>
          {ONBOARDING_SIDE_NAV.map((item) => {
            const isActive = item.end ? activeNav === 'dashboard' : location.pathname === item.to;
            return (
              <button
                key={item.to}
                type="button"
                onClick={() => navigate(item.to)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-bold shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <Icon name={item.icon} className={`text-[18px] shrink-0 ${isActive ? 'text-teal-700' : 'text-slate-400'}`} />
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
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200 px-4 lg:px-8 py-3.5 shadow-sm">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="md:hidden w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0">
                GD
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                    Greenfield Dental Clinic Limited
                  </h1>
                  <span className="hidden sm:inline-flex text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded uppercase">
                    RC-1489201
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Dr. Amina Bello (CMD) • Docket #DHA-APP-2026-8819
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/clinic-onboarding/profile-management')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition-colors"
              >
                <Icon name="business" className="text-sm text-teal-600" />
                <span className="hidden sm:inline">Org Profile</span>
              </button>
              <button
                onClick={() => navigate('/clinic-onboarding/organisation-structure')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center gap-1 transition-colors"
              >
                <Icon name="account_tree" className="text-sm text-indigo-600" />
                <span className="hidden sm:inline">Structure</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Container */}
        <main className="max-w-6xl w-full mx-auto px-4 lg:px-8 py-6 pb-24 md:pb-8 space-y-6">
        {/* Launch Announcement Ribbon */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0 border border-teal-500/30">
              <Icon name="campaign" className="text-2xl" />
            </div>
            <div>
              <div className="text-xs font-semibold text-teal-200">Public Healthcare Directory Launch</div>
              <h2 className="text-sm font-bold text-white">
                DHA Patient Booking Portal Goes Live in 14 Days
              </h2>
            </div>
          </div>
          <button
            onClick={() => navigate('/clinic-onboarding/application-status')}
            className="px-4 py-2 rounded-xl bg-white text-teal-900 text-xs font-bold hover:bg-teal-50 transition-colors shrink-0 shadow-sm"
          >
            Track Status
          </button>
        </div>

        {/* 4 Metric Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Metric 1 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Readiness</span>
              <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <Icon name="speed" className="text-lg" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">82%</div>
              <div className="text-xs text-teal-700 font-semibold mt-0.5">10 of 11 Gates Cleared</div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Facilities</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon name="storefront" className="text-lg" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">2 Sites</div>
              <div className="text-xs text-emerald-700 font-semibold mt-0.5">Wuse 2 HQ + Garki</div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider">Workforce</span>
              <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <Icon name="groups" className="text-lg" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-slate-900">6 Staff</div>
              <div className="text-xs text-blue-700 font-semibold mt-0.5">4 Active • 2 Pending</div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-500">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-800">Inquiries</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <Icon name="assignment_late" className="text-lg" />
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-extrabold text-amber-900">1 Urgent</div>
              <div className="text-xs text-amber-800 font-bold mt-0.5">#DHA-REQ-4402 Action</div>
            </div>
          </div>
        </section>

        {/* Urgent Action Banner */}
        <section className="bg-white rounded-2xl border-2 border-amber-300 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="notification_important" className="text-2xl" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Reviewer Clarification Required
                </span>
                <span className="text-xs text-slate-400">14 Days to Deadline</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Operatory 04 Lead Shielding Attestation (#DHA-REQ-4402)
              </h3>
              <p className="text-xs text-slate-600">
                Senior Review Officer #04 requires stamped physicist scatter survey before approving radiation scope.
              </p>
            </div>
          </div>

          <button
            onClick={() => navigate('/clinic-onboarding/more-information')}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-sm shrink-0"
          >
            <span>Respond to Query (15.20)</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </section>

        {/* 2-Column Grid: Onboarding Checklist (Left) & Activity Log (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: 11-Milestone Checklist (2 cols span) */}
          <section className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800">
                  Onboarding &amp; Compliance Milestone Checklist
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  10 of 11 statutory requirements completed
                </p>
              </div>
              <button
                onClick={() => navigate('/clinic-onboarding/review-submit')}
                className="text-xs font-semibold text-teal-700 hover:underline"
              >
                Review Full Application
              </button>
            </div>

            <div className="space-y-2.5">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => navigate(m.route)}
                  className="p-3.5 rounded-xl border border-slate-150 hover:border-teal-300 bg-white hover:bg-slate-50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                        m.status === 'completed'
                          ? 'bg-emerald-100 text-emerald-700'
                          : m.status === 'action_required'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-teal-100 text-teal-800'
                      }`}
                    >
                      {m.status === 'completed' ? (
                        <Icon name="check" className="text-sm" />
                      ) : m.status === 'action_required' ? (
                        <Icon name="priority_high" className="text-sm" />
                      ) : (
                        <Icon name="hourglass_bottom" className="text-sm" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                        {m.id}. {m.title}
                      </div>
                      <div className="text-[11px] text-slate-500">{m.desc}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.status === 'completed' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        Done
                      </span>
                    )}
                    {m.status === 'action_required' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-2 py-0.5 rounded animate-pulse">
                        Action Required
                      </span>
                    )}
                    {m.status === 'in_review' && (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                        In Review
                      </span>
                    )}
                    <Icon name="chevron_right" className="text-slate-400 group-hover:text-teal-600 transition-colors text-base" />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column: Activity Feed & Shortcuts */}
          <div className="space-y-6">
            {/* Activity Feed */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Icon name="history" className="text-base text-slate-400" />
                Recent Dossier Activity
              </h3>

              <div className="space-y-3 pt-1">
                {recentActivities.map((act, i) => (
                  <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className={`w-7 h-7 rounded-lg ${act.color} flex items-center justify-center shrink-0 mt-0.5`}>
                      <Icon name={act.icon} className="text-sm" />
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <div className="text-xs font-bold text-slate-900 leading-snug">{act.title}</div>
                      <div className="text-[11px] text-slate-500 leading-tight">{act.desc}</div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-slate-400">{act.time}</span>
                        {act.action && (
                          <button
                            onClick={act.action}
                            className="text-[11px] font-bold text-amber-700 hover:underline"
                          >
                            {act.actionLabel}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Management Shortcuts */}
            <section className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                Governance Shortcuts
              </h3>

              <button
                onClick={() => navigate('/clinic-onboarding/profile-management')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon name="business" className="text-teal-600 text-base" />
                  <span className="text-xs font-semibold text-slate-800">Organisation Profile (15.23)</span>
                </div>
                <Icon name="arrow_forward" className="text-slate-400 text-sm" />
              </button>

              <button
                onClick={() => navigate('/clinic-onboarding/organisation-structure')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon name="account_tree" className="text-indigo-600 text-base" />
                  <span className="text-xs font-semibold text-slate-800">Organisation Structure (15.24)</span>
                </div>
                <Icon name="arrow_forward" className="text-slate-400 text-sm" />
              </button>

              <button
                onClick={() => navigate('/clinic-onboarding/branch-management')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon name="storefront" className="text-emerald-600 text-base" />
                  <span className="text-xs font-semibold text-slate-800">Branch Management (15.14)</span>
                </div>
                <Icon name="arrow_forward" className="text-slate-400 text-sm" />
              </button>

              <button
                onClick={() => navigate('/clinic-onboarding/staff-roles')}
                className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-slate-50 transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-2">
                  <Icon name="badge" className="text-blue-600 text-base" />
                  <span className="text-xs font-semibold text-slate-800">Staff &amp; Role Assignment</span>
                </div>
                <Icon name="arrow_forward" className="text-slate-400 text-sm" />
              </button>
            </section>
          </div>
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
                <h3 className="text-sm font-bold text-slate-900">Onboarding Navigation</h3>
                <p className="text-[11px] text-slate-500">Practice registration & compliance</p>
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
                { to: '/clinic-onboarding/dashboard', label: 'Dashboard Overview', icon: 'dashboard', desc: 'Milestone tracker & status' },
                { to: '/clinic-onboarding/profile-management', label: 'Organisation Profile', icon: 'business', desc: 'CAC legal entity profile' },
                { to: '/clinic-onboarding/organisation-structure', label: 'Practice Structure', icon: 'account_tree', desc: 'Leadership & governance' },
                { to: '/clinic-onboarding/branch-management', label: 'Branch Directory', icon: 'storefront', desc: 'Facilities & satellite sites' },
                { to: '/clinic-onboarding/staff-roles', label: 'Staff Roles & Roster', icon: 'group', desc: 'Workforce registrations' },
                { to: '/clinic-onboarding/operating-hours', label: 'Operating Hours', icon: 'schedule', desc: 'Clinical schedule & on-call' },
                { to: '/clinic-onboarding/more-information', label: 'Statutory Verification', icon: 'verified_user', desc: 'Regulatory filings & audit' },
                { to: '/clinic-onboarding/application-status', label: 'Application Status', icon: 'assignment', desc: 'Docket triage & approval' },
                { to: '/clinic-onboarding/support', label: 'Support & Queries', icon: 'help_outline', desc: 'Registry desk assistance' },
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
                  <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
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

      {/* Persistent Bottom Bar for Mobile Navigation only */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 py-2 px-3 shadow-lg">
        <div className="max-w-xl mx-auto flex items-center justify-around">
          <button
            onClick={() => {
              setActiveNav('dashboard');
              navigate('/clinic-onboarding/dashboard');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors min-w-[56px] ${
              activeNav === 'dashboard' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="dashboard" className="text-[20px]" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('profile');
              navigate('/clinic-onboarding/profile-management');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors min-w-[56px] ${
              activeNav === 'profile' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="business" className="text-[20px]" />
            <span>Profile</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('branches');
              navigate('/clinic-onboarding/branch-management');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors min-w-[56px] ${
              activeNav === 'branches' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="storefront" className="text-[20px]" />
            <span>Branches</span>
          </button>
          <button
            onClick={() => {
              setActiveNav('staff');
              navigate('/clinic-onboarding/staff-roles');
            }}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors min-w-[56px] ${
              activeNav === 'staff' ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="group" className="text-[20px]" />
            <span>Staff</span>
          </button>
          <button
            onClick={() => setMobileMoreOpen(true)}
            className={`flex flex-col items-center gap-0.5 text-[10px] font-semibold transition-colors min-w-[56px] ${
              mobileMoreOpen ? 'text-teal-700 font-bold' : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Icon name="grid_view" className="text-[20px]" />
            <span>More</span>
          </button>
        </div>
      </nav>
      </div>
    </div>
  );
}
