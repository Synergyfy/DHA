import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function OrganisationRegistrationDetailsScreen() {
  const navigate = useNavigate();

  // Corporate credentials
  const [rcNumber, setRcNumber] = useState('RC-1492084');
  const [isVerifyingRc, setIsVerifyingRc] = useState(false);
  const [rcVerified, setRcVerified] = useState(true);
  const [entityType, setEntityType] = useState('ltd');
  const [incorporationDate, setIncorporationDate] = useState('2018-04-12');
  const [cacCertUploaded, setCacCertUploaded] = useState(true);

  // Healthcare licensing
  const [licenceNumber, setLicenceNumber] = useState('FCT-HEFAMAA-DENT-0842');
  const [issuingAuthority, setIssuingAuthority] = useState('FCT Health & Human Services Secretariat (HHSS)');
  const [issueDate, setIssueDate] = useState('2024-10-01');
  const [expiryDate, setExpiryDate] = useState('2026-10-01');
  const [radiationPermit, setRadiationPermit] = useState('NNRA-RAD-DEN-4491');
  const [wasteContract, setWasteContract] = useState('MED-WASTE-ABJ-2026-88');

  // Pre-audit readiness checks
  const [sterilizationChecked, setSterilizationChecked] = useState(true);
  const [fireSafetyChecked, setFireSafetyChecked] = useState(true);
  const [indemnityChecked, setIndemnityChecked] = useState(true);

  const handleVerifyRc = () => {
    setIsVerifyingRc(true);
    setTimeout(() => {
      setIsVerifyingRc(false);
      setRcVerified(true);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/clinic-onboarding/profile-services');
  };

  return (
    <ClinicOnboardingShell
      currentStep={4}
      totalSteps={6}
      stepTitle="Registration Details"
      stepCategory="Regulatory Compliance"
    >
      <div className="max-w-3xl mx-auto">
        {/* Title Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.6</span> &bull; <span>Statutory Accreditations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Statutory Registration &amp; Facility Licensing
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Provide company registration certificates, state healthcare facility operating licenses, and radiation safety permits.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Card 1: CAC Corporate Credentials */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="business" className="text-primary text-base" />
                Corporate Affairs Commission (CAC) Credentials
              </h3>
              {rcVerified && (
                <span className="text-[11px] font-semibold text-secondary flex items-center gap-1">
                  <Icon name="verified" className="text-xs" /> CAC Active Node
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Registration / RC Number <span className="text-error">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={rcNumber}
                    onChange={(e) => {
                      setRcNumber(e.target.value);
                      setRcVerified(false);
                    }}
                    className="flex-1 px-3 py-2 text-xs sm:text-sm font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyRc}
                    disabled={isVerifyingRc || rcVerified}
                    className="px-3 py-2 text-xs font-semibold rounded-xl bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-60"
                  >
                    {isVerifyingRc ? 'Verifying...' : rcVerified ? 'Verified' : 'Verify'}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Entity Legal Structure <span className="text-error">*</span>
                </label>
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                >
                  <option value="ltd">Private Limited Liability Company (LTD)</option>
                  <option value="business_name">Registered Business Name (Enterprise)</option>
                  <option value="ngo">Incorporated Trustees / Healthcare Foundation</option>
                  <option value="plc">Public Limited Company (PLC)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                Date of Incorporation <span className="text-error">*</span>
              </label>
              <input
                type="date"
                required
                value={incorporationDate}
                onChange={(e) => setIncorporationDate(e.target.value)}
                className="w-full sm:w-1/2 px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>

            {/* Certificate Upload */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-on-surface mb-1.5">
                CAC Certificate of Incorporation Document
              </label>
              {cacCertUploaded ? (
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Icon name="picture_as_pdf" className="text-xl" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">CAC_Certificate_RC1492084.pdf</p>
                      <p className="text-[11px] text-on-surface-variant">1.2 MB &bull; Digitally Validated</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setCacCertUploaded(false)}
                    className="text-xs font-semibold text-error hover:underline px-2 py-1"
                  >
                    Replace
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => setCacCertUploaded(true)}
                  className="cursor-pointer border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-4 text-center bg-surface-container-low/50"
                >
                  <Icon name="upload_file" className="text-2xl text-primary mb-1 mx-auto" />
                  <p className="text-xs font-semibold text-on-surface">Upload CAC Certificate (PDF or Image)</p>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Healthcare Facility Operating License */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
                <Icon name="local_police" className="text-primary text-base" />
                Healthcare Facility Operating License
              </h3>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container">
                Active &bull; 23 Mos Remaining
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Facility Operating License Number <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={licenceNumber}
                  onChange={(e) => setLicenceNumber(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Issuing Authority / State Board <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={issuingAuthority}
                  onChange={(e) => setIssuingAuthority(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">License Issue Date</label>
                <input
                  type="date"
                  required
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">License Expiry Date</label>
                <input
                  type="date"
                  required
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Radiation Safety Permit (NNRA)
                </label>
                <input
                  type="text"
                  value={radiationPermit}
                  onChange={(e) => setRadiationPermit(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Required for CBCT &amp; Dental Intraoral X-ray</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1.5">
                  Clinical Biohazard Waste Disposal Contract
                </label>
                <input
                  type="text"
                  value={wasteContract}
                  onChange={(e) => setWasteContract(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm font-mono rounded-xl border border-outline-variant bg-surface focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <span className="text-[10px] text-on-surface-variant mt-1 block">Certified sharps &amp; biohazardous consignment ID</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pre-Audit Readiness Checklist */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 space-y-3 shadow-sm">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="fact_check" className="text-primary text-base" />
              Pre-Audit Facility Readiness
            </h3>

            <div className="space-y-2.5">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={sterilizationChecked}
                  onChange={(e) => setSterilizationChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-on-surface block">
                    Sterilization Room &amp; Class B Autoclave Protocol Active
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Daily biological indicator spore tests maintained</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={fireSafetyChecked}
                  onChange={(e) => setFireSafetyChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-on-surface block">
                    Fire Safety &amp; Emergency Exit Clearance
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Annual fire service inspection certificate verified</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={indemnityChecked}
                  onChange={(e) => setIndemnityChecked(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary border-outline-variant"
                />
                <div className="flex-1">
                  <span className="text-xs font-semibold text-on-surface block">
                    Active Clinical Indemnity / Medical Malpractice Cover
                  </span>
                  <span className="text-[11px] text-on-surface-variant">Institutional coverage for all attending dental surgeons</span>
                </div>
              </label>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/representative-details')}
              className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
            >
              Back
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
            >
              <span>Continue to Clinic Profile &amp; Services</span>
              <Icon name="arrow_forward" className="text-base" />
            </button>
          </div>
        </form>
      </div>
    </ClinicOnboardingShell>
  );
}
