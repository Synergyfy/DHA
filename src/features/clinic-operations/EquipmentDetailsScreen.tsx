import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const EquipmentDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'specs' | 'compliance' | 'timeline'>('specs');
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isCalibModalOpen, setIsCalibModalOpen] = useState(false);

  // Form states
  const [serviceType, setServiceType] = useState('Preventive Filter & Sensor Calibration');
  const [serviceDate, setServiceDate] = useState('2026-10-24');
  const [engineerName, setEngineerName] = useState('Lead Shield MedTech (Engr. Samuel O.)');

  const [calibNotes, setCalibNotes] = useState('');
  const [calibOperator, setCalibOperator] = useState('Dr. Michael James');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScheduleModalOpen(false);
    showToast(`Maintenance scheduled for ${serviceDate} with ${engineerName}`);
  };

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLogModalOpen(false);
    showToast('Bi-annual service entry recorded in asset logbook');
  };

  const handleCalibSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalibModalOpen(false);
    showToast('Manual calibration test logged & signed by ' + calibOperator);
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

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Asset Telemetry</span>
                <span className="text-xs text-[#707881]">•</span>
                <span className="font-mono text-xs text-[#3f4850]">#EQ-CBCT-04</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Equipment Details
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Downloading official NNRA inspection certificate...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>NNRA Cert</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="radiology" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Top Location & Asset Context Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-[#707881]">
              <span className="flex items-center gap-1 font-medium text-[#131b2e]">
                <Icon name="domain" className="text-[16px] text-[#006194]" />
                BrightSmile Dental • Wuse 2 Branch
              </span>
              <span>•</span>
              <span className="font-mono bg-[#eaedff] text-[#006194] px-2 py-0.5 rounded font-semibold">
                #EQ-CBCT-04
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="meeting_room" className="text-[20px] text-[#006195]" />
              <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Operatory 03 (CBCT Surgery Bay)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-semibold uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
              <span>Turnover Ready</span>
            </div>
            <button
              type="button"
              onClick={() => setIsScheduleModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Icon name="calendar_clock" className="text-[16px]" />
              <span>Schedule Service</span>
            </button>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Hero Image, Metrics, Advisory */}
          <div className="lg:col-span-5 space-y-6">
            {/* Hero / Visual Asset Card */}
            <div className="relative overflow-hidden rounded-2xl bg-white border border-[#dae2fd] shadow-sm flex flex-col">
              <div className="relative w-full h-56 bg-[#eaedff]">
                <img
                  src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80"
                  alt="Planmeca ProMax 3D s CBCT"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131b2e]/85 via-[#131b2e]/30 to-transparent" />
                <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur text-[#006194] text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <Icon name="radiology" className="text-[15px]" />
                    Radiography
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 backdrop-blur text-[#131b2e] text-xs font-semibold flex items-center gap-1 shadow-sm">
                    <Icon name="verified" className="text-[15px] text-[#006a61]" />
                    SCARA 3
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold drop-shadow-sm">
                    Planmeca ProMax 3D s
                  </p>
                  <p className="text-xs text-white/90">High-Resolution Volumetric 3D Tomography</p>
                </div>
              </div>

              {/* Quick Metrics Strip */}
              <div className="grid grid-cols-3 divide-x divide-[#eaedff] p-4 text-center bg-white">
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#707881]">Sensor Health</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#006a61] flex items-center gap-0.5 mt-0.5">
                    <Icon name="check_circle" className="text-[16px]" />
                    100%
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#707881]">Dosimeter</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#006194] flex items-center gap-0.5 mt-0.5">
                    &lt; 0.1 mSv
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-[#707881]">Next Audit</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#ba1a1a] flex items-center gap-0.5 mt-0.5">
                    <Icon name="timer" className="text-[16px]" />
                    7 Days
                  </span>
                </div>
              </div>
            </div>

            {/* Alert / Statutory Advisory Banner */}
            <div className="rounded-2xl bg-[#ffdad6] p-4 flex items-start gap-3 border border-[#ba1a1a]/20 shadow-sm">
              <Icon name="warning" className="text-[#ba1a1a] text-[22px] shrink-0 mt-0.5 fill-current" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-xs text-[#93000a]">
                    NNRA Physicist Survey Pending
                  </h2>
                  <span className="text-[10px] font-bold uppercase bg-[#ba1a1a] text-white px-2 py-0.5 rounded-full">
                    Recall
                  </span>
                </div>
                <p className="text-xs text-[#93000a]/90 mt-1 leading-relaxed">
                  Mandatory annual re-inspection due <strong>24 Oct 2026</strong>. Scatter audit booking with certified
                  medical physicist is currently in progress.
                </p>
                <div className="mt-2.5 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Dispatching medical physicist audit request...');
                    }}
                    className="px-3 py-1 rounded-lg bg-[#ba1a1a] text-white text-[11px] font-semibold hover:bg-[#93000a] transition-colors"
                  >
                    Confirm Physicist Visit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate('/clinic-operations/equipment-maintenance');
                    }}
                    className="text-[11px] text-[#93000a] underline font-semibold hover:text-black"
                  >
                    View Maintenance Bay
                  </button>
                </div>
              </div>
            </div>

            {/* Custodian Card */}
            <div className="rounded-2xl bg-white border border-[#dae2fd] p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-[#cce5ff] shrink-0 flex items-center justify-center font-bold text-[#006194]">
                  MJ
                </div>
                <div>
                  <span className="text-[11px] uppercase font-bold text-[#006194] tracking-wider block">
                    Primary Custodian
                  </span>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    Dr. Michael James
                  </h3>
                  <p className="text-xs text-[#707881]">Radiologist & Associate Surgeon</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Opening direct messaging with Dr. Michael James...')}
                aria-label="Direct message operator"
                className="w-10 h-10 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#006194] transition-colors"
              >
                <Icon name="chat" className="text-[20px]" />
              </button>
            </div>
          </div>

          {/* Right Column: Tabbed Content & Details */}
          <div className="lg:col-span-7 space-y-6">
            {/* Tabbed Navigation */}
            <div className="w-full bg-[#eaedff] rounded-2xl p-1 flex shadow-xs border border-[#dae2fd]/60">
              <button
                type="button"
                onClick={() => setActiveTab('specs')}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'specs'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="tune" className="text-[16px]" />
                <span>Specifications</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('compliance')}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'compliance'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="verified_user" className="text-[16px]" />
                <span>Radiation QA</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('timeline')}
                className={`flex-1 py-2 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'timeline'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="history" className="text-[16px]" />
                <span>Service Logbook</span>
              </button>
            </div>

            {/* TAB 1: SPECIFICATIONS */}
            {activeTab === 'specs' && (
              <div className="space-y-5 animate-fade-in">
                {/* Hardware Identity Card */}
                <div className="rounded-2xl bg-white border border-[#dae2fd] p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                        <Icon name="precision_manufacturing" className="text-[20px]" />
                      </div>
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                        Asset Identity & Registry
                      </h2>
                    </div>
                    <span className="font-mono text-xs text-[#006194] bg-[#eaedff] px-2.5 py-1 rounded-md font-semibold">
                      FCT-WUS-RAD-04
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <div className="bg-[#f2f3ff] p-3 rounded-xl">
                      <span className="text-[11px] uppercase font-semibold text-[#707881] block">Serial Number</span>
                      <span className="font-mono text-xs font-bold text-[#131b2e] mt-0.5 block">PLM-994182-NG</span>
                    </div>
                    <div className="bg-[#f2f3ff] p-3 rounded-xl">
                      <span className="text-[11px] uppercase font-semibold text-[#707881] block">Acquisition Date</span>
                      <span className="text-xs font-bold text-[#131b2e] mt-0.5 block">14 Jan 2024</span>
                    </div>
                    <div className="bg-[#f2f3ff] p-3 rounded-xl">
                      <span className="text-[11px] uppercase font-semibold text-[#707881] block">Capital Valuation</span>
                      <span className="text-xs font-bold text-[#006194] mt-0.5 block">₦38,500,000</span>
                    </div>
                    <div className="bg-[#f2f3ff] p-3 rounded-xl">
                      <span className="text-[11px] uppercase font-semibold text-[#707881] block">Warranty Status</span>
                      <span className="text-xs font-bold text-[#006a61] mt-0.5 block">Valid thru Jan 2027</span>
                    </div>
                  </div>

                  <div className="bg-[#eaedff]/60 rounded-xl p-3.5 space-y-2 text-xs border border-[#dae2fd]">
                    <div className="flex items-center justify-between">
                      <span className="text-[#707881]">OEM Representative:</span>
                      <span className="font-semibold text-[#131b2e]">Planmeca MEA / Lead Shield MedTech</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#707881]">SLA Service Level:</span>
                      <span className="font-bold text-[#006a61]">Tier 1 • 4hr Response Window</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[#707881]">Software Firmware:</span>
                      <span className="font-mono text-[#131b2e]">Romexis v6.4.2-Pro</span>
                    </div>
                  </div>
                </div>

                {/* Infrastructure Directives */}
                <div className="rounded-2xl bg-white border border-[#dae2fd] p-5 shadow-sm space-y-3">
                  <div className="flex items-center gap-2 text-[#006a61]">
                    <Icon name="bolt" className="text-[20px]" />
                    <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                      Power & Critical Directives
                    </h3>
                  </div>
                  <p className="text-xs text-[#3f4850] leading-relaxed">
                    Emergency power backup: Connected to <strong>15kVA Pure Sine Wave Inverter & Solar Hybrid Grid</strong>.
                    Automatic phase synchronization and voltage stabilizer active (220V ± 2%).
                  </p>
                  <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-2.5 text-xs text-[#3f4850] border border-[#eaedff]">
                    <Icon name="verified" className="text-[#006195] text-[18px] shrink-0" />
                    <span>
                      DHA Protocol: Only credentialed maxillofacial radiologists or certified operators may fire live
                      exposures.
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: RADIATION QA */}
            {activeTab === 'compliance' && (
              <div className="space-y-5 animate-fade-in">
                {/* NNRA Seal & Verification */}
                <div className="rounded-2xl bg-white border border-[#dae2fd] p-5 shadow-sm space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006f66]">
                        <Icon name="workspace_premium" className="text-[24px]" />
                      </div>
                      <div>
                        <span className="text-[11px] uppercase font-bold text-[#006a61] tracking-wider block">
                          Regulatory Seal Verified
                        </span>
                        <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                          NNRA Radioprotection Certification
                        </h2>
                      </div>
                    </div>
                    <span className="text-xs uppercase px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] font-semibold">
                      Active
                    </span>
                  </div>

                  <div className="bg-[#f2f3ff] rounded-xl p-4 space-y-2 text-xs border border-[#eaedff]">
                    <div className="flex justify-between items-center">
                      <span className="text-[#707881]">Certificate License #:</span>
                      <span className="font-mono font-bold text-[#131b2e]">NNRA-DIAG-2025-0812</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#707881]">Scatter Field Clearance:</span>
                      <span className="text-[#006a61] font-semibold">Passed (Scatter Shield 2.0mm Pb)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#707881]">TLD Badge Monitor:</span>
                      <span className="font-mono text-[#131b2e]">QA-9921 (&lt;0.1 mSv/mo)</span>
                    </div>
                  </div>

                  {/* Scatter margin progress visualizer */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#707881]">Quarterly Scatter Margin</span>
                      <span className="font-bold text-[#006a61]">0.08 mSv / 1.00 mSv Limit</span>
                    </div>
                    <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden flex">
                      <div className="bg-[#006a61] h-full rounded-full" style={{ width: '8%' }} />
                    </div>
                    <p className="text-[11px] text-[#707881] italic">
                      92% safety headroom below statutory occupational exposure threshold.
                    </p>
                  </div>
                </div>

                {/* Calibrated Tube Metrics */}
                <div className="rounded-2xl bg-white border border-[#dae2fd] p-5 shadow-sm space-y-4">
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e] flex items-center gap-2">
                    <Icon name="speed" className="text-[20px] text-[#006194]" />
                    <span>Calibrated Radiographic Tube Parameters</span>
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                      <span className="text-[11px] uppercase font-semibold text-[#707881]">Potential / Current</span>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] mt-1">
                        90 kV / 12 mA
                      </p>
                      <span className="text-xs text-[#006a61]">High-Dynamic Arc</span>
                    </div>
                    <div className="p-3 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
                      <span className="text-[11px] uppercase font-semibold text-[#707881]">Focal Spot Size</span>
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] mt-1">
                        0.5 mm
                      </p>
                      <span className="text-xs text-[#006194]">Micro-focus checked</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-[#eaedff]/60 text-xs text-[#131b2e]">
                    <Icon name="flare" className="text-[#006194] text-[18px] shrink-0" />
                    <span>Ultra Low Dose (ULD™) protocol enabled for routine diagnostic 3D sweeps.</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: TIMELINE & SERVICE LOGS */}
            {activeTab === 'timeline' && (
              <div className="space-y-5 animate-fade-in">
                <div className="rounded-2xl bg-white border border-[#dae2fd] p-5 shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                        Service Logbook & Telemetry
                      </h2>
                      <p className="text-xs text-[#707881]">Continuous maintenance tracking</p>
                    </div>
                    <span className="text-xs text-[#006194] bg-[#cce5ff] px-2.5 py-1 rounded-full font-semibold">
                      Bi-annual Cycle
                    </span>
                  </div>

                  {/* Vertical Timeline */}
                  <div className="relative pl-6 space-y-5">
                    <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-[#eaedff]" />

                    {/* Entry 1 */}
                    <div className="relative space-y-1">
                      <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#006a61] ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#131b2e]">Morning QA & Warmup Sweep</span>
                        <span className="font-mono text-xs text-[#707881]">Today, 09:30 AM</span>
                      </div>
                      <p className="text-xs text-[#707881] leading-relaxed">
                        Sensor warmup cycle passed. Collimator blade test calibrated at 0.04mm tolerance.
                      </p>
                      <div className="flex items-center gap-1.5 text-xs text-[#006a61]">
                        <Icon name="verified" className="text-[15px]" />
                        <span>Operator: Dr. Michael James</span>
                      </div>
                    </div>

                    {/* Entry 2 */}
                    <div className="relative space-y-1">
                      <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#006194] ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#131b2e]">
                          Preventive Filter & Vacuum Maintenance
                        </span>
                        <span className="font-mono text-xs text-[#707881]">12 Oct 2026, 14:15 PM</span>
                      </div>
                      <p className="text-xs text-[#707881] leading-relaxed">
                        High-volume ventilation intake cleared. Primary heat-sink de-dusted by FCT MedTech Field Engineer.
                      </p>
                      <span className="font-mono text-[11px] text-[#707881]">Ref: #SRV-9901-NG</span>
                    </div>

                    {/* Entry 3 */}
                    <div className="relative space-y-1">
                      <div className="absolute -left-[19px] top-1 w-3.5 h-3.5 rounded-full bg-[#006195] ring-4 ring-white" />
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-[#131b2e]">Bi-annual 3D Phantom Alignment</span>
                        <span className="font-mono text-xs text-[#707881]">18 Apr 2026, 11:00 AM</span>
                      </div>
                      <p className="text-xs text-[#707881] leading-relaxed">
                        Full geometric matrix phantom alignment & kVp verification. Certified passed with standard report.
                      </p>
                      <span className="text-xs font-semibold text-[#006a61]">Passed • Lead Shield MedTech</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsCalibModalOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#dae2fd]/60"
                  >
                    <Icon name="add_circle" className="text-[18px]" />
                    <span>Add Manual Calibration Entry</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Schedule Service Modal */}
      {isScheduleModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="calendar_clock" className="text-[#006194] text-xl" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Schedule CBCT Service
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsScheduleModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Service Scope</label>
                <input
                  type="text"
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Service Date</label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Bio-Med Service Provider</label>
                <input
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsScheduleModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-[16px]" />
                  <span>Confirm Dispatch</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manual Calibration Modal */}
      {isCalibModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="tune" className="text-[#006194] text-xl" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Add Calibration Entry
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCalibModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <form onSubmit={handleCalibSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Operator Name</label>
                <input
                  type="text"
                  value={calibOperator}
                  onChange={(e) => setCalibOperator(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Calibration Findings & Notes</label>
                <textarea
                  value={calibNotes}
                  onChange={(e) => setCalibNotes(e.target.value)}
                  rows={3}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  placeholder="Collimator variance within 0.03mm; phantom tests optimal..."
                  required
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCalibModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="save" className="text-[16px]" />
                  <span>Save Entry</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bi-annual Log Modal */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
              Log Bi-annual Maintenance
            </h3>
            <p className="text-xs text-[#3f4850]">
              Confirm that bi-annual servicing protocols have been executed by Lead Shield MedTech.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogSubmit}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006a61] hover:bg-[#005049] shadow-sm"
              >
                Confirm Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
