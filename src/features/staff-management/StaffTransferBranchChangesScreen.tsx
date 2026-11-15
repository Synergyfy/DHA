import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const StaffTransferBranchChangesScreen: React.FC = () => {
  const navigate = useNavigate();

  const [targetBranch, setTargetBranch] = useState('gwarinpa');
  const [roleScope, setRoleScope] = useState<'retain' | 'modified'>('modified');
  const [tenancy, setTenancy] = useState<'permanent' | 'cover'>('permanent');
  const [cutoverDate, setCutoverDate] = useState('2026-11-01');
  const [justification, setJustification] = useState('Outpost Expansion & Pediatric Dental Outreach Program');
  const [reassignRecare, setReassignRecare] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleConfirmTransfer = () => {
    triggerToast('Transfer step 1 validated. Proceeding to Clinical Handover checklist...');
    setTimeout(() => {
      navigate('/staff-management/requests');
    }, 1500);
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
              onClick={() => navigate('/staff-management/branches')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Staff Transfer & Branch Changes
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Clinical transfer options')}
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
          {/* Step Indicator Progress Bar */}
          <div className="bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#eaedff]">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#006194] text-white font-bold text-xs flex items-center justify-center">
                  1
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#006194]">
                  Guided Transfer Wizard
                </span>
              </div>
              <span className="text-xs font-medium text-[#707881]">Step 1 of 3</span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-2 bg-[#eaedff] rounded-full overflow-hidden flex gap-1 my-2">
              <div className="w-1/3 h-full bg-[#006194] rounded-full"></div>
              <div className="w-1/3 h-full bg-[#dae2fd] rounded-full"></div>
              <div className="w-1/3 h-full bg-[#dae2fd] rounded-full"></div>
            </div>

            <div className="flex justify-between items-center mt-2 flex-wrap gap-1">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                Relocation & Deployment Scope
              </span>
              <span className="text-[11px] font-mono text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded-full">
                STF-RELOC-2026
              </span>
            </div>
          </div>

          {/* Selected Staff Member Clinical Identity Card */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
            <div className="flex items-start gap-4">
              <div className="relative shrink-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shadow-xs">
                  EB
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shadow-xs">
                  <Icon name="verified" className="text-xs" filled />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
                    Esther Bello, RDH
                  </h2>
                  <span className="bg-[#86f2e4]/40 text-[#006f66] text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <Icon name="shield_person" className="text-xs" />
                    Verified RDH-4410
                  </span>
                </div>
                <p className="text-xs text-[#707881] mt-0.5">
                  #STF-BEL-05 • Registered Dental Hygienist
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-[#006194] bg-[#f2f3ff] px-3 py-1 rounded-lg">
                  <Icon name="domain" className="text-xs" />
                  <span className="truncate">Harmony Dental Clinic — Wuse 2 Main</span>
                </div>
              </div>
            </div>
          </div>

          {/* Comparative Assignment Matrix */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131b2e] flex items-center gap-1.5">
                <Icon name="sync_alt" className="text-base text-[#006194]" />
                Deployment Vector
              </span>
              <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider">
                Comparative View
              </span>
            </div>

            {/* Current Base (Source) */}
            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#eaedff]">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#707881]"></span>
                  <span className="text-xs font-bold uppercase tracking-wide text-[#707881]">
                    Current Base Facility
                  </span>
                </div>
                <span className="text-xs font-mono text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded">
                  HQ #001
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Facility:</span>
                  <span className="font-semibold text-[#131b2e]">Wuse 2 Main Branch</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Clinical Post:</span>
                  <span className="font-semibold text-[#131b2e]">Senior Dental Hygienist</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Weekly Commitment:</span>
                  <span className="font-semibold text-[#131b2e]">Full-time (36.0 hrs/wk)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Primary Bay:</span>
                  <span className="font-semibold text-[#131b2e]">Operatory 04 (Hygiene & IPC)</span>
                </div>
              </div>
            </div>

            {/* Flow Connector Icon */}
            <div className="flex justify-center -my-1">
              <div className="w-9 h-9 rounded-full bg-[#007bb9] text-white flex items-center justify-center shadow-xs z-10">
                <Icon name="south" className="text-lg" />
              </div>
            </div>

            {/* Destination Target Facility */}
            <div className="bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#006194]/30">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#006194] animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wide text-[#006194]">
                    Destination Facility (Target)
                  </span>
                </div>
                <span className="text-xs font-bold text-[#006194] bg-[#cce5ff] px-2.5 py-0.5 rounded-full">
                  Active Selection
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                    Assigned Target Branch
                  </label>
                  <div className="relative">
                    <select
                      value={targetBranch}
                      onChange={(e) => setTargetBranch(e.target.value)}
                      className="w-full h-12 pl-3.5 pr-10 bg-[#f2f3ff] text-xs md:text-sm text-[#131b2e] font-semibold rounded-xl appearance-none focus:outline-none focus:bg-white border border-[#eaedff]"
                    >
                      <option value="gwarinpa">Harmony Dental Outpost — Gwarinpa (Branch #002)</option>
                      <option value="maitama">Harmony Specialist Centre — Maitama (Branch #003)</option>
                      <option value="asokoro">Harmony Pediatric Satellite — Asokoro (Branch #004)</option>
                    </select>
                    <Icon name="expand_more" className="absolute right-3.5 top-3 text-[#707881] text-2xl pointer-events-none" />
                  </div>
                </div>

                <div className="p-3 bg-[#f2f3ff] rounded-xl space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-[#131b2e]">
                    <Icon name="location_on" className="text-base text-[#006194]" />
                    <span>3rd Avenue Block B, Gwarinpa, Abuja FCT</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 text-[#707881] text-[11px]">
                    <span>Operatory Hub: Bay 02 (Mobile Unit)</span>
                    <span className="text-[#006a61] font-semibold flex items-center gap-1">
                      <Icon name="signal_cellular_alt" className="text-xs" />
                      Online Telemetry
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Role & Permission Scope Alignment */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="badge" className="text-xl text-[#006194]" />
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Role & Privilege Calibration
              </h3>
            </div>

            <div className="space-y-3">
              {/* Retain Role */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer border transition-all ${
                  roleScope === 'retain'
                    ? 'border-[#006194] bg-[#f2f3ff]'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="role_scope"
                  value="retain"
                  checked={roleScope === 'retain'}
                  onChange={() => setRoleScope('retain')}
                  className="mt-0.5 accent-[#006194]"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <span className="font-semibold text-sm text-[#131b2e] block">Retain Standard Clinical Role</span>
                  <p className="text-[#707881] mt-0.5 leading-relaxed">
                    Senior Dental Hygienist (Maintain standard charting, SRP privileges and baseline scheduling scope)
                  </p>
                </div>
              </label>

              {/* Modified Role */}
              <label
                className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer border transition-all ${
                  roleScope === 'modified'
                    ? 'border-[#006194] bg-[#f2f3ff]'
                    : 'border-[#eaedff] hover:bg-[#faf8ff]'
                }`}
              >
                <input
                  type="radio"
                  name="role_scope"
                  value="modified"
                  checked={roleScope === 'modified'}
                  onChange={() => setRoleScope('modified')}
                  className="mt-0.5 accent-[#006194]"
                />
                <div className="flex-1 min-w-0 text-xs">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-[#131b2e]">
                      Lead Community Screener & Hygiene Supervisor
                    </span>
                    <span className="bg-[#006194] text-white text-[10px] font-bold px-2 py-0.2 rounded">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[#707881] mt-0.5 leading-relaxed">
                    Expanded clinical charter including community triage sign-off, fluoridation camp oversight, and satellite inventory authority.
                  </p>
                </div>
              </label>
            </div>

            {/* Permission Diff Banner */}
            <div className="p-4 bg-[#86f2e4]/30 rounded-xl flex items-start gap-3 text-xs text-[#006f66] border border-[#86f2e4]">
              <Icon name="sync_saved_locally" className="text-lg text-[#006a61] shrink-0 mt-0.5" filled />
              <div className="space-y-1">
                <p className="font-semibold text-[#006f66]">Telemetry & Dispensing Authorization</p>
                <p className="leading-relaxed text-[#005049]">
                  Gwarinpa Outpost deploys mobile dental cart IoT telemetry. Transition grants Esther Bello active permissions for mobile cart auto-sync and local consumables dispensing (Chlorhexidine, Prophy-Jet powder canisters, and topical fluorides).
                </p>
              </div>
            </div>
          </section>

          {/* Transfer Execution Parameters */}
          <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="tune" className="text-xl text-[#006194]" />
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                Deployment Timeline & Continuity
              </h3>
            </div>

            {/* Transfer Type Switcher */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-2">Relocation Tenancy</label>
              <div className="grid grid-cols-2 gap-2 bg-[#f2f3ff] p-1.5 rounded-xl border border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setTenancy('permanent')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    tenancy === 'permanent'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="check_circle" className="text-sm" filled />
                  <span>Permanent</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTenancy('cover')}
                  className={`py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    tenancy === 'cover'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="timelapse" className="text-sm" />
                  <span>Cover (3 Mo)</span>
                </button>
              </div>
            </div>

            {/* Cutover Date */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">Effective Cutover Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={cutoverDate}
                  onChange={(e) => setCutoverDate(e.target.value)}
                  className="w-full h-12 px-3.5 bg-[#f2f3ff] text-xs md:text-sm font-semibold text-[#131b2e] rounded-xl border border-[#eaedff] focus:outline-none focus:bg-white"
                />
              </div>
              <p className="text-xs text-[#707881] mt-1">Badge and kiosk credentials at Gwarinpa activate at 07:00 AM WAT.</p>
            </div>

            {/* Formal Reason */}
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                Formal Deployment Justification
              </label>
              <div className="relative">
                <select
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full h-12 pl-3.5 pr-10 bg-[#f2f3ff] text-xs md:text-sm font-medium text-[#131b2e] rounded-xl appearance-none focus:outline-none focus:bg-white border border-[#eaedff]"
                >
                  <option>Outpost Expansion & Pediatric Dental Outreach Program</option>
                  <option>Clinical Capacity Rebalancing & Staff Balancing</option>
                  <option>Rotational Cross-Training & Sterilization Audits</option>
                  <option>Specialist Coverage Request — Community Ortho/Perio</option>
                </select>
                <Icon name="arrow_drop_down" className="absolute right-3.5 top-3 text-[#707881] text-2xl pointer-events-none" />
              </div>
            </div>

            {/* Recare Continuity Checkbox */}
            <label className="flex items-start gap-3 p-3.5 bg-[#f2f3ff] rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={reassignRecare}
                onChange={(e) => setReassignRecare(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded accent-[#006194]"
              />
              <div className="flex-1 min-w-0 text-xs">
                <div className="flex items-center gap-1 font-semibold text-[#131b2e]">
                  <span>Reassign Active Patient Recare Queue</span>
                  <Icon name="verified" className="text-sm text-[#006a61]" filled />
                </div>
                <p className="text-[#707881] mt-0.5 leading-relaxed">
                  Automatically transfer <strong className="text-[#131b2e]">18 scheduled Wuse 2 prophylaxis recare bookings</strong> to <strong className="text-[#131b2e]">Nurse Fatima Noor, RDH</strong> to prevent hygiene recall interruptions.
                </p>
              </div>
            </label>
          </section>

          {/* Statutory Notice */}
          <div className="bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex items-start gap-3.5 border border-[#eaedff]">
            <Icon name="history_edu" className="text-xl text-[#006194] shrink-0 mt-0.5" />
            <div className="text-xs text-[#3f4850] space-y-1">
              <span className="font-semibold text-xs uppercase tracking-wide text-[#131b2e]">
                Statutory Record Retention Notice
              </span>
              <p className="leading-relaxed">
                In compliance with Dental Practitioners Disciplinary Tribunal guidelines, the previous 24 months of clinical authorship, scaling and root planing (SRP) chartings, and radiographic exposure notes authored at Wuse 2 remain permanently indexed under Esther Bello (RDH-4410).
              </p>
            </div>
          </div>

          {/* Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={handleConfirmTransfer}
              className="w-full sm:flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors active:scale-[0.99]"
            >
              <span>Review & Confirm Transfer</span>
              <Icon name="arrow_forward" className="text-lg" />
            </button>
            <button
              onClick={() => navigate('/staff-management/branches')}
              className="w-full sm:w-auto h-12 px-6 bg-white hover:bg-[#f2f3ff] text-[#3f4850] rounded-xl text-xs md:text-sm font-semibold border border-[#eaedff] flex items-center justify-center transition-colors"
            >
              Cancel Transfer Workflow
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
