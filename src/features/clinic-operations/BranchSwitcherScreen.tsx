import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface BranchNode {
  id: string;
  name: string;
  code: string;
  badge: string;
  badgeType: 'primary' | 'secondary' | 'neutral';
  subtitle: string;
  address?: string;
  lead?: string;
  manager?: string;
  metrics: {
    label1: string;
    label2: string;
    label3: string;
  };
  pulseStatus?: string;
  isConsolidated?: boolean;
}

const BRANCHES: BranchNode[] = [
  {
    id: 'all',
    name: 'All Branches',
    code: 'ALL',
    badge: 'Consolidated',
    badgeType: 'primary',
    subtitle: 'Unified operational dashboard across all 3 practice locations in Abuja.',
    metrics: {
      label1: '3 Facilities',
      label2: '8 Operatories',
      label3: '16 Clinicians Rostered',
    },
    isConsolidated: true,
  },
  {
    id: 'wuse2',
    name: 'Wuse 2 Main Branch',
    code: '#001',
    badge: 'Current Active',
    badgeType: 'secondary',
    subtitle: 'Primary Practice Headquarters & Surgical Centre',
    address: '14 Aminu Kano Crescent, opp. Parkview Plaza, Wuse 2, Abuja',
    lead: 'Dr. Daniel Okoro (Med. Director)',
    manager: 'David Musa',
    pulseStatus: 'Live Today',
    metrics: {
      label1: '28 appts',
      label2: '4 suites',
      label3: '5 clinicians',
    },
  },
  {
    id: 'garki',
    name: 'Garki Satellite Branch',
    code: '#002',
    badge: 'Satellite Outpost',
    badgeType: 'neutral',
    subtitle: 'Outpatient Preventive & Restorative Clinic',
    address: 'Plot 108 Mohammadu Buhari Way, Garki 2 (Near General Hosp.)',
    lead: 'Dr. Tunde Fashola',
    manager: 'Grace Alabi',
    pulseStatus: 'Operational',
    metrics: {
      label1: '22 appts',
      label2: '2 suites',
      label3: '3 clinicians',
    },
  },
  {
    id: 'maitama',
    name: 'Maitama Specialist Outpost',
    code: '#003',
    badge: 'Specialist Hub',
    badgeType: 'secondary',
    subtitle: 'Specialized Pediatric & Orthodontic Hub',
    address: '22 IBB Way Plaza, Cadastral Zone A05, Maitama, Abuja',
    lead: 'Dr. Sarah Bello (Ortho)',
    manager: 'K. Danladi',
    pulseStatus: 'DHA Gazetted',
    metrics: {
      label1: '14 appts',
      label2: '2 suites',
      label3: '2 specialists',
    },
  },
];

export const BranchSwitcherScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedBranchId, setSelectedBranchId] = useState<string>('wuse2');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filteredBranches = BRANCHES.filter((b) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return (
      b.name.toLowerCase().includes(query) ||
      b.code.toLowerCase().includes(query) ||
      b.subtitle.toLowerCase().includes(query) ||
      (b.address && b.address.toLowerCase().includes(query)) ||
      (b.lead && b.lead.toLowerCase().includes(query))
    );
  });

  const handleConfirm = () => {
    setIsSyncing(true);
    const chosen = BRANCHES.find((b) => b.id === selectedBranchId);
    setTimeout(() => {
      setIsSyncing(false);
      setToastMessage(`Branch synchronized to ${chosen?.name || 'Selected Branch'}`);
      setTimeout(() => {
        if (selectedBranchId === 'all') {
          navigate('/clinic-operations/org-overview');
        } else {
          navigate('/clinic-operations/dashboard');
        }
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top App Bar */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-5xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => navigate('/clinic-operations/dashboard')}
              aria-label="Go back"
              className="w-10 h-10 -ml-1.5 flex items-center justify-center rounded-xl text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <h1 className="text-lg sm:text-xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] truncate">
                Branch Switcher
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-[#131b2e]">David Musa</span>
              <span className="text-[11px] text-[#707881]">Clinic Manager</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Workspace */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 pb-28">
        {/* Sub-Header Context Pill */}
        <div className="mb-6 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#89f5e7] text-[#00201d]">
              <Icon name="domain_verification" className="text-[13px]" />
            </span>
            <p className="text-xs font-mono font-semibold text-[#006a61] tracking-wider uppercase">
              BrightSmile Dental Centre
            </p>
            <span className="text-xs font-mono text-[#707881] font-medium">• RC-1489201</span>
          </div>
          <p className="text-sm text-[#3f4850]">
            Switch operational view to sync chair schedules, live queues, and patient streams.
          </p>
        </div>

        {/* Search Filter Input */}
        <div className="mb-6">
          <div className="relative flex items-center max-w-2xl">
            <Icon name="search" className="absolute left-3.5 text-[#707881] text-[20px] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by branch name, code, doctor, or area..."
              className="w-full h-12 pl-11 pr-10 rounded-xl bg-white border border-[#bfc7d2]/70 text-[#131b2e] text-sm placeholder:text-[#707881] shadow-sm focus:outline-none focus:ring-2 focus:ring-[#006194] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 text-[#707881] hover:text-[#131b2e] p-1 rounded-full transition-colors"
              >
                <Icon name="cancel" className="text-[18px]" />
              </button>
            )}
          </div>
        </div>

        {/* Selectable Facility Nodes List */}
        <div
          aria-label="Selectable clinical branch locations"
          role="radiogroup"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {filteredBranches.map((branch) => {
            const isSelected = selectedBranchId === branch.id;

            return (
              <div
                key={branch.id}
                role="radio"
                aria-checked={isSelected}
                tabIndex={0}
                onClick={() => setSelectedBranchId(branch.id)}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    setSelectedBranchId(branch.id);
                  }
                }}
                className={`group relative flex flex-col rounded-2xl bg-white p-5 border-2 transition-all duration-200 cursor-pointer select-none text-left ${
                  isSelected
                    ? 'border-[#006194] shadow-md ring-1 ring-[#006194]/20'
                    : 'border-transparent hover:border-[#bfc7d2]/60 shadow-sm hover:shadow'
                }`}
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                        branch.isConsolidated
                          ? 'bg-[#e2e7ff] text-[#006194]'
                          : isSelected
                          ? 'bg-[#cce5ff] text-[#006194]'
                          : 'bg-[#eaedff] text-[#3f4850]'
                      }`}
                    >
                      <Icon
                        name={
                          branch.isConsolidated
                            ? 'hub'
                            : branch.id === 'wuse2'
                            ? 'corporate_fare'
                            : branch.id === 'garki'
                            ? 'medical_services'
                            : 'dentistry'
                        }
                        className="text-[24px]"
                      />
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-bold text-[#131b2e] truncate">{branch.name}</h2>
                        {branch.code && (
                          <span className="font-mono text-xs text-[#707881] font-semibold">{branch.code}</span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            branch.badgeType === 'secondary'
                              ? 'bg-[#89f5e7] text-[#00201d]'
                              : branch.badgeType === 'primary'
                              ? 'bg-[#e2e7ff] text-[#006194]'
                              : 'bg-[#eaedff] text-[#3f4850]'
                          }`}
                        >
                          {branch.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#3f4850] mt-1 line-clamp-2">{branch.subtitle}</p>
                    </div>
                  </div>

                  {/* Custom Radio Indicator */}
                  <div
                    className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                      isSelected ? 'bg-[#006194]' : 'bg-[#eaedff]'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        isSelected ? 'bg-white' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </div>

                {/* Address & Lead Info */}
                {branch.address && (
                  <div className="mt-4 pt-3 border-t border-[#f2f3ff] flex flex-col gap-1.5 text-xs text-[#3f4850]">
                    <div className="flex items-start gap-1.5">
                      <Icon name="location_on" className="text-[16px] text-[#707881] shrink-0 mt-0.5" />
                      <span className="truncate">{branch.address}</span>
                    </div>
                    {branch.lead && (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <Icon name="badge" className="text-[16px] text-[#707881] shrink-0" />
                        <span>
                          Lead: <strong className="text-[#131b2e] font-semibold">{branch.lead}</strong>
                        </span>
                        {branch.manager && (
                          <>
                            <span className="text-[#bfc7d2]">•</span>
                            <span>Mgr: {branch.manager}</span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Metrics / Live Stats Banner */}
                <div
                  className={`mt-4 pt-2.5 pb-2 px-3 rounded-xl flex items-center justify-between gap-2 flex-wrap ${
                    isSelected ? 'bg-[#e2e7ff]/40 text-[#131b2e]' : 'bg-[#f2f3ff] text-[#3f4850]'
                  }`}
                >
                  {branch.pulseStatus ? (
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          branch.pulseStatus === 'Live Today'
                            ? 'bg-[#006a61] animate-pulse'
                            : 'bg-[#006194]'
                        }`}
                      />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold text-[#3f4850]">
                        {branch.pulseStatus}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#006194]">
                      <Icon name="apartment" className="text-[15px]" />
                      <span>{branch.metrics.label1}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-semibold text-[#006194]">{branch.metrics.label1}</span>
                    <span className="text-[#bfc7d2]">•</span>
                    <span className="font-semibold text-[#006194]">{branch.metrics.label2}</span>
                    <span className="text-[#bfc7d2]">•</span>
                    <span className="font-semibold text-[#006194]">{branch.metrics.label3}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredBranches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center bg-white rounded-2xl border border-[#dae2fd]/60 mt-4">
            <div className="w-14 h-14 rounded-full bg-[#e2e7ff] flex items-center justify-center mb-3 text-[#006194]">
              <Icon name="travel_explore" className="text-[32px]" />
            </div>
            <h3 className="text-base font-bold text-[#131b2e]">No branch matches</h3>
            <p className="text-sm text-[#3f4850] mt-1 max-w-sm">
              We couldn't find any location matching &quot;{searchQuery}&quot;. Try searching by city, doctor name, or branch code.
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="mt-4 px-4 py-2 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#cce5ff] transition-colors"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Role Access Guardrail Notice Box */}
        <div className="mt-8 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/80 p-4 sm:p-5 flex items-start gap-3.5 shadow-sm">
          <div className="w-9 h-9 rounded-xl bg-[#dae2fd] text-[#006194] flex items-center justify-center shrink-0">
            <Icon name="admin_panel_settings" className="text-[20px]" />
          </div>
          <div className="flex flex-col gap-1 min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-bold text-[#131b2e]">David Musa</p>
              <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#006194] text-[11px] font-mono font-bold tracking-wider">
                CLINIC MANAGER
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              You have operational authorization across all 3 facility nodes. Switching branch synchronizes appointment streams, waiting queues, and chairside schedules across BrightSmile Dental OS.
            </p>
          </div>
        </div>
      </main>

      {/* Sticky Bottom Action Bar */}
      <footer className="fixed bottom-0 inset-x-0 z-40 bg-[#faf8ff]/95 backdrop-blur-md border-t border-[#dae2fd]/80 px-4 sm:px-6 py-3.5 shadow-lg">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate('/clinic-operations/dashboard')}
            className="w-full sm:w-auto px-6 h-11 rounded-xl bg-transparent hover:bg-[#eaedff] text-[#3f4850] text-sm font-semibold transition-colors flex items-center justify-center order-2 sm:order-1"
          >
            Cancel & Return
          </button>
          <button
            type="button"
            disabled={isSyncing}
            onClick={handleConfirm}
            className="w-full sm:w-auto px-8 h-11 rounded-xl bg-[#006194] hover:bg-[#007bb9] active:scale-[0.98] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all order-1 sm:order-2 disabled:opacity-75"
          >
            {isSyncing ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Synchronizing Node...</span>
              </>
            ) : (
              <>
                <span>Confirm Branch Selection</span>
                <Icon name="chevron_forward" className="text-[20px]" />
              </>
            )}
          </button>
        </div>
      </footer>
    </div>
  );
};
