import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

export function ProfessionalHeroScreen() {
  const [selectedRole, setSelectedRole] = useState<'all' | 'dentist' | 'clinic' | 'school'>('all');

  return (
    <ProfessionalShell
      pageTitle="Better Connected Dental Care Starts with DHA"
      badgeCode="0B.1"
      badgeLabel="Official Healthcare Gateway"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Top Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-primary-950 to-teal-950 text-white p-6 sm:p-10 lg:p-16 border border-white/10 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 text-xs font-semibold uppercase tracking-wider mb-6">
              <Icon name="hub" className="text-[15px] text-teal-300" />
              <span>CONNECTED CLINICAL NETWORK • DHA HEALTHCARE PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight font-display">
              Better Connected Dental Care Starts with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-primary-200 to-white">
                DHA.
              </span>
            </h1>

            <p className="text-base sm:text-xl text-slate-200 leading-relaxed max-w-2xl font-light">
              Whether you are a dentist, dental professional, clinic, school or organisation, DHA provides digital tools to support dental care, organise patient information and coordinate screening activities.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <NavLink
                to="/professional/who-can-join"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-base transition shadow-lg hover:shadow-xl active:scale-95"
              >
                <span>Join DHA</span>
                <Icon name="arrow_forward" className="text-[20px]" />
              </NavLink>

              <NavLink
                to="/professional/intro"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/25 transition backdrop-blur-md active:scale-95"
              >
                <Icon name="explore" className="text-[18px]" />
                <span>Explore Professional Services</span>
              </NavLink>
            </div>

            {/* Trust Micro-Badges */}
            <div className="mt-10 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-slate-300">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Icon name="verified_user" className="text-[18px]" />
                </div>
                <div>
                  <div className="font-bold text-white">Verified Licensure</div>
                  <div className="text-[11px] text-slate-400">Validated with MOHAP/DHA</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-primary-500/20 text-primary-300 flex items-center justify-center shrink-0">
                  <Icon name="admin_panel_settings" className="text-[18px]" />
                </div>
                <div>
                  <div className="font-bold text-white">Role-Based Access</div>
                  <div className="text-[11px] text-slate-400">Strict clinical boundaries</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                  <Icon name="policy" className="text-[18px]" />
                </div>
                <div>
                  <div className="font-bold text-white">Nigeria Compliant</div>
                  <div className="text-[11px] text-slate-400">Federal Health Data Law</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bento Grid: Live Metrics & High-Tech Showcase */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Image Banner (Col 1 & 2 on Desktop) */}
          <div className="lg:col-span-2 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm overflow-hidden flex flex-col justify-between">
            <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-slate-900">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRk69bAH37vqAlThYzdeBpItf2ZkcoHnnX531QQ46S2hfnYUi6B48YfgHGlWShTVbRrPoGvSmVBGoGEAxHE0729NT39GjpjFu9NE-vm0GBZURcspHEo91hNM9zQAnydmc7iaRjswuEEqbi_jvFE8Y4XuO3pWDE3GJoqIqi8iDmQ4dSH8B2VGi52jheVtPHAQzdH0SOfim4HTdGX2ibBSLfJE1figYnq7U86dx4evGg"
                alt="Modern Nigeria dental consultation clinic with licensed dentist analyzing 3D dental chart"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6">
                <div className="flex items-center gap-3 text-white">
                  <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                    <Icon name="biotech" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-lg font-bold text-white">
                      Nigeria Dental Health Unified Dental Hub
                    </h3>
                    <p className="text-xs text-slate-300">
                      Standardized FDI 2-Digit Odontograms · Nigeria Health Information Exchange Live EHR Interoperability
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Ribbon */}
            <div className="p-6 grid grid-cols-3 gap-4 border-t border-outline-variant/20 bg-surface-container-lowest">
              <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-primary">4.2k+</div>
                <div className="text-xs text-on-surface-variant font-medium mt-0.5">Verified Clinicians</div>
              </div>

              <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-secondary">380+</div>
                <div className="text-xs text-on-surface-variant font-medium mt-0.5">Accredited Clinics</div>
              </div>

              <div className="p-3 rounded-2xl bg-surface-container-low text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-tertiary">120+</div>
                <div className="text-xs text-on-surface-variant font-medium mt-0.5">School Cohorts</div>
              </div>
            </div>
          </div>

          {/* Registration Notice & Role Selector (Col 3 on Desktop) */}
          <div className="rounded-3xl bg-surface-container-lowest p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center gap-2 text-primary mb-3">
                <Icon name="info" className="text-[20px]" />
                <span className="font-title-sm text-sm font-bold text-on-surface">Registration Notice</span>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Initial registration opens the DHA professional verification portal. Have your DHA Professional License or Facility Establishment ID ready for immediate verification.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-title-sm text-sm font-bold text-on-surface">Role Quick Selector</span>
                <span className="text-[11px] text-primary font-semibold">Step 1 Scope</span>
              </div>

              <div className="space-y-2">
                <NavLink
                  to="/professional/services-dentists"
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                      <Icon name="stethoscope" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface group-hover:text-primary transition">
                        Dental Practitioner
                      </div>
                      <div className="text-[11px] text-on-surface-variant">General, Ortho, Perio</div>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-outline group-hover:translate-x-0.5 transition" />
                </NavLink>

                <NavLink
                  to="/professional/services-clinics"
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                      <Icon name="domain" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface group-hover:text-secondary transition">
                        Dental Clinic / Center
                      </div>
                      <div className="text-[11px] text-on-surface-variant">Multi-chair, polyclinics</div>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-outline group-hover:translate-x-0.5 transition" />
                </NavLink>

                <NavLink
                  to="/professional/services-schools"
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-surface-container-low hover:bg-surface-container transition group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                      <Icon name="school" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-on-surface group-hover:text-tertiary transition">
                        School / Outreach Body
                      </div>
                      <div className="text-[11px] text-on-surface-variant">Pediatric screening, cohorts</div>
                    </div>
                  </div>
                  <Icon name="chevron_right" className="text-[18px] text-outline group-hover:translate-x-0.5 transition" />
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/professional/joining-steps"
              className="w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-xs hover:bg-primary/90 transition"
            >
              <span>View Onboarding Stages</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>

        {/* 3 Core Architecture Pillars */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface font-display">
                Dedicated Modules for Every Stakeholder
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1">
                Explore the tools tailored for your clinical discipline and organisational responsibilities.
              </p>
            </div>

            <div className="inline-flex p-1 bg-surface-container rounded-2xl self-start sm:self-auto">
              {(['all', 'dentist', 'clinic', 'school'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition ${
                    selectedRole === role
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {role === 'all' ? 'All Modules' : role}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(selectedRole === 'all' || selectedRole === 'dentist') && (
              <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-primary shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-6">
                    <Icon name="dentistry" className="text-[24px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">0B.3 Discipline</span>
                  <h3 className="text-xl font-bold text-on-surface mt-1 mb-2">Dental Practitioners</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Access digital odontograms, full periodontal charting, secure clinical histories, e-prescriptions, and direct secondary referrals.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-on-surface-variant border-t border-outline-variant/20 pt-4">
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>FDI 32-tooth interactive mapping</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>Direct specialist referral routing</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-outline-variant/20">
                  <NavLink
                    to="/professional/services-dentists"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline"
                  >
                    <span>Explore Dentist Tools</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </NavLink>
                </div>
              </div>
            )}

            {(selectedRole === 'all' || selectedRole === 'clinic') && (
              <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-secondary shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-6">
                    <Icon name="local_hospital" className="text-[24px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-secondary">0B.4 Discipline</span>
                  <h3 className="text-xl font-bold text-on-surface mt-1 mb-2">Dental Clinics & Centers</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Manage multi-chair operatory scheduling, practitioner privileges, patient intakes, and aggregate DHA quality compliance reports.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-on-surface-variant border-t border-outline-variant/20 pt-4">
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>Operatory chair occupancy tracker</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>Staff privilege credential matrix</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-outline-variant/20">
                  <NavLink
                    to="/professional/services-clinics"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-secondary hover:underline"
                  >
                    <span>Explore Clinic Services</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </NavLink>
                </div>
              </div>
            )}

            {(selectedRole === 'all' || selectedRole === 'school') && (
              <div className="rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 hover:border-tertiary shadow-sm hover:shadow-md transition flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6">
                    <Icon name="school" className="text-[24px]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-tertiary">0B.5 Discipline</span>
                  <h3 className="text-xl font-bold text-on-surface mt-1 mb-2">Schools & Organisations</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Coordinate cohort oral screenings, upload student rosters, track triage percentages in real time, and auto-dispatch guardian notifications.
                  </p>

                  <ul className="mt-5 space-y-2 text-xs text-on-surface-variant border-t border-outline-variant/20 pt-4">
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>Batch roster upload (Grade 1–6+)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Icon name="check_circle" className="text-secondary text-[16px]" />
                      <span>Automated parent triage referral SMS</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-outline-variant/20">
                  <NavLink
                    to="/professional/services-schools"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-tertiary hover:underline"
                  >
                    <span>Explore School Outreaches</span>
                    <Icon name="arrow_forward" className="text-[14px]" />
                  </NavLink>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default ProfessionalHeroScreen;

