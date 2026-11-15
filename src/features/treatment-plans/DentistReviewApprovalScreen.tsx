import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function DentistReviewApprovalScreen() {
  const navigate = useNavigate();

  const [checklist, setChecklist] = useState({
    item1: true,
    item2: true,
    item3: true,
    item4: true,
    item5: true,
    item6: true,
  });

  const [legalAttestation, setLegalAttestation] = useState(true);
  const [releaseToPatientApp, setReleaseToPatientApp] = useState(true);
  const [isApproving, setIsApproving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const isGateOpen = checkedCount === 6 && legalAttestation;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleApprove = () => {
    setIsApproving(true);
    showToast("Treatment Plan Approved & Signed! Dispatched to Amara Okafor's DHA Patient App.");
    setTimeout(() => {
      navigate('/treatment-plans/patient-preview');
    }, 900);
  };

  const handleRevision = () => {
    navigate('/treatment-plans/builder');
  };

  const handleReject = () => {
    if (confirm('Are you sure you want to reject this draft protocol? Clinical rationale must be entered in NABIDH audit trail.')) {
      navigate('/treatment-plans/dashboard');
    }
  };

  return (
    <TreatmentPlanShell
      pageTitle="Plan Review & Dentist Approval"
      badgeCode="13.10"
      badgeLabel="Clinician Sign-off"
      currentStep="Clinical Approval"
    >
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
        {/* Top Notice Alert */}
        <div className="bg-[#cce5ff]/40 rounded-2xl p-4 sm:p-5 border border-[#93ccff]/40 shadow-xs flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                Statutory Review Required
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-[#006194] shadow-xs">
                NABIDH-DHA Sync
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-[#131b2e]">
              Clinical Treatment Plan Final Sign-off
            </h1>
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#006194] text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#006194] animate-pulse"></span>
              <span>Awaiting Attending Dentist Approval</span>
            </div>
          </div>
        </div>

        {/* Patient & Clinician Metadata Ribbon */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0">
                <Icon name="patient_list" className="text-[26px]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-bold text-[#131b2e]">Amara Okafor</h2>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61] font-bold">
                    34y • Female
                  </span>
                </div>
                <p className="text-xs text-[#707881]">MRN: DHA-2026-00451</p>
              </div>
            </div>
            <span className="font-mono text-xs font-bold px-3 py-1 rounded-lg bg-[#cce5ff] text-[#001d31]">
              #TP-2026-089
            </span>
          </div>

          <div className="flex items-center justify-between bg-[#f2f3ff] rounded-xl p-3.5">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#006194] text-white font-bold text-xs flex items-center justify-center">
                DJ
              </div>
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Dr. Daniel James, DDS</p>
                <p className="text-[11px] text-[#707881]">Lic: DEN-48912 • Wuse 2 Harmony Dental Clinic</p>
              </div>
            </div>
            <Icon name="shield_with_heart" className="text-[#006a61] text-[20px]" />
          </div>
        </div>

        {/* Plan Dossier Overview Card */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-[11px] uppercase font-bold text-[#006a61] tracking-wider">
                Treatment Protocol Dossier
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#131b2e] mt-0.5">
                Mesio-Occlusal Direct Restorative &amp; Remineralization
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="dentistry" className="text-[22px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
              <span className="text-[11px] text-[#707881] block">Phases / Items</span>
              <span className="text-base font-bold text-[#131b2e]">2 Phases • 3 Proc</span>
            </div>

            <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
              <span className="text-[11px] text-[#707881] block">Chairtime Est.</span>
              <span className="text-base font-bold text-[#131b2e]">~75 Minutes</span>
            </div>

            <div className="bg-[#f2f3ff] p-3.5 rounded-xl space-y-1">
              <span className="text-[11px] text-[#707881] block">Gross Fee</span>
              <span className="text-base font-extrabold text-[#131b2e]">AED 1,450</span>
            </div>

            <div className="bg-[#89f5e7]/30 border border-[#006a61]/20 p-3.5 rounded-xl space-y-1">
              <span className="text-[11px] text-[#006a61] font-bold block">Patient Copay (20%)</span>
              <span className="text-base font-extrabold text-[#006a61]">AED 290</span>
            </div>
          </div>
        </div>

        {/* Affected Dental Quadrants Miniature */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="location_searching" className="text-[18px] text-[#006194]" />
              <h4 className="text-xs font-bold text-[#131b2e]">Affected Dental Quadrants</h4>
            </div>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#f2f3ff] text-[#707881]">
              Maxillary Right (UR)
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 py-2 bg-[#f2f3ff] rounded-xl p-3">
            <div className="flex flex-col items-center p-2.5 rounded-lg bg-white border border-[#eaedff] shadow-xs">
              <span className="font-mono text-xs font-bold text-[#006194]">#16</span>
              <Icon name="dentistry" className="text-[20px] text-[#006194] my-1" />
              <span className="text-[11px] font-semibold text-[#131b2e]">Restorative</span>
            </div>

            <div className="flex flex-col items-center p-2.5 rounded-lg bg-white border border-[#eaedff] shadow-xs">
              <span className="font-mono text-xs font-bold text-[#006a61]">#15</span>
              <Icon name="healing" className="text-[20px] text-[#006a61] my-1" />
              <span className="text-[11px] font-semibold text-[#131b2e]">Fluoride</span>
            </div>

            <div className="flex flex-col items-center p-2.5 rounded-lg bg-white border border-[#eaedff] shadow-xs">
              <span className="font-mono text-xs font-bold text-[#707881]">Q1–Q4</span>
              <Icon name="clean_hands" className="text-[20px] text-[#707881] my-1" />
              <span className="text-[11px] font-semibold text-[#131b2e]">Prophylaxis</span>
            </div>
          </div>
        </div>

        {/* Statutory 6-Point Clinician Verification Checklist */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="checklist" className="text-[20px] text-[#006a61]" />
              <h4 className="text-sm font-bold text-[#131b2e]">Statutory 6-Point Verification</h4>
            </div>
            <span
              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                checkedCount === 6
                  ? 'bg-[#006a61] text-white'
                  : 'bg-[#f2f3ff] text-[#707881]'
              }`}
            >
              {checkedCount} of 6 Verified
            </span>
          </div>
          <p className="text-xs text-[#707881]">
            Required by UAE NABIDH Dental Charting Standards prior to legal plan authorization.
          </p>

          <div className="space-y-2">
            {[
              {
                key: 'item1' as const,
                title: 'Patient Identity & Encounter Authenticated',
                desc: 'Confirmed chairside against Emirates ID record #EXAM-2026-1048.',
              },
              {
                key: 'item2' as const,
                title: 'Radiographic Indication Validated',
                desc: '2.1mm pulp buffer clearance verified on bitewing x-ray sequence.',
              },
              {
                key: 'item3' as const,
                title: 'Phase Sequence & Dependencies Approved',
                desc: 'Acute direct composite (Phase 1) prioritized prior to recare prophylaxis.',
              },
              {
                key: 'item4' as const,
                title: 'Alternative Options Documented',
                desc: 'Discussed Indirect Onlay & Direct Pulp Capping with patient consent.',
              },
              {
                key: 'item5' as const,
                title: 'Allergy & Pharmacological Cross-Check',
                desc: 'Penicillin anaphylaxis flagged; no non-compliant anesthetics selected.',
              },
              {
                key: 'item6' as const,
                title: 'DHA Unified Clinical Coding Compliance',
                desc: 'Tariffs match UCC-2026 standardized schedule with approved copay ratio.',
              },
            ].map((check) => (
              <label
                key={check.key}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] cursor-pointer transition-colors"
              >
                <input
                  type="checkbox"
                  checked={checklist[check.key]}
                  onChange={(e) => setChecklist({ ...checklist, [check.key]: e.target.checked })}
                  className="mt-0.5 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-[#131b2e] leading-snug">{check.title}</p>
                  <p className="text-[11px] text-[#707881] mt-0.5">{check.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Planned Treatment Breakdown */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Planned Treatment Breakdown
            </h4>
            <span className="text-xs text-[#006194] font-semibold">All items marked ready</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#006194] text-white font-bold text-xs flex items-center justify-center">
                    1
                  </span>
                  <div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-xs font-bold text-[#131b2e]">Tooth #16 Biomimetic Composite</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#cce5ff] text-[#001d31]">
                        Urgent
                      </span>
                    </div>
                    <p className="text-[11px] text-[#707881] mt-0.5">Mesio-occlusal dual-layer resin • CDT D2392</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#131b2e]">AED 850</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-[11px] text-[#707881]">
                <span className="text-[#006a61] font-semibold flex items-center gap-1">
                  <Icon name="check_circle" className="text-[14px]" /> Attending Clinician Approved
                </span>
                <span>45 mins</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#eaedff] text-[#131b2e] font-bold text-xs flex items-center justify-center">
                    2
                  </span>
                  <div>
                    <span className="text-xs font-bold text-[#131b2e]">Preventive &amp; Recare Package</span>
                    <p className="text-[11px] text-[#707881] mt-0.5">
                      Tooth #15 Fluoride (AED 250) + Full Quad Prophy (AED 350)
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#131b2e]">AED 600</span>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-[#eaedff] text-[11px] text-[#707881]">
                <span className="text-[#006a61] font-semibold flex items-center gap-1">
                  <Icon name="check_circle" className="text-[14px]" /> Attending Clinician Approved
                </span>
                <span>30 mins</span>
              </div>
            </div>
          </div>
        </div>

        {/* Formal Attestation & Digital Token Signature */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="draw" className="text-[20px] text-[#006194]" />
            <h4 className="text-sm font-bold text-[#131b2e]">Dentist Digital Attestation</h4>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] leading-relaxed italic border border-[#eaedff]">
            “I, <strong>Dr. Daniel James (#DEN-48912)</strong>, attest that I have formulated and clinically verified
            this treatment plan based on confirmed diagnostic examinations. I assume clinical governance and legal responsibility
            under UAE DHA Federal Health Regulations.”
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={legalAttestation}
              onChange={(e) => setLegalAttestation(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-[#006194] focus:ring-[#006194]"
            />
            <span className="text-xs font-bold text-[#131b2e]">
              I solemnly confirm this electronic signature binds my clinical license.
            </span>
          </label>

          <div className="p-3 bg-[#eaedff] rounded-xl flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon name="vpn_key" className="text-[#006a61] text-[20px] shrink-0" />
              <div className="min-w-0">
                <p className="font-mono font-bold text-[#131b2e] truncate">SIG-NABIDH-20260408-DJ982</p>
                <p className="text-[11px] text-[#707881]">Valid UAE Malpractice Assurance Active</p>
              </div>
            </div>
            <span className="font-bold text-[11px] text-[#006a61] uppercase bg-white px-2 py-0.5 rounded shadow-xs">
              Secured
            </span>
          </div>
        </div>

        {/* Patient Portal Dispatch Toggle */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center shrink-0">
              <Icon name="send_to_mobile" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-[#131b2e]">Release to Patient App</p>
              <p className="text-[11px] text-[#707881] truncate">Plain-Language Summary &amp; Copay Breakdown</p>
            </div>
          </div>

          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={releaseToPatientApp}
              onChange={(e) => setReleaseToPatientApp(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
          </label>
        </div>

        {/* Primary Decision CTAs */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            disabled={!isGateOpen || isApproving}
            onClick={handleApprove}
            className={`w-full h-12 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98] ${
              isGateOpen
                ? 'bg-[#006194] hover:bg-[#007bb9]'
                : 'bg-[#707881] opacity-50 cursor-not-allowed'
            }`}
          >
            <Icon name="thumb_up" className="text-[18px]" />
            <span>Approve Plan &amp; Release to Patient (13.11)</span>
          </button>

          <button
            type="button"
            onClick={handleRevision}
            className="w-full h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-semibold text-xs flex items-center justify-center gap-2 transition-colors border border-[#eaedff]"
          >
            <Icon name="edit_note" className="text-[18px]" />
            <span>Request Revisions / Edit Items</span>
          </button>

          <button
            type="button"
            onClick={handleReject}
            className="w-full py-2.5 text-center text-[#ba1a1a] hover:bg-[#ffdad6]/20 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1"
          >
            <Icon name="cancel" className="text-[16px]" />
            <span>Reject Draft Plan</span>
          </button>
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-full text-xs font-semibold shadow-xl flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[18px] text-[#89f5e7]" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
