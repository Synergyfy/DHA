import { useState, type ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface PortalShellProps {
  children: ReactNode;
  title?: string;
  badgeText?: string;
  currentKey?: string;
  pageTitle?: string;
  showBack?: boolean;
  showFooter?: boolean;
}

const PORTAL_PAGES = [
  { to: '/portal/hero', label: '0.1 Hero & Overview', icon: 'home' },
  { to: '/portal/better-way', label: '0.2 Better Way to Manage', icon: 'hub' },
  { to: '/portal/journey', label: '0.3 Care Journey Pillars', icon: 'auto_awesome' },
  { to: '/portal/family-care', label: '0.4 Family Oral Health', icon: 'family_restroom' },
  { to: '/portal/find-care', label: '0.5 Find Dental Care', icon: 'explore' },
  { to: '/portal/partners', label: '0.6 Healthcare Community', icon: 'domain' },
  { to: '/portal/getting-started', label: '0.7 Getting Started Guide', icon: 'verified_user' },
  { to: '/portal/guides', label: '0.8 Oral Health Guides', icon: 'local_library' },
  { to: '/portal/privacy', label: '0.9 Trust & Data Privacy', icon: 'lock' },
];

export function PortalShell({
  children,
  pageTitle = 'DHA Dental Portal',
  showBack = true,
  showFooter = true,
}: PortalShellProps) {
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
      {/* Top Application Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-3">
          {/* Left: Back button & Page title */}
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

            {/* Brand Logo */}
            <NavLink
              to="/portal/hero"
              className="flex items-center gap-2.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl py-1 px-1.5"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-primary via-primary-container to-secondary-container flex items-center justify-center text-white shadow-sm">
                <Icon name="dentistry" className="text-[20px]" />
              </div>
              <div className="hidden xs:block leading-none">
                <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface tracking-tight">
                  DHA Dental
                </span>
                <span className="block text-[10px] text-on-surface-variant tracking-wider uppercase font-semibold">
                  Oral Health
                </span>
              </div>
            </NavLink>

            {/* Current screen breadcrumb pill */}
            {pageTitle && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container-high text-xs font-medium text-on-surface-variant truncate max-w-[220px]">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="truncate">{pageTitle}</span>
              </span>
            )}
          </div>

          {/* Center/Right: Quick Navigation Dropdown & Actions */}
          <div className="flex items-center gap-2">
            {/* Quick Switch Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high border border-outline-variant/30 transition-colors shadow-2xs"
                aria-expanded={navMenuOpen}
              >
                <Icon name="dashboard_customize" className="text-[16px] text-primary" />
                <span className="hidden md:inline">Portal Screens</span>
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
                    <div className="px-3 py-1.5 border-b border-outline-variant/20 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                        Public Portal Suite (Section 0)
                      </p>
                    </div>

                    <div className="max-h-[380px] overflow-y-auto px-1.5 space-y-0.5">
                      {PORTAL_PAGES.map((page) => (
                        <NavLink
                          key={page.to}
                          to={page.to}
                          onClick={() => setNavMenuOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                              isActive
                                ? 'bg-primary text-on-primary shadow-xs font-semibold'
                                : 'text-on-surface hover:bg-surface-container-high'
                            }`
                          }
                        >
                          <Icon name={page.icon} className="text-[18px] shrink-0" />
                          <span className="truncate">{page.label}</span>
                        </NavLink>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-outline-variant/20 px-3 flex items-center justify-between">
                      <NavLink
                        to="/patient-dashboard"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                      >
                        <span>Patient Dashboard</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => setNavMenuOpen(false)}
                        className="text-[11px] text-on-surface-variant hover:text-on-surface"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Share / Copy button */}
            <button
              type="button"
              onClick={handleShare}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              title="Share this page"
            >
              <Icon name={copiedShare ? 'check' : 'share'} className="text-[18px]" />
            </button>

            {/* Access Dashboard Pill */}
            <NavLink
              to="/patient-dashboard"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition-all shadow-xs"
            >
              <Icon name="person" className="text-[16px]" />
              <span>Sign In / Pass</span>
            </NavLink>
          </div>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {children}
      </main>

      {/* Shared Footer for Portal Screens */}
      {showFooter && (
        <footer className="mt-auto border-t border-outline-variant/30 bg-surface-container-lowest py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary-container text-primary flex items-center justify-center font-bold text-xs">
                DHA
              </div>
              <div className="text-xs text-on-surface-variant">
                <p className="font-semibold text-on-surface">Dubai Health Authority Digital Network</p>
                <p>Unified Oral Health Platform · NABIDH Interoperable</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-on-surface-variant">
              <NavLink to="/portal/hero" className="hover:text-primary transition-colors">Overview</NavLink>
              <NavLink to="/portal/better-way" className="hover:text-primary transition-colors">Ecosystem</NavLink>
              <NavLink to="/portal/family-care" className="hover:text-primary transition-colors">Family</NavLink>
              <NavLink to="/portal/find-care" className="hover:text-primary transition-colors">Find Care</NavLink>
              <NavLink to="/portal/guides" className="hover:text-primary transition-colors">Guides</NavLink>
              <NavLink to="/portal/privacy" className="hover:text-primary transition-colors">Privacy Policy</NavLink>
              <NavLink to="/patient-dashboard" className="text-primary font-semibold hover:underline">Patient Dashboard →</NavLink>
            </div>

            <p className="text-xs text-on-surface-variant text-center md:text-right">
              © 2025 DHA. All rights reserved. Government of Dubai.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}

export default PortalShell;
