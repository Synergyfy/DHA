import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

export function PatientProfessionalOverviewScreen() {
  const navigate = useNavigate();

  // Active section tab
  const [activeTab, setActiveTab] = useState<'overview' | 'records' | 'appointments' | 'treatments' | 'investigations' | 'referrals'>('overview');
  const [isInitializingEncounter, setIsInitializingEncounter] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleStartEncounter = () => {
    setIsInitializingEncounter(true);
    setTimeout(() => {
      setIsInitializingEncounter(false);
      navigate('/treatment-plans/progress-workspace');
    }, 1500);
  };

  return (
    <ClinicalWorkspaceShell activeTab="patients">
      <div className="max-w-6xl mx-auto space-y-6 pb-36 md:pb-16">
        {/* PATIENT IDENTITY STRIP */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-4 md:p-6 relative overflow-hidden">
          {/* Ambient teal glow */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=260"
                  alt="Amara Okafor"
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover shadow-sm ring-2 ring-teal-500/30"
                />
                <div
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-md ring-2 ring-white dark:ring-slate-800"
                  title="NIN biometric verification Verified Record"
                >
                  <Icon name="verified" filled className="text-sm" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate">
                    Amara Okafor
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-bold shrink-0">
                    <Icon name="shield" filled className="text-xs" />
                    NIN biometric verification
                  </span>
                </div>

                <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-1 flex-wrap">
                  <span>34y Female</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span>DOB: 14 Oct 1992</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">Autonomous Adult</span>
                </p>

                {/* Identifiers */}
                <div className="flex flex-wrap items-center gap-2 mt-2.5 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700/60 font-mono font-medium text-slate-700 dark:text-slate-300">
                    LC: NG-990-281-LAG
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-teal-50 dark:bg-teal-950/40 font-mono font-bold text-teal-700 dark:text-teal-300">
                    MRN: DHA-2026-00451
                  </span>
                </div>
              </div>
            </div>

            {/* Practitioner & Attending Context Card */}
            <div className="bg-slate-50 dark:bg-slate-700/50 p-3.5 rounded-xl border border-slate-200 dark:border-slate-600 flex items-center justify-between gap-4 self-stretch md:self-auto">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="medical_services" className="text-lg" />
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Dr. Daniel James (DDS)</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    Restorative Odontology • Harmony Wuse 2
                  </span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="font-mono text-[11px] text-slate-400 block">NIN: 12345-*******-1</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase">Assigned Attending</span>
              </div>
            </div>
          </div>
        </section>

        {/* CRITICAL CLINICAL SAFETY BANNER */}
        <section className="bg-red-50 dark:bg-red-950/40 border-l-4 border-red-600 rounded-2xl p-4 md:p-5 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-sm animate-pulse">
              <Icon name="warning" filled className="text-xl" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between flex-wrap gap-1">
                <span className="text-xs uppercase tracking-wider text-red-700 dark:text-red-400 font-bold flex items-center gap-1">
                  Critical Clinical Alert
                </span>
                <span className="px-2 py-0.5 rounded bg-red-200/80 dark:bg-red-900/60 text-red-900 dark:text-red-200 font-mono text-[10px] font-bold">
                  LEVEL 1 RESTRICTION
                </span>
              </div>
              <p className="font-bold text-slate-900 dark:text-white text-sm md:text-base mt-0.5">
                Penicillin Anaphylaxis Documented
              </p>
              <p className="text-xs md:text-sm text-red-800 dark:text-red-300 mt-1 leading-relaxed">
                Beta-lactam antibiotics strictly contraindicated. Non-beta-lactam anesthetic and pain protocol mandatory
                for all restorative encounters. Epipen in Bay 3 crash cart.
              </p>
            </div>
          </div>
        </section>

        {/* 4 TOP SUMMARY KPI CARDS (2x2 on mobile, 4-col on desktop) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {/* KPI 1: Last Visit */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Last Visit</span>
              <span className="w-7 h-7 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                <Icon name="history" className="text-sm" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base">Today</span>
                <span className="text-xs text-slate-400">• 10:30 AM</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                Operatory 02 • Post-Op Check
              </span>
            </div>
          </div>

          {/* KPI 2: Next Recare */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Next Recare</span>
              <span className="w-7 h-7 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Icon name="calendar_today" className="text-sm" />
              </span>
            </div>
            <div className="mt-3">
              <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base block">02 Nov 2026</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block mt-0.5 truncate">
                Fluoride Varnish &amp; Polish
              </span>
            </div>
          </div>

          {/* KPI 3: Active Treatment Plans */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Treatment Plan</span>
              <span className="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                <Icon name="dentistry" className="text-sm" />
              </span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-bold text-teal-700 dark:text-teal-300 text-sm md:text-base">1 Active</span>
                <span className="text-xs font-mono text-slate-400">Phase 1 Done</span>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                #TP-2026-089 Biomimetic
              </span>
            </div>
          </div>

          {/* KPI 4: Pending Follow-up */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 font-medium">Follow-up Due</span>
              <span className="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Icon name="notification_important" className="text-sm" />
              </span>
            </div>
            <div className="mt-3">
              <span className="font-bold text-amber-600 dark:text-amber-400 text-sm md:text-base block">
                1 Due (14-Day)
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                Check #FOL-2026-0391
              </span>
            </div>
          </div>
        </section>

        {/* NAVIGATION TAB BAR (HORIZONTAL SCROLLING SEGMENTED CONTROL) */}
        <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl flex items-center gap-1 overflow-x-auto no-scrollbar">
          {([
            { id: 'overview' as const, label: 'Overview', icon: 'dashboard' },
            { id: 'records' as const, label: 'Clinical Records', icon: 'folder_shared' },
            { id: 'appointments' as const, label: 'Appointments', icon: 'event_note' },
            { id: 'treatments' as const, label: 'Treatment History', icon: 'receipt_long' },
            { id: 'investigations' as const, label: 'Investigations', icon: 'radiology' },
            { id: 'referrals' as const, label: 'Referrals', icon: 'send_and_archive' },
          ] as { id: 'overview' | 'records' | 'appointments' | 'treatments' | 'investigations' | 'referrals'; label: string; icon: string; badge?: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === 'records') navigate('/patient-dashboard/records/timeline');
                if (tab.id === 'appointments') navigate('/dentist/appointments-list');
                if (tab.id === 'treatments') navigate('/treatment-plans/dashboard');
                if (tab.id === 'investigations') navigate('/investigations/dashboard');
              }}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon name={tab.icon} className="text-sm" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* CLINICAL STATUS & MODULE BENTO GRID (Responsive 2-col on desktop) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* 1. DENTAL CHART / ODONTOGRAM STATUS CARD */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                    <Icon name="play_apps" className="text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-base">Odontogram Status</h2>
                    <span className="text-xs text-slate-500">FDI Notation • Quadrant 1 Active</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-semibold">
                  Synchronized
                </span>
              </div>

              {/* Visual Odontogram Micro-strip */}
              <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3.5 space-y-3">
                <div className="flex items-center justify-between text-xs font-medium text-slate-500">
                  <span>Maxillary Right (Q1)</span>
                  <span className="text-teal-600 dark:text-teal-400">Restoration Verified</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {/* Tooth 17 */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 flex flex-col items-center text-center shadow-xs">
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">#17</span>
                    <div className="w-7 h-7 my-1 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                      <Icon name="circle" className="text-sm" />
                    </div>
                    <span className="text-[10px] text-slate-400">Intact</span>
                  </div>

                  {/* Tooth 16: Restored (Highlighted) */}
                  <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-500/30 rounded-xl p-2.5 flex flex-col items-center text-center shadow-xs relative">
                    <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300">#16</span>
                    <div className="w-7 h-7 my-1 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-sm">
                      <Icon name="check" className="text-sm" />
                    </div>
                    <span className="text-[10px] text-teal-700 dark:text-teal-300 font-bold">Restored</span>
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                  </div>

                  {/* Tooth 15: Watch */}
                  <div className="bg-blue-50 dark:bg-blue-950/30 rounded-xl p-2.5 flex flex-col items-center text-center shadow-xs">
                    <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-300">#15</span>
                    <div className="w-7 h-7 my-1 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                      <Icon name="visibility" className="text-sm" />
                    </div>
                    <span className="text-[10px] text-blue-700 dark:text-blue-300 font-semibold">Watch</span>
                  </div>

                  {/* Tooth 14: Sound */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl p-2.5 flex flex-col items-center text-center shadow-xs">
                    <span className="font-mono text-xs font-bold text-slate-600 dark:text-slate-300">#14</span>
                    <div className="w-7 h-7 my-1 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                      <Icon name="circle" className="text-sm" />
                    </div>
                    <span className="text-[10px] text-slate-400">Sound</span>
                  </div>
                </div>

                {/* Clinical Notes Breakdown */}
                <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                    <p>
                      <strong className="text-teal-700 dark:text-teal-400 font-semibold">Tooth #16:</strong> Mesio-occlusal
                      direct biomimetic resin composite, light-cured (Clearfil AP-X).
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                    <p>
                      <strong className="text-blue-700 dark:text-blue-400 font-semibold">Tooth #15:</strong> Watch &amp;
                      remineralize (Incipient occlusal pit). Recare Nov 2026.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/odontogram/overview')}
              className="w-full h-11 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="view_in_ar" className="text-base" />
              <span>Open Odontogram Workspace</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>

          {/* 2. ACTIVE TREATMENT PLAN TRACKER */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                    <Icon name="architecture" className="text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-base">Active Treatment Plan</h2>
                    <span className="text-xs font-mono text-slate-500">#TP-2026-089</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 font-mono text-xs font-bold">
                  33% Complete
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                    Mesio-Occlusal Direct Restorative Protocol
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    1 of 3 planned restorative steps completed under rubber dam isolation.
                  </p>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full transition-all duration-500" style={{ width: '33.3%' }} />
                </div>

                {/* Financial Summary Split */}
                <div className="grid grid-cols-2 gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">Phase 1 (Settled)</span>
                    <span className="font-bold text-teal-700 dark:text-teal-300 text-sm md:text-base">NGN 170.00</span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase font-semibold block">Phase 2 (Pending)</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm md:text-base">NGN 120.00</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/treatment-plans/progress-workspace')}
              className="w-full h-11 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="checklist_rtl" className="text-base" />
              <span>Open Treatment Plan Workspace</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>

          {/* 3. LATEST IMAGING & INVESTIGATION */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon name="radiology" className="text-lg" />
                  </div>
                  <div>
                    <h2 className="font-bold text-slate-900 dark:text-white text-base">Radiology &amp; Imaging</h2>
                    <span className="text-xs text-slate-500">Dexis Bitewing BW-R-1048</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 font-medium">18 Oct 2026</span>
              </div>

              {/* Radiograph Thumbnail Card */}
              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3">
                <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=240"
                    alt="Bitewing X-Ray"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <span className="absolute bottom-1 left-1.5 font-mono text-[9px] text-white bg-black/60 px-1 rounded">
                    BW-R
                  </span>
                </div>
                <div className="min-w-0 flex-1 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-slate-900 dark:text-white">
                    <span className="w-2 h-2 rounded-full bg-teal-500" />
                    <span>Clear 2.1mm Pulp Buffer</span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    Tooth #16 verified: No pulpal involvement or coronal recurrence. Periodontal ligament intact.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/investigations/viewer/xray')}
              className="w-full h-11 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="zoom_in" className="text-base" />
              <span>View Radiographs</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>

          {/* 4. AI CLINICAL SYNTHESIS SUMMARY */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-5 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
                    <Icon name="auto_awesome" className="text-lg" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h2 className="font-bold text-slate-900 dark:text-white text-base">AI Clinical Synthesis</h2>
                      <span className="px-1.5 py-0.2 rounded bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 font-mono text-[10px] font-bold">
                        GEN-4
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500">Summary #DHA-CS-9842</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-teal-600 dark:text-teal-400 text-xs font-semibold">
                  <Icon name="check_circle" filled className="text-sm" />
                  <span>Verified</span>
                </div>
              </div>

              {/* Synthesis Excerpt */}
              <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3.5 space-y-2 text-xs">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed italic">
                  &quot;Patient presents optimal biological response post-composite restoration (#16). Plaque score index 14%
                  (favorable). High compliance with interdental brushes. Recare recommendation focused on remineralization
                  therapy for pit #15 with 5000ppm NaF.&quot;
                </p>
                <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1 border-t border-slate-200 dark:border-slate-600">
                  <span>Approved by Dr. Daniel James</span>
                  <span className="text-teal-600 dark:text-teal-400 font-semibold">Confidence: 99.4%</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate('/summaries/workspace')}
              className="w-full h-11 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-teal-700 dark:text-teal-300 font-semibold text-xs md:text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="psychology" className="text-base" />
              <span>View AI Clinical Summary</span>
              <Icon name="arrow_forward" className="text-sm" />
            </button>
          </div>
        </section>

        {/* PRE-ENCOUNTER ACTION BAR (STICKY BOTTOM COCKPIT) */}
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 p-4 shadow-xl">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="hidden sm:flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
              </span>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">Operatory 02 Staged</span>
                <span className="text-[11px] text-slate-500">Amara Okafor • #ENC-2026-1048</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                onClick={() => showToast('Appointment reschedule workflow initiated')}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="schedule" className="text-base text-teal-600" />
                <span>Schedule Visit</span>
              </button>

              <button
                onClick={() => showToast('Record sharing consent requested via National Identification Number (NIN) verification')}
                className="flex-1 sm:flex-none px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs md:text-sm font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="ios_share" className="text-base text-teal-600" />
                <span>Share Records</span>
              </button>

              <button
                onClick={handleStartEncounter}
                className="flex-2 sm:flex-none px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs md:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Icon name="play_circle" filled className="text-lg" />
                <span>Start Clinical Encounter</span>
              </button>
            </div>
          </div>
        </div>

        {/* Encounter Loading Modal */}
        {isInitializingEncounter && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-sm w-full flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center">
                <Icon name="dentistry" className="text-3xl animate-spin" />
              </div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">Initializing Operatory 02</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Locking sterile chart &amp; loading radiographic workspace for Amara Okafor...
              </p>
              <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full w-2/3 animate-pulse" />
              </div>
            </div>
          </div>
        )}

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="check_circle" filled className="text-teal-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
