import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StaffManagementShell } from './StaffManagementShell';
import { Icon } from '../../design/Primitives';

type BranchFilter = 'all' | 'wuse' | 'maitama' | 'gwarinpa';

interface PersonnelAction {
  id: string;
  name: string;
  avatar: string;
  badgeIcon: string;
  badgeBg: string;
  timeAgo: string;
  description: string;
  targetHighlight: string;
  tagText: string;
  tagSubText: string;
  hasActions?: boolean;
}

const PERSONNEL_ACTIONS: PersonnelAction[] = [
  {
    id: 'act-1',
    name: 'Dr. Sarah Okafor',
    avatar: 'https://images.unsplash.com/photo-1594824813589-91361c4f1c1e?w=150&auto=format&fit=crop&q=80',
    badgeIcon: 'stars',
    badgeBg: 'bg-[#006a61] text-white',
    timeAgo: '2h ago',
    description: 'Assigned Lead Clinical Responsibilities at',
    targetHighlight: 'Maitama Specialist Hub',
    tagText: 'Clinical Lead',
    tagSubText: '• MDCN Verified',
  },
  {
    id: 'act-2',
    name: 'Dr. Daniel Musa',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    badgeIcon: 'send',
    badgeBg: 'bg-[#006194] text-white',
    timeAgo: '09:15 AM',
    description: 'Staff invitation sent for',
    targetHighlight: 'Dentist (Orthodontics) at Wuse 2 Main',
    tagText: 'Invite Dispatched',
    tagSubText: '• Pending Response',
  },
  {
    id: 'act-3',
    name: 'Esther Bello',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badgeIcon: 'compare_arrows',
    badgeBg: 'bg-[#287ab3] text-white',
    timeAgo: 'Yesterday',
    description: 'Branch Transfer request:',
    targetHighlight: 'Gwarinpa Outpost → Wuse 2 Main',
    tagText: 'Transfer Request',
    tagSubText: '• Review Required',
    hasActions: true,
  },
];

export const StaffManagementDashboardScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState<BranchFilter>('all');
  const [showToast, setShowToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 3000);
  };

  return (
    <StaffManagementShell pageTitle="Workforce Overview">
      <div className="w-full space-y-6">
        {/* Top Context & Branch Filter Bar */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-xs border border-[#eaedff] flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center justify-between md:justify-start gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
                Multi-Branch Network • Abuja
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#f2f3ff] px-3 py-1 rounded-full text-[#3f4850] text-xs font-mono">
              <Icon name="calendar_today" className="text-xs" />
              <span>Oct 2026 MTD</span>
            </div>
          </div>

          {/* Branch Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            <button
              type="button"
              onClick={() => setSelectedBranch('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedBranch === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>All Branches</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedBranch === 'all' ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#3f4850]'}`}>
                28
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('wuse')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedBranch === 'wuse'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Wuse 2 Main</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedBranch === 'wuse' ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#3f4850]'}`}>
                14
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('maitama')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedBranch === 'maitama'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Maitama Specialist</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedBranch === 'maitama' ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#3f4850]'}`}>
                8
              </span>
            </button>
            <button
              type="button"
              onClick={() => setSelectedBranch('gwarinpa')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                selectedBranch === 'gwarinpa'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#f2f3ff] text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Gwarinpa Outpost</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${selectedBranch === 'gwarinpa' ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#3f4850]'}`}>
                6
              </span>
            </button>
          </div>
        </div>

        {/* Telemetry KPI Cards (2x2 Grid on mobile, 4-col on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Total Staff */}
          <div 
            onClick={() => navigate('/staff-management/directory')}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-[#006194]/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#3f4850]">Total Staff</span>
              <div className="w-8 h-8 rounded-xl bg-[#f2f3ff] flex items-center justify-center text-[#006194] group-hover:scale-110 transition-transform">
                <Icon name="group" className="text-base" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">28</span>
                <span className="text-xs text-[#3f4850] font-medium">Members</span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
                <span className="text-[#006a61] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>22 Act
                </span>
                <span className="text-[#bfc7d2]">•</span>
                <span className="text-[#3f4850]">2 Leave</span>
                <span className="text-[#bfc7d2]">•</span>
                <span className="text-[#ba1a1a] font-medium">1 Susp</span>
              </div>
            </div>
          </div>

          {/* Card 2: Verification */}
          <div 
            onClick={() => navigate('/staff-management/directory')}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-[#006a61]/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#3f4850]">Verification</span>
              <div className="w-8 h-8 rounded-xl bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61] group-hover:scale-110 transition-transform">
                <Icon name="verified" className="text-base" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#006a61]">24</span>
                <span className="text-xs text-[#006a61] font-semibold">Verified</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-[11px] font-mono text-[#3f4850]">
                <span className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#6bd8cb]"></span>2 MDCN Pend
                </span>
                <span className="text-[#006194] font-medium">2 Affil</span>
              </div>
            </div>
          </div>

          {/* Card 3: Pending Invites */}
          <div 
            onClick={() => navigate('/staff-management/pending-invitations')}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-[#006194]/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#3f4850]">Pending Invites</span>
              <div className="w-8 h-8 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] group-hover:scale-110 transition-transform">
                <Icon name="forward_to_inbox" className="text-base" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">4</span>
                <span className="text-xs text-[#3f4850] font-medium">Awaiting</span>
              </div>
              <div className="mt-2 flex items-center gap-1 bg-[#ffdad6]/60 text-[#ba1a1a] px-2 py-0.5 rounded-md text-[11px] font-mono w-fit">
                <Icon name="schedule" className="text-[12px]" />
                <span>1 expires in 24h</span>
              </div>
            </div>
          </div>

          {/* Card 4: Open Requests */}
          <div 
            onClick={() => triggerToast('3 active personnel requests: 1 transfer, 2 role adaptations.')}
            className="bg-white p-4 md:p-5 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between relative overflow-hidden cursor-pointer hover:border-[#287ab3]/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold tracking-wider text-[#3f4850]">Open Requests</span>
              <div className="w-8 h-8 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#006195] group-hover:scale-110 transition-transform">
                <Icon name="sync_alt" className="text-base" />
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#006194]">3</span>
                <span className="text-xs text-[#3f4850] font-medium">Pending</span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[11px] font-mono text-[#3f4850]">
                <span className="text-[#006195] font-semibold">1 Transfer</span>
                <span className="text-[#bfc7d2]">•</span>
                <span>2 Role Change</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Command Matrix */}
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e]">
              Administrative Actions
            </span>
            <button 
              type="button"
              onClick={() => triggerToast('Audit log: All 12 actions logged under DHA §17.')}
              className="text-xs font-mono text-[#006194] hover:underline"
            >
              View logs
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {/* Primary Action: Invite New Staff */}
            <button
              type="button"
              onClick={() => navigate('/staff-management/add')}
              className="sm:col-span-2 lg:col-span-2 flex items-center justify-between bg-[#006194] text-white p-4 rounded-2xl shadow-sm hover:bg-[#007bb9] active:scale-[0.99] transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white shrink-0">
                  <Icon name="person_add" className="text-xl" />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Plus_Jakarta_Sans'] font-semibold text-base leading-tight">
                    Invite New Staff
                  </span>
                  <span className="text-xs text-white/80">
                    Issue DHA credential & clinic access
                  </span>
                </div>
              </div>
              <Icon name="arrow_forward" className="text-xl" />
            </button>

            {/* Link DHA ID */}
            <button
              type="button"
              onClick={() => navigate('/staff-management/invite-existing')}
              className="flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xs border border-[#eaedff] text-left hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center shrink-0">
                <Icon name="verified_user" className="text-lg" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                  Link DHA ID
                </span>
                <span className="text-xs text-[#707881] font-mono truncate">Central registry</span>
              </div>
            </button>

            {/* Custom Roles */}
            <button
              type="button"
              onClick={() => navigate('/staff-management/roles')}
              className="flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xs border border-[#eaedff] text-left hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#cde5ff] text-[#004b74] flex items-center justify-center shrink-0">
                <Icon name="security" className="text-lg" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                  Custom Roles
                </span>
                <span className="text-xs text-[#707881] font-mono truncate">ACL & clinical tiers</span>
              </div>
            </button>

            {/* Branch Matrix */}
            <button
              type="button"
              onClick={() => navigate('/staff-management/branches')}
              className="flex items-center gap-3 bg-white p-3.5 rounded-2xl shadow-xs border border-[#eaedff] text-left hover:bg-[#f2f3ff] transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-[#e2e7ff] text-[#006194] flex items-center justify-center shrink-0">
                <Icon name="hub" className="text-lg" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                  Branch Matrix
                </span>
                <span className="text-xs text-[#707881] font-mono truncate">Cross-duty roster</span>
              </div>
            </button>
          </div>
        </div>

        {/* Two-Column Analytics Layout (Desktop) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Staff by Role Category */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="badge" className="text-[#006194] text-lg" />
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
                  Staff by Role Category
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-[#3f4850] bg-[#f2f3ff] px-2.5 py-1 rounded-full">
                28 Personnel
              </span>
            </div>

            {/* Segmented Stacked Distribution Bar */}
            <div className="w-full h-3 rounded-full bg-[#f2f3ff] overflow-hidden flex gap-0.5">
              <div className="h-full bg-[#006194] rounded-l-full" style={{ width: '28.5%' }} title="Dentists & Specialists: 8 (29%)" />
              <div className="h-full bg-[#006a61]" style={{ width: '21.4%' }} title="Nurses & Therapists: 6 (21%)" />
              <div className="h-full bg-[#6bd8cb]" style={{ width: '10.7%' }} title="Hygienists: 3 (11%)" />
              <div className="h-full bg-[#287ab3]" style={{ width: '17.9%' }} title="Front Desk: 5 (18%)" />
              <div className="h-full bg-[#dae2fd] rounded-r-full" style={{ width: '21.5%' }} title="Management & Billing: 6 (21%)" />
            </div>

            {/* Categorical Roster Legend */}
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 pt-1">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006194] shrink-0"></span>
                  <span className="text-[#131b2e] truncate">Dentists & Specialists</span>
                </span>
                <span className="font-mono text-[#3f4850] font-semibold">8</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] shrink-0"></span>
                  <span className="text-[#131b2e] truncate">Chairside Nurses</span>
                </span>
                <span className="font-mono text-[#3f4850] font-semibold">6</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6bd8cb] shrink-0"></span>
                  <span className="text-[#131b2e] truncate">Dental Hygienists</span>
                </span>
                <span className="font-mono text-[#3f4850] font-semibold">3</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#287ab3] shrink-0"></span>
                  <span className="text-[#131b2e] truncate">Front Desk & Rec.</span>
                </span>
                <span className="font-mono text-[#3f4850] font-semibold">5</span>
              </div>
              <div className="flex items-center justify-between text-xs col-span-2 pt-1 border-t border-[#eaedff]">
                <span className="flex items-center gap-2 truncate">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#dae2fd] shrink-0"></span>
                  <span className="text-[#131b2e] truncate">Management & Medical Billing</span>
                </span>
                <span className="font-mono text-[#3f4850] font-semibold">6</span>
              </div>
            </div>
          </div>

          {/* Branch Allocation Progress Bars */}
          <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="location_city" className="text-[#006a61] text-lg" />
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
                  Branch Deployment Ratio
                </span>
              </div>
              <span className="text-xs font-mono font-semibold text-[#006a61] bg-[#86f2e4]/30 px-2.5 py-1 rounded-full">
                100% Allocated
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {/* Branch 1 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#131b2e] font-medium">Wuse 2 Main</span>
                  <span className="font-mono text-[#3f4850]">14 staff • 50%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#006194] rounded-full transition-all" style={{ width: '50%' }}></div>
                </div>
              </div>

              {/* Branch 2 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#131b2e] font-medium">Maitama Specialist Hub</span>
                  <span className="font-mono text-[#3f4850]">8 staff • 29%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#006a61] rounded-full transition-all" style={{ width: '29%' }}></div>
                </div>
              </div>

              {/* Branch 3 */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#131b2e] font-medium">Garki / Gwarinpa Outpost</span>
                  <span className="font-mono text-[#3f4850]">6 staff • 21%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#f2f3ff] overflow-hidden">
                  <div className="h-full bg-[#287ab3] rounded-full transition-all" style={{ width: '21%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Personnel Actions */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="history" className="text-[#006194] text-lg" />
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
                Recent Personnel Actions
              </span>
            </div>
            <span className="text-xs font-mono font-medium text-[#006194]">Live Feed</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PERSONNEL_ACTIONS.map((action) => (
              <div
                key={action.id}
                className="flex flex-col justify-between p-4 rounded-xl bg-[#f2f3ff]/70 hover:bg-[#f2f3ff] border border-transparent hover:border-[#dae2fd] transition-all"
              >
                <div>
                  <div className="flex items-start gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={action.avatar}
                        alt={action.name}
                        className="w-11 h-11 rounded-full object-cover shadow-xs"
                      />
                      <span className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${action.badgeBg} flex items-center justify-center text-[10px]`}>
                        <Icon name={action.badgeIcon} className="text-[12px]" />
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate">
                          {action.name}
                        </span>
                        <span className="font-mono text-[11px] text-[#707881] shrink-0">
                          {action.timeAgo}
                        </span>
                      </div>
                      <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                        {action.description}{' '}
                        <span className="text-[#131b2e] font-semibold">
                          {action.targetHighlight}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-3">
                    <span className="bg-[#86f2e4]/30 text-[#006a61] font-mono text-[11px] px-2 py-0.5 rounded font-medium">
                      {action.tagText}
                    </span>
                    <span className="text-[#3f4850] font-mono text-[11px]">
                      {action.tagSubText}
                    </span>
                  </div>
                </div>

                {action.hasActions && (
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t border-[#dae2fd]/60">
                    <button
                      type="button"
                      onClick={() => triggerToast(`Transfer approved for ${action.name}`)}
                      className="flex-1 bg-[#006a61] text-white py-1.5 px-3 rounded-lg text-xs font-semibold hover:bg-[#005049] transition-colors"
                    >
                      Review & Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/staff-management/profile/STF-BEL-05')}
                      className="bg-white text-[#3f4850] py-1.5 px-3 rounded-lg text-xs font-medium border border-[#dae2fd] hover:bg-[#eaedff] transition-colors"
                    >
                      Details
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Statutory Safeguard Banner */}
        <div className="bg-[#eaedff]/60 rounded-2xl p-5 md:p-6 border border-[#dae2fd] relative overflow-hidden">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0 mt-0.5">
              <Icon name="gavel" className="text-xl" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#006194]">
                  DHA Governance Standard §17.1
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006194]"></span>
                <span className="text-xs font-mono font-semibold text-[#006a61]">
                  Statutory Clause
                </span>
              </div>
              <p className="text-xs text-[#3f4850] leading-relaxed max-w-4xl">
                Clinic managers coordinate internal branch assignments and duty rosters. Professional licenses and MDCN statutory verification remain sovereignly managed by DHA central registry.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => triggerToast('DHA Healthcare Governance §17.1 PDF previewed.')}
                  className="text-xs font-semibold text-[#006194] hover:underline inline-flex items-center gap-1"
                >
                  <span>Read Protocol Document</span>
                  <Icon name="open_in_new" className="text-xs" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10 animate-fade-in">
          <Icon name="info" className="text-sm text-[#86f2e4]" />
          <span>{showToast}</span>
        </div>
      )}
    </StaffManagementShell>
  );
};
