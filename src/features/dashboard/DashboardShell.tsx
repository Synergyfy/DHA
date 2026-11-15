import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { usePatientStore, PROFILES } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

interface DashboardShellProps {
  children: ReactNode;
  activePath?: string;
  pageTitle?: string;
  showBack?: boolean;
}

/* ─── Sidebar nav items (desktop) ─── */
const SIDE_NAV = [
  { to: '/patient-dashboard', icon: 'home', label: 'Home', end: true },
  { to: '/patient-dashboard/records/timeline', icon: 'folder_open', label: 'Records & History', match: '/patient-dashboard/records' },
  { to: '/patient-dashboard/oral-health', icon: 'monitor_heart', label: 'Oral Matrix' },
  { to: '/patient-dashboard/reminders', icon: 'alarm', label: 'Reminders', match: '/patient-dashboard/reminders' },
  { to: '/patient-dashboard/discovery', icon: 'explore', label: 'Find Clinics', match: '/patient-dashboard/discovery' },
  { to: '/patient-dashboard/education', icon: 'school', label: 'Education', match: '/patient-dashboard/education' },
  { to: '/patient-dashboard/quick-actions', icon: 'hub', label: 'Actions & Services' },
  { to: '/patient-dashboard/first-time', icon: 'auto_awesome', label: 'New Patient Guide' },
  { to: '/patient-dashboard/guardian', icon: 'people', label: 'Profiles & Dependents' },
];

/* ─── "More" drawer items (mobile) ─── */
const MORE_ITEMS = [
  { to: '/patient-dashboard/discovery', icon: 'explore', label: 'Find Clinics' },
  { to: '/patient-dashboard/education', icon: 'school', label: 'Education' },
  { to: '/patient-dashboard/oral-health', icon: 'monitor_heart', label: 'Oral Matrix' },
  { to: '/patient-dashboard/quick-actions', icon: 'hub', label: 'Services' },
  { to: '/patient-dashboard/first-time', icon: 'auto_awesome', label: 'New Guide' },
  { to: '/patient-dashboard/guardian', icon: 'people', label: 'Profiles' },
  { to: '/patient-dashboard/notifications', icon: 'notifications', label: 'Alerts' },
];

export function DashboardShell({
  children,
  pageTitle,
  showBack = false,
}: DashboardShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeProfile,
    activeProfileId,
    setActiveProfile,
    unreadCount,
    qrModalOpen,
    setQrModalOpen,
  } = usePatientStore();

  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  const isNavActive = (item: typeof SIDE_NAV[0]) => {
    if (item.end) return location.pathname === item.to;
    if (item.match) return location.pathname.startsWith(item.match);
    return location.pathname === item.to;
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* ════════════ Desktop Left Sidebar (md+) ════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 fixed inset-y-0 left-0 z-30 bg-surface-container-lowest border-r border-outline-variant/30 shadow-[2px_0_16px_rgba(15,23,42,0.04)]">
        {/* Brand */}
        <NavLink to="/patient-dashboard" className="flex items-center gap-2.5 px-5 py-4 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
            <Icon name="dentistry" className="text-[20px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-primary tracking-tight font-bold leading-none">
              DHA
            </span>
            <span className="text-[10px] text-on-surface-variant font-medium leading-tight">
              Dental Platform
            </span>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5" aria-label="Sidebar Navigation">
          {SIDE_NAV.map((item) => {
            const active = isNavActive(item);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  active
                    ? 'bg-primary-fixed text-on-primary-fixed shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                  <Icon name={item.icon} className="text-[20px]" />
                </div>
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar bottom: View Pass button */}
        <div className="px-3 py-3 border-t border-outline-variant/20 shrink-0">
          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="w-full px-3 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-[13px] font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.97] transition-all"
          >
            <Icon name="qr_code_scanner" className="text-[18px]" />
            <span>View Pass</span>
          </button>
        </div>
      </aside>

      {/* ════════════ Main Content & Header Wrapper ════════════ */}
      {/* On desktop (md+), shift this wrapper by the sidebar width (md:pl-60 lg:pl-64) so it fills the rest of the screen vertically and horizontally without flex distortion */}
      <div className="md:pl-60 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* ════════════ Top Application Header ════════════ */}
        <header className="sticky top-0 z-40 w-full bg-surface-container-lowest/95 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(15,23,42,0.04)]">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
            {/* Left: Brand (mobile only) or Back Button */}
            <div className="flex items-center gap-2 shrink-0">
              {showBack && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors"
                  aria-label="Go back"
                >
                  <Icon name="arrow_back" className="text-[20px]" />
                </button>
              )}

              {/* Brand – visible only on mobile */}
              <NavLink to="/patient-dashboard" className="md:hidden flex items-center gap-2 group">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-sm group-hover:scale-105 transition-transform">
                  <Icon name="dentistry" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-primary tracking-tight font-bold leading-none">
                    DHA
                  </span>
                  <span className="text-[9px] text-on-surface-variant font-medium leading-tight">
                    Dental Platform
                  </span>
                </div>
              </NavLink>

              {pageTitle && (
                <div className="hidden sm:flex items-center gap-2 ml-2 pl-2 border-l border-outline-variant/50">
                  <span className="text-sm text-on-surface-variant font-medium truncate max-w-[200px]">
                    {pageTitle}
                  </span>
                </div>
              )}
            </div>

            {/* Right: Active Profile Switcher & Notifications */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Profile Dropdown / Switcher Pill */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="min-h-[38px] px-2 sm:px-2.5 py-1 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center gap-1.5 transition-all border border-outline-variant/40 shrink min-w-0 max-w-[160px] sm:max-w-[200px]"
                  aria-label="Active patient profile switcher"
                  aria-expanded={profileDropdownOpen}
                >
                  <div
                    className={`w-6 h-6 rounded-full ${activeProfile.avatarBg} ${activeProfile.avatarColor} flex items-center justify-center text-[10px] font-bold shrink-0 shadow-xs`}
                  >
                    {activeProfile.initials}
                  </div>
                  <div className="flex flex-col text-left truncate min-w-0">
                    <span className="text-[11px] text-on-surface font-semibold truncate leading-tight">
                      {activeProfile.shortName}
                    </span>
                    <span className="text-[9px] text-on-surface-variant leading-none truncate">
                      {activeProfile.type === 'child' ? 'Dependent' : activeProfile.type === 'guardian' ? 'Guardian' : 'Active Patient'}
                    </span>
                  </div>
                  <Icon
                    name="expand_more"
                    className={`text-on-surface-variant text-[16px] shrink-0 transition-transform duration-200 ${
                      profileDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-30"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest rounded-2xl shadow-xl border border-outline-variant/30 p-2 z-40 animate-in fade-in slide-in-from-top-2 duration-150">
                      <div className="px-3 py-2 border-b border-outline-variant/20 mb-1">
                        <p className="text-[10px] uppercase tracking-wider text-on-surface-variant font-semibold">
                          Switch Patient Chart
                        </p>
                        <p className="text-xs text-on-surface-variant">
                          Strict clinical isolation per DHA standards
                        </p>
                      </div>

                      <div className="space-y-1">
                        {Object.values(PROFILES).map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setActiveProfile(p.id);
                              setProfileDropdownOpen(false);
                            }}
                            className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-colors ${
                              activeProfileId === p.id
                                ? 'bg-primary-fixed/40 text-primary font-semibold'
                                : 'hover:bg-surface-container-low text-on-surface'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div
                                className={`w-8 h-8 rounded-full ${p.avatarBg} ${p.avatarColor} flex items-center justify-center text-[11px] font-bold shrink-0`}
                              >
                                {p.initials}
                              </div>
                              <div className="truncate">
                                <p className="text-sm font-medium truncate leading-tight">
                                  {p.name}
                                </p>
                                <p className="text-[10px] text-on-surface-variant truncate">
                                  {p.lifecode} • {p.role}
                                </p>
                              </div>
                            </div>
                            {activeProfileId === p.id && (
                              <Icon name="check" className="text-primary text-[18px] shrink-0" />
                            )}
                          </button>
                        ))}
                      </div>

                      <div className="mt-2 pt-2 border-t border-outline-variant/20">
                        <NavLink
                          to="/patient-dashboard/guardian"
                          onClick={() => setProfileDropdownOpen(false)}
                          className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-sm font-semibold transition-colors"
                        >
                          <Icon name="manage_accounts" className="text-[18px]" />
                          <span>Manage All Profiles & Dependents</span>
                        </NavLink>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Notifications Bell with unread badge */}
              <NavLink
                to="/patient-dashboard/notifications"
                className={({ isActive }) =>
                  `w-9 h-9 sm:w-10 sm:h-10 relative flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors ${
                    isActive ? 'bg-primary-fixed text-primary' : 'hover:bg-surface-container-low'
                  }`
                }
                aria-label="Notifications"
              >
                <Icon name="notifications" className="text-[22px]" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 min-w-[16px] h-[16px] px-1 bg-error text-on-error rounded-full text-[9px] font-bold flex items-center justify-center leading-none ring-2 ring-surface-container-lowest animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </NavLink>
            </div>
          </div>
        </header>

        {/* ════════════ Main Content Area ════════════ */}
        <main className="flex-1 w-full pb-20 md:pb-8">
          {children}
        </main>
      </div>

      {/* ════════════ Mobile Bottom Navigation Bar (4 items, visible below md) ════════════ */}
      <nav
        className="md:hidden fixed bottom-0 w-full z-40 pb-safe bg-surface-container-lowest/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-2px_12px_rgba(15,23,42,0.06)]"
        aria-label="Mobile Navigation"
      >
        <div className="flex justify-around items-center h-14 px-2">
          {/* 1. Home */}
          <NavLink
            to="/patient-dashboard"
            end
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-1 transition-colors ${
                isActive ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`
            }
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon name="home" className="text-[22px]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight">Home</span>
          </NavLink>

          {/* 2. Records */}
          <NavLink
            to="/patient-dashboard/records/timeline"
            className={() => {
              const active = location.pathname.startsWith('/patient-dashboard/records') || location.pathname === '/patient-dashboard/oral-health';
              return `flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-1 transition-colors ${
                active ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`;
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon name="folder_open" className="text-[22px]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight">Records</span>
          </NavLink>

          {/* 3. Reminders */}
          <NavLink
            to="/patient-dashboard/reminders"
            className={() => {
              const active = location.pathname.startsWith('/patient-dashboard/reminders');
              return `flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-1 transition-colors ${
                active ? 'text-primary font-semibold' : 'text-on-surface-variant'
              }`;
            }}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon name="alarm" className="text-[22px]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight">Reminders</span>
          </NavLink>

          {/* 4. More (opens bottom drawer) */}
          <button
            type="button"
            onClick={() => setMobileMoreOpen(true)}
            className={`flex flex-col items-center justify-center gap-0.5 min-w-[52px] py-1 transition-colors ${
              mobileMoreOpen ? 'text-primary font-semibold' : 'text-on-surface-variant'
            }`}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon name="grid_view" className="text-[22px]" />
            </div>
            <span className="text-[10px] leading-tight tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* ════════════ Mobile "More" Bottom Sheet Drawer ════════════ */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-inverse-surface/40 backdrop-blur-sm"
            onClick={() => setMobileMoreOpen(false)}
          />
          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-surface-container-lowest rounded-t-3xl shadow-2xl pb-safe animate-in slide-in-from-bottom duration-200">
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-outline-variant/50 rounded-full" />
            </div>
            <div className="px-5 pb-2">
              <h3 className="text-sm font-bold text-on-surface">More Options</h3>
              <p className="text-[11px] text-on-surface-variant">Quick access to all patient services</p>
            </div>

            {/* Grid of More items: 4 columns with centered, aligned icon containers */}
            <div className="grid grid-cols-4 gap-2 px-4 pb-5">
              {MORE_ITEMS.map((item) => {
                const active = item.to === location.pathname || location.pathname.startsWith(item.to + '/');
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMoreOpen(false)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl transition-colors ${
                      active
                        ? 'bg-primary-fixed text-on-primary-fixed font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <div className="w-9 h-9 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shadow-2xs">
                      <Icon name={item.icon} className="text-[20px]" />
                    </div>
                    <span className="text-[10px] leading-tight text-center font-medium truncate w-full">{item.label}</span>
                  </NavLink>
                );
              })}
              {/* View Pass button inside More */}
              <button
                type="button"
                onClick={() => {
                  setMobileMoreOpen(false);
                  setQrModalOpen(true);
                }}
                className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 rounded-xl text-primary hover:bg-primary-fixed/30 transition-colors"
              >
                <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shadow-2xs">
                  <Icon name="qr_code_scanner" className="text-[20px]" />
                </div>
                <span className="text-[10px] leading-tight text-center font-medium truncate w-full">View Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ Global Interactive QR Pass Modal ════════════ */}
      {qrModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/50 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity animate-in fade-in duration-200"
          onClick={() => setQrModalOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl w-full max-w-sm sm:max-w-md p-5 sm:p-6 shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-10 h-1 bg-surface-variant rounded-full mb-3"></div>
            <div className="w-11 h-11 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-2 shadow-sm">
              <Icon name="badge" className="text-[24px]" />
            </div>
            <h3 className="text-base sm:text-lg text-on-surface font-bold">
              {activeProfile.name}
            </h3>
            <p className="text-xs text-on-surface-variant mt-1">
              Present this Lifecode token at any DHA clinic reception tablet or express check-in kiosk.
            </p>

            {/* Simulated High-Res Crisp QR Replica */}
            <div className="p-4 bg-white rounded-2xl shadow-md border border-outline-variant/30 my-4">
              <svg className="w-44 h-44 sm:w-52 sm:h-52 text-[#006194]" fill="none" viewBox="0 0 58 58">
                <rect x="0" y="0" width="58" height="58" rx="6" fill="#ffffff" />
                <rect x="4" y="4" width="18" height="18" rx="3" fill="#006194" />
                <rect x="7" y="7" width="12" height="12" rx="2" fill="#ffffff" />
                <rect x="9" y="9" width="8" height="8" rx="1.5" fill="#006194" />
                <rect x="36" y="4" width="18" height="18" rx="3" fill="#006194" />
                <rect x="39" y="7" width="12" height="12" rx="2" fill="#ffffff" />
                <rect x="41" y="9" width="8" height="8" rx="1.5" fill="#006194" />
                <rect x="4" y="36" width="18" height="18" rx="3" fill="#006194" />
                <rect x="7" y="39" width="12" height="12" rx="2" fill="#ffffff" />
                <rect x="9" y="41" width="8" height="8" rx="1.5" fill="#006194" />
                <rect x="26" y="6" width="6" height="6" rx="1" fill="#006194" />
                <rect x="26" y="16" width="6" height="6" rx="1" fill="#006194" />
                <rect x="6" y="26" width="6" height="6" rx="1" fill="#006194" />
                <rect x="16" y="26" width="6" height="6" rx="1" fill="#006194" />
                <rect x="26" y="26" width="6" height="6" rx="1" fill="#006194" />
                <rect x="36" y="26" width="6" height="6" rx="1" fill="#006194" />
                <rect x="46" y="26" width="6" height="6" rx="1" fill="#006194" />
                <rect x="26" y="36" width="6" height="6" rx="1" fill="#006194" />
                <rect x="36" y="36" width="6" height="6" rx="1" fill="#006194" />
                <rect x="46" y="46" width="6" height="6" rx="1" fill="#006194" />
                <rect x="36" y="46" width="6" height="6" rx="1" fill="#006194" />
              </svg>
            </div>

            <div className="space-y-0.5">
              <p className="text-[11px] text-on-surface-variant font-medium">
                Digital Clinic Token
              </p>
              <p className="text-base font-bold text-primary font-mono tracking-wider">
                {activeProfile.lifecode}
              </p>
            </div>

            <div className="mt-4 w-full flex gap-2">
              <button
                type="button"
                className="flex-1 py-2.5 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl text-sm font-semibold transition-colors"
                onClick={() => setQrModalOpen(false)}
              >
                Close Pass
              </button>
              <button
                type="button"
                className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                onClick={() => alert(`Pass ${activeProfile.lifecode} saved or shared successfully.`)}
              >
                <Icon name="share" className="text-[18px]" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
