import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface StaffStatusItem {
  id: string;
  name: string;
  code: string;
  role: string;
  category: 'active' | 'leave' | 'suspended' | 'pending';
  badgeText: string;
  badgeType: 'leave' | 'transfer' | 'active' | 'suspended' | 'invited';
  branch: string;
  initials: string;
  avatarBg: string;
  logTitle?: string;
  logDesc: string;
  updatedBy?: string;
  primaryAction: { label: string; icon: string; action: () => void };
  secondaryAction?: { label: string; icon?: string; action: () => void };
}

export const StaffStatusManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'active' | 'leave' | 'suspended' | 'pending'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const staffItems: StaffStatusItem[] = [
    {
      id: 'stf-ali-11',
      name: 'Dr. Fatimah Aliyu',
      code: '#STF-ALI-11',
      role: 'Restorative Dentist',
      category: 'leave',
      badgeText: 'STUDY LEAVE • Returns 15 Dec 2026',
      badgeType: 'leave',
      branch: 'Wuse 2 Main',
      initials: 'FA',
      avatarBg: 'bg-[#dae2fd] text-[#3f4850]',
      logTitle: 'Approved Academic Sabbatical: Prosthodontics Fellowship.',
      logDesc: 'Clinical appointments paused; patient caseload temporarily transferred to Dr. Adeyemi.',
      updatedBy: 'Updated by Samuel Eze • 01 Sep 2026',
      primaryAction: {
        label: 'Reactivate Staff',
        icon: 'power_settings_new',
        action: () => triggerToast('Staff member reactivated to full clinical standing.')
      },
      secondaryAction: {
        label: 'Modify Dates',
        icon: 'edit_calendar',
        action: () => triggerToast('Sabbatical date modification window opened.')
      }
    },
    {
      id: 'stf-bel-05',
      name: 'Esther Bello',
      code: '#STF-BEL-05',
      role: 'Dental Hygienist',
      category: 'active',
      badgeText: 'ACTIVE • TRANSFER PENDING',
      badgeType: 'transfer',
      branch: 'Wuse 2 → Gwarinpa Clinic',
      initials: 'EB',
      avatarBg: 'bg-[#86f2e4] text-[#006f66]',
      logTitle: 'Branch Relocation: Wuse 2 → Gwarinpa Clinic',
      logDesc: 'Effective Date: 01 Nov 2026. Awaiting final practice manager confirmation.',
      primaryAction: {
        label: 'Approve Transfer',
        icon: 'check',
        action: () => {
          triggerToast('Transfer approved. Roster updated.');
          navigate('/staff-management/transfer');
        }
      },
      secondaryAction: {
        label: 'Review Status',
        action: () => navigate('/staff-management/transfer')
      }
    },
    {
      id: 'stf-ade-01',
      name: 'Dr. Michael Adeyemi',
      code: '#STF-ADE-01',
      role: 'Lead Clinical Surgeon',
      category: 'active',
      badgeText: 'ACTIVE • ON DUTY',
      badgeType: 'active',
      branch: 'Wuse 2 & Maitama',
      initials: 'MA',
      avatarBg: 'bg-[#cce5ff] text-[#006194]',
      logDesc: 'Full clinical access enabled. Currently covering sabbatical coverage for Restorative clinic cases.',
      primaryAction: {
        label: 'Log Leave',
        icon: 'time_to_leave',
        action: () => triggerToast('Leave logging modal opened.')
      },
      secondaryAction: {
        label: 'Manage',
        icon: 'edit_note',
        action: () => navigate('/staff-management/profile')
      }
    },
    {
      id: 'stf-oko-14',
      name: 'Kalu Okonkwo',
      code: '#STF-OKO-14',
      role: 'Front-Desk Cashier',
      category: 'suspended',
      badgeText: 'TEMPORARILY SUSPENDED',
      badgeType: 'suspended',
      branch: 'Wuse 2 Main',
      initials: 'KO',
      avatarBg: 'bg-[#ffdad6] text-[#ba1a1a]',
      logTitle: 'Type: Administrative Audit Hold',
      logDesc: 'Effective: 18 Oct 2026 • POS terminal access revoked; clinic management dashboard login locked.',
      primaryAction: {
        label: 'Reinstate',
        icon: 'key',
        action: () => triggerToast('Reinstatement workflow initiated.')
      },
      secondaryAction: {
        label: 'View Dossier',
        icon: 'folder_shared',
        action: () => navigate('/staff-management/suspend')
      }
    },
    {
      id: 'stf-yus-15',
      name: 'Amina Yusuf',
      code: '#STF-YUS-15',
      role: 'Chairside Nurse',
      category: 'pending',
      badgeText: 'INVITED • AWAITING REGISTRATION',
      badgeType: 'invited',
      branch: 'Wuse 2 Main',
      initials: 'AY',
      avatarBg: 'bg-[#dae2fd] text-[#131b2e]',
      logDesc: 'Credentials invitation link delivered via SMS and encrypted email on 20 Oct 2026. Awaiting two-factor biometric setup.',
      primaryAction: {
        label: 'Resend Invite Link',
        icon: 'forward_to_inbox',
        action: () => triggerToast('Invitation link re-sent via SMS and encrypted email.')
      }
    }
  ];

  const filteredStaff = staffItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesQuery =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
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
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/staff-management/dashboard')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] flex items-center gap-1.5">
                Harmony Dental Group
                <Icon name="expand_more" className="text-sm text-[#707881]" />
              </span>
              <span className="text-xs text-[#006a61]">Wuse 2 Main Branch</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Search staff')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="search" className="text-xl" />
            </button>
            <button
              onClick={() => triggerToast('Notifications')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-xl" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-24">
        {/* Page Header Summary */}
        <div className="flex flex-col gap-1 mb-5">
          <div className="flex items-center justify-between gap-2">
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Staff Status Management
            </h1>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#3f4850] text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              Live Sync
            </span>
          </div>
          <p className="text-xs md:text-sm text-[#707881]">
            Operational availability, leave tracking, and administrative lifecycle states.
          </p>
        </div>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Active Duty */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#006a61] uppercase tracking-wider">Active Duty</span>
              <div className="w-7 h-7 rounded-lg bg-[#86f2e4]/30 flex items-center justify-center text-[#006f66]">
                <Icon name="verified" className="text-base" filled />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#131b2e]">22</span>
              <span className="text-xs text-[#707881]">78.5% full shift</span>
            </div>
          </div>

          {/* On Leave */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#006195] uppercase tracking-wider">On Leave</span>
              <div className="w-7 h-7 rounded-lg bg-[#cde5ff] flex items-center justify-center text-[#006195]">
                <Icon name="event_busy" className="text-base" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#131b2e]">2</span>
              <span className="text-xs text-[#707881]">sabbatical / plan</span>
            </div>
          </div>

          {/* Suspended */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#ba1a1a] uppercase tracking-wider">Suspended</span>
              <div className="w-7 h-7 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#93000a]">
                <Icon name="gavel" className="text-base" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#ba1a1a]">1</span>
              <span className="text-xs text-[#ba1a1a] font-medium">Audit lock</span>
            </div>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wider">Pending</span>
              <div className="w-7 h-7 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#004b73]">
                <Icon name="person_add" className="text-base" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-['Plus_Jakarta_Sans'] text-3xl font-bold text-[#131b2e]">3</span>
              <span className="text-xs text-[#707881]">activation cue</span>
            </div>
          </div>
        </div>

        {/* Regulatory Policy Banner */}
        <div className="bg-[#eaedff] rounded-2xl p-4 md:p-5 mb-5 shadow-xs border border-[#dae2fd]">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 mt-0.5 shadow-xs">
              <Icon name="info" className="text-base" />
            </div>
            <div className="flex flex-col text-xs text-[#3f4850] space-y-0.5">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
                Operational vs Regulatory Standing
              </span>
              <p className="leading-relaxed">
                Lifecycle flags reflect internal clinic availability, rosters, and credential access. National Dental Health Council (DHA) licensing verification remains independent under Practitioner Dossier.
              </p>
            </div>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="relative w-full">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, clinical role, or ID..."
              className="w-full h-12 pl-11 pr-4 bg-white rounded-xl text-sm text-[#131b2e] placeholder-[#707881] border border-[#eaedff] focus:outline-none focus:border-[#006194] shadow-xs transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-nowrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>All</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">28</span>
            </button>
            <button
              onClick={() => setActiveFilter('active')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'active'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Active</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px]">22</span>
            </button>
            <button
              onClick={() => setActiveFilter('leave')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'leave'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>On Leave</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px]">2</span>
            </button>
            <button
              onClick={() => setActiveFilter('suspended')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'suspended'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Suspended</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px]">1</span>
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'pending'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Pending</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-[10px]">3</span>
            </button>
          </div>
        </div>

        {/* Staff Lifecycle Status Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col justify-between hover:border-[#006194]/30 hover:shadow-sm transition-all"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-12 h-12 rounded-xl ${staff.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                      {staff.initials}
                    </div>
                    <div className="min-w-0">
                      <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e] truncate">
                        {staff.name}
                      </h2>
                      <span className="text-xs font-mono text-[#707881] truncate block">
                        {staff.code} • {staff.role}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => triggerToast(`Options for ${staff.name}`)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-[#707881] hover:bg-[#f2f3ff]"
                  >
                    <Icon name="more_vert" className="text-lg" />
                  </button>
                </div>

                {/* Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                      staff.badgeType === 'leave'
                        ? 'bg-[#cde5ff] text-[#001d32]'
                        : staff.badgeType === 'transfer'
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : staff.badgeType === 'active'
                        ? 'bg-[#86f2e4]/60 text-[#006a61]'
                        : staff.badgeType === 'suspended'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#eaedff] text-[#006194]'
                    }`}
                  >
                    {staff.badgeType === 'active' && <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>}
                    {staff.badgeText}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#f2f3ff] text-[#707881] text-xs">
                    <Icon name="domain" className="text-xs" />
                    {staff.branch}
                  </span>
                </div>

                {/* Log Info Box */}
                <div className="bg-[#f2f3ff] rounded-xl p-3 text-xs text-[#3f4850] space-y-1">
                  {staff.logTitle && (
                    <div className="flex items-start gap-1.5 font-semibold text-[#131b2e]">
                      <Icon name="assignment" className="text-sm text-[#006194] mt-0.5 shrink-0" />
                      <span>{staff.logTitle}</span>
                    </div>
                  )}
                  <p className="text-[#707881] leading-relaxed pl-5">{staff.logDesc}</p>
                  {staff.updatedBy && (
                    <span className="text-[10px] text-[#707881] block pt-1 pl-5">{staff.updatedBy}</span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className={`grid gap-2 pt-3 mt-3 border-t border-[#eaedff] ${staff.secondaryAction ? 'grid-cols-2' : 'grid-cols-1'}`}>
                {staff.secondaryAction && (
                  <button
                    onClick={staff.secondaryAction.action}
                    className="h-10 px-3 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    {staff.secondaryAction.icon && <Icon name={staff.secondaryAction.icon} className="text-sm" />}
                    <span>{staff.secondaryAction.label}</span>
                  </button>
                )}
                <button
                  onClick={staff.primaryAction.action}
                  className="h-10 px-3 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition-colors"
                >
                  <Icon name={staff.primaryAction.icon} className="text-sm" />
                  <span>{staff.primaryAction.label}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => navigate('/staff-management/suspend')}
            className="flex items-center gap-2 px-5 h-12 rounded-full bg-[#006194] hover:bg-[#007bb9] text-white shadow-xl active:scale-95 transition-all text-xs font-semibold tracking-wide"
          >
            <Icon name="manage_accounts" className="text-lg" />
            <span>+ Change Staff Status</span>
          </button>
        </div>
      </main>
    </div>
  );
};
