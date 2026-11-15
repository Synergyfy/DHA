import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ExaminationShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  currentStep?: string;
  patientName?: string;
  dhaId?: string;
  ageGender?: string;
}

const section10NavItems = [
  { to: '/examination/confirmation', label: 'Patient Confirm', icon: 'person_search', code: '10.2' },
  { to: '/examination/templates', label: 'Template Matrix', icon: 'rule_folder', code: '10.3' },
  { to: '/examination/workspace', label: 'Workspace Overview', icon: 'dashboard_customize', code: '10.4' },
  { to: '/examination/history-complaint', label: 'History & Complaint', icon: 'clinical_notes', code: '10.5' },
  { to: '/examination/extraoral', label: 'Extraoral Exam', icon: 'face', code: '10.6' },
  { to: '/examination/soft-tissue', label: 'Soft Tissue Exam', icon: 'dentistry', code: '10.7' },
  { to: '/examination/periodontal', label: 'Periodontal Exam', icon: 'straighten', code: '10.8' },
  { to: '/examination/occlusion', label: 'Occlusion & TMJ', icon: 'sync_alt', code: '10.9' },
  { to: '/examination/odontogram-integration', label: 'Odontogram', icon: 'grid_view', code: '10.10' },
  { to: '/examination/investigations', label: 'Investigations', icon: 'radiology', code: '10.11' },
  { to: '/examination/assessment', label: 'Assessment & Dx', icon: 'assignment_turned_in', code: '10.12' },
  { to: '/examination/attachments', label: 'Dossier Files', icon: 'attach_file', code: '10.13' },
  { to: '/examination/review', label: 'Review & Validate', icon: 'verified', code: '10.14' },
  { to: '/examination/patient-summary', label: 'Patient Summary', icon: 'preview', code: '10.17' },
  { to: '/examination/history', label: 'Exam History', icon: 'history', code: '10.18' },
  { to: '/examination/amendment', label: 'Addendum Amendment', icon: 'security_update_good', code: '10.19' },
  { to: '/examination/recommendations', label: 'Follow-up Recs', icon: 'playlist_add_check', code: '10.20' },
  { to: '/examination/templates/library', label: 'Template Library', icon: 'library_books', code: '10.21' },
  { to: '/examination/templates/create', label: 'Create Template', icon: 'edit_note', code: '10.22' },
  { to: '/examination/templates/preview', label: 'Template Preview', icon: 'visibility', code: '10.23' },
  { to: '/examination/templates/permissions', label: 'Template Access', icon: 'admin_panel_settings', code: '10.24' },
];

export function ExaminationShell({
  children,
  pageTitle = 'Clinical Examination',
  badgeCode,
  badgeLabel,
  currentStep,
  patientName = 'Chinedu Okafor',
  dhaId = 'DHA-10482',
  ageGender = '34y • Male',
}: ExaminationShellProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      {/* Top Application Header */}
      <header className="sticky top-0 w-full z-50 bg-surface/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        {/* Clinician Operator Credentials Bar */}
        <div className="bg-surface-container-low px-4 sm:px-6 lg:px-8 py-2 border-b border-outline-variant/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse shrink-0" />
            <span className="font-semibold text-on-surface truncate">
              Dr. Daniel James
            </span>
            <span className="text-on-surface-variant font-mono text-[11px] hidden sm:inline">
              (#DEN-48912)
            </span>
            <span className="px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase tracking-wider hidden xs:inline">
              LIVE CLINICAL
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-mono text-[10px] font-bold">
              <Icon name="verified" className="text-[13px] text-secondary" />
              <span>DHA Sec 10 Clinical Protocol</span>
            </span>
            {badgeCode && (
              <span className="font-mono text-[11px] font-bold bg-surface-container px-2 py-0.5 rounded text-primary">
                {badgeCode}
              </span>
            )}
          </div>
        </div>

        {/* Patient Identity Quick Bar */}
        <div className="bg-surface-container-lowest px-4 sm:px-6 lg:px-8 py-2 border-b border-outline-variant/20 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-surface-variant text-primary font-bold flex items-center justify-center shrink-0">
              CO
            </div>
            <div className="flex items-center gap-2 min-w-0 flex-wrap">
              <span className="font-title-sm text-xs font-bold text-on-surface truncate">
                {patientName}
              </span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container text-primary font-mono text-[11px] font-bold">
                {dhaId}
              </span>
              <span className="text-on-surface-variant text-[11px] hidden sm:inline">
                {ageGender}
              </span>
              <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-secondary font-medium">
                <Icon name="location_on" className="text-[12px]" />
                <span>Central Branch</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Quick Section Jump Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNavMenuOpen(!navMenuOpen)}
                className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-1.5 transition-colors border border-outline-variant/30"
              >
                <Icon name="swap_horiz" className="text-sm text-primary" />
                <span className="hidden sm:inline">Section 10 Modules</span>
                <span className="sm:hidden">Jump</span>
                <Icon name="expand_more" className={`text-xs transition-transform ${navMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {navMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-xl py-2 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant border-b border-outline-variant/20 mb-1">
                    Section 10 Clinical Examination
                  </div>
                  {section10NavItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setNavMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary font-bold'
                            : 'text-on-surface hover:bg-surface-container-low'
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={item.icon} className="text-base" />
                        <span>{item.label}</span>
                      </div>
                      <span className="font-mono text-[10px] opacity-70">{item.code}</span>
                    </NavLink>
                  ))}
                  <div className="border-t border-outline-variant/20 my-1 pt-1">
                    <NavLink
                      to="/odontogram/overview"
                      onClick={() => setNavMenuOpen(false)}
                      className="flex items-center justify-between px-3 py-2 text-xs text-primary font-semibold hover:bg-primary/5"
                    >
                      <div className="flex items-center gap-2">
                        <Icon name="open_in_new" className="text-base" />
                        <span>Open Section 9 Odontogram</span>
                      </div>
                      <span className="font-mono text-[10px]">Sec 9</span>
                    </NavLink>
                  </div>
                </div>
              )}
            </div>

            <NavLink
              to="/odontogram/overview"
              className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-container text-on-primary-container text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <Icon name="dentistry" className="text-[14px]" />
              <span>Odontogram</span>
            </NavLink>
          </div>
        </div>

        {/* Main Header Row with Title */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Back"
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface transition-colors shrink-0"
            >
              <Icon name="arrow_back_ios_new" className="text-[16px]" />
            </button>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-bold text-on-surface truncate">
                  {pageTitle}
                </h1>
                {badgeLabel && (
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                    {badgeLabel}
                  </span>
                )}
              </div>
              {currentStep && (
                <span className="text-[11px] text-on-surface-variant font-medium">
                  {currentStep}
                </span>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <NavLink
              to="/examination/workspace"
              className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            >
              <Icon name="dashboard" className="text-sm text-primary" />
              <span className="hidden sm:inline">Workspace</span>
            </NavLink>
          </div>
        </div>

        {/* Desktop Horizontal Category Navigation Strip */}
        <div className="hidden md:block bg-surface-container-low/60 border-t border-outline-variant/20 px-4 sm:px-6 lg:px-8 py-1.5 overflow-x-auto">
          <div className="max-w-7xl mx-auto flex items-center gap-1 text-xs whitespace-nowrap">
            {section10NavItems.map((item) => {
              const isActive = location.pathname.startsWith(item.to);
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`px-3 py-1 rounded-lg font-semibold flex items-center gap-1.5 transition-all ${
                    isActive
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <Icon name={item.icon} className="text-sm" />
                  <span>{item.label}</span>
                  <span className={`text-[10px] px-1 rounded font-mono ${isActive ? 'bg-white/20' : 'bg-surface-container-high'}`}>
                    {item.code}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 md:pb-12">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 w-full z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2 py-1">
        <div className="flex items-center justify-around text-center">
          <NavLink
            to="/examination/confirmation"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="person" className="text-[20px]" />
            <span className="truncate">Confirm</span>
          </NavLink>
          <NavLink
            to="/examination/workspace"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="dashboard" className="text-[20px]" />
            <span className="truncate">Workspace</span>
          </NavLink>
          <NavLink
            to="/examination/history-complaint"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="clinical_notes" className="text-[20px]" />
            <span className="truncate">Complaint</span>
          </NavLink>
          <NavLink
            to="/examination/soft-tissue"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="dentistry" className="text-[20px]" />
            <span className="truncate">Soft Tissue</span>
          </NavLink>
          <NavLink
            to="/examination/periodontal"
            className={({ isActive }) =>
              `flex flex-col items-center py-1 px-2 rounded-lg text-[10px] font-semibold transition-colors ${
                isActive ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            <Icon name="straighten" className="text-[20px]" />
            <span className="truncate">Perio</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
export default ExaminationShell;

