import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreatmentPlanShell } from './TreatmentPlanShell';
import { Icon } from '../../design/Primitives';

interface ProcedureItem {
  id: string;
  code: string;
  cdt: string;
  phase: string;
  phaseLabel: string;
  title: string;
  location: string;
  grossTariff: number;
  insuranceShare: number;
  copayShare: number;
  settled: boolean;
  settlementDetails?: string;
  settlementDate?: string;
  statusBadge: string;
  statusColor: 'secondary' | 'primary' | 'outline';
}

export function TreatmentCostEstimateScreen() {
  const navigate = useNavigate();

  // State
  const [selectedLens, setSelectedLens] = useState<'estimated' | 'locked' | 'settled'>('locked');
  const [showAmendModal, setShowAmendModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [discountPercent, setDiscountPercent] = useState('10');
  const [discountReason, setDiscountReason] = useState('Clinical Courtesy (DHA Family Recare)');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const procedures: ProcedureItem[] = [
    {
      id: 'proc-1',
      code: 'DHA-RES-2S',
      cdt: 'CDT D2392',
      phase: '#16',
      phaseLabel: 'Phase 1 • Restorative',
      title: 'Direct Biomimetic Resin Composite (2-Surface MO)',
      location: 'Quadrant 1 Maxillary Right',
      grossTariff: 850,
      insuranceShare: 680,
      copayShare: 170,
      settled: true,
      settlementDetails: 'Paid & Settled (Receipt #REC-2026-904)',
      settlementDate: '18 Oct 2026 Chairside',
      statusBadge: 'Paid & Settled',
      statusColor: 'secondary',
    },
    {
      id: 'proc-2',
      code: 'DHA-PREV-FLUOR',
      cdt: 'CDT D1206',
      phase: '#15',
      phaseLabel: 'Phase 2 • Preventative',
      title: 'Topical Fluoride Varnish & Enamel Remineralization',
      location: 'Duraphat 5% NaF Application',
      grossTariff: 250,
      insuranceShare: 200,
      copayShare: 50,
      settled: false,
      settlementDetails: 'Quotation Approved • Locked',
      settlementDate: 'Visit 2 (02 Nov 2026)',
      statusBadge: 'Approved • Locked',
      statusColor: 'primary',
    },
    {
      id: 'proc-3',
      code: 'DHA-PERIO-REC',
      cdt: 'CDT D4910',
      phase: 'FM',
      phaseLabel: 'Phase 2 • Hygiene Audit',
      title: 'Full Mouth Periodontal Maintenance & Occlusal Audit',
      location: 'Ultrasonic & Subgingival Debridement',
      grossTariff: 350,
      insuranceShare: 280,
      copayShare: 70,
      settled: false,
      settlementDetails: 'Quotation Approved • Locked',
      settlementDate: 'Visit 2 (02 Nov 2026)',
      statusBadge: 'Approved • Locked',
      statusColor: 'primary',
    },
  ];

  return (
    <TreatmentPlanShell
      pageTitle="Treatment Cost Estimate & Quotation"
      badgeCode="13.25"
      badgeLabel="Financial Governance"
      currentStep="Step 25 of 30"
    >
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 bg-[#006194] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-bounce">
            <Icon name="check_circle" className="text-[20px] text-[#6bd8cb]" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        {/* Patient & Plan Header Pill */}
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-[#eaedff] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#e2e7ff] flex items-center justify-center font-bold text-[#006194] text-lg ring-2 ring-[#eaedff]">
                AO
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-[#006a61] rounded-full ring-2 ring-white"></span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-bold text-[#131b2e]">Amara Okafor</h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f2f3ff] text-[#3f4850] font-semibold">
                  34y F
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#86f2e4]/30 text-[#006f66] border border-[#86f2e4]/50">
                  <Icon name="verified" className="text-[13px] mr-1 text-[#006a61]" />
                  Daman Thiqa 80% Direct Pay
                </span>
              </div>
              <p className="font-mono text-xs text-[#707881] mt-0.5">
                AE-990-281-DXB • DHA-2026-00451 • Plan #TP-2026-089
              </p>
              <div className="flex items-center gap-3 text-xs text-[#707881] mt-1.5 flex-wrap">
                <span className="text-[#131b2e] font-medium flex items-center gap-1">
                  <Icon name="description" className="text-[14px] text-[#006194]" />
                  Mesio-Occlusal Direct Restorative Protocol
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Icon name="stethoscope" className="text-[14px] text-[#006195]" />
                  Dr. Daniel James (DDS, #DEN-48912)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-end md:self-center">
            <span className="text-xs font-semibold text-[#006194] bg-[#cce5ff]/50 px-3 py-1.5 rounded-full flex items-center gap-1.5">
              Sync Active
              <span className="w-2 h-2 rounded-full bg-[#006a61] animate-pulse"></span>
            </span>
            <button
              type="button"
              onClick={() => navigate('/treatment-plans/payment-tracking')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#006a61] hover:bg-[#005049] text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Icon name="payments" className="text-[15px]" />
              Payment Ledger (13.26)
            </button>
          </div>
        </div>

        {/* Regulatory & Statutory Notice Box */}
        <div className="bg-[#f2f3ff] p-4 rounded-2xl flex items-start gap-3.5 border border-[#eaedff]">
          <div className="p-2 rounded-xl bg-white text-[#006194] shrink-0 shadow-xs">
            <Icon name="gavel" className="text-[20px]" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-[#131b2e]">
              Statutory Tariff & Financial Governance (DHA-UCC-2026)
            </p>
            <p className="text-xs text-[#3f4850] leading-relaxed">
              Cost estimates are clinical estimations based on DHA Unified Clinical Coding (UCC-2026). Estimates do not constitute a final tax invoice. Financial status never overrides or modifies clinical findings, medical necessity, or doctor recommendations.
            </p>
          </div>
        </div>

        {/* Financial Tri-Lens Guide (Interactive Filter / Perspective Bar) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            type="button"
            onClick={() => setSelectedLens('estimated')}
            className={`p-3.5 rounded-xl text-left transition-all border ${
              selectedLens === 'estimated'
                ? 'bg-white border-[#006194] shadow-sm ring-2 ring-[#006194]/20'
                : 'bg-white/70 border-[#eaedff] hover:bg-white'
            }`}
          >
            <span className="text-[11px] font-bold text-[#707881] uppercase tracking-wider block">
              1. Estimated Tariff
            </span>
            <span className="text-sm font-bold text-[#131b2e] block mt-0.5">UCC Reference Base</span>
            <span className="text-[11px] text-[#707881] block mt-1">Pre-Claim Gross Calc (AED 1,450)</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLens('locked')}
            className={`p-3.5 rounded-xl text-left transition-all border ${
              selectedLens === 'locked'
                ? 'bg-[#cce5ff]/40 border-[#006194] shadow-sm ring-2 ring-[#006194]/20'
                : 'bg-white/70 border-[#eaedff] hover:bg-white'
            }`}
          >
            <span className="text-[11px] font-bold text-[#004b73] uppercase tracking-wider block">
              2. Locked Quote
            </span>
            <span className="text-sm font-bold text-[#006194] block mt-0.5">Auth #89-v1.1 (Patient Approved)</span>
            <span className="text-[11px] text-[#004b73] block mt-1">Net Copay Cap: AED 290.00</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedLens('settled')}
            className={`p-3.5 rounded-xl text-left transition-all border ${
              selectedLens === 'settled'
                ? 'bg-[#86f2e4]/30 border-[#006a61] shadow-sm ring-2 ring-[#006a61]/20'
                : 'bg-white/70 border-[#eaedff] hover:bg-white'
            }`}
          >
            <span className="text-[11px] font-bold text-[#005049] uppercase tracking-wider block">
              3. Settled Chairside
            </span>
            <span className="text-sm font-bold text-[#006a61] block mt-0.5">AED 170.00 Cleared</span>
            <span className="text-[11px] text-[#005049] block mt-1">Phase 1 Complete • Balance Due AED 120</span>
          </button>
        </div>

        {/* Main Grid: Left Financial Ledger & Procedure Breakdown, Right App Sync & Operational Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Plan-Level Financial Rollup Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#eaedff] space-y-6 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-[#707881] uppercase tracking-wider block">
                    Plan Financial Ledger
                  </span>
                  <h3 className="text-xl font-bold text-[#131b2e]">Cost & Quotation Rollup</h3>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#86f2e4]/40 text-[#006f66] self-start sm:self-auto border border-[#86f2e4]/60">
                  <Icon name="check_circle" className="text-[15px] mr-1 text-[#006a61]" />
                  Partially Paid • Phase 1
                </span>
              </div>

              {/* Primary Metrics Display */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#f2f3ff] border border-[#eaedff] space-y-1">
                  <span className="text-xs text-[#3f4850] font-medium">Gross Estimated Protocol</span>
                  <div className="text-2xl font-bold text-[#131b2e]">
                    AED 1,450<span className="text-sm font-normal text-[#707881]">.00</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#707881] block">
                    100% DHA Reference Tariff
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-[#cce5ff]/40 border border-[#93ccff]/40 space-y-1">
                  <span className="text-xs text-[#004b73] font-medium">Insurance Approved (80%)</span>
                  <div className="text-2xl font-bold text-[#006194]">
                    AED 1,160<span className="text-sm font-normal text-[#006194]/70">.00</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#004b73] block">
                    Daman Thiqa Direct Pay E-Gate
                  </span>
                </div>
              </div>

              {/* Patient Copay Settlement Progress Gauge */}
              <div className="p-4 rounded-xl bg-[#faf8ff] border border-[#eaedff] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[#131b2e]">Patient Quoted Copay (20%)</span>
                  <span className="text-lg font-bold text-[#006194]">AED 290.00</span>
                </div>
                <div className="space-y-1.5">
                  <div className="h-3.5 w-full bg-[#eaedff] rounded-full overflow-hidden relative">
                    <div
                      className="h-full bg-[#006a61] rounded-full transition-all duration-500 ease-out"
                      style={{ width: '58.62%' }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-[#707881] pt-1">
                    <span className="text-[#006a61] font-bold flex items-center gap-1">
                      <Icon name="payments" className="text-[14px]" />
                      Settled: AED 170.00 (58.6%)
                    </span>
                    <span className="text-[#ba1a1a] font-bold flex items-center gap-1">
                      Due: AED 120.00 (Phase 2)
                      <Icon name="pending_actions" className="text-[14px]" />
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick Split Ticker */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-[#eaedff]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center shrink-0">
                    <Icon name="verified" className="text-[20px]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#707881] block">Total Paid to Date</span>
                    <span className="text-base font-bold text-[#131b2e]">AED 170.00</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name="event_upcoming" className="text-[20px]" />
                  </div>
                  <div>
                    <span className="text-xs text-[#707881] block">Outstanding (Phase 2 Visit)</span>
                    <span className="text-base font-bold text-[#131b2e]">AED 120.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Itemized Procedure Tariff Breakdown */}
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <div>
                  <h3 className="text-lg font-bold text-[#131b2e]">Itemized Clinical Tariff</h3>
                  <p className="text-xs text-[#707881]">Breakdown by chairside phase & unified clinical codes</p>
                </div>
                <span className="font-mono text-xs px-2.5 py-1 rounded-full bg-[#f2f3ff] text-[#006194] font-semibold border border-[#eaedff]">
                  3 Procedures
                </span>
              </div>

              <div className="space-y-3">
                {procedures.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-[#eaedff] shadow-xs overflow-hidden transition-all hover:border-[#bfc7d2]"
                  >
                    <div className="p-4 sm:p-5 space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-9 h-9 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 ${
                              item.settled
                                ? 'bg-[#86f2e4]/30 text-[#006a61]'
                                : 'bg-[#cce5ff]/50 text-[#006194]'
                            }`}
                          >
                            {item.phase}
                          </span>
                          <div>
                            <span
                              className={`text-xs uppercase font-bold tracking-wider ${
                                item.settled ? 'text-[#006a61]' : 'text-[#006194]'
                              }`}
                            >
                              {item.phaseLabel}
                            </span>
                            <h4 className="text-base font-bold text-[#131b2e] leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                        <span
                          className={`p-1.5 rounded-full ${
                            item.settled
                              ? 'bg-[#86f2e4]/30 text-[#006a61]'
                              : 'bg-[#cce5ff]/40 text-[#006194]'
                          }`}
                        >
                          <Icon
                            name={item.settled ? 'done' : 'schedule'}
                            className="text-[18px]"
                          />
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#707881]">
                        <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#131b2e] font-semibold">
                          {item.code}
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[#f2f3ff] text-[#707881]">
                          {item.cdt}
                        </span>
                        <span>•</span>
                        <span className="font-sans text-xs text-[#3f4850]">{item.location}</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-[#f2f3ff] text-center">
                        <div>
                          <span className="text-[11px] text-[#707881] block">Gross Tariff</span>
                          <span className="text-sm font-bold text-[#131b2e]">
                            AED {item.grossTariff}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#707881] block">Daman 80%</span>
                          <span className="text-sm font-bold text-[#006194]">
                            AED {item.insuranceShare}
                          </span>
                        </div>
                        <div>
                          <span className="text-[11px] text-[#707881] block">Patient Copay</span>
                          <span
                            className={`text-sm font-bold ${
                              item.settled ? 'text-[#006a61]' : 'text-[#ba1a1a]'
                            }`}
                          >
                            AED {item.copayShare}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Settlement Strip */}
                    <div className="bg-[#f2f3ff]/70 px-4 py-2.5 flex items-center justify-between text-xs border-t border-[#eaedff]">
                      <span
                        className={`inline-flex items-center font-semibold ${
                          item.settled ? 'text-[#006a61]' : 'text-[#006194]'
                        }`}
                      >
                        <Icon
                          name={item.settled ? 'check_circle' : 'thumb_up'}
                          className="text-[15px] mr-1.5"
                        />
                        {item.settlementDetails}
                      </span>
                      <span className="text-[#707881] font-medium">{item.settlementDate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Sync Preview & Operations */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quotation Lifecycle & Patient Mobile App Synchronization */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center shrink-0">
                    <Icon name="sync" className="text-[20px]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#131b2e]">Patient App Sync</h4>
                    <span className="text-xs text-[#707881]">Amara's DHA Smart Portal</span>
                  </div>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-[#86f2e4]/30 text-[#006f66]">
                  Biometric OK
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-[#f2f3ff] space-y-2.5 text-xs border border-[#eaedff]">
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Quotation Version:</span>
                  <span className="font-mono text-[#131b2e] font-bold">QUOTE-2026-089-v1.1</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Biometric Consent:</span>
                  <span className="text-[#006a61] font-semibold flex items-center gap-1">
                    <Icon name="fingerprint" className="text-[15px]" />
                    Approved 14 Oct 2026
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#707881]">Surprise Billing Cap:</span>
                  <span className="text-[#131b2e] font-semibold flex items-center gap-1">
                    <Icon name="shield" className="text-[15px] text-[#006a61]" />
                    Active (DHA Stat Cap)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white text-xs text-[#3f4850] flex items-center gap-2 border border-[#eaedff]">
                  <Icon name="notifications_active" className="text-[16px] text-[#006194] shrink-0" />
                  <span>Patient sees "AED 120 copay due at next chairside check-in (02 Nov)".</span>
                </div>
              </div>
            </div>

            {/* Operational Actions & Controls Panel */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#eaedff] space-y-3">
              <h4 className="text-xs font-bold text-[#707881] uppercase tracking-wider">
                Financial Operations
              </h4>

              <button
                type="button"
                onClick={() => setShowAmendModal(true)}
                className="w-full h-12 bg-[#006194] hover:bg-[#004b73] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <Icon name="edit_document" className="text-[20px]" />
                Prepare Amended Quotation
              </button>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => showToast('Cost estimate PDF generated and queued for download.')}
                  className="h-11 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#eaedff]"
                >
                  <Icon name="picture_as_pdf" className="text-[17px] text-[#006195]" />
                  Export PDF
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/treatment-plans/payment-tracking')}
                  className="h-11 bg-[#f2f3ff] hover:bg-[#eaedff] text-[#131b2e] rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors border border-[#eaedff]"
                >
                  <Icon name="receipt_long" className="text-[17px] text-[#006a61]" />
                  Ledger (13.26)
                </button>
              </div>

              <div className="pt-2 text-center border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => setShowDiscountModal(true)}
                  className="text-xs text-[#006194] hover:text-[#004b73] font-bold inline-flex items-center gap-1 py-1"
                >
                  <Icon name="percent" className="text-[16px]" />
                  Discount / Courtesy Adjustment Request
                </button>
                <p className="text-[10px] text-[#707881] pt-1">
                  Audited under DHA Financial Health Regulation #2026/81
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal: Prepare Amended Quotation */}
        {showAmendModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#eaedff] space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#cce5ff]/50 text-[#006194] flex items-center justify-center">
                    <Icon name="edit_document" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Prepare Amended Quotation</h3>
                    <p className="text-xs text-[#707881]">Generate Revision v1.2 for Plan #TP-2026-089</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAmendModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Amendment Reason</label>
                  <select className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]">
                    <option>Addition of Phase 2 Periodontal Scaling</option>
                    <option>Adjustment of Insurance Tariff Pre-Authorization</option>
                    <option>Material Change: Direct Resin to Onlay</option>
                    <option>Clinical Courtesy Fee Waiver Approved</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Clinical Justification Notes</label>
                  <textarea
                    rows={3}
                    defaultValue="Reflecting updated periodontal probing depth readings from chairside examination on 18 Oct 2026. Phase 2 protocol adjusted to include Duraphat varnish."
                    className="w-full p-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194] resize-none"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#f2f3ff] border border-[#eaedff] flex items-start gap-2 text-[#3f4850]">
                  <Icon name="info" className="text-[16px] text-[#006194] shrink-0 mt-0.5" />
                  <span>
                    Publishing an amendment triggers a notification to Amara Okafor's DHA Smart App requiring re-confirmation before Phase 2 check-in.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowAmendModal(false);
                    showToast('Amended quotation draft v1.2 created successfully.');
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Save & Dispatch Amendment
                </button>
                <button
                  type="button"
                  onClick={() => setShowAmendModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Discount / Courtesy Adjustment */}
        {showDiscountModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-[#eaedff] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#eaedff]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#86f2e4]/30 text-[#006a61] flex items-center justify-center">
                    <Icon name="percent" className="text-[18px]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#131b2e]">Discount / Fee Waiver Request</h3>
                    <p className="text-xs text-[#707881]">DHA Statutory Compliance Check</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDiscountModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-[#f2f3ff] text-[#707881] flex items-center justify-center"
                >
                  <Icon name="close" className="text-[20px]" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Adjustment Percentage (%)</label>
                  <input
                    type="number"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] font-bold focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#131b2e] block mb-1">Audited Reason Category</label>
                  <select
                    value={discountReason}
                    onChange={(e) => setDiscountReason(e.target.value)}
                    className="w-full h-10 px-3 rounded-lg border border-[#bfc7d2] bg-[#faf8ff] text-[#131b2e] focus:outline-none focus:ring-2 focus:ring-[#006194]"
                  >
                    <option>Clinical Courtesy (DHA Family Recare)</option>
                    <option>Financial Hardship Copay Subsidy</option>
                    <option>Corporate Health Partner Courtesy</option>
                    <option>Director Discretionary Goodwill</option>
                  </select>
                </div>

                <div className="p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] text-[#93000a] flex items-start gap-2">
                  <Icon name="gavel" className="text-[16px] shrink-0 mt-0.5" />
                  <span>
                    DHA Regulation #2026/81 mandates that patient copay waivers cannot be disguised as inducements. Requires Clinic Director dual authorization.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#eaedff]">
                <button
                  type="button"
                  onClick={() => {
                    setShowDiscountModal(false);
                    showToast(`Discount of ${discountPercent}% logged and queued for Director sign-off.`);
                  }}
                  className="flex-1 h-11 bg-[#006194] hover:bg-[#004b73] text-white font-bold rounded-xl text-xs transition-colors"
                >
                  Submit for Authorization
                </button>
                <button
                  type="button"
                  onClick={() => setShowDiscountModal(false)}
                  className="px-4 h-11 bg-[#f2f3ff] text-[#3f4850] font-semibold rounded-xl text-xs hover:bg-[#eaedff] transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TreatmentPlanShell>
  );
}
