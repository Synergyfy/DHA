import { useEffect, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { PublicSiteFooter } from '../../design/PublicSiteFooter';
import { landingDesktopHtml } from './landingDesktopHtml';
import { landingMobileHtml } from './landingMobileHtml';

/**
 * Viewport width at which the desktop landing layout replaces the phone
 * layout. The desktop design is built with `md:`/`lg:` responsive grids, so
 * tablets and up get it; the mobile design has no responsive breakpoints and
 * is kept below `md`.
 */
const DESKTOP_QUERY = '(min-width: 768px)';

/**
 * Every clickable element on the landing page (header, hero, section CTAs,
 * provider cards, footer and the mobile slide-down menu) carries a `data-path`
 * attribute from the original design export. Those keys are resolved to real
 * app routes here so no control is left pointing at a bare `#`.
 */
const PATH_ROUTES: Record<string, string> = {
  // Primary navigation
  home: '/',
  'about-dha': '/about',
  'for-professionals': '/for-professionals',
  'oral-health-guides': '/oral-health-guides',
  'dental-care': '/portal/better-way',
  login: '/login',
  'clinician-login': '/login',
  'get-started': '/onboarding/get-started',
  register: '/register',
  'explore-portal': '/portal',

  // Care discovery (dentists, clinics, maps, services) — public directory,
  // never the signed-in patient dashboard.
  'find-care': '/portal/find-care',
  'nearby-care': '/portal/find-care',
  'search-results': '/portal/find-care',
  services: '/portal/find-care',
  // Public provider profiles — anyone can open these without a dashboard session.
  'dentist-profile': '/find-care/dentist-profile',
  'clinic-profile': '/find-care/clinic-profile',
  appointments: '/portal/find-care',
  'book-slot': '/portal/find-care',

  // Per-guide deep links (landing "Read Guide" cards)
  'guide-brushing': '/oral-health-guides/guide-1',
  'guide-children': '/oral-health-guides/guide-3',
  'guide-checkups': '/oral-health-guides/guide-6',

  // "Part of the Dental Healthcare Community?" cards
  'community-dentists': '/professional/services-dentists',
  'community-clinics': '/professional/services-clinics',
  'community-schools': '/professional/services-schools',

  // Joining the network
  'clinic-access': '/clinic-onboarding/entry',
  'clinic-registration': '/clinic-onboarding/entry',
  'organisation-access': '/professional/services-schools',
  'school-programs': '/professional/services-schools',

  // Patient records, reminders & family hub
  'patient-portal': '/portal',
  'dental-records': '/portal/better-way',
  'verified-records': '/portal/better-way',
  'care-timeline': '/portal/journey',
  'family-reminders': '/portal/family-care',
  'family-profiles': '/portal/family-care',

  // Footer / governance
  'Nigeria Health Information Exchange-integration': '/portal/partners',
  'licensing-verification': '/professional/verification-trust',
  'clinical-research': '/oral-health-guides',
  'privacy-policy': '/portal/privacy',
  'terms-of-service': '/portal/privacy',
  accessibility: '/about',
};

/** The slide-down menu shared by the phone and desktop headers. */
function getLandingMenu() {
  return document.querySelector<HTMLElement>('[data-landing-menu]');
}

/** Opens/closes the header menu and keeps every hamburger button in sync. */
function setMenuOpen(open: boolean) {
  const menu = getLandingMenu();
  if (menu) menu.style.display = open ? 'flex' : 'none';

  document.querySelectorAll<HTMLElement>('[data-menu-toggle]').forEach((toggle) => {
    toggle.setAttribute('aria-expanded', String(open));
    const icon = toggle.querySelector('.material-symbols-outlined');
    if (icon) icon.textContent = open ? 'close' : 'menu';
  });
}

/** The signed-in account dropdown attached to the header avatar. */
function getAvatarMenu() {
  return document.querySelector<HTMLElement>('[data-avatar-menu]');
}

function setAvatarMenuOpen(open: boolean) {
  const menu = getAvatarMenu();
  if (menu) menu.style.display = open ? 'flex' : 'none';

  document.querySelectorAll<HTMLElement>('[data-avatar-toggle]').forEach((toggle) => {
    toggle.setAttribute('aria-expanded', String(open));
  });
}

function subscribeToBreakpoint(onChange: () => void) {
  const mediaQuery = window.matchMedia(DESKTOP_QUERY);
  mediaQuery.addEventListener('change', onChange);
  return () => mediaQuery.removeEventListener('change', onChange);
}

/**
 * Home page — Route: `/`.
 *
 * One responsive URL serving both localized Nigeria landing designs:
 * the desktop layout at viewport widths >= 768px and the mobile layout
 * below that. Only the active variant is in the DOM at any time.
 */
export function LandingPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isDesktop = useSyncExternalStore(
    subscribeToBreakpoint,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );

  // Wire the landing's controls: hamburger toggle, data-path links (SPA
  // navigation) and in-page `#section` anchors (smooth scroll).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (!target || typeof target.closest !== 'function') return;

      // Hamburger / menu toggle (mobile menu + desktop menu below `xl`).
      const toggle = target.closest('[data-menu-toggle]');
      if (toggle) {
        event.preventDefault();
        setMenuOpen(toggle.getAttribute('aria-expanded') !== 'true');
        return;
      }

      // Account avatar dropdown (visible only when signed in).
      if (target.closest('[data-sign-out]')) {
        event.preventDefault();
        setAvatarMenuOpen(false);
        useAuthStore.getState().signOut();
        return;
      }
      if (target.closest('[data-avatar-toggle]')) {
        event.preventDefault();
        const avatarMenu = getAvatarMenu();
        setAvatarMenuOpen(avatarMenu?.style.display !== 'flex');
        return;
      }
      const openAvatarMenu = getAvatarMenu();
      if (openAvatarMenu?.style.display === 'flex' && !target.closest('[data-auth-actions]')) {
        setAvatarMenuOpen(false);
      }

      const menu = getLandingMenu();
      if (menu?.style.display === 'flex' && !target.closest('[data-landing-menu]')) {
        setMenuOpen(false);
      }

      const anchor = target.closest('a, button[data-path]');
      if (!anchor) return;

      // In-page anchors such as `#how-it-works` / `#manage-section`.
      const href = anchor.getAttribute('href');
      if (anchor.tagName === 'A' && href && href.length > 1 && href.startsWith('#')) {
        event.preventDefault();
        document.getElementById(href.slice(1))?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        setMenuOpen(false);
        return;
      }

      const pathKey = anchor.getAttribute('data-path') ?? '';
      const route =
        pathKey === 'patient-portal' && target.closest('[data-avatar-menu]')
          ? '/patient-dashboard'
          : PATH_ROUTES[pathKey];
      if (!route) return;
      event.preventDefault();
      setMenuOpen(false);
      setAvatarMenuOpen(false);
      // Optional record id appended to the base route, e.g. the landing's
      // per-provider profile links (`data-param="nnamdi-obi"`).
      const param = anchor.getAttribute('data-param');
      navigate(param ? `${route}/${encodeURIComponent(param)}` : route);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        setAvatarMenuOpen(false);
      }
    };

    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [navigate]);

  // The markup is re-created whenever the breakpoint flips, so the menu
  // always starts closed for the freshly injected variant.
  useEffect(() => {
    setMenuOpen(false);
  }, [isDesktop]);

  // Auth-aware header: signed out shows Get Started + Log In, signed in swaps
  // them for the account avatar (with its dropdown / sign-out).
  useEffect(() => {
    setAvatarMenuOpen(false);

    document.querySelectorAll<HTMLElement>('[data-auth-signed-out]').forEach((el) => {
      el.style.display = user ? 'none' : '';
    });
    document.querySelectorAll<HTMLElement>('[data-auth-signed-in]').forEach((el) => {
      el.style.display = user ? 'flex' : 'none';
    });

    if (user) {
      document.querySelectorAll('[data-avatar-initials]').forEach((el) => {
        el.textContent = user.initials;
      });
      document.querySelectorAll('[data-avatar-name]').forEach((el) => {
        el.textContent = user.name;
      });
      document.querySelectorAll('[data-avatar-role]').forEach((el) => {
        el.textContent = user.role;
      });
    }
  }, [user, isDesktop]);

  // The hamburger is hidden once the inline nav fits (`xl`), so drop the open
  // menu rather than leaving it stranded with no toggle to close it.
  useEffect(() => {
    const inlineNav = window.matchMedia('(min-width: 1280px)');
    const onChange = () => {
      if (inlineNav.matches) setMenuOpen(false);
    };
    inlineNav.addEventListener('change', onChange);
    return () => inlineNav.removeEventListener('change', onChange);
  }, []);

  const landingMarkup = (isDesktop ? landingDesktopHtml : landingMobileHtml).replace(
    /<footer[\s\S]*?<\/footer>/i,
    '',
  );

  return (
    <div
      className="landing-page bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col"
    >
      <div dangerouslySetInnerHTML={{ __html: landingMarkup }} />
      <PublicSiteFooter />
    </div>
  );
}
