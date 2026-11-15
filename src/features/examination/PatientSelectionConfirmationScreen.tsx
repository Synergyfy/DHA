import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

export function PatientSelectionConfirmationScreen() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('Chinedu Okafor');
  const [searchMode, setSearchMode] = useState<'name' | 'lifecode' | 'civilId' | 'phone'>('name');
  const [consentConfirmed, setConsentConfirmed] = useState(true);
  const [isScanning, setIsScanning] = useState(false);

  const handleScanSimulation = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setSearchTerm('Chinedu Okafor');
    }, 800);
  };

  const handleContinue = () => {
    if (!consentConfirmed) return;
    navigate('/examination/templates');
  };

  return (
    <ExaminationShell
      pageTitle="Patient Selection & Confirmation"
      badgeCode="10.2"
      badgeLabel="Step 1: Patient Triage"
      currentStep="Step 1 of 3: Identify & Confirm Patient"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Stepper Indicator */}
        <section className="bg-surface-container-low rounded-2xl p-5 shadow-sm border border-outline-variant/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono text-xs font-bold">
                1
              </span>
              <h2 className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                Step 1 of 3: Identify & Confirm Patient
              </h2>
            </div>
            <span className="text-xs font-bold text-primary bg-primary-fixed px-2.5 py-0.5 rounded-full">
              Phase 1
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Verify active DHA civil registry & establish protocol session baseline
          </p>
          <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden mt-3">
            <div className="bg-primary h-full rounded-full transition-all duration-500" style={{ width: '33.3%' }} />
          </div>
        </section>

        {/* Search & Identification Hub */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="patient-search" className="text-sm font-bold text-on-surface">
              Search & Identification Hub
            </label>
            <span className="text-xs text-secondary flex items-center gap-1 font-semibold">
              <Icon name="bolt" className="text-sm" />
              <span>Quick Lookup</span>
            </span>
          </div>

          {/* Search Input Container */}
          <div className="relative flex items-center">
            <Icon name="search" className="absolute left-3.5 text-outline text-lg" />
            <input
              id="patient-search"
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, DHA Lifecode, Civil ID, or Phone..."
              className="w-full bg-surface-container-low text-on-surface rounded-xl pl-11 pr-24 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/30"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 px-2 py-1 rounded-lg bg-surface-variant text-on-surface-variant text-xs flex items-center gap-1 hover:bg-surface-dim transition-colors"
              >
                <Icon name="close" className="text-xs" />
                <span>Clear</span>
              </button>
            )}
          </div>

          {/* Search Mode Pill Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            {[
              { id: 'name', label: 'Name' },
              { id: 'lifecode', label: 'DHA Lifecode' },
              { id: 'civilId', label: 'Civil ID / Passport' },
              { id: 'phone', label: 'Mobile No.' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSearchMode(tab.id as any)}
                className={`px-3 py-1.5 rounded-full font-medium transition-all ${
                  searchMode === tab.id
                    ? 'bg-primary text-on-primary font-semibold shadow-sm'
                    : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scan Barcode / QR Lifecode action */}
          <button
            type="button"
            onClick={handleScanSimulation}
            disabled={isScanning}
            className="w-full bg-secondary-fixed text-on-secondary-fixed rounded-xl py-3 px-4 flex items-center justify-center gap-2 text-xs sm:text-sm font-bold shadow-sm hover:opacity-95 transition-opacity"
          >
            <Icon name={isScanning ? 'sync' : 'qr_code_scanner'} className={`text-lg ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Scanning Emirates ID / Lifecode...' : 'Scan DHA Lifecode / Digital Emirates ID'}</span>
          </button>
        </section>

        {/* Query Feedback Tag */}
        <div className="flex items-center justify-between text-xs px-1">
          <span className="text-on-surface-variant">
            Search match for: <strong className="text-on-surface font-semibold">"{searchTerm || 'All'}"</strong> (DHA-10482)
          </span>
          <span className="text-secondary font-semibold bg-secondary-container text-on-secondary-container px-2.5 py-0.5 rounded-full">
            1 Match Found
          </span>
        </div>

        {/* Matching Patient Search Results Card */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-md border border-outline-variant/30 space-y-4">
          {/* Patient Identity Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
                  alt="Chinedu Okafor"
                  className="w-16 h-16 rounded-2xl object-cover shadow-sm ring-2 ring-primary/20"
                />
                <div className="absolute -bottom-1 -right-1 bg-secondary text-on-secondary w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                  <Icon name="verified" className="text-[12px]" />
                </div>
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-on-surface truncate">Chinedu Okafor</h3>
                  <span className="bg-surface-container px-2 py-0.5 rounded text-primary font-mono text-xs font-bold">
                    DHA-10482
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant mt-0.5 flex items-center gap-2">
                  <span>34y (18 Oct 1990)</span>
                  <span>•</span>
                  <span>Male</span>
                </div>
                <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant">
                  <Icon name="call" className="text-sm text-outline" />
                  <span>+971 50 234 8921</span>
                </div>
              </div>
            </div>

            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-secondary-container text-on-secondary-container self-start sm:self-auto">
              Identity Verified
            </span>
          </div>

          {/* Clinical Facility & Demographics Banner */}
          <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <Icon name="local_hospital" className="text-secondary text-lg" />
              <div>
                <span className="text-on-surface-variant block text-[11px]">Primary Clinic Center</span>
                <span className="text-on-surface font-semibold">DHA Dental Care — Central Branch</span>
              </div>
            </div>
            <span className="bg-surface-container-high text-on-surface px-2.5 py-1 rounded-lg font-medium">
              Adult • General Protocol
            </span>
          </div>

          {/* Medical Critical Alert Ribbon */}
          <div className="bg-error-container text-on-error-container rounded-xl p-3.5 flex items-start gap-3">
            <Icon name="warning" className="text-error text-xl shrink-0 mt-0.5" />
            <div className="min-w-0 text-xs">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="uppercase font-bold text-error tracking-wider text-[10px]">Critical Clinical Alert</span>
              </div>
              <h4 className="font-bold text-sm text-on-error-container">Penicillin Allergy (Moderate) • Asthmatic</h4>
              <p className="mt-1 text-on-error-container/90 leading-relaxed">
                Avoid Beta-lactam antibiotic prophylaxes. Patient carries rescue Albuterol inhaler. Standby protocol required.
              </p>
            </div>
          </div>

          {/* Previous Examination Mini Summary */}
          <div className="bg-surface-container-low rounded-xl p-3 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Icon name="history_edu" className="text-primary text-base" />
              <div>
                <span className="text-on-surface-variant text-[11px] uppercase font-semibold">Previous Examination</span>
                <div className="font-semibold text-on-surface">Annual Comprehensive Exam</div>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-primary font-bold">14 Oct 2024</span>
              <p className="text-on-surface-variant text-[11px]">Dr. Tariq Mansoor (#DHA-LIC-4491)</p>
            </div>
          </div>

          {/* Odontogram Charting Status Matrix Preview */}
          <div className="bg-surface-container rounded-xl p-3.5 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-on-surface">
                <Icon name="dentistry" className="text-primary text-base" />
                <span>Odontogram FDI 32-Tooth Chart</span>
              </div>
              <span className="bg-secondary-container text-on-secondary-container px-2 py-0.5 rounded-full font-semibold text-[11px] flex items-center gap-1">
                <Icon name="sync" className="text-[12px]" />
                <span>Synced</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-1 text-center">
              <div className="bg-surface-container-lowest rounded-xl p-2.5">
                <div className="text-lg font-bold text-secondary">2</div>
                <div className="text-xs text-on-surface-variant font-medium">Restorations</div>
                <div className="text-[10px] text-outline font-mono mt-0.5">#16 MOD, #26 DO</div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-2.5">
                <div className="text-lg font-bold text-primary">1</div>
                <div className="text-xs text-on-surface-variant font-medium">Watch Zone</div>
                <div className="text-[10px] text-outline font-mono mt-0.5">#47 Occlusal</div>
              </div>
              <div className="bg-surface-container-lowest rounded-xl p-2.5">
                <div className="text-lg font-bold text-on-surface">29</div>
                <div className="text-xs text-on-surface-variant font-medium">Intact / Normal</div>
                <div className="text-[10px] text-outline font-mono mt-0.5">Verified Sound</div>
              </div>
            </div>
          </div>
        </section>

        {/* Explicit Confirmation Panel */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
          <div className="flex items-center gap-2.5 bg-surface-container-low px-3 py-2 rounded-xl text-xs">
            <Icon name="verified_user" className="text-secondary text-base" />
            <div>
              <span className="text-on-surface-variant block text-[10px] uppercase font-semibold">Authorization Tier</span>
              <span className="text-on-surface font-semibold">Verified Primary Individual Profile</span>
            </div>
          </div>

          <label className="flex items-start gap-3 cursor-pointer p-3 rounded-xl bg-surface hover:bg-surface-container-low transition-colors text-xs">
            <input
              type="checkbox"
              checked={consentConfirmed}
              onChange={(e) => setConsentConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant cursor-pointer shrink-0"
            />
            <div className="text-on-surface">
              <span className="font-bold block text-sm mb-0.5">Consent & Examination Verification</span>
              <span className="text-on-surface-variant leading-relaxed">
                I confirm patient identity and active clinical episode consent for detailed dental examination in accordance with DHA Section 10 standards.
              </span>
            </div>
          </label>

          <div className="space-y-2 pt-1">
            <button
              type="button"
              disabled={!consentConfirmed}
              onClick={handleContinue}
              className="w-full bg-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed text-on-primary font-bold text-sm py-3 px-4 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
            >
              <span>Select Patient & Continue to Template Selection</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="w-full bg-surface-container text-on-surface-variant hover:text-on-surface font-semibold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="refresh" className="text-sm" />
              <span>Cancel / Search Again</span>
            </button>
          </div>
        </section>

        {/* Clinical Rule Notice (Safeguard Banner) */}
        <section className="bg-surface-container-high rounded-2xl p-4 shadow-xs flex items-start gap-3 text-xs border border-outline-variant/20">
          <div className="w-8 h-8 rounded-xl bg-surface-container-highest text-primary flex items-center justify-center shrink-0">
            <Icon name="gavel" className="text-base" />
          </div>
          <div>
            <span className="uppercase text-[10px] font-bold text-secondary tracking-wider block mb-0.5">
              Clinical Rule DHA-SEC10-REG04
            </span>
            <h4 className="font-bold text-on-surface">Dentist Self-Recording Safeguard Active</h4>
            <p className="text-on-surface-variant mt-0.5 leading-relaxed">
              Dr. Daniel James is authenticated. Clinicians cannot conduct or record self-examinations under UAE federal clinical safety governance protocols.
            </p>
          </div>
        </section>
      </div>
    </ExaminationShell>
  );
}
export default PatientSelectionConfirmationScreen;

