import { useState } from 'react';
import { Link } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

interface DifferentialFinding {
  toothId: string;
  fdi: string;
  name: string;
  baselineStatus: string;
  currentStatus: string;
  evolutionType: 'New Pathology' | 'Stable Restoration' | 'Demineralization' | 'No Change';
  badgeColor: string;
  clinicalNote: string;
  recommendedAction: string;
}

const differentials: DifferentialFinding[] = [
  {
    toothId: '16',
    fdi: '#16',
    name: 'Upper Right 1st Molar',
    baselineStatus: 'Sound Enamel (14 Oct 2024)',
    currentStatus: 'Active Dentinal Caries ICDAS 4 (16 Feb 2025)',
    evolutionType: 'New Pathology',
    badgeColor: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800',
    clinicalNote: 'Rapid progression of distal interproximal caries over 4-month horizon. Cavitation verified with bitewing BW-01.',
    recommendedAction: 'Schedule restorative excavation and ceramic inlay within 14 days.',
  },
  {
    toothId: '46',
    fdi: '#46',
    name: 'Lower Right 1st Molar',
    baselineStatus: 'Deep Anatomical Fissures (14 Oct 2024)',
    currentStatus: 'Incipient Enamel Demineralization (16 Feb 2025)',
    evolutionType: 'Demineralization',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
    clinicalNote: 'Central pit demineralization without cavitation. ICDAS code 1-2.',
    recommendedAction: 'Apply 5% sodium fluoride varnish topical application and monitor at 6-month recall.',
  },
  {
    toothId: '21',
    fdi: '#21',
    name: 'Upper Left Central Incisor',
    baselineStatus: 'Composite Restored MI (14 Oct 2024)',
    currentStatus: 'Composite Restored MI Intact (16 Feb 2025)',
    evolutionType: 'Stable Restoration',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
    clinicalNote: 'No secondary caries along margin. Shade match stable. Marginal ridge intact.',
    recommendedAction: 'Continue standard routine hygiene surveillance.',
  },
  {
    toothId: '18_48',
    fdi: '#18 / #48',
    name: 'Upper & Lower Right 3rd Molars',
    baselineStatus: 'Absent (14 Oct 2024)',
    currentStatus: 'Absent (16 Feb 2025)',
    evolutionType: 'No Change',
    badgeColor: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    clinicalNote: '#18 agenesis confirmed by OPG. #48 surgically extracted in 2021.',
    recommendedAction: 'No intervention required.',
  },
];

export function OdontogramComparisonScreen() {
  const [baselineDate, setBaselineDate] = useState<string>('2024-10-14');
  const [currentDate, setCurrentDate] = useState<string>('2025-02-16');
  const [viewMode, setViewMode] = useState<'differential' | 'quadrant'>('differential');
  const [exported, setExported] = useState<boolean>(false);

  const handleExport = () => {
    setExported(true);
    setTimeout(() => setExported(false), 2500);
  };

  return (
    <OdontogramShell
      pageTitle="Odontogram Comparison & Differential"
      badgeCode="9.10"
      badgeLabel="Algorithmic Evolution Tracing"
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-6 text-white shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm tracking-wide uppercase">
                  Section 9.10 • Comparative Differential
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                  4-Month Delta Analyzed
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Odontogram Comparison & Differential</h1>
              <p className="mt-1 text-sm text-blue-100 max-w-2xl">
                Algorithmic side-by-side progression tracking contrasting the previous annual baseline against the sealed 2025 examination.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleExport}
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold bg-white text-primary hover:bg-white/90 shadow transition-colors"
              >
                <Icon name="download" className="text-base" />
                <span>{exported ? 'Report Exported!' : 'Export Delta Report'}</span>
              </button>
              <Link
                to="/odontogram/history"
                className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 backdrop-blur text-white transition-colors"
              >
                <Icon name="history" className="text-base" />
                <span>Timeline</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Date Selectors & Interval Header */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Baseline T0 */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Baseline Examination (T₀)
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">14 Oct 2024</div>
                  <div className="text-xs text-slate-500">Dr. Sarah Al-Maktoum (#DEN-39104)</div>
                </div>
                <select
                  value={baselineDate}
                  onChange={(e) => setBaselineDate(e.target.value)}
                  className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="2024-10-14">14 Oct 2024</option>
                  <option value="2024-01-12">12 Jan 2024</option>
                  <option value="2022-08-05">05 Aug 2022</option>
                </select>
              </div>
            </div>

            {/* Delta Indicator */}
            <div className="flex flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <Icon name="compare_arrows" className="text-sm" />
                <span>4 Months (125 Days) Interval</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">1 New Active Caries • 1 Incipient Lesion</p>
            </div>

            {/* Current T1 */}
            <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                Current Examination (T₁)
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm text-slate-900 dark:text-white">16 Feb 2025 (Current)</div>
                  <div className="text-xs text-slate-500">Dr. Daniel Example (#DEN-48912)</div>
                </div>
                <select
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-300 focus:outline-none"
                >
                  <option value="2025-02-16">16 Feb 2025</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* View Switcher & Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('differential')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'differential'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Evolution Cards
            </button>
            <button
              onClick={() => setViewMode('quadrant')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                viewMode === 'quadrant'
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              Quadrant Matrix
            </button>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> New Pathology
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Demineralization
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Stable Restoration
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Missing / Sound
            </span>
          </div>
        </div>

        {/* Main Differential Findings */}
        {viewMode === 'differential' ? (
          <div className="space-y-4">
            {differentials.map((diff) => (
              <div
                key={diff.toothId}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-mono font-bold text-base">
                      {diff.fdi}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">{diff.name}</h3>
                      <span className={`inline-block mt-0.5 px-2 py-0.5 rounded text-[10px] font-semibold border ${diff.badgeColor}`}>
                        {diff.evolutionType}
                      </span>
                    </div>
                  </div>
                </div>

                {/* T0 vs T1 Side by side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                    <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">Baseline (14 Oct 2024)</div>
                    <div className="font-semibold text-slate-800 dark:text-slate-200">{diff.baselineStatus}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20">
                    <div className="text-[10px] uppercase font-bold text-primary mb-1">Current (16 Feb 2025)</div>
                    <div className="font-semibold text-slate-900 dark:text-white">{diff.currentStatus}</div>
                  </div>
                </div>

                {/* Clinical Assessment & Recommended Action */}
                <div className="pt-2 text-xs space-y-1.5 text-slate-700 dark:text-slate-300">
                  <p>
                    <strong className="text-slate-900 dark:text-white">Differential Note:</strong> {diff.clinicalNote}
                  </p>
                  <p className="text-primary font-medium">
                    <strong>Protocol Action:</strong> {diff.recommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Quadrant Matrix Mode */
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Quadrant Differential Progression Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-red-200 bg-red-50/30 dark:border-red-900/40 dark:bg-red-950/20">
                <span className="text-xs font-bold text-red-700 dark:text-red-400 uppercase">Quadrant 1 (Maxillary Right)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Progression detected on Tooth #16 (New Caries). Mean probing depth increased +0.5mm.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Quadrant 2 (Maxillary Left)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Stable. Tooth #21 composite restoration verified sound with no margin discoloration.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase">Quadrant 3 (Mandibular Left)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Stable. No new active lesions. Plaque index 15%.
                </p>
              </div>
              <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/30 dark:border-amber-900/40 dark:bg-amber-950/20">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase">Quadrant 4 (Mandibular Right)</span>
                <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
                  Tooth #46 incipient fissure demineralization under topical fluoride surveillance.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Non-Resolution Principle Banner */}
        <div className="rounded-2xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 p-4 text-xs text-slate-600 dark:text-slate-300 flex items-start gap-3">
          <Icon name="info" className="text-primary text-lg mt-0.5" />
          <div>
            <strong className="text-slate-900 dark:text-white">DHA Principle of Clinical Non-Resolution:</strong>
            <span className="ml-1">
              Archived historical examinations reflect verified clinical observations at the moment of sealing. Differences between examinations are stored as biological evolutions and cannot be retroactively edited.
            </span>
          </div>
        </div>
      </div>
    </OdontogramShell>
  );
}
export default OdontogramComparisonScreen;
