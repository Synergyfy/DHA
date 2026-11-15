import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

interface ChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  checked: boolean;
  isSafety?: boolean;
}

const initialChecklist: ChecklistItem[] = [
  {
    id: 'chk-1',
    title: 'Patient Identity Confirmed',
    subtitle: '#EXAM-2026-1048 • Amara Okafor (DOB: 14 Oct 1992)',
    checked: true,
  },
  {
    id: 'chk-2',
    title: 'Source Clinical Telemetry Reviewed',
    subtitle: 'Sec 9 Odontogram, Sec 10 Exam, Sec 11 Bitewings',
    checked: true,
  },
  {
    id: 'chk-3',
    title: 'Pathology Progression Delta Verified',
    subtitle: 'Baseline vs current acute caries (+2.1mm depth on #16)',
    checked: true,
  },
  {
    id: 'chk-4',
    title: 'Medical Safety Protocol Active',
    subtitle: 'Penicillin Anaphylaxis Protocol actively tagged in Rx pathway',
    checked: true,
    isSafety: true,
  },
  {
    id: 'chk-5',
    title: 'AI Synthesis Calibration Audited',
    subtitle: 'Diagnostic confidence score 94.2% verified by practitioner',
    checked: true,
  },
  {
    id: 'chk-6',
    title: 'Patient Plain-Language Explainer Validated',
    subtitle: 'Flesch-Kincaid 6th Grade reading score: 82',
    checked: true,
  },
  {
    id: 'chk-7',
    title: 'Visibility & Access Bounds Set',
    subtitle: 'Dual record dispatch scheduled for NABIDH sync',
    checked: true,
  },
];

export function SummaryReviewApprovalScreen() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistItem[]>(initialChecklist);
  const [attestationChecked, setAttestationChecked] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>('sec-soap');
  const [isAmendmentOpen, setIsAmendmentOpen] = useState(false);
  const [amendmentText, setAmendmentText] = useState('');
  const [isSealing, setIsSealing] = useState(false);
  const [isSealed, setIsSealed] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const toggleCheck = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const checkedCount = checklist.filter((c) => c.checked).length;

  const toggleAccordion = (id: string) => {
    setOpenAccordion((prev) => (prev === id ? null : id));
  };

  const handleSealRecord = () => {
    if (!attestationChecked) return;
    setIsSealing(true);
    showToast('Generating SHA-256 commit hash...');
    setTimeout(() => {
      setIsSealing(false);
      setIsSealed(true);
      showToast(
        'Record officially sealed by Dr. Daniel James (#DEN-48912) and dispatched to UAE NABIDH exchange!'
      );
      setTimeout(() => navigate('/summaries/dashboard'), 2000);
    }, 1200);
  };

  return (
    <SummaryShell
      pageTitle="Review & Approval"
      badgeCode="12.15"
      badgeLabel="AI Case Verification & Attestation"
      currentStep="Review & Approval"
    >
      <div className="space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 text-sm border border-white/10 animate-fade-in">
            <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Governance Protocol Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="w-11 h-11 rounded-2xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Icon name="verified_user" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-mono text-xs font-bold text-[#006194] uppercase tracking-wider block">
                Clinical Governance Mandate
              </span>
              <h3 className="font-bold text-base sm:text-lg text-[#131b2e] mt-0.5">
                AI Prepares • The Dentist Reviews • The Dentist Approves
              </h3>
              <p className="text-xs sm:text-sm text-[#707881] mt-1 leading-relaxed">
                This dossier remains non-binding and non-published until your active digital attestation is committed to the DHA health registry.
              </p>
            </div>
          </div>
        </section>

        {/* Patient & Clinician Identity Card */}
        <section className="rounded-2xl bg-white p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#ba1a1a]">
                Pending Dentist Sign-Off
              </span>
            </div>
            <span className="font-mono text-xs bg-[#eaedff] px-2.5 py-1 rounded-md text-[#006194] font-semibold">
              DHA-CS-9842
            </span>
          </div>

          {/* Identity details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider block">
                Patient Registry
              </span>
              <h4 className="font-bold text-base text-[#131b2e] mt-1">Amara Okafor</h4>
              <p className="text-xs text-[#707881] mt-0.5">34y Female • #00451</p>
            </div>
            <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff]">
              <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider block">
                Attending Clinician
              </span>
              <h4 className="font-bold text-base text-[#131b2e] mt-1">Dr. Daniel James</h4>
              <p className="text-xs text-[#006a61] font-semibold mt-0.5">DDS • #DEN-48912</p>
            </div>
          </div>

          {/* Dual Record Visibility Pill */}
          <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#eaedff]/60 border border-[#eaedff] text-xs">
            <Icon name="visibility" className="text-[#006194] text-[18px]" />
            <span className="text-[#131b2e]">
              Target Visibility:{' '}
              <strong className="font-semibold text-[#006194]">
                Dual Record (Clinical EMR + Patient Health App)
              </strong>
            </span>
          </div>
        </section>

        {/* Mandatory Review Checklist Widget */}
        <section className="rounded-2xl bg-white p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Icon name="fact_check" className="text-[#006194] text-[22px]" />
              <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">
                Verification Checklist
              </h3>
            </div>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                checkedCount === checklist.length
                  ? 'bg-[#86f2e4] text-[#006a61]'
                  : 'bg-[#eaedff] text-[#006194]'
              }`}
            >
              {checkedCount} / {checklist.length} Checked
            </span>
          </div>
          <p className="text-xs text-[#707881]">
            Complete and confirm each regulatory safeguard checkpoint prior to digital sealing.
          </p>

          {/* Checklist Items */}
          <div className="space-y-2 pt-1">
            {checklist.map((item) => (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex items-start gap-3 p-3 rounded-xl transition-all cursor-pointer select-none border ${
                  item.isSafety
                    ? 'bg-[#fff8f7] border-[#ffdad6]'
                    : item.checked
                    ? 'bg-[#faf8ff] border-[#eaedff]'
                    : 'bg-white border-[#eaedff]'
                }`}
              >
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={() => {}}
                  className={`mt-0.5 w-5 h-5 rounded cursor-pointer ${
                    item.isSafety ? 'accent-[#ba1a1a]' : 'accent-[#006194]'
                  }`}
                />
                <div className="flex flex-col min-w-0">
                  <span
                    className={`text-xs sm:text-sm font-bold ${
                      item.isSafety ? 'text-[#ba1a1a] flex items-center gap-1.5' : 'text-[#131b2e]'
                    }`}
                  >
                    {item.isSafety && <Icon name="warning" className="text-[16px]" />}
                    {item.title}
                  </span>
                  <span className="text-xs text-[#707881] mt-0.5">{item.subtitle}</span>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Interactive Document Preview Accordion */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">
              Dossier Sections Preview
            </h3>
            <span className="text-xs text-[#707881]">3 Segments</span>
          </div>

          {/* Section 1: Clinical SOAP */}
          <div className="rounded-2xl bg-white border border-[#eaedff] shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('sec-soap')}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#faf8ff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] font-bold text-xs shrink-0">
                  01
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                    Clinical Summary (SOAP)
                  </h4>
                  <span className="text-xs text-[#707881]">
                    ICD-10 K02.62 • 2.1mm Pulp Clearance Buffer
                  </span>
                </div>
              </div>
              <Icon
                name={openAccordion === 'sec-soap' ? 'expand_less' : 'expand_more'}
                className="text-[#707881] text-[20px]"
              />
            </button>

            {openAccordion === 'sec-soap' && (
              <div className="px-4 sm:px-6 pb-5 space-y-4 border-t border-[#eaedff] pt-4 animate-fade-in">
                {/* Visual Bitewing Placeholder Asset */}
                <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#131b2e] flex flex-col items-center justify-center text-white/70">
                  <Icon name="radiology" className="text-[48px] text-white/40 mb-1" />
                  <span className="text-xs font-mono">Bitewing Radiograph (Right Sextant)</span>
                  <span className="text-[10px] text-white/50">2.1mm Pulpal Clearance Overlay Active</span>
                  <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/60 text-white text-[10px] font-mono">
                    Bitewing BW-R-1048 • Caries Index: Acute K02.62
                  </span>
                </div>

                <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-[#006194] uppercase tracking-wider block text-xs">
                      Subjective
                    </span>
                    <p className="text-[#131b2e] mt-0.5 leading-relaxed">
                      Patient reports cold sensitivity on upper right quadrant since two weeks. Intermittent throbbing after sugary foods.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#006194] uppercase tracking-wider block text-xs">
                      Objective
                    </span>
                    <p className="text-[#131b2e] mt-0.5 leading-relaxed">
                      Tooth #16 DO cavitated lesion into dentin. Electric Pulp Test (EPT) responsive at normal threshold. Percussion negative.
                    </p>
                  </div>
                  <div>
                    <span className="font-bold text-[#006194] uppercase tracking-wider block text-xs">
                      Assessment
                    </span>
                    <p className="text-[#131b2e] mt-0.5 leading-relaxed font-medium">
                      Reversible Pulpitis secondary to acute dental caries (ICD-10 K02.62). Vital pulp preserved with 2.1mm protective buffer.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Proposed Intervention Plan */}
          <div className="rounded-2xl bg-white border border-[#eaedff] shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('sec-plan')}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#faf8ff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#006a61] font-bold text-xs shrink-0">
                  02
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                    Proposed Intervention Plan
                  </h4>
                  <span className="text-xs text-[#707881]">
                    DHA-RES-2S Composite • Non-Penicillin Contingency
                  </span>
                </div>
              </div>
              <Icon
                name={openAccordion === 'sec-plan' ? 'expand_less' : 'expand_more'}
                className="text-[#707881] text-[20px]"
              />
            </button>

            {openAccordion === 'sec-plan' && (
              <div className="px-4 sm:px-6 pb-5 space-y-4 border-t border-[#eaedff] pt-4 animate-fade-in">
                <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h5 className="font-bold text-sm text-[#131b2e]">Restorative Procedure</h5>
                      <p className="text-xs text-[#707881] mt-0.5">
                        DHA-RES-2S: Disto-Occlusal Composite Resin Restoration under Rubber Dam Isolation.
                      </p>
                    </div>
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#86f2e4] text-[#006a61]">
                      Standard Care
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#eaedff]">
                    <span className="text-xs font-bold text-[#ba1a1a] uppercase tracking-wider block">
                      Allergy Override Applied
                    </span>
                    <div className="p-3 rounded-lg bg-[#ffdad6]/40 mt-1 border border-[#ffdad6]">
                      <p className="text-xs text-[#410002] font-medium leading-relaxed">
                        Standard Amoxicillin blocked. Clindamycin 300mg QDS oral pre-allocated strictly if periapical symptom conversion manifests.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 3: Patient Plain-Language Explainer */}
          <div className="rounded-2xl bg-white border border-[#eaedff] shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleAccordion('sec-patient')}
              className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-[#faf8ff] transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#131b2e] font-bold text-xs shrink-0">
                  03
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base text-[#131b2e] truncate">
                    Patient Plain-Language Explainer
                  </h4>
                  <span className="text-xs text-[#006a61] font-semibold">
                    Flesch-Kincaid Grade 6 • Readiness Confirmed
                  </span>
                </div>
              </div>
              <Icon
                name={openAccordion === 'sec-patient' ? 'expand_less' : 'expand_more'}
                className="text-[#707881] text-[20px]"
              />
            </button>

            {openAccordion === 'sec-patient' && (
              <div className="px-4 sm:px-6 pb-5 space-y-4 border-t border-[#eaedff] pt-4 animate-fade-in">
                <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="chat" className="text-[#006194] text-[18px]" />
                    <span className="font-bold text-xs sm:text-sm text-[#131b2e]">
                      What Amara will read in the DHA Care app:
                    </span>
                  </div>
                  <div className="p-3.5 bg-white rounded-xl border border-[#eaedff] text-xs sm:text-sm text-[#131b2e] leading-relaxed italic">
                    &quot;Amara, we found a small cavity on your upper right molar. The good news is that the nerve inside is healthy and strong! We will clean the tooth and seal it with a tooth-colored filling so you can chew comfortably without cold sensitivity.&quot;
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Review Feedback & Rejection Buttons */}
        <section className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => setIsAmendmentOpen(true)}
            className="flex-1 w-full h-11 px-4 rounded-xl bg-white border border-[#eaedff] text-[#131b2e] font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#faf8ff] shadow-xs active:scale-[0.99]"
          >
            <Icon name="edit_note" className="text-[18px] text-[#006194]" />
            <span>Request Clinical Edits</span>
          </button>
          <button
            type="button"
            onClick={() => {
              const reason = window.prompt('Please state clinical rationale for rejecting AI clinical dossier:');
              if (reason) {
                showToast(`Dossier #DHA-CS-9842 rejected. Clinician reason: "${reason}"`);
              }
            }}
            className="flex-1 w-full h-11 px-4 rounded-xl bg-[#ffdad6]/60 border border-[#ffdad6] text-[#ba1a1a] font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-[#ffdad6] shadow-xs active:scale-[0.99]"
          >
            <Icon name="cancel" className="text-[18px]" />
            <span>Reject AI Draft</span>
          </button>
        </section>

        {/* Attestation & Seal Execution Box */}
        <section className="rounded-2xl bg-white p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="draw" className="text-[#006194] text-[22px]" />
            <h3 className="font-bold text-base sm:text-lg text-[#131b2e]">
              Dentist Digital Attestation
            </h3>
          </div>

          <label
            onClick={() => setAttestationChecked(!attestationChecked)}
            className="flex items-start gap-3 p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] cursor-pointer select-none hover:bg-[#f2f3ff] transition-colors"
          >
            <input
              type="checkbox"
              checked={attestationChecked}
              onChange={() => {}}
              className="mt-1 w-5 h-5 rounded cursor-pointer accent-[#006194]"
            />
            <span className="text-xs sm:text-sm text-[#131b2e] leading-relaxed">
              I, <strong>Dr. Daniel James (#DEN-48912)</strong>, hereby attest that I have personally reviewed all underlying diagnostic data, radiographic examinations, and AI-synthesized clinical parameters. I take full legal and medical responsibility for this dossier.
            </span>
          </label>

          {/* CTA Buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              disabled={!attestationChecked || isSealing || isSealed}
              onClick={handleSealRecord}
              className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-all ${
                isSealed
                  ? 'bg-[#006a61] text-white shadow-md'
                  : attestationChecked && !isSealing
                  ? 'bg-[#006194] hover:bg-[#004e78] text-white shadow-md active:scale-[0.99]'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {isSealing ? (
                <>
                  <Icon name="sync" className="text-[20px] animate-spin" />
                  <span>Generating SHA-256 Commit...</span>
                </>
              ) : isSealed ? (
                <>
                  <Icon name="verified" className="text-[20px]" />
                  <span>Approved &amp; Sealed (UAE NABIDH Synced)</span>
                </>
              ) : (
                <>
                  <Icon name="lock" className="text-[20px]" />
                  <span>Approve &amp; Seal Record</span>
                  <Icon name="arrow_forward" className="text-[18px]" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => showToast('Clinical synthesis saved as uncommitted draft.')}
              className="w-full h-11 rounded-xl bg-transparent text-[#707881] font-semibold text-xs flex items-center justify-center hover:bg-[#faf8ff] transition-colors"
            >
              Save as Unapproved Draft
            </button>
          </div>

          {/* Cryptographic Proof Guarantee */}
          <div className="flex items-center justify-center gap-1.5 pt-2 text-center text-[#707881] text-xs">
            <Icon name="token" className="text-[16px] text-[#006a61]" />
            <p className="font-mono text-[11px]">
              SHA-256 commit hash will seal immediately to UAE NABIDH Health Exchange.
            </p>
          </div>
        </section>

        {/* Interactive Amendment Modal */}
        {isAmendmentOpen && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white rounded-2xl p-6 space-y-4 shadow-xl animate-scale-up">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-base text-[#131b2e]">Request Clinical Changes</h4>
                <button
                  type="button"
                  onClick={() => setIsAmendmentOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-[#faf8ff] flex items-center justify-center text-[#707881]"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>
              <p className="text-xs text-[#707881]">
                Specify annotations for the clinical synthesis engine to regenerate:
              </p>
              <textarea
                rows={3}
                value={amendmentText}
                onChange={(e) => setAmendmentText(e.target.value)}
                placeholder="e.g., Adjust depth margin on #16 to 2.3mm or re-evaluate local anesthesia vasoconstrictor..."
                className="w-full rounded-xl bg-[#faf8ff] border border-[#eaedff] p-3 text-xs sm:text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
              />
              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsAmendmentOpen(false)}
                  className="px-4 h-10 rounded-xl text-xs font-bold text-[#707881] hover:bg-[#faf8ff]"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    showToast('Re-routing dossier with clinician instructions back to synthesis engine.');
                    setIsAmendmentOpen(false);
                    setAmendmentText('');
                  }}
                  className="px-4 h-10 rounded-xl bg-[#006194] text-white text-xs font-bold shadow-xs hover:bg-[#004e78]"
                >
                  Dispatch to AI Agent
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SummaryShell>
  );
}
