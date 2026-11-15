import { useState } from 'react';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

interface HabitItem {
  id: string;
  title: string;
  subtitle: string;
  categoryBadge: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  time: string;
  cadence: string;
  sound: string;
  active: boolean;
  completed: boolean;
  completedTime?: string;
  rxProtocol?: boolean;
  prescribedBy?: string;
  guidanceNote?: string;
  dosage?: string;
}

const INITIAL_HABITS: HabitItem[] = [
  {
    id: 'habit-1',
    title: 'Morning Sulcular Brushing',
    subtitle: 'Soft bristle 45° sulcular angle vibratory stroke',
    categoryBadge: 'Bass Method',
    icon: 'water_bottle',
    iconBg: 'bg-primary-fixed',
    iconColor: 'text-primary',
    time: '08:00 AM',
    cadence: 'Daily A.M.',
    sound: 'Gentle Chime',
    active: true,
    completed: true,
    completedTime: '8:12 AM',
  },
  {
    id: 'habit-2',
    title: 'Evening Interdental Flossing',
    subtitle: 'C-shape contour cleaning in each interproximal pocket',
    categoryBadge: 'Proximal Care',
    icon: 'join_inner',
    iconBg: 'bg-tertiary-fixed',
    iconColor: 'text-tertiary',
    time: '09:30 PM',
    cadence: 'Post-Dinner',
    sound: 'Haptic Pulse',
    active: true,
    completed: false,
  },
  {
    id: 'habit-3',
    title: 'Fluoride Rinse (5000 ppm)',
    subtitle: 'Prescribed by Dr. Farouk Al-Mansoori • Dec 12, 2024',
    categoryBadge: 'Rx Protocol',
    icon: 'medication',
    iconBg: 'bg-secondary-container',
    iconColor: 'text-on-secondary-container',
    time: '10:00 PM',
    cadence: 'Daily Night',
    sound: 'Chime',
    active: true,
    completed: false,
    rxProtocol: true,
    prescribedBy: 'Dr. Farouk Al-Mansoori',
    guidanceNote: 'Patient controlled cadence derived from clinical remineralization prescription. Do not ingest liquids for 30 minutes post-rinse.',
    dosage: '10 mL dose',
  },
];

export function DailyCareRemindersScreen() {
  const [habits, setHabits] = useState<HabitItem[]>(INITIAL_HABITS);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [cadenceModalOpen, setCadenceModalOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<HabitItem | null>(null);
  const [newTime, setNewTime] = useState('08:00');
  const [customTitle, setCustomTitle] = useState('');
  const [customFrequency, setCustomFrequency] = useState('Daily (Evening)');
  const [customTargetTime, setCustomTargetTime] = useState('21:00');
  const [customStyle, setCustomStyle] = useState('chime');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const completedCount = habits.filter((h) => h.completed).length;
  const progressPercent = Math.round((completedCount / habits.length) * 100);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleHabitActive = (id: string) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, active: !h.active } : h))
    );
    showToast('Routine activation toggled.');
  };

  const handleMarkDone = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completed: true, completedTime: 'Just now' } : h
      )
    );
    showToast('Hygiene habit recorded! Streak maintained.');
  };

  const handleUndo = (id: string) => {
    setHabits((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completed: false, completedTime: undefined } : h
      )
    );
    showToast('Habit reset to pending.');
  };

  const handleSnooze = (period: string) => {
    showToast(`Reminder snoozed for ${period}.`);
  };

  const handleLogRxDose = () => {
    showToast('Prescription Fluoride Rinse (10mL) recorded in Clinical Log.');
  };

  const openCadenceEditor = (habit: HabitItem) => {
    setEditingHabit(habit);
    setCadenceModalOpen(true);
  };

  const saveCadenceTime = () => {
    if (!editingHabit) return;
    setHabits((prev) =>
      prev.map((h) =>
        h.id === editingHabit.id ? { ...h, time: newTime } : h
      )
    );
    setCadenceModalOpen(false);
    showToast(`Updated scheduled time to ${newTime}.`);
  };

  const handleSaveCustomHabit = () => {
    const title = customTitle.trim() || 'Custom Hygiene Reminder';
    const newHabit: HabitItem = {
      id: `custom-${Date.now()}`,
      title,
      subtitle: `Personal habit cadence (${customFrequency})`,
      categoryBadge: 'Self-Care',
      icon: 'health_and_safety',
      iconBg: 'bg-primary-fixed',
      iconColor: 'text-primary',
      time: customTargetTime,
      cadence: customFrequency,
      sound: customStyle === 'chime' ? 'Gentle Chime' : customStyle === 'haptic' ? 'Haptic Pulse' : 'Silent',
      active: true,
      completed: false,
    };
    setHabits((prev) => [...prev, newHabit]);
    setCustomModalOpen(false);
    setCustomTitle('');
    showToast(`Added: "${title}" to your active routine!`);
  };

  return (
    <DashboardShell pageTitle="Daily Oral Care Reminders">
      <RemindersSubNav />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="verified" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Custom Habit Creator Modal */}
      {customModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container-lowest w-full max-w-md rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-up max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon name="add_task" className="text-[20px]" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  New Hygiene Reminder
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCustomModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            {/* Presets */}
            <div className="space-y-1.5">
              <label className="font-title-sm text-title-sm text-on-surface font-semibold">
                Popular Presets
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Aligner Sanitization', time: '21:00', freq: 'Daily (Evening)' },
                  { name: 'Mouthguard Soak', time: '20:00', freq: 'Weekly on Sunday' },
                  { name: 'Tongue Scraping', time: '08:05', freq: 'Daily (Morning)' },
                ].map((preset) => (
                  <button
                    key={preset.name}
                    type="button"
                    onClick={() => {
                      setCustomTitle(preset.name);
                      setCustomTargetTime(preset.time);
                      setCustomFrequency(preset.freq);
                    }}
                    className="px-3 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors border border-outline-variant/30"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-1.5">
              <label className="font-title-sm text-title-sm text-on-surface font-semibold">
                Reminder Title
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder="e.g. Aligner disinfectant tablet soak"
                className="w-full h-11 px-3.5 bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Frequency
                </label>
                <select
                  value={customFrequency}
                  onChange={(e) => setCustomFrequency(e.target.value)}
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none"
                >
                  <option>Daily (Twice)</option>
                  <option>Daily (Evening)</option>
                  <option>Daily (Morning)</option>
                  <option>Every 2 Days</option>
                  <option>Weekly on Sunday</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-title-sm text-title-sm text-on-surface font-semibold">
                  Target Time
                </label>
                <input
                  type="time"
                  value={customTargetTime}
                  onChange={(e) => setCustomTargetTime(e.target.value)}
                  className="w-full h-11 px-3 bg-surface-container-low rounded-xl text-on-surface font-body-md text-body-md border border-outline-variant/30 focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-title-sm text-title-sm text-on-surface font-semibold">
                Notification Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'chime', label: 'Chime', icon: 'notifications_active' },
                  { id: 'haptic', label: 'Haptic', icon: 'vibration' },
                  { id: 'silent', label: 'Silent', icon: 'volume_off' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCustomStyle(s.id)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all ${
                      customStyle === s.id
                        ? 'bg-primary-fixed border-primary text-primary font-bold shadow-xs'
                        : 'bg-surface-container-low border-outline-variant/30 text-on-surface hover:bg-surface-container'
                    }`}
                  >
                    <Icon name={s.icon} className="text-[20px]" />
                    <span className="font-label-sm text-[11px] mt-1">{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2 border-t border-outline-variant/20">
              <button
                type="button"
                onClick={() => setCustomModalOpen(false)}
                className="flex-1 h-11 bg-surface-container hover:bg-surface-container-high text-on-surface font-title-sm text-title-sm rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomHabit}
                className="flex-1 h-11 bg-primary hover:bg-primary-container text-on-primary font-title-sm text-title-sm rounded-xl transition-colors shadow-xs font-semibold"
              >
                Save Routine
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cadence Time Picker Modal */}
      {cadenceModalOpen && editingHabit && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-surface-container-lowest w-full max-w-sm rounded-2xl p-6 shadow-2xl flex flex-col gap-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-primary">
                  <Icon name="edit_calendar" className="text-[20px]" />
                </div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Adjust Reminder Time
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCadenceModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="space-y-1">
              <p className="font-title-sm text-title-sm text-primary font-semibold">
                {editingHabit.title}
              </p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Set your preferred notification alert window.
              </p>
            </div>

            <div className="py-2 flex items-center justify-center">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="h-12 px-5 text-center font-headline-md text-headline-md bg-surface-container-low rounded-xl text-primary border border-outline-variant/30 focus:outline-none"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCadenceModalOpen(false)}
                className="flex-1 h-11 bg-surface-container text-on-surface font-title-sm text-title-sm rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveCadenceTime}
                className="flex-1 h-11 bg-primary text-on-primary font-title-sm text-title-sm rounded-xl transition-colors font-semibold"
              >
                Update Time
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Subheader */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
              <span className="font-label-sm text-label-sm text-secondary tracking-wider uppercase font-bold">
                Preventive Regimen
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-md sm:text-headline-lg text-on-surface tracking-tight">
              Daily Oral Care Habits
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Personal preventive regimen, brushing techniques &amp; cadence control for Sarah Al-Mansoor
            </p>
          </div>

          <button
            type="button"
            onClick={() => setCustomModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-title-sm text-title-sm font-semibold flex items-center gap-2 shadow-xs hover:bg-primary-container self-start sm:self-auto active:scale-95 transition-all"
          >
            <Icon name="add" className="text-[18px]" />
            <span>Add Custom Reminder</span>
          </button>
        </div>

        {/* Gamified Hero Bento (Desktop 12-col or Top Bento) */}
        <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            {/* Streak Badge */}
            <div className="flex items-center gap-3 bg-surface-container-low px-4 py-2 rounded-2xl border border-outline-variant/20 w-fit">
              <div className="w-8 h-8 rounded-full bg-error-container text-on-error-container flex items-center justify-center shadow-2xs">
                <Icon name="local_fire_department" filled className="text-[20px]" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none">
                  14 Days
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant leading-tight">
                  Consistency Streak
                </span>
              </div>
            </div>

            {/* DHA Clinical Benchmark Badge */}
            <div className="flex items-center gap-1.5 text-secondary bg-secondary-container/30 px-3.5 py-1.5 rounded-xl border border-secondary/20 w-fit">
              <Icon name="health_and_safety" filled className="text-[18px]" />
              <span className="font-label-sm text-label-sm font-bold uppercase tracking-wide">
                Tier 1 Compliance
              </span>
            </div>
          </div>

          {/* Ring & Progress Metric Split */}
          <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 bg-surface-container-low p-5 rounded-2xl border border-outline-variant/20">
            {/* SVG Progress Ring */}
            <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 72 72">
                <circle
                  className="stroke-surface-container-highest"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  strokeWidth="6"
                ></circle>
                <circle
                  className="stroke-primary transition-all duration-700 ease-out"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * progressPercent) / 100}
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-headline-md text-headline-md text-primary font-bold leading-none">
                  {progressPercent}%
                </span>
                <span className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">Today</span>
              </div>
            </div>

            {/* Detail Snapshot */}
            <div className="flex flex-col min-w-0 flex-1 justify-center space-y-2 w-full">
              <div className="flex items-center justify-between">
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  Today's Care Progress
                </span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {completedCount} of {habits.length} Complete
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sulcular morning brushing completed; evening flossing &amp; fluoride rinse tracked for night.
              </p>
              <div className="w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 12-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Habit Cards Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <Icon name="calendar_today" className="text-primary text-[22px]" />
                <span>Active Prescribed Routines</span>
              </h2>
              <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg">
                {habits.length} Prescribed / Tracked
              </span>
            </div>

            {/* Stack of Habit Cards */}
            <div className="flex flex-col gap-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className={`bg-surface-container-lowest rounded-2xl shadow-xs border border-outline-variant/30 p-5 sm:p-6 transition-all ${
                    !habit.active ? 'opacity-50' : ''
                  }`}
                >
                  {/* Top Row: Title, Badge, Master Switch */}
                  <div className="flex items-start justify-between gap-3 pb-3">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl ${habit.iconBg} ${habit.iconColor} flex items-center justify-center shrink-0 shadow-2xs mt-0.5`}
                      >
                        <Icon name={habit.icon} className="text-[24px]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-title-md text-title-md text-on-surface font-bold">
                            {habit.title}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full font-label-sm text-[11px] font-semibold tracking-wide ${
                              habit.rxProtocol
                                ? 'bg-secondary-container text-on-secondary-container'
                                : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {habit.categoryBadge}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          {habit.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Master Switch */}
                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                      <input
                        type="checkbox"
                        checked={habit.active}
                        onChange={() => handleToggleHabitActive(habit.id)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-surface-dim after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  {/* Guidance Note if Rx */}
                  {habit.guidanceNote && (
                    <div className="bg-surface-container-low rounded-xl p-3 my-2 flex items-start gap-2.5 border border-outline-variant/20">
                      <Icon name="info" className="text-secondary text-[18px] shrink-0 mt-0.5" />
                      <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                        {habit.guidanceNote}
                      </p>
                    </div>
                  )}

                  {/* Meta Row: Time, Cadence, Tone */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 bg-surface-container-low rounded-xl px-3 my-3 text-center border border-outline-variant/20">
                    <button
                      type="button"
                      onClick={() => openCadenceEditor(habit)}
                      className="flex flex-col items-center justify-center p-1 rounded-lg hover:bg-surface-container transition-colors"
                    >
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                        Time
                      </span>
                      <span className="font-title-sm text-title-sm text-primary flex items-center gap-1 font-semibold">
                        {habit.time}
                        <Icon name="edit" className="text-[14px]" />
                      </span>
                    </button>

                    <div className="flex flex-col items-center justify-center p-1">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                        Cadence
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                        {habit.cadence}
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center p-1">
                      <span className="font-label-sm text-[10px] text-on-surface-variant uppercase font-semibold">
                        Sound / Alert
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface flex items-center gap-1 truncate font-semibold">
                        <Icon name="volume_up" className="text-[15px] text-secondary" />
                        {habit.sound}
                      </span>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                    {habit.completed ? (
                      <div className="flex items-center gap-2 text-secondary">
                        <Icon name="check_circle" filled className="text-[20px]" />
                        <span className="font-label-md text-label-md font-bold">
                          Completed at {habit.completedTime || '8:12 AM'}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-on-surface-variant">
                        <Icon name="schedule" className="text-[18px] text-primary" />
                        <span className="font-label-md text-label-md font-semibold">
                          Scheduled: Due Today
                        </span>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      {habit.rxProtocol ? (
                        <button
                          type="button"
                          onClick={handleLogRxDose}
                          className="min-h-[38px] px-4 py-1.5 bg-secondary hover:bg-on-secondary-fixed-variant text-on-secondary font-title-sm text-title-sm rounded-xl transition-colors flex items-center gap-1.5 shadow-xs font-semibold"
                        >
                          <Icon name="colorize" className="text-[16px]" />
                          <span>Log Dose ({habit.dosage})</span>
                        </button>
                      ) : habit.completed ? (
                        <button
                          type="button"
                          onClick={() => handleUndo(habit.id)}
                          className="min-h-[36px] px-3.5 py-1 bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant font-label-md text-label-md rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Icon name="undo" className="text-[15px]" />
                          <span>Undo</span>
                        </button>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => handleMarkDone(habit.id)}
                            className="min-h-[40px] px-4 py-1.5 bg-primary text-on-primary font-title-sm text-title-sm rounded-xl hover:bg-primary-container transition-colors flex items-center gap-1.5 shadow-xs font-semibold"
                          >
                            <Icon name="done_all" className="text-[18px]" />
                            <span>Mark Done</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleSnooze('1 Hour')}
                            className="min-h-[40px] px-3 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-xl transition-colors flex items-center gap-1"
                          >
                            <Icon name="snooze" className="text-[16px]" />
                            <span>+1 Hr</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Weekly Debridement Cadence 7-Day Dot Tracker */}
            <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xs">
                    <Icon name="monitoring" className="text-[18px]" />
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    Weekly Debridement Cadence
                  </h3>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  100% Run
                </span>
              </div>

              {/* 7-Day Array */}
              <div className="grid grid-cols-7 gap-1.5 py-1">
                {['M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1">
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-semibold">
                      {day}
                    </span>
                    <div className="w-9 h-9 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-2xs">
                      <Icon name="check" filled className="text-[16px]" />
                    </div>
                  </div>
                ))}
                {/* Sun (Today) */}
                <div className="flex flex-col items-center gap-1">
                  <span className="font-label-sm text-[11px] text-primary font-bold">S</span>
                  <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-2xs">
                    <Icon
                      name={progressPercent === 100 ? 'check' : 'hourglass_top'}
                      className="text-[16px]"
                    />
                  </div>
                </div>
              </div>

              {/* Benchmark Note */}
              <div className="bg-surface-container-low p-3.5 rounded-xl flex items-start gap-3 border border-outline-variant/20">
                <Icon name="verified_user" className="text-primary text-[20px] shrink-0 mt-0.5" />
                <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                  Maintaining twice-daily biofilm debridement reduces gingival inflammation risk by{' '}
                  <strong className="text-on-surface font-semibold">42%</strong> (
                  <span className="text-primary font-medium">DHA Preventive Benchmark</span>).
                </p>
              </div>
            </div>

            {/* Quick Navigation to other reminder screens */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <Icon name="brush" className="text-secondary text-[20px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Preventive Care Guides
                </h3>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1 border border-outline-variant/20">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    The Modified Bass Method
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    Angle the bristles 45° to the gum line. Use short vibratory strokes back and forth across 2–3 teeth at a time.
                  </p>
                </div>

                <div className="p-3 bg-surface-container-low rounded-xl flex flex-col gap-1 border border-outline-variant/20">
                  <span className="font-title-sm text-title-sm text-on-surface font-semibold">
                    Interdental Cleaning
                  </span>
                  <p className="font-body-sm text-[12px] text-on-surface-variant leading-relaxed">
                    Curve floss in a 'C' shape around the side of each tooth. Gently glide beneath the gumline to sweep plaque without snapping.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

