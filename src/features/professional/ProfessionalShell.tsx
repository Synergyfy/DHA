import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { PublicSiteHeader } from '../portal/PublicSiteHeader';

interface ProfessionalShellProps {
  children: ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  showBack?: boolean;
  showFooter?: boolean;
}

const PROFESSIONAL_PAGES = [
  { to: '/professional/hero', label: '0B.1 Professional Hero', icon: 'health_and_safety', code: '0B.1' },
  { to: '/professional/intro', label: '0B.2 Introduction & Platform', icon: 'hub', code: '0B.2' },
  { to: '/professional/services-dentists', label: '0B.3 Services for Dentists', icon: 'dentistry', code: '0B.3' },
  { to: '/professional/services-clinics', label: '0B.4 Services for Clinics', icon: 'local_hospital', code: '0B.4' },
  { to: '/professional/services-schools', label: '0B.5 Services for Schools & Orgs', icon: 'school', code: '0B.5' },
  { to: '/professional/pathway', label: '0B.6 Care Pathway Continuum', icon: 'timeline', code: '0B.6' },
  { to: '/professional/who-can-join', label: '0B.7 Who Can Join DHA', icon: 'groups', code: '0B.7' },
  { to: '/professional/verification-trust', label: '0B.8 Verification & Trust', icon: 'verified_user', code: '0B.8' },
  { to: '/professional/joining-steps', label: '0B.9 Joining Is Straightforward', icon: 'assignment_turned_in', code: '0B.9' },
];

export function ProfessionalShell({
  children,
  pageTitle = 'DHA Healthcare Professionals & Organisations',
  badgeCode,
  badgeLabel,
  showBack = true,
  showFooter = true,
}: ProfessionalShellProps) {
  const navigate = useNavigate();
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } else {
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Shared public-site header — identical on every public page */}
      <PublicSiteHeader />

      {/* Secondary suite toolbar (return bar, page title, 0B Suite Modules menu) */}
      <header className="relative w-full z-20 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Top return utility bar */}
        <div className="bg-surface-container-low px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-xs border-b border-outline-variant/20">
          <NavLink
            to="/patient-dashboard"
            className="inline-flex items-center gap-1.5 text-primary hover:text-primary-container font-semibold transition"
          >
            <Icon name="arrow_back" className="text-[15px]" />
            <span>Switch to Patient Portal</span>
          </NavLink>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-on-surface-variant font-medium">DHA Unified Professional Network</span>
            {badgeCode && (
              <span className="bg-surface-container-highest px-2 py-0.5 rounded font-mono text-[11px] font-bold text-primary">
                {badgeCode}
              </span>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: Back button & Brand Logo */}
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
              to="/professional/hero"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl py-1 px-1.5"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-primary via-primary-container to-secondary flex items-center justify-center text-white shadow-sm">
                <Icon name="health_and_safety" className="text-[20px]" />
              </div>
              <div className="leading-tight">
                <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface tracking-tight block">
                  DHA
                </span>
                <span className="text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold block">
                  Professionals & Organisations
                </span>
              </div>
            </NavLink>

            {badgeLabel ? (
              <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-semibold text-primary truncate max-w-[260px]">
                <Icon name="verified" className="text-[14px] text-secondary" />
                <span className="truncate">{badgeLabel}</span>
              </span>
            ) : pageTitle ? (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-medium text-on-surface-variant truncate max-w-[220px]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate">{pageTitle}</span>
              </span>
            ) : null}
          </div>

          {/* Center/Right Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Switch Dropdown for 0B suite */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high border border-outline-variant/30 transition-colors shadow-2xs"
                aria-expanded={navMenuOpen}
              >
                <Icon name="dashboard_customize" className="text-[16px] text-primary" />
                <span className="hidden sm:inline">0B Suite Modules</span>
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
                  <div className="absolute right-0 mt-2 w-72 sm:w-84 rounded-2xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-1.5 border-b border-outline-variant/20 mb-1 flex items-center justify-between">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Professionals & Organisations (0B.1 - 0B.9)
                      </p>
                      <button
                        type="button"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-[11px] text-on-surface-variant hover:text-on-surface"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="max-h-[420px] overflow-y-auto px-1.5 space-y-0.5">
                      {PROFESSIONAL_PAGES.map((page) => (
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
                        to="/portal/hero"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Public Portal (0.1)</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                      <NavLink
                        to="/register"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-xs font-semibold text-secondary hover:underline"
                      >
                        Join DHA →
                      </NavLink>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Share link button */}
            <button
              type="button"
              onClick={handleShare}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Share this page"
            >
              <Icon name={copiedShare ? 'check' : 'share'} className="text-[18px]" />
            </button>

            {/* Quick Action CTAs */}
            <NavLink
              to="/login"
              className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl border border-outline-variant/40 text-xs font-bold text-on-surface hover:bg-surface-container transition"
            >
              Sign In
            </NavLink>

            <NavLink
              to="/professional/who-can-join"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs"
            >
              <span>Join DHA</span>
              <Icon name="arrow_forward" className="text-[14px]" />
            </NavLink>
          </div>
        </div>

        {/* Desktop Quick Category Bar */}
        <div className="hidden md:flex items-center justify-center gap-2 py-2 px-4 bg-surface-container-lowest border-t border-outline-variant/20 text-xs">
          <NavLink
            to="/professional/services-dentists"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition flex items-center gap-1.5 font-semibold ${
                isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <Icon name="dentistry" className="text-[15px]" />
            <span>For Dentists</span>
          </NavLink>

          <NavLink
            to="/professional/services-clinics"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition flex items-center gap-1.5 font-semibold ${
                isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <Icon name="local_hospital" className="text-[15px]" />
            <span>For Clinics</span>
          </NavLink>

          <NavLink
            to="/professional/services-schools"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition flex items-center gap-1.5 font-semibold ${
                isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <Icon name="school" className="text-[15px]" />
            <span>For Schools & Organisations</span>
          </NavLink>

          <NavLink
            to="/professional/pathway"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition flex items-center gap-1.5 font-semibold ${
                isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <Icon name="timeline" className="text-[15px]" />
            <span>Care Pathway</span>
          </NavLink>

          <NavLink
            to="/professional/verification-trust"
            className={({ isActive }) =>
              `px-3 py-1 rounded-full transition flex items-center gap-1.5 font-semibold ${
                isActive ? 'bg-primary text-on-primary' : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <Icon name="verified_user" className="text-[15px]" />
            <span>Verification & Trust</span>
          </NavLink>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {children}
      </main>

      {/* Footer */}
      {showFooter && (
        <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-outline-variant/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
                  DHA
                </div>
                <div>
                  <h4 className="font-title-sm text-sm font-bold text-on-surface">
                    Dental Health Authority (DHA) Healthcare Operations
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Digital Professional & Institutional Gateway · Unified Nigeria Health Information Exchange Architecture
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <NavLink
                  to="/professional/joining-steps"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs"
                >
                  Registration Guide
                </NavLink>
                <NavLink
                  to="/patient-dashboard"
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-high transition"
                >
                  Patient Dashboard →
                </NavLink>
              </div>
            </div>

            {/* Sitemap Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
              <div>
                <span className="font-bold text-on-surface uppercase tracking-wider block mb-3">
                  Practitioner Portals
                </span>
                <ul className="space-y-2 text-on-surface-variant">
                  <li><NavLink to="/professional/services-dentists" className="hover:text-primary">Dentist Diagnostic Tools</NavLink></li>
                  <li><NavLink to="/professional/services-clinics" className="hover:text-primary">Clinic Chair Scheduling</NavLink></li>
                  <li><NavLink to="/professional/services-schools" className="hover:text-primary">School Cohort Screening</NavLink></li>
                  <li><NavLink to="/professional/pathway" className="hover:text-primary">4-Stage Care Continuum</NavLink></li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-on-surface uppercase tracking-wider block mb-3">
                  Governance & Compliance
                </span>
                <ul className="space-y-2 text-on-surface-variant">
                  <li><NavLink to="/professional/verification-trust" className="hover:text-primary">Data Protection & Role Matrix</NavLink></li>
                  <li><NavLink to="/portal/privacy" className="hover:text-primary">Nigeria Data Protection Act</NavLink></li>
                  <li><NavLink to="/professional/joining-steps" className="hover:text-primary">Verification SLAs & Review</NavLink></li>
                  <li><NavLink to="/professional/who-can-join" className="hover:text-primary">Eligibility Requirements</NavLink></li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-on-surface uppercase tracking-wider block mb-3">
                  Digital Platforms
                </span>
                <ul className="space-y-2 text-on-surface-variant">
                  <li><NavLink to="/portal/hero" className="hover:text-primary">Patient Public Portal</NavLink></li>
                  <li><NavLink to="/patient-dashboard" className="hover:text-primary">Patient Passport Pass</NavLink></li>
                  <li><NavLink to="/portal/find-care" className="hover:text-primary">Verified Clinic Finder</NavLink></li>
                  <li><NavLink to="/portal/guides" className="hover:text-primary">Oral Health Education Hub</NavLink></li>
                </ul>
              </div>

              <div>
                <span className="font-bold text-on-surface uppercase tracking-wider block mb-3">
                  DHA Support Desk
                </span>
                <p className="text-on-surface-variant leading-relaxed mb-3">
                  Institutional verification desk active 24/7. Turnaround: 24–48 hours for accredited networks.
                </p>
                <div className="flex items-center gap-1.5 font-semibold text-primary">
                  <Icon name="support_agent" className="text-[16px]" />
                  <span>DHA Hotline: 0800-000-0000 (DHA)</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between text-[11px] text-on-surface-variant gap-3">
              <p>© 2025 DHA Digital Registry. All rights reserved. Government of Lagos.</p>
              <div className="flex items-center gap-4">
                <span>Terms of Service</span>
                <span>Privacy Notice</span>
                <span>Security Guidelines</span>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

export default ProfessionalShell;

