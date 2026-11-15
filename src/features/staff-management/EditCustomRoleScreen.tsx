import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const EditCustomRoleScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const roleCode = id || 'CR-PC-004';

  const [roleName, setRoleName] = useState('Patient Care & Appointment Coordinator');
  const [roleCategory, setRoleCategory] = useState('Front-Desk & Patient Coordination');
  const [roleScope, setRoleScope] = useState('Wuse 2 Main Branch & Maitama Outpost');
  const [roleDescription, setRoleDescription] = useState(
    'Manages walk-in triage, appointment rescheduling, and post-operative reminder dispatches.'
  );

  // Permission toggles
  const [hasNewPermission, setHasNewPermission] = useState(true);
  const [permAppointments, setPermAppointments] = useState(true);
  const [permSummon, setPermSummon] = useState(true);
  const [permReminders, setPermReminders] = useState(true);
  const [permBillingToggledOff, setPermBillingToggledOff] = useState(true);

  // Role status
  const [isRoleActive, setIsRoleActive] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleSave = () => {
    triggerToast('Role updated successfully and applied to 3 staff members.');
    setTimeout(() => {
      navigate('/staff-management/roles');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/roles')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Edit Custom Role
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('More options opened')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white ml-1">
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Context Banner Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006a61]">
                  Clinic Custom Role
                </span>
                <span className="font-mono text-xs text-[#707881]">#{roleCode}</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-bold text-[#131b2e] mt-1 truncate">
                {roleName}
              </h2>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194]">
              <Icon name="badge" className="text-xl" />
            </div>
          </div>

          <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center justify-between text-xs text-[#3f4850] flex-wrap gap-2 border border-[#dae2fd]/40">
            <div className="flex items-center gap-2">
              <Icon name="group" className="text-sm text-[#006194]" />
              <span className="font-semibold text-[#131b2e]">3 Active Team Members</span>
            </div>
            <div className="flex items-center gap-1.5 text-[#707881]">
              <Icon name="history" className="text-xs" />
              <span>14 Sep 2026 · Samuel Eze</span>
            </div>
          </div>
        </div>

        {/* Impact & Warning Callout */}
        <div className="bg-[#ffdad6]/40 rounded-2xl p-5 border border-[#ffdad6] flex gap-4 items-start">
          <div className="w-9 h-9 rounded-full bg-[#ffdad6] flex items-center justify-center shrink-0 text-[#ba1a1a] mt-0.5">
            <Icon name="warning" className="text-lg" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#ba1a1a]">
              Permission Modification Impact
            </h3>
            <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
              Changes made to this role will automatically apply to all 3 assigned staff members immediately upon saving.
            </p>
          </div>
        </div>

        {/* Form Section 1: Role Details */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#131b2e]">
              1. General Information
            </span>
            <span className="text-[11px] text-[#707881]">Required fields</span>
          </div>

          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#131b2e]">Role Name</label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl px-4 border border-[#dae2fd]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]">Functional Category</label>
                <div className="relative">
                  <select
                    value={roleCategory}
                    onChange={(e) => setRoleCategory(e.target.value)}
                    className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl px-4 appearance-none border border-[#dae2fd]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option value="Front-Desk & Patient Coordination">Front-Desk & Patient Coordination</option>
                    <option value="Clinical Operatory Support">Clinical Operatory Support</option>
                    <option value="Dental Hygienist & Prevention">Dental Hygienist & Prevention</option>
                    <option value="Billing & Revenue Operations">Billing & Revenue Operations</option>
                    <option value="Inventory & Sterilization">Inventory & Sterilization</option>
                  </select>
                  <Icon name="expand_more" className="text-lg text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]">Authorized Clinical Scope</label>
                <div className="relative">
                  <select
                    value={roleScope}
                    onChange={(e) => setRoleScope(e.target.value)}
                    className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl px-4 appearance-none border border-[#dae2fd]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option value="Wuse 2 Main Branch & Maitama Outpost">Wuse 2 Main Branch & Maitama Outpost</option>
                    <option value="Wuse 2 Main Branch Only">Wuse 2 Main Branch Only</option>
                    <option value="Maitama Outpost Only">Maitama Outpost Only</option>
                    <option value="All Network Clinics (Garki, Wuse 2, Maitama)">All Network Clinics</option>
                  </select>
                  <Icon name="expand_more" className="text-lg text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#131b2e]">Role Description</label>
              <textarea
                rows={3}
                value={roleDescription}
                onChange={(e) => setRoleDescription(e.target.value)}
                className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl p-3.5 border border-[#dae2fd]/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#006194] transition-colors leading-relaxed"
              />
            </div>
          </div>
        </div>

        {/* Form Section 2: Modified Permissions Toggle Stream */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#131b2e]">
                2. Assigned Permissions
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850]">
                5 Items
              </span>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Policy selection dialog opened.')}
              className="text-xs font-semibold text-[#006194] flex items-center gap-1 hover:underline"
            >
              <Icon name="add" className="text-sm" />
              <span>Add Policy</span>
            </button>
          </div>

          <div className="space-y-3">
            {/* Item 1: Newly Added */}
            {hasNewPermission && (
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#89f5e7] flex items-center justify-center shrink-0 text-[#00201d] mt-0.5">
                    <Icon name="add_circle" className="text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                        Access Waiting Room TV Display Masking
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#86f2e4]/30 text-[#006a61]">
                        Newly Added
                      </span>
                    </div>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Allows front-desk operator to hide patient names on waiting room triage monitors
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setHasNewPermission(false)}
                  className="p-1 rounded-lg text-[#707881] hover:text-[#ba1a1a] hover:bg-[#ffdad6] transition-colors shrink-0"
                  title="Remove Policy"
                >
                  <Icon name="close" className="text-base" />
                </button>
              </div>
            )}

            {/* Item 2 */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194] mt-0.5">
                  <Icon name="check_circle" className="text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                      Create & Edit Patient Appointments
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#707881]">
                      Active Policy
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">
                    Schedule, re-route, and mark cancellations on clinic calendars
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={permAppointments}
                  onChange={(e) => setPermAppointments(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#dae2fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
              </label>
            </div>

            {/* Item 3 */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194] mt-0.5">
                  <Icon name="check_circle" className="text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                      Summon Patients to Operatories (Section 16.14)
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#707881]">
                      Active Policy
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">
                    Sends operatory chair-ready chime to waiting patient mobile & lobby
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={permSummon}
                  onChange={(e) => setPermSummon(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#dae2fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
              </label>
            </div>

            {/* Item 4 */}
            <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center shrink-0 text-[#006194] mt-0.5">
                  <Icon name="check_circle" className="text-base" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                      Send Automated Dual Reminder SMS
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#707881]">
                      Active Policy
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">
                    Trigger custom hygiene reminders and 24-hour pre-visit verification texts
                  </p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                <input
                  type="checkbox"
                  checked={permReminders}
                  onChange={(e) => setPermReminders(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-[#dae2fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
              </label>
            </div>

            {/* Item 5: Toggled Off / Strikethrough */}
            {permBillingToggledOff ? (
              <div className="bg-[#ffdad6]/20 rounded-2xl p-4 border border-[#ffdad6] flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-[#ffdad6] flex items-center justify-center shrink-0 text-[#ba1a1a] mt-0.5">
                    <Icon name="remove_circle" className="text-base" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#707881] line-through">
                        View Gross Daily Billing Counters
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#ffdad6] text-[#ba1a1a]">
                        Toggled Off
                      </span>
                    </div>
                    <p className="text-xs text-[#707881] mt-0.5">
                      Revokes real-time register receipts and financial settlement analytics
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setPermBillingToggledOff(false)}
                  className="text-xs font-semibold text-[#006194] hover:underline shrink-0 mt-1"
                >
                  Undo
                </button>
              </div>
            ) : null}
          </div>
        </div>

        {/* Form Section 3: Affected Personnel Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#131b2e]">
              3. Affected Personnel (3)
            </span>
            <span className="text-xs font-semibold text-[#006194]">View Shift Sync</span>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] divide-y divide-[#eaedff]">
            {/* Staff 1 */}
            <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-xs">
                  GI
                </div>
                <div className="min-w-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e] block truncate">
                    Grace Ibrahim
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Lead Receptionist · Wuse 2</span>
                </div>
              </div>
              <Icon name="verified" className="text-base text-[#006a61]" />
            </div>

            {/* Staff 2 */}
            <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-xs">
                  BO
                </div>
                <div className="min-w-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e] block truncate">
                    Blessing Okon
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Front-Desk Triage · Maitama</span>
                </div>
              </div>
              <Icon name="verified" className="text-base text-[#006a61]" />
            </div>

            {/* Staff 3 */}
            <div className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-xs">
                  CA
                </div>
                <div className="min-w-0">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e] block truncate">
                    Chidinma Adeleke
                  </span>
                  <span className="text-[11px] text-[#707881] truncate">Patient Recare Specialist · Wuse 2</span>
                </div>
              </div>
              <Icon name="verified" className="text-base text-[#006a61]" />
            </div>
          </div>
        </div>

        {/* Form Section 4: Lifecycle & Safeguards */}
        <div className="space-y-3">
          <span className="font-['Plus_Jakarta_Sans'] font-bold text-xs uppercase tracking-wider text-[#131b2e] px-1">
            4. Lifecycle & Safeguards
          </span>

          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                  Role Status
                </span>
                <p className="text-xs text-[#707881] mt-0.5">
                  Active roles can be assigned to new clinic employees
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={isRoleActive}
                  onChange={(e) => setIsRoleActive(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#dae2fd] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006194]"></div>
              </label>
            </div>

            {/* Danger Zone */}
            <div className="bg-[#f2f3ff] rounded-xl p-4 flex items-center justify-between gap-4 border border-[#dae2fd]/50">
              <div className="space-y-0.5">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#707881]">
                  Deactivate Custom Role
                </span>
                <p className="text-[11px] text-[#707881] leading-relaxed">
                  Action locked: 3 active staff are presently assigned. Reassign personnel to alternative templates before deactivating.
                </p>
              </div>
              <button
                type="button"
                disabled
                className="px-3.5 py-2 rounded-xl bg-[#dae2fd] text-[#707881] text-xs font-semibold cursor-not-allowed shrink-0"
              >
                Deactivate
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleSave}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <Icon name="save" className="text-lg" />
            <span>Save Role Changes & Apply to 3 Staff</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/staff-management/roles')}
            className="w-full h-11 bg-white hover:bg-[#f2f3ff] text-[#707881] hover:text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl transition-colors border border-[#eaedff]"
          >
            Cancel Modifications
          </button>
        </div>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs flex items-center gap-3 border border-white/10 animate-fade-in">
          <Icon name="check_circle" className="text-lg text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
