import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { SummaryShell } from './SummaryShell';

export function InvestigationSummaryScreen() {
  const navigate = useNavigate();
  const [activeModality, setActiveModality] = useState<'all' | 'xray' | 'lab' | 'photo'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <SummaryShell
      pageTitle="12.7 Investigation Summary"
      badgeCode="12.7"
      badgeLabel="Diagnostic Synthesis"
      currentStep="Multi-Modal Synthesis"
    >
      <div className="space-y-6">
        {/* Safeguard & Ingestion Context Banner */}
        <section className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#006194] text-white text-xs font-bold uppercase tracking-wider">
                Section 11 Ingestion
              </span>
              <span className="text-xs text-[#707881]">4 Modalities Linked &amp; Parsed</span>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse"></span>
              AI Draft • Unapproved
            </span>
          </div>

          {/* Patient Context Micro-grid */}
          <div className="bg-[#faf8ff] rounded-xl p-4 border border-[#eaedff] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-[#707881] block">Patient</span>
              <span className="text-sm font-bold text-[#131b2e] block mt-0.5">
                Amara Okafor <span className="font-normal text-[#707881]">(34y F)</span>
              </span>
              <span className="font-mono text-[#006194]">DHA-2026-00451</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#707881] block">
                Supervising Clinician
              </span>
              <span className="text-sm font-bold text-[#131b2e] block mt-0.5">Dr. Daniel James</span>
              <span className="font-mono text-[#006a61]">#DEN-48912 • EXAM-1048</span>
            </div>
          </div>

          {/* 3-Tier Verification Safeguard Breadcrumb */}
          <div className="flex items-center gap-2 text-xs overflow-x-auto no-scrollbar pt-1">
            <span className="inline-flex items-center gap-1 text-[#006a61] font-bold shrink-0">
              <Icon name="inventory_2" className="text-[16px]" />
              <span>1. Source Verified</span>
            </span>
            <Icon name="arrow_forward" className="text-[14px] text-[#bfc7d2] shrink-0" />
            <span className="inline-flex items-center gap-1 text-[#006194] font-bold shrink-0 bg-[#e2e7ff] px-2 py-0.5 rounded-md">
              <Icon name="psychology" className="text-[16px]" />
              <span>2. AI Draft Synthesis</span>
            </span>
            <Icon name="arrow_forward" className="text-[14px] text-[#bfc7d2] shrink-0" />
            <span className="inline-flex items-center gap-1 text-[#707881] shrink-0 font-medium">
              <Icon name="verified" className="text-[16px]" />
              <span>3. Dentist Sign-Off</span>
            </span>
          </div>
        </section>

        {/* Filter Pills Bar */}
        <section className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveModality('all')}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-2 shrink-0 ${
              activeModality === 'all'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span>All Modalities</span>
            <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
              4
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModality('xray')}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-2 shrink-0 ${
              activeModality === 'xray'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span>Radiographs</span>
            <span className="w-4 h-4 rounded-full bg-[#e2e7ff] text-[#006194] flex items-center justify-center text-[10px]">
              2
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModality('lab')}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-2 shrink-0 ${
              activeModality === 'lab'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span>Laboratory</span>
            <span className="w-4 h-4 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center text-[10px]">
              1
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveModality('photo')}
            className={`px-3.5 py-2 rounded-full transition-all flex items-center gap-2 shrink-0 ${
              activeModality === 'photo'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#707881] border border-[#eaedff] hover:text-[#131b2e]'
            }`}
          >
            <span>Clinical Photos</span>
            <span className="w-4 h-4 rounded-full bg-[#e2e7ff] text-[#006194] flex items-center justify-center text-[10px]">
              1
            </span>
          </button>
        </section>

        {/* Investigation Cards */}
        <div className="space-y-6">
          {/* Card 1: Radiographs */}
          {(activeModality === 'all' || activeModality === 'xray') && (
            <article className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name="radiology" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                      Digital Bitewing &amp; Periapical
                    </h3>
                    <span className="text-xs font-mono text-[#707881]">
                      #INV-2026-0914 • Tooth #16 Focus
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#faf8ff] border border-[#eaedff] text-xs font-semibold text-[#006195]">
                  Pending Sign-off
                </span>
              </div>

              {/* Radiograph Visual with Caliper */}
              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-black shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop&q=80"
                  alt="Bitewing radiograph"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white font-mono text-xs shadow-md">
                  <Icon name="straighten" className="text-[15px] text-[#86f2e4]" />
                  <span>Dentin Buffer: 2.1mm</span>
                </div>
                <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-white/80 backdrop-blur-md text-black font-mono text-[11px] shadow">
                  Dexis Titanium • 65kVp 0.12s
                </div>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between text-xs text-[#707881] bg-[#faf8ff] p-2.5 rounded-xl border border-[#eaedff]">
                <span>Recorded: 13 Oct 2026</span>
                <span>Operator: Nurse Zainab Tariq</span>
              </div>

              {/* Provenance: Original Observation */}
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194] flex items-center gap-1">
                  <Icon name="database" className="text-[14px]" />
                  <span>Original Source Observation</span>
                </span>
                <p className="text-xs text-[#3f4850] italic leading-relaxed">
                  “Coronal radiolucency penetrating enamel-dentin junction on mesio-occlusal of #16. Distance to
                  pulp horn: 2.1mm. Alveolar crest height 1.4mm from CEJ (normal). Intact lamina dura.”
                </p>
              </div>

              {/* AI Synthesized Draft */}
              <div className="bg-[#faf8ff] p-3.5 rounded-xl border border-[#cce5ff] space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#006194] flex items-center gap-1">
                    <Icon name="neurology" className="text-[16px]" />
                    <span>AI Draft Clinical Extraction</span>
                  </span>
                  <span className="text-[11px] font-bold text-[#006a61]">Confidence: High</span>
                </div>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  Confirmed coronal dentinal caries without periapical rarefaction or periodontal ligament
                  space widening. Preserved 2.1mm protective dentin bridge indicates favorable pulp
                  preservation potential for direct restoration.
                </p>
              </div>

              {/* Action Row */}
              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/investigations/viewer/xray')}
                  className="px-4 py-2 rounded-xl bg-[#e2e7ff] text-[#006194] hover:bg-[#cce5ff] text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="visibility" className="text-[18px]" />
                  <span>Open Full Viewer (11.15)</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast('Flagged radiograph for clinical review audit.')}
                  className="w-9 h-9 rounded-xl hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center transition-colors"
                >
                  <Icon name="flag" className="text-[18px]" />
                </button>
              </div>
            </article>
          )}

          {/* Card 2: Laboratory Panel */}
          {(activeModality === 'all' || activeModality === 'lab') && (
            <article className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#006a61] flex items-center justify-center shrink-0">
                    <Icon name="biotech" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                      Pre-Operative Blood &amp; Salivary Panel
                    </h3>
                    <span className="text-xs font-mono text-[#707881]">
                      #LAB-2026-8841 • CAP ISO-15189
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold flex items-center gap-1">
                  <Icon name="check_circle" className="text-[14px]" />
                  <span>All Normal</span>
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-[#707881] bg-[#faf8ff] p-2.5 rounded-xl border border-[#eaedff]">
                <span>14 Oct 2026 • Al Barsha Diagnostic Lab</span>
                <span>Pathologist: Dr. Samira K.</span>
              </div>

              {/* Lab values */}
              <div className="space-y-2 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">
                  Verified Quantitative Values
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div>
                      <span className="font-bold text-[#131b2e] block">Fasting Blood Glucose</span>
                      <span className="text-[11px] text-[#707881]">Target: 70 - 99 mg/dL</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#006a61]">92 mg/dL</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div>
                      <span className="font-bold text-[#131b2e] block">HbA1c Glycated Hemoglobin</span>
                      <span className="text-[11px] text-[#707881]">Target: &lt; 5.7%</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#006a61]">5.4%</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div>
                      <span className="font-bold text-[#131b2e] block">Prothrombin Time (PT) &amp; INR</span>
                      <span className="text-[11px] text-[#707881]">INR Ref: 0.8 - 1.2</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#006a61]">1.02 INR</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                    <div>
                      <span className="font-bold text-[#131b2e] block">Unstimulated Salivary Flow</span>
                      <span className="text-[11px] text-[#707881]">Target: &gt; 0.30 mL/min</span>
                    </div>
                    <span className="font-mono text-sm font-bold text-[#006a61]">0.35 mL/min</span>
                  </div>
                </div>
              </div>

              {/* AI summary */}
              <div className="bg-[#faf8ff] p-3.5 rounded-xl border border-[#cce5ff] space-y-1">
                <span className="text-xs font-bold text-[#006194] flex items-center gap-1">
                  <Icon name="neurology" className="text-[16px]" />
                  <span>AI Clinical Risk Interpretation</span>
                </span>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  Hematological and coagulation profiles within normal surgical limits for local anesthesia
                  and routine restorative dentistry. Normal salivary flow supports physiological
                  remineralization capacity.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/investigations/viewer/lab')}
                  className="px-4 py-2 rounded-xl bg-[#e2e7ff] text-[#006194] hover:bg-[#cce5ff] text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="description" className="text-[18px]" />
                  <span>View Lab Slip (11.18)</span>
                </button>
                <span className="text-xs text-[#707881] font-mono">Verified via LIMS Bridge</span>
              </div>
            </article>
          )}

          {/* Card 3: Clinical Photo */}
          {(activeModality === 'all' || activeModality === 'photo') && (
            <article className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name="photo_camera" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                      Cross-Polarized Intraoral Macro
                    </h3>
                    <span className="text-xs font-mono text-[#707881]">#PHO-2026-0412 • Operatory 4</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold">
                  Ingested
                </span>
              </div>

              <div className="relative w-full h-48 rounded-xl overflow-hidden bg-surface-dim">
                <img
                  src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80"
                  alt="Clinical Macro"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white font-mono text-xs">
                  #16 Mesio-Occlusal Fissure
                </div>
              </div>

              <div className="bg-[#faf8ff] p-3.5 rounded-xl border border-[#eaedff] space-y-1">
                <span className="text-xs font-bold text-[#006194] flex items-center gap-1">
                  <Icon name="neurology" className="text-[16px]" />
                  <span>AI Multi-Modal Correlation</span>
                </span>
                <p className="text-xs text-[#131b2e] leading-relaxed">
                  Clinical visual correlation corroborates radiographic depth; active cavitation confirmed with
                  intact marginal ridge on #15.
                </p>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => navigate('/investigations/viewer/photo')}
                  className="px-4 py-2 rounded-xl bg-[#e2e7ff] text-[#006194] hover:bg-[#cce5ff] text-xs font-bold flex items-center gap-2 transition-colors"
                >
                  <Icon name="zoom_in" className="text-[18px]" />
                  <span>Open Photo Viewer (11.19)</span>
                </button>
                <span className="text-xs font-mono text-[#707881]">RAW+JPG Ingested</span>
              </div>
            </article>
          )}
        </div>

        {/* Missing Investigations Notice */}
        <div className="bg-[#eaedff] p-4 sm:p-5 rounded-2xl border border-[#dae2fd] flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-white text-[#ba1a1a] flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="warning" className="text-[22px]" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h4 className="text-sm font-bold text-[#131b2e]">Investigation Incompleteness Notice</h4>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
              No current Panoramic OPG or 3D CBCT on file for care episode #EXAM-2026-1048. Previous historical
              OPG dated 14 Oct 2024 is available in archival records only.
            </p>
            <button
              type="button"
              onClick={() => navigate('/investigations/create')}
              className="mt-2 px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="add_circle" className="text-[16px]" />
              <span>Order Supplementary Investigation (11.3)</span>
            </button>
          </div>
        </div>

        {/* Bottom Validation Stamp Box */}
        <div className="bg-white rounded-2xl p-5 border border-[#eaedff] shadow-sm space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#131b2e]">Dentist Sign-off &amp; Approval</span>
            <span className="text-[#707881] font-mono">Step 3 of 3</span>
          </div>

          <div className="flex items-center gap-3 p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] text-xs text-[#3f4850]">
            <Icon name="assignment_turned_in" className="text-[#006a61] text-[22px] shrink-0" />
            <p className="leading-relaxed">
              By proceeding, you attest that the AI extracted synthesis has been cross-checked against
              calibrated DICOM/Lab raw streams.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => showToast('Draft saved with current multi-modal annotations.')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-[#eaedff] hover:bg-[#f2f3ff] text-[#3f4850] text-sm font-semibold transition-all"
            >
              Save Draft &amp; Edit
            </button>
            <button
              type="button"
              onClick={() => navigate('/summaries/combined-oral-health')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-bold shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Combined Summary (12.8)</span>
              <Icon name="arrow_forward" className="text-[18px]" />
            </button>
          </div>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 left-4 right-4 max-w-sm mx-auto p-4 bg-[#283044] text-[#eef0ff] rounded-2xl shadow-xl flex items-center justify-between z-50 animate-in fade-in slide-in-from-bottom duration-200">
            <span className="text-xs font-medium">{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#bfc7d2] hover:text-white"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}
      </div>
    </SummaryShell>
  );
}
