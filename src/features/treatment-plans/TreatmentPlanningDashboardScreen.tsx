import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface PlanSummary {
  id: string;
  code: string;
  patientName: string;
  patientInitials: string;
  ageGender: string;
  dhaId: string;
  status: 'Awaiting Dentist Approval' | 'Awaiting Patient Decision' | 'In Progress' | 'Completed';
  statusColor: 'amber' | 'blue' | 'teal' | 'gray';
  priority: 'Urgent' | 'High' | 'Routine';
  priorityBadge: string;
  title: string;
  chips: string[];
  clinician: string;
  clinicianLic: string;
  grossAmount: number;
  dueAmount: number;
  dueLabel: string;
  nextAppt?: string;
  phaseInfo?: string;
  dischargedNote?: string;
}

export function TreatmentPlanningDashboardScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'signoff' | 'patient' | 'inprogress'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'urgent' | 'high' | 'routine'>('all');
  const [clinicFilter] = useState('Wuse 2 Clinic');

  const plans: PlanSummary[] = [
    {
      id: '1',
      code: '#TP-2026-089',
      patientName: 'Amara Okafor',
      patientInitials: 'AO',
      ageGender: '34y F',
      dhaId: 'DHA-2026-00451',
      status: 'Awaiting Dentist Approval',
      statusColor: 'amber',
      priority: 'Urgent',
      priorityBadge: 'Urgent (< 7 Days)',
      title: 'Mesio-Occlusal Direct Restorative & Remineralization Protocol',
      chips: ['Tooth #16 Biomimetic Composite', '#15 Fluoride Varnish', 'Perio Recare'],
      clinician: 'Dr. Daniel James',
      clinicianLic: 'DDS #DEN-48912',
      grossAmount: 1450,
      dueAmount: 290,
      dueLabel: 'Due: AED 290 (Ins. Pending)',
    },
    {
      id: '2',
      code: '#TP-2026-074',
      patientName: 'Chinedu Okafor',
      patientInitials: 'CO',
      ageGender: '41y M',
      dhaId: 'DHA-10482',
      status: 'Awaiting Patient Decision',
      statusColor: 'blue',
      priority: 'High',
      priorityBadge: 'High Priority',
      title: 'Single Tooth Endodontic Therapy & Core Build-up',
      chips: ['#16 Root Canal', 'Crown Build-up'],
      clinician: 'Dr. Daniel James',
      clinicianLic: 'DDS #DEN-48912',
      grossAmount: 3200,
      dueAmount: 640,
      dueLabel: 'Copay: AED 640',
      nextAppt: '18 Oct 2026, 10:00 GST',
    },
    {
      id: '3',
      code: '#TP-2026-062',
      patientName: 'Fatima Al-Zahra',
      patientInitials: 'FA',
      ageGender: '28y F',
      dhaId: 'DHA-08921',
      status: 'In Progress',
      statusColor: 'teal',
      priority: 'Routine',
      priorityBadge: 'Routine',
      title: 'Pre-Implant Guided Bone Regeneration & Socket Shield',
      chips: ['4 Planned Procedures', 'Healing Phase (Week 4)'],
      clinician: 'Dr. K. Al-Mansoor',
      clinicianLic: 'DDS #DEN-39104',
      grossAmount: 4800,
      dueAmount: 960,
      dueLabel: 'Copay: AED 960',
      phaseInfo: 'In Progress (Phase 2/3)',
    },
    {
      id: '4',
      code: '#TP-2026-051',
      patientName: 'Marcus Vance',
      patientInitials: 'MV',
      ageGender: '28y M',
      dhaId: 'DHA-00412',
      status: 'Completed',
      statusColor: 'gray',
      priority: 'Routine',
      priorityBadge: 'Routine',
      title: 'Comprehensive Periodontal Therapy & Occlusal Splint',
      chips: ['Full Mouth Scale & Polish', 'Custom Nightguard'],
      clinician: 'Dr. Daniel James',
      clinicianLic: 'DDS #DEN-48912',
      grossAmount: 1850,
      dueAmount: 0,
      dueLabel: 'Settled in Full',
      dischargedNote: 'Discharged • 6-Month Recall Set',
    },
  ];

  const filteredPlans = plans.filter((plan) => {
    if (activeTab === 'signoff' && plan.status !== 'Awaiting Dentist Approval') return false;
    if (activeTab === 'patient' && plan.status !== 'Awaiting Patient Decision') return false;
    if (activeTab === 'inprogress' && plan.status !== 'In Progress') return false;

    if (priorityFilter === 'urgent' && plan.priority !== 'Urgent') return false;
    if (priorityFilter === 'high' && plan.priority !== 'High') return false;
    if (priorityFilter === 'routine' && plan.priority !== 'Routine') return false;

    return true;
  });

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Planning & Follow-up"
      badgeCode="13.1"
      badgeLabel="Clinical Overview"
    >
      <div className="space-y-6">
        {/* Header Hero Banner */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#006194] mb-1.5">
                <Icon name="verified" className="text-[18px]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  DHA Clinical Workflow Engine
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#131b2e] tracking-tight">
                Treatment Planning &amp; Follow-up
              </h1>
              <p className="text-sm text-[#3f4850] mt-1 max-w-2xl">
                Centralized clinical treatment lifecycle management, multi-phase dentist approvals,
                and active patient care pathways linked to verified DHA health records.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/treatment-plans/patient-selection')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-semibold text-sm shadow-sm transition-all active:scale-[0.98]"
              >
                <Icon name="add_circle" className="text-[20px]" />
                <span>+ Create Plan</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metric Summary Carousel / Bento Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {/* Total Active Plans */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="assignment" className="text-[22px] text-[#006194]" />
              <span className="text-[10px] uppercase font-bold text-[#006194] tracking-wider">Total</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">28</div>
              <div className="text-xs text-[#707881] mt-0.5">Active Plans</div>
            </div>
          </div>

          {/* Awaiting Dentist Approval */}
          <div className="bg-[#fffbeb] rounded-2xl p-4 border border-[#fef3c7] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="pending_actions" className="text-[22px] text-amber-700" />
              <span className="bg-amber-100 text-amber-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                Action req.
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-950">4</div>
              <div className="text-xs text-amber-800 font-medium mt-0.5">Dentist Approval</div>
            </div>
          </div>

          {/* Awaiting Patient Decision */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="how_to_reg" className="text-[22px] text-[#287ab3]" />
              <span className="text-[10px] uppercase font-bold text-[#707881] tracking-wider">Pending</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">7</div>
              <div className="text-xs text-[#707881] mt-0.5">Patient Decision</div>
            </div>
          </div>

          {/* Scheduled */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="calendar_month" className="text-[22px] text-[#006194]" />
              <span className="text-[10px] uppercase font-bold text-[#707881] tracking-wider">Queue</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">19</div>
              <div className="text-xs text-[#707881] mt-0.5">Scheduled</div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="autorenew" className="text-[22px] text-[#006a61]" />
              <span className="text-[10px] uppercase font-bold text-[#006a61] tracking-wider">Active</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">12</div>
              <div className="text-xs text-[#707881] mt-0.5">In Progress</div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-2xl p-4 border border-[#eaedff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="check_circle" className="text-[22px] text-[#006a61]" />
              <span className="text-[10px] uppercase font-bold text-[#006a61] tracking-wider">Archived</span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#131b2e]">84</div>
              <div className="text-xs text-[#707881] mt-0.5">Completed</div>
            </div>
          </div>

          {/* Overdue Follow-ups */}
          <div className="col-span-2 sm:col-span-1 bg-[#fff5f5] rounded-2xl p-4 border border-[#ffdad6] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <Icon name="notification_important" className="text-[22px] text-[#ba1a1a]" />
              <span className="bg-[#ba1a1a]/15 text-[#ba1a1a] text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                Overdue
              </span>
            </div>
            <div className="mt-3">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#ba1a1a]">3</div>
              <div className="text-xs text-[#ba1a1a] font-medium mt-0.5">Follow-ups Due</div>
            </div>
          </div>
        </div>

        {/* Throughput & Acceptance Bento Strip */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#eaedff] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center">
                <Icon name="monitoring" className="text-[22px]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#131b2e]">Case Throughput &amp; Acceptance</h2>
                <p className="text-xs text-[#707881]">Monthly Clinical Volume (Q3–Q4 2026)</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#89f5e7]/40 text-[#006a61] text-xs font-bold">
                <Icon name="thumb_up" className="text-[16px]" />
                <span>88% Acceptance Rate</span>
              </div>
              <span className="text-xs text-[#707881]">+14% vs last quarter</span>
            </div>
          </div>

          {/* Visual Throughput Bar Graph */}
          <div className="grid grid-cols-3 gap-6 items-end h-28 px-4 pt-2">
            {/* Aug */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-xs font-bold text-[#707881]">32</span>
              <div className="w-full max-w-[80px] bg-[#eaedff] rounded-xl relative overflow-hidden flex items-end justify-center h-[52%]">
                <div className="w-full bg-[#93ccff]/60 h-full rounded-xl transition-all group-hover:bg-[#006194]"></div>
              </div>
              <span className="text-xs font-medium text-[#3f4850]">Aug '26</span>
            </div>

            {/* Sep */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-xs font-bold text-[#707881]">45</span>
              <div className="w-full max-w-[80px] bg-[#eaedff] rounded-xl relative overflow-hidden flex items-end justify-center h-[73%]">
                <div className="w-full bg-[#93ccff]/80 h-full rounded-xl transition-all group-hover:bg-[#006194]"></div>
              </div>
              <span className="text-xs font-medium text-[#3f4850]">Sep '26</span>
            </div>

            {/* Oct (Active) */}
            <div className="flex flex-col items-center gap-2 h-full justify-end group">
              <span className="text-xs font-bold text-[#006194]">61</span>
              <div className="w-full max-w-[80px] bg-[#eaedff] rounded-xl relative overflow-hidden flex items-end justify-center h-full">
                <div className="w-full bg-[#006194] h-full rounded-xl shadow-[0_2px_8px_rgba(0,97,148,0.3)]"></div>
              </div>
              <span className="text-xs font-bold text-[#006194]">Oct (Active)</span>
            </div>
          </div>

          {/* Average Cycle Strip */}
          <div className="mt-4 pt-3 border-t border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-[#131b2e]">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span>Average clinical sign-off cycle: <strong>22.4 hours</strong> from diagnosis generation</span>
            </div>
            <span className="font-mono text-[#006194] font-semibold">DHA Unified ClinOps Benchmark: &lt; 48 hrs</span>
          </div>
        </div>

        {/* Filter & Segmentation Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white p-2.5 rounded-2xl border border-[#eaedff] shadow-sm">
          {/* Segmented Status Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none p-1 bg-[#f2f3ff] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              All Plans (28)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('signoff')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'signoff'
                  ? 'bg-white text-amber-800 shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Sign-off (4)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('patient')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'patient'
                  ? 'bg-white text-[#006194] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Patient Dec. (7)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('inprogress')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeTab === 'inprogress'
                  ? 'bg-white text-[#006a61] shadow-xs'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              In Progress (12)
            </button>
          </div>

          {/* Priority Filter & Clinic Pills */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
            <span className="text-xs font-medium text-[#707881] shrink-0">Priority:</span>
            <div className="flex items-center gap-1 shrink-0">
              {(['all', 'urgent', 'high', 'routine'] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriorityFilter(p)}
                  className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                    priorityFilter === p
                      ? 'bg-[#006194] text-white'
                      : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="h-4 w-px bg-[#eaedff] mx-1 shrink-0"></div>

            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f2f3ff] text-xs font-medium text-[#3f4850] shrink-0">
              <Icon name="location_on" className="text-[14px] text-[#006194]" />
              <span>{clinicFilter}</span>
            </div>
          </div>
        </div>

        {/* Worklist Stream Cards */}
        <div className="space-y-4">
          {filteredPlans.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm hover:shadow-md transition-shadow overflow-hidden relative"
            >
              {/* Left Accent Stripe */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  plan.statusColor === 'amber'
                    ? 'bg-amber-500'
                    : plan.statusColor === 'blue'
                    ? 'bg-[#006194]'
                    : plan.statusColor === 'teal'
                    ? 'bg-[#006a61]'
                    : 'bg-[#707881]'
                }`}
              />

              <div className="p-4 sm:p-5 pl-5 sm:pl-6 space-y-3">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-[#f2f3ff] text-[#006194] flex items-center justify-center font-bold text-sm shrink-0">
                      {plan.patientInitials}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-[#131b2e] truncate">{plan.patientName}</h3>
                        <span className="text-xs px-2 py-0.5 rounded bg-[#f2f3ff] text-[#3f4850] font-medium">
                          {plan.ageGender}
                        </span>
                        <span className="font-mono text-xs text-[#707881]">{plan.dhaId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        plan.statusColor === 'amber'
                          ? 'bg-amber-100 text-amber-900'
                          : plan.statusColor === 'blue'
                          ? 'bg-[#cce5ff] text-[#001d31]'
                          : plan.statusColor === 'teal'
                          ? 'bg-[#89f5e7]/40 text-[#006a61]'
                          : 'bg-[#f2f3ff] text-[#707881]'
                      }`}
                    >
                      <Icon
                        name={
                          plan.statusColor === 'amber'
                            ? 'hourglass_top'
                            : plan.statusColor === 'blue'
                            ? 'person_check'
                            : plan.statusColor === 'teal'
                            ? 'progress_activity'
                            : 'task_alt'
                        }
                        className="text-[14px]"
                      />
                      <span>{plan.phaseInfo || plan.status}</span>
                    </span>
                  </div>
                </div>

                {/* Plan Content Card */}
                <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-2">
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs">
                    <span className="font-mono font-semibold text-[#006194]">{plan.code}</span>
                    <span
                      className={`inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full ${
                        plan.priority === 'Urgent'
                          ? 'bg-[#ffdad6] text-[#ba1a1a]'
                          : plan.priority === 'High'
                          ? 'bg-amber-100 text-amber-900'
                          : 'bg-white text-[#707881]'
                      }`}
                    >
                      {plan.priority === 'Urgent' && <Icon name="alarm" className="text-[13px]" />}
                      <span>{plan.priorityBadge}</span>
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-[#131b2e] leading-snug">{plan.title}</p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {plan.chips.map((chip, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2.5 py-0.5 rounded-md bg-white text-[#131b2e] border border-[#eaedff] font-medium"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Next Appointment / Discharged Banner */}
                {plan.nextAppt && (
                  <div className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-[#131b2e]">
                      <Icon name="event" className="text-[16px] text-[#006194]" />
                      <span className="font-medium">Next appt: <strong>{plan.nextAppt}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/phases')}
                      className="text-[#006194] font-semibold hover:underline"
                    >
                      Reschedule
                    </button>
                  </div>
                )}

                {plan.dischargedNote && (
                  <div className="flex items-center justify-between bg-[#f2f3ff] px-3 py-2 rounded-xl text-xs">
                    <div className="flex items-center gap-2 text-[#006a61]">
                      <Icon name="event_available" className="text-[16px]" />
                      <span className="font-semibold">{plan.dischargedNote}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/patient-overview')}
                      className="text-[#006194] font-semibold hover:underline"
                    >
                      View Chart History
                    </button>
                  </div>
                )}

                {/* Clinician, Financials & Actions Strip */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-2 text-xs text-[#3f4850]">
                    <Icon name="clinical_notes" className="text-[16px] text-[#006194]" />
                    <span>
                      Attending: <strong>{plan.clinician}</strong>{' '}
                      <span className="text-[#707881]">({plan.clinicianLic})</span>
                    </span>
                  </div>

                  <div className="flex items-baseline sm:items-end justify-between sm:justify-start gap-4">
                    <div className="text-left sm:text-right">
                      <div className="text-base font-extrabold text-[#131b2e]">
                        AED {plan.grossAmount.toLocaleString()}
                      </div>
                      <div className="text-[11px] text-[#707881]">{plan.dueLabel}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {plan.status === 'Awaiting Dentist Approval' ? (
                        <button
                          type="button"
                          onClick={() => navigate('/treatment-plans/patient-overview')}
                          className="px-4 py-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all"
                        >
                          <Icon name="verified_user" className="text-[16px]" />
                          <span>Review &amp; Approve Plan</span>
                        </button>
                      ) : plan.status === 'Awaiting Patient Decision' ? (
                        <button
                          type="button"
                          onClick={() => navigate('/treatment-plans/patient-overview')}
                          className="px-4 py-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-semibold flex items-center gap-1.5 transition-all"
                        >
                          <Icon name="send_to_mobile" className="text-[16px]" />
                          <span>Send Estimate Link</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => navigate('/treatment-plans/patient-overview')}
                          className="px-4 py-2 rounded-xl bg-[#006194]/10 hover:bg-[#006194]/20 text-[#006194] text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <span>Open Plan</span>
                          <Icon name="arrow_forward" className="text-[14px]" />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => navigate('/treatment-plans/builder')}
                        className="w-9 h-9 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] flex items-center justify-center transition-colors"
                        aria-label="Edit Plan Structure"
                      >
                        <Icon name="edit" className="text-[16px]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Statutory Clinical Notice */}
        <div className="bg-[#fffbeb] border border-[#fef3c7] rounded-2xl p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-amber-200/80 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="gavel" className="text-[20px]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-amber-950">Statutory Clinical Governance</h4>
            <p className="text-xs text-amber-900/90 leading-relaxed mt-0.5">
              Only verified dental surgeons with active license (<span className="font-mono font-medium">#DEN</span>)
              can authorize surgical, restorative, or invasive dental treatment plans. All draft items remain non-binding
              until clinical sign-off is logged in the permanent NABIDH ledger.
            </p>
          </div>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
