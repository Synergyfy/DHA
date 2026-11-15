import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type QueueFilter = 'all' | 'waiting' | 'in-chair' | 'discharged';

interface QueueCardItem {
  id: string;
  queueNo: string;
  patientName: string;
  mrnOrLifeCode: string;
  status: 'waiting' | 'in-chair' | 'discharged';
  statusLabel: string;
  isUrgent?: boolean;
  timeInfo: string;
  reason: string;
  provider: string;
  operatory: string;
  operatoryStatus?: string;
  amountPaid?: string;
}

const QUEUE_ITEMS: QueueCardItem[] = [
  {
    id: 'q-05',
    queueNo: 'Q-05',
    patientName: 'Fatima Garba',
    mrnOrLifeCode: 'MRN DHA-2026-08812',
    status: 'waiting',
    statusLabel: 'Emergency Triage',
    isUrgent: true,
    timeInfo: '14m in Lounge',
    reason: 'Acute Toothache #14 (Severe Percussion)',
    provider: 'Dr. Daniel Okoro',
    operatory: 'Operatory 01',
    operatoryStatus: 'Chair Ready',
  },
  {
    id: 'q-03',
    queueNo: 'Q-03',
    patientName: 'Ibrahim Waziri',
    mrnOrLifeCode: 'LifeCode NG-ABJ-00451',
    status: 'in-chair',
    statusLabel: 'Operatory 02',
    timeInfo: '22m (In Chair) • 08:50 AM',
    reason: 'Broken Aligner Bracket',
    provider: 'Dr. Sarah Bello (Orthodontics)',
    operatory: 'Operatory 02',
    operatoryStatus: 'In Procedure',
  },
  {
    id: 'q-06',
    queueNo: 'Q-06',
    patientName: 'Emeka Nwosu',
    mrnOrLifeCode: 'LifeCode NG-LOS-229-881',
    status: 'waiting',
    statusLabel: 'Waiting',
    timeInfo: '6m elapsed',
    reason: 'Post-op Bleeding Check (Extracted #38)',
    provider: 'Dr. Michael James',
    operatory: 'Operatory 03 Prep',
  },
  {
    id: 'q-01',
    queueNo: 'Q-01',
    patientName: 'Chinedu Eze',
    mrnOrLifeCode: 'Walk-in Direct Pay',
    status: 'discharged',
    statusLabel: 'Discharged',
    timeInfo: '09:35 AM',
    reason: 'Routine Scaling & Polish',
    provider: 'Dr. Daniel Okoro',
    operatory: 'Operatory 01',
    amountPaid: '₦15,000 POS',
  },
];

export const WalkInManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<QueueFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [dispatchModalItem, setDispatchModalItem] = useState<QueueCardItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const filteredItems = QUEUE_ITEMS.filter((item) => {
    if (activeFilter === 'waiting' && item.status !== 'waiting') return false;
    if (activeFilter === 'in-chair' && item.status !== 'in-chair') return false;
    if (activeFilter === 'discharged' && item.status !== 'discharged') return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.queueNo.toLowerCase().includes(q) ||
        item.patientName.toLowerCase().includes(q) ||
        item.mrnOrLifeCode.toLowerCase().includes(q) ||
        item.reason.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleConfirmDispatch = () => {
    if (dispatchModalItem) {
      showToast(`${dispatchModalItem.queueNo} (${dispatchModalItem.patientName}) called to ${dispatchModalItem.operatory}!`);
      setDispatchModalItem(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] flex flex-col antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-[#131b2e] text-white px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium animate-fade-in border border-white/10">
          <Icon name="check_circle" className="text-[#86f2e4] text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
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
              <span className="text-xs text-[#006a61] font-semibold">Live Triage Dispatch</span>
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
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 pb-24">
        {/* Subheader Banner with Tactile Framing */}
        <section className="mb-4 flex items-start justify-between gap-3 flex-wrap">
          <div className="flex flex-col">
            <h1 className="text-xl sm:text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e] tracking-tight">
              Walk-in Triage &amp; Queue
            </h1>
            <span className="text-xs sm:text-sm text-[#3f4850]">
              Real-time patient intake and chairside dispatch
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/walk-in-registration')}
              className="h-10 px-4 rounded-xl bg-[#006194] hover:bg-[#007bb9] active:scale-[0.98] text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Icon name="person_add" className="text-[18px]" />
              <span>+ Register Walk-in</span>
            </button>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#86f2e4]/40 border border-[#86f2e4] rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-ping" />
              <span className="font-mono text-xs font-bold text-[#006f66] uppercase">Live Sync</span>
            </div>
          </div>
        </section>

        {/* Queue Summary Bento Metrics */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
          {/* Total Walk-ins */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#3f4850] font-semibold">Total Walk-ins</span>
              <div className="w-7 h-7 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#006194]">
                <Icon name="pin" className="text-[16px]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">6</span>
              <span className="text-xs text-[#707881]">Q-01 to Q-06</span>
            </div>
          </div>

          {/* In Chairside Triage */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#006a61] font-semibold">In Chair</span>
              <div className="w-7 h-7 rounded-lg bg-[#86f2e4]/40 flex items-center justify-center text-[#006a61]">
                <Icon name="airline_seat_recline_extra" className="text-[16px]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006a61]">3</span>
              <span className="text-xs text-[#3f4850]">Active Chairs</span>
            </div>
          </div>

          {/* Currently Waiting */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#006194] font-semibold">Waiting</span>
              <div className="w-7 h-7 rounded-lg bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                <Icon name="hourglass_top" className="text-[16px]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#006194]">2</span>
              <span className="text-xs text-[#3f4850]">In Lounge</span>
            </div>
          </div>

          {/* Avg Wait Time */}
          <div className="bg-white rounded-2xl border border-[#dae2fd]/60 p-4 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-[#3f4850] font-semibold">Avg Wait</span>
              <div className="w-7 h-7 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3f4850]">
                <Icon name="timer" className="text-[16px]" />
              </div>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-bold font-['Plus_Jakarta_Sans'] text-[#131b2e]">11</span>
              <span className="text-xs text-[#006a61] font-bold">mins (Optimal)</span>
            </div>
          </div>
        </section>

        {/* Filter & Search Section */}
        <section className="flex flex-col gap-3 mb-5">
          {/* Search Bar */}
          <div className="relative w-full">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[20px] pointer-events-none"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Queue #, Patient Name, or LifeCode..."
              className="w-full h-12 pl-11 pr-11 bg-white border border-[#bfc7d2]/60 text-[#131b2e] rounded-xl text-sm placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194] shadow-xs"
            />
            <button
              type="button"
              onClick={() => showToast('Barcode / QR Scanner opened')}
              aria-label="Scan barcode"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-[#006194] hover:bg-[#eaedff] rounded-lg transition-colors"
            >
              <Icon name="qr_code_scanner" className="text-[20px]" />
            </button>
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              onClick={() => setActiveFilter('all')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
                activeFilter === 'all'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>All</span>
              <span className="px-1.5 py-0.2 bg-white/20 rounded-full text-[10px]">6</span>
            </button>
            <button
              onClick={() => setActiveFilter('waiting')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
                activeFilter === 'waiting'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]" />
              <span>Waiting</span>
              <span className="px-1.5 py-0.2 bg-[#eaedff] rounded-full text-[10px] text-[#006194]">2</span>
            </button>
            <button
              onClick={() => setActiveFilter('in-chair')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
                activeFilter === 'in-chair'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]" />
              <span>In Chair</span>
              <span className="px-1.5 py-0.2 bg-[#eaedff] rounded-full text-[10px] text-[#006194]">3</span>
            </button>
            <button
              onClick={() => setActiveFilter('discharged')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-xs shrink-0 transition-all ${
                activeFilter === 'discharged'
                  ? 'bg-[#006194] text-white'
                  : 'bg-white border border-[#dae2fd]/70 text-[#3f4850] hover:bg-[#eaedff]'
              }`}
            >
              <span>Discharged</span>
              <span className="px-1.5 py-0.2 bg-[#eaedff] rounded-full text-[10px] text-[#006194]">1</span>
            </button>
          </div>
        </section>

        {/* Walk-in Queue Cards List */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item) => {
            const isUrgent = item.isUrgent;
            const isInChair = item.status === 'in-chair';
            const isDischarged = item.status === 'discharged';

            return (
              <article
                key={item.id}
                className={`bg-white rounded-2xl border border-[#dae2fd]/60 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-all ${
                  isDischarged ? 'opacity-85' : ''
                }`}
              >
                {/* Accent line */}
                <div
                  className={`h-1.5 w-full ${
                    isUrgent
                      ? 'bg-gradient-to-r from-[#ba1a1a] to-[#ffdad6]'
                      : isInChair
                      ? 'bg-[#006a61]'
                      : isDischarged
                      ? 'bg-[#bfc7d2]'
                      : 'bg-[#006194]'
                  }`}
                />

                <div className="p-4 sm:p-5 flex flex-col gap-3">
                  {/* Top Metadata Row */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`px-2.5 py-1 rounded-lg font-bold font-['Plus_Jakarta_Sans'] text-sm ${
                          isUrgent
                            ? 'bg-[#ffdad6] text-[#93000a]'
                            : isInChair
                            ? 'bg-[#86f2e4] text-[#006f66]'
                            : 'bg-[#e2e7ff] text-[#006194]'
                        }`}
                      >
                        {item.queueNo}
                      </span>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-base font-bold text-[#131b2e] truncate ${
                              isDischarged ? 'line-through opacity-70' : ''
                            }`}
                          >
                            {item.patientName}
                          </span>
                          {isUrgent && <Icon name="priority_high" className="text-[16px] text-[#ba1a1a]" />}
                        </div>
                        <span className="font-mono text-xs text-[#707881]">{item.mrnOrLifeCode}</span>
                      </div>
                    </div>

                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                        isUrgent
                          ? 'bg-[#ffdad6] text-[#93000a]'
                          : isInChair
                          ? 'bg-[#86f2e4] text-[#006f66]'
                          : isDischarged
                          ? 'bg-[#eaedff] text-[#006a61]'
                          : 'bg-[#e2e7ff] text-[#006194]'
                      }`}
                    >
                      {isUrgent && <span className="w-2 h-2 rounded-full bg-[#ba1a1a] animate-pulse" />}
                      {isInChair && <span className="w-2 h-2 rounded-full bg-[#006a61]" />}
                      {isDischarged && <Icon name="check_circle" className="text-[14px]" />}
                      <span>{item.timeInfo}</span>
                    </div>
                  </div>

                  {/* Clinical Reason */}
                  <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd]/40 flex items-start gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                        isUrgent ? 'bg-[#ffdad6] text-[#ba1a1a]' : 'bg-[#cce5ff] text-[#006194]'
                      }`}
                    >
                      <Icon name={isUrgent ? 'medical_services' : 'healing'} className="text-[16px]" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-[11px] font-mono uppercase text-[#707881] font-semibold">
                        {item.statusLabel}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-[#131b2e] truncate">
                        {item.reason}
                      </span>
                    </div>
                  </div>

                  {/* Clinician & Room */}
                  <div className="flex items-center justify-between text-xs text-[#3f4850] pt-1">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon name="clinical_notes" className="text-[16px] text-[#006194]" />
                      <span className="truncate">
                        {item.provider} • <strong className="text-[#131b2e]">{item.operatory}</strong>
                      </span>
                    </div>
                    {item.operatoryStatus && (
                      <span className="text-xs font-bold text-[#006a61] bg-[#89f5e7]/40 px-2 py-0.5 rounded">
                        {item.operatoryStatus}
                      </span>
                    )}
                    {item.amountPaid && (
                      <span className="text-xs font-bold text-[#006a61] bg-[#89f5e7]/40 px-2 py-0.5 rounded">
                        {item.amountPaid}
                      </span>
                    )}
                  </div>

                  {/* Action CTAs */}
                  <div className="pt-2 border-t border-[#f2f3ff] flex items-center gap-2">
                    {item.status === 'waiting' && (
                      <>
                        <button
                          type="button"
                          onClick={() => showToast(`Priority updated for ${item.queueNo}`)}
                          className="flex-1 h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Icon name="flag" className="text-[16px] text-[#006194]" />
                          <span>Priority</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setDispatchModalItem(item)}
                          className="flex-1 h-10 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-all"
                        >
                          <Icon name="airline_seat_recline_normal" className="text-[16px]" />
                          <span>Call to Chair</span>
                        </button>
                      </>
                    )}

                    {item.status === 'in-chair' && (
                      <button
                        type="button"
                        onClick={() => navigate('/clinic-operations/appointment-details')}
                        className="w-full h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#006194] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Icon name="visibility" className="text-[16px]" />
                        <span>View Chairside Charting</span>
                      </button>
                    )}

                    {item.status === 'discharged' && (
                      <button
                        type="button"
                        onClick={() => showToast(`Receipt reprinted for ${item.queueNo}`)}
                        className="w-full h-10 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        <Icon name="receipt_long" className="text-[16px] text-[#006a61]" />
                        <span>View Receipt</span>
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        {/* Patient Call Modal */}
        {dispatchModalItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-md bg-white rounded-2xl p-5 sm:p-6 flex flex-col gap-4 shadow-2xl border border-[#dae2fd]/60 animate-scale-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#86f2e4] text-[#006f66] flex items-center justify-center">
                    <Icon name="volume_up" className="text-[22px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Calling Patient to Chair</h3>
                    <p className="text-xs text-[#707881]">
                      {dispatchModalItem.queueNo} • {dispatchModalItem.patientName}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setDispatchModalItem(null)}
                  className="w-8 h-8 rounded-full bg-[#f2f3ff] hover:bg-[#eaedff] flex items-center justify-center text-[#707881] transition-colors"
                >
                  <Icon name="close" className="text-[18px]" />
                </button>
              </div>

              <div className="p-3.5 bg-[#f2f3ff] rounded-xl flex flex-col gap-2 border border-[#dae2fd]/40">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#3f4850]">Target Operatory:</span>
                  <span className="font-bold text-[#131b2e]">{dispatchModalItem.operatory}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#3f4850]">Attending Doctor:</span>
                  <span className="font-bold text-[#006194]">{dispatchModalItem.provider}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-[#3f4850]">Audio Chime:</span>
                  <span className="font-bold text-[#006a61]">Lounge Pager &amp; Screen TV</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setDispatchModalItem(null)}
                  className="flex-1 h-11 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-[#3f4850] font-bold text-xs sm:text-sm transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDispatch}
                  className="flex-1 h-11 rounded-xl bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-1.5"
                >
                  <Icon name="check" className="text-[18px]" />
                  <span>Dispatch Chime</span>
                </button>
              </div>
            </div>
          </div>
        )}
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
            onClick={() => navigate('/clinic-operations/walk-in-queue')}
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
    </div>
  );
};
