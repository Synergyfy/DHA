import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

export function ProfessionalDashboardScreen() {
  const navigate = useNavigate();

  // State
  const [activeRole, setActiveRole] = useState('General Dentist');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'morning' | 'afternoon'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const roles = ['General Dentist', 'Orthodontist', 'Therapist', 'Hygienist'];

  const metrics = [
    {
      id: 'm-1',
      title: "Today's Appts",
      value: '8',
      badge: '1 Chairside',
      badgeColor: 'text-[#006a61]',
      sub: '3 Done • 4 Left',
      icon: 'calendar_today',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#cce5ff]/50',
      hasBar: true,
    },
    {
      id: 'm-2',
      title: 'Patients This Week',
      value: '14',
      badge: '+12%',
      badgeColor: 'text-[#006a61]',
      sub: 'vs 12 prev. cycle',
      icon: 'groups',
      iconColor: 'text-[#006a61]',
      iconBg: 'bg-[#86f2e4]/30',
      hasTrend: true,
    },
    {
      id: 'm-3',
      title: 'Pending Tasks',
      value: '6',
      badge: '2 Urgent',
      badgeColor: 'text-[#ba1a1a]',
      sub: 'Action Required',
      icon: 'assignment_late',
      iconColor: 'text-[#ba1a1a]',
      iconBg: 'bg-[#ffdad6]/50',
    },
    {
      id: 'm-4',
      title: 'Follow-ups Due',
      value: '3',
      sub: 'Recare Audits active',
      icon: 'update',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#f2f3ff]',
    },
    {
      id: 'm-5',
      title: 'Exams Completed',
      value: '5',
      sub: 'Verified records today',
      icon: 'fact_check',
      iconColor: 'text-[#006194]',
      iconBg: 'bg-[#cce5ff]/40',
    },
    {
      id: 'm-6',
      title: 'In Progress',
      value: '11',
      sub: 'Protocol plans',
      icon: 'healing',
      iconColor: 'text-[#3f4850]',
      iconBg: 'bg-[#f2f3ff]',
    },
  ];

  const quickActions = [
    { label: 'Screening', hint: 'Outreach', icon: 'screen_search_desktop', to: '/screening/identification', color: 'text-[#006194]', bg: 'bg-[#cce5ff]/40' },
    { label: 'New Exam', hint: 'Clinical', icon: 'clinical_notes', to: '/dentist/patient-overview', color: 'text-[#006a61]', bg: 'bg-[#86f2e4]/30' },
    { label: 'Odontogram', hint: 'Charting', icon: 'dentistry', to: '/dentist/patient-overview', color: 'text-[#006194]', bg: 'bg-[#f2f3ff]' },
    { label: 'Dexis X-Ray', hint: 'Imaging', icon: 'radiology', to: '/dentist/patient-overview', color: 'text-[#3f4850]', bg: 'bg-[#eaedff]' },
    { label: 'AI Summary', hint: 'Insights', icon: 'neurology', to: '/dentist/activity-overview', color: 'text-[#006194]', bg: 'bg-[#cce5ff]/30' },
    { label: 'Tx Plans', hint: 'Planning', icon: 'format_list_bulleted_add', to: '/dentist/patient-overview', color: 'text-[#006a61]', bg: 'bg-[#86f2e4]/30' },
    { label: 'Referrals', hint: 'Network', icon: 'share_location', to: '/dentist/patients', color: 'text-[#3f4850]', bg: 'bg-[#f2f3ff]' },
    { label: 'Find Patient', hint: 'Lookup', icon: 'person_search', to: '/dentist/patient-search', color: 'text-[#006194]', bg: 'bg-[#e2e7ff]' },
  ];

  const appointments = [
    {
      id: 'apt-1',
      time: '09:30 AM',
      period: 'morning',
      patient: 'Marcus Vance',
      demographics: '28y M',
      dhaId: 'DHA-00412',
      status: 'Completed',
      statusColor: 'bg-[#86f2e4]/30 text-[#006f66]',
      icon: 'check_circle',
      title: '6-Mo Periodontal Recare • Post-op normal',
    },
    {
      id: 'apt-2',
      time: '10:30 AM',
      period: 'morning',
      patient: 'Amara Okafor',
      demographics: '34y F',
      dhaId: 'DHA-2026-00451',
      status: 'In Operatory',
      statusColor: 'bg-[#006194] text-white animate-pulse',
      icon: 'chair',
      title: 'Mesio-Occlusal Direct Biomimetic Resin #16',
      toothTag: 'Tooth #16',
      isActiveChair: true,
    },
    {
      id: 'apt-3',
      time: '11:30 AM',
      period: 'morning',
      patient: 'Fatima Bello',
      demographics: '28y F',
      dhaId: 'DHA-08921',
      status: 'Confirmed',
      statusColor: 'bg-[#f2f3ff] text-[#3f4850]',
      title: 'Guided Bone Regeneration Healing Audit',
    },
    {
      id: 'apt-4',
      time: '02:00 PM',
      period: 'afternoon',
      patient: 'Chinedu Okafor',
      demographics: '41y M',
      dhaId: 'DHA-10482',
      status: 'Confirmed',
      statusColor: 'bg-[#f2f3ff] text-[#3f4850]',
      title: 'Post-Endo Obturation Review',
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    if (scheduleFilter === 'all') return true;
    return apt.period === scheduleFilter;
  });

  return (
    <ClinicalWorkspaceShell
      pageTitle="Professional Dashboard"
      badgeCode="14.1"
      badgeLabel="Practitioner Command"
      activeNav="dashboard"
    >
      <div className="space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Dr. Profile & Live Status Banner */}
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#eaedff] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 rounded-full bg-[#cce5ff]/50 text-[#006194] font-bold text-lg flex items-center justify-center ring-2 ring-[#eaedff]">
                  DJ
                </div>
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#006a61] rounded-full ring-2 ring-white"></span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                    Good morning, Dr. James
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4]/50">
                    <Icon name="verified" className="text-[13px] text-[#006a61]" />
                    DHA Verified
                  </span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">
                  Restorative Odontology & Prosthodontics • License #DEN-48912 • Harmony Dental
                </p>
              </div>
            </div>

            {/* Operatory Pulse Alert Pill */}
            <div className="flex items-center justify-between gap-3 bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff]">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a61] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#006a61]"></span>
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#131b2e] truncate">
                    Operatory 02 Active
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">
                    In Chair: Amara Okafor (22m)
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => navigate('/dentist/appointment-details')}
                className="shrink-0 bg-[#006194] hover:bg-[#004b73] text-white transition-colors px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs"
              >
                <span>Open Op</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </div>

          {/* Role Switcher Tabs */}
          <div className="mt-4 pt-4 border-t border-[#eaedff] flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-xs text-[#707881] font-semibold shrink-0 mr-1">Active Role:</span>
            {roles.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setActiveRole(r);
                  showToast(`Switched active clinician role to ${r}.`);
                }}
                className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold transition-all border ${
                  activeRole === r
                    ? 'bg-[#006194] text-white border-[#006194] shadow-xs'
                    : 'bg-[#faf8ff] text-[#3f4850] border-[#eaedff] hover:bg-[#f2f3ff]'
                }`}
              >
                {r === 'General Dentist' && <Icon name="dentistry" className="text-[13px] mr-1 inline" />}
                <span>{r}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Metric Summary Bento Grid (6 cards) */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#131b2e]">Clinical Flow Metrics</h2>
            <span className="text-xs text-[#707881]">Live Sync 10:15 AM</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {metrics.map((m) => (
              <div
                key={m.id}
                className="bg-white p-4 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col justify-between hover:border-[#bfc7d2] transition-colors space-y-2"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs text-[#707881] font-medium leading-tight">
                    {m.title}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-lg ${m.iconBg} flex items-center justify-center shrink-0 ${m.iconColor}`}
                  >
                    <Icon name={m.icon} className="text-[16px]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-bold text-[#131b2e]">{m.value}</span>
                    {m.badge && (
                      <span className={`text-[11px] font-bold ${m.badgeColor}`}>{m.badge}</span>
                    )}
                  </div>
                  {m.hasBar && (
                    <div className="w-full bg-[#eaedff] rounded-full h-1.5 mt-2 flex overflow-hidden">
                      <div className="bg-[#006a61] h-full" style={{ width: '37.5%' }}></div>
                      <div className="bg-[#006194] h-full" style={{ width: '12.5%' }}></div>
                      <div className="bg-[#dae2fd] h-full" style={{ width: '50%' }}></div>
                    </div>
                  )}
                  <p className="text-[11px] text-[#707881] mt-1 truncate">{m.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quick Clinical Actions Fast Track */}
        <section className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-base font-bold text-[#131b2e]">Clinical Fast Track</h2>
            <span className="text-xs text-[#006194] font-semibold">8 Clinical Modules</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {quickActions.map((qa) => (
              <button
                key={qa.label}
                type="button"
                onClick={() => navigate(qa.to)}
                className="bg-white p-3 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col items-center text-center gap-1.5 hover:bg-[#f2f3ff] hover:border-[#bfc7d2] transition-all group"
              >
                <div
                  className={`w-11 h-11 rounded-xl ${qa.bg} flex items-center justify-center ${qa.color} group-hover:scale-105 transition-transform`}
                >
                  <Icon name={qa.icon} className="text-[22px]" />
                </div>
                <span className="text-xs font-bold text-[#131b2e] leading-tight mt-0.5">
                  {qa.label}
                </span>
                <span className="text-[10px] text-[#707881] font-medium">{qa.hint}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Responsive 2-Column Split: Today's Schedule on Left (7 cols), Tasks Queue & Volume Trend on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Today's Schedule */}
          <section className="lg:col-span-7 bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-[#131b2e]">Today's Operatory Schedule</h2>
                <p className="text-xs text-[#707881]">Operatory 02 • Restorative Suite</p>
              </div>
              {/* Segmented Morning/Afternoon Filter */}
              <div className="grid grid-cols-3 gap-1 bg-[#f2f3ff] p-1 rounded-xl border border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setScheduleFilter('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    scheduleFilter === 'all'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  All (4)
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleFilter('morning')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    scheduleFilter === 'morning'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  AM (3)
                </button>
                <button
                  type="button"
                  onClick={() => setScheduleFilter('afternoon')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    scheduleFilter === 'afternoon'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  PM (1)
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredAppointments.map((apt) => (
                <div
                  key={apt.id}
                  className={`rounded-2xl p-4 border transition-all ${
                    apt.isActiveChair
                      ? 'bg-gradient-to-br from-[#cce5ff]/20 to-white border-[#006194] shadow-sm ring-1 ring-[#006194]/20'
                      : 'bg-[#faf8ff] border-[#eaedff] hover:bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="font-mono text-xs font-bold text-[#131b2e]">{apt.time}</span>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${apt.statusColor}`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-[#707881]">{apt.dhaId}</span>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#131b2e]">{apt.patient}</span>
                        <span className="text-xs text-[#707881]">({apt.demographics})</span>
                        {apt.toothTag && (
                          <span className="px-1.5 py-0.2 rounded bg-[#e2e7ff] text-[#006194] text-[10px] font-bold">
                            {apt.toothTag}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#3f4850] mt-0.5">{apt.title}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate('/dentist/appointment-details')}
                      className="p-1.5 rounded-lg hover:bg-white text-[#707881] hover:text-[#006194] transition-colors"
                    >
                      <Icon name="chevron_right" className="text-[20px]" />
                    </button>
                  </div>

                  {apt.isActiveChair && (
                    <div className="mt-3 pt-2.5 border-t border-[#eaedff] flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => navigate('/treatment-plans/progress-workspace')}
                        className="flex-1 h-9 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                      >
                        <Icon name="record_voice_over" className="text-[16px]" />
                        <span>Open Clinical Workspace</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => navigate('/investigations/dashboard')}
                        className="h-9 px-3 bg-white hover:bg-[#f2f3ff] text-[#006194] rounded-xl text-xs font-bold flex items-center justify-center gap-1 border border-[#eaedff] transition-colors"
                      >
                        <Icon name="radiology" className="text-[16px]" />
                        <span>X-Ray</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 text-center border-t border-[#eaedff]">
              <button
                type="button"
                onClick={() => navigate('/dentist/appointments-list')}
                className="text-xs text-[#006194] hover:underline font-bold inline-flex items-center gap-1"
              >
                <span>View Full Day Schedule Timeline (14.4)</span>
                <Icon name="arrow_forward" className="text-[14px]" />
              </button>
            </div>
          </section>

          {/* Right Column (5 cols): Action Tasks Queue & Volume Trend Chart */}
          <div className="lg:col-span-5 space-y-6">
            {/* Action Tasks Priority Queue */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-[#131b2e]">Action Tasks Queue</h2>
                  <span className="w-5 h-5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => showToast('Navigating to Tasks & Work Queue')}
                  className="text-xs text-[#006194] font-semibold hover:underline"
                >
                  View All 6 Tasks →
                </button>
              </div>

              <div className="space-y-3">
                {/* Task 1 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="priority_high" className="text-[16px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">
                        Approve Plan #TP-2026-089
                      </p>
                      <p className="text-[11px] text-[#707881] truncate">
                        Amara Okafor • Treatment Planning
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[#ba1a1a] text-[10px] font-bold">Urgent (&lt; 7d)</span>
                        <span className="text-[10px] text-[#707881]">• Due Today</span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/treatment-plans/dentist-approval')}
                    className="shrink-0 bg-[#006194] hover:bg-[#004b73] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-xs"
                  >
                    Sign
                  </button>
                </div>

                {/* Task 2 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon name="photo_camera" className="text-[16px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">
                        Review Bitewing Dexis BW-R-1048
                      </p>
                      <p className="text-[11px] text-[#707881] truncate">
                        Interproximal Caries Audit • Investigations
                      </p>
                      <span className="text-[#006194] text-[10px] font-bold block mt-1">
                        High Priority
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/investigations/dashboard')}
                    className="shrink-0 bg-white hover:bg-[#eaedff] text-[#131b2e] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#eaedff] transition-colors"
                  >
                    Audit
                  </button>
                </div>

                {/* Task 3 */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#eaedff] flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-lg bg-[#faf8ff] text-[#707881] flex items-center justify-center shrink-0 mt-0.5 border border-[#eaedff]">
                      <Icon name="help_center" className="text-[16px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#131b2e] truncate">
                        Clarification #14 Fixture Spec
                      </p>
                      <p className="text-[11px] text-[#707881] truncate">
                        Straumann Bone Level • Sec 13.24
                      </p>
                      <span className="text-[#707881] text-[10px] block mt-1">Standard</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast('Reply thread dispatched to restorative lab.')}
                    className="shrink-0 bg-white hover:bg-[#eaedff] text-[#131b2e] px-3 py-1.5 rounded-lg text-xs font-bold border border-[#eaedff] transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            </section>

            {/* Professional Activity Trend Chart */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-bold text-[#131b2e]">Clinical Volume Trend</h2>
                  <p className="text-xs text-[#707881]">Mon – Fri • 38 Total Encounters</p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-[#cce5ff]/40 text-[#004b73] text-[11px] font-bold">
                  Target: 35/wk
                </span>
              </div>

              {/* Sparkline Curve Chart */}
              <div className="w-full">
                <svg className="w-full h-24 overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 80">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" stopColor="#006194" stopOpacity="0.3"></stop>
                      <stop offset="100%" stopColor="#006194" stopOpacity="0.0"></stop>
                    </linearGradient>
                  </defs>
                  <line stroke="#eaedff" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="320" y1="20" y2="20"></line>
                  <line stroke="#eaedff" strokeDasharray="3,3" strokeWidth="1" x1="0" x2="320" y1="50" y2="50"></line>
                  <polygon fill="url(#chartGradient)" points="10,65 10,48 85,32 160,54 235,18 310,26 310,65"></polygon>
                  <polyline fill="none" points="10,48 85,32 160,54 235,18 310,26" stroke="#006194" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></polyline>
                  <circle cx="10" cy="48" fill="#faf8ff" r="3.5" stroke="#006194" strokeWidth="2"></circle>
                  <circle cx="85" cy="32" fill="#faf8ff" r="3.5" stroke="#006194" strokeWidth="2"></circle>
                  <circle cx="160" cy="54" fill="#faf8ff" r="3.5" stroke="#006194" strokeWidth="2"></circle>
                  <circle cx="235" cy="18" fill="#006194" r="4.5" stroke="#faf8ff" strokeWidth="2"></circle>
                  <circle cx="310" cy="26" fill="#faf8ff" r="3.5" stroke="#006194" strokeWidth="2"></circle>
                </svg>

                <div className="flex justify-between text-center pt-2 px-1 text-xs text-[#707881]">
                  <div><span>Mon</span><span className="text-[10px] block text-[#707881]">6</span></div>
                  <div><span>Tue</span><span className="text-[10px] block text-[#707881]">9</span></div>
                  <div><span>Wed</span><span className="text-[10px] block text-[#707881]">5</span></div>
                  <div><span className="text-[#006194] font-bold">Thu</span><span className="text-[10px] block text-[#006194] font-bold">10</span></div>
                  <div><span>Fri</span><span className="text-[10px] block text-[#707881]">8</span></div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Dashboard Customisation CTA Link */}
        <section className="pt-2">
          <button
            type="button"
            onClick={() => navigate('/dentist/customisation')}
            className="w-full bg-white hover:bg-[#f2f3ff] text-[#006194] p-4 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 border border-[#eaedff] transition-colors shadow-xs"
          >
            <Icon name="tune" className="text-[18px]" />
            <span>Customise Dashboard Layout & Action Dock (14.2)</span>
          </button>
        </section>
      </div>
    </ClinicalWorkspaceShell>
  );
}
