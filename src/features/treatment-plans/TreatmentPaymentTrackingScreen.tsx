import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface TransactionLog {
  id: string;
  txCode: string;
  timestamp: string;
  title: string;
  badge: string;
  amount: string;
  amountType: 'credit' | 'neutral';
  target: string;
  method: string;
  cashier: string;
  receiptNumber?: string;
  notes?: string;
}

export function TreatmentPaymentTrackingScreen() {
  const navigate = useNavigate();

  // State
  const [paymentAmount, setPaymentAmount] = useState('120.00');
  const [paymentTarget, setPaymentTarget] = useState('Phase 2: Tooth #15 Fluoride + Prophy (AED 120.00)');
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card (POS)');
  const [authCode, setAuthCode] = useState('AUTH-99482 / Terminal POS 2');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showWaiverModal, setShowWaiverModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [transactions, setTransactions] = useState<TransactionLog[]>([
    {
      id: 'tx-1',
      txCode: 'TX #TX-2026-8812',
      timestamp: '18 Oct 2026, 11:45 GST',
      title: 'Chairside Copay - POS Terminal',
      badge: 'Successful',
      amount: '+AED 170.00',
      amountType: 'credit',
      target: 'Tooth #16 Direct Biomimetic Resin',
      method: 'Apple Pay / Visa (*4021)',
      cashier: 'Fatima Noor (#STAFF-2041)',
      receiptNumber: 'REC-2026-904',
    },
    {
      id: 'tx-2',
      txCode: 'TX #TX-2026-8790',
      timestamp: '14 Oct 2026, 11:30 GST',
      title: 'Insurance Pre-Auth Settlement',
      badge: 'Guaranteed',
      amount: 'AED 1,160.00',
      amountType: 'neutral',
      target: 'Daman Thiqa E-Gate (#CL-99210)',
      method: 'Direct Settlement (80% Plan)',
      cashier: 'Automated DHA Billing Gateway',
      notes: 'Direct E-Billing Clearance',
    },
  ]);

  const handleSubmitPayment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPaymentSuccess(true);

      const newTx: TransactionLog = {
        id: `tx-${Date.now()}`,
        txCode: `TX #TX-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: 'Just now, 12:00 GST',
        title: 'In-Clinic Advance Copay',
        badge: 'Cleared',
        amount: `+AED ${parseFloat(paymentAmount).toFixed(2)}`,
        amountType: 'credit',
        target: paymentTarget,
        method: paymentMethod,
        cashier: 'Fatima Noor (#STAFF-2041)',
        receiptNumber: `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      };

      setTransactions([newTx, ...transactions]);

      setTimeout(() => {
        setPaymentSuccess(false);
        showToast('Payment settled and DHA receipt issued.');
      }, 1200);
    }, 800);
  };

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Payment Tracking"
      badgeCode="13.26"
      badgeLabel="Desk & Financial Ledger"
      currentStep="Step 26 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006a61] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#86f2e4]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Governance Safeguard Alert Banner */}
        <div className="rounded-2xl p-4 sm:p-5 bg-[#f2f3ff] border border-[#eaedff] shadow-xs flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-white text-[#006194] flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
            <Icon name="verified_user" className="text-[20px]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
                Administrative Financial Sandbox & Clinical Independence
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#cce5ff] text-[#004b73]">
                DHA Safeguard Mandate
              </span>
            </div>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Outstanding balances or co-pay delays must never prevent clinical review, emergency pain relief, or diagnostic interpretation. Financial reconciliation remains strictly administrative and only licensed clinical practitioners may modify procedure scope.
            </p>
          </div>
        </div>

        {/* Patient Context Strip */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-[#cce5ff]/50 text-[#006194] font-bold text-base flex items-center justify-center ring-2 ring-[#eaedff]">
                AO
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#006a61] rounded-full ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#131b2e]">Amara Okafor</h2>
                <span className="text-xs text-[#707881] font-semibold">34y F</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#707881] mt-0.5">
                <span>DHA-2026-00451</span>
                <span>•</span>
                <span className="text-[#006194] font-semibold">Plan #TP-2026-089</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[11px] text-[#707881] block">Front Desk Role</span>
              <span className="text-xs font-bold text-[#131b2e] flex items-center gap-1 justify-end">
                <Icon name="shield_person" className="text-[15px] text-[#006a61]" />
                Cashier: Fatima Noor (#STAFF-2041)
              </span>
            </div>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/cost-estimate')}
              className="px-3.5 py-1.5 rounded-xl bg-[#f2f3ff] hover:bg-[#eaedff] text-xs font-semibold text-[#006194] transition-colors border border-[#eaedff]"
            >
              View Quotation (13.25)
            </button>
          </div>
        </div>

        {/* Responsive Grid: Left Ledger & Phase Breakdown, Right Interactive Form & Action Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Ledger, Progress, Audit History */}
          <div className="lg:col-span-7 space-y-6">
            {/* Account Ledger Overview Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eaedff] space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="account_balance_wallet" className="text-[18px]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#131b2e]">Financial Ledger Overview</h3>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#86f2e4]/30 text-[#006f66] flex items-center gap-1.5 border border-[#86f2e4]/50">
                  <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                  Active Co-pay Ledger
                </span>
              </div>

              {/* Balance Metric Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#707881] mb-1">
                    <span className="text-xs font-semibold">Settled Chairside</span>
                    <Icon name="check_circle" className="text-[16px] text-[#006a61]" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#131b2e]">AED 170.00</span>
                    <div className="text-xs text-[#707881] flex items-center gap-1.5 mt-1">
                      <span className="font-semibold text-[#006a61]">Phase 1 Cleared</span>
                      <span>•</span>
                      <span>POS Card</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#cce5ff]/30 border border-[#93ccff]/40 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-[#004b73] mb-1">
                    <span className="text-xs font-semibold">Due Copay Balance</span>
                    <Icon name="schedule" className="text-[16px] text-[#006194]" />
                  </div>
                  <div>
                    <span className="text-2xl font-bold text-[#006194]">AED 120.00</span>
                    <p className="text-xs text-[#004b73] mt-1 font-medium">Due Phase 2 Check-in (02 Nov)</p>
                  </div>
                </div>
              </div>

              {/* Co-pay Progress Visual Meter */}
              <div className="space-y-2 pt-1 border-t border-[#eaedff]">
                <div className="flex items-center justify-between text-xs text-[#3f4850]">
                  <span className="font-semibold">Patient Approved Copay Total: AED 290.00</span>
                  <span className="font-bold text-[#006a61]">58.6% Paid</span>
                </div>
                <div className="w-full h-3 bg-[#eaedff] rounded-full overflow-hidden flex">
                  <div className="h-full bg-[#006a61] rounded-l-full" style={{ width: '58.6%' }}></div>
                  <div className="h-full bg-[#007bb9]/30 rounded-r-full" style={{ width: '41.4%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="flex items-center gap-1.5 font-medium text-[#006a61]">
                    <span className="w-2 h-2 rounded-full bg-[#006a61] inline-block"></span>
                    AED 170.00 Cleared
                  </span>
                  <span className="flex items-center gap-1.5 font-medium text-[#006194]">
                    <span className="w-2 h-2 rounded-full bg-[#007bb9] inline-block"></span>
                    AED 120.00 Pending Phase 2
                  </span>
                </div>
              </div>

              {/* Insurance Pre-auth Strip */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-[#86f2e4]/30 flex items-center justify-center shrink-0 text-[#006a61]">
                    <Icon name="health_and_safety" className="text-[20px]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-[#131b2e] truncate">
                      Daman Thiqa Direct Pre-Auth
                    </div>
                    <div className="font-mono text-[11px] text-[#707881] truncate">
                      E-Billing #CL-99210 • 80% Coverage
                    </div>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <span className="text-sm font-bold text-[#006a61]">AED 1,160.00</span>
                  <div className="flex items-center justify-end gap-1 text-[10px] font-bold text-[#006a61]">
                    <Icon name="verified" className="text-[12px]" /> Approved Direct Pay
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Phase Breakdown */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="calendar_clock" className="text-[#006194] text-[20px]" />
                  <h3 className="text-base font-bold text-[#131b2e]">Pending Phase 2 Allocation</h3>
                </div>
                <span className="text-xs text-[#707881] font-semibold">Scheduled: 02 Nov 2026</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center font-mono font-bold text-xs">
                      #15
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Fluoride Varnish Demineralization</div>
                      <div className="text-[11px] text-[#707881]">Clinical Copay Share (20%)</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#131b2e]">AED 50.00</div>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f2f3ff] border border-[#eaedff]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center font-mono font-bold text-xs">
                      FM
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Periodontal Deep Prophylaxis</div>
                      <div className="text-[11px] text-[#707881]">Preventive Subgingival Debridement</div>
                    </div>
                  </div>
                  <div className="text-xs font-bold text-[#131b2e]">AED 70.00</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#faf8ff] border border-[#eaedff] flex items-center justify-between text-xs text-[#3f4850]">
                <div className="flex items-center gap-2">
                  <Icon name="smartphone" className="text-[16px] text-[#006194]" />
                  <span>Payable via DHA Smart App or at clinic reception</span>
                </div>
                <span className="font-mono font-bold text-[#006194]">AED 120.00</span>
              </div>
            </div>

            {/* Audit History & Ledger */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="history_edu" className="text-[#006194] text-[20px]" />
                  <h3 className="text-base font-bold text-[#131b2e]">Audit Ledger & History</h3>
                </div>
                <span className="font-mono text-xs text-[#707881] bg-[#f2f3ff] px-2.5 py-1 rounded-full border border-[#eaedff]">
                  {transactions.length} Validated Logs
                </span>
              </div>

              <div className="space-y-3">
                {transactions.map((tx) => (
                  <div
                    key={tx.id}
                    className="rounded-xl bg-[#f2f3ff] p-4 space-y-2 border border-[#eaedff]"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-[#131b2e]">{tx.title}</span>
                          <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#86f2e4]/40 text-[#006f66] uppercase">
                            {tx.badge}
                          </span>
                        </div>
                        <p className="font-mono text-[11px] text-[#707881] mt-0.5">
                          {tx.txCode} • {tx.timestamp}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`text-sm font-bold ${
                            tx.amountType === 'credit' ? 'text-[#006a61]' : 'text-[#006194]'
                          }`}
                        >
                          {tx.amount}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#eaedff] text-xs text-[#3f4850] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-[#131b2e]">
                          <Icon name="dentistry" className="text-[14px] text-[#006194]" />
                          Target: {tx.target}
                        </span>
                        <span className="font-mono text-[11px] text-[#707881]">{tx.method}</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#707881]">
                        <span>Recorded by: {tx.cashier}</span>
                        {tx.receiptNumber && (
                          <button
                            type="button"
                            onClick={() => showToast(`Receipt #${tx.receiptNumber} downloaded.`)}
                            className="text-[#006194] hover:underline font-semibold flex items-center gap-1"
                          >
                            <Icon name="receipt_long" className="text-[13px]" />
                            Rec #{tx.receiptNumber}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Interactive Payment Entry Drawer / Form & Governance Controls */}
          <div className="lg:col-span-5 space-y-6">
            {/* Payment Entry Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-[#131b2e]">Record Chairside Payment</h4>
                  <p className="text-xs text-[#707881]">Immediate receipt generation for Amara Okafor</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                  <Icon name="add_card" className="text-[18px]" />
                </div>
              </div>

              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">
                    Payable Procedure Target
                  </label>
                  <select
                    value={paymentTarget}
                    onChange={(e) => {
                      setPaymentTarget(e.target.value);
                      if (e.target.value.includes('120.00')) setPaymentAmount('120.00');
                      else if (e.target.value.includes('50.00')) setPaymentAmount('50.00');
                      else if (e.target.value.includes('70.00')) setPaymentAmount('70.00');
                    }}
                    className="w-full h-11 px-3 bg-[#faf8ff] rounded-xl border border-[#bfc7d2] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option>Phase 2: Tooth #15 Fluoride + Prophy (AED 120.00)</option>
                    <option>Tooth #15 Fluoride Varnish only (AED 50.00)</option>
                    <option>Periodontal Scaling / Prophy only (AED 70.00)</option>
                    <option>Custom Settlement Allocation</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-[#131b2e] block mb-1">Amount (AED)</label>
                    <input
                      type="text"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full h-11 px-3 bg-[#faf8ff] rounded-xl border border-[#bfc7d2] text-sm font-bold text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-[#131b2e] block mb-1">POS Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full h-11 px-3 bg-[#faf8ff] rounded-xl border border-[#bfc7d2] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                    >
                      <option>Credit/Debit Card (POS)</option>
                      <option>Apple Pay / Digital Wallet</option>
                      <option>Cash Reception Safe</option>
                      <option>Bank Direct Transfer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">
                    Terminal Auth Code / Terminal Reference
                  </label>
                  <input
                    type="text"
                    value={authCode}
                    onChange={(e) => setAuthCode(e.target.value)}
                    placeholder="e.g. AUTH-882910 / Counter POS 2"
                    className="w-full h-10 px-3 bg-[#faf8ff] rounded-xl border border-[#bfc7d2] text-[#131b2e] placeholder:text-[#707881] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] flex items-center justify-between text-xs text-[#707881] border border-[#eaedff]">
                  <span>Logged Cashier:</span>
                  <span className="font-bold text-[#131b2e]">Fatima Noor (#STAFF-2041)</span>
                </div>

                <button
                  type="button"
                  onClick={handleSubmitPayment}
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#006a61] hover:bg-[#005049] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <Icon name="refresh" className="text-[20px] animate-spin" />
                      Generating DHA Receipt...
                    </>
                  ) : paymentSuccess ? (
                    <>
                      <Icon name="check_circle" className="text-[20px] text-[#86f2e4]" />
                      Payment Cleared
                    </>
                  ) : (
                    <>
                      <Icon name="verified" className="text-[20px]" />
                      Commit Transaction & Issue PDF
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Action Tiles */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
              <h4 className="text-xs font-bold text-[#707881] uppercase tracking-wider">
                Audited Ledger Adjustments
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(true)}
                  className="h-11 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#eaedff]"
                >
                  <Icon name="percent" className="text-[17px] text-[#006194]" />
                  Apply Waiver
                </button>
                <button
                  type="button"
                  onClick={() => setShowRefundModal(true)}
                  className="h-11 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#ba1a1a] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#eaedff]"
                >
                  <Icon name="currency_exchange" className="text-[17px]" />
                  Refund / Adjust
                </button>
              </div>

              <button
                type="button"
                onClick={() => showToast('Complete patient financial statement exported as PDF.')}
                className="w-full h-11 bg-white hover:bg-[#f2f3ff] text-[#131b2e] rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-[#eaedff]"
              >
                <Icon name="picture_as_pdf" className="text-[18px] text-[#006194]" />
                Issue Patient Statement (PDF)
              </button>
            </div>

            {/* Traceability Notice */}
            <div className="p-4 rounded-2xl bg-[#faf8ff] border border-[#eaedff] flex items-start gap-3">
              <Icon name="policy" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3f4850] leading-relaxed">
                <strong className="text-[#131b2e]">Immutable Cashier Audit:</strong> All fee waivers, clinical co-pay variances, or retrospective adjustments require Clinic Director electronic dual sign-off. Financial entries cannot overwrite diagnosed odontogram procedures.
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Fee Waiver */}
        {showWaiverModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="percent" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Record Fee Waiver</h3>
                    <p className="text-xs text-[#707881]">Cashier Dual Authorization</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Waiver Target</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]">
                    <option>Phase 2: Tooth #15 Fluoride Varnish (AED 50.00)</option>
                    <option>Phase 2: Periodontal Prophylaxis (AED 70.00)</option>
                    <option>Entire Remaining Copay (AED 120.00)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Supervisor Passcode</label>
                  <input
                    type="password"
                    placeholder="Enter Clinic Director PIN"
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowWaiverModal(false);
                    showToast('Waiver authorization recorded.');
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Confirm Waiver
                </button>
                <button
                  type="button"
                  onClick={() => setShowWaiverModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Refund / Adjust */}
        {showRefundModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#ffdad6]/50 text-[#ba1a1a] flex items-center justify-center">
                    <Icon name="currency_exchange" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Process Payment Reversal / Refund</h3>
                    <p className="text-xs text-[#707881]">Fiscal Adjustment Protocol</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Target Receipt</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]">
                    <option>REC-2026-904 (18 Oct 2026 - AED 170.00)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Refund Method</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]">
                    <option>Reversal to Original Card (Visa *4021)</option>
                    <option>Credit Balance in Patient Account</option>
                  </select>
                </div>
                <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-[#93000a] text-xs leading-relaxed">
                  Refunds cannot be completed without patient electronic biometric signature verification.
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowRefundModal(false);
                    showToast('Refund reversal dispatched to gateway.');
                  }}
                  className="flex-1 h-11 bg-[#ba1a1a] hover:bg-[#93000a] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Initiate Reversal
                </button>
                <button
                  type="button"
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
