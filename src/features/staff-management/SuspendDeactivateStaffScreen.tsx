import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const SuspendDeactivateStaffScreen: React.FC = () => {
  const navigate = useNavigate();

  const [actionType, setActionType] = useState<'temporary' | 'offboard' | 'branch'>('temporary');
  const [reason, setReason] = useState('Discrepancy in Daily Cashless Reconciliation — Ledger Audit');
  const [auditNotes, setAuditNotes] = useState(
    'Front-Desk terminal #03 indicated a mismatch of ₦48,500 between POS batch terminal settlement slips and Harmony Dental ledger submissions for billing cycle 19-21 Oct. Temporary access suspension initiated pending joint verification with Accounts Lead Amara Vance.'
  );
  const [authCheck, setAuthCheck] = useState(false);
  const [adminPin, setAdminPin] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const isReady = authCheck && adminPin.trim().length >= 4;

  const simulateBiometric = () => {
    setAdminPin('948210');
    triggerToast('Biometric verified: Administrator PIN auto-filled');
  };

  const handleConfirmAction = () => {
    if (!isReady || isSubmitting) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      triggerToast('Administrative suspension active. Credentials revoked in ledger #SEC-OKO.');
      setTimeout(() => {
        navigate('/staff-management/status');
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter'] antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-[9999] bg-[#131b2e] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in text-sm font-medium border border-white/10">
          <Icon name="info" className="text-[#89f5e7] text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-4xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/staff-management/status')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Suspend Or Deactivate Staff
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Security governance options')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-5">
          {/* Staff Identity Dossier Banner */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shadow-xs">
                  KO
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#006a61] text-white rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                  <Icon name="badge" className="text-xs" filled />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
                    Kalu Okonkwo
                  </h2>
                  <span className="bg-[#eaedff] text-[#3f4850] font-mono text-xs px-2.5 py-0.5 rounded-full shrink-0">
                    #STF-OKO-14
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#707881] mt-0.5">
                  Front-Desk Billing Clerk • Wuse 2 Main Branch
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="inline-flex items-center gap-1.5 bg-[#eaedff] text-[#006194] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#006194]"></span>
                    Tier 2 Non-Clinical
                  </span>
                  <span className="text-xs text-[#707881]">
                    1y 4m at Harmony Dental
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Type Selector */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <label className="block font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e] mb-1">
              Action Protocol
            </label>
            <p className="text-xs text-[#707881] mb-4">
              Specify the administrative status tier to apply across Harmony Dental Group.
            </p>

            <div className="space-y-3">
              {/* Option 1: Temporary Suspension */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  actionType === 'temporary'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="deactivation_type"
                  value="temporary"
                  checked={actionType === 'temporary'}
                  onChange={() => setActionType('temporary')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#131b2e]">Temporary Suspension</span>
                    <span className="bg-[#86f2e4] text-[#006f66] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                      Audit Mode
                    </span>
                  </div>
                  <p className="text-xs text-[#707881] mt-1 leading-relaxed">
                    Pauses clinic terminal POS rights, portal logins, and appointment dispatch. Leaves historical records and past cashier invoices intact.
                  </p>
                </div>
              </label>

              {/* Option 2: End Clinic Affiliation */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  actionType === 'offboard'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="deactivation_type"
                  value="offboard"
                  checked={actionType === 'offboard'}
                  onChange={() => setActionType('offboard')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm text-[#131b2e]">End Clinic Affiliation (Offboarding)</span>
                  <p className="text-xs text-[#707881] mt-1 leading-relaxed">
                    Concludes staff member's active contract with Harmony Dental Group. Permanently revokes all practice environment credentials.
                  </p>
                </div>
              </label>

              {/* Option 3: Remove from Specific Branch Only */}
              <label
                className={`relative flex items-start gap-3.5 p-4 rounded-xl cursor-pointer transition-all border ${
                  actionType === 'branch'
                    ? 'border-[#006194] bg-[#f2f3ff]/70 shadow-xs'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="deactivation_type"
                  value="branch"
                  checked={actionType === 'branch'}
                  onChange={() => setActionType('branch')}
                  className="mt-1 accent-[#006194]"
                />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm text-[#131b2e]">Remove from Specific Branch Only</span>
                  <p className="text-xs text-[#707881] mt-1 leading-relaxed">
                    Revokes access to Wuse 2 Main Branch while retaining active staff standing at other Harmony Dental facilities.
                  </p>
                </div>
              </label>
            </div>
          </section>

          {/* Form Fields Section */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            {/* Reason Selector */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#131b2e] flex items-center justify-between">
                <span>Reason for Administrative Action</span>
                <span className="text-[10px] font-bold text-[#ba1a1a] uppercase">Required</span>
              </label>
              <div className="relative">
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full h-12 px-3 pr-10 rounded-xl bg-[#f2f3ff] text-xs md:text-sm text-[#131b2e] font-medium appearance-none focus:outline-none focus:bg-white border border-[#eaedff]"
                >
                  <option>Discrepancy in Daily Cashless Reconciliation — Ledger Audit</option>
                  <option>Code of Conduct Review / Policy Infraction</option>
                  <option>Voluntary Resignation Pending Formal Notice</option>
                  <option>Approved Medical / Personal Leave of Absence</option>
                  <option>Inter-Clinic Facility Transfer in Progress</option>
                </select>
                <Icon name="arrow_drop_down" className="absolute right-3 top-3 text-[#707881] text-2xl pointer-events-none" />
              </div>
              <p className="text-xs text-[#707881]">
                This audit taxonomy tag will be affixed to the tamper-proof ledger entry.
              </p>
            </div>

            {/* Timestamps Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                  Effective Execution Timestamp
                </span>
                <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#131b2e]">
                    <Icon name="bolt" className="text-base text-[#006194]" />
                    <span>Immediate (Now)</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#707881]">22 Oct 2026, 11:30 AM WAT</span>
                </div>
              </div>

              {actionType === 'temporary' && (
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex flex-col justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">
                    Audit Window Review Target
                  </span>
                  <div className="flex items-center justify-between mt-2 flex-wrap gap-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#131b2e]">
                      <Icon name="event_repeat" className="text-base text-[#006a61]" />
                      <span>30 Calendar Days</span>
                    </div>
                    <span className="font-mono text-[11px] text-[#707881]">Review: 21 Nov 2026</span>
                  </div>
                </div>
              )}
            </div>

            {/* Audit Notes */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#131b2e]">
                Detailed Administrative Audit Notes
              </label>
              <textarea
                value={auditNotes}
                onChange={(e) => setAuditNotes(e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full p-3.5 rounded-xl bg-[#f2f3ff] text-xs text-[#131b2e] leading-relaxed focus:outline-none focus:bg-white border border-[#eaedff] resize-none"
                placeholder="Provide factual context for the administrative record..."
              />
              <div className="flex justify-between items-center text-[11px] text-[#707881]">
                <span>Logged under Compliance Reference #AUD-882-B</span>
                <span>{auditNotes.length}/500</span>
              </div>
            </div>
          </section>

          {/* Legal & Historical Record Safeguards */}
          <div className="bg-[#ffdad6] text-[#93000a] p-5 rounded-2xl shadow-xs border border-[#ffdad6]">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="gavel" className="text-xl text-[#ba1a1a]" filled />
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base">
                Immutable Historical Record Preservation
              </h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex items-start gap-2">
                <Icon name="info" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                <span><strong>Workplace Scope:</strong> A Harmony clinic suspension is NOT a statutory dental licensing body suspension; it strictly restricts access within Harmony Dental Group facilities.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="history_edu" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                <span><strong>Authorship Integrity:</strong> All historical receipts, patient invoices, ledger credits, and check-in tickets authored by Kalu Okonkwo remain permanently preserved with authentic author attribution.</span>
              </li>
              <li className="flex items-start gap-2">
                <Icon name="lock_reset" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                <span><strong>Reinstatement Privilege:</strong> Standing can be re-enabled instantly by the Clinic Medical Director or Practice Owner with standard two-factor authentication.</span>
              </li>
            </ul>
          </div>

          {/* Two-Factor Security Confirmation Area */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="verified_user" className="text-xl text-[#006194]" filled />
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Administrative Authorization
              </h3>
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-[#f2f3ff] cursor-pointer">
              <input
                type="checkbox"
                checked={authCheck}
                onChange={(e) => setAuthCheck(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-[#006194]"
              />
              <span className="text-xs text-[#131b2e] leading-relaxed">
                I acknowledge this command immediately terminates active sessions and locks <strong className="font-semibold">Kalu Okonkwo</strong> out of all Harmony POS payment gateways and reception modules.
              </span>
            </label>

            {/* PIN Field */}
            <div className="flex flex-col gap-1.5 pt-1">
              <label className="text-xs font-semibold text-[#131b2e]">
                Administrator PIN / Security Passcode
              </label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type="password"
                    maxLength={6}
                    value={adminPin}
                    onChange={(e) => setAdminPin(e.target.value)}
                    placeholder="Enter 6-digit PIN"
                    className="w-full h-12 px-3.5 pr-10 rounded-xl bg-[#f2f3ff] text-sm font-mono tracking-widest text-[#131b2e] focus:outline-none focus:bg-white border border-[#eaedff]"
                  />
                  <Icon name="key" className="absolute right-3.5 top-3.5 text-[#707881] text-lg" />
                </div>
                <button
                  type="button"
                  onClick={simulateBiometric}
                  className="h-12 px-4 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#006194] text-xs font-bold flex items-center justify-center gap-1 transition-colors shrink-0"
                  title="Simulate Biometric Scan"
                >
                  <Icon name="fingerprint" className="text-xl" />
                  <span className="hidden sm:inline">Biometric</span>
                </button>
              </div>
              <span className="text-[11px] text-[#707881]">
                Session authorized under Administrator: Dr. Aisha Bello (Wuse 2 Superuser)
              </span>
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConfirmAction}
              disabled={!isReady || isSubmitting}
              className={`w-full sm:flex-1 h-12 rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-all ${
                !isReady
                  ? 'bg-[#ba1a1a]/40 text-white cursor-not-allowed'
                  : 'bg-[#ba1a1a] hover:bg-[#93000a] text-white active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Icon name="progress_activity" className="text-lg animate-spin" />
                  <span>Encrypting State & Preserving Ledger...</span>
                </>
              ) : (
                <>
                  <Icon name="lock_person" className="text-lg" />
                  <span>
                    {actionType === 'temporary'
                      ? 'Confirm Temporary Suspension'
                      : actionType === 'offboard'
                      ? 'Permanently End Affiliation'
                      : 'Revoke Wuse 2 Access'}
                  </span>
                </>
              )}
            </button>
            <button
              onClick={() => navigate('/staff-management/status')}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#3f4850] border border-[#eaedff] text-xs md:text-sm font-semibold flex items-center justify-center transition-colors"
            >
              Cancel and Retain Active Status
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
