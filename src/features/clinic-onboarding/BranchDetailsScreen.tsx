import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function BranchDetailsScreen() {
  const navigate = useNavigate();

  // Branch Identification
  const [branchName, setBranchName] = useState('Greenfield Dental Clinic — Garki Branch');
  const [facilityType, setFacilityType] = useState('Satellite Dental Clinic');

  // Location & Contact
  const [district, setDistrict] = useState('Garki 2');
  const [streetAddress, setStreetAddress] = useState('Plot 108 Mohammadu Buhari Way, Garki 2, Abuja');
  const [landmark, setLandmark] = useState('Near Garki General Hospital');
  const [phone, setPhone] = useState('+234 9 461 8802');
  const [email, setEmail] = useState('garki@greenfielddental.ng');

  // Active Operatories Stepper
  const [suitesCount, setSuitesCount] = useState<number>(2);

  // Services scope
  const [generalChecked, setGeneralChecked] = useState(true);
  const [pediatricChecked, setPediatricChecked] = useState(true);
  const [cleaningsChecked, setCleaningsChecked] = useState(true);
  const [whiteningChecked, setWhiteningChecked] = useState(true);

  const getSuitesSummary = (count: number) => {
    if (count === 1) return 'Suite A (1 Suite)';
    if (count === 2) return 'Suite A & Suite B (2 Suites)';
    if (count === 3) return 'Suites A, B & C (3 Suites)';
    return `${count} Active Surgical Suites`;
  };

  const handleSaveAndContinue = () => {
    navigate('/clinic-onboarding/branch-management');
  };

  return (
    <ClinicOnboardingShell
      currentStep={13}
      totalSteps={18}
      stepTitle="Branch Registration"
      stepCategory="Satellite Facility Details"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Status Context Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-secondary-container text-on-secondary-container">
                Satellite Site #02
              </span>
              <span className="text-xs font-bold text-secondary uppercase tracking-wider">In Review</span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-on-surface">
              Satellite Branch Registration
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Parent Entity: <strong className="text-on-surface">Greenfield Dental Clinic Ltd</strong>
            </p>
          </div>
          <span className="font-mono text-xs font-bold bg-primary-fixed text-primary px-3 py-1 rounded-full self-start sm:self-center">
            GDC-ABJ-002
          </span>
        </div>

        {/* Section 1: Facility Identification */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
            <Icon name="badge" className="text-primary text-xl" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Facility Identification</h3>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Branch Official Name</label>
            <input
              type="text"
              value={branchName}
              onChange={e => setBranchName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Branch Code (System Generated)</label>
              <div className="px-3.5 py-2.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs sm:text-sm font-mono font-bold text-on-surface-variant flex items-center justify-between">
                <span>GDC-ABJ-002</span>
                <Icon name="lock" className="text-sm text-outline" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Facility Type</label>
              <select
                value={facilityType}
                onChange={e => setFacilityType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Satellite Dental Clinic">Satellite Dental Clinic</option>
                <option value="Pediatric Specialist Hub">Pediatric Specialist Hub</option>
                <option value="Dental Diagnostic Centre">Dental Diagnostic Centre</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 2: Physical Location & Contact */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
            <div className="flex items-center gap-2">
              <Icon name="pin_drop" className="text-primary text-xl" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Location &amp; Contact</h3>
            </div>
            <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2.5 py-0.5 rounded-full">
              GPS Geotagged
            </span>
          </div>

          {/* Map Preview Card */}
          <div className="relative h-32 rounded-xl bg-gradient-to-tr from-surface-container-high to-surface-container-highest border border-outline-variant/30 flex items-center justify-center overflow-hidden">
            <div className="text-center p-3">
              <Icon name="near_me" className="text-primary text-2xl mx-auto mb-1 animate-pulse" />
              <span className="font-mono text-xs font-bold text-on-surface">Garki Cadastral Zone II (Abuja Municipal)</span>
              <p className="text-[11px] text-on-surface-variant mt-0.5">Plot 108 Mohammadu Buhari Way &bull; Synced ±1.5m</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">District</label>
              <input
                type="text"
                value={district}
                onChange={e => setDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Prominent Landmark</label>
              <input
                type="text"
                value={landmark}
                onChange={e => setLandmark(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Street Address</label>
            <input
              type="text"
              value={streetAddress}
              onChange={e => setStreetAddress(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Direct Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm font-mono focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Direct Branch Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Clinical Leadership & Capacity */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
            <Icon name="stethoscope" className="text-primary text-xl" />
            <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Leadership &amp; Capacity</h3>
          </div>

          {/* Lead Clinician Card */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center">
                TF
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-primary tracking-wide block">Designated Branch Lead</span>
                <p className="font-heading font-bold text-sm text-on-surface">Dr. Tunde Fashola, BDS</p>
                <p className="font-mono text-xs text-on-surface-variant">MDCN Reg #DEN-65412</p>
              </div>
            </div>
            <Icon name="verified" className="text-secondary text-xl" />
          </div>

          {/* Operatories Stepper */}
          <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-on-surface block">Active Operatories</span>
              <span className="text-[11px] text-on-surface-variant">{getSuitesSummary(suitesCount)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => suitesCount > 1 && setSuitesCount(suitesCount - 1)}
                className="w-8 h-8 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high flex items-center justify-center"
              >
                <Icon name="remove" className="text-sm" />
              </button>
              <span className="font-heading font-bold text-base text-primary w-6 text-center">{suitesCount}</span>
              <button
                type="button"
                onClick={() => suitesCount < 8 && setSuitesCount(suitesCount + 1)}
                className="w-8 h-8 rounded-lg bg-primary text-white hover:bg-primary/90 flex items-center justify-center"
              >
                <Icon name="add" className="text-sm" />
              </button>
            </div>
          </div>
        </div>

        {/* Section 4: Authorized Services Scope */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
            <div className="flex items-center gap-2">
              <Icon name="checklist" className="text-primary text-xl" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Authorized Branch Services</h3>
            </div>
            <span className="text-xs text-on-surface-variant">Clinical Scope</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <input
                type="checkbox"
                checked={generalChecked}
                onChange={e => setGeneralChecked(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="text-xs font-medium text-on-surface">General Dentistry</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <input
                type="checkbox"
                checked={pediatricChecked}
                onChange={e => setPediatricChecked(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="text-xs font-medium text-on-surface">Paediatric Prev.</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <input
                type="checkbox"
                checked={cleaningsChecked}
                onChange={e => setCleaningsChecked(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="text-xs font-medium text-on-surface">Dental Cleanings</span>
            </label>
            <label className="flex items-center gap-2 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
              <input
                type="checkbox"
                checked={whiteningChecked}
                onChange={e => setWhiteningChecked(e.target.checked)}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <span className="text-xs font-medium text-on-surface">Teeth Whitening</span>
            </label>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-high/40 text-xs text-on-surface-variant flex items-start gap-2">
            <Icon name="info" className="text-secondary text-base shrink-0 mt-0.5" />
            <p>
              Complex Oral Surgery and 3D CBCT diagnostic imaging are formally referred to the <strong className="text-on-surface">Wuse 2 Main Branch</strong>.
            </p>
          </div>
        </div>

        {/* Section 5: Tenancy Document Preview */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
            <div className="flex items-center gap-2">
              <Icon name="folder_open" className="text-primary text-xl" />
              <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">Tenancy &amp; Inspection</h3>
            </div>
            <span className="text-[11px] font-bold text-secondary bg-secondary-fixed/50 px-2 py-0.5 rounded-full">
              Verified
            </span>
          </div>

          <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-error/10 text-error flex items-center justify-center">
                <Icon name="picture_as_pdf" className="text-xl" />
              </div>
              <div>
                <p className="font-semibold text-on-surface">Garki_Facility_Tenancy_Lease.pdf</p>
                <p className="text-[11px] text-on-surface-variant">1.9 MB &bull; Digitally Signed</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => alert('Viewing Garki Lease PDF')}
              className="p-1.5 text-on-surface-variant hover:text-on-surface"
            >
              <Icon name="visibility" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Action Dock */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/additional-branches')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleSaveAndContinue}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
            >
              <span>Save Branch &amp; Continue (15.14)</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
