import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { QuickLinks } from '../../design/QuickLinks';

/* ─── Types ────────────────────────────────────────────────────── */

interface PatientAlert {
  label: string;
  tone: 'red' | 'amber' | 'blue';
}

interface PatientCard {
  id: string;
  name: string;
  age: number;
  sex: 'M' | 'F';
  dhaId: string;
  status: string;
  statusTone: 'teal' | 'amber' | 'red';
  statusPulse?: boolean;
  current: string;
  plan?: string;
  lastVisit: string;
  nextVisit: string;
  insurance: string;
  alerts?: PatientAlert[];
  avatarBg: string;
  initials: string;
  microBadge?: { label: string; tone: 'green' | 'blue' | 'amber' | 'red' };
}

/* ─── Static Data ──────────────────────────────────────────────── */

const PATIENTS: PatientCard[] = [
  {
    id: '1',
    name: 'Amara Okafor',
    age: 34,
    sex: 'F',
    dhaId: 'DHA-2026-00451',
    status: 'Active Treatment',
    statusTone: 'teal',
    current: 'Tooth #16 Biomimetic Composite (Phase 1)',
    plan: 'TP-2026-089',
    lastVisit: '18 Oct 2026',
    nextVisit: '25 Oct 2026',
    insurance: 'Daman National Health',
    alerts: [{ label: 'Penicillin Allergy', tone: 'red' }],
    avatarBg: 'bg-teal-600',
    initials: 'AO',
  },
  {
    id: '2',
    name: 'Chinedu Okafor',
    age: 41,
    sex: 'M',
    dhaId: 'DHA-07234',
    status: 'Follow-up Pending',
    statusTone: 'amber',
    current: 'Endo Review #16 — Post-Op Assessment',
    lastVisit: '12 Oct 2026',
    nextVisit: '18 Oct 2026',
    insurance: 'AXA Gulf',
    avatarBg: 'bg-blue-600',
    initials: 'CO',
  },
  {
    id: '3',
    name: 'Fatima Al-Zahra',
    age: 28,
    sex: 'F',
    dhaId: 'DHA-08921',
    status: 'Active Treatment',
    statusTone: 'teal',
    current: 'GBR Bone Regeneration (Tooth #14)',
    plan: 'TP-2026-112',
    lastVisit: '10 Oct 2026',
    nextVisit: '18 Oct 2026',
    insurance: 'Daman National Health',
    avatarBg: 'bg-purple-600',
    initials: 'FA',
  },
  {
    id: '4',
    name: 'Marcus Vance',
    age: 28,
    sex: 'M',
    dhaId: 'DHA-00412',
    status: 'Recare Due',
    statusTone: 'amber',
    current: 'Periodontal Maintenance',
    lastVisit: '18 Oct 2026',
    nextVisit: '18 Apr 2027 (6-month recare)',
    insurance: 'ADNIC Premium',
    microBadge: { label: 'BOP 4%', tone: 'green' },
    avatarBg: 'bg-emerald-600',
    initials: 'MV',
  },
  {
    id: '5',
    name: 'Tariq Latif',
    age: 56,
    sex: 'M',
    dhaId: 'DHA-05432',
    status: 'Urgent',
    statusTone: 'red',
    statusPulse: true,
    current: 'Tooth #47 Full Coverage Ceramic Crown — DEFERRED',
    lastVisit: '05 Oct 2026',
    nextVisit: 'Pending clearance',
    insurance: 'Orient Insurance',
    alerts: [{ label: 'Cardiology Clearance Required', tone: 'amber' }],
    avatarBg: 'bg-rose-600',
    initials: 'TL',
  },
];

type SegTab = 'assigned' | 'recent' | 'all';
type FilterKey = 'all' | 'urgent' | 'active' | 'recare' | 'new';
type SortKey = 'az' | 'za' | 'lastVisit' | 'urgency';

const SEG_TABS: { key: SegTab; label: string; count: number }[] = [
  { key: 'assigned', label: 'Assigned', count: 42 },
  { key: 'recent', label: 'Recent', count: 8 },
  { key: 'all', label: 'All Clinic', count: 312 },
];

const FILTER_PILLS: { key: FilterKey; label: string; count: number; dot: string }[] = [
  { key: 'all', label: 'All', count: 0, dot: '' },
  { key: 'urgent', label: 'Urgent', count: 5, dot: 'bg-red-500' },
  { key: 'active', label: 'Active Plans', count: 18, dot: 'bg-blue-500' },
  { key: 'recare', label: 'Recare Due', count: 12, dot: 'bg-amber-500' },
  { key: 'new', label: 'New Patients', count: 4, dot: 'bg-emerald-500' },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'az', label: 'A-Z' },
  { key: 'za', label: 'Z-A' },
  { key: 'lastVisit', label: 'Last Visit' },
  { key: 'urgency', label: 'Urgency' },
];

const STATUS_STYLES: Record<string, string> = {
  teal: 'bg-teal-100 text-teal-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-800',
};

const MICRO_BADGE_STYLES: Record<string, string> = {
  green: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  red: 'bg-red-100 text-red-700',
};

/* ─── Component ────────────────────────────────────────────────── */

export function MyPatientsScreen() {
  const navigate = useNavigate();

  const [activeSegTab, setActiveSegTab] = useState<SegTab>('assigned');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [sortKey, setSortKey] = useState<SortKey>('az');
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  /* ── filtering & sorting ─── */
  const filtered = PATIENTS.filter((p) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (
        !p.name.toLowerCase().includes(q) &&
        !p.dhaId.toLowerCase().includes(q) &&
        !p.current.toLowerCase().includes(q)
      )
        return false;
    }
    if (activeFilter === 'urgent') return p.statusTone === 'red';
    if (activeFilter === 'active') return p.status === 'Active Treatment';
    if (activeFilter === 'recare') return p.status === 'Recare Due';
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortKey === 'za') return b.name.localeCompare(a.name);
    if (sortKey === 'urgency') {
      const order: Record<string, number> = { red: 0, amber: 1, teal: 2 };
      return (order[a.statusTone] ?? 3) - (order[b.statusTone] ?? 3);
    }
    return a.name.localeCompare(b.name);
  });

  const showToast = () => {
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <ClinicalWorkspaceShell
      activeNav="patients"
      pageTitle="My Patients"
      badgeCode="14.6"
      badgeLabel="Patient Management"
    >
      {/* ── Operational Banner ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm ring-2 ring-[#cce5ff]">
            DJ
          </div>
          <div>
            <h1 className="text-lg font-bold text-[#131b2e] leading-tight">
              Dr. Daniel James
            </h1>
            <p className="text-xs text-[#707881]">General Dentist • Harmony Wuse 2</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#006194] text-xs font-bold">
          <Icon name="groups" className="text-[16px]" />
          42 Active Caseload
        </span>
      </div>

      {/* ── Segmented Tabs ── */}
      <div className="border-b border-[#eaedff] mb-4 -mx-1 overflow-x-auto">
        <div className="flex gap-1 min-w-max px-1">
          {SEG_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setActiveSegTab(t.key)}
              className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeSegTab === t.key
                  ? 'border-[#006194] text-[#006194]'
                  : 'border-transparent text-[#707881] hover:text-[#131b2e] hover:border-[#ccc]'
              }`}
            >
              {t.label}{' '}
              <span
                className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                  activeSegTab === t.key
                    ? 'bg-[#006194] text-white'
                    : 'bg-[#f2f3ff] text-[#707881]'
                }`}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Search Bar ── */}
      <div className="relative mb-4">
        <Icon
          name="search"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[20px] text-[#707881] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search patients by name, ID, condition..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#eaedff] bg-white text-sm text-[#131b2e] placeholder:text-[#707881]/60 focus:outline-none focus:ring-2 focus:ring-[#006194]/30 focus:border-[#006194] transition-all"
        />
      </div>

      {/* ── Filter Pills + Sort ── */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1 -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          {FILTER_PILLS.map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setActiveFilter(f.key)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap border transition-colors ${
                activeFilter === f.key
                  ? 'bg-[#006194] text-white border-[#006194]'
                  : 'bg-white text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
              }`}
            >
              {f.dot && (
                <span
                  className={`w-2 h-2 rounded-full shrink-0 ${
                    activeFilter === f.key ? 'bg-white' : f.dot
                  }`}
                />
              )}
              {f.label}
              {f.count > 0 && (
                <span
                  className={`ml-0.5 text-[10px] px-1 rounded-full ${
                    activeFilter === f.key
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f2f3ff] text-[#707881]'
                  }`}
                >
                  {f.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="relative ml-auto shrink-0">
          <button
            type="button"
            onClick={() => setSortOpen(!sortOpen)}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#eaedff] bg-white text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
          >
            <Icon name="sort" className="text-[16px]" />
            {SORT_OPTIONS.find((s) => s.key === sortKey)?.label}
            <Icon name="expand_more" className="text-[14px]" />
          </button>
          {sortOpen && (
            <div className="absolute right-0 mt-1 w-36 bg-white rounded-xl shadow-lg border border-[#eaedff] py-1 z-30">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => {
                    setSortKey(s.key);
                    setSortOpen(false);
                  }}
                  className={`w-full px-3 py-2 text-left text-xs font-medium hover:bg-[#f2f3ff] transition-colors flex items-center justify-between ${
                    sortKey === s.key
                      ? 'text-[#006194] font-bold bg-[#f2f3ff]'
                      : 'text-[#3f4850]'
                  }`}
                >
                  {s.label}
                  {sortKey === s.key && <Icon name="check" className="text-[14px]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Patient Cards Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {sorted.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => navigate('/dentist/appointment-details')}
            className="text-left bg-white rounded-2xl border border-[#eaedff] p-4 hover:shadow-md hover:border-[#cce5ff] transition-all group cursor-pointer"
          >
            {/* Card Header */}
            <div className="flex items-start gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-full ${p.avatarBg} text-white flex items-center justify-center text-xs font-bold shrink-0`}
              >
                {p.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-[#131b2e] group-hover:text-[#006194] transition-colors truncate">
                    {p.name}
                  </span>
                  <span className="text-[11px] text-[#707881]">
                    {p.age}y {p.sex}
                  </span>
                </div>
                <span className="text-[11px] text-[#707881] font-mono">{p.dhaId}</span>
              </div>
              {/* Status Badge */}
              <span
                className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap ${STATUS_STYLES[p.statusTone]}`}
              >
                {p.statusPulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                  </span>
                )}
                {p.status}
              </span>
            </div>

            {/* Current Treatment */}
            <div className="mb-2">
              <p className="text-xs text-[#3f4850] leading-snug">
                <span className="font-semibold text-[#131b2e]">Current: </span>
                {p.current}
              </p>
              {p.plan && (
                <p className="text-[11px] text-[#707881] mt-0.5">
                  Plan: {p.plan}
                </p>
              )}
            </div>

            {/* Visit Dates */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#707881] mb-2">
              <span className="inline-flex items-center gap-1">
                <Icon name="event" className="text-[13px]" />
                Last: {p.lastVisit}
              </span>
              <span className="inline-flex items-center gap-1">
                <Icon name="event_upcoming" className="text-[13px]" />
                Next: {p.nextVisit}
              </span>
            </div>

            {/* Insurance */}
            <p className="text-[11px] text-[#707881] mb-2 inline-flex items-center gap-1">
              <Icon name="health_and_safety" className="text-[13px]" />
              {p.insurance}
            </p>

            {/* Alerts & Micro Badges */}
            {(p.alerts || p.microBadge) && (
              <div className="flex flex-wrap gap-1.5 mt-1">
                {p.alerts?.map((a) => (
                  <span
                    key={a.label}
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      a.tone === 'red'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    <Icon name="warning" className="text-[12px]" />
                    {a.label}
                  </span>
                ))}
                {p.microBadge && (
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${MICRO_BADGE_STYLES[p.microBadge.tone]}`}
                  >
                    {p.microBadge.label}
                  </span>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* ── NABIDH Governance Notice ── */}
      <div className="bg-[#f0f4ff] border border-[#d6e2ff] rounded-2xl p-4 flex items-start gap-3 mb-8">
        <div className="w-9 h-9 rounded-xl bg-[#dbe4ff] flex items-center justify-center shrink-0">
          <Icon name="verified_user" className="text-[20px] text-[#006194]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#131b2e] mb-0.5">
            NABIDH Access Governance
          </h3>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            Patient records are accessed under DHA Clinical Privilege License
            CPL-2026-DJ-0891. All access logged per Dubai Health Data Protection
            Regulation.
          </p>
        </div>
      </div>

      {/* ── FAB — mobile: fixed, desktop: inline ── */}
      <div className="hidden md:flex justify-end mb-4">
        <button
          type="button"
          onClick={showToast}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#006194] text-white text-sm font-bold shadow-lg hover:bg-[#007bb9] transition-colors"
        >
          <Icon name="person_add" className="text-[20px]" />
          New Intake / Search
        </button>
      </div>

      <button
        type="button"
        onClick={showToast}
        className="md:hidden fixed bottom-20 right-4 z-40 flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#006194] text-white text-sm font-bold shadow-xl hover:bg-[#007bb9] transition-colors"
      >
        <Icon name="person_add" className="text-[20px]" />
        <span>New Intake</span>
      </button>

      {/* ── Toast ── */}
      {toastVisible && (
        <div className="fixed bottom-28 md:bottom-8 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-pulse">
          <Icon name="open_in_new" className="text-[16px]" />
          New patient intake workflow opening...
        </div>
      )}

      <QuickLinks
        title="Inside My Patients"
        links={[
          { to: '/dentist/patient-search', label: 'Search & Select Patient', icon: 'person_search' },
          { to: '/dentist/patient-overview', label: 'Patient Professional Overview', icon: 'badge' },
          { to: '/dentist/calendar', label: 'Appointment Calendar', icon: 'calendar_month' },
        ]}
      />
    </ClinicalWorkspaceShell>
  );
}
