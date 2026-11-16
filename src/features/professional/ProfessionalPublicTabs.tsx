import { NavLink } from 'react-router-dom';

const TABS = [
  { to: '/professional/services-dentists', label: 'For Dentists' },
  { to: '/professional/services-clinics', label: 'For Clinics' },
  { to: '/professional/services-schools', label: 'For Schools & Organisations' },
  { to: '/professional/pathway', label: 'Care Pathway' },
  { to: '/professional/verification-trust', label: 'Verification & Trust' },
];

export function ProfessionalPublicTabs() {
  return (
    <nav className="sticky top-20 z-30 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 overflow-x-auto py-3">
        {TABS.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `shrink-0 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`
            }
          >
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
