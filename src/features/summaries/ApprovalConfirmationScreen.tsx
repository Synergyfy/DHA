import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

export function ApprovalConfirmationScreen() {
  const navigate = useNavigate();
  const [patientAppShare, setPatientAppShare] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const copyHash = () => {
    navigator.clipboard?.writeText('e4b29df83a2108acb12399201bc890c4a91b2e8810c9d7f04');
    showToast('SHA-256 Ledger Receipt copied to clipboard');
  };

  return (
    <SummaryShell
      pageTitle="Approval Confirmation"
      badgeCode="12.16"
      badgeLabel="Attestation Sealed"
      currentStep="Approval Confirmation"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Status Chip / Dossier Header Banner */}
        <div className="bg-white rounded-2xl px-5 py-3 flex items-center justify-between border border-[#eaedff] shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse shrink-0" />
            <span className="text-xs sm:text-sm font-medium text-[#131b2e] truncate">
              Dossier #DHA-CS-9842 Approved &amp; Cryptographically Committed
            </span>
          </div>
          <span className="text-xs font-bold text-[#006a61] flex items-center gap-1 uppercase bg-[#86f2e4]/30 px-2.5 py-1 rounded-full">
            <Icon name="verified" className="text-[16px] text-[#006a61]" />
            <span>Verified</span>
          </span>
        </div>

        {/* Hero Success Card */}
        <section className="relative overflow-hidden bg-white rounded-2xl p-6 sm:p-8 border border-[#eaedff] shadow-sm text-center flex flex-col items-center">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#86f2e4]/20 rounded-full blur-2xl pointer-events-none" />

          {/* Animated Success Ring & Check Icon */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-[#86f2e4]/40 flex items-center justify-center mb-4 shadow-sm">
            <div className="w-14 h-14 rounded-full bg-[#006a61] flex items-center justify-center text-white shadow-md">
              <Icon name="check" className="text-[32px]" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61] mb-2 text-xs font-bold uppercase tracking-wider">
            <Icon name="lock" className="text-[14px]" />
            <span>Officially Sealed • v1.0</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] mb-1">
            Clinical Dossier Approved &amp; Sealed
          </h2>
          <p className="text-xs sm:text-sm text-[#707881] max-w-md leading-relaxed">
            Authoritatively signed by <strong className="text-[#131b2e]">Dr. Daniel James</strong> (DDS, #DEN-48912) on 12 Oct 2026, 11:28 GST
          </p>
        </section>

        {/* Core Patient & Cryptographic Metadata Card */}
        <section className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0">
                  <Icon name="assignment_turned_in" className="text-[24px]" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-[#131b2e]">Amara Okafor</h4>
                  <p className="text-xs text-[#707881]">34y Female • DHA-2026-00451</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61] font-mono text-xs font-bold uppercase">
                NABIDH SYNCED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="flex flex-col justify-center bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[#707881]">Clinical Scope:</span>
                <span className="font-bold text-[#131b2e] mt-0.5">Comprehensive Oral-Health Summary</span>
              </div>
              <div className="flex flex-col justify-center bg-[#faf8ff] p-3 rounded-xl border border-[#eaedff]">
                <span className="text-[#707881]">Commit Timestamp:</span>
                <span className="font-mono text-[#131b2e] mt-0.5">12 Oct 2026 • 11:28:44 GST</span>
              </div>
            </div>
          </div>

          {/* Lower Section: Cryptographic Chain */}
          <div className="bg-[#faf8ff] px-5 py-3.5 border-t border-[#eaedff] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#006a61] font-bold">
              <Icon name="fingerprint" className="text-[18px]" />
              <span>SHA-256 Ledger Receipt</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
              <span className="font-normal text-[#707881]">Verified UAE NABIDH</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="font-mono text-[11px] text-[#707881] bg-white px-3 py-1 rounded-lg border border-[#eaedff] truncate max-w-xs">
                e4b29df83a2108acb12399201bc890c...7f04
              </span>
              <button
                type="button"
                onClick={copyHash}
                className="w-8 h-8 rounded-lg bg-white border border-[#eaedff] flex items-center justify-center text-[#006194] hover:bg-[#eaedff] transition-colors shrink-0"
                title="Copy hash"
              >
                <Icon name="content_copy" className="text-[16px]" />
              </button>
            </div>
          </div>
        </section>

        {/* Document Visibility & Routing Options */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Icon name="share_location" className="text-[#006194] text-[20px]" />
              <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">
                Routing &amp; Distribution
              </h3>
            </div>
            <span className="text-xs text-[#707881]">4 Channels Active</span>
          </div>

          <div className="space-y-3">
            {/* Channel 1: Clinical EMR (Locked) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="local_hospital" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-[#131b2e] truncate">
                    Professional Clinical Record (EMR)
                  </h4>
                  <Icon name="lock" className="text-[#707881] text-[18px]" />
                </div>
                <p className="text-xs text-[#707881] leading-relaxed">
                  Synced automatically to Clinic EHR &amp; encrypted UAE NABIDH Health Registry archive.
                </p>
              </div>
            </div>

            {/* Channel 2: Patient Health App (Interactive Toggle) */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm space-y-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center shrink-0">
                    <Icon name="phone_iphone" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#131b2e]">Patient Health App</h4>
                    <span className="text-[11px] font-bold text-[#006a61] bg-[#86f2e4]/20 px-2 py-0.5 rounded">
                      Patient-Facing Summary
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const next = !patientAppShare;
                    setPatientAppShare(next);
                    showToast(next ? 'Patient app delivery enabled' : 'Patient app delivery disabled');
                  }}
                  className={`w-12 h-6 rounded-full relative transition-colors shrink-0 ${
                    patientAppShare ? 'bg-[#006a61]' : 'bg-[#eaedff]'
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 shadow-xs transition-transform duration-200 ${
                      patientAppShare ? 'right-0.5' : 'left-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] text-xs text-[#707881] leading-relaxed">
                Releasing verified 6th-grade plain-language translation and visual Tooth #16 chart to Amara Okafor&apos;s mobile app. Internal DICOM slices and clinical SOAP codes remain strictly restricted to clinical staff.
              </div>
            </div>

            {/* Channel 3: Dependent / Guardian Access (Disabled) */}
            <div className="bg-white/60 rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-start gap-3 opacity-60">
              <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#707881] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="family_restroom" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-[#131b2e] truncate">
                    Linked Guardian / Dependent Access
                  </h4>
                  <span className="text-[11px] font-bold text-[#707881] uppercase">Inactive</span>
                </div>
                <p className="text-xs text-[#707881] leading-relaxed">
                  Autonomous adult patient; no authorized dependent or legal proxy delegation required.
                </p>
              </div>
            </div>

            {/* Channel 4: Section 13 Treatment Handoff */}
            <div className="bg-[#faf8ff] rounded-2xl p-4 sm:p-5 border border-[#006194]/20 shadow-sm flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="forward" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-sm text-[#006194]">Treatment Planning Handoff</h4>
                  <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#006194] text-xs font-bold">
                    Section 13
                  </span>
                </div>
                <p className="text-xs text-[#131b2e] leading-relaxed mb-2">
                  Transferred to Treatment Planning Queue —{' '}
                  <strong className="text-[#006194]">1 Procedure Pending Scheduling</strong>
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-[#eaedff] text-xs font-medium text-[#131b2e]">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                  Tooth #16 Direct Biomimetic Resin Composite
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Action Controls & Navigation */}
        <section className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/summaries/workspace')}
            className="w-full h-12 bg-[#006194] hover:bg-[#004e78] active:scale-[0.99] transition-transform rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm shadow-md"
          >
            <Icon name="visibility" className="text-[20px]" />
            <span>View Approved Summary (v1.0)</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Signed clinical PDF generated for download')}
              className="h-11 bg-white hover:bg-[#faf8ff] active:scale-[0.99] transition-transform rounded-xl flex items-center justify-center gap-2 text-[#131b2e] font-bold text-xs border border-[#eaedff] shadow-xs"
            >
              <Icon name="picture_as_pdf" className="text-[#006194] text-[18px]" />
              <span>Signed PDF</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Printing clinical dossier')}
              className="h-11 bg-white hover:bg-[#faf8ff] active:scale-[0.99] transition-transform rounded-xl flex items-center justify-center gap-2 text-[#131b2e] font-bold text-xs border border-[#eaedff] shadow-xs"
            >
              <Icon name="print" className="text-[#707881] text-[18px]" />
              <span>Print Dossier</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => navigate('/summaries/dashboard')}
              className="h-11 bg-[#faf8ff] hover:bg-[#eaedff] rounded-xl flex items-center justify-center gap-2 text-[#006194] font-bold text-xs border border-[#eaedff] transition-colors"
            >
              <Icon name="space_dashboard" className="text-[18px]" />
              <span>Return to AI Dashboard (12.1)</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/summaries/history')}
              className="h-11 bg-[#faf8ff] hover:bg-[#eaedff] rounded-xl flex items-center justify-center gap-2 text-[#006a61] font-bold text-xs border border-[#eaedff] transition-colors"
            >
              <span>Summary History &amp; Versions (12.17)</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
        </section>

        {/* Statutory Legal/Clinical Attestation Footer */}
        <section className="bg-[#faf8ff] rounded-2xl p-4 border border-[#eaedff]">
          <div className="flex items-start gap-3">
            <Icon name="policy" className="text-[#707881] text-[20px] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider block">
                Statutory Clinical Attestation
              </span>
              <p className="text-xs text-[#707881] leading-relaxed">
                This summary has transitioned from AI Draft to an authorized medical-legal record. Further adjustments require creating an explicit formal amendment (v1.1) with recorded clinical rationale.
              </p>
            </div>
          </div>
        </section>
      </div>
    </SummaryShell>
  );
}
