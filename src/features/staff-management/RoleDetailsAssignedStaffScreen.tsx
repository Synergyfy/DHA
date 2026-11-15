import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface AssignedStaff {
  id: string;
  code: string;
  name: string;
  title: string;
  location: string;
  license?: string;
  tenure?: string;
  status: 'Active' | 'Pending' | 'Study Leave';
  roleTag: string;
  subNotice?: string;
  initials?: string;
  avatarBg?: string;
}

export const RoleDetailsAssignedStaffScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'assigned' | 'permissions' | 'audit'>('assigned');
  const [filterActive, setFilterActive] = useState<'all' | 'verified' | 'pending'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const staffList: AssignedStaff[] = [
    {
      id: 'stf-1',
      code: '#STF-ADE-01',
      name: 'Dr. Michael Adeyemi, DDS',
      title: 'Senior Dental Surgeon',
      location: 'Wuse 2 Main',
      license: 'MDCN #DEN-78421',
      tenure: 'Tenure: 2y 9m',
      status: 'Active',
      roleTag: 'Restorative Lead',
      initials: 'MA',
      avatarBg: 'bg-[#cce5ff] text-[#006194]'
    },
    {
      id: 'stf-2',
      code: '#STF-MUS-09',
      name: 'Dr. Daniel Musa, BDS',
      title: 'Associate Dental Surgeon',
      location: 'Wuse 2 Main',
      license: 'Invite Dispatched',
      tenure: 'Joining Oct 2026',
      status: 'Pending',
      roleTag: 'Awaiting MDCN Clearance Token',
      initials: 'DM',
      avatarBg: 'bg-[#cde5ff] text-[#001d32]'
    },
    {
      id: 'stf-3',
      code: '#STF-BEL-04',
      name: 'Dr. Aisha Bello',
      title: 'Pediatric Specialist',
      location: 'Maitama Specialist',
      license: 'MDCN #DEN-84319',
      status: 'Active',
      roleTag: 'Pediatric Restorative & Endo',
      initials: 'AB',
      avatarBg: 'bg-[#86f2e4] text-[#006f66]'
    },
    {
      id: 'stf-4',
      code: '#STF-OBI-07',
      name: 'Dr. Chukwuma Obi',
      title: 'General Dental Practitioner',
      location: 'Gwarinpa Outpost',
      license: 'MDCN #DEN-79102',
      status: 'Active',
      roleTag: 'General Dental Practitioner',
      initials: 'CO',
      avatarBg: 'bg-[#e2e7ff] text-[#006194]'
    },
    {
      id: 'stf-5',
      code: '#STF-ALI-11',
      name: 'Dr. Fatimah Aliyu',
      title: 'Prosthodontics Fellow',
      location: 'Wuse 2 Main',
      license: 'Returns Dec 2026',
      status: 'Study Leave',
      roleTag: 'Prosthodontics Fellowship',
      initials: 'FA',
      avatarBg: 'bg-[#dae2fd] text-[#3f4850]'
    }
  ];

  const filteredStaff = staffList.filter(s => {
    if (filterActive === 'verified') return s.status === 'Active';
    if (filterActive === 'pending') return s.status === 'Pending' || s.status === 'Study Leave';
    return true;
  });

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
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/staff-management/roles')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Back to Roles"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] flex items-center gap-1.5">
                Harmony Dental Group
                <span className="text-xs bg-[#cce5ff] text-[#004b73] px-2 py-0.5 rounded-full font-mono">Role Roster</span>
              </span>
              <span className="text-xs text-[#707881]">Wuse 2 Main Branch • Clinical Tier 2</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Search role members')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="search" className="text-xl" />
            </button>
            <button
              onClick={() => navigate('/staff-management/roles/matrix')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#bfc7d2] hover:bg-[#eaedff] text-xs font-semibold text-[#131b2e] transition-colors"
            >
              <Icon name="grid_view" className="text-sm text-[#006194]" />
              Permission Matrix
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-16">
        {/* Breadcrumb & Title */}
        <div className="pt-2 pb-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-[#707881] text-xs">
            <button onClick={() => navigate('/staff-management/roles')} className="hover:text-[#006194] flex items-center gap-1 transition-colors">
              <Icon name="admin_panel_settings" className="text-sm" />
              Roles & Permissions
            </button>
            <Icon name="chevron_right" className="text-xs" />
            <span className="text-[#006194] font-mono font-medium">#ROL-DHA-SURG-02</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-1">
            <div>
              <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
                Role Details & Assigned Staff
              </h1>
              <p className="text-xs md:text-sm text-[#3f4850] mt-0.5">
                Role configuration, clinical governance, permission inheritance & member roster
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#006f66] font-semibold text-xs border border-[#86f2e4]">
                <Icon name="health_and_safety" className="text-base" />
                Tier 2 Clinical Cadre
              </span>
            </div>
          </div>
        </div>

        {/* Role Hero Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] mb-6 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-44 h-44 rounded-full bg-[#006194]/5 pointer-events-none blur-3xl"></div>

          <div className="flex flex-col gap-4 relative z-10">
            {/* Top Badge & Identifier */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#eaedff] text-[#006194] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006194] animate-pulse"></span>
                Standard DHA Clinical Role (Tier 2 Cadre)
              </span>
              <span className="text-xs font-mono text-[#3f4850] bg-[#e2e7ff] px-2.5 py-1 rounded-lg">
                #ROL-DHA-SURG-02
              </span>
            </div>

            {/* Role Title & Authority */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="font-['Plus_Jakarta_Sans'] text-xl md:text-2xl font-bold text-[#131b2e]">
                  Associate Dental Surgeon
                </h2>
                <p className="text-xs md:text-sm text-[#006a61] flex items-center gap-1 mt-1 font-medium">
                  <Icon name="verified" className="text-sm" />
                  Statutory Authority: Verified MDCN Registration Required
                </p>
              </div>
              <button
                onClick={() => navigate('/staff-management/roles/edit/ROL-DHA-SURG-02')}
                className="self-start md:self-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#bfc7d2] hover:bg-[#f2f3ff] text-xs font-semibold text-[#131b2e] transition-colors"
              >
                <Icon name="edit" className="text-sm text-[#006194]" />
                Edit Role Definition
              </button>
            </div>

            {/* Metadata Zone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#f2f3ff] rounded-xl p-3.5 text-xs text-[#3f4850]">
              <div className="flex flex-col gap-0.5">
                <span className="text-[#707881]">Created By & Governance</span>
                <span className="font-semibold text-[#131b2e]">DHA Master Clinical Specification</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#707881]">Clinic Deployment Scope</span>
                <span className="font-semibold text-[#006a61] flex items-center gap-1">
                  <Icon name="corporate_fare" className="text-sm" />
                  Practice-wide (All Branches)
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[#707881]">Active Member Roster</span>
                <span className="font-semibold text-[#006194] flex items-center gap-1">
                  <Icon name="groups" className="text-sm" />
                  5 Assigned Clinicians
                </span>
              </div>
            </div>

            {/* Clinical Scope Summary */}
            <div className="bg-[#86f2e4]/15 rounded-xl p-4 flex items-start gap-3 border border-[#86f2e4]/40">
              <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center shrink-0 mt-0.5">
                <Icon name="verified_user" className="text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase font-bold tracking-wider text-[#006a61]">
                  Core Clinical Scope Summary
                </span>
                <p className="text-xs md:text-sm text-[#131b2e] mt-1 leading-relaxed">
                  Diagnostic clinical exams, odontogram recording, restorative treatment planning, local infiltration administration, chairside dental assistant oversight.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Segmented Tabs Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-[#eaedff] rounded-xl mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('assigned')}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'assigned'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span>Assigned Staff</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#cce5ff] text-[#001d31] text-[10px] font-bold">5</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('permissions');
              triggerToast('Switching to Permissions breakdown');
            }}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'permissions'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span>Permissions</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#dae2fd] text-[#3f4850] text-[10px]">18</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('audit');
              triggerToast('Switching to Role Audit Trail');
            }}
            className={`flex-1 py-2 px-3 text-center text-xs font-semibold rounded-lg transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <span>Audit Trail</span>
          </button>
        </div>

        {/* Assigned Staff Content */}
        {activeTab === 'assigned' && (
          <div>
            {/* Sub-Header with filter buttons */}
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                  Assigned Clinicians
                </h3>
                <span className="text-xs font-bold font-mono text-[#006a61] px-2.5 py-0.5 rounded-full bg-[#89f5e7]/40">
                  4 Verified • 1 Pending
                </span>
              </div>

              <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-[#eaedff]">
                <button
                  onClick={() => setFilterActive('all')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterActive === 'all' ? 'bg-[#eaedff] text-[#006194] font-semibold' : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  All (5)
                </button>
                <button
                  onClick={() => setFilterActive('verified')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterActive === 'verified' ? 'bg-[#eaedff] text-[#006194] font-semibold' : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  Active Only
                </button>
                <button
                  onClick={() => setFilterActive('pending')}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    filterActive === 'pending' ? 'bg-[#eaedff] text-[#006194] font-semibold' : 'text-[#707881] hover:text-[#131b2e]'
                  }`}
                >
                  Pending / Leave
                </button>
              </div>
            </div>

            {/* Staff Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredStaff.map((staff) => (
                <div
                  key={staff.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col justify-between hover:border-[#006194]/30 hover:shadow-sm transition-all"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-3">
                      <div className={`w-12 h-12 rounded-xl ${staff.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs relative`}>
                        {staff.initials}
                        {staff.status === 'Active' && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#006a61] rounded-full flex items-center justify-center shadow-xs">
                            <Icon name="check" className="text-white text-[10px]" />
                          </span>
                        )}
                        {staff.status === 'Pending' && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#287ab3] rounded-full flex items-center justify-center shadow-xs">
                            <Icon name="outgoing_mail" className="text-white text-[10px]" />
                          </span>
                        )}
                        {staff.status === 'Study Leave' && (
                          <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#707881] rounded-full flex items-center justify-center shadow-xs">
                            <Icon name="school" className="text-white text-[10px]" />
                          </span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                            {staff.name}
                          </h4>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                              staff.status === 'Active'
                                ? 'bg-[#86f2e4] text-[#006f66]'
                                : staff.status === 'Pending'
                                ? 'bg-[#dae2fd] text-[#3f4850]'
                                : 'bg-[#f2f3ff] text-[#707881]'
                            }`}
                          >
                            {staff.status}
                          </span>
                        </div>

                        <p className="text-xs text-[#707881] flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono">{staff.code}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5 text-[#006194]">
                            <Icon name="location_on" className="text-xs" />
                            {staff.location}
                          </span>
                        </p>

                        <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                          {staff.license && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f2f3ff] text-[#3f4850] text-[11px] font-medium">
                              <Icon name="verified" className="text-xs text-[#006a61]" />
                              {staff.license}
                            </span>
                          )}
                          {staff.tenure && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f2f3ff] text-[#707881] text-[11px]">
                              <Icon name="schedule" className="text-xs" />
                              {staff.tenure}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between">
                    <span className="text-xs text-[#3f4850] flex items-center gap-1 truncate max-w-[60%]">
                      <Icon name="dentistry" className="text-xs text-[#006a61]" />
                      <span className="truncate">{staff.roleTag}</span>
                    </span>
                    <button
                      onClick={() => {
                        if (staff.status === 'Pending') {
                          navigate('/staff-management/invitation');
                        } else {
                          navigate('/staff-management/profile');
                        }
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#f2f3ff] text-[#006194] text-xs font-semibold hover:bg-[#006194] hover:text-white transition-colors"
                    >
                      {staff.status === 'Pending' ? 'View Invite' : 'View Profile'}
                      <Icon name="arrow_forward" className="text-xs" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Permissions Tab Content */}
        {activeTab === 'permissions' && (
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#eaedff] mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e]">
                  Inherited & Role-Specific Permissions (18)
                </h3>
                <p className="text-xs text-[#707881]">Governed by DHA statutory cadre regulations</p>
              </div>
              <button
                onClick={() => navigate('/staff-management/roles/matrix')}
                className="text-xs text-[#006194] font-semibold flex items-center gap-1 hover:underline"
              >
                <span>Full Permission Matrix</span>
                <Icon name="open_in_new" className="text-xs" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
                <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#131b2e]">Direct Clinical Diagnostic Examination</p>
                  <p className="text-[#707881] text-[11px] mt-0.5">Odontogram recording and diagnostic charting across all operatories</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
                <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#131b2e]">Restorative Treatment Planning</p>
                  <p className="text-[#707881] text-[11px] mt-0.5">Composite restorations, endodontic referrals, crown preparation</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
                <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#131b2e]">Local Infiltration & Nerve Blocks</p>
                  <p className="text-[#707881] text-[11px] mt-0.5">Septocaine, Lidocaine 2% administration protocol</p>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-start gap-2.5">
                <Icon name="check_circle" className="text-[#006a61] text-base shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-[#131b2e]">Chairside Dental Assistant Oversight</p>
                  <p className="text-[#707881] text-[11px] mt-0.5">Four-handed dental protocol delegation and hygiene sign-off</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Audit Trail Tab Content */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#eaedff] mb-8">
            <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#131b2e] mb-2">
              Role Evolution & Governance Audit
            </h3>
            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006194] mt-1 shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#131b2e]">Assigned Dr. Michael Adeyemi to Role</p>
                  <p className="text-[#707881]">By Medical Director Dr. Sarah Odumodu • 14 Jan 2024</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#006a61] mt-1 shrink-0"></div>
                <div>
                  <p className="font-semibold text-[#131b2e]">Updated Clinical Scope for Pediatric Endo</p>
                  <p className="text-[#707881]">Automated sync with DHA Statutory 2025 Revision • 02 Feb 2025</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Compliance Notice Box */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex items-center gap-4 border border-[#eaedff] mb-6">
          <div className="w-10 h-10 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs">
            <Icon name="policy" className="text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
              Annual DHA Audit Requirement
            </span>
            <p className="text-xs text-[#3f4850] mt-0.5">
              All Tier-2 clinicians must verify active Continuous Professional Development (CPD) points by Q4.
            </p>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
              Role Management Actions
            </span>
            <span className="text-xs text-[#3f4850]">
              Assign members, adjust permission bounds or download compliance dossier
            </span>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
            <button
              onClick={() => navigate('/staff-management/role-assignment')}
              className="flex-1 md:flex-initial h-11 px-4 rounded-xl bg-[#006194] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#007bb9] transition-colors"
            >
              <Icon name="person_add" className="text-base" />
              Assign New Staff
            </button>
            <button
              onClick={() => navigate('/staff-management/roles/matrix')}
              className="flex-1 md:flex-initial h-11 px-4 rounded-xl bg-[#86f2e4] text-[#006f66] text-xs font-semibold flex items-center justify-center gap-2 shadow-xs hover:bg-[#89f5e7] transition-colors"
            >
              <Icon name="security" className="text-base" />
              Permission Matrix
            </button>
            <button
              onClick={() => triggerToast('Exporting Role Dossier (PDF)...')}
              className="h-11 px-4 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-base text-[#707881]" />
              Export Dossier (PDF)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
