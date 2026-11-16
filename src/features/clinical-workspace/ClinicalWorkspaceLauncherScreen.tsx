import { NavLink } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface ModuleCard {
  to: string;
  title: string;
  desc: string;
  icon: string;
  section: 'clinical' | 'team';
}

/* §4.4 / §8.5 — Clinical Workspace is a module launcher, not one sidebar item per module.
   These cards open the existing DHA clinical modules (no duplicated modules). */
const CLINICAL_MODULES: ModuleCard[] = [
  {
    to: '/screening/dashboard',
    title: 'Quick Screening',
    desc: 'Outreach intake, consent, findings and triage',
    icon: 'person_search',
    section: 'clinical',
  },
  {
    to: '/odontogram/overview',
    title: 'Odontogram & Tooth Findings',
    desc: 'Tooth chart, imaging and oral findings',
    icon: 'dentistry',
    section: 'clinical',
  },
  {
    to: '/examination/workspace',
    title: 'Detailed Clinical Examination',
    desc: 'Full exam workspace, history and templates',
    icon: 'clinical_notes',
    section: 'clinical',
  },
  {
    to: '/investigations/dashboard',
    title: 'Investigations & Clinical Documents',
    desc: 'Requests, uploads, results and interpretation',
    icon: 'radiology',
    section: 'clinical',
  },
  {
    to: '/summaries/dashboard',
    title: 'Clinical Summary & AI Assistance',
    desc: 'AI synthesis, review and approval',
    icon: 'auto_awesome',
    section: 'clinical',
  },
  {
    to: '/treatment-plans/dashboard',
    title: 'Treatment Planning & Follow-up',
    desc: 'Plans, consent, costs and appointments',
    icon: 'format_list_bulleted',
    section: 'clinical',
  },
  {
    to: '/dentist/collaboration',
    title: 'Collaboration Workspace',
    desc: 'Interdisciplinary MDT and peer review',
    icon: 'groups_2',
    section: 'team',
  },
  {
    to: '/dentist/second-opinions',
    title: 'Clinical Review & Second Opinions',
    desc: 'Request and manage peer consultations',
    icon: 'rate_review',
    section: 'team',
  },
  {
    to: '/dentist/patient-comms',
    title: 'Patient Messages',
    desc: 'SafeLink clinical messaging',
    icon: 'forum',
    section: 'team',
  },
  {
    to: '/dentist/resources',
    title: 'Clinical Resources',
    desc: 'Knowledge hub and announcements',
    icon: 'article',
    section: 'team',
  },
];

const RECENT_RECORDS = [
  { name: 'Amara Okafor', meta: 'DHA-2026-00451 • Exam draft in progress', to: '/dentist/patient-overview' },
  { name: 'Chinedu Okafor', meta: 'DHA-10482 • Investigation result awaiting review', to: '/dentist/patient-overview' },
  { name: 'Amina Yusuf', meta: 'DHA-000245 • Treatment plan awaiting approval', to: '/dentist/patient-overview' },
];

export function ClinicalWorkspaceLauncherScreen() {
  const clinical = CLINICAL_MODULES.filter((m) => m.section === 'clinical');
  const team = CLINICAL_MODULES.filter((m) => m.section === 'team');

  return (
    <ClinicalWorkspaceShell pageTitle="Clinical Workspace" badgeLabel="Clinical Module Launcher">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Intro */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-bold text-[#131b2e]">Where do I do my clinical work?</h2>
            <p className="text-xs text-[#707881] leading-relaxed">
              Open an authorised clinical module below, or continue a record from your recent activity.
              Module access follows your verification, clinic affiliation and role permissions.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <NavLink
              to="/dentist/work-queue"
              className="px-4 py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#006194] text-xs font-bold flex items-center gap-2 transition-colors"
            >
              <Icon name="assignment_turned_in" className="text-[16px]" />
              <span>Pending Tasks (4)</span>
            </NavLink>
            <NavLink
              to="/dentist/patients"
              className="px-4 py-2.5 rounded-xl bg-[#006194] hover:bg-[#004e77] text-white text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
            >
              <Icon name="groups" className="text-[16px]" />
              <span>Find a Patient</span>
            </NavLink>
          </div>
        </div>

        {/* Clinical modules */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#707881] flex items-center gap-2">
            <Icon name="medical_services" className="text-[16px] text-[#006194]" />
            <span>Clinical Modules</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clinical.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className="group p-4 rounded-2xl bg-white border border-[#eaedff] hover:border-[#006194]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0 group-hover:bg-[#006194] group-hover:text-white transition-colors">
                    <Icon name={m.icon} className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-[#131b2e] leading-snug">{m.title}</h4>
                    <p className="text-[11px] text-[#707881] mt-0.5 leading-relaxed">{m.desc}</p>
                  </div>
                </div>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Team & communication */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#707881] flex items-center gap-2">
            <Icon name="groups_2" className="text-[16px] text-[#006194]" />
            <span>Team &amp; Communication</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {team.map((m) => (
              <NavLink
                key={m.to}
                to={m.to}
                className="group p-4 rounded-2xl bg-white border border-[#eaedff] hover:border-[#006194]/40 hover:shadow-md transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center mb-2 group-hover:bg-[#006194] group-hover:text-white transition-colors">
                  <Icon name={m.icon} className="text-[18px]" />
                </div>
                <h4 className="text-xs font-bold text-[#131b2e] leading-snug">{m.title}</h4>
                <p className="text-[11px] text-[#707881] mt-0.5 leading-relaxed">{m.desc}</p>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Recent records & shortcuts */}
        <div className="grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
                <Icon name="history" className="text-[18px] text-[#006194]" />
                <span>Recently Opened Records</span>
              </h3>
              <NavLink to="/dentist/patients" className="text-xs text-[#006194] font-semibold hover:underline">
                All patients →
              </NavLink>
            </div>
            <div className="space-y-2">
              {RECENT_RECORDS.map((r) => (
                <NavLink
                  key={r.name}
                  to={r.to}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] hover:bg-[#f2f3ff] transition-colors"
                >
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#131b2e]">{r.name}</div>
                    <div className="text-[11px] text-[#707881] truncate">{r.meta}</div>
                  </div>
                  <Icon name="arrow_forward" className="text-[16px] text-[#006194] shrink-0" />
                </NavLink>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-[#eaedff] p-6 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="task_alt" className="text-[18px] text-[#006194]" />
              <span>Pending Clinical Work</span>
            </h3>
            <div className="space-y-2 text-xs">
              <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                <div className="font-bold text-[#131b2e]">Investigation result awaiting review</div>
                <div className="text-[11px] text-[#707881] mt-0.5">Chinedu Okafor • due today</div>
              </div>
              <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                <div className="font-bold text-[#131b2e]">Examination record awaiting completion</div>
                <div className="text-[11px] text-[#707881] mt-0.5">Amara Okafor • due tomorrow</div>
              </div>
              <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff]">
                <div className="font-bold text-[#131b2e]">Treatment plan awaiting approval</div>
                <div className="text-[11px] text-[#707881] mt-0.5">Amina Yusuf • 2 days</div>
              </div>
            </div>
            <NavLink
              to="/dentist/work-queue"
              className="w-full py-2.5 rounded-xl bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#006194] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="assignment_turned_in" className="text-[16px]" />
              <span>Open My Tasks</span>
            </NavLink>
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
