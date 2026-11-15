import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function EducationSubNav() {
  const navItems = [
    { to: '/patient-dashboard/education', label: 'Education Hub', icon: 'school', end: true },
    { to: '/patient-dashboard/education/topics', label: 'Topics & Guides', icon: 'menu_book' },
    { to: '/patient-dashboard/education/videos', label: 'Video Library', icon: 'smart_display' },
    { to: '/patient-dashboard/education/daily-care', label: 'Daily Care', icon: 'routine' },
    { to: '/patient-dashboard/education/kids', label: "Kids' Quest", icon: 'child_care' },
    { to: '/patient-dashboard/education/saved', label: 'Saved & Progress', icon: 'bookmarks' },
  ];

  return (
    <div className="w-full bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/30 sticky top-16 z-30 shadow-[0_1px_4px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 no-scrollbar scroll-smooth">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3 py-1.5 rounded-xl text-label-md sm:text-title-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low'
                }`
              }
            >
              <Icon name={item.icon} className="text-[17px]" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

