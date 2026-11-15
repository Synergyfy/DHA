import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function VerificationDocumentUploadScreen() {
  const navigate = useNavigate();
  const [radiationUploaded, setRadiationUploaded] = useState(false);
  const [radiationFileName, setRadiationFileName] = useState('');
  const [biohazardUploaded, setBiohazardUploaded] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  const handleSimulateRadiationUpload = () => {
    setRadiationUploaded(true);
    setRadiationFileName('NNRA_Radiation_Permit_2026.pdf (3.4 MB)');
  };

  const handleSaveDraft = () => {
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2000);
  };

  const handleContinue = () => {
    navigate('/clinic-onboarding/document-review');
  };

  return (
    <ClinicOnboardingShell
      currentStep={8}
      totalSteps={8}
      stepTitle="Verification Documents"
      stepCategory="Legal & Accreditation Uploads"
      onSaveDraft={handleSaveDraft}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress & Context Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
            <Icon name="verified_user" className="text-sm" />
            <span>DHA SEC 15.10 &bull; Statutory Compliance Uploads</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
            Legal &amp; Regulatory Accreditation Dossier
          </h2>
          <p className="text-xs sm:text-sm text-on-surface-variant flex items-center gap-1.5 mt-1">
            <Icon name="lock" className="text-xs text-secondary" />
            All uploads are AES-256 encrypted at rest and cross-referenced with federal regulatory registries.
          </p>
        </div>

        {/* Entity Profile Banner */}
        <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3.5 shadow-sm">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon name="domain" className="text-2xl" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-heading font-bold text-sm text-on-surface truncate">
                Greenfield Dental Clinic Ltd
              </h3>
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-secondary-container/60 text-on-secondary-container">
                RC-1489201
              </span>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Organisation Type: <strong className="text-on-surface">Dental Clinic (Private Outpatient Practice)</strong>. Requirements dynamically tailored to outpatient sedation &amp; radiology standards.
            </p>
          </div>
        </div>

        {/* Upload Slots Flow */}
        <div className="space-y-4">
          {/* Slot 1: CAC Certificate (Uploaded) */}
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                <h4 className="font-heading font-bold text-sm text-on-surface">CAC Certificate of Incorporation</h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                <Icon name="check_circle" className="text-xs" /> Verified
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="picture_as_pdf" className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface truncate">CAC_Cert_Greenfield_Dental_Ltd.pdf</p>
                  <p className="text-[11px] text-on-surface-variant">2.4 MB &bull; 256-bit AES Sealed &bull; Verified</p>
                </div>
              </div>
              <Icon name="task_alt" className="text-secondary text-xl shrink-0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-surface-container-high/30 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Doc Number</span>
                <span className="font-mono font-bold text-on-surface">RC-1489201</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Authority</span>
                <span className="font-semibold text-on-surface">Corporate Affairs Comm.</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Issue Date</span>
                <span className="font-semibold text-on-surface">14 Mar 2018</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Expiry</span>
                <span className="font-semibold text-secondary">Perpetual</span>
              </div>
            </div>
          </article>

          {/* Slot 2: Facility Operating Licence (Uploaded) */}
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                <h4 className="font-heading font-bold text-sm text-on-surface">Facility Operating Licence</h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                <Icon name="check_circle" className="text-xs" /> Verified
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="verified" className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface truncate">HEFAMAA_Licence_2025_2027.pdf</p>
                  <p className="text-[11px] text-on-surface-variant">3.8 MB &bull; Active Regulatory Standing</p>
                </div>
              </div>
              <Icon name="task_alt" className="text-secondary text-xl shrink-0" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-surface-container-high/30 text-xs">
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Licence ID</span>
                <span className="font-mono font-bold text-on-surface">FCT-HEFAMAA-0842</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Authority</span>
                <span className="font-semibold text-on-surface">FCT Health Secretariat</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Issue Date</span>
                <span className="font-semibold text-on-surface">10 Jan 2025</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-semibold text-on-surface-variant block">Expiry</span>
                <span className="font-semibold text-secondary">09 Jan 2027</span>
              </div>
            </div>
          </article>

          {/* Slot 3: Proof of Physical Address (Uploaded) */}
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                <h4 className="font-heading font-bold text-sm text-on-surface">Proof of Physical Address</h4>
              </div>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                <Icon name="check_circle" className="text-xs" /> Uploaded
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon name="home_pin" className="text-xl" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-on-surface truncate">Tenancy_Agreement_Wuse2.pdf</p>
                  <p className="text-[11px] text-on-surface-variant">4.1 MB &bull; Plot 142 Aminu Kano Cresc.</p>
                </div>
              </div>
              <Icon name="task_alt" className="text-secondary text-xl shrink-0" />
            </div>
          </article>

          {/* Slot 4: Radiation Safety Permit (Action Required / Interactive Upload) */}
          <article className={`p-5 rounded-2xl border transition-all ${radiationUploaded ? 'bg-surface-container-lowest border-outline-variant/30' : 'bg-surface-container-lowest border-error/40 shadow-sm'}`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${radiationUploaded ? 'bg-secondary' : 'bg-error animate-pulse'}`} />
                <div>
                  <h4 className="font-heading font-bold text-sm text-on-surface">Radiation Safety &amp; X-Ray Permit</h4>
                  <p className="text-[11px] text-error font-medium">Mandatory for Cone Beam CT (CBCT) &amp; Chairside Intraoral Radiography</p>
                </div>
              </div>
              <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${radiationUploaded ? 'bg-secondary-container text-on-secondary-container' : 'bg-error-container text-on-error-container'}`}>
                <Icon name={radiationUploaded ? 'check_circle' : 'priority_high'} className="text-xs" />
                {radiationUploaded ? 'Verified' : 'Action Required'}
              </span>
            </div>

            {radiationUploaded ? (
              <div className="p-3 rounded-xl bg-secondary-container/40 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Icon name="task_alt" className="text-secondary text-xl" />
                  <span className="font-semibold text-on-surface">{radiationFileName}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-secondary">Encrypted &bull; Valid</span>
              </div>
            ) : (
              <div
                onClick={handleSimulateRadiationUpload}
                className="cursor-pointer border-2 border-dashed border-primary/40 hover:border-primary rounded-xl p-6 text-center bg-surface-container-low/50 hover:bg-surface-container-low transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary mx-auto flex items-center justify-center mb-2">
                  <Icon name="cloud_upload" className="text-2xl" />
                </div>
                <p className="text-xs font-bold text-primary">Tap to upload NNRA Radiation Safety Permit</p>
                <p className="text-[11px] text-on-surface-variant mt-0.5">Nigerian Nuclear Regulatory Authority (NNRA) Certificate (PDF, PNG up to 15MB)</p>
              </div>
            )}
          </article>

          {/* Slot 5: Biohazard Disposal (Optional) */}
          <article className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-outline-variant shrink-0" />
                <h4 className="font-heading font-bold text-sm text-on-surface">Waste &amp; Biohazard Disposal Agreement</h4>
              </div>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                Optional
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Clinical sharps, amalgam waste, and biomedical segregation contractor agreements.
            </p>
            {biohazardUploaded ? (
              <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between text-xs">
                <span className="font-semibold text-on-surface">Medical_Waste_Disposal_MoA.pdf (1.2 MB)</span>
                <span className="text-secondary font-bold">Attached</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setBiohazardUploaded(true)}
                className="w-full py-2.5 rounded-xl border border-outline-variant text-primary text-xs font-semibold hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
              >
                <Icon name="add_circle" className="text-base" />
                <span>Attach Biohazard Disposal Agreement</span>
              </button>
            )}
          </article>
        </div>

        {/* Security Notice */}
        <div className="p-4 rounded-xl bg-surface-container-high/60 flex items-center gap-3 text-xs text-on-surface-variant">
          <Icon name="security" className="text-secondary text-2xl shrink-0" />
          <p>
            <strong className="text-on-surface">National Health Act (2014) &amp; MDCN Compliant:</strong> Documents are protected with 256-bit AES encryption at rest and verified cryptographically against national registry databases.
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/operating-hours')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span>Continue to Document Review</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>

        {draftSaved && (
          <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2">
            <Icon name="check" className="text-secondary text-sm" /> Draft saved successfully!
          </div>
        )}
      </div>
    </ClinicOnboardingShell>
  );
}
