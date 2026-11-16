import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DiscoverySubNav() {
  const navItems = [
    { to: '/patient-dashboard/discovery', label: 'Discover', icon: 'explore', end: true },
    { to: '/patient-dashboard/discovery/results', label: 'Search Results', icon: 'search' },
    { to: '/patient-dashboard/discovery/map', label: 'Interactive Map', icon: 'map' },
    // Dentist Profile & Clinic Profile are dependent pages — they open from a result card.
    { to: '/patient-dashboard/discovery/services', label: 'Services & Specialities', icon: 'medical_services' },
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

