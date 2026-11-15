import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface RequestItem {
  id: string;
  code: string;
  name: string;
  title: string;
  category: 'transfer' | 'role' | 'permission' | 'profile';
  status: 'pending' | 'approved' | 'rejected';
  statusBadge: string;
  statusBadgeType: 'urgent' | 'clinical' | 'finance' | 'approved';
  timestamp: string;
  initials: string;
  avatarBg: string;
  isVerified?: boolean;
  isSpecialist?: boolean;
  transferRoute?: { from: string; to: string };
  justification?: string;
  signoff?: string;
  elevationScope?: string;
  elevationDesc?: string;
  overrideDetails?: { label: string; amount: string; note: string };
  syncedNote?: string;
  syncedApprovedBy?: string;
}

export const StaffRequestsApprovalsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const requests: RequestItem[] = [
    {
      id: 'req-42',
      code: '#REQ-TRF-2026-042',
      name: 'Esther Bello, RDH',
      title: '#STF-BEL-05 • Registered Dental Hygienist',
      category: 'transfer',
      status: 'pending',
      statusBadge: 'Pending Clinical Review',
      statusBadgeType: 'urgent',
      timestamp: '18h ago',
      initials: 'EB',
      avatarBg: 'bg-[#86f2e4] text-[#006f66]',
      isVerified: true,
      transferRoute: { from: 'Wuse 2 Main', to: 'Gwarinpa Outpost' },
      justification: 'Relocation to Gwarinpa area; requests assignment to newly commissioned Gwarinpa preventive suite.',
      signoff: 'Samuel Eze & Dr. Sarah Okafor'
    },
    {
      id: 'req-39',
      code: '#REQ-ROL-2026-039',
      name: 'Dr. Daniel Musa',
      title: '#STF-MUS-09 • Associate Dentist',
      category: 'role',
      status: 'pending',
      statusBadge: 'Pending Medical Director',
      statusBadgeType: 'clinical',
      timestamp: '20 Oct 2026',
      initials: 'DM',
      avatarBg: 'bg-[#cce5ff] text-[#006194]',
      isSpecialist: true,
      elevationScope: 'Scope Elevation: Sessional Endodontic Triage',
      elevationDesc: 'Facility: Maitama Specialist Centre • Additional Level 2 diagnostic authorization.'
    },
    {
      id: 'req-38',
      code: '#REQ-PERM-2026-038',
      name: 'Grace Ibrahim',
      title: '#STF-IBR-08 • Senior Receptionist',
      category: 'permission',
      status: 'pending',
      statusBadge: 'Pending Finance Sign-Off',
      statusBadgeType: 'finance',
      timestamp: 'Yesterday',
      initials: 'GI',
      avatarBg: 'bg-[#dae2fd] text-[#131b2e]',
      overrideDetails: {
        label: 'Temporary Fee Waiver Override',
        amount: '₦15k → ₦25k',
        note: 'Requested temporary cap elevation from ₦15,000 to ₦25,000 during the upcoming Community Oral Health Week outreach desk.'
      }
    },
    {
      id: 'req-35',
      code: '#REQ-TRF-2026-035',
      name: 'Nurse Fatima Noor',
      title: 'Clinical Dental Nurse • Wuse 2',
      category: 'transfer',
      status: 'approved',
      statusBadge: 'Approved & Synced',
      statusBadgeType: 'approved',
      timestamp: 'Synced',
      initials: 'FN',
      avatarBg: 'bg-[#86f2e4] text-[#006f66]',
      syncedNote: 'Shift swap for Wuse 2 Saturday Morning Chairside cover (08:30 - 14:00 WAT).',
      syncedApprovedBy: 'Approved by Samuel Eze (Ops Mgr) yesterday'
    }
  ];

  const filteredRequests = requests.filter(r => {
    const matchesTab = activeTab === 'all' || r.status === activeTab;
    const matchesCat = selectedCategory === 'all' || r.category === selectedCategory;
    return matchesTab && matchesCat;
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
              onClick={() => triggerToast('Search requests')}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-28">
        {/* Header Summary */}
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-7 h-7 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center">
              <Icon name="checklist" className="text-sm" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
              Governance & Operations
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            Staff Requests & Approvals
          </h1>
          <p className="text-xs md:text-sm text-[#707881] mt-0.5 leading-snug">
            Operational staff transfer requests, role promotions, and privilege adjustments across Harmony branches.
          </p>
        </section>

        {/* Bento Metrics Counter Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {/* Metric 1 */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#707881]">Pending Review</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] uppercase">
                1 Urgent
              </span>
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#006194]">3</span>
              <span className="text-xs text-[#707881]">requests</span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#006194] h-full rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#707881]">Approved MTD</span>
              <Icon name="verified" className="text-[#006a61] text-base" filled />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#006a61]">12</span>
              <span className="text-xs text-[#006f66]">signed</span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#006a61] h-full rounded-full" style={{ width: '80%' }}></div>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#707881]">Rejected MTD</span>
              <Icon name="do_not_disturb_on" className="text-[#707881] text-base" />
            </div>
            <div className="mt-3 flex items-baseline gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">1</span>
              <span className="text-xs text-[#707881]">audit archived</span>
            </div>
            <div className="w-full bg-[#eaedff] h-1.5 rounded-full mt-2.5 overflow-hidden">
              <div className="bg-[#707881] h-full rounded-full" style={{ width: '6%' }}></div>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-[#707881]">Avg Turnaround</span>
              <Icon name="pace" className="text-[#006195] text-base" />
            </div>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#006195]">24.5</span>
              <span className="text-xs font-semibold text-[#006195]">hrs</span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-[#006a61] text-[10px] font-semibold">
              <Icon name="trending_down" className="text-xs" />
              <span>-3.2h vs last wk</span>
            </div>
          </div>
        </section>

        {/* Segmented Status Tabs */}
        <div className="bg-[#eaedff] p-1 rounded-xl flex items-center gap-1 max-w-md mb-4 shadow-inner">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex-1 py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
              activeTab === 'all'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            All <span className="opacity-70 text-[10px]">(16)</span>
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Pending <span className="opacity-70 text-[10px]">(3)</span>
          </button>
          <button
            onClick={() => setActiveTab('approved')}
            className={`flex-1 py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
              activeTab === 'approved'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Approved <span className="opacity-70 text-[10px]">(12)</span>
          </button>
          <button
            onClick={() => setActiveTab('rejected')}
            className={`flex-1 py-1.5 rounded-lg text-center text-xs font-semibold transition-all ${
              activeTab === 'rejected'
                ? 'bg-white text-[#006194] shadow-xs'
                : 'text-[#3f4850] hover:text-[#131b2e]'
            }`}
          >
            Rejected <span className="opacity-70 text-[10px]">(1)</span>
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 no-scrollbar text-nowrap">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
            }`}
          >
            All Categories
          </button>
          <button
            onClick={() => setSelectedCategory('transfer')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'transfer'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
            }`}
          >
            Branch Transfers
          </button>
          <button
            onClick={() => setSelectedCategory('role')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'role'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
            }`}
          >
            Role Changes
          </button>
          <button
            onClick={() => setSelectedCategory('permission')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              selectedCategory === 'permission'
                ? 'bg-[#006194] text-white shadow-xs'
                : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
            }`}
          >
            Additional Permissions
          </button>
        </div>

        {/* Requests Feed Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {filteredRequests.map((req) => (
            <article
              key={req.id}
              className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden flex flex-col justify-between hover:border-[#006194]/30 hover:shadow-sm transition-all"
            >
              <div>
                {/* Status Bar */}
                <div className="p-3.5 pb-2 flex items-center justify-between gap-2 bg-[#f2f3ff]/60 border-b border-[#eaedff]">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-[#006194] tracking-wide">
                      {req.code}
                    </span>
                    {req.statusBadgeType === 'urgent' && <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-tight uppercase shrink-0 ${
                      req.statusBadgeType === 'urgent'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : req.statusBadgeType === 'clinical'
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : req.statusBadgeType === 'finance'
                        ? 'bg-[#eaedff] text-[#131b2e]'
                        : 'bg-[#86f2e4] text-[#006f66]'
                    }`}
                  >
                    <Icon
                      name={
                        req.statusBadgeType === 'urgent'
                          ? 'alarm'
                          : req.statusBadgeType === 'clinical'
                          ? 'clinical_notes'
                          : req.statusBadgeType === 'finance'
                          ? 'payments'
                          : 'task_alt'
                      }
                      className="text-xs"
                    />
                    <span>{req.statusBadge}</span>
                  </span>
                </div>

                {/* Main Body */}
                <div className="p-4 md:p-5 flex flex-col gap-3">
                  {/* Requester Row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-11 h-11 rounded-full ${req.avatarBg} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}>
                        {req.initials}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131b2e] truncate">
                            {req.name}
                          </h2>
                          {req.isVerified && (
                            <Icon name="verified" className="text-xs text-[#006a61]" filled />
                          )}
                          {req.isSpecialist && (
                            <Icon name="stars" className="text-xs text-[#006194]" />
                          )}
                        </div>
                        <p className="text-xs text-[#707881] truncate">{req.title}</p>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded shrink-0">
                      {req.timestamp}
                    </span>
                  </div>

                  {/* Transfer Route */}
                  {req.transferRoute && (
                    <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881] block">From Current</span>
                        <span className="font-semibold text-xs text-[#131b2e] truncate block">{req.transferRoute.from}</span>
                      </div>
                      <Icon name="arrow_right_alt" className="text-xl text-[#006194] shrink-0" />
                      <div className="min-w-0 text-right">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#006194] block">Destination</span>
                        <span className="font-bold text-xs text-[#006194] truncate block">{req.transferRoute.to}</span>
                      </div>
                    </div>
                  )}

                  {/* Justification Quote */}
                  {req.justification && (
                    <div className="p-3 rounded-xl bg-[#faf8ff] border-l-2 border-[#006194] text-xs">
                      <span className="font-semibold text-[#707881] block text-[10px] uppercase">Stated Justification:</span>
                      <p className="italic text-[#131b2e] mt-0.5 leading-snug">"{req.justification}"</p>
                    </div>
                  )}

                  {/* Signoff routing */}
                  {req.signoff && (
                    <div className="flex items-center gap-1.5 text-xs text-[#707881]">
                      <Icon name="how_to_reg" className="text-sm text-[#006195]" />
                      <span>Sign-off: <strong className="text-[#131b2e]">{req.signoff}</strong></span>
                    </div>
                  )}

                  {/* Elevation Scope */}
                  {req.elevationScope && (
                    <div className="bg-[#f2f3ff] p-3 rounded-xl space-y-1 text-xs">
                      <div className="flex items-center gap-2 text-[#006194] font-semibold">
                        <Icon name="medical_services" className="text-base" />
                        <span>{req.elevationScope}</span>
                      </div>
                      <p className="text-[#707881]">{req.elevationDesc}</p>
                    </div>
                  )}

                  {/* Override Details */}
                  {req.overrideDetails && (
                    <div className="p-3 rounded-xl bg-[#f2f3ff] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold uppercase text-[10px] text-[#006a61]">{req.overrideDetails.label}</span>
                        <span className="font-mono font-bold text-[#006194]">{req.overrideDetails.amount}</span>
                      </div>
                      <p className="text-[#707881] leading-relaxed">{req.overrideDetails.note}</p>
                    </div>
                  )}

                  {/* Synced Info */}
                  {req.syncedNote && (
                    <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs space-y-1.5">
                      <p className="text-[#131b2e]">{req.syncedNote}</p>
                      <div className="flex items-center gap-1.5 text-[#006a61] font-semibold text-[11px]">
                        <Icon name="verified_user" className="text-sm" />
                        <span>{req.syncedApprovedBy}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              {req.status === 'pending' && (
                <div className="p-4 pt-1 bg-white border-t border-[#eaedff] flex flex-col gap-2">
                  <button
                    onClick={() => triggerToast(`Request ${req.code} approved successfully.`)}
                    className="w-full h-11 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
                  >
                    <Icon name="verified" className="text-base" />
                    <span>Review & Approve Request</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => triggerToast(`Information request sent to ${req.name}.`)}
                      className="h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Icon name="contact_support" className="text-sm" />
                      <span>Request Info</span>
                    </button>
                    <button
                      onClick={() => triggerToast(`Request ${req.code} declined.`)}
                      className="h-10 rounded-xl bg-[#ffdad6] hover:bg-[#ffdad6]/80 text-[#93000a] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Icon name="close" className="text-sm" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              )}
            </article>
          ))}
        </section>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => triggerToast('Submit request modal opened')}
            className="flex items-center gap-2 px-5 h-12 rounded-full bg-[#006194] hover:bg-[#007bb9] text-white shadow-xl active:scale-95 transition-all text-xs font-semibold tracking-wide"
          >
            <Icon name="person_add_alt" className="text-lg" />
            <span>+ Submit Staff Request</span>
          </button>
        </div>
      </main>
    </div>
  );
};
