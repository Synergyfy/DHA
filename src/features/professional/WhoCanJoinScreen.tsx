import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

type RoleTab = 'all' | 'clinicians' | 'facilities' | 'academic' | 'community';

export function WhoCanJoinScreen() {
  const [activeTab, setActiveTab] = useState<RoleTab>('all');

  return (
    <ProfessionalShell
      pageTitle="Who Can Join DHA?"
      badgeCode="0B.7"
      badgeLabel="Professional Route Guide"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Atmosphere Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary-950 to-teal-950 text-white p-6 sm:p-10 lg:p-16 border border-white/10 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Icon name="verified" className="text-[14px]" />
              <span>CHOOSE YOUR PROFESSIONAL ROUTE • 0B.7</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-display">
              Who Can Join DHA?
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
              Select the role that fits your clinical practice, medical facility, or educational institution. Every category receives a tailored workspace compliant with Dubai healthcare governance.
            </p>

            {/* Trust Pill */}
            <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                  <Icon name="health_and_safety" className="text-[20px]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Unified Dubai Health Network</div>
                  <div className="text-xs text-slate-400">Instant NABIDH E-Record Link</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-teal-300 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                <span>Active</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tab Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-outline-variant/20 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Supported Practice Disciplines (4)
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">Filter by clinical or administrative category</p>
          </div>

          <div className="inline-flex p-1 bg-surface-container rounded-2xl self-start sm:self-auto overflow-x-auto max-w-full">
            {(['all', 'clinicians', 'facilities', 'academic', 'community'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-surface-container-lowest text-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab === 'all' ? 'All Roles' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* 4 Gateway Cards Mosaic */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Dentists & Dental Professionals */}
          {(activeTab === 'all' || activeTab === 'clinicians') && (
            <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-primary shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                    <Icon name="dentistry" className="text-[28px]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold">
                    Clinical Tier
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">Dentists & Dental Professionals</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  For individual dental professionals who need access to DHA's professional tools, patient chart lookup, and digital odontograms.
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-surface-container-low space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                    Key Highlights:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      E-Prescriptions
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Digital Odontogram
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Referral Tracking
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-secondary-container text-on-secondary-container font-bold shadow-2xs">
                      NABIDH Sync
                    </span>
                  </div>
                </div>
              </div>

              <NavLink
                to="/register"
                className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs hover:bg-primary/90 transition"
              >
                <span>Join as a Professional</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>
          )}

          {/* Card 2: Dental Clinics */}
          {(activeTab === 'all' || activeTab === 'facilities') && (
            <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-secondary shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                    <Icon name="local_hospital" className="text-[28px]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold">
                    Facility Tier
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">Dental Clinics & Centres</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  For clinics that want to register and manage their clinic presence, multi-chair operatories, and staff activities on DHA.
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-surface-container-low space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block">
                    Operational Scope:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Multi-Branch Roster
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Practitioner Privileges
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Chair Scheduling
                    </span>
                  </div>
                </div>
              </div>

              <NavLink
                to="/register"
                className="w-full py-3 rounded-xl bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>Register a Clinic</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>
          )}

          {/* Card 3: Schools */}
          {(activeTab === 'all' || activeTab === 'academic') && (
            <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-tertiary shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-surface-variant text-tertiary flex items-center justify-center shrink-0">
                    <Icon name="school" className="text-[28px]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold">
                    Academic Tier
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">Schools & Universities</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  For educational institutions coordinating annual pediatric oral health screening for their students with automated parent alerts.
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-surface-container-low space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tertiary block">
                    Program Tools:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Student Cohort Uploads
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Guardian Consent Forms
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Aggregated Health Reports
                    </span>
                  </div>
                </div>
              </div>

              <NavLink
                to="/register"
                className="w-full py-3 rounded-xl bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>Register a School</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>
          )}

          {/* Card 4: Other Organisations */}
          {(activeTab === 'all' || activeTab === 'community') && (
            <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-teal-400 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed-variant flex items-center justify-center shrink-0">
                    <Icon name="diversity_3" className="text-[28px]" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs font-bold">
                    Community Tier
                  </span>
                </div>

                <h3 className="text-xl font-bold text-on-surface">Community & Non-Profit Organisations</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                  For civic bodies coordinating mobile community dental screening vans, labor camp checkups, and outreach campaigns.
                </p>

                <div className="mt-5 p-4 rounded-2xl bg-surface-container-low space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-secondary block">
                    Outreach Modules:
                  </span>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Outreach Campaigns
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Mass Mobile Screening
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest text-on-surface font-semibold shadow-2xs">
                      Referral Partnerships
                    </span>
                  </div>
                </div>
              </div>

              <NavLink
                to="/register"
                className="w-full py-3 rounded-xl bg-surface-container-high text-primary hover:bg-primary hover:text-on-primary font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs transition"
              >
                <span>Register an Organisation</span>
                <Icon name="arrow_forward" className="text-[16px]" />
              </NavLink>
            </div>
          )}
        </section>

        {/* Existing Account or Patient Switcher Bar */}
        <section className="p-6 rounded-3xl bg-surface-container-low border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container-lowest text-primary flex items-center justify-center shadow-xs">
              <Icon name="login" className="text-[20px]" />
            </div>
            <div>
              <div className="text-xs text-on-surface-variant">Already have an institutional account?</div>
              <NavLink to="/login" className="font-bold text-sm text-primary hover:underline">
                Login to your professional portal here
              </NavLink>
            </div>
          </div>

          <NavLink
            to="/patient-dashboard"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs"
          >
            <Icon name="person_pin" className="text-secondary text-[18px]" />
            <span>Are you a patient or family member? Switch to Patient Portal</span>
          </NavLink>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default WhoCanJoinScreen;

