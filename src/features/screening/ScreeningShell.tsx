import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ScreeningShellProps {
  children: ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  currentStep?: number;
  totalSteps?: number;
  showBack?: boolean;
}

type NavItem = { to: string; label: string; icon: string; end?: boolean; desc?: string };

/* Mobile dock: desk + intake only — the screening stages (consent → review) are
   steps of one session and are reached through Continue buttons inside the flow. */
const PRIMARY_SCREENING_TABS: NavItem[] = [
  { to: '/screening/dashboard', label: 'Desk', icon: 'dashboard', end: true },
  { to: '/screening/identification', label: 'Intake', icon: 'person_search' },
];

/* Sidebar shows module-level destinations only; consent, complaints assessment,
   clinical findings, outcome & triage and review are nested workflow steps. */
const ALL_SCREENING_NAV_ITEMS: NavItem[] = [
  { to: '/screening/dashboard', label: 'Screening Desk', icon: 'dashboard', end: true, desc: 'Outreach queue & metrics' },
  { to: '/screening/identification', label: 'Patient Intake', icon: 'person_search', desc: 'Scan QR or lookup profile' },
];

export function ScreeningShell({
  children,
  pageTitle = 'Screening Suite',
  badgeLabel,
  currentStep,
  totalSteps = 5,
  showBack = true,
}: ScreeningShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* ════════════ Desktop Permanent Left Sidebar (md+) ════════════ */}
      <aside className="hidden md:flex flex-col w-60 lg:w-64 fixed inset-y-0 left-0 z-30 bg-surface-container-lowest border-r border-outline-variant/30 shadow-[2px_0_16px_rgba(15,23,42,0.03)]">
        {/* Brand */}
        <div className="px-5 py-4 border-b border-outline-variant/20 flex items-center justify-between shrink-0">
          <NavLink to="/screening/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <Icon name="local_hospital" className="text-[20px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface leading-tight">DHA Screening</span>
              <span className="text-[10px] text-secondary font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span>Field Outreach Suite</span>
              </span>
            </div>
          </NavLink>
        </div>

        {/* Screener Operator Card */}
        <div className="p-3 mx-3 mt-3 rounded-xl bg-surface-container-low border border-outline-variant/30 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shrink-0 ring-2 ring-surface-container-lowest">
              SA
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold text-on-surface truncate">Dr. Sarah Al-Mansoor</div>
              <div className="text-[10px] text-on-surface-variant font-mono truncate">#SC-8921 • Screener</div>
            </div>
          </div>
        </div>

        {/* Navigation Items (Scrollable) */}
        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5" aria-label="Sidebar Navigation">
          <div className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant px-2.5 py-1">
            Outreach Workflow
          </div>
          {ALL_SCREENING_NAV_ITEMS.map((item) => {
            const isActive = item.end
              ? location.pathname === item.to
              : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${isActive
                  ? 'bg-primary text-on-primary font-bold shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                  }`}
              >
                <Icon
                  name={item.icon}
                  className={`text-[18px] shrink-0 ${isActive ? 'text-on-primary' : 'text-on-surface-variant'}`}
                />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer: Back to Portal & Sign Out */}
        <div className="p-3 border-t border-outline-variant/20 space-y-1.5 shrink-0 bg-surface-container-lowest">
          <NavLink
            to="/patient-dashboard"
            className="w-full px-3 py-2 rounded-xl text-xs font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-[16px]" />
            <span>Return to Patient Portal</span>
          </NavLink>
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full px-3 py-2 rounded-xl bg-error-container/40 hover:bg-error-container/70 text-error text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Icon name="logout" className="text-[16px]" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* ════════════ Main Content & Header Area ════════════ */}
      <div className="md:pl-60 lg:pl-64 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
          {/* Operator Status Sub-strip */}
          <div className="bg-surface-container-low px-4 sm:px-6 lg:px-8 py-1.5 border-b border-outline-variant/20 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
              <span className="font-semibold text-on-surface truncate">
                Dr. Sarah Al-Mansoor
              </span>
              <span className="text-on-surface-variant font-mono text-[11px] hidden sm:inline">
                (MOHAP/DHA #SC-8921)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
                Terminal Online
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-mono text-[10px] font-bold">
                <Icon name="verified_user" className="text-[13px] text-secondary" />
                <span>Nabidh Sync Active</span>
              </span>
            </div>
          </div>

          {/* Main Top Nav Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
            {/* Left: Back / Brand / Title */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              {showBack && (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shrink-0"
                  aria-label="Go back"
                >
                  <Icon name="arrow_back" className="text-[20px]" />
                </button>
              )}

              <NavLink to="/screening/dashboard" className="md:hidden flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
                  <Icon name="local_hospital" className="text-[18px]" />
                </div>
                <span className="font-headline-sm text-sm font-bold text-on-surface truncate">
                  DHA Screening
                </span>
              </NavLink>

              <div className="hidden md:flex items-center gap-2">
                <span className="font-headline-sm text-base font-bold text-on-surface">
                  {pageTitle}
                </span>
                {badgeLabel && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
                    <Icon name="assignment" className="text-[13px]" />
                    <span>{badgeLabel}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Right: Step Counter & Action */}
            <div className="flex items-center gap-2 sm:gap-3">
              {currentStep && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-fixed/30 text-primary text-xs font-bold font-mono">
                  Step {currentStep} of {totalSteps}
                </span>
              )}

              <NavLink
                to="/screening/identification"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs"
              >
                <Icon name="add" className="text-[16px]" />
                <span className="hidden xs:inline">New Screening</span>
              </NavLink>

              {/* Profile Avatar Trigger */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs shadow-xs hover:opacity-90"
                  aria-label="User menu"
                >
                  SA
                </button>

                {/* Desktop Dropdown */}
                {profileDropdownOpen && (
                  <div className="hidden md:block absolute right-0 mt-2 w-52 bg-surface-container-lowest rounded-xl shadow-xl border border-outline-variant/30 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-3 py-2 border-b border-outline-variant/20">
                      <p className="text-xs font-bold text-on-surface">Dr. Sarah Al-Mansoor</p>
                      <p className="text-[11px] text-on-surface-variant">sarah.almansoor@dha.gov.ae</p>
                    </div>
                    <NavLink
                      to="/screening/dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <Icon name="dashboard" className="text-[16px]" />
                      <span>Screening Desk</span>
                    </NavLink>
                    <NavLink
                      to="/patient-dashboard"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="w-full px-3 py-2 text-left text-xs text-on-surface hover:bg-surface-container flex items-center gap-2"
                    >
                      <Icon name="switch_account" className="text-[16px]" />
                      <span>Patient Portal</span>
                    </NavLink>
                    <div className="border-t border-outline-variant/20 my-1" />
                    <button
                      type="button"
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full px-3 py-2 text-left text-xs text-error font-semibold hover:bg-error-container/30 flex items-center gap-2"
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
            <div className="relative w-full bg-surface-container-lowest rounded-t-3xl p-5 shadow-2xl z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              <div className="w-10 h-1 bg-outline-variant/40 rounded-full mx-auto mb-4" />
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-surface-container-low mb-4">
                <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shadow-xs">
                  SA
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-on-surface">Dr. Sarah Al-Mansoor</h4>
                  <p className="text-xs text-on-surface-variant">sarah.almansoor@dha.gov.ae</p>
                  <p className="text-[10px] text-secondary font-bold mt-0.5">Clinical Screener • #SC-8921</p>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/screening/dashboard');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container flex items-center gap-2.5"
                >
                  <Icon name="dashboard" className="text-[18px] text-primary" />
                  <span>Screening Desk Overview</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setProfileDropdownOpen(false);
                    navigate('/patient-dashboard');
                  }}
                  className="w-full p-3 rounded-xl text-left text-xs font-semibold text-on-surface hover:bg-surface-container flex items-center gap-2.5"
                >
                  <Icon name="switch_account" className="text-[18px] text-secondary" />
                  <span>Switch to Patient Portal</span>
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProfileDropdownOpen(false);
                  navigate('/login');
                }}
                className="w-full py-3 rounded-2xl bg-error-container text-on-error-container text-xs font-bold flex items-center justify-center gap-2 shadow-xs"
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
            <div className="relative w-full max-h-[85vh] bg-surface-container-lowest rounded-t-3xl shadow-2xl flex flex-col z-10 animate-in slide-in-from-bottom duration-200 pb-safe">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1 shrink-0">
                <div className="w-10 h-1 bg-outline-variant/40 rounded-full" />
              </div>

              {/* Header */}
              <div className="px-5 py-3 border-b border-outline-variant/20 flex items-center justify-between shrink-0">
                <div>
                  <h3 className="text-sm font-bold text-on-surface">Screening Workflow Steps</h3>
                  <p className="text-[11px] text-on-surface-variant">Outreach assessment workflow stages</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMoreOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:text-on-surface"
                  aria-label="Close"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              {/* Scrollable List of All Workflow Pages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {ALL_SCREENING_NAV_ITEMS.map((item, idx) => {
                  const isActive = item.end
                    ? location.pathname === item.to
                    : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      end={item.end}
                      onClick={() => setMobileMoreOpen(false)}
                      className={`flex items-center gap-3 p-3 rounded-2xl transition-all ${
                        isActive
                          ? 'bg-primary text-on-primary shadow-xs font-bold'
                          : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive ? 'bg-white/20 text-white' : 'bg-surface-container text-primary'
                        }`}
                      >
                        <Icon name={item.icon} className="text-[20px]" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold truncate">{item.label}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                            isActive ? 'bg-white/20 text-white' : 'bg-surface-container-high text-on-surface-variant'
                          }`}>
                            Step {idx + 1}
                          </span>
                        </div>
                        <p className={`text-[11px] truncate mt-0.5 ${isActive ? 'text-white/80' : 'text-on-surface-variant'}`}>
                          {item.desc}
                        </p>
                      </div>
                      <Icon name="chevron_right" className={`text-[18px] shrink-0 ${isActive ? 'text-white' : 'text-on-surface-variant'}`} />
                    </NavLink>
                  );
                })}

                {/* Actions */}
                <div className="pt-2 border-t border-outline-variant/20 space-y-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMoreOpen(false);
                      navigate('/patient-dashboard');
                    }}
                    className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="arrow_back" className="text-[16px]" />
                    <span>Return to Patient Portal</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMoreOpen(false);
                      navigate('/login');
                    }}
                    className="w-full py-2.5 rounded-xl bg-error-container/40 hover:bg-error-container text-error text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="logout" className="text-[16px]" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Viewport Content */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-24 md:pb-12">
          {children}
        </main>

        {/* ════════════ Mobile Floating Bottom Nav Bar with "More" ════════════ */}
        <nav
          className="fixed bottom-0 w-full z-40 pb-safe bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] md:hidden"
          aria-label="Mobile Bottom Navigation"
        >
          <div className="h-16 px-2 flex items-center justify-around">
            {PRIMARY_SCREENING_TABS.map((tab) => {
              const isActive = tab.end
                ? location.pathname === tab.to
                : location.pathname === tab.to || location.pathname.startsWith(`${tab.to}/`);
              return (
                <button
                  key={tab.to}
                  type="button"
                  onClick={() => navigate(tab.to)}
                  className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors ${
                    isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  <Icon name={tab.icon} className="text-[22px]" />
                  <span className="text-[10px] tracking-tight">{tab.label}</span>
                </button>
              );
            })}

            {/* "More" button */}
            <button
              type="button"
              onClick={() => setMobileMoreOpen(true)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[56px] min-h-[44px] transition-colors ${
                mobileMoreOpen ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <Icon name="grid_view" className="text-[22px]" />
              <span className="text-[10px] tracking-tight">More</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}
