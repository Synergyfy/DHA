import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function PatientIdentificationScreen() {
  const [activeTab, setActiveTab] = useState<'scan' | 'search' | 'register'>('scan');
  const [simulatedMatch, setSimulatedMatch] = useState(false);
  const [simulatedInvalid, setSimulatedInvalid] = useState(false);
  const [cameraDenied, setCameraDenied] = useState(false);
  const [torchActive, setTorchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('Zayd');

  return (
    <ScreeningShell
      pageTitle="Patient Intake & Identification"
      badgeCode="8.2"
      badgeLabel="Step 1 of 5"
      currentStep={1}
      totalSteps={5}
    >
      <div className="space-y-6 sm:space-y-8 max-w-4xl mx-auto">
        {/* Step Progress & Context Header */}
        <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span>Step 1 of 5: Identify Patient</span>
            </span>
            <span className="text-on-surface-variant">Intake Station</span>
          </div>

          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full w-1/5" />
          </div>

          <div className="p-3 bg-surface-container-low rounded-2xl flex items-center gap-3 text-xs">
            <div className="w-9 h-9 rounded-xl bg-secondary-container text-secondary flex items-center justify-center shrink-0">
              <Icon name="school" className="text-[20px]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-on-surface-variant block">
                Assigned Programme
              </span>
              <span className="font-bold text-on-surface">
                Lagos Mainland Community School (Cohort 4B Outreach)
              </span>
            </div>
          </div>
        </section>

        {/* Mode Selector Segmented Tabs */}
        <div className="bg-surface-container p-1 rounded-2xl flex items-center justify-between shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('scan')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'scan'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="qr_code_scanner" className="text-[18px]" />
            <span>Scan QR / Lifecode</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'search'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="person_search" className="text-[18px]" />
            <span>Search Cohort</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-surface-container-lowest text-primary shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="person_add" className="text-[18px]" />
            <span>New Intake</span>
          </button>
        </div>

        {/* Tab 1: SCAN QR VIEW */}
        {activeTab === 'scan' && (
          <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <span className="text-xs font-bold text-secondary">Camera Scanner Ready</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTorchActive(!torchActive)}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center transition ${
                    torchActive ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-on-surface'
                  }`}
                  title="Flashlight"
                >
                  <Icon name="flashlight_on" className="text-[18px]" />
                </button>
                <span className="px-2.5 py-1 bg-surface-container-low rounded-full text-[11px] font-semibold text-on-surface-variant flex items-center gap-1">
                  <Icon name="videocam" className="text-[14px] text-secondary" />
                  <span>720p HD Feed</span>
                </span>
              </div>
            </div>

            {/* Viewfinder Frame */}
            <div className="relative w-full aspect-square max-w-sm mx-auto bg-inverse-surface rounded-3xl overflow-hidden flex flex-col items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-gradient-to-b from-inverse-surface/90 via-inverse-surface/60 to-inverse-surface flex items-center justify-center">
                <Icon name="document_scanner" className="text-outline-variant/20 text-[96px]" />
              </div>

              {/* Animated Laser */}
              <div className="absolute left-8 right-8 h-0.5 bg-secondary shadow-[0_0_12px_#86f2e4] animate-pulse" />

              {/* Corner Brackets */}
              <div className="relative w-56 h-56 pointer-events-none flex flex-col justify-between p-2 border-2 border-dashed border-secondary/40 rounded-2xl">
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-4 border-l-4 border-secondary rounded-tl-lg" />
                  <div className="w-6 h-6 border-t-4 border-r-4 border-secondary rounded-tr-lg" />
                </div>
                <div className="flex justify-center">
                  <span className="text-[10px] font-mono font-bold bg-inverse-surface/80 text-secondary px-2 py-0.5 rounded-full border border-secondary/30">
                    DHA LIFECODE CARD
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-4 border-l-4 border-secondary rounded-bl-lg" />
                  <div className="w-6 h-6 border-b-4 border-r-4 border-secondary rounded-br-lg" />
                </div>
              </div>

              {cameraDenied && (
                <div className="absolute inset-0 bg-inverse-surface/95 flex flex-col items-center justify-center text-center p-6 space-y-2 z-20">
                  <div className="w-12 h-12 rounded-full bg-error-container text-on-error-container flex items-center justify-center">
                    <Icon name="videocam_off" className="text-[28px]" />
                  </div>
                  <h4 className="font-title-sm text-sm font-bold text-white">Camera Access Denied</h4>
                  <p className="text-xs text-white/70">Hardware camera permission is blocked in browser settings.</p>
                  <button
                    type="button"
                    onClick={() => setCameraDenied(false)}
                    className="mt-2 px-4 py-2 bg-primary rounded-xl text-on-primary text-xs font-bold"
                  >
                    Reset Permission
                  </button>
                </div>
              )}
            </div>

            <p className="text-xs text-on-surface-variant text-center max-w-sm mx-auto">
              Align the student's physical DHA Lifecode badge or guardian mobile app QR within the targeting frame.
            </p>

            {/* Hardware / Testing Simulation Tray */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-2">
              <span className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider block">
                Hardware Sensor Simulators:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedMatch(true);
                    setSimulatedInvalid(false);
                    setCameraDenied(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest text-primary text-xs font-semibold hover:bg-surface-container flex items-center justify-between shadow-2xs"
                >
                  <span>Simulate: Valid Zayd</span>
                  <Icon name="check" className="text-[16px]" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSimulatedInvalid(true);
                    setSimulatedMatch(false);
                    setCameraDenied(false);
                  }}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest text-on-surface text-xs font-semibold hover:bg-surface-container flex items-center justify-between shadow-2xs"
                >
                  <span>Simulate: Invalid QR</span>
                  <Icon name="error_outline" className="text-[16px]" />
                </button>
                <button
                  type="button"
                  onClick={() => setCameraDenied(true)}
                  className="px-3 py-2 rounded-xl bg-surface-container-lowest text-error text-xs font-semibold hover:bg-surface-container flex items-center justify-between shadow-2xs"
                >
                  <span>Simulate: Denied Cam</span>
                  <Icon name="no_photography" className="text-[16px]" />
                </button>
              </div>
            </div>

            {/* Match Found Card */}
            {simulatedMatch && (
              <div className="p-5 rounded-2xl bg-surface-container border-2 border-secondary shadow-md space-y-3 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold flex items-center gap-1">
                    <Icon name="check_circle" className="text-[14px]" />
                    <span>Verified Lifecode Match</span>
                  </span>
                  <span className="font-mono text-xs text-primary font-bold">DHA-P-49102</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary-fixed text-primary font-extrabold flex items-center justify-center text-base">
                    ZT
                  </div>
                  <div>
                    <h3 className="font-title-sm text-base font-bold text-on-surface">
                      Zayd Tariq Okafor
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      9 yrs (DOB: 14 Aug 2015) • Grade 4B • Male
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-surface-container-lowest rounded-xl flex items-center gap-2 text-xs text-on-surface-variant">
                  <Icon name="verified_user" className="text-secondary text-[16px]" />
                  <span>
                    Linked Guardian: <strong className="text-on-surface">Ngozi Eze</strong> (Mother • National Identification Number (NIN) verification Verified)
                  </span>
                </div>

                <NavLink
                  to="/screening/consent"
                  className="w-full h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 flex items-center justify-center gap-2 shadow-xs transition"
                >
                  <span>Proceed to Consent Verification</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </NavLink>
              </div>
            )}

            {/* Invalid QR Alert */}
            {simulatedInvalid && (
              <div className="p-4 rounded-2xl bg-error-container text-on-error-container flex items-start gap-3">
                <Icon name="warning" className="text-error text-[24px] shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <strong className="font-bold text-error block text-sm">Unrecognized QR Payload</strong>
                  <p>
                    The scanned token is not recognized in the active school roster. Try searching by student name or register as a provisional intake.
                  </p>
                  <div className="pt-2 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab('search')}
                      className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface font-semibold"
                    >
                      Search Roster
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab('register')}
                      className="px-3 py-1.5 rounded-lg bg-error text-on-error font-semibold"
                    >
                      Quick Register
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* Tab 2: SEARCH ROSTER */}
        {activeTab === 'search' && (
          <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-on-surface block" htmlFor="patient-search">
                Search Cohort Student Record
              </label>
              <div className="relative">
                <Icon
                  name="search"
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
                />
                <input
                  id="patient-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by DHA ID, Student ID, or Name..."
                  className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-on-surface-variant">
              <span>Matching Cohort (2 found)</span>
              <span className="font-mono text-secondary font-bold">Grade 4B Active</span>
            </div>

            {/* Match 1 */}
            <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-sm">
                    ZT
                  </div>
                  <div>
                    <h3 className="font-title-sm text-sm font-bold text-on-surface">
                      Zayd Tariq Okafor
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="font-mono text-primary font-bold">DHA-P-49102</span>
                      <span>·</span>
                      <span>Class 4-B</span>
                    </div>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-surface-container-lowest p-2.5 rounded-xl text-on-surface-variant">
                <div>Age: <strong className="text-on-surface">9 years</strong></div>
                <div>DOB: <strong className="text-on-surface">14 Aug 2015</strong></div>
                <div>Sex: <strong className="text-on-surface">Male</strong></div>
                <div>Status: <strong className="text-secondary">Eligible</strong></div>
              </div>

              <NavLink
                to="/screening/consent"
                className="w-full h-10 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Select Patient & Proceed</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>

            {/* Match 2 */}
            <div className="p-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/20 space-y-2 opacity-80">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-container text-on-surface-variant font-bold flex items-center justify-center text-sm">
                    ZO
                  </div>
                  <div>
                    <h3 className="font-title-sm text-sm font-bold text-on-surface">
                      Zayd Omar Farooq
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="font-mono">DHA-P-77210</span>
                      <span>·</span>
                      <span>Age 10</span>
                    </div>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-semibold">
                  Other Cohort
                </span>
              </div>

              <p className="text-xs text-on-surface-variant">
                Enrolled at Lagos Modern Academy (Out-of-cohort guest screening).
              </p>
            </div>
          </section>
        )}

        {/* Tab 3: REGISTER NEW INTAKE */}
        {activeTab === 'register' && (
          <section className="p-5 sm:p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-5">
            <div className="p-4 rounded-2xl bg-surface-container-low flex items-start gap-3">
              <Icon name="app_registration" className="text-primary text-[24px] shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <strong className="text-on-surface font-semibold block text-sm">
                  Rapid Screener Field Intake
                </strong>
                <p className="text-on-surface-variant">
                  Simplified registration generates an instant provisional DHA Lifecode for diagnostic screening and longitudinal tracking.
                </p>
              </div>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Layla"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Okafor"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    defaultValue="2016-04-12"
                    className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">
                    Biological Sex
                  </label>
                  <select className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Undisclosed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Guardian / Mother's Name
                </label>
                <input
                  type="text"
                  defaultValue="Ngozi Eze"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">
                  Guardian Contact Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+234 803 123 4567"
                  className="w-full px-3 py-2 bg-surface-container-low rounded-xl text-xs text-on-surface border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <span className="text-[11px] text-on-surface-variant mt-1 block">
                  Used for SMS digital consent verification and report delivery.
                </span>
              </div>

              <NavLink
                to="/screening/consent"
                className="w-full h-11 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 flex items-center justify-center gap-1.5 shadow-xs"
              >
                <span>Register & Continue to Consent</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </form>
          </section>
        )}
      </div>
    </ScreeningShell>
  );
}

export default PatientIdentificationScreen;

