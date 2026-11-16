import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

interface StaffMember {
  id: string;
  name: string;
  title: string;
  category: 'dentists' | 'hygienists' | 'admin';
  status: string;
  statusType: 'active' | 'pending' | 'accepted';
  branch: string;
  accessLevel?: string;
  accessDesc?: string;
  license?: string;
  initials: string;
}

const STAFF_ROSTER: StaffMember[] = [
  {
    id: 'amina',
    name: 'Dr. Amina Bello, DDS, FWACS',
    title: 'Medical Director & Chief Dental Surgeon',
    category: 'dentists',
    status: 'Active • Fully Verified',
    statusType: 'active',
    branch: 'Wuse 2 Main (HQ)',
    accessLevel: 'Full Clinical & Facility Admin',
    accessDesc: 'Authorized for treatment authorization, pharmacy dispensing, surgical odontogram entry & branch sign-offs.',
    license: '#DEN-78421',
    initials: 'AB',
  },
  {
    id: 'daniel',
    name: 'Dr. Daniel James, DDS',
    title: 'Lead Restorative Clinician',
    category: 'dentists',
    status: 'Invitation Pending • Sent 18 Oct',
    statusType: 'pending',
    branch: 'Wuse 2 & Garki',
    license: 'DHA #DEN-48912',
    initials: 'DJ',
  },
  {
    id: 'tunde',
    name: 'Dr. Tunde Fashola, BDS',
    title: 'Associate General Dentist & Garki Lead',
    category: 'dentists',
    status: 'Active • Verified',
    statusType: 'active',
    branch: 'Garki Branch',
    license: 'MDCN #DEN-65412',
    initials: 'TF',
  },
  {
    id: 'zainab',
    name: 'Nurse Zainab Tariq, RN',
    title: 'Head Chairside Nurse & Infection Lead',
    category: 'hygienists',
    status: 'Active • IPC Certified',
    statusType: 'active',
    branch: 'Wuse 2 Main',
    initials: 'ZT',
  },
  {
    id: 'fatima',
    name: 'Fatima Noor, RDH',
    title: 'Registered Dental Hygienist',
    category: 'hygienists',
    status: 'Invite Accepted • Verification Pending',
    statusType: 'accepted',
    branch: 'Wuse 2 Main',
    initials: 'FN',
  },
  {
    id: 'chidera',
    name: 'Chidera Eze',
    title: 'Head Receptionist & Patient Triage Coordinator',
    category: 'admin',
    status: 'Active • Admin Scope Only',
    statusType: 'active',
    branch: 'Wuse 2 Main',
    accessLevel: 'Administrative Scope Enforced',
    accessDesc: 'Administrative access only (No clinical chart editing, odontogram notation, or prescription submission).',
    initials: 'CE',
  },
];

export function StaffRoleAssignmentScreen() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'dentists' | 'hygienists' | 'admin'>('all');
  const [roster] = useState<StaffMember[]>(STAFF_ROSTER);
  const [toastMessage, setToastMessage] = useState('');

  const filteredStaff = useMemo(() => {
    if (filter === 'all') return roster;
    return roster.filter(s => s.category === filter);
  }, [roster, filter]);

  const handleResend = (name: string) => {
    setToastMessage(`Invitation resent to ${name}`);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleContinue = () => {
    alert('Proceeding to Application Review & Submission (15.17)');
  };

  return (
    <ClinicOnboardingShell
      currentStep={16}
      totalSteps={18}
      stepTitle="Staff & Role Assignment"
      stepCategory="Clinical Governance"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Context Summary */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1 text-secondary font-bold text-xs uppercase tracking-wider">
                <Icon name="shield" className="text-base" />
                <span>DHA Statutory Compliance</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-on-surface">
                Staff &amp; Role Assignment Roster
              </h2>
              <p className="text-xs text-on-surface-variant mt-0.5">
                Greenfield Dental Clinic Group &bull; Wuse 2 HQ &amp; Garki Branch
              </p>
            </div>
            <span className="font-mono text-xs font-bold bg-primary-fixed text-primary px-3 py-1 rounded-full self-start sm:self-center">
              6 Staff Members
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-heading font-bold text-lg text-secondary">4</span>
              <span className="block text-[11px] text-on-surface-variant">Verified Active</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-heading font-bold text-lg text-amber-600">2</span>
              <span className="block text-[11px] text-on-surface-variant">In Onboarding</span>
            </div>
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30">
              <span className="font-heading font-bold text-lg text-primary">2</span>
              <span className="block text-[11px] text-on-surface-variant">Dual Branches</span>
            </div>
          </div>
        </div>

        {/* Role Guardrail Callout */}
        <div className="p-4 rounded-xl bg-surface-container-high/60 border border-outline-variant/30 flex items-start gap-3 text-xs">
          <Icon name="verified_user" className="text-primary text-xl shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <strong className="text-on-surface">DHA Role Isolation Guardrail:</strong>
              <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-bold">
                Enforced
              </span>
            </div>
            <p className="text-on-surface-variant leading-relaxed">
              Reception and administrative personnel are strictly restricted from clinical treatment plan formulation, prescription authorization, and odontogram diagnostic recording under statutory DHA mandates.
            </p>
          </div>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              filter === 'all'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            All Staff (6)
          </button>
          <button
            type="button"
            onClick={() => setFilter('dentists')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              filter === 'dentists'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Dentists (3)
          </button>
          <button
            type="button"
            onClick={() => setFilter('hygienists')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              filter === 'hygienists'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Hygienists &amp; Nurses (2)
          </button>
          <button
            type="button"
            onClick={() => setFilter('admin')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-colors ${
              filter === 'admin'
                ? 'bg-primary text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
            }`}
          >
            Admin &amp; Triage (1)
          </button>
        </div>

        {/* Staff Members Roster List */}
        <div className="space-y-3">
          {filteredStaff.map((staff) => (
            <article
              key={staff.id}
              className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white font-bold flex items-center justify-center shrink-0 shadow-sm">
                    {staff.initials}
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-on-surface">
                      {staff.name}
                    </h3>
                    <p className="text-xs text-on-surface-variant">{staff.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      staff.statusType === 'active'
                        ? 'bg-secondary-fixed/50 text-secondary'
                        : staff.statusType === 'accepted'
                        ? 'bg-primary-fixed text-primary'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    <Icon name={staff.statusType === 'active' ? 'check_circle' : 'schedule'} className="text-xs" />
                    {staff.status}
                  </span>
                  <span className="text-[11px] font-medium text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Icon name="location_on" className="text-xs" />
                    {staff.branch}
                  </span>
                </div>
              </div>

              {staff.accessLevel && (
                <div className="p-3 rounded-xl bg-surface-container-low text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold uppercase tracking-wider text-[10px] text-on-surface">Access Level</span>
                    <span className="font-semibold text-primary">{staff.accessLevel}</span>
                  </div>
                  <p className="text-on-surface-variant">{staff.accessDesc}</p>
                </div>
              )}

              {staff.license && !staff.accessLevel && (
                <div className="p-2.5 rounded-xl bg-surface-container-low text-xs flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-on-surface">Credential Standing</span>
                  <span className="font-mono font-semibold text-secondary">{staff.license}</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-1 border-t border-outline-variant/20">
                {staff.statusType === 'pending' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => handleResend(staff.name)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center gap-1"
                    >
                      <Icon name="send" className="text-sm" />
                      <span>Resend</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Managing branches for ${staff.name}`)}
                      className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-colors"
                    >
                      Branches
                    </button>
                  </>
                ) : staff.statusType === 'accepted' ? (
                  <button
                    type="button"
                    onClick={() => alert(`Reviewing credentials for ${staff.name}`)}
                    className="px-4 py-1.5 rounded-lg bg-secondary text-white text-xs font-semibold hover:bg-secondary/90 transition-colors flex items-center gap-1"
                  >
                    <Icon name="verified" className="text-sm" />
                    <span>Review Credentials</span>
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => alert(`Editing role for ${staff.name}`)}
                      className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Icon name="edit_note" className="text-sm" />
                      <span>Edit Role</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => alert(`Viewing profile for ${staff.name}`)}
                      className="px-3 py-1.5 rounded-lg border border-outline-variant hover:bg-surface-container text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <Icon name="badge" className="text-sm" />
                      <span>View Profile</span>
                    </button>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Branch Deployment Matrix */}
        <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-heading font-bold text-sm text-on-surface flex items-center gap-2">
              <Icon name="apartment" className="text-primary text-lg" />
              Branch Deployment Matrix
            </h4>
            <span className="text-xs font-semibold text-secondary">Synchronized</span>
          </div>

          <div className="space-y-2">
            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-on-surface block">Wuse 2 Main (HQ)</span>
                <span className="text-on-surface-variant">5 Clinicians &amp; Officers assigned</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                Compliant
              </span>
            </div>

            <div className="p-3 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-on-surface block">Garki Branch</span>
                <span className="text-on-surface-variant">2 Clinicians assigned (Lead + Restorative)</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-secondary-fixed text-on-secondary-fixed">
                Compliant
              </span>
            </div>
          </div>
        </div>

        {/* Sticky Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/clinic-onboarding/professional-invitation')}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-outline-variant text-primary font-semibold text-xs sm:text-sm hover:bg-surface-container transition-colors flex items-center justify-center gap-2"
          >
            <Icon name="person_add" className="text-base" />
            <span>+ Invite More Staff</span>
          </button>

          <button
            type="button"
            onClick={handleContinue}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
          >
            <span>Continue to Review &amp; Submission</span>
            <Icon name="arrow_forward" className="text-base" />
          </button>
        </div>

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-2.5 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-2">
            <Icon name="check_circle" className="text-secondary text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicOnboardingShell>
  );
}
