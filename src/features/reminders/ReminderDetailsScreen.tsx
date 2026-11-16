import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

export function ReminderDetailsScreen() {
  const [pushAlert, setPushAlert] = useState(true);
  const [smsDigest, setSmsDigest] = useState(true);
  const [reconciliationModalOpen, setReconciliationModalOpen] = useState(false);
  const [externalClinicName, setExternalClinicName] = useState('');
  const [externalDate, setExternalDate] = useState('2025-01-28');
  const [isReconciled, setIsReconciled] = useState(false);
  const [flossStatus, setFlossStatus] = useState('Scheduled');
  const [flossTime, setFlossTime] = useState('09:30 PM');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSnoozeFloss = (duration: string) => {
    setFlossStatus(`Snoozed +${duration}`);
    showToast(`Evening Flossing snoozed for ${duration}.`);
  };

  const handleChangeFlossTime = () => {
    const times = ['09:00 PM', '09:30 PM', '10:00 PM', '10:30 PM'];
    const currIdx = times.indexOf(flossTime);
    const next = times[(currIdx + 1) % times.length];
    setFlossTime(next);
    showToast(`Evening routine time updated to ${next}.`);
  };

  const handleSubmitReconciliation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!externalClinicName.trim()) return;
    setIsReconciled(true);
    setReconciliationModalOpen(false);
    showToast(`External booking at "${externalClinicName}" submitted for clinical audit.`);
  };

  return (
    <DashboardShell pageTitle="Reminder Details" showBack>
      <RemindersSubNav />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="check_circle" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* External Reconciliation Modal */}
      {reconciliationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-2xl shadow-2xl p-6 flex flex-col gap-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
                  <Icon name="fact_check" className="text-[18px]" />
                </div>
                <h4 className="font-title-md text-title-md text-on-surface font-bold">
                  Mark Booked Outside DHA Network
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setReconciliationModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Provide external clinic proof or scheduled appointment reference. Your treating dentist will review the entry for clinical audit continuity.
            </p>

            <form onSubmit={handleSubmitReconciliation} className="space-y-4">
              <div className="space-y-1.5">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold block">
                  External Dental Facility Name
                </label>
                <input
                  type="text"
                  required
                  value={externalClinicName}
                  onChange={(e) => setExternalClinicName(e.target.value)}
                  placeholder="e.g. Lekki Phase 1 Dental Clinic"
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold block">
                  Appointment Date
                </label>
                <input
                  type="date"
                  required
                  value={externalDate}
                  onChange={(e) => setExternalDate(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setReconciliationModalOpen(false)}
                  className="flex-1 h-11 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm font-semibold transition-colors shadow-xs"
                >
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Breadcrumb & Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <NavLink
            to="/patient-dashboard/reminders"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors py-1 group font-label-md text-label-md font-semibold"
          >
            <Icon name="arrow_back" className="text-[20px] transition-transform group-hover:-translate-x-1" />
            <span>Back to Reminders</span>
          </NavLink>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm w-fit border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-semibold">DHA Verified Recall Directive</span>
          </div>
        </div>

        {/* Header Title */}
        <div>
          <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface font-bold tracking-tight">
            Reminder Details
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-0.5">
            Clinical provenance, timing schedule &amp; patient governance controls
          </p>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Primary Directive Hero Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 space-y-5">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm uppercase tracking-wide font-bold">
                      Pending Clinical Care
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm flex items-center gap-1.5 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
                      Active • Due Soon
                    </span>
                  </div>
                  <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-bold pt-1">
                    Preventive Pit &amp; Fissure Sealant Follow-up
                  </h2>
                </div>
                <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center shrink-0 text-primary shadow-2xs">
                  <Icon name="verified_user" className="text-[26px]" />
                </div>
              </div>

              {/* Patient and Target */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="bg-surface-container-low p-4 rounded-xl space-y-1 border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-1.5 font-semibold">
                    <Icon name="person" className="text-[16px] text-primary" /> Patient Account
                  </span>
                  <p className="font-title-md text-title-md text-on-surface font-bold">
                    Ngozi Eze
                  </p>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    Primary Adult Account • File #DHA-789-2041
                  </span>
                </div>

                <div className="bg-surface-container-low p-4 rounded-xl space-y-1 border border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase flex items-center gap-1.5 font-semibold">
                    <Icon name="dentistry" className="text-[16px] text-secondary" /> Target Anatomy
                  </span>
                  <p className="font-title-md text-title-md text-on-surface font-bold">
                    Tooth #36
                  </p>
                  <span className="font-body-sm text-body-sm text-on-surface-variant block">
                    Lower Left Molar (Deep Occlusal Fissure)
                  </span>
                </div>
              </div>

              {/* Window Closure Banner */}
              <div className="bg-surface-container-high/60 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-surface-container-lowest flex items-center justify-center shrink-0 text-primary shadow-2xs">
                    <Icon name="calendar_clock" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      Recall Window Closure
                    </div>
                    <div className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                      Ends Feb 12, 2025 (18 Days Left)
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-bold shrink-0 self-start sm:self-auto">
                  Action Needed
                </span>
              </div>
            </div>

            {/* Clinical Source & Provenance Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="stethoscope" className="text-primary text-[22px]" />
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    Clinical Source &amp; Provenance
                  </h3>
                </div>
                <span className="px-3 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-2xs">
                  <Icon name="check_circle" className="text-[13px]" /> Verified
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 space-y-3 border border-outline-variant/20">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-[13px] shadow-2xs">
                      FA
                    </div>
                    <div>
                      <p className="font-title-sm text-title-sm text-on-surface font-bold leading-tight">
                        Dr. Chinedu Okafor
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Senior Practitioner • Lagos Smile Dental Centre
                      </p>
                    </div>
                  </div>
                  <span className="font-label-code text-label-code text-on-surface-variant bg-surface-container-highest px-2 py-1 rounded font-semibold">
                    DHA Lic #8841-A
                  </span>
                </div>

                <div className="pt-1">
                  <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide font-semibold">
                    Originating Encounter
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface font-medium">
                    Comprehensive Dental Examination • Dec 12, 2024
                  </p>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-3.5 space-y-1 border border-outline-variant/20">
                  <div className="flex items-center gap-1.5 text-primary">
                    <Icon name="clinical_notes" className="text-[16px]" />
                    <span className="font-label-sm text-label-sm uppercase font-bold">
                      Dentist Directive
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface italic leading-relaxed">
                    “Re-evaluate deep pit staining in occlusal fissure within 30–60 days; apply resin sealant if remineralization is incomplete.”
                  </p>
                </div>

                <NavLink
                  to="/patient-dashboard/records/examinations"
                  className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-title-sm text-title-sm font-semibold group pt-1"
                >
                  <span>Open Related Examination Record (#EX-2024-9182)</span>
                  <Icon name="arrow_forward" className="text-[16px] transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </div>

            {/* Schedule & Notification Protocol Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Icon name="event_repeat" className="text-primary text-[22px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Schedule &amp; Notification Protocol
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <Icon name="timelapse" className="text-on-surface-variant text-[20px]" />
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Recall Window
                    </span>
                  </div>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    Jan 12 – Feb 12, 2025
                  </span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-surface-container-low rounded-xl border border-outline-variant/20">
                  <div className="flex items-center gap-2.5">
                    <Icon name="autorenew" className="text-on-surface-variant text-[20px]" />
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      Frequency Pattern
                    </span>
                  </div>
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    One-time clinical directive
                  </span>
                </div>

                {/* Delivery Channels */}
                <div className="p-4 bg-surface-container-low rounded-xl space-y-3 border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <Icon name="cell_tower" className="text-on-surface-variant text-[20px]" />
                      <span className="font-body-md text-body-md text-on-surface font-bold">
                        Delivery Channels
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">
                      Multi-channel Sync
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl cursor-pointer select-none border border-outline-variant/20 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={pushAlert}
                        onChange={(e) => {
                          setPushAlert(e.target.checked);
                          showToast(e.target.checked ? 'Push alerts enabled' : 'Push alerts disabled');
                        }}
                        className="w-4 h-4 rounded text-primary focus:ring-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          Push Alert
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Immediate mobile notice
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-xl cursor-pointer select-none border border-outline-variant/20 shadow-2xs">
                      <input
                        type="checkbox"
                        checked={smsDigest}
                        onChange={(e) => {
                          setSmsDigest(e.target.checked);
                          showToast(e.target.checked ? 'SMS alerts enabled' : 'SMS alerts disabled');
                        }}
                        className="w-4 h-4 rounded text-primary focus:ring-0"
                      />
                      <div className="flex flex-col">
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                          SMS Digest
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          +234 803 *** 8192
                        </span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Clinical Integrity & Patient Governance Action Card */}
            <div className="bg-surface-container rounded-2xl p-5 sm:p-6 space-y-4 border border-outline-variant/30 shadow-xs">
              <div className="flex items-start gap-3">
                <Icon name="gavel" className="text-primary text-[24px] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-title-sm text-title-sm text-on-surface font-bold">
                    Clinical Integrity &amp; Patient Governance
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Clinical due dates are legally anchored to your dentist's prescription and cannot be altered by changing notification preferences. You can adjust alert channels, but clinical recall timings remain set by your clinician.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <NavLink
                  to="/patient-dashboard/quick-actions"
                  className="w-full h-12 bg-primary text-on-primary rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container transition-colors active:scale-[0.99]"
                >
                  <Icon name="add_circle" className="text-[20px]" />
                  <span>Book at Al Zahra Hub</span>
                </NavLink>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => showToast('Opening direct inquiry channel with Dr. Farouk...')}
                    className="w-full h-11 bg-surface-container-lowest text-on-surface rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs hover:bg-surface-container-high transition-colors"
                  >
                    <Icon name="chat" className="text-[18px] text-primary" />
                    <span className="truncate">Ask Clinician</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setReconciliationModalOpen(true)}
                    className={`w-full h-11 rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors ${
                      isReconciled
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <Icon name="fact_check" className="text-[18px] text-secondary" />
                    <span className="truncate">
                      {isReconciled ? 'Reconciled' : 'External Booking'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Contrasting User-Controlled Flexible Habit Card */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Icon name="format_paint" className="text-secondary text-[22px]" />
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Personal Daily Habit
                    </h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      Contrasting Flexible Self-Care
                    </span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  User Managed
                </span>
              </div>

              <div className="bg-surface-container-low rounded-xl p-4 space-y-3 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xs">
                      <Icon name="cleaning_services" className="text-[20px]" />
                    </div>
                    <div>
                      <p className="font-title-sm text-title-sm text-on-surface font-bold">
                        Evening Interdental Flossing
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Daily routine target • {flossTime}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-surface-container-highest text-on-surface font-label-sm text-label-sm font-bold">
                    {flossStatus}
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Unlike verified clinical directives, personal self-care habits can be rescheduled or snoozed on demand anytime to fit your lifestyle.
                </p>

                <div className="pt-1 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => handleSnoozeFloss('15m')}
                    className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <Icon name="snooze" className="text-[16px] text-secondary" />
                    <span>Snooze 15m</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSnoozeFloss('1h')}
                    className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <Icon name="snooze" className="text-[16px] text-secondary" />
                    <span>Snooze 1h</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleChangeFlossTime}
                    className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary font-label-md text-label-md hover:bg-surface-container-high transition-colors flex items-center gap-1 shadow-2xs font-semibold"
                  >
                    <Icon name="schedule" className="text-[16px]" />
                    <span>Change Time ({flossTime})</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

