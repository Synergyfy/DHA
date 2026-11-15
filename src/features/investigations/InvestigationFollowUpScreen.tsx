import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface FollowUpTask {
  id: string;
  patientName: string;
  dhaId: string;
  ageGender: string;
  modality: 'Radiology' | 'Laboratory' | 'Clinical Photo';
  toothTarget?: string;
  urgency: 'Overdue' | 'Urgent' | 'Routine' | 'Recare' | 'Resolved';
  dueDate: string;
  dueTimeframe: string;
  clinicalObjective: string;
  attendingClinician: string;
  escalationLevel: number;
}

export function InvestigationFollowUpScreen() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Urgent' | 'Overdue' | 'Routine' | 'Recare' | 'Resolved'>('All');
  const [sortBy, setSortBy] = useState<'due_date' | 'urgency' | 'name'>('due_date');
  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New task form state
  const [newTaskPatientId, setNewTaskPatientId] = useState<string>('DHA-10482');
  const [newTaskModality, setNewTaskModality] = useState<string>('Radiology');
  const [newTaskTooth, setNewTaskTooth] = useState<string>('#16');
  const [newTaskInterval, setNewTaskInterval] = useState<string>('7 Days');
  const [newTaskUrgency, setNewTaskUrgency] = useState<string>('Urgent');
  const [newTaskObjective, setNewTaskObjective] = useState<string>('Post-restorative pulpal vitality & bitewing clearance');

  const [tasks, setTasks] = useState<FollowUpTask[]>([
    {
      id: 'task-1',
      patientName: 'Marcus Vance',
      dhaId: 'DHA-10822',
      ageGender: '28y M',
      modality: 'Radiology',
      toothTarget: 'Tooth #48 (Lower Right Third Molar)',
      urgency: 'Overdue',
      dueDate: '14 Feb 2025',
      dueTimeframe: '2 Days Overdue',
      clinicalObjective: 'CBCT 3D nerve canal approximation review prior to surgical coronectomy / OMFS clearance.',
      attendingClinician: 'Dr. Daniel James (#DEN-48912)',
      escalationLevel: 2,
    },
    {
      id: 'task-2',
      patientName: 'Chinedu Okafor',
      dhaId: 'DHA-10482',
      ageGender: '34y M',
      modality: 'Radiology',
      toothTarget: 'Tooth #16 Disto-Occlusal',
      urgency: 'Urgent',
      dueDate: '18 Feb 2025',
      dueTimeframe: 'Due in 48 Hours',
      clinicalObjective: 'Reversible pulpitis post-restorative vitality verification & bite equilibration check.',
      attendingClinician: 'Dr. Daniel James (#DEN-48912)',
      escalationLevel: 1,
    },
    {
      id: 'task-3',
      patientName: 'Amina Yusuf',
      dhaId: 'DHA-09412',
      ageGender: '42y F',
      modality: 'Laboratory',
      toothTarget: 'Full Mouth Periodontal',
      urgency: 'Routine',
      dueDate: '02 Mar 2025',
      dueTimeframe: 'Due in 14 Days',
      clinicalObjective: 'Repeat serum ferritin, HbA1c, and coagulation screen (INR) prior to surgical periodontal flap.',
      attendingClinician: 'Dr. Sarah Al-Mansoor (#DEN-31092)',
      escalationLevel: 0,
    },
    {
      id: 'task-4',
      patientName: 'Zayd Tariq',
      dhaId: 'DHA-11045',
      ageGender: '8y M',
      modality: 'Radiology',
      toothTarget: 'Teeth #11, #21 Eruption Path',
      urgency: 'Recare',
      dueDate: '16 Aug 2025',
      dueTimeframe: 'Due in 6 Months',
      clinicalObjective: 'Pediatric mixed dentition serial periapical surveillance to exclude mesiodens supernumerary impaction.',
      attendingClinician: 'Dr. Mariam Farooq (#DEN-50211)',
      escalationLevel: 0,
    },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    const newTask: FollowUpTask = {
      id: `task-${Date.now()}`,
      patientName: newTaskPatientId === 'DHA-10482' ? 'Chinedu Okafor' : 'Patient ' + newTaskPatientId,
      dhaId: newTaskPatientId,
      ageGender: '34y M',
      modality: newTaskModality as any,
      toothTarget: newTaskTooth,
      urgency: newTaskUrgency as any,
      dueDate: '23 Feb 2025',
      dueTimeframe: `Due in ${newTaskInterval}`,
      clinicalObjective: newTaskObjective,
      attendingClinician: 'Dr. Daniel James (#DEN-48912)',
      escalationLevel: newTaskUrgency === 'Urgent' ? 1 : 0,
    };
    setTasks([newTask, ...tasks]);
    setIsNewTaskModalOpen(false);
    showToast('New clinical follow-up task registered and assigned to clinic queue.');
  };

  const handleResolveTask = (taskId: string) => {
    setTasks(
      tasks.map((t) => (t.id === taskId ? { ...t, urgency: 'Resolved', dueTimeframe: 'Completed Today' } : t))
    );
    showToast('Task marked as Resolved and archived to patient timeline.');
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesSearch =
      t.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.dhaId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.toothTarget && t.toothTarget.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedFilter === 'All') return true;
    return t.urgency === selectedFilter;
  });

  return (
    <InvestigationShell
      pageTitle="Investigation Follow-up Management"
      badgeCode="11.22"
      badgeLabel="Triage & Recare Engine"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="FOL-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Triage Metrics Stats Bar */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-outline mb-1 font-semibold uppercase tracking-wider">
              <span>Active Tasks</span>
              <Icon name="assignment" className="text-base text-primary" />
            </div>
            <div className="text-2xl font-bold text-on-surface">{tasks.length}</div>
            <span className="text-[11px] text-on-surface-variant">Across all departments</span>
          </div>

          <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-rose-700 mb-1 font-bold uppercase tracking-wider">
              <span>Urgent & Overdue</span>
              <Icon name="warning" className="text-base text-rose-600" />
            </div>
            <div className="text-2xl font-bold text-rose-800">
              {tasks.filter((t) => t.urgency === 'Urgent' || t.urgency === 'Overdue').length}
            </div>
            <span className="text-[11px] text-rose-600 font-medium">1 Overdue &bull; Escalated</span>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-outline mb-1 font-semibold uppercase tracking-wider">
              <span>Routine (&lt; 14d)</span>
              <Icon name="schedule" className="text-base text-secondary" />
            </div>
            <div className="text-2xl font-bold text-on-surface">
              {tasks.filter((t) => t.urgency === 'Routine').length}
            </div>
            <span className="text-[11px] text-on-surface-variant">Scheduled within window</span>
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between text-xs text-outline mb-1 font-semibold uppercase tracking-wider">
              <span>Surveillance / Recare</span>
              <Icon name="event_repeat" className="text-base text-tertiary" />
            </div>
            <div className="text-2xl font-bold text-on-surface">
              {tasks.filter((t) => t.urgency === 'Recare').length}
            </div>
            <span className="text-[11px] text-on-surface-variant">6-month pediatric/perio</span>
          </div>
        </section>

        {/* Toolbar: Search, Filters, and New Task Trigger */}
        <section className="bg-surface-container-lowest border border-outline-variant/40 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-lg">
            <div className="relative w-full">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-outline text-lg" />
              <input
                type="text"
                placeholder="Search by patient, DHA ID, or tooth..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs font-medium pl-10 pr-4 py-2.5 rounded-xl border border-outline-variant/40 bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium rounded-xl border border-outline-variant/40 bg-surface px-3 py-2.5 text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 shrink-0"
            >
              <option value="due_date">Sort: Due Date</option>
              <option value="urgency">Sort: Urgency</option>
              <option value="name">Sort: Patient Name</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsNewTaskModalOpen(true)}
              className="px-4 py-2.5 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="add_task" className="text-base" />
              <span>Create Follow-up Task</span>
            </button>
          </div>
        </section>

        {/* Filter Chips Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          {(['All', 'Urgent', 'Overdue', 'Routine', 'Recare', 'Resolved'] as const).map((filter) => {
            const isSelected = selectedFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setSelectedFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full font-bold transition-all shrink-0 ${
                  isSelected
                    ? filter === 'Urgent'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : filter === 'Overdue'
                      ? 'bg-rose-700 text-white shadow-sm'
                      : filter === 'Resolved'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-primary text-on-primary shadow-sm'
                    : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Tasks List / Cards */}
        <section className="space-y-4">
          {filteredTasks.length === 0 ? (
            <div className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-12 text-center text-xs text-on-surface-variant">
              <Icon name="task_alt" className="text-4xl text-outline mb-2" />
              <p className="font-semibold text-sm text-on-surface">No follow-up tasks match this filter</p>
              <p className="mt-1">All clinical surveillance items in this category are up to date.</p>
            </div>
          ) : (
            filteredTasks.map((task) => {
              const isUrgent = task.urgency === 'Urgent';
              const isOverdue = task.urgency === 'Overdue';
              const isResolved = task.urgency === 'Resolved';

              return (
                <div
                  key={task.id}
                  className={`bg-surface-container-lowest border rounded-2xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    isOverdue
                      ? 'border-rose-300 ring-2 ring-rose-200/50 bg-rose-50/20'
                      : isUrgent
                      ? 'border-amber-300'
                      : isResolved
                      ? 'border-emerald-200 opacity-70'
                      : 'border-outline-variant/40'
                  }`}
                >
                  {/* Left Task Content */}
                  <div className="flex items-start gap-4 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shrink-0 ${
                        isOverdue
                          ? 'bg-rose-100 text-rose-700'
                          : isUrgent
                          ? 'bg-amber-100 text-amber-800'
                          : isResolved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-primary/10 text-primary'
                      }`}
                    >
                      <Icon
                        name={
                          task.modality === 'Radiology'
                            ? 'radiology'
                            : task.modality === 'Laboratory'
                            ? 'biotech'
                            : 'photo_camera'
                        }
                        className="text-2xl"
                      />
                    </div>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-on-surface">{task.patientName}</h3>
                        <span className="font-mono text-xs text-outline font-semibold">{task.dhaId}</span>
                        <span className="text-xs text-on-surface-variant">({task.ageGender})</span>

                        {/* Urgency Badge */}
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                            isOverdue
                              ? 'bg-rose-600 text-white animate-pulse'
                              : isUrgent
                              ? 'bg-amber-100 text-amber-800 border border-amber-300'
                              : isResolved
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-primary/10 text-primary border border-primary/20'
                          }`}
                        >
                          {task.urgency.toUpperCase()} &bull; {task.dueTimeframe}
                        </span>

                        {task.escalationLevel > 1 && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-300">
                            Escalation Level {task.escalationLevel}
                          </span>
                        )}
                      </div>

                      {task.toothTarget && (
                        <div className="text-xs font-semibold text-primary flex items-center gap-1.5">
                          <Icon name="tag" className="text-sm" />
                          <span>{task.toothTarget}</span>
                        </div>
                      )}

                      <p className="text-xs text-on-surface-variant leading-relaxed">{task.clinicalObjective}</p>

                      <div className="flex items-center gap-3 text-[11px] text-outline pt-1">
                        <span>Attending: {task.attendingClinician}</span>
                        <span>&bull;</span>
                        <span>Due Target: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Task Actions */}
                  <div className="flex items-center gap-2 shrink-0 flex-wrap sm:flex-nowrap">
                    {isOverdue && (
                      <button
                        type="button"
                        onClick={() => showToast(`Escalated ${task.patientName} directly to OMFS on-call consultant.`)}
                        className="px-3 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 shadow-sm flex items-center gap-1.5"
                      >
                        <Icon name="emergency" className="text-sm" />
                        <span>Escalate to OMFS</span>
                      </button>
                    )}

                    {!isResolved ? (
                      <>
                        <button
                          type="button"
                          onClick={() => showToast(`SMS reminder and portal notification dispatched to ${task.patientName}.`)}
                          className="px-3 py-2 rounded-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/40 flex items-center gap-1.5"
                        >
                          <Icon name="phone" className="text-sm text-primary" />
                          <span className="hidden sm:inline">Call Patient</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleResolveTask(task.id)}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm flex items-center gap-1.5"
                        >
                          <Icon name="check" className="text-sm" />
                          <span>Mark Resolved</span>
                        </button>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                        <Icon name="check_circle" className="text-sm" />
                        <span>Completed</span>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={() => navigate('/investigations/record-details')}
                      className="p-2 rounded-xl hover:bg-surface-container text-outline hover:text-on-surface"
                      title="View Investigation Record"
                    >
                      <Icon name="chevron_right" className="text-xl" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </section>

        {/* Modal: Create New Follow-up Task */}
        {isNewTaskModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-outline-variant/40 animate-scaleIn space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="add_task" className="text-primary text-xl" />
                  <h3 className="text-base font-bold text-on-surface">Schedule Clinical Follow-Up</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsNewTaskModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-container text-outline"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleCreateTask} className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-on-surface block mb-1">Patient DHA Identifier:</label>
                  <input
                    type="text"
                    value={newTaskPatientId}
                    onChange={(e) => setNewTaskPatientId(e.target.value)}
                    required
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Modality Category:</label>
                    <select
                      value={newTaskModality}
                      onChange={(e) => setNewTaskModality(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-medium"
                    >
                      <option value="Radiology">Radiology (X-Ray / CBCT)</option>
                      <option value="Laboratory">Laboratory & Bloods</option>
                      <option value="Clinical Photo">Clinical Macro Photography</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Target Tooth / Anatomical Site:</label>
                    <input
                      type="text"
                      value={newTaskTooth}
                      onChange={(e) => setNewTaskTooth(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Recall Interval:</label>
                    <select
                      value={newTaskInterval}
                      onChange={(e) => setNewTaskInterval(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-medium"
                    >
                      <option value="48 Hours">48 Hours (Post-Op / Vitality)</option>
                      <option value="7 Days">7 Days (Suture Removal / Dressing)</option>
                      <option value="14 Days">14 Days (Pre-Surgical Lab Clearance)</option>
                      <option value="1 Month">1 Month (Bone Healing / RCT)</option>
                      <option value="6 Months">6 Months (Pediatric / Perio Recare)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-on-surface block mb-1">Urgency Priority:</label>
                    <select
                      value={newTaskUrgency}
                      onChange={(e) => setNewTaskUrgency(e.target.value)}
                      className="w-full rounded-xl border border-outline-variant/40 bg-surface px-3 py-2 text-on-surface font-medium"
                    >
                      <option value="Routine">Routine</option>
                      <option value="Urgent">Urgent (Clinical Escalation)</option>
                      <option value="Recare">Recare Surveillance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-on-surface block mb-1">Clinical Rationale & Objective:</label>
                  <textarea
                    rows={3}
                    value={newTaskObjective}
                    onChange={(e) => setNewTaskObjective(e.target.value)}
                    required
                    className="w-full rounded-xl border border-outline-variant/40 bg-surface p-3 text-on-surface leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setIsNewTaskModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm"
                  >
                    Confirm & Dispatch Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Bottom Navigation Ribbon */}
        <section className="bg-surface-container-lowest border border-outline-variant/30 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="history_edu" className="text-primary text-base" />
            <span className="font-semibold text-on-surface">Audit Compliance:</span>
            <span className="text-on-surface-variant">All follow-ups tracked in NABIDH immutable event ledger.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/history')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="history" className="text-sm" />
              <span>Version History & Ledger (11.23)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/reports')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="picture_as_pdf" className="text-sm" />
              <span>Reports & PDF Preview (11.24)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

