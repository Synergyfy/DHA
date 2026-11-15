import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type EntryTab = 'existing' | 'new';
type UrgencyTier = 'routine' | 'priority' | 'emergency';

export const WalkInPatientRegistrationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<EntryTab>('existing');
  const [searchQuery, setSearchQuery] = useState('NG-ABJ-771-402');
  const [urgencyTier, setUrgencyTier] = useState<UrgencyTier>('emergency');
  const [chiefComplaint, setChiefComplaint] = useState('Severe Toothache / Emergency Pain Relief');
  const [assignedClinician, setAssignedClinician] = useState(
    'First Available On-Duty (Dr. Daniel Okoro or Dr. Sarah Bello)'
  );
  const [receptionNotes, setReceptionNotes] = useState(
    'Arrived unannounced at 09:12 AM. Pain level 7/10. Administered ice pack chairside.'
  );
  const [consentChecked, setConsentChecked] = useState(true);
  const [isDispatching, setIsDispatching] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleDispatchTicket = () => {
    if (!consentChecked) {
      showToast('Please confirm patient identity & consent verification.');
      return;
    }
    setIsDispatching(true);
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatched(true);
      showToast('Ticket Q-05 printed and added to live queue!');
      setTimeout(() => {
        navigate('/clinic-operations/walk-in-queue');
      }, 1200);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in border border-white/10">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-4xl mx-auto h-14 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              aria-label="Go back"
              className="w-10 h-10 -ml-1 flex items-center justify-center rounded-xl text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-[20px]" />
            </button>
            <h1 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
              Walk In Registration
            </h1>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => showToast('More actions opened')}
              className="w-10 h-10 rounded-xl hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
            >
              <Icon name="more_vert" className="text-[22px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs shadow-xs">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-4 pb-20">
        {/* Live Branch & Clinic Queue Metric Pill */}
        <div className="mb-4">
          <div className="flex items-center justify-between bg-[#e2e7ff] rounded-full px-4 py-2 shadow-xs flex-wrap gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006a61] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#006a61]" />
              </span>
              <span className="text-xs font-semibold text-[#131b2e] truncate">Wuse 2 Main Branch</span>
            </div>
            <div className="flex items-center gap-1.5 shrink-0 bg-white px-3 py-1 rounded-full shadow-xs">
              <Icon name="people" className="text-[#006194] text-[16px]" />
              <span className="font-mono text-xs text-[#006194] font-bold">Active Queue: 5 in lounge</span>
            </div>
          </div>
        </div>

        {/* Dual Entry Mode Switcher */}
        <div className="mb-4 bg-[#eaedff] p-1 rounded-2xl flex items-center justify-between shadow-xs">
          <button
            type="button"
            onClick={() => setActiveTab('existing')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'existing'
                ? 'bg-white text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="verified_user" className="text-[18px]" />
            <span>Existing DHA Patient</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'new'
                ? 'bg-white text-[#006194] shadow-sm'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="person_add" className="text-[18px]" />
            <span>New Patient Intake</span>
          </button>
        </div>

        {/* Search & Patient Identification Section */}
        <div className="mb-4">
          <label className="block text-xs sm:text-sm font-bold text-[#131b2e] mb-1.5">
            Patient Quick Lookup
          </label>
          <div className="relative flex items-center">
            <Icon
              name="search"
              className="absolute left-3.5 text-[#707881] text-[20px] pointer-events-none"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search LifeCode, Phone, or Full Name..."
              className="w-full h-12 pl-11 pr-11 bg-white border border-[#bfc7d2]/60 rounded-xl text-sm font-medium text-[#131b2e] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006194]"
            />
            <Icon name="check_circle" className="absolute right-3.5 text-[#006a61] text-[20px]" />
          </div>
        </div>

        {/* Resolved Patient Dossier Card */}
        <div className="mb-5 bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-3">
          <div className="flex items-start gap-3.5">
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-bold text-lg shadow-sm ring-4 ring-[#f2f3ff]">
                FG
              </div>
              <span className="absolute -bottom-1 -right-1 bg-[#006a61] text-white rounded-full p-1 flex items-center justify-center shadow-xs">
                <Icon name="verified" className="text-[12px]" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <h2 className="text-base sm:text-lg font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                  Fatima Garba
                </h2>
                <span className="text-xs bg-[#e2e7ff] text-[#006194] px-2.5 py-0.5 rounded-full font-semibold">
                  29y • Female
                </span>
              </div>
              <p className="font-mono text-xs text-[#006194] font-bold mt-0.5">
                LifeCode: NG-ABJ-771-402
              </p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-[#3f4850] flex-wrap">
                <Icon name="call" className="text-[14px] text-[#707881]" />
                <span>+234 812 400 9182</span>
                <span className="text-[#bfc7d2]">•</span>
                <span className="font-mono text-[#707881]">MRN-2026-08812</span>
              </div>
            </div>
          </div>

          {/* Emergency Triage Alert Micro */}
          <div className="bg-[#ffdad6]/60 border border-[#ffdad6] rounded-xl p-3 flex items-center gap-2.5">
            <Icon name="report_problem" className="text-[#ba1a1a] text-[20px] shrink-0 animate-pulse" />
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-mono text-[#93000a] uppercase tracking-wider font-bold">
                Triage Alert
              </p>
              <p className="text-xs sm:text-sm text-[#131b2e] truncate font-semibold">
                Acute Toothache &amp; Localized Swelling (Tooth #14)
              </p>
            </div>
          </div>
        </div>

        {/* Walk-in Visit Details Form */}
        <div className="flex flex-col gap-4">
          {/* Clinical Urgency Tier */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e]">
                Clinical Urgency Tier
              </label>
              <span className="text-xs text-[#ba1a1a] font-bold">Acute Protocol Active</span>
            </div>

            {/* 3-Tier Selector Grid */}
            <div className="grid grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setUrgencyTier('routine')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  urgencyTier === 'routine'
                    ? 'bg-[#006194] text-white border-transparent shadow-md ring-2 ring-[#006194]'
                    : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] border-[#dae2fd]/60'
                }`}
              >
                <Icon
                  name="hourglass_empty"
                  className={`text-[20px] mb-1 ${urgencyTier === 'routine' ? 'text-white' : 'text-[#707881]'}`}
                />
                <span className="text-xs font-bold leading-tight">Routine</span>
                <span className="text-[10px] opacity-80 mt-0.5">Non-urgent</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgencyTier('priority')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  urgencyTier === 'priority'
                    ? 'bg-[#006194] text-white border-transparent shadow-md ring-2 ring-[#006194]'
                    : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] border-[#dae2fd]/60'
                }`}
              >
                <Icon
                  name="low_priority"
                  className={`text-[20px] mb-1 ${urgencyTier === 'priority' ? 'text-white' : 'text-[#006194]'}`}
                />
                <span className="text-xs font-bold leading-tight">Priority</span>
                <span className="text-[10px] opacity-80 mt-0.5">Consultation</span>
              </button>

              <button
                type="button"
                onClick={() => setUrgencyTier('emergency')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  urgencyTier === 'emergency'
                    ? 'bg-[#ba1a1a] text-white border-transparent shadow-md ring-2 ring-[#ba1a1a]'
                    : 'bg-[#ffdad6]/40 hover:bg-[#ffdad6]/70 text-[#93000a] border-[#ffdad6]'
                }`}
              >
                <Icon name="emergency" className="text-[20px] mb-1 text-white" />
                <span className="text-xs font-bold leading-tight">Emergency</span>
                <span className="text-[10px] opacity-90 mt-0.5">Direct Triage</span>
              </button>
            </div>
          </div>

          {/* Chief Complaint & Clinician */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#131b2e] mb-1.5">
                Chief Complaint
              </label>
              <div className="relative flex items-center">
                <Icon
                  name="sentiment_very_dissatisfied"
                  className="absolute left-3.5 text-[#ba1a1a] text-[20px] pointer-events-none"
                />
                <select
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  className="w-full h-12 pl-11 pr-9 bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl text-xs sm:text-sm font-semibold text-[#131b2e] shadow-xs focus:outline-none appearance-none cursor-pointer"
                >
                  <option>Severe Toothache / Emergency Pain Relief</option>
                  <option>Fractured / Knocked Out Tooth (Trauma)</option>
                  <option>Post-Operative Bleeding &amp; Infection</option>
                  <option>Loose Crown / Dislodged Restoration</option>
                  <option>Gingival Abscess / Facial Asymmetry</option>
                </select>
                <Icon
                  name="expand_more"
                  className="absolute right-3.5 text-[#707881] text-[20px] pointer-events-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#131b2e] mb-1.5">
                Assigned Clinician
              </label>
              <div className="relative flex items-center">
                <Icon
                  name="medical_services"
                  className="absolute left-3.5 text-[#006194] text-[20px] pointer-events-none"
                />
                <select
                  value={assignedClinician}
                  onChange={(e) => setAssignedClinician(e.target.value)}
                  className="w-full h-12 pl-11 pr-9 bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl text-xs sm:text-sm font-semibold text-[#131b2e] shadow-xs focus:outline-none appearance-none cursor-pointer"
                >
                  <option>First Available On-Duty (Dr. Daniel Okoro or Dr. Sarah Bello)</option>
                  <option>Dr. Daniel Okoro, DDS (General &amp; Endodontics)</option>
                  <option>Dr. Sarah Bello, BDS (Maxillofacial Surgery)</option>
                  <option>Dr. Chuka Obi, MSc (Oral Pathology)</option>
                </select>
                <Icon
                  name="expand_more"
                  className="absolute right-3.5 text-[#707881] text-[20px] pointer-events-none"
                />
              </div>
            </div>

            {/* Care Team Pairing Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#86f2e4] text-[#006f66] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="stethoscope" className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase text-[#707881] block">Triage Nurse</span>
                  <span className="text-sm font-bold text-[#131b2e] truncate block">Nurse Zainab T.</span>
                  <span className="text-xs text-[#006a61] font-medium">RN (IPC Certified)</span>
                </div>
              </div>

              <div className="bg-[#f2f3ff] rounded-xl p-3 border border-[#dae2fd]/60 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0 mt-0.5">
                  <Icon name="airline_seat_recline_extra" className="text-[18px]" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-mono uppercase text-[#707881] block">Target Station</span>
                  <span className="text-sm font-bold text-[#131b2e] truncate block">Triage Chair 01</span>
                  <span className="text-xs text-[#006194] font-medium">Operatory 02</span>
                </div>
              </div>
            </div>
          </div>

          {/* Live Ticket Generation Preview Bento */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#f2f3ff] pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <Icon name="confirmation_number" className="text-[#006194] text-[20px]" />
                <span className="text-xs font-bold text-[#131b2e] uppercase tracking-wider">
                  Live Ticket Preview
                </span>
              </div>
              <span className="font-mono text-xs bg-[#ffdad6] text-[#93000a] font-bold px-2.5 py-0.5 rounded-full">
                PRIORITY EMERGENCY
              </span>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <span className="text-xs text-[#707881] uppercase block font-semibold">Assigned Ticket</span>
                <div className="text-4xl sm:text-5xl font-black font-['Plus_Jakarta_Sans'] text-[#006194] leading-tight">
                  Q-05
                </div>
                <span className="text-xs sm:text-sm text-[#3f4850]">
                  Position: <strong className="text-[#131b2e] font-bold">#3 in Waiting Queue</strong>
                </span>
              </div>

              <div className="flex flex-col items-end text-right">
                <div className="relative w-14 h-14 flex items-center justify-center mb-1">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-[#dae2fd]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                    />
                    <path
                      className="text-[#006a61]"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="75, 100"
                      strokeLinecap="round"
                      strokeWidth="3.5"
                    />
                  </svg>
                  <span className="absolute font-mono text-xs font-bold text-[#131b2e]">14m</span>
                </div>
                <span className="text-xs font-bold text-[#131b2e]">Est. Wait: 12-15m</span>
                <span className="text-[11px] text-[#006a61] font-semibold">Bypasses standard 45m line</span>
              </div>
            </div>
          </div>

          {/* Front-Desk Reception Notes */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs sm:text-sm font-bold text-[#131b2e]">
                Reception &amp; Triage Notes
              </label>
              <span className="text-xs text-[#707881]">Logged 09:14 AM</span>
            </div>
            <textarea
              value={receptionNotes}
              onChange={(e) => setReceptionNotes(e.target.value)}
              rows={2}
              className="w-full p-3 bg-[#f2f3ff] border border-[#dae2fd]/60 rounded-xl text-xs sm:text-sm text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none"
            />
          </div>

          {/* Patient Identity Verification & Consent Confirmation */}
          <label className="flex items-start gap-3 p-4 bg-white border border-[#dae2fd]/60 rounded-2xl shadow-sm cursor-pointer select-none">
            <input
              type="checkbox"
              checked={consentChecked}
              onChange={(e) => setConsentChecked(e.target.checked)}
              className="mt-0.5 w-4 h-4 text-[#006194] rounded border-[#bfc7d2] focus:ring-[#006194] shrink-0"
            />
            <span className="text-xs sm:text-sm text-[#131b2e] leading-snug">
              Patient identity verified via biometric/photo ID match and informed verbal consent obtained for acute walk-in triage examination.
            </span>
          </label>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              disabled={isDispatching}
              onClick={handleDispatchTicket}
              className={`w-full h-12 rounded-xl text-white font-bold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-2 ${
                isDispatched
                  ? 'bg-[#006a61]'
                  : 'bg-[#006194] hover:bg-[#007bb9]'
              }`}
            >
              {isDispatching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Printing Ticket &amp; Paging Operatory...</span>
                </>
              ) : isDispatched ? (
                <>
                  <Icon name="check" className="text-[20px]" />
                  <span>Q-05 Enqueued Successfully</span>
                </>
              ) : (
                <>
                  <Icon name="assignment_turned_in" className="text-[20px]" />
                  <span>Assign Ticket Q-05 &amp; Add to Queue</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-2.5 text-center text-xs sm:text-sm font-semibold text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] rounded-xl transition-colors"
            >
              Cancel Walk-in Registration
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
