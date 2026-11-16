import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const ClinicalOperationsReportsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = () => {
    setIsExporting(true);
    showToast('Compiling Signed Cryptographic Audit (PDF)...');
    setTimeout(() => {
      setIsExporting(false);
      showToast('Quality & Safety Audit PDF dispatched to secured inbox');
    }, 2000);
  };

  const handleLogbook = () => {
    showToast('Navigating to Central IPC Sterilization Logbook...');
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Quality Assurance</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Clinical Operations Reports
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name={isExporting ? 'refresh' : 'picture_as_pdf'} className={`text-[16px] ${isExporting ? 'animate-spin' : ''}`} />
              <span>Export Audit</span>
            </button>
            <button
              onClick={handleLogbook}
              className="w-9 h-9 flex items-center justify-center rounded-lg text-[#3f4850] hover:bg-[#e2e7ff] transition-colors"
              title="IPC Logbook"
            >
              <Icon name="assignment" className="text-[20px]" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Practice Context Header Card */}
        <div className="w-full bg-[#f2f3ff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1 bg-[#86f2e4] text-[#00201d] px-2.5 py-0.5 rounded-full text-xs font-bold">
                <Icon name="verified" className="text-[14px]" />
                <span className="uppercase tracking-wider text-[10px]">Clinical Director Tier</span>
              </div>
              <span className="text-xs text-[#3f4850] flex items-center gap-1 font-medium">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse inline-block"></span>
                <span>HQ #001 Live Sync</span>
              </span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-extrabold text-[#131b2e]">
              Wuse 2 Main Branch
            </h2>
            <p className="text-xs text-[#3f4850] flex items-center gap-1.5 mt-1 font-medium">
              <Icon name="calendar_month" className="text-[16px] text-[#006194]" />
              <span>October 2026 MTD Operational Audit • Active Cohort</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="bg-[#ffffff] px-3 py-1.5 rounded-xl shadow-sm border border-[#dae2fd]/40 flex items-center gap-1.5">
              <Icon name="health_and_safety" className="text-[16px] text-[#006a61]" />
              <span className="text-xs font-bold text-[#131b2e]">ISO 13485 IPC Standard</span>
            </div>
            <div className="bg-[#ffffff] px-3 py-1.5 rounded-xl shadow-sm border border-[#dae2fd]/40 flex items-center gap-1.5">
              <Icon name="verified_user" className="text-[16px] text-[#006194]" />
              <span className="text-xs font-bold text-[#131b2e]">DHA Certified Node</span>
            </div>
          </div>
        </div>

        {/* Operational Quality & Safety Summary KPI Mosaic (4 cols) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Procedures Executed */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="p-2.5 rounded-xl bg-[#cce5ff] text-[#006194]">
                <Icon name="medical_services" className="text-[20px]" />
              </span>
              <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/40 px-2 py-0.5 rounded-md">
                +12.4% MoM
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Procedures MTD</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">564</span>
              <p className="text-xs text-[#707881] mt-1 font-medium">18 Active Operatories</p>
            </div>
          </div>

          {/* Card 2: Diagnostic Investigations */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="p-2.5 rounded-xl bg-[#cde5ff] text-[#006195]">
                <Icon name="radiology" className="text-[20px]" />
              </span>
              <span className="text-xs font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded-md">
                High Res
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Diagnostics Logged</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">184</span>
              <p className="text-xs text-[#707881] mt-1 font-medium">CBCT, OPG, PA, Swabs</p>
            </div>
          </div>

          {/* Card 3: Bio-Safety Validation */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="p-2.5 rounded-xl bg-[#86f2e4] text-[#00201d]">
                <Icon name="sanitizer" className="text-[20px]" />
              </span>
              <span className="text-xs font-extrabold text-[#006a61] px-2 py-0.5 rounded-md bg-[#e2e7ff]">
                48/48 Assays
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Bio-Safety Pass</span>
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#006a61]">100%</span>
                <span className="text-xs font-bold text-[#006a61]">Zero Fail</span>
              </div>
              <p className="text-xs text-[#707881] mt-1 font-medium">Class B Spore Validated</p>
            </div>
          </div>

          {/* Card 4: Clinical Complication Rate */}
          <div className="bg-[#ffffff] rounded-2xl p-4 md:p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <span className="p-2.5 rounded-xl bg-[#e2e7ff] text-[#131b2e]">
                <Icon name="monitor_heart" className="text-[20px]" />
              </span>
              <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/40 px-2 py-0.5 rounded-md">
                &lt;1.5% Bench
              </span>
            </div>
            <div className="mt-3">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Complication Rate</span>
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">0.18%</span>
              <p className="text-xs text-[#707881] mt-1 font-medium">Statutory Exemption Meta</p>
            </div>
          </div>
        </section>

        {/* Diagnostic Review Latency Widget */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                <Icon name="timer" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                  Diagnostic Review Latency
                </h3>
                <p className="text-xs text-[#3f4850]">PACS acquisition to verified clinician sign-off</p>
              </div>
            </div>
            <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/30 px-3 py-1 rounded-full">
              SLA Met (100%)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#dae2fd]/30">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Routine Review</span>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-[#006194]">14.2</span>
                <span className="text-xs text-[#3f4850] font-medium">mins avg</span>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full" style={{ width: '48%' }}></div>
              </div>
              <span className="text-[11px] text-[#707881] block mt-1.5 font-medium">Target Threshold: &lt;30 mins</span>
            </div>

            <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#dae2fd]/30">
              <span className="text-xs font-semibold text-[#3f4850] block uppercase tracking-wider">Emergency Triage</span>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-extrabold text-[#006a61]">4.8</span>
                <span className="text-xs text-[#3f4850] font-medium">mins avg</span>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full mt-3 overflow-hidden">
                <div className="bg-[#006a61] h-full rounded-full" style={{ width: '25%' }}></div>
              </div>
              <span className="text-[11px] text-[#006a61] block mt-1.5 font-bold">Priority Fast-track Activated</span>
            </div>
          </div>
        </section>

        {/* Section: Clinical Procedure Mix & IPC Compliance Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Procedure Mix Breakdown (6 cols) */}
          <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Clinical Procedure Mix
                  </h3>
                  <p className="text-xs text-[#3f4850]">564 Categorized CDT Treatments MTD</p>
                </div>
                <span className="text-xs font-bold text-[#006194] bg-[#eaedff] px-2.5 py-1 rounded-lg">
                  100% Cross-Checked
                </span>
              </div>

              {/* Segmented Multi-Bar Visualizer */}
              <div className="space-y-1.5 mb-4">
                <div className="w-full h-3.5 rounded-full flex overflow-hidden bg-[#eaedff] gap-0.5">
                  <div className="bg-[#006194] h-full" style={{ width: '38%' }} title="Direct Restorative (38%)"></div>
                  <div className="bg-[#006a61] h-full" style={{ width: '28%' }} title="Preventive & Periodontics (28%)"></div>
                  <div className="bg-[#006195] h-full" style={{ width: '16%' }} title="Orthodontics (16%)"></div>
                  <div className="bg-[#007bb9] h-full" style={{ width: '10%' }} title="Endodontics (10%)"></div>
                  <div className="bg-[#6bd8cb] h-full" style={{ width: '8%' }} title="Surgery (8%)"></div>
                </div>
                <div className="flex justify-between items-center px-1 text-[11px] text-[#707881] font-semibold">
                  <span>CDT Spectrum</span>
                  <span>Restorative Majority</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="space-y-2.5">
                {/* Item 1 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-[#006194] shrink-0"></span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">Direct Restorative</span>
                      <span className="text-[11px] text-[#3f4850] block">CDT D2391-D2394 • Resin Composite</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">38%</span>
                    <span className="text-[11px] text-[#707881] block">214 cases</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-[#006a61] shrink-0"></span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">Preventive & Periodontics</span>
                      <span className="text-[11px] text-[#3f4850] block">CDT D1110, D4341 • Prophy & SRP</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">28%</span>
                    <span className="text-[11px] text-[#707881] block">158 cases</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-[#006195] shrink-0"></span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">Orthodontics & Aligners</span>
                      <span className="text-[11px] text-[#3f4850] block">Bi-weekly Tracking & Attachment Installs</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">16%</span>
                    <span className="text-[11px] text-[#707881] block">90 visits</span>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-[#007bb9] shrink-0"></span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">Endodontics (RCT)</span>
                      <span className="text-[11px] text-[#3f4850] block">Molar & Premolar Rotary Instrumentation</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">10%</span>
                    <span className="text-[11px] text-[#707881] block">56 cases</span>
                  </div>
                </div>

                {/* Item 5 */}
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-3 h-3 rounded-full bg-[#6bd8cb] shrink-0"></span>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">Maxillofacial & Extractions</span>
                      <span className="text-[11px] text-[#3f4850] block">Surgical Impactions & Alveoloplasty</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">8%</span>
                    <span className="text-[11px] text-[#707881] block">46 cases</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Aggregate Clinical Case Load</span>
              <span className="font-bold text-[#006194]">100% Documented</span>
            </div>
          </section>

          {/* IPC Sterilization Safety Compliance Module (6 cols) */}
          <section className="lg:col-span-6 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#86f2e4] flex items-center justify-center text-[#00201d]">
                    <Icon name="cleaning_services" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                      IPC Compliance Log
                    </h3>
                    <p className="text-xs text-[#3f4850]">Infection Prevention & Biocide Adherence</p>
                  </div>
                </div>
                <span className="text-xs bg-[#86f2e4] text-[#00201d] px-2.5 py-1 rounded-full font-bold">
                  Audit Ready
                </span>
              </div>

              {/* Equipment Snapshot Card */}
              <div className="w-full rounded-xl overflow-hidden relative shadow-sm mb-4 bg-gradient-to-r from-[#131b2e] to-[#283044] p-4 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <Icon name="verified" className="text-[#86f2e4] text-[20px]" />
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-white">
                    Central Sterilization Suite Alpha
                  </span>
                </div>
                <p className="text-xs text-white/70">
                  Modern clinical autoclaves, digital spore testing monitors & continuous biological verification.
                </p>
              </div>

              {/* Compliance Items */}
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex items-start gap-3">
                  <Icon name="check_circle" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131b2e]">Autoclave Unit 01 (Midmark M11)</span>
                      <span className="text-xs font-bold text-[#006a61] bg-[#ffffff] px-2 py-0.5 rounded shadow-sm border border-[#86f2e4]/40">96 Cycles</span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      Bowie-Dick test passed; zero vacuum or temperature aborts registered.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex items-start gap-3">
                  <Icon name="check_circle" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131b2e]">Handpiece Quarantine Protocol</span>
                      <span className="text-xs font-bold text-[#006a61] bg-[#ffffff] px-2 py-0.5 rounded shadow-sm border border-[#86f2e4]/40">100% Adherence</span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      All high-speed turbine bundles tracked with RFID heat-quench stamps.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/30 flex items-start gap-3">
                  <Icon name="check_circle" className="text-[#006a61] text-[20px] shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#131b2e]">Dental Unit Waterlines (DUWL)</span>
                      <span className="text-xs font-semibold text-[#707881] bg-[#ffffff] px-2 py-0.5 rounded shadow-sm border border-[#dae2fd]">18 Oct 2026</span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                      Continuous silver-ion biofilm shock treatment certified (&lt;50 CFU/mL).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleExport}
                className="flex-1 h-11 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Icon name="picture_as_pdf" className="text-[18px]" />
                <span>Export Quality Audit (PDF)</span>
              </button>
              <button
                onClick={handleLogbook}
                className="flex-1 h-11 bg-[#eaedff] hover:bg-[#e2e7ff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Icon name="assignment" className="text-[18px]" />
                <span>Review IPC Logbook</span>
              </button>
            </div>
          </section>
        </div>

        {/* Statutory Governance Notice Banner */}
        <div className="w-full bg-[#eaedff] rounded-2xl p-5 border border-[#dae2fd]/60 shadow-sm flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="gavel" className="text-[20px]" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#131b2e] block mb-1">
              Statutory Governance Statement
            </span>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Statutory Privacy Protocol: Clinical operations reports aggregate operational volume, complication metrics, and bio-safety indicators. Individual patient diagnostic charting, sensitive pathology findings, and clinician private notes are omitted in compliance with DHA clinical confidentiality regulations.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
