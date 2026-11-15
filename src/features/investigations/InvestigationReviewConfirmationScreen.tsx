import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { InvestigationShell } from './InvestigationShell';
import { Icon } from '../../design/Primitives';

export function InvestigationReviewConfirmationScreen() {
  const navigate = useNavigate();
  const [attest1, setAttest1] = useState(true);
  const [attest2, setAttest2] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ingestedSuccess, setIngestedSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCommitIngestion = () => {
    if (!attest1 || !attest2) {
      showToast('Please confirm all statutory attestations prior to clinical commit.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIngestedSuccess(true);
      showToast('Diagnostic study committed to NABIDH repository #DHA-REC-9014!');
    }, 1200);
  };

  const handleDiscard = () => {
    if (window.confirm('Are you sure you want to discard this intake batch? All uncommitted DICOM buffers will be purged.')) {
      navigate('/investigations/awaiting-results');
    }
  };

  return (
    <InvestigationShell
      pageTitle="Verification & Ingestion Gate"
      badgeCode="11.12"
      badgeLabel="Upload Flow (4/4)"
      currentStep="Final Ingestion"
      orderRef="REQ-2025-0914"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <Icon name="check_circle" className="text-emerald-400 text-lg" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Progress Step Bar */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-primary font-bold uppercase tracking-wider">Step 4 of 4</span>
            <span className="text-on-surface-variant font-medium">Final Ingestion Gate</span>
          </div>
          <div className="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500 w-full" />
          </div>
          <div className="flex items-center justify-between pt-1">
            <h2 className="text-base sm:text-lg font-bold text-on-surface">Verification & Ingestion</h2>
            <div className="flex items-center gap-1.5 text-secondary text-xs font-bold font-mono">
              <Icon name="verified_user" className="text-sm text-secondary" />
              <span>NABIDH-READY</span>
            </div>
          </div>
        </div>

        {/* Duplicate Detection & Integrity Gate Banner */}
        <div className="bg-secondary-container/30 border border-secondary/30 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="policy" className="text-xl" />
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-on-surface">Zero Duplicate Conflicts Detected</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-secondary/15 text-secondary">
                HASH MATCH: 0% (UNIQUE)
              </span>
            </div>
            <p className="text-on-surface-variant mt-1 leading-relaxed">
              No identical DICOM series instance UID exists in the DHA central repository or the NABIDH health exchange network.
            </p>
          </div>
        </div>

        {/* Pre-Commit Manifest Card */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 overflow-hidden shadow-xs">
          <div className="p-4 sm:p-5 bg-surface-container-low/50 border-b border-outline-variant/20 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold text-outline uppercase tracking-wider block">
                Pre-Commit Manifest
              </span>
              <h3 className="font-bold text-base text-on-surface">Diagnostic Media Intake</h3>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
              <span>Ready for Commit</span>
            </div>
          </div>

          <div className="p-5 space-y-4">
            {/* Patient Card */}
            <div className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/20">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
                CO
              </div>
              <div className="flex-1 min-w-0 text-xs">
                <h4 className="font-bold text-sm text-on-surface">Chinedu Okafor</h4>
                <p className="text-on-surface-variant font-mono">DHA-10482 • 34y Male • Blood: O+</p>
              </div>
            </div>

            {/* Linked Order & Encounter */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
                <span className="text-[10px] text-outline uppercase block">Linked Order</span>
                <span className="font-bold text-on-surface font-mono">#REQ-2025-0914</span>
                <span className="text-on-surface-variant block text-[11px] mt-0.5">Dr. Daniel James</span>
              </div>
              <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/20">
                <span className="text-[10px] text-outline uppercase block">Clinical Encounter</span>
                <span className="font-bold text-on-surface font-mono">#EXAM-DHA-2025-0982</span>
                <span className="text-on-surface-variant block text-[11px] mt-0.5">Comprehensive Dental Exam</span>
              </div>
            </div>

            {/* FDI Anatomical Association Bar */}
            <div className="pt-2 border-t border-outline-variant/20 space-y-2">
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                FDI Anatomical Association
              </span>
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-on-primary font-bold shadow-xs">
                  <Icon name="dentistry" className="text-sm" />
                  <span>FDI #16</span>
                  <span className="text-[10px] opacity-80 pl-1 font-normal">Primary Target (Max. R 1st Molar)</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container font-medium text-on-surface">
                  <span className="font-bold">FDI #15</span>
                  <span className="text-on-surface-variant text-[11px]">(UR Premolar)</span>
                </div>
                <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container font-medium text-on-surface">
                  <span className="font-bold">FDI #46</span>
                  <span className="text-on-surface-variant text-[11px]">(Antagonist)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ingested Files Digest (2 Files) */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold text-outline uppercase tracking-wider block">
                Payload Manifest
              </span>
              <h3 className="font-bold text-sm sm:text-base text-on-surface">Ingested Files Digest (2 Files)</h3>
            </div>
            <span className="font-mono text-xs font-bold bg-surface-container px-2.5 py-1 rounded-lg text-on-surface-variant">
              27.0 MB TOTAL
            </span>
          </div>

          {/* File 1 */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
            <div className="w-14 h-14 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner text-white font-mono font-bold text-[10px]">
              <div className="absolute inset-0 bg-radial-gradient from-slate-700 to-black opacity-80" />
              <span className="relative z-10">BW-R</span>
              <span className="absolute bottom-0 right-0 bg-primary text-white text-[8px] font-bold px-1 rounded-tl">
                DCM
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-on-surface truncate">BW_Right_Molar_Exp01.dcm</span>
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                14.2 MB • Lossless 16-bit DICOM • 2400x3000px
              </p>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-outline">
                <Icon name="fingerprint" className="text-xs" />
                <span className="truncate">sha256:4a8f9c2d1e09bc489...102a</span>
              </div>
            </div>
          </div>

          {/* File 2 */}
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 text-xs">
            <div className="w-14 h-14 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center shrink-0 relative overflow-hidden shadow-inner text-white font-mono font-bold text-[10px]">
              <div className="absolute inset-0 bg-radial-gradient from-slate-700 to-black opacity-80" />
              <span className="relative z-10">PA-16</span>
              <span className="absolute bottom-0 right-0 bg-primary text-white text-[8px] font-bold px-1 rounded-tl">
                DCM
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="font-bold text-on-surface truncate">PA_Tooth16_Apex_Exp02.dcm</span>
                <Icon name="check_circle" className="text-secondary text-base shrink-0" />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                12.8 MB • Lossless 16-bit DICOM • 2100x2900px
              </p>
              <div className="flex items-center gap-1 mt-1 text-[10px] font-mono text-outline">
                <Icon name="fingerprint" className="text-xs" />
                <span className="truncate">sha256:7c2b014f3a88d7211...883e</span>
              </div>
            </div>
          </div>
        </div>

        {/* Provenance & Attribution Card */}
        <div className="bg-surface rounded-2xl border border-outline-variant/30 p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="domain_verification" className="text-primary text-lg" />
            <h3 className="font-bold text-sm text-on-surface">Provenance & Attribution</h3>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant">Clinical Facility</span>
              <span className="font-bold text-on-surface">DHA Central Dental Clinic (Suite 4 Dexis)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant">Certified Radiographer</span>
              <span className="font-bold text-on-surface">Nurse Zainab Tariq (RN-9428)</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-surface-container-low">
              <span className="text-on-surface-variant">Capture Timestamp</span>
              <span className="font-bold text-on-surface font-mono">16 Feb 2025, 09:40 GST</span>
            </div>
          </div>
        </div>

        {/* Statutory Clinical Attestation */}
        <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 shadow-xs space-y-3 text-xs text-amber-950">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Icon name="gavel" className="text-lg text-amber-700" />
            <span>Statutory Clinical Attestation</span>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={attest1}
                onChange={(e) => setAttest1(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer shrink-0"
              />
              <span className="leading-relaxed">
                I confirm these diagnostic files correspond strictly to patient{' '}
                <strong>Chinedu Okafor (DHA-10482)</strong> and that image acquisition complied with ALARA radiation hygiene standards.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={attest2}
                onChange={(e) => setAttest2(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-primary focus:ring-primary cursor-pointer shrink-0"
              />
              <span className="leading-relaxed">
                I acknowledge that upon ingestion, this record becomes an{' '}
                <strong>immutable clinical asset</strong> with tamper-evident audit logging transmitted directly to the NABIDH ledger.
              </span>
            </label>
          </div>
        </div>

        {/* Ingestion Actions */}
        <div className="space-y-2 pt-2">
          {ingestedSuccess ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-center space-y-3 animate-in zoom-in-95">
              <div className="inline-flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <Icon name="check_circle" className="text-emerald-600 text-xl" />
                <span>Ingested Successfully into DHA Registry #DHA-REC-9014</span>
              </div>
              <p className="text-xs text-emerald-700 max-w-md mx-auto">
                DICOM instances committed to PACS with cryptographic hash verified. You can now perform clinical diagnosis.
              </p>
              <div className="flex items-center justify-center gap-2 pt-1">
                <NavLink
                  to="/investigations/details"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-xs"
                >
                  Perform Radiologic Interpretation (11.4)
                </NavLink>
                <NavLink
                  to="/investigations/dashboard"
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface border border-outline-variant/30 text-on-surface hover:bg-surface-container"
                >
                  Return to Hub
                </NavLink>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCommitIngestion}
                className="w-full py-3.5 px-4 rounded-xl bg-primary text-on-primary font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-primary/95 disabled:opacity-70 transition-all"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting to NABIDH Ledger...</span>
                  </>
                ) : (
                  <>
                    <Icon name="lock" className="text-base" />
                    <span>Confirm & Ingest into Registry (11.13)</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/investigations/upload/association')}
                className="w-full py-2.5 px-4 rounded-xl bg-surface border border-outline-variant/30 text-on-surface font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-surface-container transition-colors shadow-xs"
              >
                <Icon name="arrow_back" className="text-base" />
                <span>Back to Edit Association</span>
              </button>

              <button
                type="button"
                onClick={handleDiscard}
                className="w-full py-2 text-rose-600 hover:text-rose-700 hover:underline text-xs font-semibold text-center transition-colors"
              >
                Discard & Cancel Upload
              </button>
            </>
          )}
        </div>
      </div>
    </InvestigationShell>
  );
}

