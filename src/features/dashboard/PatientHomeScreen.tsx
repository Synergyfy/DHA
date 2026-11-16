import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { usePatientStore } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

const getNextFriday = () => {
  const date = new Date();
  const daysUntilFriday = (5 - date.getDay() + 7) % 7 || 7;
  date.setDate(date.getDate() + daysUntilFriday);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const createAppointmentDate = (date: string, hour: number, minute: number) => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day, hour - 1, minute));
};

const formatCalendarDate = (date: Date) => date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');

export function PatientHomeScreen() {
  const navigate = useNavigate();
  const {
    activeProfile,
    setQrModalOpen,
    flossingReminder,
    toggleFlossingReminder,
    fluorideReminder,
    toggleFluorideReminder,
  } = usePatientStore();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  void navigate; // used for programmatic navigation below

  const [bookingToast, setBookingToast] = useState<string | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState(getNextFriday);
  const appointmentStart = createAppointmentDate(appointmentDate, 10, 30);
  const appointmentEnd = new Date(appointmentStart.getTime() + 45 * 60 * 1000);
  const formattedAppointmentDate = new Date(`${appointmentDate}T12:00:00`);
  const appointmentMonth = formattedAppointmentDate.toLocaleString('en-NG', { month: 'short' }).toUpperCase();
  const appointmentDay = formattedAppointmentDate.getDate();
  const appointmentWeekday = formattedAppointmentDate.toLocaleString('en-NG', { weekday: 'short' }).toUpperCase();
  const appointmentTitle = 'Enamel Fluoride Touchup & Scaling';
  const appointmentLocation = 'Lagos Island Dental Centre, Lagos, Nigeria';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(appointmentTitle)}&dates=${formatCalendarDate(appointmentStart)}/${formatCalendarDate(appointmentEnd)}&details=${encodeURIComponent('Dental appointment with Dr. Chinedu Okafor')}&location=${encodeURIComponent(appointmentLocation)}`;

  const handleBooking = (clinicName: string) => {
    setBookingToast(`Booking request initiated for ${clinicName}. Opening scheduling modal...`);
    setTimeout(() => setBookingToast(null), 4000);
  };

  const addToDeviceCalendar = () => {
    const escapeCalendarText = (value: string) => value
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/,/g, '\\,')
      .replace(/;/g, '\\;');
    const calendarContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//DHA//Patient Appointment//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      `UID:dha-appointment-${Date.now()}@dha.ng`,
      `DTSTAMP:${formatCalendarDate(new Date())}`,
      `DTSTART:${formatCalendarDate(appointmentStart)}`,
      `DTEND:${formatCalendarDate(appointmentEnd)}`,
      `SUMMARY:${escapeCalendarText(appointmentTitle)}`,
      `LOCATION:${escapeCalendarText(appointmentLocation)}`,
      `DESCRIPTION:${escapeCalendarText('Dental appointment with Dr. Chinedu Okafor')}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    const calendarUrl = URL.createObjectURL(new Blob([calendarContent], { type: 'text/calendar;charset=utf-8' }));
    const downloadLink = document.createElement('a');
    downloadLink.href = calendarUrl;
    downloadLink.download = 'dha-appointment.ics';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    downloadLink.remove();
    window.setTimeout(() => URL.revokeObjectURL(calendarUrl), 1000);
    setCalendarAdded(true);
  };

  return (
    <DashboardShell pageTitle="Patient Home">
      {bookingToast && (
        <div className="fixed top-20 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{bookingToast}</span>
          <button
            type="button"
            onClick={() => setBookingToast(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-8 py-3 sm:py-5 space-y-4 sm:space-y-6">
        {/* Subtle Profile-Completion Alert Banner */}
        <section className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-3 sm:p-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-xs">
                <Icon name="verified_user" className="text-[18px]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-xs sm:text-sm text-on-surface font-semibold truncate">
                    Profile 75% Complete
                  </p>
                  <span className="text-[10px] text-secondary font-semibold bg-secondary-container/40 px-1.5 py-0.5 rounded-full">
                    2 steps left
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-on-surface-variant truncate mt-0.5">
                  Missing Emergency Contact &amp; Preferred Clinic
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
              <button
                type="button"
                onClick={() => navigate('/register/health')}
                className="text-xs text-primary hover:text-primary-container font-semibold inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors"
              >
                <span>Complete Profile</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </div>

          <div className="w-full bg-surface-container-highest rounded-full h-1 overflow-hidden mt-2.5">
            <div className="bg-primary h-1 rounded-full transition-all duration-500" style={{ width: '75%' }}></div>
          </div>
        </section>

        {/* Welcome Greeting & Active Profile Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div
              className={`w-11 h-11 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl ${activeProfile.avatarBg} ${activeProfile.avatarColor} flex items-center justify-center text-sm sm:text-lg font-bold shadow-sm shrink-0`}
            >
              {activeProfile.initials}
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h1 className="text-sm sm:text-base md:text-lg text-on-surface font-bold tracking-tight truncate">
                  Good morning, {activeProfile.shortName}
                </h1>
                <span className="text-base sm:text-lg select-none">👋</span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-semibold">
                  <Icon name="check_circle" filled className="text-[11px]" />
                  <span>{activeProfile.role}</span>
                </span>
                <span className="text-[11px] text-on-surface-variant font-mono">
                  • {activeProfile.lifecode}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-center">
            <NavLink
              to="/patient-dashboard/guardian"
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-medium flex items-center gap-1 shadow-xs transition-colors"
            >
              <Icon name="manage_accounts" className="text-[16px] sm:text-[18px] text-primary" />
              <span>Switch</span>
            </NavLink>
            <button
              type="button"
              onClick={() => setQrModalOpen(true)}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold flex items-center gap-1 shadow-sm active:scale-95 transition-all"
            >
              <Icon name="qr_code_scanner" className="text-[16px] sm:text-[18px]" />
              <span>View Pass</span>
            </button>
          </div>
        </section>

        {/* Responsive Multi-Column Grid Layout: Main Rail & Sidebar Rail */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          {/* Main Primary Rail (8 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-4 sm:space-y-6">
            {/* Patient ID / Lifecode Hero Card — Compact, no inline QR */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-4 sm:p-5 shadow-md">
              {/* Dental Wave SVG Watermark */}
              <div className="absolute -right-8 -bottom-10 opacity-15 pointer-events-none w-48 h-48 text-on-primary">
                <svg fill="currentColor" viewBox="0 0 200 200">
                  <path d="M40 70C20 90 20 120 40 145C60 170 80 185 100 185C120 185 140 170 160 145C180 120 180 90 160 70C150 60 135 55 120 65C105 75 95 75 80 65C65 55 50 60 40 70Z"></path>
                </svg>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <div>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-on-primary/15 text-on-primary text-[10px] font-medium tracking-wide uppercase backdrop-blur-xs">
                    Digital Clinic Token
                  </span>
                  <p className="text-base sm:text-lg font-bold mt-1.5 text-on-primary tracking-tight">
                    {activeProfile.name}
                  </p>
                  <p className="text-[11px] text-primary-fixed tracking-wider mt-0.5 font-semibold font-mono">
                    {activeProfile.lifecode}
                  </p>
                </div>

                <p className="text-[11px] sm:text-xs text-on-primary/90 leading-relaxed max-w-xl">
                  Scan for express touchless check-in at all DHA kiosks, hospital wings, and partner dental facilities across the Nigeria.
                </p>

                <div className="flex items-center gap-2 pt-0.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setQrModalOpen(true)}
                    className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-surface-container-lowest text-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm hover:bg-surface-container-low active:scale-95 transition-all"
                  >
                    <Icon name="qr_code_scanner" className="text-[16px] sm:text-[18px]" />
                    <span>View Pass</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => alert(`Shared Lifecode pass for ${activeProfile.name}`)}
                    className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-on-primary/15 hover:bg-on-primary/25 text-on-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 active:scale-95 transition-all"
                  >
                    <Icon name="ios_share" className="text-[16px] sm:text-[18px]" />
                    <span>Share Pass</span>
                  </button>
                  <NavLink
                    to="/patient-dashboard/quick-actions"
                    className="min-h-[36px] sm:min-h-[40px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-on-primary/10 hover:bg-on-primary/20 text-on-primary text-xs sm:text-sm font-medium flex items-center justify-center gap-1 transition-colors ml-auto"
                  >
                    <span>Manage</span>
                    <Icon name="arrow_forward" className="text-[14px] sm:text-[16px]" />
                  </NavLink>
                </div>
              </div>
            </section>

            {/* Oral Health Clinical Diagnostic Status Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                    Clinical Diagnostic Status
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-sm font-bold shadow-2xs">
                      Good
                    </span>
                    <span className="text-[11px] sm:text-xs text-on-surface-variant font-medium">
                      Physiologically stable, verified baseline
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
                    <Icon name="verified" className="text-[12px]" />
                    <span>Verified</span>
                  </span>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Dec 12, 2024</p>
                </div>
              </div>

              {/* Attending Doctor Strip */}
              <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 flex items-center justify-between text-on-surface">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-[10px] sm:text-xs shrink-0 shadow-2xs">
                    FA
                  </div>
                  <div className="truncate">
                    <p className="text-xs sm:text-sm font-semibold text-on-surface truncate">
                      Dr. Chinedu Okafor
                    </p>
                    <p className="text-[10px] sm:text-xs text-on-surface-variant truncate">
                      Consultant Periodontist • DHA #D-3309
                    </p>
                  </div>
                </div>
                <Icon name="check_circle" filled className="text-secondary text-[22px] shrink-0" />
              </div>

              {/* 3 Metrics Row */}
              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 border border-outline-variant/20">
                  <p className="text-sm sm:text-base font-bold text-secondary">0</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Active Cavities</p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 border border-outline-variant/20">
                  <p className="text-sm sm:text-base font-bold text-primary">Mild</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Plaque Index</p>
                </div>
                <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 border border-outline-variant/20">
                  <p className="text-sm sm:text-base font-bold text-tertiary">4 Mo</p>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">Next Recall</p>
                </div>
              </div>

              <div className="pt-1.5 flex items-center justify-between border-t border-outline-variant/20">
                <NavLink
                  to="/patient-dashboard/oral-health"
                  className="inline-flex items-center gap-1 text-xs text-primary font-semibold hover:text-primary-container transition-colors"
                >
                  <span>Full 32-Tooth Odontogram</span>
                  <Icon name="arrow_forward" className="text-[16px]" />
                </NavLink>
                <span className="text-[10px] text-on-surface-variant hidden sm:inline">
                  FDI &amp; Universal Notation
                </span>
              </div>
            </section>

            {/* Dental Records & Screening History Preview */}
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm sm:text-base text-on-surface font-semibold">
                    Records &amp; Screenings
                  </h2>
                  <p className="text-[10px] sm:text-xs text-on-surface-variant">
                    Diagnostic imaging and encrypted vault documents
                  </p>
                </div>
                <NavLink
                  to="/patient-dashboard/oral-health"
                  className="text-[10px] sm:text-xs text-primary font-semibold hover:underline"
                >
                  View All (3)
                </NavLink>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {/* Item 1 */}
                <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                      <Icon name="radiology" className="text-[16px] sm:text-[20px]" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold text-secondary bg-secondary-container/40 px-1.5 py-0.5 rounded-full hidden sm:inline">
                      DICOM
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-sm font-semibold text-on-surface truncate">
                      Panoramic X-Ray
                    </p>
                    <p className="text-[9px] sm:text-xs text-on-surface-variant mt-0.5 truncate">
                      Dec 2024
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-secondary-container flex items-center justify-center text-secondary">
                      <Icon name="dentistry" className="text-[16px] sm:text-[20px]" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold text-primary bg-primary-fixed/40 px-1.5 py-0.5 rounded-full hidden sm:inline">
                      Interactive
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-sm font-semibold text-on-surface truncate">
                      32-Tooth Chart
                    </p>
                    <p className="text-[9px] sm:text-xs text-on-surface-variant mt-0.5 truncate">
                      Digital Arch
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="bg-surface-container-lowest rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-sm border border-outline-variant/20 flex flex-col justify-between hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                      <Icon name="cleaning_services" className="text-[16px] sm:text-[20px]" />
                    </div>
                    <span className="text-[8px] sm:text-[10px] uppercase font-bold text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded-full hidden sm:inline">
                      Logged
                    </span>
                  </div>
                  <div>
                    <p className="text-[11px] sm:text-sm font-semibold text-on-surface truncate">
                      Hygiene Recall
                    </p>
                    <p className="text-[9px] sm:text-xs text-on-surface-variant mt-0.5 truncate">
                      Scaling &amp; Polish
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Upcoming Appointment Card */}
            <section className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Icon name="event_upcoming" className="text-primary text-[18px] sm:text-[22px]" />
                  <h2 className="text-sm sm:text-base text-on-surface font-semibold">
                    Upcoming Appointment
                  </h2>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] text-secondary font-semibold bg-secondary-container px-2 py-0.5 rounded-full">
                  Confirmed
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-start gap-3">
                <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl sm:rounded-2xl bg-primary-fixed flex flex-col items-center justify-center text-primary shrink-0 shadow-2xs">
                  <span className="text-[9px] sm:text-[11px] font-bold uppercase leading-none">{appointmentMonth}</span>
                  <span className="text-base sm:text-lg font-bold leading-tight mt-0.5">{appointmentDay}</span>
                  <span className="text-[8px] sm:text-[10px] text-on-primary-fixed-variant leading-none">{appointmentWeekday}</span>
                </div>

                <div className="min-w-0 flex-1 space-y-0.5">
                  <p className="text-xs sm:text-sm font-bold text-on-surface">
                    {appointmentTitle}
                  </p>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant flex items-center gap-1">
                    <Icon name="schedule" className="text-[14px] text-primary" />
                    <span>10:30 AM (45 min)</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-on-surface-variant flex items-center gap-1">
                    <Icon name="location_on" className="text-[14px] text-secondary" />
                    <span>Dr. Chinedu Okafor • Lagos Island Dental Centre, Lagos</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    setCalendarAdded(false);
                    setCalendarOpen(true);
                  }}
                  className="flex-1 min-h-[38px] sm:min-h-[42px] px-3 py-1.5 rounded-lg sm:rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-all"
                >
                  <Icon name="calendar_add_on" className="text-[16px]" />
                  <span>Add to Calendar</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Opening reschedule consultation modal...')}
                  className="min-h-[38px] sm:min-h-[42px] px-4 py-1.5 rounded-lg sm:rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs sm:text-sm font-semibold active:scale-95 transition-all"
                >
                  Reschedule
                </button>
              </div>
            </section>
          </div>

          {/* Sidebar Rail (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-4 sm:space-y-6">
            {/* Quick Actions Shortcuts (Responsive 3x2 Grid) */}
            <section className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-5 shadow-sm border border-outline-variant/30 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xs sm:text-sm text-on-surface font-semibold">
                  Quick Shortcuts
                </h2>
                <NavLink
                  to="/patient-dashboard/quick-actions"
                  className="text-[10px] sm:text-xs text-primary font-semibold hover:underline"
                >
                  All Hub
                </NavLink>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary mb-1 shadow-xs">
                    <Icon name="badge" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    My Lifecode
                  </span>
                </button>

                <NavLink
                  to="/patient-dashboard/oral-health"
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary-container flex items-center justify-center text-secondary mb-1 shadow-xs">
                    <Icon name="folder_shared" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    My Records
                  </span>
                </NavLink>

                <NavLink
                  to="/patient-dashboard/discovery"
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-tertiary-fixed flex items-center justify-center text-tertiary mb-1 shadow-xs">
                    <Icon name="person_search" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    Find Dentist
                  </span>
                </NavLink>

                <NavLink
                  to="/patient-dashboard/quick-actions"
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary mb-1 shadow-xs">
                    <Icon name="event_repeat" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    Follow-ups
                  </span>
                </NavLink>

                <NavLink
                  to="/register/health"
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-container mb-1 shadow-xs">
                    <Icon name="vital_signs" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    Health Info
                  </span>
                </NavLink>

                <NavLink
                  to="/patient-dashboard/quick-actions"
                  className="flex flex-col items-center text-center p-2 sm:p-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container hover:scale-[1.02] transition-all"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-surface-variant flex items-center justify-center text-primary mb-1 shadow-xs">
                    <Icon name="share_location" className="text-[18px] sm:text-[20px]" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] text-on-surface font-semibold leading-tight">
                    Share Pass
                  </span>
                </NavLink>
              </div>
            </section>

            {/* Hygiene Reminders (Interactive Toggles connected to state) */}
            <section className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-5 shadow-sm border border-outline-variant/30 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs sm:text-sm text-on-surface font-semibold">
                    Hygiene Reminders
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant">
                    Preventive habits synchronized to DHA
                  </p>
                </div>
                <span className="text-[9px] sm:text-[10px] text-secondary bg-secondary-container/40 px-2 py-0.5 rounded-full font-semibold">
                  Active Sync
                </span>
              </div>

              <div className="space-y-2 pt-0.5">
                {/* Reminder 1: Flossing */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-secondary shrink-0 shadow-2xs">
                      <Icon name="water_drop" className="text-[16px]" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-on-surface truncate">
                        Interdental Flossing
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        Daily at 8:30 PM • Night Routine
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFlossingReminder}
                    className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors shrink-0 ml-2 ${
                      flossingReminder ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                    aria-label="Toggle Interdental Flossing reminder"
                  >
                    <span
                      className={`block w-4.5 h-4.5 bg-on-primary rounded-full transition-transform ${
                        flossingReminder ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Reminder 2: Morning Fluoride */}
                <div className="flex items-center justify-between p-2 rounded-xl bg-surface-container-low/60 hover:bg-surface-container-low transition-colors">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-2xs">
                      <Icon name="wb_sunny" className="text-[16px]" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-semibold text-on-surface truncate">
                        Morning Fluoride Rinse
                      </p>
                      <p className="text-[10px] text-on-surface-variant">
                        Daily at 8:00 AM • High Retention
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={toggleFluorideReminder}
                    className={`w-10 h-5.5 rounded-full relative p-0.5 transition-colors shrink-0 ml-2 ${
                      fluorideReminder ? 'bg-primary' : 'bg-outline-variant'
                    }`}
                    aria-label="Toggle Morning Fluoride Rinse reminder"
                  >
                    <span
                      className={`block w-4.5 h-4.5 bg-on-primary rounded-full transition-transform ${
                        fluorideReminder ? 'translate-x-4.5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </section>

            {/* Nearby DHA Accredited Clinics & Dentists */}
            <section className="bg-surface-container-lowest rounded-2xl p-3.5 sm:p-5 shadow-sm border border-outline-variant/30 space-y-2.5 sm:space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xs sm:text-sm text-on-surface font-semibold">
                    Nearby Clinics
                  </h2>
                  <p className="text-[10px] sm:text-[11px] text-on-surface-variant">
                    Accredited network in Lagos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Filter clinics by specialty, neighborhood, or insurance network.')}
                  className="w-7 h-7 rounded-lg bg-surface-container-low flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                  aria-label="Filter clinics"
                >
                  <Icon name="filter_list" className="text-[16px]" />
                </button>
              </div>

              {/* Clinic 1 */}
              <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 space-y-1.5 border border-outline-variant/20">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                        Lagos Smile Dental Centre
                      </h3>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[9px] font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant mt-0.5">
                      Ikeja, Lagos • 1.2 km away
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-surface-container-lowest px-1.5 py-0.5 rounded-lg shrink-0 shadow-2xs">
                    <Icon name="star" filled className="text-amber-500 text-[12px]" />
                    <span className="text-[10px] font-bold text-on-surface">4.9</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] sm:text-[11px] text-secondary font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span> Open until 9:00 PM
                  </span>
                  <button
                    type="button"
                    onClick={() => handleBooking('Lagos Smile Dental Centre')}
                    className="px-2.5 py-1 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-semibold active:scale-95 transition-all shadow-xs"
                  >
                    Book Visit
                  </button>
                </div>
              </div>

              {/* Clinic 2 */}
              <div className="bg-surface-container-low rounded-xl p-2.5 sm:p-3 space-y-1.5 border border-outline-variant/20">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-bold text-on-surface truncate">
                        Lagos Smile Pediatric &amp; Family
                      </h3>
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-secondary-container text-on-secondary-container text-[9px] font-bold">
                        VERIFIED
                      </span>
                    </div>
                    <p className="text-[10px] sm:text-[11px] text-on-surface-variant mt-0.5">
                      Surulere 2, Lagos • 2.8 km away
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 bg-surface-container-lowest px-1.5 py-0.5 rounded-lg shrink-0 shadow-2xs">
                    <Icon name="star" filled className="text-amber-500 text-[12px]" />
                    <span className="text-[10px] font-bold text-on-surface">4.8</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] sm:text-[11px] text-on-surface-variant flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-outline"></span> Closes 8:00 PM
                  </span>
                  <button
                    type="button"
                    onClick={() => alert('Viewing Lagos Smile Pediatric & Family facilities')}
                    className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-primary text-xs font-semibold active:scale-95 transition-all"
                  >
                    Details
                  </button>
                </div>
              </div>
            </section>

            {/* Oral Health Education Preview */}
            <NavLink
              to="/patient-dashboard/education"
              className="bg-surface-container-lowest rounded-2xl p-3 sm:p-4 shadow-sm border border-outline-variant/30 flex items-center gap-3 hover:shadow-md transition-shadow block"
            >
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSHrZPUZTEkWc9c2HdyI0dizYprxNqAvrD8HVZrGEVCUQjYqMpM2mWzBNKb-e2QcmLDrFyFn_N_i00cTXLRG2DbT5cE-19oEFj2vg3Uj50D1gXRoCMBnSUCiCxpA8hP73h4Ocea4qRwjyOvyKfaGQz7gencDOke2BMNRwPek9FfOvmfgwuX479IDutGteM3BHnNN6-IPTCIYMINbO0zt5uqQqT8n7ArmdxyCHBpPI"
                alt="Enamel remineralization article thumbnail"
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0 bg-surface-container-high shadow-xs"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 text-secondary">
                  <Icon name="local_library" className="text-[13px]" />
                  <span className="text-[9px] font-semibold uppercase tracking-wider">
                    3 Min Read
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-on-surface line-clamp-2 mt-0.5 leading-snug">
                  Understanding Enamel Remineralization &amp; Fluoride
                </h3>
                <p className="text-[10px] text-on-surface-variant mt-0.5 truncate">
                  Validated by DHA Clinical Editorial Board
                </p>
              </div>
            </NavLink>
          </div>
        </div>
      </div>

      {calendarOpen && (
        <div
          className="fixed inset-0 z-[70] bg-scrim/50 flex items-center justify-center p-4"
          onClick={() => setCalendarOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="calendar-dialog-title"
            className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-5 sm:p-6 shadow-xl space-y-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="calendar-dialog-title" className="text-lg font-bold text-on-surface">Add appointment to calendar</h2>
                <p className="text-sm text-on-surface-variant mt-1">{appointmentTitle} at 10:30 AM</p>
              </div>
              <button
                type="button"
                onClick={() => setCalendarOpen(false)}
                aria-label="Close calendar options"
                className="w-9 h-9 rounded-lg hover:bg-surface-container flex items-center justify-center text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <label htmlFor="appointment-calendar-date" className="block text-sm font-semibold text-on-surface">
              Appointment date
            </label>
            <input
              id="appointment-calendar-date"
              type="date"
              min={getNextFriday()}
              value={appointmentDate}
              onChange={(event) => {
                setAppointmentDate(event.target.value);
                setCalendarAdded(false);
              }}
              className="w-full h-11 rounded-xl border border-outline-variant bg-surface px-3 text-sm text-on-surface"
            />

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full min-h-11 rounded-xl bg-primary text-on-primary text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary-container"
            >
              <Icon name="event" className="text-[18px]" />
              Open Google Calendar
            </a>
            <button
              type="button"
              onClick={addToDeviceCalendar}
              className="w-full min-h-11 rounded-xl bg-surface-container text-on-surface text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container-high"
            >
              <Icon name={calendarAdded ? 'check_circle' : 'download'} className="text-[18px]" />
              {calendarAdded ? 'Calendar file downloaded' : 'Download calendar file (.ics)'}
            </button>
            <p className="text-xs text-on-surface-variant">
              The calendar file can be opened with your device’s calendar app.
            </p>
          </section>
        </div>
      )}
    </DashboardShell>
  );
}

