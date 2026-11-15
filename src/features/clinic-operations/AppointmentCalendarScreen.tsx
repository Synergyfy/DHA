import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ViewMode = 'Day' | 'Week' | 'Month';
type DentistFilter = 'all' | 'okoro' | 'bello' | 'james';
type ApptStatus = 'in-chair' | 'completed' | 'checked-in' | 'scheduled' | 'overdue';

interface TimelineSlot {
  id: string;
  time: string;
  type: 'appointment' | 'break' | 'prep';
  patientName?: string;
  patientId?: string;
  procedure?: string;
  dentist?: string;
  dentistKey?: DentistFilter;
  operatory?: string;
  timeRange?: string;
  status?: ApptStatus;
  statusLabel?: string;
  isUrgent?: boolean;
  urgencyLabel?: string;
  waitInfo?: string;
  breakTitle?: string;
  breakDetail?: string;
  breakEta?: string;
  breakStatus?: string;
  prepLabel?: string;
  prepStatus?: string;
}

const TIMELINE_DATA: TimelineSlot[] = [
  {
    id: 'prep-morning',
    time: '08:30',
    type: 'prep',
    prepLabel: 'Morning Huddle & Daily Tray Prep Completed',
    prepStatus: 'Ready',
  },
  {
    id: 'amara',
    time: '09:00',
    type: 'appointment',
    patientName: 'Amara Okafor',
    patientId: '#00451',
    procedure: 'Direct Restorative #16',
    dentist: 'Dr. Okoro',
    dentistKey: 'okoro',
    operatory: 'Operatory 01',
    timeRange: '09:00 – 10:00 (35m elapsed)',
    status: 'in-chair',
    statusLabel: 'In Progress',
  },
  {
    id: 'kalu',
    time: '09:30',
    type: 'appointment',
    patientName: 'Kalu Nnamdi',
    patientId: '#00389',
    procedure: 'Periodic Exam & OPG',
    dentist: 'Dr. James',
    dentistKey: 'james',
    operatory: 'Operatory 03',
    timeRange: '09:30 – 10:15',
    status: 'completed',
    statusLabel: 'Completed',
  },
  {
    id: 'ibrahim',
    time: '10:00',
    type: 'appointment',
    patientName: 'Ibrahim Waziri',
    patientId: '#00512',
    procedure: 'Orthodontic Wire Adjustment',
    dentist: 'Dr. Bello',
    dentistKey: 'bello',
    operatory: 'Operatory 02',
    timeRange: '10:00 – 10:45',
    status: 'checked-in',
    statusLabel: 'Checked In',
    waitInfo: 'Waiting in Lounge (7m)',
  },
  {
    id: 'fatima',
    time: '11:00',
    type: 'appointment',
    patientName: 'Fatima Garba',
    patientId: 'Walk-in Q-05',
    procedure: 'Acute Pulpitis Emergency',
    dentist: 'Dr. Okoro',
    dentistKey: 'okoro',
    operatory: 'Operatory 01',
    timeRange: '11:00 – 12:00',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    isUrgent: true,
    urgencyLabel: 'High Urgency',
  },
  {
    id: 'break-midday',
    time: '12:30',
    type: 'break',
    breakTitle: 'Midday Sterilization & Decontamination Pause',
    breakDetail: 'Autoclave Batch #3 Cycle (134°C Vacuum Pre-Flush)',
    breakEta: 'ETA 13:20',
    breakStatus: 'Running',
  },
  {
    id: 'aisha',
    time: '13:30',
    type: 'appointment',
    patientName: 'Aisha Mohammed',
    patientId: '#00604',
    procedure: 'Pediatric Preventive Sealant',
    dentist: 'Dr. Bello',
    dentistKey: 'bello',
    operatory: 'Operatory 02',
    timeRange: '13:30 – 14:30',
    status: 'scheduled',
    statusLabel: 'Confirmed',
  },
  {
    id: 'yusuf',
    time: '15:00',
    type: 'appointment',
    patientName: 'Yusuf Abubakar',
    patientId: '#00577',
    procedure: 'Crown Prep & Digital Impression',
    dentist: 'Dr. James',
    dentistKey: 'james',
    operatory: 'Operatory 01',
    timeRange: '15:00 – 16:00',
    status: 'scheduled',
    statusLabel: 'Confirmed',
  },
  {
    id: 'closeout',
    time: '17:30',
    type: 'prep',
    prepLabel: 'Day Closeout & Terminal Sterilization Routine',
    prepStatus: '17:30 – 18:00',
  },
];

const STATUS_CONFIG: Record<ApptStatus, { dot: string; bg: string; text: string; border: string; gradient: string; icon: string }> = {
  'in-chair': {
    dot: 'bg-[#006a61]',
    bg: 'bg-[#89f5e7]/30',
    text: 'text-[#005049]',
    border: 'bg-[#006a61]',
    gradient: 'from-[#89f5e7]/30 to-transparent',
    icon: 'check_circle',
  },
  'completed': {
    dot: 'bg-[#006194]',
    bg: 'bg-[#cce5ff]/30',
    text: 'text-[#004b73]',
    border: 'bg-[#006194]',
    gradient: 'from-[#cce5ff]/30 to-transparent',
    icon: 'done_all',
  },
  'checked-in': {
    dot: 'bg-amber-500',
    bg: 'bg-amber-100/50',
    text: 'text-amber-900',
    border: 'bg-amber-500',
    gradient: 'from-amber-100/60 to-transparent',
    icon: 'hourglass_top',
  },
  'scheduled': {
    dot: 'bg-purple-600',
    bg: 'bg-purple-100/40',
    text: 'text-purple-900',
    border: 'bg-purple-600',
    gradient: 'from-purple-100/50 to-transparent',
    icon: 'event',
  },
  'overdue': {
    dot: 'bg-[#ba1a1a]',
    bg: 'bg-[#ffdad6]/50',
    text: 'text-[#93000a]',
    border: 'bg-[#ba1a1a]',
    gradient: 'from-[#ffdad6]/50 to-transparent',
    icon: 'warning',
  },
};

const LEGEND: { status: string; color: string }[] = [
  { status: 'In Chair', color: 'bg-[#006a61]' },
  { status: 'Completed', color: 'bg-[#006194]' },
  { status: 'Checked In', color: 'bg-amber-500' },
  { status: 'Scheduled', color: 'bg-purple-600' },
  { status: 'Overdue/No-Show', color: 'bg-[#ba1a1a]' },
];

const DENTIST_CHIPS: { key: DentistFilter; label: string; count?: number }[] = [
  { key: 'all', label: 'All Dentists' },
  { key: 'okoro', label: 'Dr. Okoro', count: 4 },
  { key: 'bello', label: 'Dr. Bello', count: 3 },
  { key: 'james', label: 'Dr. James', count: 3 },
];

const NAV_ITEMS: { label: string; icon: string; path: string; isActive: boolean }[] = [
  { label: 'Overview', icon: 'dashboard', path: '/clinic-operations/dashboard', isActive: false },
  { label: 'Schedule', icon: 'calendar_today', path: '/clinic-operations/calendar', isActive: true },
  { label: 'Patients', icon: 'groups', path: '#', isActive: false },
  { label: 'Clinical', icon: 'clinical_notes', path: '#', isActive: false },
  { label: 'More', icon: 'more_horiz', path: '#', isActive: false },
];

export const AppointmentCalendarScreen: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('Week');
  const [dentistFilter, setDentistFilter] = useState<DentistFilter>('all');
  const [selectedAppt, setSelectedAppt] = useState<string | null>('amara');
  const [showPreview, setShowPreview] = useState<boolean>(true);

  const filteredTimeline = TIMELINE_DATA.filter((slot) => {
    if (dentistFilter === 'all') return true;
    if (slot.type !== 'appointment') return true;
    return slot.dentistKey === dentistFilter;
  });

  const selectedSlot = TIMELINE_DATA.find((s) => s.id === selectedAppt && s.type === 'appointment');

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#006194] text-white shadow-sm shrink-0">
              <Icon name="dentistry" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#131b2e] truncate">BrightSmile</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#006194] text-[10px] font-bold uppercase tracking-wider">
                  DHA
                </span>
              </div>
              <button className="flex items-center gap-0.5 text-[#3f4850] hover:text-[#131b2e] transition-colors text-xs">
                <span className="truncate max-w-[110px]">Wuse 2 Branch</span>
                <Icon name="keyboard_arrow_down" className="text-[16px]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-24 lg:pb-6">
        {/* Calendar Workspace Controls */}
        <section className="bg-[#f2f3ff] border-b border-[#dae2fd]/40 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-3">
            {/* Branch Context & Quick Action */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2 min-w-0">
                <Icon name="domain" className="text-[#006194] text-[20px] shrink-0" />
                <span className="text-sm font-bold text-[#131b2e] truncate">Wuse 2 Main Branch</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  aria-label="Search Schedule"
                  className="w-10 h-10 rounded-xl bg-white text-[#3f4850] flex items-center justify-center shadow-sm hover:bg-[#eaedff] transition-colors"
                >
                  <Icon name="search" className="text-[20px]" />
                </button>
                <button
                  aria-label="Filter"
                  className="w-10 h-10 rounded-xl bg-white text-[#3f4850] flex items-center justify-center shadow-sm hover:bg-[#eaedff] transition-colors"
                >
                  <Icon name="tune" className="text-[20px]" />
                </button>
                <button className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:bg-[#007bb9] active:scale-95 transition-all">
                  <Icon name="add" className="text-[18px]" />
                  <span>Book Appt</span>
                </button>
              </div>
            </div>

            {/* Segmented View Toggle */}
            <div className="flex p-1 bg-[#e2e7ff] rounded-xl max-w-sm">
              {(['Day', 'Week', 'Month'] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`flex-1 py-2 rounded-lg text-center text-xs font-semibold transition-all ${
                    viewMode === mode
                      ? 'bg-white text-[#006194] shadow-sm'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Date Navigator */}
            <div className="flex items-center justify-between bg-white rounded-xl p-2 shadow-sm">
              <button
                aria-label="Previous Day"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
              >
                <Icon name="chevron_left" className="text-[20px]" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm sm:text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                    Thursday, 22 Oct 2026
                  </span>
                  <span className="w-2 h-2 rounded-full bg-[#006a61]" />
                </div>
                <span className="text-[11px] text-[#3f4850]">Week 43 • 6 Operatories active</span>
              </div>

              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-lg bg-[#e2e7ff] text-[#006194] text-xs font-bold active:scale-95 transition-transform">
                  Today
                </button>
                <button
                  aria-label="Next Day"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
                >
                  <Icon name="chevron_right" className="text-[20px]" />
                </button>
              </div>
            </div>

            {/* Dentist Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 -mx-1 px-1">
              {DENTIST_CHIPS.map((chip) => (
                <button
                  key={chip.key}
                  onClick={() => setDentistFilter(chip.key)}
                  className={`shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                    dentistFilter === chip.key
                      ? 'bg-[#006194] text-white'
                      : 'bg-white text-[#131b2e] hover:bg-[#e2e7ff]'
                  }`}
                >
                  <span>{chip.label}</span>
                  {chip.count !== undefined && (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        dentistFilter === chip.key
                          ? 'bg-white/20 text-white'
                          : 'bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      {chip.count}
                    </span>
                  )}
                </button>
              ))}
              <button className="shrink-0 px-3 py-2 rounded-full bg-white text-[#3f4850] text-xs font-semibold shadow-sm flex items-center gap-1 hover:text-[#131b2e]">
                <span>Status: All</span>
                <Icon name="arrow_drop_down" className="text-[16px]" />
              </button>
            </div>
          </div>
        </section>

        {/* Two-column layout: timeline + preview (desktop) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-0 lg:flex lg:gap-6">
          {/* Left Column: Legend + Timeline */}
          <div className="flex-1 min-w-0">
            {/* Visual Schedule Legend */}
            <section className="py-4 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#3f4850]">
                  Clinical Status Legend
                </span>
                <button
                  onClick={() => navigate('/clinic-operations/appointment-list')}
                  className="flex items-center gap-1 text-xs font-semibold text-[#006194] hover:underline"
                >
                  <Icon name="table_rows" className="text-[16px]" />
                  <span className="hidden sm:inline">Switch to Table List (16.7)</span>
                  <span className="sm:hidden">Table View</span>
                </button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 bg-white p-2.5 rounded-xl shadow-sm border border-[#dae2fd]/40">
                {LEGEND.map((item) => (
                  <div key={item.status} className="flex items-center gap-1.5 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color} shrink-0`} />
                    <span className="text-[11px] font-semibold text-[#131b2e] truncate">{item.status}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive Chairside Clinical Timeline */}
            <section className="flex flex-col gap-3 pb-6">
              {filteredTimeline.map((slot) => {
                if (slot.type === 'prep') {
                  return (
                    <div key={slot.id} className="flex items-start gap-3">
                      <div className="w-12 pt-1 text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-[#3f4850]">{slot.time}</span>
                      </div>
                      <div className="flex-1 bg-[#e2e7ff]/40 rounded-xl p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon
                            name={slot.id === 'closeout' ? 'lock_clock' : 'check_circle'}
                            className="text-[18px] text-[#3f4850]"
                          />
                          <span className="text-xs text-[#3f4850]">{slot.prepLabel}</span>
                        </div>
                        <span className="text-xs font-semibold text-[#006a61]">{slot.prepStatus}</span>
                      </div>
                    </div>
                  );
                }

                if (slot.type === 'break') {
                  return (
                    <div key={slot.id} className="flex items-start gap-3">
                      <div className="w-12 pt-1 text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-[#3f4850]">{slot.time}</span>
                      </div>
                      <div className="flex-1 bg-[#e2e7ff]/50 rounded-xl p-3 shadow-sm flex flex-col gap-1.5">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <Icon name="sanitizer" className="text-[20px] text-[#006a61]" />
                            <span className="text-sm font-bold text-[#131b2e]">{slot.breakTitle}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded-md bg-[#89f5e7] text-[#005049] text-[11px] font-bold">
                            {slot.breakStatus}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-[#3f4850]">
                          <div className="flex items-center gap-1.5">
                            <Icon name="mode_heat" className="text-[16px] text-[#006a61]" />
                            <span>{slot.breakDetail}</span>
                          </div>
                          <span className="text-xs font-mono font-semibold text-[#006a61]">{slot.breakEta}</span>
                        </div>
                      </div>
                    </div>
                  );
                }

                // Appointment card
                const statusCfg = STATUS_CONFIG[slot.status!];
                const isActive = selectedAppt === slot.id;
                const isEmergencyId = slot.patientId?.startsWith('Walk-in');

                return (
                  <div key={slot.id} className="flex items-start gap-3">
                    <div className="w-12 pt-1 text-right shrink-0">
                      <span
                        className={`text-xs font-mono font-semibold ${
                          slot.status === 'in-chair' ? 'text-[#006194] font-bold' : 'text-[#3f4850]'
                        }`}
                      >
                        {slot.time}
                      </span>
                    </div>

                    <div
                      onClick={() => {
                        setSelectedAppt(slot.id);
                        setShowPreview(true);
                      }}
                      className={`flex-1 bg-white rounded-xl p-4 relative overflow-hidden cursor-pointer transition-all active:scale-[0.99] bg-gradient-to-r ${statusCfg.gradient} ${
                        isActive
                          ? 'shadow-md ring-1 ring-[#006194]/20'
                          : 'shadow-sm hover:shadow'
                      }`}
                    >
                      {/* Left color bar */}
                      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${statusCfg.border}`} />

                      {/* Header row */}
                      <div className="flex items-start justify-between gap-2 mb-1.5 pl-1.5">
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-[#131b2e] truncate">{slot.patientName}</span>
                            <span
                              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                                isEmergencyId
                                  ? 'bg-[#ffdad6] text-[#93000a]'
                                  : 'bg-[#eaedff] text-[#3f4850]'
                              }`}
                            >
                              {slot.patientId}
                            </span>
                          </div>
                          <span
                            className={`text-xs truncate mt-0.5 ${
                              slot.isUrgent ? 'text-[#ba1a1a] font-medium' : 'text-[#3f4850]'
                            }`}
                          >
                            {slot.procedure} • {slot.dentist}
                          </span>
                        </div>

                        {/* Status Badge */}
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${statusCfg.bg} ${statusCfg.text} ${
                            slot.status === 'in-chair' ? 'animate-pulse shadow-sm' : ''
                          }`}
                        >
                          {slot.status === 'in-chair' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
                          )}
                          {slot.status !== 'in-chair' && (
                            <Icon name={statusCfg.icon} className="text-[14px]" />
                          )}
                          {slot.statusLabel}
                        </span>
                      </div>

                      {/* Footer metadata */}
                      <div className="flex items-center justify-between text-xs text-[#3f4850] mt-2 pl-1.5">
                        <div className="flex items-center gap-3 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Icon name="chair" className="text-[15px]" />
                            {slot.operatory}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="schedule" className="text-[15px]" />
                            {slot.timeRange}
                          </span>
                        </div>

                        {slot.waitInfo && (
                          <span className="text-amber-700 font-bold text-[11px]">{slot.waitInfo}</span>
                        )}
                        {slot.isUrgent && (
                          <span className="text-[#ba1a1a] font-bold text-[11px] flex items-center gap-0.5">
                            <Icon name="priority_high" className="text-[14px]" />
                            {slot.urgencyLabel}
                          </span>
                        )}
                        {!slot.waitInfo && !slot.isUrgent && slot.status === 'in-chair' && (
                          <Icon name="info" className="text-[18px] text-[#006194]" />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>
          </div>

          {/* Right Column: Patient Preview (Desktop sidebar) */}
          {selectedSlot && showPreview && (
            <aside className="hidden lg:block w-[380px] shrink-0 pt-4 sticky top-20 self-start">
              <div className="bg-white rounded-2xl shadow-lg border border-[#dae2fd]/60 p-5 flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#89f5e7] text-[#00201d] flex items-center justify-center font-bold text-lg shadow-sm">
                      {selectedSlot.patientName
                        ?.split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base font-bold text-[#131b2e] truncate">
                          {selectedSlot.patientName}
                        </span>
                        <span className="px-1.5 py-0.5 rounded-full bg-[#89f5e7] text-[#005049] text-[11px] font-bold">
                          {selectedSlot.status === 'in-chair'
                            ? 'In Chair'
                            : selectedSlot.statusLabel}
                        </span>
                      </div>
                      <span className="text-xs text-[#3f4850] truncate">
                        {selectedSlot.timeRange} • {selectedSlot.operatory}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    aria-label="Dismiss Card"
                    className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] transition-colors shrink-0"
                  >
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </div>

                {/* Clinical metadata */}
                <div className="grid grid-cols-2 gap-3 bg-[#f2f3ff] p-3 rounded-xl">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-[#3f4850]">Attending Clinician</span>
                    <span className="text-sm font-semibold text-[#131b2e] truncate">{selectedSlot.dentist}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold text-[#3f4850]">Scheduled Procedure</span>
                    <span className="text-sm font-semibold text-[#006194] truncate">{selectedSlot.procedure}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/clinic-operations/appointment-details')}
                    className="flex-1 h-11 rounded-xl bg-[#006194] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-[#007bb9] active:scale-95 transition-all"
                  >
                    <Icon name="clinical_notes" className="text-[18px]" />
                    <span>View Full Details (16.8)</span>
                  </button>
                  <button
                    aria-label="Call Patient"
                    className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#3f4850] flex items-center justify-center hover:bg-[#dae2fd] active:scale-95 transition-all"
                  >
                    <Icon name="phone" className="text-[20px]" />
                  </button>
                </div>
              </div>
            </aside>
          )}
        </div>

        {/* Mobile Patient Preview Sheet (bottom drawer) */}
        {selectedSlot && showPreview && (
          <aside className="lg:hidden fixed inset-x-0 bottom-20 z-40 px-4 pb-2 animate-slide-up">
            <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-[#dae2fd]/60 p-4 flex flex-col gap-3 bg-gradient-to-b from-white to-[#f2f3ff]">
              {/* Drag handle */}
              <div className="w-10 h-1 rounded-full bg-[#bfc7d2] mx-auto" />

              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#89f5e7] text-[#00201d] flex items-center justify-center font-bold text-base shadow-sm">
                    {selectedSlot.patientName
                      ?.split(' ')
                      .map((w) => w[0])
                      .join('')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold text-[#131b2e] truncate">
                        {selectedSlot.patientName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded-full bg-[#89f5e7] text-[#005049] text-[11px] font-bold">
                        {selectedSlot.status === 'in-chair' ? 'In Chair' : selectedSlot.statusLabel}
                      </span>
                    </div>
                    <span className="text-xs text-[#3f4850] truncate">
                      {selectedSlot.timeRange} • {selectedSlot.operatory}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  aria-label="Dismiss Card"
                  className="w-8 h-8 rounded-full bg-[#eaedff] flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] active:scale-95 transition-transform"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              {/* Quick Metadata */}
              <div className="grid grid-cols-2 gap-2 bg-white p-2.5 rounded-xl">
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[#3f4850]">Attending Clinician</span>
                  <span className="text-sm font-medium text-[#131b2e] truncate">{selectedSlot.dentist}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-semibold text-[#3f4850]">Scheduled Procedure</span>
                  <span className="text-sm font-medium text-[#006194] truncate">{selectedSlot.procedure}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => navigate('/clinic-operations/appointment-details')}
                  className="flex-1 h-11 rounded-xl bg-[#006194] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
                >
                  <Icon name="clinical_notes" className="text-[18px]" />
                  <span>View Full Appointment Details (16.8)</span>
                </button>
                <button
                  aria-label="Call Patient"
                  className="w-11 h-11 rounded-xl bg-[#eaedff] text-[#3f4850] flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Icon name="phone" className="text-[20px]" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </main>

      {/* Bottom Navigation Bar (mobile/tablet) */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#dae2fd]/60">
        <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.path !== '#') navigate(item.path);
              }}
              className={`flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl transition-colors ${
                item.isActive
                  ? 'text-[#006194] font-semibold'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <Icon name={item.icon} className="text-[22px]" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
