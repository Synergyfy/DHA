import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export function DHABranchReviewScreen() {
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState<string | null>(null);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showEndorseModal, setShowEndorseModal] = useState(false);
  const [auditDate, setAuditDate] = useState('2026-10-24T10:00');
  const [branchStatus, setBranchStatus] = useState<'pending' | 'endorsed'>('pending');

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => {
      setShowToast(null);
    }, 2500);
  };

  const handleEndorse = () => {
    setBranchStatus('endorsed');
    setShowEndorseModal(false);
    triggerToast('Branch Accreditation Endorsed for Garki Satellite (#002)');
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

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Go back"
              onClick={() => navigate('/clinic-onboarding/application-decision')}
              className="w-10 h-10 flex items-center justify-center text-[#131b2e] hover:text-[#006194] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                DHA Registry • Review
              </span>
              <h1 className="text-base sm:text-lg font-bold text-[#131b2e] tracking-tight">
                DHA Branch Review
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Notification ledger clear')}
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

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Branch Identity & Capacity & Modules */}
          <div className="lg:col-span-7 space-y-5">
            {/* Parent Entity Context Chip */}
            <div className="bg-[#f2f3ff] p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col space-y-2">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-1.5 text-[#006a61]">
                  <Icon name="corporate_fare" className="text-[18px]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider">
                    Parent Entity Record
                  </span>
                </div>
                <span className="bg-[#86f2e4] text-[#006f66] px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1">
                  <Icon name="verified" className="text-[13px]" />
                  <span>Tier 2 Verified</span>
                </span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#131b2e]">
                  Greenfield Dental Clinic Ltd
                </h2>
                <p className="text-xs text-[#3f4850] flex items-center gap-2 mt-0.5 flex-wrap">
                  <span>CAC RC-1489201</span>
                  <span className="inline-block w-1 h-1 rounded-full bg-[#707881]" />
                  <span>HQ: Wuse 2 Central Apex</span>
                </p>
              </div>
            </div>

            {/* Branch Primary Identity Card */}
            <div className="bg-white p-5 sm:p-6 rounded-2xl border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="bg-[#cce5ff] text-[#001d31] font-mono text-xs px-2.5 py-0.5 rounded-md font-bold">
                      #GDC-ABJ-002
                    </span>
                    <span className="bg-[#eaedff] text-[#3f4850] text-xs px-2.5 py-0.5 rounded-md font-medium">
                      Satellite Outpost
                    </span>
                    {branchStatus === 'endorsed' && (
                      <span className="bg-[#86f2e4] text-[#006f66] text-xs px-2.5 py-0.5 rounded-md font-bold uppercase">
                        Endorsed
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                    Garki Branch (#002)
                  </h3>
                  <p className="text-xs sm:text-sm text-[#3f4850] flex items-center gap-1.5 mt-1">
                    <Icon name="location_on" className="text-[16px] text-[#006194]" />
                    <span>Plot 108 Mohammadu Buhari Way, Garki 2, Abuja</span>
                  </p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#eaedff] flex items-center justify-center text-[#006194] shrink-0 shadow-sm">
                  <Icon name="domain_verification" className="text-[26px]" />
                </div>
              </div>

              {/* Audit Status Ribbon */}
              <div className="bg-[#f2f3ff] p-3.5 rounded-xl flex items-center justify-between gap-3 border border-[#dae2fd]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#007bb9] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon name="event" className="text-[18px]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">
                      Scheduled Audit
                    </p>
                    <p className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">
                      {auditDate.replace('T', ' • ')} WAT
                    </p>
                  </div>
                </div>
                <span className="bg-[#dae2fd] text-[#006195] px-3 py-1 rounded-full text-xs font-semibold shrink-0">
                  On-Site Review
                </span>
              </div>

              {/* Lead Clinician & Branch Manager Profile */}
              <div className="bg-[#faf8ff] p-3.5 rounded-xl flex items-center justify-between gap-3 border border-[#dae2fd]">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shrink-0">
                    TF
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">
                        Dr. Tunde Fashola, BDS
                      </p>
                      <Icon name="check_circle" className="text-[#006194] text-[15px]" />
                    </div>
                    <p className="text-[11px] text-[#3f4850] truncate">
                      Lead Clinician &amp; Branch Director • #DEN-65412
                    </p>
                  </div>
                </div>
                <span className="font-mono text-xs bg-white text-[#006194] px-2.5 py-1 rounded-md border border-[#dae2fd] font-semibold shrink-0">
                  Active
                </span>
              </div>
            </div>

            {/* Key Operational Capacity Matrix */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="chair" className="text-[#006194] text-[22px]" />
                  <span className="bg-[#cce5ff] text-[#001d31] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    100% Active
                  </span>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#131b2e]">
                    2 Operatories
                  </div>
                  <p className="text-xs text-[#3f4850] truncate mt-0.5">
                    Suite A &amp; Suite B Setup
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <Icon name="groups" className="text-[#006a61] text-[22px]" />
                  <span className="bg-[#89f5e7] text-[#00201d] text-[10px] px-2 py-0.5 rounded font-bold uppercase">
                    Rostered
                  </span>
                </div>
                <div>
                  <div className="text-lg sm:text-xl font-bold text-[#131b2e]">
                    2 Practitioners
                  </div>
                  <p className="text-xs text-[#3f4850] truncate mt-0.5">
                    1 Resident, 1 Visiting
                  </p>
                </div>
              </div>
            </div>

            {/* Scope of Practice Notice */}
            <div className="bg-[#f2f3ff] p-4 sm:p-5 rounded-2xl border border-[#dae2fd] flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-center text-[#006195] shrink-0 mt-0.5 shadow-sm">
                <Icon name="medical_services" className="text-[20px]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-[#131b2e]">
                    Authorized Scope of Practice
                  </span>
                  <span className="text-[10px] font-bold text-[#006194] uppercase bg-[#cce5ff] px-2 py-0.5 rounded-full">
                    Tier 1 Satellite
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                  Preventive &amp; Restorative Outpatient Care. Invasive oral maxillofacial surgeries &amp; full-mouth CBCT 3D scans are routed to Wuse 2 Apex Center.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Field Inspection Checklist & Actions */}
          <div className="lg:col-span-5 space-y-5">
            {/* Field Inspection Modules */}
            <div className="bg-white p-5 rounded-2xl border border-[#dae2fd]/80 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#131b2e] uppercase tracking-wider">
                  Field Inspection Checklist
                </h4>
                <span className="text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                  2 / 4 Cleared
                </span>
              </div>

              {/* Module 1: Tenancy */}
              <div className="p-3.5 rounded-xl border border-[#dae2fd] bg-[#f2f3ff]/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="verified" className="text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <p className="text-xs font-bold text-[#131b2e]">
                      Module 1: Tenancy &amp; Premises
                    </p>
                    <span className="bg-[#89f5e7] text-[#00201d] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1 leading-relaxed">
                    Cadastral Zone II lease deed authenticated with FCT Land Administration &amp; AMAC compliance files.
                  </p>
                </div>
              </div>

              {/* Module 2: IPC & Autoclave */}
              <div className="p-3.5 rounded-xl border border-[#dae2fd] bg-white flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="pending" className="text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <p className="text-xs font-bold text-[#131b2e]">
                      Module 2: IPC &amp; Autoclave
                    </p>
                    <span className="bg-[#eaedff] text-[#006195] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Pending Audit
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1 leading-relaxed">
                    Biological spore test assay certs and clean-dirty workflow demarcation pending physical audit.
                  </p>
                </div>
              </div>

              {/* Module 3: Radiation Shielding */}
              <div className="p-3.5 rounded-xl border border-[#dae2fd] bg-white flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eaedff] text-[#006195] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="radioactive" className="text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <p className="text-xs font-bold text-[#131b2e]">
                      Module 3: Radiation Safety
                    </p>
                    <span className="bg-[#eaedff] text-[#006195] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Pending NNRA
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1 leading-relaxed">
                    Form NNRA-412 lead lining verification and badge dosimeter monitoring contract under review.
                  </p>
                </div>
              </div>

              {/* Module 4: Staffing & Emergency */}
              <div className="p-3.5 rounded-xl border border-[#dae2fd] bg-[#f2f3ff]/40 flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="verified" className="text-[16px]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 flex-wrap">
                    <p className="text-xs font-bold text-[#131b2e]">
                      Module 4: Staffing &amp; Emergency
                    </p>
                    <span className="bg-[#89f5e7] text-[#00201d] text-[10px] px-2 py-0.5 rounded-full font-bold">
                      Passed
                    </span>
                  </div>
                  <p className="text-[11px] text-[#3f4850] mt-1 leading-relaxed">
                    BLS certs, medical waste biohazard disposal agreement with Abuja Environmental Protection Board.
                  </p>
                </div>
              </div>
            </div>

            {/* Statutory Determination & Actions */}
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShowEndorseModal(true)}
                className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
              >
                <Icon name="how_to_reg" className="text-[20px]" />
                <span>
                  {branchStatus === 'endorsed'
                    ? 'Branch Endorsement Certified'
                    : 'Endorse Branch Accreditation'}
                </span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowRescheduleModal(true)}
                  className="h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Icon name="calendar_month" className="text-[18px] text-[#006194]" />
                  <span>Reschedule Audit</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/clinic-onboarding/request-information')}
                  className="h-11 bg-white hover:bg-[#f2f3ff] border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <Icon name="contact_support" className="text-[18px] text-[#006195]" />
                  <span>Issue Branch RFI</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => navigate('/clinic-onboarding/application-decision')}
                className="w-full h-10 bg-transparent text-[#707881] hover:text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
              >
                <Icon name="arrow_back" className="text-[16px]" />
                <span>Back to Statutory Decision (15.33)</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Reschedule Modal */}
      {showRescheduleModal && (
        <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-in zoom-in-95 duration-150">
            <h3 className="text-base sm:text-lg font-bold text-[#131b2e]">
              Reschedule On-Site Audit
            </h3>
            <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
              Adjust the scheduled field inspection appointment for Garki Satellite (#002).
            </p>

            <div className="my-4 space-y-2">
              <label className="text-xs font-bold text-[#707881] uppercase block">
                Inspection Date &amp; Time
              </label>
              <input
                type="datetime-local"
                value={auditDate}
                onChange={(e) => setAuditDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#dae2fd] bg-[#f2f3ff] text-xs font-medium text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
              />
            </div>

            <div className="flex gap-2.5 mt-5">
              <button
                type="button"
                onClick={() => {
                  setShowRescheduleModal(false);
                  triggerToast('Audit inspection rescheduled successfully');
                }}
                className="flex-1 h-11 bg-[#006194] text-white rounded-xl text-xs font-bold hover:bg-[#007bb9] transition-all"
              >
                Confirm New Date
              </button>
              <button
                type="button"
                onClick={() => setShowRescheduleModal(false)}
                className="h-11 px-4 border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold hover:bg-[#eaedff]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Endorse Modal */}
      {showEndorseModal && (
        <div className="fixed inset-0 z-50 bg-[#283044]/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center mx-auto mb-3">
              <Icon name="verified" className="text-[28px]" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#131b2e] text-center">
              Endorse Branch Accreditation?
            </h3>
            <p className="text-xs text-[#3f4850] text-center mt-1.5 leading-relaxed">
              This grants provisional facility operating authority to <strong>Garki Branch (#002)</strong> under the Greenfield Dental Clinic Ltd umbrella.
            </p>

            <div className="flex gap-2.5 mt-6">
              <button
                type="button"
                onClick={handleEndorse}
                className="flex-1 h-11 bg-[#006a61] text-white rounded-xl text-xs font-bold hover:bg-[#005049] transition-all"
              >
                Endorse &amp; Affix Seal
              </button>
              <button
                type="button"
                onClick={() => setShowEndorseModal(false)}
                className="h-11 px-4 border border-[#dae2fd] text-[#3f4850] rounded-xl text-xs font-semibold hover:bg-[#eaedff]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default DHABranchReviewScreen;
