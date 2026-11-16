import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

interface AdjustmentItem {
  id: string;
  adjustmentCode: string;
  type: string;
  patientName: string;
  demographics: string;
  lifeCode: string;
  status: 'pending' | 'authorized' | 'declined';
  date: string;
  invoiceRef: string;
  initialPaid: number;
  authorizedCredit: number;
  auditNote: string;
  initiator: string;
  directorSigned: boolean;
  financeSigned: boolean;
}

export const RefundAdjustmentRecordsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);

  // Form state
  const [formPatient, setFormPatient] = useState('');
  const [formLifeCode, setFormLifeCode] = useState('');
  const [formAmount, setFormAmount] = useState('');
  const [formType, setFormType] = useState('Retroactive Credit');
  const [formReason, setFormReason] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [queueItem, setQueueItem] = useState<AdjustmentItem>({
    id: 'adj-1',
    adjustmentCode: 'ADJ-2026-014',
    type: 'Retroactive Credit',
    patientName: 'Kalu Nnamdi',
    demographics: '48y M',
    lifeCode: 'NG-ABJ-00389',
    status: 'pending',
    date: '18 Oct 2026',
    invoiceRef: '#INV-2026-420 (OPG Radiograph & Biopsy)',
    initialPaid: 42000,
    authorizedCredit: 12000,
    auditNote:
      'AXA Mansard retroactive secondary pre-auth approved 80% coverage. Patient eligible for ₦12,000 wallet credit or registered bank account transfer.',
    initiator: 'Grace Ibrahim (Receptionist)',
    directorSigned: true,
    financeSigned: false,
  });

  const [historyItems, setHistoryItems] = useState([
    {
      id: 'hist-1',
      code: 'ADJ-2026-012',
      type: 'Fee Waiver',
      patientName: 'Hadiza Umar',
      amount: -35000,
      date: '14 Oct 2026',
      note: 'Humanitarian Orthodontic Revision under Section 13 Protocol. Verified and approved by David Musa.',
      authCode: 'AUTH-MUSA-992',
    },
    {
      id: 'hist-2',
      code: 'ADJ-2026-009',
      type: 'Correction',
      patientName: 'Babatunde Adeleke',
      amount: -5000,
      date: '02 Oct 2026',
      note: 'Billing Correction: Inadvertent duplicate consumable fee applied on invoice generation. Fully reversed.',
      authCode: 'LEDGER-REV-04',
    },
  ]);

  const handleAuthorize = () => {
    setQueueItem((prev) => ({
      ...prev,
      status: 'authorized',
      financeSigned: true,
    }));
    setHistoryItems((prev) => [
      {
        id: `hist-${Date.now()}`,
        code: queueItem.adjustmentCode,
        type: queueItem.type,
        patientName: queueItem.patientName,
        amount: -queueItem.authorizedCredit,
        date: 'Today, 22 Oct 2026',
        note: queueItem.auditNote,
        authCode: 'AUTH-FIN-ESTHER-882',
      },
      ...prev,
    ]);
    showToast(`Adjustment #${queueItem.adjustmentCode} approved and posted to fiscal ledger!`);
  };

  const handleDecline = () => {
    setQueueItem((prev) => ({
      ...prev,
      status: 'declined',
    }));
    showToast(`Adjustment #${queueItem.adjustmentCode} declined.`);
  };

  const handleCreateRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formPatient.trim() || !formAmount.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }
    setIsNewRequestModalOpen(false);
    showToast(`New adjustment request of ₦${formAmount} created for ${formPatient}. Sent to Clinical Director.`);
    setFormPatient('');
    setFormLifeCode('');
    setFormAmount('');
    setFormReason('');
  };

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-28">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#131b2e] text-[#faf8ff] px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-white/10 animate-fade-in text-sm font-medium">
          <Icon name="check_circle" className="text-[#86f2e4] text-lg" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-white/60 hover:text-white">
            <Icon name="close" className="text-sm" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/85 backdrop-blur-xl border-b border-[#dae2fd]/40 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Fiscal Control</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Refund &amp; Adjustment Records
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsNewRequestModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors shadow-sm"
            >
              <Icon name="add_circle" className="text-[16px]" />
              <span>New Adjustment</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="account_balance" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Branch Context Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#86f2e4] flex items-center justify-center text-[#006f66] shrink-0">
              <Icon name="account_balance" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] truncate">
                Wuse 2 Main Branch (HQ #001)
              </h2>
              <p className="text-xs text-[#707881]">Billing Audit &amp; Fiscal Ledger Control</p>
            </div>
          </div>
          <span className="bg-[#eaedff] text-[#006194] font-mono text-xs font-bold px-3 py-1 rounded-full self-start sm:self-auto">
            DHA §16.35
          </span>
        </div>

        {/* Header Summary Cards (Responsive 4-Col Grid) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* MTD Adjustments */}
          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">MTD Adjustments</span>
              <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#006195]">
                <Icon name="swap_horiz" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                ₦35,000<span className="text-xs font-normal text-[#707881]">.00</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                <p className="text-xs text-[#006a61] font-semibold">1 Claim Settlement</p>
              </div>
            </div>
          </div>

          {/* Approved Refunds */}
          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Approved Refunds</span>
              <div className="w-8 h-8 rounded-full bg-[#86f2e4]/30 flex items-center justify-center text-[#006a61]">
                <Icon name="payments" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                ₦0<span className="text-xs font-normal text-[#707881]">.00</span>
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-[#707881]"></span>
                <p className="text-xs text-[#707881]">0 Direct Payouts Issued</p>
              </div>
            </div>
          </div>

          {/* Pending Actions */}
          <div className="bg-white p-5 rounded-2xl border border-[#cce5ff] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#006194]">Pending Actions</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#006194] animate-ping"></span>
            </div>
            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#006194]">
                  {queueItem.status === 'pending' ? '1' : '0'}
                </p>
                <span className="text-xs text-[#707881]">Review Pending</span>
              </div>
              <p className="text-xs text-[#006194] font-medium mt-1">
                {queueItem.status === 'pending' ? 'Finance &amp; Dir. Review' : 'Queue Cleared'}
              </p>
            </div>
          </div>

          {/* Disputed Balances */}
          <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[#707881]">Disputed Balance</span>
              <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881]">
                <Icon name="verified_user" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                ₦0<span className="text-xs font-normal text-[#707881]">.00</span>
              </p>
              <p className="text-xs text-[#006a61] font-semibold mt-1">Clean Status • Audit Ready</p>
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Left (Dual-Approval Queue), Right (Historical Ledger & Statutory Notice) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols): Dual-Approval Queue Card */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="assignment_late" className="text-[#006194] text-[20px]" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Dual-Approval Queue
                </h3>
              </div>
              <span className="bg-[#cce5ff] text-[#004b73] text-xs font-bold px-2.5 py-0.5 rounded-full">
                {queueItem.status === 'pending' ? '1 Action Required' : '0 Pending'}
              </span>
            </div>

            {queueItem.status === 'pending' ? (
              <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-md p-6 space-y-5 relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#006194] to-[#006a61]"></div>

                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pt-1">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-[#006194]">
                        #{queueItem.adjustmentCode}
                      </span>
                      <span className="bg-[#e2e7ff] text-[#006194] text-xs font-bold px-2.5 py-0.5 rounded-full">
                        {queueItem.type}
                      </span>
                    </div>
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] text-lg font-bold text-[#131b2e] mt-1">
                      {queueItem.patientName}
                    </h4>
                    <p className="text-xs text-[#707881]">
                      {queueItem.demographics} • LifeCode: <span className="font-mono font-bold text-[#131b2e]">{queueItem.lifeCode}</span>
                    </p>
                  </div>
                  <div className="text-left sm:text-right shrink-0">
                    <span className="text-xs bg-[#eaedff] text-[#004b74] px-3 py-1 rounded-full font-bold inline-block">
                      Pending Verification
                    </span>
                    <p className="text-xs text-[#707881] mt-1">{queueItem.date}</p>
                  </div>
                </div>

                {/* Encounter Breakdown */}
                <div className="bg-[#f2f3ff] rounded-xl p-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[#707881]">Encounter Bill:</span>
                    <span className="font-mono text-[#131b2e] font-medium">{queueItem.invoiceRef}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#707881]">Initial Paid (POS):</span>
                    <span className="text-[#131b2e] line-through font-semibold">
                      ₦{queueItem.initialPaid.toLocaleString()}.00
                    </span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-[#dae2fd] shadow-sm">
                    <div className="flex items-center gap-1.5">
                      <Icon name="verified" className="text-[#006a61] text-[18px]" />
                      <span className="font-bold text-[#006a61] text-sm">Authorized Credit:</span>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#006a61]">
                      ₦{queueItem.authorizedCredit.toLocaleString()}.00
                    </span>
                  </div>
                </div>

                {/* Audit Note Box */}
                <div className="bg-[#eaedff]/60 rounded-xl p-4 flex items-start gap-3">
                  <Icon name="policy" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
                  <div className="min-w-0 space-y-1 text-xs">
                    <p className="font-bold text-[#131b2e]">Clinical Audit &amp; Payor Justification</p>
                    <p className="text-[#3f4850] leading-relaxed">{queueItem.auditNote}</p>
                    <div className="flex items-center gap-1.5 pt-1 text-[#707881]">
                      <Icon name="person_outline" className="text-[14px]" />
                      <span>Initiated by: {queueItem.initiator}</span>
                    </div>
                  </div>
                </div>

                {/* Dual Authorization Progress Mandate */}
                <div className="space-y-2.5">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                    Dual Authorization Mandate
                  </p>

                  {/* Stage 1: Clinical Director */}
                  <div className="flex items-center justify-between bg-[#f2f3ff] p-3 rounded-xl">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#86f2e4] flex items-center justify-center shrink-0 text-[#006f66]">
                        <Icon name="check" className="text-[16px]" />
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-xs text-[#131b2e]">Dr. Daniel Okoro</p>
                        <p className="text-[11px] text-[#006a61] font-medium">Clinical Director Verification</p>
                      </div>
                    </div>
                    <span className="bg-white text-[#006a61] border border-[#86f2e4] font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0">
                      Signed 10:45 AM
                    </span>
                  </div>

                  {/* Stage 2: Finance Manager */}
                  <div className="flex items-center justify-between bg-[#eaedff] p-3 rounded-xl border border-[#cce5ff]">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-[#006194] flex items-center justify-center shrink-0 text-white animate-pulse">
                        <Icon name="edit" className="text-[14px]" />
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-xs text-[#131b2e]">Esther John</p>
                        <p className="text-[11px] text-[#006194] font-medium">Finance Manager Sign-off</p>
                      </div>
                    </div>
                    <span className="bg-[#006194] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0">
                      Pending Your Action
                    </span>
                  </div>
                </div>

                {/* Decision Actions */}
                <div className="space-y-2.5 pt-2 border-t border-[#dae2fd]">
                  <button
                    type="button"
                    onClick={handleAuthorize}
                    className="w-full h-12 bg-[#006194] hover:bg-[#007bb9] text-white font-bold text-xs md:text-sm rounded-xl flex items-center justify-center gap-2 shadow-md active:scale-[0.99] transition-all"
                  >
                    <Icon name="thumb_up" className="text-[18px]" />
                    <span>Authorize &amp; Process Adjustment (₦12,000.00)</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => showToast('Clarification requested from reception and clinical team.')}
                      className="h-10 rounded-xl bg-[#e2e7ff] text-[#131b2e] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
                    >
                      <Icon name="info" className="text-[16px] text-[#006194]" />
                      <span>Request Info</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleDecline}
                      className="h-10 rounded-xl bg-[#ffdad6] text-[#93000a] font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#ffdad6]/80 transition-colors"
                    >
                      <Icon name="cancel" className="text-[16px]" />
                      <span>Decline</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-[#dae2fd] p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66] mb-3">
                  <Icon name="check_circle" className="text-[28px]" />
                </div>
                <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                  Dual-Approval Queue Cleared
                </h4>
                <p className="text-xs text-[#707881] mt-1 max-w-sm">
                  All pending credit adjustments and refund authorizations have been reconciled into the fiscal ledger.
                </p>
              </div>
            )}
          </div>

          {/* Right Column (5 cols): Historical Ledger & Mandate Notice */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="receipt_long" className="text-[#006a61] text-[20px]" />
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Historical Ledger
                </h3>
              </div>
              <span className="text-xs text-[#707881]">October 2026</span>
            </div>

            {/* Historical Ledger Items */}
            <div className="space-y-4">
              {historyItems.map((hist) => (
                <div
                  key={hist.id}
                  className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-[#707881] font-semibold">#{hist.code}</span>
                        <span className="bg-[#f2f3ff] text-[#006194] text-[11px] font-bold px-2 py-0.5 rounded">
                          {hist.type}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-[#131b2e] mt-1">{hist.patientName}</h4>
                    </div>
                    <div className="text-right">
                      <p className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#006a61]">
                        {hist.amount.toLocaleString()}.00
                      </p>
                      <p className="text-[11px] text-[#707881]">{hist.date}</p>
                    </div>
                  </div>

                  <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-start gap-2 text-xs text-[#3f4850]">
                    <Icon name="auto_fix_high" className="text-[#707881] text-[16px] shrink-0 mt-0.5" />
                    <p className="leading-snug">{hist.note}</p>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-[#dae2fd]/60 text-xs">
                    <span className="text-[#006a61] font-semibold flex items-center gap-1.5">
                      <Icon name="check_circle" className="text-[14px]" />
                      Reconciled &amp; Signed
                    </span>
                    <span className="font-mono text-[10px] text-[#707881]">{hist.authCode}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Statutory Notice */}
            <div className="bg-[#f2f3ff] rounded-2xl border border-[#dae2fd] p-5 flex items-start gap-3.5 text-xs text-[#3f4850]">
              <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center shrink-0 text-[#006194] mt-0.5">
                <Icon name="gavel" className="text-[18px]" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-[#131b2e]">Statutory Financial Integrity Notice</h4>
                <p className="leading-relaxed">
                  Financial credits, adjustments, or fee waivers are administrative ledger modifications. In compliance with DHA Code §16.35, financial adjustments must never alter clinical records, procedure histories, or dentist diagnoses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Bottom Action */}
      <div className="fixed bottom-6 inset-x-0 z-30 pointer-events-none px-4 md:px-8">
        <div className="max-w-md mx-auto pointer-events-auto">
          <button
            onClick={() => setIsNewRequestModalOpen(true)}
            className="w-full h-12 rounded-2xl bg-[#006194] text-white text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-2xl hover:bg-[#007bb9] active:scale-[0.98] transition-all"
          >
            <Icon name="add_circle" className="text-[20px]" />
            <span>+ Request New Fee Adjustment / Refund</span>
          </button>
        </div>
      </div>

      {/* Modal: New Adjustment Request */}
      {isNewRequestModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dae2fd] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                  <Icon name="add_circle" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                    New Fee Adjustment / Refund Request
                  </h3>
                  <p className="text-xs text-[#707881]">Wuse 2 Main Branch Fiscal Control</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewRequestModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Adekunle"
                  value={formPatient}
                  onChange={(e) => setFormPatient(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">LifeCode ID</label>
                  <input
                    type="text"
                    placeholder="e.g. NG-ABJ-902-114"
                    value={formLifeCode}
                    onChange={(e) => setFormLifeCode(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">Adjustment Amount (₦)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 15,000"
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Adjustment Type</label>
                <select
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/20 bg-white"
                >
                  <option value="Retroactive Credit">Retroactive Insurer Credit</option>
                  <option value="Fee Waiver">Humanitarian Fee Waiver</option>
                  <option value="Billing Correction">Duplicate Billing Correction</option>
                  <option value="Direct Refund">Direct Bank Refund</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Payor Justification / Clinical Context</label>
                <textarea
                  required
                  rows={3}
                  value={formReason}
                  onChange={(e) => setFormReason(e.target.value)}
                  placeholder="Provide context for clinical justification and tariff reconciliation..."
                  className="w-full p-3 rounded-xl border border-[#dae2fd] text-xs focus:outline-none focus:ring-2 focus:ring-[#006194]/20 resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewRequestModalOpen(false)}
                  className="h-11 px-4 rounded-xl border border-[#dae2fd] text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] shadow-sm"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
