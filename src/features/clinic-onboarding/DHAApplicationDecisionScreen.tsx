import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type DecisionType = 'approve' | 'rfi' | 'reject';

export function DHAApplicationDecisionScreen() {
  const navigate = useNavigate();
  const [decision, setDecision] = useState<DecisionType>('approve');
  const [attested, setAttested] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCommitted, setIsCommitted] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2400);
  };

  const handleCommit = () => {
    setShowModal(false);
    setIsCommitted(true);
    triggerToast('Accreditation Seal Published & Gazetted Successfully');
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="check_circle" className="text-[16px] text-[#00a392]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/review-workspace')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                Section 15 • Review
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Application Decision
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('No pending notifications')}
              className="w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="notifications" className="text-[20px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Primary Decisions & Scope */}
          <div className="lg:col-span-7 space-y-5">
            {/* Top Application Summary Banner */}
            <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2 flex-wrap text-xs">
                  <span className="font-mono font-bold text-[#006194] bg-[#cce5ff]/50 px-2.5 py-0.5 rounded-md">
                    #DHA-APP-2026-8819
                  </span>
                  <span className="w-1 h-1 rounded-full bg-[#bfc7d2]" />
                  <span className="text-[#3f4850] font-medium">CAC RC-1489201</span>
                </div>
                <div className="bg-[#86f2e4]/40 text-[#006f66] px-2.5 py-1 rounded-full flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                  <Icon name="verified" className="text-[14px]" />
                  <span>8/10 Passed</span>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="min-w-0">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e] tracking-tight truncate">
                    Greenfield Dental Clinic Ltd
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-[#3f4850]">
                    <Icon name="badge" className="text-[16px] text-[#006195]" />
                    <span>
                      Med. Director: <strong>Dr. Amina Bello</strong> (
                      <span className="font-mono font-semibold">#DEN-78421</span>)
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#eaedff] shrink-0 flex items-center justify-center text-[#006194]">
                  <Icon name="corporate_fare" className="text-[24px]" />
                </div>
              </div>

              {/* Inspector Micro-strip */}
              <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-center gap-3 border border-[#dae2fd]/60">
                <div className="w-8 h-8 rounded-lg bg-[#007bb9] text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon name="shield_person" className="text-[16px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                    Lead Reviewer Assignment
                  </p>
                  <p className="text-xs font-semibold text-[#131b2e] truncate">
                    Insp. Ibrahim Musa • Zonal Desk #04 (FCT Health Services)
                  </p>
                </div>
              </div>
            </div>

            {/* Primary Statutory Decision Section */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <Icon name="gavel" className="text-[#006194] text-[20px]" />
                  <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                    Statutory Determination
                  </span>
                </div>
                <span className="text-[11px] font-medium text-[#707881]">
                  Section 15 Mandate
                </span>
              </div>

              {/* Option 1: Approve */}
              <div
                onClick={() => setDecision('approve')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
                  decision === 'approve'
                    ? 'bg-white border-[#006a61] ring-2 ring-[#006a61]/30 shadow-md'
                    : 'bg-white border-[#dae2fd]/80 hover:bg-[#f2f3ff]/60 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      decision === 'approve'
                        ? 'bg-[#006a61] text-white'
                        : 'bg-[#eaedff] text-[#707881]'
                    }`}
                  >
                    <Icon name="check" className="text-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                        Approve &amp; Issue Provisional Accreditation
                      </h3>
                      {decision === 'approve' && (
                        <span className="bg-[#86f2e4] text-[#006f66] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                      Corporate standing validated under Section 15. Formally grants parent-level legal recognition and unified LifeCode credential portal provisioning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 2: Request Further Info (RFI) */}
              <div
                onClick={() => setDecision('rfi')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
                  decision === 'rfi'
                    ? 'bg-white border-[#006194] ring-2 ring-[#006194]/30 shadow-md'
                    : 'bg-white border-[#dae2fd]/80 hover:bg-[#f2f3ff]/60 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      decision === 'rfi'
                        ? 'bg-[#006194] text-white'
                        : 'bg-[#eaedff] text-[#006195]'
                    }`}
                  >
                    <Icon name="contact_support" className="text-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                        Request Statutory Information (RFI)
                      </h3>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/clinic-onboarding/request-information');
                        }}
                        className="text-[#006195] text-xs font-semibold flex items-center gap-1 hover:underline"
                      >
                        <span>Ref 15.32</span>
                        <Icon name="arrow_forward" className="text-[14px]" />
                      </button>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                      Suspend determination. Issue statutory notice requesting auxiliary clinical indemnity schedules or missing radiation safety disclosures.
                    </p>
                  </div>
                </div>
              </div>

              {/* Option 3: Reject Application */}
              <div
                onClick={() => setDecision('reject')}
                className={`cursor-pointer rounded-2xl p-4 sm:p-5 border transition-all duration-200 ${
                  decision === 'reject'
                    ? 'bg-white border-[#ba1a1a] ring-2 ring-[#ba1a1a]/30 shadow-md'
                    : 'bg-white border-[#dae2fd]/80 hover:bg-[#f2f3ff]/60 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      decision === 'reject'
                        ? 'bg-[#ba1a1a] text-white'
                        : 'bg-[#ffdad6] text-[#ba1a1a]'
                    }`}
                  >
                    <Icon name="cancel" className="text-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-base font-bold text-[#131b2e]">
                        Reject Application
                      </h3>
                      <span className="bg-[#ffdad6] text-[#93000a] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                        Statutory Bar
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                      Issue adverse gazette finding. Requires certified invocation of statutory grounds under Dental Health Code Rule 15-B.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Separation Mandate (§15.4(c)) */}
            <div className="bg-white rounded-2xl overflow-hidden border border-[#dae2fd]/80 shadow-sm">
              <div className="bg-[#eaedff] px-5 py-3 flex items-center justify-between border-b border-[#dae2fd]">
                <div className="flex items-center gap-2.5">
                  <Icon name="account_tree" className="text-[#006194] text-[20px]" />
                  <div>
                    <p className="text-sm font-bold text-[#131b2e]">
                      Operational Separation Mandate
                    </p>
                    <p className="text-[11px] text-[#707881]">
                      DHA Statutory Branch Rule §15.4(c)
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/branch-review')}
                  className="text-xs font-semibold text-[#006194] hover:underline flex items-center gap-1"
                >
                  <span>Branch Review</span>
                  <Icon name="chevron_right" className="text-[16px]" />
                </button>
              </div>

              <div className="p-5 space-y-3.5">
                {/* HQ #001 Card */}
                <div className="bg-[#f2f3ff] rounded-xl p-4 border border-[#dae2fd]/70 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#006a61] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="domain_verification" className="text-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#131b2e]">
                        HQ #001: Wuse 2 Main
                      </span>
                      <span className="bg-[#86f2e4] text-[#006f66] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Approved
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1">
                      Plot 418 Aminu Kano Crescent, Wuse 2, Abuja
                    </p>
                    <div className="flex items-center gap-2 mt-2 text-[#006f66] text-xs font-semibold">
                      <Icon name="event_seat" className="text-[15px]" />
                      <span>4 Surgical Operatories • Gazetted Outpatient Dental Surgery</span>
                    </div>
                  </div>
                </div>

                {/* Secondary Branch Card (Held Pending) */}
                <div className="bg-[#eaedff]/60 rounded-xl p-4 border border-[#dae2fd] flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white text-[#006195] border border-[#dae2fd] flex items-center justify-center shrink-0">
                    <Icon name="pending_actions" className="text-[18px]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#131b2e]">
                        Branch #002: Garki Satellite
                      </span>
                      <span className="bg-[#dae2fd] text-[#006195] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        Premises Held
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-1">
                      Suite 12, Area 11 Commercial Arcade, Garki, Abuja
                    </p>
                    <div className="mt-2.5 bg-white/90 rounded-lg p-3 border border-[#dae2fd] flex items-start gap-2 text-xs">
                      <Icon name="warning" className="text-[#ba1a1a] text-[16px] shrink-0 mt-0.5" />
                      <p className="text-[#131b2e] font-medium leading-relaxed">
                        Approval does <strong>NOT</strong> extend clinical authority to Garki Satellite until Form FCT-42 is certified by field inspection panel on 24 Oct 2026.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Provisional License Ledger & Attestation & Commit */}
          <div className="lg:col-span-5 space-y-5">
            {/* Digital Accreditation Seal & License Terms */}
            <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="workspace_premium" className="text-[#006194] text-[22px]" />
                  <h3 className="text-sm font-bold text-[#131b2e]">
                    Provisional License Ledger
                  </h3>
                </div>
                <span className="bg-[#cce5ff] text-[#001d31] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {isCommitted ? 'Gazetted Live' : 'Draft Ready'}
                </span>
              </div>

              {/* Digital Seal Visual Box */}
              <div className="bg-gradient-to-br from-[#f2f3ff] via-[#cce5ff]/30 to-[#f2f3ff] rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden border border-[#dae2fd]">
                <div className="absolute -right-6 -bottom-6 text-[#006194]/10 select-none pointer-events-none">
                  <Icon name="verified" className="text-[120px]" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-[#006194] text-white flex items-center justify-center mb-3 shadow-md">
                  <Icon name="health_and_safety" className="text-[30px]" />
                </div>
                <p className="text-[10px] font-bold text-[#707881] uppercase tracking-widest">
                  Registered DHA Accreditation ID
                </p>
                <p className="text-xl sm:text-2xl font-black text-[#006194] tracking-tight mt-1 font-mono">
                  DHA-FAC-2026-0419
                </p>

                <div className="grid grid-cols-2 gap-3 w-full mt-5 pt-4 border-t border-[#dae2fd] text-left">
                  <div className="bg-white/80 rounded-xl p-3 border border-[#dae2fd]/60">
                    <p className="text-[10px] font-bold text-[#707881] uppercase">
                      Validity Cycle
                    </p>
                    <p className="text-xs font-bold text-[#131b2e] mt-1">
                      24 Months
                    </p>
                    <p className="text-[11px] text-[#3f4850] mt-0.5">
                      18 Oct 2026 – 17 Oct 2028
                    </p>
                  </div>
                  <div className="bg-white/80 rounded-xl p-3 border border-[#dae2fd]/60">
                    <p className="text-[10px] font-bold text-[#707881] uppercase">
                      Permitted Practice
                    </p>
                    <p className="text-xs font-bold text-[#131b2e] mt-1">
                      Tier 2 Facility
                    </p>
                    <p className="text-[11px] text-[#3f4850] mt-0.5">
                      Outpatient Surgery &amp; 3D Scan
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Reviewer Solemn Attestation */}
            <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm">
              <label className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={attested}
                  onChange={(e) => setAttested(e.target.checked)}
                  className="w-5 h-5 rounded mt-0.5 text-[#006194] accent-[#006194] shrink-0 cursor-pointer"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs sm:text-sm font-bold text-[#131b2e] block">
                    Statutory Officer Attestation
                  </span>
                  <p className="text-xs text-[#3f4850] mt-1.5 leading-relaxed">
                    I, <strong className="text-[#131b2e]">Insp. Ibrahim Musa</strong>, certify that legal corporate filings and practitioner credentials have been verified against federal and FCT registry databases under Section 15 of the Dental Health Act.
                  </p>
                </div>
              </label>
            </div>

            {/* Action Tray */}
            <div className="space-y-3">
              <button
                type="button"
                disabled={!attested}
                onClick={() => {
                  if (decision === 'rfi') {
                    navigate('/clinic-onboarding/request-information');
                  } else {
                    setShowModal(true);
                  }
                }}
                className={`w-full h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${
                  !attested
                    ? 'bg-[#bfc7d2] text-[#707881] cursor-not-allowed'
                    : isCommitted
                    ? 'bg-[#006a61] text-white hover:bg-[#005049]'
                    : decision === 'approve'
                    ? 'bg-[#006194] text-white hover:bg-[#007bb9]'
                    : decision === 'rfi'
                    ? 'bg-[#006195] text-white hover:bg-[#287ab3]'
                    : 'bg-[#ba1a1a] text-white hover:bg-[#93000a]'
                }`}
              >
                <Icon
                  name={
                    isCommitted
                      ? 'verified'
                      : decision === 'approve'
                      ? 'how_to_reg'
                      : decision === 'rfi'
                      ? 'outgoing_mail'
                      : 'block'
                  }
                  className="text-[20px]"
                />
                <span>
                  {isCommitted
                    ? 'Accreditation Seal Published & Gazetted'
                    : decision === 'approve'
                    ? 'Finalise & Gazetted Approval (Generate Seal)'
                    : decision === 'rfi'
                    ? 'Issue Statutory Notice (RFI 15.32)'
                    : 'Issue Statutory Rejection Notice'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => triggerToast('Draft decision saved locally')}
                  className="h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Icon name="save" className="text-[18px] text-[#707881]" />
                  <span>Save Draft</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/review-workspace')}
                  className="h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Icon name="folder_open" className="text-[18px]" />
                  <span>Dossier (15.30)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-2xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Icon name="verified" className="text-[32px]" />
            </div>
            <h3 className="text-lg font-bold text-[#131b2e] text-center">
              Commit Statutory Decision?
            </h3>
            <p className="text-xs text-[#3f4850] text-center mt-1.5 leading-relaxed">
              You are executing gazetted accreditation for{' '}
              <strong className="text-[#131b2e]">Greenfield Dental Clinic Ltd</strong>.
            </p>

            <div className="bg-[#f2f3ff] rounded-2xl p-4 my-5 space-y-2.5 text-xs border border-[#dae2fd]">
              <div className="flex justify-between">
                <span className="text-[#707881]">Accreditation ID:</span>
                <span className="font-mono font-bold text-[#006194]">DHA-FAC-2026-0419</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707881]">Primary Scope:</span>
                <span className="font-semibold text-[#006a61]">HQ Wuse 2 (Active)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707881]">Garki Satellite:</span>
                <span className="font-semibold text-[#ba1a1a]">Held Pending Inspection</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#707881]">Signatory:</span>
                <span className="font-medium text-[#131b2e]">Insp. Ibrahim Musa</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                type="button"
                onClick={handleCommit}
                className="w-full h-12 bg-[#006194] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] transition-all"
              >
                <Icon name="approval" className="text-[20px]" />
                <span>Affix Digital Seal &amp; Dispatch</span>
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="w-full h-10 bg-transparent text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-xl text-xs font-semibold transition-colors"
              >
                Review Specifications Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DHAApplicationDecisionScreen;
