import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClinicOnboardingShell } from './ClinicOnboardingShell';
import { Icon } from '../../design/Primitives';

export function ProfessionalInvitationScreen() {
  const navigate = useNavigate();

  // Tabs
  const [activeTab, setActiveTab] = useState<'registered' | 'new'>('registered');

  // Tab 1 state
  const [lookupQuery, setLookupQuery] = useState('DEN-94812 (Dr. Daniel James)');
  const [category, setCategory] = useState('Dentist / Specialist');
  const [designation, setDesignation] = useState('Lead Restorative Clinician & Implant Associate');

  // Branch allocations
  const [wuseBranch, setWuseBranch] = useState(true);
  const [garkiBranch, setGarkiBranch] = useState(true);
  const [maitamaBranch, setMaitamaBranch] = useState(false);

  // Privileges
  const [ehrCharting, setEhrCharting] = useState(true);
  const [rxAuthority, setRxAuthority] = useState(true);

  // Tab 2 state
  const [newEmail, setNewEmail] = useState('');
  const [newPhone, setNewPhone] = useState('');

  // Toast
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  const handleSendInvite = () => {
    triggerToast('Secure invitation dispatched to Dr. Daniel James (#DEN-94812)');
  };

  const handleDispatchNewLink = () => {
    if (!newEmail && !newPhone) return;
    triggerToast('Encrypted onboarding pass dispatched via SMS/Email');
    setNewEmail('');
    setNewPhone('');
  };

  const handleContinue = () => {
    navigate('/clinic-onboarding/staff-roles');
  };

  return (
    <ClinicOnboardingShell
      currentStep={15}
      totalSteps={18}
      stepTitle="Staff Invitations"
      stepCategory="Clinical Team Onboarding"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Intro Notice Banner */}
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-outline-variant/30 flex items-start justify-between gap-4 shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary mb-1">
              <Icon name="domain_add" className="text-sm" />
              <span>Greenfield Dental Clinic &bull; Team Onboarding</span>
            </div>
            <h2 className="text-lg sm:text-xl font-heading font-extrabold text-on-surface">
              Invite Clinical &amp; Practice Staff
            </h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Connect licensed dentists, specialists, hygienists, nurses, and administrative officers directly to your clinic roster.
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-xl bg-surface-container-high flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('registered')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'registered'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="badge" className="text-base" />
            <span>Existing DHA Practitioner (#DEN)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`flex-1 py-2.5 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'new'
                ? 'bg-surface-container-lowest text-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Icon name="forward_to_inbox" className="text-base" />
            <span>New / Unregistered Practitioner</span>
          </button>
        </div>

        {activeTab === 'registered' ? (
          <div className="space-y-6">
            {/* Step 1: Identifier Lookup & Match Card */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <label className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                  <Icon name="search" className="text-primary text-base" />
                  <span>Professional Directory Lookup</span>
                </label>
                <span className="font-mono text-[11px] font-bold text-secondary bg-secondary-container/50 px-2 py-0.5 rounded-full">
                  Live DHA Index
                </span>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={lookupQuery}
                  onChange={e => setLookupQuery(e.target.value)}
                  placeholder="Enter DHA ID, Registered Email, or Phone"
                  className="w-full px-3.5 pr-10 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                />
                <Icon name="check_circle" className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary text-lg" />
              </div>

              {/* Resolved Match Card */}
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/30 flex items-start gap-3.5">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-container text-white flex items-center justify-center font-bold text-base shadow-sm shrink-0">
                  DJ
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-heading font-bold text-sm text-on-surface">Dr. Daniel James, DDS</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-secondary text-white">
                      Tier 1 Active
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant">Restorative Odontologist &bull; Reg #DEN-94812</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[11px] text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Icon name="local_hospital" className="text-xs text-primary" /> 9 Yrs Experience
                    </span>
                    <span className="flex items-center gap-1">
                      <Icon name="verified_user" className="text-xs text-secondary" /> MDCN Licence Valid
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Role & Designation */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <Icon name="medical_services" className="text-primary text-base" />
                <h3 className="font-heading font-bold text-sm text-on-surface">Clinical Role &amp; Designation</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Professional Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  >
                    <option value="Dentist / Specialist">Dentist / Specialist</option>
                    <option value="Dental Therapist">Dental Therapist</option>
                    <option value="Dental Hygienist">Dental Hygienist</option>
                    <option value="Dental Nurse">Dental Nurse</option>
                    <option value="Clinic Receptionist">Clinic Receptionist</option>
                    <option value="Practice Administrator">Practice Administrator</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1">Practice Designation</label>
                  <input
                    type="text"
                    value={designation}
                    onChange={e => setDesignation(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs sm:text-sm focus:ring-2 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Multi-Branch Allocation */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                <div className="flex items-center gap-2">
                  <Icon name="apartment" className="text-primary text-base" />
                  <h3 className="font-heading font-bold text-sm text-on-surface">Facility Branch Assignment</h3>
                </div>
                <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {(wuseBranch ? 1 : 0) + (garkiBranch ? 1 : 0) + (maitamaBranch ? 1 : 0)} Selected
                </span>
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={wuseBranch}
                    onChange={e => setWuseBranch(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Wuse 2 Main Branch</span>
                      <span className="font-semibold text-primary">Primary Base</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">Plot 14 Aminu Kano Crescent &bull; Operatory Suites 1-4</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={garkiBranch}
                    onChange={e => setGarkiBranch(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Garki Branch</span>
                      <span className="font-semibold text-secondary">Visiting Specialist</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">Area 11 Medical Hub &bull; Rostered Wed / Thu (09:00 - 15:00)</p>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 cursor-pointer opacity-75">
                  <input
                    type="checkbox"
                    checked={maitamaBranch}
                    onChange={e => setMaitamaBranch(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-on-surface">Maitama Outpost</span>
                      <span className="text-on-surface-variant">Standby</span>
                    </div>
                    <p className="text-[11px] text-on-surface-variant">IBB Way Plaza &bull; General Pediatric Suite</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Clinical Scope & EHR Privileges */}
            <div className="p-5 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm space-y-3">
              <div className="flex items-center gap-2 border-b border-outline-variant/20 pb-2">
                <Icon name="verified_user" className="text-primary text-base" />
                <h3 className="font-heading font-bold text-sm text-on-surface">Clinical Authority &amp; EHR Privileges</h3>
              </div>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer">
                  <input
                    type="checkbox"
                    checked={ehrCharting}
                    onChange={e => setEhrCharting(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-bold text-on-surface block">Grant Encounter EHR &amp; Odontogram Charting Access</span>
                    <span className="text-[11px] text-on-surface-variant">Authorizes real-time adult/pediatric tooth status records, periodontal charting, and radiograph notes.</span>
                  </div>
                </label>

                <label className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rxAuthority}
                    onChange={e => setRxAuthority(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-primary"
                  />
                  <div>
                    <span className="font-bold text-on-surface block">Allow Treatment Plan Formulation &amp; Digital Prescriptions</span>
                    <span className="text-[11px] text-on-surface-variant">Permits clinical sign-off for restorative procedures, dental pharmacotherapy, and lab orders.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Dispatch Preview Card */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 via-surface-container to-secondary/10 border border-primary/20 space-y-1.5">
              <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                <Icon name="drafts" className="text-sm" />
                <span>Formal Dispatch Preview</span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                Invitation to <strong className="text-primary">Dr. Daniel James</strong> to join <strong className="text-on-surface">Greenfield Dental Clinic</strong> as <span className="font-medium text-on-surface-variant">Lead Restorative Clinician &amp; Implant Associate</span> across 2 branches.
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3">
              <button
                type="button"
                onClick={handleSendInvite}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary text-white font-heading font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2"
              >
                <span>Send Practice Invitation</span>
                <Icon name="send" className="text-base" />
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-secondary-container text-on-secondary-container font-heading font-semibold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Staff &amp; Role Assignment (15.16)</span>
                <Icon name="arrow_forward" className="text-base" />
              </button>
            </div>
          </div>
        ) : (
          /* Tab 2: New Practitioner */
          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-secondary-container/60 text-secondary mx-auto flex items-center justify-center">
              <Icon name="mail_lock" className="text-2xl" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-on-surface">Unregistered Practitioner Onboarding</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto mt-1">
                Issue an encrypted SMS &amp; Email onboarding pass. The recipient will complete MDCN credential verification during their guided DHA account setup.
              </p>
            </div>

            <div className="max-w-md mx-auto space-y-3 text-left">
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Practitioner Email</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={e => setNewEmail(e.target.value)}
                  placeholder="e.g. dr.salisu@clinicmail.ng"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1">Mobile Phone (for Instant WhatsApp / SMS Pass)</label>
                <input
                  type="tel"
                  value={newPhone}
                  onChange={e => setNewPhone(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-outline-variant bg-surface text-xs focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleDispatchNewLink}
                className="w-full py-3 rounded-xl bg-secondary text-white font-heading font-semibold text-xs hover:bg-secondary/90 transition-all shadow-md shadow-secondary/20 flex items-center justify-center gap-2 mt-2"
              >
                <span>Dispatch Direct Onboarding Link</span>
                <Icon name="arrow_forward" className="text-base" />
              </button>
            </div>
          </div>
        )}

        {/* Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl text-xs font-semibold shadow-xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
            <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
              <Icon name="mark_email_read" className="text-sm" />
            </div>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </ClinicOnboardingShell>
  );
}
