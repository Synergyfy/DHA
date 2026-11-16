import { useEffect, useSyncExternalStore } from 'react';
import { useNavigate } from 'react-router-dom';
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
 * Landing nav/footer links carry `data-path` attributes from the original
 * design export. The ones that exist in this app's router navigate via SPA;
 * everything else keeps its placeholder behaviour.
 */
const PATH_ROUTES: Record<string, string> = {
  home: '/',
  'about-dha': '/about',
  'for-professionals': '/for-professionals',
  'dental-care': '/for-professionals',
  'oral-health-guides': '/oral-health-guides',
  login: '/login',
  'get-started': '/onboarding/get-started',
  'for-patients': '/onboarding/get-started',
};

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
  const isDesktop = useSyncExternalStore(
    subscribeToBreakpoint,
    () => window.matchMedia(DESKTOP_QUERY).matches,
    () => true,
  );

  // Wire the landing's data-path links to real app routes (SPA navigation).
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[data-path]');
      if (!anchor) return;
      const route = PATH_ROUTES[anchor.getAttribute('data-path') ?? ''];
      if (!route) return;
      event.preventDefault();
      navigate(route);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return (
    <div
      className="landing-page bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col"
      dangerouslySetInnerHTML={{ __html: isDesktop ? landingDesktopHtml : landingMobileHtml }}
    />
  );
}
