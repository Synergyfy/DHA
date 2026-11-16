import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const ScreenerOnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState('Nurse Amina Bello');
  const [email, setEmail] = useState('a.bello@fct-phcb.gov.ng');
  const [phone, setPhone] = useState('+234 809 112 2334');
  const [screenerCadre, setScreenerCadre] = useState('Community Dental Health Officer (CDHO)');
  const [organization, setOrganization] = useState('FCT Primary Health Care Board');
  const [areaCouncil, setAreaCouncil] = useState('Abuja Municipal Area Council (AMAC)');
  const [targetFacility, setTargetFacility] = useState('FCT Mobile Dental Outreach Unit 02');
  const [cameraVerified, setCameraVerified] = useState(true);
  const [offlineCacheEnabled, setOfflineCacheEnabled] = useState(true);
  const [pledgeChecked, setPledgeChecked] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/screening/dashboard');
      }, 1200);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/join-role');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] flex flex-col antialiased">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={handleBack}
              className="w-9 h-9 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
              title="Back"
            >
              <Icon name="arrow_back" className="text-[20px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#006a61] uppercase tracking-wider font-semibold">
                Field &amp; Outreach Onboarding
              </span>
              <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                School &amp; Community Screener Accreditation
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#006a61] bg-[#86f2e4]/30 text-[#005049] px-2.5 py-1 rounded-full">
            Step {currentStep} of 4
          </span>
        </div>
      </header>

      {/* Progress Track */}
      <div className="w-full bg-[#eaedff] h-1.5">
        <div
          className="bg-[#006a61] h-1.5 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Main Form Content */}
      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Step 1: Screener Identity */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">Step 1</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Screener Identity &amp; Cadre
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Enter your details as an accredited field screener for school screenings and mobile dental missions.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div>
                  <label className="text-xs font-semibold text-[#131b2e] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Official Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Field Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#131b2e] block mb-1">Clinical Outreach Cadre</label>
                  <select
                    value={screenerCadre}
                    onChange={(e) => setScreenerCadre(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                  >
                    <option value="Community Dental Health Officer (CDHO)">Community Dental Health Officer (CDHO)</option>
                    <option value="Registered Dental Nurse (IPC & Outreach)">Registered Dental Nurse (IPC &amp; Outreach)</option>
                    <option value="Registered Dental Therapist">Registered Dental Therapist</option>
                    <option value="School Health Program Coordinator">School Health Program Coordinator</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Catchment & Network */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">Step 2</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Outreach Area &amp; Deployment Catchment
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Select the administrative council and assigned screening network or mobile van facility.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div>
                  <label className="text-xs font-semibold text-[#131b2e] block mb-1">Operating Organization / Partner</label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">LGA / Area Council</label>
                    <select
                      value={areaCouncil}
                      onChange={(e) => setAreaCouncil(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                    >
                      <option value="Abuja Municipal Area Council (AMAC)">Abuja Municipal Area Council (AMAC)</option>
                      <option value="Bwari Area Council">Bwari Area Council</option>
                      <option value="Gwagwalada Area Council">Gwagwalada Area Council</option>
                      <option value="Kuje Area Council">Kuje Area Council</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Assigned Deployment Unit</label>
                    <select
                      value={targetFacility}
                      onChange={(e) => setTargetFacility(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006a61]/20 border border-transparent focus:border-[#006a61]/30 outline-none"
                    >
                      <option value="FCT Mobile Dental Outreach Unit 02">FCT Mobile Dental Outreach Unit 02</option>
                      <option value="AMAC LEA Primary Schools Zone A">AMAC LEA Primary Schools Zone A</option>
                      <option value="Bwari Community Health Outreach Post">Bwari Community Health Outreach Post</option>
                      <option value="Gwagwalada Outreach Mission Unit">Gwagwalada Outreach Mission Unit</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Equipment & Offline Sync */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">Step 3</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Screening Kit &amp; Offline Cache Check
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Verify your tablet device configuration and field screening diagnostic gear.
                </p>
              </div>

              <div className="space-y-3 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="photo_camera" className="text-[20px] text-[#006a61]" />
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">Intraoral / Tablet Camera Access</span>
                      <span className="text-[11px] text-[#707881]">High-resolution capture for suspicious lesions</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={cameraVerified}
                    onChange={(e) => setCameraVerified(e.target.checked)}
                    className="w-4 h-4 text-[#006a61] rounded"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="cloud_sync" className="text-[20px] text-[#006a61]" />
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">Offline-First Local Sync</span>
                      <span className="text-[11px] text-[#707881]">Allows offline screening when cellular data drops</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={offlineCacheEnabled}
                    onChange={(e) => setOfflineCacheEnabled(e.target.checked)}
                    className="w-4 h-4 text-[#006a61] rounded"
                  />
                </div>

                <div className="p-3.5 rounded-xl bg-[#86f2e4]/20 border border-[#86f2e4]/40 flex items-center gap-3">
                  <Icon name="check_circle" className="text-[#006a61] text-[20px]" filled={true} />
                  <p className="text-xs text-[#005049]">
                    Standardized screening criteria (visual inspection, plaque index, fluoride varnish referral) verified.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Pledge & Launch */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006a61] uppercase tracking-wider">Step 4</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Public Health Pledge &amp; Authorization
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Confirm your operational deployment to access the Clinical Screening Dashboard.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div className="p-4 rounded-xl bg-[#f2f3ff] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">{fullName}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#86f2e4]/40 text-[#005049] font-semibold">
                      Outreach Screener
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850]">{screenerCadre}</p>
                  <p className="text-xs text-[#707881]">{organization} &bull; {targetFacility}</p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    id="screenerPledge"
                    checked={pledgeChecked}
                    onChange={(e) => setPledgeChecked(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#006a61] rounded focus:ring-[#006a61]"
                  />
                  <label htmlFor="screenerPledge" className="text-xs text-[#3f4850] leading-relaxed cursor-pointer">
                    I pledge to protect child patient confidentiality, record objective screening observations, and ensure
                    urgent caries cases receive prompt accredited clinical referral slips.
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#eaedff] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleBack}
            className="h-11 px-5 rounded-xl border border-[#eaedff] text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff]"
          >
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </button>

          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleNext}
            className="h-11 px-6 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white text-xs font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Activating Field Access...</span>
            ) : currentStep === 4 ? (
              <span>Launch Screening Dashboard &rarr;</span>
            ) : (
              <span>Continue &rarr;</span>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
