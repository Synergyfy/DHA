import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

interface DaySchedule {
  day: string;
  isOpen: boolean;
  tag: string;
  openTime: string;
  closeTime: string;
  hasBreak: boolean;
  breakTime: string;
  breakDesc: string;
}

const INITIAL_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', isOpen: true, tag: 'Standard', openTime: '08:30 AM', closeTime: '06:00 PM', hasBreak: true, breakTime: '01:00 PM - 02:00 PM', breakDesc: 'Lunch & Autoclave cycle' },
  { day: 'Tuesday', isOpen: true, tag: 'Standard', openTime: '08:30 AM', closeTime: '06:00 PM', hasBreak: true, breakTime: '01:00 PM - 02:00 PM', breakDesc: 'Lunch & Autoclave cycle' },
  { day: 'Wednesday', isOpen: true, tag: 'Standard', openTime: '08:30 AM', closeTime: '06:00 PM', hasBreak: true, breakTime: '01:00 PM - 02:00 PM', breakDesc: 'Lunch & Autoclave cycle' },
  { day: 'Thursday', isOpen: true, tag: 'Standard', openTime: '08:30 AM', closeTime: '06:00 PM', hasBreak: true, breakTime: '01:00 PM - 02:00 PM', breakDesc: 'Lunch & Autoclave cycle' },
  { day: 'Friday', isOpen: true, tag: 'Adjusted', openTime: '08:30 AM', closeTime: '05:00 PM', hasBreak: true, breakTime: '12:30 PM - 02:00 PM', breakDesc: 'Friday prayer & clinical break' },
  { day: 'Saturday', isOpen: true, tag: 'Half-Day', openTime: '09:00 AM', closeTime: '02:00 PM', hasBreak: false, breakTime: '', breakDesc: '' },
  { day: 'Sunday', isOpen: false, tag: 'Closed / Emergency', openTime: '10:00 AM', closeTime: '02:00 PM', hasBreak: false, breakTime: '', breakDesc: 'Emergency On-Call Only' },
];

export function OperatingHoursScreen() {
  const navigate = useNavigate();
  const [schedule, setSchedule] = useState<DaySchedule[]>(INITIAL_SCHEDULE);
  const [appointmentOnly, setAppointmentOnly] = useState(true);
  const [toastMsg, setToastMsg] = useState('');

  const toggleDay = (index: number) => {
    setSchedule(prev => prev.map((item, i) => i === index ? { ...item, isOpen: !item.isOpen } : item));
  };

  const copyMondayToWeekdays = () => {
    const monday = schedule[0];
    setSchedule(prev => prev.map((item, i) => {
      if (i >= 1 && i <= 3) {
        return {
          ...item,
          isOpen: monday.isOpen,
          openTime: monday.openTime,
          closeTime: monday.closeTime,
          hasBreak: monday.hasBreak,
          breakTime: monday.breakTime,
          breakDesc: monday.breakDesc,
        };
      }
      return item;
    }));
    showToast('Monday hours replicated to Tuesday–Thursday');
  };

  const setWeekendPreset = () => {
    setSchedule(prev => prev.map((item, i) => {
      if (i === 5) {
        return { ...item, isOpen: true, openTime: '09:00 AM', closeTime: '02:00 PM', tag: 'Half-Day', hasBreak: false };
      }
      if (i === 6) {
        return { ...item, isOpen: false, tag: 'Closed / Emergency', openTime: '10:00 AM', closeTime: '02:00 PM', hasBreak: false };
      }
      return item;
    }));
    showToast('Weekend schedule updated: Saturday half-day, Sunday emergency-only');
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleContinue = () => {
    navigate('/clinic-onboarding/verification-documents');
  };

  return (
    <ClinicOnboardingShell
      currentStep={7}
      totalSteps={8}
      stepTitle="Operating Hours"
      stepCategory="Practice Schedule Engine"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Banner Context */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-high/60 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Operating Hours</span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-on-surface">
              Primary Branch Practice Timetable
            </h2>
            <p className="text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
              <Icon name="location_on" className="text-sm text-primary" />
              Greenfield Dental Clinic &bull; Wuse 2 Main Branch (Abuja, FCT)
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed self-start sm:self-center">
            <Icon name="schedule" className="text-sm" /> WAT (UTC+1)
          </span>
        </div>

        {/* Schedule Quick Actions */}
        <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <Icon name="bolt" className="text-lg" />
              </div>
              <h3 className="font-heading font-bold text-sm text-on-surface">Schedule Quick Actions</h3>
            </div>
            <span className="text-xs text-on-surface-variant">Rapid Config Presets</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={copyMondayToWeekdays}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-primary text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              <Icon name="content_copy" className="text-base" />
              <span>Copy Monday &rarr; Weekdays</span>
            </button>
            <button
              type="button"
              onClick={setWeekendPreset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-semibold hover:bg-surface-container-high transition-colors"
            >
              <Icon name="weekend" className="text-base" />
              <span>Standard Weekend Preset</span>
            </button>
          </div>

          {/* Appointment-only mode toggle */}
          <div className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-on-surface">Appointment Only Mode</span>
                <span className="w-2 h-2 rounded-full bg-secondary" />
              </div>
              <p className="text-[11px] text-on-surface-variant mt-0.5">
                Allows emergency walk-in triage intervals between elective surgical procedures
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0">
              <input
                type="checkbox"
                checked={appointmentOnly}
                onChange={e => setAppointmentOnly(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary" />
            </label>
          </div>
        </div>

        {/* 7-Day Timetable Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
              <Icon name="calendar_view_week" className="text-primary text-base" />
              7-Day Weekly Timetable
            </h3>
            <span className="text-xs text-on-surface-variant">Live Patient Booking Portal</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {schedule.map((item, idx) => (
              <div
                key={item.day}
                className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  item.isOpen
                    ? 'bg-surface-container-lowest border-outline-variant/40 shadow-sm'
                    : 'bg-surface-container-low/60 border-outline-variant/20 opacity-80'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <span className="font-heading font-bold text-sm sm:text-base text-on-surface">{item.day}</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${
                        item.isOpen
                          ? 'bg-secondary-fixed text-on-secondary-fixed'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {item.isOpen ? item.tag : 'Closed'}
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.isOpen}
                      onChange={() => toggleDay(idx)}
                      className="sr-only peer"
                    />
                    <div className="w-10 h-5 bg-surface-container-highest rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                {item.isOpen ? (
                  <div className="pt-3 space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <span className="text-[11px] font-semibold text-on-surface-variant block mb-1">Opening Hour</span>
                        <div className="bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between text-xs font-semibold text-on-surface">
                          <span>{item.openTime}</span>
                          <Icon name="schedule" className="text-sm text-on-surface-variant" />
                        </div>
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-on-surface-variant block mb-1">Closing Hour</span>
                        <div className="bg-surface-container-low rounded-xl px-3 py-2 flex items-center justify-between text-xs font-semibold text-on-surface">
                          <span>{item.closeTime}</span>
                          <Icon name="schedule" className="text-sm text-on-surface-variant" />
                        </div>
                      </div>
                    </div>

                    {item.hasBreak && (
                      <div className="p-3 rounded-xl bg-surface-container-low/70 border border-outline-variant/30 flex items-start justify-between text-xs">
                        <div className="flex items-start gap-2.5">
                          <Icon name="cleaning_services" className="text-primary text-base mt-0.5" />
                          <div>
                            <span className="font-semibold text-on-surface">{item.breakTime}</span>
                            <p className="text-[11px] text-on-surface-variant">{item.breakDesc}</p>
                          </div>
                        </div>
                        <span className="text-[10px] uppercase font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded">
                          Interval
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-3 flex items-center gap-2 text-xs text-on-surface-variant">
                    <Icon name="night_shelter" className="text-base text-amber-600" />
                    <span>Clinic facility closed to routine appointments. On-call emergency coverage active.</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/primary-location')}
            className="px-5 py-2.5 rounded-xl border border-outline-variant text-on-surface-variant text-xs sm:text-sm font-semibold hover:bg-surface-container transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center gap-2"
          >
            <span>Continue to Document Uploads</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>

        {/* Micro-toast feedback */}
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2">
            <Icon name="check_circle" className="text-secondary text-sm" />
            <span>{toastMsg}</span>
          </div>
        )}
      </div>
    </ClinicOnboardingShell>
  );
}
