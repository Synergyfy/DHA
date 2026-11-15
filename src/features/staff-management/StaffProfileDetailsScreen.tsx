import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ProfileTab = 'overview' | 'contact' | 'licensure' | 'branches' | 'roles' | 'activity';

export const StaffProfileDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<ProfileTab>('overview');
  const [showSuspendModal, setShowSuspendModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const staffId = id || 'STF-ADE-01';

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base md:text-lg truncate">
              Staff Profile Details
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Profile actions menu opened')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white ml-1">
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Verified Practitioner Hero Card */}
        <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-[#eaedff] overflow-hidden flex flex-col gap-6">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#86f2e4]/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col sm:flex-row sm:items-start gap-5 relative z-10">
            <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=200&auto=format&fit=crop&q=80"
                alt="Dr. Michael Adeyemi"
                className="w-full h-full rounded-2xl object-cover shadow-sm ring-2 ring-[#eaedff]"
              />
              <div className="absolute -bottom-1.5 -right-1.5 bg-[#006a61] text-white p-1 rounded-full shadow-sm flex items-center justify-center">
                <Icon name="verified" className="text-sm" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-xl md:text-2xl text-[#131b2e]">
                  Dr. Michael Adeyemi
                </h2>
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded-md">
                  DDS
                </span>
              </div>
              <p className="text-sm text-[#3f4850] font-medium mt-1">
                Lead Restorative Dentist & Head of Prosthodontics
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-mono text-xs text-[#006194] font-semibold tracking-wider bg-[#f2f3ff] px-2 py-0.5 rounded">
                  #{staffId}
                </span>
                <span className="text-xs text-[#707881] font-mono">• Abuja Central Division</span>
              </div>
            </div>

            {/* Direct Quick Actions for large screen */}
            <div className="hidden sm:flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => triggerToast('Direct message channel opened with Dr. Adeyemi.')}
                className="px-3.5 py-2 bg-[#006194] text-white rounded-xl text-xs font-semibold hover:bg-[#007bb9] transition-colors flex items-center gap-1.5"
              >
                <Icon name="chat" className="text-sm" />
                <span>Message</span>
              </button>
              <button
                type="button"
                onClick={() => triggerToast('Exporting credential passport PDF...')}
                className="px-3 py-2 bg-[#f2f3ff] text-[#3f4850] rounded-xl text-xs font-medium hover:bg-[#eaedff] transition-colors flex items-center gap-1"
              >
                <Icon name="badge" className="text-sm" />
                <span>Passport</span>
              </button>
            </div>
          </div>

          {/* Dual Status Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#eaedff]">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006a61]">
              <Icon name="verified_user" className="text-sm" />
              <span className="text-xs font-bold uppercase tracking-wider">DHA Verified Clinician</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-[#131b2e]">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-semibold uppercase tracking-wider">Active Affiliation</span>
            </div>
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#eaedff] text-[#3f4850] text-xs font-mono">
              <Icon name="schedule" className="text-xs" />
              <span>Shift: 08:00 – 17:00</span>
            </div>
          </div>

          {/* Reporting Hierarchy */}
          <div className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col gap-2 border border-[#dae2fd]/60">
            <div className="flex items-center gap-2 text-[#3f4850]">
              <Icon name="account_tree" className="text-base text-[#006194]" />
              <span className="text-xs font-bold uppercase tracking-wider">Reporting Hierarchy</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-2 text-xs">
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-[#dae2fd]/40">
                <span className="text-[#131b2e] font-semibold">Dr. Sarah Okafor</span>
                <span className="text-[#006a61] font-mono">Clinical Director</span>
              </div>
              <div className="flex items-center justify-between bg-white px-3 py-2 rounded-lg border border-[#dae2fd]/40">
                <span className="text-[#131b2e] font-semibold">Samuel Eze</span>
                <span className="text-[#006194] font-mono">Clinic Manager</span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'overview'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'contact'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Personal & Contact
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('licensure')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'licensure'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Professional Licensure
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('branches')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'branches'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Branches & Duties
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'roles'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Role & Permissions
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('activity')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
              activeTab === 'activity'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
            }`}
          >
            Activity History
          </button>
        </div>

        {/* Tab Panel Content: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Grid 2-col on desktop: Contact & Licensure */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Direct Connectivity Card */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between gap-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                      <Icon name="contact_phone" className="text-base" />
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                      Direct Connectivity
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider bg-[#86f2e4]/30 px-2.5 py-0.5 rounded-full">
                    2y 9m Tenure
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon name="mail" className="text-lg text-[#3f4850]" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono uppercase text-[#707881]">Work Email</span>
                        <span className="text-xs text-[#131b2e] font-medium truncate">m.adeyemi@harmonydental.ng</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => triggerToast('Copied email to clipboard')}
                      className="p-1.5 text-[#006194] hover:bg-white rounded-lg transition-colors"
                      title="Copy Email"
                    >
                      <Icon name="content_copy" className="text-sm" />
                    </button>
                  </div>

                  <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl">
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon name="phone_in_talk" className="text-lg text-[#3f4850]" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[10px] font-mono uppercase text-[#707881]">Registered Contact</span>
                        <span className="text-xs text-[#131b2e] font-medium">+234 803 555 0192</span>
                      </div>
                    </div>
                    <a
                      href="tel:+2348035550192"
                      className="p-1.5 text-[#006a61] hover:bg-white rounded-lg transition-colors"
                      title="Call Clinician"
                    >
                      <Icon name="call" className="text-sm" />
                    </a>
                  </div>

                  <div className="flex items-center justify-between px-2 pt-1 text-xs text-[#3f4850]">
                    <span>Official Commencement</span>
                    <span className="font-semibold text-[#131b2e]">14 Jan 2024</span>
                  </div>
                </div>
              </div>

              {/* Professional Credentials & Licensing */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] flex flex-col justify-between gap-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                    <Icon name="medical_services" className="text-base" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                    Statutory Credentialing
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#f2f3ff] p-3 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-[#707881]">Clinical Cadre</span>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e] mt-0.5">Dental Surgeon</p>
                    <span className="text-xs text-[#006a61] font-medium">Restorative Lead</span>
                  </div>
                  <div className="bg-[#f2f3ff] p-3 rounded-xl">
                    <span className="text-[10px] font-mono uppercase text-[#707881]">MDCN License</span>
                    <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs text-[#131b2e] mt-0.5">#DEN-78421</p>
                    <span className="text-xs text-[#006194] font-medium">Valid thru Nov '27</span>
                  </div>
                </div>

                <div className="bg-[#eaedff] p-3 rounded-xl border border-[#dae2fd] flex items-start gap-2.5">
                  <Icon name="verified" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#3f4850] leading-relaxed">
                    National MDCN registry synchronization confirmed. Prescribing privileges and surgical consent authority active.
                  </p>
                </div>
              </div>
            </div>

            {/* Clinical Deployments & Scope (2-col) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Deployments */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                      <Icon name="apartment" className="text-base" />
                    </div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                      Clinical Deployments
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-[#006194] font-semibold">2 Active Facilities</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1 border border-[#dae2fd]/40">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#131b2e]">Wuse 2 Main Branch</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#86f2e4]/40 text-[#006a61] text-[10px] font-mono font-bold uppercase">
                        Primary
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#3f4850] text-xs">
                      <Icon name="chair" className="text-sm text-[#006194]" />
                      <span>Operatory Suite 01 • Mon – Fri (Full Care)</span>
                    </div>
                  </div>

                  <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-1 border border-[#dae2fd]/40">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-[#131b2e]">Maitama Specialist Outpost</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[10px] font-mono font-bold uppercase">
                        Rotational
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#3f4850] text-xs">
                      <Icon name="calendar_month" className="text-sm text-[#006194]" />
                      <span>Wednesday Afternoon Specialty Sessions</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Standing Scope & Duties */}
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-[#eaedff]">
                  <div className="w-8 h-8 rounded-lg bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                    <Icon name="assignment_turned_in" className="text-base" />
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                    Standing Scope & Duties
                  </h3>
                </div>

                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <Icon name="task_alt" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#131b2e] leading-relaxed">
                      Direct Composite Restorations & Prosthodontic Handover Protocol
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="task_alt" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#131b2e] leading-relaxed">
                      Sterilization Protocol Verification (Lead Restorative Suite)
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Icon name="task_alt" className="text-base text-[#006a61] shrink-0 mt-0.5" />
                    <span className="text-xs text-[#131b2e] leading-relaxed">
                      Clinical Mentorship of Resident Junior Dentists & Interns
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Administrative Operations Section */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <Icon name="admin_panel_settings" className="text-base text-[#006194]" />
                  <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                    Administrative Actions
                  </h4>
                </div>
                <span className="text-xs font-mono text-[#707881]">Level 3 Governance</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* Change Role */}
                <button
                  type="button"
                  onClick={() => navigate('/staff-management/role-assignment')}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="manage_accounts" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#131b2e]">Change Role</span>
                  <span className="text-[10px] font-mono text-[#707881]">Sec. 17.9</span>
                </button>

                {/* Permissions */}
                <button
                  type="button"
                  onClick={() => navigate('/staff-management/permissions')}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006194] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="key" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#131b2e]">Permissions</span>
                  <span className="text-[10px] font-mono text-[#707881]">Sec. 17.14</span>
                </button>

                {/* Transfer Branch */}
                <button
                  type="button"
                  onClick={() => navigate('/staff-management/branch-assignment')}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006a61] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="move_up" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#131b2e]">Transfer</span>
                  <span className="text-[10px] font-mono text-[#707881]">Sec. 17.15</span>
                </button>

                {/* Responsibilities */}
                <button
                  type="button"
                  onClick={() => navigate('/staff-management/responsibilities')}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#006a61] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="checklist" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#131b2e]">Duties</span>
                  <span className="text-[10px] font-mono text-[#707881]">Sec. 17.17</span>
                </button>

                {/* Edit Details */}
                <button
                  type="button"
                  onClick={() => triggerToast('Action: Employment Details editor opened.')}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#f2f3ff] rounded-xl hover:bg-[#eaedff] transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#3f4850] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="edit_note" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#131b2e]">Edit Details</span>
                  <span className="text-[10px] font-mono text-[#707881]">Sec. 17.22</span>
                </button>

                {/* Suspend Access (Destructive) */}
                <button
                  type="button"
                  onClick={() => setShowSuspendModal(true)}
                  className="flex flex-col items-center justify-center p-3.5 bg-[#ffdad6]/40 rounded-xl hover:bg-[#ffdad6]/70 transition-colors group text-center"
                >
                  <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#ba1a1a] group-hover:scale-110 transition-transform mb-2 shadow-2xs">
                    <Icon name="lock_person" className="text-lg" />
                  </div>
                  <span className="font-semibold text-xs text-[#ba1a1a]">Suspend</span>
                  <span className="text-[10px] font-mono text-[#ba1a1a]/80">Sec. 17.20</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Fallback for other tabs */}
        {activeTab !== 'overview' && (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#eaedff] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#006194] mx-auto">
              <Icon name="description" className="text-2xl" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e] capitalize">
              {activeTab.replace('-', ' ')} Section
            </h3>
            <p className="text-xs text-[#3f4850] max-w-md mx-auto">
              Showing detailed records, logs and verified documentation for Dr. Michael Adeyemi (#{staffId}).
            </p>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className="text-xs text-[#006194] font-semibold hover:underline"
            >
              Return to Overview
            </button>
          </div>
        )}
      </main>

      {/* Suspend Modal */}
      {showSuspendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scale-up border border-[#eaedff]">
            <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
              <Icon name="warning" className="text-2xl" />
            </div>
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-lg text-[#131b2e]">
                Suspend Staff Access?
              </h3>
              <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                This will immediately revoke Dr. Michael Adeyemi’s access to Harmony Dental clinical operatory charts, appointments, and prescribing systems across all branches.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowSuspendModal(false);
                  triggerToast('Staff access suspended.');
                }}
                className="flex-1 py-2.5 bg-[#ba1a1a] text-white text-xs font-semibold rounded-xl hover:bg-[#93000a] transition-colors"
              >
                Confirm Suspension
              </button>
              <button
                type="button"
                onClick={() => setShowSuspendModal(false)}
                className="py-2.5 px-4 bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold rounded-xl hover:bg-[#eaedff] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10">
          <Icon name="info" className="text-sm text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
