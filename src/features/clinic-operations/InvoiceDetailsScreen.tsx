import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const InvoiceDetailsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAdjustmentModalOpen, setIsAdjustmentModalOpen] = useState(false);
  const [adjustmentReason, setAdjustmentReason] = useState('');
  const [adjustmentAmount, setAdjustmentAmount] = useState('5,000');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRequestAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdjustmentModalOpen(false);
    showToast(`Adjustment request of ₦${adjustmentAmount} submitted to Dual-Approval Queue (16.35).`);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Invoicing Ledger</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.32</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Invoice Details: #INV-2026-441
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => showToast('Printing Tax Invoice PDF with QR verification stamp...')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name="picture_as_pdf" className="text-[16px]" />
              <span>Print Tax Invoice</span>
            </button>
            <button
              onClick={() => navigate('/clinic-operations/payment-history')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#86f2e4] text-[#006f66] text-xs font-bold hover:opacity-90 transition-opacity"
            >
              <Icon name="receipt_long" className="text-[16px]" />
              <span>Receipt #88402</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#006194] flex items-center justify-center text-white shrink-0 shadow-sm">
              <Icon name="person" className="text-[18px]" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-6 space-y-6">
        {/* Status & Quick Meta Card */}
        <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#707881] mb-1">
                <span className="font-semibold text-[#006194]">INV #INV-2026-441</span>
                <span>•</span>
                <span>22 OCT 2026</span>
                <span>•</span>
                <span>08:50 AM WAT</span>
              </div>
              <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-bold text-[#131b2e]">
                Direct Restorative &amp; Radiograph Encounter
              </h2>
            </div>

            {/* Paid Seal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#86f2e4] text-[#006f66] text-xs font-bold tracking-wide self-start sm:self-auto shadow-sm">
              <Icon name="verified" className="text-[16px]" />
              <span>FULLY SETTLED</span>
            </div>
          </div>

          {/* Settlement Visual Bar */}
          <div className="pt-3 border-t border-[#dae2fd]/60 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#3f4850] gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="font-bold text-[#131b2e] text-sm">100% Cleared &amp; Reconciled</span>
              <span className="text-[#707881]">(Zero Balance Outstanding)</span>
            </div>
            <div className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#006a61]">
              ₦45,000.00 Gross Settled
            </div>
          </div>
        </div>

        {/* 2-Column Responsive Layout: Left (Patient & Encounter), Right (Payer Split & Payment) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Patient & Encounter Hub */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                  Patient &amp; Clinical Encounter
                </h3>
                <span className="px-2.5 py-1 rounded bg-[#f2f3ff] text-[#006194] text-xs font-semibold">
                  Verified In-Chair
                </span>
              </div>

              {/* Patient Meta */}
              <div className="flex items-center gap-3.5 p-3.5 bg-[#f2f3ff] rounded-xl">
                <div className="w-12 h-12 rounded-full bg-[#cce5ff] flex items-center justify-center text-[#006194] shrink-0 font-bold">
                  <Icon name="medical_information" className="text-[24px]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e] truncate">
                      Amara Okafor
                    </h4>
                    <span className="px-2 py-0.5 rounded bg-[#dae2fd] text-[#131b2e] text-[11px] font-semibold">
                      34y • F
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#707881] truncate mt-0.5">
                    LifeCode: <strong className="text-[#131b2e]">AE-990-281-DXB</strong> • MRN: DHA-2026-00451
                  </p>
                </div>
              </div>

              {/* Clinician & Facility Strip */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#707881] flex items-center gap-1.5">
                    <Icon name="stethoscope" className="text-[15px] text-[#006194]" />
                    Attending Doctor
                  </span>
                  <span className="font-semibold text-[#131b2e]">Dr. Daniel Okoro, DDS</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881] flex items-center gap-1.5">
                    <Icon name="badge" className="text-[15px] text-[#707881]" />
                    Practitioner License
                  </span>
                  <span className="font-mono text-[#3f4850]">DEN-78421 • Chief Restorative</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881] flex items-center gap-1.5">
                    <Icon name="location_on" className="text-[15px] text-[#006a61]" />
                    Facility Suite
                  </span>
                  <span className="font-medium text-[#131b2e]">BrightSmile Dental, Wuse 2 (Suite 01)</span>
                </div>
              </div>

              {/* Handshake Clinical Encounter */}
              <div className="p-3.5 rounded-xl bg-[#cce5ff]/50 border border-[#cce5ff] text-[#001d31] flex items-start gap-3">
                <Icon name="verified_user" className="text-[20px] text-[#006194] shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#006194]">
                      Encounter Handshake Link
                    </span>
                    <span className="font-mono text-xs font-bold text-[#004b73]">#ACT-2026-9914</span>
                  </div>
                  <p className="text-xs font-medium mt-1 text-[#001d31]">
                    Mesio-Occlusal Direct Composite Restoration (Tooth #16)
                  </p>
                  <p className="font-mono text-[11px] text-[#004b73] mt-0.5">
                    Treatment Plan Ref: #TP-2026-089 (Signed by Clinician)
                  </p>
                </div>
              </div>
            </div>

            {/* Itemized Fee Schedule */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    Itemized Fee Schedule
                  </h3>
                  <p className="text-xs text-[#707881]">Federally Gazetted CDT 2026 Standard Tariff</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-[#eaedff] text-[#006194] text-xs font-mono font-bold">
                  CDT 2026 Tariff
                </span>
              </div>

              {/* Schedule Items */}
              <div className="space-y-3">
                {/* Item 1 */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#006194] font-semibold">
                        <span>CDT #D2392</span>
                        <span>•</span>
                        <span className="text-[#131b2e]">Tooth #16</span>
                      </div>
                      <p className="text-xs font-medium text-[#131b2e] mt-0.5">
                        Direct Resin-based Composite, Two Surfaces, Posterior
                      </p>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] shrink-0">
                      ₦38,000.00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#006a61] font-medium pt-1">
                    <Icon name="check_circle" className="text-[13px]" />
                    <span>Restorative Diagnostic Completed &amp; Cured</span>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#006194] font-semibold">
                        <span>CDT #D0220</span>
                        <span>•</span>
                        <span className="text-[#131b2e]">Radiology</span>
                      </div>
                      <p className="text-xs font-medium text-[#131b2e] mt-0.5">
                        Intraoral Periapical First Radiographic Image
                      </p>
                    </div>
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e] shrink-0">
                      ₦5,000.00
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#006a61] font-medium pt-1">
                    <Icon name="check_circle" className="text-[13px]" />
                    <span>PA Sensor Image Archival Verified in PACS</span>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="p-3.5 rounded-xl bg-[#f2f3ff] flex flex-col gap-1.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-mono text-xs text-[#006194] font-semibold">
                        <span>CDT #D9215</span>
                        <span>•</span>
                        <span className="text-[#131b2e]">Local Anesthesia</span>
                      </div>
                      <p className="text-xs font-medium text-[#131b2e] mt-0.5">
                        Local Infiltration Anesthesia (Septocaine 4% with Epinephrine)
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-sm md:text-base text-[#131b2e]">
                        ₦2,000.00
                      </span>
                      <span className="block text-[11px] text-[#006a61] font-semibold">(Inclusive)</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-[#006a61] font-medium pt-1">
                    <Icon name="check_circle" className="text-[13px]" />
                    <span>1.7mL Cartridge Applied</span>
                  </div>
                </div>
              </div>

              {/* Total Gross Strip */}
              <div className="pt-3 border-t border-[#dae2fd] flex items-center justify-between">
                <span className="text-sm font-semibold text-[#707881]">Subtotal Gross Charges</span>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-bold text-[#131b2e]">
                  ₦45,000.00
                </span>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Insurance Claims & Co-Pay Split Card */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="assured_workload" className="text-[#006194] text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    Payer &amp; Co-Pay Split
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#f2f3ff] text-[#006194] text-[11px] font-mono font-bold">
                  Claim #CLM-2026-904
                </span>
              </div>

              {/* Carrier Pill */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-1">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#707881]">Primary Carrier</span>
                    <h4 className="font-bold text-xs md:text-sm text-[#131b2e]">
                      MetLife DHA Comprehensive Dental Network
                    </h4>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-[#86f2e4] text-[#006f66] text-[10px] font-bold">
                    Pre-Authorized
                  </span>
                </div>
                <p className="font-mono text-[11px] text-[#707881]">Policy ID: MET-90214-OKAFOR</p>
              </div>

              {/* Visual Split Bar */}
              <div className="space-y-2">
                <div className="h-2.5 w-full rounded-full bg-[#dae2fd] flex overflow-hidden">
                  <div className="h-full bg-[#006194]" style={{ width: '80%' }}></div>
                  <div className="h-full bg-[#006a61]" style={{ width: '20%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs text-[#3f4850] pt-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006194]"></span>
                    <span>MetLife 80% Insurer Direct</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006a61]"></span>
                    <span>Patient 20% Co-Pay</span>
                  </div>
                </div>
              </div>

              {/* Split Breakdown Grid */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-[#f2f3ff]">
                  <span className="text-xs text-[#707881] block">Insurer Portioned</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#006194] mt-0.5 block">
                    ₦36,000.00
                  </span>
                  <span className="text-[11px] text-[#707881]">Direct clinic remittance</span>
                </div>
                <div className="p-3 rounded-xl bg-[#f2f3ff]">
                  <span className="text-xs text-[#707881] block">Patient Co-Pay (20%)</span>
                  <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e] mt-0.5 block">
                    ₦9,000.00
                  </span>
                  <span className="text-[11px] text-[#006a61] font-semibold">Collected at counter</span>
                </div>
              </div>
            </div>

            {/* Payment Reconciliation History */}
            <div className="bg-white rounded-2xl border border-[#dae2fd] p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="point_of_sale" className="text-[#006a61] text-[20px]" />
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold text-[#131b2e]">
                    Payment Reconciliation
                  </h3>
                </div>
                <span className="font-mono text-xs font-bold text-[#006a61]">Bal: ₦0.00</span>
              </div>

              {/* Receipt Tile */}
              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#131b2e]">
                      <span>Receipt #REC-88402</span>
                      <Icon name="check_circle" className="text-[14px] text-[#006a61]" />
                    </div>
                    <p className="font-mono text-[11px] text-[#707881] mt-0.5">22 Oct 2026 • 08:52 AM WAT</p>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#006a61]">
                      ₦9,000.00
                    </span>
                    <span className="block text-[11px] text-[#707881]">POS Transaction</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#dae2fd]/60 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[#707881]">
                  <span>Terminal: #TERM-WUS-01 (Zenith)</span>
                  <span>Auth: #AUTH-78912</span>
                  <span>Card: Mastercard **4102</span>
                </div>
              </div>

              {/* Balance Remaining Ribbon */}
              <div className="p-3.5 rounded-xl bg-[#86f2e4]/30 border border-[#86f2e4] text-[#006f66] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="account_balance_wallet" className="text-[18px]" />
                  <span className="font-bold text-xs">Net Outstanding Balance</span>
                </div>
                <span className="font-['Plus_Jakarta_Sans',sans-serif] text-base font-bold">₦0.00 (Zero)</span>
              </div>
            </div>

            {/* Statutory Transparency Notice */}
            <div className="bg-[#f2f3ff] rounded-2xl border border-[#dae2fd] p-4 flex items-start gap-3 text-xs text-[#3f4850]">
              <Icon name="policy" className="text-[#707881] text-[20px] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#131b2e]">Healthcare Price Transparency &amp; Audit Notice</p>
                <p className="leading-relaxed">
                  This invoice complies with the Federal Ministry of Health and DHA Gazetted Pricing Structure. Clinical adjustments are cryptographically anchored and cannot overwrite diagnostic clinical charts.
                </p>
              </div>
            </div>

            {/* Action Buttons Hub */}
            <div className="space-y-2.5 pt-1">
              <button
                onClick={() => showToast('Printing Tax Invoice (PDF) with cryptographic audit barcode...')}
                className="w-full h-12 rounded-xl bg-[#006194] text-white font-bold text-xs md:text-sm flex items-center justify-center gap-2 shadow-md hover:bg-[#007bb9] active:scale-[0.99] transition-all"
              >
                <Icon name="picture_as_pdf" className="text-[18px]" />
                <span>Print Tax Invoice (PDF)</span>
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => navigate('/clinic-operations/payment-history')}
                  className="h-11 rounded-xl bg-[#86f2e4] text-[#006f66] font-bold text-xs flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <Icon name="receipt_long" className="text-[16px]" />
                  <span className="truncate">Receipt #88402</span>
                </button>
                <button
                  onClick={() => setIsAdjustmentModalOpen(true)}
                  className="h-11 rounded-xl bg-[#e2e7ff] text-[#131b2e] font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-[#dae2fd] transition-colors"
                >
                  <Icon name="edit_note" className="text-[16px] text-[#006194]" />
                  <span className="truncate">Adjustment Note</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Adjustment Request Modal */}
      {isAdjustmentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-[#dae2fd] space-y-4">
            <div className="flex items-center justify-between border-b border-[#dae2fd] pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                  <Icon name="edit_note" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-base text-[#131b2e]">
                    Request Fee Adjustment
                  </h3>
                  <p className="text-xs text-[#707881]">Invoice #INV-2026-441</p>
                </div>
              </div>
              <button
                onClick={() => setIsAdjustmentModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#f2f3ff] flex items-center justify-center text-[#707881] hover:text-[#131b2e]"
              >
                <Icon name="close" className="text-sm" />
              </button>
            </div>

            <form onSubmit={handleRequestAdjustment} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Adjustment Amount (₦)</label>
                <input
                  type="text"
                  required
                  value={adjustmentAmount}
                  onChange={(e) => setAdjustmentAmount(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#dae2fd] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#006194]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#131b2e] mb-1">Clinical / Fiscal Justification</label>
                <textarea
                  required
                  rows={3}
                  value={adjustmentReason}
                  onChange={(e) => setAdjustmentReason(e.target.value)}
                  placeholder="e.g. Retroactive insurer pre-authorization approved by MetLife..."
                  className="w-full p-3 rounded-xl border border-[#dae2fd] text-xs focus:outline-none focus:ring-2 focus:ring-[#006194]/20 resize-none"
                />
              </div>

              <div className="p-3 bg-[#f2f3ff] rounded-xl text-xs text-[#3f4850] flex items-start gap-2">
                <Icon name="policy" className="text-[#006194] text-[16px] shrink-0 mt-0.5" />
                <span>
                  Adjustments require dual authorization by Clinical Director (Dr. Okoro) and Finance Manager (Esther John) in Screen 16.35.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdjustmentModalOpen(false)}
                  className="h-11 px-4 rounded-xl border border-[#dae2fd] text-xs font-semibold text-[#707881] hover:bg-[#f2f3ff]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-11 px-5 rounded-xl bg-[#006194] text-white text-xs font-bold hover:bg-[#007bb9] shadow-sm"
                >
                  Submit to Queue
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
