import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function TreatmentConsentManagementScreen() {
  const navigate = useNavigate();

  // Chairside Checklist state
  const [checklist, setChecklist] = useState({
    informed: true,
    questions: true,
    anesthesia: true,
    revocation: true,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [signatureDone, setSignatureDone] = useState(false);

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const completedChecksCount = Object.values(checklist).filter(Boolean).length;
  const allChecksComplete = completedChecksCount === 4;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSignComplete = () => {
    setSignatureDone(true);
    setShowSignatureModal(false);
    showToast('Chairside patient signature captured and authenticated via SHA-256');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Consent Management"
      badgeCode="13.13"
      badgeLabel="Informed Consent Protocol"
      currentStep="13.13"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Icon name="draw" className="text-[#006194] text-xl" />
                <h3 className="font-bold text-slate-900 text-base">Chairside Digital Consent Capture</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSignatureModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Icon name="close" className="text-xl" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Patient: <strong>Amara Okafor</strong> (LifeCode: AE-990-281-DXB) acknowledging surgical consent for <strong>Tooth #16 Biomimetic Composite</strong>.
            </p>

            <div className="p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center h-40 text-center">
              <Icon name="edit" className="text-3xl text-slate-400 mb-1" />
              <span className="text-xs text-slate-500 font-medium">Sign here using stylus or touch screen</span>
              <span className="text-[10px] text-slate-400 mt-1 font-mono">DHA-STYLUS-DIGITAL-CANVAS-v4</span>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
              <span>Witness: Dr. Daniel James (#DEN-48912)</span>
              <span className="font-mono text-[11px] text-[#006194]">UAE PASS Level 3</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSignatureModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSignComplete}
                className="flex-1 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004b73] shadow-sm flex items-center justify-center gap-2"
              >
                <Icon name="verified" className="text-base" />
                <span>Confirm Signature</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Statutory Legal Notice Banner */}
        <div className="bg-[#e2e7ff] rounded-2xl p-4 sm:p-5 shadow-xs relative overflow-hidden border border-blue-200">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#006194] flex items-center justify-center text-white shrink-0 mt-0.5 shadow-xs">
              <Icon name="gavel" className="text-xl" />
            </div>
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[#006194] uppercase tracking-wider">Statutory Protocol</span>
                <span className="bg-[#006194]/10 text-[#006194] px-2 py-0.5 rounded text-[10px] font-bold">
                  UAE Federal Health Law &amp; DHA Dental Standards
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Patient acceptance of treatment cost estimate does not substitute for informed chairside procedural consent. Consent is procedure-specific and must be authenticated prior to irreversible odontological interventions.
              </p>
            </div>
          </div>
        </div>

        {/* Patient Context Dossier Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex items-center justify-center shrink-0 text-[#006194] font-bold">
                <Icon name="person" className="text-2xl" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-base text-slate-900 truncate">Amara Okafor</h2>
                  <span className="bg-[#e2e7ff] text-slate-700 px-2 py-0.5 rounded text-xs font-medium">34y Female</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-0.5">LifeCode: AE-990-281-DXB</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="font-mono text-xs font-bold text-[#006194] block">#TP-2026-089</span>
              <span className="text-[11px] text-slate-500">DHA Section 13.13</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 px-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Icon name="medical_services" className="text-[#006a61] text-base" />
              <span>Attending: <strong>Dr. Daniel James, DDS</strong></span>
              <span className="font-mono text-slate-400">(#DEN-48912)</span>
            </div>
            <span className="bg-teal-50 text-teal-800 border border-teal-200 text-[11px] px-2 py-0.5 rounded-full font-semibold">
              Licensed Attending
            </span>
          </div>
        </div>

        {/* Plan-Level Consent Status Overview Barometer */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="inventory_2" className="text-[#006194] text-lg" />
              <span className="font-bold text-sm text-slate-900">Plan Authorization Track</span>
            </div>
            <span className="text-xs text-slate-500">3 Planned Interventions</span>
          </div>

          {/* Segmented Visual Barometer */}
          <div className="w-full h-2.5 rounded-full bg-slate-100 flex overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${signatureDone ? 'bg-emerald-500' : 'bg-red-500'}`}
              style={{ width: signatureDone ? '0%' : '33.3%' }}
            />
            <div
              className="h-full bg-[#006a61] transition-all duration-500"
              style={{ width: signatureDone ? '100%' : '66.7%' }}
            />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1 text-center">
            <div className={`p-3 rounded-xl border ${signatureDone ? 'bg-slate-50 border-slate-200' : 'bg-red-50 border-red-200'}`}>
              <span className={`text-xl font-extrabold block ${signatureDone ? 'text-slate-400' : 'text-red-700'}`}>
                {signatureDone ? '0' : '1'}
              </span>
              <span className={`text-xs font-semibold ${signatureDone ? 'text-slate-400' : 'text-red-800'}`}>
                Action Req.
              </span>
            </div>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200">
              <span className="text-xl font-extrabold text-[#006a61] block">
                {signatureDone ? '3' : '2'}
              </span>
              <span className="text-xs font-semibold text-[#006a61]">Authorized</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
              <span className="text-xl font-extrabold text-slate-400 block">0</span>
              <span className="text-xs font-semibold text-slate-500">Exempt</span>
            </div>
          </div>
        </div>

        {/* PROCEDURE #1: Full Clinical Dossier (Pending Action / Signed) */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#eaedff] overflow-hidden">
          {/* Header strip with alert status */}
          <div className={`px-5 py-3 flex items-center justify-between ${
            signatureDone ? 'bg-emerald-50 border-b border-emerald-200' : 'bg-red-50 border-b border-red-200'
          }`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <Icon
                name={signatureDone ? 'check_circle' : 'pending_actions'}
                className={`text-xl shrink-0 ${signatureDone ? 'text-emerald-600' : 'text-red-600 animate-pulse'}`}
              />
              <div>
                <span className={`text-xs font-bold uppercase tracking-wider block ${
                  signatureDone ? 'text-emerald-800' : 'text-red-800'
                }`}>
                  {signatureDone ? 'Consent Authenticated' : 'Action Required Prior to Operative Start'}
                </span>
                <span className="font-mono text-[11px] text-slate-500">CONSENT-2026-089-A • v1.0</span>
              </div>
            </div>
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shrink-0 ${
              signatureDone ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
            }`}>
              {signatureDone ? 'Digitally Signed' : 'Pending Signature'}
            </span>
          </div>

          {/* Procedure Core Metadata */}
          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-[#006194] text-white font-mono text-xs px-2.5 py-0.5 rounded-full font-bold">
                  Tooth #16
                </span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-medium">Class II MO</span>
                <span className="text-xs font-mono text-slate-400">CDT D2392</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Direct Biomimetic Resin Composite Restoration (2-Surface)
              </h3>
            </div>

            {/* Clinical Indication */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1 border border-[#eaedff]">
              <div className="flex items-center gap-2 text-[#006194]">
                <Icon name="stethoscope" className="text-base" />
                <span className="text-xs uppercase font-bold tracking-wider">Clinical Indication &amp; Scope</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                Cavitated dentin lesion requiring restorative debridement and adhesive biomimetic composite placement under rubber dam isolation.
              </p>
            </div>

            {/* Known Allergy Warning Interlock */}
            <div className="bg-[#e2e7ff] rounded-xl p-3.5 flex items-start gap-3 border border-blue-200">
              <Icon name="verified_user" className="text-[#006a61] text-lg shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs text-[#006a61] font-bold block uppercase tracking-wider">
                  Pharmacological Safety Countermeasure
                </span>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">
                  Verified <strong className="text-red-700 font-semibold">Penicillin Anaphylaxis</strong> cross-checked against surgical tray. Local anesthetic regimen: <strong>Mepivacaine 3% plain</strong> (Non-beta-lactam analgesia confirmed).
                </p>
              </div>
            </div>

            {/* Clinical Risks & Limitations */}
            <div className="space-y-2">
              <span className="text-xs uppercase text-slate-500 font-bold block tracking-wider">
                Disclosed Procedural Risks &amp; Limits
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Icon name="circle" className="text-slate-400 text-xs mt-1 shrink-0" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Local Anesthesia:</strong> Transient soft tissue numbness, rare localized soreness or hematoma.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Icon name="circle" className="text-slate-400 text-xs mt-1 shrink-0" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Post-Op Sensitivity:</strong> Mild thermal response possible for 7–14 days during resin maturation.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Icon name="circle" className="text-slate-400 text-xs mt-1 shrink-0" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Pulpal Proximal Risk:</strong> Micro-leakage if deep caries approximates the pulp chamber.
                  </p>
                </div>
                <div className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70">
                  <Icon name="circle" className="text-slate-400 text-xs mt-1 shrink-0" />
                  <p className="text-slate-700">
                    <strong className="text-slate-900">Procedure Conversion:</strong> Discovery of irreversible pulpal exposure prompts vital pulp therapy.
                  </p>
                </div>
              </div>
            </div>

            {/* Expected Benefits & Alternatives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-teal-50/60 p-3.5 rounded-xl border border-teal-200">
                <span className="text-[11px] text-[#006a61] font-bold block uppercase tracking-wider mb-1">
                  Anticipated Therapeutic Benefit
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Arrest bacterial caries progression, reinforce coronal tooth architecture, and hermetically seal exposed dentin tubules against pulpal infection.
                </p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-[11px] text-slate-600 font-bold block uppercase tracking-wider mb-1">
                  Disclosed Clinical Alternatives
                </span>
                <p className="text-slate-600 leading-relaxed">
                  CAD/CAM Ceramic Inlay, Indirect Pulp Capping, or Clinical Observation (declined by clinician due to active cavitation velocity).
                </p>
              </div>
            </div>

            {/* Clinician Certification Seal */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between border border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0">
                  <Icon name="verified" className="text-base" />
                </div>
                <div>
                  <span className="text-xs text-slate-900 font-semibold block">Attending Clinician Certification</span>
                  <span className="text-[11px] text-slate-500">Dr. Daniel James, DDS • 14 Oct 2026</span>
                </div>
              </div>
              <Icon name="task_alt" className="text-[#006a61] text-2xl" />
            </div>

            {/* Chairside Discussion Checklist */}
            <div className="bg-[#faf8ff] rounded-xl p-4 space-y-3 border border-[#eaedff]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Chairside Discussion Checklist</span>
                <span className={`text-xs font-bold ${allChecksComplete ? 'text-[#006a61]' : 'text-red-600'}`}>
                  {completedChecksCount} / 4 Completed
                </span>
              </div>
              <div className="space-y-2">
                <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.informed}
                    onChange={() => toggleCheck('informed')}
                    className="mt-0.5 h-4 w-4 rounded accent-[#006194] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700">
                    Patient was verbally informed of treatment risks, benefits, and reasonable alternatives.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.questions}
                    onChange={() => toggleCheck('questions')}
                    className="mt-0.5 h-4 w-4 rounded accent-[#006194] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700">
                    Patient had full opportunity to ask questions and received plain-language clarifications.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.anesthesia}
                    onChange={() => toggleCheck('anesthesia')}
                    className="mt-0.5 h-4 w-4 rounded accent-[#006194] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700">
                    Patient confirmed comprehension of local anesthesia symptoms and post-op care.
                  </span>
                </label>
                <label className="flex items-start gap-2.5 p-2 rounded-lg bg-white border border-slate-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checklist.revocation}
                    onChange={() => toggleCheck('revocation')}
                    className="mt-0.5 h-4 w-4 rounded accent-[#006194] cursor-pointer"
                  />
                  <span className="text-xs text-slate-700">
                    Patient understands the right to revoke consent prior to surgical tissue removal.
                  </span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* PROCEDURE #2: Signed & Authenticated Consent Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-teal-100 text-teal-900 font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                  Tooth #15
                </span>
                <span className="text-xs text-slate-500">Preventive Remineralization</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">Topical Fluoride Varnish &amp; Enamel Therapy</h4>
            </div>
            <div className="flex items-center gap-1 bg-teal-50 text-[#006a61] border border-teal-200 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0">
              <Icon name="check_circle" className="text-sm" />
              <span>Consent Given</span>
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#006a61] flex items-center justify-center shrink-0">
                <Icon name="fingerprint" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block truncate">UAE PASS OTP • 14 Oct 2026, 11:40 GST</span>
                <span className="text-[11px] font-mono text-slate-400 truncate block">Hash: 8f4e2b...39c1 (Valid DHA Audit trail)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Viewing signed consent form for Tooth #15')}
              className="text-[#006194] hover:underline font-semibold flex items-center gap-1 shrink-0"
            >
              <span>View Form</span>
              <Icon name="open_in_new" className="text-sm" />
            </button>
          </div>
        </div>

        {/* PROCEDURE #3: Signed & Authenticated Consent Card */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-start justify-between">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="bg-blue-100 text-[#006194] font-mono text-xs px-2 py-0.5 rounded-full font-bold">
                  Full Arch
                </span>
                <span className="text-xs text-slate-500">Hygiene Protocol</span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 truncate">Comprehensive Periodontal Prophylaxis &amp; Scaling</h4>
            </div>
            <div className="flex items-center gap-1 bg-teal-50 text-[#006a61] border border-teal-200 px-2.5 py-0.5 rounded-full text-xs font-semibold shrink-0">
              <Icon name="check_circle" className="text-sm" />
              <span>Consent Given</span>
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-teal-100 text-[#006a61] flex items-center justify-center shrink-0">
                <Icon name="verified" className="text-base" />
              </div>
              <div className="min-w-0">
                <span className="font-semibold text-slate-900 block truncate">Digital Stylus • 14 Oct 2026, 11:42 GST</span>
                <span className="text-[11px] text-slate-400 truncate block">Witnessed: Dr. Daniel James</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Viewing signed consent form for Full Arch')}
              className="text-[#006194] hover:underline font-semibold flex items-center gap-1 shrink-0"
            >
              <span>View Form</span>
              <Icon name="open_in_new" className="text-sm" />
            </button>
          </div>
        </div>

        {/* Primary Procedural Actions Tray */}
        <div className="space-y-3 pt-2">
          {!signatureDone ? (
            <button
              type="button"
              onClick={() => setShowSignatureModal(true)}
              className="w-full bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md transition-all"
            >
              <Icon name="draw" className="text-lg" />
              <span>Initiate Chairside Patient Signature</span>
            </button>
          ) : (
            <div className="w-full bg-emerald-600 text-white py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-md">
              <Icon name="check_circle" className="text-lg" />
              <span>All 3 Procedures Fully Consented &amp; Authenticated</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Consent request push notification sent to Amara Okafor mobile app via UAE Pass')}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border border-slate-300 shadow-xs transition-colors"
            >
              <Icon name="send_to_mobile" className="text-[#006a61] text-base" />
              <span>Send Request to Patient Mobile App</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Printing statutory physical DHA consent form (DHA-DEC-2026)...')}
              className="w-full bg-white hover:bg-slate-50 text-slate-700 py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-bold border border-slate-300 shadow-xs transition-colors"
            >
              <Icon name="print" className="text-slate-500 text-base" />
              <span>Print Physical DHA Consent Form</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/patient-decision')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Patient Decisions
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/decision-history')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>View Decisions &amp; Consent Audit (13.14)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
