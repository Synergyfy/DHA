import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type FilterStatus = 'all' | 'pending' | 'accepted' | 'expired' | 'revoked';

interface InvitationItem {
  id: string;
  code: string;
  name: string;
  role: string;
  avatarText: string;
  avatarBg: string;
  avatarColor: string;
  status: 'pending' | 'accepted' | 'expiring' | 'expired' | 'revoked';
  statusBadge: string;
  statusBadgeClass: string;
  timeLeft: string;
  dispatchedAt: string;
  email: string;
  phone?: string;
  branch: string;
  subNotice?: string;
  isUrgent?: boolean;
  tokenInfo?: string;
}

const INVITATIONS_DATA: InvitationItem[] = [
  {
    id: 'INV-STAFF-2026-088',
    code: '#INV-STAFF-2026-088',
    name: 'Dr. Daniel Musa, BDS',
    role: 'Associate Dentist • General Restorative',
    avatarText: 'DM',
    avatarBg: 'bg-[#cce5ff]',
    avatarColor: 'text-[#006194]',
    status: 'pending',
    statusBadge: 'Pending Acceptance',
    statusBadgeClass: 'bg-[#86f2e4]/30 text-[#006a61]',
    timeLeft: '6d 22h left',
    dispatchedAt: 'Dispatched 22 Oct, 09:15 AM',
    email: 'daniel.musa@dha-health.ng',
    phone: '+234 802 334 9182',
    branch: 'Wuse 2 Main Branch (+ Maitama)',
    tokenInfo: 'Token v2.4 Active',
  },
  {
    id: 'INV-STAFF-2026-089',
    code: '#INV-STAFF-2026-089',
    name: 'Amina Yusuf',
    role: 'Chairside Dental Nurse (IPC & Operatory)',
    avatarText: 'AY',
    avatarBg: 'bg-[#86f2e4]/40',
    avatarColor: 'text-[#006a61]',
    status: 'pending',
    statusBadge: 'Pending Registration',
    statusBadgeClass: 'bg-[#cde5ff] text-[#004b74]',
    timeLeft: '6d 23h left',
    dispatchedAt: 'Dispatched Today, 08:30 AM',
    email: 'amina.yusuf@gmail.com',
    branch: 'Wuse 2 Main Branch',
    tokenInfo: 'Awaiting self-signup',
  },
  {
    id: 'INV-STAFF-2026-084',
    code: '#INV-STAFF-2026-084',
    name: 'David James',
    role: 'Billing & Insurance Claims Officer',
    avatarText: 'DJ',
    avatarBg: 'bg-[#ffdad6]',
    avatarColor: 'text-[#ba1a1a]',
    status: 'expiring',
    statusBadge: 'Expires in 18h',
    statusBadgeClass: 'bg-[#ffdad6] text-[#ba1a1a] font-bold animate-pulse',
    timeLeft: 'Expires in 18h',
    dispatchedAt: 'Dispatched 16 Oct, 11:00 AM',
    email: 'd.james.finance@gmail.com',
    branch: 'Maitama Specialist Centre',
    subNotice: 'Recipient opened link twice but has not completed 2FA phone confirmation.',
    isUrgent: true,
  },
  {
    id: 'INV-STAFF-2026-082',
    code: '#INV-STAFF-2026-082',
    name: 'Nurse Fatima Noor',
    role: 'Senior Chairside Nurse • RN Lead',
    avatarText: 'FN',
    avatarBg: 'bg-[#89f5e7]',
    avatarColor: 'text-[#00201d]',
    status: 'accepted',
    statusBadge: 'Accepted',
    statusBadgeClass: 'bg-[#86f2e4]/40 text-[#006a61] font-bold',
    timeLeft: 'Accepted',
    dispatchedAt: 'Accepted Yesterday, 14:15 WAT',
    email: 'f.noor@harmonydental.ng',
    branch: 'Branch 01 • Wuse 2 Main',
    subNotice: 'Affiliation Active • Shift Roster Synced',
  },
];

export const PendingInvitationsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [invitations, setInvitations] = useState<InvitationItem[]>(INVITATIONS_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCopyLink = (code: string) => {
    navigator.clipboard?.writeText(`https://harmony-dental.ng/join/${code}`);
    triggerToast('Secure invite link copied with 256-bit token!');
  };

  const handleResend = (name: string) => {
    triggerToast(`Invitation re-sent to ${name}`);
  };

  const handleExtend = (id: string) => {
    setInvitations((prev) =>
      prev.map((inv) =>
        inv.id === id ? { ...inv, status: 'pending', timeLeft: '7d left', isUrgent: false, statusBadge: 'Extended +7 Days', statusBadgeClass: 'bg-[#86f2e4]/30 text-[#006a61]' } : inv
      )
    );
    triggerToast('Invitation extended by 7 calendar days.');
  };

  const handleRevoke = (id: string, name: string) => {
    if (confirm(`Revoke invitation for ${name}?`)) {
      setInvitations((prev) => prev.filter((inv) => inv.id !== id));
      triggerToast(`Invitation for ${name} has been revoked.`);
    }
  };

  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      // Filter status
      if (activeFilter === 'pending') {
        if (inv.status !== 'pending' && inv.status !== 'expiring') return false;
      } else if (activeFilter === 'accepted') {
        if (inv.status !== 'accepted') return false;
      } else if (activeFilter === 'expired') {
        if (inv.status !== 'expired' && inv.status !== 'expiring') return false;
      } else if (activeFilter === 'revoked') {
        if (inv.status !== 'revoked') return false;
      }

      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          inv.name.toLowerCase().includes(q) ||
          inv.code.toLowerCase().includes(q) ||
          inv.email.toLowerCase().includes(q) ||
          inv.role.toLowerCase().includes(q)
        );
      }

      return true;
    });
  }, [invitations, activeFilter, searchQuery]);

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
                Harmony Dental Group
              </span>
              <span className="text-xs text-[#006a61] font-medium">Wuse 2 Main Branch</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => triggerToast('Notification: 1 staff invite requires authorization.')}
              aria-label="Notifications"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#f2f3ff] transition-colors relative"
            >
              <Icon name="notifications" className="text-xl" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]"></span>
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
        {/* Screen Context Header Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Pending Invitations
            </h1>
            <p className="text-xs md:text-sm text-[#3f4850] mt-1">
              Track dispatched staff invitations, token expirations & delivery status
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/staff-management/add')}
              className="px-4 py-2.5 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="person_add" className="text-base" />
              <span>+ Invite New Staff</span>
            </button>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative w-full">
            <Icon name="search" className="text-xl text-[#707881] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search invitee name, phone, email, reference..."
              className="w-full h-12 pl-12 pr-11 bg-white text-[#131b2e] rounded-2xl shadow-xs border border-[#eaedff] font-['Inter'] text-sm placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
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

          {/* Filter Chips Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>All</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                4
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('pending')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                activeFilter === 'pending'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Pending</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeFilter === 'pending' ? 'bg-white/20 text-white' : 'bg-[#dae2fd] text-[#131b2e]'}`}>
                3
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('accepted')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                activeFilter === 'accepted'
                  ? 'bg-[#006a61] text-white shadow-xs'
                  : 'bg-[#86f2e4]/30 text-[#006a61] hover:bg-[#86f2e4]/50'
              }`}
            >
              <span>Accepted</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeFilter === 'accepted' ? 'bg-white/20 text-white' : 'bg-[#86f2e4] text-[#00201d]'}`}>
                1
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveFilter('expired')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
                activeFilter === 'expired'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#ffdad6]/60 text-[#ba1a1a] hover:bg-[#ffdad6]'
              }`}
            >
              <span>Expired / Urgent</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeFilter === 'expired' ? 'bg-white/20 text-white' : 'bg-[#ffdad6] text-[#ba1a1a]'}`}>
                1
              </span>
            </button>
          </div>

          {/* Security Protocol Advisory Banner */}
          <div className="p-4 bg-white rounded-2xl shadow-xs border border-[#eaedff] flex items-start gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#cde5ff] text-[#004b74] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="security" className="text-base" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#006194] flex items-center gap-1">
                <span>Security Protocol</span>
                <Icon name="verified_user" className="text-xs" />
              </p>
              <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
                Invitations expire automatically after 7 calendar days. Cryptographic tokens link directly to national MDCN registry for regulated dental practitioners.
              </p>
            </div>
          </div>
        </div>

        {/* Invitation Cards Stream (Responsive Grid on larger screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredInvitations.map((inv) => (
            <div
              key={inv.id}
              className={`w-full bg-white rounded-2xl p-5 shadow-xs border flex flex-col justify-between gap-4 transition-all hover:shadow-md ${
                inv.isUrgent ? 'border-[#ba1a1a]/40 bg-[#ffdad6]/10' : 'border-[#eaedff]'
              }`}
            >
              <div className="space-y-3">
                {/* Status Ribbon & Profile Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-11 h-11 rounded-xl ${inv.avatarBg} ${inv.avatarColor} flex items-center justify-center shrink-0 font-['Plus_Jakarta_Sans'] font-bold text-base shadow-inner`}>
                      {inv.avatarText}
                    </div>
                    <div className="min-w-0 flex flex-col">
                      <h2 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e] truncate flex items-center gap-1">
                        <span>{inv.name}</span>
                        {inv.name.includes('Dr.') && (
                          <Icon name="verified" className="text-sm text-[#006194]" />
                        )}
                      </h2>
                      <span className="text-xs text-[#3f4850] truncate">{inv.role}</span>
                    </div>
                  </div>

                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${inv.statusBadgeClass}`}>
                    <Icon name={inv.isUrgent ? 'warning' : 'schedule'} className="text-xs" />
                    <span>{inv.timeLeft}</span>
                  </span>
                </div>

                {/* Reference & Dispatch Timestamp */}
                <div className="flex items-center justify-between text-xs font-mono bg-[#f2f3ff] px-3 py-1.5 rounded-xl border border-[#dae2fd]/50">
                  <span className="font-semibold text-[#006194]">{inv.code}</span>
                  <span className="flex items-center gap-1 text-[#707881]">
                    <Icon name="forward_to_inbox" className="text-xs" />
                    <span>{inv.dispatchedAt}</span>
                  </span>
                </div>

                {/* Contact and Details */}
                <div className="grid grid-cols-1 gap-1.5 text-xs text-[#3f4850]">
                  <div className="flex items-center gap-2 truncate">
                    <Icon name="mail" className="text-sm text-[#707881] shrink-0" />
                    <span className="truncate text-[#131b2e] font-medium">{inv.email}</span>
                  </div>
                  {inv.phone && (
                    <div className="flex items-center gap-2 truncate">
                      <Icon name="call" className="text-sm text-[#707881] shrink-0" />
                      <span className="text-[#131b2e]">{inv.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 truncate">
                    <Icon name="apartment" className="text-sm text-[#707881] shrink-0" />
                    <span className="truncate text-[#3f4850]">{inv.branch}</span>
                  </div>
                </div>

                {/* Notice or Token Info */}
                {inv.subNotice && (
                  <div className={`p-2.5 rounded-xl text-xs flex items-center gap-2 ${
                    inv.isUrgent
                      ? 'bg-[#ffdad6] text-[#ba1a1a] font-medium'
                      : 'bg-[#f2f3ff] text-[#3f4850]'
                  }`}>
                    <Icon name={inv.isUrgent ? 'phonelink_lock' : 'check_circle'} className="text-base shrink-0" />
                    <span className="leading-snug">{inv.subNotice}</span>
                  </div>
                )}

                {inv.tokenInfo && !inv.subNotice && (
                  <div className="flex items-center gap-2 text-xs">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${inv.statusBadgeClass}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                      <span>{inv.statusBadge}</span>
                    </span>
                    <span className="text-[#707881] font-mono text-[11px]">{inv.tokenInfo}</span>
                  </div>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="pt-2 border-t border-[#eaedff]">
                {inv.status === 'accepted' ? (
                  <button
                    type="button"
                    onClick={() => navigate('/staff-management/profile/STF-BEL-05')}
                    className="w-full h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Icon name="badge" className="text-base text-[#006194]" />
                    <span>View Staff Profile (17.3)</span>
                    <Icon name="arrow_forward" className="text-sm text-[#707881] ml-auto" />
                  </button>
                ) : inv.isUrgent ? (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleExtend(inv.id)}
                      className="h-10 px-2 rounded-xl bg-[#006194] text-white hover:bg-[#007bb9] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Icon name="more_time" className="text-sm" />
                      <span className="truncate">+7 Days</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerToast(`SMS alert dispatched to ${inv.name}`)}
                      className="h-10 px-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Icon name="sms" className="text-sm text-[#006194]" />
                      <span className="truncate">SMS Alert</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRevoke(inv.id, inv.name)}
                      className="h-10 px-2 rounded-xl bg-[#ffdad6]/60 hover:bg-[#ffdad6] text-[#ba1a1a] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Icon name="block" className="text-sm" />
                      <span className="truncate">Revoke</span>
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleResend(inv.name)}
                      className="h-10 px-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Icon name="send" className="text-sm text-[#006194]" />
                      <span>Resend</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCopyLink(inv.code)}
                      className="h-10 px-2 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Icon name="link" className="text-sm text-[#707881]" />
                      <span>Copy</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate(`/staff-management/invitation/${inv.id}`)}
                      className="h-10 px-2 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-xs"
                    >
                      <Icon name="folder_shared" className="text-sm" />
                      <span>Dossier</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredInvitations.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#eaedff] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] mx-auto">
              <Icon name="search_off" className="text-2xl" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
              No invitations found
            </h3>
            <p className="text-xs text-[#3f4850] max-w-sm mx-auto">
              No pending staff invitations match your query.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#006194] font-semibold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* Floating CTA for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          type="button"
          onClick={() => navigate('/staff-management/add')}
          className="h-13 px-5 rounded-full bg-[#006194] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-2 shadow-xl hover:bg-[#007bb9] active:scale-95 transition-all"
        >
          <Icon name="person_add" className="text-lg" />
          <span>+ Invite New Staff</span>
        </button>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10 animate-fade-in">
          <Icon name="mark_email_read" className="text-sm text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
