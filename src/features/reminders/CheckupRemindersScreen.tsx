import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

export function CheckupRemindersScreen() {
  const [activeProfileTab, setActiveProfileTab] = useState<'sarah' | 'tariq'>('sarah');
  const [bookingAlertSet, setBookingAlertSet] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSetBookingAlert = () => {
    setBookingAlertSet(true);
    showToast('Booking alert scheduled for March 28, 2025 (14 days before window opening).');
  };

  return (
    <DashboardShell pageTitle="Dental Check-up Reminders">
      <RemindersSubNav />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="check_circle" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Intro Banner */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-1 font-bold">
              <Icon name="verified" filled className="text-[13px]" />
              DHA Clinical Protocol
            </span>
            <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Up to date
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface tracking-tight mt-0.5">
            Dental Check-up Reminders
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Clinically verified examination recalls &amp; preventive scheduling customized to your individualized oral health risk.
          </p>
        </div>

        {/* Profile Switcher Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={() => setActiveProfileTab('sarah')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md transition-all shadow-xs shrink-0 ${
              activeProfileTab === 'sarah'
                ? 'bg-primary text-on-primary font-bold'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <Icon name="person" className="text-[18px]" />
            <span>Sarah (You)</span>
            <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span>
          </button>

          <button
            type="button"
            onClick={() => setActiveProfileTab('tariq')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md transition-all shrink-0 ${
              activeProfileTab === 'tariq'
                ? 'bg-primary text-on-primary font-bold shadow-xs'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <Icon name="child_care" className="text-[18px]" />
            <span>Tariq (Child)</span>
            <span className="px-2 py-0.2 rounded-full bg-surface-variant text-on-surface-variant font-label-sm text-[10px]">
              Confirmed Jan 28
            </span>
          </button>

          <NavLink
            to="/patient-dashboard/guardian"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-low text-primary font-label-md text-label-md shrink-0 hover:bg-surface-container"
          >
            <Icon name="add" className="text-[16px]" />
            <span>Manage Family</span>
          </NavLink>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Primary Clinical Status Card (Personal Recall) */}
            <div className="relative overflow-hidden rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 flex flex-col">
              {/* Visual Gradient Header Strip */}
              <div className="h-2.5 w-full bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
              <div className="p-5 sm:p-6 flex flex-col gap-5">
                {/* Status Badge & Origin Verification */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container w-fit shadow-2xs">
                      <Icon name="verified_user" filled className="text-[15px]" />
                      <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                        Clinician Directed (4-Month Interval)
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Non-generic risk assessment verified by licensed dentist
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-surface-container-low text-secondary font-label-sm text-label-sm font-bold border border-secondary/20">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span>On Track</span>
                  </div>
                </div>

                {/* Recall Window Display */}
                <div className="flex flex-col gap-1 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
                  <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Recommended Recall Window
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-headline-md sm:font-headline-lg text-headline-md sm:text-headline-lg text-on-surface font-bold">
                      April 12 – April 26, 2025
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-primary font-title-sm text-title-sm pt-1">
                    <Icon name="calendar_clock" className="text-[20px]" />
                    <span>Window opens in ~3 months (86 days)</span>
                  </div>
                </div>

                {/* Timeline Progress Gauge */}
                <div className="bg-surface-container-low p-4 sm:p-5 rounded-2xl flex flex-col gap-2.5 border border-outline-variant/20">
                  <div className="flex justify-between items-center font-label-sm text-label-sm text-on-surface-variant">
                    <span>Dec 12, 2024 (Last Visit)</span>
                    <span className="font-bold text-primary">Progress: 28%</span>
                    <span>Apr 12, 2025 (Target)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-surface-container-highest overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-secondary to-primary rounded-full transition-all duration-700"
                      style={{ width: '28%' }}
                    ></div>
                  </div>
                  <div className="flex items-start gap-2 font-body-sm text-body-sm text-on-surface-variant pt-1">
                    <Icon name="info" className="text-[17px] text-secondary shrink-0 mt-0.5" />
                    <span>
                      4-month interval prescribed to monitor Tooth #16 composite seal margin following restoration.
                    </span>
                  </div>
                </div>

                {/* Basis of Clinical Timing */}
                <div className="flex items-start gap-3 p-4 rounded-xl bg-surface-container border border-outline-variant/20">
                  <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5 text-primary shadow-2xs">
                    <Icon name="stethoscope" className="text-[20px]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-sm text-title-sm text-on-surface font-bold">
                      Dr. Chinedu Okafor
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Lagos Smile Dental Centre, Ikeja • License DHA-D-48912
                    </span>
                    <span className="font-label-code text-label-code text-on-surface-variant mt-0.5">
                      Clinical Evaluation Date: Dec 12, 2024
                    </span>
                  </div>
                </div>

                {/* Quick Action CTAs */}
                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <NavLink
                    to="/patient-dashboard/quick-actions"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm shadow-xs hover:bg-primary-container transition-colors active:scale-[0.99] font-semibold"
                  >
                    <Icon name="add_location_alt" className="text-[20px]" />
                    <span>Find Clinic &amp; Schedule Check-up</span>
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleSetBookingAlert}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-title-sm text-title-sm transition-colors active:scale-[0.99] font-semibold ${
                      bookingAlertSet
                        ? 'bg-secondary-container text-on-secondary-container'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    <Icon name={bookingAlertSet ? 'check' : 'notifications_active'} className="text-[20px]" />
                    <span>{bookingAlertSet ? 'Alert Set for March 28!' : 'Set Booking Alert'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Secondary Scenario: Dependent Child Card (Active Pediatric Appointment) */}
            <div className="rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 overflow-hidden flex flex-col">
              <div className="p-5 bg-secondary-container/30 flex items-center justify-between border-b border-secondary/20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shadow-2xs">
                    <Icon name="child_care" filled className="text-[20px]" />
                  </div>
                  <div>
                    <h2 className="font-title-md text-title-md text-on-surface font-bold">
                      Tariq Okoye
                    </h2>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Age 6 • Pediatric Preventive Recall
                    </span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-2xs">
                  <Icon name="check_circle" className="text-[13px]" />
                  Confirmed
                </span>
              </div>

              <div className="p-5 sm:p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low border border-outline-variant/20">
                  <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary flex flex-col items-center justify-center shrink-0 shadow-xs">
                    <span className="font-label-sm text-[10px] uppercase font-bold tracking-widest">
                      JAN
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold leading-none">
                      28
                    </span>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-title-md text-title-md text-on-surface font-semibold truncate">
                      Pediatric Bi-Annual Review &amp; Fluoride Varnish
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Tuesday, 3:00 PM • Dr. Layla Haddad (Pedodontist)
                    </span>
                    <span className="font-body-sm text-body-sm text-primary flex items-center gap-1 mt-0.5">
                      <Icon name="pin_drop" className="text-[15px]" />
                      Lagos Island Dental Centre, Ikeja City Mall
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <NavLink
                    to="/patient-dashboard/reminders/appointments"
                    className="py-2.5 px-4 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container-highest transition-colors"
                  >
                    Reschedule
                  </NavLink>
                  <button
                    type="button"
                    onClick={() => showToast('Directions to Ikeja City Mall Clinic opened.')}
                    className="py-2.5 px-4 rounded-xl bg-secondary-container text-on-secondary-container font-label-md text-label-md font-semibold hover:bg-secondary-fixed transition-colors flex items-center gap-1.5"
                  >
                    <Icon name="directions" className="text-[17px]" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Delight: Pediatric Ambient Card */}
            <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-tertiary-fixed to-surface-container-high overflow-hidden shadow-xs">
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl bg-surface-container-lowest text-tertiary flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon name="sentiment_very_satisfied" className="text-[24px]" />
                </div>
                <div className="flex flex-col space-y-1">
                  <span className="font-title-md text-title-md text-on-tertiary-fixed font-bold">
                    Making Check-ups Fun for Tariq
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    Track Tariq's morning and night brushing challenges to earn his Nigeria Dental Health “Sparkle Seal” at the January appointment!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Last Recorded Examination Reference Card */}
            <div className="rounded-2xl bg-surface-container-lowest shadow-xs border border-outline-variant/30 overflow-hidden flex flex-col">
              <div className="p-4 flex items-center justify-between bg-surface-container-low border-b border-outline-variant/20">
                <div className="flex items-center gap-2">
                  <Icon name="history_edu" className="text-primary text-[20px]" />
                  <h2 className="font-title-md text-title-md text-on-surface font-bold">
                    Last Clinical Record Basis
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface-variant font-label-sm text-label-sm font-semibold">
                  Dec 12, 2024
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-title-sm text-title-sm text-on-surface font-semibold block">
                      Comprehensive Exam &amp; Routine Charting
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      Dr. Chinedu Okafor (DHA-D-48912)
                    </span>
                  </div>
                  <div className="px-2 py-0.5 rounded-md bg-secondary-container/40 text-on-secondary-container font-label-sm text-label-sm shrink-0 font-bold">
                    Verified
                  </div>
                </div>

                {/* Clinical Findings Matrix */}
                <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-3 rounded-xl text-center border border-outline-variant/20">
                  <div className="flex flex-col p-1.5 rounded-lg bg-surface-container-lowest shadow-2xs">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-bold">28</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Teeth Sound</span>
                  </div>
                  <div className="flex flex-col p-1.5 rounded-lg bg-surface-container-lowest shadow-2xs">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">#16</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Restored</span>
                  </div>
                  <div className="flex flex-col p-1.5 rounded-lg bg-surface-container-lowest shadow-2xs">
                    <span className="font-headline-sm text-headline-sm text-secondary font-bold">Grade 1</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">Gingival</span>
                  </div>
                </div>

                <NavLink
                  to="/patient-dashboard/records/examinations"
                  className="inline-flex items-center justify-between p-3 rounded-xl bg-surface-container hover:bg-surface-container-high transition-colors text-primary font-title-sm text-title-sm group"
                >
                  <span className="flex items-center gap-2">
                    <Icon name="inventory" className="text-[18px]" />
                    <span>View Exam Record (#EX-2024-9182)</span>
                  </span>
                  <Icon name="arrow_forward" className="text-[18px] transition-transform group-hover:translate-x-1" />
                </NavLink>
              </div>
            </div>

            {/* DHA Governance Standard & Policy Contrast Notice */}
            <div className="rounded-2xl bg-surface-container-low p-5 flex flex-col gap-3.5 border border-outline-variant/20 shadow-xs">
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5 text-primary">
                  <Icon name="gavel" className="text-[18px]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold">
                    DHA Oral Health Governance Standard
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                    General population guidelines suggest a 6-month interval unless your licensed dentist specifies an individualized risk-based recall period.
                  </p>
                </div>
              </div>

              {/* Unverified Example Contrast Box */}
              <div className="p-3.5 rounded-xl bg-surface-container-lowest shadow-2xs flex flex-col gap-2 border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-error font-bold flex items-center gap-1">
                    <Icon name="help_center" className="text-[15px]" />
                    Example: Unverified Profile
                  </span>
                  <span className="px-2 py-0.2 rounded-full bg-error-container text-on-error-container font-label-sm text-[10px] font-bold">
                    Action Required
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  If no DHA digital diagnostic baseline exists, recall is marked unavailable until a baseline screening is performed.
                </p>
                <NavLink
                  to="/patient-dashboard/records/screenings"
                  className="mt-1 py-2 px-3 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold text-center hover:bg-primary-container transition-colors"
                >
                  Book Baseline Screening
                </NavLink>
              </div>
            </div>

            {/* Accredited Clinic Directory Shortcut */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 shadow-xs border border-outline-variant/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center shrink-0 text-on-secondary-container shadow-2xs">
                  <Icon name="apartment" className="text-[22px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                    Browse DHA-Accredited Clinics
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                    Over 380 certified centers across Lagos
                  </span>
                </div>
              </div>
              <NavLink
                to="/patient-dashboard/quick-actions"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-primary hover:bg-surface-container-highest shrink-0 transition-colors"
              >
                <Icon name="near_me" className="text-[20px]" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

