import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const AboutDHAScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Top Navigation Bar */}
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
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#cce5ff] text-[#001d31] transition-colors"
            >
              About DHA
            </button>
            <button
              onClick={() => navigate('/for-professionals')}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
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
              onClick={() => navigate('/onboarding/get-started')}
              className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] shadow-sm transition-all active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#f2f3ff] to-[#faf8ff] py-16 sm:py-24 border-b border-[#eaedff]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-4">
            <h1 className="text-3xl sm:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight max-w-4xl leading-tight">
              Advancing Oral Health Agency &amp; Clinical Excellence Across Nigeria
            </h1>
            <p className="text-sm sm:text-base text-[#3f4850] max-w-2xl leading-relaxed mt-2">
              The Dental Health Authority (DHA) provides a secure, unified digital ecosystem bridging verified
              diagnostics, lifelong patient Lifecodes, and accredited healthcare providers nationwide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
              <button
                onClick={() => navigate('/for-professionals')}
                className="h-12 px-6 rounded-xl bg-[#006194] text-white text-sm font-semibold hover:bg-[#007bb9] shadow-sm transition-all"
              >
                Explore Professional Platform
              </button>
              <button
                onClick={() => navigate('/oral-health-guides')}
                className="h-12 px-6 rounded-xl bg-white border border-[#eaedff] text-[#131b2e] text-sm font-semibold hover:bg-[#f2f3ff] transition-all"
              >
                Read Oral Health Guides
              </button>
            </div>
          </div>
        </section>

        {/* Mission & Vision Pillars */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">Guiding Principles</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
              Engineered for Public Health and Clinical Trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="verified_user" className="text-[24px]" filled={true} />
              </div>
              <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Clinical Data Sovereignty</h3>
              <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                Patients maintain complete ownership over their digital Lifecode and odontograms. Sensitive dental
                records are strictly masked and only revealed through explicit consent.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                <Icon name="groups" className="text-[24px]" />
              </div>
              <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Universal Preventive Access</h3>
              <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                From mobile school vans in suburban Abuja to major state teaching hospitals, our standardized screening
                framework enables early intervention before caries advance to tooth loss.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#287ab3]">
                <Icon name="hub" className="text-[24px]" />
              </div>
              <h3 className="text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Interoperable Practice Ecosystem</h3>
              <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                Seamless synchronization between independent practitioners, multi-branch clinics, insurance providers
                (NHIA), and statutory registries (MDCN).
              </p>
            </div>
          </div>
        </section>

        {/* Regulatory Governance & Compliance */}
        <section className="bg-white border-y border-[#eaedff] py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">
                  Governance &amp; Statutory Standards
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                  Built strictly in alignment with Nigerian Health Regulations
                </h2>
                <p className="text-sm text-[#3f4850] leading-relaxed">
                  DHA operates under the oversight of Nigerian statutory healthcare policies, ensuring that every
                  participating clinician is licensed by the Medical and Dental Council of Nigeria (MDCN) and that all
                  patient health information strictly adheres to the Nigeria Data Protection Act (NDPA).
                </p>
                <div className="space-y-2.5 pt-2">
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-[#006a61] text-[20px]" filled={true} />
                    <span className="text-xs sm:text-sm text-[#131b2e] font-medium">
                      Real-time MDCN practitioner registry verification
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-[#006a61] text-[20px]" filled={true} />
                    <span className="text-xs sm:text-sm text-[#131b2e] font-medium">
                      NDPR / NDPA 2023 biometric health data encryption
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="check_circle" className="text-[#006a61] text-[20px]" filled={true} />
                    <span className="text-xs sm:text-sm text-[#131b2e] font-medium">
                      Immutable ISO 27001 audit ledger for all diagnostic changes
                    </span>
                  </div>
                </div>
              </div>

              {/* Stat Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-center">
                  <span className="text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">120+</span>
                  <p className="text-xs text-[#707881] mt-1 font-semibold uppercase tracking-wider">
                    Accredited Clinics
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-center">
                  <span className="text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#006a61]">45k+</span>
                  <p className="text-xs text-[#707881] mt-1 font-semibold uppercase tracking-wider">
                    Screenings Conducted
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-center">
                  <span className="text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#287ab3]">14</span>
                  <p className="text-xs text-[#707881] mt-1 font-semibold uppercase tracking-wider">States Covered</p>
                </div>
                <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] text-center">
                  <span className="text-3xl sm:text-4xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">99.8%</span>
                  <p className="text-xs text-[#707881] mt-1 font-semibold uppercase tracking-wider">
                    Chart Integrity Score
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#006194] to-[#004b73] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans']">
                Join Nigeria's Connected Dental Authority
              </h2>
              <p className="text-sm text-white/80 max-w-xl">
                Whether you are a dental professional seeking practice integration or a patient looking to manage your oral
                health Lifecode, DHA is ready for you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <button
                onClick={() => navigate('/onboarding/get-started')}
                className="h-12 px-6 rounded-xl bg-white text-[#006194] font-semibold text-xs hover:bg-[#f2f3ff] shadow-sm transition-all"
              >
                Get Started Free
              </button>
              <button
                onClick={() => navigate('/join-role')}
                className="h-12 px-6 rounded-xl bg-[#004b73] border border-white/20 text-white font-semibold text-xs hover:bg-[#003d5e] transition-all"
              >
                Join as Professional
              </button>
            </div>
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
          <span>&copy; 2026 DHA. All rights reserved. Sovereign Public Health Platform.</span>
        </div>
      </footer>
    </div>
  );
};
