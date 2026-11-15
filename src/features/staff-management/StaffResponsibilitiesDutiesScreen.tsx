import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface DutyItem {
  id: string;
  category: string;
  badge: string;
  badgeType: 'ops' | 'iso' | 'warning' | 'finance' | 'inventory';
  title: string;
  assignees: { name: string; title: string; initials: string; bg: string }[];
  description: string;
  status: string;
  statusIcon: string;
  buttonLabel: string;
  buttonPrimary?: boolean;
  filterType: 'clinical' | 'facility' | 'frontdesk';
}

export const StaffResponsibilitiesDutiesScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedScope, setSelectedScope] = useState<'all' | 'wuse2' | 'maitama' | 'gwarinpa'>('all');
  const [activeFilter, setActiveFilter] = useState<'all' | 'clinical' | 'facility' | 'frontdesk'>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const duties: DutyItem[] = [
    {
      id: 'd-1',
      category: 'Front-Desk & Clinical Bridge',
      badge: 'Ops Duty',
      badgeType: 'ops',
      title: 'Appointment & Operatory Coordination',
      assignees: [
        { name: 'Grace Ibrahim', title: 'Lead Receptionist • Wuse 2', initials: 'GI', bg: 'bg-[#86f2e4] text-[#006f66]' }
      ],
      description: 'Daily diary scheduling, emergency walk-in slot pacing, operatory 1–4 call-in chime.',
      status: 'Active • Delegated by Mgr. Samuel Eze',
      statusIcon: 'check_circle',
      buttonLabel: 'Reassign Duty',
      filterType: 'frontdesk'
    },
    {
      id: 'd-2',
      category: 'Clinical & Bio-Safety',
      badge: 'ISO 13485',
      badgeType: 'iso',
      title: 'Infection Prevention & Sterilization QA',
      assignees: [
        { name: 'Dr. Michael Adeyemi (Lead)', title: 'Senior Consultant', initials: 'MA', bg: 'bg-[#cce5ff] text-[#006194]' },
        { name: 'Nurse Fatima Noor', title: 'CSSD Specialist', initials: 'FN', bg: 'bg-[#86f2e4] text-[#006f66]' }
      ],
      description: 'Bi-weekly autoclave spore assays, chemical indicator logging (ISO 13485), PPE par inventory.',
      status: 'Active • Mandated Clinical Oversight',
      statusIcon: 'verified_user',
      buttonLabel: 'Reassign Duty',
      filterType: 'facility'
    },
    {
      id: 'd-3',
      category: 'Clinical Care • Critical',
      badge: 'Awaiting Sign-off',
      badgeType: 'warning',
      title: 'Emergency Acute Walk-in Triage',
      assignees: [
        { name: 'Dr. Daniel Musa', title: 'Associate Dentist • Wuse 2', initials: 'DM', bg: 'bg-[#cde5ff] text-[#001d32]' }
      ],
      description: 'Pulpitis rapid screening, acute swelling triage, narcotic prescription supervision.',
      status: 'Pending Acceptance of Affiliation',
      statusIcon: 'hourglass_top',
      buttonLabel: 'Review Delegation',
      buttonPrimary: true,
      filterType: 'clinical'
    },
    {
      id: 'd-4',
      category: 'Front-Desk & Billing',
      badge: 'Finance',
      badgeType: 'finance',
      title: 'Cashless POS Settlement & Reconciliations',
      assignees: [
        { name: 'David James', title: 'Billing Officer • Maitama & Wuse 2', initials: 'DJ', bg: 'bg-[#eaedff] text-[#006194]' }
      ],
      description: 'Daily terminal batch audits, NIBSS bank transfer matching, tax receipt stamping.',
      status: 'Active • Finance Mandate',
      statusIcon: 'check_circle',
      buttonLabel: 'Reassign Duty',
      filterType: 'frontdesk'
    },
    {
      id: 'd-5',
      category: 'Facility & Inventory',
      badge: 'Inventory',
      badgeType: 'inventory',
      title: 'Dental Consumables Reorder Coordination',
      assignees: [
        { name: 'Amina Yusuf', title: 'Chairside Nurse • Wuse 2', initials: 'AY', bg: 'bg-[#dae2fd] text-[#131b2e]' }
      ],
      description: 'Resin par level checks, Septocaine anesthesia buffer monitoring, expired compound returns.',
      status: 'Active • Weekly Cycle',
      statusIcon: 'check_circle',
      buttonLabel: 'Reassign Duty',
      filterType: 'facility'
    }
  ];

  const filteredDuties = duties.filter(d => {
    if (activeFilter === 'all') return true;
    return d.filterType === activeFilter;
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
              onClick={() => triggerToast('Search responsibilities')}
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 pt-20 pb-24">
        {/* Page Header */}
        <section className="mb-5">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61]">
              Governance & Operations
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
              12 Active Rosters
            </span>
          </div>
          <h1 className="font-['Plus_Jakarta_Sans'] text-2xl md:text-3xl font-bold text-[#131b2e] tracking-tight">
            Staff Responsibilities & Duties
          </h1>
          <p className="text-xs md:text-sm text-[#707881] mt-0.5">
            Operational duty assignments and clinical delegations across clinic personnel.
          </p>
        </section>

        {/* Branch Scope Selector */}
        <section className="mb-4">
          <div className="bg-[#f2f3ff] p-2 rounded-2xl flex items-center gap-2 overflow-x-auto shadow-xs border border-[#eaedff]">
            <div className="flex items-center gap-1.5 px-2 text-[#006194] text-xs font-semibold shrink-0">
              <Icon name="location_on" className="text-base" />
              <span>Scope:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto shrink-0 py-0.5">
              <button
                onClick={() => setSelectedScope('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedScope === 'all'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                All Harmony Facilities
              </button>
              <button
                onClick={() => setSelectedScope('wuse2')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedScope === 'wuse2'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Wuse 2
              </button>
              <button
                onClick={() => setSelectedScope('maitama')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedScope === 'maitama'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Maitama
              </button>
              <button
                onClick={() => setSelectedScope('gwarinpa')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  selectedScope === 'gwarinpa'
                    ? 'bg-white text-[#006194] shadow-xs'
                    : 'text-[#3f4850] hover:text-[#131b2e]'
                }`}
              >
                Gwarinpa
              </button>
            </div>
          </div>
        </section>

        {/* Filter Pills Carousel */}
        <section className="mb-5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 pb-1 min-w-max">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>All Duties</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-xs">12</span>
            </button>
            <button
              onClick={() => setActiveFilter('clinical')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'clinical'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Clinical Care</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-xs">5</span>
            </button>
            <button
              onClick={() => setActiveFilter('facility')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'facility'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Facility & Sterilization</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-xs">3</span>
            </button>
            <button
              onClick={() => setActiveFilter('frontdesk')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors ${
                activeFilter === 'frontdesk'
                  ? 'bg-[#006194] text-white shadow-xs'
                  : 'bg-[#eaedff] text-[#3f4850] hover:bg-[#dae2fd]'
              }`}
            >
              <span>Front-Desk & Billing</span>
              <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-xs">4</span>
            </button>
          </div>
        </section>

        {/* Duty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {filteredDuties.map((duty) => (
            <article
              key={duty.id}
              className="bg-white rounded-2xl shadow-xs border border-[#eaedff] flex flex-col justify-between overflow-hidden hover:border-[#006194]/30 hover:shadow-sm transition-all"
            >
              <div className="p-4 md:p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col min-w-0">
                    <span className="text-[11px] font-bold text-[#006a61] uppercase tracking-wider">
                      {duty.category}
                    </span>
                    <h2 className="font-['Plus_Jakarta_Sans'] font-bold text-sm md:text-base text-[#131b2e] mt-0.5 truncate">
                      {duty.title}
                    </h2>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold shrink-0 ${
                      duty.badgeType === 'iso'
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : duty.badgeType === 'warning'
                        ? 'bg-[#ffdad6] text-[#ba1a1a]'
                        : 'bg-[#eaedff] text-[#3f4850]'
                    }`}
                  >
                    {duty.badge}
                  </span>
                </div>

                {/* Assignees */}
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff]">
                  {duty.assignees.length > 1 ? (
                    <div className="flex -space-x-2 shrink-0">
                      {duty.assignees.map((a, i) => (
                        <div
                          key={i}
                          className={`w-9 h-9 rounded-full ${a.bg} flex items-center justify-center font-bold text-xs ring-2 ring-white shadow-xs`}
                        >
                          {a.initials}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className={`w-9 h-9 rounded-xl ${duty.assignees[0].bg} flex items-center justify-center font-bold text-xs shrink-0 shadow-xs`}
                    >
                      {duty.assignees[0].initials}
                    </div>
                  )}

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-xs text-[#131b2e] truncate">
                      {duty.assignees.map(a => a.name).join(' & ')}
                    </p>
                    <p className="text-[11px] text-[#707881] truncate">
                      {duty.assignees[0].title}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#3f4850] leading-relaxed">
                  {duty.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-[#f2f3ff]/70 border-t border-[#eaedff] flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs text-[#006a61] truncate">
                  <Icon name={duty.statusIcon} className="text-base shrink-0" />
                  <span className="truncate">{duty.status}</span>
                </div>
                <button
                  onClick={() => triggerToast(`Action: ${duty.buttonLabel} for ${duty.title}`)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0 transition-colors ${
                    duty.buttonPrimary
                      ? 'bg-[#006194] hover:bg-[#007bb9] text-white shadow-xs'
                      : 'bg-white hover:bg-[#eaedff] text-[#006194] shadow-xs'
                  }`}
                >
                  {duty.buttonLabel}
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Compliance Safeguard Aside */}
        <aside className="p-4 md:p-5 rounded-2xl bg-[#eaedff] border border-[#dae2fd] shadow-xs flex items-start gap-3.5 mb-8">
          <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 shadow-xs mt-0.5">
            <Icon name="policy" className="text-lg" />
          </div>
          <div className="flex flex-col gap-1 min-w-0 text-xs">
            <span className="font-semibold text-sm text-[#131b2e]">Statutory Compliance Safeguard</span>
            <p className="text-[#3f4850] leading-relaxed">
              Clinical care delegations strictly require verified MDCN / DHA board licenses in good standing. Delegated duties operate strictly within governed role boundaries and cannot elevate authority outside credential levels.
            </p>
          </div>
        </aside>

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => triggerToast('Assign New Responsibility dialog opened')}
            className="flex items-center gap-2 px-5 h-12 rounded-full bg-[#006194] hover:bg-[#007bb9] text-white shadow-xl active:scale-95 transition-all text-xs font-semibold tracking-wide"
          >
            <Icon name="add_task" className="text-lg" />
            <span>Assign New Responsibility</span>
          </button>
        </div>
      </main>
    </div>
  );
};
