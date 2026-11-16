import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { QuickLinks } from '../../design/QuickLinks';

type DirectoryFilter = 'all' | 'today' | 'recent' | 'pending' | 'vip';

interface DirectoryPatient {
  id: string;
  name: string;
  ageGender: string;
  lifeCode: string;
  mrn: string;
  statusBadge: string;
  statusType: 'in-clinic' | 'in-procedure' | 'triage' | 'upcoming' | 'discharged';
  phoneAndLocation: string;
  operatoryInfo: string;
  operatoryDetail: string;
  operatoryTag?: string;
  secondaryActionLabel: string;
  secondaryActionIcon: string;
  chips?: string[];
}

const PATIENTS: DirectoryPatient[] = [
  {
    id: 'p1',
    name: 'Amara Okafor',
    ageGender: '34y • Female',
    lifeCode: 'NG-990-281-LAG',
    mrn: 'DHA-2026-00451',
    statusBadge: 'In Clinic',
    statusType: 'in-clinic',
    phoneAndLocation: '+234 803 555 0192 • Wuse 2',
    operatoryInfo: 'Operatory 01 • Checked In',
    operatoryDetail: 'Today, 09:00 AM • Dr. Daniel Okoro',
    operatoryTag: 'SEATED',
    secondaryActionLabel: 'Check-in History',
    secondaryActionIcon: 'history',
  },
  {
    id: 'p2',
    name: 'Ibrahim Waziri',
    ageGender: '42y • Male',
    lifeCode: 'NG-ABJ-882-104',
    mrn: 'DHA-2026-00512',
    statusBadge: 'In Procedure',
    statusType: 'in-procedure',
    phoneAndLocation: '+234 802 331 4099 • Garki 2',
    operatoryInfo: 'Operatory 02 (Orthodontics)',
    operatoryDetail: 'Session Active • Scheduled 10:00 AM',
    secondaryActionLabel: 'Contact Guardian',
    secondaryActionIcon: 'call',
  },
  {
    id: 'p3',
    name: 'Fatima Garba',
    ageGender: '29y • Female',
    lifeCode: 'NG-ABJ-771-402',
    mrn: 'Walk-in #Q-05',
    statusBadge: 'Triage Priority',
    statusType: 'triage',
    phoneAndLocation: '+234 812 400 9182 • Maitama',
    operatoryInfo: 'Emergency Triage • Pain Level 7/10',
    operatoryDetail: 'Waiting 14m • Dr. Daniel Okoro Assigned',
    chips: ['Emergency Triage', 'Self-Pay / Cash', 'Waiting: 14m'],
    secondaryActionLabel: 'Call to Chair',
    secondaryActionIcon: 'notification_important',
  },
  {
    id: 'p4',
    name: 'Yusuf Abubakar',
    ageGender: '38y • Male',
    lifeCode: 'NG-ABJ-112-909',
    mrn: 'NHIA Mansard Gold',
    statusBadge: 'Upcoming',
    statusType: 'upcoming',
    phoneAndLocation: '+234 809 112 4891 • Wuse 2',
    operatoryInfo: 'Crown Preparation (Phase 2)',
    operatoryDetail: 'Today, 11:30 AM (Est. 45m)',
    secondaryActionLabel: 'Confirm Arrival',
    secondaryActionIcon: 'how_to_reg',
  },
  {
    id: 'p5',
    name: 'Ngozi Eze',
    ageGender: '26y • Female',
    lifeCode: 'NG-ABJ-339-182',
    mrn: 'Bupa Global',
    statusBadge: 'Discharged',
    statusType: 'discharged',
    phoneAndLocation: '+234 805 771 9021 • Central Area',
    operatoryInfo: 'Routine Prophylaxis Completed',
    operatoryDetail: '08:30 AM • 6-Month Recall Set',
    operatoryTag: 'PAID',
    secondaryActionLabel: 'View Receipt',
    secondaryActionIcon: 'receipt_long',
  },
];

export const PatientOperationsDirectoryScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<DirectoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredPatients = PATIENTS.filter((p) => {
    if (activeFilter === 'today' && p.statusType === 'upcoming') return false;
    if (activeFilter === 'recent' && p.statusType !== 'upcoming') return false;
    if (activeFilter === 'pending' && p.statusType !== 'triage') return false;
    if (activeFilter === 'vip' && !p.mrn.includes('Gold') && !p.mrn.includes('Bupa')) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.lifeCode.toLowerCase().includes(q) ||
        p.mrn.toLowerCase().includes(q) ||
        p.phoneAndLocation.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in border border-white/10">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#007bb9] text-white flex items-center justify-center shrink-0 shadow-sm">
              <Icon name="dentistry" className="text-[22px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-1 cursor-pointer hover:text-[#006194] transition-colors"
              >
                <span className="text-sm font-bold text-[#131b2e] truncate">Wuse 2 Main Branch</span>
                <Icon name="expand_more" className="text-[#707881] text-[18px]" />
              </div>
              <span className="text-xs text-[#006a61] font-semibold">Patient Directory</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Opening notification center')}
              aria-label="Notifications"
              className="relative w-10 h-10 flex items-center justify-center rounded-xl text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a] ring-2 ring-[#faf8ff]" />
            </button>
            <div className="w-9 h-9 rounded-full bg-[#006194] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              DM
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-28">
        {/* Page Header & Operational Stats */}
        <div className="mb-4 flex flex-col gap-1">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#006a61] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
              Practice Operations Center
            </span>
            <span className="font-mono text-xs text-[#3f4850] bg-[#e2e7ff] px-2.5 py-0.5 rounded-full font-semibold">
              SYNCED 09:42 AM
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
            Patient Directory
          </h1>
          <p className="text-xs sm:text-sm text-[#3f4850]">8,420 registered patients across practice group</p>
        </div>

        {/* Search Hub */}
        <div className="mb-3">
          <div className="relative flex items-center bg-white rounded-2xl border border-[#bfc7d2]/60 shadow-xs">
            <Icon
              name="search"
              className="absolute left-3.5 text-[#707881] text-[22px] pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient by name, LifeCode, phone or MRN..."
              className="w-full h-12 pl-11 pr-11 bg-transparent text-sm text-[#131b2e] placeholder:text-[#707881] focus:outline-none"
            />
            <button
              type="button"
              onClick={() => showToast('QR code scanner launched')}
              aria-label="QR scanner"
              className="absolute right-2.5 w-8 h-8 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#006194] transition-colors"
            >
              <Icon name="qr_code_scanner" className="text-[18px]" />
            </button>
          </div>
        </div>

        {/* Filter Carousel Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar mb-4">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
              activeFilter === 'all'
                ? 'bg-[#006194] text-white'
                : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
            }`}
          >
            <span>All</span>
            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">8,420</span>
          </button>
          <button
            onClick={() => setActiveFilter('today')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
              activeFilter === 'today'
                ? 'bg-[#006194] text-white'
                : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
            }`}
          >
            <span>Today&apos;s Visits</span>
            <span className="text-[10px] bg-[#86f2e4] text-[#006f66] px-1.5 py-0.2 rounded-full font-bold">28</span>
          </button>
          <button
            onClick={() => setActiveFilter('recent')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
              activeFilter === 'recent'
                ? 'bg-[#006194] text-white'
                : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
            }`}
          >
            <span>Recent Registrations</span>
            <span className="text-[10px] bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded-full">14</span>
          </button>
          <button
            onClick={() => setActiveFilter('pending')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
              activeFilter === 'pending'
                ? 'bg-[#006194] text-white'
                : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
            }`}
          >
            <span>Pending Follow-up</span>
            <span className="text-[10px] bg-[#eaedff] text-[#006194] px-1.5 py-0.2 rounded-full">34</span>
          </button>
          <button
            onClick={() => setActiveFilter('vip')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
              activeFilter === 'vip'
                ? 'bg-[#006194] text-white'
                : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
            }`}
          >
            <span>VIP / Insurance</span>
            <span className="text-[10px] bg-[#cce5ff] text-[#001d31] px-1.5 py-0.2 rounded-full font-bold">142</span>
          </button>
        </div>

        {/* Privacy Guardrail Banner */}
        <div className="mb-4 p-4 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/70 flex items-start gap-3 shadow-xs">
          <div className="w-8 h-8 rounded-xl bg-[#89f5e7] text-[#00201d] flex items-center justify-center shrink-0 mt-0.5">
            <Icon name="verified_user" className="text-[18px]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <span className="text-xs sm:text-sm font-bold text-[#006a61]">
              Reception &amp; Operations View Active
            </span>
            <p className="text-xs text-[#3f4850] mt-0.5 leading-relaxed">
              Regulated clinical diagnosis and detailed odontograms are masked in accordance with DHA data privacy policy.
            </p>
          </div>
        </div>

        {/* Patient Cards Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((patient) => {
            const isTriage = patient.statusType === 'triage';
            const isInClinic = patient.statusType === 'in-clinic';
            const isDischarged = patient.statusType === 'discharged';

            return (
              <div
                key={patient.id}
                className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 sm:p-5 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#cce5ff] text-[#004b73] flex items-center justify-center font-bold text-base shrink-0 shadow-xs">
                      {patient.name
                        .split(' ')
                        .map((w) => w[0])
                        .join('')}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-bold text-[#131b2e] truncate">{patient.name}</h2>
                        <span className="text-xs text-[#707881]">{patient.ageGender}</span>
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5 font-mono text-xs">
                        <span className="font-bold text-[#006194]">{patient.lifeCode}</span>
                        <span className="text-[#bfc7d2]">•</span>
                        <span className="text-[#707881]">{patient.mrn}</span>
                      </div>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shrink-0 ${
                      isTriage
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : isInClinic
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : isDischarged
                        ? 'bg-[#eaedff] text-[#006a61]'
                        : 'bg-[#cce5ff] text-[#004b73]'
                    }`}
                  >
                    {patient.statusBadge}
                  </span>
                </div>

                {/* Operatory & Visit Info Box */}
                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40 flex items-center justify-between text-[#131b2e]">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon name="chair" className="text-[#006a61] text-[20px] shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs sm:text-sm font-bold text-[#131b2e] truncate">
                        {patient.operatoryInfo}
                      </span>
                      <span className="text-xs text-[#3f4850] truncate">{patient.operatoryDetail}</span>
                    </div>
                  </div>
                  {patient.operatoryTag && (
                    <span className="font-mono text-xs text-[#006a61] font-bold px-2 py-0.5 rounded bg-white shadow-xs shrink-0">
                      {patient.operatoryTag}
                    </span>
                  )}
                </div>

                {/* Chips if any */}
                {patient.chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {patient.chips.map((c, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-[#eaedff] text-[#006194] text-[11px] font-semibold"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="flex items-center gap-1 truncate">
                    <Icon name="call" className="text-[15px]" />
                    {patient.phoneAndLocation}
                  </span>
                </div>

                {/* Action Footer */}
                <div className="pt-2 border-t border-[#f2f3ff] flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => showToast(`Triggered: ${patient.secondaryActionLabel}`)}
                    className="flex-1 h-9 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Icon name={patient.secondaryActionIcon} className="text-[16px]" />
                    <span>{patient.secondaryActionLabel}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/clinic-operations/appointment-details')}
                    className="flex-1 h-9 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold shadow-xs flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Overview</span>
                    <Icon name="arrow_forward" className="text-[16px]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="flex items-center justify-between w-full text-xs text-[#707881]">
            <span>Showing 5 of 8,420 patients</span>
            <span className="font-mono bg-[#eaedff] text-[#006194] px-2.5 py-0.5 rounded font-bold">
              Page {currentPage} of 1,684
            </span>
          </div>

          <div className="flex items-center gap-2 w-full max-w-sm">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="flex-1 h-10 rounded-xl bg-white border border-[#bfc7d2]/60 text-xs font-bold flex items-center justify-center gap-1 disabled:opacity-50"
            >
              <Icon name="chevron_left" className="text-[18px]" />
              <span>Previous</span>
            </button>
            <div className="flex items-center gap-1 px-1">
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                    currentPage === page
                      ? 'bg-[#006194] text-white shadow-xs'
                      : 'bg-white border border-[#dae2fd]/60 text-[#131b2e] hover:bg-[#eaedff]'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex-1 h-10 rounded-xl bg-white border border-[#bfc7d2]/60 text-xs font-bold flex items-center justify-center gap-1"
            >
              <span>Next</span>
              <Icon name="chevron_right" className="text-[18px]" />
            </button>
          </div>
        </div>

        {/* Sticky Operational Floating Action Button */}
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-30 w-full max-w-md px-4">
          <button
            onClick={() => navigate('/clinic-operations/walk-in-registration')}
            className="w-full h-12 rounded-xl bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition-all"
          >
            <Icon name="person_add" className="text-[20px]" />
            <span>Register Walk-in / New Patient</span>
          </button>
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#faf8ff]/95 backdrop-blur-xl border-t border-[#dae2fd]/60">
        <div className="flex justify-around items-center h-16 px-2 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/clinic-operations/dashboard')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="dashboard" className="text-[22px]" />
            <span className="text-[10px]">Overview</span>
          </button>
          <button
            onClick={() => navigate('/clinic-operations/calendar')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="calendar_today" className="text-[22px]" />
            <span className="text-[10px]">Schedule</span>
          </button>
          <button
            onClick={() => navigate('/clinic-operations/patient-directory')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#006194] font-semibold transition-colors"
          >
            <Icon name="group" className="text-[22px]" />
            <span className="text-[10px]">Patients</span>
          </button>
          <button
            onClick={() => showToast('Navigating to Clinical')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="stethoscope" className="text-[22px]" />
            <span className="text-[10px]">Clinical</span>
          </button>
          <button
            onClick={() => showToast('Navigating to More Options')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="more_horiz" className="text-[22px]" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>

      <QuickLinks
        title="Front Desk"
        links={[
          { to: '/clinic-operations/reception-desk', label: 'Reception Check-In', icon: 'how_to_reg' },
          { to: '/clinic-operations/waiting-queue', label: 'Waiting Room Queue', icon: 'hourglass_empty' },
          { to: '/clinic-operations/walk-in-queue', label: 'Walk-In Management', icon: 'directions_walk' },
        ]}
      />
    </div>
  );
};
