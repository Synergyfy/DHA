import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type PaymentMethodType = 'pos' | 'transfer' | 'hmo' | 'cash';

export const PaymentRecordingScreen: React.FC = () => {
  const navigate = useNavigate();

  const totalDue = 75000;
  const [amountInput, setAmountInput] = useState('75,000.00');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('pos');
  const [selectedPill, setSelectedPill] = useState<string>('full');
  const [rrnCode, setRrnCode] = useState('AUTH-99104-ZEN');
  const [cardIdentifier, setCardIdentifier] = useState('Mastercard •••• 8821');
  const [bankRef, setBankRef] = useState('NIBSS-TRF-98214');
  const [ledgerNotes, setLedgerNotes] = useState(
    'Final balance payment prior to chairside crown cementation scheduled for 11:30 AM.'
  );
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const parsedAmount = parseFloat(amountInput.replace(/,/g, '')) || 0;
  const remainingBalance = totalDue - parsedAmount;

  const handleShortcutClick = (val: string, amountNum: number) => {
    setSelectedPill(val);
    if (val !== 'custom') {
      setAmountInput(amountNum.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
  };

  const handlePostPayment = () => {
    showToast(`Payment of ₦${parsedAmount.toLocaleString()} recorded under #REC-88405!`);
    setTimeout(() => {
      navigate('/clinic-operations/payment-history');
    }, 1200);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Cashier Register</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.33</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Payment Recording: #INV-2026-442
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/clinic-operations/payment-history')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="receipt_long" className="text-[16px]" />
              <span>Receipts Ledger (16.34)</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="point_of_sale" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Branch Context Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] shrink-0 animate-pulse"></span>
            <span className="text-xs md:text-sm font-semibold text-[#131b2e] truncate">
              Wuse 2 Main Branch (HQ #001) • Cashier POS Desk 01
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-[#006f66] bg-[#86f2e4] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              Real-Time Posting Mode
            </span>
          </div>
        </div>

        {/* Responsive 2-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (5 cols): Patient & Balance Anchor */}
          <div className="lg:col-span-5 space-y-6">
            {/* Section 1: Patient & Clinical Invoice Anchor Card */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-5 bg-[#f2f3ff] flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="relative shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold shadow-sm">
                      YA
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#006a61] text-white flex items-center justify-center shadow">
                      <Icon name="verified" className="text-[12px]" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] truncate">
                        Yusuf Abubakar
                      </h2>
                      <span className="text-[11px] font-semibold text-[#3f4850] bg-[#dae2fd] px-1.5 py-0.5 rounded">
                        38y M
                      </span>
                    </div>
                    <p className="font-mono text-xs text-[#006194] font-semibold tracking-tight mt-0.5">
                      LifeCode: NG-ABJ-112-909
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-[#006a61] bg-white px-2 py-1 rounded-lg border border-[#dae2fd] shadow-sm block">
                    INV-2026-442
                  </span>
                  <span className="text-[11px] text-[#707881] mt-0.5 block">+234 803 219 4481</span>
                </div>
              </div>

              {/* Clinical Procedure Linkage Note */}
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-[#f2f3ff]">
                  <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#006194] shrink-0 shadow-sm">
                    <Icon name="dentistry" className="text-[18px]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs md:text-sm font-semibold text-[#131b2e] truncate">
                        Tooth #14: Crown Delivery
                      </span>
                      <span className="text-[11px] font-bold text-[#006194]">Stage 2/2</span>
                    </div>
                    <p className="text-xs text-[#707881] truncate">
                      Attending: Dr. Michael James • Porcelain-Zirconia
                    </p>
                  </div>
                </div>

                {/* Financial Balance Breakdown Bar */}
                <div className="grid grid-cols-3 gap-2 text-center p-2.5 bg-[#eaedff] rounded-xl">
                  <div className="bg-white py-2 px-1 rounded-lg shadow-sm">
                    <p className="text-[11px] font-medium text-[#707881]">Gross Total</p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-[#131b2e] mt-0.5">
                      ₦150,000
                    </p>
                  </div>
                  <div className="bg-white py-2 px-1 rounded-lg shadow-sm">
                    <p className="text-[11px] font-medium text-[#006a61]">Deposit Paid</p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-[#006a61] mt-0.5">
                      ₦75,000
                    </p>
                  </div>
                  <div className="bg-[#006194] text-white py-2 px-1 rounded-lg shadow-sm">
                    <p className="text-[11px] font-medium text-[#cce5ff]">Current Due</p>
                    <p className="font-['Plus_Jakarta_Sans',sans-serif] text-sm md:text-base font-bold text-white mt-0.5">
                      ₦75,000.00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Statutory Compliance Guardrail Notice */}
            <div className="bg-[#f2f3ff] rounded-2xl border border-[#dae2fd] p-4 flex items-start gap-3 text-xs text-[#3f4850]">
              <Icon name="policy" className="text-[#006194] text-[20px] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-bold text-[#131b2e]">Financial Governance Guardrail</h4>
                <p className="leading-relaxed">
                  Recording this payment generates cryptographically signed receipt <span className="font-mono font-bold text-[#006194]">#REC-88405</span>. Financial postings are strictly decoupled and do not modify verified dental charts, treatment plans, or clinical diagnoses.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Payment Amount, Method, Audit, and CTA */}
          <div className="lg:col-span-7 space-y-6">
            {/* Section 2: Payment Amount & Fast Calculation */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5" htmlFor="payment-amount">
                  <Icon name="payments" className="text-[#006194] text-[18px]" />
                  Payment Amount
                </label>
                <span className="text-xs font-semibold text-[#006a61] flex items-center gap-1 bg-[#86f2e4]/30 px-2.5 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#006a61]"></span>
                  Zero Ledger Drift
                </span>
              </div>

              {/* Amount Input */}
              <div className="relative flex items-center">
                <div className="absolute left-4 font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#006194] select-none">
                  ₦
                </div>
                <input
                  id="payment-amount"
                  type="text"
                  value={amountInput}
                  onChange={(e) => {
                    setAmountInput(e.target.value);
                    setSelectedPill('custom');
                  }}
                  className="w-full h-14 pl-10 pr-16 bg-[#f2f3ff] text-[#131b2e] font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-bold rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 transition-all"
                />
                <div className="absolute right-3.5 py-1 px-2.5 rounded-lg bg-white border border-[#dae2fd] text-xs font-bold text-[#707881]">
                  NGN
                </div>
              </div>

              {/* Quick Amount Shortcuts */}
              <div className="grid grid-cols-4 gap-2">
                <button
                  type="button"
                  onClick={() => handleShortcutClick('full', 75000)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                    selectedPill === 'full'
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                  }`}
                >
                  Full (₦75k)
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcutClick('50k', 50000)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                    selectedPill === '50k'
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                  }`}
                >
                  ₦50,000
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcutClick('25k', 25000)}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                    selectedPill === '25k'
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                  }`}
                >
                  ₦25,000
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedPill('custom')}
                  className={`py-2 px-1 rounded-xl text-xs font-bold text-center transition-all ${
                    selectedPill === 'custom'
                      ? 'bg-[#006194] text-white shadow-sm'
                      : 'bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e]'
                  }`}
                >
                  Custom
                </button>
              </div>

              {/* Balance Status Feedback Card */}
              <div
                className={`flex items-center justify-between p-3.5 rounded-xl ${
                  remainingBalance <= 0
                    ? 'bg-[#86f2e4]/30 border border-[#86f2e4] text-[#006f66]'
                    : 'bg-[#ffdad6]/40 border border-[#ffdad6] text-[#93000a]'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Icon
                    name={remainingBalance <= 0 ? 'task_alt' : 'pending_actions'}
                    className="text-[20px] shrink-0"
                  />
                  <span className="text-xs md:text-sm font-semibold truncate">Remaining Balance After Posting</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base">
                  {remainingBalance <= 0
                    ? '₦0.00 (Settled in Full)'
                    : `₦${remainingBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })} (Pending)`}
                </span>
              </div>
            </div>

            {/* Section 3: Payment Instrument Selection */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
                  <Icon name="credit_card" className="text-[#006194] text-[18px]" />
                  Payment Instrument
                </h3>
                <span className="text-xs text-[#707881]">Direct Settlement</span>
              </div>

              {/* 4 Method Cards */}
              <div className="grid grid-cols-2 gap-3">
                {/* Method 1: POS Card */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('pos')}
                  className={`flex flex-col items-start p-3.5 rounded-xl text-left transition-all relative border ${
                    selectedMethod === 'pos'
                      ? 'bg-[#cce5ff]/40 border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm ${
                      selectedMethod === 'pos' ? 'bg-[#006194] text-white' : 'bg-white text-[#131b2e]'
                    }`}
                  >
                    <Icon name="point_of_sale" className="text-[18px]" />
                  </div>
                  <span className="font-bold text-xs md:text-sm text-[#131b2e] block">POS Card</span>
                  <span className="text-[11px] text-[#707881] mt-0.5">Physical Terminal</span>
                  <span className="absolute top-3 right-3 text-[#006194]">
                    <Icon
                      name={selectedMethod === 'pos' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      className="text-[18px]"
                    />
                  </span>
                </button>

                {/* Method 2: Bank Transfer */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('transfer')}
                  className={`flex flex-col items-start p-3.5 rounded-xl text-left transition-all relative border ${
                    selectedMethod === 'transfer'
                      ? 'bg-[#cce5ff]/40 border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm ${
                      selectedMethod === 'transfer' ? 'bg-[#006194] text-white' : 'bg-white text-[#131b2e]'
                    }`}
                  >
                    <Icon name="account_balance" className="text-[18px]" />
                  </div>
                  <span className="font-bold text-xs md:text-sm text-[#131b2e] block">Bank Transfer</span>
                  <span className="text-[11px] text-[#707881] mt-0.5">NIBSS Verification</span>
                  <span className="absolute top-3 right-3 text-[#006194]">
                    <Icon
                      name={selectedMethod === 'transfer' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      className="text-[18px]"
                    />
                  </span>
                </button>

                {/* Method 3: HMO Co-Pay */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('hmo')}
                  className={`flex flex-col items-start p-3.5 rounded-xl text-left transition-all relative border ${
                    selectedMethod === 'hmo'
                      ? 'bg-[#cce5ff]/40 border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm ${
                      selectedMethod === 'hmo' ? 'bg-[#006194] text-white' : 'bg-white text-[#131b2e]'
                    }`}
                  >
                    <Icon name="health_and_safety" className="text-[18px]" />
                  </div>
                  <span className="font-bold text-xs md:text-sm text-[#131b2e] block">HMO Co-Pay</span>
                  <span className="text-[11px] text-[#707881] mt-0.5">Direct Billing</span>
                  <span className="absolute top-3 right-3 text-[#006194]">
                    <Icon
                      name={selectedMethod === 'hmo' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      className="text-[18px]"
                    />
                  </span>
                </button>

                {/* Method 4: Cash Register */}
                <button
                  type="button"
                  onClick={() => setSelectedMethod('cash')}
                  className={`flex flex-col items-start p-3.5 rounded-xl text-left transition-all relative border ${
                    selectedMethod === 'cash'
                      ? 'bg-[#cce5ff]/40 border-[#006194] shadow-sm'
                      : 'bg-[#f2f3ff] border-transparent hover:bg-[#e2e7ff]'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm ${
                      selectedMethod === 'cash' ? 'bg-[#006194] text-white' : 'bg-white text-[#131b2e]'
                    }`}
                  >
                    <Icon name="attach_money" className="text-[18px]" />
                  </div>
                  <span className="font-bold text-xs md:text-sm text-[#131b2e] block">Cash Register</span>
                  <span className="text-[11px] text-[#707881] mt-0.5">Regulated Cap</span>
                  <span className="absolute top-3 right-3 text-[#006194]">
                    <Icon
                      name={selectedMethod === 'cash' ? 'radio_button_checked' : 'radio_button_unchecked'}
                      className="text-[18px]"
                    />
                  </span>
                </button>
              </div>

              {/* Active Terminal / Instrument Details */}
              {selectedMethod === 'pos' && (
                <div className="p-4 bg-[#f2f3ff] rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#707881] uppercase">Assigned Terminal</span>
                    <span className="text-xs font-semibold text-[#006a61] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
                      Online &amp; Synced
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-[#dae2fd] shadow-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="router" className="text-[#006194] text-[20px]" />
                      <span className="font-semibold text-xs md:text-sm text-[#131b2e]">Terminal #TERM-WUS-01</span>
                    </div>
                    <span className="text-xs font-mono bg-[#dae2fd] px-2 py-0.5 rounded text-[#131b2e]">
                      Zenith Desk
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">Approval / RRN Code</label>
                      <input
                        type="text"
                        value={rrnCode}
                        onChange={(e) => setRrnCode(e.target.value)}
                        className="w-full h-11 px-3 bg-white text-[#131b2e] font-mono text-xs font-bold rounded-lg border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#131b2e] mb-1">Masked Card Identifier</label>
                      <input
                        type="text"
                        value={cardIdentifier}
                        onChange={(e) => setCardIdentifier(e.target.value)}
                        className="w-full h-11 px-3 bg-white text-[#131b2e] text-xs font-semibold rounded-lg border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'transfer' && (
                <div className="p-4 bg-[#f2f3ff] rounded-xl space-y-3">
                  <span className="text-[11px] font-bold text-[#707881] uppercase block">
                    Instant Bank Transfer Details
                  </span>
                  <div>
                    <label className="block text-xs font-semibold text-[#131b2e] mb-1">NIBSS Settlement Session ID / Ref</label>
                    <input
                      type="text"
                      value={bankRef}
                      onChange={(e) => setBankRef(e.target.value)}
                      className="w-full h-11 px-3 bg-white text-[#131b2e] font-mono text-xs font-bold rounded-lg border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                    />
                  </div>
                </div>
              )}

              {selectedMethod === 'hmo' && (
                <div className="p-4 bg-[#f2f3ff] rounded-xl space-y-2 text-xs text-[#3f4850]">
                  <p className="font-bold text-[#131b2e]">Third-Party Payer Direct Co-Pay</p>
                  <p>Co-pay amount mapped to pre-authorization code <span className="font-mono font-bold">AUTH-HMO-402</span> under AXA Mansard Dental.</p>
                </div>
              )}

              {selectedMethod === 'cash' && (
                <div className="p-4 bg-[#f2f3ff] rounded-xl space-y-2 text-xs text-[#3f4850]">
                  <p className="font-bold text-[#131b2e]">Physical Cash Drawer</p>
                  <p>Regulated central bank cash policy in place. Cash counted and placed in Safe Vault Drawer #01.</p>
                </div>
              )}
            </div>

            {/* Section 4: Audit Trail & Internal Remark */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#131b2e] flex items-center gap-1.5">
                <Icon name="badge" className="text-[#006194] text-[18px]" />
                Audit Trail &amp; Timestamp
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div className="flex items-center gap-2">
                    <Icon name="schedule" className="text-[18px] text-[#006194]" />
                    <div>
                      <span className="text-[#707881] block">Timestamp</span>
                      <span className="font-semibold text-[#131b2e]">22 Oct 2026 • 10:15 AM</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#006194] bg-white px-2 py-0.5 rounded shadow-sm">Real-time</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#f2f3ff] rounded-xl">
                  <div className="flex items-center gap-2">
                    <Icon name="account_circle" className="text-[18px] text-[#006194]" />
                    <div>
                      <span className="text-[#707881] block">Recorded Officer</span>
                      <span className="font-semibold text-[#131b2e]">Esther John (Finance)</span>
                    </div>
                  </div>
                  <span className="font-mono text-[#707881]">#FIN-882</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1.5" htmlFor="notes">
                  Internal Ledger Remark (Audited)
                </label>
                <textarea
                  id="notes"
                  rows={2}
                  value={ledgerNotes}
                  onChange={(e) => setLedgerNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#f2f3ff] border border-[#dae2fd] text-xs focus:outline-none focus:ring-2 focus:ring-[#006194]/20 resize-none"
                />
              </div>
            </div>

            {/* Section 6: Action Triggers */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handlePostPayment}
                className="w-full h-13 py-3.5 bg-[#006194] hover:bg-[#007bb9] text-white font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-[0.99] transition-all"
              >
                <Icon name="check_circle" className="text-[20px]" />
                <span>Confirm &amp; Post Payment (₦{parsedAmount.toLocaleString('en-NG', { minimumFractionDigits: 2 })})</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => showToast('Payment draft saved to terminal drawer.')}
                  className="h-11 rounded-xl bg-white border border-[#dae2fd] text-[#3f4850] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#f2f3ff] transition-colors"
                >
                  <Icon name="bookmark_border" className="text-[18px]" />
                  <span>Save as Draft</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="h-11 rounded-xl bg-white border border-[#ffdad6] text-[#ba1a1a] text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-[#ffdad6]/30 transition-colors"
                >
                  <Icon name="cancel" className="text-[18px]" />
                  <span>Cancel &amp; Return</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
