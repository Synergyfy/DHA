import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

export function ProfessionalActivityOverviewScreen() {
  const navigate = useNavigate();

  // State
  const [perspective, setPerspective] = useState<'personal' | 'team'>('personal');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');

  return (
    <ClinicalWorkspaceShell activeTab="dashboard">
      <div className="max-w-6xl mx-auto space-y-6 pb-32 md:pb-12">
        {/* Top Practitioner Banner & Context Badge */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 md:p-6 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-xs font-bold uppercase tracking-wider">
              <Icon name="verified" filled className="text-sm" />
              VERIFIED PRACTITIONER
            </span>
            <span className="font-mono text-xs text-slate-500 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg">
              Week 42 • Q4 2026
            </span>
          </div>

          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=260"
              alt="Dr. Daniel James"
              className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover shadow-sm ring-2 ring-teal-500/20"
            />
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white truncate">
                Dr. Daniel James, DDS
              </h1>
              <p className="text-xs md:text-sm text-slate-500 truncate mt-0.5">
                Licence <span className="font-mono font-bold text-teal-700 dark:text-teal-400">#DEN-48912</span> • Restorative Lead • Harmony Wuse 2
              </p>
            </div>
          </div>
        </div>

        {/* Statutory Ethical Healthcare Notice */}
        <div className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 flex items-start gap-3 shadow-xs">
          <Icon name="verified_user" className="text-xl text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider block">
              Clinical Governance &amp; Ethics Notice
            </span>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              Activity metrics reflect clinical workload throughput and operational continuity for resource scheduling.
              In accordance with DHA statutory guidance, metrics do not represent competitive commercial rankings or
              quotas.
            </p>
          </div>
        </div>

        {/* Perspective Switcher & Timeframe Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Perspective switcher */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs">
            <button
              onClick={() => setPerspective('personal')}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                perspective === 'personal'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon name="person" className="text-sm" />
              <span>My Personal Activity</span>
            </button>
            <button
              onClick={() => setPerspective('team')}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
                perspective === 'team'
                  ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Icon name="domain" className="text-sm" />
              <span>Harmony Wuse 2</span>
            </button>
          </div>

          {/* Timeframe tabs */}
          <div className="flex items-center gap-1 text-xs overflow-x-auto pb-1 no-scrollbar">
            {(['daily', 'weekly', 'monthly', 'custom'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTimeframe(t)}
                className={`px-3.5 py-1.5 rounded-full capitalize font-semibold transition-all ${
                  timeframe === t
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {t === 'custom' ? 'Custom Q4' : t}
              </button>
            ))}
          </div>
        </div>

        {/* Active Window Indicator Bar */}
        <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Icon name="date_range" className="text-teal-600 text-base" />
            <span className="font-bold text-slate-900 dark:text-white">12 Oct 2026 – 18 Oct 2026</span>
          </div>
          <span className="font-mono font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-900/40 px-2.5 py-0.5 rounded-md">
            Week 42
          </span>
        </div>

        {/* 6 Key Clinical Volume KPI Cards (2x3 Grid on mobile, 3-col on desktop) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="font-bold text-slate-900 dark:text-white text-base">Clinical Throughput</h2>
            <span className="text-xs text-slate-500">Validated EMR Records</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* 1. Patients Attended */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Icon name="person_check" className="text-base" />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  ↑ 8%
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">38</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Patients Attended</p>
                <p className="text-[11px] text-slate-400">vs 35 prior week</p>
              </div>
            </div>

            {/* 2. Examinations Completed */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon name="clinical_notes" className="text-base" />
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                  Comp + Tri
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">19</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Examinations</p>
                <p className="text-[11px] text-slate-400">14 routine, 5 urgent</p>
              </div>
            </div>

            {/* 3. Treatment Plans Formulated */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <Icon name="rule" className="text-base" />
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2 py-0.5 rounded-md">
                  88% Acc.
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">14</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Plans Formulated</p>
                <p className="text-[11px] text-slate-400">12 accepted by pt</p>
              </div>
            </div>

            {/* 4. Treatments Completed */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 dark:text-teal-400">
                  <Icon name="task_alt" className="text-base" />
                </div>
                <span className="text-[10px] font-bold text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40 px-2 py-0.5 rounded">
                  Restored
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">22</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Treatments Done</p>
                <p className="text-[11px] text-slate-400">Biomimetic &amp; recare</p>
              </div>
            </div>

            {/* 5. Investigations Reviewed */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Icon name="radiology" className="text-base" />
                </div>
                <span className="font-mono text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded">
                  OPG / CBCT
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">31</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Investigations</p>
                <p className="text-[11px] text-slate-400">Zero backlogged</p>
              </div>
            </div>

            {/* 6. Follow-ups Satisfied */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Icon name="sync_saved_locally" className="text-base" />
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                  94% Comp.
                </span>
              </div>
              <div className="mt-3">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white">16</span>
                <p className="font-bold text-slate-900 dark:text-white text-xs md:text-sm mt-0.5">Follow-ups Met</p>
                <p className="text-[11px] text-slate-400">15 on-schedule</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Workload: Daily Encounter Distribution Chart */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Weekly Encounter Distribution</h3>
              <p className="text-xs text-slate-500">Daily clinical throughput (Mon–Sun)</p>
            </div>
            <span className="text-teal-700 dark:text-teal-300 font-mono text-xs font-bold bg-teal-50 dark:bg-teal-900/40 px-2.5 py-1 rounded-lg">
              38 Total Encounters
            </span>
          </div>

          {/* CSS Bar Chart */}
          <div className="pt-4 pb-2 flex items-end justify-between gap-3 h-44 border-b border-slate-100 dark:border-slate-700">
            {([
              { day: 'Mon', count: 8, height: '64%', isPeak: false },
              { day: 'Tue', count: 9, height: '72%', isPeak: false },
              { day: 'Wed', count: 5, height: '40%', isPeak: false },
              { day: 'Thu', count: 10, height: '80%', isPeak: true },
              { day: 'Fri', count: 8, height: '64%', isPeak: false },
              { day: 'Sat', count: 0, height: '8%', isPeak: false, isRest: true },
              { day: 'Sun', count: 6, height: '48%', isPeak: false, isToday: true },
            ] as { day: string; count: number; height: string; isPeak?: boolean; isRest?: boolean; isToday?: boolean }[]).map((col) => (
              <div key={col.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <span
                  className={`text-xs font-mono font-bold ${
                    col.isPeak
                      ? 'text-teal-600 dark:text-teal-400'
                      : col.isToday
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-slate-500'
                  }`}
                >
                  {col.isRest ? '–' : col.count}
                </span>

                <div
                  className={`w-full rounded-t-xl transition-all duration-300 ${
                    col.isPeak
                      ? 'bg-teal-600 shadow-sm'
                      : col.isToday
                      ? 'bg-emerald-500'
                      : col.isRest
                      ? 'bg-slate-200 dark:bg-slate-700 border-dashed'
                      : 'bg-teal-200 dark:bg-teal-900/60 hover:bg-teal-300'
                  }`}
                  style={{ height: col.height }}
                />

                <span
                  className={`text-xs font-semibold ${
                    col.isPeak
                      ? 'text-teal-600 dark:text-teal-400 font-bold'
                      : col.isToday
                      ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  {col.isToday ? 'Today' : col.day}
                </span>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 dark:bg-slate-700/40 rounded-xl p-3 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <Icon name="timelapse" className="text-teal-600 text-sm" />
              <span>Active Chair Time Peak:</span>
            </div>
            <span className="font-bold text-slate-900 dark:text-white">Thursday (6.5 hrs chairside)</span>
          </div>
        </section>

        {/* Visual Discipline Mix & Procedure Breakdown */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Clinical Discipline Mix</h3>
              <p className="text-xs text-slate-500">Procedure categorization this week</p>
            </div>
            <span className="font-mono text-xs text-slate-400">4 Disciplines</span>
          </div>

          {/* Segmented multi-color progress bar */}
          <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden flex shadow-inner">
            <div className="bg-teal-600 h-full" style={{ width: '45%' }} title="Restorative (45%)" />
            <div className="bg-emerald-500 h-full" style={{ width: '30%' }} title="Preventative (30%)" />
            <div className="bg-blue-600 h-full" style={{ width: '15%' }} title="Endodontics (15%)" />
            <div className="bg-purple-500 h-full" style={{ width: '10%' }} title="Prosthodontics (10%)" />
          </div>

          {/* Grid Legend */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Restorative</span>
              </div>
              <span className="font-bold text-teal-700 dark:text-teal-400">45%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Preventative</span>
              </div>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">30%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Endodontics</span>
              </div>
              <span className="font-bold text-blue-600 dark:text-blue-400">15%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                <span className="font-medium text-slate-700 dark:text-slate-300">Prosthodontics</span>
              </div>
              <span className="font-bold text-purple-600 dark:text-purple-400">10%</span>
            </div>
          </div>
        </section>

        {/* Operational Quality & Governance Metrics */}
        <section className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Governance &amp; Workflow Metrics</h3>
            <Icon name="help_outline" className="text-slate-400 text-sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Metric 1: Follow-up Compliance */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center gap-3.5">
              <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-200 dark:text-slate-600"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3.5"
                  />
                  <path
                    className="text-teal-600"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="94, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  />
                </svg>
                <span className="absolute font-mono font-bold text-teal-600 text-[11px]">94%</span>
              </div>
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Follow-up Compliance</span>
                <p className="text-slate-500 mt-0.5">15 of 16 follow-up reviews on-schedule</p>
              </div>
            </div>

            {/* Metric 2: Average Sign-off Time */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">Chart Sign-off Window</span>
                <span className="font-mono font-bold text-teal-700 dark:text-teal-300">18.4 hrs</span>
              </div>
              <p className="text-slate-500">Within statutory 24-hr DHA mandatory limit</p>
              <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
                <div className="bg-teal-600 h-full rounded-full" style={{ width: '76%' }} />
              </div>
            </div>

            {/* Metric 3: Operatory Utilization */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white">Operatory 02 Pace</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">84%</span>
              </div>
              <p className="text-slate-500">Optimal hygiene cycle maintained (18m turnover)</p>
              <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '84%' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Primary Action to 14.12 */}
        <div className="space-y-2">
          <button
            onClick={() => navigate('/dentist/activity-reports')}
            className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 active:scale-95"
          >
            <Icon name="summarize" className="text-lg" />
            <span>Generate Personal Activity Report (Sec 14.12)</span>
          </button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 py-1">
            <Icon name="lock" className="text-xs" />
            <span>Audit log secured • DHA Clinical Governance ISO 27799</span>
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
