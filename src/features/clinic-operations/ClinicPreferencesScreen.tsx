import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { QuickLinks } from '../../design/QuickLinks';

export const ClinicPreferencesScreen: React.FC = () => {
  const navigate = useNavigate();

  const [defaultBranch, setDefaultBranch] = useState('Wuse 2 Main Branch (HQ #001)');
  const [crossBranchView, setCrossBranchView] = useState(true);
  const [timeFormat, setTimeFormat] = useState<'12h' | '24h'>('12h');
  const [reportingCadence, setReportingCadence] = useState('Today (Live Shift - Realtime)');
  const [shiftStart, setShiftStart] = useState('08:30 AM');
  const [shiftEnd, setShiftEnd] = useState('18:00 PM');
  const [slotGranularity, setSlotGranularity] = useState('15 Minutes (Standard Dental)');
  const [graceBuffer] = useState('10 mins');
  const [tvPrivacy, setTvPrivacy] = useState(true);
  const [audioChimes, setAudioChimes] = useState(true);
  const [stockAlerts, setStockAlerts] = useState(true);
  const [hmoThreshold, setHmoThreshold] = useState('Flag claims with >5% discrepancy');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    showToast('Shift preferences saved & deployed to Wuse 2 HQ!');
  };

  const handleRestoreDefaults = () => {
    setDefaultBranch('Wuse 2 Main Branch (HQ #001)');
    setCrossBranchView(true);
    setTimeFormat('12h');
    setReportingCadence('Today (Live Shift - Realtime)');
    setShiftStart('08:30 AM');
    setShiftEnd('18:00 PM');
    setSlotGranularity('15 Minutes (Standard Dental)');
    setTvPrivacy(true);
    setAudioChimes(true);
    setStockAlerts(true);
    setHmoThreshold('Flag claims with >5% discrepancy');
    showToast('Default clinic parameters restored.');
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
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="settings" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Facility Settings</span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                  Clinic Preferences
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRestoreDefaults}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="restart_alt" className="text-[16px]" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006194] text-xs font-bold text-white hover:bg-[#007bb9] shadow-sm transition-all active:scale-95"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Identity & Context Card */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 bg-[#cce5ff] flex items-center justify-center text-[#006194] font-bold">
              <Icon name="person" className="text-[28px]" />
              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#006a61] rounded-full ring-2 ring-white"></div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">David Musa</span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#86f2e4] text-[#00201d] text-[10px] font-extrabold uppercase">
                  <Icon name="verified" className="text-[12px] mr-1" />
                  MANAGER
                </span>
              </div>
              <p className="text-xs text-[#3f4850] mt-0.5">
                BrightSmile Dental Centre • Wuse 2 Branch
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#ffffff]/80 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#dae2fd]/40">
            <Icon name="tune" className="text-[#006194] text-[18px]" />
            <span className="text-xs font-bold text-[#131b2e]">Live Shift Configuration</span>
            <span className="text-[10px] font-mono font-bold text-[#006a61] flex items-center gap-1 ml-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-pulse"></span>
              SYNCED (WUSE-HQ)
            </span>
          </div>
        </div>

        {/* Section 1: Operational Scope & Facility */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="domain" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Operational Scope & Facility
              </h2>
              <p className="text-xs text-[#3f4850]">Active branch routing and aggregate visibility</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Default Branch */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Default Branch on Login</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={defaultBranch}
                  onChange={e => setDefaultBranch(e.target.value)}
                >
                  <option>Wuse 2 Main Branch (HQ #001)</option>
                  <option>Garki Annex Care Unit (#002)</option>
                  <option>Maitama Paediatric Suite (#003)</option>
                  <option>Airport Road Diagnostic Hub (#004)</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#707881] block">
                Encounters and chair logs will anchor to this facility by default.
              </span>
            </div>

            {/* Cross-Branch Aggregated View Toggle */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-center justify-between border border-[#dae2fd]/30">
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">Cross-Branch Aggregated View</span>
                <span className="text-[11px] text-[#3f4850] block mt-0.5">
                  Include consolidated satellite data in morning overview charts.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={crossBranchView}
                onClick={() => setCrossBranchView(!crossBranchView)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  crossBranchView ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    crossBranchView ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Time, Date & Cadence Standards */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="schedule" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Time, Date & Cadence
              </h2>
              <p className="text-xs text-[#3f4850]">Shift benchmarks and standard clinical timelines</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Timezone */}
            <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between border border-[#dae2fd]/30">
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">Clinic Timezone</span>
                <span className="text-xs font-bold text-[#131b2e]">West Africa Time (WAT, GMT+1)</span>
              </div>
              <Icon name="public" className="text-[#006a61] text-[20px]" />
            </div>

            {/* Time Format */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Time Display Format</label>
              <div className="bg-[#eaedff] p-1 rounded-xl flex gap-1 border border-[#dae2fd]/30">
                <button
                  type="button"
                  onClick={() => setTimeFormat('12h')}
                  className={`flex-1 py-2 text-center rounded-lg font-bold text-xs transition-all ${
                    timeFormat === '12h'
                      ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <span>12-Hour AM/PM</span>
                  <span className="block text-[10px] opacity-75 font-mono">02:30 PM</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTimeFormat('24h')}
                  className={`flex-1 py-2 text-center rounded-lg font-bold text-xs transition-all ${
                    timeFormat === '24h'
                      ? 'bg-[#ffffff] text-[#006194] shadow-sm'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <span>24-Hour</span>
                  <span className="block text-[10px] opacity-75 font-mono">14:30</span>
                </button>
              </div>
            </div>

            {/* Default Reporting Cadence */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Default Reporting Cadence</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={reportingCadence}
                  onChange={e => setReportingCadence(e.target.value)}
                >
                  <option>Today (Live Shift - Realtime)</option>
                  <option>Trailing 24 Hours</option>
                  <option>Current Calendar Week (Mon-Sat)</option>
                  <option>Monthly Revenue & Audit Cycle</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Shift Hours */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#131b2e]">Shift Start</label>
                <div className="flex items-center h-11 bg-[#f2f3ff] rounded-xl px-3 gap-2 border border-[#dae2fd]/40">
                  <Icon name="wb_twilight" className="text-[#006194] text-[18px]" />
                  <input
                    type="text"
                    value={shiftStart}
                    onChange={e => setShiftStart(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#131b2e] outline-none"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#131b2e]">Shift End</label>
                <div className="flex items-center h-11 bg-[#f2f3ff] rounded-xl px-3 gap-2 border border-[#dae2fd]/40">
                  <Icon name="nightlight" className="text-[#006195] text-[18px]" />
                  <input
                    type="text"
                    value={shiftEnd}
                    onChange={e => setShiftEnd(e.target.value)}
                    className="w-full bg-transparent text-xs font-bold text-[#131b2e] outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Queue & Appointment Rules */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="tv" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Queue & Appointment Rules
              </h2>
              <p className="text-xs text-[#3f4850]">Lobby privacy, buffer gaps and slot pacing</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Slot Granularity */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Default Calendar Slot Granularity</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={slotGranularity}
                  onChange={e => setSlotGranularity(e.target.value)}
                >
                  <option>10 Minutes (Rapid Triage)</option>
                  <option>15 Minutes (Standard Dental)</option>
                  <option>30 Minutes (Surgical & Prosthetic)</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
            </div>

            {/* Chairside Grace Buffer */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-center justify-between border border-[#dae2fd]/30">
              <div className="flex items-center gap-2.5">
                <Icon name="hourglass_top" className="text-[#006a61] text-[20px]" />
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Chairside Grace Buffer</span>
                  <span className="text-[11px] text-[#3f4850]">Sterilization & turnaround window</span>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#86f2e4]/40 text-[#006a61] text-xs font-bold">
                {graceBuffer}
              </span>
            </div>

            {/* Waiting Room TV Privacy Mode */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-start justify-between gap-3 border border-[#dae2fd]/30">
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#131b2e]">Waiting Room Privacy TV Mode</span>
                  <Icon name="shield" className="text-[#006a61] text-[16px]" />
                </div>
                <p className="text-[11px] text-[#3f4850] mt-0.5 leading-relaxed">
                  Automatically mask patient names on public lobby displays as <span className="font-mono bg-[#dae2fd] text-[#131b2e] px-1 rounded">"A. O. (#Q-01)"</span>.
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={tvPrivacy}
                onClick={() => setTvPrivacy(!tvPrivacy)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  tvPrivacy ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    tvPrivacy ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Automated Audio Chimes */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-center justify-between border border-[#dae2fd]/30">
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">Automated Audio Chimes</span>
                <span className="text-[11px] text-[#3f4850] block mt-0.5">
                  Play acoustic chime when summoning next patient to chair.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={audioChimes}
                onClick={() => setAudioChimes(!audioChimes)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  audioChimes ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    audioChimes ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Operational Alerts & Dispatch */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="notifications_active" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Operational Alerts & Dispatch
              </h2>
              <p className="text-xs text-[#3f4850]">Realtime thresholds, sterilization and billing triggers</p>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {/* Low Stock Reorder */}
            <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-center justify-between border border-[#dae2fd]/30">
              <div>
                <span className="text-xs font-bold text-[#131b2e] block">Low Stock Reorder Notifications</span>
                <span className="text-[11px] text-[#3f4850] block mt-0.5">
                  SMS/App push when consumables drop below 5 units.
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={stockAlerts}
                onClick={() => setStockAlerts(!stockAlerts)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  stockAlerts ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    stockAlerts ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Autoclave Cycle Abort (Mandatory Locked) */}
            <div className="bg-[#ffdad6]/40 p-3.5 rounded-xl flex items-center justify-between border border-[#ffdad6]">
              <div className="pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#ba1a1a]">Autoclave Cycle Abort Critical Alert</span>
                  <span className="px-2 py-0.2 bg-[#ba1a1a] text-white font-mono text-[9px] rounded uppercase font-bold">
                    Mandatory
                  </span>
                </div>
                <p className="text-[11px] text-[#3f4850] mt-0.5">
                  Immediate audible warning on all nursing tablets upon sterilizer vacuum/temp drop.
                </p>
              </div>
              <div className="w-11 h-6 bg-[#006194] rounded-full flex items-center justify-end px-0.5 opacity-90 cursor-not-allowed">
                <div className="w-5 h-5 rounded-full bg-white shadow"></div>
              </div>
            </div>

            {/* HMO Remittance Variance Threshold */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">HMO Remittance Variance Threshold</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={hmoThreshold}
                  onChange={e => setHmoThreshold(e.target.value)}
                >
                  <option>Flag claims with &gt;5% discrepancy</option>
                  <option>Flag claims with &gt;10% discrepancy</option>
                  <option>Flag any unapproved tariff deduction</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#707881] block">
                Flags reconcile items during NHIA and private insurance processing.
              </span>
            </div>
          </div>
        </section>

        {/* Statutory Safeguard Card */}
        <div className="bg-[#eaedff] rounded-2xl p-5 border border-[#dae2fd]/60 shadow-sm flex items-start gap-3.5">
          <Icon name="gavel" className="text-[#006a61] text-[22px] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-xs font-bold text-[#131b2e]">Statutory Governance Boundary</h3>
            <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
              Notice: Clinic preferences control user experience and operational logistics. Core organization legal registration, premise licenses, and DHA gazetted facility accreditation are managed in{' '}
              <strong className="text-[#006194]">Section 15 (Regulatory Compliance)</strong>.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <Icon name="save" className="text-[18px]" />
            <span>Save Preferences & Apply Changes</span>
          </button>
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="h-12 px-6 bg-[#ffffff] hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            <span>Restore Standard Defaults</span>
          </button>
        </div>
      </main>
      <QuickLinks
        title="Settings"
        links={[
          { to: '/clinic-operations/dashboard-settings', label: 'Dashboard Settings', icon: 'dashboard_customize' },
          { to: '/clinic-operations/customise', label: 'Dashboard Customise', icon: 'tune' },
        ]}
      />
    </div>
  );
};
