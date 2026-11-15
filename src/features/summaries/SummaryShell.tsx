import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface SummaryShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  badgeCode?: string;
  badgeLabel?: string;
  currentStep?: string;
  patientName?: string;
  dhaId?: string;
  docId?: string;
}

const section12NavItems = [
  { to: '/summaries/dashboard', label: 'AI Dashboard', icon: 'grid_view', code: '12.1' },
  { to: '/summaries/patient-selection', label: 'Patient Select', icon: 'person_search', code: '12.2' },
  { to: '/summaries/sources', label: 'Data Sources', icon: 'dataset', code: '12.3' },
  { to: '/summaries/generate', label: 'Synthesis Config', icon: 'auto_awesome', code: '12.4' },
  { to: '/summaries/workspace', label: 'Workspace', icon: 'clinical_notes', code: '12.5' },
  { to: '/summaries/odontogram', label: 'Odontogram', icon: 'dentistry', code: '12.6' },
  { to: '/summaries/investigations', label: 'Investigations', icon: 'radiology', code: '12.7' },
  { to: '/summaries/combined-oral-health', label: 'Combined Summary', icon: 'summarize', code: '12.8' },
  { to: '/summaries/interpretation-assistance', label: 'AI Assist', icon: 'neurology', code: '12.9' },
  { to: '/summaries/image-review', label: 'AI Image Review', icon: 'photo_camera', code: '12.10' },
  { to: '/summaries/treatment-recommendations', label: 'Treatment Recs', icon: 'recommend', code: '12.11' },
  { to: '/summaries/edit-output', label: 'Edit AI Output', icon: 'edit_note', code: '12.12' },
  { to: '/summaries/patient-editor', label: 'Patient Editor', icon: 'sentiment_satisfied', code: '12.13' },
  { to: '/summaries/visual-summary', label: 'Visual Summary', icon: 'visibility', code: '12.14' },
  { to: '/summaries/review-approval', label: 'Review & Approval', icon: 'verified_user', code: '12.15' },
  { to: '/summaries/approval-confirmation', label: 'Confirmation', icon: 'check_circle', code: '12.16' },
  { to: '/summaries/history', label: 'Version History', icon: 'history_edu', code: '12.17' },
  { to: '/summaries/audit', label: 'AI Activity & Audit', icon: 'analytics', code: '12.18' },
  { to: '/summaries/templates', label: 'Template Library', icon: 'auto_stories', code: '12.19' },
  { to: '/summaries/templates/create', label: 'Template Builder', icon: 'post_add', code: '12.20' },
];

export function SummaryShell({
  children,
  pageTitle = 'Clinical Summary & AI Co-Pilot',
  badgeCode = 'Section 12',
  badgeLabel = 'AI Summary Suite',
  currentStep,
  patientName = 'Amara Okafor',
  dhaId = 'DHA-2026-00451',
  docId = 'DHA-CS-9842',
}: SummaryShellProps) {
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
              aria-label="Open Section 12 Menu"
            >
              <Icon name="menu" className="text-[22px]" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/summaries/dashboard')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#006194] to-[#007bb9] text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <Icon name="health_and_safety" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                    DHA Clinical Care
                  </span>
                  <span className="hidden sm:inline-flex px-1.5 py-0.2 rounded bg-[#e2e7ff] text-[#006194] text-[10px] font-semibold">
                    {badgeCode}
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
            <span className="font-mono text-[11px] text-[#006194] font-medium">{docId}</span>
            {currentStep && (
              <>
                <span className="text-[#bfc7d2]">|</span>
                <span className="px-2 py-0.5 rounded-full bg-[#006194] text-white text-[10px] font-bold">
                  {currentStep}
                </span>
              </>
            )}
          </div>

          {/* Right Clinician Profile & Fast Jump */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => navigate('/summaries/workspace')}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e2e7ff] text-[#006194] hover:bg-[#d2d9f4] text-xs font-semibold transition-colors"
            >
              <Icon name="clinical_notes" className="text-[16px]" />
              <span>Workspace</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/summaries/generate')}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006194] text-white hover:bg-[#007bb9] active:scale-95 text-xs font-semibold shadow-sm transition-all"
            >
              <Icon name="auto_awesome" className="text-[16px]" />
              <span className="hidden sm:inline">New AI Summary</span>
              <span className="sm:hidden">New</span>
            </button>

            <div className="w-px h-6 bg-[#bfc7d2]/40 hidden sm:block"></div>

            <div className="flex items-center gap-2 pl-1">
              <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                DJ
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-[#131b2e] leading-snug">Dr. Daniel James</span>
                <span className="text-[10px] text-[#707881] font-mono leading-none">#DEN-48912</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-navigation Desktop Ribbon */}
        <div className="hidden lg:block border-t border-[#eaedff] bg-white/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {section12NavItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#006194] text-white shadow-xs font-semibold'
                      : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name={item.icon} className="text-[16px]" />
                  <span>{item.label}</span>
                  <span className={`text-[10px] ml-0.5 opacity-75 font-mono`}>({item.code})</span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24 md:pb-12">
        {children}
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-2 py-1.5">
        <div className="flex justify-around items-center overflow-x-auto no-scrollbar">
          {section12NavItems.slice(0, 5).map((item) => {
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all shrink-0 ${
                  isActive
                    ? 'text-[#006194] font-semibold scale-105'
                    : 'text-[#707881] hover:text-[#131b2e]'
                }`}
              >
                <Icon name={item.icon} className="text-[20px]" />
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label.split(' ')[0]}</span>
              </NavLink>
            );
          })}
          <button
            type="button"
            onClick={() => setNavDrawerOpen(true)}
            className="flex flex-col items-center justify-center py-1 px-2 rounded-xl text-[#707881] hover:text-[#131b2e] shrink-0"
          >
            <Icon name="more_horiz" className="text-[20px]" />
            <span className="text-[10px] mt-0.5 tracking-tight">More</span>
          </button>
        </div>
      </nav>

      {/* Slide-out Navigation Drawer */}
      {navDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-[#131b2e]/40 backdrop-blur-xs transition-opacity"
            onClick={() => setNavDrawerOpen(false)}
          />
          <div className="relative w-full max-w-sm bg-white shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-left duration-200">
            {/* Drawer Header */}
            <div className="p-5 border-b border-[#eaedff] flex items-center justify-between bg-gradient-to-br from-[#f2f3ff] to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shadow-sm">
                  <Icon name="auto_awesome" className="text-[22px]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                    Section 12 Menu
                  </span>
                  <h2 className="text-base font-bold text-[#131b2e] leading-snug">
                    AI Clinical Summaries
                  </h2>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setNavDrawerOpen(false)}
                className="w-9 h-9 rounded-lg hover:bg-[#eaedff] flex items-center justify-center text-[#707881] transition-colors"
                aria-label="Close menu"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Quick Patient Dossier Summary */}
            <div className="p-4 bg-[#f2f3ff] border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm">
                  AO
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-[#131b2e] truncate">{patientName}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#86f2e4] text-[#006f66] font-semibold">
                      Active
                    </span>
                  </div>
                  <span className="text-xs text-[#707881] font-mono">{dhaId} • 34y Female</span>
                </div>
              </div>
            </div>

            {/* Nav Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#707881] block">
                Clinical Workflow Screens
              </span>
              {section12NavItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setNavDrawerOpen(false)}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#006194] text-white font-semibold shadow-sm'
                        : 'text-[#3f4850] hover:bg-[#f2f3ff] hover:text-[#131b2e]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} className="text-[20px]" />
                      <span>{item.label}</span>
                    </div>
                    <span className={`text-xs font-mono ${isActive ? 'text-white/80' : 'text-[#707881]'}`}>
                      {item.code}
                    </span>
                  </NavLink>
                );
              })}

              <div className="pt-4 mt-4 border-t border-[#eaedff]">
                <span className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#707881] block">
                  Connected Suites
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setNavDrawerOpen(false);
                    navigate('/investigations/dashboard');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-[#3f4850] hover:bg-[#f2f3ff] transition-all"
                >
                  <Icon name="biotech" className="text-[20px] text-[#006194]" />
                  <span>Section 11: Investigations</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setNavDrawerOpen(false);
                    navigate('/records/timeline');
                  }}
                  className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm text-[#3f4850] hover:bg-[#f2f3ff] transition-all"
                >
                  <Icon name="history_edu" className="text-[20px] text-[#006194]" />
                  <span>Section 3: Patient Records</span>
                </button>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-[#eaedff] bg-[#faf8ff] text-xs text-[#707881] flex items-center justify-between">
              <span className="font-semibold text-[#006194]">{badgeLabel}</span>
              <span className="font-mono">v2.4 Co-Pilot</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
