import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

interface ClinicalTask {
  id: string;
  title: string;
  subtitle: string;
  category: 'plan' | 'imaging' | 'exam' | 'followup' | 'comms';
  categoryLabel: string;
  priority: 'urgent' | 'high' | 'normal';
  dueTime: string;
  patientName: string;
  patientInitials: string;
  patientMeta: string;
  badge?: string;
  summary: string;
  actionPrimary: string;
  actionSecondary?: string;
  actionPrimaryIcon: string;
  actionSecondaryIcon?: string;
  link?: string;
}

export function MyTasksWorkQueueScreen() {
  const navigate = useNavigate();

  // State
  const [assigneeScope, setAssigneeScope] = useState<'me' | 'delegated' | 'team'>('me');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'plan' | 'imaging' | 'exam' | 'followup' | 'comms'>('all');
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New task form fields
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPatient, setNewTaskPatient] = useState('Amara Okafor (NG-990-281-LAG)');
  const [newTaskPriority, setNewTaskPriority] = useState<'urgent' | 'high' | 'normal'>('high');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const tasks: ClinicalTask[] = [
    {
      id: 'tsk-1',
      title: 'Approve Treatment Plan #TP-2026-089',
      subtitle: 'Phase 1 & Phase 2 Scope Authorization',
      category: 'plan',
      categoryLabel: 'Sec. 13 • Plan',
      priority: 'urgent',
      dueTime: 'Today, 14:00 WAT',
      patientName: 'Amara Okafor',
      patientInitials: 'AO',
      patientMeta: '34y F • NG-990-281-LAG',
      summary: 'Attending clinician sign-off required following mesio-occlusal composite restoration & fluoride recare phase.',
      actionPrimary: 'Review & Sign',
      actionSecondary: 'Delegate',
      actionPrimaryIcon: 'draw',
      actionSecondaryIcon: 'forward',
      link: '/dentist/task-details',
    },
    {
      id: 'tsk-2',
      title: 'Audit Dexis Bitewing BW-R-1048',
      subtitle: 'Margin Encroachment Alert on Tooth #16',
      category: 'imaging',
      categoryLabel: 'Sec. 11 • Imaging',
      priority: 'urgent',
      dueTime: 'Today, 16:30 WAT',
      patientName: 'Chinedu Okafor',
      patientInitials: 'CO',
      patientMeta: '41y M • NG-990-515-LAG',
      badge: 'Tooth #16',
      summary: 'Suspected recurrent secondary caries approximating pulp ceiling. Radiographic calibration requested.',
      actionPrimary: 'Open DICOM Viewer',
      actionSecondary: 'Details',
      actionPrimaryIcon: 'radiology',
      actionSecondaryIcon: 'notes',
      link: '/investigations/viewer/xray',
    },
    {
      id: 'tsk-3',
      title: 'Post-Op 14-Day Sensitivity Vitality Check',
      subtitle: 'Thermal Endodontic Viability Protocol',
      category: 'followup',
      categoryLabel: 'Sec. 13.21 • Recall',
      priority: 'high',
      dueTime: '02 Nov 2026',
      patientName: 'Amara Okafor',
      patientInitials: 'AO',
      patientMeta: '34y F • NG-990-281-LAG',
      badge: 'Routine Check',
      summary: 'Patient reported cold sensitivity after step 1 bonding. Cold test verification needed before enamel polish.',
      actionPrimary: 'View Protocol & Charting',
      actionSecondary: 'Call',
      actionPrimaryIcon: 'clinical_notes',
      actionSecondaryIcon: 'call',
      link: '/treatment-plans/follow-up-details',
    },
    {
      id: 'tsk-4',
      title: 'Periodontal Charting & Occlusion Assessment',
      subtitle: 'Initial Baseline Incomplete (Quadrants 3 & 4 pending)',
      category: 'exam',
      categoryLabel: 'Sec. 10 • Examination',
      priority: 'high',
      dueTime: 'In-Clinic Today',
      patientName: 'Fatima Bello',
      patientInitials: 'FZ',
      patientMeta: '28y F • NG-990-414-LAG',
      badge: 'Chair 02',
      summary: 'Probing depths Q1 and Q2 recorded. Furcation involvement Q3 molar requires attending review.',
      actionPrimary: 'Resume Exam',
      actionPrimaryIcon: 'edit_document',
      link: '/examination/workspace',
    },
    {
      id: 'tsk-5',
      title: 'Clarification: Tooth #14 Implant Fixture Timing',
      subtitle: 'Patient asks about recovery window prior to travel',
      category: 'comms',
      categoryLabel: 'Sec. 22 • Comms',
      priority: 'normal',
      dueTime: '2h ago',
      patientName: 'Tariq Latif',
      patientInitials: 'TL',
      patientMeta: '52y M • NG-990-678-LAG',
      summary: 'Patient leaves for Lagos on Nov 10; wants confirmation on whether fixture integration permits flight cabin pressure.',
      actionPrimary: 'Reply Clinical Note',
      actionSecondary: 'Dismiss',
      actionPrimaryIcon: 'reply',
      actionSecondaryIcon: 'done',
    },
  ];

  const filteredTasks = tasks.filter((t) => {
    if (categoryFilter === 'all') return true;
    return t.category === categoryFilter;
  });

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    showToast(`Task "${newTaskTitle}" assigned to queue`);
    setShowNewTaskModal(false);
    setNewTaskTitle('');
  };

  return (
    <ClinicalWorkspaceShell activeTab="appointments">
      <div className="max-w-6xl mx-auto space-y-6 pb-32 md:pb-12">
        {/* Top Greeting & Context Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white dark:bg-slate-800 p-5 md:p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Active Session • Dr. Daniel James
              </span>
              <span className="text-xs font-mono text-slate-500 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-full">
                WAT 11:42
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">Clinical Work Queue</h1>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300">
                {filteredTasks.length} Actions
              </span>
            </div>
            <p className="text-xs md:text-sm text-slate-500 mt-1">
              Clinical sign-offs, radiographic audits, and urgent care mandates requiring practitioner sign-off.
            </p>
          </div>

          <button
            onClick={() => setShowNewTaskModal(true)}
            className="self-start md:self-auto px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs md:text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Icon name="add" className="text-base" />
            <span>New Clinical Task</span>
          </button>
        </div>

        {/* KPI Triage Pulse Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">8</span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">
              Total Queue
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 shadow-sm flex flex-col items-center text-center relative overflow-hidden">
            <span className="text-2xl md:text-3xl font-extrabold text-red-600 dark:text-red-400">3</span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-red-700 dark:text-red-300 mt-1 tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              Urgent (&lt; 24h)
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-900/50 shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-extrabold text-teal-700 dark:text-teal-300">2</span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-teal-700 dark:text-teal-300 mt-1 tracking-wider">
              High Priority
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col items-center text-center">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-700 dark:text-slate-300">3</span>
            <span className="text-[10px] md:text-xs uppercase font-bold text-slate-400 mt-1 tracking-wider">
              Routine
            </span>
          </div>
        </div>

        {/* Assignee Scope Toggle & Category Filters */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Scope segmented control */}
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center gap-1 text-xs">
              <button
                onClick={() => setAssigneeScope('me')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-all ${
                  assigneeScope === 'me'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Assigned to Me (6)
              </button>
              <button
                onClick={() => setAssigneeScope('delegated')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-all ${
                  assigneeScope === 'delegated'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Delegated (2)
              </button>
              <button
                onClick={() => setAssigneeScope('team')}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg font-bold transition-all ${
                  assigneeScope === 'team'
                    ? 'bg-white dark:bg-slate-700 text-teal-700 dark:text-teal-300 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Team (14)
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto text-xs text-slate-500">
              <Icon name="sort" className="text-base" />
              <span>Sorted by:</span>
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-0.5">
                Due Date (Urgent first)
                <Icon name="expand_more" className="text-sm" />
              </span>
            </div>
          </div>

          {/* Category Filter Scroller */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {([
              { id: 'all' as const, label: 'All Actions', icon: 'done_all' },
              { id: 'plan' as const, label: 'Plan Approvals (2)' },
              { id: 'imaging' as const, label: 'Radiology Audits (2)' },
              { id: 'exam' as const, label: 'Exams to Complete (1)' },
              { id: 'followup' as const, label: 'Follow-ups Due (2)' },
              { id: 'comms' as const, label: 'Patient Q&A (1)' },
            ] as { id: 'all' | 'plan' | 'imaging' | 'exam' | 'followup' | 'comms'; label: string; icon?: string }[]).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 rounded-full font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  categoryFilter === cat.id
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.icon && <Icon name={cat.icon} className="text-sm" />}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Clinical Tasks Feed Grid (Responsive 1-col on mobile, 2-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTasks.map((task) => {
            const isUrgent = task.priority === 'urgent';
            const isHigh = task.priority === 'high';

            return (
              <div
                key={task.id}
                className={`bg-white dark:bg-slate-800 rounded-2xl p-5 border shadow-sm relative overflow-hidden flex flex-col justify-between transition-all hover:shadow-md ${
                  isUrgent
                    ? 'border-l-4 border-l-red-500 border-slate-200 dark:border-slate-700'
                    : isHigh
                    ? 'border-l-4 border-l-teal-600 border-slate-200 dark:border-slate-700'
                    : 'border-l-4 border-l-slate-300 dark:border-l-slate-600 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div>
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between gap-2 mb-2 text-xs">
                    <div className="flex items-center gap-2">
                      {isUrgent && (
                        <span className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                          URGENT (&lt; 24H)
                        </span>
                      )}
                      {isHigh && (
                        <span className="bg-teal-100 dark:bg-teal-900/40 text-teal-800 dark:text-teal-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          HIGH PRIORITY
                        </span>
                      )}
                      {!isUrgent && !isHigh && (
                        <span className="bg-slate-100 dark:bg-slate-700 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          NORMAL
                        </span>
                      )}
                      <span className="bg-slate-100 dark:bg-slate-700/60 text-slate-500 text-[11px] px-2 py-0.5 rounded-full font-mono">
                        {task.categoryLabel}
                      </span>
                    </div>

                    <span
                      className={`font-mono font-semibold flex items-center gap-1 ${
                        isUrgent ? 'text-red-600 dark:text-red-400' : 'text-slate-400'
                      }`}
                    >
                      <Icon name="alarm" className="text-xs" />
                      {task.dueTime}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h2 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                    {task.title}
                  </h2>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-medium mt-0.5">{task.subtitle}</p>

                  {/* Patient Strip */}
                  <div className="my-3 py-2 px-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold text-xs shrink-0">
                        {task.patientInitials}
                      </div>
                      <div className="min-w-0 text-xs">
                        <span className="font-bold text-slate-900 dark:text-white truncate block">
                          {task.patientName}
                        </span>
                        <span className="font-mono text-slate-500 text-[11px] truncate block">
                          {task.patientMeta}
                        </span>
                      </div>
                    </div>
                    {task.badge && (
                      <span className="px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold border border-slate-200 dark:border-slate-600">
                        {task.badge}
                      </span>
                    )}
                  </div>

                  {/* Summary note */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {task.summary}
                  </p>
                </div>

                {/* Action Buttons Zone */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 text-xs">
                  <button
                    onClick={() => {
                      if (task.link) {
                        navigate(task.link);
                      } else {
                        showToast(`Action "${task.actionPrimary}" logged`);
                      }
                    }}
                    className="flex-1 py-2.5 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Icon name={task.actionPrimaryIcon} className="text-sm" />
                    <span>{task.actionPrimary}</span>
                  </button>

                  {task.actionSecondary && (
                    <button
                      onClick={() => showToast(`Task #${task.id} delegated / handled`)}
                      className="py-2.5 px-3 rounded-xl border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold transition-colors flex items-center justify-center gap-1"
                    >
                      {task.actionSecondaryIcon && (
                        <Icon name={task.actionSecondaryIcon} className="text-sm text-slate-400" />
                      )}
                      <span>{task.actionSecondary}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* End of Queue Reassurance Moment */}
        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 text-center flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-300 flex items-center justify-center mb-2">
            <Icon name="task_alt" className="text-2xl" />
          </div>
          <span className="font-bold text-slate-900 dark:text-white text-base">You&apos;re on top of your queue</span>
          <span className="text-xs text-slate-500 max-w-sm mt-1">
            3 remaining routine recare validations scheduled for afternoon shift at Harmony Wuse 2.
          </span>
        </div>

        {/* New Task Modal */}
        {showNewTaskModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                  <Icon name="add_task" className="text-teal-600" />
                  Create Clinical Task
                </h3>
                <button
                  onClick={() => setShowNewTaskModal(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <Icon name="close" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                    Task Title / Mandate
                  </label>
                  <input
                    type="text"
                    required
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="e.g. Verify CBCT Nerve Canal Clearance"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                    Assigned Patient
                  </label>
                  <input
                    type="text"
                    value={newTaskPatient}
                    onChange={(e) => setNewTaskPatient(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-600 dark:text-slate-300 font-semibold mb-1">
                    Priority Level
                  </label>
                  <select
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as 'urgent' | 'high' | 'normal')}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 text-xs"
                  >
                    <option value="urgent">Urgent (&lt; 24h Mandatory)</option>
                    <option value="high">High Priority</option>
                    <option value="normal">Routine / Normal</option>
                  </select>
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setShowNewTaskModal(false)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-slate-700 dark:text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-sm"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Global Toast */}
        {toastMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
            <Icon name="check_circle" filled className="text-teal-400 text-sm" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
