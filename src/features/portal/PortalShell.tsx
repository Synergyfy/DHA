import type { ReactNode } from 'react';
import { PublicSiteHeader } from './PublicSiteHeader';
import { PublicSiteFooter } from '../../design/PublicSiteFooter';

interface PortalShellProps {
  children: ReactNode;
  title?: string;
  badgeText?: string;
  currentKey?: string;
  pageTitle?: string;
  showBack?: boolean;
  showFooter?: boolean;
}

export function PortalShell({
  children,
  showFooter = true,
}: PortalShellProps) {
  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <PublicSiteHeader />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
        {children}
      </main>

      {showFooter && <PublicSiteFooter />}
    </div>
  );
}

export default PortalShell;
