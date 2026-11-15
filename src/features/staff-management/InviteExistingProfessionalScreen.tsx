import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const InviteExistingProfessionalScreen: React.FC = () => {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('NG-ABJ-882-104');
  const [selectedRole, setSelectedRole] = useState('Specialist Orthodontist & Dental Surgeon');
  const [primaryBranch, setPrimaryBranch] = useState('Harmony Dental Clinic — Wuse 2 Main Branch');
  const [secondaryRoster, setSecondaryRoster] = useState(true);
  const [dutyRestorative, setDutyRestorative] = useState(true);
  const [dutyEmergency, setDutyEmergency] = useState(true);
  const [dutyEndo, setDutyEndo] = useState(false);
  const [personalNote, setPersonalNote] = useState(
    'Dr. Musa, we would like to invite you to join our restorative dental team at Harmony Dental Wuse 2 branch. Your credentials and restorative portfolio align perfectly with our patient care goals.'
  );
  const [isSending, setIsSending] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const handleSendInvite = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setInviteSent(true);
      setTimeout(() => {
        navigate('/staff-management/directory');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/add')}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Invite Staff Wizard
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
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Step Progress Indicator */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#006194]">
              Affiliation Protocol
            </span>
            <span className="text-xs font-semibold text-[#3f4850] bg-[#eaedff] px-2.5 py-0.5 rounded-full font-mono">
              Step 1 of 2
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm md:text-base text-[#131b2e]">
            Locate Practitioner & Configure Role
          </p>
          <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-[#006194] h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
          </div>
        </section>

        {/* Section 1: Practitioner Lookup Form */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
              <Icon name="person_search" className="text-base" />
            </div>
            <div>
              <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                National Registry Search
              </h2>
              <p className="text-xs text-[#3f4850]">Query verified DHA LifeCode, MDCN, or registry email</p>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#131b2e] mb-1.5">
                Registered Email, Phone Number or LifeCode
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] font-mono text-sm rounded-xl pl-11 pr-10 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors border border-[#dae2fd]/60"
                />
                <Icon name="badge" className="text-lg text-[#707881] absolute left-3.5 top-3.5" />
                {identifier && (
                  <button
                    type="button"
                    onClick={() => setIdentifier('')}
                    className="absolute right-3.5 top-3.5 text-[#707881] hover:text-[#131b2e]"
                  >
                    <Icon name="cancel" className="text-base" />
                  </button>
                )}
              </div>
              <p className="text-xs text-[#707881] mt-1.5 flex items-center gap-1 font-mono">
                <Icon name="info" className="text-xs" />
                <span>Alternative: daniel.musa@dha-health.ng</span>
              </p>
            </div>

            <button
              type="button"
              className="w-full h-11 bg-[#86f2e4]/40 text-[#006a61] rounded-xl text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="verified" className="text-lg" />
              <span>Account Found & Verified</span>
            </button>
          </div>
        </section>

        {/* Section 2: Found Practitioner Profile Card */}
        <section className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden">
          <div className="bg-[#006194]/5 p-5 md:p-6 flex flex-col sm:flex-row items-start gap-4 border-b border-[#eaedff]">
            <img
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80"
              alt="Dr. Daniel Musa"
              className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-[#eaedff] shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base md:text-lg text-[#131b2e]">
                  Dr. Daniel Musa
                </h3>
                <span className="text-xs font-semibold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded">
                  BDS (Lagos)
                </span>
              </div>
              <p className="text-xs text-[#3f4850] font-medium mt-0.5">
                Dental Surgeon & Resident Orthodontist
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-mono text-[#707881]">
                <span>LifeCode: <strong className="text-[#131b2e]">{identifier}</strong></span>
                <span>•</span>
                <span>MDCN: <strong className="text-[#131b2e]">#DEN-88210</strong></span>
              </div>
            </div>
          </div>

          <div className="p-4 bg-[#f2f3ff] flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#86f2e4]/40 text-[#006a61] text-xs font-semibold">
              <Icon name="verified" className="text-xs" />
              <span>DHA Certified Clinician</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-[#3f4850] text-xs font-semibold border border-[#dae2fd]">
              <Icon name="security" className="text-xs" />
              <span>Independent Practitioner</span>
            </span>
          </div>
        </section>

        {/* Section 3: Affiliation Parameters Form */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
            <Icon name="settings" className="text-base text-[#006194]" />
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
              Affiliation Parameters
            </h3>
          </div>

          {/* 1. Proposed Role */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">Proposed Clinical Cadre & Role</label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl pl-4 pr-10 border border-[#dae2fd]/60 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors"
              >
                <option value="Specialist Orthodontist & Dental Surgeon">Specialist Orthodontist & Dental Surgeon</option>
                <option value="Lead Restorative Clinician">Lead Restorative Clinician</option>
                <option value="Associate Dental Surgeon">Associate Dental Surgeon</option>
                <option value="Visiting Consultant">Visiting Consultant</option>
              </select>
              <Icon name="expand_more" className="text-lg text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* 2. Primary Facility */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">Primary Clinic Facility</label>
            <div className="relative">
              <select
                value={primaryBranch}
                onChange={(e) => setPrimaryBranch(e.target.value)}
                className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl pl-4 pr-10 border border-[#dae2fd]/60 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors"
              >
                <option value="Harmony Dental Clinic — Wuse 2 Main Branch">Harmony Dental Clinic — Wuse 2 Main Branch</option>
                <option value="Harmony Specialist Dental Centre — Maitama">Harmony Specialist Dental Centre — Maitama</option>
                <option value="Harmony Pediatric Dental Suite — Garki 2">Harmony Pediatric Dental Suite — Garki 2</option>
              </select>
              <Icon name="expand_more" className="text-lg text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* 3. Secondary Branch Checkbox */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#131b2e]">Secondary Roster Access</span>
            <label className="flex items-start gap-3 p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] cursor-pointer select-none transition-colors border border-[#dae2fd]/50">
              <input
                type="checkbox"
                checked={secondaryRoster}
                onChange={(e) => setSecondaryRoster(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-[#006194] focus:ring-0 accent-[#006194]"
              />
              <div className="min-w-0 flex-1">
                <span className="text-xs md:text-sm font-semibold text-[#131b2e] block">
                  Harmony Specialist Dental Centre — Maitama
                </span>
                <span className="text-xs text-[#707881] mt-0.5 block">
                  Authorizes rotational coverage and cross-branch diagnostics
                </span>
              </div>
            </label>
          </div>

          {/* 4. Primary Clinical Duties */}
          <div className="space-y-2">
            <span className="block text-xs font-semibold text-[#131b2e]">Delegated Clinical Duties</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <label className="flex items-center gap-2.5 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/50">
                <input
                  type="checkbox"
                  checked={dutyRestorative}
                  onChange={(e) => setDutyRestorative(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#006194]"
                />
                <span className="text-xs font-medium text-[#131b2e]">General Operatory & Restorative</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/50">
                <input
                  type="checkbox"
                  checked={dutyEmergency}
                  onChange={(e) => setDutyEmergency(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#006194]"
                />
                <span className="text-xs font-medium text-[#131b2e]">Emergency Walk-in Triage</span>
              </label>
              <label className="flex items-center gap-2.5 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/50">
                <input
                  type="checkbox"
                  checked={dutyEndo}
                  onChange={(e) => setDutyEndo(e.target.checked)}
                  className="w-4 h-4 rounded accent-[#006194]"
                />
                <span className="text-xs font-medium text-[#131b2e]">Endodontic Screening</span>
              </label>
            </div>
          </div>

          {/* 5. Invitation Note */}
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#131b2e]">Personalized Invitation Note</label>
            <textarea
              rows={3}
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl p-3.5 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors border border-[#dae2fd]/60 leading-relaxed"
            />
          </div>
        </section>

        {/* Safeguard Advisory Banner */}
        <section className="bg-[#eaedff]/60 rounded-2xl p-5 md:p-6 border border-[#dae2fd] flex items-start gap-4">
          <div className="w-8 h-8 rounded-full bg-[#86f2e4]/40 flex items-center justify-center shrink-0 text-[#006a61] mt-0.5">
            <Icon name="shield" className="text-base" />
          </div>
          <div className="space-y-1 flex-1">
            <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
              Affiliation Safeguard & Credentials Notice
            </h4>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              <strong>Clear distinction:</strong> Dr. Musa's DHA verification is already certified by the Medical and Dental Council of Nigeria. Accepting this invitation connects him to Harmony Dental Group without altering his personal DHA credentials, independent licence autonomy, or historical records.
            </p>
          </div>
        </section>

        {/* Action Triggers */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            disabled={isSending || inviteSent}
            onClick={handleSendInvite}
            className={`w-full h-12 rounded-xl text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
              inviteSent
                ? 'bg-[#006a61]'
                : isSending
                ? 'bg-[#007bb9] opacity-90'
                : 'bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99]'
            }`}
          >
            {isSending ? (
              <>
                <Icon name="progress_activity" className="text-lg animate-spin" />
                <span>Dispatching Affiliation Request...</span>
              </>
            ) : inviteSent ? (
              <>
                <Icon name="check_circle" className="text-lg" />
                <span>Invitation Sent to Dr. Musa!</span>
              </>
            ) : (
              <>
                <Icon name="send" className="text-lg" />
                <span>Send Clinic Affiliation Invitation</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate('/staff-management/add')}
            className="w-full h-11 bg-white text-[#707881] hover:text-[#131b2e] text-xs font-semibold rounded-xl flex items-center justify-center hover:bg-[#f2f3ff] transition-colors border border-[#eaedff]"
          >
            Cancel
          </button>
        </div>
      </main>
    </div>
  );
};
