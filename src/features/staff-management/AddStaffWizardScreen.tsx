import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const AddStaffWizardScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/directory')}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Invite Staff Wizard
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white ml-1">
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Introductory Context Banner */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-[#eaedff] relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#86f2e4]/40 text-[#006a61]">
              <Icon name="apartment" className="text-sm" />
            </span>
            <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
              Harmony Dental Group
            </span>
            <span className="w-1 h-1 rounded-full bg-[#bfc7d2]"></span>
            <span className="text-xs text-[#707881] font-medium">Gateway</span>
          </div>

          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl md:text-2xl text-[#131b2e] mb-2">
            Staff Onboarding Pathway
          </h2>
          <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed max-w-2xl">
            Select how you would like to onboard or deploy this personnel member into Harmony Dental Group's multi-branch practice network.
          </p>

          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-gradient-to-br from-[#86f2e4]/30 to-[#007bb9]/10 pointer-events-none blur-2xl"></div>
        </section>

        {/* Options Container (Cards) */}
        <div className="grid grid-cols-1 gap-5">
          {/* Option 1: Invite Existing DHA Professional */}
          <article 
            onClick={() => navigate('/staff-management/invite-existing')}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-xs border border-[#eaedff] hover:border-[#006194] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0 group-hover:scale-105 transition-transform">
                <Icon name="verified_user" className="text-2xl" />
              </div>
              <span className="bg-[#86f2e4]/40 text-[#006a61] text-[11px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wide">
                <Icon name="check_circle" className="text-xs" />
                <span>Recommended for Clinicians</span>
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e] group-hover:text-[#006194] transition-colors">
                Invite Existing DHA Professional
              </h3>
              <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
                Connect an authenticated practitioner with an established DHA LifeCode and verified MDCN clinical license. Avoids duplicate profiles and enables immediate clinical handover upon affiliation acceptance.
              </p>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2.5 mb-5 border border-[#dae2fd]/40">
              <Icon name="schedule" className="text-base text-[#006a61] shrink-0" />
              <div className="text-xs text-[#131b2e] flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[#006a61]">Estimated Setup:</span>
                <span>~2 minutes</span>
                <span className="w-1 h-1 rounded-full bg-[#bfc7d2]"></span>
                <span className="text-[#3f4850]">Zero credential paperwork needed</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-12 rounded-xl bg-[#006194] group-hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <span>Select & Search DHA Account</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </article>

          {/* Option 2: Invite New Staff Member */}
          <article 
            onClick={() => navigate('/staff-management/invite-new')}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-xs border border-[#eaedff] hover:border-[#006194] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 group-hover:scale-105 transition-transform">
                <Icon name="person_add" className="text-2xl" />
              </div>
              <span className="bg-[#eaedff] text-[#3f4850] text-[11px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wide">
                <Icon name="mark_email_read" className="text-xs" />
                <span>Direct Invitation</span>
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e] group-hover:text-[#006194] transition-colors">
                Invite New Staff Member
              </h3>
              <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
                Send an email or SMS invitation to an administrative officer, front-desk receptionist, or new clinician who has not yet registered on DHA. They will be guided to create an account and complete verification.
              </p>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2.5 mb-5 border border-[#dae2fd]/40">
              <Icon name="mail" className="text-base text-[#707881] shrink-0" />
              <div className="text-xs text-[#131b2e] flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[#131b2e]">Estimated Setup:</span>
                <span className="text-[#3f4850]">Recipient registers first before joining clinic</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-12 rounded-xl bg-[#eaedff] group-hover:bg-[#dae2fd] text-[#131b2e] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Create New Invitation</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </article>

          {/* Option 3: Deploy Existing Staff to Another Branch */}
          <article 
            onClick={() => navigate('/staff-management/directory')}
            className="bg-white rounded-2xl p-6 md:p-7 shadow-xs border border-[#eaedff] hover:border-[#287ab3] hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="w-12 h-12 rounded-2xl bg-[#cde5ff] flex items-center justify-center text-[#006195] shrink-0 group-hover:scale-105 transition-transform">
                <Icon name="hub" className="text-2xl" />
              </div>
              <span className="bg-[#cde5ff] text-[#004b74] text-[11px] font-bold px-3 py-1 rounded-full inline-flex items-center gap-1.5 uppercase tracking-wide">
                <Icon name="store" className="text-xs" />
                <span>Multi-Location</span>
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e] group-hover:text-[#006195] transition-colors">
                Deploy Existing Staff to Another Branch
              </h3>
              <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
                Add an active member of Harmony Dental Group to an additional facility (e.g. assigning a Wuse 2 dentist to cover Maitama or Gwarinpa outpatient shifts).
              </p>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2.5 mb-5 border border-[#dae2fd]/40">
              <Icon name="bolt" className="text-base text-[#006195] shrink-0" />
              <div className="text-xs text-[#131b2e] flex items-center gap-2 flex-wrap">
                <span className="font-semibold text-[#006195]">Estimated Setup:</span>
                <span className="text-[#3f4850]">Instant branch scope update</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full h-12 rounded-xl bg-[#eaedff] group-hover:bg-[#dae2fd] text-[#131b2e] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <span>Configure Branch Assignment</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </article>
        </div>

        {/* Statutory Healthcare Mandate Notice Footer */}
        <footer className="bg-[#eaedff]/60 rounded-2xl p-5 md:p-6 border border-[#dae2fd]">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="shield" className="text-lg" />
            </div>
            <div className="space-y-1">
              <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                Statutory Healthcare Mandate
              </h4>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Clinic invitations create administrative affiliations only. Dental surgeons, therapists, and hygienists must have active DHA statutory licenses verified before clinical operatory permissions become active.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};
