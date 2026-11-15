import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ClinicalWorkspaceShellProps {
  children: ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  activeNav?: 'dashboard' | 'calendar' | 'patients' | 'tasks';
  activeTab?: string;
}

const SECTION_14_NAV_ITEMS = [
  { to: '/dentist/dashboard', label: '14.1 Professional Dashboard', icon: 'dashboard', code: '14.1' },
  { to: '/dentist/customisation', label: '14.2 Dashboard Customisation', icon: 'tune', code: '14.2' },
  { to: '/dentist/calendar', label: '14.3 My Appointments: Calendar', icon: 'calendar_month', code: '14.3' },
  { to: '/dentist/appointments-list', label: '14.4 My Appointments: List', icon: 'view_list', code: '14.4' },
  { to: '/dentist/appointment-details', label: '14.5 Appointment Details', icon: 'assignment', code: '14.5' },
  { to: '/dentist/patients', label: '14.6 My Patients', icon: 'groups', code: '14.6' },
  { to: '/dentist/patient-search', label: '14.7 Patient Search & Selection', icon: 'person_search', code: '14.7' },
  { to: '/dentist/patient-overview', label: '14.8 Patient Professional Overview', icon: 'badge', code: '14.8' },
  { to: '/dentist/work-queue', label: '14.9 My Tasks & Work Queue', icon: 'assignment_turned_in', code: '14.9' },
  { to: '/dentist/task-details', label: '14.10 Task Details & Assignment', icon: 'task', code: '14.10' },
  { to: '/dentist/activity-overview', label: '14.11 Professional Activity Overview', icon: 'analytics', code: '14.11' },
  { to: '/dentist/activity-reports', label: '14.12 Personal Activity Reports', icon: 'picture_as_pdf', code: '14.12' },
  { to: '/dentist/notifications', label: '14.13 Notifications Centre', icon: 'notifications', code: '14.13' },
  { to: '/dentist/profile', label: '14.14 Professional Profile', icon: 'account_circle', code: '14.14' },
  { to: '/dentist/profile/edit', label: '14.15 Edit Professional Profile', icon: 'edit', code: '14.15' },
  { to: '/dentist/verification', label: '14.16 Professional Verification Status', icon: 'verified_user', code: '14.16' },
  { to: '/dentist/schedule', label: '14.17 Working Schedule & Availability', icon: 'schedule', code: '14.17' },
  { to: '/dentist/leave', label: '14.18 Leave & Unavailability Management', icon: 'event_busy', code: '14.18' },
  { to: '/dentist/branch-switcher', label: '14.19 Clinic & Branch Switcher', icon: 'domain', code: '14.19' },
  { to: '/dentist/collaboration', label: '14.20 Professional Collaboration Workspace', icon: 'groups_2', code: '14.20' },
  { to: '/dentist/second-opinions', label: '14.21 Clinical Review & Second Opinions', icon: 'rate_review', code: '14.21' },
  { to: '/dentist/patient-comms', label: '14.22 Patient Communication Workspace', icon: 'forum', code: '14.22' },
  { to: '/dentist/resources', label: '14.23 Professional Resources & Announcements', icon: 'article', code: '14.23' },
  { to: '/dentist/help-support', label: '14.24 Professional Help & Support', icon: 'support_agent', code: '14.24' },
];

export function ClinicalWorkspaceShell({
  children,
  pageTitle = 'DHA Clinical Workspace',
  badgeCode = 'Section 14',
  badgeLabel = 'Clinical Management',
  activeNav,
  activeTab,
}: ClinicalWorkspaceShellProps) {
  const currentNav = (activeNav || (activeTab as any) || 'dashboard') as 'dashboard' | 'calendar' | 'patients' | 'tasks';
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Harmony Wuse 2');
  const [branchDropdownOpen, setBranchDropdownOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans antialiased selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand & Menu Toggle */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="w-10 h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] flex items-center justify-center transition-colors"
              aria-label="Open Navigation Drawer"
            >
              <Icon name="menu" className="text-[22px]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/dentist/dashboard')}
              className="flex items-center gap-2.5 text-left group min-w-0"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform shrink-0">
                <Icon name="dentistry" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#131b2e] truncate">DHA Clinical</span>
                  <Icon name="verified" className="text-[#006a61] text-[16px] shrink-0" />
                  {badgeCode && (
                    <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-[#e2e7ff] text-[#006194] text-[10px] font-bold">
                      {badgeCode}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setBranchDropdownOpen(!branchDropdownOpen);
                    }}
                    className="flex items-center gap-1 text-left w-fit text-xs font-semibold text-[#006194] hover:underline"
                  >
                    <Icon name="apartment" className="text-[12px]" />
                    <span className="truncate max-w-[140px]">{selectedBranch}</span>
                    <Icon name="expand_more" className="text-[14px]" />
                  </button>

                  {/* Branch selector dropdown */}
                  {branchDropdownOpen && (
                    <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-[#eaedff] py-1 z-50">
                      {['Harmony Wuse 2', 'Harmony Jumeirah Branch', 'Dubai Healthcare City Suite'].map(
                        (b) => (
                          <button
                            key={b}
                            type="button"
                            onClick={() => {
                              setSelectedBranch(b);
                              setBranchDropdownOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-xs font-medium hover:bg-[#f2f3ff] transition-colors flex items-center justify-between ${
                              selectedBranch === b ? 'text-[#006194] font-bold bg-[#f2f3ff]' : 'text-[#3f4850]'
                            }`}
                          >
                            <span>{b}</span>
                            {selectedBranch === b && <Icon name="check" className="text-[14px]" />}
                          </button>
                        )
                      )}
                      <div className="pt-1 mt-1 border-t border-[#eaedff]">
                        <button
                          type="button"
                          onClick={() => {
                            setBranchDropdownOpen(false);
                            navigate('/dentist/branch-switcher');
                          }}
                          className="w-full px-3 py-1.5 text-left text-xs font-bold text-[#006194] hover:bg-[#f2f3ff] transition-colors flex items-center gap-1.5"
                        >
                          <Icon name="swap_horiz" className="text-[14px]" />
                          <span>Manage All Branches (14.19)</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </button>
          </div>

          {/* Center Title (Desktop / Tablet) */}
          <div className="hidden lg:flex items-center gap-3">
            <span className="text-sm font-bold text-[#131b2e]">{pageTitle}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] font-semibold border border-[#86f2e4]/50">
              {badgeLabel}
            </span>
          </div>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/dentist/notifications')}
              className="w-10 h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e] flex items-center justify-center relative transition-colors"
              aria-label="Notifications"
            >
              <Icon name="notifications" className="text-[20px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-white"></span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/dentist/customisation')}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#006194] transition-colors border border-[#eaedff]"
            >
              <Icon name="tune" className="text-[16px]" />
              <span>Customise</span>
            </button>

            {/* Clinician Profile */}
            <button
              type="button"
              onClick={() => navigate('/dentist/profile')}
              className="flex items-center gap-2 pl-1 border-l border-[#eaedff] text-left hover:opacity-85 transition-opacity"
            >
              <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs ring-2 ring-[#eaedff]">
                DJ
              </div>
              <div className="hidden md:flex flex-col min-w-0 text-left">
                <span className="text-xs font-bold text-[#131b2e] leading-tight">Dr. Daniel James</span>
                <span className="text-[10px] text-[#707881] font-mono">DDS • #DEN-48912</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Slide-out Navigation Drawer for Section 14 */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 border-r border-[#eaedff]">
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon name="dentistry" className="text-[24px]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                    DHA Clinical Suite
                  </span>
                  <h2 className="text-base font-bold leading-tight">Professional Workspace</h2>
                  <p className="text-[11px] text-white/80">Section 14 Management</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Close menu"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Clinician Card */}
            <div className="p-3.5 bg-[#f2f3ff] border-b border-[#eaedff]">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#131b2e]">Dr. Daniel James, DDS</div>
                  <div className="text-xs text-[#707881]">Lead Prosthodontist • #DEN-48912</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#86f2e4]/30 text-[#006f66]">
                  DHA Verified
                </span>
              </div>
            </div>

            {/* Section 14 Screens Navigation List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] px-3 py-1">
                Section 14 Workspaces
              </div>
              {SECTION_14_NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setDrawerOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#cce5ff]/50 text-[#006194] font-bold shadow-xs'
                        : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon
                        name={item.icon}
                        className={`text-[18px] ${isActive ? 'text-[#006194]' : 'text-[#707881]'}`}
                      />
                      <span>{item.label}</span>
                    </div>
                    <span className="font-mono text-[10px] text-[#707881]">{item.code}</span>
                  </NavLink>
                );
              })}

              <div className="pt-3 border-t border-[#eaedff]">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] px-3 py-1">
                  Connected Clinical Modules
                </div>
                <NavLink
                  to="/treatment-plans/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff]"
                >
                  <Icon name="format_list_bulleted_add" className="text-[16px]" />
                  <span>Section 13: Treatment Planning</span>
                </NavLink>
                <NavLink
                  to="/investigations/dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff]"
                >
                  <Icon name="radiology" className="text-[16px]" />
                  <span>Section 11: Dexis & Investigations</span>
                </NavLink>
                <NavLink
                  to="/patient-dashboard"
                  onClick={() => setDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  <Icon name="switch_account" className="text-[16px]" />
                  <span>Switch to Patient View</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-8">
        {children}
      </main>

      {/* Bottom Sticky Tab Bar for Mobile & Tablet */}
      <nav
        className="fixed bottom-0 w-full z-40 pb-safe bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.04)] md:hidden"
        aria-label="Mobile Bottom Navigation"
      >
        <div className="h-16 px-2 flex items-center justify-around">
          <button
            type="button"
            onClick={() => navigate('/dentist/dashboard')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
              currentNav === 'dashboard' ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[11px] tracking-tight">Dashboard</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dentist/calendar')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
              currentNav === 'calendar' ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="calendar_month" className="text-[22px]" />
            <span className="text-[11px] tracking-tight">Calendar</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dentist/patients')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
              currentNav === 'patients' ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="groups" className="text-[22px]" />
            <span className="text-[11px] tracking-tight">Patients</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/dentist/appointments-list')}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[64px] min-h-[44px] transition-colors ${
              currentNav === 'tasks' ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="checklist" className="text-[22px]" />
            <span className="text-[11px] tracking-tight">Schedule</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
