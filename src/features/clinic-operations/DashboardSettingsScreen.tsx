import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface DockAction {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  shortLabel: string;
}

export const DashboardSettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [scope, setScope] = useState<'personal' | 'role'>('personal');
  const [initialView, setInitialView] = useState('16.1 Clinic Operations (Branch Focused)');
  const [refreshInterval, setRefreshInterval] = useState('Real-time sync (30s background poll)');
  const [density, setDensity] = useState<'expanded' | 'compact'>('expanded');
  const [trendCurves, setTrendCurves] = useState(true);

  // Metric Visibility Toggles
  const [metricFinancial, setMetricFinancial] = useState(true);
  const [metricOccupancy, setMetricOccupancy] = useState(true);
  const [metricStages, setMetricStages] = useState(true);
  const [metricAnnouncements, setMetricAnnouncements] = useState(true);

  // Dock Actions
  const dockOptions: DockAction[] = [
    { id: 'walkin', title: 'Quick Walk-in Registration', subtitle: 'Screen 16.10 • Direct Patient Intake', icon: 'person_add', shortLabel: 'Walk-in' },
    { id: 'booking', title: 'Book New Appointment', subtitle: 'Screen 16.9 • Fast Operatory Booking', icon: 'calendar_today', shortLabel: 'Booking' },
    { id: 'scan', title: 'Check-in Barcode Scanner', subtitle: 'Screen 16.13 • National ID / QR Pass', icon: 'qr_code_scanner', shortLabel: 'Scan ID' },
    { id: 'maintenance', title: 'Log Equipment Maintenance', subtitle: 'Screen 16.26 • Autoclave & X-Ray Safety', icon: 'medical_services', shortLabel: 'Maint.' },
    { id: 'payment', title: 'Record Counter Payment', subtitle: 'Screen 16.33 • Co-pay Settlement', icon: 'point_of_sale', shortLabel: 'Payment' },
    { id: 'broadcast', title: 'Broadcast Announcement', subtitle: 'Screen 16.44 • Staff Instant Push', icon: 'broadcast_on_personal', shortLabel: 'Notice' },
  ];

  const [selectedDockIds, setSelectedDockIds] = useState<string[]>(['walkin', 'booking', 'scan', 'maintenance']);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDockToggle = (id: string) => {
    if (selectedDockIds.includes(id)) {
      if (selectedDockIds.length <= 1) {
        showToast('Please maintain at least 1 fast action trigger.');
        return;
      }
      setSelectedDockIds(prev => prev.filter(item => item !== id));
    } else {
      if (selectedDockIds.length >= 4) {
        showToast('You can select up to 4 quick action triggers for the floating dock.');
        return;
      }
      setSelectedDockIds(prev => [...prev, id]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    showToast('Synchronizing settings with clinic central telemetry...');
    setTimeout(() => {
      setIsSaving(false);
      showToast('Dashboard configuration successfully saved & deployed!');
    }, 1200);
  };

  const handleReset = () => {
    setScope('role');
    setInitialView('16.1 Clinic Operations (Branch Focused)');
    setRefreshInterval('Real-time sync (30s background poll)');
    setDensity('expanded');
    setTrendCurves(true);
    setMetricFinancial(true);
    setMetricOccupancy(true);
    setMetricStages(true);
    setMetricAnnouncements(true);
    setSelectedDockIds(['walkin', 'booking', 'scan', 'maintenance']);
    showToast('Reset to BrightSmile Manager Tier defaults.');
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="dashboard_customize" className="text-[22px]" />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Workspace Setup</span>
                  <span className="text-[11px] text-[#707881]">•</span>
                  <span className="text-[11px] font-medium text-[#006194]">Section 16.46</span>
                </div>
                <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                  Dashboard Settings
                </h1>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="restart_alt" className="text-[16px]" />
              <span>Role Defaults</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#006194] text-xs font-bold text-white hover:bg-[#007bb9] shadow-sm transition-all active:scale-95"
            >
              <Icon name={isSaving ? 'refresh' : 'save'} className={`text-[16px] ${isSaving ? 'animate-spin' : ''}`} />
              <span>Save Config</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Context Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#00201d] text-xs font-extrabold uppercase">
                <Icon name="verified" className="text-[12px]" />
                BrightSmile Dental Centre
              </span>
              <span className="text-[#3f4850] text-xs font-semibold">Branch #04</span>
            </div>
            <p className="text-xs text-[#3f4850] mt-1 font-medium">
              Configure default views, live metrics & fast action dock for your manager workspace.
            </p>
          </div>

          {/* Scope Segmented Tabs */}
          <div className="bg-[#eaedff] p-1 rounded-xl flex items-center gap-1 shadow-sm shrink-0">
            <button
              type="button"
              onClick={() => setScope('personal')}
              className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all ${
                scope === 'personal'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Personal Preferences
            </button>
            <button
              type="button"
              onClick={() => setScope('role')}
              className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all ${
                scope === 'role'
                  ? 'bg-white text-[#006194] shadow-sm'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Role Presets (Manager)
            </button>
          </div>
        </div>

        {/* Section 1: Default Landing & Overview Mode */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="launch" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Default Landing & Sync
              </h2>
              <p className="text-xs text-[#3f4850]">App launch behavior and data refresh rate</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Initial Dashboard View */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Initial Dashboard View</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={initialView}
                  onChange={e => setInitialView(e.target.value)}
                >
                  <option>16.1 Clinic Operations (Branch Focused)</option>
                  <option>16.3 Organisation-Wide Overview</option>
                  <option>16.6 Appointment Calendar</option>
                  <option>16.13 Reception Desk</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
              <span className="text-[11px] text-[#707881] block">Loads immediately after biometric pin entry</span>
            </div>

            {/* Auto-Refresh Interval */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#131b2e]">Auto-Refresh Interval</label>
              <div className="relative bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/40">
                <select
                  className="w-full bg-transparent text-xs font-semibold text-[#131b2e] outline-none appearance-none pr-8 cursor-pointer"
                  value={refreshInterval}
                  onChange={e => setRefreshInterval(e.target.value)}
                >
                  <option>Real-time sync (30s background poll)</option>
                  <option>Standard sync (60s poll)</option>
                  <option>Power-saving mode (5 min interval)</option>
                  <option>Manual pull-to-refresh only</option>
                </select>
                <Icon name="expand_more" className="text-[#3f4850] text-[20px] absolute right-3 top-3 pointer-events-none" />
              </div>
              <div className="flex items-center gap-1.5 text-[#006a61] text-[11px] font-bold">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                <span>Active telemetry connected to DHA Hub</span>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Widget Density & Layout Style */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="dashboard_customize" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Widget Density & Style
              </h2>
              <p className="text-xs text-[#3f4850]">Visual pacing and chart resolution</p>
            </div>
          </div>

          {/* Density Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <label
              onClick={() => setDensity('expanded')}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                density === 'expanded'
                  ? 'bg-[#cce5ff] border-[#006194] shadow-sm text-[#001d31]'
                  : 'bg-[#f2f3ff] border-[#dae2fd]/30 hover:bg-[#eaedff] text-[#131b2e]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon name="view_agenda" className="text-[#006194] text-[22px]" />
                <Icon
                  name={density === 'expanded' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  className={`text-[18px] ${density === 'expanded' ? 'text-[#006194]' : 'text-[#707881]'}`}
                />
              </div>
              <span className="text-xs font-bold block">Comfortable Density</span>
              <span className="text-[11px] text-[#3f4850] mt-0.5">Expanded cards with micro-charts & badges</span>
            </label>

            <label
              onClick={() => setDensity('compact')}
              className={`p-3.5 rounded-xl cursor-pointer transition-all border flex flex-col justify-between ${
                density === 'compact'
                  ? 'bg-[#cce5ff] border-[#006194] shadow-sm text-[#001d31]'
                  : 'bg-[#f2f3ff] border-[#dae2fd]/30 hover:bg-[#eaedff] text-[#131b2e]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon name="grid_view" className="text-[#006194] text-[22px]" />
                <Icon
                  name={density === 'compact' ? 'radio_button_checked' : 'radio_button_unchecked'}
                  className={`text-[18px] ${density === 'compact' ? 'text-[#006194]' : 'text-[#707881]'}`}
                />
              </div>
              <span className="text-xs font-bold block">Compact Grid</span>
              <span className="text-[11px] text-[#3f4850] mt-0.5">High data density, streamlined lists</span>
            </label>
          </div>

          {/* Visual Trend Curves Toggle */}
          <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between border border-[#dae2fd]/30">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-[#131b2e]">Visual Trend Curves</span>
                <span className="bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded text-[10px] font-bold">
                  Sparkline
                </span>
              </div>
              <p className="text-[11px] text-[#3f4850] mt-0.5">
                Show 7-day velocity charts on dashboard summary cards
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={trendCurves}
              onClick={() => setTrendCurves(!trendCurves)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                trendCurves ? 'bg-[#006194]' : 'bg-[#dae2fd]'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                  trendCurves ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </section>

        {/* Section 3: Role-Based Metric Visibility */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="admin_panel_settings" className="text-[20px]" />
              </div>
              <div>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Role-Based Metric Visibility
                </h2>
                <p className="text-xs text-[#3f4850]">Tier-authorized executive panels</p>
              </div>
            </div>
            <span className="bg-[#cce5ff] text-[#006194] px-2.5 py-0.5 rounded-full text-xs font-bold">
              Tier 2 Manager
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {/* Metric 1 */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between gap-3 border border-[#dae2fd]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
                  <Icon name="payments" className="text-[18px]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#131b2e]">Financial Collections Card</span>
                    <span className="bg-[#86f2e4] text-[#00201d] px-1.5 py-0.2 rounded text-[10px] font-bold">
                      Authorized
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-0.5">
                    Daily branch target, POS reconciliation & copay balances
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={metricFinancial}
                onClick={() => setMetricFinancial(!metricFinancial)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  metricFinancial ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    metricFinancial ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Metric 2 */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between gap-3 border border-[#dae2fd]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
                  <Icon name="meeting_room" className="text-[18px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Operatory Occupancy Live Feed</span>
                  <p className="text-[11px] text-[#3f4850] mt-0.5">
                    Real-time room occupancy (Chairs 1–6) & sterilisation status
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={metricOccupancy}
                onClick={() => setMetricOccupancy(!metricOccupancy)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  metricOccupancy ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    metricOccupancy ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Metric 3 */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between gap-3 border border-[#dae2fd]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
                  <Icon name="dentistry" className="text-[18px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Procedure Stage Counters</span>
                  <p className="text-[11px] text-[#3f4850] mt-0.5">
                    Status summary only — no private diagnostic charting details
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={metricStages}
                onClick={() => setMetricStages(!metricStages)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  metricStages ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    metricStages ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Metric 4 */}
            <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex items-center justify-between gap-3 border border-[#dae2fd]/30">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
                  <Icon name="campaign" className="text-[18px]" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#131b2e] block">Unread Urgent Announcements</span>
                  <p className="text-[11px] text-[#3f4850] mt-0.5">
                    Pinned DHA health directives and internal shift notifications
                  </p>
                </div>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={metricAnnouncements}
                onClick={() => setMetricAnnouncements(!metricAnnouncements)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
                  metricAnnouncements ? 'bg-[#006194]' : 'bg-[#dae2fd]'
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    metricAnnouncements ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </section>

        {/* Section 4: Quick Actions Floating Dock */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="touch_app" className="text-[20px]" />
              </div>
              <div>
                <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Fast Action Dock
                </h2>
                <p className="text-xs text-[#3f4850]">Choose up to 4 primary quick action triggers</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#86f2e4] text-[#00201d] text-xs font-bold">
              {selectedDockIds.length}/4 Selected
            </span>
          </div>

          {/* Action Selection List (2 cols on tablet/desktop) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {dockOptions.map(opt => {
              const isChecked = selectedDockIds.includes(opt.id);
              return (
                <label
                  key={opt.id}
                  onClick={() => handleDockToggle(opt.id)}
                  className={`flex items-center justify-between p-3.5 rounded-xl cursor-pointer transition-all border ${
                    isChecked
                      ? 'bg-[#cce5ff] border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] border-[#dae2fd]/30 hover:bg-[#eaedff]'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-sm">
                      <Icon name={opt.icon} className="text-[20px]" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-[#131b2e] block truncate">{opt.title}</span>
                      <span className="text-[11px] text-[#707881] block truncate">{opt.subtitle}</span>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    readOnly
                    className="w-4 h-4 text-[#006194] accent-[#006194] cursor-pointer shrink-0 ml-2"
                  />
                </label>
              );
            })}
          </div>

          {/* Dock Live Preview Strip */}
          <div className="p-4 rounded-xl bg-[#eaedff] border border-[#dae2fd]/40 flex items-center justify-around gap-2 text-center">
            {selectedDockIds.map(id => {
              const opt = dockOptions.find(o => o.id === id);
              if (!opt) return null;
              return (
                <div key={id} className="flex flex-col items-center">
                  <span className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shadow-sm">
                    <Icon name={opt.icon} className="text-[16px]" />
                  </span>
                  <span className="text-[11px] font-bold text-[#131b2e] mt-1 truncate max-w-[72px]">
                    {opt.shortLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Section 5: Privacy & Regulatory Compliance */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
              <Icon name="policy" className="text-[20px]" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                Privacy & Compliance
              </h2>
              <p className="text-xs text-[#3f4850]">DHA Dental Data Protection Standard 8.2</p>
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-4 space-y-2 border border-[#dae2fd]/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="verified_user" className="text-[#006a61] text-[18px]" />
                <span className="text-xs font-bold text-[#131b2e]">Clinical Data Masking</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#00201d] text-[10px] font-extrabold uppercase">
                Active & Locked
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Front-desk operations and clinic manager roles operate in masked mode. Diagnostic odontograms, radiographs, and clinician notes remain restricted to authenticated dental surgeons.
            </p>
            <div className="pt-1 flex items-center gap-1.5 text-[#707881] text-[11px]">
              <Icon name="lock" className="text-[14px]" />
              <span>Policy enforcement managed by Clinic Medical Director</span>
            </div>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
          >
            <Icon name={isSaving ? 'refresh' : 'save'} className={`text-[18px] ${isSaving ? 'animate-spin' : ''}`} />
            <span>Save Dashboard Configuration</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="h-12 px-6 bg-[#ffffff] hover:bg-[#f2f3ff] text-[#3f4850] border border-[#dae2fd] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Icon name="restart_alt" className="text-[18px]" />
            <span>Reset to Role Defaults</span>
          </button>
        </div>
      </main>
    </div>
  );
};
