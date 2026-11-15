import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface InvestigationShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  currentStep?: string;
  patientName?: string;
  dhaId?: string;
  orderRef?: string;
}

const section11NavItems = [
  { to: '/investigations/dashboard', label: 'Investigations Hub', icon: 'dashboard', code: '11.1' },
  { to: '/investigations/requests', label: 'Requests Worklist', icon: 'list_alt', code: '11.2' },
  { to: '/investigations/create', label: 'New Request', icon: 'add_circle', code: '11.3' },
  { to: '/investigations/confirmation', label: 'Order Pass', icon: 'qr_code_2', code: '11.7' },
  { to: '/investigations/awaiting-results', label: 'Awaiting Results', icon: 'hourglass_top', code: '11.8' },
  { to: '/investigations/upload', label: 'Upload Media', icon: 'cloud_upload', code: '11.9' },
  { to: '/investigations/upload/details', label: 'Modality Details', icon: 'tune', code: '11.10' },
  { to: '/investigations/upload/association', label: 'Tooth Association', icon: 'dataset_linked', code: '11.11' },
  { to: '/investigations/upload/review', label: 'Review & Commit', icon: 'verified_user', code: '11.12' },
  { to: '/investigations/library', label: 'Investigation Library', icon: 'folder_managed', code: '11.13' },
  { to: '/investigations/record-details', label: 'Investigation Details', icon: 'info', code: '11.14' },
  { to: '/investigations/viewer/xray', label: 'X-Ray Viewer', icon: 'radiology', code: '11.15' },
  { to: '/investigations/viewer/opg', label: 'OPG Viewer', icon: 'pan_tool', code: '11.16' },
  { to: '/investigations/viewer/cbct', label: 'CBCT 3D Viewer', icon: 'view_in_ar', code: '11.17' },
  { to: '/investigations/viewer/lab', label: 'Lab Results Viewer', icon: 'biotech', code: '11.18' },
  { to: '/investigations/viewer/photo', label: 'Photo Viewer', icon: 'photo_camera', code: '11.19' },
  { to: '/investigations/review', label: 'Clinical Review', icon: 'fact_check', code: '11.20' },
  { to: '/investigations/compare', label: 'Comparison', icon: 'compare', code: '11.21' },
  { to: '/investigations/follow-up', label: 'Follow-up Engine', icon: 'schedule_send', code: '11.22' },
  { to: '/investigations/history', label: 'History & Ledger', icon: 'history_edu', code: '11.23' },
  { to: '/investigations/reports', label: 'PDF Reports', icon: 'picture_as_pdf', code: '11.24' },
  { to: '/investigations/activity-access', label: 'Activity & Access', icon: 'history', code: '11.25' },
  { to: '/investigations/directory', label: 'Provider Directory', icon: 'badge', code: '11.26' },
  { to: '/investigations/templates', label: 'Template Library', icon: 'clinical_notes', code: '11.27' },
  { to: '/investigations/templates/create', label: 'Create Template', icon: 'add_box', code: '11.28' },
  { to: '/investigations/billing', label: 'Billing & Claims', icon: 'payments', code: '11.29' },
  { to: '/investigations/analytics', label: 'Analytics & KPIs', icon: 'insights', code: '11.30' },
  { to: '/investigations/details', label: 'Request Details', icon: 'analytics', code: '11.4' },
  { to: '/investigations/schedule', label: 'Appt Scheduling', icon: 'event_available', code: '11.5' },
  { to: '/investigations/queue', label: 'Patient Queue', icon: 'safety_check', code: '11.6' },
];

export function InvestigationShell({
  children,
  pageTitle = 'Clinical Investigations Suite',
  badgeCode,
  badgeLabel,
  currentStep,
  patientName = 'Chinedu Okafor',
  dhaId = 'DHA-10482',
  orderRef = 'REQ-2025-0914',
}: InvestigationShellProps) {
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
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="font-semibold text-primary truncate">DHA Radiology & Lab Services</span>
            <span className="text-outline hidden sm:inline">•</span>
            <span className="text-on-surface-variant hidden sm:inline truncate">Dr. Daniel James (#DEN-48912)</span>
            <span className="text-outline hidden md:inline">•</span>
            <span className="text-outline hidden md:inline truncate">DHA Central Diagnostic Dept</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <Icon name="cloud_sync" className="text-xs" />
              NABIDH LIVE / PACS Active
            </span>
          </div>
        </div>

        {/* Main Title & Action Bar */}
        <div className="px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="p-2 -ml-2 rounded-full text-on-surface-variant hover:bg-surface-container transition-colors"
              title="Go back"
              aria-label="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-on-surface truncate">
                  {pageTitle}
                </h1>
                {badgeCode && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-mono font-semibold bg-primary/10 text-primary border border-primary/20">
                    {badgeCode}
                  </span>
                )}
                {badgeLabel && (
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-secondary-container text-on-secondary-container">
                    {badgeLabel}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-on-surface-variant mt-0.5 truncate">
                <span className="font-medium text-on-surface truncate">{patientName}</span>
                <span>•</span>
                <span className="font-mono">{dhaId}</span>
                {orderRef && (
                  <>
                    <span>•</span>
                    <span className="font-mono text-tertiary font-semibold">{orderRef}</span>
                  </>
                )}
                {currentStep && (
                  <>
                    <span className="hidden sm:inline">•</span>
                    <span className="text-primary font-medium hidden sm:inline">{currentStep}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions & Menu Toggle */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/investigations/create"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary text-on-primary hover:bg-primary/95 shadow-sm transition-all"
            >
              <Icon name="add" className="text-sm" />
              <span>New Request</span>
            </NavLink>

            <NavLink
              to="/investigations/dashboard"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <Icon name="dashboard" className="text-sm text-outline" />
              <span>Hub</span>
            </NavLink>

            {/* Jump Menu Trigger */}
            <button
              type="button"
              onClick={() => setNavMenuOpen(!navMenuOpen)}
              className="p-2 rounded-lg border border-outline-variant/40 bg-surface text-on-surface hover:bg-surface-container transition-colors flex items-center gap-1.5 text-xs font-medium"
              aria-label="Navigation Menu"
            >
              <Icon name={navMenuOpen ? 'close' : 'menu'} className="text-lg text-primary" />
              <span className="hidden sm:inline">Section 11 Suite</span>
              <Icon name="expand_more" className={`text-sm text-outline transition-transform ${navMenuOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Desktop Quick Horizontal Tab Strip */}
        <div className="hidden md:flex items-center px-4 sm:px-6 lg:px-8 border-t border-outline-variant/20 overflow-x-auto no-scrollbar gap-1 py-1 bg-surface-container-lowest/70">
          {section11NavItems.map((item) => {
            const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 ${
                  isActive
                    ? 'bg-primary/10 text-primary font-semibold shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                <Icon name={item.icon} className={`text-sm ${isActive ? 'text-primary' : 'text-outline'}`} />
                <span>{item.label}</span>
                <span className="text-[10px] opacity-60 font-mono">({item.code})</span>
              </NavLink>
            );
          })}
        </div>

        {/* Dropdown Menu Modal */}
        {navMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-2xl border-b border-outline-variant/40 shadow-xl p-4 sm:p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30 mb-4">
                <div>
                  <h3 className="font-semibold text-sm text-on-surface">Clinical Investigations & Radiology Workflow</h3>
                  <p className="text-xs text-on-surface-variant">Switch between Section 11 screens, orders, and triage queue</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNavMenuOpen(false)}
                  className="p-1.5 rounded-md text-outline hover:text-on-surface hover:bg-surface-container"
                >
                  <Icon name="close" className="text-base" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                {section11NavItems.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      onClick={() => setNavMenuOpen(false)}
                      className={`flex flex-col p-2.5 rounded-lg border text-left transition-all ${
                        isActive
                          ? 'border-primary bg-primary/5 text-primary shadow-xs'
                          : 'border-outline-variant/30 bg-surface hover:border-outline-variant hover:bg-surface-container-low'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <Icon name={item.icon} className={`text-base ${isActive ? 'text-primary' : 'text-outline'}`} />
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface-container text-outline font-semibold">
                          {item.code}
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-on-surface line-clamp-1">{item.label}</span>
                    </NavLink>
                  );
                })}
              </div>

              {/* Quick links to examination or records */}
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex flex-wrap items-center justify-between gap-2 text-xs text-on-surface-variant">
                <span className="flex items-center gap-1.5">
                  <Icon name="sync_alt" className="text-sm text-primary" />
                  Inter-Module Navigation:
                </span>
                <div className="flex items-center gap-3">
                  <NavLink to="/examination/workspace" className="hover:text-primary underline">
                    10.4 Clinical Examination
                  </NavLink>
                  <NavLink to="/records" className="hover:text-primary underline">
                    Patient Records
                  </NavLink>
                  <NavLink to="/imaging" className="hover:text-primary underline">
                    Imaging & PACS
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-16 md:pb-8">
        {children}
      </main>

      {/* Mobile Sticky Bottom Navigation Strip */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-outline-variant/30 px-2 py-1 flex items-center justify-around shadow-lg">
        {section11NavItems.slice(0, 5).map((item) => {
          const isActive = location.pathname === item.to || location.pathname.startsWith(item.to + '/');
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center py-1 px-2 rounded-lg transition-colors ${
                isActive ? 'text-primary font-bold' : 'text-outline hover:text-on-surface'
              }`}
            >
              <Icon name={item.icon} className={`text-xl ${isActive ? 'text-primary' : 'text-outline'}`} />
              <span className="text-[10px] mt-0.5">{item.label.split(' ')[0]}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

