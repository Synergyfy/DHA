import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type StatusFilter = 'all' | 'in-progress' | 'checked-in' | 'upcoming' | 'completed' | 'cancelled';

interface AppointmentRecord {
  id: string;
  time: string;
  period: string;
  patientName: string;
  mrn?: string;
  queueNo?: string;
  lifeCode: string;
  status: 'in-progress' | 'checked-in' | 'upcoming' | 'completed' | 'cancelled';
  statusLabel: string;
  procedure: string;
  duration: string;
  provider: string;
  providerDegree?: string;
  suite: string;
  source: string;
  sourceIcon: string;
  paidAmount?: string;
  isUrgent?: boolean;
}

const APPOINTMENTS: AppointmentRecord[] = [
  {
    id: 'apt-001',
    time: '09',
    period: '00 AM',
    patientName: 'Amara Okafor',
    mrn: 'MRN-00451',
    lifeCode: 'LifeCode: AE-990-281-DXB',
    status: 'in-progress',
    statusLabel: 'In Progress',
    procedure: 'Restorative Resin',
    duration: '60m duration',
    provider: 'Dr. Daniel Okoro',
    providerDegree: '(DDS)',
    suite: 'Suite 01',
    source: 'Patient App Booking',
    sourceIcon: 'phone_iphone',
  },
  {
    id: 'apt-002',
    time: '10',
    period: '00 AM',
    patientName: 'Ibrahim Waziri',
    lifeCode: 'LifeCode: NG-ABJ-441-202',
    status: 'checked-in',
    statusLabel: 'Checked In • 14m',
    procedure: 'Aligner Review',
    duration: '45m duration',
    provider: 'Dr. Sarah Bello',
    providerDegree: '(Ortho)',
    suite: 'Suite 02',
    source: 'Web Portal',
    sourceIcon: 'language',
  },
  {
    id: 'apt-003',
    time: '10',
    period: '45 AM',
    patientName: 'Fatima Garba',
    queueNo: 'Q-05',
    lifeCode: 'LifeCode: NG-ABJ-904-118',
    status: 'checked-in',
    statusLabel: 'Arrived / Waiting',
    procedure: 'Acute Toothache Triage',
    duration: '30m duration',
    provider: 'Dr. Daniel Okoro',
    suite: 'Suite 01',
    source: 'Reception Walk-in',
    sourceIcon: 'countertops',
    isUrgent: true,
  },
  {
    id: 'apt-004',
    time: '11',
    period: '30 AM',
    patientName: 'Yusuf Abubakar',
    lifeCode: 'LifeCode: NG-ABJ-112-984',
    status: 'upcoming',
    statusLabel: 'Confirmed',
    procedure: 'Crown Preparation',
    duration: '60m duration',
    provider: 'Dr. Michael James',
    suite: 'Suite 03',
    source: 'Clinic Rota',
    sourceIcon: 'event_note',
  },
  {
    id: 'apt-005',
    time: '08',
    period: '30 AM',
    patientName: 'Ngozi Eze',
    paidAmount: '₦35,000 Paid',
    lifeCode: 'LifeCode: NG-LOS-802-331',
    status: 'completed',
    statusLabel: 'Completed',
    procedure: 'Routine Prophylaxis',
    duration: '45m duration',
    provider: 'Dr. Daniel Okoro',
    suite: 'Suite 04',
    source: 'POS Terminal (Settled)',
    sourceIcon: 'point_of_sale',
  },
];

export const AppointmentListScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch] = useState('Wuse 2 Main Branch');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredAppointments = APPOINTMENTS.filter((apt) => {
    if (activeFilter === 'in-progress' && apt.status !== 'in-progress') return false;
    if (activeFilter === 'checked-in' && apt.status !== 'checked-in') return false;
    if (activeFilter === 'upcoming' && apt.status !== 'upcoming') return false;
    if (activeFilter === 'completed' && apt.status !== 'completed') return false;
    if (activeFilter === 'cancelled' && apt.status !== 'cancelled') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        apt.patientName.toLowerCase().includes(q) ||
        apt.lifeCode.toLowerCase().includes(q) ||
        apt.provider.toLowerCase().includes(q) ||
        apt.procedure.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-xl border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#006194] text-white shadow-sm shrink-0">
              <Icon name="dentistry" className="text-[20px]" />
            </div>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-[#131b2e] truncate">BrightSmile</span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#006194] text-[10px] font-bold uppercase tracking-wider">
                  DHA
                </span>
              </div>
              <button
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-0.5 text-[#3f4850] hover:text-[#131b2e] transition-colors text-xs text-left"
              >
                <span className="truncate max-w-[130px]">{selectedBranch}</span>
                <Icon name="keyboard_arrow_down" className="text-[16px]" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
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

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24">
        {/* Context Bar & Primary Action */}
        <div className="mb-4 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#86f2e4] text-[#006f66]">
                <Icon name="location_on" className="text-[15px]" />
              </span>
              <button
                onClick={() => navigate('/clinic-operations/branch-switcher')}
                className="flex items-center gap-1 text-[#131b2e] hover:text-[#006194] transition-colors text-left"
              >
                <span className="text-sm font-semibold truncate">{selectedBranch}</span>
                <Icon name="expand_more" className="text-[18px] text-[#3f4850]" />
              </button>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#e2e7ff] text-[#006194] text-xs font-semibold flex items-center gap-1.5 shrink-0">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse" />
              Live Clinic
            </span>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
                Appointments
              </h1>
              <p className="text-xs sm:text-sm text-[#3f4850]">Today&apos;s active clinical chair schedule</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/clinic-operations/calendar')}
                className="h-10 px-3.5 rounded-xl bg-white border border-[#bfc7d2]/60 hover:bg-[#eaedff] text-[#006194] text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Icon name="calendar_month" className="text-[18px]" />
                <span className="hidden sm:inline">Calendar View</span>
              </button>
              <button
                onClick={() => showToast('Opening New Appointment modal')}
                className="h-10 px-4 rounded-xl bg-[#006194] hover:bg-[#007bb9] active:scale-[0.98] text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Icon name="add" className="text-[18px]" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search & Quick Dropdowns */}
        <div className="mb-4 flex flex-col gap-2.5">
          <div className="relative w-full">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3f4850] text-[20px]" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patient name, LifeCode, or clinician..."
              className="w-full h-11 pl-10 pr-10 rounded-xl bg-white border border-[#bfc7d2]/60 text-[#131b2e] placeholder:text-[#3f4850]/70 text-sm focus:outline-none focus:ring-2 focus:ring-[#006194] shadow-sm transition-all"
            />
            <button
              type="button"
              onClick={() => showToast('Voice search activated')}
              aria-label="Voice search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#3f4850] hover:text-[#131b2e]"
            >
              <Icon name="mic" className="text-[18px]" />
            </button>
          </div>

          {/* Quick Dropdowns Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => showToast('Filter: Today, 22 Oct')}
              className="h-8 px-3 rounded-lg bg-white border border-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="calendar_today" className="text-[15px] text-[#006194]" />
              <span>Today, 22 Oct</span>
              <Icon name="arrow_drop_down" className="text-[16px] text-[#3f4850]" />
            </button>
            <button
              onClick={() => showToast('Filter: All Statuses')}
              className="h-8 px-3 rounded-lg bg-white border border-[#dae2fd] text-[#131b2e] text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-sm hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="tune" className="text-[15px] text-[#3f4850]" />
              <span>All Statuses</span>
              <Icon name="arrow_drop_down" className="text-[16px] text-[#3f4850]" />
            </button>
            <button
              onClick={() => showToast('Filter: All Providers')}
              className="h-8 px-3 rounded-lg bg-white border border-[#dae2fd] text-[#131b2e] text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-sm hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="medical_services" className="text-[15px] text-[#3f4850]" />
              <span>All Providers</span>
              <Icon name="arrow_drop_down" className="text-[16px] text-[#3f4850]" />
            </button>
            <button
              onClick={() => navigate('/clinic-operations/branch-switcher')}
              className="h-8 px-3 rounded-lg bg-white border border-[#dae2fd] text-[#131b2e] text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-sm hover:bg-[#eaedff] transition-colors"
            >
              <Icon name="domain" className="text-[15px] text-[#3f4850]" />
              <span>Wuse 2</span>
              <Icon name="arrow_drop_down" className="text-[16px] text-[#3f4850]" />
            </button>
          </div>

          {/* Secondary Status Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`h-7 px-3.5 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>All</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">28</span>
            </button>
            <button
              onClick={() => setActiveFilter('in-progress')}
              className={`h-7 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'in-progress'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#006a61]" />
              <span>In Progress</span>
              <span className="px-1 rounded bg-[#eaedff] text-[#006194] text-[10px]">3</span>
            </button>
            <button
              onClick={() => setActiveFilter('checked-in')}
              className={`h-7 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'checked-in'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#6bd8cb]" />
              <span>Checked In</span>
              <span className="px-1 rounded bg-[#eaedff] text-[#006194] text-[10px]">4</span>
            </button>
            <button
              onClick={() => setActiveFilter('upcoming')}
              className={`h-7 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'upcoming'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Upcoming</span>
              <span className="px-1 rounded bg-[#eaedff] text-[#006194] text-[10px]">8</span>
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`h-7 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'completed'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Completed</span>
              <span className="px-1 rounded bg-[#eaedff] text-[#006194] text-[10px]">12</span>
            </button>
            <button
              onClick={() => setActiveFilter('cancelled')}
              className={`h-7 px-3 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 shadow-sm transition-all ${
                activeFilter === 'cancelled'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Cancelled</span>
              <span className="px-1 rounded bg-[#eaedff] text-[#006194] text-[10px]">1</span>
            </button>
          </div>
        </div>

        {/* Operational Flow Glance Strip */}
        <div className="mb-5">
          <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/70 flex items-center justify-between text-[#131b2e] shadow-sm flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#001d31] flex items-center justify-center">
                <Icon name="airline_seat_recline_extra" className="text-[18px]" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight">4 Operatories Active</span>
                <span className="text-xs text-[#3f4850]">Avg. chair turnaround: 9m</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs bg-white text-[#006194] px-2.5 py-1 rounded-md font-bold shadow-xs">
                92% On-Time
              </span>
            </div>
          </div>
        </div>

        {/* Appointment Records Card Stream */}
        <div className="flex flex-col gap-3.5">
          {filteredAppointments.map((apt) => {
            const isAmara = apt.patientName === 'Amara Okafor';

            return (
              <div
                key={apt.id}
                className="rounded-2xl bg-white border border-[#dae2fd]/60 shadow-sm overflow-hidden hover:shadow-md transition-all duration-200"
              >
                {/* Top Clinical Ribbon & Time */}
                <div className="p-4 pb-3 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#e2e7ff] flex flex-col items-center justify-center text-[#006194] shrink-0">
                      <span className="text-lg font-bold font-['Plus_Jakarta_Sans'] leading-none">{apt.time}</span>
                      <span className="text-[10px] uppercase font-semibold tracking-wider text-[#3f4850] mt-0.5">
                        {apt.period}
                      </span>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h2 className="text-base font-bold text-[#131b2e] truncate">{apt.patientName}</h2>
                        {apt.mrn && (
                          <span className="px-2 py-0.5 rounded bg-[#e2e7ff] text-[#006194] font-mono text-[11px] font-semibold">
                            {apt.mrn}
                          </span>
                        )}
                        {apt.queueNo && (
                          <span className="px-2 py-0.5 rounded bg-[#ffdad6] text-[#93000a] font-mono text-[11px] font-bold">
                            {apt.queueNo}
                          </span>
                        )}
                        {apt.paidAmount && (
                          <span className="px-2 py-0.5 rounded bg-[#e2e7ff] text-[#006a61] font-mono text-[11px] font-bold">
                            {apt.paidAmount}
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-xs text-[#3f4850] truncate mt-0.5">{apt.lifeCode}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shrink-0 ${
                      apt.status === 'in-progress'
                        ? 'bg-[#86f2e4] text-[#006f66]'
                        : apt.status === 'checked-in'
                        ? 'bg-[#89f5e7] text-[#005049]'
                        : apt.status === 'completed'
                        ? 'bg-[#e2e7ff] text-[#3f4850]'
                        : 'bg-[#cce5ff] text-[#004b73]'
                    }`}
                  >
                    {apt.status === 'in-progress' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#006a61] animate-ping" />
                    )}
                    {apt.status === 'completed' && <Icon name="check_circle" className="text-[14px] text-[#006a61]" />}
                    {apt.status === 'upcoming' && <Icon name="verified" className="text-[14px] text-[#006194]" />}
                    {apt.status === 'checked-in' && <Icon name="hourglass_top" className="text-[14px]" />}
                    <span>{apt.statusLabel}</span>
                  </span>
                </div>

                {/* Treatment Grid Details */}
                <div className="px-4 pb-3">
                  <div
                    className={`p-3 rounded-xl flex flex-col gap-2 ${
                      apt.isUrgent ? 'bg-[#ffdad6]/30 border border-[#ffdad6]' : 'bg-[#f2f3ff]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <div className="flex items-center gap-1.5 text-[#131b2e] font-medium">
                        <Icon
                          name={apt.isUrgent ? 'priority_high' : 'healing'}
                          className={`text-[16px] ${apt.isUrgent ? 'text-[#ba1a1a]' : 'text-[#006194]'}`}
                        />
                        <span className={apt.isUrgent ? 'text-[#ba1a1a] font-bold' : ''}>{apt.procedure}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#3f4850] text-xs">
                        <Icon name="timer" className="text-[14px]" />
                        <span>{apt.duration}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-[#dae2fd]/40">
                      <div className="flex items-center gap-1.5 text-[#3f4850]">
                        <Icon name="stethoscope" className="text-[16px]" />
                        <span className="text-[#131b2e] font-semibold">{apt.provider}</span>
                        {apt.providerDegree && <span className="text-[11px] text-[#707881]">{apt.providerDegree}</span>}
                      </div>
                      <span className="px-2 py-0.5 rounded-md bg-[#dae2fd] text-[#006194] text-xs font-bold">
                        {apt.suite}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Metadata Strip & Action Bar */}
                <div className="px-4 py-2.5 bg-[#f2f3ff]/50 border-t border-[#dae2fd]/50 flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1 text-[#3f4850] text-xs">
                    <Icon name={apt.sourceIcon} className="text-[15px] text-[#006a61]" />
                    <span>{apt.source}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        if (isAmara) {
                          navigate('/clinic-operations/appointment-details');
                        } else {
                          navigate('/clinic-operations/appointment-details');
                        }
                      }}
                      className="h-8 px-3 rounded-lg bg-white border border-[#bfc7d2]/60 text-[#131b2e] hover:bg-[#eaedff] text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                    >
                      <span>View</span>
                      <Icon name="arrow_forward" className="text-[14px]" />
                    </button>

                    {apt.status === 'in-progress' && (
                      <button
                        onClick={() => showToast(`Status updated for ${apt.patientName}`)}
                        className="h-8 px-3 rounded-lg bg-[#006a61] text-white hover:bg-[#005049] text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <span>Update Status</span>
                        <Icon name="expand_more" className="text-[14px]" />
                      </button>
                    )}

                    {apt.status === 'checked-in' && !apt.isUrgent && (
                      <button
                        onClick={() => showToast(`Calling ${apt.patientName} into Suite 02`)}
                        className="h-8 px-3 rounded-lg bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Icon name="campaign" className="text-[15px]" />
                        <span>Call In</span>
                      </button>
                    )}

                    {apt.isUrgent && (
                      <button
                        onClick={() => showToast(`Emergency prioritized for ${apt.patientName}`)}
                        className="h-8 px-3 rounded-lg bg-[#287ab3] hover:bg-[#006194] text-white text-xs font-semibold flex items-center gap-1 shadow-xs transition-colors"
                      >
                        <Icon name="flash_on" className="text-[15px]" />
                        <span>Prioritize</span>
                      </button>
                    )}

                    {apt.status === 'upcoming' && (
                      <button
                        onClick={() => showToast(`Reschedule dialog opened for ${apt.patientName}`)}
                        className="h-8 px-3 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Icon name="event_repeat" className="text-[14px]" />
                        <span>Reschedule</span>
                      </button>
                    )}

                    {apt.status === 'completed' && (
                      <button
                        onClick={() => showToast(`Receipt generated for ${apt.patientName}`)}
                        className="h-8 px-3 rounded-lg bg-[#eaedff] hover:bg-[#dae2fd] text-[#131b2e] text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Icon name="receipt_long" className="text-[14px]" />
                        <span>Receipt</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Schedule Workspace Summary */}
        <div className="mt-8 flex flex-col gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f2f3ff] border border-[#dae2fd]/70 flex flex-col gap-3 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#131b2e]">Queue Progress</span>
                <span className="text-xs text-[#3f4850]">
                  Showing {filteredAppointments.length} of 28 appointments today
                </span>
              </div>
              <span className="font-mono text-sm text-[#006194] font-bold">18% Done</span>
            </div>

            {/* Segmented Micro Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-[#dae2fd] overflow-hidden flex">
              <div className="h-full bg-[#006a61]" style={{ width: '43%' }} title="Completed (12)" />
              <div className="h-full bg-[#86f2e4]" style={{ width: '11%' }} title="In Progress (3)" />
              <div className="h-full bg-[#89f5e7]" style={{ width: '14%' }} title="Checked In (4)" />
              <div className="h-full bg-[#cce5ff]" style={{ width: '28%' }} title="Upcoming (8)" />
              <div className="h-full bg-[#ba1a1a]" style={{ width: '4%' }} title="Cancelled (1)" />
            </div>

            {/* Operational Workspace Action Bar */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => showToast('Exporting daily schedule to Excel/PDF...')}
                className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-white hover:bg-[#eaedff] border border-[#bfc7d2]/60 text-[#131b2e] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Icon name="download" className="text-[18px] text-[#006194]" />
                <span>Export Daily Schedule</span>
              </button>
              <button
                onClick={() => navigate('/clinic-operations/calendar')}
                className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-[#cce5ff] hover:bg-[#93ccff] text-[#004b73] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Icon name="calendar_view_week" className="text-[18px]" />
                <span>Switch to Calendar Grid</span>
              </button>
            </div>
          </div>

          {/* Clinician Encouragement Card */}
          <div className="p-4 rounded-2xl bg-white border border-[#dae2fd]/60 shadow-sm flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#89f5e7] flex items-center justify-center text-[#00201d] shrink-0">
              <Icon name="psychology" className="text-[22px]" />
            </div>
            <p className="text-xs sm:text-sm text-[#3f4850] flex-1 leading-snug">
              <strong className="text-[#131b2e] font-semibold">Staff Briefing:</strong> Radiologist Dr. Bello&apos;s morning reviews are running 4m ahead of schedule. Great team rhythm!
            </p>
          </div>
        </div>
      </main>

      {/* Bottom Nav (Mobile/Tablet) */}
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
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#006194] font-semibold transition-colors"
          >
            <Icon name="calendar_today" className="text-[22px]" />
            <span className="text-[10px]">Schedule</span>
          </button>
          <button
            onClick={() => showToast('Navigating to Patients')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="groups" className="text-[22px]" />
            <span className="text-[10px]">Patients</span>
          </button>
          <button
            onClick={() => showToast('Navigating to Clinical')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="dentistry" className="text-[22px]" />
            <span className="text-[10px]">Clinical</span>
          </button>
          <button
            onClick={() => showToast('Navigating to More Options')}
            className="flex flex-col items-center justify-center gap-0.5 w-14 h-12 rounded-xl text-[#3f4850] hover:text-[#131b2e] transition-colors"
          >
            <Icon name="grid_view" className="text-[22px]" />
            <span className="text-[10px]">More</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
