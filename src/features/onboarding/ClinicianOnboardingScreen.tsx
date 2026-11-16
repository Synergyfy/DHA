import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const ClinicianOnboardingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [fullName, setFullName] = useState('Dr. Chinedu Okafor');
  const [email, setEmail] = useState('c.okafor@harmoxydental.ng');
  const [phone, setPhone] = useState('+234 803 456 7890');
  const [mdcnNumber, setMdcnNumber] = useState('MDCN/DN/2018/4892');
  const [specialty, setSpecialty] = useState('General Dental Practitioner');
  const [practiceType, setPracticeType] = useState('accredited-clinic');
  const [selectedClinic, setSelectedClinic] = useState('Harmony Dental Group - Wuse 2');
  const [agreedToStandards, setAgreedToStandards] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/dentist/dashboard');
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
                Professional Onboarding
              </span>
              <span className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Dentist &amp; Clinician Accreditation
              </span>
            </div>
          </div>
          <span className="text-xs font-semibold text-[#006194] bg-[#eaedff] px-2.5 py-1 rounded-full">
            Step {currentStep} of 4
          </span>
        </div>
      </header>

      {/* Progress Track */}
      <div className="w-full bg-[#eaedff] h-1.5">
        <div
          className="bg-[#006194] h-1.5 transition-all duration-300"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>

      {/* Main Form Content */}
      <main className="max-w-2xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Step 1: Professional Information */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">Step 1</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Practitioner Credentials &amp; Specialty
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Provide your official credentials as registered with the Medical and Dental Council of Nigeria (MDCN).
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div>
                  <label className="text-xs font-semibold text-[#131b2e] block mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Official Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Mobile Phone (WhatsApp)</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">
                      MDCN Registration Folio Number
                    </label>
                    <input
                      type="text"
                      value={mdcnNumber}
                      onChange={(e) => setMdcnNumber(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] font-mono focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Primary Clinical Specialty</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                    >
                      <option value="General Dental Practitioner">General Dental Practitioner</option>
                      <option value="Orthodontics & Dentofacial Orthopaedics">Orthodontics &amp; Orthopaedics</option>
                      <option value="Oral & Maxillofacial Surgery">Oral &amp; Maxillofacial Surgery</option>
                      <option value="Periodontology & Implantology">Periodontology &amp; Implantology</option>
                      <option value="Pediatric Dentistry (Pedodontics)">Pediatric Dentistry</option>
                      <option value="Prosthodontics & Restorative">Prosthodontics &amp; Restorative</option>
                      <option value="Conservative & Endodontics">Conservative &amp; Endodontics</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Practice Affiliation */}
          {currentStep === 2 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">Step 2</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Clinic Affiliation &amp; Practice Location
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Connect with your primary participating dental practice or register as an independent consultant/locum.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div>
                  <label className="text-xs font-semibold text-[#131b2e] block mb-2">Practice Type</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPracticeType('accredited-clinic')}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        practiceType === 'accredited-clinic'
                          ? 'border-[#006194] bg-[#f2f3ff]'
                          : 'border-[#eaedff] bg-white hover:bg-[#faf8ff]'
                      }`}
                    >
                      <Icon name="domain" className="text-[20px] text-[#006194] mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#131b2e] block">Accredited Clinic</span>
                        <span className="text-[11px] text-[#707881]">Affiliated with a dental hospital or clinic</span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPracticeType('independent')}
                      className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                        practiceType === 'independent'
                          ? 'border-[#006194] bg-[#f2f3ff]'
                          : 'border-[#eaedff] bg-white hover:bg-[#faf8ff]'
                      }`}
                    >
                      <Icon name="person" className="text-[20px] text-[#006a61] mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-[#131b2e] block">Independent / Locum</span>
                        <span className="text-[11px] text-[#707881]">Visiting specialist across multiple sites</span>
                      </div>
                    </button>
                  </div>
                </div>

                {practiceType === 'accredited-clinic' && (
                  <div>
                    <label className="text-xs font-semibold text-[#131b2e] block mb-1">Select Primary Clinic</label>
                    <select
                      value={selectedClinic}
                      onChange={(e) => setSelectedClinic(e.target.value)}
                      className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 outline-none"
                    >
                      <option value="Harmony Dental Group - Wuse 2">Harmony Dental Group - Wuse 2 Main</option>
                      <option value="Harmony Dental Group - Maitama">Harmony Dental Group - Maitama Specialist</option>
                      <option value="Harmony Dental Group - Gwarinpa">Harmony Dental Group - Gwarinpa Outpost</option>
                      <option value="Abuja Smiles Dental Centre">Abuja Smiles Dental Centre - Garki</option>
                      <option value="Victoria Island Dental Hub">Victoria Island Dental Hub - Lagos</option>
                    </select>
                  </div>
                )}

                <div className="p-3.5 rounded-xl bg-[#86f2e4]/20 border border-[#86f2e4]/40 flex items-center gap-3">
                  <Icon name="verified" className="text-[#006a61] text-[20px]" filled={true} />
                  <p className="text-xs text-[#005049]">
                    An automated affiliation invite will be routed to the clinic's Clinical Director for digital
                    endorsement.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Licensure & Document Upload */}
          {currentStep === 3 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">Step 3</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Licensure &amp; Identity Verification
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Upload verification documents to activate your clinical signing privileges.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div className="p-4 rounded-xl border border-dashed border-[#006194]/40 bg-[#f2f3ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="badge" className="text-[24px] text-[#006194]" />
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">MDCN Annual Practicing License</span>
                      <span className="text-[11px] text-[#006a61] font-semibold">Attached: MDCN_Licence_2026.pdf</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 bg-[#86f2e4]/40 text-[#005049] rounded-lg font-semibold">
                    Verified
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-[#006194]/40 bg-[#f2f3ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="school" className="text-[24px] text-[#006194]" />
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">BDS / Dental Degree Certificate</span>
                      <span className="text-[11px] text-[#006a61] font-semibold">Attached: Degree_Cert_UNILAG.pdf</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 bg-[#86f2e4]/40 text-[#005049] rounded-lg font-semibold">
                    Verified
                  </span>
                </div>

                <div className="p-4 rounded-xl border border-dashed border-[#006194]/40 bg-[#f2f3ff] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Icon name="badge" className="text-[24px] text-[#006194]" />
                    <div>
                      <span className="text-xs font-semibold text-[#131b2e] block">Government Photo ID (NIN / Passport)</span>
                      <span className="text-[11px] text-[#006a61] font-semibold">Attached: NIN_Slip_Verified.pdf</span>
                    </div>
                  </div>
                  <span className="text-[11px] px-2 py-1 bg-[#86f2e4]/40 text-[#005049] rounded-lg font-semibold">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation & Digital Signature */}
          {currentStep === 4 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-semibold text-[#006194] uppercase tracking-wider">Step 4</span>
                <h1 className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] mt-1">
                  Clinical Standards &amp; Digital Access
                </h1>
                <p className="text-xs sm:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Review your credentials before launching your official DHA Dentist Workspace.
                </p>
              </div>

              <div className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border border-[#eaedff] shadow-sm">
                <div className="p-4 rounded-xl bg-[#f2f3ff] space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#131b2e]">{fullName}</span>
                    <span className="text-[11px] px-2 py-0.5 rounded bg-[#cce5ff] text-[#001d31] font-semibold">
                      MDCN Verified
                    </span>
                  </div>
                  <p className="text-xs text-[#3f4850]">{specialty} &bull; {mdcnNumber}</p>
                  <p className="text-xs text-[#707881]">{selectedClinic}</p>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <input
                    type="checkbox"
                    id="standards"
                    checked={agreedToStandards}
                    onChange={(e) => setAgreedToStandards(e.target.checked)}
                    className="mt-1 w-4 h-4 text-[#006194] rounded focus:ring-[#006194]"
                  />
                  <label htmlFor="standards" className="text-xs text-[#3f4850] leading-relaxed cursor-pointer">
                    I solemnly declare that I am licensed to practice dentistry under the laws of the Federal Republic of
                    Nigeria, and I agree to adhere to DHA clinical charting integrity and NDPR patient data privacy rules.
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
            className="h-11 px-6 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Finalizing Access...</span>
            ) : currentStep === 4 ? (
              <span>Launch Clinician Dashboard &rarr;</span>
            ) : (
              <span>Continue &rarr;</span>
            )}
          </button>
        </div>
      </main>
    </div>
  );
};
