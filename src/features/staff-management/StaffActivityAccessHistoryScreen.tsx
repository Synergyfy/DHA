import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface AuditEvent {
  id: string;
  type: 'suspension' | 'invite' | 'rotation' | 'role' | 'affiliation';
  typeLabel: string;
  timestamp: string;
  staffName: string;
  staffInitials: string;
  staffCode: string;
  staffRole: string;
  branch: 'wuse2' | 'maitama' | 'gwarinpa' | 'all';
  branchLabel: string;
  author: string;
  authorVerification: string;
  badgeType: 'error' | 'primary' | 'secondary' | 'neutral';
  details: {
    title: string;
    description: string;
    extraNote?: string;
    subNote?: string;
    tags?: string[];
  };
}

const AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'EVT-001',
    type: 'suspension',
    typeLabel: 'Temporary Suspension Enacted',
    timestamp: 'Today, 11:30 AM WAT',
    staffName: 'Kalu Okonkwo',
    staffInitials: 'KO',
    staffCode: '#STF-OKO-14',
    staffRole: 'Front-Desk Billing Clerk • Wuse 2 Main Branch',
    branch: 'wuse2',
    branchLabel: 'Wuse 2 Main',
    author: 'Dr. Aisha Bello (Wuse 2 Superuser)',
    authorVerification: 'PIN Verified',
    badgeType: 'error',
    details: {
      title: 'Access Status Change: Active Status → Temporarily Suspended',
      description: 'POS gateway terminals and system accounts immediately locked.',
      extraNote: 'Discrepancy in Daily Cashless Reconciliation (#AUD-882-B)',
      subNote: 'AUTH-TRNS // #8841',
    },
  },
  {
    id: 'EVT-002',
    type: 'invite',
    typeLabel: 'Staff Invitation Dispatched',
    timestamp: 'Today, 09:15 AM WAT',
    staffName: 'Dr. Daniel Musa',
    staffInitials: 'DM',
    staffCode: '#STF-MUS-09',
    staffRole: 'Associate Dentist • Invitation Pending Signature',
    branch: 'wuse2',
    branchLabel: 'Wuse 2 Main',
    author: 'Samuel Eze (Operations Mgr)',
    authorVerification: 'Direct Dispatch',
    badgeType: 'primary',
    details: {
      title: 'Target Deployments: Wuse 2 Main, Maitama Specialist',
      description: 'Direct recruitment link generated. Token: #INV-STAFF-2026-088 (ECDSA-P256)',
      subNote: 'Expires in 7 Days',
      tags: ['Wuse 2 Main', 'Maitama Specialist'],
    },
  },
  {
    id: 'EVT-003',
    type: 'rotation',
    typeLabel: 'Branch Rotation Modified',
    timestamp: 'Yesterday, 16:45 WAT',
    staffName: 'Dr. Michael Adeyemi',
    staffInitials: 'MA',
    staffCode: '#STF-ADE-01',
    staffRole: 'Consultant Orthodontist',
    branch: 'maitama',
    branchLabel: 'Maitama Centre',
    author: 'Dr. Sarah Okafor (Clinical Director)',
    authorVerification: 'Roster #26-W42',
    badgeType: 'secondary',
    details: {
      title: 'Updated Facility Commitment Allocation',
      description: 'Primary: Wuse 2 Main Branch (32 hrs/wk) • Rotational: Maitama Specialist (8 hrs/wk)',
      tags: ['32 hrs/wk Primary', '8 hrs/wk Rotational'],
    },
  },
  {
    id: 'EVT-004',
    type: 'role',
    typeLabel: 'Role Permissions Updated',
    timestamp: '20 Oct 2026, 14:10 WAT',
    staffName: 'Patient Care Coordinator Group',
    staffInitials: 'PC',
    staffCode: '#CR-PC-004',
    staffRole: 'Network Wide Scope • 3 Staff Members Affected',
    branch: 'all',
    branchLabel: 'All Facilities',
    author: 'Samuel Eze (Operations Mgr)',
    authorVerification: 'Diff +1 Capability',
    badgeType: 'neutral',
    details: {
      title: "Scope Enhancement: 'Access Waiting Room TV Display Masking'",
      description: 'Grants authorization to obscure patient identity tickers on public reception displays.',
      extraNote: 'Added granular permission to avoid NDPR data exposure on public displays.',
    },
  },
  {
    id: 'EVT-005',
    type: 'affiliation',
    typeLabel: 'Affiliation Verified',
    timestamp: '19 Oct 2026, 10:20 WAT',
    staffName: 'Nurse Fatima Noor',
    staffInitials: 'FN',
    staffCode: '#STF-NOO-07',
    staffRole: 'Registered Dental Nurse • Wuse 2',
    branch: 'wuse2',
    branchLabel: 'Wuse 2 Main',
    author: 'Automated Handshake Verification',
    authorVerification: 'SYNC-200 OK',
    badgeType: 'secondary',
    details: {
      title: 'Onboarding Completed • Shift roster synced to Wuse 2',
      description: 'Identity biometric certificate validated against Nigerian Nursing Council database.',
      subNote: 'MDCN/NMC Trust Anchor Verified',
    },
  },
];

export const StaffActivityAccessHistoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [timeFilter, setTimeFilter] = useState<'7d' | 'month' | 'custom'>('7d');
  const [eventTypeFilter, setEventTypeFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [copiedHash, setCopiedHash] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    showToast('SHA-256 Ledger Hash copied to clipboard');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const filteredEvents = useMemo(() => {
    return AUDIT_EVENTS.filter((event) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        event.staffName.toLowerCase().includes(q) ||
        event.staffCode.toLowerCase().includes(q) ||
        event.author.toLowerCase().includes(q) ||
        event.typeLabel.toLowerCase().includes(q) ||
        event.details.description.toLowerCase().includes(q);

      const matchesType = eventTypeFilter === 'all' || event.type === eventTypeFilter;
      const matchesBranch =
        branchFilter === 'all' || event.branch === 'all' || event.branch === branchFilter;

      return matchesSearch && matchesType && matchesBranch;
    });
  }, [searchQuery, eventTypeFilter, branchFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setEventTypeFilter('all');
    setBranchFilter('all');
    setTimeFilter('7d');
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-['Inter'] pb-24">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/80 backdrop-blur-xl border-b border-[#eaedff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/staff-management/dashboard')}
              className="w-10 h-10 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
              title="Back to Dashboard"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <span className="text-[11px] font-semibold text-[#006a61] uppercase tracking-wider truncate">
                Abuja Clinic Network
              </span>
              <div className="flex items-center gap-1">
                <span className="text-[14px] font-semibold text-[#131b2e] font-['Plus_Jakarta_Sans'] truncate">
                  Harmony Dental Group - Audit Trail
                </span>
                <Icon name="expand_more" className="text-[18px] text-[#3f4850]" />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => copyHash('0x94BA32C7E811F0D923C41908AB5D4981F')}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#dae2fd] transition-colors"
            >
              <Icon name="verified" className="text-[16px]" filled={true} />
              <span>SHA-256 Ledger</span>
            </button>
            <button
              onClick={() => showToast('Refreshed audit logs')}
              className="w-10 h-10 rounded-full hover:bg-[#eaedff] flex items-center justify-center text-[#3f4850] transition-colors"
              title="Refresh logs"
            >
              <Icon name="refresh" className="text-[20px]" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white text-xs font-semibold">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-6">
        {/* Top Context & Headline */}
        <section className="flex flex-col gap-2 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4]/30 text-[#005049] text-xs font-semibold tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              Immutable Ledger • ISO 27001 Compliant
            </div>
            <button
              onClick={() => copyHash('0x94BA32C7E811F0D923C41908AB5D4981F')}
              className="inline-flex sm:hidden items-center gap-1 px-2.5 py-1 rounded-lg bg-[#eaedff] text-[#006194] text-xs font-semibold"
            >
              <Icon name="verified" className="text-[14px]" filled={true} />
              <span>SHA-256</span>
            </button>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
            Staff Activity &amp; Audit Trail
          </h1>
          <p className="text-sm text-[#3f4850] max-w-3xl leading-relaxed">
            Complete tamper-proof historical record of staff invitations, role assignments, branch deployments,
            suspensions, and privilege modifications.
          </p>
        </section>

        {/* Administrative Access Scope Banner */}
        <div className="mb-6 p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] shadow-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-[#eaedff] flex items-center justify-center shrink-0 text-[#006194]">
            <Icon name="policy" className="text-[20px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-sm font-semibold text-[#131b2e]">Administrative Access Scope</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#dae2fd] text-[#3f4850] font-medium">
                Sec. 10/11
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#3f4850] leading-normal">
              This ledger records organizational governance changes only. Clinical charting and diagnostic PACS audit
              trails are maintained under sovereign DHA Section 10/11 statutory registries.
            </p>
          </div>
        </div>

        {/* Interactive Controls & Filters Card */}
        <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="relative md:col-span-6">
              <Icon
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#707881] text-[20px] pointer-events-none"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search staff, employee ID, or admin..."
                className="w-full h-11 pl-10 pr-9 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-sm placeholder:text-[#707881] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e] p-1"
                >
                  <Icon name="cancel" className="text-[18px]" />
                </button>
              )}
            </div>

            {/* Time Filter Chips */}
            <div className="md:col-span-6 flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              <button
                type="button"
                onClick={() => setTimeFilter('7d')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  timeFilter === '7d'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="schedule" className="text-[15px]" />
                <span>Last 7 Days</span>
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('month')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  timeFilter === 'month'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>This Month</span>
              </button>
              <button
                type="button"
                onClick={() => setTimeFilter('custom')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all whitespace-nowrap ${
                  timeFilter === 'custom'
                    ? 'bg-[#006194] text-white shadow-sm'
                    : 'bg-[#eaedff] text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <Icon name="date_range" className="text-[15px]" />
                <span>Custom Range</span>
              </button>
            </div>
          </div>

          {/* Secondary Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1 border-t border-[#eaedff]/60">
            {/* Event Filter */}
            <div className="relative">
              <label className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block mb-1">
                Event Category
              </label>
              <div className="relative">
                <select
                  value={eventTypeFilter}
                  onChange={(e) => setEventTypeFilter(e.target.value)}
                  className="w-full h-10 pl-3 pr-8 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-medium appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
                >
                  <option value="all">All Events (5)</option>
                  <option value="suspension">Suspensions (1)</option>
                  <option value="invite">Invitations (1)</option>
                  <option value="rotation">Branch Transfers (1)</option>
                  <option value="role">Role Changes (1)</option>
                  <option value="affiliation">Affiliations (1)</option>
                </select>
                <Icon
                  name="expand_more"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707881] pointer-events-none text-[18px]"
                />
              </div>
            </div>

            {/* Branch Filter */}
            <div className="relative">
              <label className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block mb-1">
                Facility Branch
              </label>
              <div className="relative">
                <select
                  value={branchFilter}
                  onChange={(e) => setBranchFilter(e.target.value)}
                  className="w-full h-10 pl-3 pr-8 rounded-xl bg-[#f2f3ff] text-[#131b2e] text-xs font-medium appearance-none focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#006194]/20 border border-transparent focus:border-[#006194]/30 transition-colors"
                >
                  <option value="all">All Facilities</option>
                  <option value="wuse2">Wuse 2 Main</option>
                  <option value="maitama">Maitama Centre</option>
                  <option value="gwarinpa">Gwarinpa Outpost</option>
                </select>
                <Icon
                  name="business"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#707881] pointer-events-none text-[18px]"
                />
              </div>
            </div>

            {/* Reset Action */}
            <div className="flex items-end">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full h-10 px-3 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#dae2fd] transition-colors flex items-center justify-center gap-1.5"
              >
                <Icon name="filter_alt_off" className="text-[16px]" />
                <span>Reset Filters</span>
              </button>
            </div>
          </div>
        </div>

        {/* Timeline Header & Count */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">Ledger Timeline</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#cce5ff] text-[#001d31] text-xs font-semibold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
            </span>
          </div>
          <span className="text-xs text-[#707881] flex items-center gap-1">
            <Icon name="history" className="text-[14px]" />
            Auto-synced
          </span>
        </div>

        {/* Timeline Feed */}
        {filteredEvents.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredEvents.map((event) => {
              const isError = event.badgeType === 'error';
              const isPrimary = event.badgeType === 'primary';
              const isSecondary = event.badgeType === 'secondary';

              return (
                <article
                  key={event.id}
                  className="rounded-2xl bg-white border border-[#eaedff] shadow-sm overflow-hidden flex flex-col hover:border-[#006194]/30 transition-all"
                >
                  {/* Status Bar Top */}
                  <div
                    className={`px-4 sm:px-5 py-2.5 flex items-center justify-between flex-wrap gap-2 ${
                      isError
                        ? 'bg-[#ffdad6]/60 text-[#93000a]'
                        : isPrimary
                        ? 'bg-[#cce5ff]/40 text-[#006194]'
                        : isSecondary
                        ? 'bg-[#86f2e4]/30 text-[#005049]'
                        : 'bg-[#eaedff] text-[#131b2e]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        name={
                          event.type === 'suspension'
                            ? 'gavel'
                            : event.type === 'invite'
                            ? 'forward_to_inbox'
                            : event.type === 'rotation'
                            ? 'sync_alt'
                            : event.type === 'role'
                            ? 'admin_panel_settings'
                            : 'how_to_reg'
                        }
                        className="text-[18px]"
                      />
                      <span className="text-xs font-bold uppercase tracking-wider">{event.typeLabel}</span>
                    </div>
                    <span className="text-xs font-medium opacity-80">{event.timestamp}</span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex flex-col gap-3.5">
                    {/* Target Staff Section */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#eaedff] flex items-center justify-center shrink-0 text-[#006194] font-bold text-sm">
                        {event.staffInitials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-[#131b2e]">{event.staffName}</span>
                          <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[11px] font-mono text-[#707881]">
                            {event.staffCode}
                          </span>
                        </div>
                        <p className="text-xs text-[#3f4850] mt-0.5 truncate">{event.staffRole}</p>
                      </div>
                    </div>

                    {/* State Transition / Details Block */}
                    <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-2">
                      <div className="flex items-center justify-between text-xs text-[#707881]">
                        <span className="font-medium text-[#131b2e]">{event.details.title}</span>
                        {event.details.subNote && (
                          <span className="font-mono text-[11px] text-[#006194]">{event.details.subNote}</span>
                        )}
                      </div>
                      <p className="text-xs sm:text-sm text-[#3f4850] leading-normal">{event.details.description}</p>
                      {event.details.tags && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {event.details.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-full bg-white text-[#006194] border border-[#eaedff] text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Audit Note Quote if present */}
                    {event.details.extraNote && (
                      <div className="pl-3 py-1.5 border-l-2 border-[#006194] bg-[#f2f3ff]/60 rounded-r-lg">
                        <p className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider mb-0.5">
                          Mandatory Audit Justification
                        </p>
                        <p className="text-xs text-[#131b2e] italic">"{event.details.extraNote}"</p>
                      </div>
                    )}

                    {/* Administrator Signature / Proof Footer */}
                    <div className="pt-2 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#3f4850] flex-wrap gap-2">
                      <div className="flex items-center gap-1.5">
                        <Icon name="verified_user" className="text-[16px] text-[#006a61]" filled={true} />
                        <span>
                          By <strong>{event.author}</strong>
                        </span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#eaedff] font-mono text-[11px] text-[#006a61] font-semibold">
                        {event.authorVerification}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="p-8 sm:p-12 rounded-2xl bg-white border border-[#eaedff] shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-14 h-14 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] mb-3">
              <Icon name="manage_search" className="text-[28px]" />
            </div>
            <h2 className="text-base font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">
              No Administrative Records Found
            </h2>
            <p className="text-xs sm:text-sm text-[#707881] max-w-sm mt-1">
              No ledger entries match your current search query or filter selection. Try resetting parameters.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Cryptographic Safeguard Card */}
        <div className="mt-8 mb-6 p-4 sm:p-5 rounded-2xl bg-[#eaedff]/60 border border-[#dae2fd] shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-[#006194]">
              <Icon name="lock" className="text-[18px]" filled={true} />
              <span className="text-sm font-bold font-['Plus_Jakarta_Sans']">Ledger Cryptographic Safeguard</span>
            </div>
            <span className="px-2.5 py-0.5 rounded bg-white text-[#006a61] font-mono text-xs font-semibold border border-[#bfc7d2]">
              BLOCK #409,218
            </span>
          </div>
          <p className="text-xs text-[#3f4850] leading-relaxed">
            Every state transition is appended to the SHA-256 Merkle tree ledger. Records cannot be updated, backdated, or
            pruned by clinic staff.
          </p>
          <div className="p-2.5 rounded-xl bg-white border border-[#eaedff] flex items-center justify-between gap-2 overflow-hidden">
            <span className="font-mono text-xs text-[#131b2e] truncate">0x94BA32C7E811F0D923C41908AB5D4981F</span>
            <button
              onClick={() => copyHash('0x94BA32C7E811F0D923C41908AB5D4981F')}
              className="text-[#006194] hover:text-[#007bb9] shrink-0 p-1 rounded hover:bg-[#f2f3ff] transition-colors"
              title="Copy Hash"
            >
              <Icon name={copiedHash ? 'check' : 'content_copy'} className="text-[16px]" />
            </button>
          </div>
          <div className="flex items-center justify-between pt-1 text-[11px] text-[#707881]">
            <span>Verifiable via DHA Sovereign Hub</span>
            <span className="text-[#006a61] font-medium flex items-center gap-1">
              <Icon name="verified" className="text-[14px]" filled={true} />
              Trust Anchor Valid
            </span>
          </div>
        </div>

        {/* Export Actions Tray */}
        <div className="mb-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => showToast('Exporting Immutable Audit Log (PDF)...')}
            className="w-full h-12 rounded-xl bg-[#006194] text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-[#007bb9] active:scale-[0.99] transition-all"
          >
            <Icon name="picture_as_pdf" className="text-[20px]" />
            <span>Export Immutable Audit Log (PDF)</span>
          </button>
          <button
            onClick={() => showToast('Downloading Raw Audit Log CSV...')}
            className="w-full h-12 rounded-xl bg-white border border-[#eaedff] text-[#131b2e] font-semibold text-sm shadow-sm flex items-center justify-center gap-2 hover:bg-[#f2f3ff] active:scale-[0.99] transition-all"
          >
            <Icon name="table_chart" className="text-[20px] text-[#006194]" />
            <span>Download Raw CSV</span>
          </button>
        </div>
      </main>

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#283044] text-[#eef0ff] px-4 py-3 rounded-xl shadow-lg flex items-center gap-3">
          <Icon name="check_circle" className="text-[#6bd8cb] text-[20px]" filled={true} />
          <span className="text-sm">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
