import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface TreatmentPlanShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  currentStep?: string;
  patientName?: string;
  dhaId?: string;
  planId?: string;
}

export const section13NavItems = [
  { to: '/treatment-plans/dashboard', label: 'Overview & Queue', icon: 'dashboard', code: '13.1' },
  { to: '/treatment-plans/patient-selection', label: 'Patient Select', icon: 'person_search', code: '13.2' },
  { to: '/treatment-plans/patient-overview', label: 'Patient Overview', icon: 'clinical_notes', code: '13.3' },
  { to: '/treatment-plans/create', label: 'Create Plan (Wizard)', icon: 'add_circle', code: '13.4' },
  { to: '/treatment-plans/builder', label: 'Plan Builder', icon: 'account_tree', code: '13.5' },
  { to: '/treatment-plans/phases', label: 'Phase Management', icon: 'timeline', code: '13.6' },
  { to: '/treatment-plans/item-config', label: 'Item Config', icon: 'tune', code: '13.7' },
  { to: '/treatment-plans/alternatives', label: 'Alternatives', icon: 'swap_horiz', code: '13.8' },
  { to: '/treatment-plans/priority-rationale', label: 'Priority & Rationale', icon: 'flag', code: '13.9' },
  { to: '/treatment-plans/dentist-approval', label: 'Dentist Approval', icon: 'verified_user', code: '13.10' },
  { to: '/treatment-plans/patient-preview', label: 'Patient Preview', icon: 'visibility', code: '13.11' },
  { to: '/treatment-plans/patient-decision', label: 'Patient Decision', icon: 'thumb_up', code: '13.12' },
  { to: '/treatment-plans/consent', label: 'Consent Management', icon: 'gavel', code: '13.13' },
  { to: '/treatment-plans/decision-history', label: 'Decision & Consent History', icon: 'history_edu', code: '13.14' },
  { to: '/treatment-plans/scheduling', label: 'Treatment Scheduling', icon: 'calendar_month', code: '13.15' },
  { to: '/treatment-plans/appointment-details', label: 'Appointment Details', icon: 'event_available', code: '13.16' },
  { to: '/treatment-plans/progress-workspace', label: 'Clinical Progress Workspace', icon: 'dentistry', code: '13.17' },
  { to: '/treatment-plans/record-completion', label: 'Record Completion', icon: 'verified', code: '13.18' },
  { to: '/treatment-plans/outcome-review', label: 'Treatment Review & Outcome', icon: 'rate_review', code: '13.19' },
  { to: '/treatment-plans/follow-up-management', label: 'Follow-up Management', icon: 'event_repeat', code: '13.20' },
  { to: '/treatment-plans/follow-up-details', label: 'Follow-up Details', icon: 'assignment_turned_in', code: '13.21' },
  { to: '/treatment-plans/history', label: 'Treatment Plan History', icon: 'manage_history', code: '13.22' },
  { to: '/treatment-plans/version-comparison', label: 'Plan Version Comparison', icon: 'compare_arrows', code: '13.23' },
  { to: '/treatment-plans/deferred-care', label: 'Deferred & Incomplete Care', icon: 'pending_actions', code: '13.24' },
  { to: '/treatment-plans/cost-estimate', label: 'Cost Estimate & Quotation', icon: 'request_quote', code: '13.25' },
  { to: '/treatment-plans/payment-tracking', label: 'Payment Tracking', icon: 'payments', code: '13.26' },
  { to: '/treatment-plans/procedure-catalogue', label: 'Procedure Catalogue', icon: 'menu_book', code: '13.27' },
  { to: '/treatment-plans/procedure-editor', label: 'Create/Edit Procedure', icon: 'edit_note', code: '13.28' },
  { to: '/treatment-plans/template-library', label: 'Template Library & Editor', icon: 'format_list_bulleted_add', code: '13.29' },
  { to: '/treatment-plans/analytics-dashboard', label: 'Treatment Analytics Dashboard', icon: 'analytics', code: '13.30' },
];

export function TreatmentPlanShell({
  children,
  pageTitle = 'Treatment Planning & Follow-up',
  badgeCode = 'Section 13',
  badgeLabel = 'Clinical Workflow',
  currentStep,
  patientName = 'Amara Okafor',
  dhaId = 'DHA-2026-00451',
  planId = '#TP-2026-089',
}: TreatmentPlanShellProps) {
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-sans selection:bg-[#cce5ff] selection:text-[#001d31]">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Left Brand & Title */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setNavDrawerOpen(true)}
              className="w-10 h-10 rounded-xl hover:bg-[#f2f3ff] flex items-center justify-center text-[#3f4850] transition-colors focus:outline-none focus:ring-2 focus:ring-[#006194]"
              aria-label="Open Section 13 Menu"
            >
              <Icon name="menu" className="text-[22px]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/treatment-plans/dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Icon name="dentistry" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                    DHA Clinical Care
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-[#e2e7ff] text-[#006194] text-[10px] font-semibold">
                    {badgeCode}
                  </span>
                  <span className="hidden md:inline-flex px-1.5 py-0.2 rounded bg-[#89f5e7]/40 text-[#006a61] text-[10px] font-medium">
                    {badgeLabel}
                  </span>
                </div>
                <h1 className="text-base sm:text-lg font-bold text-[#131b2e] truncate leading-tight">
                  {pageTitle}
                </h1>
              </div>
            </button>
          </div>

          {/* Center Context Pill (Desktop / Tablet) */}
          <div className="hidden md:flex items-center gap-2 bg-[#f2f3ff] px-3.5 py-1.5 rounded-full text-xs text-[#3f4850] border border-[#eaedff]">
            <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
            <span className="font-semibold text-[#131b2e]">{patientName}</span>
            <span className="text-[#707881]">({dhaId})</span>
            <span className="text-[#bfc7d2]">|</span>
            <span className="font-mono text-[11px] text-[#006194] font-medium">{planId}</span>
            {currentStep && (
              <>
                <span className="text-[#bfc7d2]">|</span>
                <span className="font-semibold text-[#006194]">{currentStep}</span>
              </>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/patient-selection')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#006194] transition-colors"
            >
              <Icon name="person_search" className="text-[16px]" />
              Switch Patient
            </button>

            <button
              type="button"
              className="w-10 h-10 rounded-xl hover:bg-[#f2f3ff] flex items-center justify-center text-[#3f4850] transition-colors relative"
              aria-label="Clinical Notifications"
            >
              <Icon name="notifications" className="text-[20px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>

            <div className="flex items-center gap-2 pl-1 border-l border-[#eaedff]">
              <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-xs shadow-xs">
                DJ
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-[#131b2e] leading-tight">Dr. Daniel James</span>
                <span className="text-[10px] text-[#707881]">#DEN-48912 • Operatory 02</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Fast Navigation Bar for Desktop / Tablet */}
        <div className="hidden lg:block bg-[#faf8ff] border-t border-[#eaedff]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 py-1.5 overflow-x-auto scrollbar-none">
              {section13NavItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-[#006194] text-white shadow-xs'
                        : 'text-[#3f4850] hover:bg-[#eaedff] hover:text-[#131b2e]'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-75">{item.code}</span>
                    <Icon name={item.icon} className="text-[15px]" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Drawer for All Section 13 Screens */}
      {navDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setNavDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col z-10 border-r border-[#eaedff]">
            {/* Drawer Header */}
            <div className="p-4 bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                  <Icon name="dentistry" className="text-[24px]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                    DHA Clinical Suite
                  </span>
                  <h2 className="text-base font-bold leading-tight">Treatment Planning Suite</h2>
                  <p className="text-[11px] text-white/80">Section 13 Clinical Workflow</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNavDrawerOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
                aria-label="Close menu"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Current Active Context */}
            <div className="p-3.5 bg-[#f2f3ff] border-b border-[#eaedff]">
              <div className="text-[11px] font-bold text-[#006194] uppercase tracking-wider mb-1">
                Active Patient File
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#131b2e]">{patientName}</div>
                  <div className="text-xs text-[#707881]">34y F • {dhaId}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#89f5e7]/40 text-[#006a61]">
                  NABIDH Verified
                </span>
              </div>
            </div>

            {/* Section 13 Screens Navigation List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] px-3 py-1">
                Section 13 Screens
              </div>
              {section13NavItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setNavDrawerOpen(false)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-[#cce5ff] text-[#001d31] font-bold'
                        : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-[#006194] text-white' : 'bg-[#eaedff] text-[#006194]'
                        }`}
                      >
                        <Icon name={item.icon} className="text-[18px]" />
                      </div>
                      <div>
                        <div className="text-sm leading-snug">{item.label}</div>
                        <div className="text-[11px] text-[#707881]">Screen {item.code}</div>
                      </div>
                    </div>
                    {isActive && <Icon name="chevron_right" className="text-[18px] text-[#006194]" />}
                  </NavLink>
                );
              })}

              {/* Related Sections Links */}
              <div className="pt-3 border-t border-[#eaedff] mt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#707881] px-3 py-1">
                  Upstream Clinical Links
                </div>
                <NavLink
                  to="/summaries/dashboard"
                  onClick={() => setNavDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#3f4850] hover:text-[#006194] hover:bg-[#f2f3ff] rounded-lg"
                >
                  <Icon name="auto_awesome" className="text-[16px] text-[#006194]" />
                  <span>Section 12: Clinical Summaries & AI</span>
                </NavLink>
                <NavLink
                  to="/odontogram/view"
                  onClick={() => setNavDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#3f4850] hover:text-[#006194] hover:bg-[#f2f3ff] rounded-lg"
                >
                  <Icon name="dentistry" className="text-[16px] text-[#006194]" />
                  <span>Section 9: Clinical Odontogram</span>
                </NavLink>
                <NavLink
                  to="/investigations/radiographs"
                  onClick={() => setNavDrawerOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-xs text-[#3f4850] hover:text-[#006194] hover:bg-[#f2f3ff] rounded-lg"
                >
                  <Icon name="radiology" className="text-[16px] text-[#006194]" />
                  <span>Section 11: Digital Radiography</span>
                </NavLink>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-3 bg-[#faf8ff] border-t border-[#eaedff] text-center text-xs text-[#707881]">
              DHA Health Informatics • Unified Clinical Architecture
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {children}
      </main>

      {/* Mobile Sticky Bottom Tab Bar */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.05)] pb-safe"
        aria-label="Section 13 Mobile Navigation"
      >
        <div className="grid grid-cols-4 h-16">
          <NavLink
            to="/treatment-plans/dashboard"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="dashboard" className="text-[20px]" />
            <span className="text-[11px]">Overview</span>
          </NavLink>

          <NavLink
            to="/treatment-plans/patient-overview"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="clinical_notes" className="text-[20px]" />
            <span className="text-[11px]">Plans</span>
          </NavLink>

          <NavLink
            to="/treatment-plans/phases"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="timeline" className="text-[20px]" />
            <span className="text-[11px]">Phases</span>
          </NavLink>

          <NavLink
            to="/treatment-plans/builder"
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-1 ${
                isActive ? 'text-[#006194] font-bold' : 'text-[#707881] hover:text-[#131b2e]'
              }`
            }
          >
            <Icon name="account_tree" className="text-[20px]" />
            <span className="text-[11px]">Builder</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
