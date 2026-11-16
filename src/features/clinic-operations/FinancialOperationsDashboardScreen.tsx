import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { QuickLinks } from '../../design/QuickLinks';

interface PaymentRecord {
  id: string;
  patientName: string;
  time: string;
  method: 'POS Card' | 'Transfer';
  amount: string;
  invoice: string;
  service: string;
  status: 'Settled' | 'Pending';
}

export const FinancialOperationsDashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  // State
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isGroupView, setIsGroupView] = useState(false);
  const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);
  const [isInvoicesModalOpen, setIsInvoicesModalOpen] = useState(false);

  // New Payment Form
  const [patientName, setPatientName] = useState('Amara Okafor');
  const [paymentAmount, setPaymentAmount] = useState('18,500');
  const [paymentMethod, setPaymentMethod] = useState<'POS Card' | 'Transfer'>('POS Card');
  const [serviceDescription, setServiceDescription] = useState('Tooth #16 Restoration Co-Pay');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const [records, setRecords] = useState<PaymentRecord[]>([
    {
      id: 'REC-88402',
      patientName: 'Amara Okafor',
      time: '08:52 AM',
      method: 'POS Card',
      amount: '₦9,000',
      invoice: 'Inv #INV-2026-441',
      service: 'Class II MO Composite Co-Pay',
      status: 'Settled',
    },
    {
      id: 'REC-88401',
      patientName: 'Ngozi Eze',
      time: '08:35 AM',
      method: 'Transfer',
      amount: '₦35,000',
      invoice: 'Inv #INV-2026-439',
      service: 'Routine Prophylaxis & Scaling',
      status: 'Settled',
    },
    {
      id: 'REC-88400',
      patientName: 'Chinedu Eze',
      time: '09:35 AM',
      method: 'POS Card',
      amount: '₦15,000',
      invoice: 'Inv #INV-2026-438',
      service: 'Walk-in Triage & Radiograph',
      status: 'Settled',
    },
    {
      id: 'REC-88399',
      patientName: 'Tunde Bakare',
      time: 'Yesterday',
      method: 'Transfer',
      amount: '₦120,000',
      invoice: 'Inv #INV-2026-435',
      service: 'Molar Crown Deposit',
      status: 'Settled',
    },
  ]);

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: PaymentRecord = {
      id: `REC-${Math.floor(88403 + Math.random() * 50)}`,
      patientName,
      time: 'Just now',
      method: paymentMethod,
      amount: `₦${paymentAmount}`,
      invoice: `Inv #INV-2026-${Math.floor(442 + Math.random() * 20)}`,
      service: serviceDescription,
      status: 'Settled',
    };
    setRecords([newRecord, ...records]);
    setIsRecordModalOpen(false);
    showToast(`Payment of ₦${paymentAmount} from ${patientName} recorded successfully!`);
  };

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

      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-[#faf8ff]/90 backdrop-blur-md border-b border-[#dae2fd]/40">
        <div className="max-w-7xl mx-auto h-16 px-4 md:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <button
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center -ml-2 rounded-full text-[#131b2e] hover:bg-[#e2e7ff] active:bg-[#dae2fd] transition-colors"
              aria-label="Back"
            >
              <Icon name="arrow_back" className="text-[22px]" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#006194]">Clinic Operations</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Financial Operations Dashboard
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Generating Daily EOD Financial Audit PDF...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>EOD Report</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="payments" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Top Context & Branch Switcher Banner */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
              <Icon name="account_balance" className="text-[22px]" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#707881] block">
                Branch Operations
              </span>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                {isGroupView ? 'Group Multi-Branch Financial View' : 'Wuse 2 Main Branch Dispensary'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIsGroupView(!isGroupView);
                showToast(isGroupView ? 'Viewing single branch (Wuse 2)' : 'Aggregated Group Financial View active');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                isGroupView
                  ? 'bg-[#006194] text-white border-[#006194]'
                  : 'bg-[#f2f3ff] text-[#3f4850] border-[#dae2fd] hover:text-[#131b2e]'
              }`}
            >
              <Icon name="domain" className="text-[16px] text-[#006a61]" />
              <span>{isGroupView ? 'Group View Active' : 'Group View'}</span>
            </button>
          </div>
        </div>

        {/* Authorized Officer Scope Banner */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#006a61] shrink-0" />
            <div className="text-xs">
              <span className="text-[#707881] block">Authorized Auditors on Duty:</span>
              <span className="font-bold text-[#131b2e]">David Musa (Branch Mgr) • Esther John (Lead Cashier)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2f3ff] text-xs font-mono text-[#006194] self-start sm:self-auto border border-[#eaedff]">
            <Icon name="calendar_today" className="text-[14px]" />
            <span>22 Oct 2026 • Live Telemetry</span>
          </div>
        </div>

        {/* Quick Action Bar (2 Buttons) */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setIsRecordModalOpen(true)}
            className="flex items-center justify-center gap-2 h-13 bg-[#006194] text-white rounded-2xl hover:bg-[#007bb9] active:scale-[0.99] shadow-sm transition-all text-xs font-bold"
          >
            <Icon name="add_card" className="text-[20px]" />
            <span>Record Payment</span>
          </button>
          <button
            type="button"
            onClick={() => setIsInvoicesModalOpen(true)}
            className="flex items-center justify-center gap-2 h-13 bg-white border border-[#dae2fd] text-[#006194] rounded-2xl hover:bg-[#f2f3ff] active:scale-[0.99] shadow-sm transition-all text-xs font-bold"
          >
            <Icon name="receipt_long" className="text-[20px]" />
            <span>All Invoices</span>
          </button>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Primary Metrics, Weekly Trajectory, Payment Channels */}
          <div className="lg:col-span-7 space-y-6">
            {/* Primary Metric Hero Card (Today's Collections) */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-6 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#86f2e4]/20 pointer-events-none blur-2xl" />
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold text-[#707881] tracking-wider">
                  Today's Collections
                </span>
                <span className="inline-flex items-center gap-1 bg-[#86f2e4]/30 text-[#006f66] px-2.5 py-0.5 rounded-full text-xs font-bold">
                  <Icon name="trending_up" className="text-[14px]" />
                  +14% vs avg
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-3xl md:text-4xl font-bold text-[#131b2e]">
                  ₦840,000
                </span>
                <span className="text-xs font-bold text-[#006a61]">100% Settled</span>
              </div>
              <div className="w-full bg-[#eaedff] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006a61] h-full rounded-full w-full" />
              </div>
              <div className="flex items-center justify-between text-xs text-[#707881] pt-1">
                <span>Zero Desk Arrears</span>
                <span className="text-[#131b2e] font-semibold">{records.length + 22} Transactions Total</span>
              </div>
            </div>

            {/* MTD Target Card with Progress Bar */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="query_stats" className="text-[#006194] text-[20px]" />
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    Month-to-Date (Q4 Target)
                  </span>
                </div>
                <span className="text-xs font-bold text-[#006194] bg-[#cce5ff] px-2 py-0.5 rounded-md">76.8%</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">
                  ₦18,450,000
                </span>
                <span className="font-mono text-xs text-[#707881]">Target: ₦24,000,000</span>
              </div>
              <div className="w-full bg-[#eaedff] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full transition-all duration-500" style={{ width: '76.8%' }} />
              </div>
              <p className="text-xs text-[#707881]">
                ₦5,550,000 needed in next 9 days to reach branch quarterly revenue objective.
              </p>
            </div>

            {/* 4 Secondary Operational KPI Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="uppercase">Patient Dues</span>
                  <Icon name="pending_actions" className="text-[#ba1a1a] text-[16px]" />
                </div>
                <div className="my-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
                    ₦185,000
                  </span>
                </div>
                <span className="text-[11px] text-[#707881]">4 pending co-pays</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="uppercase">Quotes Pipeline</span>
                  <Icon name="approval" className="text-[#006a61] text-[16px]" />
                </div>
                <div className="my-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
                    ₦1,850,000
                  </span>
                </div>
                <span className="text-[11px] text-[#707881]">9 plans ready</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="uppercase">Unbilled</span>
                  <Icon name="hourglass_empty" className="text-[#707881] text-[16px]" />
                </div>
                <div className="my-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
                    ₦420,000
                  </span>
                </div>
                <span className="text-[11px] text-[#707881]">6 draft invoices</span>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
                <div className="flex items-center justify-between text-xs text-[#707881]">
                  <span className="uppercase">MTD Adjustments</span>
                  <Icon name="replay" className="text-[#707881] text-[16px]" />
                </div>
                <div className="my-2">
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">₦35,000</span>
                </div>
                <span className="text-[11px] text-[#707881]">1 claim settlement</span>
              </div>
            </div>

            {/* 7-Day Revenue Trend Chart */}
            <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    7-Day Weekly Trajectory
                  </h3>
                  <span className="text-xs text-[#707881]">Mon 19 Oct - Sat 24 Oct</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1.5 text-[#3f4850]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194]" /> Actual
                  </span>
                  <span className="flex items-center gap-1.5 text-[#707881]">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#bfc7d2]" /> Projected
                  </span>
                </div>
              </div>

              {/* Trend Sparkline/Bars */}
              <div className="grid grid-cols-6 gap-2 items-end h-32 w-full pt-4">
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#707881]">₦780k</span>
                  <div className="w-full bg-[#006194]/70 rounded-t-md" style={{ height: '70%' }} />
                  <span className="text-xs text-[#707881]">Mon</span>
                </div>
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#707881]">₦920k</span>
                  <div className="w-full bg-[#006194]/70 rounded-t-md" style={{ height: '88%' }} />
                  <span className="text-xs text-[#707881]">Tue</span>
                </div>
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#707881]">₦810k</span>
                  <div className="w-full bg-[#006194]/70 rounded-t-md" style={{ height: '74%' }} />
                  <span className="text-xs text-[#707881]">Wed</span>
                </div>
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono font-bold text-[#006194]">₦840k</span>
                  <div className="w-full bg-[#006194] rounded-t-md shadow-sm" style={{ height: '78%' }} />
                  <span className="text-xs font-bold text-[#006194]">Thu (Today)</span>
                </div>
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#707881]">₦950k</span>
                  <div className="w-full bg-[#eaedff] rounded-t-md border-dashed border border-[#bfc7d2]" style={{ height: '92%' }} />
                  <span className="text-xs text-[#707881]">Fri</span>
                </div>
                <div className="flex flex-col items-center gap-1 h-full justify-end">
                  <span className="text-[10px] font-mono text-[#707881]">₦650k</span>
                  <div className="w-full bg-[#eaedff] rounded-t-md" style={{ height: '56%' }} />
                  <span className="text-xs text-[#707881]">Sat</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Channels, Activity Ledger, Privacy Notice */}
          <div className="lg:col-span-5 space-y-6">
            {/* Today's Payment Channels */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                  Payment Channels Breakdown
                </h3>
                <span className="inline-flex items-center gap-1 text-xs text-[#006a61] font-semibold">
                  <Icon name="verified" className="text-[15px]" />
                  100% Cashless
                </span>
              </div>

              <div className="space-y-3">
                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between border border-[#eaedff]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#006194] shadow-xs">
                      <Icon name="point_of_sale" className="text-[18px]" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#131b2e] block">POS Card Terminals</span>
                      <span className="text-[11px] text-[#707881]">19 settled transactions</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-[#131b2e] block">₦540,000</span>
                    <span className="text-[11px] text-[#707881]">64.3%</span>
                  </div>
                </div>

                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between border border-[#eaedff]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#006a61] shadow-xs">
                      <Icon name="account_balance_wallet" className="text-[18px]" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#131b2e] block">Instant Bank Transfers</span>
                      <span className="text-[11px] text-[#707881]">7 verified receipts</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-[#131b2e] block">₦300,000</span>
                    <span className="text-[11px] text-[#707881]">35.7%</span>
                  </div>
                </div>

                <div className="bg-[#f2f3ff] p-3 rounded-xl flex items-center justify-between border border-[#eaedff] opacity-80">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#707881] shadow-xs">
                      <Icon name="payments" className="text-[18px]" />
                    </div>
                    <div>
                      <span className="font-bold text-xs text-[#131b2e] block">Cash at Front Desk</span>
                      <span className="text-[11px] text-[#707881]">DHA Mandate Compliant</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-xs text-[#131b2e] block">₦0</span>
                    <span className="text-[11px] text-[#006a61] font-semibold">Audit Clear</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Payment Ledger */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-[#006194]">
                  <Icon name="history_edu" className="text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-sm font-bold text-[#131b2e]">
                    Live Payment Activity Ledger
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInvoicesModalOpen(true)}
                  className="text-xs text-[#006194] font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="space-y-3">
                {records.map((rec) => (
                  <div key={rec.id} className="bg-[#f2f3ff] p-3 rounded-xl border border-[#eaedff] space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#006194]">{rec.id}</span>
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                            rec.method === 'Transfer'
                              ? 'bg-[#86f2e4]/40 text-[#006f66]'
                              : 'bg-[#cce5ff] text-[#001d31]'
                          }`}
                        >
                          {rec.method}
                        </span>
                      </div>
                      <span className="font-bold text-sm text-[#131b2e]">{rec.amount}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#131b2e]">{rec.patientName}</span>
                      <span className="text-[#707881]">{rec.time}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#707881] pt-0.5 border-t border-[#dae2fd]/50">
                      <span>{rec.service}</span>
                      <span className="text-[#006a61] font-bold">{rec.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Statutory Separation & Privacy Notice */}
            <div className="p-4 rounded-xl bg-[#eaedff]/60 border border-[#dae2fd] flex items-start gap-3">
              <Icon name="shield" className="text-[20px] text-[#707881] shrink-0 mt-0.5" />
              <div className="text-xs text-[#3f4850] space-y-1">
                <span className="font-bold text-[#131b2e] block">Data Isolation Protocol</span>
                <p className="leading-relaxed">
                  Financial records and settlement ledgers are strictly decoupled from patient clinical dental records and
                  confidential treatment histories under DHA regulatory requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Record Payment Modal */}
      {isRecordModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up">
            <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
              Record Patient Payment
            </h3>
            <form onSubmit={handleRecordPayment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Patient Name</label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Amount (₦)</label>
                <input
                  type="text"
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  className="w-full text-xs font-mono p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Payment Channel</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {(['POS Card', 'Transfer'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPaymentMethod(m)}
                      className={`py-2 rounded-xl border font-bold ${
                        paymentMethod === m
                          ? 'bg-[#006194] text-white border-[#006194]'
                          : 'bg-[#f2f3ff] text-[#131b2e] border-[#dae2fd]'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#3f4850] mb-1">Treatment / Procedure Description</label>
                <input
                  type="text"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsRecordModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#006194] hover:bg-[#007bb9] shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-[16px]" />
                  <span>Confirm Receipt</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Invoices Modal */}
      {isInvoicesModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#dae2fd] space-y-4 animate-scale-up max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                All Generated Invoices
              </h3>
              <button
                type="button"
                onClick={() => setIsInvoicesModalOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#f2f3ff] text-[#707881]"
              >
                <Icon name="close" className="text-[18px]" />
              </button>
            </div>
            <div className="space-y-3">
              {[
                { id: 'INV-2026-441', pt: 'Amara Okafor', amt: '₦9,000', status: 'Settled', date: 'Today' },
                { id: 'INV-2026-439', pt: 'Ngozi Eze', amt: '₦35,000', status: 'Settled', date: 'Today' },
                { id: 'INV-2026-438', pt: 'Chinedu Eze', amt: '₦15,000', status: 'Settled', date: 'Today' },
                { id: 'INV-2026-437', pt: 'Fatima Aliyu', amt: '₦65,000', status: 'Pending', date: '21 Oct' },
                { id: 'INV-2026-435', pt: 'Tunde Bakare', amt: '₦120,000', status: 'Settled', date: '20 Oct' },
              ].map((inv) => (
                <div key={inv.id} className="p-3 bg-[#f2f3ff] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <span className="font-mono font-bold text-[#006194]">{inv.id}</span>
                    <p className="font-semibold text-[#131b2e]">{inv.pt}</p>
                    <span className="text-[10px] text-[#707881]">{inv.date}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-[#131b2e] block">{inv.amt}</span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        inv.status === 'Settled'
                          ? 'bg-[#86f2e4]/40 text-[#006f66]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <QuickLinks
        title="Finance"
        links={[
          { to: '/clinic-operations/billing-invoices', label: 'Billing & Invoices', icon: 'receipt_long' },
          { to: '/clinic-operations/payment-history', label: 'Payment History', icon: 'history' },
          { to: '/clinic-operations/refund-adjustments', label: 'Refunds & Adjustments', icon: 'replay' },
          { to: '/clinic-operations/financial-reports', label: 'Financial Reports', icon: 'picture_as_pdf' },
        ]}
      />
    </div>
  );
};
