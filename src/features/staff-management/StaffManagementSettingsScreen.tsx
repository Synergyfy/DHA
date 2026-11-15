import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const StaffManagementSettingsScreen: React.FC = () => {
  const navigate = useNavigate();

  // Settings State
  const [invitationExpiry, setInvitationExpiry] = useState('7');
  const [autoReminderCadence, setAutoReminderCadence] = useState(true);
  const [defaultGrouping, setDefaultGrouping] = useState('cadre');
  const [licensureBadges, setLicensureBadges] = useState(true);
  const [dualSignOff, setDualSignOff] = useState(true);
  const [sensitiveElevationIntercept, setSensitiveElevationIntercept] = useState(true);
  const [autoPruneCustomRoles, setAutoPruneCustomRoles] = useState(false);
  const [handoverPeriod, setHandoverPeriod] = useState('14');
  const [rotationalLimit, setRotationalLimit] = useState('2');
  const [autoSyncCalendars, setAutoSyncCalendars] = useState(true);
  const [alertManagerNewRequest, setAlertManagerNewRequest] = useState(true);
  const [licensureExpiryWarning, setLicensureExpiryWarning] = useState(true);

  // Edit Template Modal State
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [welcomeMemo, setWelcomeMemo] = useState(
    'Welcome to Harmony Dental Group! Includes Wuse 2 branch orientation checklist, digital locker code assignment, and scrub uniform requisition policies.'
  );

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSave = () => {
    showToast('Management settings synchronized to network.');
  };

  const handleResetDefaults = () => {
    const confirmed = window.confirm(
      'Reset all non-statutory settings to Harmony Dental Group default operational benchmarks?'
    );
    if (confirmed) {
      setInvitationExpiry('7');
      setAutoReminderCadence(true);
      setDefaultGrouping('cadre');
      setLicensureBadges(true);
      setDualSignOff(true);
      setSensitiveElevationIntercept(true);
      setAutoPruneCustomRoles(false);
      setHandoverPeriod('14');
      setRotationalLimit('2');
      setAutoSyncCalendars(true);
      setAlertManagerNewRequest(true);
      setLicensureExpiryWarning(true);
      showToast('Restored practice standard defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/80 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/staff-management/dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
              title="Back to Dashboard"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider truncate">
                Abuja Clinic Network
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-[#131b2e] font-['Plus_Jakarta_Sans'] truncate">
                  Harmony Dental Group - Settings
                </span>
                <Icon name="expand_more" className="text-[18px] text-[#3f4850]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleSave}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors"
            >
              <Icon name="save" className="text-[16px]" />
              <span>Save</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white text-xs font-semibold">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Breadcrumb & Header Zone */}
        <section className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-[#006a61] text-xs font-semibold uppercase tracking-wider">
            <Icon name="tune" className="text-[16px]" />
            <span>Governance &amp; Operations</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
            Staff Management Settings
          </h1>
          <p className="text-sm text-[#3f4850]">
            Administrative policies, invitation expiration rules, role governance, and branch transfer guardrails.
          </p>
        </section>

        {/* Statutory Boundary Notice Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 sm:p-5 border border-[#eaedff] shadow-sm relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#006a61]"></div>
          <div className="flex items-start gap-3 pl-1">
            <div className="w-9 h-9 rounded-full bg-[#86f2e4]/40 flex items-center justify-center shrink-0 text-[#006a61]">
              <Icon name="verified_user" className="text-[20px]" filled={true} />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-[#131b2e]">DHA Sovereign Policy Safeguard</span>
                <span className="bg-[#86f2e4]/50 text-[#005049] text-[11px] px-2 py-0.5 rounded-full font-semibold">
                  Strict Rule
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#3f4850] leading-relaxed">
                Internal clinic settings cannot alter statutory MDCN licensing criteria, bypass mandatory professional
                verification, or remove NDPR clinical chart masking for non-clinical personnel.
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: Invitation & Onboarding Protocol */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="outgoing_mail" className="text-[18px]" />
              </div>
              <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Invitation &amp; Onboarding Protocol
              </h2>
            </div>
            <span className="text-xs bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded-full font-semibold">
              Phase 1 Entry
            </span>
          </div>

          {/* Field: Default Expiration */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#131b2e]" htmlFor="invitationExpiry">
              Default Invitation Expiration
            </label>
            <div className="relative">
              <select
                id="invitationExpiry"
                value={invitationExpiry}
                onChange={(e) => setInvitationExpiry(e.target.value)}
                className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-xs font-medium rounded-xl px-4 pr-10 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
              >
                <option value="3">3 Calendar Days (Urgent Locum)</option>
                <option value="5">5 Calendar Days (Short Term)</option>
                <option value="7">7 Calendar Days (Standard Protocol)</option>
                <option value="14">14 Calendar Days (Extended Cadre)</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#707881] text-[20px]"
              />
            </div>
            <span className="text-[11px] text-[#707881]">Links auto-invalidate at midnight W.A.T. following window.</span>
          </div>

          {/* Toggle: Automatic Reminder Cadence */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Automatic Reminder Cadence</span>
              <span className="text-[11px] text-[#707881]">
                Dispatches SMS &amp; Push alert at 48h and 24h prior to token expiry.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoReminderCadence}
              onClick={() => setAutoReminderCadence(!autoReminderCadence)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                autoReminderCadence ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  autoReminderCadence ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Field: Welcome Memo Template */}
          <div className="flex flex-col gap-2 pt-1 border-t border-[#eaedff]/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e]">Default Welcome Memo</label>
              <button
                type="button"
                onClick={() => setShowTemplateModal(true)}
                className="text-[#006194] text-xs font-semibold flex items-center gap-1 hover:underline"
              >
                <Icon name="edit" className="text-[14px]" />
                <span>Edit Template</span>
              </button>
            </div>
            <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-start gap-2.5">
              <Icon name="drafts" className="text-[20px] text-[#006a61] shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#131b2e]">"Welcome to Harmony Dental Group..."</span>
                <span className="text-[11px] text-[#3f4850] line-clamp-2">{welcomeMemo}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: Staff Directory & Display Preferences */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="badge" className="text-[18px]" />
              </div>
              <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Directory &amp; Display Preferences
              </h2>
            </div>
            <span className="text-xs bg-[#86f2e4]/30 text-[#005049] px-2.5 py-0.5 rounded-full font-semibold">
              Visible UI
            </span>
          </div>

          {/* Dropdown: Default Grouping */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#131b2e]" htmlFor="defaultGrouping">
              Default Directory Grouping
            </label>
            <div className="relative">
              <select
                id="defaultGrouping"
                value={defaultGrouping}
                onChange={(e) => setDefaultGrouping(e.target.value)}
                className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-xs font-medium rounded-xl px-4 pr-10 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
              >
                <option value="cadre">Group by Clinical / Non-Clinical Cadre</option>
                <option value="branch">Group by Primary Branch Allocation</option>
                <option value="duty">Group by On-Call Status &amp; Shift Today</option>
                <option value="alpha">Alphabetical (A - Z)</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#707881] text-[20px]"
              />
            </div>
          </div>

          {/* Toggle: Licensure Expiry Badges */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#131b2e]">Licensure Expiry Badges</span>
                <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              </div>
              <span className="text-[11px] text-[#707881]">
                Flags clinicians on directory if MDCN cert expires within 60 days.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={licensureBadges}
              onClick={() => setLicensureBadges(!licensureBadges)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                licensureBadges ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  licensureBadges ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Mask Sensitive HR Compensation Data (Locked) */}
          <div className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <Icon name="lock" className="text-[20px] text-[#707881] shrink-0 mt-0.5" filled={true} />
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#131b2e]">Mask HR Compensation Data</span>
                  <span className="text-[10px] bg-[#eaedff] text-[#3f4850] px-1.5 py-0.5 rounded font-semibold">
                    Locked
                  </span>
                </div>
                <span className="text-[11px] text-[#707881]">
                  Base salaries &amp; procedural allowances shielded. Superuser credential mandatory to unlock.
                </span>
              </div>
            </div>
            <div
              className="w-12 h-7 bg-[#006194]/60 rounded-full relative p-0.5 shrink-0 cursor-not-allowed opacity-80"
              title="Locked for security"
            >
              <span className="block w-6 h-6 bg-white rounded-full shadow-sm transform translate-x-5" />
            </div>
          </div>
        </div>

        {/* SECTION 3: Role & Permission Governance */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="admin_panel_settings" className="text-[18px]" />
              </div>
              <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Role &amp; Permission Governance
              </h2>
            </div>
            <span className="text-xs bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded-full font-semibold">
              Security
            </span>
          </div>

          {/* Toggle: Dual Sign-off for Custom Roles */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Custom Role Creation Dual Sign-off</span>
              <span className="text-[11px] text-[#707881]">
                Requires simultaneous authorization by Clinical Director &amp; Clinic Operations Head.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={dualSignOff}
              onClick={() => setDualSignOff(!dualSignOff)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                dualSignOff ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  dualSignOff ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Sensitive Permission Elevation Warning */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Sensitive Elevation Intercept</span>
              <span className="text-[11px] text-[#707881]">
                Forces secondary biometric / password modal before assigning fee override privileges or stock write-off
                access.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={sensitiveElevationIntercept}
              onClick={() => setSensitiveElevationIntercept(!sensitiveElevationIntercept)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                sensitiveElevationIntercept ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  sensitiveElevationIntercept ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Toggle: Auto-Deactivate Unused Custom Roles */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Auto-Prune Inactive Custom Roles</span>
              <span className="text-[11px] text-[#707881]">
                Decommission unassigned role titles after 90 days. Keep disabled to retain standardized templates.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoPruneCustomRoles}
              onClick={() => setAutoPruneCustomRoles(!autoPruneCustomRoles)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                autoPruneCustomRoles ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  autoPruneCustomRoles ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 4: Branch Assignment & Transfer Rules */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="alt_route" className="text-[18px]" />
              </div>
              <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Branch Assignment &amp; Transfer
              </h2>
            </div>
            <span className="text-xs bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded-full font-semibold">
              Network Policy
            </span>
          </div>

          {/* Mandatory Clinical Handover Period */}
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e]" htmlFor="handoverPeriod">
                Mandatory Clinical Handover
              </label>
              <span className="text-[11px] text-[#006a61] font-semibold">Standard Safe Practice</span>
            </div>
            <div className="relative">
              <select
                id="handoverPeriod"
                value={handoverPeriod}
                onChange={(e) => setHandoverPeriod(e.target.value)}
                className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-xs font-medium rounded-xl px-4 pr-10 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
              >
                <option value="7">7 Calendar Days (Accelerated Handover)</option>
                <option value="14">14 Calendar Days (Standard Odontogram Reconciliation)</option>
                <option value="21">21 Calendar Days (Surgical / Orthodontic Cohort)</option>
                <option value="30">30 Calendar Days (Departmental Head Shift)</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#707881] text-[20px]"
              />
            </div>
            <span className="text-[11px] text-[#707881]">
              Principal operatory locked from re-allocation until patient logs transfer is digitally co-signed.
            </span>
          </div>

          {/* Rotational Coverage Limit */}
          <div className="flex flex-col gap-1.5 pt-1 border-t border-[#eaedff]/60">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-[#131b2e]" htmlFor="rotationalLimit">
                Rotational Coverage Limit
              </label>
              <span className="text-[10px] text-[#006194] bg-[#eaedff] px-2 py-0.5 rounded font-mono font-semibold">
                FATIGUE GUARD
              </span>
            </div>
            <div className="relative">
              <select
                id="rotationalLimit"
                value={rotationalLimit}
                onChange={(e) => setRotationalLimit(e.target.value)}
                className="w-full h-11 bg-[#f2f3ff] text-[#131b2e] text-xs font-medium rounded-xl px-4 pr-10 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
              >
                <option value="1">Strict 1 Satellite Clinic per Clinician</option>
                <option value="2">Maximum 2 Satellite Facilities per Clinician</option>
                <option value="3">Maximum 3 Satellite Facilities (Locum Only)</option>
              </select>
              <Icon
                name="expand_more"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#707881] text-[20px]"
              />
            </div>
            <span className="text-[11px] text-[#707881]">
              Prevents scheduling conflicts across Wuse 2, Garki, and Maitama outposts.
            </span>
          </div>

          {/* Auto-Sync Shift Calendars */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Auto-Sync Shift Calendars on Transfer</span>
              <span className="text-[11px] text-[#707881]">
                Instantly ports Google Calendar &amp; Outlook rotas to target branch roster.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoSyncCalendars}
              onClick={() => setAutoSyncCalendars(!autoSyncCalendars)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                autoSyncCalendars ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  autoSyncCalendars ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* SECTION 5: Administrative Dispatch Alerts */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#eaedff] shadow-sm flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="notifications_active" className="text-[18px]" />
              </div>
              <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Administrative Dispatch Alerts
              </h2>
            </div>
            <span className="text-xs bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded-full font-semibold">
              Immediate
            </span>
          </div>

          {/* Notification 1 */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-[#131b2e]">Alert Manager on New Staff Request</span>
              <span className="text-[11px] text-[#707881]">
                Sends instant SMS &amp; in-app badge to Clinic Operations Manager.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={alertManagerNewRequest}
              onClick={() => setAlertManagerNewRequest(!alertManagerNewRequest)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                alertManagerNewRequest ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  alertManagerNewRequest ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notification 2 */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-[#eaedff]/60">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-[#131b2e]">Medical Director Licensure Expiry Warning</span>
                <Icon name="verified" className="text-[16px] text-[#006a61]" filled={true} />
              </div>
              <span className="text-[11px] text-[#707881]">
                Escalates unrenewed certifications 30 days prior to legal suspension.
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={licensureExpiryWarning}
              onClick={() => setLicensureExpiryWarning(!licensureExpiryWarning)}
              className={`w-12 h-7 rounded-full relative p-0.5 transition-colors shrink-0 focus:outline-none ${
                licensureExpiryWarning ? 'bg-[#006194]' : 'bg-[#eaedff]'
              }`}
            >
              <span
                className={`block w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-200 ${
                  licensureExpiryWarning ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Audit Trail Affirmation Card */}
        <div className="p-4 bg-[#eaedff]/60 rounded-2xl border border-[#dae2fd] flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/40 flex items-center justify-center shrink-0 text-[#006a61]">
            <Icon name="health_and_safety" className="text-[22px]" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-[#131b2e]">Audit Trail Enabled</span>
            <span className="text-[11px] text-[#3f4850]">
              Policy modifications are logged with admin IP and recorded into the DHA permanent ledger.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2 pb-10">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.99]"
          >
            <Icon name="save" className="text-[20px]" />
            <span>Save Management Settings</span>
          </button>
          <button
            type="button"
            onClick={handleResetDefaults}
            className="h-12 px-6 bg-white border border-[#eaedff] text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="restart_alt" className="text-[20px]" />
            <span>Restore Defaults</span>
          </button>
        </div>
      </main>

      {/* Edit Welcome Memo Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#eaedff] p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
                Edit Default Welcome Memo
              </h3>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>
            <p className="text-xs text-[#707881]">
              This welcome message is automatically attached to new staff onboarding invites.
            </p>
            <textarea
              rows={4}
              value={welcomeMemo}
              onChange={(e) => setWelcomeMemo(e.target.value)}
              className="w-full p-3 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 resize-none"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#3f4850] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  showToast('Welcome memo template updated.');
                }}
                className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9]"
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Micro-Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-[#eef0ff] px-4 py-3 rounded-xl shadow-lg flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Icon name="check_circle" className="text-[#6bd8cb] text-[20px]" filled={true} />
            <span className="text-xs sm:text-sm">{toastMessage}</span>
          </div>
          <span className="text-[11px] text-[#93ccff] font-mono font-bold">WUSE-2 LEDGER</span>
        </div>
      )}
    </div>
  );
};
