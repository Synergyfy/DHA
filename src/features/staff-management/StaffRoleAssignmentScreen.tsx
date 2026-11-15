import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type RoleTier = 'tier-3' | 'tier-2';

export const StaffRoleAssignmentScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<RoleTier>('tier-2');
  const [isConfirming, setIsConfirming] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        navigate('/staff-management/directory');
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/directory')}
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Staff Role Assignment
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white ml-1">
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Instruction Banner */}
        <div className="bg-[#f2f3ff] rounded-2xl p-5 md:p-6 shadow-xs border border-[#dae2fd]/60">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#89f5e7] text-[#00201d] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="verified_user" className="text-lg" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                Licensing & Cadre Alignment
              </p>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                Select the operational role to assign to Dr. Daniel Musa. Available roles are governed by DHA Statutory Licensing and clinical credentialing tiers.
              </p>
            </div>
          </div>
        </div>

        {/* Selected Staff Member Summary Card */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
                alt="Dr. Daniel Musa"
                className="w-14 h-14 rounded-full object-cover shadow-xs ring-2 ring-[#eaedff]"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow-xs">
                <Icon name="check" className="text-xs" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e] truncate">
                  Dr. Daniel Musa, BDS
                </h2>
                <span className="font-mono text-xs text-[#707881]">#STF-MUS-09</span>
              </div>

              <div className="mt-1.5 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-xs">
                  <Icon name="badge" className="text-xs" />
                  <span>Current: GP (Provisional)</span>
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006a61] text-xs font-semibold">
                  <Icon name="verified" className="text-xs" />
                  <span>MDCN #DEN-88210</span>
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-1.5 text-xs text-[#3f4850]">
                <Icon name="domain" className="text-sm text-[#006194] shrink-0" />
                <span className="truncate">Harmony Dental Clinic — Wuse 2 Main Branch</span>
              </div>
            </div>
          </div>
        </section>

        {/* Role Selection Radios */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
              Available Operational Roles
            </h3>
            <span className="text-xs font-mono text-[#707881]">4 Tiers Defined</span>
          </div>

          <div className="space-y-3">
            {/* 1. Lead Restorative Dentist */}
            <div
              onClick={() => setSelectedRole('tier-3')}
              className={`rounded-2xl p-5 shadow-xs border transition-all cursor-pointer relative overflow-hidden ${
                selectedRole === 'tier-3'
                  ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-md'
                  : 'bg-white border-[#eaedff] hover:border-[#006194]/40'
              }`}
            >
              {selectedRole === 'tier-3' && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#006194]"></div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                    selectedRole === 'tier-3' ? 'bg-[#006194]' : 'bg-[#e2e7ff]'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${selectedRole === 'tier-3' ? 'bg-white' : 'bg-transparent'}`}></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                        Lead Restorative Dentist
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#006194] font-mono text-xs font-semibold">
                        Tier 3
                      </span>
                    </div>
                    <p className="text-xs text-[#3f4850] mt-0.5">Dental Specialist Cadre</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#86f2e4]/30 text-[#006a61] text-xs font-semibold shrink-0">
                  <Icon name="verified" className="text-xs" />
                  <span>Qualified</span>
                </span>
              </div>

              <div className="mt-3 pl-8 text-xs text-[#3f4850] space-y-1">
                <p><strong className="text-[#131b2e]">Prerequisite:</strong> MDCN Specialist Board Certification</p>
                <p>Full restorative, endodontic triage, clinical mentorship, and operative sign-off.</p>
              </div>
            </div>

            {/* 2. Associate Dentist / GP (Recommended) */}
            <div
              onClick={() => setSelectedRole('tier-2')}
              className={`rounded-2xl p-5 shadow-xs border transition-all cursor-pointer relative overflow-hidden ${
                selectedRole === 'tier-2'
                  ? 'bg-white border-[#006194] ring-2 ring-[#006194]/20 shadow-md'
                  : 'bg-white border-[#eaedff] hover:border-[#006194]/40'
              }`}
            >
              {selectedRole === 'tier-2' && (
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#006194]"></div>
              )}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className={`w-5 h-5 rounded-full mt-0.5 flex items-center justify-center shrink-0 ${
                    selectedRole === 'tier-2' ? 'bg-[#006194]' : 'bg-[#e2e7ff]'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${selectedRole === 'tier-2' ? 'bg-white' : 'bg-transparent'}`}></div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                        Associate Dentist
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#006194] text-white text-xs font-semibold">
                        Active Choice
                      </span>
                    </div>
                    <p className="text-xs text-[#006194] font-medium mt-0.5">General Dental Practitioner</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-bold shrink-0">
                  Recommended
                </span>
              </div>

              <div className="mt-3 pl-8 space-y-2 text-xs text-[#3f4850]">
                <div className="flex items-center gap-1.5 text-[#131b2e] font-medium">
                  <Icon name="check_circle" className="text-sm text-[#006a61]" />
                  <span>Valid MDCN Dental Surgeon License matches file</span>
                </div>
                <p>
                  Diagnostic examination, routine restorative, local infiltration anesthesia, and comprehensive treatment planning drafts.
                </p>
                <div className="p-2.5 rounded-xl bg-[#f2f3ff] flex items-start gap-2 border border-[#dae2fd]/50">
                  <Icon name="shield" className="text-sm text-[#707881] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3f4850]">
                    Guardrail: Controlled substance dispensing requires supervising sign-off.
                  </span>
                </div>
              </div>
            </div>

            {/* 3. Clinical Director (Locked) */}
            <div className="opacity-60 bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd]/60 cursor-not-allowed">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d2d9f4] flex items-center justify-center shrink-0">
                    <Icon name="lock" className="text-xs text-[#707881]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                        Clinical Director
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#3f4850] text-xs font-mono">
                        Tier 4
                      </span>
                    </div>
                    <p className="text-xs text-[#707881] mt-0.5">Executive Governance</p>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-xs font-semibold shrink-0">
                  Locked
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-2.5 pl-8">
                Requires Harmony Healthcare Board Resolution & Managing Director statutory authorization.
              </p>
            </div>

            {/* 4. Dental Therapist / Hygiene Supervisor (Non-cadre) */}
            <div className="opacity-50 bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd]/60 cursor-not-allowed">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#d2d9f4] flex items-center justify-center shrink-0">
                    <Icon name="block" className="text-xs text-[#707881]" />
                  </div>
                  <div>
                    <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                      Dental Therapist / Hygiene Supervisor
                    </span>
                    <p className="text-xs text-[#707881] mt-0.5">Allied Dental Health Cadre</p>
                  </div>
                </div>

                <span className="px-2.5 py-0.5 rounded-full bg-[#dae2fd] text-[#707881] text-xs font-semibold shrink-0">
                  Non-Cadre
                </span>
              </div>
              <p className="text-xs text-[#707881] mt-2.5 pl-8">
                Incompatible with Dental Surgery qualification (BDS). Requires registered RDH / Dental Therapy credential.
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Role Scope & Permission Impact Panel */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                <Icon name="account_tree" className="text-base" />
              </div>
              <div>
                <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                  Scope of Practice & Permissions
                </h4>
                <span className="text-xs text-[#006a61] font-semibold">
                  {selectedRole === 'tier-2' ? 'Tier 2 Associate Dentist Impact Matrix' : 'Tier 3 Lead Restorative Impact Matrix'}
                </span>
              </div>
            </div>
            <p className="text-xs text-[#3f4850] mt-2 leading-relaxed">
              Grants primary chairside diagnostic and restorative authority across Wuse 2 Main Operatories. Authorizes prescription of Schedule II analgesics and local infiltration.
            </p>
          </div>

          {/* Permissions Breakdown */}
          <div className="space-y-4 pt-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
                Authorized Operations (4 Grants)
              </span>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="check_circle" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#131b2e]">
                    View & Edit Assigned Patient Dental Charts <span className="font-mono text-[#707881]">(Sec 9 Odontogram)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="check_circle" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#131b2e]">
                    Initiate & Schedule Staged Treatment Plans <span className="font-mono text-[#707881]">(Sec 13)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="check_circle" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#131b2e]">
                    Order & Review Panoramic Radiographs & CBCT Volumes <span className="font-mono text-[#707881]">(Sec 11)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="check_circle" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#131b2e]">
                    Dispense Chairside Dental Consumables & Local Anesthetics <span className="font-mono text-[#707881]">(Sec 16.29)</span>
                  </span>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#ba1a1a]">
                Restricted Safeguards (Enforced by Policy)
              </span>
              <div className="mt-2 space-y-2">
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="cancel" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3f4850]">
                    Cannot access Clinic Financial Ledgers or Private P&L <span className="font-mono text-[#707881]">(Sec 16.40)</span>
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="cancel" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3f4850]">
                    Cannot modify other practitioners' verified clinical notes
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]/40">
                  <Icon name="cancel" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#3f4850]">
                    Cannot alter clinic branch premises licensing registrations
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Audit Attribution Footer */}
          <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-1.5 border border-[#dae2fd]/50">
            <div className="flex items-center gap-1.5 text-[#131b2e]">
              <Icon name="history_edu" className="text-base text-[#006194]" />
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs">Role Assignment Audit Trail</span>
            </div>
            <p className="text-xs text-[#3f4850]">
              <strong className="text-[#131b2e]">Designated Assigners:</strong> Dr. Sarah Okafor (Clinical Director) & Samuel Eze (Operations Lead)
            </p>
            <p className="text-xs text-[#3f4850] flex items-center gap-1">
              <Icon name="schedule" className="text-xs text-[#006a61]" />
              <span>Effective immediately upon clinician 2FA session verification.</span>
            </p>
          </div>
        </section>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={isConfirming}
            onClick={handleConfirm}
            className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
          >
            {isConfirming ? (
              <>
                <Icon name="progress_activity" className="text-lg animate-spin" />
                <span>Confirming Role Assignment...</span>
              </>
            ) : (
              <>
                <Icon name="assignment_turned_in" className="text-lg" />
                <span>Confirm Role Assignment</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/staff-management/directory')}
            className="w-full h-11 bg-white hover:bg-[#f2f3ff] text-[#707881] hover:text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold rounded-xl transition-colors border border-[#eaedff]"
          >
            Cancel & Keep Current Role
          </button>
        </div>
      </main>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs flex items-center gap-3 border border-white/10 animate-fade-in">
          <Icon name="check_circle" className="text-lg text-[#86f2e4]" />
          <div>
            <p className="font-semibold text-white">Role Updated</p>
            <p className="text-white/80 text-[11px]">2FA dispatch sent to Dr. Daniel Musa.</p>
          </div>
        </div>
      )}
    </div>
  );
};
