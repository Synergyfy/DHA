import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TabKey = 'dental-care' | 'practice-management' | 'outreach' | 'accreditation';

export const ForProfessionalsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('dental-care');

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-[#eaedff] shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-10 h-10 rounded-xl bg-[#006194] flex items-center justify-center text-white shadow-sm">
              <Icon name="dentistry" className="text-[24px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] leading-tight">DHA</span>
              <span className="text-[10px] text-[#707881] uppercase tracking-wider font-semibold">Dental Health</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => navigate('/')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              About DHA
            </button>
            <button
              onClick={() => navigate('/for-professionals')}
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#cce5ff] text-[#001d31] transition-colors"
            >
              For Professionals
            </button>
            <button
              onClick={() => navigate('/oral-health-guides')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              Oral Health Guides
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/login')}
              className="text-xs font-semibold text-[#3f4850] hover:text-[#006194] px-3 py-2 transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => navigate('/join-role')}
              className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shadow-sm transition-all active:scale-[0.98]"
            >
              Join Network
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] py-16 sm:py-20 border-b border-[#eaedff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight max-w-4xl leading-tight">
              The Sovereign Digital Workspace for Nigerian Dental Professionals
            </h1>
            <p className="text-sm sm:text-base text-[#3f4850] max-w-2xl leading-relaxed">
              Connect your dental practice to Nigeria's primary oral health network. Access digital odontograms,
              interoperable treatment plans, multi-branch clinic operations, and school outreach coordination.
            </p>
            <div className="flex items-center justify-center pt-3">
              <button
                onClick={() => navigate('/join-role')}
                className="h-12 px-8 rounded-xl bg-[#006194] text-white text-sm font-semibold hover:bg-[#007bb9] shadow-sm transition-all"
              >
                Select Your Professional Role &rarr;
              </button>
            </div>
          </div>
        </section>

        {/* Section Navigation Tabs */}
        <section className="sticky top-20 z-30 bg-white/95 backdrop-blur-md border-b border-[#eaedff]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-3 no-scrollbar">
            <button
              onClick={() => setActiveTab('dental-care')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'dental-care'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="dentistry" className="text-[18px]" />
              <span>Dental Care &amp; Charting</span>
            </button>
            <button
              onClick={() => setActiveTab('practice-management')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'practice-management'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="domain" className="text-[18px]" />
              <span>Clinic &amp; Hospital Operations</span>
            </button>
            <button
              onClick={() => setActiveTab('outreach')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'outreach'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="fact_check" className="text-[18px]" />
              <span>School &amp; Outreach Screening</span>
            </button>
            <button
              onClick={() => setActiveTab('accreditation')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
                activeTab === 'accreditation'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="verified" className="text-[18px]" filled={true} />
              <span>MDCN Verification &amp; Trust</span>
            </button>
          </div>
        </section>

        {/* Dynamic Tab Content Area */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'dental-care' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">
                  Complete Clinical Suite
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Comprehensive Dental Care &amp; Interactive Odontogram
                </h2>
                <p className="text-sm text-[#3f4850] mt-2 leading-relaxed">
                  DHA brings standardized digital clinical care directly to the dental chair. Clinicians can chart
                  conditions on interactive adult (32-tooth) and pediatric (20-tooth) odontograms, plan multi-stage
                  interventions, and communicate securely with patients.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                    <Icon name="dentistry" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Precision 2D Odontograms
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Interactive tooth surfaces (Occlusal, Mesial, Distal, Buccal, Lingual) with universal restorative,
                    endodontic, periodontal, and prosthetic color coding.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                    <Icon name="assignment" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Phased Treatment Plans
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Organize care by Urgent Relief, Disease Control, Rehabilitation, and Maintenance phases with
                    transparent patient estimates and NHIA co-pay breakdowns.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#287ab3]">
                    <Icon name="qr_code_scanner" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Patient Lifecode Scanning
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Instant zero-friction lookup of a patient's historical records, past fillings, allergic alerts, and
                    prior school screening results with consent verification.
                  </p>
                </div>
              </div>

              {/* Clinical Feature Spotlight Card */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">
                    Interactive Workspace Ready
                  </span>
                  <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Try the Live Clinical Odontogram &amp; Diagnostic Suite
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Experience how effortless charting and clinical note taking can be with our production-grade
                    clinician interface.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/dentist/dashboard')}
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
                >
                  Open Clinician Workspace
                </button>
              </div>
            </div>
          )}

          {activeTab === 'practice-management' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">
                  Enterprise Operations
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Clinic &amp; Hospital Practice Administration
                </h2>
                <p className="text-sm text-[#3f4850] mt-2 leading-relaxed">
                  Manage multi-chair surgeries, branch deployments, staff rosters, and patient intake workflows from a
                  single sovereign dashboard.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                    <Icon name="calendar_month" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Chairside Scheduling &amp; Roster
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Assign operatories, dentist shifts, dental nurse rotations, and patient walk-in queues across all
                    branches seamlessly.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                    <Icon name="badge" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Staff Permissions &amp; Roles
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Granular role-based access control protecting clinical odontograms from administrative staff while
                    enabling front-desk billing and reception triage.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#287ab3]">
                    <Icon name="monitoring" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Operational Analytics
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Comprehensive reporting on chair utilization rates, appointment conversion, inventory stock levels,
                    and financial reconciliation.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Onboard Your Clinic Network Today
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Register your facility, branch locations, and clinical staff in minutes through our clinic
                    onboarding wizard.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/clinic-onboarding/intro')}
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
                >
                  Start Clinic Onboarding
                </button>
              </div>
            </div>
          )}

          {activeTab === 'outreach' && (
            <div className="space-y-12">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">
                  Field &amp; Public Health
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  School Dental Programs &amp; Community Outreach
                </h2>
                <p className="text-sm text-[#3f4850] mt-2 leading-relaxed">
                  Empower field teams and community screeners with rapid screening workflows, offline-first data capture,
                  and automated referral handoffs to licensed facilities.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                    <Icon name="groups" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Batch Student Examinations
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Screen an entire classroom in under 40 minutes with single-tap visual caries assessment, plaque
                    indices, and fluorosis scoring.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                    <Icon name="wifi_off" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Offline-First Telemetry
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Collect data in rural schools without active cellular connection. Records automatically sync to the
                    national DHA cloud when connectivity returns.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#287ab3]">
                    <Icon name="forward_to_inbox" className="text-[22px]" />
                  </div>
                  <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Parent Notification &amp; Referral
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Automated SMS and WhatsApp summaries sent to guardians with pre-linked appointment booking at the
                    nearest accredited clinic.
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 max-w-xl">
                  <h3 className="text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Equip Your Field Screening Team
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                    Join as a community screener or school dental coordinator to begin logging field assessments.
                  </p>
                </div>
                <button
                  onClick={() => navigate('/screening/dashboard')}
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shrink-0"
                >
                  Open Screener Portal
                </button>
              </div>
            </div>
          )}

          {activeTab === 'accreditation' && (
            <div className="space-y-8 max-w-4xl">
              <div className="max-w-3xl">
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">
                  Statutory Compliance
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Practitioner Accreditation &amp; MDCN Regulatory Trust
                </h2>
                <p className="text-sm text-[#3f4850] mt-2 leading-relaxed">
                  Every practitioner practicing on DHA must hold an active practicing license verified directly against
                  the Medical and Dental Council of Nigeria records.
                </p>
              </div>

              <div className="space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex items-start gap-4">
                  <Icon name="verified_user" className="text-[24px] text-[#006a61] shrink-0 mt-1" filled={true} />
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Automated MDCN Folio Check</h3>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      Instant validation of practitioner folio numbers against registered dental cadres (BDS, FWACS,
                      FMCDS) to guarantee that only authorized dentists can sign diagnostic charts.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex items-start gap-4">
                  <Icon name="lock" className="text-[24px] text-[#006194] shrink-0 mt-1" filled={true} />
                  <div>
                    <h3 className="text-sm font-bold text-[#131b2e]">Immutable Audit Ledger</h3>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      Every modification to a tooth surface, periodontal score, or prescription is sealed with the
                      practitioner's digital signature and timestamped into the ISO 27001 sovereign ledger.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Global CTA Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#006194] to-[#004b73] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans']">
                Ready to Join the Professional Network?
              </h2>
              <p className="text-sm text-white/80 max-w-xl">
                Choose your professional profile to begin the onboarding and verification process.
              </p>
            </div>
            <button
              onClick={() => navigate('/join-role')}
              className="h-12 px-8 rounded-xl bg-white text-[#006194] font-semibold text-sm hover:bg-[#f2f3ff] shadow-sm transition-all shrink-0"
            >
              Select Your Role &rarr;
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#f2f3ff] border-t border-[#eaedff] py-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#707881]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#006194] flex items-center justify-center text-white">
              <Icon name="dentistry" className="text-[14px]" />
            </div>
            <span className="font-semibold text-[#131b2e]">DHA Dental Health Authority</span>
          </div>
          <span>&copy; 2026 DHA. All rights reserved. Professional &amp; Practice Operations.</span>
        </div>
      </footer>
    </div>
  );
};
