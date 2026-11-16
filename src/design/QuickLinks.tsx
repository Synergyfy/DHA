import { NavLink } from 'react-router-dom';
import { Icon } from './Primitives';

interface QuickLink {
  to: string;
  label: string;
  icon: string;
}

interface QuickLinksProps {
  title: string;
  links: QuickLink[];
}

/**
 * Nested-page entry points (DHA guide Rule 2 / Rule 6):
 * dependent pages are opened from inside their parent feature via these buttons,
 * never from the primary sidebar.
 */
export function QuickLinks({ title, links }: QuickLinksProps) {
  if (links.length === 0) return null;
  return (
    <div className="mt-6 bg-white rounded-3xl border border-[#eaedff] p-5 shadow-sm space-y-3">
      <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
        <Icon name="arrow_forward" className="text-[18px] text-[#006194]" />
        <span>{title}</span>
      </h3>
      <div className="flex flex-wrap gap-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#006194] text-xs font-bold transition-colors"
          >
            <Icon name={link.icon} className="text-[15px]" />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
