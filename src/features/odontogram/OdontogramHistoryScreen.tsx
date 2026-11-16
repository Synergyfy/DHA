import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { OdontogramShell } from './OdontogramShell';
import { Icon } from '../../design/Primitives';

interface OdontogramRecord {
  id: string;
  sealId: string;
  date: string;
  type: 'Annual' | 'Emergency' | 'Baseline' | 'Amended';
  doctor: string;
  clinic: string;
  findingsCount: number;
  highlight: string;
  status: 'Sealed' | 'Archived' | 'Amended';
  isCurrent?: boolean;
}

const historyRecords: OdontogramRecord[] = [
  {
    id: 'DHA-ODO-2025-00492',
    sealId: 'DHA-SEAL-8849',
    date: '16 Feb 2025',
    type: 'Annual',
    doctor: 'Dr. Daniel Example (DEN-48912)',
    clinic: 'Lagos Dental Hospital, Sector B-302',
    findingsCount: 3,
    highlight: 'New active caries identified on #16 DO (ICDAS 4). Tooth #46 incipient fissure demineralization under surveillance. #21 restoration sound.',
    status: 'Sealed',
    isCurrent: true,
  },
  {
    id: 'DHA-ODO-2024-00318',
    sealId: 'DHA-SEAL-7104',
    date: '14 Oct 2024',
    type: 'Annual',
    doctor: 'Dr. Zainab Musa (DEN-39104)',
    clinic: 'Surulere Primary Care Dental Centre',
    findingsCount: 1,
    highlight: 'Sound dentition. Tooth #21 composite restoration verified stable. Probing depths uniform ≤2mm.',
    status: 'Archived',
  },
  {
    id: 'DHA-ODO-2024-EM008',
    sealId: 'DHA-SEAL-6629',
    date: '12 Jan 2024',
    type: 'Emergency',
    doctor: 'Dr. Tariq Mansoor (DEN-28941)',
    clinic: 'Lagos Emergency Dental Hub',
    findingsCount: 1,
    highlight: 'Focal examination of Quadrant 1 for cold hypersensitivity. Transillumination showed enamel craze lines on #16.',
    status: 'Archived',
  },
  {
    id: 'DHA-ODO-2022-00102',
    sealId: 'DHA-SEAL-1102',
    date: '05 Aug 2022',
    type: 'Baseline',
    doctor: 'Dr. Fatima Rashid (DEN-19943)',
    clinic: 'Victoria Island Health Centre',
    findingsCount: 2,
    highlight: 'Initial electronic registry baseline chart. Placed composite restoration on #21 MI following incisal sports micro-trauma.',
    status: 'Archived',
  },
];

export function OdontogramHistoryScreen() {
  const navigate = useNavigate();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRecordIds, setSelectedRecordIds] = useState<string[]>([
    'DHA-ODO-2025-00492',
    'DHA-ODO-2024-00318',
  ]);

  const filteredRecords = historyRecords.filter((record) => {
    const matchesFilter =
      filterType === 'all' ||
      (filterType === 'annual' && record.type === 'Annual') ||
      (filterType === 'emergency' && record.type === 'Emergency') ||
      (filterType === 'baseline' && record.type === 'Baseline');

    const matchesSearch =
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.clinic.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const toggleSelect = (id: string) => {
    if (selectedRecordIds.includes(id)) {
      setSelectedRecordIds(selectedRecordIds.filter((item) => item !== id));
    } else {
      if (selectedRecordIds.length >= 2) {
        // Keep the latest 1 and replace the older one
        setSelectedRecordIds([selectedRecordIds[0], id]);
      } else {
        setSelectedRecordIds([...selectedRecordIds, id]);
      }
    }
  };

  const handleLaunchCompare = () => {
    navigate('/odontogram/compare');
  };

  return (
    <OdontogramShell
      pageTitle="Odontogram History"
      badgeCode="9.9"
      badgeLabel="Longitudinal Registry Records"
    >
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-secondary p-6 text-white shadow-lg">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm tracking-wide uppercase">
                  Section 9.9 • Longitudinal Timeline
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-white/10 text-blue-100">
                  4 Historic Seals Recorded
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Odontogram Longitudinal History</h1>
              <p className="mt-1 text-sm text-blue-100 max-w-2xl">
                Chronological ledger of sealed dental examinations, progression tracings, and restorative interventions for patient Amina Yusuf.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/odontogram/compare"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-white text-primary hover:bg-white/90 shadow transition-colors"
              >
                <Icon name="compare_arrows" className="text-base" />
                <span>Comparative Differential</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Horizon Sparkline & Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Charting Horizon</div>
            <div className="text-xl font-extrabold text-slate-900 dark:text-white mt-1">2.5 Years</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Aug 2022 → Feb 2025</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Total Sealed Examinations</div>
            <div className="text-xl font-extrabold text-primary mt-1">4 Records</div>
            <p className="text-[11px] text-slate-500 mt-0.5">100% Cryptographically verified</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Caries Incidence Rate</div>
            <div className="text-xl font-extrabold text-amber-600 mt-1">0.4 / yr</div>
            <p className="text-[11px] text-slate-500 mt-0.5">Low-to-moderate caries risk</p>
          </div>
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Restorative Survival</div>
            <div className="text-xl font-extrabold text-emerald-600 mt-1">100%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">#21 MI intact at 30 months</p>
          </div>
        </div>

        {/* Floating Comparison Drawer if 2 selected */}
        {selectedRecordIds.length === 2 && (
          <div className="sticky top-20 z-20 p-4 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white shadow-xl border border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-primary text-white">
                <Icon name="compare" className="text-lg" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-300">Comparison Pair Selected</div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>{selectedRecordIds[1]}</span>
                  <Icon name="arrow_forward" className="text-xs text-slate-400" />
                  <span className="text-emerald-300">{selectedRecordIds[0]} (Current)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedRecordIds([])}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleLaunchCompare}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-container text-white shadow flex items-center gap-1.5 transition-colors"
              >
                <span>Launch Comparative Differential</span>
                <Icon name="arrow_forward" className="text-sm" />
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Icon name="search" className="absolute left-3 top-2.5 text-slate-400 text-base" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records, findings, doctors..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'all', label: 'All Records' },
              { id: 'annual', label: 'Annual Recalls' },
              { id: 'emergency', label: 'Emergency' },
              { id: 'baseline', label: 'Baselines' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterType === tab.id
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {filteredRecords.map((record) => {
            const isSelected = selectedRecordIds.includes(record.id);

            return (
              <div
                key={record.id}
                className={`rounded-2xl border transition-all p-5 bg-white dark:bg-slate-900 shadow-sm ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5 dark:bg-primary/10'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(record.id)}
                      className="mt-1 rounded text-primary focus:ring-primary h-4 w-4 border-slate-300 dark:border-slate-700 cursor-pointer"
                      title="Select for comparison"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">{record.id}</span>
                        {record.isCurrent && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                            Current / Active
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                          {record.type}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        Examined on <strong>{record.date}</strong> • Seal: <span className="font-mono">{record.sealId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {record.findingsCount} findings documented
                    </span>
                    <Link
                      to="/odontogram/overview"
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors inline-flex items-center gap-1"
                    >
                      <span>Inspect</span>
                      <Icon name="visibility" className="text-xs" />
                    </Link>
                  </div>
                </div>

                <div className="mt-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p>{record.highlight}</p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500">
                  <span>Practitioner: <strong>{record.doctor}</strong></span>
                  <span>Facility: {record.clinic}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </OdontogramShell>
  );
}
export default OdontogramHistoryScreen;
