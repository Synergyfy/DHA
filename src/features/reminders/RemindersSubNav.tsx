import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface SubNavItem {
  to: string;
  label: string;
  icon: string;
  count?: number;
}

const NAV_ITEMS: SubNavItem[] = [
  { to: '/patient-dashboard/reminders', label: 'Overview', icon: 'dashboard', count: 7 },
  { to: '/patient-dashboard/reminders/appointments', label: 'Appointments', icon: 'calendar_month', count: 2 },
  { to: '/patient-dashboard/reminders/daily-care', label: 'Daily Oral Care', icon: 'brush', count: 3 },
  { to: '/patient-dashboard/reminders/checkups', label: 'Check-ups', icon: 'stethoscope', count: 1 },
  { to: '/patient-dashboard/reminders/treatments', label: 'Pending Care', icon: 'healing', count: 2 },
  // Reminder Details is a dependent page — it opens from a reminder row, not from the sub-nav.
];

export function RemindersSubNav() {
  return (
    <div className="w-full bg-surface-container-lowest border-b border-outline-variant/30 sticky top-16 z-30 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-2.5">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/patient-dashboard/reminders'}
              className={({ isActive }) =>
                `px-3.5 py-1.5 rounded-xl font-label-md text-label-md font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`
              }
            >
              <Icon name={item.icon} className="text-[17px]" />
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span className="px-1.5 py-0.2 rounded-full font-label-code text-[10px] font-bold bg-black/15 text-inherit">
                  {item.count}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

