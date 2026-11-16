import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

type FilterType = 'all' | 'confirmed' | 'history';

export function AppointmentRemindersScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('confirmed');
  const [calendarSynced, setCalendarSynced] = useState(false);
  const [rescheduleModalOpen, setRescheduleModalOpen] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCalendarSync = () => {
    setCalendarSynced(true);
    showToast('Event synchronized with Apple / Google Calendar.');
    setTimeout(() => setCalendarSynced(false), 3500);
  };

  const handleRescheduleSubmit = () => {
    if (!selectedSlot) return;
    setRescheduleSuccess(true);
    setTimeout(() => {
      setRescheduleSuccess(false);
      setRescheduleModalOpen(false);
      setSelectedSlot(null);
      showToast(`Appointment rescheduled to ${selectedSlot}. Confirmation SMS sent.`);
    }, 1200);
  };

  return (
    <DashboardShell pageTitle="Appointment Reminders">
      <RemindersSubNav />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="check_circle" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Reschedule Dialog Modal */}
      {rescheduleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-surface-container-lowest rounded-t-2xl sm:rounded-2xl p-6 flex flex-col gap-4 shadow-2xl animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
                  <Icon name="pending_actions" className="text-[20px]" />
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Reschedule Visit
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRescheduleModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>

            {rescheduleSuccess ? (
              <div className="p-6 text-center flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-secondary-container text-secondary flex items-center justify-center">
                  <Icon name="check_circle" className="text-[28px]" />
                </div>
                <span className="font-headline-sm text-headline-sm text-on-surface">Time Slot Confirmed</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your appointment has been modified with zero penalty under DHA 24h Policy.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1 text-on-surface-variant font-body-sm text-body-sm">
                  <p>
                    You are requesting a time modification for{' '}
                    <strong className="text-on-surface">Enamel Fluoride Touchup &amp; Prophylaxis</strong> with Dr. Chinedu Okafor at Lagos Smile Dental Centre.
                  </p>
                  <div className="bg-secondary-container/30 p-3 rounded-xl text-on-secondary-container mt-1 border border-secondary/20">
                    <span className="font-label-sm text-label-sm font-bold block mb-0.5">DHA Booking Policy</span>
                    Appointments rescheduled with at least 24 hours notice carry zero priority penalty and preserve your allocated clinic room.
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-label-md text-label-md text-on-surface font-semibold">
                    Select Available Clinic Slot
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Sat, Jan 25 • 11:30 AM',
                      'Mon, Jan 27 • 09:00 AM',
                      'Tue, Jan 28 • 02:30 PM',
                      'Wed, Jan 29 • 04:00 PM',
                    ].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-2.5 rounded-xl text-left border text-body-sm transition-all ${
                          selectedSlot === slot
                            ? 'bg-primary-fixed border-primary text-on-primary-fixed font-semibold ring-2 ring-primary/40'
                            : 'bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <button
                    type="button"
                    disabled={!selectedSlot}
                    onClick={handleRescheduleSubmit}
                    className="w-full h-11 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center shadow-xs hover:bg-primary-container disabled:opacity-50 transition-all"
                  >
                    Confirm New Time Slot
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      showToast('Cancellation request submitted to DHA Care Coordinator.');
                      setRescheduleModalOpen(false);
                    }}
                    className="w-full h-10 rounded-xl text-error font-title-sm text-title-sm font-medium flex items-center justify-center hover:bg-error-container/30 transition-colors"
                  >
                    Cancel Appointment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Intro Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-2xs">
                <Icon name="calendar_clock" filled className="text-[20px]" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  DHA Care Portal
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Live Sync</span>
              </div>
            </div>
            <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface tracking-tight mt-0.5">
              Appointment Reminders
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Confirmed clinical visits, clinic digital entry passes &amp; verified pre-treatment instructions for Ngozi Eze.
            </p>
          </div>

          {/* Quick Actions / Emergency Button */}
          <div className="flex items-center gap-2 shrink-0">
            <NavLink
              to="/patient-dashboard/quick-actions"
              className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm flex items-center gap-1.5 transition-colors"
            >
              <Icon name="hub" className="text-[18px] text-primary" />
              <span>All Services</span>
            </NavLink>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 bg-surface-container p-1 rounded-2xl w-fit shadow-inner">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${
              activeFilter === 'all'
                ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            All <span className="font-label-sm text-label-sm opacity-80">(3)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('confirmed')}
            className={`px-4 py-1.5 rounded-xl font-label-md text-label-md transition-all flex items-center gap-1.5 ${
              activeFilter === 'confirmed'
                ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
            Confirmed <span className="font-label-sm text-label-sm text-primary opacity-90">(2)</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('history')}
            className={`px-3.5 py-1.5 rounded-xl font-label-md text-label-md transition-all ${
              activeFilter === 'history'
                ? 'bg-surface-container-lowest text-primary shadow-xs font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Past &amp; History <span className="font-label-sm text-label-sm opacity-80">(1)</span>
          </button>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Appointments Feed (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* CARD 1: Confirmed Primary Prophylaxis Appointment */}
            {(activeFilter === 'all' || activeFilter === 'confirmed') && (
              <div className="appointment-card confirmed flex flex-col rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 overflow-hidden transition-all">
                {/* Hero Gradient Header */}
                <div className="bg-gradient-to-r from-primary-container to-primary p-5 sm:p-6 text-on-primary relative overflow-hidden">
                  <div className="absolute -right-4 -top-8 w-36 h-36 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold tracking-wider inline-flex items-center gap-1 shadow-2xs">
                          <Icon name="verified" filled className="text-[13px]" />
                          CONFIRMED • APT-2025-8841
                        </span>
                      </div>
                      <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-primary font-bold tracking-tight">
                        Enamel Fluoride Touchup &amp; Prophylaxis
                      </h2>
                      <span className="font-body-sm text-body-sm text-tertiary-fixed font-medium mt-0.5">
                        Primary Care • Ngozi Eze
                      </span>
                    </div>

                    <div className="bg-white/15 backdrop-blur-md rounded-xl p-2.5 text-center shrink-0 min-w-[62px] shadow-sm border border-white/20">
                      <span className="block font-label-sm text-[10px] text-tertiary-fixed uppercase font-bold tracking-widest">
                        JAN
                      </span>
                      <span className="block font-headline-md text-headline-md font-bold text-on-primary leading-none my-0.5">
                        24
                      </span>
                      <span className="block font-label-sm text-[10px] text-tertiary-fixed font-medium">
                        FRI
                      </span>
                    </div>
                  </div>

                  {/* Time Badge */}
                  <div className="mt-4 pt-2 bg-black/15 rounded-xl p-3 flex items-center justify-between gap-2 relative z-10 border border-white/10">
                    <div className="flex items-center gap-2">
                      <Icon name="schedule" className="text-secondary-fixed text-[20px]" />
                      <span className="font-title-sm text-title-sm font-semibold">10:30 AM (45 min)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                      <span className="font-label-sm text-label-sm text-secondary-fixed font-medium">
                        In 4 days
                      </span>
                    </div>
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 sm:p-6 flex flex-col gap-4 bg-surface-container-lowest">
                  {/* Doctor Info */}
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-2xs">
                      <Icon name="stethoscope" className="text-[22px]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-title-md text-title-md text-on-surface font-bold">
                          Dr. Chinedu Okafor
                        </span>
                        <span className="px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
                          DHA Lic #48912
                        </span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Senior Endodontist &amp; General Dental Practitioner
                      </span>
                    </div>
                  </div>

                  {/* Location Card */}
                  <div className="rounded-xl bg-surface-container-low p-4 flex flex-col gap-1 border border-outline-variant/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <Icon name="location_on" className="text-primary text-[20px]" />
                        <span className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                          Lagos Smile Dental Centre
                        </span>
                      </div>
                      <span className="font-label-sm text-[10px] uppercase font-bold text-on-secondary-container bg-secondary-container px-2 py-0.5 rounded-md">
                        Ikeja
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant pl-7">
                      Suite #402, 4th Floor, Ikeja Medical Zone, Nigeria Dental Healthcare District
                    </p>
                  </div>

                  {/* Pre-Op Instructions */}
                  <div className="rounded-xl bg-surface-container-low p-4 flex items-start gap-3 border border-outline-variant/20">
                    <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container mt-0.5 shadow-2xs">
                      <Icon name="info" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-title-sm text-title-sm text-on-surface font-bold">
                        Pre-Op &amp; Clinical Instructions
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-0.5">
                        Arrive 10 minutes early for digital kiosk check-in. Avoid hot beverages 30 minutes prior to fluoride varnish application.
                      </p>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-2.5 pt-1">
                    <NavLink
                      to="/patient-dashboard/quick-actions"
                      className="w-full h-12 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container active:scale-[0.99] transition-transform"
                    >
                      <Icon name="qr_code_scanner" className="text-[20px]" />
                      <span>Get Clinic Directions &amp; Kiosk Pass</span>
                    </NavLink>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={handleCalendarSync}
                        className={`h-11 rounded-xl font-title-sm text-title-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                          calendarSynced
                            ? 'bg-secondary-container text-on-secondary-container'
                            : 'bg-surface-container text-primary hover:bg-surface-container-high'
                        }`}
                      >
                        <Icon name={calendarSynced ? 'check_circle' : 'event'} className="text-[18px]" />
                        <span>{calendarSynced ? 'Synced to Calendar' : 'Add to Calendar'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setRescheduleModalOpen(true)}
                        className="h-11 rounded-xl bg-surface-container-low text-on-surface-variant font-title-sm text-title-sm font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-surface-container"
                      >
                        <Icon name="edit_calendar" className="text-[18px]" />
                        <span>Reschedule</span>
                      </button>
                    </div>
                  </div>

                  {/* 24h Policy Notice */}
                  <div className="bg-surface-container-low/60 rounded-xl p-3 flex items-center justify-between text-on-surface-variant border border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <Icon name="lock_clock" className="text-[16px] text-outline" />
                      <span className="font-label-sm text-[11px]">
                        Free cancellation before Jan 23, 10:30 AM (24h policy)
                      </span>
                    </div>
                    <Icon name="arrow_forward" className="text-[15px]" />
                  </div>
                </div>
              </div>
            )}

            {/* CARD 2: Confirmed Child Dependent Appointment */}
            {(activeFilter === 'all' || activeFilter === 'confirmed') && (
              <div className="appointment-card confirmed flex flex-col rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold tracking-wider inline-flex items-center gap-1 shadow-2xs">
                          <Icon name="child_care" filled className="text-[13px]" />
                          CHILD DEPENDENT • TARIQ (AGE 6)
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">
                        Tariq's Pediatric Preventive Review &amp; Fluoride
                      </h3>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed shrink-0 shadow-2xs">
                      <Icon name="pediatrics" className="text-[22px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">
                        Scheduled Date
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-bold mt-0.5 flex items-center gap-1.5">
                        <Icon name="calendar_today" className="text-primary text-[16px]" />
                        Tue, Jan 28, 2025
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-[11px] text-on-surface-variant uppercase font-semibold">
                        Slot Time
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-bold mt-0.5 flex items-center gap-1.5">
                        <Icon name="schedule" className="text-primary text-[16px]" />
                        3:00 PM (30 min)
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 text-on-surface-variant font-body-sm text-body-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="person" className="text-[18px] text-primary" />
                      <span className="text-on-surface font-medium">Dr. Layla Haddad</span>
                      <span className="text-on-surface-variant">• Pedodontist Specialist</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="storefront" className="text-[18px] text-primary" />
                      <span className="truncate">Lagos Island Dental Centre, Ikeja City Mall Wing</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <NavLink
                      to="/patient-dashboard/guardian"
                      className="h-10 rounded-xl bg-surface-container-high text-primary font-title-sm text-title-sm font-semibold flex items-center justify-center gap-1.5 transition-colors hover:bg-surface-variant"
                    >
                      <Icon name="shield_person" className="text-[18px]" />
                      <span>Manage Visit</span>
                    </NavLink>
                    <button
                      type="button"
                      onClick={() => showToast('Opening Lagos Island Dental Centre route directions...')}
                      className="h-10 rounded-xl bg-surface-container text-on-surface font-title-sm text-title-sm font-medium flex items-center justify-center gap-1.5 transition-colors hover:bg-surface-container-high"
                    >
                      <Icon name="directions" className="text-[18px]" />
                      <span>Directions</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* CARD 3: Completed Archive Card */}
            {(activeFilter === 'all' || activeFilter === 'history') && (
              <div className="appointment-card history flex flex-col rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 overflow-hidden">
                <div className="p-5 sm:p-6 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-bold tracking-wider inline-flex items-center gap-1">
                          <Icon name="check_circle" className="text-[13px]" />
                          COMPLETED ARCHIVE
                        </span>
                        <span className="font-label-sm text-[11px] text-on-surface-variant">
                          Dec 12, 2024
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold leading-snug">
                        Comprehensive Dental Examination &amp; Routine Charting
                      </h3>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface-variant shrink-0">
                      <Icon name="assignment_turned_in" className="text-[18px]" />
                    </div>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Lagos Smile Dental Centre • Performed by Dr. Chinedu Okafor. Clean bill of health with composite restoration completed on tooth #16.
                  </p>

                  <div className="mt-1 flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/20">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-medium">
                      Digital records signed &amp; charted
                    </span>
                    <NavLink
                      to="/patient-dashboard/records/examinations"
                      className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-0.5 hover:underline"
                    >
                      <span>View Charting</span>
                      <Icon name="chevron_right" className="text-[14px]" />
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* 24/7 Dental Emergency Hotline */}
            <div className="rounded-2xl bg-surface-container-low p-5 flex flex-col gap-3.5 border border-outline-variant/20 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0 shadow-2xs">
                  <Icon name="health_and_safety" className="text-[24px]" />
                </div>
                <div>
                  <h3 className="font-title-sm text-title-sm text-on-surface font-bold">
                    Need Immediate Dental Assistance?
                  </h3>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    24/7 DHA Emergency Triage
                  </span>
                </div>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Acute toothache, trauma, or post-surgical bleeding? Connect with licensed Nigeria Dental Health triage specialists immediately.
              </p>
              <a
                href="tel:800342"
                className="w-full py-3 px-4 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container transition-all active:scale-95"
              >
                <Icon name="call" className="text-[18px]" />
                <span>Call 800-DHA (342)</span>
              </a>
            </div>

            {/* Quick Links to other Reminders */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <Icon name="alarm" className="text-primary text-[20px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Reminders Suite
                </h3>
              </div>
              <div className="space-y-2">
                <NavLink
                  to="/patient-dashboard/reminders"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="dashboard" className="text-primary text-[18px]" />
                    <span>Reminders Overview</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/reminders/daily-care"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="brush" className="text-secondary text-[18px]" />
                    <span>Daily Oral Care Habits</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/reminders/checkups"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="stethoscope" className="text-tertiary text-[18px]" />
                    <span>Dental Check-up Recalls</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/reminders/treatments"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="healing" className="text-primary text-[18px]" />
                    <span>Pending Treatments</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

