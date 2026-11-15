import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../design/Primitives';
import { InvestigationShell } from './InvestigationShell';

interface BillingDossier {
  id: string;
  patientName: string;
  initials: string;
  dhaId: string;
  invoiceRef: string;
  status: 'paid' | 'copay' | 'progress' | 'disputed';
  statusLabel: string;
  serviceTitle: string;
  facility: string;
  grossAmount: number;
  insuranceName: string;
  insuranceAmount: number;
  patientDue: number;
  paymentMethod?: string;
  notes?: string;
}

export function InvestigationBillingScreen() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<'all' | 'paid' | 'copay' | 'progress' | 'disputed'>('all');
  const [selectedDossier, setSelectedDossier] = useState<BillingDossier | null>(null);
  const [isPosModalOpen, setIsPosModalOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const dossiers: BillingDossier[] = [
    {
      id: 'dossier-1',
      patientName: 'Chinedu Okafor',
      initials: 'CO',
      dhaId: 'DHA-10482',
      invoiceRef: 'INV-2025-0914-BWPA',
      status: 'paid',
      statusLabel: 'Copay Paid • Settled',
      serviceTitle: 'Digital Bitewing (2 Views) + Periapical #16 Apex',
      facility: 'In-House Dexis Suite (Operatory 4)',
      grossAmount: 350.0,
      insuranceName: 'Daman Thiqa (80%)',
      insuranceAmount: 280.0,
      patientDue: 70.0,
      paymentMethod: 'Apple Pay • RCP-9021',
      notes: 'Reviewed by Dr. K. Al-Mansoor',
    },
    {
      id: 'dossier-2',
      patientName: 'Fatima Al-Zahra',
      initials: 'FA',
      dhaId: 'DHA-08921',
      invoiceRef: 'INV-2025-0902',
      status: 'copay',
      statusLabel: 'Pre-Auth Approved • Copay Due',
      serviceTitle: 'CBCT 3D Maxillary Arch Scan (8x8cm)',
      facility: 'Al Zahra Advanced Dental Imaging Centre',
      grossAmount: 1400.0,
      insuranceName: 'MetLife Dental (70%)',
      insuranceAmount: 980.0,
      patientDue: 420.0,
      notes: 'Copay SMS reminder sent 2h ago • Claim #ML-409192',
    },
    {
      id: 'dossier-3',
      patientName: 'Marcus Vance',
      initials: 'MV',
      dhaId: 'DHA-00412',
      invoiceRef: 'INV-2025-0899',
      status: 'paid',
      statusLabel: 'Direct Self-Pay • Settled',
      serviceTitle: 'Full Mouth Panoramic OPG',
      facility: 'Digital Imaging Bay 2',
      grossAmount: 450.0,
      insuranceName: 'Direct Patient Self-Pay',
      insuranceAmount: 0.0,
      patientDue: 450.0,
      paymentMethod: 'Credit Card (Ending •• 4910) • #AUTH-8812',
      notes: 'Settled Yesterday 16:42 GST',
    },
    {
      id: 'dossier-4',
      patientName: 'Amina Yusuf',
      initials: 'AY',
      dhaId: 'DHA-00245',
      invoiceRef: 'INV-2025-0871',
      status: 'progress',
      statusLabel: 'Claim Processing • Pre-Auth',
      serviceTitle: 'Full Blood Count & Coagulation Profile (PT/INR)',
      facility: 'Al Barsha Diagnostic Laboratory (Partner)',
      grossAmount: 520.0,
      insuranceName: 'AXA Insurance Gulf (GEMS Gold)',
      insuranceAmount: 520.0,
      patientDue: 0.0,
      notes: 'Pre-authorization reference #AXA-DHA-909 • Submitted 4h ago',
    },
  ];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenPos = (dossier: BillingDossier) => {
    setSelectedDossier(dossier);
    setIsPosModalOpen(true);
  };

  const handleConfirmPayment = () => {
    setIsPosModalOpen(false);
    showToast(`Payment of AED ${selectedDossier?.patientDue.toFixed(2)} recorded successfully via DHA Smart POS.`);
  };

  const filteredDossiers = dossiers.filter((d) => {
    if (activeFilter === 'all') return true;
    return d.status === activeFilter;
  });

  return (
    <InvestigationShell
      pageTitle="Investigation Billing & Payment Tracking"
      badgeCode="11.29"
      badgeLabel="Diagnostic Claims & Adjudication"
      patientName="Chinedu Okafor"
      dhaId="DHA-10482"
      orderRef="BILL-2025-0914"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-20 right-4 z-50 bg-inverse-surface text-inverse-on-surface px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 border border-outline-variant/30 text-sm font-medium animate-bounce">
            <Icon name="check_circle" className="text-secondary text-base" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Regulatory Clinical Compliance Notice */}
        <section className="bg-secondary-container/30 rounded-2xl p-4 sm:p-5 border border-secondary/30 shadow-sm flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <Icon name="verified_user" className="text-xl" />
          </div>
          <div className="flex flex-col min-w-0 text-xs">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <span className="font-bold text-secondary uppercase tracking-wider text-[11px]">
                DHA Health Law Mandate
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              <span className="text-on-surface-variant font-medium">Article 14.b</span>
            </div>
            <p className="text-on-surface leading-relaxed">
              <strong className="font-semibold text-secondary">Clinical Review Uninhibited:</strong> Pending copayments
              or insurance pre-authorization queries never impede clinical diagnostics, radiograph access, or immediate practitioner review.
            </p>
          </div>
        </section>

        {/* Header Snapshot Subtext */}
        <section className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-on-surface">Diagnostic Claims & Fees</h2>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Real-time Dubai Health Authority insurance adjudication and patient copay settlement logs
            </p>
          </div>
          <span className="font-mono text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full self-start sm:self-auto border border-primary/20">
            Billing Cycle: CY-2025 Q1
          </span>
        </section>

        {/* Metric Snapshot Cards (2x2 or 4x1) */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Invoiced */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Invoiced (Mo)</span>
              <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
                <Icon name="receipt_long" className="text-base" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-on-surface">AED 34,250</div>
              <div className="flex items-center gap-1 mt-1 text-secondary text-xs font-semibold">
                <Icon name="trending_up" className="text-sm" />
                <span>+8.4% vs last cycle</span>
              </div>
            </div>
          </div>

          {/* Insurance Approved */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Ins. Approved</span>
              <div className="w-8 h-8 rounded-lg bg-secondary-container/40 flex items-center justify-center text-secondary">
                <Icon name="health_and_safety" className="text-base" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-secondary">AED 28,400</div>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span>83% settlement rate</span>
              </div>
            </div>
          </div>

          {/* Pending Patient Copay */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Copay</span>
              <div className="w-8 h-8 rounded-lg bg-surface-variant flex items-center justify-center text-tertiary">
                <Icon name="hourglass_top" className="text-base" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-on-surface">AED 4,150</div>
              <span className="text-xs text-tertiary font-semibold mt-1 inline-block">5 orders awaiting</span>
            </div>
          </div>

          {/* Disputed / Denied Claims */}
          <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-outline-variant/40 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Claims Flagged</span>
              <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-700">
                <Icon name="priority_high" className="text-base" />
              </div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-rose-700">AED 1,700</div>
              <span className="text-xs text-rose-600 font-semibold mt-1 inline-block">2 denials under appeal</span>
            </div>
          </div>
        </section>

        {/* Interactive Filter Bar */}
        <section className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
          {[
            { id: 'all', label: 'All Orders', count: 28 },
            { id: 'paid', label: 'Paid & Settled', count: 19 },
            { id: 'copay', label: 'Copay Pending', count: 5 },
            { id: 'progress', label: 'In Progress', count: 3 },
            { id: 'disputed', label: 'Disputed', count: 1 },
          ].map((btn) => (
            <button
              key={btn.id}
              type="button"
              onClick={() => setActiveFilter(btn.id as any)}
              className={`px-3.5 py-1.5 rounded-full font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                activeFilter === btn.id
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container border border-outline-variant/30'
              }`}
            >
              <span>{btn.label}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-mono">{btn.count}</span>
            </button>
          ))}
        </section>

        {/* Dossiers List */}
        <section className="space-y-4">
          {filteredDossiers.map((dos) => {
            const isPaid = dos.status === 'paid';
            const isCopay = dos.status === 'copay';

            return (
              <article
                key={dos.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant/40 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all"
              >
                <div className="p-5 flex flex-col space-y-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-sm shrink-0">
                        {dos.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-on-surface truncate">{dos.patientName}</h3>
                          <span className="font-mono text-xs text-on-surface-variant bg-surface-container-low px-2 py-0.5 rounded">
                            {dos.dhaId}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-primary font-semibold tracking-wide">
                          {dos.invoiceRef}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${
                        isPaid
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isCopay
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                    >
                      <Icon name={isPaid ? 'check_circle' : 'schedule'} className="text-sm" />
                      <span>{dos.statusLabel}</span>
                    </span>
                  </div>

                  {/* Service Details */}
                  <div className="bg-surface-container-low/70 rounded-xl p-3 border border-outline-variant/20 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-on-surface font-semibold">
                      <Icon name="dentistry" className="text-base text-primary" />
                      <span>{dos.serviceTitle}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-on-surface-variant pl-6 text-[11px]">
                      <Icon name="domain" className="text-xs text-outline" />
                      <span>{dos.facility}</span>
                    </div>
                  </div>

                  {/* Financial Breakdown Grid */}
                  <div className="grid grid-cols-3 gap-3 p-3 bg-surface-container-low/40 rounded-xl border border-outline-variant/20 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline block">Gross Charge</span>
                      <span className="font-bold text-on-surface text-sm sm:text-base">
                        AED {dos.grossAmount.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline block">{dos.insuranceName}</span>
                      <span className="font-bold text-secondary text-sm sm:text-base">
                        AED {dos.insuranceAmount.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-outline block">Patient Copay</span>
                      <span className="font-bold text-on-surface text-sm sm:text-base">
                        AED {dos.patientDue.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Payment Method / Notes */}
                  <div className="flex items-center justify-between text-[11px] text-on-surface-variant pt-1 border-t border-outline-variant/20">
                    <div className="flex items-center gap-1 text-secondary font-medium">
                      <Icon name="payments" className="text-sm" />
                      <span>{dos.paymentMethod || dos.notes}</span>
                    </div>
                    <span>{dos.notes && !dos.paymentMethod ? '' : dos.notes}</span>
                  </div>
                </div>

                {/* Footer Action Strip */}
                <div className="bg-surface-container-low/60 px-5 py-3 border-t border-outline-variant/20 flex items-center justify-end gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => showToast(`Invoice #${dos.invoiceRef} generated for ${dos.patientName}.`)}
                    className="px-3.5 py-1.5 rounded-xl font-semibold bg-surface-container hover:bg-surface-container-high text-on-surface flex items-center gap-1 transition-colors"
                  >
                    <Icon name="visibility" className="text-sm" />
                    <span>View Invoice</span>
                  </button>

                  {isCopay ? (
                    <button
                      type="button"
                      onClick={() => handleOpenPos(dos)}
                      className="px-4 py-1.5 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Icon name="point_of_sale" className="text-sm" />
                      <span>Record Copay (POS)</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => showToast(`Official Tax Receipt PDF downloaded for ${dos.patientName}.`)}
                      className="px-4 py-1.5 rounded-xl font-bold bg-primary/10 text-primary hover:bg-primary/20 flex items-center gap-1.5 transition-colors border border-primary/20"
                    >
                      <Icon name="download" className="text-sm" />
                      <span>Receipt PDF</span>
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {/* Modal: Record POS Copay */}
        {isPosModalOpen && selectedDossier && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-surface rounded-2xl max-w-md w-full p-6 shadow-2xl border border-outline-variant/40 space-y-4 animate-scaleIn text-xs">
              <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3">
                <div className="flex items-center gap-2">
                  <Icon name="credit_card" className="text-primary text-xl" />
                  <h3 className="text-base font-bold text-on-surface">DHA Smart POS Terminal</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPosModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-surface-container text-outline"
                >
                  <Icon name="close" className="text-lg" />
                </button>
              </div>

              <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-outline-variant/20">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Patient Name:</span>
                  <span className="font-bold text-on-surface">{selectedDossier.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Order Ref:</span>
                  <span className="font-mono text-on-surface">{selectedDossier.invoiceRef}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-outline-variant/20 text-sm">
                  <span className="font-bold text-on-surface">Copay Due:</span>
                  <span className="font-bold text-primary">AED {selectedDossier.patientDue.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-blue-900 text-xs flex items-center gap-2">
                <Icon name="contactless" className="text-2xl text-blue-600 shrink-0" />
                <p>Terminal ready: Tap Apple Pay, Samsung Pay, or insert Emirates ID card to debit linked insurance wallet.</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-outline-variant/20">
                <button
                  type="button"
                  onClick={() => setIsPosModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-semibold bg-surface-container-low hover:bg-surface-container text-on-surface"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmPayment}
                  className="px-5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5"
                >
                  <Icon name="check" className="text-sm" />
                  <span>Authorize & Settle</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer Navigation Strip */}
        <section className="bg-surface-container-lowest rounded-2xl p-4 border border-outline-variant/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-sm">
          <div className="flex items-center gap-2">
            <Icon name="payments" className="text-secondary text-base" />
            <span className="font-semibold text-on-surface">Automated Claims Adjudication:</span>
            <span className="text-on-surface-variant">Direct e-claims submission via DHA eClaimLink Gateway.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => navigate('/investigations/templates')}
              className="px-3.5 py-2 rounded-xl font-bold bg-surface-container-low hover:bg-surface-container text-on-surface border border-outline-variant/30 flex items-center gap-1.5 transition-colors"
            >
              <Icon name="clinical_notes" className="text-sm" />
              <span>Template Library (11.27)</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/investigations/analytics')}
              className="px-3.5 py-2 rounded-xl font-bold bg-primary text-on-primary hover:bg-primary/95 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <Icon name="insights" className="text-sm" />
              <span>Analytics & KPIs (11.30)</span>
            </button>
          </div>
        </section>
      </div>
    </InvestigationShell>
  );
}

