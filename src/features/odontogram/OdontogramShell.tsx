import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Icon } from '../../design/Primitives';

interface OdontogramShellProps {
  children: ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  patientName?: string;
  dhaId?: string;
  showBack?: boolean;
}

type NavItem = { to: string; label: string; icon: string; end?: boolean; desc?: string };

/* Sidebar shows module-level destinations only. Charting, imaging, summary and
   verification are stages of one odontogram session; compare opens from History. */
const ODONTOGRAM_SUBNAV: NavItem[] = [
  { to: '/odontogram/overview', label: 'Odontogram Overview', icon: 'space_dashboard' },
  { to: '/odontogram/history', label: 'Odontogram History', icon: 'history_edu' },
];

export function OdontogramShell({
  children,
  pageTitle = 'Odontogram Examination',
  badgeCode,
  badgeLabel,
  patientName = 'Amina Yusuf',
  dhaId = 'DHA-000245',
  showBack = true,
}: OdontogramShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleSignOut = () => {
    useAuthStore.getState().signOut(); navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* DESKTOP FIXED SIDEBAR */}
      <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-60 lg:w-64 bg-white border-r border-[#eaedff] z-40">
        {/* Brand Header */}
        <div className="p-4 border-b border-[#eaedff] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-sm shrink-0">
            <Icon name="dentistry" className="text-[22px]" />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#006194] block">
              Digital Charting
            </span>
            <h2 className="text-sm font-bold text-[#131b2e] truncate">
              Odontogram Suite
            </h2>
          </div>
        </div>

        {/* Active Patient File Capsule */}
        <div className="p-3 bg-[#f2f3ff] border-b border-[#eaedff]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0">
              AY
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#131b2e] truncate">{patientName}</span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-semibold">
                  Active
                </span>
              </div>
              <span className="text-[11px] text-[#707881] font-mono">{dhaId} • 28y F</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#707881]">
            Odontogram Tools
          </div>
          {ODONTOGRAM_SUBNAV.map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#006194] text-white font-semibold shadow-xs'
                    : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                }`}
              >
                <Icon name={item.icon} className="text-[17px] shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-3 mt-3 border-t border-[#eaedff]">
            <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#707881]">
              Connected Suites
            </div>
            <NavLink
              to="/clinical/workspace"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]"
            >
              <Icon name="space_dashboard" className="text-[17px] text-[#006194]" />
              <span className="truncate">Dentist Workspace</span>
            </NavLink>
            <NavLink
              to="/examination/workspace"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]"
            >
              <Icon name="clinical_notes" className="text-[17px] text-[#006194]" />
              <span className="truncate">Clinical Examination</span>
            </NavLink>
            <NavLink
              to="/investigations/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]"
            >
              <Icon name="biotech" className="text-[17px] text-[#006194]" />
              <span className="truncate">Investigations & Lab</span>
            </NavLink>
            <NavLink
              to="/summaries/dashboard"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]"
            >
              <Icon name="auto_awesome" className="text-[17px] text-[#006194]" />
              <span className="truncate">AI Diagnostic Summaries</span>
            </NavLink>
          </div>
        </div>

        {/* Sidebar Footer with Sign Out */}
        <div className="p-3 border-t border-[#eaedff] bg-[#faf8ff] space-y-1">
          <button
            type="button"
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <Icon name="logout" className="text-[18px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)] md:pl-60 lg:pl-64">
        {/* Clinician Operator Credentials Bar */}
        <div className="bg-[#f2f3ff] px-4 sm:px-6 lg:px-8 py-1.5 border-b border-[#eaedff] flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-[#131b2e] truncate">
              Dr. Daniel James
            </span>
            <span className="text-[#707881] font-mono text-[11px] hidden sm:inline">
              (#DEN-48912)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61] text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
              LIVE CLINICAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-white text-[#006194] border border-[#eaedff] font-mono text-[10px] font-bold">
              <Icon name="verified" className="text-[13px] text-emerald-600" />
              <span>Registered Odontogram</span>
            </span>
            {badgeCode && (
              <span className="font-mono text-[11px] font-bold bg-[#eaedff] px-2 py-0.5 rounded text-[#006194]">
                {badgeCode}
              </span>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {showBack && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-9 h-9 flex items-center justify-center rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] transition-colors shrink-0"
                aria-label="Go back"
              >
                <Icon name="arrow_back_ios_new" className="text-[16px]" />
              </button>
            )}

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-[#131b2e] truncate">
                  {pageTitle}
                </h1>
                {badgeLabel && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#e2e7ff] text-[#006194] text-[11px] font-semibold">
                    {badgeLabel}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-[#707881] font-medium truncate">
                {patientName} • {dhaId}
              </span>
            </div>
          </div>

          {/* Quick Actions & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            <NavLink
              to="/odontogram/findings"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition shadow-xs"
            >
              <Icon name="edit_note" className="text-[16px]" />
              <span className="hidden xs:inline">Chart Findings</span>
            </NavLink>

            {/* Desktop Profile Dropdown */}
            <div className="relative hidden md:block">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#f2f3ff] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
                  DJ
                </div>
                <Icon name="expand_more" className="text-[16px] text-slate-400" />
              </button>

              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-30"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-40">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">Dr. Daniel James</p>
                      <p className="text-[11px] text-slate-500 font-mono">#DEN-48912 • MDCN Verified</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/clinical/workspace');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Icon name="space_dashboard" className="text-[16px] text-[#006194]" />
                      <span>Switch to Clinical Workspace</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/patient-dashboard');
                      }}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <Icon name="switch_account" className="text-[16px] text-[#006194]" />
                      <span>Switch to Patient Portal</span>
                    </button>
                    <div className="my-1 border-t border-slate-100" />
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold"
                    >
                      <Icon name="logout" className="text-[16px]" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Mobile Profile Trigger */}
            <button
              type="button"
              onClick={() => setMobileProfileOpen(true)}
              className="md:hidden w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs"
              aria-label="Clinician Profile"
            >
              DJ
            </button>
          </div>
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-24 md:pb-12 md:pl-60 lg:pl-64">
        {children}
      </main>

      {/* MOBILE STICKY BOTTOM NAVIGATION DOCK */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-safe">
        <div className="flex justify-around items-center">
          <NavLink
            to="/odontogram/overview"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#006194] font-bold scale-105' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="space_dashboard" className="text-[20px]" />
            <span className="text-[10px] mt-0.5">Overview</span>
          </NavLink>

          <NavLink
            to="/odontogram/history"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all ${
                isActive ? 'text-[#006194] font-bold scale-105' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="history_edu" className="text-[20px]" />
            <span className="text-[10px] mt-0.5">History</span>
          </NavLink>

          {/* MORE BUTTON */}
          <button
            type="button"
            onClick={() => setMobileMoreOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[#707881] hover:text-[#131b2e]"
          >
            <Icon name="more_horiz" className="text-[20px]" />
            <span className="text-[10px] mt-0.5">More</span>
          </button>
        </div>
      </nav>

      {/* MOBILE "MORE" BOTTOM SHEET POPUP */}
      {mobileMoreOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
            onClick={() => setMobileMoreOpen(false)}
          />
          <div className="relative w-full max-h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 bg-slate-300 rounded-full" />
            </div>

            <div className="p-4 border-b border-[#eaedff] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#006194] text-white flex items-center justify-center">
                  <Icon name="dentistry" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Odontogram Tools</h3>
                  <p className="text-[11px] text-slate-500">Charting & clinical history</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileMoreOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                Odontogram Screens
              </p>
              {ODONTOGRAM_SUBNAV.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileMoreOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-[#006194] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} className="text-[18px]" />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <Icon name="check" className="text-[16px]" />}
                  </NavLink>
                );
              })}

              <div className="pt-3 mt-3 border-t border-slate-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3 py-1">
                  Connected Suites
                </p>
                <NavLink
                  to="/clinical/workspace"
                  onClick={() => setMobileMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium"
                >
                  <Icon name="space_dashboard" className="text-[18px] text-[#006194]" />
                  <span>Dentist Workspace</span>
                </NavLink>
                <NavLink
                  to="/examination/workspace"
                  onClick={() => setMobileMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium"
                >
                  <Icon name="clinical_notes" className="text-[18px] text-[#006194]" />
                  <span>Clinical Examination</span>
                </NavLink>
                <NavLink
                  to="/investigations/dashboard"
                  onClick={() => setMobileMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium"
                >
                  <Icon name="radiology" className="text-[18px] text-[#006194]" />
                  <span>Investigations & Lab</span>
                </NavLink>
                <NavLink
                  to="/summaries/dashboard"
                  onClick={() => setMobileMoreOpen(false)}
                  className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs text-slate-700 hover:bg-slate-100 font-medium"
                >
                  <Icon name="auto_awesome" className="text-[18px] text-[#006194]" />
                  <span>AI Diagnostic Summaries</span>
                </NavLink>
              </div>

              {/* Sign Out */}
              <div className="pt-3 mt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50"
                >
                  <Icon name="logout" className="text-[18px]" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE PROFILE BOTTOM SHEET POPUP */}
      {mobileProfileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-in fade-in"
            onClick={() => setMobileProfileOpen(false)}
          />
          <div className="relative w-full bg-white rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
            <div className="pt-3 pb-1 flex justify-center">
              <div className="w-10 h-1 bg-slate-300 rounded-full" />
            </div>
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm">
                  DJ
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Dr. Daniel James</h3>
                  <p className="text-[11px] text-slate-500 font-mono">#DEN-48912 • MDCN Verified</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileProfileOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <div className="p-4 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileProfileOpen(false);
                  navigate('/clinical/workspace');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800"
              >
                <Icon name="space_dashboard" className="text-[18px] text-[#006194]" />
                <span>Switch to Clinical Workspace</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileProfileOpen(false);
                  navigate('/patient-dashboard');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800"
              >
                <Icon name="switch_account" className="text-[18px] text-[#006194]" />
                <span>Switch to Patient Portal</span>
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-xs font-bold text-rose-600"
              >
                <Icon name="logout" className="text-[18px]" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OdontogramShell;
