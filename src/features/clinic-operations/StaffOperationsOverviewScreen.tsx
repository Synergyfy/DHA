import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { QuickLinks } from '../../design/QuickLinks';

type RoleCategory = 'all' | 'dentists' | 'nurses' | 'hygienists' | 'admin';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  category: 'dentists' | 'nurses' | 'hygienists' | 'admin';
  license: string;
  licenseTag?: string;
  avatarUrl: string;
  statusBadge: string;
  statusBadgeStyle: string;
  statusDotColor: string;
  shiftTime: string;
  location: string;
  locationIcon: string;
  extraMeta?: string;
  patientFlow?: { current: number; total: number; percentage: number };
  actions: { label: string; icon: string; primary?: boolean; actionKey: string }[];
}

const STAFF_DATA: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Dr. Daniel Okoro, DDS',
    role: 'Lead Restorative Clinician & Med. Director',
    category: 'dentists',
    license: 'MDCN #DEN-78421',
    licenseTag: 'Verified',
    avatarUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Chairside Active',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '08:30 – 17:00',
    location: 'Operatory 01 (Restorative)',
    locationIcon: 'chair',
    patientFlow: { current: 7, total: 8, percentage: 87.5 },
    actions: [
      { label: 'Schedule', icon: 'calendar_clock', actionKey: 'schedule' },
      { label: 'Reassign Operatory', icon: 'sync_alt', primary: true, actionKey: 'reassign' },
    ],
  },
  {
    id: 'staff-2',
    name: 'Dr. Sarah Bello, BDS, FWACS',
    role: 'Consultant Orthodontist',
    category: 'dentists',
    license: 'MDCN #DEN-90114',
    licenseTag: 'Fellow WACS',
    avatarUrl: 'https://images.unsplash.com/photo-1594824813511-20572b22ecdf?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Operatory 02',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '09:00 – 14:00',
    location: 'Maitama Outpost at 14:30',
    locationIcon: 'transfer_within_a_station',
    extraMeta: 'Rotating inter-branch coverage protocol',
    actions: [
      { label: 'Roster', icon: 'history', actionKey: 'roster' },
      { label: 'Branch Handover', icon: 'share', primary: true, actionKey: 'handover' },
    ],
  },
  {
    id: 'staff-3',
    name: 'Nurse Zainab Tariq, RN',
    role: 'Head Chairside Nurse & IPC Lead',
    category: 'nurses',
    license: 'NMCN #RN-48201',
    licenseTag: 'IPC Lead',
    avatarUrl: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'IPC Validated',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '08:00 – 16:30',
    location: 'Sterilization Bay & Suite 01',
    locationIcon: 'clean_hands',
    extraMeta: 'Morning autoclave cycle audit completed (100% pass)',
    actions: [
      { label: 'Profile', icon: 'badge', actionKey: 'profile' },
      { label: 'Task Queue (4)', icon: 'checklist', primary: true, actionKey: 'taskqueue' },
    ],
  },
  {
    id: 'staff-4',
    name: 'Grace Ibrahim',
    role: 'Senior Receptionist & Triage Desk',
    category: 'admin',
    license: 'Front Desk Operations',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Reception Desk',
    statusBadgeStyle: 'bg-[#e2e7ff] text-[#131b2e] border border-[#dae2fd]',
    statusDotColor: 'bg-[#006194]',
    shiftTime: '08:00 – 17:00',
    location: 'Terminal #01 (Triage)',
    locationIcon: 'desktop_windows',
    actions: [
      { label: 'Message', icon: 'chat', actionKey: 'message' },
      { label: 'Desk Shift', icon: 'swap_horiz', primary: true, actionKey: 'deskshift' },
    ],
  },
  {
    id: 'staff-5',
    name: 'Dr. Michael James, DDS',
    role: 'Associate Dental Surgeon',
    category: 'dentists',
    license: 'MDCN #DEN-88210',
    avatarUrl: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Starts 11:00 AM',
    statusBadgeStyle: 'bg-[#e2e7ff] text-[#3f4850] border border-[#bfc7d2]',
    statusDotColor: 'bg-[#707881]',
    shiftTime: '11:00 – 19:30',
    location: 'Suite 03 (CBCT & Surgery)',
    locationIcon: 'radiology',
    actions: [
      { label: 'Ping Doctor', icon: 'notifications_active', actionKey: 'ping' },
      { label: 'Pre-Check In', icon: 'check', primary: true, actionKey: 'precheck' },
    ],
  },
  {
    id: 'staff-6',
    name: 'Nurse Amina Yusuf, RN',
    role: 'Chairside Dental Nurse',
    category: 'nurses',
    license: 'NMCN #RN-59124',
    licenseTag: 'BLS Certified',
    avatarUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Chairside Active',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '08:30 – 17:00',
    location: 'Operatory 02 (Orthodontics)',
    locationIcon: 'chair',
    extraMeta: 'Assisting Dr. Sarah Bello with appliance cementation',
    actions: [
      { label: 'Profile', icon: 'badge', actionKey: 'profile' },
      { label: 'Supplies Req.', icon: 'inventory_2', primary: true, actionKey: 'supplies' },
    ],
  },
  {
    id: 'staff-7',
    name: 'Chidinma Eze, RDH',
    role: 'Registered Dental Hygienist',
    category: 'hygienists',
    license: 'MDCN #HYG-1104',
    licenseTag: 'Periodontal Care',
    avatarUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'In Hygiene Bay',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '09:00 – 16:30',
    location: 'Hygiene Bay 01',
    locationIcon: 'clean_hands',
    patientFlow: { current: 4, total: 6, percentage: 66.7 },
    actions: [
      { label: 'Schedule', icon: 'calendar_clock', actionKey: 'schedule' },
      { label: 'Recall Queue', icon: 'replay', primary: true, actionKey: 'recall' },
    ],
  },
  {
    id: 'staff-8',
    name: 'Funke Balogun',
    role: 'Patient Care Coordinator',
    category: 'admin',
    license: 'Billing & NHIS Liaison',
    avatarUrl: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Front Office',
    statusBadgeStyle: 'bg-[#e2e7ff] text-[#131b2e] border border-[#dae2fd]',
    statusDotColor: 'bg-[#006194]',
    shiftTime: '09:00 – 18:00',
    location: 'Accounts & Claims Desk',
    locationIcon: 'credit_card',
    actions: [
      { label: 'Message', icon: 'chat', actionKey: 'message' },
      { label: 'Billing Queue', icon: 'receipt_long', primary: true, actionKey: 'billing' },
    ],
  },
  {
    id: 'staff-9',
    name: 'Dr. Nnamdi Kalu, BDS',
    role: 'Periodontist & Implant Surgeon',
    category: 'dentists',
    license: 'MDCN #DEN-63102',
    avatarUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Rota Off / Leave',
    statusBadgeStyle: 'bg-[#f2f3ff] text-[#707881] border border-[#dae2fd]',
    statusDotColor: 'bg-[#707881]',
    shiftTime: 'Off Rota',
    location: 'Resumes Thursday (Surgery Block)',
    locationIcon: 'event_busy',
    actions: [
      { label: 'Roster History', icon: 'history', actionKey: 'roster' },
      { label: 'Request Shift', icon: 'add_alarm', primary: true, actionKey: 'request_shift' },
    ],
  },
  {
    id: 'staff-10',
    name: 'Nurse Peter Okafor, RN',
    role: 'Sterilization & IPC Technician',
    category: 'nurses',
    license: 'NMCN #RN-60211',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    statusBadge: 'Sterilization Bay',
    statusBadgeStyle: 'bg-[#86f2e4]/30 text-[#005049] border border-[#86f2e4]/50',
    statusDotColor: 'bg-[#006a61]',
    shiftTime: '07:30 – 16:00',
    location: 'Central Decontamination Unit',
    locationIcon: 'sanitizer',
    actions: [
      { label: 'Autoclave Log', icon: 'assignment', actionKey: 'autoclave' },
      { label: 'Bio-Indicators', icon: 'biotech', primary: true, actionKey: 'bio' },
    ],
  },
];

export const StaffOperationsOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  const [selectedBranch, setSelectedBranch] = useState('Wuse 2 Branch');
  const [selectedCategory, setSelectedCategory] = useState<RoleCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'more' | 'overview' | 'schedule' | 'patients' | 'clinical'>('more');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showCoverageModal, setShowCoverageModal] = useState(false);
  const [coverageRole, setCoverageRole] = useState('dentist');
  const [coverageShift, setCoverageShift] = useState('afternoon');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredStaff = STAFF_DATA.filter((staff) => {
    const matchesCategory = selectedCategory === 'all' || staff.category === selectedCategory;
    const matchesQuery =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.license.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const categoryCounts = {
    all: STAFF_DATA.length,
    dentists: STAFF_DATA.filter((s) => s.category === 'dentists').length,
    nurses: STAFF_DATA.filter((s) => s.category === 'nurses').length,
    hygienists: STAFF_DATA.filter((s) => s.category === 'hygienists').length,
    admin: STAFF_DATA.filter((s) => s.category === 'admin').length,
  };

  const handleAction = (staffName: string, actionKey: string, label: string) => {
    if (actionKey === 'schedule' || actionKey === 'roster') {
      navigate('/clinic-operations/calendar');
    } else if (actionKey === 'reassign' || actionKey === 'deskshift') {
      showToast(`${label} confirmed for ${staffName}. Shift reallocated.`);
    } else if (actionKey === 'handover') {
      showToast(`Branch handover token generated for ${staffName} to Maitama Outpost.`);
    } else if (actionKey === 'message' || actionKey === 'ping') {
      showToast(`Direct broadcast chime sent to ${staffName}.`);
    } else if (actionKey === 'taskqueue' || actionKey === 'precheck' || actionKey === 'supplies') {
      showToast(`${label} opened for ${staffName}.`);
    } else {
      showToast(`${label} action triggered for ${staffName}.`);
    }
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="fixed top-0 w-full z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center min-w-0 max-w-[60%] gap-3">
            <div
              onClick={() => navigate('/clinic-operations')}
              className="w-10 h-10 rounded-xl bg-[#007bb9] text-white flex items-center justify-center flex-shrink-0 shadow-sm cursor-pointer hover:bg-[#006194] transition-colors"
            >
              <Icon name="dentistry" className="text-[22px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div
                onClick={() => navigate('/clinic-operations/branches')}
                className="flex items-center gap-1.5 cursor-pointer group"
              >
                <span className="font-semibold text-sm md:text-base text-[#131b2e] group-hover:text-[#006194] truncate transition-colors">
                  BrightSmile Dental OS
                </span>
                <Icon name="expand_more" className="text-[#707881] text-[18px]" />
              </div>
              <span className="text-xs text-[#006a61] truncate font-medium">Staff Operations & Chairside Roster</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => navigate('/clinic-operations/calendar')}
              className="px-3 py-1.5 rounded-lg border border-[#dae2fd] bg-white text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors hidden sm:flex items-center gap-1.5"
            >
              <Icon name="calendar_month" className="text-[16px]" />
              <span>Full Schedule</span>
            </button>
            <button
              aria-label="Notifications"
              onClick={() => showToast('No pending roster alerts')}
              className="relative w-10 h-10 flex items-center justify-center text-[#3f4850] hover:text-[#131b2e] transition-colors rounded-full hover:bg-[#eaedff]"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center flex-shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto w-full flex-1">
        {/* Sub-Header / Contextual Clinic Branch Bar */}
        <div className="py-3 flex flex-wrap items-center justify-between gap-3 border-b border-[#dae2fd]/50 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66] shadow-sm">
              <Icon name="location_on" className="text-[20px]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <select
                  value={selectedBranch}
                  onChange={(e) => setSelectedBranch(e.target.value)}
                  className="font-semibold text-sm md:text-base text-[#131b2e] bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value="Wuse 2 Branch">Wuse 2 Branch</option>
                  <option value="Garki Main Hospital">Garki Main Hospital</option>
                  <option value="Maitama Specialized Centre">Maitama Specialized Centre</option>
                  <option value="Central Business District Hub">Central Business District Hub</option>
                </select>
                <Icon name="swap_horiz" className="text-[#707881] text-[18px]" />
              </div>
              <p className="text-xs text-[#006a61] font-medium">Federal Capital Territory, Abuja</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-[#006a61] border border-[#86f2e4]/60">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-xs font-semibold tracking-wide uppercase">Live Shift Active</span>
            </div>
            <button
              onClick={() => setShowCoverageModal(true)}
              className="px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#004b73] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Icon name="person_add" className="text-[16px]" />
              <span>Coverage Request</span>
            </button>
          </div>
        </div>

        {/* Page Headline & Operational Pitch */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-['Plus_Jakarta_Sans',sans-serif] text-[#131b2e] tracking-tight">
              Staff Operations & Roster
            </h1>
            <p className="text-sm md:text-base text-[#3f4850] mt-1">
              Operational team management, active shifts, operatory assignments & chairside coverage.
            </p>
          </div>
          {/* Search Box */}
          <div className="w-full md:w-80 relative">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search staff, license, role..."
              className="w-full pl-10 pr-4 py-2 bg-white rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] placeholder-[#707881] focus:outline-none focus:border-[#006194] focus:ring-1 focus:ring-[#006194] shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#707881] hover:text-[#131b2e]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Branch Staffing Metrics Grid (4 cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Active Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Active Today</span>
              <span className="w-7 h-7 rounded-lg bg-[#86f2e4]/50 text-[#006f66] flex items-center justify-center">
                <Icon name="how_to_reg" className="text-[18px]" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">6</span>
              <span className="text-xs text-[#3f4850]">/ 10 rostered</span>
            </div>
            {/* Progress bar pill */}
            <div className="w-full bg-[#e2e7ff] h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-[#006a61] h-full rounded-full transition-all duration-500" style={{ width: '60%' }}></div>
            </div>
          </div>

          {/* Chairside Dentists Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Chairside</span>
              <span className="w-7 h-7 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="dentistry" className="text-[18px]" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-[#006194] font-['Plus_Jakarta_Sans',sans-serif]">3</span>
              <span className="text-xs text-[#3f4850]">in operatories</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[#006194] text-xs font-semibold">
              <Icon name="check_circle" className="text-[16px]" />
              <span className="truncate">Full 100% Chair Cover</span>
            </div>
          </div>

          {/* Nurses & IPC Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Nurses & IPC</span>
              <span className="w-7 h-7 rounded-lg bg-[#89f5e7] text-[#00201d] flex items-center justify-center">
                <Icon name="sanitizer" className="text-[18px]" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-[#006a61] font-['Plus_Jakarta_Sans',sans-serif]">2</span>
              <span className="text-xs text-[#3f4850]">sterilization bay</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[#006a61] text-xs font-semibold">
              <Icon name="verified_user" className="text-[16px]" />
              <span className="truncate">1 IPC Lead Active</span>
            </div>
          </div>

          {/* Off Rota Card */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-[#dae2fd]/60 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#3f4850] uppercase tracking-wider">Rota Off / Leave</span>
              <span className="w-7 h-7 rounded-lg bg-[#eaedff] text-[#3f4850] flex items-center justify-center">
                <Icon name="event_busy" className="text-[18px]" />
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl md:text-3xl font-bold text-[#3f4850] font-['Plus_Jakarta_Sans',sans-serif]">4</span>
              <span className="text-xs text-[#707881]">members</span>
            </div>
            <div className="flex items-center gap-1.5 mt-3 text-[#707881] text-xs">
              <Icon name="update" className="text-[16px]" />
              <span className="truncate">Next cycle: Tomorrow 08:00</span>
            </div>
          </div>
        </div>

        {/* Role Category Horizontal Filter Chips */}
        <div className="mb-6 overflow-x-auto scrollbar-none py-1 flex items-center gap-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm transition-all flex items-center gap-2 ${
              selectedCategory === 'all'
                ? 'bg-[#006194] text-white shadow-md'
                : 'bg-white text-[#3f4850] hover:text-[#131b2e] border border-[#dae2fd]'
            }`}
          >
            <span>All Staff</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
              }`}
            >
              {categoryCounts.all}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('dentists')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm transition-all flex items-center gap-2 ${
              selectedCategory === 'dentists'
                ? 'bg-[#006194] text-white shadow-md'
                : 'bg-white text-[#3f4850] hover:text-[#131b2e] border border-[#dae2fd]'
            }`}
          >
            <span>Dentists</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                selectedCategory === 'dentists' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
              }`}
            >
              {categoryCounts.dentists}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('nurses')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm transition-all flex items-center gap-2 ${
              selectedCategory === 'nurses'
                ? 'bg-[#006194] text-white shadow-md'
                : 'bg-white text-[#3f4850] hover:text-[#131b2e] border border-[#dae2fd]'
            }`}
          >
            <span>Chairside Nurses</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                selectedCategory === 'nurses' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
              }`}
            >
              {categoryCounts.nurses}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('hygienists')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm transition-all flex items-center gap-2 ${
              selectedCategory === 'hygienists'
                ? 'bg-[#006194] text-white shadow-md'
                : 'bg-white text-[#3f4850] hover:text-[#131b2e] border border-[#dae2fd]'
            }`}
          >
            <span>Hygienists</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                selectedCategory === 'hygienists' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
              }`}
            >
              {categoryCounts.hygienists}
            </span>
          </button>

          <button
            onClick={() => setSelectedCategory('admin')}
            className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap shadow-sm transition-all flex items-center gap-2 ${
              selectedCategory === 'admin'
                ? 'bg-[#006194] text-white shadow-md'
                : 'bg-white text-[#3f4850] hover:text-[#131b2e] border border-[#dae2fd]'
            }`}
          >
            <span>Reception & Admin</span>
            <span
              className={`px-2 py-0.5 rounded-full text-[11px] ${
                selectedCategory === 'admin' ? 'bg-white/20 text-white' : 'bg-[#eaedff] text-[#3f4850]'
              }`}
            >
              {categoryCounts.admin}
            </span>
          </button>
        </div>

        {/* Staff Roster Cards List (Responsive Grid: 1 col on mobile, 2 cols on lg screens) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-4 md:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="relative flex-shrink-0">
                      <img
                        className="w-13 h-13 md:w-14 md:h-14 rounded-full object-cover shadow-sm ring-2 ring-[#eaedff]"
                        src={staff.avatarUrl}
                        alt={staff.name}
                      />
                      <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-white ring-2 ring-white flex items-center justify-center">
                        <span className={`w-2.5 h-2.5 rounded-full ${staff.statusDotColor}`}></span>
                      </span>
                    </div>

                    <div className="min-w-0">
                      <h2 className="font-semibold text-base md:text-lg text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                        {staff.name}
                      </h2>
                      <p className="text-xs md:text-sm text-[#3f4850] truncate">{staff.role}</p>

                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <span className="text-[11px] font-mono font-medium text-[#707881] uppercase tracking-wider bg-[#f2f3ff] px-2 py-0.5 rounded">
                          {staff.license}
                        </span>
                        {staff.licenseTag && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-[#bfc7d2]"></span>
                            <span className="text-xs text-[#006a61] font-semibold flex items-center gap-1">
                              <Icon name="verified" className="text-[13px]" /> {staff.licenseTag}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span
                    className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${staff.statusBadgeStyle}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${staff.statusDotColor}`}></span>
                    <span className="hidden sm:inline">{staff.statusBadge}</span>
                    <span className="sm:hidden">{staff.statusBadge.split(' ')[0]}</span>
                  </span>
                </div>

                {/* Shift & Operatory Metadata */}
                <div className="mt-4 bg-[#f2f3ff] rounded-xl p-3 flex flex-col gap-2">
                  <div className="flex items-center justify-between text-xs md:text-sm flex-wrap gap-2">
                    <div className="flex items-center gap-1.5 text-[#131b2e]">
                      <Icon name="schedule" className="text-[18px] text-[#006194]" />
                      <span className="font-semibold">{staff.shiftTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#006a61] font-medium">
                      <Icon name={staff.locationIcon} className="text-[18px]" />
                      <span>{staff.location}</span>
                    </div>
                  </div>

                  {/* Extra Meta or Patient Flow */}
                  {staff.patientFlow && (
                    <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[#3f4850]">Patient Flow:</span>
                        <span className="text-xs font-bold text-[#006194]">
                          {staff.patientFlow.current} of {staff.patientFlow.total} completed
                        </span>
                      </div>
                      <div className="w-28 bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-[#006194] h-full rounded-full transition-all duration-500"
                          style={{ width: `${staff.patientFlow.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {staff.extraMeta && (
                    <div className="pt-2 border-t border-[#dae2fd]/60 flex items-center gap-1.5 text-xs text-[#707881]">
                      <Icon name="info" className="text-[15px] text-[#006194]" />
                      <span className="truncate">{staff.extraMeta}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Footer */}
              <div className="bg-[#f2f3ff]/60 px-4 md:px-5 py-3 border-t border-[#dae2fd]/50 flex items-center justify-end gap-2.5">
                {staff.actions.map((act, i) => (
                  <button
                    key={i}
                    onClick={() => handleAction(staff.name, act.actionKey, act.label)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5 ${
                      act.primary
                        ? 'bg-[#007bb9] text-white hover:bg-[#006194]'
                        : 'bg-white text-[#131b2e] hover:bg-[#eaedff] border border-[#dae2fd]'
                    }`}
                  >
                    <Icon name={act.icon} className="text-[16px]" />
                    <span>{act.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Regulatory Notice Guardrail Box */}
        <div className="bg-[#f2f3ff] rounded-2xl p-4 md:p-5 flex items-start gap-3.5 border border-[#dae2fd] shadow-sm mb-6">
          <div className="w-9 h-9 rounded-xl bg-[#006194]/10 text-[#006194] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm md:text-base text-[#131b2e] font-semibold font-['Plus_Jakarta_Sans',sans-serif]">
              Statutory Compliance Guardrail
            </span>
            <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed">
              Clinical credentials and Medical/Dental Council of Nigeria (MDCN) licenses are verified under Section 15 & 17. Operational managers coordinate daily shifts without altering statutory credentials.
            </p>
          </div>
        </div>

        {/* Bottom Primary Action Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => setShowCoverageModal(true)}
            className="w-full h-12 rounded-xl bg-[#006194] text-white text-sm md:text-base font-semibold shadow-md hover:bg-[#004b73] active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
          >
            <Icon name="person_add" className="text-[20px]" />
            <span>Request Staff Coverage</span>
          </button>
          <button
            onClick={() => showToast('Shift roster PDF generated and downloaded successfully.')}
            className="w-full h-12 rounded-xl bg-white text-[#131b2e] text-sm md:text-base font-semibold border border-[#dae2fd] shadow-sm hover:bg-[#eaedff] active:scale-[0.99] flex items-center justify-center gap-2 transition-all"
          >
            <Icon name="picture_as_pdf" className="text-[20px] text-[#006194]" />
            <span>Export Daily Shift Roster (PDF)</span>
          </button>
        </div>
      </main>

      {/* Request Coverage Modal */}
      {showCoverageModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="person_add" className="text-[18px]" />
                </div>
                <h3 className="font-bold text-base text-[#131b2e]">Request Coverage</h3>
              </div>
              <button
                onClick={() => setShowCoverageModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Required Role
                </label>
                <select
                  value={coverageRole}
                  onChange={(e) => setCoverageRole(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="dentist">Dentist (Restorative / Endo)</option>
                  <option value="nurse">Chairside Dental Nurse</option>
                  <option value="hygienist">Dental Hygienist</option>
                  <option value="receptionist">Reception / Desk Admin</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Shift Timing
                </label>
                <select
                  value={coverageShift}
                  onChange={(e) => setCoverageShift(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                >
                  <option value="morning">Morning Shift (08:00 – 14:00)</option>
                  <option value="afternoon">Afternoon Shift (13:00 – 19:30)</option>
                  <option value="full">Full Day Coverage (08:00 – 18:00)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Reason for Request
                </label>
                <input
                  type="text"
                  placeholder="e.g. Surge in walk-ins, sick leave"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowCoverageModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowCoverageModal(false);
                  showToast('Coverage broadcast sent to available regional roster pool.');
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#006194] text-white hover:bg-[#004b73]"
              >
                Dispatch Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Nav Bar */}
      <nav className="fixed bottom-0 w-full z-40 pb-safe bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#dae2fd]/70 shadow-[0_-2px_12px_rgba(15,23,42,0.04)]">
        <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
          <button
            onClick={() => {
              setActiveTab('overview');
              navigate('/clinic-operations');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'overview' ? 'text-[#006194] font-semibold' : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[11px] mt-0.5">Overview</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('schedule');
              navigate('/clinic-operations/calendar');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'schedule' ? 'text-[#006194] font-semibold' : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="calendar_today" className="text-[22px]" />
            <span className="text-[11px] mt-0.5">Schedule</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('patients');
              navigate('/clinic-operations/waiting-queue');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'patients' ? 'text-[#006194] font-semibold' : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="group" className="text-[22px]" />
            <span className="text-[11px] mt-0.5">Patients</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('clinical');
              navigate('/clinic-operations/reception-desk');
            }}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'clinical' ? 'text-[#006194] font-semibold' : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="stethoscope" className="text-[22px]" />
            <span className="text-[11px] mt-0.5">Clinical</span>
          </button>

          <button
            onClick={() => setActiveTab('more')}
            className={`flex flex-col items-center justify-center w-14 h-12 transition-colors ${
              activeTab === 'more' ? 'text-[#006194] font-semibold' : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            <Icon name="more_horiz" className="text-[22px]" />
            <span className="text-[11px] mt-0.5">More</span>
          </button>
        </div>
      </nav>

      <QuickLinks
        title="Staff & Teams"
        links={[
          { to: '/clinic-operations/shift-timetable', label: 'Shift Timetable', icon: 'schedule' },
          { to: '/clinic-operations/tasks', label: 'Clinic Tasks', icon: 'assignment' },
          { to: '/staff-management/dashboard', label: 'Staff Management Portal', icon: 'groups' },
        ]}
      />
    </div>
  );
};
