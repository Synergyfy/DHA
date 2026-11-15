import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ScreeningShell } from './ScreeningShell';
import { Icon } from '../../design/Primitives';

export function ScreeningDashboardScreen() {
  const [zeroState, setZeroState] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  return (
    <ScreeningShell
      pageTitle="Screening Operations Desk"
      badgeCode="8.1"
      badgeLabel="KHDA/DHA Outreach"
    >
      <div className="space-y-6 sm:space-y-8 max-w-6xl mx-auto">
        {/* Clinician Profile & Terminal Banner */}
        <section className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-2xl overflow-hidden bg-primary-fixed/20 ring-2 ring-primary/20">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAox45_IcYIPwdLF2V13J9VZAIBfBEc2BozBpSvT2HaKGHCLTX76VQTvHIpiDOwfR-0ui06Azu7vAf2RuIKCfIagroTh8fgU9YeqzN91gmkQ-p3e9njujNaKOiSpxc85RAv6cdrUS6c_kqbYa2fbxEQyFYWvLs9TrcbooNJ6NuNuy0uktkFlKJ5nsNVT5nIqTyINegeczIcTnj6FrwGtj4ouHZ5MyYzbl5VqEcl5GYV"
                  alt="Dr. Sarah Al-Mansoor"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-secondary ring-2 ring-surface-container-lowest" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="font-headline-sm text-lg sm:text-xl font-bold text-on-surface">
                  Dr. Sarah Al-Mansoor
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  Terminal Synced
                </span>
              </div>
              <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                Clinical Screener • License #SC-8921 • Dubai Health Authority
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setZeroState(!zeroState)}
              className="px-3 py-1.5 rounded-xl bg-surface-container text-xs font-semibold text-primary hover:bg-surface-container-high transition"
            >
              {zeroState ? 'Restore Active Data' : 'Toggle Zero State'}
            </button>
            <NavLink
              to="/screening/identification"
              className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
            >
              <Icon name="qr_code_scanner" className="text-[16px]" />
              <span>Scan Patient</span>
            </NavLink>
          </div>
        </section>

        {/* Hero CTA Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-primary via-primary-container to-secondary text-on-primary shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-bold">
              <Icon name="event" className="text-[14px]" />
              <span>Active Outreach Session: 16 Feb 2025</span>
            </div>
            <h2 className="font-headline-sm text-xl sm:text-2xl font-bold leading-tight">
              Start New Patient Screening
            </h2>
            <p className="text-xs sm:text-sm text-on-primary/90 max-w-xl leading-relaxed">
              Scan student QR tag or lookup registered profile to conduct rapid oral inspection, check-in consent, and log findings.
            </p>
          </div>

          <NavLink
            to="/screening/identification"
            className="px-6 py-3.5 rounded-2xl bg-white text-primary text-sm font-bold shadow-lg hover:bg-white/90 active:scale-98 transition flex items-center justify-center gap-2 shrink-0"
          >
            <Icon name="add_circle" className="text-[20px]" />
            <span>Launch Screener</span>
          </NavLink>
        </section>

        {/* 4 Metric Bento Cards */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Assigned Cohort</span>
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <Icon name="groups" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-headline-sm text-2xl sm:text-3xl font-extrabold text-on-surface leading-none">
                {zeroState ? '0' : '140'}
              </span>
              <p className="text-xs text-on-surface-variant mt-1">Grade 4 Students</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Completed</span>
              <div className="w-8 h-8 rounded-xl bg-secondary-container/50 flex items-center justify-center text-secondary">
                <Icon name="task_alt" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-2xl sm:text-3xl font-extrabold text-on-surface leading-none">
                  {zeroState ? '0' : '86'}
                </span>
                <span className="text-xs font-bold text-secondary">{zeroState ? '0%' : '61%'}</span>
              </div>
              <div className="w-full bg-surface-container-high h-1.5 rounded-full mt-2 overflow-hidden">
                <div className="bg-secondary h-full rounded-full transition-all duration-500" style={{ width: zeroState ? '0%' : '61%' }} />
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-surface-variant">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Remaining</span>
              <div className="w-8 h-8 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                <Icon name="pending_actions" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="font-headline-sm text-2xl sm:text-3xl font-extrabold text-on-surface leading-none">
                {zeroState ? '0' : '54'}
              </span>
              <p className="text-xs text-on-surface-variant mt-1">Pending exams today</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-error-container/20 border border-error/20 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-on-error-container">
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider">Needs Review</span>
              <div className="w-8 h-8 rounded-xl bg-error-container flex items-center justify-center text-error">
                <Icon name="report_problem" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="font-headline-sm text-2xl sm:text-3xl font-extrabold text-on-error-container leading-none">
                  {zeroState ? '0' : '19'}
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-error text-on-error">
                  Action Req
                </span>
              </div>
              <p className="text-xs text-on-error-container/80 mt-1">Flagged for dentist care</p>
            </div>
          </div>
        </section>

        {/* Zero State View */}
        {zeroState ? (
          <div className="p-12 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-surface-container-high text-primary flex items-center justify-center mx-auto">
              <Icon name="inventory_2" className="text-[32px]" />
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-on-surface">No Screenings In Progress</h3>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md mx-auto leading-relaxed">
              No patient assignments loaded for today. In accordance with DHA clinical governance rules, zero records are fabricated. Connect terminal to sync new rosters.
            </p>
            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setZeroState(false)}
                className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary/90"
              >
                Poll MOHAP Roster Server
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Assigned Screening Programmes */}
            <section className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                    Assigned Screening Programmes
                  </h2>
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                </div>

                <div className="flex bg-surface-container p-1 rounded-xl gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('active')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'active'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'upcoming'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Upcoming
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('completed')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      activeTab === 'completed'
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Completed
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Programme Card 1 */}
                <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2.5 py-1 rounded-full bg-primary-fixed/30 text-primary text-[11px] font-bold uppercase tracking-wider">
                        School Outreach
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                        Active Today
                      </span>
                    </div>

                    <div>
                      <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                        Al Wasl Model Girls School – Annual Grade 4 Dental Outreach
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Dubai Knowledge & Human Development Authority (KHDA)
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon name="location_on" className="text-[16px] text-primary" />
                        <span className="truncate">Jumeirah 1, Dubai</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon name="date_range" className="text-[16px] text-primary" />
                        <span className="truncate">16 Feb – 20 Feb 2025</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-medium text-on-surface">Screening Progress</span>
                        <span className="text-primary font-bold">
                          86/140 Completed <span className="font-normal text-on-surface-variant">(54 left)</span>
                        </span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full w-[61%]" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
                    >
                      View Student Roster
                    </button>
                    <NavLink
                      to="/screening/identification"
                      className="px-4 py-2 rounded-xl bg-primary text-on-primary text-xs font-bold hover:bg-primary/90 transition shadow-xs flex items-center gap-1.5"
                    >
                      <Icon name="play_arrow" className="text-[16px]" />
                      <span>Start Screening</span>
                    </NavLink>
                  </div>
                </div>

                {/* Programme Card 2 */}
                <div className="bg-surface-container-lowest rounded-3xl p-5 sm:p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-bold uppercase tracking-wider">
                        Community Health
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant text-[11px] font-medium">
                        Upcoming (Feb 22)
                      </span>
                    </div>

                    <div>
                      <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                        Emirates Foundation Community Health Caravan
                      </h3>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Dubai Community Welfare Hub & Mobile Clinic Fleet
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs text-on-surface-variant pt-1">
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon name="place" className="text-[16px] text-primary" />
                        <span className="truncate">Al Barsha Park Pavilion</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Icon name="event" className="text-[16px] text-primary" />
                        <span className="truncate">22 Feb 2025</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <div className="flex justify-between items-center text-xs mb-1.5">
                        <span className="font-medium text-on-surface">Target Allocation</span>
                        <span className="text-on-surface-variant">0/60 Assigned</span>
                      </div>
                      <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                        <div className="bg-outline-variant h-full rounded-full w-0" />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant">
                    <span>Pre-registration opens in 4 days</span>
                    <button
                      type="button"
                      className="px-3.5 py-2 rounded-xl bg-surface-container text-xs font-semibold text-on-surface hover:bg-surface-container-high transition"
                    >
                      Session Details
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Screening Activity Log */}
            <section className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                  Recent Screening Activity
                </h2>
                <NavLink
                  to="/screening/review"
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-0.5"
                >
                  <span>View All Submissions</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </NavLink>
              </div>

              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant/30 shadow-sm divide-y divide-outline-variant/20 overflow-hidden">
                {/* Item 1 */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      ZA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-sm font-bold text-on-surface">
                          Zayd Al-Mansoori
                        </span>
                        <span className="font-mono text-xs text-on-surface-variant">DHA-P-49102</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Grade 4-B · Dental Assessment Recommended
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                    <span className="text-on-surface-variant font-mono">10:14 AM</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1">
                      <Icon name="check_circle" className="text-[14px]" />
                      <span>Submitted</span>
                    </span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary-container/60 text-secondary font-bold text-xs flex items-center justify-center shrink-0">
                      MA
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-sm font-bold text-on-surface">
                          Mariam Al-Hashemi
                        </span>
                        <span className="font-mono text-xs text-on-surface-variant">DHA-P-88319</span>
                      </div>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Grade 4-A · No Further Action Indicated
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                    <span className="text-on-surface-variant font-mono">09:50 AM</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-semibold flex items-center gap-1">
                      <Icon name="check_circle" className="text-[14px]" />
                      <span>Submitted</span>
                    </span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-container-low transition">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-error-container text-error font-bold text-xs flex items-center justify-center shrink-0">
                      HS
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-title-sm text-sm font-bold text-on-surface">
                          Hamad Saeed
                        </span>
                        <span className="font-mono text-xs text-on-surface-variant">DHA-P-10924</span>
                      </div>
                      <p className="text-xs text-error font-medium mt-0.5">
                        Grade 4-B · Urgent Dental Assessment Recommended
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
                    <span className="text-on-surface-variant font-mono">09:15 AM</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-bold flex items-center gap-1">
                      <Icon name="flag" className="text-[14px]" />
                      <span>Flagged Urgent</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </ScreeningShell>
  );
}

export default ScreeningDashboardScreen;

