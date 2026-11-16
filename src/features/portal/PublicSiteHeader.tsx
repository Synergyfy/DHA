import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { useAuthStore } from '../../store/authStore';

/**
 * The shared public-site header.
 *
 * Every page a visitor can reach from the landing page (About DHA, For
 * Professionals, Oral Health Guides, guide detail, public provider profiles,
 * the DHA portal suite and the professional suite) renders this exact header
 * so the four primary tabs — Home / About DHA / For Professionals / Oral
 * Health Guides — never change as the user moves around.
 */

interface HeaderTab {
  label: string;
  path: string;
  /** Returns true when this tab should render as the active one. */
  isActive: (pathname: string) => boolean;
}

const TABS: HeaderTab[] = [
  { label: 'Home', path: '/', isActive: (p) => p === '/' },
  {
    label: 'About DHA',
    path: '/about',
    isActive: (p) => p === '/about' || p === '/about-dha' || p.startsWith('/about/'),
  },
  {
    label: 'For Professionals',
    path: '/for-professionals',
    isActive: (p) =>
      p === '/for-professionals' ||
      p.startsWith('/for-professionals/') ||
      p === '/professional' ||
      p.startsWith('/professional/'),
  },
  {
    label: 'Oral Health Guides',
    path: '/oral-health-guides',
    isActive: (p) =>
      p === '/oral-health-guides' ||
      p.startsWith('/oral-health-guides/') ||
      p === '/portal/guides' ||
      p.startsWith('/portal/guides/'),
  },
];

const INACTIVE_TAB_CLASS =
  'px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors';
const ACTIVE_TAB_CLASS =
  'px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#cce5ff] text-[#001d31] transition-colors';

export const PublicSiteHeader: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  const signOut = useAuthStore((state) => state.signOut);

  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement | null>(null);

  // Close the avatar dropdown on outside click / route change.
  useEffect(() => {
    setAvatarOpen(false);
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!avatarOpen) return;
    const onDocClick = (event: MouseEvent) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target as Node)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [avatarOpen]);

  const go = (path: string) => {
    setMenuOpen(false);
    setAvatarOpen(false);
    navigate(path);
  };

  const renderTabs = (className: string, tabClassName: string) => (
    <nav className={className}>
      {TABS.map((tab) => {
        const active = tab.isActive(location.pathname);
        return (
          <button
            key={tab.label}
            type="button"
            aria-current={active ? 'page' : undefined}
            onClick={() => go(tab.path)}
            className={active ? `${ACTIVE_TAB_CLASS} ${tabClassName}` : `${INACTIVE_TAB_CLASS} ${tabClassName}`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );

  const signedOutActions = (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => go('/login')}
        className="text-xs font-semibold text-[#3f4850] hover:text-[#006194] px-3 py-2 transition-colors"
      >
        Log In
      </button>
      <button
        type="button"
        onClick={() => go('/onboarding/get-started')}
        className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shadow-sm transition-all active:scale-[0.98]"
      >
        Get Started
      </button>
    </div>
  );

  const signedInActions = (
    <div className="relative flex items-center" ref={avatarRef}>
      <button
        type="button"
        aria-label="Open account menu"
        aria-expanded={avatarOpen}
        onClick={() => setAvatarOpen((open) => !open)}
        className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center text-xs font-bold shadow-sm hover:bg-[#007bb9] transition-colors"
      >
        {user?.initials ?? 'AO'}
      </button>
      {avatarOpen && (
        <div className="absolute right-0 top-full mt-2 w-60 rounded-2xl bg-white border border-[#eaedff] shadow-[0_16px_32px_rgba(0,0,0,0.14)] p-2 z-50 flex flex-col">
          <div className="px-3 py-2">
            <div className="text-xs font-semibold text-[#131b2e] truncate">{user?.name ?? 'Amara Okafor'}</div>
            <div className="text-[11px] text-[#707881]">{user?.role ?? 'Patient account'}</div>
          </div>
          <div className="border-t border-[#eaedff] my-1" />
          <button
            type="button"
            onClick={() => go('/patient-dashboard')}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors text-left"
          >
            <Icon name="dashboard" className="text-[18px]" />
            My Dashboard
          </button>
          <button
            type="button"
            onClick={() => {
              signOut();
              setAvatarOpen(false);
              navigate('/');
            }}
            className="w-full flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#b3261e] hover:bg-[#fdecea] transition-colors text-left"
          >
            <Icon name="logout" className="text-[18px]" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => go('/')}
          className="flex items-center gap-3 cursor-pointer shrink-0"
          aria-label="Go to the DHA home page"
        >
          <div className="w-10 h-10 rounded-xl bg-[#006194] flex items-center justify-center text-white shadow-sm">
            <Icon name="dentistry" className="text-[24px]" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-tight">DHA</span>
            <span className="text-[10px] text-[#707881] uppercase tracking-wider font-semibold">Dental Health</span>
          </div>
        </button>

        {renderTabs('hidden md:flex items-center gap-1 lg:gap-2', '')}

        <div className="hidden md:flex items-center gap-3">{user ? signedInActions : signedOutActions}</div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-[#131b2e] hover:bg-[#f2f3ff] transition-colors shrink-0"
        >
          <Icon name={menuOpen ? 'close' : 'menu'} className="text-[24px]" />
        </button>
      </div>

      {/* Mobile menu panel */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#eaedff] bg-white px-4 py-4 flex flex-col gap-1">
          {TABS.map((tab) => {
            const active = tab.isActive(location.pathname);
            return (
              <button
                key={tab.label}
                type="button"
                aria-current={active ? 'page' : undefined}
                onClick={() => go(tab.path)}
                className={
                  active
                    ? 'text-left px-3 py-3 rounded-xl text-sm font-semibold bg-[#cce5ff] text-[#001d31] transition-colors'
                    : 'text-left px-3 py-3 rounded-xl text-sm font-semibold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors'
                }
              >
                {tab.label}
              </button>
            );
          })}

          <div className="border-t border-[#eaedff] my-2" />

          {user ? (
            <div className="flex flex-col gap-1">
              <div className="px-3 py-1">
                <div className="text-sm font-semibold text-[#131b2e]">{user.name}</div>
                <div className="text-[11px] text-[#707881]">{user.role}</div>
              </div>
              <button
                type="button"
                onClick={() => go('/patient-dashboard')}
                className="text-left px-3 py-3 rounded-xl text-sm font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              >
                My Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                  navigate('/');
                }}
                className="text-left px-3 py-3 rounded-xl text-sm font-semibold text-[#b3261e] hover:bg-[#fdecea] transition-colors"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => go('/login')}
                className="h-11 rounded-xl border border-[#eaedff] text-sm font-semibold text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
              >
                Log In
              </button>
              <button
                type="button"
                onClick={() => go('/onboarding/get-started')}
                className="h-11 rounded-xl bg-[#006194] text-white text-sm font-semibold hover:bg-[#007bb9] transition-colors"
              >
                Get Started
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
