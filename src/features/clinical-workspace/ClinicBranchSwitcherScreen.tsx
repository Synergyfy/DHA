import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { ClinicalWorkspaceShell } from './ClinicalWorkspaceShell';

interface PracticeBranch {
  id: string;
  name: string;
  subTitle: string;
  code: string;
  type: 'primary' | 'secondary' | 'community';
  role: string;
  schedule: string;
  stats: {
    bookedToday?: number;
    station: string;
    nursesOnDuty?: number;
    operatoryCount: number;
    notes: string;
  };
  hasAlert?: boolean;
  alertText?: string;
}

const PRACTICES: PracticeBranch[] = [
  {
    id: 'wuse2',
    name: 'Harmony Dental Clinic',
    subTitle: 'Wuse 2 Branch • Primary Practice Site',
    code: 'DHA-FL-1904',
    type: 'primary',
    role: 'Lead Restorative Dentist & Odontologist',
    schedule: 'Sun, Mon, Tue, Fri',
    stats: {
      bookedToday: 8,
      station: 'Operatory 02',
      nursesOnDuty: 4,
      operatoryCount: 6,
      notes: 'Odontogram data synchronized • Dexis bitewings active',
    },
  },
  {
    id: 'Victoria Island',
    name: 'Harmony Dental Specialists',
    subTitle: 'Victoria Island 1 Branch • Specialized Prosthodontics',
    code: 'DHA-FL-2881',
    type: 'secondary',
    role: 'Visiting Prosthodontic Consultant',
    schedule: 'Wed & Thu',
    stats: {
      bookedToday: 3,
      station: 'Operatory 04',
      nursesOnDuty: 2,
      operatoryCount: 4,
      notes: '3 second-opinion dossiers awaiting chart sign-off',
    },
    hasAlert: true,
    alertText: '3 second-opinion dossiers awaiting chart sign-off',
  },
  {
    id: 'barsha',
    name: 'Surulere Community Dental Centre',
    subTitle: 'DHA Health Authority Partner • Public Outreach',
    code: 'DHA-FL-0812',
    type: 'community',
    role: 'Honorary Clinical Proctor (Tier 1 Public Roster)',
    schedule: 'Bi-weekly Saturday Rotations',
    stats: {
      bookedToday: 14,
      station: 'General Operatory 01',
      nursesOnDuty: 5,
      operatoryCount: 8,
      notes: 'Public health authority intake queue • Pediatric triage',
    },
  },
];

export function ClinicBranchSwitcherScreen() {
  const navigate = useNavigate();
  const [activeBranchId, setActiveBranchId] = useState<string>('wuse2');
  const [simulatedTarget, setSimulatedTarget] = useState<PracticeBranch | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [facilityLicenseInput, setFacilityLicenseInput] = useState('');
  const [clinicalRoleInput, setClinicalRoleInput] = useState('');

  const activeBranch = PRACTICES.find((p) => p.id === activeBranchId) || PRACTICES[0];

  const handleSimulateSwitch = (target: PracticeBranch) => {
    if (target.id === activeBranchId) {
      setSimulatedTarget(null);
      return;
    }
    setSimulatedTarget(target);
  };

  const handleConfirmSwitch = () => {
    if (simulatedTarget) {
      setActiveBranchId(simulatedTarget.id);
      setToastMessage(`Switched active operational facility to ${simulatedTarget.name}`);
      setSimulatedTarget(null);
    } else {
      setToastMessage(`${activeBranch.name} confirmed as active facility.`);
    }
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowLinkModal(false);
    setToastMessage(`Affiliation endorsement request for ${facilityLicenseInput || 'facility'} submitted to Medical Director.`);
    setFacilityLicenseInput('');
    setClinicalRoleInput('');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <ClinicalWorkspaceShell
      pageTitle="Clinic & Branch Switcher"
      badgeCode="14.19"
      badgeLabel="Facility Context Manager"
      activeNav="dashboard"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-[#131b2e] text-white text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in fade-in slide-in-from-top-4 duration-200">
            <span className="w-2 h-2 rounded-full bg-[#86f2e4] animate-pulse"></span>
            <span>{toastMessage}</span>
            <button
              type="button"
              onClick={() => setToastMessage(null)}
              className="text-[#707881] hover:text-white ml-2"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          </div>
        )}

        {/* Top Clinician Context & Status Pill */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#006194] to-[#007bb9] text-white flex items-center justify-center font-bold text-lg shadow-md shrink-0">
              DJ
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold text-[#131b2e]">Dr. Daniel James, DDS</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-[10px] font-bold">
                  DHA Licensed
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-0.5">
                License #DEN-48912 • Specialist Restorative Dentistry &amp; Odontology
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#86f2e4]/20 text-[#006f66] font-mono text-xs font-bold border border-[#86f2e4]/40">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>3 DHA Linked Sites</span>
            </span>
          </div>
        </div>

        {/* Regulatory & Privacy Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#cce5ff]/30 border border-[#93ccff]/50 flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex-1 text-xs">
            <h4 className="font-bold text-[#004b74] text-sm">
              Data Partitioning &amp; Jurisdiction Protocol (DHA-REG-14.19)
            </h4>
            <p className="text-[#004b74]/90 mt-1 leading-relaxed">
              Switching operational branches dynamically reconfigures the active operatory calendar, local triage work queue, and chairside nurse allocations. Patient encounters remain strictly partitioned under Nigeria Data Protection Act 2023; cross-facility medical records require verified biometric patient consent.
            </p>
          </div>
        </div>

        {/* Interactive Diff Simulation Tray (When a branch is staged for switch) */}
        {simulatedTarget && (
          <div className="p-5 rounded-2xl bg-[#faf8ff] border-2 border-[#006194] shadow-md animate-in fade-in space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
              <div className="flex items-center gap-2">
                <Icon name="swap_horiz" className="text-[20px] text-[#006194]" />
                <span className="text-sm font-bold text-[#131b2e]">
                  Staged Target Facility: {simulatedTarget.name}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#006194] text-white text-[10px] font-bold">
                Simulation Preview
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-[#eaedff]">
                <div className="text-[#707881] text-[10px] uppercase font-bold">Calendar Remap</div>
                <div className="font-bold text-[#131b2e] mt-0.5">
                  {simulatedTarget.stats.bookedToday ?? 0} Scheduled Encounters
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#eaedff]">
                <div className="text-[#707881] text-[10px] uppercase font-bold">Assigned Chairside Bay</div>
                <div className="font-bold text-[#006194] mt-0.5">
                  {simulatedTarget.stats.station}
                </div>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#eaedff]">
                <div className="text-[#707881] text-[10px] uppercase font-bold">Facility Roster Scope</div>
                <div className="font-bold text-[#006a61] mt-0.5">
                  {simulatedTarget.stats.operatoryCount} Operatories Online
                </div>
              </div>
            </div>

            <p className="text-xs text-[#3f4850] leading-relaxed">
              Applying this switch will shift your active clinical telemetry to {simulatedTarget.name} ({simulatedTarget.code}). You will be logged into {simulatedTarget.stats.station}.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setSimulatedTarget(null)}
                className="px-4 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-bold text-[#3f4850] hover:bg-[#f2f3ff]"
              >
                Cancel Staged Switch
              </button>
              <button
                type="button"
                onClick={handleConfirmSwitch}
                className="px-5 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] flex items-center gap-1.5 shadow-sm"
              >
                <Icon name="check_circle" className="text-[16px]" />
                <span>Confirm &amp; Apply Switch</span>
              </button>
            </div>
          </div>
        )}

        {/* Section 1: Active Operational Facility (Hero Card) */}
        <div className="bg-white rounded-3xl border border-[#eaedff] p-6 lg:p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                Active Operational Facility
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006f66] text-xs font-bold border border-[#86f2e4]/50 flex items-center gap-1">
              <Icon name="check_circle" className="text-[14px]" />
              <span>Current Session Context</span>
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl sm:text-2xl font-bold text-[#131b2e]">
                  {activeBranch.name}
                </h2>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
                  {activeBranch.code}
                </span>
              </div>
              <p className="text-sm font-semibold text-[#006194]">{activeBranch.subTitle}</p>
              <div className="text-xs text-[#707881] flex items-center gap-2 pt-1">
                <Icon name="badge" className="text-[15px] text-[#006194]" />
                <span>Designation: <strong>{activeBranch.role}</strong></span>
              </div>
            </div>

            {/* Quick Metrics Bento */}
            <div className="grid grid-cols-3 gap-3 shrink-0">
              <div className="p-3 bg-[#f2f3ff] rounded-2xl text-center min-w-[90px]">
                <div className="text-xl font-bold text-[#006194]">
                  {activeBranch.stats.bookedToday ?? 0}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#707881] mt-0.5">
                  Booked Today
                </div>
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-2xl text-center min-w-[90px]">
                <div className="text-xl font-bold text-[#006a61]">
                  {activeBranch.stats.station.split(' ')[1] || 'Op'}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#707881] mt-0.5">
                  {activeBranch.stats.station}
                </div>
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-2xl text-center min-w-[90px]">
                <div className="text-xl font-bold text-[#131b2e]">
                  {activeBranch.stats.operatoryCount}
                </div>
                <div className="text-[10px] uppercase font-bold text-[#707881] mt-0.5">
                  Operatories
                </div>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#707881] gap-2">
            <span className="flex items-center gap-1.5">
              <Icon name="cloud_done" className="text-[16px] text-[#006a61]" />
              <span>{activeBranch.stats.notes}</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate('/dentist/calendar')}
                className="px-3 py-1.5 rounded-xl bg-[#f2f3ff] text-[#006194] font-semibold hover:bg-[#eaedff]"
              >
                Open Facility Calendar
              </button>
            </div>
          </div>
        </div>

        {/* Section 2: Switchable Affiliated Practices */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#707881]">
              Switchable Affiliated Practice Locations
            </h3>
            <span className="text-xs text-[#707881]">Tap any facility to simulate context switch</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRACTICES.filter((p) => p.id !== activeBranchId).map((branch) => {
              const isStaged = simulatedTarget?.id === branch.id;
              return (
                <div
                  key={branch.id}
                  className={`p-5 rounded-2xl bg-white border transition-all shadow-xs flex flex-col justify-between space-y-4 ${
                    isStaged
                      ? 'border-[#006194] ring-2 ring-[#006194]/20 bg-[#faf8ff]'
                      : 'border-[#eaedff] hover:border-[#006194]/40'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-[#f2f3ff] text-[#006194] border border-[#eaedff]">
                            {branch.code}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#eaedff] text-[#3f4850]">
                            {branch.schedule}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-[#131b2e]">{branch.name}</h4>
                        <p className="text-xs text-[#707881]">{branch.subTitle}</p>
                      </div>

                      <div className="w-10 h-10 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0">
                        <Icon name="apartment" className="text-[20px]" />
                      </div>
                    </div>

                    <div className="p-3 bg-[#faf8ff] rounded-xl border border-[#eaedff] text-xs space-y-1">
                      <div className="font-semibold text-[#131b2e]">{branch.role}</div>
                      <div className="text-[11px] text-[#707881]">{branch.stats.notes}</div>
                    </div>

                    {branch.hasAlert && (
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#ba1a1a]">
                        <Icon name="priority_high" className="text-[14px]" />
                        <span>{branch.alertText}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-2 border-t border-[#eaedff] flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleSimulateSwitch(branch)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 ${
                        isStaged
                          ? 'bg-[#006194] text-white shadow-sm'
                          : 'bg-[#f2f3ff] text-[#006194] hover:bg-[#eaedff]'
                      }`}
                    >
                      <Icon name="swap_horiz" className="text-[16px]" />
                      <span>{isStaged ? 'Branch Staged (Ready)' : `Switch to ${branch.name.split(' ')[1] || 'Branch'}`}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 3: Pending & In-Review Facilities */}
        <div className="bg-white rounded-2xl border border-[#eaedff] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Pending Credentialing &amp; Privileges
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdcc2] text-[#9a4500] text-[10px] font-bold">
              1 Application Under Review
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#ffdcc2]/50 text-[#9a4500] flex items-center justify-center shrink-0">
                <Icon name="hourglass_top" className="text-[20px]" />
              </div>
              <div className="text-xs">
                <h4 className="font-bold text-[#131b2e] text-sm">
                  Nigerian Oral Maxillofacial Institute
                </h4>
                <div className="text-[#707881] mt-0.5">
                  Victoria Island Facility • Surgical Implantology Privileges (#EOMI-882)
                </div>
                <div className="text-[#006194] font-medium mt-1">
                  Medical Director credentialing committee review in progress
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/dentist/verification')}
              className="px-3.5 py-2 rounded-xl bg-white border border-[#eaedff] text-xs font-bold text-[#006194] hover:bg-[#f2f3ff] transition-colors self-start sm:self-auto shrink-0 shadow-xs"
            >
              Upload Indemnity Doc
            </button>
          </div>
        </div>

        {/* Section 4: Link New Facility */}
        <div className="p-5 rounded-2xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-white text-[#006194] flex items-center justify-center shadow-xs shrink-0">
              <Icon name="add_business" className="text-[22px]" />
            </div>
            <div>
              <div className="font-bold text-[#131b2e] text-sm">+ Link New Clinic Facility</div>
              <div className="text-xs text-[#707881]">
                Requires Nigeria Dental Health Authority Facility License # and Medical Director endorsement.
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowLinkModal(true)}
            className="px-4 py-2.5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77] transition-colors shadow-sm self-start sm:self-auto"
          >
            Request Affiliation Link
          </button>
        </div>

        {/* Link Facility Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-[#eaedff] max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="add_business" className="text-[20px] text-[#006194]" />
                  <span className="text-sm font-bold text-[#131b2e]">Link New Clinic Facility</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="text-[#707881] hover:text-[#131b2e] p-1 rounded-lg"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <form onSubmit={handleLinkSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">
                    DHA Facility License Number
                  </label>
                  <input
                    type="text"
                    required
                    value={facilityLicenseInput}
                    onChange={(e) => setFacilityLicenseInput(e.target.value)}
                    placeholder="e.g. DHA-FL-4920"
                    className="w-full px-3 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#131b2e] mb-1">
                    Assigned Clinical Role / Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={clinicalRoleInput}
                    onChange={(e) => setClinicalRoleInput(e.target.value)}
                    placeholder="e.g. Visiting Specialist Prosthodontist"
                    className="w-full px-3 py-2.5 bg-white border border-[#eaedff] rounded-xl text-xs text-[#131b2e] focus:outline-none focus:border-[#006194]"
                  />
                </div>

                <div className="p-3 bg-[#faf8ff] rounded-xl text-[11px] text-[#707881] leading-relaxed">
                  Submitting will transmit an electronic credentialing request to the target facility Medical Director and verify your malpractice coverage under Nigerian health regulations.
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLinkModal(false)}
                    className="px-4 py-2 rounded-xl border border-[#eaedff] text-xs font-bold text-[#3f4850]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#004e77]"
                  >
                    Submit Affiliation Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ClinicalWorkspaceShell>
  );
}
