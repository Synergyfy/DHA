import { NavLink } from 'react-router-dom';
import { ProfessionalShell } from './ProfessionalShell';
import { Icon } from '../../design/Primitives';

export function VerificationAndTrustScreen() {
  return (
    <ProfessionalShell
      pageTitle="Professional Access with the Right Verification"
      badgeCode="0B.8"
      badgeLabel="Data Governance & Clinical Integrity"
    >
      <div className="space-y-10 lg:space-y-14">
        {/* Header Intro */}
        <section className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-semibold">
            <Icon name="verified_user" className="text-[14px]" />
            <span>0B.8 DATA GOVERNANCE & CLINICAL INTEGRITY</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-on-surface tracking-tight font-display leading-tight">
            Professional Access with the Right Verification
          </h1>

          <p className="text-base sm:text-lg text-on-surface-variant leading-relaxed">
            DHA is designed to provide professional and organisational access strictly according to the type of account, verified medical licenses, and the responsibilities assigned to each user.
          </p>
        </section>

        {/* Reassurance Banner with Doctor Imagery */}
        <section className="relative overflow-hidden rounded-3xl bg-surface-container p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6 border border-outline-variant/30 shadow-sm">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden bg-surface-container-high shadow-md">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAqdEPNzTF1qXt0ZJuLitElArW7LujH-QEgIAOmvSK_y1RStZPD8EnRFZChu9ZQy0SDrqy7AnnVWzGZgY8zQH44GTAd1_N2LVSvSQcm43Sy4gHhmNKLE65ZB008GR2tZLI2r_ayCUnQFbBMBvIN2c7CMWoPsQHhtlTxQOQdAvOEHTq5CipjTO0IKNfFCUw1aVceKa9oXvuwRf9H-43DsoBycFJN5LbZ0Z1xAK00VnVP"
              alt="Certified clinical dentist in professional scrubs"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2">
            <div className="flex items-center gap-1.5 text-secondary">
              <Icon name="shield_with_heart" className="text-[20px]" />
              <span className="font-label-md text-xs font-bold uppercase tracking-wider">Tier 1 Credential Guard</span>
            </div>
            <h3 className="font-title-md text-base sm:text-lg font-bold text-on-surface">
              Cryptographically Authenticated Clinician Signatures
            </h3>
            <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
              Every diagnosis, screening entry, and odontogram modification is cryptographically bound to an authorized clinician license profile and recorded in the audit trail.
            </p>
          </div>
        </section>

        {/* Three Foundational Principles */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
              Core Governance Principles
            </h2>
            <span className="text-xs font-semibold text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
              3 Foundational Layers
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Principle 1 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                  <Icon name="badge" className="text-[24px]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Principle 01</span>
                  <h3 className="font-title-md text-base font-bold text-on-surface">Professional Verification</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Dental professionals undergo rigorous verification, validating official MOHAP/DHA professional licensing, accredited medical credentials, and active standing before clinical charting privileges are unlocked.
              </p>
            </div>

            {/* Principle 2 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                  <Icon name="lock_open_right" className="text-[24px]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider block">Principle 02</span>
                  <h3 className="font-title-md text-base font-bold text-on-surface">Role-Based Access</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Users access only the tools and information relevant to their assigned responsibilities. Clinical screeners cannot modify specialized diagnostic charts, and administrative staff cannot access sensitive medical details.
              </p>
            </div>

            {/* Principle 3 */}
            <div className="p-6 rounded-3xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-tertiary-fixed text-tertiary flex items-center justify-center shrink-0">
                  <Icon name="clinical_notes" className="text-[24px]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-tertiary uppercase tracking-wider block">Principle 03</span>
                  <h3 className="font-title-md text-base font-bold text-on-surface">Controlled Patient Records</h3>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Patient information is accessed strictly according to appropriate patient authorization, guardian consent, and active care episodes, ensuring compliance with federal health privacy standards.
              </p>
            </div>
          </div>
        </section>

        {/* Transparency Matrix Section */}
        <section className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 border border-outline-variant/30 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-on-surface font-display">
                Transparency Matrix: Permitted Scopes
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Clearly defined boundaries across clinical screening, odontogram diagnostics, and administration.
              </p>
            </div>
            <Icon name="table_chart_view" className="text-outline text-[24px]" />
          </div>

          <div className="overflow-x-auto rounded-2xl border border-outline-variant/30">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-container-high text-on-surface font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Account Tier</th>
                  <th className="p-4 text-center">Screening Intake</th>
                  <th className="p-4 text-center">Diagnostics & Odontogram</th>
                  <th className="p-4 text-center">Scheduling & Admin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20 bg-surface-container-lowest text-on-surface">
                {/* Row 1 */}
                <tr className="hover:bg-surface-container-low transition">
                  <td className="p-4">
                    <div className="font-bold text-sm text-on-surface">Licensed Dentist / Specialist</div>
                    <div className="text-on-surface-variant text-[11px]">Full Clinical Charting Access</div>
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-surface-container-low transition">
                  <td className="p-4">
                    <div className="font-bold text-sm text-on-surface">Dental Hygienist / Screener</div>
                    <div className="text-on-surface-variant text-[11px]">Pre-assessment & Triage Only</div>
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="remove" className="text-outline-variant text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-surface-container-low transition">
                  <td className="p-4">
                    <div className="font-bold text-sm text-on-surface">Clinic Administrative Staff</div>
                    <div className="text-on-surface-variant text-[11px]">Logistics & Appointment Desk</div>
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="remove" className="text-outline-variant text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="remove" className="text-outline-variant text-[20px] inline-block" />
                  </td>
                  <td className="p-4 text-center">
                    <Icon name="check_circle" className="text-secondary text-[20px] inline-block" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-outline italic">
            *Screening: Intake checks and triage flags • Diagnostics: Full tooth-by-tooth odontogram edits and radiography • Admin: Scheduling & de-identified metrics.
          </p>
        </section>

        {/* Regulatory Governance Seal */}
        <section className="bg-surface-container-low rounded-3xl p-6 sm:p-8 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
              <Icon name="verified" className="text-[20px]" />
            </div>
            <div>
              <h4 className="font-title-sm text-sm font-bold text-on-surface">
                Clear clinical boundaries protect patients, providers, and facilities alike.
              </h4>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Real-time validation against the National Provider Identifier (NPI) directory and MOHAP licensure APIs.
              </p>
            </div>
          </div>

          <NavLink
            to="/portal/privacy"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-xs uppercase tracking-wider text-center transition shadow-2xs"
          >
            Review Governance Framework
          </NavLink>
        </section>
      </div>
    </ProfessionalShell>
  );
}

export default VerificationAndTrustScreen;

