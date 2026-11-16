import { Icon } from './Primitives';

export function PublicSiteFooter() {
  return (
    <footer className="w-full bg-[#f2f3ff] border-t border-[#eaedff] py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707881]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#006194] flex items-center justify-center text-white">
            <Icon name="dentistry" className="text-[14px]" />
          </div>
          <span className="font-semibold text-[#131b2e]">DHA Dental Health Authority</span>
        </div>
        <span>&copy; 2026 DHA. All rights reserved. Public Health Information.</span>
      </div>
    </footer>
  );
}
