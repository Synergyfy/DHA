import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

interface CalendarSlot {
  id: string;
  time: string;
  duration: string;
  type: 'sterilization' | 'completed' | 'active' | 'waiting' | 'break' | 'confirmed' | 'open';
  patient?: string;
  demographics?: string;
  dhaId?: string;
  title: string;
  subtitle?: string;
  nurse?: string;
  badge?: string;
  elapsed?: string;
  tooth?: string;
}

export function AppointmentsCalendarScreen() {
  const navigate = useNavigate();

  // State
  const [period, setPeriod] = useState<'day' | 'week' | 'month'>('week');
  const [selectedDate, setSelectedDate] = useState('18');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingTime, setBookingTime] = useState('15:30 (3:30 PM)');
  const [bookingType, setBookingType] = useState('General Consultation & Assessment');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const days = [
    { day: 'Sun', date: '18', count: '8', active: true },
    { day: 'Mon', date: '19', count: '6' },
    { day: 'Tue', date: '20', count: '7' },
    { day: 'Wed', date: '21', count: '5' },
    { day: 'Thu', date: '22', count: '9' },
    { day: 'Fri', date: '23', count: 'Block', isBlock: true },
    { day: 'Sat', date: '24', count: '4' },
  ];

  const slots: CalendarSlot[] = [
    {
      id: 's-1',
      time: '08:30',
      duration: '45m',
      type: 'sterilization',
      title: 'Operatory Sterilization Check',
      subtitle: 'Internal Protocol • Autoclave Batch #24 Verified',
    },
    {
      id: 's-2',
      time: '09:30',
      duration: '45m',
      type: 'completed',
      patient: 'Marcus Vance',
      demographics: '28y M',
      dhaId: 'DHA-00412',
      title: '6-Mo Periodontal Recare & Splint Check',
      nurse: 'Fatima Noor',
      badge: 'BOP Score: 4%',
    },
    {
      id: 's-3',
      time: '10:30',
      duration: '60m',
      type: 'active',
      patient: 'Amara Okafor',
      demographics: '34y F',
      dhaId: 'DHA-2026-00451',
      title: 'Tooth #16 Biomimetic Composite',
      subtitle: 'Plan #TP-2026-089 • Etch, Bond & Dual-Cure Nano',
      nurse: 'Zainab Tariq',
      elapsed: 'Session: 35m elapsed',
      tooth: '#16',
    },
    {
      id: 's-4',
      time: '11:45',
      duration: '45m',
      type: 'waiting',
      patient: 'Fatima Al-Zahra',
      demographics: '28y F',
      dhaId: 'DHA-08921',
      title: 'GBR Bone Regeneration Audit (Tooth #14)',
      subtitle: 'Reception check-in by Bay 1',
      badge: 'Arrived (10m ago)',
    },
    {
      id: 's-5',
      time: '12:30',
      duration: '60m',
      type: 'break',
      title: 'Lunch & Documentation Break',
      subtitle: 'Protected Clinical Interval',
    },
    {
      id: 's-6',
      time: '14:00',
      duration: '60m',
      type: 'confirmed',
      patient: 'Chinedu Okafor',
      demographics: '41y M',
      dhaId: 'DHA-10482',
      title: 'Single Tooth Endodontic Review (#16)',
      subtitle: 'Pre-op X-rays Ready',
    },
    {
      id: 's-7',
      time: '15:30',
      duration: '45m',
      type: 'open',
      title: 'Open Slot Available',
      subtitle: 'Operatory 02 Ready • Hygiene / Consultation',
    },
  ];

  return (
    <ClinicalWorkspaceShell
      pageTitle="My Appointments: Calendar"
      badgeCode="14.3"
      badgeLabel="Schedule Matrix"
      activeNav="calendar"
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Top View Switcher & Clinic Context Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Period Segment */}
            <div className="flex p-1 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
              {(['day', 'week', 'month'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPeriod(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    period === p
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Mode Toggle (Calendar vs List) */}
            <div className="flex p-1 bg-[#f2f3ff] rounded-xl border border-[#eaedff]">
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-bold shadow-xs"
              >
                <Icon name="calendar_view_day" className="text-[16px]" />
                <span>Cal</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dentist/appointments-list')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[#707881] hover:text-[#131b2e] text-xs font-semibold transition-colors"
              >
                <Icon name="format_list_bulleted" className="text-[16px]" />
                <span>List View</span>
              </button>
            </div>
          </div>

          {/* Active Operatory Context */}
          <div className="flex items-center justify-between gap-3 bg-[#f2f3ff] px-4 py-2 rounded-xl border border-[#eaedff]">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse shrink-0"></span>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#131b2e] truncate">
                  Harmony Wuse 2 • Operatory 02
                </span>
                <span className="text-[11px] text-[#707881]">Dr. Daniel James (Lead Prosthodontist)</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => showToast('Operatory room filter switcher opened.')}
              className="px-2.5 py-1 text-xs font-bold text-[#006194] bg-white rounded-lg hover:bg-[#eaedff] transition-colors border border-[#eaedff]"
            >
              Change
            </button>
          </div>
        </div>

        {/* Date Navigation & 7-Day Carousel */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-bold text-[#131b2e]">October 2026</h2>
              <span className="text-xs text-[#707881] font-semibold">Week 42</span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => showToast('Previous week')}
                className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881] transition-colors"
                aria-label="Previous week"
              >
                <Icon name="chevron_left" className="text-[18px]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedDate('18');
                  showToast('Navigated to Today (Sun 18 Oct).');
                }}
                className="px-3 h-8 rounded-lg bg-[#cce5ff]/50 text-[#004b73] text-xs font-bold flex items-center justify-center hover:bg-[#cce5ff] transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => showToast('Next week')}
                className="w-8 h-8 rounded-lg bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881] transition-colors"
                aria-label="Next week"
              >
                <Icon name="chevron_right" className="text-[18px]" />
              </button>
            </div>
          </div>

          {/* Date Strip Carousel */}
          <div className="flex gap-2.5 overflow-x-auto pb-1">
            {days.map((d) => {
              const isSelected = selectedDate === d.date;
              return (
                <button
                  key={d.date}
                  type="button"
                  onClick={() => setSelectedDate(d.date)}
                  className={`flex flex-col items-center justify-between min-w-[62px] h-[80px] p-2 rounded-xl shrink-0 transition-all border ${
                    isSelected
                      ? 'bg-[#006194] text-white border-[#006194] shadow-sm ring-2 ring-[#006194]/20'
                      : d.isBlock
                      ? 'bg-[#f2f3ff] text-[#707881] border-dashed border-[#bfc7d2]'
                      : 'bg-white text-[#131b2e] border-[#eaedff] hover:bg-[#f2f3ff]'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      isSelected ? 'text-white/90' : 'text-[#707881]'
                    }`}
                  >
                    {d.day}
                  </span>
                  <span className="text-xl font-bold leading-none">{d.date}</span>
                  <div className="flex items-center gap-1">
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4]"></span>}
                    <span
                      className={`text-[10px] font-bold ${
                        isSelected ? 'text-white' : d.isBlock ? 'text-[#ba1a1a]' : 'text-[#707881]'
                      }`}
                    >
                      {d.count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend Micro-Pills */}
          <div className="pt-2 border-t border-[#eaedff] flex items-center gap-2 overflow-x-auto text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span className="text-[#131b2e] font-medium">Confirmed</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#cce5ff]/50 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#006194] animate-pulse"></span>
              <span className="text-[#004b73] font-bold">Chairside Active</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#86f2e4]/30 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#006f66]"></span>
              <span className="text-[#006f66] font-medium">Completed</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 shrink-0 border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              <span className="text-amber-800 font-medium">Waiting Room</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#f2f3ff] shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#707881]"></span>
              <span className="text-[#707881] font-medium">Sterilization / Break</span>
            </div>
          </div>
        </div>

        {/* Hourly Time Slot Timeline Feed */}
        <div className="space-y-4">
          {slots.map((s) => (
            <div key={s.id} className="flex items-start gap-4">
              {/* Time Indicator */}
              <div className="w-16 shrink-0 text-right pt-2 font-mono">
                <span
                  className={`text-sm font-bold block leading-tight ${
                    s.type === 'active' ? 'text-[#006194]' : 'text-[#131b2e]'
                  }`}
                >
                  {s.time}
                </span>
                <span className="text-xs text-[#707881]">{s.duration}</span>
              </div>

              {/* Slot Body Card */}
              <div className="flex-1 min-w-0">
                {s.type === 'active' ? (
                  /* Chairside Active Hero Card */
                  <div className="bg-gradient-to-br from-[#cce5ff]/25 to-white rounded-2xl p-5 shadow-sm border border-[#006194] ring-2 ring-[#006194]/20 space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
                          AO
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-[#131b2e]">{s.patient}</h3>
                            <Icon name="verified" className="text-[#006a61] text-[16px]" />
                            <span className="text-xs font-semibold text-[#707881]">
                              ({s.demographics})
                            </span>
                          </div>
                          <span className="font-mono text-xs text-[#707881]">{s.dhaId}</span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#006194] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#86f2e4]"></span>
                        Chairside
                      </span>
                    </div>

                    <div className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#006194]">
                        <Icon name="medical_services" className="text-[16px]" />
                        <span>{s.title}</span>
                      </div>
                      <span className="text-xs text-[#3f4850] block mt-0.5">{s.subtitle}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#707881]">
                      <span>Chairside RN: {s.nurse}</span>
                      <span className="font-mono font-bold text-[#006194]">{s.elapsed}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={() => navigate('/treatment-plans/progress-workspace')}
                        className="h-10 px-3 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Icon name="clinical_notes" className="text-[16px]" />
                        <span>Clinical Workspace</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/dentist/appointment-details')}
                        className="h-10 px-3 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1 border border-[#eaedff] transition-colors"
                      >
                        <Icon name="assignment" className="text-[16px] text-[#006194]" />
                        <span>Details (14.5)</span>
                      </button>
                    </div>
                  </div>
                ) : s.type === 'completed' ? (
                  /* Completed Card */
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#f2f3ff] text-[#006194] font-bold text-xs flex items-center justify-center shrink-0">
                          MV
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#131b2e]">{s.patient}</span>
                            <span className="text-xs text-[#707881]">({s.demographics})</span>
                          </div>
                          <span className="font-mono text-[11px] text-[#707881]">{s.dhaId}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold flex items-center gap-1">
                        <Icon name="done_all" className="text-[13px]" /> Completed
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] bg-[#f2f3ff] p-2.5 rounded-xl border border-[#eaedff]">
                      {s.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#707881]">
                      <span>Nurse: {s.nurse}</span>
                      <span className="font-bold text-[#006a61]">{s.badge}</span>
                    </div>
                  </div>
                ) : s.type === 'waiting' ? (
                  /* Waiting Room Card */
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-amber-200 bg-amber-50/20 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-900 font-bold text-xs flex items-center justify-center shrink-0">
                          FZ
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#131b2e]">{s.patient}</span>
                            <span className="text-xs text-[#707881]">({s.demographics})</span>
                          </div>
                          <span className="font-mono text-[11px] text-[#707881]">{s.dhaId}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold flex items-center gap-1">
                        <Icon name="schedule" className="text-[13px]" /> {s.badge}
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] bg-white p-2.5 rounded-xl border border-[#eaedff]">
                      {s.title}
                    </p>
                    <div className="flex items-center justify-between text-xs pt-0.5">
                      <span className="text-[#707881]">{s.subtitle}</span>
                      <button
                        type="button"
                        onClick={() => showToast(`Called ${s.patient} to Operatory 02.`)}
                        className="text-[#006194] font-bold hover:underline"
                      >
                        Call to Op →
                      </button>
                    </div>
                  </div>
                ) : s.type === 'confirmed' ? (
                  /* Confirmed Card */
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#eaedff] space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-[#f2f3ff] text-[#006194] font-bold text-xs flex items-center justify-center shrink-0">
                          CO
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-[#131b2e]">{s.patient}</span>
                            <span className="text-xs text-[#707881]">({s.demographics})</span>
                          </div>
                          <span className="font-mono text-[11px] text-[#707881]">{s.dhaId}</span>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/20 text-[#006a61] text-xs font-bold flex items-center gap-1">
                        <Icon name="check" className="text-[13px]" /> Confirmed
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] bg-[#f2f3ff] p-2.5 rounded-xl border border-[#eaedff]">
                      {s.title}
                    </p>
                    <div className="flex items-center justify-between text-xs text-[#707881]">
                      <span>{s.subtitle}</span>
                      <button
                        type="button"
                        onClick={() => navigate('/dentist/appointment-details')}
                        className="text-[#006194] font-bold hover:underline"
                      >
                        Details →
                      </button>
                    </div>
                  </div>
                ) : s.type === 'open' ? (
                  /* Open Booking Slot */
                  <button
                    type="button"
                    onClick={() => {
                      setBookingTime(s.time);
                      setShowBookingModal(true);
                    }}
                    className="w-full rounded-2xl p-4 bg-[#f2f3ff] hover:bg-[#eaedff] border-2 border-dashed border-[#006194]/40 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white text-[#006a61] flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Icon name="add_circle" className="text-[20px]" />
                      </div>
                      <div>
                        <span className="text-sm font-bold text-[#006a61] block">{s.title}</span>
                        <span className="text-xs text-[#707881]">{s.subtitle}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-bold shadow-xs">
                      + Book Slot
                    </span>
                  </button>
                ) : (
                  /* Sterilization / Break Card */
                  <div className="bg-[#f2f3ff] rounded-2xl p-3.5 border border-[#eaedff] flex items-center justify-between text-xs text-[#707881]">
                    <div className="flex items-center gap-2.5">
                      <Icon
                        name={s.type === 'sterilization' ? 'sanitizer' : 'restaurant'}
                        className="text-[18px]"
                      />
                      <div>
                        <span className="font-bold text-[#131b2e] block">{s.title}</span>
                        <span>{s.subtitle}</span>
                      </div>
                    </div>
                    <Icon name="lock" className="text-[16px]" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sticky Bottom Utilization & Quick Booking Action Bar */}
        <aside className="sticky bottom-4 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#eaedff] flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-[#131b2e]">6 Slots Booked</span>
              <span className="text-xs text-[#707881]">• 85% Chair Utilization</span>
            </div>
            <span className="text-xs text-[#006a61] flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              1 open appointment window left today
            </span>
          </div>

          <button
            type="button"
            onClick={() => setShowBookingModal(true)}
            className="h-11 px-5 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-colors"
          >
            <Icon name="add" className="text-[18px]" />
            <span>Book Slot</span>
          </button>
        </aside>

        {/* Quick Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="calendar_today" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Book Chairside Appointment</h3>
                    <p className="text-xs text-[#707881]">Operatory 02 • {bookingTime}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Select Patient</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]">
                    <option>Amara Okafor (DHA-2026-00451)</option>
                    <option>Chinedu Okafor (DHA-10482)</option>
                    <option>Fatima Al-Zahra (DHA-08921)</option>
                    <option>Marcus Vance (DHA-00412)</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Appointment Type</label>
                  <select
                    value={bookingType}
                    onChange={(e) => setBookingType(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option>General Consultation & Assessment</option>
                    <option>Phase 2 Restorative Delivery</option>
                    <option>Periodontal Recare Audit</option>
                    <option>Urgent Pain Relief</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] text-xs text-[#3f4850]">
                  Slot reservation automatically synchronizes with receptionist queue and sends patient confirmation SMS.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowBookingModal(false);
                    showToast('Appointment successfully confirmed and booked.');
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Confirm Reservation
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
