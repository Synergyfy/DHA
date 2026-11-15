import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const InvitationDetailsStatusScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRevoked, setIsRevoked] = useState(false);

  const inviteCode = id || 'INV-STAFF-2026-088';

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(
      `https://dha-health.ng/portal/invitations/${inviteCode}?auth=token_d820f`
    );
    triggerToast('Secure invitation link copied to clipboard!');
  };

  const handleResend = () => {
    triggerToast('Invitation re-dispatched via Push Notification & Secure Email.');
  };

  const handleRevoke = () => {
    if (confirm('Are you sure you want to revoke this invitation for Dr. Daniel Musa?')) {
      setIsRevoked(true);
      triggerToast('Invitation has been revoked.');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/pending-invitations')}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Invitation Details & Status
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
        {/* Status Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
              isRevoked ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}>
              <Icon name={isRevoked ? 'cancel' : 'schedule'} className={`text-sm ${isRevoked ? '' : 'animate-pulse'}`} />
              <span className="uppercase tracking-wider">
                {isRevoked ? 'Invitation Revoked' : 'Pending Recipient Acceptance'}
              </span>
            </div>
            {!isRevoked && (
              <span className="font-mono text-xs text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full font-bold">
                7d left
              </span>
            )}
          </div>

          <div className="pt-1">
            <span className="text-[11px] font-mono text-[#707881] uppercase tracking-wider block">
              Reference Code
            </span>
            <h2 className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-bold text-[#131b2e] tracking-tight">
              #{inviteCode}
            </h2>
          </div>

          <div className="flex items-center gap-3 pt-1 text-xs text-[#3f4850] flex-wrap">
            <span className="inline-flex items-center gap-1">
              <Icon name="send" className="text-sm text-[#006194]" />
              <span>22 Oct 2026, 09:15 WAT</span>
            </span>
            <span className="w-1 h-1 rounded-full bg-[#bfc7d2]"></span>
            <span className="inline-flex items-center gap-1 text-[#131b2e] font-medium">
              <Icon name="hourglass_top" className="text-sm text-amber-700" />
              <span>Expires 29 Oct 2026</span>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Dossier Section 1: Invitee Information */}
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                    <Icon name="person_check" className="text-base" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                    Invitee Dossier
                  </h3>
                </div>
                <span className="text-xs bg-[#86f2e4]/30 text-[#006a61] px-2.5 py-0.5 rounded-full flex items-center gap-1 font-semibold">
                  <Icon name="verified" className="text-xs" />
                  <span>DHA Verified</span>
                </span>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#f2f3ff] mt-4">
                <div className="relative shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                    alt="Dr. Daniel Musa"
                    className="w-12 h-12 rounded-full object-cover shadow-xs"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#006a61] ring-2 ring-white flex items-center justify-center">
                    <Icon name="check" className="text-[10px] text-white" />
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                    Dr. Daniel Musa, BDS
                  </p>
                  <p className="text-xs text-[#3f4850] truncate">
                    LifeCode: <span className="font-mono text-[#131b2e]">NG-ABJ-882-104</span>
                  </p>
                  <div className="mt-1 flex items-center gap-1 text-xs font-mono text-[#006a61] font-medium">
                    <Icon name="medical_services" className="text-xs" />
                    <span>MDCN Lic: #DEN-88210 (Active)</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 pt-3">
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f2f3ff] text-xs text-[#3f4850]">
                  <Icon name="mail" className="text-sm text-[#006194]" />
                  <span className="truncate text-[#131b2e] font-medium">daniel.musa@dha-health.ng</span>
                </div>
                <div className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[#f2f3ff] text-xs text-[#3f4850]">
                  <Icon name="call" className="text-sm text-[#006194]" />
                  <span className="text-[#131b2e] font-medium">+234 802 334 9182</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#eaedff]">
              <button
                type="button"
                onClick={() => navigate('/staff-management/role-assignment')}
                className="w-full py-2 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
              >
                <Icon name="manage_accounts" className="text-base" />
                <span>Configure Role & Permissions (17.9)</span>
              </button>
            </div>
          </div>

          {/* Dossier Section 2: Deployment Details */}
          <div className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#eaedff]">
              <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                <Icon name="corporate_fare" className="text-base" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                Proposed Deployment
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-1">
                <span className="text-[10px] font-mono text-[#707881] uppercase tracking-wider block">
                  Clinical Organisation
                </span>
                <p className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                  Harmony Dental Group
                </p>
                <p className="text-xs text-[#006194] font-medium flex items-center gap-1 pt-0.5">
                  <Icon name="badge" className="text-xs" />
                  <span>Associate Dentist / General Restorative</span>
                </p>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-2.5">
                  <Icon name="location_on" className="text-base text-[#006a61] mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-[#707881] uppercase block">Primary Base</span>
                    <p className="text-xs font-semibold text-[#131b2e]">Harmony Dental Clinic — Wuse 2 Main</p>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-2.5">
                  <Icon name="add_location_alt" className="text-base text-[#707881] mt-0.5" />
                  <div>
                    <span className="text-[10px] font-mono text-[#707881] uppercase block">Secondary Roster Scope</span>
                    <p className="text-xs font-semibold text-[#131b2e]">Maitama Specialist Centre</p>
                  </div>
                </div>
              </div>

              <div className="pt-1 flex items-center gap-2 text-xs text-[#707881]">
                <Icon name="account_circle" className="text-sm" />
                <span>Invited by <strong className="text-[#131b2e]">Samuel Eze</strong> (Ops Mgr • #FCT-OPS-091)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Access & Governance Mandate */}
        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
              <Icon name="verified_user" className="text-base" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
              Access & Governance Mandate
            </h3>
          </div>

          <div className="p-4 rounded-xl bg-[#f2f3ff] flex items-start gap-3 border border-[#dae2fd]/60">
            <Icon name="gavel" className="text-xl text-[#006194] shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006a61]">
                  DHA Certified
                </span>
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850]">
                  Awaiting Clinician Acceptance
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed pt-1">
                Restricted clinical notes and operatory scheduling will become active only once Dr. Musa accepts the invitation via his personal DHA Professional Portal (Section 14).
              </p>
            </div>
          </div>
        </div>

        {/* Audit Trail & Timeline */}
        <div className="rounded-2xl bg-white p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                <Icon name="history" className="text-base" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                Audit Trail & Timeline
              </h3>
            </div>
            <span className="text-xs font-mono text-[#006a61] font-semibold">Real-time sync</span>
          </div>

          <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#dae2fd]">
            {/* Node 1 */}
            <div className="relative">
              <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#006a61] flex items-center justify-center ring-4 ring-white">
                <Icon name="check" className="text-[10px] text-white" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e]">Invitation Dispatched</p>
                  <span className="font-mono text-[11px] text-[#707881]">09:15 AM</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">Triggered via Push Notification & Secure Email by Samuel Eze.</p>
              </div>
            </div>

            {/* Node 2 */}
            <div className="relative">
              <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#006a61] flex items-center justify-center ring-4 ring-white">
                <Icon name="check" className="text-[10px] text-white" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e]">Email Delivery Confirmed</p>
                  <span className="font-mono text-[11px] text-[#707881]">09:16 AM</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">Successfully delivered to inbox (daniel.musa@dha-health.ng).</p>
              </div>
            </div>

            {/* Node 3 */}
            <div className="relative">
              <div className="absolute -left-[23px] top-0.5 w-3.5 h-3.5 rounded-full bg-[#006194] flex items-center justify-center ring-4 ring-white">
                <Icon name="touch_app" className="text-[10px] text-white" />
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#006194]">Security Link Accessed</p>
                  <span className="font-mono text-[11px] text-[#707881]">09:40 AM</span>
                </div>
                <p className="text-xs text-[#3f4850] mt-0.5">Recipient clicked verification redirect. Authenticated session node: Abuja FCT.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Drawer / Buttons */}
        <div className="space-y-3 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isRevoked}
              onClick={handleResend}
              className="h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] disabled:opacity-50 text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="forward_to_inbox" className="text-lg" />
              <span>Resend Invitation (Push/Email)</span>
            </button>
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-12 rounded-xl bg-white hover:bg-[#f2f3ff] text-[#006194] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors shadow-xs"
            >
              <Icon name="content_copy" className="text-lg" />
              <span>Copy Secure Invitation Link</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={isRevoked}
              onClick={handleRevoke}
              className="h-11 rounded-xl bg-[#ffdad6]/50 hover:bg-[#ffdad6] text-[#ba1a1a] disabled:opacity-50 font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="person_cancel" className="text-lg" />
              <span>Revoke Invitation</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/staff-management/pending-invitations')}
              className="h-11 rounded-xl text-[#707881] hover:text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back" className="text-base" />
              <span>Back to Pending Invitations (17.8)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10 animate-fade-in">
          <Icon name="check_circle" className="text-sm text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
