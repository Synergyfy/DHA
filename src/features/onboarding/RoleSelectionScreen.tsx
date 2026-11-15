import { useNavigate } from 'react-router-dom';
import { Button } from '../../design/Button';
import { ScreenHeader } from '../../design/ScreenHeader';
import { Icon } from '../../design/Primitives';
import { useToast } from '../../design/Toast';

interface RoleDefinition {
  id: 'clinician' | 'screener' | 'partner';
  icon: string;
  tag: string;
  tagClass: string;
  iconClass: string;
  title: string;
  description: string;
  features: { icon: string; label: string; iconClass: string }[];
  cta: string;
  ctaClass: string;
}

const ROLES: RoleDefinition[] = [
  {
    id: 'clinician',
    icon: 'medical_services',
    tag: 'Licensed Practice',
    tagClass: 'bg-primary-fixed text-primary',
    iconClass: 'bg-primary-fixed text-primary',
    title: 'Dentist / Clinician',
    description:
      'Connect licensed clinic odontogram, verify diagnostic charts, access patient Lifecodes, and submit formal treatment plans directly to DHA.',
    features: [
      { icon: 'dentistry', label: 'Digital Odontogram', iconClass: 'text-primary' },
      { icon: 'fingerprint', label: 'Identity Verification', iconClass: 'text-secondary' },
      { icon: 'qr_code_scanner', label: 'Lifecode Scan', iconClass: 'text-tertiary' },
    ],
    cta: 'Continue as Clinician',
    ctaClass: 'bg-primary text-on-primary active:bg-primary-container',
  },
  {
    id: 'screener',
    icon: 'fact_check',
    tag: 'Field & Outreach',
    tagClass: 'bg-secondary-fixed text-secondary',
    iconClass: 'bg-secondary-fixed text-secondary',
    title: 'School & Community Screener',
    description:
      'Conduct rapid oral health examinations in schools, mobile screening clinics, and local community camps with offline-first synchronization.',
    features: [
      { icon: 'groups', label: 'Batch Student Screening', iconClass: 'text-secondary' },
      { icon: 'directions_bus', label: 'Mobile Van Sync', iconClass: 'text-primary' },
      { icon: 'child_care', label: 'Pediatric Sealant Log', iconClass: 'text-tertiary' },
    ],
    cta: 'Continue as Screener',
    ctaClass: 'bg-secondary text-on-secondary active:opacity-90',
  },
  {
    id: 'partner',
    icon: 'domain',
    tag: 'Network Administration',
    tagClass: 'bg-tertiary-fixed text-tertiary',
    iconClass: 'bg-tertiary-fixed text-tertiary',
    title: 'Clinic & Hospital Partner',
    description:
      'Enterprise facility administration, staff rosters, appointment operations and practitioner license management for participating organisations.',
    features: [
      { icon: 'hub', label: 'Multi-Clinic Oversight', iconClass: 'text-tertiary' },
      { icon: 'sync_alt', label: 'Interoperability API', iconClass: 'text-primary' },
      { icon: 'badge', label: 'Staff Roster', iconClass: 'text-secondary' },
    ],
    cta: 'Continue as Partner',
    ctaClass: 'bg-tertiary text-on-tertiary active:bg-tertiary-container',
  },
];

const ROLE_TOAST: Record<RoleDefinition['id'], string> = {
  clinician: 'Clinician portal is not part of this patient-facing release',
  screener: 'Screener portal is not part of this patient-facing release',
  partner: 'Clinic partner portal is not part of this patient-facing release',
};

/**
 * Select Your Role — healthcare & partner portals.
 * Route: `/join-role`
 *
 * Entry point only. Parts B/C/D of the platform (clinical, clinic and
 * administration portals) are outside the current patient-facing scope, so
 * selecting a role explains that rather than simulating a portal it must not
 * invent.
 */
export function RoleSelectionScreen() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  return (
    <div className="min-h-dvh bg-surface pb-safe">
      <ScreenHeader title="Select Your Role" />

      <main className="mx-auto flex w-full max-w-content flex-col pt-header md:px-gutter-tablet lg:px-gutter-desktop xl:max-w-[80rem]">
        {/* Intro */}
        <div className="flex max-w-3xl flex-col gap-space-xs px-margin pb-space-lg pt-space-md md:px-0">
          <span className="inline-flex items-center gap-space-2xs self-start rounded-full bg-secondary-container px-space-sm py-space-2xs">
            <Icon name="verified" className="text-[14px]" />
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-secondary-container">
              DHA Health Network &bull; Professional Portals
            </span>
          </span>
          <div className="mt-space-2xs">
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Select Your Professional Role
            </h2>
            <p className="mt-space-2xs font-body-md text-body-md leading-relaxed text-on-surface-variant">
              Access licensed diagnostic charting, school screening field sync, and partner
              administration across the DHA network.
            </p>
          </div>
          <div className="mt-space-xs flex items-center gap-space-sm rounded-xl bg-surface-container-low p-space-sm">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-fixed">
              <Icon name="lock" className="text-[18px] text-primary" />
            </div>
            <p className="min-w-0 font-body-sm text-body-sm text-on-surface-variant">
              Professional verification and clinic authorisation are required before clinical access
              is granted.
            </p>
          </div>
        </div>

        {/* Role cards */}
        <div className="grid grid-cols-1 gap-space-md px-margin pb-space-xl md:grid-cols-2 md:px-0 lg:grid-cols-3 xl:gap-space-lg">
          {ROLES.map((role) => (
            <div
              key={role.id}
              className="group relative flex flex-col rounded-xl bg-surface-container-lowest p-space-md shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex items-center gap-space-sm">
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl shadow-sm ${role.iconClass}`}
                  >
                    <Icon name={role.icon} className="text-[26px]" />
                  </div>
                  <div>
                    <span
                      className={`inline-block rounded px-space-xs py-[2px] font-label-sm text-label-sm uppercase ${role.tagClass}`}
                    >
                      {role.tag}
                    </span>
                    <h3 className="mt-space-2xs font-title-md text-title-md text-on-surface">
                      {role.title}
                    </h3>
                  </div>
                </div>
                <Icon
                  name="chevron_right"
                  className="text-[20px] text-outline-variant transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </div>

              <p className="mt-space-sm font-body-md text-body-md leading-relaxed text-on-surface-variant">
                {role.description}
              </p>

              <div className="mt-space-md flex flex-wrap gap-space-xs">
                {role.features.map((feature) => (
                  <span
                    key={feature.label}
                    className="inline-flex items-center gap-1 rounded-lg bg-surface-container px-space-xs py-[3px] font-label-md text-label-md text-on-surface-variant"
                  >
                    <Icon name={feature.icon} className={`text-[14px] ${feature.iconClass}`} />
                    {feature.label}
                  </span>
                ))}
              </div>

              <div className="mt-auto pt-space-md">
                <Button
                  size="lg"
                  onClick={() => showToast(ROLE_TOAST[role.id])}
                  className={role.ctaClass}
                  icon={<Icon name="arrow_forward" className="text-[18px]" />}
                >
                  {role.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Helper + footer */}
        <div className="mt-auto flex flex-col items-center gap-space-md px-margin pb-space-xl text-center md:px-0">
          <div className="flex w-full flex-col items-center justify-center gap-space-xs rounded-xl bg-surface-container p-space-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Looking for patient or child oral screening records?
            </p>
            <button
              type="button"
              onClick={() => navigate('/onboarding/get-started')}
              className="inline-flex items-center gap-1 font-title-sm text-title-sm text-primary transition-colors hover:text-primary-container"
            >
              <span>Return to Patient Onboarding</span>
              <Icon name="east" className="text-[16px]" />
            </button>
          </div>

          <div className="flex max-w-xs items-center gap-space-2xs text-outline">
            <Icon name="policy" className="shrink-0 text-[16px] text-secondary" />
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              Professional verification and clinic authorisation are separate checks — both are
              required before private clinical access.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
