import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ContactMethod = 'email' | 'phone';

export const InviteNewStaffScreen: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('Amina Yusuf');
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [contactValue, setContactValue] = useState('amina.yusuf@gmail.com');
  const [category, setCategory] = useState('Nursing & Hygiene');
  const [role, setRole] = useState('Registered Dental Hygienist');
  const [branch, setBranch] = useState('Wuse 2 Main Branch');
  const [privilegeSchedule, setPrivilegeSchedule] = useState(true);
  const [privilegeRecords, setPrivilegeRecords] = useState(true);
  const [privilegeInventory, setPrivilegeInventory] = useState(false);
  const [welcomeNote, setWelcomeNote] = useState(
    'Dear Amina, Welcome to Harmony Dental Group! You have been nominated to join our clinic team as a Registered Dental Hygienist. Please follow the link below to initialize your DHA account.'
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleContactMethodChange = (method: ContactMethod) => {
    setContactMethod(method);
    if (method === 'email') {
      setContactValue('amina.yusuf@gmail.com');
    } else {
      setContactValue('+234 803 456 7890');
    }
  };

  const handleSend = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessToast(true);
      setTimeout(() => {
        setShowSuccessToast(false);
        navigate('/staff-management/directory');
      }, 2000);
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
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Progress Header Indicator */}
        <section className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase font-bold tracking-wider text-[#006194]">
              New Staff Invitation Wizard
            </span>
            <span className="text-xs font-semibold text-[#3f4850] bg-[#eaedff] px-2.5 py-0.5 rounded-full font-mono">
              Step 1 of 2
            </span>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] font-bold text-sm md:text-base text-[#131b2e]">
            Personnel Profile & Invitation Parameters
          </p>
          <div className="w-full bg-[#eaedff] h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-[#006194] h-full rounded-full transition-all duration-500" style={{ width: '50%' }}></div>
          </div>
        </section>

        {/* Regulatory Advisory Banner */}
        <div className="bg-[#eaedff]/60 rounded-2xl p-5 md:p-6 border border-[#dae2fd] flex items-start gap-4">
          <div className="w-9 h-9 rounded-full bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="verified_user" className="text-lg" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                Secure DHA Authorization
              </span>
              <span className="text-[10px] bg-[#cce5ff] text-[#006194] px-2 py-0.5 rounded-md font-bold uppercase">
                MDCN Standard
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              The invited personnel member will receive a secure DHA invitation link to create their account. For clinical roles, statutory MDCN verification is required before clinical chart access is unlocked.
            </p>
          </div>
        </div>

        {/* Form and Live Preview Grid (1 col on mobile, 2 col on large desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Form (7 cols on desktop) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
              <Icon name="person_add" className="text-base text-[#006194]" />
              <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                Personnel Details & Access
              </h3>
            </div>

            {/* Personnel Full Name */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-semibold text-[#131b2e]">Personnel Full Name</label>
                <span className="text-[11px] text-[#006194] font-medium">Legal ID Name</span>
              </div>
              <div className="relative">
                <Icon name="person" className="text-lg text-[#707881] absolute left-3.5 top-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full h-12 pl-11 pr-4 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl border border-[#dae2fd]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors"
                />
              </div>
            </div>

            {/* Official Contact Channel */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#131b2e]">Official Contact Information</label>
              <div className="grid grid-cols-2 p-1 bg-[#eaedff] rounded-xl text-center">
                <button
                  type="button"
                  onClick={() => handleContactMethodChange('email')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    contactMethod === 'email'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="mail" className="text-sm" />
                  <span>Email Address</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleContactMethodChange('phone')}
                  className={`py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    contactMethod === 'phone'
                      ? 'bg-white text-[#006194] shadow-xs'
                      : 'text-[#3f4850] hover:text-[#131b2e]'
                  }`}
                >
                  <Icon name="phone_iphone" className="text-sm" />
                  <span>Phone Number</span>
                </button>
              </div>

              <div className="relative">
                <Icon
                  name={contactMethod === 'email' ? 'alternate_email' : 'phone_iphone'}
                  className="text-lg text-[#707881] absolute left-3.5 top-3.5 pointer-events-none"
                />
                <input
                  type={contactMethod === 'email' ? 'email' : 'tel'}
                  value={contactValue}
                  onChange={(e) => setContactValue(e.target.value)}
                  className="w-full h-12 pl-11 pr-4 bg-[#f2f3ff] text-[#131b2e] font-mono text-xs md:text-sm rounded-xl border border-[#dae2fd]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors"
                />
              </div>
            </div>

            {/* Operational Category & Proposed Role */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]">Operational Category</label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs rounded-xl pl-3 pr-8 border border-[#dae2fd]/60 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]"
                  >
                    <option value="Clinical Dental Team">Clinical Dental Team</option>
                    <option value="Nursing & Hygiene">Nursing & Hygiene</option>
                    <option value="Front Office & Reception">Front Office & Reception</option>
                    <option value="Clinic Management">Clinic Management</option>
                    <option value="Facility & Dental Tech">Facility & Dental Tech</option>
                  </select>
                  <Icon name="expand_more" className="text-base text-[#707881] absolute right-2.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-[#131b2e]">Proposed Staff Role</label>
                <div className="relative">
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs rounded-xl pl-3 pr-8 border border-[#dae2fd]/60 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]"
                  >
                    <option value="Registered Dental Hygienist">Registered Dental Hygienist</option>
                    <option value="Chairside Dental Nurse">Chairside Dental Nurse</option>
                    <option value="Clinic Front Desk Executive">Clinic Front Desk Executive</option>
                    <option value="Dental Surgeon Intern">Dental Surgeon Intern</option>
                  </select>
                  <Icon name="expand_more" className="text-base text-[#707881] absolute right-2.5 top-3.5 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Primary Branch Assignment */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#131b2e]">Branch Assignment</label>
              <div className="relative">
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full h-12 bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl pl-4 pr-10 border border-[#dae2fd]/60 appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]"
                >
                  <option value="Wuse 2 Main Branch">Wuse 2 Main Branch</option>
                  <option value="Maitama Specialist Hub">Maitama Specialist Hub</option>
                  <option value="Gwarinpa Dental Outpost">Gwarinpa Dental Outpost</option>
                </select>
                <Icon name="expand_more" className="text-base text-[#707881] absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>

            {/* Assigned Privileges */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-[#131b2e]">Assigned Privileges & Scope</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/40">
                  <input
                    type="checkbox"
                    checked={privilegeSchedule}
                    onChange={(e) => setPrivilegeSchedule(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#006194]"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#131b2e] block">Schedule & Appointments Management</span>
                    <span className="text-[11px] text-[#707881]">Allows booking, rescheduling and chair allocation</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/40">
                  <input
                    type="checkbox"
                    checked={privilegeRecords}
                    onChange={(e) => setPrivilegeRecords(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#006194]"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#131b2e] block">Medical Records & Odontogram</span>
                    <span className="text-[11px] text-[#006a61] font-medium">Statutory Verification Required</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 bg-[#f2f3ff] rounded-xl cursor-pointer hover:bg-[#eaedff] transition-colors border border-[#dae2fd]/40">
                  <input
                    type="checkbox"
                    checked={privilegeInventory}
                    onChange={(e) => setPrivilegeInventory(e.target.checked)}
                    className="w-4 h-4 rounded accent-[#006194]"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-medium text-[#131b2e] block">Inventory & Supply Dispensation</span>
                    <span className="text-[11px] text-[#707881]">Material tracking and instrument restocking</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Custom Welcome Message */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-[#131b2e]">Custom Welcome Message</label>
              <textarea
                rows={3}
                value={welcomeNote}
                onChange={(e) => setWelcomeNote(e.target.value)}
                className="w-full bg-[#f2f3ff] text-[#131b2e] text-xs md:text-sm rounded-xl p-3.5 border border-[#dae2fd]/60 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194] transition-colors leading-relaxed"
              />
            </div>
          </div>

          {/* Live Recipient Email Preview (5 cols on desktop) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="preview" className="text-base text-[#006a61]" />
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
                    Live Recipient Email Preview
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#006a61] bg-[#86f2e4]/30 px-2 py-0.5 rounded-full font-bold">
                  Interactive
                </span>
              </div>

              {/* Email Container */}
              <div className="bg-[#f2f3ff] rounded-2xl p-5 border border-[#dae2fd] space-y-4 shadow-inner">
                {/* Email Header */}
                <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
                      DHA
                    </div>
                    <span className="text-xs font-semibold text-[#131b2e]">Dental Health App</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#707881]">Security Mailer</span>
                </div>

                {/* Email Body */}
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[#131b2e] block">
                    Harmony Dental Group has invited you to join on DHA
                  </span>

                  <p className="text-xs text-[#3f4850] leading-relaxed">
                    Hello <strong className="text-[#131b2e]">{fullName || 'Personnel Member'}</strong>,
                  </p>

                  <p className="text-xs text-[#3f4850] leading-relaxed">
                    Dr. Sarah Okafor has invited you to join <strong>Harmony Dental Group</strong> as a <strong>{role}</strong> at <strong>{branch}</strong>.
                  </p>

                  <div className="p-3 bg-white rounded-xl border border-[#dae2fd] text-xs text-[#3f4850] italic">
                    "{welcomeNote}"
                  </div>

                  {/* Accept CTA Button inside email */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      disabled
                      className="w-full py-2.5 bg-[#006194] text-white rounded-xl text-xs font-semibold shadow-xs"
                    >
                      Accept & Create DHA Account
                    </button>
                    <span className="text-[10px] text-[#707881] block mt-1">
                      Link valid for 7 days. Token: #DHA-INV-2026-X992
                    </span>
                  </div>
                </div>

                {/* Email Footer with 256-bit Token badge */}
                <div className="flex items-center justify-between pt-3 border-t border-[#dae2fd] text-[11px] text-[#707881]">
                  <div className="flex items-center gap-1.5 text-[#006a61]">
                    <Icon name="encrypted" className="text-xs" />
                    <span>256-Bit Protected</span>
                  </div>
                  <span className="text-[#006194] font-medium">Official Invite</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSend}
                className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-['Plus_Jakarta_Sans'] text-xs md:text-sm font-semibold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Icon name="progress_activity" className="text-lg animate-spin" />
                    <span>Validating MDCN Registry & Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Review & Send Invitation</span>
                    <Icon name="arrow_forward" className="text-lg" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm('Discard this staff invitation draft? All entered assignments will be lost.')) {
                    navigate('/staff-management/add');
                  }
                }}
                className="w-full h-11 bg-white hover:bg-[#f2f3ff] text-[#707881] hover:text-[#131b2e] text-xs font-semibold rounded-xl transition-colors border border-[#eaedff]"
              >
                Cancel & Discard
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl text-xs flex items-center gap-3 border border-white/10 animate-fade-in">
          <div className="w-6 h-6 rounded-full bg-[#006a61] flex items-center justify-center text-white">
            <Icon name="check" className="text-sm" />
          </div>
          <div>
            <span className="font-semibold block text-white">Invitation Dispatched!</span>
            <span className="text-white/80 text-[11px]">Invitation sent to {contactValue}</span>
          </div>
        </div>
      )}
    </div>
  );
};
