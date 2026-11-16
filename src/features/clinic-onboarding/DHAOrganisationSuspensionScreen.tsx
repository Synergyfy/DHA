import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DHAOrganisationSuspensionScreen() {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [isSuspended, setIsSuspended] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2500);
  };

  const handleExecute = () => {
    setIsSuspended(true);
    triggerToast('Formal Suspension Order Executed & Broadcast to National Registry');
  };

  return (
    <div className="bg-[#faf8ff] text-[#131b2e] min-h-screen flex flex-col font-['Inter',sans-serif]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-[#283044] text-[#eef0ff] px-5 py-2.5 rounded-full text-xs font-semibold shadow-2xl flex items-center gap-2 z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
          <Icon name="gavel" className="text-[16px] text-[#ffdad6]" />
          <span>{showToast}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/organisation-management')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#ba1a1a] uppercase tracking-wider">
                DHA Registry • Enforcement
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Organisation Suspension
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/clinic-onboarding/organisation-management')}
              className="h-9 px-3.5 bg-white hover:bg-[#eaedff] border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Icon name="domain" className="text-[16px]" />
              <span className="hidden sm:inline">Registry Pool</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#ba1a1a] flex items-center justify-center shadow-sm text-white ml-1">
              <Icon name="gavel" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 pt-20 pb-28 space-y-6">
        {/* Regulatory Notice Banner */}
        <div className="relative w-full rounded-3xl bg-[#ffdad6] text-[#410002] p-5 sm:p-6 shadow-sm overflow-hidden border border-[#ffdad6]">
          <div className="flex items-start gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#ba1a1a] flex items-center justify-center shrink-0 text-white shadow-md">
              <Icon name="gavel" className="text-[26px]" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#93000a] bg-white/70 px-2.5 py-0.5 rounded-full">
                  Statutory Mandate
                </span>
                <span className="w-1 h-1 rounded-full bg-[#ba1a1a]" />
                <span className="text-xs font-bold text-[#93000a]">
                  Sec 15.38 Enforcement Order
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#93000a] mt-1">
                Formal Organisation Suspension Order
              </h2>
              <p className="text-xs text-[#5d0006] mt-1 leading-relaxed">
                This administrative action revokes operational clearance and enforces immediate facility triage and service suspension measures under the Dental Health Authority Act.
              </p>
            </div>
          </div>
        </div>

        {/* Target Entity Summary Card */}
        <div className="w-full rounded-3xl bg-white p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0">
                <Icon name="domain" className="text-[26px]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider block">
                  Facility Under Sanction
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#131b2e]">
                  Cedars Dental Surgery Ltd
                </h3>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#eaedff] text-[#131b2e] font-mono text-xs font-bold">
              RC-884920
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col border border-[#dae2fd]/60">
              <span className="text-[10px] font-bold text-[#707881] uppercase">
                Jurisdiction &amp; Zone
              </span>
              <span className="text-xs font-bold text-[#131b2e] mt-1">
                FCT Zone A04 (Garki II)
              </span>
            </div>
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex flex-col border border-[#dae2fd]/60">
              <span className="text-[10px] font-bold text-[#707881] uppercase">
                Licence Number
              </span>
              <span className="text-xs font-mono font-bold text-[#006194] mt-1">
                DHA-DEN-4402-A
              </span>
            </div>
          </div>

          {/* Status Transition Flow */}
          <div className="p-4 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd] flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#ba1a1a] animate-pulse" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#707881] uppercase">
                  Current Status
                </span>
                <span className="text-xs font-bold text-[#ba1a1a]">
                  ACTIVE (UNDER INVESTIGATION)
                </span>
              </div>
            </div>
            <Icon name="arrow_forward" className="text-[#707881] text-[20px] hidden sm:block" />
            <div className="flex items-center gap-2.5 text-right">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#707881] uppercase">
                  Post-Action State
                </span>
                <span className="text-xs font-bold text-[#93000a]">
                  TEMPORARILY SUSPENDED
                </span>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#ffdad6] text-[#93000a] flex items-center justify-center shrink-0">
                <Icon name="lock" className="text-[16px]" />
              </div>
            </div>
          </div>
        </div>

        {/* Grounds for Regulatory Sanction (3 Breaches) */}
        <div className="space-y-3.5">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Icon name="report_problem" className="text-[#ba1a1a] text-[20px]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                Statutory Clinical Violations
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
              3 Breaches
            </span>
          </div>

          {/* Finding 1: Uncertified Sedation */}
          <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] font-mono text-xs font-bold">
                  SEC 4.12
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                  Uncertified Chairside Sedation
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase">
                Severe
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Unlawful administration of intravenous conscious sedation within non-accredited Class A operatory. Operatory lacked capnography monitors and absence of a credentialed dental anesthesiologist.
            </p>
            <div className="pt-2 text-[11px] text-[#707881] flex items-center gap-1.5 font-medium">
              <Icon name="assignment_late" className="text-[#ba1a1a] text-[15px]" />
              <span>Documented Incident: Procedure Log #2026-03-11-OR3</span>
            </div>
          </div>

          {/* Finding 2: Autoclave Spore Testing */}
          <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#eaedff] text-[#006195] font-mono text-xs font-bold">
                  BIO-90
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                  Expired Autoclave Spore Testing
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase">
                Critical
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              HEFAMAA cross-inspection confirmed 45-day overdue autoclave biological spore indicator validation log. High risk of cross-contamination across operative handpieces and surgical burs.
            </p>
            <div className="pt-2 text-[11px] text-[#707881] flex items-center gap-1.5 font-medium">
              <Icon name="history_toggle_off" className="text-[#f57f17] text-[15px]" />
              <span>Last Validated Spore Assay: 57 Days Elapsed</span>
            </div>
          </div>

          {/* Finding 3: Barred Practitioner */}
          <div className="bg-white rounded-2xl p-5 border border-[#dae2fd]/80 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#ffdad6] text-[#93000a] font-mono text-xs font-bold">
                  REG-08
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-[#131b2e]">
                  Barred Practitioner Active
                </h4>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px] font-bold uppercase">
                Severe
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Unlicensed clinical dental assistant formally documented administering mandibular infiltration local anesthesia without direct practitioner supervision.
            </p>
            <div className="pt-2 text-[11px] text-[#707881] flex items-center gap-1.5 font-medium">
              <Icon name="person_cancel" className="text-[#ba1a1a] text-[15px]" />
              <span>Individual Sanction Notice #MDCN-DISC-091</span>
            </div>
          </div>
        </div>

        {/* Operational Restrictions Mandate */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0">
              <Icon name="security" className="text-[22px]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#131b2e]">
                Enforced Operational Restrictions
              </h3>
              <p className="text-xs text-[#707881]">
                Automatic programmatic enforcement upon signature
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-start gap-2.5">
              <Icon name="visibility_off" className="text-[#ba1a1a] text-[18px] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Patient Discovery Delisting</p>
                <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">
                  Facility delisted from patient search, directory, and booking engines.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-start gap-2.5">
              <Icon name="lock" className="text-[#ba1a1a] text-[18px] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#131b2e]">LifeCode Operational Lock</p>
                <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">
                  Staff credentials locked for clinical charting; prescription issuance frozen.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-start gap-2.5">
              <Icon name="shield" className="text-[#006194] text-[18px] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Records Preservation Shield</p>
                <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">
                  Cryptographic read-only snapshot frozen to prevent retroactive EHR alterations.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/60 flex items-start gap-2.5">
              <Icon name="emergency" className="text-[#ba1a1a] text-[18px] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-bold text-[#131b2e]">Emergency Triage Transfer</p>
                <p className="text-[11px] text-[#3f4850] mt-0.5 leading-snug">
                  Active emergent patients redirected to National Hospital Garki Dental Unit.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Remediation Milestones & Timeline */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
              Statutory Remediation Window
            </h3>
            <span className="text-xs font-mono font-bold text-[#ba1a1a]">30 Days</span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
              <span>1. Triple-cycle biological autoclave spore assay with certified lab results</span>
              <span className="text-[#707881] font-medium">Day 14</span>
            </div>
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
              <span>2. Full staffing credential audit and removal of barred personnel</span>
              <span className="text-[#707881] font-medium">Day 21</span>
            </div>
            <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between">
              <span>3. Regulatory fine penalty payment (₦1,500,000 to TSA Account)</span>
              <span className="text-[#707881] font-medium">Day 30</span>
            </div>
          </div>
        </div>

        {/* Sign-off & Confirmation */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#dae2fd]/80 shadow-sm space-y-4">
          <label className="flex items-start gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="w-5 h-5 rounded mt-0.5 text-[#ba1a1a] accent-[#ba1a1a] shrink-0 cursor-pointer"
            />
            <div className="flex-1 min-w-0">
              <span className="text-xs sm:text-sm font-bold text-[#131b2e] block">
                Statutory Directorate Sign-off
              </span>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                I, <strong className="text-[#131b2e]">Dr. K. Danladi</strong>, Director of Enforcement &amp; Quality Assurance, confirm that this suspension notice has been served to the facility board and registered in the National Health Facility Gazette.
              </p>
            </div>
          </label>

          <div className="pt-2">
            <button
              type="button"
              disabled={!confirmed}
              onClick={handleExecute}
              className={`w-full h-12 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99] ${
                !confirmed
                  ? 'bg-[#bfc7d2] text-[#707881] cursor-not-allowed'
                  : isSuspended
                  ? 'bg-[#93000a] text-white'
                  : 'bg-[#ba1a1a] hover:bg-[#93000a] text-white'
              }`}
            >
              <Icon name="gavel" className="text-[20px]" />
              <span>
                {isSuspended
                  ? 'Suspension Order Active & Broadcasted'
                  : 'Execute Formal Facility Suspension'}
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
export default DHAOrganisationSuspensionScreen;
