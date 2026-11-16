import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function TreatmentPriorityRationaleScreen() {
  const navigate = useNavigate();

  const [selectedTier, setSelectedTier] = useState<'emergency' | 'urgent' | 'high' | 'routine' | 'preventive'>('urgent');
  const [narrative, setNarrative] = useState(
    'Tooth #16 exhibits deep cavitated mesio-occlusal dentin caries (ICDAS 3/4) encroaching to within 2.1mm of mesial pulp horn on Dexis Bitewing. Patient reports transient cold sensitivity (< 5s). Urgent intervention (< 7 days) is clinically indicated to arrest bacterial demineralization and prevent mechanical/biological pulp exposure.'
  );

  const [earliestDate, setEarliestDate] = useState('2026-10-18');
  const [targetDate, setTargetDate] = useState('2026-10-25');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleSave = () => {
    showToast('Priority tier & clinical rationale synchronized');
    setTimeout(() => {
      navigate('/treatment-plans/dentist-approval');
    }, 700);
  };

  const handleReset = () => {
    setSelectedTier('urgent');
    setNarrative(
      'Tooth #16 exhibits deep cavitated mesio-occlusal dentin caries (ICDAS 3/4) encroaching to within 2.1mm of mesial pulp horn on Dexis Bitewing. Patient reports transient cold sensitivity (< 5s). Urgent intervention (< 7 days) is clinically indicated to arrest bacterial demineralization and prevent mechanical/biological pulp exposure.'
    );
    showToast('Reset to diagnostic baseline (Urgent)');
  };

  return (
    <TreatmentPlanShell
      pageTitle="Priority & Clinical Rationale"
      badgeCode="13.9"
      badgeLabel="Clinical Scheduling"
      currentStep="Clinical Rationale"
    >
      <div className="space-y-6 max-w-4xl mx-auto pb-16">
        {/* Patient Context Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#001d31] font-bold text-xs flex items-center justify-center shrink-0">
              AO
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">Amara Okafor</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881]">34y • F</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#707881] mt-0.5">
                <span className="font-mono text-[#006194] font-semibold">Plan #TP-2026-089</span>
                <span>•</span>
                <span>Dr. Daniel James (#DEN-48912)</span>
              </div>
            </div>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
            FDI #16 MO
          </span>
        </div>

        {/* Statutory Legal Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] flex items-start gap-3.5">
          <Icon name="gavel" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <span className="text-xs font-bold text-[#131b2e] block">
              Priority Tiering &amp; Clinical Urgency Standard
            </span>
            <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
              <strong className="text-[#131b2e]">Statutory Rule:</strong> Priority tags are organizational scheduling tiers.
              The attending licensed dentist determines clinical urgency and procedure sequencing based on verified pulpal pathology.
            </p>
          </div>
        </div>

        {/* Priority Tier Selector */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#131b2e]">Scheduling Tiers</h2>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881] uppercase tracking-wider">
              Clinical Criteria
            </span>
          </div>

          <div className="space-y-2.5">
            {/* 1: Emergency */}
            <label
              onClick={() => setSelectedTier('emergency')}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                selectedTier === 'emergency'
                  ? 'bg-[#ffdad6]/40 border-[#ba1a1a] shadow-sm'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
                  <span className="text-xs font-bold text-[#131b2e]">Emergency</span>
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a]">
                  &lt; 24 Hours
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-1 pl-5">
                Acute infection, facial swelling, severe unrelenting throbbing pain, dental trauma.
              </p>
            </label>

            {/* 2: Urgent (Active Selection) */}
            <label
              onClick={() => setSelectedTier('urgent')}
              className={`p-4 rounded-xl border-2 flex flex-col justify-between cursor-pointer transition-all ${
                selectedTier === 'urgent'
                  ? 'bg-[#cce5ff]/30 border-[#006194] shadow-md'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
                  <span className="text-xs font-extrabold text-[#006194]">Urgent</span>
                  <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-[#cce5ff] text-[#001d31] uppercase">
                    Active Selection
                  </span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#006194] text-white">
                  &lt; 7 Days
                </span>
              </div>
              <p className="text-xs text-[#131b2e] mt-1.5 pl-5 leading-relaxed font-medium">
                Symptomatic dentin caries with cold sensitivity, reversible pulpitis, risk of irreversible pulp exposure if untreated.
              </p>
              <div className="mt-2 pt-2 pl-5 flex items-center gap-1.5 text-xs text-[#006a61] font-semibold">
                <Icon name="check_circle" className="text-[15px]" />
                <span>Clinically aligned with Bitewing Dexis BW-R-1048</span>
              </div>
            </label>

            {/* 3: High Priority */}
            <label
              onClick={() => setSelectedTier('high')}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                selectedTier === 'high'
                  ? 'bg-[#89f5e7]/20 border-[#006a61] shadow-sm'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                  <span className="text-xs font-bold text-[#131b2e]">High Priority</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850]">
                  14 – 30 Days
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-1 pl-5">
                Non-cavitated active lesions, localized periodontal progression, defective margin replacement.
              </p>
            </label>

            {/* 4: Routine */}
            <label
              onClick={() => setSelectedTier('routine')}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                selectedTier === 'routine'
                  ? 'bg-[#cce5ff]/30 border-[#006194] shadow-sm'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#707881]"></span>
                  <span className="text-xs font-bold text-[#131b2e]">Routine</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881]">
                  1 – 3 Months
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-1 pl-5">
                Stable maintenance, aesthetic replacement of sound restorations.
              </p>
            </label>

            {/* 5: Preventive */}
            <label
              onClick={() => setSelectedTier('preventive')}
              className={`p-4 rounded-xl border flex flex-col justify-between cursor-pointer transition-all ${
                selectedTier === 'preventive'
                  ? 'bg-[#cce5ff]/30 border-[#006194] shadow-sm'
                  : 'bg-[#f2f3ff] border-transparent hover:bg-[#eaedff]'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#707881]"></span>
                  <span className="text-xs font-bold text-[#131b2e]">Preventive</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#707881]">
                  6 Months
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-1 pl-5">
                Prophylaxis recare, topical fluoride varnish.
              </p>
            </label>
          </div>
        </div>

        {/* Defensible Clinical Rationale Formulation */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="description" className="text-[20px] text-[#006194]" />
              <h3 className="text-base font-bold text-[#131b2e]">Defensible Clinical Rationale</h3>
            </div>
            <span className="text-[11px] font-bold uppercase text-[#006a61] flex items-center gap-1">
              <Icon name="lock" className="text-[14px]" /> Audited Field
            </span>
          </div>

          {/* Diagnostic Evidence Attachment */}
          <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#006194] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
              <Icon name="radiology" className="text-[22px]" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-[#131b2e]">Dexis Radiographic Evidence</span>
                <span className="font-mono text-xs font-bold text-[#006194]">BW-R-1048</span>
              </div>
              <p className="text-xs text-[#3f4850] mt-0.5">
                Residual pulp buffer: <strong className="text-[#ba1a1a]">2.1 mm</strong> • ICDAS Stage 3/4
              </p>
            </div>
          </div>

          {/* Narrative Input Box */}
          <div className="space-y-1.5">
            <label htmlFor="clinical-narrative" className="text-xs font-bold text-[#3f4850] block">
              Practitioner Justification Note
            </label>
            <textarea
              id="clinical-narrative"
              rows={4}
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              className="w-full p-3.5 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none leading-relaxed"
            />
          </div>

          {/* Clinical Citations */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block mb-1.5">
              Clinical Citations &amp; Diagnostic Markers
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 bg-[#f2f3ff] text-[#131b2e] font-mono text-xs px-3 py-1 rounded-full border border-[#eaedff]">
                <Icon name="local_hospital" className="text-[14px] text-[#006194]" />
                ICD-10 K02.62
              </span>
              <span className="inline-flex items-center gap-1 bg-[#89f5e7]/40 text-[#006a61] font-mono text-xs px-3 py-1 rounded-full">
                <Icon name="radiology" className="text-[14px]" />
                Dexis BW-R-1048
              </span>
              <span className="inline-flex items-center gap-1 bg-[#cce5ff] text-[#001d31] font-mono text-xs px-3 py-1 rounded-full">
                <Icon name="ac_unit" className="text-[14px] text-[#006194]" />
                Cold Test Reversible (+ve)
              </span>
            </div>
          </div>
        </div>

        {/* Target Scheduling Envelope */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <Icon name="calendar_month" className="text-[20px] text-[#006a61]" />
            <h3 className="text-base font-bold text-[#131b2e]">Target Scheduling Envelope</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                Earliest Start Date
              </span>
              <input
                type="date"
                value={earliestDate}
                onChange={(e) => setEarliestDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-[#131b2e] focus:outline-none"
              />
              <span className="text-[11px] text-[#006a61] font-medium block">Sunday Slot Available</span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                Target Completion
              </span>
              <input
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                className="bg-transparent text-sm font-bold text-[#ba1a1a] focus:outline-none"
              />
              <span className="text-[11px] text-[#707881] font-medium block">7-Day Maximum Threshold</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#006a61] text-white flex items-center justify-center">
                <Icon name="chair" className="text-[18px]" />
              </div>
              <div>
                <span className="font-bold text-[#131b2e] block">Operatory 2 (Wuse 2 Clinic)</span>
                <span className="text-[#707881]">Surgical Cart A Reserved</span>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40 text-[#006a61] font-bold">
              Reserved
            </span>
          </div>
        </div>

        {/* Audit Chain of Custody */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="history_toggle_off" className="text-[18px] text-[#707881]" />
              <h4 className="text-xs font-bold text-[#131b2e]">Audit Chain of Custody</h4>
            </div>
            <span className="font-mono text-[10px] text-[#707881]">SHA-256 Valid</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="smart_toy" className="text-[15px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#131b2e]">Initial AI Recommendation</span>
                  <span className="text-[10px] text-[#707881]">10:15 WAT</span>
                </div>
                <p className="text-[#707881] mt-0.5">Proposed: Urgent (&lt; 7 Days) on 12 Oct 2026</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-[#89f5e7]/40 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="verified" className="text-[15px]" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#131b2e]">Clinician Endorsement</span>
                  <span className="text-[10px] text-[#707881]">11:28 WAT</span>
                </div>
                <p className="text-[#707881] mt-0.5">
                  Confirmed by Dr. Daniel James (#DEN-48912) on 12 Oct 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]"
          >
            <Icon name="check" className="text-[18px]" />
            <span>Update Priority &amp; Proceed to Dentist Review (13.10)</span>
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="w-full h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            <span>Reset to Clinical Baseline</span>
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
