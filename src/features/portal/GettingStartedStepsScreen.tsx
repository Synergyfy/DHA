import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortalShell } from './PortalShell';
import { Icon } from '../../design/Primitives';

type SelectedRoleChip = 'patient' | 'guardian' | 'doctor' | 'clinic';

export function GettingStartedStepsScreen() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<SelectedRoleChip>('patient');
  const [isStarting, setIsStarting] = useState(false);

  const handleStartRoleSelection = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate('/join-role');
    }, 600);
  };

  return (
    <PortalShell pageTitle="Getting Started Guide">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 space-y-8">
        {/* Top Branding & Welcome Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-outline-variant/20">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <Icon name="dentistry" filled className="text-[18px]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-on-surface tracking-tight leading-none">DHA Dental</span>
              <span className="text-[10px] text-primary font-bold tracking-wider uppercase">DUBAI HEALTH AUTHORITY</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Secure Gateway</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Context, UAE Pass Banner, & Regulatory Info (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-primary text-[11px] uppercase tracking-wider font-semibold">
                <Icon name="verified_user" className="text-[14px]" />
                <span>Smooth Onboarding Guide</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight">
                Getting Started Is Simple
              </h1>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                Connect your UAE Pass or verify your clinic registration in a few straightforward steps.
              </p>
            </div>

            {/* UAE Pass Feature Card */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary shadow-xs">
                  <Icon name="fingerprint" filled className="text-[22px]" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-on-surface">UAE PASS Instant Verification</h2>
                  <p className="text-xs text-on-surface-variant">Automated identity retrieval in 30 seconds</p>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                No manual document scanning required for UAE residents. Secure biometric authorization links your Emirates ID directly.
              </p>
            </div>

            {/* Regulatory Advisory Notice Card */}
            <div className="rounded-2xl bg-surface-container-high p-4 flex items-start gap-3 border border-outline-variant/20 shadow-2xs">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest text-tertiary flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="policy" className="text-[18px]" />
              </div>
              <div className="flex-1">
                <span className="text-xs text-on-surface uppercase tracking-wide font-bold block mb-0.5">
                  Regulatory Advisory
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Registration alone does not automatically verify a professional, clinic or organisation without formal DHA audit and licensing credential matching.
                </p>
              </div>
            </div>

            {/* Healthcare Gateway Visual Banner */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container p-4 flex items-center gap-3 border border-outline-variant/30">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high shadow-xs">
                <img
                  className="w-full h-full object-cover"
                  alt="A reassuring modern dental clinic in Dubai"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJRXGFoK5GB-uJJKw18yUC7iPaT1cvZiCJ4UmbxTa3X9i3aGNzSURGXRwBoJlqheXPmJ2hSOl9LlcMwBzzngeS8QE0Nja3AmivgteNyyularsTIZ8iHYYAf7hgMu4boPIuUTCZvdt8KaNudknHAnM9HghV5sGs2QRFpTZP57iYDsg8oZsOwg2H4wfv_urvP3s6UNb8LtHeXvx7wCVhTizgb2a5lI6htc-zoTG-hpAg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-on-surface truncate">Official Dubai Healthcare Gateway</h4>
                <p className="text-[11px] text-on-surface-variant line-clamp-2 mt-0.5">
                  Unified diagnostic exchange compliant with Dubai Health Authority digital standards.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Interactive Progression Path (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative flex flex-col space-y-4 pl-3">
              {/* Vertical Visual Connector Track */}
              <div className="absolute left-7 top-6 bottom-6 w-0.5 bg-gradient-to-b from-primary via-secondary to-tertiary -z-0" />

              {/* Step 1 Card */}
              <div className="relative z-10 bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center flex-shrink-0 shadow-xs text-xs font-bold">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h2 className="text-sm font-bold text-on-surface">Choose Your Account Type</h2>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-[10px] text-primary font-semibold">
                        Step 1
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      Tell DHA whether you are registering as a patient, family guardian, dental professional, clinic, or school organization.
                    </p>

                    {/* Interactive Role Selector Chips */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedRole('patient')}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedRole === 'patient'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <Icon name="person" className="text-[14px]" />
                        <span>Patient</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRole('guardian')}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedRole === 'guardian'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <Icon name="family_restroom" className="text-[14px]" />
                        <span>Guardian</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRole('doctor')}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedRole === 'doctor'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <Icon name="medical_services" className="text-[14px]" />
                        <span>Doctor</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedRole('clinic')}
                        className={`px-3 py-1 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                          selectedRole === 'clinic'
                            ? 'bg-primary text-on-primary shadow-xs'
                            : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
                        }`}
                      >
                        <Icon name="domain" className="text-[14px]" />
                        <span>Clinic</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 Card */}
              <div className="relative z-10 bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0 shadow-xs text-xs font-bold">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h2 className="text-sm font-bold text-on-surface">Create Your Profile</h2>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-[10px] text-on-surface-variant font-semibold">
                        Step 2
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-2.5">
                      Complete relevant verification and registration details seamlessly with your UAE Pass or official Emirates ID / license credentials.
                    </p>
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-low border border-outline-variant/20">
                      <Icon name="fingerprint" filled className="text-secondary text-[20px]" />
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-on-surface truncate">UAE PASS Instant Verification</div>
                        <div className="text-[11px] text-outline truncate">Automated identity retrieval</div>
                      </div>
                      <Icon name="check_circle" className="text-secondary text-[18px]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 Card */}
              <div className="relative z-10 bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0 shadow-xs text-xs font-bold">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h2 className="text-sm font-bold text-on-surface">Access Your DHA Experience</h2>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-[10px] text-on-surface-variant font-semibold">
                        Step 3
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
                      Explore features tailored to your account type: interactive odontograms, diagnostic reports, treatment schedules, or clinical charting.
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="p-2.5 rounded-xl bg-surface-container flex flex-col gap-1">
                        <Icon name="radiology" className="text-primary text-[18px]" />
                        <span className="text-[11px] text-on-surface font-semibold leading-tight">Digital Odontogram</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-surface-container flex flex-col gap-1">
                        <Icon name="assignment_turned_in" className="text-primary text-[18px]" />
                        <span className="text-[11px] text-on-surface font-semibold leading-tight">Diagnostic Records</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4 Card */}
              <div className="relative z-10 bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-surface-container-highest text-primary flex items-center justify-center flex-shrink-0 shadow-xs text-xs font-bold">
                    4
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h2 className="text-sm font-bold text-on-surface">Stay Connected to Your Oral Health</h2>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-[10px] text-on-surface-variant font-semibold">
                        Step 4
                      </span>
                    </div>
                    <p className="text-xs text-on-surface-variant leading-relaxed mb-2">
                      Keep track of routine check-up timelines, clinical summaries, preventive reminders, and automated health alerts.
                    </p>
                    <div className="flex items-center gap-2 pt-1 text-on-surface-variant text-xs">
                      <Icon name="notifications_active" className="text-[16px] text-tertiary" />
                      <span>Automatic sync with Dubai Unified Dental System</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Primary CTA Button */}
            <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-2">
              <button
                type="button"
                onClick={handleStartRoleSelection}
                disabled={isStarting}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] disabled:opacity-75"
              >
                {isStarting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-on-primary border-t-transparent animate-spin" />
                    <span>Opening Step 1: Role Selection...</span>
                  </>
                ) : (
                  <>
                    <span>Get Started Now</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </>
                )}
              </button>
              <p className="text-center text-xs text-outline">
                Takes less than 2 minutes • Secured by UAE PASS
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}

