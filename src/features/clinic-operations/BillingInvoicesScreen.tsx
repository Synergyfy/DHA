import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

type InvoiceStatus = 'all' | 'paid' | 'partially-paid' | 'unpaid' | 'draft';

interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  time: string;
  patientName: string;
  demographics: string;
  lifeCode: string;
  status: 'paid' | 'partially-paid' | 'unpaid' | 'draft';
  statusLabel: string;
  procedureTitle: string;
  totalAmount: number;
  breakdown: string;
  secondaryNote: string;
  balanceDue: number;
  insurancePayer?: string;
  copayAmount?: number;
  coveragePercent?: number;
}

export const BillingInvoicesScreen: React.FC = () => {
  const navigate = useNavigate();

  // Filters & State
  const [currentFilter, setCurrentFilter] = useState<InvoiceStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('Wuse 2 Main Clinic');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);

  // New Invoice Form state
  const [newPatientName, setNewPatientName] = useState('');
  const [newLifeCode, setNewLifeCode] = useState('');
  const [newProcedure, setNewProcedure] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const initialInvoices: InvoiceItem[] = [
    {
      id: 'inv-1',
      invoiceNumber: 'INV-2026-441',
      time: '08:50 AM',
      patientName: 'Amara Okafor',
      demographics: '34y F',
      lifeCode: 'AE-990-281-DXB',
      status: 'paid',
      statusLabel: 'PAID',
      procedureTitle: 'Class II Direct Composite Restoration (#16) & Bitewing X-Ray',
      totalAmount: 45000,
      breakdown: 'MetLife DHA (80%): ₦36,000 • Co-pay POS: ₦9,000',
      secondaryNote: 'Auto-Reconciled at POS',
      balanceDue: 0,
      insurancePayer: 'MetLife DHA Comprehensive',
      copayAmount: 9000,
      coveragePercent: 80,
    },
    {
      id: 'inv-2',
      invoiceNumber: 'INV-2026-442',
      time: '09:40 AM',
      patientName: 'Yusuf Abubakar',
      demographics: '38y M',
      lifeCode: 'NG-ABJ-112-909',
      status: 'partially-paid',
      statusLabel: 'PARTIALLY PAID',
      procedureTitle: 'Multi-Stage Porcelain Fused to Zirconia Crown Prep (#14)',
      totalAmount: 150000,
      breakdown: 'Lab Deposit Received (50%): ₦75,000',
      secondaryNote: 'Pending Final Crown Delivery',
      balanceDue: 75000,
    },
    {
      id: 'inv-3',
      invoiceNumber: 'INV-2026-443',
      time: '10:15 AM',
      patientName: 'Fatima Garba',
      demographics: '29y F',
      lifeCode: 'NG-ABJ-771-402',
      status: 'unpaid',
      statusLabel: 'UNPAID',
      procedureTitle: 'Emergency Acute Pulpitis Triage, Local Anesthetic & Periapical X-Ray',
      totalAmount: 35000,
      breakdown: 'Self-Pay (Awaiting Front-Desk Settlement)',
      secondaryNote: 'Patient in Recovery Room 01',
      balanceDue: 35000,
    },
    {
      id: 'inv-4',
      invoiceNumber: 'INV-2026-440',
      time: '08:15 AM',
      patientName: 'Ngozi Eze',
      demographics: '26y F',
      lifeCode: 'NG-ABJ-339-182',
      status: 'paid',
      statusLabel: 'PAID',
      procedureTitle: 'Full Mouth Ultrasonic Scaling & Dental Prophylaxis',
      totalAmount: 35000,
      breakdown: 'Bupa Global Direct Settlement: ₦35,000 (100%)',
      secondaryNote: 'Auto-Reconciled Claims Batch #881',
      balanceDue: 0,
      insurancePayer: 'Bupa Global',
      copayAmount: 0,
      coveragePercent: 100,
    },
    {
      id: 'inv-5',
      invoiceNumber: 'INV-2026-438',
      time: 'Operatory 02',
      patientName: 'Ibrahim Waziri',
      demographics: '42y M',
      lifeCode: 'NG-ABJ-882-104',
      status: 'draft',
      statusLabel: 'DRAFT',
      procedureTitle: 'Clear Aligner Series Tray Replacement (#08/18)',
      totalAmount: 65000,
      breakdown: 'Staged in Operatory 02 by Dr. Bello',
      secondaryNote: 'Awaiting Clinician Lock',
      balanceDue: 65000,
    },
  ];

  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);

  // Filtered list
  const filteredInvoices = useMemo(() => {
    return invoices.filter((item) => {
      const matchesFilter = currentFilter === 'all' || item.status === currentFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.invoiceNumber.toLowerCase().includes(q) ||
        item.patientName.toLowerCase().includes(q) ||
        item.lifeCode.toLowerCase().includes(q) ||
        item.procedureTitle.toLowerCase().includes(q);
      return matchesFilter && matchesSearch;
    });
  }, [invoices, currentFilter, searchQuery]);

  // Handle New Invoice Submit
  const handleCreateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName.trim() || !newAmount.trim()) {
      showToast('Please provide patient name and amount.');
      return;
    }
    const numAmount = parseFloat(newAmount.replace(/,/g, '')) || 0;
    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-${Math.floor(444 + Math.random() * 50)}`,
      time: 'Just now',
      patientName: newPatientName,
      demographics: 'Adult',
      lifeCode: newLifeCode || 'NG-NEW-000-000',
      status: 'unpaid',
      statusLabel: 'UNPAID',
      procedureTitle: newProcedure || 'Dental Diagnostic & Treatment Consultation',
      totalAmount: numAmount,
      breakdown: 'Pending Counter Settlement',
      secondaryNote: 'Generated at Front Desk',
      balanceDue: numAmount,
    };
    setInvoices([newInv, ...invoices]);
    setIsNewInvoiceModalOpen(false);
    setNewPatientName('');
    setNewLifeCode('');
    setNewProcedure('');
    setNewAmount('');
    showToast(`Invoice ${newInv.invoiceNumber} created successfully!`);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Clinic Operations</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Billing &amp; Invoices
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Exporting Billing Ledger CSV/PDF...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="ios_share" className="text-[16px]" />
              <span>Export</span>
            </button>
            <button
              onClick={() => setIsNewInvoiceModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#006194] text-white text-xs font-semibold hover:bg-[#007bb9] transition-colors shadow-sm"
            >
              <Icon name="add" className="text-[16px]" />
              <span>New Invoice</span>
            </button>
            <button
              aria-label="Notifications"
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#3f4850] hover:text-[#131b2e] hover:bg-[#e2e7ff] transition-colors relative"
              onClick={() => showToast('All billing transactions synced.')}
            >
              <Icon name="notifications" className="text-[20px]" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-5 space-y-6">
        {/* Top Branch Context Strip & Quick Scope */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#e2e7ff] flex items-center justify-center text-[#006194] shrink-0">
              <Icon name="domain" className="text-[20px]" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider block">Dental Branch</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedBranch}
                  onChange={(e) => {
                    setSelectedBranch(e.target.value);
                    showToast(`Switched active branch to ${e.target.value}`);
                  }}
                  className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] bg-transparent border-none focus:outline-none cursor-pointer p-0 pr-4"
                >
                  <option value="Wuse 2 Main Clinic">Wuse 2 Main Clinic (HQ #001)</option>
                  <option value="Garki Clinic">Garki Clinic Branch</option>
                  <option value="Maitama VIP Suite">Maitama VIP Dental Suite</option>
                  <option value="All Branches">All Branches (Consolidated)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              onClick={() => showToast('Live billing stream refreshed.')}
              className="h-8 px-3 rounded-lg bg-[#f2f3ff] text-[#3f4850] text-xs font-semibold flex items-center gap-1.5 hover:bg-[#e2e7ff] transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
              <Icon name="sync" className="text-[14px]" />
              <span>Live Ledger</span>
            </button>
            <button
              onClick={() => showToast('Branch Fiscal Settings: VAT Exempt, Strict Decoupled Clinical Governance')}
              className="h-8 px-2.5 rounded-lg bg-[#f2f3ff] text-[#3f4850] hover:bg-[#e2e7ff] transition-colors"
              title="Branch Fiscal Settings"
            >
              <Icon name="tune" className="text-[16px]" />
            </button>
          </div>
        </div>

        {/* Key Daily Metric Strip (Responsive 4-Col Grid) */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#707881]">
              Today's Invoicing Ledger (22 Oct 2026)
            </span>
            <span className="text-xs font-bold text-[#006194]">8 Encounters Total</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Metric: Total Invoiced */}
            <div className="bg-white p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#707881]">Total Invoiced</span>
                <div className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#006194]">
                  <Icon name="receipt_long" className="text-[16px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">₦1,025,000</div>
                <p className="text-xs text-[#707881] mt-0.5">8 billable clinic visits</p>
              </div>
            </div>

            {/* Metric: Settled / Paid */}
            <div className="bg-[#86f2e4]/15 p-5 rounded-2xl border border-[#86f2e4]/40 shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#006f66]">Settled / Paid</span>
                <div className="w-8 h-8 rounded-full bg-[#86f2e4] flex items-center justify-center text-[#006f66]">
                  <Icon name="check_circle" className="text-[16px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">₦840,000</div>
                <p className="text-xs text-[#006a61] font-medium mt-0.5">82.0% realization rate</p>
              </div>
            </div>

            {/* Metric: Outstanding / Unpaid */}
            <div className="bg-[#ffdad6]/35 p-5 rounded-2xl border border-[#ffdad6] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#ba1a1a]">Outstanding Due</span>
                <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <Icon name="pending_actions" className="text-[16px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#ba1a1a]">₦185,000</div>
                <p className="text-xs text-[#ba1a1a]/80 font-medium mt-0.5">4 open patient balances</p>
              </div>
            </div>

            {/* Metric: Drafts */}
            <div className="bg-[#eaedff] p-5 rounded-2xl border border-[#dae2fd] shadow-sm flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[#707881]">Drafts</span>
                <div className="w-8 h-8 rounded-full bg-[#dae2fd] flex items-center justify-center text-[#3f4850]">
                  <Icon name="edit_note" className="text-[16px]" />
                </div>
              </div>
              <div className="mt-3">
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl font-bold text-[#131b2e]">₦75,000</div>
                <p className="text-xs text-[#707881] mt-0.5">2 staged in chairside</p>
              </div>
            </div>
          </div>
        </section>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="relative flex-1">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#707881] text-[18px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Invoice #, Patient, LifeCode, Procedure..."
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-white text-[#131b2e] text-sm border border-[#dae2fd] focus:outline-none focus:ring-2 focus:ring-[#006194]/20 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            )}
          </div>

          <button
            onClick={() => showToast('Filtered date: 22 Oct 2026 (Today)')}
            className="h-11 px-4 rounded-xl bg-white border border-[#dae2fd] text-[#131b2e] shadow-sm flex items-center justify-center gap-2 hover:bg-[#f2f3ff] transition-colors"
          >
            <Icon name="calendar_month" className="text-[18px] text-[#006194]" />
            <span className="text-xs font-semibold">Today, 22 Oct 2026</span>
          </button>
        </div>

        {/* Segmented Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setCurrentFilter('all')}
            className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
              currentFilter === 'all'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
            }`}
          >
            <span>All Invoices</span>
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${currentFilter === 'all' ? 'bg-white/20 text-white' : 'bg-[#e2e7ff] text-[#006194]'}`}>
              {invoices.length}
            </span>
          </button>

          <button
            onClick={() => setCurrentFilter('paid')}
            className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
              currentFilter === 'paid'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
            }`}
          >
            <span>Paid</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#86f2e4] text-[#006f66] text-[10px]">
              {invoices.filter((i) => i.status === 'paid').length}
            </span>
          </button>

          <button
            onClick={() => setCurrentFilter('partially-paid')}
            className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
              currentFilter === 'partially-paid'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
            }`}
          >
            <span>Partially Paid</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#e2e7ff] text-[#131b2e] text-[10px]">
              {invoices.filter((i) => i.status === 'partially-paid').length}
            </span>
          </button>

          <button
            onClick={() => setCurrentFilter('unpaid')}
            className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
              currentFilter === 'unpaid'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
            }`}
          >
            <span>Unpaid</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] text-[10px]">
              {invoices.filter((i) => i.status === 'unpaid').length}
            </span>
          </button>

          <button
            onClick={() => setCurrentFilter('draft')}
            className={`h-9 px-4 rounded-full flex items-center gap-2 transition-all shrink-0 ${
              currentFilter === 'draft'
                ? 'bg-[#006194] text-white shadow-sm'
                : 'bg-white text-[#3f4850] border border-[#dae2fd] hover:bg-[#f2f3ff]'
            }`}
          >
            <span>Draft</span>
            <span className="px-1.5 py-0.5 rounded-full bg-[#eaedff] text-[#707881] text-[10px]">
              {invoices.filter((i) => i.status === 'draft').length}
            </span>
          </button>
        </div>

        {/* Invoices List / Stream */}
        <div className="space-y-4">
          {filteredInvoices.map((inv) => (
            <div
              key={inv.id}
              className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4"
            >
              {/* Header: ID, Patient, Status */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm text-[#006194] tracking-tight">
                      #{inv.invoiceNumber}
                    </span>
                    <span className="text-xs text-[#707881]">• {inv.time}</span>
                  </div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base md:text-lg text-[#131b2e] mt-0.5">
                    {inv.patientName}
                  </h3>
                  <p className="text-xs text-[#707881]">
                    {inv.demographics} • LifeCode: <span className="font-mono text-[#131b2e]">{inv.lifeCode}</span>
                  </p>
                </div>

                {/* Status Badges */}
                <div className="shrink-0 self-start">
                  {inv.status === 'paid' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold">
                      <Icon name="check_circle" className="text-[14px]" />
                      PAID
                    </span>
                  )}
                  {inv.status === 'partially-paid' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e2e7ff] text-[#006194] text-xs font-bold">
                      <Icon name="pie_chart" className="text-[14px]" />
                      PARTIALLY PAID
                    </span>
                  )}
                  {inv.status === 'unpaid' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffdad6] text-[#93000a] text-xs font-bold">
                      <Icon name="error" className="text-[14px]" />
                      UNPAID
                    </span>
                  )}
                  {inv.status === 'draft' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#eaedff] text-[#707881] text-xs font-bold">
                      <Icon name="draft" className="text-[14px]" />
                      DRAFT
                    </span>
                  )}
                </div>
              </div>

              {/* Procedure & Financial Breakdown */}
              <div className="bg-[#f2f3ff] rounded-xl p-3.5 flex flex-col gap-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-sm font-semibold text-[#131b2e]">{inv.procedureTitle}</span>
                  <span className="text-sm font-bold text-[#006194]">₦{inv.totalAmount.toLocaleString()}</span>
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex flex-wrap items-center justify-between text-xs text-[#3f4850] gap-2">
                  <span className="flex items-center gap-1.5 font-medium">
                    <Icon name="verified" className="text-[14px] text-[#006a61]" />
                    {inv.breakdown}
                  </span>
                  <span className="text-[#707881] italic">{inv.secondaryNote}</span>
                </div>
              </div>

              {/* Bottom Ledger Balancing & Action Triggers */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#707881]">
                    {inv.status === 'paid' ? 'Balance Due:' : 'Outstanding Balance:'}
                  </span>
                  <span
                    className={`font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base ${
                      inv.balanceDue === 0 ? 'text-[#006a61]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    ₦{inv.balanceDue.toLocaleString()}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {inv.status === 'paid' && (
                    <>
                      <button
                        onClick={() => showToast(`Receipt #REC-88402 generated for ${inv.patientName}`)}
                        className="h-9 px-3 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Icon name="print" className="text-[15px] text-[#707881]" />
                        <span>Receipt</span>
                      </button>
                      <button
                        onClick={() => navigate('/clinic-operations/invoice-details')}
                        className="h-9 px-4 rounded-lg bg-[#006194] text-white text-xs font-semibold flex items-center gap-1 hover:bg-[#007bb9] transition-colors shadow-sm"
                      >
                        <span>View Details (16.32)</span>
                        <Icon name="chevron_right" className="text-[16px]" />
                      </button>
                    </>
                  )}

                  {inv.status === 'partially-paid' && (
                    <>
                      <button
                        onClick={() => navigate('/clinic-operations/invoice-details')}
                        className="h-9 px-3 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => navigate('/clinic-operations/payment-recording')}
                        className="h-9 px-4 rounded-lg bg-[#006194] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#007bb9] transition-colors shadow-sm"
                      >
                        <Icon name="price_check" className="text-[16px]" />
                        <span>Record Balance (16.33)</span>
                      </button>
                    </>
                  )}

                  {inv.status === 'unpaid' && (
                    <>
                      <button
                        onClick={() => navigate('/clinic-operations/invoice-details')}
                        className="h-9 px-3 rounded-lg bg-[#f2f3ff] hover:bg-[#e2e7ff] text-[#131b2e] text-xs font-semibold transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => navigate('/clinic-operations/payment-recording')}
                        className="h-9 px-4 rounded-lg bg-[#006a61] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#006f66] transition-colors shadow-sm"
                      >
                        <Icon name="point_of_sale" className="text-[16px]" />
                        <span>Collect Payment</span>
                      </button>
                    </>
                  )}

                  {inv.status === 'draft' && (
                    <>
                      <button
                        onClick={() => {
                          setInvoices(invoices.filter((i) => i.id !== inv.id));
                          showToast(`Draft invoice #${inv.invoiceNumber} deleted.`);
                        }}
                        className="h-9 px-3 rounded-lg bg-[#ffdad6]/50 text-[#ba1a1a] hover:bg-[#ffdad6] text-xs font-semibold flex items-center gap-1 transition-colors"
                        title="Delete Draft"
                      >
                        <Icon name="delete" className="text-[15px]" />
                      </button>
                      <button
                        onClick={() => {
                          setInvoices(
                            invoices.map((i) =>
                              i.id === inv.id ? { ...i, status: 'unpaid', statusLabel: 'UNPAID' } : i
                            )
                          );
                          showToast(`Invoice #${inv.invoiceNumber} locked and billed.`);
                        }}
                        className="h-9 px-4 rounded-lg bg-[#006194] text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#007bb9] transition-colors shadow-sm"
                      >
                        <Icon name="edit" className="text-[15px]" />
                        <span>Finalize Bill</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredInvoices.length === 0 && (
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] mb-4">
                <Icon name="search_off" className="text-[32px]" />
              </div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-lg text-[#131b2e]">
                No Invoices Found
              </h3>
              <p className="text-sm text-[#707881] mt-1 max-w-sm">
                No ledger records match the selected filter or search keyword in {selectedBranch}.
              </p>
              <button
                onClick={() => {
                  setCurrentFilter('all');
                  setSearchQuery('');
                }}
                className="mt-5 h-10 px-5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] transition-colors"
              >
                Reset Search &amp; Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Floating Bottom Quick Operations Dock */}
      <div className="fixed bottom-6 inset-x-0 z-30 pointer-events-none px-4 md:px-8">
        <div className="max-w-xl mx-auto pointer-events-auto bg-[#faf8ff]/95 backdrop-blur-xl border border-[#dae2fd] p-2.5 rounded-2xl shadow-2xl flex items-center justify-between gap-3">
          <button
            onClick={() => showToast('Exporting Complete Daily Financial & Invoicing Report (PDF/Excel)...')}
            className="flex-1 h-12 rounded-xl bg-[#e2e7ff] text-[#131b2e] text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#dae2fd] transition-colors"
          >
            <Icon name="ios_share" className="text-[18px] text-[#006194]" />
            <span>Export (CSV/PDF)</span>
          </button>
          <button
            onClick={() => setIsNewInvoiceModalOpen(true)}
            className="flex-1 h-12 rounded-xl bg-[#006194] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] active:scale-[0.98] transition-all"
          >
            <Icon name="add" className="text-[20px]" />
            <span>New Invoice</span>
          </button>
        </div>
      </div>

      {/* Modal: New Invoice Creation */}
      {isNewInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-lg rounded-3xl p-6 shadow-2xl border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dae2fd] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#cce5ff] flex items-center justify-center text-[#006194]">
                  <Icon name="receipt" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                    Create New Dental Invoice
                  </h3>
                  <p className="text-xs text-[#707881]">Wuse 2 Main Clinic Dispensary</p>
                </div>
              </div>
              <button
                onClick={() => setIsNewInvoiceModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Patient Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Chinelo Okonkwo"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">LifeCode ID</label>
                  <input
                    type="text"
                    placeholder="e.g. NG-ABJ-441-209"
                    value={newLifeCode}
                    onChange={(e) => setNewLifeCode(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#131b2e] mb-1">Total Fee (₦)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 45,000"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Clinical Procedure / Tariff</label>
                <input
                  type="text"
                  placeholder="e.g. Ultrasonic Scaling & Polishing (#CDT-D1110)"
                  value={newProcedure}
                  onChange={(e) => setNewProcedure(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                />
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs text-[#3f4850] flex items-start gap-2">
                <Icon name="info" className="text-[#006194] text-[16px] shrink-0 mt-0.5" />
                <span>
                  Invoices generated strictly follow gazetted CDT dental fee tariffs and adhere to decoupled diagnostic integrity.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewInvoiceModalOpen(false)}
                  className="h-11 px-4 rounded-xl border border-[#dae2fd] text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] shadow-sm"
                >
                  Post Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
