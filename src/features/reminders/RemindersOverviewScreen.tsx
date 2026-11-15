import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardShell } from '../dashboard/DashboardShell';
import { RemindersSubNav } from './RemindersSubNav';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'all' | 'daily' | 'checkups' | 'treatments' | 'appointments' | 'followup';

export function RemindersOverviewScreen() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [isOverdueCompleted, setIsOverdueCompleted] = useState(false);
  const [isTodayBrushCompleted, setIsTodayBrushCompleted] = useState(false);
  const [directiveModalOpen, setDirectiveModalOpen] = useState(false);
  const [familySyncEnabled, setFamilySyncEnabled] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleMarkOverdueComplete = () => {
    setIsOverdueCompleted(true);
    showToast('Post-Op Desensitizing Rinse marked complete.');
  };

  const handleDoneTodayBrush = () => {
    setIsTodayBrushCompleted(true);
    showToast('Morning Sulcular Brushing recorded! 14-day streak maintained.');
  };

  const handleSnooze = (mins: number) => {
    showToast(`Reminder snoozed for +${mins} minutes.`);
  };

  return (
    <DashboardShell pageTitle="Reminders Overview">
      <RemindersSubNav />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-24 sm:bottom-8 left-4 right-4 sm:left-auto sm:right-8 z-50 max-w-md p-3.5 bg-inverse-surface text-inverse-on-surface rounded-xl shadow-xl flex items-center gap-3 animate-fade-in">
          <Icon name="check_circle" className="text-[20px] text-secondary shrink-0" />
          <span className="font-body-sm text-body-sm leading-snug">{toastMessage}</span>
        </div>
      )}

      {/* Directive Modal */}
      {directiveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl flex flex-col gap-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-outline-variant/30 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-fixed text-on-primary-fixed-variant flex items-center justify-center">
                  <Icon name="medication" className="text-[18px]" />
                </div>
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                  Clinician Directive Details
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setDirectiveModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container text-on-surface-variant"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="p-3.5 bg-surface-container-low rounded-xl flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-bold">
                  Prescription Target
                </span>
                <span className="font-title-sm text-title-sm text-on-surface">
                  Tooth #16 • Upper Right Molar (Crown Margin)
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Prescribed by Dr. Farouk Al-Mansoori (DHA Lic #48912)
                </span>
              </div>

              <div className="p-3.5 bg-secondary-container/30 rounded-xl text-on-secondary-container flex flex-col gap-1 border border-secondary/20">
                <span className="font-label-sm text-label-sm font-bold">Regimen Protocol:</span>
                <p className="font-body-sm text-body-sm leading-relaxed">
                  “Apply 10ml desensitizing solution directly around tooth #16 crown margin post composite restoration twice daily for 7 days. Avoid rinsing with water for 15 minutes after application.”
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setDirectiveModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-primary text-on-primary font-title-sm hover:bg-primary-container"
              >
                Understood &amp; Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Active Patient Notice & Family Quick-Switcher Card */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-surface-container-low px-5 py-4 rounded-2xl border border-outline-variant/20 gap-4 shadow-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="relative shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-headline-sm text-headline-sm font-bold shadow-2xs">
                SA
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-secondary rounded-full ring-2 ring-surface"></span>
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-title-md text-title-md text-on-surface font-bold truncate">
                  Sarah Al-Mansoor
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                  Primary
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                File #DHA-789-2041 • Enrolled Dubai Care
              </span>
            </div>
          </div>

          <NavLink
            to="/patient-dashboard/guardian"
            className="px-4 py-2 rounded-xl bg-surface-container-lowest hover:bg-surface-container transition-colors flex items-center gap-2 shadow-2xs shrink-0 text-primary font-label-md text-label-md font-semibold self-start sm:self-auto"
          >
            <Icon name="swap_horiz" className="text-[18px]" />
            <span>Switch Patient</span>
          </NavLink>
        </div>

        {/* Metric Strip / Status Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Due Today */}
          <div className="bg-primary-container text-on-primary-container p-4 rounded-2xl flex flex-col justify-between shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between">
              <Icon name="today" className="text-[20px] text-primary-fixed" />
              <span className="w-2.5 h-2.5 rounded-full bg-secondary-fixed"></span>
            </div>
            <div className="mt-3">
              <span className="font-headline-lg text-headline-lg font-bold block leading-none text-on-primary">
                {isTodayBrushCompleted ? '1' : '2'}
              </span>
              <span className="font-label-sm text-label-sm text-primary-fixed mt-1 block truncate">
                Due Today
              </span>
            </div>
          </div>

          {/* Upcoming */}
          <div className="bg-surface-container-lowest text-on-surface p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <Icon name="event_upcoming" className="text-[20px] text-primary" />
            </div>
            <div className="mt-3">
              <span className="font-headline-lg text-headline-lg font-bold block leading-none text-on-surface">
                4
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block truncate">
                Upcoming
              </span>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-error-container text-on-error-container p-4 rounded-2xl flex flex-col justify-between shadow-xs">
            <div className="flex items-center justify-between">
              <Icon name="warning" className="text-[20px] text-error" />
              {!isOverdueCompleted && (
                <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
              )}
            </div>
            <div className="mt-3">
              <span className="font-headline-lg text-headline-lg font-bold block leading-none text-error">
                {isOverdueCompleted ? '0' : '1'}
              </span>
              <span className="font-label-sm text-label-sm text-on-error-container mt-1 block truncate">
                Overdue
              </span>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-surface-container-lowest text-on-surface p-4 rounded-2xl flex flex-col justify-between shadow-xs border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <Icon name="task_alt" className="text-[20px] text-secondary" />
            </div>
            <div className="mt-3">
              <span className="font-headline-lg text-headline-lg font-bold block leading-none text-on-surface">
                {12 + (isOverdueCompleted ? 1 : 0) + (isTodayBrushCompleted ? 1 : 0)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant mt-1 block truncate">
                Completed
              </span>
            </div>
          </div>
        </div>

        {/* Search & Sort Filter Toolbar */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dental reminders, teeth, meds..."
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-lowest text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-xs border border-outline-variant/30"
            />
          </div>

          <button
            type="button"
            onClick={() => setSortAscending(!sortAscending)}
            className="h-11 px-4 rounded-xl bg-surface-container-lowest flex items-center gap-2 text-on-surface shadow-xs hover:bg-surface-container border border-outline-variant/30 transition-colors shrink-0 w-full sm:w-auto justify-center"
          >
            <Icon name="swap_vert" className="text-[18px] text-primary" />
            <span className="font-label-md text-label-md font-medium">
              Sort: {sortAscending ? 'Due Date (Earliest)' : 'Due Date (Latest)'}
            </span>
          </button>
        </div>

        {/* Category Filter Pills (Horizontal Scroll) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: 'All', count: 7 },
            { id: 'daily', label: 'Daily Oral Care', count: 2 },
            { id: 'checkups', label: 'Check-ups', count: 1 },
            { id: 'treatments', label: 'Pending Treatments', count: 2 },
            { id: 'appointments', label: 'Appointments', count: 1 },
            { id: 'followup', label: 'Follow-up Care', count: 1 },
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as CategoryFilter)}
              className={`shrink-0 px-4 py-2 rounded-full font-label-sm text-label-sm flex items-center gap-1.5 transition-all shadow-xs ${
                activeCategory === cat.id
                  ? 'bg-primary text-on-primary font-bold'
                  : 'bg-surface-container-lowest hover:bg-surface-container text-on-surface-variant border border-outline-variant/30'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  activeCategory === cat.id ? 'bg-white/20' : 'bg-surface-container'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Feed Column (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* SECTION 1: Overdue & Critical Attention */}
            {!isOverdueCompleted && (activeCategory === 'all' || activeCategory === 'followup') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="priority_high" className="text-error text-[20px]" />
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Attention Required
                    </h2>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold">
                    1 Critical
                  </span>
                </div>

                {/* Overdue Card */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-error/30 space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 left-0 bottom-0 w-2 bg-error"></div>
                  <div className="flex items-start justify-between gap-3 pl-2">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-error-container text-on-error-container font-label-sm text-label-sm uppercase tracking-wider font-bold">
                          2 Days Overdue
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-medium">
                          Follow-up Care
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold pt-0.5">
                        Post-Op Desensitizing Rinse
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Scheduled for: Jan 18, 2025 • Daily regimen completion missed
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-error-container flex items-center justify-center shrink-0 text-error shadow-2xs">
                      <Icon name="medication" className="text-[22px]" />
                    </div>
                  </div>

                  {/* Diagnostic Details */}
                  <div className="bg-surface-container-low rounded-xl p-3.5 space-y-2 border border-outline-variant/20 ml-2">
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <Icon name="dentistry" className="text-[17px] text-primary" /> Tooth Target:
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface bg-surface-container px-2.5 py-0.5 rounded font-mono font-semibold">
                        #16 (Upper Right Molar)
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-body-sm font-body-sm">
                      <span className="text-on-surface-variant flex items-center gap-1.5">
                        <Icon name="verified_user" className="text-[17px] text-secondary" /> Prescriber:
                      </span>
                      <span className="font-title-sm text-title-sm text-on-surface truncate">
                        Dr. Farouk Al-Mansoori
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant italic pt-1 border-t border-surface-container">
                      “Apply 10ml solution directly around tooth #16 crown margin post composite restoration.”
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2.5 pt-1 ml-2">
                    <button
                      type="button"
                      onClick={handleMarkOverdueComplete}
                      className="min-h-[44px] flex-1 py-2 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container active:scale-[0.98] transition-all"
                    >
                      <Icon name="check_circle" className="text-[18px]" />
                      <span>Mark Complete</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDirectiveModalOpen(true)}
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors"
                    >
                      <Icon name="description" className="text-[18px]" />
                      <span>Directive</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 2: Due Today */}
            {(activeCategory === 'all' || activeCategory === 'daily' || activeCategory === 'treatments') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="notifications_active" className="text-primary text-[20px]" />
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Due Today
                    </h2>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {isTodayBrushCompleted ? '1 Task' : '2 Tasks'}
                  </span>
                </div>

                {/* Due Today Card 1: Habit */}
                {!isTodayBrushCompleted && (
                  <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold">
                            8:00 AM Routine
                          </span>
                          <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                            Daily Oral Care
                          </span>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface font-bold pt-1">
                          Fluoride &amp; Sulcular Brush
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          45-degree angle technique targeting gingival margins
                        </p>
                      </div>
                      <div className="w-11 h-11 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 shadow-2xs">
                        <Icon name="brush" className="text-[22px]" />
                      </div>
                    </div>

                    {/* Streak Badge */}
                    <div className="flex items-center justify-between bg-surface-container-low px-4 py-2.5 rounded-xl border border-outline-variant/20">
                      <div className="flex items-center gap-2.5">
                        <Icon name="local_fire_department" filled className="text-amber-500 text-[22px]" />
                        <div>
                          <span className="font-title-sm text-title-sm text-on-surface block leading-tight font-bold">
                            14-Day Healthy Streak!
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Consistent plaque mitigation score +12%
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm text-secondary font-bold">
                        Personal Habit
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2.5 pt-1">
                      <button
                        type="button"
                        onClick={handleDoneTodayBrush}
                        className="min-h-[44px] flex-1 py-2 px-4 rounded-xl bg-secondary text-on-secondary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-xs hover:opacity-90 active:scale-[0.98] transition-all"
                      >
                        <Icon name="done_all" className="text-[18px]" />
                        <span>Done for Today</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSnooze(30)}
                        className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors"
                      >
                        <Icon name="snooze" className="text-[18px]" />
                        <span>+30m</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Due Today Card 2: Treatment Acceptance */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                          Pending Plan
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Preventive Sealant
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold pt-1">
                        Accept Fissure Sealant Treatment
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Tooth #36 recommended for caries prevention before deep enamel penetration.
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-tertiary-fixed-dim flex items-center justify-center text-primary shrink-0 shadow-2xs">
                      <Icon name="health_and_safety" className="text-[22px]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-surface-container-low p-3 rounded-xl border border-outline-variant/20 text-body-sm">
                    <div>
                      <span className="text-on-surface-variant text-[11px] block">Recommendation Date</span>
                      <span className="font-title-sm text-title-sm text-on-surface font-semibold">Dec 12, 2024</span>
                    </div>
                    <div>
                      <span className="text-on-surface-variant text-[11px] block">Recommended Window</span>
                      <span className="font-title-sm text-title-sm text-primary font-semibold">Within 4 Weeks</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 pt-1">
                    <NavLink
                      to="/patient-dashboard/reminders/treatments"
                      className="min-h-[44px] flex-1 py-2 px-4 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-primary-container active:scale-[0.98] transition-all"
                    >
                      <Icon name="calendar_add_on" className="text-[18px]" />
                      <span>Schedule Booking</span>
                    </NavLink>
                    <NavLink
                      to="/patient-dashboard/reminders/details"
                      className="min-h-[44px] px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors"
                    >
                      <span>Details</span>
                      <Icon name="chevron_right" className="text-[16px]" />
                    </NavLink>
                  </div>
                </div>
              </div>
            )}

            {/* SECTION 3: Upcoming Schedule */}
            {(activeCategory === 'all' || activeCategory === 'appointments' || activeCategory === 'checkups') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon name="calendar_month" className="text-primary text-[20px]" />
                    <h2 className="font-headline-sm text-headline-sm text-on-surface">
                      Upcoming Schedule
                    </h2>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    3 Action Items
                  </span>
                </div>

                {/* Upcoming 1: Prophylaxis Appointment */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold flex items-center gap-1">
                          <Icon name="verified" filled className="text-[12px]" /> Confirmed
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Clinic Visit
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold pt-1">
                        Enamel Fluoride Touchup &amp; Prophylaxis
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Friday, Jan 24, 2025 at 10:30 AM
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-surface-container flex items-center justify-center text-primary shrink-0 shadow-2xs">
                      <Icon name="medical_information" className="text-[22px]" />
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-3 border border-outline-variant/20">
                    <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 text-primary">
                      <Icon name="location_on" className="text-[18px]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="font-title-sm text-title-sm text-on-surface block truncate font-semibold">
                        Al Zahra Dental Hub • Room 302
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant block truncate">
                        Dr. Farouk Al-Mansoori (Orthodontic &amp; Prophy)
                      </span>
                    </div>
                  </div>

                  <NavLink
                    to="/patient-dashboard/reminders/appointments"
                    className="w-full min-h-[44px] py-2 px-4 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="qr_code_2" className="text-[18px] text-primary" />
                    <span>View Pass &amp; Clinic Directions</span>
                  </NavLink>
                </div>

                {/* Upcoming 2: 6-Month Routine Examination Opening */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                          Eligibility Window
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Dental Check-ups
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold pt-1">
                        6-Month Routine Examination
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Recommended window opens in April 2025 based on last check-up (Dec 12, 2024).
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-xl bg-surface-container-low flex items-center justify-center text-on-surface-variant shrink-0">
                      <Icon name="stethoscope" className="text-[22px]" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 font-medium">
                      <Icon name="check" className="text-[16px] text-secondary" /> DHA Insured Coverage: 100%
                    </span>
                    <NavLink
                      to="/patient-dashboard/reminders/checkups"
                      className="min-h-[40px] px-4 py-1.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center gap-1 shadow-xs hover:bg-primary-container"
                    >
                      <span>Book Check-up</span>
                    </NavLink>
                  </div>
                </div>

                {/* Upcoming 3: Dependent Child Tariq Reminder */}
                <div className="bg-surface-container-lowest rounded-2xl p-5 sm:p-6 shadow-xs border border-outline-variant/30 space-y-4 border-l-4 border-l-secondary">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                          <Icon name="child_care" filled className="text-[12px]" /> Dependent Child: Tariq (6 yrs)
                        </span>
                        <span className="px-2.5 py-0.5 rounded-md bg-surface-container text-on-surface-variant font-label-sm text-label-sm">
                          Pediatric Care
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-bold pt-1">
                        Pediatric Fluoride Varnish Application
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Due: Jan 28, 2025 • High risk primary molar cavity prevention
                      </p>
                    </div>
                    <div className="w-11 h-11 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
                      <Icon name="vaccines" className="text-[20px]" />
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center justify-between border border-outline-variant/20">
                    <div className="flex items-center gap-2">
                      <Icon name="supervised_user_circle" className="text-[18px] text-primary" />
                      <span className="font-body-sm text-body-sm text-on-surface font-medium">
                        Guardian Permission Verified
                      </span>
                    </div>
                    <NavLink
                      to="/patient-dashboard/guardian"
                      className="text-primary font-title-sm text-title-sm font-semibold hover:underline flex items-center"
                    >
                      Manage <Icon name="chevron_right" className="text-[16px]" />
                    </NavLink>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar (4 cols on lg) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Guardian Multi-Child Reminder View Toggle Banner */}
            <div className="bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-2xl p-5 sm:p-6 shadow-md space-y-4 relative overflow-hidden">
              <div className="relative z-10 flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Icon name="diversity_1" className="text-[18px] text-secondary-fixed" />
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed font-bold">
                      Family Care Hub
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold">
                    Multi-Child Synced View
                  </h3>
                  <p className="font-body-sm text-body-sm text-primary-fixed leading-relaxed">
                    Seamlessly review and sync reminder streams for Sarah, Tariq (6), and Zayd (3) in a consolidated calendar.
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center shrink-0 shadow-2xs">
                  <Icon name="family_restroom" className="text-white text-[26px]" />
                </div>
              </div>

              {/* Toggle Action */}
              <div className="relative z-10 flex items-center justify-between pt-2 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-7 w-7 rounded-full bg-secondary-fixed ring-2 ring-primary text-on-secondary-fixed text-[10px] font-bold flex items-center justify-center">
                      S
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full bg-primary-fixed ring-2 ring-primary text-primary text-[10px] font-bold flex items-center justify-center">
                      T
                    </div>
                    <div className="inline-block h-7 w-7 rounded-full bg-surface ring-2 ring-primary text-on-surface text-[10px] font-bold flex items-center justify-center">
                      Z
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-white">
                    3 Dependents Linked
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setFamilySyncEnabled(!familySyncEnabled);
                    showToast(familySyncEnabled ? 'Family Synced View disabled' : 'Family Synced View enabled');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-surface text-primary font-label-md text-label-md font-semibold flex items-center gap-1 hover:bg-surface-container transition-colors shadow-xs"
                >
                  <span>{familySyncEnabled ? 'Synced' : 'Enable'}</span>
                  <Icon name={familySyncEnabled ? 'toggle_on' : 'toggle_off'} className="text-[18px]" />
                </button>
              </div>
            </div>

            {/* Educational Delighter / Micro Insight Tile */}
            <div className="bg-surface-container-low rounded-2xl p-5 flex items-start gap-3.5 border border-outline-variant/20 shadow-xs">
              <div className="w-11 h-11 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary shrink-0 shadow-2xs">
                <Icon name="lightbulb" className="text-[22px]" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-title-sm text-title-sm text-on-surface block font-bold">
                  DHA Clinical Tip
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mt-0.5">
                  Rinsing with desensitizing solution right after meals increases protective enamel barrier remineralization by 28%.
                </p>
              </div>
            </div>

            {/* Sub-Navigation Shortcut Card */}
            <div className="rounded-2xl bg-surface-container-lowest p-5 border border-outline-variant/30 shadow-xs flex flex-col gap-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-3">
                <Icon name="hub" className="text-primary text-[20px]" />
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Reminders Categories
                </h3>
              </div>
              <div className="space-y-2">
                <NavLink
                  to="/patient-dashboard/reminders/daily-care"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="brush" className="text-secondary text-[18px]" />
                    <span>Daily Oral Care Habits</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/reminders/checkups"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="stethoscope" className="text-primary text-[18px]" />
                    <span>Check-up Recalls</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>

                <NavLink
                  to="/patient-dashboard/reminders/treatments"
                  className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container flex items-center justify-between text-on-surface font-body-sm font-medium transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Icon name="healing" className="text-primary text-[18px]" />
                    <span>Pending Roadmaps</span>
                  </div>
                  <Icon name="chevron_right" className="text-[16px] text-on-surface-variant" />
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

