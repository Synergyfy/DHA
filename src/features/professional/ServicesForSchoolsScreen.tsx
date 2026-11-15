import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

export function ServicesForSchoolsScreen() {
  const [selectedCohort, setSelectedCohort] = useState<'grade3' | 'grade5' | 'community'>('grade3');
  const [guidelinesModalOpen, setGuidelinesModalOpen] = useState(false);

  const cohortData = {
    grade3: {
      name: 'St. Jude Academy — Grade 3 Cohort',
      total: 400,
      screened: 336,
      percent: 84,
      referrals: 42,
    },
    grade5: {
      name: 'Al Khaleej National School — Grade 5 Cohort',
      total: 280,
      screened: 260,
      percent: 92,
      referrals: 18,
    },
    community: {
      name: 'Dubai Cares Community Outreach Camp',
      total: 650,
      screened: 455,
      percent: 70,
      referrals: 95,
    },
  };

  const currentCohort = cohortData[selectedCohort];

  return (
    <ProfessionalShell
      pageTitle="Make Community Dental Screening More Organised"
      badgeCode="0B.5"
      badgeLabel="Schools & Organisations Outreach"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified_user" className="text-[14px]" />
            <span>0B.5 COMMUNITY & EDUCATIONAL SCREENING</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            Make Community Dental Screening More Organised
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            DHA supports schools, universities, and non-profit organisations that want to coordinate oral health screening programmes and help participants connect with appropriate dental care.
          </p>
        </section>

        {/* Live Cohort Demonstration Strip */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-secondary animate-pulse" />
              <div>
                <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
                  Live Screening Programme Tracker
                </h3>
                <p className="text-xs text-on-surface-variant">Real-time progress sync for active school stations</p>
              </div>
            </div>

            {/* Cohort Switcher Chips */}
            <div className="inline-flex p-1 bg-surface-container-low rounded-2xl self-start sm:self-auto">
              {(['grade3', 'grade5', 'community'] as const).map((cohort) => (
                <button
                  key={cohort}
                  type="button"
                  onClick={() => setSelectedCohort(cohort)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCohort === cohort
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {cohort === 'grade3' ? 'Grade 3' : cohort === 'grade5' ? 'Grade 5' : 'Outreach Camp'}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tracker Card */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="font-title-sm text-sm font-bold text-on-surface">
                {currentCohort.name}
              </span>
              <span className="font-mono text-sm font-extrabold text-primary">
                {currentCohort.percent}% Screened
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${currentCohort.percent}%` }}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-on-surface-variant pt-1">
              <span>
                <strong>{currentCohort.screened}</strong> of {currentCohort.total} participants assessed
              </span>
              <span className="text-secondary font-bold flex items-center gap-1">
                <Icon name="notifications_active" className="text-[16px]" />
                <span>{currentCohort.referrals} Triage Referrals Queued for Parents</span>
              </span>
            </div>
          </div>
        </section>

        {/* 6 Bento-style Programme Capabilities */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Programme Capabilities (6)
            </h2>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              Standard Academic Track
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Programme Organisation */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <Icon name="event_note" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Programme Organisation</h3>
                  <span className="text-[10px] font-mono font-bold bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded">
                    SETUP
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Set up and schedule school or community screening sessions with designated dates, venues, and screening teams.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-primary">
                Multi-Day Event Scheduling
              </div>
            </div>

            {/* 2. Participant Management */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <Icon name="groups" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Cohort Management</h3>
                  <span className="text-[10px] font-mono font-bold bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded">
                    COHORTS
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Upload CSV/Excel student rosters with Grade 1–6 classroom groupings and digital guardian consent receipts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-secondary">
                Roster Batch Imports
              </div>
            </div>

            {/* 3. Screening Coordination */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
                  <Icon name="badge" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Screening Coordination</h3>
                  <span className="text-[10px] font-mono font-bold bg-tertiary-fixed/60 text-tertiary px-1.5 py-0.5 rounded">
                    STAFFING
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Assign licensed screener personnel, manage portable diagnostic stations, and monitor daily checkup throughput.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-tertiary">
                Station Allocation
              </div>
            </div>

            {/* 4. Screening Progress */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-4">
                  <Icon name="query_stats" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Live Screening Progress</h3>
                  <span className="text-[10px] font-mono font-bold bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded">
                    REAL-TIME
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Track completed screens versus absent students in real time as clinical assessments occur on tablet stations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-primary">
                Live Attendance Sync
              </div>
            </div>

            {/* 5. Referral Coordination */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <Icon name="share_location" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Referral Coordination</h3>
                  <span className="text-[10px] font-mono font-bold bg-secondary-fixed text-on-secondary-fixed-variant px-1.5 py-0.5 rounded">
                    PATHWAYS
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Direct students requiring urgent restorative care into certified pediatric dental clinics with instant SMS alerts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-secondary">
                Parent SMS Auto-Dispatch
              </div>
            </div>

            {/* 6. Programme Reporting */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container text-primary flex items-center justify-center mb-4">
                  <Icon name="summarize" className="text-[24px]" />
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-title-md text-base font-bold text-on-surface">Aggregate Reporting</h3>
                  <span className="text-[10px] font-mono font-bold bg-primary-fixed/40 text-primary px-1.5 py-0.5 rounded">
                    AGGREGATE
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Generate institutional de-identified caries risk summaries and participation certificates for school board reviews.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-xs font-semibold text-primary">
                Certified Health Summaries
              </div>
            </div>
          </div>
        </section>

        {/* Visual Photographic Card */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 h-56 sm:h-64 bg-slate-900">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAatMvHaMeWfU9GrX8JQzCG5fSYLAEEEen41Y7NJ-bPFSRYUhsnMvgl1uJiV8k33EeWnZ_ApuCl-oRrSkGA0T3OAcWHD0I2h1HOuEEbhcc9GM2IhcQOvrjJOF2QDd5g4I-cDPudFXh5bRQjeKLCTRKL9ZoRMnEV8HH9yCZUtPAqAiW1NGn5t-L8JwFKhHQlCPcNc-pFvUL3rXSUBRONeLnRF4SahcQwuNdeODcjMYHr"
            alt="Pediatric dental clinician conducting an oral health screening for an elementary school child"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Icon name="shield_with_heart" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white">
                  Accredited Health Outreaches
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Ensuring safe, stress-free clinical screening for all students and community members.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Privacy & Scope Limitation Notice */}
        <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/30 space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Icon name="lock" className="text-[22px]" />
            <h4 className="font-title-sm text-sm font-bold text-on-surface">
              Privacy & Access Governance Notice
            </h4>
          </div>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            <strong className="text-on-surface">Scope Limitation:</strong> Schools and community bodies do not receive independent access to full individual patient clinical charts. Organisation access is strictly designated for programme coordination and permitted aggregate reporting.
          </p>
          <div className="flex items-center justify-between text-xs text-secondary font-semibold pt-2 border-t border-outline-variant/20">
            <span className="flex items-center gap-1.5">
              <Icon name="verified" className="text-[16px]" />
              <span>HIPAA & FERPA Aligned Governance Framework</span>
            </span>
            <span className="font-mono text-[11px] text-on-surface-variant">REF: GOV-0B-SEC5</span>
          </div>
        </section>

        {/* Action Triggers */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Ready to coordinate an institutional dental checkup?
            </h3>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Supported by the Dental Health Authority Community Division
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setGuidelinesModalOpen(true)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary font-bold text-xs uppercase tracking-wider transition"
            >
              School Oral Guidelines
            </button>

            <NavLink
              to="/professional/who-can-join"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Register an Organisation</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>

        {/* Guidelines Modal */}
        {guidelinesModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 border border-outline-variant/30 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-headline-sm text-lg font-bold text-on-surface">
                  School Oral Health Screening Guidelines
                </h3>
                <button
                  type="button"
                  onClick={() => setGuidelinesModalOpen(false)}
                  className="text-on-surface-variant hover:text-on-surface"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                The DHA School Health Screening Directive specifies standard lighting requirements, single-use examination kits, guardian consent collection rules, and priority referrals for acute dental caries or infection.
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low text-xs text-primary font-semibold space-y-1">
                <div>• Minimum 1 licensed dentist per 50 students / day</div>
                <div>• Pre-screening consent collected 7 days prior</div>
                <div>• Automated notification dispatch within 24 hours of triage</div>
              </div>
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuidelinesModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold"
                >
                  Acknowledge & Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProfessionalShell>
  );
}

export default ServicesForSchoolsScreen;

