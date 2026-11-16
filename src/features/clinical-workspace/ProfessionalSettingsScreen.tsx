import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface SettingLink {
  to: string;
  title: string;
  desc: string;
  icon: string;
}

/* §4.6 / §8.9 — one Settings destination; individual settings pages are nested inside it.
   Only existing destinations are listed (no inactive controls). */
const SETTING_GROUPS: { heading: string; icon: string; links: SettingLink[] }[] = [
  {
    heading: 'Workspace',
    icon: 'tune',
    links: [
      {
        to: '/dentist/customisation',
        title: 'Dashboard Customisation',
        desc: 'Show, hide and rearrange your dashboard widgets',
        icon: 'dashboard_customize',
      },
      {
        to: '/dentist/notifications',
        title: 'Notification Preferences',
        desc: 'Review alerts and communication in the Notifications Centre',
        icon: 'notifications',
      },
    ],
  },
  {
    heading: 'Schedule & Availability',
    icon: 'schedule',
    links: [
      {
        to: '/dentist/schedule',
        title: 'Working Schedule & Availability',
        desc: 'Roster, chairside allocation and available slots',
        icon: 'event_available',
      },
      {
        to: '/dentist/leave',
        title: 'Leave & Unavailability',
        desc: 'Plan absence and keep caseload continuity',
        icon: 'event_busy',
      },
    ],
  },
  {
    heading: 'Account',
    icon: 'account_circle',
    links: [
      {
        to: '/dentist/profile',
        title: 'Profile, Credentials & Verification',
        desc: 'Registration details, qualifications and verification status',
        icon: 'verified_user',
      },
      {
        to: '/dentist/help-support',
        title: 'Help & Support',
        desc: 'Raise a priority ticket with the DHA concierge team',
        icon: 'support_agent',
      },
    ],
  },
];

export function ProfessionalSettingsScreen() {
  return (
    <ClinicalWorkspaceShell pageTitle="Settings" badgeLabel="Personal Preferences & Workspace">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm space-y-1">
          <h2 className="text-base font-bold text-[#131b2e]">Personal settings</h2>
          <p className="text-xs text-[#707881] leading-relaxed">
            Your own preferences, schedule and account — kept separate from clinic-wide administrative
            settings, which live in the Clinic Operations workspace.
          </p>
        </div>

        {SETTING_GROUPS.map((group) => (
          <div key={group.heading} className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#707881] flex items-center gap-2">
              <Icon name={group.icon} className="text-[16px] text-[#006194]" />
              <span>{group.heading}</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {group.links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className="group flex items-start gap-3 p-4 rounded-2xl bg-white border border-[#eaedff] hover:border-[#006194]/40 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0 group-hover:bg-[#006194] group-hover:text-white transition-colors">
                    <Icon name={link.icon} className="text-[20px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-xs font-bold text-[#131b2e]">{link.title}</h4>
                    <p className="text-[11px] text-[#707881] mt-0.5 leading-relaxed">{link.desc}</p>
                  </div>
                  <Icon name="arrow_forward" className="text-[16px] text-[#707881] shrink-0 mt-1" />
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ClinicalWorkspaceShell>
  );
}
