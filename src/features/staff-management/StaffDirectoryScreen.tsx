import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type CategoryFilter = 'all' | 'dentists' | 'specialists' | 'nurses' | 'hygienists' | 'reception' | 'pending' | 'suspended';

interface StaffItem {
  id: string;
  code: string;
  name: string;
  title: string;
  cadre: string;
  category: CategoryFilter;
  status: 'active' | 'pending' | 'suspended';
  statusLabel: string;
  avatarUrl?: string;
  initials?: string;
  initialsBg?: string;
  initialsColor?: string;
  licenseNumber?: string;
  licenseTag?: string;
  branch: string;
  secondaryBranch?: string;
  alertNotice?: string;
  isPendingInvite?: boolean;
  invitedEmail?: string;
  inviteExpires?: string;
}

const STAFF_MEMBERS: StaffItem[] = [
  {
    id: 'STF-ADE-01',
    code: '#STF-ADE-01',
    name: 'Dr. Michael Adeyemi',
    title: 'Lead Restorative Dentist',
    cadre: 'Senior Dentist',
    category: 'dentists',
    status: 'active',
    statusLabel: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'MDCN #DEN-78421',
    licenseTag: 'Verified DHA',
    branch: 'Wuse 2 Main',
    secondaryBranch: 'Maitama Specialist',
  },
  {
    id: 'STF-OKA-03',
    code: '#STF-OKA-03',
    name: 'Dr. Sarah Okafor',
    title: 'Senior Dental Surgeon & Partner',
    cadre: 'Clinical Director',
    category: 'specialists',
    status: 'active',
    statusLabel: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813589-91361c4f1c1e?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'MDCN #DEN-65209',
    licenseTag: 'Verified DHA',
    branch: 'Maitama Specialist',
    secondaryBranch: 'Wuse 2',
  },
  {
    id: 'STF-IBR-08',
    code: '#STF-IBR-08',
    name: 'Grace Ibrahim',
    title: 'Senior Receptionist & Patient Triage',
    cadre: 'Front-Desk Lead',
    category: 'reception',
    status: 'active',
    statusLabel: 'Active',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    licenseNumber: 'N/A (Administrative Role)',
    branch: 'Wuse 2 Main',
  },
  {
    id: 'STF-EZE-02',
    code: '#STF-EZE-02',
    name: 'Samuel Eze',
    title: 'Clinic Operations Manager',
    cadre: 'Operations Lead',
    category: 'reception',
    status: 'active',
    statusLabel: 'Active',
    initials: 'SE',
    initialsBg: 'bg-[#cde5ff]',
    initialsColor: 'text-[#004b74]',
    licenseNumber: 'Lic #FCT-OPS-091',
    licenseTag: 'Multi-site Admin',
    branch: 'Wuse 2 Main',
    secondaryBranch: 'All Branches (Global Access)',
  },
  {
    id: 'STF-BEL-05',
    code: '#STF-BEL-05',
    name: 'Esther Bello',
    title: 'Registered Dental Hygienist',
    cadre: 'Senior Hygienist',
    category: 'hygienists',
    status: 'active',
    statusLabel: 'Active',
    initials: 'EB',
    initialsBg: 'bg-[#89f5e7]',
    initialsColor: 'text-[#00201d]',
    licenseNumber: 'RDH-4410',
    licenseTag: 'Verified DHA',
    branch: 'Current: Wuse 2 Main',
    alertNotice: 'Gwarinpa Clinic (Transfer pending)',
  },
  {
    id: 'STF-MUS-09',
    code: '#STF-MUS-09',
    name: 'Dr. Daniel Musa',
    title: 'Invited: Specialist Orthodontist',
    cadre: 'Invited Specialist',
    category: 'pending',
    status: 'pending',
    statusLabel: 'Invite Pending',
    initials: 'DM',
    initialsBg: 'bg-[#eaedff]',
    initialsColor: 'text-[#707881]',
    isPendingInvite: true,
    invitedEmail: 'd.musa@dha-health.ng',
    inviteExpires: 'Expires in 48 hours',
    branch: 'Proposed: Wuse 2 Main Branch',
  },
];

export const StaffDirectoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Wuse 2 Main');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStaff = useMemo(() => {
    return STAFF_MEMBERS.filter((staff) => {
      // Category filter
      if (activeCategory !== 'all') {
        if (activeCategory === 'pending') {
          if (staff.status !== 'pending') return false;
        } else if (activeCategory === 'suspended') {
          if (staff.status !== 'suspended') return false;
        } else if (staff.category !== activeCategory) {
          return false;
        }
      }

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = staff.name.toLowerCase().includes(q);
        const matchesCode = staff.code.toLowerCase().includes(q);
        const matchesTitle = staff.title.toLowerCase().includes(q);
        const matchesCadre = staff.cadre.toLowerCase().includes(q);
        const matchesBranch = staff.branch.toLowerCase().includes(q);
        return matchesName || matchesCode || matchesTitle || matchesCadre || matchesBranch;
      }

      return true;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col font-['Inter']">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/50 shadow-xs">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/staff-management/dashboard')}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back_ios_new" className="text-lg" />
            </button>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-[#131b2e] text-base leading-tight">
                Staff Directory
              </span>
              <span className="text-xs text-[#006a61] font-medium">Harmony Dental Group</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/staff-management/add')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#006194] text-white rounded-xl text-xs font-semibold hover:bg-[#007bb9] transition-all shadow-xs"
            >
              <Icon name="person_add" className="text-base" />
              <span>Add Staff</span>
            </button>
            <div 
              onClick={() => navigate('/staff-management/profile/STF-ADE-01')}
              className="w-9 h-9 rounded-full bg-[#006194] flex items-center justify-center text-white cursor-pointer hover:opacity-90 ml-1"
            >
              <Icon name="person" className="text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Title & Branch Context Ribbon */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Staff Directory
            </h1>
            <p className="text-xs md:text-sm text-[#3f4850] mt-1">
              Manage clinical licenses, roles & practice access across all facilities
            </p>
          </div>

          {/* Branch Selector Dropdown Pill */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="appearance-none pl-9 pr-8 py-2 rounded-full bg-[#eaedff] text-[#131b2e] font-semibold text-xs hover:bg-[#dae2fd] transition-colors shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#006194]"
              >
                <option value="All Branches">All Branches (28)</option>
                <option value="Wuse 2 Main">Wuse 2 Main (14)</option>
                <option value="Maitama Specialist">Maitama Specialist (8)</option>
                <option value="Gwarinpa Outpost">Gwarinpa Outpost (6)</option>
              </select>
              <Icon name="store" className="text-base text-[#006194] absolute left-3 top-2.5 pointer-events-none" />
              <Icon name="arrow_drop_down" className="text-base text-[#707881] absolute right-2.5 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="space-y-4">
          <div className="relative w-full">
            <Icon name="search" className="text-xl text-[#707881] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, staff ID, role, phone, or MDCN license..."
              className="w-full h-12 pl-12 pr-11 rounded-2xl bg-white text-[#131b2e] placeholder:text-[#707881] text-sm shadow-xs border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="cancel" className="text-lg" />
              </button>
            )}
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                28
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('dentists')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'dentists'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Dentists</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'dentists' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                5
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('specialists')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'specialists'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Specialists</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'specialists' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('nurses')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'nurses'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Nurses & IPC</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'nurses' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                6
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('hygienists')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'hygienists'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Hygienists</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'hygienists' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('reception')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'reception'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Reception</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'reception' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                5
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('pending')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'pending'
                  ? 'bg-[#006a61] text-white shadow-xs'
                  : 'bg-[#86f2e4]/30 text-[#006a61] hover:bg-[#86f2e4]/50'
              }`}
            >
              <span>Pending Invites</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'pending' ? 'bg-white/20 text-white' : 'bg-[#86f2e4] text-[#00201d]'}`}>
                4
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveCategory('suspended')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'suspended'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#ffdad6]/60 text-[#ba1a1a] hover:bg-[#ffdad6]'
              }`}
            >
              <span>Suspended</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeCategory === 'suspended' ? 'bg-white/20 text-white' : 'bg-[#ffdad6] text-[#ba1a1a]'}`}>
                1
              </span>
            </button>
          </div>
        </div>

        {/* Staff Members Grid (1 col on mobile, 2 cols on tablet, 3 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              onClick={() => navigate(`/staff-management/profile/${staff.id}`)}
              className="bg-white rounded-2xl shadow-xs border border-[#eaedff] hover:shadow-md hover:border-[#006194]/30 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between group"
            >
              <div className="p-5 space-y-3.5">
                {/* Header: Avatar, Name, Status Badge */}
                <div className="flex items-start gap-3.5">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#e2e7ff] shrink-0 shadow-inner">
                    {staff.avatarUrl ? (
                      <img src={staff.avatarUrl} alt={staff.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full ${staff.initialsBg || 'bg-[#e2e7ff]'} ${staff.initialsColor || 'text-[#006194]'} flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-base`}>
                        {staff.initials || 'ST'}
                      </div>
                    )}
                    <span
                      className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                        staff.status === 'active'
                          ? 'bg-[#006a61]'
                          : staff.status === 'pending'
                          ? 'bg-[#287ab3]'
                          : 'bg-[#ba1a1a]'
                      }`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm text-[#131b2e] truncate group-hover:text-[#006194] transition-colors">
                        {staff.name}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-semibold shrink-0 ${
                          staff.status === 'active'
                            ? 'bg-[#86f2e4]/40 text-[#006a61]'
                            : staff.status === 'pending'
                            ? 'bg-[#cce5ff] text-[#006194]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {staff.statusLabel}
                      </span>
                    </div>

                    <span className="text-xs text-[#006194] font-medium truncate block mt-0.5">
                      {staff.title}
                    </span>

                    <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-[#707881]">
                      <span>{staff.code}</span>
                      <span className="w-1 h-1 rounded-full bg-[#bfc7d2]"></span>
                      <span className="text-[#3f4850]">{staff.cadre}</span>
                    </div>
                  </div>
                </div>

                {/* Verification & License */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#f2f3ff] text-xs">
                  <Icon
                    name={staff.licenseTag ? 'verified_user' : 'badge'}
                    className={`text-sm ${staff.licenseTag ? 'text-[#006a61]' : 'text-[#707881]'}`}
                  />
                  <span className="font-mono text-[#3f4850] truncate">{staff.licenseNumber}</span>
                  {staff.licenseTag && (
                    <span className="ml-auto px-1.5 py-0.5 rounded bg-[#006a61]/10 text-[#006a61] text-[10px] font-bold uppercase tracking-wider shrink-0">
                      {staff.licenseTag}
                    </span>
                  )}
                </div>

                {/* Pending Invitation Alert or Transfer notice */}
                {staff.alertNotice && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#eaedff] text-xs text-[#3f4850]">
                    <Icon name="swap_horiz" className="text-sm text-[#006195]" />
                    <span className="truncate">{staff.alertNotice}</span>
                  </div>
                )}

                {staff.isPendingInvite && (
                  <div className="space-y-2 bg-[#f2f3ff] p-3 rounded-xl border border-[#dae2fd]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-[#3f4850] truncate">{staff.invitedEmail}</span>
                      <span className="text-[10px] text-[#ba1a1a] font-medium shrink-0">{staff.inviteExpires}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerToast(`Resending invitation email to ${staff.name}...`);
                      }}
                      className="w-full py-1.5 bg-[#006194] text-white text-xs font-semibold rounded-lg hover:bg-[#007bb9] transition-colors"
                    >
                      Resend Invite
                    </button>
                  </div>
                )}

                {/* Branch Matrix Info */}
                <div className="flex items-center justify-between pt-1 text-xs text-[#3f4850]">
                  <div className="flex items-center gap-1.5 truncate">
                    <Icon name="location_on" className="text-sm text-[#707881] shrink-0" />
                    <span className="font-medium text-[#131b2e] truncate">{staff.branch}</span>
                    {staff.secondaryBranch && (
                      <>
                        <span className="text-[#bfc7d2]">•</span>
                        <span className="text-[#707881] truncate">{staff.secondaryBranch}</span>
                      </>
                    )}
                  </div>
                  <Icon name="chevron_right" className="text-base text-[#707881] group-hover:translate-x-1 transition-transform shrink-0" />
                </div>
              </div>

              {/* Bottom decorative color strip */}
              <div
                className={`h-1 w-full ${
                  staff.status === 'active'
                    ? 'bg-[#006194]'
                    : staff.status === 'pending'
                    ? 'bg-[#287ab3]'
                    : 'bg-[#ba1a1a]'
                }`}
              />
            </div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#eaedff] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] mx-auto">
              <Icon name="search_off" className="text-2xl" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
              No staff members found
            </h3>
            <p className="text-xs text-[#3f4850] max-w-sm mx-auto">
              No staff records match your current filter or search criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#006194] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination & Count Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#eaedff]">
          <span className="text-xs text-[#3f4850]">
            Showing <span className="font-semibold text-[#131b2e]">{filteredStaff.length}</span> of <span className="font-semibold text-[#131b2e]">28</span> staff members
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled
              className="w-9 h-9 rounded-xl bg-[#eaedff] flex items-center justify-center text-[#707881] disabled:opacity-40"
            >
              <Icon name="chevron_left" className="text-base" />
            </button>
            <span className="px-3.5 py-1.5 rounded-xl bg-white text-[#131b2e] font-mono text-xs font-bold border border-[#dae2fd]">
              Page 1 of 5
            </span>
            <button
              type="button"
              onClick={() => triggerToast('Navigating to Page 2...')}
              className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-[#131b2e] border border-[#dae2fd] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="chevron_right" className="text-base" />
            </button>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed right-6 bottom-6 sm:hidden z-40">
        <button
          type="button"
          onClick={() => navigate('/staff-management/add')}
          className="flex items-center gap-2 px-5 h-13 rounded-full bg-[#006194] text-white shadow-xl hover:bg-[#007bb9] active:scale-95 transition-all"
        >
          <Icon name="person_add" className="text-xl" />
          <span className="font-['Plus_Jakarta_Sans'] font-semibold text-sm">Add Staff</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10">
          <Icon name="info" className="text-sm text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
