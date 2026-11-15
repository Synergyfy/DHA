import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

export function PersonalActivityReportsScreen() {
  const navigate = useNavigate();

  // State
  const [timeframe, setTimeframe] = useState<'today' | 'week' | 'month' | 'q4'>('today');
  const [selectedDossier, setSelectedDossier] = useState<'daily' | 'monthly' | 'attendance' | 'recare' | 'practice'>('daily');
  const [isExporting, setIsExporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const handleSimulateExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('PDF Dossier #REP-2026-OCT-18 generated & downloaded to local vault');
    }, 1200);
  };

  return (
    <ClinicalWorkspaceShell activeTab="appointments">
      <div className="max-w-4xl mx-auto space-y-6 pb-32 md:pb-12">
        {/* Top Header / Back Nav */}
        <div className="flex items-center justify-between gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <Icon name="arrow_back" className="text-base" />
            <span>Back to Activity Overview</span>
          </button>

          <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider">
            Sec 14.12 • Dossier Reporting
          </span>
        </div>

        {/* Regulatory Audit Ledger Strip */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-teal-50 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center shrink-0">
                <Icon name="verified_user" filled className="text-xl" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                  Dr. Daniel James, DDS
                </h1>
                <p className="font-mono text-xs text-slate-500">#DEN-48912 • Restorative Lead</p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 font-mono text-xs font-bold uppercase tracking-wider">
              NABIDH TIER 1
            </span>
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 flex items-center gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <Icon name="security" filled className="text-base text-teal-600 dark:text-teal-400 shrink-0" />
            <span className="flex-1 leading-snug">
              <strong className="text-teal-700 dark:text-teal-300 font-semibold">
                NABIDH &amp; DHA Synchronized Ledger:
              </strong>{' '}
              Audit cryptographic anchor valid through 23:59 GST.
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          </div>
        </section>

        {/* Report Configuration Studio */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="tune" className="text-teal-600 text-lg" />
              <h2 className="font-bold text-slate-900 dark:text-white text-base">Report Configuration</h2>
            </div>
            <span className="font-mono text-xs font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-2 py-0.5 rounded-md">
              DHA Std v4.2
            </span>
          </div>

          {/* Clinic & Branch Scope */}
          <div className="space-y-1.5 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] block">
              Authorized Clinical Scope
            </label>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Icon name="domain" className="text-teal-600 text-base" />
                <span className="font-semibold text-slate-900 dark:text-white">
                  Harmony Dental Clinic — Wuse 2 Branch
                </span>
              </div>
              <Icon name="arrow_drop_down" className="text-slate-400" />
            </div>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
              <Icon name="lock" className="text-xs text-teal-600" />
              <span>Assigned Operatories: OP-01, OP-02, Implant Suite A</span>
            </p>
          </div>

          {/* Timeframe Selector Tabs */}
          <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl flex items-center gap-1 text-xs overflow-x-auto no-scrollbar">
            {([
              { id: 'today', label: 'Today (18 Oct)' },
              { id: 'week', label: 'This Week' },
              { id: 'month', label: 'Month to Date' },
              { id: 'q4', label: 'Q4 2026' },
            ] as const).map((t) => (
              <button
                key={t.id}
                onClick={() => setTimeframe(t.id)}
                className={`flex-1 py-2 px-3 rounded-lg font-bold whitespace-nowrap transition-all ${
                  timeframe === t.id
                    ? 'bg-white dark:bg-slate-800 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Dossier Type Carousel */}
          <div className="space-y-2 text-xs">
            <label className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px] block">
              Select Regulatory Dossier Type
            </label>

            {/* Active Primary Option */}
            <div
              onClick={() => setSelectedDossier('daily')}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                selectedDossier === 'daily'
                  ? 'border-2 border-teal-600 bg-teal-50/50 dark:bg-teal-950/30 shadow-xs'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40'
              }`}
            >
              <div className="w-10 h-10 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                <Icon name="calendar_today" className="text-xl" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate">
                    Daily Appointment &amp; Encounter Report
                  </h3>
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-600 shrink-0" />
                </div>
                <p className="text-slate-500 mt-0.5 truncate">
                  Real-time chairside log, procedural codes, and copay financial audit.
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="font-mono text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-100 dark:bg-teal-900/60 px-2 py-0.5 rounded">
                    NABIDH-M-01
                  </span>
                  <span className="text-[11px] text-slate-400">Live Synchronized</span>
                </div>
              </div>
            </div>

            {/* Other Report Type Options */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {([
                { id: 'monthly', title: 'Monthly Activity', note: '30-day aggregate', icon: 'assignment_turned_in' },
                { id: 'attendance', title: 'Attendance Registry', note: 'No-show & recall', icon: 'person_off' },
                { id: 'recare', title: 'Treatment Recare', note: 'Completion tracker', icon: 'clinical_notes' },
                { id: 'practice', title: 'Practice Summary', note: 'Executive dossier', icon: 'analytics' },
              ] as const).map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelectedDossier(r.id)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center gap-2.5 ${
                    selectedDossier === r.id
                      ? 'border-2 border-teal-600 bg-teal-50 dark:bg-teal-950/40'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100'
                  }`}
                >
                  <Icon name={r.icon} className="text-slate-400 text-lg shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 dark:text-white truncate">{r.title}</p>
                    <p className="text-[10px] text-slate-400">{r.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Operatory Activity Progress Bar */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-900 dark:text-white">Today&apos;s Chairside Pace</span>
            <span className="font-mono font-bold text-teal-700 dark:text-teal-300">50% COMPLETED</span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex gap-0.5 p-0.5">
            <div className="h-full bg-emerald-500 rounded-l-full" style={{ width: '37.5%' }} title="Completed (3)" />
            <div className="h-full bg-teal-600 animate-pulse" style={{ width: '12.5%' }} title="In-Chairside (1)" />
            <div className="h-full bg-blue-400" style={{ width: '12.5%' }} title="Awaiting Seating (1)" />
            <div className="h-full bg-slate-300 dark:bg-slate-600" style={{ width: '25%' }} title="Scheduled (2)" />
            <div className="h-full bg-red-400 rounded-r-full" style={{ width: '12.5%' }} title="Cancelled (1)" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 flex-wrap gap-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" /> 3 Done
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600" /> 1 In-Chair
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400" /> 1 Waiting
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-400" /> 1 Cancelled
            </span>
          </div>
        </section>

        {/* Simulated Report Live Document Preview (DHA Official Dossier) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1 text-xs">
            <div className="flex items-center gap-1.5">
              <Icon name="preview" className="text-teal-600 text-base" />
              <h3 className="font-bold text-slate-900 dark:text-white">Simulated Dossier Preview</h3>
            </div>
            <span className="font-mono text-slate-400">11:45 GST</span>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-md overflow-hidden relative">
            {/* Watermark SVG Emblem */}
            <div className="absolute -right-8 -top-8 w-44 h-44 opacity-5 pointer-events-none text-teal-600">
              <svg className="w-full h-full fill-current" viewBox="0 0 100 100">
                <circle cx="50" cy="50" fill="none" r="45" stroke="currentColor" strokeWidth="4" />
                <path d="M50 15 L50 85 M15 50 L85 50" />
                <circle cx="50" cy="50" fill="none" r="25" stroke="currentColor" strokeWidth="3" />
              </svg>
            </div>

            {/* DHA Clinical Document Header */}
            <div className="bg-slate-50 dark:bg-slate-900/80 p-5 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-[10px] tracking-widest text-teal-700 dark:text-teal-300 font-bold uppercase">
                    Dubai Health Authority
                  </p>
                  <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
                    Clinical Activity Dossier
                  </h4>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-teal-600 shadow-sm border border-slate-200 dark:border-slate-700">
                  <Icon name="local_hospital" className="text-xl" />
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[11px] text-slate-500">
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Ref:</span> #REP-2026-OCT-18
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Gen:</span> 18 Oct 2026, 11:45
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Clinician:</span> Dr. James (#DEN-48912)
                </div>
                <div>
                  <span className="font-bold text-slate-700 dark:text-slate-300">Location:</span> Operatory 02
                </div>
              </div>
            </div>

            {/* Metrics Breakdown Table */}
            <div className="p-5 space-y-4 text-xs">
              <div className="space-y-2">
                <h5 className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  Encounter Metrics (Real-Time)
                </h5>

                <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3.5 divide-y divide-slate-200 dark:divide-slate-600 space-y-2">
                  <div className="flex items-center justify-between pb-2">
                    <span className="text-slate-700 dark:text-slate-300">Total Booked Appointments</span>
                    <span className="font-bold text-slate-900 dark:text-white text-sm">8 Patients</span>
                  </div>

                  <div className="py-2.5">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Encounters Completed
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">3 Encounters</span>
                    </div>
                    <p className="text-slate-500 mt-1 pl-3.5 leading-relaxed">
                      • Marcus Vance (Composite Restorative #14)<br />
                      • Chairside prep &amp; Diagnostic Panorex<br />
                      • Periodontal Recare (#TP-2026-077)
                    </p>
                  </div>

                  <div className="py-2.5 bg-teal-50 dark:bg-teal-950/40 rounded-xl px-2.5 my-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-600 animate-ping" />
                        Live In-Chairside (Operatory 02)
                      </span>
                      <span className="font-mono text-[10px] font-bold bg-teal-600 text-white px-2 py-0.5 rounded">
                        ACTIVE
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-300 mt-1 pl-3.5">
                      Patient: <strong className="text-slate-900 dark:text-white">Amara Okafor</strong> (Ref: #TP-2026-089)<br />
                      Procedure: Direct Biomimetic Resin Composite (2-Surface MO) #16
                    </p>
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                      <span>Awaiting Seating</span>
                    </div>
                    <span className="font-semibold text-slate-900 dark:text-white">Fatima Al-Zahra (12:00)</span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="w-2 h-2 rounded-full bg-red-400" />
                      <span>Rescheduled / Cancelled</span>
                    </div>
                    <span className="font-semibold text-red-600 dark:text-red-400">Sarah Al-Maktoum (11:15)</span>
                  </div>
                </div>
              </div>

              {/* Billing Tariffs Breakdown */}
              <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Clinical Tariffs Summary
                  </span>
                  <span className="font-mono text-slate-400 text-[10px]">NABIDH Claim Feed</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                    <span className="text-slate-400 text-[11px] block">Gross Billed Tariffs</span>
                    <span className="font-extrabold text-slate-900 dark:text-white text-base">AED 4,250</span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 shadow-xs">
                    <span className="text-slate-400 text-[11px] block">Settled Copays</span>
                    <span className="font-extrabold text-teal-700 dark:text-teal-300 text-base">AED 610</span>
                  </div>
                </div>
              </div>

              {/* Compliance E-Signature Block */}
              <div className="bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 rounded-xl p-3.5 flex items-start gap-3">
                <Icon name="verified" filled className="text-xl text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-bold text-teal-900 dark:text-teal-200">100% NABIDH E-Sign Hash Verified</p>
                  <p className="text-teal-800 dark:text-teal-300 mt-0.5 leading-snug">
                    All 3 completed encounter records include verified local anesthesia dosages and diagnostic chart
                    sign-offs.
                  </p>
                  <p className="font-mono text-[10px] text-teal-700 dark:text-teal-400 mt-1">
                    SHA-256: d8f349a1bc8209e71e9a2b0e6fa92482
                  </p>
                </div>
              </div>
            </div>

            {/* Dossier Document Footer */}
            <div className="bg-slate-50 dark:bg-slate-900 px-5 py-2.5 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-slate-400 text-[11px]">
              <span>DHA Reg Form 14-B</span>
              <span>Official Telemetry Stream</span>
            </div>
          </div>
        </section>

        {/* Audit Team Strip */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Audit Counter-Signers Assigned
          </span>

          <div className="flex items-center gap-4">
            <div className="flex -space-x-3 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=120"
                alt="Dr. Daniel James"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
              <img
                src="https://images.unsplash.com/photo-1594824813576-9c4c1ef16047?auto=format&fit=crop&q=80&w=120"
                alt="Dr. Sophia Malik"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
              <img
                src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=120"
                alt="Dir. H. Farooq"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white dark:ring-slate-800"
              />
            </div>
            <div className="min-w-0 flex-1 text-xs">
              <p className="font-bold text-slate-900 dark:text-white truncate">Clinical Governance Board</p>
              <p className="text-slate-500 truncate">Dr. S. Malik (Supervisor) &amp; Dir. H. Farooq</p>
            </div>
            <Icon name="check_circle" filled className="text-teal-600 text-xl" />
          </div>
        </section>

        {/* Export & Distribution Actions */}
        <section className="space-y-2.5">
          <button
            disabled={isExporting}
            onClick={handleSimulateExport}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            <Icon name="picture_as_pdf" className="text-lg" />
            <span>{isExporting ? 'Compiling Official DHA Document...' : 'Simulate PDF Export & Download'}</span>
          </button>

          <button
            onClick={() => showToast('Day Sheet queued to Operatory 02 sterile printer')}
            className="w-full h-11 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-xs md:text-sm shadow-xs transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="print" className="text-base text-slate-500" />
            <span>Print Day Sheet / Operatory Roster</span>
          </button>

          <button
            onClick={() => showToast('Encrypted audit pack dispatched to Dr. Sophia Malik')}
            className="w-full h-10 text-teal-700 dark:text-teal-400 hover:underline font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <Icon name="forward_to_inbox" className="text-sm" />
            <span>Share Encrypted Copy with Clinic Director</span>
          </button>
        </section>

        {/* Statutory Regulatory Note */}
        <footer className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-start gap-2.5 text-xs text-slate-500">
          <Icon name="policy" className="text-base text-slate-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Statutory Notice:</strong> Reports contain protected clinical and financial data governed under UAE
            Federal Decree-Law No. (4) on Health Data Protection. Any unauthorized transmission outside DHA-certified
            gateways is logged permanently within the practitioner audit history.
          </p>
        </footer>

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="verified" filled className="text-teal-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
