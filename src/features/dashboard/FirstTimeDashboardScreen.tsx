import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { DashboardShell } from './DashboardShell';
import { usePatientStore } from '../../store/patientStore';
import { Icon } from '../../design/Primitives';

export function FirstTimeDashboardScreen() {
  const navigate = useNavigate();
  const { activeProfile, setQrModalOpen } = usePatientStore();
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [bookingNotice, setBookingNotice] = useState<string | null>(null);

  const handleBooking = (clinic: string) => {
    setBookingNotice(`Booking appointment with ${clinic}... Opening calendar selector.`);
    setTimeout(() => setBookingNotice(null), 3500);
  };

  return (
    <DashboardShell pageTitle="First-Time Patient Guide" showBack>
      {bookingNotice && (
        <div className="fixed top-20 right-4 z-50 bg-secondary text-on-secondary px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4 duration-200">
          <Icon name="check_circle" className="text-[20px]" />
          <span className="font-title-sm text-title-sm font-semibold">{bookingNotice}</span>
          <button
            type="button"
            onClick={() => setBookingNotice(null)}
            className="ml-2 hover:opacity-75"
          >
            <Icon name="close" className="text-[18px]" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6">
        {/* Welcome & Reassuring Intro Header */}
        <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="font-label-sm text-label-sm text-secondary font-bold uppercase tracking-wider">
              New Patient Journey
            </span>
            <h1 className="font-headline-lg-mobile sm:font-headline-md text-headline-lg-mobile sm:text-headline-md text-on-surface font-bold tracking-tight mt-0.5">
              Welcome to DHA, {activeProfile.shortName}! 👋
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl leading-relaxed">
              We're delighted to support your lifelong smile. Everything is set up and ready for your very first clinical screening.
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs shrink-0 self-start sm:self-center">
            <Icon name="sentiment_satisfied" className="text-[28px]" />
          </div>
        </section>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Primary Rail (8 cols on lg) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Digital Lifecode Smart Identity Card */}
            <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-container to-tertiary text-on-primary p-5 sm:p-6 shadow-md">
              <div className="absolute -right-8 -bottom-10 w-48 h-48 bg-on-primary/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 relative z-10">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-on-primary font-semibold tracking-wide uppercase">
                      New Patient • Ready for Initial Visit
                    </span>
                  </div>

                  <div className="pt-1">
                    <p className="font-label-sm text-label-sm text-tertiary-fixed opacity-90 font-medium">
                      Dubai Health Authority Lifecode
                    </p>
                    <p className="font-headline-md text-headline-md tracking-wider font-bold text-on-primary font-mono">
                      {activeProfile.lifecode}
                    </p>
                  </div>
                </div>

                {/* QR Simulation Badge */}
                <button
                  type="button"
                  onClick={() => setQrModalOpen(true)}
                  className="group bg-surface-container-lowest text-on-surface p-3 rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-transform flex flex-col items-center shrink-0 self-start"
                  aria-label="Expand Lifecode QR Code"
                >
                  <svg className="w-14 h-14 text-primary" fill="none" viewBox="0 0 48 48">
                    <rect fill="currentColor" height="14" rx="2" width="14" x="2" y="2"></rect>
                    <rect fill="#FFFFFF" height="8" rx="1" width="8" x="5" y="5"></rect>
                    <rect fill="currentColor" height="4" width="4" x="7" y="7"></rect>
                    <rect fill="currentColor" height="14" rx="2" width="14" x="32" y="2"></rect>
                    <rect fill="#FFFFFF" height="8" rx="1" width="8" x="35" y="5"></rect>
                    <rect fill="currentColor" height="4" width="4" x="37" y="7"></rect>
                    <rect fill="currentColor" height="14" rx="2" width="14" x="2" y="32"></rect>
                    <rect fill="#FFFFFF" height="8" rx="1" width="8" x="5" y="35"></rect>
                    <rect fill="currentColor" height="4" width="4" x="7" y="37"></rect>
                    <rect fill="currentColor" height="4" rx="1" width="6" x="20" y="4"></rect>
                    <rect fill="currentColor" height="6" rx="1" width="4" x="20" y="12"></rect>
                    <rect fill="currentColor" height="4" rx="1" width="6" x="4" y="20"></rect>
                    <rect fill="currentColor" height="4" rx="1" width="6" x="12" y="22"></rect>
                    <rect fill="currentColor" height="8" rx="1" width="8" x="22" y="22"></rect>
                    <rect fill="currentColor" height="6" rx="1" width="4" x="34" y="22"></rect>
                    <rect fill="currentColor" height="4" rx="1" width="8" x="20" y="34"></rect>
                    <rect fill="currentColor" height="6" rx="1" width="6" x="32" y="32"></rect>
                    <rect fill="currentColor" height="4" rx="1" width="4" x="40" y="40"></rect>
                  </svg>
                  <span className="font-label-sm text-[10px] font-bold text-primary mt-1 tracking-tight uppercase">
                    Tap to Scan
                  </span>
                </button>
              </div>

              <div className="mt-4 pt-3 flex items-center justify-between text-on-primary/90 font-body-sm text-body-sm relative z-10 bg-on-primary/10 rounded-xl px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <Icon name="verified_user" className="text-[18px]" />
                  <span>{activeProfile.name}</span>
                </div>
                <span className="font-label-sm text-label-sm font-semibold text-tertiary-fixed">
                  Kiosk Ready
                </span>
              </div>
            </section>

            {/* Discreet Profile Completion Gentle Banner */}
            {!bannerDismissed && (
              <section className="bg-surface-container-low border border-outline-variant/30 rounded-2xl p-4 sm:p-5 shadow-xs transition-all">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    {/* Circular Mini Progress Tracker */}
                    <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                      <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-surface-container-highest"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        ></path>
                        <path
                          className="text-secondary"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="75, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        ></path>
                      </svg>
                      <span className="absolute font-label-sm text-label-sm font-bold text-secondary">
                        75%
                      </span>
                    </div>

                    <div>
                      <h2 className="font-title-sm text-title-sm text-on-surface font-semibold">
                        Profile 75% Complete
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-snug mt-0.5">
                        Add an emergency contact &amp; preferred clinic to streamline check-in.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setBannerDismissed(true)}
                    className="text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors"
                    aria-label="Dismiss completion reminder"
                  >
                    <Icon name="close" className="text-[18px]" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3 pt-2 border-t border-outline-variant/20">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    General health info is optional
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setBannerDismissed(true)}
                      className="px-3 py-1.5 text-on-surface-variant hover:text-on-surface font-title-sm text-title-sm font-semibold transition-colors"
                    >
                      Later
                    </button>
                    <NavLink
                      to="/register/health"
                      className="px-4 py-1.5 bg-secondary hover:bg-secondary/90 text-on-secondary rounded-xl font-title-sm text-title-sm font-semibold shadow-xs transition-colors"
                    >
                      Complete Now
                    </NavLink>
                  </div>
                </div>
              </section>
            )}

            {/* Primary Honest Empty State: Oral Health Summary Baseline */}
            <section className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 flex flex-col items-center text-center relative overflow-hidden">
              <div className="w-18 h-18 rounded-3xl bg-surface-container-high flex items-center justify-center text-primary mb-4 shadow-inner">
                <Icon name="dentistry" className="text-[38px]" />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant mb-2">
                <Icon name="hourglass_empty" className="text-[16px] text-tertiary" />
                <span className="font-label-sm text-label-sm font-medium">
                  Awaiting Clinical Baseline
                </span>
              </div>

              <h2 className="font-headline-sm sm:font-headline-md text-headline-sm sm:text-headline-md text-on-surface font-bold">
                No examination records yet
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-lg leading-relaxed">
                Your official oral health overview and digital odontogram will appear here after your first certified clinical screening with an accredited DHA provider.
              </p>

              <div className="w-full bg-surface-container-low rounded-xl p-4 my-5 text-left flex items-start gap-3 border border-outline-variant/20">
                <Icon name="verified" className="text-[20px] text-primary shrink-0 mt-0.5" />
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  During your first appointment, an accredited DHA dentist will chart your teeth, measure gum pocket health, and generate your certified diagnostic rating.
                </p>
              </div>

              <NavLink
                to="/patient-dashboard/quick-actions"
                className="w-full sm:w-auto py-3.5 px-6 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm text-title-sm font-semibold shadow-sm transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Icon name="calendar_add_on" className="text-[20px]" />
                <span>Find a Dentist &amp; Book Initial Checkup →</span>
              </NavLink>
            </section>

            {/* 3 Getting Started Steps Guide */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Getting Started in 3 Steps
                </h2>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  Easy Setup
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {/* Step 1 */}
                <div
                  onClick={() => navigate('/register/health')}
                  className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-primary/40 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-title-md text-title-md font-bold text-primary shrink-0">
                    1
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                        General Health Profile
                      </h3>
                      <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant font-label-sm text-[10px] font-semibold uppercase">
                        Optional
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Add allergies, current medications, or medical background for clinical safety.
                    </p>
                  </div>
                  <Icon name="chevron_right" className="text-on-surface-variant text-[22px] shrink-0" />
                </div>

                {/* Step 2 */}
                <div
                  onClick={() => navigate('/patient-dashboard/quick-actions')}
                  className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-primary/40 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center font-title-md text-title-md font-bold text-primary shrink-0">
                    2
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                      Find an Accredited DHA Clinic
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Search 120+ verified community clinics in Dubai and book online.
                    </p>
                  </div>
                  <Icon name="chevron_right" className="text-on-surface-variant text-[22px] shrink-0" />
                </div>

                {/* Step 3 */}
                <div
                  onClick={() => setQrModalOpen(true)}
                  className="flex items-center gap-4 bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/20 hover:border-primary/40 cursor-pointer transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-secondary-container flex items-center justify-center font-title-md text-title-md font-bold text-on-secondary-container shrink-0">
                    3
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-title-sm text-title-sm text-on-surface font-semibold truncate">
                      Present Lifecode at Reception
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      Instant kiosk check-in with your digital QR token.
                    </p>
                  </div>
                  <Icon name="qr_code_scanner" className="text-secondary text-[22px] shrink-0" />
                </div>
              </div>
            </section>

            {/* Clean Empty State for Archived Records */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <h2 className="font-title-md text-title-md text-on-surface font-bold">
                Archived Records &amp; Plans
              </h2>
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant shrink-0">
                  <Icon name="inventory_2" className="text-[24px]" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-title-sm text-title-sm text-on-surface font-semibold">
                    No Dental Records Yet
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                    X-rays, periodontal charts, and clinician notes will sync automatically here once your first visit concludes.
                  </p>
                </div>
              </div>
              <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border border-outline-variant/20">
                <span className="flex items-center gap-2">
                  <Icon name="cloud_sync" className="text-[18px] text-primary" />
                  <span>DHA Secure Health Vault Connected</span>
                </span>
                <span className="text-secondary font-bold">0 Files Pending Sync</span>
              </div>
            </section>
          </div>

          {/* Sidebar Rail (5 cols on lg) */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-6">
            {/* Recommended Clinics Near You */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Accredited Clinics
                  </h2>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">
                    Direct booking available for new patients
                  </p>
                </div>
                <NavLink
                  to="/patient-dashboard/quick-actions"
                  className="font-label-sm text-label-sm text-primary font-semibold hover:underline"
                >
                  View All
                </NavLink>
              </div>

              <div className="space-y-4">
                {/* Clinic 1 */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-32 w-full bg-surface-container-high overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQlMJ-pf6vuRERuiaXJYCdViLqJ7qK2floavl9HVyIOgzQ7GIVwRa-nMpBgpY-MEjl4GQpJs_66YDnW93ev2qjJ-WXQiAT3lL46lmg1GGwlCow8CvINHcC2jhTMKF3Xqc-GPbvVLo9HACmYxmt4XVmleacEcoZhGHXkcVuS8-qxmkSqxcUm8CpicDMqDHXLqCRKKEZzHPhhJwUYn6JvosoQjgwXXkSXn30xPwA-y3w"
                      alt="DHA Community Dental Clinic Oud Metha"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-1 shadow-xs">
                      <Icon name="verified" className="text-secondary text-[14px]" />
                      <span className="font-label-sm text-[10px] font-bold text-secondary">
                        DHA ACCREDITED
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm font-semibold">
                      0.8 km away
                    </div>
                  </div>

                  <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 pr-2">
                        <h3 className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                          DHA Community Dental Clinic
                        </h3>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                          <Icon name="location_on" className="text-[14px] text-tertiary" />
                          <span>Oud Metha Health Complex, Block B</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-lg shrink-0">
                        <Icon name="star" filled className="text-amber-500 text-[14px]" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">4.9</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/20">
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-[12px]">
                        <Icon name="event_available" className="text-[16px] text-secondary" />
                        <span>Slots open tomorrow</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBooking('DHA Community Clinic Oud Metha')}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm text-[13px] font-semibold shadow-xs transition-colors"
                      >
                        Book Visit
                      </button>
                    </div>
                  </div>
                </div>

                {/* Clinic 2 */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-outline-variant/30 flex flex-col hover:shadow-md transition-shadow">
                  <div className="relative h-32 w-full bg-surface-container-high overflow-hidden">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDMAeP_viz_ckZC8s0rvTVU4vBqIhAv0VvF6accM4xuiStYymvlPSXjMkDSveUN002kbkqki9lEenj8pFEIPm1Qkuh6aRtvaT8hjKRhggaYBUdmUcp38PxS6dArstBXAlEwXrYx_8BcZQzSvX_hq3psqEZCyI3Wd84CO5XsggKM07iJBVu7NveMGZQAQdKP2qRaTkmVcyyEhCV-zCMyweRI3buMAgYgU2Tc9NY0Ft3F"
                      alt="Emirates Family Dental Hub"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-1 shadow-xs">
                      <Icon name="verified" className="text-secondary text-[14px]" />
                      <span className="font-label-sm text-[10px] font-bold text-secondary">
                        DHA ACCREDITED
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-md bg-inverse-surface/80 text-inverse-on-surface font-label-sm text-label-sm font-semibold">
                      1.5 km away
                    </div>
                  </div>

                  <div className="p-4 flex flex-col">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 pr-2">
                        <h3 className="font-title-sm text-title-sm text-on-surface font-bold truncate">
                          Emirates Family Dental Hub
                        </h3>
                        <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5 flex items-center gap-1">
                          <Icon name="location_on" className="text-[14px] text-tertiary" />
                          <span>Al Jaddaf Medical Precinct, Level 1</span>
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-surface-container-low px-2 py-0.5 rounded-lg shrink-0">
                        <Icon name="star" filled className="text-amber-500 text-[14px]" />
                        <span className="font-label-sm text-label-sm font-bold text-on-surface">4.8</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-outline-variant/20">
                      <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-[12px]">
                        <Icon name="family_restroom" className="text-[16px] text-secondary" />
                        <span>General &amp; Family Care</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleBooking('Emirates Family Dental Hub')}
                        className="px-3.5 py-1.5 bg-primary hover:bg-primary-container text-on-primary rounded-xl font-title-sm text-[13px] font-semibold shadow-xs transition-colors"
                      >
                        Book Visit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Preventive Smile Care Educational Tips */}
            <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Preventive Smile Care
                </h2>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Evidence-Based
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-3 border border-outline-variant/20">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                    <Icon name="timer" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-on-surface font-semibold leading-snug">
                      2 Minutes, 2x Daily Brushing
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                      The proven gold standard to inhibit enamel demineralization and prevent plaque formation.
                    </p>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-xl p-3.5 flex items-start gap-3 border border-outline-variant/20">
                  <div className="w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                    <Icon name="health_and_safety" className="text-[20px]" />
                  </div>
                  <div>
                    <h3 className="font-title-sm text-title-sm text-on-surface font-semibold leading-snug">
                      Why Early Cleanings Matter
                    </h3>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 leading-relaxed">
                      Detect subgingival tartar and micro-cavities early before pain or structural loss begins.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

