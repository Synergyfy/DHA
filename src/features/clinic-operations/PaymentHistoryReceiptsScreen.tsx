import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type ReceiptCategory = 'all' | 'pos' | 'transfer' | 'hmo';

interface ReceiptRecord {
  id: string;
  receiptNumber: string;
  invoiceNumber: string;
  time: string;
  amount: number;
  patientName: string;
  demographics: string;
  lifeCode: string;
  methodType: 'pos' | 'transfer' | 'hmo';
  methodLabel: string;
  officer: string;
  badge?: string;
  isAudited?: boolean;
}

export const PaymentHistoryReceiptsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<ReceiptCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Wuse 2 Main Branch');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Receipt Modal state
  const [activeReceipt, setActiveReceipt] = useState<ReceiptRecord | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const receipts: ReceiptRecord[] = [
    {
      id: 'rec-1',
      receiptNumber: 'REC-88405',
      invoiceNumber: 'INV-2026-442',
      time: '10:15 AM Today',
      amount: 75000,
      patientName: 'Yusuf Abubakar',
      demographics: '38y M',
      lifeCode: 'NG-ABJ-112-909',
      methodType: 'pos',
      methodLabel: 'POS (Zenith Desk #01) • Auth #99104',
      officer: 'Esther John',
      badge: 'Just Posted',
    },
    {
      id: 'rec-2',
      receiptNumber: 'REC-88402',
      invoiceNumber: 'INV-2026-441',
      time: '08:52 AM Today',
      amount: 9000,
      patientName: 'Amara Okafor',
      demographics: '34y F',
      lifeCode: 'AE-990-281-DXB',
      methodType: 'pos',
      methodLabel: 'Mastercard **4102 • Auth #78912',
      officer: 'Esther John',
    },
    {
      id: 'rec-3',
      receiptNumber: 'REC-88401',
      invoiceNumber: 'INV-2026-440',
      time: '08:35 AM Today',
      amount: 35000,
      patientName: 'Ngozi Eze',
      demographics: '26y F',
      lifeCode: 'NG-ABJ-339-182',
      methodType: 'transfer',
      methodLabel: 'GTBank Transfer • NIBSS-98124',
      officer: 'David Musa',
    },
    {
      id: 'rec-4',
      receiptNumber: 'REC-88400',
      invoiceNumber: 'INV-2026-439',
      time: '09:35 AM Today',
      amount: 15000,
      patientName: 'Chinedu Eze',
      demographics: '11y M',
      lifeCode: 'NG-LOS-229-881',
      methodType: 'pos',
      methodLabel: 'Visa **1902 • Terminal #03',
      officer: 'Grace Ibrahim',
    },
    {
      id: 'rec-5',
      receiptNumber: 'REC-88399',
      invoiceNumber: 'INV-2026-435',
      time: 'Yesterday, 16:40 WAT',
      amount: 120000,
      patientName: 'Tunde Bakare',
      demographics: '45y M',
      lifeCode: 'NG-ABJ-661-209',
      methodType: 'transfer',
      methodLabel: 'Access Bank Direct Transfer',
      officer: 'Esther John',
      isAudited: true,
    },
  ];

  // Filtering
  const filteredReceipts = useMemo(() => {
    return receipts.filter((item) => {
      const matchesTab = activeTab === 'all' || item.methodType === activeTab;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.receiptNumber.toLowerCase().includes(q) ||
        item.patientName.toLowerCase().includes(q) ||
        item.lifeCode.toLowerCase().includes(q) ||
        item.invoiceNumber.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [receipts, activeTab, searchQuery]);

  return (
    <div className="bg-[#faf8ff] font-['Inter',sans-serif] text-[#131b2e] antialiased min-h-screen flex flex-col pb-24">
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Audit &amp; Receipts</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Payment History &amp; Receipts
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Reconciling All Terminal Batches with Host Bank...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="sync_saved_locally" className="text-[16px]" />
              <span>Reconcile Terminals</span>
            </button>
            <button
              onClick={() => navigate('/clinic-operations/payment-recording')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors shadow-sm"
            >
              <Icon name="point_of_sale" className="text-[16px]" />
              <span>Record Payment</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="receipt" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Branch Context Strip */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0">
              <Icon name="location_on" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block">Operating Branch</span>
              <select
                value={selectedBranch}
                onChange={(e) => {
                  setSelectedBranch(e.target.value);
                  showToast(`Viewing receipts for ${e.target.value}`);
                }}
                className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] bg-transparent border-none focus:outline-none cursor-pointer p-0"
              >
                <option value="Wuse 2 Main Branch">Wuse 2 Main Branch (HQ #001)</option>
                <option value="Garki Clinic">Garki Clinic Branch</option>
                <option value="Maitama VIP Suite">Maitama VIP Suite</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#86f2e4]/30 border border-[#86f2e4] rounded-xl text-xs font-bold text-[#006f66]">
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <span>Sync Active • Zero Variance</span>
            </div>
          </div>
        </div>

        {/* Realtime Financial Snapshot Bento Grid */}
        <div className="bg-white p-6 rounded-2xl border border-[#dae2fd] shadow-sm space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#707881]">
                  Today's Total Receipts (22 Oct 2026)
                </span>
                <Icon name="verified" className="text-[#006a61] text-[16px]" />
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#131b2e] mt-1 tracking-tight">
                ₦915,000<span className="text-lg font-normal text-[#707881]">.00</span>
              </h2>
            </div>
            <span className="px-3 py-1 bg-[#f2f3ff] rounded-full font-mono text-xs font-bold text-[#006194] self-start sm:self-auto">
              27 TRANSACTIONS POSTED
            </span>
          </div>

          {/* Reconciliation Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-[#f2f3ff] rounded-xl text-xs gap-2">
            <div className="flex items-center gap-2">
              <Icon name="verified_user" className="text-[#006a61] text-[18px]" />
              <span className="font-bold text-[#131b2e]">100% Cashless Reconciliation</span>
              <span className="text-[#707881]">• Central Bank Regulatory Mandate</span>
            </div>
            <span className="font-bold text-[#006a61]">Zero Ledger Drift Certified</span>
          </div>

          {/* Breakdown Trackers (POS vs Transfers) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#707881]">
                <span className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                  <Icon name="point_of_sale" className="text-[16px] text-[#006194]" />
                  POS Terminals
                </span>
                <span className="font-mono font-bold text-[#006194]">67.2%</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">₦615,000.00</p>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full" style={{ width: '67.2%' }}></div>
              </div>
            </div>

            <div className="bg-[#f2f3ff] p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between text-xs text-[#707881]">
                <span className="flex items-center gap-1.5 font-semibold text-[#131b2e]">
                  <Icon name="account_balance" className="text-[16px] text-[#006195]" />
                  Direct Instant Transfers
                </span>
                <span className="font-mono font-bold text-[#006195]">32.8%</span>
              </div>
              <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">₦300,000.00</p>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006195] h-full rounded-full" style={{ width: '32.8%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Search, Date Selector & Categorical Filter Pills */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[18px]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Receipt #, Patient, LifeCode, Invoice..."
                className="w-full h-11 pl-10 pr-10 rounded-xl bg-white text-[#131b2e] text-sm border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 shadow-sm"
              />
              <button
                onClick={() => showToast('Optical QR / Barcode Scanner activated.')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#006194]"
                title="Scan QR Code"
              >
                <Icon name="qr_code_scanner" className="text-[18px]" />
              </button>
            </div>

            <div className="h-11 px-4 rounded-xl bg-white border border-[#dae2fd] flex items-center justify-between gap-3 text-xs shadow-sm">
              <div className="flex items-center gap-2 text-[#131b2e]">
                <Icon name="calendar_today" className="text-[#006194] text-[16px]" />
                <span className="font-bold">Today, 22 Oct 2026</span>
              </div>
              <span className="text-[#707881]">• Live</span>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'all'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
              }`}
            >
              <span>All Receipts (27)</span>
            </button>
            <button
              onClick={() => setActiveTab('pos')}
              className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'pos'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
              }`}
            >
              <span>POS Card (19)</span>
            </button>
            <button
              onClick={() => setActiveTab('transfer')}
              className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'transfer'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
              }`}
            >
              <span>Transfers (7)</span>
            </button>
            <button
              onClick={() => setActiveTab('hmo')}
              className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
                activeTab === 'hmo'
                  ? 'bg-[#006194] text-white shadow-sm'
                  : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
              }`}
            >
              <span>HMO Direct (1)</span>
            </button>
          </div>
        </div>

        {/* Receipts Feed Stream */}
        <div className="space-y-4">
          {filteredReceipts.map((rec) => (
            <div
              key={rec.id}
              className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e] tracking-tight">
                      #{rec.receiptNumber}
                    </span>
                    {rec.badge && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[11px] font-bold uppercase">
                        {rec.badge}
                      </span>
                    )}
                    {rec.isAudited && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#eaedff] text-[#3f4850] text-[11px] font-semibold flex items-center gap-1">
                        <Icon name="lock" className="text-[13px]" />
                        Audited &amp; Locked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#707881] mt-0.5">
                    Inv #{rec.invoiceNumber} • {rec.time}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0">
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-bold text-[#006194] tracking-tight">
                    ₦{rec.amount.toLocaleString()}
                    <span className="text-xs font-normal text-[#707881]">.00</span>
                  </p>
                  <div className="flex items-center sm:justify-end gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                    <span className="text-xs font-bold text-[#006a61]">Settled &amp; Reconciled</span>
                  </div>
                </div>
              </div>

              {/* Patient & Metadata Zone */}
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <Icon name="person" className="text-[#006194] text-[18px]" />
                    <span className="font-semibold text-xs md:text-sm text-[#131b2e] truncate">
                      {rec.patientName}
                    </span>
                    <span className="text-xs text-[#707881]">({rec.demographics})</span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#3f4850] bg-[#dae2fd] px-2 py-0.5 rounded">
                    {rec.lifeCode}
                  </span>
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex flex-wrap items-center justify-between text-xs text-[#3f4850] gap-2">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <Icon name="credit_card" className="text-[15px] text-[#707881]" />
                    <span className="truncate">{rec.methodLabel}</span>
                  </div>
                  <span className="text-[#707881]">Recorded by: {rec.officer}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={() => setActiveReceipt(rec)}
                  className="h-10 px-4 rounded-xl bg-[#e2e7ff] text-[#006194] text-xs font-bold flex items-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
                >
                  <Icon name="visibility" className="text-[16px]" />
                  <span>View Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => showToast(`Printing official PDF for receipt #${rec.receiptNumber}...`)}
                  className="h-10 px-4 rounded-xl bg-[#006194] text-white text-xs font-bold flex items-center gap-1.5 hover:bg-[#007bb9] transition-colors shadow-sm"
                >
                  <Icon name="print" className="text-[16px]" />
                  <span>Print (PDF)</span>
                </button>
              </div>
            </div>
          ))}

          {filteredReceipts.length === 0 && (
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-12 text-center flex flex-col items-center justify-center">
              <Icon name="search_off" className="text-[36px] text-[#707881] mb-2" />
              <h3 className="font-bold text-base text-[#131b2e]">No Receipts Found</h3>
              <p className="text-xs text-[#707881] mt-1">Try resetting your filter or searching for another keyword.</p>
            </div>
          )}
        </div>

        {/* Operational Actions Drawer Footer */}
        <div className="pt-2 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => showToast('Exporting complete receipts ledger (CSV/Excel)...')}
              className="h-12 rounded-xl bg-white border border-[#dae2fd] text-[#006194] font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#f2f3ff] transition-colors shadow-sm"
            >
              <Icon name="download" className="text-[18px]" />
              <span>Export Receipts Ledger</span>
            </button>
            <button
              onClick={() => showToast('All 3 POS terminals reconciled successfully with zero variance.')}
              className="h-12 rounded-xl bg-[#86f2e4] text-[#006f66] font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm"
            >
              <Icon name="sync_saved_locally" className="text-[18px]" />
              <span>Reconcile Terminals</span>
            </button>
          </div>
          <p className="text-center text-[11px] text-[#707881]">
            Bank Reconciliation Standard: ISO-20022 compliant • Tamper-proof audit trail active
          </p>
        </div>
      </main>

      {/* Modal: Electronic Receipt Viewer with SHA-256 Stamp */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#dae2fd] space-y-5 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#dae2fd] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                  <Icon name="dentistry" className="text-[22px]" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                    BrightSmile Dental Clinics
                  </h3>
                  <p className="text-xs text-[#707881]">Official Electronic Payment Confirmation</p>
                </div>
              </div>
              <button
                onClick={() => setActiveReceipt(null)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </div>

            {/* Amount Box */}
            <div className="bg-[#f2f3ff] rounded-2xl p-5 text-center space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-[#707881]">
                Total Amount Received
              </span>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl font-bold text-[#006194]">
                ₦{activeReceipt.amount.toLocaleString()}.00
              </h1>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#86f2e4]/30 rounded-full text-[#006f66] text-xs font-bold">
                <Icon name="check_circle" className="text-[14px]" />
                <span>Payment Verified &amp; Settled</span>
              </div>
            </div>

            {/* Cryptographic Stamp */}
            <div className="bg-[#eaedff] rounded-xl p-3.5 flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#006a61] shrink-0 shadow-sm">
                <Icon name="shield" className="text-[24px]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase text-[#131b2e]">SHA-256 Validation Seal</p>
                <p className="font-mono text-[10px] text-[#707881] truncate mt-0.5">
                  8f14b301c29e76192d1948afbc294801ca849f2b3...
                </p>
                <p className="text-xs text-[#006a61] font-semibold mt-0.5">
                  Tamper-Proof Dental Ledger Certified
                </p>
              </div>
            </div>

            {/* Itemized Grid */}
            <div className="space-y-2 text-xs divide-y divide-[#dae2fd]/60">
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Receipt Identifier:</span>
                <span className="font-mono font-bold text-[#131b2e]">#{activeReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Associated Invoice:</span>
                <span className="font-mono font-bold text-[#006194]">#{activeReceipt.invoiceNumber}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Patient Name:</span>
                <span className="font-bold text-[#131b2e]">{activeReceipt.patientName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">LifeCode ID:</span>
                <span className="font-mono text-[#131b2e]">{activeReceipt.lifeCode}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Payment Method:</span>
                <span className="font-medium text-[#131b2e] text-right truncate max-w-[200px]">
                  {activeReceipt.methodLabel}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Recorded Timestamp:</span>
                <span className="text-[#131b2e]">{activeReceipt.time}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-[#707881]">Cashier / Clinician:</span>
                <span className="font-medium text-[#131b2e]">{activeReceipt.officer}</span>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => showToast(`Share link copied for ${activeReceipt.receiptNumber}`)}
                className="flex-1 h-11 rounded-xl border border-[#dae2fd] text-[#006194] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#f2f3ff]"
              >
                <Icon name="share" className="text-[16px]" />
                <span>Share</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  showToast(`Printed ${activeReceipt.receiptNumber}`);
                  setActiveReceipt(null);
                }}
                className="flex-1 h-11 rounded-xl bg-[#006194] text-white text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#007bb9] shadow-sm"
              >
                <Icon name="print" className="text-[16px]" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
