import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface CredentialCard {
  id: string;
  name: string;
  title: string;
  badge: string;
  badgeType: 'verified' | 'ready' | 'active' | 'admin' | 'locked';
  avatarInitials: string;
  avatarBg: string;
  category: 'verified' | 'pending-license' | 'pending-affiliation' | 'suspended';
  sovereignTitle: string;
  sovereignCode: string;
  sovereignDesc: string;
  sovereignStatus: 'verified' | 'pending' | 'exempt';
  affiliationTitle: string;
  affiliationState: string;
  affiliationDesc: string;
  affiliationStatus: 'active' | 'pending' | 'restricted';
  note?: string;
  alert?: string;
  actions: { label: string; primary?: boolean; icon: string; action: () => void }[];
}

export const ProfessionalVerificationAffiliationScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'verified' | 'pending-license' | 'pending-affiliation' | 'suspended'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const cards: CredentialCard[] = [
    {
      id: 'c-1',
      name: 'Dr. Michael Adeyemi',
      title: 'Lead Restorative Dentist',
      badge: 'Fully Compliant',
      badgeType: 'verified',
      avatarInitials: 'MA',
      avatarBg: 'bg-[#cce5ff] text-[#006194]',
      category: 'verified',
      sovereignTitle: 'Professional Verification (Sovereign DHA)',
      sovereignCode: 'VERIFIED DHA • MDCN #DEN-78421',
      sovereignDesc: 'Annual license current • Good Standing',
      sovereignStatus: 'verified',
      affiliationTitle: 'Clinic Operational Affiliation',
      affiliationState: 'ACTIVE AFFILIATION',
      affiliationDesc: 'Harmony Dental Wuse 2 & Maitama Branches',
      affiliationStatus: 'active',
      actions: [
        {
          label: 'View Credentials & Affiliation Dossier',
          icon: 'folder_shared',
          action: () => navigate('/staff-management/profile')
        }
      ]
    },
    {
      id: 'c-2',
      name: 'Dr. Daniel Musa',
      title: 'Associate Dentist',
      badge: 'DHA Ready',
      badgeType: 'ready',
      avatarInitials: 'DM',
      avatarBg: 'bg-[#cde5ff] text-[#001d32]',
      category: 'pending-affiliation',
      sovereignTitle: 'Professional Verification (Sovereign DHA)',
      sovereignCode: 'VERIFIED DHA • MDCN #DEN-88210',
      sovereignDesc: 'Validated Identity • Good Standing',
      sovereignStatus: 'verified',
      affiliationTitle: 'Clinic Operational Affiliation',
      affiliationState: 'PENDING RECIPIENT ACCEPTANCE',
      affiliationDesc: 'Affiliation invite dispatched 22 Oct',
      affiliationStatus: 'pending',
      note: 'Dr. Musa is an authenticated doctor on DHA; clinical chairside permissions unlock automatically upon him accepting the clinic invite via his practitioner app.',
      actions: [
        {
          label: 'Resend Invite',
          primary: true,
          icon: 'send',
          action: () => triggerToast('Affiliation invitation re-dispatched to Dr. Daniel Musa')
        },
        {
          label: 'View Status',
          icon: 'visibility',
          action: () => navigate('/staff-management/invitation')
        }
      ]
    },
    {
      id: 'c-3',
      name: 'Dr. Aisha Bello',
      title: 'Visiting Specialist • Endodontics',
      badge: 'Contract Active',
      badgeType: 'active',
      avatarInitials: 'AB',
      avatarBg: 'bg-[#86f2e4] text-[#006f66]',
      category: 'verified',
      sovereignTitle: 'Professional Verification (Sovereign DHA)',
      sovereignCode: 'VERIFIED DHA • MDCN #DEN-84319',
      sovereignDesc: 'Specialist Endodontic Register • Valid to 2026',
      sovereignStatus: 'verified',
      affiliationTitle: 'Clinic Operational Affiliation',
      affiliationState: 'ACTIVE AFFILIATION',
      affiliationDesc: 'Maitama Specialist Center (Sessional Tier)',
      affiliationStatus: 'active',
      actions: [
        {
          label: 'View Dossier & Sessional Rights',
          icon: 'badge',
          action: () => navigate('/staff-management/permissions')
        }
      ]
    },
    {
      id: 'c-4',
      name: 'Grace Ibrahim',
      title: 'Senior Receptionist & Billing Admin',
      badge: 'Admin Level 2',
      badgeType: 'admin',
      avatarInitials: 'GI',
      avatarBg: 'bg-[#dae2fd] text-[#131b2e]',
      category: 'verified',
      sovereignTitle: 'Identity Registry',
      sovereignCode: 'NON-CLINICAL ROLE • TIER 2 ADMIN',
      sovereignDesc: 'Exempt from MDCN Statutory Dental Licensing',
      sovereignStatus: 'exempt',
      affiliationTitle: 'Clinic Operational Affiliation',
      affiliationState: 'ACTIVE AFFILIATION',
      affiliationDesc: 'Wuse 2 Main Branch (Front Office & Scheduling)',
      affiliationStatus: 'active',
      actions: [
        {
          label: 'View Operational Access Details',
          icon: 'manage_accounts',
          action: () => navigate('/staff-management/permissions')
        }
      ]
    },
    {
      id: 'c-5',
      name: 'Dr. Nnamdi Eze',
      title: 'Locum Maxillofacial Surgeon',
      badge: 'Charts Locked',
      badgeType: 'locked',
      avatarInitials: 'NE',
      avatarBg: 'bg-[#ffdad6] text-[#ba1a1a]',
      category: 'pending-license',
      sovereignTitle: 'Statutory Verification (DHA/MDCN)',
      sovereignCode: 'PENDING MDCN ANNUAL CLEARANCE',
      sovereignDesc: 'Annual CPD validation pending (Token 2026-A)',
      sovereignStatus: 'pending',
      affiliationTitle: 'Clinic Operational Affiliation',
      affiliationState: 'GATEWAY RESTRICTION ACTIVE',
      affiliationDesc: 'Restricted from chart alterations & prescribing',
      affiliationStatus: 'restricted',
      alert: 'Clinical operatory charts and electronic scripts are locked automatically by DHA sovereign protocol until national annual clearance token uploads and registers.',
      actions: [
        {
          label: 'Upload Clearance',
          primary: true,
          icon: 'upload_file',
          action: () => triggerToast('Clearance verification upload modal opened')
        },
        {
          label: 'Contact Dr. Eze',
          icon: 'outgoing_mail',
          action: () => triggerToast('Direct dispatch to Dr. Nnamdi Eze sent')
        }
      ]
    }
  ];

  const filteredCards = cards.filter(card => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'verified') return card.category === 'verified';
    if (activeFilter === 'pending-license') return card.category === 'pending-license';
    if (activeFilter === 'pending-affiliation') return card.category === 'pending-affiliation';
    if (activeFilter === 'suspended') return card.category === 'pending-license';
    return true;
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
              onClick={() => triggerToast('Search registry')}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-20">
        <div className="flex flex-col gap-5">
          {/* Title Header */}
          <div className="flex flex-col gap-1 pt-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
              <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
                Registry & Governance
              </span>
            </div>
            <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
              Verification & Affiliations
            </h1>
            <p className="text-xs md:text-sm text-[#707881]">
              Statutory national registry credentials vs. clinic operational affiliations.
            </p>
          </div>

          {/* DHA Sovereign Architecture Explanatory Banner */}
          <div className="bg-[#eaedff] rounded-2xl p-4 md:p-5 shadow-xs border border-[#dae2fd]">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#007bb9] text-white flex items-center justify-center shrink-0 shadow-xs">
                <Icon name="policy" className="text-xl" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-['Plus_Jakarta_Sans'] font-bold text-sm text-[#131b2e]">
                    DHA Sovereign Architecture
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006194] text-white uppercase tracking-wider">
                    Decoupled
                  </span>
                </div>
                <p className="text-xs text-[#3f4850] mt-1 leading-relaxed">
                  <strong className="text-[#131b2e] font-semibold">Professional Verification vs. Clinic Affiliation are strictly separated.</strong> DHA & MDCN sovereignly certify practitioner identity, license, and clinical standing. Clinic administrators grant operational affiliations but <span className="text-[#ba1a1a] font-semibold">cannot</span> alter or self-certify national statutory credentials.
                </p>
              </div>
            </div>
          </div>

          {/* Summary Statistics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#006a61] uppercase tracking-wider">DHA Verified</span>
                <Icon name="verified" className="text-[#006a61] text-lg" filled />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">24</span>
                <span className="text-xs text-[#707881]">Clinicians</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider">Pending MDCN</span>
                <Icon name="hourglass_top" className="text-[#006195] text-lg" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">2</span>
                <span className="text-xs text-[#707881]">Clearances</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#006194] uppercase tracking-wider">Clinic Active</span>
                <Icon name="domain_verification" className="text-[#006194] text-lg" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">26</span>
                <span className="text-xs text-[#707881]">Staff Affiliated</span>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider">Invites Out</span>
                <Icon name="forward_to_inbox" className="text-[#707881] text-lg" />
              </div>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e]">2</span>
                <span className="text-xs text-[#707881]">Pending Acceptance</span>
              </div>
            </div>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="w-full overflow-x-auto pb-1 no-scrollbar">
            <div className="flex items-center gap-1.5 p-1 bg-[#eaedff] rounded-xl w-max">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeFilter === 'all'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>All</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#f2f3ff] text-[10px] font-bold">28</span>
              </button>
              <button
                onClick={() => setActiveFilter('verified')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeFilter === 'verified'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>Verified Clinicians</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#f2f3ff] text-[10px] font-bold">24</span>
              </button>
              <button
                onClick={() => setActiveFilter('pending-license')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeFilter === 'pending-license'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>Pending License</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#f2f3ff] text-[10px] font-bold">2</span>
              </button>
              <button
                onClick={() => setActiveFilter('pending-affiliation')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeFilter === 'pending-affiliation'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>Pending Affiliation</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#f2f3ff] text-[10px] font-bold">2</span>
              </button>
              <button
                onClick={() => setActiveFilter('suspended')}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeFilter === 'suspended'
                    ? 'bg-white text-[#ba1a1a] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                <span>Suspended / Locked</span>
                <span className="px-1.5 py-0.2 rounded-full bg-[#ffdad6] text-[#ba1a1a] text-[10px] font-bold">1</span>
              </button>
            </div>
          </div>

          {/* Cards Stack */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col justify-between hover:border-[#006194]/30 hover:shadow-sm transition-all"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-12 h-12 rounded-xl ${card.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}>
                        {card.avatarInitials}
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-[#131b2e] truncate">
                          {card.name}
                        </h3>
                        <p className="text-xs text-[#707881] truncate">{card.title}</p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold shrink-0 ${
                        card.badgeType === 'verified'
                          ? 'bg-[#86f2e4] text-[#006f66]'
                          : card.badgeType === 'ready'
                          ? 'bg-[#cce5ff] text-[#004b73]'
                          : card.badgeType === 'active'
                          ? 'bg-[#86f2e4] text-[#006f66]'
                          : card.badgeType === 'admin'
                          ? 'bg-[#eaedff] text-[#3f4850]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {card.badge}
                    </span>
                  </div>

                  {/* Comparative Dimensions */}
                  <div className="space-y-2 mb-3">
                    {/* Sovereign Tier */}
                    <div className="bg-[#f2f3ff] rounded-xl p-3 flex items-start gap-2.5">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          card.sovereignStatus === 'verified'
                            ? 'bg-[#86f2e4] text-[#006a61]'
                            : card.sovereignStatus === 'pending'
                            ? 'bg-[#ffdad6] text-[#ba1a1a]'
                            : 'bg-[#eaedff] text-[#3f4850]'
                        }`}
                      >
                        <Icon
                          name={
                            card.sovereignStatus === 'verified'
                              ? 'verified_user'
                              : card.sovereignStatus === 'pending'
                              ? 'warning'
                              : 'id_card'
                          }
                          className="text-xs"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#707881] block">
                          {card.sovereignTitle}
                        </span>
                        <p className="font-semibold text-[#131b2e] truncate">{card.sovereignCode}</p>
                        <p className="text-[#707881] text-[11px] mt-0.5">{card.sovereignDesc}</p>
                      </div>
                    </div>

                    {/* Clinic Affiliation Tier */}
                    <div
                      className={`rounded-xl p-3 flex items-start gap-2.5 ${
                        card.affiliationStatus === 'restricted'
                          ? 'bg-[#ffdad6]/40'
                          : card.affiliationStatus === 'pending'
                          ? 'bg-[#eaedff]'
                          : 'bg-[#f2f3ff]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          card.affiliationStatus === 'active'
                            ? 'bg-[#cce5ff] text-[#006194]'
                            : card.affiliationStatus === 'pending'
                            ? 'bg-[#d2d9f4] text-[#707881]'
                            : 'bg-[#ba1a1a] text-white'
                        }`}
                      >
                        <Icon
                          name={
                            card.affiliationStatus === 'active'
                              ? 'check_circle'
                              : card.affiliationStatus === 'pending'
                              ? 'schedule'
                              : 'lock'
                          }
                          className="text-xs"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wide text-[#707881] block">
                          {card.affiliationTitle}
                        </span>
                        <p
                          className={`font-semibold truncate ${
                            card.affiliationStatus === 'restricted' ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                          }`}
                        >
                          {card.affiliationState}
                        </p>
                        <p className="text-[#707881] text-[11px] mt-0.5">{card.affiliationDesc}</p>
                      </div>
                    </div>
                  </div>

                  {/* Informational Notes / Alerts */}
                  {card.note && (
                    <div className="p-3 rounded-xl bg-[#f2f3ff] text-[#3f4850] text-xs flex items-start gap-2 mb-3">
                      <Icon name="info" className="text-sm text-[#006194] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{card.note}</p>
                    </div>
                  )}

                  {card.alert && (
                    <div className="p-3 rounded-xl bg-[#ffdad6]/60 text-[#93000a] text-xs flex items-start gap-2 mb-3">
                      <Icon name="verified_user" className="text-sm text-[#ba1a1a] shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{card.alert}</p>
                    </div>
                  )}
                </div>

                {/* Card Actions */}
                <div className={`grid gap-2 pt-2 border-t border-[#eaedff] ${card.actions.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                  {card.actions.map((act, idx) => (
                    <button
                      key={idx}
                      onClick={act.action}
                      className={`h-11 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors ${
                        act.primary
                          ? 'bg-[#006194] hover:bg-[#007bb9] text-white shadow-xs'
                          : 'bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194]'
                      }`}
                    >
                      <Icon name={act.icon} className="text-base" />
                      <span>{act.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Primary Governance Actions Bottom Block */}
          <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#eaedff] flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => triggerToast('Initiating supplementary upload to DHA sovereign registry')}
              className="w-full sm:flex-1 h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs md:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
            >
              <Icon name="assignment_turned_in" className="text-lg" />
              <span>Submit Supporting Info to DHA Registry</span>
            </button>
            <button
              onClick={() => triggerToast('Generating full accreditation audit matrix (PDF/CSV)...')}
              className="w-full sm:flex-1 h-12 rounded-xl bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs md:text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Icon name="table_view" className="text-lg text-[#006194]" />
              <span>Export Accreditation Matrix (PDF/CSV)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
