import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

export function PlanVersionComparisonScreen() {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'changes' | 'full'>('changes');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Plan Version Comparison"
      badgeCode="13.23"
      badgeLabel="Version Diff Audit"
      currentStep="13.23"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Patient Context Sub-bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center font-bold text-sm shrink-0">
              <Icon name="badge" className="text-xl text-[#006194]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">Amara Okafor</span>
                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">DHA-78219</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Care Plan #TP-2026-089 • Adult Comprehensive Restorative
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-[#006a61] border border-teal-200 text-xs font-bold self-start sm:self-auto">
            <Icon name="verified" className="text-sm" />
            v1.1 Active
          </span>
        </div>

        {/* Audit Metric Hero Card */}
        <div className="bg-[#e2e7ff] rounded-2xl p-5 shadow-xs border border-blue-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="compare_arrows" className="text-[#006194] text-xl" />
              <h2 className="font-bold text-base text-slate-900">Plan Version Differential Audit</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#006194] text-white text-xs font-bold">
              3 Material Diffs
            </span>
          </div>

          {/* Version A vs Version B visual cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Version A */}
            <div className="p-4 rounded-xl bg-white shadow-xs space-y-2 border border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Base Version</span>
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono text-xs font-bold">v1.0</span>
              </div>
              <p className="font-bold text-sm text-slate-900">Initial Ingested Draft</p>
              <p className="text-xs text-slate-500">12 Oct 2026 • 10:15 GST</p>
              <div className="pt-1 text-[11px] text-slate-500 flex items-center gap-1">
                <Icon name="smart_toy" className="text-slate-400 text-sm" />
                <span>Sec. 12 Auto Ingestion</span>
              </div>
            </div>

            {/* Version B */}
            <div className="p-4 rounded-xl bg-white shadow-xs space-y-2 border-2 border-[#006194]">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#006194] uppercase tracking-wider">Amended Active</span>
                <span className="px-2 py-0.5 rounded bg-[#cce5ff] text-[#001d31] font-mono text-xs font-bold">v1.1</span>
              </div>
              <p className="font-bold text-sm text-slate-900">Clinician Certified</p>
              <p className="text-xs text-slate-500">14 Oct 2026 • 11:15 GST</p>
              <div className="pt-1 text-[11px] text-[#006a61] flex items-center gap-1 font-semibold">
                <Icon name="stethoscope" className="text-[#006a61] text-sm" />
                <span>Dr. Daniel James (#DEN-48912)</span>
              </div>
            </div>
          </div>

          {/* Quick Tally Bar */}
          <div className="p-3 bg-white/90 backdrop-blur rounded-xl flex items-center justify-between text-xs border border-blue-200/80">
            <div className="flex items-center gap-2 text-slate-700 font-bold">
              <Icon name="payments" className="text-[#006a61] text-base" />
              <span>Overall Tariff Delta:</span>
            </div>
            <div className="text-right">
              <span className="font-bold text-[#006a61]">+AED 800 Gross</span>
              <span className="text-slate-500"> (+AED 90 Patient Copay)</span>
            </div>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl gap-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setViewMode('changes')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'changes' ? 'bg-white text-[#006194] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon name="difference" className="text-base" />
            <span>Changes Only (3 Material Diffs)</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('full')}
            className={`flex-1 py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              viewMode === 'full' ? 'bg-white text-[#006194] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Icon name="view_column" className="text-base" />
            <span>Full Comparison Matrix (7 Elements)</span>
          </button>
        </div>

        {/* DIFF 1: Priority & Scheduling Envelope */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#cce5ff] text-[#001d31] font-bold flex items-center justify-center text-xs">
                1
              </span>
              <span className="font-bold text-sm text-slate-900">Treatment Priority &amp; Envelope</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold flex items-center gap-1">
              <Icon name="schedule" className="text-xs" />
              Escalated
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">v1.0 (Baseline)</span>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-semibold">Routine</span>
              </div>
              <p className="text-slate-600 font-medium pt-1">Target Window: &lt; 30 Calendar Days</p>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-1">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#006194] font-bold uppercase text-[10px]">v1.1 (Amended)</span>
                <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 text-[10px] font-bold">Urgent Expedited</span>
              </div>
              <p className="text-slate-900 font-bold pt-1">Target Window: &lt; 7 Calendar Days</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Clinician Diagnostic Rationale
            </span>
            <p className="text-slate-700 italic">
              “Cold sensitivity and Dexis bitewing confirms 2.1mm pulp buffer; risk of rapid caries progression requires accelerated restoration to avert pulpotomy.”
            </p>
            <span className="text-[10px] font-semibold text-slate-400 block text-right">— Dr. Daniel James</span>
          </div>
        </div>

        {/* DIFF 2: Material & Procedure Specification (#16) */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#cce5ff] text-[#001d31] font-bold flex items-center justify-center text-xs">
                2
              </span>
              <span className="font-bold text-sm text-slate-900">Tooth #16 Direct Restoration Procedure</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 font-bold">
              CDT Reclassified
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-50 flex items-center justify-between text-slate-700 font-medium">
            <span className="flex items-center gap-1.5">
              <Icon name="dentistry" className="text-[#006194] text-base" />
              <span>Maxillary Right First Molar (#16)</span>
            </span>
            <span className="font-mono font-bold text-[#006a61]">MO Surface</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 opacity-80">
              <div className="flex justify-between items-center">
                <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">v1.0 Specification</span>
                <span className="text-slate-400 line-through font-bold">AED 650</span>
              </div>
              <p className="font-semibold text-slate-700 line-through">Standard Micro-hybrid Composite</p>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <span className="bg-slate-200 px-1.5 py-0.5 rounded">CDT D2391</span>
                <span>1-Surface Occlusal</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#006a61] font-bold uppercase text-[10px]">v1.1 Clinically Amended</span>
                <span className="font-bold text-[#006a61]">AED 850 (+AED 200)</span>
              </div>
              <p className="font-bold text-slate-900">Direct Biomimetic Resin Composite</p>
              <div className="flex items-center gap-2 text-[10px]">
                <span className="bg-teal-100 text-teal-900 font-bold px-1.5 py-0.5 rounded">CDT D2392 (2-Surface MO)</span>
                <span className="bg-blue-100 text-[#006194] px-1.5 py-0.5 rounded">DHA-RES-2S</span>
              </div>
              <div className="pt-1 text-[11px] font-semibold text-[#006194]">
                Patient Co-Pay Adjustment: AED 130 → AED 170 (+AED 40)
              </div>
            </div>
          </div>
        </div>

        {/* DIFF 3: Added Phase 2 Preventive Items */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#cce5ff] text-[#001d31] font-bold flex items-center justify-center text-xs">
                3
              </span>
              <span className="font-bold text-sm text-slate-900">Phase 2 Preventive Additions</span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-[#006194] font-bold flex items-center gap-1">
              <Icon name="add_circle" className="text-xs" />
              Added Scope
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 flex flex-col justify-center">
              <span className="font-mono text-slate-400 font-bold uppercase text-[10px]">v1.0 (Baseline)</span>
              <span className="text-slate-500 italic">Single restorative visit only (No Phase 2)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-200 space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[#006194] font-bold uppercase text-[10px]">v1.1 Phase 2 Additions</span>
                <span className="font-bold text-[#006194]">+AED 600 Gross</span>
              </div>
              <div className="space-y-1.5">
                <div className="p-2 rounded bg-white border border-blue-100 flex items-center justify-between">
                  <span>Topical Fluoride Remineralization (#15)</span>
                  <span className="font-bold text-slate-900">AED 250</span>
                </div>
                <div className="p-2 rounded bg-white border border-blue-100 flex items-center justify-between">
                  <span>Full Mouth Periodontal Recare &amp; Scaling</span>
                  <span className="font-bold text-slate-900">AED 350</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statutory Audit & Consent Validation */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="gavel" className="text-[#006a61] text-lg" />
            <h3 className="font-bold text-sm text-slate-900">Statutory Audit &amp; Consent Validation</h3>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 space-y-1">
            <div className="flex items-center gap-2 text-[#006a61] font-bold">
              <Icon name="check_circle" className="text-base" />
              <span>Renewed Consent Obtained</span>
            </div>
            <p className="text-slate-700 leading-relaxed">
              Material treatment scope change verified under DHA Article 14. Amara Okafor completed biometric digital endorsement on <strong>14 Oct 2026, 11:28 GST</strong>.
            </p>
            <span className="font-mono text-[11px] text-[#006a61] font-semibold block pt-1">
              SIGNATURE-ID: #DHA-SIG-991204
            </span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2">
            <Icon name="policy" className="text-slate-400 text-base shrink-0 mt-0.5" />
            <p className="text-slate-600 leading-relaxed">
              <strong className="text-slate-900">Statutory Non-Retroactivity Rule:</strong> Completed clinical procedures can never be removed or altered retroactively via plan revisions. Any modified line items take effect strictly prospectively.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Compiling official Version Differential Audit Report (PDF)...')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] active:scale-[0.99] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Icon name="picture_as_pdf" className="text-base" />
            <span>Export Comparison Audit Report (PDF)</span>
          </button>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/history')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              ← Back to Plan History
            </button>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/deferred-care')}
              className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
            >
              <span>View Deferred &amp; Incomplete Care (13.24)</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
