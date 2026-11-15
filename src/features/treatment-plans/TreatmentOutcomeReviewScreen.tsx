import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function TreatmentOutcomeReviewScreen() {
  const navigate = useNavigate();

  const [isFinalized, setIsFinalized] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleFinalize = () => {
    setIsFinalized(true);
    showToast('Longitudinal Chart Synchronized: Tooth #16 MO Composite officially committed to NABIDH.');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Outcome &amp; Review"
      badgeCode="13.19"
      badgeLabel="Post-Operative Evaluation"
      currentStep="13.19"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Top Clinical Context & Encounter Banner */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-[#006a61] border border-teal-200">
              <Icon name="check_circle" className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">NABIDH Verified Sync</span>
            </div>
            <span className="font-mono text-xs font-bold text-slate-500">#ENC-2026-1048</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-900">Post-Operative Clinical Evaluation</h2>
            <p className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
              <Icon name="calendar_today" className="text-sm text-[#006194]" />
              <span>Completed 18 Oct 2026 • 11:42 GST • Operatory 02</span>
            </p>
          </div>

          {/* Patient Strip */}
          <div className="bg-[#faf8ff] rounded-xl p-3.5 flex items-center justify-between border border-[#eaedff]">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shrink-0">
                AO
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">Amara Okafor</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded">34y Female</span>
                </div>
                <p className="font-mono text-xs text-slate-500 mt-0.5">LifeCode: AE-990-281-DXB • Plan #TP-2026-089</p>
              </div>
            </div>
            <Icon name="badge" className="text-[#006194] text-2xl shrink-0" />
          </div>
        </div>

        {/* Section 1: Clinical Treatment Performed Summary */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#006194] text-white font-mono text-xs font-bold uppercase">
                  Tooth #16 • FDI 16
                </span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                  Maxillary Right 1st Molar
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Direct Biomimetic Resin Composite (2-Surface MO)
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="dentistry" className="text-2xl" />
            </div>
          </div>

          {/* Outcome Certified Badge */}
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3.5 flex items-center gap-3">
            <Icon name="verified" className="text-[#006a61] text-2xl shrink-0" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006a61] block">
                Clinical Outcome Certified
              </span>
              <p className="text-xs text-slate-700 font-medium mt-0.5">
                Optimal Anatomical Seal • Zero Micro-Leakage • Pulp Vitality Safely Preserved
              </p>
            </div>
          </div>

          {/* Objective Verification Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-1.5 text-[#006a61] font-bold">
                <Icon name="straighten" className="text-base" />
                <span>Occlusal Clearance</span>
              </div>
              <span className="font-bold text-slate-900 block">Shimstock 8μm Pass</span>
              <span className="text-[11px] text-slate-500 font-mono">Zero premature contact in centric &amp; excursions</span>
            </div>

            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-1.5 text-[#006a61] font-bold">
                <Icon name="drag_indicator" className="text-base" />
                <span>Interproximal Contact #15</span>
              </div>
              <span className="font-bold text-slate-900 block">Tight Floss Resistance</span>
              <span className="text-[11px] text-slate-500 font-mono">Anatomical contact ring intact</span>
            </div>

            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-1.5 text-[#006a61] font-bold">
                <Icon name="bloodtype" className="text-base" />
                <span>Gingival Response</span>
              </div>
              <span className="font-bold text-slate-900 block">Zero Bleeding (BOP -)</span>
              <span className="text-[11px] text-slate-500 font-mono">No soft tissue trauma / rubber dam isolated</span>
            </div>

            <div className="bg-[#faf8ff] rounded-xl p-3 border border-[#eaedff] space-y-1">
              <div className="flex items-center gap-1.5 text-[#006a61] font-bold">
                <Icon name="layers" className="text-base" />
                <span>Layering Protocol</span>
              </div>
              <span className="font-bold text-slate-900 block">Biomimetic Hybrid</span>
              <span className="text-[11px] text-slate-500 font-mono">A2 Dentin / A1 Nanohybrid Enamel</span>
            </div>
          </div>
        </div>

        {/* Section 2: Photographic & Diagnostic Proof */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-sm">
              <Icon name="photo_camera" className="text-[#006194] text-base" />
              <span>Diagnostic &amp; Visual Evidence</span>
            </h4>
            <span className="text-slate-400 font-mono">2 Synchronized Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Icon name="photo_camera" className="text-xl text-teal-400" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Post-Op Clinical Macro</span>
                <span className="text-slate-500 text-[11px] block">Anatomical Cusp Seal • Zero gap</span>
                <span className="text-[10px] font-mono text-[#006194]">18 Oct • High-res Macro</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Icon name="radiology" className="text-xl text-teal-400" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block">Digital Bitewing RVG</span>
                <span className="text-slate-500 text-[11px] block">Pulp space unencroached (2.1mm clear)</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">VERIFIED SEAT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Patient-Facing Translation */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-200 space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#006194] text-white flex items-center justify-center">
                <Icon name="forum" className="text-sm" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Drafted for Amara's Health App</h4>
            </div>
            <span className="font-mono text-[11px] font-bold bg-white text-[#006194] px-2.5 py-0.5 rounded-full border border-blue-200">
              Auto-Sync Enabled
            </span>
          </div>

          <div className="bg-white rounded-xl p-3.5 border border-blue-100 space-y-1">
            <span className="font-bold text-[#006a61] flex items-center gap-1.5 text-xs">
              <Icon name="sentiment_satisfied" className="text-sm" />
              <span>Doctor's Note to You</span>
            </span>
            <p className="text-slate-700 leading-relaxed text-xs">
              “Your filling on your upper right back molar is complete! The decay has been safely cleaned away and sealed with a natural-looking tooth-colored filling. The living nerve inside remains healthy and protected.”
            </p>
          </div>

          <div className="space-y-2 pt-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Home-Care Instructions (First 24-48 Hours)
            </span>
            <div className="flex items-start gap-2 bg-white/80 rounded-xl p-2.5 border border-blue-100">
              <Icon name="timer" className="text-[#006194] text-base shrink-0 mt-0.5" />
              <p className="text-slate-700">
                <strong>Avoid hot liquids or chewing hard foods</strong> until local anesthesia numbness fully wears off (~2 hours) to prevent cheek or lip bites.
              </p>
            </div>
            <div className="flex items-start gap-2 bg-white/80 rounded-xl p-2.5 border border-blue-100">
              <Icon name="thermostat" className="text-[#006a61] text-base shrink-0 mt-0.5" />
              <p className="text-slate-700">
                <strong>Mild cold sensitivity</strong> when drinking chilled water is normal for the next several days as the biomimetic bond matures.
              </p>
            </div>
          </div>
        </div>

        {/* Section 4: Longitudinal Continuity Roadmap */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
            <Icon name="event_repeat" className="text-[#006194] text-base" />
            Care Continuity Roadmap
          </h4>

          <div className="space-y-2.5">
            <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="medical_services" className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Phase 2: Topical Fluoride Varnish</span>
                    <span className="bg-[#cce5ff] text-[#001d31] font-bold text-[10px] px-1.5 py-0.2 rounded">Tooth #15</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">Preventive remineralization on adjacent virgin surface.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-[#006194] text-xs block">02 Nov 2026</span>
                <span className="text-[10px] font-semibold text-[#006a61]">10:00 AM • Booked</span>
              </div>
            </div>

            <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="vital_signs" className="text-base" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-xs">Long-Term Vitality Recall</span>
                    <span className="bg-teal-100 text-teal-900 font-bold text-[10px] px-1.5 py-0.2 rounded">6-Month Check</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">Electric pulp test (EPT) &amp; cold test on #16 alongside regular cleaning.</p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-bold text-slate-900 text-xs block">April 2027</span>
                <span className="text-[10px] text-slate-400">Automated Reminder</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Clinician Attestation */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3 text-xs">
          <Icon name="gavel" className="text-[#006a61] text-lg mt-0.5 shrink-0" />
          <div className="text-slate-600 leading-relaxed">
            <strong className="text-slate-900 font-bold">Statutory Clinical Attestation:</strong> Recorded &amp; digitally signed by <strong>Dr. Daniel James</strong> (#DEN-48912). Certified under DHA Health Data Standards. Cryptographically pushed to UAE NABIDH Health Information Exchange.
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleFinalize}
            disabled={isFinalized}
            className={`w-full h-12 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
              isFinalized
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-[#006194] hover:bg-[#004b73] text-white active:scale-[0.99]'
            }`}
          >
            <Icon name="assignment_turned_in" className="text-lg" />
            <span>{isFinalized ? 'Review Complete & Synchronized to NABIDH' : 'Mark Review Complete & Update Longitudinal History'}</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Linking supplemental finding to tooth #16...')}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="add_link" className="text-base text-slate-500" />
              <span>Link New Finding</span>
            </button>
            <button
              type="button"
              onClick={() => showToast('Compiling Post-Op Clinical Discharge Report (PDF)...')}
              className="h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#006a61] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-base" />
              <span>Export PDF</span>
            </button>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/record-completion')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Record Completion
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/follow-up-management')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>Go to Follow-up Management (13.20)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
