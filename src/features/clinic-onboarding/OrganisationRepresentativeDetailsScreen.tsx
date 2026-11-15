import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function OrganisationRepresentativeDetailsScreen() {
  const navigate = useNavigate();
  const [solemnAffirmed, setSolemnAffirmed] = useState(false);
  const [resolutionUploaded, setResolutionUploaded] = useState(true);

  const handleProceed = () => {
    if (!solemnAffirmed) return;
    navigate('/clinic-onboarding/registration-details');
  };

  return (
    <ClinicOnboardingShell
      currentStep={4}
      totalSteps={6}
      stepTitle="Representative Mandate"
      stepCategory="Legal Representation"
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Title Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <span>Stage 15.5</span> &bull; <span>Legal Representation Mandate</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Authorised Representative &amp; Clinical Lead
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
            Confirm the legal delegation and statutory identity credentials of the primary signatory representing Greenfield Dental Clinics Limited.
          </p>
        </div>

        {/* Bento Card: Representative Profile */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-heading font-bold text-xl shadow-md shadow-primary/20">
                AB
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-heading font-bold text-base sm:text-lg text-on-surface">
                    Dr. Amina Bello
                  </h3>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container">
                    <Icon name="verified" className="text-xs" /> Tier 1 Verified
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Medical Director &bull; Lead Implantologist &amp; Oral Surgeon
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] uppercase font-bold text-primary block">DHA Practitioner Record</span>
              <span className="text-xs font-bold font-mono text-on-surface">MDCN #DEN-78421</span>
            </div>
          </div>

          {/* Credential Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 text-xs">
            <div>
              <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Institutional Role</span>
              <span className="font-semibold text-on-surface">Statutory Clinical Director</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Verified Email</span>
              <span className="font-mono text-on-surface text-[11px] truncate block">amina.bello@greenfielddental.ng</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Direct Mobile</span>
              <span className="font-mono text-on-surface text-[11px]">+234 803 555 0192</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-on-surface-variant">
              <Icon name="domain" className="text-base text-primary" />
              <span>Affiliated Facility: <strong className="text-on-surface">Greenfield Dental Clinic Ltd</strong> (#DXB-9021)</span>
            </div>
            <span className="text-[11px] font-semibold text-secondary flex items-center gap-1">
              <Icon name="check_circle" className="text-xs" /> Active Good Standing
            </span>
          </div>
        </div>

        {/* Card: Delegation of Authority (Board Resolution Document) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
              <Icon name="gavel" className="text-primary text-base" />
              Corporate Mandate &amp; Board Delegation
            </h3>
            <span className="text-[11px] font-semibold text-secondary flex items-center gap-1">
              <Icon name="lock" className="text-xs" /> Statutory Requirement
            </span>
          </div>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Healthcare facilities operated by corporate entities must submit a certified Board Resolution or Power of Attorney empowering the designated representative as legal signatory on the DHA portal.
          </p>

          {resolutionUploaded ? (
            <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-error/10 text-error flex items-center justify-center shrink-0">
                  <Icon name="picture_as_pdf" className="text-2xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-bold text-on-surface">Board_Resolution_Greenfield_2026.pdf</p>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary-container text-on-secondary-container">
                      Notarized
                    </span>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    1.4 MB &bull; Resolution 2026-BOD-04 &bull; Verified Digital Stamp
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => alert('Previewing notarized resolution document...')}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-outline-variant hover:bg-surface-container transition-colors"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() => setResolutionUploaded(false)}
                  className="text-xs font-semibold text-error hover:underline px-2 py-1"
                >
                  Replace
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => setResolutionUploaded(true)}
              className="cursor-pointer border-2 border-dashed border-outline-variant hover:border-primary rounded-xl p-5 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors"
            >
              <Icon name="upload_file" className="text-3xl text-primary mb-1 mx-auto" />
              <p className="text-xs font-semibold text-on-surface">Click to upload Board Resolution (PDF)</p>
              <p className="text-[10px] text-on-surface-variant mt-0.5">Signed by majority directors with corporate seal</p>
            </div>
          )}
        </div>

        {/* Card: Digital Identity Attestation (UAE PASS / NIN Token) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
          <h3 className="text-sm font-heading font-bold text-on-surface flex items-center gap-2">
            <Icon name="fingerprint" className="text-primary text-base" />
            Digital Identity Attestation
          </h3>

          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container/60 text-secondary flex items-center justify-center shrink-0">
                <Icon name="verified_user" className="text-xl" />
              </div>
              <div>
                <span className="font-bold text-on-surface block">Biometric Identity Attested</span>
                <span className="font-mono text-[11px] text-on-surface-variant">NIN-SHA256: 9e8a-44c1-bf99-81aa</span>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[10px] font-semibold text-on-surface-variant block">Verification Timestamp</span>
              <span className="text-[11px] font-mono text-on-surface">2026-11-14 20:15 UTC</span>
            </div>
          </div>
        </div>

        {/* Statutory Solemn Declaration Checkbox */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border-2 border-primary/20 space-y-2">
          <label className="flex items-start gap-3.5 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={solemnAffirmed}
              onChange={(e) => setSolemnAffirmed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded text-primary focus:ring-primary border-outline-variant"
            />
            <span className="text-xs sm:text-sm text-on-surface leading-relaxed">
              <strong>Statutory Declaration:</strong> I, <strong>Dr. Amina Bello</strong>, solemnly declare under penalty of perjury that I am empowered by the Board of Directors of <strong>Greenfield Dental Clinics Limited</strong> to execute this DHA registration, submit certified clinical documentation, and accept regulatory inspections.
            </span>
          </label>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between gap-4 pt-2">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/organisation-info')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleProceed}
            disabled={!solemnAffirmed}
            className={`px-6 py-2.5 rounded-xl font-heading font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md ${
              solemnAffirmed
                ? 'bg-primary text-white hover:bg-primary/90 shadow-primary/20'
                : 'bg-surface-container text-on-surface-variant/40 cursor-not-allowed shadow-none'
            }`}
          >
            <span>Confirm Authority &amp; Proceed</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>
      </div>
    </ClinicOnboardingShell>
  );
}
