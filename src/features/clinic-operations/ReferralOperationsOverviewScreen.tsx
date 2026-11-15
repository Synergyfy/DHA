import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ReferralFilter = 'all' | 'incoming' | 'outgoing' | 'awaiting';

interface ReferralRecord {
  id: string;
  type: 'incoming' | 'outgoing';
  isAwaitingAction?: boolean;
  typeLabel: string;
  statusBadge: string;
  statusBadgeClass: string;
  conditionTitle: string;
  patientName: string;
  demographics: string;
  lifeCode: string;
  senderLabel: string;
  senderName: string;
  receiverLabel: string;
  receiverName: string;
  scopeLabel: string;
  scopeDetail: string;
  dateStr: string;
  isUrgentTrauma?: boolean;
  actions: {
    label: string;
    icon?: string;
    primary?: boolean;
    key: string;
  }[];
}

const REFERRALS_DATA: ReferralRecord[] = [
  {
    id: 'ref-01',
    type: 'incoming',
    typeLabel: 'INCOMING REFERRAL',
    statusBadge: 'Accepted • Booked 24 Oct',
    statusBadgeClass: 'bg-[#86f2e4]/70 text-[#006f66]',
    conditionTitle: 'Complex Endodontic Molar Retreatment',
    patientName: 'Yusuf Abubakar',
    demographics: '38y M',
    lifeCode: 'LifeCode: NG-ABJ-112-909',
    senderLabel: 'From Clinic',
    senderName: 'Garki Satellite Branch (#002) • Dr. Tunde Fashola',
    receiverLabel: 'Receiving Specialist',
    receiverName: 'Dr. Sarah Bello (Endo/Ortho Lead • Wuse 2 HQ)',
    scopeLabel: 'Scope:',
    scopeDetail: 'Tooth #14 Canal Calcification & Recurrent Lesion',
    dateStr: '20 Oct 2026',
    actions: [
      { label: 'View Referral Dossier (Sec 20)', icon: 'arrow_forward', primary: true, key: 'dossier' },
    ],
  },
  {
    id: 'ref-02',
    type: 'outgoing',
    isAwaitingAction: true,
    isUrgentTrauma: true,
    typeLabel: 'OUTGOING ESCALATION',
    statusBadge: 'Urgent Hospital Triage',
    statusBadgeClass: 'bg-[#ffdad6] text-[#93000a] font-bold',
    conditionTitle: 'Maxillofacial Skeletal Trauma Consult',
    patientName: 'Fatima Garba',
    demographics: '29y F',
    lifeCode: 'LifeCode: NG-ABJ-771-402',
    senderLabel: 'Referring Clinician',
    senderName: 'Dr. Daniel Okoro (Wuse 2 HQ)',
    receiverLabel: 'Destination Target Facility',
    receiverName: 'National Hospital Abuja • Maxillofacial Unit',
    scopeLabel: 'Suspected Trauma Scope:',
    scopeDetail: 'Angle Fracture & Periapical Abscess (Mandibular Left)',
    dateStr: 'Today, 09:30 AM',
    actions: [
      { label: 'Track Transfer Status', icon: 'radar', primary: false, key: 'track' },
    ],
  },
  {
    id: 'ref-03',
    type: 'incoming',
    isAwaitingAction: true,
    typeLabel: 'INCOMING REFERRAL',
    statusBadge: 'Response Required',
    statusBadgeClass: 'bg-[#ffdad6] text-[#93000a] font-semibold animate-pulse',
    conditionTitle: 'Pediatric Space Maintainer Evaluation',
    patientName: 'Chinedu Eze',
    demographics: '11y M',
    lifeCode: 'LifeCode: NG-LOS-229-881',
    senderLabel: 'Referring Provider',
    senderName: 'Maitama Specialist Outpost (#003)',
    receiverLabel: 'Designated Specialist',
    receiverName: 'Dr. Daniel Okoro (Pedodontics Desk)',
    scopeLabel: 'Clinical Prompt:',
    scopeDetail: 'Premature loss of #75, space closure risk assessment.',
    dateStr: 'Today, 10:15 AM',
    actions: [
      { label: 'Request Records', icon: 'folder_shared', primary: false, key: 'records' },
      { label: 'Accept Referral', icon: 'check_circle', primary: true, key: 'accept' },
    ],
  },
  {
    id: 'ref-04',
    type: 'incoming',
    typeLabel: 'INCOMING REFERRAL',
    statusBadge: 'Triage Approved',
    statusBadgeClass: 'bg-[#86f2e4]/70 text-[#006f66]',
    conditionTitle: 'Full Arch Fixed Implant Restoration',
    patientName: 'Maryam Sani',
    demographics: '50y F',
    lifeCode: 'LifeCode: NG-ABJ-443-102',
    senderLabel: 'From Clinic',
    senderName: 'Central Business District Hub • Dr. Kalu',
    receiverLabel: 'Receiving Specialist',
    receiverName: 'Dr. Daniel Okoro (Surgical Director)',
    scopeLabel: 'Scope:',
    scopeDetail: 'Maxillary edentulism, severe alveolar ridge resorption.',
    dateStr: '19 Oct 2026',
    actions: [
      { label: 'View Dossier', icon: 'arrow_forward', primary: true, key: 'dossier' },
    ],
  },
  {
    id: 'ref-05',
    type: 'incoming',
    typeLabel: 'INCOMING REFERRAL',
    statusBadge: 'Scheduled Surgery',
    statusBadgeClass: 'bg-[#cce5ff] text-[#001d31]',
    conditionTitle: 'Impacted Third Molar Translocation',
    patientName: 'Emeka Nwosu',
    demographics: '22y M',
    lifeCode: 'LifeCode: NG-EN-881-209',
    senderLabel: 'From Clinic',
    senderName: 'Garki Satellite Branch (#002)',
    receiverLabel: 'Receiving Specialist',
    receiverName: 'Dr. Michael James (Oral Surgery Suite)',
    scopeLabel: 'Scope:',
    scopeDetail: 'Mesioangular impaction #38 near mandibular nerve canal.',
    dateStr: '21 Oct 2026',
    actions: [
      { label: 'View Pre-op CBCT', icon: 'radiology', primary: true, key: 'cbct' },
    ],
  },
  {
    id: 'ref-06',
    type: 'outgoing',
    typeLabel: 'OUTGOING ESCALATION',
    statusBadge: 'Consult In-Review',
    statusBadgeClass: 'bg-[#eaedff] text-[#3f4850]',
    conditionTitle: 'Salivary Gland Sialolithiasis Assessment',
    patientName: 'Halima Bello',
    demographics: '33y F',
    lifeCode: 'LifeCode: NG-ABJ-902-334',
    senderLabel: 'Referring Clinician',
    senderName: 'Dr. Sarah Bello (Wuse 2 HQ)',
    receiverLabel: 'Target Specialist',
    receiverName: 'FCT University Teaching Hospital ENT Surgery',
    scopeLabel: 'Scope:',
    scopeDetail: 'Submandibular swelling, recurrent salivary colic.',
    dateStr: '18 Oct 2026',
    actions: [
      { label: 'Hospital Comms', icon: 'chat', primary: false, key: 'comms' },
    ],
  },
  {
    id: 'ref-07',
    type: 'outgoing',
    typeLabel: 'OUTGOING ESCALATION',
    statusBadge: 'Biopsy Fast-Track',
    statusBadgeClass: 'bg-[#cde5ff] text-[#001d32]',
    conditionTitle: 'Leukoplakia Staging & Histopathology',
    patientName: 'Aisha Umar',
    demographics: '45y F',
    lifeCode: 'LifeCode: NG-KD-551-772',
    senderLabel: 'Referring Clinician',
    senderName: 'Dr. Daniel Okoro (Wuse 2 HQ)',
    receiverLabel: 'Destination Target',
    receiverName: 'National Cancer Research Center Abuja',
    scopeLabel: 'Scope:',
    scopeDetail: 'Hyperkeratotic patch left lateral tongue border.',
    dateStr: '17 Oct 2026',
    actions: [
      { label: 'Histology Track', icon: 'biotech', primary: true, key: 'histology' },
    ],
  },
  {
    id: 'ref-08',
    type: 'incoming',
    typeLabel: 'INCOMING REFERRAL',
    statusBadge: 'Records Received',
    statusBadgeClass: 'bg-[#86f2e4]/70 text-[#006f66]',
    conditionTitle: 'Skeletal Class III Anterior Crossbite',
    patientName: 'Victor Chukwuma',
    demographics: '16y M',
    lifeCode: 'LifeCode: NG-ABJ-310-449',
    senderLabel: 'From Clinic',
    senderName: 'Maitama Specialist Outpost (#003)',
    receiverLabel: 'Receiving Specialist',
    receiverName: 'Dr. Sarah Bello (Consultant Orthodontist)',
    scopeLabel: 'Scope:',
    scopeDetail: 'Orthognathic pre-surgical decompensation assessment.',
    dateStr: '22 Oct 2026',
    actions: [
      { label: 'Ceph Tracing', icon: 'analytics', primary: true, key: 'ceph' },
    ],
  },
];

export const ReferralOperationsOverviewScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState<ReferralFilter>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showInitiateModal, setShowInitiateModal] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredReferrals = REFERRALS_DATA.filter((r) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'incoming') return r.type === 'incoming';
    if (activeFilter === 'outgoing') return r.type === 'outgoing';
    if (activeFilter === 'awaiting') return r.isAwaitingAction;
    return true;
  });

  const counts = {
    all: REFERRALS_DATA.length,
    incoming: REFERRALS_DATA.filter((r) => r.type === 'incoming').length,
    outgoing: REFERRALS_DATA.filter((r) => r.type === 'outgoing').length,
    awaiting: REFERRALS_DATA.filter((r) => r.isAwaitingAction).length,
  };

  const handleAction = (refItem: ReferralRecord, actionKey: string, actionLabel: string) => {
    if (actionKey === 'dossier') {
      navigate('/clinical/examination/summary-preview');
    } else if (actionKey === 'cbct' || actionKey === 'histology') {
      navigate('/investigations');
    } else if (actionKey === 'accept') {
      showToast(`Referral for ${refItem.patientName} accepted into Dr. Okoro's queue.`);
    } else {
      showToast(`${actionLabel} initiated for ${refItem.patientName}.`);
    }
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-fade-in border border-white/20">
          <Icon name="check_circle" className="text-emerald-300 text-[20px]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.03)] border-b border-[#dae2fd]/60">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => navigate('/clinic-operations')}
              className="flex items-center gap-2 py-1 px-2 -ml-2 rounded-lg text-left hover:bg-[#eaedff] transition-colors"
            >
              <div className="flex flex-col min-w-0">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider truncate">
                  Clinic Hub
                </span>
                <span className="font-semibold text-sm md:text-base text-[#131b2e] truncate font-['Plus_Jakarta_Sans',sans-serif]">
                  Referral Operations Overview
                </span>
              </div>
              <Icon name="expand_more" className="text-[#707881] text-[20px] shrink-0" />
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              aria-label="Notifications"
              onClick={() => showToast('2 pending referrals require clinician response')}
              className="w-10 h-10 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors relative"
            >
              <Icon name="notifications" className="text-[22px]" />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white font-semibold text-xs shadow-sm">
              <Icon name="person" className="text-white text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 max-w-7xl mx-auto w-full px-4 md:px-8 flex-1">
        <div className="flex flex-col w-full space-y-6">
          {/* Top Context & Header */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#006194]">
              <Icon name="sync_alt" className="text-[18px]" />
              <span className="text-xs font-semibold uppercase tracking-wider">
                Clinical Referrals & Specialist Handshake
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight">
              Referral Operations Overview
            </h1>
            <p className="text-sm text-[#3f4850]">
              Inter-branch specialist rotations, tertiary hospital transfers & external second opinion channels.
            </p>
          </div>

          {/* Referral Telemetry Bar */}
          <div className="bg-[#f2f3ff] rounded-2xl p-5 shadow-sm border border-[#dae2fd]/70 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="analytics" className="text-[#006194] text-[20px]" />
                <span className="font-semibold text-sm md:text-base text-[#131b2e]">
                  Active Referral Telemetry
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                <span>Live Sync</span>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {/* Total Active */}
              <div className="bg-white p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-[#dae2fd]/60">
                <div className="w-11 h-11 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
                  <Icon name="hub" className="text-[22px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] leading-none">
                    {counts.all}
                  </span>
                  <span className="text-xs text-[#707881] truncate mt-1">Total Referrals</span>
                </div>
              </div>

              {/* Action Needed */}
              <div className="bg-[#ffdad6]/60 p-4 rounded-xl flex items-center gap-3.5 shadow-sm border border-[#ffdad6]">
                <div className="w-11 h-11 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">
                  <Icon name="notification_important" className="text-[22px]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-2xl font-bold text-[#93000a] font-['Plus_Jakarta_Sans',sans-serif] leading-none">
                    {counts.awaiting}
                  </span>
                  <span className="text-xs font-bold text-[#ba1a1a] truncate mt-1">Awaiting Action</span>
                </div>
              </div>

              {/* Incoming Breakdown */}
              <div className="bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#dae2fd]/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Incoming</span>
                  <Icon name="south_west" className="text-[#006a61] text-[18px]" />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                    {counts.incoming}
                  </span>
                  <span className="text-xs text-[#707881]">satellites</span>
                </div>
              </div>

              {/* Outgoing Breakdown */}
              <div className="bg-white p-4 rounded-xl flex flex-col justify-between shadow-sm border border-[#dae2fd]/60">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#707881] uppercase tracking-wider">Outgoing</span>
                  <Icon name="north_east" className="text-[#006194] text-[18px]" />
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                    {counts.outgoing}
                  </span>
                  <span className="text-xs text-[#707881]">maxillofacial</span>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 bg-[#eaedff] rounded-2xl overflow-x-auto scrollbar-none">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex-1 py-2 px-3.5 rounded-xl text-xs md:text-sm font-semibold text-center whitespace-nowrap transition-all ${
                activeFilter === 'all'
                  ? 'bg-white shadow-sm text-[#006194]'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              All ({counts.all})
            </button>
            <button
              onClick={() => setActiveFilter('incoming')}
              className={`flex-1 py-2 px-3.5 rounded-xl text-xs md:text-sm font-semibold text-center whitespace-nowrap transition-all ${
                activeFilter === 'incoming'
                  ? 'bg-white shadow-sm text-[#006194]'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Incoming ({counts.incoming})
            </button>
            <button
              onClick={() => setActiveFilter('outgoing')}
              className={`flex-1 py-2 px-3.5 rounded-xl text-xs md:text-sm font-semibold text-center whitespace-nowrap transition-all ${
                activeFilter === 'outgoing'
                  ? 'bg-white shadow-sm text-[#006194]'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              Outgoing ({counts.outgoing})
            </button>
            <button
              onClick={() => setActiveFilter('awaiting')}
              className={`flex-1 py-2 px-3.5 rounded-xl text-xs md:text-sm font-semibold text-center whitespace-nowrap transition-all flex items-center justify-center gap-1.5 ${
                activeFilter === 'awaiting'
                  ? 'bg-white shadow-sm text-[#ba1a1a]'
                  : 'text-[#3f4850] hover:text-[#131b2e]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
              <span>Pending ({counts.awaiting})</span>
            </button>
          </div>

          {/* Cards Feed (Responsive Grid: 1 col on mobile, 2 cols on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredReferrals.map((item) => (
              <article
                key={item.id}
                className="bg-white rounded-2xl shadow-sm border border-[#dae2fd]/70 overflow-hidden flex flex-col justify-between hover:shadow-md transition-all"
              >
                <div className="p-5 flex flex-col gap-3">
                  {/* Card Header Badge & Type */}
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="px-2.5 py-1 rounded-full bg-[#89f5e7] text-[#00201d] text-xs font-semibold flex items-center gap-1">
                      <Icon
                        name={item.type === 'incoming' ? 'south_west' : 'north_east'}
                        className="text-[14px]"
                      />
                      <span>{item.typeLabel}</span>
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${item.statusBadgeClass}`}>
                      {item.statusBadge}
                    </span>
                  </div>

                  <h2 className="font-semibold text-base md:text-lg text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] mt-1">
                    {item.conditionTitle}
                  </h2>

                  {/* Patient Demographics Pill */}
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff]">
                    <div className="w-9 h-9 rounded-full bg-[#cce5ff] text-[#001d31] flex items-center justify-center shrink-0">
                      <Icon name="person" className="text-[20px]" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#131b2e] truncate">{item.patientName}</span>
                        <span className="text-xs text-[#707881]">{item.demographics}</span>
                      </div>
                      <span className="font-mono text-xs text-[#006194]">{item.lifeCode}</span>
                    </div>
                  </div>

                  {/* Clinical Routing */}
                  <div className="grid grid-cols-1 gap-2 pt-1 text-xs">
                    <div className="flex items-start gap-2">
                      <Icon name="location_away" className="text-[#707881] text-[18px] shrink-0 mt-0.5" />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#707881] font-semibold">{item.senderLabel}</span>
                        <span className="text-[#131b2e] font-medium truncate">{item.senderName}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon
                        name={item.isUrgentTrauma ? 'local_hospital' : 'stethoscope'}
                        className={`text-[18px] shrink-0 mt-0.5 ${
                          item.isUrgentTrauma ? 'text-[#ba1a1a]' : 'text-[#006194]'
                        }`}
                      />
                      <div className="flex flex-col min-w-0">
                        <span className="text-[#707881] font-semibold">{item.receiverLabel}</span>
                        <span
                          className={`font-semibold truncate ${
                            item.isUrgentTrauma ? 'text-[#ba1a1a]' : 'text-[#131b2e]'
                          }`}
                        >
                          {item.receiverName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scope Banner */}
                  <div
                    className={`p-3 rounded-xl flex items-start gap-2.5 mt-1 ${
                      item.isUrgentTrauma ? 'bg-[#ffdad6]/50' : 'bg-[#e2e7ff]/60'
                    }`}
                  >
                    <Icon
                      name={item.isUrgentTrauma ? 'warning' : 'dentistry'}
                      className={`text-[18px] shrink-0 mt-0.5 ${
                        item.isUrgentTrauma ? 'text-[#ba1a1a]' : 'text-[#006194]'
                      }`}
                    />
                    <div className="flex flex-col text-xs flex-1 min-w-0">
                      <span
                        className={`font-bold uppercase tracking-wider ${
                          item.isUrgentTrauma ? 'text-[#ba1a1a]' : 'text-[#006194]'
                        }`}
                      >
                        {item.scopeLabel}
                      </span>
                      <span className="text-[#131b2e] font-medium leading-snug mt-0.5">
                        {item.scopeDetail}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="bg-[#f2f3ff]/60 px-5 py-3 border-t border-[#dae2fd]/60 flex items-center justify-between gap-2 flex-wrap">
                  <span className="text-xs text-[#707881] flex items-center gap-1">
                    <Icon name="calendar_today" className="text-[15px]" /> {item.dateStr}
                  </span>

                  <div className="flex items-center gap-2">
                    {item.actions.map((act, i) => (
                      <button
                        key={i}
                        onClick={() => handleAction(item, act.key, act.label)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 active:scale-95 transition-all shadow-sm ${
                          act.primary
                            ? 'bg-[#006194] text-white hover:bg-[#004b73]'
                            : 'bg-white text-[#131b2e] hover:bg-[#eaedff] border border-[#dae2fd]'
                        }`}
                      >
                        <span>{act.label}</span>
                        {act.icon && <Icon name={act.icon} className="text-[16px]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Gateway Connectivity Section (Section 20 Link) */}
          <div className="rounded-2xl bg-[#eaedff] p-5 flex flex-col gap-3.5 border border-[#dae2fd] shadow-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-[#006194] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Icon name="swap_calls" className="text-[24px]" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-base text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif]">
                    Inter-Clinic Handshake Hub
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-[#89f5e7] text-[#00201d] text-[11px] font-bold">
                    Sec 20 Gateway
                  </span>
                </div>
                <p className="text-xs md:text-sm text-[#3f4850] mt-1 leading-relaxed">
                  Direct secure referral dispatch connected to DHA Integrated Specialist Network & Federal Tertiary Referral Pipeline with cryptographic audit trail.
                </p>
              </div>
            </div>

            {/* Live Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-white p-3 rounded-xl flex items-center gap-2.5 border border-[#dae2fd]/60">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                <span className="text-xs font-medium text-[#131b2e]">DHA Mesh Network: Connected</span>
              </div>
              <div className="bg-white p-3 rounded-xl flex items-center gap-2.5 border border-[#dae2fd]/60">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                <span className="text-xs font-medium text-[#131b2e]">HL7/FHIR Protocol: Latency 14ms</span>
              </div>
            </div>
          </div>

          {/* Primary Bottom Action */}
          <div className="pt-2">
            <button
              onClick={() => setShowInitiateModal(true)}
              className="w-full h-12 rounded-xl bg-[#006194] text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-[#004b73] active:scale-[0.99] transition-all"
            >
              <Icon name="add_circle" className="text-[20px]" />
              <span>+ Initiate New Patient Referral</span>
            </button>
          </div>
        </div>
      </main>

      {/* Initiate Referral Modal */}
      {showInitiateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-[#dae2fd]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                  <Icon name="sync_alt" className="text-[18px]" />
                </div>
                <h3 className="font-bold text-base text-[#131b2e]">Initiate Referral</h3>
              </div>
              <button
                onClick={() => setShowInitiateModal(false)}
                className="w-8 h-8 rounded-full hover:bg-[#f2f3ff] flex items-center justify-center text-[#707881]"
              >
                <Icon name="close" className="text-[20px]" />
              </button>
            </div>

            <div className="py-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Patient Name or ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amara Okafor (AE-990-281-DXB)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Target Destination / Facility
                </label>
                <select className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]">
                  <option>National Hospital Abuja (Maxillofacial Surgery)</option>
                  <option>Maitama Specialist Outpost (#003)</option>
                  <option>Garki Satellite Branch (#002)</option>
                  <option>FCT Teaching Hospital (Oral Pathology)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] uppercase mb-1.5">
                  Referral Specialty & Reason
                </label>
                <input
                  type="text"
                  placeholder="e.g. Impacted molar extraction, surgical review"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#bfc7d2] text-sm text-[#131b2e] focus:outline-none focus:border-[#006194]"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-end gap-2.5">
              <button
                onClick={() => setShowInitiateModal(false)}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#707881] hover:bg-[#f2f3ff]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowInitiateModal(false);
                  showToast('Referral dispatched to specialist intake terminal.');
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#006194] text-white hover:bg-[#004b73]"
              >
                Dispatch Referral
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
