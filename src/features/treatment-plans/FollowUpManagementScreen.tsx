import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

type FilterType = 'all' | 'overdue' | 'due-soon' | 'scheduled' | 'preventative';

interface FollowUpCard {
  id: string;
  patientName: string;
  ageGender: string;
  dhaId: string;
  avatar: string;
  status: 'due-soon' | 'overdue' | 'scheduled' | 'preventative';
  statusLabel: string;
  statusColor: string;
  title: string;
  toothOrPhase: string;
  planRef: string;
  dueDate: string;
  dueCountdown?: string;
  clinician: string;
  scheduledTime?: string;
  operatory?: string;
}

export function FollowUpManagementScreen() {
  const navigate = useNavigate();

  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const queueCards: FollowUpCard[] = [
    {
      id: 'FOL-001',
      patientName: 'Amara Okafor',
      ageGender: '34y F',
      dhaId: 'DHA-2026-00451',
      avatar: 'AO',
      status: 'due-soon',
      statusLabel: 'Due Soon',
      statusColor: 'bg-primary/10 text-[#006194] border border-blue-200',
      title: '2-Wk Post-Op Margin & Sensitivity Check',
      toothOrPhase: 'Tooth #16',
      planRef: '#TP-2026-089 (Phase 1 acute restorative)',
      dueDate: '02 Nov 2026',
      dueCountdown: 'In 15 days',
      clinician: 'Dr. Daniel James',
    },
    {
      id: 'FOL-002',
      patientName: 'Chinedu Okafor',
      ageGender: '41y M',
      dhaId: 'DHA-10482',
      avatar: 'CO',
      status: 'overdue',
      statusLabel: '6 Days Overdue',
      statusColor: 'bg-red-100 text-red-800 border border-red-200',
      title: 'Post-Endo Obturation Vitality & Margins',
      toothOrPhase: 'Tooth #16',
      planRef: '#TP-2026-012 (Endodontic therapy)',
      dueDate: '12 Oct 2026',
      dueCountdown: '6 days overdue',
      clinician: 'Dr. Daniel James',
    },
    {
      id: 'FOL-003',
      patientName: 'Fatima Bello',
      ageGender: '28y F',
      dhaId: 'DHA-08921',
      avatar: 'FA',
      status: 'scheduled',
      statusLabel: 'Confirmed',
      statusColor: 'bg-teal-100 text-teal-800 border border-teal-200',
      title: 'Guided Bone Regeneration Healing Audit',
      toothOrPhase: 'Week 4 Assessment',
      planRef: '#TP-2026-054 (Implant Stage 1)',
      dueDate: '22 Oct 2026',
      scheduledTime: '11:30 AM',
      operatory: 'Operatory 03',
      clinician: 'Dr. K. Okoye',
    },
    {
      id: 'FOL-004',
      patientName: 'Marcus Vance',
      ageGender: '28y M',
      dhaId: 'DHA-00412',
      avatar: 'MV',
      status: 'preventative',
      statusLabel: 'Preventative Recare',
      statusColor: 'bg-slate-100 text-slate-700 border border-slate-200',
      title: '6-Mo Periodontal Recare & Splint Check',
      toothOrPhase: 'Full Arch Recare',
      planRef: '#TP-2025-099 (Perio Maintenance)',
      dueDate: 'April 2027',
      clinician: 'Dr. Daniel James',
    },
  ];

  const filteredCards = useMemo(() => {
    return queueCards.filter((card) => {
      const matchFilter = currentFilter === 'all' || card.status === currentFilter;
      const q = searchQuery.trim().toLowerCase();
      const matchQuery =
        !q ||
        card.patientName.toLowerCase().includes(q) ||
        card.dhaId.toLowerCase().includes(q) ||
        card.toothOrPhase.toLowerCase().includes(q) ||
        card.title.toLowerCase().includes(q);
      return matchFilter && matchQuery;
    });
  }, [currentFilter, searchQuery, queueCards]);

  return (
    <TreatmentPlanShell
      pageTitle="Follow-up Management"
      badgeCode="13.20"
      badgeLabel="Clinical Recall Queue"
      currentStep="13.20"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#283044] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-700 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Create Follow-up Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-bold text-base text-slate-900">Create Clinical Follow-up Mandate</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <Icon name="close" className="text-xl" />
              </button>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Define follow-up clinical reason, target tooth / quadrant, and due date window under DHA Clinical Governance Standard §13.
            </p>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Target Patient</label>
                <input
                  type="text"
                  defaultValue="Amara Okafor (DHA-2026-00451)"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Procedure / Tooth</label>
                <input
                  type="text"
                  defaultValue="Tooth #16 Post-Restorative Vitality Check"
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Interval Window</label>
                  <select className="w-full h-10 px-2 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <option>14-Day Post-Op</option>
                    <option>30-Day Check</option>
                    <option>3-Month Healing</option>
                    <option>6-Month Recare</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Target Date</label>
                  <input
                    type="date"
                    defaultValue="2026-11-02"
                    className="w-full h-10 px-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowCreateModal(false);
                  showToast('Clinical follow-up queued and synchronized to Section 4 reminders');
                }}
                className="flex-1 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004b73] shadow-sm"
              >
                Queue Follow-up
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-6 pb-24">
        {/* Header Summary Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900">Follow-up Management Queue</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#cce5ff] text-[#001d31]">
                24 Active
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Clinical recall queue, post-op triage &amp; automated adherence tracking.
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => showToast('Queue refreshed: All clinical follow-up statuses synchronized')}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              title="Refresh Queue"
            >
              <Icon name="sync" className="text-lg" />
            </button>
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="px-4 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004b73] shadow-sm flex items-center gap-1.5"
            >
              <Icon name="add" className="text-base" />
              <span>New Follow-up</span>
            </button>
          </div>
        </div>

        {/* KPI Metrics Grid (2x2 / 4 cols) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Due This Week</span>
              <Icon name="schedule" className="text-[#006194] text-base" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">6</div>
            <span className="text-[11px] text-[#006194] font-semibold block">Action Required</span>
          </div>

          <div className="bg-red-50/60 p-4 rounded-2xl border border-red-200 shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-red-700 font-semibold uppercase tracking-wider">
              <span>Overdue</span>
              <Icon name="priority_high" className="text-red-600 text-base" />
            </div>
            <div className="text-2xl font-extrabold text-red-700">3</div>
            <span className="text-[11px] text-red-800 font-semibold block">Priority Contact</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Scheduled</span>
              <Icon name="event_available" className="text-[#006a61] text-base" />
            </div>
            <div className="text-2xl font-extrabold text-slate-900">11</div>
            <span className="text-[11px] text-slate-500 font-semibold block">Confirmed</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-[#eaedff] shadow-sm space-y-1">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold uppercase tracking-wider">
              <span>Completed</span>
              <Icon name="check_circle" className="text-[#006a61] text-base" />
            </div>
            <div className="text-2xl font-extrabold text-[#006a61]">42</div>
            <span className="text-[11px] text-[#006a61] font-semibold block">This Month</span>
          </div>
        </div>

        {/* Search & Filter Chips */}
        <div className="bg-white p-5 rounded-2xl border border-[#eaedff] shadow-sm space-y-3">
          <div className="relative">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient name, LifeCode, or tooth #..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 focus:bg-white focus:border-[#006194] focus:ring-1 focus:ring-[#006194] outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon name="cancel" className="text-base" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {(
              [
                { id: 'all', label: 'All Follow-ups (24)' },
                { id: 'overdue', label: 'Overdue (3)', isError: true },
                { id: 'due-soon', label: 'Due Soon (6)' },
                { id: 'scheduled', label: 'Scheduled (11)' },
                { id: 'preventative', label: 'Preventative (4)' },
              ] as { id: FilterType; label: string; isError?: boolean }[]
            ).map((item) => {
              const active = currentFilter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentFilter(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? item.isError
                        ? 'bg-red-600 text-white shadow-xs'
                        : 'bg-[#006194] text-white shadow-xs'
                      : item.isError
                      ? 'bg-red-50 text-red-700 hover:bg-red-100'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4 Sync Active Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 border border-[#eaedff] flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-lg bg-teal-100 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="sync_alt" className="text-base" />
          </div>
          <div className="flex-1 min-w-0 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Section 4 Engagement Sync Active</span>
              <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-teal-100 text-[#006a61] uppercase tracking-wider">
                Automated
              </span>
            </div>
            <p className="text-slate-600 mt-0.5 leading-relaxed">
              Clinical alerts sync seamlessly with <strong>Patient Reminders &amp; Engagement</strong> without duplicating SMS/App notification dispatch.
            </p>
          </div>
        </div>

        {/* Queue Cards */}
        <div className="space-y-4">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-[#eaedff] shadow-sm overflow-hidden space-y-3"
            >
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 font-bold flex items-center justify-center text-sm">
                      {card.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{card.patientName}</span>
                        <span className="text-xs text-slate-500">{card.ageGender}</span>
                      </div>
                      <span className="font-mono text-xs text-slate-400">{card.dhaId}</span>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider ${card.statusColor}`}>
                    {card.statusLabel}
                  </span>
                </div>

                <div className="bg-[#faf8ff] rounded-xl p-3.5 border border-[#eaedff] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#006194]">{card.title}</span>
                    <span className="font-mono font-bold text-slate-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {card.toothOrPhase}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[11px] flex items-center gap-1.5">
                    <Icon name="clinical_notes" className="text-xs" />
                    <span>Plan: {card.planRef}</span>
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5">
                    <Icon name="calendar_today" className="text-[#006194] text-sm" />
                    <span>Due: <strong className="text-slate-900">{card.dueDate}</strong></span>
                    {card.dueCountdown && (
                      <span className="text-[11px] text-slate-400">({card.dueCountdown})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Icon name="stethoscope" className="text-[#006a61] text-sm" />
                    <span>{card.clinician}</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                {card.id === 'FOL-001' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/scheduling')}
                      className="flex-1 py-2 px-3 rounded-xl bg-[#006194] text-white font-bold text-xs hover:bg-[#004b73] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Icon name="calendar_add_on" className="text-sm" />
                      <span>Schedule Visit</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/treatment-plans/follow-up-details')}
                      className="py-2 px-4 rounded-xl bg-white border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 flex items-center gap-1.5 shadow-xs"
                    >
                      <Icon name="visibility" className="text-sm" />
                      <span>Details (13.21)</span>
                    </button>
                  </>
                ) : card.status === 'overdue' ? (
                  <>
                    <button
                      type="button"
                      onClick={() => showToast(`Reschedule outreach initiated for ${card.patientName}`)}
                      className="flex-1 py-2 px-3 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-700 flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <Icon name="phone_in_talk" className="text-sm" />
                      <span>Reschedule Contact</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => showToast(`Emergency follow-up alert dispatched to ${card.patientName}`)}
                      className="flex-1 py-2 px-3 rounded-xl bg-white border border-red-300 text-red-700 font-bold text-xs hover:bg-red-50 flex items-center justify-center gap-1.5 shadow-xs"
                    >
                      <Icon name="notification_important" className="text-sm" />
                      <span>Send Alert</span>
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => showToast(`Opening follow-up dossier for ${card.patientName}`)}
                    className="w-full py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5"
                  >
                    <Icon name="visibility" className="text-sm text-slate-400" />
                    <span>View Follow-up File</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/outcome-review')}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800"
          >
            ← Back to Outcome Review
          </button>
          <button
            type="button"
            onClick={() => navigate('/treatment-plans/follow-up-details')}
            className="text-xs font-bold text-[#006194] hover:underline flex items-center gap-1"
          >
            <span>View Follow-up Details (13.21)</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </TreatmentPlanShell>
  );
}
