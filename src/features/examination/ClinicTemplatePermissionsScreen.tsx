import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExaminationShell } from './ExaminationShell';
import { Icon } from '../../design/Primitives';

interface StaffPermission {
  id: string;
  initials: string;
  name: string;
  role: string;
  license: string;
  badgeLabel: string;
  badgeColor: string;
  privileges: { label: string; active: boolean; restricted?: boolean }[];
  footerNote: string;
  footerDotColor: string;
  isClinicianVerified?: boolean;
}

export function ClinicTemplatePermissionsScreen() {
  const navigate = useNavigate();
  const [requireCoSign, setRequireCoSign] = useState<boolean>(true);
  const [strictArchival, setStrictArchival] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3200);
  };

  const staffList: StaffPermission[] = [
    {
      id: 'staff-1',
      initials: 'DJ',
      name: 'Dr. Daniel James, DDS',
      role: 'Clinical Supervisor',
      license: '#DEN-48912',
      badgeLabel: 'Lead Admin',
      badgeColor: 'bg-secondary-container text-on-secondary-container',
      isClinicianVerified: true,
      privileges: [
        { label: 'Create: ON', active: true },
        { label: 'Edit Branch: ON', active: true },
        { label: 'Activate/Deactivate: ON', active: true },
        { label: 'Publish: ON', active: true },
        { label: 'Deprecate: ON', active: true },
      ],
      footerNote: 'Full Authoring & Archival Rigor',
      footerDotColor: 'bg-secondary',
    },
    {
      id: 'staff-2',
      initials: 'TM',
      name: 'Dr. Tariq Mansoor, BDS',
      role: 'Associate Dentist',
      license: '#DEN-19402',
      badgeLabel: 'Template Author',
      badgeColor: 'bg-tertiary-container/30 text-tertiary',
      isClinicianVerified: true,
      privileges: [
        { label: 'Create: ON', active: true },
        { label: 'Edit Branch: OFF', active: false },
        { label: 'Activate: OFF', active: false },
        { label: 'Pending Review', active: true },
        { label: 'Use: ON', active: true },
      ],
      footerNote: 'Peer-Reviewed Submissions',
      footerDotColor: 'bg-secondary',
    },
    {
      id: 'staff-3',
      initials: 'ZT',
      name: 'Zainab Tariq, RN',
      role: 'Senior Dental Nurse',
      license: '#NUR-1102',
      badgeLabel: 'Template Operator',
      badgeColor: 'bg-surface-container text-on-surface-variant',
      isClinicianVerified: true,
      privileges: [
        { label: 'Create: OFF', active: false },
        { label: 'Edit: OFF', active: false },
        { label: 'Use in Intake: ON', active: true },
      ],
      footerNote: 'Clinical safeguarding prevents non-dentist roles from modifying diagnostic modules.',
      footerDotColor: 'bg-outline',
    },
    {
      id: 'staff-4',
      initials: 'SA',
      name: 'Sarah Nwosu',
      role: 'Clinic Operations Manager',
      license: 'Central Ops Unit',
      badgeLabel: 'Administrative Audit',
      badgeColor: 'bg-surface-container text-primary',
      privileges: [
        { label: 'View Schema: ON', active: true },
        { label: 'Audit Logs: ON', active: true },
        { label: 'Modify Clinical: RESTRICTED', active: false, restricted: true },
      ],
      footerNote: 'Non-Clinical Governance',
      footerDotColor: 'bg-primary',
    },
  ];

  return (
    <ExaminationShell
      pageTitle="Clinic Template Permissions"
      badgeCode="10.24"
      badgeLabel="Governance & Access"
      currentStep="Role-Based Access Control (RBAC v4.2)"
    >
      <div className="space-y-6 max-w-4xl mx-auto">
        {toastMessage && (
          <div className="p-3 bg-secondary-container text-on-secondary-container rounded-xl text-xs font-semibold flex items-center justify-between shadow">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold">×</button>
          </div>
        )}

        {/* Header Ribbon & Facility ID */}
        <section className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-mono text-xs font-bold">
              Facility #DHA-FAC-8812
            </span>
            <span className="font-mono text-xs text-on-surface-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
              <span>RBAC v4.2 Compliant</span>
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-bold text-on-surface">
            Clinic Template Governance & Access
          </h2>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Manage authoring, review, and deployment privileges for Central Branch examination templates.
          </p>
        </section>

        {/* Separation of Concerns Mandate Box */}
        <section className="p-4 sm:p-5 rounded-2xl bg-surface-container-low shadow-sm border border-outline-variant/30 flex items-start gap-3.5 relative overflow-hidden">
          <div className="w-1 absolute left-0 top-0 bottom-0 bg-primary" />
          <Icon name="verified_user" className="text-primary text-2xl shrink-0 mt-0.5" />
          <div className="space-y-1 min-w-0 text-xs">
            <span className="font-bold text-on-surface block sm:text-sm">
              Separation of Concerns Mandate
            </span>
            <p className="text-on-surface-variant leading-relaxed">
              Authoring templates does not grant clinical examination permissions. Only verified licensed dentists can sign examinations regardless of template administration roles under Nigeria Federal Health Law.
            </p>
          </div>
        </section>

        {/* Staff Access Matrix */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-tertiary text-xl" />
              <h3 className="text-sm sm:text-base font-bold text-on-surface">Staff Access Matrix</h3>
            </div>
            <span className="text-xs text-on-surface-variant bg-surface-container-high px-2.5 py-0.5 rounded-full font-mono font-bold">
              4 Assigned Staff
            </span>
          </div>

          <div className="space-y-3">
            {staffList.map((staff) => (
              <div
                key={staff.id}
                className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-3 hover:border-primary/40 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center shrink-0 text-sm">
                      {staff.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-xs sm:text-sm font-bold text-on-surface truncate">{staff.name}</span>
                        {staff.isClinicianVerified && (
                          <Icon name="check_circle" className="text-secondary text-sm" />
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-on-surface-variant truncate block">
                        {staff.role} • {staff.license}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold shrink-0 ${staff.badgeColor}`}>
                    {staff.badgeLabel}
                  </span>
                </div>

                {/* Privileges Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  {staff.privileges.map((p, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-0.5 rounded font-mono ${
                        p.restricted
                          ? 'bg-red-100 dark:bg-red-950 text-red-600 font-bold'
                          : p.active
                          ? 'bg-surface-container text-primary font-semibold'
                          : 'bg-surface-container text-on-surface-variant opacity-75'
                      }`}
                    >
                      {p.label}
                    </span>
                  ))}
                </div>

                {/* Footer Note and Configure Action */}
                <div className="flex items-center justify-between pt-2 border-t border-outline-variant/20 text-xs">
                  <span className="text-on-surface-variant flex items-center gap-1.5 text-[11px]">
                    <span className={`w-2 h-2 rounded-full ${staff.footerDotColor}`} />
                    <span>{staff.footerNote}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => showToast(`Configuring permissions for ${staff.name}`)}
                    className="text-primary font-bold flex items-center gap-0.5 hover:underline text-[11px] shrink-0"
                  >
                    <span>Configure</span>
                    <Icon name="tune" className="text-xs" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Branch Protection Policies */}
        <section className="space-y-3">
          <div className="flex items-center gap-2">
            <Icon name="admin_panel_settings" className="text-primary text-xl" />
            <h3 className="text-sm sm:text-base font-bold text-on-surface">Branch Protection Policies</h3>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-outline-variant/30 space-y-4">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5 text-xs">
                <span className="font-bold text-on-surface block sm:text-sm">
                  Require Medical Director Co-Sign
                </span>
                <p className="text-on-surface-variant leading-relaxed">
                  Mandatory secondary verification from Dr. Daniel James before any altered examination schema activates branch-wide.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={requireCoSign}
                  onChange={(e) => setRequireCoSign(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            <div className="h-px bg-outline-variant/20 w-full" />

            <div className="flex items-start justify-between gap-4">
              <div className="space-y-0.5 text-xs">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-on-surface sm:text-sm">Strict Schema Archival</span>
                  <span className="px-2 py-0.2 rounded bg-surface-container text-on-surface-variant font-mono text-[10px] font-bold">
                    WORM Compliant
                  </span>
                </div>
                <p className="text-on-surface-variant leading-relaxed">
                  Every draft revision creates a permanent immutable record in DHA compliance audit logs.
                </p>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={strictArchival}
                  onChange={(e) => setStrictArchival(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>
          </div>
        </section>

        {/* Global Action Trays */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => showToast('Opening staff invitation modal...')}
            className="w-full h-12 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-all"
          >
            <Icon name="person_add" className="text-lg" />
            <span>Grant Template Privilege to Staff</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => showToast('Exporting RBAC Audit Matrix PDF...')}
              className="h-12 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm border border-outline-variant/30 transition-colors"
            >
              <Icon name="description" className="text-base text-outline" />
              <span>Export Audit (PDF)</span>
            </button>

            <button
              type="button"
              onClick={() => showToast('Central Branch template permissions saved and synced with DHA directory.')}
              className="h-12 rounded-xl bg-primary hover:bg-primary/90 text-on-primary text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Icon name="check" className="text-base" />
              <span>Save Permissions</span>
            </button>
          </div>
        </div>

        {/* Footer Navigation Back to Library */}
        <div className="flex items-center justify-between pt-4 border-t border-outline-variant/30">
          <button
            type="button"
            onClick={() => navigate('/examination/templates/library')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Icon name="arrow_back" className="text-sm" />
            <span>Template Library</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/examination/workspace')}
            className="px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Icon name="dashboard" className="text-sm" />
            <span>Clinical Workspace</span>
          </button>
        </div>
      </div>
    </ExaminationShell>
  );
}

export default ClinicTemplatePermissionsScreen;

