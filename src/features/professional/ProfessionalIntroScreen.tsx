import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

type RoleKey = 'screener' | 'dentist' | 'coordinator';

export function ProfessionalIntroScreen() {
  const [activeRole, setActiveRole] = useState<RoleKey>('screener');

  const roleData: Record<RoleKey, { title: string; desc: string; icon: string; permissions: string[] }> = {
    screener: {
      title: 'Community Oral Screener',
      desc: 'Triage tools, rapid assessments, visual caries risk flagging, and cohort participation logging.',
      icon: 'assignment_ind',
      permissions: ['Non-invasive triage checklist', 'Urgent pain flag dispatch', 'Guardian referral generation', 'Basic index recording'],
    },
    dentist: {
      title: 'Licensed Clinician & Specialist',
      desc: 'Full 32-tooth odontograms, clinical diagnoses, periodontal charting, and secondary treatment referrals.',
      icon: 'stethoscope',
      permissions: ['32-Tooth restorative charting', 'Digital radiograph attachment', 'Official DHA clinical signature', 'Direct specialist routing'],
    },
    coordinator: {
      title: 'Program Coordinator & Officer',
      desc: 'Cohort tracking, regional screening coverage metrics, operational logistics, and aggregate governance analytics.',
      icon: 'shield_with_heart',
      permissions: ['School roster batch imports', 'Screener station scheduling', 'Aggregate public health analytics', 'Referral completion auditing'],
    },
  };

  const currentRole = roleData[activeRole];

  return (
    <ProfessionalShell
      pageTitle="One Platform. Different Ways to Improve Oral Healthcare."
      badgeCode="0B.2"
      badgeLabel="Platform Overview & Architecture"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro Section */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified" className="text-[14px]" />
            <span>0B.2 OVERVIEW & ARCHITECTURE</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            One Platform. Different Ways to Improve Oral Healthcare.
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            DHA connects dental professionals and organisations through a shared platform designed to support oral healthcare activities, from patient screening and clinical examinations to records, referrals and follow-up.
          </p>
        </section>

        {/* Visual Hero Banner */}
        <section className="relative rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 h-48 sm:h-64 bg-slate-900">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOysEtuyjHBxrhOadPVTV7lhdrNiMFFqUqpEhIRnoedcxt_4w7chnQXIabKKZebixL6xNd0SBj8yhK5N43BHTFfNRdemtCTYHKlxx0Rfwh0og015zxIpEUCvswb3kA0F5eQW1v4vSvdmulBnXMLz5I5GSl6GqjVTe1gIcOGCWtDKqmYxDn-nRoFU0VXvhft7oY38R0szM6i5HOP9e0IjOL9CnOOvFe8qeGYmiP3ETq"
            alt="Modern collaborative clinical dental office reviewing oral healthcare records"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Icon name="hub" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white">
                  Unified Digital Oral Care Infrastructure
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Securely connecting public health programs, private clinics, and hospital dental departments.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Functional Pillars Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">Core Capabilities</h2>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              4 Functional Pillars
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <Icon name="folder_shared" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">
                  Organise Patient Information
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Manage relevant patient records and clinical information according to your role and access permissions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] font-semibold text-primary">
                Role-Governed EHR
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <Icon name="dentistry" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">
                  Support Clinical Workflows
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Carry out screening and detailed dental examinations through the appropriate professional tools.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] font-semibold text-secondary">
                Odontogram & Charting
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
                  <Icon name="sync_alt" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">
                  Connect Care Activities
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Support referrals and follow-up between authorised providers with guaranteed auditability.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] font-semibold text-tertiary">
                Direct DHA Referrals
              </div>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center mb-4">
                  <Icon name="fact_check" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">
                  Coordinate Screening
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Organise school and community screening activities and track their progress in real-time.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 text-[11px] font-semibold text-primary">
                Cohort Progress Tracking
              </div>
            </div>
          </div>
        </section>

        {/* Platform Ecosystem Architecture Diagram */}
        <section className="bg-surface-container-low rounded-3xl p-6 sm:p-10 border border-outline-variant/30 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                System Workflow
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface mt-1 font-display">
                Platform Ecosystem Architecture
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
              <span>Continuously Synchronised with NABIDH</span>
            </div>
          </div>

          {/* Desktop Responsive Flowchart */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            {/* Step 1 */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
                <Icon name="domain" className="text-[20px]" />
              </div>
              <div className="font-bold text-on-surface text-xs">1. Schools & Community</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">Cohort identification</div>
            </div>

            <div className="hidden md:flex justify-center text-primary">
              <Icon name="east" className="text-[22px]" />
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm text-center">
              <div className="w-10 h-10 rounded-xl bg-surface-container text-primary flex items-center justify-center mx-auto mb-2">
                <Icon name="vital_signs" className="text-[20px]" />
              </div>
              <div className="font-bold text-on-surface text-xs">2. Initial Screening</div>
              <div className="text-[11px] text-on-surface-variant mt-0.5">Fast triaging check</div>
            </div>

            <div className="hidden md:flex justify-center text-primary">
              <Icon name="east" className="text-[22px]" />
            </div>

            {/* Central Hub */}
            <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary p-4 rounded-2xl shadow-md text-center">
              <div className="w-10 h-10 rounded-xl bg-white/20 text-white flex items-center justify-center mx-auto mb-2">
                <Icon name="health_metrics" className="text-[20px]" />
              </div>
              <div className="font-bold text-xs">3. DHA Connected Hub</div>
              <div className="text-[11px] text-white/80 mt-0.5">Access control & routing</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <Icon name="medical_services" className="text-[20px]" />
              </div>
              <div>
                <div className="font-bold text-on-surface text-xs">4. Dental Clinics & Specialists</div>
                <div className="text-[11px] text-on-surface-variant">Comprehensive diagnosis & operative interventions</div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                <Icon name="task_alt" className="text-[20px]" />
              </div>
              <div>
                <div className="font-bold text-on-surface text-xs">5. Follow-up & Outcomes</div>
                <div className="text-[11px] text-on-surface-variant">Longitudinal oral health improvement</div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Role Perspective Previewer */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-10 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
                Preview Role Perspective
              </h2>
              <p className="text-xs text-on-surface-variant mt-1">
                Click a role to preview the customized workspace, permissions, and tools available.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 bg-surface-container-low p-1.5 rounded-2xl">
              {(['screener', 'dentist', 'coordinator'] as const).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setActiveRole(role)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold capitalize transition text-center ${
                    activeRole === role
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Role Detail Card */}
          <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <Icon name={currentRole.icon} className="text-[28px]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                  Active Persona Scope
                </span>
                <h3 className="text-lg font-bold text-on-surface mt-0.5">{currentRole.title}</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-xl">
                  {currentRole.desc}
                </p>
              </div>
            </div>

            <div className="w-full md:w-auto shrink-0 bg-surface-container-lowest p-4 rounded-xl border border-outline-variant/20 space-y-2">
              <span className="text-[11px] font-bold text-on-surface uppercase tracking-wider block">
                Permitted Capabilities:
              </span>
              <ul className="space-y-1.5 text-xs text-on-surface-variant">
                {currentRole.permissions.map((perm, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <Icon name="check" className="text-secondary text-[14px]" />
                    <span>{perm}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
            <NavLink
              to="/professional/who-can-join"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Verify My Role Eligibility</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default ProfessionalIntroScreen;

