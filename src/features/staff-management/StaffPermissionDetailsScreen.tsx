import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface PermissionItem {
  id: string;
  title: string;
  desc: string;
  category: 'inherited' | 'custom' | 'restricted';
}

export const StaffPermissionDetailsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'inherited' | 'custom' | 'restricted'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const inheritedPermissions: PermissionItem[] = [
    {
      id: 'p-1',
      title: 'Create & Edit Patient Appointments',
      desc: 'All Wuse 2 Operatories, Diagnostic & Hygiene Suites',
      category: 'inherited'
    },
    {
      id: 'p-2',
      title: 'Manage Walk-in Triage & Waiting Room Queue',
      desc: 'Section #16.14: Expedited pain escalation protocol',
      category: 'inherited'
    },
    {
      id: 'p-3',
      title: 'Scan Emirates ID / DHA QR Pass for Arrival Check-in',
      desc: 'Direct sync with Ministry biometric authentication kiosk',
      category: 'inherited'
    },
    {
      id: 'p-4',
      title: 'View Patient Emergency Contact Demographics',
      desc: 'Restricted to non-clinical identity and primary caregiver fields',
      category: 'inherited'
    }
  ];

  const customPermissions: PermissionItem[] = [
    {
      id: 'p-5',
      title: 'Record Cashless POS & Bank Transfer Payments',
      desc: 'Section #16.33: Multi-terminal settlement protocol',
      category: 'custom'
    },
    {
      id: 'p-6',
      title: 'Issue & Print Cryptographic Tax Receipts',
      desc: 'Section #16.34: Verified Federal Inland Revenue / DHA seal',
      category: 'custom'
    },
    {
      id: 'p-7',
      title: 'Request Fee Adjustments Under ₦15,000',
      desc: 'Initiates dual-signature workflow for Manager Samuel Eze',
      category: 'custom'
    }
  ];

  const restrictedPermissions: PermissionItem[] = [
    {
      id: 'p-8',
      title: 'Patient Diagnostic Findings & Odontograms',
      desc: 'Masked • Prohibited for Non-Clinical Staff',
      category: 'restricted'
    },
    {
      id: 'p-9',
      title: 'Doctor Private Clinical Notes & Biopsy Reports',
      desc: 'Prohibited • Certified MDCN Clinicians Only',
      category: 'restricted'
    },
    {
      id: 'p-10',
      title: 'Controlled Substances Dispensary Inventory',
      desc: 'Prohibited • Pharmacist / Lead Surgeon Double-Key',
      category: 'restricted'
    }
  ];

  const filterItems = (items: PermissionItem[]) => {
    return items.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSearch;
    });
  };

  const filteredInherited = filterItems(inheritedPermissions);
  const filteredCustom = filterItems(customPermissions);
  const filteredRestricted = filterItems(restrictedPermissions);

  const showInherited = (activeFilter === 'all' || activeFilter === 'inherited') && filteredInherited.length > 0;
  const showCustom = (activeFilter === 'all' || activeFilter === 'custom') && filteredCustom.length > 0;
  const showRestricted = (activeFilter === 'all' || activeFilter === 'restricted') && filteredRestricted.length > 0;

  const totalVisible =
    (showInherited ? filteredInherited.length : 0) +
    (showCustom ? filteredCustom.length : 0) +
    (showRestricted ? filteredRestricted.length : 0);

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
              onClick={() => navigate('/staff-management/directory')}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#3f4850] hover:bg-[#eaedff] transition-colors"
              title="Go back"
            >
              <Icon name="arrow_back" className="text-xl" />
            </button>
            <h1 className="font-['Plus_Jakarta_Sans'] font-bold text-lg md:text-xl text-[#131b2e] truncate">
              Staff Permission Details
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => triggerToast('Audit log options opened')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="more_vert" className="text-xl" />
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 md:px-8 pt-20 pb-16">
        {/* Profile Summary Card */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] mb-6">
          <div className="flex items-start gap-4">
            <div className="relative shrink-0">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center font-['Plus_Jakarta_Sans'] font-bold text-xl shadow-xs">
                GI
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#006a61] rounded-full ring-2 ring-white flex items-center justify-center shadow-xs">
                <Icon name="check" className="text-white text-[10px]" />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-['Plus_Jakarta_Sans'] text-lg md:text-xl font-bold text-[#131b2e] truncate">
                  Grace Ibrahim
                </h2>
                <span className="bg-[#eaedff] px-2 py-0.5 rounded text-xs font-mono text-[#3f4850]">
                  #STF-IBR-08
                </span>
              </div>
              <p className="text-sm font-semibold text-[#006194] truncate mt-0.5">
                Senior Receptionist & Patient Triage Lead
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#707881] mt-1">
                <Icon name="apartment" className="text-xs text-[#006194]" />
                <span className="truncate">Harmony Dental — Wuse 2 Main Branch</span>
              </div>
            </div>
          </div>

          {/* Verification Badge Bar */}
          <div className="mt-4 pt-3 border-t border-[#eaedff] flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <Icon name="verified" className="text-sm text-[#006a61]" filled />
              <span className="text-[#005049] uppercase tracking-wider font-semibold">
                Active • DHA Non-Clinical ID Verified
              </span>
            </div>
            <span className="font-mono text-[#707881] bg-[#f2f3ff] px-2 py-0.5 rounded">
              Tier 2 Admin
            </span>
          </div>
        </div>

        {/* Search & Interactive Filter Strip */}
        <div className="flex flex-col gap-3 mb-6">
          {/* Live Search Field */}
          <div className="relative w-full">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-lg" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search permissions for Grace Ibrahim..."
              className="w-full h-12 pl-11 pr-10 bg-white rounded-xl text-sm text-[#131b2e] placeholder-[#707881] border border-[#eaedff] focus:outline-none focus:border-[#006194] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] p-1 rounded-full hover:bg-[#eaedff]"
              >
                <Icon name="close" className="text-base" />
              </button>
            )}
          </div>

          {/* Filter Pills */}
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
              <span className="text-[11px] opacity-80">(10)</span>
            </button>
            <button
              onClick={() => setActiveFilter('inherited')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'inherited'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Role Standard</span>
              <span className="text-[11px] opacity-80">(4)</span>
            </button>
            <button
              onClick={() => setActiveFilter('custom')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'custom'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Custom Additions</span>
              <span className="text-[11px] opacity-80">(3)</span>
            </button>
            <button
              onClick={() => setActiveFilter('restricted')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'restricted'
                  ? 'bg-[#ba1a1a] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Restricted</span>
              <span className="text-[11px] opacity-80">(3)</span>
            </button>
          </div>
        </div>

        {/* Empty Search Feedback */}
        {totalVisible === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center border border-[#eaedff] my-6">
            <Icon name="manage_search" className="text-4xl text-[#707881] mb-2" />
            <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
              No permissions found
            </h3>
            <p className="text-xs text-[#707881] mt-1">
              Try adjusting your search terms or reset the filters to see all access rights.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-[#eaedff] text-[#006194] text-xs font-semibold hover:bg-[#dae2fd] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Group 1: Patient Intake & Scheduling */}
        {showInherited && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden mb-5">
            <div className="p-4 md:p-5 flex items-start justify-between gap-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
                  <Icon name="calendar_month" className="text-xl" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                    Patient Intake & Scheduling
                  </h3>
                  <span className="font-bold text-[11px] text-[#006194] uppercase tracking-wide">
                    Inherited Standard
                  </span>
                </div>
              </div>
              <span className="bg-[#eaedff] px-2.5 py-1 rounded-full text-xs font-mono text-[#3f4850] shrink-0">
                {filteredInherited.length} Active
              </span>
            </div>

            <div className="p-4 md:p-5 flex flex-col gap-2.5">
              {filteredInherited.map((perm) => (
                <div key={perm.id} className="p-3 bg-[#f2f3ff] rounded-xl flex items-start gap-3">
                  <Icon
                    name="check_circle"
                    className="text-[#006a61] text-lg shrink-0 mt-0.5"
                    filled
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs md:text-sm text-[#131b2e]">{perm.title}</p>
                    <p className="text-xs text-[#707881] mt-0.5">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#f2f3ff]/70 px-4 md:px-5 py-3 border-t border-[#eaedff] flex items-center justify-between text-xs text-[#707881]">
              <div className="flex items-center gap-1.5 truncate">
                <Icon name="source_notes" className="text-sm text-[#707881]" />
                <span className="truncate">
                  Source: Inherited from Role <span className="font-semibold text-[#131b2e]">Senior Receptionist</span>
                </span>
              </div>
              <Icon name="lock" className="text-sm text-[#707881]" />
            </div>
          </div>
        )}

        {/* Group 2: Billing & Counter Settlements (Custom Addition) */}
        {showCustom && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#eaedff] overflow-hidden mb-5">
            <div className="p-4 md:p-5 flex items-start justify-between gap-3 border-b border-[#eaedff]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#89f5e7] text-[#00201d] flex items-center justify-center shrink-0">
                  <Icon name="point_of_sale" className="text-xl" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                      Billing & Counter Settlements
                    </h3>
                    <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                  </div>
                  <span className="font-bold text-[11px] text-[#006a61] uppercase tracking-wide">
                    Custom Authorized Addition
                  </span>
                </div>
              </div>
              <span className="bg-[#86f2e4] text-[#006f66] px-2.5 py-1 rounded-full text-xs font-mono font-semibold shrink-0">
                {filteredCustom.length} Custom
              </span>
            </div>

            <div className="p-4 md:p-5 flex flex-col gap-2.5">
              {filteredCustom.map((perm) => (
                <div key={perm.id} className="p-3 bg-[#f2f3ff] rounded-xl flex items-start gap-3">
                  <Icon
                    name="check_circle"
                    className="text-[#006a61] text-lg shrink-0 mt-0.5"
                    filled
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs md:text-sm text-[#131b2e]">{perm.title}</p>
                    <p className="text-xs text-[#707881] mt-0.5">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#89f5e7]/20 px-4 md:px-5 py-3 border-t border-[#86f2e4]/30 flex items-center justify-between text-xs text-[#005049]">
              <div className="flex items-center gap-1.5 truncate">
                <Icon name="verified_user" className="text-sm text-[#006a61]" />
                <span className="truncate">
                  Authorized by <span className="font-semibold">Mgr. Samuel Eze</span> on 12 Aug 2026
                </span>
              </div>
              <button
                onClick={() => triggerToast('Revocation request logged for Manager review')}
                className="text-[#006a61] font-semibold hover:underline"
              >
                Revoke
              </button>
            </div>
          </div>
        )}

        {/* Group 3: Restricted Access Guardrails (Statutory DHA Locks) */}
        {showRestricted && (
          <div className="bg-white rounded-2xl shadow-xs border border-[#ffdad6] overflow-hidden mb-6">
            <div className="p-4 md:p-5 flex items-start justify-between gap-3 border-b border-[#ffdad6]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
                  <Icon name="gavel" className="text-xl" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e]">
                    Restricted Guardrails
                  </h3>
                  <span className="font-bold text-[11px] text-[#ba1a1a] uppercase tracking-wide">
                    Statutory DHA Locks
                  </span>
                </div>
              </div>
              <span className="bg-[#ffdad6] text-[#93000a] px-2.5 py-1 rounded-full text-xs font-mono font-semibold shrink-0">
                {filteredRestricted.length} Prohibited
              </span>
            </div>

            <div className="p-4 md:p-5 flex flex-col gap-2.5">
              {filteredRestricted.map((perm) => (
                <div key={perm.id} className="p-3 bg-[#f2f3ff]/70 rounded-xl flex items-start gap-3 opacity-80">
                  <Icon name="lock" className="text-[#ba1a1a] text-lg shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs md:text-sm text-[#131b2e]">{perm.title}</p>
                    <p className="text-xs text-[#ba1a1a] mt-0.5 font-medium">{perm.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#ffdad6]/40 px-4 md:px-5 py-3 border-t border-[#ffdad6] flex items-start gap-2.5 text-xs text-[#93000a]">
              <Icon name="policy" className="text-base text-[#ba1a1a] shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                DHA Regulation 17.B: Diagnostic clinical records restricted exclusively to certified MDCN clinicians. Cannot be altered or bypassed by clinic manager.
              </span>
            </div>
          </div>
        )}

        {/* Action Controls */}
        <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col sm:flex-row items-center gap-3 mb-6">
          <button
            onClick={() => triggerToast('Authorize permission dialog launched')}
            className="w-full sm:flex-1 h-12 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <Icon name="add_moderator" className="text-lg" />
            <span>Authorize Additional Permission</span>
          </button>
          <button
            onClick={() => triggerToast('Template copied for new staff onboarding')}
            className="w-full sm:flex-1 h-12 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Icon name="file_copy" className="text-lg text-[#006194]" />
            <span>Copy as Permission Template</span>
          </button>
          <button
            onClick={() => triggerToast('Permissions reset to Senior Receptionist defaults')}
            className="w-full sm:w-auto h-12 px-4 text-[#707881] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/20 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Icon name="history" className="text-base" />
            <span>Reset to Default</span>
          </button>
        </div>

        {/* Regulatory Ledger Note */}
        <div className="p-4 bg-[#f2f3ff] rounded-2xl flex items-start gap-3 border border-[#eaedff]">
          <Icon name="verified" className="text-[#006194] text-lg shrink-0 mt-0.5" />
          <p className="text-xs text-[#3f4850] leading-relaxed">
            <span className="font-semibold text-[#131b2e]">Audit Trail:</span> All permission overrides, temporary elevations, and delegations are permanently recorded in the immutable clinic administrative ledger (Section 17.24).
          </p>
        </div>
      </main>
    </div>
  );
};
