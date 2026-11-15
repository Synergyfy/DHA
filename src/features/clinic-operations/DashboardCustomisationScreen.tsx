import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface WidgetItem {
  id: string;
  name: string;
  priorityTag: string;
  description: string;
  icon: string;
  active: boolean;
}

interface QuickActionItem {
  id: string;
  name: string;
  screenRef: string;
  icon: string;
  selected: boolean;
}

const INITIAL_WIDGETS: WidgetItem[] = [
  {
    id: 'w1',
    name: "Today's Appointments",
    priorityTag: 'P1',
    description: 'Timeline view of patient slots & progress',
    icon: 'calendar_today',
    active: true,
  },
  {
    id: 'w2',
    name: 'Waiting Room & Queue',
    priorityTag: 'P2',
    description: 'Check-ins & triage live wait times',
    icon: 'group',
    active: true,
  },
  {
    id: 'w3',
    name: 'Operatory Chairs Status',
    priorityTag: 'P3',
    description: 'Bay occupancy & sanitization cycle',
    icon: 'airline_seat_recline_extra',
    active: true,
  },
  {
    id: 'w4',
    name: 'Staff On-Duty',
    priorityTag: 'P4',
    description: 'Doctors, hygienists & dental nurses',
    icon: 'badge',
    active: true,
  },
  {
    id: 'w5',
    name: 'Daily Revenue Summary',
    priorityTag: 'Mgr OK',
    description: 'Counter receipts & copay totals',
    icon: 'payments',
    active: true,
  },
  {
    id: 'w6',
    name: 'Clinical Workflow Flow',
    priorityTag: 'Status-Only',
    description: 'Procedure stage counters',
    icon: 'vital_signs',
    active: true,
  },
  {
    id: 'w7',
    name: 'Equipment Maintenance Alerts',
    priorityTag: 'P5',
    description: 'Autoclave & compressor service cycles',
    icon: 'build',
    active: false,
  },
  {
    id: 'w8',
    name: 'Directives & Announcements',
    priorityTag: 'DHA',
    description: 'DHA regulatory bulletins & clinic news',
    icon: 'campaign',
    active: true,
  },
];

const INITIAL_QUICK_ACTIONS: QuickActionItem[] = [
  {
    id: 'qa1',
    name: 'Quick Walk-in Registration',
    screenRef: 'Screen 16.10',
    icon: 'person_add',
    selected: true,
  },
  {
    id: 'qa2',
    name: 'Book Appointment',
    screenRef: 'Screen 16.9',
    icon: 'event',
    selected: true,
  },
  {
    id: 'qa3',
    name: 'Patient Check-in Scanner',
    screenRef: 'Screen 16.13',
    icon: 'qr_code_scanner',
    selected: true,
  },
  {
    id: 'qa4',
    name: 'Equipment Maintenance Log',
    screenRef: 'Screen 16.26',
    icon: 'medical_services',
    selected: true,
  },
  {
    id: 'qa5',
    name: 'Record Counter Payment',
    screenRef: 'Screen 16.33',
    icon: 'point_of_sale',
    selected: false,
  },
  {
    id: 'qa6',
    name: 'Publish Announcement',
    screenRef: 'Screen 16.44',
    icon: 'announcement',
    selected: false,
  },
];

export function DashboardCustomisationScreen() {
  const navigate = useNavigate();
  const [defaultBranch, setDefaultBranch] = useState('wuse2');
  const [reportingPeriod, setReportingPeriod] = useState('today');
  const [widgets, setWidgets] = useState<WidgetItem[]>(INITIAL_WIDGETS);
  const [quickActions, setQuickActions] = useState<QuickActionItem[]>(INITIAL_QUICK_ACTIONS);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const toggleWidget = (id: string) => {
    setWidgets((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  const toggleQuickAction = (id: string) => {
    const selectedCount = quickActions.filter((qa) => qa.selected).length;
    setQuickActions((prev) =>
      prev.map((qa) => {
        if (qa.id === id) {
          if (!qa.selected && selectedCount >= 4) {
            triggerToast('Maximum 4 quick actions can be docked at once');
            return qa;
          }
          return { ...qa, selected: !qa.selected };
        }
        return qa;
      })
    );
  };

  const handleRestoreDefaults = () => {
    setDefaultBranch('wuse2');
    setReportingPeriod('today');
    setWidgets(INITIAL_WIDGETS);
    setQuickActions(INITIAL_QUICK_ACTIONS);
    triggerToast('Defaults restored successfully.');
  };

  const handleSave = () => {
    triggerToast('Workspace preferences successfully saved!');
    setTimeout(() => {
      navigate('/clinic-operations/dashboard');
    }, 1200);
  };

  const activeWidgetCount = widgets.filter((w) => w.active).length;
  const activeQACount = quickActions.filter((qa) => qa.selected).length;

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#006a61] text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-4xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-operations/dashboard')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Workspace Preferences
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                Dashboard Customisation
              </h1>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm text-white">
            <Icon name="person" className="text-[18px]" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Context & Persona Card */}
        <div className="p-5 rounded-3xl bg-white border border-[#dae2fd]/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006a61]" />
              <span>Facility Profile</span>
            </span>
            <span className="font-mono text-xs text-[#707881] bg-[#f2f3ff] px-2.5 py-0.5 rounded-full border border-[#dae2fd]">
              ID: WUS-04
            </span>
          </div>

          <div className="flex items-center gap-3.5 pt-1">
            <div className="w-12 h-12 rounded-2xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center text-base font-black font-mono shrink-0">
              DM
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-base font-bold text-[#131b2e] truncate">David Musa</p>
              <p className="text-xs text-[#3f4850] truncate">
                Clinic Manager • BrightSmile Dental Centre (Wuse 2)
              </p>
            </div>
          </div>

          <p className="text-xs text-[#707881] leading-relaxed">
            Personalise your operational workspace, metrics cadence, and fast-action shortcuts. Changes apply dynamically across sessions.
          </p>
        </div>

        {/* Section 1: Operational Scope & Defaults */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="tune" className="text-[#006194] text-[20px]" />
              <span>Operational Scope &amp; Defaults</span>
            </h2>
            <span className="text-xs font-semibold text-[#006a61]">Live Session</span>
          </div>

          <div className="space-y-3.5 pt-1">
            {/* Default Branch */}
            <div className="space-y-1.5">
              <label htmlFor="branch-selector" className="text-xs font-bold text-[#131b2e]">
                Default Operating Branch
              </label>
              <select
                id="branch-selector"
                value={defaultBranch}
                onChange={(e) => setDefaultBranch(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              >
                <option value="wuse2">Wuse 2 Branch (Current Default)</option>
                <option value="garki">Garki Branch (#002)</option>
                <option value="maitama">Maitama Branch (#003)</option>
                <option value="all">All Combined Branches</option>
              </select>
            </div>

            {/* Reporting Period */}
            <div className="space-y-1.5">
              <label htmlFor="period-selector" className="text-xs font-bold text-[#131b2e]">
                Reporting Cadence
              </label>
              <select
                id="period-selector"
                value={reportingPeriod}
                onChange={(e) => setReportingPeriod(e.target.value)}
                className="w-full h-11 px-3.5 rounded-xl bg-[#f2f3ff] text-xs sm:text-sm text-[#131b2e] border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              >
                <option value="today">Today (Live Shift - Realtime)</option>
                <option value="week">This Week (Rolling 7 Days)</option>
                <option value="month">Monthly Overview (Calendar Cycle)</option>
              </select>
            </div>

            {/* Role Profile View Mode Indicator */}
            <div className="p-3.5 rounded-2xl bg-[#86f2e4]/30 border border-[#86f2e4] flex items-start gap-3">
              <Icon name="verified_user" className="text-[#006a61] text-[22px] shrink-0 mt-0.5" />
              <div className="min-w-0">
                <span className="text-xs font-bold text-[#006f66]">Clinic Manager Tier</span>
                <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
                  Clinical finding notes masked by policy; full operations, dispatch capacity, and daily shift revenue enabled.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Widget Visibility & Ordering */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="grid_view" className="text-[#006194] text-[20px]" />
              <span>Widget Visibility &amp; Ordering</span>
            </h2>
            <span className="text-xs font-bold text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-0.5 rounded-full">
              {activeWidgetCount} of {widgets.length} Active
            </span>
          </div>
          <p className="text-xs text-[#707881]">
            Toggle widgets on or off, and view active indicators in your primary dashboard.
          </p>

          <div className="space-y-2.5 pt-1">
            {widgets.map((widget) => (
              <div
                key={widget.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  widget.active
                    ? 'bg-white border-[#dae2fd] hover:border-[#006194]'
                    : 'bg-[#f2f3ff]/60 border-transparent opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[#707881] cursor-grab">
                    <Icon name="drag_indicator" className="text-[18px]" />
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#eaedff] text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name={widget.icon} className="text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#131b2e] truncate">{widget.name}</span>
                      <span className="text-[10px] font-mono font-bold bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded">
                        {widget.priorityTag}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#707881] truncate">{widget.description}</p>
                  </div>
                </div>

                <label className="relative inline-flex items-center cursor-pointer shrink-0">
                  <input
                    type="checkbox"
                    checked={widget.active}
                    onChange={() => toggleWidget(widget.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-[#dae2fd] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#dae2fd] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]" />
                </label>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Quick Action Hub Configuration */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#131b2e] flex items-center gap-2">
              <Icon name="bolt" className="text-[#006194] text-[20px]" />
              <span>Quick Action Hub</span>
            </h2>
            <span className="text-xs font-mono font-bold text-[#006194]">
              {activeQACount} of 4 selected
            </span>
          </div>
          <p className="text-xs text-[#707881]">
            Select up to 4 rapid action triggers for your primary sticky dock.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
            {quickActions.map((qa) => (
              <label
                key={qa.id}
                onClick={(e) => {
                  e.preventDefault();
                  toggleQuickAction(qa.id);
                }}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ${
                  qa.selected
                    ? 'bg-white border-[#006194] ring-1 ring-[#006194]'
                    : 'bg-[#f2f3ff] border-[#dae2fd]/60 hover:bg-[#eaedff]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-white border border-[#dae2fd] flex items-center justify-center text-[#006194] shrink-0">
                    <Icon name={qa.icon} className="text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#131b2e] truncate block">
                      {qa.name}
                    </span>
                    <span className="text-[10px] font-mono text-[#707881]">{qa.screenRef}</span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={qa.selected}
                  readOnly
                  className="w-4 h-4 text-[#006194] accent-[#006194] rounded cursor-pointer shrink-0"
                />
              </label>
            ))}
          </div>
        </section>

        {/* Section 4: Security & Governance Notice */}
        <div className="p-4 sm:p-5 rounded-3xl bg-[#eaedff] border border-[#dae2fd] flex items-start gap-3">
          <Icon name="policy" className="text-[#006194] text-[22px] shrink-0 mt-0.5" />
          <div className="min-w-0">
            <h3 className="text-xs font-bold text-[#131b2e]">Statutory DHA Governance Notice</h3>
            <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
              Customisation adjusts personal display layout only. Access permissions to clinical records, diagnoses, and financial ledgers remain governed by statutory DHA role policies.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
          >
            <Icon name="save" className="text-[18px]" />
            <span>Save Preferences &amp; Apply</span>
          </button>
          <button
            type="button"
            onClick={handleRestoreDefaults}
            className="w-full h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            <span>Restore Default Dashboard</span>
          </button>
        </div>
      </main>
    </div>
  );
}
export default DashboardCustomisationScreen;
