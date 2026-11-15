import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type TaskCategory = 'all' | 'facility' | 'appointment' | 'inventory' | 'clinical-ops';

interface ClinicTask {
  id: string;
  title: string;
  priority: 'urgent' | 'high' | 'normal' | 'routine';
  categories: ('facility' | 'appointment' | 'inventory' | 'clinical-ops')[];
  categoryLabel: string;
  status: 'pending' | 'in-progress' | 'scheduled' | 'completed';
  statusLabel: string;
  dueTime: string;
  assigneeName: string;
  assigneeRole: string;
  assigneeAvatar?: string;
  assigneeInitials?: string;
  note?: string;
  actionLabel: string;
  actionIcon?: string;
}

const INITIAL_TASKS: ClinicTask[] = [
  {
    id: 't-01',
    title: 'Autoclave Spore Testing Validation (Weekly Protocol)',
    priority: 'high',
    categories: ['facility', 'clinical-ops'],
    categoryLabel: 'Facility / Infection Control',
    status: 'in-progress',
    statusLabel: 'In Progress',
    dueTime: 'Due Today 11:30 AM • Sterilization Bay 02',
    assigneeName: 'Nurse Zainab Tariq',
    assigneeRole: 'IPC Lead • Wuse 2',
    assigneeAvatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'Validate & Sign-off',
  },
  {
    id: 't-02',
    title: 'CBCT Scanner Sensor Head Calibration',
    priority: 'high',
    categories: ['facility', 'clinical-ops'],
    categoryLabel: 'Equipment / Diagnostics',
    status: 'pending',
    statusLabel: 'Pending',
    dueTime: 'Due 12:00 PM • Radiographic Suite B',
    assigneeName: 'Dr. Michael James',
    assigneeRole: 'Diagnostics • Radiologist',
    assigneeAvatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'Mark Started',
  },
  {
    id: 't-03',
    title: 'Review Urgent Biopsy Report from National Lab',
    priority: 'urgent',
    categories: ['clinical-ops', 'appointment'],
    categoryLabel: 'Clinical Coordination',
    status: 'in-progress',
    statusLabel: 'In Progress',
    dueTime: 'Due 13:00 PM • Direct Physician Handover',
    note: 'Patient Fatima Garba (#Q-05) awaiting result.',
    assigneeName: 'Dr. Daniel Okoro',
    assigneeRole: 'Oral Surgeon',
    assigneeAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'View Module 11',
  },
  {
    id: 't-04',
    title: 'Restock Flowable Composite A2 in Suite 01',
    priority: 'normal',
    categories: ['inventory', 'facility'],
    categoryLabel: 'Inventory',
    status: 'pending',
    statusLabel: 'Pending',
    dueTime: 'Due 14:00 PM • Operatory Suite 01',
    assigneeName: 'David Musa',
    assigneeRole: 'Clinic Manager',
    assigneeInitials: 'DM',
    actionLabel: 'Acknowledge',
  },
  {
    id: 't-05',
    title: 'Post-Op Follow-up Call: Amara Okafor',
    priority: 'normal',
    categories: ['appointment'],
    categoryLabel: 'Patient Recare',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    dueTime: 'Due 16:30 PM • Front Office Desk',
    assigneeName: 'Grace Ibrahim',
    assigneeRole: 'Reception Desk',
    assigneeInitials: 'GI',
    actionLabel: 'Call Log',
    actionIcon: 'call',
  },
  {
    id: 't-06',
    title: 'Ultrasonic Scaler Sheath Replacement',
    priority: 'high',
    categories: ['facility'],
    categoryLabel: 'Facility / Equipment',
    status: 'pending',
    statusLabel: 'Pending',
    dueTime: 'Due 15:00 PM • Hygiene Bay 04',
    assigneeName: 'Nurse Peter Okafor',
    assigneeRole: 'Biomedical Technician',
    assigneeInitials: 'PO',
    actionLabel: 'Track Technician',
  },
  {
    id: 't-07',
    title: 'Pre-op Sedation Checklist Review',
    priority: 'normal',
    categories: ['clinical-ops'],
    categoryLabel: 'Surgical Protocol',
    status: 'in-progress',
    statusLabel: 'In Progress',
    dueTime: 'Due 14:15 PM • Suite 03',
    assigneeName: 'Nurse Amina Yusuf',
    assigneeRole: 'Surgical Nurse',
    assigneeInitials: 'AY',
    actionLabel: 'Sign Checklist',
  },
  {
    id: 't-08',
    title: 'Orthodontic Bracket Inventory Audit',
    priority: 'normal',
    categories: ['inventory'],
    categoryLabel: 'Inventory',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    dueTime: 'Due 17:00 PM • Central Store',
    assigneeName: 'David Musa',
    assigneeRole: 'Clinic Manager',
    assigneeInitials: 'DM',
    actionLabel: 'Count Sheet',
  },
  {
    id: 't-09',
    title: 'Reception Terminal #02 OS Update',
    priority: 'routine',
    categories: ['facility'],
    categoryLabel: 'IT & Infrastructure',
    status: 'in-progress',
    statusLabel: 'In Progress',
    dueTime: 'Due 18:00 PM • Front Desk',
    assigneeName: 'Grace Ibrahim',
    assigneeRole: 'Reception Desk',
    assigneeInitials: 'GI',
    actionLabel: 'Install Patch',
  },
  {
    id: 't-10',
    title: 'Recall Scheduling for Dr. Bello Patients',
    priority: 'normal',
    categories: ['appointment'],
    categoryLabel: 'Appointment',
    status: 'scheduled',
    statusLabel: 'Scheduled',
    dueTime: 'Due 16:00 PM • Desk Station #01',
    assigneeName: 'Funke Balogun',
    assigneeRole: 'Care Coordinator',
    assigneeInitials: 'FB',
    actionLabel: 'Open Queue',
  },
  {
    id: 't-11',
    title: 'Biohazard Sharps Bin Disposal & Consignment',
    priority: 'high',
    categories: ['facility'],
    categoryLabel: 'Facility / Safety',
    status: 'in-progress',
    statusLabel: 'In Progress',
    dueTime: 'Due 13:45 PM • Decontamination Bay',
    assigneeName: 'Nurse Zainab Tariq',
    assigneeRole: 'IPC Lead',
    assigneeAvatar: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'Manifest Sign',
  },
  {
    id: 't-12',
    title: 'Impression Alginate Fast-Set Re-order',
    priority: 'normal',
    categories: ['inventory'],
    categoryLabel: 'Consumables',
    status: 'pending',
    statusLabel: 'Pending',
    dueTime: 'Due 15:30 PM • Store Annex',
    assigneeName: 'David Musa',
    assigneeRole: 'Clinic Manager',
    assigneeInitials: 'DM',
    actionLabel: 'Approve PO',
  },
  {
    id: 't-13',
    title: 'Post-Extraction Pain Protocol Verification',
    priority: 'normal',
    categories: ['clinical-ops'],
    categoryLabel: 'Clinical Review',
    status: 'completed',
    statusLabel: 'Completed',
    dueTime: 'Completed 10:15 AM',
    assigneeName: 'Dr. Daniel Okoro',
    assigneeRole: 'Medical Director',
    assigneeAvatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'Archived',
  },
  {
    id: 't-14',
    title: 'Morning Emergency Triage Audit',
    priority: 'routine',
    categories: ['clinical-ops'],
    categoryLabel: 'Daily Audit',
    status: 'completed',
    statusLabel: 'Completed',
    dueTime: 'Completed 09:00 AM',
    assigneeName: 'Dr. Sarah Bello',
    assigneeRole: 'Consultant',
    assigneeAvatar: 'https://images.unsplash.com/photo-1594824813511-20572b22ecdf?w=150&auto=format&fit=crop&q=80',
    actionLabel: 'Archived',
  },
];

export const ClinicTasksAssignmentScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState<TaskCategory>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [tasks, setTasks] = useState<ClinicTask[]>(INITIAL_TASKS);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState<'facility' | 'appointment' | 'inventory' | 'clinical-ops'>('facility');
  const [newTaskPriority, setNewTaskPriority] = useState<'urgent' | 'high' | 'normal' | 'routine'>('normal');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTasks = tasks.filter((t) => {
    if (activeCategory === 'all') return true;
    return t.categories.includes(activeCategory);
  });

  const categoryCounts = {
    all: tasks.length,
    facility: tasks.filter((t) => t.categories.includes('facility')).length,
    appointment: tasks.filter((t) => t.categories.includes('appointment')).length,
    inventory: tasks.filter((t) => t.categories.includes('inventory')).length,
    'clinical-ops': tasks.filter((t) => t.categories.includes('clinical-ops')).length,
  };

  const handleTaskAction = (task: ClinicTask) => {
    if (task.actionLabel === 'View Module 11') {
      navigate('/investigations');
    } else {
      showToast(`${task.actionLabel} logged for ${task.title}.`);
    }
  };

  const handleCreateTask = () => {
    if (!newTaskTitle.trim()) {
      showToast('Please provide a task title');
      return;
    }

    const newTask: ClinicTask = {
      id: `t-${Date.now()}`,
      title: newTaskTitle,
      priority: newTaskPriority,
      categories: [newTaskCategory],
      categoryLabel: newTaskCategory === 'facility' ? 'Facility' : newTaskCategory === 'appointment' ? 'Appointment' : newTaskCategory === 'inventory' ? 'Inventory' : 'Clinical Ops',
      status: 'pending',
      statusLabel: 'Pending',
      dueTime: 'Due Today 17:00 PM • Wuse 2 Desk',
      assigneeName: 'David Musa',
      assigneeRole: 'Clinic Manager',
      assigneeInitials: 'DM',
      actionLabel: 'Acknowledge',
    };

    setTasks([newTask, ...tasks]);
    setShowCreateModal(false);
    setNewTaskTitle('');
    showToast(`New clinic task created: "${newTask.title}"`);
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/clinic-operations')}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider truncate">
                  Clinic Hub
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                  Clinic Tasks & Assignment
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('3 urgent tasks need attention')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full space-y-6">
          {/* Branch Context & Live Status Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 bg-[#eaedff] px-3 py-1 rounded-full shadow-sm">
                <Icon name="location_on" className="text-[16px] text-[#006194]" />
                <span className="text-xs font-semibold text-[#3f4850]">
                  Wuse 2 Branch • Operatory & Facility Desk
                </span>
              </div>
              <div className="inline-flex items-center gap-1.5 bg-[#86f2e4] text-[#006f66] px-3 py-1 rounded-full shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                <span className="text-xs font-semibold tracking-wide uppercase">Live Work Queue</span>
              </div>
            </div>

            <div className="mt-1">
              <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
                Clinic Tasks & Assignment
              </h1>
              <p className="text-sm text-[#3f4850] mt-0.5">
                Operational work orders, facility maintenance, infection prevention & chairside coordination.
              </p>
            </div>
          </div>

          {/* Summary Metrics Dashboard Bento Card */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                  {tasks.length}
                </span>
                <span className="text-sm font-semibold text-[#3f4850]">Total Tasks</span>
              </div>
              <Icon name="assignment_turned_in" className="text-[#006194] text-[26px]" />
            </div>

            {/* Linear Micro Progress Track */}
            <div className="w-full bg-[#e2e7ff] h-2.5 rounded-full flex overflow-hidden">
              <div className="bg-[#ba1a1a] h-full" style={{ width: '21.4%' }} title="3 Urgent"></div>
              <div className="bg-[#007bb9] h-full" style={{ width: '50%' }} title="7 In Progress"></div>
              <div className="bg-[#006a61] h-full" style={{ width: '28.6%' }} title="4 Completed"></div>
            </div>

            {/* Quick Status Badges */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                  <span className="font-bold text-base text-[#131b2e]">3</span>
                </div>
                <span className="text-xs text-[#707881] mt-0.5 font-medium">Urgent</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
                  <span className="font-bold text-base text-[#131b2e]">7</span>
                </div>
                <span className="text-xs text-[#707881] mt-0.5 font-medium">In Progress</span>
              </div>
              <div className="bg-[#f2f3ff] p-3 rounded-xl flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                  <span className="font-bold text-base text-[#131b2e]">4</span>
                </div>
                <span className="text-xs text-[#707881] mt-0.5 font-medium">Completed</span>
              </div>
            </div>

            {/* Priority Breakdown Meta Strip */}
            <div className="bg-[#e2e7ff]/60 px-4 py-2.5 rounded-xl flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">
                Priority Distribution
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#ba1a1a] bg-[#ffdad6] px-2.5 py-0.5 rounded-md font-semibold">
                  3 High
                </span>
                <span className="text-xs text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-md font-semibold">
                  8 Normal
                </span>
                <span className="text-xs text-[#707881] bg-[#eaedff] px-2.5 py-0.5 rounded-md font-semibold">
                  3 Routine
                </span>
              </div>
            </div>
          </div>

          {/* Statutory Role Guardrail Banner */}
          <div className="bg-[#f2f3ff] p-4 rounded-xl flex items-start gap-3 border border-[#dae2fd]/70 shadow-sm">
            <Icon name="verified_user" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
            <div className="flex flex-col min-w-0">
              <span className="font-semibold text-sm text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                Clinical Access Guardrail
              </span>
              <p className="text-xs text-[#3f4850] leading-snug mt-0.5">
                Operational staff and receptionists can coordinate work orders and logistics but cannot view restricted clinical diagnosis or chart findings without physician authorization.
              </p>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                activeCategory === 'all'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#dae2fd]'
              }`}
            >
              <span>All</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {categoryCounts.all}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('facility')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                activeCategory === 'facility'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#dae2fd]'
              }`}
            >
              <span>Facility</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  activeCategory === 'facility' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {categoryCounts.facility}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('appointment')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                activeCategory === 'appointment'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#dae2fd]'
              }`}
            >
              <span>Appointment</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  activeCategory === 'appointment' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {categoryCounts.appointment}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('inventory')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                activeCategory === 'inventory'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#dae2fd]'
              }`}
            >
              <span>Inventory</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  activeCategory === 'inventory' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {categoryCounts.inventory}
              </span>
            </button>

            <button
              onClick={() => setActiveCategory('clinical-ops')}
              className={`shrink-0 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                activeCategory === 'clinical-ops'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#dae2fd]'
              }`}
            >
              <span>Clinical Ops</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[11px] ${
                  activeCategory === 'clinical-ops' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
                }`}
              >
                {categoryCounts['clinical-ops']}
              </span>
            </button>
          </div>

          {/* Task List Stream (Responsive Grid: 1 col on mobile, 2 cols on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                className="bg-white p-5 rounded-2xl shadow-sm border border-[#dae2fd]/70 flex flex-col justify-between gap-3 hover:shadow-md transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {task.priority === 'urgent' && (
                        <span className="bg-[#ba1a1a] text-white text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Icon name="warning" className="text-[14px]" /> Urgent
                        </span>
                      )}
                      {task.priority === 'high' && (
                        <span className="bg-[#ffdad6] text-[#93000a] text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span> High Priority
                        </span>
                      )}
                      {task.priority === 'normal' && (
                        <span className="bg-[#eaedff] text-[#3f4850] text-xs px-2.5 py-0.5 rounded-full">
                          Normal Priority
                        </span>
                      )}
                      {task.priority === 'routine' && (
                        <span className="bg-[#f2f3ff] text-[#707881] text-xs px-2.5 py-0.5 rounded-full">
                          Routine
                        </span>
                      )}

                      <span className="bg-[#cce5ff] text-[#004b73] text-xs px-2.5 py-0.5 rounded-full font-medium">
                        {task.categoryLabel}
                      </span>
                    </div>

                    <span className="bg-[#eaedff] text-[#3f4850] text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0">
                      {task.statusLabel}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-semibold text-base text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                      {task.title}
                    </h3>
                    <p className="text-xs text-[#3f4850] mt-1 flex items-center gap-1.5">
                      <Icon
                        name={task.priority === 'urgent' || task.priority === 'high' ? 'alarm' : 'schedule'}
                        className={`text-[16px] ${
                          task.priority === 'urgent' || task.priority === 'high' ? 'text-[#ba1a1a]' : 'text-[#707881]'
                        }`}
                      />
                      <span>{task.dueTime}</span>
                    </p>
                  </div>

                  {task.note && (
                    <div className="bg-[#e2e7ff]/70 p-2.5 rounded-xl flex items-center gap-2">
                      <Icon name="info" className="text-[#006194] text-[18px] shrink-0" />
                      <span className="text-xs text-[#131b2e] font-medium">{task.note}</span>
                    </div>
                  )}
                </div>

                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between gap-2 mt-1">
                  <div className="flex items-center gap-3 min-w-0">
                    {task.assigneeAvatar ? (
                      <img
                        className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white"
                        src={task.assigneeAvatar}
                        alt={task.assigneeName}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-[#cce5ff] flex items-center justify-center font-bold text-xs text-[#006194] shrink-0">
                        {task.assigneeInitials}
                      </div>
                    )}
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-xs md:text-sm text-[#131b2e] truncate">
                        {task.assigneeName}
                      </span>
                      <span className="text-[11px] text-[#707881] truncate">{task.assigneeRole}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleTaskAction(task)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-semibold shadow-sm hover:bg-[#004b73] active:scale-95 transition-all shrink-0 flex items-center gap-1"
                  >
                    {task.actionIcon && <Icon name={task.actionIcon} className="text-[15px]" />}
                    <span>{task.actionLabel}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Floating Action Dock */}
          <div className="pt-4 flex items-center gap-3">
            <button
              aria-label="Task Filter & Sort Settings"
              onClick={() => showToast('Sort options: Due time, priority, operatory suite')}
              className="w-12 h-12 rounded-2xl bg-white text-[#3f4850] shadow-md border border-[#dae2fd] flex items-center justify-center hover:bg-[#eaedff] active:scale-95 transition-transform shrink-0"
            >
              <Icon name="tune" className="text-[22px]" />
            </button>

            <button
              onClick={() => setShowCreateModal(true)}
              className="flex-1 h-12 rounded-2xl bg-[#006194] text-white text-sm md:text-base font-semibold shadow-md flex items-center justify-center gap-2 hover:bg-[#004b73] active:scale-[0.98] transition-all"
            >
              <Icon name="add_task" className="text-[22px]" />
              <span>Create New Clinic Task</span>
            </button>
          </div>
        </div>
      </main>

      {/* Create Task Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="add_task" className="text-[18px]" />
                </div>
                <h3 className="font-bold text-base text-[#131b2e]">New Clinic Task Order</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Task Title & Instruction
                </label>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="e.g. Autoclave spore test run"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Category
                </label>
                <select
                  value={newTaskCategory}
                  onChange={(e) => setNewTaskCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="facility">Facility & Sterilization</option>
                  <option value="appointment">Appointment & Recare</option>
                  <option value="inventory">Inventory & Restocking</option>
                  <option value="clinical-ops">Clinical Ops & Diagnostic Review</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Priority
                </label>
                <select
                  value={newTaskPriority}
                  onChange={(e) => setNewTaskPriority(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="routine">Routine</option>
                  <option value="normal">Normal Priority</option>
                  <option value="high">High Priority</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTask}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#006194] text-white hover:bg-[#004b73]"
              >
                Create Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
