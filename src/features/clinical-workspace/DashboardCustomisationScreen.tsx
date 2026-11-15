import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';
import { Icon } from '../../design/Primitives';

interface WidgetConfig {
  id: string;
  title: string;
  icon: string;
  enabled: boolean;
}

interface ShortcutConfig {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  checked: boolean;
}

export function DashboardCustomisationScreen() {
  const navigate = useNavigate();

  // State
  const [landingPage, setLandingPage] = useState<'daily' | 'calendar' | 'queue'>('daily');
  const [presentationMode, setPresentationMode] = useState<'calendar' | 'list'>('list');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [widgets, setWidgets] = useState<WidgetConfig[]>([
    { id: 'w1', title: "Today's Appointments List", icon: 'calendar_today', enabled: true },
    { id: 'w2', title: 'Key Metric Indicator Cards', icon: 'insights', enabled: true },
    { id: 'w3', title: 'Quick Clinical Module Shortcuts', icon: 'apps', enabled: true },
    { id: 'w4', title: 'Priority Tasks & Work Queue', icon: 'assignment_turned_in', enabled: true },
    { id: 'w5', title: 'Recent Patient Activity Feed', icon: 'history', enabled: true },
    { id: 'w6', title: 'Weekly Clinical Volume Chart', icon: 'bar_chart', enabled: false },
    { id: 'w7', title: 'Clinic Announcements Banner', icon: 'campaign', enabled: false },
  ]);

  const [shortcuts, setShortcuts] = useState<ShortcutConfig[]>([
    { id: 's1', title: 'Quick Screening', subtitle: 'Section 8 • Triage Protocol', icon: 'stethoscope', checked: true },
    { id: 's2', title: 'Odontogram', subtitle: 'Section 9 • Tooth Chart Matrix', icon: 'dentistry', checked: true },
    { id: 's3', title: 'Detailed Exam', subtitle: 'Section 10 • Comprehensive Findings', icon: 'clinical_notes', checked: true },
    { id: 's4', title: 'Investigations', subtitle: 'Section 11 • Imaging & Lab Orders', icon: 'radiology', checked: true },
    { id: 's5', title: 'AI Clinical Summary', subtitle: 'Section 12 • Synthesis Assistant', icon: 'smart_toy', checked: true },
    { id: 's6', title: 'Treatment Plans', subtitle: 'Section 13 • Phase Sequencing', icon: 'checklist', checked: true },
    { id: 's7', title: 'Referrals', subtitle: 'Specialist Care Transitions', icon: 'outbox', checked: false },
    { id: 's8', title: 'Patient Messaging', subtitle: 'Direct Secure Comms', icon: 'chat_bubble_outline', checked: false },
    { id: 's9', title: 'Billing Ledger', subtitle: 'Financial Reconciliation', icon: 'receipt_long', checked: false },
  ]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const moveWidget = (index: number, direction: -1 | 1) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= widgets.length) return;
    const newWidgets = [...widgets];
    const [moved] = newWidgets.splice(index, 1);
    newWidgets.splice(targetIndex, 0, moved);
    setWidgets(newWidgets);
  };

  const toggleWidget = (id: string) => {
    setWidgets(
      widgets.map((w) => (w.id === id ? { ...w, enabled: !w.enabled } : w))
    );
  };

  const handleShortcutToggle = (id: string) => {
    const currentCheckedCount = shortcuts.filter((s) => s.checked).length;
    const target = shortcuts.find((s) => s.id === id);
    if (!target) return;

    if (!target.checked && currentCheckedCount >= 6) {
      showToast('Maximum of 6 shortcuts permitted on the persistent dock.');
      return;
    }

    setShortcuts(
      shortcuts.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s))
    );
  };

  const handleSave = () => {
    showToast('Dashboard layout & dock preferences updated successfully.');
    setTimeout(() => {
      navigate('/dentist/dashboard');
    }, 1200);
  };

  const handleReset = () => {
    setLandingPage('daily');
    setPresentationMode('list');
    setWidgets([
      { id: 'w1', title: "Today's Appointments List", icon: 'calendar_today', enabled: true },
      { id: 'w2', title: 'Key Metric Indicator Cards', icon: 'insights', enabled: true },
      { id: 'w3', title: 'Quick Clinical Module Shortcuts', icon: 'apps', enabled: true },
      { id: 'w4', title: 'Priority Tasks & Work Queue', icon: 'assignment_turned_in', enabled: true },
      { id: 'w5', title: 'Recent Patient Activity Feed', icon: 'history', enabled: true },
      { id: 'w6', title: 'Weekly Clinical Volume Chart', icon: 'bar_chart', enabled: false },
      { id: 'w7', title: 'Clinic Announcements Banner', icon: 'campaign', enabled: false },
    ]);
    setShortcuts((prev) =>
      prev.map((s, idx) => ({ ...s, checked: idx < 6 }))
    );
    showToast('Preferences reset to default DHA workspace configuration.');
  };

  const selectedShortcutCount = shortcuts.filter((s) => s.checked).length;

  return (
    <ClinicalWorkspaceShell
      pageTitle="Dashboard Customisation"
      badgeCode="14.2"
      badgeLabel="User Preferences Engine"
      activeNav="dashboard"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Operational Notice Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-[#f2f3ff] p-5 border border-[#eaedff] shadow-xs">
          <div className="flex items-start gap-3.5 relative z-10">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 text-[#006194] shadow-xs mt-0.5">
              <Icon name="tune" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">Personal Preference Engine</span>
                <span className="px-2 py-0.5 rounded-full bg-[#cce5ff]/50 text-[#004b73] text-[10px] font-bold uppercase tracking-wider">
                  Dr. James Profile
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                Customising layout personalises card arrangement and shortcuts for your account only. It does not alter your clinical role, credential scope, or patient data access permissions.
              </p>
            </div>
          </div>
        </div>

        {/* Responsive Grid: Settings on Left (7 cols), Live Wireframe Preview on Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Destination, Presentation & Widgets */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 1: Default Landing Page */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#131b2e]">
                  Default Landing Destination
                </label>
                <span className="text-xs font-bold text-[#006194] uppercase tracking-wider">
                  Start Screen
                </span>
              </div>

              <div className="space-y-3">
                <label
                  onClick={() => setLandingPage('daily')}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    landingPage === 'daily'
                      ? 'bg-[#cce5ff]/20 border-[#006194] shadow-xs ring-1 ring-[#006194]/20'
                      : 'bg-[#faf8ff] border-[#eaedff] hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="landing_page"
                    checked={landingPage === 'daily'}
                    onChange={() => setLandingPage('daily')}
                    className="mt-1 text-[#006194] focus:ring-[#006194]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#131b2e]">Daily Dashboard</span>
                      <span className="text-[10px] font-bold text-[#006a61] bg-[#86f2e4]/30 px-2 py-0.5 rounded-full">
                        Recommended
                      </span>
                    </div>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Overview of today's schedule, priority queues, and chairside metrics.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setLandingPage('calendar')}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    landingPage === 'calendar'
                      ? 'bg-[#cce5ff]/20 border-[#006194] shadow-xs ring-1 ring-[#006194]/20'
                      : 'bg-[#faf8ff] border-[#eaedff] hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="landing_page"
                    checked={landingPage === 'calendar'}
                    onChange={() => setLandingPage('calendar')}
                    className="mt-1 text-[#006194] focus:ring-[#006194]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-[#131b2e]">Appointments Calendar</span>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Direct multi-operatory calendar view for immediate chairside triage.
                    </p>
                  </div>
                </label>

                <label
                  onClick={() => setLandingPage('queue')}
                  className={`flex items-start gap-3.5 p-4 rounded-xl border cursor-pointer transition-all ${
                    landingPage === 'queue'
                      ? 'bg-[#cce5ff]/20 border-[#006194] shadow-xs ring-1 ring-[#006194]/20'
                      : 'bg-[#faf8ff] border-[#eaedff] hover:bg-white'
                  }`}
                >
                  <input
                    type="radio"
                    name="landing_page"
                    checked={landingPage === 'queue'}
                    onChange={() => setLandingPage('queue')}
                    className="mt-1 text-[#006194] focus:ring-[#006194]"
                  />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-[#131b2e]">Clinical Work Queue</span>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Task-first operational view prioritized by pathology urgency.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Section 2: Default Appointment Presentation Toggle */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#131b2e]">
                  Appointment Feed Presentation
                </label>
                <span className="text-xs text-[#707881]">Default View</span>
              </div>

              <div className="p-1 rounded-xl bg-[#f2f3ff] flex items-center border border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setPresentationMode('calendar')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    presentationMode === 'calendar'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="calendar_view_week" className="text-[18px]" />
                  <span>Weekly Calendar (14.3)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPresentationMode('list')}
                  className={`flex-1 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                    presentationMode === 'list'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="view_timeline" className="text-[18px]" />
                  <span>Chronological Table (14.4)</span>
                </button>
              </div>
            </div>

            {/* Section 4: Widget Visibility & Arrangement */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-[#131b2e]">
                    Dashboard Widgets Arrangement
                  </label>
                  <p className="text-xs text-[#707881] mt-0.5">
                    Use arrows to reorder precedence or toggles to show/hide items.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#006194] uppercase tracking-wider">
                  Reorder
                </span>
              </div>

              <div className="space-y-2.5">
                {widgets.map((w, idx) => (
                  <div
                    key={w.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      w.enabled
                        ? 'bg-[#faf8ff] border-[#eaedff]'
                        : 'bg-[#f2f3ff]/50 border-dashed border-[#bfc7d2] opacity-60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Stepper Buttons */}
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <button
                          type="button"
                          onClick={() => moveWidget(idx, -1)}
                          disabled={idx === 0}
                          className="w-6 h-5 rounded bg-white hover:bg-[#eaedff] disabled:opacity-30 flex items-center justify-center text-[#707881] shadow-xs transition-colors"
                          aria-label="Move Up"
                        >
                          <Icon name="keyboard_arrow_up" className="text-[16px]" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveWidget(idx, 1)}
                          disabled={idx === widgets.length - 1}
                          className="w-6 h-5 rounded bg-white hover:bg-[#eaedff] disabled:opacity-30 flex items-center justify-center text-[#707881] shadow-xs transition-colors"
                          aria-label="Move Down"
                        >
                          <Icon name="keyboard_arrow_down" className="text-[16px]" />
                        </button>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          w.enabled ? 'bg-[#cce5ff]/50 text-[#006194]' : 'bg-[#e2e7ff] text-[#707881]'
                        }`}
                      >
                        <Icon name={w.icon} className="text-[18px]" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#131b2e] truncate">{w.title}</span>
                        <span className="text-[10px] text-[#707881]">
                          Slot #{idx + 1} • {w.enabled ? 'Visible' : 'Hidden'}
                        </span>
                      </div>
                    </div>

                    {/* Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleWidget(w.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors focus:outline-none ${
                        w.enabled ? 'bg-[#006194]' : 'bg-[#bfc7d2]'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 rounded-full bg-white shadow-md transform transition-transform ${
                          w.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      ></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Live Canvas & Shortcuts Dock Configuration */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live Mobile Wireframe Preview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
                  <Icon name="smartphone" className="text-[18px] text-[#006194]" />
                  Live Wireframe Preview
                </span>
                <span className="text-[10px] font-bold text-[#006a61] bg-[#86f2e4]/30 px-2 py-0.5 rounded-full">
                  Reactive Canvas
                </span>
              </div>

              <div className="rounded-2xl bg-[#f2f3ff] p-4 flex flex-col items-center border border-[#eaedff]">
                <div className="w-full max-w-[270px] rounded-2xl bg-white p-3 shadow-md border border-[#eaedff] space-y-2.5">
                  {/* Miniature Top Bar */}
                  <div className="h-4 rounded bg-[#f2f3ff] flex items-center px-2 justify-between">
                    <div className="w-12 h-1.5 rounded-full bg-[#bfc7d2]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#006194]/40"></div>
                  </div>

                  {/* Dynamic Slots */}
                  <div className="space-y-1.5">
                    {widgets
                      .filter((w) => w.enabled)
                      .map((w, idx) => (
                        <div
                          key={w.id}
                          className="w-full py-1.5 px-2 rounded-lg bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between text-left"
                        >
                          <div className="flex items-center gap-1.5 truncate">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006194] shrink-0"></span>
                            <span className="text-[10px] font-semibold text-[#131b2e] truncate">
                              {w.title}
                            </span>
                          </div>
                          <span className="text-[9px] text-[#707881] font-bold">#{idx + 1}</span>
                        </div>
                      ))}
                  </div>

                  {/* Miniature Dock */}
                  <div className="pt-1.5 border-t border-[#eaedff] flex items-center justify-around">
                    {shortcuts
                      .filter((s) => s.checked)
                      .slice(0, 4)
                      .map((s) => (
                        <div
                          key={s.id}
                          className="w-6 h-6 rounded-lg bg-[#cce5ff]/40 flex items-center justify-center text-[#006194]"
                        >
                          <Icon name={s.icon} className="text-[13px]" />
                        </div>
                      ))}
                  </div>
                </div>
                <span className="text-[10px] text-[#707881] mt-2 text-center">
                  Live reactive mobile viewport reflects ordering & dock shortcuts
                </span>
              </div>
            </div>

            {/* Quick Clinical Shortcuts Configuration (Dock) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-bold text-[#131b2e]">
                    Quick Action Dock Shortcuts
                  </label>
                  <p className="text-xs text-[#707881]">Configure up to 6 priority modules.</p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    selectedShortcutCount === 6
                      ? 'bg-[#86f2e4]/30 text-[#006f66]'
                      : 'bg-[#cce5ff]/50 text-[#006194]'
                  }`}
                >
                  {selectedShortcutCount} / 6 Selected
                </span>
              </div>

              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {shortcuts.map((sc) => (
                  <label
                    key={sc.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] hover:bg-[#f2f3ff] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0 text-[#006194] shadow-xs">
                        <Icon name={sc.icon} className="text-[18px]" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-[#131b2e] truncate">{sc.title}</span>
                        <span className="text-[10px] text-[#707881] truncate">{sc.subtitle}</span>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={sc.checked}
                      onChange={() => handleShortcutToggle(sc.id)}
                      className="w-4 h-4 rounded text-[#006194] focus:ring-[#006194] accent-[#006194]"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Actions & Confirmation Group */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleSave}
                className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#004b73] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Icon name="save" className="text-[20px]" />
                <span>Save Preferences</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="w-full h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] font-bold text-xs flex items-center justify-center gap-2 border border-[#eaedff] transition-colors"
              >
                <Icon name="restart_alt" className="text-[18px]" />
                <span>Reset to Default Layout</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/dentist/dashboard')}
                className="w-full py-2 text-center text-xs text-[#707881] hover:text-[#131b2e] font-semibold transition-colors"
              >
                Cancel and Discard Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ClinicalWorkspaceShell>
  );
}
