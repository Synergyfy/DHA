import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

type BranchKey = 'jumeirah' | 'downtown';

export function ServicesForClinicsScreen() {
  const [activeBranch, setActiveBranch] = useState<BranchKey>('jumeirah');

  const branches: Record<BranchKey, { name: string; chairs: { name: string; status: string; state: 'active' | 'sterile' | 'pediatric' }[] }> = {
    jumeirah: {
      name: 'Jumeirah 1 (HQ)',
      chairs: [
        { name: 'Op-1 (Dr. Farouk)', status: 'Scaling & Hygiene', state: 'active' },
        { name: 'Op-2 (Dr. Reem)', status: 'Endodontics', state: 'active' },
        { name: 'Op-3 (Sterilization)', status: 'Turnaround Prep', state: 'sterile' },
        { name: 'Op-4 (Pediatric Suite)', status: 'Sealants & Fluoride', state: 'pediatric' },
      ],
    },
    downtown: {
      name: 'Downtown Annex',
      chairs: [
        { name: 'Op-A (Consultation)', status: 'Invisalign Scan', state: 'active' },
        { name: 'Op-B (Oral Surgery)', status: 'Impacted Molar', state: 'active' },
        { name: 'Op-C (Hygienist)', status: 'Available', state: 'sterile' },
        { name: 'Op-D (Emergency)', status: 'On Standby', state: 'pediatric' },
      ],
    },
  };

  const currentChairs = branches[activeBranch].chairs;

  return (
    <ProfessionalShell
      pageTitle="Bring Your Dental Clinic onto DHA"
      badgeCode="0B.4"
      badgeLabel="Accredited Dental Facilities & Centres"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified" className="text-[14px]" />
            <span>0B.4 ACCREDITED DENTAL FACILITIES & CENTRES</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            Bring Your Dental Clinic onto DHA
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            DHA gives dental clinics a digital platform to organise multi-branch clinic operations, track operatory chair capacity, coordinate referrals, and deliver unified patient care.
          </p>
        </section>

        {/* Facility Credentials & Interactive Chair Operatory Sandbox Preview */}
        <section className="relative w-full rounded-3xl bg-surface-container-lowest p-6 sm:p-8 border border-outline-variant/30 shadow-sm overflow-hidden space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-outline-variant/20">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0 shadow-sm">
                <Icon name="medical_services" className="text-[28px]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-headline-sm text-base sm:text-lg font-bold text-on-surface">
                    Al Noor Dental Speciality Center
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant text-[11px] font-bold">
                    MOH/DHA Verified
                  </span>
                </div>
                <div className="text-xs text-on-surface-variant font-mono mt-0.5">
                  ID: DHA-CLINIC-884920 · 4 Operatories · NABIDH Live
                </div>
              </div>
            </div>

            {/* Branch Switcher */}
            <div className="flex items-center p-1 rounded-2xl bg-surface-container-low self-start sm:self-auto">
              {(['jumeirah', 'downtown'] as const).map((branch) => (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setActiveBranch(branch)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition ${
                    activeBranch === branch
                      ? 'bg-surface-container-lowest text-primary shadow-xs'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  {branch === 'jumeirah' ? 'Jumeirah 1 (HQ)' : 'Downtown Annex'}
                </button>
              ))}
            </div>
          </div>

          {/* Operatory Chairs Live State */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-title-sm text-xs font-bold uppercase tracking-wider text-on-surface flex items-center gap-1.5">
                <Icon name="chair" className="text-primary text-[18px]" />
                <span>Live Chair Operatories Today ({branches[activeBranch].name})</span>
              </span>
              <span className="text-xs font-semibold text-secondary">3 of 4 Active</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentChairs.map((chair, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                    chair.state === 'active'
                      ? 'bg-surface-container-low border-secondary/30'
                      : chair.state === 'pediatric'
                      ? 'bg-primary-fixed/20 border-primary/30'
                      : 'bg-surface-container-lowest border-outline-variant/30'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs text-on-surface">{chair.name}</span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        chair.state === 'active'
                          ? 'bg-secondary'
                          : chair.state === 'pediatric'
                          ? 'bg-primary'
                          : 'bg-outline-variant'
                      }`}
                    />
                  </div>
                  <div className="text-xs font-semibold text-primary truncate">{chair.status}</div>
                  <div className="text-[10px] text-on-surface-variant mt-1">Patient Checked-in</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 6 Integrated Clinic Modules */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Integrated Clinic Operations Suite
            </h2>
            <span className="text-xs font-semibold text-primary bg-surface-container px-3 py-1 rounded-full">
              6 Modules
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Clinic Profile */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center mb-4">
                  <Icon name="domain" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Clinic Profile & Multi-Branch</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Present your clinic, satellite branches, approved dental services, and pricing tiers to authorized registries.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-primary font-semibold">
                <span>Facility Directory Listing</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>

            {/* 2. Staff Management */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <Icon name="badge" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Staff & Practitioner Privileges</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Organise dentists, hygienists, and nurses with clear role boundaries and practitioner licensing validations.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Credential Privilege Matrix</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>

            {/* 3. Patient Care Workflows */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-4">
                  <Icon name="vital_signs" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Clinical Care Intake</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Support authorized clinical activities within the facility, including digital intake triage and consent logging.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-tertiary font-semibold">
                <span>Intake & Consent Protocol</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>

            {/* 4. Appointments */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high text-primary flex items-center justify-center mb-4">
                  <Icon name="calendar_month" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Chair Scheduling</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Manage multi-chair operatory calendars, room turnovers, emergency slots, and automated SMS reminders.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-primary font-semibold">
                <span>Multi-Room Grid</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>

            {/* 5. Records and Documentation */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-surface-container-highest text-tertiary-container flex items-center justify-center mb-4">
                  <Icon name="clinical_notes" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Records & Audits</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Access patient records according to authorized permissions and audit guidelines with full chain-of-custody tracking.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-on-surface-variant font-semibold">
                <span>Permanent Audit Logging</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>

            {/* 6. Referrals and Follow-ups */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center mb-4">
                  <Icon name="sync_alt" className="text-[24px]" />
                </div>
                <h3 className="font-title-md text-base font-bold text-on-surface mb-2">Secondary Referrals</h3>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Coordinate transfers and secondary specialist follow-ups with major hospitals and specialized maxillo-facial centers.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-outline-variant/20 flex items-center justify-between text-xs text-secondary font-semibold">
                <span>Hospital Network Routing</span>
                <Icon name="chevron_right" className="text-[18px]" />
              </div>
            </div>
          </div>
        </section>

        {/* Visual Proof / Facility Ambience Spot */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-lg border border-outline-variant/30 h-56 sm:h-64 bg-slate-900">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfVWoXajoJUr6QNoNVru0vWL6KlygOwpqWuIeIJXGbkms0YsuYYM7tscWm182iVf292Qtb025jn_7xk_htXiUOKqftLHXMQlye7ZJu8OAv8P23AmbuFa6IYKbHLCu82SzBdwHKXIKwN6UOQS8wKJOQB-DRDTuHw2dVw4_t_cE1o5U8B7DUFyZjld5fbSiJSxNNteDzByF_36tXFPrDeGktEgu-KAp-XKYlwSHCw-20"
            alt="Modern accredited dental clinic in Dubai with bright natural sunlight and sterile operatory trays"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex items-end p-6 sm:p-8">
            <div className="flex items-center gap-3 text-white">
              <div className="w-10 h-10 rounded-xl bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
                <Icon name="health_and_safety" className="text-[22px]" />
              </div>
              <div>
                <h3 className="font-headline-sm text-lg sm:text-xl font-bold text-white">
                  Engineered for Dubai Health Authority Standards
                </h3>
                <p className="text-xs sm:text-sm text-slate-300">
                  Compliant with UAE Federal Health Data Law · Real-Time License Cross-Referencing
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Clinic Governance Advisory Callout */}
        <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/30 flex flex-col sm:flex-row items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
            <Icon name="shield_lock" className="text-[22px]" />
          </div>
          <div>
            <h4 className="font-title-sm text-sm font-bold text-on-surface">Role-Based Access Control Architecture</h4>
            <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
              A clinic account does not automatically grant every staff member access to all clinical records. Permissions strictly follow DHA role and patient-access consent rules.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-secondary font-semibold">
              <Icon name="lock_clock" className="text-[16px]" />
              <span>Strict Patient Consent Verification Enforced</span>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">Register Your Dental Facility</h3>
            <p className="text-xs text-on-surface-variant mt-0.5">Average turnaround: 24–48 hours for accredited clinical networks</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <NavLink
              to="/professional/who-can-join"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition"
            >
              <span>Begin Clinic Registration</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </NavLink>
          </div>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default ServicesForClinicsScreen;

