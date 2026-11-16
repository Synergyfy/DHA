import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface DaySchedule {
  dayName: string;
  dateStr: string;
  facility: string;
  operatory: string;
  hours: string;
  isOffDuty: boolean;
  bookedCount: number;
  totalCapacity: number;
  breakTime: string;
  isToday?: boolean;
}

const INITIAL_SCHEDULE: DaySchedule[] = [
  {
    dayName: 'Sunday',
    dateStr: '18 Oct 2026',
    facility: 'Harmony Dental Clinic (Wuse 2)',
    operatory: 'Operatory 02',
    hours: '08:30 - 17:00',
    isOffDuty: false,
    bookedCount: 6,
    totalCapacity: 8,
    breakTime: '12:30 - 13:30 (Lunch & Case Review)',
    isToday: true,
  },
  {
    dayName: 'Monday',
    dateStr: '19 Oct 2026',
    facility: 'Harmony Dental Clinic (Wuse 2)',
    operatory: 'Operatory 02',
    hours: '08:30 - 16:30',
    isOffDuty: false,
    bookedCount: 5,
    totalCapacity: 8,
    breakTime: '13:00 - 14:00 (Break)',
  },
  {
    dayName: 'Tuesday',
    dateStr: '20 Oct 2026',
    facility: 'Harmony Dental Clinic (Wuse 2)',
    operatory: 'Operatory 02',
    hours: '08:30 - 17:30',
    isOffDuty: false,
    bookedCount: 7,
    totalCapacity: 8,
    breakTime: '12:30 - 13:30 (Lunch)',
  },
  {
    dayName: 'Wednesday',
    dateStr: '21 Oct 2026',
    facility: 'Harmony Specialists Clinic (Victoria Island)',
    operatory: 'Suite 402',
    hours: '09:00 - 17:00',
    isOffDuty: false,
    bookedCount: 5,
    totalCapacity: 7,
    breakTime: '13:00 - 14:00 (Break)',
  },
  {
    dayName: 'Thursday',
    dateStr: '22 Oct 2026',
    facility: 'Harmony Specialists Clinic (Victoria Island)',
    operatory: 'Suite 402',
    hours: '09:00 - 17:00',
    isOffDuty: false,
    bookedCount: 4,
    totalCapacity: 7,
    breakTime: '13:00 - 14:00 (Break)',
  },
  {
    dayName: 'Friday',
    dateStr: '23 Oct 2026',
    facility: 'Harmony Dental Clinic (Wuse 2)',
    operatory: 'Operatory 02 (Half-Day)',
    hours: '08:30 - 12:30',
    isOffDuty: false,
    bookedCount: 3,
    totalCapacity: 4,
    breakTime: 'None (Half Day Session)',
  },
  {
    dayName: 'Saturday',
    dateStr: '24 Oct 2026',
    facility: 'Non-Clinical',
    operatory: 'N/A',
    hours: 'Off-Duty',
    isOffDuty: true,
    bookedCount: 0,
    totalCapacity: 0,
    breakTime: 'Rest Day / Emergency On-Call Only',
  },
];

export function WorkingScheduleAvailabilityScreen() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [selectedFacility, setSelectedFacility] = useState('All Facilities');
  const [turnoverBuffer, setTurnoverBuffer] = useState('15 mins');
  const [maxDailyCap, setMaxDailyCap] = useState(8);
  const [walkInReserve, setWalkInReserve] = useState(true);
  const [saveToast, setSaveToast] = useState(false);

  // Edit Day Modal
  const [editingDay, setEditingDay] = useState<DaySchedule | null>(null);

  const handleSave = () => {
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleSaveDayEdit = () => {
    if (editingDay) {
      setSchedule((prev) =>
        prev.map((d) => (d.dayName === editingDay.dayName ? editingDay : d))
      );
      setEditingDay(null);
    }
  };

  const filteredSchedule = schedule.filter((d) => {
    if (selectedFacility === 'All Facilities') return true;
    if (selectedFacility === 'Harmony Wuse 2') return d.facility.includes('Wuse 2') || d.isOffDuty;
    if (selectedFacility === 'Harmony Victoria Island') return d.facility.includes('Victoria Island') || d.isOffDuty;
    return true;
  });

  return (
    <ClinicalWorkspaceShell
      pageTitle="Working Schedule & Availability"
      badgeCode="14.17"
      badgeLabel="Roster & Chairside Allocation"
      activeNav="calendar"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Navigation Breadcrumb & Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-[#707881]">
            <button
              type="button"
              onClick={() => navigate('/dentist/calendar')}
              className="hover:text-[#006194] transition-colors"
            >
              Calendar &amp; Appointments
            </button>
            <Icon name="chevron_right" className="text-[14px]" />
            <span className="font-semibold text-[#131b2e]">Clinician Availability Roster</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => navigate('/dentist/leave')}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#ba1a1a] text-xs font-bold border border-[#eaedff] flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Icon name="event_busy" className="text-[16px]" />
              <span>Request Leave / Time Off</span>
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#004e77] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-colors"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save Schedule Updates</span>
            </button>
          </div>
        </div>

        {/* Save Toast Notification */}
        {saveToast && (
          <div className="p-4 bg-[#86f2e4]/30 border border-[#86f2e4] text-[#006f66] rounded-2xl flex items-center gap-3 animate-in fade-in">
            <Icon name="check_circle" className="text-[20px]" />
            <span className="text-xs font-bold">
              Working schedule and chairside envelope parameters saved and synced across DHA patient portal!
            </span>
          </div>
        )}

        {/* Chairside Allocation Bento & Utilization Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Main Utilization Gauge Card (7 cols) */}
          <div className="md:col-span-7 bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                  Weekly Chairside Utilization
                </span>
                <h3 className="text-lg font-bold text-[#131b2e] mt-0.5">
                  Week 42 • 18 Oct – 24 Oct 2026
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold border border-[#86f2e4]/50">
                Optimal Capacity
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
              {/* Circular Gauge Graphic */}
              <div className="relative w-32 h-32 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#eaedff"
                    strokeWidth="12"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="transparent"
                    stroke="#006194"
                    strokeWidth="12"
                    strokeDasharray="251.2"
                    strokeDashoffset="22.6" // ~91%
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-[#131b2e]">91%</span>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-[#707881]">
                    Booked
                  </span>
                </div>
              </div>

              {/* Metric Breakdown */}
              <div className="flex-1 space-y-2.5 text-xs w-full">
                <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-xl">
                  <span className="text-[#707881]">Active Chairside Hours:</span>
                  <strong className="text-[#131b2e] font-mono">36.5 / 40.0 Hrs Max Cap</strong>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-xl">
                  <span className="text-[#707881]">Scheduled Appointments:</span>
                  <strong className="text-[#006194] font-mono">30 Encounters Booked</strong>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#f2f3ff] rounded-xl">
                  <span className="text-[#707881]">Emergency Walk-In Slots:</span>
                  <strong className="text-[#006a61] font-mono">3 Slots Reserved</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-[#707881] flex items-center gap-1.5 border-t border-[#eaedff]">
              <Icon name="info" className="text-[14px] text-[#006194]" />
              <span>Complies with DHA Practitioner Safe Working Hours Guideline (&lt;48h/week).</span>
            </div>
          </div>

          {/* Practice Facility Switcher & Envelopes (5 cols) */}
          <div className="md:col-span-5 bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Facility Filter
                </h4>
                <span className="text-[11px] font-mono text-[#006194]">2 Active Clinics</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {['All Facilities', 'Harmony Wuse 2', 'Harmony Victoria Island'].map((fac) => (
                  <button
                    key={fac}
                    type="button"
                    onClick={() => setSelectedFacility(fac)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-semibold transition-all border ${
                      selectedFacility === fac
                        ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                        : 'bg-[#faf8ff] text-[#3f4850] border-[#eaedff] hover:bg-[#eaedff]'
                    }`}
                  >
                    {fac}
                  </button>
                ))}
              </div>
            </div>

            {/* Standard Appointment Envelopes */}
            <div className="space-y-2 pt-2 border-t border-[#eaedff]">
              <div className="text-xs font-bold text-[#131b2e]">
                Standard Procedure Envelopes
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#707881]">Comprehensive Exam</div>
                  <div className="font-bold text-[#006194]">30 mins</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#707881]">Composite Prep</div>
                  <div className="font-bold text-[#006194]">45 mins</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#707881]">Crown / Fixed Pros</div>
                  <div className="font-bold text-[#006194]">60 mins</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                  <div className="text-[10px] text-[#707881]">Complex Endodontics</div>
                  <div className="font-bold text-[#006194]">90 mins</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 7-Day Interactive Timetable */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#eaedff]">
            <div>
              <h2 className="text-base font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="calendar_view_week" className="text-[20px] text-[#006194]" />
                <span>Weekly Operational Timetable</span>
              </h2>
              <p className="text-xs text-[#707881] mt-0.5">
                Chairside hours, scheduled breaks, and operatory allocations for the active roster.
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => navigate('/dentist/appointments-list')}
                className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#006194] text-xs font-semibold hover:bg-[#eaedff] border border-[#eaedff] transition-colors flex items-center gap-1.5"
              >
                <Icon name="view_list" className="text-[16px]" />
                <span>View Booked List</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredSchedule.map((day) => (
              <div
                key={day.dayName}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  day.isToday
                    ? 'border-[#006194] bg-[#faf8ff] ring-2 ring-[#006194]/15 shadow-sm'
                    : day.isOffDuty
                    ? 'border-[#eaedff] bg-[#faf8ff]/50 opacity-75'
                    : 'border-[#eaedff] bg-white hover:border-[#006194]/30'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: Day & Date */}
                  <div className="flex items-start gap-3.5 min-w-[200px]">
                    <div
                      className={`w-11 h-11 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shrink-0 ${
                        day.isToday
                          ? 'bg-[#006194] text-white shadow-md'
                          : day.isOffDuty
                          ? 'bg-[#eaedff] text-[#707881]'
                          : 'bg-[#f2f3ff] text-[#131b2e]'
                      }`}
                    >
                      <span className="text-[10px] uppercase font-semibold leading-none">
                        {day.dayName.substring(0, 3)}
                      </span>
                      <span className="text-sm font-bold leading-tight">
                        {day.dateStr.split(' ')[0]}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-[#131b2e]">{day.dayName}</span>
                        {day.isToday && (
                          <span className="px-2 py-0.2 rounded-full bg-[#006194] text-white text-[9px] font-bold">
                            Today
                          </span>
                        )}
                        {day.isOffDuty && (
                          <span className="px-2 py-0.2 rounded-full bg-[#eaedff] text-[#707881] text-[9px] font-bold">
                            Off-Duty
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-[#707881] mt-0.5">{day.dateStr}</div>
                    </div>
                  </div>

                  {/* Center: Facility, Operatory, and Hours */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-[#707881] block text-[10px] uppercase font-semibold">
                        Location / Operatory
                      </span>
                      <strong className="text-[#131b2e] font-semibold">{day.facility}</strong>
                      <div className="text-[11px] text-[#006194] font-medium">{day.operatory}</div>
                    </div>

                    <div>
                      <span className="text-[#707881] block text-[10px] uppercase font-semibold">
                        Duty Window
                      </span>
                      <strong className="text-[#131b2e] font-mono">{day.hours}</strong>
                      <div className="text-[11px] text-[#707881]">{day.breakTime}</div>
                    </div>

                    <div>
                      <span className="text-[#707881] block text-[10px] uppercase font-semibold">
                        Patient Capacity
                      </span>
                      {!day.isOffDuty ? (
                        <div className="space-y-1">
                          <strong className="text-[#006194] font-mono">
                            {day.bookedCount} / {day.totalCapacity} Slots Booked
                          </strong>
                          <div className="w-28 bg-[#eaedff] h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-[#006194] h-full rounded-full"
                              style={{
                                width: `${(day.bookedCount / day.totalCapacity) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ) : (
                        <span className="text-[#707881] italic">No patients rostered</span>
                      )}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => setEditingDay(day)}
                      className="px-3 py-1.5 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#006194] text-xs font-semibold border border-[#eaedff] transition-colors"
                    >
                      Edit Hours
                    </button>
                    {!day.isOffDuty && (
                      <button
                        type="button"
                        onClick={() => navigate('/dentist/calendar')}
                        className="p-1.5 rounded-xl text-[#707881] hover:text-[#006194] hover:bg-[#f2f3ff] transition-colors"
                        title="View in Calendar"
                      >
                        <Icon name="event" className="text-[18px]" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buffers & Operational Constraints Studio */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
          <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
            <Icon name="tune" className="text-[18px] text-[#006194]" />
            <span>Turnover Buffers &amp; Scheduling Guardrails</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* Turnover Buffer */}
            <div className="p-4 bg-[#faf8ff] rounded-2xl border border-[#eaedff] space-y-2">
              <label className="font-bold text-[#131b2e] block">
                Operatory Sterilisation Turnover Buffer
              </label>
              <select
                value={turnoverBuffer}
                onChange={(e) => setTurnoverBuffer(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
              >
                <option>10 mins</option>
                <option>15 mins (Recommended for Aerosol Procedures)</option>
                <option>20 mins (Full Surgical Wipe-Down)</option>
              </select>
              <p className="text-[10px] text-[#707881]">
                Enforced between consecutive patient encounters for autoclave and room turnover.
              </p>
            </div>

            {/* Max Daily Cap */}
            <div className="p-4 bg-[#faf8ff] rounded-2xl border border-[#eaedff] space-y-2">
              <label className="font-bold text-[#131b2e] block">
                Daily Patient Caseload Cap
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={4}
                  max={12}
                  value={maxDailyCap}
                  onChange={(e) => setMaxDailyCap(Number(e.target.value))}
                  className="flex-1 accent-[#006194]"
                />
                <span className="font-mono font-bold text-sm text-[#006194] w-8 text-center">
                  {maxDailyCap}
                </span>
              </div>
              <p className="text-[10px] text-[#707881]">
                Protects clinician focus; blocks automatic online bookings once capacity is reached.
              </p>
            </div>

            {/* Walk-in reserve */}
            <div className="p-4 bg-[#faf8ff] rounded-2xl border border-[#eaedff] space-y-2 flex flex-col justify-between">
              <div>
                <label className="font-bold text-[#131b2e] block">
                  Daily Emergency Walk-in Hold
                </label>
                <p className="text-[10px] text-[#707881] mt-1">
                  Reserves 16:30 - 17:00 slot exclusively for acute dental trauma and severe pulpitis triage.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2">
                <span className="text-xs font-semibold text-[#131b2e]">
                  {walkInReserve ? 'Slot Reserved' : 'Slot Open to General Bookings'}
                </span>
                <button
                  type="button"
                  onClick={() => setWalkInReserve(!walkInReserve)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    walkInReserve ? 'bg-[#006194]' : 'bg-[#bfc7d2]'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      walkInReserve ? 'right-1' : 'left-1'
                    }`}
                  ></span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Hours Modal */}
        {editingDay && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="schedule" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">
                    Edit Hours: {editingDay.dayName}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingDay(null)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Duty Window</label>
                  <input
                    type="text"
                    value={editingDay.hours}
                    onChange={(e) => setEditingDay({ ...editingDay, hours: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">Break Period</label>
                  <input
                    type="text"
                    value={editingDay.breakTime}
                    onChange={(e) => setEditingDay({ ...editingDay, breakTime: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#f2f3ff]">
                  <span className="font-bold text-[#131b2e]">Mark as Off-Duty Day</span>
                  <input
                    type="checkbox"
                    checked={editingDay.isOffDuty}
                    onChange={(e) =>
                      setEditingDay({ ...editingDay, isOffDuty: e.target.checked })
                    }
                    className="w-4 h-4 accent-[#006194]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingDay(null)}
                    className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveDayEdit}
                    className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
