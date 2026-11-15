import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type CategoryTab = 'all' | 'clinical' | 'operations' | 'finance';

interface PermissionEntry {
  id: string;
  category: 'clinical' | 'operations' | 'finance';
  domain: string;
  domainCode: string;
  domainClass: string;
  domainClassBadge: string;
  name: string;
  description: string;
  icon: string;
  dentistAccess: { label: string; badge: string; sub?: string };
  receptionAccess?: { label: string; badge: string; sub?: string };
  managerAccess?: { label: string; badge: string; sub?: string };
  nurseAccess?: { label: string; badge: string; sub?: string };
  otherRoleAccess?: { role: string; label: string; badge: string; sub?: string };
}

const PERMISSIONS_DATA: PermissionEntry[] = [
  {
    id: 'perm-1',
    category: 'clinical',
    domain: 'Clinical Records & Charting',
    domainCode: 'Sections 09.00 - 10.45 • Diagnostic Vault',
    domainClass: 'DHA Class A',
    domainClassBadge: 'bg-[#89f5e7] text-[#00201d]',
    name: 'Odontogram Interactive Charting',
    description: 'Adult & deciduous dental arch surface restoration mapping and pocket depth entry.',
    icon: 'history_edu',
    dentistAccess: { label: '✓ Allowed', badge: 'bg-[#86f2e4]/40 text-[#006a61]', sub: '(Full Charting)' },
    nurseAccess: { label: '◐ Assist Only', badge: 'bg-[#cde5ff] text-[#004b74]', sub: '(Read/Perio scribe)' },
    receptionAccess: { label: '🔒 Restricted', badge: 'bg-[#ba1a1a] text-white', sub: '(DHA Lock)' },
    managerAccess: { label: '◐ Anonymized', badge: 'bg-[#eaedff] text-[#3f4850]', sub: '(Throughput only)' },
  },
  {
    id: 'perm-2',
    category: 'clinical',
    domain: 'Clinical Records & Charting',
    domainCode: 'Sections 09.00 - 10.45 • Diagnostic Vault',
    domainClass: 'DHA Class A',
    domainClassBadge: 'bg-[#89f5e7] text-[#00201d]',
    name: 'Periodontal Probing & Soft Tissue Exam',
    description: '6-point pocket depths, furcation involvement, and mucosal lesion diagnostics.',
    icon: 'biotech',
    dentistAccess: { label: '✓ Allowed', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
    receptionAccess: { label: '🔒 Statutory Prohibited', badge: 'bg-[#ba1a1a] text-white' },
  },
  {
    id: 'perm-3',
    category: 'clinical',
    domain: 'Clinical Records & Charting',
    domainCode: 'Sections 09.00 - 10.45 • Diagnostic Vault',
    domainClass: 'DHA Class A',
    domainClassBadge: 'bg-[#89f5e7] text-[#00201d]',
    name: 'Private Clinical Doctor Notes',
    description: 'Medico-legal observations, differential diagnosis, and treatment risk disclosures.',
    icon: 'lock',
    dentistAccess: { label: '✓ Author Only', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
    otherRoleAccess: { role: 'Non-clinical Staff', label: '🔒 Strict Masking', badge: 'bg-[#ba1a1a] text-white', sub: '(Zero-Knowledge)' },
  },
  {
    id: 'perm-4',
    category: 'operations',
    domain: 'Patient Appointments & Reception',
    domainCode: 'Sections 14.10 - 16.05 • Front Office',
    domainClass: 'Operational',
    domainClassBadge: 'bg-[#eaedff] text-[#3f4850]',
    name: 'Book & Reschedule Appointments',
    description: 'Direct diary reservations, appointment cancellation, and doctor chair assignments.',
    icon: 'edit_calendar',
    dentistAccess: { label: '◐ Own Operatory', badge: 'bg-[#cde5ff] text-[#004b74]' },
    receptionAccess: { label: '✓ All Available Chairs', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
    managerAccess: { label: '✓ Master Override', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
  },
  {
    id: 'perm-5',
    category: 'operations',
    domain: 'Patient Appointments & Reception',
    domainCode: 'Sections 14.10 - 16.05 • Front Office',
    domainClass: 'Operational',
    domainClassBadge: 'bg-[#eaedff] text-[#3f4850]',
    name: 'Waiting Room Queue Management',
    description: 'Live patient check-in timestamping, triage prioritizing, and chair call-in signals.',
    icon: 'how_to_reg',
    receptionAccess: { label: '✓ Full Queue Dispatch', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
    dentistAccess: { label: '◐ Summon Chair Next', badge: 'bg-[#cde5ff] text-[#004b74]' },
  },
  {
    id: 'perm-6',
    category: 'finance',
    domain: 'Financial Ledgers & Fee Waivers',
    domainCode: 'Sections 16.30 - 16.35 • Fiscal Segregation',
    domainClass: 'Audited',
    domainClassBadge: 'bg-[#cce5ff] text-[#001d31]',
    name: 'Counter Payment Settlement & POS',
    description: 'Collection via debit card POS terminals, bank transfer reconciliation, and receipt generation.',
    icon: 'point_of_sale',
    receptionAccess: { label: '✓ Cashless Settlement', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
    dentistAccess: { label: '✕ Prohibited', badge: 'bg-[#ffdad6] text-[#ba1a1a]', sub: '(Segregation Rule)' },
    otherRoleAccess: { role: 'Billing Officer', label: '✓ Full Invoicing', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
  },
  {
    id: 'perm-7',
    category: 'finance',
    domain: 'Financial Ledgers & Fee Waivers',
    domainCode: 'Sections 16.30 - 16.35 • Fiscal Segregation',
    domainClass: 'Audited',
    domainClassBadge: 'bg-[#cce5ff] text-[#001d31]',
    name: 'Fee Adjustment & Refund Authorization',
    description: 'Application of goodwill concessions, insurance co-pay write-offs, and card reversals.',
    icon: 'price_change',
    receptionAccess: { label: '◐ Request Only', badge: 'bg-[#cde5ff] text-[#004b74]', sub: '(< ₦5,000)' },
    managerAccess: { label: '⚠️ Dual Sign-off', badge: 'bg-[#cce5ff] text-[#006194]' },
    dentistAccess: { label: '✕ Prohibited', badge: 'bg-[#ffdad6] text-[#ba1a1a]' },
  },
  {
    id: 'perm-8',
    category: 'operations',
    domain: 'Staff Administration & Roles',
    domainCode: 'Section 17.00 - 17.40 • Governance Control',
    domainClass: 'Super-Admin',
    domainClassBadge: 'bg-[#e2e7ff] text-[#131b2e]',
    name: 'Invite Staff & Assign Roles',
    description: 'Provisioning credentials, branch scoping, and assigning clinical/administrative roles.',
    icon: 'badge',
    managerAccess: { label: '✓ Authorized', badge: 'bg-[#86f2e4]/40 text-[#006a61]', sub: '(Standard Roles)' },
    dentistAccess: { label: '✕ Prohibited', badge: 'bg-[#ffdad6] text-[#ba1a1a]' },
    otherRoleAccess: { role: 'Org Owner', label: '✓ Master Authority', badge: 'bg-[#86f2e4]/40 text-[#006a61]' },
  },
];

export const RolePermissionMatrixScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CategoryTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPermissions = useMemo(() => {
    return PERMISSIONS_DATA.filter((perm) => {
      // Category filter
      if (activeCategory !== 'all' && perm.category !== activeCategory) {
        return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          perm.name.toLowerCase().includes(q) ||
          perm.description.toLowerCase().includes(q) ||
          perm.domain.toLowerCase().includes(q)
        );
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
              aria-label="Go Back"
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#131b2e] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="arrow_back" className="text-xl" />
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
              onClick={() => triggerToast('Notification: Role audit sync verified.')}
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
        {/* Screen Header Narrative */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">
                Compliance Protocol 17.10
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Role & Permission Matrix
            </h1>
            <p className="text-xs md:text-sm text-[#3f4850] leading-relaxed max-w-3xl">
              Statutory access control list across clinic operational cadres and clinical staff.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/staff-management/create-custom-role')}
              className="px-4 py-2.5 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="add_moderator" className="text-base" />
              <span>Create Custom Role</span>
            </button>
          </div>
        </div>

        {/* Role Comparison Selector Chips */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-xs border border-[#eaedff] space-y-3">
          <div className="flex items-center justify-between">
            <label className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e]">
              Comparing Active Roles
            </label>
            <button
              type="button"
              onClick={() => triggerToast('Cadre comparison drawer opened')}
              className="text-xs font-semibold text-[#006194] flex items-center gap-1 hover:underline"
            >
              <span>Modify Cadres</span>
              <Icon name="tune" className="text-sm" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <div className="flex items-center gap-1.5 bg-[#cce5ff] text-[#001d31] px-3.5 py-1.5 rounded-full shrink-0 shadow-xs text-xs font-semibold">
              <Icon name="medical_services" className="text-sm text-[#006194]" />
              <span>Dentist (General)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#86f2e4]/30 text-[#006a61] px-3.5 py-1.5 rounded-full shrink-0 shadow-xs text-xs font-semibold">
              <Icon name="desk" className="text-sm text-[#006a61]" />
              <span>Receptionist</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#eaedff] text-[#131b2e] px-3.5 py-1.5 rounded-full shrink-0 shadow-xs text-xs font-semibold">
              <Icon name="admin_panel_settings" className="text-sm text-[#006195]" />
              <span>Clinic Manager</span>
            </div>
            <button
              type="button"
              onClick={() => triggerToast('Role selector dialog opened.')}
              aria-label="Add role to compare"
              className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881] shrink-0 transition-colors"
            >
              <Icon name="add" className="text-lg" />
            </button>
          </div>
        </div>

        {/* Search Bar & Filter Tabs */}
        <div className="space-y-3">
          <div className="relative w-full">
            <Icon name="search" className="text-xl text-[#707881] absolute left-4 top-3.5 pointer-events-none" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search permission (e.g. Odontogram, Billing, Appointments, Radiology)..."
              className="w-full h-12 pl-12 pr-11 bg-white text-[#131b2e] font-['Inter'] text-sm rounded-2xl shadow-xs border border-[#eaedff] focus:outline-none focus:ring-2 focus:ring-[#006194] transition-all"
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

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
              }`}
            >
              All Categories
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('clinical')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'clinical'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
              }`}
            >
              Clinical & Diag
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('operations')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'operations'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
              }`}
            >
              Operations & Desk
            </button>
            <button
              type="button"
              onClick={() => setActiveCategory('finance')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                activeCategory === 'finance'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff] border border-[#eaedff]'
              }`}
            >
              Finance & Ledger
            </button>
          </div>
        </div>

        {/* Matrix Visual Legend Card */}
        <div className="bg-[#f2f3ff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/60 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#131b2e] flex items-center gap-1.5">
              <Icon name="verified_user" className="text-base text-[#006194]" />
              <span>Statutory Legend</span>
            </span>
            <span className="text-[11px] text-[#707881]">Tap badge for policy note</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-1 text-xs">
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#eaedff]">
              <span className="w-5 h-5 rounded-full bg-[#86f2e4]/40 text-[#006a61] flex items-center justify-center shrink-0 text-xs font-bold">✓</span>
              <span className="text-[#131b2e]">Full Access</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#eaedff]">
              <span className="w-5 h-5 rounded-full bg-[#cde5ff] text-[#004b74] flex items-center justify-center shrink-0 text-xs font-bold">◐</span>
              <span className="text-[#131b2e]">Branch / Scoped</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#eaedff]">
              <span className="w-5 h-5 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 text-xs font-bold">✕</span>
              <span className="text-[#131b2e]">Not Permitted</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#eaedff]">
              <span className="w-5 h-5 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0 text-[10px] font-bold">🔒</span>
              <span className="text-[#131b2e]">DHA Statutory Lock</span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-[#eaedff] col-span-2 sm:col-span-1">
              <span className="w-5 h-5 rounded-full bg-[#cce5ff] text-[#006194] flex items-center justify-center shrink-0 text-[10px] font-bold">⚠️</span>
              <span className="text-[#131b2e]">Dual Sign-off Required</span>
            </div>
          </div>
        </div>

        {/* Matrix Rows (Responsive Cards Grid on Desktop) */}
        <div className="space-y-4">
          {filteredPermissions.map((perm) => (
            <div
              key={perm.id}
              className="bg-white rounded-2xl p-5 md:p-6 shadow-xs border border-[#eaedff] space-y-4 hover:border-[#006194]/30 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#f2f3ff] text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name={perm.icon} className="text-lg" />
                  </div>
                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-sm md:text-base text-[#131b2e]">
                      {perm.name}
                    </h3>
                    <span className="text-xs text-[#707881]">{perm.domainCode}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold self-start sm:self-auto ${perm.domainClassBadge}`}>
                  {perm.domainClass}
                </span>
              </div>

              <p className="text-xs text-[#3f4850] leading-relaxed">
                {perm.description}
              </p>

              {/* Roles Matrix Grid for this Permission */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
                {/* Dentist */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#006194]"></span>
                    <span className="text-xs font-medium text-[#131b2e]">Dentist (General)</span>
                  </div>
                  <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${perm.dentistAccess.badge}`}>
                    <span>{perm.dentistAccess.label}</span>
                    {perm.dentistAccess.sub && (
                      <span className="text-[10px] opacity-80">{perm.dentistAccess.sub}</span>
                    )}
                  </div>
                </div>

                {/* Receptionist */}
                {perm.receptionAccess && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                      <span className="text-xs font-medium text-[#131b2e]">Receptionist</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${perm.receptionAccess.badge}`}>
                      <span>{perm.receptionAccess.label}</span>
                      {perm.receptionAccess.sub && (
                        <span className="text-[10px] opacity-80">{perm.receptionAccess.sub}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Clinic Manager */}
                {perm.managerAccess && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#287ab3]"></span>
                      <span className="text-xs font-medium text-[#131b2e]">Clinic Manager</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${perm.managerAccess.badge}`}>
                      <span>{perm.managerAccess.label}</span>
                      {perm.managerAccess.sub && (
                        <span className="text-[10px] opacity-80">{perm.managerAccess.sub}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Nurse */}
                {perm.nurseAccess && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#6bd8cb]"></span>
                      <span className="text-xs font-medium text-[#131b2e]">Chairside Nurse</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${perm.nurseAccess.badge}`}>
                      <span>{perm.nurseAccess.label}</span>
                      {perm.nurseAccess.sub && (
                        <span className="text-[10px] opacity-80">{perm.nurseAccess.sub}</span>
                      )}
                    </div>
                  </div>
                )}

                {/* Other role */}
                {perm.otherRoleAccess && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#707881]"></span>
                      <span className="text-xs font-medium text-[#131b2e]">{perm.otherRoleAccess.role}</span>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${perm.otherRoleAccess.badge}`}>
                      <span>{perm.otherRoleAccess.label}</span>
                      {perm.otherRoleAccess.sub && (
                        <span className="text-[10px] opacity-80">{perm.otherRoleAccess.sub}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredPermissions.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-[#eaedff] space-y-3">
            <div className="w-12 h-12 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] mx-auto">
              <Icon name="search_off" className="text-2xl" />
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-base text-[#131b2e]">
              No Permissions Found
            </h3>
            <p className="text-xs text-[#3f4850] max-w-sm mx-auto">
              No system permissions match your query. Try searching for 'charting', 'billing', or 'appointments'.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#006194] font-semibold hover:underline"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* Statutory Governance Statement Safeguard Box */}
        <div className="bg-[#eaedff]/60 rounded-2xl p-5 md:p-6 border border-[#dae2fd]">
          <div className="flex items-start gap-4">
            <div className="w-9 h-9 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="shield" className="text-lg" />
            </div>
            <div className="space-y-1.5">
              <h3 className="font-['Plus_Jakarta_Sans'] font-semibold text-xs md:text-sm text-[#ba1a1a] uppercase tracking-wider">
                Clinical Data Integrity Safeguard
              </h3>
              <p className="text-xs text-[#3f4850] leading-relaxed">
                In accordance with <strong className="text-[#131b2e]">DHA Statutory Healthcare Regulations (EHR-2023)</strong>, non-clinical personnel (receptionists, billing clerks, drivers) are cryptographically blocked from diagnostic oral findings and medical histories regardless of custom role configurations.
              </p>
              <div className="flex items-center gap-3 pt-1 text-xs text-[#707881]">
                <span className="inline-flex items-center gap-1 font-semibold text-[#006194]">
                  <Icon name="verified" className="text-xs" />
                  <span>Verified by DHA Registry</span>
                </span>
                <span>•</span>
                <span className="font-mono">Protocol Hash: 0x94B...81F</span>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#eaedff]">
          <p className="text-xs text-[#707881] text-center sm:text-left">
            All role adjustments are captured in the immutable audit trail (ISO 27001).
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => triggerToast('Generating DHA Audit Trail PDF...')}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border border-[#eaedff] transition-colors shadow-xs"
            >
              <Icon name="picture_as_pdf" className="text-base text-[#ba1a1a]" />
              <span>Export Audit PDF</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/staff-management/create-custom-role')}
              className="flex-1 sm:flex-none px-5 py-2.5 bg-[#006194] hover:bg-[#007bb9] text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="add_moderator" className="text-base" />
              <span>Create Custom Role (17.11)</span>
            </button>
          </div>
        </div>
      </main>

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 bg-[#131b2e] text-white px-4 py-2.5 rounded-xl shadow-xl text-xs flex items-center gap-2 border border-white/10 animate-fade-in">
          <Icon name="info" className="text-sm text-[#86f2e4]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
