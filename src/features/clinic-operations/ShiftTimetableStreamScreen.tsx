import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface ShiftMember {
  id: string;
  name: string;
  roleTag: string;
  roleTagClass?: string;
  avatarUrl: string;
  shiftHours: string;
  durationLabel: string;
  statusBadge: string;
  statusBadgeColor: string;
  detailIcon: string;
  detailText: string;
  detailBadge: string;
  detailBadgeColor: string;
}

interface OperatoryAllocation {
  id: string;
  opCode: string;
  title: string;
  clinicianTime: string;
  utilizationBadge: string;
  badgeClass: string;
  subtext: string;
}

const INITIAL_SHIFTS: ShiftMember[] = [
  {
    id: 's-01',
    name: 'Grace Ibrahim',
    roleTag: 'Reception 01',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    shiftHours: '08:00 AM – 17:00 PM',
    durationLabel: '8.0h Shift',
    statusBadge: 'Checked In',
    statusBadgeColor: 'bg-[#86f2e4] text-[#006f66]',
    detailIcon: 'coffee',
    detailText: 'Lunch Break: 13:00 – 14:00',
    detailBadge: 'Station #01',
    detailBadgeColor: 'text-[#3f4850]',
  },
  {
    id: 's-02',
    name: 'Nurse Zainab Tariq, RN',
    roleTag: 'Sterilization Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
    shiftHours: '08:00 AM – 16:30 PM',
    durationLabel: '8.5h Shift',
    statusBadge: 'On Duty',
    statusBadgeColor: 'bg-[#86f2e4] text-[#006f66]',
    detailIcon: 'sanitizer',
    detailText: 'Autoclave Cycle #03 & Chairside Prep',
    detailBadge: 'Validated',
    detailBadgeColor: 'text-[#006a61] font-semibold',
  },
  {
    id: 's-03',
    name: 'Dr. Daniel Okoro, DDS',
    roleTag: 'Suite 01 Restorative',
    roleTagClass: 'bg-[#cce5ff] text-[#001d31]',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    shiftHours: '08:30 AM – 17:00 PM',
    durationLabel: '8.5h Shift',
    statusBadge: 'In Procedure',
    statusBadgeColor: 'bg-[#86f2e4] text-[#006f66]',
    detailIcon: 'clinical_notes',
    detailText: '4 Morning Cases • 3 Afternoon Restorations',
    detailBadge: '100% Booked',
    detailBadgeColor: 'text-[#006194] font-bold',
  },
  {
    id: 's-04',
    name: 'Dr. Sarah Bello',
    roleTag: 'Suite 02 Ortho',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813511-20572b22ecdf?w=150&auto=format&fit=crop&q=80',
    shiftHours: '09:00 AM – 14:00 PM',
    durationLabel: '5.0h Half-Shift',
    statusBadge: 'Departing 14:00',
    statusBadgeColor: 'bg-[#e2e7ff] text-[#3f4850]',
    detailIcon: 'commute',
    detailText: 'Outpost Handover departure at 14:30',
    detailBadge: 'Maitama',
    detailBadgeColor: 'text-[#3f4850]',
  },
  {
    id: 's-05',
    name: 'Dr. Michael James',
    roleTag: 'Suite 03 Surgery',
    avatarUrl: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80',
    shiftHours: '11:00 AM – 18:30 PM',
    durationLabel: '7.5h Shift',
    statusBadge: 'Afternoon Block',
    statusBadgeColor: 'bg-[#cde5ff] text-[#001d32]',
    detailIcon: 'medical_services',
    detailText: 'Operatory 03 Surgical Extractions & Implants',
    detailBadge: 'Prep Ready',
    detailBadgeColor: 'text-[#006194] font-semibold',
  },
];

const OPERATORIES: OperatoryAllocation[] = [
  {
    id: 'op-01',
    opCode: '01',
    title: 'Restorative Suite',
    clinicianTime: 'Dr. Okoro (08:30 – 17:00)',
    utilizationBadge: '100% Utilized',
    badgeClass: 'bg-[#86f2e4] text-[#006f66]',
    subtext: 'Full Day',
  },
  {
    id: 'op-02',
    opCode: '02',
    title: 'Orthodontics Suite',
    clinicianTime: 'Dr. Bello (09:00 – 14:00)',
    utilizationBadge: 'Open after 14:00',
    badgeClass: 'bg-[#e2e7ff] text-[#3f4850]',
    subtext: '5.0h Active',
  },
  {
    id: 'op-03',
    opCode: '03',
    title: 'Oral Surgery Suite',
    clinicianTime: 'Dr. James (11:00 – 18:30)',
    utilizationBadge: 'Surgical Block',
    badgeClass: 'bg-[#cde5ff] text-[#001d32]',
    subtext: '7.5h Active',
  },
  {
    id: 'op-04',
    opCode: '04',
    title: 'Hygiene & Scaling Bay',
    clinicianTime: 'Nurse Tariq (09:00 – 15:00)',
    utilizationBadge: 'Prophylaxis',
    badgeClass: 'bg-[#86f2e4] text-[#006f66]',
    subtext: '6.0h Active',
  },
];

export const ShiftTimetableStreamScreen: React.FC = () => {
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');
  const [currentDateIndex, setCurrentDateIndex] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddShiftModal, setShowAddShiftModal] = useState(false);
  const [newStaffMember, setNewStaffMember] = useState('Dr. Michael James');
  const [newShiftType, setNewShiftType] = useState('Full Shift (08:00 - 17:00)');
  const [newOperatory, setNewOperatory] = useState('Operatory 01');

  const DATES = [
    { label: 'Thursday, 22 Oct 2026', isToday: true },
    { label: 'Friday, 23 Oct 2026', isToday: false },
    { label: 'Saturday, 24 Oct 2026', isToday: false },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handlePrevDay = () => {
    if (currentDateIndex > 0) {
      setCurrentDateIndex(currentDateIndex - 1);
    } else {
      showToast('Viewing earliest scheduled date in current roster cycle');
    }
  };

  const handleNextDay = () => {
    if (currentDateIndex < DATES.length - 1) {
      setCurrentDateIndex(currentDateIndex + 1);
    } else {
      showToast('Viewing latest scheduled date in current roster cycle');
    }
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top App Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-14 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center min-w-0 flex-1 gap-2">
            <button
              aria-label="Go back"
              onClick={() => navigate('/clinic-operations/staff-roster')}
              className="w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] active:bg-[#eaedff] rounded-full transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-[20px]" />
            </button>
            <div className="flex items-center gap-2 min-w-0">
              <h1 className="font-semibold text-base md:text-lg text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                Shift Timetable & Roster Stream
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-semibold">
                16.16
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/clinic-operations/calendar')}
              className="hidden sm:flex px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#eaedff] transition-colors items-center gap-1.5"
            >
              <Icon name="calendar_today" className="text-[16px]" />
              <span>Full Calendar</span>
            </button>
            <button
              aria-label="More actions"
              onClick={() => showToast('Roster stream options: Export CSV, Print Board, Notification Broadcast')}
              className="w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] active:bg-[#eaedff] rounded-full transition-colors"
            >
              <Icon name="more_vert" className="text-[22px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center flex-shrink-0 shadow-sm text-white font-semibold text-xs">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="pt-16 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full py-4 space-y-5">
          {/* Branch & Scope Picker */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[#006194]">
                <Icon name="location_on" className="text-[18px]" />
                <span className="text-xs uppercase tracking-wider font-semibold">HQ Operational Roster</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4]/50 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                <span>Live Status</span>
              </span>
            </div>

            <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#006194] flex-shrink-0">
                  <Icon name="domain" className="text-[22px]" />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                    Wuse 2 Main Branch
                  </p>
                  <p className="text-xs text-[#3f4850] truncate">Branch ID: HQ #001 • 4 Operatories • Abuja FCT</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="w-9 h-9 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e] flex items-center justify-center flex-shrink-0 transition-colors"
                title="Switch Branch"
              >
                <Icon name="unfold_more" className="text-[20px]" />
              </button>
            </div>
          </div>

          {/* Date Navigator & View Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
            {/* Date Navigator */}
            <div className="bg-white p-2 md:p-2.5 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex items-center justify-between">
              <button
                onClick={handlePrevDay}
                className="w-9 h-9 rounded-xl hover:bg-[#eaedff] active:bg-[#e2e7ff] flex items-center justify-center text-[#3f4850] transition-colors"
                title="Previous Day"
              >
                <Icon name="chevron_left" className="text-[22px]" />
              </button>

              <div className="flex items-center gap-2">
                <Icon name="event" className="text-[#006194] text-[20px]" />
                <span className="font-semibold text-xs md:text-sm text-[#131b2e]">
                  {DATES[currentDateIndex].label}
                </span>
                {DATES[currentDateIndex].isToday && (
                  <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-[11px] font-bold tracking-tight">
                    Today
                  </span>
                )}
              </div>

              <button
                onClick={handleNextDay}
                className="w-9 h-9 rounded-xl hover:bg-[#eaedff] active:bg-[#e2e7ff] flex items-center justify-center text-[#3f4850] transition-colors"
                title="Next Day"
              >
                <Icon name="chevron_right" className="text-[22px]" />
              </button>
            </div>

            {/* Segmented Control View Toggle */}
            <div className="bg-[#eaedff] p-1.5 rounded-2xl flex items-center gap-1.5">
              <button
                onClick={() => setViewMode('day')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'day'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="view_day" className="text-[18px]" />
                <span>Day View (Active)</span>
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`flex-1 py-2 px-3 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  viewMode === 'week'
                    ? 'bg-white text-[#006194] shadow-sm'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="calendar_view_week" className="text-[18px]" />
                <span>Week View</span>
              </button>
            </div>
          </div>

          {/* Real-time Shift Alert Banner */}
          <div className="bg-[#e2e7ff] p-4 rounded-2xl flex items-start gap-3.5 shadow-sm border border-[#dae2fd]">
            <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="shield_with_heart" className="text-[22px]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">Coverage Advisory</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006194]"></span>
                <span className="text-xs text-[#3f4850] font-medium">Midday Transition</span>
              </div>
              <p className="text-xs md:text-sm text-[#131b2e] leading-snug">
                <strong className="font-semibold text-[#006194]">Dr. Bello</strong> departs for Maitama Outpost at 14:00.{' '}
                <strong className="font-semibold text-[#131b2e]">Nurse Fatima Noor</strong> takes over Triage Standby (14:00 – 17:00).
              </p>
            </div>
          </div>

          {/* Operational Metric Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-5">
            <div className="bg-white p-3.5 md:p-4 rounded-2xl shadow-sm border border-[#dae2fd]/60 flex flex-col items-center text-center">
              <span className="text-xl md:text-2xl font-bold text-[#006194] font-['Plus_Jakarta_Sans',sans-serif]">5 Staff</span>
              <span className="text-xs text-[#3f4850] mt-0.5 font-medium">On Roster</span>
            </div>
            <div className="bg-white p-3.5 md:p-4 rounded-2xl shadow-sm border border-[#dae2fd]/60 flex flex-col items-center text-center">
              <span className="text-xl md:text-2xl font-bold text-[#006a61] font-['Plus_Jakarta_Sans',sans-serif]">34.5 hrs</span>
              <span className="text-xs text-[#3f4850] mt-0.5 font-medium">Scheduled</span>
            </div>
            <div className="bg-white p-3.5 md:p-4 rounded-2xl shadow-sm border border-[#dae2fd]/60 flex flex-col items-center text-center">
              <span className="text-xl md:text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">4/4 Ops</span>
              <span className="text-xs text-[#3f4850] mt-0.5 font-medium">Assigned</span>
            </div>
          </div>

          {/* Section: Shift Timetable Stream */}
          <div>
            <div className="pt-2 pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Shift Timetable Stream
                </h2>
                <span className="w-5 h-5 rounded-full bg-[#dae2fd] text-[#131b2e] text-[11px] font-bold flex items-center justify-center">
                  5
                </span>
              </div>
              <span className="text-xs text-[#3f4850] font-medium">GMT+1 W. Africa (Abuja)</span>
            </div>

            {/* Timeline Cards (Responsive Grid: 1 col on mobile, 2 cols on lg) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {INITIAL_SHIFTS.map((member) => (
                <div
                  key={member.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col gap-3 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0 shadow-sm ring-2 ring-[#eaedff]"
                        src={member.avatarUrl}
                        alt={member.name}
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                            {member.name}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                              member.roleTagClass || 'bg-[#eaedff] text-[#3f4850]'
                            }`}
                          >
                            {member.roleTag}
                          </span>
                        </div>
                        <p className="text-xs text-[#3f4850] flex items-center gap-1.5 mt-1">
                          <Icon name="schedule" className="text-[16px] text-[#006194]" />
                          <span>
                            {member.shiftHours} • <strong className="font-semibold">{member.durationLabel}</strong>
                          </span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${member.statusBadgeColor}`}
                    >
                      {member.statusBadge}
                    </span>
                  </div>

                  {/* Detail pill bar */}
                  <div className="bg-[#f2f3ff] p-2.5 rounded-xl flex items-center justify-between text-xs text-[#3f4850]">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon name={member.detailIcon} className="text-[16px] text-[#006194]" />
                      <span className="truncate">{member.detailText}</span>
                    </div>
                    <span className={`text-xs ${member.detailBadgeColor}`}>{member.detailBadge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Operatory Allocation Summary Table */}
          <div className="pt-4">
            <div className="pb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg md:text-xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  Operatory Allocation
                </h2>
                <span className="text-xs text-[#3f4850] font-medium">Chair Capacity</span>
              </div>
              <Icon name="meeting_room" className="text-[#006194] text-[22px]" />
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden flex flex-col divide-y divide-[#dae2fd]/60">
              {OPERATORIES.map((op) => (
                <div key={op.id} className="p-4 flex items-center justify-between gap-3 hover:bg-[#faf8ff] transition-colors">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[#eaedff] flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-[10px] text-[#3f4850] font-bold tracking-wider">OP</span>
                      <span className="font-bold text-sm text-[#006194] -mt-1 font-['Plus_Jakarta_Sans',sans-serif]">
                        {op.opCode}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                        {op.title}
                      </p>
                      <p className="text-xs text-[#3f4850] truncate">{op.clinicianTime}</p>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${op.badgeClass}`}>
                      {op.utilizationBadge}
                    </span>
                    <p className="text-xs text-[#707881] mt-1">{op.subtext}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Bottom Action Section */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => setShowAddShiftModal(true)}
              className="w-full h-12 rounded-xl bg-[#006194] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm hover:bg-[#004b73] active:scale-[0.99] transition-all"
            >
              <Icon name="add_circle" className="text-[20px]" />
              <span>+ Add Shift / Swap Request</span>
            </button>
            <button
              onClick={() => showToast('Updated shift schedule published to regional broadcast channels.')}
              className="w-full h-12 rounded-xl bg-[#f2f3ff] text-[#006194] hover:bg-[#eaedff] text-sm font-semibold flex items-center justify-center gap-2 border border-[#dae2fd] active:scale-[0.99] transition-all"
            >
              <Icon name="published_with_changes" className="text-[20px]" />
              <span>Publish Updated Schedule</span>
            </button>
          </div>
        </div>
      </main>

      {/* Add Shift / Swap Request Modal */}
      {showAddShiftModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="event_seat" className="text-[18px]" />
                </div>
                <h3 className="font-bold text-base text-[#131b2e]">Add Shift / Swap Request</h3>
              </div>
              <button
                onClick={() => setShowAddShiftModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Staff Member
                </label>
                <select
                  value={newStaffMember}
                  onChange={(e) => setNewStaffMember(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="Dr. Daniel Okoro">Dr. Daniel Okoro, DDS</option>
                  <option value="Dr. Sarah Bello">Dr. Sarah Bello, BDS</option>
                  <option value="Dr. Michael James">Dr. Michael James, DDS</option>
                  <option value="Nurse Zainab Tariq">Nurse Zainab Tariq, RN</option>
                  <option value="Grace Ibrahim">Grace Ibrahim (Reception)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Shift Timing
                </label>
                <select
                  value={newShiftType}
                  onChange={(e) => setNewShiftType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="Full Shift (08:00 - 17:00)">Full Shift (08:00 – 17:00)</option>
                  <option value="Morning Half-Shift (08:30 - 14:00)">Morning Half-Shift (08:30 – 14:00)</option>
                  <option value="Afternoon Block (11:00 - 18:30)">Afternoon Block (11:00 – 18:30)</option>
                  <option value="Emergency On-Call (17:00 - 22:00)">Emergency On-Call (17:00 – 22:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Operatory Suite
                </label>
                <select
                  value={newOperatory}
                  onChange={(e) => setNewOperatory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="Operatory 01">Operatory 01 (Restorative Suite)</option>
                  <option value="Operatory 02">Operatory 02 (Orthodontics Suite)</option>
                  <option value="Operatory 03">Operatory 03 (Oral Surgery Suite)</option>
                  <option value="Operatory 04">Operatory 04 (Hygiene & Scaling Bay)</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowAddShiftModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddShiftModal(false);
                  showToast(`Shift created for ${newStaffMember} at ${newOperatory}.`);
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#006194] text-white hover:bg-[#004b73]"
              >
                Confirm Shift
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
