import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
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

const ODONTOGRAM_SUBNAV = [
  { to: '/odontogram/overview', label: 'Overview', icon: 'space_dashboard', code: '9.1' },
  { to: '/odontogram/findings', label: 'Oral Findings', icon: 'clinical_notes', code: '9.5' },
  { to: '/odontogram/investigations', label: 'Investigations', icon: 'hub', code: '9.6' },
  { to: '/odontogram/summary', label: 'Clinical Summary', icon: 'assignment_turned_in', code: '9.7' },
  { to: '/odontogram/confirmation', label: 'Confirmation', icon: 'verified_user', code: '9.8' },
  { to: '/odontogram/history', label: 'History', icon: 'history_edu', code: '9.9' },
  { to: '/odontogram/compare', label: 'Compare', icon: 'compare', code: '9.10' },
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
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Application Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Clinician Operator Credentials Bar */}
        <div className="bg-surface-container-low px-4 sm:px-6 lg:px-8 py-2 border-b border-outline-variant/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span className="font-semibold text-on-surface truncate">
              Dr. Daniel Example
            </span>
            <span className="text-on-surface-variant font-mono text-[11px] hidden sm:inline">
              (#DEN-48912)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
              LIVE CLINICAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-mono text-[10px] font-bold">
              <Icon name="verified" className="text-[13px] text-secondary" />
              <span>DHA Registered Odontogram</span>
            </span>
            {badgeCode && (
              <span className="font-mono text-[11px] font-bold bg-surface-container px-2 py-0.5 rounded text-primary">
                {badgeCode}
              </span>
            )}
          </div>
        </div>

        {/* Patient Identity Quick Bar */}
        <div className="bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-1.5 border-b border-outline-variant/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <Icon name="badge" className="text-primary text-[16px] shrink-0" />
            <span className="font-title-sm text-xs font-bold text-on-surface truncate">
              {patientName}
            </span>
            <span className="text-outline hidden xs:inline">•</span>
            <span className="font-label-code text-xs text-on-surface-variant font-mono truncate">
              {dhaId}
            </span>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="text-on-surface-variant hidden sm:inline">28y Female</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold">
              <Icon name="verified_user" className="text-[12px] text-secondary" />
              <span>Clinical Record Active</span>
            </span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: Back button & Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {showBack && (
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shrink-0"
                aria-label="Go back"
              >
                <Icon name="arrow_back" className="text-[22px]" />
              </button>
            )}

            <NavLink
              to="/odontogram/overview"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl py-1 px-1.5"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <Icon name="dentistry" className="text-[20px]" />
              </div>
              <div className="leading-tight">
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface tracking-tight">
                    Odontogram Matrix
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase">
                    FDI / ISO 3950
                  </span>
                </div>
                <span className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold block">
                  Comprehensive Dental Charting & History
                </span>
              </div>
            </NavLink>

            {badgeLabel ? (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-semibold text-primary truncate max-w-[260px]">
                <Icon name="clinical_notes" className="text-[14px] text-secondary" />
                <span className="truncate">{badgeLabel}</span>
              </span>
            ) : pageTitle ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-medium text-on-surface-variant truncate max-w-[220px]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate">{pageTitle}</span>
              </span>
            ) : null}
          </div>

          {/* Right Action Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Switch Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high border border-outline-variant/30 transition-colors shadow-2xs"
                aria-expanded={navMenuOpen}
              >
                <Icon name="dentistry" className="text-[16px] text-primary" />
                <span className="hidden sm:inline">Section 9 Suite</span>
                <Icon
                  name="expand_more"
                  className={`text-[18px] text-on-surface-variant transition-transform ${
                    navMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {navMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                    onClick={() => setNavMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 border-b border-outline-variant/20 mb-1 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Section 9: Odontogram & Charting
                      </p>
                      <button
                        type="button"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-[11px] text-on-surface-variant hover:text-on-surface"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto px-1.5 space-y-0.5">
                      {ODONTOGRAM_SUBNAV.map((page) => (
                        <NavLink
                          key={page.to}
                          to={page.to}
                          onClick={() => setNavMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                              isActive
                                ? 'bg-primary text-on-primary shadow-xs font-semibold'
                                : 'text-on-surface hover:bg-surface-container-high'
                            }`
                          }
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Icon name={page.icon} className="text-[18px] shrink-0" />
                            <span className="truncate">{page.label}</span>
                          </div>
                          <span
                            className={`font-mono text-[10px] px-1.5 py-0.5 rounded ${
                              location.pathname === page.to
                                ? 'bg-white/20 text-white'
                                : 'bg-surface-container text-on-surface-variant'
                            }`}
                          >
                            {page.code}
                          </span>
                        </NavLink>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-outline-variant/20 px-3 flex items-center justify-between">
                      <NavLink
                        to="/patient-dashboard"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Patient Portal Home</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                    </div>
                  </div>
                </>
              )}
            </div>

            <NavLink
              to="/odontogram/findings"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs"
            >
              <Icon name="edit_note" className="text-[16px]" />
              <span className="hidden xs:inline">Chart Findings</span>
            </NavLink>
          </div>
        </div>

        {/* Desktop Quick Category Bar */}
        <div className="hidden md:flex items-center justify-center gap-2 py-2 px-4 bg-surface-container-lowest border-t border-outline-variant/20 text-xs overflow-x-auto">
          {ODONTOGRAM_SUBNAV.map((nav) => {
            const isActive = location.pathname === nav.to;
            return (
              <NavLink
                key={nav.to}
                to={nav.to}
                className={`px-3 py-1.5 rounded-full transition flex items-center gap-1.5 font-semibold shrink-0 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-2xs'
                    : 'text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                <Icon name={nav.icon} className="text-[16px]" />
                <span>{nav.label}</span>
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile 5-Item Floating Nav */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-2px_12px_rgba(0,0,0,0.04)] pb-safe">
        <div className="flex justify-around items-center h-16 px-1">
          <NavLink
            to="/odontogram/overview"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 text-xs transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="space_dashboard" className="text-[20px]" />
            <span className="text-[9px]">Overview</span>
          </NavLink>

          <NavLink
            to="/odontogram/findings"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 text-xs transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="clinical_notes" className="text-[20px]" />
            <span className="text-[9px]">Findings</span>
          </NavLink>

          <NavLink
            to="/odontogram/investigations"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 text-xs transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="hub" className="text-[20px]" />
            <span className="text-[9px]">Images</span>
          </NavLink>

          <NavLink
            to="/odontogram/history"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 text-xs transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="history_edu" className="text-[20px]" />
            <span className="text-[9px]">History</span>
          </NavLink>

          <NavLink
            to="/odontogram/compare"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 min-w-[50px] h-12 text-xs transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="compare" className="text-[20px]" />
            <span className="text-[9px]">Compare</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default OdontogramShell;

