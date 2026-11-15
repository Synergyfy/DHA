import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';

export const FinancialReportsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    showToast('Encrypting BrightSmile Group Q4 2026 reports for tax compliance...');
    setTimeout(() => {
      setIsExportingPdf(false);
      showToast('Statutory Tax & Financial Audit PDF downloaded');
    }, 2000);
  };

  const handleExportLedger = () => {
    setIsExportingExcel(true);
    showToast('Exporting General Ledger (342 transactions)...');
    setTimeout(() => {
      setIsExportingExcel(false);
      showToast('BrightSmile_Oct2026_Ledger.xlsx generated successfully');
    }, 1800);
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
                <span className="text-[11px] font-semibold text-[#707881] uppercase tracking-wider">Treasury & Revenue</span>
                <span className="text-[11px] text-[#707881]">•</span>
                <span className="text-[11px] font-medium text-[#006194]">Section 16.40</span>
              </div>
              <h1 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e] truncate">
                Financial Reports
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#dae2fd] text-xs font-semibold text-[#006194] hover:bg-[#f2f3ff] transition-colors"
            >
              <Icon name={isExportingPdf ? 'refresh' : 'picture_as_pdf'} className={`text-[16px] ${isExportingPdf ? 'animate-spin' : ''}`} />
              <span>Tax Audit PDF</span>
            </button>
            <button
              onClick={handleExportLedger}
              disabled={isExportingExcel}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#006194] text-xs font-semibold text-white hover:bg-[#007bb9] transition-colors"
            >
              <Icon name={isExportingExcel ? 'refresh' : 'table_view'} className={`text-[16px] ${isExportingExcel ? 'animate-spin' : ''}`} />
              <span>Ledger Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex-1 w-full space-y-6">
        {/* Top Practice Context Header Card */}
        <div className="w-full bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#006a61] animate-pulse"></span>
              <span className="text-xs font-bold text-[#006a61] uppercase tracking-wider">Audit Active</span>
              <div className="flex items-center gap-1 bg-[#eaedff] px-2.5 py-0.5 rounded-full text-[#3f4850] text-xs font-semibold ml-2">
                <Icon name="lock" className="text-[14px]" />
                <span>Executive View</span>
              </div>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans',sans-serif] text-xl md:text-2xl font-extrabold text-[#131b2e]">
              BrightSmile Dental Group
            </h2>
            <p className="text-xs text-[#3f4850] mt-1 font-medium">
              Consolidated Hub: Wuse 2 · Garki · Maitama Clinics
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-[#f2f3ff] rounded-xl px-3.5 py-2 flex items-center gap-2 border border-[#dae2fd]/40">
              <Icon name="calendar_today" className="text-[16px] text-[#006194]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#707881] uppercase tracking-wider">Audit Cadence</span>
                <span className="text-xs font-bold text-[#006194]">Q4 2026 MTD (Oct 2026)</span>
              </div>
            </div>
            <div className="bg-[#eaedff] px-3.5 py-2 rounded-xl text-xs font-semibold text-[#3f4850]">
              Auth: Owner · Director · Finance
            </div>
          </div>
        </div>

        {/* Primary Executive Summary Cards: 2x2 Clean Bento (scales to 4 on desktop) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Gross Production */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850]">
              <span className="text-xs font-semibold uppercase tracking-wider">Gross Invoiced</span>
              <div className="w-8 h-8 rounded-lg bg-[#cce5ff] text-[#006194] flex items-center justify-center">
                <Icon name="receipt_long" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">₦22.85M</div>
              <p className="text-xs text-[#707881] mt-1 font-medium">342 Completed Cases</p>
            </div>
          </div>

          {/* Actual Realized Receipts (Highlighted) */}
          <div className="bg-[#006194] text-white p-4 md:p-5 rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between text-white/80">
              <span className="text-xs font-semibold uppercase tracking-wider">Realized Receipts</span>
              <div className="w-8 h-8 rounded-lg bg-white/20 text-white flex items-center justify-center">
                <Icon name="payments" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-white">₦18.45M</div>
              <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-md text-xs font-bold mt-1">
                <Icon name="trending_up" className="text-[14px]" />
                <span>80.7% Realization</span>
              </div>
            </div>
          </div>

          {/* Outstanding Receivables */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850]">
              <span className="text-xs font-semibold uppercase tracking-wider">Receivables</span>
              <div className="w-8 h-8 rounded-lg bg-[#cde5ff] text-[#006195] flex items-center justify-center">
                <Icon name="pending_actions" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#131b2e]">₦4.40M</div>
              <p className="text-xs text-[#707881] mt-1 font-medium leading-tight">
                ₦4.21M HMO (&lt;30d) · ₦185k Co-pays
              </p>
            </div>
          </div>

          {/* Net Collection Ratio */}
          <div className="bg-[#ffffff] p-4 md:p-5 rounded-2xl border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between text-[#3f4850]">
              <span className="text-xs font-semibold uppercase tracking-wider">Net Capture</span>
              <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/50 text-[#006a61] flex items-center justify-center">
                <Icon name="verified" className="text-[18px]" />
              </div>
            </div>
            <div className="mt-3">
              <div className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl md:text-3xl font-extrabold text-[#006a61]">98.4%</div>
              <div className="inline-flex items-center gap-1.5 text-[#006a61] text-xs font-bold mt-1">
                <span className="w-2 h-2 rounded-full bg-[#006a61]"></span>
                <span>Optimal Benchmark Target</span>
              </div>
            </div>
          </div>
        </section>

        {/* Daily Collections Velocity Chart */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                Daily Collections Velocity
              </h3>
              <p className="text-xs text-[#3f4850]">Actual daily yield vs. ₦800k/day baseline</p>
            </div>
            <span className="bg-[#86f2e4] text-[#00201d] px-3 py-1 rounded-full text-xs font-bold">
              +14.2% vs Baseline
            </span>
          </div>

          {/* Inline SVG Sparkline */}
          <div className="w-full pt-3">
            <svg className="w-full h-32 md:h-40 overflow-visible" fill="none" viewBox="0 0 320 90" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="financialRevenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#006194" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#006194" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Target Line ₦800k baseline */}
              <line stroke="#bfc7d2" strokeDasharray="3 3" strokeWidth="1.5" x1="0" x2="320" y1="46" y2="46" />
              <text fill="#707881" fontFamily="Inter" fontSize="8" fontWeight="600" x="5" y="42">TARGET ₦800K/DAY</text>
              {/* Gradient fill beneath actuals */}
              <path d="M 0,65 L 25,60 L 55,40 L 90,52 L 125,32 L 160,35 L 195,20 L 230,28 L 265,15 L 300,18 L 320,10 L 320,88 L 0,88 Z" fill="url(#financialRevenueGradient)" />
              {/* Actual Trend Line */}
              <path d="M 0,65 L 25,60 L 55,40 L 90,52 L 125,32 L 160,35 L 195,20 L 230,28 L 265,15 L 300,18 L 320,10" stroke="#006194" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
              {/* Peak Marker */}
              <circle cx="265" cy="15" fill="#006194" r="4" />
              <circle cx="265" cy="15" r="7" stroke="#006194" strokeOpacity="0.3" strokeWidth="2" />
              <text fill="#006194" fontFamily="Inter" fontSize="9" fontWeight="700" x="245" y="10">₦1.24M Peak</text>
            </svg>
            <div className="flex justify-between items-center text-[#707881] text-xs pt-3 border-t border-[#dae2fd]/30 font-medium">
              <span>Oct 01</span>
              <span>Oct 08</span>
              <span>Oct 15</span>
              <span>Oct 22</span>
              <span className="text-[#006194] font-bold">Oct 30 (Today)</span>
            </div>
          </div>
        </section>

        {/* Section: Funds Realization Pipeline & Inflow Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Funds Realization Pipeline (5 cols) */}
          <section className="lg:col-span-5 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                  Funds Realization Pipeline
                </h3>
                <span className="text-xs text-[#707881] bg-[#f2f3ff] px-2.5 py-1 rounded-lg">
                  Accrual vs. Cash
                </span>
              </div>

              <div className="space-y-3">
                {/* Pipeline Quotes */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#dae2fd]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3f4850]">
                      <Icon name="assignment_turned_in" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Approved Treatment Quotes</div>
                      <div className="text-[11px] text-[#707881]">9 active patients (WIP)</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#131b2e]">₦1,850,000</div>
                    <span className="text-[10px] font-bold text-[#006195]">Pipeline</span>
                  </div>
                </div>

                {/* Realized Revenue */}
                <div className="bg-[#86f2e4]/20 p-3.5 rounded-xl border border-[#86f2e4]/40 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#86f2e4] flex items-center justify-center text-[#00201d]">
                      <Icon name="task_alt" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Desk-Settled Collections</div>
                      <div className="text-[11px] text-[#006a61]">Cleared Zenith Bank acct</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#006a61]">₦18,450,000</div>
                    <span className="text-[10px] font-bold text-[#006a61]">Realized</span>
                  </div>
                </div>

                {/* Waivers / Adjustments */}
                <div className="bg-[#f2f3ff] p-3.5 rounded-xl border border-[#dae2fd]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#eaedff] flex items-center justify-center text-[#3f4850]">
                      <Icon name="percent" className="text-[18px]" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#131b2e]">Clinical Waivers & Adjustments</div>
                      <div className="text-[11px] text-[#707881]">Allowance threshold: 0.19%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#3f4850]">-₦35,000</div>
                    <span className="text-[10px] font-bold text-[#707881]">Approved</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Realization efficiency</span>
              <span className="font-bold text-[#006a61]">High Settlement Pace</span>
            </div>
          </section>

          {/* Inflow Channels (Cashless Mandate) (7 cols) */}
          <section className="lg:col-span-7 bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                    Inflow Channels
                  </h3>
                  <p className="text-xs text-[#3f4850]">100% Cashless Regulatory Compliant</p>
                </div>
                <div className="flex items-center gap-1 bg-[#86f2e4]/30 text-[#006a61] text-xs font-bold px-2.5 py-1 rounded-full">
                  <Icon name="verified" className="text-[14px]" />
                  <span>CBN Cashless Verified</span>
                </div>
              </div>

              {/* Segmented Proportional Bar */}
              <div className="w-full h-3.5 rounded-full bg-[#eaedff] overflow-hidden flex gap-0.5 mb-4">
                <div className="bg-[#006194] h-full" style={{ width: '64.2%' }} title="POS: 64.2%"></div>
                <div className="bg-[#006a61] h-full" style={{ width: '31.4%' }} title="Transfer: 31.4%"></div>
                <div className="bg-[#287ab3] h-full" style={{ width: '4.4%' }} title="HMO: 4.4%"></div>
              </div>

              {/* Channel Details List */}
              <div className="divide-y divide-[#dae2fd]/30">
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#006194] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">POS Terminals</span>
                      <span className="text-[11px] text-[#707881]">Moniepoint & Stanbic merchant gateways</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#131b2e]">₦11,845,000</span>
                    <span className="text-[11px] text-[#006194] font-semibold block">64.2%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#006a61] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">Direct Bank Transfer</span>
                      <span className="text-[11px] text-[#707881]">NIBSS Instant Settlement APIs</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#131b2e]">₦5,793,300</span>
                    <span className="text-[11px] text-[#006a61] font-semibold block">31.4%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#287ab3] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#131b2e] block">HMO Direct Payers</span>
                      <span className="text-[11px] text-[#707881]">Hygeia, AXA Mansard & Leadway</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#131b2e]">₦811,700</span>
                    <span className="text-[11px] text-[#287ab3] font-semibold block">4.4%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between py-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-[#bfc7d2] shrink-0"></div>
                    <div>
                      <span className="text-xs font-bold text-[#707881] block">Physical Cash Desk</span>
                      <span className="text-[11px] text-[#707881]">Cashless Mandate Enforced</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs font-bold text-[#707881]">₦0.00</span>
                    <span className="text-[11px] text-[#707881] font-semibold block">0.0%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#dae2fd]/30 flex items-center justify-between text-xs text-[#707881]">
              <span>Zero-cash handling protocol</span>
              <span className="font-bold text-[#006a61]">Active and Compliant</span>
            </div>
          </section>
        </div>

        {/* Departmental & Clinical Profitability */}
        <section className="bg-[#ffffff] rounded-2xl p-5 md:p-6 border border-[#dae2fd]/40 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans',sans-serif] text-base md:text-lg font-bold text-[#131b2e]">
                Departmental & Clinical Contribution
              </h3>
              <p className="text-xs text-[#3f4850]">Yield and gross margins by clinical specialty</p>
            </div>
            <span className="bg-[#eaedff] text-[#006194] px-2.5 py-1 rounded-lg text-xs font-bold">
              4 Disciplines
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Restorative */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Restorative & Cosmetic</span>
                  <span className="bg-[#cce5ff] text-[#006194] px-2 py-0.5 rounded text-[11px] font-bold">54% Margin</span>
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold text-[#131b2e] mt-2">
                  ₦6,800,000
                </div>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006194] h-full rounded-full" style={{ width: '54%' }}></div>
              </div>
            </div>

            {/* Orthodontics */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Orthodontics & Aligners</span>
                  <span className="bg-[#86f2e4] text-[#00201d] px-2 py-0.5 rounded text-[11px] font-bold">62% Margin</span>
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold text-[#131b2e] mt-2">
                  ₦5,200,000
                </div>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#006a61] h-full rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            {/* Oral Surgery */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Oral Surgery & CBCT</span>
                  <span className="bg-[#cde5ff] text-[#006195] px-2 py-0.5 rounded text-[11px] font-bold">58% Margin</span>
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold text-[#131b2e] mt-2">
                  ₦3,950,000
                </div>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#287ab3] h-full rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>

            {/* Preventive */}
            <div className="bg-[#f2f3ff] p-4 rounded-xl border border-[#dae2fd]/30 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#131b2e]">Preventive & Pediatric</span>
                  <span className="bg-[#eaedff] text-[#3f4850] px-2 py-0.5 rounded text-[11px] font-bold">48% Margin</span>
                </div>
                <div className="font-['Plus_Jakarta_Sans',sans-serif] text-xl font-extrabold text-[#131b2e] mt-2">
                  ₦2,500,000
                </div>
              </div>
              <div className="w-full bg-[#dae2fd] h-2 rounded-full overflow-hidden">
                <div className="bg-[#707881] h-full rounded-full" style={{ width: '48%' }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Export & Compliance Actions */}
        <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#dae2fd]/40 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#86f2e4] text-[#00201d] flex items-center justify-center shrink-0">
              <Icon name="verified_user" className="text-[22px]" />
            </div>
            <div>
              <span className="text-xs font-bold text-[#131b2e] block">FIRS & CBN Regulatory Verified</span>
              <p className="text-[11px] text-[#707881]">Financial statements cryptographically signed per Nigerian corporate guidelines</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleExportPdf}
              disabled={isExportingPdf}
              className="flex-1 md:flex-initial h-11 px-5 bg-[#006194] hover:bg-[#007bb9] active:scale-[0.99] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Icon name={isExportingPdf ? 'refresh' : 'picture_as_pdf'} className={`text-[18px] ${isExportingPdf ? 'animate-spin' : ''}`} />
              <span>Export Tax Audit (PDF)</span>
            </button>
            <button
              onClick={handleExportLedger}
              disabled={isExportingExcel}
              className="flex-1 md:flex-initial h-11 px-5 bg-[#eaedff] hover:bg-[#e2e7ff] active:scale-[0.99] text-[#006194] text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all"
            >
              <Icon name={isExportingExcel ? 'refresh' : 'table_view'} className={`text-[18px] ${isExportingExcel ? 'animate-spin' : ''}`} />
              <span>Export Ledger (Excel)</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
