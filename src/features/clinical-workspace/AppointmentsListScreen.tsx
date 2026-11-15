import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type AppointmentStatus =
  | 'completed'
  | 'chairside'
  | 'arrived'
  | 'confirmed'
  | 'cancelled'
  | 'open';

interface Appointment {
  id: string;
  time: string;
  duration: string;
  status: AppointmentStatus;
  patient?: string;
  age?: string;
  sex?: string;
  dhaId?: string;
  procedure: string;
  planLine?: string;
  nurse?: string;
  badge?: string;
  alert?: string;
  cancelReason?: string;
  arrivedAgo?: string;
  bayInfo?: string;
  elapsedMin?: number;
}

/* ------------------------------------------------------------------ */
/*  Static data                                                        */
/* ------------------------------------------------------------------ */

const APPOINTMENTS: Appointment[] = [
  {
    id: 'a-1',
    time: '09:30 AM',
    duration: '45m',
    status: 'completed',
    patient: 'Marcus Vance',
    age: '28y',
    sex: 'M',
    dhaId: 'DHA-00412',
    procedure: '6-Mo Periodontal Recare & Splint Check',
    nurse: 'Fatima Noor',
    badge: 'BOP Score: 4%',
  },
  {
    id: 'a-2',
    time: '10:30 AM',
    duration: '60m',
    status: 'chairside',
    patient: 'Amara Okafor',
    age: '34y',
    sex: 'F',
    dhaId: 'DHA-2026-00451',
    procedure: 'Tooth #16 Biomimetic Composite',
    planLine: 'Plan #TP-2026-089 · Etch, Bond & Dual-Cure Nano',
    nurse: 'Zainab Tariq',
    alert: 'Penicillin Allergy',
    elapsedMin: 22,
  },
  {
    id: 'a-3',
    time: '11:45 AM',
    duration: '45m',
    status: 'arrived',
    patient: 'Fatima Al-Zahra',
    age: '28y',
    sex: 'F',
    dhaId: 'DHA-08921',
    procedure: 'GBR Bone Regeneration Audit (Tooth #14)',
    arrivedAgo: '10m ago',
    bayInfo: 'Bay 1',
  },
  {
    id: 'a-4',
    time: '02:00 PM',
    duration: '30m',
    status: 'confirmed',
    patient: 'Chinedu Okafor',
    age: '41y',
    sex: 'M',
    dhaId: 'DHA-07234',
    procedure: 'Endo Review #16 — Post-Op Assessment',
    nurse: 'Maryam Hussain',
  },
  {
    id: 'a-5',
    time: '03:30 PM',
    duration: '45m',
    status: 'open',
    procedure: 'Available Slot',
  },
  {
    id: 'a-6',
    time: '04:30 PM',
    duration: '30m',
    status: 'cancelled',
    patient: 'Tariq Latif',
    age: '56y',
    sex: 'M',
    dhaId: 'DHA-05432',
    procedure: 'Tooth #47 Full Coverage Ceramic Crown',
    alert: 'Cardiology Clearance Required',
    cancelReason: 'Patient requested reschedule — pending cardiology clearance',
  },
];

type FilterKey = 'all' | AppointmentStatus;

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'chairside', label: 'Chairside' },
  { key: 'arrived', label: 'Arrived' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'completed', label: 'Completed' },
  { key: 'cancelled', label: 'Cancelled' },
];

function countByFilter(key: FilterKey): number {
  if (key === 'all') return APPOINTMENTS.length;
  return APPOINTMENTS.filter((a) => a.status === key).length;
}

/* ------------------------------------------------------------------ */
/*  Status helpers                                                     */
/* ------------------------------------------------------------------ */

const STATUS_STYLES: Record<
  AppointmentStatus,
  { bg: string; text: string; dot: string; label: string }
> = {
  completed: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-500',
    label: 'Completed',
  },
  chairside: {
    bg: 'bg-teal-50',
    text: 'text-teal-700',
    dot: 'bg-teal-500',
    label: 'Chairside Active',
  },
  arrived: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-500',
    label: 'Arrived',
  },
  confirmed: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    dot: 'bg-blue-500',
    label: 'Confirmed',
  },
  cancelled: {
    bg: 'bg-red-50',
    text: 'text-red-700',
    dot: 'bg-red-500',
    label: 'Cancelled',
  },
  open: {
    bg: 'bg-gray-50',
    text: 'text-gray-500',
    dot: 'bg-gray-400',
    label: 'Open',
  },
};

/* ------------------------------------------------------------------ */
/*  Elapsed-time hook (ticks every 60 s for the chairside timer)       */
/* ------------------------------------------------------------------ */

function useElapsedTimer(baseMin: number | undefined): string | null {
  const [extra, setExtra] = useState(0);

  useEffect(() => {
    if (baseMin === undefined) return;
    const id = setInterval(() => setExtra((p) => p + 1), 60_000);
    return () => clearInterval(id);
  }, [baseMin]);

  if (baseMin === undefined) return null;
  return `${baseMin + extra}m elapsed`;
}

/* ------------------------------------------------------------------ */
/*  Action Sheet                                                       */
/* ------------------------------------------------------------------ */

interface ActionSheetProps {
  appointment: Appointment;
  onClose: () => void;
}

function ActionSheet({ appointment, onClose }: ActionSheetProps) {
  const navigate = useNavigate();

  const actions = [
    {
      icon: 'visibility',
      label: 'View Details',
      action: () => navigate('/dentist/appointment-details'),
    },
    {
      icon: 'open_in_new',
      label: 'Open Workspace',
      action: () => navigate('/treatment-plans/progress-workspace'),
    },
    { icon: 'edit_note', label: 'Add Clinical Note', action: onClose },
    { icon: 'event_repeat', label: 'Reschedule', action: onClose },
    {
      icon: 'cancel',
      label: 'Cancel Appointment',
      action: onClose,
      danger: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative z-10 w-full max-w-md mx-auto bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl border border-[#eaedff] overflow-hidden animate-[slideUp_0.2s_ease-out]">
        {/* Header */}
        <div className="px-5 pt-5 pb-3 border-b border-[#eaedff]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">
                {appointment.patient ?? 'Appointment'}
              </h3>
              <p className="text-xs text-[#707881] mt-0.5">
                {appointment.time} · {appointment.duration}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881]"
              aria-label="Close"
            >
              <Icon name="close" className="text-[18px]" />
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="p-2">
          {actions.map((a) => (
            <button
              key={a.label}
              type="button"
              onClick={a.action}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                a.danger
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-[#131b2e] hover:bg-[#f2f3ff]'
              }`}
            >
              <Icon
                name={a.icon}
                className={`text-[20px] ${
                  a.danger ? 'text-red-500' : 'text-[#707881]'
                }`}
              />
              {a.label}
            </button>
          ))}
        </div>

        {/* Safe-area spacer on mobile */}
        <div className="h-2 sm:hidden" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Appointment Card                                                   */
/* ------------------------------------------------------------------ */

interface CardProps {
  appointment: Appointment;
  onTap: () => void;
}

function AppointmentCard({ appointment: a, onTap }: CardProps) {
  const navigate = useNavigate();
  const elapsed = useElapsedTimer(
    a.status === 'chairside' ? a.elapsedMin : undefined,
  );
  const style = STATUS_STYLES[a.status];

  /* Open slot — special dashed card */
  if (a.status === 'open') {
    return (
      <div className="rounded-2xl border-2 border-dashed border-[#d0d5dd] bg-white/60 p-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] flex items-center justify-center">
            <Icon name="event_available" className="text-[20px] text-[#707881]" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[#707881]">Open Slot</p>
            <p className="text-xs text-[#9aa1a9]">
              {a.time} · {a.duration}
            </p>
          </div>
        </div>
        <button
          type="button"
          className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#005080] text-white text-xs font-bold transition-colors flex items-center gap-1.5"
        >
          <Icon name="add" className="text-[16px]" />
          Book
        </button>
      </div>
    );
  }

  /* Chairside hero card */
  const isHero = a.status === 'chairside';
  /* Cancelled muted styling */
  const isCancelled = a.status === 'cancelled';
  /* Completed slightly muted */
  const isCompleted = a.status === 'completed';

  return (
    <button
      type="button"
      onClick={onTap}
      className={[
        'w-full text-left rounded-2xl bg-white transition-all group',
        'border border-[#eaedff] hover:shadow-lg hover:border-[#cce5ff]',
        isHero
          ? 'border-l-4 !border-l-teal-500 shadow-md ring-1 ring-teal-200/50'
          : '',
        isCancelled ? 'opacity-75' : '',
        isCompleted ? 'opacity-90' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="p-4 sm:p-5">
        {/* Top row — time · duration + status badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <Icon name="schedule" className="text-[14px]" />
            <span className="font-semibold">
              {a.time} · {a.duration}
            </span>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${style.bg} ${style.text}`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${style.dot} ${
                isHero ? 'animate-pulse' : ''
              }`}
            />
            {style.label}
          </span>
        </div>

        {/* Patient name row */}
        <h3
          className={`text-sm font-bold text-[#131b2e] leading-snug ${
            isCancelled ? 'line-through decoration-red-400' : ''
          }`}
        >
          {a.patient}
        </h3>

        {/* Demographics */}
        <p className="text-xs text-[#707881] mt-0.5">
          {a.age} {a.sex} · {a.dhaId}
        </p>

        {/* Procedure */}
        <p className="text-xs font-semibold text-[#3f4850] mt-2 leading-relaxed">
          {a.procedure}
        </p>

        {/* Plan line (chairside hero) */}
        {a.planLine && (
          <p className="text-[11px] text-[#707881] mt-1 italic">{a.planLine}</p>
        )}

        {/* Meta row — nurse, badge, elapsed, arrived */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          {a.nurse && (
            <span className="inline-flex items-center gap-1 text-[11px] text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded-full">
              <Icon name="person" className="text-[12px]" />
              {a.nurse}
            </span>
          )}

          {a.badge && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              {a.badge}
            </span>
          )}

          {elapsed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full">
              <Icon name="timer" className="text-[12px]" />
              {elapsed}
            </span>
          )}

          {a.arrivedAgo && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
              Arrived ({a.arrivedAgo})
            </span>
          )}

          {a.bayInfo && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded-full">
              <Icon name="meeting_room" className="text-[12px]" />
              {a.bayInfo}
            </span>
          )}
        </div>

        {/* Alert badge */}
        {a.alert && (
          <div
            className={`mt-3 flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg ${
              isCancelled
                ? 'bg-red-50 text-red-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            <Icon name="warning" className="text-[14px]" />
            {a.alert}
          </div>
        )}

        {/* Cancel reason */}
        {a.cancelReason && (
          <p className="mt-2 text-[11px] text-red-600/80 leading-relaxed">
            {a.cancelReason}
          </p>
        )}

        {/* Hero quick actions */}
        {isHero && (
          <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#eaedff]">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/treatment-plans/progress-workspace');
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors"
            >
              <Icon name="open_in_new" className="text-[14px]" />
              Open Workspace
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                navigate('/dentist/appointment-details');
              }}
              className="w-9 h-9 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881] transition-colors"
              aria-label="View encounter"
            >
              <Icon name="assignment" className="text-[18px]" />
            </button>
          </div>
        )}
      </div>
    </button>
  );
}

/* ================================================================== */
/*  Main Screen                                                        */
/* ================================================================== */

export function AppointmentsListScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);

  /* Filter logic */
  const filtered = APPOINTMENTS.filter((a) => {
    if (activeFilter !== 'all' && a.status !== activeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const haystack = [a.patient, a.procedure, a.dhaId, a.nurse]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const closeSheet = useCallback(() => setSelectedAppointment(null), []);

  return (
    <ClinicalWorkspaceShell
      activeNav="tasks"
      pageTitle="My Appointments · List"
      badgeCode="14.4"
      badgeLabel="Appointments List"
    >
      {/* ─── Top Control Zone ─── */}
      <div className="space-y-4">
        {/* Search + Context buttons */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Icon
              name="search"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#707881] pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search patients, procedures..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 h-11 rounded-xl border border-[#eaedff] bg-white text-sm text-[#131b2e] placeholder:text-[#9aa1a9] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 focus:border-[#006194] transition-shadow"
            />
          </div>

          {/* Context buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 h-10 rounded-xl border border-[#eaedff] bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#3f4850] transition-colors"
            >
              <Icon name="calendar_today" className="text-[16px] text-[#006194]" />
              Sun, 18 Oct 2026
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3 h-10 rounded-xl border border-[#eaedff] bg-white hover:bg-[#f2f3ff] text-xs font-semibold text-[#3f4850] transition-colors"
            >
              <Icon name="chair" className="text-[16px] text-[#006194]" />
              Operatory 02
            </button>
          </div>

          {/* View switcher */}
          <div className="flex items-center rounded-xl border border-[#eaedff] bg-white overflow-hidden flex-shrink-0 h-10">
            <button
              type="button"
              onClick={() => navigate('/dentist/calendar')}
              className="flex items-center gap-1.5 px-3.5 h-full text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="calendar_month" className="text-[16px]" />
              Calendar
            </button>
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 h-full text-xs font-bold text-[#006194] bg-[#cce5ff]/40 border-l border-[#eaedff]"
            >
              <Icon name="view_list" className="text-[16px]" />
              List
            </button>
          </div>
        </div>

        {/* ─── Status Filter Pills ─── */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
          {FILTERS.map((f) => {
            const isActive = activeFilter === f.key;
            const count = countByFilter(f.key);
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-white text-[#3f4850] border border-[#eaedff] hover:bg-[#f2f3ff]'
                }`}
              >
                {f.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-[#f2f3ff] text-[#707881]'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ─── Cards Grid ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((a) => (
            <AppointmentCard
              key={a.id}
              appointment={a}
              onTap={() => {
                if (a.status !== 'open') setSelectedAppointment(a);
              }}
            />
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#f2f3ff] flex items-center justify-center mb-3">
                <Icon name="event_busy" className="text-[28px] text-[#707881]" />
              </div>
              <p className="text-sm font-semibold text-[#707881]">
                No appointments match your filters
              </p>
              <p className="text-xs text-[#9aa1a9] mt-1">
                Try adjusting your search or filter selection
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Bottom Summary Bar (sticky on mobile) ─── */}
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-xl border-t border-[#eaedff] shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <p className="text-xs font-semibold text-[#3f4850]">
            <span className="font-bold text-[#131b2e]">6</span> Appointments ·{' '}
            <span className="font-bold text-teal-600">1</span> Chairside ·{' '}
            <span className="font-bold text-[#006194]">78%</span> Utilisation
          </p>
          <button
            type="button"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#005080] text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Icon name="add" className="text-[16px]" />
            New Booking
          </button>
        </div>
      </div>

      {/* ─── Action Sheet Modal ─── */}
      {selectedAppointment && (
        <ActionSheet appointment={selectedAppointment} onClose={closeSheet} />
      )}

      {/* Inline keyframe for sheet animation */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(16px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </ClinicalWorkspaceShell>
  );
}
